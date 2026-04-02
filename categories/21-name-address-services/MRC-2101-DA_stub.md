---
mrc_id: MRC-2101-DA
title: Daily DNS Server Health and Zone Integrity Verification
category: 21 — Name & Address Services
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:20"
rin: DA-DNS-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "DNS Manager MMC (dnsmgmt.msc), PowerShell (DnsServer module), Event Viewer, dcdiag /test:dns"
jsig_controls: "SC-20, SC-21, SC-22, CM-6, CM-7, AU-8, AU-9"
non_tailorable: "N/A — No non-tailorable controls in this category (verify against site-specific JSIG annex)"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no zone, record, or forwarder changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
The DNS (Domain Name System) Server translates human-readable hostnames (e.g., `SERVER01.domain.local`) into IP addresses that computers use to communicate. In a SAP environment, every single function — user logins (Kerberos), Group Policy, antivirus updates, patching, and audit logging — relies on DNS resolving correctly. If DNS breaks, systems may silently fail to authenticate, log, or communicate, with no obvious error message to the user. This card verifies that the DNS service is running, zones are healthy, no unauthorized records or forwarders have been added, and the DNS event log is clean.

## Safety / Hazards
JSIG: Do not add, modify, or delete DNS zones, records, or forwarders without a CCB-approved Change Request and ISSM written authorization. Unauthorized DNS modifications are a CM-7 / SC-20 violation. Any DNS service failure affecting authentication or audit logging must be reported to ISSM immediately.

## Tools / Equipment / Access Required
- DNS Manager MMC — `dnsmgmt.msc` (run as DNS Admin or delegated account)
- PowerShell with DnsServer module (`Import-Module DnsServer`)
- Event Viewer — `eventvwr.msc` on DNS server(s)
- `dcdiag /test:dns` — AD-integrated DNS diagnostic
- `nslookup` — DNS query tool (built-in)
- `Resolve-DnsName` — PowerShell DNS query cmdlet
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — SC-20, SC-21, SC-22, CM-6, CM-7, AU-8, AU-9
- DISA STIG — Windows Server DNS benchmark (latest release)
- DISA STIG — Active Directory Domain benchmark (DNS section)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM/ISSO notification required for: DNS service failure, unauthorized forwarder or conditional forwarder discovered, zone transfer to unauthorized server, or unauthorized DNS record additions.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to all DNS server(s) in the environment
- Approved DNS zone and forwarder baseline (from ISSM authorization records)

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Verify DNS Server service is running on all DNS servers | `Get-Service DNS -ComputerName [DNS-SERVER]` | Status: Running on all servers |
| 2 | Run AD-integrated DNS diagnostic | `dcdiag /test:dns /v` on Domain Controller | All DNS tests pass; zero failures |
| 3 | Verify forward lookup zones are present and authoritative | `dnsmgmt.msc` > `Forward Lookup Zones` — confirm all expected zones listed | All zones present; no unexpected zones |
| 4 | Check for unauthorized zones (stub, secondary, or forward zones) | `dnsmgmt.msc` > `Forward Lookup Zones` and `Reverse Lookup Zones` — compare to baseline | Zone list matches baseline; no unauthorized additions |
| 5 | Verify DNS forwarders match approved baseline | `dnsmgmt.msc` > right-click server > `Properties` > `Forwarders` tab | Forwarder IPs match approved list; no unauthorized forwarders |
| 6 | Check for unauthorized conditional forwarders | `dnsmgmt.msc` > `Conditional Forwarders` — compare to baseline | Conditional forwarders match baseline; none unauthorized |
| 7 | Verify zone transfers are restricted to authorized servers | `dnsmgmt.msc` > right-click each zone > `Properties` > `Zone Transfers` tab | Zone transfers disabled or restricted to authorized secondary DNS IPs only |
| 8 | Test DNS resolution for key internal records | `Resolve-DnsName [DOMAIN-CONTROLLER-FQDN]`; `Resolve-DnsName [KEY-SERVER-FQDN]` | All key records resolve correctly |
| 9 | Test reverse DNS resolution | `Resolve-DnsName [IP-ADDRESS] -Type PTR` for a known host | PTR record resolves to expected hostname |
| 10 | Review DNS event logs for errors (last 24 hours) | `Event Viewer > Windows Logs > DNS Server` — IDs: 408, 501, 507, 6702, 7062 | No critical DNS events; warnings documented |
| 11 | Document any findings in findings log below | — | All discrepancies recorded |
| 12 | Sign and date MRC; file as SC-20 / AU-8 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Non-Compliance / Findings Log

| # | Finding Description | DNS Server / Zone Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|--------------------------|-----------------|-----------|-----------  |--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- DNS Service: [ ] Running on all servers  [ ] Failure — ISSM notified
- Unauthorized Zones: [ ] None  [ ] Found — ISSM notified
- Unauthorized Forwarders: [ ] None  [ ] Found — ISSM notified immediately
- Zone Transfer Restrictions: [ ] Compliant  [ ] Not restricted — remediated
- Key Record Resolution: [ ] All resolved  [ ] Failures — documented
- DNS Servers checked: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
