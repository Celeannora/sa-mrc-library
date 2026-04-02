# Changelog
### SA MRC Library — DoD SAP / JSIG Environment

All notable changes to this project are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).  
Versioning follows `MAJOR.MINOR.PATCH`:
- **MAJOR** — structural overhaul, framework change, or re-authorization event
- **MINOR** — new MRC card, new category, new template, or policy update
- **PATCH** — corrections, typo fixes, stub updates, metadata changes

---

## [Unreleased]
> Items staged for the next release. Move to a versioned section upon commit.

- [ ] MRC stubs for Categories 16–20 (encryption, supply chain, DR, documentation, ATO)
- [ ] Filled `.docx` MRC cards for all category leads
- [ ] ISSM proposal template update to reflect JSIG non-tailorable control language
- [ ] `generate-mrc.js` update to include JSIG fields (non-tailorable flag, ISSM auth ref, CCB CR number, SAPF entry approval)

---

## [1.6.0] — 2026-04-02
### Added
New **Category 22 — Security & Protection** with three JSIG-compliant MRC stubs covering BitLocker, BranchCache, and Device Health Attestation:

- `categories/22-security-protection/README.md` — Category README with NON-TAILORABLE SC-28 warning for BitLocker, service risk table, JSIG control mapping (SC-28/28(1), CM-6/7, SI-7/7(1), IA-3, AU-9)
- `MRC-2201-WK_stub.md` — **BitLocker** Weekly Encryption Status Verification
  - 11 procedure steps: volume status, NON-TAILORABLE protection check, encryption method (AES-256), TPM validation, recovery key escrow to AD, MBAM reporting, GPO verification
  - NON-TAILORABLE SC-28 stop-work language embedded in procedure and findings
  - System Encryption Status Summary table
  - JSIG controls: SC-28 [NON-TAILORABLE], SC-28(1), CM-6, AU-9
- `MRC-2202-MO_stub.md` — **BranchCache** Monthly Configuration and Content Integrity Review
  - 12 procedure steps: deployment inventory, unauthorized system check, mode verification, GPO audit, hosted cache server access control, service status, cache size limits, event log review
  - BranchCache Deployment Inventory table
  - Escalation trigger: BranchCache found on unauthorized systems → ISSM notified
  - JSIG controls: CM-6, CM-7, SC-8, AC-3, AU-9, SI-7
- `MRC-2203-MO_stub.md` — **Device Health Attestation** Monthly Status and TPM Integrity Review
  - 13 procedure steps: TPM present/enabled/ready, TPM version check, Secure Boot, UEFI mode, BitLocker TPM-binding, TPM lockout, ELAM driver, DHA attestation reports, Secure Boot event log, firmware baseline
  - Device Health Status Summary table
  - Escalation triggers: TPM absent/disabled → ISSM; Secure Boot disabled → ISSM; DHA failure → ISSM
  - JSIG controls: SI-7, SI-7(1), IA-3, CM-6, CM-7, SC-28, AU-9

### Changed
- `DOCUMENT_TRACKER.md` — Category 22 section added; Completion Summary updated: 48 → 51 MRCs, 23 → 26 stubs, 22% → 24%

---

## [1.5.0] — 2026-04-02
### Added
New **Category 21 — Name & Address Services** with three JSIG-compliant MRC stubs covering DNS Server, DHCP Server, and IPAM:

- `categories/21-name-address-services/README.md` — Category README with JSIG control table (SC-20/21/22, CM-6/7, AU-8/9, AC-3, SI-12), risk-per-service breakdown, JSIG-specific notes
- `MRC-2101-DA_stub.md` — **DNS Server** Daily Health and Zone Integrity Verification
  - 12 procedure steps: service check, dcdiag /test:dns, zone audit vs. baseline, forwarder audit, conditional forwarder check, zone transfer restriction, resolution tests, event log review
  - Escalation triggers: unauthorized forwarder → ISSM immediately; service failure → ISSM immediately
  - JSIG controls: SC-20, SC-21, SC-22, CM-6, CM-7, AU-8, AU-9
- `MRC-2102-WK_stub.md` — **DHCP Server** Weekly Health and Scope Utilization Review
  - 12 procedure steps: service check, AD authorization check, scope baseline audit, utilization check (≥ 85% escalation), lease/MAC review, server options audit, failover check, audit logging verification
  - Scope Utilization Summary table included
  - Escalation triggers: scope ≥ 85% utilized → ISSM/ISSO; rogue DHCP server → ISSM immediately
  - JSIG controls: CM-6, CM-7, AU-9, SC-22, SI-12, AC-3
- `MRC-2103-MO_stub.md` — **IPAM** Monthly Audit and Address Space Reconciliation
  - 14 procedure steps: IPAM health, DHCP/DNS sync verification, IP block audit, range utilization, unauthorized device check (MAC vs. baseline), DHCP/DNS cross-verification, stale record review, RBAC access audit
  - Address Space Summary table included
  - Escalation trigger: unauthorized device discovered → ISSM immediately
  - JSIG controls: CM-6, CM-7, AC-3, AU-9, SC-20, SC-22, SI-12

