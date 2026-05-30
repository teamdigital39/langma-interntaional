import API_BASE from "../../config.js";
import React, { useEffect, useState } from "react";
import PopupForm from "../../Components/PopupForm";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  { id: 1, image: "/images/Langusegirl.png" },
  { id: 2, image: "/images/Langusegirl.png" },
];

const GlobalOpportunity = () => {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/languages`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setLanguages(data.languages);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const formatText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-8 bg-[#F2FEFF]">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADING */}
        <div className="text-center">
          <h2 className="text-[22px] sm:text-3xl xl:text-4xl font-semibold text-gray-900">
            Your Global <span className="text-[#4FA3D1]">Opportunity</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl mx-auto">
            We have simplified the path from language proficiency to global employment and education.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-full">

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              key={current}
              src={slides[current].image}
              alt="Language"
              className="
                w-full max-w-[280px]
                sm:max-w-[360px]
                lg:max-w-[420px]
                xl:max-w-[480px]
                rounded-3xl object-cover
                transition-opacity duration-700
              "
            />
          </div>

          {/* CONTENT */}
          <div className="text-center lg:text-left">

            <p className="text-[#0F2A4F] text-sm sm:text-base xl:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Certified fluency that prepares professionals for global careers,
              international workplaces, confident communication, cultural
              adaptability, career growth, leadership readiness, worldwide
              mobility and long-term success across industries.
            </p>

            {/* SWIPER (SAFE VERSION) */}
            {languages.length > 0 && (
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={10}
                navigation={true}
                pagination={{ clickable: true }}

                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}

                loop={languages.length > 2}
                speed={600}
                slidesPerView={2}

                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 2 },
                }}

                observer={true}
                observeParents={true}
                className="language-swiper"
              >
                {languages.map((item) => (
                  <SwiperSlide key={item.id} className="p-2">
                    <div
                      className="
                        bg-white rounded-2xl p-5 sm:p-6
                        shadow-xl border border-gray-100
                        h-full hover:-translate-y-2
                        transition duration-300
                      "
                    >
                      <div className="flex items-center gap-4">

                        {/* FLAG */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* CONTENT */}
                        <div>
                          <h3 className="font-semibold mb-3 text-[#1E5C5A] text-base sm:text-lg">
                            Learn {formatText(item.title)}
                          </h3>

                          <Link
                            to={`/${item.url}`}
                            className="
                              inline-block bg-[#1E5C5A] text-white
                              text-sm px-5 py-2 rounded-full
                              hover:opacity-90 transition
                            "
                          >
                            More Details →
                          </Link>
                        </div>

                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

          </div>
        </div>
      </div>

      {/* POPUP */}
      <PopupForm open={open} onClose={() => setOpen(false)} />
       
    </section>
  );
};

export default GlobalOpportunity;