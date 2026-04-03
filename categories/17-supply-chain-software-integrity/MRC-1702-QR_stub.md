---
mrc_id: MRC-1702-QR
title: "Quarterly Supply Chain and Software Integrity Verification"
category: "17 — Supply Chain & Software Integrity"
periodicity: Quarterly
est_time: "3–4 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Software inventory or CMDB tool ([SITE-DESIGNATED TOOL]), vulnerability scanner, file integrity monitoring tool ([SITE-DESIGNATED TOOL]), code/binary signing verification utility"
jsig_controls:
  - SA-22
  - SI-7
  - SR-3
  - CM-7
non_tailorable: true
non_tailorable_control: "SA-22 — Unsupported System Components"
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1702-QR — Quarterly Supply Chain and Software Integrity Verification

## ⚠️ NON-TAILORABLE CONTROL — SA-22
**Per JSIG:** This quarterly review extends MRC-1701-MO to include cryptographic hash/checksum verification of critical system files (SI-7), hardware inventory reconciliation, and supply chain documentation review. All new hardware and software entering the SAPF must have PSO authorization.

---

## 1. Background (New SA)

**What is software integrity verification?**
Beyond checking for EOL software (MRC-1701-MO), integrity verification asks: has the software been tampered with? Are the files that are supposed to be running actually the legitimate, unmodified versions?

**How it works:**
Legitimate software has a known cryptographic hash (like a fingerprint). If a file has been modified — even by one byte — its hash changes. Tools like `Get-FileHash` (PowerShell) or Sysinternals `sigcheck` can verify that running files match their expected values.

**What supply chain verification covers:**
- No unauthorized hardware was introduced to the SAPF
- All hardware in use came through approved procurement channels
- No counterfeit or unapproved firmware is running
- PSO-authorized hardware list is current

---

## 2. Safety / Hazards

> ⚠️ **STOP WORK CONDITION:** If hash verification fails on a critical system file, this may indicate a compromise. **Stop work and notify the ISSM and ISSO immediately** — this is a potential security incident (IR-4).

> ⚠️ **SA-22 FAILURE:** Any newly discovered EOL/unsupported component requires immediate ISSM notification before any action.

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** ISSM written authorization required (MA-2). Coordinate 5 business days in advance.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| PowerShell (elevated) | `Get-FileHash`, `Get-AuthenticodeSignature` |
| Sysinternals Sigcheck | Verifies digital signatures and file hashes — must be on ASL |
| SCCM / Endpoint Manager | Hardware and software inventory reports |
| File Integrity Monitoring (FIM) tool | Review alerts from current quarter |
| ACAS / Nessus | Software integrity and EOL plugins |
| Approved Hardware List | PSO/ISSM maintained — current version required |
| Approved Software List (ASL) | ISSM maintained — current version required |
| MRC-1701-MO results | Prior month's EOL check results |
| MRC Sign-Off Block | Signed by SA and ISSM/ISSO after completion |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| JSIG SA-22, SI-7, SR-3 Implementation Guidance | ISSM SharePoint / SAP Cybersecurity Binder |
| NIST SP 800-161 Rev 1 — SCRM | https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final |
| NIST SP 800-147 — BIOS Protection | https://csrc.nist.gov/publications/detail/sp/800-147/final |
| Approved Hardware List | ISSM Document Repository |
| Approved Software List (ASL) | ISSM Document Repository |
| MRC-1701-MO | Monthly software inventory (prerequisite) |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 3–4 hours |
| ISSM Review | 1 | 1 hour (findings review) |

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file
- [ ] MRC-1701-MO results from current month reviewed
- [ ] Current Approved Hardware List obtained from ISSM/PSO
- [ ] Current ASL obtained from ISSM
- [ ] Sigcheck on ASL and installed on admin workstation
- [ ] FIM console access verified (if in use)

---

## 7. Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|-----------------|
| 1 | Review MRC-1701-MO results for current quarter — confirm no open SA-22 findings | Prior MRC file | All open items have ISSM-directed disposition |
| 2 | Pull hardware inventory from SCCM | SCCM Console → Assets and Compliance → Devices → Hardware Inventory | Full list of all hardware assets |
| 3 | Compare hardware inventory to PSO-approved hardware list | Side-by-side comparison | Any hardware not on approved list = supply chain finding |
| 4 | For any unapproved hardware: document and notify ISSM | Findings Log (Section 10) | ISSM directs disposition |
| 5 | Verify firmware versions on all managed servers via OOB (iLO/iDRAC) | OOB management console → System Information → Firmware | Current firmware matches vendor-approved baseline |
| 6 | Review FIM alerts from current quarter | FIM console → Alert Log → Last 90 days | Any unauthorized file modifications identified and investigated |
| 7 | Run digital signature check on critical OS executables | `Get-AuthenticodeSignature C:\Windows\System32\*.exe \| Where Status -ne Valid` | All critical executables show `Valid` Authenticode signature |
| 8 | Run Sigcheck on critical system directories | `sigcheck -s C:\Windows\System32` | All files signed by Microsoft or authorized vendor |
| 9 | For any unsigned or invalid signature: document immediately | Findings Log | Potential integrity failure — notify ISSM |
| 10 | Verify hash of critical application executables against known-good baseline | `Get-FileHash <path> -Algorithm SHA256` vs. documented baseline | Hashes match — no tampering |
| 11 | Run ACAS scan — software integrity plugins | ACAS → Plugin family: Windows → Software Integrity / Backdoor checks | No integrity failures reported |
| 12 | Review PSO authorization records for any hardware/software added this quarter | PSO authorization log | Every addition has documented PSO approval |
| 13 | Verify no unapproved remote access tools or peer-to-peer software is installed | ASL comparison + ACAS P2P plugins | No unauthorized remote access or P2P tools |
| 14 | Update hardware and software status tables (Sections 8–9) | | All inventory items documented |
| 15 | Notify ISSM of check completion and all findings | Secure communication | ISSM acknowledges |
| 16 | Complete Findings Summary and Sign-Off block | Sections 11–12 | Signatures obtained |

---

## 8. Hardware Inventory Status Table

| # | Hostname | Hardware Type | Make/Model | Serial # | On Approved List? | Firmware Current? | Notes |
|---|----------|--------------|------------|----------|-------------------|-------------------|-------|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |

---

## 9. Software Integrity Check Table

| # | Hostname | File / Application | Expected Hash (SHA-256) | Actual Hash | Signature Valid? | Result |
|---|----------|--------------------|------------------------|------------|-----------------|--------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

---

## 10. Non-Compliance / Findings Log

| # | Host | Finding | Control | SA-22? | ISSM Notified | Time | Directed Action | Resolved |
|---|------|---------|---------|--------|---------------|------|----------------|---------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |

---

## 11. Findings Summary

- [ ] All hardware on approved list — no supply chain findings
- [ ] All software hashes valid — no integrity failures
- [ ] One or more SA-22 failures found — ISSM notified immediately
- [ ] File integrity failure detected — ISSM notified as potential incident
- [ ] No findings — review complete

---

## 12. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________

**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1702-QR | Rev 1.0 | Category 17 — Supply Chain & Software Integrity | ⚠️ NON-TAILORABLE SA-22*
*Classification: [CLASSIFICATION]*
