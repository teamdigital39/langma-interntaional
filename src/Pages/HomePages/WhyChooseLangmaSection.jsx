import React from "react";
import { C, F, S, SectionHeader, Card } from "./styles.jsx";

const Icon = ({ children }) => (
  <svg style={{ width:44, height:44, stroke:C.teal, fill:"none", strokeWidth:1.5, strokeLinecap:"round", strokeLinejoin:"round", marginBottom:16 }} viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
);

const cards = [
  {
    icon: <Icon><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/><path d="M2 12h20"/></Icon>,
    title: "50+ Global Languages",
    desc:  "European, Asian, Middle Eastern, South Asian, and African languages under one roof — one of India's broadest language portfolios. From French and Japanese to Arabic and Swahili.",
  },
  {
    icon: <Icon><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></Icon>,
    title: "Flexible Learning Formats",
    desc:  "Online live classes, on-campus sessions in New Delhi, weekend batches, fast-track programmes, and one-to-one training — structured around your schedule, not the other way around.",
  },
  {
    icon: <Icon><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></Icon>,
    title: "Career & Global Mobility Focus",
    desc:  "Every programme is built around outcomes — career advancement, international assignments, study abroad, or migration. Language proficiency you can use from day one.",
  },
  {
    icon: <Icon><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></Icon>,
    title: "Expert-Led Training",
    desc:  "Qualified trainers with native or near-native fluency and real-world professional backgrounds. Small batches, individual attention, and measurable progress at every level.",
  },
];

const WhyChooseLangmaSection = () => (
  <section style={{ padding:"80px 0", background:C.bgLight }}>
    <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 26px" }}>
      <SectionHeader
        eyebrow="Our Difference"
        title="Why Learners Choose Langma International"
        body="Established in 2012, Langma International has built a reputation for structured, outcome-focused language training — trusted by students, professionals, corporations, and diplomatic missions across India and beyond."
      />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:22 }}>
        {cards.map((c, i) => (
          <Card key={i}>
            {c.icon}
            <h4 style={{ fontFamily:F.sans, fontSize:"1.1rem", fontWeight:700, color:C.tealDark, marginBottom:10 }}>{c.title}</h4>
            <p style={{ fontFamily:F.sans, fontSize:".88rem", color:C.navy, lineHeight:1.7, margin:0 }}>{c.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseLangmaSection;
