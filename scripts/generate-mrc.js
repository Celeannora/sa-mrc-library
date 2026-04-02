const fs = require('fs');
const docx = require('docx');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber,
  PageBreak, HeadingLevel,
} = docx;

// ── Palette ────────────────────────────────────────────────────────────────
const C = {
  header:     '1B474D',   // dark teal — title bar / table headers
  accent:     '01696F',   // mid teal — section labels
  accentLight:'E0F0F1',   // pale teal — alternating rows
  rowHead:    'D0E8EA',   // slightly deeper — left-column labels
  border:     '8FAAAC',
  white:      'FFFFFF',
  muted:      '5A6E70',
  warn:       '964219',
  black:      '28251D',
};

// ── Border presets ─────────────────────────────────────────────────────────
const thin      = { style: BorderStyle.SINGLE, size: 4, color: C.border };
const thick     = { style: BorderStyle.SINGLE, size: 12, color: C.header };
const allBorders= { top: thin, bottom: thin, left: thin, right: thin };
const topThick  = { top: thick, bottom: thin, left: thin, right: thin };

// Page geometry (US Letter, 0.6in margins → usable = 12240 − 864 − 864 = 10512)
const PAGE_W  = 12240;
const MARGIN  = 864;
const USABLE  = PAGE_W - MARGIN * 2;  // 10512

// ── Text helpers ───────────────────────────────────────────────────────────
const t = (text, opts = {}) =>
  new TextRun({ text, font: 'Calibri', size: 20, color: C.black, ...opts });

const label = (text, opts = {}) =>
  new TextRun({ text, font: 'Calibri', size: 18, bold: true,
    color: C.header, allCaps: true, ...opts });

const placeholder = (text) =>
  new TextRun({ text, font: 'Calibri', size: 20, color: C.muted, italics: true });

const mono = (text) =>
  new TextRun({ text, font: 'Courier New', size: 18, color: C.black });

function p(children, opts = {}) {
  return new Paragraph({
    children: Array.isArray(children) ? children : [children],
    spacing: { after: 0 },
    ...opts,
  });
}
function spacer(after = 80) {
  return new Paragraph({ children: [t('')], spacing: { after } });
}

// ── Cell factories ─────────────────────────────────────────────────────────
function hCell(text, width, span = 1) {
  return new TableCell({
    borders: allBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: C.header, type: ShadingType.CLEAR },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    columnSpan: span,
    verticalAlign: VerticalAlign.CENTER,
    children: [p(new TextRun({ text, font: 'Calibri', size: 18, bold: true,
      color: C.white, allCaps: true }))],
  });
}

function lCell(text, width, shade = C.rowHead) {
  return new TableCell({
    borders: allBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: shade, type: ShadingType.CLEAR },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    verticalAlign: VerticalAlign.CENTER,
    children: [p(new TextRun({ text, font: 'Calibri', size: 18, bold: true, color: C.header }))],
  });
}

function vCell(children, width, shade = C.white, rowSpan) {
  const cfg = {
    borders: allBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: shade, type: ShadingType.CLEAR },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    verticalAlign: VerticalAlign.TOP,
    children: Array.isArray(children) ? children : [p(children)],
  };
  if (rowSpan) cfg.rowSpan = rowSpan;
  return new TableCell(cfg);
}

function emptyCell(width, shade = C.white, height = 1) {
  // height lines of blank space
  return new TableCell({
    borders: allBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: shade, type: ShadingType.CLEAR },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: Array.from({ length: height }, () => p(t(''))),
  });
}

