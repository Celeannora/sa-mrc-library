---
mrc_id: MRC-1101-WK
title: Weekly NTP Synchronization Verification
category: Time Synchronization (NTP)
periodicity: WEEKLY
maintenance_type: PREVENTIVE / INSPECT
est_time: "00:20"
rin: WK-NTP-001
revision: Rev 1.0
---

## Procedure Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Run `w32tm /query /status` (Windows) or `ntpq -p` (Linux) on all managed hosts. | All hosts synchronized to authorized NTP source. |
| 2 | Verify stratum level is within acceptable range (Stratum 2 or 3 for clients). | Correct stratum. |
| 3 | Confirm clock offset is within ±[X] seconds of authoritative source. | Offset within threshold. |
| 4 | Identify any hosts not syncing or pointing to unauthorized NTP sources. | Zero unauthorized sources. |
| 5 | Force sync on any out-of-sync hosts. Confirm correction. | All hosts synchronized. |
| 6 | Sign and date MRC. | MRC complete. |

## Findings Summary
- Overall Result: [ ] Satisfactory  [ ] Unsatisfactory  [ ] N/A
