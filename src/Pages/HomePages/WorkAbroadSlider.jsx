import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import PopupForm from "./PopupForm";

const workDestinations = [
  { name: "Kingdom of Saudi Arabia", flag: "https://flagcdn.com/w320/sa.png", link: "/" },
  { name: "Israel",                  flag: "https://flagcdn.com/w320/il.png", link: "/" },
  { name: "Qatar",                   flag: "/images/qt1.jpg",                 link: "/" },
  { name: "Australia",               flag: "/images/ast.jpg",                 link: "/" },
  { name: "Germany",                 flag: "https://flagcdn.com/w320/de.png", link: "/" },
  { name: "Japan",                   flag: "https://flagcdn.com/w320/jp.png", link: "/" },
  { name: "Mauritius",               flag: "https://flagcdn.com/w320/mu.png", link: "/" },
  { name: "Austria",                 flag: "https://flagcdn.com/w320/at.png", link: "/" },
  { name: "United Arab Emirates",    flag: "/images/ua.jpg",                  link: "/" },
  { name: "Bahrain",                 flag: "https://flagcdn.com/w320/bh.png", link: "/" },
  { name: "United Kingdom",          flag: "/images/amm.jpg",                 link: "/" },
  { name: "Oman",                    flag: "/images/omn.jpg",                 link: "/" },
  { name: "Kuwait",                  flag: "/images/kw.jpg",                  link: "/" },
  { name: "France",                  flag: "https://flagcdn.com/w320/fr.png", link: "/" },
  { name: "Italy",                   flag: "https://flagcdn.com/w320/it.png", link: "/" },
  { name: "Jordan",                  flag: "/images/jd.jpg",                  link: "/" },
  { name: "Portugal",                flag: "https://flagcdn.com/w320/pt.png", link: "/" },
  { name: "Taiwan",                  flag: "https://flagcdn.com/w320/tw.png", link: "/" },
  { name: "Poland",                  flag: "https://flagcdn.com/w320/pl.png", link: "/poland" },
];

const WorkAbroadSlider = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full bg-white">
      {/* Top intro row */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Right image */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[300px] h-[280px] sm:h-[340px] flex items-center justify-center">
            <img
              src="/images/abrotegirl.png"
              alt="Work Abroad"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Left content */}
        <div className="max-w-xl text-[#296166]">
          <h3 className="text-[28px] lg:text-[32px] font-semibold mb-0">Work Abroad</h3>
          <h2 className="text-[24px] md:text-2xl font-bold mb-4">
            Your Gateway to Global Careers
          </h2>
          <p className="text-[18px] leading-relaxed mb-6">
            Step into international job markets with expert support for visa processing,
            job placement, language training, and cultural readiness — all in one place.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="bg-[#296166] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#174C4A] transition-colors duration-300 shadow-md"
          >
            Contact Our Expert Today
          </button>
        </div>
      </div>

      {/* Work Destinations Slider */}
      <div className="py-8 bg-gray-50">
        <h2 className="text-center text-[22px] sm:text-[28px] lg:text-[32px] font-semibold text-[#296166] mb-6 px-4">
          Explore Your Work Destinations
        </h2>
        <div className="px-2">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={8}
            slidesPerView={2}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640:  { slidesPerView: 3, spaceBetween: 10 },
              768:  { slidesPerView: 4, spaceBetween: 10 },
              1024: { slidesPerView: 9, spaceBetween: 10 },
            }}
          >
            {workDestinations.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="text-center">
                  <div className="w-full flex items-center justify-center">
                    <Link to={item.link}>
                      <img
                        src={item.flag}
                        alt={item.name}
                        className="w-24 h-16 sm:w-28 sm:h-20 lg:w-32 lg:h-24 object-contain mx-auto hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                  <p className="text-xs sm:text-sm font-medium mt-2 px-1 leading-tight">
                    {item.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <PopupForm open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default WorkAbroadSlider;
