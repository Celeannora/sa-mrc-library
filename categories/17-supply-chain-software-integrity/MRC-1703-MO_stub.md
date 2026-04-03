---
mrc_id: MRC-1703-MO
title: "Monthly Domain Software Inventory Scan — Nessus Cross-Reference and EOL/Upgrade Path Documentation"
category: "17 — Supply Chain & Software Integrity"
periodicity: Monthly
est_time: "1.5–2 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "SCCM Software Inventory, PowerShell, Nessus/ACAS Plugin 20811 (EOL), Approved Software List"
jsig_controls:
  - SA-22
  - CM-7
  - CM-8
  - CM-11
non_tailorable: true
non_tailorable_control: "SA-22 — No EOL/unsupported components permitted on SAP systems"
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1703-MO — Monthly Domain Software Inventory and EOL/Upgrade Path Documentation

## ⚠️ NON-TAILORABLE CONTROL — SA-22

---

## 1. Background (New SA)

**What this MRC adds over MRC-1701-MO:**
MRC-1701-MO is the baseline monthly software inventory check. This MRC focuses specifically on:
1. Cross-referencing the domain software inventory against Nessus EOL findings (Plugin 20811 and related)
2. Documenting a formal upgrade path or EOL remediation plan for any component approaching or at end-of-life
3. Verifying the Approved Software List (ASL) is current — any software in the environment not on the ASL is unauthorized

**Upgrade path documentation:**
For every component flagged as EOL or approaching EOL, the SA documents:
- Current version and EOS date
- Approved replacement (or vendor-approved upgrade path)
- Target timeline (CCB milestone)
- Whether the replacement is already on the ASL

---

## 2. Procedure Steps

| Step | Action | Command | Expected Result |
|------|--------|---------|-----------------|
| 1 | Pull SCCM software inventory | SCCM → Reports → Software → All Software | Full domain software list |
| 2 | Export to CSV | CSV export to admin workstation | File saved for comparison |
| 3 | Run Nessus scan — EOL plugin family | ACAS → Scan → Plugin 20811 + "Unsupported Software" family | EOL findings by host |
| 4 | Cross-reference SCCM inventory with Nessus EOL results | Side-by-side | Any software flagged EOL by Nessus confirmed in SCCM inventory = SA-22 finding |
| 5 | For each EOL/EOS software: check vendor upgrade path | Vendor product lifecycle page (external workstation) | Document: Current version, EOS date, replacement product, upgrade path |
| 6 | Verify replacement product is on ASL | ASL → Check replacement product | Not on ASL = cannot plan upgrade yet — submit ASL addition request to ISSM first |
| 7 | Any EOL software with no upgrade path available | Document as SA-22 finding; notify ISSM | ISSM directs disposition (waiver or removal) |
| 8 | Compare domain software inventory to ASL | Any installed software not on ASL = unauthorized | Notify ISSM; do not remove without direction |
| 9 | Update EOL/Upgrade Tracking Table (Section 8) | | All EOL software tracked with path |
| 10 | Submit findings to ISSM | | ISSM acknowledges |
| 11 | Sign-Off block | Section 9 | Signatures obtained |

---

## 8. EOL / Upgrade Path Tracking Table

| # | Software | Version | EOS Date | Nessus Flag? | Replacement | Replacement on ASL? | CCB Milestone | Status |
|---|---------|---------|---------|------------|------------|--------------------|--------------|----|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |

---

## 9. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1703-MO | Rev 1.0 | Category 17 — Supply Chain & Software Integrity | ⚠️ NON-TAILORABLE SA-22*
*Classification: [CLASSIFICATION]*
