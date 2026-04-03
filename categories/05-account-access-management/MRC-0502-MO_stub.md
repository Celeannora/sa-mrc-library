---
mrc_id: MRC-0502-MO
title: Monthly Privileged Account Recertification
category: 05 — Account & Access Management
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "01:00"
rin: MO-ACC-001
revision: Rev 1.1
classification: "[CLASSIFICATION]"
tool: "Active Directory Users and Computers (ADUC / dsa.msc), PowerShell (AD Module), PAM tool (if deployed), authorized user roster (ISSM-maintained)"
jsig_controls: "AC-2, AC-2(1), AC-2(3), AC-3, AC-5, AC-6, IA-4, IA-5, AU-9"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; account changes require separate CCB-approved CR"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Privileged accounts (Domain Admins, local admins, service accounts, backup operators, etc.) have elevated access that can bypass normal security controls. The JSIG requires that privileged accounts be recertified monthly — meaning each account is verified against the current authorized user roster to confirm the holder still works there, still needs that level of access, and hasn't accumulated excess permissions. In a SAP environment, an active privileged account belonging to a departed or transferred employee is an immediate AC-2 violation. Dormant privileged accounts (no logins in 30+ days) that cannot be explained must be disabled immediately. This card performs that monthly recertification cycle.

## Safety / Hazards
JSIG: Do not disable or delete service accounts without confirming which services depend on them — disabling a service account without testing can cause critical system outages. Any account changes must be documented in a change log submitted to ISSM. Disable before delete — always disable first, wait for impact confirmation, then delete per site retention policy.

## Tools / Equipment / Access Required
- Active Directory Users and Computers (ADUC) — `dsa.msc`
- PowerShell with Active Directory module (`Import-Module ActiveDirectory`)
- PAM / privileged access management tool (if deployed — product varies by site)
- Current authorized user roster (ISSM-maintained)
- Service account dependency list (ISSM-maintained or SA-documented)
- ISSM/ISSO contact for escalation and change log submission

## Reference Documents
- JSIG — AC-2, AC-2(1), AC-2(3), AC-3, AC-5, AC-6, IA-4, IA-5
- DoDM 5205.07 Vol. 1 — User authorization requirements
- Site SSP — Account Management section
- MA-3 Approved Tool List

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM review required for: any account found active for a departed/transferred user, any unresolved dormant privileged account, and all account changes made under this card.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Current authorized user roster available from ISSM
- Domain Admin or delegated account management permissions
- Service account dependency list available

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Export current privileged account list from Active Directory | `PowerShell: Get-ADGroupMember "Domain Admins" -Recursive \| Select Name, SamAccountName, Enabled` (repeat for each privileged group) | Full privileged account list exported |
| 2 | Export last logon dates for all privileged accounts | `PowerShell: Get-ADUser -Filter * -Properties LastLogonDate, Enabled \| Where {$_.MemberOf -match "Admin"} \| Select Name, SamAccountName, LastLogonDate, Enabled` | Last logon data available for review |
| 3 | Cross-reference each account against current authorized user roster | Compare export against ISSM-provided roster | All accounts have a valid authorization on file; any without authorization flagged |
| 4 | Identify accounts with no activity in > 30 days | Filter export: `LastLogonDate -lt (Get-Date).AddDays(-30)` | Dormant accounts listed; each investigated |
| 5 | Investigate dormant accounts — confirm service vs. user account | Check if account is a service account (dependency list); check with ISSM if user account | Service accounts documented; unexplained user dormancy → disable |
| 6 | Identify accounts for departed or transferred personnel | Cross-reference with HR separation list provided by ISSM | Any active account for departed/transferred user → disable immediately |
| 7 | Disable unauthorized or unresolvable accounts | ADUC > right-click account > `Disable Account` (or `Disable-ADAccount -Identity [name]`) | Account disabled; ticket opened; ISSM notified |
| 8 | Validate group memberships for each active privileged account | ADUC > account Properties > `Member Of` tab; compare to authorized role | Memberships consistent with role; excess memberships removed per least privilege (AC-6) |
| 9 | Review service account passwords — verify rotation is within site policy window | ADUC > account Properties > `Account` tab > check `Password last set` date | Passwords within rotation window; overdue rotations scheduled via CCB CR |
| 10 | Document all changes in change log | — | Change log complete (account name, action, date, reason) |
| 11 | Submit change log to ISSM for awareness and retention | Email / secure channel to ISSM | Change log received by ISSM |
| 12 | Sign and date MRC; file as AC-2 BoE artifact | SA signature; ISSM/ISSO co-sign | MRC retained per AU-11 |

---

## Account Review Summary (Complete at time of check)

| Account Name | SAM Account | Privileged Group(s) | Last Logon | Status | Action Taken |
|-------------|-------------|--------------------|-----------:|--------|-------------|
| | | | | Active ✓ / Dormant ⚠️ / Disabled ✗ | |
| | | | | Active ✓ / Dormant ⚠️ / Disabled ✗ | |
| | | | | Active ✓ / Dormant ⚠️ / Disabled ✗ | |
| | | | | Active ✓ / Dormant ⚠️ / Disabled ✗ | |
| | | | | Active ✓ / Dormant ⚠️ / Disabled ✗ | |

---

## Non-Compliance / Findings Log

| # | Account Name | Finding | Control | Action Taken | Escalated To | Date Resolved |
|---|-------------|---------|---------|-------------|-------------|--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Total Privileged Accounts Reviewed: ___
- Accounts with Current Authorization: ___
- Dormant Accounts (> 30 days): ___ — ___ disabled / ___ documented service accounts
- Accounts Disabled (departed/transferred): ___
- Group Membership Exceptions Found: ___ — ___ remediated
- Change Log Submitted to ISSM: [ ] Y   Date/Time: _______________
- ISSM Notified of Anomalies: [ ] Y  [ ] N/A   Time: _______________
- Artifact file (this MRC): _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (Review) | | | |
