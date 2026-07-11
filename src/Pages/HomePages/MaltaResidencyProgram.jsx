import React, { useState, useEffect } from 'react';
import { useResidencyLeadForms } from '../../hooks/useResidencyLeadForms';

const SERVICE = 'Malta Permanent Residence Programme';

const LangmaMaltaPermanentResidenceProgrammePage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadSubmitted, officeSubmitted,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Malta MPRP Consultation' });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="lg-page">
      <style>{`
  .lg-page {
    --primary:#296166;
    --deep-navy:#296166;
    --navy-mid:#1B2B28;
    --gold:#2FC7A1;
    --soft-gold:#6FE0C6;
    --gold-deep:#2FC7A1;
    --bg:#F5F8F6;
    --white:#FFFFFF;
    --text:#1B2B28;
    --muted:#296166;
    --radius:14px;
    --shadow-soft: 0 10px 40px rgba(26,37,64,0.08);
    --shadow-strong: 0 20px 60px rgba(26,37,64,0.18);
  }

  .lg-page * {margin:0;padding:0;box-sizing:border-box;}
  .lg-page html {scroll-behavior:smooth;}
  .lg-page {
    font-family: 'Georgia', 'Times New Roman', serif;
    color:var(--text);
    background:var(--bg);
    line-height:1.65;
    -webkit-font-smoothing:antialiased;
  }
  .lg-page h1, .lg-page h2, .lg-page h3, .lg-page h4 {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-weight:600;
    letter-spacing:0.3px;
    color:var(--primary);
  }
  .lg-page .eyebrow {
    font-family:'Helvetica Neue', Arial, sans-serif;
    text-transform:uppercase;
    letter-spacing:3px;
    font-size:12px;
    color:var(--gold);
    font-weight:600;
    margin-bottom:14px;
    display:block;
  }
  .lg-page a {color:inherit; text-decoration:none;}
  .lg-page img {display:block; width:100%; height:100%; object-fit:cover;}
  .lg-page .container {
    max-width:1180px;
    margin:0 auto;
    padding:0 28px;
  }
  .lg-page section {
    padding:96px 0;
  }

  /* ===== HEADER ===== */
  .lg-page header {
    position:fixed;
    top:0; left:0; right:0;
    z-index:1000;
    background:rgba(26,37,64,0.0);
    transition:background 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease;
    padding:26px 0;
  }
  .lg-page header.scrolled {
    background:rgba(26,37,64,0.92);
    backdrop-filter: blur(14px);
    box-shadow:0 6px 24px rgba(0,0,0,0.18);
    padding:14px 0;
  }
  .lg-page .header-inner {
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .lg-page .logo {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:22px;
    font-weight:700;
    color:var(--white);
    letter-spacing:2px;
  }
  .lg-page .logo span {color:var(--gold);}
  .lg-page nav ul {
    display:flex;
    gap:34px;
    list-style:none;
  }
  .lg-page nav a {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:14px;
    color:var(--white);
    opacity:0.85;
    transition:opacity 0.25s ease, color 0.25s ease;
  }
  .lg-page nav a:hover {opacity:1; color:var(--gold);}
  .lg-page .header-cta {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:13px;
    font-weight:600;
    letter-spacing:1px;
    text-transform:uppercase;
    color:var(--primary);
    background:var(--gold);
    padding:12px 26px;
    border-radius:40px;
    transition:transform 0.25s ease, box-shadow 0.25s ease;
    white-space:nowrap;
  }
  .lg-page .header-cta:hover {
    transform:translateY(-2px);
    box-shadow:0 8px 20px rgba(47,199,161,0.45);
  }
  .lg-page .nav-toggle {display:none;}

  /* ===== HERO ===== */
  .lg-page .hero {
    position:relative;
    min-height:auto;
    display:flex;
    align-items:center;
    color:#1B2B28;
    overflow:hidden;
    background:#FFFFFF;
    padding:96px 0 70px;
  }
  .lg-page .hero::before {
    content:"";
    position:absolute;left:30px;top:96px;bottom:96px;width:3px;border-radius:999px;
    background:linear-gradient(to bottom,transparent,#2FC7A1,transparent);
    z-index:0;
    pointer-events:none;
    inset:auto;
  }
  .lg-page .hero-bg {display:none;}
  .lg-page .hero-split {
    position:relative;z-index:1;
    width:100%;
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:72px;
    align-items:center;
    padding-top:120px;
    padding-bottom:80px;
  }
  .lg-page .hero-content {
    position:relative;
    z-index:1;
    max-width:100%;
    padding-top:0;
  }
  .lg-page .hero h1 {
    color:#1B2B28;
    font-size:clamp(34px, 4.8vw, 60px);
    line-height:1.1;
    margin-bottom:24px;
    font-weight:700;
  }
  .lg-page .hero h1 em {
    font-style:normal;
    color:#4FA3D1;
  }
  .lg-page .hero p {
    font-size:17.5px;
    color:#4C5C58;
    max-width:520px;
    margin-bottom:38px;
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-weight:300;
    line-height:1.7;
  }
  .lg-page .hero-ctas {
    display:flex;
    gap:18px;
    flex-wrap:wrap;
  }
  .lg-page .hero-visual {
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
  }
  .lg-page .hero-visual::before {
    content:"";
    position:absolute;
    top:22px;right:-16px;
    width:100%;
    height:100%;
    border:1px solid rgba(47,199,161,0.20);
    border-radius:16px;
    pointer-events:none;
  }
  .lg-page .hero-img-card {
    position:relative;
    width:100%;
    max-width:500px;
    border-radius:16px;
    overflow:hidden;
    box-shadow:0 44px 90px rgba(0,0,0,0.50), 0 0 0 1px rgba(47,199,161,0.24);
  }
  .lg-page .hero-img-card img {
    display:block;
    width:100%;
    height:460px;
    object-fit:cover;
    border-radius:16px;
    transition:transform 0.9s ease;
  }
  .lg-page .hero-img-card:hover img {transform:scale(1.04);}
  .lg-page .hero-img-card::after {
    content:"";
    position:absolute;inset:11px;
    border:1px solid rgba(47,199,161,0.35);
    border-radius:10px;
    pointer-events:none;
    z-index:2;
  }
  .lg-page .hero-img-card::before {
    content:"";
    position:absolute;inset:0;
    background:linear-gradient(to top, rgba(26,37,64,0.50) 0%, transparent 50%);
    z-index:1;
    border-radius:16px;
    pointer-events:none;
  }
  .lg-page .hero-img-caption {
    position:absolute;bottom:20px;left:20px;z-index:3;
    background:rgba(26,37,64,0.80);
    backdrop-filter:blur(8px);
    border:1px solid rgba(47,199,161,0.28);
    border-radius:8px;
    padding:10px 15px;
    display:flex;align-items:center;gap:9px;
  }
  .lg-page .hero-img-caption .pulse-dot {
    width:7px;height:7px;border-radius:50%;
    background:var(--gold);flex-shrink:0;
    animation:pulseDot 2.2s ease infinite;
  }
  @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.55;transform:scale(.8);}}
  .lg-page .hero-img-caption span {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:12px;
    letter-spacing:.5px;
    color:rgba(255,255,255,0.88);
    font-weight:500;
  }
  @media(max-width:1024px){
    .hero-split {grid-template-columns:1fr;gap:48px;padding-top:130px;padding-bottom:60px;}
    .hero-img-card img {height:360px;}
    .hero-visual::before {display:none;}
    .hero-img-card {max-width:100%;}
  }
  @media(max-width:768px){
    .lg-page .hero-split {padding-top:110px;padding-bottom:50px;gap:36px;}
    .lg-page .hero-img-card img {height:260px;}
  }
  .lg-page .btn {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:14px;
    font-weight:600;
    letter-spacing:1px;
    text-transform:uppercase;
    padding:17px 36px;
    border-radius:40px;
    display:inline-block;
    transition:transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
    border:1px solid transparent;
    cursor:pointer;
  }
  .lg-page .btn-primary {
    background:var(--gold);
    color:var(--primary);
  }
  .lg-page .btn-primary:hover {
    transform:translateY(-3px);
    box-shadow:0 12px 30px rgba(47,199,161,0.4);
  }
  .lg-page .btn-outline {
    background:transparent;
    color:#1A2540;
    border:2px solid #2FC7A1;
  }
  .lg-page .btn-outline:hover {
    background:#E6F8F3;
    border-color:#2FC7A1;
    transform:translateY(-3px);
  }
  .lg-page .hero-scroll-indicator {
    position:absolute;
    bottom:38px; left:50%;
    transform:translateX(-50%);
    z-index:1;
    color:#7E8C88;
    font-size:12px;
    font-family:'Helvetica Neue', Arial, sans-serif;
    letter-spacing:2px;
    text-transform:uppercase;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:10px;
  }
  .lg-page .scroll-line {
    width:1px; height:40px;
    background:linear-gradient(180deg, rgba(41,97,102,0.35), transparent);
    animation:scrollPulse 2s infinite;
  }
  @keyframes scrollPulse{
    0%{opacity:0.3;}
    50%{opacity:1;}
    100%{opacity:0.3;}
  }

  /* ===== TRUST BAR ===== */
  .lg-page .trust-bar {
    background:var(--white);
    padding:54px 0;
    border-bottom:1px solid rgba(26,37,64,0.06);
  }
  .lg-page .trust-grid {
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:36px;
    text-align:center;
  }
  .lg-page .trust-item h3 {
    font-size:34px;
    color:var(--primary);
    margin-bottom:6px;
    font-weight:700;
  }
  .lg-page .trust-item span {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:13px;
    color:var(--muted);
    text-transform:uppercase;
    letter-spacing:1.5px;
  }
  .lg-page .trust-item h3 .accent {color:var(--gold);}

  /* ===== SECTION HEADERS ===== */
  .lg-page .section-head {
    max-width:680px;
    margin:0 auto 60px;
    text-align:center;
  }
  .lg-page .section-head h2 {
    font-size:clamp(28px, 4vw, 42px);
    margin-bottom:18px;
    line-height:1.2;
  }
  .lg-page .section-head p {
    color:var(--muted);
    font-size:17px;
  }
  .lg-page .section-head.left {
    margin:0 0 60px;
    text-align:left;
  }

  /* ===== WHY MALTA ===== */
  .lg-page .why-malta {
    background:var(--white);
  }
  .lg-page .why-grid {
    display:grid;
    grid-template-columns:1.1fr 1fr;
    gap:70px;
    align-items:center;
  }
  .lg-page .why-image {
    border-radius:var(--radius);
    overflow:hidden;
    height:520px;
    box-shadow:var(--shadow-soft);
    position:relative;
  }
  .lg-page .why-image img {transition:transform 8s ease;}
  .lg-page .why-image:hover img {transform:scale(1.08);}
  .lg-page .why-points {
    display:flex;
    flex-direction:column;
    gap:30px;
  }
  .lg-page .why-point {
    display:flex;
    gap:20px;
    align-items:flex-start;
  }
  .lg-page .why-point-icon {
    flex-shrink:0;
    width:48px; height:48px;
    border-radius:50%;
    background:linear-gradient(135deg, var(--gold), var(--soft-gold));
    display:flex; align-items:center; justify-content:center;
    color:var(--white);
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-weight:700;
    font-size:18px;
  }
  .lg-page .why-point h4 {font-size:19px; margin-bottom:6px;}
  .lg-page .why-point p {color:var(--muted); font-size:15px;}

  /* ===== DISCOVER MALTA ===== */
  .lg-page .dm-cards {
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:28px;
    margin-bottom:60px;
  }
  .lg-page .dm-card {
    background:var(--bg);
    border-radius:var(--radius);
    padding:36px 30px;
    box-shadow:var(--shadow-soft);
    border-top:3px solid var(--gold);
    transition:transform 0.3s ease;
  }
  .lg-page .dm-card:hover {transform:translateY(-6px);}
  .lg-page .dm-icon {
    width:52px; height:52px;
    border-radius:50%;
    background:var(--white);
    display:flex; align-items:center; justify-content:center;
    font-size:22px;
    margin-bottom:20px;
    border:1px solid rgba(47,199,161,0.3);
    color:var(--gold);
  }
  .lg-page .dm-card h4 {font-size:17px; margin-bottom:10px; color:var(--primary);}
  .lg-page .dm-card p {color:var(--muted); font-size:14px; line-height:1.65;}
  .lg-page .dm-facts-strip {
    background:var(--primary);
    border-radius:var(--radius);
    padding:36px 48px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap:wrap;
    gap:24px;
  }
  .lg-page .dm-fact {text-align:center; flex:1; min-width:130px;}
  .lg-page .dm-fact .dm-label {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:11px;
    text-transform:uppercase;
    letter-spacing:2px;
    color:var(--gold);
    margin-bottom:8px;
    font-weight:600;
  }
  .lg-page .dm-fact .dm-value {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-weight:600;
    font-size:17px;
    color:var(--white);
  }
  .lg-page .dm-divider {
    width:1px; height:40px;
    background:rgba(247,250,252,0.1);
    flex-shrink:0;
  }
  @media (max-width: 1024px) {
    .lg-page .dm-cards {grid-template-columns: repeat(2,1fr);}
  }
  @media (max-width: 768px) {
    .lg-page .dm-cards {grid-template-columns: 1fr;}
    .lg-page .dm-facts-strip {flex-direction: column; align-items: center; text-align: center; padding: 36px 28px;}
    .lg-page .dm-divider {display: none;}
  }

  /* ===== PROGRAMME OVERVIEW ===== */
  .lg-page .programme {
    background:var(--bg);
  }
  .lg-page .programme-cards {
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:30px;
  }
  .lg-page .pcard {
    background:var(--white);
    border-radius:var(--radius);
    padding:42px 34px;
    box-shadow:var(--shadow-soft);
    transition:transform 0.3s ease, box-shadow 0.3s ease;
    border:1px solid rgba(26,37,64,0.04);
  }
  .lg-page .pcard:hover {
    transform:translateY(-8px);
    box-shadow:var(--shadow-strong);
  }
  .lg-page .pcard .pnum {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:13px;
    color:var(--gold);
    letter-spacing:2px;
    text-transform:uppercase;
    margin-bottom:16px;
    display:block;
  }
  .lg-page .pcard h3 {font-size:21px; margin-bottom:14px;}
  .lg-page .pcard p {color:var(--muted); font-size:15px;}

  /* ===== BENEFITS ===== */
  .lg-page .benefits {
    background:var(--primary);
    color:var(--white);
    position:relative;
    overflow:hidden;
  }
  .lg-page .benefits::before {
    content:'';
    position:absolute;
    top:-200px; right:-200px;
    width:500px; height:500px;
    background:radial-gradient(circle, rgba(47,199,161,0.18), transparent 70%);
    border-radius:50%;
  }
  .lg-page .benefits .section-head h2,
  .lg-page .benefits .section-head p {color:var(--white);}
  .lg-page .benefits .section-head p {color:rgba(255,255,255,0.7);}
  .lg-page .benefits-grid {
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:26px;
    position:relative;
    z-index:1;
  }
  .lg-page .bcard {
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.12);
    border-radius:var(--radius);
    padding:32px 26px;
    backdrop-filter: blur(8px);
    transition:background 0.3s ease, transform 0.3s ease;
  }
  .lg-page .bcard:hover {
    background:rgba(255,255,255,0.09);
    transform:translateY(-6px);
  }
  .lg-page .bcard .bicon {
    font-size:28px;
    margin-bottom:18px;
    color:var(--soft-gold);
  }
  .lg-page .bcard h4 {color:var(--white); font-size:17px; margin-bottom:10px;}
  .lg-page .bcard p {color:rgba(255,255,255,0.65); font-size:14px;}

  /* ===== INVESTMENT REQUIREMENTS ===== */
  .lg-page .investment {background:var(--white);}
  .lg-page .inv-table-wrap {
    background:var(--bg);
    border-radius:var(--radius);
    overflow:hidden;
    box-shadow:var(--shadow-soft);
    border:1px solid rgba(26,37,64,0.04);
  }
  .lg-page .inv-row {
    display:grid;
    grid-template-columns:1.3fr 1fr 1fr;
    align-items:center;
    padding:26px 36px;
    border-bottom:1px solid rgba(26,37,64,0.06);
  }
  .lg-page .inv-row:last-child {border-bottom:none;}
  .lg-page .inv-row.head {
    background:var(--primary);
    color:var(--white);
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:13px;
    text-transform:uppercase;
    letter-spacing:1.5px;
    font-weight:600;
    padding:20px 36px;
  }
  .lg-page .inv-row .label {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-weight:600;
    color:var(--primary);
    font-size:16px;
  }
  .lg-page .inv-row .label small {
    display:block;
    font-weight:400;
    color:var(--muted);
    font-size:13px;
    margin-top:4px;
    font-family:'Georgia', serif;
  }
  .lg-page .inv-row .value {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:16px;
    color:var(--text);
  }
  .lg-page .inv-row .value .gold-tag {
    color:var(--gold);
    font-weight:700;
    font-size:18px;
  }
  .lg-page .inv-note {
    margin-top:28px;
    font-size:14px;
    color:var(--muted);
    text-align:center;
  }

  /* ===== FAMILY INCLUSION ===== */
  .lg-page .family {background:var(--bg);}
  .lg-page .family-grid {
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:24px;
  }
  .lg-page .fcard {
    background:var(--white);
    border-radius:var(--radius);
    padding:36px 28px;
    text-align:center;
    box-shadow:var(--shadow-soft);
    transition:transform 0.3s ease;
  }
  .lg-page .fcard:hover {transform:translateY(-6px);}
  .lg-page .fcard .ficon {
    width:60px; height:60px;
    margin:0 auto 20px;
    border-radius:50%;
    background:var(--bg);
    display:flex; align-items:center; justify-content:center;
    font-size:24px;
    color:var(--gold);
    border:1px solid rgba(47,199,161,0.3);
  }
  .lg-page .fcard h4 {font-size:17px; margin-bottom:10px;}
  .lg-page .fcard p {color:var(--muted); font-size:14px;}

  /* ===== APPLICATION PROCESS / TIMELINE ===== */
  .lg-page .process {background:var(--white);}
  .lg-page .timeline {
    position:relative;
    max-width:900px;
    margin:0 auto;
  }
  .lg-page .timeline::before {
    content:'';
    position:absolute;
    left:29px; top:10px; bottom:10px;
    width:2px;
    background:linear-gradient(180deg, var(--gold), rgba(47,199,161,0.15));
  }
  .lg-page .tl-item {
    display:flex;
    gap:30px;
    margin-bottom:48px;
    position:relative;
  }
  .lg-page .tl-item:last-child {margin-bottom:0;}
  .lg-page .tl-dot {
    flex-shrink:0;
    width:60px; height:60px;
    border-radius:50%;
    background:var(--primary);
    color:var(--gold);
    display:flex; align-items:center; justify-content:center;
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-weight:700;
    font-size:18px;
    box-shadow:var(--shadow-soft);
    position:relative;
    z-index:1;
  }
  .lg-page .tl-content {padding-top:8px;}
  .lg-page .tl-content h4 {font-size:19px; margin-bottom:8px;}
  .lg-page .tl-content p {color:var(--muted); font-size:15px; max-width:600px;}
  .lg-page .tl-content .tl-time {
    display:inline-block;
    margin-top:10px;
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:12px;
    letter-spacing:1.5px;
    text-transform:uppercase;
    color:var(--gold);
    font-weight:600;
  }

  /* ===== LIFESTYLE ===== */
  .lg-page .lifestyle {
    background:var(--deep-navy);
    color:var(--white);
  }
  .lg-page .lifestyle .section-head h2, .lg-page .lifestyle .section-head p {color:var(--white);}
  .lg-page .lifestyle .section-head p {color:rgba(255,255,255,0.65);}
  .lg-page .lifestyle-grid {
    display:grid;
    grid-template-columns:repeat(4,1fr);
    grid-template-rows:repeat(2,220px);
    gap:18px;
  }
  .lg-page .lcard {
    border-radius:var(--radius);
    overflow:hidden;
    position:relative;
    box-shadow:var(--shadow-soft);
  }
  .lg-page .lcard:nth-child(1) {grid-column:span 2; grid-row:span 2;}
  .lg-page .lcard:nth-child(4) {grid-column:span 2;}
  .lg-page .lcard img {transition:transform 6s ease;}
  .lg-page .lcard:hover img {transform:scale(1.1);}
  .lg-page .lcard .lcaption {
    position:absolute;
    bottom:0; left:0; right:0;
    padding:22px;
    background:linear-gradient(180deg, transparent, rgba(26,37,64,0.85));
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-weight:600;
    font-size:15px;
    letter-spacing:0.5px;
  }

  /* ===== WHY LANGMA ===== */
  .lg-page .why-langma {background:var(--bg);}
  .lg-page .langma-grid {
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:30px;
  }
  .lg-page .lgcard {
    background:var(--white);
    border-radius:var(--radius);
    padding:40px 32px;
    box-shadow:var(--shadow-soft);
    border-top:3px solid var(--gold);
    transition:transform 0.3s ease;
  }
  .lg-page .lgcard:hover {transform:translateY(-6px);}
  .lg-page .lgcard .lgnum {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:42px;
    font-weight:700;
    color:rgba(26,37,64,0.08);
    margin-bottom:6px;
  }
  .lg-page .lgcard h4 {font-size:19px; margin-bottom:12px;}
  .lg-page .lgcard p {color:var(--muted); font-size:15px;}

  /* ===== FAQ ===== */
  .lg-page .faq {background:var(--white);}
  .lg-page .faq-list {max-width:820px; margin:0 auto;}
  .lg-page .faq-item {
    border-bottom:1px solid rgba(26,37,64,0.1);
  }
  .lg-page .faq-question {
    width:100%;
    text-align:left;
    background:none;
    border:none;
    padding:26px 0;
    display:flex;
    justify-content:space-between;
    align-items:center;
    cursor:pointer;
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:17px;
    font-weight:600;
    color:var(--primary);
  }
  .lg-page .faq-question .plus {
    font-size:22px;
    color:var(--gold);
    transition:transform 0.3s ease;
    flex-shrink:0;
    margin-left:20px;
  }
  .lg-page .faq-item.active .faq-question .plus {transform:rotate(45deg);}
  .lg-page .faq-answer {
    max-height:0;
    overflow:hidden;
    transition:max-height 0.35s ease;
  }
  .lg-page .faq-answer-inner {
    padding-bottom:26px;
    color:var(--muted);
    font-size:15px;
    max-width:680px;
  }

  /* ===== LEAD FORM ===== */
  .lg-page .lead {
    background:var(--primary);
    color:var(--white);
    position:relative;
    overflow:hidden;
  }
  .lg-page .lead::after {
    content:'';
    position:absolute;
    bottom:-250px; left:-150px;
    width:500px; height:500px;
    background:radial-gradient(circle, rgba(47,199,161,0.15), transparent 70%);
    border-radius:50%;
  }
  .lg-page .lead-grid {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:70px;
    align-items:center;
    position:relative;
    z-index:1;
  }
  .lg-page .lead-left h2 {color:var(--white); font-size:clamp(28px,4vw,40px); margin-bottom:20px; line-height:1.25;}
  .lg-page .lead-left p {color:rgba(255,255,255,0.7); font-size:16px; margin-bottom:30px;}
  .lg-page .lead-points {list-style:none; display:flex; flex-direction:column; gap:14px;}
  .lg-page .lead-points li {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:14px;
    color:rgba(255,255,255,0.85);
    display:flex;
    align-items:center;
    gap:12px;
  }
  .lg-page .lead-points li::before {
    content:'';
    width:8px; height:8px;
    background:var(--gold);
    border-radius:50%;
    flex-shrink:0;
  }
  .lg-page .lead-form {
    background:var(--white);
    border-radius:var(--radius);
    padding:44px;
    box-shadow:var(--shadow-strong);
  }
  .lg-page .lead-form h3 {font-size:22px; margin-bottom:8px; color:var(--primary);}
  .lg-page .lead-form .sub {color:var(--muted); font-size:14px; margin-bottom:28px;}
  .lg-page .field {margin-bottom:20px;}
  .lg-page .field label {
    display:block;
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:12px;
    text-transform:uppercase;
    letter-spacing:1.5px;
    color:var(--muted);
    margin-bottom:8px;
  }
  .lg-page .field input, .lg-page .field select {
    width:100%;
    padding:14px 16px;
    border:1px solid rgba(26,37,64,0.15);
    border-radius:8px;
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:15px;
    color:var(--text);
    background:var(--bg);
    transition:border-color 0.25s ease;
  }
  .lg-page .field input:focus, .lg-page .field select:focus {
    outline:none;
    border-color:var(--gold);
  }
  .lg-page .field-row {display:grid; grid-template-columns:1fr 1fr; gap:18px;}
  .lg-page .lead-submit {
    width:100%;
    background:var(--gold);
    color:var(--primary);
    border:none;
    padding:18px;
    border-radius:8px;
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-weight:700;
    font-size:14px;
    letter-spacing:1.5px;
    text-transform:uppercase;
    cursor:pointer;
    transition:background 0.25s ease, transform 0.25s ease;
  }
  .lg-page .lead-submit:hover {background:var(--soft-gold); transform:translateY(-2px);}
  .lg-page .lead-disclaimer {
    margin-top:16px;
    font-size:12px;
    color:var(--muted);
    text-align:center;
  }

  /* ===== SCHEDULE OFFICE VISIT ===== */
  .lg-page .office-visit {background:var(--bg);}
  .lg-page .ov-grid {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:70px;
    align-items:center;
  }
  .lg-page .ov-left p {color:var(--muted); font-size:16px; margin-bottom:30px; max-width:480px;}
  .lg-page .ov-points {list-style:none; display:flex; flex-direction:column; gap:14px;}
  .lg-page .ov-points li {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:14px;
    color:var(--text);
    display:flex;
    align-items:center;
    gap:12px;
  }
  .lg-page .ov-points li::before {
    content:'';
    width:8px; height:8px;
    background:var(--gold);
    border-radius:50%;
    flex-shrink:0;
  }
  .lg-page .ov-form {
    background:var(--white);
    border-radius:var(--radius);
    padding:44px;
    box-shadow:var(--shadow-soft);
    border:1px solid rgba(26,37,64,0.04);
    transition:box-shadow 0.3s ease;
  }
  .lg-page .ov-form:hover {box-shadow:var(--shadow-strong);}
  .lg-page .ov-form h3 {font-size:22px; margin-bottom:8px; color:var(--primary);}
  .lg-page .ov-form .sub {color:var(--muted); font-size:14px; margin-bottom:28px;}
  .lg-page .ov-submit {
    width:100%;
    background:var(--gold);
    color:var(--primary);
    border:none;
    padding:18px;
    border-radius:8px;
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-weight:700;
    font-size:14px;
    letter-spacing:1.5px;
    text-transform:uppercase;
    cursor:pointer;
    transition:background 0.25s ease, transform 0.25s ease;
  }
  .lg-page .ov-submit:hover {background:var(--soft-gold); transform:translateY(-2px);}
  .lg-page .ov-success {
    margin-top:18px;
    padding:16px 18px;
    border-radius:8px;
    background:rgba(47,199,161,0.12);
    border:1px solid rgba(47,199,161,0.35);
    color:var(--primary);
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:14px;
    text-align:center;
    display:none;
  }
  .lg-page .ov-success.show {display:block;}

  @media (max-width: 1024px) {
    .lg-page .ov-grid {grid-template-columns:1fr; gap:40px;}
  }

  /* ===== FOOTER ===== */
  .lg-page footer {
    background:var(--deep-navy);
    color:rgba(255,255,255,0.6);
    padding:70px 0 30px;
  }
  .lg-page .footer-grid {
    display:grid;
    grid-template-columns:1.6fr 1fr 1fr 1fr;
    gap:50px;
    margin-bottom:50px;
  }
  .lg-page .footer-logo {
    font-family:'Helvetica Neue', Arial, sans-serif;
    font-size:22px;
    font-weight:700;
    color:var(--white);
    letter-spacing:2px;
    margin-bottom:18px;
  }
  .lg-page .footer-logo span {color:var(--gold);}
  .lg-page .footer-grid p {font-size:14px; line-height:1.8; max-width:320px;}
  .lg-page .footer-col h5 {
    font-family:'Helvetica Neue', Arial, sans-serif;
    color:var(--white);
    font-size:13px;
    text-transform:uppercase;
    letter-spacing:2px;
    margin-bottom:22px;
  }
  .lg-page .footer-col ul {list-style:none; display:flex; flex-direction:column; gap:12px;}
  .lg-page .footer-col a {
    font-size:14px;
    transition:color 0.25s ease;
  }
  .lg-page .footer-col a:hover {color:var(--gold);}
  .lg-page .footer-bottom {
    border-top:1px solid rgba(255,255,255,0.08);
    padding-top:28px;
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
    gap:14px;
    font-size:13px;
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 1024px){
    .lg-page .trust-grid {grid-template-columns:repeat(2,1fr); gap:30px;}
    .lg-page .why-grid {grid-template-columns:1fr; gap:40px;}
    .lg-page .why-image {height:380px;}
    .lg-page .programme-cards {grid-template-columns:1fr;}
    .lg-page .benefits-grid {grid-template-columns:repeat(2,1fr);}
    .lg-page .family-grid {grid-template-columns:repeat(2,1fr);}
    .lg-page .lifestyle-grid {grid-template-columns:repeat(2,1fr); grid-template-rows:repeat(3,200px);}
    .lg-page .lcard:nth-child(1) {grid-column:span 2; grid-row:span 1;}
    .lg-page .lcard:nth-child(4) {grid-column:span 1;}
    .lg-page .langma-grid {grid-template-columns:1fr;}
    .lg-page .lead-grid {grid-template-columns:1fr; gap:40px;}
    .lg-page .footer-grid {grid-template-columns:1fr 1fr; gap:36px;}
    .lg-page .inv-row {grid-template-columns:1.3fr 1fr; padding:22px 24px;}
    .lg-page .inv-row .value:nth-child(3) {display:none;}
    .lg-page .inv-row.head .value:nth-child(3) {display:none;}
  }

  @media (max-width: 768px){
    .lg-page nav, .lg-page .header-cta {display:none;}
    .lg-page section {padding:64px 0;}
    .lg-page .hero h1 {font-size:34px;}
    .lg-page .footer-grid {grid-template-columns:1fr;}
    .lg-page .inv-row {grid-template-columns:1fr; gap:8px; text-align:left;}
    .lg-page .inv-row.head {display:none;}
    .lg-page .inv-row .value::before {
      content: attr(data-label) ': ';
      font-family:'Helvetica Neue', Arial, sans-serif;
      font-size:12px;
      text-transform:uppercase;
      color:var(--gold);
      letter-spacing:1px;
    }
  }
      `}</style>

      <main>

