// Single source of truth for facts and copy. Every user-facing string is { en, zh }.
export type Lang = 'en' | 'zh';
export type Text = Record<Lang, string>;
export type TextList = Record<Lang, string[]>;
export type Category = 'Data' | 'AI' | 'Product';

export const profile = {
  name: { en: 'Jiaming Li', zh: '李嘉铭' } as Text,
  email: 'arthur.jiaming.li@gmail.com',
  github: 'https://github.com/Arthur-LeoAI',
  linkedin: 'https://www.linkedin.com/in/arthurjiamingli',
  story: 'https://jiaming-li-portfolio.arthurli2025.chatgpt.site',
  archive: 'https://arthur-leoai.github.io',
  resumePdf: '/jiaming-li-resume.pdf',
};

type Image = { src: string; width: number; height: number; caption: Text };
export type Project = {
  id: string;
  n: string;
  cat: Category[];
  repo: string;
  image: Image;
  title: Text;
  tag: Text;
  ctx: Text;
  status: Text;
  subtitle: Text;
  summary: Text;
  stack: string;
  problem: Text;
  contribution: Text;
  approach: Text;
  outcome: Text;
  facts: TextList;
  gallery: Image[];
};

export const projects: Project[] = [
  {
    id: 'mcda',
    n: '01',
    cat: ['Data'],
    repo: 'MCDA-Tool-2.0',
    image: {
      src: '/projects/mcda/mcda-overview.webp',
      width: 1440,
      height: 1000,
      caption: {
        en: 'MCDA interface showing synthetic alternatives, rankings and charts.',
        zh: 'MCDA 界面：模拟方案、排序与图表。',
      },
    },
    title: { en: 'MCDA Tool', zh: 'MCDA 决策工具' },
    tag: { en: 'Decision intelligence', zh: '决策分析' },
    ctx: { en: 'MaREI · Ireland', zh: 'MaREI · 爱尔兰' },
    status: { en: 'Research project', zh: '科研项目' },
    subtitle: {
      en: 'Making complex decisions tangible.',
      zh: '让复杂决策变得看得见、摸得着。',
    },
    summary: {
      en: 'An interactive decision tool for exploring the trade-offs in end-of-life tyre recovery.',
      zh: '交互式决策工具，用于比较废旧轮胎回收方案之间的取舍。',
    },
    stack: 'JavaScript · D3.js · Excel · Node.js',
    problem: {
      en: 'How do you compare recovery options when environmental, technical and economic priorities compete?',
      zh: '当环境、技术和经济目标互相冲突时，如何比较不同的回收方案？',
    },
    contribution: {
      en: 'I developed the interactive analysis tool during The End of Tire research project at MaREI, translating data and decision models into adjustable rankings.',
      zh: '我在 MaREI 的 The End of Tire 研究项目中开发了这个交互式分析工具，把数据和决策模型转化为可调节的排序。',
    },
    approach: {
      en: 'Structured Excel inputs, adjustable criteria and weights, value locking, and live weighted-sum visualisation make assumptions visible.',
      zh: '结构化的 Excel 输入、可调的准则与权重、数值锁定和实时加权可视化，让每个假设都清晰可见。',
    },
    outcome: {
      en: 'The research compared five alternatives within a team of more than seven people. The tool supports user-defined inputs; no time-saving or performance uplift is claimed.',
      zh: '研究团队（7 人以上）用它比较了 5 种方案。工具支持用户自定义输入；不声称节省时间或提升绩效。',
    },
    facts: {
      en: ['5 research alternatives', '7+ team members', 'Adjustable decision weights'],
      zh: ['5 个研究方案', '7+ 团队成员', '可调决策权重'],
    },
    gallery: [
      {
        src: '/projects/mcda/mcda-input-ranking.webp',
        width: 696,
        height: 699,
        caption: {
          en: 'Synthetic inputs beside the live weighted ranking.',
          zh: '模拟输入数据与实时加权排序。',
        },
      },
      {
        src: '/projects/mcda/mcda-weight-settings.webp',
        width: 696,
        height: 469,
        caption: {
          en: 'Criterion-weight controls for a synthetic scenario.',
          zh: '模拟场景下的准则权重控制。',
        },
      },
      {
        src: '/projects/mcda/mcda-pareto-analysis.webp',
        width: 696,
        height: 673,
        caption: {
          en: 'Pareto view for identifying trade-offs beyond a single score.',
          zh: '帕累托视图，用于识别单一得分之外的取舍。',
        },
      },
      {
        src: '/projects/mcda/mcda-topsis-method.webp',
        width: 696,
        height: 493,
        caption: {
          en: 'TOPSIS and sensitivity controls on synthetic data.',
          zh: '基于模拟数据的 TOPSIS 与敏感性分析控制。',
        },
      },
    ],
  },
  {
    id: 'drone',
    n: '02',
    cat: ['Data'],
    repo: 'Drone-monitoring-platform-demo',
    image: {
      src: '/projects/drone/drone-dashboard.webp',
      width: 1440,
      height: 1000,
      caption: {
        en: 'Drone monitoring dashboard displaying simulated telemetry.',
        zh: '无人机监控看板（模拟遥测数据）。',
      },
    },
    title: { en: 'Drone Monitoring', zh: '无人机监控平台' },
    tag: { en: 'Real-time data', zh: '实时数据' },
    ctx: { en: 'Sun Yat-sen University', zh: '中山大学' },
    status: { en: 'Demo + production platform', zh: '演示版 + 生产平台' },
    subtitle: {
      en: 'From telemetry to a clearer picture.',
      zh: '从遥测数据到一目了然的画面。',
    },
    summary: {
      en: 'A personal telemetry demo, plus a production monitoring platform I co-developed.',
      zh: '个人遥测演示项目，以及我参与开发的生产监控平台。',
    },
    stack: 'React · WebSocket · InfluxDB · Docker',
    problem: {
      en: 'How can incoming drone telemetry become a useful, continuously updated monitoring view?',
      zh: '如何把源源不断的无人机遥测数据变成有用、持续更新的监控视图？',
    },
    contribution: {
      en: 'I built a personal real-time UAV telemetry demo and co-developed a separate production platform at Sun Yat-sen University, connecting ingestion, storage, flight analytics and dashboards.',
      zh: '我独立开发了实时无人机遥测演示版，并在中山大学参与开发另一套生产平台，打通数据接入、存储、飞行分析与看板。',
    },
    approach: {
      en: 'HTTP telemetry enters the API, is stored in InfluxDB and streamed over WebSocket to a React and Leaflet dashboard.',
      zh: '遥测数据经 HTTP 进入 API，存入 InfluxDB，再通过 WebSocket 推送到 React + Leaflet 看板。',
    },
    outcome: {
      en: 'The public demo includes a simulator and trajectory status. Screens shown here come from the demo with simulated data.',
      zh: '公开演示版包含模拟器与轨迹状态。本页截图均来自演示版，使用模拟数据。',
    },
    facts: {
      en: ['HTTP → WebSocket', 'Time-series storage', 'Map visualisation'],
      zh: ['HTTP → WebSocket', '时序数据存储', '地图可视化'],
    },
    gallery: [
      {
        src: '/projects/drone/drone-flight-snapshot.webp',
        width: 494,
        height: 658,
        caption: {
          en: 'Simulated flight status and changing telemetry.',
          zh: '模拟飞行状态与实时遥测。',
        },
      },
      {
        src: '/projects/drone/drone-map-trajectory.webp',
        width: 741,
        height: 658,
        caption: {
          en: 'Simulated route and current position.',
          zh: '模拟航线与当前位置。',
        },
      },
      {
        src: '/projects/drone/drone-tablet.webp',
        width: 768,
        height: 1431,
        caption: {
          en: 'The monitoring flow at tablet width.',
          zh: '平板宽度下的监控界面。',
        },
      },
    ],
  },
  {
    id: 'motai',
    n: '03',
    cat: ['AI', 'Product'],
    repo: 'MoTai-Story',
    image: {
      src: '/projects/motai/motai-writing-workspace.webp',
      width: 1440,
      height: 900,
      caption: {
        en: 'MoTai chapter-writing workspace with fictional content.',
        zh: 'MoTai 章节写作工作台（虚构内容）。',
      },
    },
    title: { en: 'MoTai', zh: 'MoTai' },
    tag: { en: 'Human-centred AI', zh: '以人为本的 AI' },
    ctx: { en: 'Independent collaboration', zh: '独立合作项目' },
    status: { en: 'Actively maintained', zh: '持续维护' },
    subtitle: {
      en: 'More structure. More room to create.',
      zh: '结构更清晰，创作空间更大。',
    },
    summary: {
      en: 'A local-first writing workspace that connects characters, world-building and AI-assisted chapters.',
      zh: '本地优先的写作工作台，把人物、世界观与 AI 辅助章节连在一起。',
    },
    stack: 'Electron · JavaScript · Local JSON · AI APIs',
    problem: {
      en: 'How can AI support a long story without losing its characters, context or the writer’s control?',
      zh: 'AI 如何辅助长篇创作，同时不丢失人物、上下文和作者的掌控？',
    },
    contribution: {
      en: 'I began MoTai with a friend and developed AI-assisted writing workflows around story outlines, character settings and human review.',
      zh: '我和朋友一起发起 MoTai，围绕故事大纲、人物设定和人工审阅开发了 AI 辅助写作流程。',
    },
    approach: {
      en: 'A story bible, relationships and timeline supply context to configurable AI services. Content is stored locally with exports and backups.',
      zh: '故事设定集、人物关系和时间线为可配置的 AI 服务提供上下文；内容本地存储，支持导出与备份。',
    },
    outcome: {
      en: 'The desktop application supports planning and chapter writing in a connected workspace. AI services require a user-configured provider.',
      zh: '桌面应用在同一工作台内支持规划与章节写作。AI 功能需用户自行配置服务商。',
    },
    facts: {
      en: ['Local-first workspace', 'Configurable AI providers', 'Backup & export'],
      zh: ['本地优先', '可配置 AI 服务商', '备份与导出'],
    },
    gallery: [
      {
        src: '/projects/motai/motai-story-bible.webp',
        width: 1440,
        height: 900,
        caption: {
          en: 'Story bible for a fictional example.',
          zh: '虚构示例的故事设定集。',
        },
      },
      {
        src: '/projects/motai/motai-ai-workspace.webp',
        width: 1440,
        height: 900,
        caption: {
          en: 'AI-assisted writing panel, provider optional.',
          zh: 'AI 辅助写作面板，服务商可选。',
        },
      },
      {
        src: '/projects/motai/motai-export-workflow.webp',
        width: 1440,
        height: 900,
        caption: {
          en: 'Export to common document formats.',
          zh: '导出为常见文档格式。',
        },
      },
    ],
  },
  {
    id: 'connoisseur',
    n: '04',
    cat: ['Product'],
    repo: 'connoisseur',
    image: {
      src: '/projects/connoisseur/connoisseur-quote-timeline.webp',
      width: 1440,
      height: 1000,
      caption: {
        en: 'Demo order showing a quotation and sourcing timeline.',
        zh: '演示订单：报价与采购时间线。',
      },
    },
    title: { en: 'Connoisseur', zh: 'Connoisseur' },
    tag: { en: 'Business systems', zh: '业务系统' },
    ctx: { en: 'Independent collaboration', zh: '独立合作项目' },
    status: { en: 'Mock-first MVP', zh: 'MVP（模拟数据）' },
    subtitle: {
      en: 'A clearer path from request to order.',
      zh: '从需求到订单，路径更清晰。',
    },
    summary: {
      en: 'A sourcing workspace bringing requests, quotes and customer case histories together.',
      zh: '把采购需求、报价与客户案例记录整合到一起的工作台。',
    },
    stack: 'Next.js · TypeScript · Tailwind · Mock data',
    problem: {
      en: 'How can a cross-border sourcing request stay understandable as it moves through quotes and fulfilment?',
      zh: '跨境采购需求在报价和履约过程中，如何始终保持清晰可追踪？',
    },
    contribution: {
      en: 'I began this project with a friend to organise international commerce information into a practical sourcing and procurement workflow.',
      zh: '我和朋友一起发起这个项目，把跨境商务信息整理成实用的采购流程。',
    },
    approach: {
      en: 'Customer cases connect requests, quotations, addresses and a timeline; an admin workspace supports the other side of the process.',
      zh: '客户案例串联需求、报价、地址和时间线；后台工作台支撑流程的另一端。',
    },
    outcome: {
      en: 'The current MVP uses in-memory data and mock payments. Supabase is a planned migration target, not a connected production database.',
      zh: '当前 MVP 使用内存数据和模拟支付；计划迁移到 Supabase，尚未接入生产数据库。',
    },
    facts: {
      en: ['Request → quote → order', 'Customer & admin views', 'Mock payments'],
      zh: ['需求 → 报价 → 订单', '客户端与后台', '模拟支付'],
    },
    gallery: [
      {
        src: '/projects/connoisseur/connoisseur-home.webp',
        width: 1440,
        height: 1000,
        caption: {
          en: 'Sourcing proposition and entry points.',
          zh: '采购服务首页与入口。',
        },
      },
      {
        src: '/projects/connoisseur/connoisseur-request-intake.webp',
        width: 1440,
        height: 1000,
        caption: {
          en: 'Structured request flow with fictional data.',
          zh: '结构化需求表单（虚构数据）。',
        },
      },
      {
        src: '/projects/connoisseur/connoisseur-account-overview.webp',
        width: 1440,
        height: 1000,
        caption: {
          en: 'Buyer account with fictional orders.',
          zh: '买家账户总览（虚构订单）。',
        },
      },
    ],
  },
];

