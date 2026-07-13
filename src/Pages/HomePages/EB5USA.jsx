import React, { useState, useEffect } from 'react';
import useResidencyLeadForms from '../../hooks/useResidencyLeadForms';

const SERVICE = 'USA EB-5 Immigrant Investor Pathway';

const LangmaEB5USAPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'EB-5 Consultation' });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.lg-page .reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="lg-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
  .lg-page {
    --navy:#296166;
    --navy-deep:#1A2540;
    --navy-mid:#1B2B28;
    --gold:#2FC7A1;
    --gold-soft:#6FE0C6;
    --gold-deep:#2FC7A1;
    --ivory:#F5F8F6;
    --beige:#E9F1EE;
    --charcoal:#1B2B28;
    --muted:#296166;
    --line:rgba(47,199,161,0.30);
    --radius:4px;
    --shadow-soft:0 18px 50px rgba(26,37,64,0.10);
    --shadow-strong:0 30px 70px rgba(26,37,64,0.22);
    --ease:cubic-bezier(.22,.61,.36,1);
  }

  .lg-page * {margin:0;padding:0;box-sizing:border-box;}
  .lg-page html {scroll-behavior:smooth;}
  .lg-page body {
    font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
    color:var(--charcoal);
    background:var(--ivory);
    line-height:1.7;
    font-weight:400;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  .lg-page h1, .lg-page h2, .lg-page h3, .lg-page h4 {
    font-family:'Cormorant Garamond',Georgia,serif;
    font-weight:600;
    color:var(--navy);
    line-height:1.12;
    letter-spacing:0.2px;
  }
  .lg-page p {font-weight:400;}
  .lg-page a {color:inherit;text-decoration:none;}
  .lg-page img {display:block;width:100%;height:100%;object-fit:cover;}
  .lg-page .container {max-width:1200px;margin:0 auto;padding:0 30px;}
  .lg-page .block {padding:108px 0;}
  .lg-page .eyebrow {
    font-family:'Inter',sans-serif;
    text-transform:uppercase;
    letter-spacing:3.5px;
    font-size:11.5px;
    color:var(--gold-deep);
    font-weight:600;
    margin-bottom:18px;
    display:flex;
    align-items:center;
    gap:12px;
  }
  .lg-page .eyebrow::before {content:"";width:34px;height:1px;background:var(--gold);display:inline-block;}
  .lg-page .eyebrow.center {justify-content:center;}
  .lg-page .section-head {max-width:760px;margin:0 auto 60px;text-align:center;}
  .lg-page .section-head h2 {font-size:clamp(34px,4.6vw,54px);margin-bottom:18px;}
  .lg-page .section-head p {color:var(--muted);font-size:17px;}

  .lg-page .btn {display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;letter-spacing:0.4px;padding:16px 32px;border-radius:var(--radius);cursor:pointer;border:1px solid transparent;transition:all .35s var(--ease);}
  .lg-page .btn-gold {background:var(--gold);color:var(--navy-deep);}
  .lg-page .btn-gold:hover {background:var(--gold-soft);transform:translateY(-2px);box-shadow:0 14px 30px rgba(47,199,161,.32);}
  .lg-page .btn-ghost {background:transparent;color:#1A2540;border:2px solid #2FC7A1;}
  .lg-page .btn-ghost:hover {border-color:var(--gold);color:var(--gold-soft);}
  .lg-page .btn-navy {background:var(--navy);color:var(--ivory);}
  .lg-page .btn-navy:hover {background:var(--navy-mid);transform:translateY(-2px);}

  /* ===== STAR SIGNATURE DIVIDER ===== */
  .lg-page .starline {
    height:18px;width:100%;
    background:
      radial-gradient(circle at 10px 9px, var(--gold) 0 2px, transparent 2.5px),
      radial-gradient(circle at 0 0, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px),
      radial-gradient(circle at 20px 0, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px),
      radial-gradient(circle at 0 18px, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px),
      radial-gradient(circle at 20px 18px, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px);
    background-size:20px 18px;
    background-repeat:repeat-x;
    background-position:left center;
    background-color:var(--navy);
    display:block;overflow:hidden;opacity:.92;
  }

  /* ===== HEADER ===== */
  .lg-page header {position:fixed;top:0;left:0;right:0;z-index:1000;padding:22px 0;transition:all .4s var(--ease);}
  .lg-page header.scrolled {background:rgba(26,37,64,0.94);backdrop-filter:blur(10px);padding:14px 0;box-shadow:0 6px 30px rgba(0,0,0,.25);}
  .lg-page .nav-wrap {display:flex;align-items:center;justify-content:space-between;}
  .lg-page .brand {display:flex;flex-direction:column;line-height:1;}
  .lg-page .brand .name {font-family:'Cormorant Garamond',serif;font-size:25px;font-weight:600;color:var(--ivory);letter-spacing:1px;}
  .lg-page .brand .tag {font-family:'Inter',sans-serif;font-size:9.5px;letter-spacing:3.5px;text-transform:uppercase;color:var(--gold-soft);margin-top:4px;}
  .lg-page .nav-links {display:flex;align-items:center;gap:34px;}
  .lg-page .nav-links a {font-size:13.5px;font-weight:500;color:rgba(247,250,252,.85);letter-spacing:.3px;transition:color .25s;}
  .lg-page .nav-links a:hover {color:var(--gold-soft);}
  .lg-page .nav-cta {padding:11px 24px;font-size:13px;background:var(--gold);color:var(--navy-deep);border-radius:var(--radius);font-weight:600;transition:all .3s;}
  .lg-page .nav-cta:hover {background:var(--gold-soft);}
  .lg-page .burger {display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;}
  .lg-page .burger span {width:24px;height:2px;background:var(--ivory);display:block;}

  /* ===== HERO ===== */
  .lg-page .hero {position:relative;min-height:auto;display:flex;align-items:center;color:#1B2B28;overflow:hidden;background:#FFFFFF;padding:72px 0 48px;}
  .lg-page .hero::before {content:"";position:absolute;inset:0;background-image:radial-gradient(circle at 20% 50%, rgba(47,199,161,0.07) 0%, transparent 50%),radial-gradient(circle at 80% 20%, rgba(47,199,161,0.05) 0%, transparent 40%);z-index:0;pointer-events:none;}
  .lg-page .hero-bg {display:none;}
  .lg-page .hero-split {position:relative;z-index:2;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;padding-top:0;padding-bottom:0;}
  .lg-page .hero-copy {display:flex;flex-direction:column;}
  .lg-page .hero h1 {font-size:clamp(38px,5vw,66px);color:#1B2B28;margin-bottom:26px;font-weight:600;line-height:1.08;}
  .lg-page .hero h1 em {font-style:italic;color:#4FA3D1;font-weight:500;}
  .lg-page .hero .lead {font-size:17.5px;color:#4C5C58;max-width:560px;margin-bottom:38px;font-weight:300;line-height:1.72;}
  .lg-page .hero-cta {display:flex;gap:16px;flex-wrap:wrap;margin-bottom:48px;}
  .lg-page .hero-badges {display:flex;gap:36px;flex-wrap:wrap;border-top:1px solid #D8E0EC;padding-top:28px;}
  .lg-page .hero-badge .num {font-family:'Cormorant Garamond',serif;font-size:30px;color:#296166;font-weight:600;line-height:1;}
  .lg-page .hero-badge .lbl {font-size:11.5px;letter-spacing:.6px;color:#7E8C88;margin-top:6px;}

  .lg-page .hero-visual {display:flex;align-items:center;justify-content:center;position:relative;}
  .lg-page .hero-img-frame {position:relative;width:100%;max-width:520px;border-radius:12px;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22);}
  .lg-page .hero-img-frame img {display:block;width:100%;height:480px;object-fit:cover;border-radius:12px;transition:transform .9s var(--ease);}
  .lg-page .hero-img-frame:hover img {transform:scale(1.04);}
  .lg-page .hero-img-frame::after {content:"";position:absolute;inset:12px;border:1px solid rgba(47,199,161,.38);border-radius:8px;pointer-events:none;z-index:2;}
  .lg-page .hero-img-frame::before {content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(26,37,64,.42) 0%,transparent 55%);z-index:1;border-radius:12px;pointer-events:none;}
  .lg-page .hero-visual::before {content:"";position:absolute;top:24px;right:-14px;width:100%;max-width:520px;height:100%;border:1px solid rgba(47,199,161,.18);border-radius:12px;pointer-events:none;}
  .lg-page .hero-img-badge {position:absolute;bottom:22px;left:22px;z-index:3;background:rgba(26,37,64,.82);backdrop-filter:blur(8px);border:1px solid rgba(47,199,161,.30);border-radius:6px;padding:10px 16px;display:flex;align-items:center;gap:10px;}
  .lg-page .hero-img-badge .dot-pulse {width:8px;height:8px;border-radius:50%;background:var(--gold);flex-shrink:0;animation:pulse-dot 2s ease infinite;}
  @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.6;transform:scale(.85);}}
  .lg-page .hero-img-badge span {font-size:12px;letter-spacing:.5px;color:rgba(247,250,252,.88);font-weight:500;}

  .lg-page .scroll-hint {position:absolute;bottom:30px;left:50%;transform:translateX(-50%);z-index:2;font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:rgba(247,250,252,.5);display:flex;flex-direction:column;align-items:center;gap:8px;}
  .lg-page .scroll-hint .line {width:1px;height:38px;background:linear-gradient(var(--gold),transparent);animation:drop 2s var(--ease) infinite;}
  @keyframes drop{0%{transform:scaleY(0);transform-origin:top;}50%{transform:scaleY(1);transform-origin:top;}51%{transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}

  @media(max-width:980px){.lg-page .hero-split {grid-template-columns:1fr;gap:48px;padding-top:0;padding-bottom:32px;}
    .hero-img-frame img {height:380px;}
    .hero-visual::before {display:none;}
    .hero-img-frame {max-width:100%;}
  }
  @media(max-width:640px){
    .lg-page .hero-split {padding-top:0;padding-bottom:24px;gap:36px;}
    .lg-page .hero-img-frame img {height:280px;}
    .lg-page .hero-badges {gap:22px;}
  }

  /* ===== TRUST STATS BAR ===== */
  .lg-page .stats-bar {background:var(--navy-deep);color:var(--ivory);}
  .lg-page .stats-grid {display:grid;grid-template-columns:repeat(4,1fr);gap:0;}
  .lg-page .stat-cell {padding:52px 30px;text-align:center;border-right:1px solid rgba(247,250,252,.10);}
  .lg-page .stat-cell:last-child {border-right:none;}
  .lg-page .stat-cell .v {font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:600;color:var(--gold-soft);line-height:1;margin-bottom:12px;}
  .lg-page .stat-cell .k {font-size:13px;letter-spacing:.5px;color:rgba(247,250,252,.78);}

  /* ===== ABOUT ===== */
  .lg-page .about {background:var(--ivory);}
  .lg-page .about-grid {display:grid;grid-template-columns:1.05fr 1fr;gap:64px;align-items:center;}
  .lg-page .about-copy .eyebrow {margin-bottom:18px;}
  .lg-page .about-copy h2 {font-size:clamp(32px,4.4vw,52px);margin-bottom:22px;}
  .lg-page .about-copy p {color:var(--muted);margin-bottom:18px;font-size:16.5px;}
  .lg-page .about-media {position:relative;height:560px;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-strong);}
  .lg-page .about-media .frame {position:absolute;inset:14px;border:1px solid rgba(247,250,252,.5);z-index:2;pointer-events:none;}
  .lg-page .facts-row {display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:54px;}
  .lg-page .fact {background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:26px 22px;text-align:center;}
  .lg-page .fact .ff {font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--navy);font-weight:600;}
  .lg-page .fact .fl {font-size:12.5px;color:var(--muted);letter-spacing:.4px;margin-top:6px;}

  /* ===== WHY USA ===== */
  .lg-page .why {background:var(--beige);}
  .lg-page .why-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;}
  .lg-page .why-card {background:var(--ivory);padding:42px 34px;transition:background .3s;}
  .lg-page .why-card:hover {background:#fff;}
  .lg-page .why-card .ic {width:46px;height:46px;border:1px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--gold-deep);font-family:'Cormorant Garamond',serif;font-size:21px;margin-bottom:20px;}
  .lg-page .why-card h3 {font-size:24px;margin-bottom:10px;}
  .lg-page .why-card p {color:var(--muted);font-size:15px;}

  /* ===== PROGRAMME OVERVIEW ===== */
  .lg-page .prog {background:var(--navy);color:var(--ivory);}
  .lg-page .prog .section-head h2 {color:var(--ivory);}
  .lg-page .prog .section-head p {color:rgba(247,250,252,.72);}
  .lg-page .prog-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:26px;}
  .lg-page .prog-card {background:rgba(247,250,252,.04);border:1px solid rgba(247,250,252,.12);border-radius:var(--radius);padding:38px 32px;transition:all .35s var(--ease);}
  .lg-page .prog-card:hover {border-color:var(--gold);transform:translateY(-6px);}
  .lg-page .prog-card .no {font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--gold-soft);border-bottom:1px solid rgba(247,250,252,.16);padding-bottom:14px;margin-bottom:18px;letter-spacing:2px;}
  .lg-page .prog-card h3 {color:var(--ivory);font-size:25px;margin-bottom:12px;}
  .lg-page .prog-card p {color:rgba(247,250,252,.74);font-size:15px;}

  /* ===== BENEFITS ===== */
  .lg-page .benefits {background:var(--ivory);}
  .lg-page .ben-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .lg-page .ben-card {background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:36px 30px;position:relative;overflow:hidden;transition:all .35s var(--ease);}
  .lg-page .ben-card::before {content:"";position:absolute;top:0;left:0;width:3px;height:0;background:var(--gold);transition:height .4s var(--ease);}
  .lg-page .ben-card:hover {box-shadow:var(--shadow-soft);transform:translateY(-4px);}
  .lg-page .ben-card:hover::before {height:100%;}
  .lg-page .ben-card .mk {font-family:'Cormorant Garamond',serif;font-size:15px;color:var(--gold-deep);letter-spacing:2px;margin-bottom:16px;}
  .lg-page .ben-card h3 {font-size:23px;margin-bottom:10px;}
  .lg-page .ben-card p {color:var(--muted);font-size:15px;}

  /* ===== FINANCIAL REQUIREMENTS ===== */
  .lg-page .finance {background:var(--beige);}
  .lg-page .fin-table {max-width:980px;margin:0 auto;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;background:#fff;}
  .lg-page .fin-row {display:grid;grid-template-columns:1.6fr 1fr 1fr;}
  .lg-page .fin-row.head {background:var(--navy);}
  .lg-page .fin-row.head .fc {color:var(--ivory);font-weight:600;font-size:13px;letter-spacing:.5px;text-transform:uppercase;}
  .lg-page .fin-row:not(.head) {border-top:1px solid var(--line);}
  .lg-page .fin-row.total {background:rgba(47,199,161,.10);}
  .lg-page .fc {padding:22px 26px;font-size:15px;}
  .lg-page .fc.label {color:var(--navy);font-weight:500;}
  .lg-page .fc.fig {font-family:'Cormorant Garamond',serif;font-size:21px;color:var(--gold-deep);font-weight:600;}
  .lg-page .fin-note {max-width:760px;margin:24px auto 0;text-align:center;color:var(--muted);font-size:13.5px;}
  .lg-page .fin-extra {display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;}
  .lg-page .fin-x {background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:30px 26px;}
  .lg-page .fin-x h4 {font-size:19px;margin-bottom:8px;}
  .lg-page .fin-x p {color:var(--muted);font-size:14px;}

  /* ===== FAMILY ===== */
  .lg-page .family {background:var(--ivory);}
  .lg-page .fam-grid {display:grid;grid-template-columns:1fr 1.1fr;gap:64px;align-items:center;}
  .lg-page .fam-media {position:relative;height:480px;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-strong);}
  .lg-page .fam-media .frame {position:absolute;inset:14px;border:1px solid rgba(247,250,252,.5);z-index:2;pointer-events:none;}
  .lg-page .fam-list {list-style:none;}
  .lg-page .fam-list li {display:flex;gap:18px;padding:18px 0;border-bottom:1px solid var(--line);}
  .lg-page .fam-list li:last-child {border-bottom:none;}
  .lg-page .fi {flex:0 0 40px;font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--gold-deep);}
  .lg-page .fam-list h4 {font-size:20px;margin-bottom:4px;}
  .lg-page .fam-list p {color:var(--muted);font-size:14.5px;margin:0;}

  /* ===== PROCESS TIMELINE ===== */
  .lg-page .process {background:var(--navy);color:var(--ivory);}
  .lg-page .process .section-head p {color:rgba(247,250,252,.72);}
  .lg-page .timeline {max-width:760px;margin:0 auto;border-left:1px solid rgba(247,250,252,.18);padding-left:48px;}
  .lg-page .tl-item {position:relative;padding-left:0;padding-bottom:44px;}
  .lg-page .tl-item:last-child {padding-bottom:0;}
  .lg-page .tl-item .dot {position:absolute;left:-80px;top:0;width:64px;height:64px;border-radius:50%;border:1px solid var(--gold);background:var(--navy-deep);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--gold-soft);}
  .lg-page .tl-item h3 {color:var(--ivory);font-size:25px;margin-bottom:6px;}
  .lg-page .tl-item p {color:rgba(247,250,252,.72);font-size:15px;max-width:620px;}

  /* ===== LIFE IN AMERICA ===== */
  .lg-page .life {background:var(--ivory);}
  .lg-page .life-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .lg-page .life-card {position:relative;height:420px;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-soft);}
  .lg-page .life-card img {transition:transform .8s var(--ease);}
  .lg-page .life-card:hover img {transform:scale(1.06);}
  .lg-page .life-card .ov {position:absolute;inset:0;background:linear-gradient(to top,rgba(26,37,64,.88) 0%,rgba(26,37,64,.18) 55%,transparent 100%);z-index:1;}
  .lg-page .life-card .cap {position:absolute;left:0;right:0;bottom:0;z-index:2;padding:30px 28px;}
  .lg-page .life-card .cap h3 {color:var(--ivory);font-size:27px;margin-bottom:6px;}
  .lg-page .life-card .cap p {color:rgba(247,250,252,.82);font-size:14px;}
  .lg-page .life-strip {display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:48px;}
  .lg-page .life-tag {border:1px solid var(--line);border-radius:40px;padding:10px 22px;font-size:13.5px;color:var(--navy);background:#fff;}

  /* ===== WHY LANGMA ===== */
  .lg-page .langma {background:var(--navy);color:var(--ivory);position:relative;overflow:hidden;}
  .lg-page .langma-grid {display:grid;grid-template-columns:1fr 1.1fr;gap:64px;align-items:center;}
  .lg-page .langma h2 {color:var(--ivory);font-size:clamp(32px,4.4vw,52px);margin-bottom:20px;}
  .lg-page .langma .lead {color:rgba(247,250,252,.82);font-size:17px;margin-bottom:14px;}
  .lg-page .lg-list {display:grid;grid-template-columns:1fr 1fr;gap:30px 36px;}
  .lg-page .lg-item h4 {color:var(--gold-soft);font-size:22px;margin-bottom:6px;}
  .lg-page .lg-item p {color:rgba(247,250,252,.72);font-size:14.5px;}

  /* ===== FAQ ===== */
  .lg-page .faq {background:var(--ivory);}
  .lg-page .faq-wrap {max-width:880px;margin:0 auto;}
  .lg-page .faq-item {border-bottom:1px solid var(--line);}
  .lg-page .faq-q {width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:26px 0;display:flex;justify-content:space-between;align-items:center;gap:24px;font-family:'Cormorant Garamond',serif;font-size:21px;color:var(--navy);font-weight:600;}
  .lg-page .faq-q .pm {flex:0 0 30px;height:30px;border:1px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--gold-deep);font-family:'Inter',sans-serif;font-size:18px;transition:all .3s;}
  .lg-page .faq-item.open .pm {background:var(--gold);color:var(--navy);transform:rotate(45deg);}
  .lg-page .faq-a {max-height:0;overflow:hidden;transition:max-height .4s var(--ease);}
  .lg-page .faq-a p {padding:0 0 26px;color:var(--muted);font-size:15.5px;max-width:760px;}

  /* ===== LEAD FORM ===== */
  .lg-page .lead-sec {background:var(--navy-deep);color:var(--ivory);}
  .lg-page .lead-grid {display:grid;grid-template-columns:1fr 1.1fr;gap:64px;align-items:start;}
  .lg-page .lead-copy .eyebrow {color:var(--gold-soft);}
  .lg-page .lead-copy h2 {color:var(--ivory);font-size:clamp(32px,4.2vw,50px);margin-bottom:20px;}
  .lg-page .lead-copy p {color:rgba(247,250,252,.80);margin-bottom:26px;font-size:16.5px;}
  .lg-page .lead-assure {list-style:none;}
  .lg-page .lead-assure li {display:flex;gap:12px;align-items:center;padding:11px 0;color:rgba(247,250,252,.86);font-size:15px;}
  .lg-page .lead-assure li::before {content:"✓";color:var(--gold-soft);font-weight:700;}
  .lg-page .form-card {background:var(--ivory);border-radius:var(--radius);padding:42px;box-shadow:var(--shadow-strong);}
  .lg-page .form-card h3 {font-size:27px;margin-bottom:6px;}
  .lg-page .form-card .fsub {color:var(--muted);font-size:14.5px;margin-bottom:26px;}
  .lg-page .frow {display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .lg-page .field {margin-bottom:16px;}
  .lg-page .field label {display:block;font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:var(--navy);font-weight:600;margin-bottom:7px;}
  .lg-page .field input, .lg-page .field select {width:100%;padding:13px 15px;border:1px solid var(--line);border-radius:var(--radius);font-family:'Inter',sans-serif;font-size:15px;background:#fff;color:var(--charcoal);transition:border-color .25s;}
  .lg-page .field input:focus, .lg-page .field select:focus {outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(47,199,161,.15);}
  .lg-page .form-card .btn {width:100%;justify-content:center;margin-top:6px;}
  .lg-page .form-card .disc {font-size:12px;color:var(--muted);margin-top:14px;text-align:center;}
  .lg-page .success {display:none;background:rgba(47,199,161,.14);border:1px solid var(--gold);border-radius:var(--radius);padding:16px;color:var(--gold-deep);font-size:14.5px;text-align:center;margin-top:16px;}
  .lg-page .success.show {display:block;}

  /* ===== OFFICE VISIT ===== */
  .lg-page .office {background:var(--beige);}
  .lg-page .office-grid {display:grid;grid-template-columns:1fr 1.05fr;gap:60px;align-items:center;}
  .lg-page .office-copy h2 {font-size:clamp(30px,4vw,46px);margin-bottom:18px;}
  .lg-page .office-copy p {color:var(--muted);font-size:16.5px;margin-bottom:26px;}
  .lg-page .office-points {list-style:none;margin-bottom:8px;}
  .lg-page .office-points li {display:flex;gap:16px;padding:16px 0;border-bottom:1px solid var(--line);}
  .lg-page .office-points .oi {flex:0 0 38px;height:38px;border-radius:50%;border:1px solid var(--gold);color:var(--gold-deep);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:18px;}
  .lg-page .office-points h4 {font-size:19px;margin-bottom:1px;}
  .lg-page .office-points p {font-size:14px;margin:0;}
  .lg-page .office-form {background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:40px;box-shadow:var(--shadow-soft);}
  .lg-page .office-form h3 {font-size:25px;margin-bottom:22px;}

  /* ===== FOOTER ===== */
  .lg-page footer {background:var(--navy-deep);color:rgba(247,250,252,.7);padding:74px 0 32px;}
  .lg-page .foot-grid {display:grid;grid-template-columns:2fr 1fr 1fr 1.3fr;gap:44px;margin-bottom:50px;}
  .lg-page .foot-brand .name {font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--ivory);font-weight:600;letter-spacing:1px;}
  .lg-page .foot-brand .tag {font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--gold-soft);margin:6px 0 18px;}
  .lg-page .foot-brand p {font-size:14px;max-width:320px;}
  .lg-page .foot-col h4 {color:var(--ivory);font-size:18px;margin-bottom:18px;font-weight:600;}
  .lg-page .foot-col a {display:block;font-size:14px;padding:6px 0;transition:color .25s;}
  .lg-page .foot-col a:hover {color:var(--gold-soft);}
  .lg-page .foot-bottom {border-top:1px solid rgba(247,250,252,.12);padding-top:26px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:14px;font-size:12.5px;}
  .lg-page .legal {max-width:920px;font-size:11.5px;color:rgba(247,250,252,.5);line-height:1.7;margin-top:18px;}

  .lg-page .reveal {opacity:0;transform:translateY(28px);transition:opacity .7s var(--ease),transform .7s var(--ease);}
  .lg-page .reveal.in {opacity:1;transform:none;}

  @media(max-width:980px){
    .lg-page .nav-links {display:none;}
    .lg-page .burger {display:flex;}
    .lg-page .about-grid, .lg-page .fam-grid, .lg-page .langma-grid, .lg-page .lead-grid, .lg-page .office-grid {grid-template-columns:1fr;gap:40px;}
    .lg-page .stats-grid, .lg-page .why-grid, .lg-page .prog-grid, .lg-page .ben-grid, .lg-page .life-grid, .lg-page .fin-extra {grid-template-columns:1fr 1fr;}
    .lg-page .facts-row {grid-template-columns:1fr 1fr;}
    .lg-page .lg-list {grid-template-columns:1fr;}
    .lg-page .about-media, .lg-page .fam-media {height:420px;}
    .lg-page .timeline {padding-left:0;border-left:none;}
    .lg-page .tl-item {padding-left:92px;}
    .lg-page .tl-item .dot {left:0;}
  }
  @media(max-width:640px){
    .lg-page .block {padding:74px 0;}
    .lg-page .container {padding:0 22px;}
    .lg-page .stats-grid, .lg-page .why-grid, .lg-page .prog-grid, .lg-page .ben-grid, .lg-page .life-grid, .lg-page .fin-extra, .lg-page .facts-row {grid-template-columns:1fr;}
    .lg-page .stat-cell {border-right:none;border-bottom:1px solid rgba(247,250,252,.10);}
    .lg-page .frow {grid-template-columns:1fr;}
    .lg-page .fin-row {grid-template-columns:1fr;}
    .lg-page .fc {padding:14px 20px;}
    .lg-page .fin-row.head {display:none;}
    .lg-page .hero-badges {gap:26px;}
    .lg-page .form-card, .lg-page .office-form {padding:30px;}
    .lg-page .foot-grid {grid-template-columns:1fr 1fr;}
  }
  @media(prefers-reduced-motion:reduce){
    .lg-page * {animation:none!important;transition:none!important;}
    .lg-page .reveal {opacity:1;transform:none;}
  }
      /* PR hero responsive fix */
  /* PR hero — account for site TopBar + Navbar only (no double top padding) */
  @media(max-width:980px){
    .lg-page .hero{padding:64px 0 40px;}
    .lg-page .hero-split{grid-template-columns:1fr !important;gap:36px !important;padding-top:0 !important;}
    .lg-page .hero-visual{order:-1;max-width:560px;margin:0 auto;width:100%;}
    .lg-page .hero-visual::before{display:none;}
    .lg-page .hero-img-frame,.lg-page .hero-img-card{max-width:100%;}
    .lg-page .hero-badges{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;}
  }
  @media(max-width:640px){
    .lg-page .hero{padding:56px 0 32px;}
    .lg-page .hero-split{gap:28px !important;padding-bottom:16px !important;}
    .lg-page .hero h1{font-size:clamp(30px,8vw,42px);}
    .lg-page .hero-badges{grid-template-columns:1fr;}
    .lg-page .hero-cta,.lg-page .hero-ctas{flex-direction:column;}
    .lg-page .hero-cta .btn,.lg-page .hero-ctas .btn{width:100%;justify-content:center;}
    .lg-page .container{padding:0 20px;}
  }
