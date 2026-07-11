import React, { useState, useEffect, useRef } from "react";
import PopupForm from "./PopupForm";
import FAQ from "./FAQ";

/**
 * Study in the Netherlands — Langma International
 * Palette matches the Study in Poland / South Korea / Malta / Dubai / Singapore / Mauritius pages (teal brand accent over navy panels)
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
          fontSize: "clamp(24px, 2.6vw, 36px)",
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
function CostCard({ label, amount, note, detail, highlight, delay }) {
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
          height: "100%",
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
            fontSize: 26,
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
        {detail && (
          <div
            style={{
              fontSize: 11.5,
              color: highlight ? "rgba(255,255,255,0.6)" : C.muted,
              marginTop: 10,
              paddingTop: 10,
              borderTop: `1px solid ${highlight ? "rgba(255,255,255,0.2)" : C.border}`,
              lineHeight: 1.6,
              textAlign: "left",
            }}
          >
            {detail}
          </div>
        )}
      </div>
    </Reveal>
  );
}

/* ===================================================================
 *  Course card
 * ================================================================ */
function CourseCard({ num, title, body, icon, tag, delay }) {
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
          height: "100%",
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
            marginBottom: tag ? 12 : 0,
            transition: "color 0.3s ease",
          }}
        >
          {body}
        </div>
        {tag && (
          <span
            style={{
              display: "inline-block",
              background: h ? "rgba(255,255,255,0.15)" : C.cream,
              color: h ? C.white : C.slate,
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 999,
              letterSpacing: "0.4px",
            }}
          >
            {tag}
          </span>
        )}
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
function VisaStep({ n, title, body, fee, isLast, delay }) {
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
        {fee && (
          <span
            style={{
              display: "inline-block",
              background: C.goldTint,
              color: C.navy,
              fontSize: 12,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 999,
              marginTop: 10,
              border: `1px solid ${C.goldSoft}`,
            }}
          >
            {fee}
          </span>
        )}
      </div>
    </div>
  );
}

/* ===================================================================
 *  Payment step (horizontal, with amount)
 * ================================================================ */
function PayStep({ num, title, amount, note, isLast, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: h ? C.goldTint : C.white,
          padding: "28px 22px",
          position: "relative",
          borderRadius: 16,
          border: `1px solid ${h ? C.navy : C.border}`,
          transition: "all 0.25s ease",
          height: "100%",
        }}
      >
        {!isLast && (
          <div
            className="lm-pay-arrow"
            style={{
              position: "absolute",
              right: -14,
              top: "50%",
              transform: "translateY(-50%)",
              width: 28,
              height: 28,
              background: C.navy,
              color: C.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              borderRadius: "50%",
              zIndex: 2,
            }}
          >
            →
          </div>
        )}
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: C.cream2,
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          {num}
        </div>
        <h4
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: C.ink,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 6,
          }}
        >
          {title}
        </h4>
        <div
          style={{
            fontSize: 21,
            fontWeight: 600,
            color: C.navy,
            marginBottom: 6,
          }}
        >
          {amount}
        </div>
        <p style={{ fontSize: 12, color: C.slate, lineHeight: 1.6, margin: 0 }}>{note}</p>
      </div>
    </Reveal>
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
 *  Testimonial card (dark theme, matches SupportCard)
 * ================================================================ */
function TestiCard({ quote, name, meta, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: h ? C.goldSoft : C.white,
          border: `1px solid ${h ? C.gold : C.border}`,
          padding: 32,
          borderRadius: 18,
          transition: "all 0.3s ease",
          height: "100%",
        }}
      >
        <div style={{ color: C.gold, fontSize: 14, marginBottom: 16, letterSpacing: 2 }}>
          ★★★★★
        </div>
        <p
          style={{
            fontSize: 15,
            fontStyle: "italic",
            color: C.slate,
            lineHeight: 1.75,
            marginBottom: 20,
          }}
        >
          {quote}
        </p>
        <p style={{ fontSize: 13, fontWeight: 700, color: C.white, margin: 0 }}>{name}</p>
        <p style={{ fontSize: 12, color: C.muted, margin: "3px 0 0 0" }}>
          {meta}
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
 *  Process step (horizontal strip)
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
      <p style={{ fontSize: 12, color: C.slate, lineHeight: 1.6, margin: 0 }}>
        {body}
      </p>
    </div>
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
    "🇳🇱 Netherlands January 2027 Intake Open",
    "✦ #1 English Proficiency Globally",
    "✦ Mandatory Paid Internship",
    "✦ 160+ Nationalities on Campus",
    "✦ Post-Study Orientation Visa",
    "✦ Assignment-Based — No Exams",
    "✦ Guaranteed Student Housing",
    "✦ 50% Internship-to-Job Rate",
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
 *  DATA — Netherlands content
 * ================================================================ */
