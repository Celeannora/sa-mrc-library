# Information System Security Officer — Operational Baseline
### Air-Gapped SAP Environment | Daily Operations Reference
#### DoD SAP / JSIG Environment

> **Purpose:** Minimum daily operating expectations for the Information System Security Officer (ISSO) in an air-gapped SAP environment. The ISSO is the day-to-day security operations authority within the SAPF, subordinate to the ISSM. This document defines what the ISSO owns, monitors, authorizes, and escalates.
>
> **Authority boundary:** The ISSO enforces policy and monitors compliance. The ISSM makes policy and authorization decisions. When in doubt about whether an action requires ISSM vs. ISSO authority — it requires the ISSM.
>
> **Related documents:**
> | Document | Purpose |
> |----------|---------|
> | `SA-BASELINE.md` | System Administrator daily operations |
> | `PHYSEC-BASELINE.md` | Physical Security daily operations |
> | `BASELINES-INDEX.md` | Role boundary definitions and escalation matrix |
> | `TECHNICAL_TASK_SCOPE.md` | Full task list with JSIG control mappings |

---

## Table of Contents

1. [Role Definition and Boundaries](#1-role-definition-and-boundaries)
2. [Shift Start Procedures](#2-shift-start-procedures)
3. [Core Daily Checklist](#3-core-daily-checklist)
4. [Weekly Responsibilities](#4-weekly-responsibilities)
5. [Monthly Responsibilities](#5-monthly-responsibilities)
6. [Shift End Procedures](#6-shift-end-procedures)
7. [Incident Response Responsibilities](#7-incident-response-responsibilities)
8. [Escalation to ISSM — Decision Thresholds](#8-escalation-to-issm--decision-thresholds)
9. [Appendix A — Step-by-Step: SA Finding Review and Disposition](#appendix-a--step-by-step-sa-finding-review-and-disposition)
10. [Appendix B — Step-by-Step: ConMon Package Assembly](#appendix-b--step-by-step-conmon-package-assembly)
11. [Appendix C — Step-by-Step: User Account Authorization](#appendix-c--step-by-step-user-account-authorization)
12. [Appendix D — Shift End and Reporting](#appendix-d--shift-end-and-reporting)

---

## 1. Role Definition and Boundaries

### What the ISSO owns

The ISSO is the primary day-to-day security operations authority within the SAP IS boundary. The ISSO receives SA findings, makes routine security decisions within ISSM-delegated authority, manages access authorizations, assembles ConMon artifacts, and serves as the first escalation point above the SA.

| ISSO Owns | ISSO Does NOT Own |
|-----------|------------------|
| Day-to-day security monitoring oversight | Accepting risk on findings — that is the ISSM |
| Receiving and triaging SA findings and shift reports | Granting ATO — that is the AO |
| Routine access authorization (within ISSM-delegated authority) | Policy decisions — that is the ISSM |
| ConMon artifact assembly and submission | Approving Change Requests beyond delegated authority — that is the ISSM |
| User account management oversight | Non-tailorable control decisions — always ISSM |
| POA&M tracking and milestone management | Final authorization of maintenance — that is the ISSM |
| MRC authorization review (for ISSM signature) | Physical access decisions — that is Physical Security |
| Reviewing outbound data transfers (classification review) | Signing waivers or exceptions — that is the ISSM |

### The ISSO's chain of authority

```
AO  →  ISSM  →  ISSO  →  SA
```

- **ISSO to SA:** Task direction within authorized scope, finding disposition within delegated authority, shift guidance
- **ISSO to ISSM:** All findings requiring policy decisions, all non-tailorable control issues, all access requests beyond delegated authority, all incident escalations, all ConMon packages

### What the ISSO must NEVER do without ISSM authorization

- Authorize software additions to the ASL
- Approve hardware additions to the environment
- Accept risk on any open finding or vulnerability
- Authorize a maintenance task that is not already covered by an open ISSM-signed MRC
- Approve outbound data transfers — review only; ISSM signature required
- Make any change to the SSP
- Acknowledge or close a non-tailorable control failure without ISSM direction

---

## 2. Shift Start Procedures

### Pre-Entry

- [ ] Sign SAPF access log — date, time in, printed name, signature
- [ ] Check entry point for ISSM advisories or priority notices
- [ ] Check internal ISSO inbox/message system for overnight ISSM communications

### Initial Security Posture Review (first 20 minutes)

- [ ] Review SA shift summary from overnight / prior shift — any open findings?
- [ ] Review SIEM high/critical alert queue — confirm SA has triaged; any unaddressed items?
- [ ] Review EDR console — all agents online, definitions current ⚠️ AC-6(1)
- [ ] Confirm no Tier 1 incidents are open and unresolved from prior shift
- [ ] Check physical access log from overnight — review entries per ISSM policy
- [ ] Confirm all open MRC authorizations are still valid — any expiring today?

---

## 3. Core Daily Checklist

### Security Oversight

| # | Task | Time | ✓ |
|---|------|------|---|
| I-01 | Review SA shift summary — triage all reported findings by severity | | ☐ |
| I-02 | Confirm SIEM high/critical alerts have been actioned by SA — no backlog | | ☐ |
| I-03 | Review EDR non-compliance report — any endpoint missing coverage ⚠️ | | ☐ |
| I-04 | Review account management events — validate all creates/deletes against authorization records | | ☐ |
| I-05 | Confirm audit log service active and storage within threshold | | ☐ |
| I-06 | Review physical access log entries since last shift — any anomalies | | ☐ |

### Access Management

| # | Task | Time | ✓ |
|---|------|------|---|
| I-07 | Process any pending account creation requests — verify need-to-know and authorization | | ☐ |
| I-08 | Process any pending account disables/terminations — same-day action required on terminated users | | ☐ |
| I-09 | Review any accounts flagged by SA as anomalous — determine disposition | | ☐ |

### Authorization Management

| # | Task | Time | ✓ |
|---|------|------|---|
| I-10 | Review any pending SA maintenance requests — verify MRC is open and ISSM-authorized before SA proceeds | | ☐ |
| I-11 | Confirm no SA tasks are being executed without an open, authorized MRC | | ☐ |
| I-12 | Review any media transfer requests — classification review before ISSM authorization | | ☐ |

### Findings Tracking

| # | Task | Time | ✓ |
|---|------|------|---|
| I-13 | Update open findings log with any new SA-reported items | | ☐ |
| I-14 | Review POA&M — any milestones due today or overdue | | ☐ |
| I-15 | Escalate any Tier 1 findings from SA to ISSM immediately — no delay | | ☐ |

---

## 4. Weekly Responsibilities

| # | Task | MRC Reference | ✓ |
|---|------|--------------|---|
| W-01 | Review weekly SA task completion — all weekly MRCs signed and filed | TECHNICAL_TASK_SCOPE.md W-19 | ☐ |
| W-02 | Compile weekly security summary for ISSM — completed tasks, findings, open items | W-20 | ☐ |
| W-03 | Review failed logon and lockout events for the week — identify patterns | MRC-0101-DA | ☐ |
| W-04 | Review any new vulnerability findings from SA — categorize CAT I/II/III | MRC-0202-MO | ☐ |
| W-05 | Conduct weekly account review — dormant, anomalous, or unauthorized accounts | MRC-0501-WK | ☐ |
| W-06 | Verify certificate expiration look-ahead (30-day window) — initiate renewals | MRC-0901-WK | ☐ |
| W-07 | Review firewall and ACL change log — all changes tied to approved CRs | MRC-0702-QR | ☐ |
| W-08 | Review and action any SA-submitted Tier 2 items from the week | SA-BASELINE.md §7 | ☐ |

---

## 5. Monthly Responsibilities

| # | Task | MRC Reference | Notes |
|---|------|--------------|-------|
| M-01 | Review all SA-completed monthly MRCs — verify all are signed, filed, and complete | All monthly MRCs | |
| M-02 | Assemble ConMon package for ISSM submission — all artifacts per naming convention | MRC-1501-MO | Due by ISSM deadline |
| M-03 | Submit ConMon package to ISSM — log submission date and method | MRC-1501-MO | Obtain ISSM receipt |
| M-04 | Update POA&M — all new findings entered, milestones reviewed | CA-5, PM-4 | Overdue milestones = immediate ISSM notification |
| M-05 | Conduct privileged account recertification — verify need-to-know and least privilege | MRC-0502-MO | |
| M-06 | Disable all dormant accounts (>30 days inactive unless mission-justified) | MRC-0502-MO | |
| M-07 | Review and reconcile service account inventory | MRC-0502-MO | |
| M-08 | Coordinate monthly vulnerability scan with SA — review results | MRC-0202-MO | Escalate all CAT I to ISSM same day |
| M-09 | Review software and hardware inventory for ASL/hardware list compliance | MRC-1701-MO | Any SA-22 finding = immediate ISSM notification |
| M-10 | Update DOCUMENT_TRACKER.md — all MRC statuses current | MRC-1901-MO | |
| M-11 | Submit monthly ISSO report to ISSM | CA-7 | Format per ISSM direction |

---

## 6. Shift End Procedures

- [ ] All SA findings received today are documented in the findings log
- [ ] All Tier 1 and Tier 2 items from today have been escalated appropriately — nothing held overnight
- [ ] ISSM notified of any items requiring decision or awareness
- [ ] All access requests processed — no pending creates/disables carried overnight without ISSM awareness
- [ ] POA&M updated with any new items from today
- [ ] Shift summary written and available for incoming ISSO or overnight SA reference
- [ ] All ISSO administrative sessions closed and locked
- [ ] Sign SAPF access log — time out

---

## 7. Incident Response Responsibilities

### ISSO role in an incident

The ISSO is not the incident commander — that is the ISSM. The ISSO's role is to:

1. **Receive** the SA's initial notification
2. **Immediately escalate to ISSM** — the ISSO does not manage incidents independently
3. **Preserve evidence** — instruct SA to document and not alter system state until ISSM directs
4. **Support the ISSM** — provide requested documentation, access records, logs, account data
5. **Document the timeline** — maintain the incident log as directed by ISSM

### What the ISSO must NOT do during an incident without ISSM direction

- Disconnect or isolate systems
- Delete or modify any logs or files
- Communicate the incident outside the authorized chain (no emails, no phone calls to non-authorized parties)
- Begin remediation
- Make public statements

### Incident notification chain

```
SA observes incident trigger
        ↓
SA notifies ISSM directly (Tier 1) OR notifies ISSO (Tier 2)
        ↓
ISSO immediately escalates to ISSM
        ↓
ISSM directs response
        ↓
ISSO and SA execute ISSM-directed actions
        ↓
ISSO maintains incident documentation log
```

---

## 8. Escalation to ISSM — Decision Thresholds

The ISSO escalates to ISSM — not the other way around. Any time the ISSO is unsure whether something requires ISSM visibility, assume it does.

### Always escalate immediately (no delay)

| Trigger | Reason |
|---------|--------|
| Any non-tailorable control failure (SC-28, SA-22, AC-6(1)) | ISSM must be notified — these cannot be managed at the ISSO level |
| Any potential security incident | ISSM is the incident authority |
| Any CAT I vulnerability finding | Immediate ISSM notification required per JSIG RA-5 |
| Any classified data spillage | Spillage procedures require ISSM activation |
| Any unauthorized account discovered | AC-2 violation — ISSM determines disposition |
| Any request to waive or defer a security control | Only ISSM (or higher) can waive |
| Any request to add software or hardware to the environment | ASL/hardware approval is ISSM authority |
| Any media leaving the SAPF | ISSM authorization required — not just ISSO review |
| Any POA&M milestone that is overdue | ISSM must be aware — may affect ATO status |
| ATO expiration within 90 days | ISSM must initiate renewal process |

### Escalate within 4 hours

| Trigger | Reason |
|---------|--------|
| New CAT II vulnerability with no existing POA&M entry | Needs ISSM awareness and milestone assignment |
| Access request for privileged account | Privileged access requires ISSM concurrence |
| SA-reported Tier 2 finding not resolvable within ISSO authority | Beyond ISSO scope |
| Any change request that modifies a security control | CM-3 requires ISSM authorization |
| Physical security anomaly reported by Physical Security | ISSM must determine if security posture is affected |

---

## Appendix A — Step-by-Step: SA Finding Review and Disposition

**Purpose:** Structured process for receiving, reviewing, and actioning findings from the SA shift summary.

| Step | Action | Detail |
|------|--------|--------|
| 1 | Receive SA shift summary | Read completely before taking any action. |
| 2 | Categorize all findings | Tier 1 / Tier 2 / Tier 3 per SA-BASELINE.md §7. |
| 3 | Any Tier 1 finding | Stop. Notify ISSM immediately. Do not disposition independently. |
| 4 | Tier 2 findings within ISSO authority | Document in findings log. Determine disposition. If disposition requires a change — CCB CR first. |
| 5 | Tier 2 findings beyond ISSO authority | Escalate to ISSM with full context. Document escalation in findings log. |
| 6 | Tier 3 findings | Log in POA&M or findings tracker as applicable. Assign tracking milestone. |
| 7 | Communicate disposition back to SA | SA needs to know whether to take any follow-on action, hold, or continue monitoring. |
| 8 | Update POA&M if a new finding requires tracking | All findings requiring remediation must have a POA&M entry within one business day. |

---

## Appendix B — Step-by-Step: ConMon Package Assembly

**Purpose:** Monthly ConMon artifact package for ISSM submission. Due date is set by the ISSM — coordinate timing at least 5 business days in advance.

| Step | Action | Detail |
|------|--------|--------|
| 1 | Confirm ISSM-defined artifact list | Obtain current required artifact list from ISSM — this may change between cycles. |
| 2 | Collect all SA-completed MRCs for the month | Verify all are signed. Any unsigned MRC = return to SA for signature before including. |
| 3 | Collect vulnerability scan results | Nessus/ACAS reports from SA (MRC-2501-MO). Export .pdf and .nessus files. |
| 4 | Collect POA&M — current version | Ensure all new findings are entered and milestones are current. |
| 5 | Collect account management documentation | Account create/disable logs, monthly recertification results. |
| 6 | Collect patch compliance evidence | Patch deployment report from WSUS/SCCM. |
| 7 | Collect SIEM summary | High/critical alert triage summary for the month. |
| 8 | Name all artifacts per ISSM naming convention | Wrong naming = package rejected. Confirm format before saving. |
| 9 | Stage package for ISSM review before submission | ISSM may require review before the package is formally submitted. |
| 10 | Submit via ISSM-directed method | Log: submission date, method, ISSM acknowledgment. |
| 11 | File copy of submitted package | Retain per AU-11 retention policy. |

---

## Appendix C — Step-by-Step: User Account Authorization

**Purpose:** Process for authorizing, creating, modifying, and disabling user accounts within the SAP IS.

> ⚠️ Privileged accounts (Domain Admin, local admin, service accounts) require ISSM concurrence before ISSO authorizes.

| Step | Action | Detail |
|------|--------|--------|
| 1 | Receive account request | Written request from supervisor or system owner — name, role, justification, access level required. |
| 2 | Verify need-to-know | Confirm the individual has a current, valid need-to-know for the access level requested. Verify clearance with PSO if needed. |
| 3 | Verify existing account audit | Confirm the individual does not already have an active account. No duplicate accounts. |
| 4 | Privileged account? | If yes — escalate to ISSM for concurrence before proceeding. |
| 5 | ISSO authorizes the account | Document authorization: date, authorizing ISSO name/signature, access level granted, expiration (if applicable). |
| 6 | Direct SA to create the account | SA creates per MRC-0501-WK using least-privilege principle. |
| 7 | Verify account created correctly | Review AD entry — groups, permissions, password policy, account type. |
| 8 | Notify requester | Account is active. Provide credentials per local SOP. |
| 9 | Log in account register | Date created, who authorized, who requested, access level, expiration date. |
| **Termination** | | |
| 10 | Receive termination notification | From supervisor, HR equivalent, or system owner. Same-day action required. |
| 11 | Direct SA to disable account immediately | Disable — do not delete. Preserve for audit (AU-9). |
| 12 | Verify account disabled | Confirm in AD — disabled flag set, no active sessions. |
| 13 | Log termination | Date disabled, who directed, who actioned. |

---

## Appendix D — Shift End and Reporting

| Step | Action | Detail |
|------|--------|--------|
| 1 | Compile all findings from today | Everything received from SA + anything ISSO identified independently. |
| 2 | Update findings log | All items categorized, documented, and dispositioned or escalated. |
| 3 | Update POA&M for any new items | New findings from today must have entries before shift ends. |
| 4 | Write ISSO shift summary | Open items, escalations made, decisions taken, anything pending for next ISSO on duty. |
| 5 | Notify ISSM of any items requiring overnight awareness | Never leave a Tier 1 or active incident finding unresolved without ISSM awareness. |
| 6 | Close all administrative sessions | No open sessions left logged in. |
| 7 | Sign SAPF access log | Printed name + signature + time out. |

---

*ISSO-BASELINE.md | Version 1.0 | April 2026*
*DoD SAP / JSIG Environment — Information System Security Officer Role*
*Classification: [CLASSIFICATION]*
*ISSO acts within ISSM-delegated authority — escalate all policy decisions to ISSM*
