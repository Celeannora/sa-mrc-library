# SA MRC Library
### System Administrator — Maintenance Requirement Cards

A structured library of **Maintenance Requirement Cards (MRCs)** for use by System Administrators operating in ISSM-governed environments. All cards are designed to be reviewed and authorized by the ISSM prior to execution, consistent with NIST SP 800-53, DoDI 8510.01, and applicable STIGs.

---

## Purpose

This repository provides:
- A **blank MRC template** (Word `.docx`) for generating new cards
- **Category-specific MRC stubs** (Markdown) for each SA maintenance domain
- A **completed ISSM proposal template** for submitting scheduled maintenance for review
- A **generation script** for producing `.docx` MRC cards from structured data

---

## Repository Structure

```
sa-mrc-library/
├── README.md
├── issm-proposal/                    # ISSM Scheduled Maintenance Proposal
├── mrc-templates/
│   ├── blank/                        # Blank MRC template (.docx + generation script)
│   └── examples/                     # Filled example MRCs (Daily Log Review, Monthly Patching)
├── categories/                       # One folder per MRC category
│   ├── 01-audit-log-management/
│   ├── 02-patch-vulnerability-management/
│   ├── 03-antivirus-edr/
│   ├── 04-backup-recovery/
│   ├── 05-account-access-management/
│   ├── 06-system-health-performance/
│   ├── 07-network-boundary-security/
│   ├── 08-configuration-baseline-management/
│   ├── 09-certificate-pki-management/
│   ├── 10-identity-directory-services/
│   ├── 11-time-synchronization-ntp/
│   ├── 12-removable-media-controls/
│   ├── 13-physical-security-hardware/
│   ├── 14-incident-response-readiness/
│   ├── 15-conmon-artifact-submission/
│   ├── 16-encryption-verification/
│   ├── 17-supply-chain-software-integrity/
│   ├── 18-disaster-recovery-continuity/
│   ├── 19-documentation-records-management/
│   └── 20-compliance-authorization-ato/
└── scripts/                          # Node.js .docx generation scripts
```

---

## MRC Categories

| # | Category | Periodicity |
|---|----------|-------------|
| 01 | Audit & Log Management | Daily / Monthly |
| 02 | Patch & Vulnerability Management | Monthly / Quarterly |
| 03 | Antivirus / EDR | Daily / Monthly |
| 04 | Backup & Recovery | Daily / Monthly |
| 05 | Account & Access Management | Weekly / Monthly / Quarterly |
| 06 | System Health & Performance | Daily / Monthly |
| 07 | Network & Boundary Security | Daily / Quarterly |
| 08 | Configuration & Baseline Management | Monthly / Quarterly |
| 09 | Certificate & PKI Management | Weekly / Semi-Annual |
| 10 | Identity & Directory Services | Daily / Monthly |
| 11 | Time Synchronization (NTP) | Weekly |
| 12 | Removable Media Controls | Monthly / Quarterly |
| 13 | Physical Security & Hardware | Daily / Quarterly / Annual |
| 14 | Incident Response Readiness | Quarterly / Annual |
| 15 | ConMon Artifact Submission | Monthly / Quarterly |
| 16 | Encryption Verification | Quarterly / Semi-Annual |
| 17 | Supply Chain & Software Integrity | Monthly / Quarterly |
| 18 | Disaster Recovery / Continuity | Semi-Annual / Annual |
| 19 | Documentation & Records Management | Monthly / Annual |
| 20 | Compliance & Authorization (ATO) | Monthly / Annual |

---

## Generating a New MRC (.docx)

```bash
cd scripts/
node generate-mrc.js
```

Edit the `cardData` object in `generate-mrc.js` to populate fields for any category. The script outputs a formatted `.docx` using the standard MRC layout.

### AI Prompt Pattern

To have an AI populate a card stub, use:

> "Using the MRC template structure, generate a completed MRC for: **[task name]** on **[system/platform]**, periodicity **[daily/weekly/monthly/etc.]**. Include safety hazards, tools required, reference documents (NIST controls, applicable STIGs), manpower, prerequisites, and numbered procedure steps with expected results."

---

## Applicable References

- NIST SP 800-53 Rev. 5 — Security and Privacy Controls
- NIST SP 800-128 — Security-Focused Configuration Management
- DoDI 8510.01 — RMF for DoD IT
- DoDI 8500.01 — Cybersecurity
- CNSSI No. 1253 — Security Categorization for NSS
- GSA CIO-IT Security-10-50 — Maintenance (MA) Controls

---

## Usage Notes

- All MRCs require **written ISSM authorization** before execution.
- Completed cards must be **retained as ConMon artifacts**.
- Any task causing a configuration change requires a **CCB-approved Change Request**.
- Classification banners must be updated to match the environment's classification level.

---

*Maintained by: [System Administrator Name / Team]*
*Last Updated: April 2026*
