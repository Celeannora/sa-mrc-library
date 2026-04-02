# Operational Baselines — Master Index
### Air-Gapped SAP Environment
#### DoD SAP / JSIG Environment

> **Purpose:** This index defines the three operational roles covered by the baseline documents, establishes clear role boundaries, and provides the escalation matrix for cross-role interactions. Read this document first — then refer to the role-specific baseline.

---

## Role Baseline Documents

| Role | Document | Scope |
|------|----------|-------|
| System Administrator | [`SA-BASELINE.md`](SA-BASELINE.md) | Technical system operations, maintenance execution, MRC documentation |
| Information System Security Officer | [`ISSO-BASELINE.md`](ISSO-BASELINE.md) | Security monitoring oversight, access management, ConMon, finding disposition |
| Physical Security | [`PHYSEC-BASELINE.md`](PHYSEC-BASELINE.md) | Access control, facility inspection, visitor management, alarm response |

---

## Role Boundary Matrix

> Use this table to determine who owns a task when responsibility could be ambiguous. If a task is not listed here, consult the ISSM.

| Task | SA | ISSO | PHYSEC | ISSM |
|------|----|------|--------|------|
| System configuration changes | ✅ Executes | Reviews/authorizes within scope | — | Authorizes via MRC |
| Patch application | ✅ Executes | — | — | Authorizes via CCB/MRC |
| AV/EDR health monitoring | ✅ Executes daily | ✅ Oversight | — | Notified on failures ⚠️ |
| SIEM alert triage | ✅ Initial triage | ✅ Oversight and review | — | Notified on incidents |
| User account creation | SA creates (technical) | ✅ Authorizes | — | Concurrence on privileged accounts |
| User account termination | SA disables (technical) | ✅ Directs same-day | — | Awareness |
| Removable media — technical handling | ✅ Sanitizes, transfers | ✅ Reviews outbound content | PHYSEC holds custody | Authorizes all transfers |
| Media vault custody | — | — | ✅ Controls vault | Sets vault policy |
| SAPF access log | — | Reviews | ✅ Maintains | Sets access authorization |
| Physical facility inspection | — | — | ✅ Executes | Directs scope |
| Tamper seal inspection (visual) | — | — | ✅ Inspects | Directs program |
| Tamper seal replacement | ✅ Applies (technical) | — | ✅ Witnesses | Directs after finding |
| Visitor authorization | — | — | ✅ Controls entry | ✅ Authorizes in writing |
| Visitor escort | Non-PHYSEC members may escort if authorized | May escort if authorized | ✅ Primary | Sets escort policy |
| Alarm response | — | Notified | ✅ Responds | Directs response |
| ConMon package assembly | Provides MRCs/data | ✅ Assembles and submits | — | Receives and reviews |
| POA&M management | — | ✅ Tracks and updates | — | Approves milestones |
| MRC authorization | Executes MRCs | Reviews completion | — | ✅ Authorizes |
| Incident response | ✅ Technical actions as directed | ✅ Documents, supports ISSM | ✅ Physical security as directed | ✅ Commands response |
| Risk acceptance | — | — | — | ✅ Only the ISSM |
| ASL additions | — | — | — | ✅ Only the ISSM |
| ATO management | — | Supports | — | ✅ Coordinates with AO |

---

## Escalation Matrix

### Normal Operations Flow

```
Physical Security ──────→ ISSO ──────→ ISSM
         │                              ↑
         └──────────────────────────────┘
              (incidents — direct to ISSM)

SA ────────────────────→ ISSO ──────→ ISSM
   │                                   ↑
   └───────────────────────────────────┘
        (non-tailorable failures — direct to ISSM)
```

### When to skip ISSO and go directly to ISSM

Any role — SA, ISSO, or Physical Security — bypasses the ISSO and goes directly to the ISSM for:

