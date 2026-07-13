import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import API_BASE from "../../config";
import "./learnGermanLanding.css";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const ASSETS = `${BASE}/new-landing-pages/assets`;
const img = (path) => `${ASSETS}/img/${path}`;

const CSS_FILES = [
  "bootstrap.min.css",
  "fontawesome.min.css",
  "style.css",
  "responsive.css",
  "color.css",
];

const FAQ_ITEMS = [
  {
    title: "What levels does the Goethe Institute exam cover?",
    content:
      "Offered by the Goethe Institute, this exam assesses proficiency levels from A1 to C2 based on the Common European Framework of Reference for Languages (CEFR).",
  },
  {
    title:
      "What exam evaluates language proficiency for university admission in Germany?",
    content:
      "This is an exam for non-native speakers, often required for university admission in Germany. It evaluates proficiency in reading, writing, listening, and speaking.",
  },
  {
    title:
      "What is the significance of language proficiency tests for foreign students applying to German universities?",
    content:
      "Another language proficiency test for foreign students seeking admission to German universities. It's often a prerequisite for admission and measures language skills necessary for academic studies.",
  },
];

const STATS = [
  { value: 80, suffix: "k-plus", label: "STUDENTS TAUGHT" },
  { value: 75, suffix: "k-plus", label: "PLACEMENTS" },
  { value: 100, suffix: "plus", label: "TRAINERS" },
  { value: 40, suffix: "k", label: "JOBS" },
];

function useLandingBodyClass() {
  useLayoutEffect(() => {
    document.body.classList.add("german-landing-active");
    return () => document.body.classList.remove("german-landing-active");
  }, []);
}

