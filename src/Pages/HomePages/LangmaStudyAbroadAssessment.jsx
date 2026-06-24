import { useState, useEffect, useRef } from "react";
// import API_BASE from "../../config.js";
const COLORS = {
  navy: "#006064",
  navyDeep: "#004D51",
  royal: "#17a398",
  royalDeep: "#006064",
  gold: "#296166",
  goldDeep: "#1e4f54",
  teal: "#17a398",
  cream: "#F2FBFB",
  cream2: "#E0F5F5",
  sand: "#D9F0F0",
  skyA: "#CCF0EF",
  skyB: "#F2FBFB",
  ink: "#003A3D",
  inkSoft: "#3D7377",
  white: "#FFFFFF",
  line: "rgba(0,96,100,0.14)",
  stampTint: "rgba(23,163,152,0.10)",
  stampTint2: "rgba(23,163,152,0.20)",
};

const styles = {
  root: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: COLORS.ink,
    background: COLORS.cream,
    WebkitFontSmoothing: "antialiased",
    lineHeight: 1.55,
    position: "relative",
  },
  topBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 200,
    background: `linear-gradient(90deg, ${COLORS.navy}, ${COLORS.royal}, ${COLORS.gold})`,
  },
  wrap: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "0 28px",
  },
  eyebrow: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 12,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: COLORS.royal,
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
  },
};

function Eyebrow({ children, style }) {
  return (
    <span style={{ ...styles.eyebrow, ...style }}>
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: COLORS.royal,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}

function DotGrid() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(0,96,100,0.10) 1px, transparent 1.4px)`,
        backgroundSize: "22px 22px",
        opacity: 0.5,
        pointerEvents: "none",
      }}
    />
  );
}

function BoardingCard() {
  return (
    <div
      style={{
        position: "relative",
        background: COLORS.white,
        borderRadius: 28,
        boxShadow: "0 20px 50px -25px rgba(0,96,100,0.28)",
        padding: "26px 26px 0",
        overflow: "hidden",
        border: `1px solid ${COLORS.line}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: COLORS.inkSoft,
            textTransform: "uppercase",
          }}
        >
          Mobility Assessment
        </span>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: COLORS.inkSoft,
            textTransform: "uppercase",
          }}
        >
          No. 0427
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingBottom: 24,
        }}
      >
        {[
          { label: "FROM", value: "Your Goals" },
          null,
          { label: "TO", value: "Your Destination" },
        ].map((item, i) =>
          item ? (
            <div key={i} style={{ flex: 1 }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10.5,
                  color: COLORS.inkSoft,
                  letterSpacing: "0.1em",
                  marginBottom: 6,
                }}
              >
                {item.label}
              </span>
              <strong
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {item.value}
              </strong>
            </div>
          ) : (
            <div key={i} style={{ fontSize: 20, color: COLORS.royal }}>
              →
            </div>
          )
        )}
      </div>

      <div
        style={{
          position: "relative",
          height: 0,
          borderTop: `2px dashed ${COLORS.line}`,
          margin: "0 -26px",
        }}
      >
        {["left", "right"].map((side) => (
          <div
            key={side}
            style={{
              position: "absolute",
              top: -11,
              [side]: -11,
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: COLORS.cream,
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          padding: "20px 0 22px",
        }}
      >
        <div>
          <span
            style={{
              display: "block",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10.5,
              color: COLORS.inkSoft,
              letterSpacing: "0.1em",
              marginBottom: 5,
            }}
          >
            Status
          </span>
          <strong style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600 }}>
            Match In Progress
          </strong>
        </div>
        <svg
          width="64"
          height="64"
          viewBox="0 0 100 100"
          style={{ transform: "rotate(-10deg)", opacity: 0.92 }}
        >
          <circle cx="50" cy="50" r="46" stroke={COLORS.royal} strokeWidth="1.4" fill="none" />
          <circle cx="50" cy="50" r="38" stroke={COLORS.royal} strokeWidth="1" fill="none" />
          <path id="bcArc" d="M 50,12 A 38,38 0 1 1 49.9,12" fill="none" />
          <text>
            <textPath
              href="#bcArc"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "6.4px",
                letterSpacing: "1.5px",
                fill: COLORS.royal,
              }}
            >
              LANGMA · GLOBAL MOBILITY ·{" "}
            </textPath>
          </text>
          <text
            x="50"
            y="47"
            textAnchor="middle"
            fontFamily="'Fraunces', serif"
            fontSize="11"
            fontWeight="700"
            fill={COLORS.royal}
          >
            VERIFIED
          </text>
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontFamily="'Fraunces', serif"
            fontSize="7"
            fontWeight="700"
            fill={COLORS.royal}
          >
            PROFILE
          </text>
        </svg>
      </div>
    </div>
  );
}

