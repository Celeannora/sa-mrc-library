---
mrc_id: MRC-0103-SA
title: "Daily Scripted Software Inventory Check with Change Audit Logging"
category: "01 — Audit & Log Management"
periodicity: Daily
est_time: "20–30 minutes"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Bash (check-software-inventory.sh), dpkg / rpm, systemctl, sha256sum, auditd / /var/log/auth.log"
jsig_controls:
  - AU-2
  - AU-6
  - AU-9
  - CM-8
  - CM-8(1)
  - SA-22
  - SI-7
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-0103-SA — Daily Scripted Software Inventory Check with Change Audit Logging

---

## 1. Background (New SA)

**What this MRC covers:**
Every SAP system must maintain a current, accurate, and auditable inventory of all installed software (JSIG CM-8 and CM-8(1)). Unauthorized or unknown software on a SAP IS is a potential SA-22 (unsupported/unauthorized components) finding and a CM baseline deviation that must be reported to the ISSM. This MRC automates the daily software inventory capture and compares it against the previous day's baseline, logging any delta with a timestamped change audit trail that includes the identity of the SA who performed the task.

**Why daily scripted execution matters:**
Manual software inventory is error-prone and inconsistent. A scripted approach ensures:
1. Every installed package is enumerated — no gaps from manual review
2. Any software addition, removal, or version change since the previous cycle is automatically detected
3. The full audit trail — who ran the script, when, and what changed — is captured to satisfy JSIG AU-2 and AU-6 accountability requirements
4. Unauthorized software installations (a potential insider threat indicator) are detected within one duty day

**What the script does (`scripts/check-software-inventory.sh`):**
- Enumerates all installed packages using `dpkg --get-selections` (Debian/Ubuntu) or `rpm -qa` (RHEL/CentOS/Rocky)
- Computes an SHA-256 hash of the full package list for integrity verification (SI-7)
- Compares against the previous baseline snapshot stored in `/var/log/mrc/software-inventory/`
- Logs any delta (installed, removed, or version-changed packages) to a timestamped change log
- Records the executing user's identity (`$USER` / `$SUDO_USER`), hostname, and timestamp in each log entry for AU-6 accountability
- Exits with a non-zero code if unauthorized changes are detected, suitable for cron-based alerting

**Script reference:**
`scripts/check-software-inventory.sh` — available in the MRC library repository. Deploy to each managed host before first execution. Requires root or sudo privileges.

---

## 2. Safety / Hazards

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** This MRC must be executed within an ISSM-authorized maintenance window (MA-2). The script must be run by an authorized System Administrator — execution identity is captured in the change audit log.

> ⚠️ **DO NOT MODIFY BASELINE WITHOUT AUTHORIZATION:** If the script detects unexpected software changes, do NOT accept or overwrite the baseline without ISSM notification. Accepting an unauthorized change without reporting is a CM-8 violation.

> ⚠️ **SA-22 REPORTING REQUIREMENT:** Any software package identified as end-of-life (EOL), unsupported by the vendor, or not listed in the system's approved software list must be reported to the ISSM within the same maintenance cycle. Do not defer SA-22 findings.

> ⚠️ **AU-9 COMPLIANCE — PROTECT AUDIT LOGS:** The change audit log directory (`/var/log/mrc/software-inventory/`) must be protected from modification by non-privileged users. Do not delete, alter, or rotate logs outside of ISSM-authorized retention procedures (AU-11).

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| `check-software-inventory.sh` | Library script — `scripts/check-software-inventory.sh` — deployed to target host |
| Root / sudo access | Required to enumerate all system packages and write to `/var/log/mrc/` |
| Bash 4.0+ | Script runtime — standard on all modern Linux distributions |
| `dpkg` or `rpm` | Package enumeration — automatically detected by the script |
| `sha256sum` | Integrity hashing — standard coreutils |
| `diff` | Change delta computation — standard coreutils |
| Approved Software List (ASL) | ISSM-maintained list of authorized software for this IS — SA Document Repository |
| MRC Sign-Off Block | Signed by SA (and ISSM/ISSO if findings present) after completion |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| JSIG CM-8 — Information System Component Inventory | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG CM-8(1) — Updates During Installations and Removals | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG SA-22 — Unsupported System Components | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG AU-2, AU-6, AU-9 — Audit Event Logging | ISSM SharePoint / SAP Cybersecurity Binder |
| Approved Software List (ASL) | SA Document Repository / ISSM Binder |
| System Security Plan (SSP) — Software Inventory Section | ISSM SharePoint |
| `scripts/check-software-inventory.sh` | MRC Library Repository — `scripts/` directory |
| MRC-0101-DA | Daily Splunk Agent Health and Log Forwarding Verification (cross-reference) |
| MRC-0801-MO | Monthly Configuration Baseline Review (cross-reference) |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 20–30 minutes |

*Script execution is automated; SA time is primarily review, verification, and sign-off.*

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file for this maintenance cycle
- [ ] `check-software-inventory.sh` deployed to all managed hosts and verified executable (`chmod +x`)
- [ ] Log directory initialized: `/var/log/mrc/software-inventory/` exists with correct permissions
- [ ] Baseline snapshot from previous cycle present in log directory (first run: run script with `--init-baseline` flag to establish baseline)
- [ ] Approved Software List (ASL) current and accessible
- [ ] Root / sudo access confirmed for each target host
- [ ] auditd running and configured (confirm with `systemctl status auditd`)

