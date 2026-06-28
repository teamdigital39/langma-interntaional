import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import PopupForm from "../../Components/PopupForm";
 
const cards = [
  { id: 1, image: "/images/01.png", title: "Mr. Sanjeev Rawat", desc: " Mr. Sanjeev Rawat and Ms. Persy Jain alongside Ms. Kerstin Peckl, Commercial Attaché of Austria to India. " },
  // { id: 2, image: "/images/02.png", title: "Mr. Sanjeev Rawat", desc: "and the Langma Team welcoming H.E Oleksandr Polishchuk, Ambassador of Ukraine to India." },
  { id: 3, image: "/images/04.png", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat with the Indian delegation at the Great Wall of China during a cultural visit." },
  { id: 4, image: "/images/05.png", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat with the Indian delegation at the World Chinese Language Conference, fostering international language and cultural exchange." },
  { id: 5, image: "/images/06.png", title: "Mr. Sanjeev Rawat", desc: "Langma International Team with Mr. Hee Chun Lee, Director of International Affairs Office, Graduate School of Culture and Arts, Korea, alongside Mr. Manit Acharya from Global Education Services Co., Ltd." },
  { id: 6, image: "/images/07.png", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat, Founder of Langma International, with the Indian delegation at the World Chinese Language Conference, China." },
  { id: 7, image: "/images/08.png", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat with Mr. Rysusuke Hagiwara, First Secretary of Japan, during an international cultural and educational engagement." },
  { id: 8, image: "/images/09.png", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat and Mr. Gopal Kumar Kar with H.E. Xu Feihong, Ambassador of China to India." },
  { id: 9, image: "/images/10.png", title: "Mr. Sanjeev Rawat", desc: "Langma International Team experiencing Vietnamese culture and strengthening global cultural understanding." },
  { id: 10, image: "/images/11.png", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat during an official interaction with Mr. and Mrs. Wang Zhen, Minister Counsellor of the People’s Republic of China in India." },
  { id: 11, image: "/images/12.png", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat and Ms. Persy Jain honouring the German delegation ." },
  { id: 12, image: "/images/13.png", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat with H.E. Oleksandr Polishchuk, Ambassador of Ukraine to India, during a diplomatic engagement at Langma International." },
  { id: 13, image: "/images/14.png", title: "Mr. Sanjeev Rawat", desc: "Mr Sanjeev Rawat and the Langma Team welcoming H.E Oleksandr Polishchuk, Ambassador of Ukraine to India at Langma International." },
  { id: 14, image: "/images/15.png", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat with Ms. Ekaterina Dynyak, Head of the Russian Language Educational Centre, Russian Centre of Science and Culture, New Delhi, during an engagement fostering international educational collaboration." },
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
  return (
    <section className="bg-white pt-20 md:pt-28 lg:pt-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative px-4">

        <div className="text-center mb-3 lg:mb-7  ml-0 md:ml-[25%] lg:ml-[25%]">
          <h2 className="text-[28px] md:text-[34px] font-bold mb-2">
            Langma Unites <span className="text-[#296166]">the World</span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-gray-700">
            Connecting minds, cultures, and opportunities worldwide.
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

  <div className="h-[300px] bg-white rounded-2xl shadow-xl border border-gray-100 max-w-[300px] mx-auto mb-4 flex flex-col">

                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-44 object-cover rounded-t-2xl"
                />

                <div className="p-5 text-center md:text-left">

                  <p className="text-gray-700 text-sm">
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

