import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import PRByInvestment from "./PRByInvestment";
import WhyChoosePR from "./WhyChoosePR";
import WhoCanApply from "./WhoCanApply";
import InvestmentOption from "./InvestmentOption";
import ResidencyFinder from "./Form";

const Investment1 = () => {
  return (
    <>
      <section className="w-full bg-white pt-12 pb-16 sm:py-14 relative overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-10 lg:grid-cols-[1fr_400px] items-center">
          <div className="relative rounded-xl px-4 sm:px-8 py-6 md:py-10 overflow-hidden font-sans order-2 lg:order-1">
            <div className="absolute left-0 top-16 bottom-16 w-[3px] rounded-full bg-gradient-to-b from-transparent via-[#2FC7A1] to-transparent" />

            <div className="inline-flex items-center gap-2 border border-[#2FC7A1]/40 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FC7A1]" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#2FC7A1]">
                Residency &amp; Global Mobility
              </span>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <span className="w-7 h-[1.5px] bg-[#296166]" />
              <span className="text-[11px] tracking-[0.12em] uppercase text-[#296166] font-medium">
                Langma International
              </span>
            </div>

            <h1
              className="text-gray-900 font-bold leading-[1.08] mb-2 max-w-[600px]"
              style={{ fontSize: "clamp(30px, 4.5vw, 44px)" }}
            >
              Considered Pathways to{" "}
              <span className="italic font-bold text-[#4FA3D1]">International Residence.</span>
            </h1>

            <p className="text-[17px] leading-[1.7] text-gray-600 max-w-[520px] mt-5 mb-8">
              A discreet, advisory-led approach to long-term residence and permanent residency planning
              across carefully selected jurisdictions — for investors, financially independent individuals,
              remote professionals and business owners who need clear guidance, not a sales process.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-10">
              <a
                href="#programs"
                className="w-full sm:w-auto bg-[#296166] text-[#F5F2EC] rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 tracking-wide hover:bg-[#1f4a4e] transition-all duration-200"
              >
                Explore Residency Programmes
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
              <Link
                to="/assessment"
                className="w-full sm:w-auto bg-white text-[#1A2540] border-2 border-[#2FC7A1] rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 tracking-wide hover:bg-[#E6F8F3] transition-all duration-200"
              >
                <Calendar className="w-4 h-4 shrink-0 text-[#2FC7A1]" aria-hidden="true" />
                Take Free Assessment
              </Link>
              <a
                href="#meeting"
                className="w-full sm:w-auto bg-[#4FA3D1] text-white rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 tracking-wide hover:bg-[#3a8ab8] transition-colors duration-300"
              >
                Book a Consultation
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-[#D8E0EC] pt-8">
              {[
                { num: "4", label: "Client profiles — investors, financially independent, nomads, founders" },
                { num: "15+", label: "Curated residence programmes across Europe and beyond" },
                { num: "Delhi", label: "In-person advisory office, South Extension I" },
              ].map((s, i) => (
                <div key={i} className="border-l-2 border-[#2FC7A1]/50 pl-4">
                  <div className="text-[26px] font-bold text-[#296166]">{s.num}</div>
                  <div className="text-[12px] text-gray-500 mt-1 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <ResidencyFinder />
          </div>
        </div>
      </section>

      <div className="w-full bg-[#F5F8F6] border-y border-[#D8E0EC]/60 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 items-center">
          {[
            { icon: "🏛️", label: "Government-Regulated Programmes Only" },
            { icon: "🔒", label: "Strict Client Confidentiality" },
            { icon: "🌎", label: "Europe · Americas · Global Coverage" },
            { icon: "📋", label: "Client-Centric Residency Advisory" },
            { icon: "📍", label: "New Delhi Office · In-Person Consultations" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[14px] font-semibold text-[#4C5C58]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#296166] to-[#2FC7A1] flex items-center justify-center text-[14px] flex-shrink-0">
                {item.icon}
              </div>
              {item.label}
            </div>
          ))}
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 bg-[#E6F8F3] hover:bg-[#2FC7A1]/20 border border-[#2FC7A1]/40 text-[#296166] px-5 py-2 rounded-full text-[13px] font-bold transition-all"
          >
            Free Assessment
          </Link>
        </div>
      </div>

      <PRByInvestment />
      <WhyChoosePR />
      <WhoCanApply />
      <InvestmentOption />
    </>
  );
};

export default Investment1;
