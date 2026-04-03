---
mrc_id: MRC-2304-MO
title: Monthly FSRM Quota and File Screen Compliance Review
category: 23 — File and Storage Services
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:35"
rin: MO-FSRM-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "File server resource manager console or CLI ([SITE-DESIGNATED FSRM PLATFORM]), quota and file screen management interface, OS event log"
jsig_controls: "CM-6, CM-7, SI-12, AC-6, AU-9, CP-9"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no quota template, file screen, or report schedule changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
File Server Resource Manager (FSRM) is a Windows Server role service that provides three key controls for file servers: **Quotas** (limits on how much disk space a folder or user can consume), **File Screens** (blocks prohibited file types from being saved to specific locations — e.g., preventing `.mp3` or personal media files from being saved in classified working folders), and **Storage Reports** (scheduled reports on disk usage, large files, duplicate files, and quota violations). In a SAP environment, FSRM is a CM-7 enforcement tool — it keeps classified storage from being filled with unauthorized content and enforces data type policies. A disabled file screen means a user could store any file type — including potentially prohibited software — in a classified share. This card verifies that FSRM is running, quotas and file screens are configured per the approved baseline, and no violations are outstanding.

## Safety / Hazards
JSIG: Do not modify FSRM quota templates, file screen templates, or file screen exceptions without a CCB-approved Change Request and ISSM written authorization. Unauthorized file screen exceptions may allow prohibited file types on classified storage. Any quota or file screen removed without authorization is a CM-6 / CM-7 violation.

## Tools / Equipment / Access Required
- File Server Resource Manager MMC — `fsrm.msc` (run on file server or via Remote Server Administration Tools)
- PowerShell FSRM module: `Get-FsrmQuota`, `Get-FsrmFileScreen`, `Get-FsrmStorageReport`, `Get-FsrmAutoQuota`
- Event Viewer — `eventvwr.msc`
- ISSM/ISSO contact for escalation
- Approved FSRM quota and file screen baseline documentation

## Reference Documents
- JSIG — CM-6, CM-7, SI-12, AC-6, AU-9
- DISA STIG — Windows Server File Server benchmark
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List
- Site-specific FSRM policy baseline (ISSM-approved)

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: file screen found disabled or missing on classified share, quota template modified without authorization, file screen exception granted without CCB approval, or prohibited file type detected in classified storage.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to FSRM on all file servers
- Approved FSRM quota and file screen baseline

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Verify FSRM service is running | `Get-Service srmsvc` | Status: Running |
| 2 | List all configured quotas and verify they match approved baseline | `Get-FsrmQuota \| Select Path, Template, SoftLimit, Disabled` | All quotas present; no unauthorized removals; no quotas disabled |
| 3 | Check for quota violations (folders at or over limit) | `Get-FsrmQuota \| Where-Object {$_.Usage -ge $_.Size}` or review `fsrm.msc` > Quota Management > Quotas > sort by Usage | Zero quota violations; near-limit folders documented |
| 4 | List all file screens and verify they match approved baseline | `Get-FsrmFileScreen \| Select Path, Template, Active` | All file screens present; none disabled; templates match baseline |
| 5 | **JSIG CHECK** — Verify no file screens on classified shares are disabled or have unauthorized exceptions | `Get-FsrmFileScreen \| Where-Object {$_.Active -eq $false}`; `Get-FsrmFileScreenException` | Zero disabled screens on classified paths; exceptions match approved list |
| 6 | Review file screen templates — verify blocked file groups have not been modified | `Get-FsrmFileScreenTemplate \| Select Name, IncludeGroup`; `Get-FsrmFileGroup \| Select Name, IncludePattern` | Templates and file groups match approved baseline |
| 7 | Verify storage reports are scheduled and running | `Get-FsrmStorageReport \| Select Name, Schedule, LastRun, LastRunStatus` | Reports scheduled; last run completed successfully |
| 8 | Review most recent storage report for anomalies | `fsrm.msc` > Storage Reports Management > review last report output | No unexpected large files, duplicate files, or quota violations |
| 9 | Verify FSRM email notification settings are configured (for quota/screen alerts) | `Get-FsrmSetting \| Select SmtpServer, AdminEmailAddress` | SMTP server and admin email configured; alerts will be delivered |
| 10 | Review FSRM event logs for violations (last 30 days) | `Event Viewer > Applications and Services Logs > Microsoft > Windows > FSRM` — IDs: 8210 (quota), 8215 (file screen violation) | Violations reviewed; any blocked prohibited file types investigated and reported |
| 11 | Document all findings in findings log below | — | All discrepancies recorded |
| 12 | Sign and date MRC; file as CM-7 / SI-12 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## FSRM Configuration Summary (Complete at time of check)

| Share / Path | Quota Template | Quota % Used | File Screen Template | Screen Active | Exceptions | Notes |
|-------------|---------------|-------------|---------------------|--------------|-----------|-------|
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |

---

## Non-Compliance / Findings Log

| # | Finding Description | Path / Template Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|--------------------------|-----------------|-----------|-----------  |--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- FSRM Service: [ ] Running  [ ] Down — remediated
- Quota Violations: [ ] None  [ ] Found: ___ paths — documented
- Missing or Disabled Quotas: [ ] None  [ ] Found — ISSM notified
- File Screens Disabled on Classified Paths: [ ] None  [ ] Found — ISSM notified immediately
- Unauthorized File Screen Exceptions: [ ] None  [ ] Found — ISSM notified
- Prohibited File Types Detected: [ ] None  [ ] Found — investigated
- Storage Reports Running: [ ] Yes  [ ] Failed — remediated
- Paths checked: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
