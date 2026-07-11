import React, { useState, useEffect, useRef } from "react";
import PopupForm from "./PopupForm";
import FAQ from "./FAQ";

/**
 * Study in Singapore — Langma International
 * Palette matches the Study in Poland / South Korea / Malta / Dubai pages (teal brand accent over navy panels)
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
      </div>
    </Reveal>
  );
}

/* ===================================================================
 *  Programme card (with duration + fee)
 * ================================================================ */
function ProgramCard({ num, title, body, duration, fee, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: "relative",
          background: h ? C.goldSoft : C.white,
          border: `1px solid ${h ? C.navy : C.border}`,
          padding: "26px 22px",
          borderRadius: 16,
          transition: "all 0.35s cubic-bezier(.2,.7,.2,1)",
          transform: h ? "translateY(-6px)" : "translateY(0)",
          boxShadow: h ? `0 22px 40px -20px rgba(26,46,90,0.4)` : "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            background: h ? C.gold : C.goldTint,
            color: h ? C.white : C.navy,
            fontSize: 12,
            fontWeight: 700,
            borderRadius: 10,
            marginBottom: 12,
            transition: "all 0.3s ease",
          }}
        >
          {num}
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: h ? C.white : C.ink,
            marginBottom: 6,
            lineHeight: 1.35,
            transition: "color 0.3s ease",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: C.slate,
            lineHeight: 1.6,
            marginBottom: 14,
            transition: "color 0.3s ease",
          }}
        >
          {body}
        </div>
        <div
          style={{
            fontSize: 11.5,
            fontWeight: 600,
            color: h ? C.goldL : C.forest,
            marginBottom: 4,
          }}
        >
          {duration}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: h ? "rgba(255,255,255,0.9)" : C.ink,
          }}
        >
          {fee}
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
 *  Salary card
 * ================================================================ */
function SalaryCard({ sector, monthly, delay }) {
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
        padding: "24px 20px",
        borderRadius: 14,
        textAlign: "center",
        transition: "all 0.3s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: C.slate,
          marginBottom: 10,
          display: "block",
        }}
      >
        {sector}
      </span>
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: C.ink,
          lineHeight: 1,
        }}
      >
        {monthly}
      </div>
      <div style={{ fontSize: 11.5, color: C.slate, marginTop: 6 }}>per month avg. starting</div>
    </div>
  );
}

/* ===================================================================
 *  Outlook / Internship card
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
    "🇸🇬 Singapore 2026 Intake Open",
    "✦ No IELTS Required",
    "✦ Paid Internships Included",
    "✦ SGD 1,000–2,000/mo Internship Earnings",
    "✦ PR Pathway Available",
    "✦ 6 Intakes Per Year",
    "✦ EduTrust-Certified Programmes",
    "✦ Age 18–32 Welcome",
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
 *  DATA — Singapore content
 * ================================================================ */
const reasons = [
  { icon: "🗣️", title: "No IELTS, TOEFL or PTE Required", body: "English proficiency is assessed during the admissions process itself — no external test scores needed. Any percentage, backlog, or study gap is accepted." },
  { icon: "💼", title: "Structured Paid Internships", body: "Every diploma programme includes a 6-month paid internship, earning SGD 1,000–2,000 per month while building a CV that works in Singapore's competitive job market." },
  { icon: "🎓", title: "EduTrust-Certified Education", body: "Programmes are government-certified under SkillsFuture Singapore and awarded EduTrust by the Committee for Private Education (CPE) since 2017 — a mark of quality and trust." },
  { icon: "🌍", title: "Globally Recognised Qualifications", body: "Credentials recognised by top universities in Malaysia, the United Kingdom, Australia, and the United States — opening doors to top-up degree pathways internationally." },
  { icon: "🏛️", title: "Pathway to Permanent Residency", body: "Singapore offers a structured PR pathway for international graduates who secure employment post-study. Work in key growth sectors and build your long-term future here." },
  { icon: "🛡️", title: "World-Class Safety & Urban Lifestyle", body: "Consistently ranked among the world's safest cities. Clean, modern infrastructure, a multicultural community, and a warm tropical climate year-round." },
  { icon: "🏢", title: "Asia's Global Business & Tech Hub", body: "Home to hundreds of Fortune 500 companies and multinational corporations, offering unparalleled access to internships, networking events, and career opportunities." },
  { icon: "📅", title: "6 Flexible Intakes Per Year", body: "Unlike most study destinations that offer a single annual intake, Singapore provides six intake windows throughout the year — so you can start almost as soon as you decide." },
];

