import React, { useState, useEffect, useRef } from "react";
import PopupForm from "./PopupForm";
import FAQ from "./FAQ";

/**
 * Study in Mauritius — Langma International
 * Palette matches the Study in Poland / South Korea / Malta / Dubai / Singapore pages (teal brand accent over navy panels)
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
            fontSize: 22,
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
 *  Outlook card (student life, career advantages)
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
    "🇲🇺 Mauritius 2026 Intake Open",
    "✦ English-Medium Education",
    "✦ Multicultural Campuses",
    "✦ No Embassy Interview",
    "✦ Multiple Intakes Per Year",
    "✦ 50+ Nationalities on Campus",
    "✦ Safe, Stable Island Nation",
    "✦ 40–60% Lower Cost vs the West",
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
 *  DATA — Mauritius content
 * ================================================================ */
const whyChecklist = [
  "English-medium academic programmes recognised internationally",
  "Multicultural community with students from 50+ nationalities",
  "Strategic location bridging three major global regions",
  "Industry-connected, career-oriented curriculum design",
  "Growing international student population year on year",
  "Stable, democratic, and politically peaceful environment",
];

const glanceFacts = [
  { icon: "🗣️", label: "Languages", value: "English & French", sub: "English used in academia and business" },
  { icon: "🌤️", label: "Climate", value: "Tropical & Warm", sub: "Avg. 25–30°C year-round" },
  { icon: "🛡️", label: "Safety", value: "Very Safe", sub: "Ranked among safest African nations" },
  { icon: "💰", label: "Currency", value: "Mauritian Rupee", sub: "Favourable for Indian students" },
  { icon: "👥", label: "Population", value: "~1.3 Million", sub: "Compact, connected community" },
  { icon: "🕐", label: "Time Zone", value: "UTC +4", sub: "Just 1.5 hrs ahead of India" },
  { icon: "✈️", label: "Connectivity", value: "Well Connected", sub: "Direct flights from India & Asia" },
  { icon: "🎓", label: "Student Life", value: "Vibrant & Inclusive", sub: "Diverse international campus culture" },
];

const reasons = [
  { icon: "💸", title: "Affordable Tuition Fees", body: "Study costs in Mauritius are significantly lower than destinations like the UK, Australia, or Canada — without compromising on academic quality or international recognition." },
  { icon: "🏠", title: "Lower Living Expenses", body: "Day-to-day living in Mauritius is comfortably affordable. Students can manage accommodation, food, and transportation at a fraction of the cost in Western countries." },
  { icon: "🔐", title: "Safe & Stable Environment", body: "Mauritius is consistently recognised as one of the safest and most stable nations in the African region, offering peace of mind for students and their families alike." },
  { icon: "📋", title: "Straightforward Student Visa", body: "The Mauritian student visa process is known for being accessible and structured. Unlike many destinations, it does not require an embassy interview." },
  { icon: "📅", title: "Flexible Intake Opportunities", body: "Multiple intake windows throughout the year give students the flexibility to plan their academic journey without waiting an entire year for the next cycle." },
  { icon: "🛠️", title: "Practical, Hands-On Learning", body: "Academic programmes in Mauritius are designed around real-world application. Industry projects, internships, and case studies prepare students for actual workplace demands." },
  { icon: "🌐", title: "Global Exposure", body: "With students from Asia, Africa, Europe, and beyond sharing classrooms, Mauritius delivers the kind of cross-cultural exposure that employers value." },
  { icon: "🤝", title: "International Networking", body: "Your peer group becomes your global professional network. Friendships and connections formed in Mauritius can open doors across three continents." },
  { icon: "🏆", title: "Globally Recognised Qualifications", body: "Degrees awarded by accredited institutions in Mauritius are recognised internationally and hold value in the global job market." },
  { icon: "🌴", title: "Quality Island Lifestyle", body: "Where else can you study for an international degree with turquoise lagoons, warm weather, and vibrant festivals as your backdrop?" },
];

