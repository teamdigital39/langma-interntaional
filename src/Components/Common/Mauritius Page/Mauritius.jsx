import React, { useState } from "react";
import CTASection from "../CTASection";
import FAQ from "../../../Pages/HomePages/FAQ";
import ConnectedSection from "../../../Pages/HomePages/ConnectedSection";
import GoldenVisaSection from "./GoldenVisaSection";
import EligibilityBenefits from "./EligibilityBenefits";
import GlobalPR from "../GracePages/GlobalPR";
import PopupForm from "../../PopupForm";

const Mauritius = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BANNER */}
      <section className="relative w-full overflow-hidden bg-[#F7FAFC]">
        <div className="w-full grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/Mauritiusbanner.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 md:bottom-8 ml-5 md:ml-20">
              <button onClick={() => setOpen(!open)} className="inline-flex items-center gap-2 bg-[#006064] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#17a398] transition shadow-lg">
                Let’s Connect →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONNECTED SECTION */}
      <ConnectedSection />

      {/* GOLDEN VISA SECTION WITH TABS */}
      <GoldenVisaSection activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ABOUT / INVESTMENT CONDITIONAL SECTIONS */}
      {(activeTab === null || activeTab === "investment") && (
        <>
          <EligibilityBenefits />

          <CTASection
            title="Start Your Journey"
            desc="We help you move abroad with guidance and support."
            buttonText="Book Your Free Consultation Now"
          />

          <GlobalPR />

          <FAQ />
          <PopupForm open={open} onClose={() => setOpen(false)} />
        </>
      )}
    </>
  );
};

export default Mauritius;