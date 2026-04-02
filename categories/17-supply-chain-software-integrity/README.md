# Category 17 — Supply Chain & Software Integrity

## ⚠️ NON-TAILORABLE CONTROL — SA-22
**Per JSIG:** No end-of-life (EOL) or vendor-unsupported hardware, OS, firmware, or software is permitted on SAP systems. SA-22 cannot be tailored out. Any newly identified unsupported component must be reported to ISSM within the same maintenance cycle. Waiver requires Component SAP Senior Authorizing Official approval.

## JSIG Applicability
SA-22 is one of three JSIG non-tailorable controls. Software and supply chain integrity verification ensures no unauthorized, compromised, or EOL components operate within the SAP boundary.

## Applicable JSIG / NIST SP 800-53 Controls

| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| **SA-22** | **Unsupported System Components** | **NON-TAILORABLE — no EOL/unsupported components on SAP systems** |
| SR-3 | Supply Chain Controls and Processes | Required — protect against supply chain threats |
| SI-7 | Software, Firmware, and Information Integrity | Required — detect unauthorized changes |
| CM-7 | Least Functionality | Required — disable unauthorized functions |
| CM-11 | User-Installed Software | Required — control user-installed software |

## MRCs in This Category

| MRC ID | Task Title | Periodicity |
|--------|-----------|-------------|
| MRC-1701-MO | Monthly Software Inventory and EOL/Unsupported Component Check | Monthly |
| MRC-1702-QR | Quarterly Supply Chain and Software Integrity Verification | Quarterly |

## JSIG-Specific Notes
- EOL component disposition options: upgrade, replace, or obtain formal AO risk acceptance (waivers require Component SAP SAO).
- All new software installations must be on the Approved Software List (CM-7) before introduction to the SAP environment.
- Software hash/checksum verification (SI-7) must be performed on all new components before installation.
- PSO must authorize all new software/hardware entering the SAPF per DoDM 5205.07.
