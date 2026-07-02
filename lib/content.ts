// Central content for the ViramTech enterprise-AI site.

export const TAGLINE =
  "Transforming Enterprise Operations with Intelligent AI Solutions";

// ① The Enterprise AI Gap
export const gaps = [
  {
    title: "Data trapped in silos",
    body: "Critical data lives in dozens of disconnected systems — CRMs, ERPs, spreadsheets and data lakes — so no one can see the full picture or act on it in time.",
    points: [
      "No single source of truth across teams",
      "Hours lost to manual exports and reconciliation",
      "Decisions made on stale, partial data",
    ],
  },
  {
    title: "Manual, repetitive work",
    body: "Skilled teams spend their days on data entry, copy-paste and routine approvals — work that drains morale and only scales by adding more headcount.",
    points: [
      "High-value talent stuck on low-value tasks",
      "Error-prone processes that don't scale",
      "Slow turnaround on routine requests",
    ],
  },
  {
    title: "AI without ROI",
    body: "Most enterprise AI never leaves the lab. Pilots impress in a demo but stall before production, with no clear link to revenue or cost saved.",
    points: [
      "Proofs-of-concept that never ship",
      "No measurable impact on the bottom line",
      "Models not built for real-world workloads",
    ],
  },
  {
    title: "Fragmented tooling",
    body: "A patchwork of point solutions — each with its own contract, integration and learning curve — only adds cost, complexity and security surface.",
    points: [
      "Overlapping tools and duplicated spend",
      "Brittle integrations that break often",
      "More vendors means more risk and overhead",
    ],
  },
];

// ② Our Vision
export const vision = [
  {
    title: "AI-native architecture",
    body: "Mathematically rigorous and AI-native by design — not bolted onto legacy systems.",
  },
  {
    title: "Enterprise ready",
    body: "Security and scalability are built in from the first line of code.",
  },
  {
    title: "Results driven",
    body: "Every engagement is anchored to measurable ROI, not vanity metrics.",
  },
];

// Vision page — vision & mission statements + topic timeline
export const visionMission = {
  vision:
    "To close the gap between enterprise AI ambition and measurable results — making AI-native systems the default, not the exception.",
  mission:
    "We transform enterprise operations with intelligent AI — pairing mathematical rigor with production engineering to ship solutions that are secure, scalable and accountable to ROI.",
};

export type VisionTopic = {
  topic: string;
  heading: string;
  body: string;
  points: string[];
};

export const visionTimeline: VisionTopic[] = [
  {
    topic: "The Enterprise AI Gap",
    heading: "Why we exist",
    body: "Most enterprises aren't short on AI ambition — they're stuck on the fundamentals that stop it from paying off.",
    points: [
      "Data trapped in silos that resist integration",
      "Manual processes burning hours on repetitive work",
      "AI investments that never reach measurable ROI",
      "A sprawl of fragmented tools that only add complexity",
    ],
  },
  {
    topic: "AI-native by design",
    heading: "The right foundation",
    body: "We're mathematically rigorous and AI-native from the first line of code — not AI bolted onto legacy systems years later.",
    points: [
      "Native AI architecture, not retrofitted plugins",
      "Models, data and infrastructure designed together",
      "Built on open, portable frameworks",
    ],
  },
  {
    topic: "Enterprise-ready",
    heading: "Secure and scalable from day one",
    body: "Security and scalability aren't features we add at the end — they're part of the architecture, so solutions hold up under real workloads.",
    points: [
      "Security designed in, not bolted on",
      "Scales from pilot to production without a rewrite",
      "Multi-cloud and observable by default",
    ],
  },
  {
    topic: "Results-driven",
    heading: "Measured by ROI, not hype",
    body: "Every engagement is anchored to measurable business outcomes — the metrics leadership already cares about, not demo-day vanity numbers.",
    points: [
      "Success defined in business terms up front",
      "ROI tracked, not assumed",
      "Production impact over proof-of-concept theatre",
    ],
  },
];

// ③ Technology Foundation
export const foundation = [
  {
    title: "AI / ML Capabilities",
    description:
      "The core intelligence layer. We build production-grade models for language, vision, speech and forecasting — then wrap them in autonomous agents that don't just predict, but act on what they learn.",
    items: [
      "Natural Language Processing",
      "Computer Vision",
      "Speech Recognition",
      "Predictive Analytics",
      "Agentic AI Systems",
    ],
  },
  {
    title: "Infrastructure",
    description:
      "The backbone that keeps it all running. Multi-cloud deployments, automated delivery pipelines and security designed in from day one — so solutions scale to real workloads without surprises or downtime.",
    items: [
      "Multi-cloud (AWS, GCP, Azure)",
      "DevOps & CI/CD",
      "Scalable Microservices",
      "Enterprise Security",
    ],
  },
  {
    title: "AI Frameworks",
    description:
      "The tooling that ties everything together. We orchestrate with LangChain, integrate both commercial and open-source LLMs, and fine-tune models on your own data so they speak your business — not generic boilerplate.",
    items: [
      "LangChain",
      "Custom LLM integration",
      "Open-source models",
      "Fine-tuning pipelines",
    ],
  },
];

// ④–⑩ Products / Solutions
export type Product = {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  features: string[];
  useCases: string;
  icon: string;
  /** Optional header image in /public/products/<slug>.jpg */
  image?: string;
  /** 4–6 structured use cases */
  useCaseList?: { title: string; body: string }[];
  /** Industry-specific solutions */
  industries?: { name: string; icon: string; solution: string }[];
  /** Impact metrics for the chart (bar is 0–100 for the bar height) */
  metrics?: { label: string; value: string; bar: number }[];
};

// Representative (illustrative) case studies, keyed by product slug.
export type CaseStudy = {
  industry: string;
  client: string;
  challenge: string;
  approach: string;
  results: { value: string; label: string }[];
  quote: string;
  attribution: string;
};

