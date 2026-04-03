---
mrc_id: MRC-1201-WK
title: "Weekly Removable Media DLP Event Review and Policy Enforcement Verification"
category: "12 — Removable Media Controls"
periodicity: Weekly
est_time: "30–45 minutes"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Endpoint protection DLP module console ([SITE-DESIGNATED DLP/AV PLATFORM]), removable media policy enforcement interface, media inventory log"
jsig_controls:
  - MP-7
  - MP-4
  - SI-3
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1201-WK — Weekly Removable Media DLP Event Review and Policy Enforcement Verification

---

## 1. Background (New SA)

**What DLP (Data Loss Prevention) does for removable media:**
The Trellix DLP module monitors and controls USB/removable media activity. In a SAP environment, the policy is typically:
- **Unauthorized media is blocked** — any unregistered USB device triggers a block event
- **Authorized media logs a success event** — SA can see what was connected, when, and by whom
- **Any block event is a potential policy violation** — someone tried to use unauthorized media

**What this MRC covers:**
1. Review the ePO DLP event log for the past 7 days
2. Identify and triage any block events (unauthorized media attempted)
3. Verify the DLP policy is applied and enforced on all hosts
4. Cross-reference DLP events against the physical media inventory log

---

## 2. Safety / Hazards

> ⚠️ **BLOCK EVENT = POTENTIAL VIOLATION:** Any DLP block event means an unauthorized device was connected. Every block event must be investigated and reported to ISSM unless it has an already-documented explanation.

---

## 3. Procedure Steps

| Step | Action | Command / Path | Expected Result |
|------|--------|----------------|-----------------|
| 1 | Log in to Trellix ePO console | ePO Web → Admin | Dashboard loads |
| 2 | Navigate to DLP Event Log | ePO → DLP Policy Manager → Incident Manager → Events → Filter: Last 7 days | All DLP events for the week listed |
| 3 | Filter for BLOCK events | Event Type: Block / Deny | All blocked attempts listed |
| 4 | For each block event: document hostname, user, device description, timestamp | Section 8 — Event Log | All block events recorded |
| 5 | Each block event: cross-reference against physical media inventory log | Was an authorized transfer scheduled? | If no authorized transfer on record = potential unauthorized media use — notify ISSM |
| 6 | Review ALLOW events — verify they match authorized transfers | Event Type: Allow | All allow events correspond to logged, authorized transfers |
| 7 | Any allow event with no corresponding media log entry | Document; notify ISSM — unlogged transfer = MP-4 violation | Finding logged |
| 8 | Verify DLP policy assignment — all hosts | ePO → Policy → DLP Device Control → Applied to: All Managed Systems | Policy applied; no hosts missing DLP policy assignment |
| 9 | Any host missing DLP policy | Document; notify ISSM — potential AC-6(1)/MP-7 gap | |
| 10 | Sign-Off block | Section 9 | Signatures obtained |

---

## 8. DLP Event Summary Table

| # | Date/Time | Hostname | User | Device Type | Event Type | Media Log Entry? | Action Taken | Notes |
|---|---------|---------|------|------------|-----------|-----------------|-------------|-------|
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
*MRC-1201-WK | Rev 1.0 | Category 12 — Removable Media Controls*
*Classification: [CLASSIFICATION]*
