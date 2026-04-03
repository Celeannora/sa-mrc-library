---
mrc_id: MRC-1902-AN
title: "Annual SSP Review and Documentation Audit"
category: "19 — Documentation & Records Management"
periodicity: Annual
est_time: "4–8 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "System Security Plan (SSP), ISSM document repository ([SITE-DESIGNATED PLATFORM]), authorization package management tool ([SITE-DESIGNATED TOOL — e.g., eMASS or equivalent])"
jsig_controls:
  - PL-2
  - SA-5
  - AU-11
  - CA-7
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1902-AN — Annual SSP Review and Documentation Audit

---

## 1. Background (New SA)

**What is the System Security Plan (SSP)?**
The SSP is the master document that describes your SAP system — its boundaries, components, data flows, security controls implementation, roles, and responsibilities. It's the foundation of the ATO. If the SSP is inaccurate, the ATO may be invalid.

**What the annual audit covers:**
- Every section of the SSP compared against the actual current system state
- All cybersecurity documents audited for completeness and retention compliance
- eMASS entries verified to match documentation on file
- Any system changes from the year that have not been reflected in the SSP are flagged

**SA's role:**
The SA does not write the SSP (that's the ISSM/ISSO), but the SA is responsible for providing accurate technical information and flagging any discrepancies between documented and actual system state.

---

## 2. Safety / Hazards

> ⚠️ **ATO RISK:** Significant discrepancies between the SSP and actual system configuration may trigger an ATO review or suspension. Escalate any major discrepancies to the ISSM before taking any action.

> ⚠️ **RETENTION:** Do not purge any records during the audit without explicit ISSM authorization and AU-11 compliance verification.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| Current SSP (latest approved version) | ISSM Document Repository |
| eMASS system record | ATO and control implementation data |
| Full document inventory | All cybersecurity documents on file |
| CMDB / Asset Inventory | Current system component list |
| MRC archive — current year | All MRCs executed in the past 12 months |
| MRC Sign-Off Block | Signed by SA and ISSM/ISSO after completion |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| NIST SP 800-18 Rev 1 — SSP Guide | https://csrc.nist.gov/publications/detail/sp/800-18/rev-1/final |
| DoDM 5205.07 — SAP Cybersecurity | SAP Cybersecurity Binder |
| eMASS User Guide | eMASS Help System |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 4–6 hours (technical review) |
| ISSM / ISSO | 1 | 4–6 hours (SSP update, final review) |

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file
- [ ] Current approved SSP obtained
- [ ] eMASS access verified
- [ ] Full document inventory prepared
- [ ] MRC archive for current year assembled

---

## 7. Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|-----------------|
| 1 | Obtain current approved SSP from ISSM repository | Document Repository | SSP version, date, and AO signature verified |
| 2 | Review SSP System Description section — compare to actual system | SSP Section 1 vs. current CMDB | All components documented; flag any undocumented additions |
| 3 | Review SSP System Boundary — compare to actual network diagrams | SSP Boundary section vs. current network diagram | Boundary accurate; flag any boundary changes not documented |
| 4 | Review SSP Interconnections section | SSP Interconnections vs. current MOU/ISA register | All active interconnections documented with current agreements |
| 5 | Review SSP User Roles and Responsibilities | SSP Roles section vs. current personnel list | All current users and roles accurately reflected |
| 6 | Review SSP Security Control Implementation descriptions | SSP Controls vs. actual implementations | Any control whose implementation has changed is flagged |
| 7 | Compare eMASS record to SSP — verify alignment | eMASS → System record | eMASS and SSP agree on control status, findings, and POA&M |
| 8 | Audit document repository — verify all required docs on file | Document inventory checklist | All required documents present, current, and properly stored |
| 9 | Verify MRC archive completeness — all executed MRCs signed and filed | MRC archive → current year | No unsigned or unfiled MRCs |
| 10 | Verify AU-11 retention compliance — no records purged prematurely | Retention schedule vs. oldest records on file | All records within retention window |
| 11 | Compile discrepancy list for ISSM | Discrepancy table (Section 8) | All gaps and inaccuracies documented |
| 12 | Brief ISSM on findings and recommended SSP updates | Secure meeting | ISSM acknowledges and directs updates |
| 13 | Complete Sign-Off block | Section 10 | Signatures obtained |

---

## 8. SSP Discrepancy Table

| # | SSP Section | Discrepancy Description | Impact | Recommended Action | ISSM Directed Action | Resolved |
|---|------------|------------------------|--------|-------------------|---------------------|---------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

---

## 9. Annual Audit Summary

| Check | Status | Notes |
|-------|--------|-------|
| SSP current and accurate | | |
| eMASS aligned with SSP | | |
| All required documents on file | | |
| MRC archive complete | | |
| AU-11 retention compliant | | |

---

## 10. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________

**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1902-AN | Rev 1.0 | Category 19 — Documentation & Records Management*
*Classification: [CLASSIFICATION]*
