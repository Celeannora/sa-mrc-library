---
mrc_id: MRC-2308-DA
title: Daily File Storage Hash Audit and Duplicate File Detection
category: 23 — File and Storage Services
periodicity: DAILY
maintenance_type: PREVENTIVE / AUDIT
est_time: "00:30"
rin: DA-FS-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Bash (check-file-storage-hashes.sh — PLACEHOLDER: script not yet generated), find, sha256sum, sort, uniq, tee"
jsig_controls: "AU-2, AU-6, AU-9, CM-3, CM-8, SI-7, MP-6"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only audit; no files modified or deleted"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

# MRC-2308-DA — Daily File Storage Hash Audit and Duplicate File Detection

---

## 1. Background (New SA)

**What this MRC covers:**
In a SAP environment, file storage systems hold classified working documents, export packages, system artifacts, and operational data. Files on these systems must be cryptographically inventoried so that unauthorized additions, modifications, or deletions are detected quickly (SI-7 — Software, Firmware, and Information Integrity). Duplicate files — two or more files with identical SHA-256 hashes — may indicate unauthorized data staging, exfiltration preparation, improper data handling, or storage baseline drift.

This MRC performs a daily scripted hash audit of a designated file storage path. The SA is prompted to supply the target folder path at execution time. The script then recursively traverses all files, computes an SHA-256 hash for each, compiles a complete file inventory, and produces a separate duplicate file list for SA review. All output is logged with operator identity and timestamp to satisfy JSIG AU-6 accountability requirements.

**Why daily hash auditing matters:**
- File-level change detection is a core SI-7 mechanism. Hash comparison identifies modification of any file — even a single bit change — with certainty.
- Duplicate files are a potential indicator of data staging, unauthorized copying, or baseline drift. In an air-gapped SAP environment, unexpected duplicates must be reviewed and adjudicated.
- The audit trail captures who ran the check, when, which path was scanned, and what was found — creating a daily evidence artifact for ISSM review and ConMon submission.

**What the script does (`scripts/check-file-storage-hashes.sh`) — PLACEHOLDER:**
> ⚠️ **The companion script (`scripts/check-file-storage-hashes.sh`) has not yet been generated.** This MRC references a placeholder. When the script is created, it will:
> - Prompt the SA for the target folder path at execution time
> - Recursively traverse all files under the specified path using `find`
> - Compute an SHA-256 hash for every file using `sha256sum`
> - Output a full file inventory log: `[SHA-256 hash] [file path]` — one line per file
> - Detect duplicates by identifying any SHA-256 hash appearing more than once
> - Write a dedicated duplicate file list to a timestamped output file, listing duplicate sets with all affected file paths grouped together
> - Record the executing operator identity (`$USER` / `$SUDO_USER`), the scanned path, hostname, and timestamp in every log entry (AU-6)
> - Exit with code 0 (no duplicates), 1 (duplicates detected), or 3 (error)

**Script placeholder path:** `scripts/check-file-storage-hashes.sh`

---

## 2. Safety / Hazards

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** This MRC must be executed within an ISSM-authorized maintenance window (MA-2). The executing SA's identity is captured in every log entry.

> ⚠️ **READ-ONLY AUDIT:** This MRC is a read-only inspection. The script does NOT modify, move, rename, or delete any files. Do NOT take any action on identified duplicate files without a CCB-approved change request and ISSM written authorization.

> ⚠️ **DO NOT DELETE DUPLICATES WITHOUT AUTHORIZATION:** Duplicate files identified by this check must be reviewed and adjudicated by the SA and ISSM before any disposition action. Unauthorized deletion of files on a classified system is an MP-6 and CM-3 violation.

> ⚠️ **AU-9 COMPLIANCE — PROTECT AUDIT LOGS:** The audit log directory ([SITE-DESIGNATED LOG PATH]) must be protected from modification by non-privileged users. Do not delete, alter, or rotate logs outside of ISSM-authorized retention procedures (AU-11).

