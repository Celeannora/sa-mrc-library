# Category 24 — Web Server

A web server in a SAP environment may host internal web applications, administrative consoles, documentation sites, PKI enrollment pages, or custom SA tooling. Web servers are a high-value attack surface — a misconfigured web server can expose authentication interfaces, reveal system information through error messages, or allow unauthenticated access to restricted pages.

This category covers checks applicable to any web server platform deployed in the environment (e.g., IIS, Apache, nginx, or equivalent). Procedure steps and navigation paths in individual MRC stubs must be tailored to the [SITE-DESIGNATED WEB SERVER PLATFORM] at time of site deployment.

Maintenance of a web server in this context focuses on four functional areas:

---

## Functional Areas in This Category

| Area | Coverage | Risk if Unmaintained |
|------|----------|----------------------|
| **Service Health and Site Inventory** | Core web server engine: sites, application pools or worker processes, port bindings, service health | Site outage; unauthorized virtual sites hosting malicious content; worker processes running as over-privileged accounts |
| **HTTP Features and Directory Hardening** | Static content, default document, directory browsing, HTTP errors, WebDAV | Directory browsing leaks file structure; WebDAV enables unauthorized file uploads; HTTP redirect misconfiguration |
| **Security Configuration and Authentication** | Request filtering, authentication methods (Windows Auth, Basic, Digest, Anonymous), IP restriction, URL authorization, client certificate mapping | Anonymous auth on restricted pages; Basic Auth over plain HTTP transmits credentials in cleartext; missing request filtering allows oversized or malformed requests |
| **Performance Settings and Logging Compliance** | Static/dynamic compression, output caching, access logging fields and retention | Unchecked compression of classified responses may create side-channel risks; caching of sensitive responses exposes data to unauthorized readers; incomplete logs fail AU-12 |

---

## JSIG Applicability
All tasks require written ISSM authorization (MA-2) and are retained as Body of Evidence (BoE) artifacts for the ATO package and ConMon program.

## Applicable JSIG / NIST SP 800-53 Controls

| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| AC-2 | Account Management | Web application service accounts must follow least-privilege |
| AC-3 | Access Enforcement | Restricted pages require authentication; no anonymous access to sensitive resources |
| AC-17 | Remote Access | Web-server-hosted admin consoles accessible only from authorized management workstations |
| CM-6 | Configuration Settings | Web server configuration maintained per DISA STIG baseline for the deployed platform |
| CM-7 | Least Functionality | No unused web server features, modules, handlers, or virtual sites enabled |
| SC-8 | Transmission Confidentiality | All sites must enforce TLS (HTTPS); plaintext HTTP must be redirected or blocked |
| SC-8(1) | Cryptographic Protection | TLS 1.2+ required; TLS 1.0/1.1 and SSL 2.0/3.0 must be disabled |
| SI-2 | Flaw Remediation | Web server patches applied per patch cycle |
| AU-9 | Protection of Audit Information | Web server access/error logs stored on protected volumes; log rotation configured |
| AU-12 | Audit Record Generation | Web server logging enabled with required fields for all sites |

## JSIG-Specific Notes
- Anonymous authentication enabled on any site hosting an admin console or application that handles classified data is an AC-3 violation — report to ISSM immediately.
- Directory browsing must be disabled on all sites. An enabled directory listing on a classified application server reveals file structure.
- TLS configuration is critical: SC-8(1) requires TLS 1.2 at minimum. Any SSL/TLS version below 1.2 must be disabled.
- WebDAV (or equivalent remote write capability) must be disabled unless explicitly authorized via CCB and ISSM.
- Service accounts / application pool identities must not run as the highest-privilege system account without CCB/ISSM authorization.

## MRCs in This Category

| MRC ID | Title | Periodicity |
|--------|-------|-------------|
| MRC-2401-WK | Weekly Web Server Service Health and Site Inventory Review | Weekly |
| MRC-2402-MO | Monthly Web Server HTTP Features Configuration and Directory Hardening Audit | Monthly |
| MRC-2403-WK | Weekly Web Server Security Configuration and Authentication Audit | Weekly |
| MRC-2404-MO | Monthly Web Server Performance Settings and Logging Compliance Review | Monthly |

> See stub files in this directory. All platform-specific navigation paths, commands, and console references must be tailored to the [SITE-DESIGNATED WEB SERVER PLATFORM] per the TAILORING_GUIDE.md at the repository root.
