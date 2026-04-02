# Category 01 — Audit & Log Management

## JSIG Applicability
Audit and Accountability (AU) is a fully required JSIG control family. JSIG mandates that all SAP IS maintain complete, tamper-protected audit trails and that records are regularly reviewed, reported, and retained. Audit log integrity directly supports MA-2 (Controlled Maintenance) evidence requirements.

## Applicable JSIG / NIST SP 800-53 Controls

| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| AU-2 | Event Logging | Required — define auditable events |
| AU-3 | Content of Audit Records | Required — must capture who, what, when, where, outcome |
| AU-6 | Audit Review, Analysis, and Reporting | Required — periodic review and reporting to ISSM |
| AU-9 | Protection of Audit Information | Required — prevent unauthorized access/modification of logs |
| AU-11 | Audit Record Retention | Required — retain per org policy and JSIG |
| AU-12 | Audit Generation | Required — IS must generate required audit records |
| AU-14 | Session Audit | SAP environments — session-level audit may be required |
| SI-4 | System Monitoring | Required — continuous monitoring for SA activity |

## MRCs in This Category

| MRC ID | Task Title | Periodicity |
|--------|-----------|-------------|
| MRC-0101-DA | Daily Security Event and Audit Log Review | Daily |
| MRC-0102-MO | Monthly Audit Log Archival and Retention Verification | Monthly |

## JSIG-Specific Notes
- Audit log review findings must be documented and retained as **Body of Evidence (BoE)** per MA-2.
- SIEM forwarding health must be verified each daily cycle — loss of log forwarding is a reportable event.
- ISSO is responsible for collecting, reviewing, and documenting audit records per JSIG role definitions.
- Any anomaly identified must be ticketed and reported to ISSM. ISSM reports vulnerabilities to AO/DAO.
- Audit records must be protected from unauthorized access and modification (AU-9) — SA may not alter log files.
