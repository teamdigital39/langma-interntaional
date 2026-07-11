import React, { useState, useEffect, useRef } from "react";
import PopupForm from "./PopupForm";
import FAQ from "./FAQ";

/**
 * Study in South Korea — Langma International
 * Palette matches the Study in Poland page (teal brand accent over navy panels)
 */
import { STUDY_ABROAD_COLORS as C, STUDY_ABROAD_FONTS_URL, STUDY_ABROAD_BODY_FONT } from "../../theme/brandTheme";

/* ===================================================================
 *  Hooks
 * ================================================================ */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCountUp(target, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

/* ===================================================================
 *  Reveal wrapper
 * ================================================================ */
function Reveal({ children, delay = 0, y = 24, as: Tag = "div", style }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ===================================================================
 *  Animated counter stat
 * ================================================================ */
function BoardingStat({ prefix = "", value, suffix = "", label, sub, delay }) {
  const [ref, visible] = useReveal();
  const animated = useCountUp(value, 1500, visible);
  return (
    <div
      ref={ref}
      style={{
        flex: "1 1 0",
        minWidth: 150,
        padding: "26px 22px",
        borderRight: `1px solid ${C.border}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: "clamp(30px, 3.2vw, 42px)",
          fontWeight: 600,
          color: C.gold,
          lineHeight: 1,
          letterSpacing: "-0.5px",
          display: "flex",
          alignItems: "baseline",
          gap: 2,
        }}
      >
        <span style={{ color: C.goldL, fontSize: "0.7em" }}>{prefix}</span>
        {animated}
        <span style={{ color: C.goldL, fontSize: "0.7em" }}>{suffix}</span>
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "1.8px",
          textTransform: "uppercase",
          color: C.slate,
        }}
      >
        {label}
      </div>
      <div style={{ marginTop: 4, fontSize: 11.5, color: C.muted }}>
        {sub}
      </div>
    </div>
  );
}

/* ===================================================================
 *  Section header
 * ================================================================ */
function SectionHead({ style, tag, title, sub, light, center }) {
  return (
    <Reveal>
      <div
        style={{
          marginBottom: 52,
          maxWidth: 760,
          margin: center ? "0 auto 52px" : "0 0 52px 0",
          textAlign: center ? "center" : "left",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            padding: "6px 14px 6px 8px",
            background: C.goldSoft,
            border: "1px solid rgba(47,199,161,0.22)",
            borderRadius: 999,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              background: C.navy,
              borderRadius: "50%",
              boxShadow: "0 0 0 4px rgba(47,199,161,0.15)",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: C.navy,
            }}
          >
            {tag}
          </span>
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 3.6vw, 46px)",
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: "-0.6px",
            color: C.ink,
            margin: 0,
            marginBottom: sub ? 16 : 0,
          }}
        >
          {title}
        </h2>
        {sub && (
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: C.slate,
              margin: 0,
              maxWidth: 640,
              marginLeft: center ? "auto" : 0,
              marginRight: center ? "auto" : 0,
            }}
          >
            {sub}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/* ===================================================================
 *  Buttons
 * ================================================================ */
function NavyButton({ children, style, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      onClick={onClick}
      style={{
        position: "relative",
        background: h ? C.dark : C.navy,
        color: C.white,
        border: "none",
        padding: "15px 32px",
        fontSize: 14.5,
        fontWeight: 700,
        letterSpacing: "0.3px",
        cursor: "pointer",
        transform: h ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.25s cubic-bezier(.2,.7,.2,1)",
        borderRadius: 999,
        boxShadow: h
          ? `0 14px 30px -10px rgba(26,46,90,0.45)`
          : `0 6px 18px -8px rgba(26,46,90,0.3)`,
        overflow: "hidden",
        ...style,
      }}
    >
      <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)`,
          transform: h ? "translateX(100%)" : "translateX(-100%)",
          transition: "transform 0.8s ease",
        }}
      />
    </button>
  );
}

function GhostButton({ children, dark, style, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      onClick={onClick}
      style={{
        padding: "14px 28px",
        fontSize: 14.5,
        fontWeight: 600,
        letterSpacing: "0.3px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        borderRadius: 999,
        color: dark ? C.ink : "#ffffff",
        border: dark ? `2px solid ${C.gold}` : `1px solid rgba(255,255,255,0.25)`,
        background: dark ? (h ? C.goldSoft : C.white) : "rgba(240,192,64,0.1)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ===================================================================
 *  Reason card
 * ================================================================ */
function ReasonCard({ num, title, body, icon, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: "relative",
          background: C.white,
          padding: "32px 28px",
          transition: "all 0.35s cubic-bezier(.2,.7,.2,1)",
          border: `1px solid ${h ? C.navy : C.border}`,
          borderRadius: 18,
          transform: h ? "translateY(-6px)" : "translateY(0)",
          boxShadow: h
            ? `0 22px 40px -22px rgba(26,46,90,0.35)`
            : `0 1px 0 rgba(0,0,0,0.02)`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 80,
            height: 80,
            background: `radial-gradient(circle at top right, ${C.goldSoft}, transparent 70%)`,
            opacity: h ? 1 : 0.5,
            transition: "opacity 0.3s ease",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              background: h ? C.navy : C.goldTint,
              color: h ? C.white : C.navy,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              transition: "all 0.3s ease",
              transform: h ? "rotate(-6deg) scale(1.05)" : "rotate(0)",
            }}
          >
            {icon}
          </div>
          <span
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: h ? C.gold : C.goldSoft,
              lineHeight: 1,
              transition: "color 0.3s ease",
            }}
          >
            {num}
          </span>
        </div>
        <h4
          style={{
            fontSize: 16.5,
            fontWeight: 700,
            color: C.ink,
            marginBottom: 10,
            lineHeight: 1.35,
          }}
        >
          {title}
        </h4>
        <p style={{ fontSize: 13.5, color: C.slate, lineHeight: 1.75, margin: 0 }}>
          {body}
        </p>
      </div>
    </Reveal>
  );
}

/* ===================================================================
 *  Fact row
 * ================================================================ */
function FactRow({ label, value }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? C.goldSoft : "transparent",
        padding: "18px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        borderBottom: `1px solid ${C.border}`,
        transition: "background 0.2s ease",
      }}
    >
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: C.slate,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13.5,
          fontWeight: 600,
          color: "white",
          textAlign: "right",
          transition: "color 0.2s ease",
        }}
      >
        {value}
      </span>
    </div>
  );
}

