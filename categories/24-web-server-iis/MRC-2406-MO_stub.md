---
mrc_id: MRC-2406-MO
title: "Monthly Storage Services Health and LUN Integrity Audit"
category: "23 — File and Storage Services"
periodicity: Monthly
est_time: "1.5–2 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "PowerShell (Get-Volume, Get-Disk, Get-FileHash), Storage Spaces, iLO/iDRAC, Windows Deduplication"
jsig_controls:
  - SI-12
  - CP-9
  - CM-8
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-2406-MO — Monthly Storage Services Health and LUN Integrity Audit

---

## 1. Background (New SA)

**What this MRC covers:**
1. **LUN / Volume Health:** All storage volumes (local disks, LUNs, Storage Spaces) are verified healthy — no errors, no RAID degradation, no approaching capacity limits.
2. **Integrity Checks (Hash Checks):** Critical data repositories have hash-based integrity verification. A stored hash baseline for key directories is compared against a current hash to detect silent data corruption or unauthorized modification.
3. **Deduplication Health:** If Windows Data Deduplication is enabled, the job health and savings rate are reviewed. A failed deduplication job can indicate storage issues.

---

## 2. Safety / Hazards

> ⚠️ **HASH MISMATCH ON CRITICAL DATA:** If a hash check on a critical data directory shows unexpected changes, treat this as a potential integrity finding. Do not modify data — document and notify ISSM.

> ⚠️ **RAID DEGRADED:** Any degraded RAID or Storage Space is a critical finding. Notify ISSM and do not swap hardware without CCB CR and ISSM authorization.

---

## 3. Procedure Steps

| Step | Action | Command | Expected Result |
|------|--------|---------|-----------------|
| 1 | Review all volumes — health status | `Get-Volume \| Select DriveLetter, FileSystemLabel, HealthStatus, OperationalStatus, SizeRemaining, Size` | All volumes: HealthStatus = `Healthy`, SizeRemaining > 15% |
| 2 | Any volume below 15% free space | Document; notify ISSM; plan capacity expansion | Finding logged |
| 3 | Review disk / LUN health via OOB | iLO/iDRAC → Storage → View RAID controller status | All arrays: `OK`; no degraded drives |
| 4 | Review Storage Spaces (if in use) | `Get-StoragePool \| Get-VirtualDisk \| Select FriendlyName, OperationalStatus, HealthStatus` | All virtual disks: `Healthy`, `OK` |
| 5 | Run hash check on critical data directories | `Get-FileHash -Path [critical directory] -Algorithm SHA256 -Recurse` → compare to stored baseline | Hashes match baseline — no unexpected changes |
| 6 | Any hash mismatch | Document: file, expected hash, current hash. Notify ISSM — potential integrity finding | Finding logged; do not modify data |
| 7 | Review Deduplication job status (if enabled) | `Get-DedupJob \| Select Volume, Type, State, Progress, Duration` | All jobs: State = `Completed`; no `Failed` or `Aborted` jobs |
| 8 | Review Deduplication savings | `Get-DedupVolume \| Select Volume, SavingsRate, SavedSpace` | Savings rate within expected range; no significant degradation |
| 9 | Document all volumes in Section 8 | | All entries populated |
| 10 | Sign-Off block | Section 9 | Signatures obtained |

---

## 8. Storage Health Table

| # | Volume / LUN | Server | Health | Free Space (%) | RAID Status | Hash Check | Dedup Status | Result |
|---|-------------|--------|--------|----------------|------------|-----------|-------------|--------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |

*Result: OK / WARNING / FINDING*

---

## 9. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-2406-MO | Rev 1.0 | Category 23 — File and Storage Services*
*Classification: [CLASSIFICATION]*