{/* ===== HERO ===== */}
<section className="hero">
  <div className="hero-bg" aria-hidden="true"></div>
  <div className="container">
    <div className="hero-split">
      <div className="hero-content">
        <span className="eyebrow" style={{color: 'var(--soft-gold)'}}>Malta Permanent Residence Programme</span>
        <h1>A Lifetime of Residence Rights in the <em>Heart of the Mediterranean</em></h1>
        <p>Langma International guides discerning families through the Malta Permanent Residence Programme (MPRP) — securing European residence through Malta via a qualifying property commitment and government contribution.</p>
        <div className="hero-ctas">
          <a href="#lead" className="btn btn-primary">Request Eligibility Assessment</a>
          <a href="#programme" className="btn btn-outline">Explore the Programme</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-img-card">
          <img src="https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=1200" alt="Valletta harbour and historic fortifications, Malta" />
          <div className="hero-img-caption">
            <span className="pulse-dot"></span>
            <span>Valletta, Malta</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="hero-scroll-indicator">
    <span>Scroll</span>
    <div className="scroll-line"></div>
  </div>
</section>

{/* ===== TRUST BAR ===== */}
<section className="trust-bar" style={{paddingTop: '54px', paddingBottom: '54px'}}>
  <div className="container trust-grid">
    <div className="trust-item">
      <h3><span className="accent">EU</span></h3>
      <span>European Residence Through Malta</span>
    </div>
    <div className="trust-item">
      <h3>4<span className="accent">Gen</span></h3>
      <span>Multi-Generational Inclusion</span>
    </div>
    <div className="trust-item">
      <h3>6<span className="accent">+ Mo</span></h3>
      <span>Indicative Processing Time</span>
    </div>
    <div className="trust-item">
      <h3><span className="accent">No</span></h3>
      <span>Residency Stay Requirement</span>
    </div>
  </div>
