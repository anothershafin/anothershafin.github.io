/* ============================================================================
   PORTFOLIO CONTENT  —  EDIT THIS FILE TO UPDATE YOUR SITE
   ----------------------------------------------------------------------------
   This is the ONLY file you normally need to touch to keep the site current.
   Everything below is plain data. Change the text, add new items to the lists,
   or point images to new files. Save, commit, push — GitHub Pages updates.

   HOW TO ADD AN IMAGE
   -------------------
   1. Put your image file inside  assets/img/projects/  or  assets/img/certs/
   2. Set the matching "image" value below to that path, e.g.
        image: "assets/img/projects/my-new-project.jpg"
   3. If an image is missing, a nice placeholder shows automatically — so the
      layout never breaks while you collect screenshots.
   ============================================================================ */

/* ----------------------------------------------------------------------------
   1) BASIC INFO  (name, roles, contact, social links)
   ---------------------------------------------------------------------------- */
const SITE = {
  name: "Shafin Ahmed",
  // The rotating job titles shown under your name in the hero (typewriter).
  roles: [
    "AI & Bioinformatics Researcher",
    "Machine Learning Engineer",
    "Django Developer",
    "Physics Instructor",
    "Teacher & Content Creator",
  ],
  tagline:
    "Passionate about Physics, Programming and Machine Learning — anything logical and analytical.",
  location: "Dhaka, Bangladesh",

  // Contact + socials. Leave a value as "" to hide that link.
  email: "shafin.official101@gmail.com",
  phone: "", // optional, e.g. "+8801XXXXXXXXX"
  socials: {
    github: "https://github.com/anothershafin",
    linkedin: "https://www.linkedin.com/in/shafin-ahmed101",
    youtube: "https://www.youtube.com/@AnotherSHAFINAHMED",
    // add/remove as you like:
    // twitter: "",
    // facebook: "",
  },

  // Optional resume/CV. Put a PDF in assets/ and set the path, or leave "".
  resume: "", // e.g. "assets/Shafin-Ahmed-CV.pdf"
};

/* ----------------------------------------------------------------------------
   2) ABOUT  (the paragraphs in the About section + quick facts)
   ---------------------------------------------------------------------------- */
const ABOUT = {
  paragraphs: [
    "I'm Shafin Ahmed — passionate about Physics, Programming, Machine Learning and anything that is logical and analytical.",
    "I'm currently pursuing my Bachelor's in Computer Science and Engineering at BRAC University, Bangladesh, alongside deep dives into Data Structures & Algorithms, Machine Learning and the core domains of Computer Science. I intend to pursue research and higher studies in Machine Learning.",
    "Beyond code, I'm an experienced Physics Instructor and academic writer with a demonstrated history in the Academic & Materials team at UDVASH, where our team has published 200+ books and study materials.",
  ],
  // Small highlight cards under the about text.
  facts: [
    { icon: "🎓", label: "Education", value: "B.Sc. in CSE — BRAC University" },
    { icon: "🔬", label: "Focus", value: "Machine Learning & Bioinformatics" },
    { icon: "📍", label: "Based in", value: "Dhaka, Bangladesh" },
    { icon: "💼", label: "Currently", value: "ML Engineer Intern @ FlyRank AI" },
  ],
};

/* ----------------------------------------------------------------------------
   3) EXPERIENCE  (timeline). Newest first. Add/remove entries freely.
   ---------------------------------------------------------------------------- */