export const productCaseStudies: Record<string, CaseStudy> = {
  dataforge: {
    industry: "Retail analytics",
    client: "A national grocery retailer",
    challenge:
      "Analysts spent days writing SQL and stitching dashboards together; business teams waited a week for answers that were already stale by the time they arrived.",
    approach:
      "DataForge connected their warehouse, POS and supply-chain feeds behind a governed natural-language interface — so anyone could ask a question and get a real-time, trustworthy answer.",
    results: [
      { value: "85%", label: "less time to insight" },
      { value: "6", label: "data sources unified" },
      { value: "3×", label: "more self-serve queries" },
    ],
    quote:
      "Our merchandisers stopped filing ticket requests and just started asking. Decisions that took a week now take minutes.",
    attribution: "VP of Analytics, national grocery retailer",
  },
  "predictive-demand-intelligence": {
    industry: "Consumer goods",
    client: "A mid-market CPG manufacturer",
    challenge:
      "Flat, spreadsheet-based forecasts left them oscillating between stockouts on hot SKUs and warehouses full of dead inventory.",
    approach:
      "We deployed SKU-level demand models that fold in seasonality, promotions and external signals, feeding directly into their replenishment system.",
    results: [
      { value: "32%", label: "fewer stockouts" },
      { value: "21%", label: "less excess inventory" },
      { value: "12pts", label: "forecast accuracy gain" },
    ],
    quote:
      "For the first time, our supply plan actually matches what the market does.",
    attribution: "Head of Supply Chain, CPG manufacturer",
  },
  "document-intelligence-suite": {
    industry: "Financial services",
    client: "A regional lender",
    challenge:
      "Loan onboarding meant staff keying data from PDFs by hand — slow, error-prone, and impossible to scale during rate-driven application surges.",
    approach:
      "The suite auto-classifies incoming documents, extracts and validates every field, and routes only true exceptions to a human — with a full audit trail for compliance.",
    results: [
      { value: "90%", label: "faster processing" },
      { value: "99.2%", label: "extraction accuracy" },
      { value: "70%", label: "less manual keying" },
    ],
    quote: "We cleared our loan backlog without adding a single headcount.",
    attribution: "Director of Operations, regional lender",
  },
  "predictive-maintenance-ai": {
    industry: "Manufacturing",
    client: "A multi-plant industrial manufacturer",
    challenge:
      "Unplanned equipment failures halted lines without warning, while calendar-based servicing wasted labor on machines that were perfectly fine.",
    approach:
      "Sensor streams feed failure-prediction models that flag anomalies days ahead and schedule maintenance only when it's genuinely needed.",
    results: [
      { value: "40%", label: "less downtime" },
      { value: "25%", label: "longer asset life" },
      { value: "18%", label: "lower maintenance cost" },
    ],
    quote:
      "We went from firefighting breakdowns to scheduling them out of existence.",
    attribution: "Plant Operations Lead, industrial manufacturer",
  },
  "enterprise-content-studio": {
    industry: "E-commerce",
    client: "A fast-growing online marketplace",
    challenge:
      "A three-person content team couldn't keep up with tens of thousands of product listings, each needing on-brand, localized copy.",
    approach:
      "Content Studio generates brand-aligned descriptions at scale across languages, with the team reviewing and approving rather than writing from scratch.",
    results: [
      { value: "10×", label: "content output" },
      { value: "8", label: "languages localized" },
      { value: "60%", label: "lower cost per asset" },
    ],
    quote:
      "We localized our entire catalog in a quarter — something we'd deferred for years.",
    attribution: "Head of Growth, online marketplace",
  },
  "whatsapp-ai-reach": {
    industry: "Insurance",
    client: "A digital insurance broker",
    challenge:
      "Leads went cold waiting for callbacks, and agents burned hours qualifying prospects who were never a fit.",
    approach:
      "An AI agent engages every inbound lead on WhatsApp instantly, qualifies them conversationally in their own language, and books only the ones worth an agent's time.",
    results: [
      { value: "2.4×", label: "qualified leads" },
      { value: "24/7", label: "instant response" },
      { value: "38%", label: "lower cost per acquisition" },
    ],
    quote:
      "Our agents now spend their day on people ready to buy, not chasing dead ends.",
    attribution: "VP of Sales, digital insurance broker",
  },
  "agentic-ai-platform": {
    industry: "B2B software",
    client: "A scaling SaaS company",
    challenge:
      "Rising ticket volume forced a choice between ballooning support costs and slipping response times.",
    approach:
      "Autonomous agents resolve routine tickets end-to-end — pulling from internal systems, taking action, and escalating only what genuinely needs a human.",
    results: [
      { value: "62%", label: "tickets auto-resolved" },
      { value: "70%", label: "faster resolution" },
      { value: "24/7", label: "coverage" },
    ],
    quote:
      "Support stopped being a headcount problem and became a product feature.",
    attribution: "Director of Customer Experience, B2B SaaS",
  },
};

