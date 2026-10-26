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
// Display priority only; lifecycle is explicitly described by each project's status.
export type Tier = 'featured' | 'supporting' | 'also';
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
  contribution: Text;
  built: Text;
  limitations: Text;
  evidence: Text;
  evidencePath: string;
  result: Text;
  next: Text;
  facts: TextList;
  gallery: Image[];
};

export const projects: Project[] = [
  // Reserved flagship slot. Fill every field with confirmed facts (no invented numbers),
  // add screenshots built on synthetic data, add 'listing-compliance' to scripts/build.mjs,
  // then delete `draft: true` to publish it as a featured case.
  {
    id: 'listing-compliance',
    tier: 'featured',
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
    status: {
      en: 'Planned · not published',
      zh: '计划中 · 未公开',
    },
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
    contribution: {
      en: 'Not yet documented.',
      zh: '尚未记录。',
    },
    limitations: {
      en: 'Planned project; not part of the published portfolio.',
      zh: '计划中项目，不属于已公开作品。',
    },
    evidence: {
      en: 'No completed evidence yet.',
      zh: '暂无已完成的证明材料。',
    },
    evidencePath: '',
  },
  {
    id: 'mcda',
    tier: 'featured',
    rank: 1,
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
    tag: { en: 'Process to tool', zh: '流程工具化' },
    ctx: { en: 'MaREI · Ireland', zh: 'MaREI · 爱尔兰' },
    status: {
      en: 'Completed research project',
      zh: '已完成的科研项目',
    },
    subtitle: {
      en: 'From a spreadsheet process to a tool people can explore.',
      zh: '从电子表格流程，到可以交互探索的工具。',
    },
    summary: {
      en: 'Turned an Excel-based research analysis into a web decision tool where criteria, weights and trade-offs are visible and adjustable.',
      zh: '把基于 Excel 的科研分析流程做成网页决策工具，让准则、权重与取舍清晰可见、可以调整。',
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
      en: 'Structured Excel inputs feed adjustable criteria and weights, value locking, and weighted-sum, TOPSIS and Pareto views. Rankings update as assumptions change, so the reasoning can be inspected.',
      zh: '把结构化 Excel 数据接入可调准则、权重与数值锁定功能，并以加权求和、TOPSIS 和帕累托视图呈现结果。假设变化时排序同步更新，便于检查推理过程。',
    },
    result: {
      en: 'The completed tool exposes editable inputs and live rankings in a web interface. The public source and synthetic-data screenshots demonstrate the analysis workflow; commercial adoption and time savings have not been measured.',
      zh: '已完成的工具提供可编辑输入和实时排序。公开源码与模拟数据截图展示了分析流程；尚未测量商业采用情况或节省的时间。',
    },
    next: {
      en: 'Extend the case study with documented validation and additional sensitivity scenarios.',
      zh: '补充有记录的验证过程，并增加更多敏感性分析场景。',
    },
    facts: {
      en: [
        'Excel input workflow',
        'Adjustable decision weights',
        'Weighted-sum, TOPSIS & Pareto',
      ],
      zh: ['Excel 数据输入', '可调决策权重', '加权求和、TOPSIS 与帕累托分析'],
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
    contribution: {
      en: 'I developed the interactive analysis tool during The End of Tire research project at MaREI, translating an Excel-based analysis process into a web interface.',
      zh: '我在 MaREI 的 The End of Tire 科研项目中开发交互分析工具，将基于 Excel 的分析流程转为网页界面。',
    },
    limitations: {
      en: 'Rankings depend on input quality, chosen criteria and weights. Public screenshots use synthetic alternatives; they do not establish an optimal real-world recovery decision or independently validate the research.',
      zh: '排序依赖输入质量、准则和权重。公开截图使用模拟方案，不能据此认定真实回收决策的最优解，也不构成对研究结果的独立验证。',
    },
    evidence: {
      en: 'README.txt documents Excel input, value locking and weighted ranking; app.js contains TOPSIS and Pareto implementations. Screenshots below show synthetic examples.',
      zh: 'README.txt 记录了 Excel 输入、数值锁定与加权排序；app.js 包含 TOPSIS 和帕累托实现。下方截图使用模拟示例。',
    },
    evidencePath: 'blob/main/README.txt',
  },
  {
    id: 'drone',
    tier: 'featured',
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
    tag: { en: 'Data flow & integration', zh: '数据流与系统集成' },
    ctx: {
      en: 'Personal demo · related university work',
      zh: '个人演示 · 关联高校工作经历',
    },
    status: {
      en: 'Working demo · simulated telemetry',
      zh: '可运行演示 · 模拟遥测',
    },
    subtitle: {
      en: 'From telemetry to a clearer picture.',
      zh: '从遥测数据到一目了然的画面。',
    },
    summary: {
      en: 'Connects an HTTP API, time-series storage and a WebSocket feed into a live monitoring dashboard (simulated telemetry).',
      zh: '把 HTTP API、时序存储和 WebSocket 推送串成一个实时监控看板（模拟遥测数据）。',
    },
    stack: 'React · WebSocket · InfluxDB · Docker',
    problem: {
      en: 'How can incoming drone telemetry become a useful, continuously updated monitoring view?',
      zh: '如何把源源不断的无人机遥测数据变成有用、持续更新的监控视图？',
    },
    constraints: {
      en: 'Telemetry needs to update without page reloads. The public demo uses simulated data and is separate from the university platform I co-developed.',
      zh: '遥测数据需要在不刷新页面的情况下持续更新。公开演示使用模拟数据，与我参与开发的高校平台分开。',
    },
    built: {
      en: 'An HTTP API accepts telemetry, stores it in InfluxDB and broadcasts updates over WebSocket. A React and Leaflet dashboard displays flight status, position and trajectory; Docker Compose supports local setup.',
      zh: 'HTTP API 接收遥测数据，存入 InfluxDB，再通过 WebSocket 广播更新。React 与 Leaflet 看板展示飞行状态、位置和轨迹；Docker Compose 支持本地启动。',
    },
    result: {
      en: 'The repository provides a simulator, sample payloads, a dashboard and local startup instructions. The public evidence demonstrates a monitoring workflow with simulated telemetry.',
      zh: '仓库提供模拟器、示例数据、看板和本地启动说明。公开材料展示的是基于模拟遥测的监控流程。',
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
    contribution: {
      en: 'I built the personal telemetry demo. Separately, I co-developed a monitoring platform at Sun Yat-sen University; this public case demonstrates the demo implementation, not the university deployment.',
      zh: '我独立开发了个人遥测演示版，另在中山大学参与开发监控平台。本公开案例展示演示版的实现，不代表高校平台的部署情况。',
    },
    limitations: {
      en: 'Simulated telemetry does not prove field reliability, production security, scale or operational impact. No deployment evidence or load-test results for the separate university platform are included here.',
      zh: '模拟遥测不能证明实地可靠性、生产安全性、规模或运营影响。此处未提供另一套高校平台的部署证据或压力测试结果。',
    },
    evidence: {
      en: 'The public README describes the HTTP API, WebSocket stream, InfluxDB setup, simulator and local run instructions. All portfolio captures use simulated telemetry.',
      zh: '公开 README 说明了 HTTP API、WebSocket 数据流、InfluxDB 配置、模拟器和本地运行方式。作品集截图全部使用模拟遥测数据。',
    },
    evidencePath: 'blob/main/README.md',
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
        en: 'Earlier MoTai interface with fictional content; the current repository has a revised workspace.',
        zh: 'MoTai 早期界面（虚构内容）；当前仓库已更新工作台。',
      },
    },
    title: { en: 'MoTai', zh: 'MoTai' },
    tag: { en: 'Human-centred AI', zh: '以人为本的 AI' },
    ctx: { en: 'Independent collaboration', zh: '独立合作项目' },
    status: {
      en: 'Working desktop prototype',
      zh: '可运行桌面原型',
    },
    subtitle: {
      en: 'More structure. More room to create.',
      zh: '结构更清晰，创作空间更大。',
    },
    summary: {
      en: 'A local-first writing prototype that connects story context, LLM APIs and author review in one workflow.',
      zh: '本地优先的写作原型，把故事上下文、大模型 API 与作者审核连接到同一流程。',
    },
    stack: 'Electron · JavaScript · Local JSON · AI APIs',
    problem: {
      en: 'How can AI support a long story without losing its characters, context or the writer’s control?',
      zh: 'AI 如何辅助长篇创作，同时不丢失人物、上下文和作者的掌控？',
    },
    constraints: {
      en: 'Manuscripts stay local. AI access depends on a configured runtime and provider; generated content needs author review before it becomes part of a story.',
      zh: '文稿保存在本地。AI 依赖运行环境及服务商配置；生成内容需经作者审核后才能写入作品。',
    },
    built: {
      en: 'Story materials and chapter context feed LLM-assisted planning and writing. The current repository documents draft review before writing, local storage, exports and backups, with AI credentials managed by the local runtime.',
      zh: '将故事资料与章节上下文用于大模型辅助规划和写作。当前仓库记录了写入前草案审核、本地存储、导出及备份功能；AI 凭据由本地运行环境管理。',
    },
    result: {
      en: 'A desktop prototype and source code are available. The current README describes planning, chapter writing and review before accepting generated material. Local beta work is ongoing; no user adoption or productivity gain is claimed.',
      zh: '已有桌面原型与源码。当前 README 说明了规划、章节写作及生成内容接受前的审核流程。本地内测工作仍在推进；不声称用户采用规模或生产力提升。',
    },
    next: {
      en: 'Complete the documented local beta checks and evaluate continuity and author review with representative writing tasks.',
      zh: '完成已记录的本地内测检查，并用有代表性的写作任务评估连贯性与作者审核流程。',
    },
    facts: {
      en: [
        'Local manuscript storage',
        'LLM-assisted drafting',
        'Author review before writing',
      ],
      zh: ['本地文稿存储', '大模型辅助草拟', '作者审核后写入'],
    },
    gallery: [
      {
        src: '/projects/motai/motai-story-bible.webp',
        width: 1440,
        height: 900,
        caption: {
          en: 'Earlier interface: story bible using fictional content.',
          zh: '早期界面：使用虚构内容的故事设定集。',
        },
      },
      {
        src: '/projects/motai/motai-ai-workspace.webp',
        width: 1440,
        height: 900,
        caption: {
          en: 'Earlier AI panel. Current provider access is managed by the local runtime.',
          zh: '早期 AI 面板。当前服务商访问由本地运行环境管理。',
        },
      },
      {
        src: '/projects/motai/motai-export-workflow.webp',
        width: 1440,
        height: 900,
        caption: {
          en: 'Earlier interface: document export workflow.',
          zh: '早期界面：文档导出流程。',
        },
      },
    ],
    contribution: {
      en: 'I started MoTai with a friend and developed AI-assisted writing workflows, connecting structured story context to model APIs and keeping the author in control of accepted text.',
      zh: '我与朋友一起发起 MoTai，并开发 AI 辅助写作流程，将结构化故事上下文连接到模型 API，由作者决定接受哪些文本。',
    },
    limitations: {
      en: 'Local beta checks remain in progress. Model output still needs review, and earlier interface captures do not represent every current feature. No production reliability or paid adoption is evidenced here.',
      zh: '本地内测检查仍在进行。模型输出仍需审核，早期界面截图未覆盖当前全部功能。此处未提供生产可靠性或付费采用的证明。',
    },
    evidence: {
      en: 'The linked README describes the current workflow and links to beta progress. The gallery records an earlier interface using fictional content, rather than a new acceptance test of the latest release.',
      zh: '链接中的 README 介绍当前流程并提供内测进度入口。图库记录了使用虚构内容的早期界面，不代表对最新版本重新进行了验收。',
    },
    evidencePath: 'blob/main/README.md',
  },
  {
    id: 'connoisseur',
    tier: 'supporting',
    rank: 2,
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
    status: {
      en: 'Working MVP · mock data',
      zh: '可运行 MVP · 模拟数据',
    },
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
      en: 'Customer cases connect requests, quotations, addresses and a timeline. A separate admin workspace supports the other side of the process, using an in-memory store and mock payments to explore the handoffs.',
      zh: '客户案例串联需求、报价、地址和时间线。独立的后台工作台支持流程另一端，通过内存存储和模拟支付探索业务交接。',
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
      en: [
        'Request → quote → order',
        'Customer & admin views',
        'Mock payments',
      ],
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
    contribution: {
      en: 'I started this project with a friend to organise cross-border sourcing information into a traceable request-to-order workflow. This case presents our shared MVP without attributing every component to me.',
      zh: '我与朋友一起发起项目，将跨境采购信息组织为可追踪的需求到订单流程。本案例展示合作完成的 MVP，不把所有组件都归为个人完成。',
    },
    limitations: {
      en: 'In-memory data resets on restart. Payments are mocked and Supabase is a schema target, not a connected production database. The prototype does not establish real fulfilment or customer adoption.',
      zh: '内存数据在重启后重置。支付为模拟流程，Supabase 只是数据库结构迁移目标，尚未接入生产数据库。原型不证明真实履约或客户采用。',
    },
    evidence: {
      en: 'The README lists implemented customer and admin routes, mock payments and persistence limits. Portfolio screenshots use fictional orders.',
      zh: 'README 列出了已实现的客户与后台路由、模拟支付及持久化限制。作品集截图使用虚构订单。',
    },
    evidencePath: 'blob/main/README.md',
  },
];

