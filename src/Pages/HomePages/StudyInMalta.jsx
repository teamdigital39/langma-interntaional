import React, { useState, useEffect, useRef } from "react";
import PopupForm from "./PopupForm";
import FAQ from "./FAQ";

/**
 * Study in Malta — Langma International
 * Palette matches the Study in Poland / South Korea pages (teal brand accent over navy panels)
 */

const C = {
  navy: "#1AB7AC",
  navyD: "#1AB7AC",
  navyDark: "#1AB7AC",
  navyL: "#2E6466",
  gold: "#1AB7AC",
  goldL: "#1AB7AC",
  goldSoft: "#FDF3C8",
  goldTint: "#FFFAE8",
  cream: "#F5F7FA",
  cream2: "#E8EDF5",
  forest: "#2E7D5A",
  forestL: "#4CAF80",
  white: "#FFFFFF",
  ink: "#1ab7ac",
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
function SectionHead({ style, tag, title, sub, light, center }) {
  return (
    <Reveal>
      <div
        style={{
          marginBottom: 52,
          maxWidth: 760,
          margin: center ? "0 auto 52px" : "0 0 52px 0",
          textAlign: center ? "center" : "left",
          ...style,
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
              color: "#FFFFFF",
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
              color: "#FFFFFF",
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

function GhostButton({ children, dark, style, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      onClick={onClick}
      style={{
        background: dark ? C.goldTint : "rgba(240,192,64,0.1)",
        border: `1px solid ${dark ? "rgba(14,26,46,0.2)" : "rgba(255,255,255,0.25)"}`,
        padding: "14px 28px",
        fontSize: 14.5,
        fontWeight: 600,
        letterSpacing: "0.3px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        borderRadius: 999,
        color: "#ffffff",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ===================================================================
 *  Reason card (used for Why Malta + Differentiators)
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
          {num && (
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
          )}
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
          color: "rgb(255, 255, 255)",
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
            color: h ? "#FFFFFF" : "#429198",
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
 *  Outlook card (used for Student Life)
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
 *  Application process step (horizontal strip)
 * ================================================================ */
function ProcessStep({ n, title, body, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        padding: "28px 18px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `all 0.6s ease ${delay}ms`,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          background: C.gold,
          color: C.navyD,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          fontWeight: 700,
          margin: "0 auto 16px",
        }}
      >
        {n}
      </div>
      <h4
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: C.white,
          marginBottom: 8,
          textTransform: "uppercase",
          letterSpacing: "0.6px",
        }}
      >
        {title}
      </h4>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>
        {body}
      </p>
    </div>
  );
}

/* ===================================================================
 *  Docs / checklist box
 * ================================================================ */
function DocsBox({ title, items, note }) {
  return (
    <Reveal delay={150}>
      <div
        style={{
          background: `linear-gradient(160deg, ${C.navyDark}, ${C.navyD})`,
          padding: 34,
          borderRadius: 22,
          overflow: "hidden",
          position: "relative",
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
            fontSize: 20,
            fontWeight: 600,
            color: C.white,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
            position: "relative",
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              background: C.gold,
              color: C.navyD,
              borderRadius: 10,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            📋
          </span>
          {title}
        </h3>
        {items.map((d) => (
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
                color: "#FFFFFF",
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
        {note && (
          <div
            style={{
              background: "rgba(240,192,64,0.1)",
              borderLeft: `3px solid ${C.gold}`,
              padding: "16px 18px",
              marginTop: 20,
              fontSize: 12.5,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.75,
              borderRadius: 8,
            }}
          >
            {note}
          </div>
        )}
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
    "🇲🇹 Malta 2026 Intake Open",
    "✦ 100% English-Speaking Country",
    "✦ MQF / EQF Recognised Degrees",
    "✦ Tuition from €6,000/yr",
    "✦ EU Member · Schengen Zone",
    "✦ 300+ Days of Sunshine",
    "✦ Foundation to Master's",
    "✦ 80+ Nationalities on Campus",
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
 *  DATA — Malta content
 * ================================================================ */
const reasons = [
  { icon: "🗣️", title: "English is the Official Language", body: "One of only two countries in the EU where English is an official language. No language courses, no adjustment period — just focused, global-standard learning from day one." },
  { icon: "🎓", title: "MQF / EQF Recognised Qualifications", body: "All qualifications are aligned to the Malta Qualifications Framework (MQF) and the European Qualifications Framework (EQF) — internationally recognised across Europe and beyond." },
  { icon: "💼", title: "Career-First Education Model", body: "Malta's education system is built around practical outcomes. Industry exposure, project-based learning, and skills-first delivery prepare students for employment, not just examinations." },
  { icon: "💰", title: "Affordable European Education", body: "Tuition and living costs in Malta are significantly lower than Western European destinations — without compromising the quality, recognition, or prestige of a European degree." },
  { icon: "🌍", title: "EU Member — Schengen Access", body: "Study in an EU member state and gain exposure to European business, travel, and professional networks. Your Malta qualification opens doors across 27 EU countries." },
  { icon: "💻", title: "Technology & AI Growth Hub", body: "Malta has positioned itself as a growing centre for fintech, iGaming, AI, and digital business. Students in tech and business fields gain access to a fast-growing industry ecosystem." },
  { icon: "🏨", title: "Tourism & Hospitality Capital", body: "Malta welcomes millions of visitors annually. For students in hospitality, tourism, and events management, this is a live, active classroom — not just a theory-based programme." },
  { icon: "🛡️", title: "Safe, Welcoming & Multicultural", body: "Malta consistently ranks among Europe's safest countries. Its international student community spans dozens of nationalities — making it a genuinely global learning environment." },
];

const differentiators = [
  { icon: "🗣️", title: "No Language Barrier — Ever", body: "English is woven into every corner of Maltese life — business, government, education, and daily interaction. You'll never need a translator or a language bridge course." },
  { icon: "⚡", title: "Fast-Track Study Pathways", body: "Accelerated programmes allow students to complete Foundation, Diploma, and Bachelor's qualifications in a shorter timeframe — without sacrificing academic rigour or recognition." },
  { icon: "🏨", title: "Live Tourism Education", body: "Malta's tourism industry is one of the most active in the Mediterranean. Hospitality and tourism students learn in a fully operational, internationally-facing industry environment." },
  { icon: "💻", title: "Emerging Tech & Fintech Hub", body: "Malta is home to a rapidly expanding digital economy — fintech, iGaming, AI, and blockchain are active sectors, offering a real-world professional environment for students." },
  { icon: "📋", title: "MQF-Aligned Qualifications", body: "Every programme is structured under the Malta Qualifications Framework — aligned to European standards and recognised by employers and academic institutions globally." },
  { icon: "🌍", title: "Gateway to European Career Networks", body: "As an EU member state, Malta gives students access to European professional networks, business communities, and career pathways that extend far beyond the island itself." },
  { icon: "🏥", title: "Healthcare & Nursing Pathways", body: "Malta offers structured healthcare and nursing education pathways with European accreditation — an increasingly valuable qualification for mobile healthcare professionals." },
  { icon: "☀️", title: "Mediterranean Quality of Life", body: "300+ days of sunshine, a safe environment, a compact and walkable capital, and a genuinely welcoming culture make Malta one of Europe's most liveable student destinations." },
];

const courses = [
  { icon: "🌐", title: "Business & Management", body: "International business strategy, leadership, operations, and global management — Foundation to Master's level." },
  { icon: "📊", title: "Accounting & Finance", body: "Financial reporting, management accounting, corporate finance, and professional accountancy pathways." },
  { icon: "🤖", title: "Artificial Intelligence & Cloud", body: "AI fundamentals, machine learning, cloud infrastructure, and data-driven decision making for modern business." },
  { icon: "💻", title: "Information Technology", body: "Software development, cybersecurity, systems administration, and digital infrastructure programmes." },
  { icon: "🏨", title: "Hospitality & Tourism", body: "Hospitality management, luxury tourism, events, and food & beverage operations — with live industry exposure." },
  { icon: "🏥", title: "Health & Social Care", body: "Healthcare management, social care, and support work programmes aligned to European professional standards." },
  { icon: "🚢", title: "Logistics & Supply Chain", body: "Global logistics, maritime trade, supply chain operations, and procurement management." },
  { icon: "💉", title: "Nursing Studies", body: "Pre-nursing foundation and nursing pathway programmes with European academic and clinical frameworks." },
  { icon: "📱", title: "Digital Business", body: "E-commerce, digital marketing, data strategy, social media, and online business management." },
  { icon: "🚀", title: "Entrepreneurship", body: "Startup strategy, venture creation, business modelling, and innovation management for aspiring founders." },
];

const admissionDocs = [
  "Valid passport — clear copy, front and back",
  "Most recent academic transcripts and mark sheets",
  "Degree certificate or school leaving qualification",
  "English proficiency test result — IELTS / TOEFL / PTE / Cambridge",
  "Professional Resume / CV",
  "Statement of Purpose (SOP) — outlining your goals and motivation",
  "Passport-size photograph (white background)",
  "Proof of financial means — approx. €20–€30/day (€750–€1,000/month) if accommodation isn't fully prepaid",
  "Dedicated email address for institution correspondence",
];

const academicQuals = [
  "Class 12th — Indian Standard Boards (CBSE, ISC, State)",
  "International Baccalaureate (IB) — Diploma & Career Programme",
  "British A-Levels & (I)GCSE qualifications",
  "BTEC Level 3 (Extended Diploma)",
  "European Baccalaureate (EB)",
  "American High School Diploma (college preparatory)",
  "Foundation or Access to Higher Education qualifications",
  "Bachelor's degree for postgraduate programme entry",
];

const visaDocs = [
  "Valid passport with minimum 18 months validity",
  "Unconditional offer letter from the institution",
  "Academic transcripts and degree certificates",
  "English proficiency test result — IELTS / TOEFL / PTE",
  "Passport-size photograph (white background)",
  "Statement of Purpose (SOP)",
  "Proof of financial means — approx. €20–€30/day (€750–€1,000/month) for course duration if accommodation not prepaid",
  "Proof of accommodation in Malta",
  "Travel and health insurance documentation",
  "Completed visa application form",
  "Tuition fee payment receipt confirming required payment to the institution",
];

const lifeCards = [
  { icon: "☀️", tag: "Lifestyle", title: "Mediterranean Living at Its Finest", body: "With 300+ days of sunshine, crystal-clear waters, and a compact, walkable capital city, Malta offers a quality of life that few study destinations can match." },
  { icon: "🛡️", tag: "Safety", title: "One of Europe's Safest Countries", body: "Malta consistently ranks among the safest countries in Europe. Low crime rates and a strong international student community make it a reassuring choice." },
  { icon: "🌍", tag: "Community", title: "80+ Nationalities in One Place", body: "Malta's student population is genuinely multicultural. Classrooms bring together students from across Asia, Europe, Africa, and the Middle East." },
  { icon: "✈️", tag: "Travel", title: "Europe Within Reach", body: "Malta Airport connects directly to major European cities — Rome, London, Frankfurt, Barcelona. Weekend travel across Europe is a real part of student life." },
  { icon: "🏛️", tag: "Culture", title: "History, Heritage & Modern Energy", body: "Valletta — a UNESCO World Heritage capital — sits alongside modern cafe culture, vibrant nightlife, and a thriving arts and creative scene." },
  { icon: "💶", tag: "Cost", title: "Affordable European Living", body: "Compared to destinations like the UK, Germany, or the Netherlands, Malta offers a significantly lower cost of living without lifestyle compromise." },
];

const processSteps = [
  { title: "Profile Evaluation", body: "Free assessment of your academic background, English level, and programme suitability" },
  { title: "Document Submission", body: "We prepare and submit your complete application package accurately and on time" },
  { title: "Application Review", body: "Institution reviews your application — we liaise directly to track progress" },
  { title: "Offer Letter", body: "Receive your unconditional offer letter confirming your place in your chosen programme" },
  { title: "Visa Process", body: "Full visa document preparation, submission support, and biometric appointment guidance" },
  { title: "Travel Preparation", body: "Pre-departure briefing, accommodation confirmation, and arrival day planning" },
  { title: "Begin Your Journey", body: "Land in Malta ready to study. Your international education journey officially begins" },
];

const support = [
  { icon: "🔍", title: "Free Profile Evaluation", body: "We honestly assess your academic and English proficiency profile and identify which Malta programmes you genuinely qualify for — before you spend a rupee." },
  { icon: "🎯", title: "Programme Matching", body: "We match you to the right programme level, intake, and field of study based on your career goals, academic history, and long-term ambitions." },
  { icon: "📝", title: "SOP & Application Support", body: "Our team guides you through a compelling Statement of Purpose and prepares your complete application file to the highest standard." },
  { icon: "📋", title: "Document Preparation", body: "We review, organise, and prepare all your academic and personal documents — ensuring nothing is missing or likely to delay your application." },
  { icon: "🛂", title: "Visa Documentation Support", body: "Full guidance on your Malta student visa application — financial document structure, checklist preparation, and biometric appointment support." },
  { icon: "🏠", title: "Accommodation Guidance", body: "We assist with student accommodation options in Malta — so you arrive knowing exactly where you'll live, with no last-minute uncertainty." },
  { icon: "✈️", title: "Pre-Departure Briefing", body: "A thorough pre-departure session covering what to pack, what to expect, key contacts, and how to navigate your first days in Malta." },
  { icon: "💬", title: "One Dedicated Advisor", body: "One real person, fully available throughout your journey. No automated responses, no queues — just expert, personalised guidance." },
];

const careerTags = [
  "Hospitality Management", "Digital Marketing", "Fintech & Finance", "AI & Data Analytics",
  "Healthcare Administration", "Tourism Operations", "Business Consulting", "Logistics & Supply Chain",
  "Entrepreneurship", "IT & Cybersecurity", "Nursing & Healthcare", "Accounting & Audit",
  "Event Management", "EU Career Pathways",
];

const faqs = [
  { q: "Is Malta a good destination for international students?", a: "Malta is an excellent study destination for international students seeking affordable, internationally recognised, English-taught qualifications within the European Union. It combines EU academic recognition, a fully English-speaking environment, a safe culture, and a Mediterranean lifestyle — at a significantly lower cost than Western European destinations." },
  { q: "Is English the language of instruction in Malta?", a: "Yes. English is an official language of Malta and the primary language of instruction across all higher education programmes. Students do not need to learn Maltese or any other language to study or live comfortably in Malta." },
  { q: "Can I study in Malta without IELTS?", a: "IELTS is the most widely accepted test, but TOEFL iBT, PTE Academic, and Cambridge English qualifications are also accepted by most programmes. Foundation programmes require lower scores (IELTS 4.5–5.5), Bachelor's require 5.5–6.0, and postgraduate require 6.0–6.5 or equivalent." },
  { q: "How much does it cost to live in Malta as a student?", a: "The average monthly cost of living ranges between €700 and €1,100, covering accommodation, food, transportation, and personal expenses. Tuition fees typically range from €6,000 to €14,000 per year depending on the level and programme." },
  { q: "Can international students work part-time in Malta?", a: "Yes, up to 20 hours per week during term time — but this right becomes available only after the first 90 days in Malta. Students must first receive their e-Residence card and a Jobsplus employment licence before legally commencing any part-time work." },
  { q: "Are Malta qualifications recognised internationally?", a: "Yes. All qualifications in Malta are structured under the Malta Qualifications Framework (MQF), directly aligned to the European Qualifications Framework (EQF) — formally recognised across all 27 EU member states and respected globally." },
  { q: "What are the popular courses to study in Malta?", a: "The most in-demand areas include Business & Management, Hospitality & Tourism Management, AI & Cloud Computing, Information Technology, Accounting & Finance, Digital Business, Health & Social Care, Nursing Studies, Logistics & Supply Chain, and Entrepreneurship." },
  { q: "What are the visa requirements for studying in Malta?", a: "Key documents typically include a valid passport, unconditional offer letter, academic transcripts, English proficiency results, proof of financial means, accommodation confirmation, health insurance, and a completed visa application form." },
  { q: "Are study gaps accepted for admission to Malta?", a: "Generally, yes. Most programmes consider applications on overall academic merit and English proficiency rather than penalising students for study gaps. Mature students and working professionals are welcome." },
  { q: "Is Malta safe for international students?", a: "Malta is consistently ranked among the safest countries in Europe, with very low crime rates, a stable political environment, and a well-established international student community." },
];

/* ===================================================================
 *  MAIN
 * ================================================================ */
export default function StudyMaltaPage() {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [open, setOpen] = useState(false);

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
        @keyframes lm-bg-shift {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes lm-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
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
      <section className="bg-[#f5f5f5] overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 items-center gap-12">

            {/* Left Content */}
            <div className="z-10">
              <h1
                className="text-[#15224C]"
                style={{
                  fontSize: "clamp(28px, 3.6vw, 46px)",
                  fontWeight: 600,
                  lineHeight: 1.12,
                  letterSpacing: "-0.6px",
                }}
              >
                Study In <span className="text-[#1ab7ac]">Malta</span>
                <br />
                Practical Education.
                <br />
                Global Opportunities.
              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
                English-taught qualifications. MQF-recognised degrees.
                Affordable European living. Malta offers internationally
                recognised qualifications, a fully English-speaking academic
                environment, and the lifestyle of the Mediterranean — all at
                a fraction of the cost of traditional European destinations.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  "✓100% English-Speaking Country",
                  "✓MQF / EQF Recognised Degrees",
                  "✓Career-First Education Model",
                  "✓EU Member — Schengen Zone",
                ].map((item, index) => (
                  <span
                    key={index}
                    className="bg-[#1ab7ac] text-white px-4 py-2 rounded-full text-sm md:text-base"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-[#006C70] hover:bg-[#00575a] transition-all text-white px-8 py-4 rounded-full font-semibold text-lg cursor-pointer"
                >
                  Apply Now →
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="border border-[#006C70] text-[#006C70] hover:bg-[#006C70] hover:text-white transition-all px-8 py-4 rounded-full font-semibold text-lg cursor-pointer"
                >
                  Check My Eligibility
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center lg:justify-end">

              {/* Decorative Rectangle */}
              <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-50 h-[490px] bg-[#2C6D73] rounded-[24px]"></div>

              {/* Dots */}
              <div className="hidden lg:grid absolute left-12 top-1/2 -translate-y-1/2 grid-cols-12 gap-4 z-0">
                {[...Array(180)].map((_, i) => (
                  <span key={i} className="w-2 h-2 rounded-full bg-[#C7E8E5]"></span>
                ))}
              </div>

              {/* Circle Image */}
              <div className="relative z-10">
                <div className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px] rounded-full overflow-hidden">
                  <img
                    src="images/malta.jpeg"
                    alt="Study in Malta"
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
                background: C.navyDark,
                border: "1px solid rgba(240,192,64,0.18)",
                borderRadius: 18,
                overflow: "hidden",
                marginTop: 56,
              }}
            >
              <BoardingStat value={100} suffix="%" label="English-Taught" sub="No language barrier" delay={100} />
              <BoardingStat value={27} suffix="" label="EU Member State" sub="Schengen Zone access" delay={250} />
              <BoardingStat value={300} suffix="+" label="Days of Sunshine" sub="Mediterranean climate" delay={400} />
              <BoardingStat value={80} suffix="+" label="Nationalities" sub="On campus" delay={550} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <Marquee />

      {/* ---------------- WHY MALTA ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#429198" }}>Why Malta</span>}
            title={
              <span style={{ color: "#4197a2" }}>
                An English-Speaking European Country That Puts Careers First
              </span>
            }
            sub={
              <span style={{ color: "#429198" }}>
                Malta is one of Europe's most underrated study destinations. As a full EU member state where English is an official language, Malta removes the barriers that hold students back elsewhere — no language learning requirement, no translation friction, no cultural distance from global business.
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
          ✨ Malta 2026 intake is open. Our advisors can assess your profile today — free, no commitment required.
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
            title="Malta — Quick Facts for International Students"
            sub="Everything you need to know before planning your study journey to Malta."
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
                <FactRow label="Location" value="Southern Europe · Central Mediterranean · EU Schengen Zone" />
                <FactRow label="Capital" value="Valletta — UNESCO World Heritage City" />
                <FactRow label="Official Languages" value="English & Maltese — all instruction in English" />
                <FactRow label="Currency" value="Euro (€)" />
                <FactRow label="Climate" value="Mediterranean · 300+ sunny days per year" />
                <FactRow label="Qualification Framework" value="MQF / EQF — EU & internationally recognised" />
                <FactRow label="Study Levels Available" value="Foundation · Certificate · Diploma · Bachelor's · Master's" />
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(240,192,64,0.15)",
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <FactRow label="Average Tuition Fees" value="€6,000 – €14,000 / year (programme-dependent)" />
                <FactRow label="Average Living Cost" value="€700 – €1,100 / month" />
                <FactRow label="Intakes" value="October · February · May (varies by programme)" />
                <FactRow label="Part-Time Work Rights" value="Up to 20 hrs/week — after 90 days, with e-Residence card & Jobsplus licence" />
                <FactRow label="International Community" value="Students from 80+ countries" />
                <FactRow label="Key Industries" value="Tourism · Fintech · iGaming · Healthcare · Digital Business" />
                <FactRow label="English Requirement" value="IELTS / TOEFL / PTE / Cambridge — varies by level" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- WHAT MAKES MALTA DIFFERENT ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#429198" }}>What Sets It Apart</span>}
            title={
              <span style={{ color: "#4197a2" }}>
                What Makes Malta Different from Every Other European Destination
              </span>
            }
            sub={
              <span style={{ color: "#429198" }}>
                Malta doesn't ask you to adapt to it. It was built for international students — English-first, career-focused, and connected to global industry from day one.
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
            {differentiators.map((d, i) => (
              <ReasonCard key={d.title} title={d.title} body={d.body} icon={d.icon} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- POPULAR STUDY AREAS ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#429198" }}>Popular Study Areas</span>}
            title={
              <span style={{ color: "#4197a2" }}>
                In-Demand Programmes for International Students
              </span>
            }
            sub={
              <span style={{ color: "#429198" }}>
                Career-aligned, English-taught, and structured under the MQF framework. From Foundation to Master's — choose the path that fits your ambition.
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
          background: `linear-gradient(160deg, ${C.navyDark}, ${C.navyD} 60%, ${C.navy})`,
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
            tag="English Requirements"
            title="IELTS, TOEFL, PTE & Cambridge — What You Need"
            sub="English proficiency requirements vary by programme level. Foundation entry provides a stepping stone for students who need to build their English before beginning a degree."
            light
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              {
                title: "Foundation / Certificate",
                icon: "🎓",
                rows: [
                  ["IELTS Academic", "4.5 – 5.5 overall"],
                  ["TOEFL iBT", "35 – 55 points"],
                  ["PTE Academic", "36 – 46 points"],
                  ["Cambridge English", "B1 level minimum"],
                ],
                note: "💡 Foundation programmes prepare students for direct Bachelor's progression, typically without additional English testing.",
                noteBg: "rgba(240,192,64,0.08)",
                noteBorder: "rgba(240,192,64,0.2)",
              },
              {
                title: "Bachelor's / Diploma",
                icon: "📘",
                rows: [
                  ["IELTS Academic", "5.5 – 6.0 overall"],
                  ["TOEFL iBT", "60 – 80 points"],
                  ["PTE Academic", "46 – 61 points"],
                  ["Cambridge English", "B2 level · FCE minimum"],
                ],
                note: "⚠️ Minimum academic requirement: equivalent of Class 12th, A-Levels, IB Diploma, BTEC Level 3, or equivalent.",
                noteBg: "rgba(46,125,90,0.08)",
                noteBorder: "rgba(46,125,90,0.25)",
              },
              {
                title: "Master's / Postgraduate",
                icon: "📚",
                rows: [
                  ["IELTS Academic", "6.0 – 6.5 overall"],
                  ["TOEFL iBT", "80 – 90 points"],
                  ["PTE Academic", "58 – 64 points"],
                  ["Cambridge English", "C1 level minimum"],
                ],
                note: "⚠️ A recognised Bachelor's degree is required for postgraduate entry. Requirements vary by programme and discipline.",
                noteBg: "rgba(240,192,64,0.08)",
                noteBorder: "rgba(240,192,64,0.2)",
              },
            ].map((card, ci) => (
              <Reveal key={card.title} delay={ci * 120}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(240,192,64,0.18)",
                    padding: 32,
                    borderRadius: 20,
                    backdropFilter: "blur(8px)",
                    height: "100%",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: C.white,
                      marginBottom: 20,
                      paddingBottom: 14,
                      borderBottom: `2px solid ${C.gold}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span>{card.icon}</span> {card.title}
                  </h3>
                  {card.rows.map(([t, s], idx, arr) => (
                    <div
                      key={t}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 0",
                        borderBottom: idx === arr.length - 1 ? "none" : "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,0.82)" }}>{t}</span>
                      <span
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: "#FFFFFF",
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
                      background: card.noteBg,
                      border: `1px solid ${card.noteBorder}`,
                      padding: "14px 16px",
                      marginTop: 20,
                      fontSize: 12, 
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.7,
                      borderRadius: 12,
                    }}
                  >
                    {card.note}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ADMISSION REQUIREMENTS ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#429198" }}>Admission Requirements</span>}
            title={<span style={{ color: "#4197a2" }}>What You Need to Apply for Malta</span>}
            sub={
              <span style={{ color: "#429198" }}>
                A clear, straightforward process. Prepare these documents and our team will manage the rest.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="lm-visa-wrap">
            <Reveal>
              <div>
                {admissionDocs.map((d, idx, arr) => (
                  <div
                    key={d}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      padding: "13px 0",
                      borderBottom: idx === arr.length - 1 ? "none" : `1px solid ${C.border}`,
                      fontSize: 14,
                      color: C.slate,
                    }}
                  >
                    <span style={{ color: C.navy, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {d}
                  </div>
                ))}
                <div
                  style={{
                    background: C.goldTint,
                    border: `1px solid ${C.goldSoft}`,
                    borderLeft: `3px solid ${C.navy}`,
                    padding: "16px 18px",
                    marginTop: 18,
                    fontSize: 13,
                    color: "#8a3810",
                    lineHeight: 1.7,
                  }}
                >
                  ℹ️ Requirements may vary depending on the programme level and your individual academic background. Contact Langma International for a personalised eligibility review before applying.
                </div>
              </div>
            </Reveal>
            <DocsBox title="Academic Qualifications Accepted" items={academicQuals} />
          </div>
        </div>
      </section>

      {/* ---------------- VISA GUIDE ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#429198" }}>Student Visa</span>}
            title={<span style={{ color: "#4197a2" }}>Malta Student Visa — Step by Step</span>}
            sub={
              <span style={{ color: "#429198" }}>
                Securing a Malta student visa is a structured, manageable process. Here's exactly how it works — and how Langma International supports you through every stage.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="lm-visa-wrap">
            <div>
              <VisaStep n={1} title="Choose Your Programme & Apply" body="Select your programme level and intake. Submit your initial application with basic supporting documents through your Langma International advisor." delay={0} />
              <VisaStep n={2} title="Receive Conditional Offer Letter" body="Your application is assessed by the admissions team. A conditional offer letter is issued pending verification of full documentation." delay={80} />
              <VisaStep n={3} title="Submit Full Document Package" body="Complete your full application with all required academic, personal, and financial documents. Our team reviews and prepares your file for submission." delay={160} />
              <VisaStep n={4} title="Receive Unconditional Offer Letter" body="Upon approval of your complete application, an unconditional offer letter confirms your place. This is a critical document for your visa application." delay={240} />
              <VisaStep n={5} title="Tuition Fee Payment" body="Institutions typically require payment of a substantial portion or the full first-year tuition fee before issuing the unconditional offer letter required for visa applications." delay={320} />
              <VisaStep n={6} title="Apply for Malta Student Visa" body="Your visa application is submitted to the Malta High Commission or nearest VFS centre. Our team prepares your full visa document package." delay={400} />
              <VisaStep n={7} title="Biometric Appointment & Visa Collection" body="Attend your biometric appointment. Receive your visa approval and collect your stamped passport. Prepare for travel to Malta." delay={480} />
              <VisaStep n={8} title="Arrive in Malta & Begin Studies" body="Travel to Malta with your documents, accommodation confirmation, and pre-departure briefing from Langma International. Your journey begins." isLast delay={560} />
            </div>
            <div style={{ position: "sticky", top: 100 }}>
              <DocsBox
                title="Visa Documents Checklist"
                items={visaDocs}
                note={
                  <>
                    ⚠️ Visa policies and documentation requirements may change in line with current Maltese and EU immigration regulations. Always confirm current requirements with your Langma International advisor.
                    <br />
                    <br />
                    ✅ Study gaps are generally accepted. All ages considered. Contact us for a free personalised eligibility review.
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CAREER & FUTURE OPPORTUNITIES ---------------- */}
      <section
        style={{
          background: `linear-gradient(160deg, ${C.navyDark}, ${C.navyD})`,
          padding: "90px 48px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionHead
            tag="Career & Future Opportunities"
            title="Where a Malta Education Takes You"
            center
            light
            sub="A Malta qualification opens far more doors than the island itself. With MQF/EQF recognition across the European Union, graduates are positioned for careers across 27 EU member states — and beyond. Malta's fast-growing sectors in fintech, digital business, hospitality, and healthcare provide hands-on industry exposure during your studies."
          />
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {careerTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 13,
                    fontWeight: 500,
                    padding: "9px 20px",
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

      {/* ---------------- STUDENT LIFE ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#429198" }}>Student Life</span>}
            title={<span style={{ color: "#4197a2" }}>Life in Malta — Sun, Culture & Global Community</span>}
            sub={
              <span style={{ color: "#429198" }}>
                Malta isn't just a place to study — it's a place to thrive. Here's what daily life actually looks like as an international student in Malta.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
            {lifeCards.map((l, i) => (
              <OutlookCard key={l.title} {...l} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- APPLICATION PROCESS ---------------- */}
      <section
        style={{
          background: `linear-gradient(160deg, ${C.navyDark}, ${C.navyD})`,
          padding: "90px 48px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Application Process"
            title="7 Steps to Studying in Malta"
            sub="A clear, guided process — from your first enquiry to your first day of class. Langma International is with you at every stage."
            light
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              background: "rgba(255,255,255,0.04)",
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            {processSteps.map((s, i) => (
              <ProcessStep key={s.title} n={i + 1} title={s.title} body={s.body} delay={i * 70} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WHY LANGMA ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#429198" }}>Why Langma International</span>}
            title={<span style={{ color: "#4197a2" }}>Your Trusted Partner — From Enquiry to Enrolment</span>}
            sub={
              <span style={{ color: "#429198" }}>
                We don't just submit applications. We invest in your success — with expert guidance, personalised support, and complete transparency at every stage.
              </span>
            }
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
      <FAQ />
      {/* <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag={<span style={{ color: "#429198" }}>FAQs</span>} title="Frequently Asked Questions" center />
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
              Start Your Malta Study Journey
              <br />
              <em className="lm-grd-text" style={{ fontStyle: "italic" }}>
                With Langma International.
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
              Europe's most accessible English-speaking destination is open for 2026. MQF-recognised qualifications. Affordable living. A global career network. One conversation could change everything.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <NavyButton onClick={() => setOpen(true)} style={{ background: C.forest, padding: "16px 36px" }}>
                Apply Now →
              </NavyButton>
              <GhostButton onClick={() => setOpen(true)}>Book Free Counselling</GhostButton>
              <GhostButton onClick={() => setOpen(true)}>Get Free Assessment</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER INFO ---------------- */}
      <div
        className="-mb-[40px]"
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
        <span style={{ fontSize: 13, color: "#4197a2", display: "block" }}>
          📍{" "}
          <a
            href="https://www.google.com/maps/place/Langma+International/@28.5700637,77.2214716,765m/data=!3m1!1e3!4m15!1m8!3m7!1s0x390ce25c4343e17b:0x9f40fbe93cafcba5!2s73,+South+Extension+I,+Block+H,+New+Delhi,+Delhi+110049!3b1!8m2!3d28.5700637!4d77.2214716!16s%2Fg%2F11hfk14hwt!3m5!1s0x390ce25dba89c087:0x6b74c7356d18b11a!8m2!3d28.5700396!4d77.2209663!16s%2Fg%2F1jglvgls2?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            E 73, South Extension Part-1, New Delhi — 110049
          </a>
        </span>

        <span style={{ fontSize: 13, color: "#ffffff", display: "block" }}>
          📞{" "}
          <a href="tel:+919810117094" style={{ color: "#ffffff", textDecoration: "none" }}>
            +91-9810117094
          </a>
        </span>

        <span style={{ fontSize: 13, color: "#ffffff", display: "block" }}>
          ✉️{" "}
          <a href="mailto:info@langmainternational.com" style={{ color: "#ffffff", textDecoration: "none" }}>
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