const programs = [
  { title: "Hospitality & Tourism Management", body: "Luxury resorts, global hotel chains, event management & international travel operations", duration: "6 months study + 6 months internship", fee: "SGD 6,024.50" },
  { title: "Business & Retail Management", body: "Corporate management, retail operations, business strategy & entrepreneurship", duration: "6 months study + 6 months internship", fee: "SGD 6,024.50" },
  { title: "Logistics & Supply Chain Management", body: "Singapore's role as a global trade hub creates consistent, high-demand career opportunities", duration: "6 months study + 6 months internship", fee: "SGD 6,024.50" },
  { title: "Advanced Hospitality & Tourism Management", body: "Senior roles in hotel operations, tourism planning & premium guest experience management", duration: "6 months study + 6 months internship", fee: "SGD 6,224.50" },
  { title: "Higher Diploma — Hospitality & Tourism", body: "Comprehensive 12-month programme designed for management-level hospitality careers", duration: "12 months study + 6 months internship", fee: "SGD 9,000" },
  { title: "PG Diploma — Hospitality & Tourism", body: "Postgraduate-level credential for experienced hospitality professionals and graduates", duration: "6 months study + 6 months internship", fee: "SGD 6,500" },
  { title: "Sports Science & Management", body: "Sports administration, facility management & performance consultancy across Asia's growing sports industry", duration: "6 months study + 6 months internship", fee: "SGD 6,024.50" },
  { title: "Sports Science & Coaching", body: "Coach development, athlete training & professional sports industry careers in Singapore and beyond", duration: "6 months study + 6 months internship", fee: "SGD 6,024.50" },
  { title: "Data Analytics & Business", body: "High-demand data skills applied across finance, technology, retail & business operations sectors", duration: "10 months", fee: "SGD 8,000" },
  { title: "Diploma in Caregiving", body: "Healthcare & elderly care — a critical shortage sector with active hiring and strong PR prospects", duration: "12 months", fee: "SGD 8,000" },
  { title: "Restaurant Entrepreneurship", body: "F&B business management, culinary entrepreneurship & food technology innovation", duration: "6 months study + 6 months internship", fee: "SGD 4,458 (subsidised)" },
];

const salaries = [
  { sector: "Finance & Banking", monthly: "SGD 4,200" },
  { sector: "Technology & AI", monthly: "SGD 4,500" },
  { sector: "Logistics & Supply Chain", monthly: "SGD 3,400" },
  { sector: "Hospitality & Tourism", monthly: "SGD 3,000" },
  { sector: "Healthcare & Caregiving", monthly: "SGD 3,200" },
  { sector: "Sports & Fitness", monthly: "SGD 3,000" },
];

const internshipCards = [
  { icon: "🏢", tag: "During Studies", title: "Structured Industry Placement", body: "Paid placements are arranged through 500+ corporate partners spanning hospitality, logistics, finance, technology, healthcare, and sports — giving you real-world exposure." },
  { icon: "💰", tag: "Internship Earnings", title: "SGD 1,000–2,000 Per Month", body: "Earn a real salary during your 6-month internship placement — significantly offsetting your living expenses while building a professionally competitive CV." },
  { icon: "🌍", tag: "Global Exposure", title: "Fortune 500 & MNC Access", body: "Career days, global industry networking events, and internship placements with international corporate partners are embedded into the programme experience." },
  { icon: "🚀", tag: "Post-Internship", title: "Career Pathways & Employment Opportunities", body: "Strong internship performance frequently opens the door to full-time employment offers — building the profile needed to pursue Singapore's PR pathway." },
];

const support = [
  { icon: "🔍", title: "Free Eligibility Assessment", body: "Understand your study options before you commit. We assess your academic profile, career goals, and best-fit programmes — completely free of charge." },
  { icon: "📝", title: "Complete Application Preparation", body: "We prepare and submit your full application package — forms, documents, and photographs — reviewed for accuracy and completeness before submission." },
  { icon: "🛂", title: "Professional Visa Filing Support", body: "Comprehensive Student Pass documentation support — from checklist preparation and document verification to submission tracking across the full 30-day window." },
  { icon: "✈️", title: "Airport Pickup (On Request)", body: "Arranged on request — so your first hours in Singapore are seamless, well-supported, and completely stress-free." },
  { icon: "🏦", title: "Bank Account Setup Assistance", body: "We help you set up a Singapore bank account from day one — essential for receiving your internship salary and managing your finances." },
  { icon: "🏠", title: "Accommodation Arrangements", body: "Suitable student accommodation is sourced and confirmed before you travel — so you arrive knowing exactly where you'll be living." },
  { icon: "💼", title: "Internship Placement Support", body: "Connected to 500+ industry partners across Singapore's top sectors — we actively support your internship placement to ensure it is secured and relevant." },
  { icon: "💬", title: "Dedicated Student Advisor", body: "One dedicated advisor throughout your entire journey — from initial application to arrival and post-landing support. No bots, no call queues." },
];

