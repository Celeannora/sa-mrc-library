---
mrc_id: MRC-0801-MO
title: Monthly STIG/SCAP Scan and Configuration Drift Detection
category: Configuration & Baseline Management
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "02:00"
rin: MO-CFG-001
revision: Rev 1.0
---

## Procedure Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Launch SCAP Compliance Checker (SCC) or equivalent tool. Select applicable STIG benchmark(s). | Tool ready with correct benchmark loaded. |
| 2 | Run authenticated scan against target system(s). Record scan start/end time. | Scan completes without errors. |
| 3 | Review scan results. Identify new CAT I findings (open/fail). Escalate to ISSM immediately. | Zero new CAT I findings (or escalated). |
| 4 | Review new CAT II findings. Add to POA&M with remediation timeline. | All new findings tracked. |
| 5 | Compare results against previous month's baseline. Document any newly introduced drift. | Drift documented and attributed to authorized change or identified as unauthorized. |
| 6 | Export scan report and save to ConMon artifact repository. | Report saved per naming convention. |
| 7 | Submit scan results to ISSM as monthly ConMon artifact. | Submitted. |
| 8 | Sign and date MRC. | MRC complete. |

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
