// import React from "react";
// import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Link } from "react-router-dom";

// import "swiper/css";
// import "swiper/css/navigation";

// const SwiperButtons = () => {
//   const swiper = useSwiper();

//   return (
//     <div className="flex justify-center items-center gap-6 mt-6">
//       <button
//         onClick={() => swiper.slidePrev()}
//         className="cursor-pointer w-14 h-14 flex items-center justify-center rounded-full bg-white border-2 border-[#4FA3D1] text-[#4FA3D1] hover:bg-[#4FA3D1] hover:text-white transition-all duration-300 shadow-lg"
//       >
//         <ChevronLeft size={28} />
//       </button>

//       <button
//         onClick={() => swiper.slideNext()}
//         className="cursor-pointer w-14 h-14 flex items-center justify-center rounded-full bg-white border-2 border-[#4FA3D1] text-[#4FA3D1] hover:bg-[#4FA3D1] hover:text-white transition-all duration-300 shadow-lg"
//       >
//         <ChevronRight size={28} />
//       </button>
//     </div>
//   );
// };

// const Study = ({ data = [] }) => {
//   return (
//     <section className="w-full py-14 overflow-hidden bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-full mx-auto">

        
//         <h2 className="text-center text-[28px] lg:text-[32px] font-bold text-gray-900 px-4">
//           Why Choose  {" "}
//           <span className="text-[#4FA3D1]">Langma International</span>
//         </h2>

//         <div className="relative flex flex-col xl:flex-row items-center">

          
//           <div className="hidden xl:block w-[340px] h-[620px] rounded-tr-[10px] rounded-br-[10px] overflow-hidden shadow-xl flex-shrink-0">
//             <img
//               src="/images/Group 4467.png"
//               alt="Study Abroad"
//               className="w-full h-full object-cover"
//             />
//           </div>

          
//           <div className="w-full ml-0 xl:-ml-16 relative">

//             <Swiper
//               modules={[Navigation, Autoplay]}
//               autoplay={{
//                 delay: 3000,
//                 disableOnInteraction: false,
//               }}
//               loop={data.length > 3}
//               spaceBetween={14}
//               breakpoints={{
//                 0: { slidesPerView: 1 },
//                 768: { slidesPerView: 2 },
//                 1024: { slidesPerView: 3 },
//               }}
//               className="px-4"
//             >
//               {data.map((item, index) => (
//                 <SwiperSlide key={item.id || index}>

//                   <div className="group w-full h-[420px] rounded-[45px] relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer">

                    
//                     <div
//                       className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
//                       style={{
//                         backgroundImage: `url(${item.image || "/images/nlg.jpeg"})`,
//                       }}
//                     />

                   
//                     <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-500"></div>
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

//                     {/* CONTENT */}
//                     <div className="absolute bottom-10 left-0 right-0 text-center px-4 z-10">
                   

//                       <p className="text-white text-sm mb-3 opacity-80 line-clamp-2">
//                         {item.content}
//                       </p>

//                       <Link to={item.path || "#"}>
//                         <button className="bg-white/90 backdrop-blur-md text-[#006064] font-semibold px-10 py-2.5 rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:scale-105">
//                           {item.title}
//                         </button>
//                       </Link>
//                     </div>

//                   </div>

//                 </SwiperSlide>
//               ))}

              
//               <SwiperButtons />

//             </Swiper>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Study;

import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

/* Buttons */
const SwiperButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="flex justify-center items-center gap-6 mt-6">
      <button
        onClick={() => swiper.slidePrev()}
        className="cursor-pointer w-14 h-14 flex items-center justify-center rounded-full bg-white border-2 border-[#4FA3D1] text-[#4FA3D1] hover:bg-[#4FA3D1] hover:text-white transition-all duration-300 shadow-lg"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={() => swiper.slideNext()}
        className="cursor-pointer w-14 h-14 flex items-center justify-center rounded-full bg-white border-2 border-[#4FA3D1] text-[#4FA3D1] hover:bg-[#4FA3D1] hover:text-white transition-all duration-300 shadow-lg"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

const Study = () => {
  const cards = [
    {
      image: "/images/personalization-.webp",
      title: "Personalization",
      content:
        "The language courses in Langma School can be personalized based on the requirement of the candidate. We provide customized programs based on the purpose of study and convenient time period or duration (academic, examination, business or employment) if it is employment we further customize the program according to the industry, including vocabulary from the respective field.",
      path: "/study-in-australia",
    },
    {
      image: "/images/flexible-time.webp",
      title: "Flexible",
      content:
        "Candidate is able to select the timings and mode for the language classes. Online and offline modes are available for all languages, and for students connecting via internet, the suitable time slot can be offered which aligns with the country’s timings. Also the option of taking individual or group classes is made available for candidates.",
      path: "/study-in-canada",
    },
    {
      image: "/images/one-to-one.webp",
      title: "One-on-One Guidence",
      content:
        "Langma International of Languages provides the study material used during the course. All students are given the text books and workbooks for the particular language, audio CDs and dictionaries for the particular language. Workshops, audio visuals are conducted to enhance the speaking ability of the students as well.",
      path: "/study-in-uk",
    },
    {
      image: "/images/placement-opportunities.webp",
      title: "Placement Opportunity",
      content:
        "Upon completion of the foreign language courses, students will be offered placements or internships with within our network of partners who hire candidates for linguistic skills. Our clients are from different industries and students can select according to their preferences.",
      path: "/study-in-usa",
    },
  ];

  return (
    <section className="w-full py-14 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-full mx-auto">

        {/* Static Heading */}
        <h2 className="text-center text-[28px] lg:text-[32px] font-bold text-gray-900 px-4">
          Why Choose{" "}
          <span className="text-[#4FA3D1]">Langma International</span>
        </h2>

        <div className="relative flex flex-col xl:flex-row items-center">

          {/* Left Image */}
          <div className="hidden xl:block w-[340px] h-[620px] rounded-tr-[10px] rounded-br-[10px] overflow-hidden shadow-xl flex-shrink-0">
            <img
              src="/images/Group 4467.png"
              alt="Study Abroad"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Swiper */}
          <div className="w-full ml-0 xl:-ml-16 relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              spaceBetween={14}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="px-4"
            >
              {cards.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="group w-full h-[420px] rounded-[45px] relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer">

                    {/* Image */}
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                    {/* Content */}
                    <div className="absolute bottom-10 left-0 right-0 text-center px-4 z-10">
                      <p className="text-white text-sm mb-3 opacity-80 line-clamp-2">
                        {item.content}
                      </p>

                      <Link>
                        <button className="bg-white/90 backdrop-blur-md text-[#006064] font-semibold px-10 py-2.5 rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:scale-105">
                          {item.title}
                        </button>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <SwiperButtons />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Study;