import React, { useState, useEffect } from 'react';
import useResidencyLeadForms from '../../hooks/useResidencyLeadForms';

const SERVICE = 'Italy Digital Nomad Visa';

const ItalyDNVPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Italy DNV Consultation' });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.it-reveal').forEach((el) => observer.observe(el));
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="it-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        .it-page { --navy:#296166; --navy-deep:#296166; --navy-mid:#296166; --gold:#2FC7A1; --gold-soft:#6FE0C6; --gold-deep:#2FC7A1; --ivory:#F5F8F6; --beige:#E9F1EE; --charcoal:#1B2B28; --muted:#296166; --line:rgba(47,199,161,0.30); --radius:4px; --shadow-soft:0 18px 50px rgba(26,37,64,0.10); --shadow-strong:0 30px 70px rgba(26,37,64,0.22); --ease:cubic-bezier(.22,.61,.36,1); }
        .it-page * { margin:0; padding:0; box-sizing:border-box; }
        .it-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; color:var(--charcoal); background:var(--ivory); line-height:1.7; font-weight:400; -webkit-font-smoothing:antialiased; overflow-x:hidden; }
        .it-page h1,.it-page h2,.it-page h3,.it-page h4 { font-family:'Cormorant Garamond',Georgia,serif; font-weight:600; color:var(--navy); line-height:1.12; letter-spacing:0.2px; }
        .it-page p { font-weight:400; }
        .it-page a { color:inherit; text-decoration:none; }
        .it-page img { display:block; width:100%; height:100%; object-fit:cover; }
        .it-page .container { max-width:1200px; margin:0 auto; padding:0 30px; }
        .it-page .block { padding:108px 0; }
        .it-page .eyebrow { font-family:'Inter',sans-serif; text-transform:uppercase; letter-spacing:3.5px; font-size:11.5px; color:var(--gold-deep); font-weight:600; margin-bottom:18px; display:flex; align-items:center; gap:12px; }
        .it-page .eyebrow::before { content:""; width:34px; height:1px; background:var(--gold); display:inline-block; flex-shrink:0; }
        .it-page .eyebrow.center { justify-content:center; }
        .it-page .section-head { max-width:760px; margin:0 auto 60px; text-align:center; }
        .it-page .section-head h2 { font-size:clamp(34px,4.6vw,54px); margin-bottom:18px; }
        .it-page .section-head p { color:var(--muted); font-size:17px; }
        .it-page .btn { display:inline-flex; align-items:center; gap:10px; font-family:'Inter',sans-serif; font-size:14px; font-weight:600; letter-spacing:0.4px; padding:16px 32px; border-radius:var(--radius); cursor:pointer; border:1px solid transparent; transition:all .35s var(--ease); }
        .it-page .btn-gold { background:var(--gold); color:var(--navy-deep); }
        .it-page .btn-gold:hover { background:var(--gold-soft); transform:translateY(-2px); box-shadow:0 14px 30px rgba(47,199,161,.32); }
        .it-page .btn-ghost { background:transparent;color:#1A2540;border:2px solid #2FC7A1; }
        .it-page .btn-ghost:hover { border-color:var(--gold); color:var(--gold-soft); }
        .it-page .btn-navy { background:var(--navy); color:var(--ivory); }
        .it-page .btn-navy:hover { background:var(--navy-mid); transform:translateY(-2px); }
        .it-page .meander { height:18px; width:100%; background:linear-gradient(90deg, var(--gold) 0 2px, transparent 2px 18px), linear-gradient(0deg, var(--gold) 0 2px, transparent 2px 18px); background-size:36px 18px,36px 18px; background-repeat:repeat-x,repeat-x; background-position:left top,left top; background-color:var(--navy); display:block; overflow:hidden; opacity:.92; }
        .it-page .site-header { position:fixed; top:0; left:0; right:0; z-index:1000; padding:22px 0; transition:all .4s var(--ease); }
        .it-page .site-header.scrolled { background:rgba(41,97,102,0.94); backdrop-filter:blur(10px); padding:14px 0; box-shadow:0 6px 30px rgba(0,0,0,.25); }
        .it-page .nav-wrap { display:flex; align-items:center; justify-content:space-between; }
        .it-page .brand { display:flex; flex-direction:column; line-height:1; }
        .it-page .brand .name { font-family:'Cormorant Garamond',serif; font-size:25px; font-weight:600; color:var(--ivory); letter-spacing:1px; }
        .it-page .brand .tag { font-family:'Inter',sans-serif; font-size:9.5px; letter-spacing:3.5px; text-transform:uppercase; color:var(--gold-soft); margin-top:4px; }
        .it-page .nav-links { display:flex; align-items:center; gap:34px; }
        .it-page .nav-links a { font-size:13.5px; font-weight:500; color:rgba(247,250,252,.85); letter-spacing:.3px; transition:color .25s; }
        .it-page .nav-links a:hover { color:var(--gold-soft); }
        .it-page .nav-cta { padding:11px 24px!important; font-size:13px; background:var(--gold); color:var(--navy-deep)!important; border-radius:var(--radius); font-weight:600; transition:all .3s; }
        .it-page .nav-cta:hover { background:var(--gold-soft); }
        .it-page .burger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; }
        .it-page .burger span { width:24px; height:2px; background:var(--ivory); display:block; }
        .it-page .hero { position:relative; min-height:auto; display:flex; align-items:center; color:#1B2B28; overflow:hidden; background:#FFFFFF;padding:72px 0 48px; }
        .it-page .hero::before { content:""; position:absolute; inset:0; background-image:radial-gradient(circle at 20% 50%, rgba(47,199,161,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(47,199,161,0.05) 0%, transparent 40%); z-index:0; pointer-events:none; }
        .it-page .hero-split { position:relative; z-index:2; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; padding-top:0;padding-bottom:0; }
        .it-page .hero-copy { display:flex; flex-direction:column; }
        .it-page .hero h1 { font-size:clamp(38px,5vw,68px); color:#1B2B28; margin-bottom:26px; font-weight:600; line-height:1.08; }
        .it-page .hero h1 em { font-style:italic; color:#4FA3D1; font-weight:500; }
        .it-page .hero .lead { font-size:17.5px; color:#4C5C58; max-width:560px; margin-bottom:38px; font-weight:300; line-height:1.72; }
        .it-page .hero-cta { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:48px; }
        .it-page .hero-badges { display:flex; gap:36px; flex-wrap:wrap; border-top:1px solid #D8E0EC; padding-top:28px; }
        .it-page .hero-badge .num { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; line-height:1; }
        .it-page .hero-badge .lbl { font-size:11.5px; letter-spacing:.6px; color:#7E8C88; margin-top:6px; }
        .it-page .hero-visual { display:flex; align-items:center; justify-content:center; position:relative; }
        .it-page .hero-img-frame { position:relative; width:100%; max-width:520px; border-radius:12px; overflow:hidden; box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22); }
        .it-page .hero-img-frame img { display:block; width:100%; height:480px; object-fit:cover; border-radius:12px; transition:transform .9s var(--ease); }
        .it-page .hero-img-frame:hover img { transform:scale(1.04); }
        .it-page .hero-img-frame::after { content:""; position:absolute; inset:12px; border:1px solid rgba(47,199,161,.38); border-radius:8px; pointer-events:none; z-index:2; }
        .it-page .hero-img-frame::before { content:""; position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.42) 0%,transparent 55%); z-index:1; border-radius:12px; pointer-events:none; }
        .it-page .hero-visual::before { content:""; position:absolute; top:24px; right:-14px; width:100%; max-width:520px; height:100%; border:1px solid rgba(47,199,161,.18); border-radius:12px; pointer-events:none; }
        .it-page .hero-img-badge { position:absolute; bottom:22px; left:22px; z-index:3; background:rgba(26,37,64,.82); backdrop-filter:blur(8px); border:1px solid rgba(47,199,161,.30); border-radius:6px; padding:10px 16px; display:flex; align-items:center; gap:10px; }
        .it-page .hero-img-badge .dot-pulse { width:8px; height:8px; border-radius:50%; background:var(--gold); flex-shrink:0; animation:it-pulse-dot 2s ease infinite; }
        @keyframes it-pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.6; transform:scale(.85); } }
        .it-page .hero-img-badge span { font-size:12px; letter-spacing:.5px; color:rgba(247,250,252,.88); font-weight:500; }
        .it-page .scroll-hint { position:absolute; bottom:30px; left:50%; transform:translateX(-50%); z-index:2; font-size:10.5px; letter-spacing:3px; text-transform:uppercase; color:rgba(247,250,252,.5); display:flex; flex-direction:column; align-items:center; gap:8px; }
        .it-page .scroll-hint .line { width:1px; height:38px; background:linear-gradient(var(--gold),transparent); animation:it-drop 2s var(--ease) infinite; }
        @keyframes it-drop { 0% { transform:scaleY(0); transform-origin:top; } 50% { transform:scaleY(1); transform-origin:top; } 51% { transform-origin:bottom; } 100% { transform:scaleY(0); transform-origin:bottom; } }
        .it-page .stats-bar { background:var(--navy-deep); color:var(--ivory); }
        .it-page .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .it-page .stat-cell { padding:52px 30px; text-align:center; border-right:1px solid rgba(247,250,252,.10); }
        .it-page .stat-cell:last-child { border-right:none; }
        .it-page .stat-cell .v { font-family:'Cormorant Garamond',serif; font-size:46px; font-weight:600; color:var(--gold-soft); line-height:1; margin-bottom:12px; }
        .it-page .stat-cell .k { font-size:13px; letter-spacing:.5px; color:rgba(247,250,252,.78); }
        .it-page .about { background:var(--ivory); }
        .it-page .about-grid { display:grid; grid-template-columns:1.05fr 1fr; gap:64px; align-items:center; }
        .it-page .about-copy .eyebrow { margin-bottom:18px; }
        .it-page .about-copy h2 { font-size:clamp(32px,4.4vw,52px); margin-bottom:22px; }
        .it-page .about-copy p { color:var(--muted); margin-bottom:18px; font-size:16.5px; }
        .it-page .about-media { position:relative; height:560px; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-strong); }
        .it-page .about-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .it-page .facts-row { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-top:54px; }
        .it-page .fact { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:26px 22px; text-align:center; }
        .it-page .fact .ff { font-family:'Cormorant Garamond',serif; font-size:28px; color:var(--navy); font-weight:600; }
        .it-page .fact .fl { font-size:12.5px; color:var(--muted); letter-spacing:.4px; margin-top:6px; }
        .it-page .facts-row-2 { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-top:22px; }
        .it-page .why { background:var(--beige); }
        .it-page .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; }
        .it-page .why-card { background:var(--ivory); padding:42px 34px; transition:background .3s; }
        .it-page .why-card:hover { background:#fff; }
        .it-page .why-card .ic { width:46px; height:46px; border:1px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--gold-deep); font-family:'Cormorant Garamond',serif; font-size:21px; margin-bottom:20px; }
        .it-page .why-card h3 { font-size:24px; margin-bottom:10px; }
        .it-page .why-card p { color:var(--muted); font-size:15px; }
        .it-page .prog { background:var(--navy); color:var(--ivory); }
        .it-page .prog .section-head h2 { color:var(--ivory); }
        .it-page .prog .section-head p { color:rgba(247,250,252,.72); }
        .it-page .prog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .it-page .prog-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:var(--radius); padding:38px 32px; transition:all .35s var(--ease); }
        .it-page .prog-card:hover { border-color:var(--gold); transform:translateY(-6px); }
        .it-page .prog-card .no { font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--gold-soft); border-bottom:1px solid rgba(247,250,252,.16); padding-bottom:14px; margin-bottom:18px; letter-spacing:2px; }
        .it-page .prog-card h3 { color:var(--ivory); font-size:25px; margin-bottom:12px; }
        .it-page .prog-card p { color:rgba(247,250,252,.74); font-size:15px; }
        .it-page .benefits { background:var(--ivory); }
        .it-page .ben-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .it-page .ben-card { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:36px 30px; position:relative; overflow:hidden; transition:all .35s var(--ease); }
        .it-page .ben-card::before { content:""; position:absolute; top:0; left:0; width:3px; height:0; background:var(--gold); transition:height .4s var(--ease); }
        .it-page .ben-card:hover { box-shadow:var(--shadow-soft); transform:translateY(-4px); }
        .it-page .ben-card:hover::before { height:100%; }
        .it-page .ben-card .mk { font-family:'Cormorant Garamond',serif; font-size:15px; color:var(--gold-deep); letter-spacing:2px; margin-bottom:16px; }
        .it-page .ben-card h3 { font-size:23px; margin-bottom:10px; }
        .it-page .ben-card p { color:var(--muted); font-size:15px; }
        .it-page .finance { background:var(--beige); }
        .it-page .fin-table { background:#fff; border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-soft); }
        .it-page .fin-row { display:grid; grid-template-columns:1.4fr 1fr 1fr; align-items:center; border-bottom:1px solid var(--line); }
        .it-page .fin-row:last-child { border-bottom:none; }
        .it-page .fin-row.head { background:var(--navy); color:var(--ivory); }
        .it-page .fin-row.head .fc { color:var(--ivory); font-weight:600; font-family:'Inter',sans-serif; font-size:13px; letter-spacing:.6px; text-transform:uppercase; }
        .it-page .fc { padding:22px 28px; font-size:15.5px; }
        .it-page .fc.label { font-weight:600; color:var(--navy); }
        .it-page .fc.fig { font-family:'Cormorant Garamond',serif; font-size:24px; color:var(--gold-deep); font-weight:600; }
        .it-page .fin-row.total { background:rgba(47,199,161,.10); }
        .it-page .fin-note { margin-top:24px; font-size:13.5px; color:var(--muted); text-align:center; font-style:italic; }
        .it-page .fin-extra { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:40px; }
        .it-page .fin-x { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:28px; }
        .it-page .fin-x h4 { font-size:21px; margin-bottom:8px; }
        .it-page .fin-x p { color:var(--muted); font-size:14.5px; }
        .it-page .family { background:var(--ivory); }
        .it-page .fam-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .it-page .fam-list { list-style:none; }
        .it-page .fam-list li { display:flex; gap:18px; padding:22px 0; border-bottom:1px solid var(--line); }
        .it-page .fam-list li:last-child { border-bottom:none; }
        .it-page .fam-list .fi { flex:0 0 42px; height:42px; border-radius:50%; background:var(--navy); color:var(--gold-soft); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:19px; }
        .it-page .fam-list h4 { font-size:21px; margin-bottom:2px; }
        .it-page .fam-list p { color:var(--muted); font-size:14.5px; }
        .it-page .fam-media { height:520px; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-strong); position:relative; }
        .it-page .fam-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; }
        .it-page .process { background:var(--navy-deep); color:var(--ivory); }
        .it-page .process .section-head h2 { color:var(--ivory); }
        .it-page .process .section-head p { color:rgba(247,250,252,.72); }
        .it-page .timeline { position:relative; max-width:880px; margin:0 auto; }
        .it-page .timeline::before { content:""; position:absolute; left:31px; top:8px; bottom:8px; width:1px; background:rgba(247,250,252,.18); }
        .it-page .tl-item { position:relative; padding-left:92px; padding-bottom:44px; }
        .it-page .tl-item:last-child { padding-bottom:0; }
        .it-page .tl-item .dot { position:absolute; left:0; top:0; width:64px; height:64px; border-radius:50%; border:1px solid var(--gold); background:var(--navy-deep); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:24px; color:var(--gold-soft); }
        .it-page .tl-item h3 { color:var(--ivory); font-size:25px; margin-bottom:6px; }
        .it-page .tl-item p { color:rgba(247,250,252,.72); font-size:15px; max-width:620px; }
        .it-page .life { background:var(--ivory); }
        .it-page .life-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .it-page .life-card { position:relative; height:420px; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-soft); }
        .it-page .life-card img { transition:transform .8s var(--ease); }
        .it-page .life-card:hover img { transform:scale(1.06); }
        .it-page .life-card .ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.88) 0%,rgba(26,37,64,.18) 55%,transparent 100%); z-index:1; }
        .it-page .life-card .cap { position:absolute; left:0; right:0; bottom:0; z-index:2; padding:30px 28px; }
        .it-page .life-card .cap h3 { color:var(--ivory); font-size:27px; margin-bottom:6px; }
        .it-page .life-card .cap p { color:rgba(247,250,252,.82); font-size:14px; }
        .it-page .life-strip { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; margin-top:48px; }
        .it-page .life-tag { border:1px solid var(--line); border-radius:40px; padding:10px 22px; font-size:13.5px; color:var(--navy); background:#fff; }
        .it-page .langma { background:var(--navy); color:var(--ivory); position:relative; overflow:hidden; }
        .it-page .langma-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:center; }
        .it-page .langma h2 { color:var(--ivory); font-size:clamp(32px,4.4vw,52px); margin-bottom:20px; }
        .it-page .langma .lead { color:rgba(247,250,252,.82); font-size:17px; margin-bottom:14px; }
        .it-page .lg-list { display:grid; grid-template-columns:1fr 1fr; gap:30px 36px; }
        .it-page .lg-item h4 { color:var(--gold-soft); font-size:22px; margin-bottom:6px; }
        .it-page .lg-item p { color:rgba(247,250,252,.72); font-size:14.5px; }
        .it-page .faq { background:var(--ivory); }
        .it-page .faq-wrap { max-width:880px; margin:0 auto; }
        .it-page .faq-item { border-bottom:1px solid var(--line); }
        .it-page .faq-q { width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:28px 0; display:flex; justify-content:space-between; align-items:center; gap:24px; font-family:'Cormorant Garamond',serif; font-size:22px; color:var(--navy); font-weight:600; }
        .it-page .faq-q .pm { flex:0 0 30px; height:30px; border:1px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--gold-deep); font-family:'Inter',sans-serif; font-size:18px; transition:all .3s; }
        .it-page .faq-item.open .pm { background:var(--gold); color:var(--navy); transform:rotate(45deg); }
        .it-page .faq-a { max-height:0; overflow:hidden; transition:max-height .4s var(--ease); }
        .it-page .faq-a p { padding:0 0 28px; color:var(--muted); font-size:15.5px; max-width:760px; }
        .it-page .lead-sec { background:var(--navy-deep); color:var(--ivory); }
        .it-page .lead-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:start; }
        .it-page .lead-copy .eyebrow { color:var(--gold-soft); }
        .it-page .lead-copy h2 { color:var(--ivory); font-size:clamp(32px,4.2vw,50px); margin-bottom:20px; }
        .it-page .lead-copy p { color:rgba(247,250,252,.80); margin-bottom:26px; font-size:16.5px; }
        .it-page .lead-assure { list-style:none; }
        .it-page .lead-assure li { display:flex; gap:12px; align-items:center; padding:11px 0; color:rgba(247,250,252,.86); font-size:15px; }
        .it-page .lead-assure li::before { content:"✓"; color:var(--gold-soft); font-weight:700; }
        .it-page .form-card { background:var(--ivory); border-radius:var(--radius); padding:42px; box-shadow:var(--shadow-strong); }
        .it-page .form-card h3 { font-size:27px; margin-bottom:6px; }
        .it-page .form-card .fsub { color:var(--muted); font-size:14.5px; margin-bottom:26px; }
        .it-page .frow { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .it-page .field { margin-bottom:16px; }
        .it-page .field label { display:block; font-size:12px; letter-spacing:.5px; text-transform:uppercase; color:var(--navy); font-weight:600; margin-bottom:7px; }
        .it-page .field input,.it-page .field select { width:100%; padding:13px 15px; border:1px solid var(--line); border-radius:var(--radius); font-family:'Inter',sans-serif; font-size:15px; background:#fff; color:var(--charcoal); transition:border-color .25s; }
        .it-page .field input:focus,.it-page .field select:focus { outline:none; border-color:var(--gold); box-shadow:0 0 0 3px rgba(47,199,161,.15); }
        .it-page .form-card .btn,.it-page .office-form .btn { width:100%; justify-content:center; margin-top:6px; }
        .it-page .form-card .disc { font-size:12px; color:var(--muted); margin-top:14px; text-align:center; }
        .it-page .success { display:none; background:rgba(47,199,161,.14); border:1px solid var(--gold); border-radius:var(--radius); padding:16px; color:var(--gold-deep); font-size:14.5px; text-align:center; margin-top:16px; }
        .it-page .success.show { display:block; }
        .it-page .office { background:var(--beige); }
        .it-page .office-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:60px; align-items:center; }
        .it-page .office-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:18px; }
        .it-page .office-copy p { color:var(--muted); font-size:16.5px; margin-bottom:26px; }
        .it-page .office-points { list-style:none; margin-bottom:8px; }
        .it-page .office-points li { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid var(--line); }
        .it-page .office-points .oi { flex:0 0 38px; height:38px; border-radius:50%; border:1px solid var(--gold); color:var(--gold-deep); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; }
        .it-page .office-points h4 { font-size:19px; margin-bottom:1px; }
        .it-page .office-points p { font-size:14px; margin:0; }
        .it-page .office-form { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:40px; box-shadow:var(--shadow-soft); }
        .it-page .office-form h3 { font-size:25px; margin-bottom:22px; }
        .it-page .foot { background:var(--navy-deep); color:rgba(247,250,252,.7); padding:74px 0 32px; }
        .it-page .foot-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1.3fr; gap:44px; margin-bottom:50px; }
        .it-page .foot-brand .fname { font-family:'Cormorant Garamond',serif; font-size:28px; color:var(--ivory); font-weight:600; letter-spacing:1px; }
        .it-page .foot-brand .ftag { font-size:10px; letter-spacing:3px; text-transform:uppercase; color:var(--gold-soft); margin:6px 0 18px; display:block; }
        .it-page .foot-brand p { font-size:14px; max-width:320px; }
        .it-page .foot-col h4 { color:var(--ivory); font-size:18px; margin-bottom:18px; font-weight:600; }
        .it-page .foot-col a { display:block; font-size:14px; padding:6px 0; transition:color .25s; }
        .it-page .foot-col a:hover { color:var(--gold-soft); }
        .it-page .foot-bottom { border-top:1px solid rgba(247,250,252,.12); padding-top:26px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:14px; font-size:12.5px; }
        .it-page .legal { max-width:920px; font-size:11.5px; color:rgba(247,250,252,.5); line-height:1.7; margin-top:18px; }
        .it-page .it-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s var(--ease),transform .7s var(--ease); }
        .it-page .it-reveal.in { opacity:1; transform:none; }
        @media(max-width:980px) {
          .it-page .nav-links { display:none; position:absolute; top:100%; left:0; right:0; flex-direction:column; gap:0; background:rgba(26,37,64,.97); padding:14px 30px; }
          .it-page .nav-links.open { display:flex; }
          .it-page .nav-links a { padding:12px 0; }
          .it-page .burger { display:flex; }
          .it-page .about-grid,.it-page .fam-grid,.it-page .langma-grid,.it-page .lead-grid,.it-page .office-grid { grid-template-columns:1fr; gap:40px; }
          .it-page .stats-grid,.it-page .why-grid,.it-page .prog-grid,.it-page .ben-grid,.it-page .life-grid,.it-page .fin-extra { grid-template-columns:1fr 1fr; }
          .it-page .facts-row,.it-page .facts-row-2 { grid-template-columns:1fr 1fr; }
          .it-page .lg-list { grid-template-columns:1fr; }
          .it-page .about-media,.it-page .fam-media { height:420px; }
          .it-page .hero-split { grid-template-columns:1fr; gap:48px; padding-top:0;padding-bottom:32px; }
          .it-page .hero-img-frame img { height:380px; }
          .it-page .hero-visual::before { display:none; }
          .it-page .hero-img-frame { max-width:100%; }
        }
        @media(max-width:640px) {
          .it-page .block { padding:74px 0; }
          .it-page .container { padding:0 22px; }
          .it-page .stats-grid,.it-page .why-grid,.it-page .prog-grid,.it-page .ben-grid,.it-page .life-grid,.it-page .fin-extra,.it-page .facts-row,.it-page .facts-row-2 { grid-template-columns:1fr; }
          .it-page .stat-cell { border-right:none; border-bottom:1px solid rgba(247,250,252,.10); }
          .it-page .frow { grid-template-columns:1fr; }
          .it-page .fin-row { grid-template-columns:1fr; }
          .it-page .fc { padding:14px 20px; }
          .it-page .fin-row.head { display:none; }
          .it-page .hero-badges { gap:26px; }
          .it-page .form-card,.it-page .office-form { padding:30px; }
          .it-page .foot-grid { grid-template-columns:1fr 1fr; }
        }
        @media(prefers-reduced-motion:reduce) {
          .it-page * { animation:none!important; transition:none!important; }
          .it-page .it-reveal { opacity:1; transform:none; }
        }
      /* PR hero responsive fix */
  /* PR hero — account for site TopBar + Navbar only (no double top padding) */
  @media(max-width:980px){
    .it-page .hero{padding:64px 0 40px;}
    .it-page .hero-split{grid-template-columns:1fr !important;gap:36px !important;padding-top:0 !important;}
    .it-page .hero-visual{order:-1;max-width:560px;margin:0 auto;width:100%;}
    .it-page .hero-visual::before{display:none;}
    .it-page .hero-img-frame,.it-page .hero-img-card{max-width:100%;}
    .it-page .hero-badges{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;}
  }
  @media(max-width:640px){
    .it-page .hero{padding:56px 0 32px;}
    .it-page .hero-split{gap:28px !important;padding-bottom:16px !important;}
    .it-page .hero h1{font-size:clamp(30px,8vw,42px);}
    .it-page .hero-badges{grid-template-columns:1fr;}
    .it-page .hero-cta,.it-page .hero-ctas{flex-direction:column;}
    .it-page .hero-cta .btn,.it-page .hero-ctas .btn{width:100%;justify-content:center;}
    .it-page .container{padding:0 20px;}
  }