> ⚠️ **LARGE PATH SCAN TIMES:** Scanning very large file storage paths may take significant time. Coordinate with ISSM to ensure the scan window does not impact operations. Consider scoping the target path to critical directories if full-volume scans are impractical within the maintenance window.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| `check-file-storage-hashes.sh` | **PLACEHOLDER** — Script not yet generated. See Section 1 for expected behavior. Path: `scripts/check-file-storage-hashes.sh` |
| Elevated privileges | Required to read all files under the target path and write to [SITE-DESIGNATED LOG PATH] |
| Bash 4.0+ | Script runtime — standard on all modern Linux distributions |
| `find` | Recursive file traversal — standard coreutils |
| `sha256sum` | Per-file cryptographic hashing — standard coreutils |
| `sort`, `uniq` | Duplicate hash detection — standard coreutils |
| `tee` | Simultaneous console and log output — standard coreutils |
| Target folder path | SA-supplied at script prompt — must be an ISSM-authorized path in scope for this check |
| Authorized file baseline (prior run output) | Previous day's hash inventory log — used for delta comparison if applicable |
| MRC Sign-Off Block | Signed by SA (and ISSM/ISSO if findings present) |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| JSIG SI-7 — Software, Firmware, and Information Integrity | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG AU-2, AU-6, AU-9 — Audit Event Logging | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG CM-3 — Configuration Change Control | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG CM-8 — Information System Component Inventory | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG MP-6 — Media Sanitization | ISSM SharePoint / SAP Cybersecurity Binder |
| Authorized File Storage Path List | ISSM-signed document — SA Document Repository |
| MRC-2301-WK | Weekly File Server Share and ACL Integrity Review (cross-reference) |
| MRC-2302-MO | Monthly Storage Services Health and LUN Integrity Audit (cross-reference) |
| MRC-0103-SA | Daily Scripted Software Inventory Check with Change Audit Logging (cross-reference — same hash methodology) |
| `scripts/check-file-storage-hashes.sh` | **PLACEHOLDER** — MRC Library Repository `scripts/` directory — not yet generated |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 20–30 minutes (active review) + script run time |

*Script run time varies with path size. SA active time is primarily: entering the target path at the prompt, reviewing the duplicate file list output, and completing the sign-off tables.*

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file for this maintenance cycle
- [ ] `check-file-storage-hashes.sh` deployed and executable at `scripts/check-file-storage-hashes.sh` (**PLACEHOLDER — verify when script is generated**)
- [ ] Log directory initialized at [SITE-DESIGNATED LOG PATH] with correct permissions
- [ ] Target folder path confirmed as in-scope per ISSM authorization
- [ ] Root / sudo access confirmed on target host
- [ ] Sufficient maintenance window time available for path scan to complete (estimate based on file count / storage size)
- [ ] Prior run's hash inventory available for reference (or note this as first-run)

---

