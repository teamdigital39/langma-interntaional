import React, { useState } from "react";
import { C, F, S } from "./styles.jsx";

const badges = ["50+ Languages","Established 2012","New Delhi & Online","Students · Professionals · Corporates · Diplomats"];

const CTALink = ({ href, label, primary, ext }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target={ext ? "_blank" : undefined}
      rel={ext ? "noopener" : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"inline-flex", alignItems:"center", justifyContent:"center",
        minWidth:200, padding:"14px 32px", borderRadius:100,
        fontFamily:F.sans, fontWeight:700, fontSize:".95rem", textDecoration:"none",
        background: primary ? (hov ? "#243160" : C.navy) : (hov ? C.bgMint : C.bgWhite),
        color: primary ? "#F5F2EC" : C.navy,
        border: primary ? "none" : `2px solid ${hov ? C.tealLight : "#2FC7A1"}`,
        boxShadow: primary ? "0 10px 30px -15px rgba(26,37,64,.25)" : "none",
        transform: hov ? "translateY(-2px)" : "none",
        transition:`all ${S.transition}`,
      }}
    >{label}</a>
  );
};

const FinalCTASection = () => (
  <section style={{
    background: C.bgLight,
    borderTop: "1px solid #D8E0EC",
    padding:"100px 26px", textAlign:"center", position:"relative", overflow:"hidden",
  }}>
    {/* Meridian rings */}
    <div style={{ position:"absolute", inset:0, opacity:.06, pointerEvents:"none" }} aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
        <circle cx="600" cy="250" r="400" fill="none" stroke={C.teal} strokeWidth="1"/>
        <circle cx="600" cy="250" r="280" fill="none" stroke={C.teal} strokeWidth=".7"/>
        <circle cx="600" cy="250" r="160" fill="none" stroke={C.teal} strokeWidth=".5"/>
        <ellipse cx="600" cy="250" rx="400" ry="140" fill="none" stroke={C.teal} strokeWidth=".6"/>
        <line x1="0" y1="250" x2="1200" y2="250" stroke={C.teal} strokeWidth=".5"/>
        <line x1="600" y1="0" x2="600" y2="500" stroke={C.teal} strokeWidth=".5"/>
      </svg>
    </div>

    <div style={{ position:"relative", zIndex:1, maxWidth:720, margin:"0 auto" }}>
      <p style={{ fontFamily:F.sans, fontSize:".72rem", letterSpacing:".22em", textTransform:"uppercase", color:C.teal, marginBottom:14, fontWeight:600 }}>Your Next Step</p>
      <h2 style={{ fontFamily:F.sans, fontSize:"clamp(2rem,4.5vw,3.2rem)", fontWeight:700, color:C.navy, marginBottom:20, lineHeight:1.2 }}>
        The World Speaks Many Languages.<br/>
        <em style={{ color:"#4FA3D1", fontStyle:"italic" }}>Your Journey Starts Here.</em>
      </h2>
      <p style={{ fontFamily:F.sans, color:"#4C5C58", fontSize:"1.05rem", marginBottom:36, lineHeight:1.7 }}>
        Langma International has guided learners from first words to professional fluency since 2012. Tell us your goal — we'll build the right programme around it.
      </p>

      {/* Badges */}
      <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:12, marginBottom:40 }}>
        {badges.map(b => (
          <span key={b} style={{
            background:C.bgWhite, border:"1px solid rgba(47,199,161,.35)",
            borderRadius:100, padding:"8px 20px",
            fontFamily:F.sans, fontSize:".82rem", color:C.navy, fontWeight:600,
          }}>{b}</span>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display:"flex", justifyContent:"center", gap:14, flexWrap:"wrap" }}>
        <CTALink href="#counsel"                        label="Book a Consultation"  primary />
        <CTALink href="tel:+919810117094"               label="Request a Call Back"            />
        <CTALink href="https://wa.me/919810117094" ext  label="Talk to an Advisor"              />
      </div>
      <p style={{ fontFamily:F.sans, marginTop:28, fontSize:".82rem", color:"#7E8C88", letterSpacing:".04em" }}>
        Free. No obligation. Personalised to your goals.
      </p>
    </div>
  </section>
);

export default FinalCTASection;