// Representative (illustrative) case studies, keyed by sector slug.
// Reuses the CaseStudy shape so the industry pages render like the product pages.
export const sectorCaseStudies: Record<string, CaseStudy> = {
  retail: {
    industry: "Retail & E-commerce",
    client: "A national fashion & lifestyle retailer",
    challenge:
      "Seasonal swings left best-sellers out of stock while slow movers piled up in the warehouse, and generic product pages converted a fraction of the traffic they drew.",
    approach:
      "We layered SKU-level demand forecasting over their POS and web data, wired real-time personalization into the storefront, and fed both into an inventory engine that rebalances stock across stores automatically.",
    results: [
      { value: "30%", label: "fewer stockouts" },
      { value: "15%", label: "higher conversion" },
      { value: "22%", label: "less overstock" },
    ],
    quote:
      "We finally buy what actually sells, and the site sells it harder. Two problems we'd fought for years, solved together.",
    attribution: "Chief Merchandising Officer, national retailer",
  },
  logistics: {
    industry: "Logistics",
    client: "A regional third-party logistics carrier",
    challenge:
      "Fuel and labor costs climbed on every lane, demand spikes routinely outran capacity planning, and reactive repairs kept pulling trucks off the road at the worst moments.",
    approach:
      "Dynamic routing now adapts to traffic, weather and load in real time, lane-level demand models size capacity ahead of the surge, and sensor-driven maintenance flags failures before they strand a vehicle.",
    results: [
      { value: "18%", label: "lower fuel cost" },
      { value: "99%", label: "on-time delivery" },
      { value: "25%", label: "less unplanned downtime" },
    ],
    quote:
      "Our trucks run fuller, cheaper and on schedule — and they stay on the road because we service them before they break.",
    attribution: "VP of Operations, regional 3PL carrier",
  },
  banking: {
    industry: "Banking & Financial Services",
    client: "A mid-sized commercial bank",
    challenge:
      "Fraud moved faster than manual review could catch, loan and KYC paperwork bottlenecked onboarding, and broad marketing spend showed little measurable return.",
    approach:
      "Real-time anomaly detection scores every transaction in milliseconds, automated extraction turns loan and KYC documents into decision-ready data, and next-best-action models put the right product in front of the right customer.",
    results: [
      { value: "90%", label: "faster document processing" },
      { value: "60%", label: "faster fraud detection" },
      { value: "3×", label: "marketing ROI" },
    ],
    quote:
      "We catch fraud in real time, approve loans in a day, and finally know which offers actually land.",
    attribution: "Head of Digital Banking, commercial bank",
  },
  healthcare: {
    industry: "Healthcare",
    client: "A multi-site hospital network",
    challenge:
      "Clinicians drowned in unstructured notes and forms, patient insight sat trapped across disconnected systems, and operational bottlenecks pushed wait times ever longer.",
    approach:
      "We turned clinical notes, forms and claims into structured, searchable data, layered risk-stratification analytics over the unified record, and used demand forecasting to optimize scheduling — all HIPAA-compliant by design.",
    results: [
      { value: "90%", label: "faster record processing" },
      { value: "30%", label: "shorter wait times" },
      { value: "HIPAA", label: "compliant by design" },
    ],
    quote:
      "Our clinicians spend their time on patients, not paperwork — and the data they need is finally in one place.",
    attribution: "Chief Medical Information Officer, hospital network",
  },
  manufacturing: {
    industry: "Manufacturing",
    client: "A precision-parts manufacturer",
    challenge:
      "Unplanned equipment failures halted production without warning, supply-chain blind spots caused scramble after scramble, and defects were caught only after they'd already shipped.",
    approach:
      "Sensor-driven models now predict failures days ahead and extend asset life, end-to-end supply-chain forecasting absorbs shocks before they reach the line, and computer-vision inspection catches defects in real time.",
    results: [
      { value: "40%", label: "less downtime" },
      { value: "40%", label: "fewer defects" },
      { value: "15%", label: "lower inventory cost" },
    ],
    quote:
      "We schedule maintenance out of existence, catch defects before they leave the floor, and hold far less stock doing it.",
    attribution: "Director of Plant Operations, precision manufacturer",
  },
  insurance: {
    industry: "Insurance",
    client: "A property & casualty insurer",
    challenge:
      "Manual claims handling dragged settlements out for weeks, risk was priced on too little signal, and policyholders drifted away between renewals.",
    approach:
      "Automated intake, triage and fraud checks settle valid claims fast, richer models price risk with far more signal and less bias, and proactive, personalized outreach keeps policyholders engaged across the lifecycle.",
    results: [
      { value: "50%", label: "faster claims" },
      { value: "20%", label: "better loss ratio" },
      { value: "2×", label: "policyholder engagement" },
    ],
    quote:
      "Valid claims settle in days, we price risk with our eyes open, and customers actually hear from us before renewal.",
    attribution: "Chief Underwriting Officer, P&C insurer",
  },
};

