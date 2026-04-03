---
mrc_id: MRC-1401-QR
title: Quarterly Incident Response Plan and Escalation Path Review
category: 14 — Incident Response Readiness
periodicity: QUARTERLY
maintenance_type: PREVENTIVE / INSPECT / ADMIN
est_time: "01:00"
rin: QR-IR-001
revision: Rev 1.1
classification: "[CLASSIFICATION]"
tool: "Current IR Plan document (ISSM-maintained), escalation contact roster, incident ticketing system ([SITE-DESIGNATED TOOL]), ISSM/ISSO contact"
jsig_controls: "IR-3, IR-3(2), IR-4, IR-4(1), IR-8, CP-4, AU-9"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Administrative review; IR Plan updates submitted to ISSM for approval"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
The Incident Response (IR) Plan defines exactly what to do when a security incident is detected — who to call, in what order, what to preserve, and what to report. In a SAP environment, the wrong response to an incident (or a delayed response) can escalate a containable event into a major breach with ATO consequences. The JSIG requires that the IR Plan be reviewed and kept current at least quarterly. Key things that go stale quickly: personnel contact information, escalation chains (people change roles), ticketing systems (URLs change), and lessons learned from recent incidents. This card performs that quarterly currency check — not a tabletop exercise (that's separate), but a structured verification that the plan is accurate, all contacts are reachable, and the SA team knows the procedures.

## Safety / Hazards
N/A — Administrative review. If a real incident is discovered during this review, activate the IR Plan immediately rather than completing this card first.

## Tools / Equipment / Access Required
- Current IR Plan (version and date must be current — reviewed within last quarter)
- Escalation contact roster (ISSM, ISSO, FSO, AO, legal, IT management)
- Incident ticketing system (URL and access)
- ISSM/ISSO for coordination on plan currency and update submission

## Reference Documents
- JSIG — IR-3, IR-3(2), IR-4, IR-8
- NIST SP 800-61 Rev 2 — Computer Security Incident Handling Guide
- DoDI 8530.02 — Cybersecurity Activities Support to DoD Information Network Operations
- Site SSP — Incident Response section
- Current IR Plan (version on file)

## Manpower Requirements
1x SA with ISSO participation recommended. ISSM review required for: any IR Plan updates identified during this review.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to current IR Plan document
- Escalation contact roster available
- Incident ticketing system accessible

---

## Procedure Steps

| Step | Action | Location / Tool | Expected Result |
|------|--------|----------------|----------------|
| 1 | Retrieve current IR Plan — verify version number and review date | IR Plan document (shared drive, secure repository, or printed copy) | Document version confirmed; review date within last quarter; if older, flag for update |
| 2 | Verify ISSM contact information — name, phone, alternate phone, email | Escalation contact roster in IR Plan | ISSM contact current; test phone number if able (non-emergency hours) |
| 3 | Verify ISSO contact information | Escalation contact roster | ISSO contact current |
| 4 | Verify FSO and AO contact information | Escalation contact roster | FSO and AO contacts current |
| 5 | Verify external escalation contacts (CERT, higher HQ, legal — if applicable) | IR Plan escalation section | All external contacts current; any outdated contacts flagged for ISSM update |
| 6 | Confirm notification procedures are understood by current SA team | Walk through Step 1 of the IR Plan mentally — who is called first, what information is gathered | SA can recite: (1) isolate the system, (2) notify ISSO, (3) preserve logs, (4) do not attempt unilateral remediation |
| 7 | Review any security incidents from the previous quarter | Prior quarter IR tickets / MRC records | Incidents reviewed; lessons learned documented and incorporated (or flagged for IR Plan update) |
| 8 | Verify incident ticketing system is operational | Open ticketing system at [URL]; confirm login works | System accessible; create test draft ticket (do not submit) to confirm system is functional |
| 9 | Review log preservation procedures in IR Plan — confirm SA knows how to preserve event logs without overwriting | IR Plan — Evidence Preservation section | Procedures understood; PowerShell log export command reviewed: `wevtutil epl Security C:\IR_Evidence\Security_[DATE].evtx` |
| 10 | Note any updates required to the IR Plan | — | Update requests documented below |
| 11 | Submit IR Plan update requests to ISSM | Email / secure channel to ISSM | Updates submitted; ISSM acknowledged |
| 12 | Sign and date MRC; file as IR-3 / IR-8 BoE artifact | SA signature; ISSM/ISSO co-sign | MRC retained per AU-11 |

---

## IR Plan Currency Check

| Item | Current? | Notes |
|------|----------|-------|
| IR Plan version / review date | ☐ Current ☐ Stale | Version: ___ Date: ___ |
| ISSM contact info | ☐ Current ☐ Update needed | |
| ISSO contact info | ☐ Current ☐ Update needed | |
| FSO contact info | ☐ Current ☐ Update needed | |
| AO contact info | ☐ Current ☐ Update needed | |
| Ticketing system accessible | ☐ Yes ☐ No | |
| Lessons learned from last quarter incorporated | ☐ Yes ☐ N/A (no incidents) | |

---

## IR Plan Update Requests

| # | Section | Update Needed | Submitted to ISSM |
|---|---------|--------------|------------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- IR Plan Current (reviewed within last quarter): [ ] Yes  [ ] No — update submitted to ISSM
- All Escalation Contacts Current: [ ] Yes  [ ] No — ___ contacts need update
- SA Team Familiar with Notification Procedures: [ ] Yes  [ ] Refresher needed
- Ticketing System Operational: [ ] Yes  [ ] No — investigated
- IR Plan Update Requests Submitted: [ ] Yes — ___ items  [ ] N/A (no updates needed)
- ISSM Notified of Updates: [ ] Y  [ ] N/A   Time: _______________
- Artifact file (this MRC): _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSO (Participating) | | | |
| ISSM (Review / Updates) | | | |
