import React, { useState, useEffect } from 'react';
import { useResidencyLeadForms } from '../../hooks/useResidencyLeadForms';
import { todayStr } from '../../utils/residencyFormHelpers';

const SERVICE = 'Portugal Digital Nomad Visa (D8)';

const PortugalD8Page = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadSubmitted, officeSubmitted,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Portugal D8 Consultation' });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });
    document.querySelectorAll('.pt-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="pt-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        .pt-page * { margin:0; padding:0; box-sizing:border-box; }
        .pt-page {
          font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
          color:#296166;
          background:#F5F8F6;
          line-height:1.7;
          font-weight:400;
          -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        .pt-page h1,.pt-page h2,.pt-page h3,.pt-page h4 {
          font-family:'Cormorant Garamond',Georgia,serif;
          font-weight:600;
          color:#296166;
          line-height:1.12;
          letter-spacing:0.2px;
        }
        .pt-page img { display:block; width:100%; height:100%; object-fit:cover; }
        .pt-page .container { max-width:1200px; margin:0 auto; padding:0 30px; }
        .pt-page .block { padding:108px 0; }

        /* Header */
        .pt-page .site-header {
          position:fixed; top:0; left:0; right:0; z-index:1000;
          padding:22px 0; transition:all .4s cubic-bezier(.22,.61,.36,1);
        }
        .pt-page .site-header.scrolled {
          background:rgba(7,19,31,0.96); backdrop-filter:blur(12px);
          padding:14px 0; box-shadow:0 6px 30px rgba(0,0,0,.28);
        }
        .pt-page .nav-wrap { display:flex; align-items:center; justify-content:space-between; }
        .pt-page .brand { display:flex; flex-direction:column; line-height:1; text-decoration:none; }
        .pt-page .brand .name { font-family:'Cormorant Garamond',serif; font-size:25px; font-weight:600; color:#F5F8F6; letter-spacing:1px; }
        .pt-page .brand .tag { font-family:'Inter',sans-serif; font-size:9.5px; letter-spacing:3.5px; text-transform:uppercase; color:#6FE0C6; margin-top:4px; }
        .pt-page .nav-links { display:flex; align-items:center; gap:34px; }
        .pt-page .nav-links a { font-size:13.5px; font-weight:500; color:rgba(247,250,252,.85); letter-spacing:.3px; transition:color .25s; text-decoration:none; }
        .pt-page .nav-links a:hover { color:#6FE0C6; }
        .pt-page .nav-cta { padding:11px 24px; font-size:13px; background:#6FE0C6; color:#296166; border-radius:4px; font-weight:600; transition:all .3s; }
        .pt-page .nav-cta:hover { background:#296166; }
        .pt-page .burger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; }
        .pt-page .burger span { width:24px; height:2px; background:#F5F8F6; display:block; }

        /* Eyebrow */
        .pt-page .eyebrow {
          font-family:'Inter',sans-serif; text-transform:uppercase; letter-spacing:3.5px;
          font-size:11.5px; color:#6FE0C6; font-weight:600; margin-bottom:18px;
          display:flex; align-items:center; gap:12px;
        }
        .pt-page .eyebrow::before { content:""; width:34px; height:1px; background:#6FE0C6; display:inline-block; flex-shrink:0; }
        .pt-page .eyebrow.center { justify-content:center; }
        .pt-page .eyebrow.light { color:#6FE0C6; }
        .pt-page .eyebrow.light::before { background:#6FE0C6; }
        .pt-page .eyebrow.gold { color:#6FE0C6; }
        .pt-page .eyebrow.gold::before { background:#6FE0C6; }

        /* Section head */
        .pt-page .section-head { max-width:760px; margin:0 auto 60px; text-align:center; }
        .pt-page .section-head h2 { font-size:clamp(34px,4.6vw,54px); margin-bottom:18px; }
        .pt-page .section-head p { color:#296166; font-size:17px; }
        .pt-page .section-head.light h2 { color:#F5F8F6; }
        .pt-page .section-head.light p { color:rgba(247,250,252,0.72); }

        /* Buttons */
        .pt-page .btn {
          display:inline-flex; align-items:center; gap:10px;
          font-family:'Inter',sans-serif; font-size:14px; font-weight:600;
          letter-spacing:0.4px; padding:16px 32px; border-radius:4px;
          cursor:pointer; border:1px solid transparent; transition:all .35s cubic-bezier(.22,.61,.36,1);
          text-decoration:none;
        }
        .pt-page .btn-primary { background:#6FE0C6; color:#296166; }
        .pt-page .btn-primary:hover { background:#296166; transform:translateY(-2px); box-shadow:0 14px 30px rgba(47,199,161,.28); }
        .pt-page .btn-ghost { background:transparent; color:#1A2540; border:2px solid #2FC7A1; }
        .pt-page .btn-ghost:hover { border-color:#6FE0C6; color:#6FE0C6; }
        .pt-page .btn-dark { background:#296166; color:#F5F8F6; }
        .pt-page .btn-dark:hover { background:#296166; transform:translateY(-2px); }

        /* Tile divider */
        .pt-page .tile-divider {
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
        .pt-page .hero {
          position:relative; min-height:auto; display:flex; align-items:center;
          color:#1B2B28; overflow:hidden;
          background:#FFFFFF;padding:72px 0 48px;
        }
        .pt-page .hero::before {
          content:""; position:absolute; inset:0;
          background-image:
            radial-gradient(circle at 15% 50%, rgba(47,199,161,0.09) 0%, transparent 50%),
            radial-gradient(circle at 85% 20%, rgba(47,199,161,0.06) 0%, transparent 40%);
          z-index:0; pointer-events:none;
        }
        .pt-page .hero-split {
          position:relative; z-index:2; width:100%;
          display:grid; grid-template-columns:1fr 1fr; gap:64px;
          align-items:center; padding-top:0;padding-bottom:0;
        }
        .pt-page .hero-copy { display:flex; flex-direction:column; }
        .pt-page .hero h1 { font-size:clamp(38px,5vw,68px); color:#1B2B28; margin-bottom:26px; font-weight:600; line-height:1.08; }
        .pt-page .hero h1 em { font-style:italic; color:#4FA3D1; font-weight:500; }
        .pt-page .hero .lead { font-size:17.5px; color:#4C5C58; max-width:560px; margin-bottom:38px; font-weight:300; line-height:1.72; }
        .pt-page .hero-cta { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:48px; }
        .pt-page .hero-badges { display:flex; gap:36px; flex-wrap:wrap; border-top:1px solid #D8E0EC; padding-top:28px; }
        .pt-page .hero-badge .num { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; line-height:1; }
        .pt-page .hero-badge .lbl { font-size:11.5px; letter-spacing:.6px; color:#7E8C88; margin-top:6px; }

        .pt-page .hero-visual { display:flex; align-items:center; justify-content:center; position:relative; }
        .pt-page .hero-img-frame {
          position:relative; width:100%; max-width:520px;
          border-radius:12px; overflow:hidden;
          box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22);
        }
        .pt-page .hero-img-frame img { display:block; width:100%; height:480px; object-fit:cover; border-radius:12px; transition:transform .9s cubic-bezier(.22,.61,.36,1); }
        .pt-page .hero-img-frame:hover img { transform:scale(1.04); }
        .pt-page .hero-img-frame::after { content:""; position:absolute; inset:12px; border:1px solid rgba(47,199,161,.38); border-radius:8px; pointer-events:none; z-index:2; }
        .pt-page .hero-img-frame::before { content:""; position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.42) 0%,transparent 55%); z-index:1; border-radius:12px; pointer-events:none; }
        .pt-page .hero-visual::before { content:""; position:absolute; top:24px; right:-14px; width:100%; max-width:520px; height:100%; border:1px solid rgba(47,199,161,.18); border-radius:12px; pointer-events:none; }
        .pt-page .hero-img-badge {
          position:absolute; bottom:22px; left:22px; z-index:3;
          background:rgba(26,37,64,.82); backdrop-filter:blur(8px);
          border:1px solid rgba(47,199,161,.30); border-radius:6px;
          padding:10px 16px; display:flex; align-items:center; gap:10px;
        }
        .pt-page .hero-img-badge .flag { font-size:20px; }
        .pt-page .hero-img-badge .cap-txt { font-size:12px; color:rgba(247,250,252,.88); line-height:1.4; }
        .pt-page .hero-img-badge .cap-txt strong { color:#6FE0C6; display:block; font-size:13.5px; }
        .pt-page .scroll-hint {
          position:absolute; bottom:32px; left:50%; transform:translateX(-50%);
          display:flex; flex-direction:column; align-items:center; gap:10px;
          color:#7E8C88; font-size:10.5px; letter-spacing:2.5px; text-transform:uppercase; z-index:3;
        }
        .pt-page .scroll-hint .line { width:1px; height:38px; background:linear-gradient(#6FE0C6,transparent); animation:pt-drop 2s cubic-bezier(.22,.61,.36,1) infinite; }
        @keyframes pt-drop { 0% { transform:scaleY(0); transform-origin:top; } 50% { transform:scaleY(1); transform-origin:top; } 51% { transform-origin:bottom; } 100% { transform:scaleY(0); transform-origin:bottom; } }

        /* Stats Bar */
        .pt-page .stats-bar { background:#296166; color:#F5F8F6; }
        .pt-page .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .pt-page .stat-cell { padding:52px 30px; text-align:center; border-right:1px solid rgba(247,250,252,.10); }
        .pt-page .stat-cell:last-child { border-right:none; }
        .pt-page .stat-cell .v { font-family:'Cormorant Garamond',serif; font-size:46px; font-weight:600; color:#6FE0C6; line-height:1; margin-bottom:12px; }
        .pt-page .stat-cell .k { font-size:13px; letter-spacing:.5px; color:rgba(247,250,252,.78); }

        /* About */
        .pt-page .about { background:#F5F8F6; }
        .pt-page .about-grid { display:grid; grid-template-columns:1.05fr 1fr; gap:64px; align-items:center; }
        .pt-page .about-copy h2 { font-size:clamp(32px,4.4vw,52px); margin-bottom:22px; }
        .pt-page .about-copy p { color:#296166; margin-bottom:18px; font-size:16.5px; }
        .pt-page .about-media { position:relative; height:560px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .pt-page .about-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .pt-page .facts-row { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-top:54px; }
        .pt-page .fact { background:#fff; border:1px solid rgba(47,199,161,.25); border-radius:4px; padding:26px 22px; text-align:center; }
        .pt-page .fact .ff { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; }
        .pt-page .fact .fl { font-size:12.5px; color:#296166; letter-spacing:.4px; margin-top:6px; }

        /* Why Portugal */
        .pt-page .why { background:#E9F1EE; }
        .pt-page .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#296166; border:1px solid #296166; border-radius:4px; overflow:hidden; }
        .pt-page .why-card { background:#F5F8F6; padding:42px 34px; transition:background .3s; }
        .pt-page .why-card:hover { background:#fff; }
        .pt-page .why-card .ic { width:46px; height:46px; border:1px solid #6FE0C6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#296166; font-family:'Cormorant Garamond',serif; font-size:21px; margin-bottom:20px; }
        .pt-page .why-card h3 { font-size:24px; margin-bottom:10px; }
        .pt-page .why-card p { color:#296166; font-size:15px; }

        /* Programme */
        .pt-page .prog { background:#296166; color:#F5F8F6; }
        .pt-page .prog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .pt-page .prog-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:4px; padding:38px 32px; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .pt-page .prog-card:hover { border-color:#6FE0C6; transform:translateY(-6px); }
        .pt-page .prog-card .no { font-family:'Cormorant Garamond',serif; font-size:18px; color:#6FE0C6; border-bottom:1px solid rgba(247,250,252,.16); padding-bottom:14px; margin-bottom:18px; letter-spacing:2px; }
        .pt-page .prog-card h3 { color:#F5F8F6; font-size:25px; margin-bottom:12px; }
        .pt-page .prog-card p { color:rgba(247,250,252,.74); font-size:15px; }

        /* Benefits */
        .pt-page .benefits { background:#F5F8F6; }
        .pt-page .ben-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .pt-page .ben-card { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:36px 30px; position:relative; overflow:hidden; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .pt-page .ben-card::before { content:""; position:absolute; top:0; left:0; width:3px; height:0; background:#6FE0C6; transition:height .4s cubic-bezier(.22,.61,.36,1); }
        .pt-page .ben-card:hover { box-shadow:0 18px 50px rgba(26,37,64,.08); transform:translateY(-4px); }
        .pt-page .ben-card:hover::before { height:100%; }
        .pt-page .ben-card .mk { font-family:'Cormorant Garamond',serif; font-size:15px; color:#296166; letter-spacing:2px; margin-bottom:16px; }
        .pt-page .ben-card h3 { font-size:23px; margin-bottom:10px; }
        .pt-page .ben-card p { color:#296166; font-size:15px; }

        /* Eligibility */
        .pt-page .eligibility-sec { background:#E9F1EE; }
        .pt-page .elig-grid { display:grid; grid-template-columns:1fr 1fr; gap:26px; margin-top:52px; }
        .pt-page .elig-block { border-radius:4px; overflow:hidden; border:1px solid rgba(47,199,161,.25); box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .pt-page .elig-hd { padding:24px 32px; background:#296166; display:flex; align-items:center; gap:14px; }
        .pt-page .elig-hd-icon { width:40px; height:40px; background:rgba(47,199,161,.15); border:1px solid rgba(47,199,161,.3); border-radius:6px; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#6FE0C6; font-size:18px; }
        .pt-page .elig-hd h3 { color:#F5F8F6; font-size:20px; margin:0; }
        .pt-page .elig-bd { padding:28px 32px; background:#F5F8F6; }
        .pt-page .elig-list { list-style:none; display:flex; flex-direction:column; gap:12px; }
        .pt-page .elig-list li { display:flex; align-items:flex-start; gap:12px; font-size:14.5px; color:#296166; line-height:1.5; }
        .pt-page .elig-dot { width:6px; height:6px; background:#6FE0C6; border-radius:50%; flex-shrink:0; margin-top:7px; }

        /* Finance */
        .pt-page .finance { background:#296166; color:#F5F8F6; }
        .pt-page .fin-cards { display:grid; grid-template-columns:1fr 1fr; gap:26px; }
        .pt-page .fin-option { background:rgba(247,250,252,.04); border:1px solid rgba(47,199,161,.18); border-radius:4px; overflow:hidden; }
        .pt-page .fin-opt-head { padding:22px 30px; border-bottom:1px solid rgba(47,199,161,.12); display:flex; align-items:center; gap:12px; }
        .pt-page .fin-tag-pill { display:inline-block; background:#6FE0C6; color:#296166; font-size:10.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; padding:4px 12px; border-radius:30px; }
        .pt-page .fin-opt-head h3 { color:#F5F8F6; font-size:20px; margin:0; }
        .pt-page .fin-tbl { width:100%; border-collapse:collapse; }
        .pt-page .fin-tbl tr { border-bottom:1px solid rgba(255,255,255,.06); }
        .pt-page .fin-tbl tr:last-child { border-bottom:none; }
        .pt-page .fin-tbl td { padding:15px 30px; font-size:14px; color:rgba(247,250,252,.72); vertical-align:top; line-height:1.5; }
        .pt-page .fin-tbl td:first-child { color:rgba(247,250,252,.48); width:50%; }
        .pt-page .fin-tbl td:last-child { color:#6FE0C6; font-weight:500; }
        .pt-page .fin-tbl small { display:block; font-size:12px; color:rgba(247,250,252,.45); margin-top:4px; }
        .pt-page .fin-banner { margin-top:44px; background:rgba(47,199,161,.08); border:1px solid rgba(47,199,161,.25); border-radius:4px; padding:42px 44px; text-align:center; }
        .pt-page .fin-banner .big-num { font-family:'Cormorant Garamond',serif; font-size:3.6rem; font-weight:700; color:#6FE0C6; line-height:1; display:block; }
        .pt-page .fin-banner .big-lbl { font-size:12px; color:rgba(247,250,252,.55); letter-spacing:.1em; text-transform:uppercase; margin-top:8px; display:block; }
        .pt-page .fin-banner p { color:rgba(247,250,252,.60); font-size:14.5px; margin-top:14px; max-width:560px; margin-left:auto; margin-right:auto; }

        /* Documents */
        .pt-page .documents-sec { background:#F5F8F6; }
        .pt-page .docs-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:52px; }
        .pt-page .doc-card { background:#fff; border-radius:4px; padding:32px 28px; border-left:3px solid #6FE0C6; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .pt-page .doc-cat { font-size:10.5px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#296166; margin-bottom:18px; display:block; }
        .pt-page .doc-list { list-style:none; display:flex; flex-direction:column; gap:10px; }
        .pt-page .doc-list li { font-size:14px; color:#296166; padding-left:16px; position:relative; line-height:1.5; }
        .pt-page .doc-list li::before { content:''; position:absolute; left:0; top:8px; width:5px; height:5px; background:#6FE0C6; border-radius:50%; }
        .pt-page .docs-note { margin-top:28px; font-size:13px; color:#296166; text-align:center; font-style:italic; }

        /* Process */
        .pt-page .process { background:#296166; color:#F5F8F6; }
        .pt-page .timeline { position:relative; max-width:880px; margin:0 auto; }
        .pt-page .timeline::before { content:""; position:absolute; left:31px; top:8px; bottom:8px; width:1px; background:rgba(247,250,252,.18); }
        .pt-page .tl-item { position:relative; padding-left:92px; padding-bottom:44px; }
        .pt-page .tl-item:last-child { padding-bottom:0; }
        .pt-page .tl-item .dot { position:absolute; left:0; top:0; width:64px; height:64px; border-radius:50%; border:1px solid #6FE0C6; background:#296166; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:24px; color:#6FE0C6; }
        .pt-page .tl-item h3 { color:#F5F8F6; font-size:25px; margin-bottom:6px; }
        .pt-page .tl-item p { color:rgba(247,250,252,.72); font-size:15px; max-width:620px; }
        .pt-page .tl-time { display:inline-block; margin-top:8px; font-size:11.5px; font-weight:600; color:#6FE0C6; background:rgba(47,199,161,.10); border:1px solid rgba(47,199,161,.22); border-radius:30px; padding:4px 14px; letter-spacing:.05em; }

        /* Family */
        .pt-page .family-sec { background:#F5F8F6; }
        .pt-page .fam-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .pt-page .fam-media { height:520px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); position:relative; }
        .pt-page .fam-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .pt-page .fam-list { list-style:none; }
        .pt-page .fam-list li { display:flex; gap:18px; padding:22px 0; border-bottom:1px solid #E5E5E5; }
        .pt-page .fam-list li:last-child { border-bottom:none; }
        .pt-page .fam-list .fi { flex:0 0 42px; height:42px; border-radius:50%; background:#296166; color:#6FE0C6; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:19px; }
        .pt-page .fam-list h4 { font-size:21px; margin-bottom:2px; }
        .pt-page .fam-list p { color:#296166; font-size:14.5px; }

        /* Pathway */
        .pt-page .pathway-sec { background:#E9F1EE; }
        .pt-page .pathway-grid { display:grid; grid-template-columns:1fr 1fr; gap:26px; margin-top:52px; }
        .pt-page .path-card { border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .pt-page .path-head { padding:30px 34px; background:#296166; }
        .pt-page .path-badge { display:inline-block; background:rgba(47,199,161,.15); border:1px solid rgba(47,199,161,.3); color:#6FE0C6; font-size:10.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:5px 14px; border-radius:30px; margin-bottom:14px; }
        .pt-page .path-head h3 { color:#F5F8F6; font-size:22px; }
        .pt-page .path-body { padding:30px 34px; background:#F5F8F6; }
        .pt-page .tl-mini { display:flex; gap:18px; margin-bottom:22px; position:relative; }
        .pt-page .tl-mini:not(:last-child)::after { content:''; position:absolute; left:18px; top:38px; bottom:-12px; width:1px; background:rgba(47,199,161,.25); }
        .pt-page .tl-mini:last-child { margin-bottom:0; }
        .pt-page .tl-mini-num { width:36px; height:36px; background:#fff; border:2px solid #6FE0C6; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:14px; font-weight:700; color:#296166; flex-shrink:0; }
        .pt-page .tl-mini-content h4 { font-size:16px; margin-bottom:4px; color:#296166; }
        .pt-page .tl-mini-content p { font-size:13.5px; color:#296166; line-height:1.5; }

        /* Life in Portugal */
        .pt-page .life { background:#F5F8F6; }
        .pt-page .life-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .pt-page .life-card { position:relative; height:420px; border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .pt-page .life-card img { transition:transform .8s cubic-bezier(.22,.61,.36,1); }
        .pt-page .life-card:hover img { transform:scale(1.06); }
        .pt-page .life-card .ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.88) 0%,rgba(26,37,64,.18) 55%,transparent 100%); z-index:1; }
        .pt-page .life-card .cap { position:absolute; left:0; right:0; bottom:0; z-index:2; padding:30px 28px; }
        .pt-page .life-card .cap h3 { color:#F5F8F6; font-size:27px; margin-bottom:6px; }
        .pt-page .life-card .cap p { color:rgba(247,250,252,.82); font-size:14px; }
        .pt-page .life-strip { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; margin-top:48px; }
        .pt-page .life-tag { border:1px solid #296166; border-radius:40px; padding:10px 22px; font-size:13.5px; color:#296166; background:#fff; }

        /* Living Details */
        .pt-page .living-details { background:#296166; color:#F5F8F6; position:relative; overflow:hidden; }
        .pt-page .living-details::before { content:''; position:absolute; inset:0; background-image:url('https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1800&auto=format&fit=crop'); background-size:cover; background-position:center; opacity:.07; }
        .pt-page .living-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .pt-page .living-card { background:rgba(247,250,252,.05); border:1px solid rgba(47,199,161,.15); border-radius:4px; padding:36px 30px; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .pt-page .living-card:hover { background:rgba(47,199,161,.07); border-color:rgba(47,199,161,.35); }
        .pt-page .living-card h3 { color:#F5F8F6; font-size:22px; margin-bottom:10px; }
        .pt-page .living-card p { color:rgba(247,250,252,.60); font-size:14.5px; line-height:1.65; }
        .pt-page .living-icon { width:46px; height:46px; background:rgba(47,199,161,.10); border-radius:8px; display:flex; align-items:center; justify-content:center; margin-bottom:18px; }
        .pt-page .living-icon svg { width:22px; height:22px; stroke:#6FE0C6; stroke-width:1.6; fill:none; }

        /* Remote Workers */
        .pt-page .remote-sec { background:#E9F1EE; }
        .pt-page .remote-inner { display:grid; grid-template-columns:1.1fr 1fr; gap:72px; align-items:center; }
        .pt-page .remote-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:20px; }
        .pt-page .remote-copy p { color:#296166; font-size:16px; margin-bottom:16px; }
        .pt-page .remote-note { background:rgba(41,97,102,.07); border-left:3px solid #296166; padding:18px 22px; margin-top:24px; font-size:13.5px; color:#296166; line-height:1.6; }
        .pt-page .remote-cards { display:flex; flex-direction:column; gap:18px; }
        .pt-page .remote-card-item { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:24px 26px; }
        .pt-page .remote-card-item h4 { font-size:19px; margin-bottom:6px; }
        .pt-page .remote-card-item p { color:#296166; font-size:14px; }

        /* Comparison */
        .pt-page .comparison { background:#F5F8F6; }
        .pt-page .comp-wrap { overflow-x:auto; border-radius:4px; box-shadow:0 18px 50px rgba(26,37,64,.08); border:1px solid #E5E5E5; }
        .pt-page .comp-table { width:100%; border-collapse:collapse; min-width:680px; }
        .pt-page .comp-table thead tr { background:#296166; }
        .pt-page .comp-table th { padding:20px 26px; text-align:left; font-family:'Inter',sans-serif; font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:rgba(247,250,252,.6); }
        .pt-page .comp-table th:first-child { color:rgba(247,250,252,.4); }
        .pt-page .comp-table th.hl { color:#6FE0C6; }
        .pt-page .comp-table tbody tr { border-bottom:1px solid #E5E5E5; }
        .pt-page .comp-table tbody tr:last-child { border-bottom:none; }
        .pt-page .comp-table tbody tr:nth-child(even) { background:#E9F1EE; }
        .pt-page .comp-table td { padding:16px 26px; font-size:14.5px; color:#296166; vertical-align:middle; }
        .pt-page .comp-table td:first-child { color:#296166; font-weight:600; }
        .pt-page .comp-table td.hl { background:rgba(47,199,161,.07); color:#296166; font-weight:600; border-left:2px solid rgba(47,199,161,.3); }
        .pt-page .comp-note { margin-top:18px; font-size:12.5px; color:#296166; text-align:center; font-style:italic; }

        /* Why Langma */
        .pt-page .langma { background:#296166; color:#F5F8F6; position:relative; overflow:hidden; }
        .pt-page .langma-grid { display:grid; grid-template-columns:1.05fr 1fr; gap:64px; align-items:center; }
        .pt-page .langma h2 { color:#F5F8F6; font-size:clamp(32px,4.4vw,52px); margin-bottom:20px; }
        .pt-page .langma .lead { color:rgba(247,250,252,.82); font-size:17px; margin-bottom:14px; }
        .pt-page .langma .sub { color:rgba(247,250,252,.72); font-size:15.5px; margin-bottom:36px; }
        .pt-page .lg-list { display:grid; grid-template-columns:1fr 1fr; gap:30px 36px; }
        .pt-page .lg-item h4 { color:#6FE0C6; font-size:22px; margin-bottom:6px; }
        .pt-page .lg-item p { color:rgba(247,250,252,.72); font-size:14.5px; }
        .pt-page .langma-img { height:480px; border-radius:4px; overflow:hidden; position:relative; box-shadow:0 30px 70px rgba(0,0,0,.4); }
        .pt-page .langma-img-frame { position:absolute; inset:14px; border:1px solid rgba(47,199,161,.25); border-radius:4px; pointer-events:none; z-index:2; }

        /* FAQ */
        .pt-page .faq { background:#F5F8F6; }
        .pt-page .faq-wrap { max-width:880px; margin:0 auto; }
        .pt-page .faq-item { border-bottom:1px solid #E5E5E5; }
        .pt-page .faq-q { width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:28px 0; display:flex; justify-content:space-between; align-items:center; gap:24px; font-family:'Cormorant Garamond',serif; font-size:23px; color:#296166; font-weight:600; }
        .pt-page .faq-q .pm { flex:0 0 30px; height:30px; border:1px solid #6FE0C6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#296166; font-family:'Inter',sans-serif; font-size:18px; transition:all .3s; }
        .pt-page .faq-item.open .pm { background:#6FE0C6; color:#296166; transform:rotate(45deg); }
        .pt-page .faq-a { max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(.22,.61,.36,1); }
        .pt-page .faq-a p { padding:0 0 28px; color:#296166; font-size:16px; max-width:760px; }

        /* Lead form */
        .pt-page .lead-sec { background:#296166; color:#F5F8F6; }
        .pt-page .lead-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:start; }
        .pt-page .lead-copy h2 { color:#F5F8F6; font-size:clamp(32px,4.2vw,50px); margin-bottom:20px; }
        .pt-page .lead-copy p { color:rgba(247,250,252,.80); margin-bottom:26px; font-size:16.5px; }
        .pt-page .lead-assure { list-style:none; }
        .pt-page .lead-assure li { display:flex; gap:12px; align-items:center; padding:11px 0; color:rgba(247,250,252,.86); font-size:15px; }
        .pt-page .lead-assure li::before { content:"✓"; color:#6FE0C6; font-weight:700; }
        .pt-page .form-card { background:#F5F8F6; border-radius:4px; padding:42px; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .pt-page .form-card h3 { font-size:27px; margin-bottom:6px; }
        .pt-page .form-card .fsub { color:#296166; font-size:14.5px; margin-bottom:26px; }
        .pt-page .frow { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .pt-page .field { margin-bottom:16px; }
        .pt-page .field label { display:block; font-size:12px; letter-spacing:.5px; text-transform:uppercase; color:#296166; font-weight:600; margin-bottom:7px; }
        .pt-page .field input,.pt-page .field select,.pt-page .field textarea { width:100%; padding:13px 15px; border:1px solid #E5E5E5; border-radius:4px; font-family:'Inter',sans-serif; font-size:15px; background:#fff; color:#296166; transition:border-color .25s; }
        .pt-page .field input:focus,.pt-page .field select:focus,.pt-page .field textarea:focus { outline:none; border-color:#6FE0C6; box-shadow:0 0 0 3px rgba(47,199,161,.15); }
        .pt-page .field textarea { resize:vertical; min-height:90px; }
        .pt-page .form-card .btn { width:100%; justify-content:center; margin-top:6px; }
        .pt-page .form-card .disc { font-size:12px; color:#296166; margin-top:14px; text-align:center; }
        .pt-page .success { display:none; background:rgba(47,199,161,.12); border:1px solid #6FE0C6; border-radius:4px; padding:16px; color:#296166; font-size:14.5px; text-align:center; margin-top:16px; }
        .pt-page .success.show { display:block; }

        /* Office */
        .pt-page .office { background:#E9F1EE; }
        .pt-page .office-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:60px; align-items:center; }
        .pt-page .office-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:18px; }
        .pt-page .office-copy p { color:#296166; font-size:16.5px; margin-bottom:26px; }
        .pt-page .office-points { list-style:none; margin-bottom:8px; }
        .pt-page .office-points li { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid #E5E5E5; }
        .pt-page .office-points .oi { flex:0 0 38px; height:38px; border-radius:50%; border:1px solid #6FE0C6; color:#296166; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; }
        .pt-page .office-points h4 { font-size:19px; margin-bottom:1px; }
        .pt-page .office-points p { font-size:14px; margin:0; color:#296166; }
        .pt-page .office-form { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:40px; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .pt-page .office-form h3 { font-size:25px; margin-bottom:22px; }

        /* Final CTA */
        .pt-page .final-cta { background:#296166; color:#F5F8F6; text-align:center; padding:90px 0; }
        .pt-page .final-cta .eyebrow { justify-content:center; }
        .pt-page .final-cta h2 { color:#F5F8F6; font-size:clamp(34px,4.8vw,60px); margin-bottom:20px; }
        .pt-page .final-cta h2 em { font-style:italic; color:#6FE0C6; }
        .pt-page .final-cta p { color:rgba(247,250,252,.75); font-size:17.5px; max-width:620px; margin:0 auto 40px; }
        .pt-page .final-cta-btns { display:flex; gap:18px; justify-content:center; flex-wrap:wrap; }

        /* Footer */
        .pt-page .foot { background:#296166; color:rgba(247,250,252,.7); padding:74px 0 32px; }
        .pt-page .foot-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1.3fr; gap:44px; margin-bottom:50px; }
        .pt-page .foot-brand .name { font-family:'Cormorant Garamond',serif; font-size:28px; color:#F5F8F6; font-weight:600; letter-spacing:1px; }
        .pt-page .foot-brand .tag { font-size:10px; letter-spacing:3px; text-transform:uppercase; color:#6FE0C6; margin:6px 0 18px; }
        .pt-page .foot-brand p { font-size:14px; max-width:320px; line-height:1.7; }
        .pt-page .foot-col h4 { color:#F5F8F6; font-size:18px; margin-bottom:18px; font-weight:600; }
        .pt-page .foot-col a { display:block; font-size:14px; color:rgba(247,250,252,.7); text-decoration:none; padding:6px 0; transition:color .25s; }
        .pt-page .foot-col a:hover { color:#6FE0C6; }
        .pt-page .legal { max-width:920px; font-size:11.5px; color:rgba(247,250,252,.5); line-height:1.7; margin-top:18px; }
        .pt-page .foot-bottom { border-top:1px solid rgba(247,250,252,.12); padding-top:26px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:14px; font-size:12.5px; margin-top:30px; }

        /* Reveal animation */
        .pt-page .pt-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1); }
        .pt-page .pt-reveal.in { opacity:1; transform:none; }

        /* Responsive */
        @media(max-width:980px) {
          .pt-page .about-grid,.pt-page .fam-grid,.pt-page .langma-grid,.pt-page .lead-grid,.pt-page .office-grid,.pt-page .remote-inner { grid-template-columns:1fr; gap:40px; }
          .pt-page .stats-grid,.pt-page .why-grid,.pt-page .prog-grid,.pt-page .ben-grid,.pt-page .life-grid,.pt-page .living-grid,.pt-page .elig-grid,.pt-page .pathway-grid { grid-template-columns:1fr 1fr; }
          .pt-page .facts-row { grid-template-columns:1fr 1fr; }
          .pt-page .lg-list { grid-template-columns:1fr; }
          .pt-page .about-media,.pt-page .fam-media,.pt-page .langma-img { height:420px; }
          .pt-page .fin-cards,.pt-page .docs-grid { grid-template-columns:1fr; }
          .pt-page .hero-split { grid-template-columns:1fr; gap:48px; padding-top:0;padding-bottom:32px; }
          .pt-page .hero-img-frame img { height:380px; }
          .pt-page .hero-visual::before { display:none; }
          .pt-page .hero-img-frame { max-width:100%; }
          .pt-page .foot-grid { grid-template-columns:1fr 1fr; }
          .pt-page .nav-links { display:none; }
          .pt-page .nav-links.open { display:flex; flex-direction:column; position:fixed; top:0; left:0; right:0; bottom:0; background:#296166; z-index:999; align-items:center; justify-content:center; gap:28px; }
          .pt-page .burger { display:flex; position:relative; z-index:1001; }
        }
        @media(max-width:640px) {
          .pt-page .block { padding:74px 0; }
          .pt-page .container { padding:0 22px; }
          .pt-page .stats-grid,.pt-page .why-grid,.pt-page .prog-grid,.pt-page .ben-grid,.pt-page .life-grid,.pt-page .living-grid,.pt-page .facts-row,.pt-page .elig-grid,.pt-page .pathway-grid,.pt-page .fin-cards,.pt-page .docs-grid { grid-template-columns:1fr; }
          .pt-page .stat-cell { border-right:none; border-bottom:1px solid rgba(247,250,252,.10); }
          .pt-page .frow { grid-template-columns:1fr; }
          .pt-page .hero-badges { gap:22px; }
          .pt-page .form-card,.pt-page .office-form { padding:30px; }
          .pt-page .hero-img-frame img { height:280px; }
          .pt-page .final-cta-btns { flex-direction:column; align-items:center; }
        }
        @media(prefers-reduced-motion:reduce) {
          .pt-page * { animation:none!important; transition:none!important; }
          .pt-page .pt-reveal { opacity:1; transform:none; }
        }
      /* PR hero responsive fix */
  /* PR hero — account for site TopBar + Navbar only (no double top padding) */
  @media(max-width:980px){
    .pt-page .hero{padding:64px 0 40px;}
    .pt-page .hero-split{grid-template-columns:1fr !important;gap:36px !important;padding-top:0 !important;}
    .pt-page .hero-visual{order:-1;max-width:560px;margin:0 auto;width:100%;}
    .pt-page .hero-visual::before{display:none;}
    .pt-page .hero-img-frame,.pt-page .hero-img-card{max-width:100%;}
    .pt-page .hero-badges{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;}
  }
  @media(max-width:640px){
    .pt-page .hero{padding:56px 0 32px;}
    .pt-page .hero-split{gap:28px !important;padding-bottom:16px !important;}
    .pt-page .hero h1{font-size:clamp(30px,8vw,42px);}
    .pt-page .hero-badges{grid-template-columns:1fr;}
    .pt-page .hero-cta,.pt-page .hero-ctas{flex-direction:column;}
    .pt-page .hero-cta .btn,.pt-page .hero-ctas .btn{width:100%;justify-content:center;}
    .pt-page .container{padding:0 20px;}
  }
`}</style>

      {/* ===== HEADER ===== */}
      <main>
        {/* ===== HERO ===== */}
        <section className="hero">
          <div className="container">
            <div className="hero-split">
              <div className="hero-copy">
                <span className="eyebrow light">Portugal Digital Nomad Visa · D8 Residence Permit for Remote Professionals</span>
                <h1>Live and Work in <em>Portugal</em> on Your Own Schedule</h1>
                <p className="lead">Europe's most sought-after address for remote professionals — a legally structured pathway to Portuguese residency for freelancers, entrepreneurs and remote employees earning from anywhere in the world, guided from application to permit by Langma International.</p>
                <div className="hero-cta">
                  <a href="#lead" className="btn btn-primary">Book a Private Consultation</a>
                  <a href="#about-portugal" className="btn btn-ghost">Explore the Programme</a>
                </div>
                <div className="hero-badges">
                  {[
                    { num: '€3,680', lbl: 'Min. Monthly Income' },
                    { num: '6+', lbl: 'Months to Permit' },
                    { num: '2 yrs', lbl: 'Initial Permit Validity' },
                    { num: '26', lbl: 'Schengen Countries' },
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
                  <img src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1000&auto=format&fit=crop" alt="Lisbon rooftops and the Tagus River at golden hour, Portugal" />
                  <div className="hero-img-badge">
                    <span className="flag">🇵🇹</span>
                    <div className="cap-txt">
                      <strong>Portuguese Republic</strong>
                      EU Member · Schengen Area · Eurozone
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-hint"><div className="line"></div>Discover more</div>
        </section>

        <div className="tile-divider" aria-hidden="true"></div>

        {/* ===== STATS BAR ===== */}
        <section className="stats-bar">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-cell pt-reveal"><div className="v">€3,680</div><div className="k">Minimum monthly income, main applicant</div></div>
              <div className="stat-cell pt-reveal"><div className="v">5 yrs</div><div className="k">Continuous residence toward permanent residency</div></div>
              <div className="stat-cell pt-reveal"><div className="v">Schengen</div><div className="k">Visa-free travel across 26 member nations</div></div>
              <div className="stat-cell pt-reveal"><div className="v">10 yrs</div><div className="k">Pathway to Portuguese citizenship</div></div>
            </div>
          </div>
        </section>

        {/* ===== ABOUT PORTUGAL ===== */}
        <section className="block about" id="about-portugal">
          <div className="container">
            <div className="about-grid">
              <div className="about-copy pt-reveal">
                <span className="eyebrow">Discover Portugal</span>
                <h2>Portugal: where Atlantic character meets European sophistication</h2>
                <p>Perched at Europe's westernmost edge, Portugal occupies a singular position — a nation that has always looked outward, shaped by centuries of maritime discovery and today distinguished by one of the most welcoming, internationally oriented environments on the continent. With a resident population of approximately 10.3 million, Portugal is a stable parliamentary republic, a committed European Union member state since 1986, and a fully integrated participant in both the Schengen Area and the Eurozone. Lisbon serves as its elegant, evolving capital, while Porto, Braga, Funchal and the Algarve coast each offer a distinctly compelling quality of life.</p>
                <p>What defines Portugal for the internationally mobile professional is not merely its weather or its coastline — though both are exceptional — but the totality of a life well lived. The country ranks consistently among Europe's most peaceful nations, with a political and institutional stability that rewards long-term commitment. Its public infrastructure is modern, its healthcare system internationally respected, and its cost of living meaningfully more accessible than comparable Western European destinations. Universities are internationally recognised, international school provision is growing rapidly, and English proficiency is high among urban and professional populations.</p>
                <p>For remote workers seeking a base that combines European legal standing, genuine quality of life and a structured pathway to long-term residency, Portugal offers a proposition with few peers — and the Digital Nomad Visa has formalised that pathway with clarity and purpose.</p>
              </div>
              <div className="about-media pt-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1513735492246-483525079686?q=80&w=1200&auto=format&fit=crop" alt="Porto's Ribeira waterfront reflected in the Douro River, Portugal" />
              </div>
            </div>
            <div className="facts-row">
              {[
                { ff: '10.3M', fl: 'Population' },
                { ff: 'Lisbon', fl: 'Capital city' },
                { ff: 'Euro (€)', fl: 'Official currency' },
                { ff: 'EU & Schengen', fl: 'Member state since 1986' },
              ].map((f, i) => (
                <div className="fact pt-reveal" key={i}><div className="ff">{f.ff}</div><div className="fl">{f.fl}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY PORTUGAL ===== */}
        <section className="block why" id="why-portugal">
          <div className="container">
            <div className="section-head pt-reveal">
              <span className="eyebrow center">Why Remote Professionals Choose Portugal</span>
              <h2>Europe's Preferred Base for the Globally Mobile Professional</h2>
              <p>Portugal offers something increasingly rare: a European nation that actively welcomes internationally mobile talent and has built a formal legal framework to support it — at a quality of life that few countries in the world can match at comparable cost.</p>
            </div>
            <div className="why-grid">
              {[
                { ic: '★', t: 'Full EU member-state standing', p: "Portuguese residency is anchored in the legal permanence of EU membership — rule of law, institutional transparency, and the confidence that your status is protected by one of the world's most robust democratic frameworks." },
                { ic: '☀', t: 'Climate, coast and culture', p: "From the Algarve's golden cliffs to Lisbon's historic miradouros, Portugal's Atlantic climate, celebrated cuisine and vibrant cultural scene draw internationally mobile families and professionals from over 170 countries." },
                { ic: '⊕', t: 'Schengen Area freedom', p: 'Your Portuguese residence permit grants visa-free movement across all 26 Schengen nations — an extraordinary mobility asset for professionals whose work spans multiple markets and time zones.' },
                { ic: '✎', t: 'English-speaking ecosystem', p: "Portugal ranks among Europe's highest nations for English proficiency. Lisbon and Porto's international co-working and start-up communities operate predominantly in English, making the transition seamless for non-Portuguese speakers." },
                { ic: '✚', t: 'Quality healthcare & education', p: "Residents access Portugal's public healthcare system alongside a well-regarded private medical sector. A growing international school network and globally recognised universities provide excellent options for relocating families with children." },
                { ic: '⌖', t: 'Accessible cost of living', p: "Outside central Lisbon, Portugal remains one of Western Europe's most cost-effective destinations. Exceptional Atlantic seafood, cultural richness and a warm, welcoming population complete a quality-of-life proposition that is genuinely hard to replicate elsewhere in the EU." },
              ].map((c, i) => (
                <div className="why-card pt-reveal" key={i}><div className="ic">{c.ic}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        <div className="tile-divider" aria-hidden="true"></div>

        {/* ===== PROGRAMME ===== */}
        <section className="block prog" id="programme">
          <div className="container">
            <div className="section-head pt-reveal light">
              <span className="eyebrow center gold">The Programme</span>
              <h2>The Portugal Digital Nomad Visa, explained clearly</h2>
              <p>A purpose-built residence pathway for the modern remote professional — legally structured, family-inclusive and designed to grow with you over time.</p>
            </div>
            <div className="prog-grid">
              {[
                { no: '01 · DEFINITION', t: 'What is the D8 Visa?', p: 'The Portugal Digital Nomad Visa — formally the D8 Visa — is a residence permit for non-EU and non-EEA nationals who perform their professional activities remotely, whether as employees of a foreign company, independent freelancers or self-employed business owners.' },
                { no: '02 · ELIGIBILITY', t: 'Who can apply?', p: 'Non-EU/EEA nationals aged 18 or over who work remotely for clients or employers outside Portugal, maintain a minimum monthly income of €3,680, hold savings of at least €11,040 in a Portuguese bank account, and have secured housing and health insurance in Portugal.' },
                { no: '03 · INCOME', t: 'The income requirement', p: 'A minimum monthly income of €3,680 — equivalent to four times the Portuguese national minimum wage — for the main applicant. Applicants must also hold savings of €11,040 or more, with an additional 50% per dependent spouse or parent and 30% per dependent child.' },
                { no: '04 · STRUCTURE', t: 'The residence permit', p: 'The D8 Visa is first applied for at the Portuguese consulate in your home country. Upon arrival, you register with the Portuguese immigration authority (AIMA) to obtain a two-year residence permit card — the foundation of your life in Portugal.' },
                { no: '05 · RENEWAL', t: 'Renewal conditions', p: 'The initial two-year residence permit is renewable for an additional three years. During each renewal cycle, you must continue to meet the income threshold and demonstrate genuine residence — a minimum of eight months per year in Portugal.' },
                { no: '06 · PATHWAY', t: 'Long-term trajectory', p: 'After five years of continuous, lawful residence in Portugal, D8 holders become eligible for permanent residency. Ten years of qualifying residence opens the pathway to Portuguese citizenship, subject to language and integration requirements.' },
              ].map((c, i) => (
                <div className="prog-card pt-reveal" key={i}><div className="no">{c.no}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BENEFITS ===== */}
        <section className="block benefits" id="benefits">
          <div className="container">
            <div className="section-head pt-reveal">
              <span className="eyebrow center">Key Benefits</span>
              <h2>What Portuguese Residency Delivers for You and Your Family</h2>
              <p>The Portugal Digital Nomad Visa is more than a work permit. From the moment your residence card is issued, it opens a meaningful set of rights, freedoms and long-term opportunities.</p>
            </div>
            <div className="ben-grid">
              {[
                { mk: 'I', t: 'Legal Residence in the European Union', p: "Establish a formal, legally recognised base in one of the EU's most welcoming nations. Your D8 residence status gives you and your family the right to live in Portugal year-round — with the institutional security that EU membership guarantees." },
                { mk: 'II', t: 'Schengen-Wide Freedom of Movement', p: 'Travel visa-free across all 26 Schengen Area nations for stays of up to 90 days within any rolling 180-day period. For professionals with clients, partners or family across Europe, this mobility advantage is transformative.' },
                { mk: 'III', t: 'European Banking Access', p: 'D8 holders are required to open a Portuguese bank account as part of the application process — granting you access to euro-denominated banking, multi-currency accounts, and the broader European financial infrastructure.' },
                { mk: 'IV', t: 'Public Healthcare & Education', p: "Resident families access Portugal's public healthcare system with the same entitlements as Portuguese nationals. Children enrolled as dependants attend public schools and universities free of charge, with diplomas that are globally recognised." },
                { mk: 'V', t: 'Family-Inclusive Residency', p: 'The D8 Visa accommodates the whole family unit. Your spouse or partner (including same-sex partnerships), dependent children and financially dependent parents can all be included in a single, consolidated application.' },
                { mk: 'VI', t: 'Pathway to Permanent Residency & Citizenship', p: "Five years of continuous, lawful residence in Portugal opens the route to permanent residency — and ten years creates eligibility for Portuguese citizenship, one of Europe's most powerful passports for global mobility." },
              ].map((c, i) => (
                <div className="ben-card pt-reveal" key={i}><div className="mk">{c.mk}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ELIGIBILITY ===== */}
        <section className="block eligibility-sec" id="eligibility">
          <div className="container">
            <div className="section-head pt-reveal">
              <span className="eyebrow center">Eligibility</span>
              <h2>Who Qualifies for the Portugal Digital Nomad Visa?</h2>
              <p>The D8 Visa is structured for non-EU, non-EEA remote workers who can demonstrate verifiable income earned from sources outside Portugal. Eligibility extends to the whole family unit and accommodates a range of employment structures.</p>
            </div>
            <div className="elig-grid">
              <div className="elig-block pt-reveal">
                <div className="elig-hd">
                  <div className="elig-hd-icon">①</div>
                  <h3>Main Applicant Requirements</h3>
                </div>
                <div className="elig-bd">
                  <ul className="elig-list">
                    {[
                      'Aged 18 years or older',
                      'National of a non-EU, non-EEA country',
                      'No criminal record in Portugal or in any country of prior residence',
                      'Demonstrable remote income of at least €3,680 per month — as a remote employee, freelancer or self-employed entrepreneur',
                      'Savings of at least €11,040 held in a Portuguese bank account',
                      'Housing secured in Portugal — either rented or purchased',
                      'Valid health insurance policy covering Portugal',
                      'Income sourced from clients or employers located outside Portugal',
                    ].map((item, i) => (
                      <li key={i}><span className="elig-dot"></span>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="elig-block pt-reveal">
                <div className="elig-hd">
                  <div className="elig-hd-icon">②</div>
                  <h3>Eligible Family Members</h3>
                </div>
                <div className="elig-bd">
                  <ul className="elig-list">
                    {[
                      <><strong>Spouse or partner</strong> — in a legally registered marriage, civil partnership, or officially recognised relationship, including same-sex couples</>,
                      <><strong>Children under 18</strong> — financially dependent on the main applicant</>,
                      <><strong>Children aged 18–21</strong> — unmarried, financially dependent and enrolled in full-time education</>,
                      <><strong>Dependent parents</strong> — financially dependent on the main applicant</>,
                      'Additional savings of 50% of the base threshold per spouse or dependent parent, and 30% per dependent child',
                      'All family members subject to the same background, housing and health insurance requirements',
                    ].map((item, i) => (
                      <li key={i}><span className="elig-dot"></span>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FINANCE ===== */}
        <section className="block finance" id="finance">
          <div className="container">
            <div className="section-head pt-reveal light">
              <span className="eyebrow center gold">Financial Requirements</span>
              <h2>Understanding the Income &amp; Cost Structure</h2>
              <p>The Portugal Digital Nomad Visa is structured around verifiable remote income rather than a minimum investment. Below is a transparent breakdown of the income requirements and associated application costs.</p>
            </div>
            <div className="fin-cards">
              {[
                {
                  tag: 'Option A', title: 'Renting Property in Portugal',
                  rows: [
                    ['Property rental', <>No minimum price restriction<small>Approx. €1,240/month average apartment in Portugal</small></>],
                    ['Document translation & certification', '€2,000+'],
                    ['Health insurance', '€550+ per applicant / year'],
                    ['Visa application & consular fees', '€110 per applicant'],
                    ['NIF tax number registration', '€280 per applicant'],
                    ['NISS social security number', '€280 per applicant'],
                    ['Residency application fee', '€99.80 per applicant'],
                    ['Residence card issuance fee', '€85.80 per applicant'],
                  ]
                },
                {
                  tag: 'Option B', title: 'Purchasing Property in Portugal',
                  rows: [
                    ['Property purchase', <>No minimum price restriction<small>Avg. ~€3,030 per m² (varies by region)</small></>],
                    ['Property transfer taxes', 'Up to 1.6% of property value'],
                    ['Document translation & certification', '€2,000+'],
                    ['Health insurance', '€550+ per applicant / year'],
                    ['Visa application & consular fees', '€110 per applicant'],
                    ['NIF tax number registration', '€280 per applicant'],
                    ['Residency application fee', '€99.80 per applicant'],
                    ['Residence card issuance fee', '€85.80 per applicant'],
                  ]
                }
              ].map((opt, i) => (
                <div className="fin-option pt-reveal" key={i}>
                  <div className="fin-opt-head">
                    <span className="fin-tag-pill">{opt.tag}</span>
                    <h3>{opt.title}</h3>
                  </div>
                  <table className="fin-tbl">
                    <tbody>
                      {opt.rows.map((row, j) => (
                        <tr key={j}><td>{row[0]}</td><td>{row[1]}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            <div className="fin-banner pt-reveal">
              <span className="big-num">€3,680 / month</span>
              <span className="big-lbl">Minimum Monthly Remote Income — Main Applicant</span>
              <p>Additionally, a minimum of €11,040 must be held in a Portuguese bank account. An additional 50% of this savings figure is required per spouse or dependent parent, and 30% per dependent child. All income must derive from professional activities conducted outside Portugal.</p>
            </div>
          </div>
        </section>

        {/* ===== DOCUMENTS ===== */}
        <section className="block documents-sec" id="documents">
          <div className="container">
            <div className="section-head pt-reveal">
              <span className="eyebrow center">Required Documents</span>
              <h2>Documentation Checklist</h2>
              <p>A carefully assembled, correctly certified document file is the single most critical factor in a successful Digital Nomad Visa application. Langma International manages the entire documentation process on your behalf.</p>
            </div>
            <div className="docs-grid">
              {[
                {
                  cat: 'Identity & Status',
                  items: [
                    'Valid national passport (minimum 6 months validity beyond intended stay)',
                    'Completed Portuguese D8 Visa application form',
                    'Recent passport-size photographs meeting Portuguese consulate specifications',
                    'Police clearance certificate from home country (apostilled and translated)',
                    'Police clearance from any country of residence in the past five years (if applicable)',
                  ]
                },
                {
                  cat: 'Financial & Employment Evidence',
                  items: [
                    'Employment contract with a foreign company, or freelance/business registration documentation',
                    'Bank statements demonstrating consistent remote income of €3,680+ per month',
                    'Portuguese bank account statement confirming savings of €11,040 minimum',
                    'NIF (Portuguese tax identification number) — obtainable prior to application',
                    'NISS (Portuguese social security number) registration',
                    'Certified translation of all financial and employment documents',
                  ]
                },
                {
                  cat: 'Accommodation & Health',
                  items: [
                    'Rental agreement for a property in Portugal, or proof of property ownership',
                    'Valid private health insurance policy with comprehensive coverage in Portugal',
                    'Insurance certificate confirming coverage throughout the residency period',
                    'Apostille certification on applicable documents as required by the Portuguese consulate',
                  ]
                },
              ].map((doc, i) => (
                <div className="doc-card pt-reveal" key={i}>
                  <span className="doc-cat">{doc.cat}</span>
                  <ul className="doc-list">
                    {doc.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <p className="docs-note">* Document requirements may vary depending on the Portuguese consulate in your country of residence. Langma International provides jurisdiction-specific guidance, certified translation coordination and apostille support throughout the process.</p>
          </div>
        </section>

        {/* ===== PROCESS ===== */}
        <section className="block process" id="process">
          <div className="container">
            <div className="section-head pt-reveal light">
              <span className="eyebrow center gold">The Application Journey</span>
              <h2>Your Step-by-Step Path to Portuguese Residency</h2>
              <p>Langma International coordinates every stage of your D8 application — from the first eligibility conversation through to your residence permit card and long-term settlement planning.</p>
            </div>
            <div className="timeline">
              {[
                { d: '01', t: 'Eligibility & Strategy Assessment', p: 'Our advisors review your income profile, employment structure, family composition and personal timeline in detail — confirming eligibility, identifying any documentation requirements specific to your jurisdiction, and designing a coherent application strategy.', time: 'Weeks 1–2' },
                { d: '02', t: 'NIF, Banking & Document Preparation', p: 'We guide you through obtaining your Portuguese NIF tax number and NISS social security number, opening your Portuguese bank account, and assembling the complete document file — including apostille procedures, certified translations, income evidence and health insurance.', time: 'Weeks 3–8' },
                { d: '03', t: 'Consulate Application Submission', p: 'Your D8 Visa application is submitted at the Portuguese consulate in your country of residence. We prepare you thoroughly for the consular appointment, coordinate all submission logistics and liaise with the consulate on your behalf where permitted.', time: 'Months 2–4' },
                { d: '04', t: 'Arrival & AIMA Registration', p: 'Upon D8 Visa approval and your arrival in Portugal, we assist with scheduling your appointment with AIMA (the Portuguese immigration and asylum authority) to finalise your residence permit registration and collect your two-year residence card.', time: 'Month 5–6' },
                { d: '05', t: 'Ongoing Support & Renewal Planning', p: 'Our advisory relationship does not end at permit issuance. Langma International supports clients with renewal planning, compliance monitoring and long-term pathway strategy — from initial permit through to permanent residency eligibility at year five.', time: 'Ongoing' },
              ].map((s, i) => (
                <div className="tl-item pt-reveal" key={i}>
                  <div className="dot">{s.d}</div>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                  <span className="tl-time">{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="tile-divider" aria-hidden="true"></div>

        {/* ===== FAMILY ===== */}
        <section className="block family-sec" id="family">
          <div className="container">
            <div className="fam-grid">
              <div className="fam-media pt-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1511895426328-dc8714191011?q=80&w=1200&auto=format&fit=crop" alt="A family enjoying life together in Portugal" />
              </div>
              <div className="pt-reveal">
                <span className="eyebrow">Family Inclusion</span>
                <h2 style={{ fontSize: 'clamp(30px,4vw,48px)', marginBottom: 26 }}>One Application. A New Life for the Whole Family.</h2>
                <p style={{ color: '#296166', fontSize: 16, marginBottom: 22 }}>The Portugal Digital Nomad Visa is designed around the family unit, not just the individual professional. Your spouse or partner, children of any qualifying age, and financially dependent parents can all obtain Portuguese residence permits within the same application — making it a genuinely practical solution for multigenerational families seeking a European base.</p>
                <p style={{ color: '#296166', fontSize: 16, marginBottom: 28 }}>Each additional dependent requires a proportionate increase in savings: 50% of the base €11,040 threshold per spouse or dependent parent, and 30% per dependent child. All family members are subject to the same health insurance and background documentation requirements as the primary applicant.</p>
                <ul className="fam-list">
                  {[
                    { n: '①', t: 'Main Applicant', p: 'Non-EU/EEA national, 18+, with qualifying remote income from outside Portugal and a clean criminal record.' },
                    { n: '②', t: 'Spouse or Registered Partner', p: 'In a legally recognised marriage, civil partnership, or same-sex relationship — included regardless of nationality.' },
                    { n: '③', t: 'Dependent Children', p: 'Under 18, or aged 18–21 if unmarried and enrolled in full-time education — all financially dependent on the main applicant.' },
                    { n: '④', t: 'Financially Dependent Parents', p: 'A valuable feature of the D8 framework — dependent parents of the main applicant are eligible for inclusion in the same application.' },
                  ].map((c, i) => (
                    <li key={i}><span className="fi">{c.n}</span><div><h4>{c.t}</h4><p>{c.p}</p></div></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PATHWAY ===== */}
        <section className="block pathway-sec" id="pathway">
          <div className="container">
            <div className="section-head pt-reveal">
              <span className="eyebrow center">Long-Term Pathway</span>
              <h2>From Temporary Permit to Portuguese Citizenship</h2>
              <p>The Portugal Digital Nomad Visa is a renewable residence permit that, when maintained continuously and compliantly, creates a structured route to permanent residency and ultimately one of Europe's most powerful passports.</p>
            </div>
            <div className="pathway-grid">
              <div className="path-card pt-reveal">
                <div className="path-head">
                  <div className="path-badge">Renewal Process</div>
                  <h3>Maintaining &amp; Renewing Your Permit</h3>
                </div>
                <div className="path-body">
                  {[
                    { n: '1', t: 'Initial Permit — 2 Years', p: 'Your first D8 residence permit is valid for two years from the date of issue. During this period, you must spend a minimum of eight months per year in Portugal to demonstrate genuine residence.' },
                    { n: '2', t: 'First Renewal — 3 Years', p: 'Before your initial permit expires, you apply for the first renewal, which — if approved — is valid for a further three years. The income threshold, savings requirement and residency conditions must all continue to be met.' },
                    { n: '3', t: 'Residence Requirement: 8 Months Per Year', p: "Portugal's genuine-residence requirement — a minimum of eight months per year — must be satisfied throughout the permit lifecycle to qualify for renewal and eventual permanent residency." },
                  ].map((step, i) => (
                    <div className="tl-mini" key={i}>
                      <div className="tl-mini-num">{step.n}</div>
                      <div className="tl-mini-content"><h4>{step.t}</h4><p>{step.p}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="path-card pt-reveal">
                <div className="path-head">
                  <div className="path-badge">Long-Term Route</div>
                  <h3>Permanent Residency &amp; Portuguese Citizenship</h3>
                </div>
                <div className="path-body">
                  {[
                    { n: '5', t: 'Permanent Residency at Year 5', p: 'After five consecutive years of lawful, continuous residence in Portugal, D8 holders become eligible to apply for long-term (permanent) residency — a status that removes the ongoing income demonstration requirement.' },
                    { n: '10', t: 'Portuguese Citizenship Pathway at Year 10', p: 'After ten years of qualifying residence in Portugal, applicants may pursue Portuguese citizenship — one of the most mobility-enhancing passports in the world, granting visa-free or visa-on-arrival access to over 185 countries. Language proficiency and integration requirements apply.' },
                    { n: '⚑', t: 'Dual Nationality Considerations', p: 'Portugal generally permits dual nationality, which is a significant advantage over several comparable European residency-to-citizenship routes. Langma International advises clients on the implications for their specific nationality at the appropriate stage of their journey.' },
                  ].map((step, i) => (
                    <div className="tl-mini" key={i}>
                      <div className="tl-mini-num">{step.n}</div>
                      <div className="tl-mini-content"><h4>{step.t}</h4><p>{step.p}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== LIFE IN PORTUGAL ===== */}
        <section className="block life" id="living">
          <div className="container">
            <div className="section-head pt-reveal">
              <span className="eyebrow center">Life in Portugal</span>
              <h2>Where will your family put down roots?</h2>
              <p>From a buzzing Atlantic capital to sun-drenched southern coastlines, Portugal offers each resident a distinct and deeply rewarding setting for their European life.</p>
            </div>
            <div className="life-grid">
              {[
                { img: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=1200&auto=format&fit=crop', alt: 'Lisbon historic Alfama district at golden hour, Portugal', t: 'Lisbon', p: 'A cosmopolitan European capital of light, culture and innovation — with a thriving international community of remote workers.' },
                { img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1200&auto=format&fit=crop', alt: 'Porto waterfront and the Douro River at dusk, Portugal', t: 'Porto', p: 'Historic, creative and deeply characterful — Porto combines Atlantic energy with world-renowned cuisine and a rapidly growing creative economy.' },
                { img: 'https://images.unsplash.com/photo-1548697963-b5a01d4f5ee3?q=80&w=1200&auto=format&fit=crop', alt: 'Algarve golden cliffs and Atlantic coastline at sunrise, Portugal', t: 'The Algarve', p: '300 days of sunshine, dramatic Atlantic cliffs, pristine beaches and a well-established international community of long-term residents.' },
              ].map((c, i) => (
                <div className="life-card pt-reveal" key={i}>
                  <img src={c.img} alt={c.alt} /><div className="ov"></div><div className="cap"><h3>{c.t}</h3><p>{c.p}</p></div>
                </div>
              ))}
            </div>
            <div className="life-strip">
              {['Atlantic coastal lifestyle', 'World-class seafood & wine', 'Safe, welcoming cities', 'Thriving expat communities', 'Year-round mild climate', 'English widely spoken'].map((t, i) => (
                <span className="life-tag pt-reveal" key={i}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== LIVING DETAILS ===== */}
        <section className="block living-details">
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-head pt-reveal light">
              <span className="eyebrow center gold">The Experience of Living in Portugal</span>
              <h2>Every dimension of daily life — considered carefully</h2>
              <p>Portugal's practical advantages for resident families and remote professionals are as compelling as its celebrated lifestyle. Here is what your daily life in Portugal will look like.</p>
            </div>
            <div className="living-grid">
              {[
                { icon: <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, t: 'Healthcare', p: "Portugal's National Health Service is fully accessible to residents and is consistently rated among Europe's strongest public health systems. An active private sector provides fast-track specialist consultations and internationally trained physicians — particularly in Lisbon, Porto and the Algarve." },
                { icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, t: 'Housing', p: "Portugal's property market offers significant regional variety, from Lisbon's vibrant central neighbourhoods to the Algarve's coastal villas and Porto's characterful older quarters. There is no minimum property value for D8 applicants, and both rental and purchase options are equally valid." },
                { icon: <svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z"/></svg>, t: 'Education', p: "Resident children access Portugal's public school system free of charge. An expanding international school network in Lisbon, Porto and the Algarve offers curricula in English, French and other major languages — well-suited to internationally mobile families with children of school age." },
                { icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>, t: 'Climate', p: "Portugal enjoys one of Western Europe's most appealing climates — mild Atlantic winters in the north, warm and sunny summers throughout, and over 300 days of sunshine per year in the south. The Algarve in particular draws long-term residents from across Northern Europe and beyond." },
                { icon: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, t: 'Cost of Living', p: "Outside central Lisbon, Portugal remains meaningfully more affordable than comparable Western European capitals. Dining, transport, domestic services and everyday groceries are all significantly cheaper than in the UK, France or Germany — making the D8 income threshold achievable without sacrifice on quality of life." },
                { icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, t: 'Safety & Stability', p: "Portugal consistently ranks among Europe's safest countries, placing in the top ten of the Global Peace Index year after year. As a mature, stable European democracy with a respectful and welcoming population, it provides exactly the kind of environment that internationally mobile families prioritise for long-term settlement." },
              ].map((c, i) => (
                <div className="living-card pt-reveal" key={i}>
                  <div className="living-icon">{c.icon}</div>
                  <h3>{c.t}</h3>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== REMOTE WORKERS ===== */}
        <section className="block remote-sec" id="remote">
          <div className="container">
            <div className="remote-inner">
              <div className="remote-copy pt-reveal">
                <span className="eyebrow">For Remote Professionals</span>
                <h2>Portugal's Digital Ecosystem &amp; Tax Landscape</h2>
                <p>Portugal has invested seriously in becoming one of Europe's leading destinations for the remote-working professional. Lisbon and Porto's co-working and start-up ecosystems are internationally recognised, high-speed fibre internet is widely available across urban and suburban areas, and the country's NHR (Non-Habitual Resident) tax regime — though evolving — has historically offered significant advantages to qualifying newcomers.</p>
                <p>The broader digital infrastructure is strong: reliable connectivity, a growing community of internationally minded entrepreneurs, and a tech sector that has placed Lisbon among Europe's most competitive innovation hubs. Web Summit's long-standing home in Lisbon is not a coincidence — it reflects the city's genuine standing in the global digital economy.</p>
                <p>Portugal's tax system — like all European systems — is complex and highly dependent on individual circumstances. Langma International strongly advises all prospective D8 applicants to obtain independent advice from a qualified Portuguese tax specialist or cross-border adviser before submitting their application.</p>
                <div className="remote-note">
                  <strong>Important:</strong> Tax treatment for new Portuguese residents depends on individual income sources, prior country of tax residency, applicable double taxation treaties and personal circumstances. The information on this page does not constitute tax advice. Professional guidance is essential before any application is submitted.
                </div>
              </div>
              <div className="remote-cards pt-reveal">
                {[
                  { t: 'Evolving NHR Tax Framework', p: "Portugal's Non-Habitual Resident regime has undergone reform in recent years. New arrivals should seek current guidance from a qualified Portuguese tax adviser regarding applicable rates and qualifying categories as of the date of their application." },
                  { t: '183-Day Tax Residency Threshold', p: 'Individuals spending more than 183 days in Portugal in a given calendar year are typically classified as Portuguese tax residents, triggering liability on worldwide income under Portuguese law.' },
                  { t: 'Double Taxation Treaties', p: 'Portugal maintains an extensive network of double taxation agreements, which significantly affect how foreign-source income is treated. Treaty provisions vary by country and income type, requiring specific professional analysis.' },
                  { t: 'European Banking & Financial Access', p: 'Opening a Portuguese bank account is a mandatory step in the D8 process. Once resident, you gain access to the full range of Portuguese and European financial services — including multi-currency accounts suited to professionals with international income streams.' },
                ].map((c, i) => (
                  <div className="remote-card-item" key={i}><h4>{c.t}</h4><p>{c.p}</p></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== COMPARISON ===== */}
        <section className="block comparison" id="comparison">
          <div className="container">
            <div className="section-head pt-reveal">
              <span className="eyebrow center">Programme Comparison</span>
              <h2>How Portugal Compares to Other EU Digital Nomad Visas</h2>
              <p>Portugal is not the only European nation offering residency to remote professionals — but its combination of income requirements, permit validity, family inclusion and citizenship pathway make it a leading choice for serious long-term relocation.</p>
            </div>
            <div className="comp-wrap pt-reveal">
              <table className="comp-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="hl">🇵🇹 Portugal</th>
                    <th>🇪🇸 Spain</th>
                    <th>🇲🇹 Malta</th>
                    <th>🇮🇹 Italy</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Minimum Monthly Income', '€3,680', '€2,762', '€3,500', '€2,700'],
                    ['Required Savings', '€11,040+', 'Not required', '€17,500+', '€30,000+'],
                    ['Typical Obtaining Period', '6+ months', '4+ months', '2+ months', '4+ months'],
                    ['Initial Permit Validity', '2 years, renewable', '3 years, renewable', '1 year, renewable', '1 year, renewable'],
                    ['Residency Requirement', '8+ months per year', '183+ days per year', '5+ months per year', '183+ days per year'],
                    ['Time to Citizenship', '10 years', '10 years', 'Not available', '10 years'],
                    ['Schengen Access', 'Yes — 26 countries', 'Yes — 26 countries', 'Yes — 26 countries', 'Yes — 26 countries'],
                    ['Parents as Dependants', 'Yes', 'Yes', 'Selected cases', 'Limited'],
                  ].map((row, i) => (
                    <tr key={i}>
                      <td>{row[0]}</td>
                      <td className="hl">{row[1]}</td>
                      <td>{row[2]}</td>
                      <td>{row[3]}</td>
                      <td>{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="comp-note">* All figures are indicative, based on publicly available information at the time of writing, and are subject to change under national legislation. Contact Langma International for current advisory guidance applicable to your situation.</p>
          </div>
        </section>

        <div className="tile-divider" aria-hidden="true"></div>

        {/* ===== WHY LANGMA ===== */}
        <section className="block langma" id="langma">
          <div className="container">
            <div className="langma-grid">
              <div className="pt-reveal">
                <span className="eyebrow light">Why Langma International</span>
                <h2>A trusted partner for a process that deserves precision</h2>
                <p className="lead">We guide individuals and families through European residency programmes with transparency, strategic depth and genuinely personal support — never overpromising, never cutting corners, and always keeping your long-term interests at the centre of our work.</p>
                <p className="sub">The Portugal Digital Nomad Visa is straightforward in principle but demanding in execution. Documentation requirements are precise, consulate processing can be sensitive, and the genuine-residence obligations require ongoing attention. Our role is to ensure that every element of your application is correct, complete and positioned to succeed — and that your residency is structured for the long term, not just the first two years.</p>
                <div className="lg-list">
                  {[
                    { t: 'Dedicated Case Management', p: 'A named senior adviser manages your case from first consultation through to permit issuance and beyond — no call centres, no rotating contacts.' },
                    { t: 'End-to-End Document Guidance', p: 'We manage the full documentation process — apostille procedures, certified translations, NIF and NISS registration, and bank account facilitation.' },
                    { t: 'Family-First Planning', p: 'We structure every application around the whole family unit, ensuring that dependants are correctly included and that the income and savings thresholds are met precisely.' },
                    { t: 'Long-Term Residency Strategy', p: 'Our advisory extends well beyond the initial permit — covering renewal planning, genuine-residence compliance and permanent residency eligibility from the very beginning.' },
                    { t: 'Transparent, Honest Guidance', p: 'We provide a clear-eyed assessment of your eligibility and do not promise outcomes we cannot guarantee. Our reputation rests on honesty and precision, not on sales volume.' },
                    { t: 'Trusted Professional Network', p: 'We work with a carefully selected network of Portuguese lawyers, tax advisers, certified translators and real estate professionals — all recommended based on quality, not commercial arrangement.' },
                  ].map((c, i) => <div className="lg-item" key={i}><h4>{c.t}</h4><p>{c.p}</p></div>)}
                </div>
              </div>
              <div className="langma-img pt-reveal">
                <span className="langma-img-frame"></span>
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop" alt="Langma International advisory team in professional consultation" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="block faq" id="faq">
          <div className="container">
            <div className="section-head pt-reveal">
              <span className="eyebrow center">Frequently Asked Questions</span>
              <h2>Your Portugal Digital Nomad Visa Questions, Answered</h2>
              <p>Clear, authoritative answers to the questions our advisers hear most often from remote professionals considering Portuguese residency.</p>
            </div>
            <div className="faq-wrap">
              {[
                { q: 'What is the Portugal Digital Nomad Visa (D8 Visa)?', a: 'The Portugal Digital Nomad Visa — formally designated as the D8 Visa — is a residence permit for non-EU and non-EEA nationals who work remotely for clients or employers based outside Portugal. It accommodates remote employees of foreign companies, independent freelancers and self-employed entrepreneurs. The D8 Visa allows holders and their qualifying family members to live in Portugal and travel freely across the Schengen Area.' },
                { q: 'How much income do I need for the Portugal Digital Nomad Visa?', a: 'Applicants must demonstrate a minimum monthly income of €3,680 — equivalent to four times the current Portuguese national minimum wage. This must be verifiable remote income earned from professional activities conducted outside Portugal. In addition, applicants must hold savings of at least €11,040 in a Portuguese bank account, with an additional 50% of that figure required per included spouse or dependent parent, and 30% per dependent child.' },
                { q: 'How long does the Portugal Digital Nomad Visa process take?', a: 'The process typically takes six or more months from initial application at the Portuguese consulate in your home country through to the issuance of your two-year residence permit card. This includes the time required to obtain your Portuguese NIF tax number, open a bank account, assemble the complete documentation file, await consular processing, travel to Portugal and complete registration with AIMA. Langma International provides a realistic timeline assessment at the start of every engagement.' },
                { q: 'How much time do I need to spend in Portugal each year?', a: 'Portugal Digital Nomad Visa holders must reside in Portugal for a minimum of eight months per year to maintain the genuine-residence requirement associated with the permit. This is a more demanding residency threshold than some comparable European programmes and must be satisfied throughout each permit cycle to qualify for renewal — and ultimately for permanent residency eligibility at year five.' },
                { q: 'Can my family members be included in the application?', a: 'Yes. The Portugal Digital Nomad Visa accommodates the whole family unit. Eligible family members include your spouse or registered partner (including same-sex partnerships and unregistered relationships), financially dependent children under 18, dependent children aged 18 to 21 who are unmarried and enrolled in full-time education, and financially dependent parents of the main applicant. Each family member is subject to their own background, health insurance and documentation requirements, and the savings threshold increases proportionately for each included dependant.' },
                { q: 'Can I renew the Portugal Digital Nomad Visa?', a: 'Yes. The initial two-year D8 residence permit is renewable for an additional three years, provided you continue to meet the income threshold, savings requirement and genuine-residence conditions at the time of each renewal. Langma International provides proactive renewal planning support to ensure clients are consistently positioned for successful renewals well in advance of each expiry date.' },
                { q: 'When can I apply for permanent residency and Portuguese citizenship?', a: 'After five years of continuous, lawful residence in Portugal, D8 Visa holders become eligible to apply for long-term (permanent) residency — a status that removes the ongoing income demonstration requirement. After ten years of qualifying residence, you may pursue Portuguese citizenship, subject to demonstrating proficiency in the Portuguese language and a basic knowledge of Portuguese history and culture. Portuguese citizenship is notable for generally permitting dual nationality, which is a significant advantage over citizenship routes in comparable European countries.' },
                { q: 'Do I need to open a Portuguese bank account?', a: 'Yes. Opening a Portuguese bank account is a mandatory requirement of the D8 Visa application. You must demonstrate that the required savings (a minimum of €11,040 for the main applicant) are held in a Portuguese account. Langma International assists clients in navigating the account-opening process and, where required, can facilitate introductions to Portuguese banking professionals who specialise in working with non-resident applicants.' },
              ].map((faq, i) => (
                <div className={`faq-item pt-reveal ${openFaq === i ? 'open' : ''}`} key={i}>
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
              <div className="lead-copy pt-reveal">
                <span className="eyebrow light">Private Consultation</span>
                <h2>Begin Your Portugal Digital Nomad Visa Journey Today</h2>
                <p>A private, no-obligation consultation with one of our senior advisers is the right first step — whether you are ready to apply now or simply want to understand your options with clarity and confidence.</p>
                <ul className="lead-assure">
                  {[
                    'A senior adviser reviews your remote income profile and family situation in detail',
                    'Honest eligibility assessment — no false promises, no hard selling',
                    'A clear understanding of your document requirements and realistic timelines',
                    'Confidential — your information is never shared without your explicit consent',
                    'No obligation to proceed following your initial consultation',
                  ].map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
              <div className="pt-reveal">
                <div className="form-card">
                  <h3>Request a Consultation</h3>
                  <p className="fsub">Complete this form and a member of our team will be in touch within one business day.</p>
                  <form onSubmit={handleLeadSubmit} noValidate>
                    <div className="frow">
                      <div className="field"><label htmlFor="l-fname">First name</label><input type="text" id="l-fname" placeholder="Your first name" required /></div>
                      <div className="field"><label htmlFor="l-lname">Last name</label><input type="text" id="l-lname" placeholder="Your last name" required /></div>
                    </div>
                    <div className="frow">
                      <div className="field"><label htmlFor="l-email">Email address</label><input type="email" id="l-email" placeholder="you@example.com" required /></div>
                      <div className="field"><label htmlFor="l-phone">Phone / WhatsApp</label><input type="tel" id="l-phone" placeholder="+ Country code" /></div>
                    </div>
                    <div className="frow">
                      <div className="field"><label htmlFor="l-country">Your nationality</label><input type="text" id="l-country" placeholder="Country of passport" /></div>
                      <div className="field"><label htmlFor="income">Monthly remote income</label>
                        <select id="income" defaultValue="">
                          <option value="">— Select range —</option>
                          <option>€3,680 – €5,000</option>
                          <option>€5,000 – €8,000</option>
                          <option>€8,000 – €12,000</option>
                          <option>€12,000+</option>
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="family">Family members to include</label>
                      <select id="family" defaultValue="">
                        <option value="">— Select —</option>
                        <option>Main applicant only</option>
                        <option>Main applicant + spouse/partner</option>
                        <option>Main applicant + children</option>
                        <option>Main applicant + spouse + children</option>
                        <option>Multi-generational family (including parents)</option>
                      </select>
                    </div>
                    <div className="field"><label htmlFor="message">Anything you'd like us to know</label><textarea id="message" placeholder="Tell us about your situation, timeline, or any specific questions you have…"></textarea></div>
                    <button type="submit" className="btn btn-primary" disabled={leadLoading}>{leadLoading ? 'Sending...' : 'Request My Consultation'}</button>
                    <p className="disc">Your enquiry is treated with complete confidentiality. We respond within one business day.</p>
                    {(leadMsg || leadSubmitted) && (
                      <div className="success show" style={!leadSuccess && leadMsg ? { background: 'rgba(220,38,38,.08)', border: '1px solid #ef4444', color: '#b91c1c' } : undefined}>
                        {leadMsg || 'Thank you — a member of our advisory team will be in touch shortly.'}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== OFFICE VISIT ===== */}
        <section className="block office" id="office-visit">
          <div className="container">
            <div className="office-grid">
              <div className="office-copy pt-reveal">
                <span className="eyebrow">Office Consultation</span>
                <h2>Meet Our Team in Person</h2>
                <p>Some conversations are best held face to face. Our advisory team welcomes clients for private, in-depth office consultations at a time that suits their schedule — an opportunity to discuss your Portugal residency pathway with the people who will guide your case from start to finish.</p>
                <ul className="office-points">
                  {[
                    { i: '✦', t: 'Meet your senior adviser', p: 'A direct, unhurried conversation with the adviser who will manage your D8 Visa case — giving you confidence in both the process and the person guiding it.' },
                    { i: '✓', t: 'Discuss your eligibility honestly', p: 'A confidential review of your remote income structure, employment type, family composition and personal timeline — with no obligation to proceed.' },
                    { i: '⊞', t: 'Preliminary document assessment', p: 'Bring your existing documents for a preliminary review — understanding what you have, what still needs to be obtained, and what the preparation timeline looks like.' },
                    { i: '↪', t: 'A personalised roadmap', p: 'Leave with a clear, structured understanding of your application pathway, realistic processing timelines, and precisely defined next steps — so you can move forward with confidence.' },
                  ].map((c, i) => (
                    <li key={i}><span className="oi">{c.i}</span><div><h4>{c.t}</h4><p>{c.p}</p></div></li>
                  ))}
                </ul>
              </div>
              <div className="office-form pt-reveal">
                <h3>Schedule Your Office Visit</h3>
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
                        <option>Morning (9:00 AM – 12:00 PM)</option>
                        <option>Afternoon (12:00 PM – 4:00 PM)</option>
                        <option>Evening (4:00 PM – 6:00 PM)</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="ov-topic">Primary topic</label>
                    <select id="ov-topic" defaultValue="">
                      <option value="">— Select —</option>
                      <option>Portugal Digital Nomad Visa eligibility</option>
                      <option>Family application planning</option>
                      <option>Document review session</option>
                      <option>Permit renewal or compliance</option>
                      <option>General Portugal residency enquiry</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-dark" style={{ width: '100%', justifyContent: 'center' }} disabled={officeLoading}>{officeLoading ? 'Sending...' : 'Book Office Visit'}</button>
                  {(officeMsg || officeSubmitted) && (
                    <div className="success show" style={{ marginTop: 16, ...(!officeSuccess && officeMsg ? { background: 'rgba(220,38,38,.08)', border: '1px solid #ef4444', color: '#b91c1c' } : {}) }}>
                      {officeMsg || 'Thank you — we will be in touch shortly to confirm your office visit.'}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="final-cta">
          <div className="container">
            <span className="eyebrow center gold">Your European Life Awaits</span>
            <h2>Portugal is ready.<br /><em>Are you?</em></h2>
            <p>The Portugal Digital Nomad Visa offers remote professionals something genuinely rare — a structured, legal pathway to EU residence, Schengen freedom and long-term European security. The first step is a conversation.</p>
            <div className="final-cta-btns">
              <a href="#lead" className="btn btn-primary">Request a Private Consultation</a>
              <a href="#office-visit" className="btn btn-ghost">Book an Office Visit</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PortugalD8Page;