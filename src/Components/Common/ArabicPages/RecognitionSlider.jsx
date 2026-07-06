import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

const RecognitionSlider = ({ slides }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!slides?.length) return null;

  const showNav = slides.length > 1;

  return (
    <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {showNav && (
          <p className="mb-6 text-center text-sm font-medium text-gray-600">
            {activeIndex + 1} / {slides.length}
          </p>
        )}

        <div className="relative">
          {showNav && (
            <>
              <button
                ref={prevRef}
                type="button"
                aria-label="Previous recognition"
                className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-[#296166] shadow-sm transition hover:border-[#296166] hover:bg-[#296166] hover:text-white sm:h-11 sm:w-11 lg:-left-4 xl:-left-14"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                ref={nextRef}
                type="button"
                aria-label="Next recognition"
                className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-[#296166] shadow-sm transition hover:border-[#296166] hover:bg-[#296166] hover:text-white sm:h-11 sm:w-11 lg:-right-4 xl:-right-14"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <Swiper
            className={showNav ? "px-12 sm:px-14 lg:px-16" : undefined}
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={32}
            loop={showNav}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (!swiper.params.navigation) return;
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            {slides.map((slide, index) => {
              const imageFirst = index % 2 === 1;

              return (
                <SwiperSlide key={slide.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                    <div
                      className={`text-center lg:text-left ${
                        imageFirst ? "order-1 lg:order-2" : "order-1"
                      }`}
                    >
                      <h2 className="text-[22px] sm:text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                        {slide.titlePrefix !== false && (
                          <>Langma International: </>
                        )}
                        <span className="text-[#296166]">{slide.titleHighlight}</span>
                      </h2>
                      <p className="text-gray-600 text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed">
                        {slide.description}
                      </p>
                    </div>

                    <div
                      className={`flex justify-center ${
                        imageFirst
                          ? "lg:justify-start order-2 lg:order-1"
                          : "lg:justify-end order-2"
                      }`}
                    >
                      <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                        <img
                          src={slide.imageSrc}
                          alt={slide.imageAlt}
                          className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RecognitionSlider;