/* ===================================================================
 *  Cost card
 * ================================================================ */
function CostCard({ label, amount, note, highlight, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: highlight ? C.goldSoft : h ? C.goldSoft : C.white,
          padding: "32px 22px",
          textAlign: "center",
          transition: "all 0.3s cubic-bezier(.2,.7,.2,1)",
          position: "relative",
          border: `1px solid ${highlight ? C.gold : C.border}`,
          borderRadius: 16,
          transform: h ? "translateY(-4px)" : "translateY(0)",
          boxShadow: h ? `0 16px 32px -16px rgba(26,46,90,0.3)` : "none",
        }}
      >
        {highlight && (
          <span
            style={{
              position: "absolute",
              top: -10,
              left: "50%",
              transform: "translateX(-50%)",
              background: C.forest,
              color: C.white,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "1.2px",
              padding: "4px 12px",
              borderRadius: 999,
              textTransform: "uppercase",
            }}
          >
            ★ Best Value
          </span>
        )}
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: C.slate,
            marginBottom: 14,
            display: "block",
          }}
        >
          {label}
        </span>
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: C.ink,
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          {amount}
        </div>
        <div
          style={{
            fontSize: 12,
            color: C.slate,
            lineHeight: 1.5,
          }}
        >
          {note}
        </div>
      </div>
    </Reveal>
  );
}

/* ===================================================================
 *  Course card
 * ================================================================ */
function CourseCard({ num, title, body, icon, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: "relative",
          background: h ? C.goldSoft : C.white,
          border: `1px solid ${h ? C.gold : C.border}`,
          padding: "28px 24px",
          borderRadius: 16,
          transition: "all 0.35s cubic-bezier(.2,.7,.2,1)",
          transform: h ? "translateY(-6px)" : "translateY(0)",
          boxShadow: h ? `0 22px 40px -20px rgba(26,46,90,0.4)` : "none",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            background: h ? C.gold : C.goldTint,
            color: h ? C.white : C.navy,
            fontSize: 15,
            fontWeight: 700,
            borderRadius: 10,
            marginBottom: 14,
            transition: "all 0.3s ease",
          }}
        >
          {icon || num}
        </div>
        <div
          style={{
            fontSize: 14.5,
            fontWeight: 700,
            color: C.ink,
            marginBottom: 8,
            lineHeight: 1.35,
            transition: "color 0.3s ease",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 12.5,
            color: C.slate,
            lineHeight: 1.7,
            transition: "color 0.3s ease",
          }}
        >
          {body}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 18,
            right: 22,
            color: h ? C.gold : "transparent",
            fontSize: 18,
            transition: "all 0.3s ease",
            transform: h ? "translateX(0)" : "translateX(-8px)",
          }}
        >
          →
        </div>
      </div>
    </Reveal>
  );
}

/* ===================================================================
 *  Visa step
 * ================================================================ */