---

## 7. Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 1 | Log into the managed host as authorized SA account | SSH or console login → authenticate with CAC / SA credentials | Shell prompt for authorized SA account |
| 2 | Verify the script is present and executable | `ls -la /opt/mrc/scripts/check-software-inventory.sh` | File present; `-rwxr-xr-x` permissions; owner: root |
| 3 | Run the software inventory check script | `sudo /opt/mrc/scripts/check-software-inventory.sh` | Script executes; outputs: current timestamp, executing user identity, package count, and inventory hash |
| 4 | Review script output — note PASS / CHANGE / FAIL status | Script console output | `STATUS: PASS — No changes detected` or `STATUS: CHANGE — [N] package changes detected` |
| 5 | If STATUS: CHANGE — review the delta log | `sudo cat /var/log/mrc/software-inventory/delta-$(date +%Y%m%d).log` | Lists each added, removed, or version-changed package with timestamps |
| 6 | Cross-reference any detected changes against the Approved Software List (ASL) | ASL document + delta log | Each changed package is either: (a) authorized change — document in Step 7, or (b) unauthorized — document finding in Section 11 |
| 7 | Document authorized changes (if any) | Complete Authorized Change Log (Section 9) | All authorized software changes recorded with CCB/CR reference or ISSM approval reference |
| 8 | Verify SHA-256 hash of current inventory is recorded in log | `sudo tail -5 /var/log/mrc/software-inventory/inventory-$(date +%Y%m%d).log` | Hash line present: `SHA256: [hash]` |
| 9 | Confirm executing user identity is recorded in audit log | `sudo grep "OPERATOR:" /var/log/mrc/software-inventory/inventory-$(date +%Y%m%d).log` | Line present: `OPERATOR: [sa-username] @ [hostname] — [timestamp]` |
| 10 | Verify auditd recorded the script execution | `sudo ausearch -c check-software-inv --start today` | auditd entries present for script execution |
| 11 | Repeat Steps 2–10 for each managed host in scope | Per host | All hosts in Section 8 populated |
| 12 | Notify ISSM of any unauthorized software findings | Phone / secure message per site SOP | ISSM notified; response documented in Section 11 |
| 13 | Accept new baseline (authorized changes only) | `sudo /opt/mrc/scripts/check-software-inventory.sh --accept-baseline` | Script confirms: `Baseline updated by [username] at [timestamp]` |
| 14 | Complete Host Inventory Summary table (Section 8) | | All rows populated |
| 15 | Complete Findings Summary and Sign-Off block (Sections 11–12) | | SA signature obtained; ISSM signature obtained if findings present |

---

## 8. Host Inventory Summary

| # | Hostname | Script Run Time | Operator Identity | Package Count | Inventory SHA-256 (last 8) | Status | Changes Detected |
|---|----------|----------------|-------------------|--------------|---------------------------|--------|-----------------|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |

*Status: PASS / CHANGE-AUTHORIZED / CHANGE-UNAUTHORIZED / FAIL*

---

## 9. Authorized Change Log

*Complete only if authorized software changes were detected. Each entry requires a CCB change request number or ISSM written approval reference.*

| # | Hostname | Package Name | Change Type | Previous Version | New Version | CCB/CR # or ISSM Approval Ref | Authorized By | Date |
|---|----------|-------------|-------------|-----------------|-------------|-------------------------------|--------------|------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |

*Change Type: INSTALLED / REMOVED / VERSION-CHANGE*

---

## 10. SA-22 Unsupported Software Findings

*Complete if any detected package is identified as end-of-life, unsupported, or not on the Approved Software List.*

| # | Hostname | Package Name | Version | EOL Date / Status | On ASL? | ISSM Notified | Time Notified | Directed Action |
|---|----------|-------------|---------|------------------|---------|--------------|--------------|----------------|
| 1 | | | | | Y / N | Y / N | | |
| 2 | | | | | Y / N | Y / N | | |
| 3 | | | | | Y / N | Y / N | | |

---

## 11. Non-Compliance / Findings Log

| # | Hostname | Finding Description | Control Affected | ISSM Notified | Time | Directed Action | Resolved |
|---|----------|--------------------|-----------------|--------------|----|----------------|---------|
| 1 | | | | Y / N | | | Y / N |
| 2 | | | | Y / N | | | Y / N |
| 3 | | | | Y / N | | | Y / N |

---

## 12. Findings Summary

- [ ] All hosts checked — no unauthorized software detected — baseline unchanged
- [ ] Authorized software changes detected — documented in Section 9 — baseline updated
- [ ] Unauthorized software detected — ISSM notified — finding documented in Section 11
- [ ] SA-22 violation identified — EOL/unsupported software present — ISSM notified
- [ ] Script execution failure on one or more hosts — documented in Section 11
- [ ] No findings — all systems within approved baseline

---

## 13. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO (required if findings present) | | | | |

**ISSM Authorization Reference:** ___________________________
**Baseline Accepted By (if updated):** ___________________________ **At:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-0103-SA | Rev 1.0 | Category 01 — Audit & Log Management*
*Classification: [CLASSIFICATION]*