export const products: Product[] = [
  {
    slug: "dataforge",
    name: "DataForge",
    kicker: "Talk with your data",
    summary:
      "Turn raw data into actionable insight through natural-language conversations.",
    features: [
      "Natural-language queries across all data sources",
      "Real-time analytics & visualization",
      "Multi-source data integration",
      "Automated report generation",
      "Role-based access & data governance",
      "Context-aware conversational follow-ups",
    ],
    useCases: "Customer behaviour, self-serve reporting and trend forecasting.",
    useCaseList: [
      {
        title: "Customer behaviour analysis",
        body: "Ask why churn rose last quarter and get a segmented, source-backed answer in seconds.",
      },
      {
        title: "Self-serve reporting",
        body: "Non-technical teams pull their own dashboards without waiting on the data team.",
      },
      {
        title: "Trend & forecast discovery",
        body: "Surface emerging patterns across sales, support and product data automatically.",
      },
      {
        title: "Executive briefings",
        body: "Auto-generate weekly KPI summaries written in plain language.",
      },
      {
        title: "Anomaly detection",
        body: "Flag unusual spikes or drops the moment they appear in the data.",
      },
    ],
    industries: [
      { name: "Banking", icon: "🏦", solution: "Analyse transaction and customer data for risk and cross-sell." },
      { name: "Retail", icon: "🛍️", solution: "Forecast demand and decode basket behaviour in real time." },
      { name: "Healthcare", icon: "🩺", solution: "Extract insight from patient and operational records." },
      { name: "SaaS", icon: "💻", solution: "Unify product, billing and support analytics in one query layer." },
    ],
    metrics: [
      { label: "Faster time-to-insight", value: "10×", bar: 95 },
      { label: "Less analyst workload", value: "60%", bar: 60 },
      { label: "Data sources unified", value: "20+", bar: 80 },
    ],
    icon: "💬",
    image: "/products/dataforge.jpg",
  },
  {
    slug: "predictive-demand-intelligence",
    name: "Predictive Demand Intelligence",
    kicker: "AI-driven forecasting",
    summary:
      "Advanced ML models for accurate demand prediction and inventory optimization.",
    features: [
      "Multivariate trend analysis",
      "Supply-chain optimization",
      "Real-time forecast adjustments",
      "Risk assessment & scenario modelling",
      "SKU-level demand prediction",
      "Automated reorder recommendations",
    ],
    useCases:
      "Inventory optimization, production planning and logistics capacity.",
    useCaseList: [
      {
        title: "Inventory optimization",
        body: "Right-size stock at every location to cut both stockouts and overstock.",
      },
      {
        title: "Production planning",
        body: "Align manufacturing output to predicted demand weeks ahead.",
      },
      {
        title: "Logistics capacity",
        body: "Plan fleet and warehouse capacity against forecasted volume.",
      },
      {
        title: "Promotion modelling",
        body: "Simulate the demand impact of pricing and campaign changes.",
      },
      {
        title: "Seasonal shaping",
        body: "Anticipate seasonal peaks and prepare supply in advance.",
      },
    ],
    industries: [
      { name: "Retail", icon: "🛍️", solution: "SKU-level forecasts that keep shelves and warehouses balanced." },
      { name: "Manufacturing", icon: "🏭", solution: "Demand-driven production and procurement planning." },
      { name: "Logistics", icon: "🚚", solution: "Capacity and route planning against predicted volume." },
      { name: "CPG", icon: "📦", solution: "Plan promotions and distribution around true demand." },
    ],
    metrics: [
      { label: "Inventory reduced", value: "22%", bar: 70 },
      { label: "Forecast accuracy", value: "94%", bar: 94 },
      { label: "Stockouts cut", value: "35%", bar: 65 },
    ],
    icon: "📈",
    image: "/products/predictive-demand-intelligence.jpg",
  },
  {
    slug: "document-intelligence-suite",
    name: "Document Intelligence Suite",
    kicker: "Classification & extraction",
    summary:
      "Automated document processing that extracts, classifies and validates information.",
    features: [
      "Intelligent document classification",
      "High-accuracy data extraction",
      "Workflow integration & compliance",
      "Automated validation & error detection",
      "Table & handwriting OCR",
      "Human-in-the-loop review",
    ],
    useCases:
      "Loan processing, contract analysis, claims and invoice automation.",
    useCaseList: [
      {
        title: "Loan & credit processing",
        body: "Extract and validate application data to approve faster with fewer errors.",
      },
      {
        title: "Contract analysis",
        body: "Surface clauses, obligations and risks across large contract sets.",
      },
      {
        title: "Claims processing",
        body: "Classify and route claims automatically with exception handling.",
      },
      {
        title: "Invoice automation",
        body: "Capture line items and reconcile against POs with no manual entry.",
      },
      {
        title: "KYC & onboarding",
        body: "Verify identity documents and extract details for compliance.",
      },
    ],
    industries: [
      { name: "Financial services", icon: "🏦", solution: "Automate loan, KYC and statement processing." },
      { name: "Legal", icon: "⚖️", solution: "Review and extract from contracts at scale." },
      { name: "Healthcare", icon: "🩺", solution: "Process claims and clinical paperwork accurately." },
      { name: "Insurance", icon: "🛡️", solution: "Speed up underwriting and claims intake." },
    ],
    metrics: [
      { label: "Faster processing", value: "90%", bar: 90 },
      { label: "Extraction accuracy", value: "98%", bar: 98 },
      { label: "Manual review cut", value: "70%", bar: 70 },
    ],
    icon: "📄",
    image: "/products/document-intelligence-suite.jpg",
  },
  {
    slug: "predictive-maintenance-ai",
    name: "Predictive Maintenance AI",
    kicker: "Industrial IoT & ML",
    summary:
      "Prevent equipment failures and optimize maintenance using predictive analytics.",
    features: [
      "Real-time sensor data analysis",
      "Failure prediction with high accuracy",
      "Maintenance schedule optimization",
      "Cost-benefit analysis & ROI tracking",
      "Anomaly & drift detection",
      "Digital-twin asset modelling",
    ],
    useCases:
      "Downtime reduction, asset-life extension and fleet optimization.",
    useCaseList: [
      {
        title: "Downtime reduction",
        body: "Predict failures before they happen and schedule fixes proactively.",
      },
      {
        title: "Asset-life extension",
        body: "Maintain equipment on condition, not on a fixed calendar.",
      },
      {
        title: "Fleet optimization",
        body: "Monitor vehicle health and plan servicing across the fleet.",
      },
      {
        title: "Energy efficiency",
        body: "Spot inefficiencies in running equipment and tune performance.",
      },
      {
        title: "Spare-parts planning",
        body: "Forecast part demand to avoid both shortages and dead stock.",
      },
    ],
    industries: [
      { name: "Manufacturing", icon: "🏭", solution: "Cut unplanned line stoppages with condition-based upkeep." },
      { name: "Utilities", icon: "⚡", solution: "Extend grid and plant asset life with early warnings." },
      { name: "Fleet & logistics", icon: "🚚", solution: "Predict vehicle failures and optimise servicing." },
      { name: "Energy", icon: "🛢️", solution: "Monitor turbines and pumps for anomalies in real time." },
    ],
    metrics: [
      { label: "Downtime reduced", value: "40%", bar: 80 },
      { label: "Failure prediction", value: "92%", bar: 92 },
      { label: "Maintenance cost cut", value: "25%", bar: 55 },
    ],
    icon: "🛰️",
    image: "/products/predictive-maintenance-ai.jpg",
  },
  {
    slug: "enterprise-content-studio",
    name: "Enterprise Content Studio",
    kicker: "AI-powered content creation",
    summary:
      "Generate high-quality, brand-aligned content at scale with advanced generative AI.",
    features: [
      "Multi-format content generation",
      "Brand-voice consistency",
      "Content performance analytics",
      "Multi-language support with localization",
      "SEO optimization built in",
      "Review & approval workflows",
    ],
    useCases:
      "Scaling marketing content, product descriptions and localization.",
    useCaseList: [
      {
        title: "Marketing at scale",
        body: "Produce on-brand blogs, ads and landing copy 10× faster.",
      },
      {
        title: "Product descriptions",
        body: "Generate consistent, SEO-ready descriptions for huge catalogues.",
      },
      {
        title: "Localization",
        body: "Adapt content into dozens of languages with cultural nuance.",
      },
      {
        title: "Social campaigns",
        body: "Spin one idea into channel-ready posts across platforms.",
      },
      {
        title: "Email sequences",
        body: "Draft and personalise nurture sequences in minutes.",
      },
    ],
    industries: [
      { name: "Marketing", icon: "📣", solution: "Scale campaign content without scaling headcount." },
      { name: "E-commerce", icon: "🛒", solution: "Auto-write product copy for large catalogues." },
      { name: "Media", icon: "📰", solution: "Speed up editorial and localization workflows." },
      { name: "Agencies", icon: "🎯", solution: "Deliver more client content with brand consistency." },
    ],
    metrics: [
      { label: "Content output", value: "10×", bar: 95 },
      { label: "Time saved", value: "70%", bar: 70 },
      { label: "Languages supported", value: "30+", bar: 85 },
    ],
    icon: "✍️",
    image: "/products/enterprise-content-studio.jpg",
  },
  {
    slug: "whatsapp-ai-reach",
    name: "WhatsApp AI Reach",
    kicker: "Intelligent lead generation",
    summary:
      "An AI conversational-marketing platform for enterprise sales and customer acquisition.",
    features: [
      "Automated personalized outreach at scale",
      "Intelligent lead qualification",
      "Multi-lingual support with cultural context",
      "CRM & marketing-automation integration",
      "Broadcast & drip campaigns",
      "Conversation analytics & intent scoring",
    ],
    useCases:
      "Product promotion, lead nurturing and re-engagement campaigns.",
    useCaseList: [
      {
        title: "Product promotion",
        body: "Run personalised campaigns that start real conversations at scale.",
      },
      {
        title: "Lead nurturing",
        body: "Qualify and warm leads automatically before they reach sales.",
      },
      {
        title: "Retail campaigns",
        body: "Drive offers and footfall with two-way messaging.",
      },
      {
        title: "Appointment booking",
        body: "Let customers schedule and confirm right inside the chat.",
      },
      {
        title: "Re-engagement",
        body: "Win back dormant customers with timely, relevant nudges.",
      },
    ],
    industries: [
      { name: "Banking", icon: "🏦", solution: "Promote products and pre-qualify applicants conversationally." },
      { name: "Insurance", icon: "🛡️", solution: "Nurture and qualify leads around the clock." },
      { name: "Retail", icon: "🛍️", solution: "Run high-converting campaigns at a fraction of the cost." },
      { name: "Real estate", icon: "🏠", solution: "Capture and book interested buyers instantly." },
    ],
    metrics: [
      { label: "Prospecting cost cut", value: "90%", bar: 90 },
      { label: "Response rate", value: "3×", bar: 75 },
      { label: "Qualified 24/7", value: "100%", bar: 100 },
    ],
    icon: "🟢",
  },
  {
    slug: "agentic-ai-platform",
    name: "Agentic AI Platform",
    kicker: "Autonomous intelligent agents",
    summary:
      "Deploy AI agents that autonomously execute complex, multi-step tasks across your enterprise.",
    features: [
      "Custom LLM-powered agents",
      "Multi-agent collaboration",
      "Enterprise system integration",
      "Continuous learning & optimization",
      "Tool & API use with function calling",
      "Guardrails, audit logs & monitoring",
    ],
    useCases:
      "Support automation, sales qualification and back-office ops.",
    useCaseList: [
      {
        title: "Customer support automation",
        body: "Resolve routine tickets end to end, escalating only edge cases.",
      },
      {
        title: "Sales qualification",
        body: "Agents engage and qualify leads 24/7 and hand off to reps.",
      },
      {
        title: "HR onboarding",
        body: "Automate the multi-step paperwork and provisioning of new hires.",
      },
      {
        title: "IT operations",
        body: "Triage, diagnose and remediate common requests autonomously.",
      },
      {
        title: "Research & analysis",
        body: "Gather, synthesise and summarise information across sources.",
      },
    ],
    industries: [
      { name: "Customer service", icon: "🎧", solution: "Autonomous agents that resolve, not just deflect." },
      { name: "Sales", icon: "📈", solution: "Always-on qualification and follow-up." },
      { name: "HR", icon: "👥", solution: "Streamline onboarding and employee requests." },
      { name: "IT operations", icon: "🛠️", solution: "Automate triage and routine remediation." },
    ],
    metrics: [
      { label: "Auto-resolution", value: "80%", bar: 80 },
      { label: "Always-on coverage", value: "24/7", bar: 100 },
      { label: "Cost per task cut", value: "65%", bar: 65 },
    ],
    icon: "🤖",
  },
];

