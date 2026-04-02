---
mrc_id: MRC-0701-DA
title: Daily IDS/IPS and Network Alert Review
category: Network & Boundary Security
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:20"
rin: DA-NET-001
revision: Rev 1.0
---

## Procedure Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Log in to IDS/IPS management console. | Authenticated successfully. |
| 2 | Review all alerts generated in the previous 24 hours. Triage by severity. | No unreviewed High/Critical alerts. |
| 3 | Tune/acknowledge known-good (false positive) alerts per standing rules. | Alert queue actioned. |
| 4 | Escalate any confirmed or suspected intrusion events to ISSO immediately. | Escalation logged if applicable. |
| 5 | Review VPN connection logs for anomalous source IPs or off-hours access. | Consistent with expected usage patterns. |
| 6 | Verify sensor/collector health — confirm all sensors reporting. | All sensors active. |
| 7 | Sign and date MRC. | MRC complete. |

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
