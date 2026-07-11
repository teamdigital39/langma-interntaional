import React, { useState, useEffect } from 'react';
import { useResidencyLeadForms } from '../../hooks/useResidencyLeadForms';
import { todayStr } from '../../utils/residencyFormHelpers';

const SERVICE = 'Spain Non-Lucrative Visa';

const SpainNLVPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadSubmitted, officeSubmitted,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Spain NLV Consultation', requirePhone: false });
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });
    document.querySelectorAll('.sp-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="sp-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        .sp-page * { margin:0; padding:0; box-sizing:border-box; }
        .sp-page {
          font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
          color:#1B2B28;
          background:#F5F8F6;
          line-height:1.7;
          font-weight:400;
          -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        .sp-page h1,.sp-page h2,.sp-page h3,.sp-page h4 {
          font-family:'Cormorant Garamond',Georgia,serif;
          font-weight:600;
          color:#296166;
          line-height:1.12;
          letter-spacing:0.2px;
        }
        .sp-page img { display:block; width:100%; height:100%; object-fit:cover; }
        .sp-page .container { max-width:1200px; margin:0 auto; padding:0 30px; }
        .sp-page .block { padding:108px 0; }

        /* Eyebrow */
        .sp-page .eyebrow {
          font-family:'Inter',sans-serif; text-transform:uppercase; letter-spacing:3.5px;
          font-size:11.5px; color:#2FC7A1; font-weight:600; margin-bottom:18px;
          display:flex; align-items:center; gap:12px;
        }
        .sp-page .eyebrow::before { content:""; width:34px; height:1px; background:#2FC7A1; display:inline-block; }
        .sp-page .eyebrow.center { justify-content:center; }
        .sp-page .eyebrow.light { color:#6FE0C6; }
        .sp-page .eyebrow.light::before { background:#6FE0C6; }
        .sp-page .eyebrow.gold { color:#6FE0C6; }
        .sp-page .eyebrow.gold::before { background:#6FE0C6; }

        /* Section head */
        .sp-page .section-head { max-width:760px; margin:0 auto 60px; text-align:center; }
        .sp-page .section-head h2 { font-size:clamp(34px,4.6vw,54px); margin-bottom:18px; }
        .sp-page .section-head p { color:#296166; font-size:17px; }
        .sp-page .section-head.light h2 { color:#F5F8F6; }
        .sp-page .section-head.light p { color:rgba(247,250,252,0.72); }

        /* Buttons */
        .sp-page .btn {
          display:inline-flex; align-items:center; gap:10px;
          font-family:'Inter',sans-serif; font-size:14px; font-weight:600;
          letter-spacing:0.4px; padding:16px 32px; border-radius:4px;
          cursor:pointer; border:1px solid transparent; transition:all .35s cubic-bezier(.22,.61,.36,1);
          text-decoration:none;
        }
        .sp-page .btn-primary { background:#2FC7A1; color:#296166; }
        .sp-page .btn-primary:hover { background:#6FE0C6; transform:translateY(-2px); box-shadow:0 14px 30px rgba(47,199,161,.28); }
        .sp-page .btn-ghost { background:transparent; color:#1A2540; border:2px solid #2FC7A1; }
        .sp-page .btn-ghost:hover { border-color:#2FC7A1; color:#296166; }
        .sp-page .btn-dark { background:#1A2540; color:#F5F8F6; }
        .sp-page .btn-dark:hover { background:#296166; transform:translateY(-2px); }

        /* Tile divider */
        .sp-page .tile-divider {
          height:18px; width:100%;
          background:
            radial-gradient(circle at 10px 9px, #2FC7A1 0 2px, transparent 2.5px),
            radial-gradient(circle at 0 0, transparent 8px, #2FC7A1 8px 8.6px, transparent 9.2px),
            radial-gradient(circle at 20px 0, transparent 8px, #2FC7A1 8px 8.6px, transparent 9.2px),
            radial-gradient(circle at 0 18px, transparent 8px, #2FC7A1 8px 8.6px, transparent 9.2px),
            radial-gradient(circle at 20px 18px, transparent 8px, #2FC7A1 8px 8.6px, transparent 9.2px);
          background-size:20px 18px; background-repeat:repeat-x;
          background-position:left center; background-color:#1A2540;
          display:block; overflow:hidden; opacity:.92;
        }



        /* Hero */
        .sp-page .hero {
          position:relative; min-height:auto; display:flex; align-items:center;
          color:#1B2B28; overflow:hidden;
          background:#FFFFFF;padding:96px 0 70px;
        }
        .sp-page .hero::before {
          content:""; position:absolute; inset:0;
          background-image:
            radial-gradient(circle at 15% 50%, rgba(47,199,161,0.09) 0%, transparent 50%),
            radial-gradient(circle at 85% 20%, rgba(47,199,161,0.06) 0%, transparent 40%);
          z-index:0; pointer-events:none;
        }
        .sp-page .hero-split {
          position:relative; z-index:2; width:100%;
          display:grid; grid-template-columns:1fr 1fr; gap:64px;
          align-items:center; padding-top:110px; padding-bottom:70px;
        }
        .sp-page .hero-copy { display:flex; flex-direction:column; }
        .sp-page .hero h1 { font-size:clamp(38px,5vw,68px); color:#1B2B28; margin-bottom:26px; font-weight:600; line-height:1.08; }
        .sp-page .hero h1 em { font-style:italic; color:#4FA3D1; font-weight:500; }
        .sp-page .hero .lead { font-size:17.5px; color:#4C5C58; max-width:560px; margin-bottom:38px; font-weight:300; line-height:1.72; }
        .sp-page .hero-cta { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:48px; }
        .sp-page .hero-badges { display:flex; gap:36px; flex-wrap:wrap; border-top:1px solid #D8E0EC; padding-top:28px; }
        .sp-page .hero-badge .num { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; line-height:1; }
        .sp-page .hero-badge .lbl { font-size:11.5px; letter-spacing:.6px; color:#7E8C88; margin-top:6px; }

        .sp-page .hero-visual { display:flex; align-items:center; justify-content:center; position:relative; }
        .sp-page .hero-img-frame {
          position:relative; width:100%; max-width:520px;
          border-radius:12px; overflow:hidden;
          box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22);
        }
        .sp-page .hero-img-frame img { display:block; width:100%; height:480px; object-fit:cover; border-radius:12px; transition:transform .9s cubic-bezier(.22,.61,.36,1); }
        .sp-page .hero-img-frame:hover img { transform:scale(1.04); }
        .sp-page .hero-img-frame::after { content:""; position:absolute; inset:12px; border:1px solid rgba(47,199,161,.38); border-radius:8px; pointer-events:none; z-index:2; }
        .sp-page .hero-img-frame::before { content:""; position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.42) 0%,transparent 55%); z-index:1; border-radius:12px; pointer-events:none; }
        .sp-page .hero-visual::before { content:""; position:absolute; top:24px; right:-14px; width:100%; max-width:520px; height:100%; border:1px solid rgba(47,199,161,.18); border-radius:12px; pointer-events:none; }
        .sp-page .hero-img-badge {
          position:absolute; bottom:22px; left:22px; z-index:3;
          background:rgba(26,37,64,.82); backdrop-filter:blur(8px);
          border:1px solid rgba(47,199,161,.30); border-radius:6px;
          padding:10px 16px; display:flex; align-items:center; gap:10px;
        }
        .sp-page .hero-img-badge .flag { font-size:20px; }
        .sp-page .hero-img-badge .cap-txt { font-size:12px; color:rgba(247,250,252,.88); line-height:1.4; }
        .sp-page .hero-img-badge .cap-txt strong { color:#6FE0C6; display:block; font-size:13.5px; }
        .sp-page .scroll-hint {
          position:absolute; bottom:32px; left:50%; transform:translateX(-50%);
          display:flex; flex-direction:column; align-items:center; gap:10px;
          color:#7E8C88; font-size:10.5px; letter-spacing:2.5px; text-transform:uppercase; z-index:3;
        }
        .sp-page .scroll-hint .line { width:1px; height:38px; background:linear-gradient(#2FC7A1,transparent); animation:sp-drop 2s cubic-bezier(.22,.61,.36,1) infinite; }
        @keyframes sp-drop { 0% { transform:scaleY(0); transform-origin:top; } 50% { transform:scaleY(1); transform-origin:top; } 51% { transform-origin:bottom; } 100% { transform:scaleY(0); transform-origin:bottom; } }

        /* Stats Bar */
        .sp-page .stats-bar { background:#1A2540; color:#F5F8F6; }
        .sp-page .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .sp-page .stat-cell { padding:52px 30px; text-align:center; border-right:1px solid rgba(247,250,252,.10); }
        .sp-page .stat-cell:last-child { border-right:none; }
        .sp-page .stat-cell .v { font-family:'Cormorant Garamond',serif; font-size:46px; font-weight:600; color:#6FE0C6; line-height:1; margin-bottom:12px; }
        .sp-page .stat-cell .k { font-size:13px; letter-spacing:.5px; color:rgba(247,250,252,.78); }

        /* About */
        .sp-page .about { background:#F5F8F6; }
        .sp-page .about-grid { display:grid; grid-template-columns:1.05fr 1fr; gap:64px; align-items:center; }
        .sp-page .about-copy h2 { font-size:clamp(32px,4.4vw,52px); margin-bottom:22px; }
        .sp-page .about-copy p { color:#296166; margin-bottom:18px; font-size:16.5px; }
        .sp-page .about-media { position:relative; height:560px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .sp-page .about-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .sp-page .facts-row { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-top:54px; }
        .sp-page .fact { background:#fff; border:1px solid rgba(47,199,161,.25); border-radius:4px; padding:26px 22px; text-align:center; }
        .sp-page .fact .ff { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; }
        .sp-page .fact .fl { font-size:12.5px; color:#296166; letter-spacing:.4px; margin-top:6px; }

        /* Why Spain */
        .sp-page .why { background:#E9F1EE; }
        .sp-page .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#296166; border:1px solid #296166; border-radius:4px; overflow:hidden; }
        .sp-page .why-card { background:#F5F8F6; padding:42px 34px; transition:background .3s; }
        .sp-page .why-card:hover { background:#fff; }
        .sp-page .why-card .ic { width:46px; height:46px; border:1px solid #2FC7A1; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#2FC7A1; font-family:'Cormorant Garamond',serif; font-size:21px; margin-bottom:20px; }
        .sp-page .why-card h3 { font-size:24px; margin-bottom:10px; }
        .sp-page .why-card p { color:#296166; font-size:15px; }

        /* Programme */
        .sp-page .prog { background:#1A2540; color:#F5F8F6; }
        .sp-page .prog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .sp-page .prog-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:4px; padding:38px 32px; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .sp-page .prog-card:hover { border-color:#2FC7A1; transform:translateY(-6px); }
        .sp-page .prog-card .no { font-family:'Cormorant Garamond',serif; font-size:18px; color:#6FE0C6; border-bottom:1px solid rgba(247,250,252,.16); padding-bottom:14px; margin-bottom:18px; letter-spacing:2px; }
        .sp-page .prog-card h3 { color:#F5F8F6; font-size:25px; margin-bottom:12px; }
        .sp-page .prog-card p { color:rgba(247,250,252,.74); font-size:15px; }

        /* Benefits */
        .sp-page .benefits { background:#F5F8F6; }
        .sp-page .ben-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .sp-page .ben-card { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:36px 30px; position:relative; overflow:hidden; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .sp-page .ben-card::before { content:""; position:absolute; top:0; left:0; width:3px; height:0; background:#2FC7A1; transition:height .4s cubic-bezier(.22,.61,.36,1); }
        .sp-page .ben-card:hover { box-shadow:0 18px 50px rgba(26,37,64,.08); transform:translateY(-4px); }
        .sp-page .ben-card:hover::before { height:100%; }
        .sp-page .ben-card .mk { font-family:'Cormorant Garamond',serif; font-size:15px; color:#2FC7A1; letter-spacing:2px; margin-bottom:16px; }
        .sp-page .ben-card h3 { font-size:23px; margin-bottom:10px; }
        .sp-page .ben-card p { color:#296166; font-size:15px; }

        /* Eligibility */
        .sp-page .eligibility-sec { background:#E9F1EE; }
        .sp-page .elig-grid { display:grid; grid-template-columns:1fr 1fr; gap:26px; margin-top:52px; }
        .sp-page .elig-block { border-radius:4px; overflow:hidden; border:1px solid rgba(47,199,161,.25); box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .sp-page .elig-hd { padding:24px 32px; background:#1A2540; display:flex; align-items:center; gap:14px; }
        .sp-page .elig-hd-icon { width:40px; height:40px; background:rgba(47,199,161,.15); border:1px solid rgba(47,199,161,.3); border-radius:6px; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#6FE0C6; font-size:18px; }
        .sp-page .elig-hd h3 { color:#F5F8F6; font-size:20px; margin:0; }
        .sp-page .elig-bd { padding:28px 32px; background:#F5F8F6; }
        .sp-page .elig-list { list-style:none; display:flex; flex-direction:column; gap:12px; }
        .sp-page .elig-list li { display:flex; align-items:flex-start; gap:12px; font-size:14.5px; color:#1B2B28; line-height:1.5; }
        .sp-page .elig-dot { width:6px; height:6px; background:#2FC7A1; border-radius:50%; flex-shrink:0; margin-top:7px; }

        /* Finance */
        .sp-page .finance { background:#1A2540; color:#F5F8F6; }
        .sp-page .fin-cards { display:grid; grid-template-columns:1fr 1fr; gap:26px; }
        .sp-page .fin-option { background:rgba(247,250,252,.04); border:1px solid rgba(47,199,161,.18); border-radius:4px; overflow:hidden; }
        .sp-page .fin-opt-head { padding:22px 30px; border-bottom:1px solid rgba(47,199,161,.12); display:flex; align-items:center; gap:12px; }
        .sp-page .fin-tag-pill { display:inline-block; background:#2FC7A1; color:#296166; font-size:10.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; padding:4px 12px; border-radius:30px; }
        .sp-page .fin-opt-head h3 { color:#F5F8F6; font-size:20px; margin:0; }
        .sp-page .fin-tbl { width:100%; border-collapse:collapse; }
        .sp-page .fin-tbl tr { border-bottom:1px solid rgba(255,255,255,.06); }
        .sp-page .fin-tbl tr:last-child { border-bottom:none; }
        .sp-page .fin-tbl td { padding:15px 30px; font-size:14px; color:rgba(247,250,252,.72); vertical-align:top; line-height:1.5; }
        .sp-page .fin-tbl td:first-child { color:rgba(247,250,252,.48); width:50%; }
        .sp-page .fin-tbl td:last-child { color:#6FE0C6; font-weight:500; }
        .sp-page .fin-tbl small { display:block; font-size:12px; color:rgba(247,250,252,.45); margin-top:4px; }
        .sp-page .fin-banner { margin-top:44px; background:rgba(47,199,161,.08); border:1px solid rgba(47,199,161,.25); border-radius:4px; padding:42px 44px; text-align:center; }
        .sp-page .fin-banner .big-num { font-family:'Cormorant Garamond',serif; font-size:3.6rem; font-weight:700; color:#6FE0C6; line-height:1; display:block; }
        .sp-page .fin-banner .big-lbl { font-size:12px; color:rgba(247,250,252,.55); letter-spacing:.1em; text-transform:uppercase; margin-top:8px; display:block; }
        .sp-page .fin-banner p { color:rgba(247,250,252,.60); font-size:14.5px; margin-top:14px; max-width:500px; margin-left:auto; margin-right:auto; }

        /* Documents */
        .sp-page .documents-sec { background:#F5F8F6; }
        .sp-page .docs-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:52px; }
        .sp-page .doc-card { background:#fff; border-radius:4px; padding:32px 28px; border-left:3px solid #2FC7A1; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .sp-page .doc-cat { font-size:10.5px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#2FC7A1; margin-bottom:18px; display:block; }
        .sp-page .doc-list { list-style:none; display:flex; flex-direction:column; gap:10px; }
        .sp-page .doc-list li { font-size:14px; color:#1B2B28; padding-left:16px; position:relative; line-height:1.5; }
        .sp-page .doc-list li::before { content:''; position:absolute; left:0; top:8px; width:5px; height:5px; background:#2FC7A1; border-radius:50%; }
        .sp-page .docs-note { margin-top:28px; font-size:13px; color:#296166; text-align:center; font-style:italic; }

        /* Process */
        .sp-page .process { background:#1A2540; color:#F5F8F6; }
        .sp-page .timeline { position:relative; max-width:880px; margin:0 auto; }
        .sp-page .timeline::before { content:""; position:absolute; left:31px; top:8px; bottom:8px; width:1px; background:rgba(247,250,252,.18); }
        .sp-page .tl-item { position:relative; padding-left:92px; padding-bottom:44px; }
        .sp-page .tl-item:last-child { padding-bottom:0; }
        .sp-page .tl-item .dot { position:absolute; left:0; top:0; width:64px; height:64px; border-radius:50%; border:1px solid #2FC7A1; background:#1A2540; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:24px; color:#6FE0C6; }
        .sp-page .tl-item h3 { color:#F5F8F6; font-size:25px; margin-bottom:6px; }
        .sp-page .tl-item p { color:rgba(247,250,252,.72); font-size:15px; max-width:620px; }
        .sp-page .tl-time { display:inline-block; margin-top:8px; font-size:11.5px; font-weight:600; color:#6FE0C6; background:rgba(47,199,161,.10); border:1px solid rgba(47,199,161,.22); border-radius:30px; padding:4px 14px; letter-spacing:.05em; }

        /* Family */
        .sp-page .family-sec { background:#F5F8F6; }
        .sp-page .fam-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .sp-page .fam-media { height:520px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); position:relative; }
        .sp-page .fam-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .sp-page .fam-list { list-style:none; }
        .sp-page .fam-list li { display:flex; gap:18px; padding:22px 0; border-bottom:1px solid #E5E5E5; }
        .sp-page .fam-list li:last-child { border-bottom:none; }
        .sp-page .fam-list .fi { flex:0 0 42px; height:42px; border-radius:50%; background:#1A2540; color:#6FE0C6; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:19px; }
        .sp-page .fam-list h4 { font-size:21px; margin-bottom:2px; }
        .sp-page .fam-list p { color:#296166; font-size:14.5px; }

        /* Pathway */
        .sp-page .pathway-sec { background:#E9F1EE; }
        .sp-page .pathway-grid { display:grid; grid-template-columns:1fr 1fr; gap:26px; margin-top:52px; }
        .sp-page .path-card { border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .sp-page .path-head { padding:30px 34px; background:#1A2540; }
        .sp-page .path-badge { display:inline-block; background:rgba(47,199,161,.15); border:1px solid rgba(47,199,161,.3); color:#6FE0C6; font-size:10.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:5px 14px; border-radius:30px; margin-bottom:14px; }
        .sp-page .path-head h3 { color:#F5F8F6; font-size:22px; }
        .sp-page .path-body { padding:30px 34px; background:#F5F8F6; }
        .sp-page .tl-mini { display:flex; gap:18px; margin-bottom:22px; position:relative; }
        .sp-page .tl-mini:not(:last-child)::after { content:''; position:absolute; left:18px; top:38px; bottom:-12px; width:1px; background:rgba(47,199,161,.25); }
        .sp-page .tl-mini:last-child { margin-bottom:0; }
        .sp-page .tl-mini-num { width:36px; height:36px; background:#fff; border:2px solid #2FC7A1; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:14px; font-weight:700; color:#296166; flex-shrink:0; }
        .sp-page .tl-mini-content h4 { font-size:16px; margin-bottom:4px; color:#296166; }
        .sp-page .tl-mini-content p { font-size:13.5px; color:#296166; line-height:1.5; }

        /* Life in Spain */
        .sp-page .life { background:#F5F8F6; }
        .sp-page .life-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .sp-page .life-card { position:relative; height:420px; border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .sp-page .life-card img { transition:transform .8s cubic-bezier(.22,.61,.36,1); }
        .sp-page .life-card:hover img { transform:scale(1.06); }
        .sp-page .life-card .ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.88) 0%,rgba(26,37,64,.18) 55%,transparent 100%); z-index:1; }
        .sp-page .life-card .cap { position:absolute; left:0; right:0; bottom:0; z-index:2; padding:30px 28px; }
        .sp-page .life-card .cap h3 { color:#F5F8F6; font-size:27px; margin-bottom:6px; }
        .sp-page .life-card .cap p { color:rgba(247,250,252,.82); font-size:14px; }
        .sp-page .life-strip { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; margin-top:48px; }
        .sp-page .life-tag { border:1px solid #296166; border-radius:40px; padding:10px 22px; font-size:13.5px; color:#296166; background:#fff; }

        /* Living Details */
        .sp-page .living-details { background:#1A2540; color:#F5F8F6; position:relative; overflow:hidden; }
        .sp-page .living-details::before { content:''; position:absolute; inset:0; background-image:url('https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1800&auto=format&fit=crop'); background-size:cover; background-position:center; opacity:.07; }
        .sp-page .living-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .sp-page .living-card { background:rgba(247,250,252,.05); border:1px solid rgba(47,199,161,.15); border-radius:4px; padding:36px 30px; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .sp-page .living-card:hover { background:rgba(47,199,161,.07); border-color:rgba(47,199,161,.35); }
        .sp-page .living-card h3 { color:#F5F8F6; font-size:22px; margin-bottom:10px; }
        .sp-page .living-card p { color:rgba(247,250,252,.60); font-size:14.5px; line-height:1.65; }
        .sp-page .living-icon { width:46px; height:46px; background:rgba(47,199,161,.10); border-radius:8px; display:flex; align-items:center; justify-content:center; margin-bottom:18px; }
        .sp-page .living-icon svg { width:22px; height:22px; stroke:#6FE0C6; stroke-width:1.6; fill:none; }

        /* Tax */
        .sp-page .tax { background:#E9F1EE; }
        .sp-page .tax-inner { display:grid; grid-template-columns:1.1fr 1fr; gap:72px; align-items:center; }
        .sp-page .tax-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:20px; }
        .sp-page .tax-copy p { color:#296166; font-size:16px; margin-bottom:16px; }
        .sp-page .tax-note { background:rgba(41,97,102,.07); border-left:3px solid #296166; padding:18px 22px; margin-top:24px; font-size:13.5px; color:#1B2B28; line-height:1.6; }
        .sp-page .tax-cards { display:flex; flex-direction:column; gap:18px; }
        .sp-page .tax-card-item { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:24px 26px; }
        .sp-page .tax-card-item h4 { font-size:19px; margin-bottom:6px; }
        .sp-page .tax-card-item p { color:#296166; font-size:14px; }

        /* Comparison */
        .sp-page .comparison { background:#F5F8F6; }
        .sp-page .comp-wrap { overflow-x:auto; border-radius:4px; box-shadow:0 18px 50px rgba(26,37,64,.08); border:1px solid #E5E5E5; }
        .sp-page .comp-table { width:100%; border-collapse:collapse; min-width:600px; }
        .sp-page .comp-table thead tr { background:#1A2540; }
        .sp-page .comp-table th { padding:20px 26px; text-align:left; font-family:'Inter',sans-serif; font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:rgba(247,250,252,.6); }
        .sp-page .comp-table th:first-child { color:rgba(247,250,252,.4); }
        .sp-page .comp-table th.hl { color:#6FE0C6; }
        .sp-page .comp-table tbody tr { border-bottom:1px solid #E5E5E5; }
        .sp-page .comp-table tbody tr:last-child { border-bottom:none; }
        .sp-page .comp-table tbody tr:nth-child(even) { background:#E9F1EE; }
        .sp-page .comp-table td { padding:16px 26px; font-size:14.5px; color:#296166; vertical-align:middle; }
        .sp-page .comp-table td:first-child { color:#296166; font-weight:600; }
        .sp-page .comp-table td.hl { background:rgba(47,199,161,.07); color:#296166; font-weight:600; border-left:2px solid rgba(47,199,161,.3); }
        .sp-page .comp-note { margin-top:18px; font-size:12.5px; color:#296166; text-align:center; font-style:italic; }

        /* Why Langma */
        .sp-page .langma { background:#1A2540; color:#F5F8F6; position:relative; overflow:hidden; }
        .sp-page .langma-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:center; }
        .sp-page .langma h2 { color:#F5F8F6; font-size:clamp(32px,4.4vw,52px); margin-bottom:20px; }
        .sp-page .langma .lead { color:rgba(247,250,252,.82); font-size:17px; margin-bottom:14px; }
        .sp-page .lg-list { display:grid; grid-template-columns:1fr 1fr; gap:30px 36px; }
        .sp-page .lg-item h4 { color:#6FE0C6; font-size:22px; margin-bottom:6px; }
        .sp-page .lg-item p { color:rgba(247,250,252,.72); font-size:14.5px; }

        /* FAQ */
        .sp-page .faq { background:#F5F8F6; }
        .sp-page .faq-wrap { max-width:880px; margin:0 auto; }
        .sp-page .faq-item { border-bottom:1px solid #E5E5E5; }
        .sp-page .faq-q { width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:28px 0; display:flex; justify-content:space-between; align-items:center; gap:24px; font-family:'Cormorant Garamond',serif; font-size:23px; color:#296166; font-weight:600; }
        .sp-page .faq-q .pm { flex:0 0 30px; height:30px; border:1px solid #2FC7A1; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#2FC7A1; font-family:'Inter',sans-serif; font-size:18px; transition:all .3s; }
        .sp-page .faq-item.open .pm { background:#2FC7A1; color:#296166; transform:rotate(45deg); }
        .sp-page .faq-a { max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(.22,.61,.36,1); }
        .sp-page .faq-a p { padding:0 0 28px; color:#296166; font-size:16px; max-width:760px; }

        /* Lead form */
        .sp-page .lead-sec { background:#1A2540; color:#F5F8F6; }
        .sp-page .lead-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:start; }
        .sp-page .lead-copy h2 { color:#F5F8F6; font-size:clamp(32px,4.2vw,50px); margin-bottom:20px; }
        .sp-page .lead-copy p { color:rgba(247,250,252,.80); margin-bottom:26px; font-size:16.5px; }
        .sp-page .lead-assure { list-style:none; }
        .sp-page .lead-assure li { display:flex; gap:12px; align-items:center; padding:11px 0; color:rgba(247,250,252,.86); font-size:15px; }
        .sp-page .lead-assure li::before { content:"✓"; color:#6FE0C6; font-weight:700; }
        .sp-page .form-card { background:#F5F8F6; border-radius:4px; padding:42px; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .sp-page .form-card h3 { font-size:27px; margin-bottom:6px; }
        .sp-page .form-card .fsub { color:#296166; font-size:14.5px; margin-bottom:26px; }
        .sp-page .frow { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .sp-page .field { margin-bottom:16px; }
        .sp-page .field label { display:block; font-size:12px; letter-spacing:.5px; text-transform:uppercase; color:#296166; font-weight:600; margin-bottom:7px; }
        .sp-page .field input,.sp-page .field select,.sp-page .field textarea { width:100%; padding:13px 15px; border:1px solid #E5E5E5; border-radius:4px; font-family:'Inter',sans-serif; font-size:15px; background:#fff; color:#1B2B28; transition:border-color .25s; }
        .sp-page .field input:focus,.sp-page .field select:focus,.sp-page .field textarea:focus { outline:none; border-color:#2FC7A1; box-shadow:0 0 0 3px rgba(47,199,161,.15); }
        .sp-page .field textarea { resize:vertical; min-height:90px; }
        .sp-page .form-card .btn { width:100%; justify-content:center; margin-top:6px; }
        .sp-page .form-card .disc { font-size:12px; color:#296166; margin-top:14px; text-align:center; }
        .sp-page .success { display:none; background:rgba(47,199,161,.12); border:1px solid #2FC7A1; border-radius:4px; padding:16px; color:#296166; font-size:14.5px; text-align:center; margin-top:16px; }
        .sp-page .success.show { display:block; }

        /* Office */
        .sp-page .office { background:#E9F1EE; }
        .sp-page .office-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:60px; align-items:center; }
        .sp-page .office-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:18px; }
        .sp-page .office-copy p { color:#296166; font-size:16.5px; margin-bottom:26px; }
        .sp-page .office-points { list-style:none; margin-bottom:8px; }
        .sp-page .office-points li { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid #E5E5E5; }
        .sp-page .office-points .oi { flex:0 0 38px; height:38px; border-radius:50%; border:1px solid #2FC7A1; color:#2FC7A1; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; }
        .sp-page .office-points h4 { font-size:19px; margin-bottom:1px; }
        .sp-page .office-points p { font-size:14px; margin:0; color:#296166; }
        .sp-page .office-form { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:40px; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .sp-page .office-form h3 { font-size:25px; margin-bottom:22px; }


        /* Reveal animation */
        .sp-page .sp-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1); }
        .sp-page .sp-reveal.in { opacity:1; transform:none; }

        /* Responsive */
        @media(max-width:980px) {
          .sp-page .about-grid,.sp-page .fam-grid,.sp-page .langma-grid,.sp-page .lead-grid,.sp-page .office-grid,.sp-page .tax-inner { grid-template-columns:1fr; gap:40px; }
          .sp-page .stats-grid,.sp-page .why-grid,.sp-page .prog-grid,.sp-page .ben-grid,.sp-page .life-grid,.sp-page .living-grid,.sp-page .elig-grid,.sp-page .pathway-grid { grid-template-columns:1fr 1fr; }
          .sp-page .facts-row { grid-template-columns:1fr 1fr; }
          .sp-page .lg-list { grid-template-columns:1fr; }
          .sp-page .about-media,.sp-page .fam-media { height:420px; }
          .sp-page .fin-cards,.sp-page .docs-grid { grid-template-columns:1fr; }
          .sp-page .hero-split { grid-template-columns:1fr; gap:48px; padding-top:120px; padding-bottom:60px; }
          .sp-page .hero-img-frame img { height:380px; }
          .sp-page .hero-visual::before { display:none; }
          .sp-page .hero-img-frame { max-width:100%; }
          .sp-page .foot-grid { grid-template-columns:1fr 1fr; }
        }
        @media(max-width:640px) {
          .sp-page .block { padding:74px 0; }
          .sp-page .container { padding:0 22px; }
          .sp-page .stats-grid,.sp-page .why-grid,.sp-page .prog-grid,.sp-page .ben-grid,.sp-page .life-grid,.sp-page .living-grid,.sp-page .facts-row,.sp-page .elig-grid,.sp-page .pathway-grid,.sp-page .fin-cards,.sp-page .docs-grid { grid-template-columns:1fr; }
          .sp-page .stat-cell { border-right:none; border-bottom:1px solid rgba(247,250,252,.10); }
          .sp-page .frow { grid-template-columns:1fr; }
          .sp-page .hero-badges { gap:22px; }
          .sp-page .form-card,.sp-page .office-form { padding:30px; }
          .sp-page .hero-img-frame img { height:280px; }
        }
        @media(prefers-reduced-motion:reduce) {
          .sp-page * { animation:none!important; transition:none!important; }
          .sp-page .sp-reveal { opacity:1; transform:none; }
        }
      `}</style>


      <main>
        {/* ===== HERO ===== */}
        <section className="hero">
          <div className="container">
            <div className="hero-split">
              <div className="hero-copy">
                <span className="eyebrow light">Spain Non-Lucrative Visa · Residency for Financially Independent Persons</span>
                <h1>Live in <em>Spain</em> on<br />Your Own Terms</h1>
                <p className="lead">A legally structured, Schengen-based residency for financially independent individuals and families — guided from eligibility to permit by Langma International's experienced advisory team.</p>
                <div className="hero-cta">
                  <a href="#lead" className="btn btn-primary">Book a Private Consultation</a>
                  <a href="#about-spain" className="btn btn-ghost">Explore the Programme</a>
                </div>
                <div className="hero-badges">
                  {[
                    { num: '€28,880', lbl: 'Min. Annual Income' },
                    { num: '4+', lbl: 'Months to Permit' },
                    { num: '5 yrs', lbl: 'To Permanent Residency' },
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
                  <img src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1000&auto=format&fit=crop" alt="Madrid skyline at golden hour, Spain" />
                  <div className="hero-img-badge">
                    <span className="flag">🇪🇸</span>
                    <div className="cap-txt">
                      <strong>Kingdom of Spain</strong>
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
              <div className="stat-cell sp-reveal"><div className="v">€28,880</div><div className="k">Annual income requirement, main applicant</div></div>
              <div className="stat-cell sp-reveal"><div className="v">5 yrs</div><div className="k">Continuous residence toward permanent residency</div></div>
              <div className="stat-cell sp-reveal"><div className="v">Schengen</div><div className="k">Visa-free travel across 26 member nations</div></div>
              <div className="stat-cell sp-reveal"><div className="v">10 yrs</div><div className="k">Pathway to Spanish citizenship</div></div>
            </div>
          </div>
        </section>

        {/* ===== ABOUT SPAIN ===== */}
        <section className="block about" id="about-spain">
          <div className="container">
            <div className="about-grid">
              <div className="about-copy sp-reveal">
                <span className="eyebrow">Discover Spain</span>
                <h2>Spain: a sun-drenched European powerhouse with an unmatched quality of life</h2>
                <p>Positioned at the crossroads of Europe and the Atlantic world, Spain is the fourth-largest country in the European Union by area and the fifth by population, home to approximately 47.3 million people. A constitutional monarchy and parliamentary democracy, Spain has been a committed EU member state since 1986 and a founding participant in the Eurozone, using the euro as its official currency. Madrid serves as the capital and cultural heart, while cities such as Barcelona, Seville, Valencia and Bilbao each possess a distinctive identity that continues to attract internationally mobile individuals and families.</p>
                <p>The Spanish economy — one of the largest in the Eurozone — is anchored by tourism, professional services, advanced manufacturing, agriculture and an expanding technology sector. Spain's infrastructure is among the most modern in Europe, with an extensive high-speed rail network, international airports, and well-developed motorway connections linking its diverse regions.</p>
                <p>For those seeking a structured, lived-in European residency rooted in legal permanence rather than minimal-presence investment, Spain offers a direct and well-regulated pathway through the Non-Lucrative Visa.</p>
              </div>
              <div className="about-media sp-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop" alt="Iconic Spanish architecture under a bright blue sky" />
              </div>
            </div>
            <div className="facts-row">
              {[
                { ff: '47.3M', fl: 'Population' },
                { ff: 'Madrid', fl: 'Capital city' },
                { ff: 'Euro (€)', fl: 'Official currency' },
                { ff: 'EU & Schengen', fl: 'Member state since 1986' },
              ].map((f, i) => (
                <div className="fact sp-reveal" key={i}><div className="ff">{f.ff}</div><div className="fl">{f.fl}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY SPAIN ===== */}
        <section className="block why" id="why-spain">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center">Why Global Families Choose Spain</span>
              <h2>Europe's Most Coveted Address for the Globally Mobile</h2>
              <p>Spain occupies a unique position among European residency destinations — combining the legal weight of full EU membership with a quality of life that few countries can match.</p>
            </div>
            <div className="why-grid">
              {[
                { ic: '★', t: 'EU member-state residence', p: 'Full EU membership, robust rule of law, and institutional stability — the legal foundation that makes Spanish residency a genuinely durable long-term commitment.' },
                { ic: '☀', t: 'Mediterranean lifestyle', p: "From the Atlantic north to the sun-drenched Costa del Sol, Spain's climate, cuisine and cultural richness draw relocating families and retirees from around the world." },
                { ic: '⊕', t: 'Schengen freedom of movement', p: 'As a Schengen Area member, Spanish residency grants visa-free travel to 26 European countries — a significant privilege for internationally active individuals and their families.' },
                { ic: '✎', t: 'International schooling', p: 'An extensive international school network serving major cities, coastal regions and tourist centres offers English, French and multilingual curricula for relocating families.' },
                { ic: '✚', t: 'World-class healthcare', p: "Spain's public health system is consistently rated among the world's best. Resident families access public healthcare services free of charge alongside a well-regarded private sector." },
                { ic: '⌖', t: 'Geographic diversity', p: "From Atlantic coast to Mediterranean shore, from mountain ranges to historic interior cities — Spain's regions offer a breadth of living environments unmatched in Western Europe." },
              ].map((c, i) => (
                <div className="why-card sp-reveal" key={i}><div className="ic">{c.ic}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        <div className="tile-divider" aria-hidden="true"></div>

        {/* ===== PROGRAMME ===== */}
        <section className="block prog" id="programme">
          <div className="container">
            <div className="section-head sp-reveal light">
              <span className="eyebrow center gold">The Programme</span>
              <h2>The Spain Non-Lucrative Visa, explained clearly</h2>
              <p>A residency route built around financial self-sufficiency rather than investment — accessible, well-regulated and designed for genuine long-term residence.</p>
            </div>
            <div className="prog-grid">
              {[
                { no: '01 · DEFINITION', t: 'What is the NLV?', p: 'The Spain Non-Lucrative Visa (Visado de Residencia No Lucrativa) is a residence permit for non-EU/EEA nationals with sufficient passive income to support themselves in Spain without local employment or professional activity.' },
                { no: '02 · ELIGIBILITY', t: 'Who can apply?', p: 'Non-EU/EEA nationals aged 18 or over with a clean criminal record, valid health insurance, accommodation in Spain and demonstrable passive income — from pensions, dividends, rental income, savings interest or similar sources.' },
                { no: '03 · INCOME', t: 'The income requirement', p: 'A minimum of €28,880 per year for the main applicant, plus €7,200 per year for each dependent family member. Income must be verifiable, regular and passive in nature.' },
                { no: '04 · STRUCTURE', t: 'The residence permit', p: 'The consular visa allows entry to Spain, where the holder completes registration with the immigration authorities (Extranjería) to obtain the physical residence permit card. The first permit is issued for one year.' },
                { no: '05 · RENEWAL', t: 'Renewal cycle', p: 'The initial one-year permit is renewable for successive two-year periods, provided the holder continues to meet the income and genuine-residence conditions throughout each renewal cycle.' },
                { no: '06 · PATHWAY', t: 'Long-term pathway', p: 'After five years of continuous, lawful residence in Spain, holders become eligible for permanent residency. A further five years of residence as a permanent resident opens the pathway to Spanish citizenship.' },
              ].map((c, i) => (
                <div className="prog-card sp-reveal" key={i}><div className="no">{c.no}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BENEFITS ===== */}
        <section className="block benefits" id="benefits">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center">Key Benefits</span>
              <h2>What Spanish Residency Gives You and Your Family</h2>
              <p>The Spain Non-Lucrative Visa opens a set of meaningful rights from the moment your permit is granted.</p>
            </div>
            <div className="ben-grid">
              {[
                { mk: 'I', t: 'Right to Reside in Spain', p: 'You and your included family members are lawfully established in Spain, with the right to reside year-round — a status that also entitles you to enter the country even during periods when tourist access is restricted.' },
                { mk: 'II', t: 'Schengen-Wide Freedom of Movement', p: 'Your Spanish residence permit grants visa-free travel across all 26 Schengen Area countries for stays of up to 90 days within any rolling 180-day period.' },
                { mk: 'III', t: 'Full Banking Access', p: 'As a Spanish resident, you can open bank accounts, hold deposits and conduct international transfers with Spanish and European financial institutions.' },
                { mk: 'IV', t: 'Public Healthcare & Education', p: "Resident families access Spain's public healthcare system free of charge. Children enrolled as dependants have the right to attend state schools and universities." },
                { mk: 'V', t: 'Family-Inclusive Residency', p: 'The programme accommodates whole families. Your spouse or partner, financially dependent children and financially dependent parents can all be included in a single, consolidated application.' },
                { mk: 'VI', t: 'Pathway to Permanent Residency & Citizenship', p: 'After five continuous years of lawful residence in Spain, you become eligible to apply for permanent residency. A further five years opens the pathway to Spanish citizenship.' },
              ].map((c, i) => (
                <div className="ben-card sp-reveal" key={i}><div className="mk">{c.mk}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ELIGIBILITY ===== */}
        <section className="block eligibility-sec" id="eligibility">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center">Eligibility</span>
              <h2>Who Qualifies for the Spain Non-Lucrative Visa?</h2>
              <p>Spain's Non-Lucrative Visa is structured for non-EU, non-EEA nationals who can demonstrate financial self-sufficiency through verifiable passive income. Eligibility extends to the whole family unit.</p>
            </div>
            <div className="elig-grid">
              <div className="elig-block sp-reveal">
                <div className="elig-hd">
                  <div className="elig-hd-icon">①</div>
                  <h3>Main Applicant Requirements</h3>
                </div>
                <div className="elig-bd">
                  <ul className="elig-list">
                    {[
                      'Aged 18 years or older',
                      'National of a non-EU, non-EEA country',
                      'No criminal record in Spain or in countries of prior residence',
                      'Demonstrable passive income of at least €28,880 per year (pensions, dividends, rental income, savings interest, or similar)',
                      'Residential accommodation in Spain — either rented or owned',
                      'Valid private health insurance policy with coverage in Spain',
                      'No intention to carry out employment or professional activity in Spain',
                    ].map((item, i) => (
                      <li key={i}><span className="elig-dot"></span>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="elig-block sp-reveal">
                <div className="elig-hd">
                  <div className="elig-hd-icon">②</div>
                  <h3>Eligible Family Members</h3>
                </div>
                <div className="elig-bd">
                  <ul className="elig-list">
                    {[
                      <><strong>Spouse or partner</strong> — in a legally registered marriage or officially recognised partnership</>,
                      <><strong>Children</strong> — financially dependent on the main applicant and unmarried</>,
                      <><strong>Parents</strong> — financially dependent on the main applicant</>,
                      'Each dependent requires an additional €7,200 per year in demonstrated income above the primary threshold',
                      'All family members are subject to the same accommodation, health insurance, and background requirements',
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
            <div className="section-head sp-reveal light">
              <span className="eyebrow center gold">Financial Requirements</span>
              <h2>Understanding the Income &amp; Cost Structure</h2>
              <p>The Spain Non-Lucrative Visa does not carry a minimum investment threshold. The primary requirement is demonstrable passive income. Below is a transparent breakdown of the income requirements and associated costs.</p>
            </div>
            <div className="fin-cards">
              {[
                {
                  tag: 'Option A', title: 'Renting Property in Spain',
                  rows: [
                    ['Property rental', <>No minimum price restriction<small>Approx. €900/month for a one-bed apartment</small></>],
                    ['Document translation & certification', '€1,000+'],
                    ['Private health insurance', '~€1,000 per person / year'],
                    ['Consulate administrative fee', 'Up to €150 per person'],
                    ['Residence permit card fee', '€75 per person'],
                  ]
                },
                {
                  tag: 'Option B', title: 'Purchasing Property in Spain',
                  rows: [
                    ['Property purchase', <>No minimum price restriction<small>Avg. ~€3,700 per m² (varies by region)</small></>],
                    ['Document translation & certification', '€1,000+'],
                    ['Private health insurance', '~€1,000 per person / year'],
                    ['Consulate administrative fee', 'Up to €150 per person'],
                    ['Residence permit card fee', '€75 per person'],
                  ]
                }
              ].map((opt, i) => (
                <div className="fin-option sp-reveal" key={i}>
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
            <div className="fin-banner sp-reveal">
              <span className="big-num">€28,880</span>
              <span className="big-lbl">Minimum Annual Passive Income — Main Applicant</span>
              <p>Each additional dependant family member requires a further €7,200 per year above this base figure. Acceptable income sources include pensions, investment dividends, rental income from abroad, bank interest and savings.</p>
            </div>
          </div>
        </section>

        {/* ===== DOCUMENTS ===== */}
        <section className="block documents-sec" id="documents">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center">Required Documents</span>
              <h2>Documentation Checklist</h2>
              <p>A thorough, well-organised document pack is one of the most important factors in a successful Non-Lucrative Visa application. Langma International supports clients in gathering, certifying and presenting every required document.</p>
            </div>
            <div className="docs-grid">
              {[
                {
                  cat: 'Identity & Status',
                  items: [
                    'Valid national passport (minimum 1 year validity remaining)',
                    'Completed Spain Non-Lucrative Visa application form',
                    'Recent passport-size photographs',
                    'Police clearance certificate from home country (apostilled)',
                    'If applicable, police clearance from any country of residence in the past 5 years',
                  ]
                },
                {
                  cat: 'Financial Evidence',
                  items: [
                    'Bank statements (typically last 3–6 months) demonstrating passive income',
                    'Proof of pension entitlement (if applicable)',
                    'Dividend certificates or investment account statements',
                    'Rental income contracts and documentation (if applicable)',
                    'Certified translation of all financial documents',
                  ]
                },
                {
                  cat: 'Accommodation & Health',
                  items: [
                    'Rental agreement for a property in Spain, or proof of property ownership',
                    'Valid private health insurance policy covering Spain (without co-payment)',
                    'Insurance certificate confirming coverage throughout the residency period',
                    'Documents certified with Apostille where required by the Spanish consulate',
                  ]
                },
              ].map((doc, i) => (
                <div className="doc-card sp-reveal" key={i}>
                  <span className="doc-cat">{doc.cat}</span>
                  <ul className="doc-list">
                    {doc.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <p className="docs-note">* Document requirements may vary depending on the Spanish consulate in your country of residence. Langma International provides jurisdiction-specific guidance and assists with certified translation and apostille procedures.</p>
          </div>
        </section>

        {/* ===== PROCESS ===== */}
        <section className="block process" id="process">
          <div className="container">
            <div className="section-head sp-reveal light">
              <span className="eyebrow center gold">The Application Journey</span>
              <h2>Your Step-by-Step Journey to Spanish Residency</h2>
              <p>Langma International manages every stage of your application — from initial eligibility assessment through to the issuance of your Spanish residence permit card.</p>
            </div>
            <div className="timeline">
              {[
                { d: '01', t: 'Eligibility & Strategy Review', p: 'Our advisors conduct a thorough assessment of your income sources, family profile and personal circumstances to confirm eligibility and design the most appropriate application strategy.', time: 'Weeks 1–2' },
                { d: '02', t: 'Document Preparation', p: 'We guide you through the complete document checklist — including apostille procedures, certified translations and income verification — ensuring your pack meets consulate standards precisely.', time: 'Weeks 3–6' },
                { d: '03', t: 'Consulate Application Submission', p: 'Your application is submitted at the Spanish consulate in your country of residence. We prepare you for the consular appointment and coordinate all submission logistics on your behalf.', time: 'Month 2–3' },
                { d: '04', t: 'Permit Registration & Card Collection', p: 'Upon visa approval and your arrival in Spain, we assist with the registration process at the immigration authorities (Extranjería) to obtain your physical residence permit card.', time: 'Month 4+' },
              ].map((s, i) => (
                <div className="tl-item sp-reveal" key={i}>
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
              <div className="fam-media sp-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1511895426328-dc8714191011?q=80&w=1200&auto=format&fit=crop" alt="A family enjoying life together in Spain" />
              </div>
              <div className="sp-reveal">
                <span className="eyebrow">Family Inclusion</span>
                <h2 style={{ fontSize: 'clamp(30px,4vw,48px)', marginBottom: 26 }}>One Application. Residency for the Whole Family.</h2>
                <p style={{ color: '#296166', fontSize: 16, marginBottom: 22 }}>The Spain Non-Lucrative Visa is one of the few European residency pathways that allows the applicant's parents to be included as dependants — alongside the more commonly eligible spouse, partner and children. This makes it a particularly strong option for multigenerational families considering a move to Europe.</p>
                <p style={{ color: '#296166', fontSize: 16, marginBottom: 28 }}>Each family member included in the application must be covered by the income threshold: €7,200 per year for each dependent above the main applicant's base requirement of €28,880.</p>
                <ul className="fam-list">
                  {[
                    { n: '①', t: 'Main Applicant', p: 'Non-EU/EEA national, 18+, with qualifying passive income and a clean criminal record.' },
                    { n: '②', t: 'Spouse or Registered Partner', p: 'In a legally recognised marriage or official partnership — may be included regardless of nationality.' },
                    { n: '③', t: 'Dependent Children', p: 'Financially dependent on the main applicant and unmarried at the time of application.' },
                    { n: '④', t: 'Financially Dependent Parents', p: 'A distinctive feature of the Spain NLV — dependent parents of the main applicant are eligible for inclusion.' },
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
            <div className="section-head sp-reveal">
              <span className="eyebrow center">Long-Term Pathway</span>
              <h2>From Temporary Residency to Spanish Citizenship</h2>
              <p>The Spain Non-Lucrative Visa is a renewable permit that, when maintained continuously, creates a structured route to permanent residency and ultimately Spanish nationality.</p>
            </div>
            <div className="pathway-grid">
              <div className="path-card sp-reveal">
                <div className="path-head">
                  <div className="path-badge">Renewal Process</div>
                  <h3>Maintaining &amp; Renewing Your Permit</h3>
                </div>
                <div className="path-body">
                  {[
                    { n: '1', t: 'Initial Permit — 1 Year', p: 'Your first Spain Non-Lucrative Visa is valid for one year from the date of issue. During this period, you must spend sufficient time in Spain to demonstrate genuine residence.' },
                    { n: '2', t: 'First Renewal — 2 Years', p: 'Before your initial permit expires, you apply for the first renewal, which — if approved — is valid for two years. You must continue to meet the income threshold and residence requirements.' },
                    { n: '3', t: 'Subsequent Renewals — 2 Years Each', p: 'Further renewal cycles of two years continue until you reach the five-year threshold at which permanent residency eligibility opens.' },
                  ].map((step, i) => (
                    <div className="tl-mini" key={i}>
                      <div className="tl-mini-num">{step.n}</div>
                      <div className="tl-mini-content"><h4>{step.t}</h4><p>{step.p}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="path-card sp-reveal">
                <div className="path-head">
                  <div className="path-badge">Long-Term Route</div>
                  <h3>Permanent Residency &amp; Spanish Citizenship</h3>
                </div>
                <div className="path-body">
                  {[
                    { n: '5', t: 'Permanent Residency Eligibility at Year 5', p: 'After five consecutive years of lawful, continuous residence in Spain, you become eligible to apply for long-term (permanent) residency — a status that removes the income demonstration requirement.' },
                    { n: '10', t: 'Spanish Citizenship Pathway at Year 10', p: 'After a further five years of residence as a permanent resident (totalling ten years), applicants may pursue Spanish citizenship, typically requiring demonstrated proficiency in Spanish.' },
                    { n: '⚑', t: 'Important Note on Renunciation', p: 'Spain generally requires applicants for Spanish citizenship to renounce their previous nationality. Exceptions apply in limited cases. Langma International advises clients on the implications at the appropriate stage.' },
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

        {/* ===== LIFE IN SPAIN ===== */}
        <section className="block life" id="living">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center">Life in Spain</span>
              <h2>Where will your family put down roots?</h2>
              <p>From a sun-drenched Mediterranean coast to a dynamic modern capital, Spain offers distinct settings for distinct lives.</p>
            </div>
            <div className="life-grid">
              {[
                { img: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=1200&auto=format&fit=crop', alt: 'Barcelona rooftops and Gothic Quarter at dusk', t: 'Barcelona', p: 'A cosmopolitan Mediterranean capital of architecture, culture and international connectivity.' },
                { img: 'https://images.unsplash.com/photo-1592386708687-a8ccc6e26d4f?q=80&w=1200&auto=format&fit=crop', alt: 'Madrid gran via at night', t: 'Madrid', p: "Spain's vibrant capital — world-class museums, restaurants and a thriving international community." },
                { img: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1200&auto=format&fit=crop', alt: 'Sunny Spanish coastal town with white buildings', t: 'Costa del Sol', p: 'Over 300 days of sunshine per year, warm waters and a well-established community of international residents.' },
              ].map((c, i) => (
                <div className="life-card sp-reveal" key={i}>
                  <img src={c.img} alt={c.alt} /><div className="ov"></div><div className="cap"><h3>{c.t}</h3><p>{c.p}</p></div>
                </div>
              ))}
            </div>
            <div className="life-strip">
              {['Mediterranean living', 'Celebrated cuisine & culture', 'Safe, walkable cities', 'International communities', 'Warm climate year-round', 'English widely spoken in cities'].map((t, i) => (
                <span className="life-tag sp-reveal" key={i}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== LIVING DETAILS ===== */}
        <section className="block living-details">
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-head sp-reveal light">
              <span className="eyebrow center gold">The Experience of Living in Spain</span>
              <h2>Understanding the daily reality of Spanish life is essential for families planning a relocation</h2>
              <p>Spain consistently ranks among Europe's most liveable countries across healthcare, education, safety and cost of living.</p>
            </div>
            <div className="living-grid">
              {[
                { icon: <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, t: 'Healthcare', p: "Spain's public healthcare system is regarded among the best in the world by the World Health Organization. Non-Lucrative Visa holders and their families access public health services, while an active private healthcare sector offers fast-track specialist access." },
                { icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, t: 'Housing', p: "Spain's property market offers considerable regional variety. Madrid and Barcelona represent premium urban markets, while coastal areas and mid-sized cities such as Seville, Valencia and Málaga offer excellent quality at lower price points." },
                { icon: <svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z"/></svg>, t: 'Education', p: "Spain's public school system is free for resident children. An established international school network — offering curricula in English, French, German and other languages — serves internationally mobile families across major urban centres and tourist regions." },
                { icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>, t: 'Climate', p: "Spain's climate ranges from the mild Atlantic north to the warm Mediterranean south and the dry interior plateau. Southern regions such as Andalusia and the Costa del Sol enjoy over 300 days of sunshine per year — a significant draw for families relocating from Northern Europe and beyond." },
                { icon: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, t: 'Cost of Living', p: "Outside Madrid and Barcelona, Spain's cost of living is meaningfully lower than in the UK, Germany or France, particularly for dining, transport and everyday services. This makes the NLV income threshold achievable for retirees and passive-income earners at relatively modest income levels." },
                { icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, t: 'Safety & Stability', p: "Spain consistently ranks among Europe's safer countries. As a mature EU democracy with a stable legal environment, it provides the institutional certainty that internationally mobile families and retirees prioritise when selecting a long-term base." },
              ].map((c, i) => (
                <div className="living-card sp-reveal" key={i}>
                  <div className="living-icon">{c.icon}</div>
                  <h3>{c.t}</h3>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TAX ===== */}
        <section className="block tax" id="tax">
          <div className="container">
            <div className="tax-inner">
              <div className="tax-copy sp-reveal">
                <span className="eyebrow">Tax Considerations</span>
                <h2>Tax &amp; Residency — What You Need to Know</h2>
                <p>Taxation is one of the most important planning dimensions when considering Spanish residency. The relevant regime depends on the number of days you spend in Spain each calendar year and your overall financial profile.</p>
                <p>The general rule in Spain is that individuals who spend more than 183 days in the country within a given tax year become Spanish tax residents. Spanish tax residents are subject to worldwide income taxation under Spanish law, rather than tax on Spanish-source income only.</p>
                <p>However, Spain operates a Special Expat Tax Regime that may benefit certain eligible newcomers. Additionally, for individuals who become tax resident in Spain, the tax treaty network between Spain and their home country is highly relevant in avoiding double taxation.</p>
                <div className="tax-note">
                  <strong>Langma International strongly advises all prospective Non-Lucrative Visa applicants to obtain independent advice from a qualified Spanish tax lawyer or cross-border tax specialist before applying.</strong> Tax treatment varies significantly by individual circumstance, income source, prior residence and treaty position. This page does not constitute tax advice.
                </div>
              </div>
              <div className="tax-cards sp-reveal">
                {[
                  { t: '183-Day Tax Residency Threshold', p: 'Individuals spending more than 183 days in Spain in a calendar year are generally treated as Spanish tax residents for that year, triggering liability on worldwide income.' },
                  { t: 'Double Taxation Treaties', p: "Spain has an extensive network of double taxation agreements with countries globally, which can significantly affect the total tax burden for newly resident individuals with foreign-source income." },
                  { t: 'Wealth & Inheritance Tax', p: "Spain levies a wealth tax on residents above certain thresholds and an inheritance and gift tax. Both vary by regional authority, as Spain's autonomous communities set their own supplementary rates and exemptions." },
                  { t: 'Pension Income Considerations', p: 'How foreign pension income is treated in Spain depends on the tax treaty between Spain and the pension-paying country. Treaty provisions on pension taxation differ significantly and require specific professional review.' },
                ].map((c, i) => (
                  <div className="tax-card-item" key={i}><h4>{c.t}</h4><p>{c.p}</p></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== COMPARISON ===== */}
        <section className="block comparison" id="comparison">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center">Programme Comparison</span>
              <h2>How Spain Compares to Portugal &amp; Italy</h2>
              <p>Spain is not the only EU country offering residency to financially independent individuals. This comparison highlights the key differences across the three most popular European programmes.</p>
            </div>
            <div className="comp-wrap sp-reveal">
              <table className="comp-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="hl">🇪🇸 Spain</th>
                    <th>🇵🇹 Portugal (D7)</th>
                    <th>🇮🇹 Italy</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Minimum Annual Income', '€28,880', '€10,440', '€31,160'],
                    ['Typical Obtaining Period', '4+ months', '6+ months', '4+ months'],
                    ['Initial Permit Validity', '1 year, renewable', '2 years, renewable', '1 year, renewable'],
                    ['Time to Citizenship', '10 years', '5 years', '10 years'],
                    ['Eligible Family Members', 'Spouse, children, parents', 'Spouse, children under 21, parents', 'Spouse, children under 18'],
                    ['Schengen Access', 'Yes — 26 countries', 'Yes — 26 countries', 'Yes — 26 countries'],
                    ['To Permanent Residency', '5 years', '5 years', '5 years'],
                  ].map((row, i) => (
                    <tr key={i}>
                      <td>{row[0]}</td>
                      <td className="hl">{row[1]}</td>
                      <td>{row[2]}</td>
                      <td>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="comp-note">* All figures are indicative based on publicly available information and are subject to change under national legislation. Contact Langma International for current advisory guidance.</p>
          </div>
        </section>

        <div className="tile-divider" aria-hidden="true"></div>

        {/* ===== WHY LANGMA ===== */}
        <section className="block langma" id="langma">
          <div className="container">
            <div className="langma-grid">
              <div className="sp-reveal">
                <span className="eyebrow light">Why Langma International</span>
                <h2>A trusted partner for a process that deserves care</h2>
                <p className="lead">We help individuals and families access European residency through transparent guidance, strategic planning and genuinely personalised support — never overpromising, never guaranteeing outcomes we cannot control.</p>
                <p className="lead">From the first conversation to your residence card, you work with people who understand both the regulation and the human reality of relocating a life.</p>
              </div>
              <div className="lg-list sp-reveal">
                {[
                  { t: 'Compliance-First Approach', p: 'Every advisory engagement is grounded in accuracy, compliance and the specific regulatory requirements of the Spanish immigration system. We do not cut corners or create unrealistic expectations.' },
                  { t: 'End-to-End Case Management', p: 'From initial eligibility assessment through to receipt of your physical residence card, Langma International manages the complete process — coordinating documentation, consulate logistics and in-country registration.' },
                  { t: 'Specialist Legal Network', p: 'We work with a vetted network of qualified Spanish immigration lawyers and notaries, ensuring that each stage of your application receives licensed professional attention in-country.' },
                  { t: 'Long-Term Residency Strategy', p: 'Our relationship with clients does not end at permit issuance. We provide ongoing advisory support at each renewal stage and guide clients through the transition to permanent residency when the time comes.' },
                ].map((c, i) => <div className="lg-item" key={i}><h4>{c.t}</h4><p>{c.p}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="block faq" id="faq">
          <div className="container">
            <div className="section-head sp-reveal">
              <span className="eyebrow center">Frequently Asked Questions</span>
              <h2>Common Questions About the Spain Non-Lucrative Visa</h2>
            </div>
            <div className="faq-wrap">
              {[
                { q: 'What exactly is the Spain Non-Lucrative Visa?', a: 'The Spain Non-Lucrative Visa (Visado de Residencia No Lucrativa) is a Spanish residence permit that allows non-EU and non-EEA nationals to live in Spain without the right to engage in employment or professional activities in the country. It is designed for individuals and families who can demonstrate sufficient passive income to support themselves independently. The initial visa is valid for one year and can be renewed to build towards permanent residency and, ultimately, Spanish citizenship.' },
                { q: 'Can I work in Spain on a Non-Lucrative Visa?', a: 'No. The Spain Non-Lucrative Visa expressly prohibits the holder from carrying out any form of paid employment, self-employment or professional activity in Spain. The permit is specifically designed for those whose income derives from sources outside Spain — such as pensions, dividends, rental income from foreign properties or savings interest. If you wish to work in Spain, a different visa category applies.' },
                { q: 'How much income do I need to qualify?', a: 'The minimum income requirement for the main applicant is €28,880 per year. Each additional dependent family member included in the application requires a further €7,200 per year above this figure. So, for example, a couple with two dependent children would need to demonstrate a minimum annual income of approximately €28,880 + (3 × €7,200) = €50,480. Income sources accepted include pensions, investment dividends, interest from savings, and rental income derived from properties abroad.' },
                { q: 'Do I need to buy property in Spain to apply?', a: 'No. You are not required to purchase property to obtain the Spain Non-Lucrative Visa. A valid rental agreement for a residential property in Spain is sufficient. There is no minimum value requirement for either a rented or purchased property — any residential property of any price is acceptable. The key requirement is that you have a fixed residential address in Spain.' },
                { q: 'How long does the application process take?', a: 'The total process from initial document preparation to receipt of the residence permit card typically takes four months or more. The exact timeline varies depending on the Spanish consulate in your country of residence, consulate appointment availability, the completeness of your document pack and the processing time at the Spanish immigration authorities following your arrival in Spain. Langma International manages the process to minimise delays.' },
                { q: 'When can I apply for permanent residency in Spain?', a: 'After five years of continuous, lawful residence in Spain on a Non-Lucrative Visa (including renewals), you become eligible to apply for long-term permanent residency. Permanent residency in Spain is not subject to an income requirement and does not carry a time limit on its validity. It grants you the right to remain in Spain indefinitely, subject to compliance with Spanish law.' },
                { q: 'Will I need to give up my current passport to get Spanish citizenship?', a: 'Spain generally requires applicants for Spanish nationality to renounce their previous citizenship. There are limited exceptions — for example, nationals of certain Latin American countries and the Philippines enjoy treaties with Spain that permit dual nationality. Langma International provides clients with specific guidance on nationality renunciation implications at the appropriate stage of their long-term residency planning.' },
                { q: 'Will living in Spain make me a Spanish tax resident?', a: "If you spend more than 183 days in Spain in a calendar year, you will generally be considered a Spanish tax resident and subject to Spanish income tax on your worldwide income. The tax implications are specific to each individual's income structure, country of origin and applicable double taxation treaties. Langma International strongly recommends that all prospective applicants seek independent advice from a qualified Spanish or cross-border tax specialist before proceeding. This page does not constitute tax advice." },
              ].map((faq, i) => (
                <div className={`faq-item sp-reveal ${openFaq === i ? 'open' : ''}`} key={i}>
                  <button className="faq-q" onClick={() => toggleFaq(i)}>
                    <span>{faq.q}</span>
                    <span className="pm">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="faq-a" style={{ maxHeight: openFaq === i ? '500px' : '0' }}>
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
              <div className="lead-copy sp-reveal">
                <span className="eyebrow light">Begin Your Journey</span>
                <h2>Speak with a Langma International Advisor</h2>
                <p>Our team provides a confidential, no-obligation consultation for individuals and families considering the Spain Non-Lucrative Visa. We will assess your eligibility, explain the process in detail and give you a clear, honest picture of the pathway ahead.</p>
                <ul className="lead-assure">
                  {[
                    'Confidential, no-obligation initial consultation',
                    'Honest eligibility assessment — no false promises',
                    'Clear explanation of the full process and costs',
                    'Family-inclusive planning from the outset',
                    'Introductions to licensed Spanish legal professionals',
                  ].map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
              <div className="form-card sp-reveal">
                <h3>Request a Consultation</h3>
                <p className="fsub">Complete the form and an advisor will be in touch within one business day.</p>
                <form onSubmit={handleLeadSubmit} noValidate>
                  <div className="frow">
                    <div className="field"><label htmlFor="l-fname">First name</label><input type="text" id="l-fname" required /></div>
                    <div className="field"><label htmlFor="l-lname">Last name</label><input type="text" id="l-lname" required /></div>
                  </div>
                  <div className="field"><label htmlFor="l-email">Email address</label><input type="email" id="l-email" required /></div>
                  <div className="field"><label htmlFor="l-country">Country of residence</label><input type="text" id="l-country" placeholder="Where are you currently based?" required /></div>
                  <div className="field">
                    <label htmlFor="l-interest">Enquiry type</label>
                    <select id="l-interest" required defaultValue="">
                      <option value="" disabled>— Please select —</option>
                      <option>Spain Non-Lucrative Visa — Individual</option>
                      <option>Spain Non-Lucrative Visa — Family Application</option>
                      <option>Eligibility Assessment</option>
                      <option>General Information</option>
                      <option>Renewal or Ongoing Case</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="message">Message (optional)</label>
                    <textarea id="message" placeholder="Briefly describe your situation or any specific questions you have..."></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={leadLoading}>{leadLoading ? 'Sending...' : 'Request Consultation'}</button>
                  <p className="disc">By submitting, you agree to Langma International's privacy policy. Your details are kept confidential and will not be shared without your consent.</p>
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
              <div className="office-copy sp-reveal">
                <span className="eyebrow">In Person</span>
                <h2>Visit Langma International</h2>
                <p>Prefer to meet face to face? Sit down with our advisory team for a private, in-depth conversation about your Spain residency pathway — at a time that suits you.</p>
                <ul className="office-points">
                  {[
                    { i: '✦', t: 'Meet our advisory team', p: 'A direct conversation with the people who will guide your Spain Non-Lucrative Visa case from start to finish.' },
                    { i: '✓', t: 'Discuss your eligibility', p: 'An honest, confidential review of your income profile, family situation and personal timeline — with no obligation.' },
                    { i: '⊞', t: 'Document assessment', p: 'Bring your existing documents for a preliminary review — understanding what you have and what you still need is the first practical step.' },
                    { i: '↪', t: 'Personalised roadmap discussion', p: 'Leave with a clear, structured understanding of your application pathway, realistic timelines, and the next steps to take.' },
                  ].map((c, i) => (
                    <li key={i}><span className="oi">{c.i}</span><div><h4>{c.t}</h4><p>{c.p}</p></div></li>
                  ))}
                </ul>
              </div>
              <div className="office-form sp-reveal">
                <h3>Schedule Your Consultation</h3>
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
                        <option value="" disabled>Select</option>
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
                      <option>Spain Non-Lucrative Visa eligibility</option>
                      <option>Family application planning</option>
                      <option>Document review</option>
                      <option>Renewal or ongoing permit</option>
                      <option>General Spain residency enquiry</option>
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
      </main>

    </div>
  );
};

export default SpainNLVPage;
