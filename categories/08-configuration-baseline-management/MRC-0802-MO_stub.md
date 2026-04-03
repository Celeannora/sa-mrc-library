---
mrc_id: MRC-0802-MO
title: "Monthly Approved Software List Compliance Spot-Check"
category: "08 — Configuration & Baseline Management"
periodicity: Monthly
est_time: "1–2 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Software inventory tool or endpoint management console ([SITE-DESIGNATED ENDPOINT MANAGEMENT PLATFORM]), directory services or remote management tool, approved software list (ASL)"
jsig_controls:
  - CM-7
  - CM-11
  - CM-8
  - SA-22
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-0802-MO — Monthly Approved Software List Compliance Spot-Check

---

## 1. Background (New SA)

**What the Approved Software List (ASL) is:**
The ISSM maintains a document called the Approved Software List (ASL) — the definitive list of every software title authorized to be installed on systems in this SAP environment. Any software on a managed system that is not on the ASL is unauthorized. Unauthorized software is a potential CM-7 (Least Functionality) and CM-11 (User-Installed Software) violation, and if the software is end-of-life or unsupported, it is also a potential SA-22 finding.

**Why a monthly spot-check is needed alongside the daily automated check (MRC-0103-SA):**
The daily scripted inventory (MRC-0103-SA) provides hash-based change detection — it tells you *what changed*. This monthly MRC takes a different approach: it samples a representative set of systems and verifies the *current installed state* against the ASL directly, providing human-reviewed confirmation that the ASL itself is accurate and that the automated inventory reflects reality. It also specifically looks for software categories that are commonly introduced without CCB review: browser plugins and extensions, developer tools, compression utilities, and remote access software.

**Scope — spot-check methodology:**
Each monthly cycle, select [ISSM-defined sample size — e.g., 5–10] systems spanning workstations, servers, and domain controllers. Vary the sample each month so that all system types and users are covered over a rolling 3-month window. Document the systems selected and the basis for selection.

**SA-22 special focus:**
Any software identified as end-of-life or vendor-unsupported — regardless of whether it was on a prior ASL version — must be reported to the ISSM same-day as a potential SA-22 violation.

---

## 2. Safety / Hazards

> ⚠️ **DO NOT REMOVE SOFTWARE WITHOUT AUTHORIZATION:** If unauthorized software is found, do not uninstall it without a CCB-approved Change Request and ISSM written authorization. Unauthorized removal of software can affect system function — document the finding and await ISSM direction.

> ⚠️ **SA-22 REPORTING:** Any EOL or unsupported software identified must be reported to the ISSM within the same duty day. Do not defer SA-22 findings.

> ⚠️ **ASL VERSION CONTROL:** Use the current, ISSM-signed version of the ASL for this check. Do not rely on memory or an outdated copy.

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** ISSM written authorization required (MA-2).

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| Software inventory query tool | [SITE-DESIGNATED ENDPOINT MANAGEMENT PLATFORM] or OS-native software enumeration (e.g., installed programs list, package manager query, or equivalent) |
| Approved Software List (ASL) | ISSM-maintained — current signed version required |
| Remote management access | To query selected systems remotely, or physical access for standalone hosts |
| MRC Sign-Off Block | SA and ISSM/ISSO signatures |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| JSIG CM-7 — Least Functionality | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG CM-11 — User-Installed Software | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG CM-8 — Information System Component Inventory | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG SA-22 — Unsupported System Components | ISSM SharePoint / SAP Cybersecurity Binder |
| Approved Software List (ASL) | SA Document Repository / ISSM Binder — current signed version |
| System Security Plan (SSP) — Software Section | ISSM SharePoint |
| MRC-0103-SA | Daily Scripted Software Inventory Check (cross-reference — provides automated daily baseline) |
| MRC-0801-MO | Monthly STIG/SCAP Scan and Configuration Baseline Review (cross-reference) |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 1–2 hours |

*SA time spans system selection, query execution, ASL cross-reference, and documentation.*

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file for this maintenance cycle
- [ ] Current, ISSM-signed Approved Software List (ASL) retrieved and accessible
- [ ] Sample systems for this cycle identified (see Section 8 — document selection basis)
- [ ] Remote management or console access confirmed for each selected system
- [ ] Daily automated inventory (MRC-0103-SA) results from past 30 days reviewed — any flagged changes noted as context

---

## 7. Procedure Steps