const reasons = [
  { icon: "🗣️", title: "World-Class English Education", body: "The Netherlands ranks #1 globally in non-native English proficiency. Every degree programme is delivered entirely in English — no language barrier, no compromise on quality." },
  { icon: "🏢", title: "Multinational Career Access", body: "Home to the European headquarters of Tesla, Netflix, Uber, KPMG, ING, and Booking.com. ASML — the second most valuable company in Europe — is headquartered here." },
  { icon: "🎯", title: "Practical, Industry-Led Learning", body: "Over 60% of education time is spent on real-world projects, internships, and practical assignments. A mandatory paid internship is built into every programme." },
  { icon: "🚀", title: "Thriving Startup Ecosystem", body: "One of Europe's fastest-growing startup scenes. Amsterdam's Brainport and thriving tech corridors connect students directly with entrepreneurs and investors." },
  { icon: "🛡️", title: "Safe, Happy & Stable", body: "Consistently ranked among the world's happiest and safest countries. A stable, welcoming, multicultural society with a high quality of life." },
  { icon: "🌿", title: "Sustainability Leader", body: "A global pioneer in sustainability, circular economy, and green innovation, integrated into national identity — and into its education." },
  { icon: "🗺️", title: "Gateway to All of Europe", body: "Amsterdam's Schiphol Airport connects to over 300 destinations worldwide. Paris, London, Berlin, or Barcelona are all within a 2-hour flight." },
  { icon: "✈️", title: "Post-Study Work Visa Available", body: "The Dutch Orientation Year Visa (Zoekjaar permit) allows graduates to stay and find work for up to one year after completing their degree." },
];

const courses = [
  { icon: "🌐", title: "International Business Management", body: "Entrepreneurship, global markets, finance, and marketing combined. Rated the top programme for over 11 consecutive years.", tag: "Bachelor's · MBA" },
  { icon: "🎨", title: "Creative Business", body: "Design thinking, media strategy, branding, and commercial creativity — built for careers in the creative economy.", tag: "Bachelor's" },
  { icon: "💻", title: "Digital Business & Generative AI", body: "Data strategy, AI applications, and digital transformation for tomorrow's business leaders.", tag: "Bachelor's · MBA" },
  { icon: "🏨", title: "Hotel & Event Management", body: "Luxury hospitality management, event strategy, and festival production in one of Europe's busiest tourism capitals.", tag: "Bachelor's" },
  { icon: "✈️", title: "International Tourism Management", body: "Experience travel, luxury management, and festival specialisations with direct industry exposure.", tag: "Bachelor's" },
  { icon: "🚀", title: "Entrepreneurship", body: "Launch your own venture — guided by active entrepreneurs and connected directly to Amsterdam's startup scene.", tag: "Bachelor's · MBA" },
  { icon: "📣", title: "Influencer Marketing", body: "Digital influence, content strategy, creator economics, and modern brand communications built for the social economy.", tag: "Bachelor's" },
  { icon: "📊", title: "Commerce, Economics & Entrepreneurship", body: "Commercial strategy, economic fundamentals, and entrepreneurial leadership in a rigorous three-discipline degree.", tag: "Bachelor's" },
  { icon: "🏆", title: "MBA — Master of Business Administration", body: "1-year intensive MBA with specialisations in Data Strategy, Real Estate, Hospitality Management & Global Leadership.", tag: "Master's · 1 Year" },
];

