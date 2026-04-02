---
mrc_id: MRC-1802-AN
title: "Annual Backup Restoration and Disaster Recovery Exercise"
category: "18 — Disaster Recovery / Continuity"
periodicity: Annual
est_time: "8–16 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Backup Console, OOB Management, Test/Restore Environment"
jsig_controls:
  - CP-4
  - CP-9
  - CP-10
  - CP-6
  - CP-7
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1802-AN — Annual Backup Restoration and Disaster Recovery Exercise

---

## 1. Background (New SA)

**What this MRC covers:**
Unlike MRC-1801-SA (tabletop discussion), this is an actual recovery test. The SA restores systems or data from backup to a test environment and verifies that recovery meets the documented RTO/RPO. This is the CP-4 test of record — the annual proof that the contingency plan actually works.

**What a successful test proves:**
- Backup media/data is readable and complete
- Restoration procedures work as documented in the CP
- Recovery time is within the RTO
- Restored data is within the RPO (data loss is acceptable)
- The team knows how to execute the plan

**Scope:** This should test at minimum one critical system full restoration. The ISSM defines the test scope and authorizes the window. Actual production systems are not touched — use a designated test/restore environment.

---

## 2. Safety / Hazards

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** This is an extended, high-impact maintenance activity. ISSM written authorization and CCB-approved Change Request are mandatory before any restoration activity begins.

> ⚠️ **TEST ENVIRONMENT ONLY:** Do not restore to production systems during this exercise. A designated isolated test environment must be used. Confirm with ISSM before proceeding.

> ⚠️ **MEDIA HANDLING:** Any backup media removed from storage for this exercise must be handled per MP-4 and returned to authorized storage immediately after the test.

> ⚠️ **CLASSIFICATION:** Restored data from backup may be classified. Ensure the test environment maintains equivalent security controls before any data is written to it.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| Backup console (admin access) | Full restore capability |
| Test/restore environment | Isolated, ISSM-approved restore target |
| Backup media / storage | Latest verified backup set |
| OOB management | iLO/iDRAC access to test hardware |
| Contingency Plan (CP) | Reference for recovery procedures |
| RTO/RPO documentation | Success criteria for the test |
| MRC Sign-Off Block | Signed by SA and ISSM/ISSO after completion |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| System Contingency Plan (CP) | ISSM Document Repository |
| NIST SP 800-34 Rev 1 | https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final |
| MRC-0402-MO | Monthly backup restore test (smaller scope) |
| MRC-1801-SA | Semi-annual CP review and tabletop |
| CCB Change Request | CCB Ticketing System |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1–2 | 8–12 hours |
| ISSM / ISSO | 1 | 2–4 hours (oversight) |

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file
- [ ] CCB-approved Change Request for the exercise
- [ ] Test/restore environment available and cleared
- [ ] Backup media confirmed readable (spot-check prior to exercise)
- [ ] RTO/RPO success criteria agreed with ISSM
- [ ] Exercise scenario and scope defined in writing
- [ ] MRC-1801-SA tabletop results reviewed — gaps addressed

---

## 7. Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|-----------------|
| 1 | Confirm test environment is isolated and has equivalent security controls | Physical/logical inspection | ISSM confirms environment is authorized |
| 2 | Document start time — RTO clock begins | Exercise log | Time recorded |
| 3 | Locate backup set to be restored | Backup console → Job History → Select backup set | Correct backup identified; media/data confirmed readable |
| 4 | Initiate restoration per CP recovery procedures | Backup console → Restore → Select target | Restoration job initiated |
| 5 | Monitor restoration progress | Backup console → Active Jobs | Job completes without errors |
| 6 | Document restoration completion time | Exercise log | Compare elapsed time against RTO |
| 7 | Verify restored data integrity | Spot-check files, run file hash comparison if baseline exists | Data readable, complete, and matches expected state |
| 8 | Verify restored system boots and services start | System console / OOB | Critical services running; no error conditions |
| 9 | Verify restored data RPO — check timestamp of most recent restored data | File timestamps / backup job metadata | Data loss within documented RPO window |
| 10 | Test critical application functionality in restored environment | Application-specific validation per CP | Key application functions operate correctly |
| 11 | Document RTO achieved | Exercise log | PASS if within RTO; FAIL if exceeded — document and notify ISSM |
| 12 | Document RPO achieved | Exercise log | PASS if within RPO; FAIL if exceeded — notify ISSM |
| 13 | Securely wipe test environment after exercise completion | Per media sanitization SOP | Test data destroyed; environment returned to clean state |
| 14 | Draft after-action report | After-action template | Documents scenario, timeline, results, findings, recommendations |
| 15 | Submit after-action report to ISSM | Secure communication | ISSM reviews and signs as CP-4 BoE artifact |
| 16 | Complete Sign-Off block | Section 10 | Signatures obtained |

---

## 8. Exercise Timeline Log

| Event | Planned Time | Actual Time | Delta | Notes |
|-------|-------------|------------|-------|-------|
| Exercise start | | | | |
| Backup media confirmed | | | | |
| Restoration initiated | | | | |
| Restoration complete | | | | |
| System online | | | | |
| Data verified | | | | |
| Test environment wiped | | | | |
| Exercise complete | | | | |

---

## 9. RTO / RPO Results

| Metric | Target | Achieved | Result |
|--------|--------|----------|--------|
| Recovery Time Objective (RTO) | | | PASS / FAIL |
| Recovery Point Objective (RPO) | | | PASS / FAIL |
| Data integrity check | N/A | | PASS / FAIL |

---

## 10. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**CCB Change Request #:** ___________________________

**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1802-AN | Rev 1.0 | Category 18 — Disaster Recovery / Continuity*
*Classification: [CLASSIFICATION]*