</section>

{/* ===== WHY MALTA ===== */}
<section className="why-malta" id="why-malta">
  <div className="container">
    <div className="why-grid">
      <div className="why-image">
        <img src="https://images.unsplash.com/photo-1591018871985-99e2c4f9c8e3?q=80&w=1200" alt="Valletta skyline, Malta" />
      </div>
      <div>
        <span className="eyebrow">Why Malta</span>
        <h2 style={{fontSize: 'clamp(28px,4vw,40px)', marginBottom: '28px', lineHeight: '1.25'}}>A Stable, Connected and Distinguished European Base</h2>
        <div className="why-points">
          <div className="why-point">
            <div className="why-point-icon">1</div>
            <div>
              <h4>Strategic EU Location</h4>
              <p>Positioned at the crossroads of Europe and North Africa, Malta offers exceptional connectivity for business, education and travel across the continent.</p>
            </div>
          </div>
          <div className="why-point">
            <div className="why-point-icon">2</div>
            <div>
              <h4>Political and Economic Stability</h4>
              <p>As a long-standing EU member state with a resilient economy and English as an official language, Malta provides a secure environment for family wealth planning.</p>
            </div>
          </div>
          <div className="why-point">
            <div className="why-point-icon">3</div>
            <div>
              <h4>Quality of Life</h4>
              <p>Mediterranean climate, internationally accredited healthcare and education, and a refined coastal lifestyle make Malta a genuine second home rather than a paper residence.</p>
            </div>
          </div>
          <div className="why-point">
            <div className="why-point-icon">4</div>
            <div>
              <h4>Established Legal Framework</h4>
              <p>The Malta Permanent Residence Programme operates under clear legislation administered by Malta's residency authority, offering predictability and due process.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ===== DISCOVER MALTA ===== */}
