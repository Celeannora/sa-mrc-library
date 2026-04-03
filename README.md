# SA MRC Library
### System Administrator — Maintenance Requirement Cards
#### JSIG / RMF Compliant | DoD SAP Environment

A structured library of **Maintenance Requirement Cards (MRCs)** for use by System Administrators operating in ISSM-governed **Special Access Program (SAP)** environments. All cards are aligned to the **Joint SAP Implementation Guide (JSIG)**, NIST SP 800-53 Rev. 5, CNSSI 1253, and DoDM 5205.07 Vol. 1. All tasks require written ISSM authorization prior to execution.

**Current state:** v3.1.0 — 57 MRC stubs across 24 categories | 100% stub coverage | All cards in uniform new format

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

| Control | Title | Requirement | MRC Category |
|---------|-------|-------------|-------------|
| **AC-6(1)** | Least Privilege — Authorize Access to Security Functions | Endpoint protection shall not be absent | Cat 03 — AV/EDR |
| **SC-28** | Protection of Information at Rest | Encryption at rest shall be implemented on all SAP systems | Cat 16 & 22 |
| **SA-22** | Unsupported System Components | No EOL/unsupported components permitted on any SAP system | Cat 17 — Supply Chain |

---

## SAP Roles and Responsibilities

| Role | Abbreviation | Maintenance Relevance |
|------|-------------|----------------------|
| Authorizing Official | AO | Grants/revokes ATOs; final authority on risk acceptance |
| Program Security Officer | PSO | Approves entry/removal of IS into SAPF; authorizes all digital media |
| Gov't/Contractor SAP Security Officer | GSSO / CSSO | Coordinates on IR Plan; develops media sanitization procedures |
| Information System Security Manager | **ISSM** | Owns the ATO and ConMon program; CCB voting member with veto; authorizes all MRC execution |
| Information System Security Officer | **ISSO** | Collects/reviews audit records; conducts compliance reviews; subordinate to ISSM |
| System Administrator | **SA** | Executes all MRC tasks; submits maintenance proposals to ISSM; implements CM policies |

> ISSM and ISSO appointments must be **in writing**. ISSM is not a collateral duty in a SAP environment. ISSO is subordinate to ISSM — all risk acceptance, policy decisions, and non-tailorable findings escalate directly to ISSM.

---

## Repository Structure

```
sa-mrc-library/
├── README.md                         ← This file
├── CHANGELOG.md                      ← Version history
├── DOCUMENT_TRACKER.md               ← Status tracker for all 57 MRC stubs
├── JSIG_COMPLIANCE.md                ← JSIG control mapping, non-tailorable controls
├── TECHNICAL_TASK_SCOPE.md           ← Daily/Weekly/Monthly SA task assignments by role
│
├── baselines/                        ← Role-separated operational baselines
│   ├── BASELINES-INDEX.md            ← Role boundary matrix and escalation matrix
│   ├── SA-BASELINE.md                ← SA daily ops, air-gap procedures, incident triggers
│   ├── ISSO-BASELINE.md              ← ISSO ConMon, access mgmt, escalation thresholds
│   └── PHYSEC-BASELINE.md            ← Physical security: access control, inspections, visitor mgmt
│
├── issm-proposal/                    ← ISSM Scheduled Maintenance Proposal (.docx + README)
│
├── mrc-templates/
│   ├── MRC_Template.docx             ← Blank MRC template
│   ├── README.md
│   ├── blank/                        ← Blank template field reference
│   └── examples/                     ← Filled example MRCs
│
├── scripts/                          ← Node.js .docx generation scripts
│   ├── generate-mrc.js
│   ├── generate-issm-proposal.js
│   └── README.md
│
└── categories/                       ← 24 MRC categories — one folder per category
    ├── 01-audit-log-management/           (1 MRC)
    ├── 02-patch-vulnerability-management/ (6 MRCs)
    ├── 03-antivirus-edr/                  (2 MRCs)
    ├── 04-backup-recovery/                (1 MRC)
    ├── 05-account-access-management/      (2 MRCs)
    ├── 06-system-health-performance/      (1 MRC)
    ├── 07-network-boundary-security/      (1 MRC)
    ├── 08-configuration-baseline-management/ (1 MRC)
    ├── 09-certificate-pki-management/     (1 MRC)
    ├── 10-identity-directory-services/    (7 MRCs)
    ├── 11-time-synchronization-ntp/       (1 MRC)
    ├── 12-removable-media-controls/       (1 MRC)
    ├── 13-physical-security-hardware/     (3 MRCs)
    ├── 14-incident-response-readiness/    (1 MRC)
    ├── 15-conmon-artifact-submission/     (1 MRC)
    ├── 16-encryption-verification/        (3 MRCs)
    ├── 17-supply-chain-software-integrity/ (2 MRCs)
    ├── 18-disaster-recovery-continuity/   (2 MRCs)
    ├── 19-documentation-records-management/ (2 MRCs)
    ├── 20-compliance-authorization-ato/   (2 MRCs)
    ├── 21-name-address-services/          (3 MRCs)
    ├── 22-security-protection/            (3 MRCs)
    ├── 23-file-storage-services/          (7 MRCs)
    └── 24-web-server-iis/                 (4 MRCs)
```

