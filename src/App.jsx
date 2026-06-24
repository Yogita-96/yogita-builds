import { useState, useEffect, useRef, useCallback } from "react";
import taskquestPreview from './assets/taskquest-preview.png'
import theBetweenPreview from './assets/the-between-preview.png'

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Game Credits", href: "#credits" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  {
    cat: "Frontend", color: "#00e5ff", icon: "⚡",
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
    cat: "Mobile", color: "#ff2d78", icon: "📱",
    items: [
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
      { name: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { name: "iOS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" },
    ],
  },
  {
    cat: "Languages", color: "#ffe600", icon: "💻",
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
    cat: "Tools & Infra", color: "#bf00ff", icon: "🔧",
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
    cat: "Cloud & DevOps", color: "#39ff14", icon: "☁️",
    items: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    ],
  },
  {
    cat: "Testing & QA", color: "#ff6b35", icon: "🔬",
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
    color: "#ff6b35",
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
    color: "#ffe600",
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
    color: "#bf00ff",
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
    color: "#00e5ff",
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
    title: "TaskQuest",
    icon: "⚔️",
    accentColor: "#bf00ff",
    bg: "linear-gradient(135deg,#1a0d2e,#0d1427)",
    preview: "taskquest",
    description: "A gamified task manager built in React where to-dos become quests, completing tasks earns XP, and streaks level up your character. QA-tested edge cases throughout.",
    tech: ["React", "Custom Hooks", "localStorage", "CSS Animations"],
    status: "live",
    github: "https://github.com/Yogita-96/taskquest",
    live: "https://taskquest-three.vercel.app/",
  },
  {
    title: "The Between",
    icon: "🎮",
    accentColor: "#c8a030",
    bg: "linear-gradient(135deg,#1a1205,#06080f)",
    preview: "thebetween",
    description: "A turn-based dark fantasy RPG built entirely in React — original world, original characters, original lore. No game engine. Just state management taken seriously.",
    tech: ["React", "useReducer", "CSS3", "Vite"],
    status: "building",
    github: "https://github.com/Yogita-96/the-between",
    live: "https://the-between-navy.vercel.app",
  },
  {
    title: "Car Sale Mobile App",
    icon: "🚗",
    accentColor: "#ffe600",
    bg: "linear-gradient(135deg,#1a1a0d,#1a100d)",
    preview: null,
    description: "Real client project — a Flutter app for a car dealership with Google/Facebook/Gmail social login, live car listings, and a Firebase real-time backend. Shipped to production.",
    tech: ["Flutter", "Dart", "Firebase", "Google APIs"],
    status: "live",
    github: "https://github.com/adinashby-vanier-college/app-dev-2-project-Gurpreet0112",
    live: null,
  },
  {
    title: "Medical Agency Web App",
    icon: "🏥",
    accentColor: "#ff2d78",
    bg: "linear-gradient(135deg,#0d1a1a,#150d1a)",
    preview: null,
    description: "B2B web application for a pharmaceutical company handling drug distribution from manufacturers to pharmacies. Full CRUD, user roles, built with ASP.NET and C#.",
    tech: ["ASP.NET", "C#", "SQL Server"],
    status: "live",
    github: "#",
    live: null,
  },
];

const DEFAULT_ARTICLES = [
  { url: "https://medium.com/@yogita27496/beginners-guide-to-game-development-unity-or-unreal-engine-3f3eb6b7e8e6", title: "Beginner's Guide to Game Development: Unity or Unreal Engine?", tag: "Career", excerpt: "Game development is an exciting journey, and choosing the right engine is a crucial first step.", date: "2025", readTime: "3 min read" },
  { url: "https://medium.com/@yogita27496/what-game-qa-taught-me-about-writing-better-software-f4fd96cbe02b", title: "What Game QA Taught Me About Writing Better Software", tag: "Career", excerpt: "As a frontend developer with a background in game FQA, I've found that the two fields have more in common than most people expect.", date: "2026", readTime: "4 min read" },
  { url: "https://medium.com/@yogita27496/7-qa-mindsets-every-frontend-developer-should-learn-ff84a42d664f", title: "7 QA Mindsets Every Frontend Developer Should Learn", tag: "QA", excerpt: "", date: "2026", readTime: "5 min read" },
];

const TYPEWRITER_LINES = [
  "React Developer  ·  QA Veteran  ·  Game Credits on MobyGames",
  "Building pixel-perfect UIs  ·  Shipping real products",
  "React Native  ·  Redux  ·  ASP.NET  ·  Flutter  ·  AWS",
  "I build UIs.  I break UIs.  I fix UIs.",
];

