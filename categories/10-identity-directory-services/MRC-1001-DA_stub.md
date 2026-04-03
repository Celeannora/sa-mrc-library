---
mrc_id: MRC-1001-DA
title: "Daily Domain Controller Replication, Health Check, DNS Zone Integrity, and DHCP Scope Review"
category: "10 — Identity & Directory Services"
periodicity: Daily
est_time: "20–30 minutes"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Directory services replication and health tools ([SITE-DESIGNATED DIRECTORY PLATFORM CLI — e.g., repadmin, dcdiag or equivalent]), DNS management console, directory management console"
jsig_controls:
  - AU-2
  - IA-2
  - SC-20
  - SC-21
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1001-DA — Daily DC Replication, Health Check, DNS Zone Integrity, and DHCP Scope Review

---

## 1. Background (New SA)

**Why directory services health is a daily check:**
The [SITE-DESIGNATED DIRECTORY PLATFORM] is the foundation of every authentication, authorization, and policy function in the environment. If replication breaks between directory servers, one server may have stale data — wrong passwords, old policies, missing accounts. In a SAP environment, a broken directory server means failed authentication, and failed authentication means the SA can't do their job — or worse, it creates security gaps.

**Three components:**

1. **Directory Replication Health (Script-assisted):** The site-designated replication health tool provides a summary of replication status across all directory servers. A helper script may also consolidate this output into a single report.

2. **DNS Zone Integrity:** DNS is how every host finds every other host. Missing or stale DNS records can break services silently. This check verifies key records exist and resolve correctly.

3. **DHCP Scope Review (Baseline):** DHCP scope utilization is reviewed to ensure no scope is exhausted and no unexpected leases are present — unexpected leases can indicate unauthorized devices.

---

## 2. Safety / Hazards

> ⚠️ **REPLICATION FAILURE > 30 MINUTES:** Directory replication failure lasting more than 30 minutes is a Tier 2 escalation to ISSO. If it extends to data corruption or lingering object conditions, notify ISSM immediately — data integrity may be compromised.

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** ISSM written authorization required (MA-2).

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| `invoke-dc-health.[SITE-SCRIPT-EXT]` | Library script — `scripts/invoke-dc-health.[SITE-SCRIPT-EXT]` — if deployed at this site |
| Directory replication tool | [SITE-DESIGNATED DIRECTORY PLATFORM] replication health utility (e.g., repadmin, or platform equivalent) |
| Directory health diagnostic tool | [SITE-DESIGNATED DIRECTORY PLATFORM] health diagnostic tool (e.g., dcdiag, or platform equivalent) |
| DNS management console | [SITE-DESIGNATED DNS MANAGEMENT METHOD] |
| DHCP management console | [SITE-DESIGNATED DHCP MANAGEMENT METHOD] |
| Directory administrative credentials | Required for replication tools, DNS, and DHCP management |

---

## 4. Procedure Steps

### Phase 1 — DC Replication Health

| Step | Action | Command | Expected Result |
|------|--------|---------|-----------------|
| 1 | Run directory health script (if deployed) | Execute `invoke-dc-health.[SITE-SCRIPT-EXT]` at [SITE-DESIGNATED SCRIPT PATH] | Consolidated report: replication status, directory service health, DNS for all servers — or proceed to Step 2 if script not deployed |
| 2 | Run replication summary | Execute replication health utility ([SITE-DESIGNATED TOOL — e.g., repadmin /replsummary or platform equivalent]) | All directory servers: 0 failures, 0 consecutive failures |
| 3 | Check for replication errors | Run detailed replication report ([SITE-DESIGNATED TOOL — e.g., repadmin /showrepl or platform equivalent]) → export or review output | No ERROR entries in output |
| 4 | Run directory health diagnostics on each server | Execute directory health diagnostic tool ([SITE-DESIGNATED TOOL — e.g., dcdiag or platform equivalent]) with replication, netlogon, and role-master tests | All tests: passed |
| 5 | Verify policy/SYSVOL replication state | Check SYSVOL or equivalent policy replication state via [SITE-DESIGNATED TOOL — e.g., dfsrdiag or platform equivalent] on each server | Replication state: Normal on all servers |
| 6 | Verify authentication and logon service running on all directory servers | Check Netlogon or equivalent authentication service status via remote or local service management | Status: Running on all servers |
| 7 | Any replication error or failed directory health diagnostic test | Document immediately; notify ISSO; if > 30 min = Tier 2 escalation | Finding logged |

### Phase 2 — DNS Zone Integrity

| Step | Action | Command | Expected Result |
|------|--------|---------|-----------------|
| 8 | Verify DNS service running on DNS server(s) | Check DNS service status via [SITE-DESIGNATED MANAGEMENT METHOD] | Status: Running |
| 9 | Test name resolution — domain name | Use DNS query tool (e.g., Resolve-DnsName, nslookup, dig, or equivalent) → query SOA record for the domain FQDN | SOA record resolves to correct directory server |
| 10 | Test key A records | Use DNS query tool → resolve hostname of each critical server | All records resolve to correct IP |
| 11 | Test SRV records (Kerberos, LDAP) | Use DNS query tool → query SRV records for Kerberos and LDAP (e.g., `_kerberos._tcp.[domain]`, `_ldap._tcp.[domain]`) | SRV records resolve to correct directory servers |
| 12 | Check for DNS zone transfer restrictions | DNS management console → zone properties → zone transfers settings | Transfers restricted to authorized secondary DNS servers only |
| 13 | Any missing or incorrect DNS record | Document; investigate; notify ISSO | Finding logged |

### Phase 3 — DHCP Scope Baseline Review

| Step | Action | Command | Expected Result |
|------|--------|---------|-----------------|
| 14 | Open DHCP management console | [SITE-DESIGNATED DHCP MANAGEMENT METHOD] | DHCP console loads |
| 15 | Review each scope — leases in use vs. total | DHCP console → server → scope statistics | No scope above 85% utilization |
| 16 | Review active leases — spot-check for unexpected hostnames | DHCP console → scope → address leases | All leases match known managed hosts; no unexpected entries |
| 17 | Any unexpected lease (unknown hostname/MAC) | Document; investigate; notify ISSM — potential unauthorized device | Finding logged |
| 18 | Any scope above 85% utilization | Document; notify ISSO; plan scope expansion or address reclamation | Finding logged |

---

## 8. Daily DC / DNS / DHCP Status Table

| # | Directory Server | Replication | Health Check | Policy Replication | DNS Res. | DHCP Scope | Result | Notes |
|---|------------|------------|--------|--------|---------|-----------|--------|-------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |

*Result: OK / FINDING / INVESTIGATE*

---

## 9. Non-Compliance / Findings Log

| # | Host / Service | Finding | ISSO/ISSM Notified | Time | Action Taken | Resolved |
|---|---------------|---------|-------------------|------|-------------|---------|
| 1 | | | | | | |

---

## 10. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1001-DA | Rev 1.0 | Category 10 — Identity & Directory Services*
*Classification: [CLASSIFICATION]*
