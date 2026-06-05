import React from "react";

const services = [
  {
    title: "Corporate & startup visits",
  },
  {
    title: "Business mentorship sessions",
  },
  {
    title: "Industry-specific workshops",
  },
  {
    title: "Certificates of participation",
  },
  {
    title: "Networking & investor meet-ups",
  },
  {
    title: "Market research exposure",
  },
  {
    title: "Cross-cultural business training",
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
          Our Business Exchange Programs typically include:{" "}
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
                <h4 className="text-[#296166] font-sm text-[16px] lg:text-[18px]">
                  {item.title}
                </h4>

                {/* <p className="mt-1 text-[#212529]/80 text-[20px] leading-relaxed">
                  {item.desc}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Program_Highlights;