function HeroSection() {
  const valueItems = [
    "Personalized country recommendations matched to your profile",
    "Academic pathway insights for your field of interest",
    "Career and employment outlook by destination",
    "Estimated investment range for tuition and living costs",
    "Clear guidance on your next steps, including student visa pathways",
  ];

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "24px 0 28px",
        marginTop: 0,
      }}
    >
      <DotGrid />
      <div
        style={{
          ...styles.wrap,
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <Eyebrow>Global Services</Eyebrow>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(34px, 4.6vw, 54px)",
              lineHeight: 1.08,
              margin: "12px 0 12px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: COLORS.navy,
            }}
          >
            Your Global Future Starts Here
          </h1>
          <p
            style={{
              fontSize: 18,
              color: COLORS.inkSoft,
              maxWidth: 520,
              marginBottom: 16,
            }}
          >
            Discover international pathways built around your goals, your budget, and your ambitions.
          </p>
          <p
            style={{
              fontSize: 15.5,
              color: COLORS.inkSoft,
              maxWidth: 540,
              marginBottom: 18,
            }}
          >
            Choosing where to study abroad is one of the most consequential decisions of your future
            — and it can feel overwhelming. Between destinations, academic pathways, career outcomes,
            and <strong style={{ color: COLORS.ink, fontWeight: 600 }}>visa requirements</strong>, it helps
            to have practical guidance that reflects your situation and your next steps.
          </p>

          <ul style={{ listStyle: "none", margin: "0 0 22px", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {valueItems.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14.5, color: COLORS.ink }}>
                <span
                  style={{
                    flexShrink: 0,
                    width: 18,
                    height: 18,
                    marginTop: 1,
                    borderRadius: "50%",
                    background: COLORS.stampTint,
                    border: `1.5px solid ${COLORS.royal}`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: COLORS.royal,
                    }}
                  />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <a
                href="#how"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "15px 28px",
                  borderRadius: 999,
                  background: COLORS.royal,
                  color: COLORS.cream,
                  textDecoration: "none",
                  boxShadow: `0 14px 30px -14px rgba(23,163,152,0.55)`,
                  transition: "transform .18s ease, box-shadow .18s ease",
                }}
              >
                Explore Services
              </a>
              <a
                href="#how"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 600,
                  fontSize: 14,
                  padding: "14px 22px",
                  borderRadius: 999,
                  background: "transparent",
                  color: COLORS.ink,
                  border: `1.5px solid ${COLORS.line}`,
                  textDecoration: "none",
                }}
              >
                Learn How It Works ↓
              </a>
          </div>
        </div>

        <div>
          <BoardingCard />
        </div>
      </div>
    </section>
  );
}

const destinations = [
  { no: "01", title: "A modern international city" },
  { no: "02", title: "A culturally diverse European environment" },
  { no: "03", title: "A technology and innovation-driven society" },
  { no: "04", title: "A relaxed, affordable student lifestyle" },
];

