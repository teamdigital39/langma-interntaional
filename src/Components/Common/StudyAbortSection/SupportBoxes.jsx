import React from "react";

const SupportBoxes = () => {
  const data = [
    {
      img: "/images/counselling.png",
      title: "Personalized Counselling",
      desc: "We provide one-on-one guidance to understand your goals, interests, and academic background, helping you choose courses and institutions that fit your ambitions.",
    },
    {
      img: "/images/university.png",
      title: "University & Course Selection",
      desc: "Explore top destinations and programs for undergraduate or postgraduate studies, ensuring the best fit for your future plans.",
    },
    {
      img: "/images/application.png",
      title: "Application Assistance",
      desc: "We help with every step of your application — from form filling to document review — so you submit strong, accurate applications.",
    },
    {
      img: "/images/language.png",
      title: "Language Support",
      desc: "Get basic language preparation when required, enhancing your readiness for studies abroad.",
    },
    {
      img: "/images/document.png",
      title: "Documentation Support",
      desc: "We guide you through all university and visa documentation to ensure smooth approval.",
    },
    {
      img: "/images/travel.png",
      title: "Smooth Transition Abroad",
      desc: "Our support continues even after admission, offering tips and guidance to settle into your new academic and cultural environment.",
    },
  ];

  return (
    <section className="w-full py-14 flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl border border-gray-300 h-80 p-7
            flex flex-col gap-4 relative overflow-hidden mx-5"
          >
            {/* Corner Top Right */}
            <span className="absolute top-0 right-0 w-28 h-12 border-t-4 border-r-4 border-teal-700 rounded-tr-2xl"></span>

            {/* Corner Bottom Left */}
            <span className="absolute bottom-0 left-0 w-28 h-12 border-b-4 border-l-4 border-teal-700 rounded-bl-2xl"></span>

            {/* IMAGE ICON */}
            <img
              src={item.img}
              alt={item.title}
              className="w-22 h-22 object-contain"
            />

            <h3 className="text-xl font-semibold text-gray-800">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportBoxes;
