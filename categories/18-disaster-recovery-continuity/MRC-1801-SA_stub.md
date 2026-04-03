---
mrc_id: MRC-1801-SA
title: "Semi-Annual Contingency Plan Review and Tabletop Exercise"
category: "18 — Disaster Recovery / Continuity"
periodicity: Semi-Annual
est_time: "4–6 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Contingency Plan document (ISSM-maintained), backup console ([SITE-DESIGNATED BACKUP PLATFORM]), OOB management interface, test/restore environment"
jsig_controls:
  - CP-2
  - CP-4
  - CP-6
  - CP-7
  - CP-9
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1801-SA — Semi-Annual Contingency Plan Review and Tabletop Exercise

---

## 1. Background (New SA)

**What is a Contingency Plan (CP)?**
A Contingency Plan (CP) documents how the organization will respond to, recover from, and resume operations after a disruption — power failure, hardware loss, ransomware, natural disaster, or any event that impacts the SAP system's availability. NIST CP-2 requires it to exist, CP-4 requires it to be tested.

**What a tabletop exercise is:**
A tabletop exercise is a structured discussion where key personnel walk through a simulated incident scenario step-by-step, without actually performing recovery. It identifies gaps in the plan, unclear responsibilities, and resource shortfalls — without taking any systems offline.

**Why it matters in a SAP environment:**
Classified SAP systems may not be able to move to commercial cloud or standard disaster recovery sites. The alternate processing/storage site (CP-6, CP-7) must maintain SAP-equivalent security controls. If it doesn't, you can't use it — and your data goes dark. The SA's job is to know the plan, verify it's current, and ensure recovery resources actually work.

---

## 2. Safety / Hazards

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** ISSM must authorize any actual system changes made as a result of this review (MA-2).

> ⚠️ **TABLETOP ONLY:** This MRC is for review and tabletop exercise. Any actual failover or recovery testing must be conducted under a separate, ISSM-authorized MRC (MRC-1802-AN) with full CCB approval.

> ⚠️ **CLASSIFICATION:** Contingency plan documents are sensitive — handle per local classification guidance. Do not transmit over unapproved channels.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| Current Contingency Plan (CP) | ISSM document repository — must be current version |
| Backup console access | Verify backup status and restoration capability |
| OOB management (iLO/iDRAC) | Verify out-of-band access to critical systems is functional |
| Contact roster | ISSM, ISSO, system owners, alternate site POC |
| Prior exercise after-action report | Previous tabletop results for comparison |
| MRC Sign-Off Block | Signed by SA and ISSM/ISSO after completion |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| System Contingency Plan (CP) | ISSM Document Repository |
| NIST SP 800-34 Rev 1 — CP Guide | https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final |
| DoDM 5205.07 — SAP Security Manual | SAP Cybersecurity Binder |
| Alternate Site Agreement / MOU | ISSM Document Repository |
| MRC-0401-DA / MRC-0402-MO | Backup verification MRCs |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1–2 | 2–3 hours |
| ISSM / ISSO | 1 | 2–3 hours (tabletop facilitator) |
| System Owner (optional) | 1 | 1–2 hours |

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file
- [ ] Current Contingency Plan document available
- [ ] Backup status confirmed current (reference MRC-0402-MO)
- [ ] All exercise participants notified and scheduled
- [ ] Prior after-action report (if applicable) reviewed

---

## 7. Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|-----------------|
| 1 | Retrieve current Contingency Plan — verify revision date | ISSM Document Repository | Plan is within 12 months of last review; if not, flag for update |
| 2 | Review CP Section 1 — System Description and Scope | CP Document | Accurate description of SAP system components and boundaries |
| 3 | Review CP Section — Recovery Time Objective (RTO) and Recovery Point Objective (RPO) | CP Document | RTOs and RPOs are documented; verify they are still mission-valid |
| 4 | Verify alternate storage site (CP-6) is documented and agreement is current | CP Document + Alternate Site MOU | Site identified, MOU/agreement active and within validity period |
| 5 | Verify alternate processing site (CP-7) has equivalent SAP security controls | CP Document + ISSM confirmation | Alternate site accredited or documented as equivalent |
| 6 | Verify emergency contact roster is current | CP Appendix — Contacts | All personnel, phone numbers, and alternates are current |
| 7 | Verify backup media and restoration procedures are documented in CP | CP Section — Backup/Recovery | Steps are clear, accurate, and match current backup configuration |
| 8 | Verify OOB management access (iLO/iDRAC) is functional | OOB console → login test | Admin can access all critical servers out-of-band |
| 9 | Confirm backup jobs are current (reference MRC-0401-DA) | Backup console | All recent backup jobs show success |
| 10 | Conduct tabletop exercise — present scenario to participants | Scenario: [SA and ISSM define scenario] e.g., ransomware impacts primary file server | Participants walk through CP response procedures step-by-step |
| 11 | Document gaps identified during tabletop | After-Action Notes (Section 8) | Each gap recorded with responsible party and remediation plan |
| 12 | Verify CP requires update based on review findings | Compare CP to current system state | If system has changed since last update, flag CP for revision |
| 13 | Draft after-action report for ISSM | After-Action Report template | Report documents exercise, participants, findings, and recommendations |
| 14 | Submit after-action report to ISSM | Secure communication | ISSM acknowledges; directs plan updates if needed |
| 15 | Complete Findings Summary and Sign-Off block | Sections 10–11 | Signatures obtained |

---

## 8. After-Action Findings Table

| # | CP Section | Gap / Finding | Severity | Owner | Target Resolution Date | Resolved |
|---|-----------|--------------|---------|-------|----------------------|---------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

---

## 9. CP Status Summary

| Check Item | Status | Notes |
|-----------|--------|-------|
| CP document current (< 12 months) | | |
| RTO/RPO documented | | |
| Alternate storage site (CP-6) documented | | |
| Alternate processing site (CP-7) documented | | |
| Contact roster current | | |
| OOB management functional | | |
| Backups current | | |
| Tabletop exercise conducted | | |
| After-action report submitted | | |

---

## 10. Findings Summary

- [ ] CP is current and accurate — no significant gaps identified
- [ ] CP requires update — ISSM notified, update in progress
- [ ] Gaps identified during tabletop — after-action report submitted
- [ ] Alternate site documentation expired or missing — ISSM notified
- [ ] No findings

---

## 11. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________

**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1801-SA | Rev 1.0 | Category 18 — Disaster Recovery / Continuity*
*Classification: [CLASSIFICATION]*
