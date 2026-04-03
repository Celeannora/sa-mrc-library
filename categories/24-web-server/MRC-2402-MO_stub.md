---
mrc_id: MRC-2402-MO
title: Monthly Web Server HTTP Features Configuration and Directory Hardening Audit
category: 24 — Web Server (IIS)
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:35"
rin: MO-IIS-002
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Web server management console or CLI ([SITE-DESIGNATED WEB SERVER PLATFORM]), web server configuration CLI"
jsig_controls: "CM-6, CM-7, SC-8, AC-3, AU-12"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only audit; no IIS feature, handler, or default document changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Web Server HTTP Features are the individual role services within IIS that determine what the web server can serve and how it behaves: Static Content (plain HTML/CSS/image files), Default Document (what file to serve when a user requests just a folder path like `/`), Directory Browsing (whether IIS lists all files in a folder if no default doc is found), HTTP Errors (how error messages are displayed to the user), HTTP Redirection (automatic redirects), WebDAV (HTTP-based file reading and writing). In a SAP environment, several of these features are high-risk if enabled without authorization. **Directory browsing** reveals the full file structure of a web share to anyone who can reach it. **WebDAV** allows remote file writes and deletes via HTTP — essentially turning any web server into an unauthorized file server. This card audits the enabled HTTP feature set against the approved baseline and ensures no information-disclosure or file-upload vectors are open.

## Safety / Hazards
JSIG: Do not enable IIS features, modules, or handlers that are not on the CCB-approved list. WebDAV enabled without CCB/ISSM authorization is a CM-7 / AC-3 violation — disable immediately and notify ISSM. Directory browsing enabled on any site must be treated as a potential information disclosure and reported to ISSM.

## Tools / Equipment / Access Required
- IIS Manager — `inetmgr`
- PowerShell WebAdministration: `Get-WebConfigurationProperty`, `Get-WebHandler`
- `appcmd.exe list config [SITE-NAME] /section:[SECTION]`
- ISSM/ISSO contact for escalation
- Authorized IIS feature baseline (from ISSM authorization / STIG baseline)

## Reference Documents
- JSIG — CM-6, CM-7, SC-8, AC-3, AU-12
- DISA STIG — Microsoft IIS 10.0 Site benchmark (V-218758 directory browsing, V-218759 WebDAV)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: Directory Browsing enabled, WebDAV enabled without authorization, HTTP (non-HTTPS) binding present on a site handling sensitive data without ISSM-approved redirect, or unauthorized IIS modules/handlers found.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to IIS server(s)
- Approved IIS feature/module baseline per DISA STIG and site authorization

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Check Directory Browsing setting on each site | `inetmgr` > site > `Directory Browsing` icon; or: `Get-WebConfigurationProperty -Filter system.webServer/directoryBrowse -Name enabled -PSPath "IIS:\Sites\[SITE]"` | `Enabled = False` on all sites; any `True` = report to ISSM |
| 2 | Verify Default Document is configured (prevents auto-browse) | `inetmgr` > site > `Default Document` — confirm at least one entry exists | Default document(s) configured; appropriate for application |
| 3 | Check whether WebDAV is installed and enabled | `Get-WindowsFeature Web-DAV-Publishing`; `Get-WebConfigurationProperty -Filter system.webServer/webdav/authoring -Name enabled` | WebDAV not installed; if installed, `Enabled = False` unless CCB-authorized |
| 4 | **JSIG CHECK** — Verify WebDAV is not enabled on any site | Filter: `Get-WebConfigurationProperty -Filter system.webServer/webdav/authoring -Name enabled -Recurse \| Where-Object {$_.Value -eq $true}` | **Zero results. Any WebDAV enabled site = notify ISSM immediately** |
| 5 | Verify HTTP Redirect is configured correctly (HTTP → HTTPS) | `inetmgr` > site > `HTTP Redirect`; or: `Get-WebConfigurationProperty -Filter system.webServer/httpRedirect -Name enabled` | Sites using HTTP either redirect to HTTPS or HTTP is not bound at all |
| 6 | Review installed IIS modules against approved baseline | `Get-WebConfiguration system.webServer/modules \| Select Name` | Module list matches approved baseline; no unauthorized modules loaded |
| 7 | Review installed IIS handlers against approved baseline | `Get-WebHandler \| Select Name, Path, Verb, Type` | Handler list matches approved baseline; no unexpected handlers (e.g., `.php`, `.asp` on a site that shouldn't have them) |
| 8 | Verify HTTP Error responses do not expose detailed server information | `inetmgr` > site > `Error Pages` > `Edit Feature Settings` | `Error Responses: Custom error pages` or `Detailed errors for local requests only`; never `Detailed errors` to remote clients |
| 9 | Check whether IIS is configured to suppress server version header | `Get-WebConfigurationProperty -Filter system.webServer/security/requestFiltering -Name removeServerHeader` | `removeServerHeader = True`; Server header not disclosed to clients |
| 10 | Verify `OPTIONS` HTTP verb is disabled or restricted | `Get-WebConfiguration system.webServer/security/requestFiltering/verbs` | `OPTIONS` either restricted or not present; WebDAV-related verbs (PUT, DELETE, MOVE, COPY) blocked where WebDAV not authorized |
| 11 | Document all findings in findings log below | — | All discrepancies recorded |
| 12 | Sign and date MRC; file as CM-7 / SC-8 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## HTTP Feature Status per Site (Complete at time of check)

| Site Name | Dir Browse | WebDAV | Default Doc | HTTP→HTTPS Redirect | Unauthorized Modules | Notes |
|-----------|-----------|--------|------------|--------------------|--------------------|-------|
| | Disabled? | Disabled? | Set? | Configured? | None? | |
| | | | | | | |
| | | | | | | |
| | | | | | | |

---

## Non-Compliance / Findings Log

| # | Finding Description | Site / Feature Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|-----------------------|-----------------|-----------|-----------  |--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Directory Browsing: [ ] Disabled on all  [ ] Enabled — ISSM notified
- WebDAV: [ ] Disabled on all  [ ] Enabled without authorization — ISSM notified immediately
- HTTP→HTTPS Redirect: [ ] Configured  [ ] Missing on: ___ site(s) — documented
- Unauthorized Modules/Handlers: [ ] None  [ ] Found — ISSM notified
- Server Version Header Suppressed: [ ] Yes  [ ] No — remediated
- Total sites audited: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
