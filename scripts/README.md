# Scripts

Node.js scripts for generating formatted `.docx` MRC cards and the ISSM proposal template.

## Prerequisites

```bash
npm install docx
```

## Scripts

### `generate-mrc.js`
Generates the MRC Template `.docx` with:
- A blank generic card (all fields as labeled placeholders)
- A filled example: Daily Security Event and Audit Log Review
- A filled example: Monthly OS and Application Patch Application

**Usage:**
```bash
node generate-mrc.js
# Output: MRC_Template.docx
```

**To create a custom card**, edit the `cardData` object at the bottom of the script:

```js
const myCard = buildMRC({
  mrcNum:          'MRC-XXXX-YY',
  revision:        'Rev 1.0',
  classification:  'UNCLASSIFIED',
  system:          'Your System Name',
  subsystem:       'Component / Service',
  periodicity:     'MONTHLY',
  maintenanceType: 'PREVENTIVE / INSPECT',
  rin:             'MO-XXXX-001',
  timeEst:         '01:00',
  taskTitle:       'Your Task Title Here',
  safetyHazards:   'N/A or describe hazards.',
  toolsAndEquipment: 'List tools and access needed.',
  referenceDocs:   'NIST SP 800-53 [control], STIG ID [V-XXXXXX]',
  manpowerReq:     '1x SA. ISSM notification required.',
  steps: [
    'Step 1 description. Expected result: [describe pass condition].',
    'Step 2 description...',
  ],
});
```

---

### `generate-issm-proposal.js`
Generates the full ISSM Scheduled Maintenance Proposal `.docx` with all periodicity sections.

**Usage:**
```bash
node generate-issm-proposal.js
# Output: ISSM_Scheduled_Maintenance_Proposal_Template.docx
```

---

## AI Generation Workflow

1. Copy a category stub from `categories/[nn]-[name]/MRC-XXXX-YY_stub.md`
2. Use the AI prompt:

   > "Using this MRC stub as a structure guide, generate a fully completed MRC for [task] on [system], periodicity [X]. Populate all fields including safety hazards, tools, NIST controls, STIG references, manpower, prerequisites, and detailed numbered steps with expected results."

3. Paste the AI output back into the stub file, or use it to populate the `cardData` object in `generate-mrc.js` and run the script to produce a formatted `.docx`.
