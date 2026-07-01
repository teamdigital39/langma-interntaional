import React, { useState, useEffect } from "react";
import PopupForm from "./PopupForm";

const FAQ_ITEMS = [
  {
    "q": "Is IELTS mandatory to study in South Korea?",
    "a": "For English-taught programs, an IELTS score of 5.5 or TOEFL iBT 51 is the typical minimum requirement. For Korean-medium programs, TOPIK Level 3 or above is generally required. Students from countries where English is the official medium of education may qualify for exemptions — this varies by institution. Our advisors will confirm the exact requirement for your chosen program."
  },
  {
    "q": "Can I work part-time while studying in South Korea?",
    "a": "Yes. International students on a valid D-2 student visa are permitted to work part-time in South Korea. Bachelor's students may work up to 20 hours per week during academic sessions. Master's students may work up to 30 hours per week during academic sessions. During official university vacation periods, full-time work may be permitted. University and immigration authority approval is required. Always confirm current regulations with your institution and the Korean Immigration Service before taking up employment."
  },
  {
    "q": "What is the student visa process for South Korea?",
    "a": "After receiving your official Certificate of Admission, you apply for a D-2 student visa at the Korean Embassy or Visa Application Centre in your home country. You'll need your admission letter, valid passport, financial proof — Bank Balance Certificate showing approximately KRW 16,000,000 – KRW 25,000,000 (Approx. INR 9.5 Lakhs – INR 15 Lakhs) in the applicant's or parent's name — academic certificates, and family/birth documents. Langma International provides step-by-step guidance through this process. Visa decisions rest solely with Korean immigration authorities."
  },
  {
    "q": "Is South Korea affordable for Indian students?",
    "a": "South Korea is considered one of the more accessible developed-country study destinations. Tuition fees typically range from approximately KRW 3,700,000 to 5,500,000 per semester (Approx. INR 2.25 Lakhs – INR 3.35 Lakhs) depending on your field of study. Monthly living expenses (accommodation, food, transport, and personal costs) generally range from KRW 600,000 to 1,000,000 (Approx. INR 36,000 – INR 60,500 per month). On-campus dormitory options reduce accommodation costs significantly. Additionally, merit-based tuition benefits linked to TOPIK or IELTS scores can reduce your costs further."
  },
  {
    "q": "Are English-taught programs available in South Korea?",
    "a": "Yes. Many Korean universities have dedicated English-medium degree tracks, particularly in business, AI, computer engineering, media, design, and global studies. These programs are designed specifically to accommodate international students and do not require Korean language proficiency for admission. IELTS 5.5 or TOEFL iBT 51 is the typical minimum requirement for English-track programs."
  },
  {
    "q": "What are the popular intakes in South Korea?",
    "a": "South Korean universities offer two main intakes: the Spring semester (starting March) and the Fall semester (starting September). The Fall intake is the most popular for international students and typically has the widest program availability. Some institutions run multiple admission rounds within each semester intake — the 2026 Fall semester, for example, operates across three admission rounds with the final semester start on September 1, 2026."
  },
  {
    "q": "What is TOPIK and why does it matter?",
    "a": "TOPIK (Test of Proficiency in Korean) is the standard Korean language proficiency test for non-native speakers. It is required for admission to Korean-medium programs and is also the primary criterion for merit-based tuition benefits at many Korean universities. Higher TOPIK levels (4, 5, or 6) can qualify international students for significant tuition reductions — in some cases covering up to 100% of tuition for multiple semesters. Our advisors can help you plan your TOPIK preparation timeline."
  }
];

