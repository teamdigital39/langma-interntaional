import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import API_BASE from "../../config";
import "./learnKoreanLanding.css";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const ASSETS = `${BASE}/landing-page/assets`;
const img = (path) => `${ASSETS}/img/${path}`;
const portfolioImg = (path) => `${ASSETS}/img/portfolio/${path}`;
const testimonialImg = (path) => `${ASSETS}/img/testimonials/${path}`;
// Local mp4 is gitignored (*.mp4) so it is not deployed — use hosted asset on live.
const VIDEO_SRC = `${API_BASE}/landing-page/assets/video/korean-video.mp4`;

const CSS_FILES = [
  `${ASSETS}/vendor/bootstrap/css/bootstrap.min.css`,
  `${ASSETS}/vendor/bootstrap-icons/bootstrap-icons.css`,
  `${ASSETS}/vendor/aos/aos.css`,
  `${ASSETS}/vendor/glightbox/css/glightbox.min.css`,
  `${ASSETS}/vendor/remixicon/remixicon.css`,
  `${ASSETS}/vendor/swiper/swiper-bundle.min.css`,
  `${ASSETS}/css/korean.css`,
];

const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i";

const VALUES = [
  {
    image: "german-kids.png",
    title: "Learn Korean for Kids & teens",
    text: "Our institute specializes in teaching Korean to young learners, providing an engaging and effective educational environment.",
  },
  {
    image: "german-adult.png",
    title: "Korean for College students",
    text: "College students can enhance their Korean language skills by enrolling in courses offered at Langma School of Languages.",
  },
  {
    image: "german-professional.png",
    title: "Korean for Professionals",
    text: "Master Business Korean, Conquer Communication, Open doors to international collaborations and negotiations with confidence.",
  },
];

const METHODOLOGIES = [
  { icon: "bi-award-fill", title: "Certificate is valid Globally", text: "The Langma certificate holds global validity." },
  { icon: "ri-brush-4-line", title: "Interactive Classes", text: "We offer interactive classes for an engaging learning experience." },
  { icon: "bi-people-fill", title: "Interview & Job Training", text: "At our institution, we offer comprehensive interview and job training with hands-on mock practices." },
  { icon: "bi-people-fill", title: "Classes Online & offlines", text: "We offer both online and offline classes to accommodate students' convenience." },
  { icon: "bi-laptop-fill", title: "Individual Attention", text: "Each student receives individual attention from the teacher." },
  { icon: "bi-person-fill-check", title: "100% Job Placement Assistance", text: "We provide comprehensive job placement assistance, ensuring support for each and every student to secure employment opportunities with a 100% success rate." },
];

const LEVELS = [
  { cls: "blue", label: "Level 1", title: "Beginner", color: "#2db6fa", bg: "#dbf3fe", text: "Introduces Hangul, the Korean alphabet. You'll learn basic pronunciation, greetings, and simple sentences. Imagine being able to order food or ask for directions in Korean!" },
  { cls: "orange", label: "Level 2", title: "Elementary", color: "#f68c09", bg: "#fde3c4", text: "Builds on your Hangul skills and dives deeper into grammar. You'll start talking about yourself, your family, and your hobbies. Think of introducing yourself and making new Korean friends!" },
  { cls: "green", label: "Level 3", title: "Intermediate", color: "#08da4e", bg: "#cffddf", text: "Expands your vocabulary and refines your grammar. You'll learn to talk about the past, present, and future, and discuss everyday topics like school, work, and travel. Imagine having casual conversations about your day in Korean!" },
  { cls: "red", label: "Level 4", title: "Upper Intermediate", color: "#e9222c", bg: "#fef7f8", text: "Focuses on complex grammar structures and nuances. You'll be able to express opinions, give advice, and participate in longer conversations. Think of confidently discussing your thoughts and feelings in Korean!" },
  { cls: "purple", label: "Level 5", title: "Advanced", color: "#b50edf", bg: "#f8e4fd", text: "Enhances your fluency and comprehension. You'll tackle advanced grammar, idioms, and cultural references. Imagine understanding Korean movies and TV shows without subtitles!" },
  { cls: "pink", label: "Level 6", title: "Proficiency", color: "#f51f9c", bg: "#feecf7", text: "Prepares you for academic or professional use of Korean. You'll master formal writing, research skills, and specialized vocabulary. Think of writing essays or giving presentations in Korean!" },
];

