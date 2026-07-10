import React, { useState } from "react";
import { Link } from "react-router-dom";
import PRByInvestment from "./PRByInvestment";
import WhyChoosePR from "./WhyChoosePR";
import PRInvestmentServices from "./PRInvestmentServices";
import WhoCanApply from "./WhoCanApply";
import InvestmentOption from "./InvestmentOption";
import ResidencyFinder from "./Form";
// import PopupForm from "../PopupForm";

const Investment1 = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative w-full min-h-[92vh] bg-[#0E2A46] flex items-center overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(79,189,186,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(79,189,186,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(12,96,100,0.22) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#4FBDBA]/10 border border-[#4FBDBA]/30 px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-widest text-[#4FBDBA] uppercase mb-6">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="5" stroke="#4FBDBA" strokeWidth="1.5" />
                <circle cx="6" cy="6" r="2" fill="#4FBDBA" />
              </svg>
              Independent Residency Advisory · New Delhi
            </div>

            <h1 className="text-[28px] lg:text-[42px] font-bold text-white leading-tight mb-6">
              Considered Pathways to{" "}
              <em className="not-italic text-[#4FBDBA]">International Residence.</em>
            </h1>

            <p className="text-white/70 text-[16px] leading-relaxed mb-10 max-w-lg">
              A discreet, advisory-led approach to long-term residence and permanent residency
              planning across carefully selected jurisdictions. We work with investors,
              financially independent individuals, remote professionals and business owners
              who require clear, accurate guidance — not a sales process.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#programs"
                className="inline-flex items-center gap-2 bg-[#2F6E73] hover:bg-[#296166] text-white px-7 py-3 rounded-lg font-semibold text-[14px] transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore Residency Programmes
              </a>
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 bg-[#4FBDBA] hover:bg-[#3aa8a5] text-white px-7 py-3 rounded-lg font-semibold text-[14px] transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
                Take Free Assessment
              </Link>
              <a
                href="#meeting"
                className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-[#4FBDBA] text-white px-7 py-3 rounded-lg font-semibold text-[14px] transition-all"
              >
                Book a Consultation
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: "4", label: "Distinct client profiles — investors, financially independent, digital nomads, founders" },
                { num: "15+", label: "Curated residence permit programmes across Europe and beyond" },
                { num: "Delhi", label: "In-person advisory office, South Extension I, New Delhi" },
              ].map((s, i) => (
                <div key={i} className="border-l-2 border-[#4FBDBA]/40 pl-4">
                  <div className="text-[28px] font-bold text-[#4FBDBA]">{s.num}</div>
                  <div className="text-[12px] text-white/55 mt-1 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quick Assessment Card */}
          <ResidencyFinder />
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="w-full bg-white border-b border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 items-center">
          {[
            { icon: "🏛️", label: "Government-Regulated Programmes Only" },
            { icon: "🔒", label: "Strict Client Confidentiality" },
            { icon: "🌎", label: "Europe · Americas · Global Coverage" },
            { icon: "📋", label: "Client-Centric Residency Advisory" },
            { icon: "📍", label: "New Delhi Office · In-Person Consultations" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[14px] font-semibold text-gray-500">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2F6E73] to-[#4FBDBA] flex items-center justify-center text-[14px] flex-shrink-0">
                {item.icon}
              </div>
              {item.label}
            </div>
          ))}
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 bg-[#4FBDBA]/10 hover:bg-[#4FBDBA]/20 border border-[#4FBDBA]/40 text-[#296166] px-5 py-2 rounded-full text-[13px] font-bold transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            Free Assessment
          </Link>
        </div>
      </div>

      {/* ── PAGE SECTIONS ── */}
      <PRByInvestment />
      <WhyChoosePR />
      {/* <PRInvestmentServices /> */}
      <WhoCanApply />
      <InvestmentOption />

      {/* <PopupForm open={open} onClose={() => setOpen(false)} /> */}
    </>
  );
};

export default Investment1;
