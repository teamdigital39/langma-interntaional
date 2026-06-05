import React from "react";

const features = [
  {
    title: "Global Market Access",
    desc: "Explore new territories with expert guidance and on-ground connections.",
    dark: true,
  },
  {
    title: "Strategic Partnerships",
    desc: "Connect with industry leaders, distributors, investors, and global collaborators.",
    dark: false,
  },
  {
    title: "Business Growth Enablement",
    desc: "From market-entry strategies to expansion frameworks we guide every step.",
    dark: true,
  },
  {
    title: "Startup & Enterprise Support",
    desc: "Customized solutions for startups, SMEs, and established corporations.",
    dark: true,
  },
  {
    title: "Innovation & Knowledge Exchange",
    desc: "Learn global best practices, technology trends, and industry benchmarks.",
    dark: false,
  },
  {
    title: "End-to-End Business Facilitation",
    desc: "From planning to execution, we support your entire global journey.",
    dark: true,
  },
];

const WhyBusinessChooseLangma = () => {
  return (
    <section className="w-full bg-[#F4FEFF] py-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Heading */}
        <h2 className="text-center text-[28px] lg:text-[32px] font-semibold text-[#1F5F63] mb-14">
          Why Choose Langma Business Hub?
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 shadow-lg transition hover:shadow-xl
                ${item.dark ? "bg-[#006064] text-white" : "bg-[#80CBC4] text-white"}
              `}
            >
              <h3 className="text-[25px] font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-[16px] leading-relaxed opacity-90">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyBusinessChooseLangma;
