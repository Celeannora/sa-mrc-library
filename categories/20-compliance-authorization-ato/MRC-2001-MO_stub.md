---
mrc_id: MRC-2001-MO
title: Monthly ATO Status and POA&M Milestone Review
category: 20 — Compliance & Authorization (ATO)
periodicity: MONTHLY
maintenance_type: PREVENTIVE / REPORT / ADMIN
est_time: "01:00"
rin: MO-ATO-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "POA&M tracking tool ([SITE-DESIGNATED TOOL — e.g., eMASS, spreadsheet]), ATO authorization letter (on file), System Security Plan (SSP), ISSM communication channel"
jsig_controls: "CA-5, CA-6, CA-7, CA-7(1), RA-3, PM-4, AU-9"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Administrative review; no system changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
An Authorization to Operate (ATO) is the formal approval — granted by the Authorizing Official (AO) — that allows a SAP information system to process classified data. The ATO is not permanent. It has an expiration date (typically 1, 2, or 3 years), and it can be revoked at any time if the security posture degrades significantly. Maintaining the ATO requires continuous monitoring evidence, an up-to-date POA&M, and an SSP that reflects the current system state. The SA's role is not to manage the ATO directly — that is the ISSM's responsibility — but to provide accurate, timely data: POA&M status, MRC completion records, and any changes to the system that could affect the authorization boundary. This monthly card ensures the SA has reviewed the ATO expiration timeline, verified that open POA&M items are on track, and surfaced any new risks or system changes to the ISSM before the next ConMon cycle closes.

## Safety / Hazards
JSIG: Do not alter, back-date, or falsify ATO documentation, POA&M entries, or SSP content. The ATO package is a federal document — falsification is a criminal offense. Do not make system changes that alter the authorization boundary (new hardware, new software, new interconnections) without a CCB-approved Change Request and ISSM notification — undocumented boundary changes can invalidate the ATO. If the ATO is within 90 days of expiration and no renewal action has been initiated, stop and notify ISSM immediately.

## Tools / Equipment / Access Required
- ATO authorization letter (on file with ISSM — review date and expiration date)
- POA&M tracking tool (eMASS or ISSM-designated spreadsheet/system)
- System Security Plan (SSP) — current version on file with ISSM
- ISSM/ISSO contact for review coordination
- ConMon artifact package for current month (from MRC-1501-MO)

## Reference Documents
- JSIG — CA-5, CA-6, CA-7, RA-3, PM-4
- NIST SP 800-37 Rev 2 — RMF Authorization Process
- DoDI 8510.01 — RMF for DoD IT (ATO and ConMon requirements)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- NIST SP 800-53A — Assessment and Authorization guidance
- Site-specific Continuous Monitoring Strategy document

## Manpower Requirements
1x SA (reviewing status and documenting). ISSM review required for: ATO approaching expiration, any new POA&M items added since last review, any system changes affecting the authorization boundary, and any ConMon artifacts that could not be collected this cycle.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Current month ConMon artifacts available (MRC-1501-MO completed)
- POA&M access confirmed
- ATO authorization letter on file and expiration date known

---

## Procedure Steps

| Step | Action | Location / Tool | Expected Result |
|------|--------|----------------|----------------|
| 1 | Retrieve ATO authorization letter — confirm expiration date | ISSM-maintained ATO file (secure storage) | ATO expiration date confirmed and recorded below |
| 2 | Calculate days remaining until ATO expiration | Current date vs. ATO expiration date | Days remaining calculated; if ≤ 90 days and no renewal in progress → notify ISSM immediately |
| 3 | Confirm ATO renewal is in progress if within 90-day window | Verify with ISSM that renewal package is being assembled | Renewal initiated if within window; documented below |
| 4 | Verify current SSP version reflects system as-built | Confirm SSP version with ISSM; check for any system changes since last SSP update | SSP current; any undocumented changes (new hardware, software, interconnections) reported to ISSM |
| 5 | Open POA&M — review all open Critical items | POA&M tool > filter Severity = Critical, Status = Open | All Critical items reviewed; items past milestone date escalated to ISSM |
| 6 | Review all open High items | POA&M tool > filter Severity = High, Status = Open | Same as Step 5; overdue High items escalated |
| 7 | Review any items with milestone dates in the next 30 days | POA&M tool > filter Scheduled Completion within 30 days | Upcoming milestones flagged; SA confirms remediation is on track or requests ISSM milestone extension |
| 8 | Review any Risk Acceptances — confirm they have not expired | POA&M tool > filter Status = Risk Accepted | Each risk acceptance has a valid expiration date; expired acceptances escalated to ISSM for re-approval |
| 9 | Confirm this month's ConMon artifact package was submitted | Review MRC-1501-MO completion record | Package submitted and ISSM acknowledged; if not, escalate immediately (CA-7 deficiency) |
| 10 | Review any system changes made since last monthly review (new hardware, software installs, config changes) | CCB change log / SA work log | Any changes that affect the authorization boundary documented and reported to ISSM for SSP update |
| 11 | Document ATO status summary and POA&M metrics in table below | — | Summary complete |
| 12 | Submit monthly ATO/POA&M status summary to ISSM | Email / eMASS / ISSM communication channel | ISSM acknowledged; submission documented |
| 13 | Sign and date MRC; file as CA-6 / CA-7 BoE artifact | SA signature; ISSM/ISSO co-sign | MRC retained per AU-11 |

---

## ATO Status Summary (Complete at time of check)

| Item | Value | Status |
|------|-------|--------|
| ATO Authorization Date | | |
| ATO Expiration Date | | |
| Days Remaining | | ≥ 90 days ✓ / < 90 days ⚠️ — renewal initiated |
| ATO Renewal In Progress | | Y / N / N/A (> 90 days) |
| Current SSP Version | | |
| SSP Last Updated | | |
| ConMon Package Submitted This Cycle | | Y / N — escalated |
| Open Critical POA&M Items | | Count |
| Open High POA&M Items | | Count |
| Items Past Milestone Date | | Count — must be 0 or escalated |
| Expired Risk Acceptances | | Count — must be 0 or escalated |
| Items with Milestone in Next 30 Days | | Count |
| System Boundary Changes Since Last Review | | None / Documented |

---

## Escalation / Action Log

| # | Issue | Severity | Action Taken | Escalated To | Date Resolved |
|---|-------|----------|-------------|-------------|--------------|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- ATO Status: [ ] Current (> 90 days remaining)  [ ] Renewal Window (≤ 90 days) — renewal initiated  [ ] CRITICAL — expiration imminent, ISSM notified
- POA&M Overdue Items: ___ (must be 0 or escalated)
- Expired Risk Acceptances: ___ (must be 0 or escalated)
- ConMon Package Submitted: [ ] Y  [ ] N — escalated to ISSM
- System Boundary Changes Reported to ISSM: [ ] Y  [ ] N/A (no changes)
- Monthly Status Submitted to ISSM: [ ] Y   Date/Time: _______________
- ISSM Acknowledged: [ ] Y  [ ] N   Time: _______________
- Artifact file (this MRC): _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (Review) | | | |
