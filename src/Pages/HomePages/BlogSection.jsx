import API_BASE from "../../config.js";
import React, { useEffect, useState } from "react";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/home`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.blogs) {
          setBlogs(data.blogs);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (!blogs || blogs.length === 0) {
    return <p className="text-center py-10">Loading blogs...</p>;
  }

  // SAME STYLE AS PopularCourses (mapping logic)
  const blogData = blogs.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    slug: item.slug,
  }));

  return (
    <section className="py-16 bg-[#F3FFFE]">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-[#2FC7A1] font-medium mb-2">
              ◇ ALL BLOG POST
            </p>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0F172A]">
              Most Popular Post.
            </h2>
          </div>

          <Link to="/blog">
            <button className="whitespace-nowrap bg-[#2FC7A1] text-[9px] md:text-[17px] text-white px-4 py-2 rounded-full flex items-center gap-2">
              See All Post
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        {/* SWIPER (same pattern as PopularCourses) */}
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
          {blogData.map((blog, index) => (
            <SwiperSlide key={`${blog.slug}-${index}`}>
              <div className="bg-white rounded-2xl shadow-md p-4 h-full flex flex-col">

                <div className="h-[190px] overflow-hidden rounded-xl">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-[#FC6441] mt-3">
                  <CalendarDays size={14} />
                  Latest
                </div>

                <h3 className="mt-2 font-bold text-[#0F2A44] line-clamp-2">
                  {blog.title}
                </h3>

                <div className="mt-auto pt-3">
                  <Link
                    to={`/blog-detail/${blog.slug}`}
                    className="inline-block bg-[#2FC7A1] text-white px-4 py-2 rounded-full"
                  >
                    Read More
                  </Link>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default BlogSection;