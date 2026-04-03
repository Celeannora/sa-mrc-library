---
mrc_id: MRC-1007-MO
title: Monthly Active Directory Lightweight Directory Services (AD LDS) Health and Instance Audit
category: 10 — Identity & Directory Services
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:30"
rin: MO-ADLDS-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Directory lightweight services management console ([SITE-DESIGNATED DIRECTORY PLATFORM]), ADSI Edit or equivalent schema browser, OS event log, services console"
jsig_controls: "IA-2, IA-4, CM-6, AU-9, AC-3, SC-28"
non_tailorable: "N/A — No non-tailorable controls in this category (verify against site-specific JSIG annex)"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no schema or partition changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Active Directory Lightweight Directory Services (AD LDS) is a standalone LDAP directory service that runs alongside (but independent of) AD DS. It provides a directory store for applications that need LDAP-based authentication or data storage without requiring a full domain. In a SAP environment, AD LDS may be used by specific approved applications (such as classified portals, HBSS components, or custom SA tools) to manage their own user or configuration objects. Because AD LDS instances are often less visible than AD DS, they can go unmaintained — leading to stale accounts, schema drift, or service failures. This card verifies that all authorized AD LDS instances are running, healthy, and contain only authorized objects.

## Safety / Hazards
JSIG: Do not modify AD LDS schema, partitions, or application bindings without a CCB-approved Change Request and ISSM written authorization. Any unauthorized AD LDS instance on a SAP system must be reported to ISSM immediately — unapproved directory services are a CM-6 / AC-3 violation.

## Tools / Equipment / Access Required
- ADSI Edit — `adsiedit.msc` (connect to custom LDAP port for each AD LDS instance)
- Services console — `services.msc` to verify AD LDS service status
- PowerShell with Active Directory module
- Event Viewer — `eventvwr.msc` on host server
- AD LDS port numbers for all authorized instances (from ISSM authorization documentation)
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — IA-2, IA-4, CM-6, AU-9, AC-3
- DISA STIG — Active Directory Lightweight Directory Services benchmark (if applicable)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List
- Site-specific application authorization documentation identifying AD LDS instances

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: service failure of an AD LDS instance, discovery of an unauthorized AD LDS instance, or unauthorized schema/partition modifications.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Authorized AD LDS instance inventory (instance name, port, host, owning application)
- Access to host server(s) running AD LDS instances

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Identify all AD LDS instances on host server | `dsdbutil "List Instances" quit quit` in PowerShell/CMD | List matches authorized instance inventory; no unexpected instances |
| 2 | Verify each AD LDS instance service is running | `services.msc` — look for `ADAM_[InstanceName]`; or: `Get-Service ADAM_*` | All authorized instances Running |
| 3 | Connect to each instance via ADSI Edit | `adsiedit.msc` > Action > Connect To > Server: `localhost:[PORT]` | Connection successful; partition structure intact |
| 4 | Review application partition for unauthorized objects | Browse application partition in ADSI Edit; compare to known baseline | No unexpected OUs, users, groups, or service accounts |
| 5 | Check for stale or unauthorized user accounts in instance | ADSI Edit — expand application partition > review user objects; check `lastLogon` attribute | No inactive/stale accounts; all accounts authorized |
| 6 | Verify schema has not been modified | Compare schema partition object count to documented baseline; or review `modifyTimeStamp` on schema objects | Schema matches baseline; no unauthorized modifications |
| 7 | Check AD LDS event logs for errors (last 30 days) | `Event Viewer > Applications and Services Logs > Directory Services (ADAM)` — IDs: 1000, 1084, 1173, 1925 | No critical events; warnings documented |
| 8 | Verify only authorized applications are bound to the AD LDS instance | Review application authorization documentation; confirm owning application is still approved and running | Binding application active and authorized |
| 9 | Confirm LDAP port is not externally accessible (unless authorized) | Check firewall rules for AD LDS port — `netsh advfirewall` or check with network SA | Port accessible only by authorized internal systems |
| 10 | Document all findings in findings log below | — | All discrepancies recorded |
| 11 | Sign and date MRC; file as IA-4 / CM-6 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## AD LDS Instance Inventory (Complete at time of check)

| Instance Name | Port | Host Server | Owning Application | Service Status | Last Checked |
|--------------|------|-------------|-------------------|---------------|-------------|
| | | | | | |
| | | | | | |
| | | | | | |

---

## Non-Compliance / Findings Log

| # | Finding Description | Instance / System Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|--------------------------|-----------------|-----------|-----------  |--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- All Instances Running: [ ] Yes  [ ] No — ISSM notified
- Unauthorized Instances Found: [ ] No  [ ] Yes — ISSM notified immediately
- Unauthorized Objects/Accounts: [ ] None  [ ] Found — documented
- Schema Changes Detected: [ ] No  [ ] Yes — ISSM notified
- Total Instances checked: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
