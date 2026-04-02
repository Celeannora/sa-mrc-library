---
mrc_id: MRC-0401-DA
title: Daily Backup Job Completion and Health Verification
category: Backup & Recovery
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:15"
rin: DA-BCK-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
---

## Procedure Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Log in to backup management console. | Successful authentication. |
| 2 | Review all backup jobs from the previous 24-hour period. Note any failures. | All jobs completed successfully. |
| 3 | Verify replication jobs (if applicable) completed to offsite/cloud target. | Replication healthy. |
| 4 | Check available storage capacity on backup target. Flag if below [X]% free. | Sufficient capacity available. |
| 5 | Document any failed jobs and open a remediation ticket. Notify ISSO if critical systems failed. | Failures ticketed. |
| 6 | Sign and date MRC. | MRC complete. |

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Deficiencies: [ ] None  [ ] POA&M Required  [ ] Immediate Action Required
