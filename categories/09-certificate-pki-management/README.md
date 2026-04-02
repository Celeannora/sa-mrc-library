# Category 09 — Certificate & PKI Management


## JSIG Applicability
This category maps to JSIG-required controls. All tasks require written ISSM authorization (MA-2) and are retained as Body of Evidence (BoE) artifacts for the ATO package and ConMon program.

## Applicable JSIG / NIST SP 800-53 Controls
| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| IA-3 | Device Identification and Authentication | Required — certificates used for device auth |
| IA-5 | Authenticator Management | Required — manage certificate lifecycle |
| IA-7 | Cryptographic Module Authentication | Required — FIPS-validated modules |
| SC-8 | Transmission Confidentiality and Integrity | Required — TLS enforcement |
| SC-17 | Public Key Infrastructure Certificates | Required — issue/manage PKI certs per policy |

## JSIG-Specific Notes
- Expired certificates on SAP systems are a CAT I STIG finding — must be renewed at least 30 days before expiration.
- All PKI certificates must be issued by an authorized CA per JSIG and DoD PKI policy.
- IA-7 requires FIPS 140-2 or higher validated cryptographic modules — verify during certificate reviews.

## MRCs in This Category
> See existing stub files in this directory. Use the AI prompt pattern in the root README to generate additional JSIG-compliant cards for this category.
