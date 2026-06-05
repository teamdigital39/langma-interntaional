import React from "react";
import PopupForm from "../PopupForm";
import { useState } from "react";

const WhyChooseSection = () => {
  const features = [
    {
      img: "/images/Vector.png",
      title: "Personalized Learning",
      desc: "Courses Designed To Match Your Level And Goals",
    },
    {
      img: "/images/Vector (1).png",
      title: "Experienced Trainers",
      desc: "Native-Speaking Instructors And Certified Language Experts",
    },
    {
      img: "/images/Vector (2).png",
      title: "Flexible Modes",
      desc: "Online And Offline Classes To Fit Your Schedule",
    },
    {
      img: "/images/transactions_17360530 2.png",
      title: "Global Exposure",
      desc: "Practice Sessions, Cultural Insights, And Interactive Learning",
    },
  ];
const [open, setOpen] = useState(false);
  return (
    <section className="w-full bg-white py-14">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Top Tag */}
        {/* Top Tag */}
        <div className="flex items-center justify-center gap-3 mb-1">
          {/* Left Icon */}
          <img
            src="/images/image (4).png" // 👉 apni image ka path dalna
            className="w-5 h-5 object-contain"
            alt="left-icon"
          />

          <p className="text-[#2E7D7B] font-semibold text-sm tracking-wider">
            LANGMA INTERNATIONAL
          </p>

          {/* Right Icon */}
          <img
            src="/images/image (4).png" // 👉 same ya dusri image bhi dal sakte ho
            className="w-5 h-5 object-contain"
            alt="right-icon"
          />
        </div>

        {/* Heading */}
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#0E1F3D]">
          Why Learn With Langma <br /> International?
        </h2>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* ICON with dotted border */}
              <div className="relative flex items-center justify-center">
                {/* Dotted Outer Ring */}
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#2FC7A1] flex items-center justify-center">
                  {/* Solid Inner Circle */}
                  <div className="w-20 h-20 rounded-full bg-[#2FC7A1] border-2 border-[#4EC7B8] flex items-center justify-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* TITLE */}
              <h3 className="text-[25px] font-semibold text-[#296166] mt-3">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-[#0E2A46] text-[18px] mt-1 leading-relaxed">
                {item.desc}
              </p>

              <button onClick={() => setOpen(!open)} className="mt-3 bg-[#2FC7A1] text-white px-5 py-2 rounded-full text-sm flex items-center gap-2 cursor-pointer">
                View Details →
              </button>
            </div>
          ))}
        </div>
      </div>
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default WhyChooseSection;
