# Document Tracker
### SA MRC Library — DoD SAP / JSIG Environment

Living tracker for all MRC cards, supporting documents, and templates. Update this file whenever a document is created, reviewed, approved, or revised.

**Status Legend:**

| Status | Meaning |
|--------|---------| 
| 🔴 `NOT STARTED` | Stub or placeholder only — no content drafted |
| 🟡 `DRAFT` | Content drafted — not yet ISSM reviewed or approved |
| 🟠 `ISSM REVIEW` | Submitted to ISSM for review and authorization |
| 🟢 `APPROVED` | ISSM-approved and ready for operational use |
| 🔵 `IN USE` | Actively used in operations; signed copies on file |
| ⚫ `SUPERSEDED` | Replaced by a newer revision — retain per AU-11 |
| ⚠️ `REQUIRES UPDATE` | Policy, STIG, or ATO change has invalidated content |

---

## Supporting Documents

| Document | File | Version | Status | Last Updated | Owner | Notes |
|----------|------|---------|--------|-------------|-------|-------|
| Master README | `README.md` | v1.2.0 | 🟢 APPROVED | 2026-04-02 | SA / ISSM | JSIG-updated |
| JSIG Compliance Reference | `JSIG_COMPLIANCE.md` | v1.0.0 | 🟢 APPROVED | 2026-04-02 | SA / ISSM | Non-tailorable controls documented |
| Changelog | `CHANGELOG.md` | v3.0.0 | 🟢 APPROVED | 2026-04-02 | SA | Living document |
| Document Tracker | `DOCUMENT_TRACKER.md` | v3.0.0 | 🟢 APPROVED | 2026-04-02 | SA | This file |
| Technical Task Scope | `TECHNICAL_TASK_SCOPE.md` | v1.0.0 | 🟢 APPROVED | 2026-04-02 | SA | Daily/Weekly/Monthly assignments |
| Baselines Index | `baselines/BASELINES-INDEX.md` | v1.0.0 | 🟡 DRAFT | 2026-04-02 | SA/ISSM | Role boundary matrix, escalation matrix, quick-reference |
| SA Operational Baseline | `baselines/SA-BASELINE.md` | v2.0.0 | 🟡 DRAFT | 2026-04-02 | SA | SA-only: air-gap ops, shift procedures, incident triggers |
| ISSO Operational Baseline | `baselines/ISSO-BASELINE.md` | v1.0.0 | 🟡 DRAFT | 2026-04-02 | ISSO | ISSO daily ops, ConMon, access mgmt, escalation thresholds |
| Physical Security Baseline | `baselines/PHYSEC-BASELINE.md` | v1.0.0 | 🟡 DRAFT | 2026-04-02 | PHYSEC | Access control, inspections, visitor mgmt, alarm response |
| ISSM Proposal Template | `issm-proposal/ISSM_Scheduled_Maintenance_Proposal_Template.docx` | v1.0 | 🟡 DRAFT | 2026-04-02 | SA | Pending JSIG field update |
| MRC Blank Template | `mrc-templates/blank/MRC_Template.docx` | v1.0 | 🟡 DRAFT | 2026-04-02 | SA | Pending JSIG field update in .docx |
| MRC Generation Script | `scripts/generate-mrc.js` | v1.0 | 🟡 DRAFT | 2026-04-02 | SA | Pending JSIG field additions |
| ISSM Proposal Script | `scripts/generate-issm-proposal.js` | v1.0 | 🟡 DRAFT | 2026-04-02 | SA | Pending JSIG language update |
| SW Inventory Script | `scripts/check-software-inventory.sh` | v1.0 | 🟡 DRAFT | 2026-04-03 | SA | Companion script for MRC-0103-SA; Linux Bash; dpkg/rpm |

---

## MRC Cards — Category 01: Audit & Log Management

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0101-DA | Daily Security Event and Audit Log Review | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0102-MO | Monthly Audit Log Archival and Retention Verification | Monthly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |
| MRC-0103-SA | Daily Scripted Software Inventory Check with Change Audit Logging | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-03 |

---

## MRC Cards — Category 02: Patch & Vulnerability Management

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0201-WK | Weekly WSUS Patch Status and Approval Queue Review | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0202-MO | Monthly OS and Application Patch Application and Verification | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0203-MO | Monthly Patch Compliance Report and Non-Compliant System Remediation | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0204-MO | Monthly Nessus Credentialed Vulnerability Scan Execution and Results Review | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0205-MO | Monthly Vulnerability POA&M Update and Remediation Tracking | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0206-WK | Weekly Nessus Plugin Feed Currency and Scanner Health Check | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 03: Antivirus / EDR ⚠️ NON-TAILORABLE: AC-6(1)

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0301-DA | Daily AV Definition Currency and Agent Health Verification — Trellix ePO | Daily | 🟢 | 🟢 | — | 🟡 DRAFT | Rev 1.1 | 2026-04-02 |
| MRC-0301-WK | Weekly EDR Policy Compliance and Threat Event Review — Trellix ePO | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 04: Backup & Recovery

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0401-DA | Daily Backup Job Completion and Health Verification | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.1 | 2026-04-02 |

