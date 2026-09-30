import "./NewLanguageLanding.css";
import API_BASE from "../../config.js";
import { useEffect, useState } from "react";

const WA_NUMBER = "919810117094";
const PHONE = "+919810117094";

const LANGUAGE_PAGES = {
  French: {
    country: "France",
    short: "French",
    accent: "#ef4b3f",
    heroImage: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789381673/french-1_jkkdxy.jpg",
    aboutImage: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789381674/french-4_h36dwd.jpg",
    exam: "DELF / TCF",
    intro: "Build practical French skills for study, work, travel and confident everyday communication.",
    about: "Learn pronunciation, conversation, grammar and exam-focused French through structured online or classroom guidance.",
    offer: ["Beginner to advanced French levels", "DELF, TCF and practical exam preparation", "Live online, classroom and flexible support"],
    videos: [
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789032944/Advice_Mobile_Video_in_Experimental_Type_Style_qmxxzi.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789033823/French_bn7plu.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789033825/Advice_Mobile_Video_in_Experimental_Type_Style_1_v1ecf0.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789033856/Advice_Mobile_Video_in_Experimental_Type_Style_2_oxzvav.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789034571/French_1_rwoxn3.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789035433/French_2_gacqvt.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789035829/French_3_oxei8x.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789373649/Feedback_French_Poonam_bgh9tz.mov",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789373659/fRENCH_QUESTION_WORD_xdbvkb.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789373703/French_Tongue_twister_ejicwi.mp4",
    ],
    testimonialImages: [
      { src: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789381673/french-2_y2pflj.jpg", alt: "French language student receiving a certificate at Langma" },
      { src: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789381674/french-4_h36dwd.jpg", alt: "French language student completing a French language level at Langma" },
    ],
  },
  German: {
    country: "Germany",
    short: "German",
    accent: "#d84b35",
    heroImage: "/images/Germany.webp",
    aboutImage: "/images/3.jpg",
    exam: "Goethe / telc",
    intro: "Build useful German skills for study, work, relocation and everyday life in Germany.",
    about: "Progress from the foundations to advanced communication with structured lessons, speaking practice and exam preparation.",
    offer: ["A1 to C2 German language pathways", "Goethe-Zertifikat and telc preparation", "Online, classroom and hybrid learning"],
    videos: [
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957543/002_german_review_tjz8x2.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957543/001german_review_xyvpqv.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957536/WhatsApp_Video_2026-09-09_at_17.54.01_emt6bt.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957535/WhatsApp_Video_2026-09-09_at_17.53.25_wfvwxx.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957535/WhatsApp_Video_2026-09-09_at_17.53.32_pysfnr.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957534/WhatsApp_Video_2026-09-09_at_17.54.02_vskbwy.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957967/Lalit_student_German_feedback_video_mypxlx.mp4",
    ],
    testimonialImages: [
      { src: "/images/1.jpg", alt: "Students and team members celebrating Oktoberfest at Langma" },
      { src: "/images/4.jpg", alt: "Langma students performing during a German cultural celebration" },
    ],
  },
  Japanese: {
    country: "Japan",
    short: "Japanese",
    accent: "#c53d52",
    heroImage: "/images/Japan.webp",
    aboutImage: "/images/calligraphy.jpg",
    exam: "JLPT",
    intro: "Learn Japanese with a clear path from first phrases to confident communication and JLPT preparation.",
    about: "Combine speaking, listening, reading and writing with practical cultural context and structured level guidance.",
    offer: ["Beginner to advanced Japanese levels", "JLPT-focused reading and listening practice", "Online and classroom course options"],
    videos: [
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788866467/Video-7940_wgu9vv.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788866469/Video-4433_f0dqcu.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788866469/Video-8173_yo5wdt.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788866483/Video-1086_iif9ho.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788866488/Video-42967_rh4ntr.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788866470/Video-15072_t2jxxa.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788868150/Video-91513_dintai.mp4",
    ],
    testimonialImages: [
      { src: "/images/one-big-family.jpg", alt: "Group photo of Langma students after a Japanese culture day" },
      { src: "/images/culture-kimono.jpg", alt: "Students wearing traditional Japanese kimonos at Langma" },
    ],
  },
  Korean: {
    country: "South Korea",
    short: "Korean",
    accent: "#3568ae",
    heroImage: "/images/korianbanner.png",
    aboutImage: "/images/KOREANNY1.png",
    exam: "TOPIK",
    intro: "Learn Korean for real-world conversation, study goals, cultural connection and TOPIK preparation.",
    about: "Start with Hangul and build practical speaking, listening, reading and writing skills through guided levels.",
    offer: ["Beginner to advanced Korean levels", "TOPIK-oriented preparation and practice", "Live online and classroom learning"],
    videos: [
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959740/WhatsApp_Video_2026-09-09_at_17.54.55_bvn4tx.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959739/WhatsApp_Video_2026-09-09_at_17.55.01_jydoha.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959737/WhatsApp_Video_2026-09-09_at_17.56.51_vqcplx.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959736/WhatsApp_Video_2026-09-09_at_17.57.14_py87hm.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959736/WhatsApp_Video_2026-09-09_at_17.57.39_eflvmy.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959735/WhatsApp_Video_2026-09-09_at_17.58.04_yajsbg.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959739/WhatsApp_Video_2026-09-09_at_17.55.18_pk1f6x.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959734/WhatsApp_Video_2026-09-09_at_17.59.04_zunh8r.mp4",
    ],
    testimonialImages: [
      { src: "/images/KOREANNY5.png", alt: "Students celebrating Seollal in traditional Korean hanbok" },
      { src: "/images/KOREANNY3.png", alt: "Students performing a K-Pop dance at a Korean cultural celebration" },
    ],
  },
  Chinese: {
    country: "China",
    short: "Chinese",
    accent: "#c7922e",
    heroImage: "/images/chinese-hero-bg.jpg",
    aboutImage: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789468939/IMG_0300_v0kaun.jpg",
    exam: "HSK",
    intro: "Build practical Mandarin skills through a structured path for beginners, professionals and China-focused goals.",
    about: "Learn pinyin, tones, characters, grammar and conversation with HSK-focused guidance and cultural context.",
    offer: ["HSK 1 to HSK 6 learning pathways", "Mandarin speaking, tones and character practice", "Online, classroom and flexible course guidance"],
    videos: [
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789456031/China_Visit_Ep02_mbnqni.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789455864/China_visit_Ep01_ws4haj.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789455642/Chinese_Embassy_Event_Instagram_video_kuejsj.mp4",
    ],
    testimonialImages: [
      { src: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789468939/IMG_0300_v0kaun.jpg", alt: "Langma students practising traditional Chinese calligraphy" },
      { src: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789469016/IMG_0459_myakgd.jpg", alt: "Langma student showcasing Chinese calligraphy during a cultural activity" },
    ],
  },
};

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2a9.96 9.96 0 0 0-8.64 14.91L2 22l5.25-1.38A9.96 9.96 0 1 0 12.04 2zm5.86 14.13c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.35 1.45.3.15.47.12.65-.07.18-.19.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z" /></svg>;
}

export default function NewLanguageLanding({ language }) {
  const page = LANGUAGE_PAGES[language] || LANGUAGE_PAGES.French;
  const testimonialItems = [
    ...(page.testimonialImages || []).map((image) => ({ type: "image", ...image })),
    ...page.videos.slice(0, 3).map((video) => ({
      type: "video",
      src: video,
      poster: video.replace("/video/upload/", "/video/upload/so_1/").replace(/\.(mp4|mov)(\?.*)?$/, ".jpg"),
    })),
  ];
  const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi Langma, I would like details about the ${page.short} language course.`)}`;
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    setTestimonialIndex(0);
  }, [language]);

  const testimonialCount = testimonialItems.length;
  const showPreviousTestimonial = () => setTestimonialIndex((current) => (current - 1 + testimonialCount) % testimonialCount);
  const showNextTestimonial = () => setTestimonialIndex((current) => (current + 1) % testimonialCount);

  async function handleLeadSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const mobile = String(formData.get("phone") || "").replace(/\D/g, "");

    if (!/^[0-9]{10,15}$/.test(mobile)) {
      setFormStatus({ type: "error", message: "Please enter a valid phone number." });
      return;
    }

    formData.set("mobile", mobile);
    formData.set("language", page.short);
    formData.set("service", `${page.short} Language Course`);
    formData.set("type", "Language Course Inquiry");
    formData.set("currenturl", window.location.href);
    formData.set("message", `I would like details about the ${page.short} language course.`);
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_BASE}/api/contact-lead`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Lead submission failed");
      form.reset();
      window.location.assign("/thank-you?programme=language");
      return;
    } catch {
      setFormStatus({ type: "error", message: "Something went wrong. Please try again or use WhatsApp." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="new-language-page" style={{ "--page-accent": page.accent }}>
      <a className="new-skip-link" href="#new-main">Skip to content</a>
      <header className="new-landing-header">
        <a href="/" aria-label="Langma International home"><img src="https://www.langmainternational.com/images/lngm2.png" alt="Langma International" /></a>
        <nav aria-label={`${page.short} course navigation`}>
          <a href="#about">About</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#offer">Course offer</a>
          <a className="header-cta" href="#contact">Enquire now</a>
        </nav>
      </header>

      <div id="new-main">
        <section className="new-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,18,36,.98) 0%, rgba(5,18,36,.95) 52%, rgba(5,18,36,.90) 100%), url(${page.heroImage})` }}>
          <div className="new-container new-hero-grid">
            <div className="new-hero-copy">
              <p className="new-eyebrow">{page.short} language course · hybrid online and offline learning</p>
              <h1>{page.short} Language Course Online &amp; Offline at Langma International</h1>
              <p className="new-hero-intro">{page.intro} Learn with Langma International through flexible hybrid online and offline classroom options.</p>
              <div className="new-actions">
                <a className="new-button new-button-primary" href={whatsappUrl} target="_blank" rel="noopener"><WhatsAppIcon /> Chat on WhatsApp</a>
                <a className="new-button new-button-light" href={`tel:${PHONE}`}><PhoneIcon /> Talk to a counsellor</a>
              </div>
              <p className="new-microcopy">Ask for the current level plan, batch timing, mode and course fee.</p>
            </div>
            <div className="new-hero-card new-lead-card">
              <div className="new-form-heading">
                <span>Get course details</span>
                <strong>Plan your {page.short} learning path</strong>
                <p>Share your details and our counsellor will recommend the right level, mode and batch.</p>
              </div>
              <form className="new-lead-form" onSubmit={handleLeadSubmit} noValidate>
                <label htmlFor={`${page.short}-name`}>Name</label>
                <input id={`${page.short}-name`} name="name" type="text" autoComplete="name" placeholder="Your name" minLength="2" required />
                <label htmlFor={`${page.short}-phone`}>Phone number</label>
                <input id={`${page.short}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="10–15 digit number" inputMode="tel" required />
                <label htmlFor={`${page.short}-email`}>Email address</label>
                <input id={`${page.short}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                <button className="new-form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Request course details"}</button>
                {formStatus.message && <p className={`new-form-status new-form-status-${formStatus.type}`} role="status">{formStatus.message}</p>}
              </form>
            </div>
          </div>
        </section>

        <section className="new-section new-about" id="about">
          <div className="new-container new-two-column">
            <div><p className="new-eyebrow">About the course</p><h2>A clear path to useful {page.short}.</h2><p>{page.about}</p><p>Choose the learning mode that fits your schedule and get guidance matched to your level, objective and timeline.</p></div>
            <img src={page.aboutImage} alt={`${page.short} language learning at Langma`} loading="lazy" />
          </div>
        </section>

        <section className="new-section new-testimonials" id="testimonials">
          <div className="new-container new-testimonials-grid">
            <div className="new-testimonials-copy">
              <p className="new-eyebrow">Testimonials &amp; course moments</p>
              <h2>See how learners experience the journey.</h2>
              <p>Explore real classroom moments, learner feedback and language-learning experiences from the Langma community.</p>
              <div className="new-testimonial-note"><strong>{page.short} learning in action</strong><span>Watch, browse and find the learning style that feels right for your goal.</span></div>
            </div>
            <div className="new-testimonial-slider" role="region" aria-roledescription="carousel" aria-label={`${page.short} learner testimonials`}>
              <div className="new-slider-viewport">
                <div className="new-slider-track" style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
                  {testimonialItems.map((item, index) => (
                    <article className={`new-media-card ${item.type === "image" ? "new-image-card" : "new-video-card"}`} key={item.src} aria-label={`Testimonial ${index + 1} of ${testimonialCount}`}>
                      {item.type === "image" ? <img src={item.src} alt={item.alt} loading="lazy" /> : <video controls preload="metadata" playsInline src={item.src} poster={item.poster} />}
                      <p>{page.short} learning, practice and progress.</p>
                    </article>
                  ))}
                </div>
              </div>
              <div className="new-slider-controls">
                <button type="button" className="new-slider-arrow" onClick={showPreviousTestimonial} disabled={testimonialCount < 2} aria-label="Previous testimonial">←</button>
                <div className="new-slider-dots" aria-label="Choose testimonial">
                  {testimonialItems.map((item, index) => <button type="button" key={item.src} className={`new-slider-dot${testimonialIndex === index ? " is-active" : ""}`} onClick={() => setTestimonialIndex(index)} aria-label={`Show testimonial ${index + 1}`} aria-current={testimonialIndex === index ? "true" : undefined} />)}
                </div>
                <button type="button" className="new-slider-arrow" onClick={showNextTestimonial} disabled={testimonialCount < 2} aria-label="Next testimonial">→</button>
              </div>
            </div>
          </div>
        </section>

        <section className="new-section new-offer" id="offer">
          <div className="new-container"><p className="new-eyebrow">What you get</p><h2>Everything needed to move forward.</h2><div className="new-offer-grid">{page.offer.map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3><p>Practical guidance, flexible delivery and support for your specific learning goal.</p></article>)}</div></div>
        </section>

        <section className="new-section new-cta" id="contact">
          <div className="new-container new-cta-inner"><div><p className="new-eyebrow">Plan your next step</p><h2>Ready to start your {page.short} journey?</h2><p>New batches and counselling slots depend on the current schedule. Ask now and we will share the available options.</p></div><div className="new-actions"><a className="new-button new-button-primary" href={whatsappUrl} target="_blank" rel="noopener"><WhatsAppIcon /> Get course details</a><a className="new-button new-button-outline" href={`tel:${PHONE}`}><PhoneIcon /> Call now</a></div></div>
        </section>
      </div>

      <footer className="new-landing-footer">
        <div className="new-container new-footer-grid">
          <div className="new-footer-brand">
            <img src="https://www.langmainternational.com/images/lngm2.png" alt="Langma International" />
            <p>Language learning, global education and mobility guidance for your next step.</p>
          </div>
          <div className="new-footer-links">
            <strong>Explore</strong>
            <a href="#about">About the course</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#offer">Course offer</a>
          </div>
          <div className="new-footer-links">
            <strong>Contact</strong>
            <a href="tel:+919810117094">+91 98101 17094</a>
            <a href="mailto:info@langmainternational.com">info@langmainternational.com</a>
            <a href="/contact/">Contact us</a>
          </div>
        </div>
        <div className="new-container new-footer-bottom"><span>© {new Date().getFullYear()} Langma International Pvt. Ltd.</span><a href="/privacy-policy/">Privacy Policy</a></div>
      </footer>

      <a className="new-float new-float-phone" href={`tel:${PHONE}`} aria-label={`Call Langma about the ${page.short} course`}><PhoneIcon /></a>
      <a className="new-float new-float-whatsapp" href={whatsappUrl} target="_blank" rel="noopener" aria-label={`Chat on WhatsApp about the ${page.short} course`}><WhatsAppIcon /></a>
    </main>
  );
}
