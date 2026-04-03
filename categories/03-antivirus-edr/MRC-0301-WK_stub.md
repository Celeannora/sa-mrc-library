---
mrc_id: MRC-0301-WK
title: "Weekly Trellix ePO: DAT Update, Host Audit, Scan Verification, and Module Status"
category: "03 — Antivirus / EDR"
periodicity: Weekly
est_time: "1.5–2.5 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Trellix ePolicy Orchestrator (ePO), Trellix ENS (Endpoint Security), PowerShell, transfer media"
jsig_controls:
  - SI-3
  - SI-4
  - AC-6
non_tailorable: true
non_tailorable_control: "AC-6(1) — Endpoint protection SHALL NOT be absent from any SAP system"
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-0301-WK — Weekly Trellix ePO: DAT Update, Host Audit, Scan Verification, and Module Status

## ⚠️ NON-TAILORABLE CONTROL — AC-6(1)
**Per JSIG:** Endpoint protection SHALL NOT be absent from any SAP system. Any host found without an active, current AV/EDR agent is a non-tailorable control failure requiring **immediate ISSM notification.** This applies to all endpoints — servers, workstations, and domain controllers.

---

## 1. Background (New SA)

**Trellix ePO architecture:**
Trellix ePolicy Orchestrator (ePO) is the centralized management console for all Trellix Endpoint Security (ENS) agents deployed across the environment. From ePO, the SA can:
- Push DAT (definition) updates to all endpoints
- Run and monitor scans
- View threat events and quarantine items
- Check module install status (ATP, WebControl, DLP, etc.)
- Review the System Tree — the inventory of all managed endpoints

**In an air-gapped environment:**
DAT files cannot be pulled from Trellix's cloud automatically. The SA downloads the current DAT package on an isolated workstation, transfers it in via authorized media, and imports it into ePO for distribution.

**What this MRC covers (weekly):**
1. Download and import current DAT files
2. Verify all hosts have received the updated DAT
3. Audit the ePO System Tree — identify any managed host not reporting
4. Verify full scan compliance (within last 7 days on all hosts)
5. Verify quick scan compliance (daily — review last 7 days)
6. Review Threat Events from the week
7. Check ATP Module, WebControl (WC) Module, and DLP Module install status across all hosts
8. Check engine and software version currency

---

## 2. Safety / Hazards

> ⚠️ **NON-TAILORABLE CONTROL:** Any host where the ePO agent is missing, offline, or has definitions older than ISSM-defined threshold = AC-6(1) failure. Stop and notify ISSM immediately.

> ⚠️ **DAT TRANSFER:** Inbound scan of DAT media is mandatory before import into ePO. Never skip the inbound scan station step.

> ⚠️ **THREAT EVENTS:** Any threat event that was not auto-quarantined, or any event involving a privileged user or server, must be escalated to ISSM immediately — do not wait for next review cycle.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| Trellix ePO console (admin) | Web-based console on ePO server |
| Isolated transfer workstation (external) | DAT download — no SAPF connectivity |
| Authorized transfer media | Inventory-tracked; logged in/out |
| SAPF inbound scan station | Mandatory before any import |
| Trellix DAT download portal | https://www.trellix.com/downloads/ (external workstation only) |
| Managed host inventory | All hosts expected in ePO System Tree |
| MRC Sign-Off Block | SA and ISSM/ISSO signatures |

---

## 4. Reference Documents

| Document | Location |
|----------|----------|
| JSIG AC-6, SI-3, SI-4 Implementation Guidance | ISSM SharePoint / SAP Cybersecurity Binder |
| Trellix ePO Product Guide | Trellix Support Portal (external) |
| Trellix DAT Release Notes | Trellix / EICAR (external) |
| MRC-0301-DA | Daily Trellix ePO quick scan and agent check (cross-reference) |

---

## 5. Manpower Requirements

| Role | Quantity | Estimated Time |
|------|----------|----------------|
| System Administrator | 1 | 1.5–2.5 hours |

---

## 6. Prerequisites (JSIG MA-2)

- [ ] ISSM written authorization on file
- [ ] Current DAT package downloaded on isolated workstation and hash-verified
- [ ] Authorized transfer media available and logged out
- [ ] Inbound scan station operational
- [ ] Current managed host inventory available

---

## 7. Procedure Steps

### Phase 1 — DAT Download and Transfer

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 1 | On isolated workstation: navigate to Trellix DAT download portal | https://www.trellix.com/downloads/ → Extra.DAT / V3 DAT | Current DAT package identified |
| 2 | Download current DAT package | Download ZIP / EXE package | Download completes; record DAT version and release date |
| 3 | Verify file hash | `Get-FileHash <DAT-package> -Algorithm SHA256` → compare to Trellix-published hash | Hash matches — proceed. Mismatch = do not use, notify ISSM |
| 4 | Copy to transfer media | Log media out: date, time, contents, your name | Copy complete |
| 5 | Carry to SAPF inbound scan station | Physical transfer | |
| 6 | Scan media on inbound scan station | Full AV scan | Zero detections — proceed. Any detection = quarantine, notify ISSM |
| 7 | Copy DAT package from scan station to ePO server staging | `\\[epo-server]\staging\DAT\` | Copy complete |

### Phase 2 — ePO DAT Import and Distribution

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 8 | Log in to Trellix ePO console | Browser → `https://[epo-server]:8443/core/orion/` → Admin credentials | ePO dashboard loads |
| 9 | Import DAT package to ePO master repository | ePO → Software → Master Repository → Actions → Check In Package → Browse to DAT package | Package checked in; version number visible in repository |
| 10 | Replicate package to distributed repositories (if applicable) | Repository Replication → Replicate Now | Replication completes |
| 11 | Deploy DAT update to all managed hosts | Client Tasks → New Task → Product Update → DAT → All Systems | Deployment task created and launched |
| 12 | Monitor DAT deployment progress | ePO → Reports → Product Deployment Status | All hosts: task status `Completed` |

