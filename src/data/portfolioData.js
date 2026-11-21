import axispoleImg from '../assets/projects/axispole-studio.png';
import guessifyImg from '../assets/projects/guessify.png';
import rollcall1Img from '../assets/projects/rollcall-1.png';
import rollcall2Img from '../assets/projects/rollcall-2.png';
import rollcall3Img from '../assets/projects/rollcall-3.png';
import currencyImg from '../assets/projects/currency-converter.png';

export const PROFILE = {
  name: 'Rishikesh Natu',
  monogram: 'RJN',
  role: 'Associate Web Developer',
  organization: 'Webster Solutions',
  location: 'Sangli, Maharashtra, India',
  email: 'naturishikesh0@gmail.com',
  phone: '+91 7350313854',
  education: {
    degree: "Bachelor's of Computer Applications (BCA)",
    institution: 'VPIMSR, Shivaji University Kolhapur',
    graduation: 'Expected 2026',
    subjects: [
      'System Introduction',
      'Software Engineering',
      'Requirement Engineering',
      'Software Testing & Quality Assurance',
    ],
  },
  socials: [
    {
      name: 'GitHub',
      handle: '@RJN-github',
      url: 'https://github.com/RJN-github',
    },
    {
      name: 'LinkedIn',
      handle: 'Rishikesh Natu',
      url: 'https://www.linkedin.com/in/rishikesh-natu-182b41306/',
    },
    {
      name: 'Instagram',
      handle: '@_____r_j_n_____',
      url: 'https://www.instagram.com/_____r_j_n_____/',
    },
  ],
  resume: {
    previewImage: '/resume/resume.png',
    pdfPath: '/resume/resume.pdf',
    downloadFilename: 'Rishikesh_Natu_Resume.pdf',
  },
  interests: [
    { label: 'Competitive Team Play', detail: 'Valorant (tactical comms & strategy)' },
    { label: 'Team Sports', detail: 'Football, Cricket, Volleyball, Badminton' },
    { label: 'Riding', detail: 'TVS Raider 125 · Exploring roads on two wheels' },
    { label: 'Networking', detail: 'Meeting builders and curious minds' },
  ],
};

export const EXPERIENCE_TIMELINE = [
  {
    id: 'webster-solutions',
    role: 'Associate Web Developer',
    organization: 'Webster Solutions',
    type: 'Current Role',
    summary:
      'Building and maintaining production WordPress websites, full-stack MERN (MongoDB, Express.js, React, Node.js) applications, Next.js interfaces, MySQL-backed systems, and interactive 3D spatial tools alongside agentic AI workflows—with supporting exposure to Astro and Laravel (Filament & Blade).',
    highlights: [
      'WordPress platform management, theme customization, and ongoing production upkeep.',
      'Full-stack MERN engineering (MongoDB, Express.js, React, Node.js) and Next.js web applications.',
      'Relational MySQL database integrations and interactive 3D spatial web tooling (AxisPole Studio) paired with agentic AI workflows.',
      'Supporting delivery exposure: Astro builds alongside Laravel, Filament, and Blade admin panels.',
    ],
    stack: [
      'MERN Stack',
      'React',
      'Next.js',
      'WordPress',
      'MySQL',
      'Node.js',
      'Agentic AI Workflows',
      'Astro · Laravel · Filament · Blade',
    ],
  },
  {
    id: 'ratnatray-part-time',
    role: 'Part-Time Web Developer',
    organization: 'Ratnatray Traders · Market Yard, Sangli',
    type: 'Part-Time Work',
    summary:
      'Worked part-time alongside daily trading operations at Ratnatray Traders in Market Yard, Sangli to digitize counter billing, customer/product ledgers, and A5 invoice printing into an offline-ready web system.',
    highlights: [
      'Engineered bill creation, editing, deletion, and invoice history lookup workflows (invoice.php, view_invoice.php, history.php).',
      'Structured customer and product persistence in MySQL (ratnatray_traders.sql) with portable offline execution via Laragon/XAMPP/SQLite.',
      'Authored print-calibrated A5 invoice stylesheets (a5.css) tailored for fast counter dispatch.',
    ],
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3 (a5.css)', 'Laragon / SQLite'],
  },
  {
    id: 'vpimsr-bca',
    role: "Bachelor's of Computer Applications (BCA)",
    organization: 'VPIMSR, Shivaji University Kolhapur',
    type: 'Education · Expected 2026',
    summary:
      'Undergraduate computer applications curriculum focused on software engineering, requirement analysis, testing & QA, and practical database systems.',
    highlights: [
      'Key subjects: System Introduction, Software Engineering, Requirement Engineering, Software Testing & QA.',
      'Built academic systems including Roll Call Rally (face recognition attendance) and Code Crafters (online quiz platform).',
    ],
    stack: ['Software Engineering', 'MySQL', 'PHP', 'JavaScript', 'Testing & QA'],
  },
];

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend Engineering' },
  { id: 'backend', label: 'Backend Engineering' },
  { id: 'cms', label: 'CMS & Platforms' },
  { id: 'databases', label: 'Databases' },
  { id: 'ecosystem', label: 'Developer Ecosystem' },
  { id: 'workflows', label: 'Modern Workflows' },
];

