# Category 23 — File and Storage Services

File and Storage Services underpin how classified data is stored, organized, replicated, and managed across the environment. In a SAP environment, unauthorized access to file shares, uncontrolled quota growth, replication failures, or data deduplication errors can result in data unavailability, integrity violations, or inadvertent disclosure. Each role in this category has its own maintenance profile.

---

## Services in This Category

| Service | Role | Risk if Unhealthy |
|---------|------|-------------------|
| **File Server** | Hosts SMB/NFS file shares for users and systems | Unauthorized shares expose classified data; ACL drift grants unintended access |
| **Storage Services** | iSCSI Target, Storage Spaces, disk management | Storage failure causes data loss; misconfigured LUNs expose volumes to wrong hosts |
| **DFS Namespaces / DFS Replication** | Provides unified namespace and keeps file replicas synchronized across servers | Replication failures cause data divergence; namespace misconfig routes users to wrong targets |
| **File Server Resource Manager (FSRM)** | Enforces quotas, file screens, and storage reports | Quota bypass allows unbounded disk growth; disabled file screens permit prohibited file types |
| **Data Deduplication** | Reduces storage consumption by eliminating duplicate data blocks | Deduplication corruption causes data loss; disabled dedup increases storage risk on classified volumes |

---

## JSIG Applicability
All tasks require written ISSM authorization (MA-2) and are retained as Body of Evidence (BoE) artifacts for the ATO package and ConMon program.

## Applicable JSIG / NIST SP 800-53 Controls

| Control | Title | JSIG Requirement |
|---------|-------|-----------------|
| AC-3 | Access Enforcement | File share ACLs enforce least-privilege access to classified data |
| AC-6 | Least Privilege | Share permissions limited to authorized users; no Everyone or Authenticated Users |
| AU-9 | Protection of Audit Information | Audit logs stored on protected file shares; share ACLs enforced |
| CM-6 | Configuration Settings | File server, DFS, FSRM, dedup configurations maintained per baseline |
| CM-7 | Least Functionality | No unauthorized shares, namespaces, or storage targets |
| SC-28 | Protection of Information at Rest | Data on file shares must be on BitLocker-encrypted volumes |
| SI-12 | Information Management and Retention | FSRM quotas and file screens enforce data retention and type policies |
| CP-9 | System Backup | DFS Replication and Storage Services health affects backup integrity |

## JSIG-Specific Notes
- File share ACLs must reflect the principle of least privilege (AC-6). "Everyone" or "Authenticated Users" on a classified share is an immediate violation — report to ISSM.
- DFS Replication failures between SAP site locations must be escalated to ISSM/ISSO within the timeframe specified in the site SSP — data divergence could affect operations.
- FSRM file screens that block prohibited file types (e.g., `.mp3`, `.exe` from user profiles) are a CM-7 enforcement mechanism — verify they are active.
- Storage volumes hosting classified data must be BitLocker-encrypted per SC-28 (Non-Tailorable).

## MRCs in This Category

| MRC ID | Title | Periodicity |
|--------|-------|-------------|
| MRC-2301-WK | Weekly File Server Share and ACL Integrity Review | Weekly |
| MRC-2302-MO | Monthly Storage Services Health and LUN Integrity Audit | Monthly |
| MRC-2303-WK | Weekly DFS Namespace and Replication Health Verification | Weekly |
| MRC-2304-MO | Monthly FSRM Quota and File Screen Compliance Review | Monthly |
| MRC-2305-MO | Monthly Data Deduplication Health and Savings Verification | Monthly |

> See stub files in this directory. Use the AI prompt pattern in the root README to generate tool-specific `.docx` cards for any MRC in this category.