const studyAreas = [
  "Business Administration", "Management Studies", "Hospitality Management", "Tourism & Travel",
  "Information Technology", "Finance & Accounting", "Digital Marketing", "Entrepreneurship",
  "Healthcare Pathways", "Emerging Technologies", "Project Management", "Human Resources",
];

const costs = [
  { label: "Annual Tuition", amount: "Highly Competitive", note: "Significantly lower than UK, Australia, USA, and Canada equivalents" },
  { label: "Monthly Accommodation", amount: "Budget-Friendly", note: "Shared and private options available; campus and off-campus choices" },
  { label: "Monthly Food Expenses", amount: "Very Affordable", note: "Fresh produce, local cuisine, and student canteens keep costs low" },
  { label: "Transport", amount: "Low Cost", note: "Reliable public bus network; student concessions widely available" },
  { label: "vs. UK / Australia", amount: "Save Significantly", note: "Overall cost can be 40–60% lower than comparable Western destinations", highlight: true },
  { label: "Total Monthly Budget", amount: "Student-Friendly", note: "A well-planned monthly budget covers all essentials comfortably" },
];

const lifeCards = [
  { icon: "🏖️", tag: "Lifestyle", title: "Island Lifestyle & Beaches", body: "Some of the world's most pristine beaches are minutes from campus. Weekends in Mauritius feel like a reward that recharges you for the week ahead." },
  { icon: "🎉", tag: "Culture", title: "Multicultural Festivals", body: "From Diwali and Eid to Christmas and the Chinese Spring Festival, Mauritius celebrates them all with equal enthusiasm." },
  { icon: "🍛", tag: "Food", title: "Vibrant Food Culture", body: "Mauritian cuisine is a delicious fusion of Indian, African, Chinese, and French influences. Familiar flavours and vegetarian options are easy to find." },
  { icon: "🤝", tag: "Community", title: "International Student Communities", body: "International student associations, cultural clubs, and peer networks make building meaningful friendships a natural part of the experience." },
  { icon: "⚖️", tag: "Balance", title: "Work–Life Balance", body: "Mauritius moves at a pace that supports both academic rigour and personal wellbeing, with less commute stress and more time for what matters." },
  { icon: "🏙️", tag: "Infrastructure", title: "Modern Infrastructure", body: "High-speed internet, modern healthcare facilities, well-maintained roads, and digital connectivity make daily student life smooth from day one." },
];

const partTimeList = [
  "Legal right to work up to 20 hours per week after the first 90 days",
  "No part-time work permitted during the initial semester (first 90 days of arrival)",
  "Employer must obtain Ministry of Labour clearance before student can commence work",
  "Build professional skills and a global employment record during your studies",
  "Expand your international network through workplace connections",
  "Develop intercultural communication abilities highly valued by employers",
  "Opportunities across hospitality, IT, financial services, and retail sectors",
  "Internship pathways available through academic and industry partnerships",
];

const visaDocs = [
  "Confirmed Offer Letter from an accredited institution in Mauritius",
  "Valid passport — minimum 18 months validity advisable",
  "Financial documentation — minimum USD 5,000–6,000 maintenance balance",
  "Academic transcripts & certificates (Class 10, Class 12, graduation as applicable)",
  "Passport-size photograph meeting specified format",
  "Completed student visa application form",
];