const visaSteps = [
  { title: "Choose Programme & Apply Online", body: "Select your programme level and preferred intake. Submit your initial application through the official admissions portal along with your basic supporting documents." },
  { title: "Receive Conditional Offer Letter", body: "Your application is reviewed by the admissions team. A conditional offer letter is issued pending receipt of full documentation and the credibility interview stage." },
  { title: "Pay Application Fee & Credibility Interview", body: "Pay the application fee and complete a credibility interview. Langma International prepares you fully with mock sessions and guidance.", fee: "€95 — Application Fee" },
  { title: "Receive Unconditional Offer Letter", body: "Upon successfully passing the credibility interview and completing full document verification, an unconditional offer letter is issued confirming your place." },
  { title: "Pay Initial Package Deposit", body: "The non-EU/EEA package fee is paid to confirm your acceptance. This covers IND visa processing, health insurance, and airport pickup on arrival.", fee: "€6,050 — Initial Package Fee" },
  { title: "Visa Applied via IND / Dutch Ministry", body: "The institution applies for your student visa through the IND (Dutch Immigration and Naturalisation Service) directly on your behalf." },
  { title: "VFS Biometric Registration & Visa Stamping", body: "Visit your nearest VFS Global centre for biometric data registration. Receive your visa stamping in your passport and prepare pre-departure documents." },
  { title: "Pay Balance & Travel to the Netherlands", body: "Balance payment is due after visa approval. The remaining tuition is paid in 12 equal monthly instalments. Airport pickup is arranged.", fee: "€8,000 due · Remainder in 12 monthly instalments" },
];

const visaDocs = [
  "Valid passport — clear copy of all pages",
  "Academic transcripts and degree certificates (all levels)",
  "Grade sheets and mark lists for every academic year",
  "English proficiency test result — IELTS / TOEFL iBT / PTE / Cambridge",
  "Passport-size photograph with white background",
  "Resume / CV in professional format",
  "Statement of Purpose (SOP) — 1,500 to 4,000 words",
  "Proof of financial capability or sponsorship documentation",
  "Unconditional offer letter from the institution",
];

const admissionDocs = [
  "Valid passport — clear copy of front and back pages",
  "Academic transcripts of your highest completed level of education",
  "Grade sheets and mark lists for all academic years",
  "Degree certificate or school leaving certificate",
  "English proficiency test result — IELTS / TOEFL iBT / PTE / Cambridge",
  "Passport-size photograph with white background",
  "Resume / CV in professional format",
  "Statement of Purpose (SOP) — 1,500 to 4,000 words",
  "Dedicated email address for all institution communications",
];

const academicQuals = [
  "Class 12th — Indian Standard Boards (CBSE, ICSE, State Boards)",
  "International Baccalaureate (IB) — Diploma & Career Programme",
  "British (I)GCSE A(S)-Levels",
  "BTEC Level 3",
  "European Baccalaureate (EB)",
  "German Abitur (Allgemeine Hochschulreife)",
  "American High School Diploma (college preparatory programme)",
  "Intermediate Vocational Education — Level 4",
  "Higher General Secondary Education / Pre-University Diploma",
];

const careerOutlooks = [
  { icon: "💼", tag: "During Studies", title: "16 hrs/Week Part-Time Work Rights", body: "International students can work up to 16 hours per week during term time — a meaningful income stream that offsets living costs in Amsterdam." },
  { icon: "🎓", tag: "Internship", title: "Mandatory Paid Internship in Every Programme", body: "A full-time paid internship is built into every degree. With a 50% internship-to-employment conversion rate, many students receive job offers before graduation." },
  { icon: "🌍", tag: "Post-Study", title: "Dutch Orientation Year Visa — Up to 1 Year", body: "The Zoekjaar permit allows international graduates to remain in the Netherlands for up to a year after completing their degree, to search for employment." },
  { icon: "🏢", tag: "Employers", title: "100+ Companies at the Annual Career Fair", body: "Fortune 500 employers including Tesla, Netflix, KPMG, Booking.com, ASML, and Unilever actively recruit from campus every year." },
];

const careerTags = [
  "Investment Banking", "Business Consulting", "Digital Marketing", "Data Strategy", "AI & Technology",
  "Hospitality Management", "Event Management", "Entrepreneurship", "Real Estate", "International Sales",
  "Logistics & Supply Chain", "Sustainability Management", "Project Management", "Brand Management",
  "Luxury Retail", "Creative Direction",
];

