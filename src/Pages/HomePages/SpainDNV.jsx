import React, { useState, useEffect, useMemo } from 'react';
import { useResidencyLeadForms } from '../../hooks/useResidencyLeadForms';
import { todayStr } from '../../utils/residencyFormHelpers';

const SERVICE = 'Spain Digital Nomad Visa';

const SpainDNVPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadSubmitted, officeSubmitted,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Spain DNV Consultation' });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.sp-reveal').forEach((el) => observer.observe(el));
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  // ===== Booking calendar state =====
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const today = useMemo(() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }, []);
  const [calView, setCalView] = useState(() => { const d = new Date(); d.setDate(1); d.setHours(0, 0, 0, 0); return d; });
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [calConfirm, setCalConfirm] = useState('');
  const slots = ['09:30', '11:00', '13:00', '15:30', '17:00', '18:30'];

  const calDays = useMemo(() => {
    const days = [];
    let start = calView.getDay();
    start = start === 0 ? 6 : start - 1;
    for (let i = 0; i < start; i++) days.push({ empty: true, key: `e${i}` });
    const daysInMonth = new Date(calView.getFullYear(), calView.getMonth() + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(calView.getFullYear(), calView.getMonth(), d);
      const dow = date.getDay();
      const isPast = date < today;
      const isWeekend = dow === 0 || dow === 6;
      days.push({ empty: false, day: d, date, off: isPast || isWeekend, key: `d${d}` });
    }
    return days;
  }, [calView, today]);

  const goPrevMonth = () => {
    let next = new Date(calView.getFullYear(), calView.getMonth() - 1, 1);
    const floor = new Date(today.getFullYear(), today.getMonth(), 1);
    if (next < floor) next = floor;
    setCalView(next);
    setSelectedDay(null);
  };
  const goNextMonth = () => {
    setCalView(new Date(calView.getFullYear(), calView.getMonth() + 1, 1));
    setSelectedDay(null);
  };
  const pickDay = (d) => { setSelectedDay(d.date); setCalConfirm(''); };
  const pickSlot = (s) => { setSelectedSlot(s); setCalConfirm(''); };
  const confirmBooking = () => {
    if (!selectedDay || !selectedSlot) {
      setCalConfirm('Please choose both a date and a time slot.');
      return;
    }
    const opts = { weekday: 'long', day: 'numeric', month: 'long' };
    setCalConfirm(`Requested: ${selectedDay.toLocaleDateString('en-GB', opts)} at ${selectedSlot}. We\u2019ll email to confirm.`);
  };

  return (
    <div className="sp-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        .sp-page { --navy:#296166; --navy-deep:#296166; --navy-mid:#296166; --royal:#2FC7A1; --gold:#2FC7A1; --gold-soft:#6FE0C6; --gold-deep:#2FC7A1; --ivory:#F5F8F6; --beige:#E9F1EE; --charcoal:#1B2B28; --muted:#296166; --line:rgba(47,199,161,0.30); --radius:4px; --shadow-soft:0 18px 50px rgba(26,37,64,0.10); --shadow-strong:0 30px 70px rgba(26,37,64,0.22); --ease:cubic-bezier(.22,.61,.36,1); }
        .sp-page * { margin:0; padding:0; box-sizing:border-box; }
        .sp-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; color:var(--charcoal); background:var(--ivory); line-height:1.7; font-weight:400; -webkit-font-smoothing:antialiased; overflow-x:hidden; }
        .sp-page h1,.sp-page h2,.sp-page h3,.sp-page h4 { font-family:'Cormorant Garamond',Georgia,serif; font-weight:600; color:var(--navy); line-height:1.12; letter-spacing:0.2px; }
        .sp-page p { font-weight:400; }
        .sp-page a { color:inherit; text-decoration:none; }
        .sp-page img { display:block; width:100%; height:100%; object-fit:cover; }
        .sp-page .container { max-width:1200px; margin:0 auto; padding:0 30px; }
        .sp-page .block { padding:108px 0; }
        .sp-page .eyebrow { font-family:'Inter',sans-serif; text-transform:uppercase; letter-spacing:3.5px; font-size:11.5px; color:var(--gold-deep); font-weight:600; margin-bottom:18px; display:flex; align-items:center; gap:12px; }
        .sp-page .eyebrow::before { content:""; width:34px; height:1px; background:var(--gold); display:inline-block; flex-shrink:0; }
        .sp-page .eyebrow.center { justify-content:center; }
        .sp-page .section-head { max-width:760px; margin:0 auto 60px; text-align:center; }
        .sp-page .section-head h2 { font-size:clamp(34px,4.6vw,54px); margin-bottom:18px; }
        .sp-page .section-head p { color:var(--muted); font-size:17px; }
        .sp-page .btn { display:inline-flex; align-items:center; gap:10px; font-family:'Inter',sans-serif; font-size:14px; font-weight:600; letter-spacing:0.4px; padding:16px 32px; border-radius:var(--radius); cursor:pointer; border:1px solid transparent; transition:all .35s var(--ease); }
        .sp-page .btn-gold { background:var(--gold); color:var(--navy-deep); }
        .sp-page .btn-gold:hover { background:var(--gold-soft); transform:translateY(-2px); box-shadow:0 14px 30px rgba(47,199,161,.32); }
        .sp-page .btn-ghost { background:transparent;color:#1A2540;border:2px solid #2FC7A1; }
        .sp-page .btn-ghost:hover { border-color:var(--gold); color:var(--gold-soft); }
        .sp-page .btn-navy { background:var(--navy); color:var(--ivory); }
        .sp-page .btn-navy:hover { background:var(--navy-mid); transform:translateY(-2px); }
        .sp-page .tilework { height:18px; width:100%; background:radial-gradient(circle at 10px 9px, var(--gold) 0 2px, transparent 2.5px), radial-gradient(circle at 0 0, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px), radial-gradient(circle at 20px 0, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px), radial-gradient(circle at 0 18px, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px), radial-gradient(circle at 20px 18px, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px); background-size:20px 18px; background-repeat:repeat-x; background-position:left center; background-color:var(--navy); display:block; overflow:hidden; opacity:.92; }
        .sp-page .site-header { position:fixed; top:0; left:0; right:0; z-index:1000; padding:22px 0; transition:all .4s var(--ease); }
        .sp-page .site-header.scrolled { background:rgba(41,97,102,0.94); backdrop-filter:blur(10px); padding:14px 0; box-shadow:0 6px 30px rgba(0,0,0,.25); }
        .sp-page .nav-wrap { display:flex; align-items:center; justify-content:space-between; }
        .sp-page .brand { display:flex; flex-direction:column; line-height:1; }
        .sp-page .brand .name { font-family:'Cormorant Garamond',serif; font-size:25px; font-weight:600; color:var(--ivory); letter-spacing:1px; }
        .sp-page .brand .tag { font-family:'Inter',sans-serif; font-size:9.5px; letter-spacing:3.5px; text-transform:uppercase; color:var(--gold-soft); margin-top:4px; }
        .sp-page .nav-links { display:flex; align-items:center; gap:34px; }
        .sp-page .nav-links a { font-size:13.5px; font-weight:500; color:rgba(247,250,252,.85); letter-spacing:.3px; transition:color .25s; }
        .sp-page .nav-links a:hover { color:var(--gold-soft); }
        .sp-page .nav-cta { padding:11px 24px!important; font-size:13px; background:var(--gold); color:var(--navy-deep)!important; border-radius:var(--radius); font-weight:600; transition:all .3s; }
        .sp-page .nav-cta:hover { background:var(--gold-soft); }
        .sp-page .burger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; }
        .sp-page .burger span { width:24px; height:2px; background:var(--ivory); display:block; }
        .sp-page .hero { position:relative; min-height:auto; display:flex; align-items:center; color:#1B2B28; overflow:hidden; background:#FFFFFF;padding:72px 0 48px; }
        .sp-page .hero::before { content:""; position:absolute; inset:0; background-image:radial-gradient(circle at 20% 50%, rgba(47,199,161,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(23,163,152,0.20) 0%, transparent 45%); z-index:0; pointer-events:none; }
        .sp-page .hero-split { position:relative; z-index:2; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; padding-top:0;padding-bottom:0; }
        .sp-page .hero-copy { display:flex; flex-direction:column; }
        .sp-page .hero h1 { font-size:clamp(38px,5vw,66px); color:#1B2B28; margin-bottom:26px; font-weight:600; line-height:1.08; }
        .sp-page .hero h1 em { font-style:italic; color:#4FA3D1; font-weight:500; }
        .sp-page .hero .lead { font-size:17.5px; color:#4C5C58; max-width:560px; margin-bottom:38px; font-weight:300; line-height:1.72; }
        .sp-page .hero-cta { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:48px; }
        .sp-page .hero-badges { display:flex; gap:36px; flex-wrap:wrap; border-top:1px solid #D8E0EC; padding-top:28px; }
        .sp-page .hero-badge .num { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; line-height:1; }
        .sp-page .hero-badge .lbl { font-size:11.5px; letter-spacing:.6px; color:#7E8C88; margin-top:6px; }
        .sp-page .hero-visual { display:flex; align-items:center; justify-content:center; position:relative; }
        .sp-page .hero-img-frame { position:relative; width:100%; max-width:520px; border-radius:12px; overflow:hidden; box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22); }
        .sp-page .hero-img-frame img { display:block; width:100%; height:480px; object-fit:cover; border-radius:12px; transition:transform .9s var(--ease); }
        .sp-page .hero-img-frame:hover img { transform:scale(1.04); }
        .sp-page .hero-img-frame::after { content:""; position:absolute; inset:12px; border:1px solid rgba(47,199,161,.38); border-radius:8px; pointer-events:none; z-index:2; }
        .sp-page .hero-img-frame::before { content:""; position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.42) 0%,transparent 55%); z-index:1; border-radius:12px; pointer-events:none; }
        .sp-page .hero-visual::before { content:""; position:absolute; top:24px; right:-14px; width:100%; max-width:520px; height:100%; border:1px solid rgba(47,199,161,.18); border-radius:12px; pointer-events:none; }
        .sp-page .hero-img-badge { position:absolute; bottom:22px; left:22px; z-index:3; background:rgba(26,37,64,.82); backdrop-filter:blur(8px); border:1px solid rgba(47,199,161,.30); border-radius:6px; padding:10px 16px; display:flex; align-items:center; gap:10px; }
        .sp-page .hero-img-badge .dot-pulse { width:8px; height:8px; border-radius:50%; background:var(--gold); flex-shrink:0; animation:sp-pulse-dot 2s ease infinite; }
        @keyframes sp-pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.6; transform:scale(.85); } }
        .sp-page .hero-img-badge span { font-size:12px; letter-spacing:.5px; color:rgba(247,250,252,.88); font-weight:500; }
        .sp-page .scroll-hint { position:absolute; bottom:30px; left:50%; transform:translateX(-50%); z-index:2; font-size:10.5px; letter-spacing:3px; text-transform:uppercase; color:rgba(247,250,252,.5); display:flex; flex-direction:column; align-items:center; gap:8px; }
        .sp-page .scroll-hint .line { width:1px; height:38px; background:linear-gradient(var(--gold),transparent); animation:sp-drop 2s var(--ease) infinite; }
        @keyframes sp-drop { 0% { transform:scaleY(0); transform-origin:top; } 50% { transform:scaleY(1); transform-origin:top; } 51% { transform-origin:bottom; } 100% { transform:scaleY(0); transform-origin:bottom; } }
        .sp-page .stats-bar { background:var(--navy-deep); color:var(--ivory); }
        .sp-page .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .sp-page .stat-cell { padding:52px 30px; text-align:center; border-right:1px solid rgba(247,250,252,.10); }
        .sp-page .stat-cell:last-child { border-right:none; }
        .sp-page .stat-cell .v { font-family:'Cormorant Garamond',serif; font-size:46px; font-weight:600; color:var(--gold-soft); line-height:1; margin-bottom:12px; }
        .sp-page .stat-cell .k { font-size:13px; letter-spacing:.5px; color:rgba(247,250,252,.78); }
        .sp-page .about { background:var(--ivory); }
        .sp-page .about-grid { display:grid; grid-template-columns:1.05fr 1fr; gap:64px; align-items:center; }
        .sp-page .about-copy .eyebrow { margin-bottom:18px; }
        .sp-page .about-copy h2 { font-size:clamp(32px,4.4vw,52px); margin-bottom:22px; }
        .sp-page .about-copy p { color:var(--muted); margin-bottom:18px; font-size:16.5px; }
        .sp-page .about-media { position:relative; height:560px; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-strong); }
        .sp-page .about-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .sp-page .facts-row { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-top:54px; }
        .sp-page .fact { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:26px 22px; text-align:center; }
        .sp-page .fact .ff { font-family:'Cormorant Garamond',serif; font-size:30px; color:var(--navy); font-weight:600; }
        .sp-page .fact .fl { font-size:12.5px; color:var(--muted); letter-spacing:.4px; margin-top:6px; }
        .sp-page .why { background:var(--beige); }
        .sp-page .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; }
        .sp-page .why-card { background:var(--ivory); padding:42px 34px; transition:background .3s; }
        .sp-page .why-card:hover { background:#fff; }
        .sp-page .why-card .ic { width:46px; height:46px; border:1px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--gold-deep); font-family:'Cormorant Garamond',serif; font-size:21px; margin-bottom:20px; }
        .sp-page .why-card h3 { font-size:24px; margin-bottom:10px; }
        .sp-page .why-card p { color:var(--muted); font-size:15px; }
        .sp-page .prog { background:var(--navy); color:var(--ivory); }
        .sp-page .prog .section-head h2 { color:var(--ivory); }
        .sp-page .prog .section-head p { color:rgba(247,250,252,.72); }
        .sp-page .prog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .sp-page .prog-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:var(--radius); padding:38px 32px; transition:all .35s var(--ease); }
        .sp-page .prog-card:hover { border-color:var(--gold); transform:translateY(-6px); }
        .sp-page .prog-card .no { font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--gold-soft); border-bottom:1px solid rgba(247,250,252,.16); padding-bottom:14px; margin-bottom:18px; letter-spacing:2px; }
        .sp-page .prog-card h3 { color:var(--ivory); font-size:25px; margin-bottom:12px; }
        .sp-page .prog-card p { color:rgba(247,250,252,.74); font-size:15px; }
        .sp-page .benefits { background:var(--ivory); }
        .sp-page .ben-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .sp-page .ben-card { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:36px 30px; position:relative; overflow:hidden; transition:all .35s var(--ease); }
        .sp-page .ben-card::before { content:""; position:absolute; top:0; left:0; width:3px; height:0; background:var(--gold); transition:height .4s var(--ease); }
        .sp-page .ben-card:hover { box-shadow:var(--shadow-soft); transform:translateY(-4px); }
        .sp-page .ben-card:hover::before { height:100%; }
        .sp-page .ben-card .mk { font-family:'Cormorant Garamond',serif; font-size:15px; color:var(--gold-deep); letter-spacing:2px; margin-bottom:16px; }
        .sp-page .ben-card h3 { font-size:23px; margin-bottom:10px; }
        .sp-page .ben-card p { color:var(--muted); font-size:15px; }
        .sp-page .finance { background:var(--beige); }
        .sp-page .fin-table { background:#fff; border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-soft); }
        .sp-page .fin-row { display:grid; grid-template-columns:1.4fr 1fr 1fr; align-items:center; border-bottom:1px solid var(--line); }
        .sp-page .fin-row:last-child { border-bottom:none; }
        .sp-page .fin-row.head { background:var(--navy); color:var(--ivory); }
        .sp-page .fin-row.head .fc { color:var(--ivory); font-weight:600; font-family:'Inter',sans-serif; font-size:13px; letter-spacing:.6px; text-transform:uppercase; }
        .sp-page .fc { padding:22px 28px; font-size:15.5px; }
        .sp-page .fc.label { font-weight:600; color:var(--navy); }
        .sp-page .fc.fig { font-family:'Cormorant Garamond',serif; font-size:24px; color:var(--gold-deep); font-weight:600; }
        .sp-page .fin-row.total { background:rgba(47,199,161,.10); }
        .sp-page .fin-note { margin-top:24px; font-size:13.5px; color:var(--muted); text-align:center; font-style:italic; }
        .sp-page .fin-extra { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:40px; }
        .sp-page .fin-x { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:28px; }
        .sp-page .fin-x h4 { font-size:21px; margin-bottom:8px; }
        .sp-page .fin-x p { color:var(--muted); font-size:14.5px; }
        .sp-page .family { background:var(--ivory); }
        .sp-page .fam-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .sp-page .fam-list { list-style:none; }
        .sp-page .fam-list li { display:flex; gap:18px; padding:22px 0; border-bottom:1px solid var(--line); }
        .sp-page .fam-list li:last-child { border-bottom:none; }
        .sp-page .fam-list .fi { flex:0 0 42px; height:42px; border-radius:50%; background:var(--navy); color:var(--gold-soft); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:19px; }
        .sp-page .fam-list h4 { font-size:21px; margin-bottom:2px; }
        .sp-page .fam-list p { color:var(--muted); font-size:14.5px; }
        .sp-page .fam-media { height:520px; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-strong); position:relative; }
        .sp-page .fam-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; }
        .sp-page .process { background:var(--navy-deep); color:var(--ivory); }
        .sp-page .process .section-head h2 { color:var(--ivory); }
        .sp-page .process .section-head p { color:rgba(247,250,252,.72); }
        .sp-page .timeline { position:relative; max-width:880px; margin:0 auto; }
        .sp-page .timeline::before { content:""; position:absolute; left:31px; top:8px; bottom:8px; width:1px; background:rgba(247,250,252,.18); }
        .sp-page .tl-item { position:relative; padding-left:92px; padding-bottom:44px; }
        .sp-page .tl-item:last-child { padding-bottom:0; }
        .sp-page .tl-item .dot { position:absolute; left:0; top:0; width:64px; height:64px; border-radius:50%; border:1px solid var(--gold); background:var(--navy-deep); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:24px; color:var(--gold-soft); }
        .sp-page .tl-item h3 { color:var(--ivory); font-size:25px; margin-bottom:6px; }
        .sp-page .tl-item p { color:rgba(247,250,252,.72); font-size:15px; max-width:620px; }
        .sp-page .tax { background:var(--ivory); }
        .sp-page .tax-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .sp-page .tax-copy h2 { font-size:clamp(30px,4vw,48px); margin-bottom:20px; }
        .sp-page .tax-copy p { color:var(--muted); font-size:16.5px; margin-bottom:18px; }
        .sp-page .tax-panel { background:var(--navy); color:var(--ivory); border-radius:var(--radius); padding:46px 42px; box-shadow:var(--shadow-strong); }
        .sp-page .tax-panel h3 { color:var(--gold-soft); font-size:26px; margin-bottom:24px; }
        .sp-page .tax-line { display:flex; justify-content:space-between; align-items:baseline; gap:16px; padding:16px 0; border-bottom:1px solid rgba(247,250,252,.14); }
        .sp-page .tax-line:last-of-type { border-bottom:none; }
        .sp-page .tax-line .t { color:rgba(247,250,252,.82); font-size:14.5px; max-width:60%; }
        .sp-page .tax-line .v { font-family:'Cormorant Garamond',serif; font-size:30px; color:var(--ivory); font-weight:600; }
        .sp-page .tax-foot { font-size:12.5px; color:rgba(247,250,252,.6); margin-top:18px; font-style:italic; line-height:1.6; }
        .sp-page .life { background:var(--beige); }
        .sp-page .life-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .sp-page .life-card { position:relative; height:420px; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-soft); }
        .sp-page .life-card img { transition:transform .8s var(--ease); }
        .sp-page .life-card:hover img { transform:scale(1.06); }
        .sp-page .life-card .ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.88) 0%,rgba(26,37,64,.18) 55%,transparent 100%); z-index:1; }
        .sp-page .life-card .cap { position:absolute; left:0; right:0; bottom:0; z-index:2; padding:30px 28px; }
        .sp-page .life-card .cap h3 { color:var(--ivory); font-size:27px; margin-bottom:6px; }
        .sp-page .life-card .cap p { color:rgba(247,250,252,.82); font-size:14px; }
        .sp-page .life-strip { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; margin-top:48px; }
        .sp-page .life-tag { border:1px solid var(--line); border-radius:40px; padding:10px 22px; font-size:13.5px; color:var(--navy); background:#fff; }
        .sp-page .langma { background:var(--navy); color:var(--ivory); position:relative; overflow:hidden; }
        .sp-page .langma-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:center; }
        .sp-page .langma h2 { color:var(--ivory); font-size:clamp(32px,4.4vw,52px); margin-bottom:20px; }
        .sp-page .langma .lead { color:rgba(247,250,252,.82); font-size:17px; margin-bottom:14px; }
        .sp-page .lg-list { display:grid; grid-template-columns:1fr 1fr; gap:30px 36px; }
        .sp-page .lg-item h4 { color:var(--gold-soft); font-size:22px; margin-bottom:6px; }
        .sp-page .lg-item p { color:rgba(247,250,252,.72); font-size:14.5px; }
        .sp-page .faq { background:var(--ivory); }
        .sp-page .faq-wrap { max-width:880px; margin:0 auto; }
        .sp-page .faq-item { border-bottom:1px solid var(--line); }
        .sp-page .faq-q { width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:28px 0; display:flex; justify-content:space-between; align-items:center; gap:24px; font-family:'Cormorant Garamond',serif; font-size:23px; color:var(--navy); font-weight:600; }
        .sp-page .faq-q .pm { flex:0 0 30px; height:30px; border:1px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--gold-deep); font-family:'Inter',sans-serif; font-size:18px; transition:all .3s; }
        .sp-page .faq-item.open .pm { background:var(--gold); color:var(--navy); transform:rotate(45deg); }
        .sp-page .faq-a { max-height:0; overflow:hidden; transition:max-height .4s var(--ease); }
        .sp-page .faq-a p { padding:0 0 28px; color:var(--muted); font-size:16px; max-width:760px; }
        .sp-page .lead-sec { background:var(--navy-deep); color:var(--ivory); }
        .sp-page .lead-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:start; }
        .sp-page .lead-copy .eyebrow { color:var(--gold-soft); }
        .sp-page .lead-copy h2 { color:var(--ivory); font-size:clamp(32px,4.2vw,50px); margin-bottom:20px; }
        .sp-page .lead-copy p { color:rgba(247,250,252,.80); margin-bottom:26px; font-size:16.5px; }
        .sp-page .lead-assure { list-style:none; }
        .sp-page .lead-assure li { display:flex; gap:12px; align-items:center; padding:11px 0; color:rgba(247,250,252,.86); font-size:15px; }
        .sp-page .lead-assure li::before { content:"✓"; color:var(--gold-soft); font-weight:700; }
        .sp-page .form-card { background:var(--ivory); border-radius:var(--radius); padding:42px; box-shadow:var(--shadow-strong); }
        .sp-page .form-card h3 { font-size:27px; margin-bottom:6px; }
        .sp-page .form-card .fsub { color:var(--muted); font-size:14.5px; margin-bottom:26px; }
        .sp-page .frow { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .sp-page .field { margin-bottom:16px; }
        .sp-page .field label { display:block; font-size:12px; letter-spacing:.5px; text-transform:uppercase; color:var(--navy); font-weight:600; margin-bottom:7px; }
        .sp-page .field input,.sp-page .field select { width:100%; padding:13px 15px; border:1px solid var(--line); border-radius:var(--radius); font-family:'Inter',sans-serif; font-size:15px; background:#fff; color:var(--charcoal); transition:border-color .25s; }
        .sp-page .field input:focus,.sp-page .field select:focus { outline:none; border-color:var(--gold); box-shadow:0 0 0 3px rgba(47,199,161,.15); }
        .sp-page .form-card .btn { width:100%; justify-content:center; margin-top:6px; }
        .sp-page .form-card .disc { font-size:12px; color:var(--muted); margin-top:14px; text-align:center; }
        .sp-page .success { display:none; background:rgba(47,199,161,.14); border:1px solid var(--gold); border-radius:var(--radius); padding:16px; color:var(--gold-deep); font-size:14.5px; text-align:center; margin-top:16px; }
        .sp-page .success.show { display:block; }
        .sp-page .office { background:var(--beige); }
        .sp-page .office-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:60px; align-items:center; }
        .sp-page .office-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:18px; }
        .sp-page .office-copy p { color:var(--muted); font-size:16.5px; margin-bottom:26px; }
        .sp-page .office-points { list-style:none; margin-bottom:8px; }
        .sp-page .office-points li { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid var(--line); }
        .sp-page .office-points .oi { flex:0 0 38px; height:38px; border-radius:50%; border:1px solid var(--gold); color:var(--gold-deep); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; }
        .sp-page .office-points h4 { font-size:19px; margin-bottom:1px; }
        .sp-page .office-points p { font-size:14px; margin:0; }
        .sp-page .office-form { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:40px; box-shadow:var(--shadow-soft); }
        .sp-page .office-form h3 { font-size:25px; margin-bottom:22px; }
        .sp-page .calendar { background:var(--navy); color:var(--ivory); }
        .sp-page .cal-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:60px; align-items:center; }
        .sp-page .cal-copy h2 { color:var(--ivory); font-size:clamp(30px,4vw,48px); margin-bottom:18px; }
        .sp-page .cal-copy p { color:rgba(247,250,252,.80); font-size:16.5px; margin-bottom:24px; }
        .sp-page .cal-benefits { list-style:none; margin-bottom:8px; }
        .sp-page .cal-benefits li { display:flex; gap:12px; align-items:flex-start; padding:10px 0; color:rgba(247,250,252,.86); font-size:15px; }
        .sp-page .cal-benefits li::before { content:"◈"; color:var(--gold-soft); }
        .sp-page .cal-urgency { display:inline-flex; align-items:center; gap:10px; margin-top:10px; background:rgba(47,199,161,.12); border:1px solid var(--line); border-radius:40px; padding:9px 20px; font-size:13px; color:var(--gold-soft); }
        .sp-page .cal-urgency .dot-pulse { width:8px; height:8px; border-radius:50%; background:var(--gold); animation:sp-pulse-dot 2s ease infinite; }
        .sp-page .cal-card { background:var(--ivory); border-radius:var(--radius); padding:38px; box-shadow:var(--shadow-strong); color:var(--charcoal); }
        .sp-page .cal-card h3 { font-size:24px; margin-bottom:4px; }
        .sp-page .cal-card .csub { color:var(--muted); font-size:14px; margin-bottom:22px; }
        .sp-page .cal-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
        .sp-page .cal-head span { font-family:'Cormorant Garamond',serif; font-size:20px; color:var(--navy); font-weight:600; }
        .sp-page .cal-head button { background:none; border:1px solid var(--line); border-radius:50%; width:30px; height:30px; cursor:pointer; color:var(--gold-deep); font-size:15px; }
        .sp-page .cal-dow { display:grid; grid-template-columns:repeat(7,1fr); gap:6px; margin-bottom:8px; }
        .sp-page .cal-dow span { text-align:center; font-size:11px; letter-spacing:.4px; text-transform:uppercase; color:var(--muted); }
        .sp-page .cal-days { display:grid; grid-template-columns:repeat(7,1fr); gap:6px; }
        .sp-page .cal-day { aspect-ratio:1; display:flex; align-items:center; justify-content:center; font-size:14px; border-radius:var(--radius); cursor:pointer; border:1px solid transparent; transition:all .2s; color:var(--charcoal); }
        .sp-page .cal-day.empty { cursor:default; }
        .sp-page .cal-day.avail:hover { background:rgba(47,199,161,.16); border-color:var(--gold); }
        .sp-page .cal-day.sel { background:var(--navy); color:var(--ivory); }
        .sp-page .cal-day.off { color:#c7c2b6; cursor:default; text-decoration:line-through; }
        .sp-page .cal-slots { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:18px; }
        .sp-page .cal-slot { padding:11px 6px; text-align:center; border:1px solid var(--line); border-radius:var(--radius); font-size:13.5px; cursor:pointer; transition:all .2s; }
        .sp-page .cal-slot:hover { border-color:var(--gold); }
        .sp-page .cal-slot.sel { background:var(--gold); color:var(--navy-deep); border-color:var(--gold); font-weight:600; }
        .sp-page .cal-card .btn { width:100%; justify-content:center; margin-top:20px; }
        .sp-page .cal-confirm { font-size:13px; color:var(--gold-deep); text-align:center; margin-top:14px; min-height:18px; }
        .sp-page .foot { background:var(--navy-deep); color:rgba(247,250,252,.7); padding:74px 0 32px; }
        .sp-page .foot-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1.3fr; gap:44px; margin-bottom:50px; }
        .sp-page .foot-brand .fname { font-family:'Cormorant Garamond',serif; font-size:28px; color:var(--ivory); font-weight:600; letter-spacing:1px; }
        .sp-page .foot-brand .ftag { font-size:10px; letter-spacing:3px; text-transform:uppercase; color:var(--gold-soft); margin:6px 0 18px; display:block; }
        .sp-page .foot-brand p { font-size:14px; max-width:320px; }
        .sp-page .foot-col h4 { color:var(--ivory); font-size:18px; margin-bottom:18px; font-weight:600; }
        .sp-page .foot-col a { display:block; font-size:14px; padding:6px 0; transition:color .25s; }
        .sp-page .foot-col a:hover { color:var(--gold-soft); }
        .sp-page .foot-bottom { border-top:1px solid rgba(247,250,252,.12); padding-top:26px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:14px; font-size:12.5px; }
        .sp-page .legal { max-width:920px; font-size:11.5px; color:rgba(247,250,252,.5); line-height:1.7; margin-top:18px; }
        .sp-page .sp-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s var(--ease),transform .7s var(--ease); }
        .sp-page .sp-reveal.in { opacity:1; transform:none; }
        @media(max-width:980px) {
          .sp-page .nav-links { display:none; position:absolute; top:100%; left:0; right:0; flex-direction:column; gap:0; background:rgba(26,37,64,.97); padding:14px 30px; }
          .sp-page .nav-links.open { display:flex; }
          .sp-page .nav-links a { padding:12px 0; }
          .sp-page .burger { display:flex; }
          .sp-page .about-grid,.sp-page .fam-grid,.sp-page .langma-grid,.sp-page .lead-grid,.sp-page .office-grid,.sp-page .tax-grid,.sp-page .cal-grid { grid-template-columns:1fr; gap:40px; }
          .sp-page .stats-grid,.sp-page .why-grid,.sp-page .prog-grid,.sp-page .ben-grid,.sp-page .life-grid,.sp-page .fin-extra { grid-template-columns:1fr 1fr; }
          .sp-page .facts-row { grid-template-columns:1fr 1fr; }
          .sp-page .lg-list { grid-template-columns:1fr; }
          .sp-page .about-media,.sp-page .fam-media { height:420px; }
          .sp-page .hero-split { grid-template-columns:1fr; gap:48px; padding-top:0;padding-bottom:32px; }
          .sp-page .hero-img-frame img { height:380px; }
          .sp-page .hero-visual::before { display:none; }
          .sp-page .hero-img-frame { max-width:100%; }
        }
        @media(max-width:640px) {
          .sp-page .block { padding:74px 0; }
          .sp-page .container { padding:0 22px; }
          .sp-page .stats-grid,.sp-page .why-grid,.sp-page .prog-grid,.sp-page .ben-grid,.sp-page .life-grid,.sp-page .fin-extra,.sp-page .facts-row { grid-template-columns:1fr; }
          .sp-page .stat-cell { border-right:none; border-bottom:1px solid rgba(247,250,252,.10); }
          .sp-page .frow { grid-template-columns:1fr; }
          .sp-page .fin-row { grid-template-columns:1fr; }
          .sp-page .fc { padding:14px 20px; }
          .sp-page .fin-row.head { display:none; }
          .sp-page .hero-badges { gap:26px; }
          .sp-page .form-card,.sp-page .office-form,.sp-page .cal-card,.sp-page .tax-panel { padding:30px; }
          .sp-page .foot-grid { grid-template-columns:1fr 1fr; }
        }
        @media(prefers-reduced-motion:reduce) {
          .sp-page * { animation:none!important; transition:none!important; }
          .sp-page .sp-reveal { opacity:1; transform:none; }
        }
      /* PR hero responsive fix */
  /* PR hero — account for site TopBar + Navbar only (no double top padding) */
  @media(max-width:980px){
    .sp-page .hero{padding:64px 0 40px;}
    .sp-page .hero-split{grid-template-columns:1fr !important;gap:36px !important;padding-top:0 !important;}
    .sp-page .hero-visual{order:-1;max-width:560px;margin:0 auto;width:100%;}
    .sp-page .hero-visual::before{display:none;}
    .sp-page .hero-img-frame,.sp-page .hero-img-card{max-width:100%;}
    .sp-page .hero-badges{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;}
  }
  @media(max-width:640px){
    .sp-page .hero{padding:56px 0 32px;}
    .sp-page .hero-split{gap:28px !important;padding-bottom:16px !important;}
    .sp-page .hero h1{font-size:clamp(30px,8vw,42px);}
    .sp-page .hero-badges{grid-template-columns:1fr;}
    .sp-page .hero-cta,.sp-page .hero-ctas{flex-direction:column;}
    .sp-page .hero-cta .btn,.sp-page .hero-ctas .btn{width:100%;justify-content:center;}
    .sp-page .container{padding:0 20px;}
  }
