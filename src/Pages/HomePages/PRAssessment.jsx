import React, { useState } from "react";
import { Link } from "react-router-dom";
import API_BASE from "../../config.js";

/* ── DATA ── */
const SECTIONS = ["Objectives", "Finances", "Family", "Mobility", "Vision"];

const QUESTIONS = [
  {
    section: 1, sectionName: "Objectives",
    label: "Section 1 — Your Primary Objective",
    q: "What is your main reason for seeking international residency?",
    name: "q1",
    options: [
      { value: "mobility",    label: "Greater global mobility and travel freedom" },
      { value: "family",      label: "Long-term family security" },
      { value: "business",    label: "Business expansion opportunities" },
      { value: "lifestyle",   label: "International lifestyle and relocation" },
      { value: "settlement",  label: "Future residency and settlement planning" },
    ],
  },
  {
    section: 1, sectionName: "Objectives",
    label: "Section 1 — Your Primary Objective",
    q: "Which profile best describes you?",
    name: "q2",
    options: [
      { value: "investor",     label: "Investor" },
      { value: "entrepreneur", label: "Business Owner / Entrepreneur" },
      { value: "professional", label: "Senior Professional" },
      { value: "nomad",        label: "Remote Worker / Digital Nomad" },
      { value: "independent",  label: "Financially Independent Individual" },
    ],
  },
  {
    section: 2, sectionName: "Finances",
    label: "Section 2 — Investment & Financial Profile",
    q: "What investment range are you comfortable considering?",
    name: "q3",
    options: [
      { value: "below150k", label: "Below €150,000" },
      { value: "150-300k",  label: "€150,000 – €300,000" },
      { value: "300-500k",  label: "€300,000 – €500,000" },
      { value: "500k-1m",   label: "€500,000 – €1 Million" },
      { value: "above1m",   label: "Above €1 Million" },
    ],
  },
  {
    section: 2, sectionName: "Finances",
    label: "Section 2 — Investment & Financial Profile",
    q: "Which investment approach do you prefer?",
    name: "q4",
    options: [
      { value: "realestate", label: "Real estate-based investment" },
      { value: "bizinvest",  label: "Business investment" },
      { value: "passive",    label: "Passive income route" },
      { value: "flexible",   label: "Flexible options depending on benefits" },
    ],
  },
  {
    section: 3, sectionName: "Family",
    label: "Section 3 — Family & Lifestyle Priorities",
    q: "Will family members be included in your application?",
    name: "q5",
    options: [
      { value: "solo",               label: "Only myself" },
      { value: "spouse",             label: "Spouse" },
      { value: "spousekids",         label: "Spouse and children" },
      { value: "multigenerational",  label: "Multi-generational family" },
      { value: "undecided",          label: "Not decided yet" },
    ],
  },
  {
    section: 3, sectionName: "Family",
    label: "Section 3 — Family & Lifestyle Priorities",
    q: "What type of lifestyle appeals most to you?",
    name: "q6",
    options: [
      { value: "med",    label: "Mediterranean European lifestyle" },
      { value: "bizhub", label: "Modern international business hub" },
      { value: "family", label: "Family-focused community" },
      { value: "tax",    label: "Tax-efficient environment" },
      { value: "global", label: "Flexible global mobility lifestyle" },
    ],
  },
  {
    section: 4, sectionName: "Mobility",
    label: "Section 4 — Mobility & Residency Goals",
    q: "Which benefit is most important?",
    name: "q7",
    options: [
      { value: "schengen",    label: "Schengen Area access" },
      { value: "pr",          label: "Long-term permanent residency" },
      { value: "citizenship", label: "Pathway toward citizenship eligibility" },
      { value: "business",    label: "International business opportunities" },
      { value: "flexibility", label: "Geographic flexibility" },
    ],
  },
  {
    section: 4, sectionName: "Mobility",
    label: "Section 4 — Mobility & Residency Goals",
    q: "How much physical presence can you realistically commit?",
    name: "q8",
    options: [
      { value: "minimal",    label: "Minimal stay requirements preferred" },
      { value: "fewweeks",   label: "A few weeks annually" },
      { value: "months",     label: "Several months annually" },
      { value: "relocate",   label: "Flexible to relocate" },
      { value: "fullreloc",  label: "Open to full relocation" },
    ],
  },
  {
    section: 5, sectionName: "Vision",
    label: "Section 5 — Your Future Vision",
    q: "Where do you see yourself in the next 5–10 years?",
    name: "q9",
    options: [
      { value: "intl",       label: "Living internationally" },
      { value: "globalbiz",  label: "Managing a global business" },
      { value: "secondbase", label: "Building a second base for my family" },
      { value: "freedom",    label: "Enjoying financial and lifestyle flexibility" },
      { value: "citizenship",label: "Exploring future citizenship opportunities" },
    ],
  },
  {
    section: 5, sectionName: "Vision",
    label: "Section 5 — Your Future Vision",
    q: "What matters most when choosing a residency program?",
    name: "q10",
    options: [
      { value: "reputation", label: "Reputation and stability" },
      { value: "family",     label: "Family benefits" },
      { value: "security",   label: "Investment security" },
      { value: "speed",      label: "Speed of approval" },
      { value: "longterm",   label: "Long-term opportunities" },
    ],
  },
];

