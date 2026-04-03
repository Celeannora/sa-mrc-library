---
mrc_id: MRC-1006-MO
title: Monthly Active Directory Federation Services (AD FS) Health and Token Configuration Audit
category: 10 — Identity & Directory Services
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:45"
rin: MO-ADFS-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Federation services management console ([SITE-DESIGNATED FEDERATION PLATFORM]), federation PowerShell or CLI module, OS event log, web server management console"
jsig_controls: "IA-2, IA-8, IA-12, SC-8, SC-28, CM-6, AU-9"
non_tailorable: "N/A — No non-tailorable controls in this category (verify against site-specific JSIG annex)"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no relying party or claims rule changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Active Directory Federation Services (AD FS) provides federated identity — it allows users authenticated in one domain to access resources in a different domain or external application without re-entering credentials (single sign-on / SSO). In a SAP environment, AD FS may be used to bridge authentication to approved cloud services, partner enclaves, or cross-domain solutions. A misconfigured or compromised AD FS server can allow unauthorized access that bypasses normal authentication controls (IA-2). This card verifies that AD FS is running correctly, token-signing and token-decryption certificates are current, relying party trusts are authorized, and the service is logging correctly.

## Safety / Hazards
JSIG: Do not add, remove, or modify Relying Party Trusts, Claims Provider Trusts, or Claims Rules without a CCB-approved Change Request and ISSM written authorization. Any unauthorized trust or rule change is a potential IA-2 / SC-8 violation. Any AD FS service failure affecting authentication must be reported to ISSM immediately.

## Tools / Equipment / Access Required
- AD FS Management MMC — `adfs.msc` (run as AD FS Admin or delegated account)
- PowerShell with AD FS module (`Import-Module ADFS`)
- Event Viewer — `eventvwr.msc` on AD FS server
- IIS Manager — `inetmgr` (if AD FS is hosted on IIS)
- Web browser — to test federation metadata endpoint accessibility
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — IA-2, IA-8, SC-8, SC-28, CM-6, AU-9
- DISA STIG — Active Directory Federation Services benchmark (if applicable)
- NIST SP 800-63B — Digital Identity Guidelines
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List
- Site-specific Federation / Cross-Domain Solution authorization documentation

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: AD FS service failure, token certificate expiration (< 30 days), unauthorized Relying Party Trust additions, or failed authentication spikes.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to AD FS server and AD FS Admin MMC
- Approved Relying Party Trust baseline list (from ISSM/CCB authorization records)

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Open PowerShell as Administrator on AD FS server | Right-click Start > `Windows PowerShell (Admin)` | Elevated PS prompt |
| 2 | Verify AD FS service is running | `Get-Service adfssrv` | Status: Running |
| 3 | Check token-signing certificate expiration | `Get-AdfsCertificate -CertificateType Token-Signing` — check `NotAfter` | Expiry > 30 days; document if ≤ 30 days — notify ISSM |
| 4 | Check token-decryption certificate expiration | `Get-AdfsCertificate -CertificateType Token-Decrypting` — check `NotAfter` | Expiry > 30 days; document if ≤ 30 days — notify ISSM |
| 5 | Review all configured Relying Party Trusts | `Get-AdfsRelyingPartyTrust \| Select Name, Enabled, Identifier` | All trusts match approved CCB authorization list; no unauthorized trusts |
| 6 | Verify no disabled Relying Party Trusts that should be active | `Get-AdfsRelyingPartyTrust \| Where-Object {$_.Enabled -eq $false}` | Disabled trusts are authorized decommissions only |
| 7 | Review Claims Provider Trusts | `Get-AdfsClaimsProviderTrust \| Select Name, Enabled` | Only authorized claims providers configured |
| 8 | Verify AD FS endpoints are accessible | `Get-AdfsEndpoint \| Where-Object {$_.Enabled -eq $true}` | Only authorized endpoints enabled; no unexpected endpoints |
| 9 | Check AD FS audit / event logs (last 30 days) | `Event Viewer > Applications and Services Logs > AD FS > Admin` — IDs: 111, 172, 181, 324, 325, 403, 411 | No critical auth failures, token errors, or unexpected access |
| 10 | Review AD FS audit log for failed authentication attempts | `Event Viewer > AD FS > Admin` — filter: Event ID 342, 411 | Spikes in failures investigated and documented |
| 11 | Verify federation metadata endpoint is accessible (if external) | Browse to: `https://[ADFS-SERVER]/FederationMetadata/2007-06/FederationMetadata.xml` | Metadata accessible and current |
| 12 | Verify WAP (Web Application Proxy) health if configured | `Get-WebApplicationProxyApplication` on WAP server | All published applications authorized |
| 13 | Document all findings in findings log below | — | All discrepancies recorded |
| 14 | Sign and date MRC; file as IA-2 / SC-8 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Non-Compliance / Findings Log

| # | Finding Description | System / Trust Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|-----------------------|-----------------|-------------|-------------|--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- AD FS Service: [ ] Running  [ ] Down — ISSM notified
- Token-Signing Cert: [ ] > 30 days  [ ] ≤ 30 days — ISSM notified  [ ] Expired — STOP
- Token-Decryption Cert: [ ] > 30 days  [ ] ≤ 30 days — ISSM notified  [ ] Expired — STOP
- Unauthorized Relying Party Trusts: [ ] None  [ ] Found — ISSM notified
- Auth Failure Spike: [ ] No  [ ] Yes — investigated and documented
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