const EXPERIENCE = [
  {
    role: "Machine Learning Engineer Intern",
    org: "FlyRank AI",
    period: "Jun 2026 – Present",
    description:
      "Joined FlyRank — building the autopilot for organic growth — through the FlyRank AI Internship Program, automating how brands appear across classic and next-gen AI search engines.",
  },
  {
    role: "Student Tutor (Undergraduate Teaching Assistant)",
    org: "BRAC University",
    period: "Jul 2025 – Present",
    description:
      "Supporting undergraduate courses as a peer tutor, helping students master core Computer Science concepts.",
  },
  {
    role: "Assistant Manager & Physics Instructor",
    org: "UDVASH",
    period: "Dec 2021 – Present",
    description:
      "Supervise the academic materials of the Physics team, ensuring experiential learning. In 2023 the team published 200+ books and study materials, while I continue to teach Physics to students across levels.",
  },
  {
    role: "Brand Representative",
    org: "Interactive Cares",
    period: "May 2025 – Sep 2025",
    description:
      "Promoted upskilling programs and career initiatives across campus through peer engagement, events and creative social outreach.",
  },
  {
    role: "Co-Founder",
    org: "Blueblox Catto",
    period: "May 2024 – Present",
    description:
      "Co-founded a creative startup bringing unique arts & craft items to life for artists and handmade-craft lovers.",
  },
];

/* ----------------------------------------------------------------------------
   3b) EXPERIENCE STATS  (the 3 animated number cards under the timeline)
   value  -> the number it counts up to (plain number, no "+")
   suffix -> shown right after the number once counting finishes, e.g. "+"
   ---------------------------------------------------------------------------- */
const EXPERIENCE_STATS = [
  {
    value: 500,
    suffix: "+",
    label: "Classes Taught",
    sub: "Physics Instructor, UDVASH — since 2022",
  },
  {
    value: 200,
    suffix: "+",
    label: "Book Publications (2023)",
    sub: "Leading a supervised team of 30",
  },
  {
    value: 6,
    suffix: "",
    label: "Academic Books Authored",
    sub: "For Higher Secondary students",
  },
];

/* ----------------------------------------------------------------------------
   4) SKILLS  (grouped). Each skill's "icon" points to a logo bundled in
   assets/img/skills/<icon>.svg  (kept local so the site works offline & fast).
   To ADD a new skill logo: download its SVG from https://devicon.dev into
   assets/img/skills/ and set "icon" to the file name (without .svg).
   If a logo is ever missing, a tidy letter badge shows automatically.
   ---------------------------------------------------------------------------- */
const SKILL_GROUPS = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: "python" },
      { name: "C", icon: "c" },
      { name: "Java", icon: "java" },
    ],
  },
  {
    title: "Data Science & Machine Learning",
    skills: [
      { name: "NumPy", icon: "numpy" },
      { name: "Pandas", icon: "pandas" },
      { name: "Scikit-learn", icon: "scikitlearn" },
      { name: "Matplotlib", icon: "matplotlib" },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "Django", icon: "django" },
      { name: "Django REST Framework", icon: "django" },
      { name: "Flask", icon: "flask" },
    ],
  },
  {
    title: "Databases & Storage",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "SQLite", icon: "sqlite" },
      { name: "MySQL", icon: "mysql" },
      { name: "MariaDB", icon: "mariadb" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "vscode" },
      { name: "Postman", icon: "postman" },
      { name: "Linux", icon: "linux" },
      { name: "Bash", icon: "bash" },
    ],
  },
];

/* ----------------------------------------------------------------------------
   5) PROJECTS
   ---------------------------------------------------------------------------
   category  -> which group this shows under on the full Projects page. Keep
               it one of: "Machine Learning", "Web", "Python"
   featured  -> true = shown in the "Selected Projects" teaser on the home
               page (keep this to just 2-3 of your best projects). Every
               project — featured or not — always appears on projects.html.
   tech      -> small tags shown on the card
   image     -> screenshot/thumbnail (drop file in assets/img/projects/)
   repo      -> GitHub link ("" hides the button)
   demo      -> live/report link ("" hides the button)
   ---------------------------------------------------------------------------- */
