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
  // Exported from /resume/ (phone number never included).
  resumePdf: '/jiaming-li-resume.pdf',
  resumePdfZh: '/jiaming-li-resume-zh.pdf',
};

type Image = { src: string; width: number; height: number; caption: Text };
// deployment = main case studies; supporting = smaller proof of a skill; also = one-line mention.
export type Tier = 'deployment' | 'supporting' | 'also';
export type Project = {
  id: string;
  tier: Tier;
  /** Position within its tier (lower first). */
  rank: number;
  /** Drafts are kept in the data but never rendered, linked or exported. */
  draft?: boolean;
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
  // Every case follows: business problem → constraints → what I built → result → next.
  problem: Text;
  constraints: Text;
  built: Text;
  result: Text;
  next: Text;
  facts: TextList;
  gallery: Image[];
};

export const projects: Project[] = [
  // Reserved flagship slot. Fill every field with confirmed facts (no invented numbers),
  // add screenshots built on synthetic data, add 'listing-compliance' to scripts/build.mjs,
  // then delete `draft: true` to publish it as Deployment 01.
  {
    id: 'listing-compliance',
    tier: 'deployment',
    rank: 1,
    draft: true,
    cat: ['AI', 'Data'],
    repo: '',
    image: {
      src: '/projects/mcda/mcda-overview.webp',
      width: 1440,
      height: 1000,
      caption: { en: 'TODO', zh: 'TODO' },
    },
    title: {
      en: 'Multilingual Listing Compliance Checker',
      zh: '多语言 Listing 合规检查工具',
    },
    tag: { en: 'Applied AI', zh: '应用 AI' },
    ctx: { en: 'TODO', zh: 'TODO' },
    status: { en: 'TODO', zh: 'TODO' },
    subtitle: { en: 'TODO', zh: 'TODO' },
    summary: { en: 'TODO', zh: 'TODO' },
    stack: 'TODO',
    problem: { en: 'TODO', zh: 'TODO' },
    constraints: { en: 'TODO', zh: 'TODO' },
    built: { en: 'TODO', zh: 'TODO' },
    result: { en: 'TODO', zh: 'TODO' },
    next: { en: 'TODO', zh: 'TODO' },
    facts: { en: [], zh: [] },
    gallery: [],
  },
  {
    id: 'mcda',
    tier: 'deployment',
    rank: 3,
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
    constraints: {
      en: 'The existing process lived in Excel. Researchers needed to change criteria and weights themselves, and every ranking had to stay explainable rather than a black-box score.',
      zh: '原有流程基于 Excel。研究人员需要自己调整准则与权重，每个排序结果都必须可解释，而不是一个黑箱分数。',
    },
    built: {
      en: 'I developed the interactive analysis tool during The End of Tire research project at MaREI: structured Excel inputs, adjustable criteria and weights, value locking, and live weighted-sum, TOPSIS and Pareto views that make assumptions visible.',
      zh: '我在 MaREI 的 The End of Tire 研究项目中开发了这个交互式分析工具：结构化的 Excel 输入、可调的准则与权重、数值锁定，以及实时的加权求和、TOPSIS 与帕累托视图，让每个假设都清晰可见。',
    },
    result: {
      en: 'The research compared five alternatives within a team of more than seven people. The tool supports user-defined inputs; no time-saving or performance uplift is claimed.',
      zh: '研究团队（7 人以上）用它比较了 5 种方案。工具支持用户自定义输入；不声称节省时间或提升绩效。',
    },
    next: {
      en: 'Extend the case study with documented validation and additional sensitivity scenarios.',
      zh: '补充有记录的验证过程，并增加更多敏感性分析场景。',
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
    tier: 'deployment',
    rank: 2,
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
    constraints: {
      en: 'Telemetry arrives continuously, so the view has to update without reloads. The public demo must run entirely on simulated data, separate from the production platform.',
      zh: '遥测数据持续涌入，界面必须在不刷新的情况下实时更新；公开演示版必须完全使用模拟数据，与生产平台分开。',
    },
    built: {
      en: 'I built a personal real-time UAV telemetry demo and co-developed a separate production platform at Sun Yat-sen University. Telemetry enters an HTTP API, is stored in InfluxDB and streamed over WebSocket to a React and Leaflet dashboard.',
      zh: '我独立开发了实时无人机遥测演示版，并在中山大学参与开发另一套生产平台。遥测数据经 HTTP 进入 API，存入 InfluxDB，再通过 WebSocket 推送到 React + Leaflet 看板。',
    },
    result: {
      en: 'The public demo includes a simulator and trajectory status. Screens shown here come from the demo with simulated data.',
      zh: '公开演示版包含模拟器与轨迹状态。本页截图均来自演示版，使用模拟数据。',
    },
    next: {
      en: 'Add documented load tests and clearer operational diagnostics.',
      zh: '补充有记录的压力测试，并提供更清晰的运行诊断信息。',
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
    tier: 'supporting',
    rank: 1,
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
    constraints: {
      en: 'Stories stay on the writer’s machine, AI has to remain optional, and the model provider must be configurable rather than hard-wired.',
      zh: '作品必须保存在作者本地，AI 功能必须是可选的，模型服务商也必须可配置而非写死。',
    },
    built: {
      en: 'I began MoTai with a friend and developed the AI-assisted writing workflows. A story bible, relationships and a timeline are passed as structured context to configurable LLM APIs, with human review of generated text, local storage, exports and backups.',
      zh: '我和朋友一起发起 MoTai，并开发了 AI 辅助写作流程：故事设定集、人物关系和时间线作为结构化上下文传给可配置的大模型 API，生成内容经人工审阅，数据本地存储，支持导出与备份。',
    },
    result: {
      en: 'The desktop application supports planning and chapter writing in a connected workspace. AI services require a user-configured provider.',
      zh: '桌面应用在同一工作台内支持规划与章节写作。AI 功能需用户自行配置服务商。',
    },
    next: {
      en: 'Continue improving continuity checks and the author’s ability to review generated content.',
      zh: '继续改进剧情连贯性检查，并让作者更方便地审阅生成内容。',
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
    tier: 'also',
    rank: 1,
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
    constraints: {
      en: 'No production backend yet: the MVP had to prove the workflow with in-memory data and mock payments before any real persistence or payment provider.',
      zh: '尚无生产后端：MVP 需要先用内存数据和模拟支付验证流程，再接入真实的数据存储与支付服务。',
    },
    built: {
      en: 'I began this project with a friend to organise international commerce information into a sourcing workflow. Customer cases connect requests, quotations, addresses and a timeline; an admin workspace supports the other side of the process.',
      zh: '我和朋友一起发起这个项目，把跨境商务信息整理成采购流程：客户案例串联需求、报价、地址和时间线，后台工作台支撑流程的另一端。',
    },
    result: {
      en: 'The current MVP uses in-memory data and mock payments. Supabase is a planned migration target, not a connected production database.',
      zh: '当前 MVP 使用内存数据和模拟支付；计划迁移到 Supabase，尚未接入生产数据库。',
    },
    next: {
      en: 'Validate the workflow, then migrate persistence and payments to production services.',
      zh: '先验证流程，再把数据存储与支付迁移到生产服务。',
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

const tierOrder: Record<Tier, number> = { deployment: 0, supporting: 1, also: 2 };
/** Published projects in display order: deployments, then supporting, then also-built. */
export const published = projects
  .filter((p) => !p.draft)
  .sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier] || a.rank - b.rank);
export const byTier = (tier: Tier) => published.filter((p) => p.tier === tier);
/** Two-digit display number, counted across published projects. */
export const projectNumber = (p: Project) =>
  String(published.indexOf(p) + 1).padStart(2, '0');

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
        'Work in restricted product categories where advertising is not allowed, so listing quality and compliance are the main levers.',
        'Analyse sales, traffic, fee, product and competitor data to identify optimisation opportunities.',
        'Keyword, competitor and product research with Seller Central, Helium 10, Keepa and Amalytix.',
      ],
      zh: [
        '负责亚马逊欧洲 8 个站点的日常运营，每个站点约 2,000 个 SKU。',
        '所在品类受限、不允许投放广告，商品页质量与合规是最主要的抓手。',
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
    ['AI & ML', 'LLM APIs · Structured outputs · Transformers & embeddings · scikit-learn · Workflow automation'],
    ['Engineering', 'Python · JavaScript/TypeScript · React · InfluxDB · WebSocket · Docker · Git'],
    ['Data & BI', 'SQL · Python · Excel · Power BI · Tableau'],
    ['E-commerce ops', 'Seller Central · Helium 10 · Keepa · Amalytix'],
  ],
  zh: [
    ['AI 与机器学习', 'LLM API · 结构化输出 · Transformer 与向量嵌入 · scikit-learn · 自动化工作流'],
    ['工程开发', 'Python · JavaScript/TypeScript · React · InfluxDB · WebSocket · Docker · Git'],
    ['数据与 BI', 'SQL · Python · Excel · Power BI · Tableau'],
    ['电商运营', 'Seller Central · Helium 10 · Keepa · Amalytix'],
  ],
};

/** Which of ui.heroOptions is live on the home page ('A' | 'B' | 'C'). */
export const heroChoice: 'A' | 'B' | 'C' = 'A';

// Interface copy shared by every page.
export const ui = {
  nav: {
    experience: { en: 'Experience', zh: '经历' },
    ai: { en: 'AI', zh: 'AI' },
    work: { en: 'Deployments', zh: '部署案例' },
    about: { en: 'About', zh: '关于' },
    contact: { en: 'Contact', zh: '联系' },
  },
  resume: { en: 'Résumé', zh: '简历' },
  status: {
    en: 'Based in China · Open to Dublin and the EU · Visa sponsorship required',
    zh: '现居中国 · 可前往都柏林及欧盟 · 需工作签证担保',
  },
  roles: {
    en: 'Forward Deployed Engineer · Applied AI Engineer · Solutions Engineer · Sales & Business Operations',
    zh: '前线部署工程师 · 应用 AI 工程师 · 解决方案工程师 · 销售与业务运营',
  },
  // Three hero options; `heroChoice` picks the live one.
  // Title parts are [before, accent, after]; "\n" becomes a line break.
  heroOptions: {
    A: {
      title: {
        en: ['I deploy ', 'data and AI tools', '\ninto real business workflows.'],
        zh: ['把', '数据与 AI 工具', '\n部署进真实的业务流程。'],
      } as TextList,
      sub: {
        en: 'I scope the problem with the people who own it, build the tool, and make it run reliably, from marketplace operations to production monitoring.',
        zh: '和业务负责人一起界定问题，动手构建工具，并让它稳定运行：从电商运营到生产监控。',
      },
    },
    B: {
      title: {
        en: ['AI that ships ', 'into the workflow', ',\nnot the slide deck.'],
        zh: ['让 AI ', '真正进入工作流', '，\n而不是停留在演示稿里。'],
      } as TextList,
      sub: {
        en: 'I build and deploy data and AI tools where the work happens, with schema checks, evaluation and human review built in.',
        zh: '在工作真正发生的地方构建并部署数据与 AI 工具，内置结构校验、评估与人工审核。',
      },
    },
    C: {
      title: {
        en: ['From business problem\nto ', 'deployed tool', '.'],
        zh: ['从业务问题，\n到', '上线运行的工具', '。'],
      } as TextList,
      sub: {
        en: 'Applied AI and data engineering for operations teams: real-time monitoring, decision support and LLM integrations, built to run every day.',
        zh: '面向业务团队的应用 AI 与数据工程：实时监控、决策支持与大模型集成，为每天稳定运行而构建。',
      },
    },
  },
  heroHint: {
    en: 'Move your cursor to structure the data',
    zh: '移动鼠标，把原始数据结构化',
  },
  heroHintTouch: {
    en: 'Scroll to structure the data',
    zh: '向下滑动，把原始数据结构化',
  },
  aboutHello: {
    en: 'Hi, I’m Jiaming Li. I build and deploy data and AI tools for business teams.',
    zh: '你好，我是李嘉铭。我为业务团队构建并部署数据与 AI 工具。',
  },
  heroIntro: {
    en: 'I currently run Amazon marketplace operations across eight European markets in restricted categories. Before that, I co-developed a real-time monitoring platform at Sun Yat-sen University and built a decision tool for a research team at MaREI in Ireland.',
    zh: '目前负责亚马逊欧洲 8 个站点的运营与数据分析。此前在爱尔兰 MaREI 研究中心和中山大学搭建过决策工具与数据管道。',
  },
  seeWork: { en: 'See deployments ↓', zh: '查看部署案例 ↓' },
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
      label: { en: 'Focus', zh: '方向' },
      value: {
        en: 'Applied AI · Solutions · Ops',
        zh: '应用 AI · 解决方案 · 业务运营',
      },
    },
    {
      label: { en: 'Stack', zh: '技术栈' },
      value: {
        en: 'Python · SQL · LLM APIs · React',
        zh: 'Python · SQL · LLM API · React',
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
      en: 'Converts well but lacks traffic: improve keywords and search visibility.',
      zh: '转化不错但流量不足：优化关键词与搜索曝光。',
    },
    weak: {
      en: 'Low traffic and low conversion: review listing content and assortment first.',
      zh: '流量和转化都偏低：先检查商品页内容与选品。',
    },
    mean: { en: 'Average', zh: '平均' },
    note: {
      en: 'Illustrative numbers only, not company data.',
      zh: '数字仅作演示，并非公司真实数据。',
    },
  },
  // AI section: production practice first, theory in one line. Demo numbers are synthetic.
  ai: {
    title: { en: 'AI in production', zh: '在生产环境中用好 AI' },
    lead: {
      en: 'Calling a model is the easy part. The work is making its output dependable enough to sit inside a business process.',
      zh: '调用模型并不难，难的是让模型输出足够可靠，能真正嵌入业务流程。',
    },
    points: [
      {
        k: { en: 'Schema validation', zh: '结构校验' },
        v: {
          en: 'Model output is typed JSON, validated against a schema before anything downstream reads it.',
          zh: '模型输出为有类型的 JSON，下游使用前先按 Schema 校验。',
        },
      },
      {
        k: { en: 'Evaluation', zh: '评估' },
        v: {
          en: 'A fixed set of test cases with expected answers, re-run whenever a prompt or model changes.',
          zh: '维护一组带预期答案的固定测试用例，每次修改提示词或更换模型都重新运行。',
        },
      },
      {
        k: { en: 'Human review', zh: '人工审核' },
        v: {
          en: 'Flagged or low-confidence results go to a review queue; a person approves before anything is published.',
          zh: '被标记或置信度低的结果进入审核队列，由人确认后才发布。',
        },
      },
      {
        k: { en: 'Error handling', zh: '错误处理' },
        v: {
          en: 'Retries with backoff, a fallback path when a provider fails, and a log entry for every call so failures can be traced.',
          zh: '带退避的重试、服务商失败时的兜底路径，每次调用都有日志，便于追踪问题。',
        },
      },
    ],
    foundations: {
      en: 'Foundations: machine learning and neural networks from applied mathematics, transformer internals (tokens, embeddings, self-attention), scikit-learn models, and LLM APIs integrated into MoTai.',
      zh: '基础：应用数学打下的机器学习与神经网络功底，理解 Transformer 内部机制（分词、向量嵌入、自注意力），用过 scikit-learn 建模，并在 MoTai 中集成了大模型 API。',
    },
    lab: {
      tabs: {
        pipeline: { en: 'Production pipeline', zh: '生产流水线' },
        attention: { en: 'Self-attention', zh: '自注意力' },
      },
      kicker: { en: 'Interactive · synthetic data', zh: '可交互 · 模拟数据' },
      attention: {
        file: 'attention.head-1',
        hint: {
          en: 'Hover a token to see where it looks. Each row of the matrix sums to 1 after softmax.',
          zh: '把鼠标移到某个词上，看它在“关注”哪些词。经过 softmax 后，矩阵每一行之和为 1。',
        },
        attends: { en: 'attends most to', zh: '最关注' },
        query: { en: 'Query', zh: '查询词' },
        keys: { en: 'Keys', zh: '键' },
        note: {
          en: 'Hand-set weights to illustrate the mechanism; not output from a trained model.',
          zh: '权重为手工设定，仅用于说明机制，并非训练模型的实际输出。',
        },
      },
      pipeline: {
        file: 'listing-check.pipeline',
        run: { en: 'Run pipeline ▶', zh: '运行流水线 ▶' },
        running: { en: 'Running…', zh: '运行中…' },
        rerun: { en: 'Run again ↻', zh: '再运行一次 ↻' },
        steps: [
          {
            label: { en: 'Load listing export', zh: '加载商品数据导出' },
            out: { en: 'synthetic sample · several languages', zh: '模拟样本 · 多种语言' },
            warn: false,
          },
          {
            label: { en: 'LLM API call · structured output', zh: '调用大模型 API · 结构化输出' },
            out: { en: 'one typed JSON result per listing', zh: '每个商品一条有类型的 JSON 结果' },
            warn: false,
          },
          {
            label: { en: 'Schema validation', zh: 'Schema 校验' },
            out: { en: 'invalid response → retried with backoff → valid', zh: '响应不合规 → 退避重试 → 通过' },
            warn: true,
          },
          {
            label: { en: 'Regression eval', zh: '回归评估' },
            out: { en: 'fixed test set re-run · all pass', zh: '固定测试集重跑 · 全部通过' },
            warn: false,
          },
          {
            label: { en: 'Human review queue', zh: '人工审核队列' },
            out: { en: 'flagged items approved or rejected', zh: '被标记的条目逐条确认或驳回' },
            warn: false,
          },
          {
            label: { en: 'Publish + log', zh: '发布并记录日志' },
            out: { en: 'every call traceable', zh: '每次调用都可追溯' },
            warn: false,
          },
        ],
        result: {
          en: 'Only validated, reviewed output reaches the live listing. Failures are retried or routed to a person, never silently dropped.',
          zh: '只有通过校验和审核的结果才会上线；失败会重试或转人工，绝不会被静默丢弃。',
        },
        note: {
          en: 'Simulated run on synthetic data, not real company or customer data.',
          zh: '基于模拟数据的演示运行，不含任何公司或客户真实数据。',
        },
      },
    },
  },
  relatedProject: { en: 'Related case: ', zh: '相关案例：' },
  workTitle: { en: 'Deployments', zh: '部署案例' },
  workIntro: {
    en: 'Each case follows the same structure: business problem, constraints, what I built, result, and what I would improve next.',
    zh: '每个案例按同一结构展开：业务问题、约束条件、我构建了什么、结果，以及下一步怎么改进。',
  },
  supportingTitle: { en: 'Supporting evidence', zh: '补充证明' },
  supportingTag: { en: 'LLM API integration', zh: '大模型 API 集成' },
  alsoBuilt: { en: 'Also built', zh: '其他项目' },
  aboutTitle: { en: 'About', zh: '关于我' },
  about: {
    en: 'My background brings together applied mathematics, computer science and European e-commerce operations. Having studied in Ireland, I work well in collaborative, international teams. I’m looking for Forward Deployed, Applied AI, Solutions Engineering or Sales & Business Operations roles. Based in China · Open to Dublin and the EU · Visa sponsorship required.',
    zh: '我的背景横跨应用数学、计算机科学与欧洲电商运营。在爱尔兰求学的经历让我习惯国际化、协作式的团队。我正在寻找前线部署工程师、应用 AI 工程师、解决方案工程师或销售与业务运营相关岗位。现居中国 · 可前往都柏林及欧盟 · 需工作签证担保。',
  },
  educationLabel: { en: 'Education', zh: '教育背景' },
  skillsLabel: { en: 'Skills', zh: '技能' },
  contactTitle: {
    en: 'Have a workflow worth deploying into?',
    zh: '有值得落地的业务流程？',
  },
  allProjects: { en: '← All deployments', zh: '← 全部案例' },
  viewSource: { en: 'View source on GitHub ↗', zh: '在 GitHub 查看源码 ↗' },
  // Fixed case structure labels, in order.
  caseSteps: {
    problem: { en: 'Business problem', zh: '业务问题' },
    constraints: { en: 'Constraints', zh: '约束条件' },
    built: { en: 'What I built', zh: '我构建了什么' },
    result: { en: 'Result', zh: '结果' },
    next: { en: 'What I’d improve next', zh: '下一步改进' },
  },
  walkthrough: { en: 'Interface walkthrough', zh: '界面一览' },
  stack: { en: 'Stack', zh: '技术栈' },
  nextProject: { en: 'Next case', zh: '下一个案例' },
  resumePage: {
    back: { en: '← Jiaming Li', zh: '← 李嘉铭' },
    download: { en: 'Download PDF ↓', zh: '下载 PDF ↓' },
    headline: {
      en: 'Applied AI · Solutions Engineering · Business Operations',
      zh: '应用 AI · 解决方案工程 · 业务运营',
    },
    summary: {
      en: 'I build and deploy data and AI tools into real business workflows. I currently run Amazon operations across eight European marketplaces in restricted categories, and have co-developed a production telemetry platform and built a decision tool for a research team. Applied-mathematics and computer-science background.',
      zh: '我把数据与 AI 工具构建并部署进真实的业务流程。现负责亚马逊欧洲 8 个站点在受限品类下的运营，曾参与开发生产级遥测监控平台，并为科研团队搭建决策工具。应用数学本科、计算机科学硕士。',
    },
    location: {
      en: 'Based in China · Open to Dublin and the EU · Visa sponsorship required',
      zh: '现居中国 · 可前往都柏林及欧盟 · 需工作签证担保',
    },
    experience: { en: 'Experience', zh: '工作经历' },
    projects: { en: 'Deployments', zh: '部署案例' },
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
      en: 'I deploy data and AI tools into real business workflows.',
      zh: '把数据与 AI 工具部署进真实的业务流程。',
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
