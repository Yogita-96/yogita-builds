import { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import taskquestPreview from './assets/taskquest-preview.png';
import theBetweenPreview from './assets/the-between-preview.png';
import yogitaPhoto from './assets/yogita.jpg';
import Familiar from './Familiar';

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Game Credits", href: "#credits" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  {
    cat: "Frontend", tone: "bright", icon: "◆",
    items: [
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "AngularJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "REST APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    ],
  },
  {
    cat: "Mobile", tone: "accent", icon: "◇",
    items: [
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
      { name: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { name: "iOS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" },
    ],
  },
  {
    cat: "Languages", tone: "soft", icon: "◈",
    items: [
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
    ],
  },
  {
    cat: "Tools & Infra", tone: "accent", icon: "◇",
    items: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Jira", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    ],
  },
  {
    cat: "Cloud & DevOps", tone: "bright", icon: "◆",
    items: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    ],
  },
  {
    cat: "Testing & QA", tone: "ember", icon: "◊",
    items: [
      { name: "Playwright", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg" },
      { name: "Jira", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
      { name: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
      { name: "Functional QA", icon: null, abbr: "FQA" },
      { name: "Regression QA", icon: null, abbr: "RQA" },
      { name: "AAA Game QA", icon: null, abbr: "AAA" },
    ],
  },
];

const EXPERIENCE = [
  {
    role: "FQA Game Tester",
    company: "Globalstep — Ubisoft & Bandai Namco",
    period: "Aug 2024 – Aug 2025",
    location: "Montreal, Canada",
    tone: "ember",
    icon: "◊",
    points: [
      "Conducted gameplay tests on AAA titles assessing missions, level design, gameplay, graphics, and audio quality.",
      "Conducted technical assessments based on developer test requirements.",
      "Identified and documented software defects and game glitches using JIRA.",
      "Collaborated directly with Ubisoft and Bandai Namco QA leads.",
      "Game credits publicly listed on MobyGames — a verifiable professional record.",
    ],
  },
  {
    role: "Freelance React Developer",
    company: "Self-Employed",
    period: "Apr 2023 – Present",
    location: "Remote",
    tone: "accent",
    icon: "◇",
    points: [
      "Developing cross-platform mobile applications using React Native for various clients.",
      "Implementing intuitive user interfaces and responsive designs to enhance user experience.",
      "Integrating third-party APIs and libraries to extend app functionality.",
      "Utilizing Redux for state management ensuring efficient data flow and seamless navigation.",
      "Delivering projects on time and within budget, generating repeat business.",
    ],
  },
  {
    role: "Software Development Intern",
    company: "GaoTek Inc.",
    period: "Jan 2023 – Apr 2023 · 4 months",
    location: "Canada (Remote)",
    tone: "soft",
    icon: "◈",
    points: [
      "Refactored and optimized legacy source code, resulting in 50% improvement in runtime performance.",
      "Collaborated with senior developers to design and implement new features using AngularJS.",
      "Developed and tested responsive interfaces using HTML5, CSS3, and JavaScript.",
    ],
  },
  {
    role: "Junior React Developer",
    company: "DigiiDunia",
    period: "Nov 2019 – Mar 2021 · 1.5 yrs",
    location: "Noida, India",
    tone: "bright",
    icon: "◆",
    points: [
      "Designed and developed responsive front-end features using React.js, Redux, JavaScript, HTML, and CSS.",
      "Built reusable and optimized UI components to improve scalability and maintainability.",
      "Integrated unit and Playwright tests to enhance test coverage and application stability.",
      "Validated user-facing dashboards and monitoring screens for data accuracy and layout consistency.",
      "Identified, documented, and tracked UI defects using internal ticketing tools.",
    ],
  },
];

const PROJECTS = [
  {
    slug: "taskquest",
    title: "TaskQuest",
    icon: "⚔",
    preview: "taskquest",
    description: "A gamified task manager built in React where to-dos become quests, completing tasks earns XP, and streaks level up your character. QA-tested edge cases throughout.",
    tech: ["React", "Custom Hooks", "localStorage", "CSS Animations"],
    status: "live",
    github: "https://github.com/Yogita-96/taskquest",
    live: "https://taskquest-three.vercel.app/",
    caseStudy: "/case-study/taskquest",
  },
  {
    slug: "the-between",
    title: "The Between",
    icon: "◆",
    preview: "thebetween",
    description: "A turn-based dark fantasy RPG built entirely in React — original world, original characters, original lore. No game engine. Just state management taken seriously.",
    tech: ["React", "useReducer", "CSS3", "Vite"],
    status: "building",
    github: "https://github.com/Yogita-96/the-between",
    live: "https://the-between-navy.vercel.app",
    caseStudy: "/case-study/the-between",
  },
  {
    slug: "car-sale",
    title: "Car Sale Mobile App",
    icon: "◇",
    preview: null,
    description: "Real client project — a Flutter app for a car dealership with Google/Facebook/Gmail social login, live car listings, and a Firebase real-time backend. Shipped to production.",
    tech: ["Flutter", "Dart", "Firebase", "Google APIs"],
    status: "live",
    github: "https://github.com/adinashby-vanier-college/app-dev-2-project-Gurpreet0112",
    live: null,
    caseStudy: null,
  },
  {
    slug: "medical-agency",
    title: "Medical Agency Web App",
    icon: "◈",
    preview: null,
    description: "B2B web application for a pharmaceutical company handling drug distribution from manufacturers to pharmacies. Full CRUD, user roles, built with ASP.NET and C#.",
    tech: ["ASP.NET", "C#", "SQL Server"],
    status: "live",
    github: "#",
    live: null,
    caseStudy: null,
  },
];

const ARTICLES = [
  { url: "https://medium.com/@yogita27496/how-i-added-gamification-to-my-react-task-manager", title: "How I Added Gamification to My React Task Manager", tag: "React · Product", date: "2026", readTime: "6 min read" },
  { url: "https://medium.com/@yogita27496/what-game-qa-taught-me-about-writing-better-software-f4fd96cbe02b", title: "What Game QA Taught Me About Writing Better Software", tag: "Career · QA", date: "2026", readTime: "4 min read" },
  { url: "https://medium.com/@yogita27496/7-qa-mindsets-every-frontend-developer-should-learn-ff84a42d664f", title: "7 QA Mindsets Every Frontend Developer Should Learn", tag: "QA", date: "2026", readTime: "5 min read" },
];

const MEDIUM_URL = "https://medium.com/@yogita27496";

const TYPEWRITER_LINES = [
  "React Developer  ·  QA Veteran  ·  Game Credits on MobyGames",
  "Building pixel-perfect UIs  ·  Shipping real products",
  "React Native  ·  Redux  ·  Vite  ·  A full RPG in raw React",
  "I build UIs.  I break UIs.  I fix UIs.",
];

const STATUS_STYLES = {
  live:     { className: "pstat-live",     label: "● Live" },
  building: { className: "pstat-building", label: "⟳ Building" },
  planned:  { className: "pstat-planned",  label: "◌ Planned" },
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqzgewd";

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useTypewriter(lines, speed = 75, deleteSpeed = 35, pause = 3200, interLine = 500) {
  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIdx];
    let timeout;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx(c => c + 1); }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx(c => c - 1); }, deleteSpeed);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setLineIdx(i => (i + 1) % lines.length);
      }, interLine);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, lineIdx, lines, speed, deleteSpeed, pause, interLine]);

  return displayed;
}

function useScrollSpy(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(id); }, { threshold: 0.25 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, [ids]);
  return active;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = e => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return reduced;
}

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useCountUp(targetRef, values, duration = 1800) {
  const done = useRef(false);
  useEffect(() => {
    if (!targetRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      obs.disconnect();
      values.forEach(({ id, target, suffix = "" }) => {
        const el = document.getElementById(id);
        if (!el) return;
        let start = null;
        const step = ts => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.35 });
    obs.observe(targetRef.current);
    return () => obs.disconnect();
  }, [targetRef, values, duration]);
}

// Theme hook: dark default, persist in localStorage, apply data-theme on <html>
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "light";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return [theme, () => setTheme(t => t === "dark" ? "light" : "dark")];
}

// ─── SAGE PARTICLE CANVAS (slow drift) ───────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    // medium drift → noticeable but calm
    const pts = Array.from({ length: 38 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.3 + 0.4,
      a: Math.random() * 0.35 + 0.12,
    }));

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // theme-aware particle color
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const dotRgb = isLight ? "97,133,108" : "127,168,138";
      const linkRgb = isLight ? "97,133,108" : "155,197,166";

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotRgb},${p.a})`;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${linkRgb},${0.045 * (1 - d / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [reducedMotion]);

  return (
    <canvas ref={canvasRef} aria-hidden="true" style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    }} />
  );
}

// ─── PHOTO FRAME (no upload UI) ──────────────────────────────────────────────

function PhotoFrame() {
  return (
    <div className="photo-frame" role="img" aria-label="Yogita profile photo">
      <div className="pfi">
        <img src={yogitaPhoto} alt="Yogita" />
      </div>
      <div className="pc tl" aria-hidden="true" />
      <div className="pc tr" aria-hidden="true" />
      <div className="pc bl" aria-hidden="true" />
      <div className="pc br" aria-hidden="true" />
      <div className="pbadge" aria-label="Location: Ontario, Canada">
        <span className="pbadge-pin">◆</span> Ontario, CA
      </div>
    </div>
  );
}

// ─── THEME TOGGLE ────────────────────────────────────────────────────────────

function ThemeToggle({ theme, toggle }) {
  return (
    <button
      className={`theme-toggle theme-toggle--${theme}`}
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle-knob">{theme === "dark" ? "☾" : "☀"}</span>
    </button>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav({ activeSection, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <nav className={`nav${scrolled ? " nav--scrolled" : ""}`} aria-label="Main navigation">
      <a href="#hero" className="nav-logo" onClick={e => scrollTo(e, "#hero")}>
        yogita<span className="logo-dot">.builds</span>
      </a>
      <button className="nav-hamburger" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
        <span /><span /><span />
      </button>
      <ul className={`nav-links${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a href={href} className={`nav-link${activeSection === href.replace("#", "") ? " active" : ""}`} onClick={e => scrollTo(e, href)}>{label}</a>
          </li>
        ))}
        {theme === 'dark' && (
  <li className="nav-toggle-item"><ThemeToggle theme={theme} toggle={toggleTheme} /></li>
)}
      </ul>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const text = useTypewriter(TYPEWRITER_LINES);
  const heroRef = useRef(null);
  useCountUp(heroRef, [
    { id: "s1", target: 3, suffix: "+" },
    { id: "s2", target: 8, suffix: "+" },
    { id: "s3", target: 2, suffix: "+" },
  ]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" data-familiar-key="hero" className="hero" ref={heroRef} aria-label="Introduction">
      <div className="hero-grid">
        <div className="hero-left">
          <div className="status-dot" role="status" aria-label="Available for work in Ontario and Remote">
            <span className="sd-pulse" aria-hidden="true" />Available for work · Ontario &amp; Remote
          </div>
          <div className="hero-eyebrow">{'// React Developer & Frontend Engineer'}</div>
          <h1 className="hero-name">
            Yogita<br /><span className="hero-name-accent">builds.</span>
          </h1>
          <p className="hero-tagline" aria-live="polite" aria-atomic="true">
            {text}<span className="typed-cursor" aria-hidden="true">&nbsp;</span>
          </p>
          <p className="hero-desc">
            Frontend developer with React expertise, AAA game QA credentials (Ubisoft &amp; Bandai Namco),
            and a passion for pixel-perfect UIs. Ontario-based — open to remote &amp; on-site roles across Canada.
          </p>
          <div className="hero-cta">
            <button className="btn-p" onClick={() => scrollTo("projects")}>View projects →</button>
            <a href="https://github.com/Yogita-96" target="_blank" rel="noopener noreferrer" className="btn-o">GitHub ↗</a>
            <button className="btn-o" onClick={() => scrollTo("contact")}>Get in touch</button>
          </div>
          <div className="hero-stats">
            <div><div className="stat-n" id="s1">0</div><div className="stat-l">Years React</div></div>
            <div><div className="stat-n" id="s2">0</div><div className="stat-l">AAA titles QA'd</div></div>
            <div><div className="stat-n" id="s3">0</div><div className="stat-l">Game credits</div></div>
          </div>
        </div>
        <div className="hero-right">
          <PhotoFrame />
        </div>
      </div>
    </section>
  );
}

