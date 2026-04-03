---
mrc_id: MRC-1302-SA
title: "Semi-Annual UPS and Generator Battery Test"
category: "13 — Physical Security & Hardware"
periodicity: Semi-Annual
est_time: "2–4 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "UPS management software or display panel ([SITE-DESIGNATED UPS PLATFORM]), generator control panel (if applicable), physical inspection"
jsig_controls:
  - CP-8
  - PE-11
  - MA-2
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1302-SA — Semi-Annual UPS and Generator Battery Test

---

## 1. Background (New SA)

**Why this matters:**
The UPS (Uninterruptible Power Supply) protects SAP systems from power disruptions. In an air-gapped SAPF, losing power to servers without graceful shutdown risks:
- Data corruption
- BitLocker recovery key prompts on reboot (can lock SA out if keys are unavailable)
- Audit log gaps

The battery test verifies the UPS can sustain its rated load for the required duration. If the battery has degraded, it may provide only 2 minutes of runtime instead of the rated 15.

A generator test (if applicable) verifies that backup generator power transfer functions correctly.

---

## 2. Safety / Hazards

> ⚠️ **COORDINATE WITH ISSM:** A battery test will put systems on battery power. If the battery has degraded significantly, systems may lose power. ISSM must authorize this test and ensure systems can be gracefully shut down if the battery fails early.

> ⚠️ **ALERT PHYSICAL SECURITY AND FACILITY MANAGEMENT:** Power test activity may trigger building alarms or monitoring systems. Notify all stakeholders before beginning.

> ⚠️ **TWO-PERSON RULE:** UPS battery test and generator transfer require two authorized personnel present.

---

## 3. Procedure Steps

| Step | Action | Detail | Expected Result |
|------|--------|--------|-----------------|
| 1 | Notify ISSM, Physical Security, and facility management of planned test | Written notice at least 24 hours prior | All stakeholders confirmed |
| 2 | Verify backup of all critical systems is current | MRC-0401-DA results | Backups confirmed — proceed |
| 3 | Open UPS management software | APC/Eaton/etc. web console or local panel | UPS status: Normal, Battery: Good |
| 4 | Record current battery health metrics | Battery capacity, last test date, temperature | Baseline before test |
| 5 | Initiate UPS battery test | UPS console → Self Test → Runtime Calibration or Full Test | Systems transfer to battery power |
| 6 | Monitor battery runtime — measure actual vs. rated | UPS software → Runtime display | Actual runtime within 80% of rated capacity |
| 7 | If runtime < 80% of rated | Stop test; restore utility power; document — battery replacement required | Finding logged; notify ISSM |
| 8 | Restore utility power (or test completes) | UPS auto-transfers back to utility | Systems return to utility power; all services confirm running |
| 9 | Generator test (if applicable) | Initiate generator transfer per local SOP with facility management | Generator starts; power transfers; systems maintain power; generator shuts down cleanly |
| 10 | Record all metrics in UPS/Generator Test Table (Section 8) | | All fields populated |
| 11 | Sign-Off block | Section 9 | Two-person signatures obtained |

---

## 8. UPS / Generator Test Results

| Item | Rating | Measured / Result | Pass/Fail | Notes |
|------|--------|------------------|----------|-------|
| UPS Battery Capacity | | | | |
| UPS Runtime (full load) | | | | |
| UPS Transfer Time to Battery | | | | |
| Battery Temperature | | | | |
| Generator Start Time | | | | |
| Generator Transfer to Load | | | | |
| Generator Runtime (test duration) | | | | |

---

## 9. Sign-Off (Two-Person Required)

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| Witness (SA / Facility) | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1302-SA | Rev 1.0 | Category 13 — Physical Security & Hardware*
*Classification: [CLASSIFICATION]*