### Phase 1 — System Selection and Software Enumeration

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 1 | Select systems for this month's spot-check | Per ISSM-defined sampling methodology — distribute across workstations, servers, and DCs; vary each month | [ISSM-defined sample size] systems selected; documented in Section 8 |
| 2 | For each selected system: enumerate all installed software | Use [SITE-DESIGNATED ENDPOINT MANAGEMENT PLATFORM] or OS-native query (e.g., installed programs list, package manager, or equivalent) | Complete list of installed software titles, versions, and publishers for each system |
| 3 | Export or record software list per system | Save output to worksheet or structured list | All software enumerated; ready for ASL cross-reference |

### Phase 2 — ASL Cross-Reference

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 4 | For each software title on each system: verify presence on ASL | Cross-reference software name, version, and publisher against current ASL | Each title either: (a) On ASL — PASS, or (b) Not on ASL — document as finding |
| 5 | Flag any software not on the ASL | Record in Software Finding Log (Section 9) — title, version, publisher, hostname | Finding documented; do not remove without authorization |
| 6 | Check each non-ASL item against CCB Change Request records | Search CCB log for any pending or recently approved additions not yet reflected in ASL | Some non-ASL items may be authorized via CR but ASL not yet updated — document status |
| 7 | For each software title on the ASL: verify vendor support status | Cross-reference against vendor EOL calendar or ISSM-maintained EOL tracking document | Any EOL / end-of-support title = SA-22 finding; document and notify ISSM same-day |
| 8 | Special focus — review browser plugins/extensions, developer tools, compression utilities, and remote access software | Enumerate non-standard software categories specifically | Any such tool not on ASL = finding; remote access software without ISSM authorization = immediate finding |

### Phase 3 — Documentation and Reporting

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 9 | Document all findings in Software Finding Log (Section 9) | | All non-ASL software and SA-22 findings recorded |
| 10 | Report all findings to ISSM | Phone / secure message per site SOP | ISSM notified; directed action documented |
| 11 | Request ASL update from ISSM for any authorized software found missing from ASL | Coordinate with ISSM | ASL update requested with supporting documentation |
| 12 | Complete System Spot-Check Summary (Section 8) | | All selected systems documented with status |
| 13 | Complete Findings Summary and Sign-Off block (Sections 10–11) | | SA and ISSM/ISSO signatures obtained |

---

## 8. System Spot-Check Summary

| # | Hostname | System Type | Software Titles Found | ASL-Compliant | Non-ASL Found | SA-22 Found | Status |
|---|----------|------------|----------------------|--------------|--------------|------------|--------|
| 1 | | | | Y / N | Y / N | Y / N | PASS / FINDING |
| 2 | | | | Y / N | Y / N | Y / N | PASS / FINDING |
| 3 | | | | Y / N | Y / N | Y / N | PASS / FINDING |
| 4 | | | | Y / N | Y / N | Y / N | PASS / FINDING |
| 5 | | | | Y / N | Y / N | Y / N | PASS / FINDING |

*System Type: WORKSTATION / SERVER / DOMAIN CONTROLLER / OTHER*

---

## 9. Software Finding Log

*Complete one row per non-ASL or SA-22 software title identified.*

| # | Hostname | Software Title | Version | Publisher | On ASL? | EOL / SA-22? | CCB CR # | ISSM Notified | Directed Action |
|---|----------|---------------|---------|-----------|--------|-------------|---------|--------------|----------------|
| 1 | | | | | Y / N | Y / N | | Y / N | |
| 2 | | | | | Y / N | Y / N | | Y / N | |
| 3 | | | | | Y / N | Y / N | | Y / N | |
| 4 | | | | | Y / N | Y / N | | Y / N | |
| 5 | | | | | Y / N | Y / N | | Y / N | |

---

## 10. Findings Summary

- [ ] All systems checked — all software on ASL — no unauthorized software detected
- [ ] Non-ASL software found — documented — ISSM notified — awaiting direction
- [ ] SA-22 violation found (EOL/unsupported software) — ISSM notified same-day
- [ ] ASL update required — request submitted to ISSM
- [ ] Remote access software found without authorization — ISSM notified immediately
- [ ] No findings — all systems within approved software baseline

---

## 11. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO (required if findings present) | | | | |

**ISSM Authorization Reference:** ___________________________
**ASL Version Reviewed:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-0802-MO | Rev 1.0 | Category 08 — Configuration & Baseline Management*
*Classification: [CLASSIFICATION]*
