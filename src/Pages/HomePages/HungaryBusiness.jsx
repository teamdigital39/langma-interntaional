import React, { useState, useEffect } from 'react';
import useResidencyLeadForms from '../../hooks/useResidencyLeadForms';

const SERVICE = 'Hungary Business Residency';

const HungaryBusinessResidencyPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Hungary Business Consultation' });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });
    document.querySelectorAll('.hu-reveal').forEach((el) => observer.observe(el));
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="hu-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        .hu-page { --navy:#296166; --navy-deep:#296166; --navy-mid:#296166; --gold:#2FC7A1; --gold-soft:#6FE0C6; --gold-deep:#2FC7A1; --ivory:#F5F8F6; --beige:#E9F1EE; --champagne:#E9F1EE; --charcoal:#1B2B28; --muted:#296166; --line:rgba(47,199,161,0.30); --radius:4px; --shadow-soft:0 18px 50px rgba(26,37,64,0.10); --shadow-strong:0 30px 70px rgba(26,37,64,0.22); --ease:cubic-bezier(.22,.61,.36,1); }
        .hu-page * { margin:0; padding:0; box-sizing:border-box; }
        .hu-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; color:var(--charcoal); background:var(--ivory); line-height:1.7; font-weight:400; -webkit-font-smoothing:antialiased; overflow-x:hidden; }
        .hu-page h1,.hu-page h2,.hu-page h3,.hu-page h4 { font-family:'Cormorant Garamond',Georgia,serif; font-weight:600; color:var(--navy); line-height:1.12; letter-spacing:0.2px; }
        .hu-page p { font-weight:400; }
        .hu-page a { color:inherit; text-decoration:none; }
        .hu-page img { display:block; width:100%; height:100%; object-fit:cover; }
        .hu-page .container { max-width:1200px; margin:0 auto; padding:0 30px; }
        .hu-page .block { padding:108px 0; }
        .hu-page .eyebrow { font-family:'Inter',sans-serif; text-transform:uppercase; letter-spacing:3.5px; font-size:11.5px; color:var(--gold-deep); font-weight:600; margin-bottom:18px; display:flex; align-items:center; gap:12px; }
        .hu-page .eyebrow::before { content:""; width:34px; height:1px; background:var(--gold); display:inline-block; flex-shrink:0; }
        .hu-page .eyebrow.center { justify-content:center; }
        .hu-page .section-head { max-width:760px; margin:0 auto 60px; text-align:center; }
        .hu-page .section-head h2 { font-size:clamp(34px,4.6vw,54px); margin-bottom:18px; }
        .hu-page .section-head p { color:var(--muted); font-size:17px; }
        .hu-page .btn { display:inline-flex; align-items:center; gap:10px; font-family:'Inter',sans-serif; font-size:14px; font-weight:600; letter-spacing:0.4px; padding:16px 32px; border-radius:var(--radius); cursor:pointer; border:1px solid transparent; transition:all .35s var(--ease); }
        .hu-page .btn-gold { background:var(--gold); color:var(--navy-deep); }
        .hu-page .btn-gold:hover { background:var(--gold-soft); transform:translateY(-2px); box-shadow:0 14px 30px rgba(47,199,161,.32); }
        .hu-page .btn-ghost { background:transparent;color:#1A2540;border:2px solid #2FC7A1; }
        .hu-page .btn-ghost:hover { border-color:var(--gold); color:var(--gold-soft); }
        .hu-page .btn-forest { background:var(--navy); color:var(--ivory); }
        .hu-page .btn-forest:hover { background:var(--navy-mid); transform:translateY(-2px); }
        .hu-page .folk-divider { height:18px; width:100%; background:radial-gradient(circle at 10px 9px, var(--gold) 0 2px, transparent 2.5px), radial-gradient(circle at 0 0, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px), radial-gradient(circle at 20px 0, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px), radial-gradient(circle at 0 18px, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px), radial-gradient(circle at 20px 18px, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px); background-size:20px 18px; background-repeat:repeat-x; background-position:left center; background-color:var(--navy-deep); display:block; overflow:hidden; opacity:.92; }
        .hu-page .site-header { position:fixed; top:0; left:0; right:0; z-index:1000; padding:22px 0; transition:all .4s var(--ease); }
        .hu-page .site-header.scrolled { background:rgba(41,97,102,0.94); backdrop-filter:blur(10px); padding:14px 0; box-shadow:0 6px 30px rgba(0,0,0,.25); }
        .hu-page .nav-wrap { display:flex; align-items:center; justify-content:space-between; }
        .hu-page .brand { display:flex; flex-direction:column; line-height:1; }
        .hu-page .brand .name { font-family:'Cormorant Garamond',serif; font-size:25px; font-weight:600; color:var(--ivory); letter-spacing:1px; }
        .hu-page .brand .tag { font-family:'Inter',sans-serif; font-size:9.5px; letter-spacing:3.5px; text-transform:uppercase; color:var(--gold-soft); margin-top:4px; }
        .hu-page .nav-links { display:flex; align-items:center; gap:34px; }
        .hu-page .nav-links a { font-size:13.5px; font-weight:500; color:rgba(247,250,252,.85); letter-spacing:.3px; transition:color .25s; }
        .hu-page .nav-links a:hover { color:var(--gold-soft); }
        .hu-page .nav-cta { padding:11px 24px!important; font-size:13px; background:var(--gold); color:var(--navy-deep)!important; border-radius:var(--radius); font-weight:600; transition:all .3s; }
        .hu-page .nav-cta:hover { background:var(--gold-soft); }
        .hu-page .burger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; }
        .hu-page .burger span { width:24px; height:2px; background:var(--ivory); display:block; }
        .hu-page .hero { position:relative; min-height:auto; display:flex; align-items:center; color:#1B2B28; overflow:hidden; background:#FFFFFF;padding:72px 0 48px; }
        .hu-page .hero::before { content:""; position:absolute; inset:0; background-image:radial-gradient(circle at 20% 50%, rgba(47,199,161,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(47,199,161,0.05) 0%, transparent 40%); z-index:0; pointer-events:none; }
        .hu-page .hero-split { position:relative; z-index:2; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; padding-top:0;padding-bottom:0; }
        .hu-page .hero-copy { display:flex; flex-direction:column; }
        .hu-page .hero h1 { font-size:clamp(38px,5vw,68px); color:#1B2B28; margin-bottom:26px; font-weight:600; line-height:1.08; }
        .hu-page .hero h1 em { font-style:italic; color:#4FA3D1; font-weight:500; }
        .hu-page .hero .lead { font-size:17.5px; color:#4C5C58; max-width:560px; margin-bottom:38px; font-weight:300; line-height:1.72; }
        .hu-page .hero-cta { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:48px; }
        .hu-page .hero-badges { display:flex; gap:36px; flex-wrap:wrap; border-top:1px solid #D8E0EC; padding-top:28px; }
        .hu-page .hero-badge .num { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; line-height:1; }
        .hu-page .hero-badge .lbl { font-size:11.5px; letter-spacing:.6px; color:#7E8C88; margin-top:6px; }
        .hu-page .hero-visual { display:flex; align-items:center; justify-content:center; position:relative; }
        .hu-page .hero-img-frame { position:relative; width:100%; max-width:520px; border-radius:12px; overflow:hidden; box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22); }
        .hu-page .hero-img-frame img { display:block; width:100%; height:480px; object-fit:cover; border-radius:12px; transition:transform .9s var(--ease); }
        .hu-page .hero-img-frame:hover img { transform:scale(1.04); }
        .hu-page .hero-img-frame::after { content:""; position:absolute; inset:12px; border:1px solid rgba(47,199,161,.38); border-radius:8px; pointer-events:none; z-index:2; }
        .hu-page .hero-img-frame::before { content:""; position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.42) 0%,transparent 55%); z-index:1; border-radius:12px; pointer-events:none; }
        .hu-page .hero-visual::before { content:""; position:absolute; top:24px; right:-14px; width:100%; max-width:520px; height:100%; border:1px solid rgba(47,199,161,.18); border-radius:12px; pointer-events:none; }
        .hu-page .hero-img-badge { position:absolute; bottom:22px; left:22px; z-index:3; background:rgba(26,37,64,.82); backdrop-filter:blur(8px); border:1px solid rgba(47,199,161,.30); border-radius:6px; padding:10px 16px; display:flex; align-items:center; gap:10px; }
        .hu-page .hero-img-badge .dot-pulse { width:8px; height:8px; border-radius:50%; background:var(--gold); flex-shrink:0; animation:hu-pulse-dot 2s ease infinite; }
        @keyframes hu-pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.6; transform:scale(.85); } }
        .hu-page .hero-img-badge span { font-size:12px; letter-spacing:.5px; color:rgba(247,250,252,.88); font-weight:500; }
        .hu-page .scroll-hint { position:absolute; bottom:30px; left:50%; transform:translateX(-50%); z-index:2; font-size:10.5px; letter-spacing:3px; text-transform:uppercase; color:rgba(247,250,252,.5); display:flex; flex-direction:column; align-items:center; gap:8px; }
        .hu-page .scroll-hint .line { width:1px; height:38px; background:linear-gradient(var(--gold),transparent); animation:hu-drop 2s var(--ease) infinite; }
        @keyframes hu-drop { 0% { transform:scaleY(0); transform-origin:top; } 50% { transform:scaleY(1); transform-origin:top; } 51% { transform-origin:bottom; } 100% { transform:scaleY(0); transform-origin:bottom; } }
        .hu-page .stats-bar { background:var(--navy-deep); color:var(--ivory); }
        .hu-page .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .hu-page .stat-cell { padding:52px 30px; text-align:center; border-right:1px solid rgba(247,250,252,.10); }
        .hu-page .stat-cell:last-child { border-right:none; }
        .hu-page .stat-cell .v { font-family:'Cormorant Garamond',serif; font-size:46px; font-weight:600; color:var(--gold-soft); line-height:1; margin-bottom:12px; }
        .hu-page .stat-cell .k { font-size:13px; letter-spacing:.5px; color:rgba(247,250,252,.78); }
        .hu-page .about { background:var(--ivory); }
        .hu-page .about-grid { display:grid; grid-template-columns:1.05fr 1fr; gap:64px; align-items:center; }
        .hu-page .about-copy .eyebrow { margin-bottom:18px; }
        .hu-page .about-copy h2 { font-size:clamp(32px,4.4vw,52px); margin-bottom:22px; }
        .hu-page .about-copy p { color:var(--muted); margin-bottom:18px; font-size:16.5px; }
        .hu-page .about-media { position:relative; height:560px; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-strong); }
        .hu-page .about-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .hu-page .facts-row { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-top:54px; }
        .hu-page .fact { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:26px 22px; text-align:center; }
        .hu-page .fact .ff { font-family:'Cormorant Garamond',serif; font-size:30px; color:var(--navy); font-weight:600; }
        .hu-page .fact .fl { font-size:12.5px; color:var(--muted); letter-spacing:.4px; margin-top:6px; }
        .hu-page .country-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:52px; }
        .hu-page .cc { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:30px 26px; transition:all .3s var(--ease); }
        .hu-page .cc:hover { box-shadow:var(--shadow-soft); transform:translateY(-4px); }
        .hu-page .cc .cic { width:40px; height:40px; border:1px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--gold-deep); margin-bottom:14px; font-size:17px; }
        .hu-page .cc h4 { font-size:19px; margin-bottom:8px; }
        .hu-page .cc p { color:var(--muted); font-size:14px; line-height:1.65; }
        .hu-page .why { background:var(--beige); }
        .hu-page .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; }
        .hu-page .why-card { background:var(--champagne); padding:42px 34px; transition:background .3s; }
        .hu-page .why-card:hover { background:#fff; }
        .hu-page .why-card .ic { width:46px; height:46px; border:1px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--gold-deep); font-family:'Cormorant Garamond',serif; font-size:21px; margin-bottom:20px; }
        .hu-page .why-card h3 { font-size:24px; margin-bottom:10px; }
        .hu-page .why-card p { color:var(--muted); font-size:15px; }
        .hu-page .prog { background:var(--navy); color:var(--ivory); }
        .hu-page .prog .section-head h2 { color:var(--ivory); }
        .hu-page .prog .section-head p { color:rgba(247,250,252,.72); }
        .hu-page .prog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .hu-page .prog-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:var(--radius); padding:38px 32px; transition:all .35s var(--ease); }
        .hu-page .prog-card:hover { border-color:var(--gold); transform:translateY(-6px); }
        .hu-page .prog-card .no { font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--gold-soft); border-bottom:1px solid rgba(247,250,252,.16); padding-bottom:14px; margin-bottom:18px; letter-spacing:2px; }
        .hu-page .prog-card h3 { color:var(--ivory); font-size:25px; margin-bottom:12px; }
        .hu-page .prog-card p { color:rgba(247,250,252,.74); font-size:15px; }
        .hu-page .benefits { background:var(--ivory); }
        .hu-page .ben-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .hu-page .ben-card { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:36px 30px; position:relative; overflow:hidden; transition:all .35s var(--ease); }
        .hu-page .ben-card::before { content:""; position:absolute; top:0; left:0; width:3px; height:0; background:var(--gold); transition:height .4s var(--ease); }
        .hu-page .ben-card:hover { box-shadow:var(--shadow-soft); transform:translateY(-4px); }
        .hu-page .ben-card:hover::before { height:100%; }
        .hu-page .ben-card .mk { font-family:'Cormorant Garamond',serif; font-size:15px; color:var(--gold-deep); letter-spacing:2px; margin-bottom:16px; }
        .hu-page .ben-card h3 { font-size:23px; margin-bottom:10px; }
        .hu-page .ben-card p { color:var(--muted); font-size:15px; }
        .hu-page .eligibility { background:var(--beige); }
        .hu-page .elig-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:start; }
        .hu-page .elig-col h3 { font-size:clamp(24px,3vw,34px); margin-bottom:22px; }
        .hu-page .elig-list { list-style:none; }
        .hu-page .elig-list li { display:flex; gap:14px; padding:16px 0; border-bottom:1px solid var(--line); font-size:15px; color:var(--charcoal); }
        .hu-page .elig-list li:last-child { border-bottom:none; }
        .hu-page .elig-list li::before { content:"✓"; color:var(--gold-deep); font-weight:700; flex-shrink:0; margin-top:1px; }
        .hu-page .business-req { background:var(--ivory); }
        .hu-page .biz-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:60px; align-items:start; }
        .hu-page .biz-media { position:relative; height:500px; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-strong); }
        .hu-page .biz-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .hu-page .biz-list { list-style:none; }
        .hu-page .biz-list li { display:flex; gap:16px; padding:18px 0; border-bottom:1px solid var(--line); }
        .hu-page .biz-list li:last-child { border-bottom:none; }
        .hu-page .biz-list .bi { flex:0 0 40px; height:40px; border-radius:50%; background:var(--navy); color:var(--gold-soft); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; }
        .hu-page .biz-list h4 { font-size:18px; margin-bottom:3px; }
        .hu-page .biz-list p { color:var(--muted); font-size:14px; }
        .hu-page .finance { background:var(--beige); }
        .hu-page .fin-table { background:#fff; border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-soft); }
        .hu-page .fin-row { display:grid; grid-template-columns:1.6fr 1fr; align-items:center; border-bottom:1px solid var(--line); }
        .hu-page .fin-row:last-child { border-bottom:none; }
        .hu-page .fin-row.head { background:var(--navy); color:var(--ivory); }
        .hu-page .fin-row.head .fc { color:var(--ivory); font-weight:600; font-family:'Inter',sans-serif; font-size:13px; letter-spacing:.6px; text-transform:uppercase; }
        .hu-page .fc { padding:22px 28px; font-size:15.5px; }
        .hu-page .fc.label { font-weight:600; color:var(--navy); }
        .hu-page .fc.fig { font-family:'Cormorant Garamond',serif; font-size:24px; color:var(--gold-deep); font-weight:600; }
        .hu-page .fin-row.total { background:rgba(47,199,161,.10); }
        .hu-page .fin-note { margin-top:24px; font-size:13.5px; color:var(--muted); text-align:center; font-style:italic; }
        .hu-page .fin-extra { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:40px; }
        .hu-page .fin-x { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:28px; }
        .hu-page .fin-x h4 { font-size:21px; margin-bottom:8px; }
        .hu-page .fin-x p { color:var(--muted); font-size:14.5px; }
        .hu-page .family { background:var(--ivory); }
        .hu-page .fam-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .hu-page .fam-list { list-style:none; }
        .hu-page .fam-list li { display:flex; gap:18px; padding:22px 0; border-bottom:1px solid var(--line); }
        .hu-page .fam-list li:last-child { border-bottom:none; }
        .hu-page .fam-list .fi { flex:0 0 42px; height:42px; border-radius:50%; background:var(--navy); color:var(--gold-soft); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:19px; }
        .hu-page .fam-list h4 { font-size:21px; margin-bottom:2px; }
        .hu-page .fam-list p { color:var(--muted); font-size:14.5px; }
        .hu-page .fam-media { height:520px; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-strong); position:relative; }
        .hu-page .fam-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; }
        .hu-page .process { background:var(--navy-deep); color:var(--ivory); }
        .hu-page .process .section-head h2 { color:var(--ivory); }
        .hu-page .process .section-head p { color:rgba(247,250,252,.72); }
        .hu-page .timeline { position:relative; max-width:880px; margin:0 auto; }
        .hu-page .timeline::before { content:""; position:absolute; left:31px; top:8px; bottom:8px; width:1px; background:rgba(247,250,252,.18); }
        .hu-page .tl-item { position:relative; padding-left:92px; padding-bottom:44px; }
        .hu-page .tl-item:last-child { padding-bottom:0; }
        .hu-page .tl-item .dot { position:absolute; left:0; top:0; width:64px; height:64px; border-radius:50%; border:1px solid var(--gold); background:var(--navy-deep); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:24px; color:var(--gold-soft); }
        .hu-page .tl-item h3 { color:var(--ivory); font-size:25px; margin-bottom:6px; }
        .hu-page .tl-item p { color:rgba(247,250,252,.72); font-size:15px; max-width:620px; }
        .hu-page .pathway { background:var(--champagne); }
        .hu-page .path-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .hu-page .path-card { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:38px 30px; text-align:center; }
        .hu-page .path-card .pnum { font-family:'Cormorant Garamond',serif; font-size:52px; color:var(--gold); font-weight:600; line-height:1; margin-bottom:10px; }
        .hu-page .path-card h3 { font-size:23px; margin-bottom:10px; }
        .hu-page .path-card p { color:var(--muted); font-size:14.5px; }
        .hu-page .life { background:var(--ivory); }
        .hu-page .life-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .hu-page .life-card { position:relative; height:420px; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-soft); }
        .hu-page .life-card img { transition:transform .8s var(--ease); }
        .hu-page .life-card:hover img { transform:scale(1.06); }
        .hu-page .life-card .ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.88) 0%,rgba(26,37,64,.18) 55%,transparent 100%); z-index:1; }
        .hu-page .life-card .cap { position:absolute; left:0; right:0; bottom:0; z-index:2; padding:30px 28px; }
        .hu-page .life-card .cap h3 { color:var(--ivory); font-size:27px; margin-bottom:6px; }
        .hu-page .life-card .cap p { color:rgba(247,250,252,.82); font-size:14px; }
        .hu-page .life-strip { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; margin-top:48px; }
        .hu-page .life-tag { border:1px solid var(--line); border-radius:40px; padding:10px 22px; font-size:13.5px; color:var(--navy); background:#fff; }
        .hu-page .langma { background:var(--navy); color:var(--ivory); position:relative; overflow:hidden; }
        .hu-page .langma-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:center; }
        .hu-page .langma h2 { color:var(--ivory); font-size:clamp(32px,4.4vw,52px); margin-bottom:20px; }
        .hu-page .langma .lead { color:rgba(247,250,252,.82); font-size:17px; margin-bottom:14px; }
        .hu-page .lg-list { display:grid; grid-template-columns:1fr 1fr; gap:30px 36px; }
        .hu-page .lg-item h4 { color:var(--gold-soft); font-size:22px; margin-bottom:6px; }
        .hu-page .lg-item p { color:rgba(247,250,252,.72); font-size:14.5px; }
        .hu-page .faq { background:var(--ivory); }
        .hu-page .faq-wrap { max-width:880px; margin:0 auto; }
        .hu-page .faq-item { border-bottom:1px solid var(--line); }
        .hu-page .faq-q { width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:28px 0; display:flex; justify-content:space-between; align-items:center; gap:24px; font-family:'Cormorant Garamond',serif; font-size:23px; color:var(--navy); font-weight:600; }
        .hu-page .faq-q .pm { flex:0 0 30px; height:30px; border:1px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--gold-deep); font-family:'Inter',sans-serif; font-size:18px; transition:all .3s; }
        .hu-page .faq-item.open .pm { background:var(--gold); color:var(--navy); transform:rotate(45deg); }
        .hu-page .faq-a { max-height:0; overflow:hidden; transition:max-height .4s var(--ease); }
        .hu-page .faq-a p { padding:0 0 28px; color:var(--muted); font-size:16px; max-width:760px; }
        .hu-page .lead-sec { background:var(--navy-deep); color:var(--ivory); }
        .hu-page .lead-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:start; }
        .hu-page .lead-copy .eyebrow { color:var(--gold-soft); }
        .hu-page .lead-copy h2 { color:var(--ivory); font-size:clamp(32px,4.2vw,50px); margin-bottom:20px; }
        .hu-page .lead-copy p { color:rgba(247,250,252,.80); margin-bottom:26px; font-size:16.5px; }
        .hu-page .lead-assure { list-style:none; }
        .hu-page .lead-assure li { display:flex; gap:12px; align-items:center; padding:11px 0; color:rgba(247,250,252,.86); font-size:15px; }
        .hu-page .lead-assure li::before { content:"✓"; color:var(--gold-soft); font-weight:700; }
        .hu-page .form-card { background:var(--ivory); border-radius:var(--radius); padding:42px; box-shadow:var(--shadow-strong); }
        .hu-page .form-card h3 { font-size:27px; margin-bottom:6px; }
        .hu-page .form-card .fsub { color:var(--muted); font-size:14.5px; margin-bottom:26px; }
        .hu-page .frow { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .hu-page .field { margin-bottom:16px; }
        .hu-page .field label { display:block; font-size:12px; letter-spacing:.5px; text-transform:uppercase; color:var(--navy); font-weight:600; margin-bottom:7px; }
        .hu-page .field input,.hu-page .field select,.hu-page .field textarea { width:100%; padding:13px 15px; border:1px solid var(--line); border-radius:var(--radius); font-family:'Inter',sans-serif; font-size:15px; background:#fff; color:var(--charcoal); transition:border-color .25s; }
        .hu-page .field input:focus,.hu-page .field select:focus,.hu-page .field textarea:focus { outline:none; border-color:var(--gold); box-shadow:0 0 0 3px rgba(47,199,161,.15); }
        .hu-page .form-card .btn,.hu-page .office-form .btn { width:100%; justify-content:center; margin-top:6px; }
        .hu-page .form-card .disc { font-size:12px; color:var(--muted); margin-top:14px; text-align:center; }
        .hu-page .success { display:none; background:rgba(47,199,161,.14); border:1px solid var(--gold); border-radius:var(--radius); padding:16px; color:var(--gold-deep); font-size:14.5px; text-align:center; margin-top:16px; }
        .hu-page .success.show { display:block; }
        .hu-page .office { background:var(--beige); }
        .hu-page .office-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:60px; align-items:center; }
        .hu-page .office-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:18px; }
        .hu-page .office-copy p { color:var(--muted); font-size:16.5px; margin-bottom:26px; }
        .hu-page .office-points { list-style:none; margin-bottom:8px; }
        .hu-page .office-points li { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid var(--line); }
        .hu-page .office-points .oi { flex:0 0 38px; height:38px; border-radius:50%; border:1px solid var(--gold); color:var(--gold-deep); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; }
        .hu-page .office-points h4 { font-size:19px; margin-bottom:1px; }
        .hu-page .office-points p { font-size:14px; margin:0; }
        .hu-page .office-form { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:40px; box-shadow:var(--shadow-soft); }
        .hu-page .office-form h3 { font-size:25px; margin-bottom:22px; }
        .hu-page .foot { background:var(--navy-deep); color:rgba(247,250,252,.7); padding:74px 0 32px; }
        .hu-page .foot-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1.3fr; gap:44px; margin-bottom:50px; }
        .hu-page .foot-brand .fname { font-family:'Cormorant Garamond',serif; font-size:28px; color:var(--ivory); font-weight:600; letter-spacing:1px; }
        .hu-page .foot-brand .ftag { font-size:10px; letter-spacing:3px; text-transform:uppercase; color:var(--gold-soft); margin:6px 0 18px; display:block; }
        .hu-page .foot-brand p { font-size:14px; max-width:320px; }
        .hu-page .foot-col h4 { color:var(--ivory); font-size:18px; margin-bottom:18px; font-weight:600; }
        .hu-page .foot-col a { display:block; font-size:14px; padding:6px 0; transition:color .25s; }
        .hu-page .foot-col a:hover { color:var(--gold-soft); }
        .hu-page .foot-bottom { border-top:1px solid rgba(247,250,252,.12); padding-top:26px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:14px; font-size:12.5px; }
        .hu-page .legal { max-width:920px; font-size:11.5px; color:rgba(247,250,252,.5); line-height:1.7; margin-top:18px; }
        .hu-page .hu-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s var(--ease),transform .7s var(--ease); }
        .hu-page .hu-reveal.in { opacity:1; transform:none; }
        @media(max-width:980px) {
          .hu-page .nav-links { display:none; position:absolute; top:100%; left:0; right:0; flex-direction:column; gap:0; background:rgba(26,37,64,.97); padding:14px 30px; }
          .hu-page .nav-links.open { display:flex; }
          .hu-page .nav-links a { padding:12px 0; }
          .hu-page .burger { display:flex; }
          .hu-page .about-grid,.hu-page .biz-grid,.hu-page .fam-grid,.hu-page .langma-grid,.hu-page .lead-grid,.hu-page .office-grid,.hu-page .elig-grid { grid-template-columns:1fr; gap:40px; }
          .hu-page .stats-grid,.hu-page .why-grid,.hu-page .prog-grid,.hu-page .ben-grid,.hu-page .life-grid,.hu-page .fin-extra,.hu-page .path-grid { grid-template-columns:1fr 1fr; }
          .hu-page .facts-row,.hu-page .country-cards { grid-template-columns:1fr 1fr; }
          .hu-page .lg-list { grid-template-columns:1fr; }
          .hu-page .about-media,.hu-page .fam-media,.hu-page .biz-media { height:420px; }
          .hu-page .hero-split { grid-template-columns:1fr; gap:48px; padding-top:0;padding-bottom:32px; }
          .hu-page .hero-img-frame img { height:380px; }
          .hu-page .hero-visual::before { display:none; }
          .hu-page .hero-img-frame { max-width:100%; }
        }
        @media(max-width:640px) {
          .hu-page .block { padding:74px 0; }
          .hu-page .container { padding:0 22px; }
          .hu-page .stats-grid,.hu-page .why-grid,.hu-page .prog-grid,.hu-page .ben-grid,.hu-page .life-grid,.hu-page .fin-extra,.hu-page .facts-row,.hu-page .path-grid,.hu-page .country-cards { grid-template-columns:1fr; }
          .hu-page .stat-cell { border-right:none; border-bottom:1px solid rgba(247,250,252,.10); }
          .hu-page .frow { grid-template-columns:1fr; }
          .hu-page .fin-row { grid-template-columns:1fr; }
          .hu-page .fc { padding:14px 20px; }
          .hu-page .fin-row.head { display:none; }
          .hu-page .hero-badges { gap:26px; }
          .hu-page .form-card,.hu-page .office-form { padding:30px; }
          .hu-page .foot-grid { grid-template-columns:1fr 1fr; }
        }
        @media(prefers-reduced-motion:reduce) {
          .hu-page * { animation:none!important; transition:none!important; }
          .hu-page .hu-reveal { opacity:1; transform:none; }
        }
      /* PR hero responsive fix */
  /* PR hero — account for site TopBar + Navbar only (no double top padding) */
  @media(max-width:980px){
    .hu-page .hero{padding:64px 0 40px;}
    .hu-page .hero-split{grid-template-columns:1fr !important;gap:36px !important;padding-top:0 !important;}
    .hu-page .hero-visual{order:-1;max-width:560px;margin:0 auto;width:100%;}
    .hu-page .hero-visual::before{display:none;}
    .hu-page .hero-img-frame,.hu-page .hero-img-card{max-width:100%;}
    .hu-page .hero-badges{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;}
  }
  @media(max-width:640px){
    .hu-page .hero{padding:56px 0 32px;}
    .hu-page .hero-split{gap:28px !important;padding-bottom:16px !important;}
    .hu-page .hero h1{font-size:clamp(30px,8vw,42px);}
    .hu-page .hero-badges{grid-template-columns:1fr;}
    .hu-page .hero-cta,.hu-page .hero-ctas{flex-direction:column;}
    .hu-page .hero-cta .btn,.hu-page .hero-ctas .btn{width:100%;justify-content:center;}
    .hu-page .container{padding:0 20px;}
  }
