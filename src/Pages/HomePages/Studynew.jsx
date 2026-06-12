import React, { useState, useEffect, useRef } from "react";

/**
 * Study in Dubai — Langma International
 * Palette referenced from the live site (langmainternational.com):
 *   teal       #1A4F51  (deep brand teal — from site spinner / dark accents)
 *   teal-d     #0F3A3C  (deepest panels)
 *   teal-l     #2A8C8C  (hover / accent)
 *   mint       #76CCD0  (light brand teal — from site spinner highlight)
 *   mint-soft  #C8E8E4  (chip / hover tint)
 *   cream      #F0F8F6  (warm light section bg)
 *   coral      #E08877  (secondary accent / "Dubai" word)
 *   ink        #0E2424  (near-black text)
 *   slate      #5A7474  (muted text)
 */

const C = {
  teal: "#1A4F51",
  tealD: "#0F3A3C",
  tealDark: "#0E2424",
  tealL: "#2A8C8C",
  mint: "#76CCD0",
  mintSoft: "#C8E8E4",
  mintTint: "#E6F4F1",
  cream: "#F0F8F6",
  cream2: "#E1EEEB",
  coral: "#E08877",
  coralL: "#F2B5A8",
  white: "#FFFFFF",
  ink: "#0E2424",
  slate: "#5A7474",
  border: "#D8E6E2",
  muted: "#7A8E8E",
};

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
 *  Reveal wrapper (fade + slide up on scroll)
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
 *  Animated counter stat (used in hero "boarding strip")
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
        borderRight: `1px solid rgba(255,255,255,0.08)`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
        //   fontFamily: "'Fraunces', Georgia, serif",
          fontSize: "clamp(30px, 3.2vw, 42px)",
          fontWeight: 600,
          color: C.mint,
          lineHeight: 1,
          letterSpacing: "-0.5px",
          display: "flex",
          alignItems: "baseline",
          gap: 2,
        }}
      >
        <span style={{ color: C.coralL, fontSize: "0.7em" }}>{prefix}</span>
        {animated}
        <span style={{ color: C.coralL, fontSize: "0.7em" }}>{suffix}</span>
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "1.8px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        {label}
      </div>
      <div style={{ marginTop: 4, fontSize: 11.5, color: "rgba(255,255,255,0.45)" }}>
        {sub}
      </div>
    </div>
  );
}

/* ===================================================================
 *  Section header
 * ================================================================ */
