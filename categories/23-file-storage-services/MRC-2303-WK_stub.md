---
mrc_id: MRC-2303-WK
title: Weekly DFS Namespace and Replication Health Verification
category: 23 — File and Storage Services
periodicity: WEEKLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:30"
rin: WK-DFS-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Distributed file system management console or CLI ([SITE-DESIGNATED DFS PLATFORM]), DFS replication diagnostic tool, OS event log, replication state monitor"
jsig_controls: "CM-6, CM-7, CP-9, AU-9, SC-28, SI-7"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no namespace, folder target, or replication group changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Distributed File System (DFS) has two components. **DFS Namespaces** provide a single logical path (e.g., `\\domain\shares\data`) that transparently redirects users to the correct file server, even across multiple servers or sites. **DFS Replication (DFSR)** keeps copies of files synchronized between two or more servers — so if one server fails, another has an up-to-date copy. In a SAP environment, DFSR is often used to replicate SYSVOL (Active Directory Group Policy files) between Domain Controllers, as well as classified data shares across redundant file servers. When DFSR falls behind or enters an error state, replicas diverge — meaning users on different servers see different versions of files. This card verifies that DFS Namespaces are resolving to the correct targets and that all DFSR replication groups are healthy with no backlog.

## Safety / Hazards
JSIG: Do not add, remove, or modify DFS Namespace folder targets or DFS Replication group memberships without a CCB-approved Change Request and ISSM written authorization. DFS namespace or target changes redirect users to potentially different — or uncontrolled — storage locations. Any prolonged DFSR replication failure affecting SYSVOL must be treated as an AD DS issue and reported to ISSM.

## Tools / Equipment / Access Required
- DFS Management MMC — `dfsmgmt.msc`
- PowerShell DFSN module: `Get-DfsnRoot`, `Get-DfsnFolder`, `Get-DfsnFolderTarget`
- PowerShell DFSR module: `Get-DfsReplicationGroup`, `Get-DfsrState`, `Get-DfsrBacklog`
- `dfsrdiag.exe ReplicationState` — replication diagnostic command
- Event Viewer — `eventvwr.msc`
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — CM-6, CM-7, CP-9, AU-9, SI-7
- DISA STIG — Windows Server DFS benchmark (as applicable)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: DFS Namespace referral pointing to unauthorized or offline target, DFSR replication failure lasting > 4 hours, SYSVOL replication errors (AD health impact), or unauthorized replication group/membership discovered.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to all DFS servers (namespace servers and DFSR members)
- Authorized namespace and replication group baseline

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | List all DFS Namespace roots | `Get-DfsnRoot` or `dfsmgmt.msc` > Namespaces | Namespace roots match authorized baseline; no unexpected namespaces |
| 2 | Verify all namespace folder targets are online and accessible | `Get-DfsnFolderTarget \| Select Path, TargetPath, State` | All targets `State = Online`; offline targets investigated |
| 3 | Verify namespace folder targets point to authorized servers only | Compare `TargetPath` values against authorized server list | No targets pointing to unauthorized servers or paths |
| 4 | List all DFSR replication groups | `Get-DfsReplicationGroup` | Replication groups match authorized baseline; no unauthorized groups |
| 5 | Check DFSR replication state on all members | `dfsrdiag ReplicationState /RgName:[GROUP-NAME]` or `Get-DfsrState` | All members: `In Sync` or `Initialized`; no `Error` or `Auto Recovery` states |
| 6 | Check for replication backlog | `Get-DfsrBacklog -SourceComputerName [SOURCE] -DestinationComputerName [DEST] -GroupName [GROUP] -FolderName [FOLDER]` | Backlog = 0 or within acceptable threshold; large backlogs documented |
| 7 | Verify SYSVOL DFSR replication is healthy (critical for AD) | `dfsrdiag ReplicationState /RgName:"Domain System Volume"` | SYSVOL: `In Sync` on all DCs; any error escalated to ISSM as AD health issue |
| 8 | Check DFSR event logs for errors (last 7 days) | `Event Viewer > Applications and Services Logs > DFS Replication` — IDs: 2104, 2106, 5002, 5014, 5004 | No replication errors, conflict storms, or database corruption events |
| 9 | Check DFS Namespace event logs | `Event Viewer > Applications and Services Logs > DFS Namespace` | No referral failures or namespace server errors |
| 10 | Verify DFSR staging area is not full | `Get-DfsrMembership \| Select ComputerName, StagingPathQuotaInMB, ConflictAndDeletedQuotaInMB` | Staging quota not exceeded; document if > 80% full |
| 11 | Document all findings in findings log below | — | All discrepancies recorded |
| 12 | Sign and date MRC; file as CP-9 / CM-6 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## DFS Replication Group Status (Complete at time of check)

| Replication Group | Member Count | State | Backlog Count | Last Sync Time | Notes |
|------------------|-------------|-------|--------------|---------------|-------|
| Domain System Volume (SYSVOL) | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

---

## Non-Compliance / Findings Log

| # | Finding Description | Namespace / Group / Server Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|------------------------------------|-----------------|-------------|-------------|--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Namespace Folder Targets: [ ] All Online  [ ] Offline targets — documented
- Unauthorized Namespaces or Targets: [ ] None  [ ] Found — ISSM notified
- DFSR Replication: [ ] All In Sync  [ ] Errors — ISSM notified if > 4 hours
- SYSVOL Replication: [ ] Healthy  [ ] Error — ISSM notified immediately
- Replication Backlog: [ ] Within threshold  [ ] Exceeded — documented
- Staging Area: [ ] Within quota  [ ] Full — documented
- Replication groups checked: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
