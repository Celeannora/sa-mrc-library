---
mrc_id: MRC-1603-MO
title: "Monthly BitLocker AD Query/Export and Asset Inventory Verification"
category: "16 — Encryption Verification"
periodicity: Monthly
est_time: "1–2 hours"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Disk encryption management utility ([SITE-DESIGNATED ENCRYPTION TOOL]), key escrow export script or tool, asset inventory (digital and physical walk)"
jsig_controls:
  - SC-28
  - CM-8
  - PE-17
non_tailorable: true
non_tailorable_control: "SC-28 — Encryption at rest SHALL be implemented on all SAP system volumes"
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-1603-MO — Monthly BitLocker AD Query/Export and Asset Inventory Verification

## ⚠️ NON-TAILORABLE CONTROL — SC-28

---

## 1. Background (New SA)

**What this MRC does:**
The quarterly MRC-1601-QR verifies BitLocker status interactively. This monthly task does two things:
1. **Automated AD query + export:** A PowerShell script queries Active Directory for all computer objects, retrieves their BitLocker recovery key metadata, and exports a CSV showing which hosts have key escrow and which don't. This is the fastest way to spot a host that has lost encryption or lost key escrow.
2. **Asset inventory verification:** The digital asset inventory (CMDB) is compared against a physical walk of the server room and workstation areas. Every physical device must have a digital record and vice versa. Unaccounted physical devices or inventory records with no matching device are findings.

---

## 2. Safety / Hazards

> ⚠️ **NON-TAILORABLE SC-28:** Any host in the export showing no BitLocker key escrow OR confirmed unencrypted is an immediate ISSM notification. Do not remediate without ISSM direction.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| `Invoke-BitLockerADExport.ps1` | Library script — `scripts/Invoke-BitLockerADExport.ps1` |
| Domain Admin credentials | AD query access |
| Physical asset tag list | Current CMDB export |
| Barcode scanner or manual checklist | Physical inventory walk |

---

## 4. Procedure Steps

### Phase 1 — BitLocker AD Query and Export

| Step | Action | Command | Expected Result |
|------|--------|---------|-----------------|
| 1 | Run BitLocker AD export script | `.\Invoke-BitLockerADExport.ps1 -ExportPath "C:\Reports\BitLocker-$(Get-Date -f yyyyMMdd).csv"` | CSV generated: Hostname, OS, BitLocker GUID, Key Protector Type, Recovery Key Present, Key Date |
| 2 | Review export — identify any host with no recovery key in AD | Filter: RecoveryKeyPresent = FALSE | Any missing key = document; notify ISSM — potential SC-28 concern |
| 3 | Cross-reference export against managed host inventory | Compare CSV hostname list to inventory | Any host in inventory not appearing in export = investigate — offline, unencrypted, or not domain-joined |
| 4 | Any host confirmed unencrypted | STOP — notify ISSM immediately. SC-28 non-tailorable control failure | |
| 5 | File CSV export | Designated filing location | Archived with this MRC |

### Phase 2 — Asset Inventory Verification

| Step | Action | Detail | Expected Result |
|------|--------|--------|-----------------|
| 6 | Export current digital asset inventory (CMDB) | SCCM → Asset Intelligence → Hardware Inventory export | Current digital inventory list |
| 7 | Physical walk — server room | Walk every rack. For each device: verify asset tag, make/model, host label match the CMDB entry | Every physical device matches a CMDB record |
| 8 | Physical walk — workstation areas | Check each workstation asset tag against CMDB | Every workstation matches CMDB |
| 9 | Any physical device with no CMDB record | Document: location, asset tag, device description | Unauthorized or untracked device — notify ISSM |
| 10 | Any CMDB record with no physical device | Document: record details, last known location | Missing device — notify ISSM; potential theft/removal finding |
| 11 | Document all results in Asset Inventory Table (Section 8) | | All rows populated |
| 12 | Sign-Off block | Section 9 | Signatures obtained |

---

## 8. Asset Inventory Status Table

| # | Hostname / Asset Tag | Physical Location | CMDB Record? | Physical Device Found? | BitLocker Key in AD? | Result |
|---|---------------------|------------------|-------------|----------------------|---------------------|--------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

*Result: VERIFIED / DISCREPANCY / MISSING / FINDING*

---

## 9. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-1603-MO | Rev 1.0 | Category 16 — Encryption Verification | ⚠️ NON-TAILORABLE SC-28*
*Classification: [CLASSIFICATION]*
