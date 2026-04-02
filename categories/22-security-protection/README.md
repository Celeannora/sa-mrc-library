# Category 22 — Security & Protection

This category covers Windows security and protection role services that enforce data confidentiality, network content caching controls, and system health posture verification. In a SAP environment, each of these services directly supports or validates security controls required by JSIG and NIST SP 800-53.

---

## Services in This Category

| Service | Role | Risk if Unhealthy |
|---------|------|-------------------|
| **BitLocker** | Full-volume encryption (FVE) for OS and data drives; protects data at rest | Unencrypted drives violate SC-28 (NON-TAILORABLE per JSIG); theft or loss of unprotected media is a spillage event |
| **BranchCache** | Caches content from servers at branch locations to reduce WAN bandwidth | Misconfiguration can allow cached content to be accessed by unauthorized hosts; content integrity not verified |
| **Device Health Attestation (DHA)** | Verifies system boot integrity using TPM measurements (Secure Boot, ELAM, BitLocker PCR state) | Compromised boot path (rootkit, UEFI tampering) may go undetected; device posture cannot be confirmed |

---

## JSIG Applicability
All tasks require written ISSM authorization (MA-2) and are retained as Body of Evidence (BoE) artifacts for the ATO package and ConMon program.

> **CRITICAL:** BitLocker encryption at rest (SC-28) is a **NON-TAILORABLE** JSIG control on all SAP systems. Any unencrypted volume is a stop-work condition — notify ISSM immediately.

## Applicable JSIG / NIST SP 800-53 Controls

| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| SC-28 | Protection of Information at Rest | **NON-TAILORABLE** — encryption required on all SAP system volumes |
| SC-28(1) | Protection of Information at Rest — Cryptographic Protection | Required — FIPS-validated encryption (AES-256 where supported) |
| CM-6 | Configuration Settings | BitLocker, BranchCache, and DHA configurations maintained per baseline |
| CM-7 | Least Functionality | BranchCache enabled only on authorized systems/segments |
| SI-7 | Software, Firmware, and Information Integrity | DHA validates firmware and boot integrity via TPM |
| SI-7(1) | Integrity Checks | Periodic integrity verification of boot components |
| IA-3 | Device Identification and Authentication | DHA contributes to device posture verification |
| AU-9 | Protection of Audit Information | Encryption and integrity controls protect audit data |

## JSIG-Specific Notes
- Any SAP system found with BitLocker disabled or suspended is a **NON-TAILORABLE SC-28 failure** — stop all work, isolate the system, and notify ISSM immediately.
- BranchCache in SAP environments must be reviewed to ensure cached content is not accessible from unauthorized network segments.
- Device Health Attestation results should feed into the overall system posture / ATO ConMon evidence package.

## MRCs in This Category

| MRC ID | Title | Periodicity |
|--------|-------|-------------|
| MRC-2201-WK | Weekly BitLocker Encryption Status Verification | Weekly |
| MRC-2202-MO | Monthly BranchCache Configuration and Integrity Review | Monthly |
| MRC-2203-MO | Monthly Device Health Attestation Status and TPM Integrity Review | Monthly |

> See stub files in this directory. Use the AI prompt pattern in the root README to generate tool-specific `.docx` cards for any MRC in this category.
