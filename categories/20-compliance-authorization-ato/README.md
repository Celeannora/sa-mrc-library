# Category 20 — Compliance & Authorization (ATO)

Maintenance requirement cards covering the system's Authorization to Operate (ATO) lifecycle and continuous compliance posture. This category sits at the top of the compliance stack — all other MRC categories feed evidence upward into the artifacts reviewed here.

## Role Boundaries
- **SA:** Assembles technical evidence (scans, inventories, MRC records), maintains POA&M accuracy, surfaces boundary changes and risks to ISSM, supports AO review.
- **ISSM:** Owns the ATO. Directs renewal timeline, performs risk determination, submits package to AO. All non-compliant findings in this category go to ISSM — not SA.
- **ISSO:** Supports POA&M review, finding disposition, and ConMon coordination.
- **AO (Authorizing Official):** External to day-to-day operations. Grants or revokes the ATO. SA never contacts AO directly.

## JSIG Applicability
All tasks require written ISSM authorization (MA-2) and are retained as Body of Evidence (BoE) artifacts supporting the ATO package and ConMon program.

## Applicable JSIG / NIST SP 800-53 Controls

| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| CA-5 | Plan of Action and Milestones | Required — track and remediate all weaknesses |
| CA-6 | Security and Privacy Authorization | Required — ATO granted by AO; track expiration |
| CA-6(1) | Joint Authorization — Intra-Organization | As applicable |
| CA-7 | Continuous Monitoring | Required — ongoing security monitoring program |
| CA-7(1) | Independent Assessment | Periodic independent assessment required |
| RA-3 | Risk Assessment | Required — assess risks and document in SSP |
| RA-3(1) | Supply Chain Risk Assessment | As applicable |
| PL-2 | System Security Plan | Required — current SSP required for ATO; SA verifies boundary accuracy |
| PM-4 | Plan of Action and Milestones Process | Required — POA&M process is ISSM-owned, SA-maintained |

## JSIG-Specific Notes
- **ATO is granted by the SAP Authorizing Official (AO)** — not the ISSM. The ISSM coordinates, recommends, and submits. The SA supports.
- **ATO renewal must be initiated no later than 90 days before expiration.** MRC-2001-MO tracks this threshold monthly and triggers the renewal workflow.
- **Continuous monitoring data feeds the ATO.** Every signed MRC, every ConMon package, every POA&M update is potential BoE for the AO's authorization decision.
- **ISSM maintains all cybersecurity authorization documentation** including ATOs, SSPs, and risk determinations (DoDM 5205.07 Vol. 1).
- **Non-tailorable control failures discovered during renewal assembly are stop-work conditions.** AC-6(1), SC-28, and SA-22 non-compliance must be disclosed to the ISSM before the package is submitted — never suppressed.

## MRC Cards in This Category

| MRC ID | Title | Periodicity | Status |
|--------|-------|-------------|--------|
| MRC-2001-MO | Monthly ATO Status and POA&M Milestone Review | Monthly | 🟡 DRAFT |
| MRC-2002-AN | Annual ATO Renewal Package Preparation | Annual | 🟡 DRAFT |

## Card Sequence and Dependencies

```
MRC-2001-MO (monthly) ─── monitors ATO expiration countdown
       │
       └─ when ≤ 90 days remaining ──► triggers MRC-2002-AN
                                              │
                                              ├── pulls from MRC-1501-MO (12-month ConMon archive)
                                              ├── pulls from MRC-0204-MO (current Nessus scan)
                                              ├── pulls from MRC-0801-MO (current STIG/SCAP)
                                              ├── pulls from MRC-0205-MO (full POA&M export)
                                              ├── pulls from MRC-1703-MO (software inventory)
                                              └── delivers SA Technical Evidence Package ──► ISSM ──► AO
```