// ⑪ Market Opportunity
// ⑪ Market Opportunity — sourced from public studies
export const marketStats = [
  {
    value: "$1.81T",
    label: "Projected global AI market by 2030",
    source: "Grand View Research",
  },
  {
    value: "36.6%",
    label: "AI market CAGR, 2024–2030",
    source: "Grand View Research",
  },
  {
    value: "$15.7T",
    label: "AI's potential boost to global GDP by 2030",
    source: "PwC",
  },
  {
    value: "72%",
    label: "Organizations using AI in ≥1 function",
    source: "McKinsey, 2024",
  },
];

// Global AI market size (USD trillions) — endpoints per Grand View Research,
// intermediate points follow the cited 36.6% CAGR trajectory.
export const marketGrowth = {
  cagr: "36.6%",
  source: "Grand View Research, 2024",
  points: [
    { year: "2023", value: 0.2 },
    { year: "2024", value: 0.28 },
    { year: "2025", value: 0.39 },
    { year: "2026", value: 0.52 },
    { year: "2027", value: 0.72 },
    { year: "2028", value: 0.98 },
    { year: "2029", value: 1.32 },
    { year: "2030", value: 1.81 },
  ],
};

// Enterprise adoption today — McKinsey "The state of AI", 2024
export const adoptionBars = [
  { label: "Use AI in at least one business function", value: 72 },
  { label: "Regularly use generative AI", value: 65 },
  { label: "Use AI across multiple functions", value: 50 },
];

// The agentic leap — Gartner predictions, 2024 → 2028
export const agenticLeap = {
  source: "Gartner, 2024",
  fromYear: "2024",
  toYear: "2028",
  rows: [
    {
      label: "Enterprise software including agentic AI",
      from: 1,
      to: 33,
      fromLabel: "<1%",
      toLabel: "33%",
    },
    {
      label: "Work decisions made autonomously by AI",
      from: 0,
      to: 15,
      fromLabel: "0%",
      toLabel: "15%",
    },
  ],
};

// Blog — placeholder posts
export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  gradient: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "beyond-the-pilot",
    title: "Beyond the pilot: turning enterprise AI experiments into production wins",
    category: "Enterprise AI",
    date: "June 2026",
    readTime: "8 min read",
    excerpt:
      "Most enterprise AI never makes it past the demo. Here's the playbook for closing the gap between a promising pilot and a system your business actually runs on — owning the data, the infrastructure and the ROI.",
    gradient: "from-[#3F56A4] to-[#14284E]",
  },
  {
    slug: "the-agentic-shift",
    title: "The agentic shift: when AI stops predicting and starts acting",
    category: "Agentic AI",
    date: "June 2026",
    readTime: "6 min read",
    excerpt:
      "Agentic systems don't just forecast — they perceive, plan and act. We unpack what changes when autonomy enters your workflows, what it unlocks, and where to keep a human firmly in the loop.",
    gradient: "from-[#33A5DB] to-[#2A3E77]",
  },
];

// ⑫ Target Sectors
export type Sector = {
  slug: string;
  name: string;
  short: string;
  icon: string;
  accent: string; // serif-italic accent word in the headline
  tagline: string;
  overview: string;
  points: string[];
  challenges: string[];
  solutions: { title: string; body: string }[];
  metrics: { value: string; label: string }[];
  gradient: string;
};

