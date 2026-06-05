import React from "react";

const WhatIsGlobalPlacement = () => {
  return (
    <section className="w-full py-16 flex justify-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10 px-6">
        {/* LEFT IMAGE SHAPE */}
        <div className="flex-1 flex justify-center">
          <div className="relative h-64 w-90  flex items-center justify-center">
            <span className="text-gray-500">
              <img src="/images/image 2226.png" alt="image" />
            </span>
          </div>
        </div>

        {/* RIGHT TEXT SECTION */}
        <div className="flex-1">
          <h2 className="text-[28px] lg:text-[32px] font-bold text-[#296166]">
            What Is Global Placement?
          </h2>

          <p className="mt-3 text-[#0E2A46] leading-relaxed text-[18px] lg:text-[20px]">
            Our Global Placement service connects skilled candidates with
            verified employers across different countries. We focus on matching
            your experience, interests, and career goals with roles that truly
            fit — not just what's available.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIsGlobalPlacement;
