# Category 16 — Encryption Verification

## ⚠️ NON-TAILORABLE CONTROL — SC-28
**Per JSIG:** Encryption of data at rest SHALL be implemented on all SAP systems. This control cannot be tailored out. Any unencrypted volume or device on a SAP system is a non-tailorable control failure requiring immediate ISSM notification. Waiver requires Component SAP Senior Authorizing Official approval.

## JSIG Applicability
SC-28 is one of three JSIG non-tailorable controls. Encryption verification is a mandatory, recurring maintenance task in all SAP environments.

## Applicable JSIG / NIST SP 800-53 Controls

| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| **SC-28** | **Protection of Information at Rest** | **NON-TAILORABLE — encryption of data at rest on all SAP systems** |
| SC-8 | Transmission Confidentiality and Integrity | Required — encrypt data in transit (TLS) |
| SC-13 | Cryptographic Protection | Required — use NIST-approved, FIPS 140-2+ validated algorithms |
| IA-7 | Cryptographic Module Authentication | Required — use FIPS-validated cryptographic modules |

## MRCs in This Category

| MRC ID | Task Title | Periodicity |
|--------|-----------|-------------|
| MRC-1601-QR | Quarterly Data-at-Rest Encryption Verification | Quarterly |
| MRC-1602-SA | Semi-Annual Full Cryptographic Implementation Review | Semi-Annual |

## JSIG-Specific Notes
- Any unencrypted volume, device, or storage medium containing SAP data is a **non-tailorable control failure**.
- Encryption keys must be stored separately from the data they protect and must be escrowed per policy.
- All cryptographic implementations must use **FIPS 140-2 (or higher) validated modules** (IA-7, SC-13).
- TLS version enforcement (SC-8) must be verified — deprecated protocols (TLS 1.0/1.1, SSL) are prohibited.
- Verify that patches applied in Category 02 have not introduced deprecated or non-FIPS cryptographic libraries.
