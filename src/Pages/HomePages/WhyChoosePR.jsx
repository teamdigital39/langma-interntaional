import React from "react";
import { Link } from "react-router-dom";

/* ── OTHER RESIDENCY OPTIONS ── */
const otherOptions = [
  {
    name: "Portugal Global Talent Programme",
    category: "Specialist Residence Pathway",
    badge: "Profile-Specific",
    benefits: [
      "Portugal offers residency pathways designed to attract internationally recognised professionals, entrepreneurs, researchers and innovators",
      "Eligibility requirements depend on the specific programme category and on the applicant's individual professional profile and circumstances",
      "Residency may provide access to living, working and studying in Portugal, subject to applicable Portuguese regulations",
      "A professional assessment of eligibility is recommended before any application is considered",
    ],
    note: "This overview is provided for general awareness only and does not constitute confirmation of eligibility. Programme categories, criteria and processing arrangements are determined by the Portuguese authorities and are subject to change.",
  },
  {
    name: "Malta Global Residence Programme",
    category: "Specialist Residence Pathway",
    badge: "EU-Linked",
    benefits: [
      "Designed for eligible non-EU, non-EEA and non-Swiss nationals seeking a residence status in Malta under a structured framework",
      "Applicants are required to satisfy property, compliance and other programme-specific requirements set by the Maltese authorities",
      "Malta offers a strategic Mediterranean location and access to a well-developed international business and financial services environment",
      "Individual eligibility and the suitability of this pathway relative to other Maltese residence options should always be reviewed before application",
    ],
    note: "Approval is not guaranteed and remains at the discretion of the relevant Maltese authority. Programme conditions are reviewed periodically and should be confirmed with a qualified adviser.",
  },
  {
    name: "Thailand Privilege Visa",
    category: "Long-Term Stay Programme",
    badge: "Lifestyle Route",
    benefits: [
      "Thailand offers long-term stay options through the Thailand Privilege framework, administered by the relevant Thai authority",
      "Different membership categories provide varying durations and accompanying benefits, with eligibility and fees differing by category",
      "The programme tends to appeal to globally mobile professionals, retirees, entrepreneurs and frequent visitors to Thailand",
      "Requirements, membership categories and associated benefits may change over time and should be verified at the time of application",
    ],
    note: "This is a long-term visa and lifestyle programme rather than an immigration or residency-by-investment route. Current categories and conditions should be confirmed directly with a qualified adviser before proceeding.",
  },
  {
    name: "Indonesia Second Home Visa",
    category: "Long-Term Residence Pathway",
    badge: "Emerging Route",
    benefits: [
      "Indonesia offers a Second Home Visa route for eligible foreign nationals seeking long-term residence in the country",
      "Financial and regulatory requirements apply, including evidence of qualifying funds or assets as determined by the Indonesian authorities",
      "This pathway is often considered by retirees, investors and internationally mobile individuals exploring Southeast Asia as a long-term base",
      "Applicants should verify current eligibility requirements, validity periods and any conditions before proceeding",
    ],
    note: "Programme requirements are set by the Indonesian government and may be revised. Outcomes cannot be guaranteed; a current eligibility check is recommended before any commitment is made.",
  },
];

