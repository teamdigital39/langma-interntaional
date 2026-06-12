import React, { useState, useEffect, useRef } from "react";

/**
 * Study in Poland — Langma International
 * Palette: EU-inspired deep navy + gold + forest green
 *   navy      #1A2E5A  (deep brand navy)
 *   navyD     #0F1E3C  (deepest panels)
 *   navyL     #2A4A8C  (hover / accent)
 *   gold      #F0C040  (EU gold star accent)
 *   goldL     #F5D878  (light gold)
 *   goldSoft  #FDF3C8  (chip / hover tint)
 *   cream     #F5F7FA  (warm light section bg)
 *   forest    #2E7D5A  (green secondary accent)
 *   forestL   #4CAF80  (light green)
 *   ink       #0E1A2E  (near-black text)
 *   slate     #5A6A7A  (muted text)
 */

const C = {
  // navy: "#1A2E5A",
  navy: "#2E6466",
  navyD: "#2E6466",
  // navyDark: "#0E1A2E",
  navyDark: "#2E6466",
  navyL: "#2E6466",
  gold: "#4197a2",
  goldL: "#4197a2",
  goldSoft: "#FDF3C8",
  goldTint: "#FFFAE8",
  cream: "#F5F7FA",
  cream2: "#E8EDF5",
  forest: "#2E7D5A",
  forestL: "#4CAF80",
  white: "#FFFFFF",
  ink: "#2E6466",
  slate: "#5A6A7A",
  border: "#D8E0EC",
  muted: "#7A8A9A",
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
            background: light ? "rgba(240,192,64,0.12)" : C.goldTint,
            border: `1px solid ${light ? "rgba(240,192,64,0.25)" : C.goldSoft}`,
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
              boxShadow: `0 0 0 4px ${light ? "rgba(240,192,64,0.18)" : "rgba(26,46,90,0.12)"}`,
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: light ? C.gold : C.navy,
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
function NavyButton({ children, style }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: "relative",
        background: h ? C.navyL : C.navy,
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

function GhostButton({ children, dark, style }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? (dark ? C.goldTint : "rgba(240,192,64,0.1)") : "transparent",
        color: h ? (dark ? C.navy : C.gold) : dark ? C.ink : C.white,
        border: `1px solid ${
          h ? (dark ? C.navy : C.gold) : dark ? "rgba(14,26,46,0.2)" : "rgba(255,255,255,0.25)"
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
        background: h ? "rgba(240,192,64,0.08)" : "transparent",
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
          color: h ? C.gold : C.white,
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
          background: highlight ? C.navy : h ? C.goldTint : C.white,
          padding: "32px 22px",
          textAlign: "center",
          transition: "all 0.3s cubic-bezier(.2,.7,.2,1)",
          position: "relative",
          border: `1px solid ${highlight ? C.navy : C.border}`,
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
            color: highlight ? "rgba(255,255,255,0.7)" : C.slate,
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
          background: h ? C.navy : C.white,
          border: `1px solid ${h ? C.navy : C.border}`,
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
            background: h ? "rgba(255,255,255,0.15)" : C.goldTint,
            color: h ? C.gold : C.navy,
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
            background: `linear-gradient(135deg, ${C.navy}, ${C.navyL})`,
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
        background: h ? C.goldTint : C.white,
        border: `1px solid ${h ? C.navy : C.border}`,
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
            background: C.goldSoft,
            color: C.navy,
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: 999,
          }}
        >
          EU Access
        </span>
      </div>
      <div
        style={{
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
          background: C.goldTint,
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: visible ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${C.navy}, ${C.gold})`,
            borderRadius: 999,
            transition: `width 1.4s cubic-bezier(.2,.7,.2,1) ${delay + 200}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ===================================================================
 *  Outlook card
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
          background: h ? "rgba(240,192,64,0.1)" : "rgba(255,255,255,0.03)",
          padding: "32px 28px",
          border: `1px solid ${h ? "rgba(240,192,64,0.35)" : "rgba(255,255,255,0.06)"}`,
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
 *  Hero motif — Poland/EU-inspired skyline + flight path
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
        <linearGradient id="goldFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.gold} stopOpacity="0" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0.18" />
        </linearGradient>
        <radialGradient id="sunPl" cx="0.7" cy="0.25" r="0.4">
          <stop offset="0%" stopColor={C.goldL} stopOpacity="0.3" />
          <stop offset="100%" stopColor={C.goldL} stopOpacity="0" />
        </radialGradient>
        <pattern id="dotpatPl" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={C.gold} opacity="0.35" />
        </pattern>
      </defs>

      {/* warm glow */}
      <rect x="0" y="0" width="800" height="900" fill="url(#sunPl)" />
      <rect x="0" y="0" width="800" height="900" fill="url(#goldFade)" />

      {/* dot pattern panel */}
      <rect x="430" y="60" width="120" height="200" fill="url(#dotpatPl)" />

      {/* Warsaw Palace of Culture silhouette */}
      <g opacity="0.85">
        {/* main spire */}
        <polygon
          points="612,820 618,350 622,220 626,120 630,220 634,350 640,820"
          fill={C.gold}
          opacity="0.15"
        />
        <polygon
          points="612,820 618,350 622,220 626,120 630,220 634,350 640,820"
          fill="none"
          stroke={C.gold}
          strokeWidth="1"
          opacity="0.5"
        />
        {/* stepped body */}
        <rect x="600" y="450" width="52" height="370" fill={C.gold} opacity="0.08" />
        <rect x="600" y="450" width="52" height="370" fill="none" stroke={C.gold} strokeWidth="0.75" opacity="0.4" />
        <rect x="590" y="560" width="72" height="260" fill={C.gold} opacity="0.06" />
        <rect x="590" y="560" width="72" height="260" fill="none" stroke={C.gold} strokeWidth="0.6" opacity="0.3" />
        <rect x="575" y="660" width="102" height="160" fill={C.gold} opacity="0.05" />
        <rect x="575" y="660" width="102" height="160" fill="none" stroke={C.gold} strokeWidth="0.5" opacity="0.25" />
        {/* windows */}
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={i}
            x1="608"
            y1={370 + i * 24}
            x2="644"
            y2={370 + i * 24}
            stroke={C.gold}
            strokeWidth="0.6"
            opacity="0.35"
          />
        ))}
        {/* clock faces */}
        <circle cx="618" cy="400" r="10" fill="none" stroke={C.gold} strokeWidth="1" opacity="0.5" />
        <circle cx="634" cy="400" r="10" fill="none" stroke={C.gold} strokeWidth="1" opacity="0.5" />
      </g>

      {/* neighbour buildings */}
      <rect x="520" y="500" width="45" height="320" fill={C.gold} opacity="0.08" />
      <rect x="520" y="500" width="45" height="320" fill="none" stroke={C.gold} strokeWidth="0.75" opacity="0.3" />
      <rect x="670" y="550" width="40" height="270" fill={C.gold} opacity="0.08" />
      <rect x="670" y="550" width="40" height="270" fill="none" stroke={C.gold} strokeWidth="0.75" opacity="0.3" />
      <rect x="720" y="420" width="55" height="400" fill={C.gold} opacity="0.08" />
      <rect x="720" y="420" width="55" height="400" fill="none" stroke={C.gold} strokeWidth="0.75" opacity="0.3" />

      {/* EU stars circle */}
      <circle cx="240" cy="180" r="62" fill="none" stroke={C.gold} strokeWidth="0.75" opacity="0.45" />
      <circle cx="240" cy="180" r="42" fill="none" stroke={C.gold} strokeWidth="0.5" opacity="0.3" />
      {/* 12 EU stars */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = 240 + 52 * Math.cos(angle);
        const y = 180 + 52 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="3" fill={C.gold} opacity="0.7" />;
      })}
      <circle cx="240" cy="180" r="3" fill={C.gold} opacity="0.9" />

      {/* dashed flight path */}
      <path
        d="M 60 700 Q 350 350 700 200"
        stroke={C.goldL}
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
          fill={C.gold}
        />
      </g>
    </svg>
  );
}

/* ===================================================================
 *  Marquee strip
 * ================================================================ */
function Marquee() {
  const items = [
    "🇵🇱 Poland 2026 Intake Open",
    "✦ 300+ English Programs",
    "✦ Tuition from €2,550/yr",
    "✦ No Polish Required",
    "✦ EU Work Rights After Graduation",
    "✦ Erasmus+ Eligible",
    "✦ 22 QS-Ranked Universities",
    "✦ Pathway to 27 EU Nations",
  ];
  const loop = [...items, ...items];
  return (
    <div
      style={{
        background: C.navyDark,
        color: "#FFFFFF",
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
 *  DATA
 * ================================================================ */
const reasons = [
  { icon: "💶", title: "Exceptional Value for EU Education", body: "Tuition from €2,550/year compared to €20,000+ at Western European institutions. Earn an internationally respected EU degree without the financial burden." },
  { icon: "🎓", title: "Globally Recognised Degrees", body: "22 Polish accredited higher education providers ranked in the QS World Rankings. Business programmes with international accreditation. Degrees respected by employers worldwide." },
  { icon: "🗺️", title: "Central European Gateway", body: "Berlin, Vienna, and Prague under 3 hours away. Study in Poland, explore all of Europe on weekends — one country, an entire continent at your doorstep." },
  { icon: "🇪🇺", title: "EU Work Rights After Graduation", body: "Your Polish degree unlocks opportunities across all 27 EU member states. One degree, a continent of careers — unprecedented professional mobility." },
  { icon: "📈", title: "Booming Economy", body: "5th largest EU economy. Lowest unemployment in the EU at 3.2%. The 'Silicon Valley of Central Europe' is growing fast — powered by tech, finance, and manufacturing." },
  { icon: "🛡️", title: "Safe, Welcoming Country", body: "Consistently ranked safer than most EU nations and the United States on the Global Peace Index. Low crime, high quality of life, and a vibrant student culture." },
  { icon: "🗣️", title: "300+ English-Taught Programs", body: "No Polish language requirement for most programs. English-medium degrees available across all major disciplines — from Computer Science to Medicine." },
  { icon: "✈️", title: "Erasmus+ & Global Exchange", body: "Study a semester in another EU country through Erasmus+. Poland's universities partner with institutions across 40+ nations, giving you a truly global academic experience." },
];

const courses = [
  { title: "Business & Management", body: "Careers in consulting, strategy & operations across EU markets and beyond." },
  { title: "Computer Science", body: "Software roles at Poland's booming tech ecosystem, Europe's fastest-growing IT hub." },
  { title: "Data Science & Analytics", body: "High-demand skill set across banking, tech & healthcare sectors globally." },
  { title: "Artificial Intelligence", body: "Future-proof career in automation, machine learning & intelligent systems." },
  { title: "Cybersecurity", body: "Critical shortage globally — graduates in high demand across EU and international markets." },
  { title: "Engineering", body: "Mechanical, civil, aerospace & electrical — full spectrum of accredited programmes available." },
  { title: "Finance & Accounting", body: "ACCA-linked programs open doors across European financial hubs — Warsaw, Frankfurt, and beyond." },
  { title: "Healthcare & Nursing", body: "Global shortage creates immediate career pathways post-graduation across the EU and worldwide." },
  { title: "Hospitality & Tourism", body: "Industry-tied programmes with real hotel & travel company placements across Europe." },
  { title: "Psychology", body: "Internationally recognised programmes with clinical and business specialisations available." },
  { title: "Design & Media Arts", body: "Film, graphic design, 3D animation & UX for the growing creative economy." },
  { title: "Law & International Relations", body: "EU-context legal education with aviation law specialisations — globally portable qualifications." },
];

const salaries = [
  { sector: "Technology & IT", monthly: "€3,800", yearly: "€45,600", pct: 100 },
  { sector: "Finance & Fintech", monthly: "€3,500", yearly: "€42,000", pct: 92 },
  { sector: "Engineering", monthly: "€3,200", yearly: "€38,400", pct: 84 },
  { sector: "Cybersecurity", monthly: "€3,000", yearly: "€36,000", pct: 79 },
  { sector: "Healthcare", monthly: "€2,800", yearly: "€33,600", pct: 74 },
  { sector: "Data Science", monthly: "€2,700", yearly: "€32,400", pct: 71 },
  { sector: "Logistics", monthly: "€2,400", yearly: "€28,800", pct: 63 },
  { sector: "Hospitality & Tourism", monthly: "€2,200", yearly: "€26,400", pct: 58 },
];

const faqs = [
  { q: "How much does it cost to study in Poland as an international student?", a: "Tuition fees at accredited Polish higher education providers range from €2,550 to €29,000 per year depending on the institution and programme. Living costs in Poland average approximately €500–€800 per month (approximately PLN 700–800 for day-to-day living expenses, plus a recommended return travel reserve of approximately PLN 2,500). Total annual costs are typically €8,000–€18,000 — making Poland one of the most affordable EU study destinations in Europe." },
  { q: "Can international students work while studying in Poland?", a: "Yes. International students who hold a valid Temporary Residence Card (TRC) can work part-time in Poland without a separate work permit. Popular sectors include IT, hospitality, retail, and multilingual customer service roles. Poland's dynamic job market, with an unemployment rate of 3.2%, means there are genuine opportunities available to students throughout their studies." },
  { q: "Is IELTS mandatory to study in Poland?", a: "IELTS is not always mandatory for academic admission — a Medium of Instruction (MOI) certificate may be accepted by the partner institution for admission purposes. However, IELTS (minimum 5.5 overall) or PTE Academic (minimum 50) are strongly recommended to strengthen your Embassy National Visa application, as language scores improve embassy confidence during visa assessment. TOEFL iBT, PTE, and Cambridge certificates are also accepted by many institutions. Typical IELTS requirements range from 5.5 to 7.0 depending on the level and programme. Your Langma advisor will confirm exactly what you need." },
  { q: "What are the visa requirements for studying in Poland?", a: "You will need a National D-Type Visa from the Polish Consulate. Key documents include your Final Acceptance Letter from the accredited partner institution, passport, travel insurance (min. €30,000 Schengen coverage), proof of funds (demonstrating approximately PLN 700–800 per month for living expenses and a return travel reserve of approximately PLN 2,500), accommodation confirmation, and NAWA diploma recognition (for non-EU/OECD/EFTA nationals). Embassy processing typically takes approximately 30–60 days and the visa fee is approximately €90." },
  { q: "Are scholarships available for international students in Poland?", a: "Yes. Scholarships are available through the Polish Government via NAWA (National Agency for Academic Exchange), individual university merit awards, Erasmus+ exchange funding, and specialised grants for sports, arts, and PhD research. Langma International helps identify and apply for all scholarships you qualify for." },
  { q: "What are the most popular courses for international students in Poland?", a: "The most in-demand programmes are Computer Science, Artificial Intelligence, Cybersecurity, Business & Management, Finance & Accounting, Engineering, Psychology, Hospitality & Tourism, and Data Science. Most are available fully in English across Langma's accredited partner institutions in Poland." },
  { q: "How long does the Poland student visa take to process?", a: "The Poland Embassy National Visa (D-Type) typically takes approximately 30–60 days from the date of your consulate appointment. We recommend applying at least 3–4 months before your intended travel date to allow time for document preparation, NAWA recognition, and any processing delays." },
  { q: "What is the NAWA diploma recognition and do I need it?", a: "NAWA (National Agency for Academic Exchange) recognition confirms that your previous qualifications are equivalent to Polish academic standards. As per regulations introduced in July 2025, this is mandatory for applicants from countries outside the EU, EFTA, and OECD before arriving in Poland to begin their studies. Langma International provides full assistance with this process." },
  { q: "Can I study in Poland without knowing Polish?", a: "Absolutely. Poland offers 300+ fully English-taught programs at bachelor's and master's level. No Polish language requirement for admission or graduation in these programs. Optional Polish language courses are available to help you navigate daily life and immerse yourself further in the culture." },
  { q: "When does the 2026 intake begin and when should I apply?", a: "The main 2026 intake starts October 1, 2026. Institutional offer letters are typically issued within approximately 3–7 working days of submitting a complete application. We recommend beginning your application process at least 4–5 months before your intended intake to allow time for documentation preparation, NAWA diploma recognition, and Embassy National Visa processing (approximately 30–60 days)." },
];

const support = [
  { icon: "🔍", title: "Free Eligibility Assessment", body: "We evaluate your academic profile, budget, and goals to identify the best-fit universities and programs — at zero cost to you." },
  { icon: "🏛️", title: "Institution Shortlisting", body: "Access to 26+ accredited partner institutions in Poland. We match you with programmes that align with your career goals and academic background." },
  { icon: "📝", title: "Application Assistance", body: "We prepare, review, and submit your full university application — including SOP, document preparation, and NAWA recognition support." },
  { icon: "🏆", title: "Scholarship Guidance", body: "We identify merit, government, and institutional scholarships you qualify for and help you apply with the strongest possible profile." },
  { icon: "🛂", title: "Visa Support", body: "Complete visa documentation guidance — from apostille and NAWA decisions to financial proof and insurance — with zero paperwork confusion." },
  { icon: "✈️", title: "Pre-Departure Briefing", body: "Know exactly what to expect before you land: housing, banking, SIM cards, university registration — all covered in your departure pack." },
  { icon: "🏠", title: "Post-Arrival Support", body: "Airport pickup, city orientation, TRC application assistance, and ongoing support so you settle in quickly and focus on your studies." },
  { icon: "💬", title: "Dedicated Student Advisor", body: "One point of contact throughout your journey. Real people, real answers — not a chatbot, not a call centre queue." },
];

const outlooks = [
  { icon: "🚀", tag: "Future Demand", title: "~1 Million EU Jobs Accessible Post-Graduation", body: "Poland's D-Type visa graduates gain access to the EU's entire labour market — 27 countries, 450 million consumers, and the world's largest single market." },
  { icon: "💼", tag: "During Studies", title: "Part-Time Work with a Residence Card", body: "International students with a valid Temporary Residence Card can work part-time without a separate permit — in Poland's booming tech, retail, and hospitality sectors." },
  { icon: "🌍", tag: "Post-Study", title: "2–3 Year Post-Study Work Pathway", body: "Eligible full-time graduates may access legal pathways to remain and work in Poland for approximately 2–3 years after graduation, subject to prevailing immigration regulations." },
  { icon: "🎓", tag: "Global Pathway", title: "Springboard to the UK, Canada & Beyond", body: "Your accredited Polish degree is recognised by WES and by partner institutions globally — opening pathways to postgraduate studies or professional migration across Western markets." },
];

/* ===================================================================
 *  MAIN
 * ================================================================ */
export default function StudyPolandPage() {
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
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
      <section
        style={{
          background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navyD} 50%, ${C.navy} 100%)`,
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

        {/* ambient blobs */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: 380,
            height: 380,
            background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`,
            opacity: 0.12,
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
            background: `radial-gradient(circle, ${C.forest} 0%, transparent 70%)`,
            opacity: 0.1,
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
                background: "rgba(240,192,64,0.1)",
                border: "1px solid rgba(240,192,64,0.3)",
                borderRadius: 999,
              }}
            >
              <span style={{ fontSize: 18 }}>🇵🇱</span>
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
                    background: C.forest,
                    borderRadius: "50%",
                    animation: "lm-pulse 2s ease-out infinite",
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    width: 8,
                    height: 8,
                    background: C.forest,
                    borderRadius: "50%",
                  }}
                />
              </span>
              <span
                style={{
                  color: C.gold,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                EU Destination · 2026 Intake Open
              </span>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h1
              style={{
                color: C.white,
                fontSize: "clamp(42px, 5.8vw, 76px)",
                lineHeight: 1.05,
                marginBottom: 24,
                fontWeight: 600,
                letterSpacing: "-1.2px",
              }}
            >
              Study in{" "}
              <em className="lm-gr-text" style={{ fontStyle: "italic", display: "inline-block" }}>
                Poland
              </em>
              <br />
              Europe at a
              <br />
              Fraction of the Price.
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
              World-ranked universities. English-taught degrees. An EU passport to your
              future career.{" "}
              <strong style={{ color: C.gold, fontWeight: 500 }}>Tuition from €2,550/year</strong> —
              without the global debt.
            </p>
          </Reveal>

          <Reveal delay={420}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 38 }}>
              {["300+ English Programs", "22 QS-Ranked Universities", "EU Work Rights", "Erasmus+ Eligible", "No Polish Required"].map(
                (p, i) => (
                  <span
                    key={p}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(240,192,64,0.18)",
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
              <NavyButton style={{ background: C.forest }}>Book Free Counselling →</NavyButton>
              <GhostButton>Check My Eligibility</GhostButton>
            </div>
          </Reveal>

          <Reveal delay={680}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                background: "rgba(14,26,46,0.45)",
                border: "1px solid rgba(240,192,64,0.18)",
                borderRadius: 18,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                overflow: "hidden",
              }}
            >
              <BoardingStat value={26} suffix="+" label="Partner Universities" sub="Accredited, Poland" delay={100} />
              <BoardingStat value={300} suffix="+" label="English Programs" sub="Bachelor's & Master's" delay={250} />
              <BoardingStat prefix="€" value={2550} label="From / Year" sub="Tuition fee" delay={400} />
              <BoardingStat value={100} suffix="K+" label="Intl Students" sub="Studying in Poland" delay={550} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <Marquee />

      {/* ---------------- WHY POLAND ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Why Poland"
            title="8 Reasons Students Are Choosing Poland in 2026"
            sub="Affordable, safe, and strategically placed in the heart of Europe — Poland delivers world-class education with unbeatable value."
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
          background: `linear-gradient(90deg, ${C.navy}, ${C.navyL})`,
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
          ✨ Whether you completed Grade 10, 12, or hold a degree — Poland welcomes you. Check your eligibility for free today.
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
            e.target.style.background = C.gold;
            e.target.style.color = C.navy;
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = C.white;
            e.target.style.color = C.navy;
            e.target.style.transform = "translateY(0)";
          }}
        >
          Get Free Eligibility Check →
        </button>
      </div>

      {/* ---------------- AT A GLANCE FACTS ---------------- */}
      <section
        style={{
          background: `linear-gradient(135deg, ${C.navyDark}, ${C.navyD})`,
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
            title="Poland — Quick Facts for International Students"
            sub="Everything you need to know before you decide."
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
                  border: "1px solid rgba(240,192,64,0.15)",
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <FactRow label="Capital City" value="Warsaw" />
                <FactRow label="Currency" value="Polish Złoty (PLN) · €1 ≈ 4.2 PLN" />
                <FactRow label="Language of Instruction" value="English (300+ programs)" />
                <FactRow label="Top Student Cities" value="Warsaw · Wrocław · Kraków · Gdańsk" />
                <FactRow label="QS-Ranked Universities" value="22 accredited providers" />
                <FactRow label="Erasmus+ Eligible" value="Yes — 40+ partner nations" />
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(240,192,64,0.15)",
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <FactRow label="Tuition (Bachelor's)" value="€2,550 – €29,000 / year" />
                <FactRow label="Tuition (Master's)" value="€4,400 – €18,200 / year" />
                <FactRow label="Average Living Cost" value="€500 – €800 / month" />
                <FactRow label="Intakes" value="October (main) · February (select)" />
                <FactRow label="Visa Type" value="National Visa (D-Type) → TRC" />
                <FactRow label="Post-Study Work" value="~2–3 years · EU-wide access" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- COSTS ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Cost of Studying in Poland"
            title="What Will It Actually Cost You?"
            sub="Poland offers one of the most competitive price-to-quality ratios in Europe. Here are realistic cost ranges for 2026."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            <CostCard label="Bachelor's Tuition" amount="€2,550–€29K" note="Per year · varies by university & program" delay={0} />
            <CostCard label="Master's Tuition" amount="€4,400–€18K" note="Some public unis from €500/yr" highlight delay={80} />
            <CostCard label="Monthly Living" amount="€500–€800" note="Accommodation, food & transport included" delay={160} />
            <CostCard label="Accommodation" amount="€200–€500" note="Per month · dorm or private rental" delay={240} />
            <CostCard label="Health Insurance" amount="€50–€150" note="Per month · private international plan" delay={320} />
            <CostCard label="Transport" amount="€20–€40" note="Per month · discounted student passes" delay={400} />
          </div>
        </div>
      </section>

      {/* ---------------- COURSES ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Popular Programmes"
            title="Industry-Aligned Degrees Built for European Careers"
            sub="From tech to business to healthcare — accredited Polish higher education providers offer industry-aligned degrees with strong global employment outcomes."
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

      {/* ---------------- ENGLISH REQUIREMENTS ---------------- */}
      <section
        style={{
          background: `linear-gradient(160deg, ${C.navyDark}, ${C.navyD} 60%, ${C.navy})`,
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
            background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`,
            opacity: 0.08,
            filter: "blur(30px)",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead
            tag="English Requirements"
            title="IELTS, TOEFL & PTE Score Guide"
            sub="Most programmes require proof of English proficiency. A Medium of Instruction (MOI) certificate may be accepted for academic admission — but IELTS 5.5+ or PTE 50+ are strongly recommended for your Embassy National Visa application."
            light
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            <Reveal>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(240,192,64,0.18)",
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
                  <span>🎓</span> Undergraduate (Bachelor's)
                </h3>
                {[
                  ["IELTS Academic", "5.5 – 6.5"],
                  ["TOEFL iBT", "72 – 94 pts"],
                  ["PTE Academic", "50 – 62"],
                  ["Duolingo English Test", "100 – 115"],
                  ["Cambridge B2 First (FCE)", "Accepted at B2 level"],
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
                        color: C.gold,
                        padding: "4px 12px",
                        background: "rgba(240,192,64,0.12)",
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
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.7,
                    borderRadius: 12,
                  }}
                >
                  💡 A Medium of Instruction (MOI) certificate may be accepted for academic admission. However, IELTS 5.5+ or PTE Academic 50+ are strongly recommended for your Embassy National Visa application.
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(240,192,64,0.18)",
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
                  <span>📚</span> Postgraduate (Master's)
                </h3>
                {[
                  ["IELTS Academic", "6.0 – 7.0"],
                  ["TOEFL iBT", "80 – 95 pts"],
                  ["PTE Academic", "58 – 68"],
                  ["TOEIC", "700+ pts"],
                  ["Cambridge CAE / CPE", "Accepted at C1/C2"],
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
                        color: C.gold,
                        padding: "4px 12px",
                        background: "rgba(240,192,64,0.12)",
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
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.7,
                    borderRadius: 12,
                  }}
                >
                  ⚠️ A Medium of Instruction (MOI) certificate may be accepted for academic admission, but IELTS 6.0+ or PTE Academic 58+ are strongly recommended for Embassy National Visa applications. Specialist programmes (e.g. Clinical Psychology) may require IELTS 7.0+.
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
            tag="Poland Student Visa Guide"
            title="Straightforward, Efficient & Fully Guided"
            sub="Poland's student visa process is straightforward. Langma International guides you through every document and every step."
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="lm-visa-wrap">
            <div>
              <VisaStep n={1} title="Receive Final Acceptance Letter" body="Once your application to the partner institution is approved and first-year fees are paid, you receive a Final Acceptance Letter — the core document required for your National Visa application." delay={0} />
              <VisaStep n={2} title="Prepare Visa Documents" body="Compile your passport, financial proof (PLN 700–800/month + PLN 2,500 travel reserve), insurance (€30,000 Schengen coverage), accommodation letter, educational documents, and completed visa application form." delay={100} />
              <VisaStep n={3} title="Apply at Polish Consulate / VFS" body="Submit your full application in person at the Polish Consulate or authorised VFS centre in your city. Visa fee: approximately €90. NAWA diploma recognition must be arranged prior to arrival." delay={200} />
              <VisaStep n={4} title="Receive National Visa (D-Type)" body="Embassy processing typically takes approximately 30–60 days from your consulate appointment. Your D-Type visa allows entry into Poland and travel within the Schengen Area." delay={300} />
              <VisaStep n={5} title="Apply for Temporary Residence Card (TRC)" body="After arrival, apply for your TRC — your long-term permit to study and live in Poland. Langma International provides complete guidance and support throughout this process." isLast delay={400} />
            </div>
            <Reveal delay={200}>
              <div
                style={{
                  background: `linear-gradient(160deg, ${C.navyDark}, ${C.navyD})`,
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
                  Required Documents
                </h3>
                {[
                  "Valid passport (with personal data pages)",
                  "Final Acceptance Letter from accredited Polish institution",
                  "Travel insurance — minimum €30,000 Schengen coverage",
                  "Proof of financial means (bank statements or sponsor letter)",
                  "Accommodation confirmation in Poland",
                  "Educational certificates with apostille / legalisation",
                  "Passport-format biometric photograph",
                  "Completed and signed visa application form",
                  "Cover letter (purpose of study)",
                  "English proficiency certificate (B2 level)",
                  "NAWA diploma recognition decision (non-EU/OECD/EFTA applicants)",
                  "Flight reservation (actual ticket not required at application stage)",
                ].map((d, i) => (
                  <div
                    key={d}
                    style={{
                      display: "flex",
                      gap: 12,
                      marginBottom: 12,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.75)",
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
                        color: C.gold,
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
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.75,
                    borderRadius: 8,
                  }}
                >
                  <strong style={{ color: C.gold }}>Processing:</strong> ~30–60 working days
                  <br />
                  <strong style={{ color: C.gold }}>Visa Fee:</strong> ~€90
                  <br />
                  <strong style={{ color: C.gold }}>Financial Proof:</strong> PLN 700–800/month + PLN 2,500 travel reserve
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
            tag="Salary Outlook · Poland & EU 2026"
            title="Career Earnings Across Key Polish & EU Sectors"
            sub="Poland's growing economy and access to the EU labour market make it one of the most strategically valuable study destinations in Europe for international graduates."
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
            Source: Polish salary benchmarks and EU labour market data 2026. Figures are indicative averages for Poland. Individual salaries vary by employer, experience, and role. EU-wide opportunities available to qualifying graduates.
          </p>
        </div>
      </section>

      {/* ---------------- CAREER OUTLOOK ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Career Outlook · Poland & EU 2026"
            title="Why Polish Graduates Get Hired"
            sub="Poland's graduates are employable because their degrees are built to match what the European economy actually needs — with access to an entire continent of opportunity."
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
          background: `linear-gradient(160deg, ${C.navyDark}, ${C.navyD})`,
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
            tag="Why Choose Langma International"
            title="Your Study Abroad Partner — Not Just an Agent"
            sub="From your first eligibility check to your first day on campus, we handle everything. No stress, no guesswork."
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
          <SectionHead tag="FAQs" title="Frequently Asked Questions" center />
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
          background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 60%, ${C.navyL} 100%)`,
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
                color: C.white,
                fontSize: "clamp(32px, 4.5vw, 56px)",
                marginBottom: 20,
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              Your European Future Starts
              <br />
              <em className="lm-grad-text" style={{ fontStyle: "italic" }}>
                With One Conversation.
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
              Seats for October 2026 are filling now. Get a free profile assessment from our Poland specialists and know exactly where you stand — today.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <NavyButton style={{ background: C.forest, padding: "16px 36px" }}>
                Book Free Counselling →
              </NavyButton>
              <GhostButton>Apply Now</GhostButton>
              <GhostButton>Talk to an Expert</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER INFO ---------------- */}
      <div
        style={{
          background: C.navyDark,
          padding: "24px 48px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
          borderTop: `1px solid rgba(240,192,64,0.1)`,
        }}
      >
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
          📍 E 73, South Extension Part-1, New Delhi — 110049
        </span>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
          📞 +91-9810117094
        </span>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
          ✉️ info@langmainternational.com
        </span>
      </div>

      {/* ---------------- RESPONSIVE ---------------- */}
      <style>{`
        @media (max-width: 860px) {
          .lm-visa-wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
