---
mrc_id: MRC-2102-WK
title: Weekly DHCP Server Health and Scope Utilization Review
category: 21 — Name & Address Services
periodicity: WEEKLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:25"
rin: WK-DHCP-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "DHCP Manager MMC (dhcpmgmt.msc), PowerShell (DhcpServer module), Event Viewer"
jsig_controls: "CM-6, CM-7, AU-9, SC-22, SI-12, AC-3"
non_tailorable: "N/A — No non-tailorable controls in this category (verify against site-specific JSIG annex)"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no scope, reservation, or option changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
The DHCP (Dynamic Host Configuration Protocol) Server automatically assigns IP addresses, subnet masks, default gateways, and DNS server addresses to network clients when they connect. In a SAP environment, every workstation, server, and approved device may rely on DHCP to obtain its network configuration. If a DHCP scope runs out of available addresses (scope exhaustion), new or rebooting systems will fail to obtain network access — which can prevent logins, patching, and security monitoring from functioning. This card verifies that the DHCP service is healthy, all scopes are operating normally, utilization is not approaching exhaustion, and no unauthorized scopes or rogue DHCP servers have appeared.

## Safety / Hazards
JSIG: Do not add, modify, or delete DHCP scopes, reservations, exclusions, or server options without a CCB-approved Change Request and ISSM written authorization. Unauthorized DHCP changes are a CM-6 / CM-7 violation. A rogue or unauthorized DHCP server on a SAP network must be reported to ISSM immediately — it represents a potential man-in-the-middle threat.

## Tools / Equipment / Access Required
- DHCP Manager MMC — `dhcpmgmt.msc` (run as DHCP Admin or delegated account)
- PowerShell with DhcpServer module (`Import-Module DhcpServer`)
- Event Viewer — `eventvwr.msc` on DHCP server(s)
- Network documentation / IPAM console (if available) — for authorized scope baseline
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — CM-6, CM-7, AU-9, SC-22, SI-12, AC-3
- DISA STIG — Windows Server DHCP benchmark (latest release)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List
- Site-specific network address plan / IPAM baseline

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM/ISSO notification required for: DHCP service failure, any scope ≥ 85% utilized, rogue/unauthorized DHCP server detected, or unauthorized scope additions.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to DHCP server(s) and DHCP Admin MMC
- Approved DHCP scope baseline (scope names, ranges, authorized servers)

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Verify DHCP Server service is running | `Get-Service DHCPServer -ComputerName [DHCP-SERVER]`; or `dhcpmgmt.msc` | Status: Running |
| 2 | Verify DHCP server is authorized in Active Directory | `dhcpmgmt.msc` — server should show no red icon; or: `Get-DhcpServerInDC` | Server listed as authorized; no unauthorized servers in list |
| 3 | Review all active DHCP scopes | `dhcpmgmt.msc` > expand server > `IPv4` — review all scopes listed | Scopes match approved baseline; no unauthorized scopes |
| 4 | Check scope utilization for each active scope | `dhcpmgmt.msc` > right-click each scope > `Display Statistics`; or: `Get-DhcpServerv4ScopeStatistics -ComputerName [SERVER]` | Utilization < 85%; document any scope ≥ 85% — notify ISSM |
| 5 | Check for scopes approaching exhaustion (≥ 85% used) | Review `PercentageInUse` from statistics; sort by utilization descending | Action required if any scope ≥ 85% — document and notify ISSM/ISSO |
| 6 | Review DHCP lease log for unexpected or unauthorized clients | `dhcpmgmt.msc` > scope > `Address Leases` — compare MAC addresses to authorized device baseline | No unknown MAC addresses; unauthorized clients documented |
| 7 | Check DHCP server options (003 Router, 006 DNS, 015 Domain) | `dhcpmgmt.msc` > `Server Options` or `Scope Options` — verify values | Options match approved baseline; no unauthorized values |
| 8 | Verify DHCP failover configuration (if configured) | `Get-DhcpServerv4Failover -ComputerName [SERVER]` | Failover partner reachable; state is `Normal` |
| 9 | Review DHCP event logs for errors (last 7 days) | `Event Viewer > Windows Logs > System` — source: `DhcpServer`; IDs: 1008, 1016, 1020, 10009 | No scope exhaustion, service errors, or rogue detection events |
| 10 | Verify DHCP audit log is enabled and accessible | `dhcpmgmt.msc` > right-click server > `Properties` > `Advanced` tab — confirm `Enable audit logging` is checked | Audit logging enabled; log files present in `%windir%\System32\dhcp\` |
| 11 | Document any findings in findings log below | — | All discrepancies recorded |
| 12 | Sign and date MRC; file as CM-6 / AU-9 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Scope Utilization Summary (Complete at time of check)

| Scope Name | Scope Range | Total IPs | In Use | Available | % Used | Action Required |
|------------|------------|-----------|--------|-----------|--------|----------------|
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |

---

## Non-Compliance / Findings Log

| # | Finding Description | Scope / Server Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|-----------------------|-----------------|-----------|-----------  |--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- DHCP Service: [ ] Running  [ ] Down — ISSM notified
- DHCP Authorization: [ ] Authorized in AD  [ ] Unauthorized server found — ISSM notified immediately
- Scope Utilization: [ ] All < 85%  [ ] One or more ≥ 85% — ISSM/ISSO notified
- Unauthorized Scopes: [ ] None  [ ] Found — ISSM notified
- Rogue DHCP Activity: [ ] None  [ ] Detected — ISSM notified immediately
- Audit Logging: [ ] Enabled  [ ] Disabled — remediated
- Scopes checked: ___  Scopes ≥ 85%: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
