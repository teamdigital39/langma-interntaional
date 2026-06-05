import React from "react";

const Lagmabusinesshubgloble = () => {
  return (
    <section className="w-full">
      {/* ================= SECTION 1 ================= */}
      <div className="w-full bg-[#F4FEFF] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* TEXT */}
            <div>
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F] leading-snug">
                Langma Business Hub Where Global <br />
                Ideas Turn into Global Success
              </h2>

              <p className="mt-6 text-[#0E2A46] text-[16px] lg:text-[18px] leading-relaxed">
                The Langma Business Hub is the strategic backbone of Langma
                International — a powerful ecosystem created to support
                entrepreneurs, startups, investors, and business leaders who
                aspire to scale across borders.
              </p>

              <p className="mt-4 text-[#0E2A46] text-[16px] lg:text-[18px] leading-relaxed">
                From ideation to international expansion, the Langma Business
                Hub brings together mentorship, market access, partnerships, and
                business intelligence under one trusted platform.
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
                    src="/images/image 2237.png"
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
                    src="/images/5th.webp"
                    alt="PR Concept"
                    className="w-full h-full "
                  />
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="order-1 lg:order-2">
              <h3 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F]">
                What is Langma Business Hub?{" "}
              </h3>

              <p className="mt-6 text-[#0E2A46] text-[16px] lg:text-[18px] leading-relaxed">
                The Langma Business Hub is a global business facilitation
                platform that connects enterprises with international markets,
                innovation ecosystems, trade bodies, and investors. It is
                designed to help businesses launch, grow, collaborate, and
                expand beyond geographical boundaries.
              </p>

              <p className="mt-4 text-[#0E2A46] text-[16px] lg:text-[18px] leading-relaxed">
                Whether you are entering your first overseas market or planning
                a global footprint, the Hub acts as your gateway to the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lagmabusinesshubgloble;
