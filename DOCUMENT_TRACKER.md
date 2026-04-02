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
| Changelog | `CHANGELOG.md` | v1.1.0 | 🟢 APPROVED | 2026-04-02 | SA | Living document |
| Document Tracker | `DOCUMENT_TRACKER.md` | v1.0.0 | 🟢 APPROVED | 2026-04-02 | SA | This file |
| Technical Task Scope | `TECHNICAL_TASK_SCOPE.md` | v1.0.0 | 🟢 APPROVED | 2026-04-02 | SA | Daily/Weekly/Monthly assignments |
| Baselines Index | `baselines/BASELINES-INDEX.md` | v1.0.0 | 🟡 DRAFT | 2026-04-02 | SA/ISSM | Role boundary matrix, escalation matrix, quick-reference |
| SA Operational Baseline | `baselines/SA-BASELINE.md` | v2.0.0 | 🟡 DRAFT | 2026-04-02 | SA | SA-only: air-gap ops, shift procedures, incident triggers |
| ISSO Operational Baseline | `baselines/ISSO-BASELINE.md` | v1.0.0 | 🟡 DRAFT | 2026-04-02 | ISSO | ISSO daily ops, ConMon, access mgmt, escalation thresholds |
| Physical Security Baseline | `baselines/PHYSEC-BASELINE.md` | v1.0.0 | 🟡 DRAFT | 2026-04-02 | PHYSEC | Access control, inspections, visitor mgmt, alarm response |
| ISSM Proposal Template | `issm-proposal/ISSM_Scheduled_Maintenance_Proposal_Template.docx` | v1.0 | 🟡 DRAFT | 2026-04-02 | SA | Pending JSIG field update |
| MRC Blank Template | `mrc-templates/blank/MRC_Template.docx` | v1.0 | 🟡 DRAFT | 2026-04-02 | SA | Pending JSIG field update in .docx |
| MRC Generation Script | `scripts/generate-mrc.js` | v1.0 | 🟡 DRAFT | 2026-04-02 | SA | Pending JSIG field additions |
| ISSM Proposal Script | `scripts/generate-issm-proposal.js` | v1.0 | 🟡 DRAFT | 2026-04-02 | SA | Pending JSIG language update |

---

## MRC Cards — Category 01: Audit & Log Management

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0101-DA | Daily Security Event and Audit Log Review | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0102-MO | Monthly Audit Log Archival and Retention Verification | Monthly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 02: Patch & Vulnerability Management

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0201-MO | Monthly OS and Application Patch Application and Verification | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0202-MO | Monthly Vulnerability Scan Execution and Findings Review | Monthly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |
| MRC-0203-QR | Quarterly Patch Compliance Audit | Quarterly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 03: Antivirus / EDR ⚠️ NON-TAILORABLE: AC-6(1)

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0301-DA | Daily AV Definition Currency and Agent Health Verification — Trellix ePO | Daily | 🟢 | 🟢 | — | 🟡 DRAFT | Rev 1.1 | 2026-04-02 |
| MRC-0302-MO | Monthly EDR Policy Compliance and Full Scan Review | Monthly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 04: Backup & Recovery

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0401-DA | Daily Backup Job Completion and Health Verification | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0402-MO | Monthly Backup Restore Test | Monthly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |
| MRC-0403-QR | Quarterly Full System Restore Exercise | Quarterly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 05: Account & Access Management

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0501-WK | Weekly Dormant and Anomalous Account Review | Weekly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |
| MRC-0502-MO | Monthly Privileged Account Recertification | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0503-QR | Quarterly Full Access Control Audit | Quarterly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 06: System Health & Performance

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0601-DA | Daily System Health Dashboard Review | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0602-MO | Monthly Resource Utilization Trend Analysis | Monthly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 07: Network & Boundary Security

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0701-DA | Daily IDS/IPS and Network Alert Review | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0702-QR | Quarterly Firewall Rule and ACL Audit | Quarterly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 08: Configuration & Baseline Management

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0801-MO | Monthly STIG/SCAP Scan and Configuration Drift Detection | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0802-MO | Monthly Software Inventory Reconciliation | Monthly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |
| MRC-0803-QR | Quarterly Baseline Configuration Review | Quarterly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 09: Certificate & PKI Management

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-0901-WK | Weekly Certificate Expiration Look-Ahead (30-Day) | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-0902-SA | Semi-Annual Full PKI Chain and Certificate Audit | Semi-Annual | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 10: Identity & Directory Services

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1001-DA | Daily Domain Controller Replication and Health Check | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1002-MO | Monthly DNS Zone Integrity and DHCP Scope Review | Monthly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |
| MRC-1003-QR | Quarterly Group Policy Audit | Quarterly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |
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
| MRC-1201-MO | Monthly Removable Media Policy Enforcement Verification | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1202-QR | Quarterly Removable Media Inventory and Authorization Audit | Quarterly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 13: Physical Security & Hardware

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1301-DA | Daily Physical Access Log and Equipment Visual Check | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1302-QR | Quarterly Hardware Lifecycle and Firmware Review | Quarterly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |
| MRC-1303-SA | Semi-Annual UPS and Generator Test | Semi-Annual | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 14: Incident Response Readiness

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1401-QR | Quarterly IR Plan and Escalation Path Review | Quarterly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1402-AN | Annual IR Tabletop Exercise | Annual | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 15: ConMon Artifact Submission

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1501-MO | Monthly ConMon Artifact Compilation and Submission | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-1502-QR | Quarterly ConMon Package Review with ISSM | Quarterly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 16: Encryption Verification ⚠️ NON-TAILORABLE: SC-28

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1601-QR | Quarterly Data-at-Rest Encryption Verification | Quarterly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |
| MRC-1602-SA | Semi-Annual Full Cryptographic Implementation Review | Semi-Annual | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 17: Supply Chain & Software Integrity ⚠️ NON-TAILORABLE: SA-22

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1701-MO | Monthly Software Inventory and EOL/Unsupported Component Check | Monthly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |
| MRC-1702-QR | Quarterly Supply Chain and Software Integrity Verification | Quarterly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 18: Disaster Recovery / Continuity

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1801-SA | Semi-Annual DR Tabletop or Live Failover Exercise | Semi-Annual | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |
| MRC-1802-AN | Annual Full Disaster Recovery Exercise | Annual | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 19: Documentation & Records Management

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-1901-MO | Monthly Documentation Currency and POA&M Review | Monthly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |
| MRC-1902-AN | Annual SSP and Records Retention Audit | Annual | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## MRC Cards — Category 20: Compliance & Authorization (ATO)

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-2001-MO | Monthly ATO Status and POA&M Milestone Review | Monthly | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |
| MRC-2002-AN | Annual ATO Renewal Package Preparation | Annual | 🔴 | 🔴 | — | 🔴 NOT STARTED | — | — |

