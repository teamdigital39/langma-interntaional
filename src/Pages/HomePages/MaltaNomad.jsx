import React, { useState, useEffect } from 'react';
import { useResidencyLeadForms } from '../../hooks/useResidencyLeadForms';

const SERVICE = 'Malta Nomad Residence Permit';

const LangmaMaltaNomadPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    handleLeadSubmit,
    leadLoading,
    leadSubmitted,
    leadMsg, leadSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Malta Nomad Consultation', leadOnly: true, requirePhone: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
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
  .lg-page{
    --navy:#296166;
    --navy-deep:#296166;
    --navy-mid:#296166;
    --gold:#6FE0C6;
    --gold-soft:#6FE0C6;
    --gold-deep:#296166;
    --ivory:#F5F8F6;
    --beige:#E9F1EE;
    --charcoal:#296166;
    --muted:#296166;
    --line:rgba(47,199,161,0.30);
    --radius:4px;
    --shadow-soft:0 18px 50px rgba(26,37,64,0.10);
    --shadow-strong:0 30px 70px rgba(26,37,64,0.22);
    --ease:cubic-bezier(.22,.61,.36,1);
  }

  .lg-page *{margin:0;padding:0;box-sizing:border-box;}
  .lg-page{scroll-behavior:smooth;}
  .lg-page{
    font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
    color:var(--charcoal);
    background:var(--ivory);
    line-height:1.7;
    font-weight:400;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  .lg-page h1, .lg-page h2, .lg-page h3, .lg-page h4{
    font-family:'Cormorant Garamond',Georgia,serif;
    font-weight:600;
    color:var(--navy);
    line-height:1.12;
    letter-spacing:0.2px;
  }
  .lg-page p{font-weight:400;}
  .lg-page a{color:inherit;text-decoration:none;}
  .lg-page img{display:block;width:100%;height:100%;object-fit:cover;}
  .lg-page .container{max-width:1200px;margin:0 auto;padding:0 30px;}
  .lg-page .block{padding:108px 0;}
  .lg-page .eyebrow{
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
  .lg-page .eyebrow::before{content:"";width:34px;height:1px;background:var(--gold);display:inline-block;}
  .lg-page .eyebrow.center{justify-content:center;}
  .lg-page .section-head{max-width:760px;margin:0 auto 60px;text-align:center;}
  .lg-page .section-head h2{font-size:clamp(34px,4.6vw,54px);margin-bottom:18px;}
  .lg-page .section-head p{color:var(--muted);font-size:17px;}

  .lg-page .btn{
    display:inline-flex;align-items:center;gap:10px;
    font-family:'Inter',sans-serif;font-size:14px;font-weight:600;
    letter-spacing:0.4px;padding:16px 32px;border-radius:var(--radius);
    cursor:pointer;border:1px solid transparent;transition:all .35s var(--ease);
  }
  .lg-page .btn-gold{background:var(--gold);color:var(--navy-deep);}
  .lg-page .btn-gold:hover{background:var(--gold-soft);transform:translateY(-2px);box-shadow:0 14px 30px rgba(194,161,94,.32);}
  .lg-page .btn-ghost{background:transparent;color:#1A2540;border:2px solid #2FC7A1;}
  .lg-page .btn-ghost:hover{border-color:var(--gold);color:var(--gold-soft);}
  .lg-page .btn-navy{background:var(--navy);color:var(--ivory);}
  .lg-page .btn-navy:hover{background:var(--navy-mid);transform:translateY(-2px);}

  /* ===== MALTESE CROSS DIVIDER ===== */
  .lg-page .cross-divider{
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
  .lg-page header{position:fixed;top:0;left:0;right:0;z-index:1000;padding:22px 0;transition:all .4s var(--ease);}
  .lg-page header.scrolled{background:rgba(41,97,102,0.94);backdrop-filter:blur(10px);padding:14px 0;box-shadow:0 6px 30px rgba(0,0,0,.25);}
  .lg-page .nav-wrap{display:flex;align-items:center;justify-content:space-between;}
  .lg-page .brand{display:flex;flex-direction:column;line-height:1;}
  .lg-page .brand .name{font-family:'Cormorant Garamond',serif;font-size:25px;font-weight:600;color:var(--ivory);letter-spacing:1px;}
  .lg-page .brand .tag{font-family:'Inter',sans-serif;font-size:9.5px;letter-spacing:3.5px;text-transform:uppercase;color:var(--gold-soft);margin-top:4px;}
  .lg-page .nav-links{display:flex;align-items:center;gap:34px;}
  .lg-page .nav-links a{font-size:13.5px;font-weight:500;color:rgba(247,250,252,.85);letter-spacing:.3px;transition:color .25s;}
  .lg-page .nav-links a:hover{color:var(--gold-soft);}
  .lg-page .nav-cta{padding:11px 24px;font-size:13px;background:var(--gold);color:var(--navy-deep);border-radius:var(--radius);font-weight:600;transition:all .3s;}
  .lg-page .nav-cta:hover{background:var(--gold-soft);}
  .lg-page .burger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;}
  .lg-page .burger span{width:24px;height:2px;background:var(--ivory);display:block;}

  /* ===== HERO ===== */
  .lg-page .hero{
    position:relative;min-height:auto;display:flex;align-items:center;
    color:#1B2B28;overflow:hidden;
    background:#FFFFFF;padding:72px 0 48px;
  }
  .lg-page .hero::before{
    content:"";position:absolute;left:30px;top:96px;bottom:96px;width:3px;border-radius:999px;
    background:linear-gradient(to bottom,transparent,#2FC7A1,transparent);
    z-index:0;pointer-events:none;inset:auto;
  }
  .lg-page .hero-split{
    position:relative;z-index:2;width:100%;
    display:grid;grid-template-columns:1fr 1fr;gap:64px;
    align-items:center;padding-top:0;padding-bottom:0;
  }
  .lg-page .hero-copy{display:flex;flex-direction:column;}
  .lg-page .hero h1{font-size:clamp(38px,5vw,68px);color:#1B2B28;margin-bottom:26px;font-weight:600;line-height:1.08;}
  .lg-page .hero h1 em{font-style:italic;color:#4FA3D1;font-weight:500;}
  .lg-page .hero .lead{font-size:17.5px;color:#4C5C58;max-width:560px;margin-bottom:38px;font-weight:300;line-height:1.72;}
  .lg-page .hero-cta{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:48px;}
  .lg-page .hero-badges{display:flex;gap:36px;flex-wrap:wrap;border-top:1px solid rgba(247,250,252,.18);padding-top:28px;}
  .lg-page .hero-badge .num{font-family:'Cormorant Garamond',serif;font-size:30px;color:var(--gold-soft);font-weight:600;line-height:1;}
  .lg-page .hero-badge .lbl{font-size:11.5px;letter-spacing:.6px;color:rgba(247,250,252,.68);margin-top:6px;}

  .lg-page .hero-visual{display:flex;align-items:center;justify-content:center;position:relative;}
  .lg-page .hero-img-frame{
    position:relative;width:100%;max-width:520px;
    border-radius:var(--radius);overflow:hidden;
    box-shadow:var(--shadow-strong);
  }
  .lg-page .hero-img-frame img{height:540px;object-fit:cover;}
  .lg-page .hero-img-frame::after{
    content:"";position:absolute;inset:0;
    background:linear-gradient(to top,rgba(26,37,64,.32) 0%,transparent 50%);
  }
  .lg-page .hero-visual::before{
    content:"";position:absolute;top:-28px;right:-28px;
    width:80%;height:80%;border:1px solid rgba(194,161,94,.22);
    border-radius:var(--radius);z-index:-1;
  }
  .lg-page .hero-badge-overlay{
    position:absolute;bottom:28px;left:28px;z-index:10;
    background:rgba(26,37,64,.85);backdrop-filter:blur(10px);
    border:1px solid rgba(194,161,94,.35);border-radius:var(--radius);
    padding:18px 24px;
  }
  .lg-page .hero-badge-overlay .bo-val{font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--gold-soft);font-weight:600;line-height:1;}
  .lg-page .hero-badge-overlay .bo-lbl{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:rgba(247,250,252,.7);margin-top:4px;}

  @media(max-width:980px){
    .lg-page .hero-split{grid-template-columns:1fr;gap:48px;padding-top:0;padding-bottom:32px;}
    .lg-page .hero-img-frame img{height:380px;}
    .lg-page .hero-visual::before{display:none;}
    .lg-page .hero-img-frame{max-width:100%;}
  }
  @media(max-width:640px){
    .lg-page .hero-split{padding-top:0;padding-bottom:24px;gap:36px;}
    .lg-page .hero-img-frame img{height:280px;}
    .lg-page .hero-badges{gap:22px;}
  }

  /* ===== TRUST STATS BAR ===== */
  .lg-page .stats-bar{background:var(--navy-deep);color:var(--ivory);}
  .lg-page .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;}
  .lg-page .stat-cell{padding:52px 30px;text-align:center;border-right:1px solid rgba(247,250,252,.10);}
  .lg-page .stat-cell:last-child{border-right:none;}
  .lg-page .stat-cell .v{font-family:'Cormorant Garamond',serif;font-size:46px;font-weight:600;color:var(--gold-soft);line-height:1;margin-bottom:12px;}
  .lg-page .stat-cell .k{font-size:13px;letter-spacing:.5px;color:rgba(247,250,252,.78);}

  /* ===== ABOUT MALTA ===== */
  .lg-page .about{background:var(--ivory);}
  .lg-page .about-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:64px;align-items:center;}
  .lg-page .about-copy h2{font-size:clamp(32px,4.4vw,52px);margin-bottom:22px;}
  .lg-page .about-copy p{color:var(--muted);margin-bottom:18px;font-size:16.5px;}
  .lg-page .about-media{position:relative;height:560px;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-strong);}
  .lg-page .about-media .frame{position:absolute;inset:14px;border:1px solid rgba(247,250,252,.5);z-index:2;pointer-events:none;}
  .lg-page .facts-row{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:54px;}
  .lg-page .fact{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:26px 22px;text-align:center;}
  .lg-page .fact .ff{font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--navy);font-weight:600;}
  .lg-page .fact .fl{font-size:12px;color:var(--muted);letter-spacing:.4px;margin-top:6px;}

  /* ===== WHY MALTA ===== */
  .lg-page .why{background:var(--beige);}
  .lg-page .why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;}
  .lg-page .why-card{background:var(--ivory);padding:42px 34px;transition:background .3s;}
  .lg-page .why-card:hover{background:#fff;}
  .lg-page .why-card .ic{width:46px;height:46px;border:1px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--gold-deep);font-family:'Cormorant Garamond',serif;font-size:21px;margin-bottom:20px;}
  .lg-page .why-card h3{font-size:24px;margin-bottom:10px;}
  .lg-page .why-card p{color:var(--muted);font-size:15px;}

  /* ===== PROGRAMME OVERVIEW ===== */
  .lg-page .prog{background:var(--navy);color:var(--ivory);}
  .lg-page .prog .section-head h2{color:var(--ivory);}
  .lg-page .prog .section-head p{color:rgba(247,250,252,.72);}
  .lg-page .prog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;}
  .lg-page .prog-card{background:rgba(247,250,252,.04);border:1px solid rgba(247,250,252,.12);border-radius:var(--radius);padding:38px 32px;transition:all .35s var(--ease);}
  .lg-page .prog-card:hover{border-color:var(--gold);transform:translateY(-6px);}
  .lg-page .prog-card .no{font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--gold-soft);border-bottom:1px solid rgba(247,250,252,.16);padding-bottom:14px;margin-bottom:18px;letter-spacing:2px;}
  .lg-page .prog-card h3{color:var(--ivory);font-size:25px;margin-bottom:12px;}
  .lg-page .prog-card p{color:rgba(247,250,252,.74);font-size:15px;}

  /* ===== BENEFITS ===== */
  .lg-page .benefits{background:var(--ivory);}
  .lg-page .ben-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .lg-page .ben-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:36px 30px;position:relative;overflow:hidden;transition:all .35s var(--ease);}
  .lg-page .ben-card::before{content:"";position:absolute;top:0;left:0;width:3px;height:0;background:var(--gold);transition:height .4s var(--ease);}
  .lg-page .ben-card:hover{box-shadow:var(--shadow-soft);transform:translateY(-4px);}
  .lg-page .ben-card:hover::before{height:100%;}
  .lg-page .ben-card .mk{font-family:'Cormorant Garamond',serif;font-size:15px;color:var(--gold-deep);letter-spacing:2px;margin-bottom:16px;}
  .lg-page .ben-card h3{font-size:23px;margin-bottom:10px;}
  .lg-page .ben-card p{color:var(--muted);font-size:15px;}

  /* ===== ELIGIBILITY / REQUIREMENTS ===== */
  .lg-page .eligibility{background:var(--beige);}
  .lg-page .elig-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-bottom:40px;}
  .lg-page .elig-block{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:36px 32px;}
  .lg-page .elig-block h3{font-size:26px;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--line);}
  .lg-page .req-list{list-style:none;}
  .lg-page .req-list li{display:flex;gap:14px;padding:13px 0;border-bottom:1px solid rgba(194,161,94,.15);font-size:15px;color:var(--charcoal);}
  .lg-page .req-list li:last-child{border-bottom:none;}
  .lg-page .req-list .tick{flex:0 0 22px;height:22px;border-radius:50%;background:rgba(194,161,94,.15);color:var(--gold-deep);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;margin-top:1px;}

  /* ===== INCOME TABLE ===== */
  .lg-page .income-sec{background:var(--ivory);}
  .lg-page .inc-table{background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-soft);}
  .lg-page .inc-row{display:grid;grid-template-columns:1.6fr 1fr 1fr;align-items:center;border-bottom:1px solid var(--line);}
  .lg-page .inc-row:last-child{border-bottom:none;}
  .lg-page .inc-row.head{background:var(--navy);color:var(--ivory);}
  .lg-page .inc-row.head .ic{color:var(--ivory);font-weight:600;font-family:'Inter',sans-serif;font-size:13px;letter-spacing:.6px;text-transform:uppercase;}
  .lg-page .inc-row.highlight{background:rgba(194,161,94,.10);}
  .lg-page .ic{padding:22px 28px;font-size:15.5px;}
  .lg-page .ic.label{font-weight:600;color:var(--navy);}
  .lg-page .ic.fig{font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--gold-deep);font-weight:600;}
  .lg-page .inc-note{margin-top:22px;font-size:13.5px;color:var(--muted);text-align:center;font-style:italic;}

  /* ===== TAX BANNER ===== */
  .lg-page .tax-banner{background:var(--navy);color:var(--ivory);padding:56px 0;}
  .lg-page .tax-inner{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;}
  .lg-page .tax-inner h2{color:var(--ivory);font-size:clamp(28px,3.8vw,46px);margin-bottom:14px;}
  .lg-page .tax-inner p{color:rgba(247,250,252,.78);font-size:16px;}
  .lg-page .tax-cards{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
  .lg-page .tax-card{background:rgba(247,250,252,.06);border:1px solid rgba(194,161,94,.28);border-radius:var(--radius);padding:30px 26px;}
  .lg-page .tax-card .tv{font-family:'Cormorant Garamond',serif;font-size:42px;color:var(--gold-soft);font-weight:600;line-height:1;margin-bottom:8px;}
  .lg-page .tax-card p{color:rgba(247,250,252,.74);font-size:14.5px;}

  /* ===== FAMILY ===== */
  .lg-page .family{background:var(--ivory);}
  .lg-page .fam-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
  .lg-page .fam-list{list-style:none;}
  .lg-page .fam-list li{display:flex;gap:18px;padding:22px 0;border-bottom:1px solid var(--line);}
  .lg-page .fam-list li:last-child{border-bottom:none;}
  .lg-page .fam-list .fi{flex:0 0 42px;height:42px;border-radius:50%;background:var(--navy);color:var(--gold-soft);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:19px;}
  .lg-page .fam-list h4{font-size:21px;margin-bottom:2px;}
  .lg-page .fam-list p{color:var(--muted);font-size:14.5px;}
  .lg-page .fam-media{height:520px;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-strong);position:relative;}
  .lg-page .fam-media .frame{position:absolute;inset:14px;border:1px solid rgba(247,250,252,.5);z-index:2;}

  /* ===== PROCESS TIMELINE ===== */
  .lg-page .process{background:var(--navy-deep);color:var(--ivory);}
  .lg-page .process .section-head h2{color:var(--ivory);}
  .lg-page .process .section-head p{color:rgba(247,250,252,.72);}
  .lg-page .timeline{position:relative;max-width:880px;margin:0 auto;}
  .lg-page .timeline::before{content:"";position:absolute;left:31px;top:8px;bottom:8px;width:1px;background:rgba(247,250,252,.18);}
  .lg-page .tl-item{position:relative;padding-left:92px;padding-bottom:44px;}
  .lg-page .tl-item:last-child{padding-bottom:0;}
  .lg-page .tl-item .dot{position:absolute;left:0;top:0;width:64px;height:64px;border-radius:50%;border:1px solid var(--gold);background:var(--navy-deep);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--gold-soft);}
  .lg-page .tl-item h3{color:var(--ivory);font-size:25px;margin-bottom:6px;}
  .lg-page .tl-item p{color:rgba(247,250,252,.72);font-size:15px;max-width:620px;}

  /* ===== LIFE IN MALTA ===== */
  .lg-page .life{background:var(--ivory);}
  .lg-page .life-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .lg-page .life-card{position:relative;height:420px;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-soft);}
  .lg-page .life-card img{transition:transform .8s var(--ease);}
  .lg-page .life-card:hover img{transform:scale(1.06);}
  .lg-page .life-card .ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(26,37,64,.88) 0%,rgba(26,37,64,.18) 55%,transparent 100%);z-index:1;}
  .lg-page .life-card .cap{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:30px 28px;}
  .lg-page .life-card .cap h3{color:var(--ivory);font-size:27px;margin-bottom:6px;}
  .lg-page .life-card .cap p{color:rgba(247,250,252,.82);font-size:14px;}
  .lg-page .life-strip{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:48px;}
  .lg-page .life-tag{border:1px solid var(--line);border-radius:40px;padding:10px 22px;font-size:13.5px;color:var(--navy);background:#fff;}

  /* ===== WHY LANGMA ===== */
  .lg-page .langma{background:var(--navy);color:var(--ivory);position:relative;overflow:hidden;}
  .lg-page .langma-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:64px;align-items:center;}
  .lg-page .langma h2{color:var(--ivory);font-size:clamp(32px,4.4vw,52px);margin-bottom:20px;}
  .lg-page .langma .lead{color:rgba(247,250,252,.82);font-size:17px;margin-bottom:14px;}
  .lg-page .lg-list{display:grid;grid-template-columns:1fr 1fr;gap:30px 36px;}
  .lg-page .lg-item h4{color:var(--gold-soft);font-size:22px;margin-bottom:6px;}
  .lg-page .lg-item p{color:rgba(247,250,252,.72);font-size:14.5px;}

  /* ===== FAQ ===== */
  .lg-page .faq{background:var(--ivory);}
  .lg-page .faq-wrap{max-width:880px;margin:0 auto;}
  .lg-page .faq-item{border-bottom:1px solid var(--line);}
  .lg-page .faq-q{width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:28px 0;display:flex;justify-content:space-between;align-items:center;gap:24px;font-family:'Cormorant Garamond',serif;font-size:23px;color:var(--navy);font-weight:600;}
  .lg-page .faq-q .pm{flex:0 0 30px;height:30px;border:1px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--gold-deep);font-family:'Inter',sans-serif;font-size:18px;transition:all .3s;}
  .lg-page .faq-item.open .pm{background:var(--gold);color:var(--navy);transform:rotate(45deg);}
  .lg-page .faq-a{max-height:0;overflow:hidden;transition:max-height .4s var(--ease);}
  .lg-page .faq-a p{padding:0 0 28px;color:var(--muted);font-size:16px;max-width:760px;}

  /* ===== LEAD FORM ===== */
  .lg-page .lead-sec{background:var(--navy-deep);color:var(--ivory);}
  .lg-page .lead-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:64px;align-items:start;}
  .lg-page .lead-copy .eyebrow{color:var(--gold-soft);}
  .lg-page .lead-copy .eyebrow::before{background:var(--gold-soft);}
  .lg-page .lead-copy h2{color:var(--ivory);font-size:clamp(32px,4.2vw,50px);margin-bottom:20px;}
  .lg-page .lead-copy p{color:rgba(247,250,252,.80);margin-bottom:26px;font-size:16.5px;}
  .lg-page .lead-assure{list-style:none;}
  .lg-page .lead-assure li{display:flex;gap:12px;align-items:center;padding:11px 0;color:rgba(247,250,252,.86);font-size:15px;}
  .lg-page .lead-assure li::before{content:"✓";color:var(--gold-soft);font-weight:700;}
  .lg-page .form-card{background:var(--ivory);border-radius:var(--radius);padding:42px;box-shadow:var(--shadow-strong);}
  .lg-page .form-card h3{font-size:27px;margin-bottom:6px;}
  .lg-page .form-card .fsub{color:var(--muted);font-size:14.5px;margin-bottom:26px;}
  .lg-page .frow{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .lg-page .field{margin-bottom:16px;}
  .lg-page .field label{display:block;font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:var(--navy);font-weight:600;margin-bottom:7px;}
  .lg-page .field input, .lg-page .field select, .lg-page .field textarea{width:100%;padding:13px 15px;border:1px solid var(--line);border-radius:var(--radius);font-family:'Inter',sans-serif;font-size:15px;background:#fff;color:var(--charcoal);transition:border-color .25s;}
  .lg-page .field textarea{resize:vertical;min-height:90px;}
  .lg-page .field input:focus, .lg-page .field select:focus, .lg-page .field textarea:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(194,161,94,.15);}
  .lg-page .form-card .btn{width:100%;justify-content:center;margin-top:6px;}
  .lg-page .form-card .disc{font-size:12px;color:var(--muted);margin-top:14px;text-align:center;}
  .lg-page .success{display:none;background:rgba(194,161,94,.14);border:1px solid var(--gold);border-radius:var(--radius);padding:16px;color:var(--gold-deep);font-size:14.5px;text-align:center;margin-top:16px;}
  .lg-page .success.show{display:block;}

  /* ===== FOOTER ===== */
  .lg-page footer{background:var(--navy-deep);color:rgba(247,250,252,.7);padding:74px 0 32px;}
  .lg-page .foot-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.3fr;gap:44px;margin-bottom:50px;}
  .lg-page .foot-brand .name{font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--ivory);font-weight:600;letter-spacing:1px;}
  .lg-page .foot-brand .tag{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--gold-soft);margin:6px 0 18px;}
  .lg-page .foot-brand p{font-size:14px;max-width:320px;}
  .lg-page .foot-col h4{color:var(--ivory);font-size:18px;margin-bottom:18px;font-weight:600;}
  .lg-page .foot-col a{display:block;font-size:14px;padding:6px 0;transition:color .25s;}
  .lg-page .foot-col a:hover{color:var(--gold-soft);}
  .lg-page .foot-bottom{border-top:1px solid rgba(247,250,252,.12);padding-top:26px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:14px;font-size:12.5px;}
  .lg-page .legal{max-width:980px;font-size:11.5px;color:rgba(247,250,252,.5);line-height:1.7;margin-top:18px;}

  /* ===== REVEAL ANIMATION ===== */
  .lg-page .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s var(--ease),transform .7s var(--ease);}
  .lg-page .reveal.in{opacity:1;transform:none;}

  /* ===== RESPONSIVE ===== */
  @media(max-width:980px){
    .lg-page .nav-links{display:none;}
    .lg-page .burger{display:flex;}
    .lg-page .about-grid, .lg-page .fam-grid, .lg-page .langma-grid, .lg-page .lead-grid, .lg-page .tax-inner{grid-template-columns:1fr;gap:40px;}
    .lg-page .stats-grid, .lg-page .why-grid, .lg-page .prog-grid, .lg-page .ben-grid, .lg-page .life-grid, .lg-page .elig-grid{grid-template-columns:1fr 1fr;}
    .lg-page .facts-row{grid-template-columns:1fr 1fr;}
    .lg-page .lg-list{grid-template-columns:1fr;}
    .lg-page .about-media, .lg-page .fam-media{height:420px;}
    .lg-page .tax-cards{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:640px){
    .lg-page .block{padding:74px 0;}
    .lg-page .container{padding:0 22px;}
    .lg-page .stats-grid, .lg-page .why-grid, .lg-page .prog-grid, .lg-page .ben-grid, .lg-page .life-grid, .lg-page .elig-grid, .lg-page .facts-row, .lg-page .tax-cards{grid-template-columns:1fr;}
    .lg-page .stat-cell{border-right:none;border-bottom:1px solid rgba(247,250,252,.10);}
    .lg-page .frow{grid-template-columns:1fr;}
    .lg-page .inc-row{grid-template-columns:1fr;}
    .lg-page .ic{padding:14px 20px;}
    .lg-page .inc-row.head{display:none;}
    .lg-page .hero-badges{gap:26px;}
    .lg-page .form-card{padding:30px;}
    .lg-page .foot-grid{grid-template-columns:1fr 1fr;}
  }
  @media(prefers-reduced-motion:reduce){
    .lg-page *{animation:none!important;transition:none!important;}
    .lg-page .reveal{opacity:1;transform:none;}
  }

  /* ===== SCHEDULE CONSULTATION SECTION ===== */
  .lg-page .schedule{background:var(--beige);}
  .lg-page .schedule-grid{display:grid;grid-template-columns:1fr 1.05fr;gap:64px;align-items:start;}
  .lg-page .schedule-copy h2{font-size:clamp(30px,4vw,48px);margin-bottom:20px;}
  .lg-page .schedule-copy p{color:var(--muted);font-size:16.5px;margin-bottom:26px;}
  .lg-page .sched-points{list-style:none;margin-bottom:36px;}
  .lg-page .sched-points li{display:flex;gap:16px;padding:16px 0;border-bottom:1px solid var(--line);}
  .lg-page .sched-points li:last-child{border-bottom:none;}
  .lg-page .sched-points .si{flex:0 0 40px;height:40px;border-radius:50%;border:1px solid var(--gold);color:var(--gold-deep);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:19px;flex-shrink:0;}
  .lg-page .sched-points h4{font-size:19px;margin-bottom:2px;color:var(--navy);}
  .lg-page .sched-points p{color:var(--muted);font-size:14px;margin:0;}
  .lg-page .office-trust{background:var(--navy);border-radius:var(--radius);padding:28px 30px;margin-top:32px;}
  .lg-page .office-trust h4{color:var(--gold-soft);font-size:22px;margin-bottom:10px;}
  .lg-page .office-trust p{color:rgba(247,250,252,.78);font-size:14.5px;margin-bottom:0;}
  .lg-page .sched-form{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:44px;box-shadow:var(--shadow-strong);}
  .lg-page .sched-form h3{font-size:27px;margin-bottom:6px;}
  .lg-page .sched-form .fsub{color:var(--muted);font-size:14.5px;margin-bottom:28px;}
  .lg-page .sched-form .btn{width:100%;justify-content:center;margin-top:8px;}
  .lg-page .sched-form .disc{font-size:12px;color:var(--muted);margin-top:14px;text-align:center;}
  @media(max-width:980px){
    .lg-page .schedule-grid{grid-template-columns:1fr;gap:40px;}
  }

  /* Mobile nav open state */
  .lg-page .nav-links.open{
    display:flex;flex-direction:column;
    position:fixed;inset:0;background:var(--navy-deep);
    justify-content:center;align-items:center;gap:28px;z-index:999;
  }
  .lg-page .nav-links.open a{font-size:24px;color:var(--ivory);}
  .lg-page .nav-close{display:none;position:fixed;top:26px;right:30px;background:none;border:none;color:var(--ivory);font-size:30px;cursor:pointer;z-index:1000;}
  .lg-page .nav-links.open ~ .nav-close{display:block;}

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
  <div className="container">
    <div className="hero-split">

      {/* LEFT: copy */}
      <div className="hero-copy reveal">
        <span className="eyebrow">Malta Nomad Residence Permit · Mediterranean European Residency for Remote Workers</span>
        <h1>Live in Malta. Work from anywhere. Experience <em>European life</em> on your own terms.</h1>
        <p className="lead">Malta's Nomad Residence Permit offers non-EU remote professionals, freelancers and the self-employed a structured, government-backed pathway to live on this extraordinary Mediterranean island — while continuing to work for clients and employers worldwide. Langma International guides you through every stage with precision, discretion and a compliance-first approach.</p>
        <div className="hero-cta">
          <a href="#lead" className="btn btn-gold">Request a Private Consultation ↗</a>
          <a href="#programme" className="btn btn-ghost">Discover the Programme</a>
        </div>
        <div className="hero-badges">
          <div className="hero-badge">
            <div className="num">€3,500+</div>
            <div className="lbl">Minimum monthly income</div>
          </div>
          <div className="hero-badge">
            <div className="num">1 Year</div>
            <div className="lbl">Permit validity (renewable)</div>
          </div>
          <div className="hero-badge">
            <div className="num">4 Years</div>
            <div className="lbl">Maximum permitted stay</div>
          </div>
          <div className="hero-badge">
            <div className="num">Schengen</div>
            <div className="lbl">Area travel access</div>
          </div>
        </div>
      </div>

      {/* RIGHT: visual */}
      <div className="hero-visual reveal">
        <div className="hero-img-frame">
          {/* Hero: Live in Malta. Work from anywhere. */}
          <img src="/images/malta-nomad/hero-live-work.png" alt="Remote professional working from a balcony overlooking Valletta harbour, Malta" />
          <div className="hero-badge-overlay">
            <div className="bo-val">EU Member State</div>
            <div className="bo-lbl">Schengen Area · English Official Language</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

{/* ===== TRUST STATS BAR ===== */}
<section className="stats-bar">
  <div className="container">
    <div className="stats-grid">
      <div className="stat-cell reveal">
        <div className="v">€3,500</div>
        <div className="k">Minimum monthly income required</div>
      </div>
      <div className="stat-cell reveal">
        <div className="v">2+</div>
        <div className="k">Months typical processing period</div>
      </div>
      <div className="stat-cell reveal">
        <div className="v">10%</div>
        <div className="k">Flat tax rate after initial exemption year</div>
      </div>
      <div className="stat-cell reveal">
        <div className="v">29</div>
        <div className="k">Schengen countries accessible to permit holders</div>
      </div>
    </div>
  </div>
</section>

<div className="cross-divider" aria-hidden="true"></div>

{/* ===== ABOUT MALTA ===== */}
<section className="block about" id="about">
  <div className="container">
    <div className="about-grid">

      <div className="about-copy">
        <span className="eyebrow">Discover Malta</span>
        <h2>A sovereign island nation at the heart of Europe</h2>
        <p>Positioned at the crossroads of the Mediterranean, Malta is one of Europe's most remarkable destinations for globally mobile professionals and their families. As a full EU Member State and part of the Schengen Area, it offers the rare combination of warm Mediterranean living with access to European freedoms — all in a compact, exceptionally connected island environment.</p>
        <p>English is one of Malta's two official languages, spoken fluently by the vast majority of the population. This removes language barriers that often accompany relocation to other European destinations, making the experience of building a new life here genuinely accessible from day one. Malta's legal and regulatory frameworks are EU-aligned and internationally respected.</p>
        <p>The island enjoys more than 300 days of sunshine annually, a rich cultural heritage spanning thousands of years and a thriving international business community. Healthcare standards are high, international schooling options are well established, and the quality of daily life — from world-class restaurants to pristine coastlines — consistently places Malta among the most desirable destinations for educated, globally minded families.</p>
        <a href="#lead" className="btn btn-navy" style={{marginTop: '10px', alignSelf: 'flex-start'}}>Speak with a Malta Specialist</a>
      </div>

      <div className="about-media reveal">
        <span className="frame"></span>
        {/* Unsplash: Malta Valletta colourful architecture or Blue Lagoon Comino */}
        <img src="/images/malta-nomad/sovereign-island.png" alt="Fort Saint Elmo and Valletta peninsula from above, Malta" />
      </div>

    </div>

    {/* Facts cards */}
    <div className="facts-row">
      <div className="fact reveal">
        <div className="ff">~530K</div>
        <div className="fl">Population</div>
      </div>
      <div className="fact reveal">
        <div className="ff">EN / MT</div>
        <div className="fl">Official Languages</div>
      </div>
      <div className="fact reveal">
        <div className="ff">Euro (€)</div>
        <div className="fl">Currency</div>
      </div>
      <div className="fact reveal">
        <div className="ff">2004</div>
        <div className="fl">EU Member Since</div>
      </div>
      <div className="fact reveal">
        <div className="ff">Valletta</div>
        <div className="fl">Capital City</div>
      </div>
      <div className="fact reveal">
        <div className="ff">Schengen</div>
        <div className="fl">Area Member</div>
      </div>
      <div className="fact reveal">
        <div className="ff">300+</div>
        <div className="fl">Sunny Days/Year</div>
      </div>
      <div className="fact reveal">
        <div className="ff">5G</div>
        <div className="fl">Island-Wide Connectivity</div>
      </div>
    </div>

  </div>
</section>

<div className="cross-divider" aria-hidden="true"></div>

{/* ===== WHY CHOOSE MALTA ===== */}
<section className="block why" id="why">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Why Malta</span>
      <h2>Eight compelling reasons to make Malta your base</h2>
      <p>For globally minded professionals seeking a high-quality, EU-connected lifestyle, Malta presents a case that is difficult to match anywhere in the Mediterranean.</p>
    </div>
    <div className="why-grid">
      <div className="why-card reveal">
        <div className="ic">✦</div>
        <h3>English-speaking society</h3>
        <p>With English as an official language spoken by approximately 88% of the population, Malta is one of the easiest EU destinations for international professionals to integrate into naturally.</p>
      </div>
      <div className="why-card reveal">
        <div className="ic">☀</div>
        <h3>Mediterranean climate &amp; lifestyle</h3>
        <p>More than 300 days of sunshine annually, a Mediterranean coastal lifestyle, world-renowned cuisine and a gentle pace of daily life that rewards families and professionals alike.</p>
      </div>
      <div className="why-card reveal">
        <div className="ic">⚖</div>
        <h3>EU law and stability</h3>
        <p>Malta operates under a robust, EU-aligned legal framework with strong property rights, independent judiciary and the institutional certainty of a long-standing European democracy.</p>
      </div>
      <div className="why-card reveal">
        <div className="ic">✚</div>
        <h3>Quality healthcare</h3>
        <p>Both public and private healthcare services of a high standard, with English-speaking medical professionals, modern facilities and access to the broader EU healthcare network.</p>
      </div>
      <div className="why-card reveal">
        <div className="ic">✎</div>
        <h3>International education</h3>
        <p>A well-developed international and bilingual school ecosystem serving the large expatriate community, alongside strong Maltese state and private educational institutions.</p>
      </div>
      <div className="why-card reveal">
        <div className="ic">⌖</div>
        <h3>Strategic global connectivity</h3>
        <p>Malta International Airport connects directly to major European hubs, with short flight times across the continent and onward connections to the wider world.</p>
      </div>
      <div className="why-card reveal">
        <div className="ic">⚡</div>
        <h3>5G digital infrastructure</h3>
        <p>Island-wide 5G coverage and fast fibre broadband make Malta one of the best-connected small nations in Europe — an essential feature for remote professionals.</p>
      </div>
      <div className="why-card reveal">
        <div className="ic">⊕</div>
        <h3>Safety &amp; community</h3>
        <p>Consistently among Europe's safest environments, with a welcoming, internationally diverse community and a deep-rooted culture of hospitality that makes newcomers feel genuinely at home.</p>
      </div>
      <div className="why-card reveal">
        <div className="ic">❋</div>
        <h3>Schengen freedom of movement</h3>
        <p>As a Schengen member state, Malta's residence permit enables short-stay travel across 29 European countries — giving you the freedom to explore the continent from your Mediterranean home.</p>
      </div>
    </div>
  </div>
</section>

{/* ===== PROGRAMME OVERVIEW ===== */}
<section className="block prog" id="programme">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center" style={{color: 'var(--gold-soft)'}}>The Programme</span>
      <h2>The Malta Nomad Residence Permit, explained clearly</h2>
      <p>A government-issued residence route designed for the globally mobile professional — structured, transparent and built for those who work remotely from wherever they choose to call home.</p>
    </div>
    <div className="prog-grid">
      <div className="prog-card reveal">
        <div className="no">01 · DEFINITION</div>
        <h3>What is the Permit?</h3>
        <p>An official Maltese residence permit for non-EU/EEA remote workers, freelancers and the self-employed who earn their income entirely from employers or clients based outside Malta. Permit holders live in Malta but do not work for Maltese companies.</p>
      </div>
      <div className="prog-card reveal">
        <div className="no">02 · ELIGIBILITY</div>
        <h3>Who may apply?</h3>
        <p>Non-EU, non-EEA nationals aged 18 or over with a clean criminal record, verifiable remote income of at least €3,500 per month and confirmed accommodation in Malta. Citizens of certain restricted countries are not eligible.</p>
      </div>
      <div className="prog-card reveal">
        <div className="no">03 · INCOME</div>
        <h3>The remote income threshold</h3>
        <p>A minimum of €3,500 gross per month (€42,000 per year) is required, sourced from employment by a foreign company, a directorship in a company registered outside Malta, freelance contracts or self-employed activity — all outside Malta.</p>
      </div>
      <div className="prog-card reveal">
        <div className="no">04 · VALIDITY</div>
        <h3>Permit duration</h3>
        <p>Each permit is issued for one year. Provided the applicant continues to meet all requirements, it may be renewed up to three times, allowing a potential continuous stay of four years under this programme. To qualify for renewal, holders must physically reside in Malta for at least 5 months (150 days) of the 12-month validity period — a genuine-presence requirement that distinguishes this permit from purely paper-based residencies.</p>
      </div>
      <div className="prog-card reveal">
        <div className="no">05 · SCHENGEN ACCESS</div>
        <h3>Travel across Europe</h3>
        <p>As a Malta residence permit holder, you may travel to other Schengen Area countries for short stays of up to 90 days in any 180-day period — providing meaningful mobility across 29 European nations.</p>
      </div>
      <div className="prog-card reveal">
        <div className="no">06 · IMPORTANT NOTE</div>
        <h3>What this permit does not provide</h3>
        <p>The Malta Nomad Residence Permit does not grant permanent residency or a pathway to Maltese citizenship. Those seeking long-term settlement or citizenship should explore Malta's dedicated Permanent Residence or Citizenship by Merit programmes.</p>
      </div>
    </div>
  </div>
</section>

{/* ===== BENEFITS ===== */}
<section className="block benefits" id="benefits">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Key Benefits</span>
      <h2>What the Malta Nomad Residence Permit makes possible</h2>
      <p>A structured set of advantages for you, your career and your family — grounded in what the programme genuinely offers.</p>
    </div>
    <div className="ben-grid">
      <div className="ben-card reveal">
        <div className="mk">I</div>
        <h3>Live in Malta legally</h3>
        <p>Official Maltese residency, giving you the legal right to live on this extraordinary EU island — with a residence card recognised across Europe.</p>
      </div>
      <div className="ben-card reveal">
        <div className="mk">II</div>
        <h3>Schengen travel freedom</h3>
        <p>Travel visa-free to other Schengen Area countries for short stays of up to 90 days within any 180-day period, from your Mediterranean home base.</p>
      </div>
      <div className="ben-card reveal">
        <div className="mk">III</div>
        <h3>Family residency included</h3>
        <p>Your spouse or partner (including same-sex couples), dependent children under 18 and wholly dependent adult children may all be included in the same residency application.</p>
      </div>
      <div className="ben-card reveal">
        <div className="mk">IV</div>
        <h3>Favourable tax position</h3>
        <p>A 12-month income tax exemption upon arrival, followed by a flat 10% rate on authorised remote work income — significantly lower than Malta's standard 0–35% progressive tax for ordinary residents. Independent tax advice is recommended.</p>
      </div>
      <div className="ben-card reveal">
        <div className="mk">V</div>
        <h3>Education access</h3>
        <p>Access for your children and family members to Malta's private, international and Maltese state education institutions, as well as study opportunities across the Schengen Area for short periods.</p>
      </div>
      <div className="ben-card reveal">
        <div className="mk">VI</div>
        <h3>Healthcare &amp; wellbeing</h3>
        <p>Access to Malta's healthcare environment, both public and private, in an English-speaking medical system with modern facilities and practitioners across the island.</p>
      </div>
      <div className="ben-card reveal">
        <div className="mk">VII</div>
        <h3>Renewability for up to 4 years</h3>
        <p>Subject to continued eligibility, the one-year permit may be renewed up to three times — providing meaningful medium-term stability in one of Europe's most sought-after locations. Renewal is conditional on physically residing in Malta for at least 5 months (150 days) within each 12-month validity period.</p>
      </div>
      <div className="ben-card reveal">
        <div className="mk">VIII</div>
        <h3>English-speaking environment</h3>
        <p>Daily life, government services, business, education and healthcare are all conducted in English — making Malta uniquely accessible for international professionals at every level.</p>
      </div>
      <div className="ben-card reveal">
        <div className="mk">IX</div>
        <h3>Mediterranean quality of life</h3>
        <p>A quality of life that rivals Germany and Spain, according to international rankings — with the added advantages of sunshine, cultural richness, safety and a vibrant international community.</p>
      </div>
    </div>
  </div>
</section>

<div className="cross-divider" aria-hidden="true"></div>

{/* ===== INCOME & TAX SECTION ===== */}
<section className="block income-sec" id="income">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Income Requirements</span>
      <h2>What you need to demonstrate</h2>
      <p>The programme is built around verified remote income from outside Malta. The thresholds below are the requirements set by Residency Malta Agency and should be confirmed during the application process.</p>
    </div>

    <div className="inc-table reveal">
      <div className="inc-row head">
        <div className="ic">Applicant category</div>
        <div className="ic">Monthly minimum</div>
        <div className="ic">Annual equivalent</div>
      </div>
      <div className="inc-row highlight">
        <div className="ic label">Main applicant (remote worker / freelancer / director)</div>
        <div className="ic fig">€3,500</div>
        <div className="ic fig">€42,000</div>
      </div>
    </div>
    <p className="inc-note">Income must originate from employment with a foreign company, self-employment, freelance contracts or a directorship in a company registered outside Malta. The threshold applies to the main applicant and is verified through bank statements, employment contracts, client agreements or company documentation as appropriate. This is general information only — please seek professional guidance for your individual circumstances.</p>

  </div>
</section>

{/* ===== TAX ADVANTAGES ===== */}
<section className="tax-banner">
  <div className="container">
    <div className="tax-inner">
      <div className="reveal">
        <span className="eyebrow" style={{color: 'var(--gold-soft)'}}>Tax Position</span>
        <h2>A genuinely favourable tax environment</h2>
        <p>Malta's Nomad Residence Permit comes with a structured tax advantage for eligible holders, making it one of the more attractive European nomad destinations from a financial planning perspective. Individual tax obligations should always be verified with a qualified Maltese tax advisor.</p>
      </div>
      <div className="tax-cards reveal">
        <div className="tax-card">
          <div className="tv">12M</div>
          <p>Income tax exemption period upon arrival in Malta for qualifying permit holders</p>
        </div>
        <div className="tax-card">
          <div className="tv">10%</div>
          <p>Flat income tax rate on authorised remote work income after the initial exemption year</p>
        </div>
        <div className="tax-card">
          <div className="tv">0–35%</div>
          <p>Standard progressive income tax rate for ordinary Maltese residents — for comparison</p>
        </div>
        <div className="tax-card">
          <div className="tv">EU</div>
          <p>Malta's EU membership and treaty network provides regulatory clarity for internationally mobile professionals</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ===== ELIGIBILITY & REQUIREMENTS ===== */}
<section className="block eligibility" id="eligibility">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Eligibility &amp; Requirements</span>
      <h2>Who can apply and what is needed</h2>
      <p>The programme has clearly defined eligibility criteria set by Residency Malta Agency. All requirements must be met at the time of application and maintained for the duration of the permit.</p>
    </div>

    <div className="elig-grid">
      <div className="elig-block reveal">
        <h3>Main applicant requirements</h3>
        <ul className="req-list">
          <li><span className="tick">✓</span> Non-EU and non-EEA national</li>
          <li><span className="tick">✓</span> Aged 18 years or over</li>
          <li><span className="tick">✓</span> Clean criminal record</li>
          <li><span className="tick">✓</span> Not a national of a restricted country (including Afghanistan, Iran or Syria — a complete list should be confirmed with Residency Malta Agency)</li>
          <li><span className="tick">✓</span> Remote worker — employed by a foreign company, director of a company registered outside Malta, freelancer or self-employed</li>
          <li><span className="tick">✓</span> Minimum income of €3,500 per month (€42,000/year) from sources outside Malta</li>
          <li><span className="tick">✓</span> Does not work for any Malta-registered company</li>
          <li><span className="tick">✓</span> Confirmed residential accommodation in Malta (rental or owned)</li>
          <li><span className="tick">✓</span> Valid health insurance covering all applicants</li>
        </ul>
      </div>
      <div className="elig-block reveal">
        <h3>Document requirements</h3>
        <ul className="req-list">
          <li><span className="tick">✓</span> Valid passport with sufficient remaining validity</li>
          <li><span className="tick">✓</span> Completed application form (Residency Malta Agency)</li>
          <li><span className="tick">✓</span> Proof of remote employment or freelance/self-employment status</li>
          <li><span className="tick">✓</span> Bank statements or financial records demonstrating the income threshold</li>
          <li><span className="tick">✓</span> Signed lease agreement or proof of property ownership in Malta</li>
          <li><span className="tick">✓</span> Valid comprehensive health insurance policy</li>
          <li><span className="tick">✓</span> Police clearance certificate(s) from country of nationality and recent country of residence</li>
          <li><span className="tick">✓</span> Supporting documents for any family members included in the application</li>
          <li><span className="tick">✓</span> Biometric photographs meeting Residency Malta Agency specifications</li>
        </ul>
      </div>
    </div>

    <div style={{background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '30px 36px', marginTop: '16px'}} className="reveal">
      <p style={{color: 'var(--muted)', fontSize: '15px'}}><strong style={{color: 'var(--navy)'}}>Important note:</strong> Document specifications, apostille and translation requirements, and the precise format of supporting evidence may change. All requirements should be confirmed with Residency Malta Agency or through a qualified professional at the time of application. The above is provided for general information purposes only and does not constitute legal or immigration advice.</p>
    </div>
  </div>
</section>

{/* ===== FAMILY SECTION ===== */}
<section className="block family" id="family">
  <div className="container">
    <div className="fam-grid">
      <div className="fam-media reveal">
        <span className="frame"></span>
        {/* Unsplash: family on a Mediterranean terrace or Maltese coastline */}
        <img src="/images/malta-nomad/relocate-together.png" alt="Family moving into their new home together" />
      </div>
      <div className="reveal">
        <span className="eyebrow">Family Inclusion</span>
        <h2 style={{fontSize: 'clamp(30px,4vw,48px)', marginBottom: '26px'}}>Relocate together. Reside together.</h2>
        <p style={{color: 'var(--muted)', fontSize: '16.5px', marginBottom: '32px'}}>The Malta Nomad Residence Permit is designed to accommodate the whole family. Eligible dependants are included under the same application, receiving their own Maltese residence status and access to the same lifestyle, healthcare and educational environment as the main permit holder.</p>
        <ul className="fam-list">
          <li>
            <div className="fi">1</div>
            <div>
              <h4>Spouse or civil partner</h4>
              <p>Legally married spouses and registered civil partners may be included. Same-sex couples are eligible. Unregistered partnerships may also qualify where the relationship can be evidenced through documentation.</p>
            </div>
          </li>
          <li>
            <div className="fi">2</div>
            <div>
              <h4>Children under 18</h4>
              <p>Minor children of the main applicant — including adopted children and children from previous relationships — may be included as dependants under the application.</p>
            </div>
          </li>
          <li>
            <div className="fi">3</div>
            <div>
              <h4>Adult children (18+)</h4>
              <p>Unmarried adult children who are wholly financially dependent on the main applicant may also be eligible for inclusion. Proof of dependency will be required.</p>
            </div>
          </li>
          <li>
            <div className="fi">4</div>
            <div>
              <h4>Family access to Malta</h4>
              <p>Included family members benefit from Maltese residency, access to healthcare services, education and the same freedom of Schengen travel as the main permit holder — for short stays in other Schengen states.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<div className="cross-divider" aria-hidden="true"></div>

{/* ===== APPLICATION PROCESS ===== */}
<section className="block process" id="process">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center" style={{color: 'var(--gold-soft)'}}>Application Process</span>
      <h2>Your step-by-step journey to Maltese residency</h2>
      <p>Langma International manages each stage of the process with precision and care, so that you can focus on planning your new life in Malta.</p>
    </div>
    <div className="timeline">
      <div className="tl-item reveal">
        <div className="dot">1</div>
        <h3>Private eligibility assessment</h3>
        <p>A dedicated Langma International specialist reviews your income sources, professional status, nationality and family circumstances against the Malta Nomad Residence Permit requirements to confirm eligibility and outline the pathway ahead.</p>
      </div>
      <div className="tl-item reveal">
        <div className="dot">2</div>
        <h3>Accommodation planning</h3>
        <p>Before submitting your application, you must have secured residential accommodation in Malta. Our team can provide guidance on suitable areas and connect you with relevant resources — ensuring this requirement is met precisely and on schedule.</p>
      </div>
      <div className="tl-item reveal">
        <div className="dot">3</div>
        <h3>Document preparation and review</h3>
        <p>We prepare a comprehensive checklist tailored to your circumstances and assist with the assembly, translation, apostille and verification of all supporting documents — including employment evidence, financial records and health insurance.</p>
      </div>
      <div className="tl-item reveal">
        <div className="dot">4</div>
        <h3>Application submission to Residency Malta Agency</h3>
        <p>Your complete application file is reviewed internally before submission to Residency Malta Agency. We ensure that all requirements of the submission are met, reducing the risk of delays or requests for additional documentation.</p>
      </div>
      <div className="tl-item reveal">
        <div className="dot">5</div>
        <h3>Government review and processing</h3>
        <p>Residency Malta Agency conducts its due diligence review of the application. The processing period is typically two months or more from the date of a complete submission. Langma International monitors progress and liaises as required throughout this stage.</p>
      </div>
      <div className="tl-item reveal">
        <div className="dot">6</div>
        <h3>Approval notification</h3>
        <p>Upon a successful outcome, you will be notified of the approval of your Malta Nomad Residence Permit. Our team will walk you through the next practical steps, including arrival planning and any formalities to be completed in Malta.</p>
      </div>
      <div className="tl-item reveal">
        <div className="dot">7</div>
        <h3>Arrival and residence card issuance</h3>
        <p>On arrival in Malta, your Maltese residence card is issued. Langma International provides arrival support and practical guidance to ensure your transition is smooth, informed and well-prepared.</p>
      </div>
      <div className="tl-item reveal">
        <div className="dot">8</div>
        <h3>Renewal support</h3>
        <p>With the permit valid for one year and renewable up to three times, our team provides timely renewal support — tracking expiry dates, monitoring your 150-day (5-month) physical presence in Malta, reviewing continued eligibility and managing the process so your residency remains uninterrupted.</p>
      </div>
    </div>
  </div>
</section>

{/* ===== LIFE IN MALTA ===== */}
<section className="block life" id="life">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Life in Malta</span>
      <h2>Three exceptional places to call home</h2>
      <p>From the historic grandeur of Valletta to the cosmopolitan energy of Sliema and the serene landscapes of Gozo, Malta offers a remarkable diversity of environments for those who choose to live here.</p>
    </div>
    <div className="life-grid">
      <div className="life-card reveal">
        {/* Valletta: UNESCO World Heritage capital, Baroque streets */}
        <img src="/images/malta-nomad/valletta.png" alt="Valletta Grand Harbour with fortifications and colourful balconies, Malta" />
        <div className="ov"></div>
        <div className="cap">
          <h3>Valletta</h3>
          <p>Europe's smallest capital and a UNESCO World Heritage Site — Baroque palaces, world-class museums, government institutions and a thriving café and arts culture in a magnificently preserved historic setting.</p>
        </div>
      </div>
      <div className="life-card reveal">
        {/* Sliema: modern waterfront, expat hub, promenade */}
        <img src="/images/malta-nomad/sliema.png" alt="Aerial view of Valletta looking across Marsamxett Harbour toward Sliema" />
        <div className="ov"></div>
        <div className="cap">
          <h3>Sliema</h3>
          <p>Malta's most cosmopolitan district — a modern waterfront lifestyle hub favoured by expats, professionals and international families, with boutique shopping, acclaimed dining and a sweeping Mediterranean promenade.</p>
        </div>
      </div>
      <div className="life-card reveal">
        {/* Gozo: nature, countryside, slower pace */}
        <img src="/images/malta-nomad/gozo.png" alt="Sunset cove with natural stone arch on Gozo, Malta" />
        <div className="ov"></div>
        <div className="cap">
          <h3>Gozo</h3>
          <p>Malta's sister island — quieter, greener and deeply authentic. A rural Mediterranean sanctuary with dramatic coastal cliffs, ancient temples, working vineyards and a growing international community drawn to a slower, richer pace of life.</p>
        </div>
      </div>
    </div>

    <div className="life-strip reveal">
      <span className="life-tag">Mediterranean cuisine</span>
      <span className="life-tag">World-class diving</span>
      <span className="life-tag">Ancient temples &amp; culture</span>
      <span className="life-tag">Vibrant café scene</span>
      <span className="life-tag">International community</span>
      <span className="life-tag">Year-round sunshine</span>
      <span className="life-tag">Pristine coastline</span>
      <span className="life-tag">Excellent schooling</span>
      <span className="life-tag">EU legal framework</span>
      <span className="life-tag">Safe environment</span>
    </div>
  </div>
</section>

<div className="cross-divider" aria-hidden="true"></div>

{/* ===== WHY LANGMA ===== */}
<section className="block langma" id="langma">
  <div className="container">
    <div className="langma-grid">
      <div className="reveal">
        <span className="eyebrow" style={{color: 'var(--gold-soft)'}}>Why Langma International</span>
        <h2>The trusted advisory firm for your Malta residency journey</h2>
        <p className="lead">Global mobility is not a transaction — it is one of the most significant decisions a family or professional will make. Langma International approaches every client engagement with the depth of preparation, discretion and personal attention that such a decision deserves.</p>
        <p className="lead" style={{marginBottom: '36px'}}>Our advisory is compliance-led, documentation-focused and built around the specific requirements of the Maltese government. We do not promise outcomes we cannot control. We do provide the expertise, structure and care that gives your application its best possible foundation.</p>
        <a href="#lead" className="btn btn-gold">Begin Your Consultation</a>
      </div>
      <div className="lg-list reveal">
        <div className="lg-item">
          <h4>Eligibility-first approach</h4>
          <p>Every engagement begins with a thorough, honest eligibility review — ensuring that only suitable candidates are guided through the process, protecting your time and resources.</p>
        </div>
        <div className="lg-item">
          <h4>End-to-end document management</h4>
          <p>From initial checklists to apostilles, translations and final submission review, we manage documentation comprehensively — reducing errors and eliminating avoidable delays.</p>
        </div>
        <div className="lg-item">
          <h4>Dedicated case advisors</h4>
          <p>A named specialist handles your case from first consultation through to residence card issuance and renewal — one consistent point of contact, always informed, always available.</p>
        </div>
        <div className="lg-item">
          <h4>Family-centred planning</h4>
          <p>For clients relocating with families, we coordinate the needs of every family member — from accommodation guidance to school research and healthcare registration.</p>
        </div>
        <div className="lg-item">
          <h4>Compliance-led advisory</h4>
          <p>Our advice is grounded in official requirements. We do not misrepresent programmes, overstate prospects or provide legal guarantees. Transparency and accuracy are the foundation of our work.</p>
        </div>
        <div className="lg-item">
          <h4>Post-approval support</h4>
          <p>Our relationship does not end at approval. Renewal monitoring, settlement guidance and ongoing advisory keep clients confident and well-informed throughout their Maltese residency.</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ===== FAQ ===== */}
