---
mrc_id: MRC-2404-MO
title: Monthly Web Server Performance Settings and Logging Compliance Review
category: 24 — Web Server (IIS)
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:30"
rin: MO-IIS-004
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Web server management console or CLI ([SITE-DESIGNATED WEB SERVER PLATFORM]), performance monitoring console, OS event log"
jsig_controls: "AU-9, AU-12, CM-6, SC-8, SI-12, CP-9"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no compression, cache, or log configuration changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
IIS Performance settings control how the web server handles load and responds to clients efficiently — primarily through **Compression** (reducing the size of HTTP responses before sending) and **Output Caching** (storing responses in memory so identical requests can be answered faster without processing them again). While these improve performance, they have security implications: compression of responses that contain both secret and attacker-controlled data can leak information through response size (CRIME/BREACH attacks). Output caching of sensitive or authenticated responses can serve another user's session data to a different client. This card also covers the most critical aspect of IIS security operations — **logging**. IIS access logs are essential for incident response, AU-12 compliance, and audit trail requirements. Without correct logging, security events on the web server are invisible. This card verifies compression is configured safely, caching is not exposing sensitive responses, and IIS logging meets JSIG/AU-12 requirements.

## Safety / Hazards
JSIG: Do not disable IIS logging on any site — this is an AU-12 violation. Do not enable response compression for HTTPS-only pages that contain both user-controlled input and sensitive data without ISSM review (CRIME/BREACH risk). Do not modify log retention schedules or file paths without CCB approval and ISSM authorization.

## Tools / Equipment / Access Required
- IIS Manager — `inetmgr`
- PowerShell WebAdministration: `Get-WebConfiguration` for logging, compression, caching
- Performance Monitor — `perfmon.msc` (optional, for performance baseline check)
- Event Viewer — `eventvwr.msc`
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — AU-9, AU-12, CM-6, SC-8, SI-12, CP-9
- DISA STIG — Microsoft IIS 10.0 Server benchmark (logging sections, V-218729 through V-218737)
- NIST SP 800-92 — Guide to Computer Security Log Management
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: IIS logging disabled on any site, log directory inaccessible or full, log files deleted or tampered with, or output caching found serving sensitive authenticated responses to unauthenticated clients.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to IIS server(s)
- Approved log retention and field configuration baseline

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Verify IIS logging is enabled on all sites | `Get-WebConfigurationProperty -Filter system.applicationHost/sites/site/logFile -Name enabled -Recurse` | `Enabled = True` on all sites; any `False` = notify ISSM immediately |
| 2 | Verify log format is W3C on all sites | `Get-WebConfigurationProperty -Filter system.applicationHost/sites/site/logFile -Name logFormat -Recurse` | `logFormat = W3C` on all sites |
| 3 | Verify required W3C log fields are enabled | `inetmgr` > site > `Logging` > `Select Fields` — confirm: `Date`, `Time`, `Client IP`, `User Name`, `Method`, `URI Stem`, `URI Query`, `HTTP Status`, `Win32 Status`, `Bytes Sent`, `Bytes Received`, `Time Taken` | All required fields enabled per DISA STIG V-218732 |
| 4 | Verify log file directory is on a non-OS, protected volume | `Get-WebConfigurationProperty -Filter system.applicationHost/sites/site/logFile -Name directory -Recurse` | Log directory not on `%SystemDrive%\inetpub\logs` default unless that volume is protected; verify directory ACLs restrict access to SA/SYSTEM only |
| 5 | Verify log rollover schedule is configured (daily) | `Get-WebConfigurationProperty -Filter system.applicationHost/sites/site/logFile -Name period -Recurse` | `period = Daily`; log files rotate daily |
| 6 | Check log directory disk space | `Get-Item [LOG-DIRECTORY]` + `Get-Volume` for log drive | Log drive not ≥ 85% full; alert if approaching capacity |
| 7 | Verify ETW (Event Tracing for Windows) logging is also enabled | `Get-WebConfigurationProperty -Filter system.applicationHost/sites/site/logFile -Name logTargetW3C -Recurse` | `logTargetW3C` includes `ETW` or `File,ETW` for enhanced audit capability |
| 8 | Check static compression configuration | `Get-WebConfigurationProperty -Filter system.webServer/httpCompression -Name staticCompressionEnabled` | Static compression: acceptable; verify not applied to responses containing classified fields in dynamic content |
| 9 | Check dynamic compression configuration | `Get-WebConfigurationProperty -Filter system.webServer/httpCompression -Name dynamicCompressionEnabled` | Dynamic compression: review whether any HTTPS sites compress responses containing user-controlled and sensitive data together; document for ISSM review if so |
| 10 | Verify output caching does not cache authenticated/sensitive responses | `Get-WebConfiguration system.webServer/caching/profiles/add` | No cache profiles configured for pages requiring Windows Auth; or cache profiles explicitly set `varyByHeaders="Authorization"` to isolate per-user |
| 11 | Verify IIS Worker Process performance counters are in normal range | `perfmon.msc` > `Web Service` counters: `Current Connections`, `Total Method Requests/sec` | No abnormal spikes suggesting DoS activity or runaway requests |
| 12 | Review IIS application and error event logs for recurring errors (last 30 days) | `Event Viewer > Windows Logs > Application` — source: `IIS-IISADMIN`; `inetmgr` > Failed Request Tracing logs | No recurring 500 errors, application crashes, or failed request tracing rules triggering at high rate |
| 13 | Document all findings in findings log below | — | All discrepancies recorded |
| 14 | Sign and date MRC; file as AU-12 / AU-9 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Logging Configuration per Site (Complete at time of check)

| Site Name | Logging Enabled | Format | Required Fields | Log Directory | Rollover | Log Drive % Used | Notes |
|-----------|----------------|--------|----------------|--------------|----------|-----------------|-------|
| | | W3C? | All set? | Protected? | Daily? | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |

---

## Non-Compliance / Findings Log

| # | Finding Description | Site / Setting Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|-----------------------|-----------------|-----------|-----------  |--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- IIS Logging Enabled on All Sites: [ ] Yes  [ ] No — ISSM notified immediately
- W3C Format: [ ] All sites  [ ] Incorrect format — remediated
- Required Log Fields: [ ] All configured  [ ] Missing fields — remediated
- Log Drive Capacity: [ ] < 85%  [ ] ≥ 85% — ISSM/ISSO notified
- Daily Log Rollover: [ ] Configured  [ ] Not set — remediated
- Output Cache Security: [ ] No sensitive pages cached  [ ] Review needed — documented
- Total sites audited: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
