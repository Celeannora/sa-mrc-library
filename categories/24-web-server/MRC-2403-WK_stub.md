---
mrc_id: MRC-2403-WK
title: Weekly Web Server Security Configuration and Authentication Audit
category: 24 — Web Server (IIS)
periodicity: WEEKLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:40"
rin: WK-IIS-003
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Web server management console or CLI ([SITE-DESIGNATED WEB SERVER PLATFORM]), TLS/cipher configuration tool, vulnerability scanner TLS scan results, OS event log"
jsig_controls: "AC-3, AC-17, SC-8, SC-8(1), CM-6, CM-7, AU-9, AU-12, IA-2"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no authentication provider, IP restriction, or TLS cipher changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
IIS Security configuration controls who can access a web application and how that access is protected in transit. The key components are: **Authentication** (who can log in — Windows Auth, Basic Auth, Anonymous, Digest, Client Certificate), **TLS/SSL** (encryption of all HTTP traffic — required by SC-8), **Request Filtering** (blocking malformed, oversized, or suspicious HTTP requests before they reach the application), and **IP/Domain Restrictions** (limiting which clients can even connect to a site). In a SAP environment, authentication misconfiguration is one of the most common and dangerous findings. Anonymous authentication left enabled on a page that should require a login, or Basic Authentication used over plain HTTP (transmitting Base64-encoded credentials in cleartext), are both immediate security violations. This card performs a weekly audit of all IIS security settings across all sites.

## Safety / Hazards
JSIG: Do not modify IIS authentication providers, request filtering rules, IP restriction lists, or SSL/TLS binding certificates without a CCB-approved Change Request and ISSM written authorization. Anonymous authentication enabled on a site handling classified data is an AC-3 violation — disable immediately and notify ISSM. Basic Authentication over HTTP (not HTTPS) transmits credentials in cleartext — a SC-8 violation.

## Tools / Equipment / Access Required
- IIS Manager — `inetmgr`
- PowerShell WebAdministration: `Get-WebConfigurationProperty` for auth, request filtering, IP restrictions
- IIS Crypto — for TLS protocol / cipher suite audit (if available at site)
- TLS scan output (Nessus/Qualys or `Test-NetConnection`) for cipher validation
- Event Viewer — `eventvwr.msc`
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — AC-3, AC-17, SC-8, SC-8(1), CM-6, CM-7, AU-12, IA-2
- DISA STIG — Microsoft IIS 10.0 Site benchmark (authentication, TLS sections)
- NIST SP 800-52 Rev 2 — TLS implementation guidelines (TLS 1.2+ required)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: Anonymous authentication enabled on restricted site, Basic Auth over HTTP (not HTTPS), TLS 1.0/1.1 or SSL 2.0/3.0 found enabled, request filtering disabled or missing, or unauthorized IP added to restriction bypass list.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to IIS server(s)
- Approved authentication configuration baseline per DISA STIG and site authorization

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Check Anonymous Authentication status on all sites | `Get-WebConfigurationProperty -Filter system.webServer/security/authentication/anonymousAuthentication -Name enabled -PSPath "IIS:\Sites\[SITE]"` for each site | `Enabled = False` on all restricted/admin sites; only enabled on explicitly authorized public-facing pages |
| 2 | **JSIG CHECK** — Anonymous auth on sites handling classified data | Review each site's authentication config; flag any site with Anonymous=True that handles restricted content | **Any anonymous auth on restricted site = notify ISSM immediately** |
| 3 | Check Windows Authentication status on restricted sites | `Get-WebConfigurationProperty -Filter system.webServer/security/authentication/windowsAuthentication -Name enabled` | Windows Auth `Enabled = True` on all admin/restricted sites |
| 4 | Check Basic Authentication status | `Get-WebConfigurationProperty -Filter system.webServer/security/authentication/basicAuthentication -Name enabled` | If Basic Auth is enabled, verify HTTPS binding is enforced — Basic Auth over HTTP is a SC-8 violation |
| 5 | Verify all sites with sensitive content use HTTPS bindings | `Get-WebBinding \| Where-Object {$_.protocol -eq "http"}` — review any plain HTTP sites | Plain HTTP sites either redirect to HTTPS or are non-sensitive; no classified data served over HTTP |
| 6 | Verify TLS 1.0 and TLS 1.1 are disabled | Check registry: `HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0\Server` and `TLS 1.1\Server` — `Enabled = 0` or `DisabledByDefault = 1` | TLS 1.0 and 1.1 disabled; TLS 1.2 (minimum) and/or 1.3 enabled |
| 7 | Verify SSL 2.0 and SSL 3.0 are disabled | Check registry: `HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 2.0\Server` and `SSL 3.0\Server` | SSL 2.0 and 3.0 disabled |
| 8 | Verify Request Filtering is enabled | `Get-WebConfigurationProperty -Filter system.webServer/security/requestFiltering -Name * -PSPath "IIS:\Sites\[SITE]"` | Request Filtering enabled; `maxAllowedContentLength`, `maxQueryString`, `maxUrl` set per STIG |
| 9 | Check for `.` (double-dot) sequence blocking | `Get-WebConfigurationProperty -Filter system.webServer/security/requestFiltering -Name allowDoubleEscaping` | `allowDoubleEscaping = False` |
| 10 | Verify High-Bit characters and unlisted file extensions are blocked | `Get-WebConfigurationProperty -Filter system.webServer/security/requestFiltering -Name allowHighBitCharacters`; review `fileExtensions` allowlist | `allowHighBitCharacters = False`; file extension allowlist enforced |
| 11 | Check IP and Domain Restriction rules (if configured) | `inetmgr` > site > `IP Address and Domain Restrictions` | Only authorized IP ranges have allow entries; deny-all default enforced where applicable |
| 12 | Review IIS Security event logs for auth failures, 401s (last 7 days) | `Event Viewer > Windows Logs > Security` — IDs: 4625 (failed logon), 4648; IIS access log for `401` responses | No auth brute-force patterns; 401 spikes investigated |
| 13 | Document all findings in findings log below | — | All discrepancies recorded |
| 14 | Sign and date MRC; file as AC-3 / SC-8 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Authentication and TLS Status per Site (Complete at time of check)

| Site Name | Anonymous Auth | Windows Auth | Basic Auth | HTTPS Only | TLS 1.2+ | Request Filtering | Notes |
|-----------|--------------|-------------|-----------|-----------|---------|-----------------|-------|
| | Disabled? | Enabled? | N/A or HTTPS? | Yes? | Yes? | Enabled? | |
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
- Anonymous Auth on Restricted Site: [ ] None  [ ] Found — ISSM notified immediately
- Basic Auth over HTTP: [ ] None  [ ] Found — ISSM notified immediately
- TLS 1.0/1.1 Disabled: [ ] Yes  [ ] No — ISSM notified
- SSL 2.0/3.0 Disabled: [ ] Yes  [ ] No — ISSM notified
- Request Filtering Enabled: [ ] All sites  [ ] Missing — remediated
- IP Restrictions Compliant: [ ] Yes  [ ] Deviation — documented
- Auth Failure Spikes: [ ] None  [ ] Detected — investigated
- Total sites audited: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
