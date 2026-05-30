import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";

function Event() {
  const [muted, setMuted] = useState(true);

  const blogs = [
    { id: 1, image: "/images/ue1.png" },
    { id: 2, image: "/images/ue2.png" },
    { id: 3, image: "/images/ue3.png" },
    { id: 4, image: "/images/ue4.png" },
    { id: 5, image: "/images/ue5.png" },
    { id: 6, image: "/images/ue6.png" },
    { id: 7, image: "/images/ue7.png" },
    { id: 8, image: "/images/ue8.png" },
    { id: 9, image: "/images/ue9.png" },
    { id: 10, image: "/images/10.webp" },
    { id: 11, image: "/images/11.webp" },
    { id: 12, image: "/images/12.webp" },
    { id: 13, image: "/images/13m.webp" },
    { id: 14, image: "/images/14.webp" },
    { id: 15, image: "/images/15.webp" },
    { id: 16, image: "/images/16.webp" },
    { id: 17, image: "/images/17.webp" },
    { id: 18, image: "/images/18.webp" },
    { id: 19, image: "/images/19.webp" },
  ];

  const [visibleCount, setVisibleCount] = useState(9);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <>
      {/* ───────────── HERO VIDEO BANNER ───────────── */}
      <div className="relative w-full h-64 md:h-[600px] overflow-hidden">

        {/* VIDEO */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted={muted}
          loop
          playsInline
          controls={false}
        >
          <source
            src="https://res.cloudinary.com/dzv9zcrlz/video/upload/q_auto/f_auto/v1779535873/EVENT-VIDEO-WEBSITE_vaqbrb.mp4"
            type="video/mp4"
          />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

        {/* HEADING */}
        <div className="absolute inset-0 z-20 flex items-center justify-center text-white text-center px-4">
          <h2 className="text-[28px] md:text-[42px] font-bold">Events</h2>
        </div>

        {/* SOUND TOGGLE BUTTON */}
        {muted ? (
          <button
            onClick={() => setMuted(false)}
            className="absolute bottom-4 right-4 z-30 bg-black/60 text-white px-3 py-2 rounded-full text-sm hover:bg-black/80 transition"
          >
            🔇 Tap for Sound
          </button>
        ) : (
          <button
            onClick={() => setMuted(true)}
            className="absolute bottom-4 right-4 z-30 bg-black/60 text-white px-3 py-2 rounded-full text-sm hover:bg-black/80 transition"
          >
            🔊 Mute
          </button>
        )}

      </div>

      {/* ───────────── ABOUT SECTION ───────────── */}
      <section className="w-full py-10 lg:py-20 overflow-hidden relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">

          {/* LEFT — Image + Text */}
          <div>
            <div className="rounded-[28px] overflow-hidden shadow-lg mb-6">
              <img
                src="/images/en1.png"
                alt="meeting"
                className="w-full h-[260px] object-cover"
              />
            </div>

            <p className="text-[#212529] text-[16px] lg:text-[18px] leading-7">
              At Langma, we empower learners with expert foreign language
              training, cultural understanding, and globally aligned programs
              designed for students, professionals, and organizations. Since
              2007, we have delivered 50+ international and regional language
              courses, helping individuals achieve career growth, international
              exam success, study abroad goals, and stronger communication
              skills.
            </p>
          </div>

          {/* CENTER — Vision & Mission */}
          <div>
            <p className="text-[#212529] text-lg mb-2">Langma International</p>

            <h2 className="text-[28px] lg:text-[32px] font-bold leading-tight text-[#212529] mb-8 lg:mb-14">
              Shape Tomorrow <br />
              Connect <span className="text-[#E41F23]">Beyond Borders</span>
            </h2>

            <div className="space-y-6">
              <div className="bg-[#f9cfcf]/70 mb-[0px] lg:-mb-[69px] backdrop-blur-sm rounded-[24px] p-6 shadow-sm border border-[#f2baba]">
                <h3 className="text-[#E41F23] font-bold text-[22px] lg:text-[25px] mb-3 uppercase">
                  Our Vision
                </h3>
                <p className="text-[#2d2d2d] leading-7 pb-6 text-[15px] uppercase">
                  TO BE THE FIRST CHOICE FOR ALL FOREIGN LANGUAGE ENTHUSIASTS.
                </p>
                <hr className="py-3" />
                <h3 className="text-[#E41F23] font-bold text-[22px] lg:text-[25px] mb-3 uppercase">
                  Our Mission
                </h3>
                <p className="text-[#2d2d2d] leading-7 text-[15px] uppercase">
                  EMPOWERING ENTITIES WITH TOP NOTCH FOREIGN LANGUAGE TRAINING
                  AND LINGUIST SERVICES.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Image Card */}
          <div className="flex justify-center lg:justify-end mt-4 lg:mt-[236px]">
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl w-full h-[333px] cursor-pointer border border-[#222]">
              <img
                src="/images/abtp.jpg"
                className="w-full h-full object-cover"
                alt=""
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* ───────────── GALLERY SECTION ───────────── */}
      <div className="py-10 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-2xl font-bold mb-6 text-[#0F2A44]">
            Langma Connects The World
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(0, visibleCount).map((blog) => (
              <div key={blog.id}>
                <img
                  src={blog.image}
                  alt="event"
                  className="w-full mb-1"
                />
              </div>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < blogs.length && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="bg-[#2FC7A1] text-white px-6 py-2 rounded-full cursor-pointer hover:bg-[#28b090] transition-colors duration-200"
              >
                Load More
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Event;