<section className="discover-malta" id="about-malta" style={{background: 'var(--white)', padding: '96px 0'}}>
  <div className="container">

    <div className="section-head" style={{textAlign: 'center', maxWidth: '680px', margin: '0 auto 64px'}}>
      <span className="eyebrow">Discover Malta</span>
      <h2 style={{fontSize: 'clamp(28px,4vw,40px)', marginBottom: '20px', lineHeight: '1.25'}}>Europe's Mediterranean Gem</h2>
      <p style={{color: 'var(--muted)', fontSize: '17px', lineHeight: '1.7'}}>A sovereign island nation at the centre of the Mediterranean, Malta combines the stability of a long-standing EU member state with the warmth of a genuinely welcoming society — making it one of Europe's most distinguished addresses for globally mobile families.</p>
    </div>

    <div className="dm-cards">
      <div className="dm-card">
        <div className="dm-icon">🌍</div>
        <h4>Strategic Mediterranean Location</h4>
        <p>Positioned at the crossroads of three continents, Malta offers direct air connections to major European, Middle Eastern and African cities — placing the world within comfortable reach.</p>
      </div>

      <div className="dm-card">
        <div className="dm-icon">🇪🇺</div>
        <h4>Full European Union Membership</h4>
        <p>Malta has been an EU and Schengen Area member since 2004, operating under EU law and maintaining the shared institutions, trade frameworks and protections that come with full membership.</p>
      </div>

      <div className="dm-card">
        <div className="dm-icon">🗣️</div>
        <h4>English-Speaking Society</h4>
        <p>English is an official language, used daily across government, commerce, legal practice and education. For internationally mobile families, Malta removes linguistic barriers from the outset.</p>
      </div>

      <div className="dm-card">
        <div className="dm-icon">🏥</div>
        <h4>Quality Healthcare &amp; Education</h4>
        <p>Malta maintains internationally accredited public and private healthcare facilities, alongside reputable schools and a state university with deep ties to EU academic networks.</p>
      </div>

      <div className="dm-card">
        <div className="dm-icon">🏦</div>
        <h4>Established Banking &amp; Business Hub</h4>
        <p>Malta hosts a mature financial services sector operating under EU regulatory frameworks, with a well-regarded international banking infrastructure and a business-oriented legislative environment.</p>
      </div>

      <div className="dm-card">
        <div className="dm-icon">☀️</div>
        <h4>Mediterranean Climate &amp; Heritage</h4>
        <p>Over 300 days of sunshine a year, a UNESCO World Heritage capital in Valletta, and millennia of layered history make Malta a richly rewarding place to live, visit and invest.</p>
      </div>
    </div>

    <div className="dm-facts-strip">
      <div className="dm-fact">
        <div className="dm-label">Capital</div>
        <div className="dm-value">Valletta</div>
      </div>
      <div className="dm-divider"></div>
      <div className="dm-fact">
        <div className="dm-label">Population</div>
        <div className="dm-value">~540,000+</div>
      </div>
      <div className="dm-divider"></div>
      <div className="dm-fact">
        <div className="dm-label">Languages</div>
        <div className="dm-value">Maltese &amp; English</div>
      </div>
      <div className="dm-divider"></div>
      <div className="dm-fact">
        <div className="dm-label">Currency</div>
        <div className="dm-value">Euro (€)</div>
      </div>
      <div className="dm-divider"></div>
      <div className="dm-fact">
        <div className="dm-label">EU Member</div>
        <div className="dm-value">Since 2004</div>
      </div>
      <div className="dm-divider"></div>
      <div className="dm-fact">
        <div className="dm-label">Zone</div>
        <div className="dm-value">Schengen Area</div>
      </div>
    </div>

  </div>
