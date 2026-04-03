---
mrc_id: MRC-0701-DA
title: Daily IDS/IPS and Network Alert Review
category: 07 — Network & Boundary Security
periodicity: DAILY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:20"
rin: DA-NET-001
revision: Rev 1.1
classification: "[CLASSIFICATION]"
tool: "IDS/IPS management console ([PRODUCT — e.g., Snort, Suricata, HBSS, Palo Alto Panorama]), SIEM (Splunk), firewall management console (if applicable)"
jsig_controls: "SI-4, SI-4(1), SI-4(2), SC-7, AU-6, AU-9, IR-6"
non_tailorable: "N/A — verify against site-specific JSIG annex"
issm_auth_ref: "[ISSM Written Auth Reference # — Date]"
ccb_cr_number: "N/A — Read-only review; rule tuning requires CCB-approved CR"
sapf_entry_approval: "N/A"
nonlocal_maintenance: "N"
docx_status: "PENDING — .docx not yet generated"
---

## Background (New SA)
IDS (Intrusion Detection System) and IPS (Intrusion Prevention System) monitor network traffic for patterns that match known attack signatures — port scans, exploitation attempts, lateral movement, data exfiltration, and command-and-control traffic. In a SAP environment, network monitoring is a JSIG requirement under SI-4. This daily review verifies that the sensor infrastructure is healthy, all alerts from the previous 24 hours have been triaged, and any confirmed or suspected intrusion activity is escalated to ISSM immediately per IR-6. Alert fatigue is a real risk — this card focuses on severity-based triage, not checking every single alert individually.

## Safety / Hazards
JSIG: Do not modify IDS/IPS rules, sensor configuration, or alert thresholds without a CCB-approved Change Request and ISSM authorization. Do not attempt to block, block-and-shun, or actively respond to a detected threat without ISSM/ISSO authorization — unauthorized IPS actions can disrupt authorized traffic. Any confirmed intrusion event activates the site Incident Response Plan — notify ISSM immediately (IR-6).

## Tools / Equipment / Access Required
- IDS/IPS management console ([PRODUCT name and URL/path])
- SIEM console (Splunk or site equivalent) — `https://[SIEM-SERVER]:8000`
- Firewall management console (if reviewing boundary deny logs)
- Privileged SA account (cleared, SAP-authorized per MA-5)
- ISSM/ISSO contact for escalation and IR activation

## Reference Documents
- JSIG — SI-4, SI-4(1), SI-4(2), SC-7, AU-6, IR-6
- Site Incident Response Plan
- MA-3 Approved Tool List
- IDS/IPS rule baseline (ISSM-maintained)
- Site ConMon Strategy document

## Manpower Requirements
1x SA (cleared, SAP-authorized). ISSM notification required for: any confirmed or suspected intrusion, any sensor reporting offline or dark, and any alert pattern suggesting coordinated attack activity.

## Prerequisites (JSIG MA-2)
- ISSM written authorization on file for this MRC series
- IDS/IPS console accessible; SA credentials current
- SIEM accessible and receiving events from IDS/IPS sensors

---

## Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|-------------------|----------------|
| 1 | Log in to IDS/IPS management console | [PRODUCT URL or console path] | Dashboard loads; no sensor offline banners |
| 2 | Set time window to last 24 hours | Dashboard or search filter — `Last 24 Hours` | Alert list scoped to prior 24-hour period |
| 3 | Review all Critical and High severity alerts | Filter by `Severity = Critical` then `High` | All Critical/High alerts reviewed; any unacknowledged alerts investigated |
| 4 | Triage alerts — classify as: True Positive / False Positive / Pending Investigation | For each Critical/High alert: correlate with known authorized activity, patch windows, scan schedules | Alert dispositioned; false positives noted for tuning (Step 9) |
| 5 | Escalate any confirmed or suspected intrusion events | Contact ISSM immediately per IR-6; initiate Incident Response Plan | ISSM notified; IR ticket opened; escalation documented below |
| 6 | Review Medium alerts — spot-check for patterns | Filter `Severity = Medium`; look for repeated source IPs, lateral movement patterns, or policy violations | No unrecognized patterns; patterns documented |
| 7 | Verify sensor health — confirm all sensors/collectors are reporting | Console `Sensor Status` or `Health` view | All sensors `Active/Online`; any dark sensor investigated and reported to ISSM |
| 8 | Review VPN / remote access logs for anomalous source IPs or off-hours access | SIEM: `index=vpn` or firewall VPN log source — last 24 hours | Access consistent with known authorized users and patterns; anomalies documented |
| 9 | Flag false-positive alerts for rule tuning | Note rule ID, signature name, and source — document for CCB tuning request | Tuning request submitted to ISSM if alert volume is impeding review |
| 10 | Document all findings in Non-Compliance / Alert Log below | — | All non-routine alerts recorded |
| 11 | Sign and date MRC; file as SI-4 / AU-6 BoE artifact | SA signature; ISSM/ISSO co-sign if intrusion escalated | MRC retained per AU-11 |

---

## Alert Triage Log (Critical / High — Non-Routine Only)

| # | Alert / Signature | Source IP | Destination | Severity | Classification | Action Taken | Escalated |
|---|------------------|-----------|-------------|----------|---------------|-------------|----------|
| 1 | | | | | TP / FP / Pending | | Y / N |
| 2 | | | | | TP / FP / Pending | | Y / N |
| 3 | | | | | TP / FP / Pending | | Y / N |
| 4 | | | | | TP / FP / Pending | | Y / N |
| 5 | | | | | TP / FP / Pending | | Y / N |

---

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
- Critical/High Alerts Reviewed: ___ total — ___ True Positive / ___ False Positive / ___ Pending
- Intrusion Event Detected: [ ] Yes — IR Plan activated, ISSM notified  [ ] No
- All Sensors Reporting: [ ] Yes  [ ] No — ___ sensor(s) dark; ISSM notified
- VPN Anomalies Detected: [ ] Yes — documented  [ ] No
- Rule Tuning Requests Opened: ___ (submitted to ISSM)
- ISSM Notified: [ ] Y  [ ] N/A   Time: _______________
- Artifact file (this MRC): _______________

## Sign-Off

| Role | Printed Name | Signature | Date |
|------|-------------|-----------|------|
| SA (Performing) | | | |
| ISSM / ISSO (if intrusion or escalation) | | | |
