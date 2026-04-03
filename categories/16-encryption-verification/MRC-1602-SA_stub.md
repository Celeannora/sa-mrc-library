---
mrc_id: MRC-1602-SA
title: "Semi-Annual Full Cryptographic Implementation Review"
category: "16 — Encryption Verification"
periodicity: Semi-Annual
est_time: "4–6 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Disk encryption management utility ([SITE-DESIGNATED ENCRYPTION TOOL]), TLS/cipher configuration tool, vulnerability scanner compliance plugins, STIG/SCAP compliance checker"
jsig_controls:
  - SC-28
  - SC-8
  - SC-13
  - IA-7
non_tailorable: true
non_tailorable_control: "SC-28 — Protection of Information at Rest"
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1602-SA — Semi-Annual Full Cryptographic Implementation Review

## ⚠️ NON-TAILORABLE CONTROL — SC-28
**Per JSIG:** Encryption of data at rest SHALL be implemented on all SAP systems. This semi-annual review extends the quarterly BitLocker check (MRC-1601-QR) to cover the full cryptographic posture — TLS versions, cipher suites, protocol enforcement, and FIPS module validation across all services.

---

## 1. Background (New SA)

**What is a cryptographic implementation review?**
Beyond simply checking that BitLocker is on (MRC-1601-QR), a full cryptographic review looks at every place the system uses encryption — network protocols (TLS), cipher suites, hash algorithms, key lengths, and the underlying FIPS 140-2 validated modules. In a SAP environment, using weak or deprecated cryptography is just as dangerous as having no encryption.

**What deprecated protocols look like:**
- TLS 1.0, TLS 1.1, SSL 2.0, SSL 3.0 — deprecated, prohibited in SAP environments
- MD5, SHA-1 for signing — deprecated
- RC4, DES, 3DES cipher suites — prohibited
- RSA keys under 2048-bit — deprecated

**Tools used:**
- **IIS Crypto** (GUI tool) — shows and configures TLS/cipher settings on Windows servers
- **PowerShell** — queries cipher suite order, TLS registry settings, SCHANNEL configuration
- **Nessus/ACAS** — automated detection of deprecated protocols and weak ciphers
- **SCAP/SCC** — STIG checks for cryptographic controls

---

## 2. Safety / Hazards

> ⚠️ **STOP WORK CONDITION:** If TLS 1.0/1.1 or SSL is found enabled on any in-scope service, document and notify the ISSM before disabling. Abrupt protocol changes may break operational services — ISSM must authorize remediation timing.

> ⚠️ **SC-28 FAILURE:** Any unencrypted volume discovered during supplemental checks is an immediate non-tailorable control failure. Stop work and notify ISSM.

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** This MRC requires ISSM written authorization (MA-2). Coordinate timing with ISSM at least 5 business days in advance — this is an extended maintenance window task.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| Domain Admin or equivalent | Remote admin access to all in-scope servers |
| IIS Crypto (Nartac Software) | Free tool — https://www.nartac.com/Products/IISCrypto |
| PowerShell (elevated) | Cipher suite enumeration, registry checks |
| Nessus / ACAS | Scan for deprecated protocols, weak ciphers |
| SCC / SCAP tool | STIG compliance checks for SC-13, SC-8 controls |
| FIPS 140-2 CMVP list | https://csrc.nist.gov/projects/cryptographic-module-validation-program |
| In-scope system inventory | All servers, domain controllers, IIS hosts |
| MRC Sign-Off Block | Signed by SA and ISSM/ISSO after completion |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| JSIG SC-8, SC-13, IA-7 Implementation Guidance | ISSM SharePoint / SAP Cybersecurity Binder |
| NIST SP 800-52 Rev 2 — TLS Guidelines | https://csrc.nist.gov/publications/detail/sp/800-52/rev-2/final |
| NIST SP 800-57 — Key Management | https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final |
| DISA TLS STIG | DISA IASE / STIG Library |
| Windows Server STIG — SCHANNEL requirements | DISA IASE / STIG Library |
| MRC-1601-QR | Quarterly BitLocker check (prerequisite review) |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 4–6 hours |
| ISSM / ISSO Review | 1 | 1 hour (findings review) |

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file
- [ ] MRC-1601-QR results from current quarter reviewed — no open SC-28 failures
- [ ] IIS Crypto tool installed on admin workstation
- [ ] ACAS/Nessus scan credentials valid and tested
- [ ] SCC/SCAP tool updated with current benchmark
- [ ] In-scope system inventory current

---

