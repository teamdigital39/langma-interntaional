import React, { useState, useEffect } from 'react';
import { useResidencyLeadForms } from '../../hooks/useResidencyLeadForms';
import { todayStr } from '../../utils/residencyFormHelpers';

const SERVICE = 'Portugal D7 Visa';

const PortugalD7VisaPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadSubmitted, officeSubmitted,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Portugal D7 Consultation' });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.d7-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="d7-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        .d7-page * { margin:0; padding:0; box-sizing:border-box; }
        .d7-page {
          font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
          color:#296166;
          background:#F5F8F6;
          line-height:1.7;
          font-weight:400;
          -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        .d7-page h1,.d7-page h2,.d7-page h3,.d7-page h4 {
          font-family:'Cormorant Garamond',Georgia,serif;
          font-weight:600;
          color:#296166;
          line-height:1.12;
          letter-spacing:0.2px;
        }
        .d7-page img { display:block; width:100%; height:100%; object-fit:cover; }

        .d7-page .container { max-width:1200px; margin:0 auto; padding:0 30px; }
        .d7-page .block { padding:108px 0; }

        .d7-page .eyebrow { font-family:'Inter',sans-serif; text-transform:uppercase; letter-spacing:3.5px; font-size:11.5px; color:#6FE0C6; font-weight:600; margin-bottom:18px; display:flex; align-items:center; gap:12px; }
        .d7-page .eyebrow::before { content:""; width:34px; height:1px; background:#6FE0C6; display:inline-block; }
        .d7-page .eyebrow.center { justify-content:center; }
        .d7-page .eyebrow.light { color:#6FE0C6; }
        .d7-page .eyebrow.light::before { background:#6FE0C6; }

        .d7-page .section-head { max-width:760px; margin:0 auto 60px; text-align:center; }
        .d7-page .section-head h2 { font-size:clamp(34px,4.6vw,54px); margin-bottom:18px; }
        .d7-page .section-head p { color:#296166; font-size:17px; }
        .d7-page .section-head.light h2 { color:#F5F8F6; }
        .d7-page .section-head.light p { color:rgba(247,250,252,0.72); }

        .d7-page .btn { display:inline-flex; align-items:center; gap:10px; font-family:'Inter',sans-serif; font-size:14px; font-weight:600; letter-spacing:0.4px; padding:16px 32px; border-radius:4px; cursor:pointer; border:1px solid transparent; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .d7-page .btn-primary { background:#6FE0C6; color:#296166; }
        .d7-page .btn-primary:hover { background:#6FE0C6; transform:translateY(-2px); box-shadow:0 14px 30px rgba(47,199,161,.28); }
        .d7-page .btn-ghost { background:transparent; color:#1A2540; border:2px solid #2FC7A1; }
        .d7-page .btn-ghost:hover { border-color:#6FE0C6; color:#6FE0C6; }
        .d7-page .btn-dark { background:#296166; color:#F5F8F6; }
        .d7-page .btn-dark:hover { background:#296166; transform:translateY(-2px); }

        .d7-page .azulejo { height:18px; width:100%; background:radial-gradient(circle at 10px 9px, #6FE0C6 0 2px, transparent 2.5px),radial-gradient(circle at 0 0, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px),radial-gradient(circle at 20px 0, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px),radial-gradient(circle at 0 18px, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px),radial-gradient(circle at 20px 18px, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px); background-size:20px 18px; background-repeat:repeat-x; background-position:left center; background-color:#296166; display:block; overflow:hidden; opacity:.92; }

        /* Hero */
        .d7-page .hero { position:relative; min-height:auto; display:flex; align-items:center; color:#1B2B28; overflow:hidden; background:#FFFFFF;padding:72px 0 48px; }
        .d7-page .hero::before { content:""; position:absolute; inset:0; background-image:radial-gradient(circle at 20% 50%, rgba(47,199,161,0.08) 0%, transparent 50%),radial-gradient(circle at 80% 20%, rgba(47,199,161,0.05) 0%, transparent 40%); z-index:0; pointer-events:none; }
        .d7-page .hero-split { position:relative; z-index:2; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; padding-top:0; padding-bottom:0; }
        .d7-page .hero-copy { display:flex; flex-direction:column; }
        .d7-page .hero h1 { font-size:clamp(38px,5vw,68px); color:#1B2B28; margin-bottom:26px; font-weight:600; line-height:1.08; }
        .d7-page .hero h1 em { font-style:italic; color:#4FA3D1; font-weight:500; }
        .d7-page .hero .lead { font-size:17.5px; color:#4C5C58; max-width:560px; margin-bottom:38px; font-weight:300; line-height:1.72; }
        .d7-page .hero-cta { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:48px; }
        .d7-page .hero-badges { display:flex; gap:36px; flex-wrap:wrap; border-top:1px solid #D8E0EC; padding-top:28px; }
        .d7-page .hero-badge .num { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; line-height:1; }
        .d7-page .hero-badge .num span { font-size:16px; }
        .d7-page .hero-badge .lbl { font-size:11.5px; letter-spacing:.6px; color:#7E8C88; margin-top:6px; }
        .d7-page .hero-visual { display:flex; align-items:center; justify-content:center; position:relative; }
        .d7-page .hero-img-frame { position:relative; width:100%; max-width:520px; border-radius:12px; overflow:hidden; box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22); }
        .d7-page .hero-img-frame img { display:block; width:100%; height:480px; object-fit:cover; border-radius:12px; transition:transform .9s cubic-bezier(.22,.61,.36,1); }
        .d7-page .hero-img-frame:hover img { transform:scale(1.04); }
        .d7-page .hero-img-frame::after { content:""; position:absolute; inset:12px; border:1px solid rgba(47,199,161,.38); border-radius:8px; pointer-events:none; z-index:2; }
        .d7-page .hero-img-frame::before { content:""; position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.42) 0%,transparent 55%); z-index:1; border-radius:12px; pointer-events:none; }
        .d7-page .hero-visual::before { content:""; position:absolute; top:24px; right:-14px; width:100%; max-width:520px; height:100%; border:1px solid rgba(47,199,161,.18); border-radius:12px; pointer-events:none; }
        .d7-page .hero-img-badge { position:absolute; bottom:22px; left:22px; z-index:3; background:rgba(26,37,64,.82); backdrop-filter:blur(8px); border:1px solid rgba(47,199,161,.30); border-radius:6px; padding:10px 16px; display:flex; align-items:center; gap:10px; }
        .d7-page .dot-pulse { width:8px; height:8px; border-radius:50%; background:#6FE0C6; flex-shrink:0; animation:pulse-dot 2s ease infinite; }
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.6; transform:scale(.85); } }
        .d7-page .hero-img-badge span { font-size:12px; letter-spacing:.5px; color:rgba(247,250,252,.88); font-weight:500; }
        .d7-page .scroll-hint { position:absolute; bottom:30px; left:50%; transform:translateX(-50%); z-index:2; font-size:10.5px; letter-spacing:3px; text-transform:uppercase; color:rgba(247,250,252,.5); display:flex; flex-direction:column; align-items:center; gap:8px; }
        .d7-page .scroll-hint .line { width:1px; height:38px; background:linear-gradient(#6FE0C6,transparent); animation:drop 2s cubic-bezier(.22,.61,.36,1) infinite; }
        @keyframes drop { 0% { transform:scaleY(0); transform-origin:top; } 50% { transform:scaleY(1); transform-origin:top; } 51% { transform-origin:bottom; } 100% { transform:scaleY(0); transform-origin:bottom; } }

        /* Stats Bar */
        .d7-page .stats-bar { background:#296166; color:#F5F8F6; }
        .d7-page .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .d7-page .stat-cell { padding:52px 30px; text-align:center; border-right:1px solid rgba(247,250,252,.10); }
        .d7-page .stat-cell:last-child { border-right:none; }
        .d7-page .stat-cell .v { font-family:'Cormorant Garamond',serif; font-size:46px; font-weight:600; color:#6FE0C6; line-height:1; margin-bottom:12px; }
        .d7-page .stat-cell .k { font-size:13px; letter-spacing:.5px; color:rgba(247,250,252,.78); }

        /* About */
        .d7-page .about { background:#F5F8F6; }
        .d7-page .about-grid { display:grid; grid-template-columns:1.05fr 1fr; gap:64px; align-items:center; }
        .d7-page .about-copy h2 { font-size:clamp(32px,4.4vw,52px); margin-bottom:22px; }
        .d7-page .about-copy p { color:#296166; margin-bottom:18px; font-size:16.5px; }
        .d7-page .about-media { position:relative; height:560px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .d7-page .about-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .d7-page .facts-row { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-top:54px; }
        .d7-page .fact { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:26px 22px; text-align:center; }
        .d7-page .fact .ff { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; }
        .d7-page .fact .fl { font-size:12.5px; color:#296166; letter-spacing:.4px; margin-top:6px; }

        /* Why Portugal */
        .d7-page .why { background:#E9F1EE; }
        .d7-page .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#296166; border:1px solid #296166; border-radius:4px; overflow:hidden; }
        .d7-page .why-card { background:#F5F8F6; padding:42px 34px; transition:background .3s; }
        .d7-page .why-card:hover { background:#fff; }
        .d7-page .why-card .ic { width:46px; height:46px; border:1px solid #6FE0C6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#296166; font-family:'Cormorant Garamond',serif; font-size:21px; margin-bottom:20px; }
        .d7-page .why-card h3 { font-size:24px; margin-bottom:10px; }
        .d7-page .why-card p { color:#296166; font-size:15px; }

        /* Programme */
        .d7-page .prog { background:#296166; color:#F5F8F6; }
        .d7-page .prog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .d7-page .prog-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:4px; padding:38px 32px; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .d7-page .prog-card:hover { border-color:#6FE0C6; transform:translateY(-6px); }
        .d7-page .prog-card .no { font-family:'Cormorant Garamond',serif; font-size:18px; color:#6FE0C6; border-bottom:1px solid rgba(247,250,252,.16); padding-bottom:14px; margin-bottom:18px; letter-spacing:2px; }
        .d7-page .prog-card h3 { color:#F5F8F6; font-size:25px; margin-bottom:12px; }
        .d7-page .prog-card p { color:rgba(247,250,252,.74); font-size:15px; }

        /* Benefits */
        .d7-page .benefits { background:#F5F8F6; }
        .d7-page .ben-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .d7-page .ben-card { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:36px 30px; position:relative; overflow:hidden; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .d7-page .ben-card::before { content:""; position:absolute; top:0; left:0; width:3px; height:0; background:#6FE0C6; transition:height .4s cubic-bezier(.22,.61,.36,1); }
        .d7-page .ben-card:hover { box-shadow:0 18px 50px rgba(26,37,64,.08); transform:translateY(-4px); }
        .d7-page .ben-card:hover::before { height:100%; }
        .d7-page .ben-card .mk { font-family:'Cormorant Garamond',serif; font-size:15px; color:#296166; letter-spacing:2px; margin-bottom:16px; }
        .d7-page .ben-card h3 { font-size:23px; margin-bottom:10px; }
        .d7-page .ben-card p { color:#296166; font-size:15px; }

        /* Finance */
        .d7-page .finance { background:#E9F1EE; }
        .d7-page .fin-table { background:#fff; border:1px solid #E5E5E5; border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .d7-page .fin-row { display:grid; grid-template-columns:1.4fr 1fr 1fr; align-items:center; border-bottom:1px solid #E5E5E5; }
        .d7-page .fin-row:last-child { border-bottom:none; }
        .d7-page .fin-row.head { background:#296166; color:#F5F8F6; }
        .d7-page .fin-row.head .fc { color:#F5F8F6; font-weight:600; font-family:'Inter',sans-serif; font-size:13px; letter-spacing:.6px; text-transform:uppercase; }
        .d7-page .fc { padding:22px 28px; font-size:15.5px; }
        .d7-page .fc.label { font-weight:600; color:#296166; }
        .d7-page .fc.fig { font-family:'Cormorant Garamond',serif; font-size:24px; color:#296166; font-weight:600; }
        .d7-page .fin-row.total { background:rgba(47,199,161,.08); }
        .d7-page .fin-note { margin-top:24px; font-size:13.5px; color:#296166; text-align:center; font-style:italic; }
        .d7-page .fin-extra { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:40px; }
        .d7-page .fin-x { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:28px; }
        .d7-page .fin-x h4 { font-size:21px; margin-bottom:8px; }
        .d7-page .fin-x p { color:#296166; font-size:14.5px; }

        /* Family */
        .d7-page .family { background:#F5F8F6; }
        .d7-page .fam-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .d7-page .fam-list { list-style:none; }
        .d7-page .fam-list li { display:flex; gap:18px; padding:22px 0; border-bottom:1px solid #E5E5E5; }
        .d7-page .fam-list li:last-child { border-bottom:none; }
        .d7-page .fi { flex:0 0 42px; height:42px; border-radius:50%; background:#296166; color:#6FE0C6; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:19px; }
        .d7-page .fam-list h4 { font-size:21px; margin-bottom:2px; }
        .d7-page .fam-list p { color:#296166; font-size:14.5px; }
        .d7-page .fam-media { height:520px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); position:relative; }
        .d7-page .fam-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; }

        /* Process */
        .d7-page .process { background:#296166; color:#F5F8F6; }
        .d7-page .timeline { position:relative; max-width:880px; margin:0 auto; }
        .d7-page .timeline::before { content:""; position:absolute; left:31px; top:8px; bottom:8px; width:1px; background:rgba(247,250,252,.18); }
        .d7-page .tl-item { position:relative; padding-left:92px; padding-bottom:44px; }
        .d7-page .tl-item:last-child { padding-bottom:0; }
        .d7-page .tl-item .dot { position:absolute; left:0; top:0; width:64px; height:64px; border-radius:50%; border:1px solid #6FE0C6; background:#296166; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:24px; color:#6FE0C6; }
        .d7-page .tl-item h3 { color:#F5F8F6; font-size:25px; margin-bottom:6px; }
        .d7-page .tl-item p { color:rgba(247,250,252,.72); font-size:15px; max-width:620px; }

        /* Life */
        .d7-page .life { background:#F5F8F6; }
        .d7-page .life-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .d7-page .life-card { position:relative; height:420px; border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .d7-page .life-card img { transition:transform .8s cubic-bezier(.22,.61,.36,1); }
        .d7-page .life-card:hover img { transform:scale(1.06); }
        .d7-page .life-card .ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.88) 0%,rgba(26,37,64,.18) 55%,transparent 100%); z-index:1; }
        .d7-page .life-card .cap { position:absolute; left:0; right:0; bottom:0; z-index:2; padding:30px 28px; }
        .d7-page .life-card .cap h3 { color:#F5F8F6; font-size:27px; margin-bottom:6px; }
        .d7-page .life-card .cap p { color:rgba(247,250,252,.82); font-size:14px; }
        .d7-page .life-strip { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; margin-top:48px; }
        .d7-page .life-tag { border:1px solid #296166; border-radius:40px; padding:10px 22px; font-size:13.5px; color:#296166; background:#fff; }

        /* Why Langma */
        .d7-page .langma { background:#296166; color:#F5F8F6; position:relative; overflow:hidden; }
        .d7-page .langma-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:center; }
        .d7-page .langma h2 { color:#F5F8F6; font-size:clamp(32px,4.4vw,52px); margin-bottom:20px; }
        .d7-page .langma .lead { color:rgba(247,250,252,.82); font-size:17px; margin-bottom:14px; }
        .d7-page .lg-list { display:grid; grid-template-columns:1fr 1fr; gap:30px 36px; }
        .d7-page .lg-item h4 { color:#6FE0C6; font-size:22px; margin-bottom:6px; }
        .d7-page .lg-item p { color:rgba(247,250,252,.72); font-size:14.5px; }

        /* FAQ */
        .d7-page .faq { background:#F5F8F6; }
        .d7-page .faq-wrap { max-width:880px; margin:0 auto; }
        .d7-page .faq-item { border-bottom:1px solid #E5E5E5; }
        .d7-page .faq-q { width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:28px 0; display:flex; justify-content:space-between; align-items:center; gap:24px; font-family:'Cormorant Garamond',serif; font-size:23px; color:#296166; font-weight:600; }
        .d7-page .faq-q .pm { flex:0 0 30px; height:30px; border:1px solid #6FE0C6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#296166; font-family:'Inter',sans-serif; font-size:18px; transition:all .3s; }
        .d7-page .faq-item.open .pm { background:#6FE0C6; color:#296166; transform:rotate(45deg); }
        .d7-page .faq-a { max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(.22,.61,.36,1); }
        .d7-page .faq-a p { padding:0 0 28px; color:#296166; font-size:16px; max-width:760px; }

        /* Lead Form */
        .d7-page .lead-sec { background:#296166; color:#F5F8F6; }
        .d7-page .lead-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:start; }
        .d7-page .lead-copy h2 { color:#F5F8F6; font-size:clamp(32px,4.2vw,50px); margin-bottom:20px; }
        .d7-page .lead-copy p { color:rgba(247,250,252,.80); margin-bottom:26px; font-size:16.5px; }
        .d7-page .lead-assure { list-style:none; }
        .d7-page .lead-assure li { display:flex; gap:12px; align-items:center; padding:11px 0; color:rgba(247,250,252,.86); font-size:15px; }
        .d7-page .lead-assure li::before { content:"✓"; color:#6FE0C6; font-weight:700; }
        .d7-page .form-card { background:#F5F8F6; border-radius:4px; padding:42px; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .d7-page .form-card h3 { font-size:27px; margin-bottom:6px; }
        .d7-page .form-card .fsub { color:#296166; font-size:14.5px; margin-bottom:26px; }
        .d7-page .frow { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .d7-page .field { margin-bottom:16px; }
        .d7-page .field label { display:block; font-size:12px; letter-spacing:.5px; text-transform:uppercase; color:#296166; font-weight:600; margin-bottom:7px; }
        .d7-page .field input,.d7-page .field select { width:100%; padding:13px 15px; border:1px solid #E5E5E5; border-radius:4px; font-family:'Inter',sans-serif; font-size:15px; background:#fff; color:#296166; transition:border-color .25s; }
        .d7-page .field input:focus,.d7-page .field select:focus { outline:none; border-color:#6FE0C6; box-shadow:0 0 0 3px rgba(47,199,161,.15); }
        .d7-page .form-card .btn { width:100%; justify-content:center; margin-top:6px; }
        .d7-page .form-card .disc { font-size:12px; color:#296166; margin-top:14px; text-align:center; }
        .d7-page .success { display:none; background:rgba(47,199,161,.12); border:1px solid #6FE0C6; border-radius:4px; padding:16px; color:#296166; font-size:14.5px; text-align:center; margin-top:16px; }
        .d7-page .success.show { display:block; }

        /* Office */
        .d7-page .office { background:#E9F1EE; }
        .d7-page .office-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:60px; align-items:center; }
        .d7-page .office-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:18px; }
        .d7-page .office-copy p { color:#296166; font-size:16.5px; margin-bottom:26px; }
        .d7-page .office-points { list-style:none; margin-bottom:8px; }
        .d7-page .office-points li { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid #E5E5E5; }
        .d7-page .office-points .oi { flex:0 0 38px; height:38px; border-radius:50%; border:1px solid #6FE0C6; color:#296166; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; }
        .d7-page .office-points h4 { font-size:19px; margin-bottom:1px; }
        .d7-page .office-points p { font-size:14px; margin:0; }
        .d7-page .office-form { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:40px; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .d7-page .office-form h3 { font-size:25px; margin-bottom:22px; }

        /* Reveal Animation */
        .d7-page .reveal { opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1); }
        .d7-page .reveal.in { opacity:1; transform:none; }

        /* Responsive */
        @media(max-width:980px) {
          .d7-page .about-grid, .d7-page .fam-grid, .d7-page .langma-grid, .d7-page .lead-grid, .d7-page .office-grid { grid-template-columns:1fr; gap:40px; }
          .d7-page .stats-grid, .d7-page .why-grid, .d7-page .prog-grid, .d7-page .ben-grid, .d7-page .life-grid, .d7-page .fin-extra { grid-template-columns:1fr 1fr; }
          .d7-page .facts-row { grid-template-columns:1fr 1fr; }
          .d7-page .lg-list { grid-template-columns:1fr; }
          .d7-page .about-media, .d7-page .fam-media { height:420px; }
          .d7-page .hero-split { grid-template-columns:1fr; gap:36px; padding-top:0; padding-bottom:32px; }
          .d7-page .hero-img-frame img { height:380px; }
          .d7-page .hero-visual::before { display:none; }
          .d7-page .hero-img-frame { max-width:100%; }
        }
        @media(max-width:640px) {
          .d7-page .block { padding:74px 0; }
          .d7-page .container { padding:0 22px; }
          .d7-page .stats-grid, .d7-page .why-grid, .d7-page .prog-grid, .d7-page .ben-grid, .d7-page .life-grid, .d7-page .fin-extra, .d7-page .facts-row { grid-template-columns:1fr; }
          .d7-page .stat-cell { border-right:none; border-bottom:1px solid rgba(247,250,252,.10); }
          .d7-page .frow { grid-template-columns:1fr; }
          .d7-page .fin-row { grid-template-columns:1fr; }
          .d7-page .fc { padding:14px 20px; }
          .d7-page .fin-row.head { display:none; }
          .d7-page .hero-badges { gap:26px; }
          .d7-page .form-card, .d7-page .office-form { padding:30px; }
          .d7-page .hero-split { padding-top:0; padding-bottom:24px; gap:28px; }
          .d7-page .hero-img-frame img { height:280px; }
        }
        @media(prefers-reduced-motion:reduce) {
          .d7-page * { animation:none!important; transition:none!important; }
          .d7-page .reveal { opacity:1; transform:none; }
        }
        /* PR hero responsive fix */
        @media(max-width:980px){
          .d7-page .hero{padding:64px 0 40px;}
          .d7-page .hero-split{grid-template-columns:1fr !important;gap:36px !important;padding-top:0 !important;}
          .d7-page .hero-visual{order:-1;max-width:560px;margin:0 auto;width:100%;}
          .d7-page .hero-badges{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;}
        }
        @media(max-width:640px){
          .d7-page .hero{padding:56px 0 32px;}
          .d7-page .hero-cta{flex-direction:column;}
          .d7-page .hero-cta .btn{width:100%;justify-content:center;}
          .d7-page .hero-badges{grid-template-columns:1fr;}
        }
      `}</style>

      <main>
        {/* ===== HERO ===== */}
        <section className="hero">
          <div className="container">
            <div className="hero-split">
              <div className="hero-copy">
                <span className="eyebrow light">Portugal D7 Visa · Passive Income Residence Programme</span>
                <h1>Portugal D7 Visa: your gateway to <em>European residency</em> through passive income</h1>
                <p className="lead">The D7 is Portugal's residence visa for individuals and families who live on stable, recurring passive income — retirees, investors, remote professionals and the financially independent. Portugal draws global residents with its safety, EU and Schengen membership, fine climate and gentler pace of life. Langma International guides you from first eligibility review through to an issued residence permit — quietly, methodically and on the right side of every regulation.</p>
                <div className="hero-cta">
                  <a href="#lead" className="btn btn-primary">Book Your Private Consultation</a>
                  <a href="#programme" className="btn btn-ghost">Explore the D7 Visa</a>
                </div>
                <div className="hero-badges">
                  <div className="hero-badge"><div className="num">€920<span style={{fontSize:16}}>/mo</span></div><div className="lbl">2026 reference income</div></div>
                  <div className="hero-badge"><div className="num">2 + 3</div><div className="lbl">Year residence permit cycle</div></div>
                  <div className="hero-badge"><div className="num">EU</div><div className="lbl">Member-state residence</div></div>
                  <div className="hero-badge"><div className="num">Family</div><div className="lbl">Reunification supported</div></div>
                </div>
              </div>
              <div className="hero-visual">
                <div className="hero-img-frame">
                  <img src="https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=1200" alt="Lisbon's terracotta rooftops descending toward the Tagus river at dusk" />
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

        <div className="azulejo" aria-hidden="true"></div>

        {/* ===== STATS BAR ===== */}
        <section className="stats-bar">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-cell d7-reveal"><div className="v">€11,040</div><div className="k">Annual income reference, single applicant (2026)</div></div>
              <div className="stat-cell d7-reveal"><div className="v">5 yrs</div><div className="k">Legal residence toward permanent residence</div></div>
              <div className="stat-cell d7-reveal"><div className="v">Schengen</div><div className="k">Visa-free travel as a permit holder</div></div>
              <div className="stat-cell d7-reveal"><div className="v">2007</div><div className="k">Programme established under Law 23/2007</div></div>
            </div>
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section className="block about" id="about">
          <div className="container">
            <div className="about-grid">
              <div className="about-copy d7-reveal">
                <span className="eyebrow">Discover Portugal</span>
                <h2>Portugal: a stable, unhurried home on the western shore of Europe</h2>
                <p>The westernmost country in mainland Europe, Portugal occupies the Atlantic edge of the Iberian Peninsula, bordered only by Spain and the ocean. Home to around 10.3 million people, it is one of the European Union's most established democracies and a long-standing member of the Schengen Area. Portuguese is the official language, while English is widely spoken in the cities and tourism regions; the currency is the euro and the capital is Lisbon.</p>
                <p>Its economy is diversified and increasingly international — anchored by tourism, business services, manufacturing, a growing technology sector and notable strength in renewable energy, alongside a long-held global lead in cork production. Mild Atlantic and Mediterranean climates, a respected public healthcare system, international schools in the major cities and excellent flight connectivity make it a natural base for families relocating from further afield.</p>
                <p>For passive-income earners, the appeal is straightforward: a genuine place to live, not merely a document — with a cost of living that remains modest by Western European standards.</p>
              </div>
              <div className="about-media d7-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1200" alt="Sunlit coastal town in Portugal with whitewashed buildings above the sea" />
              </div>
            </div>
            <div className="facts-row">
              <div className="fact d7-reveal"><div className="ff">10.3M</div><div className="fl">Population</div></div>
              <div className="fact d7-reveal"><div className="ff">Lisbon</div><div className="fl">Capital city</div></div>
              <div className="fact d7-reveal"><div className="ff">Euro&nbsp;(€)</div><div className="fl">Official currency</div></div>
              <div className="fact d7-reveal"><div className="ff">EU &amp; Schengen</div><div className="fl">Member state since 1986</div></div>
            </div>
          </div>
        </section>

        {/* ===== WHY PORTUGAL ===== */}
        <section className="block why">
          <div className="container">
            <div className="section-head d7-reveal">
              <span className="eyebrow center">Why Global Families Choose Portugal</span>
              <h2>The reasons people relocate — and the reasons they stay</h2>
              <p>Beyond the residence permit itself, Portugal offers a quality of life that holds up to scrutiny long after the paperwork is signed.</p>
            </div>
            <div className="why-grid">
              {[
                { ic: '★', t: 'EU member-state residence', p: 'A residence permit in a stable European Union country, with the right to live in Portugal and travel visa-free across the Schengen Area.' },
                { ic: '⏚', t: 'Safety and stability', p: 'One of the most peaceful nations in the world, with stable institutions, the rule of law and low rates of violent crime.' },
                { ic: '❋', t: 'Atlantic & Mediterranean lifestyle', p: 'Coastline, sunshine, celebrated cuisine and an unhurried daily rhythm that draws retirees and remote professionals alike.' },
                { ic: '✎', t: 'International schooling', p: 'Established international and bilingual schools in Lisbon, Porto, Cascais and the Algarve serve relocating families.' },
                { ic: '✚', t: 'Healthcare access', p: "Access to Portugal's national health service alongside a well-regarded private sector and English-speaking practitioners." },
                { ic: '⌖', t: 'Global connectivity', p: 'Direct flights from Lisbon, Porto and Faro across Europe, the Americas and Africa keep family and business within reach.' },
              ].map((c, i) => (
                <div className="why-card d7-reveal" key={i}><div className="ic">{c.ic}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        <div className="azulejo" aria-hidden="true"></div>

        {/* ===== PROGRAMME ===== */}
        <section className="block prog" id="programme">
          <div className="container">
            <div className="section-head d7-reveal light">
              <span className="eyebrow center" style={{color:'#6FE0C6'}}>The Programme</span>
              <h2>The Portugal D7 Visa, explained clearly</h2>
              <p>A residence route built around financial self-sufficiency rather than investment — accessible, regulated and genuinely lived-in.</p>
            </div>
            <div className="prog-grid">
              {[
                { no: '01 · DEFINITION', t: 'What is the D7 Visa?', p: 'A long-stay residence visa for non-EU/EEA/Swiss nationals who can show stable, regular passive income from outside Portugal. Often called the passive-income or retirement visa, it grants the right to reside in Portugal.' },
                { no: '02 · ELIGIBILITY', t: 'Who can apply?', p: 'Adults aged 18 or over with a clean criminal record, valid health insurance and accommodation in Portugal, whose means of support come from passive income rather than local employment.' },
                { no: '03 · INCOME', t: 'The passive income test', p: 'Income tied to the Portuguese minimum wage — €920 per month in 2026 — from pensions, dividends, rental income, royalties or interest. The requirement scales upward for accompanying family members.' },
                { no: '04 · STRUCTURE', t: 'The residence permit', p: 'The consular visa allows entry to Portugal, where the holder applies to AIMA for a residence permit. The first permit is issued for two years.' },
                { no: '05 · RENEWAL', t: 'Renewal cycle', p: 'The initial two-year permit may be renewed for a further three years, provided the holder still meets the income and residence conditions and maintains a genuine link to Portugal.' },
                { no: '06 · PATHWAY', t: 'Long-term pathway', p: 'After five years of legal residence, holders may become eligible to apply for permanent residence — and, separately, for citizenship under the conditions set by Portuguese nationality law.' },
              ].map((c, i) => (
                <div className="prog-card d7-reveal" key={i}><div className="no">{c.no}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BENEFITS ===== */}
        <section className="block benefits">
          <div className="container">
            <div className="section-head d7-reveal">
              <span className="eyebrow center">Key Benefits</span>
              <h2>What the D7 residence permit makes possible</h2>
              <p>The advantages of the programme extend across daily life, family and the long-term horizon.</p>
            </div>
            <div className="ben-grid">
              {[
                { mk: 'I', t: 'Residence in Portugal', p: 'The legal right to live in Portugal as an EU member state, with a recognised residence card for you and your family.' },
                { mk: 'II', t: 'Family reunification', p: 'The possibility to include a spouse or partner, dependent children and, in defined cases, dependent parents within the same residency framework.' },
                { mk: 'III', t: 'Schengen mobility', p: 'As a Portuguese residence-permit holder, the ability to travel visa-free for short stays across the Schengen Area.' },
                { mk: 'IV', t: 'Education access', p: "Access for the family to Portugal's public, private and international education options, from primary school to university." },
                { mk: 'V', t: 'Healthcare access', p: "Eligibility to register with Portugal's national health service, complemented by a strong private healthcare sector." },
                { mk: 'VI', t: 'Route to permanence', p: 'A clear pathway toward permanent residence after five years, and potential citizenship eligibility subject to the legal requirements in force at the time.' },
              ].map((c, i) => (
                <div className="ben-card d7-reveal" key={i}><div className="mk">{c.mk}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINANCIAL REQUIREMENTS ===== */}
        <section className="block finance" id="finance">
          <div className="container">
            <div className="section-head d7-reveal">
              <span className="eyebrow center">Financial Requirements</span>
              <h2>What you need to demonstrate</h2>
              <p>The D7 is built on proof of stable means rather than a lump-sum investment. The figures below reflect the 2026 minimum-wage reference.</p>
            </div>
            <div className="fin-table d7-reveal">
              <div className="fin-row head"><div className="fc">Applicant category</div><div className="fc">Monthly income reference</div><div className="fc">Annual equivalent</div></div>
              <div className="fin-row"><div className="fc label">Main applicant — 100% of minimum wage</div><div className="fc fig">€920</div><div className="fc fig">€11,040</div></div>
              <div className="fin-row"><div className="fc label">Spouse / second adult — +50%</div><div className="fc fig">€460</div><div className="fc fig">€5,520</div></div>
              <div className="fin-row"><div className="fc label">Each dependent child — +30%</div><div className="fc fig">€276</div><div className="fc fig">€3,312</div></div>
              <div className="fin-row total"><div className="fc label">Illustration: family of four (2 adults, 2 children)</div><div className="fc fig">€1,932</div><div className="fc fig">€23,184</div></div>
            </div>
            <p className="fin-note">Income thresholds are tied to Portugal's national minimum wage; figures are indicative for 2026. Requirements may be updated by Portuguese authorities and should be verified during the application process. This is general information, not legal or financial advice.</p>
            <div className="fin-extra">
              {[
                { t: 'Proof of passive income', p: 'Regular, verifiable income from pensions, dividends, rental property, royalties or interest — documented through bank statements and supporting certificates.' },
                { t: 'Savings in a Portuguese account', p: 'A practical benchmark of roughly twelve months of the required income held in a Portuguese bank account — around €11,040 for a single applicant, more for families.' },
                { t: 'Accommodation', p: 'A long-term rental agreement (typically twelve months or more) or a property purchase in Portugal establishing a registered address. There is no minimum property value.' },
              ].map((c, i) => <div className="fin-x d7-reveal" key={i}><h4>{c.t}</h4><p>{c.p}</p></div>)}
            </div>
            <div className="fin-extra" style={{marginTop:22}}>
              {[
                { t: 'Valid passport & documents', p: 'A passport valid well beyond the intended stay, your NIF tax number, biometric photographs and the certified, apostilled documents your file requires.' },
                { t: 'Clean criminal record', p: 'A recent criminal record certificate from your country of nationality and anywhere you have lived long-term, confirming good standing.' },
                { t: 'Health insurance & compliance', p: "Valid private health coverage for the initial period, plus full compliance with Portugal's immigration requirements throughout the process." },
              ].map((c, i) => <div className="fin-x d7-reveal" key={i}><h4>{c.t}</h4><p>{c.p}</p></div>)}
            </div>
          </div>
        </section>

        {/* ===== FAMILY ===== */}
        <section className="block family">
          <div className="container">
            <div className="fam-grid">
              <div className="fam-media d7-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200" alt="A family of four walking together along a sunlit promenade" />
              </div>
              <div className="d7-reveal">
                <span className="eyebrow">Eligible Applicants & Family</span>
                <h2 style={{fontSize:'clamp(30px,4vw,48px)',marginBottom:26}}>One application, your family included</h2>
                <ul className="fam-list">
                  {[
                    { n: '①', t: 'Main applicant', p: 'A non-EU/EEA/Swiss national aged 18+ meeting the income, accommodation and good-character requirements.' },
                    { n: '②', t: 'Spouse or registered partner', p: 'A legally recognised spouse or de facto partner, included through family reunification.' },
                    { n: '③', t: 'Dependent children', p: 'Minor children, and adult children who remain dependent and, where applicable, in full-time study.' },
                    { n: '④', t: 'Dependent parents', p: 'Dependent parents of the applicant or spouse may be included in defined circumstances, subject to assessment.' },
                  ].map((c, i) => (
                    <li key={i}><span className="fi">{c.n}</span><div><h4>{c.t}</h4><p>{c.p}</p></div></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROCESS ===== */}
        <section className="block process" id="process">
          <div className="container">
            <div className="section-head d7-reveal light">
              <span className="eyebrow center" style={{color:'#6FE0C6'}}>The Application Journey</span>
              <h2>A guided, six-stage process</h2>
              <p>Langma International coordinates each stage and introduces licensed Portuguese legal professionals where local representation is required.</p>
            </div>
            <div className="timeline">
              {[
                { d: '01', t: 'Eligibility assessment', p: 'A confidential review of your income, family composition and objectives to confirm the D7 is the right route — and to map the documentation ahead.' },
                { d: '02', t: 'Documentation preparation', p: 'Securing your NIF, opening a Portuguese bank account, arranging accommodation, health insurance and the certified, apostilled documents your file requires.' },
                { d: '03', t: 'Application submission', p: 'Filing the D7 visa application at the competent Portuguese consulate, with a complete and consistent evidence pack to support a smooth review.' },
                { d: '04', t: 'Visa decision', p: 'Consular assessment, typically over roughly 60 to 90 days. Once approved, the entry visa allows you to travel to Portugal to complete the process.' },
                { d: '05', t: 'Residence permit issuance', p: 'Attending your AIMA appointment in Portugal to provide biometrics and receive the two-year residence permit for you and your family.' },
                { d: '06', t: 'Long-term residency planning', p: 'Guidance on renewals, the genuine-residence requirements and your longer pathway toward permanent residence and, in time, naturalisation.' },
              ].map((s, i) => (
                <div className="tl-item d7-reveal" key={i}><div className="dot">{s.d}</div><h3>{s.t}</h3><p>{s.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        <div className="azulejo" aria-hidden="true"></div>

        {/* ===== LIFE IN PORTUGAL ===== */}
        <section className="block life">
          <div className="container">
            <div className="section-head d7-reveal">
              <span className="eyebrow center">Life in Portugal</span>
              <h2>Where will your family put down roots?</h2>
              <p>From a riverside capital to the surf coast of the south, Portugal offers distinct settings for distinct lives.</p>
            </div>
            <div className="life-grid">
              {[
                { img: 'https://images.unsplash.com/photo-1588535619791-4ba78de3e29e?q=80&w=1200', alt: "Lisbon's hills, yellow trams and pastel facades above the river", t: 'Lisbon', p: 'A sunlit, hilly capital of trams, miradouros and a thriving international community.' },
                { img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1200', alt: "Porto's Ribeira district and the Douro riverfront at golden hour", t: 'Porto', p: 'The dignified northern city of the Douro, port-wine cellars and old-world charm.' },
                { img: 'https://images.unsplash.com/photo-1591105575633-c3c5acba62b1?q=80&w=1200', alt: 'Golden cliffs and turquoise water along the Algarve coastline', t: 'The Algarve', p: 'Golden cliffs, calm beaches and a long-established community of relocating retirees.' },
              ].map((c, i) => (
                <div className="life-card d7-reveal" key={i}>
                  <img src={c.img} alt={c.alt} /><div className="ov"></div><div className="cap"><h3>{c.t}</h3><p>{c.p}</p></div>
                </div>
              ))}
            </div>
            <div className="life-strip">
              {['Coastal living','Celebrated cuisine','Safe, walkable cities','International communities','Mild winters','English widely spoken'].map((t, i) => (
                <span className="life-tag d7-reveal" key={i}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY LANGMA ===== */}
        <section className="block langma" id="langma">
          <div className="container">
            <div className="langma-grid">
              <div className="d7-reveal">
                <span className="eyebrow light">Why Langma International</span>
                <h2>A trusted partner for a process that deserves care</h2>
                <p className="lead">We help individuals and families access European residency through transparent guidance, strategic planning and genuinely personalised support — never overpromising, never guaranteeing outcomes we cannot control.</p>
                <p className="lead">From the first conversation to your residence card, you work with people who understand both the regulation and the human reality of relocating a life.</p>
              </div>
              <div className="lg-list d7-reveal">
                {[
                  { t: 'Global mobility expertise', p: 'Cross-border residency experience spanning Europe and beyond, applied to your specific circumstances.' },
                  { t: 'Personalised consultation', p: 'A considered assessment of your goals, family and finances — not a templated checklist.' },
                  { t: 'Documentation support', p: 'Hands-on help assembling, certifying and sequencing the paperwork that makes or breaks a file.' },
                  { t: 'Application guidance', p: 'Coordination through every official stage, with licensed Portuguese legal professionals where required.' },
                  { t: 'International network', p: 'Trusted partners on the ground — legal, banking and property — to keep your relocation moving.' },
                  { t: 'Transparent process', p: 'Clear timelines, honest expectations and plain answers about what is — and isnt — within reach.' },
                ].map((c, i) => <div className="lg-item" key={i}><h4>{c.t}</h4><p>{c.p}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="block faq" id="faq">
          <div className="container">
            <div className="section-head d7-reveal">
              <span className="eyebrow center">Frequently Asked Questions</span>
              <h2>Clear answers, accurately stated</h2>
            </div>
            <div className="faq-wrap">
              {[
                { q: 'What is the Portugal D7 Visa?', a: 'The D7 is a Portuguese residence visa introduced under Law No. 23/2007 for non-EU/EEA/Swiss nationals who can demonstrate stable, regular passive income from outside Portugal. Widely known as the passive-income or retirement visa, it leads to a residence permit allowing the holder and qualifying family members to live in Portugal.' },
                { q: 'Who qualifies?', a: 'Applicants are non-EU/EEA/Swiss nationals aged 18 or over with a clean criminal record, valid health insurance, accommodation in Portugal and verifiable passive income — typically from pensions, dividends, rental income, royalties or interest. The visa is intended for those who can support themselves without relying on local employment.' },
                { q: 'How much income is required?', a: 'The reference is the Portuguese minimum wage, set at €920 per month (around €11,040 per year) for 2026. The requirement increases by approximately 50% for a second adult and 30% for each dependent child. These thresholds are tied to the minimum wage and may change with government regulation.' },
                { q: 'Can family members apply?', a: 'Yes. Through family reunification the main applicant may include a spouse or registered partner, dependent children and, in defined circumstances, dependent parents. The income and savings thresholds rise for each additional family member.' },
                { q: 'Can the D7 Visa lead to permanent residence?', a: 'The D7 residence permit is issued for two years and renewable for a further three. After five years of legal residence, holders may become eligible to apply for permanent residence, subject to meeting all statutory conditions in force at the time, including language requirements.' },
                { q: 'Can D7 holders apply for citizenship?', a: 'Yes. Under the framework of Lei Orgânica n.º 1/2026, D7 Visa holders are eligible to transition to Permanent Residency after 5 years of legal residence. For full citizenship via naturalisation, the requirement is 10 years of legal residence (reduced to 7 years for EU and CPLP nationals), with the residency clock running from the date your initial permit is issued.' },
                { q: 'How long does the process take?', a: 'Consular processing of the visa typically takes around 60 to 90 days once a complete file is submitted. The full journey — preparation, consular decision, arrival and AIMA residence-permit issuance — commonly spans about four to eight months, depending on individual circumstances and administrative timelines.' },
                { q: 'Do applicants need to live in Portugal?', a: 'The D7 is designed for genuine residence. Holders are generally expected to spend a substantial part of the year in Portugal — at least 8 months per year (or a total of 16 months within the first two-year period) — and should not be absent for extended uninterrupted periods. Those wanting minimal physical presence may find an investment route more suitable.' },
                { q: 'Does the D7 Visa provide access to Schengen countries?', a: 'Yes. As the holder of a Portuguese residence permit, you may travel visa-free for short stays across the Schengen Area, subject to the standard limits and applicable rules. The permit confers the right to reside in Portugal; it does not automatically grant the right to live or work permanently in other EU or Schengen states.' },
              ].map((faq, i) => (
                <div className={`faq-item d7-reveal ${openFaq === i ? 'open' : ''}`} key={i}>
                  <button className="faq-q" onClick={() => toggleFaq(i)}>{faq.q}<span className="pm">{openFaq === i ? '−' : '+'}</span></button>
                  <div className="faq-a" style={{maxHeight: openFaq === i ? '500px' : '0'}}><p>{faq.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== LEAD FORM ===== */}
        <section className="block lead-sec" id="lead">
          <div className="container">
            <div className="lead-grid">
              <div className="lead-copy d7-reveal">
                <span className="eyebrow light">Begin Your Journey</span>
                <h2>Begin your Portugal residency journey with expert guidance</h2>
                <p>Share a few details and a Langma International advisor will arrange a confidential consultation to assess your eligibility and outline a realistic path forward — with no obligation.</p>
                <ul className="lead-assure">
                  {['Strictly confidential, no-obligation review','Honest assessment of your eligibility','Clear timelines and transparent guidance','Introductions to licensed Portuguese professionals'].map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
              <div className="form-card d7-reveal">
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
                    <label htmlFor="income">Primary source of passive income</label>
                    <select id="income" defaultValue=""><option value="" disabled>Please select</option><option>Pension</option><option>Dividends / investments</option><option>Rental income</option><option>Royalties / intellectual property</option><option>Other / combination</option></select>
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={leadLoading}>{leadLoading ? 'Sending...' : 'Request Consultation'}</button>
                  <p className="disc">By submitting, you agree to be contacted about your enquiry. Your details are kept confidential.</p>
                  {(leadMsg || leadSubmitted) && (
                    <div className="success show" style={!leadSuccess && leadMsg ? { background: 'rgba(220,38,38,.08)', border: '1px solid #ef4444', color: '#b91c1c' } : undefined}>
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
              <div className="office-copy d7-reveal">
                <span className="eyebrow">In Person</span>
                <h2>Schedule a private office consultation</h2>
                <p>Prefer to meet face to face? Sit down with our advisory team to talk through your eligibility and residency options in confidence.</p>
                <ul className="office-points">
                  {[
                    { i: '✦', t: 'Meet our advisory team', p: 'A direct conversation with the people who will guide your case.' },
                    { i: '✓', t: 'Discuss your eligibility', p: 'An honest review of your income, family and timeline.' },
                    { i: '↪', t: 'Understand your options', p: 'Compare the D7 with other Portuguese residence routes where relevant.' },
                  ].map((c, i) => <li key={i}><span className="oi">{c.i}</span><div><h4>{c.t}</h4><p>{c.p}</p></div></li>)}
                </ul>
              </div>
              <div className="office-form d7-reveal">
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
                      <select id="ov-time" required defaultValue=""><option value="" disabled>Select</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-dark" disabled={officeLoading}>{officeLoading ? 'Sending...' : 'Request Office Visit'}</button>
                  {(officeMsg || officeSubmitted) && (
                    <div className="success show" style={{ marginTop: 16, ...(!officeSuccess && officeMsg ? { background: 'rgba(220,38,38,.08)', border: '1px solid #ef4444', color: '#b91c1c' } : {}) }}>
                      {officeMsg || "Thank you — we'll be in touch shortly to confirm your visit."}
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

export default PortugalD7VisaPage;