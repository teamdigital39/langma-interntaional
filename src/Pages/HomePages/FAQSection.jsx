import React, { useState } from "react";
import { C, F, S, SectionHeader } from "./styles.jsx";

const faqs = [
  { q:"Which languages does Langma International teach?",
    a:"Langma International offers training in 50+ languages spanning European, Asian, Middle Eastern, South Asian, and African language families — including French, German, Spanish, Japanese, Korean, Mandarin Chinese, Arabic, Russian, Italian, and Portuguese. Both online and on-campus programmes are available." },
  { q:"What learning formats and schedules are available?",
    a:"Langma International offers online live classes, on-campus sessions at our New Delhi centre, weekend batches for working professionals, fast-track intensive programmes, and personalised one-to-one training. All formats are instructor-led and can be scheduled around your availability." },
  { q:"What proficiency levels do your programmes cover?",
    a:"Our programmes cover all levels from beginner (A1) through advanced (C2), aligned with the Common European Framework of Reference (CEFR) where applicable. We also offer exam-oriented preparation for recognised international language certifications." },
  { q:"Does Langma International offer corporate and diplomatic language training?",
    a:"Yes. Langma International designs customised language training programmes for businesses, MNCs, government departments, embassies, and consulates. Training is tailored to your team's industry, communication context, and timeline, and can be delivered on-site or online." },
  { q:"How do I book a free counselling session?",
    a:"Langma International offers free language counselling sessions with no obligation — in person at our South Extension, New Delhi office, by phone, or via WhatsApp. Call +91 98101 17094, email info@langmainternational.com, or use the enquiry form on this page." },
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding:"80px 0", background:C.bgWhite }}>
      <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 26px" }}>
        <SectionHeader eyebrow="Common Questions" title="Frequently Asked Questions" />
        <div style={{ maxWidth:780, margin:"0 auto" }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom:"1px solid rgba(0,96,100,.15)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  width:"100%", textAlign:"left", background:"none", border:"none",
                  padding:"20px 0", cursor:"pointer",
                  display:"flex", justifyContent:"space-between", alignItems:"center", gap:16,
                  fontFamily:F.sans, fontSize:"1rem", fontWeight:600,
                  color: open === i ? C.teal : C.navyDark,
                  transition:`color ${S.transition}`,
                }}
                onMouseEnter={e => e.currentTarget.style.color = C.teal}
                onMouseLeave={e => e.currentTarget.style.color = open === i ? C.teal : C.navyDark}
              >
                {f.q}
                <span style={{
                  flexShrink:0, width:28, height:28,
                  border:`1.5px solid ${C.teal}`, borderRadius:"50%",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"1.1rem", color:C.teal, lineHeight:1,
                  transform: open === i ? "rotate(45deg)" : "none",
                  transition:`transform ${S.transition}`,
                }}>+</span>
              </button>
              <div style={{
                maxHeight: open === i ? 300 : 0,
                overflow:"hidden",
                transition:`max-height .38s cubic-bezier(.4,0,.2,1)`,
              }}>
                <p style={{ fontFamily:F.sans, fontSize:".95rem", color:C.navy, lineHeight:1.75, paddingBottom:20 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
