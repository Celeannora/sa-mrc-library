---
mrc_id: MRC-2203-MO
title: Monthly Device Health Attestation Status and TPM Integrity Review
category: 22 — Security & Protection
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:40"
rin: MO-DHA-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "Device Health Attestation (DHA) Service / Microsoft Intune / MDM console (if deployed), PowerShell (TPM module, Get-Tpm, Confirm-SecureBootUEFI), TPM Management Console (tpm.msc), Event Viewer"
jsig_controls: "SI-7, SI-7(1), IA-3, CM-6, CM-7, SC-28, AU-9"
non_tailorable: "N/A — No non-tailorable controls in this category (verify against site-specific JSIG annex; SC-28 BitLocker state is reported by DHA and IS non-tailorable)"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; no TPM, Secure Boot, or UEFI configuration changes"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
Device Health Attestation (DHA) is a Microsoft service that uses the Trusted Platform Module (TPM) chip in a system to cryptographically verify the device's boot state. The TPM records measurements of the firmware (UEFI), bootloader, OS kernel, and security features (Secure Boot, ELAM, BitLocker PCR state) during every startup. DHA reads these measurements and produces a health report that confirms: did this device boot in a trusted, unmodified state? In a SAP environment, DHA provides assurance that workstations and servers have not been compromised at the firmware or boot level — which is a threat that traditional antivirus cannot detect. This card verifies that TPMs are present and healthy, Secure Boot is enabled, BitLocker PCR state is valid, and DHA reports are being collected and reviewed.

## Safety / Hazards
JSIG: Do not modify TPM settings, clear the TPM, change Secure Boot configuration, or alter UEFI settings without a CCB-approved Change Request and ISSM written authorization. A cleared or re-provisioned TPM will invalidate BitLocker recovery keys (SC-28 risk) and break the DHA measurement chain. Any system reporting a failed or unhealthy DHA attestation must be investigated and reported to ISSM.

## Tools / Equipment / Access Required
- PowerShell TPM module: `Get-Tpm`, `Get-TpmSupportedCapability`, `Confirm-SecureBootUEFI`
- TPM Management Console — `tpm.msc`
- DHA Service or MDM console (Microsoft Intune, SCCM, or on-premises DHA server) — if deployed
- Event Viewer — `eventvwr.msc` (TPM and Secure Boot events)
- `msinfo32` — System Information tool (firmware mode and Secure Boot status)
- ISSM/ISSO contact for escalation

## Reference Documents
- JSIG — SI-7, SI-7(1), IA-3, CM-6, SC-28
- DISA STIG — Windows TPM / Secure Boot benchmark requirements
- NIST SP 800-155 — BIOS Integrity Measurement Guidelines
- NIST SP 800-193 — Platform Firmware Resiliency Guidelines
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- MA-3 Approved Tool List

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: TPM not present or disabled on a SAP system, Secure Boot disabled, DHA reporting attestation failure, or evidence of firmware/boot tampering.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- Access to all SAP workstations and servers
- Authorized system inventory list
- DHA server / MDM console access (if deployed)

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Open PowerShell as Administrator on each target system | Right-click Start > `Windows PowerShell (Admin)` | Elevated PS prompt |
| 2 | Verify TPM is present and enabled | `Get-Tpm` | `TpmPresent = True`; `TpmEnabled = True`; `TpmActivated = True`; `TpmReady = True` |
| 3 | Verify TPM version meets minimum requirement (2.0 preferred) | `Get-Tpm \| Select ManufacturerVersion`; or `tpm.msc` > check Specification Version | TPM 2.0 present; document any TPM 1.2 systems for ISSM review |
| 4 | Verify Secure Boot is enabled | `Confirm-SecureBootUEFI` | Returns `True`; document any `False` result — notify ISSM |
| 5 | Verify system is booting in UEFI mode (not Legacy BIOS) | `msinfo32` > `BIOS Mode` field; or `$env:firmware_type` in PS | `BIOS Mode: UEFI`; Legacy BIOS on SAP systems must be reported |
| 6 | Verify BitLocker PCR binding is intact (TPM protecting BitLocker) | `Get-BitLockerVolume -MountPoint C: \| Select -ExpandProperty KeyProtector` — confirm `TpmProtector` type is present | `TpmProtector` listed; absence indicates BitLocker not TPM-bound — notify ISSM |
| 7 | Check for TPM lockout state | `Get-Tpm \| Select TpmOwned, TpmLockedOut, LockoutCount` | `TpmLockedOut = False`; lockout count investigated if > 0 |
| 8 | Review ELAM (Early Launch AntiMalware) driver status | `Get-Tpm` — check PCR values or DHA report; verify AV ELAM driver is loaded via `Get-WinEvent -LogName "System" \| Where-Object {$_.Id -eq 7035 -and $_.Message -like "*ELAM*"}` | ELAM driver loaded at boot; no boot-time driver anomalies |
| 9 | If DHA service is deployed — review attestation reports | DHA / MDM console > Device Compliance > Health Attestation report | All systems attesting healthy; investigate and document any failures |
| 10 | Check for TPM and Secure Boot event log entries (last 30 days) | `Event Viewer > Windows Logs > System` — source: `TPM`, IDs: 1796, 1794; source: `Kernel-Boot`, IDs: 67, 81 | No Secure Boot violations or TPM errors |
| 11 | Verify firmware (BIOS/UEFI) version matches authorized baseline | `msinfo32` > `BIOS Version/Date`; compare to approved firmware baseline | Firmware version matches baseline; unapproved versions flagged for CCB update request |
| 12 | Document all systems and findings in summary tables below | — | All discrepancies recorded |
| 13 | Sign and date MRC; file as SI-7 / SC-28 BoE artifact | SA signature; ISSM/ISSO co-sign if non-compliant | MRC retained per AU-11 |

---

## Device Health Status Summary (Complete at time of check)

| Hostname | TPM Version | TPM Ready | Secure Boot | UEFI Mode | BitLocker TPM-Bound | DHA Status | Notes |
|----------|------------|-----------|-------------|-----------|-------------------|-----------|-------|
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |

---

## Non-Compliance / Findings Log

| # | Hostname | Finding | Control Impacted | Action Taken | Escalated To | Date Resolved |
|---|----------|---------|-----------------|-------------|-------------|--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- TPM Present and Ready: [ ] All systems  [ ] Missing/disabled — ISSM notified
- Secure Boot Enabled: [ ] All systems  [ ] Disabled on: ___ system(s) — ISSM notified
- UEFI Mode: [ ] All systems  [ ] Legacy BIOS found — ISSM notified
- BitLocker TPM-Bound: [ ] All systems  [ ] Not bound — ISSM notified
- DHA Attestation (if deployed): [ ] All healthy  [ ] Failures — investigated
- Firmware Baseline Compliant: [ ] All systems  [ ] Deviations — documented
- TPM Lockout Events: [ ] None  [ ] Found — investigated
- Total systems checked: ___  Non-compliant: ___
- ISSM Notified: [ ] Y  [ ] N   Time: _______________
- Artifact file: _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if non-compliant) | | | |
