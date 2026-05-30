import React from "react";

const Cultural_Infusion_Programs = () => {
  return (
    <section className="w-full">
      {/* ================= SECTION 1 ================= */}
      <div className="w-full bg-[#F4FEFF] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* TEXT */}
            <div>
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F] leading-snug">
                Cultural Infusion Programs Discover the <br />
                World, Elevate Your Perspective with <br />
                Langma International
              </h2>

              <p className="mt-6 text-[#0E2A46] text-[18px] lg:text-[20px] leading-relaxed">
                At Langma International, we believe that travel isn’t just about
                seeing places — it’s about truly experiencing them. Our Cultural
                Infusion Programs are crafted to immerse you in authentic global
                cultures, traditions, and lifestyles. Whether you’re a student,
                professional, or passionate traveler, these programs will
                transform the way you understand the world and yourself.
              </p>

              <p className="mt-4 text-[#0E2A46] text-[18px] lg:text-[20px] leading-relaxed">
                Designed to build cross-cultural intelligence, global
                confidence, and meaningful connections, our Cultural Infusion
                experiences go beyond sightseeing — bringing you closer to
                communities, languages, arts, food, and traditions in the most
                impactful way.
              </p>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center">
              <div className="relative w-[420px] h-[290px] lg:h-[420px]">
                {/* Border Shape */}
                {/* <div className="absolute inset-0 rounded-[55%] border-2 border-[#4FBDBA]" /> */}

                {/* Image */}
                <div className="absolute inset-3  overflow-hidden bg-white">
                  <img
                    src="/images/image 2229.png"
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
                    src="/images/image 2230.png"
                    alt="PR Concept"
                    className="w-full h-full "
                  />
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="order-1 lg:order-2">
              <h3 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F]">
                What Are Cultural Infusion Programs?
              </h3>

              <p className="mt-6 text-[#0E2A46] text-[18px] lg:text-[20px] leading-relaxed">
                Cultural Infusion Programs are immersive travel and learning
                experiences that allow participants to live the culture rather
                than just visit it. Through interaction with local communities,
                hands-on activities, and curated cultural engagements, you’ll
                gain deep insights into global traditions, values, and ways of
                life.
              </p>

              <p className="mt-4 text-[#0E2A46] text-[18px] lg:text-[20px] leading-relaxed">
                Whether your goal is personal growth, academic enhancement, or
                professional development, Cultural Infusion Programs give you
                lifelong memories paired with meaningful learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cultural_Infusion_Programs;
