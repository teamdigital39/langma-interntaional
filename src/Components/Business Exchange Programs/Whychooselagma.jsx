import React from "react";

const items = [
  {
    title: "Direct Industry Exposure",
    desc: "Interact with global enterprises, startups, and business mentors.",
  },
  {
    title: "International Networking",
    desc: "Build meaningful relationships with professionals, investors, and entrepreneurs worldwide.",
  },
  {
    title: "Practical Business Learning",
    desc: "Gain insights into leadership, strategy, operations, and market expansion.",
  },
  {
    title: "Corporate Visits & Workshops",
    desc: "Participate in business visits, interactive sessions with experts, and executive sessions.",
  },
  {
    title: "Global Growth Opportunities",
    desc: "Identify partnerships, expansion prospects, and innovative business models.",
  },
  {
    title: "Real-World Business Insights",
    desc: "Understand global market trends, challenges, and business transformations.",
  },
];

const Whychooselagma = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center  text-[28px] lg:text-[32px] font-bold text-[#296166] mb-12">
          Why Choose Langma International for Business Exchange?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-3xl mx-5 lg:mx-0 shadow-md bg-white border-2 border-[#296166] overflow-hidden"
            >
              {/* FULL WIDTH HEADING */}
              <div className="w-full bg-[#0B4F55] px-2 py-3 mt-5">
                <h3 className="text-[25px] font-semibold text-center text-white">
                  {item.title}
                </h3>
              </div>

              {/* DESCRIPTION */}
              <div className="p-6">
                <p className="text-[18px] leading-relaxed text-gray-600">
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

export default Whychooselagma;