const DEST_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-[#296166]" fill="none" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    ),
    num: "01", title: "European Permanent Residency",
    desc: "Access EU-linked permanent residency through Malta, Cyprus, and Portugal — with stability, security, and long-term settlement rights.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-[#296166]" fill="none" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"/>
      </svg>
    ),
    num: "02", title: "Global Mobility & Schengen Access",
    desc: "Unlock borderless travel across 26+ Schengen nations. Ideal for frequent travellers and internationally mobile professionals.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-[#296166]" fill="none" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    num: "03", title: "Entrepreneur & Business Expansion Pathways",
    desc: "Launch or scale internationally with Hungary's Business Residency, Portugal's Startup Visa, or the USA EB-5 Investor Pathway.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-[#296166]" fill="none" strokeWidth="1.5" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    num: "04", title: "Family-Oriented Residency Solutions",
    desc: "Secure your family's future with programs that include spouses, children, and multi-generational family under a single application.",
  },
];

const FACTOR_CARDS = [
  { label: "Investment Capacity", icon: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#296166]" fill="none" strokeWidth="1.6"><ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg> },
  { label: "Family Objectives", icon: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#296166]" fill="none" strokeWidth="1.6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label: "Global Mobility Goals", icon: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#296166]" fill="none" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"/></svg> },
  { label: "Business Expansion Plans", icon: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#296166]" fill="none" strokeWidth="1.6"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
  { label: "Lifestyle Preferences", icon: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#296166]" fill="none" strokeWidth="1.6"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/></svg> },
  { label: "Long-Term Residency Aspirations", icon: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#296166]" fill="none" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
];

const HOW_STEPS = [
  { num: "01", title: "Complete the Assessment", desc: "Answer a focused series of questions about your residency objectives, investment range, family situation, and lifestyle priorities.", outcome: "A structured picture of your residency profile — built in minutes, not months." },
  { num: "02", title: "Receive Personalized Residency Matches", desc: "Our assessment evaluates your responses and identifies residency programs genuinely aligned with your profile and financial capacity.", outcome: "A curated shortlist built around your goals — not generic program rankings." },
  { num: "03", title: "Explore Suitable Programs", desc: "Receive clear insights into your matched residency destinations — including investment requirements, timelines, family inclusion, and mobility benefits.", outcome: "Real context for every program — financial, legal, and lifestyle." },
  { num: "04", title: "Connect With A Langma Advisor", desc: "Book a consultation with a Langma International Residency Advisor to develop your personalized international residency strategy.", outcome: "A clear path forward — guided by an expert, not navigated alone." },
];

const VALUE_CHECKS = [
  "Personalized Residency Recommendations",
  "Family Inclusion & Long-Term Planning Insights",
  "Investment & Financial Suitability Analysis",
  "Global Mobility & Lifestyle Matching",
  "Expert Guidance From Langma Residency Advisors",
];

/* ── SUBCOMPONENTS ── */
const CheckIcon = () => (
  <svg viewBox="0 0 12 10" className="w-[10px] h-[10px]" fill="none" aria-hidden="true">
    <polyline points="1,5 4,9 11,1" stroke="#2FC7A1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PassportCard = () => (
  <div className="bg-white rounded-2xl shadow-2xl p-7 relative overflow-hidden border border-white/20">
    {/* top stripe */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1A2540] via-[#2FC7A1] to-[#2FC7A1]" />
    <div className="flex justify-between items-center mb-5">
      <span className="font-mono text-[10px] tracking-widest uppercase text-gray-400">Residency Assessment</span>
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1A2540] to-[#296166] flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#2FC7A1" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"/>
        </svg>
      </div>
    </div>
    <div className="flex items-center gap-3 mb-5">
      <div className="flex-1">
        <span className="block font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-1">From</span>
        <strong className="text-[20px] font-bold text-[#1A2540]">Your Goals</strong>
      </div>
      <span className="text-[#2FC7A1] text-[22px]">→</span>
      <div className="flex-1">
        <span className="block font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-1">To</span>
        <strong className="text-[20px] font-bold text-[#1A2540]">Your Residency</strong>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-5">
      {["Europe", "Investment", "Family", "Digital Nomad"].map((t, i) => (
        <span key={t} className={`font-mono text-[10px] tracking-wider px-2.5 py-1 rounded border ${
          i === 1 ? "bg-[#2FC7A1]/10 text-[#1A2540] border-[#2FC7A1]/25" :
          i === 2 ? "bg-[#2FC7A1]/10 text-[#296166] border-[#2FC7A1]/25" :
                    "bg-[#1A2540]/7 text-[#296166] border-[#1A2540]/12"
        }`}>{t}</span>
      ))}
    </div>
    {/* perforation */}
    <div className="relative h-0 border-t-2 border-dashed border-gray-200 mx-[-28px] my-0">
      <div className="absolute -top-[11px] -left-[11px] w-[22px] h-[22px] rounded-full bg-[#F7F9FC]" />
      <div className="absolute -top-[11px] -right-[11px] w-[22px] h-[22px] rounded-full bg-[#F7F9FC]" />
    </div>
    <div className="flex items-center justify-between pt-4">
      <div>
        <span className="block font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-1">Status</span>
        <strong className="text-[14px] font-semibold text-[#1A2540]">Match In Progress</strong>
      </div>
      {/* stamp */}
      <svg width="62" height="62" viewBox="0 0 100 100" className="opacity-85" style={{ transform: "rotate(-8deg)" }} aria-hidden="true">
        <circle cx="50" cy="50" r="46" fill="none" stroke="#296166" strokeWidth="1.4"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="#296166" strokeWidth="1"/>
        <path id="pStampArc" d="M 50,12 A 38,38 0 1 1 49.9,12" fill="none"/>
        <text><textPath href="#pStampArc" fontFamily="monospace" fontSize="6.4" letterSpacing="1.5" fill="#296166">LANGMA · GLOBAL RESIDENCY · </textPath></text>
        <text x="50" y="47" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="700" fill="#296166">VERIFIED</text>
        <text x="50" y="60" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#296166">PROFILE</text>
      </svg>
    </div>
  </div>
);

/* ── WIZARD PROGRESS ── */
const WizardProgress = ({ current }) => {
  const pct = Math.round((current / 10) * 100);
  const section = QUESTIONS[current]?.section ?? 1;
  const sectionName = QUESTIONS[current]?.sectionName ?? "Objectives";

  return (
    <div className="max-w-[760px] mx-auto mt-10 mb-12">
      <div className="flex justify-between items-center mb-3">
        <span className="font-mono text-[11px] tracking-wider text-[#296166] font-medium">
          Section {section} of 5 — {sectionName}
        </span>
        <span className="font-mono text-[11px] text-gray-400">{pct}% complete</span>
      </div>
      <div className="flex gap-1.5" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        {[1,2,3,4,5].map((s) => {
          const posInSec = current - (section - 1) * 2;
          let fill = 0;
          if (s < section) fill = 100;
          else if (s === section) fill = (posInSec / 2) * 100;
          return (
            <div key={s} className="flex-1 h-[5px] rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#296166] to-[#2FC7A1] transition-all duration-300"
                style={{ width: `${fill}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2.5">
        {SECTIONS.map((s, i) => (
          <span key={s} className={`font-mono text-[10px] tracking-wider uppercase ${i + 1 === section ? "text-[#296166] font-semibold" : "text-gray-400"}`}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

const validateName = (name) => /^[A-Za-z\s]{2,}$/.test(name.trim());
const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email.trim());
const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);

const formatAssessmentAnswers = (answers) =>
  QUESTIONS.map((q) => {
    const val = answers[q.name];
    const opt = q.options.find((o) => o.value === val);
    return `${q.q}: ${opt?.label || val || "Not answered"}`;
  }).join(" | ");

/* ── MAIN COMPONENT ── */
const PRAssessment = () => {
  const [current, setCurrent] = useState(0);        // 0-indexed question
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  // Lead form state
  const [form, setForm] = useState({ name: "", email: "", phone: "", nationality: "", residence: "", program: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const q = QUESTIONS[current];
  const TOTAL = QUESTIONS.length;

  const handleSelect = (name, value) => setAnswers((prev) => ({ ...prev, [name]: value }));

  const handleNext = () => {
    if (current < TOTAL - 1) {
      setCurrent((c) => c + 1);
    } else {
      setDone(true);
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleBack = () => { if (current > 0) setCurrent((c) => c - 1); };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const next = name === "phone" ? value.replace(/\D/g, "") : value;
    setForm((prev) => ({ ...prev, [name]: next }));
    setErrorMsg("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = {};
    if (!form.name.trim()) validationErrors.name = "Name is required";
    else if (!validateName(form.name)) validationErrors.name = "Only alphabets (min 2 chars)";

    if (!form.email.trim()) validationErrors.email = "Email is required";
    else if (!validateEmail(form.email)) validationErrors.email = "Invalid email";

    if (!form.phone.trim()) validationErrors.phone = "Phone is required";
    else if (!validatePhone(form.phone)) validationErrors.phone = "Enter valid 10-15 digit number";

    if (!form.nationality.trim()) validationErrors.nationality = "Nationality is required";
    if (!form.residence.trim()) validationErrors.residence = "Residence is required";
    if (!form.budget) validationErrors.budget = "Please select your investment range";

    if (Object.keys(validationErrors).length > 0) {
      setErrorMsg(Object.values(validationErrors)[0]);
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.phone.trim(),
        message: [
          "PR residency assessment report request.",
          `Nationality: ${form.nationality.trim()}.`,
          `Current residence: ${form.residence.trim()}.`,
          form.program ? `Preferred program: ${form.program}.` : "",
          `Investment budget: ${form.budget}.`,
          `Assessment answers: ${formatAssessmentAnswers(answers)}.`,
        ].filter(Boolean).join(" "),
        type: "Residency Assessment",
        service: "PR by Investment",
      };

      const response = await fetch(`${API_BASE}/api/contact-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F7F9FC] min-h-screen">


      {/* ── HERO ── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#1A2540] via-[#2FC7A1] to-[#296166] pt-20 pb-24" role="banner">
        {/* dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1.4px)", backgroundSize: "22px 22px" }}
        />
        {/* radial glows */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(47,199,161,0.12) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(47,199,161,0.12) 0%, transparent 50%)" }} />

        {/* animated route lines */}
        <svg className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-20" viewBox="0 0 600 500" aria-hidden="true" focusable="false">
          <path d="M0,250 Q150,80 300,200 T600,180" stroke="#2FC7A1" strokeWidth="1" fill="none" strokeDasharray="180" style={{ animation: "routePulse 5s ease-in-out infinite" }}/>
          <path d="M50,400 Q200,250 350,320 T600,300" stroke="#2FC7A1" strokeWidth="1" fill="none" strokeDasharray="180" style={{ animation: "routePulse 5s ease-in-out infinite", animationDelay: "-2s" }}/>
          <path d="M0,100 Q250,300 450,150 T600,400" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" strokeDasharray="180" style={{ animation: "routePulse 5s ease-in-out infinite", animationDelay: "-3.5s" }}/>
          <circle cx="300" cy="200" r="5" fill="#2FC7A1" opacity="0.6"/>
          <circle cx="450" cy="150" r="4" fill="#2FC7A1" opacity="0.6"/>
          <circle cx="200" cy="320" r="3.5" fill="rgba(255,255,255,0.5)" opacity="0.6"/>
        </svg>
        <style>{`@keyframes routePulse{0%,100%{stroke-dashoffset:200;}50%{stroke-dashoffset:0;}}`}</style>

        <div className="relative z-10 max-w-[1180px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2.5 font-mono text-[12px] tracking-[0.14em] uppercase text-[#2FC7A1] mb-4">
              <span className="w-[7px] h-[7px] rounded-full bg-[#2FC7A1] flex-shrink-0" />
              Langma Global Residency Assessment™
            </span>
            <h1 className="text-[28px] lg:text-[48px] font-bold text-white leading-[1.07] mb-5">
              Your International Residency Journey Starts With One Strategic Decision
            </h1>
            <p className="text-[17px] text-white/75 max-w-[500px] mb-6 leading-relaxed">
              Discover the residency pathway that aligns with your lifestyle goals, family priorities, business ambitions, and long-term global mobility plans.
            </p>
            <ul className="space-y-3 mb-8" aria-label="Assessment benefits">
              {VALUE_CHECKS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] text-white/88 leading-snug">
                  <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[#2FC7A1]/20 border border-[#2FC7A1] flex items-center justify-center">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 items-center">
              <a href="#assessment" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2FC7A1] to-[#296166] text-white px-7 py-3.5 rounded-full font-bold text-[15px] hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl">
                Start My Assessment
              </a>
              <a href="#results" className="inline-flex items-center gap-2 border border-white/25 text-white/85 px-6 py-3.5 rounded-full font-semibold text-[14px] hover:border-[#2FC7A1] hover:text-[#2FC7A1] transition-all">
                Book A Free Consultation
              </a>
            </div>
          </div>

          {/* Right — Passport card */}
          <div className="hidden lg:block">
            <PassportCard />
          </div>
        </div>
      </header>

      {/* ── TRUST BAR ── */}
      <div className="bg-[#1A2540] py-5 border-t border-white/5" role="complementary" aria-label="Trust indicators">
        <div className="max-w-[1180px] mx-auto px-7 flex items-center justify-center gap-12 flex-wrap">
          {[
            { label: "Trusted Advisory", icon: <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="#2FC7A1" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
            { label: "11+ Residency Programs", icon: <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="#2FC7A1" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"/></svg> },
            { label: "Family-Inclusive Planning", icon: <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="#2FC7A1" strokeWidth="1.6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
            { label: "No Obligation Assessment", icon: <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="#2FC7A1" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 12l2 2 4-4"/></svg> },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 font-mono text-[11px] tracking-wider uppercase text-white/60">
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── DESTINATIONS ── */}
      <section className="relative py-24 bg-gradient-to-b from-white to-[#F5F8F6] overflow-hidden" id="destinations">
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: "radial-gradient(circle, rgba(12,95,95,0.07) 1px, transparent 1.4px)", backgroundSize: "22px 22px" }} />
        <div className="relative z-10 max-w-[1180px] mx-auto px-7">
          <div className="text-center max-w-[680px] mx-auto mb-14">
            <span className="inline-flex items-center gap-2.5 font-mono text-[12px] tracking-[0.14em] uppercase text-[#296166] mb-4">
              <span className="w-[7px] h-[7px] rounded-full bg-[#2FC7A1]" />Residency Pathways
            </span>
            <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1A2540] mt-3 mb-4">Discover Your Residency Pathway</h2>
            <p className="text-[16px] text-[#1B2B28]">From European permanent residency to entrepreneur pathways and digital nomad permits — our global residency ecosystem covers every profile, priority, and investment level.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DEST_CARDS.map((card) => (
              <div key={card.num} className="group bg-white/60 backdrop-blur border border-white/80 rounded-2xl p-6 shadow-md hover:-translate-y-1.5 hover:shadow-xl hover:border-[#1A2540]/20 transition-all duration-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1A2540] to-[#2FC7A1] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1A2540]/7 to-[#2FC7A1]/10 border border-[#1A2540]/10 flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <span className="block font-mono text-[10px] text-[#2FC7A1] tracking-wider mb-2">{card.num}</span>
                <h4 className="text-[15px] font-semibold text-[#1A2540] mb-2 leading-snug">{card.title}</h4>
                <p className="text-[13px] text-[#1B2B28] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY THIS ASSESSMENT ── */}
      <section className="py-24 bg-[#F7F9FC]" id="why">
        <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 items-start">
          <div>
            <span className="inline-flex items-center gap-2.5 font-mono text-[12px] tracking-[0.14em] uppercase text-[#296166] mb-4">
              <span className="w-[7px] h-[7px] rounded-full bg-[#2FC7A1]" />The Strategy Behind The Decision
            </span>
            <h2 className="text-[28px] lg:text-[34px] font-bold text-[#1A2540] mt-3 mb-5">Why Take the Residency Assessment?</h2>
            <p className="text-[16px] text-[#1B2B28] leading-relaxed mb-4">Choosing a residency program is rarely a straightforward decision. It's shaped by your investment capacity, your family's needs, your business ambitions, and the life you want to build across borders.</p>
            <p className="text-[16px] text-[#1B2B28] leading-relaxed mb-4">Most individuals approach this decision with fragmented information — generic program brochures, conflicting online advice, and no structured framework to evaluate their real suitability. This assessment changes that by evaluating all the factors that genuinely determine program success and long-term satisfaction.</p>
            <p className="text-[16px] text-[#1B2B28] leading-relaxed mb-6"><strong className="text-[#1A2540]">Every recommendation that follows is grounded in your unique profile — not a generic ranking of popular programs.</strong> That's the difference between guessing your residency and planning it with an expert Langma advisor at your side.</p>
            <a href="#assessment" className="inline-flex items-center gap-1.5 font-mono text-[13px] tracking-wider text-[#296166] border-b border-[#296166] pb-0.5 hover:text-[#2FC7A1] hover:border-[#2FC7A1] transition-colors">
              Begin Your Assessment →
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3.5" aria-label="Assessment evaluation factors">
            {FACTOR_CARDS.map((f) => (
              <div key={f.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A2540]/7 to-[#2FC7A1]/10 flex items-center justify-center">
                  {f.icon}
                </div>
                <span className="text-[13px] font-semibold text-[#1A2540]">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-[#F5F8F6] relative" id="how">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="text-center max-w-[560px] mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 font-mono text-[12px] tracking-[0.14em] uppercase text-[#296166] mb-4">
              <span className="w-[7px] h-[7px] rounded-full bg-[#2FC7A1]" />Your Path To Residency
            </span>
            <h2 className="text-[28px] lg:text-[34px] font-bold text-[#1A2540] mt-3">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* connector line */}
            <div className="hidden lg:block absolute top-[23px] left-[6%] right-[6%] h-[1.5px] z-0" style={{ background: "repeating-linear-gradient(90deg, #296166 0 8px, transparent 8px 16px)", opacity: 0.4 }} />
            {HOW_STEPS.map((step) => (
              <div key={step.num} className="relative z-10 bg-[#F7F9FC] border border-gray-100 rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-all duration-200">
                <div className="w-[46px] h-[46px] rounded-full border-[1.6px] border-[#296166] flex items-center justify-center mb-5 bg-white relative">
                  <div className="absolute inset-[5px] rounded-full border border-[#1A2540]/16" />
                  <span className="font-mono font-medium text-[14px] text-[#296166]">{step.num}</span>
                </div>
                <h3 className="text-[16px] font-semibold text-[#1A2540] mb-2 leading-snug">{step.title}</h3>
                <p className="text-[13px] text-[#1B2B28] leading-relaxed mb-3">{step.desc}</p>
                <div className="font-mono text-[11px] text-[#296166] bg-[#2FC7A1]/10 border border-[#2FC7A1]/15 px-3 py-2 rounded-lg leading-snug">
                  {step.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ASSESSMENT WIZARD ── */}
      <section className="py-24 bg-[#F7F9FC]" id="assessment">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="text-center max-w-[620px] mx-auto mb-4">
            <span className="inline-flex items-center gap-2.5 font-mono text-[12px] tracking-[0.14em] uppercase text-[#296166] mb-4">
              <span className="w-[7px] h-[7px] rounded-full bg-[#2FC7A1]" />Your Assessment
            </span>
            <h2 className="text-[28px] lg:text-[34px] font-bold text-[#1A2540] mt-3 mb-3">10 Strategic Questions</h2>
            <p className="text-[15px] text-[#1B2B28]">No right or wrong answers — just clarity. Each question helps us match you with the right residency pathway.</p>
          </div>

          {!done ? (
            <>
              <WizardProgress current={current} />

              <div className="max-w-[760px] mx-auto">
                {/* Question card */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-8 mb-4">
                  <div className="font-mono text-[10px] tracking-wider uppercase text-[#2FC7A1] mb-1.5">{q.label}</div>
                  <span className="block font-mono text-[11px] text-[#2FC7A1] mb-4">Question {current + 1} of 10</span>
                  <h3 className="text-[17px] font-semibold text-[#1A2540] mb-1.5 leading-snug">{q.q}</h3>
                  <span className="block font-mono text-[10px] tracking-wider uppercase text-gray-400 mb-5">Select one option</span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="radiogroup" aria-label={q.q}>
                    {q.options.map((opt) => {
                      const selected = answers[q.name] === opt.value;
                      return (
                        <label
                          key={opt.value}
                          className={`relative flex items-center gap-3 border rounded-[10px] px-4 py-3.5 cursor-pointer text-[13px] transition-all duration-150 ${
                            selected
                              ? "border-[#296166] bg-[#1A2540]/7 text-[#1A2540]"
                              : "border-gray-200 text-[#1B2B28] hover:border-[#1A2540]/30 hover:bg-[#1A2540]/3"
                          }`}
                        >
                          <input
                            type="radio"
                            name={q.name}
                            value={opt.value}
                            checked={selected}
                            onChange={() => handleSelect(q.name, opt.value)}
                            className="absolute opacity-0 inset-0 cursor-pointer m-0"
                          />
                          <span className={`w-[18px] h-[18px] rounded-full border flex-shrink-0 relative transition-all ${selected ? "border-[#296166]" : "border-gray-300"}`}>
                            {selected && (
                              <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-[#296166] to-[#2FC7A1]" />
                            )}
                          </span>
                          {opt.label}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Wizard nav */}
                <div className="flex items-center justify-between mt-7 px-0.5">
                  <button
                    onClick={handleBack}
                    className={`flex items-center gap-2 px-7 py-3 rounded-full border border-gray-200 text-[#1B2B28] font-semibold text-[14px] hover:border-[#1A2540] hover:text-[#1A2540] transition-all ${current === 0 ? "invisible" : ""}`}
                    aria-label="Go to previous question"
                  >
                    ← Previous
                  </button>
                  <span className="font-mono text-[11px] text-gray-400 tracking-wider">{current + 1} / {TOTAL}</span>
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-gradient-to-br from-[#1A2540] to-[#296166] text-white px-7 py-3 rounded-full font-semibold text-[14px] hover:-translate-y-0.5 hover:shadow-lg transition-all min-w-[140px] justify-center"
                    aria-label={current === TOTAL - 1 ? "View results" : "Go to next question"}
                  >
                    {current === TOTAL - 1 ? "View My Results →" : "Next →"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="max-w-[760px] mx-auto text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#2FC7A1]/15 border-2 border-[#2FC7A1] flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#296166" strokeWidth="2.5"><path d="M9 11l3 3L22 4"/></svg>
              </div>
              <p className="text-[16px] text-[#296166] font-semibold mb-2">Assessment Complete</p>
              <p className="text-[14px] text-[#1B2B28]">Scroll down to unlock your personalized residency report.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── RESULTS & LEAD CAPTURE ── */}
      <section className="py-24 bg-gradient-to-b from-[#F5F8F6] to-[#F7F9FC] relative" id="results-section">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="max-w-[580px] mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-10 relative">
            {/* badge */}
            <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1A2540] to-[#296166] text-white font-mono text-[11px] tracking-wider uppercase px-5 py-2 rounded-full shadow-lg whitespace-nowrap">
              Unlock Your Full Report
            </div>

            {!submitted ? (
              <>
                <h2 className="text-[24px] lg:text-[28px] font-bold text-[#1A2540] mt-5 mb-3">Complete Your Personalized Residency Report</h2>
                <p className="text-[14px] text-[#1B2B28] leading-relaxed mb-7">
                  Enter your details below to receive your full personalized assessment report and connect with a dedicated Langma International Residency Advisor.
                </p>

                {errorMsg && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
                    {errorMsg}
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleFormSubmit} noValidate>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] tracking-wider uppercase text-gray-500 mb-1.5">Full Name</label>
                      <input type="text" name="name" value={form.name} onChange={handleFormChange} placeholder="Enter your full name" required autoComplete="name"
                        className="w-full border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] text-[#1B2B28] bg-[#F7F9FC] focus:border-[#296166] focus:bg-white outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] tracking-wider uppercase text-gray-500 mb-1.5">Email Address</label>
                      <input type="email" name="email" value={form.email} onChange={handleFormChange} placeholder="you@example.com" required autoComplete="email"
                        className="w-full border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] text-[#1B2B28] bg-[#F7F9FC] focus:border-[#296166] focus:bg-white outline-none transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] tracking-wider uppercase text-gray-500 mb-1.5">Phone Number</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleFormChange} placeholder="+91 98101 17094" required autoComplete="tel"
                        className="w-full border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] text-[#1B2B28] bg-[#F7F9FC] focus:border-[#296166] focus:bg-white outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] tracking-wider uppercase text-gray-500 mb-1.5">Nationality</label>
                      <input type="text" name="nationality" value={form.nationality} onChange={handleFormChange} placeholder="e.g. Indian" required
                        className="w-full border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] text-[#1B2B28] bg-[#F7F9FC] focus:border-[#296166] focus:bg-white outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] tracking-wider uppercase text-gray-500 mb-1.5">Current Country of Residence</label>
                    <input type="text" name="residence" value={form.residence} onChange={handleFormChange} placeholder="e.g. India" required autoComplete="country-name"
                      className="w-full border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] text-[#1B2B28] bg-[#F7F9FC] focus:border-[#296166] focus:bg-white outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] tracking-wider uppercase text-gray-500 mb-1.5">
                      Preferred Residency Program <span className="normal-case italic text-[10px]">— optional</span>
                    </label>
                    <select name="program" value={form.program} onChange={handleFormChange}
                      className="w-full border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] text-[#1B2B28] bg-[#F7F9FC] focus:border-[#296166] focus:bg-white outline-none transition-colors appearance-none">
                      <option value="">Select a program (if you have one in mind)</option>
                      <option>Malta Permanent Residence Programme</option>
                      <option>Cyprus Permanent Residency</option>
                      <option>Portugal D7 Residence Permit</option>
                      <option>Spain Non-Lucrative Visa</option>
                      <option>Portugal Digital Nomad Visa</option>
                      <option>Malta Nomad Residence Permit</option>
                      <option>Hungary White Card</option>
                      <option>Italy Digital Nomad Visa</option>
                      <option>Hungary Business Residency</option>
                      <option>Portugal Startup Visa</option>
                      <option>USA EB-5 Investor Pathway</option>
                      <option>Not sure — advise me</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] tracking-wider uppercase text-gray-500 mb-1.5">Estimated Investment Budget</label>
                    <select name="budget" value={form.budget} onChange={handleFormChange} required
                      className="w-full border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] text-[#1B2B28] bg-[#F7F9FC] focus:border-[#296166] focus:bg-white outline-none transition-colors appearance-none">
                      <option value="">Select your investment range</option>
                      <option>Below €150,000</option>
                      <option>€150,000 – €300,000</option>
                      <option>€300,000 – €500,000</option>
                      <option>€500,000 – €1 Million</option>
                      <option>Above €1 Million</option>
                    </select>
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full bg-gradient-to-r from-[#2FC7A1] to-[#296166] text-white py-4 rounded-full font-bold text-[15px] hover:-translate-y-0.5 hover:shadow-xl transition-all shadow-lg mt-2 disabled:opacity-60 disabled:hover:translate-y-0">
                    {loading ? "Submitting..." : "Unlock My Personalized Residency Report"}
                  </button>
                </form>

                <div className="flex items-start gap-2 mt-5">
                  <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] flex-shrink-0 mt-0.5" fill="none" stroke="#2FC7A1" strokeWidth="1.6">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <p className="font-mono text-[11px] text-gray-500 leading-relaxed">
                    Your information is used solely to prepare your personalized assessment report and connect you with a Langma International Residency Advisor.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#2FC7A1]/15 border-2 border-[#2FC7A1] flex items-center justify-center mx-auto mb-5">
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#296166" strokeWidth="2.5"><path d="M9 11l3 3L22 4"/></svg>
                </div>
                <h3 className="text-[22px] font-bold text-[#1A2540] mb-3">Report Requested</h3>
                <p className="text-[16px] text-[#1B2B28] leading-relaxed">✓ Our Advisor Will Contact You Shortly</p>
                <p className="text-[14px] text-gray-500 mt-3">A Langma International Residency Advisor will reach out within one business day.</p>
                <Link to="/investment" className="inline-flex items-center gap-2 mt-7 bg-[#296166] hover:bg-[#296166] text-white px-7 py-3 rounded-full font-semibold text-[14px] transition-all">
                  ← Back to Residency Programmes
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PRAssessment;