</section>

{/* ===== PROGRAMME OVERVIEW ===== */}
<section className="programme" id="programme">
  <div className="container">
    <div className="section-head">
      <span className="eyebrow">Programme Overview</span>
      <h2>The Malta Permanent Residence Programme (MPRP)</h2>
      <p>A government-regulated route to indefinite residence rights in Malta, designed for financially independent applicants and their families.</p>
    </div>
    <div className="programme-cards">
      <div className="pcard">
        <span className="pnum">Status Obtained</span>
        <h3>Permanent Residence Permit</h3>
        <p>Successful applicants receive a Maltese permanent residence card, granting the right to reside in Malta indefinitely, with no requirement to relocate full-time.</p>
      </div>
      <div className="pcard">
        <span className="pnum">Core Requirement</span>
        <h3>Qualifying Property Holding</h3>
        <p>Applicants must secure a qualifying residential property in Malta, either through purchase or long-term rental, meeting government-defined value thresholds.</p>
      </div>
      <div className="pcard">
        <span className="pnum">Government Contribution</span>
        <h3>Non-Refundable Contribution</h3>
        <p>A contribution is made to the Government of Malta, with the amount determined by the applicant's chosen property route — purchase or rental.</p>
      </div>
      <div className="pcard">
        <span className="pnum">Due Diligence</span>
        <h3>Multi-Tier Background Checks</h3>
        <p>All applicants over the age of 18 undergo a rigorous due diligence process administered by Malta's residency authority, ensuring the integrity of the programme.</p>
      </div>
      <div className="pcard">
        <span className="pnum">Philanthropic Element</span>
        <h3>Contribution to Local NGO</h3>
        <p>A modest donation to a registered Maltese non-governmental organisation forms part of the overall application, reinforcing the programme's community dimension.</p>
      </div>
      <div className="pcard">
        <span className="pnum">Renewal</span>
        <h3>Ongoing Compliance</h3>
        <p>The permit remains valid on a permanent basis, subject to the applicant maintaining the qualifying property and meeting periodic verification requirements.</p>
      </div>
    </div>
  </div>