### Changed
- `DOCUMENT_TRACKER.md` — Category 21 section added (3 new stubs); Completion Summary updated: 45 → 48 MRCs, 15 → 23 stubs, overall 17% → 22%

---

## [1.4.0] — 2026-04-02
### Added
Five new JSIG-compliant MRC stubs for Category 10 — Identity & Directory Services, covering all five Active Directory role-based services:

- `MRC-1004-WK_stub.md` — **AD DS** (Active Directory Domain Services) Weekly Health & Integrity Verification
  - 14 procedure steps: dcdiag, repadmin, FSMO check, service verification, unauthorized account review, SYSVOL, GPO, lockout policy
  - JSIG controls: IA-2, IA-4, IA-5, CM-6, AU-9, SC-20, AC-2
  - Non-Compliance / Findings Log table + full sign-off block
- `MRC-1005-MO_stub.md` — **AD CS** (Active Directory Certificate Services) Monthly CA Audit
  - 14 procedure steps: CA service, SLC expiry, CRL publication, issued cert review, template audit, CDP accessibility, PKI health check
  - JSIG controls: SC-12, SC-17, IA-5(2), CM-6, AU-9, IA-3
  - CA expiry escalation trigger: notify ISSM if < 90 days remaining
- `MRC-1006-MO_stub.md` — **AD FS** (Active Directory Federation Services) Monthly Token & Trust Audit
  - 14 procedure steps: service check, token-signing/decryption cert expiry, Relying Party Trust audit, Claims Provider Trust review, endpoint audit, event log review, auth failure spike analysis
  - JSIG controls: IA-2, IA-8, SC-8, SC-28, CM-6, AU-9
  - Token cert escalation trigger: notify ISSM if < 30 days remaining
- `MRC-1007-MO_stub.md` — **AD LDS** (Active Directory Lightweight Directory Services) Monthly Instance Audit
  - 11 procedure steps: instance inventory, service health, ADSI Edit inspection, unauthorized object/account review, schema change detection, port exposure check
  - JSIG controls: IA-2, IA-4, CM-6, AU-9, AC-3, SC-28
  - AD LDS Instance Inventory table included
- `MRC-1008-MO_stub.md` — **AD RMS** (Active Directory Rights Management Services) Monthly Health & Policy Audit
  - 14 procedure steps: service/IIS health, SLC expiry, rights policy template audit, TUD/TPD trust audit, logging verification, functional content test, database backup check
  - JSIG controls: SC-8, SC-28, AC-3, AC-16, CM-6, AU-9, SI-12
  - SLC escalation trigger: notify ISSM if < 30 days remaining

### Changed
- `DOCUMENT_TRACKER.md` — 5 new MRC-10xx entries added (MRC-1004 through MRC-1008), all status 🟡 DRAFT with 🟢 stub

---

## [1.3.0] — 2026-04-02
### Added
- `MRC-0301-DA_Trellix_ePO.docx` — first fully built MRC card in the library:
  - Tool-specific: Trellix ePolicy Orchestrator (ePO)
  - 12 detailed procedure steps with nav paths, click targets, and field names (`code` style)
  - Background explanation for new SAs (what ePO is, what the check accomplishes)
  - Non-Compliance Log table (10 rows: Hostname, Last DAT Date, Agent Status, Action Taken)
  - Non-compliance disposition codes: `ONLINE-STALE`, `OFFLINE`, `UNMANAGED`
  - Action codes: `WAKE-UP SENT`, `TICKET OPENED`, `ISSO NOTIFIED`, `REMEDIATED`
  - JSIG AC-6(1) non-tailorable warning banners (header and inline)
  - Escalation trigger: ≥10% non-compliant endpoints → immediate ISSM notification
  - Findings Summary with AC-6(1) pass/fail checkbox, system counts, ISSM notification field
  - SA + ISSM/ISSO sign-off block
  - Classification banners top and bottom
  - Generation script: `mrc_0301_da_trellix.js`
- `categories/03-antivirus-edr/MRC-0301-DA_stub.md` updated to Rev 1.1:
  - Tool field added: Trellix ePO with console URL format
  - 12-step procedure summary table with nav paths
  - `.docx` status and generation date fields added

### Changed
- `DOCUMENT_TRACKER.md` — MRC-0301-DA `.docx` status updated to 🟢, revision bumped to Rev 1.1

---

## [1.2.0] — 2026-04-02
### Added
- `JSIG_COMPLIANCE.md` — comprehensive JSIG reference document covering:
  - Three non-tailorable controls (AC-6(1), SA-22, SC-28)
  - MA control family requirements (MA-1 through MA-6)
  - JSIG roles and maintenance responsibilities (AO, PSO, GSSO, ISSM, ISSO, SA)
  - Body of Evidence (BoE) artifact mapping table
  - SAPF-specific maintenance considerations
  - Incident and spillage reporting procedures
  - Full applicable references list