const lifeCards = [
  { icon: "🏙️", tag: "Living", title: "Affordable & Vibrant Cities", body: "Amsterdam combines world-class culture, food, and nightlife with a compact, student-friendly layout, and a cost of living manageable on a student budget." },
  { icon: "🌍", tag: "Community", title: "160+ Nationalities on Campus", body: "Study alongside peers from over 160 countries every day. The classroom itself becomes a global network of lifelong professional relationships." },
  { icon: "🏠", tag: "Accommodation", title: "Guaranteed Student Housing", body: "Purpose-built student residences reserved exclusively for international students, located less than 15 minutes from campus for your full programme." },
  { icon: "✈️", tag: "Travel", title: "Europe on Your Doorstep", body: "Amsterdam Schiphol connects to over 300 destinations worldwide. Weekend trips to Paris, London, Berlin, or Barcelona are a normal part of student life." },
  { icon: "🛡️", tag: "Safety", title: "Safe, Stable & Welcoming", body: "Consistently ranked among the world's safest and happiest countries, with an open multicultural society and centuries of welcoming international residents." },
  { icon: "⚖️", tag: "Balance", title: "Work-Life Balance Built In", body: "The Dutch are internationally recognised for healthy work-life boundaries — sports facilities, societies, and city trips are integrated into campus life." },
];

const processSteps = [
  { title: "Profile Evaluation", body: "Free honest assessment of your academic background and English proficiency — before you commit to anything." },
  { title: "Document Preparation", body: "We help you gather, organise, and format your complete application package correctly the first time." },
  { title: "Credibility Interview", body: "Mock interview sessions, question guidance, and confidence-building practice so you walk in ready to succeed." },
  { title: "Offer Letter", body: "Receive your unconditional offer letter confirming your programme, level, intake date, and place." },
  { title: "Visa Process", body: "Initial package payment, IND application submission, VFS biometric scheduling, and visa stamp collection." },
  { title: "Pre-Departure Brief", body: "What to pack, customs guidance, accommodation confirmation, arrival logistics, and Day 1 expectations." },
  { title: "Begin Your Journey", body: "Airport pickup confirmed. Student housing ready. Orientation week scheduled. Your future starts on landing." },
];

const support = [
  { icon: "🔍", title: "Free Profile Evaluation", body: "We assess your academic background and English profile honestly — then tell you exactly which programmes you qualify for, before you commit to anything." },
  { icon: "🎯", title: "Personalised Programme Matching", body: "We match you to the right course, level, and intake based on your academic history, career ambitions, and long-term goals." },
  { icon: "📝", title: "SOP & Application Support", body: "We guide your Statement of Purpose from concept to final draft, prepare your complete application, and review every document before submission." },
  { icon: "🎤", title: "Credibility Interview Preparation", body: "Full structured preparation for the admissions credibility interview — mock sessions, likely question sets, and confidence-building support." },
  { icon: "🛂", title: "Visa Documentation Support", body: "Complete, precise guidance on IND application requirements, financial sponsorship documentation, and biometric appointment scheduling." },
  { icon: "🏠", title: "Accommodation Confirmation", body: "We confirm your guaranteed student housing arrangements near campus in Amsterdam before you depart." },
  { icon: "✈️", title: "Pre-Departure Briefing", body: "Comprehensive travel preparation — what to bring, customs guidance, accommodation check-in, and orientation week overview." },
  { icon: "💬", title: "Dedicated Student Advisor", body: "One real person, available throughout your entire journey from first enquiry to first week of class. No automated responses." },
];

const testimonials = [
  { quote: "I had a gap of two years and was nervous no institution would accept me. Langma assessed my profile honestly and matched me to the right programme. I'm now completing my Bachelor's and have already secured a paid internship in Rotterdam.", name: "Priya Mehta", meta: "International Business Management · New Delhi, India" },
  { quote: "The credibility interview preparation Langma provided was exceptional. Within three months of submitting my documents I had my visa, my housing confirmed, and my flight booked.", name: "Ahmed Al-Rashidi", meta: "Digital Business & AI · Dubai, UAE" },
  { quote: "As someone coming from Bangladesh, I was worried about the additional sponsorship requirements. Langma walked me through exactly what I needed. I'm now interning at a Dutch fintech company.", name: "Farhan Hossain", meta: "MBA — Data Strategy · Dhaka, Bangladesh" },
];

