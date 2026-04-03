---
mrc_id: MRC-1301-QR
title: "Quarterly Hardware Lifecycle and Firmware Review"
category: "13 — Physical Security & Hardware"
periodicity: Quarterly
est_time: "2–3 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "iLO/iDRAC OOB Console, SCCM Hardware Inventory, Vendor Firmware Portals (external workstation), PowerShell"
jsig_controls:
  - SA-22
  - CM-8
  - MA-2
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1301-QR — Quarterly Hardware Lifecycle and Firmware Review

---

## 1. Background (New SA)

**What this MRC covers:**
1. **Hardware Lifecycle Review:** Every hardware component (servers, workstations, network devices, storage) is compared against its vendor end-of-support date. Hardware approaching EOL must be flagged for the upgrade path planning process (SA-22 applies to hardware as well as software).
2. **Firmware Currency:** OOB management controllers (iLO/iDRAC), BIOS/UEFI, storage controllers, and NIC firmware are checked against current vendor-recommended versions. Outdated firmware may contain unpatched vulnerabilities.
3. **Upgrade Path Documentation:** For any component approaching EOL or with outdated firmware, the SA documents a planned upgrade path for ISSM review.

---

## 2. Procedure Steps

| Step | Action | Detail | Expected Result |
|------|--------|--------|-----------------|
| 1 | Pull hardware inventory from SCCM | SCCM → Asset Intelligence → Hardware → All Hardware | Full inventory: make, model, serial, age |
| 2 | Check each hardware component against vendor lifecycle page | External workstation → Vendor support pages | All hardware within vendor support period |
| 3 | Any hardware at or within 12 months of EOL | Document: asset, EOL date, replacement plan | Upgrade path documented; submit to ISSM for planning |
| 4 | Check iLO/iDRAC firmware version on all servers | OOB console → System Info → Firmware Version | Compare to current vendor release |
| 5 | Check BIOS/UEFI version on all servers | OOB console → BIOS Version | Compare to current vendor release |
| 6 | Check storage controller firmware | OOB → Storage → Controller Properties → Firmware | Compare to current vendor release |
| 7 | Any firmware outdated by > 2 versions | Document as finding; submit CCB CR for update | ISSM authorizes firmware update |
| 8 | Document all in Hardware Lifecycle Table (Section 8) | | All entries populated |
| 9 | Sign-Off block | Section 9 | Signatures obtained |

---

## 8. Hardware Lifecycle and Firmware Table

| # | Asset Tag | Device | Make/Model | EOL Date | Firmware Type | Current FW | Latest FW | Action Required |
|---|----------|--------|----------|---------|--------------|-----------|---------|----------------|
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
*MRC-1301-QR | Rev 1.0 | Category 13 — Physical Security & Hardware*
*Classification: [CLASSIFICATION]*