export const sectors: Sector[] = [
  {
    slug: "retail",
    name: "Retail & E-commerce",
    short: "Retail",
    icon: "🛍️",
    accent: "everything",
    tagline: "Sell more, waste less, personalize everything.",
    overview:
      "Retail runs on thin margins and fickle demand. We forecast what sells, personalize every touchpoint, and keep inventory lean — from the warehouse to the product page.",
    points: ["Demand forecasting", "Personalization", "Inventory optimization"],
    challenges: [
      "Volatile, seasonal demand that's hard to plan for",
      "Generic experiences that don't convert browsers into buyers",
      "Overstock and stockouts quietly eroding margin",
    ],
    solutions: [
      {
        title: "Demand forecasting",
        body: "SKU-level forecasts that factor in seasonality, promotions and trends — so you buy what actually sells.",
      },
      {
        title: "Personalization",
        body: "Real-time recommendations and tailored journeys that lift conversion and basket size.",
      },
      {
        title: "Inventory optimization",
        body: "The right product in the right place at the right time — cutting stockouts and dead stock together.",
      },
    ],
    metrics: [
      { value: "30%", label: "Fewer stockouts" },
      { value: "10×", label: "Faster product copy" },
      { value: "15%", label: "Higher conversion" },
    ],
    gradient: "from-[#3F56A4] to-[#14284E]",
  },
  {
    slug: "logistics",
    name: "Logistics",
    short: "Logistics",
    icon: "🚚",
    accent: "mile",
    tagline: "Every mile, optimized.",
    overview:
      "Fuel, time and reliability define logistics. We plan smarter routes, predict demand by lane, and keep fleets on the road with predictive maintenance.",
    points: ["Route optimization", "Demand prediction", "Fleet management"],
    challenges: [
      "Rising fuel and labor costs on every route",
      "Demand spikes that outpace capacity planning",
      "Reactive maintenance that pulls vehicles off the road",
    ],
    solutions: [
      {
        title: "Route optimization",
        body: "Dynamic routing that adapts to traffic, weather and load — cutting miles and fuel burn.",
      },
      {
        title: "Demand prediction",
        body: "Forecast volumes by lane and day so capacity is in place before the surge.",
      },
      {
        title: "Fleet management",
        body: "Predictive maintenance and utilization analytics that maximize uptime.",
      },
    ],
    metrics: [
      { value: "18%", label: "Lower fuel cost" },
      { value: "25%", label: "Less downtime" },
      { value: "99%", label: "On-time delivery" },
    ],
    gradient: "from-[#33A5DB] to-[#2A3E77]",
  },
  {
    slug: "banking",
    name: "Banking & Financial Services",
    short: "Banking",
    icon: "🏦",
    accent: "trust",
    tagline: "Trust, automated.",
    overview:
      "Banks balance growth, risk and regulation. We catch fraud in real time, turn paperwork into decisions, and put the right offer in front of the right customer.",
    points: ["Fraud detection", "Document processing", "Analytics"],
    challenges: [
      "Fraud that moves faster than manual review",
      "Loan and KYC paperwork that slows everything down",
      "Generic outreach with little measurable return",
    ],
    solutions: [
      {
        title: "Fraud detection",
        body: "Real-time anomaly detection that flags fraud in milliseconds, with explainable scores.",
      },
      {
        title: "Document & loan processing",
        body: "Automated extraction and validation that turns loan and KYC paperwork into clean, decision-ready data.",
      },
      {
        title: "Analytics & marketing",
        body: "Next-best-action models that target the right customer with the right product.",
      },
    ],
    metrics: [
      { value: "90%", label: "Faster document processing" },
      { value: "60%", label: "Faster fraud detection" },
      { value: "3×", label: "Marketing ROI" },
    ],
    gradient: "from-[#2A3E77] to-[#14284E]",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    short: "Healthcare",
    icon: "🩺",
    accent: "care",
    tagline: "More care, less paperwork.",
    overview:
      "Healthcare drowns in documents and data. We extract what matters from clinical records, surface patient insight, and streamline operations — safely and compliantly.",
    points: ["Document processing", "Patient analytics", "Operations"],
    challenges: [
      "Mountains of unstructured clinical records",
      "Insight trapped across disconnected systems",
      "Operational bottlenecks and long wait times",
    ],
    solutions: [
      {
        title: "Document processing",
        body: "Turn clinical notes, forms and claims into structured, searchable data — up to 90% faster.",
      },
      {
        title: "Patient analytics",
        body: "Risk stratification and outcome prediction that support better clinical decisions.",
      },
      {
        title: "Operations",
        body: "Forecast demand and optimize scheduling to cut wait times.",
      },
    ],
    metrics: [
      { value: "90%", label: "Faster record processing" },
      { value: "30%", label: "Shorter wait times" },
      { value: "HIPAA", label: "Compliant by design" },
    ],
    gradient: "from-[#33A5DB] to-[#3F56A4]",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    short: "Manufacturing",
    icon: "🏭",
    accent: "line",
    tagline: "Zero surprises on the line.",
    overview:
      "Downtime and defects are expensive. We predict equipment failures before they happen, optimize the supply chain, and catch defects before they ship.",
    points: ["Predictive maintenance", "Supply chain", "Quality control"],
    challenges: [
      "Unplanned equipment downtime halting production",
      "Fragile, low-visibility supply chains",
      "Defects caught too late, after they've shipped",
    ],
    solutions: [
      {
        title: "Predictive maintenance",
        body: "Sensor-driven models that flag failures before they happen and extend asset life.",
      },
      {
        title: "Supply chain",
        body: "End-to-end visibility and forecasting that absorb shocks before they hit the line.",
      },
      {
        title: "Quality control",
        body: "Computer-vision inspection that catches defects in real time.",
      },
    ],
    metrics: [
      { value: "40%", label: "Less downtime" },
      { value: "40%", label: "Fewer defects" },
      { value: "15%", label: "Lower inventory cost" },
    ],
    gradient: "from-[#597CBD] to-[#14284E]",
  },
  {
    slug: "insurance",
    name: "Insurance",
    short: "Insurance",
    icon: "🛡️",
    accent: "claims",
    tagline: "Faster claims, smarter risk.",
    overview:
      "Insurers win on speed and accuracy. We automate claims, sharpen risk models, and keep policyholders engaged across the lifecycle.",
    points: ["Claims processing", "Risk assessment", "Engagement"],
    challenges: [
      "Slow, manual claims handling",
      "Risk priced with too little signal",
      "Low policyholder engagement and retention",
    ],
    solutions: [
      {
        title: "Claims processing",
        body: "Automated intake, triage and fraud checks that settle valid claims faster.",
      },
      {
        title: "Risk assessment",
        body: "Richer models that price risk with more signal and less bias.",
      },
      {
        title: "Engagement",
        body: "Personalized, proactive outreach across the policy lifecycle.",
      },
    ],
    metrics: [
      { value: "50%", label: "Faster claims" },
      { value: "20%", label: "Better loss ratio" },
      { value: "2×", label: "Policyholder engagement" },
    ],
    gradient: "from-[#3F56A4] to-[#33A5DB]",
  },
];

// ⑬ Why ViramTech Wins
export const whyUs = [
  {
    title: "Speed to value",
    body: "Pre-built solutions deployed in weeks, not months.",
  },
  {
    title: "Industry expertise",
    body: "Deep domain knowledge across key verticals.",
  },
  {
    title: "Full-stack control",
    body: "End-to-end ownership from data to deployment.",
  },
  {
    title: "Proven ROI",
    body: "Documented efficiency gains with real clients.",
  },
];

