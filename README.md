# SA MRC Library
### System Administrator — Maintenance Requirement Cards
#### JSIG / RMF Compliant | DoD SAP Environment

A structured library of **Maintenance Requirement Cards (MRCs)** for use by System Administrators operating in ISSM-governed **Special Access Program (SAP)** environments. All cards are aligned to the **Joint SAP Implementation Guide (JSIG)**, NIST SP 800-53 Rev. 5, CNSSI 1253, and DoDM 5205.07 Vol. 1. All tasks require written ISSM authorization prior to execution.

---

## Governing Framework

| Document | Role |
|----------|------|
| **JSIG** (DoD Joint SAP Implementation Guide) | Primary cybersecurity/IA policy and implementation guidance for SAP IS |
| **DoDM 5205.07, Vol. 1** | SAP Security Manual — General Procedures; governs all SAP IS authorization |
| **NIST SP 800-53 Rev. 5** | Security control catalog (JSIG is a tailored overlay of this) |
| **CNSSI No. 1253** | Security categorization and control selection for NSS |
| **DoDI 8510.01** | DoD RMF for IT |
| **DoDI 8500.01** | DoD Cybersecurity policy |
| **DoD 8140.01 / 8570.01-M** | Cyberspace Workforce Management / IA Workforce |

> **Note:** JSIG serves as a **technical supplement and overlay** to NIST SP 800-53 and CNSSI 1253. All SAP information systems are categorized as National Security Systems (NSS) under FISMA. JSIG applies to all networks, systems, weapon systems, and applications under the cognizant SAP Authorizing Official (AO) regardless of physical location — including contractor sites.

---

## JSIG Non-Tailorable Controls

The following controls **cannot be tailored out** of any SAP system. Waiver authority rests solely with the Component SAP Senior Authorizing Official (cannot be further delegated). All approved waivers must be submitted to DoD SAPCO and DoD SAP CIO within 30 days.

| Control | Title | Requirement |
|---------|-------|-------------|
| **AC-6(1)** | Least Privilege — Authorize Access to Security Functions | System endpoint protection shall not be tailored out |
| **SA-22** | Unsupported System Components | Required on all SAP systems — no EOL/unsupported components permitted |
| **SC-28** | Protection of Information at Rest | Encryption of data at rest shall be implemented on all SAP systems |

---

## SAP Roles and Responsibilities

| Role | Abbreviation | Maintenance Relevance |
|------|-------------|----------------------|
| Authorizing Official | AO | Approves ATOs; final authority on risk acceptance |
| Program Security Officer | PSO | Approves entry/removal of IS into SAPF; authorizes all digital media |
| Gov't/Contractor SAP Security Officer | GSSO / CSSO | Coordinates on IR Plan; develops media sanitization procedures |
| Information System Security Manager | **ISSM** | Oversees SA monitoring; manages ConMon plan; CCB voting member with veto; coordinates all IS changes with AO |
| Information System Security Officer | **ISSO** | Collects/reviews/documents audit records; conducts compliance reviews; monitors recovery; assists ISSM |
| System Administrator | **SA** | Executes all MRC tasks; submits maintenance proposals to ISSM; implements CM policies |

> ISSM and ISSO appointments must be **in writing**. ISSM is not a collateral duty in a SAP environment.

---

## Repository Structure

```
sa-mrc-library/
├── README.md
├── JSIG_COMPLIANCE.md                ← JSIG control mapping, non-tailorable controls, SAP-specific requirements
├── issm-proposal/                    ← ISSM Scheduled Maintenance Proposal (.docx + README)
├── mrc-templates/
│   ├── blank/                        ← Blank MRC template (.docx + field reference)
│   └── examples/                     ← Filled example MRCs
├── categories/                       ← One folder per MRC category (20 total)
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
└── scripts/                          ← Node.js .docx generation scripts
```

---

## MRC Categories & JSIG Control Mapping

