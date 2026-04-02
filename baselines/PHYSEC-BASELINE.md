# Physical Security — Operational Baseline
### Air-Gapped SAP Environment | Daily Operations Reference
#### DoD SAP / JSIG Environment

> **Purpose:** Minimum daily operating expectations for Physical Security personnel responsible for the Special Access Program Facility (SAPF). This document scopes Physical Security to access control, facility inspections, visitor management, and alarm response. Physical Security does not have IT system access and does not perform SA or ISSO functions.
>
> **Scope of this role:**
> - SAPF access control and access log management
> - Physical inspection of the facility and equipment areas
> - Visitor and escort management
> - Alarm monitoring and response
> - Tamper-evident seal program management
> - Physical media vault accountability (custody only — not technical sanitization)
>
> **Related documents:**
> | Document | Purpose |
> |----------|---------|
> | `SA-BASELINE.md` | System Administrator daily operations |
> | `ISSO-BASELINE.md` | ISSO daily operations |
> | `BASELINES-INDEX.md` | Role boundary definitions and escalation matrix |

---

## Table of Contents

1. [Role Definition and Boundaries](#1-role-definition-and-boundaries)
2. [Shift Start Procedures](#2-shift-start-procedures)
3. [Core Daily Checklist](#3-core-daily-checklist)
4. [Visitor and Escort Management](#4-visitor-and-escort-management)
5. [Tamper-Evident Seal Program](#5-tamper-evident-seal-program)
6. [Alarm Response](#6-alarm-response)
7. [Shift End Procedures](#7-shift-end-procedures)
8. [Incident Triggers](#8-incident-triggers)
9. [Appendix A — Step-by-Step: Facility Inspection](#appendix-a--step-by-step-facility-inspection)
10. [Appendix B — Step-by-Step: Visitor Processing](#appendix-b--step-by-step-visitor-processing)
11. [Appendix C — Step-by-Step: Tamper Seal Check and Replacement](#appendix-c--step-by-step-tamper-seal-check-and-replacement)
12. [Appendix D — Step-by-Step: After-Hours Alarm Response](#appendix-d--step-by-step-after-hours-alarm-response)

---

## 1. Role Definition and Boundaries

### What Physical Security owns

Physical Security is responsible for the **physical integrity of the SAPF and the people who enter it.** This role controls who gets in, ensures the facility is secure, and responds to physical security events.

| Physical Security Owns | Physical Security Does NOT Own |
|------------------------|-------------------------------|
| SAPF access log — recording and reviewing | IT system configuration — that is the SA |
| Physical access authorization verification | User account management — that is the ISSO |
| Visitor control and escort coordination | AV/EDR monitoring — that is the SA |
| Facility and equipment area inspection | Security policy decisions — that is the ISSM |
| Tamper-evident seal inspection (visual) | Seal replacement on IT equipment — coordinates with SA |
| Physical media vault — custody and log | Media sanitization — that is the SA |
| Alarm system monitoring and response | Incident response command — that is the ISSM |
| Lock, key, and combination management | Software or data decisions — not in scope |
| Environmental monitoring (temp/humidity/power) | Access authorization decisions — that is the ISSM |

### What Physical Security must NEVER do

- Access any IT system console, keyboard, or terminal without ISSM authorization
- Remove or handle IT equipment without SA and ISSM direction
- Allow any visitor into a restricted area without a verified escort and authorization
- Grant access to any individual whose access is not on the current authorized access list
- Remove media from the vault without the required dual-custody log entry
- Respond to a potential security breach without notifying the ISSM

### Escalation chain for Physical Security

```
Physical Security  →  ISSM (security decisions)
Physical Security  →  ISSO (routine security observations)
Physical Security  →  SA (equipment-related observations — no touch)
```

For any physical security incident, **notify ISSM directly.** Do not route through ISSO for incidents.

---

## 2. Shift Start Procedures

### Facility Entry

- [ ] Sign SAPF access log — date, time in, printed name, signature
- [ ] Verify your access authorization is current
- [ ] Check for any posted ISSM advisories or security notices at the entry point

### Initial Facility Inspection (upon shift start)

- [ ] Verify SAPF entry point is secure — door seal tight, no visible tampering
- [ ] Inspect all SAPF access control points — locks, hinges, frames, seals intact
- [ ] Check all interior restricted areas are secured
- [ ] Inspect server room / equipment areas visually — no signs of unauthorized entry or disturbance
- [ ] Verify all tamper-evident seals visible from the entry inspection are intact
- [ ] Check environmental indicators if monitored — temperature, humidity, power
- [ ] Review physical access log from overnight — verify all entries are authorized

### Equipment Check (coordinate with SA — do not touch IT equipment)

- [ ] Visually confirm no unauthorized cables, devices, or equipment in the equipment areas
- [ ] Report any anomalies observed to SA for technical assessment — do not handle

### Alarm System

- [ ] Verify alarm panel shows no active faults
- [ ] Confirm all zones are armed or disarmed per current occupancy status
- [ ] Review alarm event log from overnight — any activations, bypasses, or faults?

---

## 3. Core Daily Checklist

### Access Control

| # | Task | Time | ✓ |
|---|------|------|---|
| P-01 | Review SAPF access log — verify all overnight and morning entries are authorized personnel | | ☐ |
| P-02 | Cross-reference access log against current authorized access list — any unrecognized names | | ☐ |
| P-03 | Verify access control system is operational — all card readers, keypads, or locks functioning | | ☐ |
| P-04 | Confirm all combination-secured areas have had combinations changed on schedule | | ☐ |

### Facility Inspection

| # | Task | Time | ✓ |
|---|------|------|---|
| P-05 | Inspect SAPF perimeter — walls, ceiling, floor (where accessible), windows, vents | | ☐ |
| P-06 | Inspect all entry and exit points — no unauthorized openings, no propped doors | | ☐ |
| P-07 | Inspect equipment areas — no visible signs of tampering, unauthorized devices, or disturbance | | ☐ |
| P-08 | Visually check tamper-evident seals on all visible IT equipment — intact and undisturbed | | ☐ |
| P-09 | Verify UPS and power systems indicators are normal — no alarms | | ☐ |
| P-10 | Check environmental monitors — temperature and humidity within acceptable range | | ☐ |

### Media Vault

| # | Task | Time | ✓ |
|---|------|------|---|
| P-11 | Verify media vault is locked and secured | | ☐ |
| P-12 | Review media vault log — all checkouts from prior shift have been returned or have active authorization | | ☐ |
| P-13 | Confirm no media is checked out beyond authorized duration without ISSM extension | | ☐ |

### Alarm System

| # | Task | Time | ✓ |
|---|------|------|---|
| P-14 | Verify alarm panel — no active faults, all zones nominal | | ☐ |
| P-15 | Review alarm event log — document any activations since last shift | | ☐ |

---

## 4. Visitor and Escort Management

### Authorization Requirements

No visitor enters any SAPF space without:
1. **Prior ISSM written authorization** — not verbal, not assumed
2. **A cleared, authorized escort** — escort must remain with visitor at all times
3. **An entry in the visitor log** — before the visitor crosses the threshold

### Visitor Categories

| Category | Clearance Required | Escort Required | Special Requirements |
|----------|-------------------|----------------|---------------------|
| Cleared program personnel (on access list) | Program-appropriate clearance | No — authorized unescorted entry | Must be on current access list |
| Cleared visitor (not on access list) | Verified clearance | Yes — continuous escort | ISSM authorization in advance |
| Cleared maintenance / contractor | Verified clearance | Yes — continuous escort | ISSM authorization + SA coordination for IT work |
| Uncleared visitor | N/A | Yes — never in restricted areas | Limited to non-restricted areas only; ISSM defines permissible scope |
| Inspectors / auditors | As applicable | ISSM directs escort arrangement | Notify ISSM immediately upon arrival — ISSM manages |

### Daily visitor management checklist

- [ ] Review visitor log from prior shift — all visitors checked out
- [ ] Confirm all scheduled visitors for today have ISSM authorization on file before arrival
- [ ] Brief all escorts on their responsibilities before admitting any visitor
- [ ] Verify visitor identity at entry — government-issued ID or CAC
- [ ] Log all visitors: name, organization, purpose, clearance verification method, escort name, time in
- [ ] Confirm all visitors are checked out at end of visit — time out, escort signature

---

## 5. Tamper-Evident Seal Program

### Purpose

Tamper-evident seals provide visible evidence that IT equipment has not been physically accessed since the seal was applied. A broken or missing seal is a potential security incident — it may indicate unauthorized physical access to hardware.

### Physical Security's role in the seal program

Physical Security performs **visual inspection only.** Any seal replacement, removal, or application on IT equipment is coordinated with the SA — Physical Security does not touch IT equipment.

### Seal inspection procedure (daily)

- [ ] Walk the equipment areas with the current seal inventory log
- [ ] For each item on the log: visually verify the seal is present, intact, and shows no signs of tampering (tears, cuts, breaks, adhesive lifting, discoloration)
- [ ] Record inspection result for each item: date, time, inspector, result (INTACT / TAMPERED / MISSING)
- [ ] Any tampered or missing seal = **do not touch equipment** — notify ISSM and SA immediately

### Seal inventory log fields

Every seal in the program must have a log entry:

| Field | Detail |
|-------|--------|
| Seal ID / Serial | Unique identifier on the seal |
| Equipment | Host/asset tag it is applied to |
| Location | Specific location on the equipment (rear panel, access door, etc.) |
| Applied by | SA name |
| Applied date | Date and time seal was applied |
| Last inspected | Date, time, and inspector name |
| Status | INTACT / TAMPERED / MISSING / REPLACED |

### Seal replacement workflow

1. Broken or missing seal discovered during inspection
2. Physical Security documents finding — do not touch equipment
3. Notify ISSM immediately — this is a potential security incident
4. ISSM directs SA to assess and replace seal
5. SA replaces seal — witnesses the replacement
6. SA and Physical Security both sign the updated seal log entry
7. New seal ID logged; old seal ID marked REPLACED with disposition

---

## 6. Alarm Response

### Alarm types and initial responses

| Alarm Type | Initial Response | Notify |
|-----------|-----------------|--------|
| Door forced / unauthorized entry | Do not enter. Contact appropriate security authority. | ISSM immediately |
| Motion detected (after hours, no authorized entry) | Do not enter alone. Stage at entry. | ISSM immediately |
| Environmental alarm (temp/humidity/power) | Assess from outside restricted area. Do not enter unless authorized. | ISSM + SA |
| Duress / panic alarm | Do not enter. Contact law enforcement per local SOP. | ISSM + chain of command |
| False alarm (confirmed, alarm system fault) | Document. Reset per authorized procedure. | ISSO; ISSM if recurring |
| Power failure | Document. Verify UPS indicators if accessible. | ISSM + SA |

### After-hours alarm response (see Appendix D for full procedure)

Physical Security does not enter a potentially compromised area alone or without authorization. The priority is notification — **call ISSM first.** ISSM directs whether to hold position, enter with escort, or contact law enforcement.

---

## 7. Shift End Procedures

- [ ] Complete all physical inspection log entries for today — all fields, no blanks
- [ ] Sign all log entries — printed name, signature, date, time
- [ ] File completed inspection logs per local SOP
- [ ] Verify SAPF access log is complete — all entries for the shift recorded
- [ ] Confirm all visitors from today are checked out — no visitors still logged as "in"
- [ ] Verify media vault is locked and secure
- [ ] Verify all tamper-evident seal inspection results logged for today
- [ ] Brief incoming Physical Security on open items, anomalies, or pending authorizations
- [ ] Notify ISSM or ISSO of any anomalies found during the shift
- [ ] Arm alarm system per local SOP if last personnel out
- [ ] Sign SAPF access log — time out

---

## 8. Incident Triggers

### Tier 1 — Notify ISSM Immediately / Do Not Enter

| # | Trigger | Action |
|---|---------|--------|
| P-T1-01 | Tamper-evident seal broken, cut, or missing on any IT equipment | Do not touch equipment. Document. Notify ISSM and SA immediately. |
| P-T1-02 | Unauthorized entry detected — door forced, alarm activation, signs of forced entry | Do not enter. Notify ISSM and appropriate security authority immediately. |
| P-T1-03 | Unknown individual found inside SAPF or restricted area without authorized escort | Do not approach alone. Notify ISSM and security authority. |
| P-T1-04 | Unknown device, cable, or equipment found connected to or placed near IT systems | Do not touch. Document location and description. Notify ISSM and SA immediately. |
| P-T1-05 | Media discovered outside the vault without a checkout log entry | Do not handle. Document location. Notify ISSM immediately. |
| P-T1-06 | Environmental emergency (fire, flood, power event) that threatens classified material | Activate emergency procedures per local SOP. Notify ISSM. |
| P-T1-07 | Personnel observed attempting to remove equipment or media without authorization | Do not physically intervene alone. Notify ISSM and security authority immediately. |

### Tier 2 — Notify ISSO Within 4 Hours

| # | Trigger | Action |
|---|---------|--------|
| P-T2-01 | After-hours access log entry with no prior authorization on record | Document. Notify ISSO. ISSO escalates to ISSM if warranted. |
| P-T2-02 | Visitor log entry with no pre-authorization found after the fact | Document. Notify ISSO with full visitor details. |
| P-T2-03 | Access control system fault (card reader, keypad, lock malfunction) | Document. Notify ISSO and SA for remediation coordination. |
| P-T2-04 | Media checked out and not returned within authorized period | Document. Notify ISSO. |
| P-T2-05 | Environmental indicator outside acceptable range (temp/humidity) | Document. Notify ISSO and SA. |

### Tier 3 — Document and Report at Shift End

| # | Trigger | Action |
|---|---------|--------|
| P-T3-01 | Minor alarm system fault — non-intrusion related | Document. Report in shift log. |
| P-T3-02 | Visitor log administrative error (incomplete entry, corrected same shift) | Document correction. Report in shift log. |
| P-T3-03 | Combination change due date approaching (within 30 days) | Log in shift summary. Notify ISSO to coordinate with ISSM. |

---

## Appendix A — Step-by-Step: Facility Inspection

**Estimated time: 20–30 minutes | Performed at shift start and end**

| Step | Action | Detail |
|------|--------|--------|
| 1 | Begin at the SAPF primary entry point | Inspect door frame, hinges, lock, and seal. No gaps, no damage. |
| 2 | Inspect all secondary entry/exit points | Same checks as primary. Confirm all non-primary access points are secured. |
| 3 | Walk the SAPF perimeter (interior) | Wall panels, ceiling tiles, floor — any signs of penetration, new openings, or tampering. |
| 4 | Inspect windows and vents | Intact, no unauthorized openings, window locks engaged if applicable. |
| 5 | Enter equipment areas | Visual sweep — no signs of disturbance, no unfamiliar equipment, no open panels on racks. |
| 6 | Check each rack / equipment bay | Note any amber or red indicator lights visible — do not touch; note and report to SA. |
| 7 | Verify tamper seals | Walk the seal inspection log. For each item: visual check — intact, no signs of tampering. Record result. |
| 8 | Check UPS indicators | Visible power and battery status LEDs. Any alarm condition = notify SA. |
| 9 | Check environmental monitors | Temperature and humidity within normal range. Out-of-range = notify ISSO and SA. |
| 10 | Complete inspection log | Record: date, time, inspector name, each area inspected, and overall result (CLEAR / ANOMALY). |
| 11 | Any anomaly found | Document exactly what was observed (location, description, time). Notify ISSM or ISSO per incident tier. |

---

## Appendix B — Step-by-Step: Visitor Processing

**Applies to all visitors — no exceptions**

| Step | Action | Detail |
|------|--------|--------|
| 1 | Before visitor arrives: verify ISSM authorization on file | If no authorization exists, visitor does not enter. Contact ISSM to resolve — do not make exceptions. |
| 2 | Confirm escort is identified and available | Escort must be a cleared, authorized SAPF member. Brief escort on their responsibilities: maintain line-of-sight at all times, visitor does not access any system or equipment. |
| 3 | Visitor arrives at entry point | Do not admit until identity is verified. |
| 4 | Verify visitor identity | Government-issued photo ID or CAC. Compare to pre-authorization documentation. |
| 5 | Complete visitor log entry BEFORE entry | Name, organization, purpose, clearance verification method, escort name, time in. |
| 6 | Admit visitor with escort | Escort leads. Visitor remains with escort at all times. |
| 7 | Visitor in SAPF | If visitor requests access to any IT system or equipment, escort denies and notifies ISSM. Physical Security ensures visitor does not separate from escort. |
| 8 | Visitor departs | Escort brings visitor to exit. Physical Security records time out and escort signature in visitor log. |
| 9 | Verify visitor carried no SAPF materials out | Any materials leaving must have ISSM written authorization. No exceptions. |
| 10 | File completed visitor log entry | Log is retained per AU-11 and local records retention policy. |

---

## Appendix C — Step-by-Step: Tamper Seal Check and Replacement

### Daily Inspection

| Step | Action | Detail |
|------|--------|--------|
| 1 | Obtain seal inspection log | Current version — all in-scope equipment listed. |
| 2 | Walk each item in the log | For each: locate the seal, examine closely. |
| 3 | Assess each seal | INTACT: seal is present, no tears, cuts, or lifting, serial number legible. TAMPERED: any physical change to the seal. MISSING: seal not present. |
| 4 | Record result per item | Date, time, inspector name, result. |
| 5 | All intact | No further action. File log. |
| 6 | Any TAMPERED or MISSING seal | Do not touch equipment. Document immediately. Notify ISSM and SA. |

### Replacement Workflow (ISSM-directed only)

| Step | Action | Detail |
|------|--------|--------|
| 1 | ISSM directs seal replacement | After assessment — Physical Security does not initiate replacement independently. |
| 2 | SA performs technical inspection of the equipment | SA determines whether tampering has occurred before sealing. |
| 3 | SA applies new seal | Physical Security witnesses. |
| 4 | Both SA and Physical Security sign the seal log | Old seal ID: marked REPLACED. New seal ID, date, time, applied-by, witnessed-by recorded. |
| 5 | File updated seal log | Incident documentation attached if applicable. |

---

## Appendix D — Step-by-Step: After-Hours Alarm Response

**Estimated response time: immediate**

> ⚠️ Physical Security does not enter a potentially compromised area alone. The priority is notification, not entry.

| Step | Action | Detail |
|------|--------|--------|
| 1 | Alarm activates or anomaly is observed | Do not enter. Stage at a safe position outside the area. |
| 2 | Identify alarm type | Entry alarm, motion, environmental, duress, or system fault. Determine from alarm panel. |
| 3 | Notify ISSM immediately | Describe: alarm type, time, zone/location, any visual observation. ISSM directs next steps. |
| 4 | Do not enter until directed | ISSM authorizes entry, calls law enforcement, or directs hold — Physical Security follows ISSM direction. |
| 5 | If law enforcement required | Contact per local SOP. Do not allow law enforcement into classified areas without ISSM authorization and escort. |
| 6 | Document everything | Time of alarm, time of notification, who was contacted, what was observed, ISSM direction received, actions taken. |
| 7 | ISSM-directed entry (if authorized) | Enter with at least one other authorized person. Do not touch any equipment. |
| 8 | Post-event report | Complete incident report for ISSM. Include full timeline, observations, and actions. |

---

## Physical Security Reference Tables

### SAPF Access Points Inventory

| Location | Type | Lock Type | Seal? | Alarm Zone | Notes |
|----------|------|-----------|-------|-----------|-------|
| | | | | | |
| | | | | | |

### Combination Change Schedule

| Lock / Combination | Location | Last Changed | Due Date | Custodian | Notes |
|--------------------|----------|-------------|---------|-----------|-------|
| | | | | | |

### Media Vault Contents Summary

| Shelf / Location | Media Count | Last Inventoried | Custodian | Notes |
|-----------------|------------|-----------------|-----------|-------|
| | | | | |

---

*PHYSEC-BASELINE.md | Version 1.0 | April 2026*
*DoD SAP / JSIG Environment — Physical Security Role*
*Classification: [CLASSIFICATION]*
*Physical Security operates under ISSM authority — all security decisions escalate to ISSM*
