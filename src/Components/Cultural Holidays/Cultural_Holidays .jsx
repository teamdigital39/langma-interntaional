import React from "react";

const Cultural_Holidays = () => {
  return (
    <section className="w-full">

      <div className="w-full bg-[#F4FEFF] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0C5F5F] leading-snug">
                Cultural Holidays Travel Beyond Tourism <br />
                with Langma International
              </h2>

              <p className="mt-6 text-[#0E2A46] text-[18px] lg:text-[20px] leading-relaxed">
                At Langma International, we turn holidays into meaningful
                journeys. Our Cultural Holidays are thoughtfully curated travel
                experiences that allow you to feel, live, and celebrate global
                cultures rather than just visit famous places.
              </p>

              <p className="mt-4 text-[#0E2A46] text-[18px] lg:text-[20px] leading-relaxed">
                From vibrant festivals and heritage trails to traditional
                cuisines and local storytelling — our Cultural Holidays are
                designed for travelers who seek depth, discovery, and
                unforgettable memories.
              </p>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center">
              <div className="relative w-full h-[250px] lg:h-[420px]">
                {/* Border Shape */}
                {/* <div className="absolute inset-0 rounded-[55%] border-2 border-[#4FBDBA]" /> */}

                {/* Image */}
                <div className="absolute inset-3  overflow-hidden bg-white">
                  <img
                    src="/images/1sr.webp"
                    alt="PR Investment"
                    className="w-full h-full "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* IMAGE */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="relative w-full h-[250px] lg:h-[420px]">
                {/* <div className="absolute inset-0 rounded-[55%] border-2 border-[#4FBDBA]" /> */}

                <div className="absolute inset-3  overflow-hidden bg-white">
                  <img
                    src="/images/2bd.webp"
                    alt="PR Concept"
                    className="w-full h-full "
                  />
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="order-1 lg:order-2">
              <h3 className="text-[32px] font-bold text-[#0C5F5F]">
                What Are Cultural Holidays?{" "}
              </h3>

              <p className="mt-6 text-[#0E2A46] text-[20px] leading-relaxed">
                Cultural Holidays are immersive travel programs that combine
                leisure with cultural learning. These holidays focus on
                authentic interaction with local traditions, communities,
                history, art, and lifestyle — helping you understand the soul of
                a destination.
              </p>

              <p className="mt-4 text-[#0E2A46] text-[20px] leading-relaxed">
                Whether it’s celebrating regional festivals, exploring ancient
                heritage sites, or engaging with local families, every moment is
                crafted to leave a lasting impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cultural_Holidays;
