---
mrc_id: MRC-2002-AN
title: Annual ATO Renewal Package Preparation
category: 20 — Compliance & Authorization (ATO)
periodicity: ANNUAL
maintenance_type: PREVENTIVE / REPORT / ADMIN
est_time: "08:00"
rin: AN-ATO-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
tool: "System Security Plan (SSP), POA&M tracking tool ([SITE-DESIGNATED TOOL]), STIG/SCAP scan results, full-year ConMon artifact archive, risk assessment documentation"
jsig_controls: "CA-5, CA-6, CA-6(1), CA-7, CA-7(1), RA-3, RA-3(1), PL-2, PM-4, AU-9, SI-12"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Administrative package assembly; no system changes under this card"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
The ATO renewal is the annual (or multi-year, depending on the AO's decision) formal re-authorization of the system. The Authorizing Official (AO) reviews the full security posture — every open vulnerability, every outstanding POA&M item, every control that has drifted from baseline, and the complete year's worth of ConMon evidence — and decides whether the system remains authorized to operate. If the ATO is not renewed before expiration, the system must be shut down. The renewal is driven by the ISSM, but the SA is responsible for assembling the technical evidence: a full-year ConMon archive, the current STIG/SCAP scan results, the current POA&M, and documentation of any system changes made during the authorization period. This card guides the SA through gathering and organizing all technical artifacts required by the ISSM to build the ATO renewal package. This card is initiated no later than 90 days before ATO expiration (see MRC-2001-MO trigger).

## Safety / Hazards
JSIG: This is a high-stakes administrative action. Do not submit incomplete or inaccurate data — the AO makes the authorization decision based on what you provide. Do not alter scan results, close POA&M items without verification, or misrepresent system state. Any discrepancy discovered during the AO review is a finding against the ISSM and SA. If a significant vulnerability or non-tailorable control failure is discovered during package assembly, it must be disclosed to the ISSM immediately — do not suppress it from the package.

## Tools / Equipment / Access Required
- System Security Plan (SSP) — current version, ISSM-maintained
- POA&M tracking tool (eMASS or ISSM-designated system) — full current state
- Full-year ConMon artifact archive (12 months of MRC-1501-MO packages)
- STIG/SCAP scan results — current cycle (from MRC-0801-MO)
- Nessus vulnerability scan report — current cycle (from MRC-0204-MO)
- Hardware and software inventory (current, ISSM-maintained)
- Interconnection agreements (ISA/MOU — if applicable)
- ISSM for coordination, review, and submission to AO

## Reference Documents
- JSIG — CA-5, CA-6, CA-6(1), CA-7, RA-3, PL-2, PM-4
- NIST SP 800-37 Rev 2 — RMF Authorization Process (Step 5: Authorize)
- NIST SP 800-18 Rev 1 — Guide for Developing the System Security Plan
- DoDI 8510.01 — RMF for DoD IT (ATO renewal requirements)
- DoDM 5205.07 Vol. 1 — ISSM/ISSO responsibilities
- Site-specific Continuous Monitoring Strategy document
- Prior ATO authorization letter (current cycle)

## Manpower Requirements
1x SA (package assembly — typically 6–8 hours across multiple sessions), ISSM (review, risk determination, and AO submission). ISSO participation recommended for POA&M review and finding disposition. This card documents the SA's technical contribution to the renewal — the ISSM conducts the actual AO submission.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- ATO expiration date known; this card initiated ≥ 90 days before expiration
- Full-year ConMon archive accessible (all 12 MRC-1501-MO packages)
- Current STIG/SCAP and Nessus scan results available
- POA&M current and accessible
- ISSM engaged and directing the renewal timeline

---

## Procedure Steps

| Step | Action | Location / Tool | Expected Result |
|------|--------|----------------|----------------|
| 1 | Confirm ATO expiration date and renewal deadline with ISSM | ATO authorization letter on file | Expiration date confirmed; submission deadline set by ISSM (typically 60 days before expiration to allow AO review time) |
| 2 | Retrieve and verify the full-year ConMon artifact archive | Artifact repository — 12 months of MRC-1501-MO packages | All 12 monthly packages present; any missing months documented and explained to ISSM |
| 3 | Pull current Nessus vulnerability scan report | Current cycle scan results (MRC-0204-MO) | Most recent scan report available; scan date within 30 days of package assembly |
| 4 | Pull current STIG/SCAP scan results | Current cycle scan results (MRC-0801-MO) | Most recent SCAP results available; all open CAT I findings documented in POA&M |
| 5 | Export full POA&M — all items (open, closed, risk accepted) | POA&M tool > full export | Complete POA&M exported; verify no items are missing or in an unresolved state |
| 6 | Review POA&M for any items that need ISSM disposition before submission | Filter: items with no milestone, items overdue, items with expired risk acceptances | All items have valid milestones or ISSM-approved extensions; no unresolved dispositions |
| 7 | Pull current hardware inventory | ISSM-maintained hardware baseline | Current hardware list available; verify it reflects actual installed equipment |
| 8 | Pull current software inventory | Software inventory from MRC-1703-MO (monthly software audit) | Current software list available; all software authorized; no EOL/unsupported components (SA-22) |
| 9 | Review system boundary documentation in SSP | SSP — System Boundary section (ISSM-maintained) | Boundary reflects current configuration; any undocumented changes discovered → report to ISSM for SSP update before submission |
| 10 | Review interconnection agreements (ISA/MOU) if applicable | ISA/MOU on file with ISSM | All active interconnections documented with current agreements; expired ISAs flagged for ISSM renewal |
| 11 | Document non-tailorable control compliance status | Review controls: AC-6(1) Cat 03, SC-28 Cat 16/22, SA-22 Cat 17 | All non-tailorable controls compliant; any non-compliance is a stop-work item — notify ISSM before proceeding |
| 12 | Compile SA Technical Evidence Package | Assemble all artifacts into organized package per ISSM naming convention | Package complete: ConMon archive, scan reports, POA&M, inventories, ISA/MOU, non-tailorable status summary |
| 13 | Deliver SA Technical Evidence Package to ISSM | Secure delivery per ISSM direction | ISSM received package; delivery date documented |
| 14 | Support ISSM during AO review — respond to any technical questions | ISSM/AO communication channel | SA available and responsive during AO review period |
| 15 | Upon ATO renewal: file new authorization letter; update ISSM_AUTH_REF in all active MRC stubs | Updated ATO letter on file | All MRC stubs reflect new ISSM auth reference; next expiration date tracked in MRC-2001-MO |
| 16 | Sign and date MRC; file as CA-6 BoE artifact | SA signature; ISSM co-sign | MRC retained per AU-11 |

---

## ATO Renewal Package Checklist

| Artifact | Source MRC / Document | Included | Notes |
|----------|-----------------------|----------|-------|
| Full-year ConMon archive (12 months) | MRC-1501-MO × 12 | ☐ Yes ☐ Gaps documented | Missing months: ___ |
| Current Nessus vulnerability scan report | MRC-0204-MO | ☐ Yes | Scan date: ___ |
| Current STIG/SCAP scan results | MRC-0801-MO | ☐ Yes | Scan date: ___ |
| Full POA&M export (all items) | MRC-0205-MO / eMASS | ☐ Yes | Export date: ___ |
| Current hardware inventory | ISSM baseline | ☐ Yes | Last updated: ___ |
| Current software inventory | MRC-1703-MO | ☐ Yes | Last updated: ___ |
| SSP current version | ISSM-maintained | ☐ Yes | SSP version: ___ |
| Interconnection agreements (ISA/MOU) | ISSM file | ☐ Yes ☐ N/A | Count: ___ |
| Non-tailorable control compliance summary | AC-6(1), SC-28, SA-22 | ☐ Yes | All compliant: Y / N |
| Prior ATO authorization letter | ISSM file | ☐ Yes | Expiration: ___ |

---

## Non-Tailorable Control Compliance Summary

| Control | Category | Status | Notes |
|---------|---------|--------|-------|
| AC-6(1) — Endpoint protection shall not be absent | 03 AV/EDR | ☐ Compliant ☐ NON-COMPLIANT — STOP | |
| SC-28 — Encryption at rest (BitLocker) | 16 & 22 | ☐ Compliant ☐ NON-COMPLIANT — STOP | |
| SA-22 — No EOL/unsupported components | 17 Supply Chain | ☐ Compliant ☐ NON-COMPLIANT — STOP | |

> **NON-COMPLIANT on any non-tailorable control = Stop package assembly. Notify ISSM immediately. Do not submit renewal package with an active non-tailorable control failure.**

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Full-Year ConMon Archive Complete: [ ] Yes  [ ] No — ___ months missing; explained to ISSM
- Current Scan Reports Available (≤ 30 days old): [ ] Yes  [ ] No — ISSM notified
- POA&M Fully Resolved (no open/unresolved dispositions): [ ] Yes  [ ] No — ___ items; ISSM notified
- All Non-Tailorable Controls Compliant: [ ] Yes  [ ] No — STOP; ISSM notified immediately
- SSP Reflects Current System State: [ ] Yes  [ ] No — changes reported to ISSM
- SA Technical Evidence Package Delivered to ISSM: [ ] Y   Date: _______________
- ISSM Acknowledged Receipt: [ ] Y  [ ] N   Time: _______________
- ATO Renewal Granted: [ ] Y   New Expiration: _______________  [ ] Pending AO decision
- Artifact file (this MRC): _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM (Review & Submission) | | | |
| ISSO (POA&M Review) | | | |
