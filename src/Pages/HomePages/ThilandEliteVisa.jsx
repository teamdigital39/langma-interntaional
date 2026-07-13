import React, { useState, useEffect, useMemo } from 'react';
import useResidencyLeadForms from '../../hooks/useResidencyLeadForms';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SERVICE = 'Thailand Elite Visa';

const LangmaThailandEliteVisaPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Thailand Elite Visa Consultation' });

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
    --navy-deep:#296166;
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
    background:rgba(41,97,102,0.94);backdrop-filter:blur(10px);
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
    background:#FFFFFF;padding:72px 0 48px;
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
    padding-top:0;padding-bottom:0;
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

  @media(max-width:980px){.lg-page .hero-split {grid-template-columns:1fr;gap:36px;padding-top:0;padding-bottom:32px;}
    .lg-page .hero-img-frame img {height:380px;}
    .lg-page .hero-visual::before {display:none;}
    .lg-page .hero-img-frame {max-width:100%;}
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

  /* ===== WHY THAILAND ===== */
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

  /* ===== MEMBERSHIP / FINANCIAL REQUIREMENTS ===== */
  .lg-page .finance {background:var(--beige);}
  .lg-page .fin-table {background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-soft);}
  .lg-page .fin-row {display:grid;grid-template-columns:1.4fr 1fr 1fr;align-items:center;border-bottom:1px solid var(--line);}
  .lg-page .fin-row.four {grid-template-columns:1.5fr 0.9fr 0.8fr 1.1fr;}
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
  .lg-page .tax-line .v {font-family:'Cormorant Garamond',serif;font-size:26px;color:var(--ivory);font-weight:600;}
  .lg-page .tax-foot {font-size:12.5px;color:rgba(247,250,252,.6);margin-top:18px;font-style:italic;line-height:1.6;}

  /* ===== LIFE IN THAILAND ===== */
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
    .lg-page .fin-row.four {grid-template-columns:1.3fr 1fr;}
  }
  @media(max-width:640px){
    .lg-page .block {padding:74px 0;}
    .lg-page .container {padding:0 22px;}
    .lg-page .stats-grid, .lg-page .why-grid, .lg-page .prog-grid, .lg-page .ben-grid, .lg-page .life-grid, .lg-page .fin-extra, .lg-page .facts-row {grid-template-columns:1fr;}
    .lg-page .stat-cell {border-right:none;border-bottom:1px solid rgba(247,250,252,.10);}
    .lg-page .frow {grid-template-columns:1fr;}
    .lg-page .fin-row, .lg-page .fin-row.four {grid-template-columns:1fr;}
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
      <div className="hero-copy">
        <span className="eyebrow">Thailand Elite Visa &middot; Long-Term Residence Membership</span>
        <h1>Thailand Elite Visa: your <em>gateway to up to 15 years</em> in the Kingdom</h1>
        <p className="lead">Few residence routes in the world offer this combination of duration and simplicity. The Thailand Elite Visa lets qualifying members live in Thailand for 5 to 15 years, with no income test, no minimum stay and a curated portfolio of lifestyle privileges attached to the card itself. Langma International manages your membership selection, due diligence and application from first enquiry to card in hand.</p>
        <div className="hero-cta">
          <a href="#lead" className="btn btn-gold">Book Your Private Consultation</a>
          <a href="#programme" className="btn btn-ghost">Explore the Visa</a>
        </div>
        <div className="hero-badges">
          <div className="hero-badge"><div className="num">$25,500<span style={{fontSize: '16px'}}>+</span></div><div className="lbl">Entry-level membership investment</div></div>
          <div className="hero-badge"><div className="num">Up to 15 yrs</div><div className="lbl">Maximum residence validity</div></div>
          <div className="hero-badge"><div className="num">1&ndash;4 mo</div><div className="lbl">Typical time to approval</div></div>
          <div className="hero-badge"><div className="num">3</div><div className="lbl">Membership tiers to choose from</div></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-img-frame">
          <img src="https://images.unsplash.com/photo-1704872656367-aab145fdee7f?q=80&w=1200&auto=format&fit=crop" alt="The Bangkok skyline along the Chao Phraya River at dusk" />
          <div className="hero-img-badge">
            <span className="dot-pulse"></span>
            <span>Bangkok, Thailand</span>
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
      <div className="stat-cell reveal"><div className="v">$25,500</div><div className="k">Gold Membership entry investment</div></div>
      <div className="stat-cell reveal"><div className="v">15 yrs</div><div className="k">Maximum validity, Diamond Membership</div></div>
      <div className="stat-cell reveal"><div className="v">~1%</div><div className="k">Rejection risk after preliminary due diligence</div></div>
      <div className="stat-cell reveal"><div className="v">1&times;/yr</div><div className="k">Only requirement: one exit from Thailand annually</div></div>
    </div>
  </div>
</section>

{/* ===== ABOUT THAILAND ===== */}
<section className="block about" id="about">
  <div className="container">
    <div className="about-grid">
      <div className="about-copy reveal">
        <span className="eyebrow">Discover Thailand</span>
        <h2>Thailand: a warm, connected home at the heart of Southeast Asia</h2>
        <p>Home to roughly 69.8 million people, Thailand pairs an unmistakably warm culture with an increasingly sophisticated modern backbone. Bangkok anchors a nation of temples, coastline and mountains — a capital of glass towers and gilded rooftops where international business and centuries-old tradition sit comfortably side by side. Thai is the official language, English is broadly spoken across business, hospitality and healthcare settings, and the Thai Baht keeps daily life refreshingly affordable next to comparable global cities.</p>
        <p>The economy has diversified well beyond its tourism reputation, with strength in automotive manufacturing, electronics, agriculture, jewellery and a fast-expanding export base — giving Bangkok's business districts a genuinely international character. Add UNESCO-listed heritage cities, some of the region's most celebrated beaches, internationally accredited hospitals and a well-established expat community, and it's easy to see why long-stay members return year after year.</p>
        <p>For those who value flexibility over obligation, Thailand's appeal is straightforward: a rich, liveable culture, strong global connectivity through Bangkok's two international airports, and a cost of living that lets a long-term stay feel like an upgrade rather than a compromise.</p>
      </div>
      <div className="about-media reveal">
        <span className="frame"></span>
        <img src="https://images.unsplash.com/photo-1755251042986-91270ffd76f5?q=80&w=1200&auto=format&fit=crop" alt="Wat Arun, the Temple of Dawn, on the banks of the Chao Phraya River in Bangkok" />
      </div>
    </div>

    <div className="facts-row">
      <div className="fact reveal"><div className="ff">69.8M</div><div className="fl">Population</div></div>
      <div className="fact reveal"><div className="ff">Bangkok</div><div className="fl">Capital city</div></div>
      <div className="fact reveal"><div className="ff">Thai Baht</div><div className="fl">Official currency</div></div>
      <div className="fact reveal"><div className="ff">Thai &amp; English</div><div className="fl">Languages in daily use</div></div>
    </div>
  </div>
</section>

{/* ===== WHY THAILAND ===== */}
<section className="block why">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Why Members Choose Thailand</span>
      <h2>The reasons people relocate — and the reasons they stay</h2>
      <p>Beyond the membership card itself, Thailand offers a standard of living that keeps drawing long-term residents back, year after year.</p>
    </div>
    <div className="why-grid">
      <div className="why-card reveal"><div className="ic">&#9733;</div><h3>Genuine long-term stay</h3><p>One of the longest-running tourist-visa residence routes in the world, with validity running as long as 15 years on a single membership.</p></div>
      <div className="why-card reveal"><div className="ic">&#9919;</div><h3>Cost of living advantage</h3><p>A comfortable, well-connected lifestyle at a fraction of the cost of comparable cities in Europe, the Gulf or North America.</p></div>
      <div className="why-card reveal"><div className="ic">&#10031;</div><h3>Coast, capital &amp; culture</h3><p>From Bangkok's skyline to Phuket's coastline and Chiang Mai's temples, Thailand offers distinct settings for distinct lifestyles.</p></div>
      <div className="why-card reveal"><div className="ic">&#10010;</div><h3>Internationally accredited healthcare</h3><p>Bangkok is a recognised medical-tourism hub, with JCI-accredited hospitals and English-speaking specialists widely available.</p></div>
      <div className="why-card reveal"><div className="ic">&#9998;</div><h3>Established expat life</h3><p>Long-standing international communities in Bangkok, Chiang Mai and the southern islands, with international schools in every major hub.</p></div>
      <div className="why-card reveal"><div className="ic">&#9215;</div><h3>Global connectivity</h3><p>Two major international airports in Bangkok place you within hours of the rest of Asia, the Middle East and beyond.</p></div>
    </div>
  </div>
</section>

<div className="tilework" aria-hidden="true"></div>

{/* ===== PROGRAMME OVERVIEW / ELIGIBILITY ===== */}
<section className="block prog" id="programme">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center" style={{color: 'var(--gold-soft)'}}>The Programme</span>
      <h2>The Thailand Elite Visa, explained clearly</h2>
      <p>A long-term tourist-visa membership built around simplicity rather than investment thresholds or income tests — modern, structured and genuinely lived-in.</p>
    </div>
    <div className="prog-grid">
      <div className="prog-card reveal"><div className="no">01 &middot; DEFINITION</div><h3>What is the visa?</h3><p>Also known as the Thailand Privilege Card, it is a long-term tourist visa granting 5 to 15 years of residence, bundled with a portfolio of lifestyle privileges. It is a tourist route rather than an investment migration programme.</p></div>
      <div className="prog-card reveal"><div className="no">02 &middot; ELIGIBILITY</div><h3>Who can apply?</h3><p>Foreign nationals with no record of overstaying in Thailand, no criminal record, no bankruptcy declaration, and no declaration of unsound mind, incompetence or quasi-incompetence.</p></div>
      <div className="prog-card reveal"><div className="no">03 &middot; INVESTMENT</div><h3>Membership cost</h3><p>Entry starts at $25,500 (about THB 900,000) for the 5-year Gold Membership, rising with validity and privilege points through Platinum and Diamond.</p></div>
      <div className="prog-card reveal"><div className="no">04 &middot; DOCUMENTS</div><h3>What you provide</h3><p>A passport copy, a copy of any current Thai visa, and — for family members — a birth or marriage certificate. No income or asset statements are required.</p></div>
      <div className="prog-card reveal"><div className="no">05 &middot; FLEXIBILITY</div><h3>Residence, not obligation</h3><p>There is no minimum-stay requirement. The only condition to keep the membership active is to leave Thailand at least once each year.</p></div>
      <div className="prog-card reveal"><div className="no">06 &middot; SCOPE</div><h3>What it isn't</h3><p>Unlike investment-linked golden visas elsewhere, the Thailand Elite Visa does not lead to permanent residency or Thai citizenship.</p></div>
    </div>
  </div>
</section>

{/* ===== BENEFITS ===== */}
<section className="block benefits">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Key Benefits</span>
      <h2>What the membership makes possible</h2>
      <p>The advantages of the programme reach across your lifestyle, your family and your long-term flexibility.</p>
    </div>
    <div className="ben-grid">
      <div className="ben-card reveal"><div className="mk">I</div><h3>Long-term residence</h3><p>Live in Thailand for 5, 10 or 15 years depending on membership, with only a single annual exit needed to keep it valid.</p></div>
      <div className="ben-card reveal"><div className="mk">II</div><h3>Curated privilege points</h3><p>Each membership carries an annual allocation of privilege points, redeemable toward private jet or yacht charter, golf club discounts and hotel stays.</p></div>
      <div className="ben-card reveal"><div className="mk">III</div><h3>No income or asset test</h3><p>Approval rests on a clean personal record, not proof of income, savings or a qualifying degree.</p></div>
      <div className="ben-card reveal"><div className="mk">IV</div><h3>Minimal paperwork</h3><p>A passport and a completed application form are typically all that is required to begin — no extensive justification of your reasons for relocating.</p></div>
      <div className="ben-card reveal"><div className="mk">V</div><h3>No residence obligation</h3><p>Members are free to leave Thailand for any length of time without the membership lapsing, keeping the arrangement genuinely flexible.</p></div>
      <div className="ben-card reveal"><div className="mk">VI</div><h3>Family inclusion</h3><p>Platinum and Diamond members may add a spouse, children and parents, with no cap on the number of family members included.</p></div>
    </div>
  </div>
</section>

{/* ===== MEMBERSHIP OPTIONS / FEES ===== */}
<section className="block finance" id="membership">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Membership Options</span>
      <h2>Three tiers, built around validity and privileges</h2>
      <p>Every membership grants the same core residence right; the difference lies in how long it lasts, how many privilege points it carries, and whether family members can be added.</p>
    </div>

    <div className="fin-table reveal">
      <div className="fin-row four head">
        <div className="fc">Membership</div>
        <div className="fc">Investment</div>
        <div className="fc">Validity</div>
        <div className="fc">Family visas</div>
      </div>
      <div className="fin-row four">
        <div className="fc label">Gold &middot; 25 privilege points / year</div>
        <div className="fc fig">$25,500</div>
        <div className="fc fig">5 years</div>
        <div className="fc">Not available on this tier</div>
      </div>
      <div className="fin-row four">
        <div className="fc label">Platinum &middot; 35 privilege points / year</div>
        <div className="fc fig">$42,500</div>
        <div className="fc fig">10 years</div>
        <div className="fc">$28,000 per family member</div>
      </div>
      <div className="fin-row four total">
        <div className="fc label">Diamond &middot; 55 privilege points / year</div>
        <div className="fc fig">$71,000</div>
        <div className="fc fig">15 years</div>
        <div className="fc">$42,500 per family member</div>
      </div>
    </div>
    <p className="fin-note">Figures shown in USD with approximate THB equivalents of 900,000 / 1,500,000 / 2,500,000 for Gold, Platinum and Diamond respectively; family member fees are approximately THB 1,000,000 (Platinum) and THB 1,500,000 (Diamond). Pricing reflects the current Thailand Privilege Programme structure and is subject to change. This is general information, not financial advice.</p>

    <div className="fin-extra">
      <div className="fin-x reveal"><h4>Passport copy</h4><p>A copy of the photograph page of a valid passport is the foundation of every application.</p></div>
      <div className="fin-x reveal"><h4>Existing Thai visa</h4><p>A copy of your current Thailand visa, where applicable, helps streamline the registration process.</p></div>
      <div className="fin-x reveal"><h4>Family documentation</h4><p>Birth or marriage certificates are required only where family members are being added to a Platinum or Diamond membership.</p></div>
    </div>

    <div className="fin-extra" style={{marginTop: '22px'}}>
      <div className="fin-x reveal"><h4>No income proof required</h4><p>Unlike income-based residence routes, there is no requirement to demonstrate salary, savings or investment income.</p></div>
      <div className="fin-x reveal"><h4>No property purchase needed</h4><p>The membership fee itself is the qualifying investment — there is no separate minimum property or asset requirement.</p></div>
      <div className="fin-x reveal"><h4>Confidential preliminary review</h4><p>A one-day preliminary due-diligence check ahead of formal submission helps reduce the risk of an unsuccessful application.</p></div>
    </div>
  </div>
</section>

{/* ===== FAMILY / ELIGIBLE APPLICANTS ===== */}
<section className="block family">
  <div className="container">
    <div className="fam-grid">
      <div className="fam-media reveal">
        <span className="frame"></span>
        <img src="https://images.unsplash.com/photo-1688821999533-b0b719348555?q=80&w=1200&auto=format&fit=crop" alt="Aerial view of a turquoise cove near Phuket, Thailand" />
      </div>
      <div className="reveal">
        <span className="eyebrow">Eligible Applicants &amp; Family</span>
        <h2 style={{fontSize: 'clamp(30px,4vw,48px)', marginBottom: '26px'}}>One membership, room for the whole family</h2>
        <ul className="fam-list">
          <li><span className="fi">&#9312;</span><div><h4>Main applicant</h4><p>Any foreign national with no record of overstaying in Thailand, no criminal record, no bankruptcy declaration, and no declaration of unsound mind or incapacity.</p></div></li>
          <li><span className="fi">&#9313;</span><div><h4>Spouse</h4><p>Eligible for inclusion only under a Platinum or Diamond membership, at the applicable per-person fee.</p></div></li>
          <li><span className="fi">&#9314;</span><div><h4>Children</h4><p>Eligible for inclusion only under a Platinum or Diamond membership, alongside the main applicant's own visa.</p></div></li>
          <li><span className="fi">&#9315;</span><div><h4>Parents</h4><p>Eligible for inclusion only under a Platinum or Diamond membership — with no limit on the total number of relatives added.</p></div></li>
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
      <h2>A guided, five-stage process</h2>
      <p>Langma International coordinates every stage directly with the Thailand Elite Programme, so your application moves without friction.</p>
    </div>
    <div className="timeline">
      <div className="tl-item reveal"><div className="dot">01</div><h3>Preliminary due diligence</h3><p>A confidential one-day reliability check ahead of the formal review carried out by Thailand's Ministry of Foreign Affairs and Immigration Bureau — helping bring rejection risk down to around 1%.</p></div>
      <div className="tl-item reveal"><div className="dot">02</div><h3>Documentation &amp; application</h3><p>Preparing your passport copy and any family relationship documents, registering on the Thailand Privilege Programme platform, and completing and signing the application on your behalf.</p></div>
      <div className="tl-item reveal"><div className="dot">03</div><h3>Application processing</h3><p>Your file is forwarded to the Thailand Elite Office for review, a stage that typically takes one to three months.</p></div>
      <div className="tl-item reveal"><div className="dot">04</div><h3>Approval &amp; payment</h3><p>On approval, payment instructions are issued for the selected membership, payable online or by bank transfer to the programme's account.</p></div>
      <div className="tl-item reveal"><div className="dot">05</div><h3>Card &amp; visa issuance</h3><p>Following payment, you receive your Thailand Elite Programme ID; the visa stamp is then obtained on entry to Thailand or at the Immigration Service Office. Total time from start to finish typically runs 1 to 4 months.</p></div>
    </div>
  </div>
</section>

{/* ===== TAX &amp; RESIDENCY ===== */}
<section className="block tax" id="tax">
  <div className="container">
    <div className="tax-grid">
      <div className="tax-copy reveal">
        <span className="eyebrow">Tax &amp; Residency Position</span>
        <h2>Where the Thailand Elite Visa stands on tax</h2>
        <p>Holding a Thailand Elite Visa does not, by itself, make you a Thai tax resident. Tax residency is triggered separately — by spending more than 180 days within a calendar year physically in Thailand. Many members structure their time in the country with this threshold in mind.</p>
        <p>Where tax residency does apply, Thailand uses a progressive personal income tax system, starting at 0% on income up to roughly THB 150,000 (about $4,200) and rising to a top rate of 35% on income above roughly THB 5,000,000 (about $142,000). It is worth noting clearly that the membership is a long-term tourist visa: time spent under it does not accrue toward permanent residency or Thai citizenship, unlike golden-visa style programmes offered elsewhere.</p>
      </div>
      <div className="tax-panel reveal">
        <h3>At a glance</h3>
        <div className="tax-line"><span className="t">Days in Thailand that can trigger tax residency</span><span className="v">180+</span></div>
        <div className="tax-line"><span className="t">Entry income tax band (up to ~THB 150,000 / ~$4,200)</span><span className="v">0%</span></div>
        <div className="tax-line"><span className="t">Top income tax band (above ~THB 5,000,000 / ~$142,000)</span><span className="v">35%</span></div>
        <div className="tax-line"><span className="t">Leads to permanent residency or citizenship</span><span className="v">No</span></div>
        <p className="tax-foot">Indicative summary only. Tax treatment depends on individual circumstances and current Thai law. Langma International is not a tax adviser; confirm your position with a qualified professional.</p>
      </div>
    </div>
  </div>
</section>

<div className="tilework" aria-hidden="true"></div>

{/* ===== LIFE IN THAILAND ===== */}
<section className="block life">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Living in Thailand</span>
      <h2>Where will you set up your long-term life?</h2>
      <p>From a cosmopolitan capital to island coastlines and mountain temples, Thailand offers distinct settings for distinct lives.</p>
    </div>
    <div className="life-grid">
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1704872656367-aab145fdee7f?q=80&w=1200&auto=format&fit=crop" alt="The modern skyline of Bangkok along the Chao Phraya River" />
        <div className="ov"></div>
        <div className="cap"><h3>Bangkok</h3><p>A global business hub layered over centuries of history, with international schools, JCI-accredited hospitals and world-class dining.</p></div>
      </div>
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1688821999533-b0b719348555?q=80&w=1200&auto=format&fit=crop" alt="Aerial view of a turquoise island cove near Phuket" />
        <div className="ov"></div>
        <div className="cap"><h3>Phuket &amp; the Andaman Coast</h3><p>Thailand's largest island and gateway to the Andaman Sea — beaches, marinas and a well-established international community.</p></div>
      </div>
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1575474970096-54aa20b7e784?q=80&w=1200&auto=format&fit=crop" alt="A historic temple in Chiang Mai, northern Thailand" />
        <div className="ov"></div>
        <div className="cap"><h3>Chiang Mai</h3><p>A slower-paced northern capital of temples and mountains, long favoured by long-stay residents and remote professionals alike.</p></div>
      </div>
    </div>
    <div className="life-strip">
      <span className="life-tag reveal">Tropical climate year-round</span>
      <span className="life-tag reveal">Celebrated Thai cuisine</span>
      <span className="life-tag reveal">UNESCO heritage sites</span>
      <span className="life-tag reveal">Established expat communities</span>
      <span className="life-tag reveal">Modern healthcare &amp; hospitals</span>
      <span className="life-tag reveal">Two international airports in Bangkok</span>
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
        <p className="lead">We help individuals and families access long-term residence in Asia and beyond through transparent guidance, careful documentation and genuinely personalised support — never overpromising, never guaranteeing outcomes we cannot control.</p>
        <p className="lead">From the first conversation to your Elite Membership card, you work with people who understand both the Thai programme's requirements and the practical reality of building a life abroad.</p>
      </div>
      <div className="lg-list reveal">
        <div className="lg-item"><h4>Global mobility expertise</h4><p>Cross-border residency experience spanning Asia, Europe and beyond, applied to your specific circumstances.</p></div>
        <div className="lg-item"><h4>Confidential preliminary review</h4><p>An honest early assessment of your file to reduce the risk of a rejected application before it is submitted.</p></div>
        <div className="lg-item"><h4>Documentation support</h4><p>Hands-on help preparing and sequencing the passport, visa and family documents your file requires.</p></div>
        <div className="lg-item"><h4>Membership guidance</h4><p>Clear, unbiased comparison of Gold, Platinum and Diamond so you choose the tier that actually fits your plans.</p></div>
        <div className="lg-item"><h4>International network</h4><p>Trusted partners on the ground in Thailand — legal, banking and relocation — to keep your move moving.</p></div>
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
        <button className="faq-q" onClick={() => toggleFaq(0)}>What is the Thailand Elite Visa?<span className="pm">{openFaq===0 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===0 ? "600px" : "0"}}><p>Also known as the Thailand Privilege Card, it is a long-term tourist visa membership allowing foreign nationals to reside in Thailand for 5 to 15 years, depending on the tier chosen, together with a card offering lifestyle bonuses such as airport assistance and hotel or golf discounts. It is a long-stay tourist route and does not lead to permanent residency or Thai citizenship.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===1 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(1)}>How much does it cost?<span className="pm">{openFaq===1 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===1 ? "600px" : "0"}}><p>Gold Membership starts at $25,500 (about THB 900,000) for 5 years. Platinum costs $42,500 (about THB 1,500,000) for 10 years, and Diamond costs $71,000 (about THB 2,500,000) for 15 years. Family members can only be added on Platinum or Diamond, at $28,000 or $42,500 per relative respectively.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===2 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(2)}>Can I bring my family?<span className="pm">{openFaq===2 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===2 ? "600px" : "0"}}><p>Yes, but only with a Platinum or Diamond membership. A spouse, children and parents can each be included, with no limit on the total number of family members added to a single membership.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===3 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(3)}>Am I taxed as a member?<span className="pm">{openFaq===3 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===3 ? "600px" : "0"}}><p>The visa itself does not create Thai tax residency. Spending more than 180 days a year in Thailand can trigger it, after which Thailand's progressive income tax applies, from 0% up to about THB 150,000 (roughly $4,200) to 35% above about THB 5,000,000 (roughly $142,000). Always confirm your position with a qualified tax adviser.</p></div>
      </div>
      <div className={`faq-item reveal ${openFaq===4 ? "open" : ""}`}>
        <button className="faq-q" onClick={() => toggleFaq(4)}>Can it lead to permanent residency or citizenship?<span className="pm">{openFaq===4 ? "−" : "+"}</span></button>
        <div className="faq-a" style={{maxHeight: openFaq===4 ? "600px" : "0"}}><p>No. The Thailand Elite Visa is a long-term tourist visa, and time spent under it does not count toward the requirements for Thai permanent residence or citizenship, which are pursued through separate immigration routes.</p></div>
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
        <h2>Begin your Thailand Elite Visa journey with expert guidance</h2>
        <p>Share a few details and a Langma International advisor will arrange a confidential consultation to walk through membership options and outline a realistic path forward — with no obligation.</p>
        <ul className="lead-assure">
          <li>Strictly confidential, no-obligation review</li>
          <li>Honest comparison of Gold, Platinum and Diamond</li>
          <li>Clear timelines and transparent guidance</li>
          <li>Coordinated preliminary due-diligence check</li>
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
            <label htmlFor="interest">Membership of interest</label>
            <select id="interest">
              <option value="">Please select</option>
              <option>Gold Membership (5 years)</option>
              <option>Platinum Membership (10 years)</option>
              <option>Diamond Membership (15 years)</option>
              <option>Not sure yet — need guidance</option>
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
        <h2>Visit our office &amp; discuss your Thailand residency goals</h2>
        <p>Prefer to meet face to face? Sit down with our advisory team for a private, one-on-one consultation and map your route to Thailand residence in confidence.</p>
        <ul className="office-points">
          <li><span className="oi">&#10022;</span><div><h4>One-on-one consultation</h4><p>A direct conversation with the people who will guide your membership application.</p></div></li>
          <li><span className="oi">&#10003;</span><div><h4>Personal eligibility review</h4><p>An honest look at your record, your family plans and the right membership tier.</p></div></li>
          <li><span className="oi">&#8618;</span><div><h4>Your residency roadmap</h4><p>A clear, step-by-step plan with a candid document checklist.</p></div></li>
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
        <p>Choose a date and time that suits you for a confidential video or phone consultation with a senior Langma International advisor. We'll review your options and answer your questions directly.</p>
        <ul className="cal-benefits">
          <li>A focused 30-minute session built around your situation</li>
          <li>A candid comparison of Gold, Platinum and Diamond</li>
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

export default LangmaThailandEliteVisaPage;