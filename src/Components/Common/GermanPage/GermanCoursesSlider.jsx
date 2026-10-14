import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import API_BASE from "../../../config.js";

const CARD_WIDTH = 320; // card + gap

const GermanCoursesSlider = () => {
  const sliderRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadCourses() {
      try {
        const response = await fetch(
          `${API_BASE}/api/language-page/online-german-language-course`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(`German courses request failed (${response.status})`);
        }

        const data = await response.json();
        if (!data.status || !Array.isArray(data.details)) {
          throw new Error(data.message || "German courses could not be loaded");
        }

        setCourses(data.details.filter((course) => course.title && course.slug));
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          console.error("German courses could not be loaded", loadError);
          setError("German courses are temporarily unavailable.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCourses();
    return () => controller.abort();
  }, []);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -CARD_WIDTH, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
  };

  useEffect(() => {
    if (courses.length < 2) return undefined;

    const interval = setInterval(() => {
      if (!sliderRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        sliderRef.current.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [courses.length]);

  return (
    <section className="w-full bg-[#f4fbfb] py-10 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto relative">
        <h2 className="mb-6 text-center text-2xl font-semibold text-[#212529]">
          German Courses &amp; Programs
        </h2>

        {loading ? (
          <p className="py-8 text-center" role="status">Loading German courses…</p>
        ) : error ? (
          <p className="py-8 text-center text-red-700" role="alert">{error}</p>
        ) : courses.length === 0 ? (
          <p className="py-8 text-center">No German courses are available yet.</p>
        ) : (
          <>
            {courses.length > 1 && (
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Previous German courses"
                className="hidden lg:flex absolute left-[-25px] top-1/2 -translate-y-1/2
                w-10 h-10 rounded-full border border-[#7bbcbc] text-[#212529]
                items-center justify-center bg-white shadow hover:bg-[#e6f5f4] z-10"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            <div
              ref={sliderRef}
              className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar px-1"
            >
              {courses.map((item) => (
                <Link
                  key={item.id}
                  to={`/course-details/online-german-language-course/${encodeURIComponent(item.slug)}`}
                  className="min-w-[260px] max-w-[260px] overflow-hidden rounded-4xl bg-white shadow-lg"
                >
                  <div className="h-[180px] w-full overflow-hidden">
                    <img
                      src={item.image || item.banner || "/images/learnlangma.jpg"}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="py-5 text-center">
                    <p className="text-[16px] font-medium text-[#212529]">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {courses.length > 1 && (
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Next German courses"
                className="hidden lg:flex absolute right-[-25px] top-1/2 -translate-y-1/2
                w-10 h-10 rounded-full border border-[#7bbcbc] text-[#2f6668]
                items-center justify-center bg-white shadow hover:bg-[#e6f5f4] z-10"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default GermanCoursesSlider;
import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import API_BASE from "../../../config.js";

const CARD_WIDTH = 320; // card + gap

const GermanCoursesSlider = () => {
  const sliderRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadCourses() {
      try {
        const response = await fetch(
          `${API_BASE}/api/language-page/online-german-language-course`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(`German courses request failed (${response.status})`);
        }

        const data = await response.json();
        if (!data.status || !Array.isArray(data.details)) {
          throw new Error(data.message || "German courses could not be loaded");
        }

        setCourses(data.details.filter((course) => course.title && course.slug));
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          console.error("German courses could not be loaded", loadError);
          setError("German courses are temporarily unavailable.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCourses();
    return () => controller.abort();
  }, []);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -CARD_WIDTH, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
  };

  useEffect(() => {
    if (courses.length < 2) return undefined;

    const interval = setInterval(() => {
      if (!sliderRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        sliderRef.current.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [courses.length]);

  return (
    <section className="w-full bg-[#f4fbfb] py-10 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto relative">
        <h2 className="mb-6 text-center text-2xl font-semibold text-[#212529]">
          German Courses &amp; Programs
        </h2>

        {loading ? (
          <p className="py-8 text-center" role="status">Loading German courses…</p>
        ) : error ? (
          <p className="py-8 text-center text-red-700" role="alert">{error}</p>
        ) : courses.length === 0 ? (
          <p className="py-8 text-center">No German courses are available yet.</p>
        ) : (
          <>
            {courses.length > 1 && (
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Previous German courses"
                className="hidden lg:flex absolute left-[-25px] top-1/2 -translate-y-1/2
                w-10 h-10 rounded-full border border-[#7bbcbc] text-[#212529]
                items-center justify-center bg-white shadow hover:bg-[#e6f5f4] z-10"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            <div
              ref={sliderRef}
              className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar px-1"
            >
              {courses.map((item) => (
                <Link
                  key={item.id}
                  to={`/course-details/online-german-language-course/${encodeURIComponent(item.slug)}`}
                  className="min-w-[260px] max-w-[260px] overflow-hidden rounded-4xl bg-white shadow-lg"
                >
                  <div className="h-[180px] w-full overflow-hidden">
                    <img
                      src={item.image || item.banner || "/images/learnlangma.jpg"}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="py-5 text-center">
                    <p className="text-[16px] font-medium text-[#212529]">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {courses.length > 1 && (
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Next German courses"
                className="hidden lg:flex absolute right-[-25px] top-1/2 -translate-y-1/2
                w-10 h-10 rounded-full border border-[#7bbcbc] text-[#2f6668]
                items-center justify-center bg-white shadow hover:bg-[#e6f5f4] z-10"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default GermanCoursesSlider;