| # | Category | Primary JSIG/NIST Controls | Periodicity |
|---|----------|---------------------------|-------------|
| 01 | Audit & Log Management | AU-2, AU-3, AU-6, AU-9, AU-11, SI-4 | Daily / Monthly |
| 02 | Patch & Vulnerability Management | SI-2, CM-3, CM-6, RA-5 | Monthly / Quarterly |
| 03 | Antivirus / EDR *(non-tailorable via AC-6(1))* | SI-3, SI-8, CM-6 | Daily / Monthly |
| 04 | Backup & Recovery | CP-9, CP-10 | Daily / Monthly |
| 05 | Account & Access Management | AC-2, AC-3, AC-6, IA-4, IA-5 | Weekly / Monthly / Quarterly |
| 06 | System Health & Performance | CA-7, SI-4, CP-9 | Daily / Monthly |
| 07 | Network & Boundary Security | SC-7, SC-5, SI-4, CA-3 | Daily / Quarterly |
| 08 | Configuration & Baseline Management | CM-2, CM-6, CM-7, CM-8, SA-10 | Monthly / Quarterly |
| 09 | Certificate & PKI Management | IA-3, IA-5, SC-8, SC-17 | Weekly / Semi-Annual |
| 10 | Identity & Directory Services | IA-2, IA-4, CM-6, SC-20 | Daily / Monthly |
| 11 | Time Synchronization (NTP) | AU-8, SC-45 | Weekly |
| 12 | Removable Media Controls | MP-7, MP-2, CM-7 | Monthly / Quarterly |
| 13 | Physical Security & Hardware | PE-2, PE-3, PE-6, MA-2 | Daily / Quarterly / Annual |
| 14 | Incident Response Readiness | IR-3, IR-4, IR-8, IR-9 | Quarterly / Annual |
| 15 | ConMon Artifact Submission | CA-7, PM-6 | Monthly / Quarterly |
| 16 | Encryption Verification *(non-tailorable: SC-28)* | SC-8, SC-28, SC-13, IA-7 | Quarterly / Semi-Annual |
| 17 | Supply Chain & Software Integrity *(non-tailorable: SA-22)* | SR-3, CM-7, CM-11, SI-7, SA-22 | Monthly / Quarterly |
| 18 | Disaster Recovery / Continuity | CP-2, CP-4, CP-6, CP-7 | Semi-Annual / Annual |
| 19 | Documentation & Records Management | PL-2, AU-11, SA-5, PM-4 | Monthly / Annual |
| 20 | Compliance & Authorization (ATO) | CA-5, CA-6, CA-7, RA-3 | Monthly / Annual |

---

## Generating a New MRC (.docx)

```bash
cd scripts/
npm install docx      # first time only
node generate-mrc.js
```

### AI Prompt Pattern for SAP/JSIG Environments

> "Using the MRC template structure, generate a completed JSIG-compliant MRC for: **[task name]** on **[system/platform]**, periodicity **[daily/weekly/monthly/etc.]**, operating in a DoD SAP environment. Include JSIG-applicable NIST SP 800-53 controls, relevant STIG IDs, safety hazards, tools/access required, manpower requirements (SA role minimum), prerequisites (maintenance window, ISSM notification, CCB approval if required), and numbered procedure steps with expected results. Note any non-tailorable control applicability (AC-6(1), SA-22, SC-28)."

---

## Usage Requirements (JSIG-Specific)

- All MRCs require **written ISSM authorization** before execution (DoDM 5205.07 Vol. 1).
- **ISSM is a CCB voting member with veto authority** over SA maintenance activities that affect the accredited baseline.
- Any task introducing a configuration change requires a **CCB-approved Change Request** prior to execution.
- Completed cards must be **retained as Body of Evidence (BoE)** for the ATO package and ConMon artifacts.
- **Media authorization** (including USB/removable media used during maintenance) must be approved in writing by the PSO.
- **Nonlocal maintenance (MA-4)** requires ISSM approval and must be conducted using approved, authenticated sessions only.
- **Maintenance personnel (MA-5)** without required clearance/access must be escorted and supervised by cleared SA personnel.
- Classification banners must reflect the actual classification of the SAPF/system being maintained.

---

*Maintained by: [System Administrator Name / Team]*
*JSIG Reference: DoD Joint SAP Implementation Guide (April 2016 / current version)*
*Last Updated: April 2026*