const faqs = [
  { q: "Can I study in the Netherlands without IELTS?", a: "IELTS Academic is the most commonly accepted English test, but TOEFL iBT, PTE Academic, and Cambridge English qualifications are all accepted alternatives. Foundation entry requires IELTS 5.0–5.5; direct Bachelor's entry requires IELTS 6.0; Master's/MBA entry requires IELTS 6.5." },
  { q: "How much does it cost to study in the Netherlands?", a: "Foundation programmes are €12,250/year (all-inclusive). Bachelor's tuition is €24,500/year. Master's and MBA tuition is €25,500/year. Non-EU/EEA students pay an initial package fee of €6,050 covering visa, insurance, and airport pickup. Monthly living costs range €800–€1,200." },
  { q: "Can international students work part-time in the Netherlands?", a: "Yes. Students from outside the EU/EEA can work up to 16 hours per week during term. Every programme also includes a mandatory full-time paid internship — with 50% of interns receiving a direct job offer from their employer." },
  { q: "What is the Dutch Orientation Year Visa?", a: "The Zoekjaar permit allows international graduates to remain in the Netherlands for up to one year after completing their degree specifically to search for employment." },
  { q: "What is the visa process for international students?", a: "The visa is applied for through the institution directly via the IND — you do not approach the Dutch embassy independently. The process involves an online application, conditional offer, credibility interview, unconditional offer, initial package payment, IND submission, VFS biometrics, and travel." },
  { q: "Are study gaps or age restrictions an issue?", a: "Study gaps and all ages are accepted. Applications are assessed on your current academic profile, English proficiency, and programme suitability — not penalised for time gaps or age." },
  { q: "What programmes are available and how long do they take?", a: "Programmes span Foundation (6–12 months), Bachelor's (3-year fast-track or 4-year standard), and Master's/MBA (1-year intensive). Key study areas include International Business Management, Digital Business & AI, Hotel & Event Management, and Entrepreneurship." },
  { q: "Is the Netherlands safe for international students?", a: "The Netherlands is consistently ranked among the world's safest, happiest, and most politically stable countries, with large, well-established international student communities in Amsterdam, Rotterdam, and Utrecht." },
  { q: "What career opportunities exist after graduating?", a: "Graduates access careers in investment banking, consulting, digital marketing, data strategy, AI and technology, hospitality, logistics, sustainability, and entrepreneurship, with the Dutch Orientation Year Visa providing up to a year post-graduation to find a role." },
  { q: "When should I apply for the September 2026 intake?", a: "We recommend starting your application at least 4 to 5 months before your intended start date, to allow time for document preparation, SOP drafting, credibility interview scheduling, IND visa processing, and VFS biometric appointments." },
];

/* ===================================================================
 *  MAIN
 * ================================================================ */
