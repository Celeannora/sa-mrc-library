# Category 03 — Antivirus / Endpoint Detection & Response (EDR)

## ⚠️ NON-TAILORABLE CONTROL — AC-6(1)
**Per JSIG:** System endpoint protection SHALL NOT be tailored out of any SAP system baseline. Any lapse in endpoint protection is a non-tailorable control failure requiring immediate ISSM notification. Waiver requires Component SAP Senior Authorizing Official approval.

## Applicable JSIG / NIST SP 800-53 Controls

| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| **AC-6(1)** | **Least Privilege — Authorize Access to Security Functions** | **NON-TAILORABLE — endpoint protection shall not be removed** |
| SI-3 | Malicious Code Protection | Required — deploy and configure at entry/exit points |
| SI-8 | Spam Protection | Required |
| CM-6 | Configuration Settings | Required — maintain EDR in approved configuration |
| MA-3 | Maintenance Tools | EDR tools must be on the approved tool list |

## MRCs in This Category

| MRC ID | Task Title | Periodicity |
|--------|-----------|-------------|
| MRC-0301-DA | Daily AV/EDR Definition and Agent Health Verification | Daily |
| MRC-0302-MO | Monthly EDR Policy Compliance and Full Scan Review | Monthly |

## JSIG-Specific Notes
- Any offline or unprotected endpoint is a **non-tailorable control failure** — must be reported to ISSM same-day.
- EDR configuration changes require CCB approval (CM-3) and ISSM authorization.
- EDR tool must appear on the MA-3 approved maintenance tools list.
- Quarantine items must be reviewed and disposition documented as a BoE artifact.