- JSIG compliance updates to all 20 category `README.md` files:
  - Non-tailorable control warnings added to Categories 03, 16, 17
  - JSIG/NIST control tables with JSIG-specific requirement descriptions
  - JSIG-specific notes for each category
- Updated MRC stubs for Categories 01, 02, 03 with JSIG fields:
  - `jsig_controls`, `non_tailorable`, `issm_auth_ref`, `ccb_cr_number`, `sapf_entry_approval`, `nonlocal_maintenance`
  - Enhanced procedure steps with JSIG control cross-references
  - Updated Findings Summary with non-tailorable control pass/fail checkboxes
- Updated `mrc-templates/blank/README.md` — JSIG-required fields reference table with control basis

### Changed
- `README.md` — full rewrite to reflect JSIG/SAP environment:
  - Governing framework table added
  - Non-tailorable controls table added
  - SAP Roles and Responsibilities table added
  - MRC category table updated with JSIG control column
  - AI prompt pattern updated with JSIG-specific language
  - Usage Requirements section updated with JSIG-specific obligations

---

## [1.1.0] — 2026-04-02
### Added
- `TECHNICAL_TASK_SCOPE.md` — comprehensive SA task scope with daily, weekly, and monthly assignments
- `DOCUMENT_TRACKER.md` — living tracker for all MRC cards and supporting documents

### Changed
- *(This entry will be populated upon commit of this release)*

---

## [1.0.0] — 2026-04-02
### Added
- Initial repository creation (`sa-mrc-library`, private)
- `README.md` — master index with 20-category table, AI prompt pattern, usage notes
- `JSIG_COMPLIANCE.md` — placeholder (expanded in v1.2.0)
- `issm-proposal/ISSM_Scheduled_Maintenance_Proposal_Template.docx` — full ISSM proposal template with all periodicity sections
- `issm-proposal/README.md`
- `mrc-templates/blank/MRC_Template.docx` — blank MRC template with 2 filled example cards (Daily Log Review, Monthly Patch Application)
- `mrc-templates/blank/README.md`
- `scripts/generate-mrc.js` — Node.js `.docx` MRC card generator
- `scripts/generate-issm-proposal.js` — Node.js `.docx` ISSM proposal generator
- `scripts/README.md`
- `.github/CODEOWNERS`
- **20 category folders** with `README.md` files:
  - 01 Audit & Log Management
  - 02 Patch & Vulnerability Management
  - 03 Antivirus / EDR
  - 04 Backup & Recovery
  - 05 Account & Access Management
  - 06 System Health & Performance
  - 07 Network & Boundary Security
  - 08 Configuration & Baseline Management
  - 09 Certificate & PKI Management
  - 10 Identity & Directory Services
  - 11 Time Synchronization (NTP)
  - 12 Removable Media Controls
  - 13 Physical Security & Hardware
  - 14 Incident Response Readiness
  - 15 ConMon Artifact Submission
  - 16 Encryption Verification
  - 17 Supply Chain & Software Integrity
  - 18 Disaster Recovery / Continuity
  - 19 Documentation & Records Management
  - 20 Compliance & Authorization (ATO)
- **MRC stubs** (Markdown) for Categories 01–15:
  - MRC-0101-DA, MRC-0201-MO, MRC-0301-DA, MRC-0401-DA, MRC-0502-MO
  - MRC-0601-DA, MRC-0701-DA, MRC-0801-MO, MRC-0901-WK, MRC-1001-DA
  - MRC-1101-WK, MRC-1201-MO, MRC-1301-DA, MRC-1401-QR, MRC-1501-MO

---

## Changelog Conventions

### Entry Types
| Tag | Meaning |
|-----|---------|
| `Added` | New files, MRCs, categories, or features |
| `Changed` | Updates to existing content, policy language, or structure |
| `Fixed` | Corrections to errors, typos, broken links |
| `Removed` | Deleted files or deprecated content |
| `Security` | Changes driven by a vulnerability, finding, or control update |
| `Deprecated` | Content marked for future removal |

### MRC-Specific Tags
| Tag | Meaning |
|-----|---------|
| `[MRC]` | New or updated MRC card |
| `[JSIG]` | Change driven by JSIG policy update |
| `[STIG]` | Change driven by a new or updated DISA STIG release |
| `[ATO]` | Change related to ATO renewal or re-authorization event |
| `[CCB]` | Change approved through the Change Control Board |
| `[POA&M]` | Change associated with an open POA&M item |

### Example Entry
```markdown
## [1.3.0] — YYYY-MM-DD
### Added
- [MRC] MRC-1601-QR stub — Quarterly Data-at-Rest Encryption Verification (SC-28, non-tailorable)
### Changed
- [JSIG] Updated MRC-0101-DA to reference JSIG AU-6 review frequency requirement
### Fixed
- Corrected NIST control reference in Category 07 README (SC-7 incorrectly cited as SC-8)
```

---

*Maintained by: [System Administrator Name / Team]*  
*Classification: [CLASSIFICATION]*
