# JSIG Compliance Reference
### DoD Joint Special Access Program (SAP) Implementation Guide
#### MRC Library Alignment Document

---

## 1. Overview

The **Joint SAP Implementation Guide (JSIG)** provides standardized cybersecurity and information assurance policy, procedures, and implementation guidance for all DoD SAP networks, systems, and components at all classification levels. It is a **technical overlay to NIST SP 800-53 Rev. 4/5 and CNSSI 1253**, used in combination with DoDM 5205.07 SAP Security Manual.

**Scope of applicability:**
- All SAP IS under the cognizant SAP Authorizing Official (AO)
- Service elements, contractor sites, and DoD organizations connected to SAP-managed networks
- All classification levels — Confidential through Top Secret/SAR
- All SAP IS are categorized as **National Security Systems (NSS)** under FISMA

---

## 2. Non-Tailorable Controls

These three controls **cannot be removed from any SAP system baseline**. Waivers require Component SAP Senior Authorizing Official approval (non-delegatable) and must be reported to DoD SAPCO and DoD SAP CIO within 30 days.

### AC-6(1) — Least Privilege | Authorize Access to Security Functions
**Requirement:** System endpoint protection (AV/EDR) shall not be tailored out.

**SA Maintenance Implication:**
- Endpoint protection must be installed, active, and verified on every SA check cycle.
- Any lapse in endpoint protection coverage is a **non-tailorable control failure** — must be reported to ISSM immediately.
- See: [Category 03 — Antivirus / EDR](categories/03-antivirus-edr/README.md)

---

### SA-22 — Unsupported System Components
**Requirement:** No end-of-life (EOL) or vendor-unsupported hardware, OS, or software is permitted on SAP systems.

**SA Maintenance Implication:**
- SA must track EOL dates for all components in the system inventory.
- Any newly identified unsupported component must be reported to ISSM within the same maintenance cycle.
- Disposition options: upgrade, replace, or obtain formal risk acceptance from AO.
- See: [Category 17 — Supply Chain & Software Integrity](categories/17-supply-chain-software-integrity/README.md)

---

### SC-28 — Protection of Information at Rest
**Requirement:** Data-at-rest encryption shall be implemented on all SAP systems.

**SA Maintenance Implication:**
- SA must verify encryption is active and correctly configured each review cycle (BitLocker, LUKS, or equivalent).
- Encryption key health and escrow must be confirmed.
- Any unencrypted volume or device is a **non-tailorable control failure** — immediate ISSM notification required.
- See: [Category 16 — Encryption Verification](categories/16-encryption-verification/README.md)

---

## 3. JSIG Control Family Summary

The following table maps each JSIG security control family to the MRC categories in this library.

| Family Code | Family Name | Primary MRC Categories |
|-------------|-------------|----------------------|
| AC | Access Control | 05, 07 |
| AU | Audit and Accountability | 01, 11 |
| CA | Security Assessment and Authorization | 15, 20 |
| CM | Configuration Management | 02, 08, 12, 17 |
| CP | Contingency Planning | 04, 18 |
| IA | Identification and Authentication | 05, 09, 10 |
| IR | Incident Response | 14 |
| MA | Maintenance | 01–20 (all MRCs are MA artifacts) |
| MP | Media Protection | 12 |
| PE | Physical and Environmental Protection | 13 |
| PL | Planning | 19, 20 |
| PM | Program Management | 15, 20 |
| RA | Risk Assessment | 02, 20 |
| SA | System and Services Acquisition | 17, 20 |
| SC | System and Communications Protection | 07, 09, 11, 16 |
| SI | System and Information Integrity | 02, 03, 06, 07, 08, 17 |
| SR | Supply Chain Risk Management | 17 |

---

## 4. MA (Maintenance) Control Family — JSIG Requirements

All MRCs in this library serve as evidence of MA control compliance. The JSIG requires:

### MA-1 — System Maintenance Policy and Procedures
Organization must establish, document, and disseminate a maintenance policy. This MRC library constitutes the **procedural implementation** of MA-1.