### Phase 3 — Host Audit (System Tree)

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 13 | Review System Tree — verify all managed hosts present | ePO → Systems → System Tree → All Systems | All expected hosts listed; compare against inventory |
| 14 | Identify any host absent from System Tree | Cross-reference System Tree vs. managed host inventory | Missing host = AC-6(1) check — document and notify ISSM if not explained |
| 15 | Identify any host with `Last Communication` > 24 hours | System Tree → Sort by Last Communication | Any host > 24h = document — potential AC-6(1) concern |
| 16 | Verify all hosts show current DAT version | System Tree → Columns: DAT Version | All hosts match the newly imported DAT version |
| 17 | Any host with outdated DAT | Document: hostname, DAT version, last communication | Investigate — missing agent? Network issue? Offline? |

### Phase 4 — Scan Compliance

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 18 | Check Full Scan compliance — all hosts within last 7 days | ePO → Queries → Full Scan Compliance (or custom query: `Last Full Scan Date > -7d`) | All hosts: full scan within last 7 days |
| 19 | Any host with no full scan in last 7 days | Document in Section 8 — Scan Compliance | Finding documented; investigate and schedule scan |
| 20 | Review Quick Scan history — last 7 days | ePO → Reports → Scan History → Filter: Quick Scan, last 7 days | Daily quick scans ran on all hosts every day this week |
| 21 | Any host missing a daily quick scan | Document in Section 8 | Finding — investigate cause |
| 22 | Schedule/verify automated scan tasks are active | ePO → Client Tasks → [Quick Scan Task] → Verify schedule | Scheduled task enabled and running daily |

### Phase 5 — Threat Events Review

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 23 | Review Threat Events from the past 7 days | ePO → Threat Event Log → Filter: Last 7 days | All events reviewed |
| 24 | Triage each event: auto-quarantined vs. active threat | Threat Event → Event Type | Auto-quarantined items: note and document. Any active/unresolved threat = notify ISSM immediately |
| 25 | Review quarantine queue — disposition all items | ePO → Quarantine Manager | All quarantined items reviewed; release or delete as appropriate with ISSM direction |
| 26 | Any threat event on a server or privileged user host | Flag immediately — do not defer | Notify ISSM — potential incident indicator |
| 27 | Document threat event summary (Section 8) | | Count by type, hosts affected, disposition |

### Phase 6 — Module Status Verification

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 28 | Check ATP (Advanced Threat Protection) module status — all hosts | ePO → Reports → Endpoint Security → ATP Module Status → All Systems | All hosts: ATP module `Installed` and `Enabled` |
| 29 | Any host missing ATP module | Document: hostname, current install status | AC-6(1) concern — document and notify ISSM |
| 30 | Check WebControl (WC) module status — all hosts | ePO → Reports → WebControl Module Status → All Systems | All hosts: WC module `Installed` per policy (if WC is deployed in environment) |
| 31 | Check DLP (Data Loss Prevention) module status — all hosts | ePO → Reports → DLP Module Status → All Systems | All hosts: DLP status per current deployment policy — document any not installed |
| 32 | Check Endpoint Security engine version — all hosts | ePO → System Tree → Columns: ENS Engine Version | All hosts running current authorized engine version; any outdated = document |
| 33 | Any engine/software version outdated | Document: hostname, current version, current authorized version | Schedule update via ePO deployment task |

---

## 8. Weekly Status Tables

### DAT Update Status

| DAT Version (New) | DAT Release Date | Import Date | Hosts Updated | Hosts Outstanding |
|------------------|-----------------|------------|--------------|------------------|
| | | | | |

### Scan Compliance Summary

| # | Hostname | Last Full Scan | Full Scan ≤7d? | Daily Quick Scans (7d) | Compliant? | Notes |
|---|----------|---------------|----------------|----------------------|-----------|-------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

### Threat Event Summary

| Event Date | Hostname | Threat Name | Event Type | Disposition | Escalated? |
|-----------|---------|------------|-----------|------------|-----------|
| | | | | | |

### Module Status Summary (All Hosts)

| # | Hostname | ATP Module | WC Module | DLP Module | Engine Version | Compliant? |
|---|---------|-----------|----------|-----------|---------------|-----------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

*Module Status: INSTALLED / NOT INSTALLED / DISABLED / N/A*

---

## 9. Non-Compliance / Findings Log

| # | Hostname | Finding | AC-6(1)? | ISSM Notified | Time | Directed Action | Resolved |
|---|----------|---------|----------|---------------|------|----------------|---------|
| 1 | | | | | | | |
| 2 | | | | | | | |

---

## 10. Findings Summary

- [ ] All hosts have current DAT — no definition gap
- [ ] All hosts present in System Tree — no missing agents
- [ ] Full scan compliance: all hosts within 7 days
- [ ] Daily quick scans: all hosts compliant
- [ ] No active/unresolved threat events
- [ ] ATP, WC, DLP modules installed per policy on all hosts
- [ ] One or more AC-6(1) findings identified — ISSM notified immediately

---

## 11. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-0301-WK | Rev 1.0 | Category 03 — Antivirus / EDR | ⚠️ NON-TAILORABLE AC-6(1)*
*Classification: [CLASSIFICATION]*
