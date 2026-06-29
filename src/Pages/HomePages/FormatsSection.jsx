import React, { useState } from "react";
import { C, F, S, SectionHeader } from "./styles.jsx";

const formats = [
  { icon:"💻", title:"Online Live Classes",     desc:"Instructor-led, interactive sessions via video conferencing. Learn from anywhere, with the same quality as in-person training.",                                                               badge:"All Languages" },
  { icon:"🏛️", title:"Offline Campus Classes",  desc:"In-person sessions at our South Extension, New Delhi centre. Immersive, face-to-face learning with fellow students and direct trainer interaction.",                                         badge:"New Delhi" },
  { icon:"📅", title:"Weekend Batches",          desc:"Saturday–Sunday sessions designed for working professionals who cannot attend weekday classes without disrupting their schedule.",                                                             badge:"Sat–Sun" },
  { icon:"⚡", title:"Fast-Track Programmes",    desc:"Intensive, compressed-timeline courses for learners who need to reach functional proficiency quickly — before an assignment, visa interview, or intake date.",                               badge:"Intensive" },
  { icon:"🏢", title:"Corporate Training",       desc:"Customised group programmes for organisations, delivered on-site or online. Content is tailored to your industry, teams, and business communication goals.",                                badge:"Groups · Custom" },
  { icon:"👤", title:"One-to-One Training",      desc:"Fully personalised sessions at your pace, schedule, and focus. Ideal for diplomats, executives, and learners with specific communication needs.",                                           badge:"Personalised" },
];

const FormatCard = ({ f }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.bgWhite,
        border: `1px solid ${hov ? C.tealLight : "rgba(47,199,161,.2)"}`,
        borderRadius: S.radius,
        padding: "36px 28px",
        textAlign: "center",
        boxShadow: hov ? "0 8px 28px rgba(0,96,100,.14)" : "0 2px 10px rgba(14,42,70,.06)",
        transform: hov ? "translateY(-6px)" : "none",
        transition: `all ${S.transition}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position:"absolute", top:0, left:0, height:3,
        width: hov ? "100%" : "0%",
        background: `linear-gradient(90deg,${C.teal},${C.tealLight})`,
        transition:`width .4s cubic-bezier(.4,0,.2,1)`,
        borderRadius:`${S.radius} ${S.radius} 0 0`,
      }}/>
      <span style={{ fontSize:"2.2rem", marginBottom:14, display:"block" }} aria-hidden="true">{f.icon}</span>
      <h4 style={{ fontFamily:F.sans, fontSize:"1.05rem", fontWeight:700, color:C.navyDark, marginBottom:10 }}>{f.title}</h4>
      <p style={{ fontFamily:F.sans, fontSize:".88rem", color:C.navy, lineHeight:1.65 }}>{f.desc}</p>
      <span style={{
        display:"inline-block", marginTop:14,
        fontFamily:F.sans, fontSize:".72rem", fontWeight:700,
        background:"rgba(0,96,100,.1)", color:C.teal,
        padding:"4px 12px", borderRadius:20,
      }}>{f.badge}</span>
    </div>
  );
};

const FormatsSection = () => (
  <section id="formats" style={{ padding:"80px 0", background:C.bgLight }}>
    <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 26px" }}>
      <SectionHeader
        eyebrow="How We Deliver"
        title="Learning Formats"
        body="Choose the format that fits your schedule, learning style, and goals. All formats are delivered by qualified trainers."
      />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:20 }}>
        {formats.map((f, i) => <FormatCard key={i} f={f} />)}
      </div>
    </div>
  </section>
);

export default FormatsSection;
