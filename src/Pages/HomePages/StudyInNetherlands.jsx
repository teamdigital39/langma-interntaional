import React, { useState, useEffect, useRef } from "react";
import PopupForm from "./PopupForm";

/**
 * Study in the Netherlands — Langma International
 * Colors & font exactly match the Poland JSX file
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
  // Semantic aliases
  teal: "#1AB7AC",
  tealDark: "#2E6466",
  tealDeep: "#006C70",
  tealSoft: "#E6F7F6",
  tealPale: "#F0FAFA",
};

/* ================================================================
 *  Hooks
 * ============================================================== */
function useReveal(threshold = 0.12) {
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

function useCountUp(target, duration = 1500, start = false) {
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

/* ================================================================
 *  Reveal wrapper
 * ============================================================== */
function Reveal({ children, delay = 0, y = 24, style }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ================================================================
 *  Scroll progress bar
 * ============================================================== */
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
        background: `linear-gradient(90deg, ${C.teal}, ${C.forest}, ${C.teal})`,
        zIndex: 300,
        transition: "width 0.1s linear",
      }}
    />
  );
}

/* ================================================================
 *  Marquee
 * ============================================================== */
function Marquee() {
  const items = [
    "🇳🇱 Netherlands September 2026 Intake Open",
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
        background: C.tealDark,
        color: C.white,
        padding: "14px 0",
        overflow: "hidden",
        borderTop: `1px solid rgba(255,255,255,0.15)`,
        borderBottom: `1px solid rgba(255,255,255,0.15)`,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 48,
          whiteSpace: "nowrap",
          animation: "nl-marquee 35s linear infinite",
        }}
      >
        {loop.map((t, i) => (
          <span
            key={i}
            style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.8px" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
 *  Section Head
 * ============================================================== */
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
        {/* pill tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            padding: "6px 14px 6px 8px",
            background: light ? "rgba(255,255,255,0.12)" : C.goldTint,
            border: `1px solid ${light ? "rgba(255,255,255,0.25)" : C.goldSoft}`,
            borderRadius: 999,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              background: light ? C.white : C.teal,
              borderRadius: "50%",
              boxShadow: `0 0 0 4px ${light ? "rgba(255,255,255,0.18)" : "rgba(26,183,172,0.15)"}`,
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: light ? C.white : "#429198",
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
            color: light ? C.white : "#4197a2",
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
              color: light ? "rgba(255,255,255,0.75)" : "#429198",
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

/* ================================================================
 *  Stat counter (hero)
 * ============================================================== */
function HeroStat({ prefix = "", value, suffix = "", label, sub, delay }) {
  const [ref, visible] = useReveal();
  const animated = useCountUp(value, 1400, visible);
  return (
    <div
      ref={ref}
      style={{
        flex: "1 1 0",
        minWidth: 130,
        padding: "22px 18px",
        borderRight: `1px solid rgba(255,255,255,0.1)`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <div
        style={{
          fontSize: "clamp(26px, 3vw, 38px)",
          fontWeight: 600,
          color: C.white,
          lineHeight: 1,
          display: "flex",
          alignItems: "baseline",
          gap: 2,
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7em" }}>{prefix}</span>
        {typeof value === "number" ? animated : value}
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7em" }}>{suffix}</span>
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        {label}
      </div>
      {sub && (
        <div style={{ marginTop: 3, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{sub}</div>
      )}
    </div>
  );
}

/* ================================================================
 *  Why / Reason Card
 * ============================================================== */
function ReasonCard({ num, icon, title, body, delay }) {
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
          border: `1px solid ${h ? C.teal : C.border}`,
          borderRadius: 18,
          transform: h ? "translateY(-6px)" : "translateY(0)",
          boxShadow: h ? `0 22px 40px -22px rgba(26,183,172,0.35)` : "none",
          transition: "all 0.35s cubic-bezier(.2,.7,.2,1)",
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
            transition: "opacity 0.3s",
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
              background: h ? C.teal : C.goldTint,
              color: h ? C.white : C.teal,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              transition: "all 0.3s",
              transform: h ? "rotate(-6deg) scale(1.05)" : "rotate(0)",
            }}
          >
            {icon}
          </div>
          <span
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: h ? C.teal : C.cream2,
              lineHeight: 1,
              transition: "color 0.3s",
            }}
          >
            {num}
          </span>
        </div>
        <h4
          style={{
            fontSize: 16.5,
            fontWeight: 700,
            color: "#0E2A2A",
            marginBottom: 10,
            lineHeight: 1.35,
          }}
        >
          {title}
        </h4>
        <p style={{ fontSize: 13.5, color: C.slate, lineHeight: 1.75, margin: 0 }}>{body}</p>
      </div>
    </Reveal>
  );
}

/* ================================================================
 *  Fact Row
 * ============================================================== */
function FactRow({ label, value }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? "rgba(255,255,255,0.08)" : "transparent",
        padding: "18px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        transition: "background 0.2s",
      }}
    >
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "rgba(255,255,255,0.6)",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13.5,
          fontWeight: 600,
          color: C.white,
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}

/* ================================================================
 *  Cost Card
 * ============================================================== */
function CostCard({ label, amount, note, detail, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: h ? C.goldTint : C.white,
          padding: "32px 22px",
          textAlign: "center",
          border: `1px solid ${h ? C.teal : C.border}`,
          borderRadius: 16,
          transform: h ? "translateY(-4px)" : "translateY(0)",
          boxShadow: h ? `0 16px 32px -16px rgba(26,183,172,0.25)` : "none",
          transition: "all 0.3s cubic-bezier(.2,.7,.2,1)",
          height: "100%",
        }}
      >
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
            color: "#0E2A2A",
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          {amount}
        </div>
        <p style={{ fontSize: 12, color: C.slate, marginBottom: 0 }}>{note}</p>
        {detail && (
          <p
            style={{
              fontSize: 12,
              color: C.muted,
              marginTop: 10,
              paddingTop: 10,
              borderTop: `1px solid ${C.border}`,
              lineHeight: 1.6,
              textAlign: "left",
            }}
          >
            {detail}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/* ================================================================
 *  Payment Step
 * ============================================================== */
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
          borderRadius: 14,
          border: `1px solid ${h ? C.teal : C.border}`,
          transition: "all 0.25s",
          height: "100%",
        }}
      >
        {!isLast && (
          <div
            className="pay-arrow"
            style={{
              position: "absolute",
              right: -14,
              top: "50%",
              transform: "translateY(-50%)",
              width: 28,
              height: 28,
              background: C.teal,
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
            fontSize: 36,
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
            fontSize: 13,
            fontWeight: 700,
            color: "#0E2A2A",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 6,
          }}
        >
          {title}
        </h4>
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: C.teal,
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

/* ================================================================
 *  Course Card
 * ============================================================== */
function CourseCard({ num, icon, title, body, tag, delay }) {
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
          boxShadow: h ? `0 22px 40px -20px rgba(26,183,172,0.4)` : "none",
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
            background: h ? "rgba(255,255,255,0.15)" : C.goldTint,
            color: h ? C.white : C.teal,
            fontSize: icon ? 18 : 13,
            fontWeight: 700,
            borderRadius: 10,
            marginBottom: 14,
            transition: "all 0.3s",
          }}
        >
          {icon || num}
        </div>
        <div
          style={{
            fontSize: 14.5,
            fontWeight: 700,
            color: h ? C.white : "#0E2A2A",
            marginBottom: 8,
            lineHeight: 1.35,
            transition: "color 0.3s",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 12.5,
            color: h ? "rgba(255,255,255,0.78)" : C.slate,
            lineHeight: 1.7,
            marginBottom: 12,
            transition: "color 0.3s",
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
              transition: "all 0.3s",
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
            color: h ? C.white : "transparent",
            fontSize: 18,
            transition: "all 0.3s",
            transform: h ? "translateX(0)" : "translateX(-8px)",
          }}
        >
          →
        </div>
      </div>
    </Reveal>
  );
}

/* ================================================================
 *  Lang Card
 * ============================================================== */
function LangCard({ badge, title, rows, note, delay }) {
  return (
    <Reveal delay={delay}>
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderTop: `2px solid rgba(255,255,255,0.35)`,
          padding: 36,
          borderRadius: 20,
          backdropFilter: "blur(8px)",
          height: "100%",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: C.white,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            padding: "3px 12px",
            borderRadius: 999,
            marginBottom: 16,
          }}
        >
          {badge}
        </span>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: C.white,
            marginBottom: 22,
            paddingBottom: 16,
            borderBottom: "2px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {title}
        </h3>
        {rows.map(([test, score], i) => (
          <div
            key={test}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "13px 0",
              borderBottom:
                i === rows.length - 1 ? "none" : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(255,255,255,0.82)",
              }}
            >
              {test}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: C.white,
                padding: "4px 12px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 999,
              }}
            >
              {score}
            </span>
          </div>
        ))}
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "16px 18px",
            marginTop: 22,
            fontSize: 12.5,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7,
            borderRadius: 12,
          }}
        >
          {note}
        </div>
      </div>
    </Reveal>
  );
}

