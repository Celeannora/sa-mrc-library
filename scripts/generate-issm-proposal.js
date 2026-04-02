const fs = require('fs');
const docx = require('docx');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber,
  PageBreak, HeadingLevel, TableOfContents,
} = docx;

// ── Color palette ──────────────────────────────────────────────────────────
const C = {
  accent:      '01696F',  // teal
  accentDark:  '0C4E54',
  accentLight: 'E0F0F1',
  header:      '1B474D',  // dark teal header bg
  border:      'B0B0B0',
  rowAlt:      'F2F8F8',
  rowHead:     'D0E8EA',
  white:       'FFFFFF',
  black:       '000000',
  muted:       '6B7280',
  warn:        'A12C7B',
};

const thin  = { style: BorderStyle.SINGLE, size: 1, color: C.border };
const allBorders = { top: thin, bottom: thin, left: thin, right: thin };
const noBorder   = { style: BorderStyle.NONE, size: 0, color: C.white };
const allNone    = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

// ── Typography helpers ─────────────────────────────────────────────────────
function body(text, opts = {}) {
  return new TextRun({ text, font: 'Arial', size: 22, ...opts });
}
function bold(text, opts = {}) {
  return body(text, { bold: true, ...opts });
}
function muted(text) {
  return body(text, { color: C.muted, size: 20, italics: true });
}

function para(children, opts = {}) {
  return new Paragraph({ children: Array.isArray(children) ? children : [children], ...opts });
}
function spacer(pts = 80) {
  return new Paragraph({ children: [new TextRun('')], spacing: { after: pts } });
}
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, font: 'Arial', size: 36, bold: true, color: C.header })],
    spacing: { before: 320, after: 140 },
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, font: 'Arial', size: 28, bold: true, color: C.accentDark })],
    spacing: { before: 260, after: 100 },
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text, font: 'Arial', size: 24, bold: true, color: C.accentDark })],
    spacing: { before: 200, after: 80 },
  });
}

// ── List helpers ───────────────────────────────────────────────────────────
function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: 'bullets', level },
    children: [body(text)],
    spacing: { after: 40 },
  });
}
function numbered(text, ref = 'steps', level = 0) {
  return new Paragraph({
    numbering: { reference: ref, level },
    children: [body(text)],
    spacing: { after: 40 },
  });
}

// ── Table helpers ──────────────────────────────────────────────────────────
const PAGE_WIDTH = 9360; // 8.5in - 2x1in margins

function headerCell(text, width) {
  return new TableCell({
    borders: allBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: C.header, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [para(bold(text, { color: C.white, size: 20 }), { alignment: AlignmentType.LEFT })],
  });
}
function dataCell(text, width, shade = C.white, opts = {}) {
  return new TableCell({
    borders: allBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: shade, type: ShadingType.CLEAR },
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    verticalAlign: VerticalAlign.TOP,
    children: [para(body(text, opts))],
  });
}
function dataCellBold(text, width, shade = C.white) {
  return new TableCell({
    borders: allBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: shade, type: ShadingType.CLEAR },
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    verticalAlign: VerticalAlign.TOP,
    children: [para(bold(text, { size: 20 }))],
  });
}

// ── Maintenance task table builder ─────────────────────────────────────────
// cols: Task | Responsible Party | Completion Date | Initials | Notes
// widths: 2800 | 1800 | 1500 | 900 | 2360 = 9360
function makeTaskTable(rows) {
  const colWidths = [2800, 1800, 1500, 900, 2360];
  const tableRows = [
    new TableRow({
      tableHeader: true,
      children: [
        headerCell('Task / Activity', colWidths[0]),
        headerCell('Responsible Party', colWidths[1]),
        headerCell('Completion Date', colWidths[2]),
        headerCell('Initials', colWidths[3]),
        headerCell('Notes / Findings', colWidths[4]),
      ],
    }),
    ...rows.map((row, i) => {
      const shade = i % 2 === 0 ? C.white : C.rowAlt;
      return new TableRow({
        children: [
          dataCell(row[0], colWidths[0], shade),
          dataCell(row[1], colWidths[1], shade, { color: C.muted }),
          dataCell(row[2] || '', colWidths[2], shade),
          dataCell('', colWidths[3], shade),
          dataCell('', colWidths[4], shade),
        ],
      });
    }),
  ];
  return new Table({ width: { size: PAGE_WIDTH, type: WidthType.DXA }, columnWidths: colWidths, rows: tableRows });
}