const careerCards = [
  { icon: "🌍", tag: "CV Impact", title: "International Brand on Your CV", body: "Completing a degree abroad immediately distinguishes you from candidates with only domestic education experience — in India and globally." },
  { icon: "💼", tag: "Employability", title: "Stronger Employability Profile", body: "Adaptability, cross-cultural communication, and independent living are skills employers actively seek — inherent outcomes of international study." },
  { icon: "🧠", tag: "Mindset", title: "Global Mindset", body: "Exposure to diverse perspectives, global business practices, and international academic standards trains your thinking in ways domestic education cannot." },
  { icon: "🔗", tag: "Networks", title: "Industry Connections", body: "Mauritius's thriving sectors — financial services, tourism, and digital economy — offer access to real industry networks through internships and projects." },
  { icon: "📈", tag: "Further Study", title: "Pathways for Further Study", body: "A Mauritius qualification provides a credible launching pad for postgraduate studies in the UK, Europe, Australia, or further advancement locally." },
  { icon: "🚀", tag: "Growth", title: "Accelerated Professional Growth", body: "International graduates consistently report faster career progression — Mauritius graduates gain the added advantage of tri-continental network access." },
];

const support = [
  { icon: "🎯", title: "Expert Career Counselling", body: "Our counsellors assess your academic background, career goals, and budget to match you with the ideal programme and pathway." },
  { icon: "📝", title: "Application Assistance", body: "From selecting the right programme to completing application forms, we handle every step to ensure your application stands out." },
  { icon: "📁", title: "Documentation Guidance", body: "We prepare, review, and organise your complete documentation package — eliminating common errors that cause delays or rejections." },
  { icon: "🛂", title: "Visa Application Support", body: "Our visa team manages the entire student visa process, keeping you informed and prepared at every stage of the application." },
  { icon: "✈️", title: "Pre-Departure Preparation", body: "From travel tips and packing guidance to orientation briefings and airport transfer support, we ensure you arrive confident and ready." },
  { icon: "🏡", title: "Accommodation Support", body: "We assist with identifying and securing appropriate student accommodation — campus-based or private — before your arrival." },
  { icon: "📞", title: "Ongoing Student Support", body: "Our relationship doesn't end when you board the flight. We remain your point of contact for guidance throughout your academic journey." },
  { icon: "💯", title: "Student-First Approach", body: "Every decision we make is guided by what is genuinely best for your career, education, and future — not just what is convenient." },
];

const faqs = [
  { q: "Is Mauritius a good destination for international students?", a: "Absolutely. Mauritius combines internationally recognised education, an English-friendly academic environment, a multicultural student community, and an exceptional quality of life — all at a cost significantly lower than traditional study-abroad destinations." },
  { q: "Can I work part-time while studying in Mauritius?", a: "Yes — with conditions. Students have a legal right to work up to 20 hours per week, but this right does not apply during the first 90 days. After that, part-time employment requires an employer-obtained Ministry of Labour clearance." },
  { q: "What is the cost of living in Mauritius for a student?", a: "Student living costs in Mauritius are genuinely affordable. Accommodation, food, transport, and personal expenses combined are far more manageable than equivalent costs in Western study destinations." },
  { q: "Is IELTS required to study in Mauritius?", a: "Not necessarily. IELTS or TOEFL requirements depend on the specific programme and level of study. Many programmes accept students from English-medium educational backgrounds without requiring a separate language test." },
  { q: "How safe is Mauritius for international students?", a: "Mauritius is consistently ranked among the safest nations in the African region and is known for its low crime rate, political stability, and welcoming attitude toward international visitors and students." },
  { q: "How long does the Mauritius student visa take to process?", a: "Visa processing timelines can vary. Langma International manages this timeline proactively to ensure your application is submitted well in advance and processed without unnecessary delays." },
  { q: "Do I need to appear for an embassy interview for the Mauritius student visa?", a: "In most cases, the Mauritius student visa process does not require an in-person embassy interview — making it significantly more accessible compared to visa procedures for countries like the USA, UK, or Australia." },
  { q: "Are degrees from Mauritius recognised globally?", a: "Qualifications from accredited institutions in Mauritius are internationally recognised. Many programmes are designed in alignment with British academic frameworks and validated by international accreditation bodies." },
  { q: "Can Class 12 students directly apply to study in Mauritius?", a: "Yes. Undergraduate programmes are available to students who have completed Class 12 (or equivalent) with the required academic profile. PCM, PCB, Commerce, or Arts backgrounds may be eligible depending on the programme." },
  { q: "Can working professionals pursue studies in Mauritius?", a: "Definitely. Postgraduate, MBA, and professional diploma programmes are well-suited to working professionals. Flexible intake schedules and formats make it feasible to plan around professional commitments." },
  { q: "What are the intake periods for studying in Mauritius?", a: "Mauritius typically offers multiple intake windows — often in January/February, May/June, and September/October, depending on the institution and programme." },
  { q: "How is the language barrier managed in Mauritius?", a: "English is widely used in academic settings, business, and everyday communication. Indian students find the transition smooth and comfortable. French is also commonly spoken, offering an additional linguistic advantage." },
  { q: "Can I extend my stay in Mauritius after graduation?", a: "Post-study opportunities depend on current immigration regulations, which are subject to periodic revision. Langma International can provide updated guidance on post-graduation options at the time of your consultation." },
  { q: "How does Langma International help with the application process?", a: "Langma International provides end-to-end support — from initial career counselling and programme selection to application preparation, documentation review, visa processing, pre-departure briefings, and ongoing student support." },
  { q: "Is there a consultation fee to speak with Langma International?", a: "Initial counselling with Langma International is complimentary. Our goal is to understand your aspirations and provide honest, personalised guidance before you commit to any application process." },
];

