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
        background: hov ? "rgba(47,199,161,.1)" : "rgba(255,255,255,.05)",
        border: `1px solid ${hov ? C.tealLight : "rgba(47,199,161,.2)"}`,
        borderRadius: S.radius,
        padding: "28px 22px",
        textAlign: "center",
        transform: hov ? "translateY(-4px)" : "none",
        transition: `all ${S.transition}`,
      }}
    >
      <span style={{ fontSize:"2.2rem", marginBottom:12, display:"block" }} aria-hidden="true">{s.e}</span>
      <h4 style={{ fontFamily:F.sans, fontWeight:700, color:"#E9F7F6", fontSize:".97rem", marginBottom:7 }}>{s.t}</h4>
      <p style={{ fontFamily:F.sans, fontSize:".82rem", color:"rgba(233,247,246,.65)", lineHeight:1.65 }}>{s.d}</p>
    </div>
  );
};

const WhoWeServeSection = () => (
  <section style={{ padding:"80px 0", background:C.navyDark }}>
    <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 26px" }}>
      <div style={{ textAlign:"center", maxWidth:720, margin:"0 auto 60px" }}>
        <p style={{ fontFamily:F.sans, fontSize:".72rem", letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:8, fontWeight:600 }}>Our Learner Community</p>
        <h2 style={{ fontFamily:F.sans, fontSize:"clamp(1.9rem,4vw,2.8rem)", fontWeight:700, color:"#E9F7F6", lineHeight:1.2, margin:0 }}>Who We Serve</h2>
        <div style={{ width:48, height:3, background:C.tealLight, margin:"14px auto 0", borderRadius:2 }} />
        <p style={{ fontFamily:F.sans, fontSize:"1.05rem", color:"rgba(233,247,246,.72)", marginTop:18, lineHeight:1.7 }}>
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
