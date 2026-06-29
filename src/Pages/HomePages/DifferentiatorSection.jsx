import React from "react";
import { C, F, S, SectionHeader, Card } from "./styles.jsx";

const Icon = ({ children }) => (
  <svg style={{ width:44, height:44, stroke:C.teal, fill:"none", strokeWidth:1.5, strokeLinecap:"round", strokeLinejoin:"round", marginBottom:16 }} viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
);

const cards = [
  {
    icon: <Icon><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></Icon>,
    title: "Expert & Native Trainers",
    desc:  "Our trainers combine native-level fluency with professional teaching backgrounds in diplomacy, business, and academia — expertise that shapes every lesson, not just the syllabus.",
  },
  {
    icon: <Icon><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></Icon>,
    title: "Every Format. Every Learner.",
    desc:  "Full-time weekday, weekend, fast-track, one-to-one, corporate group, online — each format is purpose-built, not a repurposed classroom template.",
  },
  {
    icon: <Icon><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></Icon>,
    title: "Communication-First Methodology",
    desc:  "Spoken fluency, situational vocabulary, and real-world usage take priority. Learners leave each session with skills they can use immediately.",
  },
  {
    icon: <Icon><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></Icon>,
    title: "Certification Exam Preparation",
    desc:  "Structured preparation for recognised international language certifications — covering format, question types, and timed practice so you perform with confidence.",
  },
  {
    icon: <Icon><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></Icon>,
    title: "Programmes, Not Generic Courses",
    desc:  "Students, professionals, diplomats, corporations, government staff, and migration aspirants each receive structured programmes designed for their specific context and goals.",
  },
  {
    icon: <Icon><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></Icon>,
    title: "Outcome-Oriented by Design",
    desc:  "Whether the goal is a global career, a study visa, a business partnership, or a diplomatic posting — every programme is designed around that destination from the first lesson.",
  },
];

const DifferentiatorSection = () => (
  <section style={{ padding:"80px 0", background:C.bgWhite }}>
    <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 26px" }}>
      <SectionHeader
        eyebrow="What Makes Us Different"
        title="The Langma International Standard"
        body="Training since 2012, across 10+ learner segments, in 50+ languages — here is what distinguishes a Langma International programme."
      />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
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

export default DifferentiatorSection;
