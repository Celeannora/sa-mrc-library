# Category 04 — Backup & Recovery


## JSIG Applicability
This category maps to JSIG-required controls. All tasks require written ISSM authorization (MA-2) and are retained as Body of Evidence (BoE) artifacts for the ATO package and ConMon program.

## Applicable JSIG / NIST SP 800-53 Controls
| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| CP-9 | System Backup | Required — backup schedule, offsite storage, testing |
| CP-10 | System Recovery and Reconstitution | Required — restore to known secure state |
| MA-2 | Controlled Maintenance | All restore tests are controlled maintenance activities |

## JSIG-Specific Notes
- A verified backup must exist before any patching or major maintenance activity — ISSM may halt operations if backup is not confirmed.
- Restore tests are BoE artifacts for CP-9 and MA-2.
- Offsite/alternate storage must be approved and must not introduce unauthorized access paths (MA-4, SC-7).
- SAP media used for backup must be authorized by PSO per DoDM 5205.07.

## MRCs in This Category
> See existing stub files in this directory. Use the AI prompt pattern in the root README to generate additional JSIG-compliant cards for this category.
