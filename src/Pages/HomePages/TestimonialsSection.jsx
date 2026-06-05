import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import API_BASE from "../../config.js";

const StarRating = ({ rating = 5 }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

/* Fallback static testimonials */
const staticTestimonials = [
  {
    id: 1,
    name: "Riya Sharma",
    role: "French Language Student",
    image: "https://i.pravatar.cc/80?img=10",
    text: "Langma International transformed my language learning journey. The teachers are incredibly supportive and the curriculum is world-class.",
    rating: 5,
  },
  {
    id: 2,
    name: "Arjun Mehta",
    role: "Study Abroad – Germany",
    image: "https://i.pravatar.cc/80?img=15",
    text: "Thanks to Langma, I secured admission in a top German university. Their guidance on language proficiency and visa was invaluable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Work Abroad – Japan",
    image: "https://i.pravatar.cc/80?img=21",
    text: "The Japanese language training at Langma helped me land a job in Tokyo. I couldn't have done it without their expert mentors.",
    rating: 5,
  },
  {
    id: 4,
    name: "Karan Singh",
    role: "PR by Investment Consultant",
    image: "https://i.pravatar.cc/80?img=33",
    text: "Langma's global assist team guided me through the entire Golden Visa process. Professional, efficient, and trustworthy.",
    rating: 5,
  },
  {
    id: 5,
    name: "Sneha Gupta",
    role: "Arabic Language Student",
    image: "https://i.pravatar.cc/80?img=44",
    text: "I joined Langma for Arabic and within 6 months I was confidently communicating in professional settings. Amazing experience!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(staticTestimonials);

  useEffect(() => {
    fetch(`${API_BASE}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        }
      })
      .catch(() => {
        // Keep static fallback silently
      });
  }, []);

  return (
    <section className="w-full py-14 bg-gradient-to-b from-[#F2FEFF] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[#2FC7A1] uppercase tracking-wider mb-2">
            ◇ Student Stories
          </p>
          <h2 className="text-[28px] lg:text-[34px] font-bold text-gray-900">
            What Our <span className="text-[#4FA3D1]">Students Say</span>
          </h2>
          <p className="text-gray-500 mt-2 text-base max-w-xl mx-auto">
            Real experiences from real people who transformed their lives with Langma International.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          loop={testimonials.length > 3}
          speed={600}
          breakpoints={{
            0:    { slidesPerView: 1 },
            768:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14 [&_.swiper-pagination]:!relative [&_.swiper-pagination]:!mt-8"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                {/* Quote mark */}
                <span className="text-5xl text-[#4FA3D1] leading-none font-serif mb-3 opacity-30">
                  "
                </span>

                <StarRating rating={item.rating || 5} />

                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {item.text || item.content || item.review}
                </p>

                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                  <img
                    src={item.image || `https://i.pravatar.cc/80?img=${item.id}`}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#4FA3D1]"
                  />
                  <div>
                    <p className="font-semibold text-[#15224C] text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.role || item.designation || "Langma Student"}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
