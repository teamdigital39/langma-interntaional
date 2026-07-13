import React from "react";
import { C, F, S } from "./styles.jsx";

const benefits = [
  "Free of charge",
  "30-minute consultation",
  "Online or in-person",
  "No obligation",
  "Personalised recommendation",
];

const AssessmentBand = () => (
  <div style={{
    background: C.bgMint,
    borderTop: "1px solid rgba(47,199,161,.18)",
    borderBottom: "1px solid rgba(47,199,161,.18)",
    padding: "80px 26px",
    position: "relative",
    overflow: "hidden",
  }}>
    {/* Meridian rings */}
    <div style={{ position:"absolute", inset:0, opacity:.08, pointerEvents:"none" }} aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
        <circle cx="600" cy="200" r="350" fill="none" stroke={C.teal} strokeWidth="1"/>
        <circle cx="600" cy="200" r="250" fill="none" stroke={C.teal} strokeWidth=".7"/>
        <circle cx="600" cy="200" r="150" fill="none" stroke={C.teal} strokeWidth=".5"/>
        <ellipse cx="600" cy="200" rx="350" ry="120" fill="none" stroke={C.teal} strokeWidth=".6"/>
        <line x1="0" y1="200" x2="1200" y2="200" stroke={C.teal} strokeWidth=".5"/>
      </svg>
    </div>

    <div style={{ maxWidth:860, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
      <p style={{ fontFamily:F.sans, fontSize:".72rem", letterSpacing:".22em", textTransform:"uppercase", color:C.teal, marginBottom:8, fontWeight:600 }}>Start Here</p>
      <h2 style={{ fontFamily:F.sans, fontSize:"clamp(1.9rem,3.5vw,2.8rem)", fontWeight:700, color:C.navy, marginBottom:18, lineHeight:1.2 }}>
        Not Sure Which Language to Learn?
      </h2>
      <p style={{ fontFamily:F.sans, color:"#4C5C58", fontSize:"1.05rem", marginBottom:40, maxWidth:620, marginLeft:"auto", marginRight:"auto", lineHeight:1.7 }}>
        Book a free language assessment session. Our counsellors will understand your goals, evaluate your current exposure, and recommend the right language, level, and programme for you.
      </p>
      <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:20, marginBottom:40 }}>
        {benefits.map(b => (
          <div key={b} style={{ display:"flex", alignItems:"center", gap:8, fontFamily:F.sans, fontSize:".88rem", color:"#4C5C58" }}>
            <span style={{ color:C.teal, fontWeight:700 }}>✓</span> {b}
          </div>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"center", gap:14, flexWrap:"wrap" }}>
        <a href="#counsel"
          style={{ display:"inline-flex", alignItems:"center", padding:"14px 32px", borderRadius:100, background:C.navy, color:"#F5F2EC", fontFamily:F.sans, fontWeight:700, fontSize:".95rem", textDecoration:"none", boxShadow:"0 10px 30px -15px rgba(26,37,64,.25)", transition:`all ${S.transition}` }}
          onMouseEnter={e => { e.currentTarget.style.background = "#243160"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.transform = "none"; }}
        >Book Free Assessment</a>
        <a href="tel:+919810117094"
          style={{ display:"inline-flex", alignItems:"center", padding:"14px 32px", borderRadius:100, background:C.bgWhite, color:C.navy, fontFamily:F.sans, fontWeight:600, fontSize:".95rem", textDecoration:"none", border:"2px solid #2FC7A1", transition:`all ${S.transition}` }}
          onMouseEnter={e => { e.currentTarget.style.background = C.bgMint; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.bgWhite; e.currentTarget.style.transform = "none"; }}
        >Call Us Now</a>
      </div>
    </div>
  </div>
);

export default AssessmentBand;
