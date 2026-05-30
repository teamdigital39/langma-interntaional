import React from "react";

const EligibilityBenefits = () => {
  return (
    <section className="w-full pb-10 px-6 relative z-10">
      <div className="max-w-7xl mx-auto relative">
        {/* ================= TOP SECTION ================= */}
        <div className="relative flex flex-col lg:flex-row items-start gap-12 lg:gap-20 -mt-[30px]">
          {/* LEFT IMAGE */}
          <div className="relative w-full lg:w-auto">
            <div className="w-full h-[260px] lg:h-[360px] overflow-hidden">
              <img
                src="/images/meeting.png"
                alt="Meeting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-[#f4fbfb] rounded-2xl shadow-xl p-6 lg:p-10 w-full lg:w-[540px]">
            <h3 className="text-[#296166] font-semibold text-[26px] lg:text-[32px] mb-6">
              Eligibility Criteria
            </h3>

            <ul className="space-y-3 lg:space-y-4 text-[18px] lg:text-[25px] text-[#6D6C80]">
              {[
                "Approved financial investment",
                "Clean legal background",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 lg:gap-4">
                  <img
                    src="/images/graycheckmark.png"
                    alt="check"
                    className="w-5 h-5 lg:w-6 lg:h-6 mt-1 flex-shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="relative mt-16 lg:mt-[90px] flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-20">
          {/* BENEFITS */}
          <div className="max-w-md">
            <h3 className="text-[#296166] font-semibold text-[26px] lg:text-[32px] mb-6">
              Benefits
            </h3>

            <ul className="space-y-3 lg:space-y-4 text-[18px] lg:text-[25px] text-[#6D6C80]">
              {[
                "Access to Asia’s business ecosystem",
                "Permanent residency eligibility after 7 years",
                "Family inclusion",
                
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 lg:gap-4">
                  <img
                    src="/images/graycheckmark.png"
                    alt="check"
                    className="w-5 h-5 lg:w-6 lg:h-6 mt-1 flex-shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT IMAGE + DOTS (HIDDEN ON MOBILE) */}
          <div className="relative hidden lg:block">
            <div className="w-full h-[380px] overflow-hidden relative z-10 translate-x-[-200px]">
              <img
                src="/images/hongkongflag.png"
                alt="canadaflag"
                className="w-full h-full object-cover"
              />
            </div>

            {/* DOT IMAGE */}
            <div className="absolute bottom-[-20px] right-[-30px] z-0">
              <img src="/images/Group 5327.png" alt="Dots" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilityBenefits;
