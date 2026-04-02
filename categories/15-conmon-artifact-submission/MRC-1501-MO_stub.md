---
mrc_id: MRC-1501-MO
title: Monthly ConMon Artifact Compilation and Submission
category: ConMon Artifact Submission
periodicity: MONTHLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "01:30"
rin: MO-CCM-001
revision: Rev 1.0
classification: "[CLASSIFICATION]"
---

## Safety / Hazards
N/A — Ensure all artifact files are handled and transmitted per applicable classification and data handling policy.

## Tools / Equipment / Access Required
- Vulnerability scanner console (ACAS / Nessus)
- SIEM console (export capability)
- Patch management console
- POA&M tracking tool (eMASS / [tool])
- Secure file transfer / artifact repository

## Reference Documents
- NIST SP 800-53 CA-7
- System Security Plan (SSP) — ConMon Strategy section
- ISSM-defined artifact naming convention

## Manpower Requirements
1x SA, coordination with ISSO for POA&M updates. Submission deadline defined by ISSM.

## Procedure Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Export vulnerability scan report from scanner. Name per convention: `[SystemID]_VulnScan_[YYYYMM].pdf`. | Scan report saved to artifact repository. |
| 2 | Export SIEM monthly event summary and log export. Save per convention. | Log summary saved. |
| 3 | Export patch compliance report from patch management console. | Patch report saved. |
| 4 | Review and update POA&M — update status of all open findings with current milestones. | POA&M current and accurate. |
| 5 | Review backup verification log for the month. Ensure restore test result is documented. | Backup artifact saved. |
| 6 | Bundle all artifacts into the monthly ConMon package. | Package complete. |
| 7 | Submit package to ISSM via defined delivery method. Record submission date and method below. | Submission confirmed by ISSM. |
| 8 | Sign and date MRC. | MRC complete. |

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Deficiencies: [ ] None  [ ] POA&M Required  [ ] Immediate Action Required
- Submission Date: _______________   Delivery Method: _______________
