import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import PopupForm from "../../Components/PopupForm";
import { useState } from "react";
 
const cards = [
  { id: 1, image: "/images/01.png", title: "Mr. Sanjeev Rawat", desc: " Ms. Persy Jain and Mr. Sanjeev Rawat with Ms. Kerstin Peckl, Commercial Attache of Austria to India. " },
  { id: 2, image: "/images/02.png", title: "Mr. Sanjeev Rawat", desc: "and the Langma Team welcoming H.E Oleksandr Polishchuk, Ambassador of Ukraine to India." },
  { id: 3, image: "/images/04.png", title: "Mr. Sanjeev Rawat", desc: "with the Indian delegation at the World Chinese Language Conference." },
  { id: 4, image: "/images/05.png", title: "Mr. Sanjeev Rawat", desc: " Mr. Sanjeev Rawat with the Indian delegation at the World Chinese Language Conference visiting the Great Wall of China." },
  { id: 5, image: "/images/06.png", title: "Mr. Sanjeev Rawat", desc: "Langma’s Team with Mr. Hee Chun Lee, the Director of International Affairs Office Prof. of Graduate School of Culture and Arts (Korea) along with Mr. Manit Acharya from Global Education Services Co., Ltd." },
  { id: 6, image: "/images/07.png", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat with the Indian delegation at the World Chinese Language Conference, China." },
  { id: 7, image: "/images/08.png", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat with the First Secretary of Japan Mr. Rysusuke Hagiwara." },
  { id: 8, image: "/images/09.png", title: "Mr. Sanjeev Rawat", desc: "Mr.Gopal Kumar Kar and Mr. Sanjeev Rawat with the Ambassador of China H.E. Xu Feihong." },
  { id: 9, image: "/images/10.png", title: "Mr. Sanjeev Rawat", desc: "Langma’s Team exploring Vietnamese culture." },
  { id: 10, image: "/images/11.png", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat with Mr and Mrs. Wang Zhen, Minister Counsellor for the People’s Republic of China, India." },
  { id: 11, image: "/images/12.png", title: "Mr. Sanjeev Rawat", desc: "Mr. Sanjeev Rawat and Ms. Persy Jain felicitating the German Counterpart." },
  { id: 12, image: "/images/13.png", title: "Mr. Sanjeev Rawat", desc: "Mr Sanjeev Rawat felicitating the H.E. Oleksandr Polishchuk, Ambassador of Ukraine to India at Langma International." },
  { id: 13, image: "/images/14.png", title: "Mr. Sanjeev Rawat", desc: "Mr Sanjeev Rawat and the Langma Team welcoming H.E Oleksandr Polishchuk, Ambassador of Ukraine to India at Langma International." },
  { id: 14, image: "/images/15.png", title: "Mr. Sanjeev Rawat", desc: "Mr Sanjeev Rawat with Ms Ekaterina Dynyak, Head of Russian Language Educational Centre, Russian Centre of Science and Culture, New Delhi." },
  // { id: 5, image: "/images/16.webp", title: "Mr. Sanjeev Rawat", desc: "and the Langma Team welcoming H.E Oleksandr Polishchuk, Ambassador of Ukraine to India." },
];

const LangmaSection = () => {
  const [open, setOpen] = useState(false);
    const [leftImage, setLeftImage] = useState(cards[0].image);
  return (
    <section className="bg-white pt-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative px-4">

        <div className="text-center mb-3 lg:mb-7 ml-0 lg:ml-[25%]">
          <h2 className="text-[28px] md:text-[34px] font-bold mb-2">
            Langma Unites <span className="text-[#296166]">the World</span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-gray-700">
            Connecting minds, cultures, and opportunities worldwide.
          </p>
        </div>

        <div className="relative">

      {/* LEFT IMAGE */}
      <div className="hidden md:block absolute -bottom-28 left-0 w-2/5 lg:w-1/3 z-0 overflow-hidden shadow-xl rounded-tr-[40px] rounded-br-[40px]">

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

            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-[28px] lg:text-[32px] font-bold text-gray-900">
                We Prepare You For <br />
                <span className="text-[#296166]">International Exam</span>
              </h2>

              <p className="text-gray-700 text-[16px] md:text-lg mt-7">
                Our expert faculty and resources help you achieve top scores in international exams.
                Learn from experienced mentors and get personalized guidance.
              </p>

              <button onClick={() => setOpen(!open)} className="cursor-pointer bg-[#DB8771] text-white font-semibold px-6 py-3 rounded-lg mt-6 hover:opacity-90 transition">
                Learn More
              </button>
            </div>

            <div className="lg:w-1/2 w-full overflow-visible">
  <Swiper
    modules={[Navigation, Autoplay]}
    spaceBetween={16}
    slidesPerView={1}
    loop={true}
    navigation={window.innerWidth >= 640}
    autoplay={{ delay: 2500, disableOnInteraction: false }}
    breakpoints={{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
    className=" py-6"
  >

    <SwiperSlide className="p-0">
      <div className="rounded-xl shadow-2xl overflow-hidden bg-white">
        <img
          src="/images/lu1.svg"
          alt="Exam"
          className="w-full h-[160px] object-cover"
        />
      </div>
    </SwiperSlide>

    <SwiperSlide className="p-3">
      <div className="rounded-xl shadow-2xl overflow-hidden bg-white">
        <img
          src="/images/lu2.svg"
          alt="Exam"
          className="w-full h-[160px] object-cover"
        />
      </div>
    </SwiperSlide>

    <SwiperSlide className="p-3">
      <div className="rounded-xl shadow-2xl overflow-hidden bg-white">
        <img
          src="/images/lu3.svg"
          alt="Exam"
          className="w-full h-[160px] object-cover"
        />
      </div>
    </SwiperSlide>

    <SwiperSlide className="p-3">
      <div className="rounded-xl shadow-2xl overflow-hidden bg-white">
        <img
          src="/images/lu4.svg"
          alt="Exam"
          className="w-full h-[160px] object-cover"
        />
      </div>
    </SwiperSlide>

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