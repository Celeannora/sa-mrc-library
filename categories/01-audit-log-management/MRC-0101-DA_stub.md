---
mrc_id: MRC-0101-DA
title: Daily Security Event and Audit Log Review
category: Audit & Log Management
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:30"
rin: DA-LOG-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
---

## Safety / Hazards
Do not modify, delete, or suppress any log entries. Access is read-only unless a remediation action is authorized in writing by the ISSM.

## Tools / Equipment / Access Required
- SIEM console (read role minimum)
- Privileged SA account
- Incident ticketing system
- MRC completion log

## Reference Documents
- NIST SP 800-53 AU-6, SI-4
- DoDI 8500.01
- [Local SOP Reference]
- System Security Plan (SSP)

## Manpower Requirements
1x SA (Journeyman or above). ISSO notification required if anomalies are found.

## Prerequisites
System is in normal operational state. Last review timestamp is available.

## Procedure Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Verify current date/time. Confirm within operational window. Record start time. | Start time logged. |
| 2 | Log in to SIEM console with authorized privileged account. Record account used. | Successful authentication. |
| 3 | Set time range to previous 24-hour period (or since last review). | Correct time window applied. |
| 4 | Review FAILED AUTHENTICATION events. Threshold: >[X] failures from single source/hour triggers escalation. | Volume consistent with baseline. |
| 5 | Review PRIVILEGE ESCALATION events. Verify all events correlate to authorized activities. | No unexplained escalations. |
| 6 | Review ACCOUNT MANAGEMENT events (create, modify, delete, lock). Verify match to approved tickets. | All changes authorized. |
| 7 | Review IDS/IPS alert queue. Clear known-good alerts. Escalate High/Critical immediately. | Queue actioned. |
| 8 | Confirm audit log service is running and forwarding. Verify last log receipt within 15 minutes. | Green / Active status. |
| 9 | Open incident ticket for any anomalies found. Document ticket number below. | Ticket created if applicable. |
| 10 | Sign and date MRC. File in daily maintenance log. | MRC complete. |

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Deficiencies: [ ] None  [ ] POA&M Required  [ ] Immediate Action Required
- POA&M / Ticket #: _______________
