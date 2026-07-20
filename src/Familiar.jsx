import { useState, useEffect, useRef, useCallback } from "react";
import familiarStanding from './assets/familiar/familiar-standing.png';
import familiarWalking from './assets/familiar/familiar-walking.png';
import familiarRunning from './assets/familiar/familiar-running.png';
import familiarSittingSip from './assets/familiar/familiar-sitting-sip.png';
import familiarSittingLook from './assets/familiar/familiar-sitting-look.png';
import familiarPointing from './assets/familiar/familiar-pointing.png';
import familiarGettingUp from './assets/familiar/familiar-getting-up.png';
import familiarDoor from './assets/familiar/familiar-door-toggle.png';

// ─── FRAME MAP ────────────────────────────────────────────────────────────────
const FRAMES = {
  standing: familiarStanding,
  walking: familiarWalking,
  running: familiarRunning,
  sitting_sip: familiarSittingSip,
  sitting_look: familiarSittingLook,
  pointing: familiarPointing,
  getting_up: familiarGettingUp,
};

// ─── SPEECH LINES ─────────────────────────────────────────────────────────────
// Attached to specific data-familiar-key attributes on the page.
// She speaks when cursor hovers a targeted element.
// Voice: third person, warm-dry-affectionate, dry-narrator energy.
const SPEECH_LINES = {
  // Hero + general sections
  hero: [
    "she made this whole thing herself. bit dramatic if you ask me.",
    "welcome. she's been waiting.",
    "yes the wordmark is that big on purpose.",
    "three years of react. mostly self-taught. she'll mention it once and then never again.",
  ],
  about: [
    "she is, in fact, the person on the site. shocking, i know.",
    "developer, tester, builder — she couldn't decide, so she went with all three.",
    "she'll tell you she brings a tester's eye for quality. she's not wrong.",
  ],

  // Experience — per-job
  exp_globalstep: [
    "yes the ubisoft one is real. mobygames link in the credits.",
    "she got a full year of AAA QA in montreal. cold city, warm team.",
    "she'll tell you globalstep employed her, not ubisoft. accurate but underselling.",
  ],
  exp_freelance: [
    "the freelance gig is still active. she takes new clients if they're interesting.",
    "react native, redux, third-party integrations. repeat clients, which says something.",
    "she wrote the invoices herself. she also wrote the code. a whole operation.",
  ],
  exp_gaotek: [
    "she made legacy code run 50% faster in four months. she'll shrug about it.",
    "her first paid dev role. angularjs, html5, css3 — she still remembers.",
  ],
  exp_digiidunia: [
    "her first real react job. she was 22 and terrified. now she's less terrified.",
    "reusable components, unit tests, playwright — she cared about quality even then.",
    "1.5 years of react in noida. the foundation of everything she does now.",
  ],

  // Skills
  skills: [
    "she considered listing every library. i talked her out of it.",
    "the QA category is warm-colored because she is, in fact, a bit of a QA evangelist.",
    "yes she uses raw css. no she does not want to talk about tailwind right now.",
  ],

  // Projects — per-project
  proj_taskquest: [
    "taskquest is live. she uses it herself. she is currently a champion in it.",
    "she wanted to add the same 'wash dishes' quest twice. bug or feature? feature.",
    "custom hooks, localstorage, css animations. no libraries. she's stubborn.",
  ],
  proj_the_between: [
    "she built a full rpg in raw react. we don't talk about the enemy-turn bug. we don't.",
    "no game engine. useReducer for combat state. she's showing off, honestly.",
    "the case study button opens the story. read it. she wrote it with care.",
  ],
  proj_car_sale: [
    "a real freelance project. flutter, firebase, actual clients, actual money.",
    "google/facebook/gmail social login. she made it all work.",
  ],
  proj_medical_agency: [
    "b2b pharma app. asp.net, c#, sql server. she can do enterprise stack too.",
    "shipped to production for real users. she's done this before.",
  ],

  // Articles + Credits + Contact
  articles: [
    "she writes about QA and react on medium. mostly on weekends. mostly with coffee.",
    "click through. she'd like the read count to go up.",
  ],
  credits: [
    "assassin's creed shadows. elden ring nightreign. these are real. checkable.",
    "she'll tell you globalstep employed her, not ubisoft. accurate but underselling.",
  ],
  contact: [
    "go on. she doesn't bite. mostly.",
    "she checks this every morning. with coffee. always coffee.",
    "warning: she replies. quickly. some might say too quickly.",
  ],

  // Case study lines (both pages)
  case_study: [
    "the good stuff is in here. she wrote it herself.",
    "this bug ate a full weekend. she still has notes in a file called ref-hell.md.",
    "she considered redux for approximately 4 minutes.",
  ],

  // Case study sub-sections (per-section on cs page)
  cs_overview: [
    "she wrote this whole thing herself. no ghostwriter. no chatgpt draft.",
    "the pitch is here. if it doesn't land, nothing else will.",
    "read this bit first. everything else builds on it.",
  ],
  cs_progress: [
    "yes it's still being built. no she's not going to hurry.",
    "'shipping in public' is a fancy phrase for 'you can watch me not finish'.",
    "the roadmap exists. she just refuses to be rushed.",
  ],
  cs_stack: [
    "no game engine. no state library. she's showing off.",
    "vite because it's fast. useReducer because state machines. that's it.",
    "she picked each one on purpose. ask her why over coffee.",
  ],
  cs_decisions: [
    "this is where she explains why she made the annoying choices.",
    "she considered redux for four minutes. i timed it.",
    "read the useReducer one carefully. that's the one she's proud of.",
  ],
  cs_qa: [
    "this bug ate a full weekend. she has a file called ref-hell.md. it exists.",
    "she's dramatic about debugging. i think it's the QA background.",
    "the enemy-turn re-entry story. buckle up.",
  ],
  cs_learned: [
    "the things she'd tell junior yogita if she could.",
    "'state machines aren't a library, they're a discipline.' she wrote that unironically.",
    "these are the sentences she'd frame if she could.",
  ],
  cs_evolving: [
    "the things she hasn't built yet. she promises she will. mostly.",
    "phase 2 is coming. eventually. after the job hunt. probably.",
    "roadmap said with love, not obligation.",
  ],
  cs_articles: [
    "she wrote the medium versions before the case study. they're shorter.",
    "click through if you want the tldr version.",
  ],
  cs_cta: [
    "the final ask. she wants you to click something.",
    "if you got this far, you might as well go check the code.",
    "she doesn't beg. she just leaves the buttons here.",
  ],
};