// ── Checkbox helper ────────────────────────────────────────────────────────
function checkRow(index, stepText, shade) {
  // col widths: step# | checkbox | step text | finding/note
  const W = [600, 500, 5012, 4400];
  return new TableRow({
    children: [
      new TableCell({
        borders: allBorders, width: { size: W[0], type: WidthType.DXA },
        shading: { fill: shade, type: ShadingType.CLEAR },
        margins: { top: 50, bottom: 50, left: 80, right: 80 },
        verticalAlign: VerticalAlign.CENTER,
        children: [p(new TextRun({ text: `${index}`, font: 'Calibri', size: 18,
          bold: true, color: C.muted }), { alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        borders: allBorders, width: { size: W[1], type: WidthType.DXA },
        shading: { fill: shade, type: ShadingType.CLEAR },
        margins: { top: 50, bottom: 50, left: 80, right: 80 },
        verticalAlign: VerticalAlign.CENTER,
        children: [p(new TextRun({ text: '\u25A1', font: 'Calibri', size: 22,
          color: C.accent }), { alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        borders: allBorders, width: { size: W[2], type: WidthType.DXA },
        shading: { fill: shade, type: ShadingType.CLEAR },
        margins: { top: 50, bottom: 50, left: 100, right: 100 },
        verticalAlign: VerticalAlign.CENTER,
        children: [p(t(stepText))],
      }),
      emptyCell(W[3], shade),
    ],
  });
}

// ══════════════════════════════════════════════════════════════════════════
// MRC CARD BUILDER
// Each call produces a full-page MRC card (array of block elements)
// cardData shape:
//   { mrcNum, revision, system, subsystem, periodicity, maintenanceType,
//     classification, rin, taskTitle, safetyHazards, toolsAndEquipment,
//     referenceDocs, manpowerReq, timeEst, steps[], notesLines }
// ══════════════════════════════════════════════════════════════════════════
function buildMRC(cardData) {
  const cd = cardData;
  const blocks = [];

  // ── BANNER ──────────────────────────────────────────────────────────────
  //  [CLASSIFICATION] centered full-width
  blocks.push(
    new Table({
      width: { size: USABLE, type: WidthType.DXA },
      columnWidths: [USABLE],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: { top: thick, bottom: thick, left: thick, right: thick },
              width: { size: USABLE, type: WidthType.DXA },
              shading: { fill: C.header, type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                p(new TextRun({
                  text: cd.classification || 'UNCLASSIFIED',
                  font: 'Calibri', size: 20, bold: true, color: C.white, allCaps: true,
                }), { alignment: AlignmentType.CENTER }),
              ],
            }),
          ],
        }),
      ],
    }),
  );
  blocks.push(spacer(30));

  // ── HEADER BLOCK: MRC identity row ──────────────────────────────────────
  //  | MAINTENANCE REQUIREMENT CARD   | MRC No.  | Rev  | Page |
  const hdrColW = [5200, 2300, 1500, 1512];
  blocks.push(
    new Table({
      width: { size: USABLE, type: WidthType.DXA },
      columnWidths: hdrColW,
      rows: [
        // Row 1: main title + field labels
        new TableRow({
          children: [
            new TableCell({
              borders: allBorders,
              width: { size: hdrColW[0], type: WidthType.DXA },
              shading: { fill: C.header, type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 140, right: 140 },
              rowSpan: 2,
              verticalAlign: VerticalAlign.CENTER,
              children: [
                p(new TextRun({ text: 'MAINTENANCE REQUIREMENT CARD', font: 'Calibri',
                  size: 28, bold: true, color: C.white, allCaps: true }),
                  { alignment: AlignmentType.CENTER }),
                p(new TextRun({ text: '(MRC)', font: 'Calibri', size: 20,
                  color: 'B8D8DA' }), { alignment: AlignmentType.CENTER }),
              ],
            }),
            hCell('MRC Number', hdrColW[1]),
            hCell('Revision', hdrColW[2]),
            hCell('Page', hdrColW[3]),
          ],
        }),
        // Row 2: field values
        new TableRow({
          children: [
            vCell(p(placeholder(cd.mrcNum || '[MRC-XXXX-XXX]')), hdrColW[1]),
            vCell(p(placeholder(cd.revision || '[Rev X]')), hdrColW[2]),
            vCell(p(placeholder('1 of 1')), hdrColW[3]),
          ],
        }),
      ],
    }),
  );
  blocks.push(spacer(20));

  // ── IDENTITY TABLE ───────────────────────────────────────────────────────
  // | System / Platform | [value]  | Periodicity     | [value]  |
  // | Subsystem         | [value]  | Maintenance Type| [value]  |
  // | Task Title                                                  |
  // | [value]                                                     |
  const idW = [2000, 3256, 2400, 2856];
  blocks.push(
    new Table({
      width: { size: USABLE, type: WidthType.DXA },
      columnWidths: idW,
      rows: [
        new TableRow({
          children: [
            lCell('System / Platform', idW[0]),
            vCell(p(placeholder(cd.system || '[System / Platform Name]')), idW[1]),
            lCell('Periodicity', idW[2]),
            vCell(p(new TextRun({ text: cd.periodicity || '[Daily / Weekly / Monthly / Quarterly / Semi-Annual / Annual]',
              font: 'Calibri', size: 20, bold: !!cd.periodicity, color: cd.periodicity ? C.black : C.muted, italics: !cd.periodicity })), idW[3]),
          ],
        }),
        new TableRow({
          children: [
            lCell('Subsystem / Component', idW[0]),
            vCell(p(placeholder(cd.subsystem || '[Subsystem / Component Name]')), idW[1]),
            lCell('Maintenance Type', idW[2]),
            vCell(p(placeholder(cd.maintenanceType || '[Preventive / Corrective / Inspect / Update]')), idW[3]),
          ],
        }),
        new TableRow({
          children: [
            lCell('RIN / Control Number', idW[0]),
            vCell(p(placeholder(cd.rin || '[Reference Identification Number]')), idW[1]),
            lCell('Est. Time (HH:MM)', idW[2]),
            vCell(p(placeholder(cd.timeEst || '[HH:MM]')), idW[3]),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              borders: allBorders,
              width: { size: USABLE, type: WidthType.DXA },
              columnSpan: 4,
              shading: { fill: C.rowHead, type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 100, right: 100 },
              children: [p(new TextRun({ text: 'Task Title / Check Name',
                font: 'Calibri', size: 18, bold: true, color: C.header }))],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              borders: allBorders,
              width: { size: USABLE, type: WidthType.DXA },
              columnSpan: 4,
              shading: { fill: C.white, type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [p(new TextRun({ text: cd.taskTitle || '[Enter full task title — e.g., "Verify Antivirus Definitions Currency and Scan Engine Integrity"]',
                font: 'Calibri', size: 22, bold: !!cd.taskTitle,
                color: cd.taskTitle ? C.black : C.muted, italics: !cd.taskTitle }))],
            }),
          ],
        }),
      ],
    }),
  );
  blocks.push(spacer(20));

  // ── SAFETY / WARNINGS ───────────────────────────────────────────────────
  const safetyW = [2000, USABLE - 2000];
  blocks.push(
    new Table({
      width: { size: USABLE, type: WidthType.DXA },
      columnWidths: safetyW,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: allBorders,
              width: { size: safetyW[0], type: WidthType.DXA },
              shading: { fill: 'FFF3CD', type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 100, right: 100 },
              verticalAlign: VerticalAlign.CENTER,
              children: [p(new TextRun({ text: '\u26A0\uFE0F  SAFETY / HAZARDS',
                font: 'Calibri', size: 18, bold: true, color: C.warn, allCaps: true }),
                { alignment: AlignmentType.CENTER })],
            }),
            vCell(
              p(placeholder(cd.safetyHazards ||
                '[List safety precautions, warnings, or N/A. Example: "Ensure system is in maintenance mode before proceeding. Do not perform during active operations."]')),
              safetyW[1], 'FFFBE6'),
          ],
        }),
      ],
    }),
  );
  blocks.push(spacer(20));

  // ── TOOLS / EQUIPMENT & REFERENCES (side by side) ───────────────────────
  const teW = [5256, 5256];
  blocks.push(
    new Table({
      width: { size: USABLE, type: WidthType.DXA },
      columnWidths: teW,
      rows: [
        new TableRow({
          children: [
            hCell('Tools / Equipment / Access Required', teW[0]),
            hCell('Reference Documents', teW[1]),
          ],
        }),
        new TableRow({
          children: [
            vCell(
              p(placeholder(cd.toolsAndEquipment ||
                '[List tools, software, credentials, or physical items needed.\nExample: Admin account, SIEM console access, patch management dashboard]')),
              teW[0], C.white),
            vCell(
              p(placeholder(cd.referenceDocs ||
                '[List applicable policies, STIGs, SOP numbers, or manual references.\nExample: NIST SP 800-53 SI-3, STIG ID V-XXXXXX, SOP-SA-007]')),
              teW[1], C.accentLight),
          ],
        }),
        new TableRow({
          children: [
            hCell('Manpower Requirements', teW[0]),
            hCell('Prerequisites / Prior Conditions', teW[1]),
          ],
        }),
        new TableRow({
          children: [
            vCell(
              p(placeholder(cd.manpowerReq ||
                '[Minimum personnel required and roles.\nExample: 1x SA (Journeyman or above); ISSM notification required before start]')),
              teW[0], C.white),
            vCell(
              p(placeholder('[Describe any conditions that must be met before beginning.\nExample: System in approved maintenance window; backup verified complete; CCB ticket open]')),
              teW[1], C.accentLight),
          ],
        }),
      ],
    }),
  );
  blocks.push(spacer(20));

  // ── PROCEDURE STEPS ──────────────────────────────────────────────────────
  const stepColW = [600, 500, 5012, 4400];
  const stepRows = [
    // Header
    new TableRow({
      tableHeader: true,
      children: [
        hCell('Step', stepColW[0]),
        hCell('\u2713', stepColW[1]),
        hCell('Action / Procedure', stepColW[2]),
        hCell('Finding / Result / Notes', stepColW[3]),
      ],
    }),
  ];

  const stepsToUse = cd.steps && cd.steps.length
    ? cd.steps
    : [
        'Verify system is within an approved maintenance window and all prerequisite conditions are satisfied. Annotate window start time.',
        'Notify ISSM / ISSO of maintenance commencement. Log notification method and time of acknowledgment.',
        'Open [tool / console / dashboard] and authenticate with authorized privileged account. Record account used.',
        '[ACTION STEP — Describe the specific technical action to be taken. Be explicit: include navigation path, command, parameter, or UI action.]\n\nExpected result: [Describe what a PASS looks like — e.g., "Definition date is within 24 hours of current date."]',
        '[ACTION STEP — Repeat pattern for each discrete check or action. One action per step for traceability.]\n\nExpected result: [State acceptance criteria or threshold.]',
        '[ACTION STEP — If a conditional branch exists, document it here.]\n\nIf result is OUT OF COMPLIANCE: [Document remediation action or escalation path.]\nIf result is COMPLIANT: proceed to next step.',
        'Document all findings in the designated log, ticket, or ConMon artifact. Attach screenshots or exports as required.',
        'Notify ISSM / ISSO of maintenance completion and outcome. Log notification time.',
        'Close maintenance window. Restore any temporarily modified settings or monitoring rules. Confirm normal operations.',
        '[Additional step — insert as needed]',
      ];

  stepsToUse.forEach((step, i) => {
    const shade = i % 2 === 0 ? C.white : C.accentLight;
    stepRows.push(checkRow(i + 1, step, shade));
  });

  blocks.push(
    new Table({
      width: { size: USABLE, type: WidthType.DXA },
      columnWidths: stepColW,
      rows: stepRows,
    }),
  );
  blocks.push(spacer(20));

  // ── FINDINGS SUMMARY ─────────────────────────────────────────────────────
  const fsW = [2000, 2628, 2000, 3884];
  blocks.push(
    new Table({
      width: { size: USABLE, type: WidthType.DXA },
      columnWidths: fsW,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: allBorders,
              width: { size: USABLE, type: WidthType.DXA },
              columnSpan: 4,
              shading: { fill: C.header, type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 100, right: 100 },
              children: [p(new TextRun({ text: 'Findings Summary',
                font: 'Calibri', size: 18, bold: true, color: C.white, allCaps: true }))],
            }),
          ],
        }),
        new TableRow({
          children: [
            lCell('Overall Result', fsW[0]),
            new TableCell({
              borders: allBorders,
              width: { size: fsW[1], type: WidthType.DXA },
              shading: { fill: C.white, type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 100, right: 100 },
              children: [p(new TextRun({ text: '\u25A1 SATISFACTORY     \u25A1 UNSATISFACTORY     \u25A1 N/A',
                font: 'Calibri', size: 18, color: C.black }))],
            }),
            lCell('Deficiencies Found?', fsW[2]),
            new TableCell({
              borders: allBorders,
              width: { size: fsW[3], type: WidthType.DXA },
              shading: { fill: C.white, type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 100, right: 100 },
              children: [p(new TextRun({ text: '\u25A1 None     \u25A1 POA&M Required     \u25A1 Immediate Action Required',
                font: 'Calibri', size: 18, color: C.black }))],
            }),
          ],
        }),
        new TableRow({
          children: [
            lCell('POA&M / Ticket #', fsW[0]),
            emptyCell(fsW[1]),
            lCell('SIEM Alert Ref #', fsW[2]),
            emptyCell(fsW[3]),
          ],
        }),
        // Notes area
        new TableRow({
          children: [
            new TableCell({
              borders: allBorders,
              width: { size: USABLE, type: WidthType.DXA },
              columnSpan: 4,
              shading: { fill: C.rowHead, type: ShadingType.CLEAR },
              margins: { top: 40, bottom: 40, left: 100, right: 100 },
              children: [p(new TextRun({ text: 'Additional Notes / Remarks',
                font: 'Calibri', size: 18, bold: true, color: C.header }))],
            }),
          ],
        }),
        ...Array.from({ length: 4 }, (_, i) =>
          new TableRow({
            children: [
              new TableCell({
                borders: allBorders,
                width: { size: USABLE, type: WidthType.DXA },
                columnSpan: 4,
                shading: { fill: C.white, type: ShadingType.CLEAR },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [p(t(''))],
              }),
            ],
          }),
        ),
      ],
    }),
  );
  blocks.push(spacer(20));

  // ── SIGN-OFF ─────────────────────────────────────────────────────────────
  const soW = [2628, 2628, 2628, 2628];
  blocks.push(
    new Table({
      width: { size: USABLE, type: WidthType.DXA },
      columnWidths: soW,
      rows: [
        new TableRow({
          children: soW.map((w, i) =>
            hCell(['Performed By (SA)', 'Date / Time', 'Reviewed By (ISSM/ISSO)', 'Date / Time'][i], w)),
        }),
        new TableRow({
          children: soW.map((w) => emptyCell(w, C.white)),
        }),
        new TableRow({
          children: soW.map((w, i) =>
            hCell(['Printed Name', 'Signature', 'Printed Name', 'Signature'][i], w)),
        }),
        new TableRow({
          children: soW.map((w) => emptyCell(w, C.white)),
        }),
      ],
    }),
  );
  blocks.push(spacer(20));

  // ── FOOTER CLASSIFICATION BANNER ─────────────────────────────────────────
  blocks.push(
    new Table({
      width: { size: USABLE, type: WidthType.DXA },
      columnWidths: [USABLE],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: { top: thick, bottom: thick, left: thick, right: thick },
              width: { size: USABLE, type: WidthType.DXA },
              shading: { fill: C.header, type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              children: [
                p(new TextRun({
                  text: cd.classification || 'UNCLASSIFIED',
                  font: 'Calibri', size: 20, bold: true, color: C.white, allCaps: true,
                }), { alignment: AlignmentType.CENTER }),
              ],
            }),
          ],
        }),
      ],
    }),
  );

  return blocks;
}

