import API_BASE from "../../../config.js";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function normalizeCourseContent(html = "") {
  if (!html || typeof document === "undefined") return html;

  const template = document.createElement("template");
  template.innerHTML = html;

  template.content.querySelectorAll(".row").forEach((row) => {
    const columns = Array.from(row.children).filter((child) =>
      child.matches("[class*='col-']")
    );
    const imageColumns = columns.filter((column) => column.querySelector("img"));
    const textColumns = columns.filter((column) => !column.querySelector("img"));

    // Keep one-image rows unchanged; group multiple images into a single gallery.
    if (imageColumns.length < 2 || textColumns.length === 0) return;

    const pair = document.createElement("div");
    pair.className = "course-media-copy-pair";
    const gallery = document.createElement("div");
    gallery.className = "course-media-gallery";
    const copy = document.createElement("div");
    copy.className = "course-copy-group";

    imageColumns.forEach((imageColumn) => {
      imageColumn.classList.add("course-media-item");
      gallery.appendChild(imageColumn);
    });

    textColumns.forEach((column) => {
      column.classList.add("course-copy-item");
      copy.appendChild(column);
    });

    pair.append(gallery, copy);
    row.replaceChildren(pair);
    row.classList.add("course-content-multi-media-row");
  });

  return template.innerHTML;
}

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

  const formattedCourseContent = normalizeCourseContent(course.content);

  return (
    <div className="course-detail-page w-full bg-[#f5fafb] text-[#16343a]">

      {/* HERO SECTION */}
      <section className="course-detail-hero relative isolate min-h-[430px] overflow-hidden bg-[#0b2738] md:min-h-[560px]">

        <img
          src={course.banner}
          alt={course.title}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,28,43,0.94)_0%,rgba(6,28,43,0.76)_46%,rgba(6,28,43,0.35)_100%)]"></div>
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full border border-white/10 bg-[#33c39a]/10 blur-2xl"></div>

        <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-center px-5 py-16 sm:px-8 md:min-h-[560px] lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm font-semibold tracking-wide text-white/90">
              <span className="rounded-full border border-[#8be0c2]/50 bg-[#33c39a]/20 px-4 py-2 text-[#c9ffed]">
                Langma Language Programme
              </span>
              <span className="text-white/60">Online · Classroom · Corporate</span>
            </div>

            <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-7xl">
              {course.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
              Build practical speaking, listening and writing skills with structured guidance, flexible classes and a clear learning path.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#course-content" className="inline-flex items-center rounded-full bg-[#33c39a] px-6 py-3 font-semibold text-[#073c39] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#62dcb3]">
                Explore the course <span className="ml-2" aria-hidden="true">↓</span>
              </a>
              <a href="tel:+919810117094" className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">
                Speak to a counsellor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 md:py-16">

        {/* FEATURE IMAGE */}
        <div className="overflow-hidden rounded-[28px] border border-[#d9ecea] bg-white p-2 shadow-[0_15px_40px_rgba(13,71,76,0.1)] md:rounded-[35px] md:p-3">
          <img
            src={course.image}
            alt={course.title}
            className="aspect-[16/8] w-full rounded-[22px] object-contain bg-white md:aspect-[16/7]"
          />
        </div>

        {/* TITLE */}
        <div className="mx-auto mb-8 mt-10 max-w-4xl text-center md:mb-12 md:mt-14">
          <span className="inline-flex rounded-full bg-[#dff6f8] px-5 py-2 text-sm font-semibold tracking-wide text-[#006064] shadow-sm">
            Course details
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight text-[#16343a] sm:text-4xl md:text-5xl">
            {course.title}
          </h2>
          <div className="mx-auto mt-5 h-1.5 w-24 rounded-full bg-[#33c39a]"></div>
        </div>

        {/* CONTENT */}
        <div
          id="course-content"
          className="course-content rounded-[28px] border border-[#d9ecea] bg-white px-5 py-7 shadow-[0_10px_35px_rgba(13,71,76,0.08)] sm:px-8 md:rounded-[35px] md:px-12 md:py-10"
          dangerouslySetInnerHTML={{
            __html: formattedCourseContent,
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
                  <div className="relative aspect-[16/9] overflow-hidden bg-white">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        w-full
                        h-full
                        object-contain
                        bg-white
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />

                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex min-h-[190px] flex-col">

                    <h3 className="text-2xl font-bold text-[#1a1a1a] leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    <span
                      className="
                        mt-auto inline-flex w-fit items-center gap-2
                        rounded-full bg-[#134E4A] px-5 py-2.5
                        text-sm font-semibold text-white
                        shadow-sm transition-all duration-300
                        group-hover:bg-[#0f3d3a] group-hover:shadow-md
                      "
                    >
                      Learn More
                      <span aria-hidden="true">→</span>
                    </span>

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
          .course-detail-page {
            --detail-ink: #16343a;
            --detail-teal: #075d62;
            --detail-mint: #33c39a;
            --detail-line: #d9ecea;
            background-image:
              radial-gradient(circle at 7% 31%, rgba(51, 195, 154, 0.08) 0 2px, transparent 2.5px),
              radial-gradient(circle at 92% 68%, rgba(7, 93, 98, 0.06) 0 2px, transparent 2.5px);
            background-size: 30px 30px, 34px 34px;
          }

          .course-detail-hero::before {
            content: "";
            position: absolute;
            z-index: -1;
            top: -190px;
            right: -120px;
            width: 470px;
            height: 470px;
            border: 1px solid rgba(163, 246, 219, 0.28);
            border-radius: 50%;
            box-shadow:
              0 0 0 28px rgba(163, 246, 219, 0.06),
              0 0 0 58px rgba(163, 246, 219, 0.04),
              0 0 0 88px rgba(163, 246, 219, 0.025);
            pointer-events: none;
          }

          .course-detail-hero::after {
            content: "";
            position: absolute;
            z-index: -1;
            left: 7%;
            bottom: 8%;
            width: 150px;
            height: 150px;
            border: 1px solid rgba(255, 255, 255, 0.16);
            transform: rotate(45deg);
            pointer-events: none;
          }

          .course-detail-page .course-content {
            position: relative;
          }

          .course-detail-page .course-content::before {
            content: "";
            position: absolute;
            top: 22px;
            right: 24px;
            width: 46px;
            height: 46px;
            border-top: 2px solid rgba(51, 195, 154, 0.35);
            border-right: 2px solid rgba(51, 195, 154, 0.35);
            border-radius: 0 16px 0 0;
            pointer-events: none;
          }

          .course-content {
            color: #36545a;
            font-size: 17px;
            line-height: 1.85;
            overflow-wrap: anywhere;
          }

          .course-content > *:first-child {
            margin-top: 0;
          }

          .course-content > *:last-child {
            margin-bottom: 0;
          }

          /* The API wraps each programme in a Bootstrap-style section. */
          .course-content .container {
            max-width: 1020px;
            padding: 0;
            margin-right: auto;
            margin-left: auto;
          }

          .course-content > .container > .py-3,
          .course-content section .container > .py-3 {
            padding: 0 !important;
          }

          .course-content section .container > p,
          .course-content section .container > h1,
          .course-content section .container > h2,
          .course-content section .container > h3,
          .course-content section .container > h4,
          .course-content section .container > table,
          .course-content section .container .py-3 > p,
          .course-content section .container .py-3 > h1,
          .course-content section .container .py-3 > h2,
          .course-content section .container .py-3 > h3,
          .course-content section .container .py-3 > h4,
          .course-content section .container .py-3 > table {
            max-width: 900px;
            margin-right: auto;
            margin-left: auto;
          }

          .course-content section .container > p:first-of-type,
          .course-content section .container .py-3 > p:first-child {
            margin-top: 0;
            padding: 22px 26px;
            border-left: 4px solid #33c39a;
            border-radius: 0 18px 18px 0;
            background: #f1fbf8;
            color: #214d54;
            font-size: clamp(1.05rem, 1.8vw, 1.2rem);
            line-height: 1.8;
          }

          .course-content > .container > .py-3 {
            padding: 0 !important;
          }

          /* Avoid showing the CMS label immediately before its semantic heading. */
          .course-content .text-uppercase.fw-bold.py-2 {
            display: none;
          }

          .course-content .py-3,
          .course-content > section {
            max-width: 1020px;
            margin-right: auto;
            margin-left: auto;
          }

          .course-content .py-3 > p,
          .course-content > section > p,
          .course-content > section > h1,
          .course-content > section > h2,
          .course-content > section > h3,
          .course-content > section > h4,
          .course-content > section > table {
            max-width: 900px;
            margin-right: auto;
            margin-left: auto;
          }

          .course-content .py-3 > p,
          .course-content .py-3 > h2,
          .course-content .py-3 > h3,
          .course-content .py-3 > table {
            max-width: 900px;
            margin-right: auto;
            margin-left: auto;
          }

          .course-content .py-3 > p:first-child,
          .course-content > section > p:first-child {
            margin-top: 0;
            padding: 22px 26px;
            border-left: 4px solid #33c39a;
            border-radius: 0 18px 18px 0;
            background: #f1fbf8;
            color: #214d54;
            font-size: clamp(1.05rem, 1.8vw, 1.2rem);
            line-height: 1.8;
          }

          .course-content h1,
          .course-content h2,
          .course-content h3,
          .course-content h4,
          .course-content h5,
          .course-content h6 {
            color: #075d62;
            font-weight: 750;
            letter-spacing: -0.015em;
            margin-top: 42px;
            margin-bottom: 16px;
            line-height: 1.25;
            scroll-margin-top: 24px;
          }

          .course-content h1 {
            font-size: clamp(1.75rem, 3vw, 2.6rem);
          }

          .course-content h2 {
            position: relative;
            padding: 14px 0 14px 20px;
            border-bottom: 1px solid #d9ecea;
            font-size: clamp(1.5rem, 2.4vw, 2.05rem);
          }

          .course-content h2::before {
            content: "";
            position: absolute;
            left: 0;
            top: 14px;
            bottom: 14px;
            width: 4px;
            border-radius: 99px;
            background: #33c39a;
          }

          .course-content h2::after {
            content: "";
            position: absolute;
            right: 0;
            bottom: -2px;
            width: 58px;
            height: 3px;
            border-radius: 99px;
            background: #33c39a;
          }

          .course-content h3 {
            font-size: clamp(1.25rem, 2vw, 1.55rem);
            color: #16343a;
          }

          .course-content h3,
          .course-content h4 {
            position: relative;
            padding: 14px 0 14px 20px;
            border-bottom: 1px solid #d9ecea;
            color: #075d62 !important;
          }

          .course-content h3::before,
          .course-content h4::before {
            content: "";
            position: absolute;
            left: 0;
            top: 14px;
            bottom: 14px;
            width: 4px;
            border-radius: 99px;
            background: #33c39a;
          }

          .course-content h3::after,
          .course-content h4::after {
            content: "";
            position: absolute;
            right: 0;
            bottom: -2px;
            width: 52px;
            height: 3px;
            border-radius: 99px;
            background: #33c39a;
          }

          .course-content > section > h3,
          .course-content > section > h4 {
            position: relative;
            padding: 14px 0 14px 20px !important;
            border-bottom: 1px solid #d9ecea;
            color: #075d62 !important;
            font-size: clamp(1.2rem, 2vw, 1.6rem) !important;
            font-weight: 750 !important;
            text-align: left !important;
          }

          .course-content > section > h3::before,
          .course-content > section > h4::before {
            content: "";
            position: absolute;
            left: 0;
            top: 14px;
            bottom: 14px;
            width: 4px;
            border-radius: 99px;
            background: #33c39a;
          }

          .course-content > section > h3::after,
          .course-content > section > h4::after {
            content: "";
            position: absolute;
            right: 0;
            bottom: -2px;
            width: 52px;
            height: 3px;
            border-radius: 99px;
            background: #33c39a;
          }

          .course-content h4,
          .course-content h5,
          .course-content h6 {
            font-size: 1.1rem !important;
            color: #16896f !important;
          }

          /* Some legacy API entries contain inline heading styles. */
          .course-content h1 {
            font-size: clamp(1.75rem, 3vw, 2.6rem) !important;
            color: #075d62 !important;
          }

          .course-content h2 {
            font-size: clamp(1.5rem, 2.4vw, 2.05rem) !important;
            color: #075d62 !important;
          }

          .course-content h3 {
            font-size: clamp(1.25rem, 2vw, 1.55rem) !important;
            color: #16343a !important;
          }

          .course-content p {
            margin: 0 0 22px;
            color: #456269;
            font-size: 1em;
            line-height: 1.9;
          }

          .course-content > p:first-of-type {
            color: #294b53;
            font-size: 1.08em;
            line-height: 1.8;
          }

          .course-content strong,
          .course-content b {
            color: #16343a;
            font-weight: 750;
          }

          .course-content ul,
          .course-content ol {
            margin: 22px 0 26px;
            padding-left: 1.6rem;
          }

          .course-content ul {
            list-style: disc;
          }

          .course-content ol {
            list-style: decimal;
          }

          .course-content li {
            margin: 0 0 11px;
            padding-left: 5px;
            color: #456269;
          }

          .course-content li::marker {
            color: #20a47d;
            font-weight: 700;
          }

          .course-content hr {
            margin: 34px 0;
            border: 0;
            border-top: 1px solid #d9ecea;
          }

          .course-content img {
            display: block;
            width: 100%;
            height: auto;
            max-height: 620px;
            margin: 30px auto;
            border: 1px solid #d9ecea;
            border-radius: 20px;
            object-fit: contain;
            background: #fff;
            box-shadow: 0 10px 28px rgba(13, 71, 76, 0.08);
          }

          /* API image-and-copy rows: image left, supporting content right. */
          .course-content .row {
            display: grid;
            grid-template-columns: minmax(190px, 0.72fr) minmax(0, 1.28fr) !important;
            align-items: start;
            gap: clamp(24px, 4vw, 56px);
            max-width: 1020px;
            margin: 42px auto;
          }

          .course-content .row {
            display: flex !important;
            flex-wrap: nowrap;
          }

          .course-content .row > .col-12.col-lg-3 {
            flex: 0 0 28%;
          }

          .course-content .row > .col-12.col-lg-9 {
            flex: 1 1 auto;
            min-width: 0;
          }

          /* Keep image-bearing columns on the left even when API column order varies. */
          .course-content .row > [class*="col-"]:has(img) {
            order: 1;
            flex: 0 0 clamp(240px, 28%, 380px);
          }

          .course-content .row > [class*="col-"]:not(:has(img)) {
            order: 2;
            flex: 1 1 auto;
            min-width: 0;
          }

          .course-content .row > [class*="col-"] {
            width: auto;
            max-width: none;
            padding: 0;
          }

          .course-content .row > [class*="col-"] img {
            width: 100%;
            max-height: 520px;
            margin: 0;
            border-radius: 18px;
          }

          .course-content .row > .col-lg-9 > *:first-child,
          .course-content .row > .col-12.col-lg-9 > *:first-child {
            margin-top: 0;
          }

          .course-content .row > .col-lg-9 p,
          .course-content .row > .col-12.col-lg-9 p {
            max-width: none;
          }

          /* Multi-image rows become independent image-left/content-right
             pairs. One-image rows keep the existing treatment above. */
          .course-content .course-content-multi-media-row {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: clamp(28px, 4vw, 48px);
            max-width: 1020px;
            margin: 42px auto;
          }

          .course-content .course-media-copy-pair {
            display: grid;
            grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
            align-items: center;
            gap: clamp(26px, 4vw, 58px);
            min-width: 0;
          }

          .course-content .course-media-gallery {
            position: relative;
            min-height: 430px;
          }

          .course-content .course-media-item,
          .course-content .course-copy-item {
            width: auto !important;
            max-width: none !important;
            min-width: 0;
            padding: 0 !important;
          }

          .course-content .course-media-item img {
            width: 100%;
            height: auto;
            aspect-ratio: 5 / 6;
            max-height: 560px;
            margin: 0;
            object-fit: cover;
            border-radius: 18px;
          }

          .course-content .course-media-gallery > .course-media-item:first-child {
            width: 78% !important;
          }

          .course-content .course-media-gallery > .course-media-item:first-child img {
            height: 460px;
            aspect-ratio: 4 / 5;
            object-fit: cover;
          }

          .course-content .course-media-gallery > .course-media-item:nth-child(2) {
            position: absolute;
            right: 0;
            bottom: 24px;
            z-index: 1;
            width: 54% !important;
            padding: 8px !important;
            border: 1px solid #d9ecea;
            border-radius: 20px;
            background: #fff;
            box-shadow: 0 16px 36px rgba(13, 71, 76, 0.16);
          }

          .course-content .course-media-gallery > .course-media-item:nth-child(2) img {
            aspect-ratio: 4 / 5;
            max-height: 300px;
            object-fit: contain;
            object-position: center top;
            border-radius: 13px;
          }

          .course-content .course-copy-item > *:first-child {
            margin-top: 0;
          }

          .course-content .course-copy-item p {
            max-width: none;
          }

          .course-content table {
            width: 100%;
            margin: 32px 0;
            border: 1px solid #d9ecea;
            border-collapse: separate;
            border-spacing: 0;
            border-radius: 16px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 8px 24px rgba(13, 71, 76, 0.07);
          }

          .course-content table tr:nth-child(even) {
            background: #f5fbfa;
          }

          .course-content table td,
          .course-content table th {
            border-right: 1px solid #d9ecea;
            border-bottom: 1px solid #d9ecea;
            padding: 14px 16px;
            text-align: left;
            vertical-align: top;
            font-size: 15px;
            line-height: 1.55;
          }

          .course-content table tr:last-child td,
          .course-content table tr:last-child th {
            border-bottom: 0;
          }

          .course-content table td:last-child,
          .course-content table th:last-child {
            border-right: 0;
          }

          .course-content table th {
            background: #075d62;
            color: #fff;
            font-weight: 700;
          }

          .course-content table td:first-child {
            width: 34%;
            background: #f1fbf8;
            color: #075d62;
            font-weight: 750;
          }

          .course-content table td:last-child {
            color: #456269;
            font-weight: 600;
          }

          .course-content h3 + p {
            padding-left: 18px;
            border-left: 3px solid #a6ead2;
          }

          .course-content a {
            color: #007d83;
            font-weight: 700;
            text-decoration: underline;
            text-decoration-color: rgba(0, 125, 131, 0.35);
            text-underline-offset: 3px;
          }

          .course-content a:hover {
            color: #0d5558;
            text-decoration-color: currentColor;
          }

          .course-content blockquote {
            margin: 28px 0;
            padding: 18px 20px;
            border-left: 4px solid #33c39a;
            border-radius: 0 14px 14px 0;
            background: #f1fbf8;
            color: #456269;
            font-style: italic;
          }

          @media (max-width: 768px) {
            .course-detail-hero::before {
              top: -150px;
              right: -210px;
              width: 340px;
              height: 340px;
            }

            .course-detail-hero::after {
              left: 4%;
              bottom: 6%;
              width: 90px;
              height: 90px;
            }

            .course-detail-page .course-content::before {
              top: 14px;
              right: 16px;
              width: 30px;
              height: 30px;
            }

            .course-content {
              font-size: 15px;
              line-height: 1.8;
            }

            .course-content .row {
              flex-direction: column;
              flex-wrap: wrap;
              gap: 22px;
              margin: 32px auto;
            }

            .course-content .course-content-multi-media-row {
              gap: 32px;
              margin: 32px auto;
            }

            .course-content .course-media-copy-pair {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .course-content .course-media-gallery {
              display: grid;
              grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr) !important;
              align-items: end;
              gap: 12px;
              min-height: 0;
            }

            .course-content .course-media-gallery > .course-media-item {
              grid-column: auto !important;
              min-width: 0;
            }

            .course-content .course-media-gallery > .course-media-item:first-child,
            .course-content .course-media-gallery > .course-media-item:nth-child(2) {
              position: static;
              width: auto !important;
              padding: 0 !important;
              border: 0;
              border-radius: 0;
              background: transparent;
              box-shadow: none;
            }

            .course-content .course-media-gallery > .course-media-item:first-child img,
            .course-content .course-media-gallery > .course-media-item:nth-child(2) img {
              height: auto;
              aspect-ratio: 4 / 5;
              max-height: none;
              border-radius: 14px;
            }

            .course-content .course-media-item img {
              width: min(100%, 420px);
              margin: 0 auto;
              border-radius: 14px;
            }

            .course-content .row > .col-12.col-lg-3,
            .course-content .row > .col-12.col-lg-9 {
              flex: 0 0 auto;
              width: 100%;
            }

            .course-content .row > [class*="col-"] img {
              width: min(100%, 420px);
              margin: 0 auto;
            }

            .course-content h1,
            .course-content h2,
            .course-content h3,
            .course-content h4,
            .course-content h5,
            .course-content h6 {
              margin-top: 30px;
            }

            .course-content p {
              line-height: 1.8;
            }

            .course-content table {
              display: block;
              overflow-x: auto;
              white-space: nowrap;
            }

            .course-content table td,
            .course-content table th {
              padding: 12px 14px;
            }

            .course-content img {
              margin: 24px auto;
              border-radius: 14px;
            }
          }
        `}
      </style>

    </div>
  );
}


export default Test;