</section>

{/* ===== BENEFITS ===== */}
<section className="benefits">
  <div className="container">
    <div className="section-head">
      <span className="eyebrow">Benefits</span>
      <h2>Why Families Choose Malta Permanent Residence</h2>
      <p>A single application that delivers long-term security, mobility and lifestyle advantages across generations.</p>
    </div>
    <div className="benefits-grid">
      <div className="bcard">
        <div className="bicon">&#9670;</div>
        <h4>Indefinite Residence Rights</h4>
        <p>Permanent residence status in Malta with no renewal of the underlying right, subject to compliance with programme conditions.</p>
      </div>
      <div className="bcard">
        <div className="bicon">&#9670;</div>
        <h4>No Minimum Stay</h4>
        <p>There is no obligation to reside in Malta for a set number of days each year, offering genuine flexibility for global families.</p>
      </div>
      <div className="bcard">
        <div className="bicon">&#9670;</div>
        <h4>Family-Inclusive</h4>
        <p>Spouses, dependent children, and qualifying parents and grandparents of the main applicant and spouse can be included.</p>
      </div>
      <div className="bcard">
        <div className="bicon">&#9670;</div>
        <h4>European Residence Through Malta</h4>
        <p>Permit holders gain residence status in Malta, with Schengen travel benefits subject to applicable Schengen regulations.</p>
      </div>
      <div className="bcard">
        <div className="bicon">&#9670;</div>
        <h4>Access to Education and Healthcare</h4>
        <p>Residents gain access to Malta's internationally regarded education institutions and healthcare system.</p>
      </div>
      <div className="bcard">
        <div className="bicon">&#9670;</div>
        <h4>Asset Diversification</h4>
        <p>The qualifying property requirement allows families to hold a tangible European real estate asset alongside their residence status.</p>
      </div>
      <div className="bcard">
        <div className="bicon">&#9670;</div>
        <h4>Path to Long-Term Planning</h4>
        <p>Permanent residence provides a stable foundation for long-term family relocation, succession and wealth structuring strategies.</p>
      </div>
      <div className="bcard">
        <div className="bicon">&#9670;</div>
        <h4>Reputable Jurisdiction</h4>
        <p>Malta's EU membership and regulated framework offer a level of legal certainty valued by international families and advisors.</p>
      </div>
    </div>
  </div>
</section>

{/* ===== INVESTMENT REQUIREMENTS ===== */}
<section className="investment" id="investment">
  <div className="container">
    <div className="section-head">
      <span className="eyebrow">Investment Requirements</span>
      <h2>Structuring Your Investment</h2>
      <p>The MPRP combines a property commitment with a government contribution and associated administrative fees. The structure below reflects the published programme requirements.</p>
    </div>

    <div className="inv-table-wrap">
      <div className="inv-row head">
        <div>Requirement</div>
        <div>Property Purchase Route</div>
        <div>Property Rental Route</div>
      </div>
      <div className="inv-row">
        <div className="label">Qualifying Property
          <small>Minimum property value or annual rental requirement</small>
        </div>
        <div className="value" data-label="Purchase Route"><span className="gold-tag">From €375,000</span></div>
        <div className="value" data-label="Rental Route"><span className="gold-tag">From €14,000 / year</span></div>
      </div>
      <div className="inv-row">
        <div className="label">Government Contribution
          <small>Non-refundable, paid to the Government of Malta</small>
        </div>
        <div className="value" data-label="Purchase Route"><span className="gold-tag">€37,000</span></div>
        <div className="value" data-label="Rental Route"><span className="gold-tag">€37,000</span></div>
      </div>
      <div className="inv-row">
        <div className="label">Government Administrative Fee
          <small>€60,000 for the main applicant, plus applicable dependant fees where required under current MPRP regulations</small>
        </div>
        <div className="value" data-label="Purchase Route"><span className="gold-tag">€60,000</span></div>
        <div className="value" data-label="Rental Route"><span className="gold-tag">€60,000</span></div>
      </div>
      <div className="inv-row">
        <div className="label">Donation to Registered NGO
          <small>Philanthropic contribution forming part of the application</small>
        </div>
        <div className="value" data-label="Purchase Route"><span className="gold-tag">€2,000</span></div>
        <div className="value" data-label="Rental Route"><span className="gold-tag">€2,000</span></div>
      </div>
      <div className="inv-row">
        <div className="label">Due Diligence Fees
          <small>Applicable per applicant: main applicant / adult dependants / minor dependants</small>
        </div>
        <div className="value" data-label="Purchase Route"><span className="gold-tag">€15,000 / €10,000 / €5,000</span></div>
        <div className="value" data-label="Rental Route"><span className="gold-tag">€15,000 / €10,000 / €5,000</span></div>
      </div>
    </div>

    <p className="inv-note">Figures reflect current published Malta Permanent Residence Programme requirements and are subject to periodic government revision. Langma International provides a tailored cost breakdown during your eligibility assessment.</p>
  </div>
</section>