export default function StudyInSouthKorea() {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [open, setOpen] = useState(false);

  const openForm = () => setOpen(true);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelector(".sk-page")
      ?.querySelectorAll(".benefit-card,.cost-card,.course-card,.langma-card,.work-card")
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(16px)";
        el.style.transition = "opacity .45s ease, transform .45s ease";
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sk-page" style={{ overflowX: "hidden", maxWidth: "100%" }}>
      <style>{`
// .sk-page * {margin:0;padding:0;box-sizing:border-box}
.sk-page {
  --navy:#0B132B;
  --royal:#1C2541;
  --red:#C1121F;
  --red-hover:#e01e2b;
  --gold:#D4A017;
  --gold-light:#f0c040;
  --white:#FFFFFF;
  --off:#F8F9FA;
  --soft:#f2f3f7;
  --muted:#64748b;
  --border:#e2e8f0;
  --text:#0f172a;
  font-family:'Manrope',sans-serif;
  color:var(--text);
  background:var(--off);
  line-height:1.6;
  font-size:15px;
}
.sk-page h1, .sk-page h2, .sk-page h3, .sk-page h4 {font-family:'DM Serif Display',serif}


/* HERO */
.sk-page .hero {background:linear-gradient(135deg,var(--navy) 0%,var(--royal) 55%,#0d1b38 100%);min-height:90vh;display:flex;align-items:center;position:relative;overflow:hidden;padding:90px 44px}
.sk-page .hero-bg-motif {position:absolute;right:0;top:0;width:55%;height:100%;background:radial-gradient(ellipse at 80% 30%,rgba(193,18,31,.12) 0%,transparent 60%),url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Ccircle cx='600' cy='200' r='280' fill='%23C1121F' opacity='.04'/%3E%3Ccircle cx='700' cy='600' r='180' fill='%23D4A017' opacity='.05'/%3E%3C/svg%3E") center/cover;pointer-events:none}
.sk-page .hero-taegeuk {position:absolute;right:6%;top:50%;transform:translateY(-50%);width:340px;height:340px;opacity:.06;background:radial-gradient(circle,var(--red) 0%,var(--navy) 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:220px;pointer-events:none}
.sk-page .hero-content {max-width:680px;position:relative;z-index:2}
.sk-page .hero-badge {display:inline-flex;align-items:center;gap:8px;background:rgba(193,18,31,.15);border:1px solid rgba(193,18,31,.35);color:#f87171;padding:7px 18px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:26px;font-family:'Manrope',sans-serif}
.sk-page .hero h1 {color:var(--white);font-size:clamp(38px,5.5vw,66px);line-height:1.08;margin-bottom:22px;font-weight:400}
.sk-page .hero h1 em {color:var(--gold);font-style:italic}
.sk-page .hero-sub {color:rgba(255,255,255,.78);font-size:18px;font-weight:400;margin-bottom:14px;line-height:1.75;max-width:560px;font-family:'Manrope',sans-serif}
.sk-page .hero-intro {color:rgba(255,255,255,.55);font-size:14.5px;line-height:1.85;margin-bottom:38px;max-width:530px;font-family:'Manrope',sans-serif}
.sk-page .hero-btns {display:flex;gap:14px;flex-wrap:wrap;margin-bottom:52px}
.sk-page .btn-primary {background:var(--red);color:var(--white);border:none;padding:14px 32px;border-radius:3px;font-size:14px;font-weight:700;cursor:pointer;letter-spacing:.4px;transition:all .2s;font-family:'Manrope',sans-serif;text-transform:uppercase}
.sk-page .btn-primary:hover {background:var(--red-hover);transform:translateY(-1px);box-shadow:0 6px 20px rgba(193,18,31,.35)}
.sk-page .btn-secondary {background:transparent;color:var(--white);border:2px solid rgba(255,255,255,.28);padding:12px 28px;border-radius:3px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Manrope',sans-serif}
.sk-page .btn-secondary:hover {border-color:var(--gold);color:var(--gold)}
/* HERO STATS — Premium card strip. */
.sk-page .hero-stats {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:14px;
  margin-top:0;
}
.sk-page .hero-stat {
  background:rgba(255,255,255,.06);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,.11);
  border-radius:10px;
  padding:20px 18px 18px;
  position:relative;
  overflow:hidden;
  transition:background .25s,border-color .25s,transform .25s;
  cursor:default;
}
.sk-page .hero-stat::before {
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:2px;
  background:linear-gradient(90deg,rgba(212,160,23,.0),rgba(212,160,23,.7),rgba(212,160,23,.0));
  opacity:0;
  transition:opacity .25s;
}
.sk-page .hero-stat:hover {
  background:rgba(255,255,255,.09);
  border-color:rgba(212,160,23,.35);
  transform:translateY(-3px);
}
.sk-page .hero-stat:hover::before {opacity:1;}
.sk-page .hero-stat-icon {
  font-size:17px;
  margin-bottom:9px;
  display:block;
  opacity:.75;
  line-height:1;
}
.sk-page .hero-stat .num {
  color:var(--gold);
  font-family:'DM Serif Display',serif;
  font-size:clamp(22px,2.4vw,30px);
  font-weight:400;
  display:block;
  line-height:1.1;
  letter-spacing:-.2px;
  word-break:break-word;
  overflow-wrap:break-word;
}
.sk-page .hero-stat:last-child .num {
  font-size:clamp(17px,1.6vw,21px);
  line-height:1.2;
  letter-spacing:0;
}
.sk-page .hero-stat:last-child .lbl {
  font-size:10.5px;
  letter-spacing:.8px;
}
.sk-page .hero-stat .lbl {
  color:rgba(255,255,255,.55);
  font-size:11px;
  font-weight:600;
  text-transform:uppercase;
  letter-spacing:1.1px;
  margin-top:6px;
  display:block;
  font-family:'Manrope',sans-serif;
  line-height:1.4;
}

/* SECTION COMMONS */
.sk-page section {padding:88px 44px}
.sk-page .container {max-width:1160px;margin:0 auto}
.sk-page .section-label {font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--red);margin-bottom:10px;font-family:'Manrope',sans-serif}
.sk-page .section-title {font-size:clamp(28px,3.5vw,44px);color:var(--navy);margin-bottom:16px;line-height:1.18}
.sk-page .section-sub {color:var(--muted);font-size:15.5px;max-width:600px;line-height:1.75;margin-bottom:52px;font-family:'Manrope',sans-serif}

/* WHY KOREA */
.sk-page .why-korea {background:var(--white)}
.sk-page .benefits-grid {display:grid;grid-template-columns:repeat(auto-fit,minmax(258px,1fr));gap:22px}
.sk-page .benefit-card {background:var(--off);border-radius:6px;padding:30px 26px;border-left:3px solid var(--red);transition:transform .2s,box-shadow .2s}
.sk-page .benefit-card:hover {transform:translateY(-3px);box-shadow:0 10px 30px rgba(11,19,43,.08)}
.sk-page .benefit-icon {font-size:30px;margin-bottom:14px;display:block}
.sk-page .benefit-card h4 {color:var(--navy);font-size:16px;margin-bottom:9px;font-weight:700;font-family:'Manrope',sans-serif}
.sk-page .benefit-card p {color:var(--muted);font-size:13.5px;line-height:1.65}

/* QUICK FACTS */
.sk-page .quick-facts {background:var(--navy)}
.sk-page .quick-facts .section-title {color:var(--white)}
.sk-page .quick-facts .section-label {color:var(--gold)}
.sk-page .quick-facts .section-sub {color:rgba(255,255,255,.5)}
.sk-page .facts-table {width:100%;border-collapse:collapse;background:rgba(255,255,255,.04);border-radius:6px;overflow:hidden}
.sk-page .facts-table tr {border-bottom:1px solid rgba(255,255,255,.07)}
.sk-page .facts-table tr:last-child {border-bottom:none}
.sk-page .facts-table tr:hover td {background:rgba(255,255,255,.04)}
.sk-page .facts-table td {padding:15px 26px;font-size:14.5px;font-family:'Manrope',sans-serif}
.sk-page .facts-table td:first-child {color:rgba(255,255,255,.45);font-weight:600;width:40%;font-size:12px;text-transform:uppercase;letter-spacing:.7px}
.sk-page .facts-table td:last-child {color:var(--white);font-weight:500}
.sk-page .facts-table td span.highlight {color:var(--gold);font-weight:600}

/* COSTS */
.sk-page .costs {background:var(--off)}
.sk-page .cost-grid {display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:18px}
.sk-page .cost-card {background:var(--white);border-radius:6px;padding:30px 22px;text-align:center;border:1px solid var(--border);transition:border-color .2s,transform .2s}
.sk-page .cost-card:hover {border-color:var(--red);transform:translateY(-2px)}
.sk-page .cost-card .label {font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--muted);margin-bottom:12px;font-family:'Manrope',sans-serif}
.sk-page .cost-card .amount {font-family:'DM Serif Display',serif;font-size:26px;font-weight:400;color:var(--navy);margin-bottom:6px}
.sk-page .cost-card .note {font-size:12.5px;color:var(--muted);font-family:'Manrope',sans-serif}
.sk-page .cost-card .icon-top {font-size:26px;margin-bottom:10px;display:block}

/* COURSES */
.sk-page .courses {background:var(--white)}
.sk-page .courses-grid {display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px}
.sk-page .course-card {background:var(--off);border-radius:6px;padding:22px 20px;transition:all .25s;cursor:default;border:1px solid transparent}
.sk-page .course-card:hover {background:var(--navy);transform:translateY(-2px);border-color:var(--navy)}
.sk-page .course-card:hover .course-title {color:var(--white)}
.sk-page .course-card:hover .course-sub {color:rgba(255,255,255,.55)}
.sk-page .course-card:hover .course-icon {filter:grayscale(0)}
.sk-page .course-icon {font-size:24px;margin-bottom:10px;display:block}
.sk-page .course-title {font-size:14.5px;font-weight:700;color:var(--navy);margin-bottom:4px;font-family:'Manrope',sans-serif}
.sk-page .course-sub {font-size:12px;color:var(--muted);line-height:1.5;font-family:'Manrope',sans-serif}

/* LANGUAGE REQUIREMENTS */
.sk-page .lang-reqs {background:var(--soft)}
.sk-page .lang-grid {display:grid;grid-template-columns:1fr 1fr;gap:26px}
.sk-page .lang-card {background:var(--white);border-radius:6px;padding:34px;border:1px solid var(--border)}
.sk-page .lang-card h3 {font-size:19px;color:var(--navy);margin-bottom:22px;padding-bottom:14px;border-bottom:2px solid var(--red)}
.sk-page .lang-row {display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid var(--border)}
.sk-page .lang-row:last-child {border-bottom:none}
.sk-page .lang-test {font-size:14px;font-weight:700;color:var(--navy);font-family:'Manrope',sans-serif}
.sk-page .lang-score {font-size:13.5px;color:var(--muted);font-weight:500;font-family:'Manrope',sans-serif}
.sk-page .lang-badge {display:inline-block;background:rgba(193,18,31,.08);color:var(--red);font-size:11px;font-weight:700;padding:3px 10px;border-radius:12px;letter-spacing:.5px}
.sk-page .lang-note {background:#fefce8;border:1px solid #f5c842;border-radius:5px;padding:14px 18px;margin-top:22px;font-size:13px;color:#795a00;line-height:1.65;font-family:'Manrope',sans-serif}

/* VISA */
.sk-page .visa {background:var(--white)}
.sk-page .visa-grid {display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:start}
.sk-page .visa-steps {counter-reset:step}
.sk-page .visa-step {display:flex;gap:16px;margin-bottom:26px;align-items:flex-start}
.sk-page .step-num {background:var(--red);color:var(--white);width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;margin-top:2px;font-family:'Manrope',sans-serif}
.sk-page .step-content h4 {font-size:15px;color:var(--navy);margin-bottom:4px;font-weight:700;font-family:'Manrope',sans-serif}
.sk-page .step-content p {font-size:13.5px;color:var(--muted);line-height:1.65;font-family:'Manrope',sans-serif}
.sk-page .docs-box {background:var(--off);border-radius:6px;padding:30px}
.sk-page .docs-box h3 {font-size:18px;color:var(--navy);margin-bottom:18px;border-bottom:2px solid var(--red);padding-bottom:12px}
.sk-page .doc-item {display:flex;gap:10px;align-items:flex-start;margin-bottom:13px;font-size:13.5px;color:var(--text);font-family:'Manrope',sans-serif;line-height:1.55}
.sk-page .doc-check {color:var(--red);font-weight:700;flex-shrink:0;margin-top:1px}
.sk-page .visa-notice {background:rgba(193,18,31,.05);border:1px solid rgba(193,18,31,.15);border-radius:5px;padding:14px 18px;margin-top:20px;font-size:13px;color:var(--muted);font-family:'Manrope',sans-serif;line-height:1.65}

/* WORK & CAREER */
.sk-page .work {background:var(--off)}
.sk-page .work-grid {display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:22px}
.sk-page .work-card {background:var(--white);border-radius:6px;padding:30px 26px;border:1px solid var(--border);transition:transform .2s,border-color .2s}
.sk-page .work-card:hover {transform:translateY(-2px);border-color:var(--red)}
.sk-page .work-tag {display:inline-block;background:#fef2f2;color:var(--red);font-size:11px;font-weight:700;padding:3px 10px;border-radius:12px;letter-spacing:.6px;margin-bottom:14px;font-family:'Manrope',sans-serif}
.sk-page .work-card h4 {color:var(--navy);font-size:16px;margin-bottom:10px;font-weight:700;font-family:'Manrope',sans-serif}
.sk-page .work-card p {color:var(--muted);font-size:13.5px;line-height:1.7}

/* CAREER PANEL */
.sk-page .career {background:var(--navy);text-align:center}
.sk-page .career .section-title {color:var(--white)}
.sk-page .career .section-label {color:var(--gold)}
.sk-page .career-text {color:rgba(255,255,255,.65);font-size:16.5px;max-width:680px;margin:0 auto 42px;line-height:1.85;font-family:'Manrope',sans-serif}
.sk-page .career-tags {display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.sk-page .career-tag {background:rgba(255,255,255,.07);color:rgba(255,255,255,.82);border:1px solid rgba(255,255,255,.13);padding:9px 18px;border-radius:20px;font-size:13px;font-weight:500;font-family:'Manrope',sans-serif;transition:all .2s}
.sk-page .career-tag:hover {background:rgba(193,18,31,.2);border-color:rgba(193,18,31,.4);color:var(--white)}

/* WHY LANGMA */
.sk-page .why-langma {background:var(--white)}
.sk-page .langma-intro {display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:center;margin-bottom:48px}
.sk-page .langma-text p {color:var(--muted);font-size:15.5px;line-height:1.8;margin-bottom:14px;font-family:'Manrope',sans-serif}
.sk-page .langma-text strong {color:var(--navy)}
.sk-page .langma-badge-row {display:flex;gap:14px;flex-wrap:wrap}
.sk-page .langma-badge {background:var(--off);border:1px solid var(--border);padding:8px 16px;border-radius:20px;font-size:12.5px;font-weight:700;color:var(--navy);font-family:'Manrope',sans-serif}
.sk-page .langma-grid {display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
.sk-page .langma-card {padding:28px 24px;border-radius:6px;background:var(--off);border-top:3px solid var(--red);transition:transform .2s}
.sk-page .langma-card:hover {transform:translateY(-2px)}
.sk-page .langma-card .icon {font-size:28px;margin-bottom:14px;display:block}
.sk-page .langma-card h4 {font-size:15px;color:var(--navy);margin-bottom:8px;font-weight:700;font-family:'Manrope',sans-serif}
.sk-page .langma-card p {font-size:13.5px;color:var(--muted);line-height:1.65;font-family:'Manrope',sans-serif}

/* FAQ */
.sk-page .faq {background:var(--soft)}
.sk-page .faq-wrapper {display:grid;grid-template-columns:1fr 2fr;gap:60px;align-items:start}
.sk-page .faq-sidebar h3 {font-size:28px;color:var(--navy);margin-bottom:14px;line-height:1.2}
.sk-page .faq-sidebar p {font-size:14px;color:var(--muted);line-height:1.7;margin-bottom:24px;font-family:'Manrope',sans-serif}
.sk-page .faq-contact-btn {background:var(--red);color:var(--white);border:none;padding:12px 24px;border-radius:3px;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:.5px;font-family:'Manrope',sans-serif;text-transform:uppercase;transition:background .2s}
.sk-page .faq-contact-btn:hover {background:var(--red-hover)}
.sk-page .faq-list {max-width:100%}
.sk-page .faq-item {background:var(--white);border-radius:6px;margin-bottom:10px;border:1px solid var(--border);overflow:hidden}
.sk-page .faq-q {padding:20px 26px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-size:14.5px;font-weight:700;color:var(--navy);font-family:'Manrope',sans-serif;transition:background .2s;width:100%;border:none;background:transparent;text-align:left}
.sk-page .faq-q:hover {background:#fef9f9}
.sk-page .faq-q .arrow {color:var(--red);font-size:18px;transition:transform .3s;flex-shrink:0;margin-left:16px}
.sk-page .faq-a {padding:0 26px;max-height:0;overflow:hidden;transition:all .35s ease;font-size:13.5px;color:var(--muted);line-height:1.75;font-family:'Manrope',sans-serif}
.sk-page .faq-item.open .faq-a {max-height:250px;padding:0 26px 20px}
.sk-page .faq-item.open .arrow {transform:rotate(180deg)}

/* CTA STRIP */
.sk-page .cta-strip {background:var(--red);padding:28px 44px;display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}
.sk-page .cta-strip p {color:var(--white);font-size:16px;font-weight:600;font-family:'Manrope',sans-serif}
.sk-page .cta-strip-btn {background:var(--white);color:var(--red);border:none;padding:11px 24px;border-radius:3px;font-size:13.5px;font-weight:800;cursor:pointer;white-space:nowrap;font-family:'Manrope',sans-serif;letter-spacing:.3px;transition:all .2s}
.sk-page .cta-strip-btn:hover {background:var(--off);transform:scale(1.02)}

/* FINAL CTA */
.sk-page .final-cta {background:linear-gradient(135deg,var(--navy) 0%,var(--royal) 60%,#0d1f40 100%);text-align:center;padding:110px 44px;position:relative;overflow:hidden}
.sk-page .final-cta::before {content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(193,18,31,.2) 0%,transparent 65%)}
.sk-page .final-cta h2 {color:var(--white);font-size:clamp(30px,4.5vw,52px);margin-bottom:18px;position:relative;z-index:1}
.sk-page .final-cta h2 em {color:var(--gold);font-style:italic}
.sk-page .final-cta p {color:rgba(255,255,255,.7);font-size:17px;margin-bottom:42px;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.8;position:relative;z-index:1;font-family:'Manrope',sans-serif}
.sk-page .cta-buttons {display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}
.sk-page .cta-btn-gold {background:var(--gold);color:var(--navy);border:none;padding:15px 34px;border-radius:3px;font-size:14.5px;font-weight:800;cursor:pointer;transition:all .2s;letter-spacing:.3px;font-family:'Manrope',sans-serif;text-transform:uppercase}
.sk-page .cta-btn-gold:hover {background:var(--gold-light);transform:translateY(-2px);box-shadow:0 8px 24px rgba(212,160,23,.3)}
.sk-page .cta-btn-outline {background:transparent;color:var(--white);border:2px solid rgba(255,255,255,.35);padding:13px 30px;border-radius:3px;font-size:14.5px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Manrope',sans-serif}
.sk-page .cta-btn-outline:hover {border-color:var(--white);background:rgba(255,255,255,.1)}
.sk-page .cta-trust-row {display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin-top:40px;position:relative;z-index:1}
.sk-page .cta-trust-item {color:rgba(255,255,255,.45);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;font-family:'Manrope',sans-serif;display:flex;align-items:center;gap:6px}

/* FOOTER */
.sk-page footer {background:var(--navy);padding:30px 44px;border-top:1px solid rgba(255,255,255,.07);text-align:center}
.sk-page footer p{color:rgba(255,255,255,.35);font-size:12.5px;font-family:'Manrope',sans-serif;line-height:1.7}
.sk-page footer a {color:rgba(255,255,255,.5);text-decoration:none}
.sk-page footer a:hover {color:var(--gold)}

/* RESPONSIVE */
@media(max-width:900px){
  .sk-page .lang-grid, .sk-page .visa-grid, .sk-page .langma-intro, .sk-page .faq-wrapper {grid-template-columns:1fr}
  .sk-page section {padding:60px 20px}
  .sk-page .hero {padding:64px 20px;min-height:auto}
  .sk-page .hero-stats {grid-template-columns:repeat(2,1fr);gap:11px}
  .sk-page .cta-strip {flex-direction:column;text-align:center;padding:24px 20px}
  .sk-page .final-cta {padding:72px 20px}
  .sk-page .faq-wrapper {gap:32px}
}
@media(max-width:480px){
  .sk-page .hero-stats {grid-template-columns:repeat(2,1fr);gap:9px}
  .sk-page .hero-stat {padding:16px 14px 14px}
  .sk-page .hero-stat .num {font-size:22px}
  .sk-page .hero-stat .lbl {font-size:10px;letter-spacing:.8px}
}
@media(prefers-reduced-motion:reduce){.sk-page *{transition:none !important;animation:none !important}
}
`}</style>

      
      <section className="hero">
        <div className="hero-bg-motif"></div>
        <div className="hero-content">
          <div className="hero-badge">🇰🇷 Asia's Innovation Capital · 2026 Intake Open</div>
          <h1>Study in <em>South Korea</em> —<br />Asia's Innovation Hub<br />for Your Future</h1>
          <p className="hero-sub">World-ranked universities. English-taught programs. A career gateway to Asia's most dynamic economy.</p>
          <p className="hero-intro">South Korea leads the world in technology, innovation, and academic excellence. Home to globally recognised universities, a thriving international student community, and industries that define tomorrow — from AI and semiconductors to design and K-culture — your future starts here.</p>
          <div className="hero-btns">
            <button type="button" className="btn-primary" onClick={openForm}>Apply for 2026 Intake →</button>
            <button type="button" className="btn-secondary" onClick={() => scrollTo("faq")}>Check Eligibility</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-icon">🌏</span>
              <span className="num">170K+</span>
              <span className="lbl">International Students</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-icon">💸</span>
              <span className="num">₹2.2L</span>
              <span className="lbl">From / Semester</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-icon">📅</span>
              <span className="num">Mar &amp; Sep</span>
              <span className="lbl">Intakes Open</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-icon">🚀</span>
              <span className="num">Future‑Ready</span>
              <span className="lbl">Education for Global Careers</span>
            </div>
          </div>
        </div>
      </section>
      
      
      <section className="why-korea" id="why-korea">
        <div className="container">
          <div className="section-label">Why South Korea</div>
          <h2 className="section-title">8 Reasons South Korea Is the Smartest Study Choice of 2026</h2>
          <p className="section-sub">A country that invented the future — and invites the world to study in it. Here's why thousands of international students are choosing South Korea every year.</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">🤖</span>
              <h4>World-Leading Technology Ecosystem</h4>
              <p>Home to Samsung, LG, Hyundai, SK Hynix, and Kakao — South Korea ranks in the world's top tier for R&D investment as a share of GDP. Study where the technology shaping your future is actually being built.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🎓</span>
              <h4>Globally Respected Academic Institutions</h4>
              <p>South Korean universities consistently appear in QS and THE world rankings. Programs in engineering, computer science, business, and design are internationally recognised and sought-after by global employers.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">💰</span>
              <h4>Affordable Tuition Compared to Western Alternatives</h4>
              <p>Tuition fees are significantly lower than universities in the US, UK, or Australia, making South Korea one of the most financially accessible developed-world study destinations available to international students.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🛡️</span>
              <h4>Exceptionally Safe Country</h4>
              <p>South Korea consistently ranks among the safest nations in the world. Low crime rates, excellent healthcare infrastructure, and a high standard of public safety make it an ideal environment for international students.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🌏</span>
              <h4>Gateway to the Asian Career Market</h4>
              <p>South Korea sits at the heart of Northeast Asia. A degree here opens pathways not just in Korea, but across Japan, China, Singapore, and the broader ASEAN region — the world's fastest-growing economic zone.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🌐</span>
              <h4>Growing English-Taught Program Portfolio</h4>
              <p>Many leading Korean universities now offer fully English-medium degree tracks across disciplines — from AI and engineering to global business and design arts — specifically designed for international students.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🎵</span>
              <h4>Korean Culture Is a Global Phenomenon</h4>
              <p>K-pop, K-drama, K-beauty, Korean cuisine — South Korea's cultural influence is unprecedented. Studying here means immersing yourself in a culture the world is actively watching, and building a truly unique personal brand.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📶</span>
              <h4>World's Fastest Internet & Smart Infrastructure</h4>
              <p>South Korea leads global rankings for internet speed and digital infrastructure. Studying here means access to a hyper-connected academic and social environment that matches your generation's pace.</p>
            </div>
          </div>
        </div>
      </section>
      
      
      <div className="cta-strip">
        <p>Not sure if South Korea is right for you? Let our Korea specialists assess your profile — free, no obligation.</p>
        <button type="button" className="cta-strip-btn" onClick={openForm}>Get Free Profile Evaluation →</button>
      </div>
      
      
      <section className="quick-facts" id="facts">
        <div className="container">
          <div className="section-label">At a Glance</div>
          <h2 className="section-title">South Korea — Key Facts for International Students</h2>
          <p className="section-sub">The essential information you need before you begin your application journey.</p>
          <table className="facts-table">
            <tr><td>Capital City</td><td>Seoul</td></tr>
            <tr><td>Currency</td><td>South Korean Won (KRW) · ₩1,000 ≈ ₹62 approx. (subject to market rates)</td></tr>
            <tr><td>Official Language</td><td>Korean (한국어) — English-medium tracks widely available</td></tr>
            <tr><td>Top Student Cities</td><td><span className="highlight">Seoul · Busan · Daegu · Incheon · Daejeon · Gwangju</span></td></tr>
            <tr><td>Tuition Fees (Per Semester)</td><td>Approx. KRW 3,700,000 – 5,500,000 (Approx. INR 2.25 Lakhs – INR 3.35 Lakhs) · Humanities to Engineering/Arts</td></tr>
            <tr><td>Average Living Costs</td><td>Approx. KRW 600,000 – 1,000,000 per month (Approx. INR 36,000 – INR 60,500 per month)</td></tr>
            <tr><td>On-Campus Dormitory</td><td>Approx. KRW 793,000 – 915,000 per semester (Approx. INR 48,000 – INR 55,500 per semester) · twin room</td></tr>
            <tr><td>Intakes</td><td>Spring (March) · Fall (September) — Fall intake preferred for international applicants</td></tr>
            <tr><td>English Language Requirement</td><td>IELTS 5.5 or TOEFL iBT 51 (English-medium programs) · TOPIK Level 3+ (Korean-medium programs)</td></tr>
            <tr><td>Part-Time Work Rights</td><td>Bachelor's: Up to 20 hours/week during semester · Master's: Up to 30 hours/week during semester · Full-time permitted during official vacation periods (subject to immigration regulations &amp; university approval)</td></tr>
            <tr><td>Student Visa Type</td><td><span className="highlight">D-2 Student Visa</span> (applied at Korean Embassy in home country post-admission)</td></tr>
            <tr><td>Financial Proof Required</td><td>Approx. KRW 16,000,000 – KRW 25,000,000 (Approx. INR 9.5 Lakhs – INR 15 Lakhs) · Bank Balance Certificate in the applicant's or parent's name</td></tr>
            <tr><td>Application Fee</td><td>KRW 100,000 (Approx. INR 6,100) · standard application — varies by institution</td></tr>
          </table>
        </div>
      </section>
      
      
      <section className="costs" id="costs">
        <div className="container">
          <div className="section-label">Cost of Study</div>
          <h2 className="section-title">Estimated Study Costs in South Korea</h2>
          <p className="section-sub">South Korea offers excellent academic value. These are approximate ranges to help you plan your budget — actual costs vary by city, institution, and lifestyle.</p>
          <div className="cost-grid">
            <div className="cost-card">
              <span className="icon-top">📚</span>
              <div className="label">Tuition (Per Semester)</div>
              <div className="amount">₩3.7M–5.5M</div>
              <div className="note">Approx. INR 2.25L–3.35L · Humanities to Engineering & Arts tracks</div>
            </div>
            <div className="cost-card">
              <span className="icon-top">🏠</span>
              <div className="label">Accommodation / Month</div>
              <div className="amount">₩200K–500K</div>
              <div className="note">Approx. INR 12,000–30,000/mo · Dormitory to private room; city-dependent</div>
            </div>
            <div className="cost-card">
              <span className="icon-top">🍜</span>
              <div className="label">Food / Month</div>
              <div className="amount">₩200K–400K</div>
              <div className="note">Approx. INR 12,000–24,000/mo · Campus canteen to budget restaurants</div>
            </div>
            <div className="cost-card">
              <span className="icon-top">🚇</span>
              <div className="label">Transport / Month</div>
              <div className="amount">₩50K–100K</div>
              <div className="note">Approx. INR 3,000–6,000/mo · Metro, bus, and intercity travel</div>
            </div>
            <div className="cost-card">
              <span className="icon-top">📱</span>
              <div className="label">Miscellaneous / Month</div>
              <div className="amount">₩100K–200K</div>
              <div className="note">Approx. INR 6,000–12,000/mo · Data, supplies, personal expenses</div>
            </div>
            <div className="cost-card">
              <span className="icon-top">🏥</span>
              <div className="label">Health Insurance</div>
              <div className="amount">₩70K–120K</div>
              <div className="note">Approx. INR 4,200–7,300/mo · Mandatory for student visa holders</div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section className="courses" id="courses">
        <div className="container">
          <div className="section-label">Programs Available</div>
          <h2 className="section-title">Top Course Categories for International Students</h2>
          <p className="section-sub">South Korea offers internationally competitive programs across an impressive range of disciplines — from deep-tech to creative arts.</p>
          <div className="courses-grid">
            <div className="course-card">
              <span className="course-icon">🤖</span>
              <div className="course-title">Artificial Intelligence</div>
              <div className="course-sub">Machine learning, deep learning, AI systems — taught at institutions leading Asia's AI research frontier</div>
            </div>
            <div className="course-card">
              <span className="course-icon">💻</span>
              <div className="course-title">Computer Science & Engineering</div>
              <div className="course-sub">Software engineering, cybersecurity, computer engineering and information systems</div>
            </div>
            <div className="course-card">
              <span className="course-icon">⚙️</span>
              <div className="course-title">Mechanical & Electrical Engineering</div>
              <div className="course-sub">Semiconductor engineering, automotive, eco-energy, and electrical ICT engineering</div>
            </div>
            <div className="course-card">
              <span className="course-icon">🎮</span>
              <div className="course-title">Animation, Gaming & Webtoon</div>
              <div className="course-sub">South Korea is a global leader in gaming and webtoon culture — study in the industry's home market</div>
            </div>
            <div className="course-card">
              <span className="course-icon">📊</span>
              <div className="course-title">Business & Global Management</div>
              <div className="course-sub">International business, accounting, economics, finance, and trade — English-medium tracks available</div>
            </div>
            <div className="course-card">
              <span className="course-icon">📺</span>
              <div className="course-title">Media & Communication</div>
              <div className="course-sub">Visual content, advertising, PR, and media studies — in the heart of Hallyu's creative economy</div>
            </div>
            <div className="course-card">
              <span className="course-icon">🗣️</span>
              <div className="course-title">Korean Language Studies</div>
              <div className="course-sub">Korean language education, interpretation, and translation programs — an invaluable career differentiator</div>
            </div>
            <div className="course-card">
              <span className="course-icon">💄</span>
              <div className="course-title">Fashion, Beauty & Aesthetics</div>
              <div className="course-sub">Fashion design, hair design, makeup, skin care — study in one of the world's leading beauty industries</div>
            </div>
            <div className="course-card">
              <span className="course-icon">🏨</span>
              <div className="course-title">Hospitality & Tourism Management</div>
              <div className="course-sub">Tourism, airline management, hotel operations, and food service management</div>
            </div>
            <div className="course-card">
              <span className="course-icon">📡</span>
              <div className="course-title">Data Science & Analytics</div>
              <div className="course-sub">Applied data science, information engineering, and smart systems in a data-first economy</div>
            </div>
            <div className="course-card">
              <span className="course-icon">🦾</span>
              <div className="course-title">Robotics & Smart Systems</div>
              <div className="course-sub">Advanced robotics, automation, and smart manufacturing — Korea is a world leader in industrial robotics</div>
            </div>
            <div className="course-card">
              <span className="course-icon">🔬</span>
              <div className="course-title">Biotechnology & Health Sciences</div>
              <div className="course-sub">Health sciences, biotech, food science, animal resources, and companion animal industries</div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section className="lang-reqs" id="language">
        <div className="container">
          <div className="section-label">Language Requirements</div>
          <h2 className="section-title">English & Korean Language Pathways</h2>
          <p className="section-sub">South Korea welcomes international students through both English-taught and Korean-medium programs. Here's what you need to know.</p>
          <div className="lang-grid">
            <div className="lang-card">
              <h3>English-Medium Programs</h3>
              <div className="lang-row">
                <span className="lang-test">IELTS Academic</span>
                <span className="lang-score">5.5 or above <span className="lang-badge">Minimum</span></span>
              </div>
              <div className="lang-row">
                <span className="lang-test">TOEFL iBT</span>
                <span className="lang-score">51 or above</span>
              </div>
              <div className="lang-note">📌 Higher IELTS/TOEFL scores may qualify you for merit-based fee reductions. IELTS 7.0+ and TOEFL iBT 91+ can unlock significant first-semester tuition benefits at select institutions.</div>
            </div>
            <div className="lang-card">
              <h3>Korean-Medium Programs</h3>
              <div className="lang-row">
                <span className="lang-test">TOPIK (Test of Proficiency in Korean)</span>
                <span className="lang-score">Level 3 or above (General) <span className="lang-badge">Standard</span></span>
              </div>
              <div className="lang-row">
                <span className="lang-test">Arts & Physical Education Majors</span>
                <span className="lang-score">TOPIK Level 2 accepted</span>
              </div>
              <div className="lang-note">📌 TOPIK scores are also the primary criterion for merit scholarships — higher levels can secure up to 100% tuition waivers for multiple semesters. We help students plan their TOPIK preparation strategy.</div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section className="visa" id="visa">
        <div className="container">
          <div className="section-label">Visa Process</div>
          <h2 className="section-title">South Korea D-2 Student Visa — Step-by-Step Guide</h2>
          <p className="section-sub">A clear, accurate overview of the South Korea student visa process. Our advisors guide you through every stage. Note: visa issuance is at the sole discretion of Korean immigration authorities.</p>
          <div className="visa-grid">
            <div className="visa-steps">
              <div className="visa-step">
                <div className="step-num">1</div>
                <div className="step-content">
                  <h4>Receive Your Official Admission Letter</h4>
                  <p>After completing your application and document submission, you receive your Certificate of Admission from the institution. This is the foundational document for your visa application.</p>
                </div>
              </div>
              <div className="visa-step">
                <div className="step-num">2</div>
                <div className="step-content">
                  <h4>Prepare Your Visa Application Documents</h4>
                  <p>Gather all required documents including your valid passport, financial proof certificate, academic certificates, family relationship documents, and admission letter.</p>
                </div>
              </div>
              <div className="visa-step">
                <div className="step-num">3</div>
                <div className="step-content">
                  <h4>Apply at the Korean Embassy / Consulate</h4>
                  <p>Submit your complete D-2 visa application at the Korean Embassy or authorised Visa Application Centre in your home country. Processing times vary — apply well in advance of your semester start date.</p>
                </div>
              </div>
              <div className="visa-step">
                <div className="step-num">4</div>
                <div className="step-content">
                  <h4>Visa Interview (If Required)</h4>
                  <p>Some applicants may be called for a visa interview. Our team provides structured interview preparation, helping you demonstrate your genuine intent and preparation to the visa officer.</p>
                </div>
              </div>
              <div className="visa-step">
                <div className="step-num">5</div>
                <div className="step-content">
                  <h4>Travel & Register on Arrival</h4>
                  <p>On arrival in South Korea, you'll need to register with the immigration office and obtain your Alien Registration Card (ARC) — your official ID and the document that enables part-time work.</p>
                </div>
              </div>
            </div>
            <div className="docs-box">
              <h3>Key Documents for the D-2 Visa Application</h3>
              <div className="doc-item"><span className="doc-check">✓</span> Valid international passport (minimum 6 months validity beyond study period)</div>
              <div className="doc-item"><span className="doc-check">✓</span> Official Certificate of Admission from the Korean institution</div>
              <div className="doc-item"><span className="doc-check">✓</span> Bank Balance Certificate showing approximately KRW 16,000,000 – KRW 25,000,000 (Approx. INR 9.5 Lakhs – INR 15 Lakhs) in the applicant's or parent's name — issued within 30 days of application</div>
              <div className="doc-item"><span className="doc-check">✓</span> High school graduation certificate (Apostilled or consulate-verified)</div>
              <div className="doc-item"><span className="doc-check">✓</span> Academic transcripts (covering all grades)</div>
              <div className="doc-item"><span className="doc-check">✓</span> Birth certificate or family relationship document (with certified translation)</div>
              <div className="doc-item"><span className="doc-check">✓</span> Copy of parent's passport or government-issued ID</div>
              <div className="doc-item"><span className="doc-check">✓</span> Completed visa application form and passport-size photographs</div>
              <div className="doc-item"><span className="doc-check">✓</span> Language proficiency certificate (IELTS, TOEFL iBT, or TOPIK as applicable)</div>
              <div className="doc-item"><span className="doc-check">✓</span> Documents in non-Korean/English languages require certified Korean or English translation</div>
              <div className="visa-notice">⚠️ This is a general overview only. Document requirements may vary by country of application and individual circumstances. Langma International provides personalised guidance — we do not guarantee visa outcomes, as all decisions rest with Korean immigration authorities.</div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section className="work" id="work">
        <div className="container">
          <div className="section-label">Work & Career</div>
          <h2 className="section-title">Work, Intern & Build Your Career in South Korea</h2>
          <p className="section-sub">South Korea's thriving economy and student-friendly work policies make it one of the most career-friendly study destinations in Asia.</p>
          <div className="work-grid">
            <div className="work-card">
              <div className="work-tag">DURING STUDIES</div>
              <h4>Part-Time Work Rights</h4>
              <p><strong>Bachelor's Students:</strong> Up to 20 hours per week during academic sessions.<br /><strong>Master's Students:</strong> Up to 30 hours per week during academic sessions.<br /><br />Students may work full-time during approved vacation periods, subject to immigration regulations and university requirements. Prior university and immigration authority approval is required before commencing any employment.</p>
            </div>
            <div className="work-card">
              <div className="work-tag">INTERNSHIPS</div>
              <h4>Industry Internship Ecosystem</h4>
              <p>South Korea's internship culture is strong, particularly in technology, media, design, and business. Many universities maintain formal industry partnerships with leading Korean and multinational companies operating in Korea.</p>
            </div>
            <div className="work-card">
              <div className="work-tag">GLOBAL EMPLOYERS</div>
              <h4>Korea's World-Class Companies</h4>
              <p>Samsung, Hyundai, LG, SK Group, Kakao, Naver, Lotte, and hundreds of global MNCs operate out of South Korea. International graduates with Korean language skills and local degrees are in strong demand.</p>
            </div>
            <div className="work-card">
              <div className="work-tag">POST-STUDY</div>
              <h4>Post-Graduation Pathways</h4>
              <p>International graduates from Korean institutions can explore various post-study visa options including the D-10 Job Seeker visa, allowing time to secure employment in South Korea. Specific eligibility conditions apply and are subject to prevailing immigration regulations.</p>
            </div>
          </div>
          <div style={{ marginTop: 28, background: "#fff8e6", border: "1.5px solid #D4A017", borderLeft: "5px solid #D4A017", borderRadius: 6, padding: "18px 24px", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>⚠️</span>
            <p style={{ margin: 0, fontSize: 13.5, color: "#5a4000", lineHeight: 1.75, fontFamily: "'Manrope',sans-serif" }}><strong style={{ color: "#3d2c00" }}>Important Note:</strong> International students in South Korea are generally permitted to engage in part-time employment after completing six months of study, subject to immigration regulations, university policies, academic performance requirements, and obtaining the necessary approvals from both the university and immigration authorities.</p>
          </div>
        </div>
      </section>
      <section className="career" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="section-label">Industry Landscape</div>
          <h2 className="section-title">Industries Where Korean Graduates Excel</h2>
          <p className="career-text">South Korea is home to some of the world's most competitive industries. Your degree positions you at the intersection of technology, culture, and commerce in the world's 13th largest economy.</p>
          <div className="career-tags">
            <div className="career-tag">Semiconductor Technology</div>
            <div className="career-tag">Artificial Intelligence & ML</div>
            <div className="career-tag">Electric Vehicle Engineering</div>
            <div className="career-tag">Gaming & Esports</div>
            <div className="career-tag">K-Content & Media</div>
            <div className="career-tag">K-Beauty & Fashion</div>
            <div className="career-tag">Biotechnology & Pharma</div>
            <div className="career-tag">Smart Manufacturing</div>
            <div className="career-tag">Fintech & Digital Banking</div>
            <div className="career-tag">E-Commerce & Logistics</div>
            <div className="career-tag">Tourism & Hospitality</div>
            <div className="career-tag">Global Supply Chain</div>
            <div className="career-tag">Architecture & Interior Design</div>
            <div className="career-tag">Healthcare & Rehabilitation</div>
          </div>
        </div>
      </section>
      
      
      <section className="why-langma" id="why-langma">
        <div className="container">
          <div className="section-label">Your Partner in this Journey</div>
          <h2 className="section-title">Why Students Trust Langma International</h2>
          <div className="langma-intro">
            <div className="langma-text">
              <p>At <strong>Langma International</strong>, we are not just an admissions agent. We are your strategic partner for global education and career mobility — from the day you decide to study abroad, to the day you land your first job.</p>
              <p>Our Korea specialists have in-depth knowledge of admissions requirements, language pathways, visa documentation, and financial planning specific to Korean institutions. We do not offer generic advice — we build your personalised application strategy.</p>
              <div className="langma-badge-row" style={{ marginTop: 20 }}>
                <span className="langma-badge">🇰🇷 Korea Specialists</span>
                <span className="langma-badge">✅ End-to-End Support</span>
                <span className="langma-badge">📋 Document Expertise</span>
                <span className="langma-badge">🗣️ Interview Coaching</span>
              </div>
            </div>
            <div>
              <div style={{ background: "var(--off)", borderRadius: 8, padding: 32, border: "1px solid var(--border)" }}>
                <div className="section-label" style={{ marginBottom: 16 }}>Our Process</div>
                <div className="visa-step" style={{ marginBottom: 18 }}>
                  <div className="step-num">1</div>
                  <div className="step-content"><h4>Free Profile Evaluation</h4><p>We assess your academic background, language scores, and career goals to identify the most suitable Korean programs and institutions for you.</p></div>
                </div>
                <div className="visa-step" style={{ marginBottom: 18 }}>
                  <div className="step-num">2</div>
                  <div className="step-content"><h4>Application Strategy & Documentation</h4><p>We guide you through every document, form, and submission — ensuring your application is complete, accurate, and compelling.</p></div>
                </div>
                <div className="visa-step" style={{ marginBottom: 18 }}>
                  <div className="step-num">3</div>
                  <div className="step-content"><h4>Visa Guidance & Interview Prep</h4><p>Our team prepares you thoroughly for the D-2 visa application process, including document verification and mock interview sessions where relevant.</p></div>
                </div>
                <div className="visa-step">
                  <div className="step-num">4</div>
                  <div className="step-content"><h4>Pre-Departure & Arrival Support</h4><p>From packing guidance to accommodation options, TOPIK resources, and on-arrival orientation tips — we support you before you go and after you land.</p></div>
                </div>
              </div>
            </div>
          </div>
          <div className="langma-grid">
            <div className="langma-card">
              <span className="icon">🎯</span>
              <h4>Profile-Matched Admissions Guidance</h4>
              <p>Not every student fits every program. We analyse your academic history, language scores, and goals to recommend only the most suitable and realistic options — no false promises.</p>
            </div>
            <div className="langma-card">
              <span className="icon">📑</span>
              <h4>Complete Document Assistance</h4>
              <p>From Apostille guidance to SOP writing, bank certificate advice, and transcript preparation — we ensure your documentation is correct and professionally presented.</p>
            </div>
            <div className="langma-card">
              <span className="icon">🛂</span>
              <h4>Visa Application Support</h4>
              <p>We walk you through the D-2 visa documentation checklist, common pitfalls, and consulate-specific requirements — without making guarantees, but with genuine expertise.</p>
            </div>
            <div className="langma-card">
              <span className="icon">🗣️</span>
              <h4>TOPIK & Language Strategy</h4>
              <p>For students targeting Korean-medium programs or merit scholarships linked to TOPIK scores, we help you understand the timeline and preparation pathway.</p>
            </div>
            <div className="langma-card">
              <span className="icon">✈️</span>
              <h4>Pre-Departure Readiness</h4>
              <p>Banking setup, SIM cards, accommodation options, campus registration — we give you a practical, honest pre-departure briefing so you arrive prepared.</p>
            </div>
            <div className="langma-card">
              <span className="icon">💬</span>
              <h4>Post-Arrival Check-In</h4>
              <p>Our commitment doesn't end at departure. We follow up with enrolled students to support their initial settlement — because we care about outcomes, not just applications.</p>
            </div>
          </div>
        </div>
      </section>
      
      
      <div className="cta-strip">
        <p>2026 Fall intake applications are now open. Seats fill quickly — speak to our Korea team today.</p>
        <button type="button" className="cta-strip-btn" onClick={openForm}>Start My Application →</button>
      </div>
      
      

      <section className="faq" id="faq">
        <div className="container">
          <div className="faq-wrapper">
            <div className="faq-sidebar">
              <div className="section-label">FAQs</div>
              <h3>Answers to Your Top Questions</h3>
              <p>Still have questions? Our Korea education specialists are available for a free consultation — no sales pressure, just honest answers.</p>
              <button type="button" className="faq-contact-btn" onClick={openForm}>Ask Our Korea Team →</button>
            </div>
            <div className="faq-list">
              {FAQ_ITEMS.map((item, i) => (
                <div key={item.q} className={`faq-item ${openFAQ === i ? "open" : ""}`}>
                  <button type="button" className="faq-q" onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}>
                    {item.q}
                    <span className="arrow">▾</span>
                  </button>
                  <div className="faq-a">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="final-cta" id="final-cta">
        <div className="container">
          <h2>Your Korean Academic Journey<br />Starts with One Conversation</h2>
          <p>Book a free, no-obligation counselling session with our South Korea specialists. We'll evaluate your profile, recommend programs, and map out your complete application roadmap — honestly and accurately.</p>
          <div className="cta-buttons">
            <button type="button" className="cta-btn-gold" onClick={openForm}>Book Free Counselling →</button>
          </div>
          <div className="cta-trust-row">
            <span className="cta-trust-item">✓ Free Profile Evaluation</span>
            <span className="cta-trust-item">✓ No Hidden Fees</span>
            <span className="cta-trust-item">✓ Expert Korea Advisors</span>
            <span className="cta-trust-item">✓ End-to-End Support</span>
          </div>
        </div>
      </section>
      
      

      <PopupForm open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
