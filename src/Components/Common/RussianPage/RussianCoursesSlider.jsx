import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const courses = [
  {
    title: "English Kids",
    image: "/images/englishkids.jpg",
  },
  {
    title: "General ENGLISH",
    image: "/images/englishgeneral.jpg",
  },
  {
    title: "Learn ENGLISH at Lang...",
    image: "/images/learnlangma.jpg",
  },
  {
    title: "Spoken Arabic",
    image: "/images/general.jpg",
  },
  {
    title: "Learn Arabic at Langma",
    image: "/images/langma.jpg",
  },
  {
    title: "Spoken Arabic",
    image: "/images/general.jpg",
  },
];

const CARD_WIDTH = 320; // card + gap

const RussianCoursesSlider = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -CARD_WIDTH, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
  };

  // ✅ AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      if (!sliderRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      // agar end aa gaya to start se
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        sliderRef.current.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
      }
    }, 3000); // ⏱ 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#f4fbfb] py-10 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto relative">

        {/* LEFT ARROW */}
        <button
          onClick={scrollLeft}
          className="hidden lg:flex absolute left-[-25px] top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full border border-[#7bbcbc] text-[#212529]
          items-center justify-center bg-white shadow hover:bg-[#e6f5f4] z-10"
        >
          <ChevronLeft size={22} />
        </button>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar px-1"
        >
          {courses.map((item, index) => (
            <div
              key={index}
              className="min-w-[260px] max-w-[260px] bg-white rounded-4xl shadow-lg"
            >
              {/* IMAGE */}
              <div className="w-full h-[180px] overflow-hidden rounded-t-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* TEXT */}
              <div className="py-5 text-center">
                <p className="text-[#212529] font-medium text-[16px]">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={scrollRight}
          className="hidden lg:flex absolute right-[-25px] top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full border border-[#7bbcbc] text-[#2f6668]
          items-center justify-center bg-white shadow hover:bg-[#e6f5f4] z-10"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
};

export default RussianCoursesSlider;
