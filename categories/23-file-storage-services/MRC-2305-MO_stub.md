---
mrc_id: MRC-2305-MO
title: Monthly Data Deduplication Health and Savings Verification
category: 23 — File and Storage Services
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:25"
rin: MO-DEDUP-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "PowerShell (Deduplication module), Server Manager > File and Storage Services > Volumes, Event Viewer"
jsig_controls: "CM-6, CP-9, SC-28, AU-9, SI-7"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no deduplication policy or schedule changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Data Deduplication (Dedup) is a Windows Server feature that saves disk space by identifying and removing duplicate blocks of data across files on a volume. Instead of storing three identical copies of the same 100 MB file, Dedup stores it once and creates small pointers. This can reduce volume usage by 30–95% depending on content type. In a SAP environment, Dedup may be deployed on classified file shares or backup volumes to extend storage life. The risk: if Dedup's chunk store (the database that tracks all deduplicated blocks) becomes corrupted or the job stops running, files that appear intact may actually fail to open — because the referenced blocks are missing or damaged. This card verifies that Dedup jobs are completing successfully, the chunk store is healthy, and no data integrity errors have occurred.

## Safety / Hazards
JSIG: Do not enable Data Deduplication on a volume without a CCB-approved Change Request and ISSM written authorization — especially on volumes containing classified data. Do not disable or uninstall Dedup on an active volume without proper data recall/rehydration first, or all deduplicated files will become inaccessible. Any Dedup integrity errors must be treated as a potential CP-9 / SI-7 issue and reported to ISSM.

## Tools / Equipment / Access Required
- PowerShell Dedup module: `Get-DedupStatus`, `Get-DedupJob`, `Get-DedupVolume`, `Get-DedupSchedule`
- Server Manager > File and Storage Services > Volumes — Dedup status column
- Event Viewer — `eventvwr.msc`
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — CM-6, CP-9, SC-28, AU-9, SI-7
- DISA STIG — Windows Server benchmark (storage sections)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List
- Site-specific deduplication authorization documentation (ISSM-signed)

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: Dedup job failure for > 48 hours, chunk store corruption detected, file recall/read errors on deduplicated volume, or Dedup found enabled on unauthorized volume.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Authorized Dedup volume list (volumes where Dedup is approved)
- Access to file server(s) hosting deduplicated volumes

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | List all volumes with Dedup enabled | `Get-DedupVolume \| Select Volume, Enabled, UsageType` | Enabled volumes match authorized list; no unauthorized Dedup volumes |
| 2 | Check Dedup status for each enabled volume | `Get-DedupStatus \| Select Volume, SavedSpace, SavingsRate, OptimizedFilesCount, InPolicyFilesCount, LastOptimizationTime` | Jobs completing; savings rate within expected range; no zero-optimization issues |
| 3 | Check last optimization job run time | Review `LastOptimizationTime` from `Get-DedupStatus` | Optimization ran within past 48 hours; flag if older — investigate |
| 4 | Check for any failed Dedup jobs | `Get-DedupJob \| Where-Object {$_.State -eq "Failed"}` | Zero failed jobs |
| 5 | Review Dedup job history and duration | `Get-DedupJob` — review all recent jobs | Jobs completing in expected timeframe; unusually long jobs documented |
| 6 | Verify Dedup schedule is configured and active | `Get-DedupSchedule \| Select Name, Enabled, Days, Start, StopWhenSystemBusy` | Schedule enabled; runs at appropriate times (e.g., off-hours) |
| 7 | Run Dedup integrity scrub (if not recently run) | `Start-DedupJob -Volume [DRIVE-LETTER:] -Type Scrubbing` — note: this is an active operation; only run if ISSM-authorized routine maintenance | Scrub completes with zero integrity errors |
| 8 | Check chunk store health | `Get-DedupStatus \| Select Volume, ChunkStoreInUseSize, UnoptimizedSize, CorruptionCount` | `CorruptionCount = 0`; any non-zero value is critical — notify ISSM immediately |
| 9 | Verify no Dedup errors affecting file accessibility | `Event Viewer > Windows Logs > Application` — source: `Dedup`; IDs: 2032, 2034 (read errors), 2068 (corruption) | Zero file read or corruption events |
| 10 | Verify Dedup volumes are BitLocker-encrypted | `Get-BitLockerVolume` — confirm all Dedup-enabled volumes are ProtectionStatus = On | All Dedup volumes encrypted (SC-28 compliance) |
| 11 | Document all findings in findings log below | — | All discrepancies recorded |
| 12 | Sign and date MRC; file as CP-9 / CM-6 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Dedup Volume Status Summary (Complete at time of check)

| Volume | Usage Type | Savings Rate % | Last Optimization | Last Job Status | Corruption Count | Notes |
|--------|-----------|---------------|-----------------|----------------|-----------------|-------|
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |

---

## Non-Compliance / Findings Log

| # | Finding Description | Volume / Job Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|-----------------------|-----------------|-----------|-----------  |--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Dedup Jobs Completing: [ ] All successful  [ ] Failed — documented
- Last Optimization Within 48 Hours: [ ] Yes  [ ] No — investigated
- Chunk Store Corruption Count: ___ (must be zero; any non-zero = ISSM notified immediately)
- Unauthorized Dedup Volumes: [ ] None  [ ] Found — ISSM notified
- Dedup Volumes Encrypted (SC-28): [ ] All  [ ] Not encrypted — ISSM notified
- File Read/Access Errors: [ ] None  [ ] Found — ISSM notified
- Volumes checked: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
