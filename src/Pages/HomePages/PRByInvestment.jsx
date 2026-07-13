import React, { useState } from "react";
import { Link } from "react-router-dom";

const NOTE = ({ children }) => (
  <div className="mt-4 bg-[#2FC7A1]/8 border-l-4 border-[#2FC7A1] rounded-r-md px-4 py-3 text-[12px] text-gray-500 leading-relaxed">
    {children}
  </div>
);

const ProgramCard = ({ name, category, badge, from, fromLabel, timeline, benefits, note, slug, ctaLabel = "Discuss This Pathway" }) => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-250 group">
    {/* Header */}
    <div className="bg-[#F5F8F6] px-6 py-5 flex items-start justify-between gap-3 border-b border-[#D8E0EC]">
      <div>
        <div className="text-[16px] font-semibold text-[#296166] leading-snug">{name}</div>
        <div className="text-[11px] font-semibold tracking-widest uppercase text-[#2FC7A1] mt-1">{category}</div>
      </div>
      <span className="text-[11px] font-bold tracking-wide bg-[#E6F8F3] border border-[#2FC7A1]/35 text-[#296166] px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
        {badge}
      </span>
    </div>

    {/* Body */}
    <div className="p-6 flex-1 flex flex-col">
      {(from || timeline) && (
        <div className="flex gap-6 mb-5">
          {from && (
            <div>
              <span className="block text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-0.5">{fromLabel || "From"}</span>
              <span className="text-[16px] font-semibold text-[#296166]">{from}</span>
            </div>
          )}
          {timeline && (
            <div>
              <span className="block text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-0.5">Timeline</span>
              <span className="text-[16px] font-semibold text-[#296166]">{timeline}</span>
            </div>
          )}
        </div>
      )}

      <ul className="space-y-2 flex-1 mb-5">
        {benefits.map((b, i) => (
          <li key={i} className="flex gap-2.5 items-start text-[14px] text-[#1B2B28] leading-relaxed">
            <span className="text-[#296166] font-bold mt-0.5 flex-shrink-0">✓</span>
            {b}
          </li>
        ))}
      </ul>

      {note && <NOTE>{note}</NOTE>}
    </div>

    {/* Footer */}
    <div className="px-6 pb-5 flex flex-col gap-2">
      {slug && (
        <Link
          to={slug}
          className="block text-center bg-[#296166] text-white hover:bg-[#1f4a4e] py-2.5 rounded-full text-[14px] font-semibold transition-colors"
        >
          View Programme Details
        </Link>
      )}
      <a
        href="#meeting"
        className="block text-center border-2 border-[#2FC7A1] text-[#296166] hover:bg-[#E6F8F3] py-2.5 rounded-full text-[14px] font-semibold transition-colors"
      >
        {ctaLabel}
      </a>
    </div>
  </div>
);

const TABS = [
  { id: "investors", label: "For Investors" },
  { id: "fii", label: "For Financially Independent" },
  { id: "nomads", label: "For Digital Nomads" },
  { id: "business", label: "For Business Owners" },
];

