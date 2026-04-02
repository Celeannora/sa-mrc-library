---
mrc_id: MRC-2301-WK
title: Weekly File Server Share and ACL Integrity Review
category: 23 — File and Storage Services
periodicity: WEEKLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:40"
rin: WK-FS-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Server Manager, Share and Storage Management (storagemgmt.msc), PowerShell (SmbShare / NTFSSecurity modules), Computer Management (compmgmt.msc), File Explorer (for ACL review)"
jsig_controls: "AC-3, AC-6, CM-6, CM-7, AU-9, SC-28"
non_tailorable: "N/A — SC-28 applies to the underlying volume (see MRC-2201-WK); verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no share creation, deletion, or ACL changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
A File Server hosts SMB (Windows file sharing) shares — the network folders that users and systems access to store and retrieve files. In a SAP environment, file shares hold classified working documents, system logs, scripts, and backup data. Access to these shares is controlled by two layers of permissions: Share Permissions (who can connect to the share at all) and NTFS ACLs (what they can read, write, or execute inside it). Both must be configured correctly. A single misconfigured share — especially one with "Everyone" having Full Control — can expose classified data to anyone on the network. This card verifies that all shares are authorized, permissions follow least privilege, and no unexpected shares have appeared.

## Safety / Hazards
JSIG: Do not create, modify, or delete file shares, share permissions, or NTFS ACLs without a CCB-approved Change Request and ISSM written authorization. Discovery of "Everyone" or "Authenticated Users" with write/modify access on a classified share is an immediate AC-3 / AC-6 violation — stop and notify ISSM. Do not delete shares that may be in active use without ISSM authorization.

## Tools / Equipment / Access Required
- PowerShell: `Get-SmbShare`, `Get-SmbShareAccess`, `Get-Acl`
- Computer Management — `compmgmt.msc` > `Shared Folders > Shares`
- Server Manager > File and Storage Services > Shares
- Optional: `NTFSSecurity` PowerShell module for deeper NTFS ACL reporting
- ISSM/ISSO contact for escalation
- Authorized share baseline (from ISSM authorization records)

## Reference Documents
- JSIG — AC-3, AC-6, CM-6, CM-7, AU-9
- DISA STIG — Windows Server File Server benchmark
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List
- Site-specific authorized share list (ISSM-signed)

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: unauthorized share discovered, "Everyone" or overly permissive ACLs found on classified share, share pointing to unencrypted volume, or hidden administrative share (other than default C$, ADMIN$) found unexpectedly.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Authorized share baseline list for the environment
- Access to file server(s) — local or remote with appropriate rights

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Enumerate all SMB shares on the file server | `Get-SmbShare` | Share list matches authorized baseline; no unauthorized shares |
| 2 | Identify any unauthorized or unexpected shares | Compare `Get-SmbShare` output to approved share list; flag any not on the list | Zero unauthorized shares; any found reported to ISSM |
| 3 | Check for hidden shares (ending in `$`) beyond standard admin shares | `Get-SmbShare \| Where-Object {$_.Name -like "*$"}` — review against baseline | Only authorized hidden shares present |
| 4 | Review share-level permissions for each classified share | `Get-SmbShareAccess -Name [SHARE-NAME]` for each share | No `Everyone`; no `Authenticated Users` with Change/Full; access limited to authorized groups |
| 5 | **JSIG CHECK** — Flag any share with "Everyone" or broad group access | Filter: `Get-SmbShareAccess \| Where-Object {$_.AccountName -like "*Everyone*" -or $_.AccountName -like "*Authenticated Users*"}` | **Zero results. Any match = stop, notify ISSM immediately** |
| 6 | Review NTFS ACLs on each share root folder | `(Get-Acl "[SHARE-PATH]").Access \| Select IdentityReference, FileSystemRights, AccessControlType` | ACLs match approved baseline; no unexpected identities with write/modify |
| 7 | Verify share paths point to BitLocker-encrypted volumes | `Get-BitLockerVolume` — confirm drive letter hosting each share is `ProtectionStatus = On` | All share volumes encrypted (SC-28) |
| 8 | Check for open files / sessions on sensitive shares | `Get-SmbSession`; `Get-SmbOpenFile` | Active sessions from authorized users only; unusual off-hours access documented |
| 9 | Verify file server auditing (object access) is enabled via GPO | `gpresult /r` — confirm audit policy GPO applied; `auditpol /get /category:"Object Access"` | Object Access auditing enabled: Success and Failure |
| 10 | Review share-related security events in Event Log (last 7 days) | `Event Viewer > Security` — filter IDs: 5140 (share access), 5145 (share object access), 5142 (share added) | No unauthorized share access or new share creation events |
| 11 | Document all findings in findings log below | — | All discrepancies recorded |
| 12 | Sign and date MRC; file as AC-3 / AC-6 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Share Inventory (Complete at time of check)

| Share Name | Share Path | Share ACL Summary | NTFS ACL Compliant | Volume Encrypted | Authorized? | Notes |
|------------|-----------|------------------|--------------------|-----------------|------------|-------|
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |

---

## Non-Compliance / Findings Log

| # | Finding Description | Share / Path Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|-----------------------|-----------------|-----------|-----------  |--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Unauthorized Shares: [ ] None  [ ] Found — ISSM notified
- "Everyone" / Overly Permissive ACL: [ ] None  [ ] Found — ISSM notified immediately
- NTFS ACLs Compliant: [ ] All  [ ] Deviations — documented
- Share Volumes Encrypted (SC-28): [ ] All  [ ] Not encrypted — ISSM notified
- Object Access Auditing: [ ] Enabled  [ ] Disabled — remediated
- Total shares reviewed: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