| Condition | Why |
|-----------|-----|
| Non-tailorable control failure (SC-28, SA-22, AC-6(1)) | Only ISSM has authority to direct response |
| Potential security incident | ISSM is the incident commander |
| Classified data spillage | Spillage procedures require ISSM activation |
| Physical security breach (forced entry, unknown individual) | ISSM directs response and determines security impact |
| Tamper seal found compromised | May indicate hardware compromise — ISSM assesses |
| Unknown device connected to IT system | Potential boundary violation — ISSM decides |

### Response Time Standards

| Tier | Scenario | Required Action | Time Standard |
|------|----------|----------------|--------------|
| Tier 1 | Non-tailorable failure, incident, spillage, physical breach | Stop work. Notify ISSM. | Immediately — same shift, no delay |
| Tier 2 | Significant finding within ISSO authority | Notify ISSO | Within 4 hours |
| Tier 3 | Minor finding, informational | Document. Include in shift summary | By end of shift |

---

## Daily Interaction Points

These are the regular cross-role touchpoints that keep the environment running. Each role should confirm these happen every shift.

| Touchpoint | SA Action | ISSO Action | PHYSEC Action | Timing |
|-----------|-----------|-------------|---------------|--------|
| Shift start | Share overnight system status, open findings | Review SA shift summary | Share access log anomalies | First 30 min of shift |
| Finding escalation | Report findings to ISSO per tier | Receive, triage, escalate to ISSM as needed | Report physical anomalies to ISSO | Real-time |
| Media transfer | Execute technical transfer | Perform classification review | Maintain custody log | Per transfer |
| Visitor arrival | Available for system-related questions if needed | May authorize standard visitors within delegated scope | Control entry, verify ID, assign escort | Per visitor event |
| Shift end | Submit signed MRCs and shift summary | Update findings log, notify ISSM of open items | Complete inspection logs, secure facility | Last 30 min of shift |
| Monthly ConMon | Provide completed MRCs, scan data, patch reports | Assemble package, submit to ISSM | Provide physical access log summary if required | Per ConMon cycle |

---

## Quick Reference: Who Do I Call?

| Situation | Call |
|-----------|------|
| System is down / service failure | SA first → ISSO if unresolved |
| Suspected intrusion or active attack | ISSM directly |
| Unknown person in SAPF | PHYSEC → ISSM immediately |
| BitLocker turned off on a server | SA stops work → ISSM immediately |
| EOL software discovered | SA documents → ISSM immediately |
| EDR agent has been offline 4+ hours | SA → ISSM immediately |
| User account needs to be created | Request to ISSO |
| Privileged account request | ISSO requests ISSM concurrence |
| User is terminated | Supervisor notifies ISSO → ISSO directs SA same-day |
| Tamper seal is broken | PHYSEC documents → ISSM immediately, SA does not touch equipment |
| Patch needs to be applied | SA submits CCB CR → ISSM authorizes → SA executes |
| New software needs to be installed | Request to ISSM via ISSO — must get on ASL first |
| Visitor needs access | Requester to ISSM for authorization → PHYSEC controls entry |
| ConMon package due | SA provides artifacts to ISSO → ISSO assembles and submits to ISSM |
| ATO expiring | ISSO notifies ISSM → ISSM coordinates renewal |
| Certificate expiring | SA notifies ISSO → ISSO initiates renewal per MRC-0901-WK |

---

## Document Version Control

| Document | Version | Status | Last Updated |
|----------|---------|--------|-------------|
| `BASELINES-INDEX.md` | 1.0 | DRAFT | 2026-04-02 |
| `SA-BASELINE.md` | 2.0 | DRAFT | 2026-04-02 |
| `ISSO-BASELINE.md` | 1.0 | DRAFT | 2026-04-02 |
| `PHYSEC-BASELINE.md` | 1.0 | DRAFT | 2026-04-02 |

> All baseline documents are DRAFT until reviewed and signed by the ISSM.

---

*BASELINES-INDEX.md | Version 1.0 | April 2026*
*DoD SAP / JSIG Environment*
*Classification: [CLASSIFICATION]*
