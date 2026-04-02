---
mrc_id: MRC-1701-MO
title: "Monthly Software Inventory and EOL/Unsupported Component Check"
category: "17 — Supply Chain & Software Integrity"
periodicity: Monthly
est_time: "2–3 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "SCCM / Endpoint Manager, PowerShell, Nessus/ACAS, Approved Software List"
jsig_controls:
  - SA-22
  - CM-7
  - CM-8
  - CM-11
non_tailorable: true
non_tailorable_control: "SA-22 — Unsupported System Components"
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1701-MO — Monthly Software Inventory and EOL/Unsupported Component Check

## ⚠️ NON-TAILORABLE CONTROL — SA-22
**Per JSIG:** No end-of-life (EOL) or vendor-unsupported hardware, OS, firmware, or software is permitted on SAP systems. SA-22 cannot be tailored out. Any newly identified unsupported component must be reported to ISSM within the same maintenance cycle. Waiver requires Component SAP Senior Authorizing Official approval — not delegatable.

---

## 1. Background (New SA)

**What is an EOL/unsupported component?**
End-of-life (EOL) means the vendor no longer provides security patches, updates, or support for a product. Examples:
- Windows Server 2012 R2 (EOL October 2023)
- Windows 10 versions 21H2 and earlier
- Any application where the vendor has issued an end-of-support notice

**Why is this a non-tailorable control?**
Unsupported software cannot receive security patches. In a SAP environment processing classified data, a single unpatched EOL component represents an unacceptable and unmitigable risk. The JSIG treats this identically to having no encryption — it is a reportable control failure.

**What the Approved Software List (ASL) is:**
The ASL is an ISSM-maintained document listing every software product authorized for use in the SAP environment. Nothing gets installed unless it's on the ASL and has PSO authorization. Your job is to compare what's actually installed against what's supposed to be installed.

---

## 2. Safety / Hazards

> ⚠️ **STOP WORK CONDITION:** If any EOL or unsupported component is discovered, this is an SA-22 non-tailorable control failure. **Document immediately and notify the ISSM before taking any action.** Do not remove or upgrade software without ISSM and CCB authorization.

> ⚠️ **DO NOT INSTALL:** Do not add any software to bring EOL components to a supported state without a CCB-approved Change Request and ISSM authorization.

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** This MRC must be executed within an ISSM-authorized maintenance window (MA-2).

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| SCCM / Microsoft Endpoint Manager | Software inventory and deployment console |
| PowerShell (elevated) | `Get-WmiObject Win32_Product`, `Get-InstalledSoftware` |
| Nessus / ACAS | EOL/unsupported software plugins |
| Approved Software List (ASL) | ISSM-maintained — current version required |
| CMDB / Asset Inventory | Current hardware and OS inventory |
| Vendor EOL calendars | Microsoft EOS calendar, vendor product pages |
| MRC Sign-Off Block | Signed by SA and ISSM/ISSO after completion |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| JSIG SA-22 Implementation Guidance | ISSM SharePoint / SAP Cybersecurity Binder |
| Approved Software List (ASL) | ISSM Document Repository — current version |
| Microsoft End of Support Calendar | https://learn.microsoft.com/en-us/lifecycle/ |
| NIST SP 800-161 Rev 1 — Supply Chain Risk Management | https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final |
| System CMDB / Asset Inventory | SA Document Repository |
| MRC-0201-MO | Patch Management (cross-reference for newly patched systems) |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 2–3 hours |
| ISSM Notification | 1 | As needed (findings only) |

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file for this maintenance cycle
- [ ] Current Approved Software List (ASL) obtained from ISSM
- [ ] SCCM / Endpoint Manager console access verified
- [ ] ACAS/Nessus scan credentials valid
- [ ] Current asset/CMDB inventory available
- [ ] Patch cycle (MRC-0201-MO) results from current month reviewed

---

## 7. Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|-----------------|
| 1 | Pull current software inventory from SCCM | SCCM Console → Monitoring → Reporting → Software → All Software | Full list of installed software across all managed systems |
| 2 | Export inventory to spreadsheet for comparison | SCCM Report → Export to CSV | CSV file with hostname, software name, version, publisher |
| 3 | Run PowerShell software inventory on any systems not in SCCM | `Get-WmiObject -Class Win32_Product \| Select Name, Version, Vendor \| Sort Name` | Software list per host |
| 4 | Run Nessus/ACAS EOL scan | ACAS → New Scan → Plugin family: Windows → Unsupported Software Enumeration | Scan results showing any EOL/unsupported software |
| 5 | Compare SCCM/PS inventory to Approved Software List (ASL) | Side-by-side comparison of installed vs. authorized | Any software not on ASL = unauthorized — document immediately |
| 6 | Identify any software flagged as EOL by ACAS | Review ACAS report for plugin 20811 and related EOL plugins | List all EOL findings by host |
| 7 | Cross-check OS versions against Microsoft EOS calendar | https://learn.microsoft.com/en-us/lifecycle/ | Confirm no OS is past EOS date |
| 8 | Check application versions against vendor EOS dates | Vendor product lifecycle pages | Any application past EOS = SA-22 finding |
| 9 | For each EOL finding: document hostname, software, version, EOS date | Use Findings Log (Section 10) | All findings documented |
| 10 | For each unauthorized software (not on ASL): document and notify ISSM | Findings Log + secure communication | ISSM directs removal or ASL addition via CCB |
| 11 | Notify ISSM of all SA-22 failures immediately | Secure communication per local SOP | ISSM acknowledges and directs disposition |
| 12 | Update software inventory table (Section 8) | | All hosts and software status recorded |
| 13 | Do NOT remove or remediate without ISSM/CCB authorization | | Only document — action requires authorization |
| 14 | Complete Findings Summary and Sign-Off block | Sections 11–12 | Signatures obtained |

---

## 8. Software Inventory Status Table

| # | Hostname | Software Name | Version | Vendor | EOS Date | On ASL? | EOL? | Status | Notes |
|---|----------|--------------|---------|--------|----------|---------|------|--------|-------|
| 1 | | | | | | | | | |
| 2 | | | | | | | | | |
| 3 | | | | | | | | | |
| 4 | | | | | | | | | |
| 5 | | | | | | | | | |

*Status: COMPLIANT / EOL FINDING / NOT ON ASL / PENDING REVIEW*

---

## 9. Inventory Check Summary

| Metric | Count |
|--------|-------|
| Total hosts checked | |
| Total software items inventoried | |
| On ASL — compliant | |
| EOL/unsupported found (SA-22) | |
| Not on ASL (unauthorized) | |
| ISSM notified | Y / N |

---

## 10. Non-Compliance / Findings Log

| # | Hostname | Software / Component | Version | EOS Date | SA-22 Failure? | ISSM Notified | Time | Directed Action | Resolved |
|---|----------|---------------------|---------|----------|----------------|---------------|------|----------------|---------|
| 1 | | | | | | | | | |
| 2 | | | | | | | | | |
| 3 | | | | | | | | | |

---

## 11. Findings Summary

- [ ] All software compliant — no EOL/unsupported components found
- [ ] One or more SA-22 failures identified — ISSM notified immediately
- [ ] Unauthorized software found (not on ASL) — ISSM notified
- [ ] No findings — inventory complete, all systems compliant

---

## 12. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________

**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1701-MO | Rev 1.0 | Category 17 — Supply Chain & Software Integrity | ⚠️ NON-TAILORABLE SA-22*
*Classification: [CLASSIFICATION]*