export const SKILLS = [
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    role: 'Core MERN frontend technology powering component architecture, hooks, state management, and 3D configurator UIs.',
    projects: ['axispole-studio', 'plugsy', 'orion-ipo-tracker', 'guessify', 'currency-converter'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    role: 'Full-stack React routing, server rendering, and structured production web application delivery.',
    projects: ['youtube-clone'],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    role: 'Core MERN backend runtime for event-driven WebSocket arenas and REST API services.',
    projects: ['guessify', 'youtube-clone'],
  },
  {
    id: 'expressjs',
    name: 'Express.js',
    category: 'backend',
    role: 'MERN HTTP routing, middleware pipelines, and Socket.IO multiplayer server hosting.',
    projects: ['guessify', 'youtube-clone'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'databases',
    role: 'NoSQL document persistence across MERN stack applications and media/user data flows.',
    projects: ['youtube-clone'],
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'cms',
    role: 'Managing production websites, theme customizations, content architecture, and client site maintenance.',
    projects: [],
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'databases',
    role: 'Relational database design, InnoDB foreign keys, billing records, and biometric attendance logs.',
    projects: ['ratnatray-traders', 'roll-call-rally', 'code-crafters'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    role: 'Core browser & Node.js language powering interactive UI, Three.js scenes, async APIs, and game loops.',
    projects: ['axispole-studio', 'guessify', 'ratnatray-traders', 'roll-call-rally', 'code-crafters'],
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    role: 'Semantic document structure, accessible landmarks, and print-ready invoice templates.',
    projects: ['ratnatray-traders', 'roll-call-rally', 'code-crafters'],
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'frontend',
    role: 'Responsive layouts, Tailwind CSS utility architecture, and A5 print styling.',
    projects: ['ratnatray-traders', 'currency-converter', 'roll-call-rally'],
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'backend',
    role: 'Server-side business logic, authentication, offline billing workflows, and attendance APIs.',
    projects: ['ratnatray-traders', 'roll-call-rally', 'code-crafters'],
  },
  {
    id: 'git',
    name: 'Git',
    category: 'ecosystem',
    role: 'Branching, version history, and collaborative codebase management.',
    projects: ['ratnatray-traders', 'guessify', 'roll-call-rally'],
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'ecosystem',
    role: 'Repository hosting, release tracking, and open project documentation.',
    projects: ['ratnatray-traders', 'guessify', 'roll-call-rally'],
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'ecosystem',
    role: 'Integrating external financial/data APIs and structuring backend endpoints.',
    projects: ['currency-converter', 'youtube-clone', 'roll-call-rally'],
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI Coding',
    category: 'workflows',
    role: 'AI-assisted engineering workflows for rapid prototyping, 3D spatial CAD tooling, and verification.',
    projects: ['axispole-studio', 'orion-ipo-tracker', 'plugsy'],
  },
  {
    id: 'astro',
    name: 'Astro',
    category: 'frontend',
    supporting: true,
    role: 'Supporting production exposure for fast content-focused web builds at Webster Solutions.',
    projects: [],
  },
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'backend',
    supporting: true,
    role: 'Supporting production exposure to structured MVC routing and relational workflows at Webster Solutions.',
    projects: [],
  },
  {
    id: 'filament',
    name: 'Filament',
    category: 'backend',
    supporting: true,
    role: 'Supporting exposure building clean administrative panels on Laravel.',
    projects: [],
  },
  {
    id: 'blade',
    name: 'Blade',
    category: 'backend',
    supporting: true,
    role: 'Supporting exposure to server-rendered Laravel templating views.',
    projects: [],
  },
];

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Work' },
  { id: 'business', label: 'Business & Full-Stack' },
  { id: 'realtime', label: 'Real-Time & Spatial' },
  { id: 'frontend', label: 'Finance & Utilities' },
];

