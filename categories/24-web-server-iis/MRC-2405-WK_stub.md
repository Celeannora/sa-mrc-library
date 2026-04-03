---
mrc_id: MRC-2405-WK
title: "Weekly File Server Share and ACL Integrity Review"
category: "23 — File and Storage Services"
periodicity: Weekly
est_time: "45–60 minutes"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "PowerShell (Get-SmbShare, Get-Acl), File Server Resource Manager (FSRM), Windows Explorer (ACL review)"
jsig_controls:
  - AC-3
  - AC-6
  - CM-6
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-2405-WK — Weekly File Server Share and ACL Integrity Review

---

## 1. Background (New SA)

**What this MRC covers:**
File server shares and their Access Control Lists (ACLs) are a primary access control boundary within the SAP network. A misconfigured ACL — particularly one granting `Everyone` or `Authenticated Users` write access to a classified file share — is an AC-3 violation.

This weekly check:
1. Enumerates all active file shares and verifies they are authorized (no ad-hoc shares)
2. Reviews ACLs on all shares — flags any `Everyone`, overly broad groups, or unexpected permissions
3. Verifies no share has anonymous access enabled

---

## 2. Safety / Hazards

> ⚠️ **`Everyone` PERMISSION:** Any share with `Everyone` in the ACL is a finding regardless of permission level. `Everyone` in a SAP environment includes unauthenticated contexts on some older configurations. Notify ISSM immediately.

> ⚠️ **DO NOT MODIFY ACLs WITHOUT AUTHORIZATION:** Document findings only — ACL changes require a CCB CR and ISSM authorization.

---

## 3. Procedure Steps

| Step | Action | Command | Expected Result |
|------|--------|---------|-----------------|
| 1 | Enumerate all SMB shares on all file servers | `Get-SmbShare -CimSession [all file servers]` | Full list of all active shares |
| 2 | Compare share list to authorized share inventory | ISSM-maintained share inventory | Any share not on authorized list = ad-hoc/unauthorized share — document and notify ISSM |
| 3 | Check for anonymous access on any share | `Get-SmbShare \| Where-Object {$_.Description -match "Anonymous" -or $_.EncryptData -eq $false}` | No anonymous shares |
| 4 | Review ACLs on all shares | `Get-Acl "\\[server]\[share]" \| Format-List` | No `Everyone`, no `Authenticated Users` with Write/Modify on classified data shares |
| 5 | Any `Everyone` ACE found | Document; notify ISSM immediately | Finding logged |
| 6 | Review NTFS permissions on underlying folders (spot-check) | Explorer → Properties → Security OR `Get-Acl [path]` | Permissions align with least-privilege and authorized access list |
| 7 | Verify `ADMIN$`, `C$`, `IPC$` default shares — confirm access restricted to Domain Admins only | `Get-SmbShare -Name "ADMIN$"` → check ACL | Only authorized admin accounts |
| 8 | Document all shares reviewed in Section 8 | | All entries populated |
| 9 | Sign-Off block | Section 9 | Signatures obtained |

---

## 8. Share ACL Review Table

| # | Server | Share Name | Authorized? | Everyone ACE? | Anonymous? | ACL Finding? | Notes |
|---|--------|-----------|------------|--------------|-----------|-------------|-------|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |

---

## 9. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-2405-WK | Rev 1.0 | Category 23 — File and Storage Services*
*Classification: [CLASSIFICATION]*