// ─── MOBILE DETECTION ─────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── HOOKS ────────────────────────────────────────────────────────────────────
// Track cursor position + velocity + recent distance traveled (DESKTOP)
function useCursor(enabled) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState(0);
  const lastPos = useRef({ x: 0, y: 0, t: 0 });
  const recentMovementsRef = useRef([]);

  useEffect(() => {
    if (!enabled) return;
    const handle = (e) => {
      const now = performance.now();
      const dt = now - lastPos.current.t;
      if (dt > 0) {
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        setVelocity(dist / dt);
        recentMovementsRef.current.push({ dist, t: now });
        recentMovementsRef.current = recentMovementsRef.current.filter(m => now - m.t < 300);
      }
      lastPos.current = { x: e.clientX, y: e.clientY, t: now };
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [enabled]);

  return { pos, velocity, recentMovementsRef };
}

// Track scroll velocity + recent scroll distance (MOBILE)
function useScroll(enabled) {
  const [scrollY, setScrollY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef({ y: 0, t: 0 });
  const recentScrollsRef = useRef([]);

  useEffect(() => {
    if (!enabled) return;
    const handle = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = now - lastScroll.current.t;
      if (dt > 0) {
        const dy = Math.abs(y - lastScroll.current.y);
        setVelocity(dy / dt);
        recentScrollsRef.current.push({ dist: dy, t: now });
        recentScrollsRef.current = recentScrollsRef.current.filter(m => now - m.t < 400);
      }
      lastScroll.current = { y, t: now };
      setScrollY(y);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, [enabled]);

  return { scrollY, velocity, recentScrollsRef };
}

// Character position — desktop version (tracks cursor Y in right margin)
function useCharacterPosition(cursorPos) {
  const [charPos, setCharPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef();
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const viewportWidth = window.innerWidth;
    const marginX = viewportWidth > 1400
      ? viewportWidth * 0.90
      : viewportWidth * 0.87;
    targetRef.current = {
      x: marginX,
      y: cursorPos.y + 20,
    };
  }, [cursorPos.y]);

  useEffect(() => {
    const step = () => {
      setCharPos((current) => {
        const dx = targetRef.current.x - current.x;
        const dy = targetRef.current.y - current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.5) return current;
        const lerp = dist > 500 ? 0.008 : dist > 200 ? 0.005 : 0.004;
        return {
          x: current.x + dx * lerp,
          y: current.y + dy * lerp,
        };
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return charPos;
}

// State machine — DESKTOP (cursor-based)
function useFamiliarStateDesktop(cursorPos, velocity, charPos, speechVisible, recentMovementsRef) {
  const [state, setState] = useState("standing");
  const [idleSubstate, setIdleSubstate] = useState("sitting_sip");
  const lastMoveTimeRef = useRef(performance.now());
  const stateEnteredAtRef = useRef(performance.now());
  const stateRef = useRef(state);
  const idleAlternateTimerRef = useRef(null);
  const cursorPosRef = useRef(cursorPos);
  const charPosRef = useRef(charPos);
  const speechVisibleRef = useRef(speechVisible);

  useEffect(() => { cursorPosRef.current = cursorPos; }, [cursorPos]);
  useEffect(() => { charPosRef.current = charPos; }, [charPos]);
  useEffect(() => { speechVisibleRef.current = speechVisible; }, [speechVisible]);

  useEffect(() => {
    stateRef.current = state;
    stateEnteredAtRef.current = performance.now();
  }, [state]);

  useEffect(() => {
    if (velocity > 0.03) {
      lastMoveTimeRef.current = performance.now();
    }
  }, [velocity]);

  useEffect(() => {
    const interval = setInterval(() => {
      const cp = cursorPosRef.current;
      const chp = charPosRef.current;
      const sv = speechVisibleRef.current;
      const dy = cp.y - chp.y;
      const verticalDistance = Math.abs(dy);
      const now = performance.now();
      const timeSinceMove = now - lastMoveTimeRef.current;
      const timeInState = now - stateEnteredAtRef.current;
      const currentState = stateRef.current;
      const recentDist = recentMovementsRef.current.reduce((sum, m) => sum + m.dist, 0);

      if (currentState === "getting_up") {
        const dustOffDuration = sv ? 200 : 600;
        if (timeInState > dustOffDuration) setState("standing");
        return;
      }
      if (currentState === "idle") {
        if (timeSinceMove < 300) setState("getting_up");
        return;
      }
      if (timeSinceMove > 5000 && verticalDistance < 100 && timeInState > 2000 && !sv) {
        setState("idle");
        setIdleSubstate("sitting_sip");
        return;
      }
      if (recentDist > 200 || verticalDistance > 250) {
        if (currentState !== "running") setState("running");
      } else if (verticalDistance > 40) {
        if (currentState !== "walking") setState("walking");
      } else {
        if (currentState !== "standing") setState("standing");
      }
    }, 100);
    return () => clearInterval(interval);
  }, [recentMovementsRef]);

  useEffect(() => {
    if (state !== "idle") {
      clearInterval(idleAlternateTimerRef.current);
      return;
    }
    idleAlternateTimerRef.current = setInterval(() => {
      setIdleSubstate((s) => (s === "sitting_sip" ? "sitting_look" : "sitting_sip"));
    }, 5000);
    return () => clearInterval(idleAlternateTimerRef.current);
  }, [state]);

  const currentFrame = state === "idle" ? idleSubstate : state;
  const wakeUp = useCallback(() => {
    if (stateRef.current === "idle") {
      lastMoveTimeRef.current = performance.now();
      setState("getting_up");
    }
  }, []);

  return { state, currentFrame, wakeUp };
}

// State machine — MOBILE (scroll-based)
function useFamiliarStateMobile(velocity, speechVisible, recentScrollsRef) {
  const [state, setState] = useState("standing");
  const [idleSubstate, setIdleSubstate] = useState("sitting_sip");
  const lastMoveTimeRef = useRef(performance.now());
  const stateEnteredAtRef = useRef(performance.now());
  const stateRef = useRef(state);
  const idleAlternateTimerRef = useRef(null);
  const speechVisibleRef = useRef(speechVisible);

  useEffect(() => { speechVisibleRef.current = speechVisible; }, [speechVisible]);
  useEffect(() => {
    stateRef.current = state;
    stateEnteredAtRef.current = performance.now();
  }, [state]);

  useEffect(() => {
    if (velocity > 0.5) {
      lastMoveTimeRef.current = performance.now();
    }
  }, [velocity]);

  useEffect(() => {
    const interval = setInterval(() => {
      const sv = speechVisibleRef.current;
      const now = performance.now();
      const timeSinceMove = now - lastMoveTimeRef.current;
      const timeInState = now - stateEnteredAtRef.current;
      const currentState = stateRef.current;
      const recentScrollDist = recentScrollsRef.current.reduce((sum, m) => sum + m.dist, 0);

      if (currentState === "getting_up") {
        const dustOffDuration = sv ? 200 : 600;
        if (timeInState > dustOffDuration) setState("standing");
        return;
      }
      if (currentState === "idle") {
        if (timeSinceMove < 300) setState("getting_up");
        return;
      }
      // Enter idle: no scroll 5s+, been in state 2s+, no speech
      if (timeSinceMove > 5000 && timeInState > 2000 && !sv) {
        setState("idle");
        setIdleSubstate("sitting_sip");
        return;
      }
      // Scroll-based movement:
      // Fast scroll (>400px in 400ms) → running
      // Any recent scroll → walking
      // No recent scroll → standing
      if (recentScrollDist > 400) {
        if (currentState !== "running") setState("running");
      } else if (recentScrollDist > 20) {
        if (currentState !== "walking") setState("walking");
      } else {
        if (currentState !== "standing") setState("standing");
      }
    }, 100);
    return () => clearInterval(interval);
  }, [recentScrollsRef]);

  useEffect(() => {
    if (state !== "idle") {
      clearInterval(idleAlternateTimerRef.current);
      return;
    }
    idleAlternateTimerRef.current = setInterval(() => {
      setIdleSubstate((s) => (s === "sitting_sip" ? "sitting_look" : "sitting_sip"));
    }, 5000);
    return () => clearInterval(idleAlternateTimerRef.current);
  }, [state]);

  const currentFrame = state === "idle" ? idleSubstate : state;
  const wakeUp = useCallback(() => {
    if (stateRef.current === "idle") {
      lastMoveTimeRef.current = performance.now();
      setState("getting_up");
    }
  }, []);

  return { state, currentFrame, wakeUp };
}

function useSpeakingFrame(baseFrame, speechVisible, state, wasIdle) {
  if (state === "getting_up") {
    return wasIdle ? "getting_up" : "standing";
  }
  if (state === "idle") return baseFrame;
  return speechVisible ? "pointing" : baseFrame;
}

// Detect which speech target the cursor is over — DESKTOP
function useHoverTarget(enabled) {
  const [target, setTarget] = useState(null);
  useEffect(() => {
    if (!enabled) return;
    const handle = (e) => {
      const el = e.target.closest("[data-familiar-key]");
      const key = el?.getAttribute("data-familiar-key") || null;
      setTarget((prev) => (prev === key ? prev : key));
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [enabled]);
  return target;
}

// Detect which data-familiar-key section is most visible — MOBILE
// Uses IntersectionObserver, throttled to change target at most every ~2s
function useScrollTarget(enabled) {
  const [target, setTarget] = useState(null);
  const lastChangeRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const elements = document.querySelectorAll("[data-familiar-key]");
    if (elements.length === 0) return;

    const visibility = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const key = entry.target.getAttribute("data-familiar-key");
        visibility.set(key, entry.intersectionRatio);
      });

      // Find the most visible target
      let bestKey = null;
      let bestRatio = 0.3; // must be at least 30% visible to trigger
      visibility.forEach((ratio, key) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestKey = key;
        }
      });

      // Throttle changes — max once every 2 seconds
      const now = performance.now();
      if (bestKey && now - lastChangeRef.current > 800) {
        setTarget(prev => {
          if (prev === bestKey) return prev;
          lastChangeRef.current = now;
          return bestKey;
        });
      }
    }, { threshold: [0.1, 0.3, 0.5, 0.75] });

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return target;
}

function useSpeech(targetKey, active, isMobile) {
  const [line, setLine] = useState(null);
  const [visible, setVisible] = useState(false);
  const hideTimerRef = useRef();
  const showTimerRef = useRef();
  const lastTargetRef = useRef(null);
  const lastSpeechTimeRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    if (!targetKey) {
      lastTargetRef.current = null;
      return;
    }
    if (targetKey === lastTargetRef.current) return;

    // Rate limit — mobile: 3 seconds. Desktop: 8 seconds.
    const rateLimit = isMobile ? 3000 : 8000;
    const now = performance.now();
    if (now - lastSpeechTimeRef.current < rateLimit) return;

    clearTimeout(showTimerRef.current);
    clearTimeout(hideTimerRef.current);

    // Instant on mobile (no hover flicker to prevent). Small delay on desktop.
    const showDelay = isMobile ? 100 : 600;
    const speechDuration = isMobile ? 4500 : 7000;

    showTimerRef.current = setTimeout(() => {
      lastTargetRef.current = targetKey;
      const lines = SPEECH_LINES[targetKey];
      if (!lines || lines.length === 0) return;
      const chosen = lines[Math.floor(Math.random() * lines.length)];
      setLine(chosen);
      setVisible(true);
      lastSpeechTimeRef.current = performance.now();
      hideTimerRef.current = setTimeout(() => setVisible(false), speechDuration);
    }, showDelay);

    return () => {
      clearTimeout(showTimerRef.current);
      clearTimeout(hideTimerRef.current);
    };
  }, [targetKey, active, isMobile]);

  return { line, visible };
}
function useInvitation(theme) {
  return theme === "light";
}
// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Invitation({ visible, onToggle, isMobile }) {
  const [hovered, setHovered] = useState(false);
  if (!visible) return null;
  return (
    <button
      className={`familiar-door ${isMobile ? 'familiar-door--mobile' : ''} ${hovered ? 'familiar-door--hovered' : ''}`}
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Switch to dark mode — meet the familiar"
      type="button"
    >
      {hovered && !isMobile && (
        <div className="familiar-door-bubble">
          there's a version of this she likes better
        </div>
      )}
      <img
        src={familiarDoor}
        alt=""
        className="familiar-door-img"
        aria-hidden="true"
      />
    </button>
  );
}