/* ================================================================
 *  Visa Step
 * ============================================================== */
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
            background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`,
            color: C.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 700,
            flexShrink: 0,
            borderRadius: "50%",
            boxShadow: `0 6px 14px -4px rgba(26,183,172,0.4)`,
          }}
        >
          {n}
        </div>
        {!isLast && (
          <div
            style={{
              width: 2,
              flex: 1,
              background: `linear-gradient(180deg, ${C.teal}, transparent)`,
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
            color: "#0E2A2A",
            margin: 0,
            marginBottom: 8,
          }}
        >
          {title}
        </h4>
        <p style={{ fontSize: 13.5, color: C.slate, lineHeight: 1.75, margin: 0 }}>{body}</p>
        {fee && (
          <span
            style={{
              display: "inline-block",
              background: C.goldTint,
              color: C.tealDark,
              fontSize: 12,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 999,
              marginTop: 8,
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

/* ================================================================
 *  Diff / Life Card (white bg with hover)
 * ============================================================== */
function OutlookCard({ icon, tag, title, body, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: C.white,
          padding: "30px 26px",
          borderRadius: 18,
          border: `1px solid ${h ? C.teal : C.border}`,
          transition: "all 0.3s",
          transform: h ? "translateY(-4px)" : "translateY(0)",
          boxShadow: h ? `0 16px 32px -16px rgba(26,183,172,0.25)` : "none",
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
            color: C.teal,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            marginBottom: 18,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            display: "inline-block",
            background: C.cream,
            color: C.tealDark,
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
            color: "#0E2A2A",
            marginBottom: 10,
            lineHeight: 1.4,
          }}
        >
          {title}
        </h4>
        <p style={{ fontSize: 13.5, color: C.slate, lineHeight: 1.75, margin: 0 }}>{body}</p>
      </div>
    </Reveal>
  );
}

/* ================================================================
 *  Support Card (dark bg)
 * ============================================================== */
function SupportCard({ icon, title, body, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: h ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
          padding: "32px 28px",
          border: `1px solid ${h ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.06)"}`,
          borderRadius: 18,
          transition: "all 0.3s",
          height: "100%",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: h ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
            color: C.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            marginBottom: 18,
            transition: "all 0.3s",
            transform: h ? "rotate(-6deg)" : "rotate(0)",
          }}
        >
          {icon}
        </div>
        <h4
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: C.white,
            marginBottom: 8,
          }}
        >
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

/* ================================================================
 *  Testimonial Card
 * ============================================================== */
function TestiCard({ quote, name, meta, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: h ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${h ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
          padding: 32,
          borderRadius: 18,
          borderTop: "2px solid rgba(255,255,255,0.25)",
          transition: "all 0.3s",
          height: "100%",
        }}
      >
        <div
          style={{ color: C.white, fontSize: 14, marginBottom: 16, letterSpacing: 2 }}
        >
          ★★★★★
        </div>
        <p
          style={{
            fontSize: 16,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.65,
            marginBottom: 20,
          }}
        >
          {quote}
        </p>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: C.white,
            margin: 0,
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.45)",
            marginTop: 3,
            margin: "3px 0 0 0",
          }}
        >
          {meta}
        </p>
      </div>
    </Reveal>
  );
}

/* ================================================================
 *  FAQ Item
 * ============================================================== */
