---
mrc_id: MRC-2401-WK
title: Weekly IIS Web Server Service Health and Site Inventory Review
category: 24 — Web Server (IIS)
periodicity: WEEKLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:30"
rin: WK-IIS-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "IIS Manager (inetmgr), PowerShell (WebAdministration / IISAdministration module), Services console (services.msc), Event Viewer"
jsig_controls: "CM-6, CM-7, AC-2, AC-17, AU-9, AU-12"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no site, application pool, or binding changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
IIS (Internet Information Services) is the Windows web server engine. It hosts websites and web applications, each organized into **Sites** (a website with its own bindings, hostname, and port) and **Application Pools** (isolated worker processes that run each application — if one crashes, others continue). In a SAP environment, IIS often runs behind the scenes hosting admin consoles for tools like Trellix ePO, WSUS, SCCM, AD CS, IPAM, or AD FS. This card verifies that the IIS service is running, all sites and application pools are in their expected state, no unauthorized sites have appeared, and application pools are running under correctly configured service accounts.

## Safety / Hazards
JSIG: Do not create, modify, or delete IIS sites, virtual directories, or application pools without a CCB-approved Change Request and ISSM written authorization. Discovery of unauthorized sites or applications on a SAP server is a CM-7 violation — stop and notify ISSM. Do not change application pool identity accounts without CCB approval (AC-2).

## Tools / Equipment / Access Required
- IIS Manager — `inetmgr` (run on IIS server or via remote IIS Manager connection)
- PowerShell: `Import-Module WebAdministration` then `Get-Website`, `Get-WebApplication`, `Get-WebAppPoolState`
- Services console — `services.msc` (W3SVC — World Wide Web Publishing Service)
- Event Viewer — `eventvwr.msc`
- ISSM/ISSO contact for escalation
- Authorized site and application pool baseline list

## Reference Documents
- JSIG — CM-6, CM-7, AC-2, AC-17, AU-12
- DISA STIG — Microsoft IIS 10.0 Site and Server benchmarks (latest release)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List
- Site-specific IIS baseline documentation (ISSM-authorized site list)

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: unauthorized site or application found, application pool running under a privileged domain account without authorization, IIS service failure, or site binding exposing an unauthorized port/hostname.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Authorized site and application pool baseline list
- Access to IIS server(s) — local or remote management

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Verify IIS (W3SVC) service is running | `Get-Service W3SVC` | Status: Running |
| 2 | Verify WAS (Windows Process Activation Service) is running | `Get-Service WAS` | Status: Running |
| 3 | List all websites and compare to authorized baseline | `Get-Website \| Select Name, State, PhysicalPath, Id` | Sites match authorized baseline; no unauthorized sites |
| 4 | Verify all authorized sites are in `Started` state | `Get-Website \| Where-Object {$_.State -ne "Started"}` | Zero stopped sites (unless intentionally decommissioned and documented) |
| 5 | Check site bindings — verify protocols, ports, and hostnames | `Get-WebBinding \| Select Protocol, BindingInformation, SslFlags` | Bindings match baseline; no unexpected IP/port/hostname combinations |
| 6 | List all application pools and compare to authorized baseline | `Get-WebAppPoolState` and `Get-WebConfiguration system.applicationHost/applicationPools/add` | Application pools match baseline; no unauthorized pools |
| 7 | Verify application pool states | `Get-WebAppPoolState \| Where-Object {$_.Value -ne "Started"}` | All pools Started; stopped or recycling pools investigated |
| 8 | Check application pool identity accounts | `Get-WebConfiguration system.applicationHost/applicationPools/add \| Select Name, @{N='Identity';E={$_.processModel.userName}}` | No pools running as `LocalSystem` or domain admin without CCB authorization; document any exceptions |
| 9 | Verify application pool .NET CLR version matches deployed application requirement | `inetmgr` > Application Pools > verify `.NET CLR Version` column | CLR versions match application requirements; "No Managed Code" set only where appropriate |
| 10 | Review IIS Application and System event logs for critical errors (last 7 days) | `Event Viewer > Windows Logs > Application` — source: `IIS-W3SVC-WP`, `WAS`; IDs: 2268, 2269 (pool failures), 5057, 5059 | No repeated pool crashes or service failures |
| 11 | Verify IIS logging is enabled on all sites | `Get-WebConfiguration system.applicationHost/sites/site/logFile` for each site | Logging enabled; log format W3C |
| 12 | Document all findings in findings log below | — | All discrepancies recorded |
| 13 | Sign and date MRC; file as CM-7 / AU-12 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Site and Application Pool Inventory (Complete at time of check)

| Site Name | State | Port/Binding | Physical Path | App Pool | Pool Identity | Authorized? | Notes |
|-----------|-------|-------------|--------------|----------|--------------|------------|-------|
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |

---

## Non-Compliance / Findings Log

| # | Finding Description | Site / Pool Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|--------------------|-----------------|-------------|-------------|--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- IIS Service Running: [ ] Yes  [ ] No — remediated
- Unauthorized Sites: [ ] None  [ ] Found — ISSM notified
- All Sites Started: [ ] Yes  [ ] Stopped sites — documented
- Unauthorized App Pool Identity: [ ] None  [ ] Found — ISSM notified
- Pool Crashes / Failures: [ ] None  [ ] Found — investigated
- IIS Logging Enabled: [ ] All sites  [ ] Missing — remediated
- Total sites reviewed: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