export const experience: {
  date: Text;
  role: Text;
  org: Text;
  points: TextList;
  project: string | null;
}[] = [
  {
    date: { en: 'May 2026 — Present', zh: '2026.05 — 至今' },
    role: { en: 'E-commerce Operator Specialist', zh: '电商运营专员' },
    org: {
      en: 'Triple A internetshops GmbH · Shenzhen',
      zh: 'Triple A internetshops GmbH · 深圳',
    },
    points: {
      en: [
        'Manage Amazon operations across eight European marketplaces, each with approximately 2,000 SKUs.',
        'Analyse sales, traffic, fee, product and competitor data to identify optimisation opportunities.',
        'Keyword, competitor and product research with Seller Central, Helium 10, Keepa and Amalytix.',
      ],
      zh: [
        '负责亚马逊欧洲 8 个站点的日常运营，每个站点约 2,000 个 SKU。',
        '分析销售、流量、费用、产品及竞品数据，发现优化机会。',
        '使用 Seller Central、Helium 10、Keepa、Amalytix 开展关键词、竞品与选品分析。',
      ],
    },
    project: null,
  },
  {
    date: { en: 'Jan — Apr 2026', zh: '2026.01 — 2026.04' },
    role: { en: 'Data Platform Full-stack Engineer', zh: '数据平台全栈工程师' },
    org: { en: 'Sun Yat-sen University · Shenzhen', zh: '中山大学 · 深圳' },
    points: {
      en: [
        'Built a real-time monitoring platform covering ingestion, storage, analysis and reporting.',
        'Time-series pipelines with InfluxDB and MySQL for monitoring and anomaly detection.',
        'Interactive map and status dashboards for operational analysis.',
      ],
      zh: [
        '搭建实时数据监控平台，覆盖数据接入、存储、分析与报表。',
        '基于 InfluxDB 与 MySQL 开发时序数据管道，用于监控与异常检测。',
        '开发交互式地图与状态看板，支持运营分析。',
      ],
    },
    project: 'drone',
  },
  {
    date: { en: 'May — Sep 2025', zh: '2025.05 — 2025.09' },
    role: { en: 'Data Analyst & Research Assistant', zh: '数据分析师 / 研究助理' },
    org: {
      en: 'MaREI, University College Cork · Ireland',
      zh: 'MaREI 研究中心，科克大学 · 爱尔兰',
    },
    points: {
      en: [
        'MCDA models to score and rank five tyre-recovery alternatives for a 7+ person research team.',
        'Python pipelines for data cleaning, validation and sensitivity analysis.',
        'Turned the Excel-based process into an interactive web tool.',
      ],
      zh: [
        '构建 MCDA 模型，为 7 人以上研究团队评分排序 5 种轮胎回收方案。',
        '用 Python 搭建数据清洗、校验与敏感性分析流程。',
        '将基于 Excel 的流程改造为交互式网页工具。',
      ],
    },
    project: 'mcda',
  },
];

