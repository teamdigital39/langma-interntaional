import React from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PopularCourses = ({ data }) => {
  if (!data) return <p className="text-center">Loading...</p>;

  const courses = data.map((item) => ({
    id: item.id,
    tag: item.title,
    title: item.title + " Language",
    desc: "Learn " + item.title + " professionally",
    image: item.image,
    link: "/" + item.url,
  }));

  const filteredCourses = courses;

  return (
    <section
      className="w-full py-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Background.png')" }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-[#2FC7A1] uppercase">
              Top Popular Course
            </p>

            <h2 className="text-[28px] lg:text-[32px] font-bold text-gray-900 pb-4">
              Speak a <span className="text-[#4FA3D1]">language</span> fearlessly
            </h2>

            {/* TABS */}
            {/* <div className="flex gap-4 mt-6 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 ${
                    activeTab === tab
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div> */}
          </div>
        </div>

        {/* SWIPER */}
     <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={30}
  navigation={{
    enabled: window.innerWidth >= 768,
  }}
  pagination={{ clickable: true }}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
  speed={500}
  loop={true}
  className="
    pb-16 
    [&_.swiper-pagination]:!relative 
    [&_.swiper-pagination]:!mt-6
  "
  breakpoints={{
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
>
  {filteredCourses.map((course, index) => (
    <SwiperSlide key={`${course.link}-${index}`}>
      <div className="bg-white rounded-2xl shadow-md p-4 h-full">

        <div className="h-[190px] overflow-hidden rounded-xl">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="mt-3 font-bold">
          {course.title}
        </h3>

        <p className="text-sm text-gray-500">
          {course.desc}
        </p>

        <Link
          to={course.link}
          className="mt-3 inline-block bg-yellow-300 px-4 py-2 rounded-full"
        >
          Learn More
        </Link>

      </div>
    </SwiperSlide>
  ))}
</Swiper>
      </div>
    </section>
  );
};

export default PopularCourses;