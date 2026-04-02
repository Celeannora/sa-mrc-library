# Category 11 — Time Synchronization (NTP)


## JSIG Applicability
This category maps to JSIG-required controls. All tasks require written ISSM authorization (MA-2) and are retained as Body of Evidence (BoE) artifacts for the ATO package and ConMon program.

## Applicable JSIG / NIST SP 800-53 Controls
| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| AU-8 | Time Stamps | Required — accurate time stamps on all audit records |
| SC-45 | System Time Synchronization | Required — sync to authoritative source |

## JSIG-Specific Notes
- Clock skew >5 minutes breaks Kerberos authentication and AU-8 (time stamp) integrity.
- All SAP hosts must synchronize to an authorized, government-approved NTP source only.
- Unauthorized NTP sources may indicate tampering — report to ISSM.
- AU-8 time stamp integrity is foundational to all audit log BoE artifacts.

## MRCs in This Category
> See existing stub files in this directory. Use the AI prompt pattern in the root README to generate additional JSIG-compliant cards for this category.
