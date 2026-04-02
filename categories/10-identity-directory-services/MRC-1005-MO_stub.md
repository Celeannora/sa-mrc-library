---
mrc_id: MRC-1005-MO
title: Monthly Active Directory Certificate Services (AD CS) Health and Certificate Authority Audit
category: 10 — Identity & Directory Services
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "01:00"
rin: MO-ADCS-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Certification Authority MMC (certsrv.msc), Certificate Templates Console (certtmpl.msc), PKIView.msc, PowerShell (PKI module), Event Viewer"
jsig_controls: "SC-12, SC-17, IA-5(2), CM-6, AU-9, IA-3"
non_tailorable: "N/A — No non-tailorable controls in this category (verify against site-specific JSIG annex)"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no certificate issuance or template changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Active Directory Certificate Services (AD CS) is the internal Public Key Infrastructure (PKI) that issues digital certificates to users, computers, and services in the domain. In a SAP environment, AD CS is critical because smart card / CAC / PIV authentication, encrypted communications, and code signing all depend on valid certificates from a trusted CA. If the CA goes offline, expires, or issues certificates from a misconfigured template, authentication across the entire environment can fail. This card verifies that the CA is healthy, certificates are current, no rogue templates exist, and the CRL is being published on schedule.

## Safety / Hazards
JSIG: Do not modify CA configuration, certificate templates, or CRL publication schedules without a CCB-approved Change Request and ISSM written authorization. Unauthorized changes to AD CS represent a potential SC-12 / SC-17 violation. Any CA failure or compromise must be reported to ISSM immediately.

## Tools / Equipment / Access Required
- Certification Authority MMC — `certsrv.msc` (run as CA Admin or delegated account)
- Certificate Templates Console — `certtmpl.msc`
- PKI Health tool — `pkiview.msc`
- PowerShell with PKI module (`Import-Module PSPKI` or native cmdlets)
- Event Viewer — `eventvwr.msc` on CA server
- Web browser — access to CDP (CRL Distribution Point) URL
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — SC-12, SC-17, IA-5(2), CM-6, AU-9
- DISA STIG — Windows Server Active Directory Certificate Services benchmark
- NIST SP 800-57 (Key Management recommendations)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: CA service failure, certificate template unauthorized changes, CRL publication failure, or CA certificate nearing expiration (< 90 days).

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to CA server and CA Admin MMC
- Current certificate inventory / baseline (previous MRC for comparison)

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Open Certification Authority MMC on CA server | Run: `certsrv.msc` | CA console loads; CA name displayed |
| 2 | Verify CA service is running | Check green icon in `certsrv.msc`; or: `Get-Service certsvc` | Status: Running |
| 3 | Check CA certificate expiration date | `certsrv.msc` > right-click CA name > `Properties` > `General` tab | Expiry > 90 days; document if < 90 days — notify ISSM |
| 4 | Verify CRL publication is current | `pkiview.msc` — check CRL status for Root CA and Issuing CA | CRL status: OK; no expired or missing CRLs |
| 5 | Check CRL validity period remaining | `certutil -CRL` on CA server | Next publish scheduled; current CRL not expired |
| 6 | Review issued certificates (last 30 days) | `certsrv.msc` > `Issued Certificates` — filter by date issued | No unexpected certificate issuances; all requesters authorized |
| 7 | Check for pending or failed certificate requests | `certsrv.msc` > `Pending Requests` and `Failed Requests` | Pending queue cleared; failed requests documented |
| 8 | Audit certificate templates for unauthorized changes | `certtmpl.msc` — compare templates to approved baseline | No unauthorized templates; no template modifications |
| 9 | Verify template security permissions (no over-permissioned enrollment) | `certtmpl.msc` > right-click template > `Properties` > `Security` | Only authorized groups have Enroll/Autoenroll rights |
| 10 | Check CA event logs for errors or warnings (last 30 days) | `Event Viewer > Windows Logs > Application` — source: `CertSvc`; IDs: 9, 36, 70, 74, 99, 100 | No critical CA events |
| 11 | Verify CDP (CRL Distribution Point) URLs are accessible | Browse to CDP URL listed in CA properties; or `certutil -URL [cert]` | CRL downloadable from all configured CDPs |
| 12 | Run overall PKI health check | `pkiview.msc` — review full enterprise PKI tree | All CAs green; no warnings or errors |
| 13 | Document all findings in findings log below | — | All discrepancies recorded |
| 14 | Sign and date MRC; file as SC-12 / SC-17 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Non-Compliance / Findings Log

| # | Finding Description | CA / System Affected | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|--------------------|--------------------|-----------------|-------------|-------------|--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- CA Service: [ ] Running  [ ] Down — ISSM notified
- CA Certificate Expiry: [ ] > 90 days  [ ] < 90 days — ISSM notified  [ ] Expired — STOP
- CRL Publication: [ ] Current  [ ] Overdue — ISSM notified
- Unauthorized Template Changes: [ ] None  [ ] Detected — ISSM notified
- Unexpected Certificate Issuances: [ ] None  [ ] Found — documented
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
