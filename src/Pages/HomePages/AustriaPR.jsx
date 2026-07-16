import React, { useState, useEffect } from 'react';
import { useResidencyLeadForms } from '../../hooks/useResidencyLeadForms';

const SERVICE = 'Austria Residence Permit';

const AustriaResidencePage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadSubmitted, officeSubmitted,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Austria Residency Consultation' });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.at-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);
  const closeMenu = () => setMenuOpen(false);

  const calDays = [
    { n: 1 }, { n: 2, avail: true }, { n: 3, avail: true }, { n: 4 }, { n: 5, avail: true }, { n: 6 }, { n: 7 },
    { n: 8, avail: true }, { n: 9, avail: true }, { n: 10 }, { n: 11, avail: true }, { n: 12, avail: true }, { n: 13 }, { n: 14 },
  ];

  return (
    <div className="at-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        .at-page * { margin:0; padding:0; box-sizing:border-box; }
        .at-page {
          font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
          color:#296166;
          background:#F5F8F6;
          line-height:1.7;
          font-weight:400;
          -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        .at-page h1,.at-page h2,.at-page h3,.at-page h4 {
          font-family:'Cormorant Garamond',Georgia,serif;
          font-weight:600;
          color:#296166;
          line-height:1.12;
          letter-spacing:0.2px;
        }
        .at-page img { display:block; width:100%; height:100%; object-fit:cover; }
        .at-page .container { max-width:1200px; margin:0 auto; padding:0 30px; }
        .at-page .block { padding:108px 0; }

        /* Header */
        .at-page .site-header {
          position:fixed; top:0; left:0; right:0; z-index:1000;
          padding:22px 0; transition:all .4s cubic-bezier(.22,.61,.36,1);
        }
        .at-page .site-header.scrolled {
          background:rgba(7,19,31,0.96); backdrop-filter:blur(12px);
          padding:14px 0; box-shadow:0 6px 30px rgba(0,0,0,.28);
        }
        .at-page .nav-wrap { display:flex; align-items:center; justify-content:space-between; }
        .at-page .brand { display:flex; flex-direction:column; line-height:1; text-decoration:none; }
        .at-page .brand .name { font-family:'Cormorant Garamond',serif; font-size:25px; font-weight:600; color:#F5F8F6; letter-spacing:1px; }
        .at-page .brand .tag { font-family:'Inter',sans-serif; font-size:9.5px; letter-spacing:3px; text-transform:uppercase; color:#6FE0C6; margin-top:4px; }
        .at-page .nav-links { display:flex; align-items:center; gap:34px; }
        .at-page .nav-links a { font-size:13.5px; font-weight:500; color:rgba(247,250,252,.85); letter-spacing:.3px; transition:color .25s; text-decoration:none; }
        .at-page .nav-links a:hover { color:#6FE0C6; }
        .at-page .nav-cta { padding:11px 24px; font-size:13px; background:#6FE0C6; color:#296166; border-radius:4px; font-weight:600; transition:all .3s; }
        .at-page .nav-cta:hover { background:#296166; }
        .at-page .burger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; }
        .at-page .burger span { width:24px; height:2px; background:#F5F8F6; display:block; }

        /* Eyebrow */
        .at-page .eyebrow {
          font-family:'Inter',sans-serif; text-transform:uppercase; letter-spacing:3.5px;
          font-size:11.5px; color:#6FE0C6; font-weight:600; margin-bottom:18px;
          display:flex; align-items:center; gap:12px;
        }
        .at-page .eyebrow::before { content:""; width:34px; height:1px; background:#6FE0C6; display:inline-block; flex-shrink:0; }
        .at-page .eyebrow.center { justify-content:center; }
        .at-page .eyebrow.light { color:#6FE0C6; }
        .at-page .eyebrow.light::before { background:#6FE0C6; }
        .at-page .eyebrow.gold { color:#6FE0C6; }
        .at-page .eyebrow.gold::before { background:#6FE0C6; }

        /* Section head */
        .at-page .section-head { max-width:760px; margin:0 auto 60px; text-align:center; }
        .at-page .section-head h2 { font-size:clamp(34px,4.6vw,54px); margin-bottom:18px; }
        .at-page .section-head p { color:#296166; font-size:17px; }
        .at-page .section-head.light h2 { color:#F5F8F6; }
        .at-page .section-head.light p { color:rgba(247,250,252,0.72); }

        /* Buttons */
        .at-page .btn {
          display:inline-flex; align-items:center; gap:10px;
          font-family:'Inter',sans-serif; font-size:14px; font-weight:600;
          letter-spacing:0.4px; padding:16px 32px; border-radius:4px;
          cursor:pointer; border:1px solid transparent; transition:all .35s cubic-bezier(.22,.61,.36,1);
          text-decoration:none; white-space:nowrap;
        }
        .at-page .btn-primary { background:#6FE0C6; color:#296166; }
        .at-page .btn-primary:hover { background:#296166; transform:translateY(-2px); box-shadow:0 14px 30px rgba(47,199,161,.28); }
        .at-page .btn-ghost { background:transparent; color:#1A2540; border:2px solid #2FC7A1; }
        .at-page .btn-ghost:hover { border-color:#6FE0C6; color:#6FE0C6; }
        .at-page .btn-dark { background:#296166; color:#F5F8F6; }
        .at-page .btn-dark:hover { background:#296166; transform:translateY(-2px); }

        /* Alpine divider */
        .at-page .alpine {
          height:18px; width:100%;
          background:
            radial-gradient(circle at 10px 9px, #6FE0C6 0 2px, transparent 2.5px),
            radial-gradient(circle at 0 0, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px),
            radial-gradient(circle at 20px 0, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px),
            radial-gradient(circle at 0 18px, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px),
            radial-gradient(circle at 20px 18px, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px);
          background-size:20px 18px; background-repeat:repeat-x;
          background-position:left center; background-color:#296166;
          display:block; overflow:hidden; opacity:.92;
        }

        /* Hero */
        .at-page .hero {
          position:relative; min-height:auto; display:flex; align-items:center;
          color:#1B2B28; overflow:hidden;
          background:#FFFFFF;padding:72px 0 48px;
        }
        .at-page .hero::before {
          content:""; position:absolute; inset:0;
          background-image:
            radial-gradient(circle at 20% 50%, rgba(47,199,161,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(47,199,161,0.05) 0%, transparent 40%);
          z-index:0; pointer-events:none;
        }
        .at-page .hero-bg { display:none; }
        .at-page .hero-split {
          position:relative; z-index:2; width:100%;
          display:grid; grid-template-columns:1fr 1fr; gap:64px;
          align-items:center; padding-top:0;padding-bottom:0;
        }
        .at-page .hero-copy { display:flex; flex-direction:column; }
        .at-page .hero h1 { font-size:clamp(38px,5vw,64px); color:#1B2B28; margin-bottom:26px; font-weight:600; line-height:1.08; }
        .at-page .hero h1 em { font-style:italic; color:#4FA3D1; font-weight:500; }
        .at-page .hero .lead { font-size:17px; color:#4C5C58; max-width:580px; margin-bottom:38px; font-weight:300; line-height:1.72; }
        .at-page .hero-cta { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:48px; }
        .at-page .hero-badges { display:flex; gap:36px; flex-wrap:wrap; border-top:1px solid #D8E0EC; padding-top:28px; }
        .at-page .hero-badge .num { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; line-height:1; }
        .at-page .hero-badge .lbl { font-size:11.5px; letter-spacing:.6px; color:#7E8C88; margin-top:6px; }

        .at-page .hero-visual { display:flex; align-items:center; justify-content:center; position:relative; }
        .at-page .hero-img-frame {
          position:relative; width:100%; max-width:520px;
          border-radius:12px; overflow:hidden;
          box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22);
        }
        .at-page .hero-img-frame img { display:block; width:100%; height:480px; object-fit:cover; border-radius:12px; transition:transform .9s cubic-bezier(.22,.61,.36,1); }
        .at-page .hero-img-frame:hover img { transform:scale(1.04); }
        .at-page .hero-img-frame::after { content:""; position:absolute; inset:12px; border:1px solid rgba(47,199,161,.38); border-radius:8px; pointer-events:none; z-index:2; }
        .at-page .hero-img-frame::before { content:""; position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.42) 0%,transparent 55%); z-index:1; border-radius:12px; pointer-events:none; }
        .at-page .hero-visual::before { content:""; position:absolute; top:24px; right:-14px; width:100%; max-width:520px; height:100%; border:1px solid rgba(47,199,161,.18); border-radius:12px; pointer-events:none; }
        .at-page .hero-img-badge {
          position:absolute; bottom:22px; left:22px; z-index:3;
          background:rgba(26,37,64,.82); backdrop-filter:blur(8px);
          border:1px solid rgba(47,199,161,.30); border-radius:6px;
          padding:10px 16px; display:flex; align-items:center; gap:10px;
        }
        .at-page .hero-img-badge span { font-size:12px; letter-spacing:.5px; color:rgba(247,250,252,.88); font-weight:500; }
        .at-page .dot-pulse { width:8px; height:8px; border-radius:50%; background:#6FE0C6; flex-shrink:0; animation:at-pulse 2s ease infinite; }
        @keyframes at-pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.6; transform:scale(.85); } }
        .at-page .scroll-hint {
          position:absolute; bottom:34px; left:50%; transform:translateX(-50%); z-index:3;
          font-size:10.5px; letter-spacing:3px; text-transform:uppercase;
          color:rgba(247,250,252,.6); display:flex; flex-direction:column; align-items:center; gap:8px;
        }
        .at-page .scroll-hint .line { width:1px; height:38px; background:linear-gradient(#6FE0C6,transparent); animation:at-drop 2s cubic-bezier(.22,.61,.36,1) infinite; }
        @keyframes at-drop { 0% { transform:scaleY(0); transform-origin:top; } 50% { transform:scaleY(1); transform-origin:top; } 51% { transform-origin:bottom; } 100% { transform:scaleY(0); transform-origin:bottom; } }

        /* Stats Bar */
        .at-page .stats-bar { background:#296166; color:#F5F8F6; }
        .at-page .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .at-page .stat-cell { padding:52px 30px; text-align:center; border-right:1px solid rgba(247,250,252,.10); }
        .at-page .stat-cell:last-child { border-right:none; }
        .at-page .stat-cell .v { font-family:'Cormorant Garamond',serif; font-size:42px; font-weight:600; color:#6FE0C6; line-height:1; margin-bottom:12px; }
        .at-page .stat-cell .k { font-size:13px; letter-spacing:.5px; color:rgba(247,250,252,.78); }

        /* About */
        .at-page .about { background:#F5F8F6; }
        .at-page .about-grid { display:grid; grid-template-columns:1.05fr 1fr; gap:64px; align-items:center; }
        .at-page .about-copy h2 { font-size:clamp(32px,4.4vw,52px); margin-bottom:22px; }
        .at-page .about-copy p { color:#296166; margin-bottom:18px; font-size:16.5px; }
        .at-page .about-media { position:relative; height:560px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .at-page .about-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .at-page .facts-row { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-top:54px; }
        .at-page .fact { background:#fff; border:1px solid rgba(47,199,161,.25); border-radius:4px; padding:26px 22px; text-align:center; }
        .at-page .fact .ff { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; }
        .at-page .fact .fl { font-size:12.5px; color:#296166; letter-spacing:.4px; margin-top:6px; }

        /* Why */
        .at-page .why { background:#E9F1EE; }
        .at-page .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#296166; border:1px solid #296166; border-radius:4px; overflow:hidden; }
        .at-page .why-card { background:#F5F8F6; padding:42px 34px; transition:background .3s; }
        .at-page .why-card:hover { background:#fff; }
        .at-page .why-card .ic { width:46px; height:46px; border:1px solid #6FE0C6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#296166; font-family:'Cormorant Garamond',serif; font-size:21px; margin-bottom:20px; }
        .at-page .why-card h3 { font-size:23px; margin-bottom:10px; }
        .at-page .why-card p { color:#296166; font-size:15px; }

        /* Programme */
        .at-page .prog { background:#296166; color:#F5F8F6; }
        .at-page .prog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .at-page .prog-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:4px; padding:38px 32px; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .at-page .prog-card:hover { border-color:#6FE0C6; transform:translateY(-6px); }
        .at-page .prog-card .no { font-family:'Cormorant Garamond',serif; font-size:17px; color:#6FE0C6; border-bottom:1px solid rgba(247,250,252,.16); padding-bottom:14px; margin-bottom:18px; letter-spacing:1.5px; text-transform:uppercase; }
        .at-page .prog-card h3 { color:#F5F8F6; font-size:24px; margin-bottom:12px; }
        .at-page .prog-card p { color:rgba(247,250,252,.74); font-size:15px; }

        /* Benefits */
        .at-page .benefits { background:#F5F8F6; }
        .at-page .ben-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .at-page .ben-card { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:36px 30px; position:relative; overflow:hidden; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .at-page .ben-card::before { content:""; position:absolute; top:0; left:0; width:3px; height:0; background:#6FE0C6; transition:height .4s cubic-bezier(.22,.61,.36,1); }
        .at-page .ben-card:hover { box-shadow:0 18px 50px rgba(26,37,64,.08); transform:translateY(-4px); }
        .at-page .ben-card:hover::before { height:100%; }
        .at-page .ben-card .mk { font-family:'Cormorant Garamond',serif; font-size:22px; color:#296166; letter-spacing:1px; margin-bottom:16px; }
        .at-page .ben-card h3 { font-size:22px; margin-bottom:10px; }
        .at-page .ben-card p { color:#296166; font-size:15px; }

        /* Eligibility */
        .at-page .elig { background:#E9F1EE; }
        .at-page .elig-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; }
        .at-page .elig-card { background:#F5F8F6; border:1px solid #E5E5E5; border-radius:4px; padding:30px 26px; }
        .at-page .elig-card h3 { font-size:21px; margin-bottom:14px; color:#296166; }
        .at-page .elig-card ul { list-style:none; }
        .at-page .elig-card li { font-size:14px; color:#296166; padding:7px 0; border-bottom:1px solid #E5E5E5; display:flex; gap:8px; }
        .at-page .elig-card li:last-child { border-bottom:none; }
        .at-page .elig-card li::before { content:"–"; color:#296166; font-weight:700; flex-shrink:0; }
        .at-page .quota-note { margin-top:40px; background:rgba(47,199,161,.10); border:1px solid #E5E5E5; border-radius:4px; padding:26px 32px; text-align:center; font-size:15px; color:#296166; }
        .at-page .quota-note strong { color:#296166; }

        /* Finance */
        .at-page .finance { background:#F5F8F6; }
        .at-page .fin-table { border:1px solid #E5E5E5; border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(26,37,64,.06); }
        .at-page .fin-row { display:grid; grid-template-columns:2fr 1fr 1fr; border-bottom:1px solid #E5E5E5; align-items:center; }
        .at-page .fin-row:last-child { border-bottom:none; }
        .at-page .fin-row.head { background:#296166; color:#F5F8F6; }
        .at-page .fin-row.head .fc { color:#F5F8F6; font-weight:600; font-family:'Inter',sans-serif; font-size:13px; letter-spacing:.6px; text-transform:uppercase; }
        .at-page .fc { padding:22px 28px; font-size:15.5px; }
        .at-page .fc.label { font-weight:600; color:#296166; }
        .at-page .fc.fig { font-family:'Cormorant Garamond',serif; font-size:22px; color:#296166; font-weight:600; }
        .at-page .fin-row.total { background:rgba(47,199,161,.10); }
        .at-page .fin-note { margin-top:24px; font-size:13.5px; color:#296166; text-align:center; font-style:italic; }
        .at-page .fin-extra { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:40px; }
        .at-page .fin-x { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:28px; }
        .at-page .fin-x h4 { font-size:20px; margin-bottom:8px; }
        .at-page .fin-x p { color:#296166; font-size:14.5px; }

        /* Family */
        .at-page .family { background:#F5F8F6; }
        .at-page .fam-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .at-page .fam-media { height:520px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); position:relative; }
        .at-page .fam-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .at-page .fam-list { list-style:none; }
        .at-page .fam-list li { display:flex; gap:18px; padding:22px 0; border-bottom:1px solid #E5E5E5; }
        .at-page .fam-list li:last-child { border-bottom:none; }
        .at-page .fam-list .fi { flex:0 0 42px; height:42px; border-radius:50%; background:#296166; color:#6FE0C6; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:19px; }
        .at-page .fam-list h4 { font-size:21px; margin-bottom:2px; }
        .at-page .fam-list p { color:#296166; font-size:14.5px; }

        /* Process */
        .at-page .process { background:#296166; color:#F5F8F6; }
        .at-page .timeline { position:relative; max-width:880px; margin:0 auto; }
        .at-page .timeline::before { content:""; position:absolute; left:31px; top:8px; bottom:8px; width:1px; background:rgba(247,250,252,.18); }
        .at-page .tl-item { position:relative; padding-left:92px; padding-bottom:44px; }
        .at-page .tl-item:last-child { padding-bottom:0; }
        .at-page .tl-item .dot { position:absolute; left:0; top:0; width:64px; height:64px; border-radius:50%; border:1px solid #6FE0C6; background:#296166; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:24px; color:#6FE0C6; }
        .at-page .tl-item h3 { color:#F5F8F6; font-size:24px; margin-bottom:6px; }
        .at-page .tl-item p { color:rgba(247,250,252,.72); font-size:15px; max-width:620px; }

        /* Life */
        .at-page .life { background:#F5F8F6; }
        .at-page .life-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .at-page .life-card { position:relative; height:420px; border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .at-page .life-card img { transition:transform .8s cubic-bezier(.22,.61,.36,1); }
        .at-page .life-card:hover img { transform:scale(1.06); }
        .at-page .life-card .ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.88) 0%,rgba(26,37,64,.18) 55%,transparent 100%); z-index:1; }
        .at-page .life-card .cap { position:absolute; left:0; right:0; bottom:0; z-index:2; padding:30px 28px; }
        .at-page .life-card .cap h3 { color:#F5F8F6; font-size:27px; margin-bottom:6px; }
        .at-page .life-card .cap p { color:rgba(247,250,252,.82); font-size:14px; }
        .at-page .life-strip { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; margin-top:48px; }
        .at-page .life-tag { border:1px solid #E5E5E5; border-radius:40px; padding:10px 22px; font-size:13.5px; color:#296166; background:#fff; }

        /* Pathway */
        .at-page .pathway { background:#E9F1EE; }
        .at-page .path-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .at-page .path-card { background:#F5F8F6; border:1px solid #E5E5E5; border-radius:4px; padding:30px 26px; text-align:center; position:relative; }
        .at-page .path-card .yr { font-family:'Cormorant Garamond',serif; font-size:34px; color:#296166; font-weight:600; margin-bottom:10px; }
        .at-page .path-card h4 { font-size:18px; margin-bottom:8px; }
        .at-page .path-card p { font-size:13.5px; color:#296166; }

        /* Citizenship */
        .at-page .cit { background:#296166; color:#F5F8F6; position:relative; overflow:hidden; }
        .at-page .cit-grid { display:grid; grid-template-columns:1fr 1fr; gap:50px; }
        .at-page .cit-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:4px; padding:30px; }
        .at-page .cit-card h4 { color:#6FE0C6; font-size:21px; margin-bottom:8px; }
        .at-page .cit-card p { color:rgba(247,250,252,.74); font-size:14.5px; }
        .at-page .cit-callout { margin-top:46px; border:1px solid rgba(47,199,161,.35); background:rgba(47,199,161,.08); border-radius:4px; padding:30px 36px; text-align:center; }
        .at-page .cit-callout p { color:#6FE0C6; font-size:16px; font-style:italic; }

        /* Why Langma */
        .at-page .langma { background:#296166; color:#F5F8F6; position:relative; overflow:hidden; }
        .at-page .langma-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:64px; align-items:center; }
        .at-page .langma h2 { color:#F5F8F6; font-size:clamp(32px,4.4vw,50px); margin-bottom:20px; }
        .at-page .langma .lead { color:rgba(247,250,252,.82); font-size:16.5px; margin-bottom:16px; }
        .at-page .lg-stats { display:flex; gap:36px; margin-top:36px; flex-wrap:wrap; }
        .at-page .lg-stats .s .v { font-family:'Cormorant Garamond',serif; font-size:32px; color:#6FE0C6; font-weight:600; }
        .at-page .lg-stats .s .l { font-size:11.5px; color:rgba(247,250,252,.62); letter-spacing:.5px; margin-top:4px; }
        .at-page .lg-list { display:grid; grid-template-columns:1fr 1fr; gap:30px 36px; }
        .at-page .lg-item h4 { color:#6FE0C6; font-size:20px; margin-bottom:6px; }
        .at-page .lg-item p { color:rgba(247,250,252,.72); font-size:14.5px; }

        /* FAQ */
        .at-page .faq { background:#F5F8F6; }
        .at-page .faq-wrap { max-width:880px; margin:0 auto; }
        .at-page .faq-item { border-bottom:1px solid #E5E5E5; }
        .at-page .faq-q { width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:28px 0; display:flex; justify-content:space-between; align-items:center; gap:24px; font-family:'Cormorant Garamond',serif; font-size:22px; color:#296166; font-weight:600; }
        .at-page .faq-q .pm { flex:0 0 30px; height:30px; border:1px solid #6FE0C6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#296166; font-family:'Inter',sans-serif; font-size:18px; transition:all .3s; }
        .at-page .faq-item.open .pm { background:#6FE0C6; color:#296166; transform:rotate(45deg); }
        .at-page .faq-a { max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(.22,.61,.36,1); }
        .at-page .faq-a p { padding:0 0 28px; color:#296166; font-size:16px; max-width:780px; }

        /* Lead form */
        .at-page .lead-sec { background:#296166; color:#F5F8F6; }
        .at-page .lead-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:start; }
        .at-page .lead-copy h2 { color:#F5F8F6; font-size:clamp(32px,4.2vw,50px); margin-bottom:20px; }
        .at-page .lead-copy p { color:rgba(247,250,252,.80); margin-bottom:26px; font-size:16.5px; }
        .at-page .lead-assure { list-style:none; }
        .at-page .lead-assure li { display:flex; gap:12px; align-items:center; padding:11px 0; color:rgba(247,250,252,.86); font-size:15px; }
        .at-page .lead-assure li::before { content:"✓"; color:#6FE0C6; font-weight:700; }
        .at-page .form-card { background:#F5F8F6; border-radius:4px; padding:42px; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .at-page .form-card h3 { font-size:27px; margin-bottom:6px; }
        .at-page .form-card .fsub { color:#296166; font-size:14.5px; margin-bottom:26px; }
        .at-page .frow { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .at-page .field { margin-bottom:16px; }
        .at-page .field label { display:block; font-size:12px; letter-spacing:.5px; text-transform:uppercase; color:#296166; font-weight:600; margin-bottom:7px; }
        .at-page .field input,.at-page .field select { width:100%; padding:13px 15px; border:1px solid #E5E5E5; border-radius:4px; font-family:'Inter',sans-serif; font-size:15px; background:#fff; color:#296166; transition:border-color .25s; }
        .at-page .field input:focus,.at-page .field select:focus { outline:none; border-color:#6FE0C6; box-shadow:0 0 0 3px rgba(47,199,161,.15); }
        .at-page .form-card .btn { width:100%; justify-content:center; margin-top:6px; }
        .at-page .form-card .disc { font-size:12px; color:#296166; margin-top:14px; text-align:center; }
        .at-page .success { display:none; background:rgba(47,199,161,.12); border:1px solid #6FE0C6; border-radius:4px; padding:16px; color:#296166; font-size:14.5px; text-align:center; margin-top:16px; }
        .at-page .success.show { display:block; }

        /* Office */
        .at-page .office { background:#E9F1EE; }
        .at-page .office-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:60px; align-items:start; }
        .at-page .office-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:18px; }
        .at-page .office-copy p { color:#296166; font-size:16.5px; margin-bottom:26px; }
        .at-page .office-points { list-style:none; margin-bottom:8px; }
        .at-page .office-points li { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid #E5E5E5; }
        .at-page .office-points li:last-child { border-bottom:none; }
        .at-page .office-points .oi { flex:0 0 38px; height:38px; border-radius:50%; border:1px solid #6FE0C6; color:#296166; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; }
        .at-page .office-points h4 { font-size:18px; margin-bottom:1px; }
        .at-page .office-points p { font-size:14px; margin:0; color:#296166; }
        .at-page .office-form { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:40px; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .at-page .office-form h3 { font-size:25px; margin-bottom:22px; }

        /* Calendar widget */
        .at-page .cal-strip { margin-top:38px; background:#296166; border-radius:4px; padding:30px 32px; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .at-page .cal-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; }
        .at-page .cal-head h4 { color:#F5F8F6; font-size:18px; }
        .at-page .cal-head span { color:#6FE0C6; font-size:12.5px; letter-spacing:.5px; }
        .at-page .cal-days { display:grid; grid-template-columns:repeat(7,1fr); gap:8px; }
        .at-page .cal-day { aspect-ratio:1; border-radius:4px; background:rgba(247,250,252,.06); display:flex; align-items:center; justify-content:center; font-size:13px; color:rgba(247,250,252,.5); }
        .at-page .cal-day.avail { background:rgba(47,199,161,.16); color:#6FE0C6; cursor:pointer; border:1px solid rgba(47,199,161,.4); }
        .at-page .cal-day.avail:hover { background:#6FE0C6; color:#296166; }
        .at-page .cal-day.sel { background:#6FE0C6; color:#296166; font-weight:700; }

        /* Footer */
        .at-page .foot { background:#296166; color:rgba(247,250,252,.7); padding:74px 0 32px; }
        .at-page .foot-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1.3fr; gap:44px; margin-bottom:50px; }
        .at-page .foot-brand .name { font-family:'Cormorant Garamond',serif; font-size:28px; color:#F5F8F6; font-weight:600; letter-spacing:1px; }
        .at-page .foot-brand .tag { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#6FE0C6; margin:6px 0 18px; }
        .at-page .foot-brand p { font-size:14px; max-width:320px; line-height:1.7; }
        .at-page .foot-col h4 { color:#F5F8F6; font-size:18px; margin-bottom:18px; font-weight:600; }
        .at-page .foot-col a { display:block; font-size:14px; color:rgba(247,250,252,.7); text-decoration:none; padding:6px 0; transition:color .25s; }
        .at-page .foot-col a:hover { color:#6FE0C6; }
        .at-page .legal { max-width:920px; font-size:11.5px; color:rgba(247,250,252,.5); line-height:1.7; margin-top:18px; }
        .at-page .foot-bottom { border-top:1px solid rgba(247,250,252,.12); padding-top:26px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:14px; font-size:12.5px; margin-top:30px; }

        /* Reveal */
        .at-page .at-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1); }
        .at-page .at-reveal.in { opacity:1; transform:none; }

        /* Responsive */
        @media(max-width:980px) {
          .at-page .about-grid,.at-page .fam-grid,.at-page .langma-grid,.at-page .lead-grid,.at-page .office-grid,.at-page .cit-grid { grid-template-columns:1fr; gap:40px; }
          .at-page .stats-grid,.at-page .why-grid,.at-page .prog-grid,.at-page .ben-grid,.at-page .life-grid,.at-page .fin-extra,.at-page .elig-grid,.at-page .path-grid { grid-template-columns:1fr 1fr; }
          .at-page .facts-row { grid-template-columns:1fr 1fr; }
          .at-page .lg-list { grid-template-columns:1fr; }
          .at-page .about-media,.at-page .fam-media { height:420px; }
          .at-page .hero-split { grid-template-columns:1fr; gap:48px; padding-top:0;padding-bottom:32px; }
          .at-page .hero-img-frame img { height:380px; }
          .at-page .hero-visual::before { display:none; }
          .at-page .hero-img-frame { max-width:100%; }
          .at-page .foot-grid { grid-template-columns:1fr 1fr; }
          .at-page .nav-links { display:none; }
          .at-page .nav-links.open { display:flex; flex-direction:column; position:fixed; top:0; left:0; right:0; bottom:0; background:#296166; z-index:999; align-items:center; justify-content:center; gap:28px; }
          .at-page .burger { display:flex; position:relative; z-index:1001; }
        }
        @media(max-width:640px) {
          .at-page .block { padding:74px 0; }
          .at-page .container { padding:0 22px; }
          .at-page .stats-grid,.at-page .why-grid,.at-page .prog-grid,.at-page .ben-grid,.at-page .life-grid,.at-page .fin-extra,.at-page .facts-row,.at-page .elig-grid,.at-page .path-grid { grid-template-columns:1fr; }
          .at-page .stat-cell { border-right:none; border-bottom:1px solid rgba(247,250,252,.10); }
          .at-page .frow { grid-template-columns:1fr; }
          .at-page .hero-badges { gap:22px; }
          .at-page .form-card,.at-page .office-form { padding:30px; }
          .at-page .fin-row { grid-template-columns:1fr; }
          .at-page .fc { padding:14px 20px; }
          .at-page .fin-row.head { display:none; }
          .at-page .cal-days { grid-template-columns:repeat(4,1fr); }
          .at-page .foot-grid { grid-template-columns:1fr; }
        }
        @media(prefers-reduced-motion:reduce) {
          .at-page * { animation:none!important; transition:none!important; }
          .at-page .at-reveal { opacity:1; transform:none; }
        }
      /* PR hero responsive fix */
  /* PR hero — account for site TopBar + Navbar only (no double top padding) */
  @media(max-width:980px){
    .at-page .hero{padding:64px 0 40px;}
    .at-page .hero-split{grid-template-columns:1fr !important;gap:36px !important;padding-top:0 !important;}
    .at-page .hero-visual{order:-1;max-width:560px;margin:0 auto;width:100%;}
    .at-page .hero-visual::before{display:none;}
    .at-page .hero-img-frame,.at-page .hero-img-card{max-width:100%;}
    .at-page .hero-badges{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;}
  }
  @media(max-width:640px){
    .at-page .hero{padding:56px 0 32px;}
    .at-page .hero-split{gap:28px !important;padding-bottom:16px !important;}
    .at-page .hero h1{font-size:clamp(30px,8vw,42px);}
    .at-page .hero-badges{grid-template-columns:1fr;}
    .at-page .hero-cta,.at-page .hero-ctas{flex-direction:column;}
    .at-page .hero-cta .btn,.at-page .hero-ctas .btn{width:100%;justify-content:center;}
    .at-page .container{padding:0 20px;}
  }
`}</style>
      <main>
        {/* ===== HERO ===== */}
        <section className="hero">
          <div className="hero-bg" aria-hidden="true"></div>
          <div className="container">
            <div className="hero-split">
              <div className="hero-copy">
                <span className="eyebrow light">Austria Residence Permit · Persons of Independent Means</span>
                <h1>A quiet, considered path to <em>residency in Austria</em></h1>
                <p className="lead">Austria's Residence Permit for Persons of Independent Means, governed by Article 44 of the Settlement and Residence Act (NAG), is designed for those who can support themselves on income earned outside the country. It is a status built on stability rather than employment — suited to retirees, private investors and globally mobile families seeking a genuine base at the heart of Europe. Langma International guides every stage, from first eligibility review to the day your residence card is issued.</p>
                <div className="hero-cta">
                  <a href="#lead" className="btn btn-primary">Book Your Private Consultation</a>
                  <a href="#programme" className="btn btn-ghost">Explore the Programme</a>
                </div>
                <div className="hero-badges">
                  {[
                    { num: '450', lbl: 'Annual quota places' },
                    { num: '3+ mo', lbl: 'Typical processing period' },
                    { num: 'A1', lbl: 'German proficiency required' },
                    { num: '5 yrs', lbl: 'To permanent residence' },
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
                  <img src="/images/austria-residency/quiet-considered-path.png" alt="A quiet, considered path to residency in Austria — historic street in Vienna" />
                  <div className="hero-img-badge">
                    <span className="dot-pulse"></span>
                    <span>Vienna, Austria</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-hint"><span>Discover</span><span className="line"></span></div>
        </section>

        <div className="alpine" aria-hidden="true"></div>

        {/* ===== TRUST STATS BAR ===== */}
        <section className="stats-bar">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-cell at-reveal"><div className="v">€23,208</div><div className="k">Indicative annual income reference, single applicant</div></div>
              <div className="stat-cell at-reveal"><div className="v">183+ days</div><div className="k">Minimum residence per year to retain status</div></div>
              <div className="stat-cell at-reveal"><div className="v">Schengen</div><div className="k">90/180-day visa-free travel as a permit holder</div></div>
              <div className="stat-cell at-reveal"><div className="v">5 yrs</div><div className="k">Pathway to lifetime permanent residence</div></div>
            </div>
          </div>
        </section>

        {/* ===== ABOUT AUSTRIA ===== */}
        <section className="block about" id="about">
          <div className="container">
            <div className="about-grid">
              <div className="about-copy at-reveal">
                <span className="eyebrow">Discover Austria</span>
                <h2>Austria: a landlocked heart of Europe built on order and refinement</h2>
                <p>Sitting at the crossroads of Central Europe, Austria shares borders with eight neighbouring countries and has long served as a bridge between the continent's east and west. Home to roughly 9 million residents, it is a founding-era member of the European Union and a fully participating state within the Schengen Area, with German as its official language and the euro as its currency. Vienna, its capital, is consistently ranked among the world's most liveable cities.</p>
                <p>The Austrian economy is advanced, export-driven and notably stable, with particular strength in precision manufacturing, engineering, tourism, financial services and a research-intensive industrial base. Public infrastructure is dense and dependable, rail and transit networks are extensive, and the country's social systems — healthcare, education and civic administration — are widely regarded as among the most efficient in Europe.</p>
                <p>For financially independent individuals, the appeal lies in everyday quality of life: clean cities, accessible nature within minutes of the capital, low crime, strong institutions and a calm, orderly rhythm that has drawn private wealth to Austria for generations.</p>
              </div>
              <div className="about-media at-reveal">
                <span className="frame"></span>
                <img src="/images/austria-residency/landlocked-heart-europe.png" alt="Austria — a landlocked heart of Europe built on order and refinement, Vienna on the Danube" />
              </div>
            </div>
            <div className="facts-row">
              {[
                { ff: '~9M', fl: 'Population' },
                { ff: 'Vienna', fl: 'Capital city' },
                { ff: 'Euro (€)', fl: 'Official currency' },
                { ff: 'EU & Schengen', fl: 'Founding-era member state' },
              ].map((f, i) => (
                <div className="fact at-reveal" key={i}><div className="ff">{f.ff}</div><div className="fl">{f.fl}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY AUSTRIA ===== */}
        <section className="block why">
          <div className="container">
            <div className="section-head at-reveal">
              <span className="eyebrow center">Why Global Families Choose Austria</span>
              <h2>The reasons people relocate — and the reasons they stay</h2>
              <p>Beyond the residence card itself, Austria offers a depth of daily life that holds up to scrutiny long after the paperwork is settled.</p>
            </div>
            <div className="why-grid">
              {[
                { ic: '★', t: 'EU member-state residence', p: "A residence status in one of the European Union's most established economies, with Schengen-wide short-stay travel as a permit holder." },
                { ic: '⏚', t: 'Safety and civic order', p: 'Consistently ranked among the safest and most stable nations in Europe, with strong rule of law and low rates of violent crime.' },
                { ic: '❋', t: 'Alpine & urban lifestyle', p: "Mountains, lakes and historic cities within a single day's travel — a balance of culture and open-air living found in few other countries." },
                { ic: '✎', t: 'Respected education system', p: 'Internationally recognised schools and universities, with Austrian qualifications carrying weight well beyond its borders.' },
                { ic: '✚', t: 'Top-tier healthcare', p: "A healthcare system regularly placed among the best in the world, paired with comprehensive private insurance options for residents." },
                { ic: '⌖', t: 'Central European connectivity', p: "Vienna's position at the centre of the continent keeps business, family and travel across Europe within easy reach." },
              ].map((c, i) => (
                <div className="why-card at-reveal" key={i}><div className="ic">{c.ic}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        <div className="alpine" aria-hidden="true"></div>

        {/* ===== PROGRAMME OVERVIEW ===== */}
        <section className="block prog" id="programme">
          <div className="container">
            <div className="section-head at-reveal light">
              <span className="eyebrow center gold">The Programme</span>
              <h2>The Austria Residence Permit, explained clearly</h2>
              <p>A residence route built on financial self-sufficiency rather than local employment — regulated, quota-based and genuinely lived-in.</p>
            </div>
            <div className="prog-grid">
              {[
                { no: '01 · DEFINITION', t: 'What is this residence status?', p: "A permit issued under Article 44 of Austria's Settlement and Residence Act (NAG) for non-EU nationals who can support themselves on income earned outside the country, without taking up local employment." },
                { no: '02 · ELIGIBILITY', t: 'Who can apply?', p: 'Adults aged 18 or over with a clean criminal record, a legal income source generated outside Austria, suitable housing, medical insurance and German proficiency at A1 level or higher.' },
                { no: '03 · QUOTA', t: 'A limited annual allocation', p: 'Roughly 450 quota places are issued each year, one per family member, distributed at the start of the calendar year on a first-come basis.' },
                { no: '04 · STRUCTURE', t: 'The residence permit', p: 'Holders may live in Austria but may not work there. The first card is issued for one year and renewable thereafter, subject to maintaining all conditions.' },
                { no: '05 · RESIDENCE TEST', t: '183-day rule', p: 'To retain the status, holders must spend at least 183 days per year physically present in Austria — a genuine residence, not a document of convenience.' },
                { no: '06 · PATHWAY', t: 'Long-term horizon', p: 'After five years of lawful residence, holders may apply for a lifetime Austria permanent residence permit, and — separately — citizenship eligibility may follow under Austrian nationality law.' },
              ].map((c, i) => (
                <div className="prog-card at-reveal" key={i}><div className="no">{c.no}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BENEFITS ===== */}
        <section className="block benefits">
          <div className="container">
            <div className="section-head at-reveal">
              <span className="eyebrow center">Key Benefits</span>
              <h2>What the Austria residence permit makes possible</h2>
              <p>The advantages of the programme extend across daily life, family, mobility and the long-term horizon.</p>
            </div>
            <div className="ben-grid">
              {[
                { mk: 'I', t: 'Residence in Austria', p: 'The legal right to live in a developed EU member state, with a recognised residence card for you and your accompanying family.' },
                { mk: 'II', t: 'Family inclusion', p: 'A spouse and dependent children may be included within the same application, each receiving an individual quota and card.' },
                { mk: 'III', t: 'Schengen mobility', p: 'As an Austrian residence-card holder, the ability to travel visa-free for short stays across the Schengen Area, time in Austria not counted against the limit.' },
                { mk: 'IV', t: 'Education access', p: "Access for the family to Austria's schools and universities, whose qualifications are recognised throughout Europe and beyond." },
                { mk: 'V', t: 'Healthcare access', p: "Eligibility to hold comprehensive medical insurance and draw on one of the world's most highly rated healthcare systems." },
                { mk: 'VI', t: 'Route to permanence', p: 'A defined pathway toward lifetime permanent residence after five years, with the right to work and do business in Austria from that point.' },
              ].map((c, i) => (
                <div className="ben-card at-reveal" key={i}><div className="mk">{c.mk}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ELIGIBILITY & REQUIREMENTS ===== */}
        <section className="block elig">
          <div className="container">
            <div className="section-head at-reveal">
              <span className="eyebrow center">Eligibility &amp; Requirements</span>
              <h2>One application, requirements for every family member</h2>
              <p>Conditions are tailored by role within the family, but share the same foundation: financial independence, suitable housing, insurance and basic German.</p>
            </div>
            <div className="elig-grid">
              {[
                { t: 'Main applicant', items: ['Aged 18 or over', 'Clean criminal record', 'Legal income sourced outside Austria', 'Owned or rented Austrian housing', 'Comprehensive medical insurance', 'German at A1 level or higher'] },
                { t: 'Spouse / partner', items: ['Clean criminal record', 'Comprehensive medical insurance', 'German at A1 level or higher'] },
                { t: 'Children under 14', items: ['Included under the family application', 'No German language requirement'] },
                { t: 'Children aged 14–18', items: ['Clean criminal record', 'Comprehensive medical insurance', 'German at A1 level or higher'] },
              ].map((c, i) => (
                <div className="elig-card at-reveal" key={i}>
                  <h3>{c.t}</h3>
                  <ul>{c.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="quota-note at-reveal">
              Only <strong>around 450 quota places</strong> are released each year, with one quota assigned per family member. Applications are lodged at the start of the calendar year — the earlier the appointment, the stronger the chance of securing a place.
            </div>
          </div>
        </section>

        {/* ===== FINANCIAL REQUIREMENTS ===== */}
        <section className="block finance" id="finance">
          <div className="container">
            <div className="section-head at-reveal">
              <span className="eyebrow center">Financial Requirements</span>
              <h2>What you need to demonstrate</h2>
              <p>The permit is built on proof of stable, verifiable means rather than a lump-sum investment. Figures below reflect commonly cited reference levels and should be confirmed individually.</p>
            </div>

            <div className="fin-table at-reveal">
              <div className="fin-row head">
                <div className="fc">Cost item</div>
                <div className="fc">Indicative amount</div>
                <div className="fc">Basis</div>
              </div>
              {[
                { label: 'Minimum annual income — single applicant', fig: '≈ €23,208', basis: 'Per year', total: false },
                { label: 'Realtor / housing agency fee', fig: "≈ 2 months' rent", basis: 'One-time', total: false },
                { label: 'Medical insurance, per family member', fig: '€400+', basis: 'Per month', total: false },
                { label: 'Application processing fee, per child under 6', fig: '€75', basis: 'One-time', total: false },
                { label: 'Personal data processing fee, per family member', fig: '€20', basis: 'One-time', total: true },
                { label: 'Residence card issuance, per person over 6 / under 6', fig: '€20 / €50', basis: 'One-time', total: false },
              ].map((r, i) => (
                <div className={`fin-row ${r.total ? 'total' : ''}`} key={i}>
                  <div className="fc label">{r.label}</div>
                  <div className="fc fig">{r.fig}</div>
                  <div className="fc fig">{r.basis}</div>
                </div>
              ))}
            </div>
            <p className="fin-note">Income and fee figures are indicative reference levels; the precise required amount is generally double Austria's official minimum cost-of-living threshold for the year preceding application, and scales with family composition. Requirements may be updated by Austrian authorities and should be verified during formal assessment. This is general information, not legal or financial advice.</p>

            <div className="fin-extra">
              {[
                { t: 'Proof of independent income', p: 'A bank statement confirming sufficient funds to support the family for a year in Austria, drawn from a legal source generated outside the country.' },
                { t: 'Suitable accommodation', p: "Owned or rented housing in Austria with no fixed minimum property value, but with area and layout matching the family's composition." },
                { t: 'Comprehensive medical insurance', p: 'Full-coverage insurance for every family member, contracted under Austrian requirements for the duration of the permit.' },
              ].map((x, i) => (
                <div className="fin-x at-reveal" key={i}><h4>{x.t}</h4><p>{x.p}</p></div>
              ))}
            </div>

            <div className="fin-extra" style={{ marginTop: 22 }}>
              {[
                { t: 'Valid passport & documents', p: 'A passport valid well beyond the intended stay, plus the certified, apostilled supporting documents your file requires.' },
                { t: 'Clean criminal record', p: 'A recent certificate from your country of nationality and anywhere you have lived long-term, confirming good standing.' },
                { t: 'German A1 proficiency', p: 'Demonstrated via Goethe-Institut, TELC or Austrian Integration Fund (ÖIF) certification, or an equivalent confirmed higher-education diploma.' },
              ].map((x, i) => (
                <div className="fin-x at-reveal" key={i}><h4>{x.t}</h4><p>{x.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAMILY INCLUSION ===== */}
        <section className="block family">
          <div className="container">
            <div className="fam-grid">
              <div className="fam-media at-reveal">
                <span className="frame"></span>
                <img src="/images/austria-residency/one-application-family.png" alt="One application, your family included — family arriving at a new home in Austria" />
              </div>
              <div className="at-reveal">
                <span className="eyebrow">Family Inclusion</span>
                <h2 style={{ fontSize: 'clamp(30px,4vw,48px)', marginBottom: 26 }}>One application, your family included</h2>
                <ul className="fam-list">
                  {[
                    { n: '①', t: 'Main applicant', p: 'Aged 18 or over, meeting the income, accommodation, insurance and German A1 requirements described above.' },
                    { n: '②', t: 'Spouse or partner', p: 'A legally recognised spouse or partner, holding their own clean record, insurance and A1 certification.' },
                    { n: '③', t: 'Children under 14', p: 'Included within the family quota, with no German language requirement at this age.' },
                    { n: '④', t: 'Children aged 14–18', p: 'Subject to the same criminal-record, insurance and German A1 requirements as adult family members.' },
                  ].map((c, i) => (
                    <li key={i}><span className="fi">{c.n}</span><div><h4>{c.t}</h4><p>{c.p}</p></div></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROCESS TIMELINE ===== */}
        <section className="block process" id="process">
          <div className="container">
            <div className="section-head at-reveal light">
              <span className="eyebrow center gold">The Application Journey</span>
              <h2>A guided, multi-stage process</h2>
              <p>Langma International coordinates each stage and introduces licensed Austrian legal professionals where local representation is required.</p>
            </div>
            <div className="timeline">
              {[
                { d: '01', t: 'Preliminary due diligence', p: 'A confidential preliminary check, typically completed within one business day, to map the documentation required and reduce the risk of rejection.' },
                { d: '02', t: 'Document preparation', p: 'Compiling an individually tailored document list, including German A1 certification for every family member aged 14 and above — usually 2 to 4 weeks, longer if diploma confirmation is used.' },
                { d: '03', t: 'Securing Austrian housing', p: "Identifying and leasing accommodation matched to the family's size, typically under a minimum one-year agreement — around 2 to 4 weeks." },
                { d: '04', t: 'Insurance & final documentation', p: 'Arranging comprehensive medical insurance for all family members and finalising the residence-permit application package — roughly 2 to 3 weeks.' },
                { d: '05', t: 'Consular application', p: 'Submitting the application and biometric data at an Austrian consulate, with documents then forwarded to Austria — around 4 to 6 weeks.' },
                { d: '06', t: 'Quota allocation & approval', p: 'Austrian authorities distribute the annual quota and process the application — typically a further 4 to 8 weeks, with additional documents possible on request.' },
                { d: '07', t: 'Entry visa & arrival', p: 'Collecting the entry (D) visa and travelling to Austria, where residence-permit cards must be obtained within three months of approval.' },
                { d: '08', t: 'Registration & card issuance', p: 'Registering locally, opening an Austrian bank account and collecting residence-permit cards in person at the relevant immigration authority.' },
                { d: '09', t: 'Renewal cycle', p: 'The first cards are valid for one year; after two years of residence, a three-year card becomes available, ahead of permanent residence eligibility at five years.' },
              ].map((s, i) => (
                <div className="tl-item at-reveal" key={i}>
                  <div className="dot">{s.d}</div>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="alpine" aria-hidden="true"></div>

        {/* ===== LIVING IN AUSTRIA ===== */}
        <section className="block life">
          <div className="container">
            <div className="section-head at-reveal">
              <span className="eyebrow center">Living in Austria</span>
              <h2>Where will your family put down roots?</h2>
              <p>From an imperial capital on the Danube to alpine valleys and centuries of cultural heritage, Austria offers distinct settings for distinct lives.</p>
            </div>
            <div className="life-grid">
              {[
                { img: '/images/austria-residency/vienna.png', alt: 'Hofburg Palace and Michaelerplatz, Vienna', t: 'Vienna', p: "An imperial capital of grand boulevards, world-class museums and one of the world's most liveable cities." },
                { img: '/images/austria-residency/austrian-alps.png', alt: 'Hallstatt and the Austrian Alps reflected in the lake', t: 'The Austrian Alps', p: 'Mountain air, alpine villages and year-round outdoor living within easy reach of every major city.' },
                { img: '/images/austria-residency/culture-heritage.png', alt: 'Salzburg fortress and old town — culture and heritage in Austria', t: 'Culture & Heritage', p: 'Centuries of music, art and architecture woven into everyday life, from Salzburg to Innsbruck.' },
              ].map((c, i) => (
                <div className="life-card at-reveal" key={i}>
                  <img src={c.img} alt={c.alt} />
                  <div className="ov"></div>
                  <div className="cap"><h3>{c.t}</h3><p>{c.p}</p></div>
                </div>
              ))}
            </div>
            <div className="life-strip">
              {['Alpine living', 'World-class music & arts', 'Safe, walkable cities', 'Central European travel hub', 'Strong public infrastructure', 'High standard of healthcare'].map((t, i) => (
                <span className="life-tag at-reveal" key={i}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PERMANENT RESIDENCE PATHWAY ===== */}
        <section className="block pathway">
          <div className="container">
            <div className="section-head at-reveal">
              <span className="eyebrow center">The Long-Term Horizon</span>
              <h2>From residence permit to permanent residence</h2>
              <p>The status is designed to deepen over time, provided the conditions of genuine residence continue to be met.</p>
            </div>
            <div className="path-grid">
              {[
                { yr: 'Year 1', t: 'First residence card', p: 'Issued for one year, requiring at least 183 days of physical presence to retain.' },
                { yr: 'Year 2–3', t: 'Renewed three-year card', p: 'A longer-validity card becomes available after two years of continuous lawful residence.' },
                { yr: 'Year 5', t: 'Permanent residence eligibility', p: "Holders may apply for Austria's lifetime permanent residence permit, with the right to work and conduct business." },
                { yr: 'Beyond', t: 'Citizenship consideration', p: 'A separate, later-stage pathway under the Austrian Citizenship Act, addressed in full in the next section.' },
              ].map((c, i) => (
                <div className="path-card at-reveal" key={i}><div className="yr">{c.yr}</div><h4>{c.t}</h4><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== AUSTRIAN CITIZENSHIP ACT ===== */}
        <section className="block cit">
          <div className="container">
            <div className="section-head at-reveal light">
              <span className="eyebrow center gold">Beyond Residence</span>
              <h2>The Austrian Citizenship Act and naturalisation</h2>
              <p>Citizenship is a distinct, later-stage matter governed by the Austrian Citizenship Act (Staatsbürgerschaftsgesetz) — and it is never granted on the strength of passive investment alone.</p>
            </div>
            <div className="cit-grid">
              {[
                { t: 'The standard pathway', p: 'For most permanent residents, naturalisation requires a long, demonstrated period of lawful residence in Austria — commonly understood to run to around 30 years — alongside language proficiency, integration and good-conduct requirements set in law.' },
                { t: 'The extraordinary-merit provision', p: 'Austrian nationality law, under the extraordinary-merit framework commonly referenced as §10(6) of the Citizenship Act, allows for a substantially accelerated timeline — generally cited at around 6 to 10 years — for individuals who have made a demonstrable, exceptional contribution to the country.' },
                { t: 'What "extraordinary merit" can mean', p: 'Recognised contributions are individually assessed and may include significant economic input such as job creation, transfer of specialised technology or knowledge, or substantive capital contribution tied to genuine enterprise — not capital placed passively.' },
                { t: 'Important clarification', p: 'Holding a Residence Permit for Persons of Independent Means does not, by itself, create any entitlement to accelerated citizenship. Each merit-based case is assessed individually by the competent Austrian authority, and Austria does not recognise dual nationality — citizenship elsewhere must generally be renounced.' },
              ].map((c, i) => (
                <div className="cit-card at-reveal" key={i}><h4>{c.t}</h4><p>{c.p}</p></div>
              ))}
            </div>
            <div className="cit-callout at-reveal">
              <p>Langma International never frames citizenship as guaranteed, fast-tracked, or available through investment alone — every individual circumstance is assessed strictly on its own merits under Austrian law.</p>
            </div>
          </div>
        </section>

        {/* ===== WHY LANGMA ===== */}
        <section className="block langma" id="langma">
          <div className="container">
            <div className="langma-grid">
              <div className="at-reveal">
                <span className="eyebrow light">Why Langma International</span>
                <h2>A trusted partner for a process that deserves care</h2>
                <p className="lead">Langma International stands at the intersection of Global Languages, Upskilling and Global Staffing — a positioning that gives us a uniquely practical understanding of what it actually takes for individuals and families to settle, work and thrive in a new country.</p>
                <p className="lead">Founded in 2012, we have trained over 1 lakh candidates across more than 40 languages, and built a global mobility ecosystem trusted by government and public-sector clients, embassies and diplomats, and corporate and multinational partners alike.</p>
                <div className="lg-stats">
                  {[
                    { v: '2012', l: 'Founded' },
                    { v: '1 Lakh+', l: 'Candidates trained' },
                    { v: '40+', l: 'Languages' },
                  ].map((s, i) => (
                    <div className="s" key={i}><div className="v">{s.v}</div><div className="l">{s.l}</div></div>
                  ))}
                </div>
              </div>
              <div className="lg-list at-reveal">
                {[
                  { t: 'Global mobility expertise', p: 'An ecosystem spanning language training, upskilling and global staffing, applied directly to your relocation.' },
                  { t: 'German language pathway', p: 'In-house German A1 preparation aligned with Goethe-Institut, TELC and ÖIF certification standards.' },
                  { t: 'Documentation support', p: 'Hands-on help assembling, certifying and sequencing the paperwork that makes or breaks a file.' },
                  { t: 'Government & institutional trust', p: 'Relationships spanning government and PSU clients, embassies and diplomats across our global presence.' },
                  { t: 'Corporate & MNC partnerships', p: 'Established ties with multinational organisations supporting cross-border mobility at scale.' },
                  { t: 'Transparent process', p: "Clear timelines, honest expectations and plain answers about what is — and isn't — within reach." },
                ].map((c, i) => <div className="lg-item" key={i}><h4>{c.t}</h4><p>{c.p}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="block faq" id="faq">
          <div className="container">
            <div className="section-head at-reveal">
              <span className="eyebrow center">Frequently Asked Questions</span>
              <h2>Clear answers, accurately stated</h2>
            </div>
            <div className="faq-wrap">
              {[
                { q: 'What is the Austria Residence Permit for Persons of Independent Means?', a: "It is a residence status under Article 44 of Austria's Settlement and Residence Act (NAG) for non-EU nationals who can support themselves without taking up employment in Austria. Holders may live in the country but may not work there, and the permit rests on stable income from outside Austria, suitable housing and basic German proficiency." },
                { q: 'Who can apply?', a: 'Applicants must be aged 18 or over, hold a clean criminal record, demonstrate a legal income source generated outside Austria, secure housing suited to the family\'s size, hold medical insurance, and show German proficiency at least at A1 level. Accompanying family members face similar conditions, scaled to age.' },
                { q: 'How much income is required?', a: "The benchmark is generally double Austria's minimum cost-of-living threshold for the year preceding application, with a commonly cited reference of around €23,208 in annual income for a single applicant. Requirements scale with family composition and should be confirmed individually." },
                { q: 'Is there a quota for this permit?', a: 'Yes. Austria allocates roughly 450 quota places per year for this category, with one quota assigned per family member. Applications are lodged at the start of the calendar year, and earlier appointments materially improve the likelihood of securing a place.' },
                { q: 'Can family members apply?', a: 'Yes. A spouse and dependent children may be included alongside the main applicant. Accompanying adults and children aged 14 to 18 must also meet criminal-record, medical insurance and German A1 requirements; younger children face lighter conditions.' },
                { q: 'Does this permit lead to permanent residence?', a: 'After five years of lawful residence in Austria, holders may apply for a lifetime permanent residence permit, which additionally grants the right to work and conduct business in the country.' },
                { q: 'Can permit holders apply for Austrian citizenship?', a: 'Citizenship is a separate, later-stage matter under the Austrian Citizenship Act. Permanent residents may, in defined circumstances involving extraordinary merit or a high degree of integration, become eligible after roughly 6 to 10 years; the standard pathway otherwise requires around 30 years of residence. Citizenship is never granted through passive investment alone, and Austria does not permit dual nationality.' },
                { q: 'How long does the process take?', a: 'The process typically takes at least three months from application, with a further period — commonly around two months — needed beforehand to prepare documentation, secure housing and arrange medical insurance.' },
                { q: 'Must permit holders actually live in Austria?', a: 'Yes. Holders must spend at least 183 days per year physically present in Austria to retain their status — this is a genuine residence permit, not a passive document.' },
                { q: 'Does the permit provide access to the Schengen Area?', a: 'Yes. As an Austrian residence-card holder, you may travel visa-free for short stays of up to 90 days in any 180-day period across the Schengen Area; time spent in Austria itself is not counted against this limit.' },
              ].map((faq, i) => (
                <div className={`faq-item at-reveal ${openFaq === i ? 'open' : ''}`} key={i}>
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

        {/* ===== LEAD FORM ===== */}
        <section className="block lead-sec" id="lead">
          <div className="container">
            <div className="lead-grid">
              <div className="lead-copy at-reveal">
                <span className="eyebrow light">Begin Your Journey</span>
                <h2>Begin your Austria residency journey with expert guidance</h2>
                <p>Share a few details and a Langma International advisor will arrange a confidential consultation to assess your eligibility and outline a realistic path forward — with no obligation.</p>
                <ul className="lead-assure">
                  {[
                    'Strictly confidential, no-obligation review',
                    'Honest assessment of your eligibility',
                    'Clear timelines and transparent guidance',
                    'Introductions to licensed Austrian professionals',
                  ].map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
              <div className="form-card at-reveal">
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
                    <label htmlFor="income">Primary source of income</label>
                    <select id="income" defaultValue="">
                      <option value="">Please select</option>
                      <option>Pension</option>
                      <option>Dividends / investments</option>
                      <option>Rental income</option>
                      <option>Business income</option>
                      <option>Other / combination</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={leadLoading}>{leadLoading ? 'Sending...' : 'Request Consultation'}</button>
                  <p className="disc">By submitting, you agree to be contacted about your enquiry. Your details are kept confidential.</p>
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

        {/* ===== OFFICE VISIT + SCHEDULE CONSULTATION ===== */}
        <section className="block office" id="office-visit">
          <div className="container">
            <div className="office-grid">
              <div className="office-copy at-reveal">
                <span className="eyebrow">In Person</span>
                <h2>Visit our office. Meet our residency specialists.</h2>
                <p>Prefer to meet face to face? Sit down with our advisory team to talk through your eligibility and residency options in confidence.</p>
                <ul className="office-points">
                  {[
                    { i: '✦', t: 'Office consultation', p: 'A direct conversation with the people who will guide your case from start to finish.' },
                    { i: '✓', t: 'Eligibility assessment', p: 'An honest review of your income, family composition and timeline.' },
                    { i: '↪', t: 'Document strategy review', p: 'A walkthrough of the certified documents your specific file will require.' },
                    { i: '◎', t: 'Residency roadmap discussion', p: 'A clear, stage-by-stage plan from quota application through to your residence card.' },
                  ].map((c, i) => (
                    <li key={i}><span className="oi">{c.i}</span><div><h4>{c.t}</h4><p>{c.p}</p></div></li>
                  ))}
                </ul>

                <div className="cal-strip at-reveal">
                  <div className="cal-head"><h4>Schedule a consultation</h4><span>Select a date</span></div>
                  <div className="cal-days">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <div className="cal-day" key={`lbl-${i}`}>{d}</div>
                    ))}
                    {calDays.map((d) => (
                      <div
                        key={d.n}
                        className={`cal-day ${d.avail ? 'avail' : ''} ${selectedDay === d.n ? 'sel' : ''}`}
                        onClick={d.avail ? () => setSelectedDay(d.n) : undefined}
                      >
                        {d.n}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="office-form at-reveal">
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

export default AustriaResidencePage;