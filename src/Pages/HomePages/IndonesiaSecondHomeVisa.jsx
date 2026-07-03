import React, { useState, useEffect, useMemo } from 'react';
import useResidencyLeadForms from '../../hooks/useResidencyLeadForms';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SERVICE = 'Indonesia Second Home Visa';

const LangmaIndonesiaSecondHomeVisaPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Indonesia Second Home Consultation' });

  // Calendar state
  const [calView, setCalView] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [calDay, setCalDay] = useState(null);
  const [calSlot, setCalSlot] = useState(null);
  const [calConfirm, setCalConfirm] = useState('');

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

  const calPrev = () => {
    const today = new Date(); today.setHours(0,0,0,0);
    const prev = new Date(calView.getFullYear(), calView.getMonth() - 1, 1);
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) { setCalView(prev); setCalDay(null); }
  };
  const calNext = () => {
    setCalView(new Date(calView.getFullYear(), calView.getMonth() + 1, 1));
    setCalDay(null);
  };

  const calDays = useMemo(() => {
    const today = new Date(); today.setHours(0,0,0,0);
    const cells = [];
    let startDow = calView.getDay();
    startDow = startDow === 0 ? 6 : startDow - 1;
    for (let i = 0; i < startDow; i++) cells.push(<div key={'e'+i} className="cal-day empty" />);
    const daysInMonth = new Date(calView.getFullYear(), calView.getMonth() + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(calView.getFullYear(), calView.getMonth(), d);
      const dow = date.getDay();
      const isPast = date < today;
      const isWeekend = dow === 0 || dow === 6;
      const isSel = calDay && date.toDateString() === calDay.toDateString();
      if (isPast || isWeekend) {
        cells.push(<div key={d} className="cal-day off">{d}</div>);
      } else {
        cells.push(
          <div key={d} className={`cal-day avail ${isSel ? 'sel' : ''}`}
            onClick={() => { setCalDay(date); setCalConfirm(''); }}>{d}</div>
        );
      }
    }
    return cells;
  }, [calView, calDay]);

  const handleCalBook = () => {
    if (!calDay || !calSlot) { setCalConfirm('Please choose both a date and a time slot.'); return; }
    const opts = { weekday: 'long', day: 'numeric', month: 'long' };
    setCalConfirm('Requested: ' + calDay.toLocaleDateString('en-GB', opts) + ' at ' + calSlot + '. We\u2019ll email to confirm.');
  };

  return (
    <div className="lg-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
  .lg-page {
    --navy:#0E1F3D;
    --navy-deep:#0E1F3D;
    --navy-mid:#0E1F3D;
    --emerald:#0E4B3E;
    --emerald-soft:#3D7A68;
    --gold:#4EC7B8;
    --gold-soft:#4EC7B8;
    --gold-deep:#006064;
    --ivory:#F7FAFC;
    --beige:#E8F4F2;
    --charcoal:#0E1F3D;
    --muted:#0E1F3D;
    --line:rgba(47,199,161,0.30);
    --radius:4px;
    --shadow-soft:0 18px 50px rgba(14,31,61,0.10);
    --shadow-strong:0 30px 70px rgba(14,31,61,0.22);
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
  .lg-page .eyebrow::before {
    content:"";width:34px;height:1px;background:var(--gold);display:inline-block;
  }
  .lg-page .eyebrow.center {justify-content:center;}
  .lg-page .section-head {max-width:760px;margin:0 auto 60px;text-align:center;}
  .lg-page .section-head h2 {font-size:clamp(34px,4.6vw,54px);margin-bottom:18px;}
  .lg-page .section-head p {color:var(--muted);font-size:17px;}

  .lg-page .btn {
    display:inline-flex;align-items:center;gap:10px;
    font-family:'Inter',sans-serif;font-size:14px;font-weight:600;
    letter-spacing:0.4px;padding:16px 32px;border-radius:var(--radius);
    cursor:pointer;border:1px solid transparent;transition:all .35s var(--ease);
  }
  .lg-page .btn-gold {background:var(--gold);color:var(--navy-deep);}
  .lg-page .btn-gold:hover {background:var(--gold-soft);transform:translateY(-2px);box-shadow:0 14px 30px rgba(47,199,161,.32);}
  .lg-page .btn-ghost {background:transparent;color:var(--ivory);border:1px solid rgba(247,250,252,.45);}
  .lg-page .btn-ghost:hover {border-color:var(--gold);color:var(--gold-soft);}
  .lg-page .btn-navy {background:var(--navy);color:var(--ivory);}
  .lg-page .btn-navy:hover {background:var(--navy-mid);transform:translateY(-2px);}

  /* ===== TILEWORK SIGNATURE DIVIDER ===== */
  .lg-page .tilework {
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
    display:block;
    overflow:hidden;
    opacity:.92;
  }

  /* ===== HEADER ===== */
  .lg-page header {
    position:fixed;top:0;left:0;right:0;z-index:1000;
    padding:22px 0;transition:all .4s var(--ease);
  }
  .lg-page header.scrolled {
    background:rgba(14,31,61,0.94);backdrop-filter:blur(10px);
    padding:14px 0;box-shadow:0 6px 30px rgba(0,0,0,.25);
  }
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
  .lg-page .hero {
    position:relative;
    min-height:100vh;
    display:flex;
    align-items:center;
    color:var(--ivory);
    overflow:hidden;
    background:linear-gradient(135deg,var(--navy-deep) 0%,var(--navy) 55%,var(--emerald) 135%);
  }
  .lg-page .hero::before {
    content:"";
    position:absolute;inset:0;
    background-image:
      radial-gradient(circle at 20% 50%, rgba(47,199,161,0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(14,75,62,0.30) 0%, transparent 45%);
    z-index:0;
    pointer-events:none;
  }
  .lg-page .hero-split {
    position:relative;z-index:2;
    width:100%;
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:64px;
    align-items:center;
    padding-top:110px;
    padding-bottom:70px;
  }
  .lg-page .hero-copy {display:flex;flex-direction:column;}
  .lg-page .hero h1 {font-size:clamp(38px,5vw,66px);color:var(--ivory);margin-bottom:26px;font-weight:600;line-height:1.08;}
  .lg-page .hero h1 em {font-style:italic;color:var(--gold-soft);font-weight:500;}
  .lg-page .hero .lead {font-size:17.5px;color:rgba(247,250,252,.82);max-width:560px;margin-bottom:38px;font-weight:300;line-height:1.72;}
  .lg-page .hero-cta {display:flex;gap:16px;flex-wrap:wrap;margin-bottom:48px;}
  .lg-page .hero-badges {display:flex;gap:36px;flex-wrap:wrap;border-top:1px solid rgba(247,250,252,.18);padding-top:28px;}
  .lg-page .hero-badge .num {font-family:'Cormorant Garamond',serif;font-size:30px;color:var(--gold-soft);font-weight:600;line-height:1;}
  .lg-page .hero-badge .lbl {font-size:11.5px;letter-spacing:.6px;color:rgba(247,250,252,.68);margin-top:6px;}

  .lg-page .hero-visual {display:flex;align-items:center;justify-content:center;position:relative;}
  .lg-page .hero-img-frame {
    position:relative;width:100%;max-width:520px;border-radius:12px;overflow:hidden;
    box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22);
  }
  .lg-page .hero-img-frame img {
    display:block;width:100%;height:480px;object-fit:cover;border-radius:12px;
    transition:transform .9s var(--ease);
  }
  .lg-page .hero-img-frame:hover img {transform:scale(1.04);}
  .lg-page .hero-img-frame::after {
    content:"";position:absolute;inset:12px;border:1px solid rgba(47,199,161,.38);
    border-radius:8px;pointer-events:none;z-index:2;
  }
  .lg-page .hero-img-frame::before {
    content:"";position:absolute;inset:0;
    background:linear-gradient(to top,rgba(14,31,61,.42) 0%,transparent 55%);
    z-index:1;border-radius:12px;pointer-events:none;
  }
  .lg-page .hero-visual::before {
    content:"";position:absolute;top:24px;right:-14px;width:100%;max-width:520px;height:100%;
    border:1px solid rgba(47,199,161,.18);border-radius:12px;pointer-events:none;
  }
  .lg-page .hero-img-badge {
    position:absolute;bottom:22px;left:22px;z-index:3;
    background:rgba(14,31,61,.82);backdrop-filter:blur(8px);
    border:1px solid rgba(47,199,161,.30);border-radius:6px;padding:10px 16px;
    display:flex;align-items:center;gap:10px;
  }
  .lg-page .hero-img-badge .dot-pulse {
    width:8px;height:8px;border-radius:50%;background:var(--gold);flex-shrink:0;
    animation:pulse-dot 2s ease infinite;
  }
  @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.6;transform:scale(.85);}}
  .lg-page .hero-img-badge span {font-size:12px;letter-spacing:.5px;color:rgba(247,250,252,.88);font-weight:500;}

  .lg-page .scroll-hint {position:absolute;bottom:30px;left:50%;transform:translateX(-50%);z-index:2;font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:rgba(247,250,252,.5);display:flex;flex-direction:column;align-items:center;gap:8px;}
  .lg-page .scroll-hint .line {width:1px;height:38px;background:linear-gradient(var(--gold),transparent);animation:drop 2s var(--ease) infinite;}
  @keyframes drop{0%{transform:scaleY(0);transform-origin:top;}50%{transform:scaleY(1);transform-origin:top;}51%{transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}

  @media(max-width:980px){
    .hero-split {grid-template-columns:1fr;gap:48px;padding-top:120px;padding-bottom:60px;}
    .hero-img-frame img {height:380px;}
    .hero-visual::before {display:none;}
    .hero-img-frame {max-width:100%;}
  }
  @media(max-width:640px){
    .lg-page .hero-split {padding-top:100px;padding-bottom:50px;gap:36px;}
    .lg-page .hero-img-frame img {height:280px;}
    .lg-page .hero-badges {gap:22px;}
  }

  /* ===== TRUST STATS BAR ===== */
  .lg-page .stats-bar {background:var(--navy-deep);color:var(--ivory);}
  .lg-page .stats-grid {display:grid;grid-template-columns:repeat(4,1fr);gap:0;}
  .lg-page .stat-cell {padding:52px 30px;text-align:center;border-right:1px solid rgba(247,250,252,.10);}
  .lg-page .stat-cell:last-child {border-right:none;}
  .lg-page .stat-cell .v {font-family:'Cormorant Garamond',serif;font-size:46px;font-weight:600;color:var(--gold-soft);line-height:1;margin-bottom:12px;}
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
  .lg-page .fact .ff {font-family:'Cormorant Garamond',serif;font-size:30px;color:var(--navy);font-weight:600;}
  .lg-page .fact .fl {font-size:12.5px;color:var(--muted);letter-spacing:.4px;margin-top:6px;}

  /* ===== WHY INDONESIA ===== */
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

  /* ===== BENEFITS / PATHWAY (shared card style) ===== */
  .lg-page .benefits {background:var(--ivory);}
  .lg-page .ben-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .lg-page .ben-card {background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:36px 30px;position:relative;overflow:hidden;transition:all .35s var(--ease);}
  .lg-page .ben-card::before {content:"";position:absolute;top:0;left:0;width:3px;height:0;background:var(--gold);transition:height .4s var(--ease);}
  .lg-page .ben-card:hover {box-shadow:var(--shadow-soft);transform:translateY(-4px);}
  .lg-page .ben-card:hover::before {height:100%;}
  .lg-page .ben-card .mk {font-family:'Cormorant Garamond',serif;font-size:15px;color:var(--gold-deep);letter-spacing:2px;margin-bottom:16px;}
  .lg-page .ben-card h3 {font-size:23px;margin-bottom:10px;}
  .lg-page .ben-card p {color:var(--muted);font-size:15px;}
  .lg-page .pathway {background:var(--beige);}

  /* ===== FINANCIAL REQUIREMENTS ===== */
  .lg-page .finance {background:var(--beige);}
  .lg-page .fin-table {background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-soft);}
  .lg-page .fin-row {display:grid;grid-template-columns:1.4fr 1fr 1fr;align-items:center;border-bottom:1px solid var(--line);}
  .lg-page .fin-row:last-child {border-bottom:none;}
  .lg-page .fin-row.head {background:var(--navy);color:var(--ivory);}
  .lg-page .fin-row.head .fc {color:var(--ivory);font-weight:600;font-family:'Inter',sans-serif;font-size:13px;letter-spacing:.6px;text-transform:uppercase;}
  .lg-page .fc {padding:22px 28px;font-size:15.5px;}
  .lg-page .fc.label {font-weight:600;color:var(--navy);}
  .lg-page .fc.fig {font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--gold-deep);font-weight:600;}
  .lg-page .fin-row.total {background:rgba(47,199,161,.10);}
  .lg-page .fin-note {margin-top:24px;font-size:13.5px;color:var(--muted);text-align:center;font-style:italic;}
  .lg-page .fin-extra {display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:40px;}
  .lg-page .fin-x {background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:28px;}
  .lg-page .fin-x h4 {font-size:21px;margin-bottom:8px;}
  .lg-page .fin-x p {color:var(--muted);font-size:14.5px;}

  /* ===== FAMILY ===== */
  .lg-page .family {background:var(--ivory);}
  .lg-page .fam-grid {display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
  .lg-page .fam-list {list-style:none;}
  .lg-page .fam-list li {display:flex;gap:18px;padding:22px 0;border-bottom:1px solid var(--line);}
  .lg-page .fam-list li:last-child {border-bottom:none;}
  .lg-page .fam-list .fi {flex:0 0 42px;height:42px;border-radius:50%;background:var(--navy);color:var(--gold-soft);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:19px;}
  .lg-page .fam-list h4 {font-size:21px;margin-bottom:2px;}
  .lg-page .fam-list p {color:var(--muted);font-size:14.5px;}
  .lg-page .fam-media {height:520px;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-strong);position:relative;}
  .lg-page .fam-media .frame {position:absolute;inset:14px;border:1px solid rgba(247,250,252,.5);z-index:2;}

  /* ===== PROCESS TIMELINE ===== */
  .lg-page .process {background:var(--navy-deep);color:var(--ivory);}
  .lg-page .process .section-head h2 {color:var(--ivory);}
  .lg-page .process .section-head p {color:rgba(247,250,252,.72);}
  .lg-page .timeline {position:relative;max-width:880px;margin:0 auto;}
  .lg-page .timeline::before {content:"";position:absolute;left:31px;top:8px;bottom:8px;width:1px;background:rgba(247,250,252,.18);}
  .lg-page .tl-item {position:relative;padding-left:92px;padding-bottom:44px;}
  .lg-page .tl-item:last-child {padding-bottom:0;}
  .lg-page .tl-item .dot {position:absolute;left:0;top:0;width:64px;height:64px;border-radius:50%;border:1px solid var(--gold);background:var(--navy-deep);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--gold-soft);}
  .lg-page .tl-item h3 {color:var(--ivory);font-size:25px;margin-bottom:6px;}
  .lg-page .tl-item p {color:rgba(247,250,252,.72);font-size:15px;max-width:620px;}

  /* ===== TAX ===== */
  .lg-page .tax {background:var(--ivory);}
  .lg-page .tax-grid {display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
  .lg-page .tax-copy h2 {font-size:clamp(30px,4vw,48px);margin-bottom:20px;}
  .lg-page .tax-copy p {color:var(--muted);font-size:16.5px;margin-bottom:18px;}
  .lg-page .tax-panel {background:var(--emerald);color:var(--ivory);border-radius:var(--radius);padding:46px 42px;box-shadow:var(--shadow-strong);}
  .lg-page .tax-panel h3 {color:var(--gold-soft);font-size:26px;margin-bottom:24px;}
  .lg-page .tax-line {display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:16px 0;border-bottom:1px solid rgba(247,250,252,.14);}
  .lg-page .tax-line:last-of-type {border-bottom:none;}
  .lg-page .tax-line .t {color:rgba(247,250,252,.82);font-size:14.5px;max-width:60%;}
  .lg-page .tax-line .v {font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--ivory);font-weight:600;}
  .lg-page .tax-foot {font-size:12.5px;color:rgba(247,250,252,.6);margin-top:18px;font-style:italic;line-height:1.6;}

  /* ===== LIFE IN INDONESIA ===== */
  .lg-page .life {background:var(--beige);}
  .lg-page .life-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .lg-page .life-card {position:relative;height:420px;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-soft);}
  .lg-page .life-card img {transition:transform .8s var(--ease);}
  .lg-page .life-card:hover img {transform:scale(1.06);}
  .lg-page .life-card .ov {position:absolute;inset:0;background:linear-gradient(to top,rgba(14,31,61,.88) 0%,rgba(14,31,61,.18) 55%,transparent 100%);z-index:1;}
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
  .lg-page .faq-q {width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:28px 0;display:flex;justify-content:space-between;align-items:center;gap:24px;font-family:'Cormorant Garamond',serif;font-size:23px;color:var(--navy);font-weight:600;}
  .lg-page .faq-q .pm {flex:0 0 30px;height:30px;border:1px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--gold-deep);font-family:'Inter',sans-serif;font-size:18px;transition:all .3s;}
  .lg-page .faq-item.open .pm {background:var(--gold);color:var(--navy);transform:rotate(45deg);}
  .lg-page .faq-a {max-height:0;overflow:hidden;transition:max-height .4s var(--ease);}
  .lg-page .faq-a p {padding:0 0 28px;color:var(--muted);font-size:16px;max-width:760px;}

  /* ===== LEAD FORM ===== */
  .lg-page .lead-sec {background:var(--navy-deep);color:var(--ivory);}
  .lg-page .lead-grid {display:grid;grid-template-columns:1fr 1.1fr;gap:64px;align-items:start;}
  .lg-page .lead-copy .eyebrow {color:var(--gold-soft);}
  .lg-page .lead-copy h2 {color:var(--ivory);font-size:clamp(32px,4.2vw,50px);margin-bottom:20px;}
  .lg-page .lead-copy p {color:rgba(247,250,252,.80);margin-bottom:26px;font-size:16.5px;}
  .lg-page .lead-assure {list-style:none;}
  .lg-page .lead-assure li {display:flex;gap:12px;align-items:center;padding:11px 0;color:rgba(247,250,252,.86);font-size:15px;}
  .lg-page .lead-assure li::before {content:"\\2713";color:var(--gold-soft);font-weight:700;}
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

  /* ===== CALENDAR ===== */
  .lg-page .calendar {background:var(--navy);color:var(--ivory);}
  .lg-page .cal-grid {display:grid;grid-template-columns:1fr 1.05fr;gap:60px;align-items:center;}
  .lg-page .cal-copy h2 {color:var(--ivory);font-size:clamp(30px,4vw,48px);margin-bottom:18px;}
  .lg-page .cal-copy p {color:rgba(247,250,252,.80);font-size:16.5px;margin-bottom:24px;}
  .lg-page .cal-benefits {list-style:none;margin-bottom:8px;}
  .lg-page .cal-benefits li {display:flex;gap:12px;align-items:flex-start;padding:10px 0;color:rgba(247,250,252,.86);font-size:15px;}
  .lg-page .cal-benefits li::before {content:"\\25C8";color:var(--gold-soft);}
  .lg-page .cal-urgency {display:inline-flex;align-items:center;gap:10px;margin-top:10px;background:rgba(47,199,161,.12);border:1px solid var(--line);border-radius:40px;padding:9px 20px;font-size:13px;color:var(--gold-soft);}
  .lg-page .cal-urgency .dot-pulse {width:8px;height:8px;border-radius:50%;background:var(--gold);animation:pulse-dot 2s ease infinite;}
  .lg-page .cal-card {background:var(--ivory);border-radius:var(--radius);padding:38px;box-shadow:var(--shadow-strong);color:var(--charcoal);}
  .lg-page .cal-card h3 {font-size:24px;margin-bottom:4px;}
  .lg-page .cal-card .csub {color:var(--muted);font-size:14px;margin-bottom:22px;}
  .lg-page .cal-head {display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
  .lg-page .cal-head span {font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--navy);font-weight:600;}
  .lg-page .cal-head button {background:none;border:1px solid var(--line);border-radius:50%;width:30px;height:30px;cursor:pointer;color:var(--gold-deep);font-size:15px;}
  .lg-page .cal-dow {display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:8px;}
  .lg-page .cal-dow span {text-align:center;font-size:11px;letter-spacing:.4px;text-transform:uppercase;color:var(--muted);}
  .lg-page .cal-days {display:grid;grid-template-columns:repeat(7,1fr);gap:6px;}
  .lg-page .cal-day {aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:14px;border-radius:var(--radius);cursor:pointer;border:1px solid transparent;transition:all .2s;color:var(--charcoal);}
  .lg-page .cal-day.empty {cursor:default;}
  .lg-page .cal-day.avail:hover {background:rgba(47,199,161,.16);border-color:var(--gold);}
  .lg-page .cal-day.sel {background:var(--navy);color:var(--ivory);}
  .lg-page .cal-day.off {color:#c7c2b6;cursor:default;text-decoration:line-through;}
  .lg-page .cal-slots {display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px;}
  .lg-page .cal-slot {padding:11px 6px;text-align:center;border:1px solid var(--line);border-radius:var(--radius);font-size:13.5px;cursor:pointer;transition:all .2s;}
  .lg-page .cal-slot:hover {border-color:var(--gold);}
  .lg-page .cal-slot.sel {background:var(--gold);color:var(--navy-deep);border-color:var(--gold);font-weight:600;}
  .lg-page .cal-card .btn {width:100%;justify-content:center;margin-top:20px;}
  .lg-page .cal-confirm {font-size:13px;color:var(--gold-deep);text-align:center;margin-top:14px;min-height:18px;}

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

  /* ===== REVEAL ANIMATION ===== */
  .lg-page .reveal {opacity:0;transform:translateY(28px);transition:opacity .7s var(--ease),transform .7s var(--ease);}
  .lg-page .reveal.in {opacity:1;transform:none;}

  /* ===== RESPONSIVE ===== */
  @media(max-width:980px){
    .lg-page .nav-links {display:none;}
    .lg-page .burger {display:flex;}
    .lg-page .about-grid, .lg-page .fam-grid, .lg-page .langma-grid, .lg-page .lead-grid, .lg-page .office-grid, .lg-page .tax-grid, .lg-page .cal-grid {grid-template-columns:1fr;gap:40px;}
    .lg-page .stats-grid, .lg-page .why-grid, .lg-page .prog-grid, .lg-page .ben-grid, .lg-page .life-grid, .lg-page .fin-extra {grid-template-columns:1fr 1fr;}
    .lg-page .facts-row {grid-template-columns:1fr 1fr;}
    .lg-page .lg-list {grid-template-columns:1fr;}
    .lg-page .about-media, .lg-page .fam-media {height:420px;}
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
    .lg-page .form-card, .lg-page .office-form, .lg-page .cal-card, .lg-page .tax-panel {padding:30px;}
    .lg-page .foot-grid {grid-template-columns:1fr 1fr;}
  }
  @media(prefers-reduced-motion:reduce){
    .lg-page * {animation:none!important;transition:none!important;}
    .lg-page .reveal {opacity:1;transform:none;}
  }
      `}</style>
      <main>

{/* ===== HERO ===== */}
<section className="hero">
  <div className="container">
    <div className="hero-split">
      <div className="hero-copy">
        <span className="eyebrow">Indonesia Second Home Visa &middot; Long-Term Residency Programme</span>
        <h1>Indonesia Second Home Visa: your gateway to <em>a ten-year Asian residency</em></h1>
        <p className="lead">Anchor your life between Bali, Jakarta and beyond, without the burden of annual renewals or local sponsorship. Indonesia's Second Home Visa is built around a straightforward qualifying investment rather than employment, offering financially independent applicants and their families up to a decade of legal stay. Langma International accompanies you from your first eligibility review to an endorsed visa in your passport — discreetly, precisely and fully within the rules.</p>
        <div className="hero-cta">
          <a href="#lead" className="btn btn-gold">Book Your Private Consultation</a>
          <a href="#programme" className="btn btn-ghost">Explore the Visa</a>
        </div>
        <div className="hero-badges">
          <div className="hero-badge"><div className="num">$130,000<span style={{fontSize: '16px'}}>+</span></div><div className="lbl">Minimum qualifying investment</div></div>
          <div className="hero-badge"><div className="num">10 yrs</div><div className="lbl">Maximum visa validity</div></div>
          <div className="hero-badge"><div className="num">3 yrs</div><div className="lbl">To eligibility for ITAP</div></div>
          <div className="hero-badge"><div className="num">Family</div><div className="lbl">Included in one process</div></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-img-frame">
          <img src="https://images.unsplash.com/photo-1709879811940-c88f7eecc66c?q=80&w=1200&auto=format&fit=crop" alt="Aerial view of Jakarta's skyline of glass towers under a blue sky" />
          <div className="hero-img-badge">
            <span className="dot-pulse"></span>
            <span>Jakarta, Indonesia</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="scroll-hint"><span>Discover</span><span className="line"></span></div>
</section>

<div className="tilework" aria-hidden="true"></div>

{/* ===== TRUST STATS BAR ===== */}
<section className="stats-bar">
  <div className="container">
    <div className="stats-grid">
      <div className="stat-cell reveal"><div className="v">$130,000</div><div className="k">Minimum bank deposit or real estate investment</div></div>
      <div className="stat-cell reveal"><div className="v">10 yrs</div><div className="k">Maximum Second Home Visa validity</div></div>
      <div className="stat-cell reveal"><div className="v">3 yrs</div><div className="k">Legal residence before ITAP eligibility</div></div>
      <div className="stat-cell reveal"><div className="v">1 month+</div><div className="k">Indicative route to a visa in hand</div></div>
    </div>
  </div>
</section>

{/* ===== ABOUT INDONESIA ===== */}
<section className="block about" id="about">
  <div className="container">
    <div className="about-grid">
      <div className="about-copy reveal">
        <span className="eyebrow">Discover Indonesia</span>
        <h2>Indonesia: Southeast Asia's largest economy, spread across a living archipelago</h2>
        <p>Stretching across more than 17,000 islands between the Indian and Pacific Oceans, Indonesia is the world's largest archipelagic nation and, by population, the fourth largest country on earth — home to well over 280 million people. Jakarta serves as the capital and commercial nerve centre, Indonesian (Bahasa Indonesia) is the official language, and English is widely used in business, finance and hospitality circles across the major cities. The currency is the Indonesian Rupiah, and the country spans three time zones from Sumatra to Papua.</p>
        <p>Indonesia is Southeast Asia's largest economy and a member of the G20, underpinned by a diversified base of manufacturing, natural resources, agriculture and a fast-expanding digital and services sector. Jakarta anchors national business and finance, while Bali, Yogyakarta and a growing string of secondary cities have become magnets for tourism, wellness, remote work and lifestyle investment. Reforms in recent years have steadily opened the country to longer-term foreign residents, culminating in visa routes built specifically around investment rather than local employment.</p>
        <p>For internationally mobile investors and retirees, the appeal is direct: a decade of legal stay without annual renewal, a genuinely low bureaucratic bar to entry, and a setting that ranges from cosmopolitan Jakarta to the beaches, rice terraces and temples that have made Indonesia one of the world's most recognisable destinations.</p>
      </div>
      <div className="about-media reveal">
        <span className="frame"></span>
        <img src="https://images.unsplash.com/photo-1591674585153-ca78d0339b09?q=80&w=1200&auto=format&fit=crop" alt="Silhouette of Borobudur Temple against the sky at sunrise in Central Java" />
      </div>
    </div>

    <div className="facts-row">
      <div className="fact reveal"><div className="ff">280M+</div><div className="fl">Population</div></div>
      <div className="fact reveal"><div className="ff">Jakarta</div><div className="fl">Capital city</div></div>
      <div className="fact reveal"><div className="ff">Rupiah&nbsp;(IDR)</div><div className="fl">Official currency</div></div>
      <div className="fact reveal"><div className="ff">G20</div><div className="fl">Largest economy in Southeast Asia</div></div>
    </div>
  </div>
</section>

{/* ===== WHY INDONESIA ===== */}
<section className="block why">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Why Investors Choose Indonesia</span>
      <h2>The reasons people relocate — and the reasons they stay</h2>
      <p>Beyond the visa itself, Indonesia offers a scale, cost of living and lifestyle range that keeps drawing investors, retirees and families long after the paperwork is settled.</p>
    </div>
    <div className="why-grid">
      <div className="why-card reveal"><div className="ic">&#9733;</div><h3>Up to 10 years of stay</h3><p>A single application can secure a decade of legal residence in Indonesia, without the 1–2 year renewal cycles typical of other long-term visas.</p></div>
      <div className="why-card reveal"><div className="ic">&#9919;</div><h3>Investment, not employment</h3><p>Eligibility rests on a qualifying bank deposit or real estate purchase rather than a job offer, local sponsor or business plan.</p></div>
      <div className="why-card reveal"><div className="ic">&#10031;</div><h3>Bali and beyond</h3><p>The visa is valid across the entire country, from Bali's coastline and Ubud's hills to Jakarta's business districts and Yogyakarta's cultural heartland.</p></div>
      <div className="why-card reveal"><div className="ic">&#9998;</div><h3>Business and investment access</h3><p>Holders may invest in and operate a business, buy shares in local companies and acquire premium Indonesian real estate.</p></div>
      <div className="why-card reveal"><div className="ic">&#10010;</div><h3>Cost of living advantage</h3><p>A comfortable lifestyle across most of Indonesia remains considerably more affordable than in Western Europe, North America or much of East Asia.</p></div>
      <div className="why-card reveal"><div className="ic">&#9215;</div><h3>Growing connectivity</h3><p>Extensive regional flight networks link Jakarta, Bali and Indonesia's secondary cities to the rest of Asia-Pacific, the Middle East and beyond.</p></div>
    </div>
  </div>
</section>

<div className="tilework" aria-hidden="true"></div>

{/* ===== PROGRAMME OVERVIEW / ELIGIBILITY ===== */}
<section className="block prog" id="programme">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center" style={{color: 'var(--gold-soft)'}}>The Programme</span>
      <h2>The Indonesia Second Home Visa, explained clearly</h2>
      <p>A residence route built around a straightforward, verifiable investment rather than employment, business formation or a local sponsor.</p>
    </div>
    <div className="prog-grid">
      <div className="prog-card reveal"><div className="no">01 &middot; DEFINITION</div><h3>What is the visa?</h3><p>A long-term Indonesian stay visa granted to financially independent foreign nationals, allowing legal residence anywhere in the country — including Bali — for up to 10 years, without the right to take up local employment.</p></div>
      <div className="prog-card reveal"><div className="no">02 &middot; ELIGIBILITY</div><h3>Who can apply?</h3><p>Any foreign national who can demonstrate the qualifying investment amount, supported by a valid passport, recent photographs and a curriculum vitae.</p></div>
      <div className="prog-card reveal"><div className="no">03 &middot; ROUTE</div><h3>Two investment routes</h3><p>Applicants choose between placing a time deposit in an Indonesian bank or purchasing qualifying real estate in Indonesia, each requiring a minimum of IDR 2 billion, roughly $130,000.</p></div>
      <div className="prog-card reveal"><div className="no">04 &middot; ENTRY</div><h3>The e-visa step</h3><p>Because the Second Home application is filed from within Indonesia, applicants first secure an e-visa to enter the country and complete the investment before the long-term visa is submitted.</p></div>
      <div className="prog-card reveal"><div className="no">05 &middot; STRUCTURE</div><h3>Visa structure &amp; validity</h3><p>The Second Home Visa is issued for either 5 or 10 years. A 5-year visa can be extended once for a further 5 years, giving a maximum stay of 10 years under either route.</p></div>
      <div className="prog-card reveal"><div className="no">06 &middot; PATHWAY</div><h3>Long-term pathway</h3><p>After 3 years of continuous legal residence, holders and their family may apply for ITAP, Indonesia's permanent stay permit, renewable every five years.</p></div>
    </div>
  </div>
</section>

{/* ===== BENEFITS ===== */}
<section className="block benefits">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Key Benefits</span>
      <h2>What the visa makes possible</h2>
      <p>The advantages of the programme reach across your finances, your family and your long-term horizon in Indonesia.</p>
    </div>
    <div className="ben-grid">
      <div className="ben-card reveal"><div className="mk">I</div><h3>Long-term residence</h3><p>The legal right to live anywhere in Indonesia for up to a decade, without the frequent renewal cycles attached to shorter-term stay permits.</p></div>
      <div className="ben-card reveal"><div className="mk">II</div><h3>Family included</h3><p>Bring a spouse in an officially recognised marriage, dependent children and parents within the same investment and application framework.</p></div>
      <div className="ben-card reveal"><div className="mk">III</div><h3>Business &amp; investment rights</h3><p>Purchase shares in Indonesian companies, acquire premium real estate and conduct qualifying business activity, while retaining remote work for foreign employers or clients.</p></div>
      <div className="ben-card reveal"><div className="mk">IV</div><h3>Minimal documentation</h3><p>No extensive paperwork trail is required — proof of the qualifying investment, a passport, photographs and a CV form the core of the application.</p></div>
      <div className="ben-card reveal"><div className="mk">V</div><h3>Not employment-based</h3><p>Eligibility rests on the qualifying bank deposit or real estate investment alone — no job offer, business plan or Indonesian-sourced income is required to qualify.</p></div>
      <div className="ben-card reveal"><div className="mk">VI</div><h3>Route to permanence</h3><p>A defined path toward ITAP, Indonesia's permanent stay permit, after three years of continuous legal residence.</p></div>
    </div>
  </div>
</section>

{/* ===== INVESTMENT / FINANCIAL REQUIREMENTS ===== */}
<section className="block finance" id="finance">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Investment Requirements</span>
      <h2>What you need to place</h2>
      <p>The visa rests on a single verifiable investment rather than recurring income. The figures below reflect the current government requirements.</p>
    </div>

    <div className="fin-table reveal">
      <div className="fin-row head">
        <div className="fc">Requirement</div>
        <div className="fc">Bank deposit route</div>
        <div className="fc">Real estate route</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Minimum investment</div>
        <div className="fc fig">$130,000</div>
        <div className="fc fig">$130,000</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Investment in Rupiah</div>
        <div className="fc fig">IDR 2,000,000,000</div>
        <div className="fc fig">IDR 2,000,000,000</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Government fee, per applicant</div>
        <div className="fc fig">$130 (IDR 21m)</div>
        <div className="fc fig">$130 (IDR 21m)</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Property transfer fee</div>
        <div className="fc fig">&mdash;</div>
        <div className="fc fig">~5%</div>
      </div>
      <div className="fin-row total">
        <div className="fc label">VAT on purchase</div>
        <div className="fc fig">&mdash;</div>
        <div className="fc fig">11%</div>
      </div>
    </div>
    <p className="fin-note">Figures are indicative and reflect the qualifying minimums understood to apply under current Indonesian regulation. Requirements may be updated by the Indonesian authorities and should be confirmed during the application. This is general information, not legal or financial advice.</p>

    <div className="fin-extra">
      <div className="fin-x reveal"><h4>Locked investment</h4><p>The deposited funds or purchased property must remain in place for the duration of the visa — withdrawal or sale is not permitted while relying on the Second Home status.</p></div>
      <div className="fin-x reveal"><h4>Valid passport</h4><p>A passport valid for no less than 36 months from the date of application, for the main applicant and each included family member.</p></div>
      <div className="fin-x reveal"><h4>Curriculum vitae</h4><p>A current CV forms part of the core application file alongside the investment evidence and passport photographs.</p></div>
    </div>

    <div className="fin-extra" style={{marginTop: '22px'}}>
      <div className="fin-x reveal"><h4>Passport photographs</h4><p>Two recent colour photographs with a white background, in the format specified by the Indonesian Immigration Service.</p></div>
      <div className="fin-x reveal"><h4>Bank statement or deed</h4><p>A bank statement confirming the minimum balance, or the equivalent evidence of a qualifying real estate purchase.</p></div>
      <div className="fin-x reveal"><h4>Family relationship documents</h4><p>A marriage or birth certificate, translated into English, evidencing the relationship of each included family member to the main applicant, together with a copy of the main applicant's valid Second Home Visa.</p></div>
    </div>
  </div>
</section>

{/* ===== FAMILY INCLUSION ===== */}
<section className="block family">
  <div className="container">
    <div className="fam-grid">
      <div className="fam-media reveal">
        <span className="frame"></span>
        <img src="https://images.unsplash.com/photo-1754027675944-0b0bbb20398e?q=80&w=1200&auto=format&fit=crop" alt="Turquoise water meeting a tropical Indonesian coastline" />
      </div>
      <div className="reveal">
        <span className="eyebrow">Eligible Applicants &amp; Family</span>
        <h2 style={{fontSize: 'clamp(30px,4vw,48px)', marginBottom: '26px'}}>One investment, your family included</h2>
        <ul className="fam-list">
          <li><span className="fi">&#9312;</span><div><h4>Main applicant</h4><p>Any foreign national aged 18 or over who can evidence the qualifying bank deposit or real estate investment and the required supporting documents.</p></div></li>
          <li><span className="fi">&#9313;</span><div><h4>Spouse</h4><p>A spouse in an officially recognised marriage, included alongside the main applicant on the strength of a translated marriage certificate.</p></div></li>
          <li><span className="fi">&#9314;</span><div><h4>Children</h4><p>Dependent children may be included in the same process, supported by a translated birth certificate confirming the relationship.</p></div></li>
          <li><span className="fi">&#9315;</span><div><h4>Parents</h4><p>Parents of the main applicant are also eligible for inclusion, on presentation of the relevant family relationship evidence.</p></div></li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* ===== APPLICATION PROCESS TIMELINE ===== */}
<section className="block process" id="process">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center" style={{color: 'var(--gold-soft)'}}>The Application Journey</span>
      <h2>A guided, six-stage process</h2>
      <p>Langma International coordinates every stage of the process, from initial due diligence to your endorsed visa.</p>
    </div>
    <div className="timeline">
      <div className="tl-item reveal"><div className="dot">01</div><h3>Preliminary due diligence</h3><p>A confidential eligibility review of your circumstances and investment plans, typically completed within about a day, to confirm the route is right for you and reduce the risk of a rejected application.</p></div>
      <div className="tl-item reveal"><div className="dot">02</div><h3>Documentation &amp; e-visa application</h3><p>Preparing your passport, bank statement and CV, and filing for the e-visa required to enter Indonesia and complete your investment. This stage typically runs up to two weeks, with e-visa processing of around 7 to 10 working days.</p></div>
      <div className="tl-item reveal"><div className="dot">03</div><h3>Travel &amp; investment placement</h3><p>Arriving in Indonesia on the e-visa to open your bank account or complete your real estate purchase, transferring the qualifying investment amount into place. This stage can take up to 3 months, depending on when you are able to travel.</p></div>
      <div className="tl-item reveal"><div className="dot">04</div><h3>Second Home application submission</h3><p>Filing the Second Home Visa application with the Immigration Service, supported by your bank or purchase certificate, photographs and CV, together with the government fee. Processing typically takes up to 4 business days.</p></div>
      <div className="tl-item reveal"><div className="dot">05</div><h3>Approval &amp; visa endorsement</h3><p>Once approved, a visit to an Immigration Service office to have the Second Home Visa stamped or endorsed in your passport.</p></div>
      <div className="tl-item reveal"><div className="dot">06</div><h3>Long-term residency planning</h3><p>Guidance on maintaining your status, renewals where relevant, and your longer pathway toward ITAP permanent stay after three years of residence.</p></div>
    </div>
  </div>
</section>

{/* ===== TAX CONSIDERATIONS ===== */}
<section className="block tax" id="tax">
  <div className="container">
    <div className="tax-grid">
      <div className="tax-copy reveal">
        <span className="eyebrow">Tax Considerations</span>
        <h2>Understanding your position in Indonesia</h2>
        <p>The Second Home Visa does not itself grant a local employment permit, and it is designed for financially independent applicants rather than those drawing a salary from an Indonesian employer. Holders may continue working remotely for employers or clients based outside Indonesia, and may invest in and operate a business within the country.</p>
        <p>Because tax treatment depends on your personal circumstances, the source of your income, your time spent in Indonesia, and current Indonesian regulation, Langma International recommends confirming your position with a qualified Indonesian tax adviser before relocating.</p>
      </div>
      <div className="tax-panel reveal">
        <h3>At a glance</h3>
        <div className="tax-line"><span className="t">Right to local employment under this visa</span><span className="v">None</span></div>
        <div className="tax-line"><span className="t">Remote work for foreign employers or clients</span><span className="v">Permitted</span></div>
        <div className="tax-line"><span className="t">Business &amp; investment activity in Indonesia</span><span className="v">Permitted</span></div>
        <div className="tax-line"><span className="t">Specialist advice required for</span><span className="v">Tax residency</span></div>
        <p className="tax-foot">Indicative summary only. Your personal tax position depends on your circumstances and current Indonesian law. Langma International is not a tax adviser; confirm your position with a qualified Indonesian professional.</p>
      </div>
    </div>
  </div>
</section>

<div className="tilework" aria-hidden="true"></div>

{/* ===== LIFE IN INDONESIA ===== */}
<section className="block life">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Life in Indonesia</span>
      <h2>Where will you set up your second home?</h2>
      <p>From a cosmopolitan capital to hillside villages and the coast, Indonesia offers distinct settings for distinct lives and long-term plans.</p>
    </div>
    <div className="life-grid">
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1733119132799-8dec838b3644?q=80&w=1200&auto=format&fit=crop" alt="Aerial view of Jakarta's business district skyscrapers" />
        <div className="ov"></div>
        <div className="cap"><h3>Jakarta</h3><p>Indonesia's business and financial capital — banking, government and a fast-growing skyline, with the country's best domestic and international connectivity.</p></div>
      </div>
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1557093793-d149a38a1be8?q=80&w=1200&auto=format&fit=crop" alt="Terraced rice fields on the hillsides of Ubud, Bali" />
        <div className="ov"></div>
        <div className="cap"><h3>Ubud &amp; Bali's Highlands</h3><p>Rice terraces, wellness retreats and a long-established community of long-term residents in Bali's cultural and creative heartland.</p></div>
      </div>
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1591674585153-ca78d0339b09?q=80&w=1200&auto=format&fit=crop" alt="Ancient temple silhouetted against the sky in Central Java" />
        <div className="ov"></div>
        <div className="cap"><h3>Yogyakarta &amp; Central Java</h3><p>Home to Borobudur and a rich seam of Javanese culture, craft and history, within easy reach of Indonesia's central rail and flight network.</p></div>
      </div>
    </div>
    <div className="life-strip">
      <span className="life-tag reveal">Tropical climate</span>
      <span className="life-tag reveal">Renowned cuisine</span>
      <span className="life-tag reveal">Warm hospitality</span>
      <span className="life-tag reveal">Growing wellness &amp; remote-work communities</span>
      <span className="life-tag reveal">Regional flight connectivity</span>
      <span className="life-tag reveal">Coworking &amp; business hubs</span>
    </div>
  </div>
</section>

{/* ===== WHY LANGMA ===== */}
<section className="block langma" id="langma">
  <div className="container">
    <div className="langma-grid">
      <div className="reveal">
        <span className="eyebrow" style={{color: 'var(--gold-soft)'}}>Why Langma International</span>
        <h2>A trusted partner for a process that deserves care</h2>
        <p className="lead">We help individuals and families access long-term residency across Asia and beyond through transparent guidance, strategic planning and genuinely personalised support — never overpromising, never guaranteeing outcomes we cannot control.</p>
        <p className="lead">From the first conversation to your endorsed visa, you work with people who understand both the regulation and the human reality of building a second home in a new country.</p>
      </div>
      <div className="lg-list reveal">
        <div className="lg-item"><h4>Global mobility expertise</h4><p>Cross-border residency experience spanning Asia, Europe and beyond, applied to your specific circumstances.</p></div>
        <div className="lg-item"><h4>Personalised consultation</h4><p>A considered assessment of your investment plans, family and goals — not a templated checklist.</p></div>
        <div className="lg-item"><h4>Documentation support</h4><p>Hands-on help assembling, certifying and sequencing the paperwork that makes or breaks a file.</p></div>
        <div className="lg-item"><h4>Application guidance</h4><p>Coordination through every official stage, from e-visa arrangements to your Second Home Visa endorsement.</p></div>
        <div className="lg-item"><h4>International network</h4><p>Trusted partners on the ground in Indonesia — legal, banking and property — to keep your relocation moving.</p></div>
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
        <button className="faq-q" onClick={() => toggleFaq(0)}>What is the Indonesia Second Home Visa?<span className="pm">{openFaq===0 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===0 ? "600px" : "0"}}><p>The Second Home Visa is a long-term Indonesian stay permit that allows eligible foreign nationals to live in Indonesia — in Bali or any other province — for up to 10 years. It is granted for either a 5-year or a 10-year term, and the 5-year term can be extended once for a further 5 years. Eligibility is based on a qualifying investment rather than employment or business sponsorship.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===1 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(1)}>How much do I need to invest?<span className="pm">{openFaq===1 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===1 ? "600px" : "0"}}><p>Applicants must place a minimum of IDR 2,000,000,000 — approximately $130,000 — either as a time deposit in an Indonesian bank or as a real estate purchase in Indonesia. A government fee of roughly $130 per applicant is payable on filing, and real estate purchases carry an additional transfer cost of around 5% and VAT of 11%, which do not apply to the bank-deposit route.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===2 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(2)}>Can I bring my family?<span className="pm">{openFaq===2 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===2 ? "600px" : "0"}}><p>Yes. A spouse in an officially recognised marriage, dependent children, and parents can be included alongside the main applicant. Family members apply on the strength of the main applicant's visa and a translated marriage or birth certificate confirming the relationship.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===3 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(3)}>Can I work while holding the visa?<span className="pm">{openFaq===3 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===3 ? "600px" : "0"}}><p>The Second Home Visa does not grant a local employment permit and holders may not take up employment with an Indonesian company. Holders may continue working remotely for employers or clients based outside Indonesia, and are permitted to invest in and conduct business activities within the country, including purchasing shares in local companies and acquiring premium real estate.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===4 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(4)}>Can it lead to permanent residency?<span className="pm">{openFaq===4 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===4 ? "600px" : "0"}}><p>Yes. After 3 years of continuous legal residence in Indonesia on a Second Home Visa, holders and their included family members may apply for ITAP, Indonesia's permanent stay permit. The ITAP card is renewable every five years, subject to continuing eligibility.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===5 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(5)}>How long does the process take?<span className="pm">{openFaq===5 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===5 ? "600px" : "0"}}><p>A Second Home Visa can be obtained in as little as one month from the start of the process, though timing depends on how quickly the applicant can travel to Indonesia. Preliminary due-diligence review typically takes about a day, e-visa processing runs roughly 7 to 10 working days, and the Second Home application itself is generally decided within a few business days once the investment has been placed and the file is submitted.</p></div>
      </div>
    </div>
  </div>
</section>

{/* ===== LEAD FORM / CONSULTATION CTA ===== */}
<section className="block lead-sec" id="lead">
  <div className="container">
    <div className="lead-grid">
      <div className="lead-copy reveal">
        <span className="eyebrow">Begin Your Journey</span>
        <h2>Begin your Indonesia residency journey with expert guidance</h2>
        <p>Share a few details and a Langma International advisor will arrange a confidential consultation to assess your eligibility and outline a realistic path forward — with no obligation.</p>
        <ul className="lead-assure">
          <li>Strictly confidential, no-obligation review</li>
          <li>Honest assessment of your eligibility</li>
          <li>Clear timelines and transparent guidance</li>
          <li>Introductions to trusted partners on the ground in Indonesia</li>
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
            <label htmlFor="work">Preferred investment route</label>
            <select id="work">
              <option value="">Please select</option>
              <option>Bank deposit</option>
              <option>Real estate purchase</option>
              <option>Not yet decided</option>
              <option>Other / combination</option>
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
        <h2>Visit our office &amp; discuss your Indonesia residency goals</h2>
        <p>Prefer to meet face to face? Sit down with our advisory team for a private, one-on-one consultation and map your route to Indonesian residency in confidence.</p>
        <ul className="office-points">
          <li><span className="oi">&#10022;</span><div><h4>One-on-one consultation</h4><p>A direct conversation with the people who will guide your case.</p></div></li>
          <li><span className="oi">&#10003;</span><div><h4>Personal eligibility review</h4><p>An honest look at your investment plans, family composition and timeline.</p></div></li>
          <li><span className="oi">&#8618;</span><div><h4>Your residency roadmap</h4><p>A clear, step-by-step plan with a candid document assessment.</p></div></li>
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

{/* ===== CALENDAR BOOKING ===== */}
<section className="block calendar" id="calendar">
  <div className="container">
    <div className="cal-grid">
      <div className="cal-copy reveal">
        <span className="eyebrow" style={{color: 'var(--gold-soft)'}}>Schedule a Meeting</span>
        <h2>Reserve a private consultation slot</h2>
        <p>Choose a date and time that suits you for a confidential video or phone consultation with a senior Langma International advisor. We'll review your eligibility and answer your questions directly.</p>
        <ul className="cal-benefits">
          <li>A focused 30-minute session built around your situation</li>
          <li>A candid view of your eligibility and likely timeline</li>
          <li>Clear next steps and a transparent fee outline</li>
        </ul>
        <div className="cal-urgency"><span className="dot-pulse"></span><span>Limited advisory slots open each week — early dates fill quickly</span></div>
      </div>
      <div className="cal-card reveal">
        <h3>Pick a date &amp; time</h3>
        <p className="csub">All times shown are local to our advisory office.</p>
        <div className="cal-head">
          <span>{MONTHS[calView.getMonth()]} {calView.getFullYear()}</span>
          <div>
            <button type="button" aria-label="Previous month" onClick={calPrev}>‹</button>
            <button type="button" aria-label="Next month" onClick={calNext}>›</button>
          </div>
        </div>
        <div className="cal-dow"><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span></div>
        <div className="cal-days">
          {calDays}
        </div>
        <div className="cal-slots">
          {['09:30','11:00','13:00','15:30','17:00','18:30'].map(slot => (
            <div key={slot} className={`cal-slot ${calSlot===slot ? 'sel' : ''}`} onClick={() => { setCalSlot(slot); setCalConfirm(''); }}>{slot}</div>
          ))}
        </div>
        <button type="button" className="btn btn-gold" onClick={handleCalBook}>Confirm My Slot</button>
        {calConfirm && <div className="cal-confirm">{calConfirm}</div>}
      </div>
    </div>
  </div>
</section>

      </main>
    </div>
  );
};

export default LangmaIndonesiaSecondHomeVisaPage;