---

## MRC Categories — Full Index

| # | Category | MRCs | Key Controls | Periodicities | Non-Tailorable |
|---|----------|:----:|-------------|--------------|:--------------:|
| 01 | Audit & Log Management | 1 | AU-2, AU-3, AU-6, AU-9, AU-11, SI-4 | DA / MO | |
| 02 | Patch & Vulnerability Management | 6 | SI-2, CM-3, CM-6, RA-5, RA-5(1), PM-4 | WK / MO | |
| 03 | Antivirus / EDR | 2 | SI-3, SI-8, CM-6, AC-6(1) | DA / WK | ⚠️ AC-6(1) |
| 04 | Backup & Recovery | 1 | CP-9, CP-9(1), CP-10 | DA | |
| 05 | Account & Access Management | 2 | AC-2, AC-2(3), AC-3, AC-6, IA-4, IA-5 | MO | |
| 06 | System Health & Performance | 1 | CA-7, SI-4, CP-9 | DA | |
| 07 | Network & Boundary Security | 1 | SC-7, SI-4, AU-6, IR-6 | DA | |
| 08 | Configuration & Baseline Management | 1 | CM-2, CM-6, CM-7, CM-8, SA-10 | MO | |
| 09 | Certificate & PKI Management | 1 | IA-3, IA-5, SC-8, SC-17 | WK | |
| 10 | Identity & Directory Services | 7 | IA-2, IA-4, CM-6, SC-20 | DA / WK / MO / QR | |
| 11 | Time Synchronization (NTP) | 1 | AU-8, SC-45 | WK | |
| 12 | Removable Media Controls | 1 | MP-7, MP-2, CM-7 | WK | |
| 13 | Physical Security & Hardware | 3 | PE-2, PE-3, PE-6, PE-8, MA-5 | DA / QR / SA | |
| 14 | Incident Response Readiness | 1 | IR-3, IR-4, IR-8, IR-9 | QR | |
| 15 | ConMon Artifact Submission | 1 | CA-7, CA-7(1), PM-6, AU-9 | MO | |
| 16 | Encryption Verification | 3 | SC-8, SC-28, SC-13, IA-7 | MO / QR / SA | ⚠️ SC-28 |
| 17 | Supply Chain & Software Integrity | 2 | SR-3, CM-7, CM-11, SI-7, SA-22 | MO / QR | ⚠️ SA-22 |
| 18 | Disaster Recovery / Continuity | 2 | CP-2, CP-4, CP-6, CP-7 | SA / AN | |
| 19 | Documentation & Records Management | 2 | PL-2, AU-11, SA-5, PM-4 | MO / AN | |
| 20 | Compliance & Authorization (ATO) | 2 | CA-5, CA-6, CA-7, RA-3, PM-4 | MO / AN | |
| 21 | Name & Address Services | 3 | SC-20, SC-21, SC-22, CM-6 | DA / WK / MO | |
| 22 | Security & Protection | 3 | SC-28, CM-6, IA-7 | WK / MO | ⚠️ SC-28 |
| 23 | File & Storage Services | 7 | AC-3, AU-9, CM-6, CP-9, SI-12 | WK / MO | |
| 24 | Web Server (IIS) | 4 | CM-6, CM-7, AU-9, SC-8, SI-2 | WK / MO | |

**Periodicity key:** DA = Daily | WK = Weekly | MO = Monthly | QR = Quarterly | SA = Semi-Annual | AN = Annual

---

## MRC Card Format

Every stub follows a uniform structure:

```
YAML Frontmatter       ← mrc_id, category, periodicity, est_time, JSIG controls,
                          ISSM auth ref, CCB CR number, SAPF entry approval,
                          nonlocal maintenance flag, docx_status
─────────────────────────────────────────────────────────
Background (New SA)    ← Plain-language explanation of why this task matters
Safety / Hazards       ← JSIG-specific warnings; non-tailorable control callouts
Tools / Equipment      ← All required access, consoles, scripts
Reference Documents    ← Applicable JSIG controls, STIGs, site docs
Manpower Requirements  ← SA role, ISSM notification thresholds
Prerequisites          ← MA-2 authorization, maintenance window, access confirmed
─────────────────────────────────────────────────────────
Procedure Steps        ← Step | Action | Nav Path / Command | Expected Result
─────────────────────────────────────────────────────────
Supplemental Tables    ← Scan summaries, account review tables, artifact checklists
Non-Compliance Log     ← Finding | Control | Action | Escalated To | Resolved
Findings Summary       ← Checkbox result block with escalation status
Sign-Off               ← SA + ISSM/ISSO signature block
```

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
- **Sneakernet / inbound media** must be scanned at the designated scan station before introduction into the SAPF — no exceptions.
- Classification banners must reflect the actual classification of the SAPF/system being maintained.

---

*Maintained by: [System Administrator Name / Team]*
*JSIG Reference: DoD Joint SAP Implementation Guide (current version)*
*Last Updated: April 2026 | v3.1.0*