function VisaStep({ n, title, body, isLast, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: 22,
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.6s ease ${delay}ms`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 44,
            height: 44,
            background: C.dark,
            color: C.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 700,
            flexShrink: 0,
            borderRadius: "50%",
            boxShadow: `0 6px 14px -4px rgba(26,46,90,0.4)`,
          }}
        >
          {n}
        </div>
        {!isLast && (
          <div
            style={{
              width: 2,
              flex: 1,
              background: `linear-gradient(180deg, ${C.gold}, transparent)`,
              marginTop: 6,
              marginBottom: 6,
            }}
          />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 32, flex: 1 }}>
        <h4
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: C.ink,
            margin: 0,
            marginBottom: 8,
          }}
        >
          {title}
        </h4>
        <p style={{ fontSize: 13.5, color: C.slate, lineHeight: 1.75, margin: 0 }}>
          {body}
        </p>
      </div>
    </div>
  );
}

/* ===================================================================
 *  Outlook card (used for Work & Career opportunities)
 * ================================================================ */
function OutlookCard({ tag, title, body, icon, delay }) {
  return (
    <Reveal delay={delay}>
      <div
        style={{
          background: C.white,
          padding: "30px 26px",
          borderRadius: 18,
          border: `1px solid ${C.border}`,
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 110,
            height: 110,
            background: `radial-gradient(circle, ${C.goldSoft} 0%, transparent 70%)`,
            opacity: 0.6,
          }}
        />
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: C.goldTint,
            color: C.navy,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            marginBottom: 18,
            position: "relative",
          }}
        >
          {icon}
        </div>
        <span
          style={{
            display: "inline-block",
            background: C.cream,
            color: C.navy,
            fontSize: 10.5,
            fontWeight: 700,
            padding: "4px 12px",
            letterSpacing: "1px",
            marginBottom: 14,
            textTransform: "uppercase",
            borderRadius: 999,
            border: `1px solid ${C.goldSoft}`,
          }}
        >
          {tag}
        </span>
        <h4
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: C.ink,
            marginBottom: 10,
            lineHeight: 1.4,
          }}
        >
          {title}
        </h4>
        <p style={{ fontSize: 13.5, color: C.slate, lineHeight: 1.75, margin: 0 }}>
          {body}
        </p>
      </div>
    </Reveal>
  );
}

/* ===================================================================
 *  Support card
 * ================================================================ */
function SupportCard({ icon, title, body, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: h ? C.goldSoft : C.white,
          padding: "32px 28px",
          border: `1px solid ${h ? C.gold : C.border}`,
          borderRadius: 18,
          transition: "all 0.3s ease",
          height: "100%",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: h ? C.gold : "rgba(240,192,64,0.15)",
            color: h ? C.navyD : C.gold,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            marginBottom: 18,
            transition: "all 0.3s ease",
            transform: h ? "rotate(-6deg)" : "rotate(0)",
          }}
        >
          {icon}
        </div>
        <h4 style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 8 }}>
          {title}
        </h4>
        <p
          style={{
            fontSize: 13,
            color: C.slate,
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {body}
        </p>
      </div>
    </Reveal>
  );
}

/* ===================================================================
 *  FAQ accordion
 * ================================================================ */
function FAQItem({ q, a, isOpen, onClick }) {
  const ref = useRef(null);
  return (
    <div
      style={{
        borderBottom: `1px solid ${C.border}`,
        background: isOpen ? C.white : "transparent",
        transition: "background 0.3s ease",
        borderRadius: 12,
        marginBottom: 4,
        padding: "0 18px",
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          padding: "22px 0",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          fontSize: 15,
          fontWeight: 600,
          color: isOpen ? C.navy : C.ink,
          transition: "color 0.2s ease",
        }}
      >
        {q}
        <span
          style={{
            width: 30,
            height: 30,
            background: isOpen ? C.navy : C.goldTint,
            color: isOpen ? C.white : C.navy,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            flexShrink: 0,
            transition: "all 0.3s ease",
            transform: isOpen ? "rotate(45deg)" : "rotate(0)",
          }}
        >
          +
        </span>
      </button>
      <div
        ref={ref}
        style={{
          maxHeight: isOpen ? (ref.current?.scrollHeight || 500) + "px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s ease, padding-bottom 0.3s ease",
          paddingBottom: isOpen ? 22 : 0,
        }}
      >
        <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.85, margin: 0 }}>{a}</p>
      </div>
    </div>
  );
}

/* ===================================================================
 *  Marquee strip
 * ================================================================ */
function Marquee() {
  const items = [
    "🇰🇷 South Korea 2026 Intake Open",
    "✦ 170K+ International Students",
    "✦ Tuition from ₩3.7M/Semester",
    "✦ English-Taught Programs",
    "✦ Part-Time Work Rights",
    "✦ D-2 Student Visa",
    "✦ Asia's Innovation Capital",
    "✦ Spring & Fall Intakes",
  ];
  const loop = [...items, ...items];
  return (
    <div
      style={{
        background: C.white,
        color: C.navy,
        padding: "14px 0",
        overflow: "hidden",
        position: "relative",
        borderTop: `1px solid rgba(240,192,64,0.15)`,
        borderBottom: `1px solid rgba(240,192,64,0.15)`,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 48,
          whiteSpace: "nowrap",
          animation: "lm-marquee 35s linear infinite",
        }}
      >
        {loop.map((t, i) => (
          <span key={i} style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.8px" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ===================================================================
 *  Scroll progress bar
 * ================================================================ */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", on);
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        width: `${p}%`,
        background: `linear-gradient(90deg, ${C.navy}, ${C.gold}, ${C.forest})`,
        zIndex: 200,
        transition: "width 0.1s linear",
      }}
    />
  );
}

/* ===================================================================
 *  DATA — South Korea content
 * ================================================================ */
const reasons = [
  { icon: "🤖", title: "World-Leading Technology Ecosystem", body: "Home to Samsung, LG, Hyundai, SK Hynix, and Kakao — South Korea ranks in the world's top tier for R&D investment as a share of GDP. Study where the technology shaping your future is actually being built." },
  { icon: "🎓", title: "Globally Respected Academic Institutions", body: "South Korean universities consistently appear in QS and THE world rankings. Programs in engineering, computer science, business, and design are internationally recognised and sought-after by global employers." },
  { icon: "💰", title: "Affordable Tuition vs Western Alternatives", body: "Tuition fees are significantly lower than universities in the US, UK, or Australia, making South Korea one of the most financially accessible developed-world study destinations available to international students." },
  { icon: "🛡️", title: "Exceptionally Safe Country", body: "South Korea consistently ranks among the safest nations in the world. Low crime rates, excellent healthcare infrastructure, and a high standard of public safety make it an ideal environment for international students." },
  { icon: "🌏", title: "Gateway to the Asian Career Market", body: "South Korea sits at the heart of Northeast Asia. A degree here opens pathways not just in Korea, but across Japan, China, Singapore, and the broader ASEAN region — the world's fastest-growing economic zone." },
  { icon: "🌐", title: "Growing English-Taught Program Portfolio", body: "Many leading Korean universities now offer fully English-medium degree tracks across disciplines — from AI and engineering to global business and design arts — specifically designed for international students." },
  { icon: "🎵", title: "Korean Culture Is a Global Phenomenon", body: "K-pop, K-drama, K-beauty, Korean cuisine — South Korea's cultural influence is unprecedented. Studying here means immersing yourself in a culture the world is actively watching, and building a truly unique personal brand." },
  { icon: "📶", title: "World's Fastest Internet & Smart Infrastructure", body: "South Korea leads global rankings for internet speed and digital infrastructure. Studying here means access to a hyper-connected academic and social environment that matches your generation's pace." },
];

const courses = [
  { icon: "🤖", title: "Artificial Intelligence", body: "Machine learning, deep learning, AI systems — taught at institutions leading Asia's AI research frontier." },
  { icon: "💻", title: "Computer Science & Engineering", body: "Software engineering, cybersecurity, computer engineering and information systems." },
  { icon: "⚙️", title: "Mechanical & Electrical Engineering", body: "Semiconductor engineering, automotive, eco-energy, and electrical ICT engineering." },
  { icon: "🎮", title: "Animation, Gaming & Webtoon", body: "South Korea is a global leader in gaming and webtoon culture — study in the industry's home market." },
  { icon: "📊", title: "Business & Global Management", body: "International business, accounting, economics, finance, and trade — English-medium tracks available." },
  { icon: "📺", title: "Media & Communication", body: "Visual content, advertising, PR, and media studies — in the heart of Hallyu's creative economy." },
  { icon: "🗣️", title: "Korean Language Studies", body: "Korean language education, interpretation, and translation programs — an invaluable career differentiator." },
  { icon: "💄", title: "Fashion, Beauty & Aesthetics", body: "Fashion design, hair design, makeup, skin care — study in one of the world's leading beauty industries." },
  { icon: "🏨", title: "Hospitality & Tourism Management", body: "Tourism, airline management, hotel operations, and food service management." },
  { icon: "📡", title: "Data Science & Analytics", body: "Applied data science, information engineering, and smart systems in a data-first economy." },
  { icon: "🦾", title: "Robotics & Smart Systems", body: "Advanced robotics, automation, and smart manufacturing — Korea is a world leader in industrial robotics." },
  { icon: "🔬", title: "Biotechnology & Health Sciences", body: "Health sciences, biotech, food science, animal resources, and companion animal industries." },
];

const faqs = [
  { q: "Is IELTS mandatory to study in South Korea?", a: "For English-taught programs, an IELTS score of 5.5 or TOEFL iBT 51 is the typical minimum requirement. For Korean-medium programs, TOPIK Level 3 or above is generally required. Students from countries where English is the official medium of education may qualify for exemptions — this varies by institution. Our advisors will confirm the exact requirement for your chosen program." },
  { q: "Can I work part-time while studying in South Korea?", a: "Yes. International students on a valid D-2 student visa are permitted to work part-time in South Korea. Bachelor's students may work up to 20 hours per week during academic sessions. Master's students may work up to 30 hours per week during academic sessions. During official university vacation periods, full-time work may be permitted. University and immigration authority approval is required." },
  { q: "What is the student visa process for South Korea?", a: "After receiving your official Certificate of Admission, you apply for a D-2 student visa at the Korean Embassy or Visa Application Centre in your home country. You'll need your admission letter, valid passport, financial proof — Bank Balance Certificate showing approximately KRW 16,000,000 – KRW 25,000,000 (Approx. INR 9.5 Lakhs – INR 15 Lakhs) — academic certificates, and family/birth documents. Langma International provides step-by-step guidance through this process." },
  { q: "Is South Korea affordable for Indian students?", a: "South Korea is considered one of the more accessible developed-country study destinations. Tuition fees typically range from approximately KRW 3,700,000 to 5,500,000 per semester (Approx. INR 2.25 Lakhs – INR 3.35 Lakhs) depending on your field of study. Monthly living expenses generally range from KRW 600,000 to 1,000,000 (Approx. INR 36,000 – INR 60,500). Merit-based tuition benefits linked to TOPIK or IELTS scores can reduce costs further." },
  { q: "Are English-taught programs available in South Korea?", a: "Yes. Many Korean universities have dedicated English-medium degree tracks, particularly in business, AI, computer engineering, media, design, and global studies. These programs do not require Korean language proficiency for admission. IELTS 5.5 or TOEFL iBT 51 is the typical minimum requirement for English-track programs." },
  { q: "What are the popular intakes in South Korea?", a: "South Korean universities offer two main intakes: the Spring semester (starting March) and the Fall semester (starting September). The Fall intake is the most popular for international students and typically has the widest program availability. Some institutions run multiple admission rounds within each intake." },
  { q: "What is TOPIK and why does it matter?", a: "TOPIK (Test of Proficiency in Korean) is the standard Korean language proficiency test for non-native speakers. It is required for admission to Korean-medium programs and is also the primary criterion for merit-based tuition benefits — higher TOPIK levels can qualify students for significant tuition reductions, in some cases covering up to 100% of tuition for multiple semesters." },
];

const support = [
  { icon: "🎯", title: "Profile-Matched Admissions Guidance", body: "We analyse your academic history, language scores, and goals to recommend only the most suitable and realistic options — no false promises." },
  { icon: "📑", title: "Complete Document Assistance", body: "From Apostille guidance to SOP writing, bank certificate advice, and transcript preparation — we ensure your documentation is correct and professionally presented." },
  { icon: "🛂", title: "Visa Application Support", body: "We walk you through the D-2 visa documentation checklist, common pitfalls, and consulate-specific requirements — with genuine expertise, not guarantees." },
  { icon: "🗣️", title: "TOPIK & Language Strategy", body: "For students targeting Korean-medium programs or merit scholarships linked to TOPIK scores, we help you understand the timeline and preparation pathway." },
  { icon: "✈️", title: "Pre-Departure Readiness", body: "Banking setup, SIM cards, accommodation options, campus registration — we give you a practical, honest pre-departure briefing so you arrive prepared." },
  { icon: "💬", title: "Post-Arrival Check-In", body: "Our commitment doesn't end at departure. We follow up with enrolled students to support their initial settlement — because we care about outcomes, not just applications." },
];

const outlooks = [
  { icon: "🕒", tag: "During Studies", title: "Part-Time Work Rights", body: "Bachelor's students may work up to 20 hours/week during academic sessions; Master's students up to 30 hours/week. Full-time work is possible during approved vacation periods, subject to immigration and university approval." },
  { icon: "🏭", tag: "Internships", title: "Industry Internship Ecosystem", body: "South Korea's internship culture is strong, particularly in technology, media, design, and business, with many universities maintaining formal industry partnerships." },
  { icon: "🏢", tag: "Global Employers", title: "Korea's World-Class Companies", body: "Samsung, Hyundai, LG, SK Group, Kakao, Naver, Lotte, and hundreds of global MNCs operate out of South Korea — strong demand for graduates with local degrees." },
  { icon: "🚀", tag: "Post-Study", title: "Post-Graduation Pathways", body: "Graduates can explore post-study visa options including the D-10 Job Seeker visa, allowing time to secure employment in South Korea, subject to prevailing immigration regulations." },
];

const careerTags = [
  "Semiconductor Technology", "Artificial Intelligence & ML", "Electric Vehicle Engineering", "Gaming & Esports",
  "K-Content & Media", "K-Beauty & Fashion", "Biotechnology & Pharma", "Smart Manufacturing",
  "Fintech & Digital Banking", "E-Commerce & Logistics", "Tourism & Hospitality", "Global Supply Chain",
  "Architecture & Interior Design", "Healthcare & Rehabilitation",
];

const visaDocs = [
  "Valid international passport (min. 6 months validity beyond study period)",
  "Official Certificate of Admission from the Korean institution",
  "Bank Balance Certificate — approx. KRW 16,000,000–25,000,000 (approx. INR 9.5L–15L) in applicant's or parent's name, issued within 30 days",
  "High school graduation certificate (Apostilled or consulate-verified)",
  "Academic transcripts (covering all grades)",
  "Birth certificate or family relationship document (with certified translation)",
  "Copy of parent's passport or government-issued ID",
  "Completed visa application form and passport-size photographs",
  "Language proficiency certificate (IELTS, TOEFL iBT, or TOPIK as applicable)",
  "Certified Korean or English translation for documents in other languages",
];

/* ===================================================================
 *  MAIN
 * ================================================================ */
export default function StudySouthKoreaPage() {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        fontFamily: STUDY_ABROAD_BODY_FONT,
        color: C.ink,
        background: C.cream,
        lineHeight: 1.6,
        textAlign: "left",
      }}
    >
      <style>{`
        @import url('${STUDY_ABROAD_FONTS_URL}');
        a { text-decoration: none; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${C.navy}; color: ${C.white}; }

        @keyframes lm-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes lm-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes lm-pulse {
          0%, 100% { transform: scale(1);   opacity: 0.7; }
          50%      { transform: scale(1.4); opacity: 0; }
        }
        @keyframes lm-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes lm-bg-shift {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        .lm-grad-text {
          background: linear-gradient(120deg, ${C.goldL}, ${C.gold}, ${C.goldL});
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: lm-bg-shift 6s ease infinite;
        }
      `}</style>

      <ScrollProgress />

      {/* ---------------- HERO ---------------- */}
      <section className="bg-[#F5F8F6] overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 items-center gap-12">

            {/* Left Content */}
            <div className="z-10">
              <h1
                className="text-[#1B2B28]"
                style={{
                  fontSize: "clamp(28px, 3.6vw, 46px)",
                  fontWeight: 600,
                  lineHeight: 1.12,
                  letterSpacing: "-0.6px",
                }}
              >
                Study In <span className="text-[#2FC7A1]">South Korea</span>
                <br />
                Asia's Innovation Hub
                <br />
                For Your Future.
              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
                World-Ranked Universities. English-Taught Programs. A career
                gateway to Asia's most dynamic economy. South Korea leads the
                world in technology, innovation, and academic excellence —
                from AI and semiconductors to design and K-culture, your
                future starts here.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  "✓170K+ International Students",
                  "✓English-Taught Programs",
                  "✓Part-Time Work Rights",
                  "✓D-2 Student Visa",
                  "✓Spring & Fall Intakes",
                ].map((item, index) => (
                  <span
                    key={index}
                    className="bg-[#2FC7A1] text-white px-4 py-2 rounded-full text-sm md:text-base"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-[#1A2540] hover:bg-[#243160] transition-all text-white px-8 py-4 rounded-full font-semibold text-lg cursor-pointer"
                >
                  Apply for 2026 Intake →
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="border border-[#1A2540] text-[#1A2540] hover:bg-[#1A2540] hover:text-white transition-all px-8 py-4 rounded-full font-semibold text-lg cursor-pointer"
                >
                  Check Eligibility
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center lg:justify-end">

              {/* Decorative Rectangle */}
              <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-50 h-[490px] bg-[#296166] rounded-[24px]"></div>

              {/* Dots */}
              <div className="hidden lg:grid absolute left-12 top-1/2 -translate-y-1/2 grid-cols-12 gap-4 z-0">
                {[...Array(180)].map((_, i) => (
                  <span key={i} className="w-2 h-2 rounded-full bg-[#E6F8F3]"></span>
                ))}
              </div>

              {/* Circle Image */}
              <div className="relative z-10">
                <div className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px] rounded-full overflow-hidden">
                  <img
                    src="images/skv.jpeg"
                    alt="Study in South Korea"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Hero stats strip */}
          <Reveal delay={200}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 18,
                overflow: "hidden",
                marginTop: 56,
              }}
            >
              <BoardingStat value={170} suffix="K+" label="International Students" sub="Studying in Korea" delay={100} />
              <BoardingStat prefix="₩" value={3700000} label="From / Semester" sub="Tuition fee (KRW)" delay={250} />
              <BoardingStat value={20} suffix="hrs" label="Part-Time Work / Week" sub="Bachelor's students" delay={400} />
              <BoardingStat value={2} label="Intakes / Year" sub="March & September" delay={550} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <Marquee />

      {/* ---------------- WHY SOUTH KOREA ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Why South Korea</span>}
            title={
              <span style={{ color: "#296166" }}>
                8 Reasons South Korea Is the Smartest Study Choice of 2026
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                A country that invented the future — and invites the world to study in it. Here's why thousands of international students are choosing South Korea every year.
              </span>
            }
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            {reasons.map((r, i) => (
              <ReasonCard
                key={r.title}
                num={String(i + 1).padStart(2, "0")}
                title={r.title}
                body={r.body}
                icon={r.icon}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- STRIP CTA ---------------- */}
      <div
        style={{
          background: C.goldSoft,
          padding: "26px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)`,
            backgroundSize: "200% 100%",
            animation: "lm-shimmer 6s linear infinite",
          }}
        />
        <p style={{ color: C.ink, fontSize: 15.5, fontWeight: 600, margin: 0, position: "relative", zIndex: 2 }}>
          ✨ Not sure if South Korea is right for you? Let our Korea specialists assess your profile — free, no obligation.
        </p>
        <button
          style={{
            background: C.white,
            color: C.navy,
            border: "none",
            padding: "12px 28px",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.5px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            borderRadius: 999,
            transition: "all 0.25s ease",
            position: "relative",
            zIndex: 2,
          }}
          onMouseEnter={(e) => {
            e.target.style.color = C.navy;
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = C.white;
            e.target.style.color = C.navy;
            e.target.style.transform = "translateY(0)";
          }}
          onClick={() => setOpen(true)}
        >
          Get Free Profile Evaluation →
        </button>
      </div>

      {/* ---------------- AT A GLANCE FACTS ---------------- */}
      <section
        style={{
          background: C.cream2,
          padding: "100px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: 400,
            height: 400,
            background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`,
            opacity: 0.06,
            filter: "blur(20px)",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead
            tag="At a Glance"
            title="South Korea — Key Facts for International Students"
            sub="The essential information you need before you begin your application journey."
            light
          />
          <Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 24,
              }}
            >
              <div
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <FactRow label="Capital City" value="Seoul" />
                <FactRow label="Currency" value="South Korean Won (KRW) · ₩1,000 ≈ ₹62 approx." />
                <FactRow label="Official Language" value="Korean · English-medium tracks widely available" />
                <FactRow label="Top Student Cities" value="Seoul · Busan · Daegu · Incheon · Daejeon · Gwangju" />
                <FactRow label="Intakes" value="Spring (March) · Fall (September)" />
                <FactRow label="English Requirement" value="IELTS 5.5 / TOEFL iBT 51 · TOPIK Level 3+ (Korean track)" />
              </div>
              <div
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <FactRow label="Tuition (Per Semester)" value="₩3.7M – ₩5.5M (≈ INR 2.25L – 3.35L)" />
                <FactRow label="Average Living Costs" value="₩600K – ₩1M / month (≈ INR 36K – 60.5K)" />
                <FactRow label="On-Campus Dormitory" value="₩793K – ₩915K / semester · twin room" />
                <FactRow label="Part-Time Work Rights" value="Bachelor's: 20 hrs/wk · Master's: 30 hrs/wk" />
                <FactRow label="Student Visa Type" value="D-2 Student Visa" />
                <FactRow label="Financial Proof Required" value="₩16M – ₩25M (≈ INR 9.5L – 15L)" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- COSTS ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Cost of Study</span>}
            title={<span style={{ color: "#296166" }}>Estimated Study Costs in South Korea</span>}
            sub={
              <span style={{ color: "#296166" }}>
                South Korea offers excellent academic value. These are approximate ranges to help you plan your budget — actual costs vary by city, institution, and lifestyle.
              </span>
            }
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            <CostCard label="Tuition / Semester" amount="₩3.7M–5.5M" note="≈ INR 2.25L–3.35L · Humanities to Engineering & Arts" delay={0} />
            <CostCard label="Accommodation / Month" amount="₩200K–500K" note="≈ INR 12,000–30,000/mo · Dormitory to private room" highlight delay={80} />
            <CostCard label="Food / Month" amount="₩200K–400K" note="≈ INR 12,000–24,000/mo · Canteen to budget restaurants" delay={160} />
            <CostCard label="Transport / Month" amount="₩50K–100K" note="≈ INR 3,000–6,000/mo · Metro, bus & intercity travel" delay={240} />
            <CostCard label="Miscellaneous / Month" amount="₩100K–200K" note="≈ INR 6,000–12,000/mo · Data, supplies, personal expenses" delay={320} />
            <CostCard label="Health Insurance" amount="₩70K–120K" note="≈ INR 4,200–7,300/mo · Mandatory for visa holders" delay={400} />
          </div>
        </div>
      </section>

      {/* ---------------- COURSES ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Programs Available</span>}
            title={
              <span style={{ color: "#296166" }}>
                Top Course Categories for International Students
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                South Korea offers internationally competitive programs across an impressive range of disciplines — from deep-tech to creative arts.
              </span>
            }
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            {courses.map((c, i) => (
              <CourseCard
                key={c.title}
                num={String(i + 1).padStart(2, "0")}
                title={c.title}
                body={c.body}
                icon={c.icon}
                delay={i * 70}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- LANGUAGE REQUIREMENTS ---------------- */}
      <section
        style={{
          background: C.white,
          padding: "50px 8px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 50,
            right: -100,
            width: 360,
            height: 360,
            background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`,
            opacity: 0.08,
            filter: "blur(30px)",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead
            style={{ paddingLeft: "24px", paddingRight: "24px" }}
            tag="Language Requirements"
            title="English & Korean Language Pathways"
            sub="South Korea welcomes international students through both English-taught and Korean-medium programs. Here's what you need to know."
            light
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            <Reveal>
              <div
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  padding: 36,
                  borderRadius: 20,
                  backdropFilter: "blur(8px)",
                }}
              >
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: C.white,
                    marginBottom: 22,
                    paddingBottom: 16,
                    borderBottom: `2px solid ${C.gold}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span>🌐</span> English-Medium Programs
                </h3>
                {[
                  ["IELTS Academic", "5.5 or above · Minimum"],
                  ["TOEFL iBT", "51 or above"],
                ].map(([t, s], idx, arr) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "13px 0",
                      borderBottom: idx === arr.length - 1 ? "none" : `1px solid ${C.border}`,
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{t}</span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                          color: C.navy,
                          padding: "4px 12px",
                          background: C.goldSoft,
                        borderRadius: 999,
                      }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    background: "rgba(240,192,64,0.08)",
                    border: "1px solid rgba(240,192,64,0.2)",
                    padding: "16px 18px",
                    marginTop: 22,
                    fontSize: 12.5,
                    color: C.slate,
                    lineHeight: 1.7,
                    borderRadius: 12,
                  }}
                >
                  📌 Higher IELTS/TOEFL scores may qualify you for merit-based fee reductions. IELTS 7.0+ and TOEFL iBT 91+ can unlock significant first-semester tuition benefits at select institutions.
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  padding: 36,
                  borderRadius: 20,
                  backdropFilter: "blur(8px)",
                }}
              >
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: C.white,
                    marginBottom: 22,
                    paddingBottom: 16,
                    borderBottom: `2px solid ${C.gold}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span>🗣️</span> Korean-Medium Programs
                </h3>
                {[
                  ["TOPIK (General)", "Level 3 or above · Standard"],
                  ["Arts & Physical Education Majors", "TOPIK Level 2 accepted"],
                ].map(([t, s], idx, arr) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "13px 0",
                      borderBottom: idx === arr.length - 1 ? "none" : `1px solid ${C.border}`,
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{t}</span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                          color: C.navy,
                          padding: "4px 12px",
                          background: C.goldSoft,
                        borderRadius: 999,
                      }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    background: "rgba(46,125,90,0.08)",
                    border: "1px solid rgba(46,125,90,0.25)",
                    padding: "16px 18px",
                    marginTop: 22,
                    fontSize: 12.5,
                    color: C.slate,
                    lineHeight: 1.7,
                    borderRadius: 12,
                  }}
                >
                  📌 TOPIK scores are also the primary criterion for merit scholarships — higher levels can secure up to 100% tuition waivers for multiple semesters. We help students plan their TOPIK preparation strategy.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- VISA GUIDE ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Visa Process</span>}
            title={
              <span style={{ color: "#296166" }}>
                South Korea D-2 Student Visa — Step-by-Step Guide
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                A clear, accurate overview of the South Korea student visa process. Our advisors guide you through every stage. Visa issuance is at the sole discretion of Korean immigration authorities.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="lm-visa-wrap">
            <div>
              <VisaStep n={1} title="Receive Your Official Admission Letter" body="After completing your application and document submission, you receive your Certificate of Admission from the institution — the foundational document for your visa application." delay={0} />
              <VisaStep n={2} title="Prepare Your Visa Application Documents" body="Gather all required documents including your valid passport, financial proof certificate, academic certificates, family relationship documents, and admission letter." delay={100} />
              <VisaStep n={3} title="Apply at the Korean Embassy / Consulate" body="Submit your complete D-2 visa application at the Korean Embassy or authorised Visa Application Centre in your home country. Apply well in advance of your semester start date." delay={200} />
              <VisaStep n={4} title="Visa Interview (If Required)" body="Some applicants may be called for a visa interview. Our team provides structured interview preparation, helping you demonstrate your genuine intent and preparation to the visa officer." delay={300} />
              <VisaStep n={5} title="Travel & Register on Arrival" body="On arrival in South Korea, register with the immigration office and obtain your Alien Registration Card (ARC) — your official ID and the document that enables part-time work." isLast delay={400} />
            </div>
            <Reveal delay={200}>
              <div
                style={{
                  background: C.cream2,
                  padding: 40,
                  borderRadius: 22,
                  position: "sticky",
                  top: 100,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`,
                    opacity: 0.1,
                  }}
                />
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: C.white,
                    marginBottom: 24,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      background: C.gold,
                      color: C.navyD,
                      borderRadius: 10,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}
                  >
                    📋
                  </span>
                  Key Documents for the D-2 Visa
                </h3>
                {visaDocs.map((d) => (
                  <div
                    key={d}
                    style={{
                      display: "flex",
                      gap: 12,
                      marginBottom: 12,
                      fontSize: 13,
                      color: C.slate,
                      alignItems: "flex-start",
                      lineHeight: 1.6,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        background: "rgba(240,192,64,0.15)",
                        color: C.navy,
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                        flexShrink: 0,
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </span>
                    {d}
                  </div>
                ))}
                <div
                  style={{
                    background: "rgba(240,192,64,0.1)",
                    borderLeft: `3px solid ${C.gold}`,
                    padding: "16px 18px",
                    marginTop: 22,
                    fontSize: 12.5,
                    color: C.slate,
                    lineHeight: 1.75,
                    borderRadius: 8,
                  }}
                >
                  <strong style={{ color: C.navy }}>Financial Proof:</strong> ₩16M–₩25M (≈ INR 9.5L–15L)
                  <br />
                  <strong style={{ color: C.navy }}>Application Fee:</strong> ₩100,000 (≈ INR 6,100)
                  <br />
                  <strong style={{ color: C.navy }}>Visa Type:</strong> D-2 Student Visa
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- WORK & CAREER OUTLOOK ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Work & Career</span>}
            title={
              <span style={{ color: "#296166" }}>
                Work, Intern & Build Your Career in South Korea
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                South Korea's thriving economy and student-friendly work policies make it one of the most career-friendly study destinations in Asia.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
            {outlooks.map((o, i) => (
              <OutlookCard key={o.title} {...o} delay={i * 100} />
            ))}
          </div>
          <Reveal delay={200}>
            <div
              style={{
                marginTop: 28,
                background: "#fff8e6",
                border: `1.5px solid ${C.gold}`,
                borderLeft: `5px solid ${C.gold}`,
                borderRadius: 12,
                padding: "18px 24px",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>⚠️</span>
              <p style={{ margin: 0, fontSize: 13.5, color: "#5a4000", lineHeight: 1.75 }}>
                <strong style={{ color: "#3d2c00" }}>Important Note:</strong> International students in South Korea are generally permitted to engage in part-time employment after completing six months of study, subject to immigration regulations, university policies, academic performance requirements, and obtaining the necessary approvals from both the university and immigration authorities.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- INDUSTRY LANDSCAPE ---------------- */}
      <section style={{ background: C.cream, padding: "70px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Industry Landscape</span>}
            title={<span style={{ color: "#296166" }}>Industries Where Korean Graduates Excel</span>}
            sub={
              <span style={{ color: "#296166" }}>
                South Korea is home to some of the world's most competitive industries. Your degree positions you at the intersection of technology, culture, and commerce in the world's 13th largest economy.
              </span>
            }
          />
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {careerTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    color: C.navy,
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "10px 18px",
                    borderRadius: 999,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- WHY LANGMA ---------------- */}
      <section
        style={{
          background: C.cream2,
          padding: "100px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: 400,
            height: 400,
            background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`,
            opacity: 0.06,
            filter: "blur(20px)",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead
            tag="Your Partner in this Journey"
            title="Why Students Trust Langma International"
            sub="At Langma International, we are not just an admissions agent — we are your strategic partner for global education and career mobility, from your decision to study abroad to your first job."
            light
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 18,
            }}
          >
            {support.map((s, i) => (
              <SupportCard key={s.title} {...s} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA STRIP 2 ---------------- */}
      <div
        style={{
          background: C.goldSoft,
          padding: "26px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <p style={{ color: C.ink, fontSize: 15.5, fontWeight: 600, margin: 0 }}>
          ✨ 2026 Fall intake applications are now open. Seats fill quickly — speak to our Korea team today.
        </p>
        <button
          style={{
            background: C.white,
            color: C.navy,
            border: "none",
            padding: "12px 28px",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.5px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            borderRadius: 999,
          }}
          onClick={() => setOpen(true)}
        >
          Start My Application →
        </button>
      </div>

      {/* ---------------- FAQ ---------------- */}
      <FAQ />
      {/* <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag={<span style={{ color: "#296166" }}>FAQs</span>} title="Frequently Asked Questions" center />
          <Reveal>
            <div style={{ maxWidth: 860, margin: "0 auto" }}>
              {faqs.map((f, i) => (
                <FAQItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  isOpen={openFAQ === i}
                  onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section> */}

      {/* ---------------- FINAL CTA ---------------- */}
      <section
        className="mb-[-40px]"
        style={{
          background: C.cream,
          borderTop: `1px solid ${C.border}`,
          padding: "120px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "20%",
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`,
            opacity: 0.1,
            filter: "blur(40px)",
            animation: "lm-float 10s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "10%",
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${C.forest} 0%, transparent 70%)`,
            opacity: 0.12,
            filter: "blur(40px)",
            animation: "lm-float 13s ease-in-out infinite reverse",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <h2
              style={{
                color: C.ink,
                fontSize: "clamp(32px, 4.5vw, 56px)",
                marginBottom: 20,
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              Your Korean Academic Journey
              <br />
              <em className="lm-grd-text" style={{ fontStyle: "italic" }}>
                Starts With One Conversation.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p
              style={{
                color: C.slate,
                fontSize: 17,
                marginBottom: 48,
                maxWidth: 580,
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.8,
              }}
            >
              Book a free, no-obligation counselling session with our South Korea specialists. We'll evaluate your profile, recommend programs, and map out your complete application roadmap — honestly and accurately.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
              <NavyButton onClick={() => setOpen(true)} style={{ background: C.dark, padding: "16px 36px" }}>
                Book Free Counselling →
              </NavyButton>
              <GhostButton dark onClick={() => setOpen(true)}>Apply Now</GhostButton>
              <GhostButton dark onClick={() => setOpen(true)}>Talk to an Expert</GhostButton>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div style={{ display: "flex", gap: 22, justifyContent: "center", flexWrap: "wrap" }}>
              {["✓ Free Profile Evaluation", "✓ No Hidden Fees", "✓ Expert Korea Advisors", "✓ End-to-End Support"].map((t) => (
                <span key={t} style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600 }}>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER INFO ---------------- */}
      <div
        className="-mb-[70px]"
        style={{
          background: C.cream2,
          padding: "24px 48px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <span style={{ fontSize: 13, color: "#296166", display: "block" }}>
          📍{" "}
          <a
            href="https://www.google.com/maps/place/Langma+International/@28.5700637,77.2214716,765m/data=!3m1!1e3!4m15!1m8!3m7!1s0x390ce25c4343e17b:0x9f40fbe93cafcba5!2s73,+South+Extension+I,+Block+H,+New+Delhi,+Delhi+110049!3b1!8m2!3d28.5700637!4d77.2214716!16s%2Fg%2F11hfk14hwt!3m5!1s0x390ce25dba89c087:0x6b74c7356d18b11a!8m2!3d28.5700396!4d77.2209663!16s%2Fg%2F1jglvgls2?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.navy, textDecoration: "none" }}
          >
            E 73, South Extension Part-1, New Delhi — 110049
          </a>
        </span>

        <span style={{ fontSize: 13, color: C.slate, display: "block" }}>
          📞{" "}
          <a href="tel:+919810117094" style={{ color: C.navy, textDecoration: "none" }}>
            +91-9810117094
          </a>
        </span>

        <span style={{ fontSize: 13, color: C.slate, display: "block" }}>
          ✉️{" "}
          <a href="mailto:info@langmainternational.com" style={{ color: C.navy, textDecoration: "none" }}>
            info@langmainternational.com
          </a>
        </span>
      </div>

      {/* ---------------- RESPONSIVE ---------------- */}
      <style>{`
        @media (max-width: 860px) {
          .lm-visa-wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <PopupForm open={open} onClose={() => setOpen(false)} />
    </div>
  );
}