---
mrc_id: MRC-1008-MO
title: Monthly Active Directory Rights Management Services (AD RMS) Health and Policy Audit
category: 10 — Identity & Directory Services
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:45"
rin: MO-ADRMS-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Rights management services console ([SITE-DESIGNATED RMS PLATFORM]), rights management CLI or PowerShell module, OS event log, web server management console, database management console (if RMS is database-backed)"
jsig_controls: "SC-8, SC-28, AC-3, AC-16, CM-6, AU-9, SI-12"
non_tailorable: "N/A — No non-tailorable controls in this category (verify against site-specific JSIG annex)"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no rights policy template or trust changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Active Directory Rights Management Services (AD RMS) is a Windows Server role that enforces persistent information protection — it encrypts documents and emails and binds access rights (read-only, no-print, no-forward, expiry) to the content itself, so restrictions follow the file even if it is copied or forwarded. In a SAP environment, AD RMS may be used to protect sensitive documents, email communications, or classified information packages. If the AD RMS server goes offline or its Server Licensor Certificate (SLC) expires, users lose the ability to open protected content. This card verifies that the RMS service is healthy, certificates are current, rights policy templates are authorized, and no unauthorized trusts have been added.

## Safety / Hazards
JSIG: Do not modify Rights Policy Templates, Trusted User Domains (TUD), Trusted Publishing Domains (TPD), or RMS cluster configuration without a CCB-approved Change Request and ISSM written authorization. Unauthorized RMS configuration changes may allow unauthorized access to protected content — a potential SC-28 / AC-16 violation. Any RMS service failure must be reported to ISSM immediately.

## Tools / Equipment / Access Required
- AD RMS Administration MMC — open from Server Manager or `Start > Administrative Tools > Active Directory Rights Management Services`
- PowerShell with ADRMSAdmin module (`Import-Module ADRMSAdmin`)
- Event Viewer — `eventvwr.msc` on RMS server
- IIS Manager — `inetmgr` (RMS runs as an IIS application)
- SQL access if RMS uses an external SQL database (read-only query access)
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — SC-8, SC-28, AC-3, AC-16, CM-6, AU-9, SI-12
- DISA STIG — Windows Server benchmark (RMS-specific STIG if applicable at site)
- NIST SP 800-111 — Guide to Storage Encryption
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List
- Site-specific information protection policy / data handling SOP

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: RMS service failure, SLC certificate expiration (< 30 days), any unauthorized rights policy template, or addition of an unauthorized Trusted User/Publishing Domain.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to RMS server and RMS Admin console
- Approved Rights Policy Template baseline list (from ISSM/CCB authorization records)
- Approved Trusted Domain baseline list

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Open AD RMS Administration console | Server Manager > Tools > `Active Directory Rights Management Services` | RMS cluster displayed and accessible |
| 2 | Verify AD RMS service is running | `Get-Service adrms` or check IIS Application Pool in `inetmgr` — `_DRMSAppPool` | Service Running; App Pool started |
| 3 | Check Server Licensor Certificate (SLC) expiration | AD RMS console > `Security Policies` > `Server Certificate` — check `Expiration Date` | Expiry > 30 days; notify ISSM if ≤ 30 days |
| 4 | Verify Rights Policy Templates match approved baseline | AD RMS console > `Rights Policy Templates` — list all templates; compare to ISSM-approved baseline | No unauthorized templates; no missing authorized templates |
| 5 | Verify Rights Policy Template permissions (who can use each template) | Right-click each template > `Properties` > review assigned users/groups | Only authorized users/groups assigned; no over-permissioned entries |
| 6 | Review Trusted User Domains (TUDs) | AD RMS console > `Trust Policies` > `Trusted User Domains` | TUDs match approved trust list; no unauthorized domains |
| 7 | Review Trusted Publishing Domains (TPDs) | AD RMS console > `Trust Policies` > `Trusted Publishing Domains` | TPDs match approved trust list; no unauthorized domains |
| 8 | Check RMS logging database (if enabled) | AD RMS console > `Security Policies` > `Logging` — verify logging is ON and database is accessible | Logging enabled; database reachable |
| 9 | Review AD RMS event logs for errors (last 30 days) | `Event Viewer > Applications and Services Logs > Active Directory Rights Management Services` | No critical events; warnings documented |
| 10 | Verify IIS Application Pool for RMS is running and not crashing | `inetmgr` > Application Pools > `_DRMSAppPool` | Pool running; no recent failures |
| 11 | Spot-check that RMS-protected content can be opened by an authorized test user | Attempt to open a known RMS-protected test document with an authorized account | Document opens; permissions enforced as expected |
| 12 | Verify RMS database backup is current (if SQL-backed) | Check SQL Server Agent job history or backup job logs | Last backup within 24 hours |
| 13 | Document all findings in findings log below | — | All discrepancies recorded |
| 14 | Sign and date MRC; file as SC-28 / AC-16 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Non-Compliance / Findings Log

| # | Finding Description | System / Component Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|-----------------------------|-----------------|-------------|-------------|--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- RMS Service: [ ] Running  [ ] Down — ISSM notified
- SLC Certificate: [ ] > 30 days  [ ] ≤ 30 days — ISSM notified  [ ] Expired — STOP
- Unauthorized Rights Policy Templates: [ ] None  [ ] Found — ISSM notified
- Unauthorized Trusted Domains (TUD/TPD): [ ] None  [ ] Found — ISSM notified
- Logging: [ ] Enabled and accessible  [ ] Disabled or failed — documented
- Functional Test (protected content): [ ] Passed  [ ] Failed — documented
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