## 7. Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 1 | Log into the managed host as authorized SA account | SSH or console login → authenticate with CAC / SA credentials | Shell prompt for authorized SA account |
| 2 | Verify the script is present and executable | Navigate to [SITE-DESIGNATED SCRIPT PATH] → verify the script file is present and has execute permissions — **if script not yet generated, stop and note in Section 11** |
| 3 | Run the file storage hash audit script | Execute the script at [SITE-DESIGNATED SCRIPT PATH] with elevated privileges | Script prompts: `Enter target folder path to audit:` |
| 4 | Enter the ISSM-authorized target folder path when prompted | Type full absolute path (e.g., `/mnt/classified-share/`) and press Enter | Script acknowledges path, begins recursive traversal |
| 5 | Allow script to complete file enumeration and hashing | Wait for completion — console shows progress and per-file count | Script outputs: total files hashed, operator identity, scan path, timestamp |
| 6 | Review script exit status | Check console: `STATUS: PASS — No duplicates` or `STATUS: DUPLICATES — [N] duplicate sets detected` | Exit code 0 (clean) or 1 (duplicates found) |
| 7 | Confirm full hash inventory log was written | Navigate to [SITE-DESIGNATED LOG PATH] → verify today's inventory log file is present and non-zero size | File present; non-zero size; contains one `[SHA-256] [path]` entry per file |
| 8 | If duplicates detected — review the duplicate file list | Navigate to [SITE-DESIGNATED LOG PATH] → open today's duplicate file list | Lists each duplicate set: SHA-256 hash followed by all file paths sharing that hash |
| 9 | Confirm operator identity is recorded in the log | Open today's inventory log at [SITE-DESIGNATED LOG PATH] → search for OPERATOR entry | Line present: `OPERATOR: [sa-username] @ [hostname] — [timestamp]` |
| 10 | Confirm scanned path is recorded in the log | Open today's inventory log at [SITE-DESIGNATED LOG PATH] → search for SCAN PATH entry | Line present: `SCAN PATH: [absolute path entered at prompt]` |
| 11 | For each duplicate set — review and adjudicate per Section 9 | Cross-reference duplicate file paths against authorized file inventory and recent change records | Determine: authorized duplicate (document) or unauthorized — notify ISSM |
| 12 | Report unauthorized duplicates or unexpected file additions to ISSM | Phone / secure message per site SOP | ISSM notified; response documented in Section 10 |
| 13 | Complete Scan Summary table (Section 8) | | All fields populated |
| 14 | Complete Duplicate File Adjudication table (Section 9) if applicable | | All duplicate sets reviewed and dispositioned |
| 15 | Complete Findings Summary and Sign-Off block (Sections 10–11) | | SA signature; ISSM/ISSO signature if findings present |

---

## 8. Scan Summary

| Field | Value |
|-------|-------|
| Date of Scan | |
| Operator (SA Name) | |
| Hostname | |
| Target Folder Path (entered at prompt) | |
| Scan Start Time | |
| Scan End Time | |
| Total Files Hashed | |
| Total Unique SHA-256 Hashes | |
| Duplicate Sets Detected | |
| Total Duplicate Files (across all sets) | |
| Log File Path | [SITE-DESIGNATED LOG PATH]/inventory-YYYYMMDD.log |
| Duplicate List Path | [SITE-DESIGNATED LOG PATH]/duplicates-YYYYMMDD.log |
| Overall Status | PASS / DUPLICATES DETECTED / SCRIPT NOT YET GENERATED / ERROR |

---

## 9. Duplicate File Adjudication

*Complete one row per duplicate set detected. If no duplicates, mark "None detected" and leave table blank.*

| Set # | SHA-256 Hash (first 16 chars) | File Path 1 | File Path 2 | Additional Paths | Adjudication | CCB/CR # or ISSM Auth Ref | Action Taken |
|-------|-------------------------------|------------|------------|-----------------|-------------|--------------------------|-------------|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |

*Adjudication: AUTHORIZED-DUPLICATE / UNAUTHORIZED-DUPLICATE / UNDER-REVIEW*
*Action Taken: NO ACTION / ISSM NOTIFIED / SUBMITTED TO CCB / RESOLVED*

---

## 10. Non-Compliance / Findings Log

| # | Finding Description | Control Affected | ISSM Notified | Time | Directed Action | Resolved |
|---|--------------------|-----------------|--------------|----|----------------|---------|
| 1 | | | Y / N | | | Y / N |
| 2 | | | Y / N | | | Y / N |
| 3 | | | Y / N | | | Y / N |

---

## 11. Findings Summary

- [ ] Scan completed — no duplicate files detected — all files within expected baseline
- [ ] Duplicate files detected — all sets reviewed — adjudicated as authorized — documented in Section 9
- [ ] Duplicate files detected — unauthorized duplicates found — ISSM notified — finding in Section 10
- [ ] Script not yet generated — manual hash audit performed (or check deferred) — documented in Section 10
- [ ] Script execution error — documented in Section 10 — ISSM notified if error prevents compliance
- [ ] No findings — all storage content within authorized baseline

---

## 12. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO (required if findings present) | | | | |

**ISSM Authorization Reference:** ___________________________
**Duplicate File List Filed At:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-2308-DA | Rev 1.0 | Category 23 — File & Storage Services*
*Classification: [CLASSIFICATION]*
