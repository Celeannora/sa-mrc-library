---
mrc_id: MRC-0501-WK
title: "Weekly Account Activity and Anomalous Logon Review"
category: "05 — Account & Access Management"
periodicity: Weekly
est_time: "30–45 minutes"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "SIEM or event log query tool ([SITE-DESIGNATED SIEM PLATFORM]), directory services management console ([SITE-DESIGNATED DIRECTORY PLATFORM])"
jsig_controls:
  - AC-2
  - AC-6
  - AU-6
  - IA-4
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-0501-WK — Weekly Account Activity and Anomalous Logon Review

---

## 1. Background (New SA)

**Why weekly account activity review matters:**
In a SAP environment, accounts are the keys to the kingdom. Unauthorized use of a valid account — whether by an insider, a compromised credential, or an adversary who has gained access — will appear in logon event records before it appears anywhere else. The JSIG requires continuous monitoring (CA-7) and account management review (AC-2). A weekly review of logon activity catches anomalous patterns — accounts logging in from unexpected workstations, at unusual hours, with excessive failed attempts, or using explicit credentials (pass-the-hash indicators) — while evidence is still fresh and actionable.

**Three components of this MRC:**

1. **Anomalous Logon Detection:** Query the SIEM (or OS security event logs) for the past 7 days. Focus on: failed logon spikes (brute force indicators), off-hours successful logons from admin accounts, successful logons from unexpected source workstations, and explicit-credential logon events (Event ID 4648 equivalent).

2. **Account Creation, Modification, and Deletion Review:** Any account that was created, modified, or deleted during the week must be verified against an authorized change request. Unauthorized account creation is an immediate AC-2 violation.

3. **Service Account and Scheduled Task Activity Review:** Service accounts should have predictable, consistent activity. Any service account that logged on interactively, or whose password was reset without a documented CCB CR, is a finding.

**JSIG note:** AU-6 requires that audit records be reviewed on a defined frequency. This MRC satisfies the weekly review requirement for logon-related audit events.

---

## 2. Safety / Hazards

> ⚠️ **READ-ONLY REVIEW:** This MRC is an observation and documentation activity. Do not disable, modify, or delete accounts without ISSM authorization and a documented basis.

> ⚠️ **UNAUTHORIZED ACCOUNT CREATION:** Any account found to have been created without a documented CCB-approved change request or ISSM authorization is an immediate AC-2 violation. Notify ISSM before taking any action.

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** ISSM written authorization required (MA-2).

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| SIEM console (read access) | [SITE-DESIGNATED SIEM PLATFORM] — query logon events for the past 7 days |
| Directory services console (read access) | [SITE-DESIGNATED DIRECTORY PLATFORM] — review account changes |
| Authorized user roster | ISSM-maintained — current version required for cross-reference |
| Privileged account authorization list | ISSM-maintained |
| MRC Sign-Off Block | SA and ISSM/ISSO signatures |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| JSIG AC-2 — Account Management | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG AC-6 — Least Privilege | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG AU-6 — Audit Review, Analysis, and Reporting | ISSM SharePoint / SAP Cybersecurity Binder |
| Authorized User Roster | SA Document Repository / ISSM Binder |
| MRC-0501-MO | Monthly Account Audit: 60/90-Day Inactivity Review (cross-reference) |
| MRC-0101-DA | Daily SIEM Agent Health and Log Forwarding Verification (cross-reference — confirms log data is available) |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 30–45 minutes |

*SA time is primarily query execution, output review, and documentation. No system changes are made unless directed by ISSM.*

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file for this maintenance cycle
- [ ] SIEM console read access available and confirmed
- [ ] SIEM log coverage verified current (MRC-0101-DA — no forwarding gaps in past 7 days)
- [ ] Authorized user roster current and accessible
- [ ] Privileged account authorization list current and accessible

---

## 7. Procedure Steps