// ── Sign-off table ─────────────────────────────────────────────────────────
function signOffRow(label, col1, col2, col3) {
  const shade = C.white;
  const w = [2800, 2280, 2280, 2000];
  return new TableRow({
    children: [
      dataCellBold(label, w[0], C.rowHead),
      dataCell(col1, w[1], shade),
      dataCell(col2, w[2], shade),
      dataCell(col3, w[3], shade),
    ],
  });
}
function makeSignOffTable() {
  const w = [2800, 2280, 2280, 2000];
  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    columnWidths: w,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          headerCell('Role', w[0]),
          headerCell('Printed Name', w[1]),
          headerCell('Signature', w[2]),
          headerCell('Date', w[3]),
        ],
      }),
      signOffRow('System Administrator', '', '', ''),
      signOffRow('ISSM / ISSO', '', '', ''),
      signOffRow('Authorizing Official (AO)', '', '', ''),
    ],
  });
}

// ── Divider line ───────────────────────────────────────────────────────────
function divider() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.accent, space: 6 } },
    children: [new TextRun('')],
    spacing: { before: 120, after: 120 },
  });
}

// ── Cover page ─────────────────────────────────────────────────────────────
function coverPage() {
  return [
    spacer(800),
    para(bold('INFORMATION SYSTEM SECURITY MANAGER (ISSM)', { size: 36, color: C.header }), { alignment: AlignmentType.CENTER }),
    spacer(40),
    para(bold('Scheduled Maintenance Task Review', { size: 48, color: C.accent }), { alignment: AlignmentType.CENTER }),
    spacer(40),
    para(bold('System Administrator Proposal', { size: 28, color: C.accentDark }), { alignment: AlignmentType.CENTER }),
    spacer(160),
    divider(),
    spacer(80),

    // Metadata block
    new Table({
      width: { size: PAGE_WIDTH, type: WidthType.DXA },
      columnWidths: [3000, 6360],
      rows: [
        ['System Name / Identifier', '[System Name — e.g., NIPR Workstation Cluster]'],
        ['System Owner', '[Name, Title, Office Symbol]'],
        ['ISSM / ISSO', '[Name, Title, Contact]'],
        ['Submitting SA / POC', '[Name, Title, Contact]'],
        ['Classification Level', '[UNCLASSIFIED // FOR OFFICIAL USE ONLY]'],
        ['Submission Date', '[MM/DD/YYYY]'],
        ['Review Cycle / Period', '[e.g., FY26 Q2 — 01 APR 2026 – 30 JUN 2026]'],
        ['Document Version', 'v1.0 (Draft)'],
        ['Authority to Operate (ATO)', '[ATO Reference # — Expiration: MM/DD/YYYY]'],
      ].map((row, i) => {
        const shade = i % 2 === 0 ? C.white : C.rowAlt;
        return new TableRow({
          children: [
            dataCellBold(row[0], 3000, C.rowHead),
            dataCell(row[1], 6360, shade, { color: C.muted, italics: true }),
          ],
        });
      }),
    }),

    spacer(120),
    para(muted('This document is submitted for ISSM review and approval prior to execution of scheduled maintenance. All tasks must receive written authorization before commencement. Unauthorized changes may constitute a security incident and shall be reported in accordance with applicable policy.')),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
//  DOCUMENT ASSEMBLY
// ═══════════════════════════════════════════════════════════════════════════
const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }, {
          level: 1, format: LevelFormat.BULLET, text: '\u25E6', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } },
        }],
      },
      {
        reference: 'steps',
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
    ],
  },
  styles: {
    default: { document: { run: { font: 'Arial', size: 22 } } },
    paragraphStyles: [
      {
        id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 36, bold: true, font: 'Arial', color: C.header },
        paragraph: { spacing: { before: 320, after: 140 }, outlineLevel: 0 },
      },
      {
        id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: 'Arial', color: C.accentDark },
        paragraph: { spacing: { before: 260, after: 100 }, outlineLevel: 1 },
      },
      {
        id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: 'Arial', color: C.accentDark },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 },
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
      },
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: 'ISSM Scheduled Maintenance Proposal  |  FOR OFFICIAL USE ONLY', font: 'Arial', size: 16, color: C.muted, italics: true })],
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.accent, space: 4 } },
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
              new TextRun({ text: 'Page ', font: 'Arial', size: 18, color: C.muted }),
              new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 18, color: C.muted }),
              new TextRun({ text: ' of ', font: 'Arial', size: 18, color: C.muted }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Arial', size: 18, color: C.muted }),
              new TextRun({ text: '          [System Name]  •  [Classification]', font: 'Arial', size: 18, color: C.muted, italics: true }),
            ],
          }),
        ],
      }),
    },

    children: [

      // ── COVER PAGE ──────────────────────────────────────────────────────
      ...coverPage(),

      // ── TABLE OF CONTENTS ───────────────────────────────────────────────
      h1('Table of Contents'),
      new TableOfContents('Table of Contents', { hyperlink: true, headingStyleRange: '1-3' }),
      new Paragraph({ children: [new PageBreak()] }),

      // ═══════════════════════════════════════════════════════════════════
      // SECTION 1 — PURPOSE & SCOPE
      // ═══════════════════════════════════════════════════════════════════
      h1('1. Purpose and Scope'),
      para(body('This document constitutes a formal proposal submitted by the System Administrator (SA) to the Information System Security Manager (ISSM) for review and written authorization of scheduled maintenance tasks. All activities enumerated herein are to be conducted within the approved maintenance window in accordance with applicable policy, the current Authority to Operate (ATO), and the System Security Plan (SSP).')),
      spacer(60),
      para(body('Execution of any task listed in this document without prior written ISSM approval is prohibited and may constitute an unauthorized change to the accredited system configuration.')),
      spacer(60),
      h2('1.1  Applicable References'),
      bullet('NIST SP 800-53 Rev. 5 — Security and Privacy Controls for Information Systems'),
      bullet('NIST SP 800-128 — Guide for Security-Focused Configuration Management'),
      bullet('CNSSI No. 1253 — Security Categorization and Control Selection for NSS'),
      bullet('DoD Instruction 8510.01 — RMF for DoD IT'),
      bullet('DoD Instruction 8500.01 — Cybersecurity'),
      bullet('[Organization-Specific Policy / SOP Reference]'),
      bullet('System Security Plan (SSP) — [Version / Date]'),
      bullet('Configuration Management Plan (CMP) — [Version / Date]'),
      spacer(60),
      h2('1.2  Scope'),
      para(body('This proposal covers all scheduled maintenance activities for the system(s) identified on the cover page. It applies to hardware, software, firmware, operating systems, middleware, and security tools operating within the accreditation boundary.')),
      new Paragraph({ children: [new PageBreak()] }),

      // ═══════════════════════════════════════════════════════════════════
      // SECTION 2 — PERSONNEL & ROLES
      // ═══════════════════════════════════════════════════════════════════
      h1('2. Personnel and Roles'),
      para(body('The following personnel are responsible for the planning, execution, and oversight of scheduled maintenance activities.')),
      spacer(80),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [3000, 3000, 3360],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell('Role', 3000),
              headerCell('Name / Title', 3000),
              headerCell('Contact / Organization', 3360),
            ],
          }),
          ...([
            ['System Administrator (SA)', '', ''],
            ['Alternate SA / POC', '', ''],
            ['ISSM', '', ''],
            ['ISSO', '', ''],
            ['Authorizing Official (AO)', '', ''],
            ['Change Control Board (CCB) Rep', '', ''],
            ['Help Desk / NOC POC', '', ''],
          ].map((row, i) => new TableRow({
            children: [
              dataCellBold(row[0], 3000, i % 2 === 0 ? C.rowHead : C.rowAlt),
              dataCell(row[1], 3000, i % 2 === 0 ? C.white : C.rowAlt, { color: C.muted, italics: true }),
              dataCell(row[2], 3360, i % 2 === 0 ? C.white : C.rowAlt, { color: C.muted, italics: true }),
            ],
          }))),
        ],
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // ═══════════════════════════════════════════════════════════════════
      // SECTION 3 — MAINTENANCE WINDOWS
      // ═══════════════════════════════════════════════════════════════════
      h1('3. Maintenance Windows'),
      para(body('All maintenance activities must be conducted within pre-approved windows unless an emergency change is warranted. Emergency changes require separate ISSM notification and CCB approval in accordance with the Configuration Management Plan.')),
      spacer(80),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [2500, 2500, 2500, 1860],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell('Window Type', 2500),
              headerCell('Day(s)', 2500),
              headerCell('Time (Local / UTC)', 2500),
              headerCell('Frequency', 1860),
            ],
          }),
          ...([
            ['Standard / Routine', '[e.g., Saturday]', '[e.g., 0200 – 0600 EST / 0700 – 1100 UTC]', 'Weekly'],
            ['Extended Maintenance', '[e.g., 1st Sunday of Month]', '[e.g., 0000 – 0600 EST]', 'Monthly'],
            ['Emergency (Out-of-Band)', 'As authorized', 'As authorized', 'As needed'],
          ].map((row, i) => new TableRow({
            children: [
              dataCellBold(row[0], 2500, i % 2 === 0 ? C.rowHead : C.rowAlt),
              dataCell(row[1], 2500, i % 2 === 0 ? C.white : C.rowAlt, { color: C.muted, italics: true }),
              dataCell(row[2], 2500, i % 2 === 0 ? C.white : C.rowAlt, { color: C.muted, italics: true }),
              dataCell(row[3], 1860, i % 2 === 0 ? C.white : C.rowAlt),
            ],
          }))),
        ],
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // ═══════════════════════════════════════════════════════════════════
      // SECTION 4 — SCHEDULED MAINTENANCE TASKS BY PERIODICITY
      // ═══════════════════════════════════════════════════════════════════
      h1('4. Scheduled Maintenance Tasks'),
      para(body('Tasks are organized by periodicity. The SA shall annotate each row with completion date and initials upon task execution. Completed tables shall be retained as artifacts for continuous monitoring and audit purposes.')),
      spacer(60),
      para(body('[ISSM Note: Verify each task aligns with the SSP, CMP, and current ATO conditions. Tasks resulting in configuration changes require CCB approval and may require ATO update.]', { color: C.warn, italics: true })),
      spacer(80),

      // ── 4.1 DAILY ──────────────────────────────────────────────────────
      h2('4.1  Daily Tasks'),
      para(muted('Frequency: Every operational day. Complete prior to or at start of business unless otherwise noted.')),
      spacer(60),
      makeTaskTable([
        ['Review system and security event logs (SIEM / local)', 'SA', ''],
        ['Verify antivirus / EDR definitions are current', 'SA', ''],
        ['Confirm backup jobs completed successfully', 'SA', ''],
        ['Check system health dashboards (CPU, memory, disk, network)', 'SA', ''],
        ['Review and action open trouble tickets / alerts', 'SA', ''],
        ['Verify IDS/IPS sensor status and alert queue', 'SA / ISSO', ''],
        ['Confirm audit logging service is active and forwarding', 'SA', ''],
        ['Review privileged account activity logs', 'SA / ISSO', ''],
        ['Validate removable media controls are enforced', 'SA', ''],
        ['[Additional daily task — add as applicable]', 'SA', ''],
      ]),
      spacer(100),

      // ── 4.2 WEEKLY ─────────────────────────────────────────────────────
      h2('4.2  Weekly Tasks'),
      para(muted('Frequency: Once per calendar week, typically during the standard maintenance window.')),
      spacer(60),
      makeTaskTable([
        ['Review and clear / archive event logs per retention policy', 'SA', ''],
        ['Verify patch management console for pending patches', 'SA', ''],
        ['Test restoration of at least one file/folder from backup', 'SA', ''],
        ['Review user account activity — flag dormant or anomalous accounts', 'SA / ISSO', ''],
        ['Confirm firewall and ACL rules are consistent with baseline', 'SA', ''],
        ['Review failed login attempts and lock-out events', 'SA / ISSO', ''],
        ['Check certificate expiration dates (30-day look-ahead)', 'SA', ''],
        ['Verify software inventory against approved software list', 'SA', ''],
        ['Review open vulnerability scanner findings', 'SA / ISSO', ''],
        ['Confirm time synchronization (NTP) on all hosts', 'SA', ''],
        ['[Additional weekly task — add as applicable]', 'SA', ''],
      ]),
      spacer(100),

      // ── 4.3 MONTHLY ────────────────────────────────────────────────────
      h2('4.3  Monthly Tasks'),
      para(muted('Frequency: Once per calendar month, typically during the extended maintenance window.')),
      spacer(60),
      makeTaskTable([
        ['Apply approved OS and application patches / updates', 'SA', ''],
        ['Run authenticated vulnerability scan — document and remediate findings', 'SA / ISSO', ''],
        ['Conduct privileged account review — validate need-to-know / least privilege', 'SA / ISSO', ''],
        ['Review and update system configuration baseline documentation', 'SA', ''],
        ['Test disaster recovery / failover procedures (tabletop or live)', 'SA', ''],
        ['Verify physical security controls (server room access logs, seals)', 'SA / FSO', ''],
        ['Review and renew expiring certificates / tokens', 'SA', ''],
        ['Confirm user account provisioning and de-provisioning logs', 'SA / ISSO', ''],
        ['Submit monthly continuous monitoring (ConMon) artifacts to ISSM', 'SA / ISSO', ''],
        ['Review and test system backup restoration (full restore test)', 'SA', ''],
        ['Update Plan of Action and Milestones (POA&M) items', 'SA / ISSO', ''],
        ['[Additional monthly task — add as applicable]', 'SA', ''],
      ]),
      spacer(100),

      // ── 4.4 QUARTERLY ──────────────────────────────────────────────────
      h2('4.4  Quarterly Tasks'),
      para(muted('Frequency: Once per fiscal quarter (Q1–Q4). Coordinate scheduling with ISSM in advance.')),
      spacer(60),
      makeTaskTable([
        ['Conduct quarterly security review and risk assessment update', 'SA / ISSM', ''],
        ['Review and validate System Security Plan (SSP) accuracy', 'SA / ISSM', ''],
        ['Perform hardware inventory audit — reconcile with CMDB', 'SA', ''],
        ['Review and update user training and awareness records', 'SA / ISSO', ''],
        ['Validate boundary protection controls (DMZ, enclave perimeter)', 'SA / ISSO', ''],
        ['Review and test incident response procedures', 'SA / ISSO / ISSM', ''],
        ['Assess and update software/firmware on network appliances', 'SA', ''],
        ['Review media sanitization logs and destruction certificates', 'SA / ISSO', ''],
        ['Audit removable media inventory and authorization records', 'SA / ISSO', ''],
        ['Review security assessment and authorization (A&A) status', 'ISSM / ISSO', ''],
        ['[Additional quarterly task — add as applicable]', 'SA / ISSM', ''],
      ]),
      spacer(100),

      // ── 4.5 SEMI-ANNUAL ────────────────────────────────────────────────
      h2('4.5  Semi-Annual Tasks'),
      para(muted('Frequency: Twice per fiscal year (typically end of Q2 and Q4). Schedule at least 30 days in advance.')),
      spacer(60),
      makeTaskTable([
        ['Conduct formal security control assessment (spot-check or full)', 'ISSM / ISSO', ''],
        ['Perform full privileged account audit and recertification', 'SA / ISSM', ''],
        ['Review and update interconnection security agreements (ISAs)', 'SA / ISSM / AO', ''],
        ['Test and validate business continuity / COOP plan', 'SA / ISSO', ''],
        ['Conduct comprehensive penetration test or vulnerability assessment', 'SA / ISSM', ''],
        ['Review and update data classification and labeling compliance', 'SA / ISSO', ''],
        ['Validate encryption implementation (data at rest and in transit)', 'SA / ISSO', ''],
        ['Review supply chain risk management (SCRM) controls', 'SA / ISSM', ''],
        ['[Additional semi-annual task — add as applicable]', 'SA / ISSM', ''],
      ]),
      spacer(100),

      // ── 4.6 ANNUAL ─────────────────────────────────────────────────────
      h2('4.6  Annual Tasks'),
      para(muted('Frequency: Once per fiscal year. Coordinate with AO, ISSM, and all stakeholders. Initiate planning 90 days prior to ATO expiration.')),
      spacer(60),
      makeTaskTable([
        ['Initiate ATO renewal package preparation (if applicable)', 'ISSM / ISSO / SA', ''],
        ['Conduct full security controls assessment (SCA)', 'ISSM / SCA Team', ''],
        ['Perform comprehensive disaster recovery exercise (full failover)', 'SA / ISSO', ''],
        ['Review and reissue system access authorizations for all users', 'SA / ISSM', ''],
        ['Update risk register and residual risk acceptance documentation', 'ISSM / AO', ''],
        ['Conduct annual security awareness and role-based training review', 'SA / ISSO', ''],
        ['Perform hardware lifecycle review and end-of-life assessment', 'SA', ''],
        ['Review and validate all POA&M items — close or re-baseline', 'SA / ISSM / AO', ''],
        ['Update and resubmit System Security Plan (SSP)', 'ISSM / ISSO / SA', ''],
        ['Conduct formal lessons-learned review for the maintenance program', 'SA / ISSM', ''],
        ['[Additional annual task — add as applicable]', 'SA / ISSM', ''],
      ]),
      new Paragraph({ children: [new PageBreak()] }),

      // ═══════════════════════════════════════════════════════════════════
      // SECTION 5 — RISK & IMPACT ASSESSMENT
      // ═══════════════════════════════════════════════════════════════════
      h1('5. Risk and Impact Assessment'),
      para(body('For each proposed maintenance activity that may affect system availability, integrity, or security posture, the SA shall complete the following impact assessment prior to ISSM review.')),
      spacer(80),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell('Assessment Item', 2800),
              headerCell('Response', 6560),
            ],
          }),
          ...([
            ['Maintenance Activity Description', '[Describe the specific task or change being proposed]'],
            ['Systems / Components Affected', '[List affected hosts, services, or network segments]'],
            ['Expected Downtime / Outage Window', '[Duration, start/end time, affected users]'],
            ['Security Control Impact (if any)', '[Identify any controls temporarily reduced or modified]'],
            ['Risk Level (Low / Moderate / High)', '[Assess residual risk during and after maintenance]'],
            ['Rollback / Recovery Plan', '[Describe steps to revert if the activity fails]'],
            ['Testing / Validation Plan', '[Describe post-maintenance verification steps]'],
            ['User Notification Required?', '[Yes / No — if Yes, attach notification plan]'],
            ['CCB Approval Required?', '[Yes / No — Reference CCB ticket # if applicable]'],
            ['SIEM / Monitoring Adjustments', '[Describe any alert suppression or rule modifications needed]'],
            ['Additional Risk Mitigations', '[List any compensating controls active during maintenance]'],
          ].map((row, i) => new TableRow({
            children: [
              dataCellBold(row[0], 2800, i % 2 === 0 ? C.rowHead : C.rowAlt),
              dataCell(row[1], 6560, i % 2 === 0 ? C.white : C.rowAlt, { color: C.muted, italics: true }),
            ],
          }))),
        ],
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // ═══════════════════════════════════════════════════════════════════
      // SECTION 6 — CONFIGURATION CHANGE CONTROL
      // ═══════════════════════════════════════════════════════════════════
      h1('6. Configuration Change Control'),
      para(body('Any maintenance activity that introduces a change to the accredited system baseline must be tracked through the Configuration Management process. The SA shall ensure the following steps are completed for all configuration-impacting activities:')),
      spacer(60),
      numbered('Submit a Change Request (CR) to the Change Control Board (CCB) at least [X] days prior to the planned maintenance window.'),
      numbered('Obtain written CCB approval before proceeding. Retain approval documentation as a maintenance artifact.'),
      numbered('Document the baseline configuration state before and after the change (e.g., screenshots, config exports, checksums).'),
      numbered('Update the system\'s Configuration Management Database (CMDB) and relevant SSP appendices within [X] business days of completion.'),
      numbered('Notify the ISSM of any changes that may affect the system\'s security posture or ATO conditions.'),
      numbered('Retain all change records for a minimum of [X] years per applicable records management policy.'),
      spacer(60),
      h2('6.1  Change Request Log'),
      para(body('List all configuration-impacting changes included in this maintenance proposal:')),
      spacer(60),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [1200, 3000, 1800, 1680, 1680],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell('CR #', 1200),
              headerCell('Change Description', 3000),
              headerCell('CCB Approval Date', 1800),
              headerCell('Priority', 1680),
              headerCell('Status', 1680),
            ],
          }),
          ...[1,2,3,4,5].map((n, i) => new TableRow({
            children: [
              dataCell('', 1200, i % 2 === 0 ? C.white : C.rowAlt),
              dataCell('', 3000, i % 2 === 0 ? C.white : C.rowAlt),
              dataCell('', 1800, i % 2 === 0 ? C.white : C.rowAlt),
              dataCell('', 1680, i % 2 === 0 ? C.white : C.rowAlt),
              dataCell('', 1680, i % 2 === 0 ? C.white : C.rowAlt),
            ],
          })),
        ],
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // ═══════════════════════════════════════════════════════════════════
      // SECTION 7 — CONTINUOUS MONITORING ARTIFACTS
      // ═══════════════════════════════════════════════════════════════════
      h1('7. Continuous Monitoring (ConMon) Artifacts'),
      para(body('The following artifacts shall be generated, retained, and submitted to the ISSM as evidence of maintenance execution and ongoing compliance. Attach or reference artifact locations below.')),
      spacer(80),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [3000, 2400, 1680, 2280],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell('Artifact Type', 3000),
              headerCell('Source / Tool', 2400),
              headerCell('Frequency', 1680),
              headerCell('Location / Reference', 2280),
            ],
          }),
          ...([
            ['Vulnerability Scan Report', 'ACAS / Tenable / Nessus', 'Monthly', ''],
            ['SIEM Event Summary / Log Export', 'Splunk / ArcSight / [tool]', 'Monthly', ''],
            ['Patch Compliance Report', 'WSUS / MECM / [tool]', 'Monthly', ''],
            ['Backup Verification Log', '[Backup tool]', 'Monthly', ''],
            ['Privileged Account Audit Report', 'Active Directory / PAM', 'Quarterly', ''],
            ['Configuration Baseline Comparison', 'SCAP / SCC / STIG Viewer', 'Quarterly', ''],
            ['Hardware / Software Inventory', 'CMDB / [tool]', 'Quarterly', ''],
            ['Incident Response Log', 'SIPR Ticketing / [tool]', 'As occurred', ''],
            ['Media Sanitization Certificates', 'NSA EPL tool / manual', 'As occurred', ''],
            ['Security Assessment Report (SAR)', 'ISSM / SCA Team', 'Annual', ''],
            ['POA&M Update', 'eMASS / [tool]', 'Monthly', ''],
          ].map((row, i) => new TableRow({
            children: [
              dataCellBold(row[0], 3000, i % 2 === 0 ? C.rowHead : C.rowAlt),
              dataCell(row[1], 2400, i % 2 === 0 ? C.white : C.rowAlt, { italics: true }),
              dataCell(row[2], 1680, i % 2 === 0 ? C.white : C.rowAlt),
              dataCell(row[3], 2280, i % 2 === 0 ? C.white : C.rowAlt, { color: C.muted, italics: true }),
            ],
          }))),
        ],
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // ═══════════════════════════════════════════════════════════════════
      // SECTION 8 — EXCEPTIONS & DEVIATIONS
      // ═══════════════════════════════════════════════════════════════════
      h1('8. Exceptions and Deviations'),
      para(body('If any scheduled task cannot be completed within the defined periodicity, the SA must document the reason and obtain ISSM acknowledgment. Deviations from the approved maintenance schedule shall be treated as findings in the continuous monitoring program unless waived in writing by the ISSM.')),
      spacer(80),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [1500, 2800, 2400, 2660],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell('Task / Period', 1500),
              headerCell('Reason for Deviation', 2800),
              headerCell('Compensating Control', 2400),
              headerCell('ISSM Acknowledgment / Date', 2660),
            ],
          }),
          ...[1,2,3,4].map((n, i) => new TableRow({
            children: [
              dataCell('', 1500, i % 2 === 0 ? C.white : C.rowAlt),
              dataCell('', 2800, i % 2 === 0 ? C.white : C.rowAlt),
              dataCell('', 2400, i % 2 === 0 ? C.white : C.rowAlt),
              dataCell('', 2660, i % 2 === 0 ? C.white : C.rowAlt),
            ],
          })),
        ],
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // ═══════════════════════════════════════════════════════════════════
      // SECTION 9 — SA NOTES & ISSM COMMENTS
      // ═══════════════════════════════════════════════════════════════════
      h1('9. SA Notes and ISSM Comments'),
      h2('9.1  System Administrator Notes'),
      para(body('[The SA shall document any special considerations, environmental constraints, resource limitations, coordination requirements, or context the ISSM should be aware of when reviewing this proposal.]')),
      spacer(40),
      ...[1,2,3,4,5].map(() => para(body(''), { spacing: { after: 120 } })),
      divider(),
      spacer(40),
      h2('9.2  ISSM Review Comments'),
      para(body('[Reserved for ISSM use. Document review findings, required modifications, conditions of approval, or denial rationale.]')),
      spacer(40),
      para(bold('ISSM Decision:', { color: C.header })),
      spacer(40),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [2200, 2200, 2200, 2760],
        rows: [
          new TableRow({
            children: [
              dataCell('[ ]  Approved as Submitted', 2200, C.rowAlt),
              dataCell('[ ]  Approved with Conditions (see comments)', 2200, C.white),
              dataCell('[ ]  Denied — Resubmit Required', 2200, C.rowAlt),
              dataCell('[ ]  Additional Information Required', 2760, C.white),
            ],
          }),
        ],
      }),
      spacer(60),
      ...[1,2,3,4,5].map(() => para(body(''), { spacing: { after: 120 } })),
      new Paragraph({ children: [new PageBreak()] }),

      // ═══════════════════════════════════════════════════════════════════
      // SECTION 10 — SIGN-OFF
      // ═══════════════════════════════════════════════════════════════════
      h1('10. Approval and Sign-Off'),
      para(body('By signing below, each party acknowledges their role and responsibilities regarding the scheduled maintenance activities described in this proposal. The ISSM\'s signature constitutes written authorization to proceed within the scope and timeframe approved. Any deviation from the approved scope requires a separate written amendment.')),
      spacer(80),
      makeSignOffTable(),
      spacer(60),
      divider(),
      spacer(40),
      para(body('Revision History', { bold: true, color: C.header })),
      spacer(40),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [1200, 1800, 3000, 3360],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell('Version', 1200),
              headerCell('Date', 1800),
              headerCell('Author', 3000),
              headerCell('Change Summary', 3360),
            ],
          }),
          new TableRow({
            children: [
              dataCell('v1.0', 1200, C.white),
              dataCell('[MM/DD/YYYY]', 1800, C.white, { color: C.muted, italics: true }),
              dataCell('[SA Name]', 3000, C.white, { color: C.muted, italics: true }),
              dataCell('Initial draft submitted for ISSM review', 3360, C.white),
            ],
          }),
          new TableRow({
            children: [
              dataCell('', 1200, C.rowAlt),
              dataCell('', 1800, C.rowAlt),
              dataCell('', 3000, C.rowAlt),
              dataCell('', 3360, C.rowAlt),
            ],
          }),
        ],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/home/user/workspace/ISSM_Scheduled_Maintenance_Proposal_Template.docx', buf);
  console.log('Done — document written successfully.');
});
