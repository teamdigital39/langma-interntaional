import React from "react";

const PRByInvestment = () => {
  return (
    <section className="w-full">
      {/* ================= SECTION 1 ================= */}
      <div className="w-full bg-[#F4FEFF] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* TEXT */}
            <div>
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F] leading-snug">
                PR by Investment Secure Your Global <br />
                Future with Langma International
              </h2>

              <p className="mt-6 text-[#0E2A46] text-[16px] leading-relaxed">
                At Langma International, we unlock life-changing opportunities
                for investors and families who want more than just a visa – they
                want a global lifestyle, freedom, and future security.
              </p>

              <p className="mt-4 text-[#0E2A46] text-[16px] leading-relaxed">
                Our Permanent Residency (PR) by Investment services are designed
                to simplify your immigration journey while maximizing the
                benefits you and your loved ones receive.
              </p>

              <p className="mt-4 text-[#0E2A46] text-[16px] leading-relaxed">
                Whether you're seeking to relocate, expand business horizons,
                secure better education for your children, or enjoy world-class
                healthcare – PR by Investment is a strategic gateway to your
                desired global destination.
              </p>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center">
              <div className="relative w-full h-[290px] lg:h-[420px]">
                {/* Border Shape */}
                {/* <div className="absolute inset-0 rounded-[55%] border-2 border-[#4FBDBA]" /> */}

                {/* Image */}
                <div className="absolute inset-3  overflow-hidden bg-white">
                  <img
                    src="/images/image 2228.png"
                    alt="PR Investment"
                    className="w-full h-full "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 2 ================= */}
      <div className="w-full py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* IMAGE */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="relative w-[420px] h-[290px] lg:h-[420px]">
                {/* <div className="absolute inset-0 rounded-[55%] border-2 border-[#4FBDBA]" /> */}

                <div className="absolute inset-3  overflow-hidden bg-white">
                  <img
                    src="/images/image 2227.png"
                    alt="PR Concept"
                    className="w-full h-full "
                  />
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="order-1 lg:order-2">
              <h3 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F]">
                What is PR by Investment?
              </h3>

              <p className="mt-6 text-[#0E2A46] text-[16px] leading-relaxed">
                PR by Investment means obtaining permanent residency status in
                another country by making an approved financial investment. This
                could be through real estate, business ventures, government
                bonds, or other government-approved schemes.
              </p>

              <p className="mt-4 text-[#0E2A46] text-[16px] leading-relaxed">
                In exchange, the host country grants you and your eligible
                family members the right to live, work, study, and enjoy social
                benefits often without strict physical stay requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PRByInvestment;
