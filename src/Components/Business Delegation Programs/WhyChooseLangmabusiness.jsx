import React from "react";

const items = [
  {
    title: "Strategic Global Market Access",
    desc: "Enter new markets with confidence through structured B2B and institutional meetings.",
  },
  {
    title: "High-Value Networking",
    desc: "Meet government officials, chamber of commerce leaders, corporate heads, and innovation hubs.",
  },
  {
    title: "Market Intelligence & Insights",
    desc: "Gain firsthand understanding of business regulations, demand trends, and growth sectors.",
  },
  {
    title: "Institutional & Trade Body Engagements",
    desc: "Interact with embassies, trade councils, export promotion bodies, and business associations.",
  },
  {
    title: "Partnership & Expansion Opportunities",
    desc: "Identify joint ventures, distributorships, franchise models, and investment collaborations.",
  },
  {
    title: "Cross-Border Growth Strategy",
    desc: "Gain practical frameworks to scale your business internationally.",
  },
];

const WhyChooseLangmabusiness = () => {
  return (
    <section className="w-full bg-[#2F666B] py-20">
      <div className="max-w-6xl mx-auto lg:px-6">
        <h2 className="text-center text-white text-[28px] lg:text-[32px] font-semibold mb-14">
          Why Choose Langma International?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden  min-h-[230px]"
              style={{
                backgroundImage: "url('/images/card-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* OPTIONAL: Dark gradient for text visibility (not bg color) */}
              <div className="absolute inset-0 "></div>

              {/* CONTENT */}
              <div className="relative z-10 p-6">
                <h3 className="text-white text-[18px] font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-white/90 text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLangmabusiness;