const visaDocs = [
  "Valid passport — original and photocopy",
  "Passport-size photograph — digital, white background",
  "All educational certificates and academic transcripts",
  "Birth certificate or birth affidavit",
  "Bank statement (if applicable)",
  "Employment or experience letter (if applicable)",
  "Completed application form (provided by Langma)",
];

const faqs = [
  { q: "Is IELTS required to study in Singapore?", a: "No — IELTS, TOEFL, and PTE are not required for admission to diploma programmes in Singapore. English proficiency is assessed as part of the application and admissions process itself." },
  { q: "Can I earn money while studying in Singapore?", a: "Yes — every diploma programme includes a structured 6-month paid internship where students earn SGD 1,000–2,000 per month. Placements are arranged through a network of 500+ corporate partners." },
  { q: "How long does the Singapore student visa take to process?", a: "The Student Pass — Singapore's student visa — is processed by the Immigration and Checkpoints Authority (ICA) and typically takes approximately 30 days." },
  { q: "What are the eligibility requirements for Singapore study programmes?", a: "Students who have completed at least Grade 10 are eligible to apply. Grade 12 graduates and university graduates are equally welcome. Any academic percentage is accepted, backlogs are accepted, and study gaps are accepted. Age range is 18 to 32 years." },
  { q: "How much does it cost to study in Singapore?", a: "Most 6-month diploma programmes are priced at SGD 6,024.50. The Higher Diploma (12 months) costs SGD 9,000, payable in two instalments. Monthly living costs typically range from SGD 1,200–2,000, partly offset by internship earnings." },
  { q: "Are Singapore qualifications recognised internationally?", a: "Yes. Programmes are EduTrust-certified by Singapore's Committee for Private Education and are recognised by leading universities in Malaysia, the UK (including the University of Portsmouth), Australia, and the US." },
  { q: "Can studying in Singapore lead to Permanent Residency?", a: "Singapore offers a Permanent Residency pathway for international graduates who secure employment after completing their studies, particularly in high-demand sectors such as healthcare, technology, logistics, and hospitality." },
  { q: "How many intakes are there per year in Singapore?", a: "Singapore offers 6 intake windows per year — giving you far greater flexibility than most international study destinations. We recommend applying at least 2 months before your preferred start date." },
  { q: "What documents do I need to apply for a Singapore study programme?", a: "Core documents include your passport, a passport-size photograph, all educational certificates and transcripts, and a birth certificate or affidavit. An Offer Letter is typically issued within 2–3 working days of submission." },
  { q: "What end-to-end support does Langma International provide?", a: "Langma International provides comprehensive support — including a free eligibility assessment, application preparation, professional visa filing guidance, airport pickup, bank account setup assistance, accommodation arrangements, internship placement support, and a dedicated student advisor." },
];

/* ===================================================================
 *  MAIN
 * ================================================================ */
