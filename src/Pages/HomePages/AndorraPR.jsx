import React, { useState, useEffect } from 'react';
import { useResidencyLeadForms } from '../../hooks/useResidencyLeadForms';

const SERVICE = 'Andorra Passive Residence Programme';

const AndorraPRPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadSubmitted, officeSubmitted,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Andorra Residency Consultation' });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });
    document.querySelectorAll('.an-reveal').forEach((el) => observer.observe(el));
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="an-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        .an-page * { margin:0; padding:0; box-sizing:border-box; }
        .an-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; color:#296166; background:#F5F8F6; line-height:1.7; font-weight:400; -webkit-font-smoothing:antialiased; overflow-x:hidden; }
        .an-page h1,.an-page h2,.an-page h3,.an-page h4 { font-family:'Cormorant Garamond',Georgia,serif; font-weight:600; color:#296166; line-height:1.12; letter-spacing:0.2px; }
        .an-page img { display:block; width:100%; height:100%; object-fit:cover; }
        .an-page .container { max-width:1200px; margin:0 auto; padding:0 30px; }
        .an-page .block { padding:108px 0; }
        .an-page .site-header { position:fixed; top:0; left:0; right:0; z-index:1000; padding:22px 0; transition:all .4s cubic-bezier(.22,.61,.36,1); }
        .an-page .site-header.scrolled { background:rgba(26,37,64,0.94); backdrop-filter:blur(10px); padding:14px 0; box-shadow:0 6px 30px rgba(0,0,0,.25); }
        .an-page .nav-wrap { display:flex; align-items:center; justify-content:space-between; }
        .an-page .brand { display:flex; flex-direction:column; line-height:1; text-decoration:none; }
        .an-page .brand .name { font-family:'Cormorant Garamond',serif; font-size:25px; font-weight:600; color:#F5F8F6; letter-spacing:1px; }
        .an-page .brand .tag { font-family:'Inter',sans-serif; font-size:9.5px; letter-spacing:3.5px; text-transform:uppercase; color:#6FE0C6; margin-top:4px; }
        .an-page .nav-links { display:flex; align-items:center; gap:34px; }
        .an-page .nav-links a { font-size:13.5px; font-weight:500; color:rgba(247,250,252,.85); letter-spacing:.3px; transition:color .25s; text-decoration:none; }
        .an-page .nav-links a:hover { color:#6FE0C6; }
        .an-page .nav-cta { padding:11px 24px!important; font-size:13px; background:#6FE0C6; color:#296166!important; border-radius:4px; font-weight:600; transition:all .3s; }
        .an-page .nav-cta:hover { background:#6FE0C6; }
        .an-page .burger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; }
        .an-page .burger span { width:24px; height:2px; background:#F5F8F6; display:block; }
        .an-page .eyebrow { font-family:'Inter',sans-serif; text-transform:uppercase; letter-spacing:3.5px; font-size:11.5px; color:#6FE0C6; font-weight:600; margin-bottom:18px; display:flex; align-items:center; gap:12px; }
        .an-page .eyebrow::before { content:""; width:34px; height:1px; background:#6FE0C6; display:inline-block; flex-shrink:0; }
        .an-page .eyebrow.center { justify-content:center; }
        .an-page .eyebrow.light { color:#6FE0C6; }
        .an-page .eyebrow.light::before { background:#6FE0C6; }
        .an-page .section-head { max-width:760px; margin:0 auto 60px; text-align:center; }
        .an-page .section-head .eyebrow { justify-content:center; }
        .an-page .section-head h2 { font-size:clamp(34px,4.6vw,54px); margin-bottom:18px; }
        .an-page .section-head p { color:#296166; font-size:17px; }
        .an-page .section-head.light h2 { color:#F5F8F6; }
        .an-page .section-head.light p { color:rgba(247,250,252,0.72); }
        .an-page .btn { display:inline-flex; align-items:center; gap:10px; font-family:'Inter',sans-serif; font-size:14px; font-weight:600; letter-spacing:0.4px; padding:16px 32px; border-radius:4px; cursor:pointer; border:1px solid transparent; transition:all .35s cubic-bezier(.22,.61,.36,1); text-decoration:none; }
        .an-page .btn-primary { background:#6FE0C6; color:#296166; }
        .an-page .btn-primary:hover { background:#6FE0C6; transform:translateY(-2px); box-shadow:0 14px 30px rgba(47,199,161,.28); }
        .an-page .btn-ghost { background:transparent; color:#1A2540; border:2px solid #2FC7A1; }
        .an-page .btn-ghost:hover { border-color:#6FE0C6; color:#6FE0C6; }
        .an-page .btn-dark { background:#1A2540; color:#F5F8F6; }
        .an-page .btn-dark:hover { background:#296166; transform:translateY(-2px); }
        .an-page .tile-divider { height:18px; width:100%; background: radial-gradient(circle at 10px 9px, #6FE0C6 0 2px, transparent 2.5px), radial-gradient(circle at 0 0, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px), radial-gradient(circle at 20px 0, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px), radial-gradient(circle at 0 18px, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px), radial-gradient(circle at 20px 18px, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px); background-size:20px 18px; background-repeat:repeat-x; background-position:left center; background-color:#1A2540; display:block; overflow:hidden; opacity:.92; }
        .an-page .hero { position:relative; min-height:auto; display:flex; align-items:center; color:#1B2B28; overflow:hidden; background:#FFFFFF;padding:96px 0 70px; }
        .an-page .hero::before { content:""; position:absolute; inset:0; background-image: radial-gradient(circle at 20% 50%, rgba(47,199,161,0.09) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(47,199,161,0.06) 0%, transparent 40%); z-index:0; pointer-events:none; }
        .an-page .hero-split { position:relative; z-index:2; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; padding-top:110px; padding-bottom:70px; }
        .an-page .hero-copy { display:flex; flex-direction:column; }
        .an-page .hero h1 { font-size:clamp(38px,5vw,68px); color:#1B2B28; margin-bottom:26px; font-weight:600; line-height:1.08; }
        .an-page .hero h1 em { font-style:italic; color:#4FA3D1; font-weight:500; }
        .an-page .hero .lead { font-size:17.5px; color:#4C5C58; max-width:560px; margin-bottom:38px; font-weight:300; line-height:1.72; }
        .an-page .hero-cta { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:48px; }
        .an-page .hero-badges { display:flex; gap:36px; flex-wrap:wrap; border-top:1px solid #D8E0EC; padding-top:28px; }
        .an-page .hero-badge .num { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; line-height:1; }
        .an-page .hero-badge .lbl { font-size:11.5px; letter-spacing:.6px; color:#7E8C88; margin-top:6px; }
        .an-page .hero-visual { display:flex; align-items:center; justify-content:center; position:relative; }
        .an-page .hero-img-frame { position:relative; width:100%; max-width:520px; border-radius:12px; overflow:hidden; box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22); }
        .an-page .hero-img-frame img { display:block; width:100%; height:480px; object-fit:cover; border-radius:12px; transition:transform .9s cubic-bezier(.22,.61,.36,1); }
        .an-page .hero-img-frame:hover img { transform:scale(1.04); }
        .an-page .hero-img-frame::after { content:""; position:absolute; inset:12px; border:1px solid rgba(47,199,161,.38); border-radius:8px; pointer-events:none; z-index:2; }
        .an-page .hero-img-frame::before { content:""; position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.42) 0%,transparent 55%); z-index:1; border-radius:12px; pointer-events:none; }
        .an-page .hero-visual::before { content:""; position:absolute; top:24px; right:-14px; width:100%; max-width:520px; height:100%; border:1px solid rgba(47,199,161,.18); border-radius:12px; pointer-events:none; }
        .an-page .hero-img-badge { position:absolute; bottom:22px; left:22px; z-index:3; background:rgba(26,37,64,.82); backdrop-filter:blur(8px); border:1px solid rgba(47,199,161,.30); border-radius:6px; padding:10px 16px; display:flex; align-items:center; gap:10px; }
        .an-page .dot-pulse { width:8px; height:8px; border-radius:50%; background:#6FE0C6; box-shadow:0 0 0 0 rgba(47,199,161,.6); animation:an-pulse 2s infinite; flex-shrink:0; }
        @keyframes an-pulse { 0% { box-shadow:0 0 0 0 rgba(47,199,161,.55); } 70% { box-shadow:0 0 0 9px rgba(47,199,161,0); } 100% { box-shadow:0 0 0 0 rgba(47,199,161,0); } }
        .an-page .hero-img-badge span:last-child { font-size:12px; color:#F5F8F6; }
        .an-page .scroll-hint { position:absolute; bottom:32px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:10px; color:#7E8C88; font-size:10.5px; letter-spacing:2.5px; text-transform:uppercase; z-index:3; }
        .an-page .scroll-hint .line { width:1px; height:38px; background:linear-gradient(#6FE0C6,transparent); animation:an-drop 2s cubic-bezier(.22,.61,.36,1) infinite; }
        @keyframes an-drop { 0% { transform:scaleY(0); transform-origin:top; } 50% { transform:scaleY(1); transform-origin:top; } 51% { transform-origin:bottom; } 100% { transform:scaleY(0); transform-origin:bottom; } }
        .an-page .stats-bar { background:#1A2540; color:#F5F8F6; }
        .an-page .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .an-page .stat-cell { padding:52px 30px; text-align:center; border-right:1px solid rgba(247,250,252,.10); }
        .an-page .stat-cell:last-child { border-right:none; }
        .an-page .stat-cell .v { font-family:'Cormorant Garamond',serif; font-size:46px; font-weight:600; color:#6FE0C6; line-height:1; margin-bottom:12px; }
        .an-page .stat-cell .k { font-size:13px; letter-spacing:.5px; color:rgba(247,250,252,.78); }
        .an-page .about { background:#F5F8F6; }
        .an-page .about-grid { display:grid; grid-template-columns:1.05fr 1fr; gap:64px; align-items:center; }
        .an-page .about-copy h2 { font-size:clamp(32px,4.4vw,52px); margin-bottom:22px; }
        .an-page .about-copy .about-lead { font-family:'Cormorant Garamond',serif; font-size:23px; line-height:1.4; color:#296166; margin-bottom:18px; font-weight:500; }
        .an-page .about-copy p { color:#296166; margin-bottom:18px; font-size:16.5px; }
        .an-page .about-media { position:relative; height:560px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .an-page .about-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .an-page .facts-row { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-top:54px; }
        .an-page .fact { background:#fff; border:1px solid rgba(47,199,161,.25); border-radius:4px; padding:26px 22px; text-align:center; }
        .an-page .fact .ff { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; }
        .an-page .fact .fl { font-size:12.5px; color:#296166; letter-spacing:.4px; margin-top:6px; }
        .an-page .pillars { background:#E9F1EE; }
        .an-page .pillars-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#296166; border:1px solid #296166; border-radius:4px; overflow:hidden; }
        .an-page .pillar-card { background:#F5F8F6; padding:42px 34px; transition:background .3s; }
        .an-page .pillar-card:hover { background:#fff; }
        .an-page .pillar-card .ic { width:46px; height:46px; border:1px solid #6FE0C6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#296166; font-family:'Cormorant Garamond',serif; font-size:21px; margin-bottom:20px; }
        .an-page .pillar-card h3 { font-size:24px; margin-bottom:10px; }
        .an-page .pillar-card p { color:#296166; font-size:15px; }
        .an-page .why { background:#F5F8F6; }
        .an-page .reasons-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .an-page .reasons-media { position:relative; height:560px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .an-page .reasons-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .an-page .reasons-list { list-style:none; }
        .an-page .reasons-list li { display:flex; gap:18px; padding:22px 0; border-bottom:1px solid #E5E5E5; }
        .an-page .reasons-list li:last-child { border-bottom:none; }
        .an-page .reasons-list .ri { flex:0 0 44px; height:44px; border-radius:50%; background:#1A2540; color:#6FE0C6; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:20px; }
        .an-page .reasons-list h4 { font-size:22px; margin-bottom:4px; }
        .an-page .reasons-list p { color:#296166; font-size:14.5px; }
        .an-page .about-transition { margin-top:54px; background:#1A2540; color:#F5F8F6; border-radius:4px; padding:40px 44px; display:flex; align-items:center; justify-content:space-between; gap:30px; flex-wrap:wrap; }
        .an-page .about-transition h3 { color:#F5F8F6; font-size:26px; margin-bottom:8px; }
        .an-page .about-transition p { color:rgba(247,250,252,.74); font-size:15px; max-width:680px; }
        .an-page .prog { background:#1A2540; color:#F5F8F6; }
        .an-page .prog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .an-page .prog-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:4px; padding:38px 32px; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .an-page .prog-card:hover { border-color:#6FE0C6; transform:translateY(-6px); }
        .an-page .prog-card .no { font-family:'Cormorant Garamond',serif; font-size:18px; color:#6FE0C6; border-bottom:1px solid rgba(247,250,252,.16); padding-bottom:14px; margin-bottom:18px; letter-spacing:1.5px; text-transform:uppercase; }
        .an-page .prog-card h3 { color:#F5F8F6; font-size:25px; margin-bottom:12px; }
        .an-page .prog-card p { color:rgba(247,250,252,.74); font-size:15px; }
        .an-page .benefits { background:#F5F8F6; }
        .an-page .ben-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .an-page .ben-card { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:36px 30px; position:relative; overflow:hidden; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .an-page .ben-card::before { content:""; position:absolute; top:0; left:0; width:3px; height:0; background:#6FE0C6; transition:height .4s cubic-bezier(.22,.61,.36,1); }
        .an-page .ben-card:hover { box-shadow:0 18px 50px rgba(26,37,64,.08); transform:translateY(-4px); }
        .an-page .ben-card:hover::before { height:100%; }
        .an-page .ben-card .mk { font-family:'Cormorant Garamond',serif; font-size:22px; color:#296166; letter-spacing:1px; margin-bottom:16px; }
        .an-page .ben-card h3 { font-size:23px; margin-bottom:10px; }
        .an-page .ben-card p { color:#296166; font-size:15px; }
        /* ELIGIBILITY — ADDED elig-grid/elig-item from HTML */
        .an-page .eligibility { background:#E9F1EE; }
        .an-page .elig-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:22px; max-width:960px; margin:0 auto; }
        .an-page .elig-item { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:28px; display:flex; align-items:flex-start; gap:18px; position:relative; overflow:hidden; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .an-page .elig-item::before { content:""; position:absolute; top:0; left:0; width:3px; height:0; background:#6FE0C6; transition:height .4s cubic-bezier(.22,.61,.36,1); }
        .an-page .elig-item:hover { box-shadow:0 18px 50px rgba(26,37,64,.08); transform:translateY(-3px); }
        .an-page .elig-item:hover::before { height:100%; }
        .an-page .elig-item .ei { flex:0 0 42px; height:42px; border-radius:50%; background:#1A2540; color:#6FE0C6; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:600; }
        .an-page .elig-item h4 { font-size:18px; margin-bottom:6px; color:#296166; }
        .an-page .elig-item p { color:#296166; font-size:14.5px; }
        .an-page .investment { background:#E9F1EE; }
        .an-page .inv-section-title { font-size:27px; margin:18px 0 18px; color:#296166; }
        .an-page .inv-section-title:not(:first-of-type) { margin-top:48px; }
        .an-page .fin-table { background:#fff; border:1px solid rgba(47,199,161,.25); border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(26,37,64,.08); margin-bottom:24px; }
        .an-page .fin-row { display:grid; grid-template-columns:1.4fr 1fr 1.3fr; align-items:start; border-bottom:1px solid #E5E5E5; }
        .an-page .fin-row:last-child { border-bottom:none; }
        .an-page .fin-row.head { background:#1A2540; color:#F5F8F6; }
        .an-page .fin-row.head .fc { padding:22px 28px; font-family:'Inter',sans-serif; font-size:13px; letter-spacing:.6px; text-transform:uppercase; color:rgba(247,250,252,.8); }
        .an-page .fc { padding:22px 28px; font-size:15.5px; }
        .an-page .fc.label { font-weight:600; color:#296166; }
        .an-page .fc.label small { display:block; font-weight:400; color:#296166; font-size:13px; margin-top:4px; }
        .an-page .fc.fig { font-family:'Cormorant Garamond',serif; font-size:24px; color:#296166; font-weight:600; }
        .an-page .fc.fig small { display:block; font-family:'Inter',sans-serif; font-size:12.5px; color:#296166; font-weight:400; margin-top:4px; }
        .an-page .fc.note { font-size:14px; color:#296166; }
        .an-page .fin-option-2 { background:#fff; border:1px solid rgba(47,199,161,.25); border-radius:4px; padding:34px 36px; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .an-page .fin-option-2 > p { color:#296166; font-size:15.5px; margin-bottom:16px; }
        .an-page .fin-option-list { list-style:none; margin-bottom:18px; }
        .an-page .fin-option-list li { padding:11px 0; padding-left:26px; position:relative; color:#296166; font-size:15.5px; border-bottom:1px solid #EFEFEF; }
        .an-page .fin-option-list li:last-child { border-bottom:none; }
        .an-page .fin-option-list li::before { content:"◆"; position:absolute; left:0; color:#6FE0C6; font-size:12px; top:13px; }
        .an-page .fin-option-note { color:#296166; font-size:14.5px; font-style:italic; }
        .an-page .fin-note { margin-top:24px; font-size:13.5px; color:#296166; text-align:center; font-style:italic; }
        .an-page .family-sec { background:#F5F8F6; }
        .an-page .fam-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .an-page .fam-media { height:520px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); position:relative; }
        .an-page .fam-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .an-page .fam-list { list-style:none; }
        .an-page .fam-list li { display:flex; gap:18px; padding:22px 0; border-bottom:1px solid #E5E5E5; }
        .an-page .fam-list li:last-child { border-bottom:none; }
        .an-page .fam-list .fi { flex:0 0 42px; height:42px; border-radius:50%; background:#1A2540; color:#6FE0C6; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:19px; }
        .an-page .fam-list h4 { font-size:21px; margin-bottom:2px; }
        .an-page .fam-list p { color:#296166; font-size:14.5px; }
        .an-page .process { background:#1A2540; color:#F5F8F6; }
        .an-page .timeline { position:relative; max-width:880px; margin:0 auto; }
        .an-page .timeline::before { content:""; position:absolute; left:31px; top:8px; bottom:8px; width:1px; background:rgba(247,250,252,.18); }
        .an-page .tl-item { position:relative; padding-left:92px; padding-bottom:44px; }
        .an-page .tl-item:last-child { padding-bottom:0; }
        .an-page .tl-item .dot { position:absolute; left:0; top:0; width:64px; height:64px; border-radius:50%; border:1px solid #6FE0C6; background:#1A2540; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:24px; color:#6FE0C6; }
        .an-page .tl-item h3 { color:#F5F8F6; font-size:22px; margin-bottom:6px; }
        .an-page .tl-item p { color:rgba(247,250,252,.72); font-size:15px; max-width:620px; }
        .an-page .tl-time { display:inline-block; margin-top:10px; font-family:'Inter',sans-serif; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#6FE0C6; font-weight:600; }
        .an-page .documents { background:#F5F8F6; }
        .an-page .doc-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; max-width:960px; margin:0 auto; }
        .an-page .doc-item { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:20px 24px; display:flex; align-items:center; gap:16px; font-size:15px; color:#296166; transition:all .3s cubic-bezier(.22,.61,.36,1); }
        .an-page .doc-item:hover { box-shadow:0 18px 50px rgba(26,37,64,.08); transform:translateY(-2px); }
        .an-page .doc-item .fi { flex:0 0 36px; height:36px; border-radius:50%; background:#1A2540; color:#6FE0C6; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:16px; }
        .an-page .life { background:#1A2540; }
        .an-page .life-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-bottom:48px; }
        .an-page .life-card { position:relative; height:420px; border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(0,0,0,.28); }
        .an-page .life-card img { transition:transform .8s cubic-bezier(.22,.61,.36,1); }
        .an-page .life-card:hover img { transform:scale(1.06); }
        .an-page .life-card .ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.88) 0%,rgba(26,37,64,.18) 55%,transparent 100%); z-index:1; }
        .an-page .life-card .cap { position:absolute; left:0; right:0; bottom:0; z-index:2; padding:30px 28px; }
        .an-page .life-card .cap h3 { color:#F5F8F6; font-size:24px; margin-bottom:6px; }
        .an-page .life-card .cap p { color:rgba(247,250,252,.78); font-size:14px; }
        .an-page .life-detail-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .an-page .life-detail-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:4px; padding:34px 28px; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .an-page .life-detail-card:hover { background:rgba(247,250,252,.08); transform:translateY(-5px); }
        .an-page .life-detail-card .ld-ic { font-size:24px; margin-bottom:16px; color:#6FE0C6; }
        .an-page .life-detail-card h4 { color:#F5F8F6; font-size:18px; margin-bottom:12px; }
        .an-page .life-detail-card p { color:rgba(247,250,252,.68); font-size:14px; line-height:1.72; }
        .an-page .connectivity-callout { margin-top:48px; background:rgba(47,199,161,.08); border:1px solid rgba(47,199,161,.3); border-radius:4px; padding:42px 44px; display:flex; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap; }
        .an-page .connectivity-callout .cc-eyebrow { font-family:'Inter',sans-serif; text-transform:uppercase; letter-spacing:3px; font-size:11px; color:#6FE0C6; font-weight:600; display:block; margin-bottom:12px; }
        .an-page .connectivity-callout h3 { color:#F5F8F6; font-size:27px; margin-bottom:12px; }
        .an-page .connectivity-callout p { color:rgba(247,250,252,.74); font-size:15px; max-width:720px; }
        .an-page .tax-business { background:#E9F1EE; }
        .an-page .tax-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .an-page .tx-card { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:38px 32px; position:relative; overflow:hidden; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .an-page .tx-card::before { content:""; position:absolute; top:0; left:0; width:3px; height:0; background:#6FE0C6; transition:height .4s cubic-bezier(.22,.61,.36,1); }
        .an-page .tx-card:hover { box-shadow:0 18px 50px rgba(26,37,64,.08); transform:translateY(-4px); }
        .an-page .tx-card:hover::before { height:100%; }
        .an-page .tx-card .mk { font-family:'Cormorant Garamond',serif; font-size:22px; color:#296166; letter-spacing:1px; margin-bottom:16px; }
        .an-page .tx-card h4 { font-size:20px; margin-bottom:10px; }
        .an-page .tx-card p { color:#296166; font-size:15px; }
        .an-page .langma { background:#1A2540; color:#F5F8F6; position:relative; overflow:hidden; }
        .an-page .langma-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .an-page .lg-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:4px; padding:38px 32px; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .an-page .lg-card:hover { border-color:#6FE0C6; transform:translateY(-6px); }
        .an-page .lg-card .no { font-family:'Cormorant Garamond',serif; font-size:42px; font-weight:600; color:rgba(247,250,252,.08); line-height:1; margin-bottom:10px; }
        .an-page .lg-card h4 { color:#6FE0C6; font-size:20px; margin-bottom:10px; }
        .an-page .lg-card p { color:rgba(247,250,252,.72); font-size:14.5px; }
        .an-page .faq { background:#F5F8F6; }
        .an-page .faq-wrap { max-width:880px; margin:0 auto; }
        .an-page .faq-item { border-bottom:1px solid #E5E5E5; }
        .an-page .faq-q { width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:28px 0; display:flex; justify-content:space-between; align-items:center; gap:24px; font-family:'Cormorant Garamond',serif; font-size:23px; color:#296166; font-weight:600; }
        .an-page .faq-q .pm { flex:0 0 30px; height:30px; border:1px solid #6FE0C6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#296166; font-family:'Inter',sans-serif; font-size:18px; transition:all .3s; }
        .an-page .faq-item.open .pm { background:#6FE0C6; color:#296166; transform:rotate(45deg); }
        .an-page .faq-a { max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(.22,.61,.36,1); }
        .an-page .faq-a p { padding:0 0 28px; color:#296166; font-size:16px; max-width:760px; }
        .an-page .lead-sec { background:#1A2540; color:#F5F8F6; }
        .an-page .lead-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:start; }
        .an-page .lead-copy h2 { color:#F5F8F6; font-size:clamp(32px,4.2vw,50px); margin-bottom:20px; }
        .an-page .lead-copy p { color:rgba(247,250,252,.80); margin-bottom:26px; font-size:16.5px; }
        .an-page .lead-assure { list-style:none; }
        .an-page .lead-assure li { display:flex; gap:12px; align-items:center; padding:11px 0; color:rgba(247,250,252,.86); font-size:15px; }
        .an-page .lead-assure li::before { content:"✓"; color:#6FE0C6; font-weight:700; }
        .an-page .form-card { background:#F5F8F6; border-radius:4px; padding:42px; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .an-page .form-card h3 { font-size:27px; margin-bottom:6px; }
        .an-page .form-card .fsub { color:#296166; font-size:14.5px; margin-bottom:26px; }
        .an-page .frow { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .an-page .field { margin-bottom:16px; }
        .an-page .field label { display:block; font-size:12px; letter-spacing:.5px; text-transform:uppercase; color:#296166; font-weight:600; margin-bottom:7px; }
        .an-page .field input,.an-page .field select { width:100%; padding:13px 15px; border:1px solid #E5E5E5; border-radius:4px; font-family:'Inter',sans-serif; font-size:15px; background:#fff; color:#296166; transition:border-color .25s; }
        .an-page .field input:focus,.an-page .field select:focus { outline:none; border-color:#6FE0C6; box-shadow:0 0 0 3px rgba(47,199,161,.15); }
        .an-page .form-card .btn,.an-page .office-form .btn { width:100%; justify-content:center; margin-top:6px; }
        .an-page .form-card .disc { font-size:12px; color:#296166; margin-top:14px; text-align:center; }
        .an-page .success { display:none; background:rgba(47,199,161,.12); border:1px solid #6FE0C6; border-radius:4px; padding:16px; color:#296166; font-size:14.5px; text-align:center; margin-top:16px; }
        .an-page .success.show { display:block; }
        .an-page .office { background:#E9F1EE; }
        .an-page .office-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:60px; align-items:center; }
        .an-page .office-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:18px; }
        .an-page .office-copy p { color:#296166; font-size:16.5px; margin-bottom:26px; }
        .an-page .office-points { list-style:none; margin-bottom:8px; }
        .an-page .office-points li { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid #E5E5E5; }
        .an-page .office-points li:last-child { border-bottom:none; }
        .an-page .office-points .oi { flex:0 0 38px; height:38px; border-radius:50%; border:1px solid #6FE0C6; color:#296166; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; }
        .an-page .office-points h4 { font-size:19px; margin-bottom:1px; }
        .an-page .office-points p { font-size:14px; margin:0; color:#296166; }
        .an-page .office-form { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:40px; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .an-page .office-form h3 { font-size:25px; margin-bottom:6px; }
        .an-page .office-form .fsub { color:#296166; font-size:14.5px; margin-bottom:26px; }
        /* FOOTER — ADDED matching HTML foot-brand/h4 structure */
        .an-page .foot { background:#1A2540; color:rgba(247,250,252,.7); padding:74px 0 32px; }
        .an-page .foot-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1.3fr; gap:44px; margin-bottom:50px; }
        .an-page .foot-brand .fname { font-family:'Cormorant Garamond',serif; font-size:28px; color:#F5F8F6; font-weight:600; letter-spacing:1px; }
        .an-page .foot-brand .ftag { font-size:10px; letter-spacing:3px; text-transform:uppercase; color:#6FE0C6; margin:6px 0 18px; display:block; }
        .an-page .foot-brand p { font-size:14px; max-width:320px; line-height:1.7; }
        .an-page .foot-col h4 { color:#F5F8F6; font-size:18px; margin-bottom:18px; font-weight:600; font-family:'Cormorant Garamond',serif; }
        .an-page .foot-col ul { list-style:none; display:flex; flex-direction:column; gap:0; }
        .an-page .foot-col a { display:block; font-size:14px; color:rgba(247,250,252,.7); text-decoration:none; transition:color .25s; padding:6px 0; }
        .an-page .foot-col a:hover { color:#6FE0C6; }
        .an-page .foot .legal { font-size:11.5px; color:rgba(247,250,252,.5); line-height:1.7; margin-top:18px; max-width:920px; }
        .an-page .foot-bottom { border-top:1px solid rgba(247,250,252,.12); padding-top:26px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:14px; font-size:12.5px; }
        .an-page .an-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1); }
        .an-page .an-reveal.in { opacity:1; transform:none; }
        @media(max-width:980px) {
          .an-page .nav-links { display:none; position:absolute; top:100%; left:0; right:0; flex-direction:column; gap:0; background:rgba(26,37,64,.97); padding:14px 30px; }
          .an-page .nav-links.open { display:flex; }
          .an-page .nav-links a { padding:12px 0; }
          .an-page .burger { display:flex; }
          .an-page .about-grid,.an-page .fam-grid,.an-page .reasons-grid,.an-page .langma-grid,.an-page .lead-grid,.an-page .office-grid { grid-template-columns:1fr; gap:40px; }
          .an-page .stats-grid,.an-page .pillars-grid,.an-page .prog-grid,.an-page .ben-grid,.an-page .life-grid,.an-page .life-detail-grid,.an-page .tax-grid { grid-template-columns:1fr 1fr; }
          .an-page .facts-row,.an-page .elig-grid,.an-page .doc-grid { grid-template-columns:1fr 1fr; }
          .an-page .about-media,.an-page .fam-media,.an-page .reasons-media { height:420px; }
          .an-page .hero-split { grid-template-columns:1fr; gap:48px; padding-top:120px; padding-bottom:60px; }
          .an-page .hero-img-frame img { height:380px; }
          .an-page .hero-visual::before { display:none; }
          .an-page .hero-img-frame { max-width:100%; }
          .an-page .foot-grid { grid-template-columns:1fr 1fr; }
        }
        @media(max-width:640px) {
          .an-page .block { padding:74px 0; }
          .an-page .container { padding:0 22px; }
          .an-page .stats-grid,.an-page .pillars-grid,.an-page .prog-grid,.an-page .ben-grid,.an-page .life-grid,.an-page .life-detail-grid,.an-page .tax-grid,.an-page .facts-row,.an-page .elig-grid,.an-page .doc-grid { grid-template-columns:1fr; }
          .an-page .stat-cell { border-right:none; border-bottom:1px solid rgba(247,250,252,.10); }
          .an-page .frow { grid-template-columns:1fr; }
          .an-page .fin-row { grid-template-columns:1fr; gap:0; }
          .an-page .fin-row.head { display:none; }
          .an-page .hero-badges { gap:22px; }
          .an-page .form-card,.an-page .office-form { padding:30px; }
          .an-page .foot-grid { grid-template-columns:1fr; }
        }
        @media(prefers-reduced-motion:reduce) {
          .an-page * { animation:none!important; transition:none!important; }
          .an-page .an-reveal { opacity:1; transform:none; }
        }
      `}</style>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="hero-split">
              <div className="hero-copy">
                <span className="eyebrow light">Andorra Residence by Investment — Langma International Advisory</span>
                <h1>A Pyrenean Principality.<br /><em>Low Tax. Exceptional Quality of Life.</em></h1>
                <p className="lead">Langma International guides investors and globally mobile families through the Andorra Passive Residency by Investment programme — structured advisory on qualifying investment routes, eligibility, documentation and the full application journey.</p>
                <div className="hero-cta">
                  <a href="#lead" className="btn btn-primary">Request a Private Consultation</a>
                  <a href="#programme" className="btn btn-ghost">View Programme Overview</a>
                </div>
                <div className="hero-badges">
                  {[
                    { num: '€1M', lbl: 'Minimum qualifying investment' },
                    { num: '~4 Mo', lbl: 'Typical processing period' },
                    { num: '10%', lbl: 'Maximum income tax rate' },
                    { num: 'Family', lbl: 'Included in one application' },
                  ].map((b, i) => (
                    <div className="hero-badge" key={i}>
                      <div className="num">{b.num}</div>
                      <div className="lbl">{b.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero-visual">
                <div className="hero-img-frame">
                  <img src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=1200" alt="Andorra la Vella, the Pyrenean capital of the Principality of Andorra" />
                  <div className="hero-img-badge">
                    <span className="dot-pulse"></span>
                    <span>Andorra la Vella, Principality of Andorra</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-hint"><div className="line"></div>Discover more</div>
        </section>

        <div className="tile-divider" aria-hidden="true"></div>

        {/* STATS BAR */}
        <section className="stats-bar">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-cell an-reveal"><div className="v">€1M</div><div className="k">Minimum Qualifying Investment</div></div>
              <div className="stat-cell an-reveal"><div className="v">~4 Mo</div><div className="k">Typical Processing Period</div></div>
              <div className="stat-cell an-reveal"><div className="v">90 days</div><div className="k">Minimum Annual Residency Requirement</div></div>
              <div className="stat-cell an-reveal"><div className="v">10%</div><div className="k">Maximum Personal Income Tax Rate</div></div>
            </div>
          </div>
        </section>

        {/* ABOUT ANDORRA */}
        <section className="block about" id="about-andorra">
          <div className="container">
            <div className="section-head an-reveal">
              <span className="eyebrow center">About Andorra</span>
              <h2>A European Principality with Global Appeal</h2>
              <p>Andorra is a sovereign co-principality with a total land area of 468 km², situated in the eastern Pyrenees Mountains and bordered by Spain to the south and France to the north. Despite its compact geography, it sustains an economy and quality of life that compare favourably with its larger European neighbours.</p>
            </div>
            <div className="about-grid">
              <div className="about-copy an-reveal">
                <p className="about-lead">The principality's economy rests primarily on tourism, retail trade, financial services, and real estate — sectors that collectively draw millions of visitors annually and support a prosperous resident population of approximately 80,000 people. Andorra's currency is the Euro (€), and its official language is Catalan, though Spanish and French are widely spoken and understood throughout the territory.</p>
                <p>Andorra's fiscal framework is structured around low direct taxation: personal income tax begins at 0% on the first €24,000 of annual income and is capped at a maximum of 10%, while corporate tax is set at 10%. There is no wealth tax and no inheritance or estate tax. Investors are encouraged to seek qualified Andorran tax advice to understand their individual tax position before making any decisions.</p>
              </div>
              <div className="about-media an-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1526078669370-7f68a3f72b7f?q=80&w=1200" alt="Andorra mountain village panorama — scenic Pyrenean landscape" />
              </div>
            </div>
            <div className="facts-row">
              {[
                { ff: '468 km²', fl: 'Total Land Area' },
                { ff: '~80,000', fl: 'Resident Population' },
                { ff: 'Euro (€)', fl: 'Official Currency' },
                { ff: '10%', fl: 'Maximum Corporate Tax Rate' },
              ].map((f, i) => (
                <div className="fact an-reveal" key={i}><div className="ff">{f.ff}</div><div className="fl">{f.fl}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* COUNTRY INFO PILLARS */}
        <section className="block pillars" id="pillars">
          <div className="container">
            <div className="section-head an-reveal">
              <span className="eyebrow center">Country Information</span>
              <h2>Key Facts About the Principality</h2>
            </div>
            <div className="pillars-grid">
              {[
                { ic: '⛰', t: 'Location and Geography', p: 'Andorra is situated in the eastern Pyrenees Mountains between Spain to the south and France to the north. Its dramatic mountain landscape, with peaks reaching over 2,900 metres, defines both its natural beauty and its outdoor lifestyle offer — from skiing in winter to hiking and cycling in summer.' },
                { ic: '🏛', t: 'Capital: Andorra la Vella', p: 'The capital, Andorra la Vella, is located in a valley at approximately 1,023 metres above sea level — one of the highest capital cities in Europe. It serves as the principality\u2019s commercial, administrative, and cultural centre, combining modern urban infrastructure with deep historical character.' },
                { ic: '✎', t: 'Language and Culture', p: 'Catalan is Andorra\u2019s official language, reflecting its unique cultural identity as a co-principality governed jointly by the President of France and the Bishop of Urgell. Spanish and French are widely spoken, making everyday life and commerce accessible for internationally mobile residents without any language barriers.' },
                { ic: '❋', t: 'Economy and Commerce', p: 'Andorra\u2019s economy is anchored in tourism, retail trade, financial services, and real estate. The principality attracts over 8 million visitors annually, drawn by its retail offerings, ski resorts, and natural environment. This consistent economic activity supports a stable, prosperous environment for resident investors.' },
                { ic: '★', t: 'A Remarkably Tax-Efficient Jurisdiction', p: 'Andorra imposes no wealth or inheritance taxes. Personal income tax operates on a bracket system starting at 0% on the first €24,000 and rising to a maximum of 10% on income above €40,000. The corporate tax rate is capped at 10%. All investors should engage a qualified Andorran tax adviser to assess their personal circumstances.' },
                { ic: '⌖', t: 'Strategic European Access', p: 'Andorran residents enjoy unrestricted access to both Spain and France without visas or advance permissions. Schengen area visas for broader European travel can be obtained on an expedited basis, providing Andorra residents with broad European connectivity from a single principality base.' },
              ].map((c, i) => (
                <div className="pillar-card an-reveal" key={i}><div className="ic">{c.ic}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        <div className="tile-divider" aria-hidden="true"></div>

        {/* WHY ANDORRA */}
        <section className="block why" id="why-andorra">
          <div className="container">
            <div className="reasons-grid">
              <div className="an-reveal">
                <span className="eyebrow">Why Andorra</span>
                <h2 style={{ fontSize: 'clamp(30px,4.4vw,48px)', marginBottom: 28, lineHeight: 1.15 }}>Europe&rsquo;s Best-Kept Residency Secret — Now Within Reach</h2>
                <ul className="reasons-list">
                  {[
                    { n: '1', t: 'A Secure, Stable European Address', p: 'Andorra\u2019s exceptionally low crime rate, robust rule of law, and longstanding political neutrality make it one of Europe\u2019s most secure living environments. For families prioritising safety and stability alongside their investment, the principality consistently delivers peace of mind as a daily reality.' },
                    { n: '2', t: 'A Tax Framework Built for Wealth Preservation', p: 'No wealth tax. No inheritance tax. Personal income tax capped at 10% and starting at 0% on the first €24,000. Corporate tax at 10%. Andorra\u2019s low-tax structure is source-verified and independently recognised — individual tax positions should be confirmed with a qualified adviser.' },
                    { n: '3', t: 'Visa-Free France and Spain, Every Day', p: 'Andorran residents travel freely to both France and Spain without visas or advance permissions, while Schengen tourist visas for broader European travel can be issued in as little as one day under the fast-track process available to residents.' },
                    { n: '4', t: 'Premium European Living, Competitive Cost', p: 'Andorra\u2019s cost of living is broadly competitive compared with the major Western European capitals, while quality of life metrics — safety, education, healthcare, natural environment — sit at the highest European levels. The principality delivers a genuinely premium lifestyle without the premium price tag of Paris, London, or Zurich.' },
                  ].map((c, i) => (
                    <li key={i}><span className="ri">{c.n}</span><div><h4>{c.t}</h4><p>{c.p}</p></div></li>
                  ))}
                </ul>
              </div>
              <div className="reasons-media an-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1580487932618-ca2b56c543b3?q=80&w=1200" alt="Andorra la Vella modern cityscape surrounded by Pyrenean mountains" />
              </div>
            </div>
            <div className="about-transition an-reveal">
              <div>
                <h3>Ready to Make Andorra Your European Residence Base?</h3>
                <p>For investors and globally mobile families drawn to Andorra&rsquo;s combination of European access, low taxation, and exceptional quality of life, the Andorra Residency by Investment programme offers a clearly defined, structured route to legal residence in the Principality.</p>
              </div>
              <a href="#programme" className="btn btn-primary">Explore the Programme</a>
            </div>
          </div>
        </section>

        <div className="tile-divider" aria-hidden="true"></div>

        {/* PROGRAMME OVERVIEW */}
        <section className="block prog" id="programme">
          <div className="container">
            <div className="section-head an-reveal light">
              <span className="eyebrow center">Programme Overview</span>
              <h2>Andorra Residency by Investment — Passive Residency Programme</h2>
              <p>A government-administered route to legal residence in the Principality of Andorra, granting the right to live in Andorra without engaging in local employment — available to qualifying investors and their immediate family members through a single unified application.</p>
            </div>
            <div className="prog-grid">
              {[
                { no: 'Status Obtained', t: 'Andorra Passive Residence Permit', p: 'The initial permit is issued for a period of 2 years. It is renewable provided the qualifying investment remains in place and the minimum annual residency requirement of 90 days per year continues to be met. There is no cap on the number of renewals, allowing investors to maintain their status indefinitely on a rolling basis.' },
                { no: 'Investment Requirement', t: '€1,000,000 Qualifying Investment', p: 'The programme requires a minimum investment of €1,000,000 irrespective of the chosen route. Eligible options include real estate — where each unit must be valued at €800,000 or above — or financial assets such as shares in local companies, debt instruments, other financial instruments, or life insurance products from local Andorran providers.' },
                { no: 'Processing Timeline', t: 'Approximately 4 Months', p: 'Obtaining an Andorra residence permit by investment typically takes approximately 4 months. Applicants must travel to Andorra in person to submit their application and undergo the required medical examination, which cannot be conducted remotely. The investment is to be fulfilled within 6 months of receiving the residence permit.' },
                { no: 'Income Requirement', t: 'Annual Income of €54,900+ (Main Applicant)', p: 'The main investor must demonstrate a verifiable annual income of at least €54,900. Each dependant included in the application adds a requirement of at least €18,300 per person per year. Income must be evidenced through appropriate financial documentation as part of the application file.' },
                { no: 'Residency Obligation', t: 'Minimum 90 Days Per Year in Andorra', p: 'Residence permit holders are required to spend a minimum of 90 days per calendar year within the Principality of Andorra. This residency obligation must be maintained throughout the validity of the permit and upon each renewal cycle.' },
                { no: 'AFA Deposit', t: 'Non-Refundable AFA Deposit', p: 'A non-refundable deposit of €50,000 is payable by the main investor to the AFA (Andorra\u2019s financial supervisory authority), with an additional €12,000 per dependant included in the application. This deposit forms part of the programme\u2019s mandatory financial compliance framework.' },
              ].map((c, i) => (
                <div className="prog-card an-reveal" key={i}><div className="no">{c.no}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="block benefits" id="benefits">
          <div className="container">
            <div className="section-head an-reveal">
              <span className="eyebrow center">Key Benefits</span>
              <h2>What Andorra Residency by Investment Delivers</h2>
              <p>One structured investment, one application, and a residence permit that covers the entire family — anchored in one of Europe&rsquo;s most tax-efficient, safest, and most desirable living environments.</p>
            </div>
            <div className="ben-grid">
              {[
                { mk: 'I', t: 'Visa-Free Access to France and Spain', p: 'Andorran residents travel to both neighbouring countries freely, without visas or advance permissions — providing daily convenience and immediate European mobility.' },
                { mk: 'II', t: 'Expedited Visa Processing for Global Travel', p: 'Residents benefit from fast-track visa procedures: Schengen tourist visas are issued within 1 day, while visas for countries such as the UK, USA, and Canada typically take a few days.' },
                { mk: 'III', t: 'Zero Wealth and Inheritance Tax', p: 'Andorra levies no wealth tax and no inheritance tax — a significant consideration for internationally mobile investors focused on long-term wealth preservation and cross-generational planning.' },
                { mk: 'IV', t: 'Highly Competitive Income and Corporate Tax', p: 'Personal income tax starts at 0% on the first €24,000, rising up to 5% on earnings up to €40,000, with a maximum rate of 10% above that threshold. Corporate tax is set at 10%. Individual tax positions should be confirmed with a qualified local adviser.' },
                { mk: 'V', t: 'Open Banking Access', p: 'Residents may open accounts with local and international banks in Andorra. Andorra does not report foreign investors\u2019 account information to overseas tax authorities, offering a private and stable financial environment.' },
                { mk: 'VI', t: 'One Application for the Entire Family', p: 'A spouse or partner — including same-sex partners — and children under 25 can be included within the same residency application, covering the complete family unit without separate investment requirements per dependant.' },
                { mk: 'VII', t: 'Renewable Long-Term Status', p: 'The residence permit is issued for 2 years and renewable an unlimited number of times, provided the investment is retained and residency requirements continue to be satisfied — offering a stable, long-term European residence foundation.' },
                { mk: 'VIII', t: 'Healthcare Coverage Up to 90%', p: 'Andorra\u2019s national health system covers up to 90% of medical expenses for residents, combined with an average life expectancy of 84.46 years and an overall standard of healthcare among the highest in Europe.' },
                { mk: 'IX', t: 'Europe\u2019s Highest Safety Rating', p: 'Ranked first for safety across the European continent in 2026, Andorra\u2019s near-zero crime rate and deeply stable social environment provide a family environment that is genuinely exceptional by any global standard.' },
              ].map((c, i) => (
                <div className="ben-card an-reveal" key={i}><div className="mk">{c.mk}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ELIGIBILITY — UPDATED to rich elig-grid matching HTML */}
        <section className="block eligibility" id="eligibility">
          <div className="container">
            <div className="section-head an-reveal">
              <span className="eyebrow center">Eligibility Requirements</span>
              <h2>Who Can Apply for Andorra Residence by Investment</h2>
              <p>A clear set of criteria determines eligibility for the Andorra Passive Residency programme. The checklist below summarises the key requirements for the principal investor.</p>
            </div>
            <div className="elig-grid">
              {[
                { n: '①', t: 'Minimum Age of 18', p: 'The principal applicant must be at least 18 years of age at the time of application.' },
                { n: '②', t: 'Clean Criminal Record', p: 'No criminal record or active criminal prosecution — confirmed for both the principal applicant and all included dependants.' },
                { n: '③', t: 'Qualifying Investment of €1,000,000+', p: 'Commitment of at least €1,000,000 into an eligible investment category — real estate or approved financial assets — within 6 months of permit issuance.' },
                { n: '④', t: 'Annual Income of at Least €54,900 (Main Applicant)', p: 'Verifiable annual income of €54,900 or above for the main investor, plus €18,300 per included dependant per year.' },
                { n: '⑤', t: 'Owned or Rented Accommodation in Andorra', p: 'The applicant must hold or arrange suitable residential accommodation in Andorra — either owned or rented — as part of the application.' },
                { n: '⑥', t: 'Minimum 90 Days Annual Presence', p: 'The investor must commit to spending at least 90 days per calendar year within the Principality to maintain permit validity upon renewal.' },
                { n: '⑦', t: 'Non-Refundable AFA Deposit', p: 'Payment of €50,000 to the AFA by the main investor, plus €12,000 per dependant included in the application.' },
                { n: '⑧', t: 'In-Person Application in Andorra', p: 'The applicant must be physically present in Andorra to submit the application and complete the mandatory medical examination, which cannot be conducted remotely.' },
              ].map((r, i) => (
                <div className="elig-item an-reveal" key={i}>
                  <span className="ei">{r.n}</span>
                  <div><h4>{r.t}</h4><p>{r.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INVESTMENT OPTIONS */}
        <section className="block investment" id="investment">
          <div className="container">
            <div className="section-head an-reveal">
              <span className="eyebrow center">Qualifying Investment Options</span>
              <h2>How the €1,000,000 Investment Can Be Structured</h2>
              <p>The Andorra Passive Residency programme recognises two principal investment categories, both subject to the same €1,000,000 minimum threshold, with associated costs and fees set out below.</p>
            </div>
            <h3 className="inv-section-title an-reveal">Option 1 — Real Estate Investment</h3>
            <div className="fin-table an-reveal">
              <div className="fin-row head">
                <div className="fc">Cost Item</div>
                <div className="fc">Amount</div>
                <div className="fc">Notes</div>
              </div>
              {[
                { label: 'Real Estate Purchase', labelSub: 'Each unit must be individually valued at €800,000 or above', amount: '€800,000+', amountSub: 'Total portfolio: €1,000,000+ minimum', note: 'Government permission required for property purchase. Property cannot be rented out and must remain in the investor\u2019s ownership throughout the residency period.' },
                { label: 'Non-Refundable AFA Deposit', labelSub: 'Payable by the investor and each dependant', amount: '€50,000', amountSub: '+ €12,000 per dependant', note: 'This deposit is non-refundable and forms part of the programme\u2019s mandatory financial compliance requirement.' },
                { label: 'Property Purchase Tax', labelSub: 'Applied at point of acquisition', amount: '6%', amountSub: 'First unit — 10% from second unit onward', note: 'The purchase tax rate increases to 10% for a second property unit and beyond.' },
                { label: 'Realtor Services', labelSub: 'Agent commission on property acquisition', amount: '2%', amountSub: '', note: '2% of the property value, payable to the appointed real estate agent.' },
                { label: 'Property Rental (if renting to apply)', labelSub: 'Annual cost of renting qualifying accommodation', amount: '€12,000/yr', amountSub: '', note: 'Where the investor opts to rent (rather than purchase) to satisfy the accommodation requirement at the application stage.' },
                { label: 'Due Diligence Fee', labelSub: '', amount: '€18,000', amountSub: '', note: 'Standard due diligence assessment applied to the application file.' },
                { label: 'Residence Permit Fee', labelSub: 'Government permit issuance charge', amount: '€3,000', amountSub: '+ €1,000 per dependant', note: 'Payable to the relevant Andorran government authority upon permit issuance.' },
                { label: 'Administrative Fee', labelSub: '', amount: '€1,000', amountSub: 'Per applicant', note: 'Administrative processing charge applied per applicant.' },
                { label: 'Document Processing Fee', labelSub: '', amount: '€2,000', amountSub: '', note: 'Charged for document preparation and processing as part of the formal submission.' },
                { label: 'Health Insurance', labelSub: 'Mandatory for all applicants', amount: '€1,400+', amountSub: 'Per adult — €500+ per child under 18', note: 'Health insurance must be arranged for all applicants included in the residency application.' },
              ].map((r, i) => (
                <div className="fin-row" key={i}>
                  <div className="fc label">{r.label}{r.labelSub && <small>{r.labelSub}</small>}</div>
                  <div className="fc fig">{r.amount}{r.amountSub && <small>{r.amountSub}</small>}</div>
                  <div className="fc note">{r.note}</div>
                </div>
              ))}
            </div>
            <h3 className="inv-section-title an-reveal">Option 2 — Financial Assets</h3>
            <div className="fin-option-2 an-reveal">
              <p>The same €1,000,000 minimum threshold applies to qualifying financial asset investments. Eligible options include:</p>
              <ul className="fin-option-list">
                <li>Shares in local Andorran companies</li>
                <li>Debt or financial instruments issued within Andorra</li>
                <li>Life insurance products from locally based Andorran providers</li>
              </ul>
              <p className="fin-option-note">Financial asset investments under this route are permitted for a maximum of 36 months, after which the invested funds must be redirected into other permanent Andorran asset classes to maintain qualifying status. Investors should seek independent financial and legal advice on the suitability of each route for their individual circumstances.</p>
            </div>
            <p className="fin-note an-reveal">All fees and amounts are sourced from programme information as of early 2026. Costs are subject to change. Langma International provides a personalised cost breakdown for each client&rsquo;s family composition during the eligibility assessment.</p>
          </div>
        </section>

        {/* FAMILY */}
        <section className="block family-sec" id="family">
          <div className="container">
            <div className="fam-grid">
              <div className="fam-media an-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200" alt="Family lifestyle outdoors in safe environment" />
              </div>
              <div className="an-reveal">
                <span className="eyebrow">Family Inclusion</span>
                <h2 style={{ fontSize: 'clamp(30px,4vw,48px)', marginBottom: 26 }}>One Application — Residency for the Whole Family</h2>
                <p style={{ color: '#296166', fontSize: 16.5, marginBottom: 26 }}>A spouse or partner and children under 25 can be included within the same Andorra residency application as the principal investor, under a single unified filing.</p>
                <ul className="fam-list">
                  {[
                    { fi: '①', t: 'Principal Investor', p: 'Over 18, no criminal record or prosecutions, demonstrable annual income of €54,900 or above, and owned or rented accommodation in Andorra.' },
                    { fi: '②', t: 'Spouse or Partner', p: 'Legally married partners and those in unregistered partnerships are eligible for inclusion. Same-sex couples are explicitly included under programme rules.' },
                    { fi: '③', t: 'Children Under 18', p: 'Minor children — including children from previous marriages — may be included in the application. Each dependant adds €12,000 to the AFA deposit and €18,300 to the annual income threshold.' },
                    { fi: '④', t: 'Children Aged 18 to 25', p: 'Children in this age bracket may be included provided they are financially dependent on the investor, currently unmarried, and enrolled as full-time students at the time of application.' },
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

        {/* PROCESS — UPDATED to 7 steps matching HTML */}
        <section className="block process" id="process">
          <div className="container">
            <div className="section-head an-reveal light">
              <span className="eyebrow center">Application Process</span>
              <h2>Your Step-by-Step Journey to Andorra Residency</h2>
              <p>Langma International coordinates each stage of the process alongside licensed Andorran legal professionals. Obtaining the residence permit typically takes approximately 4 months from initiation to permit issuance.</p>
            </div>
            <div className="timeline">
              {[
                { d: '01', t: 'Eligibility Assessment', p: 'We begin with a confidential review of your investment capacity, income sources, family composition, and background — confirming eligibility and mapping the most suitable investment route for your circumstances.', time: 'Day 1' },
                { d: '02', t: 'Preliminary Due Diligence', p: 'A formal compliance review is conducted to identify any potential issues in advance. This stage allows for early risk mitigation and ensures the application file is well-prepared before submission. Where any concerns arise, we work with you to address them proactively.', time: 'Day 1' },
                { d: '03', t: 'Document Collection and Preparation', p: 'A comprehensive list of required documents is compiled, including proof of income, certificates of no criminal record, confirmation of accommodation in Andorra, and all supporting identification and financial evidence. This stage typically takes one month or more depending on individual circumstances.', time: '1+ Month' },
                { d: '04', t: 'Travel to Andorra — In-Person Application Submission', p: 'The applicant must travel to Andorra to submit the residence application in person. The process typically spans approximately two days: the first day for document submission, and the second day for the formal interview with the relevant Andorran authority.', time: '1 — 1.5 Weeks' },
                { d: '05', t: 'Medical Examination in Andorra', p: 'The medical examination must be conducted within Andorra and cannot be carried out remotely. We recommend allocating approximately 4 days for this stage: a general health assessment and Mantoux test are conducted on day one, with the test results available approximately 3 days later.', time: 'Up to 1 Week' },
                { d: '06', t: 'Government Review and Permit Issuance', p: 'Following document submission and the medical examination, the applicant may return to their home country. Once the application is approved by the Andorran authorities, an authorised representative may collect the residence permit card on the applicant\u2019s behalf.', time: '1 — 1.5 Months' },
                { d: '07', t: 'Fulfilment of the Qualifying Investment', p: 'The required qualifying investment of €1,000,000 must be completed within 6 months of receiving the residence permit. Langma International provides advisory support on investment selection and execution through to completion.', time: 'Within 6 Months of Permit' },
              ].map((s, i) => (
                <div className="tl-item an-reveal" key={i}>
                  <div className="dot">{s.d}</div>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                  <span className="tl-time">{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REQUIRED DOCUMENTS */}
        <section className="block documents" id="documents">
          <div className="container">
            <div className="section-head an-reveal">
              <span className="eyebrow center">Required Documents</span>
              <h2>What You Will Need to Prepare</h2>
              <p>A complete, well-prepared application file is essential to a smooth Andorra residency process. The following checklist outlines the core documentation typically required. Langma International provides a personalised document list as part of your eligibility assessment.</p>
            </div>
            <div className="doc-grid">
              {[
                'Valid passport (all applicants)',
                'Certificate of no criminal record (all adult applicants)',
                'Proof of annual income (€54,900+ for main applicant)',
                'Proof of income per dependant (€18,300+ per person)',
                'Proof of accommodation in Andorra (ownership or rental)',
                'Marriage certificate or proof of partnership (if applicable)',
                'Birth certificates for all included children',
                'Proof of student enrolment (for dependants aged 18–25)',
                'Source of funds documentation for the qualifying investment',
                'Health insurance policy covering all applicants',
                'Medical examination results (completed in Andorra)',
                'AFA deposit payment confirmation (€50,000 + €12,000 per dependant)',
              ].map((d, i) => (
                <div className="doc-item an-reveal" key={i}><span className="fi">✓</span>{d}</div>
              ))}
            </div>
          </div>
        </section>

        {/* LIFE IN ANDORRA */}
        <section className="block life" id="life-in-andorra">
          <div className="container">
            <div className="section-head an-reveal light">
              <span className="eyebrow center light">Living in Andorra</span>
              <h2>A Life Well Lived in the Pyrenees</h2>
              <p>Beyond the residence permit lies a daily quality of life that genuinely sets Andorra apart — combining mountain grandeur, exceptional safety, strong healthcare, international schooling, and a family environment that globally mobile investors consistently rank among the finest in Europe.</p>
            </div>
            <div className="life-grid">
              {[
                { img: 'https://images.unsplash.com/photo-1591800898745-de1e90dfe07a?q=80&w=1200', alt: 'Andorra Pyrenean mountain landscape in autumn', t: 'Mountain Living', p: 'Natural beauty and outdoor lifestyle year-round' },
                { img: 'https://images.unsplash.com/photo-1519152297761-3e3c8024b6f7?q=80&w=800', alt: 'Modern Andorra la Vella city centre', t: 'Modern Infrastructure', p: 'Contemporary capital with excellent connectivity' },
                { img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800', alt: 'Premium private healthcare facilities', t: 'Healthcare Up to 90% Covered', p: 'Among the highest standards in Europe' },
              ].map((c, i) => (
                <div className="life-card an-reveal" key={i}>
                  <img src={c.img} alt={c.alt} />
                  <div className="ov"></div>
                  <div className="cap"><h3>{c.t}</h3><p>{c.p}</p></div>
                </div>
              ))}
            </div>
            <div className="life-detail-grid">
              {[
                { ic: '⛺', t: 'Safety and Stability', p: 'Andorra maintains one of the lowest crime rates in Europe. Its long tradition of political neutrality, stable governance, and close-knit community culture create an environment where families can live, work, and raise children with a genuine sense of security — a defining feature of daily life in the principality.' },
                { ic: '✚', t: 'Healthcare Coverage', p: 'Andorra\u2019s national health system covers up to 90% of medical expenses for residents. The principality\u2019s hospitals and clinics offer a high standard of care, complemented by easy access to major Spanish and French medical facilities for specialised treatment. Long life expectancy figures reflect this consistently strong health infrastructure.' },
                { ic: '✎', t: 'Education', p: 'Andorra offers three parallel school systems — Andorran, French, and Spanish — providing internationally mobile families with genuine choice in language of instruction and curriculum. This multi-system structure means children can continue education in a familiar European framework, with universities in Barcelona, Toulouse, and beyond easily accessible.' },
                { ic: '⌖', t: 'Infrastructure and Connectivity', p: 'Andorra la Vella is a modern, well-connected capital offering high-speed internet, reliable utilities, contemporary commercial amenities, and a strong banking sector. Road connections to Spain and France are well-maintained, and Barcelona and Toulouse are reachable within two to three hours — placing international airports, business hubs, and cultural centres well within reach.' },
                { ic: '⛰', t: 'Outdoor Lifestyle and Natural Surroundings', p: 'Andorra\u2019s Pyrenean setting makes outdoor living a year-round reality. World-class ski resorts, extensive hiking trails, mountain biking circuits, and river valleys offer an unparalleled natural playground. For families with an active lifestyle, few European residency destinations can match the quality and variety of outdoor experience available directly from your front door.' },
                { ic: '❋', t: 'Family Environment and Community', p: 'Andorra\u2019s small size fosters a genuine sense of community while its international resident population ensures that globally mobile families feel at home. The principality is widely regarded as an outstanding environment for raising children — combining excellent schooling options, low crime, clean air, and strong community values with the cultural richness of its dual French-Spanish borders.' },
              ].map((c, i) => (
                <div className="life-detail-card an-reveal" key={i}>
                  <div className="ld-ic">{c.ic}</div>
                  <h4>{c.t}</h4>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
            <div className="connectivity-callout an-reveal">
              <div className="cc-text">
                <span className="cc-eyebrow">Connectivity to Spain &amp; France</span>
                <h3>Two Countries. Daily Access. Zero Visas Required.</h3>
                <p>Andorran residents cross into Spain and France freely, without visas or advance permissions. Barcelona Airport (2–3 hrs), Toulouse-Blagnac Airport (approx. 3 hrs), and Perpignan Airport (approx. 1.5 hrs) all provide regular international connections — ensuring that Andorra&rsquo;s mountain tranquillity never comes at the cost of global accessibility.</p>
              </div>
              <a href="#lead" className="btn btn-primary">Enquire About Living in Andorra</a>
            </div>
          </div>
        </section>

        <div className="tile-divider" aria-hidden="true"></div>

        {/* TAX & BUSINESS */}
        <section className="block tax-business" id="tax-business">
          <div className="container">
            <div className="section-head an-reveal">
              <span className="eyebrow center">Tax and Business Environment</span>
              <h2>Andorra&rsquo;s Tax Framework at a Glance</h2>
              <p>The following information reflects Andorra&rsquo;s published tax regime as of early 2026. It is provided for general awareness only and does not constitute tax advice. Investors should engage a qualified Andorran tax professional to assess their individual position.</p>
            </div>
            <div className="tax-grid">
              {[
                { mk: 'I', t: 'Personal Income Tax', p: 'Andorra\u2019s personal income tax operates on a tiered bracket system. The first €24,000 of annual income is taxed at 0%. Income between €24,000 and €40,000 is subject to up to 5%. Earnings above €40,000 are taxed at a maximum rate of 10%. There is no additional local surcharge.' },
                { mk: 'II', t: 'No Wealth or Inheritance Tax', p: 'Andorra imposes no wealth tax and no inheritance or estate tax. This is a defining feature of the principality\u2019s fiscal landscape, and a significant consideration for investors engaged in long-term wealth planning and intergenerational asset transfer.' },
                { mk: 'III', t: 'Corporate Tax at 10%', p: 'The corporate income tax rate in Andorra is 10% — among the lowest available within the European region. Combined with the principality\u2019s stable legal framework and business-friendly regulatory environment, this makes Andorra a credible jurisdiction for company structures and business activity.' },
                { mk: 'IV', t: 'Banking Confidentiality', p: 'Andorra does not report foreign investors\u2019 bank account details to the tax authorities of other countries. Residents may hold accounts with local and international banking institutions within the principality under a framework of financial discretion and stability.' },
                { mk: 'V', t: 'Cost Efficiency Advantage', p: 'The cost of living in Andorra is approximately 30% lower than across EU member states and the United States, while GDP per capita stands at $51,680 — comparable to France. This creates a financially compelling environment for residents seeking premium living at meaningfully lower cost.' },
                { mk: 'VI', t: 'Passive Residency — No Local Employment Required', p: 'The Andorra Passive Residency programme grants investors and their families the right to reside in Andorra without any obligation to participate in local employment or establish a business presence within the principality.' },
              ].map((c, i) => (
                <div className="tx-card an-reveal" key={i}><div className="mk">{c.mk}</div><h4>{c.t}</h4><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY LANGMA */}
        <section className="block langma" id="why-langma">
          <div className="container">
            <div className="section-head an-reveal light">
              <span className="eyebrow center light">Why Langma International</span>
              <h2>A Trusted Advisory Partner for Your Andorra Journey</h2>
              <p>We work with a carefully selected number of investor families, ensuring every Andorra residency mandate receives the expertise, discretion, and personal continuity it deserves.</p>
            </div>
            <div className="langma-grid">
              {[
                { no: '01', t: 'Advice Tailored to Your Individual Profile', p: 'We begin by understanding your investment preferences, income structure, and family composition in full — then identify the qualifying investment route and preparation strategy that genuinely aligns with your goals, rather than offering a one-size-fits-all approach.' },
                { no: '02', t: 'Structured Documentation Support', p: 'Our team prepares and coordinates the complete documentation file for your Andorra residency application — compiling, verifying, and sequencing the required evidence so that your submission meets the standards expected by the Andorran authorities.' },
                { no: '03', t: 'Working Alongside Licensed Andorran Professionals', p: 'We coordinate with licensed Andorran legal and property professionals at each relevant stage, ensuring that filings, purchases, and regulatory interactions are handled by qualified in-country specialists operating within Andorra\u2019s legal framework.' },
                { no: '04', t: 'Family Residency Coordination', p: 'From confirming dependant eligibility through to coordinating the inclusion of a spouse and children within the same application, we manage family residency planning with precision — accounting for income thresholds, AFA deposits, and documentation requirements for each family member.' },
                { no: '05', t: 'One Point of Contact, Start to Finish', p: 'A dedicated senior advisor stays with your case from first consultation through to permit issuance — managing timelines, liaising with all relevant parties, and keeping you clearly informed at every step of the Andorra residency process.' },
                { no: '06', t: 'Long-Term Renewal and Compliance Support', p: 'Our support does not end at permit issuance. We advise on renewal obligations, monitor compliance with the 90-day residency requirement, and provide ongoing guidance to help you maintain your Andorra investment residency status in good standing for the long term.' },
              ].map((c, i) => (
                <div className="lg-card an-reveal" key={i}><div className="no">{c.no}</div><h4>{c.t}</h4><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="block faq" id="faq">
          <div className="container">
            <div className="section-head an-reveal">
              <span className="eyebrow center">Frequently Asked Questions</span>
              <h2>Andorra Residency by Investment — Common Questions</h2>
            </div>
            <div className="faq-wrap">
              {[
                { q: 'What is the Andorra Residence by Investment programme?', a: 'The Andorra Residence by Investment programme — formally referred to as the Andorra Passive Residency — grants qualifying investors the right to live in the Principality of Andorra without engaging in local employment. The initial permit is issued for 2 years and is renewable an unlimited number of times, provided the qualifying investment of €1,000,000 is retained and the minimum annual residency requirement of 90 days per year continues to be met. Family members — including a spouse or partner and children under 25 — can be included within the same application.' },
                { q: 'What is the minimum investment required for Andorra residency?', a: 'The qualifying investment threshold is €1,000,000, regardless of the investment route chosen. Two primary routes are available: real estate — where each individual property unit must be valued at a minimum of €800,000, with the total portfolio reaching the €1,000,000 threshold — or financial assets, including shares in local Andorran companies, debt instruments, other financial instruments, or life insurance products from locally based Andorran providers. Financial asset investments are limited to 36 months, after which the funds must be reinvested into other permanent Andorran asset classes.' },
                { q: 'Can my family members be included in my application?', a: 'Yes. A spouse or partner — including partners in same-sex relationships and those in unregistered partnerships — and children under 25 can be included within the same residency application as the principal investor. Children under 18, including those from previous marriages, are eligible for inclusion. Children aged 18 to 25 may also be included provided they are financially dependent on the investor, unmarried, and currently enrolled as full-time students. Each additional dependant increases the required annual income threshold by €18,300 and requires an additional €12,000 AFA deposit.' },
                { q: 'How long does the Andorra residency application process take?', a: 'Obtaining an Andorra residence permit by investment typically takes approximately 4 months from initiation to permit issuance. The investor must travel to Andorra in person for approximately one to one and a half weeks to submit the application, attend an interview, and complete the mandatory medical examination — which cannot be conducted remotely. After submission, the applicant may return home, with the residence permit card being collectable by an authorised representative once approval is granted. The qualifying investment must then be completed within 6 months of permit issuance.' },
                { q: 'How can Langma International assist with my Andorra residency application?', a: 'Langma International acts as your dedicated residency advisory and documentation support partner throughout the Andorra investment migration process. We provide an initial confidential eligibility assessment, advise on qualifying investment routes matched to your profile, prepare and coordinate your full documentation file, liaise with licensed Andorran legal and property professionals, guide the family inclusion process, and support you through to permit issuance and beyond. We do not act as a government authority and do not make decisions on residency applications — we provide structured advisory and application assistance throughout the process.' },
              ].map((faq, i) => (
                <div className={`faq-item an-reveal ${openFaq === i ? 'open' : ''}`} key={i}>
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
              <div className="lead-copy an-reveal">
                <span className="eyebrow light">Begin Your Application</span>
                <h2>Talk to an Advisor About Your Andorra Residency Options</h2>
                <p>Book a confidential consultation with Langma International to confirm your eligibility for the Andorra Residence by Investment programme and receive a personalised investment and cost breakdown for your family.</p>
                <ul className="lead-assure">
                  {[
                    'Complimentary, no-obligation eligibility review',
                    'Investment route guidance matched to your profile',
                    'Family inclusion and income threshold planning',
                    'Documentation preparation and file coordination support',
                    'Introductions to licensed Andorran legal professionals',
                    'End-to-end advisory from initial consultation to permit issuance',
                  ].map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
              <div className="form-card an-reveal">
                <h3>Request Your Eligibility Review</h3>
                <p className="fsub">A member of our advisory team will be in touch within one business day.</p>
                <form onSubmit={handleLeadSubmit} noValidate>
                  <div className="frow">
                    <div className="field"><label htmlFor="fname">First Name</label><input type="text" id="fname" required /></div>
                    <div className="field"><label htmlFor="lname">Last Name</label><input type="text" id="lname" required /></div>
                  </div>
                  <div className="field"><label htmlFor="email">Email Address</label><input type="email" id="email" required /></div>
                  <div className="frow">
                    <div className="field"><label htmlFor="phone">Phone Number</label><input type="tel" id="phone" /></div>
                    <div className="field"><label htmlFor="country">Country of Residence</label><input type="text" id="country" /></div>
                  </div>
                  <div className="field">
                    <label htmlFor="interest">Investment Route of Interest</label>
                    <select id="interest" defaultValue="Real Estate (€1,000,000+)">
                      <option>Real Estate (€1,000,000+)</option>
                      <option>Financial Assets (€1,000,000+)</option>
                      <option>General Enquiry — Andorra Residency</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={leadLoading}>{leadLoading ? 'Sending...' : 'Request Eligibility Review'}</button>
                  <p className="disc">By submitting this form, you agree to Langma International contacting you regarding your enquiry. Your details are handled confidentially.</p>
                  {(leadMsg || leadSubmitted) && (
                    <div className={`success show${leadSuccess ? '' : ''}`} style={!leadSuccess && leadMsg ? {background:'rgba(220,38,38,.08)',border:'1px solid #ef4444',color:'#b91c1c'} : undefined}>
                      {leadMsg || 'Thank you — an advisor will be in touch shortly.'}
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
              <div className="office-copy an-reveal">
                <span className="eyebrow">Visit Us</span>
                <h2>Book an Office Consultation</h2>
                <p>Meet our advisory team in person to discuss your Andorra Residency by Investment options, explore qualifying investment routes, and plan your next steps at a time that suits you.</p>
                <ul className="office-points">
                  {[
                    { oi: '✦', t: 'Direct meeting with a senior Andorra residency advisor', p: 'A focused conversation with the people who will guide your case.' },
                    { oi: '✓', t: 'Guidance on investment routes, income planning and family inclusion', p: 'Personalised cost calculation for your family composition.' },
                    { oi: '↪', t: 'A private, no-pressure conversation', p: 'Appointments arranged around your schedule and at your pace.' },
                  ].map((item, i) => (
                    <li key={i}>
                      <span className="oi">{item.oi}</span>
                      <div><h4>{item.t}</h4><p>{item.p}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="office-form an-reveal">
                <h3>Request a Visit</h3>
                <p className="fsub">Share your details and we will confirm a time that works for you.</p>
                <form onSubmit={handleOfficeSubmit} noValidate>
                  <div className="field"><label htmlFor="ov-name">Full Name</label><input type="text" id="ov-name" required /></div>
                  <div className="frow">
                    <div className="field"><label htmlFor="ov-phone">Phone Number</label><input type="tel" id="ov-phone" placeholder="+ Country Code" required /></div>
                    <div className="field"><label htmlFor="ov-email">Email Address</label><input type="email" id="ov-email" required /></div>
                  </div>
                  <div className="frow">
                    <div className="field"><label htmlFor="ov-date">Preferred Date</label><input type="date" id="ov-date" min={new Date().toISOString().split('T')[0]} required /></div>
                    <div className="field">
                      <label htmlFor="ov-time">Preferred Time Slot</label>
                      <select id="ov-time" required defaultValue="">
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
                    <label htmlFor="ov-program">Programme of Interest</label>
                    <select id="ov-program" required defaultValue="">
                      <option value="">Select a programme</option>
                      <option>Andorra Residency by Investment</option>
                      <option>Languages</option>
                      <option>Study Abroad</option>
                      <option>Visa Guidance</option>
                      <option>Other PR / Residency Programmes</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-dark" disabled={officeLoading}>{officeLoading ? 'Sending...' : 'Request Office Visit'}</button>
                  {(officeMsg || officeSubmitted) && (
                    <div className={`success show${officeSuccess ? '' : ''}`} style={!officeSuccess && officeMsg ? {background:'rgba(220,38,38,.08)',border:'1px solid #ef4444',color:'#b91c1c'} : undefined}>
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

export default AndorraPRPage;