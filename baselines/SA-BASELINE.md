# System Administrator — Operational Baseline
### Air-Gapped SAP Environment | Daily Operations Reference
#### DoD SAP / JSIG Environment

> **Purpose:** Minimum daily operating expectations for the System Administrator role in an air-gapped SAP environment. This document is designed to be handed to any SA — including one brand new to the environment — and provide complete, actionable shift expectations.
>
> **What this document is NOT:**
> - Authorization to act — all tasks require ISSM written authorization (MA-2)
> - A substitute for MRC cards — each checklist item maps to a full MRC procedure
> - An ISSO or Physical Security document — see `ISSO-BASELINE.md` and `PHYSEC-BASELINE.md`
>
> **Related documents:**
> | Document | Purpose |
> |----------|---------|
> | `TECHNICAL_TASK_SCOPE.md` | Full task list mapped to MRC IDs and JSIG controls |
> | `categories/` | Step-by-step MRC procedure cards |
> | `ISSO-BASELINE.md` | ISSO daily operations reference |
> | `PHYSEC-BASELINE.md` | Physical Security daily operations reference |
> | `BASELINES-INDEX.md` | Master index and role boundary definitions |

---

## Table of Contents

1. [Role Definition and Boundaries](#1-role-definition-and-boundaries)
2. [Air-Gap Environment — SA Context](#2-air-gap-environment--sa-context)
3. [Shift Start Procedures](#3-shift-start-procedures)
4. [Core Daily Checklist](#4-core-daily-checklist)
5. [Shift End Procedures](#5-shift-end-procedures)
6. [Air-Gap Specific Tasks](#6-air-gap-specific-tasks)
7. [Incident Triggers](#7-incident-triggers)
8. [Appendix A — Step-by-Step: Shift Start](#appendix-a--step-by-step-shift-start)
9. [Appendix B — Step-by-Step: Data Transfer (Sneakernet)](#appendix-b--step-by-step-data-transfer-sneakernet)
10. [Appendix C — Step-by-Step: Media Sanitization](#appendix-c--step-by-step-media-sanitization)
11. [Appendix D — Step-by-Step: Shift End and Handoff](#appendix-d--step-by-step-shift-end-and-handoff)

---

## 1. Role Definition and Boundaries

### What the SA owns

The System Administrator is responsible for the **technical health, security configuration, and day-to-day operation** of all systems within the SAP boundary. The SA executes authorized maintenance tasks, documents all actions via MRC cards, and reports findings to the ISSO.

| SA Owns | SA Does NOT Own |
|---------|----------------|
| System configuration and hardening | Policy decisions — that is the ISSM |
| Patch application (authorized) | Authorizing maintenance — that is the ISSM |
| AV/EDR health and definition currency | Granting user access — that is the ISSO/ISSM |
| Backup execution and verification | ATO management — that is the ISSM |
| Log review and SIEM triage | Accepting risk on findings — that is the ISSM |
| Certificate management (execution) | Approving software for the ASL — that is the ISSM |
| Hardware health monitoring | Physical access decisions — that is Physical Security |
| Removable media handling (technical) | Visitor escort — that is Physical Security |
| MRC documentation | ConMon package submission — that is the ISSO |

### The SA's chain of escalation

```
SA  →  ISSO  →  ISSM
```

- **SA to ISSO:** Routine findings, shift summaries, task completion reports
- **SA to ISSM directly:** Non-tailorable control failures (SC-28, SA-22, AC-6(1)), potential incidents, anything that requires a policy decision or stop-work
- **When in doubt:** Notify ISSM directly — never delay escalation waiting for ISSO availability

### What the SA must NEVER do without authorization

- Install any software not on the Approved Software List (ASL)
- Connect any device not in the SAPF inventory to any system
- Disable any security control — even temporarily — without ISSM written authorization
- Share credentials or use another person's account
- Remove any media from the SAPF without ISSM/PSO authorization and a completed transfer log
- Attempt to remediate a potential security incident without ISSM direction

---

## 2. Air-Gap Environment — SA Context

An air-gapped network has **no physical or logical connection to any external network.** Every data movement — patches, AV definitions, tools, exports — happens via authorized removable media. The SA is the primary operator of this transfer process.

**SA daily constraints:**

| Situation | Air-Gap Reality for the SA |
|-----------|---------------------------|
| AV definition updates | Manual download on isolated workstation → hash verify → inbound scan → push to EDR console |
| OS/application patches | CCB CR + ISSM authorization first → transfer media → inbound scan → deploy |
| New tools | Must be on ASL first → ISSM approves → transfer in via authorized media |
| Log forwarding | Internal SIEM only — no external SOC. SA reviews locally |
| Time sync | Internal NTP hierarchy only — `w32tm /query /status` to verify |
| Remote administration | Jump server or direct console within SAPF boundary only — no external RDP |

**The SA's role in maintaining the air gap:**
The boundary only holds if every SA enforces it every shift. Common violations:
- Personal device (phone, thumb drive) connected to any system — **never acceptable**
- Laptop that touched NIPR brought in without sanitization and ISSM authorization — **never acceptable**
- Unapproved software transferred in without ASL approval — **never acceptable**

---

## 3. Shift Start Procedures

> Quick-reference checklist. Full step-by-step in **Appendix A**.

### Pre-Entry

- [ ] Sign SAPF access log — date, time in, printed name, signature
- [ ] Verify your clearance and access authorization is current
- [ ] Check entry point for ISSM advisories, maintenance NOTAMs, or outage notices
- [ ] Confirm no unauthorized personnel are present in SAPF

### Physical Check (before touching any system)

- [ ] Inspect server rack indicator lights — no amber or red fault LEDs
- [ ] Inspect UPS display — battery green, load normal, runtime acceptable
- [ ] Verify tamper-evident seals on all equipment — intact, no signs of tampering
- [ ] Confirm no unauthorized devices connected (USB, external drives, unknown cables)
- [ ] Check environmental indicators (temp/humidity) if monitored

### System Access

- [ ] Log in with your individual named account + CAC/MFA — **never shared credentials**
- [ ] Note any banners or alerts displayed at login
- [ ] Confirm you have open, ISSM-authorized MRCs for today's planned tasks

### Initial Monitoring (first 15 minutes)

- [ ] Open SIEM dashboard — review overnight alert queue, triage by severity
- [ ] Verify audit log service active and forwarding
- [ ] Check backup job status — all overnight jobs completed successfully
- [ ] Verify AV/EDR console — all agents online, definitions current ⚠️ NON-TAILORABLE AC-6(1)
- [ ] Check AD replication health — `repadmin /replsummary`
- [ ] Review media inventory — all items accounted for from prior shift

---

## 4. Core Daily Checklist

> Minimum tasks every SA completes every operational day. Check off as completed, note the time, reference the MRC.

### Security Monitoring

| # | Task | Time | MRC | ✓ |
|---|------|------|-----|---|
| D-01 | Triage SIEM dashboard — all new alerts reviewed and categorized by severity | | MRC-0101-DA | ☐ |
| D-02 | Review failed authentication events — apply escalation threshold | | MRC-0101-DA | ☐ |
| D-03 | Review privilege escalation events — correlate to authorized change tickets | | MRC-0101-DA | ☐ |
| D-04 | Review account management events (create / modify / delete / lock) | | MRC-0101-DA | ☐ |
| D-05 | Review IDS/IPS alert queue — escalate High/Critical to ISSO immediately | | MRC-0701-DA | ☐ |
| D-06 | Confirm audit log service active and forwarding to SIEM | | MRC-0101-DA | ☐ |
| D-07 | Verify audit log storage capacity within threshold — flag at 80% | | MRC-0101-DA | ☐ |

### Endpoint Protection ⚠️ NON-TAILORABLE: AC-6(1)

| # | Task | Time | MRC | ✓ |
|---|------|------|-----|---|
| D-08 | ⚠️ Verify AV/EDR definitions current on ALL managed endpoints | | MRC-0301-DA | ☐ |
| D-09 | ⚠️ Verify all EDR agents online and reporting — document any offline agents | | MRC-0301-DA | ☐ |
| D-10 | Review and disposition EDR quarantine queue — all new items actioned | | MRC-0301-DA | ☐ |

### Backup Verification

| # | Task | Time | MRC | ✓ |
|---|------|------|-----|---|
| D-11 | Verify all backup jobs completed successfully in last 24 hours | | MRC-0401-DA | ☐ |
| D-12 | Verify replication jobs completed to alternate storage | | MRC-0401-DA | ☐ |
| D-13 | Check backup storage capacity — flag if below threshold | | MRC-0401-DA | ☐ |

### System Health

| # | Task | Time | MRC | ✓ |
|---|------|------|-----|---|
| D-14 | Review system health dashboard — all host statuses | | MRC-0601-DA | ☐ |
| D-15 | Review CPU, memory, disk, and network utilization against baselines | | MRC-0601-DA | ☐ |
| D-16 | Verify RAID/storage controller status via iLO/iDRAC | | MRC-0601-DA | ☐ |
| D-17 | Verify all critical services in running state | | MRC-0601-DA | ☐ |
| D-18 | Review OS/application error events in system event logs | | MRC-0101-DA | ☐ |

### Directory & Identity

| # | Task | Time | MRC | ✓ |
|---|------|------|-----|---|
| D-19 | `repadmin /replsummary` — verify AD replication health across all DCs | | MRC-1001-DA | ☐ |
| D-20 | Verify NETLOGON service running on all domain controllers | | MRC-1001-DA | ☐ |
| D-21 | DNS functional check — `nslookup` against key A records and SRV records | | MRC-1001-DA | ☐ |
| D-22 | Verify SYSVOL/NETLOGON DFS-R replication health | | MRC-1001-DA | ☐ |

### Air-Gap Media Accountability

| # | Task | Time | ✓ |
|---|------|------|---|
| D-23 | Verify media inventory — all items accounted for, no overdue checkouts | | ☐ |
| D-24 | Confirm no unauthorized media entries in the log since last shift | | ☐ |
| D-25 | Verify no removable media currently connected to any system without an active log entry | | ☐ |

---

## 5. Shift End Procedures

> Quick-reference. Full step-by-step in **Appendix D**.

### Documentation

- [ ] All MRC entries for today are complete — no blank fields, no missing times
- [ ] All MRCs signed — printed name, signature, date, time
- [ ] Completed MRCs filed to designated location per local SOP
- [ ] Shift summary written — open findings, anomalies, in-progress tasks documented
- [ ] ISSO notified of any open findings or anomalies via approved internal channel

### System State

- [ ] All administrative sessions closed — RDP, console, SIEM, EDR, backup console
- [ ] Admin workstation locked — screen lock active
- [ ] No removable media connected to any system
- [ ] All media from today's shifts logged back in to inventory
- [ ] Overnight backup jobs confirmed queued or running

### Handoff (if relieving SA incoming)

- [ ] Brief incoming SA on open findings, anomalies, and in-progress tasks
- [ ] Incoming SA logs in with their own credentials before you log out
- [ ] Both SAs sign the handoff log
- [ ] Sign SAPF access log — time out

### If Last SA Out

- [ ] All systems in expected state — no unattended jobs, no error conditions
- [ ] SAPF secured per local SOP — door locked, all access points verified
- [ ] SAPF secured entry logged in physical access log

---

## 6. Air-Gap Specific Tasks

### 6.1 AV Definition Update (Daily Workflow)

Definitions must never be more than 48 hours behind current vendor release. This is a manual process every day.

**Quick steps:**
1. Isolated transfer workstation (outside SAPF) — download current definitions from vendor console
2. Verify hash against vendor-published value — mismatch = do not proceed, notify ISSM
3. Copy to authorized transfer media — log media out of inventory
4. Carry to SAPF inbound scan station — scan before connecting to any network-connected system
5. Zero detections on scan — proceed. Any detection = quarantine media, notify ISSM immediately
6. Import definitions into EDR console — push to all endpoints
7. Verify all endpoints show current definition date
8. Log update in MRC-0301-DA
9. Sanitize transfer media (§6.3) — log back in to inventory

> Full procedure: **Appendix B**

---

### 6.2 Patch Import Workflow

Never apply patches without a CCB-approved Change Request and ISSM written authorization first.

**Quick steps:**
1. CCB CR approved + ISSM written authorization in hand — do not proceed without both
2. Download approved patches on isolated transfer workstation — verify hashes
3. Transfer to SAPF via authorized media — inbound scan mandatory
4. Deploy via patch management console per MRC-0201-MO
5. Post-patch verification: run vulnerability scan, verify BitLocker intact (SC-28 ⚠️), verify no EOL software introduced (SA-22 ⚠️)
6. Sanitize transfer media — log back in

---

### 6.3 Media Sanitization

Any media used in the SAPF must be sanitized before re-use or release. Standard "format" or "delete" is not acceptable — it does not remove data from modern drives.

**Quick reference by scenario:**

| Scenario | Required Method |
|----------|----------------|
| Re-use within SAPF at same classification | ISSM-approved overwrite tool, one-pass + verify |
| Re-use at lower classification or release outside SAPF | DoD 5220.22-M or NIST 800-88 Clear/Purge — confirm method with ISSM in writing |
| Destruction (will not be re-used) | NSA-approved physical destruction per local SOP — shred, degauss, or disintegrate |

Log every sanitization: media ID, date, method, tool/version, operator, witness (if required), result.

> Full procedure: **Appendix C**

---

### 6.4 Artifact Export Workflow

Exporting logs, ConMon artifacts, or reports out of the SAPF is a controlled outbound transfer. The SA handles the technical execution — the ISSO coordinates the submission.

**Quick steps:**
1. ISSM written authorization specifying: data, classification, destination, recipient
2. Stage files — ISSO or ISSM reviews contents before media is touched
3. Copy to authorized export media — log: your name, date, time, contents, classification, destination
4. SA and ISSO/ISSM both sign transfer log before media exits SAPF
5. Escort media to destination — do not leave unattended
6. Obtain signed receipt — return copy to ISSM, log in transfer record

---

## 7. Incident Triggers

> These thresholds define when to stop work, when to escalate, and to whom. When in doubt — notify ISSM first, act second.

### Tier 1 — Stop Work / Notify ISSM Immediately

Do not attempt to remediate. Preserve system state. Call ISSM now.

| # | Trigger | Why |
|---|---------|-----|
| T1-01 | Any volume unencrypted or BitLocker suspended ⚠️ | SC-28 non-tailorable control failure |
| T1-02 | Any EOL/unsupported software discovered ⚠️ | SA-22 non-tailorable control failure |
| T1-03 | EDR agent offline beyond ISSM-defined threshold ⚠️ | AC-6(1) non-tailorable control failure |
| T1-04 | Unknown/unauthorized device found connected to any system | Potential boundary violation / supply chain threat |
| T1-05 | File integrity check failure on critical system file | Potential compromise — possible IR-4 incident |
| T1-06 | Unauthorized user account discovered | AC-2 violation — potential unauthorized access |
| T1-07 | Classified data found on lower-classified or unclassified system | Spillage — containment required |
| T1-08 | Lateral movement or unexplained privilege escalation in SIEM | Potential active intrusion |
| T1-09 | System exhibiting unexplained behavior (unknown processes, connections, CPU spikes) | Potential compromise indicator |

**On any Tier 1 trigger:** Document what you observed (time, system, detail). Notify ISSM. Do nothing else until directed.

---

### Tier 2 — Notify ISSO Within 4 Hours

| # | Trigger | Action |
|---|---------|--------|
| T2-01 | Failed logon attempts exceed threshold against privileged account | Document count, account, source. Notify ISSO. Do not unlock without direction. |
| T2-02 | Two consecutive backup failures on a critical system | Document and notify ISSO. Investigate cause before next window. |
| T2-03 | RAID degraded / disk failure alert | Document. Notify ISSO. No hardware swap without CCB CR + ISSM authorization. |
| T2-04 | Certificate expiring within 14 days | Notify ISSO. Begin renewal per MRC-0901-WK. |
| T2-05 | AD replication failure lasting more than 30 minutes | Document. Notify ISSO. Investigate per MRC-1001-DA. |
| T2-06 | NTP drift exceeding 5 minutes on any host | Document. Notify ISSO. Kerberos and audit log integrity are at risk. |
| T2-07 | Audit log storage at or above 80% capacity | Notify ISSO. Do not delete logs without ISSM direction. |
| T2-08 | Unauthorized software discovered (not on ASL) | Document. Notify ISSO. Do not remove without CCB + ISSM direction. |
| T2-09 | Media transferred into SAPF without completing inbound scan | Notify ISSM immediately. Quarantine media. Do not connect to any system. |

---

### Tier 3 — Document and Report at Shift End

| # | Trigger | Action |
|---|---------|--------|
| T3-01 | Single non-critical backup failure (first occurrence) | Document cause. Report in shift log. |
| T3-02 | Non-critical service restart required | Document. Restart per approved procedure. Log in shift summary. |
| T3-03 | Disk utilization above 75% on non-critical system | Document. Monitor. Report in shift log. |
| T3-04 | Minor SIEM alerts with clear benign explanation | Document explanation. Log in shift summary. |
| T3-05 | Application error events with no security impact | Document. Investigate. Log in shift summary. |

---

## Appendix A — Step-by-Step: Shift Start

| Step | Action | Detail |
|------|--------|--------|
| 1 | Sign SAPF access log | Print name, sign, record time in. Check that the previous entry is from an authorized person. |
| 2 | Check entry point for advisories | Any ISSM-posted notices — maintenance windows, known outages, special instructions. |
| 3 | Physical walk-through before touching any system | Check every rack: indicator lights top-to-bottom. Any amber/red = document before proceeding. Check UPS. Check seals. |
| 4 | Inspect for unauthorized devices | Every accessible port on every rack. Unknown USB, external drive, unknown cable = T1-04 trigger. Document and notify ISSM immediately. |
| 5 | Log in to admin workstation | Individual named account + CAC/MFA. Unexpected login failure = document and notify ISSM. Never use another person's credentials. |
| 6 | Open SIEM dashboard first | Before any other task — triage overnight alert queue. Any Tier 1 trigger = stop and notify ISSM before proceeding. |
| 7 | Check backup job status | Backup console → Job History → last 24 hours. Critical system failure = T2-02. |
| 8 | Check AV/EDR console | All agents online? Definitions current? Agent offline or definitions stale = document immediately. Threshold breach = T1-03. |
| 9 | Check AD replication | `repadmin /replsummary`. Failure > 30 minutes = T2-05. |
| 10 | Review media inventory | All items from prior shift returned and logged. Any overdue checkout = investigate before starting tasks. |
| 11 | Open authorized MRCs | Confirm ISSM authorization is current for all planned tasks. Begin logging in real time. |

---

## Appendix B — Step-by-Step: Data Transfer (Sneakernet)

> ⚠️ ISSM written authorization required before any transfer. No exceptions.

### Inbound Transfer

| Step | Action | Detail |
|------|--------|--------|
| 1 | Obtain ISSM written authorization | Specifies: what data, what media, who transfers, date. File before proceeding. |
| 2 | Use only inventory-tracked transfer media | No personal devices. Log media out: your name, date, time, purpose. |
| 3 | Prepare data on isolated transfer workstation | Dedicated workstation outside SAPF — not connected to SAP systems. |
| 4 | Hash the files before copying | `Get-FileHash <file> -Algorithm SHA256` — record every hash value. |
| 5 | Copy only authorized files to media | Nothing extra. |
| 6 | Carry to SAPF inbound scan station | Dedicated standalone system at SAPF entry — used only for scanning inbound media. |
| 7 | Full AV/malware scan on scan station | Must complete with zero detections. Any detection = quarantine media, notify ISSM. |
| 8 | Re-verify hash on scan station | `Get-FileHash` — compare to Step 4 values. Mismatch = do not proceed, notify ISSM. |
| 9 | Copy from scan station to target | Never from raw transfer media directly to a production system. |
| 10 | Sanitize transfer media | Per Appendix C. |
| 11 | Log transfer complete | Update media log and MRC as applicable. |

### Outbound Transfer

| Step | Action | Detail |
|------|--------|--------|
| 1 | Obtain ISSM/PSO written authorization | Classification of data, destination, authorized recipient, media to be used. |
| 2 | Stage data for ISSO/ISSM review | Do not copy to media yet. Reviewer confirms classification level and destination appropriateness. |
| 3 | Copy approved data to export media | Log: your name, date, time, contents, classification, destination. |
| 4 | SA and ISSO/ISSM both sign transfer log | Both signatures before media exits SAPF. |
| 5 | Escort media directly to destination | Do not leave unattended at any point. |
| 6 | Obtain signed receipt | Return confirmation to ISSM. Log in transfer record. |

---

## Appendix C — Step-by-Step: Media Sanitization

| Step | Action | Detail |
|------|--------|--------|
| 1 | Determine required method | Confirm with ISSM if re-use within SAPF, release outside SAPF, or destruction. Method varies. |
| 2 | Re-use within SAPF (same classification) | ISSM-approved overwrite tool — one-pass overwrite with verification. |
| 3 | Release outside SAPF or lower classification | DoD 5220.22-M or NIST 800-88 Rev 1 Clear/Purge — get method in writing from ISSM before starting. |
| 4 | Destruction | NSA-approved physical destruction (shred, degauss, disintegrate) per local SOP. Two-person rule may apply. |
| 5 | Document the sanitization | Media log: media ID/serial, date, method, tool/version, operator, witness (if required), result. |
| 6 | Update inventory | Return sanitized media to inventory (if re-use) or close the record (if destroyed). |

---

## Appendix D — Step-by-Step: Shift End and Handoff

| Step | Action | Detail |
|------|--------|--------|
| 1 | Complete all MRC entries | Every field filled. Every step documented. Incomplete task = document why, not left blank. |
| 2 | Sign all MRCs | Printed name + signature + date + time on every card. |
| 3 | File completed MRCs | Designated storage per local SOP. Electronic scan if required. |
| 4 | Write shift summary | Completed tasks, findings, open items, anything pending. This is the handoff document. |
| 5 | Notify ISSO of any open Tier 2 or Tier 3 findings | Approved internal channel. Never leave a finding unreported at shift end. |
| 6 | Check media inventory | Every piece of media from today logged back in. Nothing checked out overnight without ISSM authorization. |
| 7 | Close all admin sessions | SIEM, EDR, backup console, any RDP or remote sessions. Verify closed. |
| 8 | Lock admin workstation | Screen lock active. |
| 9 | Handoff to incoming SA | Verbal brief + shift summary. They log in with their credentials before you log out. Both sign handoff log. |
| 10 | Sign SAPF access log | Printed name + signature + time out. |
| 11 | If last out of SAPF | Verify system state. Secure SAPF per local SOP. Log SAPF secured. |

---

*SA-BASELINE.md | Version 2.0 | April 2026*
*DoD SAP / JSIG Environment — System Administrator Role*
*Classification: [CLASSIFICATION]*
*All tasks require ISSM written authorization (MA-2)*
