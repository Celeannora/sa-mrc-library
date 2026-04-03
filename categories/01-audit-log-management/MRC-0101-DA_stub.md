---
mrc_id: MRC-0101-DA
title: "Daily SIEM Agent Health and Log Forwarding Verification"
category: "01 — Audit & Log Management"
periodicity: Daily
est_time: "30–45 minutes"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "SIEM console ([SITE-DESIGNATED SIEM PLATFORM]), log management CLI or agent, network connectivity test utility"
jsig_controls:
  - AU-2
  - AU-6
  - AU-9
  - SI-4
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-0101-DA — Daily SIEM Agent Health and Log Forwarding Verification

---

## 1. Background (New SA)

**What the SIEM does in this environment:**
The [SITE-DESIGNATED SIEM PLATFORM] is the Security Information and Event Management platform for this SAP environment. Every managed endpoint runs a SIEM forwarding agent — a lightweight agent that collects operating system event logs, application logs, security logs, and system logs and forwards them to the central SIEM server. The ISSO and SA review the SIEM dashboard to detect security events, policy violations, and anomalies.

**Why daily verification matters:**
If a forwarding agent stops sending data — due to a service crash, network issue, or intentional tampering — the gap in log coverage is a potential AU-9 violation and creates a blind spot for security monitoring. In an air-gapped environment with no external SOC, the SIEM is the only centralized visibility tool. A silent agent is a security risk.

**What this MRC verifies:**
1. The SIEM forwarding agent service is running on all managed endpoints
2. Each agent is successfully communicating with the SIEM server on the configured port (site-specific)
3. The SIEM server is receiving events from all expected sources (no missing hosts in last 24h)
4. SIEM storage and license usage are within operational thresholds

**Script reference:**
A helper script (`scripts/check-siem-agent-health.[SITE-SCRIPT-EXT]`) may be available in the library to automate agent health checks. If deployed at this site, run the script and review output before proceeding to manual verification steps.

---

## 2. Safety / Hazards

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** This MRC must be executed within an ISSM-authorized maintenance window (MA-2).

> ⚠️ **DO NOT RESTART SIEM AGENT WITHOUT AUTHORIZATION:** If the SIEM forwarding agent service is stopped, do not restart it without first documenting the finding and confirming the restart is within your current ISSM authorization. A stopped agent may be evidence of a tampering event — restart could overwrite volatile indicators.

> ⚠️ **AU-9 COMPLIANCE:** If any host is found not forwarding logs to the SIEM for more than [ISSM-defined threshold], notify the ISSM immediately. Gaps in audit log coverage are a potential compliance finding.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| SIEM Console (admin) | Access to [SITE-DESIGNATED SIEM PLATFORM] — event search, agent monitoring, infrastructure view |
| Administrative account (appropriate privilege level) | Remote service status checks via [SITE-DESIGNATED MANAGEMENT TOOL] |
| Agent management CLI or console | Service status and connectivity verification |
| `check-siem-agent-health.[EXT]` | Library script — `scripts/` directory — if deployed at this site |
| Managed host inventory | Full list of all hosts expected to forward logs |
| MRC Sign-Off Block | Signed by SA and ISSM/ISSO after completion |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| JSIG AU-2, AU-6, AU-9 Implementation Guidance | ISSM SharePoint / SAP Cybersecurity Binder |
| [SITE-DESIGNATED SIEM PLATFORM] Administration and Agent Guide | Vendor documentation — obtain via ISSM-approved source |
| [SITE-DESIGNATED SIEM PLATFORM] Monitoring and Infrastructure View Docs | Vendor documentation — obtain via ISSM-approved source |
| Managed Host Inventory | SA Document Repository / CMDB |
| MRC-0102-WK | Weekly SIEM Index Health and Retention Audit (cross-reference) |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 30–45 minutes |

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file for this maintenance cycle
- [ ] SIEM console admin credentials available
- [ ] Managed host inventory current
- [ ] Agent health check script available and tested (if deployed at this site)
- [ ] Management access available to all managed hosts (remote or local)

---

