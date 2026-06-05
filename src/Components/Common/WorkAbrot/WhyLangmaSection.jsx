import React from "react";

const WhyLangmaSection = () => {
  return (
    <section className="w-full bg-white ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* LEFT IMAGE AREA */}
          <div className="lg:w-1/2 flex justify-center">
            <div
              className="relative 
    w-[360px] h-[280px] 
    md:w-[500px] md:h-[420px] -mt-12 md:mt-0 -mb-9 md:mb-0
  "
            >
              <img
                src="/images/png-study-usa-education-photo-collage-transparent-background 1.png"
                alt="Study Abroad"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-[#296166] font-semibold text-[28px] lg:text-[32px] mb-2">
              Why Langma International?
            </h3>

            <p className="text-[#0E2A46] font-semibold mb-4 text-[25px]">
              Because your career is not a file – it’s your future.
            </p>

            <p className="text-[#0E2A46] mb-6 text-[18px] lg:text-[20px]">
              We don’t just process applications. We listen to your goals,
              understand your skills, and guide you towards the right
              opportunities that truly suit you.
            </p>

            {/* LIST WITH IMAGE ICON */}
            <ul className="space-y-4 text-[#0E2A46] text[20px]">
              <li className="flex items-start gap-3">
                <img
                  src="/images/check-mark_5290076 1.png"
                  alt="check"
                  className="w-5 h-5 mt-1"
                />
                <span>No false promises</span>
              </li>

              <li className="flex items-start gap-3">
                <img
                  src="/images/check-mark_5290076 1.png"
                  alt="check"
                  className="w-5 h-5 mt-1"
                />
                <span>No shortcuts</span>
              </li>

              <li className="flex items-start gap-3">
                <img
                  src="/images/check-mark_5290076 1.png"
                  alt="check"
                  className="w-5 h-5 mt-1"
                />
                <span className="text-left">Only genuine opportunities and real support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLangmaSection;
