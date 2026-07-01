import React, { useState, useEffect, useRef } from "react";
import PopupForm from "./PopupForm";
import FAQ from "./FAQ";

/**
 * Study in Cyprus — Langma International
 * Palette matches the Study in Poland / South Korea / Malta / Dubai / Singapore / Mauritius / Netherlands pages
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
 *  Outlook card (used for Work Opportunities)
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
    "🇨🇾 Cyprus 2026 Intake Open",
    "✦ EU-Recognised Degrees",
    "✦ Tuition from €5,500/yr",
    "✦ No Visa Interview",
    "✦ IELTS 4.0 Minimum Accepted",
    "✦ 300+ Sunny Days a Year",
    "✦ #31 Safest Country Globally",
    "✦ Study Gaps & Rejected Cases Accepted",
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
 *  DATA — Cyprus content
 * ================================================================ */
const reasons = [
  { icon: "💰", title: "Genuinely Affordable Education", body: "Foundation programs from €5,500 and master's degrees from €7,500 — with living costs around €300/month. A fraction of what you'd pay in the UK or Western Europe." },
  { icon: "🎓", title: "EU-Recognised Degrees", body: "Qualifications earned in Cyprus carry EU recognition — opening career doors across all 27 EU member states and are respected by employers worldwide." },
  { icon: "🌐", title: "Fully English-Medium Programs", body: "No Greek language requirement. Business, law, science, design, and technology programs are all delivered in English — no language barrier, no compromise on quality." },
  { icon: "🛡️", title: "One of Europe's Safest Countries", body: "Ranked 31st safest country globally by World Population Review 2026, with a low Global Terrorism Index score of 0.347. Safe for students, reassuring for parents." },
  { icon: "☀️", title: "300+ Sunny Days a Year", body: "The only EU country where the sea stays warm enough for swimming even in November. Mediterranean winters average 13–15°C — mild, dry, and perfect for outdoor living year-round." },
  { icon: "🤝", title: "EU Networking & Career Access", body: "As a full EU member, Cyprus offers direct networking into European business markets. Graduates connect with employers across finance, tourism, technology, and professional services." },
  { icon: "📚", title: "American-Style Flexible Curriculum", body: "Cyprus colleges follow a flexible, American-style credit system — giving you greater freedom to choose electives, change specialisations, and shape your own academic path." },
  { icon: "🏛️", title: "Rich Culture & Strategic Location", body: "Three UNESCO World Heritage Sites. A crossroads between Europe, Asia, and Africa. Cyprus blends ancient history with modern cosmopolitan living — a genuinely unique study environment." },
];

const courses = [
  { icon: "💼", title: "Business Administration", body: "Careers in management, strategy & operations across EU markets." },
  { icon: "📊", title: "Accounting & Finance", body: "ACCA-linked programs; direct pathway to European financial careers." },
  { icon: "🏨", title: "Hospitality & Tourism", body: "Industry-tied programs with real hotel & travel placement opportunities." },
  { icon: "💻", title: "Computing & IT", body: "Software, networking & systems roles in Cyprus's growing tech sector." },
  { icon: "🔐", title: "Cybersecurity", body: "Critical shortage globally — graduates in immediate demand across EU." },
  { icon: "📈", title: "MBA", body: "18-month business leadership program — open to working professionals." },
  { icon: "⚖️", title: "Law (LLB / LLM)", body: "EU & UK-aligned legal education; corporate, commercial & international law." },
  { icon: "🎨", title: "Design (Graphic / Fashion / Interior)", body: "Creative industry degrees for the European and global design economy." },
  { icon: "🧠", title: "Psychology", body: "High-satisfaction programs with clinical and business specialisations." },
  { icon: "📡", title: "Media & Web Production", body: "Digital media, UX design & web development for the creative economy." },
  { icon: "🔬", title: "Science & Engineering", body: "Computer, electrical & electronic engineering with strong employment outcomes." },
  { icon: "✈️", title: "Travel & Tourism Management", body: "Specialist degree for Cyprus's major economic sector — hospitality & travel." },
];

