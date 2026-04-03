---
mrc_id: MRC-1501-MO
title: Monthly ConMon Artifact Compilation and Submission
category: 15 — ConMon Artifact Submission
periodicity: MONTHLY
maintenance_type: PREVENTIVE / REPORT / ADMIN
est_time: "01:30"
rin: MO-CCM-001
revision: Rev 1.1
classification: "[CLASSIFICATION]"
tool: "Vulnerability scanner console ([SITE-DESIGNATED SCANNER]), SIEM console ([SITE-DESIGNATED SIEM PLATFORM]), patch management console ([SITE-DESIGNATED PLATFORM]), POA&M tool ([SITE-DESIGNATED TOOL]), secure artifact repository"
jsig_controls: "CA-7, CA-7(1), PM-4, RA-5, AU-9, SI-12"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Artifact compilation and submission; no system changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Continuous Monitoring (ConMon) is the ongoing process of collecting evidence that security controls are working as required. The JSIG and the system's ATO require the SA to compile a defined set of artifacts every month and deliver them to the ISSM. These artifacts are the SA's proof that monitoring is occurring — without them, the ISSM cannot maintain the ATO. Common artifacts include: vulnerability scan reports, patch compliance reports, SIEM log summaries, POA&M updates, and backup verification records. The ISSM defines the exact artifact list, naming convention, and submission deadline. Missing or late submissions are a CA-7 deficiency. This card ensures the monthly package is complete, correctly named, and submitted on time.

## Safety / Hazards
JSIG: All artifact files must be handled and transmitted per the applicable classification level. Do not transmit classified artifacts over unclassified channels. If submitting via removable media (sneakernet), media must be scanned before transfer per site inbound media policy. Do not alter, summarize, or sanitize scan results before submitting — artifacts must be submitted as-exported.

## Tools / Equipment / Access Required
- Vulnerability scanner console (Nessus web console or ACAS portal)
- SIEM console (Splunk: `https://[SIEM-SERVER]:8000` or equivalent)
- Patch management console (WSUS: `http://[WSUS-SERVER]:8530/wsus` or SCCM)
- POA&M tool (eMASS or ISSM-designated spreadsheet/system)
- Secure artifact repository or submission path (defined by ISSM)
- ISSM-defined artifact naming convention and checklist

## Reference Documents
- JSIG — CA-7, CA-7(1), PM-4, RA-5, AU-9
- Site ConMon Strategy document (ISSM-maintained)
- ISSM artifact naming convention and submission deadline notice
- DoDI 8510.01 — RMF for DoD IT (ConMon requirements)
- eMASS user guide (if eMASS is the submission platform)

## Manpower Requirements
1x SA, coordination with ISSO for POA&M updates. ISSM defines submission deadline — typically aligned with ISSM's ATO reporting cycle. Submit no later than ISSM-stated deadline.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Vulnerability scan (MRC-0204-MO) completed this cycle and report available
- POA&M updated (MRC-0205-MO) and current
- Patch compliance report for the current month generated
- SIEM accessible and monthly log export available
- ISSM submission deadline confirmed

---

## Procedure Steps

| Step | Action | Nav Path / Tool | Expected Result |
|------|--------|----------------|----------------|
| 1 | Confirm ISSM submission deadline for this cycle | ISSM communication channel | Deadline confirmed; calendar reminder set |
| 2 | Export vulnerability scan report | Nessus: `Scans > [SCAN] > Export > PDF` (full detail) | Report saved: `[SystemID]_VulnScan_[YYYYMM].pdf` |
| 3 | Export SIEM monthly event summary | Splunk: `Search & Reporting > export saved monthly report` or custom search export | Log summary saved: `[SystemID]_SIEM_Summary_[YYYYMM].pdf` |
| 4 | Export patch compliance report | WSUS/SCCM: compliance report for current patch cycle | Report saved: `[SystemID]_PatchCompliance_[YYYYMM].pdf` |
| 5 | Confirm POA&M is current — verify all open items have current milestone dates | POA&M tool — review each open item; confirm no items missing updates | POA&M current; no stale entries; file exported: `[SystemID]_POA&M_[YYYYMM].xlsx` or eMASS export |
| 6 | Retrieve backup verification record for the month | Backup console monthly report or prior MRC-0401-DA records | Backup record available: `[SystemID]_BackupLog_[YYYYMM].pdf` (or equivalent) |
| 7 | Collect any additional site-required artifacts (per ISSM checklist) | ISSM ConMon checklist | All required artifacts collected; none missing |
| 8 | Verify all file names match ISSM naming convention | Review each file against ISSM naming guide | All files correctly named; rename if needed |
| 9 | Bundle all artifacts into monthly ConMon package | Create folder: `[SystemID]_ConMon_[YYYYMM]/`; verify all files present | Package complete and complete per ISSM checklist |
| 10 | Scan package media (if transferring via removable media) | Inbound scan station per site media policy | Media scanned; clean |
| 11 | Submit package to ISSM via defined delivery method | [eMASS upload / secure share / hand delivery — per ISSM direction] | Submission confirmed; record submission date and method below |
| 12 | Obtain ISSM acknowledgment of receipt | ISSM confirmation email / eMASS submission receipt | Acknowledgment documented |
| 13 | Sign and date MRC; file as CA-7 BoE artifact | SA signature; ISSM/ISSO co-sign | MRC retained per AU-11 |

---

## Artifact Checklist (Complete at Submission)

| Artifact | File Name | Included | Notes |
|----------|-----------|----------|-------|
| Vulnerability scan report | `[SystemID]_VulnScan_[YYYYMM].pdf` | ☐ Yes ☐ N/A | |
| SIEM log summary | `[SystemID]_SIEM_Summary_[YYYYMM].pdf` | ☐ Yes ☐ N/A | |
| Patch compliance report | `[SystemID]_PatchCompliance_[YYYYMM].pdf` | ☐ Yes ☐ N/A | |
| POA&M update | `[SystemID]_POA&M_[YYYYMM].[ext]` | ☐ Yes ☐ N/A | |
| Backup verification record | `[SystemID]_BackupLog_[YYYYMM].pdf` | ☐ Yes ☐ N/A | |
| [Site-specific artifact 1] | | ☐ Yes ☐ N/A | Per ISSM checklist |
| [Site-specific artifact 2] | | ☐ Yes ☐ N/A | Per ISSM checklist |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- All Required Artifacts Collected: [ ] Yes  [ ] No — missing: _______________
- All Files Correctly Named: [ ] Yes  [ ] No — corrected before submission
- Submission Date: _______________
- Delivery Method: _______________
- ISSM Acknowledged Receipt: [ ] Y  [ ] N   Time: _______________
- Submitted by Deadline: [ ] Yes  [ ] Late — reason: _______________
- Artifact file (this MRC): _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (Review & Acceptance) | | | |
