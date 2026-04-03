---
mrc_id: MRC-1601-QR
title: "Quarterly Data-at-Rest Encryption Verification"
category: "16 — Encryption Verification"
periodicity: Quarterly
est_time: "2–3 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Disk encryption management utility ([SITE-DESIGNATED ENCRYPTION TOOL — e.g., manage-bde, cryptsetup/LUKS, or equivalent]), OOB management interface"
jsig_controls:
  - SC-28
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

# MRC-1601-QR — Quarterly Data-at-Rest Encryption Verification

## ⚠️ NON-TAILORABLE CONTROL — SC-28
**Per JSIG:** Encryption of data at rest SHALL be implemented on all SAP systems. This control cannot be tailored out. Any unencrypted volume or device on a SAP system is a **non-tailorable control failure requiring immediate ISSM notification**. Waiver requires Component SAP Senior Authorizing Official approval — not delegatable.

---

## 1. Background (New SA)

**What is data-at-rest encryption?**
Data-at-rest encryption protects stored data from unauthorized access if physical media is removed or stolen. On Windows systems, BitLocker Drive Encryption encrypts entire volumes using AES-256 (FIPS 140-2 validated). On Linux systems, LUKS (Linux Unified Key Setup) provides equivalent protection.

**Why is this mandatory in a SAP environment?**
SAP systems process classified information. Physical removal of a hard drive or SSD from a SAP server or workstation without encryption means the raw data could be read on any other system. SC-28 is one of only three JSIG non-tailorable controls — it cannot be waived by the ISSM; only the Component SAP Senior Authorizing Official can grant a waiver, and that waiver must be reported to DoD SAPCO and DoD SAP CIO within 30 days.

**What you are verifying:**
- Every volume on every managed system is encrypted and encryption is actively protecting it
- BitLocker keys are escrowed to Active Directory or a key management server
- No deprecated or non-FIPS cryptographic algorithms are in use
- Encryption was not silently disabled by a patch, hardware change, or configuration drift

---

## 2. Safety / Hazards

> ⚠️ **STOP WORK CONDITION:** If any volume is found to be unencrypted or encryption is suspended/paused, this is an immediate SC-28 non-tailorable control failure. **Stop work and notify the ISSM immediately before taking any remediation action.** Do not attempt to re-encrypt without ISSM direction.

> ⚠️ **KEY ESCROW:** Do not delete, move, or regenerate BitLocker recovery keys during this check without explicit ISSM authorization. Loss of recovery keys may render data permanently inaccessible.

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** This MRC must be executed within an ISSM-authorized maintenance window (MA-2). Do not proceed without a signed authorization on file.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| Domain Admin or equivalent | Required for remote BitLocker status checks |
| PowerShell (elevated) | `manage-bde`, `Get-BitLockerVolume` cmdlets |
| Active Directory Users & Computers | Verify key escrow objects exist |
| BitLocker Recovery Password Viewer | RSAT tool — confirm recovery keys stored in AD |
| Nessus / ACAS | Encryption compliance plugin checks (supplemental) |
| System inventory list | All in-scope hosts and volumes |
| MRC Sign-Off Block | Signed by SA and ISSM/ISSO after completion |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| JSIG SC-28 Implementation Guidance | ISSM SharePoint / SAP Cybersecurity Binder |
| NIST SP 800-111 — Guide to Storage Encryption Technologies | https://csrc.nist.gov/publications/detail/sp/800-111/final |
| Microsoft BitLocker Administration Guide | https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/ |
| FIPS 140-2 Validated Module List | https://csrc.nist.gov/projects/cryptographic-module-validation-program |
| System SSP — Encryption Implementation Section | ISSM Document Repository |
| MRC-2201-WK | BitLocker Health Weekly Check (Category 22) |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 2–3 hours |
| ISSM / ISSO Notification | 1 | As needed (findings only) |

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file for this maintenance cycle
- [ ] CCB Change Request approved (if any remediation is anticipated)
- [ ] Current system inventory list available (all hosts and volumes in scope)
- [ ] BitLocker Recovery Password Viewer (RSAT) installed on admin workstation
- [ ] Active Directory domain connectivity confirmed
- [ ] Backup verified current (CP-9) before any remediation actions

---

