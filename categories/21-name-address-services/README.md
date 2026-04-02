# Category 21 — Name & Address Services

Name and address services provide the foundational network infrastructure that allows all systems to find and communicate with each other. In a SAP environment, failures or misconfigurations in DNS, DHCP, or IPAM can silently break authentication, logging, patching, and every other critical function — making this category a high-priority maintenance target.

---

## Services in This Category

| Service | Role | Risk if Unhealthy |
|---------|------|-------------------|
| **DNS Server** | Resolves hostnames to IP addresses; required by AD, Kerberos, audit logging, patching | Authentication failures, broken audit trails, unreachable systems |
| **DHCP Server** | Assigns IP addresses and network configuration to clients | Clients lose network access; scope exhaustion causes outages |
| **IPAM** (IP Address Management) | Centralized tracking and management of IP space, DNS records, and DHCP scopes | Conflicting addresses, unauthorized devices, loss of visibility |

---

## JSIG Applicability
All tasks require written ISSM authorization (MA-2) and are retained as Body of Evidence (BoE) artifacts for the ATO package and ConMon program. DNS integrity is directly tied to AU-8 (time stamps) and AU-9 (audit log reliability).

## Applicable JSIG / NIST SP 800-53 Controls

| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| SC-20 | Secure Name/Address Resolution Service (Authoritative Source) | Required — authenticated, validated DNS responses |
| SC-21 | Secure Name/Address Resolution Service (Recursive/Caching) | Required — DNS clients validate responses |
| SC-22 | Architecture and Provisioning for Name/Address Resolution Service | Required — DNS redundancy and fault tolerance |
| CM-6 | Configuration Settings | DNS/DHCP/IPAM configuration maintained per approved baseline |
| CM-7 | Least Functionality | No unauthorized DNS zones, forwarders, or DHCP options |
| AU-8 | Time Stamps | DNS must resolve correctly for reliable audit timestamps |
| AU-9 | Protection of Audit Information | DNS/DHCP logs must be protected and retained |
| AC-3 | Access Enforcement | IPAM access restricted to authorized administrators |
| SI-12 | Information Management and Retention | DHCP lease logs retained per policy |

## JSIG-Specific Notes
- Unauthorized DNS forwarders or conditional forwarders on SAP systems are a CM-7 / SC-20 violation — must be reported to ISSM.
- DHCP scope exhaustion on a SAP segment must be escalated to ISSM/ISSO immediately — clients losing network access can affect security functions.
- IPAM provides the authoritative record of what devices are on the network; unauthorized entries must be investigated and reported.
- DNS changes are configuration changes requiring CCB approval (CM-3) — no zone or record modifications without an approved Change Request.

## MRCs in This Category

| MRC ID | Title | Periodicity |
|--------|-------|-------------|
| MRC-2101-DA | Daily DNS Server Health and Zone Integrity Verification | Daily |
| MRC-2102-WK | Weekly DHCP Server Health and Scope Utilization Review | Weekly |
| MRC-2103-MO | Monthly IPAM Audit and Address Space Reconciliation | Monthly |

> See stub files in this directory. Use the AI prompt pattern in the root README to generate tool-specific `.docx` cards for any MRC in this category.
