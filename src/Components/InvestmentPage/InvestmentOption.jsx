import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Optional (better icons)
import { ArrowLeft, ArrowRight } from "lucide-react";

function InvestmentOption() {

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [navPrevEl, setNavPrevEl] = useState(null);
  const [navNextEl, setNavNextEl] = useState(null);

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      setNavPrevEl(prevRef.current);
      setNavNextEl(nextRef.current);
    }
  }, []);

const sections = [
  {
    title: "European Residency by Investment",
    description:
      "Europe remains a top choice for residency investors due to Schengen Zone mobility, quality of life, and strong economic environments.",
    countries: [
      {
        name: "Greece",
        image: "/images/fg.jpg",
        link: "/greece",
        points: [
          "Golden Visa through real estate investment starting from €250,000.",
          // "Allows residency for you and family with access to Schengen travel.",
          // "Opportunity for citizenship after long-term compliance.",
        ],
      },
      {
        name: "Cyprus",
        image: "/images/cyp.jpg",
        link: "/cyprus",
        points: [
          "Residency via real estate investment in the heart of the Mediterranean.",
          // "Fast processing and quality lifestyle benefits.",
        ],
      },
      {
        name: "Latvia",
        image: "/images/ast.jpg",
        link: "/latvia",
        points: [
          "Flexible investment options with minimum qualifying purchase and visa-free Schengen travel.",
        ],
      },
      {
        name: "Canada",
        image: "/images/cnd.jpg",
        link: "/canada",
        points: [
          "Options include Start-Up Visa and investor streams.",
          // "Residencies lead to permanent status and education/work benefits.",
        ],
      },
      {
        name: "United States (EB-5)",
        image: "/images/US.svg",
        link: "/unitedstate",
        points: [
          "Requires a minimum investment of USD 800,000 in qualifying projects.",
          // "Provides pathway to permanent residency.",
        ],
      },
      {
        name: "Costa Rica",
        image: "/images/crr.svg",
        link: "/costaRica",
        points: [
          "Investor residence via minimum business contribution.",
          // "Live, work, or retire in one of Central America’s stable economies.",
        ],
      },
      {
        name: "Hong Kong",
        image: "/images/hnkn.svg",
        link: "/hongkong",
        points: [
          "Investment residence options in one of Asia’s premier business hubs.",
          // "Strategic gateway to Greater China markets.",
        ],
      },
      {
        name: "Malaysia",
        image: "/images/sia.svg",
        link: "/malasiya",
        points: [
          "Multiple investment categories to receive long-term visa privileges.",
          // "Welcoming environment with strong cultural and economic appeal.",
        ],
      },
      {
        name: "Singapore",
        image: "/images/fss.jpg",
        link: "/singapore",
        points: [
          "Global Investor Program for entrepreneurs and business owners.",
          // "Prestigious residency status with significant lifestyle advantages.",
        ],
      },
      {
        name: "Thailand",
        image: "/images/tf.jpg",
        link: "/thailand",
        points: [
          "Privileged Residency and Long-Term Residence programs for qualified investors.",
        ],
      },
      // {
      //   name: "Australia",
      //   image: "/images/af.jpg",
      //   link: "/australia1",
      //   points: [
      //     "Pathways through innovative business and investment visas.",
      //     // "Provides broad access to one of the world’s most stable economies.",
      //   ],
      // },
      {
        name: "United Arab Emirates",
        image: "/images/uf1.jpg",
        link: "/unitedarab",
        points: [
          "Long-term Golden Visa through real estate or business investment.",
          // "Zero personal income tax and quality of life advantages.",
        ],
      },
       {
        name: "Mauritius",
        image: "https://flagcdn.com/w320/mu.png",
        link: "/mauritius",
        points: [
          "Attractive investment residency in a low-tax, business-friendly environment.",
        ],
      },
    ],
  },
];

  return (
    <section className="bg-white pt-16 px-4 pb-6">
      <div className="max-w-[1400px] mx-auto">

        <h2 className="text-[28px] lg:text-[32px] font-semibold text-center text-[#296166] mb-4">
          Global Residency Investment Options
        </h2>

        <p className="text-center text-[#212529] max-w-[800px] font-medium mx-auto mb-12">
          Below is a snapshot of popular residence-by-investment opportunities.
        </p>

        {sections.map((section, index) => (
          <div key={index} className="relative">

            {/* Arrows */}
            <div className="absolute -top-12 right-0 flex gap-3 z-10">
              <button
                ref={prevRef}
                className="bg-white shadow p-2 rounded-full"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                ref={nextRef}
                className="bg-white shadow p-2 rounded-full"
              >
                <ArrowRight size={18} />
              </button>
            </div>

            <Swiper
  modules={[Autoplay, Navigation]}
  spaceBetween={20}
  slidesPerView={1}
  loop={true}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  breakpoints={{
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 },
  }}
  onBeforeInit={(swiper) => {
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
  }}
  navigation={{
    prevEl: navPrevEl,
    nextEl: navNextEl,
  }}
>
  {section.countries.map((country, i) => (
    <SwiperSlide key={i} className="h-auto flex">

      {/* ✅ FULL HEIGHT CARD */}
      <div className="p-6 flex flex-col h-full w-full bg-white">

        {/* ✅ CONTENT AREA */}
        <div className="flex flex-col items-center text-center flex-grow">

         <div className="h-[90px] flex items-center justify-center mb-4">
  <img
    src={country.image}
    alt={country.name}
    className="w-20 h-20 object-contain"
  />
</div>

          {country.points.map((point, p) => (
            <div key={p} className="flex items-start gap-3 mb-4 w-full">
              <img
                src="/images/check.svg"
                className="w-5 h-5 mt-1"
              />
              <p className="text-[#212529] text-[16px] text-left">
                {point}
              </p>
            </div>
          ))}
        </div>

        {/* ✅ BUTTON FIXED AT SAME HEIGHT */}
        <div className="mt-auto pt-4">
          <Link to={country.link}>
            <button className="underline text-[#9D2F58]">
              Know More
            </button>
          </Link>
          <hr className="mt-4 border-t-2 border-gray-200" />
        </div>

      </div>

    </SwiperSlide>
  ))}
</Swiper>

          </div>
        ))}

      </div>
    </section>
  );
}

export default InvestmentOption;