function DestinationsSection() {
  return (
    <section
      id="destinations"
      style={{
        position: "relative",
        padding: "52px 0",
        background: `linear-gradient(180deg, ${COLORS.skyB}, ${COLORS.skyA} 55%, ${COLORS.skyB})`,
        overflow: "hidden",
      }}
    >
      <DotGrid />
      <div style={{ ...styles.wrap, position: "relative", zIndex: 1, textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
        <Eyebrow>Global Destinations</Eyebrow>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(28px, 3.6vw, 42px)",
            margin: "16px 0 14px",
            fontWeight: 600,
            color: COLORS.navy,
          }}
        >
          Find Your Country. Then Own It.
        </h2>
        <p style={{ fontSize: 16, color: COLORS.inkSoft }}>
          Every study abroad destination offers a different world of opportunity. Our global mobility
          program exists to help you understand — with clarity, not guesswork — which one was built
          for you.
        </p>
      </div>
      <div style={{ ...styles.wrap, marginTop: 0 }}>
        <div
          style={{
            marginTop: 54,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 18,
            textAlign: "left",
          }}
        >
          {destinations.map((d) => (
            <div
              key={d.no}
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.7)",
                borderRadius: 18,
                padding: "22px 20px",
                boxShadow: "0 12px 30px -18px rgba(0,96,100,0.20)",
                transition: "transform .2s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  color: COLORS.royal,
                  letterSpacing: "0.08em",
                }}
              >
                {d.no}
              </span>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15.5,
                  fontWeight: 600,
                  margin: "10px 0 0",
                  lineHeight: 1.35,
                  color: COLORS.ink,
                }}
              >
                {d.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const factors = [
  {
    label: "Educational goals",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={COLORS.royal} strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.6" fill={COLORS.royal} />
      </svg>
    ),
  },
  {
    label: "Career aspirations",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={COLORS.royal} strokeWidth="1.6">
        <rect x="3" y="8" width="18" height="12" rx="2" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      </svg>
    ),
  },
  {
    label: "Financial considerations",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={COLORS.royal} strokeWidth="1.6">
        <ellipse cx="12" cy="7" rx="7" ry="3" />
        <path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7" />
        <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
      </svg>
    ),
  },
  {
    label: "Preferred lifestyle",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={COLORS.royal} strokeWidth="1.6">
        <path d="M4 11.5 12 4l8 7.5" />
        <path d="M6 10v9h12v-9" />
      </svg>
    ),
  },
  {
    label: "Employment opportunities",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={COLORS.royal} strokeWidth="1.6">
        <circle cx="8" cy="9" r="3" />
        <circle cx="17" cy="9" r="3" />
        <path d="M2 20c0-3 2.7-5 6-5s6 2 6 5" />
        <path d="M11 20c0-3 2.7-5 6-5s5 1.6 5 4" />
      </svg>
    ),
  },
  {
    label: "Future mobility options",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={COLORS.royal} strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
      </svg>
    ),
  },
];