function SectionHead({ tag, title, sub, light, center }) {
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
            background: light ? "rgba(120,192,192,0.12)" : C.mintTint,
            border: `1px solid ${light ? "rgba(120,192,192,0.25)" : C.mintSoft}`,
            borderRadius: 999,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              background: C.teal,
              borderRadius: "50%",
              boxShadow: `0 0 0 4px ${light ? "rgba(120,192,192,0.18)" : "rgba(0,96,96,0.12)"}`,
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: light ? C.mint : C.teal,
            }}
          >
            {tag}
          </span>
        </div>
        <h2
          style={{
            // fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "clamp(28px, 3.6vw, 46px)",
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: "-0.6px",
            color: light ? C.white : C.ink,
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
              color: light ? "rgba(255,255,255,0.62)" : C.slate,
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
function TealButton({ children, style }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: "relative",
        background: h ? C.tealL : C.teal,
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
          ? `0 14px 30px -10px rgba(0,96,96,0.45)`
          : `0 6px 18px -8px rgba(0,96,96,0.3)`,
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

function GhostButton({ children, dark, style }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? (dark ? C.mintTint : "rgba(120,192,192,0.1)") : "transparent",
        color: h ? (dark ? C.teal : C.mint) : dark ? C.ink : C.white,
        border: `1px solid ${
          h ? (dark ? C.teal : C.mint) : dark ? "rgba(14,36,36,0.2)" : "rgba(255,255,255,0.25)"
        }`,
        padding: "14px 28px",
        fontSize: 14.5,
        fontWeight: 600,
        letterSpacing: "0.3px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        borderRadius: 999,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ===================================================================
 *  Reason card (Why Dubai grid)
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
          border: `1px solid ${h ? C.teal : C.border}`,
          borderRadius: 18,
          transform: h ? "translateY(-6px)" : "translateY(0)",
          boxShadow: h
            ? `0 22px 40px -22px rgba(0,96,96,0.35)`
            : `0 1px 0 rgba(0,0,0,0.02)`,
          overflow: "hidden",
        }}
      >
        {/* corner badge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 80,
            height: 80,
            background: `radial-gradient(circle at top right, ${C.mintSoft}, transparent 70%)`,
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
              background: h ? C.teal : C.mintTint,
              color: h ? C.white : C.teal,
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
            //   fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 34,
              fontWeight: 600,
              color: h ? C.coral : C.mintSoft,
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
 *  Fact row (At a glance)
 * ================================================================ */
function FactRow({ label, value }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? "rgba(120,192,192,0.08)" : "transparent",
        padding: "18px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        transition: "background 0.2s ease",
      }}
    >
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "rgba(255,255,255,0.42)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13.5,
          fontWeight: 600,
          color: h ? C.mint : C.white,
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
          background: highlight ? C.teal : h ? C.mintTint : C.white,
          padding: "32px 22px",
          textAlign: "center",
          transition: "all 0.3s cubic-bezier(.2,.7,.2,1)",
          position: "relative",
          border: `1px solid ${highlight ? C.teal : C.border}`,
          borderRadius: 16,
          transform: h ? "translateY(-4px)" : "translateY(0)",
          boxShadow: h ? `0 16px 32px -16px rgba(0,96,96,0.3)` : "none",
        }}
      >
        {highlight && (
          <span
            style={{
              position: "absolute",
              top: -10,
              left: "50%",
              transform: "translateX(-50%)",
              background: C.coral,
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
            color: highlight ? "rgba(255,255,255,0.7)" : C.slate,
            marginBottom: 14,
            display: "block",
          }}
        >
          {label}
        </span>
        <div
          style={{
            // fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 30,
            fontWeight: 600,
            color: highlight ? C.white : C.ink,
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          {amount}
        </div>
        <div
          style={{
            fontSize: 12,
            color: highlight ? "rgba(255,255,255,0.7)" : C.slate,
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
function CourseCard({ num, title, body, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: "relative",
          background: h ? C.teal : C.white,
          border: `1px solid ${h ? C.teal : C.border}`,
          padding: "28px 24px",
          borderRadius: 16,
          transition: "all 0.35s cubic-bezier(.2,.7,.2,1)",
          transform: h ? "translateY(-6px)" : "translateY(0)",
          boxShadow: h ? `0 22px 40px -20px rgba(0,96,96,0.4)` : "none",
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
            background: h ? "rgba(255,255,255,0.15)" : C.mintTint,
            color: h ? C.mint : C.teal,
            fontSize: 13,
            fontWeight: 700,
            borderRadius: 10,
            marginBottom: 14,
            transition: "all 0.3s ease",
          }}
        >
          {num}
        </div>
        <div
          style={{
            fontSize: 14.5,
            fontWeight: 700,
            color: h ? C.white : C.ink,
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
            color: h ? "rgba(255,255,255,0.75)" : C.slate,
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
            color: h ? C.mint : "transparent",
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
            background: `linear-gradient(135deg, ${C.teal}, ${C.tealL})`,
            color: C.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 700,
            flexShrink: 0,
            borderRadius: "50%",
            boxShadow: `0 6px 14px -4px rgba(0,96,96,0.4)`,
          }}
        >
          {n}
        </div>
        {!isLast && (
          <div
            style={{
              width: 2,
              flex: 1,
              background: `linear-gradient(180deg, ${C.mint}, transparent)`,
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
 *  Salary card (with animated bar)
 * ================================================================ */
function SalaryCard({ sector, monthly, yearly, pct, delay }) {
  const [ref, visible] = useReveal();
  const [h, setH] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? C.mintTint : C.white,
        border: `1px solid ${h ? C.teal : C.border}`,
        padding: "26px 22px",
        borderRadius: 14,
        transition: "all 0.3s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: C.slate,
          }}
        >
          {sector}
        </span>
        <span
          style={{
            background: C.mintSoft,
            color: C.teal,
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: 999,
          }}
        >
          0% Tax
        </span>
      </div>
      <div
        style={{
        //   fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 24,
          fontWeight: 600,
          color: C.ink,
          lineHeight: 1,
          marginBottom: 4,
        }}
      >
        {monthly}
      </div>
      <div style={{ fontSize: 11.5, color: C.slate, marginBottom: 14 }}>
        per month · {yearly}/yr
      </div>
      <div
        style={{
          height: 6,
          background: C.mintTint,
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: visible ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${C.teal}, ${C.mint})`,
            borderRadius: 999,
            transition: `width 1.4s cubic-bezier(.2,.7,.2,1) ${delay + 200}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ===================================================================
 *  Outlook card (career)
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
            background: `radial-gradient(circle, ${C.mintSoft} 0%, transparent 70%)`,
            opacity: 0.6,
          }}
        />
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: C.mintTint,
            color: C.teal,
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
            color: C.teal,
            fontSize: 10.5,
            fontWeight: 700,
            padding: "4px 12px",
            letterSpacing: "1px",
            marginBottom: 14,
            textTransform: "uppercase",
            borderRadius: 999,
            border: `1px solid ${C.mintSoft}`,
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
 *  Support card (Langma)
 * ================================================================ */
function SupportCard({ icon, title, body, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: h ? "rgba(120,192,192,0.1)" : "rgba(255,255,255,0.03)",
          padding: "32px 28px",
          border: `1px solid ${h ? "rgba(120,192,192,0.35)" : "rgba(255,255,255,0.06)"}`,
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
            background: h ? C.mint : "rgba(120,192,192,0.15)",
            color: h ? C.tealD : C.mint,
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
        <h4 style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 8 }}>
          {title}
        </h4>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.55)",
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
          color: isOpen ? C.teal : C.ink,
          transition: "color 0.2s ease",
        }}
      >
        {q}
        <span
          style={{
            width: 30,
            height: 30,
            background: isOpen ? C.teal : C.mintTint,
            color: isOpen ? C.white : C.teal,
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
 *  Hero motif — Dubai-inspired skyline + flight path
 * ================================================================ */
function HeroMotif() {
  return (
    <svg
      viewBox="0 0 800 900"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "58%",
        height: "100%",
        opacity: 0.85,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mintFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.mint} stopOpacity="0" />
          <stop offset="100%" stopColor={C.mint} stopOpacity="0.18" />
        </linearGradient>
        <radialGradient id="sun" cx="0.7" cy="0.25" r="0.4">
          <stop offset="0%" stopColor={C.coralL} stopOpacity="0.35" />
          <stop offset="100%" stopColor={C.coralL} stopOpacity="0" />
        </radialGradient>
        <pattern id="dotpat" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={C.mint} opacity="0.35" />
        </pattern>
      </defs>

      {/* warm sun glow */}
      <rect x="0" y="0" width="800" height="900" fill="url(#sun)" />
      <rect x="0" y="0" width="800" height="900" fill="url(#mintFade)" />

      {/* dot pattern panel */}
      <rect x="430" y="60" width="120" height="200" fill="url(#dotpat)" />

      {/* Burj Khalifa-esque tower silhouette */}
      <g opacity="0.85">
        <polygon
          points="600,820 605,300 614,170 618,80 622,170 631,300 636,820"
          fill={C.mint}
          opacity="0.18"
        />
        <polygon
          points="600,820 605,300 614,170 618,80 622,170 631,300 636,820"
          fill="none"
          stroke={C.mint}
          strokeWidth="1"
          opacity="0.55"
        />
        {/* tower windows */}
        {Array.from({ length: 22 }).map((_, i) => (
          <line
            key={i}
            x1="608"
            y1={350 + i * 22}
            x2="628"
            y2={350 + i * 22}
            stroke={C.mint}
            strokeWidth="0.6"
            opacity="0.4"
          />
        ))}
      </g>

      {/* neighbour towers */}
      <rect x="525" y="380" width="42" height="440" fill={C.mint} opacity="0.1" />
      <rect x="525" y="380" width="42" height="440" fill="none" stroke={C.mint} strokeWidth="0.75" opacity="0.35" />
      <rect x="660" y="450" width="38" height="370" fill={C.mint} opacity="0.1" />
      <rect x="660" y="450" width="38" height="370" fill="none" stroke={C.mint} strokeWidth="0.75" opacity="0.35" />
      <rect x="710" y="320" width="50" height="500" fill={C.mint} opacity="0.1" />
      <rect x="710" y="320" width="50" height="500" fill="none" stroke={C.mint} strokeWidth="0.75" opacity="0.35" />

      {/* compass / wayfinding ring */}
      <circle cx="240" cy="180" r="62" fill="none" stroke={C.mint} strokeWidth="0.75" opacity="0.45" />
      <circle cx="240" cy="180" r="42" fill="none" stroke={C.mint} strokeWidth="0.5" opacity="0.3" />
      <circle cx="240" cy="180" r="3" fill={C.coral} opacity="0.8" />

      {/* dashed flight path */}
      <path
        d="M 60 700 Q 350 350 700 200"
        stroke={C.coralL}
        strokeWidth="1.5"
        strokeDasharray="6 6"
        fill="none"
        opacity="0.6"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-120" dur="6s" repeatCount="indefinite" />
      </path>
      {/* plane icon */}
      <g transform="translate(680,210) rotate(-22)" opacity="0.85">
        <path
          d="M0 0 L 20 -4 L 30 -2 L 30 2 L 20 4 L 0 0 Z M 12 -8 L 18 -4 M 12 8 L 18 4"
          fill={C.coral}
        />
      </g>
    </svg>
  );
}

/* ===================================================================
 *  Marquee strip (USPs floating across)
 * ================================================================ */
function Marquee() {
  const items = [
    "🇦🇪 Dubai 2026 Intake Open",
    "✦ No IELTS Required",
    "✦ No Show Money",
    "✦ Age & Gap Accepted",
    "✦ UK-Accredited Diplomas",
    "✦ 0% Income Tax",
    "✦ Visa in 7 Days",
    "✦ Pathway to UK & Australia",
  ];
  const loop = [...items, ...items];
  return (
    <div
      style={{
        background: C.tealDark,
        color: C.mint,
        padding: "14px 0",
        overflow: "hidden",
        position: "relative",
        borderTop: `1px solid rgba(120,192,192,0.15)`,
        borderBottom: `1px solid rgba(120,192,192,0.15)`,
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
        background: `linear-gradient(90deg, ${C.teal}, ${C.mint}, ${C.coral})`,
        zIndex: 200,
        transition: "width 0.1s linear",
      }}
    />
  );
}

/* ===================================================================
 *  DATA
 * ================================================================ */
const reasons = [
  { icon: "🎯", title: "No IELTS or English Test Required", body: "English proficiency is assessed through a simple admission interview — no IELTS, TOEFL, or PTE scores needed. Saves you months of preparation and thousands in test fees." },
  { icon: "🎓", title: "UK-Accredited, Globally Recognised Diplomas", body: "Earn OTHM-accredited qualifications (Levels 3–5) regulated by Ofqual (UK), recognised by KHDA (Dubai), and accepted by WES for international equivalency." },
  { icon: "💰", title: "Tax-Free Professional Environment", body: "The UAE levies zero personal income tax. Every dirham you earn stays with you — a major financial advantage compared to Western study destinations." },
  { icon: "🛂", title: "Streamlined Student Visa Process", body: "Dubai's student visa is processed efficiently with professional guidance at every step. No show money required. Age gaps and study gaps are fully accepted." },
  { icon: "🌍", title: "Gateway to Global Academic Pathways", body: "Your Dubai diploma is your passport to top-up degrees in the UK, Australia, and Canada. MIBD's OTHM Level 4/5 qualifications provide direct entry to Year 2 or Year 3 at partner universities." },
  { icon: "🛡️", title: "Ranked 3rd Safest City in the World", body: "Dubai's world-class infrastructure, low crime rates, and welcoming multicultural environment make it one of the most secure destinations for international students and their families." },
  { icon: "📈", title: "Booming Economy with Real Opportunity", body: "Dubai's GDP grew 4.4% in the first half of 2025 alone, driven by the D33 Agenda targeting a doubling of the economy by 2030. The UAE is projected to need approximately 1 million new skilled workers." },
  { icon: "💼", title: "Paid Internship & Industry Exposure", body: "Access paid internships and industry placements across Dubai's finance, technology, hospitality, and logistics sectors — building real-world experience while you study." },
];

const courses = [
  { title: "Business Studies & Management", body: "Build leadership and strategic management skills for careers in consulting, operations, and corporate roles across the UAE and internationally." },
  { title: "Information Technology", body: "Develop in-demand technical skills for Dubai's rapidly growing digital economy — from cybersecurity and AI to network infrastructure and software." },
  { title: "Tourism & Hospitality", body: "Dubai's 17M+ annual visitors fuel year-round demand for hospitality professionals across hotels, events, and tourism management." },
  { title: "Logistics & Supply Chain", body: "The UAE's position as a global trade hub makes logistics expertise one of the most sought-after skills in the region's workforce." },
  { title: "Health & Social Care", body: "A critical, high-growth sector with globally portable qualifications and strong career prospects across both the UAE and international markets." },
  { title: "Accounting & Business", body: "Dubai's DIFC is a tier-one global financial centre — finance and accounting graduates are consistently among the UAE's most in-demand professionals." },
  { title: "Project Management", body: "An essential qualification across every sector — from real estate mega-projects to government transformation programmes across the UAE." },
  { title: "Education & Training Management", body: "Dubai's expanding education sector creates growing demand for trained education managers, trainers, and programme coordinators at all levels." },
];

const salaries = [
  { sector: "Banking & Finance", monthly: "AED 26,000", yearly: "AED 312,000", pct: 100 },
  { sector: "IT & Technology", monthly: "AED 23,000", yearly: "AED 276,000", pct: 88 },
  { sector: "Real Estate", monthly: "AED 22,000", yearly: "AED 264,000", pct: 85 },
  { sector: "Engineering", monthly: "AED 20,000", yearly: "AED 240,000", pct: 77 },
  { sector: "Healthcare", monthly: "AED 19,000", yearly: "AED 228,000", pct: 73 },
  { sector: "Logistics", monthly: "AED 15,000", yearly: "AED 180,000", pct: 58 },
  { sector: "Education", monthly: "AED 14,500", yearly: "AED 174,000", pct: 56 },
  { sector: "Hospitality", monthly: "AED 13,000", yearly: "AED 156,000", pct: 50 },
];

const faqs = [
  { q: "Is IELTS required to study in Dubai?", a: "No — IELTS is not required to study in Dubai at MIBD. English proficiency is assessed through a straightforward admission interview conducted by the institution. No TOEFL, PTE, or any other standardised English test score is required. This makes Dubai one of the most accessible international study destinations for Indian, Nepali, Sri Lankan, and South Asian students." },
  { q: "How much does it cost to study in Dubai at MIBD?", a: "The full programme tuition fee is USD 7,500. After a 35% merit scholarship is applied, the tuition reduces to USD 5,000. The all-inclusive student visa package costs USD 1,500 and covers your Entry Permit, Medical Check, Biometrics, Medical Insurance, Visa Stamping, and Emirates ID. Monthly living costs in Dubai typically range from AED 2,500 to AED 4,500 depending on your lifestyle and accommodation choices." },
  { q: "How long does the Dubai student visa process take?", a: "The Dubai student visa is typically processed within 7 working days from the point of submission. The process is comprehensive yet efficient — covering Entry Permit, Medical Check, Biometrics, Emirates ID, and Medical Insurance — all managed as a single coordinated package. Langma International provides professional guidance throughout the entire process. We recommend applying at least 2 months before your intended start date to allow comfortable preparation time." },
  { q: "Are study gaps and age restrictions an issue for Dubai admission?", a: "No — study gaps and age are fully accepted at MIBD Dubai. Unlike many Western destinations that penalise applicants for career breaks or extended gaps between studies, Dubai's admission process assesses your current profile, qualifications, and motivation. There is no upper age restriction. This makes Dubai a welcoming and practical option for mature students, career changers, and those returning to education after a break." },
  { q: "What qualifications will I earn by studying in Dubai?", a: "Students at MIBD earn OTHM-accredited diplomas at Levels 3, 4, and 5. These are regulated by Ofqual (UK), recognised by KHDA (Dubai), and accepted by WES for global academic equivalency. Level 4 and Level 5 are 2-year programmes. The qualifications are widely accepted for top-up bachelor's degrees at universities in the UK, Australia, Canada, and other major destinations." },
  { q: "Can I work or intern during my studies in Dubai?", a: "MIBD supports students in accessing paid internship opportunities and job fair connections through its industry network. Dubai's job market — particularly in finance, hospitality, technology, and logistics — actively recruits from the international student community. Post-graduation, professionals in the UAE earn in a fully tax-free environment, which significantly improves take-home income compared to most Western countries." },
  { q: 'What does "assignment-based assessment" mean — are there no exams?', a: "All OTHM diploma programmes at MIBD are assessed entirely through coursework and practical assignments — there are no written end-of-year examinations. This assessment model mirrors real professional environments and helps develop applied, work-ready skills. Students are evaluated on their ability to analyse, apply, and present knowledge — not on memorisation under exam conditions." },
  { q: "Can a Dubai diploma lead to a UK or Australian university degree?", a: "Yes. MIBD's OTHM Level 4/5 diplomas are specifically designed as academic progression pathways to top-up bachelor's degrees at universities in the UK, Australia, and Canada. Depending on the institution, graduates may enter directly into Year 2 or Year 3 of an undergraduate programme. Langma International provides detailed guidance on which partner universities accept these qualifications and how to apply." },
  { q: 'What does "No Show Money" mean for the Dubai visa?', a: 'Unlike student visas for the UK, USA, Canada, or Australia, the Dubai student visa does not require you to demonstrate large sums of money in your bank account as proof of financial capability — commonly known as "show money" or "bank balance requirement." This removes one of the most significant and stressful barriers for Indian and South Asian students and families applying to study abroad.' },
  { q: "When can I apply — what are the 2026 intake dates?", a: "MIBD operates on a rolling intake basis — meaning applications are accepted throughout the year with no single fixed deadline. However, seats are limited and we strongly recommend applying at least 2 months before your intended start date to allow sufficient time for admission processing, visa coordination, and pre-departure preparation. Contact Langma International today to understand the next available intake closest to your schedule." },
];

const support = [
  { icon: "🔍", title: "Free Eligibility Assessment", body: "We review your academic profile, career goals, and budget — giving you a clear, honest picture of your options before you commit to anything." },
  { icon: "📝", title: "Application Support", body: "We prepare and review your complete application — documents, forms, and photographs — ensuring everything is accurate and ready before submission." },
  { icon: "🏆", title: "Scholarship Guidance", body: "We help you access the 35% tuition scholarship and advise on any additional financial support opportunities you may qualify for." },
  { icon: "🛂", title: "Visa Documentation Support", body: "Complete professional guidance on your Dubai student visa documentation — from checklist preparation to correct submission format — at every stage." },
  { icon: "✈️", title: "Pre-Departure Briefing", body: "Know what to pack, what to expect on arrival, and how to settle in — before you board the flight. No surprises, no anxiety." },
  { icon: "🏠", title: "Accommodation Guidance", body: "Professional advice on student accommodation and transport options in Dubai — so your transition from home to campus is smooth and stress-free." },
  { icon: "💼", title: "Career & Internship Connections", body: "Access job fair recommendations, career guidance sessions, and internship pathways through our network of institutional and industry partners in Dubai." },
  { icon: "💬", title: "Dedicated Student Advisor", body: "One real counsellor, available throughout your entire journey. No call centres, no chatbots — just experienced, honest guidance when you need it most." },
];

const outlooks = [
  { icon: "🚀", tag: "Future Demand", title: "~1 Million New Jobs Projected by 2030", body: "The UAE's Dubai Economic Agenda (D33) is targeting a doubling of the economy by 2030, requiring approximately 1 million new skilled professionals across technology, healthcare, education, and manufacturing." },
  { icon: "💼", tag: "During Studies", title: "Paid Internships & Industry Placements", body: "MIBD connects students with paid internship opportunities and job fair access across Dubai's leading companies in finance, hospitality, technology, and logistics — building your CV while you study." },
  { icon: "🌴", tag: "Post-Study", title: "Tax-Free Employment in a Global Hub", body: "The UAE's zero personal income tax policy means your full salary is your take-home pay. Combined with competitive AED packages, Dubai offers outstanding value for internationally qualified graduates." },
  { icon: "🌏", tag: "Global Pathway", title: "Springboard to the UK, Australia & More", body: "Your OTHM Level 4/5 diploma is designed as a progression pathway to top-up bachelor's degrees at universities in the UK, Australia, and Canada — opening doors well beyond the UAE." },
];

/* ===================================================================
 *  MAIN
 * ================================================================ */
export default function StudyDubaiPage() {
  const [openFAQ, setOpenFAQ] = useState(0);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        color: C.ink,
        background: C.cream,
        lineHeight: 1.6,
        textAlign: "left",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        // * { margin: 0; padding: 0; box-sizing: border-box; }
        a { text-decoration: none; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${C.teal}; color: ${C.white}; }

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
        @keyframes lm-bob {
          0%, 100% { transform: translateY(0) rotate(-22deg); }
          50%      { transform: translateY(-10px) rotate(-18deg); }
        }

        .lm-link { position: relative; }
        .lm-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -6px;
          width: 0; height: 2px;
          background: ${C.mint};
          transition: width 0.3s ease;
        }
        .lm-link:hover::after { width: 100%; }

        .lm-grad-text {
          background: linear-gradient(120deg, ${C.coralL}, ${C.coral}, ${C.coralL});
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: lm-bg-shift 6s ease infinite;
        }
      `}</style>

      <ScrollProgress />

      {/* ---------------- HERO ---------------- */}
      <section
        style={{
          background: `linear-gradient(135deg, ${C.tealDark} 0%, ${C.tealD} 50%, ${C.teal} 100%)`,
          backgroundSize: "200% 200%",
          animation: "lm-bg-shift 18s ease infinite",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          padding: "70px 48px",
        }}
      >
        <HeroMotif />

        {/* ambient blur blobs */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: 380,
            height: 380,
            background: `radial-gradient(circle, ${C.mint} 0%, transparent 70%)`,
            opacity: 0.18,
            filter: "blur(20px)",
            animation: "lm-float 10s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "30%",
            width: 320,
            height: 320,
            background: `radial-gradient(circle, ${C.coral} 0%, transparent 70%)`,
            opacity: 0.12,
            filter: "blur(30px)",
            animation: "lm-float 13s ease-in-out infinite reverse",
          }}
        />

        <div style={{ maxWidth: 700, position: "relative", zIndex: 2 }}>
          <Reveal>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
                padding: "6px 18px 6px 8px",
                background: "rgba(120,192,192,0.1)",
                border: "1px solid rgba(120,192,192,0.3)",
                borderRadius: 999,
              }}
            >
              <span style={{ fontSize: 18 }}>🇦🇪</span>
              <span
                style={{
                  position: "relative",
                  display: "inline-flex",
                  width: 8,
                  height: 8,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: C.coral,
                    borderRadius: "50%",
                    animation: "lm-pulse 2s ease-out infinite",
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    width: 8,
                    height: 8,
                    background: C.coral,
                    borderRadius: "50%",
                  }}
                />
              </span>
              <span
                style={{
                  color: C.mint,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                2026 Intake Open · Limited Seats
              </span>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h1
              style={{
                // fontFamily: "'Fraunces', Georgia, serif",
                color: C.white,
                fontSize: "clamp(42px, 5.8vw, 76px)",
                lineHeight: 1.05,
                marginBottom: 24,
                fontWeight: 600,
                letterSpacing: "-1.2px",
              }}
            >
              Study in{" "}
              <em className="lm-grad-text" style={{ fontStyle: "italic", display: "inline-block" }}>
                Dubai
              </em>
              <br />
              Where Global
              <br />
              Careers Begin.
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 17,
                fontWeight: 300,
                lineHeight: 1.8,
                marginBottom: 36,
                maxWidth: 520,
              }}
            >
              Ranked among the world's top student cities. UK-accredited diplomas. Tax-free
              professional environment. <strong style={{ color: C.mint, fontWeight: 500 }}>No IELTS needed</strong> —
              just your ambition and a passport.
            </p>
          </Reveal>

          <Reveal delay={420}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 38 }}>
              {["No IELTS Required", "No Show Money", "Age & Gap Accepted", "Visa in 7 Days", "UK & Australia Pathway"].map(
                (p, i) => (
                  <span
                    key={p}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(120,192,192,0.18)",
                      color: "rgba(255,255,255,0.85)",
                      fontSize: 12,
                      fontWeight: 500,
                      padding: "7px 16px",
                      letterSpacing: "0.3px",
                      borderRadius: 999,
                      animation: `lm-float ${6 + i * 0.5}s ease-in-out infinite`,
                    }}
                  >
                    ✓ {p}
                  </span>
                )
              )}
            </div>
          </Reveal>

          <Reveal delay={540}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 56 }}>
              <TealButton style={{ background: C.coral }}>Book Free Counselling →</TealButton>
              <GhostButton>Check My Eligibility</GhostButton>
            </div>
          </Reveal>

          <Reveal delay={680}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                background: "rgba(14,36,36,0.45)",
                border: "1px solid rgba(120,192,192,0.18)",
                borderRadius: 18,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                overflow: "hidden",
              }}
            >
              <BoardingStat prefix="#" value={7} label="Student City" sub="Global rank · 2025" delay={100} />
              <BoardingStat prefix="#" value={3} label="Safest City" sub="Worldwide" delay={250} />
              <BoardingStat value={37} suffix="+" label="Campuses" sub="International, in UAE" delay={400} />
              <BoardingStat value={0} suffix="%" label="Income Tax" sub="Across the UAE" delay={550} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <Marquee />

      {/* ---------------- WHY DUBAI ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Why Dubai"
            title="8 Reasons Dubai Is South Asia's Smartest Study Destination in 2026"
            sub="Just a 3-hour flight from India. Decades ahead in opportunity. Dubai delivers internationally recognised education inside one of the world's fastest-growing economies."
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
          background: `linear-gradient(90deg, ${C.teal}, ${C.tealL})`,
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
        <p style={{ color: C.white, fontSize: 15.5, fontWeight: 600, margin: 0, position: "relative", zIndex: 2 }}>
          ✨ Whether you completed Grade 10, 12, or hold a degree — Dubai welcomes you. Check your eligibility for free today.
        </p>
        <button
          style={{
            background: C.white,
            color: C.teal,
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
            e.target.style.background = C.coral;
            e.target.style.color = C.white;
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = C.white;
            e.target.style.color = C.teal;
            e.target.style.transform = "translateY(0)";
          }}
        >
          Get Free Eligibility Check →
        </button>
      </div>

      {/* ---------------- AT A GLANCE FACTS ---------------- */}
      <section
        style={{
          background: `linear-gradient(135deg, ${C.tealDark}, ${C.tealD})`,
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
            background: `radial-gradient(circle, ${C.mint} 0%, transparent 70%)`,
            opacity: 0.08,
            filter: "blur(20px)",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead
            tag="At a Glance"
            title="Dubai — Essential Facts for International Students"
            sub="Key information to help you plan your study abroad journey with clarity and confidence."
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
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(120,192,192,0.15)",
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <FactRow label="Country" value="United Arab Emirates (UAE)" />
                <FactRow label="Currency" value="AED · 1 USD ≈ 3.67 AED" />
                <FactRow label="Language" value="Arabic · English (education)" />
                <FactRow label="Student City Rank" value="#7 Worldwide" />
                <FactRow label="Safety Ranking" value="#3 Safest Globally" />
                <FactRow label="Campuses" value="37+ international, UAE" />
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(120,192,192,0.15)",
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <FactRow label="Tuition (post-scholarship)" value="USD 5,000" />
                <FactRow label="Visa Fee (all-in)" value="USD 1,500" />
                <FactRow label="Visa Processing" value="~ 7 working days" />
                <FactRow label="Intakes" value="Rolling — year-round" />
                <FactRow label="English Requirement" value="Interview-based" />
                <FactRow label="Income Tax" value="0% — fully tax-free" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- COSTS ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Cost of Studying in Dubai"
            title="Transparent Fee Structure for 2026 Intake"
            sub="Dubai provides internationally recognised education at a significantly more accessible cost than the UK, USA, or Australia — especially with scholarship support applied."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            <CostCard label="Tuition (Original)" amount="USD 7,500" note="Full programme fee before scholarship" delay={0} />
            <CostCard label="After 35% Scholarship" amount="USD 5,000" note="You save USD 2,500" highlight delay={80} />
            <CostCard label="Student Visa Package" amount="USD 1,500" note="Entry permit, medical, Emirates ID & insurance" delay={160} />
            <CostCard label="Accommodation" amount="AED 1.5K–3.5K" note="Per month · shared or private" delay={240} />
            <CostCard label="Monthly Living" amount="AED 2.5K–4.5K" note="Food, transport & daily essentials" delay={320} />
            <CostCard label="Health Insurance" amount="Included" note="Fully covered within visa" delay={400} />
          </div>
        </div>
      </section>

      {/* ---------------- COURSES ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="MIBD Programmes"
            title="UK-Accredited Diplomas Designed for Dubai's Job Market"
            sub="Each programme is OTHM-accredited (UK), KHDA-recognised in Dubai, and accepted globally via WES. All assessed through practical assignments — no final exams."
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
                delay={i * 70}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- LANGUAGE REQUIREMENTS ---------------- */}
      <section
        style={{
          background: `linear-gradient(160deg, ${C.tealDark}, ${C.tealD} 60%, ${C.teal})`,
          padding: "100px 48px",
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
            background: `radial-gradient(circle, ${C.coral} 0%, transparent 70%)`,
            opacity: 0.1,
            filter: "blur(30px)",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead
            tag="English Requirements"
            title="No IELTS Required to Study in Dubai"
            sub="Unlike most Western destinations, Dubai does not require IELTS, TOEFL, or any standardised English test. Here is exactly what the admission process looks like for international students."
            light
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            <Reveal>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(120,192,192,0.18)",
                  padding: 36,
                  borderRadius: 20,
                  backdropFilter: "blur(8px)",
                }}
              >
                <h3
                  style={{
                    // fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: C.white,
                    marginBottom: 22,
                    paddingBottom: 16,
                    borderBottom: `2px solid ${C.mint}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span>📝</span> Standard Admission (All Levels)
                </h3>
                {[
                  ["IELTS", "Not Required", false],
                  ["TOEFL", "Not Required", false],
                  ["PTE", "Not Required", false],
                  ["English Interview", "Accepted ✓", true],
                  ["Medium of Instruction Certificate", "Accepted ✓", true],
                ].map(([t, s, ok], idx, arr) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "13px 0",
                      borderBottom: idx === arr.length - 1 ? "none" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.82)" }}>{t}</span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: ok ? C.mint : C.coralL,
                        padding: "4px 12px",
                        background: ok ? "rgba(120,192,192,0.12)" : "rgba(224,136,119,0.12)",
                        borderRadius: 999,
                      }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    background: "rgba(120,192,192,0.08)",
                    border: "1px solid rgba(120,192,192,0.2)",
                    padding: "16px 18px",
                    marginTop: 22,
                    fontSize: 12.5,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.7,
                    borderRadius: 12,
                  }}
                >
                  💡 English proficiency is confirmed through a straightforward institutional interview — no external test bookings, score submissions, or additional preparation required.
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(120,192,192,0.18)",
                  padding: 36,
                  borderRadius: 20,
                  backdropFilter: "blur(8px)",
                }}
              >
                <h3
                  style={{
                    // fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: C.white,
                    marginBottom: 22,
                    paddingBottom: 16,
                    borderBottom: `2px solid ${C.mint}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span>🎓</span> Who Is Eligible to Apply?
                </h3>
                {[
                  ["Grade 10 Completed", "Eligible ✓"],
                  ["Grade 12 Completed", "Eligible ✓"],
                  ["Graduate Applicants", "Eligible ✓"],
                  ["Study Gap Applicants", "Accepted ✓"],
                  ["Age Restrictions", "None ✓"],
                ].map(([t, s], idx, arr) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "13px 0",
                      borderBottom: idx === arr.length - 1 ? "none" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.82)" }}>{t}</span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: C.mint,
                        padding: "4px 12px",
                        background: "rgba(120,192,192,0.12)",
                        borderRadius: 999,
                      }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    background: "rgba(224,136,119,0.08)",
                    border: "1px solid rgba(224,136,119,0.2)",
                    padding: "16px 18px",
                    marginTop: 22,
                    fontSize: 12.5,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.7,
                    borderRadius: 12,
                  }}
                >
                  ⚠️ Specific entry requirements may vary slightly between Level 3 and Level 4/5. Your dedicated advisor will confirm exact criteria for your chosen diploma.
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
            tag="Dubai Student Visa Guide"
            title="Straightforward, Efficient & Fully Guided"
            sub="Dubai's student visa process is among the most accessible in the world for international applicants. Langma International provides professional guidance through every stage."
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="lm-visa-wrap">
            <div>
              <VisaStep n={1} title="Submit Your Application Online" body="Create your student profile and upload your passport copy and academic certificates. The process takes under 20 minutes and can be completed from anywhere." delay={0} />
              <VisaStep n={2} title="Receive Your Offer Letter" body="MIBD's admissions team reviews your application within 2–3 working days. Upon approval, your official Offer Letter is issued with full programme and next-step details." delay={100} />
              <VisaStep n={3} title="Confirm Your Place & Pay Fees" body="Secure your admission by paying the programme fees as outlined in your Offer Letter. A full payment invoice and receipt are issued immediately upon confirmation." delay={200} />
              <VisaStep n={4} title="Visa Processing — Within 7 Days" body="Your comprehensive visa package (USD 1,500) covers Entry Permit, Medical Check, Biometrics, Medical Insurance, Visa Stamping, and Emirates ID — all coordinated by our team." delay={300} />
              <VisaStep n={5} title="Arrive & Begin Your Dubai Journey" body="Receive your orientation schedule, welcome pack, and accommodation guidance before departure. Langma International supports your complete pre-arrival and on-ground transition." isLast delay={400} />
            </div>
            <Reveal delay={200}>
              <div
                style={{
                  background: `linear-gradient(160deg, ${C.tealDark}, ${C.tealD})`,
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
                    background: `radial-gradient(circle, ${C.mint} 0%, transparent 70%)`,
                    opacity: 0.15,
                  }}
                />
                <h3
                  style={{
                    // fontFamily: "'Fraunces', Georgia, serif",
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
                      background: C.mint,
                      color: C.tealD,
                      borderRadius: 10,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}
                  >
                    📋
                  </span>
                  Required Documents
                </h3>
                {[
                  "Valid passport copy (personal data pages)",
                  "All educational certificates (Grade 10 / 12 / degree)",
                  "Academic transcripts or mark sheets",
                  "Passport-size photograph (digital, white background)",
                  "Official Offer Letter from MIBD",
                  "Proof of fee payment / receipt",
                  "Visa application details (as specified)",
                ].map((d, i) => (
                  <div
                    key={d}
                    style={{
                      display: "flex",
                      gap: 12,
                      marginBottom: 14,
                      fontSize: 13.5,
                      color: "rgba(255,255,255,0.78)",
                      alignItems: "flex-start",
                      lineHeight: 1.6,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        background: "rgba(120,192,192,0.15)",
                        color: C.mint,
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
                    background: "rgba(120,192,192,0.1)",
                    borderLeft: `3px solid ${C.mint}`,
                    padding: "16px 18px",
                    marginTop: 22,
                    fontSize: 12.5,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.75,
                    borderRadius: 8,
                  }}
                >
                  <strong style={{ color: C.mint }}>Visa Fee:</strong> USD 1,500 (all-inclusive)
                  <br />
                  <strong style={{ color: C.mint }}>Covers:</strong> Entry Permit · Medical · Biometrics · Insurance · Stamping · Emirates ID
                  <br />
                  <strong style={{ color: C.mint }}>Processing:</strong> ~ 7 working days
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- SALARY OUTLOOK ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Tax-Free Salary Outlook · Dubai 2026"
            title="Career Earnings Across Key Dubai Sectors"
            sub="In the UAE, personal income tax is zero — meaning these figures reflect what professionals take home. Data sourced from Dubai 2026 salary benchmarks for reference purposes."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            {salaries.map((s, i) => (
              <SalaryCard key={s.sector} {...s} delay={i * 70} />
            ))}
          </div>
          <p style={{ fontSize: 12, color: C.muted, marginTop: 22, fontStyle: "italic" }}>
            Source: inedjobs.com Dubai salary benchmarks 2026. Figures are indicative averages. Individual salaries vary by employer, experience, and role. All UAE earnings are tax-free.
          </p>
        </div>
      </section>

      {/* ---------------- CAREER OUTLOOK ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Career Outlook · UAE 2026 & Beyond"
            title="Dubai: A City Actively Building Its Workforce"
            sub="Dubai is not just a place to study — it is a city in deliberate expansion mode. The UAE's economic agenda is creating large-scale professional opportunities across every major industry."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
            {outlooks.map((o, i) => (
              <OutlookCard key={o.title} {...o} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WHY LANGMA ---------------- */}
      <section
        style={{
          background: `linear-gradient(160deg, ${C.tealDark}, ${C.tealD})`,
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
            background: `radial-gradient(circle, ${C.mint} 0%, transparent 70%)`,
            opacity: 0.08,
            filter: "blur(20px)",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead
            tag="Why Choose Langma International"
            title="Your End-to-End Study Abroad Partner for Dubai"
            sub="We go far beyond an application form. From your first enquiry to your first week on campus, Langma International is with you — professionally, personally, and practically."
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

      {/* ---------------- FAQ ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag="FAQs" title="Common Questions About Studying in Dubai" center />
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
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section
        style={{
          background: `linear-gradient(135deg, ${C.tealDark} 0%, ${C.teal} 60%, ${C.tealL} 100%)`,
          backgroundSize: "200% 200%",
          animation: "lm-bg-shift 14s ease infinite",
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
            background: `radial-gradient(circle, ${C.coral} 0%, transparent 70%)`,
            opacity: 0.15,
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
            background: `radial-gradient(circle, ${C.mint} 0%, transparent 70%)`,
            opacity: 0.18,
            filter: "blur(40px)",
            animation: "lm-float 13s ease-in-out infinite reverse",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <h2
              style={{
                // fontFamily: "'Fraunces', Georgia, serif",
                color: C.white,
                fontSize: "clamp(32px, 4.5vw, 56px)",
                marginBottom: 20,
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              Dubai Is Ready.
              <br />
              <em className="lm-grad-text" style={{ fontStyle: "italic" }}>
                Is This Your Year?
              </em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: 17,
                marginBottom: 48,
                maxWidth: 580,
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.8,
              }}
            >
              No IELTS. No show money. UK-accredited qualification. Tax-free professional environment waiting on the other side. Your 2026 Dubai journey begins with one free conversation.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <TealButton style={{ background: C.coral, padding: "16px 36px" }}>
                Book Free Counselling →
              </TealButton>
              <GhostButton>Check My Eligibility</GhostButton>
              <GhostButton>Talk to an Advisor</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- RESPONSIVE ---------------- */}
      <style>{`
        @media (max-width: 860px) {
          .lm-visa-wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
