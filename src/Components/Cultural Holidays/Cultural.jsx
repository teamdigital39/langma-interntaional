import React from "react";

const features = [
  {
    number: "1",
    title: "Authentic Cultural Experiences",
    desc: "Go beyond tourist spots and explore the real heartbeat of a destination.",
  },
  {
    number: "2",
    title: "Festival & Heritage Celebrations",
    desc: "Be part of iconic cultural events, ceremonies, and traditional celebrations.",
  },
  {
    number: "3",
    title: "Local Cuisine & Culinary Trails",
    desc: "Savor traditional food through guided tastings and cooking experiences.",
  },
  {
    number: "4",
    title: "Community-Driven Stays",
    desc: "Experience the warmth of host families, heritage homes, or eco-lodges.",
  },
  {
    number: "5",
    title: "Expert-Curated Itineraries",
    desc: "Our travel experts design every program with cultural depth and comfort in mind.",
  },
  {
    number: "6",
    title: "Meaningful Local Connections",
    desc: "Build lasting relationships with local communities and fellow travelers.",
  },
];

const Cultural = () => {
  return (
    <section className="w-full bg-[#2f6668] py-20 px-6">
      
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-white text-[28px] lg:text-[32px] font-semibold leading-snug">
          Why Choose Langma International for <br />
          Cultural Holidays?
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
        
        {features.map((item, index) => (
          <div key={index} className="relative">
            
            {/* Big Background Number */}
            <div className="flex">
            <span className=" text-[80px] -mt-5 m-2 font-bold text-white opacity-50">
              {item.number}
            </span>
            <div className="flex flex-col">

            {/* Content */}
            <h3 className="text-white text-[20px] font-semibold mb-2">
              {item.title}
            </h3>

            <p className="text-white/80 text-[15px] leading-relaxed">
              {item.desc}
            </p>
            </div>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default Cultural;