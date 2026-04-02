# Technical Task Scope
### System Administrator — Comprehensive Assignable Task Reference
#### DoD SAP / JSIG Environment

This document defines the complete scope of technical tasks assignable to System Administrators in a SAP environment. Tasks are organized by periodicity and designed to map directly to MRC cards in this library. Each task includes the owning JSIG/NIST control, estimated time, and required tool category.

> **Assignment Guidance:** Use this document to assign tasks to individual SAs by highlight or checklist. All tasks require an open, ISSM-authorized MRC before execution. Tasks marked ⚠️ touch a non-tailorable control and require immediate ISSM notification if findings indicate non-compliance.

---

## Daily Tasks

> Complete each operational day before or at the start of business unless otherwise noted. Total estimated daily burden: **~3.5–4.5 hours** depending on system scale.

### Security Monitoring

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| D-01 | Review SIEM event dashboard — triage all new alerts by severity | AU-6, SI-4 | 30 min | SIEM Console | MRC-0101-DA |
| D-02 | Review failed authentication events; apply escalation threshold check | AC-7, AU-6 | 10 min | SIEM / AD | MRC-0101-DA |
| D-03 | Review privilege escalation events; correlate to authorized activity | AC-6, AU-6 | 10 min | SIEM / PAM | MRC-0101-DA |
| D-04 | Review account management events (create/modify/delete/lock) | AC-2, AU-6 | 10 min | SIEM / AD | MRC-0101-DA |
| D-05 | Review and action IDS/IPS alert queue; escalate High/Critical to ISSO | SI-4, IR-6 | 15 min | IDS/IPS Console | MRC-0701-DA |
| D-06 | Confirm audit log service is active and forwarding to SIEM | AU-5, AU-9 | 5 min | SIEM / OS | MRC-0101-DA |
| D-07 | Verify audit log storage capacity within acceptable threshold | AU-4 | 5 min | SIEM Console | MRC-0101-DA |

### Endpoint & AV Protection ⚠️ NON-TAILORABLE: AC-6(1)

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| D-08 | ⚠️ Verify AV/EDR definitions are current on all managed endpoints | AC-6(1), SI-3 | 10 min | EDR Console | MRC-0301-DA |
| D-09 | ⚠️ Verify all EDR agents are online and reporting; document any offline | AC-6(1), SI-3 | 10 min | EDR Console | MRC-0301-DA |
| D-10 | Review EDR quarantine queue; disposition all new items | SI-3, IR-4 | 10 min | EDR Console | MRC-0301-DA |

### Backup Verification

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| D-11 | Verify all backup jobs completed successfully in last 24 hours | CP-9 | 10 min | Backup Console | MRC-0401-DA |
| D-12 | Verify replication jobs completed to offsite/alternate target | CP-9, CP-6 | 5 min | Backup Console | MRC-0401-DA |
| D-13 | Check backup storage capacity; flag if below threshold | CP-9 | 5 min | Backup Console | MRC-0401-DA |

### System Health

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| D-14 | Review system health dashboard — all host statuses | CA-7, SI-4 | 10 min | Monitoring Tool | MRC-0601-DA |
| D-15 | Review CPU, memory, disk, and network utilization against baselines | CA-7 | 10 min | Monitoring Tool | MRC-0601-DA |
| D-16 | Verify RAID/storage controller status via iLO/iDRAC or vendor tool | MA-6 | 5 min | OOB Management | MRC-0601-DA |
| D-17 | Verify all critical services are in running state | CA-7, SI-4 | 10 min | Monitoring Tool | MRC-0601-DA |
| D-18 | Check for OS/application error events in system event logs | AU-6 | 10 min | Event Viewer / Syslog | MRC-0101-DA |

### Directory & Identity

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| D-19 | Run `repadmin /replsummary` or equivalent; review AD replication health | IA-2, AU-9 | 10 min | AD Admin Tools | MRC-1001-DA |
| D-20 | Verify NETLOGON service is running on all domain controllers | IA-2 | 5 min | AD Admin Tools | MRC-1001-DA |
| D-21 | Verify DNS resolution is functional; run `nslookup` test against key records | SC-20 | 5 min | DNS Tools | MRC-1001-DA |
| D-22 | Verify SYSVOL / NETLOGON share replication health (DFS-R) | IA-2, CM-6 | 5 min | AD Admin Tools | MRC-1001-DA |

### Network & Boundary

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| D-23 | Review VPN connection logs for anomalous sources or off-hours access | AC-17, SI-4 | 10 min | VPN Console | MRC-0701-DA |
| D-24 | Confirm all IDS/IPS sensors are reporting; verify sensor health | SI-4 | 5 min | IDS/IPS Console | MRC-0701-DA |