`}</style>
      <main>
{/* ===== HERO ===== */}
<section className="hero">
  <div className="hero-bg" aria-hidden="true">
    <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1900" alt="" role="presentation" />
  </div>
  <div className="container">
    <div className="hero-split">
      <div className="hero-copy">
        <span className="eyebrow">EB-5 Visa USA · Immigrant Investor Programme</span>
        <h1>EB-5 Visa to the USA: your pathway to <em>American permanent residency</em></h1>
        <p className="lead">The EB-5 Immigrant Investor Program is the United States' established pathway to a Green Card for qualified investors, entrepreneurs and globally mobile families who are prepared to support American job creation through qualifying capital investment. With minimum thresholds beginning from USD 800,000 for Targeted Employment Area projects, USA residency by investment has never been more clearly structured. Langma International guides you through every stage — from initial eligibility review to permanent Green Card — with transparency, precision and full compliance throughout.</p>
        <div className="hero-cta">
          <a href="#lead" className="btn btn-gold">Book Your Private Consultation</a>
          <a href="#programme" className="btn btn-ghost">Explore the EB-5 Visa</a>
        </div>
        <div className="hero-badges">
          <div className="hero-badge"><div className="num">$800K<span style={{fontSize: '16px'}}>+</span></div><div className="lbl">2026 minimum investment (TEA)</div></div>
          <div className="hero-badge"><div className="num">10</div><div className="lbl">Jobs created per investment</div></div>
          <div className="hero-badge"><div className="num">Green<br />Card</div><div className="lbl">US permanent residency</div></div>
          <div className="hero-badge"><div className="num">Family</div><div className="lbl">Spouse &amp; children included</div></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-img-frame">
          <img src="https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=1200" alt="Manhattan skyline rising above the Hudson River at golden hour" />
          <div className="hero-img-badge">
            <span className="dot-pulse"></span>
            <span>New York, United States</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="scroll-hint"><span>Discover</span><span className="line"></span></div>
</section>

<div className="starline" aria-hidden="true"></div>

{/* ===== TRUST STATS BAR ===== */}
<section className="stats-bar">
  <div className="container">
    <div className="stats-grid">
      <div className="stat-cell reveal"><div className="v">$800,000</div><div className="k">Minimum investment, Targeted Employment Area (TEA) — 2026</div></div>
      <div className="stat-cell reveal"><div className="v">~640</div><div className="k">USCIS-designated Regional Centers across the United States</div></div>
      <div className="stat-cell reveal"><div className="v">1990</div><div className="k">EB-5 Immigrant Investor Program created by US Congress</div></div>
      <div className="stat-cell reveal"><div className="v">10 Jobs</div><div className="k">Minimum full-time US job creation per qualifying investment</div></div>
    </div>
  </div>
</section>

{/* ===== ABOUT THE USA ===== */}
<section className="block about" id="about">
  <div className="container">
    <div className="about-grid">
      <div className="about-copy reveal">
        <span className="eyebrow">Discover the United States</span>
        <h2>The United States: scale, opportunity and enduring global leadership</h2>
        <p>The third-largest country in the world by land area, the United States spans an extraordinary range of landscapes, cities and regional economies across fifty states. Home to roughly 340 million people, it is the world's largest free-market economy and a federal republic with a long democratic tradition. English is the dominant language, the US dollar is the currency, and Washington, D.C. serves as the nation's capital.</p>
        <p>Its economy is the largest and among the most diversified on earth — driven by technology, finance, healthcare, manufacturing, energy and a deep culture of entrepreneurship. World-renowned universities, leading hospitals and research institutions, and an unmatched concentration of global corporate headquarters make the country a natural base for ambitious individuals and families seeking long-term opportunity.</p>
        <p>For investors, the appeal goes beyond residency on paper: it is access to the world's deepest capital markets, an unrivalled innovation ecosystem, and a society built around mobility, reinvention and reward for enterprise.</p>
      </div>
      <div className="about-media reveal">
        <span className="frame"></span>
        <img src="https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1200" alt="Modern American business district skyline against a clear sky" />
      </div>
    </div>

    <div className="facts-row">
      <div className="fact reveal"><div className="ff">340M</div><div className="fl">Population</div></div>
      <div className="fact reveal"><div className="ff">Washington, D.C.</div><div className="fl">Capital city</div></div>
      <div className="fact reveal"><div className="ff">US Dollar</div><div className="fl">Official currency</div></div>
      <div className="fact reveal"><div className="ff">English</div><div className="fl">Primary language</div></div>
    </div>
  </div>
</section>

{/* ===== WHY THE USA ===== */}
<section className="block why">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Why Global Investors Choose America</span>
      <h2>The reasons investors commit — and the reasons they stay</h2>
      <p>Beyond the Green Card itself, the United States offers an investment and lifestyle environment that continues to reward long-term thinking.</p>
    </div>
    <div className="why-grid">
      <div className="why-card reveal"><div className="ic">★</div><h3>The world's largest economy</h3><p>Unmatched depth across every major sector, from technology and finance to healthcare, energy and advanced manufacturing.</p></div>
      <div className="why-card reveal"><div className="ic">⌖</div><h3>Freedom to live and work anywhere</h3><p>Green Card holders may live, work and study in any US state, without the restrictions tied to a sponsoring employer.</p></div>
      <div className="why-card reveal"><div className="ic">✎</div><h3>World-class education</h3><p>Access to leading American universities and schools, including in-state tuition advantages for many resident students.</p></div>
      <div className="why-card reveal"><div className="ic">✚</div><h3>Leading healthcare</h3><p>Access to some of the world's most advanced hospitals, specialists and medical research institutions.</p></div>
      <div className="why-card reveal"><div className="ic">❋</div><h3>Innovation &amp; entrepreneurship</h3><p>A culture and capital ecosystem built to back new ventures, from Silicon Valley to emerging hubs nationwide.</p></div>
      <div className="why-card reveal"><div className="ic">⏚</div><h3>Stable institutions</h3><p>A mature legal and financial system, strong property rights and a long history of political and economic continuity.</p></div>
    </div>
  </div>
</section>

<div className="starline" aria-hidden="true"></div>

{/* ===== PROGRAMME OVERVIEW ===== */}
<section className="block prog" id="programme">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center" style={{color: 'var(--gold-soft)'}}>The Programme</span>
      <h2>The EB-5 Immigrant Investor Program, explained clearly</h2>
      <p>A residency route built around job-creating capital investment — established by Congress, administered by USCIS, and used by thousands of investor families each year.</p>
    </div>
    <div className="prog-grid">
      <div className="prog-card reveal"><div className="no">01 · ORIGIN</div><h3>What is EB-5</h3><p>Created by Congress in 1990, the EB-5 programme grants a Green Card to foreign nationals who invest in a new commercial enterprise that creates American jobs.</p></div>
      <div className="prog-card reveal"><div className="no">02 · ROUTES</div><h3>Regional Center or direct investment</h3><p>Approximately 640 USCIS-designated Regional Centers operate across the United States, each managing approved, job-creating projects. The large majority of EB-5 investors choose this passive, pooled route; a smaller number pursue active, direct management of a qualifying commercial enterprise. Both routes carry the same minimum investment and job-creation obligations.</p></div>
      <div className="prog-card reveal"><div className="no">03 · INVESTMENT</div><h3>The capital requirement</h3><p>A minimum of $800,000 in a Targeted Employment Area, or $1,050,000 outside one, placed at risk in a qualifying new commercial enterprise.</p></div>
      <div className="prog-card reveal"><div className="no">04 · JOBS</div><h3>Job creation</h3><p>Each investment must create or preserve at least 10 full-time positions for qualifying US workers within the required timeframe.</p></div>
      <div className="prog-card reveal"><div className="no">05 · RESIDENCY</div><h3>Conditional Green Card</h3><p>Once the I-526E petition is approved, eligible investors and their families receive a Conditional Green Card, valid initially for a two-year period.</p></div>
      <div className="prog-card reveal"><div className="no">06 · PATHWAY</div><h3>Permanent Green Card &amp; citizenship</h3><p>Filing to remove conditions can lead to a Permanent Green Card, with eligibility for US citizenship generally available after five years of continuous lawful residence.</p></div>
    </div>
  </div>
</section>

{/* ===== BENEFITS ===== */}
<section className="block benefits">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Key Benefits</span>
      <h2>What a US Green Card makes possible</h2>
      <p>The advantages of the EB-5 programme extend across daily life, family, business and the long-term horizon.</p>
    </div>
    <div className="ben-grid">
      <div className="ben-card reveal"><div className="mk">I</div><h3>Permanent residence in the USA</h3><p>The legal right to live, work and study anywhere in the United States, with no sponsoring employer required.</p></div>
      <div className="ben-card reveal"><div className="mk">II</div><h3>Family inclusion</h3><p>The principal investor's spouse and unmarried children under 21 may be included, each receiving a Green Card with equal rights.</p></div>
      <div className="ben-card reveal"><div className="mk">III</div><h3>Business &amp; employment freedom</h3><p>The ability to start, own or work for any legal US business, free from the restrictions tied to employment-based visas.</p></div>
      <div className="ben-card reveal"><div className="mk">IV</div><h3>Education access</h3><p>Access for the family to America's public, private and international schools, and to US universities, often at resident rates.</p></div>
      <div className="ben-card reveal"><div className="mk">V</div><h3>Healthcare &amp; financial access</h3><p>Eligibility to access US healthcare and banking services, and to build a financial and estate-planning footprint in America.</p></div>
      <div className="ben-card reveal"><div className="mk">VI</div><h3>Route to citizenship</h3><p>A clear, well-established pathway toward US citizenship through naturalisation after five years of continuous lawful residence.</p></div>
    </div>
  </div>
</section>

{/* ===== INVESTMENT REQUIREMENTS ===== */}
<section className="block finance" id="finance">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Investment Requirements</span>
      <h2>What you need to invest</h2>
      <p>The EB-5 Immigrant Investor Program is built on a genuine, at-risk capital investment in a job-creating enterprise — not a passive donation or a fee. The qualifying thresholds below reflect the framework in force for 2026, subject to periodic inflation adjustment by US authorities.</p>
    </div>

    <div className="fin-table reveal">
      <div className="fin-row head">
        <div className="fc">Project category</div>
        <div className="fc">Minimum investment</div>
        <div className="fc">Job creation requirement</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Targeted Employment Area (TEA) — rural location or high-unemployment region</div>
        <div className="fc fig">$800,000</div>
        <div className="fc fig">10 full-time US jobs</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Standard investment — project located outside a Targeted Employment Area</div>
        <div className="fc fig">$1,050,000</div>
        <div className="fc fig">10 full-time US jobs</div>
      </div>
      <div className="fin-row total">
        <div className="fc label">Preferred route for most investors: USCIS-designated Regional Center project</div>
        <div className="fc fig">From $800,000</div>
        <div className="fc fig">Passive, pooled investment</div>
      </div>
    </div>
    <p className="fin-note">Investment thresholds reflect the EB-5 Reform and Integrity Act framework in force for 2026 and are scheduled for inflation review every five years by US authorities. Figures should be confirmed at the time of application. EB-5 investments carry financial risk; no return of capital is guaranteed. This page provides general information only and is not a substitute for professional legal or financial advice.</p>

    <div className="fin-extra">
      <div className="fin-x reveal"><h4>Capital remains at risk</h4><p>All invested funds must be genuinely placed at risk throughout the conditional residency period. Repayment, where it occurs, is entirely dependent on the successful completion of the investment project and typically becomes possible only after approximately five to seven years, subject to project terms and applicable regulations. No capital return can be guaranteed.</p></div>
      <div className="fin-x reveal"><h4>Regional Centers explained</h4><p>There are approximately 640 USCIS-designated Regional Centers operating across the United States. These entities manage approved, job-creating projects — spanning real estate, infrastructure and commercial development — and allow investors to participate passively without day-to-day management responsibilities. The applicable minimum investment depends on the project's geographic location.</p></div>
      <div className="fin-x reveal"><h4>Targeted Employment Areas</h4><p>A Targeted Employment Area is either a rural location or an urban region where unemployment stands significantly above the national average. Qualifying investments in TEA-designated projects access the lower USD 800,000 threshold — the route most commonly selected by EB-5 investors seeking USA residency by investment.</p></div>
    </div>

    <div className="fin-extra" style={{marginTop: '22px'}}>
      <div className="fin-x reveal"><h4>Lawful source of funds</h4><p>Comprehensive documentation establishing the lawful origin of the invested capital is a cornerstone of any successful EB-5 petition — prepared in coordination with qualified legal and financial professionals.</p></div>
      <div className="fin-x reveal"><h4>Qualifying enterprise</h4><p>Investment must flow into a new commercial enterprise structured to satisfy USCIS requirements, most commonly a Regional Center project selected for its job-creation capacity and compliance track record.</p></div>
      <div className="fin-x reveal"><h4>No language or business test</h4><p>The EB-5 Immigrant Investor Program imposes no English proficiency requirement, no minimum age and no prior business or managerial experience — making it one of the most accessible US investment immigration pathways available.</p></div>
    </div>

    {/* ===== GOVERNMENT & ADMINISTRATIVE FEES ===== */}
    <div className="section-head reveal" style={{marginTop: '80px'}}>
      <span className="eyebrow center">Cost Breakdown</span>
      <h2>Government &amp; administrative fees</h2>
      <p>Beyond the qualifying investment itself, a complete EB-5 application involves a range of government filing fees and administrative costs. The schedule below presents the principal charges investors should plan for.</p>
    </div>

    <div className="fin-table reveal">
      <div className="fin-row head">
        <div className="fc">Fee item</div>
        <div className="fc">Amount</div>
        <div className="fc">Applies to</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Regional Center administrative fee</div>
        <div className="fc fig">$70,000</div>
        <div className="fc">Per investor (project-specific; may vary)</div>
      </div>
      <div className="fin-row">
        <div className="fc label">USCIS registration fee</div>
        <div className="fc fig">$1,000</div>
        <div className="fc">Per family</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Form I-526E petition filing fee</div>
        <div className="fc fig">$11,160</div>
        <div className="fc">Per family</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Form I-485 adjustment of status (applicant aged 14 and above)</div>
        <div className="fc fig">$1,440</div>
        <div className="fc">Per applicant</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Form I-485 adjustment of status (applicant below 14 years)</div>
        <div className="fc fig">$950</div>
        <div className="fc">Per applicant</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Green Card application fee</div>
        <div className="fc fig">$345</div>
        <div className="fc">Per applicant</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Green Card issuance fee</div>
        <div className="fc fig">$325</div>
        <div className="fc">Per applicant</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Form I-829 petition to remove conditions</div>
        <div className="fc fig">$9,525</div>
        <div className="fc">Per family</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Biometric services fee</div>
        <div className="fc fig">$85</div>
        <div className="fc">Per applicant</div>
      </div>
      <div className="fin-row total">
        <div className="fc label">Estimated health insurance (indicative starting figure)</div>
        <div className="fc fig">From $560</div>
        <div className="fc">Per applicant / per month (varies by plan)</div>
      </div>
    </div>
    <p className="fin-note">Government filing fees are set by USCIS and are subject to change at any time. Administrative fees charged by Regional Centers vary by project. Investment outcomes depend on project performance and the outcome of USCIS adjudication. The figures above are provided for planning purposes only; applicants should seek personalised professional guidance to confirm current costs before proceeding. This information does not constitute legal or financial advice.</p>
  </div>
</section>

{/* ===== FAMILY ===== */}
<section className="block family">
  <div className="container">
    <div className="fam-grid">
      <div className="fam-media reveal">
        <span className="frame"></span>
        <img src="https://images.unsplash.com/photo-1543342384-1f1350e27861?q=80&w=1200" alt="A family of four enjoying time together outdoors in an American city park" />
      </div>
      <div className="reveal">
        <span className="eyebrow">Eligible Applicants &amp; Family</span>
        <h2 style={{fontSize: 'clamp(30px,4vw,48px)', marginBottom: '26px'}}>One investment, your family included</h2>
        <ul className="fam-list">
          <li><span className="fi">①</span><div><h4>Principal investor</h4><p>Any foreign national meeting the investment, source-of-funds and admissibility requirements, regardless of business background.</p></div></li>
          <li><span className="fi">②</span><div><h4>Spouse</h4><p>The investor's lawfully recognised spouse is included as a dependant, receiving the same Green Card rights.</p></div></li>
          <li><span className="fi">③</span><div><h4>Unmarried children under 21</h4><p>Dependent children under the age of 21 are included on the same petition, supporting their education and long-term future in the US.</p></div></li>
          <li><span className="fi">④</span><div><h4>No employer or family sponsor required</h4><p>Investors use their own qualifying capital and do not need sponsorship from a US employer or relative.</p></div></li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* ===== PROCESS TIMELINE ===== */}
<section className="block process" id="process">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center" style={{color: 'var(--gold-soft)'}}>The Application Journey</span>
      <h2>A guided, seven-stage process</h2>
      <p>Langma International coordinates each stage and introduces licensed US immigration attorneys where local representation is required.</p>
    </div>
    <div className="timeline">
      <div className="tl-item reveal"><div className="dot">01</div><h3>Eligibility assessment</h3><p>A confidential review of your background, objectives and source of funds to confirm EB-5 is the right route — and to map the documentation ahead.</p></div>
      <div className="tl-item reveal"><div className="dot">02</div><h3>Project &amp; investment selection</h3><p>Reviewing qualifying Regional Center projects or direct-investment opportunities against your risk profile, timeline and objectives.</p></div>
      <div className="tl-item reveal"><div className="dot">03</div><h3>Source-of-funds documentation</h3><p>Preparing the certified evidence tracing the lawful origin of your investment capital, working with qualified legal and financial professionals.</p></div>
      <div className="tl-item reveal"><div className="dot">04</div><h3>Investment &amp; petition filing</h3><p>Completing the qualifying investment and filing the I-526E petition with USCIS, supported by a complete and consistent evidence pack.</p></div>
      <div className="tl-item reveal"><div className="dot">05</div><h3>USCIS adjudication</h3><p>USCIS review of the I-526E petition commonly takes in the region of three to four years depending on workload and country of birth; however, when combined with subsequent consular or adjustment-of-status processing, the total path to relocating and obtaining the Conditional Green Card typically extends to five to six years overall.</p></div>
      <div className="tl-item reveal"><div className="dot">06</div><h3>Conditional Green Card</h3><p>Upon approval, the investor and family receive Conditional Permanent Residence, generally valid for an initial two-year period.</p></div>
      <div className="tl-item reveal"><div className="dot">07</div><h3>Permanent residency &amp; citizenship planning</h3><p>Filing to remove conditions ahead of the Permanent Green Card, followed by guidance toward naturalisation after five years of continuous residence.</p></div>
    </div>
  </div>
</section>

{/* ===== LIFE IN AMERICA ===== */}
<section className="block life">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Life in the United States</span>
      <h2>Where will your family put down roots?</h2>
      <p>From the financial towers of Manhattan to the innovation corridors of California, the United States offers distinct settings for distinct ambitions.</p>
    </div>
    <div className="life-grid">
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200" alt="The Statue of Liberty standing in New York Harbor with the city skyline beyond" />
        <div className="ov"></div>
        <div className="cap"><h3>New York</h3><p>The world's financial capital, with unmatched access to global business, culture and opportunity.</p></div>
      </div>
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1200" alt="A modern Californian business and technology district skyline at dusk" />
        <div className="ov"></div>
        <div className="cap"><h3>California</h3><p>Home to Silicon Valley and a deep, entrepreneurial technology and innovation ecosystem.</p></div>
      </div>
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1531218150217-54595bc2b934?q=80&w=1200" alt="A sunlit suburban American neighbourhood with tree-lined streets" />
        <div className="ov"></div>
        <div className="cap"><h3>Sunbelt &amp; suburban states</h3><p>Family-oriented communities, lower costs of living and fast-growing regional economies across the South and Southwest.</p></div>
      </div>
    </div>
    <div className="life-strip">
      <span className="life-tag reveal">World-class universities</span>
      <span className="life-tag reveal">Deep capital markets</span>
      <span className="life-tag reveal">Diverse, global cities</span>
      <span className="life-tag reveal">Strong property rights</span>
      <span className="life-tag reveal">Advanced healthcare</span>
      <span className="life-tag reveal">English-speaking nationwide</span>
    </div>
  </div>
</section>

{/* ===== WHY LANGMA ===== */}
<section className="block langma" id="langma">
  <div className="container">
    <div className="langma-grid">
      <div className="reveal">
        <span className="eyebrow" style={{color: 'var(--gold-soft)'}}>Why Langma International</span>
        <h2>A trusted partner for an investment that deserves care</h2>
        <p className="lead">We help individuals and families access United States residency through transparent guidance, strategic planning and genuinely personalised support — never overpromising, never guaranteeing outcomes we cannot control.</p>
        <p className="lead">From the first conversation to your Green Card, you work with people who understand both the regulation and the financial reality of placing significant capital at risk.</p>
      </div>
      <div className="lg-list reveal">
        <div className="lg-item"><h4>Licensed advisory network</h4><p>Coordinated introductions to licensed US immigration attorneys and qualified financial professionals throughout your case.</p></div>
        <div className="lg-item"><h4>Compliance-first process</h4><p>Every stage structured around USCIS requirements and full source-of-funds compliance, not shortcuts.</p></div>
        <div className="lg-item"><h4>Personalised strategy</h4><p>A considered assessment of your goals, family and finances — not a templated checklist.</p></div>
        <div className="lg-item"><h4>Project &amp; Regional Center guidance</h4><p>Independent-minded review of qualifying investment opportunities aligned to your risk tolerance and timeline.</p></div>
        <div className="lg-item"><h4>End-to-end assistance</h4><p>Support from initial eligibility review through petition filing, conditional residency and the path to permanence.</p></div>
        <div className="lg-item"><h4>Transparent process</h4><p>Clear timelines, honest expectations and plain answers about what is — and isn't — within reach.</p></div>
      </div>
    </div>
  </div>
</section>

{/* ===== FAQ ===== */}
<section className="block faq" id="faq">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Frequently Asked Questions</span>
      <h2>Clear answers, accurately stated</h2>
    </div>
    <div className="faq-wrap">
      <div className={`faq-item reveal ${openFaq===0 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(0)}>What is the EB-5 Visa?<span className="pm">{openFaq===0 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===0 ? "600px" : "0"}}><p>The EB-5 Immigrant Investor Program is a United States visa category created by Congress in 1990. It grants lawful permanent residence — a Green Card — to foreign nationals who make a qualifying investment in a new commercial enterprise that creates jobs for American workers.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===1 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(1)}>How much do I need to invest in 2026?<span className="pm">{openFaq===1 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===1 ? "600px" : "0"}}><p>As of 2026, the minimum investment is $800,000 for projects located in a Targeted Employment Area — a rural area or a region of high unemployment — or $1,050,000 for projects outside such an area. These thresholds are scheduled for inflation review every five years.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===2 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(2)}>What is a Targeted Employment Area?<span className="pm">{openFaq===2 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===2 ? "600px" : "0"}}><p>A Targeted Employment Area is a rural location or a region with unemployment significantly above the national average. Investing in a qualifying TEA project allows access to the lower $800,000 investment threshold.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===3 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(3)}>How many jobs must my investment create?<span className="pm">{openFaq===3 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===3 ? "600px" : "0"}}><p>Each EB-5 investment must create or preserve at least 10 full-time positions for qualifying US workers within the required timeframe, whether through a direct investment or a Regional Center project.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===4 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(4)}>What is the difference between a Regional Center and a direct investment?<span className="pm">{openFaq===4 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===4 ? "600px" : "0"}}><p>A Regional Center investment is a passive, pooled investment into a USCIS-designated project and is the route used by the large majority of investors. A direct investment requires the investor to actively manage a qualifying commercial enterprise. Both require the same minimum investment and job-creation outcome.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===5 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(5)}>Can my family be included in my application?<span className="pm">{openFaq===5 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===5 ? "600px" : "0"}}><p>Yes. The principal investor's spouse and unmarried children under the age of 21 may be included as dependants, each receiving a Green Card with the same rights as the principal applicant.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===6 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(6)}>Does the EB-5 Visa lead to a permanent Green Card?<span className="pm">{openFaq===6 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===6 ? "600px" : "0"}}><p>Yes. Investors applying from outside the US typically receive a Conditional Green Card after their petition is approved, generally valid for a two-year period. Filing to remove conditions can then lead to a Permanent Green Card, provided the investment and job-creation requirements have been satisfied.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===7 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(7)}>Can EB-5 Green Card holders apply for citizenship?<span className="pm">{openFaq===7 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===7 ? "600px" : "0"}}><p>Yes. EB-5 investors and their included family members may generally apply for naturalisation after five years of continuous lawful permanent residence in the United States, subject to standard residency, physical presence and good-character requirements.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===8 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(8)}>How long does the EB-5 process take?<span className="pm">{openFaq===8 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===8 ? "600px" : "0"}}><p>Processing of the initial I-526E investor petition commonly takes in the region of three to four years, depending on USCIS workload and the applicant's country of birth. When combined with consular processing, the conditional Green Card stage and associated waiting periods, however, the total timeline to relocating and obtaining conditional permanent residence is typically closer to five to six years overall. Investors should also plan for a five-to-seven-year capital commitment cycle before return of funds becomes possible, depending on the project structure.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===9 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(9)}>Do EB-5 investors need to speak English or pass an exam?<span className="pm">{openFaq===9 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===9 ? "600px" : "0"}}><p>No. The EB-5 programme does not require English language proficiency, a minimum age, prior business or managerial experience, or a sponsoring employer or relative.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===10 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(10)}>Is my EB-5 investment guaranteed to be returned?<span className="pm">{openFaq===10 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===10 ? "600px" : "0"}}><p>No. EB-5 investments must remain genuinely at risk, and there can be no guarantee of capital return while conditional status applies. Careful project due diligence is essential before committing funds.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===11 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(11)}>Can I apply for EB-5 while already living in the United States?<span className="pm">{openFaq===11 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===11 ? "600px" : "0"}}><p>Investors already in the US on a valid visa may, in certain circumstances, file for adjustment of status alongside their investor petition, which can allow for earlier access to work authorisation and travel permission.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===12 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(12)}>How many EB-5 Regional Centers exist in the United States?<span className="pm">{openFaq===12 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===12 ? "600px" : "0"}}><p>There are approximately 640 USCIS-designated Regional Centers operating across the United States, offering qualifying EB-5 investment projects across a wide range of sectors, regions and risk profiles. Regional Centers facilitate pooled, passive investment by managing approved commercial projects that satisfy the programme's job-creation requirements. The minimum investment applicable to any given project depends on whether it is located within a Targeted Employment Area.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===13 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(13)}>Does processing time vary by country of birth?<span className="pm">{openFaq===13 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===13 ? "600px" : "0"}}><p>Yes. Annual visa availability is allocated by country of birth, which means investors from higher-demand countries may experience longer overall waiting times than investors from other countries.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===14 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(14)}>What additional costs should I budget for beyond the investment itself?<span className="pm">{openFaq===14 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===14 ? "600px" : "0"}}><p>In addition to the qualifying investment — starting from USD 800,000 for TEA-based projects and USD 1,050,000 outside a TEA — investors should budget for a range of government and administrative costs. These typically include a USCIS registration fee of USD 1,000 per family, an I-526E petition filing fee of USD 11,160 per family, I-485 adjustment of status fees (USD 1,440 per adult applicant, USD 950 for children under 14), a Green Card application fee of USD 345 and issuance fee of USD 325 per applicant, an I-829 fee of USD 9,525 to remove conditions, biometric services fees of USD 85 per applicant, and Regional Center administrative fees — commonly in the region of USD 70,000 per investor, though this varies by project. Health insurance costs start from approximately USD 560 per month and will vary by plan and family size. All government fees are set by USCIS and are subject to change; applicants should confirm current figures with their legal advisors before proceeding.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===15 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(15)}>Why should I work with Langma International on my EB-5 application?<span className="pm">{openFaq===15 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===15 ? "600px" : "0"}}><p>Langma International provides compliance-first, end-to-end guidance — from eligibility review and project selection through to petition filing and long-term residency planning — with introductions to licensed US immigration attorneys where required.</p></div>
      </div>
    </div>
  </div>
