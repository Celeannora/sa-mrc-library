---
mrc_id: MRC-0501-MO
title: "Monthly Account Audit: 60/90-Day Inactivity Review, Privileged Group Audit, and Administrative Account Review"
category: "05 — Account & Access Management"
periodicity: Monthly
est_time: "1.5–2.5 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Directory services management console ([SITE-DESIGNATED DIRECTORY PLATFORM]), account audit script or reporting tool, authorized user roster (ISSM-maintained)"
jsig_controls:
  - AC-2
  - AC-6
  - IA-4
  - IA-5
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-0501-MO — Monthly Account Audit: 60/90-Day Inactivity, Privileged Group Audit, Administrative Account Review

---

## 1. Background (New SA)

**Why account audits matter in a SAP environment:**
Every active account is a potential attack vector. Dormant accounts — accounts belonging to personnel who have left, been re-assigned, or simply stopped logging in — are a primary target for unauthorized access because nobody is watching them. JSIG AC-2 requires accounts to be reviewed and disabled when no longer needed.

**Three components of this MRC:**

1. **60/90-Day Inactivity Audit (Script-Assisted):**
An account audit script (or manual directory query) enumerates all accounts whose last logon date exceeds the 60-day (standard user) or 90-day (service account) threshold. The SA reviews the output, cross-references against the authorized user list, and disables accounts not justified by ISSM/ISSO.

2. **Privileged Group and Account Review:**
All members of site-designated privileged groups (e.g., Domain Admins, Enterprise Admins, local Administrators, and equivalent) are enumerated and compared to the ISSM-authorized privileged access list. Any account in a privileged group not on the authorized list is an AC-6 violation.

3. **Administrative Account Status Review (Document Review):**
All administrative accounts are cross-referenced with their authorization documentation. Every admin account must have: an authorization record on file, a current need-to-know, and no anomalous activity in the prior 30 days.

---

## 2. Safety / Hazards

> ⚠️ **DO NOT DISABLE WITHOUT REVIEW:** Do not disable accounts until cross-referencing against the authorized user list. Some accounts that appear inactive may be service accounts or mission-required accounts with ISSM exemption.

> ⚠️ **PRIVILEGED ACCOUNT VIOLATIONS:** Any account in a privileged group that is not on the ISSM-authorized list is an AC-6 violation. Notify ISSM before disabling.

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** ISSM written authorization required (MA-2).

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| Directory services console (admin access) | [SITE-DESIGNATED DIRECTORY PLATFORM] management console and/or CLI |
| Account audit script | Library script — `scripts/invoke-account-audit.[SITE-SCRIPT-EXT]` — if deployed at this site |
| Authorized User List | ISSM-maintained — current version required |
| Privileged Access Authorization List | ISSM-maintained |
| MRC Sign-Off Block | SA and ISSM/ISSO signatures |

---

## 4. Procedure Steps

### Phase 1 — 60/90-Day Inactivity Audit

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 1 | Run account audit script (or perform manual directory query) | Execute `invoke-account-audit.[SITE-SCRIPT-EXT]` with 60-day threshold — or query directory platform for accounts with last logon > 60 days | Output: all accounts with last logon > 60 days, CSV or report |
| 2 | Review output — identify standard user accounts (60-day threshold) | Filter output for standard user accounts | List of inactive standard users |
| 3 | Cross-reference against authorized user list | Compare each account name against ISSM authorized user list | Accounts not on authorized list = disable immediately. On list but inactive = verify with ISSO. |
| 4 | Query service accounts (90-day threshold) | Execute audit script or directory query with 90-day threshold filtered to service account type | List of inactive service accounts |
| 5 | For each inactive service account: verify with ISSM whether account is still mission-required | Coordinate with ISSO | Mission-required but inactive = ISSM documents exemption. No longer needed = disable. |
| 6 | Disable all accounts confirmed for disable | Use directory management console or [SITE-DESIGNATED MANAGEMENT TOOL] to disable each confirmed account | Account disabled — do NOT delete; retain for AU-9 audit trail |
| 7 | Document all disabled accounts (Section 8) | | All disables logged with justification |

### Phase 2 — Privileged Group Audit

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 8 | Enumerate all members of the site-designated primary privileged group (e.g., Domain Admins equivalent) | Directory console or CLI → enumerate all members of the primary admin group recursively | Full member list |
| 9 | Enumerate all members of additional privileged groups (e.g., Enterprise Admins equivalent, if applicable) | Directory console or CLI → enumerate all members recursively for each applicable privileged group | Full member list per group |
| 10 | Enumerate all members of local Administrators on all managed hosts | Use remote management tool or local access → query local administrator group on each host | Local admin list per host |
| 11 | Enumerate all members of other site-designated privileged groups | Per ISSM-maintained privileged group inventory (Backup Operators, Schema Admins, and site-specific equivalents) | Full list per group |
| 12 | Compare each privileged group membership to ISSM-authorized privileged access list | Side-by-side comparison | Any account in privileged group NOT on authorized list = AC-6 violation — notify ISSM before action |
| 13 | For each unauthorized privileged account: document and notify ISSM | Section 9 — Findings Log | ISSM directs removal from group |
| 14 | Verify all privileged accounts have MFA / CAC enforced | Directory management console → account properties → verify smart card or MFA required flag is set | All privileged accounts: MFA/smart card enforcement confirmed |

### Phase 3 — Administrative Account Document Review

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 15 | Pull administrative account list | Directory console or CLI → enumerate all admin accounts (e.g., AdminCount flag or ISSM-maintained admin account list) | All admin accounts listed with name, status, and last logon |
| 16 | For each admin account: verify authorization document on file | ISSM document repository | Authorization record present, current, and signed |
| 17 | For each admin account: verify no anomalous activity in last 30 days | SIEM query for admin account logon events (successful, failed, and explicit-credential use) over the last 30 days — [SITE-DESIGNATED SIEM PLATFORM] query | Activity consistent with authorized role; no off-hours or unexpected source logons |
| 18 | Document review results for each admin account (Section 8) | | All accounts reviewed and status recorded |
| 19 | Submit completed audit results to ISSO | ISSO reviews and signs | ISSO acknowledgment obtained |
| 20 | Sign-Off block | Section 10 | Signatures obtained |

---

## 8. Account Audit Status Tables

### Inactive Account Audit

| # | Account Name | Account Type | Last Logon | Days Inactive | On Auth List? | Action Taken | ISSM/ISSO Direction | Notes |
|---|-------------|-------------|-----------|--------------|--------------|-------------|-------------------|-------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |

### Privileged Group Membership

| # | Account Name | Group | On Auth List? | MFA Enforced? | Finding? | Notes |
|---|-------------|-------|--------------|--------------|---------|-------|
| 1 | | | | | | |
| 2 | | | | | | |

### Administrative Account Review

| # | Account | Auth Doc on File? | Last Activity | Anomalous Activity? | Status | Notes |
|---|---------|------------------|--------------|--------------------|----|-------|
| 1 | | | | | | |
| 2 | | | | | | |

---

## 9. Non-Compliance / Findings Log

| # | Account | Finding | Control | ISSM Notified | Time | Directed Action | Resolved |
|---|---------|---------|---------|---------------|------|----------------|---------|
| 1 | | | | | | | |

---

## 10. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-0501-MO | Rev 1.0 | Category 05 — Account & Access Management*
*Classification: [CLASSIFICATION]*
