---
mrc_id: MRC-1101-WK
title: "Weekly NTP Synchronization Verification — Server Hierarchy and Domain Host Audit"
category: "11 — Time Synchronization (NTP)"
periodicity: Weekly
est_time: "30–45 minutes"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Time synchronization CLI or status utility ([SITE-DESIGNATED NTP CLIENT — e.g., w32tm, ntpq, chronyc]), OS event log or syslog, NTP audit script (if deployed)"
jsig_controls:
  - AU-8
  - SC-45
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1101-WK — Weekly NTP Synchronization Verification: Server Hierarchy and Domain Host Audit

---

## 1. Background (New SA)

**Why accurate time is a security control:**
Every audit log, Kerberos ticket, certificate, and digital signature in the environment depends on accurate, synchronized time. If a host's clock drifts more than 5 minutes from the domain time source, Kerberos authentication fails — the host falls off the domain. Worse, log timestamps become unreliable — forensic and compliance investigations are compromised.

**The air-gap NTP hierarchy:**
In an air-gapped environment there is no connection to public NTP servers (pool.ntp.org, time.windows.com). The environment must have an internal authoritative time source — typically a GPS-synchronized NTP appliance or the PDC Emulator FSMO role holder configured as the root time server for the domain.

**What this MRC checks:**
1. The authoritative internal NTP server is healthy and synchronized
2. All domain controllers are synchronized to the correct source
3. A domain-wide host audit script verifies every domain-joined host is within the acceptable offset

---

## 2. Safety / Hazards

> ⚠️ **5-MINUTE KERBEROS LIMIT:** Any host drifting more than 5 minutes from domain time will lose Kerberos authentication. This is a Tier 2 escalation to ISSO immediately.

> ⚠️ **DO NOT FORCE TIME ON PRODUCTION SYSTEMS:** Never use `w32tm /resync /force` on production servers during business hours without ISSM authorization — abrupt time changes can break running sessions and corrupt logs.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| `Invoke-NTPAudit.ps1` | Library script — `scripts/Invoke-NTPAudit.ps1` |
| `w32tm` | Built-in Windows time service tool |
| PowerShell remoting | Domain-wide host audit |
| Domain Admin credentials | Required for remote queries |

---

## 4. Procedure Steps

| Step | Action | Command | Expected Result |
|------|--------|---------|-----------------|
| 1 | Run domain NTP audit script | `.\Invoke-NTPAudit.ps1` | Per-host output: time source, offset, last sync time |
| 2 | Verify NTP authoritative server status | `w32tm /query /status` on NTP server | `Source:` shows authorized stratum source; `Offset` < 1 second |
| 3 | Verify PDC Emulator FSMO NTP config | `w32tm /query /configuration` on PDC | `Type: NTP`, `NTPServer` = internal authoritative source |
| 4 | Verify all DCs sync to PDC | `w32tm /monitor /domain:[domain FQDN]` | All DCs show offset < 5 seconds from PDC |
| 5 | Review script output — identify any host with offset > 2 minutes | Script output → filter Offset > 120 seconds | Any host > 2 min = document; investigate |
| 6 | Any host > 5 minutes offset | Escalate to ISSO immediately — Kerberos risk | Finding logged; ISSO notified |
| 7 | Any host showing `Local CMOS Clock` as time source (not syncing to domain) | Document; investigate — host may have lost domain connectivity | Finding logged |
| 8 | Document all host results in Section 8 | | All hosts and offsets recorded |
| 9 | Sign-Off block | Section 9 | Signatures obtained |

---

## 8. NTP Host Audit Table

| # | Hostname | Time Source | Offset (sec) | Last Sync | Within Limit? | Notes |
|---|---------|------------|-------------|----------|--------------|-------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

*Within Limit: YES / WARNING (2–5 min) / FAIL (>5 min — escalate)*

---

## 9. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1101-WK | Rev 1.0 | Category 11 — Time Synchronization (NTP)*
*Classification: [CLASSIFICATION]*
