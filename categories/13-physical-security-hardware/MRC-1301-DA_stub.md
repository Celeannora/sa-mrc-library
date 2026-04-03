---
mrc_id: MRC-1301-DA
title: Daily Physical Access Log Review and Equipment Visual Inspection
category: 13 — Physical Security & Hardware
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:15"
rin: DA-PHY-001
revision: Rev 1.1
classification: "[CLASSIFICATION]"
tool: "Physical access log (paper or electronic — PACS), tamper-evident seals, UPS display panel, rack fault indicator lights"
jsig_controls: "PE-2, PE-3, PE-6, PE-8, MA-5, AU-9"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Inspection only; no hardware or physical access control changes"
sapf_entry_approval: "This card requires SAPF entry — log entry in SAPF access log before entering"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Physical security in a SAP environment is the first layer of defense — an adversary with physical access to a server can bypass every software control. This daily check confirms that: (1) every person who entered the server room or SAPF was authorized and logged, (2) hardware seals and tamper-evident indicators are intact (confirming no unauthorized physical access to equipment internals), and (3) equipment is operating without hardware fault conditions. The UPS (Uninterruptible Power Supply) check is included because a failed UPS discovered during a power event — rather than proactively — could cause an uncontrolled system shutdown. Physical anomalies (broken seals, unauthorized entry, missing equipment) must be reported to the FSO and ISSM immediately.

## Safety / Hazards
JSIG: Do not open or service any hardware (servers, UPS, storage) without an ISSM-authorized MA-5 maintenance request. If you discover a broken tamper seal, unauthorized entry in the log, or missing/moved equipment — do not touch or move anything; treat it as a potential security incident and notify FSO and ISSM immediately. This card is inspection only — no hardware changes.

## Tools / Equipment / Access Required
- Physical access log (paper binder at door, or Physical Access Control System (PACS) terminal)
- Authorized personnel roster (ISSM-maintained or FSO-maintained)
- Visual inspection — no tools required for this card
- UPS display panel (front of UPS unit or management card)
- ISSM/ISSO and FSO contact info for escalation

## Reference Documents
- JSIG — PE-2, PE-3, PE-6, PE-8, MA-5
- Site Physical Security Plan (ISSM/FSO-maintained)
- Authorized personnel roster (current version)
- Equipment baseline inventory (ISSM-maintained)
- UPS manufacturer documentation (for fault code interpretation)

## Manpower Requirements
1x SA (cleared, SAP-authorized per MA-5). FSO notification required for: unauthorized entries in access log, broken tamper seals, missing or moved equipment. ISSM notification required for: any physical security anomaly that could indicate tampering with IT systems.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- SAPF entry logged prior to beginning inspection
- Authorized personnel roster current (from ISSM/FSO)

---

## Procedure Steps

| Step | Action | Nav Path / Location | Expected Result |
|------|--------|---------------------|----------------|
| 1 | Log SAPF entry in physical access log before beginning | SAPF entry log (door log or PACS terminal) | Entry logged with name, time, purpose |
| 2 | Review physical access log — all entries from prior 24 hours | Physical access log book or PACS system — `Last 24 Hours` | All entries match authorized personnel roster; any unrecognized entry investigated and reported to FSO |
| 3 | Verify tamper-evident seals on all critical hardware (servers, storage arrays, network hardware) | Physical inspection of each rack — seals on server faceplates, drive bays, rear chassis | All seals intact and undisturbed; any broken, removed, or missing seal → STOP, notify FSO and ISSM immediately |
| 4 | Inspect rack hardware indicator lights for fault conditions | Front panel LEDs — AMBER/RED = fault; BLUE (if present) = service indicator | All lights GREEN / normal; any fault LEDs investigated (consult IPMI/iDRAC or iLO for details) |
| 5 | Inspect UPS display — verify battery health, load %, runtime, and alarm status | Front panel LCD or management card display | Battery health OK; runtime ≥ site-required minimum; no audible alarm active |
| 6 | Verify no unauthorized hardware (USB drives, rogue devices, laptops) left on or near equipment | Visual sweep of server room floor, rack tops, and cable management areas | No unauthorized devices present; any foreign device reported to ISSM immediately |
| 7 | Verify equipment inventory integrity — confirm all hardware is present and in expected location | Compare to equipment baseline inventory list | No missing, moved, or added equipment; any discrepancy reported to ISSM |
| 8 | Log SAPF exit in physical access log | SAPF exit log or PACS terminal | Exit logged with name and time |
| 9 | Document any anomalies in Non-Compliance log below | — | Anomalies recorded with description and action taken |
| 10 | Sign and date MRC; file as PE-6 / PE-8 BoE artifact | SA signature; FSO/ISSM co-sign if anomaly found | MRC retained per AU-11 |

---

## Non-Compliance / Findings Log

| # | Finding Description | Location / Hardware | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|--------------------|-----------------|-------------|-------------|--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Access Log — All Entries Authorized: [ ] Yes  [ ] No — FSO and ISSM notified
- Tamper Seals Intact: [ ] Yes  [ ] No — STOP; FSO and ISSM notified immediately
- Hardware Fault Indicators: [ ] None  [ ] Fault(s) found — documented and investigated
- UPS Status: [ ] Healthy  [ ] Fault / Low Battery / Alarm — investigated
- Foreign Devices Found: [ ] None  [ ] Found — ISSM notified
- Equipment Inventory Intact: [ ] Yes  [ ] Missing/moved equipment — ISSM notified
- FSO Notified: [ ] Y  [ ] N/A   Time: _______________
- ISSM Notified: [ ] Y  [ ] N/A   Time: _______________
- Artifact file (this MRC): _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| FSO / ISSM (if anomaly) | | | |
