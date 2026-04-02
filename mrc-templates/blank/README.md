# Blank MRC Template

`MRC_Template.docx` — the master blank card with all fields as labeled placeholders, plus two filled example cards.

## JSIG-Required Fields

All MRCs in a SAP environment must capture the following in addition to standard fields:

| Field | Description | JSIG Basis |
|-------|-------------|-----------|
| `mrc_id` | Unique identifier — format: `MRC-[NNNN]-[PERIODICITY CODE]` | MA-2 |
| `title` | Short, action-oriented task name | MA-2 |
| `category` | One of the 20 SA maintenance categories | MA-2 |
| `periodicity` | DAILY / WEEKLY / MONTHLY / QUARTERLY / SEMI-ANNUAL / ANNUAL | CA-7 |
| `maintenance_type` | PREVENTIVE / CORRECTIVE / INSPECT / UPDATE | MA-2 |
| `est_time` | Estimated completion time in HH:MM | MA-2, MA-6 |
| `rin` | Reference Identification Number (local tracking) | MA-2 |
| `revision` | Document version | PL-2 |
| `classification` | Full classification marking — must reflect SAPF level | DoDM 5205.07 |
| `jsig_controls` | Applicable JSIG/NIST SP 800-53 control IDs | CA-7, MA-2 |
| `non_tailorable` | Flags if this MRC covers a non-tailorable control (AC-6(1), SA-22, SC-28) | JSIG |
| `issm_auth_ref` | ISSM written authorization reference number/date | MA-2, MA-5 |
| `ccb_cr_number` | CCB Change Request number (if configuration-impacting) | CM-3 |
| `sapf_entry_approval` | PSO/GSSO written approval reference (if tools/media enter SAPF) | MA-3, MP-2 |
| `safety_hazards` | Safety precautions, warnings, or N/A | MA-2 |
| `tools_equipment` | All tools, software, consoles, or credentials required | MA-3 |
| `reference_docs` | JSIG controls, STIGs, SOPs, DoDM 5205.07 references | MA-1 |
| `manpower_req` | Minimum personnel, required clearance level and role | MA-5 |
| `prerequisites` | Conditions that must be true before starting | MA-2 |
| `steps[]` | Numbered action steps with expected results | MA-2 |
| `nonlocal_maintenance` | Y/N — if Y, ISSM approval and session logging required | MA-4 |

## Naming Convention

```
MRC-[CATEGORY NUMBER][SEQUENCE]-[PERIODICITY CODE]
```

| Periodicity | Code |
|-------------|------|
| Daily       | DA   |
| Weekly      | WK   |
| Monthly     | MO   |
| Quarterly   | QR   |
| Semi-Annual | SA   |
| Annual      | AN   |

**Examples:** `MRC-0101-DA`, `MRC-0201-MO`, `MRC-0503-QR`

## Non-Tailorable Control Flags

Mark the `non_tailorable` field on any MRC that covers the following:

| Control | Category | Flag Value |
|---------|----------|-----------|
| AC-6(1) — Endpoint Protection | 03 — Antivirus / EDR | `NON-TAILORABLE: AC-6(1)` |
| SA-22 — Unsupported Components | 17 — Supply Chain & Software Integrity | `NON-TAILORABLE: SA-22` |
| SC-28 — Data at Rest Encryption | 16 — Encryption Verification | `NON-TAILORABLE: SC-28` |

Findings of **non-compliance on a non-tailorable control** must be escalated to the ISSM immediately. Waiver authority belongs to the Component SAP Senior Authorizing Official only.
