import React from "react";

const GlobalPlacementSection = () => {
  return (
    <section className="w-full bg-[#E9F8FF] py-16 flex justify-center">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-10 px-6">
        <div className="flex-1">
          <h2 className="text-[28px] lg:text-[32px] font-bold text-[#296166]">
            Global Placement with Langma International
          </h2>

          <h3 className="text-[20px] lg:text-[25px] font-semibold mt-3 text-[#0E2A46]">
            Your Career, Now Without Borders
          </h3>

          <p className="mt-3 text-[#0E2A46] leading-relaxed">
            Finding the right job abroad is not just about opportunities – it’s
            about trust, preparation, and guidance.
            <span className="font-semibold"> At Langma International</span>, we
            help you take confident steps toward international careers through
            genuine global placements.
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative h-64 w-90  flex items-center justify-center">
            <span className="text-gray-500">
              <img src="/images/image 2225.png" alt="image" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPlacementSection;