// ⑭ Technical Architecture (top → bottom)
export const architecture = [
  {
    slug: "presentation",
    layer: "Presentation Layer",
    summary:
      "Where people and other systems meet the platform — across the channels they already use.",
    components: [
      { name: "Web & mobile apps", note: "Responsive interfaces your teams and customers actually use." },
      { name: "APIs", note: "Versioned REST / GraphQL contracts other systems integrate against." },
      { name: "WhatsApp integration", note: "Reach users on the messaging channels they already live in." },
    ],
    why: "Fully decoupled from the AI beneath it, so the experience can change without touching the models.",
  },
  {
    slug: "ai-ml",
    layer: "AI / ML Layer",
    summary:
      "The intelligence — models for language, vision and forecasting, and the agents that act on them.",
    components: [
      { name: "LLMs", note: "Commercial or open models behind one swappable interface." },
      { name: "NLP models", note: "Entity, intent and sentiment extraction at scale." },
      { name: "Computer vision", note: "Detection, OCR and inspection on images and video." },
      { name: "Predictive analytics", note: "Forecasts and risk scores with calibrated confidence." },
    ],
    why: "Models are pluggable, so you adopt the best option without re-architecting everything around them.",
  },
  {
    slug: "integration",
    layer: "Integration Layer",
    summary:
      "The connective tissue that lets models, tools and your existing systems talk reliably.",
    components: [
      { name: "LangChain", note: "Orchestrates multi-step chains, tool calls and memory." },
      { name: "API gateway", note: "A single secured entry point with auth and rate limiting." },
      { name: "Message queues", note: "Decouple workloads and absorb spikes without dropping work." },
      { name: "Webhooks", note: "Event-driven hooks into the systems you already run." },
    ],
    why: "Async, event-driven wiring keeps the system resilient and loosely coupled — no brittle point-to-point spaghetti.",
  },
  {
    slug: "data",
    layer: "Data Layer",
    summary:
      "Where everything is stored, retrieved and streamed — structured, unstructured and in motion.",
    components: [
      { name: "Vector DBs", note: "Semantic search and retrieval that grounds AI answers." },
      { name: "SQL / NoSQL", note: "The right store for each shape of data." },
      { name: "Data lakes", note: "Cheap, durable storage for everything, ready for training." },
      { name: "Real-time streams", note: "Live event pipelines for up-to-the-second decisions." },
    ],
    why: "Purpose-built stores per workload keep queries fast as data volume grows.",
  },
  {
    slug: "infrastructure",
    layer: "Infrastructure",
    summary:
      "The foundation that runs it all — portable, automated and observable by default.",
    components: [
      { name: "Multi-cloud (AWS / GCP / Azure)", note: "Run anywhere, with no provider lock-in." },
      { name: "Kubernetes", note: "Self-healing, horizontally-scalable container orchestration." },
      { name: "Monitoring", note: "Metrics, logs and traces across every single layer." },
    ],
    why: "Containerized and cloud-agnostic, so it scales to real workloads and survives failures.",
  },
];

// ⑭b AI / ML Capabilities — deep dives (rendered before Technical architecture)
export type Capability = {
  slug: string;
  name: string;
  tagline: string;
  body: string;
  points: { label: string; text: string }[];
  metric: { value: string; label: string };
};

export const aiCapabilities: Capability[] = [
  {
    slug: "nlp",
    name: "Natural Language Processing",
    tagline: "Make sense of every document, message and conversation.",
    body: "Our language models read unstructured text the way a domain expert would — pulling out entities, classifying intent and reading sentiment at scale, in real time and across dozens of languages.",
    points: [
      {
        label: "Entity & intent extraction",
        text: "Lift names, amounts, dates and intent straight out of contracts, tickets and email.",
      },
      {
        label: "Summarization & RAG",
        text: "Condense long documents and ground every answer in your own knowledge base.",
      },
      {
        label: "Multilingual by default",
        text: "One model, consistent accuracy, 50+ languages — no per-language retraining.",
      },
    ],
    metric: { value: "50+", label: "Languages supported" },
  },
  {
    slug: "vision",
    name: "Computer Vision",
    tagline: "Give your systems the ability to see and inspect.",
    body: "From defect detection on a production line to OCR and shelf analytics, our vision models locate, classify and measure objects in images and video — returning confidence scores your workflows can act on.",
    points: [
      {
        label: "Detection & classification",
        text: "Find and label objects, people and products frame-by-frame in real time.",
      },
      {
        label: "OCR & document parsing",
        text: "Turn scanned forms, invoices and IDs into structured, queryable data.",
      },
      {
        label: "Quality & anomaly inspection",
        text: "Catch defects and outliers earlier than the human eye, consistently.",
      },
    ],
    metric: { value: "<50ms", label: "Per-frame inference" },
  },
  {
    slug: "speech",
    name: "Speech Recognition",
    tagline: "Transcribe, understand and route every conversation.",
    body: "Convert calls, meetings and voice commands into accurate, speaker-labelled transcripts — then layer intent and sentiment on top to automate the follow-up and surface what matters.",
    points: [
      {
        label: "Real-time transcription",
        text: "Stream speech to text with punctuation and formatting as people talk.",
      },
      {
        label: "Speaker diarization",
        text: "Know who said what, even on noisy multi-party calls.",
      },
      {
        label: "Voice automation",
        text: "Power IVR, voice commands and call-routing with intent recognition.",
      },
    ],
    metric: { value: "95%+", label: "Transcription accuracy" },
  },
  {
    slug: "predictive",
    name: "Predictive Analytics",
    tagline: "Forecast what's next, before it happens.",
    body: "We turn historical data into forward-looking signals — demand forecasts, churn risk, predictive maintenance — with calibrated confidence intervals, so teams know exactly how much to trust each call.",
    points: [
      {
        label: "Demand & revenue forecasting",
        text: "Plan inventory and capacity against a forecast you can defend.",
      },
      {
        label: "Churn & risk scoring",
        text: "Flag at-risk customers and transactions while there's still time to act.",
      },
      {
        label: "Predictive maintenance",
        text: "Service equipment before it fails, not on a fixed calendar.",
      },
    ],
    metric: { value: "30%", label: "Fewer stockouts" },
  },
  {
    slug: "agentic",
    name: "Agentic AI Systems",
    tagline: "AI that doesn't just predict — it acts.",
    body: "Autonomous agents that perceive context, plan multi-step work, call your tools and APIs, then verify their own results — keeping a human in the loop exactly where it matters.",
    points: [
      {
        label: "Perceive → Plan → Act → Verify",
        text: "A closed loop that reasons, executes and checks its own work.",
      },
      {
        label: "Tool & API orchestration",
        text: "Agents call your systems, databases and services to get real work done.",
      },
      {
        label: "Human-in-the-loop guardrails",
        text: "Approvals, limits and audit trails keep autonomy under control.",
      },
    ],
    metric: { value: "24/7", label: "Autonomous operation" },
  },
];

