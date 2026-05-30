import React from "react";

const WhoShouldjoinbusiness = () => {
  return (
    <section className="w-full bg-[#EAF8FF] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Text Content */}
        <div className="flex-1">
          <h2 className="text-[28px] lg:text-[32px] font-bold text-[#296166] mb-6">
            Who Should Join Business Delegations?
          </h2>

          <p className="text-[#0E2A46] mb-6 text-[20px] lg:text-[25px] font-semibold">
            These programs are ideal for:
          </p>

          <ul className="space-y-3 mb-6 text-[#0E2A46] text-[20px]">
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png" // Your custom check image
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Entrepreneurs & SME owners</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Exporters & importers</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Industry associations & chambers</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Startup founders & investors</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Corporate leaders & CXOs</span>
            </li>
          </ul>

          <p className="text-gray-700 text-[20px] lg:text-[25px] text-[#0E2A46]">
            If your goal is to scale, expand, collaborate, or invest globally —
            Langma International builds the right bridge.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="/images/Group 4359 (4).png" // Replace with your image path
            alt="Application Form"
            className="  rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoShouldjoinbusiness;
