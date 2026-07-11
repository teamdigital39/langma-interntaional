import React, { useState, useEffect, useRef } from "react";
import PopupForm from "./PopupForm";
import FAQ from "./FAQ";

/**
 * Study in Dubai (MIBD) — Langma International
 * Palette matches the Study in Poland / South Korea / Malta pages (teal brand accent over navy panels)
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
            fontSize: 26,
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
            color: h ? "#FFFFFF" : "#296166",
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
          Tax-Free
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
    "🇦🇪 Dubai 2026 Intake Open",
    "✦ No IELTS Required",
    "✦ No Show Money",
    "✦ UK-Accredited OTHM Diplomas",
    "✦ 0% Income Tax",
    "✦ Visa in 7 Working Days",
    "✦ Age & Gap Accepted",
    "✦ Pathway to UK & Australia",
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
 *  DATA — Dubai (MIBD) content
 * ================================================================ */
const reasons = [
  { icon: "🗣️", title: "No IELTS or English Test Required", body: "English proficiency is assessed through a simple admission interview — no IELTS, TOEFL, or PTE scores needed. Saves you months of preparation and thousands in test fees." },
  { icon: "🎓", title: "UK-Accredited, Globally Recognised Diplomas", body: "Earn OTHM-accredited qualifications (Levels 3–5) regulated by Ofqual (UK), recognised by KHDA (Dubai), and accepted by WES for international equivalency." },
  { icon: "💰", title: "Tax-Free Professional Environment", body: "The UAE levies zero personal income tax. Every dirham you earn stays with you — a major financial advantage compared to Western study destinations." },
  { icon: "🛂", title: "Streamlined Student Visa Process", body: "Dubai's student visa is processed efficiently with professional guidance at every step. No show money required. Age gaps and study gaps are fully accepted." },
  { icon: "🌍", title: "Gateway to Global Academic Pathways", body: "Your Dubai diploma is your passport to top-up degrees in the UK, Australia, and Canada. MIBD's OTHM Level 4/5 qualifications provide direct entry to Year 2 or Year 3." },
  { icon: "🛡️", title: "Ranked 3rd Safest City in the World", body: "Dubai's world-class infrastructure, low crime rates, and welcoming multicultural environment make it one of the most secure destinations for international students." },
  { icon: "📈", title: "Booming Economy with Real Opportunity", body: "Dubai's GDP grew 4.4% in the first half of 2025 alone, driven by the D33 Agenda targeting a doubling of the economy by 2030 — needing ~1 million new skilled workers." },
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

const outlooks = [
  { icon: "🚀", tag: "Future Demand", title: "~1 Million New Jobs Projected by 2030", body: "The UAE's Dubai Economic Agenda (D33) is targeting a doubling of the economy by 2030, requiring approximately 1 million new skilled professionals across technology, healthcare, education, and manufacturing." },
  { icon: "💼", tag: "During Studies", title: "Paid Internships & Industry Placements", body: "MIBD connects students with paid internship opportunities and job fair access across Dubai's leading companies in finance, hospitality, technology, and logistics." },
  { icon: "💰", tag: "Post-Study", title: "Tax-Free Employment in a Global Hub", body: "The UAE's zero personal income tax policy means your full salary is your take-home pay. Combined with competitive AED packages, Dubai offers outstanding value." },
  { icon: "🌍", tag: "Global Pathway", title: "Springboard to the UK, Australia & More", body: "Your OTHM Level 4/5 diploma is designed as a progression pathway to top-up bachelor's degrees at universities in the UK, Australia, and Canada." },
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

const visaDocs = [
  "Valid passport copy (personal data pages)",
  "All educational certificates (Grade 10 / 12 / degree)",
  "Academic transcripts or mark sheets",
  "Passport-size photograph (digital, white background)",
  "Official Offer Letter from MIBD",
  "Proof of fee payment / receipt",
  "Visa application details (as specified by the institution)",
];

const faqs = [
  { q: "Is IELTS required to study in Dubai?", a: "No — IELTS is not required to study in Dubai at MIBD. English proficiency is assessed through a straightforward admission interview conducted by the institution. No TOEFL, PTE, or any other standardised English test score is required." },
  { q: "How much does it cost to study in Dubai at MIBD?", a: "The full programme tuition fee is USD 7,500. After a 35% merit scholarship is applied, the tuition reduces to USD 5,000. The all-inclusive student visa package costs USD 1,500. Monthly living costs typically range from AED 2,500 to AED 4,500." },
  { q: "How long does the Dubai student visa process take?", a: "The Dubai student visa is typically processed within 7 working days from the point of submission, covering Entry Permit, Medical Check, Biometrics, Emirates ID, and Medical Insurance — all managed as a single coordinated package." },
  { q: "Are study gaps and age restrictions an issue for Dubai admission?", a: "No — study gaps and age are fully accepted at MIBD Dubai. There is no upper age restriction, making Dubai a welcoming and practical option for mature students, career changers, and those returning to education after a break." },
  { q: "What qualifications will I earn by studying in Dubai?", a: "Students at MIBD earn OTHM-accredited diplomas at Levels 3, 4, and 5, regulated by Ofqual (UK), recognised by KHDA (Dubai), and accepted by WES for global academic equivalency. They're widely accepted for top-up bachelor's degrees abroad." },
  { q: "Can I work or intern during my studies in Dubai?", a: "MIBD supports students in accessing paid internship opportunities and job fair connections through its industry network. Post-graduation, professionals in the UAE earn in a fully tax-free environment." },
  { q: "What does \"assignment-based assessment\" mean — are there no exams?", a: "All OTHM diploma programmes at MIBD are assessed entirely through coursework and practical assignments — there are no written end-of-year examinations. Students are evaluated on applied, work-ready skills." },
  { q: "Can a Dubai diploma lead to a UK or Australian university degree?", a: "Yes. MIBD's OTHM Level 4/5 diplomas are specifically designed as academic progression pathways to top-up bachelor's degrees in the UK, Australia, and Canada, with entry directly into Year 2 or Year 3." },
  { q: "What does \"No Show Money\" mean for the Dubai visa?", a: "Unlike student visas for the UK, USA, Canada, or Australia, the Dubai student visa does not require you to demonstrate large sums of money in your bank account as proof of financial capability." },
  { q: "When can I apply — what are the 2026 intake dates?", a: "MIBD operates on a rolling intake basis — applications are accepted throughout the year with no single fixed deadline. We recommend applying at least 2 months before your intended start date." },
];

/* ===================================================================
 *  MAIN
 * ================================================================ */
export default function StudyDubaiPage() {
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
                Study In <span className="text-[#2FC7A1]">Dubai</span>
                <br />
                Where Global Careers
                <br />
                Begin.
              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
                Ranked among the world's top student cities. UK-accredited
                diplomas. Tax-free professional environment. No IELTS needed
                — just your ambition and a passport.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  "✓No IELTS Required",
                  "✓No Show Money",
                  "✓Age & Gap Accepted",
                  "✓Streamlined Visa Process",
                  "✓Pathway to UK & Australia",
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
                    src="images/duba.jpeg"
                    alt="Study in Dubai"
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
              <BoardingStat text="#7" label="Global Student City 2025" sub="Education.com ranking" delay={100} />
              <BoardingStat text="#3" label="Safest City Globally" sub="World safety ranking" delay={250} />
              <BoardingStat value={37} suffix="+" label="International Campuses" sub="Across the UAE" delay={400} />
              <BoardingStat text="0%" label="Income Tax in UAE" sub="Fully tax-free environment" delay={550} />
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
            tag={<span style={{ color: "#296166" }}>Why Dubai</span>}
            title={
              <span style={{ color: "#296166" }}>
                8 Reasons Dubai Is South Asia's Smartest Study Destination in 2026
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                Just a 3-hour flight from India. Decades ahead in opportunity. Dubai delivers internationally recognised education inside one of the world's fastest-growing economies.
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
          ✨ Whether you completed Grade 10, 12, or hold a degree — Dubai welcomes you. Check your eligibility for free today.
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
                  border: "1px solid rgba(240,192,64,0.15)",
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <FactRow label="Country" value="United Arab Emirates (UAE)" />
                <FactRow label="Currency" value="UAE Dirham (AED) · 1 USD ≈ 3.67 AED" />
                <FactRow label="Language" value="Arabic (official) · English (education & business)" />
                <FactRow label="Global Student City Rank" value="#7 Worldwide — Education.com 2025" />
                <FactRow label="Safety Ranking" value="#3 Safest City Globally" />
                <FactRow label="International Campuses" value="37+ Branch Campuses in the UAE" />
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(240,192,64,0.15)",
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <FactRow label="Tuition Fees" value="USD 5,000 (after 35% merit scholarship)" />
                <FactRow label="Visa Fee" value="USD 1,500 (comprehensive all-in package)" />
                <FactRow label="Visa Processing Time" value="Typically within 7 working days" />
                <FactRow label="Intakes" value="Rolling intakes — apply year-round" />
                <FactRow label="English Requirement" value="Interview-based — no IELTS or TOEFL needed" />
                <FactRow label="Income Tax" value="0% — fully tax-free environment" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- COSTS ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Cost of Studying in Dubai</span>}
            title={<span style={{ color: "#296166" }}>Transparent Fee Structure for 2026 Intake</span>}
            sub={
              <span style={{ color: "#296166" }}>
                Dubai provides internationally recognised education at a significantly more accessible cost than the UK, USA, or Australia — especially with scholarship support applied.
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
            <CostCard label="Tuition Fee (Original)" amount="USD 7,500" note="Full programme fee before scholarship" delay={0} />
            <CostCard label="After 35% Merit Scholarship" amount="USD 5,000" note="You save USD 2,500 — apply for details" highlight delay={80} />
            <CostCard label="Student Visa Package" amount="USD 1,500" note="Entry permit, medical, Emirates ID & insurance" delay={160} />
            <CostCard label="Accommodation" amount="AED 1,500–3,500" note="Per month · shared or private options" delay={240} />
            <CostCard label="Monthly Living Costs" amount="AED 2,500–4,500" note="Food, transport & daily essentials" delay={320} />
            <CostCard label="Health Insurance" amount="Included" note="Fully covered within the visa package" delay={400} />
          </div>
        </div>
      </section>

      {/* ---------------- PROGRAMMES ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>MIBD Programmes — Study in Dubai</span>}
            title={
              <span style={{ color: "#296166" }}>
                UK-Accredited Diplomas Designed for Dubai's Job Market
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                Each programme is OTHM-accredited (UK), KHDA-recognised in Dubai, and accepted globally via WES. All assessed through practical assignments — no final exams.
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
                delay={i * 70}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- LANGUAGE / ELIGIBILITY REQUIREMENTS ---------------- */}
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
            tag="English Requirements for Dubai"
            title="No IELTS Required to Study in Dubai"
            sub="Unlike most Western destinations, Dubai does not require IELTS, TOEFL, or any standardised English test. Here is exactly what the admission process looks like for international students."
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
                  <span>🗣️</span> Standard Admission (All Levels)
                </h3>
                {[
                  ["IELTS", "Not Required"],
                  ["TOEFL", "Not Required"],
                  ["PTE", "Not Required"],
                  ["English Interview", "Accepted ✓"],
                  ["Medium of Instruction Certificate", "Accepted ✓"],
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
                  💡 English proficiency is confirmed through a straightforward institutional interview — no external test bookings, score submissions, or additional preparation required.
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
                  <span>✅</span> Who Is Eligible to Apply?
                </h3>
                {[
                  ["Grade 10 Completed", "Eligible ✓"],
                  ["Grade 12 Completed", "Eligible ✓"],
                  ["Graduate Applicants", "Eligible ✓"],
                  ["Study Gap Applicants", "Accepted ✓"],
                  ["Age Restrictions", "None — All Ages Welcome ✓"],
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
                  ⚠️ Specific entry requirements may vary slightly between Level 3 and Level 4/5 programmes. Your Langma International advisor will confirm exact criteria before you apply.
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
            tag={<span style={{ color: "#296166" }}>Dubai Student Visa Guide</span>}
            title={
              <span style={{ color: "#296166" }}>
                Dubai Student Visa — Straightforward, Efficient, Guided
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                Dubai's student visa process is among the most accessible in the world for international applicants. Langma International provides professional guidance through every stage.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="lm-visa-wrap">
            <div>
              <VisaStep n={1} title="Submit Your Application Online" body="Create your student profile and upload your passport copy and academic certificates. The process takes under 20 minutes and can be completed from anywhere." delay={0} />
              <VisaStep n={2} title="Receive Your Offer Letter" body="MIBD's admissions team reviews your application within 2–3 working days. Upon approval, your official Offer Letter is issued with full programme and next-step details." delay={100} />
              <VisaStep n={3} title="Confirm Your Place & Pay Fees" body="Secure your admission by paying the programme fees as outlined in your Offer Letter. A full payment invoice and receipt are issued immediately upon confirmation." delay={200} />
              <VisaStep n={4} title="Visa Processing — Typically Within 7 Days" body="Your comprehensive visa package (USD 1,500) covers Entry Permit, Medical Check, Biometrics, Medical Insurance, Visa Stamping, and Emirates ID — all coordinated by our team." delay={300} />
              <VisaStep n={5} title="Arrive & Begin Your Dubai Journey" body="Receive your orientation schedule, welcome pack, and accommodation guidance before departure. Langma International supports your complete pre-arrival and on-ground transition." isLast delay={400} />
            </div>
            <div style={{ position: "sticky", top: 100 }}>
              <DocsBox
                title="Required Documents"
                items={visaDocs}
                note={
                  <>
                    <strong style={{ color: "#FFFFFF" }}>Visa Fee:</strong> USD 1,500 (comprehensive all-inclusive package)
                    <br />
                    <strong style={{ color: "#FFFFFF" }}>Covers:</strong> Entry Permit · Medical Check · Biometrics · Medical Insurance · Visa Stamping · Emirates ID
                    <br />
                    <strong style={{ color: "#FFFFFF" }}>Processing Time:</strong> Typically 7 working days
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SALARY OUTLOOK ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Tax-Free Salary Outlook — Dubai 2026</span>}
            title={<span style={{ color: "#296166" }}>Career Earnings Across Key Dubai Sectors</span>}
            sub={
              <span style={{ color: "#296166" }}>
                In the UAE, personal income tax is zero — meaning these figures reflect what professionals take home. Data sourced from Dubai 2026 salary benchmarks for reference purposes.
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
            tag={<span style={{ color: "#296166" }}>Career Outlook — UAE 2026 & Beyond</span>}
            title={
              <span style={{ color: "#296166" }}>
                Dubai: A City Actively Building Its Workforce
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                Dubai is not just a place to study — it is a city in deliberate expansion mode. The UAE's economic agenda is creating large-scale professional opportunities across every major industry.
              </span>
            }
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
      <FAQ />
      {/* <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag={<span style={{ color: "#296166" }}>FAQs</span>} title="Common Questions About Studying in Dubai" center />
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
              Dubai Is Ready.
              <br />
              <em className="lm-grd-text" style={{ fontStyle: "italic" }}>
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
              <NavyButton onClick={() => setOpen(true)} style={{ background: C.forest, padding: "16px 36px" }}>
                Book Free Counselling →
              </NavyButton>
              <GhostButton onClick={() => setOpen(true)}>Check My Eligibility</GhostButton>
              <GhostButton onClick={() => setOpen(true)}>Talk to an Advisor</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER INFO ---------------- */}
      <div
        className="-mb-[70px]"
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
        <span style={{ fontSize: 13, color: "#296166", display: "block" }}>
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