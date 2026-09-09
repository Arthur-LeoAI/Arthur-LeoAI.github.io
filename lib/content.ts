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
    text: 'Analyse sales, traffic, fees and product performance across eight European Amazon markets, managing approximately 2,000 SKUs per marketplace.',
  },
  {
    date: 'JAN — APR 2026',
    role: 'Data Platform Full-stack Engineer',
    company: 'Sun Yat-sen University',
    text: 'Developed data ingestion, time-series analysis and interactive monitoring dashboards.',
  },
  {
    date: 'MAY — SEP 2025',
    role: 'Data Analyst Intern',
    company: 'MaREI · Cork, Ireland',
    text: 'Applied MCDA, data cleaning and sensitivity analysis to energy recovery decisions.',
  },
];
