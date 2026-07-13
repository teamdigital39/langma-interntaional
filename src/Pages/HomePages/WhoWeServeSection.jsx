import React, { useState } from "react";
import { C, F, S, SectionHeader } from "./styles.jsx";

const segments = [
  { e:"🎓", t:"Students",                   d:"School and university students preparing for study abroad, entrance language tests, or personal development." },
  { e:"💼", t:"Working Professionals",       d:"Employees adding a new language to accelerate career growth, international transfers, or client communication." },
  { e:"🏢", t:"Corporates & MNCs",           d:"Businesses training client-facing teams, overseas assignees, and leadership in cross-cultural communication." },
  { e:"🌍", t:"Embassies & Consulates",      d:"Diplomatic missions and consular staff requiring language support for communication, protocol, and community engagement." },
  { e:"🏛️", t:"Government Departments",     d:"Central and state government officials, defence, and public service personnel requiring language training for assignments or liaison roles." },
  { e:"✈️", t:"Study Abroad Aspirants",     d:"Students preparing for language-based university admissions and everyday life in their destination country." },
  { e:"🌐", t:"Global Workforce Aspirants",  d:"Job seekers and migration aspirants adding language skills to strengthen their international applications and settlement readiness." },
];

const ServeCard = ({ s }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.bgWhite,
        border: `1px solid ${hov ? C.tealLight : "#D8E0EC"}`,
        borderRadius: S.radius,
        padding: "28px 22px",
        textAlign: "center",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 16px 40px -20px rgba(41,97,102,.15)" : "0 4px 16px -8px rgba(26,37,64,.06)",
        transition: `all ${S.transition}`,
      }}
    >
      <span style={{ fontSize:"2.2rem", marginBottom:12, display:"block" }} aria-hidden="true">{s.e}</span>
      <h4 style={{ fontFamily:F.sans, fontWeight:700, color:C.navy, fontSize:".97rem", marginBottom:7 }}>{s.t}</h4>
      <p style={{ fontFamily:F.sans, fontSize:".82rem", color:"#4C5C58", lineHeight:1.65 }}>{s.d}</p>
    </div>
  );
};

const WhoWeServeSection = () => (
  <section style={{ padding:"80px 0", background:C.bgWhite }}>
    <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 26px" }}>
      <div style={{ textAlign:"center", maxWidth:720, margin:"0 auto 60px" }}>
        <p style={{ fontFamily:F.sans, fontSize:".72rem", letterSpacing:".22em", textTransform:"uppercase", color:C.teal, marginBottom:8, fontWeight:600 }}>Our Learner Community</p>
        <h2 style={{ fontFamily:F.sans, fontSize:"clamp(1.9rem,4vw,2.8rem)", fontWeight:700, color:C.navy, lineHeight:1.2, margin:0 }}>Who We Serve</h2>
        <div style={{ width:48, height:3, background:C.tealLight, margin:"14px auto 0", borderRadius:2 }} />
        <p style={{ fontFamily:F.sans, fontSize:"1.05rem", color:"#4C5C58", marginTop:18, lineHeight:1.7 }}>
          From first-time language learners to multinational corporations and diplomatic missions — Langma International programmes are built around your goals, schedule, and destination.
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:18 }}>
        {segments.map((s, i) => <ServeCard key={i} s={s} />)}
      </div>
    </div>
  </section>
);

export default WhoWeServeSection;