`}</style>
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" aria-hidden="true"></div>
          <div className="container">
            <div className="hero-split">
              <div className="hero-copy">
                <span className="eyebrow">Hungary Business Residence Permit · Company Formation Pathway</span>
                <h1>Hungary Residency by Opening a Company: your <em>EU residence permit</em> through business establishment</h1>
                <p className="lead">Hungary&rsquo;s company-formation residence route allows non-EU entrepreneurs and investors to establish a legal entity, secure EU residence and build a meaningful foothold in the heart of Europe. With one of the lowest corporate tax rates in the Union and direct access to the Schengen Area, Hungary presents a rare combination of fiscal efficiency and genuine quality of life. Langma International guides you through every stage — from initial due diligence to residence card in hand.</p>
                <div className="hero-cta">
                  <a href="#lead" className="btn btn-gold">Book Your Private Consultation</a>
                  <a href="#programme" className="btn btn-ghost">Explore the Programme</a>
                </div>
                <div className="hero-badges">
                  {[
                    { num: '€7,700', suf: '+', lbl: 'Minimum authorised capital (Kft)' },
                    { num: '1+2', suf: '', lbl: 'Year residence permit cycle' },
                    { num: 'EU', suf: '', lbl: 'Member-state residence' },
                    { num: '9%', suf: '', lbl: 'Corporate income tax rate' },
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
                  <img src="/images/hungary-business/residency-opening-company.png" alt="Budapest Castle District and Matthias Church — Hungary residency by opening a company" />
                  <div className="hero-img-badge">
                    <span className="dot-pulse"></span>
                    <span>Budapest, Hungary</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-hint"><span>Discover</span><span className="line"></span></div>
        </section>

        <div className="folk-divider" aria-hidden="true"></div>

        {/* TRUST STATS BAR */}
        <section className="stats-bar" aria-label="Programme key figures">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-cell hu-reveal"><div className="v">€14,020<span style={{ fontSize: 22 }}>+</span></div><div className="k">Indicative total cost of obtaining residence</div></div>
              <div className="stat-cell hu-reveal"><div className="v">6+ mo</div><div className="k">Minimum end-to-end timeline</div></div>
              <div className="stat-cell hu-reveal"><div className="v">Schengen</div><div className="k">90-day visa-free travel as permit holder</div></div>
              <div className="stat-cell hu-reveal"><div className="v">3 yrs</div><div className="k">Maximum initial permit period under this route</div></div>
            </div>
          </div>
        </section>

        {/* ABOUT HUNGARY */}
        <section className="block about" id="about">
          <div className="container">
            <div className="about-grid">
              <div className="about-copy hu-reveal">
                <span className="eyebrow">Discover Hungary</span>
                <h2>Hungary: a Central European crossroads where ambition meets heritage</h2>
                <p>Landlocked at the geographical centre of Europe and bordered by seven nations, Hungary occupies a strategically vital position within the European Union. Home to approximately 10 million people, it is a parliamentary republic with deep historical roots, a distinguished academic and scientific tradition, and an increasingly dynamic business environment. Hungarian is the official language; English and German are widely spoken in professional and commercial circles. The national currency is the Hungarian Forint (HUF), and the capital is Budapest — consistently ranked among Europe&rsquo;s most beautiful and liveable cities.</p>
                <p>Hungary joined the European Union in 2004 and participates fully in the Schengen Area, affording residents free movement across twenty-six European countries. Its economy is export-oriented and resilient, with growing strength in manufacturing, technology, pharmaceuticals and financial services. The country&rsquo;s flat corporate income tax of 9% — the lowest in the EU — combined with competitive personal income tax and simplified business taxation regimes, makes it an increasingly attractive base for entrepreneurs, holding company structures and internationally mobile professionals.</p>
                <p>For those seeking genuine EU residence through enterprise, Hungary offers rare substance: a place to build, live and belong — not merely a document to carry.</p>
              </div>
              <div className="about-media hu-reveal">
                <span className="frame" aria-hidden="true"></span>
                <img src="/images/hungary-business/central-european-crossroads.png" alt="St. Stephen's Basilica on Zrínyi Street, Budapest — Hungary as a Central European crossroads" />
              </div>
            </div>

            <div className="facts-row">
              {[
                { ff: '~10M', fl: 'Population' },
                { ff: 'Budapest', fl: 'Capital city' },
                { ff: 'HUF', fl: 'Official currency' },
                { ff: 'EU & Schengen', fl: 'Member state since 2004' },
              ].map((f, i) => (
                <div className="fact hu-reveal" key={i}><div className="ff">{f.ff}</div><div className="fl">{f.fl}</div></div>
              ))}
            </div>

            <div className="country-cards">
              {[
                { ic: '🏛', t: 'Strategic Location', p: 'Bordered by Austria, Slovakia, Ukraine, Romania, Serbia, Croatia and Slovenia — Hungary sits at the intersection of key European trade and transport corridors.' },
                { ic: '📉', t: 'Tax Efficiency', p: 'At 9%, Hungary\u2019s corporate income tax is the lowest in the EU. The personal income tax rate is a flat 15%, well below the progressive rates applied across most of Western Europe.' },
                { ic: '🔒', t: 'Safety & Stability', p: 'Hungary is widely regarded as one of Europe\u2019s safer countries, with comparatively low levels of violent crime, stable civic institutions and a consistent rule of law.' },
                { ic: '🏥', t: 'Healthcare', p: 'Hungary provides both public and private healthcare services. Access to public healthcare depends on the applicant\u2019s residence status, employment arrangements or health insurance coverage, rather than residence alone.' },
                { ic: '🎓', t: 'Education & Innovation', p: 'Home to some of Central Europe\u2019s oldest and most respected universities, Hungary maintains a strong culture of scientific inquiry, engineering excellence and technology innovation.' },
                { ic: '✈', t: 'Connectivity', p: 'Budapest Ferenc Liszt International Airport connects Hungary to major European capitals and global hubs. Vienna is three hours by road; London, Paris and Barcelona under three hours by air.' },
                { ic: '💶', t: 'Cost of Living', p: 'Hungary generally offers a lower cost of living than many Western European countries, including Spain and Portugal, although individual living expenses will vary by city, lifestyle and personal circumstances.' },
                { ic: '🏦', t: 'Banking Access', p: 'Residence permit holders generally enjoy easier access to Hungarian banking services than non-residents, though account opening remains subject to each financial institution\u2019s own compliance, due diligence and KYC requirements.' },
                { ic: '⚡', t: 'Energy Costs', p: 'Hungary benefits from some of the lowest electricity and gas supply costs in the European Union, a tangible advantage for businesses with operational energy requirements.' },
              ].map((c, i) => (
                <div className="cc hu-reveal" key={i}><div className="cic">{c.ic}</div><h4>{c.t}</h4><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE HUNGARY */}
        <section className="block why" id="why-hungary">
          <div className="container">
            <div className="section-head hu-reveal">
              <span className="eyebrow center">Why Global Entrepreneurs Choose Hungary</span>
              <h2>A compelling case — fiscally, strategically and personally</h2>
              <p>Beyond the residence permit itself, Hungary provides entrepreneurs and internationally mobile professionals with a genuinely advantageous environment in which to operate and live.</p>
            </div>
            <div className="why-grid">
              {[
                { ic: '★', t: 'EU member-state residence', p: 'A lawfully issued residence permit in a full European Union member state, granting the right to live and operate in Hungary with a recognised EU status.' },
                { ic: '⊕', t: 'Lowest corporate tax in the EU', p: 'Hungary\u2019s 9% corporate income tax and 15% flat personal income tax rate create a structurally efficient environment for business owners and holding company structures.' },
                { ic: '❋', t: 'Schengen Area access', p: 'Travel freely for short stays across all Schengen member states, with Hungary at the geographic centre — hours from Vienna, Prague, Bratislava and Ljubljana.' },
                { ic: '✎', t: 'Accessible establishment costs', p: 'With a minimum authorised capital of approximately €7,700 for a Kft, Hungary\u2019s company formation route is one of the most cost-accessible business residency pathways in Europe.' },
                { ic: '✚', t: 'Family residence included', p: 'After the first year, a spouse, children under eighteen and financially dependent parents may all obtain Hungarian residence permits alongside the main applicant.' },
                { ic: '⌖', t: 'Renewable residency', p: 'The permit is issued for 1 year and may be extended for a further 2 years. After the initial 3-year period, the permit may be re-obtained with the same company. This route does not itself provide a direct pathway to permanent residence or citizenship; those outcomes require qualifying under a separate eligible residence category.' },
              ].map((c, i) => (
                <div className="why-card hu-reveal" key={i}><div className="ic">{c.ic}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        <div className="folk-divider" aria-hidden="true"></div>

        {/* PROGRAMME OVERVIEW */}
        <section className="block prog" id="programme">
          <div className="container">
            <div className="section-head hu-reveal">
              <span className="eyebrow center" style={{ color: 'var(--gold-soft)' }}>The Programme</span>
              <h2>Hungary Residency by Opening a Company, explained clearly</h2>
              <p>A structured, legally grounded pathway to EU residence through entrepreneurial activity — governed by Hungarian Law 2023.XC, introduced in March 2024.</p>
            </div>
            <div className="prog-grid">
              {[
                { no: '01 · DEFINITION', t: 'What is the programme?', p: 'Non-EU and non-EEA nationals may obtain a Hungarian residence permit by registering and operating a legal entity in Hungary. Eligible company forms are the limited liability company (Kft), the non-public joint stock company (Zrt) or the public joint stock company (Nyrt). Individual entrepreneur status does not qualify under this route.' },
                { no: '02 · ELIGIBILITY', t: 'Who can apply?', p: 'Non-EU, non-EEA nationals who are over eighteen years of age, hold no entry ban to Hungary or the Schengen Area, and carry no criminal record in Hungary or other Schengen member states. The applicant must be an owner or co-owner — and ideally a director — of the registered Hungarian company.' },
                { no: '03 · COMPANY CAPITAL', t: 'Minimum authorised capital', p: 'For a Kft, the minimum is HUF 3,000,000 — approximately €7,700. For a Zrt or Nyrt, the minimum rises to HUF 5,000,000 — approximately €12,700. Four out of five Hungarian companies operate as limited liability entities.' },
                { no: '04 · INCOME THRESHOLD', t: 'Company income requirement', p: 'The Hungarian Migration Service assesses the business\u2019s capacity to generate income for the applicant. The minimum expected income from company operations is €1,500 per month. New companies demonstrate this through a business plan; an established company employing five or more EU citizens may not require one.' },
                { no: '05 · PERMIT STRUCTURE', t: 'The residence permit', p: 'The residence permit is initially issued for one year. It may be extended once for a further two years, giving a total initial period of up to three years. At the end of three years, the permit may be re-obtained with the same company, subject to ongoing compliance.' },
                { no: '06 · PATHWAY', t: 'Renewal and continuation', p: 'The permit is granted for 1 year and may be extended once for 2 further years — a maximum of 3 years in total under this route. After 3 years, the permit may be re-obtained with the same company. This route does not itself provide a direct pathway to permanent residence or citizenship, which require qualifying under a separate eligible Hungarian residence category.' },
              ].map((c, i) => (
                <div className="prog-card hu-reveal" key={i}><div className="no">{c.no}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="block benefits" id="benefits">
          <div className="container">
            <div className="section-head hu-reveal">
              <span className="eyebrow center">Key Benefits</span>
              <h2>What the Hungary business residence permit makes possible</h2>
              <p>The advantages extend across your business environment, daily life, financial position and long-term residency horizon.</p>
            </div>
            <div className="ben-grid">
              {[
                { mk: 'I', t: 'EU residence in Hungary', p: 'The legal right to reside in Hungary as an EU member state, with a recognised biometric residence card valid for you to live and operate your business.' },
                { mk: 'II', t: 'Schengen Area travel', p: 'As a Hungarian residence permit holder, the ability to travel visa-free for up to 90 days within any 180-day period across all Schengen member states.' },
                { mk: 'III', t: 'Fiscal efficiency', p: 'Operate within Hungary\u2019s 9% corporate income tax environment and benefit from simplified tax regimes designed for small and medium-sized businesses.' },
                { mk: 'IV', t: 'European banking access', p: 'Open personal and corporate bank accounts with Hungarian financial institutions — a privilege that simplifies international business operations considerably.' },
                { mk: 'V', t: 'Family residence', p: 'Your spouse, children under eighteen and financially dependent parents may all obtain Hungarian residence permits upon renewal of your first-year permit.' },
                { mk: 'VI', t: 'Renewable EU residence', p: 'The permit is renewable — issued for 1 year, extendable for 2 more — and may be re-obtained after 3 years with the same company. Note: this route does not itself provide a direct path to permanent residence or citizenship; a separate eligible residence category is required for those outcomes.' },
              ].map((c, i) => (
                <div className="ben-card hu-reveal" key={i}><div className="mk">{c.mk}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ELIGIBILITY */}
        <section className="block eligibility" id="eligibility">
          <div className="container">
            <div className="section-head hu-reveal">
              <span className="eyebrow center">Eligibility</span>
              <h2>Who qualifies for the Hungary business residence permit?</h2>
              <p>The programme is open to entrepreneurs, investors and business owners meeting the personal, legal and commercial criteria set under Hungarian Law 2023.XC.</p>
            </div>
            <div className="elig-grid">
              <div className="elig-col hu-reveal">
                <h3>Personal eligibility criteria</h3>
                <ul className="elig-list">
                  {[
                    'Non-EU and non-EEA national (third-country citizen)',
                    'Aged 18 or over at the time of application',
                    'No criminal record in Hungary or any Schengen Area country',
                    'No outstanding entry ban to Hungary or the Schengen Area',
                    'Valid passport and full personal documentation',
                    'Owner or co-owner of the registered Hungarian company',
                    'Serving as or appointing a director of the company',
                    'Ability to demonstrate the company generates at least €1,500/month',
                  ].map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
              <div className="elig-col hu-reveal">
                <h3>Financial &amp; documentation criteria</h3>
                <ul className="elig-list">
                  {[
                    'Registered Hungarian company in an approved legal form (Kft, Zrt or Nyrt)',
                    'Minimum authorised capital paid up per the company type',
                    'Bank account balance of at least €10,000',
                    'Rental agreement for residential property in Hungary (minimum 12 months)',
                    'Valid health insurance for the duration of the initial permit period',
                    'Business plan for new companies (or five EU-citizen employees as an alternative)',
                    'Agreements with Hungarian business partners demonstrating operational readiness',
                    'Certified and legalised supporting documents as required by the consulate',
                  ].map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* BUSINESS REQUIREMENTS */}
        <section className="block business-req" id="business-requirements">
          <div className="container">
            <div className="about-grid biz-grid" style={{ marginBottom: 0 }}>
              <div className="biz-media hu-reveal">
                <span className="frame" aria-hidden="true"></span>
                <img src="/images/hungary-business/business-requirements.png" alt="Professional advisors reviewing legal and business requirements for company residency" />
              </div>
              <div className="hu-reveal">
                <span className="eyebrow">Business Requirements</span>
                <h2>What your Hungarian company must look like</h2>
                <p style={{ color: 'var(--muted)', marginBottom: 28, fontSize: 16 }}>The residence permit is granted on the basis of a qualifying legal entity. The company&rsquo;s structure, capital, activity and financial performance are all assessed by the Hungarian Migration Service.</p>
                <ul className="biz-list">
                  {[
                    { n: '①', t: 'Approved legal form', p: 'The company must be a Kft (limited liability company), Zrt (non-public joint stock company) or Nyrt (public joint stock company). Individual entrepreneur registration does not qualify.' },
                    { n: '②', t: 'Paid-up authorised capital', p: 'Kft: minimum HUF 3,000,000 (approx. €7,700). Zrt or Nyrt: minimum HUF 5,000,000 (approx. €12,700). The capital must be verifiably deposited in the company account.' },
                    { n: '③', t: 'Founders and directors', p: 'The applicant must be an owner or co-owner. Multiple founders are permitted, and each has the right to apply for a residence permit. Serving as company director strengthens the application materially.' },
                    { n: '④', t: 'Permitted activity fields', p: 'Most commercial activities are permitted without special licences. Regulated sectors — including insurance, investment services, pharmaceutical manufacturing and banking — require prior sector-specific authorisation.' },
                    { n: '⑤', t: 'Monthly income of €1,500+', p: 'The Migration Service evaluates whether the business can provide the applicant with at least €1,500 per month. New companies present a business plan; established companies with five or more EU-citizen employees may proceed without one.' },
                  ].map((c, i) => (
                    <li key={i}><span className="bi">{c.n}</span><div><h4>{c.t}</h4><p>{c.p}</p></div></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FINANCIAL REQUIREMENTS */}
        <section className="block finance" id="finance">
          <div className="container">
            <div className="section-head hu-reveal">
              <span className="eyebrow center">Investment &amp; Financial Requirements</span>
              <h2>What you need to demonstrate — clearly stated</h2>
              <p>The programme requires a combination of company capitalisation, personal liquidity, accommodation costs and administrative fees. The figures below are based on publicly available programme information.</p>
            </div>

            <div className="fin-table hu-reveal">
              <div className="fin-row head">
                <div className="fc">Expense item</div>
                <div className="fc">Amount</div>
              </div>
              {[
                { label: 'Authorised capital — Kft (minimum)', amount: '€7,700', sub: '(HUF 3,000,000)', total: false },
                { label: 'Residential property rental — 12 months', amount: '€6,000+', sub: '', total: false },
                { label: 'Health insurance — 12 months', amount: '€180+', sub: '', total: false },
                { label: 'Document translation and consular legalisation', amount: '€30+', sub: '', total: false },
                { label: 'Application processing fee', amount: '€110', sub: '', total: false },
                { label: 'Indicative total', amount: '€14,020+', sub: '', total: true },
              ].map((r, i) => (
                <div className={`fin-row${r.total ? ' total' : ''}`} key={i}>
                  <div className="fc label">{r.label}</div>
                  <div className="fc fig">{r.amount}{r.sub && <span style={{ fontSize: 14, color: 'var(--muted)' }}> {r.sub}</span>}</div>
                </div>
              ))}
            </div>
            <p className="fin-note">Figures are indicative and based on the Kft minimum capital. A Zrt or Nyrt requires €12,700+ in authorised capital, raising the total accordingly. A bank account balance of €10,000 must also be demonstrated; this amount is not consumed by the process. All costs should be verified with a licensed professional during your advisory process.</p>

            <div className="fin-extra">
              {[
                { t: 'Company capitalisation', p: 'The authorised capital must be formally deposited and verified. It constitutes the legal foundation of the company and is not an application fee — it forms part of the company\u2019s balance sheet.' },
                { t: 'Bank account balance (€10,000)', p: 'In addition to company capital, the applicant must demonstrate personal liquidity of at least €10,000 in a bank account. This amount is separate from the authorised capital and does not need to be surrendered.' },
                { t: 'Residential accommodation', p: 'A rental agreement for Hungarian residential property of at least twelve months\u2019 duration is required. This must be in place before the application is submitted and reflects approximately €6,000 or more per year depending on location.' },
              ].map((x, i) => (
                <div className="fin-x hu-reveal" key={i}><h4>{x.t}</h4><p>{x.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* FAMILY */}
        <section className="block family" id="family">
          <div className="container">
            <div className="fam-grid">
              <div className="fam-media hu-reveal">
                <span className="frame" aria-hidden="true"></span>
                <img src="/images/hungary-business/family-belongs.png" alt="A family viewing a property with a professional advisor — your family belongs in the picture" />
              </div>
              <div className="hu-reveal">
                <span className="eyebrow">Family Inclusion</span>
                <h2 style={{ fontSize: 'clamp(30px,4vw,48px)', marginBottom: 26 }}>Your family belongs in the picture</h2>
                <p style={{ color: 'var(--muted)', marginBottom: 28, fontSize: 16 }}>The programme extends beyond the founding entrepreneur. Once the main applicant&rsquo;s permit is renewed at the end of the first year, the following family members become eligible for their own Hungarian residence permits.</p>
                <ul className="fam-list">
                  {[
                    { fi: '①', t: 'Main applicant', p: 'The company owner or co-owner who meets all personal, financial and business eligibility criteria under Law 2023.XC.' },
                    { fi: '②', t: 'Spouse', p: 'A spouse in an officially registered marriage. The spouse\u2019s residence permit is issued upon renewal of the main applicant\u2019s first-year permit.' },
                    { fi: '③', t: 'Children under 18', p: 'Minor children of the main applicant may obtain residence permits at the same point — renewal of the initial one-year permit.' },
                    { fi: '④', t: 'Financially dependent parents', p: 'Parents who are financially dependent on the main applicant may also be included in the family reunification at the renewal stage.' },
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
            <div className="section-head hu-reveal">
              <span className="eyebrow center" style={{ color: 'var(--gold-soft)' }}>The Application Journey</span>
              <h2>A structured, six-stage process</h2>
              <p>The complete journey from preliminary review to residence card takes at least six months. Langma International coordinates each stage and introduces licensed Hungarian legal professionals where local expertise is required.</p>
            </div>
            <div className="timeline">
              {[
                { d: '01', t: 'Preliminary due diligence', p: 'A confidential review of your personal and business background against international legal and commercial databases — identifying in advance any factors that could affect the application outcome and substantially reducing the risk of refusal. This stage completes in approximately one day.' },
                { d: '02', t: 'Company registration in Hungary', p: 'The company is incorporated through an authorised Hungarian lawyer. Registration documents may be signed in person in Hungary or remotely via video conference, with original signed documents dispatched by courier. This stage typically takes ten or more working days.' },
                { d: '03', t: 'Corporate bank account opening', p: 'A current account for the company must be opened in person at a Hungarian bank — remote opening is not permitted under current banking practice. A valid Schengen visa is required for the visit. Applications may be submitted to more than one bank simultaneously. This stage takes one month or more.' },
                { d: '04', t: 'Consular residence permit application', p: 'The company founder submits the full residence permit application to the Hungarian consulate in their country of citizenship or current residence. Applications are accepted in person, by appointment only. Your Langma International advisor prepares and sequences the complete documentation file in advance.' },
                { d: '05', t: 'Government due diligence and decision', p: 'The Hungarian authorities conduct a thorough review of the applicant\u2019s background, the company\u2019s business case and its projected contribution to Hungary. If the permit is approved, a Type D visitor visa is issued for entry into Hungary to collect the residence card. This stage takes two months or more.' },
                { d: '06', t: 'Biometrics submission and residence card issuance', p: 'The applicant enters Hungary within three months of the visa being issued and submits biometrics for the residence permit card. The finished card is delivered to the registered residential address or to an authorised representative in Hungary. Timeline: one month or more from biometric submission.' },
              ].map((s, i) => (
                <div className="tl-item hu-reveal" key={i}>
                  <div className="dot">{s.d}</div>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="folk-divider" aria-hidden="true"></div>

        {/* RENEWAL & PATHWAY */}
        <section className="block pathway" id="pathway">
          <div className="container">
            <div className="section-head hu-reveal">
              <span className="eyebrow center">Residency Pathway</span>
              <h2>From first permit to renewal — and continuing your residency</h2>
              <p>The Hungary business residence route offers a transparent, progressive pathway for those committed to building a long-term presence in the EU.</p>
            </div>
            <div className="path-grid">
              {[
                { n: '1', t: 'Initial residence permit', p: 'The first permit is valid for one year. The applicant must spend at least 90 days in Hungary within every six-month period to maintain residency in good standing during this phase.' },
                { n: '+2', t: 'Renewal for two years', p: 'At the end of the first year, the permit may be extended for a further two years, provided the company is generating €1,500+ per month, residential property is maintained and minimum presence requirements are met. Family members receive their permits at this stage.' },
                { n: '3+', t: 'Re-obtaining the permit & future options', p: 'After the initial 3-year period, the business residence permit may be re-obtained with the same company, subject to ongoing compliance. This route does not itself provide a direct path to permanent residence or citizenship. To pursue those outcomes, applicants must qualify under a separate eligible Hungarian residence category — such as the Hungary Golden Visa — in accordance with all legal requirements applicable at the time.' },
              ].map((c, i) => (
                <div className="path-card hu-reveal" key={i}>
                  <div className="pnum">{c.n}</div>
                  <h3>{c.t}</h3>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13.5, marginTop: 30, fontStyle: 'italic' }}>This business residence permit does not itself provide a direct route to permanent residence or citizenship. Residency conditions and renewal requirements are governed by Hungarian law and may be subject to change. This information is for general guidance only and does not constitute legal advice. All applications are subject to assessment by the competent Hungarian authorities.</p>
          </div>
        </section>

        {/* LIFE IN HUNGARY */}
        <section className="block life" id="living-in-hungary">
          <div className="container">
            <div className="section-head hu-reveal">
              <span className="eyebrow center">Living in Hungary</span>
              <h2>A European life, richly textured</h2>
              <p>Hungary rewards those who choose it with cultural depth, business vitality and a quality of everyday life that consistently surprises new arrivals.</p>
            </div>
            <div className="life-grid">
              {[
                { img: '/images/hungary-business/rich-modern-lifestyle.png', alt: 'Evening life on a pedestrian street in Budapest — rich heritage and modern lifestyle', t: 'Rich Heritage & Modern Lifestyle', p: 'From thermal baths and Baroque architecture to thriving café culture and a world-class music scene, Budapest fuses the grandeur of its past with an unmistakably contemporary energy.' },
                { img: '/images/hungary-business/business-innovation-hub.png', alt: 'Modern business district skyline — Hungary as a business and innovation hub', t: 'Business & Innovation Hub', p: 'Hungary\u2019s growing start-up ecosystem, established multinational presence and supportive fiscal environment make it a credible and increasingly visible European business destination for internationally minded entrepreneurs.' },
                { img: '/images/hungary-business/european-living-connectivity.png', alt: 'Professional working from a cafe — European living with global connectivity', t: 'European Living with Global Connectivity', p: 'Austria, Slovakia, Croatia and beyond are all within a short drive or flight. Hungary\u2019s central position within the Schengen Area means that Europe — for business or leisure — is never far away.' },
              ].map((c, i) => (
                <div className="life-card hu-reveal" key={i}>
                  <img src={c.img} alt={c.alt} />
                  <div className="ov"></div>
                  <div className="cap"><h3>{c.t}</h3><p>{c.p}</p></div>
                </div>
              ))}
            </div>
            <div className="life-strip">
              {['Thermal spa culture', 'World-class cuisine', 'Vibrant arts scene', 'Affordable cost of living', 'International business community', 'Danube river lifestyle', 'Excellent healthcare', 'Safe, walkable cities'].map((tag, i) => (
                <span className="life-tag hu-reveal" key={i}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* WHY LANGMA */}
        <section className="block langma" id="langma">
          <div className="container">
            <div className="langma-grid">
              <div className="hu-reveal">
                <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>Why Langma International</span>
                <h2>A trusted partner for a process that rewards careful preparation</h2>
                <p className="lead">We help entrepreneurs, investors and globally mobile families access European residency through meticulous preparation, transparent guidance and personalised support — never overpromising, never guaranteeing outcomes we do not control.</p>
                <p className="lead">From your first eligibility conversation through to your biometrics appointment and residence card, you work with a team that understands both the regulatory framework and the human reality of building a life in a new country.</p>
                <a href="#lead" className="btn btn-gold" style={{ marginTop: 24 }}>Begin with a private consultation</a>
              </div>
              <div className="lg-list hu-reveal">
                {[
                  { t: 'Global mobility expertise', p: 'Hands-on experience across European business residency and investment programmes, applied to your specific profile and objectives.' },
                  { t: 'Personalised advisory', p: 'A considered assessment of your business, family and financial situation — not a templated process applied uniformly to every client.' },
                  { t: 'Company formation support', p: 'Introductions to licensed Hungarian lawyers and business registration specialists who can complete your company formation efficiently and correctly.' },
                  { t: 'Documentation preparation', p: 'Hands-on guidance assembling, certifying and sequencing the documentation that makes or breaks a consular application file.' },
                  { t: 'International professional network', p: 'Trusted on-the-ground partners in banking, law, accountancy and property — keeping your establishment process moving at every stage.' },
                  { t: 'Transparent, honest process', p: 'Clear timelines, realistic expectations and plain answers about what is achievable — and what is not — from a firm that values long-term relationships over short-term fees.' },
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
            <div className="section-head hu-reveal">
              <span className="eyebrow center">Frequently Asked Questions</span>
              <h2>Clear answers, accurately stated</h2>
            </div>
            <div className="faq-wrap">
              {[
                { q: 'What is the Hungary Residency by Opening a Company programme?', a: 'Under Hungarian Law 2023.XC, introduced in March 2024, non-EU and non-EEA nationals may obtain a Hungarian residence permit by registering and operating a company in Hungary. Eligible legal forms are the limited liability company (Kft), the non-public joint stock company (Zrt) and the public joint stock company (Nyrt). The residence permit is initially valid for one year and may be extended for a further two.' },
                { q: 'What is the minimum authorised capital required?', a: 'A Kft requires a minimum of HUF 3,000,000 — approximately €7,700. A Zrt or Nyrt requires at least HUF 5,000,000 — approximately €12,700. The capital must be formally deposited and forms part of the company\u2019s balance sheet, not a non-refundable government fee.' },
                { q: 'What income must the company generate?', a: 'The Hungarian Migration Service evaluates the company\u2019s capacity to support the applicant financially. The minimum expected monthly income from company operations is €1,500. New companies demonstrate this capacity through a business plan. Companies that employ at least five citizens of Hungary or other EU member states may be eligible to proceed without a business plan.' },
                { q: 'What additional financial resources must I demonstrate?', a: 'In addition to the company\u2019s authorised capital, applicants must demonstrate a personal bank account balance of at least €10,000. A rental agreement for Hungarian residential property covering at least twelve months is also required, at an approximate cost of €6,000 or more per year depending on location. The total indicative cost of obtaining the residence permit is €14,020 or more for a Kft structure.' },
                { q: 'Can I open a company bank account remotely?', a: 'No. Current Hungarian banking practice requires the corporate bank account to be opened in person at a Hungarian bank. A valid Schengen visa is required for this visit. Applications may be submitted to more than one bank simultaneously. This stage of the process typically takes one month or more.' },
                { q: 'Can family members obtain residence permits?', a: 'Yes. A spouse in officially registered marriage, children under eighteen and financially dependent parents may all obtain Hungarian residence permits. Importantly, family members receive their permits upon renewal of the main applicant\u2019s first-year permit — that is, they join the programme at the two-year extension stage, not at the outset.' },
                { q: 'How long is the residence permit valid and how is it renewed?', a: 'The initial permit is valid for one year. It may be renewed once for a further two years, provided the company continues to generate income of €1,500 or more per month, the applicant maintains residential property in Hungary and spends at least 90 days in Hungary within every six-month period. After three years, the permit may be re-obtained with the same company.' },
                { q: 'How long does the entire process take?', a: 'The complete process from preliminary due diligence through company registration, bank account opening, consular application, government review and biometric submission takes at least six months. Company registration takes ten or more working days; bank account opening takes one month or more; government due diligence typically requires two or more months.' },
                { q: 'Does this business residence permit lead to permanent residence or citizenship?', a: 'No. The Hungary residence permit obtained by opening a company does not itself provide a direct route to permanent residence or citizenship. After the initial 1-year permit and a 2-year renewal — a maximum of 3 years under this route — the permit may be re-obtained with the same company. To pursue permanent residence or citizenship, applicants must qualify under a separate eligible Hungarian residence category, such as the Hungary Golden Visa. Those separate pathways have their own legal requirements and timelines which should be verified with a licensed professional.' },
                { q: 'Does the Hungary residence permit allow travel across the Schengen Area?', a: 'Yes. Hungary is a full member of the Schengen Area. Holders of a valid Hungarian residence permit may travel visa-free within the Schengen Zone for short stays of up to 90 days within any 180-day period, subject to the applicable rules. The permit grants the right to reside in Hungary; it does not automatically confer the right to live or work permanently in other EU or Schengen member states.' },
              ].map((faq, i) => (
                <div className={`faq-item hu-reveal ${openFaq === i ? 'open' : ''}`} key={i}>
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

        {/* LEAD FORM */}
        <section className="block lead-sec" id="lead">
          <div className="container">
            <div className="lead-grid">
              <div className="lead-copy hu-reveal">
                <span className="eyebrow">Begin Your Journey</span>
                <h2>Begin your Hungary residency journey with expert guidance</h2>
                <p>Share a few details and a Langma International advisor will arrange a confidential consultation to assess your eligibility and outline a realistic path forward — with no obligation.</p>
                <ul className="lead-assure">
                  {[
                    'Strictly confidential, no-obligation eligibility review',
                    'Honest, transparent assessment of your situation',
                    'Clear timelines and realistic cost guidance',
                    'Introductions to licensed Hungarian legal professionals',
                  ].map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
              <div className="form-card hu-reveal">
                <h3>Request a private consultation</h3>
                <p className="fsub">We typically respond within one business day.</p>
                <form onSubmit={handleLeadSubmit} noValidate>
                  <div className="frow">
                    <div className="field"><label htmlFor="fname">First name</label><input type="text" id="fname" required autoComplete="given-name" /></div>
                    <div className="field"><label htmlFor="lname">Last name</label><input type="text" id="lname" required autoComplete="family-name" /></div>
                  </div>
                  <div className="field"><label htmlFor="email">Email address</label><input type="email" id="email" required autoComplete="email" /></div>
                  <div className="frow">
                    <div className="field"><label htmlFor="phone">Phone</label><input type="tel" id="phone" placeholder="+ Country code" autoComplete="tel" /></div>
                    <div className="field"><label htmlFor="country">Country of residence</label><input type="text" id="country" autoComplete="country-name" /></div>
                  </div>
                  <div className="field">
                    <label htmlFor="interest">Business stage</label>
                    <select id="interest" defaultValue="">
                      <option value="">Please select</option>
                      <option>I have an existing company I want to register in Hungary</option>
                      <option>I plan to establish a new company in Hungary</option>
                      <option>I am exploring options — no company yet</option>
                      <option>Other / I would like to discuss my situation</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-gold" disabled={leadLoading}>{leadLoading ? 'Sending...' : 'Request Consultation'}</button>
                  <p className="disc">By submitting this form, you agree to be contacted regarding your enquiry. Your details are treated with the utmost confidentiality.</p>
                  {leadMsg && <div className={`success show ${leadSuccess ? '' : 'form-msg error'}`}>{leadMsg}</div>}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* OFFICE VISIT */}
        <section className="block office" id="office-visit">
          <div className="container">
            <div className="office-grid">
              <div className="office-copy hu-reveal">
                <span className="eyebrow">In Person</span>
                <h2>Schedule a private office consultation</h2>
                <p>Prefer to meet face to face? Sit down with our advisory team to discuss your eligibility, your company structure and your residency goals in complete confidence.</p>
                <ul className="office-points">
                  {[
                    { oi: '✦', t: 'Meet our advisory team', p: 'A direct conversation with the people who will guide your Hungarian residency case.' },
                    { oi: '✓', t: 'Review your eligibility', p: 'An honest assessment of your background, business plans and timeline.' },
                    { oi: '↪', t: 'Explore your options', p: 'Compare the business residency route with other European residency programmes where relevant to your goals.' },
                  ].map((item, i) => (
                    <li key={i}>
                      <span className="oi">{item.oi}</span>
                      <div><h4>{item.t}</h4><p>{item.p}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="office-form hu-reveal">
                <h3>Book your visit</h3>
                <form onSubmit={handleOfficeSubmit} noValidate>
                  <div className="field"><label htmlFor="ov-name">Full name</label><input type="text" id="ov-name" required autoComplete="name" /></div>
                  <div className="frow">
                    <div className="field"><label htmlFor="ov-phone">Phone</label><input type="tel" id="ov-phone" placeholder="+ Country code" required autoComplete="tel" /></div>
                    <div className="field"><label htmlFor="ov-email">Email</label><input type="email" id="ov-email" required autoComplete="email" /></div>
                  </div>
                  <div className="frow">
                    <div className="field"><label htmlFor="ov-date">Preferred date</label><input type="date" id="ov-date" min={new Date().toISOString().split('T')[0]} required /></div>
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
                  <button type="submit" className="btn btn-forest" disabled={officeLoading}>{officeLoading ? 'Sending...' : 'Request Office Visit'}</button>
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

export default HungaryBusinessResidencyPage;