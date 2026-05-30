import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import API_BASE from "../../config.js";

/* ── Static fallback accreditation logos ─────────────────────── */
const staticAccreditations = [
  { id: 1, name: "ISO Certified",             image: "/images/lu1.svg" },
  { id: 2, name: "DELF / DALF",               image: "/images/lu2.svg" },
  { id: 3, name: "Goethe Institut",           image: "/images/lu3.svg" },
  { id: 4, name: "JLPT",                      image: "/images/lu4.svg" },
  { id: 5, name: "HSK Certified",             image: "/images/lu1.svg" },
  { id: 6, name: "TOPIK",                     image: "/images/lu2.svg" },
];

const AccreditationsSection = () => {
  const [accreditations, setAccreditations] = useState(staticAccreditations);
  const [accreditations2, setAccreditations2] = useState([]);

  /* ── API 1: primary accreditations ─────────────────────────── */
  useEffect(() => {
    fetch(`${API_BASE}/api/accreditations`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.accreditations && data.accreditations.length > 0) {
          setAccreditations(data.accreditations);
        }
      })
      .catch(() => {});
  }, []);

  /* ── API 2: secondary / partner accreditations ──────────────── */
  useEffect(() => {
    fetch(`${API_BASE}/api/accreditations-partners`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.accreditations && data.accreditations.length > 0) {
          setAccreditations2(data.accreditations);
        }
      })
      .catch(() => {});
  }, []);

  const allItems =
    accreditations2.length > 0
      ? [...accreditations, ...accreditations2]
      : accreditations;

  return (
    <section className="w-full py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[#2FC7A1] uppercase tracking-wider mb-2">
            ◇ Recognised Globally
          </p>
          <h2 className="text-[28px] lg:text-[34px] font-bold text-gray-900">
            Our <span className="text-[#4FA3D1]">Accreditations</span>
          </h2>
          <p className="text-gray-500 mt-2 text-base max-w-xl mx-auto">
            Langma International is recognised and affiliated with leading global institutions
            ensuring the highest standards in language and career education.
          </p>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={allItems.length > 4}
          speed={600}
          breakpoints={{
            0:    { slidesPerView: 2 },
            640:  { slidesPerView: 3 },
            768:  { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          className="pb-4"
        >
          {allItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-28">
                <img
                  src={item.image}
                  alt={item.name || "Accreditation"}
                  className="h-16 w-full object-contain"
                />
                {item.name && (
                  <p className="text-xs text-gray-500 mt-2 text-center line-clamp-1">
                    {item.name}
                  </p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Row 2 — second API data in a separate strip if available */}
        {accreditations2.length > 0 && (
          <div className="mt-8">
            <p className="text-center text-sm text-gray-400 mb-6">Our Global Partners</p>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              autoplay={{ delay: 2000, disableOnInteraction: false, reverseDirection: true }}
              loop={accreditations2.length > 4}
              speed={700}
              breakpoints={{
                0:    { slidesPerView: 2 },
                640:  { slidesPerView: 3 },
                768:  { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
            >
              {accreditations2.map((item) => (
                <SwiperSlide key={`p-${item.id}`}>
                  <div className="flex items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100 h-20">
                    <img
                      src={item.image}
                      alt={item.name || "Partner"}
                      className="h-12 w-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default AccreditationsSection;