export default function StudyNetherlandsPage() {
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

        @media (max-width: 860px) {
          .lm-pay-arrow { display: none !important; }
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
                Study In <span className="text-[#2FC7A1]">the Netherlands</span>
                <br />
                Where Global
                <br />
                Careers Begin.
              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
                English-taught degrees. Paid internships. Fortune 500
                employers. Europe's most practical business education — in
                one of the world's most liveable countries. A mandatory paid
                internship is built into every programme, plus a post-study
                orientation visa allowing you to stay and work for up to a
                year.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  "✓160+ Nationalities",
                  "✓Paid Internship Included",
                  "✓Post-Study Visa",
                  "✓Assignment-Based — No Exams",
                  "✓Guaranteed Housing",
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
                    src="images//Netherland.jpeg"
                    alt="Study in the Netherlands"
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
              <BoardingStat text="#1" label="English Proficiency" sub="Global ranking" delay={100} />
              <BoardingStat value={160} suffix="+" label="Nationalities" sub="On campus" delay={250} />
              <BoardingStat value={50} suffix="%" label="Internship-to-Job" sub="Conversion rate" delay={400} />
              <BoardingStat text="#11" label="Global GDP" sub="Netherlands ranking" delay={550} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <Marquee />

      {/* ---------------- WHY NETHERLANDS ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Why the Netherlands</span>}
            title={<span style={{ color: "#296166" }}>8 Reasons the Netherlands Stands Apart</span>}
            sub={
              <span style={{ color: "#296166" }}>
                More than 160 nationalities. Europe's top English-proficiency ranking. A job market stacked with global multinationals. Here's why thousands of students choose the Netherlands every year.
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
          ✨ September 2026 intake is now open. Our advisors can assess your profile today — free, with no obligation.
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
            title="Netherlands — Quick Facts for International Students"
            sub="Essential information to help you plan your study journey with confidence and clarity."
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
                <FactRow label="Location" value="Western Europe · Heart of the EU · Schengen Zone" />
                <FactRow label="Capital City" value="Amsterdam — Education & Business Hub" />
                <FactRow label="Currency" value="Euro (€)" />
                <FactRow label="Language of Instruction" value="English — #1 Globally in Non-Native Proficiency" />
                <FactRow label="International Students" value="160+ Nationalities Represented on Campus" />
                <FactRow label="Available Intakes" value="September · January" />
                <FactRow label="Foundation Programme Fee" value="€12,250 / year (all-inclusive)" />
                <FactRow label="Bachelor's Tuition" value="€24,500 / year (same fee for all students)" />
              </div>
              <div
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <FactRow label="Master's / MBA Tuition" value="€25,500 / year" />
                <FactRow label="Application Fee" value="€95 (one-time, non-refundable)" />
                <FactRow label="Initial Package (Non-EU/EEA)" value="€6,050 — visa + insurance + pickup" />
                <FactRow label="Avg. Monthly Living Cost" value="€800 – €1,200 / month" />
                <FactRow label="Part-Time Work Rights" value="Up to 16 hours / week during term" />
                <FactRow label="Internship" value="Mandatory full-time paid internship" />
                <FactRow label="Post-Study Work Option" value="Dutch Orientation Year Visa — up to 1 year" />
                <FactRow label="Internship-to-Job Rate" value="50% receive a job offer from their employer" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- COSTS ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Cost of Studying</span>}
            title={<span style={{ color: "#296166" }}>Study Investment — Netherlands 2026</span>}
            sub={
              <span style={{ color: "#296166" }}>
                Transparent, all-in pricing. No hidden charges. The same fee structure applies to every international student regardless of nationality.
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
            <CostCard label="Foundation Programme" amount="€12,250" note="Per year · All-inclusive" detail="Projects & study trips included. Duration: 6–12 months. Pathway to direct Bachelor's entry." delay={0} />
            <CostCard label="Bachelor's Tuition" amount="€24,500" note="Per year · Same fee for all students" detail="3-year fast-track or 4-year standard pathway, taught entirely in English." highlight delay={80} />
            <CostCard label="Master's / MBA" amount="€25,500" note="Per year · 1-year fast-track available" detail="1-year intensive MBA with specialisations: Data Strategy, Real Estate, Hospitality & Global Leadership." delay={160} />
            <CostCard label="Initial Package (Non-EU/EEA)" amount="€6,050" note="One-time deposit" detail="Covers visa processing through IND, health insurance, and airport pickup on arrival." delay={240} />
            <CostCard label="Monthly Living Cost" amount="€800–1,200" note="Per month estimate" detail="Covers accommodation, food & transport. Part-time work (16 hrs/week) helps offset costs." delay={320} />
            <CostCard label="Application Fee" amount="€95" note="One-time, non-refundable" detail="Paid at the credibility interview stage. Covers admissions processing and assessment." delay={400} />
          </div>
        </div>
      </section>

      {/* ---------------- PAYMENT SCHEDULE ---------------- */}
      <section style={{ background: C.white, padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Payment Schedule</span>}
            title={<span style={{ color: "#296166" }}>How & When You Pay</span>}
            sub={
              <span style={{ color: "#296166" }}>
                A clear, staged payment structure — you never pay everything upfront. Fees are tied to milestones in your application and visa journey.
              </span>
            }
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 18,
            }}
          >
            <PayStep num="01" title="Application Fee" amount="€95" note="Paid at credibility interview stage. One-time, non-refundable." delay={0} />
            <PayStep num="02" title="Initial Package" amount="€6,050" note="Paid after unconditional offer letter. Covers visa, insurance & pickup." delay={80} />
            <PayStep num="03" title="Post-Visa Balance" amount="€8,000" note="Due after visa is approved. Confirms your place and pre-departure arrangements." delay={160} />
            <PayStep num="04" title="Monthly Instalments" amount="12×" note="Remaining tuition paid in 12 equal instalments after arrival." isLast delay={240} />
          </div>
        </div>
      </section>

      {/* ---------------- PROGRAMMES ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Popular Study Areas</span>}
            title={
              <span style={{ color: "#296166" }}>
                In-Demand Programmes for International Students
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                Career-aligned, English-taught, and built for the global business world. Foundation to MBA — choose from a 3-year fast-track or 4-year standard Bachelor's pathway.
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
                icon={c.icon}
                title={c.title}
                body={c.body}
                tag={c.tag}
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
            tag="English Requirements"
            title="IELTS, TOEFL, PTE & Cambridge Score Guide"
            sub="Score requirements vary by programme level. Foundation entry is available for students who need to strengthen their English before beginning a degree — you don't need IELTS 6.0 to start."
            light
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              {
                title: "🎓 Foundation Programme",
                icon: "🎓",
                rows: [["IELTS Academic", "5.0 – 5.5"], ["TOEFL iBT", "35 – 45 pts"], ["PTE Academic", "36 – 42"], ["Cambridge", "160 – 170"]],
                note: "💡 The Foundation Programme (6–12 months) is a structured bridge for students who don't yet meet direct entry requirements. Successful completion guarantees direct Bachelor's entry.",
              },
              {
                title: "📚 Bachelor's Programmes",
                icon: "📚",
                rows: [["IELTS Academic", "6.0 overall"], ["TOEFL iBT", "80 points"], ["PTE Academic", "61 points"], ["Cambridge", "160 minimum"]],
                note: "⚠️ Minimum academic requirement: equivalent to Higher General Secondary Education, Pre-University, IB Diploma, A-levels, BTEC Level 3, or Class 12th.",
              },
              {
                title: "📖 Master's / MBA",
                icon: "📖",
                rows: [["IELTS Academic", "6.5 overall"], ["TOEFL iBT", "90 points"], ["PTE Academic", "64 points"], ["Cambridge", "180 minimum"]],
                note: "⚠️ A recognised Bachelor's degree is required for Master's / MBA entry. Requirements may vary by specific programme. Contact Langma International to confirm eligibility.",
              },
            ].map((card, ci) => (
              <Reveal key={card.title} delay={ci * 120}>
                <div
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
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
                      color: C.ink,
                      marginBottom: 20,
                      paddingBottom: 14,
                      borderBottom: `2px solid ${C.gold}`,
                    }}
                  >
                    {card.title}
                  </h3>
                  {card.rows.map(([t, s], idx, arr) => (
                    <div
                      key={t}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 0",
                        borderBottom: idx === arr.length - 1 ? "none" : `1px solid ${C.border}`,
                      }}
                    >
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{t}</span>
                      <span
                        style={{
                          fontSize: 12.5,
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
                      padding: "14px 16px",
                      marginTop: 20,
                      fontSize: 12,
                      color: C.slate,
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
            tag={<span style={{ color: "#296166" }}>Admission Requirements</span>}
            title={<span style={{ color: "#296166" }}>What You Need to Apply</span>}
            sub={
              <span style={{ color: "#296166" }}>
                A clear, straightforward process. Here is exactly what to prepare before submitting your application — no surprises, no hidden requirements.
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
                  ℹ️ Requirements may vary depending on the programme level and your specific academic background. Age gaps and study gaps are accepted. Contact Langma International for a personalised eligibility review.
                </div>
              </div>
            </Reveal>
            <DocsBox title="Academic Entry Qualifications Accepted" items={academicQuals} />
          </div>
        </div>
      </section>

      {/* ---------------- VISA GUIDE ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Netherlands Student Visa Guide</span>}
            title={
              <span style={{ color: "#296166" }}>
                Straightforward, Efficient & Fully Guided
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                The visa process is managed by the institution through the IND (Immigration and Naturalisation Service). Langma International guides you through every step from application to arrival.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="lm-visa-wrap">
            <div>
              {visaSteps.map((s, i) => (
                <VisaStep key={s.title} n={i + 1} title={s.title} body={s.body} fee={s.fee} isLast={i === visaSteps.length - 1} delay={i * 70} />
              ))}
            </div>
            <div style={{ position: "sticky", top: 100 }}>
              <DocsBox
                title="Visa Documents Checklist"
                items={visaDocs}
                note={
                  <>
                    <strong style={{ color: C.navy }}>⚠️ Regional Applicants:</strong> Applicants from Bangladesh, Pakistan, Afghanistan, and Nigeria are required to demonstrate proof of funds or sponsorship from an approved third country.
                    <br />
                    <br />
                    <strong style={{ color: C.navy }}>✅ Gaps & Age:</strong> Study gaps and all ages are accepted — applications are not penalised for career breaks or time between education.
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CAREER OUTLOOK ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Career Outlook · Netherlands 2026</span>}
            title={<span style={{ color: "#296166" }}>Why Dutch Graduates Get Hired</span>}
            sub={
              <span style={{ color: "#296166" }}>
                The Netherlands doesn't just prepare you for a career — it places you inside one. With a mandatory paid internship, a 100+ company career fair, and a 50% internship-to-job rate, graduates are work-ready before they collect their diploma.
              </span>
            }
          />

          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 18, marginBottom: 40 }}>
              {[["50%", "Internship-to-Job Rate"], ["100+", "Companies at Career Fair"], ["1 Year", "Post-Study Orientation Visa"], ["#1", "English Proficiency Globally"]].map(([num, lbl]) => (
                <div key={lbl} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 22px", textAlign: "center" }}>
                  <div style={{ fontSize: 32, fontWeight: 600, color: C.navy, lineHeight: 1, marginBottom: 8 }}>{num}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.slate, textTransform: "uppercase", letterSpacing: "0.8px" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22, marginBottom: 40 }}>
            {careerOutlooks.map((o, i) => (
              <OutlookCard key={o.title} {...o} delay={i * 100} />
            ))}
          </div>

          <Reveal delay={200}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {careerTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    color: C.navy,
                    fontSize: 13,
                    fontWeight: 600,
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
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Student Life</span>}
            title={<span style={{ color: "#296166" }}>Life in the Netherlands — More Than Just Study</span>}
            sub={
              <span style={{ color: "#296166" }}>
                World-class education inside one of the world's most liveable countries. Here is what everyday life actually looks like as an international student.
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
          background: C.cream2,
          padding: "90px 48px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Application Process"
            title="7 Steps to Studying in the Netherlands"
            sub="A clear, fully guided process from first enquiry to first day of class. Langma International is with you at every single step."
            light
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              background: C.white,
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

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section
        style={{
          background: C.cream2,
          padding: "100px 48px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag="Student Stories" title="What Our Students Say" light />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
            {testimonials.map((t, i) => (
              <TestiCard key={t.name} {...t} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <FAQ />
      {/* <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag={<span style={{ color: "#296166" }}>FAQs</span>} title="Frequently Asked Questions — Study in the Netherlands" center />
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
              Start Your Netherlands Journey
              <br />
              <em className="lm-grd-text" style={{ fontStyle: "italic" }}>
                With One Conversation.
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
              September 2026 intake is open now. Europe's #1 English-proficiency country. Paid internships built into your programme. A post-study work visa. Your future is one free conversation away.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <NavyButton onClick={() => setOpen(true)} style={{ background: C.dark, padding: "16px 36px" }}>
                Book Free Counselling →
              </NavyButton>
              <GhostButton dark onClick={() => setOpen(true)}>Apply Now</GhostButton>
              <GhostButton dark onClick={() => setOpen(true)}>Talk to an Expert</GhostButton>
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