### Physical & Facility *(at start of shift)*

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| D-25 | Review SAPF physical access log for previous 24 hours | PE-6, MA-5 | 10 min | Access Control Log | MRC-1301-DA |
| D-26 | Visually inspect server rack indicator lights; check for fault conditions | PE-6, MA-6 | 10 min | Physical Inspection | MRC-1301-DA |
| D-27 | Check UPS display — battery health, load, runtime | PE-11, MA-6 | 5 min | Physical Inspection | MRC-1301-DA |
| D-28 | Verify equipment seals / tamper-evident tape are intact | PE-3, MA-5 | 5 min | Physical Inspection | MRC-1301-DA |

### End-of-Day Wrap

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| D-29 | Complete and sign daily MRC log entries; file per retention policy | MA-2, AU-11 | 10 min | MRC Log | All Daily MRCs |
| D-30 | Notify ISSO of any open findings or anomalies identified during the day | IR-6, CA-7 | 5 min | Secure Comms | All Daily MRCs |

---

## Weekly Tasks

> Complete once per calendar week, typically during the standard authorized maintenance window. Total estimated weekly burden: **~4–6 hours**.

### Security & Vulnerability

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| W-01 | Review and archive event logs per retention policy; confirm AU-11 compliance | AU-11 | 30 min | SIEM / OS | MRC-0102-MO |
| W-02 | Review patch management console for pending patches; categorize by severity | SI-2 | 20 min | Patch Mgmt Console | MRC-0201-MO |
| W-03 | Review open vulnerability scanner findings; assess for new CAT I items | RA-5, SI-2 | 30 min | ACAS / Nessus | MRC-0202-MO |
| W-04 | Review failed logon attempts and lockout events for the week | AC-7, AU-6 | 15 min | SIEM / AD | MRC-0101-DA |

### Account Management

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| W-05 | Review user account activity for the week; flag dormant or anomalous accounts | AC-2, AU-6 | 20 min | AD / PAM | MRC-0501-WK |
| W-06 | Verify service account and scheduled task account activity | AC-2, AC-6 | 15 min | AD Admin Tools | MRC-0501-WK |
| W-07 | Review and reconcile any accounts created or terminated during the week | AC-2, IA-4 | 15 min | AD / HR Roster | MRC-0501-WK |

### Certificate & PKI

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| W-08 | Run certificate expiration look-ahead (30-day window) across all managed certs | IA-5, SC-17 | 20 min | Cert Mgmt Tool | MRC-0901-WK |
| W-09 | Verify TLS certificate validity on all public-facing and internal HTTPS services | SC-8 | 15 min | Cert Mgmt / Browser | MRC-0901-WK |
| W-10 | Initiate renewal for any certificate expiring within 30 days | IA-5, SC-17 | 15 min | PKI / CA Portal | MRC-0901-WK |

### Time Synchronization

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| W-11 | Verify NTP synchronization status on all managed hosts | AU-8, SC-45 | 15 min | w32tm / ntpq | MRC-1101-WK |
| W-12 | Confirm all hosts point to authorized NTP source only; check for rogue sources | AU-8, CM-6 | 10 min | w32tm / ntpq | MRC-1101-WK |
| W-13 | Force NTP sync on any out-of-sync hosts; confirm correction | AU-8 | 10 min | w32tm / ntpq | MRC-1101-WK |

### Backup Testing

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| W-14 | Test restoration of at least one file/folder from previous backup | CP-9, CP-10 | 20 min | Backup Console | MRC-0402-MO |

### Firewall & Network Baseline

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| W-15 | Verify firewall and ACL rules are consistent with approved baseline | SC-7, CM-2 | 20 min | Firewall Console | MRC-0702-QR |
| W-16 | Review network flow logs or NetFlow data for anomalous traffic patterns | SI-4, SC-7 | 15 min | SIEM / NetFlow | MRC-0701-DA |

### Configuration Health

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| W-17 | Verify approved software list (ASL) compliance — spot-check 5–10 systems | CM-7, CM-11 | 20 min | SCCM / Inventory Tool | MRC-0802-MO |
| W-18 | Review and action any pending Change Requests awaiting SA input | CM-3 | 15 min | CCB Ticketing System | Various |

### Admin & Documentation

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| W-19 | Complete and sign all weekly MRC log entries; file per retention policy | MA-2, AU-11 | 15 min | MRC Log | All Weekly MRCs |
| W-20 | Submit weekly summary to ISSO of completed tasks, findings, and open items | CA-7, IR-6 | 15 min | Secure Comms | All Weekly MRCs |

---

## Monthly Tasks

> Complete once per calendar month, typically during the extended authorized maintenance window. Coordinate timing with ISSM at least 5 business days in advance. Total estimated monthly burden: **~16–24 hours**.