export const RIDER_GALLERY = [
  {
    id: 'ghat-overlook',
    index: '01',
    title: 'Western Ghats Ridge Overlook',
    kicker: 'Ghats · Vega Sonic Visor',
    src: '/assets/aistudio/IMG20260523085337_1c563b32.jpg',
    objectPosition: '50% 26%',
    caption:
      'High-altitude monsoon haze along the ghat guardrail—Vega full-face helmet, riding gloves, and the grey TVS Raider 125 overlooking terraced valleys.',
  },
  {
    id: 'coastal-seawall',
    index: '02',
    title: 'Konkan Coast Seawall Stop',
    kicker: 'Coastline · TVS Raider 125',
    src: '/assets/aistudio/IMG20260523111607_0e3bcce3.jpg',
    objectPosition: '50% 35%',
    caption:
      'Stepping off the saddle beside the beach promenade—matte grey Raider 125 bodywork contrasted with bright red 5-spoke alloys.',
  },
  {
    id: 'arabian-horizon',
    index: '03',
    title: 'Arabian Sea Horizon Pause',
    kicker: 'Open Coast · Side Profile',
    src: '/assets/aistudio/IMG20260524084818_ce810bfa.jpg',
    objectPosition: '50% 54%',
    caption:
      'Unfiltered coastal highway stretch looking out toward rolling tide lines under heavy monsoon cloud cover.',
  },
  {
    id: 'raider-crimson-alloys',
    index: '04',
    title: 'TVS Raider 125 — Coastal Cliff Solo',
    kicker: 'MH-10 · Red Alloy Spec',
    src: '/assets/aistudio/IMG20260524085319_00efdafd.jpg',
    objectPosition: '42% 62%',
    caption:
      'Clean three-quarter stance of the matte grey TVS Raider 125 parked on red laterite soil above the waves.',
  },
  {
    id: 'dusk-bridge-run',
    index: '05',
    title: 'Amber Dusk Bridge Run',
    kicker: 'Sunset · River Crossing',
    src: '/assets/aistudio/IMG20260524191945_7574eade.jpg',
    objectPosition: '50% 56%',
    caption:
      'Closing out the ride at twilight along the bridge—pink-gold sky reflecting across the river with the Raider DRL headlamp lit.',
  },
];

export const RIDER_SLOTS = RIDER_GALLERY;

