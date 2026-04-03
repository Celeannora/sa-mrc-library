---
mrc_id: MRC-2202-MO
title: Monthly BranchCache Configuration and Content Integrity Review
category: 22 — Security & Protection
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:30"
rin: MO-BC-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Distributed caching/BranchCache management CLI or PowerShell module ([SITE-DESIGNATED PLATFORM]), group policy management console, OS event log, services console"
jsig_controls: "CM-6, CM-7, SC-8, AC-3, AU-9, SI-7"
non_tailorable: "N/A — No non-tailorable controls in this category (verify against site-specific JSIG annex)"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no BranchCache mode, cache size, or policy changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
BranchCache is a Windows feature that caches content from file servers, web servers, and application servers at a branch office location, reducing the need to re-download the same data across a WAN link. It operates in two modes: **Distributed Cache Mode** (peers share content between client workstations) or **Hosted Cache Mode** (a dedicated server holds the cache). In a SAP environment, BranchCache must be carefully controlled — cached content must only be accessible to authorized systems in authorized network segments, and the cache must not persist data beyond what policy allows. This card verifies that BranchCache is configured only where authorized, operating in the correct mode, and not exposing content to unauthorized hosts.

## Safety / Hazards
JSIG: Do not change BranchCache operating mode, hosted cache server location, or cache policies without a CCB-approved Change Request and ISSM written authorization. BranchCache enabled in unauthorized segments or in Distributed Cache Mode on a classified network segment is a potential CM-7 / SC-8 violation. If BranchCache is found enabled on systems where it is not authorized, disable it and notify ISSM.

## Tools / Equipment / Access Required
- PowerShell BranchCache cmdlets: `Get-BCStatus`, `Get-BCDataCacheExtension`, `Get-BCNetworkConfiguration`
- `netsh branchcache show status all` — command-line status check
- Group Policy Management Console — `gpmc.msc`
- Services console — `services.msc` (PeerDistSvc)
- Event Viewer — `eventvwr.msc`
- ISSM/ISSO contact for escalation
- Site authorization documentation specifying where BranchCache is approved

## Reference Documents
- JSIG — CM-6, CM-7, SC-8, AC-3, AU-9, SI-7
- DISA STIG — Windows Server and Windows Client benchmarks (BranchCache sections)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List
- Site-specific BranchCache authorization documentation (ISSM-signed)

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: BranchCache found enabled on unauthorized systems, Distributed Cache Mode active on a segment not authorized for peer sharing, hosted cache server accessible from unauthorized segments, or unauthorized cache content found.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Authorized BranchCache deployment documentation (which systems, which mode, which segments)
- Access to all target systems (remote or local)

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Identify all systems where BranchCache should be enabled per site authorization | Review site BranchCache authorization documentation | Authorized system list confirmed |
| 2 | Check BranchCache status on each authorized system | `Get-BCStatus` or `netsh branchcache show status all` | Status matches authorization: Enabled on authorized systems only |
| 3 | Verify BranchCache is **not** enabled on unauthorized systems | Run `Get-BCStatus` on all SAP workstations/servers; filter for `BranchCacheIsEnabled = True` | BranchCache disabled on all non-authorized systems; any exceptions reported to ISSM |
| 4 | Verify operating mode matches authorization (Distributed vs. Hosted) | `Get-BCStatus \| Select -ExpandProperty BranchCacheIsEnabled, ClientConfig` or `netsh branchcache show status all` | Mode matches ISSM-authorized mode; no unauthorized mode changes |
| 5 | If Hosted Cache Mode — verify hosted cache server is authorized and accessible only to approved clients | Check hosted cache server FQDN/IP in GPO; verify firewall rules limit access to authorized clients only | Hosted cache server access restricted to authorized network range |
| 6 | Verify BranchCache Group Policy settings match approved baseline | `gpmc.msc` > review BranchCache policy under `Computer Configuration > Policies > Administrative Templates > Network > BranchCache` | Policy settings match approved GPO baseline |
| 7 | Check PeerDistSvc (BranchCache service) status on authorized systems | `Get-Service PeerDistSvc` on each authorized system | Running on authorized systems; stopped/disabled on all others |
| 8 | Verify cache size limits are set per policy | `Get-BCDataCacheExtension` or `netsh branchcache show localcache` | Cache size within approved limit; no unbounded cache growth |
| 9 | Review BranchCache / PeerDist event logs for errors (last 30 days) | `Event Viewer > Applications and Services Logs > Microsoft > Windows > PeerDist` | No unauthorized peer connections; no content integrity failures |
| 10 | Spot-check that only approved file/web server content is being cached | Review `netsh branchcache show localcache` content references | Cached content sourced from authorized servers only |
| 11 | Document all findings in findings log below | — | All discrepancies recorded |
| 12 | Sign and date MRC; file as CM-7 / SC-8 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## BranchCache Deployment Inventory (Complete at time of check)

| Hostname / Segment | Authorized? | Mode | Service Status | Cache Size | Notes |
|-------------------|-------------|------|---------------|-----------|-------|
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

---

## Non-Compliance / Findings Log

| # | Finding Description | System / Segment Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|--------------------------|-----------------|-----------|-----------  |--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- BranchCache on Unauthorized Systems: [ ] None found  [ ] Found — ISSM notified
- Operating Mode Compliant: [ ] Yes  [ ] No — ISSM notified
- GPO Applied Correctly: [ ] Yes  [ ] No — documented
- Cache Size Within Limits: [ ] Yes  [ ] No — documented
- Unauthorized Peer Connections: [ ] None  [ ] Detected — ISSM notified
- Systems checked: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
