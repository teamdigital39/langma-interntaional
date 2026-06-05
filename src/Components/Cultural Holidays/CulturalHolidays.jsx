import React from "react";
import ContactForm from "../../Pages/HomePages/ContactForm";
import StatsCards from "../../Pages/HomePages/StatsCards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";


import { Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BlogSection from "../../Pages/HomePages/BlogSection";
import LangmaSection from "../../Pages/HomePages/LangmaSection";
import FAQ from "../../Pages/HomePages/FAQ";
import CTASection from "../Common/CTASection";
import Cultural from "./Cultural";
import CulturalHolidayPackages from "./CulturalHolidayPackages";
import WhoCultural from "./WhoCultural";
import Cultural_Infusion_Programs from "./Cultural_Holidays ";
import ConnectedSection from "../../Pages/HomePages/ConnectedSection";
import { useState } from "react";
import PopupForm from "../PopupForm";
// import CulturalInfusion from "./CulturalInfusion";
// import Program_Highlights from "./Program_Highlights";
// import WhoProgramsFor from "./WhoProgramsFor";

const trips = [
  {
    title: "Europe Backpacking",
    image: "/images/re1.png",
  },
  {
    title: "Turkey 10D Group Experience",
    image: "/images/rt.png",
  },
  {
    title: "Egypt – Cruising the Nile",
    image: "/images/re.png",
  },
  {
    title: "Oman",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
  },
];

const places = [
  {
    title: "Uttrakhand",
    tag: " ",
    image: "images/eu.png",
  },
  {
    title: "Himachal Pradesh",
    tag: " ",
    image: "images/eh.png",
  },
  {
    title: "Varanasi",
    tag: "Spiritual",
    image: "images/ev.png",
  },
  {
    title: "Rajasthan",
    tag: "Golden City",
    image: "images/er.png",
  },
  {
    title: "Leh Ladakh & Bike Trips 2026",
    tag: "Ladakh 2026",
    image: "/images/ladak.jpg",
  },
  {
    title: "Spiti Valley",
    tag: "Offer",
    image: "/images/ssp.jpg",
  },
  {
    title: "Arunachal Pradesh",
    tag: "Recommended",
    image: "/images/ap.jpg",
  },
  {
    title: "Mizoram",
    tag: "New",
    image: "/images/mz.jpg",
  },
  {
    title: "Kashmir",
    tag: "Move Loved",
    image: "/images/ks.jpg",
  },
  {
    title: "Meghalaya",
    tag: " ",
    image: "/images/mgh.jpg",
  },
];

const CulturalHolidays = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#F7FAFC]">
        <div onClick={() => setOpen(!open)} className="w-full  grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/clh.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* <div className="absolute bottom-0 md:bottom-8 ml-5 md:ml-20">
              <button onClick={() => setOpen(!open)} className="cursor-pointer inline-flex items-center gap-2 bg-[#006064] text-white px-3 py-1 md:px-8 md:py-3 rounded-full text-sm font-medium hover:bg-[#17a398] transition shadow-lg">
                Let’s Connect →
              </button>
            </div> */}
          </div>
        </div>
      </section>
      {/* <ContactForm/> */}
      {/* <StatsCards/> */}
      <ConnectedSection />
       <section className="bg-[#F4FEFF] py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        
        <h2 className="text-[28px] lg:text-[32px] font-semibold text-[#296166]">
          Recommended Trips
        </h2>
        <p className="text-[#212529] text-[18px] mt-2">
          A great choice for new travelers seeking famous and offbeat spots
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 mt-10">
          {trips.map((trip, index) => (
            <div
              key={index}
              className=" rounded-2xl   transition"
            >
              {/* Image */}
              <img
                src={trip.image}
                alt={trip.title}
                className="w-full h-[409px] object-cover rounded-2xl shadow-[0_0px_10px_rgba(0,0,0,0.5)]"
              />

              {/* Content */}
              <div className="p-4 text-left">
                <h3 className="text-[20px] font-medium text-[#212529]">
                  {trip.title}
                </h3>

                {/* Button */}
                <button onClick={() => setOpen(!open)} className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-full text-sm hover:bg-teal-700 transition cursor-pointer">
                  Let’s Connect →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="bg-gray-100 py-12 px-6">
  <div className="max-w-7xl mx-auto text-center">

    {/* Heading */}
    <h2 className="text-[28px] lg:text-[32px] font-semibold text-[#296166]">
      Explore India
    </h2>
    <p className="text-[#212529] text-[18px] mt-2">
      Journey through the nation's scenic gems
    </p>

    {/* Slider */}
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      className="mt-10"
    >
      {places.map((place, index) => (
        <SwiperSlide key={index}>
          <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.2)] group">

            {/* Image */}
            <img
              src={place.image}
              alt={place.title}
              className="w-full h-64 object-cover transition duration-500 scale-115 group-hover:scale-130"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            {/* Tag */}
            <span
              className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full text-white ${
                place.tag === " " ? "bg-none" : "bg-red-500"
              }`}
            >
              {place.tag}
            </span>

            {/* Title */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
              <h3 className="text-lg font-semibold">
                {place.title}
              </h3>
              
              <Link to="/contact">
  <div className="border border-white rounded-full p-2 hover:bg-white hover:text-black transition cursor-pointer">
    <ArrowRight size={16} />
  </div>
</Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Custom Arrows */}
    <div className="flex justify-center gap-6 mt-8">
      <button className="custom-prev p-3 rounded-full border hover:bg-black hover:text-white transition">
        <ArrowLeft />
      </button>
      <button className="custom-next p-3 rounded-full border hover:bg-black hover:text-white transition">
        <ArrowRight />
      </button>
    </div>

  </div>
</section>
      <Cultural_Infusion_Programs />
      <Cultural />
      <CulturalHolidayPackages />
      <WhoCultural />

      <CTASection
        title="Begin Your Global Education Story"
        desc=""
        buttonText="Start Your Journey Today."
      />
      {/* <BlogSection />
      <LangmaSection /> */}
      <FAQ />
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CulturalHolidays;