const visaDocs = [
  "Valid passport — colour print (front data page)",
  "High school certificate / bachelor's degree — colour print",
  "English language certificate (IELTS or PTE) — colour print",
  "Medical report — original (HBV, HCV, HIV/AIDS, VDRL/RPR, chest X-ray — valid 4 months)",
  "Bank balance letter — original",
  "Bank statement showing €7,000 current/one-day balance — original",
  "Police Clearance Certificate (PCC) — original",
  "All documents must be Apostilled and couriered to the college address",
];

const workCards = [
  { icon: "🕒", tag: "During Studies", title: "Part-Time Work Rights", body: "International students in Cyprus can work part-time as permitted under student immigration regulations. Guidance on finding and applying for roles is included in our support service." },
  { icon: "🏨", tag: "Popular Sectors", title: "Where Students Find Work", body: "Tourism and hospitality, retail, finance and banking services, IT support, and on-campus roles are the most common sectors for student employment. The service economy (85% of GDP) keeps demand high." },
  { icon: "🇪🇺", tag: "Post-Graduation", title: "EU-Wide Career Access", body: "Your Cyprus degree and EU residency status open career doors across all 27 EU member states — Germany, Netherlands, Ireland, Sweden, and beyond. One degree, a continent of opportunities." },
  { icon: "💶", tag: "Average Earnings", title: "Competitive Graduate Salaries", body: "Average monthly salaries in Cyprus range from €1,800 to €2,200 gross. The private sector — particularly finance, professional services, and tourism — typically offers higher rates than the public sector." },
];

const careerTags = [
  "Business & Management", "Finance & Banking", "Hospitality & Tourism", "Information Technology", "Cybersecurity",
  "Law & Legal Services", "Design & Creative Industries", "Digital Marketing", "International Business", "Real Estate & Property",
];

const support = [
  { icon: "🔍", title: "Free Eligibility Assessment", body: "We evaluate your academic profile, budget, and career goals to identify the best-fit programs in Cyprus — at zero cost to you." },
  { icon: "🎓", title: "Program Shortlisting", body: "Access to multiple programs across Cyprus's leading colleges. We match you with courses that align with your academic background and career goals." },
  { icon: "📝", title: "Application Assistance", body: "We prepare and submit your full college application — including document checking, offer letter follow-up, and all admission formalities." },
  { icon: "🛂", title: "Visa Documentation Support", body: "Complete guidance on apostilling documents, medical reports, bank statements, PCC, and couriering your visa file correctly first time." },
  { icon: "🏠", title: "Accommodation Guidance", body: "We help you find safe, affordable accommodation near your campus in Larnaca, Nicosia, Limassol, or Paphos — before you land." },
  { icon: "✈️", title: "Airport Pickup Coordination", body: "We coordinate your airport pickup on arrival in Cyprus so your first day is smooth, not stressful — straight from the airport to your new home." },
  { icon: "💼", title: "Part-Time Job Guidance", body: "We provide guidance on finding part-time employment opportunities in Cyprus permitted under student regulations — so you can support your studies financially." },
  { icon: "💬", title: "Dedicated Student Advisor", body: "One point of contact from application to arrival. Real people, real answers — not a call centre queue or an automated chatbot." },
];