`}</style>
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="hero-split">
              <div className="hero-copy">
                <span className="eyebrow">Spain Digital Nomad Visa · Remote Work Residence Programme</span>
                <h1>Spain Digital Nomad Visa: your gateway to <em>long-term European residency</em></h1>
                <p className="lead">Keep your career and your clients exactly where they are — and base your life in one of Europe&rsquo;s most vibrant countries. Spain&rsquo;s Digital Nomad Visa is built for non-EU professionals who work remotely, offering a clear route to Spanish residency, Schengen mobility and a favourable tax regime. Langma International accompanies you from your first eligibility review to an issued residence card — discreetly, precisely and fully within the rules.</p>
                <div className="hero-cta">
                  <a href="#lead" className="btn btn-gold">Book Your Private Consultation</a>
                  <a href="#programme" className="btn btn-ghost">Explore the Visa</a>
                </div>
                <div className="hero-badges">
                  {[
                    { num: '€2,849', suf: '/mo', lbl: 'Minimum income reference' },
                    { num: '3 + 2', suf: '', lbl: 'Year residence permit cycle' },
                    { num: '24%', suf: '', lbl: 'Beckham Law flat tax option' },
                    { num: 'Family', suf: '', lbl: 'Included in one process' },
                  ].map((b, i) => (
                    <div className="hero-badge" key={i}>
                      <div className="num">{b.num}{b.suf && <span style={{ fontSize: 16 }}>{b.suf}</span>}</div>
                      <div className="lbl">{b.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero-visual">
                <div className="hero-img-frame">
                  <img src="https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1200&auto=format&fit=crop" alt="Aerial view of Barcelona's dense city grid stretching toward the Mediterranean" />
                  <div className="hero-img-badge">
                    <span className="dot-pulse"></span>
                    <span>Barcelona, Spain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-hint"><span>Discover</span><span className="line"></span></div>
        </section>

        <div className="tilework" aria-hidden="true"></div>

        {/* TRUST STATS BAR */}
        <section className="stats-bar">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-cell sp-reveal"><div className="v">€34,188</div><div className="k">Annual income reference, single applicant</div></div>
              <div className="stat-cell sp-reveal"><div className="v">5 yrs</div><div className="k">Legal residence toward permanent residency</div></div>
              <div className="stat-cell sp-reveal"><div className="v">Schengen</div><div className="k">Visa-free short-stay travel as a permit holder</div></div>
              <div className="stat-cell sp-reveal"><div className="v">2022</div><div className="k">Introduced under Spain&rsquo;s Startups Law (28/2022)</div></div>
            </div>
          </div>
        </section>

        {/* ABOUT SPAIN */}
        <section className="block about" id="about">
          <div className="container">
            <div className="about-grid">
              <div className="about-copy sp-reveal">
                <span className="eyebrow">Discover Spain</span>
                <h2>Spain: a sunlit, well-connected home in the heart of southern Europe</h2>
                <p>Occupying most of the Iberian Peninsula on Europe&rsquo;s south-western edge, Spain is home to roughly 48 million people and is one of the European Union&rsquo;s largest economies. Madrid is the capital and Spanish (Castilian) the official language — with Catalan, Galician, Basque and Valencian recognised across the regions — while English is widely understood in the major cities and on the coasts. The currency is the euro, the country runs on Central European Time, and it has been an EU member since 1986 and part of the Schengen Area for decades.</p>
                <p>Beyond the postcard image of beaches and plazas sits a modern, diversified economy: tourism and services, automotive manufacturing, renewable energy in which Spain is a European leader, agriculture and a fast-growing technology and start-up scene anchored in Madrid, Barcelona and Valencia. A respected public health service, international schools in every major city and one of Europe&rsquo;s densest high-speed rail and flight networks make it a natural base for globally mobile families.</p>
                <p>For remote professionals the appeal is simple: world-class lifestyle, deep connectivity to Europe, the Americas and North Africa, and a cost of living that remains gentle by Western-European standards.</p>
              </div>
              <div className="about-media sp-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1653385324919-e413ff41070e?q=80&w=1200&auto=format&fit=crop" alt="A Spanish coastal city beside calm Mediterranean water" />
              </div>
            </div>

            <div className="facts-row">
              {[
                { ff: '~48M', fl: 'Population' },
                { ff: 'Madrid', fl: 'Capital city' },
                { ff: 'Euro\u00a0(€)', fl: 'Official currency' },
                { ff: 'EU & Schengen', fl: 'Member state since 1986' },
              ].map((f, i) => (
                <div className="fact sp-reveal" key={i}><div className="ff">{f.ff}</div><div className="fl">{f.fl}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY SPAIN */}
        <section className="block why">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center">Why Remote Professionals Choose Spain</span>
              <h2>The reasons people relocate — and the reasons they stay</h2>
              <p>Beyond the residence permit itself, Spain offers a standard of living that keeps drawing remote workers, founders and families long after the paperwork is signed.</p>
            </div>
            <div className="why-grid">
              {[
                { ic: '★', t: 'EU member-state residence', p: 'A residence permit in a major European Union economy, with the right to live in Spain and travel visa-free for short stays across the Schengen Area.' },
                { ic: '⛯', t: 'Favourable tax regime', p: 'Eligible nomads can apply for the Beckham Law, taxing qualifying Spanish income at a flat 24% rather than progressive rates — a meaningful advantage for higher earners.' },
                { ic: '✱', t: 'Mediterranean lifestyle', p: 'Coastline, sunshine, world-renowned cuisine and an unhurried daily rhythm that has made Spain a long-standing favourite of expatriates.' },
                { ic: '✎', t: 'Education & schooling', p: 'Free public primary and secondary schooling for residents\u2019 children, alongside established international and bilingual schools in every major city.' },
                { ic: '✚', t: 'Respected healthcare', p: 'Spain ranks among the world\u2019s strongest healthcare systems, with access to public care for social-security contributors and an excellent private sector.' },
                { ic: '⏣', t: 'Global connectivity', p: 'Direct flights and high-speed rail link Spain to the rest of Europe, the Americas and North Africa, keeping family and business within easy reach.' },
              ].map((c, i) => (
                <div className="why-card sp-reveal" key={i}><div className="ic">{c.ic}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        <div className="tilework" aria-hidden="true"></div>

        {/* PROGRAMME OVERVIEW / ELIGIBILITY */}
        <section className="block prog" id="programme">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center" style={{ color: 'var(--gold-soft)' }}>The Programme</span>
              <h2>The Spain Digital Nomad Visa, explained clearly</h2>
              <p>A residence route built around remote work and proven income rather than investment — modern, regulated and genuinely lived-in.</p>
            </div>
            <div className="prog-grid">
              {[
                { no: '01 · DEFINITION', t: 'What is the visa?', p: 'A residence permit for non-EU/EEA nationals who work remotely for employers or clients based outside Spain, introduced under the Startups Law (Law 28/2022). It is also known as the remote-work or teleworking residence.' },
                { no: '02 · ELIGIBILITY', t: 'Who can apply?', p: 'Adults aged 18 or over, of non-EU/EEA nationality, with a clean criminal record, valid health insurance, an address in Spain, and either a relevant degree or at least three years of professional experience.' },
                { no: '03 · WORK', t: 'The remote-work test', p: 'Employees must show an ongoing relationship with a foreign company operating for over a year, while the self-employed may serve Spanish clients only up to a defined share of their income. The connection should pre-date the application.' },
                { no: '04 · INCOME', t: 'Proof of income', p: 'Remote-work income of around €2,849 per month — about twice Spain\u2019s national minimum wage — evidenced through contracts, payslips and bank statements, with higher thresholds for accompanying family.' },
                { no: '05 · STRUCTURE', t: 'Visa & permit', p: 'The initial visa is valid for one year; once in Spain you obtain a residence permit issued for three years, renewable for a further two, subject to continuing to meet the conditions.' },
                { no: '06 · PATHWAY', t: 'Long-term pathway', p: 'After five years of legal residence you may apply for permanent residency, and — in time and subject to Spain\u2019s nationality rules — for citizenship.' },
              ].map((c, i) => (
                <div className="prog-card sp-reveal" key={i}><div className="no">{c.no}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="block benefits">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center">Key Benefits</span>
              <h2>What the residence permit makes possible</h2>
              <p>The advantages of the programme reach across your career, your family and your long-term horizon.</p>
            </div>
            <div className="ben-grid">
              {[
                { mk: 'I', t: 'Residence in Spain', p: 'The legal right to live in Spain as an EU member state, with a recognised residence card for you and your qualifying family.' },
                { mk: 'II', t: 'Family included', p: 'Bring a spouse or partner, dependent children and, in defined cases, dependent relatives within the same application framework.' },
                { mk: 'III', t: 'Schengen mobility', p: 'As a Spanish residence-permit holder, travel visa-free for short stays of up to 90 days in any 180 across the Schengen Area.' },
                { mk: 'IV', t: 'The Beckham Law option', p: 'Eligible holders may elect Spain\u2019s inbound-worker regime — a flat 24% rate on qualifying income up to €600,000, with foreign income generally exempt.' },
                { mk: 'V', t: 'Education & healthcare', p: 'Free public schooling for children and access to Spain\u2019s national health service for social-security contributors, alongside strong private options.' },
                { mk: 'VI', t: 'Route to permanence', p: 'A clear path toward permanent residency after five years, and potential citizenship eligibility under the rules in force at the time.' },
              ].map((c, i) => (
                <div className="ben-card sp-reveal" key={i}><div className="mk">{c.mk}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* FINANCIAL / INCOME REQUIREMENTS */}
        <section className="block finance" id="finance">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center">Income Requirements</span>
              <h2>What you need to demonstrate</h2>
              <p>The visa rests on proven, recurring remote-work income rather than a lump-sum investment. The figures below reflect the current minimum-wage reference.</p>
            </div>

            <div className="fin-table sp-reveal">
              <div className="fin-row head">
                <div className="fc">Applicant category</div>
                <div className="fc">Monthly income reference</div>
                <div className="fc">Annual equivalent</div>
              </div>
              {[
                { label: 'Main applicant — ~200% of minimum wage', month: '€2,849', year: '€34,188', total: false },
                { label: 'Spouse / second adult — additional', month: '€1,069', year: '€12,828', total: false },
                { label: 'Each dependent child — additional', month: '€357', year: '€4,284', total: false },
                { label: 'Illustration: family of four (2 adults, 2 children)', month: '€4,632', year: '€55,584', total: true },
              ].map((r, i) => (
                <div className={`fin-row${r.total ? ' total' : ''}`} key={i}>
                  <div className="fc label">{r.label}</div>
                  <div className="fc fig">{r.month}</div>
                  <div className="fc fig">{r.year}</div>
                </div>
              ))}
            </div>
            <p className="fin-note">Income thresholds are linked to Spain&rsquo;s national minimum wage (SMI) and are indicative. Requirements may be updated by the Spanish authorities and should be confirmed during the application. This is general information, not legal or financial advice.</p>

            <div className="fin-extra">
              {[
                { t: 'Proof of remote income', p: 'Verifiable income from a foreign employer or from clients abroad — documented through employment contracts, payslips, invoices and bank statements.' },
                { t: 'Qualifying remote work', p: 'An ongoing relationship with a company operating for more than a year, or self-employment where work for Spanish clients stays within the permitted share of total income.' },
                { t: 'Accommodation in Spain', p: 'A registered address in Spain — a rental agreement or a property purchase. There is no minimum property price or rental amount.' },
              ].map((x, i) => (
                <div className="fin-x sp-reveal" key={i}><h4>{x.t}</h4><p>{x.p}</p></div>
              ))}
            </div>

            <div className="fin-extra" style={{ marginTop: 22 }}>
              {[
                { t: 'Valid passport & NIE', p: 'A passport valid well beyond your intended stay, together with your NIE foreigner identification number and the certified, translated documents your file requires.' },
                { t: 'Clean criminal record', p: 'A recent criminal-record certificate from each country where you have lived in the relevant period, confirming good standing.' },
                { t: 'Health insurance & qualifications', p: 'Private health cover of at least €30,000, plus evidence of a relevant degree or a minimum of three years of professional experience.' },
              ].map((x, i) => (
                <div className="fin-x sp-reveal" key={i}><h4>{x.t}</h4><p>{x.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* FAMILY INCLUSION */}
        <section className="block family">
          <div className="container">
            <div className="fam-grid">
              <div className="fam-media sp-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1628084102616-ce6a67fafd7c?q=80&w=1200&auto=format&fit=crop" alt="People relaxing on a sunlit Spanish Mediterranean beach" />
              </div>
              <div className="sp-reveal">
                <span className="eyebrow">Eligible Applicants &amp; Family</span>
                <h2 style={{ fontSize: 'clamp(30px,4vw,48px)', marginBottom: 26 }}>One application, your family included</h2>
                <ul className="fam-list">
                  {[
                    { fi: '①', t: 'Main applicant', p: 'A non-EU/EEA national aged 18+ who works remotely and meets the income, accommodation, qualification and good-character requirements.' },
                    { fi: '②', t: 'Spouse or registered partner', p: 'A legally recognised spouse or registered partner, included alongside the main applicant.' },
                    { fi: '③', t: 'Dependent children', p: 'Minor children, and adult children who remain financially dependent, unmarried and, where relevant, in study.' },
                    { fi: '④', t: 'Dependent relatives', p: 'Dependent parents — and in exceptional cases other relatives — may be included where genuine financial dependency can be evidenced.' },
                  ].map((item, i) => (
                    <li key={i}>
                      <span className="fi">{item.fi}</span>
                      <div><h4>{item.t}</h4><p>{item.p}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS TIMELINE */}
        <section className="block process" id="process">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center" style={{ color: 'var(--gold-soft)' }}>The Application Journey</span>
              <h2>A guided, six-stage process</h2>
              <p>Langma International coordinates every stage and introduces licensed Spanish legal professionals where local representation is required.</p>
            </div>
            <div className="timeline">
              {[
                { d: '01', t: 'Eligibility & compliance review', p: 'A confidential assessment of your income, employment or freelance arrangements, family composition and goals — confirming the visa is the right route and mapping the documents ahead.' },
                { d: '02', t: 'Documentation preparation', p: 'Assembling contracts and proof of income, securing your NIE, arranging health insurance and accommodation, and certifying and translating each document your file requires.' },
                { d: '03', t: 'Application submission', p: 'Filing the application either at a Spanish consulate in your country of residence or, where eligible, directly in Spain, with a complete and consistent evidence pack.' },
                { d: '04', t: 'Decision', p: 'Administrative review, typically within around 15 to 45 business days for an in-country filing — longer through some consulates. Approval clears the way to complete your residence in Spain.' },
                { d: '05', t: 'Residence permit & card', p: 'Completing the in-country steps, providing biometrics and collecting your residence-permit card (TIE) for you and your family from the local police station.' },
                { d: '06', t: 'Long-term residency planning', p: 'Guidance on renewals, the 183-day presence requirement and your longer pathway toward permanent residency and, in time, naturalisation.' },
              ].map((s, i) => (
                <div className="tl-item sp-reveal" key={i}>
                  <div className="dot">{s.d}</div>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TAX CONSIDERATIONS */}
        <section className="block tax" id="tax">
          <div className="container">
            <div className="tax-grid">
              <div className="tax-copy sp-reveal">
                <span className="eyebrow">Tax Considerations</span>
                <h2>The Beckham Law advantage</h2>
                <p>One of the most compelling features of the Spain Digital Nomad Visa is access to Spain&rsquo;s special tax regime for inbound workers — widely known as the Beckham Law. For qualifying applicants, it can transform the tax position of relocating to Spain.</p>
                <p>Under the regime, qualifying Spanish-source employment income is taxed at a flat 24% on amounts up to €600,000 per year, instead of Spain&rsquo;s progressive rates that reach up to 47%. For the period the regime applies, most foreign-source income is generally outside the scope of Spanish taxation.</p>
                <p>The benefit is designed for employees and certain entrepreneurs; the self-employed do not receive the same treatment. Because outcomes depend on personal circumstances, we always introduce clients to qualified Spanish tax advisers before any decision.</p>
              </div>
              <div className="tax-panel sp-reveal">
                <h3>At a glance</h3>
                {[
                  { t: 'Flat rate on qualifying income (up to €600,000)', v: '24%' },
                  { t: 'Rate on the portion above €600,000', v: 'up to 47%' },
                  { t: 'Treatment of most foreign-source income', v: 'generally exempt' },
                  { t: 'Identification needed for tax & property', v: 'NIE' },
                ].map((l, i) => (
                  <div className="tax-line" key={i}><span className="t">{l.t}</span><span className="v">{l.v}</span></div>
                ))}
                <p className="tax-foot">Indicative summary only. Eligibility, duration and exact treatment of the regime depend on individual circumstances and current Spanish law. Langma International is not a tax adviser; confirm your position with a qualified Spanish professional.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="tilework" aria-hidden="true"></div>

        {/* LIFE IN SPAIN */}
        <section className="block life">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center">Life in Spain</span>
              <h2>Where will you set up your remote life?</h2>
              <p>From a cosmopolitan capital to the Mediterranean coast, Spain offers distinct settings for distinct lives and working styles.</p>
            </div>
            <div className="life-grid">
              {[
                { img: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=1200&auto=format&fit=crop', alt: 'The towering spires of the Sagrada Família rising above Barcelona', t: 'Barcelona', p: 'A creative, coastal city of Gaudí architecture, a thriving start-up scene and one of Europe\u2019s most loved nomad communities.' },
                { img: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200&auto=format&fit=crop', alt: "Aerial view of Madrid's Gran Vía boulevard lined with grand buildings", t: 'Madrid', p: 'The energetic capital — business, culture and nightlife — with superb transport links across Spain and beyond.' },
                { img: 'https://images.unsplash.com/photo-1622112359064-04163bf6fb8f?q=80&w=1200&auto=format&fit=crop', alt: 'A Spanish Mediterranean coastal town seen from the air', t: 'The Mediterranean Coast', p: 'Valencia, Málaga and the Costa del Sol — sunshine, sea air and relaxed, well-connected coastal living.' },
              ].map((c, i) => (
                <div className="life-card sp-reveal" key={i}>
                  <img src={c.img} alt={c.alt} />
                  <div className="ov"></div>
                  <div className="cap"><h3>{c.t}</h3><p>{c.p}</p></div>
                </div>
              ))}
            </div>
            <div className="life-strip">
              {['Mediterranean climate', 'Celebrated cuisine', 'Safe, walkable cities', 'Strong nomad communities', 'High-speed rail', 'Coworking everywhere'].map((tag, i) => (
                <span className="life-tag sp-reveal" key={i}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* WHY LANGMA */}
        <section className="block langma" id="langma">
          <div className="container">
            <div className="langma-grid">
              <div className="sp-reveal">
                <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>Why Langma International</span>
                <h2>A trusted partner for a process that deserves care</h2>
                <p className="lead">We help individuals and families access European residency through transparent guidance, strategic planning and genuinely personalised support — never overpromising, never guaranteeing outcomes we cannot control.</p>
                <p className="lead">From the first conversation to your residence card, you work with people who understand both the regulation and the human reality of moving a life and a career abroad.</p>
              </div>
              <div className="lg-list sp-reveal">
                {[
                  { t: 'Global mobility expertise', p: 'Cross-border residency experience spanning Europe and beyond, applied to your specific circumstances.' },
                  { t: 'Personalised consultation', p: 'A considered assessment of your work, family and finances — not a templated checklist.' },
                  { t: 'Documentation support', p: 'Hands-on help assembling, certifying and sequencing the paperwork that makes or breaks a file.' },
                  { t: 'Application guidance', p: 'Coordination through every official stage, with licensed Spanish legal professionals where required.' },
                  { t: 'International network', p: 'Trusted partners on the ground — legal, tax, banking and property — to keep your relocation moving.' },
                  { t: 'Transparent process', p: "Clear timelines, honest expectations and plain answers about what is — and isn't — within reach." },
                ].map((c, i) => (
                  <div className="lg-item" key={i}><h4>{c.t}</h4><p>{c.p}</p></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="block faq" id="faq">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center">Frequently Asked Questions</span>
              <h2>Clear answers, accurately stated</h2>
            </div>
            <div className="faq-wrap">
              {[
                { q: 'What is the Spain Digital Nomad Visa?', a: 'The Spain Digital Nomad Visa (Visado de Teletrabajo) is a residence route created under Spain\u2019s Startups Law, Law 28/2022, for non-EU/EEA nationals who work remotely for companies or clients based outside Spain. It lets the holder and qualifying family members live in Spain on a renewable residence permit while continuing their existing remote work.' },
                { q: 'How much income do I need?', a: 'The main applicant must show remote-work income of at least around €2,849 per month (about €34,188 per year), set at roughly twice Spain\u2019s national minimum wage. The requirement rises by approximately €1,069 per month for a spouse or second adult and around €357 per month for each dependent child. These figures are tied to the minimum wage and can change with regulation.' },
                { q: 'Can I bring my family?', a: 'Yes. You can include a spouse or registered partner and dependent children in the same process, and in defined circumstances dependent parents or other relatives who can prove financial dependency. Family members receive their own residence permits, with higher income thresholds applied for each additional person.' },
                { q: 'How are digital nomads taxed under the Beckham Law?', a: 'Eligible applicants may elect Spain\u2019s special regime for inbound workers, often called the Beckham Law. Qualifying Spanish-source employment income is taxed at a flat 24% on amounts up to €600,000 per year, with the excess taxed at up to 47%, and most foreign-source income is generally exempt for the period the regime applies. The benefit suits employees and certain entrepreneurs; the self-employed are treated differently. Always confirm your position with a qualified Spanish tax adviser.' },
                { q: 'Can it lead to permanent residency or citizenship?', a: 'The visa is valid for one year, after which a three-year residence permit is issued and can be renewed for a further two. After five years of legal residence — spending at least 183 days per year in Spain — you may apply for permanent residency. Spanish citizenship generally becomes possible after ten years of legal residence, subject to language and integration exams and Spain\u2019s rules on dual nationality.' },
              ].map((faq, i) => (
                <div className={`faq-item sp-reveal ${openFaq === i ? 'open' : ''}`} key={i}>
                  <button className="faq-q" onClick={() => toggleFaq(i)}>
                    <span>{faq.q}</span>
                    <span className="pm">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="faq-a" style={{ maxHeight: openFaq === i ? '600px' : '0' }}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEAD FORM / CONSULTATION CTA */}
        <section className="block lead-sec" id="lead">
          <div className="container">
            <div className="lead-grid">
              <div className="lead-copy sp-reveal">
                <span className="eyebrow">Begin Your Journey</span>
                <h2>Begin your Spain residency journey with expert guidance</h2>
                <p>Share a few details and a Langma International advisor will arrange a confidential consultation to assess your eligibility and outline a realistic path forward — with no obligation.</p>
                <ul className="lead-assure">
                  {[
                    'Strictly confidential, no-obligation review',
                    'Honest assessment of your eligibility',
                    'Clear timelines and transparent guidance',
                    'Introductions to licensed Spanish professionals',
                  ].map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
              <div className="form-card sp-reveal">
                <h3>Request a private consultation</h3>
                <p className="fsub">We typically respond within one business day.</p>
                <form onSubmit={handleLeadSubmit} noValidate>
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
                    <label htmlFor="work">Your remote-work status</label>
                    <select id="work" defaultValue="">
                      <option value="">Please select</option>
                      <option>Employee of a foreign company</option>
                      <option>Freelancer / self-employed</option>
                      <option>Company owner / founder</option>
                      <option>Other / combination</option>
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

        {/* OFFICE VISIT */}
        <section className="block office" id="office-visit">
          <div className="container">
            <div className="office-grid">
              <div className="office-copy sp-reveal">
                <span className="eyebrow">In Person</span>
                <h2>Visit our office &amp; discuss your Spain residency goals</h2>
                <p>Prefer to meet face to face? Sit down with our advisory team for a private, one-on-one consultation and map your route to Spanish residency in confidence.</p>
                <ul className="office-points">
                  {[
                    { oi: '✦', t: 'One-on-one consultation', p: 'A direct conversation with the people who will guide your case.' },
                    { oi: '✓', t: 'Personal eligibility review', p: 'An honest look at your income, remote-work status and timeline.' },
                    { oi: '↪', t: 'Your residency roadmap', p: 'A clear, step-by-step plan with a candid document assessment.' },
                  ].map((item, i) => (
                    <li key={i}>
                      <span className="oi">{item.oi}</span>
                      <div><h4>{item.t}</h4><p>{item.p}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="office-form sp-reveal">
                <h3>Book your visit</h3>
                <form onSubmit={handleOfficeSubmit} noValidate>
                  <div className="field"><label htmlFor="ov-name">Full name</label><input type="text" id="ov-name" required /></div>
                  <div className="frow">
                    <div className="field"><label htmlFor="ov-phone">Phone</label><input type="tel" id="ov-phone" placeholder="+ Country code" required /></div>
                    <div className="field"><label htmlFor="ov-email">Email</label><input type="email" id="ov-email" required /></div>
                  </div>
                  <div className="frow">
                    <div className="field"><label htmlFor="ov-date">Preferred date</label><input type="date" id="ov-date" min={todayStr()} required /></div>
                    <div className="field">
                      <label htmlFor="ov-time">Preferred time</label>
                      <select id="ov-time" required defaultValue="">
                        <option value="">Select</option>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-navy" disabled={officeLoading}>{officeLoading ? 'Sending...' : 'Request Office Visit'}</button>
                  {(officeMsg || officeSubmitted) && (
                    <div className={`success show`} style={!officeSuccess && officeMsg ? { background: 'rgba(220,38,38,.08)', border: '1px solid #ef4444', color: '#b91c1c' } : undefined}>
                      {officeMsg || "Thank you — we'll be in touch shortly to confirm your visit."}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CALENDAR BOOKING */}
        <section className="block calendar" id="calendar">
          <div className="container">
            <div className="cal-grid">
              <div className="cal-copy sp-reveal">
                <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>Schedule a Meeting</span>
                <h2>Reserve a private consultation slot</h2>
                <p>Choose a date and time that suits you for a confidential video or phone consultation with a senior Langma International advisor. We&rsquo;ll review your eligibility and answer your questions directly.</p>
                <ul className="cal-benefits">
                  {[
                    'A focused 30-minute session built around your situation',
                    'A candid view of your eligibility and likely timeline',
                    'Clear next steps and a transparent fee outline',
                  ].map((l, i) => <li key={i}>{l}</li>)}
                </ul>
                <div className="cal-urgency"><span className="dot-pulse"></span><span>Limited advisory slots open each week — early dates fill quickly</span></div>
              </div>
              <div className="cal-card sp-reveal">
                <h3>Pick a date &amp; time</h3>
                <p className="csub">All times shown are local to our advisory office.</p>
                <div className="cal-head">
                  <span>{monthNames[calView.getMonth()]} {calView.getFullYear()}</span>
                  <div>
                    <button type="button" onClick={goPrevMonth} aria-label="Previous month">‹</button>{' '}
                    <button type="button" onClick={goNextMonth} aria-label="Next month">›</button>
                  </div>
                </div>
                <div className="cal-dow"><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span></div>
                <div className="cal-days">
                  {calDays.map((d) => {
                    if (d.empty) return <div className="cal-day empty" key={d.key}></div>;
                    const isSel = selectedDay && d.date.getTime() === selectedDay.getTime();
                    const cls = d.off ? 'cal-day off' : `cal-day avail${isSel ? ' sel' : ''}`;
                    return (
                      <div className={cls} key={d.key} onClick={() => !d.off && pickDay(d)}>
                        {d.day}
                      </div>
                    );
                  })}
                </div>
                <div className="cal-slots">
                  {slots.map((s) => (
                    <div className={`cal-slot${selectedSlot === s ? ' sel' : ''}`} key={s} onClick={() => pickSlot(s)}>{s}</div>
                  ))}
                </div>
                <button type="button" className="btn btn-gold" onClick={confirmBooking}>Confirm My Slot</button>
                <div className="cal-confirm">{calConfirm}</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SpainDNVPage;