</section>

{/* ===== LEAD FORM ===== */}
<section className="block lead-sec" id="lead">
  <div className="container">
    <div className="lead-grid">
      <div className="lead-copy reveal">
        <span className="eyebrow">Begin Your Journey</span>
        <h2>Begin your US Green Card journey with expert guidance</h2>
        <p>Share a few details and a Langma International advisor will arrange a confidential consultation to assess your eligibility and outline a realistic path forward — with no obligation.</p>
        <ul className="lead-assure">
          <li>Strictly confidential, no-obligation review</li>
          <li>Honest assessment of your eligibility</li>
          <li>Clear timelines and transparent guidance</li>
          <li>Introductions to licensed US immigration attorneys</li>
        </ul>
      </div>
      <div className="form-card reveal">
        <h3>Request a private consultation</h3>
        <p className="fsub">We typically respond within one business day.</p>
        <form id="lead-form" onSubmit={handleLeadSubmit} noValidate>
          <div className="frow">
            <div className="field"><label htmlFor="fname">First name</label><input type="text" id="fname" required /></div>
            <div className="field"><label htmlFor="lname">Last name</label><input type="text" id="lname" required /></div>
          </div>
          <div className="field"><label htmlFor="email">Email address</label><input type="email" id="email" required /></div>
          <div className="frow">
            <div className="field"><label htmlFor="phone">Phone</label><input type="tel" id="phone" placeholder="+ Country code" /></div>
            <div className="field"><label htmlFor="country">Country of residence</label><input type="text" id="country" /></div>
          </div>
          <div className="field">
            <label htmlFor="income">Intended investment range</label>
            <select id="income">
              <option value="">Please select</option>
              <option>$800,000 (Targeted Employment Area)</option>
              <option>$1,050,000 (Outside TEA)</option>
              <option>Above $1,050,000</option>
              <option>Still exploring options</option>
            </select>
          </div>
          <button type="submit" className="btn btn-gold" disabled={leadLoading}>{leadLoading ? 'Sending...' : 'Request Consultation'}</button>
          <p className="disc">By submitting, you agree to be contacted about your enquiry. Your details are kept confidential.</p>
          {leadMsg && <div className={`success show ${leadSuccess ? '' : 'form-msg error'}`}>{leadMsg}</div>}
        </form>
      </div>
    </div>
  </div>
