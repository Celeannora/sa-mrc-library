#!/usr/bin/env bash
# =============================================================================
# check-software-inventory.sh
# MRC-0103-SA — Daily Scripted Software Inventory Check with Change Audit Logging
# Category 01 — Audit & Log Management
# JSIG Controls: AU-2, AU-6, AU-9, CM-8, CM-8(1), SA-22, SI-7
#
# Revision: Rev 1.0
# Classification: [CLASSIFICATION]
#
# DESCRIPTION:
#   Enumerates all installed software packages on the local system, computes
#   an SHA-256 integrity hash of the full package list, compares against the
#   previous day's baseline snapshot, and logs any changes (installs, removals,
#   version changes) to a timestamped audit log. The identity of the executing
#   SA is captured in every log entry to satisfy JSIG AU-6 accountability.
#
# USAGE:
#   sudo ./check-software-inventory.sh              # Normal daily run
#   sudo ./check-software-inventory.sh --init-baseline  # First-time baseline init
#   sudo ./check-software-inventory.sh --accept-baseline # Accept detected changes as new baseline
#
# OUTPUT:
#   /var/log/mrc/software-inventory/inventory-YYYYMMDD.log  — Full package list + hash
#   /var/log/mrc/software-inventory/delta-YYYYMMDD.log      — Changes from previous baseline
#   /var/log/mrc/software-inventory/baseline.txt            — Current accepted baseline
#   /var/log/mrc/software-inventory/baseline.sha256         — SHA-256 of accepted baseline
#
# EXIT CODES:
#   0 — PASS: No changes detected
#   1 — CHANGE: Changes detected (review required)
#   2 — INIT: Baseline initialized (first run)
#   3 — ERROR: Script encountered a fatal error
# =============================================================================

set -euo pipefail

# -----------------------------------------------------------------------------
# CONFIGURATION
# -----------------------------------------------------------------------------
LOG_DIR="/var/log/mrc/software-inventory"
DATE=$(date +%Y%m%d)
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S %Z")
HOSTNAME_FULL=$(hostname -f 2>/dev/null || hostname)
INVENTORY_LOG="${LOG_DIR}/inventory-${DATE}.log"
DELTA_LOG="${LOG_DIR}/delta-${DATE}.log"
BASELINE_FILE="${LOG_DIR}/baseline.txt"
BASELINE_HASH="${LOG_DIR}/baseline.sha256"
CURRENT_INVENTORY="/tmp/mrc-sw-inventory-current-$$.txt"
SCRIPT_VERSION="Rev 1.0"
MRC_ID="MRC-0103-SA"

# Resolve the actual operator identity (handles sudo invocation)
OPERATOR="${SUDO_USER:-${USER:-$(whoami)}}"

# -----------------------------------------------------------------------------
# HELPER FUNCTIONS
# -----------------------------------------------------------------------------

log() {
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] $*" | tee -a "${INVENTORY_LOG}"
}

log_delta() {
    echo "$*" | tee -a "${DELTA_LOG}"
}

die() {
    echo "[ERROR] $*" >&2
    log "FATAL ERROR: $*"
    exit 3
}

require_root() {
    if [[ $EUID -ne 0 ]]; then
        die "This script must be run as root (sudo). Current UID: $EUID"
    fi
}

detect_pkg_manager() {
    if command -v dpkg &>/dev/null; then
        echo "dpkg"
    elif command -v rpm &>/dev/null; then
        echo "rpm"
    else
        die "No supported package manager found (dpkg or rpm). Cannot enumerate installed software."
    fi
}

enumerate_packages() {
    local pkg_mgr="$1"
    case "${pkg_mgr}" in
        dpkg)
            dpkg --get-selections | grep -v deinstall | awk '{print $1}' | sort
            ;;
        rpm)
            rpm -qa --queryformat "%{NAME}-%{VERSION}-%{RELEASE}.%{ARCH}\n" | sort
            ;;
    esac
}

init_log_dir() {
    if [[ ! -d "${LOG_DIR}" ]]; then
        mkdir -p "${LOG_DIR}"
        chmod 750 "${LOG_DIR}"
        chown root:root "${LOG_DIR}"
        log "Log directory created: ${LOG_DIR}"
    fi
}

write_header() {
    cat >> "${INVENTORY_LOG}" <<EOF
================================================================================
${MRC_ID} — Daily Software Inventory Check
${SCRIPT_VERSION} | Classification: [CLASSIFICATION]
JSIG: AU-2, AU-6, AU-9, CM-8, CM-8(1), SA-22, SI-7
================================================================================
OPERATOR:   ${OPERATOR}
HOSTNAME:   ${HOSTNAME_FULL}
TIMESTAMP:  ${TIMESTAMP}
================================================================================

EOF
}

