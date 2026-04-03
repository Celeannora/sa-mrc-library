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
tool: "File share management console or CLI ([SITE-DESIGNATED FILE SERVER PLATFORM]), ACL review tool, OS management console"
jsig_controls: "AC-3, AC-6, CM-6, CM-7, AU-9, SC-28"
non_tailorable: "N/A — SC-28 applies to the underlying volume (see MRC-2201-WK); verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no share creation, deletion, or ACL changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
A file server hosts network shares — the shared folders that users and systems access to store and retrieve files. In a SAP environment, file shares hold classified working documents, system logs, scripts, and backup data. Access to these shares is controlled by two layers of permissions: Share Permissions (who can connect to the share at all) and File System ACLs (what they can read, write, or execute inside it). Both must be configured correctly. A single misconfigured share — especially one with broad group access having full control — can expose classified data to anyone on the network. This card verifies that all shares are authorized, permissions follow least privilege, and no unexpected shares have appeared. Navigation paths and commands must be tailored to the [SITE-DESIGNATED FILE SERVER PLATFORM] at time of site deployment.

## Safety / Hazards
JSIG: Do not create, modify, or delete file shares, share permissions, or file system ACLs without a CCB-approved Change Request and ISSM written authorization. Discovery of broad groups (e.g., Everyone or Authenticated Users) with write/modify access on a classified share is an immediate AC-3 / AC-6 violation — stop and notify ISSM. Do not delete shares that may be in active use without ISSM authorization.

## Tools / Equipment / Access Required
- File share management console or CLI — [SITE-DESIGNATED FILE SERVER PLATFORM] management tool
- Share enumeration tool: [SITE-SPECIFIC — e.g., Get-SmbShare, net share, or platform equivalent]
- Share permission review tool: [SITE-SPECIFIC — e.g., Get-SmbShareAccess or platform equivalent]
- File system ACL review tool: [SITE-SPECIFIC — e.g., Get-Acl, icacls, platform GUI, or equivalent]
- Optional: platform-specific ACL reporting module for deeper enumeration
- ISSM/ISSO contact for escalation
- Authorized share baseline (from ISSM authorization records)

## Reference Documents
- JSIG — AC-3, AC-6, CM-6, CM-7, AU-9
- DISA STIG — applicable File Server benchmark for the deployed OS/platform
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
| 1 | Enumerate all file shares on the file server | Use share enumeration tool ([SITE-SPECIFIC: Get-SmbShare, net share, or platform equivalent]) | Share list matches authorized baseline; no unauthorized shares |
| 2 | Identify any unauthorized or unexpected shares | Compare enumerated share list to approved share baseline; flag any not on the list | Zero unauthorized shares; any found reported to ISSM |
| 3 | Check for hidden shares (ending in `$`) beyond standard admin shares | Filter share list for hidden shares (names ending in `$`) and compare to authorized baseline | Only authorized hidden shares present |
| 4 | Review share-level permissions for each classified share | Use share permission tool ([SITE-SPECIFIC: Get-SmbShareAccess or platform equivalent]) for each share | No broad groups (Everyone, Authenticated Users) with Change/Full access; access limited to authorized groups |
| 5 | **JSIG CHECK** — Flag any share with "Everyone" or broad group access | Filter share permissions for broad access groups (Everyone, Authenticated Users, or site-equivalent) using platform query tool | **Zero results. Any match = stop, notify ISSM immediately** |
| 6 | Review file system ACLs on each share root folder | Use ACL review tool ([SITE-SPECIFIC: Get-Acl, icacls, platform equivalent]) on each share root path | ACLs match approved baseline; no unexpected identities with write/modify |
| 7 | Verify share paths point to encrypted volumes | Confirm volume encryption status via [SITE-DESIGNATED ENCRYPTION TOOL/METHOD] — check that the volume hosting each share has encryption protection enabled | All share volumes encrypted per SC-28 requirement |
| 8 | Check for open files / sessions on sensitive shares | Use session/open-file query ([SITE-SPECIFIC: Get-SmbSession, Get-SmbOpenFile, or platform equivalent]) | Active sessions from authorized users only; unusual off-hours access documented |
| 9 | Verify file server auditing (object access) is enabled | Verify audit policy via GPO result or OS audit policy query ([SITE-SPECIFIC: gpresult, auditpol, or platform equivalent]) | Object Access auditing enabled: Success and Failure |
| 10 | Review share-related security events in the OS security event log or SIEM (last 7 days) | OS event viewer or [SITE-DESIGNATED SIEM PLATFORM] — filter for share access, share object access, and share creation/deletion events | No unauthorized share access or new share creation events |
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
- File System ACLs Compliant: [ ] All  [ ] Deviations — documented
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
