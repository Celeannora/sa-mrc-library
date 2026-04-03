---
mrc_id: MRC-1901-MO
title: "Monthly Documentation Review and Records Management Check"
category: "19 — Documentation & Records Management"
periodicity: Monthly
est_time: "1–2 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Document repository ([SITE-DESIGNATED PLATFORM]), MRC log files, ISSM document store"
jsig_controls:
  - AU-11
  - PL-2
  - SA-5
  - PM-4
  - CA-7
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1901-MO — Monthly Documentation Review and Records Management Check

---

## 1. Background (New SA)

**Why documentation is a security control:**
In a SAP environment, documentation IS evidence. Every MRC you sign, every patch you apply, every account you create or disable — without proper documentation, it never happened in the eyes of an auditor or inspector. AU-11 requires audit records (including MRCs) to be retained for a defined period. PL-2 requires the System Security Plan (SSP) to be current. SA-5 requires operator and user documentation to be maintained.

**What this MRC ensures:**
- All signed MRC records from the month are filed correctly
- The POA&M is current and submitted to the ISSM
- The document repository is organized and accessible
- No required documentation is missing or expired

**The document repository:**
The ISSM maintains a cybersecurity documentation repository (physical binder and/or electronic) containing all ATOs, SSPs, MRCs, ConMon artifacts, and supporting materials. The SA is responsible for filing SA-produced documents to that repository on the schedule defined in the SSP.

---

## 2. Safety / Hazards

> ⚠️ **RETENTION REQUIREMENT:** Do not destroy or delete any signed MRC, audit log, or cybersecurity document without explicit ISSM authorization and verification that the AU-11 retention period has been met.

> ⚠️ **CLASSIFICATION:** Cybersecurity documents may be classified. Handle, store, and transmit per local classification guidance.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| Document repository (SharePoint / shared drive / physical binder) | All signed MRCs and supporting docs |
| MRC log — current month | All MRCs executed this month |
| POA&M tracker | eMASS or ISSM-maintained POA&M |
| Document Tracker (this library) | DOCUMENT_TRACKER.md |
| MRC Sign-Off Block | Signed by SA and ISSM/ISSO after completion |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| System SSP — Section: Records Management | ISSM Document Repository |
| NIST SP 800-12 Rev 1 — Information Security Handbook | https://csrc.nist.gov/publications/detail/sp/800-12/rev-1/final |
| AU-11 Retention Policy (local) | ISSM Document Repository |
| MRC-1501-MO | ConMon artifact submission (cross-reference) |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 1–2 hours |
| ISSM / ISSO Filing Acknowledgment | 1 | 30 min |

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file
- [ ] All MRCs executed this month are signed and ready to file
- [ ] POA&M updated with current month's findings (from MRC-0202-MO and MRC-1501-MO)
- [ ] Access to document repository confirmed

---

## 7. Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|-----------------|
| 1 | Collect all signed MRC documents from the current month | Physical MRC binder / electronic scan folder | All MRCs executed this month accounted for |
| 2 | Verify each MRC has a completed Sign-Off block (SA + ISSM/ISSO signatures) | Review each MRC | No unsigned MRCs — any incomplete returned for signature before filing |
| 3 | File signed MRCs to the document repository per naming convention | Repository → [Year] → [Month] → [Category] | MRCs filed and accessible |
| 4 | Update DOCUMENT_TRACKER.md with any new/changed MRC statuses | sa-mrc-library/DOCUMENT_TRACKER.md | Tracker reflects current state of all MRC cards |
| 5 | Review POA&M — verify all findings from this month are entered | eMASS / POA&M tracker → Current POA&M | All CAT I/II/III findings from monthly scans have POA&M entries |
| 6 | Verify POA&M milestone dates are current — no overdue milestones | POA&M tracker | No milestones past due without ISSM-approved extension |
| 7 | Check SSP last-review date | ISSM Document Repository → SSP Properties | SSP reviewed within last 12 months; if not, flag for ISSM |
| 8 | Verify operator documentation (SA-5) is current for any system changes made this month | SA-5 documentation log | New system components have documented procedures |
| 9 | Confirm all ConMon artifacts from this month are submitted (cross-reference MRC-1501-MO) | ConMon submission log | Submission confirmed; no missing artifacts |
| 10 | Add entry to CHANGELOG.md for all library/documentation changes this month | CHANGELOG.md | Changes recorded |
| 11 | Notify ISSM of documentation filing completion | Secure communication | ISSM acknowledges |
| 12 | Complete Sign-Off block | Section 10 | Signatures obtained |

---

## 8. Monthly Documentation Filing Status

| # | Document / MRC ID | Period | Signatures Complete | Filed Location | Filed Date | Notes |
|---|-------------------|--------|---------------------|----------------|-----------|-------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

---

## 9. Documentation Health Summary

| Check | Status | Notes |
|-------|--------|-------|
| All MRCs signed and filed | | |
| POA&M current — no overdue milestones | | |
| SSP within 12-month review cycle | | |
| ConMon artifacts submitted | | |
| DOCUMENT_TRACKER.md updated | | |
| CHANGELOG.md updated | | |

---

## 10. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________

**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1901-MO | Rev 1.0 | Category 19 — Documentation & Records Management*
*Classification: [CLASSIFICATION]*
