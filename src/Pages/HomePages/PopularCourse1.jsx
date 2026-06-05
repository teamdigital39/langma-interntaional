// import React from "react";
// import { Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const PopularCoursess = ({ data }) => {
//   if (!data || data.length === 0) {
//     return <p className="text-center">No Courses Found</p>;
//   }

//   const courses = data.map((item) => ({
//     id: item.id,
//     title: item.title + " Language",
//     desc: "Learn " + item.title + " professionally",
//     image: item.image,
//     link: "/" + item.slug,
//   }));

//   return (
//     <section className="w-full py-10 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6">

//         <h2 className="text-4xl font-bold mb-8">
//           Popular Courses
//         </h2>

//         <Swiper
//           modules={[Navigation, Pagination]}
//           spaceBetween={30}
//           navigation
//           pagination={{ clickable: true }}
//           breakpoints={{
//             0: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//         >
//           {courses.map((course, index) => (
//             <SwiperSlide key={`${course.id}-${index}`}>
//               <div className="bg-white rounded-2xl shadow-md p-4">

//                 <img
//                   src={course.image}
//                   alt={course.title}
//                   className="w-full h-[200px] object-cover rounded-xl"
//                 />

//                 <h3 className="mt-3 font-bold">{course.title}</h3>

//                 <p className="text-sm text-gray-500">{course.desc}</p>

//                 <Link
//                   to={course.link}
//                   className="mt-3 inline-block bg-yellow-300 px-4 py-2 rounded-full"
//                 >
//                   Enroll Now →
//                 </Link>

//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default PopularCoursess;