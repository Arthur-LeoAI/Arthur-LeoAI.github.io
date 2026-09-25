export const profile = {
  name: 'Jiaming Li',
  email: 'arthur.jiaming.li@gmail.com',
  github: 'https://github.com/Arthur-LeoAI',
  linkedin: 'https://www.linkedin.com/in/arthurjiamingli',
  story: 'https://jiaming-li-portfolio.arthurli2025.chatgpt.site',
  archive: 'https://arthur-leoai.github.io',
};
export const projects = [
  {
    id: 'mcda',
    number: '01',
    title: 'MCDA Tool',
    subtitle: 'Making complex decisions tangible.',
    category: ['Data'],
    tag: 'DECISION INTELLIGENCE',
    context: 'MaREI · Ireland',
    status: 'Research project',
    repo: 'MCDA-Tool-2.0',
    stack: ['JavaScript', 'D3.js', 'Excel', 'Node.js'],
    featuredImage: {
      src: '/projects/mcda/mcda-overview.webp',
      width: 1440,
      height: 1000,
      alt: 'MCDA interface showing synthetic alternatives, rankings and charts',
      caption:
        'Shows the working decision interface with public synthetic data; I built the adjustable ranking and visual analysis workflow.',
    },
    gallery: [
      {
        src: '/projects/mcda/mcda-input-ranking.webp',
        width: 696,
        height: 699,
        alt: 'Synthetic MCDA input table beside a weighted ranking',
        caption:
          'Shows synthetic inputs and the live weighted ranking; I connected structured criteria to an immediately readable result.',
      },
      {
        src: '/projects/mcda/mcda-weight-settings.webp',
        width: 696,
        height: 469,
        alt: 'MCDA criterion weight controls using synthetic data',
        caption:
          'Shows criterion-weight controls for a synthetic scenario; I made priorities adjustable and visible instead of hiding them in a calculation.',
      },
      {
        src: '/projects/mcda/mcda-pareto-analysis.webp',
        width: 696,
        height: 673,
        alt: 'Pareto analysis in the MCDA tool using synthetic alternatives',
        caption:
          'Shows a Pareto view of synthetic alternatives; I added a second lens for identifying trade-offs beyond a single score.',
      },
      {
        src: '/projects/mcda/mcda-topsis-method.webp',
        width: 696,
        height: 493,
        alt: 'TOPSIS method selection and sensitivity controls in the MCDA tool',
        caption:
          'Shows TOPSIS and sensitivity controls on synthetic data; I exposed method choice so users can compare how assumptions affect ranking.',
      },
    ],
    summary:
      'An interactive decision tool for exploring the trade-offs in end-of-life tyre recovery.',
    problem:
      'How do you compare recovery options when environmental, technical and economic priorities compete?',
    contribution:
      'I developed the interactive analysis tool during The End of Tire research project at MaREI, translating data and decision models into adjustable rankings.',
    approach:
      'Structured Excel inputs, adjustable criteria and weights, value locking, and live weighted-sum visualisation make assumptions visible.',
    outcome:
      'The research compared five alternatives within a team of more than seven people. The tool supports user-defined inputs; no time-saving or performance uplift is claimed.',
    next: 'Extend the case study with documented validation and additional sensitivity scenarios.',
    facts: [
      '5 research alternatives',
      '7+ team members',
      'Adjustable decision weights',
    ],
    steps: ['Excel inputs', 'Weighted model', 'Ranked alternatives'],
    source: 'README.txt',
  },
  {
    id: 'drone',
    number: '02',
    title: 'Drone Monitoring',
    subtitle: 'From telemetry to a clearer picture.',
    category: ['Data'],
    tag: 'REAL-TIME DATA',
    context: 'Sun Yat-sen University',
    status: 'Demonstration platform',
    repo: 'Drone-monitoring-platform-demo',
    stack: ['React', 'WebSocket', 'InfluxDB', 'Docker'],
    featuredImage: {
      src: '/projects/drone/drone-dashboard.webp',
      width: 1440,
      height: 1000,
      alt: 'Drone monitoring dashboard displaying simulated telemetry',
      caption:
        'Shows a simulated flight across map, status and telemetry panels; I connected the incoming data flow to a continuously updated monitoring view.',
    },
    gallery: [
      {
        src: '/projects/drone/drone-flight-snapshot.webp',
        width: 494,
        height: 658,
        alt: 'Drone flight status and telemetry using simulated data',
        caption:
          'Shows simulated flight status and changing telemetry; I organised operational signals into a compact scan-friendly panel.',
      },
      {
        src: '/projects/drone/drone-map-trajectory.webp',
        width: 741,
        height: 658,
        alt: 'Simulated drone trajectory and current position on a map panel',
        caption:
          'Shows a simulated route and current position; I linked location updates to a persistent trajectory view.',
      },
      {
        src: '/projects/drone/drone-tablet.webp',
        width: 768,
        height: 1431,
        alt: 'Responsive tablet layout of the simulated drone monitoring dashboard',
        caption:
          'Shows the same simulated monitoring flow at tablet width; I adapted the dense dashboard into a responsive vertical sequence.',
      },
    ],
    summary:
      'A telemetry pipeline connecting live data, time-series storage and a map dashboard.',
    problem:
      'How can incoming drone telemetry become a useful, continuously updated monitoring view?',
    contribution:
      'I worked on the data monitoring platform at Sun Yat-sen University, connecting data ingestion, storage and interactive dashboards.',
    approach:
      'HTTP telemetry enters the API, is stored in InfluxDB and streamed over WebSocket to a React and Leaflet dashboard.',
    outcome:
      'The public demo includes a simulator and trajectory status. It demonstrates the data flow rather than a verified production fleet or benchmark.',
    next: 'Add documented load tests and clearer operational diagnostics.',
    facts: ['HTTP → WebSocket', 'Time-series storage', 'Map visualisation'],
    steps: ['Telemetry API', 'InfluxDB + stream', 'Live dashboard'],
    source: 'README.md',
  },
  {
    id: 'motai',
    number: '03',
    title: 'MoTai',
    subtitle: 'More structure. More room to create.',
    category: ['AI', 'Product'],
    tag: 'HUMAN-CENTRED AI',
    context: 'Independent collaboration',
    status: 'Actively maintained',
    repo: 'MoTai-Story',
    stack: ['Electron', 'JavaScript', 'Local JSON', 'AI APIs'],
    featuredImage: {
      src: '/projects/motai/motai-writing-workspace.webp',
      width: 1440,
      height: 900,
      alt: 'MoTai chapter-writing workspace with fictional portfolio content',
      caption:
        'Shows a chapter draft beside its story context; I developed the local-first workspace that keeps planning and writing connected.',
    },
    gallery: [
      {
        src: '/projects/motai/motai-story-bible.webp',
        width: 1440,
        height: 900,
        alt: 'MoTai story bible containing fictional portfolio content',
        caption:
          'Shows the story bible for a fictional portfolio example; I structured premise, conflict, outline and chapter plans as reusable context.',
      },
      {
        src: '/projects/motai/motai-ai-workspace.webp',
        width: 1440,
        height: 900,
        alt: 'MoTai AI-assisted writing panel without a configured provider',
        caption:
          'Shows the AI-assisted writing workspace with no provider configured; I kept AI optional so the core authoring flow remains local and usable.',
      },
      {
        src: '/projects/motai/motai-export-workflow.webp',
        width: 1440,
        height: 900,
        alt: 'MoTai export menu with document format options',
        caption:
          'Shows the export workflow across common document formats; I added a clear hand-off from the writing workspace to shareable files.',
      },
    ],
    summary:
      'A local-first writing workspace that connects characters, world-building and AI-assisted chapters.',
    problem:
      'How can AI support a long story without losing its characters, context or the writer’s control?',
    contribution:
      'I began MoTai with a friend and developed AI-assisted writing workflows around story outlines, character settings and human review.',
    approach:
      'A story bible, relationships and timeline supply context to configurable AI services. Content is stored locally with exports and backups.',
    outcome:
      'The desktop application supports planning and chapter writing in a connected workspace. AI services require a user-configured provider.',
    next: 'Continue improving continuity checks and the author’s ability to review generated content.',
    facts: [
      'Local-first workspace',
      'Configurable AI providers',
      'Backup & export',
    ],
    steps: ['Story context', 'AI-assisted draft', 'Author review'],
    source: 'README.md',
  },
  {
    id: 'connoisseur',
    number: '04',
    title: 'Connoisseur',
    subtitle: 'A clearer path from request to order.',
    category: ['Product'],
    tag: 'BUSINESS SYSTEMS',
    context: 'Independent collaboration',
    status: 'Mock-first MVP',
    repo: 'connoisseur',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Mock data'],
    featuredImage: {
      src: '/projects/connoisseur/connoisseur-quote-timeline.webp',
      width: 1440,
      height: 1000,
      alt: 'Connoisseur demo order showing a quotation and sourcing timeline',
      caption:
        'Shows a fictional order moving from quotation to fulfilment; I designed the customer view around decisions, payment state and progress.',
    },
    gallery: [
      {
        src: '/projects/connoisseur/connoisseur-home.webp',
        width: 1440,
        height: 1000,
        alt: 'Connoisseur mock-first sourcing service home page',
        caption:
          'Shows the sourcing proposition and entry points; I framed the product around request-led procurement rather than a catalogue or cart.',
      },
      {
        src: '/projects/connoisseur/connoisseur-request-intake.webp',
        width: 1440,
        height: 1000,
        alt: 'Connoisseur structured sourcing request form with fictional data',
        caption:
          'Shows the structured request flow with fictional data; I broke an ambiguous sourcing brief into reviewable information blocks.',
      },
      {
        src: '/projects/connoisseur/connoisseur-request-contact.webp',
        width: 1216,
        height: 575,
        alt: 'Connoisseur request contact section containing sanitized demo details',
        caption:
          'Shows the final contact and consent step with sanitized demo details; I kept submission gated behind an account while making the requirement explicit.',
      },
      {
        src: '/projects/connoisseur/connoisseur-account-overview.webp',
        width: 1440,
        height: 1000,
        alt: 'Connoisseur demo account overview with fictional orders',
        caption:
          'Shows the buyer account with fictional orders and no personal customer data; I grouped requests, quotes and next actions into one operational view.',
      },
    ],
    summary:
      'A sourcing workspace bringing requests, quotes and customer case histories together.',
    problem:
      'How can a cross-border sourcing request stay understandable as it moves through quotes and fulfilment?',
    contribution:
      'I began this project with a friend to organise international commerce information into a practical sourcing and procurement workflow.',
    approach:
      'Customer cases connect requests, quotations, addresses and a timeline; an admin workspace supports the other side of the process.',
    outcome:
      'The current MVP uses in-memory data and mock payments. Supabase is a planned migration target, not a connected production database.',
    next: 'Validate the workflow, then migrate persistence and payments to production services.',
    facts: [
      'Request → quote → order',
      'Customer & admin views',
      'Mock payments',
    ],
    steps: ['Customer request', 'Quote & approval', 'Sourcing timeline'],
    source: 'README.md',
  },
];
export const experience = [
  {
    date: 'MAY 2026 — PRESENT',
    role: 'E-commerce Operator Specialist',
    company: 'Triple A internetshops GmbH',
    highlights: [
      'Review sales, traffic, fees and product performance across European marketplaces.',
      'Manage marketplace operations across eight markets and approximately 2,000 SKUs per marketplace.',
    ],
    project: null,
    text: 'European marketplace operations, with a focus on product and commercial performance.',
  },
  {
    date: 'JAN — APR 2026',
    role: 'Data Platform Full-stack Engineer',
    company: 'Sun Yat-sen University',
    highlights: [
      'Connect telemetry ingestion, time-series storage and dashboard updates.',
      'Present incoming signals through interactive maps and monitoring views.',
    ],
    project: 'drone',
    text: 'Developed data ingestion, time-series analysis and interactive monitoring dashboards.',
  },
  {
    date: 'MAY — SEP 2025',
    role: 'Data Analyst Intern',
    company: 'MaREI · Cork, Ireland',
    highlights: [
      'Clean and structure inputs for multi-criteria decision analysis.',
      'Explore competing recovery options through adjustable weights and sensitivity analysis.',
    ],
    project: 'mcda',
    text: 'Applied MCDA, data cleaning and sensitivity analysis to energy recovery decisions.',
  },
];
// Populate only after credential details and verification URLs have been supplied.
export const certificates: {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}[] = [];
