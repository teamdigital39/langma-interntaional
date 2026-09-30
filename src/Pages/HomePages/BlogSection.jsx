import API_BASE from "../../config.js";
import React, { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Clock3, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./BlogUI.css";

const stripHtml = (value = "") => value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const getExcerpt = (blog) => {
  const source = blog.excerpt || blog.description || stripHtml(blog.content || "");
  return source.length > 115 ? `${source.slice(0, 112).trim()}…` : source || "Practical guidance for language learning and global opportunities.";
};
const getCategory = (blog) => blog.category || blog.category_name || blog.categoryName || "Global Learning";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/home`)
      .then((res) => res.json())
      .then((data) => data.status && data.blogs && setBlogs(data.blogs))
      .catch((err) => console.log(err));
  }, []);

  if (!blogs || blogs.length === 0) {
    return <section className="bg-[#F3FFFE] py-14"><p className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500">Loading blogs…</p></section>;
  }

  return (
    <section className="langma-blog-ui bg-gradient-to-b from-[#F3FFFE] to-white py-16 md:py-20" aria-labelledby="homepage-blog-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="blog-eyebrow mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#16826B]">From the Langma journal</p>
            <h2 id="homepage-blog-heading" className="blog-heading max-w-2xl text-3xl font-extrabold tracking-tight text-[#0F2A44] md:text-4xl">Insights for learning, travel and global careers.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">Useful ideas and practical guidance to help you make your next international move with confidence.</p>
          </div>
          <Link to="/blog/" className="inline-flex w-fit items-center gap-2 rounded-full border border-[#2FC7A1] bg-white px-5 py-3 text-sm font-extrabold text-[#16826B] shadow-sm transition hover:bg-[#2FC7A1] hover:text-white">See all articles <ArrowRight size={16} /></Link>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={22}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={500}
          loop={blogs.length > 3}
          className="!overflow-visible pb-14 [&_.swiper-button-next]:!text-[#16826B] [&_.swiper-button-prev]:!text-[#16826B] [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination-bullet-active]:!bg-[#2FC7A1]"
          breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 1.35 }, 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
        >
          {blogs.map((blog, index) => <SwiperSlide key={`${blog.slug || blog.id}-${index}`} className="!h-auto">
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_26px_rgba(15,42,68,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(15,42,68,0.13)]">
              <Link to={`/blog-detail/${blog.slug}/`} className="relative block aspect-[16/9] overflow-hidden bg-slate-100">
                <img src={blog.image} alt={blog.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#16826B] shadow-sm"><Tag size={12} />{getCategory(blog)}</span>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400"><span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-[#FC6441]" />Latest</span><span className="inline-flex items-center gap-1.5"><Clock3 size={14} className="text-[#2FC7A1]" />5 min read</span></div>
                <h3 className="mt-3 line-clamp-2 text-lg font-extrabold leading-snug text-[#0F2A44] transition group-hover:text-[#16826B]"><Link to={`/blog-detail/${blog.slug}/`}>{blog.title}</Link></h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{getExcerpt(blog)}</p>
                <Link to={`/blog-detail/${blog.slug}/`} className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#16826B]">Read article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
              </div>
            </article>
          </SwiperSlide>)}
        </Swiper>
      </div>
    </section>
  );
};

export default BlogSection;