const STATUS_STYLES = {
  live:     { bg: "rgba(0,229,255,0.13)", border: "#00e5ff", color: "#00e5ff", label: "● Live" },
  building: { bg: "rgba(255,179,0,0.13)", border: "#ffb300", color: "#ffb300", label: "⟳ Building" },
  planned:  { bg: "rgba(255,255,255,0.05)", border: "#555", color: "#555", label: "◌ Planned" },
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqzgewd";

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useTypewriter(lines, speed = 42, deleteSpeed = 18, pause = 2000) {
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
      setDeleting(false);
      setLineIdx(i => (i + 1) % lines.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, lineIdx, lines, speed, deleteSpeed, pause]);

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

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const COLORS = ["#00e5ff", "#ff2d78", "#bf00ff", "#39ff14", "#ffe600"];
    const pts = Array.from({ length: 65 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 1.7 + 0.4,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      a: Math.random() * 0.45 + 0.12,
    }));

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + Math.floor(p.a * 255).toString(16).padStart(2, "0");
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,229,255,${0.05 * (1 - d / 110)})`;
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

// ─── PHOTO FRAME ─────────────────────────────────────────────────────────────

function PhotoFrame({ src, onUpload }) {
  const inputRef = useRef(null);

  return (
    <div className="photo-frame" role="img" aria-label="Yogita profile photo">
      <div className="pfb" aria-hidden="true" />
      <div className="pfi">
        {src ? (
          <img src={src} alt="Yogita" />
        ) : (
          <div className="photo-avatar">
            <div className="avatar-circle">Y</div>
            <div className="avatar-name">YOGITA</div>
            <div className="avatar-role">REACT DEVELOPER</div>
            <button
              className="avatar-upload-btn"
              onClick={() => inputRef.current?.click()}
              aria-label="Upload profile photo"
            >
              ↑ Upload photo
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              aria-label="Choose profile photo file"
              onChange={e => {
                const file = e.target.files[0];
                if (file) onUpload(URL.createObjectURL(file));
              }}
            />
          </div>
        )}
        {src && (
          <button
            className="photo-change-btn"
            onClick={() => inputRef.current?.click()}
            aria-label="Change profile photo"
          >
            Change photo
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={e => {
                const file = e.target.files[0];
                if (file) onUpload(URL.createObjectURL(file));
              }}
            />
          </button>
        )}
      </div>
      <div className="pbadge" aria-label="Location: Ontario, Canada">📍 Ontario, CA</div>
      <div className="pc tl" aria-hidden="true" />
      <div className="pc tr" aria-hidden="true" />
      <div className="pc bl" aria-hidden="true" />
      <div className="pc br" aria-hidden="true" />
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav({ activeSection }) {
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
        Yogita<span className="logo-dot">.builds</span>
      </a>
      <button
        className="nav-hamburger"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(v => !v)}
      >
        <span /><span /><span />
      </button>
      <ul className={`nav-links${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className={`nav-link${activeSection === href.replace("#", "") ? " active" : ""}`}
              onClick={e => scrollTo(e, href)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero({ photo, onPhotoUpload }) {
  const text = useTypewriter(TYPEWRITER_LINES);
  const heroRef = useRef(null);
  useCountUp(heroRef, [
    { id: "s1", target: 3, suffix: "+" },
    { id: "s2", target: 8, suffix: "+" },
    { id: "s3", target: 2, suffix: "+" },
    { id: "s4", target: 22, suffix: "+" },
  ]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="hero" ref={heroRef} aria-label="Introduction">
      <div className="hero-grid">
        <div className="hero-left">
          <div className="status-dot" role="status" aria-label="Available for work in Ontario and Remote">
            Available for work · Ontario &amp; Remote
          </div>
          <div className="hero-eyebrow">{'// React Developer & QA Engineer'}</div>
          <h1 className="hero-name">
            Yogita
            <span className="hero-name-accent"> builds.</span>
          </h1>
          <p className="hero-tagline" aria-live="polite" aria-atomic="true">
            {text}<span className="typed-cursor" aria-hidden="true"> </span>
          </p>
          <p className="hero-desc">
            Frontend developer with React expertise, AAA game QA credentials (Ubisoft &amp; Bandai Namco),
            and a passion for pixel-perfect UIs. Ontario-based — open to remote &amp; on-site roles across Canada.
          </p>
          <div className="hero-cta">
            <button className="btn-p" onClick={() => scrollTo("projects")}>View Projects →</button>
            <a href="https://github.com/Yogita-96" target="_blank" rel="noopener noreferrer" className="btn-o">GitHub ↗</a>
            <button className="btn-o" onClick={() => scrollTo("contact")}>Get In Touch</button>
          </div>
          <div className="hero-stats">
            <div style={{"--sc":"#00e5ff"}}><div className="stat-n" id="s1">0</div><div className="stat-l">Years React Dev</div></div>
            <div style={{"--sc":"#ff6b35"}}><div className="stat-n" id="s2">0</div><div className="stat-l">AAA Games Tested</div></div>
            <div style={{"--sc":"#bf00ff"}}><div className="stat-n" id="s3">0</div><div className="stat-l">Game Credits</div></div>
            <div style={{"--sc":"#39ff14"}}><div className="stat-n" id="s4">0</div><div className="stat-l">Stack Items</div></div>
          </div>
        </div>
        <div className="hero-right">
          <PhotoFrame src={photo} onUpload={onPhotoUpload} />
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
    <section id="about" className="section section--alt" aria-labelledby="about-heading">
      <div className="sw">
        <SectionLabel number="01" label="About" />
        <div className="about-grid reveal" style={{ transitionDelay: "0.05s" }}>
          <div>
            <h2 id="about-heading" className="section-title">
              Developer. Tester.<br /><span style={{ color: "var(--cyan)" }}>Builder.</span>
            </h2>
            <p className="body">
              I'm a versatile software developer with a strong foundation in{" "}
              <strong>React, JavaScript, and frontend engineering</strong> — backed by a B.Tech
              in Electronics &amp; Communication Engineering and an ACS in Software Development
              from Vanier College, Montreal.
            </p>
            <p className="body">
              My career spans junior React development at DigiiDunia, freelance React Native work,
              a dev internship at GaoTek, and{" "}
              <strong style={{ color: "#ff6b35" }}>professional AAA game QA</strong> via Globalstep
              for Ubisoft &amp; Bandai Namco — credits verifiable on MobyGames.
            </p>
            <p className="body">
              I bring a <strong>developer's precision</strong> and a{" "}
              <strong>tester's eye for quality</strong> to everything I ship.
            </p>
          </div>
          <div className="about-cards">
            <div className="info-card" style={{ borderColor: "rgba(0,229,255,0.14)" }}>
              <div className="card-label" style={{ color: "var(--cyan)" }}>Contact</div>
              <div className="contact-list">
                <div>✉ <a href="mailto:yogitaa.rm@gmail.com">yogitaa.rm@gmail.com</a></div>
                <div>📍 <span>Ontario, Canada</span></div>
                <div>🔗 <a href="https://linkedin.com/in/Yogita-M" target="_blank" rel="noopener noreferrer">linkedin.com/in/Yogita-M</a></div>
                <div>🐙 <a href="https://github.com/Yogita-96" target="_blank" rel="noopener noreferrer">github.com/Yogita-96</a></div>
              </div>
            </div>
            <div className="info-card" style={{ borderColor: "rgba(255,230,0,0.13)" }}>
              <div className="card-label" style={{ color: "#ffe600" }}>Education</div>
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
    <section id="experience" className="section" aria-labelledby="exp-heading">
      <div className="sw">
        <SectionLabel number="02" label="Work Experience" />
        <h2 id="exp-heading" className="sr-only">Work Experience</h2>
        <div className="exp-list">
          {EXPERIENCE.map((job, i) => (
            <article
              key={i}
              className="exp-card card reveal"
              style={{ "--ac": job.color, transitionDelay: `${i * 0.08}s` }}
            >
              <div className="exp-header">
                <div className="exp-header-left">
                  <div className="exp-icon" style={{ background: `${job.color}18`, border: `1px solid ${job.color}44` }}>
                    <span style={{ color: job.color, fontSize: '1.2rem' }}>
                      {i === 0 ? '🎮' : i === 1 ? '⚛' : i === 2 ? '💻' : '🌐'}
                    </span>
                  </div>
                  <div>
                    <h3 className="exp-role">{job.role}</h3>
                    <div className="exp-company">{job.company}</div>
                  </div>
                </div>
                <div className="exp-right">
                  <div className="exp-period-badge" style={{ background: `${job.color}12`, border: `1px solid ${job.color}33`, color: job.color }}>
                    {job.period}
                  </div>
                  <div className="exp-loc">📍 {job.location}</div>
                </div>
              </div>
              <div className="exp-bullets-grid">
                {job.points.map((pt, j) => (
                  <div key={j} className="exp-bullet-item">
                    <span className="exp-bullet-dot" style={{ background: job.color }} />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="section section--alt" aria-labelledby="skills-heading">
      <div className="sw">
        <SectionLabel number="04" label="Skills & Tech" />
        <h2 id="skills-heading" className="sr-only">Skills and Technologies</h2>
        <div className="skills-grid">
          {SKILLS.map((cat, i) => (
            <div
              key={cat.cat}
              className="card reveal"
              style={{ "--cc": cat.color, transitionDelay: `${i * 0.06}s` }}
            >
              <div className="skill-cat">{cat.icon} {cat.cat}</div>
              <div className="skill-icons-grid">
                {cat.items.map(item => (
                  <div key={item.name} className="skill-icon-item" title={item.name}>
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="skill-icon-img"
                        loading="lazy"
                        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                      />
                    ) : null}
                    <span
                      className="skill-icon-fallback"
                      style={{ display: item.icon ? 'none' : 'flex' }}
                    >
                      {item.abbr || item.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="skill-icon-label">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="levelling-box reveal" style={{ transitionDelay: "0.35s" }}>
          <span style={{ color: "#444" }}>📖 Currently levelling up → </span>
          <span style={{ color: "#ffe600" }}>React Hooks · useContext · Custom Hooks · TypeScript · Tailwind CSS · Playwright · Next.js</span>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function Projects() {
  const [hovered, setHovered] = useState(null);
  const previews = {
    taskquest: taskquestPreview,
    thebetween: theBetweenPreview,
  };

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="sw">
        <SectionLabel number="05" label="Projects" />
        <h2 id="projects-heading" className="sr-only">Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => {
            const s = STATUS_STYLES[p.status];
            const isHovered = hovered === p.title;
            const previewImg = previews[p.preview];

            return (
  <article
    key={p.title}
    className="card pcard reveal"
    style={{ transitionDelay: `${i * 0.07}s` }}
    onMouseEnter={() => setHovered(p.title)}
    onMouseLeave={() => setHovered(null)}
  >
    <div className="pcard-accent" style={{ background: `linear-gradient(to right, ${p.accentColor}, ${p.accentColor}88)` }} />
    <div className="pstrip" style={{ background: p.bg }}>
      {previewImg ? (
        <img
          src={previewImg}
          alt={`${p.title} preview`}
          className="pstrip-preview"
        />
                  ) : (
                    <div
                      className="pstrip-icon"
                      style={{ color: p.accentColor, filter: `drop-shadow(0 0 20px ${p.accentColor})` }}
                    >
                      {p.icon}
                    </div>
                  )}
                  <div className={`pstrip-overlay${isHovered ? ' pstrip-overlay--visible' : ''}`}>
                    {p.live && p.live !== '#hero' && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="pstrip-btn" title="Live Preview" onClick={e => e.stopPropagation()}>
                        <span>↗</span>
                        <span className="pstrip-btn-label">Live</span>
                      </a>
                    )}
                    {p.github && p.github !== '#' && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="pstrip-btn" title="GitHub" onClick={e => e.stopPropagation()}>
                        <span>⌥</span>
                        <span className="pstrip-btn-label">Code</span>
                      </a>
                    )}
                    {!p.live && (
                      <div className="pstrip-btn pstrip-btn--disabled">
                        <span>◌</span>
                        <span className="pstrip-btn-label">No Demo</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="pcard-body">
                  <div className="pcard-header">
                    <h3 className="ptitle">{p.title}</h3>
                    <span className="pstat" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>{s.label}</span>
                  </div>
                  <p className="pdesc" style={{ borderLeft: `2px solid ${p.accentColor}` }}>{p.description}</p>
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

// ─── ARTICLES ────────────────────────────────────────────────────────────────

function Articles() {
  const [articles, setArticles] = useState(DEFAULT_ARTICLES);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [urlError, setUrlError] = useState("");

  const addArticle = () => {
    if (!url.trim()) { setUrlError("Please enter a URL."); return; }
    try { new URL(url); } catch { setUrlError("Enter a valid URL (include https://)."); return; }
    setUrlError("");
    setArticles(prev => [{ url, title: title.trim() || "Medium Article", tag: "Article", excerpt: "Read this article on Medium.", date: "2026", readTime: "— min read" }, ...prev]);
    setUrl(""); setTitle("");
  };

  return (
    <section id="articles" className="section section--alt" aria-labelledby="articles-heading">
      <div className="sw">
        <SectionLabel number="06" label="Articles & Writing" />
        <h2 id="articles-heading" className="sr-only">Articles and Writing</h2>
        <p className="body">Writing about React, frontend engineering, and game QA on Medium.</p>
        <div className="art-add reveal" style={{ transitionDelay: "0.1s" }}>
          <div className="art-add-label">+ Add Medium Article URL</div>
          <div className="art-input-row">
            <input type="url" className={`art-input${urlError ? " art-input--error" : ""}`} value={url} onChange={e => { setUrl(e.target.value); setUrlError(""); }} placeholder="https://medium.com/@yogita/article-slug" aria-label="Article URL" />
            <input type="text" className="art-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Article title" aria-label="Article title" style={{ maxWidth: "280px" }} />
            <button className="art-btn" onClick={addArticle}>Add Article</button>
          </div>
          {urlError && <p className="field-error" role="alert">{urlError}</p>}
        </div>
        <div className="art-grid">
          {articles.map((a, i) => (
            <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className="card art-card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
              <div className="art-tag">✍ {a.tag}</div>
              <div className="art-title">{a.title}</div>
              <div className="art-excerpt">{a.excerpt}</div>
              <div className="art-meta">
                <span className="art-date">{a.date}</span>
                <span className="art-read">{a.readTime} ↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GAME CREDITS ─────────────────────────────────────────────────────────────

function GameCredits() {
  return (
    <section id="credits" className="section" aria-labelledby="credits-heading">
      <div className="sw">
        <SectionLabel number="07" label="Game Credits" />
        <h2 id="credits-heading" className="sr-only">Game Credits</h2>
        <div className="card cr-card reveal" style={{ transitionDelay: "0.1s" }}>
          <div className="credits-inner">
            <div className="credits-icon" aria-hidden="true">🎮</div>
            <div>
              <div className="credits-title">Credited on AAA Game Titles</div>
              <p className="body" style={{ marginBottom: "1rem" }}>
                Worked as a QA Tester via <strong>Globalstep</strong> on projects for{" "}
                <strong style={{ color: "#ff6b35" }}>Ubisoft</strong> and{" "}
                <strong style={{ color: "#ff6b35" }}>Bandai Namco</strong>. Conducted functional,
                regression, and exploratory testing on AAA titles. Credits publicly listed on
                MobyGames — a verifiable professional record.
              </p>
              <div className="credits-badges">
                <a href="https://www.mobygames.com/person/1835643/yogita-yogita/" target="_blank" rel="noopener noreferrer" className="credits-link">View on MobyGames ↗</a>
                <span className="credits-badge credits-badge--ubisoft">🎯 Ubisoft</span>
                <span className="credits-badge credits-badge--bandai">🎯 Bandai Namco</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── GITHUB GRAPH ────────────────────────────────────────────────────────────

function GitHubGraph() {
  const [weeks, setWeeks] = useState([]);
  const [stats, setStats] = useState({ total: 0, streak: 0, best: 0 });
  const [loading, setLoading] = useState(true);
  const [apiLive, setApiLive] = useState(false);
  const graphRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/Yogita-96?y=last");
        if (!res.ok) throw new Error();
        const data = await res.json();
        const flat = (data.contributions || []);
        const chunked = [];
        for (let i = 0; i < flat.length; i += 7) chunked.push(flat.slice(i, i + 7));
        setWeeks(chunked.slice(-52));
        let total = 0, best = 0, streak = 0, cur = 0;
        flat.forEach(d => {
          total += d.count;
          best = Math.max(best, d.count);
          if (d.count > 0) {
            cur++;
          } else {
            streak = Math.max(streak, cur);
            cur = 0;
          }
        });
        streak = Math.max(streak, cur);
        setStats({ total, streak, best });
        setApiLive(true);
      } catch {
        const mockWeeks = Array.from({ length: 52 }, (_, w) =>
          Array.from({ length: 7 }, () => {
            const wa = 52 - w;
            const prob = wa > 32 ? 0.04 : wa > 18 ? 0.22 : 0.62;
            const c = Math.random() < prob ? Math.floor(Math.random() * (wa > 32 ? 3 : wa > 18 ? 5 : 9)) + 1 : 0;
            return { count: c, date: "" };
          })
        );
        setWeeks(mockWeeks);
        setStats({ total: 312, streak: 14, best: 9 });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getLevel = c => c === 0 ? 0 : c < 2 ? 1 : c < 5 ? 2 : c < 8 ? 3 : 4;
  const levelColors = ["rgba(57,255,20,0.05)", "rgba(57,255,20,0.18)", "rgba(57,255,20,0.42)", "rgba(57,255,20,0.68)", "#39ff14"];

  useEffect(() => {
    if (loading || !graphRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      [
        { id: "gh-total", val: stats.total },
        { id: "gh-streak", val: stats.streak },
        { id: "gh-best", val: stats.best },
      ].forEach(({ id, val }) => {
        const el = document.getElementById(id);
        if (!el) return;
        let start = null;
        const step = ts => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1500, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * val);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.35 });
    obs.observe(graphRef.current);
    return () => obs.disconnect();
  }, [loading, stats]);

  return (
    <section id="github" className="section section--alt" aria-labelledby="github-heading">
      <div className="sw">
        <SectionLabel number="03" label="GitHub Activity" />
        <h2 id="github-heading" className="sr-only">GitHub Activity</h2>
        <div className="gh-wrap card reveal" ref={graphRef}>
          <div className="gh-user-row">
            <span className="gh-dot" aria-hidden="true" />
            <span className="gh-uname">github.com/Yogita-96</span>
            {!apiLive && !loading && <span className="gh-note">Sample data — commit daily to fill this in!</span>}
            {loading && <span className="gh-note">Loading…</span>}
          </div>
          <div className="cg" role="img" aria-label="GitHub contribution graph">
            {weeks.map((week, wi) => (
              <div key={wi} className="cw">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className="cd"
                    style={{ background: levelColors[getLevel(day.count)], boxShadow: getLevel(day.count) === 4 ? "0 0 6px rgba(57,255,20,0.7)" : "none" }}
                    title={`${day.count || 0} contribution${day.count !== 1 ? "s" : ""}${day.date ? ` on ${day.date}` : ""}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="cleg">
            <span>Less</span>
            {levelColors.map((c, i) => <div key={i} className="cd" style={{ background: c }} />)}
            <span>More</span>
          </div>
        </div>
        <div className="gh-meta reveal" style={{ transitionDelay: "0.2s" }}>
          {[
            { id: "gh-total", label: "Contributions" },
            { id: "gh-streak", label: "Day Streak" },
            { id: "gh-best", label: "Best Day" },
          ].map(({ id, label }) => (
            <div key={id} className="gmc">
              <div className="gmn" id={id}>0</div>
              <div className="gml">{label}</div>
            </div>
          ))}
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
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="sw" style={{ textAlign: "center" }}>
        <SectionLabel number="08" label="Let's Talk" />
        <h2 id="contact-heading" className="contact-heading">
          Open to <span style={{ color: "var(--cyan)" }}>new opportunities</span>
        </h2>
        <p className="body" style={{ maxWidth: 480, margin: "0 auto 2.5rem" }}>
          Actively seeking React / frontend roles in Ontario and across Canada. Quick learner, strong QA instincts,
          and a genuine love for building high-quality products. Let's connect.
        </p>
        <div className="contact-cards reveal" style={{ transitionDelay: "0.1s" }}>
          {[
            { icon: "✉", label: "Email", value: "yogitaa.rm@gmail.com", href: "mailto:yogitaa.rm@gmail.com", color: "#ff2d78" },
            { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/Yogita-M", href: "https://linkedin.com/in/Yogita-M", color: "#0077b5" },
            { icon: "🐙", label: "GitHub", value: "github.com/Yogita-96", href: "https://github.com/Yogita-96", color: "#39ff14" },
            { icon: "🎮", label: "MobyGames", value: "Game Credits", href: "https://www.mobygames.com/person/1835643/yogita-yogita/", color: "#ff6b35" },
          ].map(c => (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="ccard" style={{ "--cco": c.color }}>
              <span className="ci">{c.icon}</span>
              <div className="clb" style={{ color: c.color }}>{c.label}</div>
              <div className="cv">{c.value}</div>
            </a>
          ))}
        </div>
        <div className="contact-form-wrap reveal" style={{ transitionDelay: "0.2s" }}>
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
      <span>Built in React · No template · © 2026 Yogita.builds</span>
      <span style={{ color: "var(--cyan)" }}>yogitaa.rm@gmail.com</span>
    </footer>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function App() {
  const [photo, setPhoto] = useState(null);
  const sectionIds = NAV_LINKS.map(l => l.href.replace("#", ""));
  const activeSection = useScrollSpy(sectionIds);
  useScrollReveal();

  return (
    <>
      <style>{CSS}</style>
      <a href="#about" className="skip-link">Skip to main content</a>
      <div className="grid-bg" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />
      <ParticleCanvas />
      <Nav activeSection={activeSection} />
      <main id="main" tabIndex={-1}>
        <Hero photo={photo} onPhotoUpload={setPhoto} />
        <About />
        <Experience />
        <GitHubGraph />
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

// ─── STYLES ──────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@300;400;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --cyan:#00e5ff; --pink:#ff2d78; --purple:#bf00ff;
  --green:#39ff14; --orange:#ff6b35; --yellow:#ffe600;
  --dark:#060810; --dark2:#0a0d16; --dark3:#0d1120;
  --cb:#1a1f33; --text:#e0e0e0; --muted:#666; --dim:#888;
}
html { scroll-behavior: smooth; }
body { background: var(--dark); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 16px; line-height: 1.6; overflow-x: hidden; }
::selection { background: #00e5ff33; color: #fff; }
::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: var(--dark2); } ::-webkit-scrollbar-thumb { background: #00e5ff44; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }

.skip-link { position: absolute; left: -9999px; top: 1rem; background: var(--cyan); color: var(--dark); padding: 0.5rem 1rem; font-family: 'Space Mono', monospace; font-size: 0.8rem; font-weight: 700; z-index: 9999; text-decoration: none; }
.skip-link:focus { left: 1rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

.grid-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; background-image: linear-gradient(#00e5ff06 1px, transparent 1px), linear-gradient(90deg, #00e5ff06 1px, transparent 1px); background-size: 60px 60px; }
.scanline { position: fixed; inset: 0; pointer-events: none; z-index: 9998; overflow: hidden; }
.scanline::after { content: ''; position: absolute; width: 100%; height: 2px; background: linear-gradient(to bottom, transparent, #00e5ff09, transparent); animation: scanAnim 8s linear infinite; }
@keyframes scanAnim { 0% { top: -2px; } 100% { top: 100vh; } }

nav.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; height: 60px; padding: 0 5%; display: flex; align-items: center; justify-content: space-between; transition: all 0.3s; }
nav.nav--scrolled { background: rgba(6,8,16,0.94); backdrop-filter: blur(16px); border-bottom: 1px solid var(--cb); }
.nav-logo { font-family: 'Space Mono', monospace; font-size: 0.85rem; color: var(--cyan); letter-spacing: 0.1em; text-decoration: none; }
.logo-dot { color: #fff; }
.nav-links { display: flex; gap: 22px; list-style: none; }
.nav-link { font-family: 'Space Mono', monospace; font-size: 0.63rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim); text-decoration: none; transition: color 0.2s; }
.nav-link:hover, .nav-link.active { color: #fff; }
.nav-hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.nav-hamburger span { display: block; width: 22px; height: 1.5px; background: var(--text); transition: 0.2s; }
@media (max-width: 860px) {
  .nav-hamburger { display: flex; }
  .nav-links { display: none; position: absolute; top: 60px; left: 0; right: 0; flex-direction: column; gap: 0; background: var(--dark2); border-bottom: 1px solid var(--cb); padding: 0.5rem 5%; }
  .nav-links.open { display: flex; }
  .nav-link { padding: 0.75rem 0; font-size: 0.9rem; border-bottom: 1px solid var(--cb); }
}

.hero { min-height: 100vh; position: relative; z-index: 1; padding: 100px 5% 60px; }
.hero-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; align-items: center; gap: 4rem; }
@media (max-width: 860px) { .hero-grid { grid-template-columns: 1fr; } .hero-right { order: -1; display: flex; justify-content: center; } }
.status-dot { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; background: rgba(57,255,20,0.07); border: 1px solid rgba(57,255,20,0.22); border-radius: 999px; margin-bottom: 18px; font-family: 'Space Mono', monospace; font-size: 0.6rem; color: var(--green); letter-spacing: 0.08em; opacity: 0; animation: fadeUp 0.7s 0s forwards; }
.status-dot::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: gpulse 1.5s ease-in-out infinite; }
@keyframes gpulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(57,255,20,0.4)} 50%{opacity:0.8;box-shadow:0 0 0 6px rgba(57,255,20,0)} }
.hero-eyebrow { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--cyan); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 14px; opacity: 0; animation: fadeUp 0.7s 0.1s forwards; }
.hero-name { font-family: 'Syne', sans-serif; font-size: clamp(4rem, 8vw, 7rem); font-weight: 900; line-height: 0.9; color: #fff; letter-spacing: -0.02em; margin-bottom: 6px; opacity: 0; animation: fadeUp 0.7s 0.25s forwards; }
.hero-name-accent { background: linear-gradient(135deg, var(--cyan) 0%, var(--pink) 55%, var(--purple) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-tagline { font-family: 'Space Mono', monospace; font-size: 0.76rem; color: var(--dim); margin-top: 18px; line-height: 2; min-height: 3.5em; opacity: 0; animation: fadeUp 0.7s 0.4s forwards; }
.typed-cursor { border-right: 2px solid var(--cyan); animation: blink 1s step-end infinite; }
.hero-desc { font-size: 0.93rem; color: var(--dim); font-weight: 300; line-height: 1.75; max-width: 480px; margin-top: 16px; opacity: 0; animation: fadeUp 0.7s 0.55s forwards; }
.hero-cta { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 30px; opacity: 0; animation: fadeUp 0.7s 0.7s forwards; }
.hero-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-top: 44px; opacity: 0; animation: fadeUp 0.7s 0.85s forwards; }
.hero-stats > div { background: #0a0d16; border: 1px solid #1a1f33; padding: 16px; border-radius: 8px; position: relative; overflow: hidden; }
.hero-stats > div::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--sc, rgba(0,229,255,0.03)), transparent); pointer-events: none; }
.stat-n { font-family: 'Syne', sans-serif; font-size: 2.4rem; font-weight: 900; color: var(--sc, #00e5ff); line-height: 1; }
.stat-l { font-family: 'Space Mono', monospace; font-size: 0.52rem; color: #444; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 5px; }

.btn-p { padding: 11px 24px; background: var(--cyan); color: var(--dark); border: none; cursor: pointer; font-family: 'Space Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; text-decoration: none; display: inline-block; transition: all 0.25s; clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%); }
.btn-p:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,229,255,0.35); }
.btn-p:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.btn-o { padding: 11px 22px; background: transparent; color: #ccc; border: 1px solid var(--cb); cursor: pointer; font-family: 'Space Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; display: inline-block; transition: all 0.25s; }
.btn-o:hover { border-color: var(--cyan); color: var(--cyan); transform: translateY(-2px); }

.photo-frame { position: relative; width: 340px; max-width: 100%; }
.pfb { position: absolute; inset: -2px; background: linear-gradient(135deg, var(--cyan), var(--pink), var(--purple), var(--cyan)); background-size: 400% 400%; animation: gradShift 5s ease infinite; clip-path: polygon(24px 0%, 100% 0%, calc(100% - 24px) 100%, 0% 100%); z-index: 0; }
@keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
.pfi { position: relative; z-index: 1; clip-path: polygon(24px 0%, 100% 0%, calc(100% - 24px) 100%, 0% 100%); overflow: hidden; background: var(--dark3); aspect-ratio: 3/4; display: flex; align-items: center; justify-content: center; }
.pfi img { width: 100%; height: 100%; object-fit: cover; object-position: center 8%; display: block; filter: contrast(1.04) saturate(1.1); transition: transform 0.5s; }
.photo-frame:hover .pfi img { transform: scale(1.04); }
.pfi::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 55%, rgba(6,8,16,0.4) 100%); pointer-events: none; }
.photo-avatar { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(160deg, #0d1427, #1a0d2e); gap: 0.5rem; padding: 2rem; }
.avatar-circle { width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #00e5ff, #ff2d78, #bf00ff); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 2.5rem; font-weight: 900; color: #060810; animation: gpulse 3s ease-in-out infinite; }
.avatar-name { font-family: 'Space Mono', monospace; font-size: 0.85rem; color: var(--cyan); letter-spacing: 3px; margin-top: 0.5rem; }
.avatar-role { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: #444; letter-spacing: 2px; }
.avatar-upload-btn { margin-top: 1rem; padding: 6px 14px; background: rgba(0,229,255,0.06); border: 1px solid rgba(0,229,255,0.2); color: rgba(0,229,255,0.6); font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; letter-spacing: 1px; cursor: pointer; transition: all 0.2s; }
.avatar-upload-btn:hover { background: rgba(0,229,255,0.12); color: var(--cyan); }
.photo-change-btn { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); z-index: 3; padding: 5px 12px; background: rgba(6,8,16,0.85); border: 1px solid rgba(0,229,255,0.3); color: var(--cyan); font-family: 'Space Mono', monospace; font-size: 0.58rem; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
.photo-change-btn:hover { background: rgba(0,229,255,0.1); }
.pbadge { position: absolute; bottom: -12px; left: -12px; z-index: 2; background: linear-gradient(135deg, var(--yellow), #ff6b00); color: var(--dark); padding: 6px 14px; font-family: 'Space Mono', monospace; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }
.pc { position: absolute; width: 18px; height: 18px; }
.pc.tl { top: -2px; left: -2px; border-top: 2px solid var(--cyan); border-left: 2px solid var(--cyan); }
.pc.tr { top: -2px; right: -2px; border-top: 2px solid var(--pink); border-right: 2px solid var(--pink); }
.pc.bl { bottom: -2px; left: -2px; border-bottom: 2px solid var(--purple); border-left: 2px solid var(--purple); }
.pc.br { bottom: -2px; right: -2px; border-bottom: 2px solid var(--yellow); border-right: 2px solid var(--yellow); }

.sw { max-width: 1200px; margin: 0 auto; padding: 60px 4%; }
.section--alt { background: var(--dark2); border-top: 1px solid var(--cb); border-bottom: 1px solid var(--cb); }
.sl { display: flex; align-items: center; gap: 14px; margin-bottom: 42px; }
.sl-t { font-family: 'Space Mono', monospace; font-size: 0.64rem; color: var(--cyan); letter-spacing: 0.15em; text-transform: uppercase; white-space: nowrap; }
.sl-l { flex: 1; height: 1px; background: linear-gradient(to right, #00e5ff44, transparent); }
.section-title { font-family: 'Syne', sans-serif; font-size: 1.9rem; font-weight: 800; color: #fff; margin-bottom: 14px; line-height: 1.15; }
.body { color: var(--dim); font-size: 1rem; line-height: 1.8; margin-bottom: 14px; }

.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s, transform 0.7s; }
.reveal.visible { opacity: 1; transform: translateY(0); }

.card { background: var(--dark3); border: 1px solid var(--cb); padding: 26px; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; }
.card:hover { border-color: rgba(0,229,255,0.2); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.35); }

.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
@media (max-width: 700px) { .about-grid { grid-template-columns: 1fr; } }
.about-cards { display: flex; flex-direction: column; gap: 14px; }
.info-card { background: var(--dark3); border: 1px solid var(--cb); padding: 20px; }
.card-label { font-family: 'Space Mono', monospace; font-size: 0.56rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
.contact-list { display: flex; flex-direction: column; gap: 7px; font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; color: var(--dim); }
.contact-list a { color: var(--cyan); text-decoration: none; } .contact-list a:hover { text-decoration: underline; }
.edu-list { display: flex; flex-direction: column; gap: 11px; }
.edu-degree { font-size: 0.86rem; font-weight: 600; color: #fff; }
.edu-meta { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: #444; margin-top: 2px; }
.edu-detail { font-family: 'Space Mono', monospace; font-size: 0.54rem; color: #333; margin-top: 3px; }

.exp-list { display: flex; flex-direction: column; gap: 20px; }
.exp-card { border-left: 3px solid var(--ac, var(--cyan)); padding: 24px 28px; }
.exp-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
.exp-header-left { display: flex; align-items: center; gap: 16px; }
.exp-icon { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.exp-role { font-family: 'Syne', sans-serif; font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 4px; }
.exp-company { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: var(--ac, var(--cyan)); }
.exp-right { text-align: right; display: flex; flex-direction: column; gap: 6px; align-items: flex-end; }
.exp-period-badge { font-family: 'Space Mono', monospace; font-size: 0.62rem; padding: 5px 12px; border-radius: 999px; white-space: nowrap; }
.exp-loc { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: #444; }
.exp-bullets-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; }
@media (max-width: 700px) { .exp-bullets-grid { grid-template-columns: 1fr; } }
.exp-bullet-item { display: flex; gap: 10px; font-size: 0.88rem; color: #888; line-height: 1.6; align-items: flex-start; }
.exp-bullet-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 7px; }


.gh-wrap { position: relative; overflow: hidden; }
.gh-wrap::before { content: 'GITHUB_CONTRIBUTIONS.exe'; position: absolute; top: 0.7rem; right: 1.2rem; font-family: 'JetBrains Mono', monospace; font-size: 0.54rem; color: rgba(57,255,20,0.25); letter-spacing: 2px; }
.gh-user-row { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; }
.gh-dot { width: 8px; height: 8px; background: var(--green); border-radius: 50%; animation: blink2 1.5s step-end infinite; flex-shrink: 0; }
.gh-uname { font-family: 'JetBrains Mono', monospace; font-size: 0.88rem; color: var(--green); }
.gh-note { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--muted); font-style: italic; }
.cg { display: flex; gap: 3px; overflow-x: auto; padding-bottom: 6px; }
.cw { display: flex; flex-direction: column; gap: 3px; }
.cd { width: 12px; height: 12px; border-radius: 2px; cursor: default; transition: transform 0.15s; flex-shrink: 0; }
.cd:hover { transform: scale(1.7); z-index: 5; }
.cleg { display: flex; align-items: center; gap: 5px; margin-top: 10px; justify-content: flex-end; font-family: 'JetBrains Mono', monospace; font-size: 0.64rem; color: var(--muted); }
.gh-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 16px; }
.gmc { background: rgba(57,255,20,0.04); border: 1px solid rgba(57,255,20,0.1); padding: 14px; text-align: center; }
.gmn { font-family: 'Syne', sans-serif; font-size: 1.9rem; font-weight: 800; color: var(--green); }
.gml { font-family: 'Space Mono', monospace; font-size: 0.56rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; }

.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; margin-bottom: 20px; }
.skill-cat { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: var(--cc, var(--cyan)); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
.skill-cat::before { content: ''; display: block; width: 6px; height: 6px; background: var(--cc, var(--cyan)); border-radius: 50%; }
.skill-icons-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(64px, 1fr)); gap: 12px; margin-top: 8px; }
.skill-icon-item { display: flex; flex-direction: column; align-items: center; gap: 5px; cursor: default; transition: transform 0.2s; }
.skill-icon-item:hover { transform: translateY(-3px); }
.skill-icon-img { width: 36px; height: 36px; object-fit: contain; filter: brightness(0.85) saturate(0.9); background: rgba(255,255,255,0.05); border-radius: 6px; padding: 2px; transition: filter 0.2s; }
.skill-icon-item:hover .skill-icon-img { filter: brightness(1.1) saturate(1.2); }
.skill-icon-fallback { width: 36px; height: 36px; border: 1px solid var(--cb); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-family: 'Space Mono', monospace; font-size: 0.6rem; color: var(--cc, var(--cyan)); background: rgba(255,255,255,0.03); }
.skill-icon-label { font-family: 'Space Mono', monospace; font-size: 0.5rem; color: #555; text-align: center; line-height: 1.2; letter-spacing: 0.04em; max-width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.skill-icon-item:hover .skill-icon-label { color: var(--cc, var(--cyan)); }
.levelling-box { margin-top: 18px; padding: 14px 18px; background: var(--dark3); border: 1px dashed var(--cb); font-family: 'Space Mono', monospace; font-size: 0.62rem; }

.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }
@media (max-width: 600px) { .projects-grid { grid-template-columns: 1fr; } }
.pcard { display: flex; flex-direction: column; cursor: default; }
.pstrip { height: 180px; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; transition: transform 0.4s; }
.pcard:hover .pstrip { transform: scale(1.02); }
.pstrip-preview { width: 100%; height: 100%; object-fit: cover; object-position: top center; transition: transform 0.4s; filter: brightness(0.85); }
.pcard:hover .pstrip-preview { transform: scale(1.04); filter: brightness(0.7); }
.pstrip-icon { font-size: 3rem; position: relative; z-index: 1; transition: transform 0.3s; }
.pcard:hover .pstrip-icon { transform: translateY(-6px); }
.pstrip-overlay { position: absolute; inset: 0; background: rgba(6,8,16,0.75); display: flex; align-items: center; justify-content: center; gap: 16px; opacity: 0; transition: opacity 0.25s ease; z-index: 2; backdrop-filter: blur(2px); }
.pstrip-overlay--visible { opacity: 1; }
.pstrip-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; width: 56px; height: 56px; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; font-size: 1.2rem; text-decoration: none; cursor: pointer; transition: all 0.2s; }
.pstrip-btn:hover { background: rgba(0,229,255,0.15); border-color: #00e5ff; color: #00e5ff; transform: translateY(-3px); }
.pstrip-btn--disabled { opacity: 0.3; cursor: not-allowed; }
.pstrip-btn--disabled:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); color: #fff; transform: none; }
.pstrip-btn-label { font-family: 'Space Mono', monospace; font-size: 0.45rem; letter-spacing: 0.08em; text-transform: uppercase; }
.pcard-body { padding: 18px 20px 16px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.pcard-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
.ptitle { font-family: 'Syne', sans-serif; font-size: 1.02rem; font-weight: 700; color: #fff; }
.pstat { font-family: 'Space Mono', monospace; font-size: 0.54rem; padding: 3px 8px; border-radius: 999px; white-space: nowrap; }
.pdesc { font-size: 0.82rem; color: #888; line-height: 1.65; font-style: italic; padding-left: 10px; margin-bottom: 4px; flex: 1; }
.ptags { display: flex; flex-wrap: wrap; gap: 4px; }
.ptag { font-family: 'Space Mono', monospace; font-size: 0.58rem; padding: 2px 7px; background: rgba(255,255,255,0.03); border: 1px solid var(--cb); color: #555; }
.pcard-accent { height: 4px; width: 100%; flex-shrink: 0; }


.art-add { margin-bottom: 28px; }
.art-add-label { font-family: 'Space Mono', monospace; font-size: 0.6rem; color: var(--cyan); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
.art-input-row { display: flex; gap: 10px; flex-wrap: wrap; }
.art-input { flex: 1; min-width: 220px; padding: 10px 14px; background: var(--dark3); border: 1px solid var(--cb); color: var(--text); font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; outline: none; transition: border-color 0.2s; }
.art-input:focus { border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(0,229,255,0.1); }
.art-input--error { border-color: var(--pink); }
.art-btn { padding: 10px 20px; background: var(--cyan); color: var(--dark); border: none; cursor: pointer; font-family: 'Space Mono', monospace; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap; transition: all 0.2s; }
.art-btn:hover { background: #fff; }
.art-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; margin-top: 10px; }
@media (max-width: 600px) { .art-grid { grid-template-columns: 1fr; } }
.art-card { display: flex; flex-direction: column; gap: 10px; text-decoration: none; color: inherit; transition: border-color 0.3s, transform 0.3s; }
.art-card:hover { border-color: rgba(0,229,255,0.25); }
.art-tag { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: var(--pink); letter-spacing: 0.1em; text-transform: uppercase; }
.art-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #fff; line-height: 1.3; }
.art-excerpt { font-size: 0.83rem; color: var(--muted); line-height: 1.6; flex: 1; }
.art-meta { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 10px; border-top: 1px solid var(--cb); }
.art-date { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: #444; }
.art-read { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: var(--cyan); }

.cr-card { border-color: rgba(255,107,53,0.28); }
.cr-card:hover { border-color: rgba(255,107,53,0.55); }
.credits-inner { display: flex; gap: 28px; flex-wrap: wrap; align-items: center; }
.credits-icon { font-size: 3.2rem; }
.credits-title { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 9px; }
.credits-badges { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }
.credits-link { padding: 7px 16px; background: rgba(255,107,53,0.08); border: 1px solid var(--orange); color: var(--orange); font-family: 'Space Mono', monospace; font-size: 0.64rem; text-decoration: none; letter-spacing: 0.08em; display: inline-block; transition: all 0.2s; }
.credits-link:hover { background: rgba(255,107,53,0.15); }
.credits-badge { padding: 7px 13px; font-family: 'Space Mono', monospace; font-size: 0.6rem; }
.credits-badge--ubisoft { background: rgba(255,45,120,0.07); border: 1px solid rgba(255,45,120,0.28); color: var(--pink); }
.credits-badge--bandai { background: rgba(191,0,255,0.07); border: 1px solid rgba(191,0,255,0.28); color: var(--purple); }

.contact-heading { font-family: 'Syne', sans-serif; font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 14px; }
.contact-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 3rem; }
.ccard { background: var(--dark3); border: 1px solid var(--cb); padding: 20px; text-decoration: none; display: block; transition: all 0.3s; text-align: center; }
.ccard:hover { border-color: var(--cco, var(--cyan)); transform: translateY(-3px); }
.ci { font-size: 1.7rem; margin-bottom: 6px; display: block; }
.clb { font-family: 'Space Mono', monospace; font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; }
.cv { color: var(--muted); font-size: 0.76rem; margin-top: 3px; }
.form-divider { font-family: 'Space Mono', monospace; font-size: 0.62rem; color: #333; text-align: center; margin-bottom: 2rem; letter-spacing: 0.1em; text-transform: uppercase; }
.contact-form-wrap { max-width: 560px; margin: 0 auto; text-align: left; }
.contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-label { font-family: 'Space Mono', monospace; font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; color: #555; }
.form-input { background: var(--dark3); border: 1px solid var(--cb); padding: 0.75rem 1rem; color: var(--text); font-size: 0.9rem; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s; outline: none; }
.form-input:focus { border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(0,229,255,0.1); }
.form-input--error { border-color: var(--pink); }
.form-textarea { resize: vertical; min-height: 130px; }
.field-error { font-family: 'Space Mono', monospace; font-size: 0.62rem; color: var(--pink); margin-top: 0.2rem; }
.submit-btn { align-self: flex-start; margin-top: 0.5rem; }
.form-success { background: rgba(57,255,20,0.06); border: 1px solid rgba(57,255,20,0.25); padding: 1.25rem; color: var(--green); font-family: 'Space Mono', monospace; font-size: 0.8rem; margin-top: 1.5rem; }

.footer { border-top: 1px solid var(--cb); padding: 18px 5%; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; font-family: 'Space Mono', monospace; font-size: 0.58rem; color: #2a2a3a; position: relative; z-index: 1; }

@keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes blink2 { 0%,100%{opacity:1} 50%{opacity:0.12} }
`;