### Patching *(requires CCB-approved CR and ISSM authorization — MA-2, CM-3)*

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| M-01 | Obtain CCB-approved Change Request for patch cycle; confirm ISSM authorization | CM-3, MA-2 | 1 hr | CCB Ticketing | MRC-0201-MO |
| M-02 | Verify backup and confirm integrity before patching begins | CP-9 | 30 min | Backup Console | MRC-0201-MO |
| M-03 | Apply approved OS patches to all in-scope systems | SI-2, CM-3 | 2 hr | Patch Mgmt Console | MRC-0201-MO |
| M-04 | Apply approved application and middleware patches | SI-2, CM-3 | 1 hr | Patch Mgmt Console | MRC-0201-MO |
| M-05 | Apply approved network appliance firmware updates (if scheduled) | SI-2, CM-3 | 1 hr | Vendor OOB Tools | MRC-0201-MO |
| M-06 | Verify post-patch SC-28 compliance (encryption at rest intact) ⚠️ | SC-28 (NT) | 20 min | BitLocker / LUKS | MRC-1601-QR |
| M-07 | Verify no EOL/unsupported components introduced by patching (SA-22) ⚠️ | SA-22 (NT) | 20 min | Inventory Tool | MRC-1701-MO |
| M-08 | Run post-patch vulnerability scan; compare to pre-patch baseline | RA-5 | 1 hr | ACAS / Nessus | MRC-0202-MO |
| M-09 | Update CMDB / asset inventory with new patch levels | CM-8 | 30 min | CMDB | MRC-0201-MO |

### Vulnerability Management

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| M-10 | Execute authenticated vulnerability scan against all in-scope systems | RA-5 | 2 hr | ACAS / Nessus | MRC-0202-MO |
| M-11 | Triage scan results: categorize findings by CAT I / II / III | RA-5, SI-2 | 1 hr | ACAS / Nessus | MRC-0202-MO |
| M-12 | Escalate any new CAT I findings to ISSM immediately | RA-5, IR-6 | 15 min | Secure Comms | MRC-0202-MO |
| M-13 | Update POA&M with all new findings and milestone dates | CA-5, PM-4 | 1 hr | eMASS / POA&M Tool | MRC-1501-MO |

### Account & Access Management

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| M-14 | Conduct privileged account recertification — validate need-to-know and least privilege | AC-2, AC-6 | 1 hr | AD / PAM | MRC-0502-MO |
| M-15 | Disable dormant accounts (>30 days inactive unless mission-justified) | AC-2, IA-4 | 30 min | AD Admin Tools | MRC-0502-MO |
| M-16 | Review and reconcile service account inventory against authorized list | AC-2, IA-5 | 30 min | AD Admin Tools | MRC-0502-MO |

### Configuration & STIG Compliance

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| M-17 | Run SCAP/STIG scan against all in-scope systems using current benchmarks | CM-6, CM-2 | 2 hr | SCC / STIG Viewer | MRC-0801-MO |
| M-18 | Compare scan results to previous month's baseline; document new drift | CM-2, CM-4 | 1 hr | SCC / Spreadsheet | MRC-0801-MO |
| M-19 | Reconcile software inventory against Approved Software List (ASL) | CM-7, CM-11 | 1 hr | SCCM / Inventory | MRC-0802-MO |
| M-20 | Update CMDB with any hardware/software changes from the month | CM-8 | 30 min | CMDB | MRC-0802-MO |

### Software Integrity & Supply Chain ⚠️ NON-TAILORABLE: SA-22

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| M-21 | ⚠️ Scan for EOL / unsupported software and hardware across all systems | SA-22 (NT) | 1 hr | Inventory / Vuln Scanner | MRC-1701-MO |
| M-22 | Verify software hashes/checksums for critical system files (SI-7) | SI-7 | 30 min | File Integrity Tool | MRC-1701-MO |
| M-23 | Review unauthorized software detections; remove and document | CM-7, CM-11 | 30 min | EDR / Inventory Tool | MRC-1701-MO |

### Certificate Review

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| M-24 | Run full certificate inventory — identify any newly expired or near-expiring certs | IA-5, SC-17 | 30 min | Cert Mgmt Tool | MRC-0901-WK |
| M-25 | Renew or escalate all certificates expiring within 60 days | IA-5, SC-17 | 30 min | PKI / CA Portal | MRC-0901-WK |

### Backup & Recovery

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| M-26 | Perform full backup restore test for at least one critical system | CP-9, CP-10 | 1 hr | Backup Console | MRC-0402-MO |
| M-27 | Review backup replication integrity to offsite/alternate storage | CP-6, CP-9 | 20 min | Backup Console | MRC-0402-MO |
| M-28 | Review backup storage capacity trend; project and plan for growth | CP-9 | 15 min | Backup Console | MRC-0402-MO |