<section className="block faq" id="faq">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Frequently Asked Questions</span>
      <h2>Your Malta Nomad Residence questions, answered</h2>
      <p>Factual answers drawn from official programme requirements. For your specific circumstances, we recommend a private consultation with a Langma International specialist.</p>
    </div>
    <div className="faq-wrap">

      <div className={`faq-item ${openFaq===0 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(0)}>
          What is the Malta Nomad Residence Permit?
          <span className="pm">{openFaq===0 ? "−" : "+"}</span>
        </button>
        <div className="faq-a" style={{maxHeight: openFaq===0 ? "600px" : "0"}}>
          <p>The Malta Nomad Residence Permit is an official Maltese government residence permit for non-EU/EEA remote workers, freelancers and the self-employed whose income originates entirely from outside Malta. It enables holders and eligible family members to live in Malta while continuing to work remotely. Each permit is valid for one year and may be renewed up to three times, for a potential stay of four years — renewal requiring at least 5 months (150 days) of physical residence in Malta within each 12-month period. The permit does not grant permanent residency or a pathway to Maltese citizenship.</p>
        </div>
      </div>

      <div className={`faq-item ${openFaq===1 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(1)}>
          Who is eligible to apply?
          <span className="pm">{openFaq===1 ? "−" : "+"}</span>
        </button>
        <div className="faq-a" style={{maxHeight: openFaq===1 ? "600px" : "0"}}>
          <p>The permit is open to non-EU and non-EEA nationals aged 18 or over with a clean criminal record who earn a minimum of €3,500 gross per month (€42,000/year) from remote employment, freelance work, self-employment or a directorship in a company registered outside Malta. Income must originate entirely from outside Malta. Citizens of certain restricted countries — including Afghanistan, Iran and Syria — are not eligible. Confirmed accommodation in Malta and valid health insurance are also required.</p>
        </div>
      </div>

      <div className={`faq-item ${openFaq===2 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(2)}>
          Can family members be included?
          <span className="pm">{openFaq===2 ? "−" : "+"}</span>
        </button>
        <div className="faq-a" style={{maxHeight: openFaq===2 ? "600px" : "0"}}>
          <p>Yes. The main applicant's spouse or civil partner (including same-sex couples and documented unregistered partners), children under 18 — including adopted children and children from previous relationships — and unmarried adult children who are wholly financially dependent on the main applicant may all be included in the same application and receive Maltese residency status.</p>
        </div>
      </div>

      <div className={`faq-item ${openFaq===3 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(3)}>
          How long does the permit remain valid?
          <span className="pm">{openFaq===3 ? "−" : "+"}</span>
        </button>
        <div className="faq-a" style={{maxHeight: openFaq===3 ? "600px" : "0"}}>
          <p>Each Malta Nomad Residence Permit is issued for one year. Provided the holder continues to meet all eligibility requirements — including the income threshold, confirmed accommodation in Malta and valid health insurance — it may be renewed up to three times, allowing a maximum continuous stay of four years under this programme. To qualify for each renewal, the holder must also have physically resided in Malta for at least 5 months (150 days) of that 12-month period.</p>
        </div>
      </div>

      <div className={`faq-item ${openFaq===4 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(4)}>
          Do I need to physically live in Malta to renew my permit?
          <span className="pm">{openFaq===4 ? "−" : "+"}</span>
        </button>
        <div className="faq-a" style={{maxHeight: openFaq===4 ? "600px" : "0"}}>
          <p>Yes. To successfully renew the Malta Nomad Residence Permit for subsequent years, holders must demonstrate physical residence in Malta for at least 5 months (150 days) out of the 12-month validity period. This genuine-presence requirement is assessed alongside the income, accommodation and health insurance conditions at each renewal stage, and our team tracks it closely on your behalf.</p>
        </div>
      </div>

      <div className={`faq-item ${openFaq===5 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(5)}>
          Does the permit allow travel across the Schengen Area?
          <span className="pm">{openFaq===5 ? "−" : "+"}</span>
        </button>
        <div className="faq-a" style={{maxHeight: openFaq===5 ? "600px" : "0"}}>
          <p>Yes. As a Malta residence permit holder, you may travel visa-free to other Schengen Area countries for short stays of up to 90 days in any 180-day period — providing freedom of movement across 29 Schengen countries. The permit does not, however, grant the right to reside, study or work in other EU or Schengen member states on a long-term basis; it confers the right to reside in Malta specifically.</p>
        </div>
      </div>

    </div>
  </div>
</section>

{/* ===== LEAD GENERATION ===== */}
<section className="block lead-sec" id="lead">
  <div className="container">
    <div className="lead-grid">
      <div className="lead-copy reveal">
        <span className="eyebrow">Private Consultation</span>
        <h2>Begin your Malta residency journey with a private consultation</h2>
        <p>The Malta Nomad Residence Permit is a structured, government-backed pathway for eligible professionals. Understanding whether it is right for your circumstances is the essential first step — and that begins with an honest, informed conversation.</p>
        <p>Langma International offers a confidential eligibility review with a dedicated specialist who will assess your income, professional status, family situation and objectives against the precise requirements of the programme.</p>
        <ul className="lead-assure">
          <li>Confidential one-to-one consultation with a senior advisor</li>
          <li>Honest eligibility assessment — we will tell you clearly if you qualify</li>
          <li>Transparent process and fee structure from the outset</li>
          <li>Family-inclusive planning at every stage</li>
          <li>Compliance-first advisory with no exaggerated promises</li>
          <li>End-to-end support from eligibility review to residence card</li>
        </ul>
      </div>
      <div className="reveal">
        <div className="form-card">
          <h3>Request a Private Consultation</h3>
          <p className="fsub">Complete the form below and a Langma International specialist will contact you within one business day.</p>
          <form onSubmit={handleLeadSubmit} noValidate>
            <div className="frow">
              <div className="field">
                <label htmlFor="fname">First name</label>
                <input type="text" id="fname" placeholder="Your first name" autoComplete="given-name" required />
              </div>
              <div className="field">
                <label htmlFor="lname">Last name</label>
                <input type="text" id="lname" placeholder="Your last name" autoComplete="family-name" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" placeholder="your@email.com" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone number (optional)</label>
              <input type="tel" id="phone" placeholder="+1 000 000 0000" autoComplete="tel" />
            </div>
            <div className="field">
              <label htmlFor="nationality">Nationality</label>
              <input type="text" id="nationality" placeholder="Your nationality" />
            </div>
            <div className="field">
              <label htmlFor="income">Monthly remote income (approx.)</label>
              <select id="income" defaultValue="">
                <option value="">Select range</option>
                <option>€3,500 – €5,000</option>
                <option>€5,000 – €8,000</option>
                <option>€8,000 – €15,000</option>
                <option>€15,000+</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="family">Family situation</label>
              <select id="family" defaultValue="">
                <option value="">Select</option>
                <option>Applying individually</option>
                <option>Spouse / partner only</option>
                <option>Spouse / partner + children</option>
                <option>Children only</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Your message or questions (optional)</label>
              <textarea id="message" placeholder="Tell us a little about your situation and what you are looking for..."></textarea>
            </div>
            <button type="submit" className="btn btn-gold" disabled={leadLoading}>{leadLoading ? 'Sending...' : 'Request Consultation ↗'}</button>
            {(leadMsg || leadSubmitted) && (
              <div className={`success show${leadSuccess ? '' : ''}`} style={!leadSuccess && leadMsg ? {background:'rgba(220,38,38,.08)',border:'1px solid #ef4444',color:'#b91c1c'} : undefined}>
                {leadMsg || 'Thank you — an advisor will be in touch shortly.'}
              </div>
            )}
            <p className="disc">Your enquiry is treated with complete confidentiality. This form does not constitute the commencement of a legal or advisory relationship. No approval or outcome is guaranteed.</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>



      </main>
    </div>
  );
};

export default LangmaMaltaNomadPage;