### MA-2 — Controlled Maintenance
- Maintenance must be **scheduled, performed, documented, and reviewed**.
- **Written ISSM authorization required before execution** of any maintenance activity.
- Records of all maintenance, repair, and replacement actions must be retained.
- SA must ensure the system is protected during and after maintenance.
- **MRC completion = MA-2 artifact.** Retain all signed MRCs.

### MA-3 — Maintenance Tools
- Only **approved maintenance tools** may be used.
- Tools must be reviewed annually as part of the CM Plan review.
- Tools brought into the SAPF for maintenance must be approved by the PSO.
- Document all tools used in the MRC "Tools / Equipment" field.

### MA-4 — Nonlocal Maintenance
- All nonlocal (remote) maintenance sessions require **ISSM approval**.
- Must be conducted via authenticated, encrypted sessions only.
- All nonlocal sessions must be **recorded in audit logs**.
- Terminate nonlocal sessions when maintenance is complete.

### MA-5 — Maintenance Personnel
- Only **cleared and authorized personnel** may perform maintenance without escort.
- Personnel without required clearance/access must be **escorted and supervised** by a cleared SA.
- ISSM must maintain a list of authorized maintenance personnel.

### MA-6 — Timely Maintenance
- Spare parts and support resources must be available to meet RTO/RPO objectives.
- Delays in critical maintenance must be reported to ISSM and documented.

---

## 5. JSIG-Specific Roles in Maintenance Context

### Authorizing Official (AO)
- Grants the Authority to Operate (ATO).
- Accepts residual risk for the system.
- Must be notified of any maintenance activity that materially changes the system's security posture or ATO conditions.

### Program Security Officer (PSO)
- **Approves all digital media** and media use during maintenance (USB, external drives, removable storage).
- Provides written approval for entry/removal of IS from the SAPF.
- Reviews and approves media sanitization procedures.

### GSSO / CSSO
- Coordinates on Incident Response Plan updates resulting from maintenance discoveries.
- Develops media sanitization and removal procedures for PSO/AO approval.

### Information System Security Manager (ISSM)
**Maintenance-specific responsibilities:**
- Provides written authorization for all scheduled maintenance.
- Is a **CCB voting member with veto authority** — no configuration-impacting maintenance proceeds without CCB approval.
- Manages the continuous monitoring plan; maintenance artifacts feed ConMon.
- Coordinates all IS changes with ISSO and AO.
- Ensures SAs are monitoring vulnerabilities and attacks between maintenance cycles.
- Enforces CM policies; reviews all change requests.
- Reports vulnerabilities to AO/DAO.
- Maintains cybersecurity documentation repository including all ATOs.

### Information System Security Officer (ISSO)
**Maintenance-specific responsibilities:**
- Assists ISSM in reviewing maintenance proposals.
- Ensures operations and maintenance are conducted per approved security policies.
- Collects, reviews, and documents audit records generated during maintenance.
- Reports maintenance-related incidents to ISSM.
- Conducts compliance reviews post-maintenance.
- Monitors system recovery processes after maintenance.

### System Administrator (SA)
**Maintenance-specific responsibilities:**
- Executes all MRC tasks within authorized windows.
- Submits maintenance proposals to ISSM before each cycle.
- Implements CM policies; submits Change Requests to CCB.
- Documents all findings; retains signed MRCs as BoE.
- Reports anomalies and incidents to ISSO/ISSM immediately.

---

## 6. JSIG Body of Evidence (BoE) — Maintenance Artifacts

Completed and signed MRCs constitute **Body of Evidence** for the ATO package and Continuous Monitoring program. The following table maps artifact types to JSIG requirements.

