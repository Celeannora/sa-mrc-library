---
mrc_id: MRC-0901-WK
title: Weekly Certificate Expiration Look-Ahead (30-Day)
category: Certificate & PKI Management
periodicity: WEEKLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:30"
rin: WK-PKI-001
revision: Rev 1.0
---

## Procedure Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Run certificate inventory script or check certificate management console. | All certificates enumerated. |
| 2 | Filter for certificates expiring within the next 30 days. Document in Finding column. | No certificates expiring within 30 days (or renewal initiated). |
| 3 | For each expiring certificate, initiate renewal process per PKI/CA procedures. | Renewal ticket opened. |
| 4 | Verify CA root and intermediate certificate chain is current and trusted. | Chain valid. |
| 5 | Confirm TLS certificates on public-facing services are valid and properly chained. | All services presenting valid certificates. |
| 6 | Sign and date MRC. | MRC complete. |

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
