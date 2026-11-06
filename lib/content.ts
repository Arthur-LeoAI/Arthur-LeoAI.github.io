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
  /** Public deployment. When set, a live preview window replaces the screenshots. */
  liveUrl?: string;
  image: Image;
  title: Text;
  tag: Text;
  ctx: Text;
  status: Text;
  subtitle: Text;
  summary: Text;
  stack: string;
  // Every case follows: problem → constraints → contribution → build → result → limitations,
  // then why it matters, role fit, where it could go next and who else works on this.
  problem: Text;
  constraints: Text;
  contribution: Text;
  built: Text;
  limitations: Text;
  evidence: Text;
  evidencePath: string;
  result: Text;
  /** Why the project matters to the people who would use it. */
  value: Text;
  /** Why it fits the target roles. */
  fit: Text;
  /** Realistic next features; `ref` points to a product or document that already does or asks for it. */
  roadmap: { text: Text; ref?: { name: string; url: string } }[];
  /** Comparable products and organisations, each checked against its own page (November 2026). */
  landscape: { name: string; url: string; note: Text }[];
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
      src: '/projects/mcda/mcda-live.png',
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
    value: { en: 'TODO', zh: 'TODO' },
    fit: { en: 'TODO', zh: 'TODO' },
    roadmap: [],
    landscape: [],
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
    liveUrl: 'https://mcda.arthur-jiaming-li.workers.dev/',
    image: {
      src: '/projects/mcda/mcda-live.png',
      width: 1440,
      height: 1000,
      caption: {
        en: 'Home page of the live MCDA tool, with an example conclusion and ranking.',
        zh: '线上 MCDA 工具首页，附示例结论与排序。',
      },
    },
    title: { en: 'MCDA Tool', zh: 'MCDA 决策工具' },
    tag: { en: 'Process to tool', zh: '流程工具化' },
    ctx: { en: 'MaREI · Ireland', zh: 'MaREI · 爱尔兰' },
    status: {
      en: 'Live tool · pre-release',
      zh: '已上线 · 预发布阶段',
    },
    subtitle: {
      en: 'From a spreadsheet process to a decision people can explain.',
      zh: '从电子表格流程，到说得清理由的决策。',
    },
    summary: {
      en: 'Rebuilt an Excel-based research analysis as a web decision tool: import a table, set criteria and weights, and get an explained, robustness-checked recommendation.',
      zh: '把基于 Excel 的科研分析重做成网页决策工具：导入表格、设定准则与权重，得到有解释、经过稳健性检验的推荐结果。',
    },
    stack: 'Python · FastAPI · React · TypeScript · ECharts',
    problem: {
      en: 'How do you compare options when environmental, technical and economic priorities compete, and still explain the choice?',
      zh: '当环境、技术和经济目标互相冲突时，如何比较不同方案，并且把选择的理由讲清楚？',
    },
    constraints: {
      en: 'The original process lived in an Excel workbook. Users had to change criteria and weights themselves, every ranking had to stay explainable rather than a black-box score, and the data should stay with the user.',
      zh: '原有流程在一个 Excel 工作簿里。使用者需要自己调整准则和权重，每个排序都必须可解释而不是黑箱分数，数据也应留在使用者手里。',
    },
    contribution: {
      en: 'I built the first interactive version during The End of Tire research project at MaREI, then rewrote it as a general decision tool with its own design documents, tests and roadmap.',
      zh: '我在 MaREI 的 The End of Tire 科研项目中做出第一版交互工具，之后把它重写为通用决策工具，配有设计文档、测试和路线图。',
    },
    built: {
      en: 'One Python calculation core (weighted sum, TOPSIS, compromise programming, Pareto analysis, weight-stability intervals and robustness checks) serves both an API and the web app. A guided seven-step flow — scenario, import, columns, check, criteria, weights, conclusion — sits beside an expert mode. Criteria can be benefits or costs with linear, logarithmic or ordinal scoring and hard conditions; weights can be set directly, by ranking or by pairwise comparison. The conclusion says which option wins, why, and how stable that is, and exports to an Excel report.',
      zh: '一个 Python 计算核心（加权求和、TOPSIS、折中规划、帕累托分析、权重稳定区间与稳健性检验）同时服务 API 和网页。引导模式分七步——场景、导入、列映射、检查、准则、权重、结论——另有专家模式。准则可设为效益型或成本型，支持线性、对数或序数评分及硬性条件；权重可直接输入、按排序生成或两两比较。结论说明哪个方案胜出、原因以及结果有多稳定，并可导出 Excel 报告。',
    },
    result: {
      en: 'The tool is live and open source (Apache-2.0). Its test suite compares results with the original Excel workbook. Commercial adoption and time savings have not been measured.',
      zh: '工具已上线并开源（Apache-2.0）。测试会把计算结果与原 Excel 工作簿对比。尚未测量商业采用情况或节省的时间。',
    },
    limitations: {
      en: 'Rankings still depend on the data, criteria and weights people enter. The screenshots use the built-in e-commerce example, so they don’t validate a real recovery decision. Release checks and usability testing for v0.1.0 are still to come.',
      zh: '排序仍取决于使用者输入的数据、准则和权重。截图使用内置的电商示例，不能据此验证真实的回收决策。v0.1.0 的发布检查与可用性测试尚未完成。',
    },
    value: {
      en: 'Many teams still make option decisions in spreadsheets where the weights and reasons are hard to see. This tool makes the trade-offs explicit: each recommendation says why it wins, where it loses, and whether it survives changes in the weights. That matches what UK Government Green Book guidance asks of MCDA: scored criteria, explicit weights and a sensitivity test.',
      zh: '很多团队仍在电子表格里做方案决策，权重和理由都不透明。这个工具把取舍摆到台面上：每个推荐都说明为什么胜出、在哪些方面吃亏、权重变化后是否依然成立。这与英国政府 Green Book 指南对多准则分析的要求一致：准则打分、权重明确，并做敏感性检验。',
    },
    fit: {
      en: 'It is the core loop of implementation and business-systems work: take a process that lives in Excel, pin down what its users need, and turn it into a configurable tool with validation, tests and documentation. For data and technical BA roles, it shows I can work from the calculation model through the API to the interface.',
      zh: '这正是系统实施与业务系统岗位的核心工作：把放在 Excel 里的流程梳理清楚，明确使用者的需求，再做成可配置、有校验、有测试和文档的工具。对数据/技术型业务分析岗位，它说明我能从计算模型一路做到 API 和界面。',
    },
    roadmap: [
      {
        text: {
          en: 'Swing weighting — weights from the gap between the best and worst option on each criterion — as the Green Book guidance prescribes.',
          zh: '摆幅赋权（swing weighting）：按各准则最好与最差方案的差距确定权重，即 Green Book 指南规定的方法。',
        },
        ref: { name: 'HM Treasury · Green Book MCDA guidance', url: 'https://www.gov.uk/government/publications/green-book-supplementary-guidance-multi-criteria-decision-analysis/use-of-multi-criteria-decision-analysis-in-options-appraisal-of-economic-cases' },
      },
      {
        text: {
          en: 'Group input: collect several stakeholders’ scores and weights, then compare or combine them.',
          zh: '多人输入：收集多位相关方的打分与权重，再进行比较或汇总。',
        },
        ref: { name: '1000minds', url: 'https://www.1000minds.com/decision-making/what-is-mcdm-mcda' },
      },
      {
        text: {
          en: 'A workshop view that shows where stakeholders disagree before the weights are fixed.',
          zh: '研讨会视图：在确定权重之前，先展示相关方之间的分歧所在。',
        },
        ref: { name: 'TransparentChoice', url: 'https://www.transparentchoice.com/project-prioritization-software' },
      },
      {
        text: {
          en: 'Data connectors already on the project roadmap: Amazon SP-API and Google Sheets imports.',
          zh: '项目路线图中已列出的数据接入：Amazon SP-API 与 Google Sheets 导入。',
        },
        ref: { name: 'Project roadmap', url: 'https://github.com/Arthur-LeoAI/MCDA-Tool-2.0/blob/main/docs/ROADMAP.md' },
      },
    ],
    landscape: [
      {
        name: 'HM Treasury Green Book',
        url: 'https://www.gov.uk/government/publications/green-book-supplementary-guidance-multi-criteria-decision-analysis/use-of-multi-criteria-decision-analysis-in-options-appraisal-of-economic-cases',
        note: {
          en: 'UK Government guidance (updated May 2024) that uses MCDA to appraise long lists of options, with stakeholder workshops, swing weighting and a sensitivity test.',
          zh: '英国政府指南（2024 年 5 月更新），用多准则分析评估长名单方案，包含相关方研讨、摆幅赋权和敏感性检验。',
        },
      },
      {
        name: '1000minds',
        url: 'https://www.1000minds.com/decision-making/what-is-mcdm-mcda',
        note: {
          en: 'Decision software built on pairwise ranking questions (PAPRIKA), with surveys that collect and combine many decision-makers’ ratings.',
          zh: '基于两两排序问题（PAPRIKA 方法）的决策软件，可通过问卷收集并汇总多位决策者的评分。',
        },
      },
      {
        name: 'TransparentChoice',
        url: 'https://www.transparentchoice.com/project-prioritization-software',
        note: {
          en: 'Project-prioritisation software where leaders compare criteria in pairs and departments score projects against them.',
          zh: '项目优先级排序软件：管理层两两比较准则，各部门据此给项目打分。',
        },
      },
    ],
    facts: {
      en: [
        'Guided and expert modes',
        'Weighted sum, TOPSIS, CP & Pareto',
        'Robustness check on the weights',
        'Excel/CSV in, Excel report out',
      ],
      zh: ['引导与专家双模式', '加权求和、TOPSIS、折中规划与帕累托', '权重稳健性检验', 'Excel/CSV 导入，Excel 报告导出'],
    },
    gallery: [
      {
        src: '/projects/mcda/mcda-criteria.jpg',
        width: 1440,
        height: 1020,
        caption: {
          en: 'Step 5: how each criterion is scored — benefit or cost, linear, logarithmic or ordinal (built-in example data).',
          zh: '第 5 步：每个准则如何评分——效益型或成本型，线性、对数或序数（内置示例数据）。',
        },
      },
      {
        src: '/projects/mcda/mcda-weights.jpg',
        width: 1440,
        height: 920,
        caption: {
          en: 'Step 6: weights between groups by ranking, within groups directly; pairwise comparison is one click away.',
          zh: '第 6 步：组间按排序生成权重，组内直接输入；也可切换为两两比较。',
        },
      },
      {
        src: '/projects/mcda/mcda-conclusion.jpg',
        width: 1440,
        height: 800,
        caption: {
          en: 'Step 7: a plain-language conclusion with the reasons, a confidence level and options excluded by hard conditions.',
          zh: '第 7 步：用平实语言给出结论、理由、置信度，以及因硬性条件被排除的方案。',
        },
      },
    ],
    evidence: {
      en: 'The README documents the calculation core, API, guided and expert modes and the tests, including comparisons with the old Excel results; docs/ROADMAP.md lists the milestones. Screenshots use the tool’s built-in example data.',
      zh: 'README 说明了计算核心、API、引导与专家模式以及测试（含与旧 Excel 结果的对比）；docs/ROADMAP.md 列出了里程碑。截图使用工具内置的示例数据。',
    },
    evidencePath: 'blob/main/README.md',
  },
  {
    id: 'drone',
    tier: 'featured',
    rank: 2,
    cat: ['Data'],
    repo: 'Drone-monitoring-platform-demo',
    image: {
      src: '/projects/drone/drone-sim.jpg',
      width: 1440,
      height: 900,
      caption: {
        en: 'UAV Telemetry Console in simulation mode: live map, track and flight snapshot (simulated data).',
        zh: '模拟模式下的无人机遥测控制台：实时地图、航迹与飞行快照（模拟数据）。',
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
      en: 'From raw telemetry to one live picture.',
      zh: '从原始遥测，到一张实时画面。',
    },
    summary: {
      en: 'Connects an HTTP API, time-series storage and a WebSocket feed into a live monitoring console (simulated telemetry).',
      zh: '把 HTTP API、时序存储和 WebSocket 推送串成一个实时监控控制台（模拟遥测数据）。',
    },
    stack: 'Node.js · Express · WebSocket · InfluxDB · React · Leaflet · Docker',
    problem: {
      en: 'How can a stream of drone telemetry become a monitoring view that updates by itself and that people can act on?',
      zh: '如何把源源不断的无人机遥测，变成能自动刷新、可以据此行动的监控视图？',
    },
    constraints: {
      en: 'Telemetry must update without page reloads and still work when the live feed is down. The public demo uses simulated data and is separate from the university platform I co-developed.',
      zh: '遥测要在不刷新页面的情况下持续更新，并且在实时数据中断时依然可用。公开演示使用模拟数据，与我参与开发的高校平台分开。',
    },
    contribution: {
      en: 'I built this personal telemetry demo end to end. Separately, I co-developed a monitoring platform at Sun Yat-sen University; this case shows the demo, not the university deployment.',
      zh: '我独立完成了这个个人遥测演示。另外，我在中山大学参与开发了一个监控平台；本案例展示的是演示版，不代表高校平台的部署情况。',
    },
    built: {
      en: 'A POST endpoint accepts standard JSON telemetry, writes it to InfluxDB and broadcasts it to WebSocket subscribers (token-checked, rate-limited to one message per 250 ms). The React and Leaflet console shows the track on a map and a flight snapshot — speed, altitude, heading, battery, voltage, temperature, wind — and switches between the live stream and a built-in simulation. Docker Compose starts the API, front end and a pre-seeded InfluxDB with one command.',
      zh: 'POST 接口接收标准 JSON 遥测，写入 InfluxDB 并广播给 WebSocket 订阅者（带令牌校验，默认每 250 毫秒限流一次）。React 与 Leaflet 控制台在地图上显示航迹，并展示飞行快照——速度、高度、航向、电量、电压、温度、风速——可在实时数据流与内置模拟之间切换。Docker Compose 一条命令即可启动 API、前端和预置数据的 InfluxDB。',
    },
    result: {
      en: 'The repository includes the API, simulator, sample payloads and scripts, the console and Docker setup. The public evidence shows the full pipeline working on simulated telemetry.',
      zh: '仓库包含 API、模拟器、示例载荷与脚本、控制台和 Docker 配置。公开材料展示的是整条链路在模拟遥测上的运行。',
    },
    limitations: {
      en: 'Simulated telemetry doesn’t prove field reliability, production security or scale. History playback is marked “coming soon”, and no load-test results are included.',
      zh: '模拟遥测不能证明实地可靠性、生产安全性或规模。历史回放标注为“即将推出”，也未包含压力测试结果。',
    },
    value: {
      en: 'Operators need one live picture of where a vehicle is and whether it is healthy, without refreshing pages or querying databases. The demo covers the whole path that makes this possible: ingest, store, stream and display.',
      zh: '操作人员需要一张实时画面，看清飞行器在哪里、状态是否正常，而不必刷新页面或查数据库。这个演示覆盖了实现它的完整链路：接入、存储、推送与展示。',
    },
    fit: {
      en: 'Technical BA and implementation roles spend much of their time on these hand-offs: an API contract, a data store, a real-time feed and the screen people act on. Having built each piece, I can talk with engineers about integration points and with operators about what the screen must show.',
      zh: '技术型业务分析与系统实施岗位，大量时间都花在这些衔接上：API 约定、数据存储、实时推送，以及使用者据以行动的界面。每一环我都亲手做过，因此既能和工程师讨论集成点，也能和使用者讨论界面该显示什么。',
    },
    roadmap: [
      {
        text: {
          en: 'History playback of past flights from the time-series store, already reserved in the console as “coming soon”.',
          zh: '基于时序数据的历史航迹回放，控制台里已预留为“即将推出”。',
        },
      },
      {
        text: {
          en: 'A multi-vehicle view: every aircraft’s position and status on one live map.',
          zh: '多机视图：在一张实时地图上显示每架飞行器的位置与状态。',
        },
        ref: { name: 'Auterion Suite', url: 'https://docs.auterion.com/vehicle-operation/auterion-suite-fleet-management/vehicles/cloud-features' },
      },
      {
        text: {
          en: 'Threshold alerts — low battery, lost link, altitude or speed limits — pushed over the same WebSocket feed.',
          zh: '阈值告警——低电量、链路中断、高度或速度越限——通过同一条 WebSocket 推送。',
        },
      },
      {
        text: {
          en: 'A live camera feed beside the telemetry.',
          zh: '在遥测旁边接入实时摄像头画面。',
        },
        ref: { name: 'Auterion Suite', url: 'https://docs.auterion.com/vehicle-operation/auterion-suite-fleet-management/vehicles/cloud-features' },
      },
    ],
    landscape: [
      {
        name: 'Auterion Suite',
        url: 'https://docs.auterion.com/vehicle-operation/auterion-suite-fleet-management/vehicles/cloud-features',
        note: {
          en: 'Fleet-management software showing live vehicle position and status on a map, with live video from the onboard camera.',
          zh: '机队管理软件，在地图上显示飞行器的实时位置与状态，并提供机载摄像头的实时视频。',
        },
      },
    ],
    facts: {
      en: ['HTTP → InfluxDB → WebSocket', 'Live map & flight snapshot', 'Live stream or simulation'],
      zh: ['HTTP → InfluxDB → WebSocket', '实时地图与飞行快照', '实时数据流或模拟'],
    },
    gallery: [
      {
        src: '/projects/drone/drone-tablet.jpg',
        width: 820,
        height: 1180,
        caption: {
          en: 'The same console at tablet width, in simulation mode.',
          zh: '平板宽度下的同一控制台（模拟模式）。',
        },
      },
    ],
    evidence: {
      en: 'The README describes the HTTP API, WebSocket stream, InfluxDB setup, simulator and local and Docker run instructions. All captures use simulated telemetry.',
      zh: 'README 说明了 HTTP API、WebSocket 数据流、InfluxDB 配置、模拟器以及本地和 Docker 运行方式。所有截图均使用模拟遥测。',
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
      src: '/projects/motai/motai-ai.jpg',
      width: 1440,
      height: 900,
      caption: {
        en: 'MoTai 1.1: the AI workspace beside the story materials (fictional demo story; AI not connected).',
        zh: '墨台 1.1：AI 创作区与右侧创作资料（虚构示例作品，未连接 AI）。',
      },
    },
    title: { en: 'MoTai', zh: 'MoTai 墨台' },
    tag: { en: 'Human-centred AI', zh: '以人为本的 AI' },
    ctx: { en: 'Independent collaboration', zh: '独立合作项目' },
    status: {
      en: 'Desktop app · local beta',
      zh: '桌面应用 · 本地内测',
    },
    subtitle: {
      en: 'AI that drafts. An author who decides.',
      zh: 'AI 起草，作者拍板。',
    },
    summary: {
      en: 'A local-first novel-writing app where AI drafts are checked against the story’s own canon and nothing is written in without the author’s approval.',
      zh: '本地优先的小说创作应用：AI 草稿会对照作品自身设定检查，未经作者确认，任何内容都不会写入。',
    },
    stack: 'Node.js · Electron · Quill · DeepSeek / OpenAI APIs',
    problem: {
      en: 'How can AI help with a long novel without losing its characters and timeline, or taking control away from the writer?',
      zh: 'AI 如何帮助写长篇，同时不丢失人物和时间线，也不夺走作者的掌控？',
    },
    constraints: {
      en: 'Manuscripts stay on the author’s computer. API keys are managed by the local runtime, never typed into the app. When AI is unavailable the app says so instead of faking an answer.',
      zh: '文稿保存在作者自己的电脑上。API 密钥由本地运行环境管理，不在应用里填写。AI 不可用时会明确提示，不用预设内容冒充回答。',
    },
    contribution: {
      en: 'I started MoTai with a friend and developed its AI-assisted writing workflows: connecting structured story context to model APIs and keeping the author in control of what is accepted.',
      zh: '我与朋友一起发起墨台，负责开发 AI 辅助写作流程：把结构化的故事资料接入模型 API，并让作者掌控哪些内容被接受。',
    },
    built: {
      en: 'Version 1.1 is organised around “discuss the story with AI → confirm the story materials → write”. AI suggestions for the story materials arrive as drafts the author confirms before anything changes. For prose, the server re-reads the work and combines the story bible, author-confirmed canon facts and recent chapter memory. It then checks the draft for repeated passages and for conflicts in characters, events, timeline and cause and effect. Hard conflicts are rewritten at most twice; if they remain, the text can’t be saved. New facts the model finds become proposals the author approves one by one.',
      zh: '1.1 版围绕“和 AI 讨论故事 → 确认创作资料 → 写正文”组织。AI 对创作资料的建议先成为草案，作者确认后才会修改作品。生成正文时，服务端重新读取作品，组合设定库、作者已确认的 Canon 事实和最近章节记忆，再检查重复段落以及人物、事件、时间线和因果冲突；硬冲突最多自动重写两次，仍有冲突则不能写入。模型提取出的新事实会成为提案，由作者逐条确认。',
    },
    result: {
      en: 'Desktop installer and source are available (v1.1.0). The beta checkpoint records 73 domain and API tests and 3 browser flows passing. Real-model quality over a long novel hasn’t been benchmarked yet, and no user adoption is claimed.',
      zh: '已有桌面安装包和源码（v1.1.0）。内测检查点记录 73 项领域/API 测试和 3 条浏览器流程通过。真实模型在长篇上的表现尚未做基准测试，也不声称用户采用规模。',
    },
    limitations: {
      en: 'Tests use an isolated AI adapter, so they don’t prove the quality of real DeepSeek or OpenAI output. A ~20-chapter benchmark and a two-week author beta are planned but not done. Screenshots use a fictional demo story with AI disconnected.',
      zh: '测试使用隔离的 AI 适配器，不能证明真实 DeepSeek 或 OpenAI 输出的质量。约 20 章的基准和两周作者内测已列入计划但尚未完成。截图使用虚构示例作品，且未连接 AI。',
    },
    value: {
      en: 'Long-form writers using AI keep hitting the same problems: the model forgets characters and earlier events, and it becomes unclear which text the author actually wrote. MoTai keeps the author in charge — every AI change is a draft, every new fact needs approval, and drafts are checked against the story’s canon before they can be saved.',
      zh: '用 AI 写长篇的作者总会遇到同样的问题：模型忘了人物和前文，也说不清哪些文字是作者自己写的。墨台让作者始终掌控——AI 的每次改动都是草案，每个新事实都要确认，草稿在保存前还会对照作品设定检查。',
    },
    fit: {
      en: 'This is AI adoption in practice: deciding where the model helps, where people must review, and how errors are caught before they reach the work. Those are the questions AI adoption and AI operations roles face when putting LLMs into real workflows.',
      zh: '这就是 AI 落地的实际工作：决定模型在哪里帮忙、哪里必须人工审核、错误如何在进入成品前被拦下。AI 落地推广与 AI 运营岗位把大模型接入真实流程时，面对的正是这些问题。',
    },
    roadmap: [
      {
        text: {
          en: 'Local models, so drafts never leave the computer.',
          zh: '支持本地模型，让草稿完全不离开电脑。',
        },
        ref: { name: 'Novelcrafter', url: 'https://novelcrafter.com/help/faq/ai-and-prompting/byok' },
      },
      {
        text: {
          en: 'Richer worldbuilding entries — places, lore, factions — feeding each draft.',
          zh: '更丰富的世界观条目——地点、背景设定、势力——参与每次生成。',
        },
        ref: { name: 'Sudowrite Story Bible', url: 'https://docs.sudowrite.com/using-sudowrite/1ow1qkGqof9rtcyGnrWUBS/what-is-story-bible/jmWepHcQdJetNrE991fjJC' },
      },
      {
        text: {
          en: 'A clear record of which passages were AI-drafted and how the author changed them, as author groups set rules for disclosing AI use.',
          zh: '清楚记录哪些段落由 AI 起草、作者如何修改——作者组织正在就 AI 使用的披露制定规则。',
        },
        ref: { name: 'Authors Guild · Human Authored', url: 'https://authorsguild.org/news/human-authored-certification-expands-to-all-authors/' },
      },
      {
        text: {
          en: 'The planned ~20-chapter continuity benchmark and a two-week author beta.',
          zh: '已计划的约 20 章连贯性基准测试，以及两周作者内测。',
        },
        ref: { name: 'Beta checkpoint', url: 'https://github.com/Arthur-LeoAI/MoTai-Story/blob/main/docs/LOCAL_BETA_PROGRESS.md' },
      },
    ],
    landscape: [
      {
        name: 'Sudowrite',
        url: 'https://docs.sudowrite.com/using-sudowrite/1ow1qkGqof9rtcyGnrWUBS/what-is-story-bible/jmWepHcQdJetNrE991fjJC',
        note: {
          en: 'AI fiction tool built around a Story Bible — synopsis, characters, worldbuilding, outline — that feeds each draft.',
          zh: '围绕 Story Bible（梗概、人物、世界观、大纲）构建的 AI 小说工具，这些资料会参与每次起草。',
        },
      },
      {
        name: 'Novelcrafter',
        url: 'https://novelcrafter.com/help/faq/ai-and-prompting/byok',
        note: {
          en: 'Writing workspace with no built-in AI credits: authors bring their own provider or a local model.',
          zh: '写作工作台，不内置 AI 额度：作者自带服务商密钥或接入本地模型。',
        },
      },
      {
        name: 'Authors Guild',
        url: 'https://authorsguild.org/news/human-authored-certification-expands-to-all-authors/',
        note: {
          en: '“Human Authored” certification, opened to all US-published authors in March 2026.',
          zh: '“Human Authored”（人类创作）认证，2026 年 3 月起向所有在美国出版的作者开放。',
        },
      },
    ],
    facts: {
      en: [
        'Drafts confirmed before writing',
        'Consistency check on every draft',
        'Canon facts the author approves',
        'Local storage, 5 export formats',
      ],
      zh: ['确认后才写入的草案', '每次生成都做一致性检查', '作者确认的 Canon 事实', '本地存储，5 种导出格式'],
    },
    gallery: [
      {
        src: '/projects/motai/motai-writing.jpg',
        width: 1440,
        height: 900,
        caption: {
          en: 'Writing view: chapters, scene planning and history on the left; “Ask AI” and focus mode above the text (fictional content).',
          zh: '正文视图：左侧为章节、场景规划与历史；正文上方可“问 AI”或进入专注模式（虚构内容）。',
        },
      },
      {
        src: '/projects/motai/motai-bible.jpg',
        width: 1440,
        height: 900,
        caption: {
          en: 'Story materials: outline, characters, world rules and timeline; AI edits always arrive as drafts.',
          zh: '创作资料：故事大纲、人物关系、世界观规则与时间线；AI 的修改总是先成为草案。',
        },
      },
    ],
    evidence: {
      en: 'The README describes the current workflow, consistency checks and exports; docs/LOCAL_BETA_PROGRESS.md records the tests and the open beta items. Screenshots use a fictional demo story.',
      zh: 'README 介绍了当前流程、一致性检查与导出功能；docs/LOCAL_BETA_PROGRESS.md 记录了测试情况和未完成的内测事项。截图使用虚构示例作品。',
    },
    evidencePath: 'blob/main/README.md',
  },
  {
    id: 'connoisseur',
    tier: 'supporting',
    rank: 2,
    cat: ['Product'],
    repo: 'connoisseur',
    liveUrl: 'https://valerain.com/',
    image: {
      src: '/projects/connoisseur/connoisseur-live.jpg',
      width: 1440,
      height: 1000,
      caption: {
        en: 'Home page of the live Connoisseur Trade House site (valerain.com).',
        zh: 'Connoisseur Trade House 线上网站首页（valerain.com）。',
      },
    },
    title: { en: 'Connoisseur', zh: 'Connoisseur' },
    tag: { en: 'Business systems', zh: '业务系统' },
    ctx: { en: 'Independent collaboration', zh: '独立合作项目' },
    status: {
      en: 'Live MVP · in-memory data',
      zh: '已上线 MVP · 内存数据',
    },
    subtitle: {
      en: 'A clear, trackable path from brief to delivery.',
      zh: '从需求到交付，清晰可追踪。',
    },
    summary: {
      en: 'A commission desk for finding objects and arranging tasks: a brief, a reviewed proposal, then a private case the customer can follow.',
      zh: '寻物与代办的委托平台：提交需求、审核提案，再通过私密案例页跟进进度。',
    },
    stack: 'Next.js · TypeScript · Tailwind · In-memory store',
    problem: {
      en: 'How can a cross-border sourcing request stay clear to both sides as it moves from brief to proposal to delivery?',
      zh: '跨境寻物需求从提交、提案到交付，如何让双方始终看得清楚？',
    },
    constraints: {
      en: 'No production database or payment provider yet: the MVP proves the workflow with an in-memory store that mirrors the planned Supabase schema, and development payments are mocked. Case access had to stay private without forcing customers to make an account.',
      zh: '尚无生产数据库和支付服务：MVP 用与 Supabase 规划结构一致的内存存储验证流程，开发环境的支付为模拟。案例访问必须保持私密，同时不强制客户注册账户。',
    },
    contribution: {
      en: 'I started this project with a friend to turn cross-border sourcing into a traceable brief-to-delivery workflow. This case presents our shared MVP without attributing every component to me.',
      zh: '我与朋友一起发起项目，把跨境寻物整理成可追踪的“需求到交付”流程。本案例展示合作完成的 MVP，不把所有组件都归为个人完成。',
    },
    built: {
      en: 'Customers commission an object or a task, pay a small review fee, then receive a proposal with scope, timing and price. Each commission becomes a case with a timeline. Private case access uses a case number plus an access code that is stored hashed, never placed in the URL, and locked after five failed attempts. An account desk holds cases, quotes and addresses; an admin workspace handles orders, quotes, refunds and credits, analytics and an email outbox.',
      zh: '客户可委托寻物或代办，支付少量审核费后收到包含范围、时间和价格的提案。每个委托都会成为带时间线的案例。私密案例访问使用案例编号加访问码，访问码以哈希存储、不出现在网址中，连续失败五次即锁定。账户中心集中管理案例、报价与地址；后台工作台处理订单、报价、退款与抵扣、数据分析和邮件发件箱。',
    },
    result: {
      en: 'The site is live at valerain.com with the commission flow and private case access. The README notes that data still sits in an in-memory store and that Supabase is a migration target, not a connected database.',
      zh: '网站已在 valerain.com 上线，包含委托流程和私密案例访问。README 注明数据仍存放在内存中，Supabase 是迁移目标，尚未接入数据库。',
    },
    limitations: {
      en: 'In-memory data resets when the server restarts. Development payments are mock captures, and production payment needs PayPal to be configured. Nothing here shows real orders, fulfilment or customer numbers.',
      zh: '内存数据在服务器重启后重置。开发环境的支付为模拟扣款，生产环境需配置 PayPal 才能收款。此处不证明真实订单、履约或客户数量。',
    },
    value: {
      en: 'Cross-border sourcing often runs through chat threads and spreadsheets, so customers lose track of what was agreed and teams lose track of what is owed. Putting the brief, proposal, payment step and timeline in one case gives both sides a single source of truth.',
      zh: '跨境寻物常常靠聊天记录和表格推进，客户记不清约定了什么，团队也理不清该交付什么。把需求、提案、付款和时间线放进同一个案例，双方就有了唯一可信的依据。',
    },
    fit: {
      en: 'It is process design turned into a working system: mapping a request-to-delivery flow, defining the states and hand-offs between customer and admin, and building the screens and access rules around them — the core of business-systems and implementation work.',
      zh: '这是把流程设计落成可用系统：梳理从需求到交付的流程，定义客户与后台之间的状态和交接，再围绕它们搭建界面和访问规则——正是业务系统与系统实施工作的核心。',
    },
    roadmap: [
      {
        text: {
          en: 'Several supplier quotes per brief, compared side by side, with sample costs and lead times.',
          zh: '同一需求下汇集多家供应商报价并排对比，含样品费用与交期。',
        },
        ref: { name: 'Pietra', url: 'https://help.pietrastudio.com/en/articles/11649122-deploy-sourcing-agent' },
      },
      {
        text: {
          en: 'AI help with the first search: turning a brief into supplier candidates for a person to check.',
          zh: '用 AI 辅助第一轮搜寻：把需求转成候选供应商，再由人工核实。',
        },
        ref: { name: 'Alibaba Accio Agent', url: 'https://www.digitalcommerce360.com/2025/08/14/alibaba-b2b-search-engine-accio-agent/' },
      },
      {
        text: {
          en: 'Move to Supabase with row-level security, so each customer can only read their own cases.',
          zh: '迁移到 Supabase 并启用行级安全，让每位客户只能读取自己的案例。',
        },
        ref: { name: 'Supabase RLS', url: 'https://supabase.com/features/row-level-security' },
      },
    ],
    landscape: [
      {
        name: 'Pietra',
        url: 'https://help.pietrastudio.com/en/articles/11649122-deploy-sourcing-agent',
        note: {
          en: 'Sourcing platform whose AI agent asks factories about cost, minimum order quantity, lead time and samples, then summarises the answers.',
          zh: '采购平台，其 AI 代理向工厂询问成本、起订量、交期和样品，再汇总结果。',
        },
      },
      {
        name: 'Alibaba Accio',
        url: 'https://www.digitalcommerce360.com/2025/08/14/alibaba-b2b-search-engine-accio-agent/',
        note: {
          en: 'Alibaba International’s AI agent for automating much of the global sourcing process (reported August 2025).',
          zh: '阿里巴巴国际站的 AI 代理，用于自动完成全球采购的大部分流程（2025 年 8 月报道）。',
        },
      },
    ],
    facts: {
      en: ['Brief → proposal → case', 'Hashed access codes, none in URLs', 'Customer desk & admin workspace'],
      zh: ['需求 → 提案 → 案例', '访问码哈希存储，不进网址', '客户中心与后台工作台'],
    },
    gallery: [
      {
        src: '/projects/connoisseur/connoisseur-process.jpg',
        width: 1440,
        height: 900,
        caption: {
          en: 'The process as customers see it: brief, proposal, then a case followed to delivery.',
          zh: '客户看到的流程：提交需求、审核提案、跟进案例直至交付。',
        },
      },
      {
        src: '/projects/connoisseur/connoisseur-request.jpg',
        width: 1440,
        height: 900,
        caption: {
          en: 'Commission form: a structured brief, references, budget and quantity (empty form, public page).',
          zh: '委托表单：结构化需求、参考图、预算与数量（空白表单，公开页面）。',
        },
      },
      {
        src: '/projects/connoisseur/connoisseur-case.jpg',
        width: 1440,
        height: 900,
        caption: {
          en: 'Private case access: case number plus access code, never in the URL, locked after five failed attempts.',
          zh: '私密案例访问：案例编号加访问码，不进网址，连续失败五次即锁定。',
        },
      },
    ],
    evidence: {
      en: 'The README lists the implemented routes, hashed access codes, admin workspace and the persistence and payment limits. Screenshots show public pages only.',
      zh: 'README 列出了已实现的路由、访问码哈希、后台工作台，以及数据持久化和支付方面的限制。截图仅展示公开页面。',
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
  /** Caption on this role's illustrated frame beside the timeline (year · place). */
  frame: Text;
}[] = [
  {
    date: { en: 'May 2026 — Present', zh: '2026.05 — 至今' },
    frame: { en: '2026 · Shenzhen', zh: '2026 · 深圳' },
    role: {
      en: 'Cross-border E-commerce Operations',
      zh: '跨境电商运营',
    },
    org: {
      en: 'Triple A internetshops GmbH · Shenzhen',
      zh: 'Triple A internetshops GmbH · 深圳',
    },
    points: {
      en: [
        'Run Amazon operations for 8 European marketplaces (incl. UK, DE, FR, IT, ES) and 3 in North America (US, CA, MX), each with 2,000+ ASINs, in a business with eight-figure annual revenue (USD).',
        'Analyse sales, traffic, fees and competitor data to find the store’s real problems, then fix them through listing copy, localisation and advertising campaigns.',
        'Use Seller Central, Helium 10, Keepa and Amalytix for keyword, competitor and product research.',
      ],
      zh: [
        '负责 Amazon 欧洲 8 个站点（含英、德、法、意、西）及北美 3 个站点（美、加、墨）的运营，每个站点管理 2,000+ ASIN；所在业务年营收达数千万美元级别。',
        '分析销售、流量、费用及竞品数据，找出店铺的实际问题，并通过编写 listing、本地化商品信息和创建广告来优化解决、提升销量。',
        '使用 Seller Central、Helium 10、Keepa 和 Amalytix 开展关键词、竞品与产品研究。',
      ],
    },
    tools: ['Seller Central', 'Helium 10', 'Keepa', 'Amalytix'],
    project: null,
  },
  {
    date: { en: 'Jan — Apr 2026', zh: '2026.01 — 2026.04' },
    frame: { en: '2026 · Shenzhen', zh: '2026 · 深圳' },
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
    frame: { en: '2025 · Cork, Ireland', zh: '2025 · 爱尔兰科克' },
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
  heroIntro: {
    en: 'Computer Science MSc, University College Cork. I map how a process really runs, then design and build the tool, integration or AI-assisted step that improves it. My current role in European and North American Amazon operations keeps me close to the day-to-day work those systems have to fit.',
    zh: '爱尔兰科克大学计算机科学硕士。我先弄清一个流程实际如何运转，再设计并搭建改进它的工具、系统集成或 AI 辅助环节。目前在欧洲及北美 Amazon 运营一线工作，让我始终贴近这些系统要服务的日常业务。',
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
        en: 'Data analysis & marketing · Amazon EU & NA',
        zh: '数据分析与市场营销 · Amazon 欧洲及北美站',
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
  },
  caseMore: {
    value: { en: 'Why it matters', zh: '价值所在' },
    fit: { en: 'Why it fits the roles I’m after', zh: '与目标岗位的契合' },
    roadmap: { en: 'Where it could go next', zh: '下一步可以做什么' },
    roadmapRef: { en: 'Seen in', zh: '参考' },
    landscape: { en: 'Who else is working on this', zh: '谁在做类似的事' },
    checked: {
      en: 'Each source was checked against its own page in November 2026.',
      zh: '以上来源均于 2026 年 11 月对照原始页面核实。',
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
      en: 'MSc Computer Science (Interactive Media), University College Cork. I map how processes really run, then design and build the tools, integrations and AI-assisted steps that improve them. Projects turn an Excel-based process into a decision tool, connect live data into a monitoring view and build an LLM workflow with human review. Current role in European and North American Amazon operations, focused on data analysis and marketing. Skills: Python, SQL, Excel, web development and LLM API integration. Seeking implementation, business systems, process and technical business analyst roles.',
      zh: '爱尔兰科克大学计算机科学硕士（交互媒体）。我先弄清流程实际如何运转，再设计并搭建改进它的工具、系统集成与 AI 辅助环节。项目包括把 Excel 流程做成决策工具、把实时数据接入监控视图，以及带人工审核的大模型工作流。现任欧洲及北美 Amazon 运营，主要负责数据分析与市场营销。技能：Python、SQL、Excel、网页开发与大模型 API 集成。寻求系统实施、业务系统、流程分析与技术型业务分析相关岗位。',
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
        en: 'At Triple A, I analyse sales, traffic and competitor data to find where performance really breaks.',
        zh: '在 Triple A，我分析销售、流量和竞品数据，找出业绩真正卡住的地方。',
      },
      href: '#experience',
      link: { en: 'See my experience →', zh: '查看工作经历 →' },
    },
    {
      title: {
        en: 'Turn a process into a tool',
        zh: '把流程做成工具',
      },
      body: {
        en: 'MCDA turned an Excel-based research process into a web decision tool.',
        zh: 'MCDA 把基于 Excel 的科研流程做成了网页决策工具。',
      },
      href: '/work/mcda/',
      link: { en: 'See the MCDA case →', zh: '查看 MCDA 案例 →' },
    },
    {
      title: {
        en: 'Connect data and AI into the workflow',
        zh: '把数据与 AI 接入工作流',
      },
      body: {
        en: 'MoTai wires LLM APIs into a writing workflow, with the author reviewing generated text.',
        zh: 'MoTai 把大模型 API 接入写作流程，生成内容由作者审核。',
      },
      href: '/work/motai/',
      link: { en: 'See the MoTai case →', zh: '查看 MoTai 案例 →' },
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
  aboutMe: {
    en: 'About me ↓',
    zh: '关于我 ↓',
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
    live: { en: 'Live site ↗', zh: '在线访问 ↗' },
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
  // Illustrative BPMN-style map of a weekly performance review; not a client deliverable.
  processMap: {
    kicker: { en: 'Illustrative process map', zh: '示意流程图' },
    title: {
      en: 'Weekly performance review: current vs future state',
      zh: '每周经营复盘：现状与目标流程',
    },
    tabs: {
      asis: { en: 'Current state', zh: '现状流程' },
      tobe: { en: 'Future state', zh: '目标流程' },
    },
    lanes: {
      operator: { en: 'Operator', zh: '运营' },
      system: { en: 'System', zh: '系统' },
      reviewer: { en: 'Analyst', zh: '分析' },
    },
    asis: {
      start: { en: 'Week ends', zh: '周期结束' },
      export: { en: 'Export reports', zh: '导出各站报表' },
      read: { en: 'Merge and check sheets by hand', zh: '手工合并并逐表检查' },
      issue: { en: 'Problem found?', zh: '发现问题？' },
      fix: { en: 'Adjust listing or ads', zh: '调整商品页或广告' },
      done: { en: 'Done', zh: '完成' },
    },
    tobe: {
      start: { en: 'Week ends', zh: '周期结束' },
      extract: { en: 'Pull data, flag anomalies', zh: '拉取数据并标记异常' },
      valid: { en: 'Within normal range?', zh: '指标正常？' },
      publish: { en: 'Publish dashboard', zh: '发布复盘看板' },
      review: { en: 'Review flagged metric', zh: '复核异常指标' },
      fix: { en: 'Adjust listing or ads', zh: '调整商品页或广告' },
      done: { en: 'Done', zh: '完成' },
    },
    yes: { en: 'yes', zh: '是' },
    no: { en: 'no', zh: '否' },
    approve: { en: 'dismiss', zh: '忽略' },
    reject: { en: 'act', zh: '处理' },
    changes: {
      asis: {
        en: 'Every week someone merges reports by hand; problems surface late and depend on who is looking.',
        zh: '每周靠人工合并报表；问题发现得晚，也取决于谁在看。',
      },
      tobe: {
        en: 'Data is pulled and checked the same way every week; people only look at flagged metrics and decide what to change.',
        zh: '数据每周按同一标准自动拉取和检查；人只看被标记的指标，并决定怎么调整。',
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
