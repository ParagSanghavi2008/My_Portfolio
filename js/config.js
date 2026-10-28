/**
 * Parag Rajeshkumar Sanghavi - Portfolio Configuration
 * Centralized data configuration for easy customization without altering HTML markup.
 */

window.PORTFOLIO_CONFIG = {
  personal: {
    name: "Parag Rajeshkumar Sanghavi",
    role: "Computer Science Engineering Student | Aspiring AI/ML Engineer",
    location: "Maharashtra, India",
    education: "B.Tech in Computer Science Engineering (AI & ML)",
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
    linkedin: "https://www.linkedin.com/in/paragsanghavi", // Placeholder: update with your LinkedIn handle
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
    },
    {
      id: "next-venture",
      title: "My Next Project",
      badge: "Coming Soon",
      badgeType: "neutral",
      category: "Emerging Tech",
      tagline: "A placeholder for a future project focused on solving a practical real-world problem.",
      description: "Currently formulating the project blueprint and researching problem domains in healthcare diagnostics, intelligent automation, or accessibility tech.",
      extendedDetails: {
        problemStatement: "Seeking high-impact real-world domains where applied machine learning provides measurable utility over traditional heuristics.",
        approach: "Conducting literature reviews and exploring lightweight open-source models suitable for edge or web deployment.",
        architectureHighlights: [
          "Problem discovery & user requirements analysis",
          "Evaluation of open datasets and ethical considerations",
          "Prototyping planned for upcoming hackathons"
        ],
        statusNote: "In ideation and feasibility evaluation. Project details and repositories will appear here upon milestone kickoff."
      },
      tags: ["To Be Added", "Ideation", "Practical AI", "Open Source"],
      links: {
        github: "",
        liveDemo: "",
        paper: ""
      },
      iconType: "sparkle"
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
  ]
};
