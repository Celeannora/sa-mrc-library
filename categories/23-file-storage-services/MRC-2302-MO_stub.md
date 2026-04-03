---
mrc_id: MRC-2302-MO
title: Monthly Storage Services Health and LUN Integrity Audit
category: 23 — File and Storage Services
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:45"
rin: MO-SS-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Storage management console or CLI ([SITE-DESIGNATED STORAGE PLATFORM]), OOB management interface, disk/volume management utility, OS event log"
jsig_controls: "SC-28, CM-6, CM-7, CP-9, AU-9, AC-3"
non_tailorable: "N/A — SC-28 applies to volumes hosting classified data (see MRC-2201-WK); verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only audit; no LUN mapping, disk configuration, or storage pool changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Storage Services covers the physical and virtual disk infrastructure that hosts all data on the system — including OS volumes, data volumes, and iSCSI-attached storage. Windows Server Storage Services includes iSCSI Target (provides LUN-based block storage to other servers), Storage Spaces (pools physical disks into virtual drives with resiliency), and standard disk management. In a SAP environment, storage failures are high-impact: a failed disk or degraded storage pool can cause data loss, system unavailability, or — in worst cases — corruption of classified data. This card verifies that all volumes are healthy, disk utilization is within acceptable bounds, iSCSI targets are connected only to authorized initiators, and no degraded or failing drives exist.

## Safety / Hazards
JSIG: Do not create, delete, or remap LUNs or iSCSI targets; do not add or remove disks from storage pools; do not initialize or format volumes — without a CCB-approved Change Request and ISSM written authorization. Unauthorized LUN mapping can expose classified data volumes to unintended hosts (AC-3 violation).

## Tools / Equipment / Access Required
- PowerShell Storage module: `Get-Disk`, `Get-Volume`, `Get-StoragePool`, `Get-VirtualDisk`, `Get-PhysicalDisk`
- Server Manager > File and Storage Services > Volumes / Disks / Storage Pools
- Disk Management — `diskmgmt.msc`
- iSCSI Initiator — `iscsicpl.exe` (on initiator side)
- Windows Admin Center or vendor storage management tool (if applicable)
- Event Viewer — `eventvwr.msc`
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — SC-28, CM-6, CM-7, CP-9, AU-9, AC-3
- DISA STIG — Windows Server Storage benchmark (as applicable)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List
- Site-specific storage architecture documentation and authorized LUN mapping list

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: degraded or failed physical disk, failed virtual disk or storage pool, iSCSI target connected to unauthorized initiator, volume approaching capacity (≥ 85%), or unauthorized volume/LUN found.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Authorized storage/LUN mapping documentation
- Access to storage server(s) and management tools

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Check all physical disk health | `Get-PhysicalDisk \| Select FriendlyName, OperationalStatus, HealthStatus, Usage` | All disks: `OperationalStatus = OK`, `HealthStatus = Healthy` |
| 2 | Check all virtual disks / storage spaces | `Get-VirtualDisk \| Select FriendlyName, OperationalStatus, HealthStatus, ResiliencySettingName` | All virtual disks: `OperationalStatus = OK`, `HealthStatus = Healthy`; no `Degraded` or `Warning` |
| 3 | Check all storage pools | `Get-StoragePool \| Select FriendlyName, OperationalStatus, HealthStatus, Usage` | All pools healthy; `IsPrimordial = False` pools in `OK` state |
| 4 | Check all volumes — health and capacity | `Get-Volume \| Select DriveLetter, FileSystemLabel, HealthStatus, SizeRemaining, Size` | All volumes Healthy; flag any ≥ 85% full — notify ISSM/ISSO |
| 5 | Calculate volume utilization percentage | `Get-Volume \| Select DriveLetter, @{N='UsedPct';E={[math]::Round((($_.Size - $_.SizeRemaining) / $_.Size)*100,1)}}` | All volumes < 85% used; document any ≥ 85% |
| 6 | Verify all expected volumes are present and online | `Get-Disk \| Select Number, PartitionStyle, OperationalStatus, IsOffline` | All disks Online; no unexpected Offline or RAW disks |
| 7 | If iSCSI is used — verify iSCSI target sessions | `iscsicpl.exe` > Targets tab; or `Get-IscsiTarget`, `Get-IscsiSession` on target server | Only authorized initiators (by IQN) connected to each target |
| 8 | Verify iSCSI target ACL — no unauthorized initiators | `Get-IscsiServerTarget \| Select TargetName, InitiatorIds` on iSCSI Target server | InitiatorIds list matches authorized IQN baseline |
| 9 | Verify volumes hosting classified data are BitLocker-encrypted | `Get-BitLockerVolume \| Where-Object {$_.ProtectionStatus -ne "On"}` | Zero unencrypted data volumes |
| 10 | Review Disk, Storage, and iSCSI event logs (last 30 days) | `Event Viewer > Windows Logs > System` — source: `disk`, `storahci`, `iscsiprt`; IDs: 7, 11, 51 (disk errors) | No unresolved disk errors, reallocated sectors, or iSCSI path failures |
| 11 | Verify Storage Spaces resiliency settings match approved baseline | `Get-VirtualDisk \| Select FriendlyName, ResiliencySettingName, NumberOfColumns` | Resiliency type matches approved config (Mirror, Parity, etc.) |
| 12 | Document all findings in findings log below | — | All discrepancies recorded |
| 13 | Sign and date MRC; file as CP-9 / SC-28 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Volume / Disk Health Summary (Complete at time of check)

| Drive / Volume | Label | Total Size | % Used | Health Status | Encrypted (BL) | Notes |
|---------------|-------|-----------|--------|--------------|----------------|-------|
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |

---

## Non-Compliance / Findings Log

| # | Finding Description | Volume / Disk / Target Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|---------------------------------|-----------------|-----------|-----------  |--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Physical Disks: [ ] All Healthy  [ ] Degraded/Failed — ISSM notified
- Virtual Disks / Storage Pools: [ ] All Healthy  [ ] Degraded — ISSM notified
- Volume Capacity (≥ 85%): [ ] None  [ ] Found: ___ volumes — ISSM/ISSO notified
- Unauthorized iSCSI Initiators: [ ] None  [ ] Found — ISSM notified immediately
- BitLocker on Data Volumes: [ ] All encrypted  [ ] Unencrypted — ISSM notified
- Total disks checked: ___  Total volumes checked: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
