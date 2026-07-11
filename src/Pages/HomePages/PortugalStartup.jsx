import React, { useState, useEffect, useMemo } from 'react';
import { useResidencyLeadForms } from '../../hooks/useResidencyLeadForms';
import { todayStr } from '../../utils/residencyFormHelpers';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SERVICE = 'Portugal Startup Visa (D2)';

const LangmaPortugalStartupVisaPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadSubmitted, officeSubmitted,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Portugal Startup Consultation' });

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
    --navy:#296166;
    --navy-deep:#1A2540;
    --navy-mid:#296166;
    --emerald:#0E4B3E;
    --emerald-soft:#3D7A68;
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
  .lg-page .btn-ghost {background:transparent;color:#1A2540;border:2px solid #2FC7A1;}
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
    background:rgba(26,37,64,0.94);backdrop-filter:blur(10px);
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
    min-height:auto;
    display:flex;
    align-items:center;
    color:#1B2B28;
    overflow:hidden;
    background:#FFFFFF;padding:96px 0 70px;
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
  .lg-page .hero h1 {font-size:clamp(38px,5vw,66px);color:#1B2B28;margin-bottom:26px;font-weight:600;line-height:1.08;}
  .lg-page .hero h1 em {font-style:italic;color:#4FA3D1;font-weight:500;}
  .lg-page .hero .lead {font-size:17.5px;color:#4C5C58;max-width:560px;margin-bottom:38px;font-weight:300;line-height:1.72;}
  .lg-page .hero-cta {display:flex;gap:16px;flex-wrap:wrap;margin-bottom:48px;}
  .lg-page .hero-badges {display:flex;gap:36px;flex-wrap:wrap;border-top:1px solid #D8E0EC;padding-top:28px;}
  .lg-page .hero-badge .num {font-family:'Cormorant Garamond',serif;font-size:30px;color:#296166;font-weight:600;line-height:1;}
  .lg-page .hero-badge .lbl {font-size:11.5px;letter-spacing:.6px;color:#7E8C88;margin-top:6px;}

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
    background:linear-gradient(to top,rgba(26,37,64,.42) 0%,transparent 55%);
    z-index:1;border-radius:12px;pointer-events:none;
  }
  .lg-page .hero-visual::before {
    content:"";position:absolute;top:24px;right:-14px;width:100%;max-width:520px;height:100%;
    border:1px solid rgba(47,199,161,.18);border-radius:12px;pointer-events:none;
  }
  .lg-page .hero-img-badge {
    position:absolute;bottom:22px;left:22px;z-index:3;
    background:rgba(26,37,64,.82);backdrop-filter:blur(8px);
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

  /* ===== WHY PORTUGAL ===== */
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

  /* ===== INCUBATOR / INNOVATION CRITERIA ===== */
  .lg-page .incubator {background:var(--ivory);}

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

  /* ===== LIFE IN PORTUGAL ===== */
  .lg-page .life {background:var(--beige);}
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
        <span className="eyebrow">Portugal Startup Visa &middot; Residence Programme for Entrepreneurs</span>
        <h1>Portugal Startup Visa: build your venture, <em>secure your European future</em></h1>
        <p className="lead">Bring an innovative business idea, partner with a certified Portuguese incubator, and open the door to residency in one of Europe's most welcoming nations for founders. The Portugal Startup Visa rewards ambition rather than capital — there is no fixed investment threshold. Langma International accompanies you from your first eligibility review to a residence card in hand, working alongside licensed Portuguese legal professionals at every stage.</p>
        <div className="hero-cta">
          <a href="#lead" className="btn btn-gold">Book Your Private Consultation</a>
          <a href="#programme" className="btn btn-ghost">Explore the Visa</a>
        </div>
        <div className="hero-badges">
          <div className="hero-badge"><div className="num">&euro;11,040<span style={{fontSize: '16px'}}>+</span></div><div className="lbl">Funds reference, no fixed investment</div></div>
          <div className="hero-badge"><div className="num">2 + 3</div><div className="lbl">Year residence permit cycle</div></div>
          <div className="hero-badge"><div className="num">10+</div><div className="lbl">Months, typical obtaining period</div></div>
          <div className="hero-badge"><div className="num">Family</div><div className="lbl">Included by reunification</div></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-img-frame">
          <img src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1200&auto=format&fit=crop" alt="Lisbon skyline at golden hour above the Tagus River" />
          <div className="hero-img-badge">
            <span className="dot-pulse"></span>
            <span>Lisbon, Portugal</span>
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
      <div className="stat-cell reveal"><div className="v">&euro;11,040+</div><div className="k">Demonstrable funds for residence, no fixed investment</div></div>
      <div className="stat-cell reveal"><div className="v">5 yrs</div><div className="k">Legal residence toward permanent residency</div></div>
      <div className="stat-cell reveal"><div className="v">Schengen</div><div className="k">Visa-free short-stay travel as a permit holder</div></div>
      <div className="stat-cell reveal"><div className="v">182</div><div className="k">Countries reachable visa-free with a Portuguese passport</div></div>
    </div>
  </div>
</section>

{/* ===== ABOUT PORTUGAL ===== */}
<section className="block about" id="about">
  <div className="container">
    <div className="about-grid">
      <div className="about-copy reveal">
        <span className="eyebrow">Discover Portugal</span>
        <h2>Portugal: a stable, sunlit gateway to the European Union</h2>
        <p>Set on the westernmost edge of mainland Europe, Portugal is one of the continent's oldest nations, known for its political stability, public safety and warm reception of international entrepreneurs. Lisbon is the capital, Portuguese the official language — with English widely spoken across business circles — and the euro the currency. As a long-standing member of both the European Union and the Schengen Area, Portugal grants its residents exceptional freedom of movement across the continent.</p>
        <p>Home to roughly 10.5 million people, the country runs an innovation-driven, export-oriented economy with genuine strength in technology, renewable energy, tourism, manufacturing and international business services. Lisbon and Porto have become genuine founder hubs, drawing capital, incubators and talent from across the globe.</p>
        <p>For entrepreneurs weighing where to build next, the appeal is straightforward: a credible tech ecosystem, a manageable cost of living by Western European standards, and a residency framework built specifically around the act of starting a company.</p>
      </div>
      <div className="about-media reveal">
        <span className="frame"></span>
        <img src="https://images.unsplash.com/photo-1513735492246-483525079686?q=80&w=1200&auto=format&fit=crop" alt="Historic tiled rooftops and tram lines in central Lisbon" />
      </div>
    </div>

    <div className="facts-row">
      <div className="fact reveal"><div className="ff">~10.5M</div><div className="fl">Population</div></div>
      <div className="fact reveal"><div className="ff">Lisbon</div><div className="fl">Capital city</div></div>
      <div className="fact reveal"><div className="ff">Euro&nbsp;(&euro;)</div><div className="fl">Official currency</div></div>
      <div className="fact reveal"><div className="ff">EU &amp; Schengen</div><div className="fl">Full member state</div></div>
    </div>
  </div>
</section>

{/* ===== WHY PORTUGAL ===== */}
<section className="block why">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Why Entrepreneurs Choose Portugal</span>
      <h2>The reasons founders relocate — and the reasons they stay</h2>
      <p>Beyond the residence permit itself, Portugal offers an environment that keeps founders, innovators and their families building long after the paperwork is signed.</p>
    </div>
    <div className="why-grid">
      <div className="why-card reveal"><div className="ic">&#9733;</div><h3>EU member-state residence</h3><p>A residence permit in a stable, founder-friendly European Union economy, with the right to live in Portugal and travel visa-free for short stays across the Schengen Area.</p></div>
      <div className="why-card reveal"><div className="ic">&#9919;</div><h3>No fixed investment threshold</h3><p>Unlike capital-led residency routes, the Startup Visa is built around an idea and an incubator partnership rather than a mandated euro figure.</p></div>
      <div className="why-card reveal"><div className="ic">&#10031;</div><h3>A genuine innovation ecosystem</h3><p>Certified business incubators, growing venture capital activity and an internationally minded founder community centred on Lisbon and Porto.</p></div>
      <div className="why-card reveal"><div className="ic">&#9998;</div><h3>Favourable tax planning</h3><p>Tax-resident founders may apply for the Non-Habitual Resident regime, a ten-year status that can shelter qualifying foreign-source income from Portuguese tax.</p></div>
      <div className="why-card reveal"><div className="ic">&#10010;</div><h3>Quality of life</h3><p>A mild climate, picturesque coastline and an internationally recognised standard of living for relocating founders and their families.</p></div>
      <div className="why-card reveal"><div className="ic">&#9215;</div><h3>A path to citizenship</h3><p>A structured route through residence, permanent residence and, in time, naturalisation — with a Portuguese passport opening visa-free access to 182 countries.</p></div>
    </div>
  </div>
</section>

<div className="tilework" aria-hidden="true"></div>

{/* ===== PROGRAMME OVERVIEW / ELIGIBILITY ===== */}
<section className="block prog" id="programme">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center" style={{color: 'var(--gold-soft)'}}>The Programme</span>
      <h2>The Portugal Startup Visa, explained clearly</h2>
      <p>A residence route built around an innovative business idea and an incubator partnership rather than a mandated capital outlay — modern, regulated and genuinely entrepreneurial.</p>
    </div>
    <div className="prog-grid">
      <div className="prog-card reveal"><div className="no">01 &middot; DEFINITION</div><h3>What is the visa?</h3><p>A residence route for entrepreneurs, set out in Articles 60 and 81 of Portugal's Immigration Act (REPSAE). Applicants present an innovative project and apply through IAPMEI, the agency that runs the programme.</p></div>
      <div className="prog-card reveal"><div className="no">02 &middot; ELIGIBILITY</div><h3>Who can apply?</h3><p>Applicants aged 18 or over, with no criminal record and no permanent residency or citizenship already held in the EU. The main applicant must be a non-EU citizen or resident.</p></div>
      <div className="prog-card reveal"><div className="no">03 &middot; THE IDEA</div><h3>The business test</h3><p>A developed business idea with a detailed plan, presentation and financial aims — at the idea stage is acceptable, provided the substance is genuine and innovation-focused.</p></div>
      <div className="prog-card reveal"><div className="no">04 &middot; INCUBATOR</div><h3>Incubator partnership</h3><p>Cooperation with a certified Portuguese business incubator is obligatory. The incubator evaluates and supports the project before the application can advance.</p></div>
      <div className="prog-card reveal"><div className="no">05 &middot; FUNDS</div><h3>Proof of funds</h3><p>Confirmation of at least roughly &euro;11,040, broadly the sum considered necessary to live in Portugal for a year — evidenced through bank statements, alongside a registered Portuguese address.</p></div>
      <div className="prog-card reveal"><div className="no">06 &middot; STRUCTURE</div><h3>Visa &amp; permit</h3><p>Once approved, the first Portuguese residence card is issued for two years and can be renewed for a further three, subject to continuing to meet the conditions.</p></div>
    </div>
  </div>
</section>

{/* ===== BENEFITS ===== */}
<section className="block benefits">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Key Benefits</span>
      <h2>What the residence permit makes possible</h2>
      <p>The advantages of the programme reach across your business, your family and your long-term horizon.</p>
    </div>
    <div className="ben-grid">
      <div className="ben-card reveal"><div className="mk">I</div><h3>Residency without a fixed sum</h3><p>A Portuguese residence permit obtained without the mandated investment thresholds attached to other routes, such as the &euro;250,000+ required for the Golden Visa.</p></div>
      <div className="ben-card reveal"><div className="mk">II</div><h3>Family included</h3><p>A spouse or registered partner, dependent children and financially dependent parents may obtain residency by family reunification alongside the main applicant.</p></div>
      <div className="ben-card reveal"><div className="mk">III</div><h3>Schengen mobility</h3><p>As a Portuguese residence-permit holder, travel visa-free for short stays of up to 90 days in any 180 across the Schengen Area.</p></div>
      <div className="ben-card reveal"><div className="mk">IV</div><h3>Build your business in Europe</h3><p>Open and grow a company in Portugal with the practical support of a certified incubator, from office space to documentation guidance.</p></div>
      <div className="ben-card reveal"><div className="mk">V</div><h3>Tax optimisation</h3><p>Tax-resident founders may pursue the Non-Habitual Resident regime, a ten-year status with favourable treatment of qualifying foreign-source income.</p></div>
      <div className="ben-card reveal"><div className="mk">VI</div><h3>Route to citizenship</h3><p>A clear pathway through permanent residence after five years, toward Portuguese citizenship under the rules in force at the time of application.</p></div>
    </div>
  </div>
</section>

{/* ===== FINANCIAL / INVESTMENT REQUIREMENTS ===== */}
<section className="block finance" id="finance">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Investment &amp; Financial Requirements</span>
      <h2>What you need to demonstrate</h2>
      <p>The Startup Visa rests on a credible business idea and proof of living funds rather than a mandated investment figure. The costs below reflect current published references.</p>
    </div>

    <div className="fin-table reveal">
      <div className="fin-row head">
        <div className="fc">Cost category</div>
        <div className="fc">Reference amount</div>
        <div className="fc">Notes</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Funds for a year of living in Portugal</div>
        <div className="fc fig">&euro;11,040+</div>
        <div className="fc fig">Per applicant</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Business idea / company formation</div>
        <div className="fc fig">No fixed sum</div>
        <div className="fc fig">Spent building the project</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Government fee — visa</div>
        <div className="fc fig">&euro;90</div>
        <div className="fc fig">Per person</div>
      </div>
      <div className="fin-row total">
        <div className="fc label">Government fee — residence permit</div>
        <div className="fc fig">~&euro;160</div>
        <div className="fc fig">Per person</div>
      </div>
    </div>
    <p className="fin-note">There is no obligatory investment threshold for the Startup Visa itself. Figures reflect published government and living-cost references and may be updated by the Portuguese authorities. This is general information, not legal or financial advice.</p>

    <div className="fin-extra">
      <div className="fin-x reveal"><h4>Proof of funds</h4><p>Bank statements or equivalent evidence confirming at least roughly &euro;11,040, the amount generally considered necessary to live in Portugal for one year.</p></div>
      <div className="fin-x reveal"><h4>Accommodation in Portugal</h4><p>A rental agreement or property purchase giving a registered address in Portugal — there is no minimum property price or rental amount.</p></div>
      <div className="fin-x reveal"><h4>Health insurance</h4><p>Valid health insurance is required, typically costing around &euro;400 or more depending on coverage and provider.</p></div>
    </div>
  </div>
</section>

{/* ===== STARTUP VS GOLDEN VISA COMPARISON ===== */}
<section className="block finance">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Choosing Your Pathway</span>
      <h2>Portugal Startup Visa vs Portugal Golden Visa</h2>
      <p>Both routes lead to the same destination — a Portuguese residence permit and, in time, EU mobility — yet they are built for different kinds of applicants. The Startup Visa is shaped around an innovative business idea and hands-on incubator partnership, rewarding founders who want to build something in Portugal. The Golden Visa, by contrast, is structured around a qualifying capital commitment, suiting investors who prefer a passive route to residency without operating a company on the ground.</p>
    </div>

    <div className="fin-table reveal">
      <div className="fin-row head">
        <div className="fc">Criteria</div>
        <div className="fc">Portugal Startup Visa</div>
        <div className="fc">Portugal Golden Visa</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Investment amount</div>
        <div className="fc">No government-mandated investment figure — capital is directed toward developing the approved venture</div>
        <div className="fc fig">&euro;250,000+</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Processing timeline</div>
        <div className="fc fig">10+ months</div>
        <div className="fc fig">12+ months</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Physical presence requirement</div>
        <div className="fc">1.5 years running, or 16 months in total, within each two-year period</div>
        <div className="fc fig">~7 days / year</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Family inclusion</div>
        <div className="fc">Spouse, dependent children and dependent parents obtain residence through family reunification</div>
        <div className="fc">Spouse, children under 26 where applicable, and dependent parents may join the primary application</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Investment retention period</div>
        <div className="fc fig">5+ years</div>
        <div className="fc fig">5+ years</div>
      </div>
      <div className="fin-row total">
        <div className="fc label">Residence permit fee</div>
        <div className="fc fig">&euro;73 per applicant</div>
        <div className="fc fig">&euro;6,180 per applicant</div>
      </div>
    </div>
    <p className="fin-note">Figures reflect official programme terms referenced by Immigrant Invest and may be revised by the Portuguese authorities. This comparison is general guidance, not legal or financial advice.</p>

    <div className="fin-extra">
      <div className="fin-x reveal"><h4>Best suited to entrepreneurs</h4><p>If your strength is an innovative idea rather than a large pool of capital, the Startup Visa lets you earn residency by building a genuine business with the backing of a certified Portuguese incubator.</p></div>
      <div className="fin-x reveal"><h4>Best suited to investors</h4><p>If you prefer a capital-led route with minimal time on the ground, the Golden Visa offers residency through a qualifying investment and the lightest physical-presence requirement of the two pathways.</p></div>
    </div>
  </div>
</section>

{/* ===== INCUBATOR / STARTUP INNOVATION CRITERIA ===== */}
<section className="block incubator">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Incubator &amp; Innovation Criteria</span>
      <h2>What makes a company suitable for the programme</h2>
      <p>Partnership with a certified Portuguese business incubator is obligatory. Both the incubator and IAPMEI assess each project against the same core standards.</p>
    </div>
    <div className="ben-grid">
      <div className="ben-card reveal"><div className="mk">01</div><h3>A genuine business plan</h3><p>The project may still be at the idea stage, but it must come with a detailed business plan, presentation and clear financial aims.</p></div>
      <div className="ben-card reveal"><div className="mk">02</div><h3>Innovation &amp; technology focus</h3><p>The company must be centred on innovation and technology rather than a conventional, low-differentiation trading activity.</p></div>
      <div className="ben-card reveal"><div className="mk">03</div><h3>International ambition</h3><p>A credible orientation toward entering international markets, not solely the domestic Portuguese economy.</p></div>
      <div className="ben-card reveal"><div className="mk">04</div><h3>Job-creation potential</h3><p>A reasonable prospect of creating positions for highly qualified professionals as the company matures.</p></div>
      <div className="ben-card reveal"><div className="mk">05</div><h3>Growth trajectory</h3><p>The potential to reach &euro;325,000 or more in annual turnover or asset value within five years of operation.</p></div>
      <div className="ben-card reveal"><div className="mk">06</div><h3>Incubator &amp; IAPMEI review</h3><p>The business plan is evaluated first by an incubator and then by IAPMEI before the founder may proceed to apply for the visa.</p></div>
    </div>
  </div>
</section>

{/* ===== FAMILY / ELIGIBLE APPLICANTS ===== */}
<section className="block family">
  <div className="container">
    <div className="fam-grid">
      <div className="fam-media reveal">
        <span className="frame"></span>
        <img src="https://images.unsplash.com/photo-1525920470207-a519b283561c?q=80&w=1200&auto=format&fit=crop" alt="Founders collaborating in a modern Lisbon coworking space" />
      </div>
      <div className="reveal">
        <span className="eyebrow">Eligible Applicants &amp; Family</span>
        <h2 style={{fontSize: 'clamp(30px,4vw,48px)', marginBottom: '26px'}}>One venture, your family included</h2>
        <ul className="fam-list">
          <li><span className="fi">&#9312;</span><div><h4>Main applicant</h4><p>A non-EU citizen or resident aged 18+, with no criminal record and no existing permanent residency or citizenship in the EU, who presents the innovative project.</p></div></li>
          <li><span className="fi">&#9313;</span><div><h4>Startup co-founders</h4><p>Up to five business partners may join the same application, each generally expected to hold at least 10% of the company.</p></div></li>
          <li><span className="fi">&#9314;</span><div><h4>Spouse &amp; dependent children</h4><p>A spouse or registered partner and dependent children obtain Portuguese residency through family reunification alongside the main applicant.</p></div></li>
          <li><span className="fi">&#9315;</span><div><h4>Dependent parents</h4><p>Parents who are financially dependent on the main applicant may also be included through the same family-reunification process.</p></div></li>
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
      <h2>A guided, eight-stage process</h2>
      <p>Langma International coordinates every stage and introduces licensed Portuguese legal professionals where local representation is required. The full process typically takes around ten months or more.</p>
    </div>
    <div className="timeline">
      <div className="tl-item reveal"><div className="dot">01</div><h3>Preliminary due-diligence review</h3><p>A confidential assessment of your business idea, background and goals before any contract is signed — confirming the route is right and identifying potential difficulties early.</p></div>
      <div className="tl-item reveal"><div className="dot">02</div><h3>Documentation preparation</h3><p>Assembling business plans, motivation letters and CVs, securing tax and social security numbers in Portugal, and gathering criminal-record certificates and bank statements.</p></div>
      <div className="tl-item reveal"><div className="dot">03</div><h3>Application to IAPMEI</h3><p>Submitting the project description and supporting documents online to IAPMEI, the agency responsible for the Startup Visa programme.</p></div>
      <div className="tl-item reveal"><div className="dot">04</div><h3>Finding an incubator</h3><p>Approaching certified incubators and completing interviews until one agrees to develop the project, then finalising the IAPMEI application form.</p></div>
      <div className="tl-item reveal"><div className="dot">05</div><h3>Consideration of the application</h3><p>IAPMEI reviews the application, typically over a period of around 30 days, with progress trackable through the applicant's online account.</p></div>
      <div className="tl-item reveal"><div className="dot">06</div><h3>Declaration &amp; consular visa</h3><p>A declaration of participation, valid for six months, allows the applicant to apply for a visa at the Portuguese consulate in their country of residence.</p></div>
      <div className="tl-item reveal"><div className="dot">07</div><h3>AIMA appointment</h3><p>Attending the Agency for Integration, Migrations and Asylum (AIMA) on the scheduled date to submit documents for the residence permit.</p></div>
      <div className="tl-item reveal"><div className="dot">08</div><h3>Residence permit card</h3><p>Once approved, AIMA issues the residence card to the applicant's Portuguese address — valid for two years and renewable for a further three.</p></div>
    </div>
  </div>
</section>

{/* ===== RESIDENCE RENEWAL / PERMANENT RESIDENCY / CITIZENSHIP PATHWAY ===== */}
<section className="block pathway">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Renewal, Permanence &amp; Citizenship</span>
      <h2>Your long-term pathway in Portugal</h2>
      <p>The Startup Visa is a beginning, not an end point. Each stage builds toward a longer-term footing in Portugal and, eventually, the European Union.</p>
    </div>
    <div className="ben-grid">
      <div className="ben-card reveal"><div className="mk">RENEWAL</div><h3>Residence permit renewal</h3><p>The first residence card, valid two years, is renewable for a further three. Renewal requires spending 1.5 years in a row, or 16 months in total, in Portugal within each two-year period.</p></div>
      <div className="ben-card reveal"><div className="mk">PERMANENCE</div><h3>Permanent residence</h3><p>After five years of legal residence in Portugal, holders may apply for permanent residence, consolidating their long-term position in the country.</p></div>
      <div className="ben-card reveal"><div className="mk">CITIZENSHIP</div><h3>Citizenship pathway</h3><p>Naturalisation generally becomes possible after a further period of legal residence. Under rules effective from May 2026, this is ten years for most foreign nationals and seven years for applicants from EU and Portuguese-speaking countries; the change is not retroactive for applications already filed. A Portuguese passport allows visa-free travel to 182 countries, and Portugal recognises dual citizenship.</p></div>
    </div>
  </div>
</section>

{/* ===== TAX CONSIDERATIONS ===== */}
<section className="block tax" id="tax">
  <div className="container">
    <div className="tax-grid">
      <div className="tax-copy reveal">
        <span className="eyebrow">Tax Overview</span>
        <h2>The Non-Habitual Resident advantage</h2>
        <p>One of the more compelling features available to Portugal Startup Visa holders is access to Portugal's beneficial tax status for new residents — the Non-Habitual Resident (NHR) regime. For qualifying founders, it can meaningfully shape the tax position of relocating to Portugal.</p>
        <p>Once a holder has spent 183 days a year in Portugal and becomes a Portuguese tax resident, they may apply for NHR status, a ten-year regime. Under it, qualifying foreign-source income may be exempt from Portuguese taxation where it is already taxed in another country under a double-tax treaty with Portugal.</p>
      </div>
      <div className="tax-panel reveal">
        <h3>At a glance</h3>
        <div className="tax-line"><span className="t">Tax-resident trigger</span><span className="v">183 days/yr</span></div>
        <div className="tax-line"><span className="t">Duration of the NHR status</span><span className="v">10 years</span></div>
        <div className="tax-line"><span className="t">Treatment of qualifying foreign income</span><span className="v">may be exempt</span></div>
        <div className="tax-line"><span className="t">Condition</span><span className="v">double-tax treaty</span></div>
        <p className="tax-foot">Indicative summary only. Eligibility, duration and exact treatment depend on individual circumstances and current Portuguese law. Langma International is not a tax adviser; confirm your position with a qualified Portuguese professional.</p>
      </div>
    </div>
  </div>
</section>

<div className="tilework" aria-hidden="true"></div>

{/* ===== LIFE IN PORTUGAL ===== */}
<section className="block life">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Living in Portugal</span>
      <h2>Where will you build your venture?</h2>
      <p>From a capital-city ecosystem to riverside innovation hubs, Portugal offers distinct settings for distinct founders and working styles.</p>
    </div>
    <div className="life-grid">
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=1200&auto=format&fit=crop" alt="Lisbon's historic Alfama district overlooking the Tagus River" />
        <div className="ov"></div>
        <div className="cap"><h3>Lisbon</h3><p>The capital and the country's leading start-up hub, home to incubators, venture capital and one of Europe's most active founder communities.</p></div>
      </div>
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1555881400-29d3bca691f9?q=80&w=1200&auto=format&fit=crop" alt="Colourful riverside buildings along Porto's Douro River" />
        <div className="ov"></div>
        <div className="cap"><h3>Porto</h3><p>A rising technology centre on the Douro River, prized for its lower cost of living and increasingly international talent pool.</p></div>
      </div>
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1559573770-d4eda3a7df9c?q=80&w=1200&auto=format&fit=crop" alt="A sunlit coastal town along Portugal's Algarve coastline" />
        <div className="ov"></div>
        <div className="cap"><h3>The Algarve &amp; Coast</h3><p>Sunshine, ocean and a relaxed, well-connected base for founders who want their working life balanced by coastal living.</p></div>
      </div>
    </div>
    <div className="life-strip">
      <span className="life-tag reveal">Mild Atlantic climate</span>
      <span className="life-tag reveal">Certified business incubators</span>
      <span className="life-tag reveal">Safe, walkable cities</span>
      <span className="life-tag reveal">Growing founder community</span>
      <span className="life-tag reveal">Modern coworking spaces</span>
      <span className="life-tag reveal">Strong EU connectivity</span>
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
        <p className="lead">We help entrepreneurs and families access European residency through transparent guidance, strategic planning and genuinely personalised support — never overpromising, never guaranteeing outcomes we cannot control.</p>
        <p className="lead">From your first conversation to your residence card, you work with people who understand both the regulation and the human reality of relocating a business and a life abroad.</p>
      </div>
      <div className="lg-list reveal">
        <div className="lg-item"><h4>Global mobility expertise</h4><p>Cross-border residency experience spanning Europe and beyond, applied to your specific business and circumstances.</p></div>
        <div className="lg-item"><h4>Personalised consultation</h4><p>A considered assessment of your business idea, finances and family composition — not a templated checklist.</p></div>
        <div className="lg-item"><h4>Documentation support</h4><p>Hands-on help assembling, certifying and sequencing the business plan and paperwork that make or break a file.</p></div>
        <div className="lg-item"><h4>Incubator coordination</h4><p>Guidance through incubator outreach and interviews, and coordination through every official IAPMEI and AIMA stage.</p></div>
        <div className="lg-item"><h4>International network</h4><p>Trusted partners on the ground — legal, tax, banking and property — to keep your relocation and venture moving.</p></div>
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
        <button className="faq-q" onClick={() => toggleFaq(0)}>What is the Portugal Startup Visa?<span className="pm">{openFaq===0 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===0 ? "600px" : "0"}}><p>The Portugal Startup Visa is a residence route, set out in Articles 60 and 81 of Portugal's Immigration Act (REPSAE), for non-EU entrepreneurs who present an innovative business idea and partner with a certified Portuguese business incubator. Applicants apply through IAPMEI, and successful candidates gain a route to a Portuguese residence permit.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===1 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(1)}>How much money do I need?<span className="pm">{openFaq===1 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===1 ? "600px" : "0"}}><p>There is no fixed investment amount. The applicant must show at least roughly &euro;11,040, broadly the sum considered necessary to live in Portugal for a year, typically evidenced through bank statements. Separate spending goes toward building the business itself, with no mandated figure attached.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===2 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(2)}>Can I bring my family?<span className="pm">{openFaq===2 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===2 ? "600px" : "0"}}><p>Yes. A spouse or registered partner, dependent children and financially dependent parents may obtain Portuguese residency through family reunification alongside the main applicant. Up to five business co-founders may also join the same startup application.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===3 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(3)}>What tax advantages are available?<span className="pm">{openFaq===3 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===3 ? "600px" : "0"}}><p>Once a holder becomes a Portuguese tax resident by spending 183 days a year in the country, they may apply for the Non-Habitual Resident regime — a beneficial ten-year tax status that can exempt qualifying foreign-source income from Portuguese tax where a relevant double-tax treaty applies. Always confirm your position with a qualified Portuguese tax adviser.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===4 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(4)}>Can it lead to permanent residency or citizenship?<span className="pm">{openFaq===4 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===4 ? "600px" : "0"}}><p>The first residence card is valid for two years and renewable for a further three. After five years of legal residence, holders may apply for permanent residence. Naturalisation generally follows a further period of legal residence — under rules effective May 2026, ten years for most foreign nationals and seven years for EU and Portuguese-speaking-country nationals, with the change not applied retroactively to applications already filed.</p></div>
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
        <h2>Begin your Portugal residency journey with expert guidance</h2>
        <p>Share a few details and a Langma International advisor will arrange a confidential consultation to assess your eligibility and outline a realistic path forward — with no obligation.</p>
        <ul className="lead-assure">
          <li>Strictly confidential, no-obligation review</li>
          <li>Honest assessment of your eligibility</li>
          <li>Clear timelines and transparent guidance</li>
          <li>Introductions to licensed Portuguese professionals</li>
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
            <label htmlFor="work">Your business stage</label>
            <select id="work">
              <option value="">Please select</option>
              <option>Early-stage idea</option>
              <option>Existing company to relocate</option>
              <option>Founder with co-founders to include</option>
              <option>Other / exploring options</option>
            </select>
          </div>
          <button type="submit" className="btn btn-gold" disabled={leadLoading}>{leadLoading ? 'Sending...' : 'Request Consultation'}</button>
          <p className="disc">By submitting, you agree to be contacted about your enquiry. Your details are kept confidential.</p>
          {(leadMsg || leadSubmitted) && (
            <div className={`success show`} style={!leadSuccess && leadMsg ? { background: 'rgba(220,38,38,.08)', border: '1px solid #ef4444', color: '#b91c1c' } : undefined}>
              {leadMsg || 'Thank you — an advisor will be in touch shortly to arrange your consultation.'}
            </div>
          )}
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
        <h2>Visit our office &amp; discuss your Portugal residency goals</h2>
        <p>Prefer to meet face to face? Sit down with our advisory team for a private, one-on-one consultation and map your route to Portuguese residency in confidence.</p>
        <ul className="office-points">
          <li><span className="oi">&#10022;</span><div><h4>One-on-one consultation</h4><p>A direct conversation with the people who will guide your case.</p></div></li>
          <li><span className="oi">&#10003;</span><div><h4>Personal eligibility review</h4><p>An honest look at your business idea, funds and timeline.</p></div></li>
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
            <div className="field"><label htmlFor="ov-date">Preferred date</label><input type="date" id="ov-date" min={todayStr()} required /></div>
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
          {(officeMsg || officeSubmitted) && (
            <div className="success show" style={!officeSuccess && officeMsg ? { background: 'rgba(220,38,38,.08)', border: '1px solid #ef4444', color: '#b91c1c' } : undefined}>
              {officeMsg || "Thank you — we'll be in touch shortly to confirm your visit."}
            </div>
          )}
        </form>
      </div>
    </div>
  </div>
</section>

{/* ===== CALENDAR BOOKING ===== */}
{/* ===== CALENDAR BOOKING ===== */}
<section className="block calendar" id="calendar">
  <div className="container">
    <div className="cal-grid">
      <div className="cal-copy reveal">
        <span className="eyebrow" style={{color: 'var(--gold-soft)'}}>Schedule a Meeting</span>
        <h2>Reserve a private consultation slot</h2>
        <p>Choose a date and time that suits you for a confidential video or phone consultation with a senior Langma International advisor. We’ll review your eligibility and answer your questions directly.</p>
        <ul className="cal-benefits">
          <li>A focused 30-minute session built around your venture</li>
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

export default LangmaPortugalStartupVisaPage;