import React, { useState, useEffect, useRef } from "react";
import PopupForm from "./PopupForm";
import FAQ from "./FAQ";

/**
 * Study in Georgia — Langma International
 * Palette matches the Study in Poland / South Korea / Malta / Dubai / Singapore / Mauritius / Netherlands / Cyprus pages
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
function BoardingStat({ prefix = "", value, suffix = "", label, sub, delay, text }) {
  const [ref, visible] = useReveal();
  const animated = useCountUp(value ?? 0, 1500, visible);
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
          fontSize: "clamp(22px, 2.4vw, 34px)",
          fontWeight: 600,
          color: C.gold,
          lineHeight: 1,
          letterSpacing: "-0.5px",
          display: "flex",
          alignItems: "baseline",
          gap: 2,
        }}
      >
        {text ? (
          text
        ) : (
          <>
            <span style={{ color: C.goldL, fontSize: "0.7em" }}>{prefix}</span>
            {animated}
            <span style={{ color: C.goldL, fontSize: "0.7em" }}>{suffix}</span>
          </>
        )}
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
            fontSize: 24,
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
            fontSize: icon ? 17 : 13,
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
        {tag && (
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
        )}
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
 *  Docs / checklist box
 * ================================================================ */
function DocsBox({ title, items, note }) {
  return (
    <Reveal delay={150}>
      <div
        style={{
          background: C.cream2,
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
        {note && (
          <div
            style={{
              background: "rgba(240,192,64,0.1)",
              borderLeft: `3px solid ${C.gold}`,
              padding: "16px 18px",
              marginTop: 20,
              fontSize: 12.5,
              color: C.slate,
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
    "🇬🇪 Georgia 2026 Intake Open",
    "✦ European Academic Standards",
    "✦ English-Medium Programs",
    "✦ 5-Hour Direct Flight from Delhi",
    "✦ Highest FMGE Passing Ratio",
    "✦ 10,000+ Indian Students",
    "✦ WHO / FAIMER / ECFMG Recognised",
    "✦ Career Access Across 28+ EU Countries",
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
 *  DATA — Georgia content
 * ================================================================ */
const reasons = [
  { icon: "🇪🇺", title: "European Academic Standards", body: "Georgia's higher education system follows European and international accreditation standards, including the Bologna Process and ECTS credit system — meaning your degree is structured to global benchmarks from day one." },
  { icon: "🗣️", title: "English-Medium Programs", body: "Degree programs in medicine, business, law, engineering, and more are taught entirely in English across Georgian institutions — no language barrier, no local language prerequisite to begin your studies." },
  { icon: "💰", title: "Genuinely Affordable Tuition", body: "Tuition fees in Georgia are significantly lower than in Western Europe, the UK, or the USA — and substantially more affordable than private medical or professional colleges in India." },
  { icon: "🏠", title: "Budget-Friendly Living Costs", body: "The average monthly cost of living — including food and accommodation — is approximately ₹20,000 per month. Tbilisi alone has over 100 Indian restaurants, and public transport is extremely affordable." },
  { icon: "🛡️", title: "Safe, Student-Friendly Environment", body: "Georgia is known for its low crime rates, offering a safe and secure environment for foreign students. It is considered safe for foreigners even at night — a genuine priority for students and families alike." },
  { icon: "🏆", title: "Highest FMGE Passing Ratio", body: "For Indian medical aspirants, Georgia consistently delivers the highest FMGE passing ratio compared to other overseas medical study destinations such as Russia, Kazakhstan, Kyrgyzstan, and Nepal." },
  { icon: "✈️", title: "5-Hour Direct Flight from India", body: "A direct flight from New Delhi to Tbilisi takes approximately 5 hours. With IndiGo operating daily direct flights since August 2024, Georgia is one of the most physically accessible study destinations for Indian students." },
  { icon: "🎓", title: "Globally Recognised Degrees", body: "Medical and professional degrees from Georgian institutions are listed with the WHO, FAIMER, ECFMG (USA), and recognised by the NMC/MCI — making graduates eligible to pursue careers and licensing examinations globally." },
  { icon: "🌍", title: "International Exposure & Career Mobility", body: "Georgian institutions follow European and American accreditation standards, and graduates can apply to practise in 28+ European countries — with recognition extending to Australia, New Zealand, Canada, and Germany." },
  { icon: "🤝", title: "Thriving Indian Student Community", body: "Georgia is home to over 10,000 Indian students, with a strong cultural support network — Indian messes, cultural events, and Indo-Georgian exchanges — making the transition from home genuinely smooth." },
];

const eduCards = [
  { icon: "🏅", title: "International & European Recognition", body: "Georgian institutions adhere to European and American accreditation standards. Programs are listed with WHO, FAIMER, ECFMG (USMLE), and follow the Bologna Process — ensuring degrees hold genuine international standing.", tag: "Accreditation" },
  { icon: "🗣️", title: "Fully English-Medium Instruction", body: "Degree programs across medicine, law, business, and engineering are conducted entirely in English. There is no requirement to learn Georgian to pursue or complete your degree.", tag: "Language" },
  { icon: "🏥", title: "Hands-On Learning from Early Years", body: "Medical education in Georgia provides clinical exposure beginning in the third year. Students train in real hospital environments, developing diagnostic, procedural, and patient-care skills.", tag: "Clinical Training" },
  { icon: "📋", title: "India's Highest Foreign MD Pass Rate", body: "Georgia consistently offers the highest FMGE passing ratio for Indian medical graduates compared to other overseas study destinations, with a curriculum recognised for preparing students for Indian licensing exams.", tag: "FMGE / NExT" },
  { icon: "🚀", title: "Career Readiness Beyond Georgia", body: "Graduates can pursue postgraduate residencies and careers across 28+ European countries, with recognition extending to Australia, New Zealand, Canada, and Germany — subject to each country's own requirements.", tag: "Global Pathways" },
  { icon: "🏛️", title: "Modern Campus & Research Environment", body: "Georgian institutions feature modern simulation labs, advanced digital libraries, and research partnerships with international institutions — producing graduates ready for global professional environments.", tag: "Infrastructure" },
];

const courses = [
  { icon: "🩺", title: "Medicine & Health Sciences", body: "The most sought-after field for Indian students. 6-year MD programs taught in English, recognised by WHO, NMC/MCI, and FAIMER — eligible for FMGE/NExT on return to India." },
  { icon: "🦷", title: "Dentistry", body: "Internationally accredited dental degree programs with strong clinical training. Globally portable qualification with growing career demand across India and abroad." },
  { icon: "💊", title: "Pharmacy", body: "English-medium pharmacy programs aligned with global pharmaceutical standards and recognised by international health bodies for professional practice." },
  { icon: "🏥", title: "Nursing & Midwifery", body: "High-demand healthcare degrees with strong clinical placement components. Graduates are well positioned for careers across Europe, the Gulf, and India." },
  { icon: "🌐", title: "Public Health", body: "Postgraduate and undergraduate programs in public health policy, epidemiology, and health administration — a fast-growing field with global career scope." },
  { icon: "💼", title: "Business & Management", body: "BBA and MBA programs with a European academic structure. Combines management theory with practical, real-world business application across key industries." },
  { icon: "⚖️", title: "Law", body: "Undergraduate and graduate law degrees structured to European legal standards. Excellent preparation for international legal practice and postgraduate specialisations." },
  { icon: "💻", title: "Information Technology", body: "Engineering and IT degrees in software development, data science, and computer systems. Georgia's growing tech economy creates on-ground opportunities for students." },
  { icon: "🔧", title: "Engineering", body: "Technical undergraduate degrees across civil, mechanical, and environmental engineering — structured to European credit systems and globally applicable." },
];

const lifeCards = [
  { icon: "🛡️", tag: "Safety", title: "Safe for International Students", body: "Georgia is known for its low crime rates and a welcoming environment for international students. Tbilisi is considered safe for foreigners even at night." },
  { icon: "🍛", tag: "Food", title: "Indian Food — Everywhere", body: "Tbilisi has over 100 Indian restaurants, and student hostels frequently provide dedicated Indian mess facilities with fresh, home-style cooking." },
  { icon: "🌍", tag: "Community", title: "A Truly International Community", body: "With over 60,000 international students from more than 21 nationalities, Georgia's campuses are genuinely diverse. The Indian student community is active and supportive." },
  { icon: "🌤️", tag: "Climate", title: "Familiar Climate", body: "Georgia's climate ranges from −4°C to 30°C — broadly familiar to students from across India. The Greater Caucasus Mountains moderate extremes." },
  { icon: "🚌", tag: "Transport", title: "Affordable & Accessible Transport", body: "Public transport in Tbilisi — including metro, buses, and taxis (Bolt, Yandex) — is extremely affordable. A 7-km taxi ride costs approximately ₹156." },
  { icon: "🏛️", tag: "Culture", title: "Rich Culture & Modern Lifestyle", body: "Tbilisi blends ancient churches, modernist architecture, and traditional markets. Landmarks like Narikala Fortress and the Bridge of Peace create a unique backdrop." },
  { icon: "🏠", tag: "Accommodation", title: "Modern, Comfortable Accommodation", body: "Student hostels are typically fully furnished with AC, refrigerator, washing machine, and 24/7 security — many within walking distance of campus." },
  { icon: "🎭", tag: "Culture", title: "Indo-Georgian Cultural Connection", body: "Georgia actively supports Indo-Georgian cultural exchange events, and Georgians hold a warm appreciation for Indian culture and students." },
];

const careerCards = [
  { icon: "🩺", tag: "For Medical Graduates", title: "Practice in India via FMGE / NExT", body: "Indian students completing an MD in Georgia are eligible to appear for the FMGE and the forthcoming NExT examination — the gateway to practising medicine in India." },
  { icon: "🇪🇺", tag: "Global Recognition", title: "Careers in 28+ European Countries", body: "Graduates from Georgian institutions aligned with European frameworks can apply to practise across 28+ European countries, with recognition extending to Australia, New Zealand, Canada, and Germany." },
  { icon: "📚", tag: "Further Education", title: "Postgraduate & Specialisation Pathways", body: "Georgian degrees serve as strong foundations for postgraduate specialisations internationally. Medical graduates may pursue MD+MPH, MD+MBA, or MD+MSc combinations." },
  { icon: "🏥", tag: "During Studies", title: "Early Clinical & Practical Exposure", body: "Medical students gain real clinical exposure from the third year onwards, training in hospital environments and building diagnostic, procedural, and patient-care skills." },
];

const support = [
  { icon: "🔍", title: "Free Profile Evaluation", body: "We review your academic profile, career aspirations, and budget — giving you a clear, honest picture of your Georgia options before you commit to anything." },
  { icon: "🎓", title: "Admissions Guidance", body: "From shortlisting the right institution to preparing a strong application — we manage every step of the admissions process with precision and care." },
  { icon: "📄", title: "Documentation Support", body: "Complete assistance with document preparation, apostille, notarisation, translation, and correct submission format — so nothing is rejected on a technicality." },
  { icon: "🛂", title: "Visa Assistance", body: "Professional, step-by-step guidance on your Georgia student visa application — from checklist preparation to submission — with updates at every stage of the process." },
  { icon: "✈️", title: "Pre-Departure Briefing", body: "Know what to pack, what to expect on arrival, and how to settle into Tbilisi — before you board the flight. No surprises, no unnecessary anxiety on day one." },
  { icon: "🏠", title: "Accommodation Guidance", body: "We advise on student hostel options near campus — including Indian mess facilities, security arrangements, and proximity to your institution." },
  { icon: "🛫", title: "Travel Assistance", body: "Flight booking guidance, forex support, local SIM card and bank account assistance, airport pickup coordination — practical help for every part of your journey." },
  { icon: "💬", title: "Dedicated Student Counsellor", body: "One real, experienced counsellor — available throughout your entire journey. No call centres, no scripted responses. Honest, personalised guidance when you need it most." },
];

const visaDocs = [
  "Valid passport (with sufficient validity)",
  "Class 10 and 12 mark sheets and certificates",
  "Transfer certificate / school leaving certificate",
  "Official offer letter or invitation letter from institution",
  "Passport-size photographs (as specified)",
  "Bank statement / proof of financial support",
  "Medical fitness certificate",
  "HIV test report (as required)",
  "Immigration clearance certificate (if applicable)",
  "Apostille of academic documents (notarised & translated)",
];

const faqs = [
  { q: "Why study in Georgia?", a: "Georgia has become one of the most preferred destinations for higher education among Indian and international students. It offers European-standard education, English-medium programs, affordable tuition, budget-friendly living, and a safe, low-crime environment. Over 60,000 international students — including more than 10,000 Indian students — currently study there, with Tbilisi just a 5-hour direct flight from New Delhi." },
  { q: "What is the average cost of studying and living in Georgia?", a: "Tuition for medicine is USD 5,550 per year, with an estimated total of ₹20–25 Lakh for the full course. Living costs average around ₹20,000 per month including food and accommodation, with a recommended food budget of about ₹6,000. The Georgian Lari trades at roughly ₹31.20." },
  { q: "Is IELTS or TOEFL required for studying in Georgia?", a: "English language requirements vary by institution and program. Applicants may be required to demonstrate English proficiency through accepted tests or other institution-approved methods. Your Langma International advisor will confirm the exact requirement for your chosen course before you apply." },
  { q: "What documents are generally required for a Georgia student visa?", a: "Key documents typically include your valid passport, Class 10 and 12 academic certificates and mark sheets, an official offer or invitation letter, bank statements, passport-size photographs, a medical fitness certificate, HIV test report, and apostille-authenticated academic documents." },
  { q: "Why choose Langma International for studying in Georgia?", a: "Langma International is your end-to-end study abroad Georgia partner — from free profile evaluation and admissions guidance to documentation, visa assistance, pre-departure briefing, accommodation guidance, and on-arrival support, with one dedicated counsellor throughout." },
];

/* ===================================================================
 *  MAIN
 * ================================================================ */
export default function StudyGeorgiaPage() {
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
                Study In <span className="text-[#2FC7A1]">Georgia</span>
                <br />
                Europe's Most
                <br />
                Accessible Education Hub.
              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
                A sovereign European country at the crossroads of East and
                West. Globally recognised degrees. English-medium programs.
                Affordable tuition and living costs. Just a 5-hour direct
                flight from New Delhi.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  "✓European Academic Standards",
                  "✓English-Medium Programs",
                  "✓Affordable Tuition & Living",
                  "✓5-Hour Direct Flight from Delhi",
                  "✓Growing Indian Student Community",
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
                  Book Free Counselling →
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="border border-[#1A2540] text-[#1A2540] hover:bg-[#1A2540] hover:text-white transition-all px-8 py-4 rounded-full font-semibold text-lg cursor-pointer"
                >
                  Check My Eligibility
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
                    src="images/geo.jpeg"
                    alt="Study in Georgia"
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
              <BoardingStat value={10000} suffix="+" label="Indian Students in Georgia" sub="Growing every year" delay={100} />
              <BoardingStat value={60000} suffix="+" label="International Students" sub="From 21+ nationalities" delay={250} />
              <BoardingStat text="Low" label="Crime · Safe Environment" sub="For international students" delay={400} />
              <BoardingStat text="₹20K" label="Avg Monthly Living Cost" sub="Food, stay & essentials" delay={550} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <Marquee />

      {/* ---------------- WHY GEORGIA ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Why Georgia</span>}
            title={
              <span style={{ color: "#296166" }}>
                10 Reasons Georgia Is India's Smartest Study Abroad Choice in 2026
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                Located at the crossroads of Europe and Asia, Georgia combines European-standard education with one of the most student-friendly environments in the world — at a fraction of the cost of Western destinations.
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
                delay={i * 70}
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
          ✨ India and Georgia have shared diplomatic ties since 1992. Over 1.2 lakh Indian tourists visited Georgia in 2024 alone.
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
            title="Georgia — Essential Facts for International Students"
            sub="Everything you need to plan your study abroad journey with clarity, accuracy, and confidence."
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
                <FactRow label="Country" value="Georgia (Sakartvelo)" />
                <FactRow label="Capital City" value="Tbilisi" />
                <FactRow label="Currency" value="Georgian Lari (GEL) · 1 GEL ≈ ₹31" />
                <FactRow label="Languages" value="Georgian (first) · English (second)" />
                <FactRow label="Population" value="3.80 million (2024)" />
                <FactRow label="Time Zone" value="UTC+4 (GET)" />
              </div>
              <div
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <FactRow label="Climate" value="−4°C to 30°C · Diverse zones" />
                <FactRow label="Travel Time from India" value="~5 Hours (direct flight from Delhi)" />
                <FactRow label="International Airport" value="Tbilisi International Airport" />
                <FactRow label="Avg Living Cost (Student)" value="~₹20,000 per month incl. food & stay" />
                <FactRow label="Indian Restaurants" value="100+ in Tbilisi alone · Indian mess available" />
                <FactRow label="Safety" value="Low crime · safe for international students" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- EDUCATION SYSTEM ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Education in Georgia</span>}
            title={
              <span style={{ color: "#296166" }}>
                A Globally Recognised Education System Built for International Students
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                Georgian higher education is structured to European standards — rigorous, internationally connected, and home to over 60,000 international students from more than 21 nationalities.
              </span>
            }
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {eduCards.map((e, i) => (
              <OutlookCard key={e.title} {...e} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- POPULAR FIELDS ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Popular Fields of Study</span>}
            title={<span style={{ color: "#296166" }}>What Can You Study in Georgia?</span>}
            sub={
              <span style={{ color: "#296166" }}>
                Georgian institutions offer a broad range of English-medium undergraduate and postgraduate programs across health sciences, professional fields, and the arts.
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

      {/* ---------------- COSTS ---------------- */}
      <section
        style={{
          background: C.cream2,
          padding: "100px 48px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Cost of Studying in Georgia"
            title="What Does It Actually Cost to Study in Georgia?"
            sub="Georgia offers a European-standard education at a cost that is genuinely competitive — especially compared to private colleges in India or medical programs in Western countries."
            light
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: 18,
            }}
          >
            <CostCard label="Annual Tuition (Medicine)" amount="USD 5,550" note="Per year · 6-year MD program" delay={0} />
            <CostCard label="Total Tuition (6 Years)" amount="~₹20–25L" note="Estimated total course fees" highlight delay={80} />
            <CostCard label="Food & Accommodation (Monthly)" amount="~₹15–20K" note="Fully furnished hostel with AC · Indian mess available" delay={160} />
            <CostCard label="Food Budget (Monthly)" amount="~₹6,000" note="Including Indian restaurants & groceries" delay={240} />
            <CostCard label="Public Transport" amount="0.50 GEL" note="Regular ticket · 0.20 GEL for students · 7-km taxi ~₹156" delay={320} />
            <CostCard label="Total Cumulative Cost" amount="~₹35L" note="Fees + visa + food + hostel (full 6 years)" delay={400} />
            <CostCard label="Total Monthly Living" amount="~₹20,000" note="Food + accommodation + daily expenses" delay={480} />
          </div>
          <p style={{ fontSize: 12, color: C.muted, marginTop: 22 }}>
            All figures are indicative estimates based on published brochure data. Currency rates are subject to change. Speak to a Langma International advisor for an accurate, personalised cost breakdown.
          </p>
        </div>
      </section>

      {/* ---------------- LANGUAGE / ELIGIBILITY REQUIREMENTS ---------------- */}
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
            tag="English & Language Requirements"
            title="What English Proof Do You Need to Study in Georgia?"
            sub="English proficiency requirements in Georgia vary by institution and program. Here is an accurate, honest overview of what to expect — so you can plan with confidence."
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
                  <span>🗣️</span> English Proficiency — Key Facts
                </h3>
                {[
                  ["Medium of Instruction", "English ✓"],
                  ["IELTS / TOEFL", "Varies by Institution"],
                  ["Student Interview", "Varies by Institution"],
                  ["School English Certificate", "Varies by Institution"],
                  ["Medium of Instruction Letter", "Varies by Institution"],
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
                  💡 English language requirements vary by institution and program. Applicants may be required to demonstrate English proficiency through accepted tests or other institution-approved methods.
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
                  <span>✅</span> Who Is Eligible to Apply?
                </h3>
                {[
                  ["Completed Grade 12 (PCB)", "Eligible ✓"],
                  ["NEET Qualified (Medicine)", "Required for MD ✓"],
                  ["Bachelor's Graduates", "Eligible for PG ✓"],
                  ["Study Gap Applicants", "Generally Accepted ✓"],
                  ["Age Restrictions", "Generally Flexible ✓"],
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
                  ⚠️ Admission requirements — including NEET eligibility for Indian students pursuing medicine abroad — are subject to NMC (India) regulations and individual institutional criteria. Always confirm requirements with a verified advisor.
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
            tag={<span style={{ color: "#296166" }}>Georgia Student Visa Guide</span>}
            title={
              <span style={{ color: "#296166" }}>
                Georgia Student Visa — A Clear, Accessible Process
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                Georgia's student visa process is straightforward and well-structured. With professional guidance from Langma International at every stage, the path from application to arrival is as smooth as possible.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="lm-visa-wrap">
            <div>
              <VisaStep n={1} title="Profile Evaluation & Course Selection" body="Your Langma International advisor reviews your academic background, goals, and budget — and recommends the best-fit program and institution in Georgia for your profile." delay={0} />
              <VisaStep n={2} title="Application & Offer Letter" body="Your application is submitted to your chosen institution. Once approved, you receive an official offer letter or invitation letter — the foundation document for your visa application." delay={80} />
              <VisaStep n={3} title="Documentation Preparation" body="We help you compile and authenticate all required documents — academic transcripts, passport copies, photos, financial records, and institutional registration letters — in the correct format." delay={160} />
              <VisaStep n={4} title="Visa Application & Submission" body="Your student visa or Temporary Residence Card (TRC) application is submitted with full documentation. Georgia's visa process is known for being relatively efficient and accessible for Indian students." delay={240} />
              <VisaStep n={5} title="Pre-Departure & Arrival Support" body="We provide a comprehensive pre-departure briefing — covering travel, accommodation, airport pickup coordination, local SIM and bank account guidance, and city registration." isLast delay={320} />
            </div>
            <div style={{ position: "sticky", top: 100 }}>
              <DocsBox
                title="Required Documents Checklist"
                items={visaDocs}
                note={
                  <>
                    <strong style={{ color: C.navy }}>Note:</strong> Specific documentation requirements may vary by institution and program. Your Langma International advisor will provide a tailored, step-by-step checklist and guide every document from preparation to submission.
                    <br />
                    <br />
                    Exact visa fees and processing timelines will be confirmed at the time of application.
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- STUDENT LIFE ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Student Life in Georgia</span>}
            title={<span style={{ color: "#296166" }}>What Is It Like to Live and Study in Tbilisi?</span>}
            sub={
              <span style={{ color: "#296166" }}>
                Tbilisi is a city that welcomes international students with open arms. Rich history, a vibrant social scene, affordable living, and a large, close-knit Indian student community make Georgia feel far more like home than most expect.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
            {lifeCards.map((l, i) => (
              <OutlookCard key={l.title} {...l} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CAREER & GLOBAL OPPORTUNITIES ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Career & Global Opportunities</span>}
            title={<span style={{ color: "#296166" }}>Where Can a Georgian Degree Take You?</span>}
            sub={
              <span style={{ color: "#296166" }}>
                A degree from Georgia is not a local credential — it is an internationally accepted qualification that opens doors across India, Europe, and beyond.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
            {careerCards.map((c, i) => (
              <OutlookCard key={c.title} {...c} delay={i * 100} />
            ))}
          </div>
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
            tag="Why Choose Langma International"
            title="Your End-to-End Study Abroad Partner for Georgia"
            sub="We go far beyond an application form. From your first enquiry to your first week on campus in Tbilisi, Langma International is with you — professionally, personally, and practically."
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
      <FAQ />
      {/* <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag={<span style={{ color: "#296166" }}>FAQs</span>} title="Common Questions About Studying in Georgia" center />
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
              Georgia Is Ready.
              <br />
              <em className="lm-grd-text" style={{ fontStyle: "italic" }}>
                Is This Your Year?
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
              European-standard education. English-medium programs. Affordable tuition and living costs. A safe, welcoming student city — just 5 hours from home. Your 2026 Georgia journey begins with one free conversation.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <NavyButton onClick={() => setOpen(true)} style={{ background: C.dark, padding: "16px 36px" }}>
                Book Free Counselling →
              </NavyButton>
              <GhostButton dark onClick={() => setOpen(true)}>Check My Eligibility</GhostButton>
              <GhostButton dark onClick={() => setOpen(true)}>Talk to an Advisor</GhostButton>
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