function WhySection() {
  return (
    <section id="why" style={{ padding: "96px 0", background: COLORS.cream }}>
      <div
        style={{
          ...styles.wrap,
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 60,
          alignItems: "start",
        }}
      >
        <div>
          <Eyebrow>The Decision Behind the Decision</Eyebrow>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(28px, 3.4vw, 38px)",
              margin: "16px 0 20px",
              fontWeight: 600,
              color: COLORS.navy,
            }}
          >
            Why Take the Global Mobility Assessment?
          </h2>
          <p style={{ color: COLORS.inkSoft, fontSize: 15.5, marginBottom: 16 }}>
            Choosing a study abroad destination is rarely about picking a country on a map. It's a
            layered decision shaped by your academic direction, your financial reality, and the life
            you want to build once you arrive.
          </p>
          <p style={{ color: COLORS.inkSoft, fontSize: 15.5, marginBottom: 16 }}>
            Most students attempt this decision with fragmented advice and incomplete information —
            which is exactly where things go wrong. This assessment brings structure to that
            decision, weighing the factors that genuinely determine long-term success abroad.
          </p>
          <p style={{ color: COLORS.inkSoft, fontSize: 15.5, marginBottom: 16 }}>
            <strong style={{ color: COLORS.ink, fontWeight: 600 }}>
              Every recommendation that follows is grounded in these factors — not generic
              destination popularity.
            </strong>{" "}
            That's the difference between guessing and planning with an international education
            consultant by your side.
          </p>
          <a
            href="#assessment"
            style={{
              marginTop: 8,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 13,
              letterSpacing: "0.04em",
              color: COLORS.royal,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              borderBottom: `1.5px solid ${COLORS.royal}`,
              paddingBottom: 3,
              textDecoration: "none",
            }}
          >
            Begin Your Assessment →
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          {factors.map((f, i) => (
            <div
              key={i}
              style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 18,
                padding: "20px 18px",
                boxShadow: "0 12px 30px -18px rgba(0,96,100,0.20)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: COLORS.stampTint,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {f.icon}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    num: "01",
    title: "Complete the Assessment",
    desc: "Answer a series of carefully designed questions about your academic background, goals, preferences, and future plans.",
    outcome: "A clear, structured picture of what you're actually looking for — in minutes, not months.",
  },
  {
    num: "02",
    title: "Receive Personalized Recommendations",
    desc: "Our assessment evaluates your responses and identifies the study abroad destinations that best match your profile.",
    outcome: "A shortlist built around your goals, not generic rankings.",
  },
  {
    num: "03",
    title: "Explore Your Opportunities",
    desc: "Receive insights into suitable countries, academic pathways, career prospects, and practical next steps for each.",
    outcome: "Real context for every option — academic, financial, and professional.",
  },
  {
    num: "04",
    title: "Connect with an Advisor",
    desc: "Book a personalized consultation with a Langma International Advisor to develop your customized international education plan.",
    outcome: "A direct path forward, guided by an expert — not navigated alone.",
  },
];

function HowSection() {
  return (
    <section id="how" style={{ padding: "96px 0", background: COLORS.sand, position: "relative" }}>
      <div style={styles.wrap}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 60px" }}>
          <Eyebrow>Your Path to Clarity</Eyebrow>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(28px, 3.4vw, 38px)",
              margin: "16px 0 0",
              fontWeight: 600,
              color: COLORS.navy,
            }}
          >
            How It Works
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            position: "relative",
          }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                zIndex: 1,
                background: COLORS.cream,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 18,
                padding: "24px 20px 22px",
                boxShadow: "0 12px 30px -18px rgba(0,96,100,0.20)",
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  border: `1.6px solid ${COLORS.royal}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 5,
                    borderRadius: "50%",
                    border: `1px solid ${COLORS.stampTint2}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 500,
                    fontSize: 14,
                    color: COLORS.royal,
                  }}
                >
                  {s.num}
                </span>
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: 8,
                  color: COLORS.ink,
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: 13.8, color: COLORS.inkSoft, marginBottom: 14 }}>{s.desc}</p>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11.5,
                  color: COLORS.royal,
                  background: COLORS.stampTint,
                  padding: "8px 10px",
                  borderRadius: 8,
                  lineHeight: 1.45,
                }}
              >
                {s.outcome}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const questionGroups = [
  {
    label: "Your Goals & Direction",
    progressLabel: "Goals",
    questions: [
      {
        text: "What is your primary objective for studying abroad?",
        name: "q1",
        options: [
          "Obtain an internationally recognized qualification",
          "Enhance career opportunities",
          "Gain international exposure and experience",
          "Access affordable, high-quality education",
          "Explore long-term global opportunities",
        ],
      },
      {
        text: "Which area of study are you most interested in pursuing?",
        name: "q2",
        options: [
          "Business & Management",
          "Information Technology & Computer Science",
          "Engineering & Technology",
          "Hospitality & Tourism",
          "Healthcare & Life Sciences",
          "Logistics & Supply Chain Management",
          "Arts, Media & Design",
          "Undecided / Exploring Options",
        ],
      },
    ],
  },
  {
    label: "Your Investment & Practical Needs",
    progressLabel: "Investment",
    questions: [
      {
        text: "What is your estimated annual budget for tuition and living expenses?",
        name: "q3",
        options: [
          "Under USD 10,000",
          "USD 10,000 – 15,000",
          "USD 15,000 – 20,000",
          "USD 20,000 – 30,000",
          "Above USD 30,000",
        ],
      },
      {
        text: "How important are part-time work opportunities while studying?",
        name: "q4",
        options: [
          "Extremely Important",
          "Important",
          "Somewhat Important",
          "Not a Priority",
        ],
      },
    ],
  },
  {
    label: "Your Ideal Environment",
    progressLabel: "Environment",
    questions: [
      {
        text: "What type of environment would you prefer?",
        name: "q5",
        options: [
          "A modern international city",
          "A culturally diverse European environment",
          "A technology and innovation-driven society",
          "A relaxed and affordable student lifestyle",
          "Open to any environment",
        ],
      },
      {
        text: "How important are post-study employment opportunities?",
        name: "q6",
        options: [
          "Extremely Important",
          "Important",
          "Somewhat Important",
          "Not a Major Consideration",
        ],
      },
    ],
  },
  {
    label: "Your Long-Term Vision",
    progressLabel: "Vision",
    questions: [
      {
        text: "Which statement best reflects your long-term goal?",
        name: "q7",
        options: [
          "Return home with an international qualification",
          "Build an international career",
          "Pursue long-term settlement opportunities",
          "Launch a business or entrepreneurial venture",
          "Still exploring my options",
        ],
      },
      {
        text: "How soon are you planning to begin your international education journey?",
        name: "q8",
        options: [
          "Within 3 months",
          "Within 6 months",
          "Within 12 months",
          "More than 12 months",
          "Currently exploring options",
        ],
      },
    ],
  },
  {
    label: "Your Adaptability & Priorities",
    progressLabel: "Priorities",
    questions: [
      {
        text: "How comfortable are you adapting to a new culture and environment?",
        name: "q9",
        options: [
          "Very Comfortable",
          "Comfortable",
          "Somewhat Comfortable",
          "Prefer a familiar environment",
        ],
      },
      {
        text: "What matters most when selecting a destination?",
        name: "q10",
        options: [
          "Quality of education",
          "Career opportunities",
          "Affordability",
          "Safety and quality of life",
          "International networking opportunities",
          "Future mobility prospects",
        ],
      },
    ],
  },
];

