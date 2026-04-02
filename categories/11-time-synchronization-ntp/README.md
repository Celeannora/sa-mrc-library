# Category 11 — Time Synchronization (NTP)

## Description
NTP source verification across all hosts, stratum accuracy, and clock drift detection. Time integrity is foundational to audit log reliability and Kerberos authentication.

## Applicable NIST Controls
- AU-8 — Time Stamps
- SC-45 — System Time Synchronization (800-53 Rev. 5)

## MRCs in This Category

| MRC ID | Task Title | Periodicity |
|--------|-----------|-------------|
| MRC-1101-WK | Weekly NTP Synchronization Verification | Weekly |

## Notes
- Clock skew >5 minutes can break Kerberos authentication.
- All hosts must sync to the authorized authoritative time source only.