## 7. Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 1 | Run the SIEM agent health check script (if deployed) | Navigate to the script directory → execute the site-deployed agent health script | Script outputs per-host: agent service status, connectivity status, last event time — or proceed to Step 3 if script not deployed |
| 2 | Review script output — identify any hosts with agent service DOWN or connectivity FAIL | Script console output | All hosts: SIEM agent service Running, SIEM server port OPEN |
| 3 | Log in to SIEM console | Browser or application → [SITE-DESIGNATED SIEM PLATFORM] URL → Admin credentials | SIEM dashboard loads |
| 4 | Open agent/forwarder monitoring view | SIEM console → [SITE-SPECIFIC NAV: infrastructure or monitoring view] | Agent monitoring dashboard loads |
| 5 | Review agent status — check all managed hosts | Agent monitoring view → agent list | All expected hosts listed as Connected; Last Event time within last 60 minutes |
| 6 | Identify any host with Last Event older than 60 minutes | Agent list → sort by last event time | Any host > 60 min = document in findings (see Section 10) |
| 7 | Identify any host completely absent from agent list | Compare agent list to managed host inventory | Missing host = document as finding; notify ISSM if absence > ISSM-defined threshold |
| 8 | Search for events from last 24 hours — verify all hosts have events | SIEM search interface → query all events from last 24 hours, grouped by source host | Every managed host appears with a last_event within the last 24 hours |
| 9 | For any host in Step 6–7: verify SIEM agent service status manually | Access host via [SITE-DESIGNATED MANAGEMENT METHOD] → check SIEM agent service status | Agent Running = possible connectivity issue; Agent Stopped = document + notify per AU-9 threshold |
| 10 | Verify network connectivity from agent host to SIEM server on configured port | Use site-appropriate connectivity test (e.g., port test utility) from the affected host to the SIEM server on [SITE-CONFIGURED SIEM PORT] | Connectivity confirmed: port open and reachable |
| 11 | If port CLOSED: check host firewall rules for SIEM agent traffic | Review host firewall rules via [SITE-DESIGNATED FIREWALL MANAGEMENT METHOD] — confirm SIEM agent outbound rule is present and enabled | Rule present and enabled; if missing, document and notify ISSM before any change |
| 12 | Review SIEM server storage usage | SIEM console → [SITE-SPECIFIC: storage or index management view] → review storage per index or data source | All storage within configured threshold; no index or data store at capacity |
| 13 | Review SIEM license usage (if applicable) | SIEM console → [SITE-SPECIFIC: license or capacity view] | Daily usage within licensed limit; no license warning or violation |
| 14 | Document all hosts checked in the Forwarder Status Table (Section 8) | | All rows populated |
| 15 | Log any findings in the Non-Compliance / Findings Log (Section 10) | | All findings documented |
| 16 | Complete Findings Summary and Sign-Off block (Sections 11–12) | | SA signature obtained |

---

## 8. Agent Status Table

| # | Hostname | Agent Service Status | Port Status | Last Event (SIEM) | Last Event Age | Result | Notes |
|---|----------|---------------|-----------|---------------------|----------------|--------|-------|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |

*Service Status: RUNNING / STOPPED / UNKNOWN | Port Status: OPEN / CLOSED | Result: PASS / FAIL / FINDING*

---

## 9. SIEM Infrastructure Summary

| Metric | Value | Status |
|--------|-------|--------|
| Total managed hosts | | |
| Forwarders connected (active) | | |
| Forwarders missing / silent | | |
| Hosts with event gap > 60 min | | |
| Indexer disk usage (%) | | |
| License / capacity usage | | |
| ISSM notified of findings | Y / N | |

---

## 10. Non-Compliance / Findings Log

| # | Hostname | Finding | AU-9 Gap? | Duration of Gap | ISSM Notified | Time | Directed Action | Resolved |
|---|----------|---------|-----------|----------------|---------------|------|----------------|---------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |

---

## 11. Findings Summary

- [ ] All SIEM agents active — no log gaps detected
- [ ] One or more hosts not forwarding — documented and escalated per AU-9 threshold
- [ ] SIEM agent connectivity failure on one or more hosts — documented
- [ ] SIEM storage or license approaching limit — documented
- [ ] No findings — all systems reporting normally

---

## 12. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-0101-DA | Rev 1.0 | Category 01 — Audit & Log Management*
*Classification: [CLASSIFICATION]*
