import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import API_BASE from "../../config.js";
import { filterCoursesByLanguage } from "../../courseLanguage.js";
import { fetchAllLanguageCourses } from "../../languageCourses.js";

const LanguageProgramCarousel = ({ language, apiSlug }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const railRef = useRef(null);

  useEffect(() => {
    let isCurrent = true;
    setLoading(true);
    setError(false);

    fetchAllLanguageCourses(API_BASE)
      .then((allCourses) => {
        if (!isCurrent) return;
        setCourses(filterCoursesByLanguage(allCourses, language));
      })
      .catch((loadError) => {
        console.error(`Could not load ${language} programmes`, loadError);
        if (isCurrent) {
          setCourses([]);
          setError(true);
        }
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [language]);

  useEffect(() => {
    if (courses.length < 2) return undefined;
    const timer = window.setInterval(() => {
      const rail = railRef.current;
      if (!rail || rail.matches(":hover")) return;
      const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 12;
      rail.scrollBy({ left: atEnd ? -rail.scrollWidth : 320, behavior: "smooth" });
    }, 4500);
    return () => window.clearInterval(timer);
  }, [courses.length]);

  const scroll = (direction) => {
    railRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  const heading = `${language} Courses & Programmes`;

  return (
    <section aria-labelledby={`programmes-${apiSlug}`} className="relative w-full bg-[#f4fbfb] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#296166]">Explore more</p>
            <h2 id={`programmes-${apiSlug}`} className="mt-2 text-2xl font-bold text-[#1A2540] sm:text-3xl">
              {heading}
            </h2>
          </div>
          {courses.length > 1 && (
            <div className="hidden gap-2 sm:flex">
              <button type="button" onClick={() => scroll(-1)} aria-label={`Previous ${language} programmes`} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8E0EC] bg-white text-[#296166] shadow-sm hover:bg-[#eef6f6]"><ChevronLeft size={20} /></button>
              <button type="button" onClick={() => scroll(1)} aria-label={`Next ${language} programmes`} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8E0EC] bg-white text-[#296166] shadow-sm hover:bg-[#eef6f6]"><ChevronRight size={20} /></button>
            </div>
          )}
        </div>

        {loading ? (
          <p className="py-8 text-center text-[#4C5C58]" role="status">Loading verified {language} programmes…</p>
        ) : error ? (
          <p className="rounded-xl border border-[#D8E0EC] bg-white px-5 py-8 text-center text-[#4C5C58]" role="status">{language} programmes could not be loaded right now.</p>
        ) : courses.length === 0 ? (
          <p className="rounded-xl border border-[#D8E0EC] bg-white px-5 py-8 text-center text-[#4C5C58]" role="status">No verified {language} programmes are available in the course catalogue yet.</p>
        ) : (
          <div ref={railRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3">
            {courses.map((course) => (
              <Link key={course.id ?? course.slug} to={`/course-details/${encodeURIComponent(apiSlug)}/${encodeURIComponent(course.slug)}/`} className="min-w-[260px] max-w-[320px] flex-1 snap-start overflow-hidden rounded-2xl border border-[#D8E0EC] bg-white shadow-sm transition-shadow hover:shadow-lg">
                <div className="h-48 overflow-hidden bg-[#eef6f6]">
                  <img src={course.image || course.banner || "/images/learnlangma.jpg"} alt={course.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#1A2540]">{course.title}</h3>
                  <span className="mt-4 inline-flex rounded-full bg-[#1A2540] px-5 py-2 text-sm font-semibold text-white">Explore course <span className="ml-2" aria-hidden="true">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LanguageProgramCarousel;