export const education: { deg: Text; school: Text; date: Text; note: Text }[] =
  [
    {
      deg: {
        en: 'MSc Computer Science (Interactive Media)',
        zh: '计算机科学硕士（交互媒体）',
      },
      school: { en: 'University College Cork', zh: '爱尔兰科克大学' },
      date: { en: 'Sep 2024 – Mar 2026', zh: '2024.09 – 2026.03' },
      note: {
        en: 'Second Class Honours (2:1), top 10%',
        zh: '二等一荣誉（2:1），前 10%',
      },
    },
    {
      deg: {
        en: 'BSc Applied Mathematics (Data Computation)',
        zh: '应用数学学士（数据计算及应用）',
      },
      school: {
        en: 'Taiyuan University of Science and Technology',
        zh: '太原科技大学',
      },
      date: { en: 'Sep 2020 – Jun 2024', zh: '2020.09 – 2024.06' },
      note: { en: 'Top 10% of cohort', zh: '专业前 10%' },
    },
  ];

export const skills: Record<Lang, [string, string][]> = {
  en: [
    ['Data & BI', 'SQL · Python · Excel · Power BI · Tableau'],
    ['E-commerce', 'Seller Central · Helium 10 · Keepa · Amalytix'],
    ['Engineering', 'JavaScript/TypeScript · React · InfluxDB · Git'],
    ['AI & automation', 'LLM APIs · AI coding agents · Prompt design · Workflow automation'],
  ],
  zh: [
    ['数据与 BI', 'SQL · Python · Excel · Power BI · Tableau'],
    ['电商运营', 'Seller Central · Helium 10 · Keepa · Amalytix'],
    ['工程开发', 'JavaScript/TypeScript · React · InfluxDB · Git'],
    ['AI 与自动化', 'LLM API · AI 编程助手 · 提示词设计 · 自动化工作流'],
  ],
};