{/* ===== FAMILY INCLUSION ===== */}
<section className="family">
  <div className="container">
    <div className="section-head">
      <span className="eyebrow">Family Inclusion</span>
      <h2>One Application, A Future for Your Whole Family</h2>
      <p>The MPRP recognises that residence planning is rarely an individual decision — it allows multiple generations to be included under a single application.</p>
    </div>
    <div className="family-grid">
      <div className="fcard">
        <div className="ficon">&#9826;</div>
        <h4>Main Applicant</h4>
        <p>The principal applicant who meets the financial and property requirements of the programme.</p>
      </div>
      <div className="fcard">
        <div className="ficon">&#9826;</div>
        <h4>Spouse or Partner</h4>
        <p>A spouse, or a person in a long-term relationship equivalent to marriage, may be included as a dependant.</p>
      </div>
      <div className="fcard">
        <div className="ficon">&#9826;</div>
        <h4>Children</h4>
        <p>Dependent unmarried children, including those financially dependent and meeting programme age requirements.</p>
      </div>
      <div className="fcard">
        <div className="ficon">&#9826;</div>
        <h4>Parents &amp; Grandparents</h4>
        <p>Dependent parents and grandparents subject to programme criteria.</p>
      </div>
    </div>
  </div>
</section>

{/* ===== APPLICATION PROCESS / TIMELINE ===== */}
<section className="process" id="process">
  <div className="container">
    <div className="section-head">
      <span className="eyebrow">Application Process</span>
      <h2>Your Journey to Maltese Permanent Residence</h2>
      <p>Langma International manages each stage on your behalf, coordinating with licensed agents, due diligence authorities and government bodies.</p>
    </div>
    <div className="timeline">
      <div className="tl-item">
        <div className="tl-dot">01</div>
        <div className="tl-content">
          <h4>Eligibility Assessment &amp; Engagement</h4>
          <p>Langma International conducts a confidential review of your circumstances and confirms eligibility before any formal engagement begins.</p>
          <span className="tl-time">Week 1</span>
        </div>
      </div>
      <div className="tl-item">
        <div className="tl-dot">02</div>
        <div className="tl-content">
          <h4>Documentation &amp; Due Diligence Submission</h4>
          <p>Personal, financial and source-of-funds documentation is compiled and submitted through a licensed agent to Malta's residency authority.</p>
          <span className="tl-time">Weeks 2–6</span>
        </div>
      </div>
      <div className="tl-item">
        <div className="tl-dot">03</div>
        <div className="tl-content">
          <h4>Letter of Approval in Principle</h4>
          <p>Once due diligence checks are satisfactorily completed, an approval in principle is issued, confirming the application may proceed.</p>
          <span className="tl-time">Months 2–5</span>
        </div>
      </div>
      <div className="tl-item">
        <div className="tl-dot">04</div>
        <div className="tl-content">
          <h4>Property Acquisition &amp; Contributions</h4>
          <p>The applicant finalises the qualifying property (purchase or rental) and settles the government contribution, administrative fee and NGO donation.</p>
          <span className="tl-time">Months 3–6</span>
        </div>
      </div>
      <div className="tl-item">
        <div className="tl-dot">05</div>
        <div className="tl-content">
          <h4>Permit Issuance</h4>
          <p>Upon verification of all requirements, the Malta Permanent Residence Permit is issued to the main applicant and included dependants.</p>
          <span className="tl-time">6+ Months</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ===== LIFESTYLE ===== */}
<section className="lifestyle">
  <div className="container">
    <div className="section-head">
      <span className="eyebrow">Life in Malta</span>
      <h2>Beyond Residency — A Way of Life</h2>
      <p>Permanent residence in Malta opens the door to a refined Mediterranean lifestyle, blending history, leisure and modern infrastructure.</p>
    </div>
    <div className="lifestyle-grid">
      <div className="lcard">
        <img src="https://images.unsplash.com/photo-1593238739364-66f8d3c5f7f5?q=80&w=1200" alt="Mediterranean coastline and historic architecture in Malta" />
        <div className="lcaption">Historic Architecture &amp; Mediterranean Coastline</div>
      </div>
      <div className="lcard">
        <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800" alt="Family enjoying lifestyle in Malta" />
        <div className="lcaption">Family Living</div>
      </div>
      <div className="lcard">
        <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" alt="International education in Malta" />
        <div className="lcaption">International Education</div>
      </div>
      <div className="lcard">
        <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200" alt="Luxury yacht marina in Malta" />
        <div className="lcaption">Yacht Marinas &amp; Leisure</div>
      </div>
      <div className="lcard">
        <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800" alt="Healthcare facilities in Malta" />
        <div className="lcaption">Healthcare Access</div>
      </div>
    </div>
  </div>
</section>

{/* ===== WHY LANGMA ===== */}
<section className="why-langma">
  <div className="container">
    <div className="section-head">
      <span className="eyebrow">Why Langma International</span>
      <h2>A Discreet, Senior-Led Advisory Partner</h2>
      <p>We work exclusively with a select number of families each year, ensuring every application receives the attention it deserves.</p>
    </div>
    <div className="langma-grid">
      <div className="lgcard">
        <div className="lgnum">01</div>
        <h4>Independent Guidance</h4>
        <p>Langma International provides impartial, fact-based advice — structuring your application around your family's specific objectives rather than a one-size-fits-all approach.</p>
      </div>
      <div className="lgcard">
        <div className="lgnum">02</div>
        <h4>Licensed Local Partners</h4>
        <p>We coordinate with Malta-licensed agents and legal professionals to ensure full compliance with the programme's regulatory framework from start to finish.</p>
      </div>
      <div className="lgcard">
        <div className="lgnum">03</div>
        <h4>Confidential, End-to-End Management</h4>
        <p>From initial assessment through to permit issuance, a dedicated advisor manages documentation, timelines and communication with discretion.</p>
      </div>
    </div>
  </div>
</section>

