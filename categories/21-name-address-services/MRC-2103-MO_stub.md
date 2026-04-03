---
mrc_id: MRC-2103-MO
title: Monthly IPAM Audit and Address Space Reconciliation
category: 21 — Name & Address Services
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:45"
rin: MO-IPAM-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "IPAM management console or CLI ([SITE-DESIGNATED IPAM PLATFORM]), DHCP management console, DNS management console"
jsig_controls: "CM-6, CM-7, AC-3, AC-17, AU-9, SC-20, SC-22, SI-12"
non_tailorable: "N/A — No non-tailorable controls in this category (verify against site-specific JSIG annex)"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only audit; no IP block, scope, or record changes without CCB approval"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
IP Address Management (IPAM) is a centralized system that tracks and manages the allocation of IP address space across the network — including which IP ranges are assigned, what devices are using which addresses, and how DHCP scopes and DNS records are coordinated. In a SAP environment, IPAM is the authoritative record of what devices are permitted on the network. An unauthorized device obtaining an IP address is a potential security incident. This card performs a monthly reconciliation — verifying that all IP allocations are authorized, the IPAM database is accurate and consistent with DHCP and DNS, and no unauthorized address blocks or devices are present.

## Safety / Hazards
JSIG: Do not modify IP address blocks, scope assignments, or IPAM-managed DNS records without a CCB-approved Change Request and ISSM written authorization. Discovery of any unauthorized device with an active IP lease or IPAM record must be reported to ISSM immediately — it may indicate an unauthorized access or hardware introduction (PE-3 / CM-8 concern).

## Tools / Equipment / Access Required
- Windows IPAM Console — `Server Manager > IPAM` or `ipamgc.msc` (if available)
- PowerShell with IPAM module (`Import-Module IpamServer`)
- DHCP Manager MMC — `dhcpmgmt.msc` (for cross-reference)
- DNS Manager MMC — `dnsmgmt.msc` (for cross-reference)
- Authorized device / network address baseline (from ISSM and network documentation)
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — CM-6, CM-7, AC-3, AU-9, SC-20, SC-22, SI-12
- DISA STIG — Windows Server IPAM benchmark (if applicable)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List
- Site-specific Network Architecture Document / IP Address Plan (ISSM-authorized)

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: unauthorized device/IP lease discovered, IP block additions not on the authorized address plan, IPAM-to-DHCP/DNS discrepancies that cannot be reconciled, or IPAM service failure.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to IPAM server console
- Current authorized IP address plan / network baseline document
- Previous month's IPAM audit (for comparison)

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Open IPAM console and verify IPAM service is healthy | `Server Manager > IPAM` or `Get-IpamServerConfiguration` | IPAM server accessible; no service errors |
| 2 | Verify IPAM is syncing with all managed DHCP servers | `IPAM console > Server Inventory` — check status for each DHCP server; or: `Get-IpamDiscoveryDomain` | All managed DHCP servers showing `Continuously Managed`; no sync errors |
| 3 | Verify IPAM is syncing with all managed DNS servers | `IPAM console > Server Inventory` — check status for each DNS server | All managed DNS servers showing `Continuously Managed`; no sync errors |
| 4 | Review IP address blocks — confirm all blocks are authorized | `IPAM console > IP Address Space > IP Address Blocks` — compare to authorized address plan | All blocks on approved plan; no unauthorized blocks |
| 5 | Review IP address ranges — confirm utilization and assignments | `IPAM console > IP Address Space > IP Address Ranges` — check each range's utilization and owner | All ranges assigned to authorized scopes; utilization documented |
| 6 | Identify any overlapping or duplicate IP address ranges | Review for overlapping entries in IPAM address space view | No overlaps or duplicates; conflicts documented and escalated |
| 7 | Review active IP address inventory — check for unauthorized devices | `IPAM console > IP Address Space > IP Addresses` — sort by `Assignment Type` or last-seen date; cross-reference MAC addresses against authorized device baseline | No unauthorized MAC addresses or hostnames; unknown devices escalated to ISSM immediately |
| 8 | Cross-verify DHCP leases match IPAM records | Compare IPAM active leases against `Get-DhcpServerv4Lease` output for each scope | Leases consistent; discrepancies documented |
| 9 | Cross-verify DNS records match IPAM records | Compare IPAM DNS data against `dnsmgmt.msc` zone contents for key hosts | DNS records consistent with IPAM; orphaned or stale records documented |
| 10 | Review IPAM event catalog for operational issues (last 30 days) | `IPAM console > Event Catalog` | No unresolved DHCP/DNS operational events |
| 11 | Check for stale IP address records (devices not seen in > 30 days) | Filter IPAM IP Address inventory by `Last Seen` < 30 days ago | Stale records reviewed; decommissioned devices removed from tracking (with CCB approval) |
| 12 | Verify IPAM role-based access — only authorized admins have write access | `IPAM console > Access Control` — review user/group assignments | Only authorized administrators have Operator or Administrator role; read-only for auditors |
| 13 | Document all findings in findings log below | — | All discrepancies recorded |
| 14 | Sign and date MRC; file as CM-6 / CM-8 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Address Space Summary (Complete at time of check)

| IP Block / Range | CIDR | Authorized Owner | % Used | Status | Notes |
|-----------------|------|-----------------|--------|--------|-------|
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

---

## Non-Compliance / Findings Log

| # | Finding Description | Block / Device / System Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|---------------------------------|-----------------|-----------|-----------  |--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- IPAM Service: [ ] Healthy  [ ] Errors — documented
- DHCP Sync: [ ] All servers syncing  [ ] Sync failure — documented
- DNS Sync: [ ] All servers syncing  [ ] Sync failure — documented
- Unauthorized IP Blocks: [ ] None  [ ] Found — ISSM notified
- Unauthorized Devices / Leases: [ ] None  [ ] Found — ISSM notified immediately
- IPAM-DHCP Discrepancies: [ ] None  [ ] Found — documented
- IPAM-DNS Discrepancies: [ ] None  [ ] Found — documented
- Stale Records Reviewed: [ ] Y  [ ] N
- IP Blocks audited: ___  Unauthorized found: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
