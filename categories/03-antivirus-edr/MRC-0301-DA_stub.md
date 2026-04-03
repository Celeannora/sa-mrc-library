---
mrc_id: MRC-0301-DA
title: Daily AV Definition Currency and Agent Health Verification — Trellix ePolicy Orchestrator
category: 03 — Antivirus / EDR
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:30"
rin: DA-AV-001
revision: Rev 1.1
classification: "[CLASSIFICATION]"
tool: "Trellix ePolicy Orchestrator (ePO)"
tool_console_url: "https://[ePO-SERVER]:8443/core/orionSplashScreen.do"
jsig_controls: "AC-6(1) [NON-TAILORABLE], SI-3, CM-6"
non_tailorable: "NON-TAILORABLE: AC-6(1) — Endpoint protection SHALL NOT be absent from any SAP system"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no configuration changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "COMPLETE — MRC-0301-DA_Trellix_ePO.docx"
docx_generated: "2026-04-02"
---

## Background (New SA)
Trellix ePolicy Orchestrator (ePO) is the centralized management console for the Trellix endpoint protection suite — it deploys and manages the antivirus/EDR agent on every managed workstation, server, and domain controller. Every managed endpoint reports back to ePO with its current DAT (virus definition) version and agent communication status. In a SAP environment, the JSIG mandates that endpoint protection SHALL NOT be absent from any SAP system (AC-6(1) — non-tailorable). A stale DAT means the endpoint cannot detect malware discovered after that date. A non-communicating agent may indicate the endpoint is unmanaged, offline, or the agent has been tampered with. This daily check uses ePO's built-in query reports to identify any endpoints that have fallen behind — before a threat exploits that gap.

## Safety / Hazards
JSIG: Do not modify EDR policies, exclusions, or configuration without CCB-approved Change Request and ISSM authorization. Any offline or unprotected endpoint constitutes a NON-TAILORABLE control failure (AC-6(1)) — stop and notify ISSM immediately.

## Tools / Equipment / Access Required
- **Trellix ePolicy Orchestrator (ePO)** web console — `https://[ePO-SERVER]:8443/core/orionSplashScreen.do`
- Privileged SA account (cleared, SAP-authorized per MA-5) with ePO login credentials
- ISSM/ISSO contact info for immediate escalation
- Navigation path for DAT check: `Menu > Reporting > Queries & Reports > Endpoint Protection > Managed Endpoints DAT Status`
- Navigation path for Agent Health: `Menu > Reporting > Queries & Reports > Agent Status Summary`

## Reference Documents
- JSIG — AC-6(1) [Non-Tailorable], SI-3
- DoDM 5205.07 Vol. 1 — ISSM responsibilities
- DISA STIG — applicable AV/EDR product benchmark
- MA-3 Approved Tool List

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for any non-compliant endpoint.

## Prerequisites (JSIG MA-2)
System in normal operational state. ISSM written authorization on file for this MRC series.

## Procedure Steps (Trellix ePO — 12 Steps)

> Full step-by-step with nav paths, click targets, and field names is in the `.docx` version. This stub provides a reference summary.

| Step | Action | Nav Path / Click Target | Expected Result |
|------|--------|------------------------|----------------|
| 1 | Log in to ePO console | `https://[ePO-SERVER]:8443/core/orionSplashScreen.do` | Dashboard loads |
| 2 | Navigate to Queries & Reports | `Menu > Reporting > Queries & Reports` | Report catalog |
| 3 | Run DAT Status query | `Endpoint Protection > Managed Endpoints DAT Status` — click `Run` | DAT date report renders |
| 4 | Identify stale DAT hosts | Sort by `DAT Date` ascending; flag any > 24 hrs | List of non-compliant hosts |
| 5 | Navigate to Agent Status | `Menu > Reporting > Queries & Reports > Agent Status Summary` — click `Run` | Agent status report |
| 6 | Identify offline/non-communicating agents | Filter `Agent Status = Not Communicating`; note hostnames | List of offline agents |
| 7 | **JSIG NON-TAILORABLE CHECK** | Any offline endpoint = STOP, notify ISSM immediately (AC-6(1)) | Zero offline endpoints (or ISSM notified) |
| 8 | Log non-compliant hosts in MRC Non-Compliance Log | Hostname, Last DAT Date, Agent Status, Action Taken | Table populated |
| 9 | Send Wake-Up Call to stale-DAT online hosts | Select host > `Actions > Agent > Wake Up Agents` | Wake-up command issued |
| 10 | Check escalation threshold | If ≥10% of managed endpoints non-compliant → escalate to ISSM immediately | Escalation documented if triggered |
| 11 | Review Threat Event Log | `Menu > Reporting > Threat Event Log` — last 24 hours | No unactioned High/Critical threats |
| 12 | Sign MRC; file as BoE artifact | SA signature, ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

**Non-Compliance Status Codes:** `ONLINE-STALE` / `OFFLINE` / `UNMANAGED`  
**Action Codes:** `WAKE-UP SENT` / `TICKET OPENED` / `ISSO NOTIFIED` / `REMEDIATED`

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- NON-TAILORABLE AC-6(1): [ ] All endpoints protected  [ ] FAILURE — ISSM notified immediately
- Deficiencies: [ ] None  [ ] POA&M Required  [ ] Immediate Action Required
- Stale DAT Endpoints (> 24 hrs): ___    Wake-Up Calls Sent: [ ] Y  [ ] N/A
- Offline / Non-Communicating Agents: ___    ISSM Notified: [ ] Y  [ ] N/A   Time: _______________
- Escalation Threshold Triggered (≥ 10%): [ ] Yes — ISSM notified  [ ] No
- Unactioned High/Critical Threats in Event Log: [ ] None  [ ] Found — documented
- Artifact file (this MRC): _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