function useStickyHeader() {
  useEffect(() => {
    const header = document.getElementById("stickyHeader");
    if (!header) return undefined;

    let lastScroll = 0;

    const onScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < 100) {
        header.classList.remove("slideUp");
      } else if (currentScroll > lastScroll) {
        header.classList.add("slideUp");
      } else {
        header.classList.remove("slideUp");
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

function useBackToTop() {
  useEffect(() => {
    const button = document.getElementById("button");
    if (!button) return undefined;

    const onScroll = () => {
      if (window.scrollY > 300) {
        button.classList.add("show");
      } else {
        button.classList.remove("show");
      }
    };

    const onClick = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    button.addEventListener("click", onClick);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      button.removeEventListener("click", onClick);
    };
  }, []);
}

function CounterSuffix({ type }) {
  if (type === "k-plus") {
    return (
      <span>
        K<sup>+</sup>
      </span>
    );
  }
  if (type === "plus") return <span>+</span>;
  return <span>K</span>;
}

function Counter({ target, suffix, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return undefined;
    }

    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return (
    <>
      <h2 className="timer count-title count-number">{count}</h2>
      <CounterSuffix type={suffix} />
    </>
  );
}

function StatsRow() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="customers-performance" ref={ref}>
      {STATS.map((stat) => (
        <div className="performance" key={stat.label}>
          <div className="performance-count">
            <Counter
              target={stat.value}
              suffix={stat.suffix}
              active={visible}
            />
          </div>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function LearnGermanLanguage() {
  useLandingBodyClass();
  useStickyHeader();
  useBackToTop();

  const [openFaq, setOpenFaq] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    document.title =
      "Learn German Language, German Language Course, German Classes, German Speaking Classes in Delhi";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Online German Classes - Learn German Language, German speaking classes, online German language course with certificate with best German institute Delhi -Langma School of Languages."
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

    try {
      const res = await fetch(`${API_BASE}/apply-submit`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setFormMessage("Thank you! We will contact you soon.");
        form.reset();
        return;
      }
      throw new Error("apply-submit failed");
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
            type: "German Landing",
            service: "Language Training - German",
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

  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {CSS_FILES.map((file) => (
        <link key={file} rel="stylesheet" href={`${ASSETS}/css/${file}`} />
      ))}
    <div
      className="learn-german-landing"
      style={{ "--german-hero-bg": `url(${img("hero.webp")})` }}
    >
      <header id="stickyHeader">
        <div className="container">
          <div className="nav">
            <div className="logo">
              <a href="/">
                <img alt="logo" src={img("langma2-logo.png")} width="173" height="40" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6">
              <div className="hero-section-text">
                <h1>
                  Learn German{" "}
                  <img
                    alt="img"
                    className="dotsc"
                    src={img("german-flag.png")}
                    width="60"
                    height="40"
                  />{" "}
                  Language From <span className="branding">A1 </span>
                  To <span className="branding">C2</span> With{" "}
                  <span className="branding">Langma</span>
                </h1>
                <p>
                  Our trainers will help you to <b>understand</b> the benefits of
                  various <b>German language levels</b>. Langma School of Languages
                  offers <b>professional</b> courses for students and
                  learning-professionals.
                </p>
                <div className="video">
                  <div className="play-button">
                    <a href="#Services" className="batton" onClick={scrollToSection("Services")}>
                      Learn More
                    </a>
                  </div>
                  <div className="review">
                    <h2 style={{ color: "black" }}>
                      4.6 <span>out of 1298</span>
                    </h2>
                    <ul className="star">
                      <li>
                        <i className="fa-solid fa-star" />
                      </li>
                      <li>
                        <i className="fa-solid fa-star" />
                      </li>
                      <li>
                        <i className="fa-solid fa-star" />
                      </li>
                      <li>
                        <i className="fa-solid fa-star" />
                      </li>
                      <li>
                        <i className="fa-solid fa-star-half" />
                      </li>
                    </ul>
                    <img alt="img" src={img("google.png")} width="98" height="40" />
                  </div>
                </div>
                <img alt="img" className="dots" src={img("dots.png")} width="94" height="85" />
              </div>
            </div>
            <div className="col-xl-6">
              <form
                autoComplete="off"
                role="form"
                className="get-a-quote"
                id="contact-form"
                onSubmit={handleFormSubmit}
              >
                <div className="mb-lg-5 mb-3 d-flex align-items-center">
                  <i>
                    <svg
                      enableBackground="new 0 0 124 124"
                      height="52"
                      viewBox="0 0 124 124"
                      width="52"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m82.899 50.646c-6.059 0-10.988-4.918-10.988-10.963s4.929-10.963 10.988-10.963 10.988 4.918 10.988 10.963-4.929 10.963-10.988 10.963zm0-17.979c-3.877 0-7.031 3.147-7.031 7.015s3.154 7.015 7.031 7.015 7.031-3.147 7.031-7.015-3.154-7.015-7.031-7.015z" />
                      <path d="m122.558 2.183c-.069-.986-.853-1.773-1.841-1.848-14.728-1.125-41.975-.347-58.941 17.482-.002.002-.005.004-.007.007-2.3 2.441-4.418 5.209-6.382 8.136-24.65 8.882-35.589 25.07-38.168 33.298-.376 1.202.496 2.487 1.756 2.582l17.94 1.359c-1.478 3.901-2.824 7.823-4.017 11.748-.215.706-.02 1.472.504 1.992l11.995 11.891c.513.508 1.288.703 1.98.495 4-1.194 7.996-2.545 11.97-4.027l1.381 17.923c.097 1.253 1.377 2.122 2.581 1.752 7.562-2.328 24.216-13.247 33.545-37.919 2.953-1.954 5.73-4.064 8.153-6.359 17.668-16.682 18.58-43.82 17.551-58.512-.07-.987 1.029 14.692 0 0zm-3.878 2.008c.413 7.551.219 17.908-2.38 28.202l-26.124-25.897c10.42-2.625 20.888-2.767 28.504-2.305zm-96.722 53.877c3.21-7.053 12.265-18.732 29.892-26.418-2.945 5.084-5.502 10.331-7.777 15.002-2.04 4.172-3.917 8.403-5.638 12.665zm42.549 42.183-1.267-16.452c4.264-1.695 8.496-3.541 12.668-5.545 4.732-2.244 10.045-4.763 15.169-7.669-7.959 17.563-19.588 26.513-26.57 29.666zm37.752-42.448c-7.489 7.094-18.422 12.277-28.076 16.854-8.762 4.212-17.778 7.744-26.816 10.507l-10.293-10.205c2.785-8.95 6.346-17.879 10.592-26.562 4.394-9.022 9.862-20.251 17.01-27.839 5.992-6.295 13.426-10.299 21.11-12.794l29.252 28.998c-2.497 7.687-6.497 15.108-12.779 21.041z" />
                      <path d="m4.185 122.808c-1.728 0-2.631-2.145-1.437-3.378l27.357-28.26c1.788-1.841 4.666.918 2.874 2.77l-27.357 28.259c-.392.405-.914.609-1.437.609z" />
                      <path d="m23.435 124c-1.688 0-2.609-2.063-1.493-3.318l17.73-19.91c1.71-1.913 4.7.723 2.987 2.648l-17.73 19.91c-.394.444-.943.67-1.494.67z" />
                      <path d="m2.982 104.917c-1.688 0-2.609-2.063-1.493-3.318l17.731-19.91c1.709-1.914 4.7.724 2.987 2.648l-17.731 19.91c-.395.444-.943.67-1.494.67z" />
                    </svg>
                  </i>
                  <div>
                    <p className="p-0">
                      Start your journey with mastering <b>German Language!</b> from A1
                      to C2
                    </p>
                    <h2>Enroll Today</h2>
                  </div>
                </div>
                <div className="group-img">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.364 11.636C14.3837 10.6558 13.217 9.93013 11.9439 9.49085C13.3074 8.55179 14.2031 6.9802 14.2031 5.20312C14.2031 2.33413 11.869 0 9 0C6.131 0 3.79688 2.33413 3.79688 5.20312C3.79688 6.9802 4.69262 8.55179 6.05609 9.49085C4.78308 9.93013 3.61631 10.6558 2.63605 11.636C0.936176 13.3359 0 15.596 0 18H1.40625C1.40625 13.8128 4.81279 10.4062 9 10.4062C13.1872 10.4062 16.5938 13.8128 16.5938 18H18C18 15.596 17.0638 13.3359 15.364 11.636ZM9 9C6.90641 9 5.20312 7.29675 5.20312 5.20312C5.20312 3.1095 6.90641 1.40625 9 1.40625C11.0936 1.40625 12.7969 3.1095 12.7969 5.20312C12.7969 7.29675 11.0936 9 9 9Z" fill="#555555" />
                  </svg>
                  <input type="text" name="name" placeholder="Complete Name" required />
                </div>
                <div className="group-img">
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <g clipRule="evenodd" fill="rgb(0,0,0)" fillRule="evenodd">
                      <path d="m7 2.75c-.41421 0-.75.33579-.75.75v17c0 .4142.33579.75.75.75h10c.4142 0 .75-.3358.75-.75v-17c0-.41421-.3358-.75-.75-.75zm-2.25.75c0-1.24264 1.00736-2.25 2.25-2.25h10c1.2426 0 2.25 1.00736 2.25 2.25v17c0 1.2426-1.0074 2.25-2.25 2.25h-10c-1.24264 0-2.25-1.0074-2.25-2.25z" />
                      <path d="m10.25 5c0-.41421.3358-.75.75-.75h2c.4142 0 .75.33579.75.75s-.3358.75-.75.75h-2c-.4142 0-.75-.33579-.75-.75z" />
                      <path d="m9.25 19c0-.4142.33579-.75.75-.75h4c.4142 0 .75.3358.75.75s-.3358.75-.75.75h-4c-.41421 0-.75-.3358-.75-.75z" />
                    </g>
                  </svg>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Phone No"
                    onKeyPress={(e) => {
                      if (e.charCode < 48 || e.charCode > 57) e.preventDefault();
                    }}
                    required
                  />
                </div>
                <div className="group-img">
                  <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8649 18H6.13513C2.58377 18 0.540527 15.9568 0.540527 12.4054V5.5946C0.540527 2.04324 2.58377 0 6.13513 0H15.8649C19.4162 0 21.4595 2.04324 21.4595 5.5946V12.4054C21.4595 15.9568 19.4162 18 15.8649 18ZM6.13513 1.45946C3.35242 1.45946 1.99999 2.81189 1.99999 5.5946V12.4054C1.99999 15.1881 3.35242 16.5406 6.13513 16.5406H15.8649C18.6476 16.5406 20 15.1881 20 12.4054V5.5946C20 2.81189 18.6476 1.45946 15.8649 1.45946H6.13513Z" fill="#444444" />
                    <path d="M10.9988 9.8465C10.1815 9.8465 9.35452 9.59352 8.72208 9.07785L5.67668 6.64539C5.36532 6.39241 5.30696 5.93511 5.55992 5.62376C5.8129 5.31241 6.2702 5.25403 6.58155 5.50701L9.62695 7.93947C10.3664 8.53298 11.6215 8.53298 12.361 7.93947L15.4064 5.50701C15.7178 5.25403 16.1848 5.30268 16.428 5.62376C16.681 5.93511 16.6324 6.40214 16.3113 6.64539L13.2659 9.07785C12.6432 9.59352 11.8161 9.8465 10.9988 9.8465Z" fill="#444444" />
                  </svg>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    pattern="[^ @]*@[^ @]*"
                    required
                  />
                </div>
                <input type="hidden" name="currenturl" value={`${window.location.origin}/learn-german-language`} />
                <input type="hidden" name="language" value="German" />
                <input type="hidden" name="message" value="German" />
                <button type="submit" className="batton" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit"}
                </button>
                {formMessage && (
                  <p className="german-landing-form-msg">{formMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="d-flax">
        <div className="container">
          <div className="check">
            <div className="state">
              <img alt="img" src={img("chak.png")} width="52" height="52" />
              <h6>Start your journey today!</h6>
            </div>
            <div className="state">
              <img alt="img" src={img("chak.png")} width="52" height="52" />
              <h6>Professional interview preprations.</h6>
            </div>
            <div className="state mb-0">
              <img alt="img" src={img("chak.png")} width="52" height="52" />
              <h6>Top recognized institution.</h6>
            </div>
          </div>
        </div>
      </div>

      <section id="about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="heading">
                <span>At Langma School of Languages</span>
                <div className="headingline" />
                <h2>We Provide The Best Teaching Facilities to the Students!</h2>
              </div>
              <div className="we-are">
                <p>
                  Learn <span>German Language From A1 To C2</span> With Langma School
                  of Languages that offers lessons for individuals who are in dire need
                  of extra dimension/attention or groups that require overall
                  development.
                </p>
                <ul>
                  <li>
                    <span className="bolo" />
                    Face-to-Face Learning
                  </li>
                  <li className="bolo">
                    <span className="bolo" />
                    Interactive Audio &amp; Video
                  </li>
                  <li className="bolo">
                    <span className="bolo" />
                    Materials Class Recordings
                  </li>
                  <li>
                    <span className="bolo" />
                    Private &amp; Group Classes
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="we-are-img">
                <img alt="we-are" src={img("we-are.webp")} width="513" height="519" />
              </div>
            </div>
          </div>
          <div className="business-performance">
            <div className="row align-items-center">
              <div className="col-lg-4">
                <div className="business-performance-text">
                  <h4>Why to choose Langma?</h4>
                </div>
              </div>
              <div className="col-lg-8">
                <StatsRow />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works gap no-bottom">
        <div className="container">
          <div className="heading">
            <span>Langma&apos;s Teaching Methodologies</span>
            <div className="headingline" />
            <h2>We Provide The Best Teaching Facilities For All The Students!</h2>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="service">
                <h6>01.</h6>
                <h5>Globally Recognized Certificate</h5>
                <p>
                  Here at Langma School of Language our courses are Certified and
                  Recognized globally.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service">
                <h6>02.</h6>
                <h5>We Provide You Training for Job Intervews</h5>
                <p>
                  At our Institution, We offer comprehensive Interview and Job Training
                  with hands-on mock practices.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service">
                <h6>03.</h6>
                <h5>Signup for Online &amp; Offlines Classes</h5>
                <p>
                  We offer both Online and Offline classes to accommodate students
                  convenience and better experience.
                </p>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: "40px" }}>
            <div className="col-lg-4">
              <div className="service">
                <h6>04.</h6>
                <h5>Learn German Language for Kids &amp; Teens</h5>
                <p>
                  Our institute specializes in teaching german to young learners,
                  providing an engaging and effective educational environment.
                </p>
                <img alt="img" src={img("service-3.webp")} loading="lazy" />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service">
                <h6>05.</h6>
                <h5>Master German for College Students</h5>
                <p>
                  College students can enhance their german language skills by enrolling
                  in courses offered at Langma.
                </p>
                <img alt="img" src={img("service-1.webp")} loading="lazy" />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service">
                <h6>06.</h6>
                <h5>German for Professionals &amp; Business</h5>
                <p>
                  Master Business German, Conquer Communication, Open doors to
                  international collaborations.
                </p>
                <img alt="img" src={img("service-2.webp")} loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ paddingTop: "60px" }} />

      <section id="Services" className="some-features">
        <div className="container">
          <div className="heading">
            <span>More about Langma</span>
            <div className="headingline" />
            <h2>Your Language Potential at Langma: Something for Everyone!</h2>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="some-features-img">
                <img alt="img" src={img("some-features.webp")} loading="lazy" width="565" height="565" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="creative-design">
                <img alt="shaps" src={img("some-features-shaps-1.png")} width="72" height="62" />
                <h5>A1 Beginner</h5>
                <p>
                  Learners learn common daily phrases for basic needs, introduce
                  themselves and others, and handle simple personal inquiries in German
                  Language.
                </p>
              </div>
              <div className="creative-design shaps-2 mb-xl-0">
                <img alt="shaps" src={img("some-features-shaps-2.png")} width="72" height="62" />
                <h5>C1 Advanced</h5>
                <p>
                  Learners learn complex texts easily, discern implicit meanings, and
                  communicate fluently and confidently across social, and professional
                  contexts.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 ps-xl-4">
              <div className="creative-design shaps-3">
                <img alt="shaps" src={img("some-features-shaps-3.png")} width="72" height="62" />
                <h5>B1 Intermediate</h5>
                <p>
                  Learners comprehend key information on familiar topics used in daily
                  life, handle typical travel situations, and can write simple, coherent
                  texts.
                </p>
              </div>
              <div className="creative-design shaps-4 mb-0">
                <img alt="shaps" src={img("some-features-shaps-1.png")} width="72" height="62" />
                <h5>C2 Proficiency</h5>
                <p>
                  Learners grasp nearly all they hear or read, summarize diverse
                  information of the german language, and express themselves fluently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginBottom: "9rem" }} />

      <section id="team" className="expert-team gap" style={{ backgroundColor: "#f3f6fa" }}>
        <div className="container">
          <div className="heading">
            <span>Meet Our Expert Team</span>
            <div className="headingline" />
            <div className="team-review">
              <h2>Dedicated To The People Who Make Your Business </h2>
              <div className="team-review-star">
                <ul className="star">
                  <li><i className="fa-solid fa-star" /></li>
                  <li><i className="fa-solid fa-star" /></li>
                  <li><i className="fa-solid fa-star" /></li>
                  <li><i className="fa-solid fa-star" /></li>
                  <li><i className="fa-solid fa-star" /></li>
                  <li><i className="fa-solid fa-star-half" /></li>
                </ul>
                <p>4.6 out of 1298</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="team-expert">
                <img alt="img" src={img("006.webp")} loading="lazy" width="195" height="195" />
                <div>
                  <span>IT Manager</span>
                  <h4>Mike - Tour.World</h4>
                  <p>
                    Thanks to Langma School of Languages, I can now confidently
                    communicate with my German tourists. The course structure was easy to
                    follow, and the interactive sessions made learning fun. Danke schön,
                    Langma!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="team-expert mb-0">
                <img alt="img" src={img("002.webp")} loading="lazy" width="195" height="195" />
                <div>
                  <span>HR Consultant</span>
                  <h4>Jain- Salesforce</h4>
                  <p>
                    Langma School of Languages is the top choice for learning German.
                    Their dedicated teachers and personalized approach made my language
                    journey a success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginBottom: "9rem" }} />

      <section className="asked-questions gap no-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="questions-img">
                <img alt="questions" src={img("questions.webp")} loading="lazy" width="507" height="668" />
                <img alt="img" className="dots" src={img("dots.png")} width="94" height="85" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="heading">
                <div className="d-flex align-items-center">
                  <h6>Ready to get started?</h6>
                  <div className="headingline" />
                </div>
                <h2>Know more about our German course at Langma!</h2>
              </div>
              <div className="accordion">
                {FAQ_ITEMS.map((item, index) => (
                  <div
                    key={item.title}
                    className={`accordion-item${openFaq === index ? " active" : ""}`}
                  >
                    <button
                      type="button"
                      className="heading"
                      onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    >
                      <div className="icon" />
                      <div className="title">{item.title}</div>
                    </button>
                    <div
                      className="content"
                      style={{ display: openFaq === index ? "block" : "none" }}
                    >
                      <p>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="gap" />

      <footer style={{ backgroundImage: `url(${img("hero.webp")})` }}>
        <div className="container">
          <div className="book-free">
            <h2>Get A Free Consultation Now!</h2>
            <p>
              Langma School of Languages&apos; vision is to offer students, opportunities
              to create better and enriched lives for themselves and others surrounding
              them by introducing them to different and unique cultures and enriching
              their experiences, both locally and globally.
            </p>
            <a href="#contact-form" className="batton" onClick={scrollToSection("contact-form")}>
              Request a Quote
            </a>
            <ul>
              <li>
                <a href="https://www.facebook.com/officiallangma" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-facebook-f" />
                  facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/officiallangma" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-instagram" />
                  instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com/official_langma" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-twitter" />
                  twitter
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/school/langma-international" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-linkedin" />
                  linkedin
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/user/langmaschool" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-youtube" />
                  youtube
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="tel:+91-9810117094">
                  <i className="fa fa-phone" aria-hidden="true" />
                  +91-9810117094
                </a>
              </li>
              <li>
                <a href="mailto:info@langmainternational.com">
                  <i className="fa fa-envelope" aria-hidden="true" />
                  info@langmainternational.com
                </a>
              </li>
            </ul>
          </div>
          <p className="footer">
            2024 © Copyrights
            <a href="https://langmainternational.com/">Langma School of Languages.</a>
          </p>
        </div>
      </footer>

      <a id="button" href="#top" aria-label="Back to top" />
    </div>
    </>
  );
}