const PROJECTS = [
  {
    title:
      "Probability Calibration in Tree-Based Models",
    org: "BRAC University",
    period: "Nov 2025 – Dec 2025",
    category: "Machine Learning",
    featured: true,
    description:
      "A systematic evaluation of post-hoc probability calibration for tree-based models on binary and multiclass healthcare tasks. Using the CDC Diabetes Health Indicators 2023 data, we compare uncalibrated models with Platt (sigmoid) calibration and isotonic regression, evaluated via ROC-AUC, Brier score, ECE and reliability diagrams.",
    tech: ["Machine Learning", "XGBoost", "Calibration", "scikit-learn"],
    image: "assets/img/P C.jpg",
    repo: "https://github.com/anothershafin/Probability-Calibration-in-Tree-Based-Models",
    demo: "",
  },
  {
    title: "Breast Cancer Prediction from Gene Expression",
    org: "BRAC University",
    period: "Aug 2025 – Sep 2025",
    category: "Machine Learning",
    featured: true,
    description:
      "A machine learning pipeline classifying breast cancer samples from high-dimensional RNA-seq gene expression (TCGA-BRCA). Includes rigorous preprocessing (log transform, feature filtering, mutual-information feature selection) and a comparison of Logistic Regression, XGBoost and a Neural Network under class imbalance.",
    tech: ["Machine Learning", "NumPy", "RNA-seq", "Neural Networks"],
    image: "assets/img/BC.jpg",
    repo: "https://github.com/anothershafin", // TODO: replace with the project repo URL
    demo: "",
  },
  {
    title: "Loan Approval Prediction",
    org: "BRAC University · CSE422",
    period: "Jul 2025 – Sep 2025",
    category: "Machine Learning",
    featured: true,
    description:
      "An end-to-end workflow predicting loan-approval eligibility. Handles class imbalance while optimizing Accuracy, Precision, Recall and ROC-AUC — covering data loading, EDA, cleaning, encoding, scaling, supervised modeling, metric visualization and an unsupervised KMeans baseline.",
    tech: ["Python", "Machine Learning", "EDA", "KMeans"],
    image: "assets/img/loan.jpg",
    repo: "https://github.com/anothershafin", // TODO: replace with the project repo URL
    demo: "",
  },
  {
    title: "Campus Companion",
    org: "BRAC University · CSE470",
    period: "2025 – Aug 2025",
    category: "Web",
    description:
      "A MERN-stack resource-sharing platform that lets students organize all of their study resources and daily tasks in one place.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    image: "assets/img/CC.jpg",
    repo: "https://github.com/anothershafin/Campus-Companion-CSE470-Project-",
    demo: "",
  },
  {
    title: "Project Musafir",
    org: "BRAC University",
    period: "May 2025",
    category: "Web",
    description:
      "A Django-based ride-sharing platform for bus transportation. Passengers find and book available rides; drivers add and manage trips — with built-in two-factor authentication and profile management for a safe, simple experience.",
    tech: ["Python", "Django", "2FA", "PostgreSQL"],
    image: "assets/img/PM.jpg",
    repo: "https://github.com/anothershafin/Project-Musafir",
    demo: "",
  },
  {
    title: "The BookArc",
    org: "BRAC University · CSE370",
    period: "Jan 2025",
    category: "Web",
    description:
      "A Flask-based library-management website built as our CSE370 group project — cataloguing, borrowing and managing books.",
    tech: ["Python", "Flask", "MySQL", "HTML/CSS"],
    image: "assets/img/BA.jpg",
    repo: "https://github.com/anothershafin/The-BookArc",
    demo: "",
  },
  {
    title: "Dice Rolling Game",
    org: "BRAC University",
    period: "Jun 2025",
    category: "Python",
    description:
      "A command-line Python game to roll one or multiple dice as many times as you like — with input validation, clean prompts and robust error handling.",
    tech: ["Python", "CLI"],
    image: "assets/img/Dice.jpg",
    repo: "https://github.com/anothershafin/Dice-Rolling-Game",
    demo: "",
  },
  {
    title: "Currency Converter",
    org: "BRAC University",
    period: "Dec 2022",
    category: "Python",
    description:
      "A Python currency converter supporting multiple conversions, input validation, quit-anytime functionality and session history tracking — practicing functions, loops, conditionals and dictionaries.",
    tech: ["Python", "CLI"],
    image: "assets/img/cconnvert.jpg",
    repo: "https://github.com/anothershafin/Currency-Converter",
    demo: "",
  },
  {
    title: "QR Code Generator",
    org: "BRAC University",
    period: "Nov 2022",
    category: "Python",
    description:
      "A simple Python QR-code generator that converts text or URLs into QR images and saves them as PNG files, using the qrcode and Pillow libraries with basic input handling.",
    tech: ["Python", "qrcode", "Pillow"],
    image: "assets/img/QR.jpg",
    repo: "https://github.com/anothershafin/QR-Code-Generator",
    demo: "",
  },
  {
    title: "Rock Paper Scissors",
    org: "BRAC University",
    period: "Oct 2022",
    category: "Python",
    description:
      "A console Rock-Paper-Scissors game against the computer, with emoji visuals, input validation and real-time score tracking. Choose your rounds, quit anytime and replay after finishing.",
    tech: ["Python", "CLI"],
    image: "assets/img/Rock Paper Scissors.jpg",
    repo: "https://github.com/anothershafin/Rock-Paper-Scissors-Single-Player-",
    demo: "",
  },
  {
    title: "The Number Guessing Game",
    org: "BRAC University",
    period: "Sep 2022",
    category: "Python",
    description:
      "A fun terminal game where players guess a randomly generated number within a chosen range and limited attempts. Clean modular design with input validation, replay options and mid-round quitting — built purely with Python's standard library.",
    tech: ["Python", "CLI"],
    image: "assets/img/number.jpg",
    repo: "https://github.com/anothershafin/The-Number-Guessing-Game",
    demo: "",
  },
];

