---
mrc_id: MRC-0301-DA
title: Daily AV/EDR Definition and Agent Health Verification
category: 03 — Antivirus / EDR
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:20"
rin: DA-AV-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
jsig_controls: "AC-6(1) [NON-TAILORABLE], SI-3, CM-6"
non_tailorable: "NON-TAILORABLE: AC-6(1) — Endpoint protection coverage is mandatory on all SAP systems"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no configuration changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
---

## Safety / Hazards
JSIG: Do not modify EDR policies, exclusions, or configuration without CCB-approved Change Request and ISSM authorization. Any offline or unprotected endpoint constitutes a NON-TAILORABLE control failure (AC-6(1)) — stop and notify ISSM immediately.

## Tools / Equipment / Access Required
- EDR/AV management console (approved per MA-3)
- Privileged SA account (cleared, SAP-authorized per MA-5)
- ISSM/ISSO contact for immediate escalation

## Reference Documents
- JSIG — AC-6(1) [Non-Tailorable], SI-3
- DoDM 5205.07 Vol. 1 — ISSM responsibilities
- DISA STIG — applicable AV/EDR product benchmark
- MA-3 Approved Tool List

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for any non-compliant endpoint.

## Prerequisites (JSIG MA-2)
System in normal operational state. ISSM written authorization on file for this MRC series.

## Procedure Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Log in to EDR/AV management console using authorized privileged account. | Authenticated. |
| 2 | Check definition/signature currency across all managed SAP endpoints. | Definitions within 24 hours. |
| 3 | Identify any endpoints with outdated definitions or OFFLINE agent status. Document in Finding column. NON-TAILORABLE: any offline endpoint = immediate ISSM notification. | Zero offline or outdated endpoints. |
| 4 | Review active detections and quarantine queue. Document all new items. | Queue reviewed; all items dispositioned. |
| 5 | Escalate any unresolved High/Critical detections to ISSO immediately (IR-6). Document escalation. | Escalation documented if applicable. |
| 6 | Initiate forced definition update on any non-current endpoints. Confirm update success. | All endpoints current post-update. |
| 7 | Sign and date MRC. Retain as AC-6(1) / SI-3 BoE artifact. | MRC signed, filed, retained. |

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- NON-TAILORABLE AC-6(1): [ ] All endpoints protected  [ ] FAILURE — ISSM notified immediately
- Deficiencies: [ ] None  [ ] POA&M Required  [ ] Immediate Action Required
- Offline Endpoint Count: ___    ISSM Notified: [ ] Y  [ ] N   Time: _______________
