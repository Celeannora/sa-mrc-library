---
mrc_id: MRC-2201-WK
title: Weekly BitLocker Encryption Status Verification
category: 22 — Security & Protection
periodicity: WEEKLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:30"
rin: WK-BL-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Disk encryption management utility ([SITE-DESIGNATED ENCRYPTION TOOL]), encryption status reporting console or CLI, group policy management console (if applicable)"
jsig_controls: "SC-28 [NON-TAILORABLE], SC-28(1), CM-6, AU-9"
non_tailorable: "NON-TAILORABLE: SC-28 — Encryption at rest SHALL be implemented on all SAP system volumes. Any unencrypted or suspended volume is an immediate stop-work condition."
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only verification; no encryption policy or recovery key changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
BitLocker is Windows' built-in full-volume encryption (FVE) feature. It encrypts the entire contents of a drive using AES, so that if a system or drive is stolen, powered off, or removed, the data cannot be read without the correct credentials or recovery key. In a SAP environment, the JSIG mandates that **all system and data volumes must be encrypted at rest (SC-28) — this is non-tailorable**. "Suspended" BitLocker (protection paused) counts as unencrypted for JSIG purposes. This card verifies that BitLocker is active, protection is not suspended, and recovery keys are escrowed (stored) in the correct location per site policy.

## Safety / Hazards
JSIG NON-TAILORABLE: SC-28 — If any SAP system drive is found unprotected or with BitLocker suspended, **stop work immediately and notify ISSM**. Do not re-enable encryption without ISSM authorization — the unprotected state itself is the reportable event. Do not modify BitLocker policies, recovery key locations, or TPM settings without a CCB-approved Change Request and ISSM written authorization.

## Tools / Equipment / Access Required
- `manage-bde` — command-line BitLocker management tool (built into Windows)
- PowerShell BitLocker module: `Get-BitLockerVolume`, `Get-TPMSupportedCapability`
- Microsoft BitLocker Administration and Monitoring (MBAM) console — if deployed at site
- Active Directory — for recovery key escrow verification (`dsa.msc` or ADAC)
- Group Policy Management Console — `gpmc.msc` — to verify BitLocker GPO is applied
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — SC-28 [Non-Tailorable], SC-28(1), CM-6
- DISA STIG — BitLocker Drive Encryption benchmark (latest release)
- FIPS 140-2 / 140-3 — validated encryption requirements
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List
- Site-specific BitLocker recovery key escrow policy

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required immediately for: any volume found unprotected, BitLocker suspended, TPM not present or not initialized, recovery key not escrowed, or BitLocker GPO not applied.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to all SAP workstations and servers (remote or local)
- Authorized system inventory list for the environment
- Recovery key escrow location documented (AD or MBAM)

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Open PowerShell as Administrator on each target system | Right-click Start > `Windows PowerShell (Admin)` | Elevated PS prompt |
| 2 | Check BitLocker status on all volumes | `Get-BitLockerVolume` | All volumes: `ProtectionStatus = On`; `VolumeStatus = FullyEncrypted` |
| 3 | **JSIG NON-TAILORABLE CHECK** — Identify any unprotected or suspended volumes | Filter: `Get-BitLockerVolume \| Where-Object {$_.ProtectionStatus -ne "On"}` | **Zero results. Any unprotected volume = STOP — notify ISSM immediately** |
| 4 | Verify encryption method meets FIPS requirement | `Get-BitLockerVolume \| Select MountPoint, EncryptionMethod` | Method: `XtsAes256` or `Aes256` on all volumes |
| 5 | Verify TPM is present and initialized | `Get-Tpm` | `TpmPresent = True`; `TpmEnabled = True`; `TpmActivated = True` |
| 6 | Verify recovery key is escrowed in Active Directory | `(Get-BitLockerVolume -MountPoint C:).KeyProtector` — confirm `RecoveryPassword` type present; verify in AD: `dsa.msc` > computer object > `BitLocker Recovery` tab | Recovery key backed up to AD; not absent |
| 7 | If MBAM is deployed — verify all systems are reporting to MBAM console | `MBAM console > Reports > BitLocker Enterprise Compliance Details` | All managed systems compliant; non-reporting systems investigated |
| 8 | Verify BitLocker Group Policy is applied to all systems | `gpresult /r` on target system — confirm BitLocker GPO listed under `Applied Group Policy Objects` | BitLocker policy applied |
| 9 | Check for any pending BitLocker encryption (in-progress) | `Get-BitLockerVolume \| Where-Object {$_.VolumeStatus -eq "EncryptionInProgress"}` | Encryption in progress is acceptable — document; verify completion next cycle |
| 10 | Document non-compliant systems in findings log below | — | All unprotected, suspended, or non-escrowed systems logged |
| 11 | Sign and date MRC; file as SC-28 BoE artifact | SA signature; ISSM/ISSO co-sign if any non-compliance | MRC retained per AU-11 |

---

## System Encryption Status Summary (Complete at time of check)

| Hostname | OS Volume Status | Data Volume(s) Status | Encryption Method | Recovery Key Escrowed | Notes |
|----------|-----------------|----------------------|-------------------|----------------------|-------|
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

---

## Non-Compliance / Findings Log

| # | Hostname | Volume | Issue | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|----------|--------|-------|-----------------|-------------|-------------|--------------|
| 1 | | | | SC-28 | | | |
| 2 | | | | SC-28 | | | |
| 3 | | | | SC-28 | | | |
| 4 | | | | SC-28 | | | |
| 5 | | | | SC-28 | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- **NON-TAILORABLE SC-28:** [ ] All volumes encrypted and protection ON  [ ] FAILURE — ISSM notified immediately
- Unprotected Volumes: ___ (must be zero)
- Suspended Volumes: ___ (must be zero)
- Recovery Keys Escrowed: [ ] All verified  [ ] Missing — remediated
- Encryption Method (AES-256): [ ] Compliant  [ ] Non-compliant — documented
- BitLocker GPO Applied: [ ] All systems  [ ] Missing on: _______________
- Total systems checked: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
