# Category 08 — Configuration & Baseline Management


## JSIG Applicability
This category maps to JSIG-required controls. All tasks require written ISSM authorization (MA-2) and are retained as Body of Evidence (BoE) artifacts for the ATO package and ConMon program.

## Applicable JSIG / NIST SP 800-53 Controls
| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| CM-2 | Baseline Configuration | Required — maintain current baseline documentation |
| CM-3 | Configuration Change Control | Required — CCB approval for all changes |
| CM-4 | Security Impact Analysis | Required — analyze security impact before any change |
| CM-6 | Configuration Settings | Required — maintain and enforce security configuration settings |
| CM-7 | Least Functionality | Required — prohibit or restrict use of unauthorized functions |
| CM-8 | System Component Inventory | Required — current accurate inventory |
| SA-10 | Developer Configuration Management | Required |

## JSIG-Specific Notes
- All configuration changes require CM-4 (Security Impact Analysis) before CCB submission.
- Detected configuration drift against the approved baseline must be reported to ISSM.
- SCAP/STIG scan results are BoE for CM-6 and CA-7. Submit to ISSM monthly.
- Unauthorized software detected during inventory reconciliation is a potential SI-7 / SA-22 finding.

## MRCs in This Category
> See existing stub files in this directory. Use the AI prompt pattern in the root README to generate additional JSIG-compliant cards for this category.