// ═══════════════════════════════════════════════════════════════════════════
//  BUILD DOCUMENT — 3 example cards back-to-back
//  Card 1: fully generic template (blank placeholders)
//  Card 2: sample — Daily Log Review
//  Card 3: sample — Monthly Patch Application
// ═══════════════════════════════════════════════════════════════════════════

const card1 = buildMRC({
  mrcNum:          '[MRC-XXXX-XXX]',
  revision:        '[Rev X]',
  classification:  'UNCLASSIFIED',
  system:          '[System / Platform Name]',
  subsystem:       '[Subsystem / Component]',
  periodicity:     '[DAILY / WEEKLY / MONTHLY / QUARTERLY / SEMI-ANNUAL / ANNUAL]',
  maintenanceType: '[PREVENTIVE / CORRECTIVE / INSPECT / UPDATE]',
  rin:             '[Reference Identification Number]',
  timeEst:         '[HH:MM]',
  taskTitle:       '[Task Title — Short, action-oriented description of the check]',
  safetyHazards:   '[List safety precautions, cautions, or warnings. If none, enter N/A.]',
  toolsAndEquipment: '[List all tools, software, consoles, or credentials required.]',
  referenceDocs:   '[List governing documents: STIGs, policies, SOPs, NIST controls.]',
  manpowerReq:     '[Minimum number of personnel and required skill level.]',
});