const tierOrder: Record<Tier, number> = { featured: 0, supporting: 1, also: 2 };
/** Published projects in display order: featured, then supporting, then also-built. */
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
  /** Tools named in this role's points or linked case; shown as tags. */
  tools: string[];
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
        'Manage Amazon marketplace operations across Europe and the US; added US marketplace responsibility in October 2026.',
        'Maintain localised listings and investigate compliance issues in restricted product categories.',
        'Analyse sales, traffic, fees, product and competitor data to prioritise listing and operational improvements.',
        'Use Seller Central, Helium 10, Keepa and Amalytix for keyword, competitor and product research.',
      ],
      zh: [
        '负责欧洲及美国 Amazon 站点运营；于 2026 年 10 月接手美国站。',
        '维护本地化商品信息，排查受限品类中的合规问题。',
        '分析销售、流量、费用、产品及竞品数据，确定商品页及运营改进的优先级。',
        '使用 Seller Central、Helium 10、Keepa 和 Amalytix 开展关键词、竞品与产品研究。',
      ],
    },
    tools: ['Seller Central', 'Helium 10', 'Keepa', 'Amalytix'],
    project: null,
  },
  {
    date: { en: 'Jan — Apr 2026', zh: '2026.01 — 2026.04' },
    role: { en: 'Data Platform Full-stack Engineer', zh: '数据平台全栈工程师' },
    org: { en: 'Sun Yat-sen University · Shenzhen', zh: '中山大学 · 深圳' },
    points: {
      en: [
        'Co-developed a real-time monitoring platform connecting data ingestion, storage and reporting.',
        'Worked with InfluxDB and MySQL time-series data for monitoring and anomaly analysis.',
        'Built interactive map and status dashboards to make incoming telemetry easier to inspect.',
      ],
      zh: [
        '参与开发实时监控平台，连接数据接入、存储与报表流程。',
        '使用 InfluxDB 与 MySQL 时序数据支持监控和异常分析。',
        '开发交互式地图与状态看板，让持续接入的遥测数据更易检查。',
      ],
    },
    tools: ['InfluxDB', 'MySQL'],
    project: 'drone',
  },
  {
    date: { en: 'May — Sep 2025', zh: '2025.05 — 2025.09' },
    role: {
      en: 'Data Analyst & Research Assistant',
      zh: '数据分析师 / 研究助理',
    },
    org: {
      en: 'MaREI, University College Cork · Ireland',
      zh: 'MaREI 研究中心，科克大学 · 爱尔兰',
    },
    points: {
      en: [
        'Developed MCDA models to compare tyre-recovery alternatives and make decision criteria explicit.',
        'Used Python for data cleaning, validation and sensitivity analysis.',
        'Translated an Excel-based analysis process into an interactive web tool with adjustable weights and rankings.',
      ],
      zh: [
        '开发 MCDA 模型比较轮胎回收方案，明确决策准则。',
        '使用 Python 进行数据清洗、校验与敏感性分析。',
        '将基于 Excel 的分析流程转为交互网页工具，支持调整权重和查看排序。',
      ],
    },
    tools: ['Python', 'Excel', 'JavaScript'],
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
        en: 'Interactive media and software development',
        zh: '交互媒体与软件开发',
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
      note: {
        en: 'Data computation and applied mathematics',
        zh: '数据计算与应用数学',
      },
    },
  ];

