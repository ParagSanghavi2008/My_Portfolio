
/**
 * Parag Rajeshkumar Sanghavi - Portfolio Configuration
 * Centralized data configuration for easy customization without altering HTML markup.
 */

window.PORTFOLIO_CONFIG = {
  personal: {
    name: "Parag Rajeshkumar Sanghavi",
    role: "Computer Science Engineering Student | Aspiring AI/ML Engineer",
    location: "Maharashtra, India",
    college: "Newton School of Technology, Pune",
    education: "B.Tech in Computer Science Engineering (AI & ML) • Newton School of Technology, Pune",
    status: "Currently learning & building",
    statusDetail: "1st Year B.Tech • Consistent Daily Practice",
    headline: "Building intelligent solutions for real-world problems.",
    subheadline: "I'm Parag, a CSE student exploring AI, machine learning, and software development. I enjoy learning new technologies and turning ideas into practical projects.",
    bio: [
      "I am a first-year Computer Science and Engineering student with an acute fascination for how intelligent systems process information and solve complex real-world challenges.",
      "My path is grounded in steady, disciplined fundamentals: developing strong programming logic, understanding the mathematical underpinnings of machine learning, and exploring the mechanics of neural architectures.",
      "Rather than chasing surface-level hype, I focus on building practical prototypes, writing clean Python code, and developing a deep foundational intuition for software engineering and modern AI systems."
    ],
    email: "paragsanghavi.101@gmail.com",
    github: "https://github.com/ParagSanghavi2008",
    linkedin: "https://www.linkedin.com/in/parag-sanghavi-685700432/",
    photo: "assets/images/parag.jpg",
    resumeUrl: "" // Leave empty if not yet available, or add your Google Drive/PDF link
  },

  currentFocus: [
    { label: "Python Programming", category: "Core Language", detail: "Data structures, OOP & algorithmic problem solving" },
    { label: "ML Fundamentals", category: "AI & ML", detail: "Mathematical foundations, regression & classification" },
    { label: "Problem Solving", category: "Logic", detail: "Daily coding challenges & fundamental algorithms" },
    { label: "Git & Version Control", category: "Dev Tools", detail: "Branching strategies, GitHub collaboration & CLI" }
  ],

  projects: [
    {
      id: "ai-voice-defense",
      title: "Real-Time AI Voice Impersonation Defense System",
      badge: "In Development / Prototype",
      badgeType: "warning",
      category: "AI & Security",
      tagline: "A proposed safety layer between a user and a caller to detect synthetic voice spoofing.",
      description: "A proposed real-time verification layer designed to intercept incoming audio streams, extract acoustic biometrics, spectral anomalies, and synthetic pitch patterns to flag suspected deepfake voice impersonation before fraud occurs.",
      extendedDetails: {
        problemStatement: "As generative voice synthesis and cloned speech technologies become accessible to bad actors, phone fraud and voice-based social engineering have escalated dramatically.",
        approach: "Investigating acoustic feature extraction (MFCCs, spectral roll-off, chroma frequencies) combined with light classification models capable of low-latency inference on incoming calls.",
        architectureHighlights: [
          "Audio pre-processing & noise gating pipeline",
          "Acoustic artifact detection for neural voice synthesisers",
          "Risk scoring telemetry UI with risk level indicators",
          "Local-first privacy constraint: processing audio without cloud leakage"
        ],
        statusNote: "Early architectural design and exploratory research phase. Investigating dataset selection (ASVspoof) and feature engineering tradeoffs."
      },
      tags: ["Artificial Intelligence", "Voice Analysis", "Security", "Python", "Audio Processing"],
      links: {
        github: "", // Left empty to be hidden until repository is published
        liveDemo: "",
        paper: ""
      },
      iconType: "waveform"
    },
    {
      id: "python-collection",
      title: "Python Programming Collection",
      badge: "Active Repository",
      badgeType: "success",
      category: "Software Development",
      tagline: "A structured repository of foundational algorithms, recursion, and problem sets.",
      description: "A comprehensive practice collection covering loops, modular functions, recursion, algorithmic number theory, string manipulation, and competitive programming problems.",
      extendedDetails: {
        problemStatement: "Building genuine programming intuition requires continuous deliberate practice across standard edge cases, algorithmic time complexity, and data organization.",
        approach: "Each solution is organized into modular scripts with clean naming, comprehensive test cases, time/space complexity notes, and alternate algorithmic solutions.",
        architectureHighlights: [
          "Control flow mastery & nested iteration patterns",
          "Recursive state machines and backtracking drills",
          "Mathematical utility scripts & prime factorization",
          "Object-Oriented Design patterns in Python 3"
        ],
        statusNote: "Continuously maintained and expanded as coursework and independent practice advance."
      },
      tags: ["Python", "Programming", "Problem-Solving", "Algorithms", "Clean Code"],
      links: {
        github: "https://github.com/paragsanghavi/python-programming-collection", // Placeholder GitHub repo link
        liveDemo: "",
        paper: ""
      },
      iconType: "code"
    }
  ],

  journey: [
    {
      period: "Milestone 1",
      title: "Strengthening Python & Algorithmic Foundations",
      status: "In Progress",
      description: "Daily deliberate practice with Python 3 syntax, control flow, functions, OOP principles, and standard library data structures."
    },
    {
      period: "Milestone 2",
      title: "Systematic Problem-Solving & Logic Building",
      status: "In Progress",
      description: "Solving structured algorithmic problems on platforms like LeetCode and HackerRank; focusing on recursion, arrays, and time complexity."
    },
    {
      period: "Milestone 3",
      title: "Mastering Git, GitHub & Developer Workflows",
      status: "Active",
      description: "Establishing version control habits: meaningful semantic commits, git branching, repository documentation, and markdown best practices."
    },
    {
      period: "Milestone 4",
      title: "Exploring Core AI & Machine Learning Foundations",
      status: "Currently Exploring",
      description: "Studying linear algebra, calculus intuition, statistical distributions, and building baseline regression/classification scripts from scratch."
    },
    {
      period: "Milestone 5",
      title: "Hackathons, Collaborative Projects & Applied Systems",
      status: "Upcoming Target",
      description: "Teaming up with peers for collegiate hackathons to build end-to-end prototypes that solve tangible community or campus problems."
    }
  ],

  activities: [
    {
      type: "Hackathons & Challenges",
      title: "Collegiate Hackathon Preparation",
      status: "Aspirational / Upcoming",
      description: "Forming project teams, refining rapid prototyping workflows in Python, and ideating themes around safety and AI utilities."
    },
    {
      type: "Coding Milestones",
      title: "Consistent Daily Coding Streak",
      status: "Ongoing Goal",
      description: "Targeting sustained daily problem-solving to build deep muscle memory for algorithmic thinking and clean architecture."
    },
    {
      type: "Technical Exploration",
      title: "AI Papers & Open-Source Tracking",
      status: "Active Habit",
      description: "Regularly reviewing introductory AI publications, Hugging Face developments, and speech/vision architecture breakdowns."
    },
    {
      type: "Academic Foundation",
      title: "B.Tech Curriculum Excellence (AI & ML)",
      status: "Active Pursuit",
      description: "Engaging deeply with core undergraduate coursework: Discrete Mathematics, Engineering Physics, and Computation Fundamentals."
    }
  ],

  openSource: {
    project: "SnAI (S-AI-Projects)",
    repository: "https://github.com/S-AI-Projects/Python-programming-exercises",
    repoName: "Python-programming-exercises",
    tagline: "100+ Python challenging programming exercises",
    description: "Actively contributing algorithmic proofs, mutation analysis, regression protection, and invariant verification across community Python challenges.",
    pullRequests: [
      {
        number: 89,
        title: "R28-T020: Protect example against regression: Python question 69",
        category: "Mutation Analysis & Testing",
        summary: "Protected generator solution against regression using mutation analysis. Verified LCM(5, 7) = 35 logic against 'and' vs 'or' mutation, added boundary test (n=0), and introduced automated validation.",
        url: "https://github.com/S-AI-Projects/Python-programming-exercises/pull/89",
        tags: ["Python", "Mutation Testing", "Regression Protection", "LCM 35"],
        status: "PR Raised"
      },
      {
        number: 88,
        title: "R28-T019: Explain resource behavior: Python question 10",
        category: "Resource Management",
        summary: "Documented resource behavior and memory management patterns in Python sequences, clarifying iterator lifecycles.",
        url: "https://github.com/S-AI-Projects/Python-programming-exercises/pull/88",
        tags: ["Python", "Memory", "Iterators", "Documentation"],
        status: "PR Raised"
      },
      {
        number: 87,
        title: "R28-T018: Document failure or limitation: Python question 67",
        category: "Error Boundaries",
        summary: "Analyzed failure modes, edge condition overflows, and boundary limits for recursive execution.",
        url: "https://github.com/S-AI-Projects/Python-programming-exercises/pull/87",
        tags: ["Python", "Edge Cases", "Recursion Limits"],
        status: "PR Raised"
      },
      {
        number: 86,
        title: "R28-T017: Derive result step by step: Python question 2",
        category: "Mathematical Proofs",
        summary: "Step-by-step mathematical proof and algorithmic derivation of factorial computation with complexity analysis.",
        url: "https://github.com/S-AI-Projects/Python-programming-exercises/pull/86",
        tags: ["Python", "Mathematical Trace", "Factorials"],
        status: "PR Raised"
      },
      {
        number: 85,
        title: "R28-T016: Clarify implementation: Python question 92",
        category: "Clean Code",
        summary: "Enhanced readability, typing hints, and modular decomposition adhering to clean Python 3 standards.",
        url: "https://github.com/S-AI-Projects/Python-programming-exercises/pull/85",
        tags: ["Python 3", "Type Hints", "Modularity"],
        status: "PR Raised"
      },
      {
        number: 84,
        title: "R28-T015: Remove hidden state from example: Python question 65",
        category: "Functional Purity",
        summary: "Eliminated implicit global state and side effects, ensuring reproducible pure function execution.",
        url: "https://github.com/S-AI-Projects/Python-programming-exercises/pull/84",
        tags: ["Python", "Pure Functions", "State Isolation"],
        status: "PR Raised"
      },
      {
        number: 83,
        title: "R28-T014: Explain an invariant: Python question 38",
        category: "Algorithm Invariants",
        summary: "Detailed formal loop invariants and state guarantees throughout iterative list transformations.",
        url: "https://github.com/S-AI-Projects/Python-programming-exercises/pull/83",
        tags: ["Python", "Invariants", "Verification"],
        status: "PR Raised"
      },
      {
        number: 82,
        title: "R28-T013: Compare two methods: Python question 17",
        category: "Complexity & Benchmarks",
        summary: "Comprehensive comparison between iterative and functional paradigms measuring time complexity and readability tradeoffs.",
        url: "https://github.com/S-AI-Projects/Python-programming-exercises/pull/82",
        tags: ["Python", "Benchmarking", "Time Complexity"],
        status: "PR Raised"
      },
      {
        number: 81,
        title: "R28-T012: Explain the boundary: Python question 18",
        category: "Boundary Verification",
        summary: "Rigorous verification of boundary conditions, zero-length inputs, and off-by-one edge prevention.",
        url: "https://github.com/S-AI-Projects/Python-programming-exercises/pull/81",
        tags: ["Python", "Boundary Testing", "Edge Case Guard"],
        status: "PR Raised"
      },
      {
        number: 77,
        title: "R28-T011: Make example executable: Python question 32",
        category: "Automated Harness",
        summary: "Introduced self-contained executable harness with assertion checks for question 32 solution verification.",
        url: "https://github.com/S-AI-Projects/Python-programming-exercises/pull/77",
        tags: ["Python", "Test Harness", "Assertions"],
        status: "PR Raised"
      }
    ]
  },

  education: [
    {
      institution: "Newton School of Technology, ADYPU, Pune",
      degree: "B.Tech in Computer Science Engineering (AI & ML)",
      period: "2026 – Present",
      status: "Currently Pursuing (1st Year)",
      location: "Pune, Maharashtra",
      highlights: [
        "Specialization in Artificial Intelligence and Machine Learning",
        "Foundational coursework in Discrete Mathematics, Computational Logic, and Data Structures",
        "Exploring neural network architectures, audio spoofing defense, and quantitative modeling",
        "Consistent daily practice: algorithmic problem solving, active GitHub repositories, and open source"
      ],
      badge: "Current Degree",
      badgeType: "success"
    },
    {
      institution: "Sanjivani Junior College, Kopargaon",
      degree: "Higher Secondary (11th & 12th Grade) — Science",
      period: "2024 – 2026",
      status: "Completed",
      location: "Kopargaon, Maharashtra",
      highlights: [
        "Core science curriculum: Advanced Physics, Chemistry, and Mathematics (PCM)",
        "Intensive preparation for JEE (Joint Entrance Examination)",
        "Built disciplined analytical problem-solving intuition and strong quantitative foundations"
      ],
      badge: "JEE Preparation",
      badgeType: "accent"
    },
    {
      institution: "Vidya International School, Yeola",
      degree: "Secondary School Education (Till 10th Grade)",
      period: "Till 2023–2024",
      status: "Completed",
      location: "Yeola, Maharashtra",
      highlights: [
        "Foundational schooling with distinction across science, mathematics, and computer basics",
        "Active involvement in academic competitions, logic puzzles, and science exhibitions",
        "Developed early curiosity for computer science, software development, and algorithmic thinking"
      ],
      badge: "Schooling Foundation",
      badgeType: "neutral"
    }
  ],

  achievements: {
    role: "Consultant & Researcher",
    organization: "WorldQuant Brain",
    badge: "Quant Research",
    badgeType: "accent",
    period: "Active Contributor",
    tagline: "Quantitative financial modeling, alpha formula development, and market signal research.",
    description: "Working as a Consultant and Quantitative Researcher on the WorldQuant Brain platform, formulating predictive mathematical and statistical expressions ('Alphas') across financial datasets.",
    highlights: [
      "Alpha Formulation: Constructing mathematical expressions leveraging price-volume dynamics and fundamental factors to isolate market signals.",
      "Statistical Backtesting: Validating Sharpe ratio, returns, turnover, and drawdown metrics across diverse market universes.",
      "Quantitative Research: Developing systematic hypotheses, factor modeling, and mitigating multi-collinearity in alpha sets."
    ],
    toAchieve: [
      {
        title: "Master Advanced Problem-Solving",
        category: "Algorithmic Excellence",
        icon: "brain",
        description: "Achieve deep mastery in algorithmic logic, graph theory, dynamic programming, and competitive problem-solving across LeetCode, Codeforces, and HackerRank."
      },
      {
        title: "Start or Work in a High-Impact Startup",
        category: "Venture & Innovation",
        icon: "rocket",
        description: "Co-found or take on pivotal early-stage engineering roles in a technology startup — architecting real-world AI and scalable software systems from 0 to 1."
      }
    ]
  }
};