function AssessmentSection() {
  const [openGroup, setOpenGroup] = useState(0);
  const [doneGroups, setDoneGroups] = useState([]);
  const [answers, setAnswers] = useState({});

  const handleGroupToggle = (i) => {
    if (openGroup === i) return;
    if (openGroup !== null && !doneGroups.includes(openGroup)) {
      setDoneGroups((prev) => [...prev, openGroup]);
    }
    setOpenGroup(i);
  };

  const handleAnswer = (name, value) => {
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="assessment" style={{ padding: "96px 0", background: COLORS.cream }}>
      <div style={styles.wrap}>
        <div style={{ maxWidth: 620, margin: "0 auto 14px", textAlign: "center" }}>
          <Eyebrow>Your Assessment</Eyebrow>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(28px, 3.4vw, 38px)",
              margin: "16px 0 10px",
              fontWeight: 600,
              color: COLORS.navy,
            }}
          >
            A Few Quick Questions
          </h2>
          <p style={{ color: COLORS.inkSoft, fontSize: 15 }}>
            No right or wrong answers — just clarity. Select one option per question.
          </p>
        </div>

        <div style={{ maxWidth: 760, margin: "42px auto 50px" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {questionGroups.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 6,
                  borderRadius: 6,
                  background: COLORS.line,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: doneGroups.includes(i) ? "100%" : openGroup === i ? "45%" : "0%",
                    background: COLORS.royal,
                    transition: "width .35s ease",
                  }}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10.5,
              letterSpacing: "0.06em",
              color: COLORS.inkSoft,
              textTransform: "uppercase",
            }}
          >
            {questionGroups.map((g, i) => (
              <span
                key={i}
                style={{
                  color: openGroup === i ? COLORS.royal : COLORS.inkSoft,
                  fontWeight: openGroup === i ? 600 : 400,
                  transition: "color .2s",
                }}
              >
                {g.progressLabel}
              </span>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
          {questionGroups.map((group, gi) => (
            <div
              key={gi}
              style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 18,
                boxShadow: "0 12px 30px -18px rgba(0,96,100,0.20)",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => handleGroupToggle(gi)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 15.5,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: COLORS.ink,
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 12,
                      color: doneGroups.includes(gi) ? COLORS.cream : COLORS.royal,
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      border: `1.4px solid ${COLORS.royal}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: doneGroups.includes(gi) ? COLORS.royal : "transparent",
                      transition: "background .2s, color .2s",
                    }}
                  >
                    {gi + 1}
                  </span>
                  {group.label}
                </div>
                <span
                  style={{
                    color: COLORS.inkSoft,
                    display: "inline-block",
                    transform: openGroup === gi ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform .25s ease",
                    fontSize: 18,
                  }}
                >
                  ⌄
                </span>
              </button>

              {openGroup === gi && (
                <div
                  style={{
                    padding: "0 24px 26px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 26,
                  }}
                >
                  {group.questions.map((q, qi) => (
                    <div key={qi}>
                      <span
                        style={{
                          display: "block",
                          fontWeight: 600,
                          fontSize: 14.5,
                          marginBottom: 4,
                          color: COLORS.ink,
                        }}
                      >
                        {q.text}
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 10.5,
                          color: COLORS.inkSoft,
                          letterSpacing: "0.04em",
                          marginBottom: 12,
                          textTransform: "uppercase",
                        }}
                      >
                        Select one
                      </span>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: 10,
                        }}
                      >
                        {q.options.map((opt, oi) => {
                          const checked = answers[q.name] === opt;
                          return (
                            <label
                              key={oi}
                              style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                border: `1.4px solid ${checked ? COLORS.royal : COLORS.line}`,
                                borderRadius: 10,
                                padding: "11px 14px",
                                fontSize: 13.8,
                                cursor: "pointer",
                                background: checked ? COLORS.stampTint : "transparent",
                                transition: "border-color .15s ease, background .15s ease",
                                color: COLORS.ink,
                              }}
                            >
                              <input
                                type="radio"
                                name={`${gi}-${q.name}`}
                                value={opt}
                                checked={checked}
                                onChange={() => handleAnswer(q.name, opt)}
                                style={{ position: "absolute", opacity: 0, inset: 0, cursor: "pointer", margin: 0 }}
                              />
                              <span
                                style={{
                                  width: 16,
                                  height: 16,
                                  borderRadius: "50%",
                                  border: `1.6px solid ${checked ? COLORS.royal : COLORS.inkSoft}`,
                                  flexShrink: 0,
                                  position: "relative",
                                  transition: "border-color .15s ease",
                                }}
                              >
                                {checked && (
                                  <span
                                    style={{
                                      position: "absolute",
                                      inset: 3,
                                      borderRadius: "50%",
                                      background: COLORS.royal,
                                    }}
                                  />
                                )}
                              </span>
                              {opt}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Drop-in replacement for your ResultsSection component.
// Assumes COLORS, styles, and Eyebrow are already defined in your app.
// Replace the API_ENDPOINT constant with your real endpoint URL.

// Drop-in replacement for your ResultsSection component.
// Assumes COLORS, styles, Eyebrow, and API_BASE are already defined in your app.
import API_BASE from "../../config";

function ResultsSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    intake: "",
    destination: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [serverError, setServerError] = useState("");

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear the field error as the user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    const next = {};

    if (!formData.fullName.trim()) {
      next.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      next.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      next.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      next.phone = "Phone number is required.";
    } else if (!/^\+?[\d\s\-().]{7,20}$/.test(formData.phone.trim())) {
      next.phone = "Please enter a valid phone number with country code.";
    }

    if (!formData.qualification.trim()) {
      next.qualification = "Please enter your current qualification.";
    }

    if (!formData.intake.trim()) {
      next.intake = "Please enter your preferred intake.";
    }

    // destination is optional — no validation needed

    return next;
  };

  // ── Submit ─────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to the first error
      const firstErrorId = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorId)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const response = await fetch(`${API_BASE}/api/contact-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Field names match exactly what the Laravel /api/contact-lead endpoint expects
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          mobile: formData.phone.trim(),
          message: `Qualification: ${formData.qualification.trim()} | Intake: ${formData.intake.trim()}${formData.destination.trim() ? ` | Destination: ${formData.destination.trim()}` : ""}`,
          type: "Study Abroad Lead",
          service: "Study Abroad",
        }),
      });

      const text = await response.text();
      let data = {};
      try { data = JSON.parse(text); } catch (_) {}

      if (response.status === 200 || response.status === 201) {
        setStatus("success");
      } else {
        throw new Error(data?.message || data?.error || `Server error (${response.status}).`);
      }
    } catch (err) {
      setStatus("error");
      setServerError(
        err.message || "Something went wrong. Please try again or contact us directly."
      );
    }
  };

  // ── Shared styles ──────────────────────────────────────────────
  const inputStyle = (fieldId) => ({
    width: "100%",
    border: `1.4px solid ${errors[fieldId] ? "#e53935" : COLORS.line}`,
    borderRadius: 10,
    padding: "12px 14px",
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    background: COLORS.cream,
    color: COLORS.ink,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .15s ease",
  });

  const labelStyle = {
    display: "block",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: COLORS.inkSoft,
    marginBottom: 7,
  };

  const errorStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    color: "#e53935",
    marginTop: 5,
  };

  const fields = [
    { id: "fullName", label: "Full Name", placeholder: "Enter your full name", type: "text" },
    { id: "email", label: "Email Address", placeholder: "you@example.com", type: "email" },
    { id: "phone", label: "Phone Number (with Country Code)", placeholder: "+1 555 000 0000", type: "tel" },
    { id: "qualification", label: "Current Academic Qualification", placeholder: "e.g. Bachelor's in Commerce", type: "text" },
    { id: "intake", label: "Preferred Intake (Month / Year)", placeholder: "e.g. September 2026", type: "text" },
    { id: "destination", label: "Preferred Study Destination", placeholder: "If you already have one in mind", type: "text", optional: true },
  ];

  // ── Success state ──────────────────────────────────────────────
  const SuccessView = () => (
    <div style={{ textAlign: "center", padding: "24px 0" }}>
      {/* Animated checkmark */}
      <svg viewBox="0 0 80 80" style={{ width: 72, height: 72, margin: "0 auto 20px" }}>
        <circle cx="40" cy="40" r="36" fill="none" stroke={COLORS.royal} strokeWidth="2" />
        <polyline
          points="22,41 34,53 58,29"
          fill="none"
          stroke={COLORS.royal}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "clamp(20px, 3vw, 26px)",
          color: COLORS.navy,
          margin: "0 0 12px",
          fontWeight: 600,
        }}
      >
        Your Report Is On Its Way
      </h3>
      <p style={{ color: COLORS.inkSoft, fontSize: 14.8, lineHeight: 1.6, maxWidth: 380, margin: "0 auto" }}>
        Thank you, <strong style={{ color: COLORS.ink }}>{formData.fullName.split(" ")[0]}</strong>. A Langma
        International Advisor will send your personalised Global Mobility Report to{" "}
        <strong style={{ color: COLORS.ink }}>{formData.email}</strong> shortly.
      </p>
    </div>
  );

  // ── Render ─────────────────────────────────────────────────────
  return (
    <section
      id="results"
      style={{
        padding: "48px 0 36px",
        background: COLORS.white,
        position: "relative",
      }}
    >
      <div style={styles.wrap}>
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            background: `linear-gradient(${COLORS.white}, ${COLORS.white}) padding-box, linear-gradient(135deg, ${COLORS.royal}, ${COLORS.gold}) border-box`,
            backgroundClip: "padding-box, border-box",
            border: "1px solid transparent",
            borderRadius: 28,
            boxShadow: "0 20px 50px -25px rgba(0,96,100,0.28)",
            padding: "44px 40px",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Verified badge */}
          <svg
            viewBox="0 0 100 100"
            style={{ position: "absolute", top: -30, right: 30, width: 80, height: 80 }}
          >
            <circle cx="50" cy="50" r="46" stroke={COLORS.royal} strokeWidth="1.4" fill="none" />
            <circle cx="50" cy="50" r="38" stroke={COLORS.royal} strokeWidth="1" fill="none" />
            <text x="50" y="47" textAnchor="middle" fontFamily="'Fraunces', serif" fontSize="11" fontWeight="700" fill={COLORS.royal}>
              VERIFIED
            </text>
            <text x="50" y="60" textAnchor="middle" fontFamily="'Fraunces', serif" fontSize="7" fill={COLORS.royal}>
              PROFILE
            </text>
          </svg>

          {/* ── Success view ── */}
          {status === "success" ? (
            <SuccessView />
          ) : (
            <>
              <Eyebrow>Your Results</Eyebrow>
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(24px, 3vw, 30px)",
                  margin: "16px 0 14px",
                  fontWeight: 600,
                  color: COLORS.navy,
                }}
              >
                Your Personalized Global Mobility Report Is Ready
              </h2>
              <p style={{ color: COLORS.inkSoft, fontSize: 14.8, marginBottom: 10, textAlign: "left" }}>
                Thank you for completing the Global Mobility Assessment. Based on your responses,
                we've identified the study abroad destinations that best align with your academic
                goals, career aspirations, and future plans.
              </p>
              <p style={{ color: COLORS.inkSoft, fontSize: 14.8, marginBottom: 26, textAlign: "left" }}>
                Your results include personalised destination matches, academic pathway insights, and
                guidance on next steps — available only to you, and only once. Enter your details
                below to unlock your full Global Mobility Report.
              </p>

              {/* ── Fields ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left", marginBottom: 18 }}>
                {fields.map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} style={labelStyle}>
                      {f.label}
                      {f.optional && (
                        <span style={{ color: COLORS.inkSoft, textTransform: "none", fontStyle: "italic", fontWeight: 400 }}>
                          {" "}— optional
                        </span>
                      )}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={formData[f.id]}
                      onChange={handleChange(f.id)}
                      style={inputStyle(f.id)}
                      disabled={status === "loading"}
                      aria-describedby={errors[f.id] ? `${f.id}-error` : undefined}
                      aria-invalid={!!errors[f.id]}
                      required={!f.optional}
                    />
                    {errors[f.id] && (
                      <p id={`${f.id}-error`} style={errorStyle} role="alert">
                        {errors[f.id]}
                      </p>
                    )}
                  </div>
                ))}

                {/* Server-level error */}
                {status === "error" && serverError && (
                  <div
                    role="alert"
                    style={{
                      background: "#fff5f5",
                      border: "1px solid #ffcdd2",
                      borderRadius: 10,
                      padding: "12px 14px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13.5,
                      color: "#c62828",
                    }}
                  >
                    {serverError}
                  </div>
                )}

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 15,
                    padding: "15px 28px",
                    borderRadius: 999,
                    border: "none",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    background: status === "loading"
                      ? `${COLORS.royal}99`
                      : COLORS.royal,
                    color: COLORS.cream,
                    boxShadow: `0 14px 30px -14px rgba(23,163,152,0.55)`,
                    width: "100%",
                    transition: "transform .18s ease, background .18s ease",
                    opacity: status === "loading" ? 0.75 : 1,
                  }}
                  onMouseEnter={(e) => { if (status !== "loading") e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {status === "loading" ? (
                    <>
                      {/* Inline spinner */}
                      <svg
                        width="18" height="18" viewBox="0 0 24 24" fill="none"
                        style={{ animation: "spin 0.8s linear infinite" }}
                      >
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeDasharray="42" strokeDashoffset="12" strokeLinecap="round" />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    "Unlock My Global Mobility Report"
                  )}
                </button>
              </div>

              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11.5,
                  color: COLORS.inkSoft,
                  marginTop: 16,
                  lineHeight: 1.5,
                }}
              >
                Your information is used solely to prepare your personalized report and connect you
                with a Langma International Advisor.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
export default function LangmaGlobalMobilityAssessment() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <div style={styles.root}>
        <div style={styles.topBar} aria-hidden />

        <nav
          style={{
            position: "sticky",
            top: 3,
            zIndex: 50,
            background: "rgba(247,249,252,0.88)",
            backdropFilter: "blur(10px)",
            borderBottom: scrolled ? `1px solid ${COLORS.line}` : "1px solid transparent",
            boxShadow: scrolled ? "0 6px 24px -18px rgba(0,96,100,0.35)" : "none",
            transition: "border-color .25s ease, box-shadow .25s ease",
          }}
        >
        </nav>

        <HeroSection />
        <DestinationsSection />
        <WhySection />
        <HowSection />
        <AssessmentSection />
        <ResultsSection />
      </div>
    </>
  );
}