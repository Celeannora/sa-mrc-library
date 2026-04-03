---
mrc_id: MRC-0401-DA
title: Daily Backup Job Completion and Health Verification
category: 04 — Backup & Recovery
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:15"
rin: DA-BCK-001
revision: Rev 1.1
classification: "[CLASSIFICATION]"
tool: "Backup management console ([PRODUCT — e.g., Veeam, Windows Server Backup, Commvault]), backup target storage (NAS/tape), ISSM/ISSO contact"
jsig_controls: "CP-9, CP-9(1), CP-10, AU-9, SI-12"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only verification; no configuration changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Backups are the last line of defense against data loss from hardware failure, ransomware, accidental deletion, or catastrophic failure. In a SAP environment, the JSIG and the system's Contingency Plan require that backup jobs run on their scheduled cadence and complete successfully. A failed backup that goes unnoticed is a silent risk — if a restore is ever needed and the most recent backup is corrupt or missing, recovery may be impossible. This card verifies that all backup jobs from the previous 24 hours completed successfully, storage capacity is sufficient, and any failures are immediately documented and remediated.

## Safety / Hazards
JSIG: Do not modify backup schedules, retention policies, or target locations without a CCB-approved Change Request and ISSM written authorization. Do not attempt a live restore from this card — restores require a separate change request and ISSM authorization (CP-10). Backup failures on critical systems (DCs, SIEM, PKI) must be reported to ISSM same-day.

## Tools / Equipment / Access Required
- Backup management console ([PRODUCT name and URL/path])
- Privileged SA account (cleared, SAP-authorized per MA-5)
- Access to backup target storage (NAS, tape, or cloud — as applicable)
- ISSM/ISSO contact info for escalation

## Reference Documents
- JSIG — CP-9, CP-9(1), CP-10, AU-9, SI-12
- Site-specific Contingency Plan (CP)
- MA-3 Approved Tool List
- Backup retention and media handling policy (ISSM-maintained)

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: any critical system backup failure, storage capacity below threshold, or replication failure affecting off-site copy.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Backup console accessible; service account credentials current
- Storage capacity threshold defined by ISSM (typically ≥ 20% free)

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Log in to backup management console | [PRODUCT URL or MMC path] using SA credentials | Console dashboard loads |
| 2 | Navigate to job history / activity log | `Dashboard > Jobs > Last 24 Hours` (path varies by product) | All jobs from prior 24-hour period listed |
| 3 | Review all backup job statuses | Scan status column — look for `Failed`, `Warning`, or `Missed` | All jobs `Completed Successfully`; any non-success status flagged |
| 4 | For any failed job, identify affected system(s) and failure reason | Open failed job details; note error code, affected host, and last successful backup date | Failure documented; ticket opened |
| 5 | Verify replication jobs completed (if off-site/secondary copy is configured) | `Replication Jobs` or `Copy Jobs` section | Replication healthy; secondary copy current |
| 6 | Check backup target storage capacity | Storage view in console or `Get-Volume` on backup target server | Free space ≥ [THRESHOLD]%; if below threshold, notify ISSM |
| 7 | Verify critical systems completed backup (DCs, SIEM, PKI, patch server) | Filter job list by critical system hostnames | All critical systems backed up within last 24 hours |
| 8 | Check for media alerts (tape full, media expired, or drive errors — if tape-based) | Media management section (if applicable) | No media errors; replace/rotate as needed |
| 9 | Document any failures in Non-Compliance log below | — | Failure documented; remediation action noted |
| 10 | Notify ISSM of any critical system backup failure | Phone / secure email / ISSM communication channel | ISSM notified; escalation documented |
| 11 | Sign and date MRC; file as CP-9 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Non-Compliance / Findings Log

| # | System / Job Name | Last Successful Backup | Failure Reason | Action Taken | Escalated To | Date Resolved |
|---|------------------|----------------------|----------------|-------------|-------------|--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- All Backup Jobs Successful: [ ] Yes  [ ] No — ___ job(s) failed; ticket(s) opened
- Critical Systems Backed Up: [ ] Yes  [ ] No — ISSM notified
- Storage Capacity Adequate: [ ] Yes  [ ] No — ISSM notified; current free: ___%
- Replication Healthy (if applicable): [ ] Yes  [ ] No / N/A
- ISSM Notified: [ ] Y  [ ] N/A   Time: _______________
- Artifact file (this MRC): _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