const card2 = buildMRC({
  mrcNum:          'MRC-0001-DA',
  revision:        'Rev 1.0',
  classification:  'UNCLASSIFIED // FOR OFFICIAL USE ONLY',
  system:          '[System Name] — e.g., Enterprise Workstation Environment',
  subsystem:       'Security Information and Event Management (SIEM) / Local Audit Logs',
  periodicity:     'DAILY',
  maintenanceType: 'PREVENTIVE / INSPECT',
  rin:             'DA-LOG-001',
  timeEst:         '00:30',
  taskTitle:       'Daily Security Event and Audit Log Review',
  safetyHazards:   'CAUTION: Do not modify, delete, or suppress any log entries. Access is read-only unless a remediation action is authorized in writing by the ISSM.',
  toolsAndEquipment:
    '• SIEM console access (read role minimum)\n' +
    '• Privileged SA account\n' +
    '• Incident ticketing system access\n' +
    '• MRC completion log / daily SA checklist',
  referenceDocs:
    '• NIST SP 800-53 Rev. 5 — AU-6 (Audit Record Review, Analysis, Reporting)\n' +
    '• NIST SP 800-53 Rev. 5 — SI-4 (System Monitoring)\n' +
    '• DoDI 8500.01 — Cybersecurity\n' +
    '• [Local SOP Reference]\n' +
    '• System Security Plan (SSP) AU controls',
  manpowerReq:     '1x System Administrator (Journeyman or above). ISSO notification required if anomalies are found.',
  steps: [
    'Verify current date/time and confirm the system is within the standard operational window. Record start time on this MRC.',
    'Log in to the SIEM console using your authorized privileged account. Record account name in the Finding column.',
    'Set the time range filter to the previous 24-hour period (or since last review).',
    'Review FAILED AUTHENTICATION events.\nExpected: Volume consistent with baseline. Threshold: >[X] failures from a single source within 1 hour triggers escalation.\nRecord total count in Finding column.',
    'Review PRIVILEGE ESCALATION events (sudo, runas, UAC elevation).\nExpected: All events correlated to authorized change requests or known admin activity.\nRecord any anomalies.',
    'Review ACCOUNT MANAGEMENT events (create, modify, delete, lock).\nExpected: All changes match approved provisioning tickets.\nRecord any unmatched events.',
    'Review IDS/IPS ALERT queue. Clear or acknowledge low-fidelity/known-good alerts per standing rules. Escalate any High or Critical alerts immediately to ISSO.',
    'Confirm AUDIT LOG SERVICE is running and forwarding to SIEM. Verify last log receipt timestamp is within 15 minutes.\nExpected: Green / Active status.',
    'If anomalies were found in any step, open a ticket in the incident tracking system and document ticket number in Findings Summary below. Notify ISSM / ISSO.',
    'Sign and date this MRC. File in the daily maintenance log. Retain per records management policy.',
  ],
});

