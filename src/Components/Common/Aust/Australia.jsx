import React from 'react'
import ConnectedSection from '../../../Pages/HomePages/ConnectedSection'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import PopupForm from '../../PopupForm';
import { useState } from 'react';


const blogs = [
  {
    id: 1,
    image: "/images/asp1.svg",
    title: "Nursing & Healthcare",
  },
  {
    id: 2,
    image: "/images/asp2.svg",
    title: "IT & Cybersecurity",
  },
  {
    id: 3,
    image: "/images/asp3.svg",
    title: "MBA & Business",
  },
  {
    id: 4,
    image: "/images/asp2.svg",
    title: "IT & Cybersecurity",
  },
];

function Australia() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <section className="relative w-full overflow-hidden bg-[#F7FAFC]">
        <div className="w-full grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/aust.svg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 md:bottom-8 ml-5 md:ml-20">
              <button onClick={() => setOpen(!open)} className="inline-flex items-center gap-2 bg-[#006064] text-white px-3 py-1 md:px-8 md:py-3 rounded-full text-sm font-medium hover:bg-[#17a398] transition shadow-lg">
                Let’s Connect →
              </button>
            </div>
          </div>
        </div>
      </section>
      <ConnectedSection/>
      <section className="w-full bg-[#f4fbfb] py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 hidden lg:block">
            
          </div>

<div
  className=""
>
  <img
    src="/images/ap.svg"
    alt="French Class"
    className="w-full h-full object-cover"
  />
</div>
        </div>

        <div className="w-full lg:w-1/2 text-left mt-20 lg:mt-0">

          <h2 className="text-[#296166] text-[32px] lg:text-[32px] font-semibold leading-snug mb-4">
            Study in Australia with Langma School
of Languages
          </h2>

          <p className="text-[#212529] text-[18px] lg:text-[16px] leading-relaxed mb-4">
            Australia remains one of the most preferred study destinations
due to high-quality education, post-study work visas, and
strong job markets.
          </p>
          <button className="bg-[#33c39a] hover:bg-[#2db18c] transition text-white px-8 py-3 rounded-xl text-[16px] font-medium">
            Connect Us
          </button>
        </div>
      </div>
    </section>
     <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-0">
        <h2 className="text-[32px] font-bold text-center text-[#296166] mb-12">
          Why Study in Europe ?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="p-8 rounded-2xl text-white shadow-xl bg-[#E0F7FA] from-blue-500 to-blue-700 hover:scale-105 transition duration-300">
            <h3 className="text-[25px] text-[#296166] font-bold mb-1">
              Globally Recognized
Degrees
            </h3>
          </div>

          <div className="p-8 rounded-2xl text-white shadow-xl bg-[#296166] from-green-500 to-green-700 hover:scale-105 transition duration-300">
            <h3 className="text-[25px] font-bold mb-1">
              Excellent Quality of
Life
            </h3>
          
          </div>

           <div className="p-8 rounded-2xl text-white shadow-xl bg-[#E0F7FA] from-blue-500 to-blue-700 hover:scale-105 transition duration-300">
            <h3 className="text-[25px] text-[#296166] font-bold mb-1">
             Post-Study Work Visa
Options
            </h3>
          </div>

    <div className="p-8 rounded-2xl text-white shadow-xl bg-[#296166] from-green-500 to-green-700 hover:scale-105 transition duration-300">
            <h3 className="text-[25px] font-bold mb-1">
              Strong PR Pathways
            </h3>
          </div>

        </div>
      </div>
    </section>
<section className="w-full py-10">
  <div className="mx-auto max-w-7xl px-8">

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
                    gap-3 bg-[#212529] rounded-[113px] overflow-hidden">

      <div className="flex items-center justify-center bg-transparent">
        <img
          src="/images/asp1.svg"
          alt="icon-1"
          className="w-full object-contain"
        />
      </div>

      <div className="flex items-center justify-center bg-transparent">
        <img
          src="/images/asp2.svg"
          alt="icon-2"
          className="w-full object-contain"
        />
      </div>

      <div className="flex items-center justify-center bg-transparent">
        <img
          src="/images/as5.png"
          alt="icon-5"
          className="w-full object-contain h-auto lg:h-[258px]"
        />
      </div>

      <div className="flex items-center justify-center bg-transparent">
        <img
          src="/images/asp3.svg"
          alt="icon-3"
          className="w-full object-contain"
        />
      </div>

    </div>

  </div>
</section>


      <section className="py-16  px-8 m-5 ">
  <h2 className="text-[32px] font-semibold text-center mb-10 text-[#212529]">
   Popular Courses
  </h2>

  <div className="relative max-w-7xl mx-auto">

    <Swiper
  modules={[Navigation, Autoplay]}
  spaceBetween={20}
  slidesPerView={1}
  loop={true}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  navigation={{
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  }}
  breakpoints={{
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  className="pb-10"
>

      {blogs.map((blog) => (
        <SwiperSlide key={blog.id}>
          <div className="bg-white rounded-2xl shadow-xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover rounded-xl"
            />
            <div className="p-4">
              <h3 className="text-lg text-center font-semibold">
                {blog.title}
              </h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer z-10">
      ❮
    </div>

    <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer z-10">
      ❯
    </div>

  </div>
</section>
<section className="py-16 px-8">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    <div>
      <img
        src="/images/prr1.svg"
        alt="About Us"
        className=" "
      />
    </div>
    <div>
      <h2 className="text-[32px] font-bold mb-6 text-[#296166]">
        How Langma Helps
      </h2>

      <ul className=" space-y-3 text-[18px] text-[#212529]">
        <li className=" flex items-start gap-3">
          <span className="text-green-600 text-xl">✔</span>
          <span>Japanese (JLPT) Training</span>
        </li>

        <li className="flex items-start gap-3">
          <span className="text-green-600 text-xl">✔</span>
          <span>Korean (TOPIK) Training</span>
        </li>

        <li className="flex items-start gap-3">
          <span className="text-green-600 text-xl">✔</span>
          <span>Application & SOP Support</span>
        </li>

        <li className="flex items-start gap-3">
          <span className="text-green-600 text-xl">✔</span>
          <span>Visa Documentation</span>
        </li>
         <li className="flex items-start gap-3">
          <span className="text-green-600 text-xl">✔</span>
          <span>Pre-departure Guidance</span>
        </li>
      </ul>
    </div>

  </div>
</section>
<PopupForm open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default Australia