/* ── CONSIDERATIONS ── */
const considerations = [
  {
    title: "Financial Eligibility",
    content: "Each programme sets its own financial threshold — whether an investment amount, a minimum income benchmark or a required asset base. Passive income routes such as the Portugal D7 and Spain NLV are linked to local wage indices and require verifiable recurring income from sources outside the host country. Investment routes require capital deployed into specific qualifying assets. Understanding precisely what counts as qualifying income or investment is essential before applying.",
    list: null,
  },
  {
    title: "Physical Presence Requirements",
    content: null,
    list: [
      "Investor routes such as Malta MPRP have no minimum presence requirement to maintain status once granted",
      "Passive income routes (Portugal D7, Spain NLV) expect genuine residence and substantial physical presence in the host country",
      "Digital nomad permits assume the holder is meaningfully based in the country during the permit period",
      "Entrepreneur and business permits typically require active participation in local business activity",
      "Physical presence requirements have direct tax residency implications — qualified tax advice is essential",
    ],
  },
  {
    title: "Family Inclusion",
    content: "Most residency programmes provide for the inclusion of a spouse or registered partner, minor dependent children and in certain cases dependent parents through accompanying status or family reunification provisions. The definition of a qualifying dependant, documentary requirements per family member and any additional fees vary by programme. Your adviser will outline the specific family framework for each pathway under consideration.",
    list: null,
  },
  {
    title: "Pathway to Long-Term Status",
    content: null,
    list: [
      "Investment routes: Malta MPRP and Cyprus Category 6.2 may grant permanent residence directly upon approval, subject to programme conditions",
      "Passive income routes: Portugal D7, Spain NLV and Austria permit typically require five years of qualifying lawful residence before long-term residence may be sought",
      "Digital nomad permits: temporary status only — they do not provide a direct pathway to permanent residency without transitioning to a separate qualifying category",
      "Entrepreneur routes: renewable residence with long-term pathways potentially available in most jurisdictions after meeting qualifying residence and integration criteria",
    ],
  },
  {
    title: "Total Programme Costs",
    content: "The headline investment or income figure rarely represents the full cost of a residency pathway. Applicants should plan for government application and processing fees, due diligence fees per applicant, legal and professional fees payable to licensed local counsel, document authentication and translation costs, and any property transaction taxes where applicable. For Indian applicants, TCS on outward remittances also forms part of the planning. A full itemised cost estimate specific to your family size and chosen programme is provided by your adviser before any engagement is formalised.",
    list: null,
  },
  {
    title: "Tax and Regulatory Considerations",
    content: "Establishing residence abroad does not, of itself, alter Indian tax residency — which is determined by days of physical presence in India under the Income Tax Act. For Indian residents, FEMA compliance, LRS utilisation and TCS on outward remittances require careful advance planning. We work alongside qualified Indian CA and FEMA advisers throughout to support full regulatory compliance.",
    list: null,
  },
  {
    title: "Programme Stability",
    content: "All residency programmes are administered under national law and may be revised, restructured or discontinued by the host government without notice. Programmes with a longer operating history and a stable legislative basis tend to offer greater certainty for applicants planning multi-year commitments. We monitor programme developments continuously and advise clients promptly of any material changes that may affect their selected pathway.",
    list: null,
  },
  {
    title: "Lifestyle and Practical Factors",
    content: "Beyond programme parameters, practical factors carry considerable weight for families committing to a new base. These include the quality of international schools and healthcare, English-language infrastructure, climate, travel connections, cost of living and the presence of a professional services ecosystem. Our advisory incorporates a structured assessment of these factors alongside the technical eligibility review.",
    list: null,
  },
];

/* ── COMPARISON TABLE DATA ── */
const comparisonRows = [
  { prog: "Malta MPRP", profile: "Investor", min: "€169,000+", timeline: "6–12 months", presence: "None required", status: "Permanent residence", statusGreen: true },
  { prog: "Cyprus PR 6.2", profile: "Investor", min: "€300,000", timeline: "6–9 months", presence: "Visit every 2 yrs", status: "Permanent residence", statusGreen: true },
  { prog: "Andorra Residence", profile: "Investor", min: "€600,000", timeline: "3–6 months", presence: "90 days/yr", status: "Long-term residence", statusGreen: true },
  { prog: "Portugal D7", profile: "Financially Independent", min: "Statutory benchmark", timeline: "4–8 months", presence: "Substantial", status: "PR / citizenship pathway", statusGreen: true },
  { prog: "Spain NLV", profile: "Financially Independent", min: "IPREM-linked", timeline: "2–4 months", presence: "183+ days/yr", status: "Long-term residence", statusGreen: true },
  { prog: "Portugal D8 (Nomad)", profile: "Digital Nomad", min: "~4× min. wage", timeline: "2–4 months", presence: "Resident", status: "Temporary (LT pathway possible)", statusGreen: false },
  { prog: "Malta Nomad RP", profile: "Digital Nomad", min: "€2,700/month", timeline: "1–3 months", presence: "Flexible", status: "Renewable up to 4 yrs", statusGreen: false },
  { prog: "Hungary Business RP", profile: "Business Owner", min: "Active business", timeline: "2–4 months", presence: "Resident", status: "Renewable residence", statusGreen: true },
  { prog: "USA EB-5", profile: "Investor / Business Owner", min: "USD 800,000", timeline: "Multi-year", presence: "US resident", status: "Green Card", statusGreen: true },
];