export const skills: Record<Lang, [string, string][]> = {
  en: [
    [
      'Data analysis',
      'Python · SQL · Excel · Data cleaning · Sensitivity analysis',
    ],
    ['Web & systems', 'JavaScript / TypeScript · React · Node.js · Git'],
    ['Data workflows', 'HTTP APIs · WebSocket · InfluxDB · MySQL · Docker'],
    [
      'Applied AI',
      'LLM API integration · Structured context · Human review · Workflow prototyping',
    ],
    ['Marketplace tools', 'Seller Central · Helium 10 · Keepa · Amalytix'],
  ],
  zh: [
    ['数据分析', 'Python · SQL · Excel · 数据清洗 · 敏感性分析'],
    ['网页与系统', 'JavaScript / TypeScript · React · Node.js · Git'],
    ['数据流程', 'HTTP API · WebSocket · InfluxDB · MySQL · Docker'],
    ['应用 AI', '大模型 API 集成 · 结构化上下文 · 人工审核 · 工作流原型'],
    ['电商运营工具', 'Seller Central · Helium 10 · Keepa · Amalytix'],
  ],
};

/** Location line used everywhere except the hero label (About, résumé, meta, archive). */
export const location: Text = {
  en: 'Based in China · Open to Europe & the UK, North America, Australia & New Zealand · Visa sponsorship required',
  zh: '现居中国 · 意向欧洲及英国、北美、澳大利亚与新西兰 · 需要工作签证担保',
};

