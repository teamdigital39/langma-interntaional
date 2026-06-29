import React from "react";
import { C, F, S, SectionHeader, Card } from "./styles.jsx";

const Icon = ({ children }) => (
  <svg style={{ width:44, height:44, stroke:C.teal, fill:"none", strokeWidth:1.5, strokeLinecap:"round", strokeLinejoin:"round", marginBottom:16 }} viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
);

const reasons = [
  {
    icon: <Icon><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/><path d="M2 12h20"/></Icon>,
    title: "Global Career Opportunities",
    desc: "Multinational employers increasingly value bilingual and multilingual professionals. A second language can set your résumé apart in competitive hiring markets, open overseas postings, and support faster career progression in globally connected industries.",
  },
  {
    icon: <Icon><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></Icon>,
    title: "International Education Pathways",
    desc: "Studying in France, Germany, Japan, South Korea, Spain, or China often requires demonstrated language proficiency. Targeted preparation with Langma International helps you meet admission and visa requirements and thrive once you arrive.",
  },
  {
    icon: <Icon><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></Icon>,
    title: "Migration & Visa Preparation",
    desc: "Many immigration pathways — for countries including Germany, France, Canada, Australia, and Japan — require language assessments. Structured language training can form a meaningful part of your migration preparation.",
  },
  {
    icon: <Icon><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></Icon>,
    title: "Business & Trade Expansion",
    desc: "Negotiating, presenting, and relationship-building in a client's language signals respect and builds trust. For businesses looking to operate across borders, language competence in the team is a strategic asset.",
  },
  {
    icon: <Icon><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></Icon>,
    title: "Cultural Intelligence",
    desc: "Language learning is cultural learning. Understanding how a language works gives you insight into how its speakers think, prioritise, and communicate — an advantage in diplomacy, international business, and cross-cultural collaboration.",
  },
  {
    icon: <Icon><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></Icon>,
    title: "Cross-Border Communication",
    desc: "Whether you are stationed abroad, working in a globally distributed team, or serving international clients, direct communication in the local language improves clarity, reduces misunderstanding, and builds lasting relationships.",
  },
];

const WhyLearnSection = () => (
  <section style={{ padding:"80px 0", background:C.bgLight }}>
    <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 26px" }}>
      <SectionHeader
        eyebrow="The Case for Language Learning"
        title="Six Reasons to Learn a Foreign Language Now"
        body="Language fluency opens doors that credentials alone cannot. It reshapes how you work, study, and connect across borders."
      />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
        {reasons.map((r, i) => (
          <Card key={i}>
            {r.icon}
            <h4 style={{ fontFamily:F.sans, fontSize:"1.1rem", fontWeight:700, color:C.tealDark, marginBottom:10 }}>{r.title}</h4>
            <p style={{ fontFamily:F.sans, fontSize:".88rem", color:C.navy, lineHeight:1.7, margin:0 }}>{r.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default WhyLearnSection;