/* ── WHY LANGMA FEATURES ── */
const whyFeatures = [
  {
    icon: "🎯",
    title: "Profile-Driven Programme Selection",
    desc: "Every recommendation begins with a thorough understanding of your financial structure, income sources, family composition and professional commitments — not with the programme that carries the highest referral value.",
  },
  {
    icon: "🔍",
    title: "Eligibility and Compliance Review First",
    desc: "A preliminary review of your eligibility and documentation position precedes any programme discussion. This protects clients from investing time and resources in a pathway that would not withstand formal government due diligence.",
  },
  {
    icon: "🇮🇳",
    title: "Grounded in the Indian Context",
    desc: "We understand the Indian documentation environment, the FEMA and RBI regulatory framework, the LRS framework and TCS implications, and the practical considerations specific to HNIs, NRIs, founders and professionals based in India.",
  },
  {
    icon: "🤝",
    title: "A Single Point of Accountability",
    desc: "From the initial consultation through to receipt of your residence document, one senior adviser remains responsible for your case. You are never passed between departments or handled by successive team members.",
  },
  {
    icon: "🌐",
    title: "New Delhi-Based, Globally Connected",
    desc: "Our advisory works in close coordination with authorised legal partners and licensed agents in each programme jurisdiction — ensuring accuracy, continuity and qualified local representation at every stage.",
  },
];

/* ── JOURNEY STEPS ── */
const journeySteps = [
  { num: 1, title: "Discovery Conversation", desc: "A confidential discussion of your profile, objectives, family composition, financial position and timing — the foundation on which everything that follows is built." },
  { num: 2, title: "Eligibility & Compliance Review", desc: "A preliminary assessment of your eligibility, documentation readiness and applicable FEMA and regulatory considerations before any specific programme is formally considered." },
  { num: 3, title: "Tailored Programme Shortlist", desc: "A curated selection of residency pathways aligned with your profile, with a structured comparison of investment requirements, realistic costs, processing timelines and long-term outcomes." },
  { num: 4, title: "Document Preparation", desc: "Structured guidance on document collection, professional authentication, notarisation and translation to meet the precise requirements of your chosen programme jurisdiction." },
  { num: 5, title: "Application & Continuing Support", desc: "Submission through authorised local counsel with regular case updates. Your adviser remains accessible throughout the processing period and available for post-approval support." },
];

