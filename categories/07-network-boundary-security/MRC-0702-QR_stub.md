---
mrc_id: MRC-0702-QR
title: "Quarterly Firewall Rule and ACL Baseline Verification"
category: "07 — Network Boundary Security"
periodicity: Quarterly
est_time: "2–3 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Firewall management console ([SITE-DESIGNATED FIREWALL PLATFORM]), network access control list management tool, configuration comparison utility"
jsig_controls:
  - SC-7
  - SC-7(5)
  - CM-2
  - CM-3
  - CA-7
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-0702-QR — Quarterly Firewall Rule and ACL Baseline Verification

---

## 1. Background (New SA)

**Why quarterly firewall baseline verification matters:**
Firewall rules and network ACLs define what traffic is permitted to enter and leave the SAP environment. In an air-gapped SAP facility, the boundary protection rules are often more restrictive than in a standard network — but over time, rules accumulate: temporary rules that were never removed, rules added for a specific project that have since ended, overly permissive rules that were intended as a quick fix, and rules whose purpose nobody can now remember. Each unreviewed rule is a potential gap.

JSIG SC-7 (Boundary Protection) and CM-2 (Baseline Configuration) together require that the configuration of boundary devices be maintained against an approved baseline and reviewed on a recurring schedule. This quarterly check compares the live firewall/ACL configuration against the ISSM-approved baseline, identifies any deviations, and ensures all rules have documented justifications.

**Scope of this MRC:**
- Site boundary firewall(s) — inbound and outbound rule sets
- Internal segment firewalls or ACLs (if applicable per site architecture)
- Router ACLs on boundary interfaces
- Any other network access control device listed in the ISSM-authorized boundary device inventory

**What constitutes a finding:**
- Any rule present in the live configuration that is not in the ISSM-approved baseline
- Any rule in the approved baseline that is absent from the live configuration
- Any rule that permits broader access than the baseline allows (e.g., `any source` where a specific host should be defined)
- Any `deny all` or default-deny rule that has been removed or modified
- Any rule whose business justification cannot be identified from CCB records

---

## 2. Safety / Hazards

> ⚠️ **READ-ONLY VERIFICATION:** This MRC is a comparison and documentation activity. Do not modify, add, or delete firewall rules or ACLs without a CCB-approved Change Request and ISSM written authorization. Unauthorized changes to boundary protection rules are a SC-7 / CM-3 violation.

> ⚠️ **DEVIATION HANDLING:** Any deviation found between the live configuration and the approved baseline must be documented and reported to the ISSM before any remediation. Do not remediate silently — every change requires a CCB CR.

> ⚠️ **SENSITIVE CONFIGURATION:** Firewall rule sets are sensitive configuration documents. Handle exports and configuration files per site data classification requirements. Do not transmit unencrypted configuration exports over unprotected channels.

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** ISSM written authorization required (MA-2).

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| Firewall management console (read access) | [SITE-DESIGNATED FIREWALL PLATFORM] — admin or read-only access to live rule set |
| ISSM-approved firewall baseline document | Version-controlled baseline — stored in ISSM document repository |
| Configuration export utility | Platform CLI or GUI export function — exports live rule set for comparison |
| Configuration comparison utility | Diff tool or manual side-by-side comparison |
| CCB Change Request records | All authorized changes since last quarterly review |
| MRC Sign-Off Block | SA and ISSM/ISSO signatures |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| JSIG SC-7 — Boundary Protection | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG SC-7(5) — Deny by Default | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG CM-2 — Baseline Configuration | ISSM SharePoint / SAP Cybersecurity Binder |
| JSIG CM-3 — Configuration Change Control | ISSM SharePoint / SAP Cybersecurity Binder |
| ISSM-Approved Firewall Baseline Document | ISSM document repository — current version |
| CCB Change Request Log | CCB ticketing system — all CRs since last quarterly review |
| MRC-0701-DA | Daily Boundary Device and VPN Connectivity Check (cross-reference) |
| Network Topology Diagram | SA Document Repository — current approved version |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 2–3 hours |
| ISSM / ISSO | 1 | 30 min (results review and sign-off) |

*ISSM review required for all findings. Any deviation from baseline requires ISSM direction before remediation.*

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file for this quarterly review cycle
- [ ] ISSM-approved firewall baseline document — current version — accessible
- [ ] CCB Change Request log accessible — all CRs since last quarterly review identified
- [ ] Firewall management console read access confirmed
- [ ] Configuration export function available (or manual rule-by-rule review planned)
- [ ] Network topology diagram current and accessible

---

## 7. Procedure Steps

