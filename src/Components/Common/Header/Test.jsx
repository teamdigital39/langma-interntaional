import API_BASE from "../../../config.js";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function Test() {

  // URL PARAMS
  const { languageSlug, courseSlug } = useParams();

  // STATES
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH COURSE DATA
  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await fetch(
          `${API_BASE}/api/language-page/${languageSlug}`
        );

        const data = await res.json();

        console.log(data);

        if (data.status) {

          // CURRENT COURSE
          const foundCourse = data.details.find(
            (item) => item.slug === courseSlug
          );

          setCourse(foundCourse);

          // RELATED COURSES
          const filteredCourses = data.details.filter(
            (item) => item.slug !== courseSlug
          );

          setRelatedCourses(filteredCourses);

        }

      } catch (error) {

        console.log("API ERROR =>", error);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, [languageSlug, courseSlug]);

  // LOADING
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="">
          Loading...
        </h2>
      </div>
    );
  }

  // NO DATA
  if (!course) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="">
          No Course Found
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8fbfc]">

      {/* HERO SECTION */}
      <section className="relative w-full h-[350px] md:h-[500px] overflow-hidden">

        <img
          src={course.banner}
          alt={course.title}
          className="w-full h-full object-cover scale-105"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">

          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg max-w-5xl">
            {course.title}
          </h1>

          <p className="text-white/80 mt-5 text-lg max-w-2xl leading-8">
            Explore complete language learning programs,
            curriculum, speaking mastery, and international opportunities.
          </p>

        </div>

      </section>

      {/* MAIN SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">

        {/* FEATURE IMAGE */}
        <div className="overflow-hidden rounded-[35px] shadow-[0_15px_40px_rgba(0,0,0,0.15)] mb-14">

          <img
            src={course.image}
            alt={course.title}
            className="w-full h-[260px] md:h-[600px] object-cover hover:scale-105 transition duration-700"
          />

        </div>

        {/* TITLE */}
        <div className="mb-12">

          <span className="inline-block bg-[#dff6f8] text-[#006064] px-5 py-2 rounded-full text-sm font-semibold tracking-wide shadow-sm">
            {course.slug}
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mt-6 leading-tight">
            {course.title}
          </h2>

          <div className="w-28 h-1 bg-[#33c39a] rounded-full mt-5"></div>

        </div>

        {/* CONTENT */}
        <div
          className="
            course-content
            text-gray-700
            leading-9
            text-[17px]
            bg-white
            rounded-[35px]
            shadow-[0_10px_35px_rgba(0,0,0,0.08)]
            p-5
            md:p-12
          "
          dangerouslySetInnerHTML={{
            __html: course.content,
          }}
        />

      </section>

      {/* RELATED COURSES */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">

        <div className="mb-12">

          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
            Related Courses
          </h2>

          <div className="w-24 h-1 bg-[#33c39a] rounded-full mt-4"></div>

        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
           navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay, Navigation]}
          className="pb-15"
        >

          {relatedCourses.map((item, index) => (

            <SwiperSlide key={index}>

              <Link
                to={`/course-details/${languageSlug}/${item.slug}`}
              >

                <div
                  className=" cursor-pointer
                    bg-white
                    rounded-[28px]
                    overflow-hidden
                    shadow-[0_12px_35px_rgba(0,0,0,0.12)]
                    hover:shadow-[0_22px_50px_rgba(0,0,0,0.18)]
                    transition-all
                    duration-500
                    hover:-translate-y-3
                    group
                    h-full
                  "
                >

                  {/* IMAGE */}
                  <div className="overflow-hidden relative">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        w-full
                        h-[260px]
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    <span className="inline-block bg-[#e8fbf6] text-[#0d8f6f] px-4 py-1 rounded-full text-sm font-medium mb-4">
                      {item.slug}
                    </span>

                    <h3 className="text-2xl font-bold text-[#1a1a1a] leading-snug mb-4 line-clamp-2">
                      {item.title}
                    </h3>

                    {/* <button
                      className="
                        bg-[#134E4A]
                        hover:bg-[#0f3d3a]
                        text-white
                        px-6
                        py-3
                        rounded-full
                        font-medium
                        transition-all
                        duration-300
                      "
                    >
                      Explore Course
                    </button> */}

                  </div>

                </div>

              </Link>

            </SwiperSlide>

          ))}

        </Swiper>

      </section>

      {/* CUSTOM STYLE */}
      <style>
        {`
          .course-content h1,
          .course-content h2,
          .course-content h3,
          .course-content h4,
          .course-content h5,
          .course-content h6 {
            color: #006064;
            font-weight: 700;
            margin-top: 30px;
            margin-bottom: 18px;
            line-height: 1.4;
          }

          .course-content h1 {
            font-size: 40px;
          }

          .course-content h2 {
            font-size: 32px;
          }

          .course-content h3 {
            font-size: 26px;
          }

          .course-content p {
            margin-bottom: 22px;
            color: #444;
            font-size: 17px;
            line-height: 1.95;
          }

          .course-content ul,
          .course-content ol {
            padding-left: 24px;
            margin-top: 20px;
            margin-bottom: 20px;
          }

          .course-content ul li,
          .course-content ol li {
            margin-bottom: 12px;
            color: #333;
          }

          .course-content img {
            border-radius: 24px;
            margin-top: 30px;
            margin-bottom: 30px;
            width: 100%;
            box-shadow: 0px 10px 30px rgba(0,0,0,0.08);
          }

          .course-content table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 35px;
            margin-bottom: 35px;
            overflow: hidden;
            border-radius: 20px;
            box-shadow: 0px 10px 25px rgba(0,0,0,0.08);
          }

          .course-content table tr:nth-child(even) {
            background: #f4fbfb;
          }

          .course-content table td,
          .course-content table th {
            border: 1px solid #dbeaea;
            padding: 16px;
            text-align: center;
            font-size: 15px;
          }

          .course-content table th {
            background: #006064;
            color: white;
            font-weight: 600;
          }

          .course-content a {
            color: #00838f;
            font-weight: 600;
            text-decoration: none;
          }

          .course-content a:hover {
            text-decoration: underline;
          }

          blockquote {
            border-left: 4px solid #33c39a;
            padding-left: 20px;
            margin: 25px 0;
            color: #555;
            font-style: italic;
            background: #f7ffff;
            padding: 20px;
            border-radius: 14px;
          }

          @media (max-width: 768px) {

            .course-content {
              padding: 22px;
            }

            .course-content table {
              display: block;
              overflow-x: auto;
              white-space: nowrap;
            }

            .course-content p {
              font-size: 15px;
              line-height: 1.85;
            }

            .course-content h1 {
              font-size: 28px;
            }

            .course-content h2 {
              font-size: 24px;
            }

            .course-content h3 {
              font-size: 20px;
            }
          }
        `}
      </style>

    </div>
  );
}

export default Test;