`}</style>


      <main>
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="hero-split">
              <div className="hero-copy">
                <span className="eyebrow">Italy Digital Nomad Visa · Remote Work Residence Programme</span>
                <h1>Italy Digital Nomad Visa: live and work from <em>la dolce vita</em></h1>
                <p className="lead">Italy&rsquo;s residence route for remote professionals lets non-EU nationals relocate while continuing to work for employers or clients based abroad. From a verifiable income threshold and genuine flexibility around where you settle, to a real pathway toward long-term residency, Langma International guides you from first eligibility review through to an issued residence permit — quietly, methodically and on the right side of every regulation.</p>
                <div className="hero-cta">
                  <a href="#lead" className="btn btn-gold">Book Your Private Consultation</a>
                  <a href="#programme" className="btn btn-ghost">Explore the Nomad Visa</a>
                </div>
                <div className="hero-badges">
                  {[
                    { num: '€2,700', suf: '/mo', lbl: '2026 income benchmark' },
                    { num: '1 + 2', suf: '', lbl: 'Year residence permit cycle' },
                    { num: 'EU', suf: '', lbl: 'Member-state residence' },
                    { num: 'Family', suf: '', lbl: 'Reunification supported' },
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
                  <img src="https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=1200" alt="Rome's domes and terracotta rooftops at golden hour" />
                  <div className="hero-img-badge">
                    <span className="dot-pulse"></span>
                    <span>Rome, Italy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-hint"><span>Discover</span><span className="line"></span></div>
        </section>

        <div className="meander" aria-hidden="true"></div>

        {/* STATS BAR */}
        <section className="stats-bar">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-cell it-reveal"><div className="v">€32,400</div><div className="k">Indicative annual income benchmark (2026)</div></div>
              <div className="stat-cell it-reveal"><div className="v">5 yrs</div><div className="k">Lawful residence toward permanent residence</div></div>
              <div className="stat-cell it-reveal"><div className="v">Schengen</div><div className="k">Visa-free travel as a permit holder</div></div>
              <div className="stat-cell it-reveal"><div className="v">2024</div><div className="k">Implementing decree brought the route into force</div></div>
            </div>
          </div>
        </section>

        {/* COUNTRY OVERVIEW */}
        <section className="block about" id="about">
          <div className="container">
            <div className="about-grid">
              <div className="about-copy it-reveal">
                <span className="eyebrow">Country Overview</span>
                <h2>Italy: a founding European democracy on the Mediterranean</h2>
                <p>Stretching from the Alpine north to the sun-warmed south, Italy sits at the centre of the Mediterranean, bordered by France, Switzerland, Austria and Slovenia, with the Vatican City and San Marino enclosed within its borders. Home to roughly 59 million residents, it is a founding member of both the European Union and the Schengen Area, with Rome as its capital and the euro as its currency. Italian is the official language, while English, French and German are commonly understood in business centres and university cities.</p>
                <p>The economy ranks among the largest in the eurozone, anchored by manufacturing, fashion, design, automotive engineering, tourism and a fast-growing technology and start-up scene concentrated around Milan, Turin and Bologna. Fibre and 5G infrastructure now reach most urban centres, public and private healthcare both operate to a high standard, and an extensive rail and flight network keeps the country closely connected to the rest of Europe and beyond.</p>
                <p>For remote professionals, the appeal is straightforward: a genuine, livable base inside the European Union, with a cost of living that remains considerably gentler than comparable Western European capitals once you move beyond the largest cities.</p>
              </div>
              <div className="about-media it-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1534445867742-43195f401b6c?q=80&w=1200" alt="Sunlit Italian piazza with historic architecture and outdoor cafés" />
              </div>
            </div>
            <div className="facts-row">
              {[
                { ff: '≈59M', fl: 'Population' },
                { ff: 'Rome', fl: 'Capital city' },
                { ff: 'Euro\u00a0(€)', fl: 'Official currency' },
                { ff: 'EU & Schengen', fl: 'Founding member state' },
              ].map((f, i) => (
                <div className="fact it-reveal" key={i}><div className="ff">{f.ff}</div><div className="fl">{f.fl}</div></div>
              ))}
            </div>
            <div className="facts-row-2">
              {[
                { ff: 'Parliamentary', fl: 'Republic, multi-party government' },
                { ff: 'CET', fl: 'Central European time zone' },
                { ff: 'Mediterranean', fl: 'Diverse Alpine-to-coastal climate' },
                { ff: 'Universal', fl: 'Public healthcare coverage (SSN)' },
              ].map((f, i) => (
                <div className="fact it-reveal" key={i}><div className="ff">{f.ff}</div><div className="fl">{f.fl}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY ITALY */}
        <section className="block why">
          <div className="container">
            <div className="section-head it-reveal">
              <span className="eyebrow center">Why Remote Professionals Choose Italy</span>
              <h2>The reasons people relocate — and the reasons they stay</h2>
              <p>Beyond the residence permit itself, Italy offers a quality of life that holds up to scrutiny long after the paperwork is signed.</p>
            </div>
            <div className="why-grid">
              {[
                { ic: '★', t: 'EU member-state residence', p: 'A residence permit in a founding European Union country, with the right to live in Italy and travel visa-free across the Schengen Area.' },
                { ic: '⏚', t: 'Safety and stability', p: 'Consistently ranked among the safer nations globally, with stable institutions, the rule of law and low rates of violent crime.' },
                { ic: '❋', t: 'Mediterranean lifestyle', p: 'Coastline, mountains, celebrated cuisine and a slower daily rhythm that draws remote professionals and families alike.' },
                { ic: '✎', t: 'International schooling', p: 'Established international and bilingual schools in Rome, Milan, Florence and the major coastal cities serve relocating families.' },
                { ic: '✚', t: 'Healthcare access', p: 'Access to Italy\u2019s national health service alongside a well-regarded private sector and English-speaking practitioners in larger cities.' },
                { ic: '⌖', t: 'Global connectivity', p: 'Direct flights from Rome, Milan and Venice across Europe, the Americas, Africa and the Middle East keep family and business within reach.' },
              ].map((c, i) => (
                <div className="why-card it-reveal" key={i}><div className="ic">{c.ic}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        <div className="meander" aria-hidden="true"></div>

        {/* PROGRAMME OVERVIEW */}
        <section className="block prog" id="programme">
          <div className="container">
            <div className="section-head it-reveal">
              <span className="eyebrow center" style={{ color: 'var(--gold-soft)' }}>The Programme</span>
              <h2>The Italy Digital Nomad Visa, explained clearly</h2>
              <p>A residence route built around remote employment rather than investment — accessible, regulated and genuinely lived-in.</p>
            </div>
            <div className="prog-grid">
              {[
                { no: '01 · DEFINITION', t: 'What is the Nomad Visa?', p: 'A national long-stay visa for non-EU/EEA/Swiss nationals carrying out highly skilled remote work for an employer or clients based outside Italy. Formalised by a 2024 decree, it grants the right to reside in Italy.' },
                { no: '02 · ELIGIBILITY', t: 'Who it is designed for', p: 'Employees of foreign companies and self-employed freelancers with at least six months of recent remote-work experience, a recognised qualification or comparable professional track record, and income from outside Italy.' },
                { no: '03 · LEGAL BASIS', t: 'Where it comes from', p: 'Introduced through amendments to Italy\u2019s consolidated immigration framework and given practical effect by an implementing decree that took effect in April 2024.' },
                { no: '04 · STRUCTURE', t: 'The residence permit', p: 'The consular visa allows entry to Italy, where the holder applies for a residence permit within eight days of arrival. The first permit is typically issued for up to one year.' },
                { no: '05 · RENEWAL', t: 'Renewal cycle', p: 'The initial permit may be extended for a further two years, and renewed again thereafter, provided the holder still meets the income, remote-work and residence conditions.' },
                { no: '06 · PATHWAY', t: 'Long-term pathway', p: 'After five years of lawful residence, holders may become eligible for permanent residence — and, on a longer horizon, for citizenship under the conditions set by Italian nationality law.' },
              ].map((c, i) => (
                <div className="prog-card it-reveal" key={i}><div className="no">{c.no}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="block benefits">
          <div className="container">
            <div className="section-head it-reveal">
              <span className="eyebrow center">Key Benefits</span>
              <h2>What the residence permit makes possible</h2>
              <p>The advantages of the programme extend across daily life, family and the long-term horizon.</p>
            </div>
            <div className="ben-grid">
              {[
                { mk: 'I', t: 'Residence in Italy', p: 'The legal right to live in Italy as a founding EU member state, with a recognised residence card for you and your family.' },
                { mk: 'II', t: 'Family reunification', p: 'The possibility to include a spouse in a registered marriage, children under 18 and, in defined cases, financially dependent parents.' },
                { mk: 'III', t: 'Schengen mobility', p: 'As an Italian residence-permit holder, the ability to travel visa-free for up to 90 days in any 180-day period across the Schengen Area.' },
                { mk: 'IV', t: 'Education access', p: 'Access for the family to Italy\u2019s public, private and international education options, from primary school through university.' },
                { mk: 'V', t: 'Healthcare access', p: 'Eligibility to register with Italy\u2019s national health service, complemented by a strong private healthcare sector.' },
                { mk: 'VI', t: 'Route to permanence', p: 'A pathway toward permanent residence after five years, and potential citizenship eligibility subject to the legal requirements in force at the time.' },
              ].map((c, i) => (
                <div className="ben-card it-reveal" key={i}><div className="mk">{c.mk}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* FINANCIAL REQUIREMENTS */}
        <section className="block finance" id="finance">
          <div className="container">
            <div className="section-head it-reveal">
              <span className="eyebrow center">Financial Requirements</span>
              <h2>What you need to demonstrate</h2>
              <p>The Nomad Visa is built on proof of stable remote income rather than a lump-sum investment. The figures below reflect the general 2026 benchmark; consulates may apply minor variations.</p>
            </div>

            <div className="fin-table it-reveal">
              <div className="fin-row head">
                <div className="fc">Requirement</div>
                <div className="fc">Indicative threshold</div>
                <div className="fc">Notes</div>
              </div>
              {[
                { label: 'Main applicant — annual income', amount: '€32,400+', note: '≈€2,700/month', total: false },
                { label: 'Demonstrable savings', amount: '€30,000+', note: 'Per main applicant', total: false },
                { label: 'Each additional family member', amount: '+€10,000', note: 'Added to savings requirement', total: false },
                { label: 'Remote-work experience required', amount: '6+ months', note: 'Recent, verifiable', total: true },
              ].map((r, i) => (
                <div className={`fin-row${r.total ? ' total' : ''}`} key={i}>
                  <div className="fc label">{r.label}</div>
                  <div className="fc fig">{r.amount}</div>
                  <div className="fc fig">{r.note}</div>
                </div>
              ))}
            </div>
            <p className="fin-note">Figures are indicative for 2026 and may vary slightly between consulates. Requirements may be updated by Italian authorities and should be verified during the application process. This is general information, not legal or financial advice.</p>

            <div className="fin-extra">
              {[
                { t: 'Proof of remote income', p: 'Employment contract or client agreements, salary certificates or invoices, and recent bank statements showing income from outside Italy.' },
                { t: 'Qualification or experience', p: 'A relevant degree, professional qualification, or several years of demonstrable experience in a highly skilled remote occupation.' },
                { t: 'Accommodation', p: 'A rental agreement or property purchase in Italy establishing a registered address. There is no fixed minimum property value or rent.' },
              ].map((x, i) => (
                <div className="fin-x it-reveal" key={i}><h4>{x.t}</h4><p>{x.p}</p></div>
              ))}
            </div>

            <div className="fin-extra" style={{ marginTop: 22 }}>
              {[
                { t: 'Valid passport & documents', p: 'A passport valid well beyond the intended stay, biometric photographs and the certified, translated documents your file requires.' },
                { t: 'Clean criminal record', p: 'A recent criminal record certificate from your country of nationality and anywhere you have lived long-term, confirming good standing.' },
                { t: 'Health insurance & compliance', p: 'Valid health insurance covering your stay in Italy, plus full compliance with Italy\u2019s immigration requirements throughout the process.' },
              ].map((x, i) => (
                <div className="fin-x it-reveal" key={i}><h4>{x.t}</h4><p>{x.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* FAMILY */}
        <section className="block family">
          <div className="container">
            <div className="fam-grid">
              <div className="fam-media it-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=1200" alt="A family walking together along a sunlit Italian street" />
              </div>
              <div className="it-reveal">
                <span className="eyebrow">Eligible Applicants &amp; Family</span>
                <h2 style={{ fontSize: 'clamp(30px,4vw,48px)', marginBottom: 26 }}>One application, your family included</h2>
                <ul className="fam-list">
                  {[
                    { fi: '①', t: 'Main applicant', p: 'A non-EU/EEA/Swiss national aged 18+ meeting the income, remote-work, accommodation and good-character requirements.' },
                    { fi: '②', t: 'Spouse', p: 'A spouse in an officially registered marriage, included through family reunification with an additional savings requirement.' },
                    { fi: '③', t: 'Children under 18', p: 'Minor children, typically expected to be enrolled in education in Italy once resident.' },
                    { fi: '④', t: 'Dependent parents', p: 'Parents who are financially dependent on the main applicant may be included, subject to assessment.' },
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
            <div className="section-head it-reveal">
              <span className="eyebrow center" style={{ color: 'var(--gold-soft)' }}>The Application Journey</span>
              <h2>A guided, six-stage process</h2>
              <p>Langma International coordinates each stage and introduces licensed Italian legal professionals where local representation is required.</p>
            </div>
            <div className="timeline">
              {[
                { d: '01', t: 'Eligibility assessment', p: 'A confidential review of your remote work, income, family composition and objectives to confirm the Nomad Visa is the right route — and to map the documentation ahead.' },
                { d: '02', t: 'Documentation preparation', p: 'Securing your employment or client evidence, arranging accommodation in Italy, health insurance and the certified, translated documents your file requires.' },
                { d: '03', t: 'Consular visa application', p: 'Filing the national D visa application at the competent Italian consulate, with a complete and consistent evidence pack to support a smooth review.' },
                { d: '04', t: 'Visa decision', p: 'Consular assessment, with the full visa stage typically taking up to roughly three months. Once approved, the entry visa allows you to travel to Italy.' },
                { d: '05', t: 'Residence permit application', p: 'Applying for your Italian residence permit and submitting biometrics within eight days of arrival, as required by law.' },
                { d: '06', t: 'Long-term residency planning', p: 'Guidance on renewals, the genuine-residence requirements and your longer pathway toward permanent residence and, in time, naturalisation.' },
              ].map((s, i) => (
                <div className="tl-item it-reveal" key={i}>
                  <div className="dot">{s.d}</div>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="meander" aria-hidden="true"></div>

        {/* LIFE IN ITALY */}
        <section className="block life">
          <div className="container">
            <div className="section-head it-reveal">
              <span className="eyebrow center">Life in Italy</span>
              <h2>Where will your family put down roots?</h2>
              <p>From a fashion-forward northern hub to a Renaissance city and a lagoon unlike anywhere else, Italy offers distinct settings for distinct lives.</p>
            </div>
            <div className="life-grid">
              {[
                { img: 'https://images.unsplash.com/photo-1572552635104-376e7903b9b2?q=80&w=1200', alt: "Milan's Duomo cathedral and modern skyline", t: 'Milan', p: 'Italy\u2019s commercial and design capital, with a fast-growing start-up scene and strong international business community.' },
                { img: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?q=80&w=1200', alt: "Florence's terracotta rooftops and the Duomo at sunset", t: 'Florence', p: 'A Renaissance city of art, architecture and an established community of relocating professionals and creatives.' },
                { img: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1200', alt: 'Venice canals lined with historic buildings and gondolas', t: 'Venice', p: 'A singular lagoon city of canals, history and a famously slower, more deliberate way of life.' },
              ].map((c, i) => (
                <div className="life-card it-reveal" key={i}>
                  <img src={c.img} alt={c.alt} />
                  <div className="ov"></div>
                  <div className="cap"><h3>{c.t}</h3><p>{c.p}</p></div>
                </div>
              ))}
            </div>
            <div className="life-strip">
              {['Mediterranean climate', 'Celebrated cuisine', 'Safe, walkable cities', 'Strong coworking culture', 'UNESCO heritage sites', 'Reliable fibre internet'].map((tag, i) => (
                <span className="life-tag it-reveal" key={i}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* WHY LANGMA */}
        <section className="block langma">
          <div className="container">
            <div className="langma-grid">
              <div className="it-reveal">
                <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>Why Langma International</span>
                <h2>A trusted partner for a process that deserves care</h2>
                <p className="lead">We help individuals and families access European residency through transparent guidance, strategic planning and genuinely personalised support — never overpromising, never guaranteeing outcomes we cannot control.</p>
                <p className="lead">From the first conversation to your residence card, you work with people who understand both the regulation and the human reality of relocating a life and a career.</p>
              </div>
              <div className="lg-list it-reveal">
                {[
                  { t: 'Global mobility expertise', p: 'Cross-border residency experience spanning Europe and beyond, applied to your specific circumstances.' },
                  { t: 'Personalised consultation', p: 'A considered assessment of your goals, work arrangement, family and finances — not a templated checklist.' },
                  { t: 'Documentation support', p: 'Hands-on help assembling, certifying and sequencing the paperwork that makes or breaks a file.' },
                  { t: 'Application guidance', p: 'Coordination through every official stage, with licensed Italian legal professionals where required.' },
                  { t: 'International network', p: 'Trusted partners on the ground — legal, banking and property — to keep your relocation moving.' },
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
            <div className="section-head it-reveal">
              <span className="eyebrow center">Frequently Asked Questions</span>
              <h2>Clear answers, accurately stated</h2>
            </div>
            <div className="faq-wrap">
              {[
                { q: 'What is the Italy Digital Nomad Visa?', a: 'It is a long-stay national D visa for non-EU/EEA/Swiss nationals who perform highly skilled remote work for an employer or clients based outside Italy. Formalised through a 2024 implementing decree, it leads to an Italian residence permit for the applicant and qualifying family members.' },
                { q: 'Who can apply?', a: 'Applicants must be non-EU/EEA/Swiss nationals over 18, with at least six months of recent remote-work experience, a recognised qualification or comparable track record, a clean criminal record, valid health insurance and a registered address in Italy. The work itself must be performed for a foreign employer or for clients based outside Italian territory.' },
                { q: 'How much income is required?', a: 'The general benchmark applied by consulates is an annual income of approximately €32,400 (around €2,700 per month) from work performed outside Italy, alongside demonstrable savings of roughly €30,000. Requirements can vary slightly by consulate and are subject to change, so figures should always be confirmed at the time of application.' },
                { q: 'Is the visa for employees, freelancers, or both?', a: 'Both. The route covers employees of companies based outside Italy as well as self-employed freelancers and contractors serving clients outside Italian territory, provided the income and experience thresholds are met.' },
                { q: 'Can family members apply with me?', a: 'Yes. A spouse in a registered marriage, children under 18 enrolled in education in Italy, and financially dependent parents may be included through family reunification, with additional savings typically required for each added family member.' },
                { q: 'How long is the residence permit valid?', a: 'The initial residence permit is issued for up to one year, with the possibility of extension for a further two years, and renewal beyond that for as long as the holder continues to meet the income, remote-work and residence conditions.' },
                { q: 'Can the visa lead to permanent residence?', a: 'Yes. After five years of lawful, continuous residence in Italy, holders may become eligible to apply for permanent residence, provided they have not exceeded permitted absences from the country and continue to satisfy the applicable statutory conditions.' },
                { q: 'Can holders apply for Italian citizenship?', a: 'It is possible on a longer timeline. Permanent residence is generally available after five years, and naturalisation by residence becomes possible after a further five years holding that status — commonly around ten years overall — subject to meeting Italian language requirements (typically B1 level) and other statutory conditions in force at the time.' },
                { q: 'How long does the process take?', a: 'The full journey commonly spans around four months or more from preliminary eligibility review to a confirmed entry visa, with the consular visa stage typically taking up to roughly three months and residence-permit issuance in Italy a further one to two months once biometrics are submitted.' },
                { q: 'Do I need to actually live in Italy?', a: "Genuine residence is expected. To renew the permit, holders are generally required to demonstrate they have spent more than 183 days of the year in Italy, reflecting the programme's design for those who intend to actually live there rather than hold the document at a distance." },
                { q: 'Does the visa provide Schengen travel access?', a: 'Yes. As the holder of an Italian residence permit, you may travel visa-free for short stays of up to 90 days within any 180-day period across the rest of the Schengen Area, while maintaining your primary residence in Italy.' },
                { q: 'Do I need to buy property in Italy?', a: 'No. A long-term rental agreement is generally sufficient to establish a registered address; purchasing property is optional and there is no fixed minimum property value attached to the visa itself.' },
                { q: 'What happens if I leave my job during the permit period?', a: 'Continued eligibility depends on maintaining qualifying remote work and income from outside Italy. A material change in your employment or client arrangements should be reviewed promptly against the conditions attached to your specific permit.' },
                { q: 'Is there a special tax regime for digital nomads?', a: 'Currently, digital nomads are generally taxed under Italy\u2019s standard progressive system once they become tax resident, with rates ranging broadly from 24% to 43% depending on income. There is no dedicated digital-nomad tax incentive in force as of 2026, though tax treatment should always be reviewed with a qualified adviser before relocating.' },
                { q: 'When does Italy consider me a tax resident?', a: 'As a general rule, spending 183 days or more in Italy within a calendar year is likely to trigger Italian tax residence, which can bring worldwide income within scope. This is an area where independent tax advice is essential before and after relocating.' },
                { q: 'Is the Digital Nomad Visa quota-limited?', a: 'No annual quota currently applies to the route; eligible applications are processed on an ongoing basis, though processing times can still vary by consulate and case volume.' },
                { q: 'What is the difference between this visa and the Italy Elective Residence Visa?', a: 'The Elective Residence route is built around passive, unearned income such as pensions or investment returns, while the Digital Nomad Visa is specifically for those who continue actively performing remote work for foreign employers or clients.' },
              ].map((faq, i) => (
                <div className={`faq-item it-reveal ${openFaq === i ? 'open' : ''}`} key={i}>
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
              <div className="lead-copy it-reveal">
                <span className="eyebrow">Begin Your Journey</span>
                <h2>Begin your Italy residency journey with expert guidance</h2>
                <p>Share a few details and a Langma International advisor will arrange a confidential consultation to assess your eligibility and outline a realistic path forward — with no obligation.</p>
                <ul className="lead-assure">
                  {[
                    'Strictly confidential, no-obligation review',
                    'Honest assessment of your eligibility',
                    'Clear timelines and transparent guidance',
                    'Introductions to licensed Italian professionals',
                  ].map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
              <div className="form-card it-reveal">
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
                    <label htmlFor="income">Type of remote work</label>
                    <select id="income" defaultValue="">
                      <option value="">Please select</option>
                      <option>Employee of a foreign company</option>
                      <option>Self-employed / freelancer</option>
                      <option>Business owner working remotely</option>
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

        {/* OFFICE VISIT */}
        <section className="block office" id="office-visit">
          <div className="container">
            <div className="office-grid">
              <div className="office-copy it-reveal">
                <span className="eyebrow">In Person</span>
                <h2>Schedule a private office consultation</h2>
                <p>Prefer to meet face to face? Sit down with our advisory team to talk through your eligibility and residency options in confidence.</p>
                <ul className="office-points">
                  {[
                    { oi: '✦', t: 'Meet our advisory team', p: 'A direct conversation with the people who will guide your case.' },
                    { oi: '✓', t: 'Discuss your eligibility', p: 'An honest review of your remote work, income, family and timeline.' },
                    { oi: '↪', t: 'Understand your options', p: 'Compare the Nomad Visa with other Italian residence routes where relevant.' },
                  ].map((item, i) => (
                    <li key={i}>
                      <span className="oi">{item.oi}</span>
                      <div><h4>{item.t}</h4><p>{item.p}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="office-form it-reveal">
                <h3>Book your visit</h3>
                <form onSubmit={handleOfficeSubmit} noValidate>
                  <div className="field"><label htmlFor="ov-name">Full name</label><input type="text" id="ov-name" required /></div>
                  <div className="frow">
                    <div className="field"><label htmlFor="ov-phone">Phone</label><input type="tel" id="ov-phone" placeholder="+ Country code" required /></div>
                    <div className="field"><label htmlFor="ov-email">Email</label><input type="email" id="ov-email" required /></div>
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

export default ItalyDNVPage;