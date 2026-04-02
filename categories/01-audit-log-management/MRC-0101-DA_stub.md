---
mrc_id: MRC-0101-DA
title: Daily Security Event and Audit Log Review
category: 01 — Audit & Log Management
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:30"
rin: DA-LOG-001
revision: Rev 1.0
classification: "[CLASSIFICATION — e.g., SECRET//SAP-[PROGRAM NAME]//NOFORN]"
jsig_controls: "AU-2, AU-3, AU-6, AU-9, AU-11, SI-4"
non_tailorable: "N/A"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review, no configuration changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
---

## Safety / Hazards
JSIG CAUTION: Do not modify, delete, suppress, or export log entries without explicit ISSM authorization. Audit record protection is a JSIG-required control (AU-9). Unauthorized alteration of audit records constitutes a security incident and must be reported to ISSM immediately.

## Tools / Equipment / Access Required
- SIEM console (read role minimum — AU-9 requires least privilege on log access)
- Privileged SA account (in-person, authenticated)
- Incident ticketing system access
- Signed MRC completion log
- ISSM/ISSO contact information (for immediate escalation)

## Reference Documents
- JSIG / NIST SP 800-53 Rev. 5 — AU-2, AU-3, AU-6, AU-9, AU-11, SI-4
- DoDM 5205.07 Vol. 1 — ISSO responsibilities (audit record review)
- DoDI 8500.01 — Cybersecurity
- System Security Plan (SSP) — AU control implementations
- [Local SOP Reference]

## Manpower Requirements
1x SA (must hold required SAP access and clearance level per MA-5). ISSO co-review recommended. ISSM notification required if any anomalies are identified.

## Prerequisites (JSIG MA-2)
- System is in normal operational state within the SAPF.
- Previous review timestamp is available for time-range continuity.
- Audit log service confirmed active from prior cycle (or verify first).
- ISSM written authorization on file for this MRC series.

## Procedure Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Verify current date/time (confirm NTP sync per AU-8). Record start time on MRC. | Start time logged. |
| 2 | Log in to SIEM console using authorized privileged account. Record account used. | Authenticated — account logged. |
| 3 | Set time range to previous 24-hour period (or since last review for continuity). Confirm no gap in log ingestion. | Correct window; no ingestion gap. |
| 4 | Review FAILED AUTHENTICATION events (AC-7 threshold). Escalation threshold: >[X] failures from a single source within 1 hour. Record count. | Volume within baseline. Escalate if threshold exceeded. |
| 5 | Review PRIVILEGE ESCALATION events (sudo, runas, UAC). Correlate to authorized change requests. Record any unexplained events. | All events authorized. |
| 6 | Review ACCOUNT MANAGEMENT events (create, modify, delete, lock — AC-2). Verify all changes match approved provisioning tickets. | All changes authorized. |
| 7 | Review IDS/IPS alert queue. Acknowledge known-good (false positive) alerts per standing rules. Escalate High/Critical to ISSO immediately (IR-6). | Queue reviewed and actioned. |
| 8 | Confirm AUDIT LOG SERVICE is running and forwarding to SIEM. Verify last log receipt within 15 minutes (AU-5 — response to audit processing failures). | Service active; last receipt <15 min. |
| 9 | Verify audit log storage capacity is within acceptable limits (AU-4). Flag if approaching threshold. | Storage within acceptable bounds. |
| 10 | If anomalies found: open incident ticket, document ticket # in Findings Summary, notify ISSO. ISSO notifies ISSM. ISSM reports to AO/DAO as applicable. | Incident ticket created if applicable. |
| 11 | Sign and date MRC. Submit to ISSM/ISSO per filing procedure. Retain as MA-2 / AU-6 BoE artifact. | MRC signed, filed, and retained. |

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Deficiencies: [ ] None  [ ] POA&M Required  [ ] Immediate Action Required (ISSM Notified)
- Incident Ticket #: _______________   ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Non-Tailorable Control Compliance: N/A for this MRC