---

## MRC Cards — Category 05: Account & Access Management

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0501-MO | Monthly User Account Review and Dormant Account Audit | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0502-MO | Monthly Privileged Account Recertification | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.1 | 2026-04-02 |

---

## MRC Cards — Category 06: System Health & Performance

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0601-DA | Daily System Health Dashboard Review | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 07: Network & Boundary Security

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0701-DA | Daily IDS/IPS and Network Alert Review | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.1 | 2026-04-02 |

---

## MRC Cards — Category 08: Configuration & Baseline Management

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0801-MO | Monthly STIG/SCAP Scan and Configuration Drift Detection | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 09: Certificate & PKI Management

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0901-WK | Weekly Certificate Expiration Look-Ahead (30-Day) | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 10: Identity & Directory Services

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1001-DA | Daily Domain Controller Replication and Health Check | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1002-QR | Quarterly Group Policy Audit and Configuration Baseline Review | Quarterly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1004-WK | Weekly AD DS Health and Integrity Verification | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1005-MO | Monthly AD CS Health and Certificate Authority Audit | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1006-MO | Monthly AD FS Health and Token Configuration Audit | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1007-MO | Monthly AD LDS Health and Instance Audit | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1008-MO | Monthly AD RMS Health and Policy Audit | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 11: Time Synchronization (NTP)

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1101-WK | Weekly NTP Synchronization Verification | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 12: Removable Media Controls

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1201-WK | Weekly Removable Media Scan Station and DLP Policy Enforcement Check | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 13: Physical Security & Hardware

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1301-DA | Daily Physical Access Log Review and Equipment Visual Inspection | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.1 | 2026-04-02 |
| MRC-1301-QR | Quarterly Hardware Lifecycle and Firmware Review | Quarterly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1302-SA | Semi-Annual UPS Load Test and Battery Health Verification | Semi-Annual | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 14: Incident Response Readiness

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1401-QR | Quarterly Incident Response Plan and Escalation Path Review | Quarterly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.1 | 2026-04-02 |

---

## MRC Cards — Category 15: ConMon Artifact Submission

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1501-MO | Monthly ConMon Artifact Compilation and Submission | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.1 | 2026-04-02 |

---

## MRC Cards — Category 16: Encryption Verification ⚠️ NON-TAILORABLE: SC-28

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1601-QR | Quarterly Data-at-Rest Encryption Audit — BitLocker / VeraCrypt | Quarterly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1602-SA | Semi-Annual Full Cryptographic Implementation Review | Semi-Annual | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1603-MO | Monthly BitLocker Recovery Key Escrow and TPM Integrity Verification | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 17: Supply Chain & Software Integrity ⚠️ NON-TAILORABLE: SA-22

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1701-MO | Monthly Software Inventory Audit and EOL/Unsupported Component Check | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1702-QR | Quarterly Supply Chain Risk and Software Integrity Verification | Quarterly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 18: Disaster Recovery / Continuity

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1801-SA | Semi-Annual DR Tabletop or Live Failover Exercise | Semi-Annual | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1802-AN | Annual Full Disaster Recovery Exercise | Annual | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 19: Documentation & Records Management

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1901-MO | Monthly Documentation Currency and MRC Filing Verification | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1902-AN | Annual SSP Review and Records Retention Audit | Annual | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 20: Compliance & Authorization (ATO)

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-2001-MO | Monthly ATO Status and POA&M Milestone Review | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2002-AN | Annual ATO Renewal Package Preparation | Annual | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 21: Name & Address Services

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-2101-DA | Daily DNS Server Health and Zone Integrity Verification | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2102-WK | Weekly DHCP Server Health and Scope Utilization Review | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2103-MO | Monthly IPAM Audit and Address Space Reconciliation | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 22: Security & Protection ⚠️ NON-TAILORABLE: SC-28 (BitLocker)

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-2201-WK | Weekly BitLocker Encryption Status Verification | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2202-MO | Monthly BranchCache Configuration and Content Integrity Review | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2203-MO | Monthly Device Health Attestation Status and TPM Integrity Review | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 23: File & Storage Services

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-2301-WK | Weekly File Server Share and ACL Integrity Review | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2302-MO | Monthly Storage Services Health and LUN Integrity Audit | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2303-WK | Weekly DFS Namespace and Replication Health Verification | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2304-MO | Monthly FSRM Quota and File Screen Compliance Review | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2305-MO | Monthly Data Deduplication Health and Savings Verification | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2306-WK | Weekly IIS-Hosted Share and Web Application Storage Review | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2307-MO | Monthly Storage Capacity Trending and Quota Enforcement Audit | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 24: Web Server (IIS)

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-2401-WK | Weekly IIS Web Server Service Health and Site Inventory Review | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2402-MO | Monthly IIS HTTP Features Configuration and Directory Hardening Audit | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2403-WK | Weekly IIS Security Configuration and Authentication Audit | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2404-MO | Monthly IIS Performance Settings and Logging Compliance Review | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