</section>

{/* ===== OFFICE VISIT ===== */}
<section className="block office" id="office-visit">
  <div className="container">
    <div className="office-grid">
      <div className="office-copy reveal">
        <span className="eyebrow">In Person</span>
        <h2>Schedule a private office consultation</h2>
        <p>Prefer to meet face to face? Sit down with our advisory team to talk through your eligibility and investment options in confidence.</p>
        <ul className="office-points">
          <li><span className="oi">✦</span><div><h4>Meet our advisory team</h4><p>A direct conversation with the people who will guide your case.</p></div></li>
          <li><span className="oi">✓</span><div><h4>Discuss your eligibility</h4><p>An honest review of your investment capacity, family and timeline.</p></div></li>
          <li><span className="oi">↪</span><div><h4>Understand your options</h4><p>Compare Regional Center and direct-investment routes where relevant.</p></div></li>
        </ul>
      </div>
      <div className="office-form reveal">
        <h3>Book your visit</h3>
        <form id="office-form" onSubmit={handleOfficeSubmit} noValidate>
          <div className="field"><label htmlFor="ov-name">Full name</label><input type="text" id="ov-name" required /></div>
          <div className="frow">
            <div className="field"><label htmlFor="ov-phone">Phone</label><input type="tel" id="ov-phone" placeholder="+ Country code" required /></div>
            <div className="field"><label htmlFor="ov-email">Email</label><input type="email" id="ov-email" required /></div>
          </div>
          <div className="frow">
            <div className="field"><label htmlFor="ov-date">Preferred date</label><input type="date" id="ov-date" min={new Date().toISOString().split('T')[0]} required /></div>
            <div className="field"><label htmlFor="ov-time">Preferred time</label>
              <select id="ov-time" required>
                <option value="">Select</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-navy" disabled={officeLoading}>{officeLoading ? 'Sending...' : 'Request Office Visit'}</button>
          {officeMsg && <div className={`success show ${officeSuccess ? '' : 'form-msg error'}`}>{officeMsg}</div>}
        </form>
      </div>
    </div>
  </div>
</section>
      </main>
    </div>
  );
};

export default LangmaEB5USAPage;