// ─── SECTION LABEL ───────────────────────────────────────────────────────────

function SectionLabel({ number, label }) {
  return (
    <div className="sl reveal">
      <span className="sl-t">{number} · {label}</span>
      <div className="sl-l" aria-hidden="true" />
    </div>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" data-familiar-key="about" className="section section--alt" aria-labelledby="about-heading">
      <div className="sw">
        <SectionLabel number="01" label="About" />
        <div className="about-grid reveal">
          <div>
            <h2 id="about-heading" className="section-title">
              Developer. Tester.<br /><span className="accent">Builder.</span>
            </h2>
            <p className="body">
              I'm a versatile software developer with a strong foundation in <strong>React, JavaScript, and frontend engineering</strong> — backed by a B.Tech in Electronics &amp; Communication Engineering and an ACS in Software Development from Vanier College, Montreal.
            </p>
            <p className="body">
              My career spans junior React development at DigiiDunia, freelance React Native work, a dev internship at GaoTek, and <strong className="ember">professional AAA game QA</strong> via Globalstep for Ubisoft &amp; Bandai Namco — credits verifiable on MobyGames.
            </p>
            <p className="body">
              I bring a <strong>developer's precision</strong> and a <strong>tester's eye for quality</strong> to everything I ship.
            </p>
          </div>
          <div className="about-cards">
            <div className="info-card">
              <div className="card-label">Contact</div>
              <div className="contact-list">
                <div><span className="ic">✉</span> <a href="mailto:yogitaa.rm@gmail.com">yogitaa.rm@gmail.com</a></div>
                <div><span className="ic">◈</span> <span>Ontario, Canada</span></div>
                <div><span className="ic">↗</span> <a href="https://linkedin.com/in/Yogita-M" target="_blank" rel="noopener noreferrer">linkedin.com/in/Yogita-M</a></div>
                <div><span className="ic">◇</span> <a href="https://github.com/Yogita-96" target="_blank" rel="noopener noreferrer">github.com/Yogita-96</a></div>
              </div>
            </div>
            <div className="info-card">
              <div className="card-label">Education</div>
              <div className="edu-list">
                <div>
                  <div className="edu-degree">ACS — Software Development</div>
                  <div className="edu-meta">Vanier College, Montreal · 2021–2023</div>
                  <div className="edu-detail">Web Dev · Databases · Mobile Apps · Cyber Security</div>
                </div>
                <div>
                  <div className="edu-degree">B.Tech — Electronics &amp; Communication</div>
                  <div className="edu-meta">UIET, Panjab University · 2013–2017</div>
                  <div className="edu-detail">C · Data Structures · VLSI · Computer Architecture</div>
                </div>
                <div>
                  <div className="edu-degree">Cyber Security &amp; Ethical Hacking</div>
                  <div className="edu-meta">TCIL-IT, Chandigarh · 2017</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" data-familiar-key="experience" className="section" aria-labelledby="exp-heading">
      <div className="sw">
        <SectionLabel number="02" label="Work Experience" />
        <h2 id="exp-heading" className="sr-only">Work Experience</h2>
        <div className="exp-list">
          {EXPERIENCE.map((job, i) => {
            const familiarKey =
              job.company.includes("Globalstep") ? "exp_globalstep" :
              job.company.includes("Self-Employed") ? "exp_freelance" :
              job.company.includes("GaoTek") ? "exp_gaotek" :
              job.company.includes("DigiiDunia") ? "exp_digiidunia" : null;
            return (
              <article key={i} data-familiar-key={familiarKey} className={`exp-card card reveal tone-${job.tone}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="exp-header">
                  <div className="exp-header-left">
                    <div className="exp-icon"><span>{job.icon}</span></div>
                    <div>
                      <h3 className="exp-role">{job.role}</h3>
                      <div className="exp-company">{job.company}</div>
                    </div>
                  </div>
                  <div className="exp-right">
                    <div className="exp-period-badge">{job.period}</div>
                    <div className="exp-loc">◈ {job.location}</div>
                  </div>
                </div>
                <div className="exp-bullets-grid">
                  {job.points.map((pt, j) => (
                    <div key={j} className="exp-bullet-item">
                      <span className="exp-bullet-dot" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" data-familiar-key="skills" className="section section--alt" aria-labelledby="skills-heading">
      <div className="sw">
        <SectionLabel number="03" label="Skills & Tech" />
        <h2 id="skills-heading" className="sr-only">Skills and Technologies</h2>
        <div className="skills-grid">
          {SKILLS.map((cat, i) => (
            <div key={cat.cat} className={`card reveal tone-${cat.tone}`} style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="skill-cat"><span className="skill-cat-icon">{cat.icon}</span> {cat.cat}</div>
              <div className="skill-icons-grid">
                {cat.items.map(item => (
                  <div key={item.name} className="skill-icon-item" title={item.name}>
                    {item.icon ? (
                      <img src={item.icon} alt={item.name} className="skill-icon-img" loading="lazy"
                        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                    ) : null}
                    <span className="skill-icon-fallback" style={{ display: item.icon ? 'none' : 'flex' }}>
                      {item.abbr || item.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="skill-icon-label">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="levelling-box reveal">
          <span className="lb-label">Currently levelling up →</span>{" "}
          <span className="lb-content">React Hooks · useContext · Custom Hooks · TypeScript · Tailwind CSS · Playwright · Next.js</span>
        </div>
      </div>
    </section>
  );
}

// ─── MOCK PROJECT PREVIEWS ───────────────────────────────────────────────────

function CarSaleMock() {
  return (
    <div className="mock-preview">
      <div className="mock-phone">
        <div className="mock-phone-notch" />
        <div className="mock-phone-header">
          <span className="mock-phone-title">Cars near you</span>
          <span className="mock-phone-icon">◈</span>
        </div>
        <div className="mock-phone-listing">
          <div className="mock-phone-listing-img" />
          <div className="mock-phone-listing-body">
            <div className="mock-phone-listing-title" />
            <div className="mock-phone-listing-sub" />
            <div className="mock-phone-listing-price">$18,400</div>
          </div>
        </div>
        <div className="mock-phone-listing">
          <div className="mock-phone-listing-img" />
          <div className="mock-phone-listing-body">
            <div className="mock-phone-listing-title" />
            <div className="mock-phone-listing-sub" />
            <div className="mock-phone-listing-price">$24,900</div>
          </div>
        </div>
        <div className="mock-phone-tabs">
          <span className="mock-tab active">Browse</span>
          <span className="mock-tab">Saved</span>
          <span className="mock-tab">Profile</span>
        </div>
      </div>
    </div>
  );
}

function MedicalAgencyMock() {
  return (
    <div className="mock-preview mock-dashboard">
      <div className="mock-dash-sidebar">
        <div className="mock-dash-brand">◇ MedFlow</div>
        <div className="mock-dash-nav-item active">Orders</div>
        <div className="mock-dash-nav-item">Inventory</div>
        <div className="mock-dash-nav-item">Pharmacies</div>
        <div className="mock-dash-nav-item">Reports</div>
      </div>
      <div className="mock-dash-main">
        <div className="mock-dash-header">Active Orders <span className="mock-dash-badge">12</span></div>
        <div className="mock-dash-row"><span className="mock-dash-cell">#8241</span><span className="mock-dash-cell">Rx Pharmacy</span><span className="mock-dash-status">Shipped</span></div>
        <div className="mock-dash-row"><span className="mock-dash-cell">#8242</span><span className="mock-dash-cell">Northside</span><span className="mock-dash-status pending">Pending</span></div>
        <div className="mock-dash-row"><span className="mock-dash-cell">#8243</span><span className="mock-dash-cell">CareMed</span><span className="mock-dash-status">Shipped</span></div>
      </div>
    </div>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function Projects() {
  const [hovered, setHovered] = useState(null);
  const previews = { taskquest: taskquestPreview, thebetween: theBetweenPreview };
  const mockPreviews = { "car-sale": <CarSaleMock />, "medical-agency": <MedicalAgencyMock /> };

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="sw">
        <SectionLabel number="04" label="Projects" />
        <h2 id="projects-heading" className="sr-only">Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => {
            const s = STATUS_STYLES[p.status];
            const isHovered = hovered === p.title;
            const previewImg = previews[p.preview];
            return (
              <article key={p.title} data-familiar-key={`proj_${p.slug.replace(/-/g, '_')}`} className="card pcard reveal" style={{ transitionDelay: `${i * 0.07}s` }}
                onMouseEnter={() => setHovered(p.title)} onMouseLeave={() => setHovered(null)}>
                <div className="pstrip">
                  {previewImg ? (
                    <img src={previewImg} alt={`${p.title} preview`} className="pstrip-preview" />
                  ) : mockPreviews[p.slug] ? (
                    mockPreviews[p.slug]
                  ) : (
                    <div className="pstrip-icon">{p.icon}</div>
                  )}
                  <div className={`pstrip-overlay${isHovered ? ' pstrip-overlay--visible' : ''}`}>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="pstrip-btn" title="Live Preview" onClick={e => e.stopPropagation()}>
                        <span>↗</span><span className="pstrip-btn-label">Live</span>
                      </a>
                    )}
                    {p.github && p.github !== '#' && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="pstrip-btn" title="GitHub" onClick={e => e.stopPropagation()}>
                        <span>◇</span><span className="pstrip-btn-label">Code</span>
                      </a>
                    )}
                    {p.caseStudy && (
                      <Link to={p.caseStudy} className="pstrip-btn pstrip-btn--case" title="Case Study" onClick={e => e.stopPropagation()}>
                        <span>▤</span><span className="pstrip-btn-label">Case study</span>
                      </Link>
                    )}
                    {!p.live && !p.caseStudy && (
                      <div className="pstrip-btn pstrip-btn--disabled">
                        <span>◌</span><span className="pstrip-btn-label">No Demo</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="pcard-body">
                  <div className="pcard-header">
                    <h3 className="ptitle">{p.title}</h3>
                    <span className={`pstat ${s.className}`}>{s.label}</span>
                  </div>
                  <p className="pdesc">{p.description}</p>
                  <div className="ptags">
                    {p.tech.map(t => <span key={t} className="ptag">{t}</span>)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── ARTICLES (clean list + Medium link, no input) ───────────────────────────

function Articles() {
  return (
    <section id="articles" data-familiar-key="articles" className="section section--alt" aria-labelledby="articles-heading">
      <div className="sw">
        <SectionLabel number="05" label="Articles & Writing" />
        <h2 id="articles-heading" className="sr-only">Articles and Writing</h2>
        <div className="art-head reveal">
          <p className="body art-head-lede">Writing about React, frontend engineering, and game QA.</p>
          <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer" className="art-medium-link">
            View all on Medium ↗
          </a>
        </div>
        <ul className="art-list">
          {ARTICLES.map((a, i) => (
            <li key={i} className="art-list-item reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="art-list-link">
                <div className="art-list-main">
                  <div className="art-list-tag">✦ {a.tag}</div>
                  <div className="art-list-title">{a.title}</div>
                </div>
                <div className="art-list-meta">
                  <span className="art-list-read">{a.readTime}</span>
                  <span className="art-list-arrow">↗</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── GAME CREDITS ────────────────────────────────────────────────────────────

function GameCredits() {
  return (
    <section id="credits" data-familiar-key="credits" className="section" aria-labelledby="credits-heading">
      <div className="sw">
        <SectionLabel number="06" label="Game Credits" />
        <h2 id="credits-heading" className="sr-only">Game Credits</h2>
        <div className="card cr-card reveal">
          <div className="credits-inner">
            <div className="credits-icon" aria-hidden="true">◊</div>
            <div>
              <div className="credits-title">Credited on AAA Game Titles</div>
              <p className="body">
                Worked as a QA Tester via <strong>Globalstep</strong> on projects for{" "}
                <strong className="ember">Ubisoft</strong> and <strong className="ember">Bandai Namco</strong>.
                Conducted functional, regression, and exploratory testing on AAA titles. Credits publicly listed on
                MobyGames — a verifiable professional record.
              </p>
              <div className="credits-titles">
                <div className="credits-titles-label">Credited on</div>
                <div className="credits-titles-list">
                  <span className="credits-title-chip">◈ Assassin's Creed Shadows</span>
                  <span className="credits-title-chip">◈ Elden Ring Nightreign</span>
                </div>
              </div>
              <div className="credits-badges">
                <a href="https://www.mobygames.com/person/1835643/yogita-yogita/" target="_blank" rel="noopener noreferrer" className="credits-link">View on MobyGames ↗</a>
                <span className="credits-badge">Ubisoft</span>
                <span className="credits-badge">Bandai Namco</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" data-familiar-key="contact" className="section" aria-labelledby="contact-heading">
      <div className="sw" style={{ textAlign: "center" }}>
        <SectionLabel number="07" label="Let's Talk" />
        <h2 id="contact-heading" className="contact-heading">
          Open to <span className="accent">new opportunities</span>
        </h2>
        <p className="body" style={{ maxWidth: 480, margin: "0 auto 2.5rem" }}>
          Actively seeking React / frontend roles in Ontario and across Canada. Quick learner, strong QA instincts,
          and a genuine love for building high-quality products. Let's connect.
        </p>
        <div className="contact-cards reveal">
          {[
            { icon: "✉", label: "Email", value: "yogitaa.rm@gmail.com", href: "mailto:yogitaa.rm@gmail.com" },
            { icon: "▤", label: "LinkedIn", value: "linkedin.com/in/Yogita-M", href: "https://linkedin.com/in/Yogita-M" },
            { icon: "◇", label: "GitHub", value: "github.com/Yogita-96", href: "https://github.com/Yogita-96" },
            { icon: "◊", label: "MobyGames", value: "Game Credits", href: "https://www.mobygames.com/person/1835643/yogita-yogita/" },
          ].map(c => (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="ccard">
              <span className="ci">{c.icon}</span>
              <div className="clb">{c.label}</div>
              <div className="cv">{c.value}</div>
            </a>
          ))}
        </div>
        <div className="contact-form-wrap reveal">
          <div className="form-divider">or send a message directly</div>
          {status === "sent" ? (
            <div className="form-success" role="alert">
              ✓ Message sent — I'll get back to you at yogitaa.rm@gmail.com soon.
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {[
                { name: "name", label: "Name", type: "text", placeholder: "Your name" },
                { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map(f => (
                <div key={f.name} className="form-group">
                  <label htmlFor={f.name} className="form-label">{f.label}</label>
                  <input id={f.name} name={f.name} type={f.type} className={`form-input${errors[f.name] ? " form-input--error" : ""}`} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} />
                  {errors[f.name] && <p className="field-error" role="alert">{errors[f.name]}</p>}
                </div>
              ))}
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea id="message" name="message" rows={5} className={`form-input form-textarea${errors.message ? " form-input--error" : ""}`} value={form.message} onChange={handleChange} placeholder="What are you working on?" />
                {errors.message && <p className="field-error" role="alert">{errors.message}</p>}
              </div>
              {status === "error" && <p className="field-error" role="alert">Something went wrong. Email me directly at yogitaa.rm@gmail.com</p>}
              <button type="submit" className="btn-p submit-btn" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <span>Built in React · No template · © 2026 yogita.builds</span>
      <span className="accent">yogitaa.rm@gmail.com</span>
    </footer>
  );
}

// ─── CASE STUDY CONTENT ──────────────────────────────────────────────────────

const CASE_STUDIES = {
  taskquest: {
    title: "TaskQuest",
    tagline: "A gamified React task manager. Every to-do is a quest, every completion is XP, every streak is a level.",
    status: "shipped",
    statusLabel: "● Shipped",
    heroPreview: "taskquest",
    overview: [
      "TaskQuest turns the flat, joyless to-do list into an RPG progression system. Adding a task is naming a quest. Checking it off earns XP. Enough XP levels you up. Each level unlocks a new player title — Newcomer → Apprentice → Scout → Adventurer → Warrior → Champion → Legend.",
      "I built it because I wanted to prove I could design a system, not just implement one — the XP math, the level thresholds, the state persistence, the UX around edge cases. All of it decided from first principles, all of it in raw React with no external state library.",
    ],
    stack: ["React 19", "Custom Hooks", "localStorage", "CSS Animations", "Vite"],
    decisions: [
      {
        title: "Custom hooks over Redux",
        body: "TaskQuest's state is small and local — quest list, XP total, current level, player title. Reaching for Redux would have added ceremony without benefit. Instead I built `useQuests` and `usePlayer` — two custom hooks that own their slices, expose actions, and persist to localStorage on change. The result is a codebase where every piece of state has one clear owner and the mental model stays tiny.",
      },
      {
        title: "RPG progression math",
        body: "Level thresholds scale exponentially — each level requires ~30% more XP than the last, so early progression feels fast (rewards engagement) and later levels feel earned (rewards commitment). Player titles gate at specific levels, not every level, so unlocking one feels like an event. This is the same design pattern real RPGs use for a reason.",
      },
      {
        title: "Persistence as a first-class concern",
        body: "Quest data, XP, level, and title all live in localStorage under a namespaced key. Every state change writes immediately — no debouncing, no save button. If the tab closes, refreshes, or crashes, the player returns to exactly where they were. This is invisible when it works, catastrophic when it doesn't, so I tested every edge case: empty state on first load, corrupted JSON, quota exceeded, cross-tab consistency.",
      },
      {
        title: "Micro-interactions that reward",
        body: "Completing a quest triggers a subtle animation, XP number, and progress bar fill. Leveling up drops a confetti banner with the new title. The animations are pure CSS keyframes — no Framer Motion, no library. Every effect is under 400ms because dopamine works on feedback loops, not spectacle.",
      },
    ],
    qaSection: {
      title: "How QA thinking shaped the build",
      body: "This is where two years of AAA game QA earn their keep. Before I wrote the first line of code, I listed everything that could break: duplicate quest names, empty task submissions, XP overflow, level-up during page refresh, localStorage disabled by the browser, quota exceeded, corrupted saved state. Each got a defense.",
      examples: [
        "Duplicate quests allowed only if the previous instance is completed — otherwise the input rejects with a friendly nudge",
        "Confirmation dialog before clearing completed quests (destructive action, no undo)",
        "Sticky header keeps the XP bar and input visible while the list scrolls — validated against a 200-quest edge case",
        "Level-up banner auto-dismisses after 2.5s but stays clickable so a distracted player doesn't miss the reward",
        "Enter key adds a quest so power users never have to reach for the mouse",
      ],
      close: "None of this is glamorous. All of it is the difference between a demo and a product.",
    },
    learned: [
      "React's mental model rewards small, single-purpose hooks over sprawling context providers. useQuests and usePlayer stayed under 60 lines each.",
      "Gamification works when the reward loop is tight (< 500ms) and the progression math respects the player's time. Slow feedback kills engagement faster than boring UI.",
      "Writing about the project on Medium after shipping forced me to articulate decisions I had made intuitively. Half the reason for the case study is that it makes me a better engineer.",
    ],
    articles: [
      { title: "How I Added Gamification to My React Task Manager", url: "https://medium.com/@yogita27496/how-i-added-gamification-to-my-react-task-manager" },
    ],
  },

  "the-between": {
    title: "The Between",
    tagline: "A turn-based dark fantasy RPG built entirely in React. Two playable characters, three enemy tiers, hand-drawn card combat, and a Sekiro-inspired posture system — no game engine.",
    status: "building",
    statusLabel: "⟳ Building in public",
    heroPreview: "thebetween",
    inProgressBanner: "The Between is actively in development. This case study is being written alongside the game — sections marked 'evolving' will grow as new mechanics ship. Currently in playtest — the live link is a playable build, not a finished product. Follow along on the Instagram build-in-public account (@yogita.builds_) or check the repo for the latest.",
    overview: [
      "The Between is a turn-based dark fantasy RPG set in a liminal space that collects things mid-state — things lost, half-formed, or forgotten. Two playable characters, three enemy tiers including a boss with hidden intents, a card-draw combat system with stagger mechanics, and a Sekiro-inspired posture system where damage taken becomes damage dealt.",
      "The point of the project isn't the game — it's proving that React's state model is powerful enough to run something this systemic. No game engine. No physics library. Just useReducer, useState, and a rigorous design of what each state transition means.",
    ],
    stack: ["React 19", "useState + Refs", "Custom Hooks", "React Router", "CSS3", "Vite", "localStorage"],
    decisions: [
     {
        title: "State-machine architecture in raw useState + refs",
        body: "Combat has 20+ pieces of interlocking state: turn phase, hand, enemy intent, both posture meters, both HP, both stagger states, discount flags, penalty flags, hemorrhage bleed, expose duration, backstepping, evading, enduring. I built this as a strict state machine — each action transitions the game through predictable phases (player → enemy_windup → enemy_attack → cleanup → player). No useReducer, because the derived-state and effect-driven parts (enemy AI, floating numbers, HP flash) fit useState + refs more naturally. The tradeoff: I take on the discipline useReducer would enforce automatically. The upside: every phase and transition is inspectable in dev tools, and I never fight the framework.",
      },
      {
        title: "Data-driven card system with chain mechanics",
        body: "Each character has a 13-card base pool. Every turn draws 4 with anti-repeat logic (last hand's cards are held back one cycle). Cards are pure config: name, cost, damage, posture, plus an optional 'special' key that maps to a mechanic. Sable's Exploit deals 14 damage normally, 28 if the enemy is staggered — that's live combat state reading, not hardcoded doubling. Ghost Step recovers posture AND discounts the next attack, threading a setup-payoff chain across turns. Vanish→Slit Throat, Death Mark→any damaging card, and the Ghost Step chain all leverage the same conditional-availability system. Adding a new card is one entry in the config plus (if it does something novel) one branch in the special handler.",
      },
      {
        title: "Enemy intent → execute loop",
        body: "Every enemy telegraphs their next action at the start of the turn (icon + damage number), then executes it on their turn. Boss phase 2 hides intents until the player has staggered them once — this small change makes the encounter dramatically harder without new mechanics, just information asymmetry. Players stop optimizing and start reading the fight.",
      },
     {
        title: "Run persistence, not mid-combat save",
        body: "The game saves on map arrival, not mid-turn. Mid-combat save creates too many edge cases (interrupted animations, in-flight card effects, dispatched-but-not-committed state) for a solo dev on a first pass. Deferring it to a future 'Option B' pattern let me ship the current version without a save system that could corrupt runs. QA calls this scoping. Recruiters call it judgment.",
      },
      {
        title: "Turn readability as a first-class design problem",
        body: "Early combat felt like a wind — cards played, damage happened, the log filled up, and players (myself included) couldn't tell what had actually landed. The fix wasn't more information, it was pacing. I broke the enemy turn into three visible phases: label change and card fade (700ms) → intent box glows and pulses as the enemy winds up (1100ms) → attack lands with floating damage numbers over the target HP bar, red flash and shake on the bar itself (1400ms cleanup). Total time added: ~2 seconds. What players get: they can actually see what happened, which was the entire point. This is the difference between 'the mechanic works' and 'the mechanic feels right to play.'",
      },
      {
        title: "Soft-lock recovery: the Skip Turn button",
        body: "In a stamina-gated card game, players sometimes draw a hand where nothing is playable — every card too expensive, every conditional card locked. Rather than force a loss, a contextual Skip Turn button appears only in that specific state. It costs: character-specific posture damage (Kaen 20, Sable 10) and a stamina penalty next turn (Kaen 2, Sable 3). The costs reinforce identity — Kaen's tank posture cracks under pressure, Sable's rhythm breaks. The button lives at the top corner normally and centers itself above the turn label when active, pulling the Flee button with it. Small feature, one full evening of design + implementation, and it makes the game genuinely more forgiving without softening it.",
      },
    ],
    qaSection: {
      title: "The bug story: enemy-turn re-entry",
      body: "Halfway through building combat I hit a bug that took a full day to unwind. Enemies would occasionally take two turns in a row, or attack after already being killed. The obvious fix — checking HP before the enemy action — didn't work; the bug still fired.",
      examples: [
        "The enemy-turn effect had `playerHP` and `enemyHP` in its dependency array (correct — damage should trigger re-render)",
        "But that meant the effect would re-fire mid-execution when it applied its own damage to the player",
        "Which triggered the enemy to act again before the player's turn had actually resumed",
        "Fix: an `enemyTurnProcessing` ref that guarded the effect body against re-entry — the effect can re-fire freely, but the body only runs to completion once per enemy turn",
      ],
      close: "Debugging this taught me something I'd only half-understood: useEffect deps trigger the effect, but the effect body is your responsibility to make idempotent. The ref pattern isn't idiomatic React — it's a workaround for a real constraint. Knowing when to reach for it is the difference between fighting the framework and using it. The same ref-guard pattern later made the phased enemy turn possible: without a re-entry guard, breaking the turn into three timed phases would have compounded the original bug tenfold.",
    },
    learned: [
      "State machines aren't a library — they're a discipline. useState + refs will get you further than you'd think, if you're rigorous about phase transitions.",
      "Game feel is 90% timing. A card animation at 300ms feels responsive; at 600ms it feels sluggish. Turn resolution at 900ms felt like a blink; at 3 seconds it feels deliberate. This applies to any UI, not just games.",
      "Card game descriptions are UX writing. 'posture +12' vs 'enemy posture +12' is a five-character change that eliminates an entire class of player misreadings. Words in a UI are code that runs on human brains.",
      "Building without a framework taught me more about React in six months than three years of professional work did. Constraints are a teacher.",
    ],
    articles: [],
    evolving: [
      "Screen shake on stagger break and dramatic boss phase 2 transition",
      "Enemy hit flash on character silhouettes (currently only HP bars react)",
      "A dedicated 'run complete' screen after the Cartographer boss",
      "True pause/resume mid-combat preserving full state (deferred until a Steam-scope expansion)",
      "External playtest feedback round with AAA-tester friends (Ubisoft & Bandai Namco QA background) — currently prepping",
    ],
  },
};

// ─── CASE STUDY PAGE ─────────────────────────────────────────────────────────

function CaseStudy() {
  const [theme, toggleTheme] = useTheme();
  const { slug } = useParams();
  const project = PROJECTS.find(p => p.slug === slug);
  const data = CASE_STUDIES[slug];

  useScrollReveal();
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const previews = { taskquest: taskquestPreview, thebetween: theBetweenPreview };
  const heroImg = data ? previews[data.heroPreview] : null;

  if (!data) {
    return (
      <>
        <style>{CSS}</style>
        <div className="grid-bg" aria-hidden="true" />
        <nav className="nav nav--scrolled">
          <Link to="/" className="nav-logo">yogita<span className="logo-dot">.builds</span></Link>
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">← Back to portfolio</Link></li>
            {theme === 'dark' && (
  <li className="nav-toggle-item"><ThemeToggle theme={theme} toggle={toggleTheme} /></li>
)}
          </ul>
        </nav>
        <main className="cs-wrap">
          <div className="cs-inner">
            <h1 className="cs-title">Case study not found</h1>
            <p className="cs-body">The project you're looking for doesn't exist yet.</p>
            <Link to="/" className="btn-p">← Back to portfolio</Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="grid-bg" aria-hidden="true" />
      <div className="glow-pool" aria-hidden="true" />
      <nav className="nav nav--scrolled" aria-label="Case study navigation">
        <Link to="/" className="nav-logo">yogita<span className="logo-dot">.builds</span></Link>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">← Back to portfolio</Link></li>
          {theme === 'dark' && (
  <li className="nav-toggle-item"><ThemeToggle theme={theme} toggle={toggleTheme} /></li>
)}
        </ul>
      </nav>
      <Familiar theme={theme} toggleTheme={toggleTheme} />

      <main className="cs-page">
        {/* HERO */}
        <section className="cs-hero">
          <div className="cs-hero-inner">
            <div className="cs-hero-copy">
              <div className="cs-eyebrow">{'// Case Study'}</div>
              <h1 className="cs-title">{data.title}</h1>
              <p className="cs-tagline">{data.tagline}</p>
              <div className={`cs-status cs-status--${data.status}`}>
                <span className="cs-dot" /> {data.statusLabel}
              </div>
              <div className="cs-links">
                {project?.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-p">Visit live site ↗</a>
                )}
                {project?.github && project.github !== '#' && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-o">View source ↗</a>
                )}
              </div>
            </div>
            {heroImg && (
              <div className="cs-hero-visual">
                <img src={heroImg} alt={`${data.title} preview`} className="cs-hero-img" />
              </div>
            )}
          </div>
        </section>

        {/* IN-PROGRESS BANNER (only if present) */}
        {data.inProgressBanner && (
          <section className="cs-section" data-familiar-key="cs_progress">
            <div className="cs-wrap-inner">
              <div className="cs-progress-banner reveal">
                <div className="cs-progress-icon">⚒</div>
                <div>
                  <div className="cs-progress-label">Actively Building</div>
                  <p className="cs-progress-body">{data.inProgressBanner}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* OVERVIEW */}
        <section className="cs-section" data-familiar-key="cs_overview">
          <div className="cs-wrap-inner">
            <div className="cs-section-label reveal">01 · Overview</div>
            {data.overview.map((p, i) => (
              <p key={i} className="cs-prose reveal" style={{ transitionDelay: `${i * 0.05}s` }}>{p}</p>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section className="cs-section cs-section--alt" data-familiar-key="cs_stack">
          <div className="cs-wrap-inner">
            <div className="cs-section-label reveal">02 · The Stack</div>
            <div className="cs-stack reveal">
              {data.stack.map(s => (
                <span key={s} className="cs-stack-chip">{s}</span>
              ))}
            </div>
          </div>
        </section>

        {/* KEY DECISIONS */}
        <section className="cs-section">
          <div className="cs-wrap-inner">
            <div className="cs-section-label reveal">03 · Key Technical Decisions</div>
            <div className="cs-decisions">
              {data.decisions.map((d, i) => (
                <article key={i} className="cs-decision reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
                  <h3 className="cs-decision-title">{d.title}</h3>
                  <p className="cs-decision-body">{d.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* QA / BUG STORY SECTION */}
        {data.qaSection && (
          <section className="cs-section cs-section--alt" data-familiar-key="cs_qa">
            <div className="cs-wrap-inner">
              <div className="cs-section-label reveal">04 · {data.qaSection.title}</div>
              <p className="cs-prose reveal">{data.qaSection.body}</p>
              <ul className="cs-list reveal">
                {data.qaSection.examples.map((ex, i) => (
                  <li key={i} className="cs-list-item">
                    <span className="cs-list-marker">◈</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
              {data.qaSection.close && (
                <p className="cs-prose cs-prose--emphasis reveal">{data.qaSection.close}</p>
              )}
            </div>
          </section>
        )}

        {/* WHAT I LEARNED */}
        <section className="cs-section" data-familiar-key="cs_learned">
          <div className="cs-wrap-inner">
            <div className="cs-section-label reveal">05 · What I Learned</div>
            <ul className="cs-list reveal">
              {data.learned.map((l, i) => (
                <li key={i} className="cs-list-item">
                  <span className="cs-list-marker">◇</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* EVOLVING (only if present) */}
        {data.evolving && data.evolving.length > 0 && (
          <section className="cs-section cs-section--alt" data-familiar-key="cs_evolving">
            <div className="cs-wrap-inner">
              <div className="cs-section-label reveal">06 · Evolving</div>
              <p className="cs-prose reveal">Sections and features actively in development:</p>
              <ul className="cs-list reveal">
                {data.evolving.map((e, i) => (
                  <li key={i} className="cs-list-item">
                    <span className="cs-list-marker cs-list-marker--ember">⚒</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* RELATED ARTICLES (only if present) */}
        {data.articles && data.articles.length > 0 && (
          <section className="cs-section" data-familiar-key="cs_articles">
            <div className="cs-wrap-inner">
              <div className="cs-section-label reveal">{data.evolving ? '07' : '06'} · Related Writing</div>
              <ul className="cs-articles reveal">
                {data.articles.map((a, i) => (
                  <li key={i}>
                    <a href={a.url} target="_blank" rel="noopener noreferrer" className="cs-article-link">
                      <span className="cs-article-title">{a.title}</span>
                      <span className="cs-article-arrow">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section className="cs-section cs-section--alt" data-familiar-key="cs_cta">
          <div className="cs-wrap-inner cs-cta">
            <div className="cs-cta-heading">Interested in the code?</div>
            <div className="cs-links">
              {project?.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-p">Visit live site ↗</a>
              )}
              {project?.github && project.github !== '#' && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-o">View source ↗</a>
              )}
              <Link to="/" className="btn-o">← Back to portfolio</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────

function Home() {
  const [theme, toggleTheme] = useTheme();
  const sectionIds = NAV_LINKS.map(l => l.href.replace("#", ""));
  const activeSection = useScrollSpy(sectionIds);
  useScrollReveal();

  return (
    <>
      <style>{CSS}</style>
      <a href="#about" className="skip-link">Skip to main content</a>
      <div className="grid-bg" aria-hidden="true" />
      <div className="glow-pool" aria-hidden="true" />
      <ParticleCanvas />
      <Familiar theme={theme} toggleTheme={toggleTheme} />
      <Nav activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Articles />
        <GameCredits />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/:slug" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@300;400;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ============ THEME TOKENS ============ */

:root, [data-theme="dark"] {
  --base:            #0F1511;
  --base-2:          #0C110E;
  --surface:         #161E18;
  --surface-raised:  #1B241D;
  --line:            #2A3A2E;
  --accent:          #7FA88A;
  --accent-bright:   #9BC5A6;
  --soft:            #A8C4B0;
  --muted:           #6E8676;
  --white:           #E4EDE6;
  --ember:           #C89B6A;
  --ember-ink:       #241a0e;
  --glow:            rgba(127,168,138,0.28);
  --grid-line:       rgba(127,168,138,0.035);
  --shadow-strong:   rgba(0,0,0,0.35);
  --form-glow:       rgba(127,168,138,0.12);
}

[data-theme="light"] {
  --base:            #EEF2EA;   /* pale sage-tinted background */
  --base-2:          #E4EBE0;   /* alt section bg */
  --surface:         #F5F8F2;   /* raised cards */
  --surface-raised:  #FFFFFF;   /* highest layer, inputs */
  --line:            #C6D2C0;   /* borders */
  --accent:          #4A7758;   /* deeper sage for contrast */
  --accent-bright:   #5A8B69;   /* hover state */
  --soft:            #3A4A3E;   /* secondary text */
  --muted:           #6B7A6E;   /* labels, meta */
  --white:           #1E2620;   /* headings — sage-charcoal, not black */
  --ember:           #B57F42;   /* deeper ember for contrast */
  --ember-ink:       #FFFFFF;
  --glow:            rgba(74,119,88,0.15);
  --grid-line:       rgba(74,119,88,0.045);
  --shadow-strong:   rgba(30,38,32,0.10);
  --form-glow:       rgba(74,119,88,0.12);
}

html { scroll-behavior: smooth; }
body { background: var(--base); color: var(--soft); font-family: 'DM Sans', sans-serif; font-size: 16px; line-height: 1.6; overflow-x: hidden; transition: background 0.35s ease, color 0.35s ease; }
::selection { background: rgba(127,168,138,0.25); color: var(--white); }
[data-theme="light"] ::selection { background: rgba(74,119,88,0.20); color: var(--white); }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--base-2); }
::-webkit-scrollbar-thumb { background: rgba(127,168,138,0.3); }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }

.accent { color: var(--accent); }
.ember { color: var(--ember); }

.skip-link { position: absolute; left: -9999px; top: 1rem; background: var(--accent); color: var(--base); padding: 0.5rem 1rem; font-family: 'Space Mono', monospace; font-size: 0.8rem; font-weight: 700; z-index: 9999; text-decoration: none; }
.skip-link:focus { left: 1rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

.grid-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; background-image: linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px); background-size: 60px 60px; }
.glow-pool { position: fixed; top: 40%; left: 55%; width: 60vw; height: 60vw; transform: translate(-50%, -50%); background: radial-gradient(circle, var(--glow) 0%, transparent 62%); pointer-events: none; z-index: 0; filter: blur(50px); }

/* ============ NAV ============ */
nav.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; height: 60px; padding: 0 5%; display: flex; align-items: center; justify-content: space-between; transition: all 0.3s; }
[data-theme="dark"] nav.nav--scrolled { background: rgba(15,21,17,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--line); }
[data-theme="light"] nav.nav--scrolled { background: rgba(238,242,234,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--line); }
.nav-logo { font-family: 'Space Mono', monospace; font-size: 0.9rem; color: var(--white); letter-spacing: 0.04em; text-decoration: none; font-weight: 700; }
.logo-dot { color: var(--accent); }
.nav-links { display: flex; gap: 22px; list-style: none; align-items: center; }
.nav-link { font-family: 'Space Mono', monospace; font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.2s; }
.nav-link:hover, .nav-link.active { color: var(--accent-bright); }
.nav-hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.nav-hamburger span { display: block; width: 22px; height: 1.5px; background: var(--soft); transition: 0.2s; }
.nav-toggle-item { display: flex; align-items: center; }

/* theme toggle */
.theme-toggle { width: 46px; height: 24px; border-radius: 999px; background: var(--surface); border: 1px solid var(--line); position: relative; cursor: pointer; padding: 0; transition: all 0.25s; }
.theme-toggle:hover { border-color: var(--accent); }
.theme-toggle-knob { position: absolute; width: 18px; height: 18px; border-radius: 50%; background: var(--accent); top: 2px; left: 2px; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; color: var(--base); transition: transform 0.25s ease, background 0.25s; }
.theme-toggle--light .theme-toggle-knob { transform: translateX(22px); background: var(--ember); color: var(--ember-ink); }

@media (max-width: 860px) {
  .nav-hamburger { display: flex; }
  .nav-links { display: none; position: absolute; top: 60px; left: 0; right: 0; flex-direction: column; gap: 0; background: var(--base-2); border-bottom: 1px solid var(--line); padding: 0.5rem 5%; }
  .nav-links.open { display: flex; }
  .nav-link { padding: 0.75rem 0; font-size: 0.9rem; border-bottom: 1px solid var(--line); }
  .nav-toggle-item { padding: 0.75rem 0; justify-content: flex-start; }
}

/* ============ HERO ============ */
.hero { min-height: 100vh; position: relative; z-index: 1; padding: 100px 4% 80px; display: flex; flex-direction: column; justify-content: center; }
.hero-grid { max-width: 1200px; width: 100%; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; align-items: center; gap: 4rem; }
@media (max-width: 860px) { .hero-grid { grid-template-columns: 1fr; } .hero-right { order: -1; display: flex; justify-content: center; } }

.status-dot { display: inline-flex; align-items: center; gap: 10px; padding: 8px 18px; background: rgba(127,168,138,0.14); border: 1px solid var(--accent); border-radius: 999px; margin-bottom: 22px; font-family: 'Space Mono', monospace; font-size: 0.66rem; color: var(--accent-bright); letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700; opacity: 0; animation: fadeUp 0.7s 0s forwards; box-shadow: 0 0 0 4px rgba(127,168,138,0.06); }
[data-theme="light"] .status-dot { background: rgba(74,119,88,0.14); color: var(--accent); box-shadow: 0 0 0 4px rgba(74,119,88,0.06); }
.sd-pulse { width: 7px; height: 7px; border-radius: 50%; background: var(--accent-bright); animation: gpulse 2s ease-in-out infinite; }
[data-theme="light"] .sd-pulse { background: var(--accent); }
@keyframes gpulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(155,197,166,0.4)} 50%{opacity:0.7;box-shadow:0 0 0 6px rgba(155,197,166,0)} }

.hero-eyebrow { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--accent); letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 14px; opacity: 0; animation: fadeUp 0.7s 0.1s forwards; }
.hero-name { font-family: 'Syne', sans-serif; font-size: clamp(4rem, 8vw, 7rem); font-weight: 900; line-height: 0.9; color: var(--white); letter-spacing: -0.02em; margin-bottom: 8px; opacity: 0; animation: fadeUp 0.7s 0.25s forwards; }
.hero-name-accent { color: var(--accent); }

.hero-tagline { font-family: 'Space Mono', monospace; font-size: 0.78rem; color: var(--soft); margin-top: 20px; line-height: 2; min-height: 3.5em; opacity: 0; animation: fadeUp 0.7s 0.4s forwards; }
.typed-cursor { border-right: 2px solid var(--accent); animation: blink 1s step-end infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

.hero-desc { font-size: 0.94rem; color: var(--soft); font-weight: 300; line-height: 1.75; max-width: 480px; margin-top: 16px; opacity: 0; animation: fadeUp 0.7s 0.55s forwards; }
[data-theme="light"] .hero-desc { font-weight: 400; }
.hero-cta { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 30px; opacity: 0; animation: fadeUp 0.7s 0.7s forwards; }
.hero-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; margin-top: 44px; max-width: 480px; opacity: 0; animation: fadeUp 0.7s 0.85s forwards; }
.stat-n { font-family: 'Syne', sans-serif; font-size: 2.4rem; font-weight: 900; color: var(--white); line-height: 1; letter-spacing: -0.02em; }
.stat-l { font-family: 'Space Mono', monospace; font-size: 0.56rem; color: var(--muted); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 8px; }

/* ============ BUTTONS ============ */
.btn-p { padding: 12px 24px; background: var(--accent); color: var(--base); border: none; cursor: pointer; font-family: 'Space Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; text-decoration: none; display: inline-block; border-radius: 7px; transition: transform 0.2s, background 0.2s, box-shadow 0.2s; }
.btn-p:hover { background: var(--accent-bright); transform: translateY(-2px); box-shadow: 0 8px 22px var(--glow); }
[data-theme="light"] .btn-p { color: #FFFFFF; }
[data-theme="light"] .btn-p:hover { color: #FFFFFF; }
.btn-p:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.btn-o { padding: 12px 22px; background: transparent; color: var(--soft); border: 1px solid var(--line); cursor: pointer; font-family: 'Space Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; display: inline-block; border-radius: 7px; transition: all 0.25s; }
.btn-o:hover { border-color: var(--accent); color: var(--accent-bright); transform: translateY(-2px); }

/* ============ PHOTO FRAME ============ */
.photo-frame { position: relative; width: 340px; max-width: 100%; transform: rotate(2.5deg); }
.pfi { position: relative; z-index: 1; overflow: hidden; background: var(--surface); aspect-ratio: 3/4; display: flex; align-items: center; justify-content: center; border: 1px solid var(--line); border-radius: 4px; }
.pfi img { width: 100%; height: 100%; object-fit: cover; object-position: center 8%; display: block; filter: contrast(1.04) saturate(0.9); transition: transform 0.5s; }
.photo-frame:hover .pfi img { transform: scale(1.04); }
.pfi::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 55%, rgba(15,21,17,0.4) 100%); pointer-events: none; }
[data-theme="light"] .pfi::after { background: linear-gradient(to bottom, transparent 65%, rgba(30,38,32,0.15) 100%); }

/* Light mode: printed-photo matte treatment */
[data-theme="light"] .pfi {
  background: #FAFBF7;
  border: 1px solid #D8DFD2;
  padding: 8px 8px 40px;  /* extra bottom padding = polaroid feel */
  box-shadow: 0 8px 24px rgba(30,38,32,0.08), 0 2px 4px rgba(30,38,32,0.04);
  aspect-ratio: auto;
  height: 440px;
}
[data-theme="light"] .pfi img {
  border-radius: 2px;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.02) saturate(0.95);
}
[data-theme="light"] .pfi::after {
  background: none;  /* no gradient overlay on light — photo already reads clean */
}

.pc { position: absolute; width: 26px; height: 26px; border: 2px solid var(--accent); z-index: 3; }
.pc.tl { top: -6px; left: -6px; border-right: none; border-bottom: none; }
.pc.tr { top: -6px; right: -6px; border-left: none; border-bottom: none; }
.pc.bl { bottom: -6px; left: -6px; border-right: none; border-top: none; }
.pc.br { bottom: -6px; right: -6px; border-left: none; border-top: none; }

[data-theme="light"] .pc {
  opacity: 0.75;
  border-width: 1.5px;
}


/* CLEAN LOCATION TAG — angled clip like old cyberpunk, ember filled, sits at bottom-left */
.pbadge {
  position: absolute;
  bottom: -14px;
  left: -14px;
  z-index: 4;
  background: var(--ember);
  color: var(--ember-ink);
  padding: 8px 16px 8px 14px;
  font-family: 'Space Mono', monospace;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transform: rotate(-2.5deg); /* counter-rotate against the frame so it reads level */
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
  box-shadow: 0 6px 18px rgba(0,0,0,0.35);
  white-space: nowrap;
}
.pbadge-pin { font-size: 0.7rem; }

/* ============ SECTIONS ============ */
.sw { max-width: 1200px; margin: 0 auto; padding: 60px 4%; }
.section { position: relative; z-index: 1; }
.section--alt { background: var(--base-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.sl { display: flex; align-items: center; gap: 14px; margin-bottom: 42px; }
.sl-t { font-family: 'Space Mono', monospace; font-size: 0.64rem; color: var(--accent); letter-spacing: 0.15em; text-transform: uppercase; white-space: nowrap; }
.sl-l { flex: 1; height: 1px; background: linear-gradient(to right, var(--line), transparent); }
.section-title { font-family: 'Syne', sans-serif; font-size: 1.9rem; font-weight: 800; color: var(--white); margin-bottom: 14px; line-height: 1.15; }
.body { color: var(--soft); font-size: 1rem; line-height: 1.8; margin-bottom: 14px; }
.body strong { color: var(--white); font-weight: 600; }

.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s, transform 0.7s; }
.reveal.visible { opacity: 1; transform: translateY(0); }

.card { background: var(--surface); border: 1px solid var(--line); padding: 26px; border-radius: 6px; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; }
.card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 12px 40px var(--shadow-strong); }

/* ============ ABOUT ============ */
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
@media (max-width: 700px) { .about-grid { grid-template-columns: 1fr; } }
.about-cards { display: flex; flex-direction: column; gap: 14px; }
.info-card { background: var(--surface); border: 1px solid var(--line); padding: 20px; border-radius: 6px; }
.card-label { font-family: 'Space Mono', monospace; font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 12px; color: var(--accent); }
.contact-list { display: flex; flex-direction: column; gap: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.76rem; color: var(--soft); }
.contact-list .ic { display: inline-block; width: 18px; color: var(--accent); }
.contact-list a { color: var(--accent-bright); text-decoration: none; }
.contact-list a:hover { text-decoration: underline; }
.edu-list { display: flex; flex-direction: column; gap: 12px; }
.edu-degree { font-size: 0.88rem; font-weight: 600; color: var(--white); }
.edu-meta { font-family: 'Space Mono', monospace; font-size: 0.6rem; color: var(--muted); margin-top: 3px; }
.edu-detail { font-family: 'Space Mono', monospace; font-size: 0.56rem; color: var(--muted); margin-top: 3px; opacity: 0.75; }

/* ============ EXPERIENCE ============ */
.exp-list { display: flex; flex-direction: column; gap: 20px; }
.exp-card { border-left: 3px solid var(--accent); padding: 24px 28px; }
.exp-card.tone-ember { border-left-color: var(--ember); }
.exp-card.tone-bright { border-left-color: var(--accent-bright); }
.exp-card.tone-soft { border-left-color: var(--soft); }
.exp-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
.exp-header-left { display: flex; align-items: center; gap: 16px; }
.exp-icon { width: 44px; height: 44px; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: rgba(127,168,138,0.08); border: 1px solid var(--line); color: var(--accent); font-size: 1.2rem; }
[data-theme="light"] .exp-icon { background: rgba(74,119,88,0.08); }
.exp-card.tone-ember .exp-icon { background: rgba(200,155,106,0.10); color: var(--ember); border-color: rgba(200,155,106,0.3); }
[data-theme="light"] .exp-card.tone-ember .exp-icon { background: rgba(181,127,66,0.12); border-color: rgba(181,127,66,0.35); }
.exp-role { font-family: 'Syne', sans-serif; font-size: 1.2rem; font-weight: 800; color: var(--white); margin-bottom: 4px; }
.exp-company { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: var(--accent-bright); }
.exp-card.tone-ember .exp-company { color: var(--ember); }
.exp-right { text-align: right; display: flex; flex-direction: column; gap: 6px; align-items: flex-end; }
.exp-period-badge { font-family: 'Space Mono', monospace; font-size: 0.62rem; padding: 5px 12px; border-radius: 999px; background: rgba(127,168,138,0.08); border: 1px solid var(--line); color: var(--accent-bright); white-space: nowrap; }
[data-theme="light"] .exp-period-badge { background: rgba(74,119,88,0.08); }
.exp-card.tone-ember .exp-period-badge { background: rgba(200,155,106,0.10); border-color: rgba(200,155,106,0.3); color: var(--ember); }
.exp-loc { font-family: 'Space Mono', monospace; font-size: 0.6rem; color: var(--muted); }
.exp-bullets-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; }
@media (max-width: 700px) { .exp-bullets-grid { grid-template-columns: 1fr; } }
.exp-bullet-item { display: flex; gap: 10px; font-size: 0.88rem; color: var(--soft); line-height: 1.6; align-items: flex-start; }
.exp-bullet-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); flex-shrink: 0; margin-top: 8px; }
.exp-card.tone-ember .exp-bullet-dot { background: var(--ember); }

/* ============ GITHUB ============ */
.gh-wrap { position: relative; overflow: hidden; }
.gh-wrap::before { content: 'GITHUB_CONTRIBUTIONS'; position: absolute; top: 0.7rem; right: 1.2rem; font-family: 'JetBrains Mono', monospace; font-size: 0.56rem; color: var(--muted); opacity: 0.5; letter-spacing: 2px; }
.gh-user-row { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; }
.gh-dot { width: 8px; height: 8px; background: var(--accent-bright); border-radius: 50%; animation: gpulse 2s ease-in-out infinite; flex-shrink: 0; }
.gh-uname { font-family: 'JetBrains Mono', monospace; font-size: 0.88rem; color: var(--accent-bright); }
.gh-note { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--muted); font-style: italic; }
.cg { display: flex; gap: 3px; overflow-x: auto; padding-bottom: 6px; }
.cw { display: flex; flex-direction: column; gap: 3px; }
.cd { width: 12px; height: 12px; border-radius: 2px; cursor: default; transition: transform 0.15s; flex-shrink: 0; }
.cd:hover { transform: scale(1.7); z-index: 5; }
[data-theme="dark"] .cd-level-0 { background: rgba(127,168,138,0.05); }
[data-theme="dark"] .cd-level-1 { background: rgba(127,168,138,0.22); }
[data-theme="dark"] .cd-level-2 { background: rgba(127,168,138,0.42); }
[data-theme="dark"] .cd-level-3 { background: rgba(127,168,138,0.68); }
[data-theme="dark"] .cd-level-4 { background: #9BC5A6; }
[data-theme="light"] .cd-level-0 { background: rgba(74,119,88,0.10); }
[data-theme="light"] .cd-level-1 { background: rgba(74,119,88,0.28); }
[data-theme="light"] .cd-level-2 { background: rgba(74,119,88,0.50); }
[data-theme="light"] .cd-level-3 { background: rgba(74,119,88,0.75); }
[data-theme="light"] .cd-level-4 { background: #4A7758; }
.cleg { display: flex; align-items: center; gap: 5px; margin-top: 10px; justify-content: flex-end; font-family: 'JetBrains Mono', monospace; font-size: 0.64rem; color: var(--muted); }
.gh-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 16px; }
.gmc { background: rgba(127,168,138,0.04); border: 1px solid var(--line); padding: 14px; text-align: center; border-radius: 6px; }
[data-theme="light"] .gmc { background: rgba(74,119,88,0.05); }
.gmn { font-family: 'Syne', sans-serif; font-size: 1.9rem; font-weight: 800; color: var(--accent-bright); }
.gml { font-family: 'Space Mono', monospace; font-size: 0.56rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; }

/* ============ SKILLS ============ */
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; margin-bottom: 20px; }
.skill-cat { font-family: 'Space Mono', monospace; font-size: 0.62rem; color: var(--accent); letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
.card.tone-ember .skill-cat { color: var(--ember); }
.card.tone-bright .skill-cat { color: var(--accent-bright); }
.card.tone-soft .skill-cat { color: var(--soft); }
.skill-cat-icon { font-size: 0.9rem; }
.skill-icons-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(64px, 1fr)); gap: 12px; margin-top: 8px; }
.skill-icon-item { display: flex; flex-direction: column; align-items: center; gap: 5px; cursor: default; transition: transform 0.2s; }
.skill-icon-item:hover { transform: translateY(-3px); }
.skill-icon-img { width: 36px; height: 36px; object-fit: contain; filter: brightness(0.85) saturate(0.55); background: rgba(127,168,138,0.05); border-radius: 6px; padding: 3px; transition: filter 0.2s; }
[data-theme="light"] .skill-icon-img { filter: brightness(0.95) saturate(0.85); background: rgba(74,119,88,0.05); }
.skill-icon-item:hover .skill-icon-img { filter: brightness(1.05) saturate(0.85); }
.skill-icon-fallback { width: 36px; height: 36px; border: 1px solid var(--line); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-family: 'Space Mono', monospace; font-size: 0.58rem; color: var(--accent); background: rgba(127,168,138,0.05); font-weight: 700; }
[data-theme="light"] .skill-icon-fallback { background: rgba(74,119,88,0.05); }
.card.tone-ember .skill-icon-fallback { color: var(--ember); border-color: rgba(200,155,106,0.3); }
.skill-icon-label { font-family: 'Space Mono', monospace; font-size: 0.52rem; color: var(--muted); text-align: center; line-height: 1.2; letter-spacing: 0.04em; max-width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.skill-icon-item:hover .skill-icon-label { color: var(--accent-bright); }
.levelling-box { margin-top: 18px; padding: 16px 20px; background: var(--surface); border: 1px dashed var(--line); border-radius: 6px; font-family: 'Space Mono', monospace; font-size: 0.64rem; }
.lb-label { color: var(--muted); }
.lb-content { color: var(--accent-bright); }

/* ============ PROJECTS ============ */
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }
@media (max-width: 600px) { .projects-grid { grid-template-columns: 1fr; } }
.pcard { display: flex; flex-direction: column; cursor: default; overflow: hidden; padding: 0; }
.pstrip { height: 180px; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; background: var(--surface-raised); border-bottom: 1px solid var(--line); }
[data-theme="dark"] .pstrip { background: var(--surface-raised); }
.pstrip-preview { width: 100%; height: 100%; object-fit: cover; object-position: top center; transition: transform 0.4s, filter 0.3s; filter: brightness(0.75) saturate(0.7); }
[data-theme="light"] .pstrip-preview { filter: brightness(0.95) saturate(0.85); }
.pcard:hover .pstrip-preview { transform: scale(1.03); filter: brightness(0.55) saturate(0.7); }
[data-theme="light"] .pcard:hover .pstrip-preview { filter: brightness(0.75) saturate(0.85); }
.pstrip-icon { font-size: 2.6rem; color: var(--accent); transition: transform 0.3s; }
.pcard:hover .pstrip-icon { transform: translateY(-4px); color: var(--accent-bright); }
.pstrip-overlay { position: absolute; inset: 0; background: rgba(12,17,14,0.78); display: flex; align-items: center; justify-content: center; gap: 14px; opacity: 0; transition: opacity 0.25s ease; backdrop-filter: blur(3px); }
[data-theme="light"] .pstrip-overlay { background: rgba(30,38,32,0.68); }
.pstrip-overlay--visible { opacity: 1; }
.pstrip-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; width: 62px; height: 62px; border-radius: 50%; background: rgba(127,168,138,0.10); border: 1px solid var(--line); color: #E4EDE6; font-size: 1.1rem; text-decoration: none; cursor: pointer; transition: all 0.2s; }
.pstrip-btn:hover { background: rgba(127,168,138,0.22); border-color: var(--accent); color: var(--accent-bright); transform: translateY(-3px); }
.pstrip-btn--case { background: rgba(200,155,106,0.10); border-color: rgba(200,155,106,0.3); color: var(--ember); }
.pstrip-btn--case:hover { background: rgba(200,155,106,0.20); border-color: var(--ember); color: var(--ember); }
.pstrip-btn--disabled { opacity: 0.35; cursor: not-allowed; }
.pstrip-btn--disabled:hover { background: rgba(127,168,138,0.10); border-color: var(--line); color: #E4EDE6; transform: none; }
.pstrip-btn-label { font-family: 'Space Mono', monospace; font-size: 0.46rem; letter-spacing: 0.08em; text-transform: uppercase; }
.pcard-body { padding: 20px 22px 20px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.pcard-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
.ptitle { font-family: 'Syne', sans-serif; font-size: 1.15rem; font-weight: 800; color: var(--white); }
.pstat { font-family: 'Space Mono', monospace; font-size: 0.54rem; padding: 3px 9px; border-radius: 999px; white-space: nowrap; }
.pstat-live { background: rgba(127,168,138,0.10); border: 1px solid var(--accent); color: var(--accent-bright); }
[data-theme="light"] .pstat-live { background: rgba(74,119,88,0.12); }
.pstat-building { background: rgba(200,155,106,0.10); border: 1px solid var(--ember); color: var(--ember); }
.pstat-planned { background: rgba(168,196,176,0.05); border: 1px solid var(--line); color: var(--muted); }
.pdesc { font-size: 0.86rem; color: var(--soft); line-height: 1.65; flex: 1; }
.ptags { display: flex; flex-wrap: wrap; gap: 5px; }
.ptag { font-family: 'Space Mono', monospace; font-size: 0.58rem; padding: 3px 8px; background: rgba(127,168,138,0.05); border: 1px solid var(--line); color: var(--muted); border-radius: 4px; }
[data-theme="light"] .ptag { background: rgba(74,119,88,0.06); }

/* ============ ARTICLES ============ */
.art-head { display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; }
.art-head-lede { margin-bottom: 0; }
.art-medium-link { font-family: 'Space Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-bright); text-decoration: none; padding: 10px 18px; border: 1px solid var(--line); border-radius: 7px; transition: all 0.2s; white-space: nowrap; }
.art-medium-link:hover { border-color: var(--accent); background: rgba(127,168,138,0.06); transform: translateY(-2px); }
[data-theme="light"] .art-medium-link:hover { background: rgba(74,119,88,0.08); }

/* clean list layout for articles */
.art-list { list-style: none; display: flex; flex-direction: column; gap: 0; border-top: 1px solid var(--line); }
.art-list-item { border-bottom: 1px solid var(--line); }
.art-list-link {
  display: flex; align-items: center; justify-content: space-between;
  gap: 20px; padding: 22px 4px;
  text-decoration: none; color: inherit;
  transition: padding 0.25s ease;
}
.art-list-link:hover { padding-left: 14px; padding-right: 14px; background: rgba(127,168,138,0.03); }
[data-theme="light"] .art-list-link:hover { background: rgba(74,119,88,0.04); }
.art-list-main { display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 0; }
.art-list-tag { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; }
.art-list-title { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 700; color: var(--white); line-height: 1.3; }
.art-list-meta { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
.art-list-read { font-family: 'Space Mono', monospace; font-size: 0.6rem; color: var(--muted); }
.art-list-arrow { font-family: 'Space Mono', monospace; font-size: 0.9rem; color: var(--accent-bright); transition: transform 0.2s; }
.art-list-link:hover .art-list-arrow { transform: translate(2px, -2px); }

/* ============ CREDITS ============ */
.cr-card { border-color: rgba(200,155,106,0.35); }
.cr-card:hover { border-color: rgba(200,155,106,0.6); }
.credits-inner { display: flex; gap: 28px; flex-wrap: wrap; align-items: center; }
.credits-icon { font-size: 3rem; color: var(--ember); }
.credits-title { font-family: 'Syne', sans-serif; font-size: 1.15rem; font-weight: 700; color: var(--white); margin-bottom: 10px; }
.credits-badges { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }
.credits-link { padding: 8px 16px; background: rgba(200,155,106,0.1); border: 1px solid var(--ember); color: var(--ember); font-family: 'Space Mono', monospace; font-size: 0.66rem; text-decoration: none; letter-spacing: 0.08em; display: inline-block; transition: all 0.2s; border-radius: 4px; text-transform: uppercase; }
.credits-link:hover { background: rgba(200,155,106,0.2); }
.credits-badge { padding: 8px 13px; font-family: 'Space Mono', monospace; font-size: 0.62rem; background: rgba(127,168,138,0.06); border: 1px solid var(--line); color: var(--accent-bright); border-radius: 4px; }
[data-theme="light"] .credits-badge { background: rgba(74,119,88,0.08); }

/* ============ CONTACT ============ */
.contact-heading { font-family: 'Syne', sans-serif; font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; color: var(--white); line-height: 1.1; margin-bottom: 14px; }
.contact-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 3rem; }
.ccard { background: var(--surface); border: 1px solid var(--line); padding: 22px; text-decoration: none; display: block; transition: all 0.3s; text-align: center; border-radius: 6px; }
.ccard:hover { border-color: var(--accent); transform: translateY(-3px); }
.ci { font-size: 1.6rem; margin-bottom: 8px; display: block; color: var(--accent); }
.clb { font-family: 'Space Mono', monospace; font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent-bright); }
.cv { color: var(--muted); font-size: 0.78rem; margin-top: 4px; font-family: 'Space Mono', monospace; }
.form-divider { font-family: 'Space Mono', monospace; font-size: 0.62rem; color: var(--muted); text-align: center; margin-bottom: 2rem; letter-spacing: 0.14em; text-transform: uppercase; }
.contact-form-wrap { max-width: 560px; margin: 0 auto; text-align: left; }
.contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-label { font-family: 'Space Mono', monospace; font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.form-input { background: var(--surface); border: 1px solid var(--line); padding: 0.8rem 1rem; color: var(--white); font-size: 0.92rem; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s; outline: none; border-radius: 5px; }
[data-theme="light"] .form-input { background: var(--surface-raised); }
.form-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--form-glow); }
.form-input--error { border-color: var(--ember); }
.form-textarea { resize: vertical; min-height: 130px; }
.field-error { font-family: 'Space Mono', monospace; font-size: 0.62rem; color: var(--ember); margin-top: 0.2rem; }
.submit-btn { align-self: flex-start; margin-top: 0.5rem; }
.form-success { background: rgba(127,168,138,0.08); border: 1px solid var(--accent); padding: 1.25rem; color: var(--accent-bright); font-family: 'Space Mono', monospace; font-size: 0.82rem; margin-top: 1.5rem; border-radius: 6px; }
[data-theme="light"] .form-success { background: rgba(74,119,88,0.10); }

/* ============ FOOTER ============ */
.footer { border-top: 1px solid var(--line); padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; font-family: 'Space Mono', monospace; font-size: 0.6rem; color: var(--muted); position: relative; z-index: 1; }

/* ============ CASE STUDY PAGE ============ */
.cs-page { position: relative; z-index: 1; padding-top: 60px; }

/* Hero */
.cs-hero { padding: 60px 4% 40px; }
.cs-hero-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 60px; align-items: center; }
@media (max-width: 900px) { .cs-hero-inner { grid-template-columns: 1fr; gap: 40px; } }
.cs-eyebrow { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: var(--accent); letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 20px; }
.cs-title { font-family: 'Syne', sans-serif; font-size: clamp(2.6rem, 6vw, 4.2rem); font-weight: 900; color: var(--white); line-height: 0.95; margin-bottom: 24px; letter-spacing: -0.02em; }
.cs-tagline { font-family: 'DM Sans', sans-serif; font-size: clamp(1rem, 1.4vw, 1.15rem); color: var(--soft); line-height: 1.6; margin-bottom: 24px; max-width: 34rem; font-weight: 400; }
.cs-status { display: inline-flex; align-items: center; gap: 9px; padding: 8px 18px; border-radius: 999px; margin-bottom: 30px; font-family: 'Space Mono', monospace; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
.cs-status--shipped { background: rgba(127,168,138,0.14); border: 1px solid var(--accent); color: var(--accent-bright); }
[data-theme="light"] .cs-status--shipped { background: rgba(74,119,88,0.14); color: var(--accent); }
.cs-status--building { background: rgba(200,155,106,0.12); border: 1px solid var(--ember); color: var(--ember); }
.cs-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: gpulse 2s ease-in-out infinite; }

.cs-hero-visual { display: flex; justify-content: center; }
.cs-hero-img { max-width: 100%; width: 100%; border-radius: 8px; border: 1px solid var(--line); box-shadow: 0 12px 40px var(--shadow-strong); }

/* Sections */
.cs-section { padding: 60px 4%; position: relative; }
.cs-section--alt { background: var(--base-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.cs-wrap-inner { max-width: 900px; margin: 0 auto; }
.cs-section-label { font-family: 'Space Mono', monospace; font-size: 0.66rem; color: var(--accent); letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 26px; padding-bottom: 12px; border-bottom: 1px solid var(--line); }
.cs-prose { font-family: 'DM Sans', sans-serif; font-size: 1.02rem; color: var(--soft); line-height: 1.8; margin-bottom: 20px; max-width: 42rem; }
.cs-prose--emphasis { color: var(--white); font-weight: 500; padding-left: 18px; border-left: 2px solid var(--accent); margin-top: 24px; font-style: italic; }
.cs-prose--emphasis::before { content: ''; }

/* In-progress banner */
.cs-progress-banner { display: flex; gap: 20px; align-items: flex-start; padding: 22px 26px; background: rgba(200,155,106,0.08); border: 1px solid rgba(200,155,106,0.4); border-radius: 8px; }
[data-theme="light"] .cs-progress-banner { background: rgba(181,127,66,0.08); }
.cs-progress-icon { font-size: 1.8rem; color: var(--ember); flex-shrink: 0; }
.cs-progress-label { font-family: 'Space Mono', monospace; font-size: 0.66rem; color: var(--ember); letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; margin-bottom: 8px; }
.cs-progress-body { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; color: var(--soft); line-height: 1.65; margin: 0; }

/* Stack chips */
.cs-stack { display: flex; flex-wrap: wrap; gap: 10px; }
.cs-stack-chip { padding: 9px 16px; background: var(--surface); border: 1px solid var(--line); border-radius: 6px; font-family: 'Space Mono', monospace; font-size: 0.72rem; color: var(--accent-bright); letter-spacing: 0.04em; }

/* Decisions */
.cs-decisions { display: flex; flex-direction: column; gap: 30px; }
.cs-decision { padding: 24px 28px; background: var(--surface); border: 1px solid var(--line); border-radius: 8px; border-left: 3px solid var(--accent); }
.cs-decision-title { font-family: 'Syne', sans-serif; font-size: 1.25rem; font-weight: 800; color: var(--white); margin-bottom: 12px; letter-spacing: -0.01em; }
.cs-decision-body { font-family: 'DM Sans', sans-serif; font-size: 0.98rem; color: var(--soft); line-height: 1.75; margin: 0; }

/* Lists */
.cs-list { list-style: none; padding: 0; margin: 20px 0; display: flex; flex-direction: column; gap: 14px; }
.cs-list-item { display: flex; gap: 14px; font-family: 'DM Sans', sans-serif; font-size: 0.98rem; color: var(--soft); line-height: 1.7; align-items: flex-start; }
.cs-list-marker { color: var(--accent); flex-shrink: 0; font-size: 0.85rem; margin-top: 5px; }
.cs-list-marker--ember { color: var(--ember); }

/* Related writing */
.cs-articles { list-style: none; padding: 0; margin: 0; }
.cs-articles li { border-bottom: 1px solid var(--line); }
.cs-articles li:first-child { border-top: 1px solid var(--line); }
.cs-article-link { display: flex; justify-content: space-between; align-items: center; padding: 20px 4px; text-decoration: none; color: inherit; transition: padding 0.25s ease, background 0.2s; }
.cs-article-link:hover { padding-left: 14px; padding-right: 14px; background: rgba(127,168,138,0.03); }
[data-theme="light"] .cs-article-link:hover { background: rgba(74,119,88,0.04); }
.cs-article-title { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 700; color: var(--white); }
.cs-article-arrow { font-family: 'Space Mono', monospace; font-size: 1rem; color: var(--accent-bright); transition: transform 0.2s; }
.cs-article-link:hover .cs-article-arrow { transform: translate(2px, -2px); }

/* Final CTA */
.cs-cta { text-align: center; padding: 20px 0; }
.cs-cta-heading { font-family: 'Syne', sans-serif; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; color: var(--white); margin-bottom: 24px; letter-spacing: -0.01em; }
.cs-cta .cs-links { justify-content: center; }

.cs-links { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 4px; }

/* Legacy stub styles (kept for fallback route) */
.cs-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 100px 4% 60px; position: relative; z-index: 1; }
.cs-inner { max-width: 640px; text-align: center; }
.cs-body { color: var(--soft); font-size: 1rem; line-height: 1.8; margin-bottom: 16px; }

/* ============ MOCK PROJECT PREVIEWS ============ */
.mock-preview { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 16px; background: linear-gradient(160deg, var(--surface-raised), var(--surface)); position: relative; overflow: hidden; }
.mock-preview::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.5; pointer-events: none; }
.mock-dashboard { padding: 12px; }

/* Car Sale mobile mock */
.mock-phone { width: 130px; height: 155px; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 8px 6px; display: flex; flex-direction: column; gap: 6px; position: relative; box-shadow: 0 8px 20px rgba(0,0,0,0.35); z-index: 1; }
[data-theme="light"] .mock-phone { background: #FFFFFF; box-shadow: 0 8px 20px rgba(30,38,32,0.12); }
.mock-phone-notch { position: absolute; top: 3px; left: 50%; transform: translateX(-50%); width: 28px; height: 3px; background: var(--line); border-radius: 999px; }
.mock-phone-header { display: flex; justify-content: space-between; align-items: center; padding: 4px 4px 2px; margin-top: 4px; }
.mock-phone-title { font-family: 'Space Mono', monospace; font-size: 0.42rem; color: var(--white); font-weight: 700; }
.mock-phone-icon { font-size: 0.5rem; color: var(--accent); }
.mock-phone-listing { display: flex; gap: 5px; padding: 4px; background: rgba(127,168,138,0.06); border-radius: 4px; }
[data-theme="light"] .mock-phone-listing { background: rgba(74,119,88,0.08); }
.mock-phone-listing-img { width: 22px; height: 22px; background: linear-gradient(135deg, var(--accent) 0%, var(--muted) 100%); border-radius: 3px; flex-shrink: 0; opacity: 0.6; }
.mock-phone-listing-body { flex: 1; display: flex; flex-direction: column; gap: 2px; justify-content: center; }
.mock-phone-listing-title { height: 3px; background: var(--soft); border-radius: 2px; width: 70%; opacity: 0.55; }
.mock-phone-listing-sub { height: 2.5px; background: var(--muted); border-radius: 2px; width: 45%; opacity: 0.4; }
.mock-phone-listing-price { font-family: 'Space Mono', monospace; font-size: 0.42rem; color: var(--accent-bright); font-weight: 700; margin-top: 1px; }
.mock-phone-tabs { display: flex; justify-content: space-around; margin-top: auto; padding-top: 5px; border-top: 1px solid var(--line); }
.mock-tab { font-family: 'Space Mono', monospace; font-size: 0.36rem; color: var(--muted); letter-spacing: 0.05em; text-transform: uppercase; }
.mock-tab.active { color: var(--accent); }

/* Medical Agency dashboard mock */
.mock-dashboard { display: flex; gap: 6px; align-items: stretch; z-index: 1; }
.mock-dash-sidebar { width: 60px; background: var(--surface); border: 1px solid var(--line); border-radius: 5px; padding: 8px 5px; display: flex; flex-direction: column; gap: 4px; z-index: 1; }
[data-theme="light"] .mock-dash-sidebar { background: #FFFFFF; }
.mock-dash-brand { font-family: 'Space Mono', monospace; font-size: 0.42rem; color: var(--accent); font-weight: 700; letter-spacing: 0.05em; margin-bottom: 4px; }
.mock-dash-nav-item { font-family: 'Space Mono', monospace; font-size: 0.4rem; color: var(--muted); padding: 3px 4px; border-radius: 2px; }
.mock-dash-nav-item.active { background: rgba(127,168,138,0.15); color: var(--accent-bright); }
[data-theme="light"] .mock-dash-nav-item.active { background: rgba(74,119,88,0.15); }
.mock-dash-main { flex: 1; background: var(--surface); border: 1px solid var(--line); border-radius: 5px; padding: 8px 10px; display: flex; flex-direction: column; gap: 5px; z-index: 1; }
[data-theme="light"] .mock-dash-main { background: #FFFFFF; }
.mock-dash-header { font-family: 'Space Mono', monospace; font-size: 0.48rem; color: var(--white); font-weight: 700; display: flex; align-items: center; gap: 6px; margin-bottom: 3px; }
.mock-dash-badge { font-size: 0.38rem; background: var(--accent); color: var(--base); padding: 1px 5px; border-radius: 999px; font-weight: 700; }
.mock-dash-row { display: flex; justify-content: space-between; gap: 4px; padding: 4px 5px; background: rgba(127,168,138,0.05); border-radius: 3px; align-items: center; }
[data-theme="light"] .mock-dash-row { background: rgba(74,119,88,0.06); }
.mock-dash-cell { font-family: 'Space Mono', monospace; font-size: 0.4rem; color: var(--soft); }
.mock-dash-status { font-family: 'Space Mono', monospace; font-size: 0.36rem; color: var(--accent-bright); padding: 1px 5px; background: rgba(127,168,138,0.12); border-radius: 999px; text-transform: uppercase; letter-spacing: 0.04em; }
.mock-dash-status.pending { color: var(--ember); background: rgba(200,155,106,0.15); }

/* ============ CREDITS TITLES (real game names) ============ */
.credits-titles { margin-top: 16px; margin-bottom: 6px; }
.credits-titles-label { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
.credits-titles-list { display: flex; gap: 10px; flex-wrap: wrap; }
.credits-title-chip { padding: 8px 14px; background: rgba(200,155,106,0.10); border: 1px solid rgba(200,155,106,0.4); color: var(--ember); font-family: 'Syne', sans-serif; font-size: 0.9rem; font-weight: 700; border-radius: 4px; letter-spacing: -0.01em; }
[data-theme="light"] .credits-title-chip { background: rgba(181,127,66,0.10); }

/* animations */
@keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
`;