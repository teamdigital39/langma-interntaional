import React, { useEffect, useRef, useState } from "react";

/* ── Animated counter hook ─────────────────────────────────────── */
const useCounter = (rawValue, duration, run) => {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!run) return;
    const numeric = parseInt(rawValue.replace(/[^0-9]/g, ""), 10);
    const suffix  = rawValue.replace(/[0-9]/g, "");
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(eased * numeric) + suffix);
      if (p < 1) requestAnimationFrame(tick);
      else setDisplay(rawValue);
    };
    requestAnimationFrame(tick);
  }, [run, rawValue, duration]);
  return display;
};

/* ── Intersection trigger hook ─────────────────────────────────── */
const useInView = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

/* ══ LANGUAGES CARD (tall, with image) ═══════════════════════════ */
const LanguagesCard = () => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const count = useCounter("50", 1600, inView);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="stats-card-shimmer bg-[#006064] text-white rounded-2xl p-6 shadow-lg flex flex-col justify-between w-full"
      style={{
        opacity: inView ? 1 : 0,
        transform: hovered
          ? "translateY(-8px) scale(1.03)"
          : inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1),
                     transform 0.5s cubic-bezier(0.4,0,0.2,1),
                     box-shadow 0.3s ease`,
        transitionDelay: inView ? "0ms" : "0ms",
        boxShadow: hovered ? "0 22px 44px rgba(0,96,100,0.3)" : "",
      }}
    >
      <div>
        <div
          className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
          style={{
            transform: hovered ? "rotate(12deg) scale(1.15)" : "rotate(0deg) scale(1)",
            transition: "transform 0.4s ease",
          }}
        >
          <img src="/images/Mask group.png" alt="Languages icon" />
        </div>

        <h2
          className="text-3xl font-bold"
          style={{
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease",
            display: "inline-block",
          }}
        >
          {count}
        </h2>
        <p className="uppercase tracking-wide text-sm mt-1">Languages</p>
        <p className="text-sm mt-4 leading-relaxed">
          Master a new language. We offer certified training across four continents.
        </p>
      </div>

      <div className="h-auto rounded-xl flex items-center justify-center text-xl mt-4">
        <img
          src="/images/learning-foreign-languages 1.png"
          alt="learning-foreign-languages"
          className="stats-lang-image rounded-xl -mt-4"
        />
      </div>
    </div>
  );
};

/* ══ PLAIN STAT CARD ════════════════════════════════════════════ */
const PlainCard = ({ value, label, description, bg, text, delay }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const count = useCounter(value, 1800, inView);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`stats-card-shimmer ${bg} ${text} rounded-2xl p-6 w-full cursor-pointer`}
      style={{
        opacity: inView ? 1 : 0,
        transform: hovered
          ? "translateY(-8px) scale(1.03)"
          : inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${inView ? delay : 0}ms,
                     transform 0.5s cubic-bezier(0.4,0,0.2,1) ${inView ? 0 : delay}ms,
                     box-shadow 0.3s ease`,
        boxShadow: hovered ? "0 20px 40px rgba(0,96,100,0.2)" : "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        className="text-3xl font-bold"
        style={{
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.3s ease",
          display: "inline-block",
        }}
      >
        {count}
      </h2>
      <p className="uppercase tracking-wide text-sm mt-1">{label}</p>
      <p className="text-sm mt-4 leading-relaxed">{description}</p>
    </div>
  );
};

/* ══ MAIN EXPORT ════════════════════════════════════════════════ */
const StatsCards = () => (
  <section className="w-full py-10 bg-white overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">

        <LanguagesCard />

        <PlainCard
          value="300+"
          label="Trainers"
          description="Learn from experienced certified trainers who are experts in fluency and culture."
          bg="bg-[#80CBC4]"
          text="text-[#004D40]"
          delay={150}
        />

        <PlainCard
          value="50k+"
          label="Jobs"
          description="Students empowered globally, achieving their educational and professional aspirations with Langma."
          bg="bg-[#E0F7FA]"
          text="text-[#004D40]"
          delay={300}
        />

        <PlainCard
          value="100k+"
          label="Students Taught"
          description="Successful career placements worldwide, matching talent with top international companies."
          bg="bg-[#80CBC4]"
          text="text-[#004D40]"
          delay={450}
        />

      </div>
    </div>
  </section>
);

export default StatsCards;
