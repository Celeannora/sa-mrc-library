# TAILORING GUIDE
## SA MRC Library — Baseline Philosophy and Site Customization

**Version:** 1.0
**Applies to:** SA MRC Library v3.4.0 and later
**Audience:** System Administrators, ISSOs, ISSMs deploying this library at a new site

---

## 1. What This Library Is (and Is Not)

This library is a **generalized baseline** — a collection of platform-agnostic, best-practice Maintenance Requirement Cards designed to represent the full scope of recurring security and maintenance checks for a SAP (Special Access Program) information system. It is **not** site-specific. It does not assume any particular operating system, security tool suite, directory platform, SIEM, scanner, backup solution, or network topology.

The library is designed to be **tailored at deployment time** by the SA and ISSM to reflect the actual tools, platforms, and environment at the target site. This guide explains how to do that correctly.

---

## 2. The Baseline Philosophy

Every MRC stub in this library follows one core principle:

> **Describe what to check and what the expected result is. Do not prescribe how to do it in a specific product.**

This means:
- Procedure steps describe the action and expected outcome, not the exact GUI path or command syntax for a named product
- Tool references use `[SITE-DESIGNATED <FUNCTION> PLATFORM]` tokens rather than product names
- Log paths use `[SITE-DESIGNATED LOG PATH]` rather than OS-specific absolute paths
- Script extensions use `[SITE-SCRIPT-EXT]` rather than `.sh` or `.ps1`
- Platform-specific examples are included in parenthetical `e.g.,` clauses for illustrative purposes only

This ensures the library remains valid across sites using different tool stacks — a site using Tenable Nessus and one using Qualys VMDR can both use the same MRC-0204-MO baseline and tailor it independently.

---

## 3. Placeholder Token Reference

The following tokens appear throughout MRC stubs and must be replaced with site-specific values during tailoring:

| Token | Meaning | Example (do not use these — tailor to your site) |
|-------|---------|--------------------------------------------------|
| `[SITE-DESIGNATED SIEM PLATFORM]` | The SIEM or log aggregation tool deployed at this site | Splunk, Elastic SIEM, IBM QRadar, ArcSight |
| `[SITE-DESIGNATED AV/EDR PLATFORM]` | The endpoint protection management console | Trellix ePO, CrowdStrike Falcon, Defender for Endpoint |
| `[SITE-DESIGNATED PATCH MANAGEMENT PLATFORM]` | The patch management server and console | WSUS, SCCM/MECM, Ansible, ManageEngine |
| `[SITE-DESIGNATED SCANNER]` | The vulnerability scanner | Tenable Nessus, Qualys, Rapid7 InsightVM |
| `[SITE-DESIGNATED BACKUP PLATFORM]` | The backup and recovery solution | Veeam, Commvault, Dell NetWorker, Veritas |
| `[SITE-DESIGNATED DIRECTORY PLATFORM]` | The identity and directory service | Active Directory (AD DS), FreeIPA, OpenLDAP |
| `[SITE-DESIGNATED FILE SERVER PLATFORM]` | The file server operating system or NAS platform | Windows Server (SMB/NTFS), NetApp ONTAP, Linux (NFS/Samba) |
| `[SITE-DESIGNATED TOOL — e.g., SCC]` | The STIG/SCAP scanning tool | DISA SCC, Nessus SCAP, OpenSCAP |
| `[SITE-DESIGNATED FIREWALL PLATFORM]` | The boundary firewall or network ACL platform | Palo Alto, Cisco ASA, pfSense, Windows Firewall with Advanced Security |
| `[SITE-DESIGNATED LOG PATH]` | The site-specific log directory for MRC audit outputs | `/var/log/mrc/`, `C:\MRC\Logs\`, share path |
| `[SITE-DESIGNATED SCRIPT PATH]` | The path where MRC scripts are deployed on managed hosts | `/opt/mrc/scripts/`, `C:\MRC\Scripts\` |
| `[SITE-SCRIPT-EXT]` | The file extension for site-deployed scripts | `.sh` (Bash), `.ps1` (PowerShell), `.py` (Python) |
| `[SITE-DESIGNATED STAGING PATH]` | The staging path on the patch management server | UNC path, local path, or share location |
| `[SITE-DESIGNATED MANAGEMENT TOOL]` | The remote management CLI or tool | PowerShell remoting, SSH, RSAT, RDP |
| `[SITE-DESIGNATED MANAGEMENT METHOD]` | How the SA connects to manage a remote system | SSH, RDP, console access, management console |
| `[SITE-SPECIFIC NAV]` | Navigation path within a specific platform's console | Vendor-specific — consult platform documentation |
| `[ISSM-defined threshold]` | A value or limit set by the ISSM for this site | Audit log gap threshold, inactive account days, etc. |
| `[CLASSIFICATION]` | The classification marking for the document | UNCLASSIFIED//FOUO, SECRET, TOP SECRET, etc. |

---

## 4. How to Tailor This Library for a Specific Site

### Step 1 — Inventory Your Tool Stack
Before tailoring, compile the list of actual tools and platforms deployed at the target site:
- SIEM platform (product name, version, console URL or access method)
- AV/EDR platform (product name, console URL)
- Patch management platform (product name, server URL)
- Vulnerability scanner (product name, console URL)
- Backup platform (product name, console URL)
- Directory platform (product name, domain/realm)
- File server platform(s)
- STIG/SCAP tool
- Firewall platform(s)
- Log path conventions (where do MRC script outputs go on managed hosts?)
- Script runtime (Bash? PowerShell? Both?)

### Step 2 — Replace Tokens
For each MRC stub, perform a search-and-replace of each `[SITE-DESIGNATED ...]` token with the actual platform name and relevant details (console URLs, navigation paths, specific commands).

This should be done:
- Before generating `.docx` versions
- In the stub file itself (so the stub becomes the site-specific version)
- Under change control — the tailored version should be treated as a new version of the stub and maintained in a site-specific fork or branch of this library

### Step 3 — Update Navigation Paths in Procedure Steps
Where procedure steps contain `[SITE-SPECIFIC NAV: ...]` placeholders, replace these with the actual navigation path for the tool deployed at the site. Reference the vendor documentation for each platform.

### Step 4 — Set ISSM-Defined Thresholds
Several MRCs reference `[ISSM-defined threshold]` values — for example, the maximum acceptable audit log gap before notification, or the account inactivity threshold. These must be set in coordination with the ISSM and documented in the SSP or a site-specific addendum.

### Step 5 — Validate Against the SSP
After tailoring, validate that the tailored MRC stubs are consistent with the System Security Plan (SSP) — particularly the tools, platforms, and authorized configurations described in the SSP. Any discrepancy between the MRC and the SSP should be resolved with the ISSM before the MRC is placed into production use.

### Step 6 — Version the Tailored Copy
Tailored copies of MRC stubs should be versioned (e.g., Rev 1.0 Tailored — [Site Name]) and tracked separately from this baseline. The baseline library remains unmodified and can be used as a reference for future updates.

---

## 5. What Is NOT Tailorable

Certain JSIG controls are explicitly non-tailorable — they apply regardless of the specific platform or site configuration. These are marked in individual MRC stubs with `non_tailorable: true` or with an explicit non-tailorable notation in the frontmatter. Current non-tailorable items include:

| Control | Requirement | Affected MRCs |
|---------|------------|---------------|
| AC-6(1) | Endpoint protection (AV/EDR) SHALL NOT be absent from any SAP system | MRC-0301-DA |
| SA-22 | Unsupported/EOL system components must be identified and reported | MRC-0103-SA, MRC-0802-MO |
| SC-28 | Classified data at rest must be encrypted on all storage media | MRC-2201-WK, MRC-1601-QR |

These requirements apply regardless of the tool stack. A site that uses a different AV/EDR product than the example in MRC-0301-DA still must ensure endpoint protection is deployed and verified daily — only the navigation paths change, not the requirement.

---

## 6. Extending This Library

This library is designed to grow. New MRC stubs can be added following the standard template structure. When adding new stubs:

1. Follow the naming convention: `MRC-CCNN-PP` where CC=category number (2 digits), NN=sequence number (2 digits), PP=periodicity code (DA/WK/MO/QR/SA/AN)
2. Use `[SITE-DESIGNATED ...]` tokens for all platform-specific references
3. Include the full frontmatter block (all fields shown in existing stubs)
4. Add the new MRC to `DOCUMENT_TRACKER.md`
5. Add a corresponding entry in `CHANGELOG.md`
6. Update `TECHNICAL_TASK_SCOPE.md` if the new MRC covers tasks already listed

---

## 7. Contact and Governance

Questions about this baseline, tailoring decisions that affect JSIG compliance, or requests to add new controls to the library should be coordinated with the ISSM. This library is a living document — new stubs, revised procedures, and updated JSIG interpretations will be reflected in future versions per the `CHANGELOG.md`.

---

*TAILORING_GUIDE.md | SA MRC Library v3.4.0*
*Classification: [CLASSIFICATION]*