{/* ===== FAQ ===== */}
<section className="faq" id="faq">
  <div className="container">
    <div className="section-head">
      <span className="eyebrow">Frequently Asked Questions</span>
      <h2>Common Questions About Malta Permanent Residence</h2>
    </div>
    <div className="faq-list">

      <div className={`faq-item ${openFaq===0 ? "active" : ""}`}>
        <button className="faq-question" onClick={() => toggleFaq(0)}>
          Who is eligible for the Malta Permanent Residence Programme?
          <span className="plus">+</span>
        </button>
        <div className="faq-answer" style={{maxHeight: openFaq===0 ? "400px" : "0"}}>
          <div className="faq-answer-inner">
            Applicants must be non-EU, non-EEA and non-Swiss nationals, at least 18 years old, of good standing, with stable and regular financial resources, and capable of fulfilling the programme's investment, contribution and due diligence requirements. Applicants must demonstrate capital assets of at least €500,000, including €150,000 in financial assets, or alternatively €650,000 including €75,000 in financial assets.
          </div>
        </div>
      </div>

      <div className={`faq-item ${openFaq===1 ? "active" : ""}`}>
        <button className="faq-question" onClick={() => toggleFaq(1)}>
          Is the property required to be purchased, or can it be rented?
          <span className="plus">+</span>
        </button>
        <div className="faq-answer" style={{maxHeight: openFaq===1 ? "400px" : "0"}}>
          <div className="faq-answer-inner">
            Both routes are permitted. Applicants may either purchase a qualifying property meeting the minimum value threshold or enter into a long-term rental agreement meeting the minimum annual rent threshold.
          </div>
        </div>
      </div>

      <div className={`faq-item ${openFaq===2 ? "active" : ""}`}>
        <button className="faq-question" onClick={() => toggleFaq(2)}>
          How long does the application process take?
          <span className="plus">+</span>
        </button>
        <div className="faq-answer" style={{maxHeight: openFaq===2 ? "400px" : "0"}}>
          <div className="faq-answer-inner">
            Processing times vary depending on individual circumstances and the completeness of documentation, but applicants can typically expect a timeframe of approximately 6 months or more from submission to permit issuance, depending on due diligence and application complexity.
          </div>
        </div>
      </div>

      <div className={`faq-item ${openFaq===3 ? "active" : ""}`}>
        <button className="faq-question" onClick={() => toggleFaq(3)}>
          Is there a requirement to live in Malta?
          <span className="plus">+</span>
        </button>
        <div className="faq-answer" style={{maxHeight: openFaq===3 ? "400px" : "0"}}>
          <div className="faq-answer-inner">
            There is no minimum stay requirement under the MPRP. However, the qualifying property must be retained for as long as the permit holder wishes to maintain their permanent residence status.
          </div>
        </div>
      </div>

      <div className={`faq-item ${openFaq===4 ? "active" : ""}`}>
        <button className="faq-question" onClick={() => toggleFaq(4)}>
          Which family members can be included in the application?
          <span className="plus">+</span>
        </button>
        <div className="faq-answer" style={{maxHeight: openFaq===4 ? "400px" : "0"}}>
          <div className="faq-answer-inner">
            The main applicant may include a spouse or long-term partner, dependent children up to a defined age, and dependent parents and grandparents of either the applicant or spouse, subject to meeting dependency criteria.
          </div>
        </div>
      </div>

      <div className={`faq-item ${openFaq===5 ? "active" : ""}`}>
        <button className="faq-question" onClick={() => toggleFaq(5)}>
          Does the programme lead to citizenship?
          <span className="plus">+</span>
        </button>
        <div className="faq-answer" style={{maxHeight: openFaq===5 ? "400px" : "0"}}>
          <div className="faq-answer-inner">
            The MPRP grants permanent residence rights rather than citizenship. Citizenship in Malta is governed by separate naturalisation provisions and is not an automatic outcome of this programme.
          </div>
        </div>
      </div>

      <div className={`faq-item ${openFaq===6 ? "active" : ""}`}>
        <button className="faq-question" onClick={() => toggleFaq(6)}>
          What due diligence checks are involved?
          <span className="plus">+</span>
        </button>
        <div className="faq-answer" style={{maxHeight: openFaq===6 ? "400px" : "0"}}>
          <div className="faq-answer-inner">
            All applicants aged 18 and above undergo background checks covering identity, source of funds, and good standing, conducted by Malta's residency authority in coordination with international due diligence providers.
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

{/* ===== LEAD FORM ===== */}
<section className="lead" id="lead">
  <div className="container">
    <div className="lead-grid">
      <div className="lead-left">
        <span className="eyebrow" style={{color: 'var(--soft-gold)'}}>Begin Your Application</span>
        <h2>Speak With a Senior Advisor</h2>
        <p>Arrange a confidential consultation with Langma International to assess your eligibility for the Malta Permanent Residence Programme and receive a tailored investment breakdown.</p>
        <ul className="lead-points">
          <li>Complimentary, confidential eligibility assessment</li>
          <li>Tailored investment and cost breakdown for your family</li>
          <li>Coordination with licensed local partners throughout the process</li>
          <li>Ongoing support from application to permit issuance</li>
        </ul>
      </div>
      <div className="lead-form">
        <h3>Request Your Eligibility Assessment</h3>
        <p className="sub">A member of our advisory team will respond within one business day.</p>
        <form onSubmit={handleLeadSubmit} noValidate>
          <div className="field-row">
            <div className="field">
              <label htmlFor="fname">First Name</label>
              <input type="text" id="fname" required />
            </div>
            <div className="field">
              <label htmlFor="lname">Last Name</label>
              <input type="text" id="lname" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" required />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" />
            </div>
            <div className="field">
              <label htmlFor="country">Country of Residence</label>
              <input type="text" id="country" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="interest">Primary Interest</label>
            <select id="interest">
              <option>Malta Permanent Residence Programme</option>
              <option>Property Purchase Route</option>
              <option>Property Rental Route</option>
              <option>General Enquiry</option>
            </select>
          </div>
          <button type="submit" className="lead-submit" disabled={leadLoading}>{leadLoading ? 'Sending...' : 'Request Eligibility Assessment'}</button>
          <p className="lead-disclaimer">By submitting this form, you consent to Langma International contacting you regarding your enquiry. Your information is held in strict confidence.</p>
          {(leadMsg || leadSubmitted) && (
            <div className={`ov-success show${leadSuccess ? '' : ''}`} style={!leadSuccess && leadMsg ? {background:'rgba(220,38,38,.08)',border:'1px solid #ef4444',color:'#b91c1c'} : undefined}>
              {leadMsg || 'Thank you — an advisor will be in touch shortly.'}
            </div>
          )}
        </form>
      </div>
    </div>
  </div>
</section>

{/* ===== SCHEDULE OFFICE VISIT ===== */}
<section className="office-visit" id="office-visit">
  <div className="container">
    <div className="ov-grid">
      <div className="ov-left">
        <span className="eyebrow">Visit Us</span>
        <h2 style={{fontSize: 'clamp(28px,4vw,40px)', marginBottom: '18px', lineHeight: '1.25'}}>Schedule Your Office Visit</h2>
        <p>Book a personalized consultation with our experts at Langma International and plan your global journey with confidence.</p>
        <ul className="ov-points">
          <li>One-on-one consultation with a senior advisor</li>
          <li>Personalised guidance on languages, study abroad, visa and PR programmes</li>
          <li>Flexible scheduling at your convenience</li>
          <li>Confidential, no-obligation discussion</li>
        </ul>
      </div>
      <div className="ov-form">
        <h3>Confirm Your Visit Request</h3>
        <p className="sub">Fill in your details and our team will reach out to confirm your appointment.</p>
        <form id="office-visit-form" onSubmit={handleOfficeSubmit} noValidate>
          <div className="field">
            <label htmlFor="ov-name">Full Name</label>
            <input type="text" id="ov-name" required />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="ov-phone">Phone Number</label>
              <input type="tel" id="ov-phone" placeholder="+ Country Code" required />
            </div>
            <div className="field">
              <label htmlFor="ov-email">Email Address</label>
              <input type="email" id="ov-email" required />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="ov-date">Preferred Date</label>
              <input type="date" id="ov-date" min={new Date().toISOString().split('T')[0]} required />
            </div>
            <div className="field">
              <label htmlFor="ov-time">Preferred Time Slot</label>
              <select id="ov-time" required>
                <option value="">Select a time</option>
                <option>09:00 AM - 10:00 AM</option>
                <option>10:00 AM - 11:00 AM</option>
                <option>11:00 AM - 12:00 PM</option>
                <option>12:00 PM - 01:00 PM</option>
                <option>02:00 PM - 03:00 PM</option>
                <option>03:00 PM - 04:00 PM</option>
                <option>04:00 PM - 05:00 PM</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="ov-program">Interested Program</label>
            <select id="ov-program" required>
              <option value="">Select a program</option>
              <option>Languages</option>
              <option>Study Abroad</option>
              <option>Visa Guidance</option>
              <option>PR Programs</option>
              <option>Other</option>
            </select>
          </div>
          <button type="submit" className="ov-submit" disabled={officeLoading}>{officeLoading ? 'Sending...' : 'Confirm Visit Request'}</button>
          {(officeMsg || officeSubmitted) && (
            <div className={`ov-success show${officeSuccess ? '' : ''}`} style={!officeSuccess && officeMsg ? {background:'rgba(220,38,38,.08)',border:'1px solid #ef4444',color:'#b91c1c'} : undefined}>
              {officeMsg || 'Thank you — an advisor will be in touch shortly.'}
            </div>
          )}
        </form>
      </div>
    </div>
  </div>
</section>

      </main>
    </div>
  );
};

export default LangmaMaltaPermanentResidenceProgrammePage;