// Interface copy shared by every page.
export const ui = {
  nav: {
    experience: { en: 'Experience', zh: '经历' },
    ai: { en: 'AI', zh: 'AI' },
    work: { en: 'Work', zh: '项目' },
    about: { en: 'About', zh: '关于' },
    contact: { en: 'Contact', zh: '联系' },
  },
  resume: { en: 'Résumé', zh: '简历' },
  status: {
    en: 'Open to data analyst roles worldwide · visa sponsorship needed',
    zh: '正在寻找全球数据分析岗位 · 需工作签证担保',
  },
  // [before, accent, after]; a newline in `before` becomes a line break.
  heroTitle: {
    en: ['From ', 'messy business data', '\nto clear decisions.'],
    zh: ['把', '杂乱的业务数据', '\n变成清晰的决策。'],
  } as TextList,
  heroSub: {
    en: 'A data analyst who builds with AI: tools, websites and automated workflows.',
    zh: '用 AI 构建工具、网站与自动化工作流的数据分析师。',
  },
  heroHint: {
    en: 'Move your cursor to sort the noise',
    zh: '移动鼠标，让杂乱的数据归位',
  },
  heroHintTouch: {
    en: 'Scroll to sort the noise',
    zh: '向下滑动，让杂乱的数据归位',
  },
  aboutHello: {
    en: 'Hi, I’m Jiaming Li, a data analyst.',
    zh: '你好，我是李嘉铭，一名数据分析师。',
  },
  heroIntro: {
    en: 'I currently analyse Amazon marketplace performance across eight European markets. Before that, I built decision tools and data pipelines at MaREI in Ireland and Sun Yat-sen University.',
    zh: '目前负责亚马逊欧洲 8 个站点的运营与数据分析。此前在爱尔兰 MaREI 研究中心和中山大学搭建过决策工具与数据管道。',
  },
  seeWork: { en: 'See selected work ↓', zh: '查看项目 ↓' },
  facts: [
    {
      label: { en: 'Now', zh: '现任' },
      value: { en: 'E-commerce Operator, Triple A', zh: '电商运营专员，Triple A' },
    },
    {
      label: { en: 'Scope', zh: '范围' },
      value: {
        en: '8 EU markets · ~2,000 SKUs each',
        zh: '欧洲 8 站点 · 每站约 2,000 SKU',
      },
    },
    {
      label: { en: 'Education', zh: '学历' },
      value: { en: 'MSc Computer Science, UCC', zh: '科克大学 计算机硕士' },
    },
    {
      label: { en: 'Tools', zh: '工具' },
      value: {
        en: 'SQL · Python · Power BI · AI',
        zh: 'SQL · Python · Power BI · AI',
      },
    },
  ],
  experienceTitle: { en: 'Experience', zh: '工作经历' },
  // Interactive "market lens" beside Experience. Its numbers are synthetic.
  lens: {
    kicker: { en: 'Try it · synthetic data', zh: '动手试试 · 模拟数据' },
    title: { en: 'Which market needs attention?', zh: '哪个站点最需要关注？' },
    hint: {
      en: 'Switch the metric, then hover a market.',
      zh: '切换指标，再把鼠标移到某个站点上。',
    },
    market: { en: 'Market', zh: '站点' },
    metrics: {
      sales: { en: 'Sales', zh: '销售额' },
      traffic: { en: 'Traffic', zh: '流量' },
      conversion: { en: 'Conversion', zh: '转化率' },
    },
    flag: {
      en: 'High traffic, low conversion: check the listing and price first.',
      zh: '流量高、转化低：先检查商品页与定价。',
    },
    healthy: {
      en: 'Conversion at or above average: protect stock and visibility.',
      zh: '转化率不低于平均：重点保证库存与曝光。',
    },
    lowTraffic: {
      en: 'Converts well but lacks traffic: test ads and keywords.',
      zh: '转化不错但流量不足：试试广告与关键词。',
    },
    weak: {
      en: 'Low traffic and low conversion: review the assortment before spending on ads.',
      zh: '流量和转化都偏低：先梳理选品，再考虑投放广告。',
    },
    mean: { en: 'Average', zh: '平均' },
    note: {
      en: 'Illustrative numbers only, not company data.',
      zh: '数字仅作演示，并非公司真实数据。',
    },
  },
  // "Built with AI" section. The demo run is simulated.
  ai: {
    title: { en: 'Built with AI', zh: '用 AI 构建' },
    lead: {
      en: 'I treat AI as an everyday working tool: to build tools and websites faster, to automate the repetitive parts of analysis, and to leave more time for the judgement calls.',
      zh: '我把 AI 当作日常工作工具：更快地搭建工具和网站，把分析中重复的部分自动化，把时间留给真正需要判断的地方。',
    },
    points: [
      {
        k: { en: 'Build', zh: '构建' },
        v: {
          en: 'Prototype tools and websites with AI coding agents. This portfolio was designed and built that way.',
          zh: '用 AI 编程助手快速做出工具和网站原型。这个作品集网站就是这样设计和搭建的。',
        },
      },
      {
        k: { en: 'Automate', zh: '自动化' },
        v: {
          en: 'Chain cleaning, checks and reporting into repeatable AI-assisted workflows.',
          zh: '把数据清洗、校验和报表串成可重复运行的 AI 辅助工作流。',
        },
      },
      {
        k: { en: 'Apply', zh: '应用' },
        v: {
          en: 'Use LLMs in everyday analysis, from research and summaries to first drafts.',
          zh: '在日常分析中使用大模型：调研、总结、起草初稿。',
        },
      },
      {
        k: { en: 'Verify', zh: '把关' },
        v: {
          en: 'AI drafts, I check: every output passes a rule check or a human review.',
          zh: 'AI 起草，我来把关：每个结果都要经过规则校验或人工审阅。',
        },
      },
    ],
    demo: {
      kicker: { en: 'Demo · simulated run', zh: '演示 · 模拟运行' },
      file: 'weekly-report.workflow',
      run: { en: 'Run workflow ▶', zh: '运行工作流 ▶' },
      running: { en: 'Running…', zh: '运行中…' },
      rerun: { en: 'Run again ↻', zh: '再运行一次 ↻' },
      steps: [
        {
          label: { en: 'Pull marketplace export', zh: '拉取站点数据导出' },
          out: { en: '1,920 rows · 8 markets', zh: '1,920 行 · 8 个站点' },
        },
        {
          label: { en: 'AI cleans and tags listings', zh: 'AI 清洗并标注商品' },
          out: { en: '42 duplicates merged · 117 titles tagged', zh: '合并 42 条重复 · 标注 117 个标题' },
        },
        {
          label: { en: 'Rule checks', zh: '规则校验' },
          out: { en: '3 outliers flagged', zh: '标记 3 个异常值' },
        },
        {
          label: { en: 'Human review', zh: '人工审阅' },
          out: { en: '2 flags kept · 1 dismissed', zh: '保留 2 个 · 排除 1 个' },
        },
        {
          label: { en: 'Draft weekly summary', zh: '起草周报摘要' },
          out: { en: 'Ready to send', zh: '可以发送' },
        },
      ],
      result: {
        en: 'Market B: high traffic, low conversion. Check the listing and price first.',
        zh: '站点 B：流量高、转化低。建议先检查商品页与定价。',
      },
      note: {
        en: 'Simulated run with synthetic numbers, not real company data.',
        zh: '模拟运行，数字为虚构，并非公司真实数据。',
      },
    },
  },
  relatedProject: { en: 'Related project: ', zh: '相关项目：' },
  workTitle: { en: 'Selected work', zh: '精选项目' },
  workIntro: {
    en: 'Four projects at the intersection of data and product, from research questions to working systems.',
    zh: '四个数据与产品交汇的项目，从研究问题到可运行的系统。',
  },
  aboutTitle: { en: 'About', zh: '关于我' },
  about: {
    en: 'My background brings together applied mathematics, interactive media and European e-commerce. Having studied in Ireland, I value collaborative, international teams. I use AI every day to build tools and automate the repetitive parts of analysis. I’m based in China and open to relocating anywhere in the world where employer visa sponsorship is available.',
    zh: '我的背景横跨应用数学、交互媒体与欧洲电商。在爱尔兰求学的经历让我习惯国际化、协作式的团队。我每天都在用 AI 搭建工具、把分析中重复的部分自动化。目前在中国，愿意前往全球任何能提供工作签证担保的国家或地区工作。',
  },
  educationLabel: { en: 'Education', zh: '教育背景' },
  skillsLabel: { en: 'Skills', zh: '技能' },
  contactTitle: {
    en: 'Have a problem worth exploring?',
    zh: '有值得一起研究的问题？',
  },
  allProjects: { en: '← All projects', zh: '← 全部项目' },
  viewSource: { en: 'View source on GitHub ↗', zh: '在 GitHub 查看源码 ↗' },
  question: { en: 'The question', zh: '核心问题' },
  contribution: { en: 'My contribution', zh: '我的工作' },
  approach: { en: 'The approach', zh: '实现方式' },
  walkthrough: { en: 'Interface walkthrough', zh: '界面一览' },
  today: { en: 'What exists today', zh: '当前状态' },
  stack: { en: 'Stack', zh: '技术栈' },
  nextProject: { en: 'Next project', zh: '下一个项目' },
  resumePage: {
    back: { en: '← Jiaming Li', zh: '← 李嘉铭' },
    download: { en: 'Download PDF ↓', zh: '下载 PDF ↓' },
    headline: {
      en: 'Data Analyst · Business & Marketplace Analytics',
      zh: '数据分析师 · 商业与电商数据分析',
    },
    summary: {
      en: 'Data analyst with an applied-mathematics and computer-science background. I currently analyse Amazon marketplace performance across eight European markets, and have built decision-support tools, data pipelines and dashboards in research and university settings.',
      zh: '应用数学本科、计算机科学硕士。现负责亚马逊欧洲 8 个站点的运营与数据分析，曾在科研与高校项目中搭建决策支持工具、数据管道和可视化看板。',
    },
    location: {
      en: 'Shenzhen · open to relocating worldwide (visa sponsorship needed)',
      zh: '深圳 · 可前往全球工作（需工作签证担保）',
    },
    experience: { en: 'Experience', zh: '工作经历' },
    projects: { en: 'Projects', zh: '项目经历' },
    education: { en: 'Education', zh: '教育背景' },
    skills: { en: 'Skills', zh: '专业技能' },
    languages: { en: 'Languages', zh: '语言' },
    languagesValue: {
      en: 'English (IELTS 6.5), Chinese (native)',
      zh: '英语（雅思 6.5），中文（母语）',
    },
  },
  archive: {
    tagline: {
      en: 'Data analyst & practical tool builder.',
      zh: '数据分析师，也是动手做工具的人。',
    },
    nav: [
      { href: '#projects', label: { en: '01 — Projects', zh: '01 — 项目' } },
      { href: '#experience', label: { en: '02 — Experience', zh: '02 — 经历' } },
      { href: '/resume/', label: { en: '03 — Résumé', zh: '03 — 简历' } },
    ],
    open: { en: 'Open to opportunities', zh: '正在求职' },
    title: { en: 'Project archive', zh: '项目档案' },
    filters: {
      All: { en: 'All', zh: '全部' },
      Data: { en: 'Data', zh: '数据' },
      AI: { en: 'AI', zh: 'AI' },
      Product: { en: 'Product', zh: '产品' },
    },
  },
  skip: { en: 'Skip to content', zh: '跳到正文' },
  notFound: {
    label: { en: '404 · Page not found', zh: '404 · 页面不存在' },
    title: { en: 'A different direction.', zh: '换个方向看看。' },
    back: { en: 'Return to Jiaming’s portfolio →', zh: '返回李嘉铭的作品集 →' },
  },
} satisfies Record<string, unknown>;