/* ===================================================================
 *  MAIN
 * ================================================================ */
export default function StudyMauritiusPage() {
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
                Study In <span className="text-[#2FC7A1]">Mauritius</span>
                <br />
                Where the Ocean
                <br />
                Meets Opportunity.
              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
                Earn a globally recognised degree on a paradise island.
                Affordable fees, multicultural campuses, and a visa process
                built for international students. The smart, strategic
                alternative to traditional study-abroad destinations —
                closer to home, lighter on the wallet, bigger in career
                value.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  "✓English-Medium Education",
                  "✓No Embassy Interview",
                  "✓Multiple Intakes a Year",
                  "✓50+ Nationalities on Campus",
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
                  Start Your Application Today →
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="border border-[#1A2540] text-[#1A2540] hover:bg-[#1A2540] hover:text-white transition-all px-8 py-4 rounded-full font-semibold text-lg cursor-pointer"
                >
                  Explore Mauritius
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
                    src="images/maur.jpeg"
                    alt="Study in Mauritius"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <Marquee />

      {/* ---------------- WHY MAURITIUS INTRO ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }} className="lm-visa-wrap">
            <Reveal>
              <div>
                <SectionHead
                  tag={<span style={{ color: "#296166" }}>Why Mauritius?</span>}
                  title={<span style={{ color: "#296166" }}>A Rising Star in International Education</span>}
                  style={{ marginBottom: 24 }}
                />
                <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.85, marginBottom: 16 }}>
                  Mauritius has quietly become one of the most compelling study destinations in the Indian Ocean region. Strategically positioned at the crossroads of Asia, Africa, and Europe, this island nation punches well above its weight in delivering world-class international education.
                </p>
                <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.85, marginBottom: 24 }}>
                  With English as a key medium of instruction, globally aligned academic programmes, and a multicultural society that welcomes students from every corner of the world, Mauritius offers an environment where learning goes beyond the classroom.
                </p>
                <div>
                  {whyChecklist.map((item) => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                      <span style={{ color: C.navy, fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 14, color: C.slate, lineHeight: 1.7 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  minHeight: 360,
                  position: "relative",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=800&q=80"
                  alt="Mauritius coastline representing international education opportunity"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    background: C.white,
                    borderRadius: 10,
                    padding: "12px 16px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.ink,
                  }}
                >
                  🌍 Globally Connected Island Nation
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

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
            tag="Quick Facts"
            title="Mauritius at a Glance"
            sub="Everything you need to know about life on the island before you decide to study here."
            light
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            {glanceFacts.map((f, i) => (
              <Reveal key={f.label} delay={i * 60}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(240,192,64,0.15)",
                    borderRadius: 16,
                    padding: "24px 20px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{f.icon}</div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "1.2px",
                      textTransform: "uppercase",
                      color: C.goldL,
                      marginBottom: 6,
                    }}
                  >
                    {f.label}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.white }}>{f.value}</div>
                  <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{f.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 10 REASONS ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>10 Compelling Reasons</span>}
            title={
              <span style={{ color: "#296166" }}>
                Why International Students Choose Mauritius
              </span>
            }
            sub={
              <span style={{ color: "#296166" }}>
                From cost efficiency to career relevance, here's why more students are choosing Mauritius over traditional study destinations.
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
              <ReasonCard key={r.title} title={r.title} body={r.body} icon={r.icon} delay={i * 70} />
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
          ✨ Class 12 pass, diploma holder, or working professional? Mauritius has a pathway for you.
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

      {/* ---------------- STUDY AREAS ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center" }} className="lm-visa-wrap">
            <Reveal>
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  minHeight: 360,
                  position: "relative",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
                  alt="Students in discussion representing diverse study programmes"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    background: C.white,
                    borderRadius: 10,
                    padding: "12px 16px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.ink,
                  }}
                >
                  📚 Career-Focused Programmes
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <SectionHead
                  tag={<span style={{ color: "#296166" }}>Academic Pathways</span>}
                  title={<span style={{ color: "#296166" }}>What Can You Study in Mauritius?</span>}
                  style={{ marginBottom: 24 }}
                />
                <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.85, marginBottom: 20 }}>
                  Mauritius offers a rich and growing catalogue of academic programmes across disciplines in high global demand — available at undergraduate, postgraduate, and professional diploma levels, all taught in English and aligned with industry standards.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {studyAreas.map((area) => (
                    <span
                      key={area}
                      style={{
                        background: C.navy,
                        color: C.white,
                        borderRadius: 999,
                        padding: "9px 20px",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- COST OF STUDYING ---------------- */}
      <section
        style={{
          background: `linear-gradient(135deg, ${C.navyDark}, ${C.navyD})`,
          padding: "100px 48px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Transparent Cost Overview"
            title="Cost of Studying in Mauritius"
            sub="One of the most frequently asked questions — and one of the most pleasant surprises for prospective students. Here's an honest, realistic overview of what to expect financially."
            light
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            {costs.map((c, i) => (
              <CostCard key={c.label} {...c} delay={i * 70} />
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 32, color: "rgba(255,255,255,0.55)", fontSize: 12.5 }}>
            Exact programme fees vary by course and level of study. Our counsellors will provide accurate, up-to-date cost breakdowns during your free consultation.
          </p>
        </div>
      </section>

      {/* ---------------- STUDENT LIFE ---------------- */}
      <section style={{ background: C.cream, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Beyond the Classroom</span>}
            title={<span style={{ color: "#296166" }}>Student Life in Mauritius</span>}
            sub={
              <span style={{ color: "#296166" }}>
                Life in Mauritius is not just about degrees — it's about experiences that shape who you become.
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

      {/* ---------------- PART-TIME WORK ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="lm-visa-wrap">
            <Reveal>
              <div>
                <SectionHead
                  tag={<span style={{ color: "#296166" }}>Work Up to 20 Hours Per Week</span>}
                  title={<span style={{ color: "#296166" }}>Part-Time Work Rights for International Students</span>}
                  style={{ marginBottom: 24 }}
                />
                <p style={{ fontSize: 14.5, color: C.slate, lineHeight: 1.85, marginBottom: 16 }}>
                  International students in Mauritius have a legal right to work part-time for up to <strong style={{ color: C.ink }}>20 hours per week</strong> during term time — allowing you to gain professional experience, offset living costs, and build a credible international employment record alongside your degree.
                </p>
                <p style={{ fontSize: 14.5, color: C.slate, lineHeight: 1.85, marginBottom: 16 }}>
                  Students are <strong style={{ color: C.ink }}>strictly prohibited from working during their first semester</strong> — the initial 90 days following arrival. This waiting period is a firm legal requirement and is not waivable under any circumstances.
                </p>
                <p style={{ fontSize: 14.5, color: C.slate, lineHeight: 1.85, marginBottom: 24 }}>
                  Every part-time role also requires a specific <strong style={{ color: C.ink }}>employment clearance or work permit</strong>, applied for and approved through the <strong style={{ color: C.ink }}>Ministry of Labour</strong> by the prospective employer — not the student.
                </p>
                <NavyButton onClick={() => setOpen(true)}>Get Guidance on Work Clearance →</NavyButton>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                {partTimeList.map((item, idx, arr) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      padding: "13px 0",
                      borderBottom: idx === arr.length - 1 ? "none" : `1px solid ${C.border}`,
                      fontSize: 14,
                      color: C.slate,
                    }}
                  >
                    <span style={{ color: C.navy, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {item}
                  </div>
                ))}
                <div
                  style={{
                    background: C.goldTint,
                    border: `1px solid ${C.goldSoft}`,
                    borderLeft: `3px solid ${C.navy}`,
                    padding: "16px 18px",
                    marginTop: 18,
                    fontSize: 12.5,
                    color: "#8a3810",
                    lineHeight: 1.7,
                  }}
                >
                  ⚠️ The 90-day work restriction and Ministry of Labour clearance requirement are mandatory legal obligations under Mauritian immigration and labour law. Langma International will provide complete pre-arrival and post-arrival guidance on compliance.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- ENGLISH LANGUAGE REQUIREMENTS ---------------- */}
      <section
        style={{
          background: `linear-gradient(160deg, ${C.navyDark}, ${C.navyD} 60%, ${C.navy})`,
          padding: "90px 48px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag="Language Requirements"
            title="IELTS, TOEFL & English Proficiency for Mauritius"
            sub="One common concern for Indian and international students is language proficiency requirements. Here's what you need to know about studying in Mauritius in English."
            light
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            <Reveal>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(240,192,64,0.18)",
                  padding: 32,
                  borderRadius: 20,
                }}
              >
                <h3 style={{ fontSize: 17, fontWeight: 700, color: C.white, marginBottom: 14 }}>
                  When IELTS or TOEFL May Be Required
                </h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 16 }}>
                  Some postgraduate programmes, or those with formal accreditation ties to international bodies, may request proof of English proficiency through IELTS or TOEFL. Requirements vary widely — many programmes welcome students from English-medium schools without a separate test.
                </p>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: C.white, marginBottom: 14 }}>
                  Alternative Proof of Proficiency
                </h3>
                {[
                  "Previous study in an English-medium school or institution",
                  "English as a primary subject in Class 12 or graduation",
                  "Programme-specific English placement assessments",
                  "Work experience letters in English-speaking environments",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ color: C.goldL, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(240,192,64,0.18)",
                  padding: 32,
                  borderRadius: 20,
                }}
              >
                <h3 style={{ fontSize: 17, fontWeight: 700, color: C.white, marginBottom: 14 }}>
                  Why You Should Verify Requirements Early
                </h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 20 }}>
                  Language requirements can change and vary by intake. The safest approach is to confirm the exact requirements for your chosen programme as early as possible in the planning stage.
                </p>
                <div
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: 14,
                    padding: 22,
                  }}
                >
                  <p style={{ color: "#FFFFFF", marginBottom: 10, fontWeight: 600, fontSize: 13.5 }}>
                    💬 Langma International's Guidance
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.75, margin: 0 }}>
                    Our experienced counsellors review your academic background and help you determine whether a language test is required, recommend preparation if needed, and ensure your application meets all proficiency criteria before submission.
                  </p>
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
            tag={<span style={{ color: "#296166" }}>Visa Information</span>}
            title={<span style={{ color: "#296166" }}>Mauritius Student Visa Guide</span>}
            sub={
              <span style={{ color: "#296166" }}>
                Obtaining a student visa for Mauritius is a structured and manageable process. Requirements are subject to change and must be verified at the time of application — here is a general overview of what to expect through Langma International.
              </span>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="lm-visa-wrap">
            <div>
              <VisaStep n={1} title="Confirmed Offer Letter" body="Secure your official admission offer from an accredited institution in Mauritius. This document is fundamental to your visa application." delay={0} />
              <VisaStep n={2} title="Valid Passport" body="Your passport must have sufficient validity beyond your expected period of study. Typically, a minimum of 18 months remaining validity is advisable." delay={80} />
              <VisaStep n={3} title="Financial Documentation" body="The Passport and Immigration Office (PIO) requires proof of a minimum maintenance balance of USD 5,000–6,000, separate from tuition fee payment proof — via bank statements, sponsor declarations, or a fixed deposit certificate." delay={160} />
              <VisaStep n={4} title="Academic Transcripts & Certificates" body="Submit certified copies of your educational qualifications — Class 10, Class 12, graduation, or any relevant academic records depending on your programme level." delay={240} />
              <VisaStep n={5} title="Medical Screening — Mandatory In-Country Requirement" body="A compulsory requirement upon arrival: HIV testing, Hepatitis B screening, and a Chest X-ray at a registered laboratory or approved hospital, completed within the first few days of entry, before your permit can be validated." delay={320} />
              <VisaStep n={6} title="Photograph & Application Form" body="Passport-size photographs meeting the specified format, along with a completed student visa application form, form the final layer of your submission." delay={400} />
              <VisaStep n={7} title="Visa Processing & Guidance" body="Langma International manages the entire visa documentation process on your behalf — reviewing, organising, and submitting your application with precision to avoid delays or rejections." isLast delay={480} />
            </div>
            <div style={{ position: "sticky", top: 100 }}>
              <DocsBox
                title="Key Visa Requirements"
                items={visaDocs}
                note={
                  <>
                    ⚠️ Always verify the latest visa requirements with Langma International before initiating any application process, as immigration policies may be updated.
                    <br />
                    <br />
                    <strong style={{ color: "#FFFFFF" }}>Mandatory medical screening:</strong> HIV testing, Hepatitis B, and Chest X-ray required within the first few days of arrival.
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CAREER ADVANTAGES ---------------- */}
      <section style={{ background: C.white, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            tag={<span style={{ color: "#296166" }}>Career Impact</span>}
            title={<span style={{ color: "#296166" }}>Career Advantages of Studying in Mauritius</span>}
            sub={
              <span style={{ color: "#296166" }}>
                Your degree from Mauritius is more than a certificate — it's a career asset built through international experience, cross-cultural confidence, and globally relevant skills.
              </span>
            }
            center
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
            tag="Your Trusted Partner"
            title="Why Apply Through Langma International?"
            sub="Studying abroad without the right guidance can be overwhelming. Langma International exists to remove that uncertainty — and turn your international ambition into a reality, step by step."
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
          <SectionHead tag={<span style={{ color: "#296166" }}>Got Questions?</span>} title="Frequently Asked Questions" center />
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
              Your International Education
              <br />
              <em className="lm-grd-text" style={{ fontStyle: "italic" }}>
                Journey Starts Here.
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
              Thousands of students have transformed their futures through international education — and Mauritius could be where yours begins. Speak with a Langma International counsellor today. No pressure. No obligation.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <NavyButton onClick={() => setOpen(true)} style={{ background: C.forest, padding: "16px 36px" }}>
                📞 Book a Free Call
              </NavyButton>
              <GhostButton onClick={() => setOpen(true)}>✉️ Email Our Team</GhostButton>
              <GhostButton onClick={() => setOpen(true)}>💬 WhatsApp Us Now</GhostButton>
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