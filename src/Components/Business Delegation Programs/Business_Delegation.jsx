import React from "react";

const Business_Delegation = () => {
  return (
    <section className="w-full">
      {/* ================= SECTION 1 ================= */}
      <div className="w-full bg-[#F4FEFF] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* TEXT */}
            <div>
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F] leading-snug">
                Business Delegation Programs Lead
                <br />
                Global Conversations with Langma
                <br />
                International
              </h2>

              <p className="mt-6 text-[#0E2A46] text-[16px] lg:text-[18px] leading-relaxed">
                At Langma International, our Business Delegation Programs are
                designed for industry leaders, entrepreneurs, associations, and
                corporate groups who are ready to explore international markets
                with purpose. These programs connect you with decision-makers,
                government bodies, trade councils, and enterprise leaders —
                opening doors to real global opportunities.
              </p>

              <p className="mt-4 text-[#0E2A46] text-[16px] lg:text-[18px] leading-relaxed">
                We don’t just organize business tours — we create structured,
                goal-driven delegations that result in partnerships, expansion
                strategies, and measurable business outcomes.
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
                    src="/images/4th.webp"
                    alt="bussenss"
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
                    src="/images/image 2236.png"
                    alt="PR Concept"
                    className="w-full h-full "
                  />
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="order-1 lg:order-2">
              <h3 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F]">
                What Are Business Delegation Programs?{" "}
              </h3>

              <p className="mt-6 text-[#0E2A46] text-[16px] lg:text-[18px] leading-relaxed">
                Business Delegation Programs are curated international visits
                where a group of professionals or business leaders represent an
                industry, organization, or association to explore trade
                partnerships, investment opportunities, technology exchange, and
                market entry strategies.
              </p>

              <p className="mt-4 text-[#0E2A46] text-[16px] lg:text-[18px] leading-relaxed">
                Each delegation is carefully structured with meetings,
                presentations, and industry-specific engagements to ensure
                maximum return on time and investment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Business_Delegation;
