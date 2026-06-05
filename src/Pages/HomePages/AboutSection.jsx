import API_BASE from "../../config.js";
import React, { useEffect, useState } from "react";
import PopupForm from "../../Components/PopupForm";

const AboutSection = () => {
  const [open, setOpen] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/home`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setAboutData(data.about_us);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // 👉 Clean unwanted classes/styles
  const cleanHTML = (html) => {
    if (!html) return "";
    return html
      .replace(/class="[^"]*"/g, "")
      .replace(/style="[^"]*"/g, "");
  };

  // 👉 Limit content (first 500 characters)
  const getLimitedContent = (html) => {
    if (!html) return "";
    const text = html.replace(/<[^>]+>/g, ""); // remove tags for counting
    if (text.length <= 500) return html;

    const trimmedText = text.substring(0, 500) + "...";

    return `<p>${trimmedText}</p>`;
  };

  return (
    <section className="w-full pt-0 lg:pt-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-14 items-center">
        
        {/* LEFT IMAGES */}
        <div className="flex justify-center lg:justify-start items-end gap-3 sm:gap-6 relative scale-[0.88] sm:scale-100 origin-top">

  {/* Left Big Image */}
  <div className="relative group">

    <div className="absolute -inset-2 bg-gradient-to-r from-[#2FC7A1] to-[#429198] rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

    <div className="
      relative
      w-[170px] sm:w-[220px]
    
      rounded-3xl overflow-hidden
      shadow-2xl border-4 border-white
    ">
      <img
        src="/images/onegirl.png"
        alt="Student"
        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
      />
    </div>

  </div>

  <div className="flex flex-col gap-3 sm:gap-6 mb-1 sm:mb-2">

    <div className="relative group self-start">

      <div className="absolute -inset-1 bg-gradient-to-r from-[#2FC7A1] to-[#429198] rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>

      <div className="
        relative
        w-[120px] sm:w-[180px]
        h-[120px] sm:h-[180px]
        rounded-2xl
        flex items-center justify-center
        bg-white shadow-2xl border border-gray-100
      ">
        <img
          src="/images/yearexperince.png"
          alt="Experience"
          className="w-full h-full object-contain p-2"
        />
      </div>

    </div>

    <div className="relative group ml-1 sm:ml-6">

      <div className="absolute -inset-2 bg-gradient-to-r from-[#2FC7A1] to-[#429198] rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

      <div className="
        relative
        w-[170px] sm:w-[240px]
        h-[170px] sm:h-[240px]
        rounded-3xl overflow-hidden
        shadow-2xl border-4 border-white
      ">
        <img
          src="/images/twogirl.png"
          alt="Students"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

    </div>

  </div>

</div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/images/dot.png" alt="dot" className="w-4 h-4" />
            <p className="text-sm font-semibold text-[#2FC7A1] uppercase">
              {aboutData?.title}
            </p>
          </div>

          <h2 className="text-[28px] lg:text-[32px] font-bold text-gray-900 leading-snug mt-3">
            Shape Tomorrow <br />
            Connect <span className="text-[#4FA3D1]">Beyond Borders</span>
          </h2>

          <div
            className="text-gray-600 mt-5 text-lg leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{
              __html: showFull
                ? cleanHTML(aboutData?.content)
                : cleanHTML(getLimitedContent(aboutData?.content)),
            }}
          />

          {/* 👉 Read More Button */}
          {aboutData?.content && (
            <button
              onClick={() => setShowFull(!showFull)}
              className="mt-4 text-[#006064] font-semibold hover:underline"
            >
              {showFull ? "Read Less" : "Read More.."}
            </button>
          )}

          <button onClick={() => setOpen(!open)} className="cursor-pointer mt-8 inline-flex items-center gap-3 bg-[#006064] hover:bg-[#004d4d] transition text-white px-7 py-0.5 rounded-full text-sm font-medium shadow-md">
            Admission Open
            <span className="bg-[#80CBC4] text-white text-[15px] -mr-7 rounded-full flex items-center justify-center px-4 py-3">
              →
            </span>
          </button>
        </div>
      </div>

    <div className="w-full mt-16 relative flex justify-center overflow-hidden">

  <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[660px]">

    <img
      src="/images/client.png"
      alt="Our Clients"
      className="absolute inset-0 w-full h-full object-cover"
    />

    <div className="max-w-7xl mx-auto w-full h-full relative">

      <img
        src="/images/cts.png"
        alt="center"
        className="
          absolute 
          top-1/2 left-1/2 
          w-28 sm:w-40 md:w-56 lg:w-64
          -translate-x-1/2 -translate-y-1/2 
          z-10
        "
      />

      <img
        src="/images/ymm.png"
        alt="left"
        className="
          absolute 
          bottom-[20%] left-[25%]
          w-16 sm:w-20 md:w-28 lg:w-36
          -translate-x-1/2 translate-y-1/2
        "
      />

      <img
        src="/images/smm.png"
        alt="right"
        className="
          absolute 
          bottom-[20%] left-[75%]
          w-16 sm:w-20 md:w-28 lg:w-36
          -translate-x-1/2 translate-y-1/2
        "
      />
        <img
  src="/images/clt6.webp"
  alt="right"
  className="
    absolute aspect-square
    bottom-[5%] left-[50%]
    w-16 sm:w-20 md:w-28 lg:w-36
    -translate-x-1/2 translate-y-[20%]
    rounded-full object-cover
  "
/>

      {/* LEFT TOP */}
      <img
        src="/images/acc.jpeg"
        alt="left-top"
        className="
          absolute 
          top-[27%] left-[25%]
          w-14 sm:w-20 md:w-28 lg:w-32
          aspect-square 
          rounded-full shadow-lg
          -translate-x-1/2 -translate-y-1/2
        "
      />

      {/* RIGHT TOP */}
      <img
        src="/images/ez.jpeg"
        alt="right-top"
        className="
          absolute 
          top-[27%] left-[75%]
          w-14 sm:w-20 md:w-28 lg:w-32
          aspect-square 
          rounded-full shadow-lg
          -translate-x-1/2 -translate-y-1/2
        "
      />

      {/* TOP CENTER */}
      <img
        src="/images/ct5.jpeg"
        alt="top-center"
        className="
          absolute 
          top-[10%] left-1/2
          w-14 sm:w-20 md:w-28 lg:w-32
          aspect-square object-cover 
          rounded-full shadow-lg
          -translate-x-1/2 -translate-y-1/2
        "
      />

    </div>
  </div>
</div>
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default AboutSection;