import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import API_BASE from "../../config.js";
import { filterCoursesByLanguage } from "../../courseLanguage.js";
import { fetchAllLanguageCourses } from "../../languageCourses.js";

const isIndianRegionalLanguage = (language) =>
  String(language || "").trim().toLowerCase() === "indian regional";

function getCarouselCourses(allCourses, language, regionalFallbacks = []) {
  const matchedCourses = filterCoursesByLanguage(allCourses, language);
  if (!isIndianRegionalLanguage(language)) return matchedCourses;

  const coursesBySlug = new Map(matchedCourses.map((course) => [course.slug, course]));
  return [
    ...matchedCourses,
    ...regionalFallbacks.filter((course) => !coursesBySlug.has(course.slug)),
  ];
}

const LanguageProgramCarousel = ({ language, apiSlug }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const railRef = useRef(null);

  useEffect(() => {
    let isCurrent = true;
    setLoading(true);
    setError(false);

    const loadCourses = async () => {
      const hasRegionalFallback = isIndianRegionalLanguage(language);
      let regionalFallbacks = [];

      try {
        if (hasRegionalFallback) {
          const fallbackModule = await import("../../regionalCourseFallbacks.js");
          regionalFallbacks = fallbackModule.REGIONAL_COURSE_FALLBACKS;
        }

        const allCourses = await fetchAllLanguageCourses(API_BASE);
        if (isCurrent) {
          setCourses(getCarouselCourses(allCourses, language, regionalFallbacks));
        }
      } catch (loadError) {
        console.error(`Could not load ${language} programmes`, loadError);
        if (isCurrent) {
          setCourses(regionalFallbacks);
          setError(!hasRegionalFallback || regionalFallbacks.length === 0);
        }
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    loadCourses();
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
      if (atEnd) {
        rail.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const firstCard = rail.querySelector("a");
        const cardWidth = firstCard?.getBoundingClientRect().width || rail.clientWidth;
        const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0;
        rail.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
      }
    }, 4500);
    return () => window.clearInterval(timer);
  }, [courses.length]);

  const scroll = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const firstCard = rail.querySelector("a");
    const cardWidth = firstCard?.getBoundingClientRect().width || rail.clientWidth;
    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
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
              <Link key={course.id ?? course.slug} to={`/course-details/${encodeURIComponent(apiSlug)}/${encodeURIComponent(course.slug)}/`} aria-label={`Learn more about ${course.title}`} className={`${isIndianRegionalLanguage(language) ? "w-[min(86vw,320px)] min-w-0 max-w-[320px] flex flex-col" : "w-[86vw] min-w-[220px] max-w-[320px] sm:min-w-[260px] sm:flex-1"} flex-none snap-start overflow-hidden rounded-2xl border border-[#D8E0EC] bg-white shadow-sm transition-shadow hover:shadow-lg`}>
                <div className={isIndianRegionalLanguage(language) ? "flex aspect-[3/1] w-full items-center justify-center overflow-hidden bg-white px-3 py-2" : "h-40 overflow-hidden bg-[#eef6f6] sm:h-48"}>
                  <img src={course.image || course.banner || "/images/learnlangma.jpg"} alt={course.title} loading="lazy" decoding="async" className={isIndianRegionalLanguage(language) ? "h-full w-full object-contain" : "h-full w-full object-cover"} />
                </div>
                <div className={isIndianRegionalLanguage(language) ? "flex flex-1 flex-col items-start gap-3 p-4 sm:p-5" : "p-4 sm:p-5"}>
                  <h3 className={`break-words text-sm font-bold text-[#1A2540] sm:text-base ${isIndianRegionalLanguage(language) ? "min-h-[2.5rem]" : ""}`}>{course.title}</h3>
                  <span className="mt-auto inline-flex items-center rounded-full bg-[#1A2540] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#296166]">{isIndianRegionalLanguage(language) ? "Learn More" : "Explore course"}<span className="ml-2" aria-hidden="true">→</span></span>
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
