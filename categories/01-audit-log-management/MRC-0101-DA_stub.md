---
mrc_id: MRC-0101-DA
title: "Daily Splunk Agent Health and Log Forwarding Verification"
category: "01 — Audit & Log Management"
periodicity: Daily
est_time: "30–45 minutes"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Splunk Enterprise / Splunk Universal Forwarder, PowerShell, netstat / Test-NetConnection"
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

# MRC-0101-DA — Daily Splunk Agent Health and Log Forwarding Verification

---

## 1. Background (New SA)

**What Splunk does in this environment:**
Splunk is the Security Information and Event Management (SIEM) platform for this SAP environment. Every managed endpoint runs a Splunk Universal Forwarder — a lightweight agent that collects Windows Event Logs, application logs, security logs, and system logs and forwards them to the central Splunk indexer (server). The ISSO and SA review the Splunk dashboard to detect security events, policy violations, and anomalies.

**Why daily verification matters:**
If a forwarder stops sending data — due to a service crash, network issue, or intentional tampering — the gap in log coverage is a potential AU-9 violation and creates a blind spot for security monitoring. In an air-gapped environment with no external SOC, Splunk is the only centralized visibility tool. A silent forwarder is a security risk.

**What this MRC verifies:**
1. The `SplunkForwarder` service is running on all managed endpoints
2. Each forwarder is successfully communicating with the Splunk indexer on the configured port (default: TCP 9997)
3. The Splunk indexer is receiving events from all expected sources (no missing hosts in Last 24h)
4. Splunk disk and license usage are within operational thresholds

**Script reference:**
A PowerShell helper script (`scripts/Check-SplunkForwarders.ps1`) is available in the library to automate Steps 3–7. Run the script and review output before proceeding to manual verification steps.

---

## 2. Safety / Hazards

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** This MRC must be executed within an ISSM-authorized maintenance window (MA-2).

> ⚠️ **DO NOT RESTART SPLUNK WITHOUT AUTHORIZATION:** If the SplunkForwarder service is stopped, do not restart it without first documenting the finding and confirming the restart is within your current ISSM authorization. A stopped forwarder may be evidence of a tampering event — restart could overwrite volatile indicators.

> ⚠️ **AU-9 COMPLIANCE:** If any host is found not forwarding logs to Splunk for more than [ISSM-defined threshold], notify the ISSM immediately. Gaps in audit log coverage are a potential compliance finding.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| Splunk Web (admin) | Access to Splunk Search & Reporting, Monitoring Console |
| Domain Admin or equivalent | Remote service status checks via PowerShell |
| PowerShell (elevated) | `Get-Service`, `Test-NetConnection` cmdlets |
| `Check-SplunkForwarders.ps1` | Library script — `scripts/Check-SplunkForwarders.ps1` |
| Managed host inventory | Full list of all hosts expected to forward logs |
| MRC Sign-Off Block | Signed by SA and ISSM/ISSO after completion |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| JSIG AU-2, AU-6, AU-9 Implementation Guidance | ISSM SharePoint / SAP Cybersecurity Binder |
| Splunk Universal Forwarder Admin Guide | https://docs.splunk.com/Documentation/Forwarder |
| Splunk Monitoring Console Docs | https://docs.splunk.com/Documentation/Splunk/latest/DMC/Intro |
| Managed Host Inventory | SA Document Repository / CMDB |
| MRC-0102-WK | Weekly Splunk Index Health and Retention Audit (cross-reference) |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 30–45 minutes |

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file for this maintenance cycle
- [ ] Splunk Web admin credentials available
- [ ] Managed host inventory current
- [ ] `Check-SplunkForwarders.ps1` script available and tested
- [ ] PowerShell remoting available to all managed hosts (or local access)

---

## 7. Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 1 | Run the Splunk forwarder health script | `cd C:\scripts` (or library path) → `.\Check-SplunkForwarders.ps1` | Script outputs per-host: service status, port connectivity, last event time |
| 2 | Review script output — identify any hosts with service DOWN or port FAIL | Script console output | All hosts: `SplunkForwarder: Running`, `Port 9997: OPEN` |
| 3 | Log in to Splunk Web | Browser → `https://[splunk-server]:8000` → Admin credentials | Splunk Search & Reporting dashboard loads |
| 4 | Open Monitoring Console | Splunk Web → Settings → Monitoring Console | Monitoring Console home loads |
| 5 | Review Forwarder monitoring — check all forwarders | Monitoring Console → Forwarders → Forwarder Management | All expected hosts listed as `Connected`; Last Event time within last 60 minutes |
| 6 | Identify any host with Last Event older than 60 minutes | Forwarder Management → Sort by Last Event | Any host > 60 min = document in findings (see Section 10) |
| 7 | Identify any host completely absent from forwarder list | Compare forwarder list to managed host inventory | Missing host = document as finding; notify ISSM if absence > ISSM-defined threshold |
| 8 | Run search for last 24 hours — verify all hosts have events | Splunk Search → `index=* earliest=-24h \| stats latest(_time) as last_event by host \| sort last_event` | Every managed host appears with a last_event within the last 24 hours |
| 9 | For any host in Step 6–7: verify SplunkForwarder service status manually | `Get-Service -ComputerName [hostname] -Name SplunkForwarder` | Service `Running` = forwarding issue; Service `Stopped` = document + notify per AU-9 threshold |
| 10 | Verify port 9997 connectivity from forwarder to indexer | `Test-NetConnection -ComputerName [splunk-server] -Port 9997` (run from affected host) | `TcpTestSucceeded: True` |
| 11 | If port CLOSED: check Windows Firewall on forwarder host | `Get-NetFirewallRule -DisplayName "*Splunk*"` | Rule present and enabled; if missing, document and notify ISSM before any change |
| 12 | Review Splunk indexer disk usage | Monitoring Console → Indexing → Indexes → Review disk usage per index | All indexes within configured max size; no index at 100% capacity |
| 13 | Review Splunk license usage (if applicable) | Monitoring Console → License Usage | Daily usage within licensed limit; no license warning or violation |
| 14 | Document all hosts checked in the Forwarder Status Table (Section 8) | | All rows populated |
| 15 | Log any findings in the Non-Compliance / Findings Log (Section 10) | | All findings documented |
| 16 | Complete Findings Summary and Sign-Off block (Sections 11–12) | | SA signature obtained |

---

## 8. Forwarder Status Table

| # | Hostname | Service Status | Port 9997 | Last Event (Splunk) | Last Event Age | Result | Notes |
|---|----------|---------------|-----------|---------------------|----------------|--------|-------|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |

*Service Status: RUNNING / STOPPED / UNKNOWN | Port 9997: OPEN / CLOSED | Result: PASS / FAIL / FINDING*

---

## 9. Splunk Infrastructure Summary

| Metric | Value | Status |
|--------|-------|--------|
| Total managed hosts | | |
| Forwarders connected (active) | | |
| Forwarders missing / silent | | |
| Hosts with event gap > 60 min | | |
| Indexer disk usage (%) | | |
| License usage (GB/day) | | |
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

- [ ] All forwarders active — no log gaps detected
- [ ] One or more hosts not forwarding — documented and escalated per AU-9 threshold
- [ ] Splunk port connectivity failure on one or more hosts — documented
- [ ] Indexer disk or license approaching limit — documented
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
