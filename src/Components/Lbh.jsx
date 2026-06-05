import React from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function Lbh() {
  const courses = [
    {
      id: 1,
      title: "Transcription",
      image: "/images/trn.jpg",
      link: "/transcription",
    },
    {
      id: 2,
      title: "Translational",
      image: "/images/tl.jpg",
      link: "/translational",
    },
    {
      id: 3,
      title: "Localization",
      image: "/images/ls.jpg",
      link: "/localization",
    },
    {
      id: 4,
      title: "Multilanguage",
      image: "/images/md.jpg",
      link: "/multilanguage",
    },
    {
      id: 5,
      title: "Proofreading",
      image: "/images/pr.jpg",
      link: "/proofreading",
    },
    {
      id: 6,
      title: "Voiceover",
      image: "/images/vs.jpg",
      link: "/voiceover",
    },
    {
      id: 7,
      title: "Content Writing",
      image: "/images/cww.jpg",
      link: "/content-writing",
    },
    {
      id: 8,
      title: "Subtitle",
      image: "/images/sbt.jpg",
      link: "/subtitle",
    },
    {
      id: 9,
      title: "Dubbing",
      image: "/images/dbb.jpg",
      link: "/dubbing",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-[28px] lg:text-[32px] font-bold text-gray-900">
            Our <span className="text-[#4FA3D1]">Services</span>
          </h2>
        </div>

        {/* SWIPER (SAME STYLE AS BLOG) */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            enabled: window.innerWidth >= 768,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={500}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="py-6"
        >
          {courses.map((course) => (
            <SwiperSlide key={course.id} className="p-3 pb-10">

              <div className="bg-white rounded-2xl shadow-2xl p-5 h-[340px] flex flex-col">

                {/* IMAGE */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 rounded-xl mb-4 object-cover"
                />

                {/* TITLE */}
                <h3 className="font-semibold text-[#0F2A44] text-[18px] mb-4">
                  {course.title}
                </h3>

                {/* BUTTON */}
                <div className="mt-auto">
                  <Link to={course.link}>
                    <button className="bg-yellow-300 text-black px-4 py-2 rounded-full flex items-center gap-2">
                      Read More
                    </button>
                  </Link>
                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

export default Lbh;