const faqs = [
  { q: "How much does it cost to study in Cyprus as an international student?", a: "Foundation programs start at €5,500 per year (all fees included). Bachelor's programs are €6,500 in the first year with reduced fees from Year 2. Master's programs are €7,500 for the full 18-month course. Living costs average approximately €300 per month — making Cyprus one of the most affordable EU study destinations." },
  { q: "Can international students work while studying in Cyprus?", a: "Yes. International students can work part-time in Cyprus as permitted under student immigration regulations. The service sector — tourism, hospitality, retail and IT — offers the most student work opportunities." },
  { q: "What is the minimum IELTS score required to study in Cyprus?", a: "Cyprus accepts some of the lowest English proficiency scores in the EU. Foundation programs require IELTS 4.0–4.5 or PTE 43–57. Bachelor's programs require IELTS 5.0–6.0 depending on the course. Master's programs require IELTS 6.0–6.5. TOEFL is not accepted." },
  { q: "How long does the Cyprus student visa take?", a: "The Cyprus student visa (E-Visa) typically takes approximately 90 working days from the date your complete visa documents are submitted to the college. No visa interview is required at any stage." },
  { q: "Are study gaps and previously rejected visa cases accepted?", a: "Yes. Study gaps of any length and all ages are generally acceptable for Cyprus programs. Previously rejected visa cases may also apply in most circumstances, with two specific exception cases — contact our counsellors to confirm your eligibility." },
  { q: "What documents do I need for the Cyprus student visa?", a: "Key documents include: valid passport copy, academic certificates, English test result, medical report (including blood tests and chest X-ray — valid 4 months), bank balance letter and statement showing at least €7,000, and a Police Clearance Certificate (PCC). All originals must be apostilled and couriered to the college." },
  { q: "What are the most popular programs for Indian students in Cyprus?", a: "The most popular programs among Indian students in Cyprus are MBA, Business Administration, Accounting & Finance, Hospitality & Tourism Management, Computing & IT, and Law. All are taught entirely in English and carry EU recognition." },
  { q: "Is Cyprus safe for international students?", a: "Yes. Cyprus is ranked the 31st safest country in the world according to World Population Review 2026, with a low Global Terrorism Index score of 0.347. It is consistently rated safer than France and comparable to countries like Switzerland and Sweden." },
  { q: "Can I do a Foundation program and then continue to a degree in Cyprus?", a: "Yes. The 1-year Foundation (English Language) program is specifically designed as a pathway for students who don't yet meet direct bachelor's entry requirements, leading directly into a Bachelor's or Master's program." },
  { q: "When does the 2026 Cyprus intake start and when should I apply?", a: "The main October 2026 intake begins with induction in late September. A February/Spring intake is also available for select programs. We recommend beginning your application at least 4–5 months before your intended start date." },
];

/* ===================================================================
 *  MAIN
 * ================================================================ */
