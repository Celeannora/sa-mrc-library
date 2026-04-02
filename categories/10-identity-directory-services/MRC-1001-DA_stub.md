---
mrc_id: MRC-1001-DA
title: Daily Domain Controller Replication and Health Check
category: Identity & Directory Services
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:20"
rin: DA-AD-001
revision: Rev 1.0
---

## Procedure Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Run `repadmin /replsummary` on each DC. Review for replication errors. | Zero replication failures. |
| 2 | Review Windows Event Logs on each DC — filter for IDs 1000, 1001, 1084, 1925, 2087 (replication). | No critical AD events. |
| 3 | Verify NETLOGON service is running on all DCs. | NETLOGON running. |
| 4 | Verify DNS service is running and resolving correctly (`nslookup` test). | DNS resolving expected records. |
| 5 | Check SYSVOL and NETLOGON share replication (DFS-R health). | SYSVOL synchronized. |
| 6 | Document any failures and escalate to ISSO if replication errors persist. | Issues escalated if applicable. |
| 7 | Sign and date MRC. | MRC complete. |

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