// ⑭c Infrastructure — deep dives (reuses the Capability shape)
export const infrastructureComponents: Capability[] = [
  {
    slug: "multi-cloud",
    name: "Multi-cloud",
    tagline: "Run anywhere — AWS, GCP or Azure, with no lock-in.",
    body: "We deploy your AI workloads across the clouds you already use, abstracting away provider differences so you keep portability, negotiating leverage and resilience.",
    points: [
      {
        label: "Provider-agnostic",
        text: "One architecture that runs on AWS, GCP and Azure alike.",
      },
      {
        label: "Failover & resilience",
        text: "Survive a region — or an entire provider — going down.",
      },
      {
        label: "Cost optimization",
        text: "Place each workload where it runs cheapest and fastest.",
      },
    ],
    metric: { value: "3", label: "Clouds, one deploy" },
  },
  {
    slug: "devops",
    name: "DevOps & CI/CD",
    tagline: "Ship safely, on repeat.",
    body: "Automated build, test and deploy pipelines validate and release every change the same reliable way — so improvements reach production in hours, not weeks.",
    points: [
      {
        label: "Automated pipelines",
        text: "Commit → build → test → deploy, completely hands-off.",
      },
      {
        label: "Safe rollouts",
        text: "Canary and blue-green releases with instant rollback.",
      },
      {
        label: "Infrastructure as code",
        text: "Reproducible environments, versioned like software.",
      },
    ],
    metric: { value: "100s", label: "Of deploys, zero drama" },
  },
  {
    slug: "microservices",
    name: "Scalable Microservices",
    tagline: "Scale the parts that need it, not the whole.",
    body: "Solutions are built as independent, containerized services that scale horizontally on demand — absorbing spikes gracefully and letting teams ship in parallel.",
    points: [
      {
        label: "Independent scaling",
        text: "Each service scales to its own load, not the system's.",
      },
      {
        label: "Container-native",
        text: "Kubernetes-orchestrated, self-healing workloads.",
      },
      {
        label: "Resilient by design",
        text: "A failure in one service won't take down the rest.",
      },
    ],
    metric: { value: "Auto", label: "Elastic scaling" },
  },
  {
    slug: "security",
    name: "Enterprise Security",
    tagline: "Security designed in, not bolted on.",
    body: "Encryption, access control and auditability are part of the architecture from day one — keeping your data and models protected and compliant at every layer.",
    points: [
      {
        label: "Encryption everywhere",
        text: "Data protected in transit and at rest, end to end.",
      },
      {
        label: "Access & identity",
        text: "Role-based access, SSO and least-privilege by default.",
      },
      {
        label: "Audit & compliance",
        text: "Full audit trails, ready for enterprise governance.",
      },
    ],
    metric: { value: "E2E", label: "Encrypted by default" },
  },
];

// ⑭d AI Frameworks — deep dives (reuses the Capability shape)
export const aiFrameworks: Capability[] = [
  {
    slug: "langchain",
    name: "LangChain",
    tagline: "Orchestrate models, tools and data into one flow.",
    body: "We use LangChain to chain LLM calls, tools, retrievers and memory into reliable, multi-step pipelines — so your AI does real work, not just one-shot prompts.",
    points: [
      {
        label: "Chains & agents",
        text: "Compose multi-step reasoning, tool use and retrieval.",
      },
      {
        label: "Memory & context",
        text: "Carry conversation and task state across every step.",
      },
      {
        label: "Pluggable tools",
        text: "Wire in search, APIs and databases as first-class tools.",
      },
    ],
    metric: { value: "1", label: "Orchestration layer" },
  },
  {
    slug: "custom-llm",
    name: "Custom LLM Integration",
    tagline: "Use the right model for every job.",
    body: "Commercial or open, hosted or private — we integrate the LLMs that fit your accuracy, cost and privacy needs behind one consistent interface you can swap at will.",
    points: [
      {
        label: "Provider-agnostic",
        text: "OpenAI, Anthropic, Azure, Bedrock or your own endpoint.",
      },
      {
        label: "Routing & fallback",
        text: "Send each request to the best — or cheapest — model.",
      },
      {
        label: "No lock-in",
        text: "Swap models without rewriting your application.",
      },
    ],
    metric: { value: "Any", label: "Model, one interface" },
  },
  {
    slug: "open-source",
    name: "Open-source Models",
    tagline: "Own your models, your data and your costs.",
    body: "When privacy or economics demand it, we deploy open-source models inside your environment — giving you full control over weights, data residency and inference cost.",
    points: [
      {
        label: "Self-hosted",
        text: "Run Llama, Mistral and more inside your own cloud.",
      },
      {
        label: "Data stays put",
        text: "Sensitive data never leaves your perimeter.",
      },
      {
        label: "Cost control",
        text: "Predictable inference economics at production scale.",
      },
    ],
    metric: { value: "100%", label: "In your environment" },
  },
  {
    slug: "fine-tuning",
    name: "Fine-tuning Pipelines",
    tagline: "Models that speak your business, not boilerplate.",
    body: "We fine-tune and continuously evaluate models on your own data and vocabulary — turning a generic LLM into a specialist that knows your domain, products and tone.",
    points: [
      {
        label: "Domain adaptation",
        text: "Train on your documents, tickets and terminology.",
      },
      {
        label: "Repeatable pipelines",
        text: "Versioned datasets, training runs and evaluation.",
      },
      {
        label: "Continuous improvement",
        text: "Re-tune as your data and needs evolve.",
      },
    ],
    metric: { value: "Your", label: "Data, your model" },
  },
];

// ⑮ Go-To-Market Strategy
export const roadmap = [
  {
    phase: "Phase 1",
    period: "Q1–Q2 2026",
    title: "Pilot programs",
    status: "In progress",
    items: [
      "Target 5–10 enterprise pilots",
      "Prove ROI with flagship products",
      "Build case studies",
    ],
  },
  {
    phase: "Phase 2",
    period: "Q3–Q4 2026",
    title: "Scale & expand",
    status: "Up next",
    items: [
      "Launch the full product suite",
      "Expand to 50+ customers",
      "Build a partner ecosystem",
    ],
  },
  {
    phase: "Phase 3",
    period: "2027",
    title: "Market leadership",
    status: "Planned",
    items: [
      "Geographic expansion",
      "Vertical-specific solutions",
      "AI research lab",
    ],
  },
];
