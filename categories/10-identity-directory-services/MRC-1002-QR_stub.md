---
mrc_id: MRC-1002-QR
title: "Quarterly Group Policy Audit — DISA GPO Release Verification and SCC Benchmark Alignment"
category: "10 — Identity & Directory Services"
periodicity: Quarterly
est_time: "2–3 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "GPMC, PowerShell, SCC, DISA STIG GPO Package, SYSVOL"
jsig_controls:
  - CM-6
  - CM-7
  - AC-3
  - SC-18
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1002-QR — Quarterly Group Policy Audit: DISA GPO Release Verification and SCC Benchmark Alignment

---

## 1. Background (New SA)

**What this MRC covers:**
DISA periodically releases updated STIG GPO packages — pre-built Group Policy Objects aligned to the latest STIG benchmarks. This quarterly audit:
1. Verifies the environment is running GPOs aligned to the current DISA release
2. Detects any unauthorized GPO additions, modifications, or deletions since last quarter (configuration drift)
3. Cross-references the active GPO settings against the current SCC SCAP benchmark results

**Why GPO integrity matters:**
GPOs enforce security settings across all domain-joined hosts. An unauthorized GPO change — or a missing GPO — can silently disable a security control for every machine in scope. In a SAP environment this is a CM-6 violation and potentially a significant audit finding.

---

## 2. Safety / Hazards

> ⚠️ **DO NOT MODIFY GPOs WITHOUT AUTHORIZATION:** GPO changes affect all hosts in scope. Any modification requires a CCB-approved CR and ISSM authorization first.

> ⚠️ **UNAUTHORIZED GPO = CM-6 VIOLATION:** Any GPO found that is not in the authorized GPO inventory must be reported to ISSM immediately.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| GPMC (Group Policy Management Console) | Installed on admin workstation or DC |
| `Get-GPOInventory.ps1` | Library script — `scripts/Get-GPOInventory.ps1` |
| DISA STIG GPO Package | Latest release from DISA IASE (external → transfer in) |
| SCC results from MRC-0801-MO | Current month SCAP scan results for cross-reference |
| Authorized GPO Inventory | ISSM-maintained list of all authorized GPOs |
| MRC Sign-Off Block | SA and ISSM/ISSO signatures |

---

## 4. Procedure Steps

| Step | Action | Command | Expected Result |
|------|--------|---------|-----------------|
| 1 | Run GPO inventory script | `.\Get-GPOInventory.ps1` | All GPOs listed: GUID, Name, Created, Modified, Linked OUs |
| 2 | Compare GPO list to authorized GPO inventory | Side-by-side comparison | All GPOs match authorized list; no extra, missing, or renamed GPOs |
| 3 | Any GPO not in authorized inventory | Document immediately; notify ISSM — unauthorized GPO = CM-6 violation | Finding logged |
| 4 | Check GPO modification dates | GPMC → [each GPO] → Details → Modified Date | Any GPO modified since last audit without an authorized CCB CR = document and notify ISSM |
| 5 | Download current DISA STIG GPO package (external workstation) | DISA IASE → STIG GPO packages | Current package version recorded |
| 6 | Transfer DISA GPO package into SAPF | Inbound scan mandatory | Scan passes |
| 7 | Compare environment GPO settings to DISA package baseline | GPMC → [GPO] → Settings Report vs. DISA package export | Any deviations from DISA baseline = document as variance |
| 8 | Cross-reference GPO variance with SCC SCAP results | SCC results from MRC-0801-MO | Variances from GPO baseline should align with approved STIG exceptions/N/A justifications |
| 9 | Verify SYSVOL integrity — no orphaned or unexpected GPO folders | `Get-ChildItem \\[domain]\SYSVOL\[domain]\Policies\` | SYSVOL GPO folders match GPMC GPO GUIDs |
| 10 | Verify GPO link status — no disabled or unlinked GPOs for active OUs | GPMC → [each GPO] → Scope | All required GPOs linked and enforced |
| 11 | Document all findings in Findings Log (Section 8) | | |
| 12 | Any required GPO updates (new DISA release): submit CCB CR | CCB ticketing system | ISSM authorizes before any GPO is modified |
| 13 | Sign-Off block | Section 9 | Signatures obtained |

---

## 8. Non-Compliance / Findings Log

| # | GPO Name | Finding | CCB CR? | ISSM Notified | Time | Directed Action | Resolved |
|---|---------|---------|---------|---------------|------|----------------|---------|
| 1 | | | | | | | |
| 2 | | | | | | | |

---

## 9. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**CCB Change Request # (if applicable):** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1002-QR | Rev 1.0 | Category 10 — Identity & Directory Services*
*Classification: [CLASSIFICATION]*