## 7. Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|-----------------|
| 1 | Pull current in-scope host inventory | CMDB / System Inventory List | List of all hosts and volumes to be checked |
| 2 | On admin workstation, open elevated PowerShell | Right-click PowerShell → Run as Administrator | PowerShell prompt with admin context |
| 3 | Check BitLocker status on local volumes | `manage-bde -status` | All volumes show `Protection Status: Protection On` and `Encryption Method: XTS-AES 256` |
| 4 | Remotely check BitLocker status on all domain-joined hosts | `Get-BitLockerVolume -MountPoint C: ` (or use GPO/SCCM report) | All volumes: `VolumeStatus: FullyEncrypted`, `ProtectionStatus: On` |
| 5 | For any volume showing `Protection Off` or `Suspended` | Document host name, volume, and status immediately | Do NOT proceed — notify ISSM (SC-28 failure) |
| 6 | Verify encryption algorithm is AES-256 or XTS-AES 256 (FIPS 140-2) | `manage-bde -status C:` → check `Encryption Method` field | Must show `XTS-AES 256` or `AES-CBC 256` — no 128-bit or deprecated method |
| 7 | Verify BitLocker recovery keys are escrowed in Active Directory | Active Directory Users & Computers → Computer object → BitLocker Recovery tab | Recovery key GUID present and dated within current encryption cycle |
| 8 | Open BitLocker Recovery Password Viewer | ADUC → View → BitLocker Recovery | Recovery passwords visible for all encrypted systems |
| 9 | Verify no key escrow is missing | Cross-reference inventory list against ADUC key entries | Every encrypted host has at least one valid recovery password in AD |
| 10 | For any host missing key escrow | Document host and notify ISSM — do not re-escrow without authorization | Finding logged — ISSM to direct remediation |
| 11 | Check for suspended BitLocker on systems that recently received patches | `manage-bde -status` post-patch on any system patched this quarter | Confirm suspension was re-enabled after patch; if still suspended, this is a finding |
| 12 | Verify TPM status on all hosts | `Get-Tpm` (PowerShell) | `TpmPresent: True`, `TpmReady: True`, `TpmEnabled: True` |
| 13 | Run Nessus/ACAS encryption compliance plugins (supplemental) | ACAS → Scan → Compliance → Encryption plugins | No unencrypted volume or deprecated cipher findings |
| 14 | Document all systems checked in the Encryption Status Table below | SA records each host/volume result | All rows populated |
| 15 | For any findings, log in Non-Compliance / Findings Log | See Section 10 | All findings documented with host, volume, status, and ISSM notification timestamp |
| 16 | Notify ISSM of check completion and any findings | Secure communications channel per local SOP | ISSM acknowledges receipt |
| 17 | Complete Findings Summary and Sign-Off block | Section 11–12 | SA and ISSM/ISSO signatures obtained |

---

## 8. Encryption Status Inventory Table

| # | Hostname | Volume | Encryption Method | Protection Status | Key Escrowed | TPM Status | Result | Notes |
|---|----------|--------|-------------------|-------------------|-------------|------------|--------|-------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |
| 4 | | | | | | | | |
| 5 | | | | | | | | |
| 6 | | | | | | | | |
| 7 | | | | | | | | |
| 8 | | | | | | | | |

*Add rows as needed. Result: PASS / FAIL / FINDING*

---

## 9. Encryption Summary

| Metric | Count |
|--------|-------|
| Total volumes checked | |
| Fully encrypted (PASS) | |
| Suspended / paused | |
| Unencrypted (FAIL — SC-28) | |
| Missing key escrow | |
| Non-FIPS algorithm detected | |
| ISSM notified of findings | Y / N |

---

## 10. Non-Compliance / Findings Log

| # | Host / Volume | Finding Description | SC-28 Failure? | ISSM Notified | Notification Time | Directed Remediation | Resolved |
|---|---------------|---------------------|----------------|---------------|-------------------|---------------------|---------|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |

---

## 11. Findings Summary

- [ ] All volumes fully encrypted — no SC-28 failures identified
- [ ] One or more SC-28 failures identified — ISSM notified immediately
- [ ] Key escrow missing on one or more hosts — documented and escalated
- [ ] Non-FIPS algorithm detected — documented and escalated
- [ ] No findings — check complete, all systems compliant

---

## 12. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________

**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1601-QR | Rev 1.0 | Category 16 — Encryption Verification | ⚠️ NON-TAILORABLE SC-28*
*Classification: [CLASSIFICATION]*