### Phase 1 — Anomalous Logon Detection

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 1 | Query SIEM for failed logon events — last 7 days, all hosts | [SITE-DESIGNATED SIEM PLATFORM] → search logon failure events (OS equivalent of Event ID 4625) — grouped by account and source host | No account with > [ISSM-defined threshold] consecutive failures — any spike documented |
| 2 | Identify any account with a brute-force pattern | Filter for accounts with ≥ [ISSM-defined threshold] failed logons within any 1-hour window | Zero accounts matching pattern — any found = document in Section 9 and notify ISSM |
| 3 | Query SIEM for successful logons outside authorized hours — last 7 days | Search successful logon events (OS equivalent of Event ID 4624) → filter for time-of-day outside [ISSM-defined authorized hours] | All off-hours logons reviewed and justified — any unexplained = document in Section 9 |
| 4 | Query SIEM for explicit credential use — last 7 days | Search for explicit-credential logon events (OS equivalent of Event ID 4648) | All entries correspond to documented administrative activities — any unexplained = finding |
| 5 | Identify logons from unexpected source workstations | Cross-reference each admin account's source workstation against authorized management workstation list | All admin logons from authorized management workstations only — unexpected source = finding |
| 6 | Review any account that was locked out during the week | Search for account lockout events (OS equivalent of Event ID 4740) | All lockouts reviewed — investigate pattern lockouts; document if greater than isolated occurrence |

### Phase 2 — Account Change Review

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 7 | Query directory for accounts created this week | Directory console or SIEM → search account creation events (OS equivalent of Event ID 4720) — last 7 days | All new accounts correspond to documented, ISSM-authorized requests — unauthorized = immediate finding |
| 8 | Query directory for accounts modified this week | Search account modification events (OS equivalent of Event ID 4738) — last 7 days | All modifications correspond to documented CCB CRs or ISSM authorization |
| 9 | Query directory for accounts deleted or disabled this week | Search account deletion/disable events (OS equivalent of Event IDs 4726, 4725) — last 7 days | All deletions/disables correspond to authorized actions — undocumented = finding |
| 10 | Query for privileged group membership changes this week | Search group membership change events (OS equivalent of Event IDs 4728, 4732, 4756) — last 7 days | All changes correspond to authorized modifications — any unexplained = document and notify ISSM |

### Phase 3 — Service Account Review

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 11 | Query for service account interactive logons | Filter logon events for known service account names → search for interactive or network logon types inconsistent with service account role | Zero interactive logons for service accounts — any found = finding; notify ISSM |
| 12 | Review any service account password reset events | Search password reset events (OS equivalent of Event ID 4723/4724) for service accounts | All resets correspond to documented CCB CRs — undocumented reset = finding |
| 13 | Document all reviewed items in Section 8 | | All findings and dispositions recorded |
| 14 | Notify ISSM of any unauthorized account changes, brute force patterns, or anomalous logons | Phone / secure message per site SOP | ISSM notified; response documented |
| 15 | Complete Findings Summary and Sign-Off block (Sections 10–11) | | SA signature; ISSM/ISSO signature if findings present |

---

## 8. Weekly Activity Review Summary

| Category | Events Found | Anomalous | Finding? | Notes |
|----------|-------------|-----------|---------|-------|
| Failed logon spikes (brute force) | | | Y / N | |
| Off-hours admin logons | | | Y / N | |
| Explicit credential use (4648-equiv.) | | | Y / N | |
| Logons from unexpected workstations | | | Y / N | |
| Account lockouts (pattern) | | | Y / N | |
| Accounts created this week | | | Y / N | |
| Accounts modified this week | | | Y / N | |
| Accounts deleted/disabled this week | | | Y / N | |
| Privileged group changes | | | Y / N | |
| Service account interactive logons | | | Y / N | |
| Service account password resets | | | Y / N | |

---

## 9. Non-Compliance / Findings Log

| # | Account / Host | Finding Description | Control Affected | ISSM Notified | Time | Directed Action | Resolved |
|---|---------------|--------------------|-----------------|--------------|----|----------------|---------|
| 1 | | | | Y / N | | | Y / N |
| 2 | | | | Y / N | | | Y / N |
| 3 | | | | Y / N | | | Y / N |

---

## 10. Findings Summary

- [ ] All account activity reviewed — no anomalies detected
- [ ] Anomalous logon pattern detected — documented and reported to ISSM
- [ ] Unauthorized account creation detected — ISSM notified immediately
- [ ] Unauthorized privileged group change detected — ISSM notified
- [ ] Service account misuse detected — documented and reported
- [ ] SIEM log gap detected that prevents complete review — documented and reported
- [ ] No findings — all account activity within expected baseline

---

## 11. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO (required if findings present) | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-0501-WK | Rev 1.0 | Category 05 — Account & Access Management*
*Classification: [CLASSIFICATION]*
