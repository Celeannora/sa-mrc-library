---
mrc_id: MRC-0301-DA
title: Daily AV/EDR Definition Currency and Agent Health Verification
category: 03 — Antivirus / EDR
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:30"
rin: DA-AV-001
revision: Rev 1.1
classification: "[CLASSIFICATION]"
tool: "Endpoint protection management console ([SITE-DESIGNATED AV/EDR PLATFORM])"
tool_console_url: "[SITE-DESIGNATED AV/EDR CONSOLE URL]"
jsig_controls: "AC-6(1) [NON-TAILORABLE], SI-3, CM-6"
non_tailorable: "NON-TAILORABLE: AC-6(1) — Endpoint protection SHALL NOT be absent from any SAP system"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no configuration changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "COMPLETE — MRC-0301-DA_AV-EDR.docx"
docx_generated: "2026-04-02"
---

## Background (New SA)
The [SITE-DESIGNATED AV/EDR PLATFORM] is the centralized management console for the endpoint protection suite deployed at this site — it manages the antivirus/EDR agent on every managed workstation, server, and domain controller. Every managed endpoint reports back to the management console with its current definition version and agent communication status. In a SAP environment, the JSIG mandates that endpoint protection SHALL NOT be absent from any SAP system (AC-6(1) — non-tailorable). A stale definition means the endpoint cannot detect malware discovered after that date. A non-communicating agent may indicate the endpoint is unmanaged, offline, or the agent has been tampered with. This daily check uses the platform's built-in query or status reports to identify any endpoints that have fallen behind — before a threat exploits that gap.

## Safety / Hazards
JSIG: Do not modify AV/EDR policies, exclusions, or configuration without CCB-approved Change Request and ISSM authorization. Any offline or unprotected endpoint constitutes a NON-TAILORABLE control failure (AC-6(1)) — stop and notify ISSM immediately.

## Tools / Equipment / Access Required
- **[SITE-DESIGNATED AV/EDR PLATFORM]** management console — [SITE-SPECIFIC URL or access path]
- Privileged SA account (cleared, SAP-authorized per MA-5) with console login credentials
- ISSM/ISSO contact info for immediate escalation
- Definition status report: [SITE-SPECIFIC NAV — consult platform documentation for definition/DAT currency report]
- Agent health status report: [SITE-SPECIFIC NAV — consult platform documentation for agent communication status report]

## Reference Documents
- JSIG — AC-6(1) [Non-Tailorable], SI-3
- DoDM 5205.07 Vol. 1 — ISSM responsibilities
- DISA STIG — applicable AV/EDR product benchmark
- MA-3 Approved Tool List

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for any non-compliant endpoint.

## Prerequisites (JSIG MA-2)
System in normal operational state. ISSM written authorization on file for this MRC series.

## Procedure Steps (12 Steps)

> Full step-by-step with nav paths, click targets, and field names is in the `.docx` version. This stub provides a reference summary. Navigation paths must be tailored to the [SITE-DESIGNATED AV/EDR PLATFORM] at time of site deployment.

| Step | Action | Nav Path / Click Target | Expected Result |
|------|--------|------------------------|----------------|
| 1 | Log in to AV/EDR management console | [SITE-SPECIFIC URL or access path] | Dashboard loads |
| 2 | Navigate to definition status reports | [SITE-SPECIFIC NAV — reporting or queries section] | Report catalog or dashboard |
| 3 | Run definition currency status report | [SITE-SPECIFIC NAV — definition/DAT currency report] → run or refresh | Definition date report renders per managed endpoint |
| 4 | Identify stale definition hosts | Sort by definition date ascending; flag any endpoint with definitions > 24 hrs old | List of non-compliant hosts |
| 5 | Navigate to agent health status report | [SITE-SPECIFIC NAV — agent or endpoint communication status report] → run or refresh | Agent status report |
| 6 | Identify offline/non-communicating agents | Filter for non-communicating or offline agent status; note hostnames | List of offline agents |
| 7 | **JSIG NON-TAILORABLE CHECK** | Any offline endpoint = STOP, notify ISSM immediately (AC-6(1)) | Zero offline endpoints (or ISSM notified) |
| 8 | Log non-compliant hosts in MRC Non-Compliance Log | Hostname, Last Definition Date, Agent Status, Action Taken | Table populated |
| 9 | Send agent wake-up or policy enforcement to stale-definition online hosts | Select host(s) → [SITE-SPECIFIC ACTION: agent wake-up, push policy, or equivalent] | Wake-up / policy push command issued |
| 10 | Check escalation threshold | If ≥10% of managed endpoints non-compliant → escalate to ISSM immediately | Escalation documented if triggered |
| 11 | Review threat event log | [SITE-SPECIFIC NAV — threat events or detections log] → filter last 24 hours | No unactioned High/Critical threat detections |
| 12 | Sign MRC; file as BoE artifact | SA signature, ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

**Non-Compliance Status Codes:** `ONLINE-STALE` / `OFFLINE` / `UNMANAGED`  
**Action Codes:** `WAKE-UP SENT` / `TICKET OPENED` / `ISSO NOTIFIED` / `REMEDIATED`

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- NON-TAILORABLE AC-6(1): [ ] All endpoints protected  [ ] FAILURE — ISSM notified immediately
- Deficiencies: [ ] None  [ ] POA&M Required  [ ] Immediate Action Required
- Stale Definition Endpoints (> 24 hrs): ___    Wake-Up / Policy Push Sent: [ ] Y  [ ] N/A
- Offline / Non-Communicating Agents: ___    ISSM Notified: [ ] Y  [ ] N/A   Time: _______________
- Escalation Threshold Triggered (≥ 10%): [ ] Yes — ISSM notified  [ ] No
- Unactioned High/Critical Threats in Event Log: [ ] None  [ ] Found — documented
- Artifact file (this MRC): _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