write_delta_header() {
    cat > "${DELTA_LOG}" <<EOF
================================================================================
${MRC_ID} — Software Change Delta Log
${SCRIPT_VERSION} | Classification: [CLASSIFICATION]
================================================================================
OPERATOR:   ${OPERATOR}
HOSTNAME:   ${HOSTNAME_FULL}
TIMESTAMP:  ${TIMESTAMP}
================================================================================

EOF
}

# -----------------------------------------------------------------------------
# MAIN LOGIC
# -----------------------------------------------------------------------------

require_root
init_log_dir

# Prevent duplicate run in same cycle (idempotent re-runs still log)
touch "${INVENTORY_LOG}"

write_header
log "=== ${MRC_ID} Starting ==="
log "OPERATOR: ${OPERATOR} @ ${HOSTNAME_FULL}"
log "Script version: ${SCRIPT_VERSION}"

# Detect package manager
PKG_MGR=$(detect_pkg_manager)
log "Package manager detected: ${PKG_MGR}"

# Enumerate current installed packages
log "Enumerating installed packages..."
enumerate_packages "${PKG_MGR}" > "${CURRENT_INVENTORY}" || die "Package enumeration failed."

PKG_COUNT=$(wc -l < "${CURRENT_INVENTORY}")
log "Total installed packages: ${PKG_COUNT}"

# Compute SHA-256 hash of current inventory
CURRENT_HASH=$(sha256sum "${CURRENT_INVENTORY}" | awk '{print $1}')
log "SHA256 (current inventory): ${CURRENT_HASH}"

# Write full package list to inventory log
log "--- BEGIN PACKAGE LIST ---"
cat "${CURRENT_INVENTORY}" >> "${INVENTORY_LOG}"
log "--- END PACKAGE LIST ---"

# Handle flags
MODE="${1:-}"

# --init-baseline: First-time baseline initialization
if [[ "${MODE}" == "--init-baseline" ]]; then
    log "MODE: --init-baseline — Initializing baseline snapshot."
    cp "${CURRENT_INVENTORY}" "${BASELINE_FILE}"
    sha256sum "${BASELINE_FILE}" > "${BASELINE_HASH}"
    log "Baseline initialized by OPERATOR: ${OPERATOR} at ${TIMESTAMP}"
    log "Baseline SHA-256: ${CURRENT_HASH}"
    log "STATUS: INIT — Baseline created. No comparison performed."
    echo ""
    echo "================================================================"
    echo "  ${MRC_ID} — BASELINE INITIALIZED"
    echo "  OPERATOR : ${OPERATOR}"
    echo "  HOST     : ${HOSTNAME_FULL}"
    echo "  PACKAGES : ${PKG_COUNT}"
    echo "  SHA-256  : ${CURRENT_HASH}"
    echo "  FILE     : ${BASELINE_FILE}"
    echo "================================================================"
    rm -f "${CURRENT_INVENTORY}"
    exit 2
fi

# --accept-baseline: Accept current state as new baseline (after authorized change review)
if [[ "${MODE}" == "--accept-baseline" ]]; then
    if [[ ! -f "${BASELINE_FILE}" ]]; then
        die "No existing baseline found. Run with --init-baseline first."
    fi
    log "MODE: --accept-baseline — Accepting current inventory as new baseline."
    cp "${CURRENT_INVENTORY}" "${BASELINE_FILE}"
    sha256sum "${BASELINE_FILE}" > "${BASELINE_HASH}"
    log "Baseline updated by OPERATOR: ${OPERATOR} at ${TIMESTAMP}"
    log "New Baseline SHA-256: ${CURRENT_HASH}"
    log "STATUS: BASELINE-UPDATED — New baseline accepted."
    echo ""
    echo "================================================================"
    echo "  ${MRC_ID} — BASELINE UPDATED"
    echo "  OPERATOR : ${OPERATOR}"
    echo "  HOST     : ${HOSTNAME_FULL}"
    echo "  PACKAGES : ${PKG_COUNT}"
    echo "  SHA-256  : ${CURRENT_HASH}"
    echo "================================================================"
    rm -f "${CURRENT_INVENTORY}"
    exit 0
fi

# Normal daily run — compare against baseline
if [[ ! -f "${BASELINE_FILE}" ]]; then
    log "WARNING: No baseline snapshot found. Run with --init-baseline to establish baseline."
    echo ""
    echo "================================================================"
    echo "  ${MRC_ID} — WARNING: NO BASELINE FOUND"
    echo "  Run: sudo ./check-software-inventory.sh --init-baseline"
    echo "================================================================"
    rm -f "${CURRENT_INVENTORY}"
    exit 3
fi

# Verify baseline integrity
STORED_HASH=$(awk '{print $1}' "${BASELINE_HASH}" 2>/dev/null || echo "UNKNOWN")
ACTUAL_BASELINE_HASH=$(sha256sum "${BASELINE_FILE}" | awk '{print $1}')