const card3 = buildMRC({
  mrcNum:          'MRC-0002-MO',
  revision:        'Rev 1.0',
  classification:  'UNCLASSIFIED // FOR OFFICIAL USE ONLY',
  system:          '[System Name] — e.g., Enterprise Server / Endpoint Environment',
  subsystem:       'Operating System and Application Patch Management',
  periodicity:     'MONTHLY',
  maintenanceType: 'PREVENTIVE / UPDATE',
  rin:             'MO-PATCH-001',
  timeEst:         '04:00',
  taskTitle:       'Monthly OS and Application Patch Application and Verification',
  safetyHazards:
    'WARNING: Patching may cause service interruptions. This activity MUST be performed within an approved maintenance window.\n' +
    'CAUTION: Verify a full system backup is complete and verified BEFORE applying any patches. Do not proceed without confirmed backup.',
  toolsAndEquipment:
    '• Patch management console (WSUS / MECM / [tool])\n' +
    '• Privileged SA account (local admin / domain admin)\n' +
    '• Backup verification console\n' +
    '• Vulnerability scanner (ACAS / Nessus)\n' +
    '• Change Request (CR) ticket — pre-approved by CCB\n' +
    '• Rollback / recovery media or snapshot capability',
  referenceDocs:
    '• NIST SP 800-53 Rev. 5 — SI-2 (Flaw Remediation)\n' +
    '• NIST SP 800-53 Rev. 5 — CM-3 (Configuration Change Control)\n' +
    '• DISA STIG applicable to installed OS and applications\n' +
    '• Configuration Management Plan (CMP) — [Version]\n' +
    '• CCB-approved Change Request — CR-[XXXX]',
  manpowerReq:     '1x SA (Journeyman or above). ISSM notification required before and after patching. CCB ticket must be open prior to start.',
  steps: [
    'Confirm approved maintenance window is active. Verify CCB Change Request is in APPROVED status. Record CR number in Finding column.',
    'Notify ISSM / ISSO of maintenance commencement. Log notification method and timestamp.',
    'Verify system backup completed successfully within the last 24 hours. Confirm backup integrity (checksum / test restore if required). If backup is not verified, STOP and notify ISSM before proceeding.',
    'Log in to the patch management console. Navigate to the pending patch list for this system group.',
    'Confirm all patches in the deployment group are AUTHORIZED in the CCB ticket. Do not apply any patches not explicitly listed in the approved CR.',
    'Initiate patch deployment to target systems. Monitor deployment progress. Record start time.',
    'Upon completion, review deployment report. Document the number of systems patched, any failures, and any patches that required reboot.\nExpected: 100% deployment success on in-scope systems.',
    'Reboot systems as required. Confirm systems return to normal operational state. Verify critical services restart successfully.',
    'Run a post-patch vulnerability scan against patched systems. Compare results to pre-patch baseline.\nExpected: Previously identified vulnerabilities associated with applied patches are no longer present.',
    'Update POA&M for any patched findings. Close resolved vulnerability findings in the tracking system. Document any outstanding failures.',
    'Update the CMDB / asset inventory to reflect new patch levels.',
    'Notify ISSM / ISSO of maintenance completion. Provide summary of systems patched, success/failure count, and any outstanding items.',
    'Close maintenance window. Confirm monitoring rules are restored to normal. Sign and date this MRC.',
  ],
});