| Artifact | Frequency | JSIG / NIST Control | Retained By |
|----------|-----------|--------------------|-----------:|
| Signed MRC (all types) | Per periodicity | MA-2, CA-7 | SA → ISSM |
| Vulnerability Scan Report | Monthly | RA-5, CA-7 | SA → ISSM |
| SIEM Log Review Record | Daily / Monthly | AU-6, SI-4 | SA / ISSO |
| Patch Compliance Report | Monthly | SI-2 | SA → ISSM |
| Privileged Account Audit | Monthly / Quarterly | AC-2, AC-6 | SA / ISSO |
| Configuration Baseline Comparison | Monthly / Quarterly | CM-2, CM-6 | SA |
| Backup Restore Test Result | Monthly | CP-9, CP-10 | SA |
| Encryption Verification Record | Quarterly | SC-28 (non-tailorable) | SA → ISSM |
| Endpoint Protection Health Report | Daily | SI-3, AC-6(1) (non-tailorable) | SA |
| EOL/Unsupported Component Scan | Monthly | SA-22 (non-tailorable) | SA → ISSM |
| Nonlocal Maintenance Log | As occurred | MA-4 | SA / ISSM |
| Media Authorization Record | As occurred | MP-2, MP-7 | PSO / SA |
| POA&M Update | Monthly | CA-5, PM-4 | ISSO / SA |
| Security Assessment Report (SAR) | Annual | CA-2, CA-7 | ISSM / SCA |
| System Security Plan (SSP) | Annual / as changed | PL-2 | ISSM |

---

## 7. SAPF-Specific Maintenance Considerations

When performing maintenance within a **SAP Facility (SAPF)**:

1. **Entry/Removal of IS** — Requires written PSO/GSSO approval per DoDM 5205.07.
2. **Maintenance tools and media** entering the SAPF must be approved by the PSO.
3. **Visual inspections** of the SAPF are required during physical maintenance (Category 13 MRCs).
4. **Annual self-inspections** — GSSO/CSSO must conduct and document annual self-inspections of the SAPF (DoDM 5205.07).
5. **TEMPEST** — PSO issues specific TEMPEST requirements; SA must ensure maintenance activities do not compromise TEMPEST posture.

---

## 8. Incident and Spillage Reporting (Maintenance Context)

If a maintenance activity results in or reveals:
- Unauthorized access
- Data spillage
- Configuration change outside the approved scope
- Discovery of malware, unauthorized software, or EOL components

**Immediate actions required:**
1. Stop the maintenance activity.
2. Preserve the state (do not remediate until directed).
3. Notify ISSO immediately.
4. ISSO notifies ISSM; ISSM notifies PSO via secure communications.
5. GSSO/CSSO reports SAP information spillage incidents to the PSO.
6. Document all findings in the MRC and in the incident ticketing system.

---

## 9. Applicable References

| Document | URL / Source |
|----------|-------------|
| JSIG (April 2016, NIST SP 800-53 Rev. 4 based) | [DCSA](https://www.dcsa.mil/portals/91/documents/ctp/nao/JSIG_2016April11_Final_(53Rev4).pdf) |
| DoDM 5205.07 Vol. 1 (January 2025) | [WHS](https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodm/520507m1.PDF) |
| NIST SP 800-53 Rev. 5 | [NIST](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) |
| NIST SP 800-37 Rev. 2 — RMF | [NIST](https://csrc.nist.gov/publications/detail/sp/800-37/rev-2/final) |
| NIST SP 800-128 — Configuration Management | [NIST](https://csrc.nist.gov/publications/detail/sp/800-128/final) |
| CNSSI 1253 | [CNSS](https://www.cnss.gov/CNSS/issuances/Instructions.cfm) |
| DoDI 8510.01 — RMF for DoD IT | [DoD](https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodi/851001p.pdf) |
| DoD 8140.01 — Cyberspace Workforce | [DoD](https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodd/814001p.PDF) |
| SAP Templates (DCSA) | [DCSA](https://www.dcsa.mil/Industrial-Security/Special-Access-Programs-Templates/) |

---

*Document Version: 1.0 | April 2026*
*Classification: [CLASSIFICATION] — Fill in per environment*