const PROGRAMS = {
  investors: [
    {
      name: "Malta Permanent Residence Programme",
      slug: "/malta-residency",
      category: "Permanent Residency by Investment",
      badge: "EU Residence",
      from: "€169,000+",
      timeline: "6–12 months",
      benefits: [
        "EU permanent residence certificate for the main applicant and qualifying dependants including spouse, dependent children and, subject to conditions, parents and parents-in-law",
        "Programme structure combines a government contribution, a qualifying property commitment (lease or purchase) and a regulated charitable donation, as established by Residency Malta Agency",
        "No minimum physical presence requirement to maintain permanent residence status once the certificate has been issued",
        "Schengen Area travel access for certificate holders",
        "English is an official language; Malta operates within a common-law influenced legal framework",
      ],
      note: "Current minimum participation costs begin from €169,000+, subject to government approval. All contributions, property thresholds, charitable donation amounts and administrative fees are set by Residency Malta Agency and are subject to revision.",
    },
    {
      name: "Cyprus Permanent Residency (Category 6.2)",
      slug: "/cyprus-pr",
      category: "Permanent Residency by Investment",
      badge: "EU Residence",
      from: "€300,000",
      timeline: "6–9 months",
      benefits: [
        "Permanent residence permit valid for life, subject to maintaining the qualifying investment and meeting the programme's ongoing conditions",
        "Qualifying investment routes include residential property in Cyprus, share capital in a Cyprus-registered company or units in a CySEC-regulated Cyprus collective investment scheme",
        "Annual secured income requirement demonstrable from a stable source outside Cyprus",
        "Spouse, dependent children and, subject to conditions, dependent parents of the main applicant and spouse may be included",
        "Applicant must visit Cyprus at least once every two years to maintain the permit",
      ],
    },
    {
      name: "Andorra Passive Residence Permit",
      slug: "/andorra-residency",
      category: "Residence Permit",
      badge: "European Residence",
      from: "€600,000",
      timeline: "3–6 months",
      benefits: [
        "Passive residence category for financially self-sufficient individuals who do not engage in local employment or professional activity in Andorra",
        "A qualifying investment in Andorran assets is required — routes may include real estate, government bonds, equity in an Andorran entity or an interest-free deposit held with the Andorran Financial Authority (AFA)",
        "Minimum physical presence in Andorra of approximately 90 days per year is required to maintain the permit",
        "Family members may be included; Andorra's personal income tax framework is distinct from EU member state regimes",
        "Andorra is not an EU member state but has customs and border agreements with France and Spain; located in the Pyrenees within reach of Barcelona and Toulouse",
      ],
    },
  ],

  fii: [
    {
      name: "Portugal D7 Visa & Residence Permit",
      slug: "/portugal-d7",
      category: "Passive Income Residency",
      badge: "Active",
      fromLabel: "Income Benchmark",
      from: "Statutory index-linked",
      timeline: "4–8 months",
      benefits: [
        "Residence visa and permit for non-EU nationals with stable, recurring passive income — pensions, dividends, rental returns, royalties or qualifying investment income — generated outside Portugal",
        "Initial two-year residence permit, renewable for successive three-year periods, subject to continuing eligibility",
        "Spouse, dependent children and, subject to conditions, dependent parents may join through family reunification provisions",
        "Schengen Area travel access during the validity of the residence permit",
        "Long-term residence and citizenship eligibility may be considered after five years of lawful residence, subject to current Portuguese nationality law and Portuguese language requirements",
      ],
      note: "Income requirements for the Portugal D7 are linked to current Portuguese statutory benchmarks and are periodically revised. Applicants should also demonstrate adequate savings for their initial period of residence and have arranged accommodation in Portugal.",
    },
    {
      name: "Spain Non-Lucrative Visa",
      slug: "/spain-nlv",
      category: "Passive Income Residency",
      badge: "Active",
      fromLabel: "Income",
      from: "IPREM-linked",
      timeline: "2–4 months",
      benefits: [
        "One-year initial residence visa, renewable in two-year increments; long-term residence may be considered after five continuous years of lawful residence in Spain",
        "Requires demonstrable passive income or accessible savings substantially above the Spanish IPREM annual reference index, with additional minimum sums per accompanying dependant",
        "Comprehensive private health insurance fully valid in Spain is mandatory throughout the permit's validity",
        "No local employment or professional activity is permitted; suited to retirees, financially self-sufficient individuals and internationally mobile families",
        "Schengen Area travel access during the validity of the permit",
      ],
      note: "Spanish tax residency rules apply after 183 days of physical presence in a calendar year. Indian residents considering extended stays in Spain should obtain qualified Indian and Spanish tax advice before committing to this route.",
    },
    {
      name: "Austria Residence Permit (Settlement Permit – Exceptionally Qualified)",
      slug: "/austria-residency",
      category: "Financially Self-Sufficient Residence",
      badge: "Quota-Based",
      fromLabel: "Profile",
      from: "High passive income",
      timeline: "6–12 months",
      benefits: [
        "Settlement permit for non-EU nationals who are financially independent and do not require employment in Austria to sustain themselves and their families",
        "Subject to a controlled annual national quota — availability is limited and well-prepared early applications are advisable",
        "Requires demonstrable secure income sufficient to cover all living costs, Austrian accommodation, comprehensive health insurance and a defined level of German language ability",
        "Schengen Area access; Austria offers a central European location with strong public institutions, infrastructure and internationally regarded schools",
        "A pathway to long-term residence and, after an extended qualifying period of lawful residence, to Austrian citizenship under current Austrian law may be available",
      ],
    },
    {
      name: "Switzerland Residence Permit (Lump-Sum Taxation)",
      slug: "/switzerland-residency",
      category: "Residence by Fiscal Arrangement",
      badge: "Discreet",
      fromLabel: "Profile",
      from: "Significant net worth",
      timeline: "3–9 months",
      benefits: [
        "Non-EU/EFTA nationals who are financially independent may obtain a Swiss residence permit through the lump-sum taxation (forfait fiscal) framework available in participating cantons",
        "The applicant negotiates an individual annual tax assessment with the relevant Swiss cantonal authority, based on living expenditure rather than global income or wealth",
        "No professional activity in Switzerland is permitted; suited to financially self-sufficient individuals and families",
        "Access to Switzerland's internationally recognised healthcare system, private schooling options, security environment and quality of life",
        "Not all Swiss cantons participate in the lump-sum taxation framework; eligibility, the minimum taxable expenditure base and the negotiation process vary by canton",
      ],
      note: "Lump-sum taxation arrangements are individually negotiated and vary significantly between participating cantons. Suitability depends on individual circumstances and financial structure and should be assessed with qualified Swiss tax and immigration counsel before any commitment is made.",
    },
  ],

  nomads: [
    {
      name: "Portugal Digital Nomad Visa (D8)",
      slug: "/portugal-d8",
      category: "Remote Work Residence",
      badge: "Active",
      fromLabel: "Income from",
      from: "~4× min. wage",
      timeline: "2–4 months",
      benefits: [
        "Dedicated residence permit for non-EU remote workers and self-employed professionals whose work is performed for clients or employers based outside Portugal",
        "Two available routes: a temporary stay authorisation of up to one year, or a residence visa leading to a renewable annual residence permit",
        "Family reunification provisions available for the spouse and dependent children of the main applicant",
        "Schengen Area travel access; a pathway to long-term residence may be considered after five years of qualifying lawful residence under current Portuguese law",
        "This is a temporary residence permit — it does not, by itself, constitute or guarantee permanent residency",
      ],
    },
    {
      name: "Hungary White Card",
      slug: "/hungary-white-card",
      category: "Digital Nomad Residence Permit",
      badge: "EU Residence",
      fromLabel: "Income from",
      from: "~€2,000/month",
      timeline: "1–2 months",
      benefits: [
        "Residence permit for non-EU nationals performing remote work exclusively for employers or clients based outside Hungary",
        "Initial permit valid for up to one year, with the possibility of one renewal for a further year",
        "Schengen Area travel access for permit holders during the permit's validity",
        "Hungary offers a comparatively lower cost of living relative to Western European capitals and a well-connected central European location",
        "Family members are not automatically granted accompanying status under the White Card framework — alternative permit categories may need to be considered for dependants",
      ],
      note: "Income thresholds and application procedures for the Hungary White Card are subject to change. Confirm current requirements with a qualified adviser before applying.",
    },
    {
      name: "Malta Nomad Residence Permit",
      slug: "/malta-nomad",
      category: "Digital Nomad Residence Permit",
      badge: "English Speaking",
      fromLabel: "Income from",
      from: "€2,700/month",
      timeline: "1–3 months",
      benefits: [
        "Residence permit for non-EU nationals who carry out their professional work entirely remotely for employers or clients based outside Malta",
        "Permit issued for one year and renewable annually for a total permitted duration of up to four years",
        "The spouse and minor dependent children of the main applicant may apply as accompanying dependants under the same framework",
        "English is one of Malta's two official languages; the jurisdiction has a well-established professional and financial services ecosystem",
        "Schengen Area travel access during the validity of the permit",
      ],
      note: "The published minimum gross monthly income threshold is subject to periodic review by Residency Malta Agency. Applicants must demonstrate valid health insurance and suitable accommodation in Malta.",
    },
    {
      name: "Spain Digital Nomad Visa",
      slug: "/spain-digital-nomad",
      category: "Remote Work Residence",
      badge: "Active",
      fromLabel: "Income from",
      from: "~€2,760/month",
      timeline: "2–4 months",
      benefits: [
        "Residence authorisation for non-EU professionals working remotely primarily for employers or clients based outside Spain; a limited proportion of income from Spanish-registered entities is permitted",
        "An initial one-year visa is available, followed by a three-year residence authorisation, renewable for a further two years",
        "Family reunification available for spouse and dependent children",
        "Applicants may wish to seek independent Spanish tax advice regarding the special non-resident income tax regime potentially available to certain qualifying international workers",
        "A pathway to long-term residence may be available after five continuous years of lawful stay in Spain, subject to meeting applicable conditions",
      ],
    },
    {
      name: "Italy Digital Nomad & Remote Worker Visa",
      slug: "/italy-digital-nomad",
      category: "Remote Work Residence",
      badge: "Active",
      fromLabel: "Income from",
      from: "~€28,000/year",
      timeline: "2–4 months",
      benefits: [
        "Dedicated visa for highly qualified non-EU nationals performing remote work or self-employed professional activity for clients or employers based outside Italy",
        "Initial residence permit valid for one year, subject to renewal provided eligibility conditions continue to be met",
        "Family reunification provisions are available for the spouse and dependent children of the main applicant",
        "Applicants must provide evidence of qualifying remote work, minimum income, comprehensive health insurance and adequate accommodation in Italy",
        "Schengen Area travel access during the permit's validity; long-term residence may be considered after meeting qualifying years of lawful residence",
      ],
    },
  ],

  business: [
    {
      name: "Hungary Business Residency",
      slug: "/hungary-business-residency",
      category: "Entrepreneur Residence Permit",
      badge: "EU Residence",
      fromLabel: "Type",
      from: "Business activity",
      timeline: "2–4 months",
      benefits: [
        "Residence permit for non-EU nationals establishing or actively managing a genuine commercial business in Hungary",
        "Requires incorporation of a Hungarian company, a demonstrated viable business activity and sufficient financial means to support the applicant and any included family members",
        "The spouse and dependent children of the main applicant may apply for accompanying family residence permits",
        "Schengen Area travel access for permit holders throughout the permit's validity",
        "Permit is renewable subject to continued business activity and compliance with Hungarian immigration and company law requirements",
      ],
    },
    {
      name: "Portugal Startup Visa (D2)",
      slug: "/portugal-startup-visa",
      category: "Entrepreneur Residency",
      badge: "Innovation Route",
      fromLabel: "Type",
      from: "Incubator-endorsed",
      timeline: "4–8 months",
      benefits: [
        "Residence visa for non-EU entrepreneurs developing or launching an innovative, scalable business that has received endorsement from a Portuguese government-certified incubator",
        "Leads to a renewable residence permit; long-term residence and citizenship may be considered after five years of lawful legal residence, subject to current Portuguese nationality law and language requirements",
        "Spouse and dependent children may join through family reunification provisions",
        "Access to Portugal's innovation ecosystem, EU single market and a range of incentive frameworks applicable to qualifying early-stage activities",
        "Suited to founders relocating with an active venture rather than passive investors placing capital",
      ],
    },
    {
      name: "USA EB-5 Immigrant Investor Pathway",
      slug: "/eb5-usa",
      category: "Green Card by Investment",
      badge: "Green Card",
      from: "USD 800,000",
      timeline: "Multi-year",
      benefits: [
        "US conditional permanent resident status (Green Card) for the main applicant, spouse and unmarried children under 21, upon approval of a qualifying EB-5 petition",
        "Minimum investment of USD 800,000 in a Targeted Employment Area (TEA) through a USCIS-designated Regional Center, or USD 1,050,000 for a non-TEA direct investment",
        "The investment must directly or indirectly create or preserve at least 10 full-time qualifying US jobs as defined under USCIS regulations",
        "Set-aside categories — rural areas, high-unemployment areas and infrastructure projects — introduced under the EB-5 Reform and Integrity Act of 2022 operate under separate visa allocation rules",
        "A pathway to unconditional Green Card and, in due course, to US citizenship eligibility under US immigration law",
      ],
      note: "Indian-born petitioners may face material visa availability waiting periods under the EB-5 unreserved categories due to annual per-country limits. Set-aside categories carry separate allocation rules and current availability should be assessed against the USCIS Visa Bulletin before committing.",
    },
  ],
};