### Phase 1 — Configuration Export and Baseline Retrieval

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 1 | Retrieve the current ISSM-approved firewall baseline document | ISSM document repository → current version | Baseline document in hand; note version number and date of last approved revision |
| 2 | Identify all CCB Change Requests approved since the last quarterly review | CCB ticketing system → filter by date range and device/category | All authorized changes since last review identified — this is the authorized delta |
| 3 | Export or document the live firewall rule set | [SITE-DESIGNATED FIREWALL PLATFORM] → export configuration or manually enumerate rule set | Live configuration available for comparison — note export timestamp |
| 4 | Export or document any router/switch ACLs on boundary interfaces | [SITE-DESIGNATED NETWORK DEVICE MANAGEMENT METHOD] → export or view ACL configuration | Boundary ACLs documented |

### Phase 2 — Rule-by-Rule Comparison

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 5 | Compare live rule set to approved baseline — identify any rules present in live config but not in baseline | Side-by-side comparison or diff tool | Rules present in live but not in baseline → check against CCB log: authorized change = document; no CCB = deviation/finding |
| 6 | Compare live rule set to approved baseline — identify any rules in baseline but absent from live config | Side-by-side comparison | Rules in baseline but absent from live = document; absence may indicate unauthorized deletion or misconfiguration |
| 7 | Review any rule that is broader than the baseline equivalent | Compare source/destination/port/protocol for each rule | Any rule permitting broader access than baseline = finding; document with specifics |
| 8 | Verify default-deny posture is intact | Confirm the last rule in each rule set is a default deny-all | Default deny-all present on all inbound and outbound interfaces; if missing = immediate finding |
| 9 | Verify each rule has a documented business justification | Cross-reference each non-standard rule with CCB CR records | Every permit rule has a CCB CR or original ISSM authorization on file — undocumented rules = finding |
| 10 | Identify and flag any rules with `any` as source or destination where a specific host should be defined | Review all rules for overly permissive source/destination | All `any` entries are explicitly authorized in baseline — unauthorized `any` = finding |

### Phase 3 — Documentation and Reporting

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 11 | Document all deviations in the Firewall Rule Deviation Log (Section 8) | | All deviations recorded with rule ID, description, and finding status |
| 12 | Document all rules reviewed and confirmed compliant in the Rule Review Summary (Section 9) | | All compliant rules marked PASS |
| 13 | Notify ISSM of any unauthorized rules, default-deny modifications, or scope creep findings | Phone / secure message per site SOP | ISSM notified; directed action documented |
| 14 | Update the approved baseline with all CCB-authorized changes (if ISSM directs) | ISSM signs off on updated baseline | Baseline updated and re-signed by ISSM |
| 15 | Complete Findings Summary and Sign-Off block (Sections 10–11) | | SA and ISSM/ISSO signatures obtained |

---

## 8. Firewall Rule Deviation Log

*Complete one row per deviation identified. If no deviations, write "None detected" and proceed to Section 9.*

| # | Rule ID / Position | Rule Description (Brief) | Baseline Status | Live Status | CCB CR # | Finding? | ISSM Notified | Directed Action |
|---|-------------------|--------------------------|----------------|------------|---------|---------|--------------|----------------|
| 1 | | | | | | Y / N | Y / N | |
| 2 | | | | | | Y / N | Y / N | |
| 3 | | | | | | Y / N | Y / N | |
| 4 | | | | | | Y / N | Y / N | |
| 5 | | | | | | Y / N | Y / N | |

*Baseline Status: IN-BASELINE / NOT-IN-BASELINE | Live Status: PRESENT / ABSENT | Finding: Y = unauthorized deviation*

---

## 9. Rule Review Summary

| Metric | Value |
|--------|-------|
| Date of Review | |
| SA (Performing) | |
| Firewall Platform | |
| Baseline Document Version | |
| Baseline Document Date | |
| CCB CRs Reviewed | |
| Total Rules in Live Config | |
| Total Rules in Approved Baseline | |
| Rules Authorized (CCB-documented) | |
| Deviations Found | |
| Default-Deny Posture Intact | Y / N |
| Baseline Update Required | Y / N |

---

## 10. Non-Compliance / Findings Log

| # | Finding Description | Rule/Interface Affected | Control Impacted | ISSM Notified | Time | Directed Action | Resolved |
|---|--------------------|-----------------------|-----------------|--------------|----|-----------------| --------|
| 1 | | | | Y / N | | | Y / N |
| 2 | | | | Y / N | | | Y / N |
| 3 | | | | Y / N | | | Y / N |

---

## 11. Findings Summary

- [ ] All rules verified — no deviations from approved baseline
- [ ] Authorized changes found (CCB-documented) — baseline update required — ISSM directed
- [ ] Unauthorized rule additions found — documented and reported to ISSM
- [ ] Unauthorized rule deletions found — documented and reported to ISSM
- [ ] Overly permissive rules found (scope creep) — documented and reported
- [ ] Default-deny posture compromised — documented and reported to ISSM immediately
- [ ] No findings — all rules consistent with approved baseline

---

## 12. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**Baseline Document Version Reviewed:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-0702-QR | Rev 1.0 | Category 07 — Network Boundary Security*
*Classification: [CLASSIFICATION]*