## 7. Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|-----------------|
| 1 | Review MRC-1601-QR results — confirm no open SC-28 findings | Prior MRC file | All BitLocker findings resolved or ISSM-directed |
| 2 | On each in-scope server, open IIS Crypto | Start → IISCrypto.exe (run as admin) | IIS Crypto GUI loads showing enabled protocols and cipher suites |
| 3 | Verify SSL 2.0 is disabled | IIS Crypto → Protocols tab → SSL 2.0 | Shows `Disabled` — red/unchecked |
| 4 | Verify SSL 3.0 is disabled | IIS Crypto → Protocols tab → SSL 3.0 | Shows `Disabled` |
| 5 | Verify TLS 1.0 is disabled | IIS Crypto → Protocols tab → TLS 1.0 | Shows `Disabled` |
| 6 | Verify TLS 1.1 is disabled | IIS Crypto → Protocols tab → TLS 1.1 | Shows `Disabled` |
| 7 | Verify TLS 1.2 is enabled | IIS Crypto → Protocols tab → TLS 1.2 | Shows `Enabled` |
| 8 | Verify TLS 1.3 is enabled (if OS supports) | IIS Crypto → Protocols tab → TLS 1.3 | Shows `Enabled` or N/A for older OS |
| 9 | Review enabled cipher suites | IIS Crypto → Cipher Suites tab | No RC4, DES, 3DES, NULL, or EXPORT cipher suites present |
| 10 | Verify AES-256 cipher suites are in priority order | Cipher Suites list | AES_256 suites listed above AES_128 suites |
| 11 | Check hash algorithms — SHA-1 for signing prohibited | IIS Crypto → Hashes tab | SHA-256 or higher enabled; SHA-1 disabled for signing |
| 12 | Run PowerShell cipher suite enumeration | `Get-TlsCipherSuite \| Select Name, Certificate` | Output reviewed for prohibited entries |
| 13 | Verify FIPS mode is enabled system-wide | `reg query HKLM\SYSTEM\CurrentControlSet\Control\Lsa\FipsAlgorithmPolicy /v Enabled` | Returns `0x1` (FIPS mode on) |
| 14 | Run Nessus/ACAS scan — TLS/SSL plugin family | ACAS → New Scan → Advanced → Plugin family: Service Detection, General | No deprecated protocol or weak cipher findings |
| 15 | Run SCAP/SCC — Windows STIG | SCC → Scan → DISA Windows Server STIG | Review SC-8, SC-13 check findings |
| 16 | Verify RDP encryption level is FIPS-compliant | GPO → Computer Config → Admin Templates → Windows Components → Remote Desktop Services → Encryption Level → `FIPS Compliant` | Set to FIPS Compliant |
| 17 | Verify SMB signing is enforced | `Get-SmbServerConfiguration \| Select RequireSecuritySignature` | Returns `True` |
| 18 | Verify LDAP signing is enforced (domain controllers) | `reg query "HKLM\SYSTEM\CurrentControlSet\Services\NTDS\Parameters" /v "LDAPServerIntegrity"` | Returns `2` (Required) |
| 19 | Document all findings in Findings Log (Section 10) | | All deviations documented |
| 20 | Notify ISSM of completion and findings | Secure comms | ISSM acknowledges; directs remediation if needed |
| 21 | Complete Findings Summary and Sign-Off block | Sections 11–12 | Signatures obtained |

---

## 8. Protocol & Cipher Status Table

| # | Hostname | SSL 2.0 | SSL 3.0 | TLS 1.0 | TLS 1.1 | TLS 1.2 | TLS 1.3 | FIPS Mode | Weak Ciphers | Result |
|---|----------|---------|---------|---------|---------|---------|---------|-----------|-------------|--------|
| 1 | | | | | | | | | | |
| 2 | | | | | | | | | | |
| 3 | | | | | | | | | | |
| 4 | | | | | | | | | | |
| 5 | | | | | | | | | | |

*Status per cell: DIS (Disabled) / EN (Enabled) / N/A. Result: PASS / FAIL / FINDING*

---

## 9. Cryptographic Review Summary

| Check | Compliant Hosts | Non-Compliant Hosts | Finding Count |
|-------|----------------|---------------------|---------------|
| SSL 2.0 disabled | | | |
| SSL 3.0 disabled | | | |
| TLS 1.0 disabled | | | |
| TLS 1.1 disabled | | | |
| TLS 1.2 enabled | | | |
| FIPS mode enabled | | | |
| No weak ciphers | | | |
| SMB signing enforced | | | |
| RDP FIPS compliant | | | |

---

## 10. Non-Compliance / Findings Log

| # | Host | Finding | Control | Severity | ISSM Notified | Notification Time | Directed Action | Resolved |
|---|------|---------|---------|---------|---------------|-------------------|----------------|---------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |

---

## 11. Findings Summary

- [ ] All hosts fully compliant — no deprecated protocols, no weak ciphers, FIPS mode active
- [ ] One or more deprecated protocols found — ISSM notified, remediation pending/complete
- [ ] Weak cipher suites found — documented and escalated
- [ ] FIPS mode not enabled on one or more hosts — documented and escalated
- [ ] No findings — check complete

---

## 12. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________

**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1602-SA | Rev 1.0 | Category 16 — Encryption Verification | ⚠️ NON-TAILORABLE SC-28*
*Classification: [CLASSIFICATION]*