export const PROJECTS = [
  {
    id: 'ratnatray-traders',
    index: '01',
    featured: true,
    featuredTier: 'flagship',
    title: 'Ratnatray Traders — Billing & Invoice App',
    subtitle: 'Practical offline-capable billing & A5 invoice system built for a local Sangli business',
    category: 'business',
    categoryLabel: 'Business & Full-Stack',
    year: '2025',
    description:
      'A custom billing and invoice management application built for Ratnatray Traders in Market Yard, Sangli—simplifying product entry, customer records, and print-ready A5 invoice generation.',
    problem:
      'Manual paper billing and disjointed customer/product tracking slowed down daily counter operations and invoice printing for Ratnatray Traders.',
    solution:
      'Built a lightweight PHP and MySQL web application with dedicated A5 print stylesheets (a5.css), instant invoice creation (invoice.php), view/edit bill lookup (view_invoice.php, history.php), and offline portability via Laragon/SQLite.',
    features: [
      'Create, view, edit, and delete customer bills and line items',
      'Customer and product record persistence in MySQL (ratnatray_traders.sql)',
      'Dedicated A5 print-formatted invoice rendering (a5.css)',
      'Offline-ready local deployment via XAMPP, Laragon, or portable PHP/SQLite',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    github: 'https://github.com/RJN-github/ratnatray',
    live: '',
    previewType: 'none',
    screenshots: [],
    repoFiles: ['invoice.php', 'view_invoice.php', 'history.php', 'a5.css', 'ratnatray_traders.sql'],
  },
  {
    id: 'axispole-studio',
    index: '02',
    featured: true,
    featuredTier: 'flagship',
    title: 'AxisPole Studio — 3D Pole Setup & Spatial CAD',
    subtitle: 'Interactive 3D rig configurator & CAD planner with upcoming AR-Room-to-3D sync',
    category: 'realtime',
    categoryLabel: 'Real-Time & Spatial',
    year: '2026',
    description:
      'A live 3D spatial configurator and CAD planner developed at Webster Solutions—allowing users to customize studio poles in real time across finishes, ceiling heights, mount hardware, and lighting rigs. Currently in active development.',
    problem:
      'Planning studio or home pole installations across varying ceiling heights, vaulted slopes, and safe clearance zones is error-prone without live 3D spatial feedback.',
    solution:
      'Engineered an interactive Three.js 3D studio viewport with material finish presets (Brass, Stainless, Powder Black, Silicone), ceiling mount types (Tension, Fixed, Vaulted, Stage), lighting presets, Orbit/Crane camera rigs, and CAD export—with upcoming AR Room Measure import into the 3D Model mode.',
    features: [
      'Real-time 3D viewport with Brass, Stainless, Powder Black & Silicone material switching',
      'Height calibration (2.74m+), diameter toggles (40/45/50mm), spin mode & mounting clearance checks',
      'Studio Daylight, Mood/Night Neon & Professional Spotlight lighting manager plus Orbit/Crane views',
      'Active Development Roadmap: Direct room-setting import from AR Room Measure into 3D Model mode',
    ],
    tech: ['React', 'Three.js', 'WebGL', 'JavaScript', 'Tailwind CSS', 'Spatial CAD'],
    github: '',
    conceptStatus: 'In Active Development · AR Room → 3D Sync Upcoming',
    live: 'https://axispole-webster.onvoroa.com/',
    previewType: 'screenshot',
    screenshots: [
      {
        src: axispoleImg,
        caption: 'AxisPole Studio live 3D pole configurator, material dock & ceiling clearance HUD',
        fit: 'cover',
      },
    ],
    repoFiles: [],
  },
  {
    id: 'plugsy',
    index: '03',
    featured: true,
    featuredTier: 'flagship',
    title: 'Plugsy — P2P EV Charging Marketplace',
    subtitle: 'Peer-to-peer EV charging concept connecting local drivers with verified host sockets',
    category: 'business',
    categoryLabel: 'Business & Full-Stack',
    year: '2026',
    description:
      'An original product concept deployed live—enabling EV drivers in India to book verified charging bays at nearby homes, cafés, or courtyards on an interactive map while hosts earn passive income from idle sockets.',
    problem:
      'EV adoption in tier-2 cities like Sangli lacks dense public fast-charging stations, even though many homes and local properties already have capable power points.',
    solution:
      'Designed and shipped a live web marketplace prototype featuring interactive Leaflet map bay discovery around Sangli, live kW/kWh session status previews, per-kWh host pricing, and dual driver/host entry flows.',
    features: [
      'Interactive Leaflet + OpenStreetMap bay map with live pin pricing (e.g. ₹19 / Sangli Museum 22 kW CCS2)',
      'Live charging session telemetry card preview (32 kW · 8.4 kWh delivered)',
      'Dedicated flows for EV drivers ("Find a charger near you") and hosts ("List your socket")',
      'Clean dark editorial interface deployed live on Vercel (private concept, not yet on GitHub)',
    ],
    tech: ['React', 'Tailwind CSS', 'Leaflet', 'OpenStreetMap', 'Vercel'],
    github: '',
    conceptStatus: 'Private Concept · Not yet on GitHub',
    live: 'https://plugsyy.vercel.app/',
    previewType: 'screenshot',
    screenshots: [
      {
        src: '/assets/aistudio/image_707f4a80.png',
        caption: 'Plugsy live homepage & Sangli interactive EV bay discovery interface',
        fit: 'contain',
      },
    ],
    repoFiles: [],
  },
  {
    id: 'orion-ipo-tracker',
    index: '04',
    featured: false,
    featuredTier: 'secondary',
    title: 'Orion — Family IPO Portfolio Tracker',
    subtitle: 'Private multi-account IPO allotment, P/L & 15% HEM commission workspace',
    category: 'frontend',
    categoryLabel: 'Finance & Utilities',
    year: '2026',
    description:
      'A locked personal finance workspace built to track family IPO applications, allotment rates, account-level profit/loss, net earnings, and automatic 15% HEM commission calculations across accounts.',
    problem:
      'Tracking IPO applications, allotments, split family accounts, and profit-sharing commissions across spreadsheets becomes tedious and error-prone during busy IPO cycles.',
    solution:
      'Built a clean emerald-dark private finance workspace with workspace locking, Overview/Accounts/Reports views, live KPI summaries (Account P/L, Net Earnings, 15% HEM Commission, Allotment Rate), Light/Dark toggle, and filterable IPO activity ledger.',
    features: [
      'Multi-account IPO desk separating own P/L, net earnings, and 15% positive HEM commission',
      'Live IPO allotment rate counter and Apply -> Allot -> Grow tracking card',
      'Searchable portfolio activity table filterable by account and application status',
      'Locked workspace access with local draft persistence and Light Mode switch',
    ],
    tech: ['React', 'Tailwind CSS', 'Local Draft State', 'Vercel'],
    github: '',
    conceptStatus: 'Locked Private Workspace',
    live: 'https://orion-ipo-tracker.vercel.app/',
    previewType: 'screenshot',
    screenshots: [
      {
        src: '/assets/aistudio/image_bda6b878.png',
        caption: 'Orion Family IPO Desk — Account P/L, 15% HEM commission & allotment overview',
        fit: 'contain',
      },
    ],
    repoFiles: [],
  },
  {
    id: 'guessify',
    index: '05',
    featured: false,
    featuredTier: 'secondary',
    title: 'Guessify',
    subtitle: 'Real-time multiplayer drawing & guessing arena with private rooms',
    category: 'realtime',
    categoryLabel: 'Real-Time & Spatial',
    year: '2025',
    description:
      'A real-time multiplayer drawing and guessing game inspired by Skribbl.io—supporting instant private rooms, live canvas stroke broadcasting, and speed-based scoring.',
    problem:
      'Synchronizing live drawing strokes, turn timers, word selection, and room chat across multiple concurrent players requires low-latency bidirectional state sync.',
    solution:
      'Architected a decoupled React + Zustand client paired with an Express and Socket.IO WebSocket server for private room matchmaking, synchronized canvas events, and real-time scoreboards.',
    features: [
      'Instant private room creation and invite-code joining without sign-up',
      'Low-latency Socket.IO drawing canvas synchronization and live chat guessing',
      'Turn rotation, round timers, and speed-weighted point scoring',
      'Client state orchestration with Zustand and Express backend',
    ],
    tech: ['React', 'JavaScript', 'Node.js', 'Express.js', 'Socket.IO', 'Zustand'],
    github: 'https://github.com/RJN-github/guessify',
    live: 'https://guessify-0.onrender.com/',
    previewType: 'screenshot',
    screenshots: [{ src: guessifyImg, caption: 'Guessify live lobby & private room interface' }],
    repoFiles: ['client/', 'server/', 'package.json'],
  },
  {
    id: 'roll-call-rally',
    index: '06',
    featured: false,
    featuredTier: 'standard',
    title: 'Roll Call Rally',
    subtitle: 'Browser-based face recognition & QR attendance system for colleges',
    category: 'realtime',
    categoryLabel: 'Real-Time & Spatial',
    year: '2026',
    description:
      'A multi-role college attendance platform running face recognition directly in the browser via face-api.js—complete with blink liveness checks, QR fallback, and MySQL shift reporting.',
    problem:
      'Traditional attendance registers are slow and vulnerable to proxy marking, while external cloud ML servers add hosting cost and complexity for college deployments.',
    solution:
      'Engineered an XAMPP-ready PHP 8+ and MySQL 8 InnoDB system where face-api.js performs browser-side single-face detection and liveness verification, storing face encodings in LONGBLOB with jsQR fallback.',
    features: [
      'Webcam face detection with single-face filter and blink liveness check',
      'QR code attendance fallback via jsQR for poor lighting environments',
      'Multi-role dashboards: Student, Teacher, Class Teacher, and Admin',
      'Morning/evening shift validation and parameterized percentage attendance reports',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'face-api.js', 'PHP', 'MySQL'],
    github: 'https://github.com/RJN-github/ROLLCALLRALLY',
    live: '',
    previewType: 'screenshot',
    screenshots: [
      { src: rollcall3Img, caption: 'Live browser webcam face detection & punch-in view' },
      { src: rollcall1Img, caption: 'Roll Call Rally portal landing & role entry' },
      { src: rollcall2Img, caption: '4-step biometric enrollment & reporting workflow' },
    ],
    repoFiles: ['punch.php', 'assets/models/', 'database.sql'],
  },
  {
    id: 'youtube-clone',
    index: '07',
    featured: false,
    featuredTier: 'standard',
    title: 'YouTube Clone 2.0',
    subtitle: 'Full-stack video streaming platform built during NullClass Ltd. internship',
    category: 'business',
    categoryLabel: 'Business & Full-Stack',
    year: '2025',
    description:
      'A full-stack video platform built for an internship at NullClass Ltd., combining Next.js TypeScript UI with video uploading, streaming, recommendations, and user authentication.',
    problem:
      'Delivering a cohesive video discovery, upload, and playback interface requires coordinated state across media routes, authentication, and backend storage.',
    solution:
      'Developed with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components backed by Node.js, Express, and MongoDB APIs.',
    features: [
      'Video uploading and adaptive playback flows',
      'User authentication and account session handling',
      'Dynamic feed and video recommendation layout',
      'Type-safe Next.js + TypeScript frontend architecture',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/RJN-github/youtube-clone2.0',
    live: 'https://youtube-clone2-0-eight.vercel.app/',
    previewType: 'blueprint-video',
    screenshots: [],
    repoFiles: ['next.config.ts', 'src/', 'components/', 'videos/'],
  },
  {
    id: 'code-crafters',
    index: '08',
    featured: false,
    featuredTier: 'standard',
    title: 'Code Crafters',
    subtitle: 'Authenticated online coding quiz platform with score history & admin console',
    category: 'business',
    categoryLabel: 'Business & Full-Stack',
    year: '2025',
    description:
      'A VPIMSR college project providing an interactive coding quiz experience with user registration, instant answer feedback, persistent score tracking, and admin management.',
    problem:
      'Students practicing programming fundamentals need structured MCQs with immediate feedback and persistent attempt history rather than static one-off quizzes.',
    solution:
      'Built a PHP and MySQL web application (register.php, login.php, quiz.php, setscore.php, history.php, admin.php) with responsive styling and DOM-driven quiz flow.',
    features: [
      'User authentication (login.php, register.php) and admin portal',
      'Interactive coding MCQs with instant answer validation',
      'Persistent user score calculation (setscore.php) and attempt history',
      'Relational MySQL database schema (code_crafters.sql)',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    github: 'https://github.com/RJN-github/CodeCrafters',
    live: '',
    previewType: 'blueprint-quiz',
    screenshots: [],
    repoFiles: ['quiz.php', 'setscore.php', 'history.php', 'admin.php', 'code_crafters.sql'],
  },
  {
    id: 'currency-converter',
    index: '09',
    featured: false,
    featuredTier: 'standard',
    title: 'Currency Converter',
    subtitle: 'Live foreign exchange calculator powered by the Frankfurter API',
    category: 'frontend',
    categoryLabel: 'Finance & Utilities',
    year: '2025',
    description:
      'A responsive React and Tailwind CSS currency converter fetching real-time exchange rates from the Frankfurter API with instant currency swapping.',
    problem:
      'Checking live multi-currency conversions quickly requires clean input controls, instant bi-directional swap logic, and reliable rate fetching.',
    solution:
      'Built custom React hooks and modular currency input components integrating directly with the Frankfurter REST API.',
    features: [
      'Real-time exchange rates fetched from the Frankfurter REST API',
      'One-click From/To currency pair swap',
      'Responsive frosted interface built with Tailwind CSS',
    ],
    tech: ['React', 'Tailwind CSS', 'JavaScript', 'REST APIs'],
    github: 'https://github.com/RJN-github/Currency_Convertor',
    live: 'https://currency-convertor-one-mu.vercel.app/',
    previewType: 'screenshot',
    screenshots: [{ src: currencyImg, caption: 'Currency Converter live USD to INR calculation' }],
    repoFiles: ['src/', 'package.json'],
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-axispole',
    title: 'AxisPole Studio — 3D Pole & Spatial CAD',
    category: 'Live Interfaces',
    kind: 'In Active Development',
    caption: 'Interactive Three.js pole configurator with AR-Room-to-3D model sync in active development.',
    src: axispoleImg,
    projectId: 'axispole-studio',
    aspect: 'wide',
  },
  {
    id: 'gal-orion-ipo',
    title: 'Orion — Family IPO Portfolio Desk',
    category: 'Live Interfaces',
    kind: 'Locked Workspace Capture',
    caption: 'Account P/L, 15% HEM commission breakdown, and IPO allotment rate analytics.',
    src: '/assets/aistudio/image_bda6b878.png',
    fit: 'contain',
    projectId: 'orion-ipo-tracker',
    aspect: 'standard',
  },
  {
    id: 'gal-plugsy-hero',
    title: 'Plugsy — Sangli EV Charging Marketplace',
    category: 'Live Interfaces',
    kind: 'Live Concept Capture',
    caption: 'Interactive Leaflet host-bay map around Sangli with live session pricing & driver/host flows.',
    src: '/assets/aistudio/image_707f4a80.png',
    fit: 'contain',
    projectId: 'plugsy',
    aspect: 'standard',
  },
  {
    id: 'gal-rollcall-cam',
    title: 'Roll Call Rally — Live Biometric Punch',
    category: 'Biometrics & Systems',
    kind: 'Genuine Project Screenshot',
    caption: 'Browser-side face-api.js bounding box detection and blink verification running on PHP 8 + MySQL.',
    src: rollcall3Img,
    projectId: 'roll-call-rally',
    aspect: 'wide',
  },
  {
    id: 'gal-guessify-lobby',
    title: 'Guessify — Multiplayer Lobby',
    category: 'Live Interfaces',
    kind: 'Live Deployment Capture',
    caption: 'Private room creation and Socket.IO matchmaking interface live on Render.',
    src: guessifyImg,
    projectId: 'guessify',
    aspect: 'wide',
  },
  {
    id: 'gal-currency',
    title: 'Currency Converter — Live FX Rate UI',
    category: 'Live Interfaces',
    kind: 'Live Deployment Capture',
    caption: 'Real-time Frankfurter API rate conversion with instant pair swapping.',
    src: currencyImg,
    projectId: 'currency-converter',
    aspect: 'standard',
  },
  {
    id: 'gal-rollcall-flow',
    title: 'Roll Call Rally — Enrollment & Reporting Flow',
    category: 'Biometrics & Systems',
    kind: 'Genuine Project Screenshot',
    caption: 'Four-step student/faculty onboarding from webcam enrollment to attendance trend export.',
    src: rollcall2Img,
    projectId: 'roll-call-rally',
    aspect: 'wide',
  },
];
