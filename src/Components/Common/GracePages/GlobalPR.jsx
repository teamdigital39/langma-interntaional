import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const cards = [
  {
    title: "Greece Golden Visa",
    subtitle: "Residency by Investment",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    path: "/greece",
  },
  {
    title: "Cyprus Permanent Residency",
    subtitle: "Investment Program",
    image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=800&q=80",
    path: "/cyprus",
  },
  {
    title: "Latvia Residency Program",
    subtitle: "EU Investment Pathway",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=800&q=80",
    path: "/latvia",
  },
  {
    title: "Canada Start-up Visa",
    subtitle: "Entrepreneur PR Program",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80",
    path: "/canada",
  },
  {
    title: "United States EB-5",
    subtitle: "Investor Green Card",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    path: "/unitedstate",
  },
  {
    title: "Costa Rica Residency",
    subtitle: "Investment Residency",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
    path: "/costaRica",
  },
  {
    title: "Hong Kong Investment Visa",
    subtitle: "Business Residency",
    image: "https://images.unsplash.com/photo-1506970845246-18f21d533b20?auto=format&fit=crop&w=800&q=80",
    path: "/hongkong",
  },
  {
    title: "Malaysia MM2H",
    subtitle: "Long-Term Residency",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    path: "/malaysiya",
  },
  {
    title: "Singapore Investor Program",
    subtitle: "Global Investor Programme",
    image: "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=800&q=80",
    path: "/singapore",
  },
  {
    title: "Thailand Elite Visa",
    subtitle: "Long-Term Residency",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    path: "/thailand",
  },
  {
    title: "Australia Investment Visa",
    subtitle: "Business Innovation Stream",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    path: "/australia",
  },
  {
    title: "UAE Golden Visa",
    subtitle: "Long-Term Residency",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    path: "/unitedarab",
  },
  {
    title: "Mauritius Residency",
    subtitle: "Investment Pathway",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    path: "/mauritius",
  },


  // {
  //   title: "Arabic Language",
  //   subtitle: "Language Certification",
  //   image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
  //   path: "/arabic",
  // },
  // {
  //   title: "Balkan Languages",
  //   subtitle: "Regional Language Programs",
  //   image: "https://images.unsplash.com/photo-1526481280691-9069a6d08c68?auto=format&fit=crop&w=800&q=80",
  //   path: "/balkanLanguage",
  // },
  // {
  //   title: "Chinese Language",
  //   subtitle: "Mandarin Certification",
  //   image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80",
  //   path: "/chinese",
  // },
  // {
  //   title: "French Language",
  //   subtitle: "DELF / DALF Preparation",
  //   image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  //   path: "/french",
  // },
  // {
  //   title: "German Language",
  //   subtitle: "Goethe Certification",
  //   image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80",
  //   path: "/german",
  // },
  // {
  //   title: "Hindi Language",
  //   subtitle: "Proficiency Program",
  //   image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
  //   path: "/hindi",
  // },
  // {
  //   title: "Italian Language",
  //   subtitle: "CILS Certification",
  //   image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80",
  //   path: "/italian",
  // },
  // {
  //   title: "Japanese Language",
  //   subtitle: "JLPT Preparation",
  //   image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80",
  //   path: "/japanese",
  // },
  // {
  //   title: "Korean Language",
  //   subtitle: "TOPIK Preparation",
  //   image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
  //   path: "/korian",
  // },
  // {
  //   title: "Russian Language",
  //   subtitle: "TORFL Certification",
  //   image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=800&q=80",
  //   path: "/russian",
  // },
  // {
  //   title: "Persian Language",
  //   subtitle: "Farsi Proficiency",
  //   image: "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?auto=format&fit=crop&w=800&q=80",
  //   path: "/persian",
  // },
  // {
  //   title: "Polish Language",
  //   subtitle: "State Certification",
  //   image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=800&q=80",
  //   path: "/polish",
  // },
  // {
  //   title: "Sanskrit Language",
  //   subtitle: "Classical Language Program",
  //   image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=80",
  //   path: "/sanskrit",
  // },
];


const GlobalPR = () => {
  const sliderRef = useRef(null);
  const location = useLocation();
  const scrollAmount = 320;

  const prev = () => {
    sliderRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const next = () => {
    sliderRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;

    const autoSlide = setInterval(() => {
      if (!slider) return;

      const maxScroll =
        slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft >= maxScroll - 5) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        slider.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(autoSlide);
  }, []);

  return (
    <section className="w-full py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-[32px] font-semibold text-[#296166]">
          Global PR by Investment Opportunities
        </h2>

        <p className="text-[18px] text-[#212529] mt-2">
          Secure permanent residency pathways through investment.
        </p>

        {/* Slider */}
        <div className="mt-12">
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
          >
            {cards
              .filter((item) => location.pathname !== item.path)
              .map((item, index) => (
                <Link to={item.path} key={index}>
                  <div className="snap-start min-w-[280px] h-[180px] rounded-full overflow-hidden relative shadow-md cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-6 text-center">
                      <p className="text-sm font-semibold">
                        {item.title}
                      </p>
                      <p className="text-xs opacity-90 mt-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {/* ✅ Arrows at Bottom Center */}
          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="bg-white shadow-md rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition text-lg"
            >
              ←
            </button>

            <button
              onClick={next}
              className="bg-white shadow-md rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition text-lg"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPR;
