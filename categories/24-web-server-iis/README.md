# Category 24 — Web Server (IIS)

Internet Information Services (IIS) is the Windows Server web hosting platform. In a SAP environment, IIS may host internal web applications, administrative consoles (Trellix ePO, WSUS, SCCM, AD FS, AD CS CDP, IPAM, and others), SharePoint sites, or custom SA tooling. IIS is a high-value attack surface — a misconfigured web server can expose authentication interfaces, reveal system information through error messages, or allow unauthenticated access to restricted pages. Maintenance of IIS focuses on four functional areas that map to IIS's role service groupings.

---

## Services / Role Groups in This Category

| Role Group | Coverage | Risk if Unmaintained |
|-----------|----------|----------------------|
| **Web Server** | Core IIS engine: sites, application pools, bindings, service health | Site outage; unauthorized sites hosting malicious content; app pools running as over-privileged accounts |
| **HTTP Features** | Static content, default document, directory browsing, HTTP errors, WebDAV | Directory browsing leaks file structure; WebDAV enables unauthorized file uploads; HTTP redirect misconfiguration |
| **Security** | Request filtering, authentication (Windows Auth, Basic, Digest, Anonymous), IP restriction, URL Auth, client certificate mapping | Anonymous auth on restricted pages; Basic Auth over plain HTTP transmits credentials in cleartext; missing request filtering allows oversized or malformed requests |
| **Performance** | Static/dynamic compression, output caching, bandwidth throttling | Unchecked compression of classified responses may create CRIME/BREACH-type side-channels; caching of sensitive responses exposes data to unauthorized readers |

---

## JSIG Applicability
All tasks require written ISSM authorization (MA-2) and are retained as Body of Evidence (BoE) artifacts for the ATO package and ConMon program.

## Applicable JSIG / NIST SP 800-53 Controls

| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| AC-2 | Account Management | Application pool service accounts must follow least-privilege |
| AC-3 | Access Enforcement | Restricted pages require Windows Authentication; no anonymous access to sensitive resources |
| AC-17 | Remote Access | IIS-hosted admin consoles accessible only from authorized management workstations |
| CM-6 | Configuration Settings | IIS configuration maintained per DISA STIG baseline |
| CM-7 | Least Functionality | No unused IIS features, modules, handlers, or sites enabled |
| SC-8 | Transmission Confidentiality | All IIS sites must enforce TLS (HTTPS); plaintext HTTP must be redirected or blocked |
| SC-8(1) | Cryptographic Protection | TLS 1.2+ required; TLS 1.0/1.1 and SSL 2.0/3.0 must be disabled |
| SI-2 | Flaw Remediation | IIS patches applied per patch cycle |
| AU-9 | Protection of Audit Information | IIS access/error logs stored on protected volumes; log rotation configured |
| AU-12 | Audit Record Generation | IIS W3C logging enabled with required fields for all sites |

## JSIG-Specific Notes
- Anonymous authentication enabled on any IIS site hosting an admin console or application that handles classified data is an AC-3 violation — report to ISSM immediately.
- Directory browsing must be disabled on all sites. An enabled directory listing on a classified application server reveals file structure.
- TLS configuration is critical: SC-8(1) requires TLS 1.2 at minimum. Any SSL/TLS version below 1.2 must be disabled.
- WebDAV must be disabled unless explicitly authorized via CCB and ISSM. It allows remote file writes via HTTP.
- Application pools must not run as `LocalSystem`, `NetworkService`, or any domain admin account without CCB/ISSM authorization.

## MRCs in This Category

| MRC ID | Title | Periodicity |
|--------|-------|-------------|
| MRC-2401-WK | Weekly IIS Web Server Service Health and Site Inventory Review | Weekly |
| MRC-2402-MO | Monthly IIS HTTP Features Configuration and Directory Hardening Audit | Monthly |
| MRC-2403-WK | Weekly IIS Security Configuration and Authentication Audit | Weekly |
| MRC-2404-MO | Monthly IIS Performance Settings and Logging Compliance Review | Monthly |

> See stub files in this directory. Use the AI prompt pattern in the root README to generate tool-specific `.docx` cards for any MRC in this category.
