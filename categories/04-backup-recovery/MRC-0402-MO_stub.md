---
mrc_id: MRC-0402-MO
title: Monthly Backup Restore Test and Recovery Verification
category: 04 — Backup & Recovery
periodicity: MONTHLY
maintenance_type: PREVENTIVE / TEST
est_time: "01:30"
rin: MO-BCK-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Backup management console ([SITE-DESIGNATED BACKUP PLATFORM]), isolated restore target, data integrity verification utility"
jsig_controls: "CP-9, CP-9(1), CP-10, CP-10(2), MA-2, AU-6, AU-9"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "[CCB CR # — required for restore activity]"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
A backup that has never been tested is not a backup — it is an assumption. Daily job health verification (MRC-0401-DA) confirms jobs complete without errors, but it does not verify that the data is actually recoverable. Corruption, backup chain breaks, catalog mismatches, and media degradation can all produce a backup that reports success but restores nothing. JSIG CP-10 requires that contingency plans be tested, which operationally means restore testing must be performed on a recurring basis.

This MRC performs a controlled monthly restore of at least one critical system or critical dataset, validates that the recovered data is intact and usable, and documents the result as a CP-9/CP-10 evidence artifact for the ISSM and ConMon package. The restore must be performed to an isolated target — not directly over a production system — unless ISSM has specifically authorized a production restore within an authorized maintenance window.

**Scope guidance:** Rotate the restore target monthly across the system inventory (DCs, SIEM server, PKI server, critical file servers, application servers) so that every critical system is tested at least once per quarter. The monthly restore does not need to be a full-system bare-metal recovery — file-level or volume-level restores are acceptable unless the ISSM requires full system recovery testing.

## Safety / Hazards
> ⚠️ **CCB CHANGE REQUEST REQUIRED:** Any restore activity — even a test restore to an isolated target — requires a CCB-approved Change Request and ISSM written authorization before execution (MA-2, CM-3). Do not proceed without both.

> ⚠️ **DO NOT RESTORE TO PRODUCTION WITHOUT SPECIFIC ISSM AUTHORIZATION:** Unless ISSM has authorized a production restore, all test restores must go to a designated test/isolated environment. Overwriting a production system without authorization is a CM-3 violation.

> ⚠️ **DATA CLASSIFICATION:** Restored data retains its original classification. Ensure the restore target is accredited for the classification level of the data being recovered. Do not restore classified data to an unaccredited or lower-classified system.

> ⚠️ **BACKUP CHAIN INTEGRITY:** If the restore test fails, do not modify the backup chain or re-run backup jobs to mask the failure. Document the failure and notify ISSM immediately — a failed restore test is a potential CP-9 finding.

## Tools / Equipment / Access Required
- Backup management console ([SITE-DESIGNATED BACKUP PLATFORM]) — admin access
- Designated restore target (isolated test environment or alternate cleared host)
- CCB-approved Change Request on file before execution
- ISSM written authorization on file before execution
- Authorized restore verification checklist (this MRC)
- SHA-256 or MD5 hash tool for post-restore data integrity check (if applicable)
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — CP-9, CP-9(1), CP-10, CP-10(2), MA-2
- Site-specific Contingency Plan (CP) — test schedule and success criteria
- MRC-0401-DA — Daily Backup Job Health Verification (cross-reference)
- MA-3 Approved Tool List
- CCB Change Request template

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM/ISSO co-sign required on all restore test MRCs regardless of outcome. ISSM immediate notification required for: restore failure, data corruption detected, or backup chain break discovered.

