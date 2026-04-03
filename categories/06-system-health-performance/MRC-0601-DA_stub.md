---
mrc_id: MRC-0601-DA
title: "Daily System Health Check: Services, Resource Utilization, Uptime, Pending Reboots, and Physical Inspection"
category: "06 — System Health & Performance"
periodicity: Daily
est_time: "30–45 minutes"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "System health and monitoring console ([SITE-DESIGNATED MONITORING PLATFORM]), OOB management interface (iLO/iDRAC/BMC or equivalent), OS management console"
jsig_controls:
  - SI-2
  - CM-6
  - MA-2
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-0601-DA — Daily System Health Check

---

## 1. Background (New SA)

**What this MRC covers:**
A daily baseline check confirms every managed system is in an expected, healthy state at the start of each shift. This is the SA's first-line indicator of hardware failures, service crashes, configuration drift, and pending maintenance items.

**Four components:**

1. **Service Check** — Critical services on all managed hosts are running. Any stopped service that should be running is a finding requiring investigation before any other work.
2. **Utilization / Resource Check** — CPU, memory, disk, and network utilization reviewed against documented baselines. Unexplained spikes may indicate a problem — or a security event.
3. **Uptime / Pending Reboot Status** — Systems pending reboot from patches, updates, or configuration changes are identified. Prolonged pending-reboot states mean patches are not fully applied.
4. **Physical Cleaning and HDD Light Check** — Periodic physical inspection of the server hardware: dust accumulation in vents/intakes, and HDD activity/fault lights reviewed on all rack equipment.

---

## 2. Safety / Hazards

> ⚠️ **DO NOT RESTART SERVICES WITHOUT AUTHORIZATION:** If a critical security service (Splunk, AV agent, audit service) is stopped, document and notify ISSM before restarting. A stopped security service may be evidence of tampering.

> ⚠️ **PHYSICAL CLEANING:** Use only ESD-safe, approved equipment for cleaning. Ensure systems are not in a critical operation state before vacuuming near equipment. Compressed air use may require ISSM direction in SCIF/SAPF environments — confirm locally.

> ⚠️ **AUTHORIZED MAINTENANCE ONLY:** ISSM written authorization required (MA-2).

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| PowerShell (elevated) | `Get-Service`, `Get-Process`, `Get-Disk`, remoting |
| iLO / iDRAC console | OOB hardware health — RAID, temperature, fan, PSU |
| SCCM / Endpoint Manager | Pending restart status across managed hosts |
| `Get-SystemHealthReport.ps1` | Library script — `scripts/Get-SystemHealthReport.ps1` |
| ESD-safe vacuum / compressed air | Physical cleaning (as authorized) |
| Flashlight / visual inspection tool | Physical HDD light check |
| Managed host inventory | All hosts to be checked |
| MRC Sign-Off Block | SA signature |

---

## 4. Procedure Steps

### Phase 1 — Service Check

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 1 | Run system health script across all managed hosts | `.\Get-SystemHealthReport.ps1` | Per-host output: critical services status, uptime, disk, CPU, memory |
| 2 | Review critical service list — verify all running | `Get-Service -ComputerName [host] \| Where-Object {$_.Status -ne 'Running' -and $_.StartType -eq 'Automatic'}` | No automatic-start service in Stopped state |
| 3 | Any critical security service stopped (SplunkForwarder, McAfeeFramework, Windows Event Log, etc.) | Document immediately — notify ISSM before restarting | Finding logged; escalated per incident tier |
| 4 | Non-security service stopped without explanation | Document; restart if within authorization; investigate cause | Documented and resolved or escalated |

### Phase 2 — Utilization / Resource Check

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 5 | Review CPU utilization on all hosts | Script output or: `Get-WmiObject Win32_Processor \| Select LoadPercentage` | All hosts within baseline (typically < 80% sustained) |
| 6 | Review memory utilization | Script output or: `Get-WmiObject Win32_OperatingSystem \| Select FreePhysicalMemory, TotalVisibleMemorySize` | Free memory within acceptable range per host baseline |
| 7 | Review disk utilization — all volumes | Script output or: `Get-PSDrive -PSProvider FileSystem \| Select Name, Used, Free` | No volume at or above 90% capacity |
| 8 | Any disk at or above 85%: document and notify ISSO | | Finding logged; ISSM/ISSO direction needed |
| 9 | Review network utilization (if monitoring available) | Network monitoring dashboard | No unexplained high-bandwidth utilization |
| 10 | Review OOB (iLO/iDRAC) — hardware health | iLO/iDRAC web console → Health Summary | No hardware faults: RAID, temperature, fan, PSU all green |

### Phase 3 — Uptime and Pending Reboot Status

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 11 | Check system uptime — all hosts | `(Get-Date) - (gcim Win32_OperatingSystem).LastBootUpTime` or SCCM report | Note any unusually low uptime (unexpected reboot) |
| 12 | Unexpected reboot on any server: investigate cause | Event Viewer → System → Event 1074 (user-initiated) / 41 (unexpected shutdown) | Cause identified and documented; notify ISSM if unexplained |
| 13 | Check pending reboot status — all hosts | SCCM → Computers → Filter: Pending Restart or: `Test-Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\WindowsUpdate\Auto Update\RebootRequired"` | No hosts pending reboot beyond authorized post-patch window |
| 14 | Any host pending reboot > [ISSM threshold] days post-patch | Document; schedule reboot per next authorized maintenance window | Finding documented |

### Phase 4 — Physical Inspection (Server Room / Rack)

| Step | Action | Expected Result |
|------|--------|----------------|
| 15 | Walk server room — inspect all rack equipment front and rear | No fault indicator lights (amber/red) on any device |
| 16 | Check HDD activity and fault lights on all servers | Green activity = normal. Amber/red fault light = document immediately; notify ISSM and check RAID status via iLO/iDRAC |
| 17 | Inspect all rack equipment vents and intakes for dust accumulation | Vents clear; no visible dust buildup blocking airflow |
| 18 | If dust accumulation is significant: document and schedule cleaning (requires ISSM authorization and maintenance window) | Cleaning scheduled; not performed ad hoc without authorization |
| 19 | Verify cable management — no cables displaced or loose connectors | All cable runs secure; no dangling or displaced connectors |
| 20 | Check server room temperature and humidity indicators (if separate from automated monitoring) | Within acceptable environmental range |

---

## 8. Daily System Health Table

| # | Hostname | Services OK? | CPU (%) | Mem Free (%) | Disk (%) | OOB Health | Uptime | Pending Reboot? | HDD Lights | Result |
|---|---------|-------------|--------|-------------|---------|-----------|--------|----------------|-----------|--------|
| 1 | | | | | | | | | | |
| 2 | | | | | | | | | | |
| 3 | | | | | | | | | | |
| 4 | | | | | | | | | | |

*Result: OK / FINDING / INVESTIGATE*

---

## 9. Non-Compliance / Findings Log

| # | Hostname | Finding | Severity | ISSM/ISSO Notified | Time | Action Taken | Resolved |
|---|---------|---------|---------|-------------------|------|-------------|---------|
| 1 | | | | | | | |
| 2 | | | | | | | |

---

## 10. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-0601-DA | Rev 1.0 | Category 06 — System Health & Performance*
*Classification: [CLASSIFICATION]*
