---
mrc_id: MRC-1001-DA
title: "Daily Domain Controller Replication, Health Check, DNS Zone Integrity, and DHCP Scope Review"
category: "10 — Identity & Directory Services"
periodicity: Daily
est_time: "20–30 minutes"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "repadmin, dcdiag, PowerShell, ADUC, DNS Manager, DHCP Manager"
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

**Why Active Directory health is a daily check:**
Active Directory (AD) is the foundation of every authentication, authorization, and Group Policy function in the environment. If AD replication breaks between domain controllers, one DC may have stale data — wrong passwords, old GPOs, missing accounts. In a SAP environment, a broken DC means failed authentication, and failed authentication means the SA can't do their job — or worse, it creates security gaps.

**Three components:**

1. **DC Replication Health (Script-assisted):** `repadmin /replsummary` gives a fast summary of replication status across all DCs. `dcdiag` runs a comprehensive suite of DC health tests. A helper script runs both and outputs a single report.

2. **DNS Zone Integrity:** DNS is how every host finds every other host. Missing or stale DNS records can break services silently. This check verifies key records exist and resolve correctly.

3. **DHCP Scope Review (Baseline):** DHCP scope utilization is reviewed to ensure no scope is exhausted and no unexpected leases are present — unexpected leases can indicate unauthorized devices.

---

## 2. Safety / Hazards

> ⚠️ **REPLICATION FAILURE > 30 MINUTES:** AD replication failure lasting more than 30 minutes is a Tier 2 escalation to ISSO. If it extends to USN rollback or lingering objects, notify ISSM immediately — data integrity may be compromised.

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** ISSM written authorization required (MA-2).

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| `Invoke-DCHealthCheck.ps1` | Library script — `scripts/Invoke-DCHealthCheck.ps1` |
| `repadmin` | Built-in Windows tool — run on DC or admin workstation |
| `dcdiag` | Built-in Windows tool — run on each DC |
| DNS Manager | Server Manager → DNS |
| DHCP Manager | Server Manager → DHCP |
| Domain Admin credentials | Required for repadmin, dcdiag, DNS, DHCP |

---

## 4. Procedure Steps

### Phase 1 — DC Replication Health

| Step | Action | Command | Expected Result |
|------|--------|---------|-----------------|
| 1 | Run DC health script | `.\Invoke-DCHealthCheck.ps1` | Consolidated report: replication status, SYSVOL, NETLOGON, DNS for all DCs |
| 2 | Run replication summary | `repadmin /replsummary` | All DCs: `0 failures`, `0 consecutive failures` |
| 3 | Check for replication errors | `repadmin /showrepl * /csv > repl-report.csv` | No ERROR entries in CSV output |
| 4 | Run dcdiag on each DC | `dcdiag /test:replications /test:netlogons /test:fsmocheck /test:ridmanager` | All tests: `passed` |
| 5 | Verify SYSVOL replication (DFS-R) | `dfsrdiag ReplicationState /member:[dcname]` | State: `4 (Normal)` on all DCs |
| 6 | Verify NETLOGON service running on all DCs | `Get-Service -ComputerName [all DCs] -Name Netlogon` | Status: `Running` |
| 7 | Any replication error or failed dcdiag test | Document immediately; notify ISSO; if > 30 min = Tier 2 escalation | Finding logged |

### Phase 2 — DNS Zone Integrity

| Step | Action | Command | Expected Result |
|------|--------|---------|-----------------|
| 8 | Verify DNS service running on DNS server(s) | `Get-Service -ComputerName [dns-server] -Name DNS` | Status: `Running` |
| 9 | Test name resolution — domain name | `Resolve-DnsName [domain FQDN] -Type SOA` | SOA record resolves to correct DC |
| 10 | Test key A records | `Resolve-DnsName [server1.domain.fqdn]` — repeat for all critical servers | All records resolve to correct IP |
| 11 | Test SRV records (Kerberos, LDAP) | `Resolve-DnsName _kerberos._tcp.[domain] -Type SRV` | Kerberos SRV records resolve to correct DCs |
| 12 | Check for DNS zone transfer restrictions | DNS Manager → Zone Properties → Zone Transfers | Transfers restricted to authorized secondary DNS servers only |
| 13 | Any missing or incorrect DNS record | Document; investigate; notify ISSO | Finding logged |

### Phase 3 — DHCP Scope Baseline Review

| Step | Action | Command | Expected Result |
|------|--------|---------|-----------------|
| 14 | Open DHCP Manager | Server Manager → Tools → DHCP | DHCP console loads |
| 15 | Review each scope — leases in use vs. total | DHCP → [Server] → IPv4 → [Scope] → Scope properties → Statistics | No scope above 85% utilization |
| 16 | Review active leases — spot-check for unexpected hostnames | DHCP → [Scope] → Address Leases | All leases match known managed hosts; no unexpected entries |
| 17 | Any unexpected lease (unknown hostname/MAC) | Document; investigate; notify ISSM — potential unauthorized device | Finding logged |
| 18 | Any scope above 85% utilization | Document; notify ISSO; plan scope expansion or address reclamation | Finding logged |

---

## 8. Daily DC / DNS / DHCP Status Table

| # | DC / Server | Replication | dcdiag | SYSVOL | DNS Res. | DHCP Scope | Result | Notes |
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