const WhyChoosePR = () => {
  return (
    <>
      {/* ── OTHER RESIDENCY OPTIONS ── */}
      <section className="w-full py-20 bg-[#EEF7F7]" id="other-options">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[12px] font-bold tracking-[2.5px] uppercase text-[#4FBDBA] mb-3">Beyond the Core Pathways</p>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F]">
              Other Residency Options Worth Considering
            </h2>
            <div className="w-12 h-0.5 bg-[#4FBDBA] mt-5 mb-4 mx-auto" />
            <p className="text-[#0E2A46] text-[16px] max-w-2xl mx-auto leading-relaxed">
              Not every international residency strategy requires a traditional investment migration route.
              Depending on personal goals, professional profile, family considerations and mobility requirements,
              a number of alternative residency programmes may offer suitable long-term options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {otherOptions.map((opt, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-250">
                <div className="bg-[#0C5F5F] px-5 py-4 flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[14px] font-semibold text-white leading-snug">{opt.name}</div>
                    <div className="text-[10px] font-semibold tracking-widest uppercase text-[#4FBDBA] mt-1">{opt.category}</div>
                  </div>
                  <span className="text-[10px] font-bold tracking-wide bg-[#4FBDBA]/15 border border-[#4FBDBA]/35 text-[#4FBDBA] px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0">{opt.badge}</span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <ul className="space-y-2 flex-1 mb-4">
                    {opt.benefits.map((b, j) => (
                      <li key={j} className="flex gap-2 items-start text-[13px] text-[#0E2A46] leading-relaxed">
                        <span className="text-[#2F6E73] font-bold mt-0.5 flex-shrink-0">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  {opt.note && (
                    <div className="bg-[#4FBDBA]/8 border-l-4 border-[#4FBDBA] rounded-r px-3 py-2 text-[11px] text-gray-500 leading-relaxed">
                      {opt.note}
                    </div>
                  )}
                </div>
                <div className="px-5 pb-5">
                  <a href="#meeting" className="block text-center border-2 border-[#296166] text-[#296166] hover:bg-[#296166] hover:text-white py-2 rounded-lg text-[13px] font-semibold transition-colors">
                    Discuss This Pathway
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMME CONSIDERATIONS ── */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[12px] font-bold tracking-[2.5px] uppercase text-[#4FBDBA] mb-3">Key Considerations</p>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F]">
              What to Evaluate Before Selecting a Residency Pathway
            </h2>
            <div className="w-12 h-0.5 bg-[#4FBDBA] mt-5 mb-4 mx-auto" />
            <p className="text-[#0E2A46] text-[16px] max-w-2xl mx-auto leading-relaxed">
              A well-chosen residency programme should align with your financial profile, family situation,
              physical presence capacity and long-term intentions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {considerations.map((c, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                <h3 className="text-[22px] font-semibold text-[#296166] mb-3">{c.title}</h3>
                {c.content && (
                  <p className="text-[16px] text-[#0E2A46] leading-relaxed">{c.content}</p>
                )}
                {c.list && (
                  <ul className="space-y-2">
                    {c.list.map((item, j) => (
                      <li key={j} className="flex gap-2.5 items-start text-[16px] text-[#0E2A46] leading-relaxed">
                        <span className="text-[#2F6E73] font-bold mt-0.5 flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a href="#meeting" className="inline-flex items-center gap-2 bg-[#2F6E73] hover:bg-[#296166] text-white px-8 py-3.5 rounded-lg font-semibold text-[14px] transition-all hover:-translate-y-0.5 hover:shadow-lg">
              Request a Tailored Programme Assessment
            </a>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 bg-[#4FBDBA] hover:bg-[#3aa8a5] text-white px-8 py-3.5 rounded-lg font-semibold text-[14px] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
              Take Free Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="w-full py-20 bg-[#EEF7F7]" id="compare">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[12px] font-bold tracking-[2.5px] uppercase text-[#4FBDBA] mb-3">Side-by-Side Comparison</p>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F]">Key Residency Programmes at a Glance</h2>
            <div className="w-12 h-0.5 bg-[#4FBDBA] mt-5 mb-4 mx-auto" />
            <p className="text-[#0E2A46] text-[16px] max-w-2xl mx-auto leading-relaxed">
              A structured reference overview of the principal pathways in our advisory. All investment thresholds,
              income benchmarks and processing timelines are indicative and subject to change.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="w-full border-collapse text-[14px] bg-white">
              <thead>
                <tr className="bg-[#0C5F5F] text-white">
                  {["Programme", "Client Profile", "Min. Investment / Income", "Indicative Timeline", "Physical Presence", "Long-Term Status"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left font-semibold text-[12px] tracking-widest uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={`border-b border-gray-100 ${i % 2 === 1 ? "bg-[#F8FDFD]" : ""}`}>
                    <td className="px-5 py-3.5 font-semibold text-[#0C5F5F] whitespace-nowrap text-[14px]">{row.prog}</td>
                    <td className="px-5 py-3.5 text-[#0E2A46] text-[14px]">{row.profile}</td>
                    <td className="px-5 py-3.5 font-semibold text-[#0C5F5F] text-[14px]">{row.min}</td>
                    <td className="px-5 py-3.5 text-[#0E2A46] whitespace-nowrap text-[14px]">{row.timeline}</td>
                    <td className="px-5 py-3.5 text-[#0E2A46] text-[14px]">{row.presence}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[12px] font-bold px-2 py-0.5 rounded ${
                        row.statusGreen ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── INDIA RELEVANCE BANNER ── */}
      <section className="w-full py-14 bg-[#0E2A46] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(79,189,186,0.1) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[12px] font-bold tracking-[2.5px] uppercase text-[#4FBDBA] mb-3">For Indian Professionals, Investors & Families</p>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-white leading-tight mb-4">
              International Residency as Part of{" "}
              <em className="not-italic text-[#4FBDBA]">Long-Term Family Planning</em>
            </h2>
            <div className="w-12 h-0.5 bg-[#4FBDBA] mb-6" />
            <p className="text-white/70 text-[16px] leading-relaxed mb-6">
              India's entrepreneurial and professional class increasingly seeks a structured international dimension
              to long-term family planning — not to replace life in India, but to build options for children's
              education, healthcare access, business connectivity and a considered second base abroad.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "A foreign residence permit does not affect Indian citizenship — the Indian passport is retained in full throughout",
                "European permanent residence and long-term permits provide Schengen Area travel access alongside the right to reside in the host country",
                "The RBI Liberalised Remittance Scheme permits outward remittances up to USD 250,000 per financial year for qualifying purposes",
                "TCS on outward remittances should be factored into total planning cost — a qualified Indian CA should be engaged from the outset",
                "Programmes are available for diverse Indian profiles — HNIs, NRIs, active founders, senior professionals, retired executives and multi-generational families",
              ].map((pt, i) => (
                <li key={i} className="flex gap-3 items-start text-[16px] text-white/80 leading-relaxed">
                  <span className="text-[#4FBDBA] font-bold flex-shrink-0 mt-0.5">→</span>
                  {pt}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href="#meeting" className="inline-flex items-center gap-2 bg-[#2F6E73] hover:bg-[#296166] text-white px-7 py-3 rounded-lg font-semibold text-[14px] transition-all hover:-translate-y-0.5 hover:shadow-lg">
                Discuss Your Situation
              </a>
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 bg-[#4FBDBA] hover:bg-[#3aa8a5] text-white px-7 py-3 rounded-lg font-semibold text-[14px] transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
                Free Assessment
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              { num: "4", label: "Distinct advisory pathways — investor, financially independent, digital nomad, business owner" },
              { num: "EU", label: "Schengen Area access for qualifying European residence permit holders" },
              { num: "FEMA", label: "Indian regulatory compliance — FEMA, LRS and TCS guidance integrated from the outset" },
              { num: "USD 250k", label: "RBI LRS annual outward remittance limit per resident individual, subject to applicable TCS provisions" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-[#4FBDBA]/20 rounded-xl p-6">
                <div className="text-[28px] font-bold text-[#4FBDBA]">{stat.num}</div>
                <div className="text-[12px] text-white/55 mt-2 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY LANGMA ── */}
      <section className="w-full py-20 bg-[#EEF7F7]" id="about">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-gradient-to-br from-[#0C5F5F] to-[#2F6E73] rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(79,189,186,0.2) 0%, transparent 70%)" }} />
            <div className="relative z-10 grid grid-cols-2 gap-6">
              {[
                { num: "15+", label: "Curated residence programmes across Europe, the Americas and beyond" },
                { num: "100%", label: "Government-regulated pathways — no unverified or unapproved schemes presented" },
                { num: "Delhi\nBased", label: "New Delhi advisory office — discreet in-person consultations available" },
                { num: "End-to-End", label: "Eligibility review, documentation, legal coordination and post-approval support" },
              ].map((n, i) => (
                <div key={i} className="border border-[#4FBDBA]/25 rounded-xl p-5">
                  <div className="text-[24px] font-bold text-[#4FBDBA] whitespace-pre-line leading-tight">{n.num}</div>
                  <div className="text-[12px] text-white/60 mt-2 leading-snug">{n.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[12px] font-bold tracking-[2.5px] uppercase text-[#4FBDBA] mb-3">Why Langma International</p>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F] leading-tight mb-4">
              Advisory That Places Your Interests First
            </h2>
            <div className="w-12 h-0.5 bg-[#4FBDBA] mb-5" />
            <p className="text-[#0E2A46] text-[16px] leading-relaxed mb-8">
              Committing to a long-term residence pathway is among the most considered decisions a family makes.
              Our role is to ensure that before any commitment is entered into, you understand the realistic costs,
              the genuine timelines, the tax implications and the long-term outcomes — specific to your circumstances.
            </p>

            <div className="space-y-6">
              {whyFeatures.map((f, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-11 h-11 flex-shrink-0 bg-[#4FBDBA]/10 border border-[#4FBDBA]/25 rounded-xl flex items-center justify-center text-[18px]">
                    {f.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-[16px] text-[#296166] mb-1">{f.title}</div>
                    <div className="text-[14px] text-[#0E2A46] leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT JOURNEY ── */}
      <section className="w-full py-20 bg-white" id="journey">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[12px] font-bold tracking-[2.5px] uppercase text-[#4FBDBA] mb-3">The Process</p>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F]">A Structured, Five-Stage Engagement</h2>
            <div className="w-12 h-0.5 bg-[#4FBDBA] mt-5 mb-4 mx-auto" />
            <p className="text-[#0E2A46] text-[16px] max-w-xl mx-auto leading-relaxed">
              Our engagement is deliberately measured. Residency decisions of this scale are best made once,
              made well, and made with complete, accurate information in hand.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-0">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4FBDBA] to-[#4FBDBA]/30 z-0" />
            {journeySteps.map((step) => (
              <div key={step.num} className="relative z-10 text-center px-4 mb-8 md:mb-0">
                <div className="w-16 h-16 bg-white border-[3px] border-[#4FBDBA] rounded-full flex items-center justify-center text-[22px] font-bold text-[#0C5F5F] mx-auto mb-5 relative z-20">
                  {step.num}
                </div>
                <div className="font-semibold text-[14px] text-[#296166] mb-2">{step.title}</div>
                <div className="text-[13px] text-[#0E2A46] leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChoosePR;
