import React, { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "What is the difference between a residence permit and permanent residency?",
    a: "A residence permit grants the legal right to live in a country for a defined period — usually one to five years — and is renewable subject to continuing to meet the programme conditions. Permanent residency is a long-term or indefinite status, generally available after a qualifying period of lawful residence or, in certain programmes, granted directly upon investment. The applicant retains their original nationality in both cases.",
  },
  {
    q: "Do I need to relocate or spend significant time in the country?",
    a: "Physical presence requirements vary materially by programme. Investor-led routes such as Malta MPRP and Cyprus PR have light or no minimum stay obligations to maintain status. Passive income routes such as the Portugal D7 and Spain NLV are designed for genuine residents and expect substantial presence in the host country. Digital nomad permits assume the holder is meaningfully based in the country during the permit's validity. Your adviser will set out the precise presence rules for each pathway you consider.",
  },
  {
    q: "Can I include my family in the application?",
    a: "Most residency programmes allow the primary applicant's spouse and dependent children to be included under a single application or through family reunification provisions. Several programmes also permit dependent parents and, in some cases, dependent adult children in full-time education. The definition of \"dependant\" and the additional fees per family member vary by programme; your adviser will outline the exact family inclusion framework.",
  },
  {
    q: "Does foreign residency affect my Indian citizenship?",
    a: "No. Holding a foreign residence permit — temporary or permanent — does not affect your Indian citizenship. You retain your Indian passport in full. India does not recognise dual citizenship, so this consideration only becomes relevant if you later choose to pursue full citizenship in another country. Residency by investment programmes leave your Indian nationality untouched.",
  },
  {
    q: "How does the RBI Liberalised Remittance Scheme apply to residency by investment?",
    a: "The RBI's LRS permits Indian resident individuals to remit up to USD 250,000 per financial year for certain permitted purposes, including specified overseas investments. Whether a particular residency-related transaction sits within the standard LRS framework depends on its structure — property acquisitions, fund subscriptions and capital injections each carry their own treatment, and certain transactions may require additional RBI or FEMA approvals. The Tax Collected at Source (TCS) framework on outward remittances should also be factored into total cost planning. Langma International works alongside qualified FEMA and CA advisers to ensure full regulatory compliance.",
  },
  {
    q: "Will holding a foreign residency affect my Indian tax position?",
    a: "Indian tax residency is determined by the number of days you physically spend in India, not by your citizenship or any foreign residency you hold. Holding a foreign residence permit does not, by itself, alter your Indian tax obligations. However, where significant time is spent abroad and genuine tax residency is established in the host country, different rules will apply. We strongly recommend that qualified Indian and host-country tax advice is taken alongside our residency advisory work.",
  },
  {
    q: "Which residency pathway is right for my situation?",
    a: "The right pathway depends on your profile (investor, financially independent individual, digital nomad or business owner), your capital structure or income sources, your timeline, your family situation and your long-term intentions. During the initial consultation we map these factors against current programme parameters and present a curated shortlist of options for considered review.",
  },
  {
    q: "What total costs should I plan for beyond the headline investment or income figure?",
    a: "The full cost of a residency pathway generally exceeds the headline investment or income figure. Plan for: government application and processing fees (which vary by programme and family size), due diligence fees per applicant, legal fees payable to licensed local counsel, document preparation (translation, apostille, notarisation), property transfer or transaction taxes where relevant, and any advisory fees. Your adviser will provide a full, itemised cost breakdown before any commitment is made.",
  },
  {
    q: "Can a residency programme be modified or closed after I have applied?",
    a: "Residency programmes are governed by national law and can be amended, suspended or closed by the host government. Applicants who have received an approval in principle are typically protected under transitional provisions, although this varies by jurisdiction. We monitor programme changes closely and update clients promptly if a pathway they are considering is affected. We also recommend acting decisively once a programme has been selected.",
  },
];

const InvestmentOption = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      {/* ── FAQ ── */}
      <section className="w-full py-20 bg-[#EEF7F7]" id="faq">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[12px] font-bold tracking-[2.5px] uppercase text-[#4FBDBA] mb-3">Frequently Asked Questions</p>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F]">
              Questions Our Clients Actually Ask
            </h2>
            <div className="w-12 h-0.5 bg-[#4FBDBA] mt-5 mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200">
                <button onClick={() => toggle(i)} className="w-full flex items-center justify-between py-5 text-left gap-4">
                  <span className="font-semibold text-[16px] text-[#296166] leading-snug">{faq.q}</span>
                  <div className={`w-6 h-6 flex-shrink-0 border-2 border-gray-200 rounded-full flex items-center justify-center text-[#4FBDBA] text-[16px] font-bold transition-all duration-200 ${openIndex === i ? "border-[#4FBDBA] rotate-45" : ""}`}>
                    +
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-96 pb-5" : "max-h-0"}`}>
                  <p className="text-[16px] text-[#0E2A46] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="w-full -mb-[40px]  py-20 bg-[#0C5F5F] relative overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(79,189,186,0.12) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-[28px] lg:text-[32px] font-bold text-white mb-4 leading-tight">
            Understand Your Real Residency Options
          </h2>
          <p className="text-white/65 text-[16px] leading-relaxed mb-10 max-w-xl mx-auto">
            Speak with a Langma International adviser and receive a personalised, no-obligation view of
            the residency pathways genuinely suited to your profile. Considered guidance, never a sales pitch.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#meeting"
              className="inline-flex items-center gap-2 bg-[#2F6E73] hover:bg-[#4FBDBA] text-white px-8 py-3.5 rounded-lg font-semibold text-[14px] transition-all hover:-translate-y-0.5 hover:shadow-lg">
              Schedule a Consultation
            </a>
            <Link to="/assessment"
              className="inline-flex items-center gap-2 bg-[#4FBDBA] hover:bg-[#3aa8a5] text-white px-8 py-3.5 rounded-lg font-semibold text-[14px] transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
              Take Free Assessment
            </Link>
            <a href="#office"
              className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-[#4FBDBA] text-white px-8 py-3.5 rounded-lg font-semibold text-[14px] transition-all">
              Visit Our Office
            </a>
            <a href="https://wa.me/919810117094"
              className="inline-flex items-center gap-2 border-2 border-[#4FBDBA]/50 hover:border-[#4FBDBA] text-[#4FBDBA] px-8 py-3.5 rounded-lg font-semibold text-[14px] transition-all">
              Speak on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default InvestmentOption;