## Prerequisites (JSIG MA-2)
- [ ] CCB-approved Change Request on file and referenced in Section 6
- [ ] ISSM written authorization on file and referenced in this MRC
- [ ] Restore target identified, accredited, and ready (correct classification level)
- [ ] Backup to be tested identified — confirm backup exists and is within retention window
- [ ] Backup console admin credentials current
- [ ] Recovery time objective (RTO) and recovery point objective (RPO) documented per Contingency Plan for comparison

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 1 | Confirm CCB CR is approved and ISSM authorization is on file | Review CR status in CCB ticketing system; confirm ISSM written auth | Both confirmed before proceeding — stop if either absent |
| 2 | Log in to backup management console | [SITE-DESIGNATED BACKUP PLATFORM] — [SITE-SPECIFIC URL or access path] using SA credentials | Console dashboard loads |
| 3 | Identify the restore target for this month's test | Per monthly rotation schedule in Contingency Plan | System identified; restore target confirmed ready |
| 4 | Locate the backup set to be restored | `Jobs > [Target System] > Restore Points` | Identify most recent completed backup; note date, size, and backup job ID |
| 5 | Verify backup chain integrity before restore | Use the Verify Backup function in [SITE-DESIGNATED BACKUP PLATFORM] — [SITE-SPECIFIC NAV or CLI] | Backup chain reports Valid / No errors; chain break = stop, notify ISSM |
| 6 | Initiate restore to isolated test target | `Restore > [Type: File-Level / Volume / Full VM]` → select restore point → select test target host | Restore job starts; console shows progress |
| 7 | Monitor restore job to completion | Console job monitor | Job completes — note restore duration vs. RTO baseline |
| 8 | Verify restored data/system is accessible | Log in to restore target; navigate to restored data or bring system online | Restored data accessible; no missing files, no corruption errors |
| 9 | Spot-check file integrity (file-level restores) | Compare file counts, sizes, and sample SHA-256 hashes vs. known good values from source | Counts and hashes match — data intact |
| 10 | Verify system boots and services start (full-system restore) | Power on restored VM or physical target; check critical services | OS boots; critical services start; no unrecoverable errors |
| 11 | Record actual RTO vs. planned RTO | Log restore start and end times; calculate duration | Actual RTO within CP-defined threshold — or document deviation |
| 12 | Document restore RPO — what is the age of the restored data? | Note restore point timestamp vs. current date/time | RPO within CP-defined threshold — or document deviation |
| 13 | Power off / isolate restore target after test | Shut down or snapshot-revert restore target | Test environment clean — no restored data left exposed |
| 14 | Document all results in Restore Test Summary (Section 6) | | All fields populated |
| 15 | Notify ISSM of any restore failure, RTO/RPO deviation, or data integrity issue | Phone / secure message per site SOP | ISSM notified and response documented |
| 16 | Sign-Off block — ISSM/ISSO co-sign required | Section 7 | Both signatures obtained; MRC filed |

---

## Restore Test Summary

| Field | Value |
|-------|-------|
| Test Date | |
| SA (Performing) | |
| CCB Change Request # | |
| ISSM Authorization Reference | |
| System Under Test (Restore Target) | |
| Restore Type | File-Level / Volume / Full System / VM |
| Backup Set Used (Job ID / Date) | |
| Backup Age (RPO) | |
| Restore Start Time | |
| Restore End Time | |
| Total Restore Duration (Actual RTO) | |
| Planned RTO (per Contingency Plan) | |
| RTO Met? | Y / N — deviation documented below if N |
| Planned RPO (per Contingency Plan) | |
| RPO Met? | Y / N — deviation documented below if N |
| Data Integrity Verified? | Y / N |
| Restore Result | PASS / FAIL / PARTIAL |
| Restore Target Isolated / Cleaned Up | Y / N |

---

## Non-Compliance / Findings Log

| # | Finding Description | Control Affected | ISSM Notified | Time | Directed Action | Resolved |
|---|--------------------|-----------------|--------------|----|----------------|---------|
| 1 | | | Y / N | | | Y / N |
| 2 | | | Y / N | | | Y / N |
| 3 | | | Y / N | | | Y / N |

---

## Findings Summary
- Overall Result: [ ] PASS  [ ] FAIL  [ ] PARTIAL
- Backup Chain Verified: [ ] Valid  [ ] Break detected — ISSM notified
- Restore Completed Successfully: [ ] Yes  [ ] No — documented above
- Data Integrity Confirmed: [ ] Yes  [ ] No / N/A
- RTO Within CP Threshold: [ ] Yes  [ ] No — deviation documented
- RPO Within CP Threshold: [ ] Yes  [ ] No — deviation documented
- Restore Target Sanitized After Test: [ ] Yes  [ ] N/A
- ISSM Notified: [ ] Y  [ ] N/A   Time: _______________
- Artifact file (this MRC): _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (required all restore tests) | | | |

---
*MRC-0402-MO | Rev 1.0 | Category 04 — Backup & Recovery*
*Classification: [CLASSIFICATION]*
