---
mrc_id: MRC-0301-DA
title: Daily AV/EDR Definition and Agent Health Verification
category: Antivirus / EDR
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:20"
rin: DA-AV-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
---

## Safety / Hazards
N/A — Read-only console review. Do not modify EDR policies without ISSM authorization.

## Tools / Equipment / Access Required
- EDR / AV management console (admin or read role)
- Privileged SA account

## Reference Documents
- NIST SP 800-53 SI-3
- DISA STIG — Antivirus applicable to installed product
- [Local SOP Reference]

## Manpower Requirements
1x SA. ISSO notification required for any unresolved detections.

## Procedure Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Log in to EDR/AV management console. | Successful authentication. |
| 2 | Check definition/signature currency across all managed endpoints. | Definitions within 24 hours of current date. |
| 3 | Identify any endpoints with outdated definitions or offline agent status. Document in Finding column. | Zero offline or outdated endpoints. |
| 4 | Review active detections and quarantine queue. Document any new items. | Queue reviewed and actioned. |
| 5 | Escalate any unresolved High/Critical detections to ISSO immediately. | Escalation documented if applicable. |
| 6 | Initiate forced definition update on any non-current endpoints. Confirm update success. | All endpoints current. |
| 7 | Sign and date MRC. | MRC complete. |

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Deficiencies: [ ] None  [ ] POA&M Required  [ ] Immediate Action Required
