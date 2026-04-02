# Category 10 — Identity & Directory Services


## JSIG Applicability
This category maps to JSIG-required controls. All tasks require written ISSM authorization (MA-2) and are retained as Body of Evidence (BoE) artifacts for the ATO package and ConMon program.

## Applicable JSIG / NIST SP 800-53 Controls
| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| IA-2 | Identification and Authentication (Organizational Users) | Required — multi-factor auth enforced |
| IA-4 | Identifier Management | Required — manage identifiers throughout lifecycle |
| CM-6 | Configuration Settings | Required — AD/DNS configuration maintained per baseline |
| SC-20 | Secure Name/Address Resolution Service | Required — authenticated DNS |
| AU-9 | Protection of Audit Information | AD audit logs must be protected |

## JSIG-Specific Notes
- SAP systems require multi-factor authentication (IA-2) — Kerberos/CAC/PIV.
- AD replication failures must be escalated to ISSO within 4 hours — authentication failures could affect operations.
- DNS integrity directly affects AU-8 (time stamps) and audit log reliability.
- Group Policy changes are configuration changes requiring CCB approval (CM-3).

## MRCs in This Category
> See existing stub files in this directory. Use the AI prompt pattern in the root README to generate additional JSIG-compliant cards for this category.
