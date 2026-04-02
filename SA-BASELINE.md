# SA Operational Baseline
### System Administrator — Air-Gapped SAP Environment
#### Daily Operations, Shift Procedures, and Incident Triggers

> **Purpose:** This document establishes the minimum baseline expectation for System Administrator operations in an air-gapped Special Access Program (SAP) environment. It is designed to be handed to any SA — including one new to the environment — and provide clear, actionable expectations for every shift.
>
> **Relationship to other documents:**
> - `TECHNICAL_TASK_SCOPE.md` — full assignable task list mapped to MRC IDs and JSIG controls
> - `MRC Library (categories/)` — step-by-step procedure cards for each task
> - `ISSM_Scheduled_Maintenance_Proposal_Template.docx` — ISSM authorization framework
>
> **Authority:** All tasks in this document require ISSM authorization per JSIG MA-2. Tasks marked ⚠️ touch non-tailorable JSIG controls — any finding requires **immediate ISSM notification**.

---

## Table of Contents

1. [Air-Gap Environment Overview](#1-air-gap-environment-overview)
2. [Shift Start Procedures](#2-shift-start-procedures)
3. [Core Daily Checklist](#3-core-daily-checklist)
4. [Shift End Procedures](#4-shift-end-procedures)
5. [Air-Gap Specific Tasks](#5-air-gap-specific-tasks)
6. [Incident Triggers](#6-incident-triggers)
7. [Appendix A — Step-by-Step: Shift Start](#appendix-a--step-by-step-shift-start)
8. [Appendix B — Step-by-Step: Data Transfer (Sneakernet)](#appendix-b--step-by-step-data-transfer-sneakernet)
9. [Appendix C — Step-by-Step: Removable Media Sanitization](#appendix-c--step-by-step-removable-media-sanitization)
10. [Appendix D — Step-by-Step: Shift End and Handoff](#appendix-d--step-by-step-shift-end-and-handoff)
11. [Appendix E — Escalation Contact Reference](#appendix-e--escalation-contact-reference)

---

## 1. Air-Gap Environment Overview

### What "air-gapped" means operationally

An air-gapped network has **no physical or logical connection to any external network** — no internet, no unclassified DoD network (NIPR), no connection outside the SAPF boundary. This is not a configuration option — it is a physical and architectural requirement of the SAP accreditation.

**Practical consequences for the SA:**

| Situation | Air-Gapped Reality |
|-----------|-------------------|
| Software updates / patches | Must be transferred in via authorized removable media after ISSM approval — no Windows Update, no WSUS pulling from internet |
| Virus definition updates | Must be transferred in via authorized removable media on the SA's update schedule — no automatic cloud updates |
| External tool downloads | Not possible — all tools must be pre-approved, on the ASL, and imported via authorized media |
| Email / ticketing | Internal only — no external email. All ISSM communications via approved internal channel |
| Time synchronization | Internal NTP hierarchy only — no public NTP servers |
| Log forwarding | Internal SIEM only — no external SOC feed |
| Remote access | Not permitted from outside the SAPF — all administration is local or via authorized jump server within the boundary |
| USB / removable media | Strictly controlled — every device tracked, every transfer logged |

### The SA's role in maintaining the boundary

The air gap only works if **every SA enforces it every day**. Common ways the boundary is accidentally violated:

- Plugging in a personal device (phone charger, thumb drive) — **never acceptable**
- Connecting a laptop that has been on NIPR — **never acceptable without complete sanitization and ISSM authorization**
- Using unapproved software brought in on media — **never acceptable**
- Leaving console sessions unattended and unlocked — **policy violation**

When in doubt: **ask the ISSM before acting.**

---

## 2. Shift Start Procedures

> Use this as a quick-reference checklist. For step-by-step detail on each item, see **Appendix A**.

### Pre-Entry

- [ ] Sign SAPF access log (PE-6) — date, time in, printed name, signature
- [ ] Verify your clearance and access is current — do not enter if access has lapsed
- [ ] Check for any posted NOTAMs, outage notices, or ISSM advisories at the entry point
- [ ] Verify no unauthorized personnel are in the SAPF before proceeding to workstation

### Physical Inspection (complete before touching any system)

- [ ] Inspect server rack indicator lights — no fault/amber LEDs
- [ ] Inspect UPS display — battery health green, load within normal range, estimated runtime acceptable
- [ ] Inspect tamper-evident seals on equipment — all intact, none showing signs of tampering
- [ ] Verify no unauthorized devices are connected (USB, external drives, unknown cables)
- [ ] Check environmental indicators — temperature, humidity within normal range if monitored

### System Access

- [ ] Log in with your individual named account — **never use shared or generic credentials**
- [ ] Verify MFA / CAC authentication succeeded
- [ ] Note any system alerts or banners displayed at login

### Initial Monitoring Check (first 15 minutes)

- [ ] Open SIEM dashboard — review overnight alert queue
- [ ] Verify audit log service is active and forwarding to SIEM
- [ ] Check backup job status — confirm all overnight jobs completed successfully
- [ ] Verify AV/EDR console — all agents online, definitions current ⚠️ NON-TAILORABLE AC-6(1)
- [ ] Review DNS/AD replication health — `repadmin /replsummary`

### Open MRC

- [ ] Open the applicable daily MRC for today's shift (MRC-0101-DA, MRC-0301-DA, MRC-0401-DA, MRC-0601-DA as applicable)
- [ ] Confirm ISSM authorization is current for all MRCs you plan to execute today
- [ ] Begin documenting findings in real time — do not wait until end of shift

---

## 3. Core Daily Checklist

> This is the minimum set of tasks every SA must complete every operational day. Each item maps to an MRC. Check off as completed and note the time.

### Security Monitoring

| # | Task | Time | MRC | Done |
|---|------|------|-----|------|
| D-01 | Review SIEM event dashboard — triage all new alerts by severity | | MRC-0101-DA | ☐ |
| D-02 | Review failed authentication events — apply escalation threshold | | MRC-0101-DA | ☐ |
| D-03 | Review privilege escalation events — correlate to authorized activity | | MRC-0101-DA | ☐ |
| D-04 | Review account management events (create / modify / delete / lock) | | MRC-0101-DA | ☐ |
| D-05 | Review IDS/IPS alert queue — escalate High/Critical to ISSO immediately | | MRC-0701-DA | ☐ |
| D-06 | Confirm audit log service active and forwarding to SIEM | | MRC-0101-DA | ☐ |
| D-07 | Verify audit log storage capacity within acceptable threshold | | MRC-0101-DA | ☐ |

### Endpoint Protection ⚠️ NON-TAILORABLE: AC-6(1)

| # | Task | Time | MRC | Done |
|---|------|------|-----|------|
| D-08 | ⚠️ Verify AV/EDR definitions current on all managed endpoints | | MRC-0301-DA | ☐ |
| D-09 | ⚠️ Verify all EDR agents online and reporting — document any offline | | MRC-0301-DA | ☐ |
| D-10 | Review EDR quarantine queue — disposition all new items | | MRC-0301-DA | ☐ |

### Backup Verification

| # | Task | Time | MRC | Done |
|---|------|------|-----|------|
| D-11 | Verify all backup jobs completed successfully in last 24 hours | | MRC-0401-DA | ☐ |
| D-12 | Verify replication jobs completed to alternate storage target | | MRC-0401-DA | ☐ |
| D-13 | Check backup storage capacity — flag if below threshold | | MRC-0401-DA | ☐ |

### System Health

| # | Task | Time | MRC | Done |
|---|------|------|-----|------|
| D-14 | Review system health dashboard — all host statuses | | MRC-0601-DA | ☐ |
| D-15 | Review CPU, memory, disk, network utilization against baselines | | MRC-0601-DA | ☐ |
| D-16 | Verify RAID/storage controller status via iLO/iDRAC | | MRC-0601-DA | ☐ |
| D-17 | Verify all critical services in running state | | MRC-0601-DA | ☐ |
| D-18 | Check OS/application error events in system event logs | | MRC-0101-DA | ☐ |

### Directory & Identity

| # | Task | Time | MRC | Done |
|---|------|------|-----|------|
| D-19 | Run `repadmin /replsummary` — verify AD replication health | | MRC-1001-DA | ☐ |
| D-20 | Verify NETLOGON service running on all domain controllers | | MRC-1001-DA | ☐ |
| D-21 | Verify DNS resolution functional — `nslookup` test against key records | | MRC-1001-DA | ☐ |
| D-22 | Verify SYSVOL / NETLOGON share replication health (DFS-R) | | MRC-1001-DA | ☐ |

### Physical & Facility

| # | Task | Time | MRC | Done |
|---|------|------|-----|------|
| D-23 | Review SAPF physical access log for previous 24 hours | | MRC-1301-DA | ☐ |
| D-24 | Visually inspect server rack indicator lights — no fault conditions | | MRC-1301-DA | ☐ |
| D-25 | Check UPS — battery health, load, runtime | | MRC-1301-DA | ☐ |
| D-26 | Verify tamper-evident seals / tape are intact on all equipment | | MRC-1301-DA | ☐ |

### Air-Gap Media Log

| # | Task | Time | Done |
|---|------|------|------|
| D-27 | Review removable media log — verify no unauthorized entries since last shift | | ☐ |
| D-28 | Verify all removable media is accounted for in the media inventory | | ☐ |
| D-29 | Confirm no media is logged out and overdue for return | | ☐ |

---

## 4. Shift End Procedures

> Use this as a quick-reference checklist. For step-by-step detail, see **Appendix D**.

### Documentation

- [ ] Complete all open MRC entries for today — all fields filled, no blanks
- [ ] Sign each completed MRC (printed name + signature + date + time)
- [ ] File completed MRCs to the designated storage location per local SOP
- [ ] Log any open findings or anomalies in the shift log for handoff
- [ ] Notify ISSO of any open findings or anomalies via approved internal channel

### System State

- [ ] Verify all administrative sessions are closed — no open RDP, no open console sessions
- [ ] Lock all workstations — verify screen lock is active on admin workstation
- [ ] Verify no removable media is connected to any system at end of shift
- [ ] Confirm all removable media used today is logged back in to the media inventory
- [ ] Verify backup jobs are queued / running for the overnight cycle

### Handoff (if relieved by another SA)

- [ ] Brief incoming SA on any open findings, anomalies, or in-progress tasks
- [ ] Transfer any open MRCs to incoming SA — they must initial the handoff block
- [ ] Confirm incoming SA is logged in with their own credentials before departing
- [ ] Sign SAPF access log — time out

### If Last SA Out of the SAPF

- [ ] Verify all systems are in expected state (no unattended jobs, no error conditions)
- [ ] Arm any physical security systems per local SOP
- [ ] Confirm SAPF is secured — door locked, all physical access points verified
- [ ] Log SAPF secured in the physical access log

---

## 5. Air-Gap Specific Tasks

### 5.1 Removable Media Control

The air gap means **removable media is the only way data moves in or out**. This makes media control the single highest-risk daily operation. Every piece of media must be tracked from the moment it enters the SAPF to the moment it leaves or is destroyed.

**Media categories in a SAP environment:**

| Type | Use | Control Level |
|------|-----|--------------|
| SA Admin Media | Patches, AV definitions, tools — inbound only | Must be scanned before use; ISSM-authorized |
| User Data Media | Approved data transfers — requires PSO authorization | Individual log entry per use; sanitized after |
| Backup Media | System backups | Stored in authorized locked media cabinet; logged in/out |
| Classified Output Media | Printed or exported classified data | PSO authorization required; tracked to destruction |

**Daily media accountability checklist:**

- [ ] Media inventory log is current — all items accounted for
- [ ] No media is connected to any system without an open log entry
- [ ] Any media used today is logged with: user, system used on, purpose, time in/out
- [ ] Any media leaving the SAPF has written ISSM/PSO authorization
- [ ] Media used for data transfer has been sanitized per Appendix C before re-use or release

---

### 5.2 AV Definition Updates (Air-Gap Workflow)

Because there is no internet connectivity, AV/EDR definition updates cannot happen automatically. The SA is responsible for a defined manual update cycle.

**Standard update cadence:** Daily (DA) — definitions must never be more than 24–48 hours behind current vendor release.

**Quick reference — definition update workflow:**

1. On the authorized, isolated transfer workstation (outside SAPF): download current definitions from vendor console or media
2. Verify hash/checksum of downloaded definition file against vendor-published value
3. Copy definitions to authorized, clean transfer media — log the media out
4. Carry media into SAPF — log SAPF entry
5. Scan transfer media on dedicated inbound scan station before connecting to any SAP system
6. Import definitions into EDR management console (Trellix ePO or equivalent)
7. Push definition update to all managed endpoints
8. Verify all endpoints show current definition date in EDR console
9. Log update completion in MRC-0301-DA
10. Sanitize transfer media (Appendix C) — log media back in to inventory

> See **Appendix B** for full step-by-step sneakernet data transfer procedure.

---

### 5.3 Patch Import (Air-Gap Workflow)

Patches cannot be downloaded directly to SAP systems. The SA must transfer them in via authorized media after ISSM and CCB approval.

**Quick reference — patch import workflow:**

1. Obtain CCB-approved Change Request and ISSM written authorization (MA-2, CM-3) — **do not proceed without both**
2. On isolated transfer workstation: download approved patches from WSUS/vendor — verify hashes
3. Copy patches to authorized transfer media — log media out
4. Carry media to SAPF inbound scan station — scan before use
5. Import patches to internal WSUS server or patch management console
6. Deploy per MRC-0201-MO procedure steps
7. Post-patch: run vulnerability scan, verify encryption (SC-28), verify no EOL software introduced (SA-22)
8. Sanitize transfer media — log back in to inventory

---

### 5.4 Log/Artifact Export (Air-Gap Workflow)

ConMon artifacts, logs, and reports must be exported from the SAP network for ISSM submission. This is a controlled, one-way outbound transfer.

**Quick reference — artifact export workflow:**

1. Obtain ISSM written authorization for the specific export
2. Identify and stage artifacts — verify they contain no data above the authorized export classification level
3. Copy to authorized export media — log media out from inventory
4. ISSM (or designated reviewer) reviews media contents before it leaves the SAPF — **do not exit SAPF with media before ISSM review**
5. SA and ISSM both sign the media transfer log
6. Media exits SAPF — logged with: contents, classification, destination, time out, authorized by
7. After delivery, obtain confirmation of receipt from destination
8. Log receipt confirmation in the media transfer log

---

## 6. Incident Triggers

> These are the thresholds that require the SA to **stop work and notify the ISSM immediately** — before taking any remediation action. "Immediately" means within the same shift, without delay.
>
> When in doubt: **notify first, act second.**

---

### Tier 1 — Stop Work Immediately / Notify ISSM NOW

These are potential security incidents or non-tailorable control failures. Stop all work on the affected system. Do not attempt to remediate. Preserve the system state. Call the ISSM.

| # | Trigger | Why | Action |
|---|---------|-----|--------|
| T1-01 | Any volume found unencrypted or BitLocker suspended ⚠️ | SC-28 non-tailorable control failure | Stop work on affected system. Preserve state. Notify ISSM immediately. Do not re-encrypt without direction. |
| T1-02 | Any EOL/unsupported software discovered ⚠️ | SA-22 non-tailorable control failure | Document hostname and software. Notify ISSM immediately. Do not remove without direction. |
| T1-03 | AV/EDR agent offline on any host for more than [threshold TBD with ISSM] ⚠️ | AC-6(1) non-tailorable control failure | Document affected host. Notify ISSM immediately. Do not attempt agent reinstall without direction. |
| T1-04 | Unknown or unauthorized device found connected to any SAP system | Potential boundary violation / supply chain threat | Do not remove the device. Isolate the affected system if possible. Notify ISSM immediately. This may be a SITREP-level incident. |
| T1-05 | Tamper-evident seal broken or missing on any equipment | Physical security breach / potential hardware compromise | Do not touch the affected system. Notify ISSM and physical security immediately. |
| T1-06 | File integrity check failure on critical system file | Potential compromise / malicious modification | Isolate affected system. Notify ISSM immediately — this is a potential IR-4 incident. Do not reboot or modify. |
| T1-07 | Unauthorized user account found (not in authorized user list) | AC-2 violation — potential unauthorized access | Do not disable without ISSM direction (preserve evidence). Notify ISSM immediately. |
| T1-08 | Any classified data found on an unclassified or lower-classified system | Spillage — requires immediate containment | Stop work. Do not attempt to delete or clean. Notify ISSM immediately. Spillage procedures activate. |
| T1-09 | SIEM alert — lateral movement or privilege escalation with no authorized change ticket | Potential active intrusion | Isolate affected systems if instructed. Notify ISSM and ISSO immediately. Preserve logs. |
| T1-10 | Any system behaving in an unexpected way that cannot be explained (unusual processes, network connections, CPU spikes with no known cause) | Potential compromise indicator | Document behavior. Notify ISSM. Do not power off without direction — volatile memory may contain evidence. |

---

### Tier 2 — Escalate to ISSM Within 4 Hours

These are significant findings that require ISSM awareness and direction but do not require immediate stop-work on the entire environment.

| # | Trigger | Action |
|---|---------|--------|
| T2-01 | Failed logon attempts exceed threshold (e.g., 10+ against a privileged account in 1 hour) | Document count, account, and source. Notify ISSM. Do not unlock account without direction. |
| T2-02 | Backup job failure — 2 consecutive failures on a critical system | Notify ISSM. Document failure details. Investigate and report cause before next backup window. |
| T2-03 | RAID degraded / disk failure alert | Document the alert. Notify ISSM. Do not swap hardware without CCB CR and ISSM authorization. |
| T2-04 | Certificate expiration within 14 days | Notify ISSM. Begin renewal per MRC-0901-WK. |
| T2-05 | AD replication failure lasting more than 30 minutes | Document. Notify ISSM. Investigate per MRC-1001-DA. |
| T2-06 | NTP sync failure — host drifting more than 5 minutes from authoritative source | Document. Notify ISSM. Investigate per MRC-1101-WK. Time drift can break Kerberos and invalidate audit logs. |
| T2-07 | Audit log storage reaching 80% capacity | Notify ISSM. Review retention/archival per AU-11. Do not delete logs without ISSM direction. |
| T2-08 | Unauthorized software found (on ASL check) | Document. Notify ISSM. Do not remove without CCB and ISSM direction. |
| T2-09 | Physical access log shows after-hours entry with no prior authorization on record | Document. Notify ISSM and physical security for review. |
| T2-10 | Any removable media transferred into SAPF without completing the inbound scan procedure | Notify ISSM immediately. Quarantine the media. Do not connect it to any system. |

---

### Tier 3 — Document and Report at Shift End

These are findings the ISSM must be informed of but do not require immediate escalation.

| # | Trigger | Action |
|---|---------|--------|
| T3-01 | Single backup job failure (not a critical system, first occurrence) | Document. Investigate cause. Report in shift log and to ISSM at end of shift. |
| T3-02 | Non-critical service requires restart | Document. Restart per approved procedure. Report in shift log. |
| T3-03 | Disk utilization above 75% (non-critical system) | Document. Monitor. Report in shift log. |
| T3-04 | Minor SIEM alerts with clear, benign explanation | Document explanation in SIEM notes. Log in shift summary. |
| T3-05 | Application error events with no security impact | Document. Investigate. Log in shift summary. |

---

## Appendix A — Step-by-Step: Shift Start

**Estimated time: 15–30 minutes**

**Purpose:** Ensure the SA begins every shift with a complete situational picture of the environment before taking any action.

| Step | Action | Detail |
|------|--------|--------|
| 1 | Sign SAPF access log | Print name, sign, record time. Verify the previous entry is from an authorized person. |
| 2 | Check entry point for advisories | Look for any posted notices from ISSM — maintenance windows, known outages, special instructions. |
| 3 | Physical walk-through before touching any system | Walk the server room. Check rack indicator lights top-to-bottom. Any amber/red lights = document before proceeding. Check UPS. Check seals. |
| 4 | Check for unauthorized devices | Visually inspect every accessible cable/port on every rack. Unknown USB device, unknown external drive, unknown cable = T1-04 incident trigger. |
| 5 | Log in to admin workstation | Use your individual named account + CAC/MFA. If login fails unexpectedly, document and notify ISSM — do not use another person's credentials. |
| 6 | Open SIEM dashboard | Before anything else — review the overnight queue. Triage all alerts. Any Tier 1 triggers = stop and notify ISSM before proceeding. |
| 7 | Check backup job status | Backup console → Job History → Last 24 hours. All success = proceed. Any failure on critical system = T2-02 trigger. |
| 8 | Check AV/EDR console | All agents online? Definitions current? Any host with definitions older than 48 hours = document immediately. Any agent offline = T1-03 check (compare to threshold). |
| 9 | Check AD replication | `repadmin /replsummary` from domain controller or admin tools. Any replication failure = T2-05 trigger if > 30 min. |
| 10 | Review physical access log | Check who entered and exited since your last shift. Any unrecognized entry or after-hours access without prior authorization = T2-09 trigger. |
| 11 | Check media inventory | Confirm all removable media is accounted for. Any media that was logged out by the previous shift should be logged back in or have an active transfer on record. |
| 12 | Open your MRCs for the day | Confirm ISSM authorization is current. Begin logging. |

---

## Appendix B — Step-by-Step: Data Transfer (Sneakernet)

**Estimated time: 30–60 minutes per transfer**

**Purpose:** The only authorized method for moving data into or out of the SAP network is physical transfer via ISSM-authorized removable media. This procedure must be followed exactly — every time.

> ⚠️ **ISSM authorization is required before any data transfer begins. No exceptions.**

### Inbound Transfer (bringing data INTO the SAP network)

| Step | Action | Detail |
|------|--------|--------|
| 1 | Obtain ISSM written authorization | Authorization must specify: what data, what media, who is performing the transfer, and the date. File the authorization before proceeding. |
| 2 | Use only approved transfer media | Media must be from the SAPF inventory — no personal devices, no unapproved media. Log the media out with your name, date, time, and purpose. |
| 3 | Prepare data on isolated transfer workstation | This workstation is outside the SAPF, not connected to SAP systems, and dedicated to this role. Do not use general-purpose workstations. |
| 4 | Verify data hash before copying | `Get-FileHash <file> -Algorithm SHA256` — record the hash. This is your integrity baseline. |
| 5 | Copy data to transfer media | Copy only the authorized files — nothing extra. |
| 6 | Carry media to SAPF inbound scan station | This is a dedicated standalone system inside the SAPF entry point, used only for scanning inbound media before it touches any network-connected system. |
| 7 | Scan media on inbound scan station | Run a full AV/malware scan on the media contents. This scan must complete with zero detections before proceeding. Any detection = quarantine the media and notify ISSM immediately. |
| 8 | Verify hash on scan station | Re-run `Get-FileHash` on the scan station and compare to the hash recorded in Step 4. Mismatch = do not proceed, notify ISSM. |
| 9 | Copy from scan station to target system or internal share | Only after scan and hash verification pass. Never copy directly from transfer media to a production system without these two checks. |
| 10 | Sanitize transfer media | After the transfer is complete and verified, sanitize the media per Appendix C before returning it to the inventory. |
| 11 | Log transfer complete | Media log: mark return time. Update MRC if applicable. |

### Outbound Transfer (taking data OUT of the SAP network)

| Step | Action | Detail |
|------|--------|--------|
| 1 | Obtain ISSM/PSO written authorization | Must specify: classification of data, destination, authorized recipient, media to be used. |
| 2 | Stage data for review | Do not copy to media yet. ISSM or designated reviewer must inspect the data before it is placed on media. |
| 3 | ISSM reviews and approves data | ISSM confirms data does not exceed the authorized export classification and is approved for the destination. |
| 4 | Copy data to export media | Use only inventory-tracked media. Log: your name, date, time, contents, classification, destination. |
| 5 | ISSM and SA both sign the transfer log | Both signatures required before media exits the SAPF. |
| 6 | Physically escort media to destination | Do not leave media unattended. Deliver directly to authorized recipient. |
| 7 | Obtain receipt confirmation | Authorized recipient signs or acknowledges receipt. Return confirmation to ISSM. |
| 8 | Log receipt in media transfer log | Close the transfer record. |

---

## Appendix C — Step-by-Step: Removable Media Sanitization

**Estimated time: 15–30 minutes per device**

**Purpose:** Any media that has been used in the SAP environment must be sanitized before re-use, release outside the SAPF, or destruction. Sanitization prevents data remanence — residual data that could be recovered after deletion.

> ⚠️ **Never use a standard "format" or "delete" — it does not remove data from modern drives. Use only ISSM-authorized sanitization tools and methods.**

| Step | Action | Detail |
|------|--------|--------|
| 1 | Determine sanitization requirement | Is the media being re-used within the SAPF? Re-used at same or higher classification? Released outside the SAPF? Destroyed? Each has a different required method — confirm with ISSM if unsure. |
| 2 | For re-use within SAPF (same classification) | Overwrite using ISSM-approved tool (e.g., DBAN, Eraser, or built-in tool per local SOP). One-pass overwrite with verification. Log: tool used, pass count, verification result. |
| 3 | For re-use at lower classification or release outside SAPF | Must use DoD 5220.22-M or NIST 800-88 Rev 1 Clear/Purge method as directed by ISSM. Confirm method in writing before proceeding. |
| 4 | For destruction (media will not be re-used) | Physical destruction per local SOP — shredding (NSA-approved), degaussing, or disintegration as directed by ISSM. Two-person rule may apply per local policy. |
| 5 | Document the sanitization | Record in media log: media ID/serial, date, method used, tool/version, operator name, witness (if required), result. |
| 6 | Return media to inventory (if re-use) or close the inventory record (if destroyed) | Media log must reflect final disposition. No inventory item should have an open/unresolved status. |

---

## Appendix D — Step-by-Step: Shift End and Handoff

**Estimated time: 15–30 minutes**

| Step | Action | Detail |
|------|--------|--------|
| 1 | Complete all MRC entries | Every MRC started today must have all fields filled. No blank procedure steps, no missing times. If a task was not completed, document why. |
| 2 | Sign all MRCs | Printed name, signature, date, time. If ISSM/ISSO co-sign is required, obtain it before filing. |
| 3 | File MRCs | Place in designated storage per local SOP. Electronic scan and file if required. |
| 4 | Write shift summary | Brief note on: what was completed, what was found, what is pending. This is the handoff document for the next SA. Include any Tier 2 or Tier 3 items that have not been escalated yet. |
| 5 | Notify ISSO of open findings | Use approved internal communication channel. Do not leave open Tier 1 or Tier 2 findings without notification — even at end of shift. |
| 6 | Check media inventory | Confirm every piece of media is accounted for and logged back in. Nothing should be "checked out" overnight without ISSM authorization. |
| 7 | Close all admin sessions | Log out of SIEM, EDR console, backup console, any RDP sessions. Verify remote sessions are closed. |
| 8 | Lock admin workstation | Do not leave a logged-in workstation unattended even briefly. |
| 9 | If handing off to incoming SA | Brief them verbally on open items. Walk them through the shift summary. They must log in with their own credentials before you log out. Both of you sign the handoff log. |
| 10 | Sign SAPF access log | Print name, sign, record time out. |
| 11 | If last out of SAPF | Verify all systems in expected state. Secure the SAPF per local SOP. Log SAPF secured. |

---

## Appendix E — Escalation Contact Reference

> Fill in with local personnel. Keep this current — an out-of-date contact sheet is useless in an incident.

| Role | Name | Primary Contact (internal) | Alternate Contact | Availability |
|------|------|--------------------------|-------------------|-------------|
| ISSM | | | | |
| ISSO | | | | |
| SA Lead / Senior SA | | | | |
| Program Security Officer (PSO) | | | | |
| System Owner | | | | |
| Physical Security | | | | |
| Network Admin (if separate) | | | | |
| Backup / Recovery POC | | | | |

> **Note:** All contacts are internal to the SAPF or accessed via approved internal communication systems. No external contact methods are authorized for incident escalation from within the air-gapped environment.

---

*SA-BASELINE.md | Version 1.0 | April 2026*
*DoD SAP / JSIG Environment — Air-Gapped Operations*
*Classification: [CLASSIFICATION]*
*Authority: ISSM Authorization Required for All Tasks (MA-2)*
