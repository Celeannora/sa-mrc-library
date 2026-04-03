---
mrc_id: MRC-0801-MO
title: "Monthly STIG/SCAP Scan, Configuration Drift Detection, and Variance Documentation"
category: "08 — Configuration & Baseline Management"
periodicity: Monthly
est_time: "2–4 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "SCAP Compliance Checker (SCC), STIG Viewer, DISA STIG Library, Nessus/ACAS (compliance plugins)"
jsig_controls:
  - CM-6
  - CM-7
  - SI-2
  - CA-7
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-0801-MO — Monthly STIG/SCAP Scan, Configuration Drift Detection, and Variance Documentation

---

## 1. Background (New SA)

**What STIG compliance means:**
DISA Security Technical Implementation Guides (STIGs) define the required secure configuration for every OS, application, and device in the DoD environment. A STIG check verifies the system is configured per its approved baseline. Deviations from the STIG — called findings — are categorized CAT I (critical), CAT II (high), or CAT III (medium/low).

**SCAP Compliance Checker (SCC):**
SCC is the DoD-standard automated tool for running STIG checks. It reads SCAP benchmark content and evaluates each system against the required settings, producing a results file that identifies every open, closed, and not-applicable finding.

**Configuration drift:**
Over time, patches, software installs, and administrative changes can alter a system's configuration away from its approved STIG baseline. This MRC detects that drift monthly so it can be corrected before it becomes an audit finding.

**Benchmark adjustments:**
Some STIG checks must be marked N/A or given a custom rule for this specific environment (e.g., a STIG check for a service that isn't installed). These adjustments are documented in the benchmark with ISSM approval — they are not exceptions to controls, just accurate scoping.

---

## 2. Safety / Hazards

> ⚠️ **CAT I STIG FINDINGS:** Any open CAT I STIG finding must be escalated to ISSM same-day. CAT I = high risk; these must have a POA&M entry and remediation plan before the next monthly cycle.

> ⚠️ **DO NOT APPLY STIG CHANGES WITHOUT AUTHORIZATION:** SCC findings are documentation — not authorization to change settings. Any STIG fix that modifies a production system requires a CCB CR and ISSM authorization first.

> ⚠️ **SCC TOOL MUST BE CURRENT:** SCC and SCAP benchmark content must be transferred in via authorized media from the DISA IASE website (external workstation). Outdated benchmarks produce inaccurate results.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| SCC (SCAP Compliance Checker) | Current version from DISA IASE — transferred in via authorized media |
| STIG Viewer | DISA IASE — for reviewing individual check findings |
| SCAP benchmark content | OS and application benchmarks matching environment (transferred in) |
| Authorized transfer media | For SCC and benchmark import |
| STIG Variance Log | SA-maintained document of all open findings and N/A justifications |
| POA&M tracker | All CAT I/II findings require POA&M entries |
| MRC Sign-Off Block | SA and ISSM/ISSO signatures |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| DISA STIG Library | https://public.cyber.mil/stigs/ (external — download on transfer workstation) |
| SCAP Compliance Checker (SCC) | https://public.cyber.mil/stigs/scap/ (external) |
| NIST SP 800-70 Rev 4 — SCAP | https://csrc.nist.gov/publications/detail/sp/800-70/rev-4/final |
| STIG Variance Log | SA Document Repository |
| MRC-0201-WK | Nessus results — cross-reference for overlapping findings |

---

## 5. Procedure Steps

### Phase 1 — Tool and Content Update

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 1 | Download current SCC and applicable SCAP benchmarks on external workstation | DISA IASE → Downloads → SCC, SCAP Benchmarks | Current versions downloaded; record version numbers |
| 2 | Hash verify downloaded files | `Get-FileHash <file> -Algorithm SHA256` vs. DISA-published hashes | Hashes match — proceed |
| 3 | Transfer to SAPF via authorized media + inbound scan | Per SA-BASELINE.md Appendix B | Zero detections — proceed |
| 4 | Install/update SCC and benchmark content | Run SCC installer; import XCCDF benchmark files | SCC version updated; benchmarks loaded |

### Phase 2 — SCAP Scan

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 5 | Open SCC | Start → SCC application | SCC dashboard |
| 6 | Configure scan targets | SCC → Targets → Add all managed hosts (or scan groups) | All hosts added |
| 7 | Select applicable SCAP benchmarks for each host | SCC → Content → Select: Windows Server STIG, Windows 10/11 STIG, applicable application STIGs | Correct benchmarks mapped to correct host types |
| 8 | Run scan | SCC → Scan → Start | Scan completes on all hosts — results generated |
| 9 | Export scan results | SCC → Results → Export → XCCDF Results + HTML Summary | Results file saved |

### Phase 3 — Drift Analysis and Variance Documentation

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 10 | Open HTML summary — review all CAT I findings | SCC Results → HTML → Filter: CAT I / FAIL | All open CAT I findings identified |
| 11 | Any CAT I finding: document in Findings Log (Section 9) and notify ISSM same-day | | ISSM notified; POA&M entry created |
| 12 | Review all CAT II findings | Filter: CAT II / FAIL | All open CAT II findings identified and documented |
| 13 | Compare current results to prior month's scan | Side-by-side XCCDF results | New findings (OPEN this month, not prior) = drift detected |
| 14 | For each new finding: document as configuration drift | VULN-ID, Check ID, Host, Prior Status, Current Status | Drift documented in STIG Variance Log |
| 15 | Review all findings marked N/A — verify justification still valid | SCC Results → N/A items | Each N/A has a documented justification with ISSM approval |
| 16 | Any N/A whose justification has changed (service removed, config changed) | Update to applicable status; reassess | Variance Log updated |
| 17 | Document any Benchmark/Rule Adjustments required | Cases where a STIG check does not apply to this environment | Adjustment documented with VULN-ID, reason, and ISSM approval |
| 18 | Update POA&M with all new CAT I and CAT II findings | POA&M → New entries for each finding | All new findings tracked |
| 19 | File scan results and variance log | Designated filing location | Archived with this MRC |
| 20 | Sign-Off block | Section 10 | Signatures obtained |

---

## 8. STIG Scan Summary

| Month | Total Checks | CAT I Open | CAT II Open | CAT III Open | N/A | New (Drift) | Resolved | Net Delta |
|-------|-------------|-----------|------------|-------------|-----|------------|---------|-----------|
| | | | | | | | | |

---

## 9. Non-Compliance / Findings Log

| # | VULN-ID / Check ID | Host | CAT | New/Existing | Description | POA&M Entry | ISSM Notified | Notes |
|---|-------------------|------|-----|-------------|-------------|------------|---------------|-------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |

---

## 10. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-0801-MO | Rev 1.0 | Category 08 — Configuration & Baseline Management*
*Classification: [CLASSIFICATION]*