// Interface copy shared by every page.
export const ui = {
  nav: {
    work: {
      en: 'Case studies',
      zh: '案例',
    },
    experience: {
      en: 'Experience',
      zh: '经历',
    },
    skills: {
      en: 'Skills',
      zh: '技能',
    },
    approach: {
      en: 'How I work',
      zh: '工作方式',
    },
    contact: {
      en: 'Contact',
      zh: '联系',
    },
  },
  resume: { en: 'Résumé', zh: '简历' },
  // Hero label above the headline.
  status: {
    en: 'Implementation · Business systems · Process & data',
    zh: '系统实施 · 业务系统 · 流程与数据',
  },
  // Title parts are [before, accent, after]; "\n" becomes a line break.
  heroTitle: {
    en: ['I turn business processes\ninto ', 'systems that work', '.'],
    zh: ['把业务流程，\n变成', '真正好用的系统', '。'],
  },
  heroHint: {
    en: 'Hover a node to send a signal · click to fire the inputs',
    zh: '悬停节点发送信号 · 点击激活输入层',
  },
  heroHintTouch: {
    en: 'Tap to fire the inputs',
    zh: '轻点激活输入层',
  },
  heroIntro: {
    en: 'Computer Science MSc, University College Cork. I map how a process really runs, then design and build the tool, integration or AI-assisted step that improves it. My current role in European and US Amazon operations keeps me close to the day-to-day work those systems have to fit.',
    zh: '爱尔兰科克大学计算机科学硕士。我先弄清一个流程实际如何运转，再设计并搭建改进它的工具、系统集成或 AI 辅助环节。目前在欧洲及美国 Amazon 运营一线工作，让我始终贴近这些系统要服务的日常业务。',
  },
  seeWork: {
    en: 'Explore case studies ↓',
    zh: '查看精选案例 ↓',
  },
  facts: [
    {
      label: {
        en: 'Current work',
        zh: '当前工作',
      },
      value: {
        en: 'Operations, data & compliance · Amazon EU/US',
        zh: '运营、数据与合规 · Amazon 欧美站',
      },
    },
    {
      label: {
        en: 'Education',
        zh: '教育背景',
      },
      value: {
        en: 'MSc Computer Science · UCC',
        zh: '计算机科学硕士 · 科克大学',
      },
    },
    {
      label: {
        en: 'Toolkit',
        zh: '工具',
      },
      value: {
        en: 'Python · SQL · Excel · React',
        zh: 'Python · SQL · Excel · React',
      },
    },
    {
      label: {
        en: 'Direction',
        zh: '职业方向',
      },
      value: {
        en: 'Implementation & business systems',
        zh: '系统实施与业务系统',
      },
    },
  ],
  experienceTitle: {
    en: 'Professional experience',
    zh: '工作经历',
  },
  // Interactive "market lens" beside Experience. Its numbers are synthetic.
  lens: {
    kicker: { en: 'Try it · synthetic data', zh: '动手试试 · 模拟数据' },
    title: { en: 'Data first: where should we act?', zh: '用数据判断：先改进哪里？' },
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
  // Numerical teaching model, computed locally with fixed untrained weights.
  ai: {
    title: { en: 'Inside a Transformer', zh: '走进 Transformer' },
    lead: {
      en: 'Follow a token through a tiny decoder. Change the position encoding, attention head, causal mask and temperature to see what each part actually does.',
      zh: '跟随一个词元走过微型解码器。改变位置编码、注意力头、因果掩码与温度，观察每个部分如何影响计算。',
    },
  },
  relatedProject: { en: 'Related case: ', zh: '相关案例：' },
  workTitle: { en: 'Case studies', zh: '项目案例' },
  workIntro: {
    en: 'Problem, constraints, my part, the build, the evidence and the limits.',
    zh: '问题、约束、我的部分、实现、证明与局限。',
  },
  supportingTitle: {
    en: 'More projects',
    zh: '更多项目',
  },
  supportingTag: { en: 'LLM API integration', zh: '大模型 API 集成' },
  alsoBuilt: { en: 'Also built', zh: '其他项目' },
  aboutTitle: { en: 'Hi, I’m Jiaming.', zh: '你好，我是李嘉铭。' },
  educationLabel: { en: 'Education', zh: '教育背景' },
  skillsLabel: {
    en: 'Skills',
    zh: '技能',
  },
  contactTitle: {
    en: 'Have a process that needs a better tool?',
    zh: '有需要更好工具支撑的流程吗？',
  },
  allProjects: {
    en: '← All case studies',
    zh: '← 全部案例',
  },
  viewSource: { en: 'View source on GitHub ↗', zh: '在 GitHub 查看源码 ↗' },
  // Fixed case structure labels, in order.
  caseSteps: {
    problem: {
      en: 'Problem',
      zh: '问题',
    },
    constraints: {
      en: 'Context & constraints',
      zh: '背景与约束',
    },
    contribution: {
      en: 'My contribution',
      zh: '个人贡献',
    },
    built: {
      en: 'Approach & implementation',
      zh: '方法与实现',
    },
    result: {
      en: 'Outcomes & evidence',
      zh: '成果与依据',
    },
    limitations: {
      en: 'Limitations',
      zh: '局限',
    },
    next: {
      en: 'Future work',
      zh: '后续计划',
    },
  },
  walkthrough: { en: 'Interface walkthrough', zh: '界面一览' },
  stack: { en: 'Stack', zh: '技术栈' },
  nextProject: { en: 'Next case', zh: '下一个案例' },
  resumePage: {
    back: { en: '← Jiaming Li', zh: '← 李嘉铭' },
    download: { en: 'Download PDF ↓', zh: '下载 PDF ↓' },
    headline: {
      en: 'Implementation · Business Systems · Process & Data',
      zh: '系统实施 · 业务系统 · 流程与数据',
    },
    summary: {
      en: 'MSc Computer Science (Interactive Media), University College Cork. I map how processes really run, then design and build the tools, integrations and AI-assisted steps that improve them. Projects turn an Excel-based process into a decision tool, connect live data into a monitoring view and build an LLM workflow with human review. Current role in European and US Amazon operations, covering listings, compliance and performance data. Skills: Python, SQL, Excel, web development and LLM API integration. Seeking implementation, business systems, process and technical business analyst roles.',
      zh: '爱尔兰科克大学计算机科学硕士（交互媒体）。我先弄清流程实际如何运转，再设计并搭建改进它的工具、系统集成与 AI 辅助环节。项目包括把 Excel 流程做成决策工具、把实时数据接入监控视图，以及带人工审核的大模型工作流。现任欧洲及美国 Amazon 运营，负责商品信息、合规与经营数据。技能：Python、SQL、Excel、网页开发与大模型 API 集成。寻求系统实施、业务系统、流程分析与技术型业务分析相关岗位。',
    },
    experience: { en: 'Experience', zh: '工作经历' },
    projects: {
      en: 'Selected projects',
      zh: '精选项目',
    },
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
      en: 'I turn business processes into systems that work.',
      zh: '把业务流程，变成真正好用的系统。',
    },
    nav: [
      { href: '#projects', label: { en: '01 — Projects', zh: '01 — 项目' } },
      {
        href: '#experience',
        label: { en: '02 — Experience', zh: '02 — 经历' },
      },
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
  strengths: [
    {
      title: {
        en: 'Map the real process',
        zh: '梳理真实流程',
      },
      body: {
        en: 'Find where the work actually breaks before choosing a fix.',
        zh: '先找到工作真正卡住的地方，再选解决方案。',
      },
    },
    {
      title: {
        en: 'Turn a process into a tool',
        zh: '把流程做成工具',
      },
      body: {
        en: 'From spreadsheet workflows to tools people use.',
        zh: '把表格流程做成好用的工具。',
      },
    },
    {
      title: {
        en: 'Connect data and AI into the workflow',
        zh: '把数据与 AI 接入工作流',
      },
      body: {
        en: 'Data flows and AI steps, with people in the loop.',
        zh: '接通数据与 AI，保留人工把关。',
      },
    },
  ],
  targetLabel: {
    en: 'Open to',
    zh: '求职方向',
  },
  targetRoles: {
    en: 'Implementation Analyst · Business Systems / Process Analyst · Technical Business Analyst · AI Adoption',
    zh: '实施分析师 · 业务系统 / 流程分析师 · 技术型业务分析师 · AI 落地推广',
  },
  contactIntro: {
    en: 'Open to implementation, business systems, process and AI adoption roles.',
    zh: '正在寻找系统实施、业务系统、流程分析与 AI 落地推广岗位。',
  },
  readResume: {
    en: 'View résumé →',
    zh: '查看简历 →',
  },
  evidenceLabel: {
    en: 'Evidence & source',
    zh: '证明材料与源码',
  },
  evidenceLink: {
    en: 'Read project documentation ↗',
    zh: '阅读项目说明 ↗',
  },
  navigation: {
    en: 'Main navigation',
    zh: '主导航',
  },
  projectNavigation: {
    en: 'Case study navigation',
    zh: '案例导航',
  },
  archiveNavigation: {
    en: 'Archive navigation',
    zh: '项目档案导航',
  },
  filterLabel: {
    en: 'Filter projects',
    zh: '筛选项目',
  },
  summaryLabel: {
    en: 'Professional summary',
    zh: '职业背景概要',
  },
  heroLinks: {
    linkedin: { en: 'LinkedIn ↗', zh: 'LinkedIn ↗' },
    github: { en: 'GitHub ↗', zh: 'GitHub ↗' },
  },
  caseLinks: {
    code: { en: 'Code ↗', zh: '源码 ↗' },
    caseStudy: { en: 'Case study →', zh: '查看案例 →' },
  },
  // "How I work": a method, with evidence links only where existing material supports the step.
  approach: {
    title: { en: 'How I work', zh: '我的工作方式' },
    intro: {
      en: 'Six steps, whatever the fix turns out to be.',
      zh: '无论最终方案是什么，都按这六步推进。',
    },
    steps: [
      {
        title: { en: 'Understand how it runs today', zh: '弄清现状' },
        body: {
          en: 'Walk the process with the people who run it.',
          zh: '和一线的人一起走一遍流程。',
        },
        href: '#experience',
        link: { en: 'Experience', zh: '经历' },
      },
      {
        title: { en: 'Agree what “better” means', zh: '明确什么叫“更好”' },
        body: {
          en: 'Write requirements and acceptance criteria.',
          zh: '写清需求与验收标准。',
        },
        href: '',
        link: { en: '', zh: '' },
      },
      {
        title: { en: 'Design the future state', zh: '设计目标流程' },
        body: {
          en: 'Map the to-be process and data flow.',
          zh: '画出目标流程与数据流。',
        },
        href: '#process-map',
        link: { en: 'Process map', zh: '流程图' },
      },
      {
        title: { en: 'Build or configure', zh: '搭建或配置' },
        body: {
          en: 'Build the smallest tool that does the job.',
          zh: '做出够用的最小工具。',
        },
        href: '/work/mcda/',
        link: { en: 'MCDA', zh: 'MCDA' },
      },
      {
        title: { en: 'Test and roll out', zh: '测试并上线' },
        body: {
          en: 'Test with users, then hand over.',
          zh: '与用户测试，然后交接。',
        },
        href: '',
        link: { en: '', zh: '' },
      },
      {
        title: { en: 'Measure and improve', zh: '跟踪并改进' },
        body: {
          en: 'Track the result; keep a person in the loop.',
          zh: '跟踪效果，保留人工把关。',
        },
        href: '/work/motai/',
        link: { en: 'MoTai', zh: 'MoTai' },
      },
    ],
  },
  // Illustrative BPMN-style map of a listing check; not a client deliverable.
  processMap: {
    kicker: { en: 'Illustrative process map', zh: '示意流程图' },
    title: {
      en: 'Listing compliance check: current vs future state',
      zh: '商品信息合规检查：现状与目标流程',
    },
    tabs: {
      asis: { en: 'Current state', zh: '现状流程' },
      tobe: { en: 'Future state', zh: '目标流程' },
    },
    lanes: {
      operator: { en: 'Operator', zh: '运营' },
      system: { en: 'System', zh: '系统' },
      reviewer: { en: 'Reviewer', zh: '审核人' },
    },
    asis: {
      start: { en: 'New or changed listing', zh: '新增或修改商品' },
      export: { en: 'Export listings', zh: '导出商品信息' },
      read: { en: 'Read each listing against the rules', zh: '逐条对照规则阅读' },
      issue: { en: 'Issue?', zh: '有问题？' },
      fix: { en: 'Fix and resubmit', zh: '修改并重新提交' },
      done: { en: 'Done', zh: '完成' },
    },
    tobe: {
      start: { en: 'New or changed listing', zh: '新增或修改商品' },
      extract: { en: 'Extract and check (LLM + rules)', zh: '提取并校验（大模型 + 规则）' },
      valid: { en: 'Schema valid & passes?', zh: '结构合规且通过？' },
      publish: { en: 'Publish and log', zh: '发布并记录' },
      review: { en: 'Review flagged item', zh: '审核被标记条目' },
      fix: { en: 'Fix and resubmit', zh: '修改并重新提交' },
      done: { en: 'Done', zh: '完成' },
    },
    yes: { en: 'yes', zh: '是' },
    no: { en: 'no', zh: '否' },
    approve: { en: 'approve', zh: '通过' },
    reject: { en: 'reject', zh: '驳回' },
    changes: {
      asis: {
        en: 'Every listing is read by a person, every time; checks depend on who does them and leave no record.',
        zh: '每条商品每次都要人工阅读；检查结果因人而异，也没有记录。',
      },
      tobe: {
        en: 'The system checks every listing the same way and logs it; people only review what is flagged, and decide.',
        zh: '系统用同一标准检查每条商品并留下记录；人只审核被标记的条目，并做最终判断。',
      },
    },
    note: {
      en: 'Illustrative example of how I document a process. Not a client deliverable and not company data.',
      zh: '用于说明我如何梳理流程的示例，并非客户交付物，也不含公司数据。',
    },
  },
  lab: {
    teaserTitle: { en: 'Inside a Transformer', zh: '走进 Transformer' },
    teaserBody: {
      en: 'A hands-on explorer of how a tiny decoder computes attention, step by step, with fixed untrained weights.',
      zh: '一个可动手操作的演示：用固定、未训练的权重，逐步展示微型解码器如何计算注意力。',
    },
    teaserLink: { en: 'Open the lab →', zh: '打开实验页 →' },
    back: { en: '← Back to portfolio', zh: '← 返回作品集' },
  },
} satisfies Record<string, unknown>;