const PORTFOLIO = [
  "korean-img1.png",
  "korean-img2.png",
  "korean-img3.png",
  "korean-img4.png",
  "korean-certi1.png",
  "korean-certi2.png",
];

const TESTIMONIALS = [
  { name: "Mridu Jain", image: "mridu-jain.png", text: "I'm studying korean language in Langma institute. My experience really amazing. Teachers are so good they have different types of techniques to teach also the environment and culture is so good.i have passed advance level and I'm really thankful to our korean native teacher (Mrs-Lee Mam) she teach us so well. She always teach us with new techniques and always cleared my every doubt. And  I'm continuing C2 level with my favourite teacher (Mrs Lee)" },
  { name: "Akanksha Singh", image: "akanksha-singh.png", text: "Best experience at Langma school of language I opted for Korean language course and they had amazing native trainers and the teaching environment is great . The trainers are very polite , I completed my C1 level and very happy that I choose Langma for my course." },
  { name: "Ming Bhandari", image: "ming-bhandari.png", text: "It was Great time with Langma school of Languages, faculty of Korean language was great. Thank to Langma Management." },
  { name: "it'sMISO", image: "itsmiso.png", text: "I studied korean and I must say it's perfect place to study korean in delhi. I'm glad I found this place when I was searching for myself. Recommended to everyone who wants to have an amazing experience studying korean along with fun cultural activities and events. 이 선생님하고 고랍 선생님 진짜 최고!!" },
  { name: "Julie butler", image: "julie-butler.png", text: "I finished Korean language course from Langma School of languages and it proved to be a very productive experience for me. The teacher did a lot of language tasks and activities in the classroom which helped me in understanding the language and using it in my everyday life. Korean is a tough language but was made easy by the teachers by simplifying the concepts." },
];

const YOUTUBE_VIDEOS = [
  { src: "https://www.youtube.com/embed/pgfFXOfdfXQ", title: "Learn the Korean Language from Basic to Advanced Level from Our Experienced Trainers | #korean" },
  { src: "https://www.youtube.com/embed/_iPl4Ysylrw", title: "C1 level Korean Graduation Day Celebration & students feedback" },
  { src: "https://www.youtube.com/embed/rgWSGvSPfYs", title: "Learn some Interesting Facts about Korea" },
];