### Removable Media

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| M-29 | Verify removable media policy enforcement is active on all endpoints | MP-7, CM-7 | 20 min | GPO / MDM Console | MRC-1201-MO |
| M-30 | Review device control logs for any removable media events; action anomalies | MP-7, AU-6 | 20 min | DLP / EDR Console | MRC-1201-MO |

### Directory Services

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| M-31 | Review DNS zone integrity — verify all records are authorized; purge stale entries | SC-20, CM-6 | 30 min | DNS Admin Tools | MRC-1002-MO |
| M-32 | Review DHCP scope utilization; identify and reclaim expired leases | CM-8 | 20 min | DHCP Console | MRC-1002-MO |

### ConMon & Reporting

| # | Task | JSIG Control | Est. Time | Tool Category | MRC |
|---|------|-------------|-----------|---------------|-----|
| M-33 | Compile all monthly ConMon artifacts per ISSM naming convention | CA-7, MA-2 | 1 hr | File System | MRC-1501-MO |
| M-34 | Submit ConMon package to ISSM by deadline; log submission date and method | CA-7 | 15 min | Secure Comms | MRC-1501-MO |
| M-35 | Update DOCUMENT_TRACKER.md with any new/changed MRC statuses | MA-2, PL-2 | 15 min | Repository | Tracker |
| M-36 | Add entry to CHANGELOG.md for all changes made during the month | PL-2, AU-11 | 15 min | Repository | Changelog |
| M-37 | Complete and sign all monthly MRC log entries; file per retention policy | MA-2, AU-11 | 30 min | MRC Log | All Monthly MRCs |

---

## Quick-Reference Assignment Table

> Print or copy this table to assign tasks to specific SAs by shift or rotation.

### Daily Assignment Sheet

| Task | Assigned To | Shift | Completion Time | MRC Signed |
|------|------------|-------|----------------|-----------|
| D-01 through D-07 (Security Monitoring) | | | | |
| D-08 through D-10 (EDR ⚠️) | | | | |
| D-11 through D-13 (Backup) | | | | |
| D-14 through D-18 (System Health) | | | | |
| D-19 through D-22 (Directory) | | | | |
| D-23 through D-24 (Network) | | | | |
| D-25 through D-28 (Physical) | | | | |
| D-29 through D-30 (Wrap) | | | | |

### Weekly Assignment Sheet

| Task | Assigned To | Week Of | Completion Date | MRC Signed |
|------|------------|---------|----------------|-----------|
| W-01 through W-04 (Security) | | | | |
| W-05 through W-07 (Accounts) | | | | |
| W-08 through W-10 (Certs) | | | | |
| W-11 through W-13 (NTP) | | | | |
| W-14 (Backup Test) | | | | |
| W-15 through W-16 (Network) | | | | |
| W-17 through W-18 (Config) | | | | |
| W-19 through W-20 (Admin) | | | | |

### Monthly Assignment Sheet

| Task Group | Assigned To | Target Date | Completion Date | MRC Signed |
|-----------|------------|-------------|----------------|-----------|
| M-01 through M-09 (Patching) | | | | |
| M-10 through M-13 (Vuln Mgmt) | | | | |
| M-14 through M-16 (Accounts) | | | | |
| M-17 through M-20 (Config/STIG) | | | | |
| M-21 through M-23 (Supply Chain ⚠️) | | | | |
| M-24 through M-25 (Certs) | | | | |
| M-26 through M-28 (Backup) | | | | |
| M-29 through M-30 (Media) | | | | |
| M-31 through M-32 (Directory) | | | | |
| M-33 through M-37 (ConMon / Admin) | | | | |

---

## Task Count Summary

| Periodicity | Task Count | Approx. Time Burden |
|-------------|-----------|---------------------|
| Daily | 30 tasks | ~3.5–4.5 hrs/day |
| Weekly | 20 tasks | ~4–6 hrs/week |
| Monthly | 37 tasks | ~16–24 hrs/month |
| **Total Recurring** | **87 tasks** | |

> Tasks not listed here (quarterly, semi-annual, annual) are defined in the applicable MRC stubs and the ISSM Scheduled Maintenance Proposal template.

---

## Notes

- All tasks must be authorized by the ISSM before execution (MA-2).
- Tasks marked ⚠️ cover non-tailorable controls — non-compliance requires **immediate ISSM notification**.
- `(NT)` in the control column denotes a JSIG non-tailorable control.
- Actual time estimates vary by environment size. Adjust based on number of managed systems.
- This document does not replace MRCs — it is an assignment and scope reference that maps to them.
- Keep this document current; update when new MRCs are added or task scope changes.

---

*Version: 1.0 | April 2026 | Classification: [CLASSIFICATION]*
