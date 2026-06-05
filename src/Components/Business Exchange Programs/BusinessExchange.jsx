import React from "react";

const BusinessExchange = () => {
  return (
    <section className="w-full">
      {/* ================= SECTION 1 ================= */}
      <div className="w-full bg-[#F4FEFF] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* TEXT */}
            <div>
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F] leading-snug">
                Business Exchange Programs Expand
                <br />
                Your Global Business Horizons with <br />
                Langma International
              </h2>

              <p className="mt-6 text-[#0E2A46] text-[16px] lg:text-[18px] leading-relaxed">
                At Langma International, we help ambitious professionals,
                entrepreneurs, and corporate leaders step beyond borders. Our
                Business Exchange Programs are designed to connect you with
                international markets, industry leaders, and real-world business
                ecosystems — creating opportunities that go far beyond
                traditional networking.
              </p>

              <p className="mt-4 text-[#0E2A46] text-[16px] lg:text-[18px] leading-relaxed">
                These programs blend professional learning, corporate exposure,
                and cross-border collaboration to give you global business
                confidence and practical insights.
              </p>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center">
              <div className="relative w-[420px] h-[250px] lg:h-[420px]">
                {/* Border Shape */}
                {/* <div className="absolute inset-0 rounded-[55%] border-2 border-[#4FBDBA]" /> */}

                {/* Image */}
                <div className="absolute inset-3  overflow-hidden bg-white">
                  <img
                    src="/images/image 2233.png"
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
              <div className="relative w-[420px] h-[250px] lg:h-[420px]">
                {/* <div className="absolute inset-0 rounded-[55%] border-2 border-[#4FBDBA]" /> */}

                <div className="absolute inset-3  overflow-hidden bg-white">
                  <img
                    src="/images/3rd.webp"
                    alt="PR Concept"
                    className="w-full h-full "
                  />
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="order-1 lg:order-2">
              <h3 className="text-[28px] lg:text-[32px]  font-bold text-[#0C5F5F]">
                What Are Business Exchange Programs?{" "}
              </h3>

              <p className="mt-6 text-[#0E2A46] text-[16px] lg:text-[18px] leading-relaxed">
                Business Exchange Programs are structured international
                experiences where participants engage with global companies,
                startups, incubators, and industry experts. These programs
                provide hands-on exposure to business operations, management
                styles, innovation ecosystems, and market dynamics in different
                countries.
              </p>

              <p className="mt-4 text-[#0E2A46] text-[16px] lg:text-[18px] leading-relaxed">
                Whether you are building your career or scaling your enterprise,
                these programs help you understand how global business really
                works.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessExchange;
