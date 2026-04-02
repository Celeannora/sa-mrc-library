---
mrc_id: MRC-0601-DA
title: Daily System Health Dashboard Review
category: System Health & Performance
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:20"
rin: DA-HLTH-001
revision: Rev 1.0
---

## Procedure Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open monitoring dashboard (Nagios / PRTG / [tool]). Review all host statuses. | All hosts GREEN / UP. |
| 2 | Review CPU utilization. Flag any host sustained above [X]% for >15 min. | Within baseline thresholds. |
| 3 | Review memory utilization. Flag hosts above [X]% sustained. | Within baseline thresholds. |
| 4 | Review disk usage. Flag any volume above [X]% capacity. | Adequate free space on all volumes. |
| 5 | Review RAID / storage controller alerts (iLO / iDRAC / vendor tool). | No degraded or failed arrays. |
| 6 | Verify all critical services are in a running state. | All services UP. |
| 7 | Document any anomalies and open a ticket if thresholds are exceeded. | Tickets created as applicable. |
| 8 | Sign and date MRC. | MRC complete. |

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
