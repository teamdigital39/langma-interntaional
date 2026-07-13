import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PopularCourses = ({ data, loading, error }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (loading || data === null) {
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  }

  if (error || !data.length) {
    return <p className="text-center py-10 text-red-500">Failed to load courses.</p>;
  }

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
      className="w-full py-16 bg-[#F5F8F6]"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-[#296166] uppercase tracking-wider">
              Top Popular Course
            </p>

            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#1A2540] pb-4">
              Speak Any  <span className="text-[#4FA3D1]">Language </span>with Confidence
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
        <div className="relative px-2 sm:px-12">
          <button
            ref={prevRef}
            type="button"
            aria-label="Previous course"
            className="
              hidden md:flex
              absolute left-0 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 items-center justify-center
              rounded-full bg-white
              border border-[#D8E0EC]
              text-[#296166]
              shadow-[0_4px_16px_-8px_rgba(26,37,64,.08)]
              hover:bg-[#296166] hover:text-white hover:border-[#296166]
              transition-all duration-300
            "
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          <button
            ref={nextRef}
            type="button"
            aria-label="Next course"
            className="
              hidden md:flex
              absolute right-0 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 items-center justify-center
              rounded-full bg-white
              border border-[#D8E0EC]
              text-[#296166]
              shadow-[0_4px_16px_-8px_rgba(26,37,64,.08)]
              hover:bg-[#296166] hover:text-white hover:border-[#296166]
              transition-all duration-300
            "
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
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
              popular-courses-swiper
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
                <div className="bg-white rounded-2xl shadow-[0_4px_20px_-8px_rgba(26,37,64,.08)] border border-[#D8E0EC] p-4 h-full hover:border-[#2FC7A1]/40 hover:shadow-[0_16px_40px_-20px_rgba(41,97,102,.15)] transition-all duration-300">

                  <div className="h-[190px] overflow-hidden rounded-xl border border-[#D8E0EC]">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="mt-3 font-bold text-[#1A2540]">
                    {course.title}
                  </h3>

                  <p className="text-sm text-[#4C5C58]">
                    {course.desc}
                  </p>

                  <Link
                    to={course.link}
                    className="mt-3 inline-block bg-[#1A2540] text-[#F5F2EC] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#243160] transition-colors duration-300"
                  >
                    Learn More
                  </Link>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;