> **Note:** MRC-2405-WK and MRC-2406-MO (IIS-related storage/capacity) were moved to Category 23 as MRC-2306-WK and MRC-2307-MO during v3.0.0 baseline cleanup.

---

## ~~Category 25: Vulnerability Scanning and Tracking~~ *(MERGED INTO CAT 02)*

> **Removed in v3.0.0.** MRC-2501-MO, MRC-2502-MO, and MRC-2503-WK were merged into Category 02 as MRC-0204-MO, MRC-0205-MO, and MRC-0206-WK respectively. Cat 25 directory deleted. See Category 02 table above.

---

## Completion Summary

| Category | Total MRCs | Stub Complete | .docx Complete | ISSM Approved | % Done |
|----------|-----------|--------------|---------------|--------------|--------|
| 01 Audit & Log Management | 3 | 2 | 0 | 0 | 33% |
| 02 Patch & Vulnerability Mgmt | 6 | 6 | 0 | 0 | 50% |
| 03 Antivirus / EDR | 2 | 2 | 1 | 0 | 63% |
| 04 Backup & Recovery | 1 | 1 | 0 | 0 | 50% |
| 05 Account & Access Management | 2 | 2 | 0 | 0 | 50% |
| 06 System Health & Performance | 1 | 1 | 0 | 0 | 50% |
| 07 Network & Boundary Security | 1 | 1 | 0 | 0 | 50% |
| 08 Configuration & Baseline | 1 | 1 | 0 | 0 | 50% |
| 09 Certificate & PKI | 1 | 1 | 0 | 0 | 50% |
| 10 Identity & Directory | 7 | 7 | 0 | 0 | 50% |
| 11 Time Synchronization | 1 | 1 | 0 | 0 | 50% |
| 12 Removable Media Controls | 1 | 1 | 0 | 0 | 50% |
| 13 Physical Security & Hardware | 3 | 3 | 0 | 0 | 50% |
| 14 Incident Response | 1 | 1 | 0 | 0 | 50% |
| 15 ConMon Artifacts | 1 | 1 | 0 | 0 | 50% |
| 16 Encryption Verification | 3 | 3 | 0 | 0 | 50% |
| 17 Supply Chain & Software | 2 | 2 | 0 | 0 | 50% |
| 18 Disaster Recovery | 2 | 2 | 0 | 0 | 50% |
| 19 Documentation & Records | 2 | 2 | 0 | 0 | 50% |
| 20 Compliance & ATO | 2 | 2 | 0 | 0 | 50% |
| 21 Name & Address Services | 3 | 3 | 0 | 0 | 50% |
| 22 Security & Protection | 3 | 3 | 0 | 0 | 50% |
| 23 File & Storage Services | 7 | 7 | 0 | 0 | 50% |
| 24 Web Server (IIS) | 4 | 4 | 0 | 0 | 50% |
| 25 Vuln Scanning | ~~3~~ | ~~3~~ | ~~0~~ | ~~0~~ | **MERGED → Cat 02** |
| **TOTAL** | **58** | **58** | **1** | **0** | **53%** |

> **v3.1.0 note:** All 57 stubs complete and in new format. Category 20 stubs added in v3.1.0 — library stub coverage is now 100%.
> **v3.2.0 note:** MRC-0103-SA added to Category 01 — daily scripted software inventory with change audit logging (JSIG AU-2, AU-6, AU-9, CM-8, CM-8(1), SA-22, SI-7). Total MRC count: 58.

---

## How to Update This Tracker

1. When a stub is completed → change `Stub` column to 🟢 and `Status` to `🟡 DRAFT`
2. When a `.docx` is generated → change `.docx` column to 🟢
3. When submitted to ISSM → change `Status` to `🟠 ISSM REVIEW`
4. When ISSM authorizes → change `ISSM Auth` to `[Auth Ref # — Date]` and `Status` to `🟢 APPROVED`
5. When actively signed and filed → change `Status` to `🔵 IN USE`
6. When a new revision is issued → update `Revision` column; move old entry to ⚫ SUPERSEDED
7. Update the **Completion Summary** table totals after any status change
8. Add a corresponding entry to `CHANGELOG.md`

---

*Last Updated: 2026-04-03 | Version: v3.2.0 | Classification: [CLASSIFICATION]*
