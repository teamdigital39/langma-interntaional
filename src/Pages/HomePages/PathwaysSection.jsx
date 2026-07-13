import React, { useState } from "react";
import { C, F, S, SectionHeader } from "./styles.jsx";

const pathways = [
  { num:"01", title:"Students",                         items:["Foundation through advanced levels (A1–C2)","Academic vocabulary and writing skills","Language for university admission","Cultural orientation for destination country"] },
  { num:"02", title:"Working Professionals",             items:["Evening and weekend batch options","Business communication focus","Industry-specific vocabulary","Fast-track options for urgent timelines"] },
  { num:"03", title:"Corporate Employees",               items:["Group training tailored to the organisation","Cross-cultural communication modules","Client-facing language skills","Flexible scheduling — on-site or online"] },
  { num:"04", title:"Government & Diplomats",            items:["Protocol and formal register training","Diplomatic correspondence language","Country-specific cultural briefing","Confidential one-to-one sessions"] },
  { num:"05", title:"Study Abroad Aspirants",            items:["Destination language preparation","Proficiency exam readiness","Everyday conversational fluency","Campus life vocabulary"] },
  { num:"06", title:"Job Seekers & Migration Aspirants", items:["Language for interview and workplace readiness","Visa and PR language requirements","Country-specific communication training","Everyday living language skills"] },
];

const PathCard = ({ p }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.bgWhite,
        border: `1px solid ${hov ? C.tealLight : "#D8E0EC"}`,
        borderRadius: S.radius,
        padding: "28px 26px",
        position: "relative",
        overflow: "hidden",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 16px 40px -20px rgba(41,97,102,.15)" : "0 4px 16px -8px rgba(26,37,64,.06)",
        transition: `all ${S.transition}`,
      }}
    >
      {/* Ghost number watermark */}
      <div style={{
        position:"absolute", bottom:-10, right:14,
        fontFamily:F.sans, fontSize:"5rem", fontWeight:800,
        color:"rgba(41,97,102,.06)", lineHeight:1,
        pointerEvents:"none", userSelect:"none",
      }}>{p.num}</div>

      <span style={{ fontFamily:F.sans, fontSize:".7rem", letterSpacing:".18em", color:C.teal, textTransform:"uppercase", fontWeight:700, marginBottom:8, display:"block" }}>
        Pathway {p.num}
      </span>
      <h4 style={{ fontFamily:F.sans, fontWeight:700, color:C.navy, fontSize:"1.05rem", marginBottom:14 }}>{p.title}</h4>
      <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:8 }}>
        {p.items.map((item, j) => (
          <li key={j} style={{ fontFamily:F.sans, fontSize:".87rem", color:"#4C5C58", display:"flex", alignItems:"baseline", gap:8 }}>
            <span style={{ color:C.tealLight, flexShrink:0, fontWeight:700 }}>—</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PathwaysSection = () => (
  <section id="pathways" style={{ padding:"80px 0", background:C.bgLight }}>
    <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 26px" }}>
      <div style={{ textAlign:"center", maxWidth:720, margin:"0 auto 60px" }}>
        <p style={{ fontFamily:F.sans, fontSize:".72rem", letterSpacing:".22em", textTransform:"uppercase", color:C.teal, marginBottom:8, fontWeight:600 }}>Tailored Learning Journeys</p>
        <h2 style={{ fontFamily:F.sans, fontSize:"clamp(1.9rem,4vw,2.8rem)", fontWeight:700, color:C.navy, lineHeight:1.2, margin:0 }}>Language Learning Pathways</h2>
        <div style={{ width:48, height:3, background:C.tealLight, margin:"14px auto 0", borderRadius:2 }} />
        <p style={{ fontFamily:F.sans, fontSize:"1.05rem", color:"#4C5C58", marginTop:18, lineHeight:1.7 }}>
          Every learner arrives with a different goal. Langma International designs programmes around where you are and where you need to go.
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:22 }}>
        {pathways.map(p => <PathCard key={p.num} p={p} />)}
      </div>
    </div>
  </section>
);

export default PathwaysSection;