function FAQItem({ q, a, isOpen, onClick }) {
  const ref = useRef(null);
  return (
    <div
      style={{
        borderBottom: `1px solid ${C.border}`,
        background: isOpen ? C.white : "transparent",
        transition: "background 0.3s",
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
          color: isOpen ? C.teal : "#0E2A2A",
          transition: "color 0.2s",
        }}
      >
        {q}
        <span
          style={{
            width: 30,
            height: 30,
            background: isOpen ? C.teal : C.goldTint,
            color: isOpen ? C.white : C.teal,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            flexShrink: 0,
            transition: "all 0.3s",
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
        <p
          style={{
            fontSize: 14,
            color: C.slate,
            lineHeight: 1.85,
            margin: 0,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
 *  DATA
 * ============================================================== */
const whyReasons = [
  { icon: "🗣️", title: "World-Class English Education", body: "The Netherlands ranks #1 globally in non-native English proficiency. Every degree programme is delivered entirely in English — no language barrier, no compromise on quality. You study, present, and network in the same language the global business world operates in." },
  { icon: "🏢", title: "Multinational Career Access", body: "Home to the European headquarters of Tesla, Netflix, Uber, KPMG, ING, Booking.com, and dozens of Fortune 500 companies. ASML — the second most valuable company in Europe — is headquartered here. Your degree places you at the centre of global commerce, not the periphery." },
  { icon: "🎯", title: "Practical, Industry-Led Learning", body: "Over 60% of education time is spent on real-world projects, internships, and practical assignments — building skills employers actually want. A mandatory paid internship is built into every programme, giving you professional experience alongside your degree." },
  { icon: "🚀", title: "Thriving Startup Ecosystem", body: "The Netherlands has one of Europe's fastest-growing startup scenes. Amsterdam's Brainport and thriving tech corridors connect students directly with entrepreneurs, investors, and emerging ventures. Study here and build your career inside a culture that turns ideas into businesses." },
  { icon: "🛡️", title: "Safe, Happy & Stable", body: "Consistently ranked among the world's happiest and safest countries. A stable, welcoming, multicultural society with a high quality of life — for international students and their families. Dutch cities are clean, efficient, affordable, and genuinely built for people." },
  { icon: "🌿", title: "Sustainability Leader", body: "A global pioneer in sustainability, circular economy, and green innovation. The Netherlands integrates renewable energy, responsible business, and agri-tech into its national identity — and into its education. Study in a country that is actively shaping tomorrow's world." },
  { icon: "🗺️", title: "Gateway to All of Europe", body: "Amsterdam's Schiphol Airport connects to over 300 destinations worldwide. In a weekend you could be in Paris, London, Berlin, or Barcelona — all within a 2-hour flight. The Netherlands is not just a country; it is a launchpad for exploring an entire continent." },
  { icon: "✈️", title: "Post-Study Work Visa Available", body: "The Dutch Orientation Year Visa (Zoekjaar permit) allows graduates to stay and find work in the Netherlands for up to one year after completing their degree. With a 50% internship-to-job conversion rate, many students secure employment well before graduation day." },
];

const quickFacts = [
  ["Location", "Western Europe · Heart of the EU · Schengen Zone"],
  ["Capital City", "Amsterdam — Education & Business Hub"],
  ["Currency", "Euro (€)"],
  ["Language of Instruction", "English — #1 Globally in Non-Native Proficiency"],
  ["International Students", "160+ Nationalities Represented on Campus"],
  ["Available Intakes", "September · January"],
  ["Foundation Programme Fee", "€12,250 per year (all-inclusive)"],
  ["Bachelor's Tuition", "€24,500 per year (same fee for all students)"],
  ["Master's / MBA Tuition", "€25,500 per year"],
  ["Application Fee", "€95 (one-time, non-refundable)"],
  ["Initial Package Fee (Non-EU/EEA)", "€6,050 — visa + insurance + airport pickup"],
  ["Average Monthly Living Cost", "€800 – €1,200 per month"],
  ["Part-Time Work Rights", "Up to 16 hours per week during term time"],
  ["Internship", "Mandatory full-time paid internship — included in programme"],
  ["Post-Study Work Option", "Dutch Orientation Year Visa — up to 1 year"],
  ["Internship-to-Job Rate", "50% of interns receive a job offer from their employer"],
];

const courses = [
  { icon: "🌐", title: "International Business Management", body: "Entrepreneurship, global markets, finance, and marketing combined. Rated the top programme for over 11 consecutive years. The most popular choice for internationally ambitious students.", tag: "Bachelor's · MBA" },
  { icon: "🎨", title: "Creative Business", body: "Design thinking, media strategy, branding, and commercial creativity — built for careers in the creative economy. Connect artistic thinking with real business outcomes.", tag: "Bachelor's" },
  { icon: "💻", title: "Digital Business & Generative AI", body: "Data strategy, AI applications, and digital transformation for tomorrow's business leaders. One of the most forward-looking programmes in Europe.", tag: "Bachelor's · MBA" },
  { icon: "🏨", title: "Hotel & Event Management", body: "Luxury hospitality management, event strategy, and festival production — studied in one of Europe's busiest tourism and conference capitals.", tag: "Bachelor's" },
  { icon: "✈️", title: "International Tourism Management", body: "Experience travel, luxury management, and festival specialisations with direct industry exposure. Develop expertise in a globally-driven sector.", tag: "Bachelor's" },
  { icon: "🚀", title: "Entrepreneurship", body: "Launch your own venture — guided by active entrepreneurs and connected directly to Amsterdam's thriving startup scene. Investor access included.", tag: "Bachelor's · MBA" },
  { icon: "📣", title: "Influencer Marketing", body: "Digital influence, content strategy, creator economics, and modern brand communications built for the social economy. A dedicated degree pathway.", tag: "Bachelor's" },
  { icon: "📊", title: "Commerce, Economics & Entrepreneurship", body: "Commercial strategy, economic fundamentals, and entrepreneurial leadership combined in a rigorous three-discipline degree.", tag: "Bachelor's" },
  { icon: "🏆", title: "MBA — Master of Business Administration", body: "1-year intensive MBA with specialisations in Data Strategy, Real Estate, Hospitality Management & Global Leadership.", tag: "Master's · 1 Year" },
];

const langCards = [
  {
    badge: "Entry Level",
    title: "🎓 Foundation Programme",
    rows: [["IELTS Academic", "5.0 – 5.5"], ["TOEFL iBT", "35 – 45 pts"], ["PTE Academic", "36 – 42"], ["Cambridge", "160 – 170"]],
    note: "💡 The Foundation Programme (6–12 months) is a structured bridge for students who don't yet meet direct entry requirements. Successful completion guarantees direct Bachelor's entry — no re-application required.",
  },
  {
    badge: "Undergraduate",
    title: "📚 Bachelor's Programmes",
    rows: [["IELTS Academic", "6.0 overall"], ["TOEFL iBT", "80 points"], ["PTE Academic", "61 points"], ["Cambridge", "160 minimum"]],
    note: "⚠️ Minimum academic requirement: equivalent to Higher General Secondary Education, Pre-University, IB Diploma, A-levels, BTEC Level 3, or Class 12th.",
  },
  {
    badge: "Postgraduate",
    title: "📖 Master's / MBA",
    rows: [["IELTS Academic", "6.5 overall"], ["TOEFL iBT", "90 points"], ["PTE Academic", "64 points"], ["Cambridge", "180 minimum"]],
    note: "⚠️ A recognised Bachelor's degree is required for Master's / MBA entry. English and academic requirements may vary by specific programme. Contact Langma International to confirm your eligibility.",
  },
];

const visaSteps = [
  { title: "Choose Programme & Apply Online", body: "Select your programme level and preferred intake. Submit your initial application through the official admissions portal along with your basic supporting documents for initial review." },
  { title: "Receive Conditional Offer Letter", body: "Your application is reviewed by the admissions team. A conditional offer letter is issued pending receipt of full documentation and completion of the credibility interview stage." },
  { title: "Pay Application Fee & Credibility Interview", body: "Pay the application fee and complete a credibility interview. Langma International prepares you fully with mock sessions and guidance.", fee: "€95 — Application Fee" },
  { title: "Receive Unconditional Offer Letter", body: "Upon successfully passing the credibility interview and completing full document verification, an unconditional offer letter is issued confirming your place." },
  { title: "Pay Initial Package Deposit", body: "The non-EU/EEA package fee is paid to confirm your acceptance. This covers IND visa processing, health insurance, and airport pickup on arrival.", fee: "€6,050 — Initial Package Fee" },
  { title: "Visa Applied via IND / Dutch Ministry", body: "The institution applies for your student visa through the IND (Dutch Immigration and Naturalisation Service) directly on your behalf. You do not approach the embassy independently." },
  { title: "VFS Biometric Registration & Visa Stamping", body: "Visit your nearest VFS Global centre for biometric data registration. Receive your visa stamping in your passport and prepare all pre-departure documents." },
  { title: "Pay Balance & Travel to the Netherlands", body: "Balance payment of €8,000 is due after visa approval. The remaining tuition is paid in 12 equal monthly instalments. Airport pickup is arranged — your new life begins.", fee: "€8,000 due · Remainder in 12 monthly instalments" },
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

const careerOutlooks = [
  { icon: "💼", tag: "During Studies", title: "16 hrs/Week Part-Time Work Rights", body: "International students can work up to 16 hours per week during term time — a meaningful income stream that offsets living costs in Amsterdam alongside your studies." },
  { icon: "🎓", tag: "Internship", title: "Mandatory Paid Internship in Every Programme", body: "A full-time paid internship is built into every degree. With a 50% internship-to-employment conversion rate, many students receive job offers from their placement employer before graduation." },
  { icon: "🌍", tag: "Post-Study", title: "Dutch Orientation Year Visa — Up to 1 Year", body: "The Zoekjaar permit allows international graduates to remain in the Netherlands for up to a year after completing their degree, specifically to search for suitable employment." },
  { icon: "🏢", tag: "Employers", title: "100+ Companies at the Annual Career Fair", body: "Fortune 500 employers including Tesla, Netflix, KPMG, Booking.com, ASML, and Unilever actively recruit from campus every year — your career network starts Day 1." },
];

const supportCards = [
  { icon: "🔍", title: "Free Profile Evaluation", body: "We assess your academic background and English profile honestly and thoroughly — then tell you exactly which programmes you qualify for, before you commit to anything." },
  { icon: "🎯", title: "Personalised Programme Matching", body: "We match you to the right course, the right level, and the right intake based on your academic history, career ambitions, and long-term goals. Not a one-size-fits-all shortlist." },
  { icon: "📝", title: "SOP & Application Support", body: "We guide your Statement of Purpose from concept to final draft, prepare your complete application package, and review every document for accuracy before submission." },
  { icon: "🎤", title: "Credibility Interview Preparation", body: "Full structured preparation for the admissions credibility interview — including mock sessions, likely question sets, and practical confidence-building support." },
  { icon: "🛂", title: "Visa Documentation Support", body: "Complete, precise guidance on IND application requirements, financial sponsorship documentation, biometric appointment scheduling, and visa stamp collection." },
  { icon: "🏠", title: "Accommodation Confirmation", body: "We confirm your guaranteed student housing arrangements near campus in Amsterdam before you depart — so you arrive knowing exactly where you're going." },
  { icon: "✈️", title: "Pre-Departure Briefing", body: "Comprehensive travel preparation — what to bring, customs guidance, accommodation check-in instructions, orientation week overview, and everything you need to land confidently." },
  { icon: "💬", title: "Dedicated Student Advisor", body: "One real person, available throughout your entire journey from first enquiry to first week of class. No automated responses. No queues. Honest expert guidance whenever you need it." },
];

const testimonials = [
  { quote: "I had a gap of two years and was nervous no institution would accept me. Langma assessed my profile honestly and matched me to the right programme. I'm now completing my Bachelor's in International Business Management and have already secured a paid internship with a logistics firm in Rotterdam.", name: "Priya Mehta", meta: "International Business Management · New Delhi, India" },
  { quote: "The credibility interview preparation Langma provided was exceptional. I went in feeling completely ready. Within three months of submitting my documents I had my visa, my housing confirmed, and my flight booked. The process felt smooth and professional from start to finish.", name: "Ahmed Al-Rashidi", meta: "Digital Business & AI · Dubai, UAE" },
  { quote: "As someone coming from Bangladesh, I was worried about the additional sponsorship requirements. Langma walked me through exactly what documentation I needed and supported every step. I'm now in my second year of the MBA programme and interning at a Dutch fintech company.", name: "Farhan Hossain", meta: "MBA — Data Strategy · Dhaka, Bangladesh" },
];

const faqs = [
  { q: "Can I study in the Netherlands without IELTS?", a: "IELTS Academic is the most commonly accepted English test, but TOEFL iBT, PTE Academic, and Cambridge English qualifications are all accepted alternatives. Foundation entry requires IELTS 5.0–5.5 (or equivalent: TOEFL iBT 35–45, PTE 36–42, Cambridge 160–170). Direct Bachelor's entry requires IELTS 6.0 (TOEFL 80, PTE 61, Cambridge 160 minimum). Master's and MBA entry requires IELTS 6.5 (TOEFL 90, PTE 64, Cambridge 180 minimum). Students who don't meet direct Bachelor's requirements can begin with the Foundation Programme and progress automatically upon successful completion." },
  { q: "How much does it cost to study in the Netherlands?", a: "Foundation programmes are €12,250 per year (all-inclusive with projects and study trips). Bachelor's tuition is €24,500 per year — the same fee applies to all students. Master's and MBA tuition is €25,500 per year. Non-EU/EEA students pay an initial package fee of €6,050 covering visa processing through IND, health insurance, and airport pickup. The application fee is €95 (one-time, non-refundable). Monthly living costs range from €800 to €1,200. After visa approval, €8,000 is due, with the remaining balance paid in 12 equal monthly instalments throughout the academic year." },
  { q: "Can international students work part-time in the Netherlands?", a: "Yes. International students from outside the EU/EEA can work up to 16 hours per week during the academic term. This provides meaningful income to support day-to-day living costs. Additionally, every programme includes a mandatory full-time paid internship as a core curriculum component — with 50% of internship students receiving a direct job offer from their placement employer." },
  { q: "What is the Dutch Orientation Year Visa?", a: "The Dutch Orientation Year Visa (Zoekjaar permit) allows international graduates to remain in the Netherlands for up to one year after completing their degree specifically to search for suitable employment. Combined with the 50% internship-to-employment conversion rate, this makes the Netherlands one of the most career-accessible study destinations in Europe." },
  { q: "What is the visa process for international students?", a: "The student visa is applied for through the institution directly via the IND (Dutch Immigration and Naturalisation Service) — you do not approach the Dutch embassy independently. The 8-step process involves: applying online, receiving a conditional offer, completing a credibility interview (€95 fee), receiving an unconditional offer, paying the €6,050 initial package fee, the institution submitting your IND application, visiting VFS for biometrics and visa stamping, and then travelling. A balance of €8,000 is due after visa approval. Langma International guides the complete process." },
  { q: "Are study gaps or age restrictions an issue?", a: "Study gaps and all ages are accepted. Applications are assessed on your current academic profile, English proficiency level, and programme suitability — not penalised for time gaps or age. This is a significant advantage for mature applicants, career changers, and those who took time away from education." },
  { q: "What programmes are available and how long do they take?", a: "Programmes span three levels: Foundation (6–12 months), Bachelor's (3-year fast-track or 4-year standard), and Master's / MBA (1-year intensive). Key Bachelor's study areas include International Business Management, Creative Business, Digital Business & Generative AI, Hotel & Event Management, International Tourism Management, Entrepreneurship, Influencer Marketing, and Commerce & Economics. All programmes are delivered entirely in English." },
  { q: "Is the Netherlands safe for international students?", a: "The Netherlands is consistently ranked among the world's safest, happiest, and most politically stable countries. It has a genuinely multicultural, English-speaking society with a long history of welcoming international students. Cities including Amsterdam, Rotterdam, and Utrecht all have large, well-established international student communities and excellent public safety records." },
  { q: "What career opportunities exist after graduating?", a: "The Netherlands is home to European headquarters of Tesla, Netflix, Uber, KPMG, ING, Philips, ASML, Heineken, Booking.com, Unilever, and Shell. Graduates access careers in investment banking, business consulting, digital marketing, data strategy, AI and technology, hospitality management, logistics, sustainability, and entrepreneurship. The Dutch Orientation Year Visa provides up to a year post-graduation to find your ideal role." },
  { q: "When should I apply for September 2026 intake?", a: "We strongly recommend starting your application at least 4 to 5 months before your intended start date. For the September 2026 intake, beginning the process by April or May 2026 is advisable — this allows adequate time for document preparation, SOP drafting, credibility interview scheduling, IND visa processing, and VFS biometric appointments." },
];

/* ================================================================
 *  MAIN
 * ============================================================== */
export default function StudyNetherlandsPage() {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        color: "#0E2A2A",
        background: C.cream,
        lineHeight: 1.6,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
       
        a { text-decoration: none; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${C.teal}; color: #fff; }

        @keyframes nl-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes nl-bg-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes nl-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes nl-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes nl-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.4); opacity: 0; }
        }

        /* ── Responsive nav ── */
        .nl-nav-links { display: flex; gap: 28px; }
        .nl-nav-cta { display: block; }

        /* ── Hero grid ── */
        .nl-hero-grid { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 48px; }

        /* ── Stats bar ── */
        .nl-stats-bar { display: flex; flex-wrap: wrap; }

        /* ── 2-col fact grid ── */
        .nl-fact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }

        /* ── Visa grid ── */
        .nl-visa-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }

        /* ── Admission grid ── */
        .nl-admission-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }

        /* ── Apply steps ── */
        .nl-apply-steps { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0; background: rgba(255,255,255,0.06); border-radius: 18px; overflow: hidden; }
        .nl-apply-step { border-right: 1px solid rgba(255,255,255,0.1); }
        .nl-apply-steps > div:last-child .nl-apply-step { border-right: none; }

        /* ── Pay timeline ── */
        .nl-pay-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

        /* ── Footer ── */
        .nl-footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 40px; }

        @media (max-width: 1100px) {
          .nl-apply-steps { grid-template-columns: repeat(4, 1fr); }
          .nl-apply-steps > div:nth-child(4n) .nl-apply-step { border-right: none; }
          .nl-apply-steps > div:nth-child(n+5) .nl-apply-step { border-top: 1px solid rgba(255,255,255,0.1); }
        }

        @media (max-width: 900px) {
          .nl-nav-links { display: none; }
          .nl-hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .nl-hero-image { display: none; }
          .nl-fact-grid { grid-template-columns: 1fr; }
          .nl-visa-grid { grid-template-columns: 1fr; }
          .nl-admission-grid { grid-template-columns: 1fr; }
          .nl-apply-steps { grid-template-columns: repeat(2, 1fr); }
          .nl-apply-steps > div:nth-child(2n) .nl-apply-step { border-right: none; }
          .nl-apply-steps > div:nth-child(n+3) .nl-apply-step { border-top: 1px solid rgba(255,255,255,0.1); }
          .nl-pay-grid { grid-template-columns: repeat(2, 1fr); }
          .nl-footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
          .pay-arrow { display: none !important; }
        }

        @media (max-width: 600px) {
          .nl-section { padding: 64px 20px !important; }
          .nl-hero { padding: 60px 20px !important; }
          .nl-apply-steps { grid-template-columns: 1fr; }
          .nl-apply-step { border-right: none !important; border-top: 1px solid rgba(255,255,255,0.1) !important; }
          .nl-apply-steps > div:first-child .nl-apply-step { border-top: none !important; }
          .nl-pay-grid { grid-template-columns: 1fr; }
          .nl-footer-grid { grid-template-columns: 1fr; }
          .nl-stats-bar > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .nl-hero-pills { flex-direction: column; }
          .nl-hero-btns { flex-direction: column; }
          .nl-cta-strip { flex-direction: column !important; text-align: center; padding: 20px !important; }
        }
      `}</style>

      <ScrollProgress />

      {/* ── HERO ── */}
      <section
        className="nl-hero"
        style={{
          background: `linear-gradient(135deg, ${C.tealDark} 0%, ${C.teal} 60%, #3DCEC5 100%)`,
          backgroundSize: "200% 200%",
          animation: "nl-bg-shift 18s ease infinite",
          padding: "80px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* glow blobs */}
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 380, height: 380, background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)`, filter: "blur(20px)", animation: "nl-float 10s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "10%", width: 300, height: 300, background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`, filter: "blur(30px)", animation: "nl-float 13s ease-in-out infinite reverse", pointerEvents: "none" }} />

        <div className="nl-hero-grid" style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* LEFT */}
          <div>
            <Reveal>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 28,
                  padding: "6px 18px 6px 8px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 999,
                }}
              >
                <span style={{ fontSize: 22 }}>🇳🇱</span>
                <span
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    width: 8,
                    height: 8,
                  }}
                >
                  <span style={{ position: "absolute", inset: 0, background: C.white, borderRadius: "50%", animation: "nl-pulse 2s ease-out infinite" }} />
                  <span style={{ position: "relative", width: 8, height: 8, background: C.white, borderRadius: "50%" }} />
                </span>
                <span style={{ color: C.white, fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
                  Europe's Innovation Hub · September 2026 Intake Open
                </span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h1
                style={{
                  color: C.white,
                  fontSize: "clamp(36px, 5vw, 68px)",
                  lineHeight: 1.06,
                  marginBottom: 22,
                  fontWeight: 600,
                  letterSpacing: "-1px",
                }}
              >
                Study in<br />
                <span style={{ color: C.goldSoft, fontStyle: "italic" }}>the Netherlands</span>
                <br />
                Where Global<br />
                Careers Begin
              </h1>
            </Reveal>

            <Reveal delay={240}>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, fontWeight: 300, lineHeight: 1.85, marginBottom: 10, maxWidth: 520 }}>
                English-taught degrees. Paid internships. Fortune 500 employers. Europe's most practical business education — in one of the world's most liveable countries.
              </p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.9, marginBottom: 36, maxWidth: 500 }}>
                The Netherlands ranks #1 globally in English proficiency, sits at the heart of Europe's economic engine, and is home to some of the world's most ambitious international students. A mandatory paid internship is built into every programme, plus a post-study orientation visa allowing you to stay and work for up to a year.
              </p>
            </Reveal>

            <Reveal delay={360}>
              <div className="nl-hero-pills" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
                {["🌍 160+ Nationalities", "💼 Paid Internship Included", "📋 Post-Study Visa", "🎓 No Exams — Assignment-Based", "🏠 Guaranteed Housing"].map((p) => (
                  <span key={p} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 500, padding: "7px 16px", borderRadius: 999 }}>
                    {p}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={460}>
              <div className="nl-hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
                <button
                  onClick={() => setOpen(true)}
                  style={{ background: C.tealDeep, color: C.white, border: "none", padding: "15px 32px", fontSize: 14.5, fontWeight: 700, cursor: "pointer", borderRadius: 999, letterSpacing: "0.3px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 14px 30px rgba(0,0,0,0.2)"; }}
                  onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
                >
                  Book Free Counselling →
                </button>
                <button
                  onClick={() => setOpen(true)}
                  style={{ background: "rgba(255,255,255,0.12)", color: C.white, border: "1px solid rgba(255,255,255,0.3)", padding: "14px 28px", fontSize: 14.5, fontWeight: 600, cursor: "pointer", borderRadius: 999, transition: "all 0.25s" }}
                  onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.2)"; }}
                  onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.12)"; }}
                >
                  Check My Eligibility
                </button>
              </div>
            </Reveal>

            <Reveal delay={580}>
              <div
                className="nl-stats-bar"
                style={{
                  background: "rgba(0,0,0,0.15)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 18,
                  backdropFilter: "blur(8px)",
                  overflow: "hidden",
                }}
              >
                <HeroStat value="#1" suffix="" label="English Proficiency" sub="Global ranking" delay={100} />
                <HeroStat value={160} suffix="+" label="Nationalities" sub="On campus" delay={220} />
                <HeroStat value={50} suffix="%" label="Internship-to-Job" sub="Conversion rate" delay={340} />
                <HeroStat value="#11" suffix="" label="Global GDP" sub="Netherlands ranking" delay={460} />
              </div>
            </Reveal>
          </div>

          {/* RIGHT IMAGE */}
          <div className="nl-hero-image" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 200, height: 500, background: "rgba(255,255,255,0.08)", borderRadius: 24 }} />
            <div style={{ position: "relative", zIndex: 1, width: 460, height: 460, borderRadius: "50%", overflow: "hidden", border: "4px solid rgba(255,255,255,0.25)" }}>
              <img src="/images/wd.png" alt="Study in Netherlands" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── WHY NETHERLANDS ── */}
      <section id="why" className="nl-section" style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Why the Netherlands"
            title="8 Reasons the Netherlands Stands Apart"
            sub="More than 160 nationalities. Europe's top English-proficiency ranking. A job market stacked with global multinationals. Here's why thousands of students choose the Netherlands every year."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {whyReasons.map((r, i) => (
              <ReasonCard key={r.title} num={String(i + 1).padStart(2, "0")} icon={r.icon} title={r.title} body={r.body} delay={i * 70} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <div
        className="nl-cta-strip"
        style={{
          background: `linear-gradient(90deg, ${C.teal}, ${C.tealDark})`,
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
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)", backgroundSize: "200% 100%", animation: "nl-shimmer 6s linear infinite" }} />
        <p style={{ color: C.white, fontSize: 15.5, fontWeight: 600, margin: 0, position: "relative", zIndex: 2 }}>
          ✨ September 2026 intake is now open. Our advisors can assess your profile today — free, with no obligation.
        </p>
        <button
          onClick={() => setOpen(true)}
          style={{ background: C.white, color: C.teal, border: "none", padding: "12px 28px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", borderRadius: 999, transition: "all 0.25s", position: "relative", zIndex: 2 }}
          onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
        >
          Get Free Eligibility Check →
        </button>
      </div>

      {/* ── QUICK FACTS ── */}
      <section className="nl-section" style={{ background: `linear-gradient(135deg, ${C.tealDark}, ${C.teal})`, padding: "100px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)", filter: "blur(20px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead tag="At a Glance" title="Netherlands — Quick Facts for International Students" sub="Essential information to help you plan your study journey with confidence and clarity." light />
          <Reveal>
            <div className="nl-fact-grid" style={{ gap: 2 }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, overflow: "hidden" }}>
                {quickFacts.slice(0, 8).map(([l, v]) => <FactRow key={l} label={l} value={v} />)}
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, overflow: "hidden" }}>
                {quickFacts.slice(8).map(([l, v]) => <FactRow key={l} label={l} value={v} />)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── COSTS ── */}
      <section id="costs" className="nl-section" style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag="Cost of Studying" title="Study Investment — Netherlands 2026" sub="Transparent, all-in pricing. No hidden charges. The same fee structure applies to every international student regardless of nationality." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18 }}>
            <CostCard label="Foundation Programme" amount="€12,250" note="Per year · All-inclusive" detail="Projects & study trips included. Duration: 6–12 months. Pathway to direct Bachelor's entry upon successful completion." delay={0} />
            <CostCard label="Bachelor's Tuition" amount="€24,500" note="Per year · Same fee for all students" detail="3-year fast-track or 4-year standard pathway. All programmes taught entirely in English." delay={80} />
            <CostCard label="Master's / MBA" amount="€25,500" note="Per year · 1-year fast-track available" detail="1-year intensive MBA with specialisations: Data Strategy, Real Estate, Hospitality & Global Leadership." delay={160} />
            <CostCard label="Initial Package (Non-EU/EEA)" amount="€6,050" note="One-time deposit" detail="Covers visa processing through IND, health insurance, fee deposit, and airport pickup on arrival." delay={240} />
            <CostCard label="Monthly Living Cost" amount="€800–1,200" note="Per month estimate" detail="Covers accommodation, food & transport. Student housing secured near campus. Part-time work (16 hrs/week) helps offset costs." delay={320} />
            <CostCard label="Application Fee" amount="€95" note="One-time, non-refundable" detail="Paid at the credibility interview stage. Covers admissions processing and interview assessment." delay={400} />
          </div>
        </div>
      </section>

      {/* ── PAYMENT SCHEDULE ── */}
      <section className="nl-section" style={{ background: C.white, padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag="Payment Schedule" title="How & When You Pay" sub="A clear, staged payment structure — you never pay everything upfront. Fees are tied to milestones in your application and visa journey." />
          <div className="nl-pay-grid">
            <PayStep num="01" title="Application Fee" amount="€95" note="Paid at credibility interview stage. One-time, non-refundable. Covers admissions assessment." delay={0} />
            <PayStep num="02" title="Initial Package" amount="€6,050" note="Paid after unconditional offer letter. Covers visa (IND), health insurance, and airport pickup on arrival." delay={80} />
            <PayStep num="03" title="Post-Visa Balance" amount="€8,000" note="Due after visa is approved. Confirms your place and triggers pre-departure arrangements." delay={160} />
            <PayStep num="04" title="Monthly Instalments" amount="12×" note="Remaining tuition balance paid in 12 equal monthly instalments after arrival. Spread across the academic year." isLast delay={240} />
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section id="programmes" className="nl-section" style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag="Popular Study Areas" title="In-Demand Programmes for International Students" sub="Career-aligned, English-taught, and built for the global business world. Foundation to MBA — choose from a 3-year fast-track or 4-year standard Bachelor's pathway." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
            {courses.map((c, i) => (
              <CourseCard key={c.title} icon={c.icon} title={c.title} body={c.body} tag={c.tag} delay={i * 70} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LANGUAGE REQUIREMENTS ── */}
      <section id="english" className="nl-section" style={{ background: `linear-gradient(160deg, ${C.tealDark}, ${C.teal} 60%, #3DCEC5)`, padding: "100px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 50, right: -100, width: 360, height: 360, background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead tag="English Requirements" title="IELTS, TOEFL, PTE & Cambridge Score Guide" sub="Score requirements vary by programme level. Foundation entry is available for students who need to strengthen their English before beginning a degree — you don't need IELTS 6.0 to start." light />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {langCards.map((lc, i) => (
              <LangCard key={lc.badge} {...lc} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ADMISSION REQUIREMENTS ── */}
      <section id="admission" className="nl-section" style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag="Admission Requirements" title="What You Need to Apply" sub="A clear, straightforward process. Here is exactly what to prepare before submitting your application — no surprises, no hidden requirements." />
          <div className="nl-admission-grid">
            <Reveal>
              <div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {[
                    "Valid passport — clear copy of front and back pages",
                    "Academic transcripts of your highest completed level of education",
                    "Grade sheets and mark lists for all academic years",
                    "Degree certificate or school leaving certificate",
                    "English proficiency test result — IELTS / TOEFL iBT / PTE Academic / Cambridge",
                    "Passport-size photograph with white background",
                    "Resume / CV in professional format",
                    "Statement of Purpose (SOP) — 1,500 to 4,000 words",
                    "Dedicated email address for all institution communications",
                  ].map((req) => (
                    <li key={req} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "13px 0", borderBottom: `1px solid ${C.border}`, fontSize: 14, color: "#0E2A2A", lineHeight: 1.6 }}>
                      <span style={{ color: C.teal, fontWeight: 700, flexShrink: 0, marginTop: 1, fontSize: 15 }}>✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
                <div style={{ background: C.tealSoft, border: `1px solid ${C.teal}`, borderLeft: `4px solid ${C.teal}`, padding: "16px 20px", fontSize: 13, color: C.tealDark, lineHeight: 1.7, marginTop: 20, borderRadius: 12 }}>
                  ℹ️ Requirements may vary depending on the programme level and your specific academic background. Age gaps and study gaps are accepted — applications are assessed on current profile and suitability. Contact Langma International for a personalised eligibility review.
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.teal}`, padding: 32, borderRadius: 18 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#0E2A2A", marginBottom: 20, borderBottom: `1px solid ${C.border}`, paddingBottom: 14 }}>
                  Academic Entry Qualifications Accepted
                </h3>
                {[
                  "Class 12th — Indian Standard Boards (CBSE, ICSE, State Boards)",
                  "International Baccalaureate (IB) — Diploma & Career Programme",
                  "British (I)GCSE A(S)-Levels",
                  "BTEC Level 3",
                  "European Baccalaureate (EB)",
                  "German Abitur (Allgemeine Hochschulreife)",
                  "American High School Diploma (college preparatory programme)",
                  "Intermediate Vocational Education — Level 4",
                  "Higher General Secondary Education / Pre-University Diploma",
                ].map((q) => (
                  <div key={q} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 13, fontSize: 14, color: "#0E2A2A" }}>
                    <span style={{ color: C.teal, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                    {q}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── VISA GUIDE ── */}
      <section id="visa" className="nl-section" style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag="Netherlands Student Visa Guide" title="Straightforward, Efficient & Fully Guided" sub="The visa process is managed by the institution through the IND (Immigration and Naturalisation Service). Langma International guides you through every step from application to arrival." />
          <div className="nl-visa-grid">
            <div>
              {visaSteps.map((s, i) => (
                <VisaStep key={s.title} n={i + 1} {...s} isLast={i === visaSteps.length - 1} delay={i * 80} />
              ))}
            </div>
            <Reveal delay={200}>
              <div
                style={{
                  background: `linear-gradient(160deg, ${C.tealDark}, ${C.teal})`,
                  padding: 40,
                  borderRadius: 22,
                  position: "sticky",
                  top: 100,
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
                <h3 style={{ fontSize: 22, fontWeight: 600, color: C.white, marginBottom: 24, display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                  <span style={{ width: 38, height: 38, background: "rgba(255,255,255,0.15)", borderRadius: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📋</span>
                  Visa Documents Checklist
                </h3>
                {visaDocs.map((d) => (
                  <div key={d} style={{ display: "flex", gap: 12, marginBottom: 12, fontSize: 13, color: "rgba(255,255,255,0.8)", alignItems: "flex-start", lineHeight: 1.6 }}>
                    <span style={{ width: 20, height: 20, background: "rgba(255,255,255,0.15)", color: C.white, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, fontWeight: 700 }}>✓</span>
                    {d}
                  </div>
                ))}
                <div style={{ background: "rgba(255,255,255,0.08)", borderLeft: "3px solid rgba(255,255,255,0.4)", padding: "16px 18px", marginTop: 22, fontSize: 12.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.75, borderRadius: 8 }}>
                  <strong style={{ color: C.white }}>⚠️ Regional Applicants:</strong> Applicants from Bangladesh, Pakistan, Afghanistan, and Nigeria are required to demonstrate proof of funds or sponsorship from an approved third country.<br /><br />
                  <strong style={{ color: C.white }}>✅ Gaps & Age:</strong> Study gaps and all ages are accepted. Applications are not penalised for career breaks or time between education.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CAREER OUTLOOK ── */}
      <section id="careers" className="nl-section" style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag="Career Outlook · Netherlands 2026" title="Why Dutch Graduates Get Hired" sub="The Netherlands doesn't just prepare you for a career — it places you inside one. With a mandatory paid internship, 100+ company career fair, and a 50% internship-to-job rate, graduates are work-ready before they collect their diploma." />

          {/* career stats */}
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 18, marginBottom: 40 }}>
              {[["50%", "Internship-to-Job Rate"], ["100+", "Companies at Career Fair"], ["1 Year", "Post-Study Orientation Visa"], ["#1", "English Proficiency Globally"]].map(([num, lbl]) => (
                <div key={lbl} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 22px", textAlign: "center" }}>
                  <div style={{ fontSize: 34, fontWeight: 600, color: C.teal, lineHeight: 1, marginBottom: 8 }}>{num}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.slate, textTransform: "uppercase", letterSpacing: "0.8px" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
            {careerOutlooks.map((o, i) => (
              <OutlookCard key={o.title} {...o} delay={i * 100} />
            ))}
          </div>

          {/* career tags */}
          <Reveal delay={200}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 40, justifyContent: "center" }}>
              {["Investment Banking", "Business Consulting", "Digital Marketing", "Data Strategy", "AI & Technology", "Hospitality Management", "Event Management", "Entrepreneurship", "Real Estate", "International Sales", "Logistics & Supply Chain", "Sustainability Management", "Project Management", "Brand Management", "Luxury Retail", "Creative Direction"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: C.goldTint,
                    color: C.tealDark,
                    border: `1px solid ${C.goldSoft}`,
                    padding: "9px 20px",
                    fontSize: 13,
                    fontWeight: 500,
                    borderRadius: 999,
                    transition: "all 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.target.style.background = C.teal; e.target.style.color = C.white; e.target.style.borderColor = C.teal; }}
                  onMouseLeave={(e) => { e.target.style.background = C.goldTint; e.target.style.color = C.tealDark; e.target.style.borderColor = C.goldSoft; }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY LANGMA ── */}
      <section className="nl-section" style={{ background: `linear-gradient(160deg, ${C.tealDark}, ${C.teal})`, padding: "100px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", filter: "blur(20px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead tag="Why Choose Langma International" title="Your Study Abroad Partner — Not Just an Agent" sub="From your first eligibility check to your first day on campus, we handle everything. No stress, no guesswork." light />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 18 }}>
            {supportCards.map((s, i) => (
              <SupportCard key={s.title} {...s} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT LIFE ── */}
      <section className="nl-section" style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag="Student Life" title="Life in the Netherlands — More Than Just Study" sub="World-class education inside one of the world's most liveable countries. Here is what everyday life actually looks like as an international student." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { icon: "🏙️", tag: "Living", title: "Affordable & Vibrant Cities", body: "Amsterdam combines world-class culture, food, and nightlife with a compact, student-friendly layout. Excellent public transport, cycling infrastructure, and a cost of living manageable on a student budget — especially with part-time work rights." },
              { icon: "🌍", tag: "Community", title: "160+ Nationalities on Campus", body: "Study alongside peers from over 160 countries every day. The classroom itself becomes a global network — the connections built here frequently become the professional relationships of a lifetime." },
              { icon: "🏠", tag: "Accommodation", title: "Guaranteed Student Housing", body: "Purpose-built student residences reserved exclusively for international students. Personal rooms with full communal facilities, located less than 15 minutes from campus — secured for your full programme duration." },
              { icon: "✈️", tag: "Travel", title: "Europe on Your Doorstep", body: "Amsterdam Schiphol connects to over 300 destinations worldwide. Weekend trips to Paris, London, Berlin, or Barcelona are a completely normal part of student life." },
              { icon: "🛡️", tag: "Safety", title: "Safe, Stable & Welcoming", body: "Consistently ranked among the world's safest and happiest countries. Low crime, high civic trust, and an open multicultural society with a centuries-long history of welcoming international residents." },
              { icon: "⚖️", tag: "Balance", title: "Work-Life Balance Built In", body: "The Dutch are internationally recognised for healthy work-life boundaries — and that culture permeates campus life too. Structured schedules, sports facilities, societies, and city trips are all integrated into your experience." },
            ].map((lc, i) => (
              <Reveal key={lc.title} delay={i * 80}>
                <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: "28px 26px", borderRadius: 16, height: "100%" }}>
                  <span style={{ display: "inline-block", background: C.goldTint, color: C.tealDark, fontSize: 11, fontWeight: 700, padding: "4px 12px", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 14, borderRadius: 999, border: `1px solid ${C.goldSoft}` }}>
                    {lc.icon} {lc.tag}
                  </span>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0E2A2A", marginBottom: 10 }}>{lc.title}</h4>
                  <p style={{ fontSize: 13.5, color: C.slate, lineHeight: 1.75, margin: 0 }}>{lc.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION STEPS ── */}
      <section id="apply" className="nl-section" style={{ background: `linear-gradient(135deg, ${C.tealDark}, ${C.teal})`, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag="Application Process" title="7 Steps to Studying in the Netherlands" sub="A clear, fully guided process from first enquiry to first day of class. Langma International is with you at every single step — no stage left to navigate alone." light />
          <div className="nl-apply-steps">
            {[
              { title: "Profile Evaluation", body: "Free honest assessment of your academic background and English proficiency. We tell you exactly which programmes you qualify for — before you commit to anything." },
              { title: "Document Preparation", body: "We help you gather, organise, and format your complete application package — transcripts, SOP, CV, photograph, and English test results — correctly the first time." },
              { title: "Credibility Interview", body: "Our team prepares you fully — mock interview sessions, question guidance, and confidence-building practice — so you walk in ready to succeed." },
              { title: "Offer Letter", body: "Receive your unconditional offer letter from the institution confirming your programme, level, intake date, and place. Your seat is officially secured." },
              { title: "Visa Process", body: "We guide every step of the visa journey — initial package payment, IND application submission, VFS biometric scheduling, and visa stamp collection." },
              { title: "Pre-Departure Brief", body: "Complete travel preparation — what to pack, customs guidance, accommodation confirmation, arrival logistics, and exactly what to expect on Day 1." },
              { title: "Begin Your Journey", body: "Airport pickup confirmed. Student housing ready. Orientation week scheduled. Welcome to the Netherlands — your future starts the moment you land." },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div
                  className="nl-apply-step"
                  style={{
                    background: "transparent",
                    padding: "32px 20px",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: C.white, margin: "0 auto 16px" }}>
                    {i + 1}
                  </div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.title}</h4>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="nl-section" style={{ background: `linear-gradient(135deg, ${C.tealDark}, ${C.teal})`, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead tag="Student Stories" title="What Our Students Say" light />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
            {testimonials.map((t, i) => (
              <TestiCard key={t.name} {...t} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="nl-section" style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionHead tag="FAQs" title="Frequently Asked Questions — Study in the Netherlands" sub="Everything international students ask before applying — answered clearly." center />
          <Reveal>
            <div>
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

      {/* ── FINAL CTA ── */}
      <section
        className="nl-section"
        style={{
          background: `linear-gradient(135deg, ${C.tealDark} 0%, ${C.teal} 60%, #3DCEC5 100%)`,
          backgroundSize: "200% 200%",
          animation: "nl-bg-shift 14s ease infinite",
          padding: "120px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-20%", left: "20%", width: 500, height: 500, background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", filter: "blur(40px)", animation: "nl-float 10s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", filter: "blur(40px)", animation: "nl-float 13s ease-in-out infinite reverse", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <h2 style={{ color: C.white, fontSize: "clamp(32px, 4.5vw, 56px)", marginBottom: 20, fontWeight: 600, lineHeight: 1.1 }}>
              Start Your Netherlands Journey<br />
              <em style={{ fontStyle: "italic", color: C.goldSoft }}>With One Conversation.</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 17, marginBottom: 48, maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.8 }}>
              January 2027 intake is open now. Europe's #1 English-proficiency country. Paid internships built into your programme. A post-study work visa. Your future is one free conversation away — let's begin.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => setOpen(true)}
                style={{ background: C.tealDeep, color: C.white, border: "none", padding: "16px 36px", fontSize: 15, fontWeight: 700, cursor: "pointer", borderRadius: 999, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", transition: "all 0.25s" }}
                onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; }}
              >
                Book Free Counselling →
              </button>
              {["Apply Now", "Talk to an Expert"].map((label) => (
                <button
                  key={label}
                  onClick={() => setOpen(true)}
                  style={{ background: "rgba(255,255,255,0.12)", color: C.white, border: "1px solid rgba(255,255,255,0.3)", padding: "15px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", borderRadius: 999, transition: "all 0.25s" }}
                  onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.2)"; }}
                  onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.12)"; }}
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>


      <PopupForm open={open} onClose={() => setOpen(false)} />
    </div>
  );
}