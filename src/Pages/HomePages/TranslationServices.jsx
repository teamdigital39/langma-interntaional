import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE from "../../config";
import "./translationServicesLanding.css";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const ASSETS = `${BASE}/translation`;
const SITE_LOGO = `${BASE}/images/langma.svg`;
const img = (path) => `${ASSETS}/img/${path}`;

const CSS_FILES = [
  "lib/animate/animate.min.css",
  "lib/owlcarousel/assets/owl.carousel.min.css",
  "css/bootstrap.min.css",
  "css/style.css",
];

function useTranslationStyles() {
  useLayoutEffect(() => {
    const linkIds = CSS_FILES.map(
      (file) => `translation-css-${file.replace(/[/.]/g, "-")}`
    );

    CSS_FILES.forEach((file, index) => {
      const id = linkIds[index];
      if (document.getElementById(id)) return;

      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `${ASSETS}/${file}`;
      document.head.appendChild(link);
    });

    return () => {
      linkIds.forEach((id) => document.getElementById(id)?.remove());
    };
  }, []);
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

const SERVICES = [
  {
    title: "Marketing Translation",
    image: "service-1.jpg",
    description:
      "Transform your brand's message to appeal to global audiences, ensuring it feels local and relatable in each language.",
    delay: "0.1s",
  },
  {
    title: "Medical Translation",
    image: "service-2.jpg",
    description:
      "Translate medical documents and reports accurately to support clear communication and patient care worldwide.",
    delay: "0.3s",
  },
  {
    title: "Translation of Financial Statements",
    image: "service-3.jpg",
    description:
      "Accurately translate financial statements to meet international standards, supporting transparent financial reporting.",
    delay: "0.5s",
  },
  {
    title: "Legal Translation Services",
    image: "service-4.jpg",
    description:
      "Handle legal documents with precision and confidentiality, ensuring compliance and consistency across languages.",
    delay: "0.1s",
  },
  {
    title: "Technical Translation Services",
    image: "service-5.jpg",
    description:
      "Convert complex technical content clearly and accurately, making it easy for global teams to understand and use.",
    delay: "0.3s",
  },
  {
    title: "Commercial Translation",
    image: "service-6.jpg",
    description:
      "Connect with new markets by adapting your commercial content to reflect local language and culture effectively.",
    delay: "0.5s",
  },
];

const COUNTERS = [
  {
    title: "Global Reach",
    delay: "0.1s",
    icons: (
      <>
        <i className="fas fa-globe" style={{ color: "#4285F4" }} />
        <i
          className="fas fa-comments"
          style={{ position: "absolute", color: "#f9a825", fontSize: "1em" }}
        />
      </>
    ),
  },
  {
    title: "Timely Delivery",
    delay: "0.3s",
    icons: (
      <>
        <i className="fas fa-clock" style={{ color: "#4CAF50", fontSize: "1.5em" }} />
        <i
          className="fas fa-check-circle"
          style={{
            position: "absolute",
            bottom: 0,
            right: -5,
            color: "#388E3C",
            fontSize: "1em",
          }}
        />
      </>
    ),
  },
  {
    title: "Precision & Quality",
    delay: "0.5s",
    icons: (
      <>
        <i className="fas fa-file-alt" style={{ color: "pink", fontSize: "1.5em" }} />
        <i
          className="fas fa-feather-alt"
          style={{ position: "absolute", color: "#ff9800", fontSize: "1em" }}
        />
      </>
    ),
  },
  {
    title: "Trusted Expertise",
    delay: "0.7s",
    icons: (
      <>
        <i className="fas fa-handshake" style={{ color: "#4CAF50", fontSize: "1.5em" }} />
        <i
          className="fas fa-star"
          style={{ position: "absolute", color: "#FFD700", fontSize: "1em" }}
        />
      </>
    ),
  },
];

function usePageBodyClass() {
  useLayoutEffect(() => {
    document.body.classList.add("translation-services-active");
    return () => document.body.classList.remove("translation-services-active");
  }, []);
}

function useTranslationPageEffects() {
  const navBarRef = useRef(null);

  useEffect(() => {
    const spinnerTimer = window.setTimeout(() => {
      document.getElementById("translation-spinner")?.classList.remove("show");
    }, 400);

    let wowInstance;
    loadScript(`${ASSETS}/lib/wow/wow.min.js`)
      .then(() => {
        window.requestAnimationFrame(() => {
          if (window.WOW) {
            wowInstance = new window.WOW({ live: false });
            wowInstance.init();
          }
        });
      })
      .catch(() => {});

    const navBar = navBarRef.current;
    const onScroll = () => {
      if (navBar) {
        if (window.scrollY > 45) {
          navBar.classList.add("sticky-top", "shadow-sm");
        } else {
          navBar.classList.remove("sticky-top", "shadow-sm");
        }
      }

      const backToTop = document.querySelector(".translation-services-page .back-to-top");
      if (backToTop) {
        if (window.scrollY > 300) {
          backToTop.classList.add("show");
        } else {
          backToTop.classList.remove("show");
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.clearTimeout(spinnerTimer);
      window.removeEventListener("scroll", onScroll);
      wowInstance?.stop?.();
    };
  }, []);

  return navBarRef;
}

export default function TranslationServices() {
  usePageBodyClass();
  useTranslationStyles();
  const navBarRef = useTranslationPageEffects();

  const [navOpen, setNavOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMessage("");

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const mobile = form.mobile.value.trim();
    const message = form.message.value.trim();

    try {
      const response = await fetch(`${API_BASE}/api/contact-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          mobile,
          message,
          type: "Translation Services",
          service: "Translation",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormSuccess(true);
        setFormMessage("Thank you! We will contact you soon.");
        form.reset();
      } else {
        setFormSuccess(false);
        setFormMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setFormSuccess(false);
      setFormMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Poppins:wght@200;300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        id="top"
        className="translation-services-page"
        style={{ "--translation-bg": `url(${img("breadcrumb.png")})` }}
      >
        <div
          id="translation-spinner"
          className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
          style={{ zIndex: 99999 }}
        >
          <div
            className="spinner-border text-secondary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>

        <div ref={navBarRef} className="container-fluid nav-bar p-0">
          <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top p-0">
            <Link
              to="/"
              className="navbar-brand d-flex align-items-center py-2 px-4 px-lg-5"
            >
              <img src={SITE_LOGO} alt="Langma Logo" width="160" height="46" />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={navOpen}
              onClick={() => setNavOpen((open) => !open)}
            >
              <span className="fa fa-bars" />
            </button>

            <div
              id="navbarCollapse"
              className={`collapse navbar-collapse${navOpen ? " show" : ""}`}
            >
              <div className="navbar-nav ms-auto py-0">
                <Link to="/" className="nav-link active" onClick={() => setNavOpen(false)}>
                  Home
                </Link>
                <Link to="/about" className="nav-link" onClick={() => setNavOpen(false)}>
                  About
                </Link>
                <Link to="/contact" className="nav-link" onClick={() => setNavOpen(false)}>
                  Contact
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <div className="carousel-header">
          <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <img
                  src={img("carousel-1.png")}
                  className="img-fluid"
                  alt="Translation Services"
                />
                <div className="carousel-caption">
                  <div className="text-center p-4" style={{ maxWidth: 900 }}>
                    <h1
                      className="display-1 text-capitalize text-white mb-3 mb-md-4 wow fadeInUp"
                      data-wow-delay="0.3s"
                      style={{
                        color: "#B0C4DE",
                        backgroundColor: "transparent",
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      Translation Services
                    </h1>
                    <p
                      className="text-white mb-4 mb-md-5 fs-5 wow fadeInUp"
                      data-wow-delay="0.5s"
                      style={{
                        color: "#B0C4DE",
                        backgroundColor: "transparent",
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      We are an institute that specializes in full-service translation
                      and offer a wide range of linguistic solutions for our clients
                      globally. Experience precise, professional translations you can
                      rely on crafted by experts, complete, and tailored to your needs.
                    </p>
                    <Link
                      className="btn btn-primary border-secondary rounded-pill text-white py-3 px-5 wow fadeInUp"
                      data-wow-delay="0.7s"
                      to="/translational"
                      style={{ color: "#B0C4DE", borderColor: "#B0C4DE" }}
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="row g-5">
              <div
                className="col-xl-5 wow fadeInLeft"
                style={{ marginLeft: -30 }}
                data-wow-delay="0.1s"
              >
                <div className="bg-light rounded">
                  <img
                    src={img("about-2.jpg")}
                    className="img-fluid w-100"
                    style={{ marginBottom: -7 }}
                    alt="About Langma"
                  />
                  <img
                    src={img("about-3.jpg")}
                    className="img-fluid w-100 border-bottom border-5 border-primary"
                    style={{
                      borderTopRightRadius: 300,
                      borderTopLeftRadius: 300,
                    }}
                    alt="Translation experts"
                  />
                </div>
              </div>
              <div className="col-xl-7 wow fadeInRight" data-wow-delay="0.3s">
                <h5 className="sub-title pe-3">About Langma</h5>
                <h1 className="display-5 mb-4">
                  You Have Reached The Translation Experts
                </h1>
                <p className="mb-4" style={{ color: "black" }}>
                  Our team of highly skilled language professionals is dedicated to
                  delivering top-quality translations on time, every time. With a
                  commitment to excellence and precision, we provide translation
                  services across a wide range of fields to meet your exact needs.
                </p>
                <div className="row gy-4 align-items-center">
                  <div className="col-4 col-md-3">
                    <div className="bg-light text-center rounded p-3">
                      <div className="mb-2">
                        <i className="fas fa-language fa-4x text-primary" />
                      </div>
                      <h1 className="display-5 fw-bold mb-2">13+</h1>
                      <p className="text-muted mb-0">Years of Experience</p>
                    </div>
                  </div>
                  <div className="col-8 col-md-9">
                    <div className="mb-5">
                      <p className="text-primary h6 mb-3">
                        <i className="fa fa-check-circle text-secondary me-2" />
                        Offer Accurate Translations
                      </p>
                      <p className="text-primary h6 mb-3">
                        <i className="fa fa-check-circle text-secondary me-2" />
                        Timely Delivery At Best Rates
                      </p>
                      <p className="text-primary h6 mb-3">
                        <i className="fa fa-check-circle text-secondary me-2" />
                        Specially Curated For Your Needs
                      </p>
                    </div>
                    <div className="d-flex flex-wrap">
                      <div
                        id="phone-tada"
                        className="d-flex align-items-center justify-content-center me-4"
                      >
                        <a href="tel:9810117094" className="position-relative wow tada" data-wow-delay=".9s">
                          <i className="fa fa-phone-alt text-primary fa-3x" />
                          <div className="position-absolute" style={{ top: 0, left: 25 }}>
                            <span>
                              <i className="fa fa-comment-dots text-secondary" />
                            </span>
                          </div>
                        </a>
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <span className="text-primary">Have any questions?</span>
                        <span
                          className="text-secondary fw-bold fs-5"
                          style={{ letterSpacing: 2 }}
                        >
                          +91-9810117094
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid counter-facts py-5">
          <div className="container py-5">
            <div className="row g-4">
              {COUNTERS.map((item) => (
                <div
                  key={item.title}
                  className="col-12 col-sm-6 col-md-6 col-xl-3 wow fadeInUp"
                  data-wow-delay={item.delay}
                >
                  <div className="counter">
                    <div
                      className="counter-icon"
                      style={{
                        position: "relative",
                        display: "inline-block",
                        fontSize: "2em",
                      }}
                    >
                      {item.icons}
                    </div>
                    <div className="counter-content">
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container-fluid service overflow-hidden pt-5">
          <div className="container py-5">
            <div className="section-title text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
              <div className="sub-style">
                <h5 className="sub-title text-primary px-3">TRANSLATION SERVICES</h5>
              </div>
            </div>
            <div className="row g-4">
              {SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="col-lg-6 col-xl-4 wow fadeInUp"
                  data-wow-delay={service.delay}
                >
                  <div className="service-item">
                    <div className="service-inner">
                      <div className="service-img">
                        <img
                          src={img(service.image)}
                          className="img-fluid w-100 rounded"
                          alt={service.title}
                        />
                      </div>
                      <div className="service-title">
                        <div className="service-title-name">
                          <div className="bg-primary text-center rounded p-3 mx-5 mb-4">
                            <span className="h4 text-white mb-0">{service.title}</span>
                          </div>
                        </div>
                        <div className="service-content pb-4">
                          <h4 className="text-white mb-4 py-3">{service.title}</h4>
                          <div className="px-4">
                            <p className="mb-4">{service.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container-fluid footer py-2 wow fadeIn" data-wow-delay="0.2s">
          <div className="container py-3">
            <div className="row g-3">
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="footer-item d-flex flex-column">
                  <h4 className="text-secondary mb-2" style={{ fontSize: "1.1rem" }}>
                    Contact Info
                  </h4>
                  <a
                    href="https://maps.app.goo.gl/NoVexf8RiHPrtW6D7"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <i className="fa fa-map-marker-alt me-1" />
                    E-73 Part 1, South Extension I, Block E, New Delhi, Delhi 110049
                  </a>
                  <a href="mailto:info@langmainternational.com" style={{ fontSize: "0.9rem" }}>
                    <i className="fas fa-envelope me-1" />
                    info@langmainternational.com
                  </a>
                  <a href="tel:9810117094" style={{ fontSize: "0.9rem" }}>
                    <i className="fas fa-phone me-1" />
                    +91-9810117094
                  </a>
                  <br />
                  <div className="d-flex align-items-center">
                    <a
                      className="btn mx-1"
                      href="https://www.facebook.com/officiallangma"
                      style={{
                        backgroundColor: "#3b5998",
                        color: "white",
                        fontSize: "1.5rem",
                        padding: "0.5rem",
                      }}
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      className="btn mx-1"
                      href="https://twitter.com/official_langma"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: "#1DA1F2",
                        color: "white",
                        fontSize: "1.5rem",
                        padding: "0.5rem",
                      }}
                    >
                      <img
                        src={img("twitter-x.svg")}
                        alt="Twitter"
                        style={{ width: 18, height: 18 }}
                      />
                    </a>
                    <a
                      className="btn mx-1"
                      href="https://www.instagram.com/officiallangma/"
                      style={{
                        backgroundColor: "#C13584",
                        color: "white",
                        fontSize: "1.5rem",
                        padding: "0.5rem",
                      }}
                    >
                      <i className="fab fa-instagram" />
                    </a>
                    <a
                      className="btn mx-1"
                      href="https://www.linkedin.com/school/langma-international"
                      style={{
                        backgroundColor: "#0077B5",
                        color: "white",
                        fontSize: "1.5rem",
                        padding: "0.5rem",
                      }}
                    >
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3 offset-xl-6">
                <div className="footer-item">
                  <div
                    className="form-container position-relative"
                    style={{ padding: 10, borderRadius: 8 }}
                  >
                    <h2 className="text-secondary mb-2" style={{ color: "red", fontSize: "1.3rem" }}>
                      Contact Us
                    </h2>
                    <form id="contact-form" onSubmit={handleFormSubmit} noValidate>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Your Name"
                          required
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Your Email"
                          required
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="tel"
                          className="form-control"
                          name="mobile"
                          placeholder="Your Phone Number"
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                      <div className="mb-2">
                        <textarea
                          className="form-control"
                          name="message"
                          rows={2}
                          placeholder="Your Message"
                          required
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                        style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}
                      >
                        {submitting ? "Submitting..." : "Submit"}
                      </button>
                      {formMessage && (
                        <p
                          className={`translation-form-msg ${formSuccess ? "success" : "error"}`}
                        >
                          {formMessage}
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#top"
          className="btn btn-primary btn-lg-square back-to-top"
          onClick={scrollToTop}
        >
          <i className="fa fa-arrow-up" />
        </a>
      </div>
    </>
  );
}