const PRByInvestment = () => {
  const [activeTab, setActiveTab] = useState("investors");

  return (
    <section id="programs" className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <p className="text-[12px] font-bold tracking-[2.5px] uppercase text-[#2FC7A1] mb-3">Residency Pathways</p>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#296166] leading-tight">
              Residence Programmes<br />Organised Around Your Profile
            </h2>
            <div className="w-12 h-0.5 bg-[#2FC7A1] mt-5 mb-4" />
            <p className="text-[#1B2B28] text-[16px] max-w-xl leading-relaxed">
              Investors, financially self-sufficient individuals, remote professionals and business owners
              each arrive with a different starting point. We have structured our advisory around four
              distinct client profiles to help identify the pathway that genuinely reflects your circumstances.
            </p>
            <div className="mt-6">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 bg-[#296166] hover:bg-[#1f4a4e] text-white px-6 py-2.5 rounded-full font-semibold text-[14px] transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
                Not sure which pathway fits? Take the Free Assessment
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-[#F5F8F6] p-1.5 rounded-xl border border-[#D8E0EC]/60">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-[#296166] shadow-sm"
                    : "text-gray-500 hover:text-[#296166]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Program cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PROGRAMS[activeTab].map((prog, i) => (
            <ProgramCard key={i} {...prog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PRByInvestment;