function useKoreanBodyClass() {
  useLayoutEffect(() => {
    document.body.classList.add("korean-landing-active");
    return () => document.body.classList.remove("korean-landing-active");
  }, []);
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.koreanLanding = "true";
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function useKoreanLandingScripts() {
  useEffect(() => {
    let swiperInstance;
    let glightboxInstance;
    let onScroll;
    let onMobileToggle;
    let onBackToTop;
    const mobileToggle = () => document.querySelector(".learn-korean-landing .mobile-nav-toggle");
    const navbar = () => document.querySelector(".learn-korean-landing #navbar");
    const backToTop = () => document.querySelector(".learn-korean-landing .back-to-top");
    const header = () => document.querySelector(".learn-korean-landing #header");

    const init = async () => {
      try {
        await loadScript(`${ASSETS}/vendor/bootstrap/js/bootstrap.bundle.min.js`);
        await loadScript(`${ASSETS}/vendor/aos/aos.js`);
        await loadScript(`${ASSETS}/vendor/glightbox/js/glightbox.min.js`);
        await loadScript(`${ASSETS}/vendor/swiper/swiper-bundle.min.js`);

        if (window.AOS) {
          window.AOS.init({ duration: 1000, easing: "ease-in-out", once: true, mirror: false });
        }

        if (window.GLightbox) {
          glightboxInstance = window.GLightbox({ selector: ".learn-korean-landing .portfokio-lightbox" });
        }

        const sliderEl = document.querySelector(".learn-korean-landing .testimonials-slider");
        if (sliderEl && window.Swiper) {
          swiperInstance = new window.Swiper(sliderEl, {
            speed: 600,
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            slidesPerView: "auto",
            pagination: { el: sliderEl.querySelector(".swiper-pagination"), type: "bullets", clickable: true },
            breakpoints: {
              320: { slidesPerView: 1, spaceBetween: 40 },
              1200: { slidesPerView: 3 },
            },
          });
        }

        onScroll = () => {
          const h = header();
          const b = backToTop();
          if (h) {
            if (window.scrollY > 100) h.classList.add("header-scrolled");
            else h.classList.remove("header-scrolled");
          }
          if (b) {
            if (window.scrollY > 100) b.classList.add("active");
            else b.classList.remove("active");
          }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        const toggle = mobileToggle();
        onMobileToggle = () => {
          navbar()?.classList.toggle("navbar-mobile");
          toggle?.classList.toggle("bi-list");
          toggle?.classList.toggle("bi-x");
        };
        toggle?.addEventListener("click", onMobileToggle);

        const topBtn = backToTop();
        onBackToTop = (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        };
        topBtn?.addEventListener("click", onBackToTop);
      } catch {
        /* optional */
      }
    };

    init();

    return () => {
      if (onScroll) window.removeEventListener("scroll", onScroll);
      mobileToggle()?.removeEventListener("click", onMobileToggle);
      backToTop()?.removeEventListener("click", onBackToTop);
      swiperInstance?.destroy?.();
      glightboxInstance?.destroy?.();
    };
  }, []);
}

function LevelBadge({ label, color, bg }) {
  return (
    <div
      style={{
        color,
        background: bg,
        fontFamily: "remixicon",
        fontSize: "36px",
        padding: "40px 20px",
        borderRadius: "4px",
        position: "relative",
        marginBottom: "25px",
        display: "inline-block",
        lineHeight: 0,
        transition: "0.3s",
        fontWeight: "bold",
        boxShadow: "0px 0 30px rgba(1, 41, 112, 0.08)",
      }}
    >
      {label}
    </div>
  );
}

function Stars() {
  return (
    <div className="stars">
      <i className="bi bi-star-fill" />
      <i className="bi bi-star-fill" />
      <i className="bi bi-star-fill" />
      <i className="bi bi-star-fill" />
      <i className="bi bi-star-fill" />
    </div>
  );
}

export default function LearnKoreanLanguage() {
  useKoreanBodyClass();
  useKoreanLandingScripts();

  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    document.title =
      "Korean Language Course, Korean Speaking Classes, Online Korean Language Classes in Delhi";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Langma School of Languages is best Korean language institute in Delhi is offering Korean language course, Online Korean language classes, Korean speaking classes in Delhi."
      );
    }
  }, []);

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMessage("");
    const form = e.target;
    const formData = new FormData(form);
    formData.set("currenturl", window.location.href);
    formData.set("language", "Korean");

    try {
      const res = await fetch(`${API_BASE}/apply-submit`, { method: "POST", body: formData });
      if (res.ok) {
        setFormMessage("Thank you! We will contact you soon.");
        form.reset();
        return;
      }
      throw new Error("failed");
    } catch {
      try {
        const fallback = await fetch(`${API_BASE}/api/contact-lead`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            mobile: formData.get("mobile"),
            message: formData.get("message"),
            type: "Korean Landing",
            service: "Language Training - Korean",
          }),
        });
        if (fallback.ok) {
          setFormMessage("Thank you! We will contact you soon.");
          form.reset();
        } else {
          setFormMessage("Something went wrong. Please try again.");
        }
      } catch {
        setFormMessage("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }, []);

  return (
    <>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      {CSS_FILES.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}

      <div className="learn-korean-landing">
        <header id="header" className="header fixed-top">
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <a href="/" className="logo d-flex align-items-center">
              <img src={img("langma-black-logo.png")} alt="Langma" />
            </a>
            <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <a className="nav-link scrollto" href="tel:+91-9810117094">
                    +91-9810117094
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="mailto:info@langmainternational.com">
                    info@langmainternational.com
                  </a>
                </li>
              </ul>
              <i className="bi bi-list mobile-nav-toggle" />
            </nav>
          </div>
        </header>

        <section className="korean-hero-video">
          <video
            autoPlay
            loop
            playsInline
            muted
            preload="auto"
            className="w-100"
            src={VIDEO_SRC}
          />
        </section>

        <section id="contact" className="contact" style={{ padding: "0 !important" }}>
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <p>Contact Us</p>
            </header>
            <div className="row gy-4">
              <div className="col-lg-6">
                <form
                  autoComplete="off"
                  className="php-email-form"
                  method="post"
                  onSubmit={handleFormSubmit}
                  style={{ background: "#dc354554" }}
                >
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="tel"
                        name="mobile"
                        className="form-control"
                        placeholder="Your Mobile Number"
                        onKeyPress={(e) => {
                          if (e.charCode < 48 || e.charCode > 57) e.preventDefault();
                        }}
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        pattern="[^ @]*@[^ @]*"
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <textarea name="message" className="form-control" rows={4} placeholder="Message" required />
                    </div>
                    <div className="col-md-12 text-center">
                      <input type="hidden" name="currenturl" value={`${window.location.origin}/learn-korean-language`} />
                      <input type="hidden" name="language" value="Korean" />
                      <button type="submit" style={{ background: "#DD0000" }} disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit"}
                      </button>
                      {formMessage && <p className="korean-form-msg">{formMessage}</p>}
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-6">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <div className="info-box">
                      <i className="bi bi-geo-alt" style={{ color: "#DD0000" }} />
                      <h3>Address</h3>
                      <p>
                        E 73, South Extension Part-1,
                        <br />
                        New Delhi- 110049, India
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-box">
                      <i className="bi bi-telephone" style={{ color: "#DD0000" }} />
                      <h3>Call Us</h3>
                      <p>
                        <a href="tel:+91-9810117094" style={{ color: "#012970", textDecoration: "none", zIndex: 2 }}>
                          +91-9810117094
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-box">
                      <i className="bi bi-envelope" style={{ color: "#DD0000" }} />
                      <h3>Email Us</h3>
                      <p>
                        <a href="mailto:info@langmainternational.com" style={{ color: "#012970" }}>
                          info@langmainternational.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-box">
                      <i className="bi bi-clock" style={{ color: "#DD0000" }} />
                      <h3>Open Hours</h3>
                      <p>
                        Monday - Sunday
                        <br />
                        8:00AM - 09:00PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main id="main">
          <section id="about" className="about">
            <div className="container" data-aos="fade-up">
              <div className="row gx-0">
                <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
                  <div className="content">
                    <h2 style={{ fontSize: "25px", fontWeight: 700, color: "#DD0000", textTransform: "uppercase" }}>
                      LEARN KOREAN LANGUAGE WITH LANGMA
                    </h2>
                    <h2 style={{ fontSize: "20px", fontWeight: 500, color: "#012970" }}>
                      At Langma School of Languages, we carefully choose teachers who can focus on exam preparation and are familiar with the testing patterns, and the expectations of examiners. Our trainers will help you to understand the benefits of various Korean language levels. Langma School of Languages offers lessons for individuals who are in dire need of extra dimension/attention or groups that require overall development.
                    </h2>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
                  <img src={img("korean-main.png")} className="img-fluid" alt="Korean language" />
                </div>
              </div>
            </div>
          </section>

          <section id="values" className="values">
            <div className="container" data-aos="fade-up">
              <header className="section-header">
                <p>Your Language Potential at Langma: Something for Everyone!</p>
              </header>
              <div className="row">
                {VALUES.map((item, i) => (
                  <div
                    key={item.title}
                    className={`col-lg-4${i > 0 ? " mt-4 mt-lg-0" : ""}`}
                    data-aos="fade-up"
                    data-aos-delay={200 + i * 200}
                  >
                    <div className="box">
                      <img src={img(item.image)} className="img-fluid" alt="" />
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="counts" className="counts">
            <div className="container" data-aos="fade-up">
              <div className="row gy-4">
                <div className="col-lg-3 col-md-6">
                  <div className="count-box">
                    <i className="bi bi-people" />
                    <div>
                      <span>80 k+</span>
                      <p>STUDENTS TAUGHT</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="count-box">
                    <i className="bi bi-people" style={{ color: "#ee6c20" }} />
                    <div>
                      <span>75 k+</span>
                      <p>Placement</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="count-box">
                    <i className="bi bi-people" style={{ color: "#15be56" }} />
                    <div>
                      <span>238+</span>
                      <p>TRAINERS</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="count-box">
                    <i className="bi bi-briefcase" style={{ color: "#bb0852" }} />
                    <div>
                      <span>40k+</span>
                      <p>JOBS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="features">
            <div className="container" data-aos="fade-up">
              <header className="section-header">
                <p>Korean International Language Examinations</p>
              </header>
              <div className="row">
                <div className="col-lg-6">
                  <img src={img("korean-exam.png")} className="img-fluid" alt="Korean exams" />
                </div>
                <div className="col-lg-6 mt-5 mt-lg-0 d-flex">
                  <div className="row align-self-center gy-4">
                    <div className="col-md-6" data-aos="zoom-out" data-aos-delay="200">
                      <div className="feature-box d-flex align-items-center">
                        <i className="bi bi-check" />
                        <h3>
                          The KLAT, or Korean Language Ability Test, is a standardized exam that measures the Korean proficiency of non-native speakers. It&apos;s offered internationally by the Korean Educational Testing Service and is recognized by the Korean government. There are two versions: the KLAT, for intermediate to advanced learners, and the B-KLAT, for beginners.
                        </h3>
                      </div>
                    </div>
                    <div className="col-md-6" data-aos="zoom-out" data-aos-delay="400">
                      <div className="feature-box d-flex align-items-center">
                        <i className="bi bi-check" />
                        <h3>
                          The Korean Proficiency Test, or TOPIK, is a standardized exam offered six times annually that gauges your listening, reading, and writing skills in Korean across Beginner, Intermediate, and Advanced levels. Each level has two grades for further nuance, with TOPIK I being a 100-minute test focused on basic comprehension, while TOPIK II is a 3-hour test demanding advanced understanding and written expression.
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row feature-icons" data-aos="fade-up">
                <h3>Langma&apos;s teaching methodologies</h3>
                <div className="row">
                  <div className="col-xl-4 text-center" data-aos="fade-right" data-aos-delay="100">
                    <img src={img("german-teaching.png")} className="img-fluid p-4" alt="" />
                  </div>
                  <div className="col-xl-8 d-flex content">
                    <div className="row align-self-center gy-4">
                      {METHODOLOGIES.map((item, i) => (
                        <div key={item.title} className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay={i * 100}>
                          <i className={item.icon} style={{ color: "#DD0000" }} />
                          <div>
                            <h4>{item.title}</h4>
                            <p>{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="services">
            <div className="container" data-aos="fade-up">
              <header className="section-header">
                <p>There are Six Levels from Level 1 (Beginner) to Level 6 (Mastery)</p>
              </header>
              <div className="row gy-4">
                {LEVELS.map((level, i) => (
                  <div key={level.label} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200 + i * 100}>
                    <div className={`service-box ${level.cls}`}>
                      <LevelBadge label={level.label} color={level.color} bg={level.bg} />
                      <h3>{level.title}</h3>
                      <p>{level.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="portfolio" className="portfolio">
            <div className="container" data-aos="fade-up">
              <header className="section-header">
                <p>Langma Gallery</p>
              </header>
              <div className="row gy-4 portfolio-container" data-aos="fade-up" data-aos-delay="200">
                {PORTFOLIO.map((file) => (
                  <div key={file} className="col-lg-4 col-md-6 portfolio-item filter-app">
                    <div className="portfolio-wrap">
                      <img src={portfolioImg(file)} style={{ width: "800px" }} className="img-fluid" alt="" />
                      <div className="portfolio-info">
                        <div className="portfolio-links">
                          <a href={portfolioImg(file)} className="portfokio-lightbox" title="">
                            <i className="bi bi-plus" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="testimonials" className="testimonials">
            <div className="container" data-aos="fade-up">
              <header className="section-header">
                <h2>Testimonials</h2>
                <p>Our Students Voice </p>
              </header>
              <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="200">
                <div className="swiper-wrapper">
                  {TESTIMONIALS.map((t) => (
                    <div key={t.name} className="swiper-slide">
                      <div className="testimonial-item">
                        <Stars />
                        <p>{t.text}</p>
                        <div className="profile mt-auto">
                          <img src={testimonialImg(t.image)} className="testimonial-img" alt={t.name} />
                          <h3>{t.name}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="swiper-pagination" />
              </div>
            </div>
          </section>

          <section id="recent-blog-posts" className="recent-blog-posts">
            <div className="container" data-aos="fade-up">
              <header className="section-header">
                <p>Langma Youtube Vlog</p>
              </header>
              <div className="row">
                {YOUTUBE_VIDEOS.map((video) => (
                  <div key={video.src} className="col-lg-4">
                    <div className="post-box">
                      <div className="post-img korean-youtube-embed">
                        <iframe
                          src={video.src}
                          title={video.title}
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer id="footer" className="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row gy-4">
                <div className="col-lg-5 col-md-12 footer-info">
                  <a href="/" className="logo d-flex align-items-center">
                    <img src={img("langma-black-logo.png")} alt="Langma Logo" />
                  </a>
                  <p>
                    Langma School of Languages&apos; vision is to offer students, opportunities to create better and enriched lives for themselves and others surrounding them by introducing them to different and unique cultures and enriching their experiences, both locally and globally.
                  </p>
                  <div className="social-links mt-3">
                    <a className="twitter" href="https://twitter.com/official_langma" target="_blank" rel="noreferrer" aria-label="langmainternational-twitter">
                      <i className="bi bi-twitter-x" style={{ color: "#000000" }} />
                    </a>
                    <a className="facebook" href="https://www.facebook.com/officiallangma" target="_blank" rel="noreferrer" aria-label="langmainternational-facebook">
                      <i className="bi bi-facebook" style={{ color: "#3b5998" }} />
                    </a>
                    <a className="instagram" href="https://www.instagram.com/officiallangma" target="_blank" rel="noreferrer" aria-label="langmainternational-instagram">
                      <i className="bi bi-instagram" style={{ color: "#ca005d" }} />
                    </a>
                    <a className="linkedin" href="https://www.linkedin.com/school/langma-international" target="_blank" rel="noreferrer" aria-label="langmainternational-linkedin">
                      <i className="bi bi-linkedin" style={{ color: "#0082ca" }} />
                    </a>
                    <a className="youtube" href="https://www.youtube.com/user/langmaschool" target="_blank" rel="noreferrer" aria-label="langmainternational-youtube">
                      <i className="bi bi-youtube" style={{ color: "#ed302f" }} />
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                  <h4>Contact Us</h4>
                  <p>
                    E 73, South Extension Part-1, <br />
                    New Delhi- 110049,India
                    <br />
                    <br />
                    <strong>
                      <i className="bi bi-telephone-fill" aria-hidden="true" style={{ color: "#012970", fontSize: "24px", marginRight: "10px" }} />
                    </strong>
                    <a href="tel:+91-9810117094" style={{ color: "#012970", textDecoration: "none", zIndex: 2, fontWeight: "bold" }}>
                      +91-9810117094
                    </a>
                    <br />
                    <strong>
                      <i className="bi bi-envelope-fill" aria-hidden="true" style={{ color: "#012970", fontSize: "24px", marginRight: "10px" }} />
                    </strong>
                    <a href="mailto:info@langmainternational.com" style={{ color: "#012970", fontWeight: "bold" }}>
                      info@langmainternational.com
                    </a>
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <a href="#top" className="back-to-top d-flex align-items-center justify-content-center">
          <i className="bi bi-arrow-up-short" />
        </a>

        <div className="blog-share1 wpshare1" id="d-none4">
          <a className="icon wtpb1 call-t" href="tel:9810117094">
            <span className="hrs">
              <span style={{ position: "relative", top: "-1px" }}>+</span>91 9810117094
            </span>
            <span>
              <i className="bi bi-telephone" id="fone" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
