import React from "react";

const features = [
  {
    title: "Experience Authentic Local Life",
    desc: "Engage closely with communities, traditions, and everyday culture.",
  },
  {
    title: "Build Cross-Cultural Intelligence",
    desc: "Develop global awareness and cultural sensitivity for a connected world.",
    highlight: true,
  },
  {
    title: "Learn Through Hands-On Activities",
    desc: "Take part in workshops, festivals, heritage walks, and immersive sessions.",
  },
  {
    title: "Create Meaningful Global Connections",
    desc: "Form lifelong friendships with people from diverse backgrounds.",
  },
  {
    title: "Discover Arts, Traditions & Cuisine",
    desc: "Explore cultural expressions through art, music, and food.",
  },
  {
    title: "Gain Personal & Global Perspective",
    desc: "Grow personally while gaining a broader understanding of the world.",
  },
];

const CulturalInfusion = () => {
  return (
    <>
    <div className="text-center mb-10">
    <h2 className="text-[32px] font-semibold text-teal-800 mt-10"> Why Choose Langma International's Cultural Infusion Programs? </h2> <p className="text-teal-700 mt-2 mb-22 text-[25px]"> Our programs are thoughtfully designed to help you: </p>
    </div>
    <section className="w-full bg-[#2f6668] py-20 px-4">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 -mt-35">
        
        {features.map((item, index) => (
          <div
            key={index}
            className={`rounded-[40px] px-8 py-6 shadow-xl transition-all duration-300 border border-[#2f6668] 
            ${
              item.highlight
                ? "bg-[#7fcac3] text-white"
                : "bg-[#FFFFFF] text-[#2f4f4f]"
            }`}
          >
            <h3 className="text-[22px] font-semibold mb-2">
              {item.title}
            </h3>
            <p className={`text-[15px] leading-relaxed ${item.highlight ? "text-white" : "text-gray-700"}`}>
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
    </>
  );
};

export default CulturalInfusion;