export default function StudySingaporePage() {
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
                Study In <span className="text-[#2FC7A1]">Singapore</span>
                <br />
                Asia's Gateway to
                <br />
                a Global Career.
              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
                EduTrust-certified programmes. Structured paid internships. A
                clear pathway to Permanent Residency — right in the heart of
                Southeast Asia. Earn while you study with paid internships of
                SGD 1,000–2,000 per month, built into every diploma
                programme.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  "✓No IELTS Required",
                  "✓Paid Internships Included",
                  "✓PR Pathway Available",
                  "✓6 Intakes Per Year",
                  "✓Age 18–32 Welcome",
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
                    src="images/singa.jpeg"
                    alt="Study in Singapore"
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
              <BoardingStat text="SGD 3K–4.5K" label="Avg. Graduate Salary" sub="Per month, sector-dependent" delay={100} />
              <BoardingStat value={500} suffix="+" label="Industry Partners" sub="Internship network" delay={250} />
              <BoardingStat value={20} suffix="+" label="Years of Excellence" sub="Institutional track record" delay={400} />
              <BoardingStat value={15} suffix="+" label="Countries Represented" sub="On campus" delay={550} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <Marquee />

      {/* ---------------- WHY SINGAPORE ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Why Singapore</span>}
            title={
              <span style={{ color: "#296166" }}>
                8 Reasons Singapore Is a Smart Study Destination in 2026
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                Safe, cosmopolitan, and deeply connected to global business — Singapore offers a quality education with real, measurable career outcomes.
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
          ✨ Grade 10, 12 pass, or a graduate? Aged 18–32? You may be eligible to apply right now.
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
          Check My Eligibility →
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
            title="Singapore — Essential Facts for International Students"
            sub="Everything you need to know before making your decision — at a glance."
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
                <FactRow label="Country" value="Republic of Singapore" />
                <FactRow label="Currency" value="Singapore Dollar (SGD) · 1 SGD ≈ INR 63" />
                <FactRow label="Language of Instruction" value="English — the primary medium across all programmes" />
                <FactRow label="Climate" value="Tropical · 25°C–31°C year-round" />
                <FactRow label="Intakes Per Year" value="6 intakes — flexible start dates" />
                <FactRow label="IELTS / TOEFL / PTE" value="Not required — assessed during admissions" />
              </div>
              <div
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <FactRow label="Eligibility" value="Grade 10 / 12 / Any Graduate · Any % · Backlogs & gaps accepted" />
                <FactRow label="Age Limit" value="18 to 32 years" />
                <FactRow label="Student Pass Processing" value="Approximately 30 days" />
                <FactRow label="Internship Earnings" value="SGD 1,000 – 2,000 / month during 6-month placement" />
                <FactRow label="Post-Study Opportunity" value="Permanent Residency (PR) pathway available" />
                <FactRow label="Avg. Graduate Starting Salary" value="SGD 3,000 – 4,500 / month, sector-dependent" />
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
            title={<span style={{ color: "#296166" }}>How Much Does It Cost to Study in Singapore?</span>}
            sub={
              <span style={{ color: "#296166" }}>
                Competitive programme fees, a paid internship that actively offsets living costs, and strong graduate earning potential — Singapore is significantly more accessible than it first appears.
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
            <CostCard label="Diploma Tuition" amount="SGD 6,024" note="Most 6-month diploma programmes" delay={0} />
            <CostCard label="Higher Diploma" amount="SGD 9,000" note="12-month programme · payable in 2 instalments" delay={80} />
            <CostCard label="PG Diploma" amount="SGD 6,500" note="6-month course + 6-month internship" delay={160} />
            <CostCard label="Internship Earnings" amount="SGD 1,000–2,000" note="Per month · earned during your 6-month placement" highlight delay={240} />
            <CostCard label="Accommodation" amount="SGD 600–1,200" note="Per month · shared or private arrangements" delay={320} />
            <CostCard label="Monthly Living Costs" amount="SGD 1,200–2,000" note="Food, transport & daily essentials" delay={400} />
          </div>
        </div>
      </section>

      {/* ---------------- PROGRAMMES ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Programmes Available</span>}
            title={
              <span style={{ color: "#296166" }}>
                Industry-Aligned Programmes Built for Real Career Outcomes
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                Every programme combines structured academic learning with a 6-month paid internship — delivering both internationally recognised qualifications and hands-on professional experience.
              </span>
            }
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            {programs.map((p, i) => (
              <ProgramCard
                key={p.title}
                num={String(i + 1).padStart(2, "0")}
                title={p.title}
                body={p.body}
                duration={p.duration}
                fee={p.fee}
                delay={i * 60}
              />
            ))}
          </div>
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
            tag="English & Admission Requirements"
            title="No IELTS. No TOEFL. No Language Barrier."
            sub="Singapore's admissions process is designed to be genuinely inclusive. English proficiency is assessed through the application itself — no external test booking or score submission required."
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
                  <span>🗣️</span> Language Requirements — All Levels
                </h3>
                {[
                  ["IELTS", "Not Required"],
                  ["TOEFL", "Not Required"],
                  ["PTE Academic", "Not Required"],
                  ["Cambridge / Duolingo English", "Not Required"],
                  ["English Interview / Assessment", "Accepted ✓"],
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
                  💡 English proficiency is evaluated as part of the admissions process — removing one of the most common barriers for students from India and South Asia.
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
                  ["Grade 10 Completed", "Eligible ✓"],
                  ["Grade 12 Completed", "Eligible ✓"],
                  ["Graduates (Any Stream)", "Eligible ✓"],
                  ["Any Academic Percentage", "Accepted ✓"],
                  ["Academic Backlogs", "Accepted ✓"],
                  ["Study Gaps", "Accepted ✓"],
                  ["Age Range", "18 – 32 Years"],
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
                  ⚠️ Entry criteria may vary slightly by programme. Your Langma International advisor will confirm the specific requirements for your chosen course before you apply.
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
            tag={<span style={{ color: "#296166" }}>Singapore Student Visa</span>}
            title={
              <span style={{ color: "#296166" }}>
                Your Student Pass — A Clear, Step-by-Step Process
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                The Singapore Student Pass is a structured, manageable process. Langma International provides professional visa guidance at every stage — from document preparation to submission and beyond.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="lm-visa-wrap">
            <div>
              <VisaStep n={1} title="Submit Your Application" body="Send your completed application form and supporting documents to the admissions team. The process is straightforward and can be prepared in under 30 minutes with our help." delay={0} />
              <VisaStep n={2} title="Receive Your Offer Letter (2–3 Working Days)" body="Applications are reviewed promptly. If approved, you receive your Offer Letter within 2–3 working days — containing full admission details and programme fee breakdown." delay={100} />
              <VisaStep n={3} title="Pay Initial Deposit & Confirm Your Place" body="Pay the initial deposit to secure your enrolment. The institution then proceeds to lodge your Student Pass application with the Immigration and Checkpoints Authority (ICA), Singapore." delay={200} />
              <VisaStep n={4} title="Visa Decision — Approximately 30 Days" body="ICA Singapore processes your Student Pass application. The standard processing timeline is approximately 30 days. Langma International monitors progress and keeps you informed." delay={300} />
              <VisaStep n={5} title="Pay Course Fee & Prepare to Travel" body="After your Student Pass is approved, pay the remaining programme fee. Langma International then coordinates your pre-departure orientation, airport pickup, bank account assistance, and accommodation arrangements." isLast delay={400} />
            </div>
            <div style={{ position: "sticky", top: 100 }}>
              <DocsBox
                title="Required Documents Checklist"
                items={visaDocs}
                note={
                  <>
                    <strong style={{ color: C.navy }}>Visa Processing Time:</strong> ~30 days via ICA Singapore
                    <br />
                    <strong style={{ color: C.navy }}>Offer Letter:</strong> Issued within 2–3 working days
                    <br />
                    <strong style={{ color: C.navy }}>Support Included:</strong> Airport pickup · Bank account assistance · Accommodation arrangements
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- INTERNSHIP PROGRAMME ---------------- */}
      <section
        style={{
          background: C.cream2,
          padding: "90px 48px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Structured Paid Internship Programme"
            title="Earn While You Study — SGD 1,000–2,000 Per Month"
            sub="Every diploma programme includes a structured 6-month paid internship, arranged through a network of 500+ industry partners across Singapore's most active employment sectors."
            light
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
            {internshipCards.map((c, i) => (
              <OutlookCard key={c.title} {...c} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CAREER OUTLOOK ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Career Outlook</span>}
            title={<span style={{ color: "#296166" }}>Average Graduate Salaries in Singapore by Sector</span>}
            sub={
              <span style={{ color: "#296166" }}>
                Singapore's multinational-heavy economy provides competitive graduate salaries across multiple sectors. Here is a realistic overview of average starting earnings by industry.
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
            {salaries.map((s, i) => (
              <SalaryCard key={s.sector} {...s} delay={i * 70} />
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
            tag="Why Langma International"
            title="Your Singapore Study Partner — From Day One to Destination"
            sub="We manage your complete journey — from your initial eligibility check to your first day in Singapore and every milestone that follows."
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
          <SectionHead tag={<span style={{ color: "#296166" }}>FAQs</span>} title="Frequently Asked Questions About Studying in Singapore" center />
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
              Your Singapore Journey
              <br />
              <em className="lm-grd-text" style={{ fontStyle: "italic" }}>
                Begins Today.
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
              6 intakes a year. A structured paid internship from the start. A genuine pathway to Permanent Residency. There's no reason to wait — let's build your future together.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <NavyButton onClick={() => setOpen(true)} style={{ background: C.dark, padding: "16px 36px" }}>
                Book Free Counselling →
              </NavyButton>
              <GhostButton dark onClick={() => setOpen(true)}>Apply Now</GhostButton>
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