/* ----------------------------------------------------------------------------
   6) LICENSES & CERTIFICATIONS  (shown on certifications.html)
   ---------------------------------------------------------------------------
   image         -> certificate image (drop file in assets/img/certs/)
   credentialUrl -> "Show credential" link ("" hides the button)
   credentialId  -> optional ID text ("" hides it)
   ---------------------------------------------------------------------------- */
const CERTIFICATIONS = [
  {
    title: "Brand Representative Program 6.0",
    issuer: "Interactive Cares",
    date: "Issued Sep 2025",
    skills: ["Leadership", "Communication", "Marketing"],
    image: "assets/img/certs/brand-representative.jpg",
    credentialUrl: "",
    credentialId: "",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI",
    date: "Issued Jan 2025",
    skills: ["Machine Learning", "Regression Models", "Classification", "Python", "scikit-learn"],
    image: "assets/img/certs/supervised-ml.jpg",
    credentialUrl: "", // TODO: paste the Coursera "Show credential" link
    credentialId: "",
  },
  {
    title: "Crash Course on Python",
    issuer: "Google",
    date: "Issued Dec 2024",
    skills: ["Python", "Object-Oriented Programming (OOP)", "Programming"],
    image: "assets/img/certs/crash-course-python.jpg",
    credentialUrl: "", // TODO: paste the Coursera "Show credential" link
    credentialId: "",
  },
  {
    title: "Get Started with Python",
    issuer: "Google",
    date: "Issued Nov 2024",
    skills: ["Python", "Data Visualization", "Data Analysis"],
    image: "assets/img/certs/get-started-python.jpg",
    credentialUrl: "", // TODO: paste the Coursera "Show credential" link
    credentialId: "",
  },
  {
    title: "HTML, CSS, and JavaScript for Web Developers",
    issuer: "The Johns Hopkins University",
    date: "Issued Oct 2024",
    skills: ["HTML", "HTML5", "CSS", "JavaScript", "Responsive Design"],
    image: "assets/img/certs/html-css-js.jpg",
    credentialUrl: "", // TODO: paste the Coursera "Show credential" link
    credentialId: "",
  },
  {
    title: "Web Development (Advanced Level)",
    issuer: "BRAC University",
    date: "Issued Aug 2023",
    skills: ["JavaScript", "JavaScript Libraries", "Web Development"],
    image: "assets/img/certs/web-dev-advanced.jpg",
    credentialUrl: "",
    credentialId: "22201469",
  },
];