log "Baseline SHA-256 (stored):   ${STORED_HASH}"
log "Baseline SHA-256 (computed): ${ACTUAL_BASELINE_HASH}"

if [[ "${STORED_HASH}" != "${ACTUAL_BASELINE_HASH}" ]]; then
    log "WARNING: Baseline file hash mismatch — possible tampering detected! (AU-9)"
    log "Stored hash:   ${STORED_HASH}"
    log "Computed hash: ${ACTUAL_BASELINE_HASH}"
fi

# Compute delta
log "Computing delta against baseline..."
DELTA=$(diff "${BASELINE_FILE}" "${CURRENT_INVENTORY}" || true)

if [[ -z "${DELTA}" ]]; then
    # No changes
    log "STATUS: PASS — No software changes detected. Inventory matches baseline."
    echo ""
    echo "================================================================"
    echo "  ${MRC_ID} — STATUS: PASS"
    echo "  OPERATOR : ${OPERATOR}"
    echo "  HOST     : ${HOSTNAME_FULL}"
    echo "  PACKAGES : ${PKG_COUNT}"
    echo "  SHA-256  : ${CURRENT_HASH}"
    echo "  RESULT   : No software changes detected."
    echo "================================================================"
    rm -f "${CURRENT_INVENTORY}"
    exit 0
else
    # Changes detected
    ADDED=$(echo "${DELTA}" | grep '^>' | sed 's/^> //' | sort)
    REMOVED=$(echo "${DELTA}" | grep '^<' | sed 's/^< //' | sort)
    ADDED_COUNT=$(echo "${ADDED}" | grep -c . 2>/dev/null || echo 0)
    REMOVED_COUNT=$(echo "${REMOVED}" | grep -c . 2>/dev/null || echo 0)
    TOTAL_CHANGES=$(( ADDED_COUNT + REMOVED_COUNT ))

    write_delta_header
    log_delta "CHANGE SUMMARY:"
    log_delta "  Packages installed (new): ${ADDED_COUNT}"
    log_delta "  Packages removed:         ${REMOVED_COUNT}"
    log_delta "  Total changes:            ${TOTAL_CHANGES}"
    log_delta ""

    if [[ "${ADDED_COUNT}" -gt 0 ]]; then
        log_delta "--- INSTALLED / UPGRADED PACKAGES ---"
        echo "${ADDED}" | while read -r pkg; do
            [[ -z "${pkg}" ]] && continue
            log_delta "  [+] INSTALLED: ${pkg}"
        done
        log_delta ""
    fi

    if [[ "${REMOVED_COUNT}" -gt 0 ]]; then
        log_delta "--- REMOVED / DOWNGRADED PACKAGES ---"
        echo "${REMOVED}" | while read -r pkg; do
            [[ -z "${pkg}" ]] && continue
            log_delta "  [-] REMOVED:   ${pkg}"
        done
        log_delta ""
    fi

    log_delta "OPERATOR ATTESTATION:"
    log_delta "  Changes logged by OPERATOR: ${OPERATOR} @ ${HOSTNAME_FULL}"
    log_delta "  Timestamp: ${TIMESTAMP}"
    log_delta "  ISSM notification required for unauthorized changes."
    log_delta "  Run with --accept-baseline only after ISSM review and authorization."
    log_delta ""
    log_delta "  Current inventory SHA-256: ${CURRENT_HASH}"

    log "STATUS: CHANGE — ${TOTAL_CHANGES} software change(s) detected. Review ${DELTA_LOG}."
    log "Installed: ${ADDED_COUNT} | Removed: ${REMOVED_COUNT}"
    log "OPERATOR: ${OPERATOR} — Change audit log written."

    echo ""
    echo "================================================================"
    echo "  ${MRC_ID} — STATUS: CHANGE DETECTED"
    echo "  OPERATOR   : ${OPERATOR}"
    echo "  HOST       : ${HOSTNAME_FULL}"
    echo "  PACKAGES   : ${PKG_COUNT}"
    echo "  INSTALLED  : ${ADDED_COUNT}"
    echo "  REMOVED    : ${REMOVED_COUNT}"
    echo "  TOTAL CHG  : ${TOTAL_CHANGES}"
    echo "  DELTA LOG  : ${DELTA_LOG}"
    echo ""
    echo "  ACTION REQUIRED:"
    echo "  1. Review delta log: sudo cat ${DELTA_LOG}"
    echo "  2. Cross-reference each change with Approved Software List (ASL)"
    echo "  3. Report unauthorized changes to ISSM immediately"
    echo "  4. If all changes authorized, update baseline:"
    echo "     sudo ./check-software-inventory.sh --accept-baseline"
    echo "================================================================"

    rm -f "${CURRENT_INVENTORY}"
    exit 1
fi
