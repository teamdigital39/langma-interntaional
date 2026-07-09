import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import PopupForm from "../../Components/PopupForm";


const headings = [
  "Communicate with the World",
  "Celebrating Multilingualism",
  "Celebrating Cultural Diversity",
];

const cards = [
  { id: 1, image: "/images/41.jpg", title: "Mr. Sanjeev Rawat", desc: "The grace of Buchaechum (Korean Fan Dance) took centre stage as Langma International students celebrated Seollal, bringing one of Korea's most iconic performing arts to life." },
  // { id: 2, image: "/images/02.png", title: "Mr. Sanjeev Rawat", desc: "and the Langma Team welcoming H.E Oleksandr Polishchuk, Ambassador of Ukraine to India." },
  { id: 3, image: "/images/43.jpg", title: "Mr. Sanjeev Rawat", desc: "Students joyfully experienced Korean culture through traditional hanbok, Seollal festivities, and interactive experiences that fostered meaningful cultural connection and appreciation." },
  { id: 4, image: "/images/44.jpg", title: "Mr. Sanjeev Rawat", desc: "Seollal, the Korean Lunar New Year, offered a meaningful glimpse into Korea's cherished customs, festive traditions, and the cultural values passed down through generations." },
  { id: 5, image: "/images/45.jpg", title: "Mr. Sanjeev Rawat", desc: "Traditional Japanese attire and captivating performances brought the spirit of Kodomo no Hi (Japanese Children's Day) to life as Langma International students celebrated one of Japan's most cherished festivals." },
  { id: 6, image: "/images/46.jpg", title: "Mr. Sanjeev Rawat", desc: "Bringing Japanese characters to life, students proudly showcased their kanji creations while exploring a tradition deeply rooted in Japan's cultural identity." },
  { id: 7, image: "/images/47.jpg", title: "Mr. Sanjeev Rawat", desc: "Marking Kodomo no Hi (Japanese Children's Day), celebrated annually on 5 May, Langma International students embraced Japanese traditions through vibrant Yukata, artistic performances, and joyful cultural celebrations." },
  { id: 8, image: "/images/48.jpg", title: "Mr. Sanjeev Rawat", desc: "Immersed in Kodomo no Hi (Japanese Children's Day), Langma International Students experienced the richness of Japanese culture through joyful traditions, captured in the spirit of \"Shashin o torimashou!\"" },
  { id: 9, image: "/images/49.jpg", title: "Mr. Sanjeev Rawat", desc: "Representing Langma International at the Chinese Embassy, students marked Chinese Language Day with performances reflecting the elegance and artistic legacy of Shūfǎ (Chinese calligraphy)." },
  { id: 10, image: "/images/50.jpg", title: "Mr. Sanjeev Rawat", desc: "Sanjeev Rawat, Founder of Langma International, alongside delegates from the Embassy of China and Mandarin language students during a memorable exchange celebrating language, culture, and meaningful cross-cultural connections." },
  { id: 11, image: "/images/51.jpg", title: "Mr. Sanjeev Rawat", desc: "Inspired by Kintsugi (金継ぎ), the Japanese art of repairing broken pottery with gold, students discovered how imperfections can become symbols of resilience, beauty, and renewal." },
  { id: 12, image: "/images/52.jpg", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat, Founder of Langma International, together with Japanese language trainers and students, celebrated the timeless philosophy of Kintsugi, where every restored piece reflects resilience, craftsmanship, and renewal." },
  { id: 13, image: "/images/53.jpg", title: "Mr. Sanjeev Rawat", desc: "Oktoberfest, the world's largest folk festival, transformed Langma International into a vibrant celebration where Bavarian festivities, creativity, and student participation came together." },
  { id: 14, image: "/images/54.jpg", title: "Mr. Sanjeev Rawat", desc: "With a cheerful \"Prost!\", Langma International's German language students celebrated Oktoberfest, experiencing the traditions and festive spirit that have made Bavaria's iconic festival renowned around the world." },
  // { id: 5, image: "/images/16.webp", title: "Mr. Sanjeev Rawat", desc: "and the Langma Team welcoming H.E Oleksandr Polishchuk, Ambassador of Ukraine to India." },
];

const examLogos = [
  { id: 1, image: "/images/lu1.svg", alt: "Exam certification 1" },
  { id: 2, image: "/images/lu2.svg", alt: "Exam certification 2" },
  { id: 3, image: "/images/lu3.svg", alt: "Goethe Institut" },
  { id: 4, image: "/images/lu4.svg", alt: "Exam certification 4" },
];

const LangmaSection = () => {
  const [open, setOpen] = useState(false);
  const [leftImage, setLeftImage] = useState(cards[0].image);
  const examPrevRef = useRef(null);
  const examNextRef = useRef(null);

   const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % headings.length);
        setFade(true); // fade in next heading
      }, 400); // matches transition duration
    }, 2500); // time each heading stays visible

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white pt-20 md:pt-28 lg:pt-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative px-4">

        <div className="text-center mb-3 lg:mb-7  ml-0 md:ml-[25%] lg:ml-[25%]">
          {/* <h2 className="text-[28px] md:text-[34px] font-bold mb-2">
           Langma International<span className="text-[#296166]"> Expands Horizons </span>
          </h2> */}
         <h2
      className={`text-[28px] md:text-[34px] font-bold mb-2 transition-opacity duration-400 ease-in-out ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      {headings[index]}
    </h2>
          <p className="text-[16px] md:text-[18px] text-gray-700">
            Supporting individuals and organizations in achieving their international aspirations.
          </p>
        </div>

        <div className="relative">

      {/* LEFT IMAGE */}
      <div className="hidden md:block absolute -bottom-28 left-0 w-1/3 lg:w-1/3 z-0 overflow-hidden shadow-xl rounded-tr-[40px] rounded-br-[40px]">

        <img
          src={leftImage}
          alt="Hidden Slide"
          className="w-full h-[420px] md:h-[520px] lg:h-[620px] object-cover rounded-tr-[40px] rounded-br-[40px] rounded-tr-[40px] mt-10 transition-all duration-500"
        />

      </div>

      {/* SLIDER */}
      <div className="relative z-10 md:ml-20 mx-auto">

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}

          onSlideChange={(swiper) => {

            // image which goes hidden on left side
            const hiddenIndex =
              (swiper.realIndex - 1 + cards.length) % cards.length;

            setLeftImage(cards[hiddenIndex].image);
          }}

          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}

          className="pb-10 overflow-visible"
        >

          {cards.map((card) => (
            <SwiperSlide key={card.id} className="h-auto">

              <div className="h-auto bg-white rounded-2xl shadow-xl border border-gray-100 max-w-[300px] mx-auto mb-4 flex flex-col overflow-hidden">

                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-44 shrink-0 object-cover rounded-t-2xl"
                />

                <div className="p-3 text-center md:text-left flex-1 overflow-hidden">

                  <p className="text-gray-700 text-sm leading-snug ">
                    {card.desc}
                  </p>

                </div>

              </div>

            </SwiperSlide>
          ))}

        </Swiper>

      </div>

    </div>

        <section className="bg-white pb-4">
          <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">

            <div className="lg:w-1/2 text-center lg:text-left mt-0 md:mt-35">
              <h2 className="text-[28px] lg:text-[32px] font-bold text-gray-900">
                We Prepare You For <br />
                <span className="text-[#296166]">International Exam</span>
              </h2>


              <p className="text-gray-700 text-[16px] md:text-lg mt-3">

                Our expert faculty and resources help you achieve top scores in international exams.
                Learn from experienced mentors and get personalized guidance.
              </p>

              <button onClick={() => setOpen(!open)} className="cursor-pointer bg-[#DB8771] text-white font-semibold px-6 py-3 rounded-lg mt-6 hover:opacity-90 transition">
                Learn More
              </button>
            </div>

            <div className="lg:w-1/2 w-full overflow-visible relative px-2 sm:px-12">
              <button
                ref={examPrevRef}
                aria-label="Previous exam logo"
                className="
                  hidden sm:flex
                  absolute left-0 top-1/2 -translate-y-1/2 z-10
                  w-10 h-10 items-center justify-center
                  rounded-full bg-white
                  border border-[#d9e8e7]
                  text-[#006064]
                  shadow-[0_2px_10px_rgba(0,0,0,0.08)]
                  hover:bg-[#006064] hover:text-white hover:border-[#006064]
                  transition-all duration-300
                "
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>

              <button
                ref={examNextRef}
                aria-label="Next exam logo"
                className="
                  hidden sm:flex
                  absolute right-0 top-1/2 -translate-y-1/2 z-10
                  w-10 h-10 items-center justify-center
                  rounded-full bg-white
                  border border-[#d9e8e7]
                  text-[#006064]
                  shadow-[0_2px_10px_rgba(0,0,0,0.08)]
                  hover:bg-[#006064] hover:text-white hover:border-[#006064]
                  transition-all duration-300
                "
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>

              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                navigation={{
                  prevEl: examPrevRef.current,
                  nextEl: examNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = examPrevRef.current;
                  swiper.params.navigation.nextEl = examNextRef.current;
                }}
                className="exam-logo-swiper py-6"
              >
                {examLogos.map((logo) => (
                  <SwiperSlide key={logo.id} className="p-2">
                    <div
                      className="
                        rounded-2xl bg-white
                        border border-[#e2ebe9]
                        shadow-[0_2px_14px_rgba(0,96,100,0.06)]
                        hover:border-[#2FC7A1]/40
                        hover:shadow-[0_6px_20px_rgba(47,199,161,0.12)]
                        transition-all duration-300
                        p-5
                      "
                    >
                      <img
                        src={logo.image}
                        alt={logo.alt}
                        className="w-full h-[140px] object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

          </div>
        </section>
      </div>
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </section>
  );
};


export default LangmaSection;