export default function StudyCyprusPage() {
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
                Study In <span className="text-[#1ab7ac]">Cyprus</span>
                <br />
                Europe's Modern
                <br />
                Student Destination.
              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
                EU-recognised qualifications. English-taught programs.
                Mediterranean lifestyle at some of Europe's most accessible
                tuition fees. Cyprus is the only EU island where the sea
                stays warm enough to swim in November — and one of the most
                affordable places in Europe to earn an internationally
                respected degree.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  "✓EU-Recognised Degrees",
                  "✓Tuition from €5,500/yr",
                  "✓No Visa Interview",
                  "✓#31 Safest Country Globally",
                  "✓300+ Sunny Days a Year",
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
                  Book Free Counselling →
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
                    src="images/cyp1.jpeg"
                    alt="Study in Cyprus"
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
              <BoardingStat value={300} suffix="+" label="Sunny Days / Year" sub="Mediterranean climate" delay={100} />
              <BoardingStat prefix="€" value={5500} label="From / Year" sub="Foundation tuition fee" delay={250} />
              <BoardingStat text="#31" label="Safest Country" sub="World Population Review 2026" delay={400} />
              <BoardingStat text="IELTS 4" label="Min. Accepted" sub="Foundation programs" delay={550} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <Marquee />

      {/* ---------------- WHY CYPRUS ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#429198" }}>Why Cyprus</span>}
            title={
              <span style={{ color: "#4197a2" }}>
                8 Reasons Students Are Choosing Cyprus in 2026
              </span>
            }
            sub={
              <span style={{ color: "#429198" }}>
                An EU member state with affordable fees, English-medium programs, and a Mediterranean lifestyle that no other European destination can match.
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
          ✨ Not sure if Cyprus is right for you? Let our experts assess your profile — free, no obligation.
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
            title="Cyprus — Quick Facts for International Students"
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
                <FactRow label="Location" value="Eastern Mediterranean · European Union Member State" />
                <FactRow label="Currency" value="Euro (€)" />
                <FactRow label="Language of Instruction" value="English (all programs available in English)" />
                <FactRow label="Main Student Cities" value="Larnaca · Nicosia · Limassol · Paphos" />
                <FactRow label="Foundation Program Fee" value="€5,500 (all-inclusive, visa processing included)" />
                <FactRow label="Bachelor's Tuition" value="€6,500 first year · reduced fees from Year 2" />
                <FactRow label="Master's Tuition" value="€7,500 (18 months, complete course fee)" />
                <FactRow label="Average Living Cost" value="~€300 / month (accommodation, food & essentials)" />
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(240,192,64,0.15)",
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <FactRow label="Average Graduate Salary" value="€1,800 – €2,200 / month (gross)" />
                <FactRow label="Intakes" value="October (main) · February / September (select programs)" />
                <FactRow label="Student Work Rights" value="Part-time work permitted per Cyprus immigration regulations" />
                <FactRow label="Safety Ranking" value="#31 Safest Country Globally (World Population Review 2026)" />
                <FactRow label="Climate" value="300–340 sunny days/year · Winter avg. 13–15°C · Summer avg. 30–36°C" />
                <FactRow label="Visa Type" value="Cyprus Student Residence Permit (E-Visa issued)" />
                <FactRow label="Visa Timeline" value="Approximately 90 working days after document submission" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- COSTS ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#429198" }}>Cost of Studying</span>}
            title={<span style={{ color: "#4197a2" }}>What Will It Actually Cost You?</span>}
            sub={
              <span style={{ color: "#429198" }}>
                Cyprus offers one of the best price-to-quality ratios in the EU. Here are realistic cost ranges for the 2026 intake — all fees include visa processing charges.
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
            <CostCard label="Foundation Program" amount="€5,500" note="1 year · visa processing included" delay={0} />
            <CostCard label="Bachelor's — Year 1" amount="€6,500" note="All-inclusive · reduced fees from Year 2" highlight delay={80} />
            <CostCard label="Master's Program" amount="€7,500" note="18 months · complete course fee" delay={160} />
            <CostCard label="Monthly Living" amount="~€300" note="Food, accommodation & miscellaneous" delay={240} />
            <CostCard label="On Arrival (once)" amount="€650" note="Medical, insurance & student card" delay={320} />
            <CostCard label="Bank Balance Required" amount="€7,000" note="Current/one-day balance for visa" delay={400} />
          </div>
        </div>
      </section>

      {/* ---------------- COURSES ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#429198" }}>Popular Programs for International Students</span>}
            title={
              <span style={{ color: "#4197a2" }}>
                In-Demand Courses Across Cyprus
              </span>
            }
            sub={
              <span style={{ color: "#429198" }}>
                From business to technology to law — Cyprus colleges offer career-focused, industry-aligned degrees taught entirely in English with strong employment outcomes.
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
            title="IELTS & PTE Score Guide for Cyprus"
            sub="Cyprus programs accept lower English scores than most EU destinations — making it accessible even if your IELTS result is not high. TOEFL is not accepted. Requirements vary by level and program — your counsellor will confirm exact requirements."
            light
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              {
                title: "Foundation Program",
                rows: [["IELTS", "4.0 – 4.5"], ["PTE Academic", "43 – 57"], ["Cambridge", "B1 Preliminary"], ["TOEFL", "Not Accepted"]],
                note: "💡 Ideal entry point if your English score is below direct bachelor's requirements. Leads to full degree pathways after one year.",
              },
              {
                title: "Bachelor's Programs",
                rows: [["IELTS (BBA & BHM)", "5.0 – 5.5"], ["IELTS (Other programs)", "5.5 – 6.0"], ["PTE Academic", "58"], ["Cambridge B2 First", "Grade C"], ["TOEFL", "Not Accepted"]],
                note: "💡 Also accepted: IB English, Cambridge IGCSE/GCSE, GCE A Levels, SAT EBRW 530, Michigan ECCE 52, and CEFR B1.",
              },
              {
                title: "Master's Programs",
                rows: [["IELTS (MBA / Hospitality)", "6.0"], ["IELTS (Other programs)", "6.5"], ["PTE Academic", "59"], ["Cambridge B2 First", "Grade C"], ["TOEFL", "Not Accepted"]],
                note: "⚠️ MBA applicants must also submit 2 reference letters confirming a minimum of 3 years professional/administrative experience.",
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
                      background: "rgba(240,192,64,0.08)",
                      border: "1px solid rgba(240,192,64,0.2)",
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

      {/* ---------------- VISA GUIDE ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#429198" }}>Student Visa</span>}
            title={
              <span style={{ color: "#4197a2" }}>
                Cyprus Student Visa — Step-by-Step Guide
              </span>
            }
            sub={
              <span style={{ color: "#429198" }}>
                The Cyprus student visa (E-Visa) process is straightforward. No visa interview required. Langma International guides you through every document and every step.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="lm-visa-wrap">
            <div>
              <VisaStep n={1} title="Submit Admission Documents" body="Send scanned copies of your education certificates, passport, and English test results. Your offer letter is issued within 2–3 working days." delay={0} />
              <VisaStep n={2} title="Receive Offer Letter & Pay Initial Deposit" body="Review and sign your offer letter. Pay the initial tuition deposit to secure your place. Deposit amount: €3,000–€4,000 (varies by program)." delay={80} />
              <VisaStep n={3} title="Prepare & Courier Visa Documents" body="Compile all required original and apostilled documents (see checklist). Courier the complete set to the college address as directed by your counsellor." delay={160} />
              <VisaStep n={4} title="Visa Processing Period" body="The Cyprus immigration authority processes the student visa in approximately 90 working days from the date of submission. No interview is required at any stage." delay={240} />
              <VisaStep n={5} title="Receive E-Visa & Travel" body="Once approved, you receive your E-Visa. Transfer the remaining tuition balance, book your flight, and travel to Cyprus to begin your studies." delay={320} />
              <VisaStep n={6} title="Arrive & Complete Registration" body="On arrival, pay €650 directly to the college for medical tests, insurance, and student card. Your Langma advisor provides full pre-departure and arrival guidance." isLast delay={400} />
            </div>
            <div style={{ position: "sticky", top: 100 }}>
              <DocsBox
                title="Visa Documents Checklist"
                items={visaDocs}
                note={
                  <>
                    <strong style={{ color: "#FFFFFF" }}>Processing Time:</strong> ~90 working days · No visa interview required
                    <br />
                    <br />
                    <strong style={{ color: "#FFFFFF" }}>Note:</strong> All ages, study gaps, and most previously rejected cases are accepted. Contact our counsellors to confirm eligibility for your profile.
                    <br />
                    <br />
                    Visa requirements may change according to immigration policies. Always confirm current requirements with your Langma counsellor.
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- WORK OPPORTUNITIES ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#429198" }}>Work Opportunities</span>}
            title={<span style={{ color: "#4197a2" }}>Work While You Study — and After</span>}
            sub={
              <span style={{ color: "#429198" }}>
                Cyprus's service-driven economy and EU membership create genuine work opportunities for international students both during and after their degree.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
            {workCards.map((w, i) => (
              <OutlookCard key={w.title} {...w} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CAREER OUTLOOK ---------------- */}
      <section
        style={{
          background: `linear-gradient(160deg, ${C.navyDark}, ${C.navyD})`,
          padding: "90px 48px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionHead
            tag="Career Outlook"
            title="Why Cyprus Graduates Get Hired"
            center
            light
            sub="Cyprus graduates are employable because their degrees are built around what the EU economy actually needs. With a GDP per capita of $42,413 and a services sector that accounts for 85% of national output, Cyprus produces graduates with direct industry exposure — particularly in finance, tourism, technology, and international business. As an EU member state, graduates can pursue careers across the entire European Union."
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
            tag="Why Langma International"
            title="Your Study Abroad Partner — Not Just an Agent"
            sub="From your first eligibility check to your first day on campus in Cyprus, we handle everything. No stress, no guesswork."
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
          <SectionHead tag={<span style={{ color: "#429198" }}>FAQs</span>} title="Frequently Asked Questions — Study in Cyprus" center />
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
              Your European Future Starts
              <br />
              <em className="lm-grd-text" style={{ fontStyle: "italic" }}>
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
              Seats for the October 2026 Cyprus intake are filling now. Get a free profile assessment from our Cyprus specialists and know exactly where you stand — today.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <NavyButton onClick={() => setOpen(true)} style={{ background: C.forest, padding: "16px 36px" }}>
                Book Free Counselling →
              </NavyButton>
              <GhostButton onClick={() => setOpen(true)}>Apply Now</GhostButton>
              <GhostButton onClick={() => setOpen(true)}>Talk to an Expert</GhostButton>
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