// interleave page breaks between cards
const sections_children = [
  ...card1,
  new Paragraph({ children: [new PageBreak()] }),
  ...card2,
  new Paragraph({ children: [new PageBreak()] }),
  ...card3,
];

const doc = new Document({
  numbering: { config: [] },
  styles: {
    default: { document: { run: { font: 'Calibri', size: 20 } } },
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: 15840 },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
      },
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.accent, space: 4 } },
            children: [
              new TextRun({ text: 'MAINTENANCE REQUIREMENT CARD (MRC)  |  ',
                font: 'Calibri', size: 16, color: C.muted }),
              new TextRun({ text: '[System Name]  |  [Classification]',
                font: 'Calibri', size: 16, color: C.muted, italics: true }),
            ],
          }),
        ],
      }),
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.border, space: 4 } },
            children: [
              new TextRun({ text: 'Page ', font: 'Calibri', size: 16, color: C.muted }),
              new TextRun({ children: [PageNumber.CURRENT], font: 'Calibri', size: 16, color: C.muted }),
              new TextRun({ text: ' of ', font: 'Calibri', size: 16, color: C.muted }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Calibri', size: 16, color: C.muted }),
              new TextRun({ text: '          Retain per applicable records management policy.',
                font: 'Calibri', size: 16, color: C.muted, italics: true }),
            ],
          }),
        ],
      }),
    },
    children: sections_children,
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/home/user/workspace/MRC_Template.docx', buf);
  console.log('MRC template written successfully.');
});
