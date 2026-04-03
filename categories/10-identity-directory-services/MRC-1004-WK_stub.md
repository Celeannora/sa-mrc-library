---
mrc_id: MRC-1004-WK
title: Weekly Active Directory Domain Services (AD DS) Health and Integrity Verification
category: 10 — Identity & Directory Services
periodicity: WEEKLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:45"
rin: WK-ADDS-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Directory services management console ([SITE-DESIGNATED DIRECTORY PLATFORM]), directory administrative center, OS event log or directory audit log"
jsig_controls: "IA-2, IA-4, IA-5, CM-6, AU-9, SC-20, AC-2"
non_tailorable: "N/A — No non-tailorable controls in this category (verify against site-specific JSIG annex)"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no configuration changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Active Directory Domain Services (AD DS) is the core identity and authentication backbone of a Windows domain environment. Every user login, computer join, Group Policy application, and Kerberos ticket depends on AD DS being healthy. In a SAP environment, AD DS failures can prevent users from accessing classified systems entirely. This card verifies that AD DS is operating correctly, replication is healthy, accounts are within policy, and no unauthorized changes have been made.

## Safety / Hazards
JSIG: Do not modify AD DS schema, domain objects, Group Policy, or domain controller configuration without a CCB-approved Change Request and ISSM written authorization. Any unauthorized modification to AD DS is a potential IA-4 / CM-6 violation — stop and notify ISSO immediately.

## Tools / Equipment / Access Required
- Domain Admin or delegated SA account (cleared, SAP-authorized per MA-5)
- Active Directory Users and Computers (ADUC) — `dsa.msc`
- Active Directory Administrative Center (ADAC) — `dsac.exe`
- PowerShell with Active Directory module (`Import-Module ActiveDirectory`)
- Event Viewer (`eventvwr.msc`) on each Domain Controller
- `repadmin.exe` — AD replication diagnostic tool
- `dcdiag.exe` — Domain Controller diagnostic tool
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — IA-2, IA-4, IA-5, CM-6, AU-9, SC-20, AC-2
- DISA STIG — Active Directory Domain benchmark (latest release)
- DISA STIG — Active Directory Forest benchmark (latest release)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM/ISSO notification required for replication failures persisting > 4 hours, unauthorized account/group changes, or schema modifications.

## Prerequisites (JSIG MA-2)
- System in normal operational state
- ISSM written authorization on file for this MRC series
- Access to all Domain Controllers in the environment

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Open PowerShell as Administrator on a Domain Controller | Right-click Start > `Windows PowerShell (Admin)` | Elevated PS prompt |
| 2 | Run AD DS health diagnostic | `dcdiag /v /test:replications /test:services /test:fsmocheck /test:dns` | All tests pass — zero failures |
| 3 | Check replication summary across all DCs | `repadmin /replsummary` | Zero replication failures or errors |
| 4 | Check replication status (detailed) | `repadmin /showrepl` | All DCs replicating; no error codes |
| 5 | Verify all FSMO role holders are online | `netdom query fsmo` | All 5 FSMO roles responding on expected DCs |
| 6 | Verify AD DS, DNS, Kerberos, NETLOGON services are running on all DCs | `Get-Service adws,dns,kdc,netlogon -ComputerName [DC-NAME]` | All services Running |
| 7 | Review AD event logs for critical errors (last 7 days) | `Event Viewer > Windows Logs > Directory Service` — filter IDs: 1000, 1084, 1925, 2087, 1311 | No critical events; document any warnings |
| 8 | Check for new admin accounts or group membership changes (unauthorized additions) | ADAC > `Global Search` — sort by `Created` / `Modified` (last 7 days); or `Get-ADGroupMember "Domain Admins"` | No unauthorized accounts or group changes |
| 9 | Verify SYSVOL and NETLOGON shares are accessible and replicating | `Get-DfsrState` or `dfsrdiag ReplicationState` on each DC | SYSVOL synchronized; no backlog |
| 10 | Verify Group Policy is applying correctly | `gpresult /h C:\Temp\gpresult.html /f` on a test workstation | All required GPOs applied; no errors |
| 11 | Check domain account lockout policy is enforced | `Get-ADDefaultDomainPasswordPolicy` | Lockout threshold and duration per site baseline |
| 12 | Review recently locked or disabled accounts | `Search-ADAccount -LockedOut` / `Search-ADAccount -AccountDisabled` | Document any anomalous lockouts; escalate if suspicious pattern |
| 13 | Document any findings in Findings Summary below | — | All discrepancies logged |
| 14 | Sign and date MRC; file as IA-2 / CM-6 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Non-Compliance / Findings Log

| # | Finding Description | DC / System Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|--------------------|-----------------|-------------|-------------|--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Replication: [ ] All DCs healthy  [ ] Failure — ISSO notified within 4 hours
- Unauthorized Account/Group Changes: [ ] None detected  [ ] Detected — ISSM notified
- FSMO Roles: [ ] All online and correct  [ ] Issue — documented
- Services: [ ] All running  [ ] Failure — documented
- Total DCs checked: ___  Non-compliant: ___
- ISSO Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
