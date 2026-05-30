import React from "react";

const services = [
  {
    title: "Local Living Experiences",
    desc: "Stay with host families or in community hubs to understand daily life.",
  },
  {
    title: "Festivals & Heritage Tours",
    desc: "Participate in authentic cultural festivals, heritage walks, and storytelling events",
  },
  {
    title: "Cultural Workshops & Seminars",
    desc: "Learn traditional crafts, music, history, and language basics.",
  },
  {
    title: "Community Engagement Projects",
    desc: "Contribute to meaningful social initiatives and sustainable community programs.",
  },
  {
    title: "Food & Culinary Trails",
    desc: "Taste culture through curated food experiences and local cooking classes.",
  },
];

const Program_Highlights = () => {
  return (
    <section className="w-full bg-white py-5 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-[#296166] text-[28px] md:text-[32px] font-bold">
          Program Highlights
        </h2>

        <p className="mt-3 text-[#296166] text-[20px] max-w-3xl">
          Our Cultural Infusion Programs include:{" "}
        </p>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 ">
          {services.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">
              {/* IMAGE ICON */}
              <div className="mt-1 flex-shrink-0">
                <img
                  src="/images/check-mark_5290076 1.png"
                  alt="check"
                  className="w-6 h-6 object-contain"
                />
              </div>

              {/* Text */}
              <div>
                <h4 className="text-[#296166] font-semibold text-[25px]">
                  {item.title}
                </h4>

                <p className="mt-0 mb-1 text-[#212529]/80 text-[18px] lg:text-[20px] leading-relaxed">
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

export default Program_Highlights;