function FamiliarCharacter({ position, frame, facingLeft, speechLine, speechVisible, isMobile, onTap }) {
  if (isMobile) {
    return (
      <div className="familiar-wrap familiar-wrap--mobile" onClick={onTap} role="button" aria-label="Switch to light mode">
        {speechVisible && speechLine && (
          <div className="familiar-speech familiar-speech--mobile">
            {speechLine}
          </div>
        )}
        <img
          src={FRAMES[frame]}
          alt=""
          className={`familiar-img familiar-img--mobile ${facingLeft ? "familiar-img--flipped" : ""}`}
        />
      </div>
    );
  }
  return (
    <div
      className="familiar-wrap"
      style={{
        transform: `translate3d(${position.x - 60}px, ${position.y - 100}px, 0)`,
      }}
      aria-hidden="true"
    >
      {speechVisible && speechLine && (
        <div className="familiar-speech">
          {speechLine}
        </div>
      )}
      <img
        src={FRAMES[frame]}
        alt=""
        className={`familiar-img ${facingLeft ? "familiar-img--flipped" : ""}`}
      />
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Familiar({ theme, toggleTheme }) {
  const isMobile = useIsMobile();

  // Desktop tracking
  const { pos: cursorPos, velocity: cursorVelocity, recentMovementsRef } = useCursor(!isMobile);
  const charPos = useCharacterPosition(cursorPos);
  const hoverTarget = useHoverTarget(!isMobile);

  // Mobile tracking
  const { velocity: scrollVelocity, recentScrollsRef } = useScroll(isMobile);
  const scrollTarget = useScrollTarget(isMobile);

  const target = isMobile ? scrollTarget : hoverTarget;
  const { line, visible: speechVisible } = useSpeech(target, theme === "dark");

  // State machine — different for desktop vs mobile
  const desktopState = useFamiliarStateDesktop(
    cursorPos, cursorVelocity, charPos, speechVisible, recentMovementsRef
  );
  const mobileState = useFamiliarStateMobile(
    scrollVelocity, speechVisible, recentScrollsRef
  );
  const { state, currentFrame: baseFrame, wakeUp } = isMobile ? mobileState : desktopState;

  const showInvite = useInvitation(theme);

  const wasIdleRef = useRef(false);
  useEffect(() => {
    if (state === "idle") wasIdleRef.current = true;
    else if (state === "walking" || state === "running" || state === "standing") {
      wasIdleRef.current = false;
    }
  }, [state]);

  const currentFrame = useSpeakingFrame(baseFrame, speechVisible, state, wasIdleRef.current);

  useEffect(() => {
    if (speechVisible && state === "idle") wakeUp();
  }, [speechVisible, state, wakeUp]);

  const facingLeft = true;

  // Reduce motion
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e) => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  if (reduced) return null;

  return (
    <>
      <style>{FAMILIAR_CSS}</style>
      {theme === "dark" && (
        <FamiliarCharacter
          position={charPos}
          frame={currentFrame}
          facingLeft={facingLeft}
          speechLine={line}
          speechVisible={speechVisible}
          isMobile={isMobile}
          onTap={isMobile ? toggleTheme : undefined}
        />
      )}
      {theme === "light" && (
        <Invitation visible={showInvite} onToggle={toggleTheme} isMobile={isMobile} />
      )}
    </>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const FAMILIAR_CSS = `
.familiar-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 950;
  pointer-events: none;
  will-change: transform;
  transition: transform 0.05s linear;
}

/* Mobile — fixed bottom-right, tappable */
.familiar-wrap--mobile {
  position: fixed;
  bottom: 20px;
  right: 16px;
  top: auto;
  left: auto;
  z-index: 950;
  pointer-events: auto;
  cursor: pointer;
  transform: none !important;
  will-change: auto;
  transition: transform 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.familiar-wrap--mobile:active {
  transform: scale(0.92) !important;
}

.familiar-img {
  width: 120px;
  height: auto;
  display: block;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.35));
  transition: transform 0.3s ease;
}

.familiar-img--mobile {
  width: 75px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
}

.familiar-img--flipped {
  transform: scaleX(-1);
}

.familiar-speech {
  position: absolute;
  bottom: calc(100% - 20px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface-raised);
  color: var(--white);
  border: 1px solid var(--accent);
  padding: 10px 14px;
  border-radius: 12px;
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  line-height: 1.55;
  width: max-content;
  max-width: 280px;
  white-space: normal;
  word-wrap: break-word;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  animation: familiarSpeechIn 0.3s ease;
}

/* Mobile speech — anchored above chibi, centered, narrower */
.familiar-speech--mobile {
  bottom: calc(100% + 8px);
  left: auto;
  right: 0;
  transform: none;
  max-width: 220px;
  font-size: 0.68rem;
  padding: 8px 12px;
  animation: familiarSpeechInMobile 0.3s ease;
}

.familiar-speech--mobile::after {
  left: auto;
  right: 30px;
  transform: rotate(45deg);
}

.familiar-speech::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 10px;
  height: 10px;
  background: var(--surface-raised);
  border-right: 1px solid var(--accent);
  border-bottom: 1px solid var(--accent);
}

@keyframes familiarSpeechIn {
  from { opacity: 0; transform: translateX(-50%) translateY(6px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

@keyframes familiarSpeechInMobile {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.familiar-door {
  position: fixed;
  top: 60px;
  right: -27px;
  z-index: 999;
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: none;
  padding: 0;
  cursor: pointer;
  animation: familiarDoorIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition: transform 0.25s ease, filter 0.25s ease;
  transform-origin: right center;
}

/* Mobile door — top-right, tucked under the hamburger menu */
.familiar-door--mobile {
  top: 70px;   /* just below the hamburger — adjust if your nav height differs */
  right: -18px;
  -webkit-tap-highlight-color: transparent;
}

.familiar-door--mobile .familiar-door-img {
  width: 80px;
}

.familiar-door--mobile:active {
  transform: scale(0.94);
}

.familiar-door--mobile .familiar-door-img {
  width: 90px;
}

.familiar-door--mobile:active {
  transform: scale(0.94);
}

.familiar-door-img {
  width: 110px;
  height: auto;
  display: block;
  background: transparent !important;
  filter: drop-shadow(0 6px 16px var(--shadow-strong));
}

.familiar-door:hover,
.familiar-door--hovered {
  transform: scale(1.06);
  filter: drop-shadow(0 4px 20px rgba(74, 119, 88, 0.35));
}

.familiar-door:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 8px;
}

.familiar-door-bubble {
  position: absolute;
  top: 30px;
  right: calc(100% + 12px);
  width: max-content;
  max-width: 220px;
  background: var(--surface);
  color: var(--white);
  border: 1px solid var(--accent);
  padding: 10px 14px;
  border-radius: 12px;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  line-height: 1.5;
  text-align: left;
  box-shadow: 0 8px 24px var(--shadow-strong);
  animation: familiarBubbleIn 0.25s ease;
  pointer-events: none;
}

.familiar-door-bubble::after {
  content: '';
  position: absolute;
  top: 14px;
  right: -6px;
  transform: rotate(45deg);
  width: 10px;
  height: 10px;
  background: var(--surface);
  border-top: 1px solid var(--accent);
  border-right: 1px solid var(--accent);
}

@keyframes familiarDoorIn {
  from { opacity: 0; transform: translateY(-20px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes familiarBubbleIn {
  from { opacity: 0; transform: translateX(6px); }
  to { opacity: 1; transform: translateX(0); }
}
`;