---

## Completion Summary

| Category | Total MRCs | Stub Complete | .docx Complete | ISSM Approved | % Done |
|----------|-----------|--------------|---------------|--------------|--------|
| 01 Audit & Log Management | 2 | 1 | 0 | 0 | 25% |
| 02 Patch & Vulnerability Mgmt | 3 | 1 | 0 | 0 | 17% |
| 03 Antivirus / EDR | 2 | 1 | 0 | 0 | 25% |
| 04 Backup & Recovery | 3 | 1 | 0 | 0 | 17% |
| 05 Account & Access Management | 3 | 1 | 0 | 0 | 17% |
| 06 System Health & Performance | 2 | 1 | 0 | 0 | 25% |
| 07 Network & Boundary Security | 2 | 1 | 0 | 0 | 25% |
| 08 Configuration & Baseline | 3 | 1 | 0 | 0 | 17% |
| 09 Certificate & PKI | 2 | 1 | 0 | 0 | 25% |
| 10 Identity & Directory | 3 | 1 | 0 | 0 | 17% |
| 11 Time Synchronization | 1 | 1 | 0 | 0 | 50% |
| 12 Removable Media Controls | 2 | 1 | 0 | 0 | 25% |
| 13 Physical Security & Hardware | 3 | 1 | 0 | 0 | 17% |
| 14 Incident Response | 2 | 1 | 0 | 0 | 25% |
| 15 ConMon Artifacts | 2 | 1 | 0 | 0 | 25% |
| 16 Encryption Verification | 2 | 0 | 0 | 0 | 0% |
| 17 Supply Chain & Software | 2 | 0 | 0 | 0 | 0% |
| 18 Disaster Recovery | 2 | 0 | 0 | 0 | 0% |
| 19 Documentation & Records | 2 | 0 | 0 | 0 | 0% |
| 20 Compliance & ATO | 2 | 0 | 0 | 0 | 0% |
| **TOTAL** | **63** | **38** | **1** | **0** | **31%** |

---

## MRC Cards — Category 25: Vulnerability Scanning and Tracking (Nessus)

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-2501-MO | Monthly Nessus Credentialed Vulnerability Scan Execution and Results Review | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2502-MO | Monthly Vulnerability POA&M Update and Remediation Tracking | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2503-WK | Weekly Nessus Plugin Feed Currency and Scanner Health Check | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 24: Web Server (IIS)

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-2401-WK | Weekly IIS Web Server Service Health and Site Inventory Review | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2402-MO | Monthly IIS HTTP Features Configuration and Directory Hardening Audit | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2403-WK | Weekly IIS Security Configuration and Authentication Audit | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2404-MO | Monthly IIS Performance Settings and Logging Compliance Review | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 23: File and Storage Services

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-2301-WK | Weekly File Server Share and ACL Integrity Review | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2302-MO | Monthly Storage Services Health and LUN Integrity Audit | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2303-WK | Weekly DFS Namespace and Replication Health Verification | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2304-MO | Monthly FSRM Quota and File Screen Compliance Review | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2305-MO | Monthly Data Deduplication Health and Savings Verification | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 22: Security & Protection ⚠️ NON-TAILORABLE: SC-28 (BitLocker)

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-2201-WK | Weekly BitLocker Encryption Status Verification | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2202-MO | Monthly BranchCache Configuration and Content Integrity Review | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2203-MO | Monthly Device Health Attestation Status and TPM Integrity Review | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

---

## MRC Cards — Category 21: Name & Address Services

| MRC ID | Title | Periodicity | Stub | .docx | ISSM Auth | Status | Revision | Last Reviewed |
|--------|-------|-------------|------|-------|-----------|--------|----------|---------------|
| MRC-2101-DA | Daily DNS Server Health and Zone Integrity Verification | Daily | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2102-WK | Weekly DHCP Server Health and Scope Utilization Review | Weekly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |
| MRC-2103-MO | Monthly IPAM Audit and Address Space Reconciliation | Monthly | 🟢 | 🔴 | — | 🟡 DRAFT | Rev 1.0 | 2026-04-02 |

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

*Last Updated: 2026-04-02 | Classification: [CLASSIFICATION]*
