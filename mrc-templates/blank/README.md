# Blank MRC Template

`MRC_Template.docx` — the master blank card with all fields as labeled placeholders, plus two filled example cards.

## Fields Reference

| Field | Description |
|-------|-------------|
| `mrc_id` | Unique identifier — format: `MRC-[NNNN]-[PERIODICITY CODE]` |
| `title` | Short, action-oriented task name |
| `category` | One of the 20 SA maintenance categories |
| `periodicity` | DAILY / WEEKLY / MONTHLY / QUARTERLY / SEMI-ANNUAL / ANNUAL |
| `maintenance_type` | PREVENTIVE / CORRECTIVE / INSPECT / UPDATE |
| `est_time` | Estimated completion time in HH:MM |
| `rin` | Reference Identification Number (local tracking) |
| `revision` | Document version (Rev 1.0, Rev 2.0, etc.) |
| `classification` | Full classification marking per environment |
| `safety_hazards` | Safety precautions or N/A |
| `tools_equipment` | Software, consoles, credentials needed |
| `reference_docs` | NIST controls, STIGs, SOPs |
| `manpower_req` | Min personnel, required skill level |
| `prerequisites` | Conditions that must be true before starting |
| `steps[]` | Array of numbered action steps with expected results |

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
