---
mrc_id: MRC-0901-WK
title: "Weekly Local Certificate Store Expiration Check"
category: "09 — Certificate & PKI Management"
periodicity: Weekly
est_time: "30–60 minutes"
rin: ""
revision: "Rev 1.0"
classification: "[CLASSIFICATION]"
tool: "Certificate management console or CLI ([SITE-DESIGNATED PKI/CERT TOOL]), OS certificate store viewer, web server management console (if applicable)"
jsig_controls:
  - SC-17
  - IA-3
  - SC-8
non_tailorable: false
issm_auth_ref: ""
ccb_cr_number: ""
sapf_entry_approval: ""
nonlocal_maintenance: false
docx_status: NOT STARTED
---

# MRC-0901-WK — Weekly Local Certificate Store Expiration Check

---

## 1. Background (New SA)

**Why certificates matter:**
Digital certificates provide the cryptographic identity for servers, services, domain controllers, and users. An expired certificate can break:
- LDAPS / Kerberos authentication (domain controller certificates)
- HTTPS connections (IIS, web services)
- SCEP / auto-enrollment (PKI)
- Remote Desktop (RDP over TLS)
- SCCM/Endpoint Manager communication
- Splunk SSL forwarding

In an air-gapped environment, certificate renewals cannot happen automatically if the CA is offline or enrollment is broken. The SA must monitor expiration dates proactively.

**What this MRC checks:**
The Local Machine certificate stores on all managed hosts — specifically the `Personal` (MY) store, `Intermediate Certification Authorities`, and `Trusted Root Certification Authorities` — for any certificates expiring within 30, 60, or 90 days.

**30-day threshold = immediate action required. No exceptions.**

---

## 2. Safety / Hazards

> ⚠️ **30-DAY EXPIRATION:** Any certificate expiring within 30 days must be escalated to ISSM immediately. Certificate expiration on a DC or key service can cause an environment-wide outage.

> ⚠️ **DO NOT DELETE CERTIFICATES WITHOUT AUTHORIZATION:** Never remove a certificate from the store without ISSM authorization. Deleting a root CA certificate can break trust for the entire environment.

---

## 3. Tools / Equipment / Access Required

| Item | Details |
|------|---------|
| PowerShell (elevated) | `Get-ChildItem Cert:\LocalMachine\My` and related paths |
| `Check-CertificateExpiry.ps1` | Library script — `scripts/Check-CertificateExpiry.ps1` |
| certlm.msc | Local machine certificate manager (GUI reference) |
| AD CS (Certificate Services) | For renewal requests |
| Managed host inventory | All hosts to be checked |
| MRC Sign-Off Block | SA and ISSM/ISSO signatures |

---

## 4. Procedure Steps

| Step | Action | Nav Path / Command | Expected Result |
|------|--------|--------------------|-----------------|
| 1 | Run certificate expiry script against all managed hosts | `.\Check-CertificateExpiry.ps1 -WarningDays 90` | Script outputs: all certs expiring within 90 days, sorted by expiry date |
| 2 | Review output — filter for certs expiring within 30 days | Script output → filter DaysUntilExpiry ≤ 30 | Any cert ≤ 30 days = immediate escalation to ISSM |
| 3 | Review certs expiring 31–60 days | Filter DaysUntilExpiry 31–60 | Document; initiate renewal process |
| 4 | Review certs expiring 61–90 days | Filter DaysUntilExpiry 61–90 | Document; add to calendar for next renewal cycle |
| 5 | For each cert within 30 days: identify the service/host it serves | Certificate Subject / Issued To field | Identify impact of expiration — what breaks? |
| 6 | Notify ISSM of any 30-day or less expiration | Secure communication | ISSM directs renewal timeline and authorizes CA action |
| 7 | For certs in 31–60 day window: submit renewal request to AD CS | Open MMC → certlm.msc → Personal → Right-click cert → All Tasks → Renew | Renewal request submitted; track to completion |
| 8 | Verify auto-enrollment is functioning (if configured) | Event Viewer → Application → Source: AutoEnrollment | No errors; successful enrollment events present |
| 9 | Verify root CA certificate expiration | `Get-ChildItem Cert:\LocalMachine\Root \| Where-Object { $_.NotAfter -lt (Get-Date).AddDays(365) }` | Root CA certificate not expiring within 1 year |
| 10 | Verify intermediate CA certificate expiration | `Get-ChildItem Cert:\LocalMachine\CA` | No intermediate CA certs expiring within 180 days without plan |
| 11 | Document all checked certs in Certificate Status Table (Section 8) | | All entries populated |
| 12 | Sign-Off block | Section 10 | Signatures obtained |

---

## 8. Certificate Status Table

| # | Hostname | Certificate Subject | Store | Issued By | Expiry Date | Days Remaining | Service Affected | Action Required |
|---|---------|--------------------|----|-----------|------------|----------------|----------------|----------------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |

*Action: OK / MONITOR (61–90d) / RENEW NOW (31–60d) / CRITICAL (≤30d — notify ISSM)*

---

## 9. Non-Compliance / Findings Log

| # | Hostname | Certificate | Expiry | Days Left | ISSM Notified | Time | Action Taken | Resolved |
|---|---------|------------|--------|----------|---------------|------|-------------|---------|
| 1 | | | | | | | | |

---

## 10. Sign-Off

| Role | Printed Name | Signature | Date | Time |
|------|-------------|-----------|------|------|
| System Administrator | | | | |
| ISSM / ISSO | | | | |

**ISSM Authorization Reference:** ___________________________
**MRC Filed / Retained Per:** AU-11 — ___________________________ (location)

---
*MRC-0901-WK | Rev 1.0 | Category 09 — Certificate & PKI Management*
*Classification: [CLASSIFICATION]*
