import React, { useState, useEffect } from 'react';
import useResidencyLeadForms from '../../hooks/useResidencyLeadForms';

const SERVICE = 'Switzerland Residence Permit';

const SwitzerlandPRPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const {
    handleLeadSubmit,
    leadLoading,
    leadMsg, leadSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Switzerland Residency Consultation', requirePhone: false, leadOnly: true });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });
    document.querySelectorAll('.sw-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="sw-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        .sw-page * { margin:0; padding:0; box-sizing:border-box; }
        .sw-page {
          font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
          color:#296166;
          background:#F5F8F6;
          line-height:1.7;
          font-weight:400;
          -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        .sw-page h1,.sw-page h2,.sw-page h3,.sw-page h4 {
          font-family:'Cormorant Garamond',Georgia,serif;
          font-weight:600;
          color:#296166;
          line-height:1.12;
          letter-spacing:0.2px;
        }
        .sw-page img { display:block; width:100%; height:100%; object-fit:cover; }
        .sw-page .container { max-width:1200px; margin:0 auto; padding:0 30px; }
        .sw-page .block { padding:108px 0; }

        /* Eyebrow */
        .sw-page .eyebrow {
          font-family:'Inter',sans-serif; text-transform:uppercase; letter-spacing:3.5px;
          font-size:11.5px; color:#6FE0C6; font-weight:600; margin-bottom:18px;
          display:flex; align-items:center; gap:12px;
        }
        .sw-page .eyebrow::before { content:""; width:34px; height:1px; background:#6FE0C6; display:inline-block; flex-shrink:0; }
        .sw-page .eyebrow.center { justify-content:center; }
        .sw-page .eyebrow.light { color:#6FE0C6; }
        .sw-page .eyebrow.light::before { background:#6FE0C6; }

        /* Section head */
        .sw-page .section-head { max-width:760px; margin:0 auto 60px; text-align:center; }
        .sw-page .section-head .eyebrow { justify-content:center; }
        .sw-page .section-head h2 { font-size:clamp(34px,4.6vw,54px); margin-bottom:18px; }
        .sw-page .section-head p { color:#296166; font-size:17px; }
        .sw-page .section-head.light h2 { color:#F5F8F6; }
        .sw-page .section-head.light p { color:rgba(247,250,252,0.72); }

        /* Buttons */
        .sw-page .btn {
          display:inline-flex; align-items:center; gap:10px;
          font-family:'Inter',sans-serif; font-size:14px; font-weight:600;
          letter-spacing:0.4px; padding:16px 32px; border-radius:4px;
          cursor:pointer; border:1px solid transparent; transition:all .35s cubic-bezier(.22,.61,.36,1);
          text-decoration:none;
        }
        .sw-page .btn-primary { background:#6FE0C6; color:#296166; }
        .sw-page .btn-primary:hover { background:#6FE0C6; transform:translateY(-2px); box-shadow:0 14px 30px rgba(47,199,161,.28); }
        .sw-page .btn-ghost { background:transparent; color:#1A2540; border:2px solid #2FC7A1; }
        .sw-page .btn-ghost:hover { border-color:#6FE0C6; color:#6FE0C6; }
        .sw-page .btn-dark { background:#1A2540; color:#F5F8F6; }
        .sw-page .btn-dark:hover { background:#296166; transform:translateY(-2px); }

        /* Swiss Divider */
        .sw-page .swiss-divider {
          height:16px; width:100%;
          background:#1A2540;
          display:flex;
          align-items:center;
          justify-content:center;
          position:relative;
          overflow:hidden;
        }
        .sw-page .swiss-divider::before {
          content:"";
          position:absolute; inset:0;
          background:repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(47,199,161,0.25) 38px, rgba(47,199,161,0.25) 40px);
        }

        /* Tile divider */
        .sw-page .tile-divider {
          height:18px; width:100%;
          background:
            radial-gradient(circle at 10px 9px, #6FE0C6 0 2px, transparent 2.5px),
            radial-gradient(circle at 0 0, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px),
            radial-gradient(circle at 20px 0, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px),
            radial-gradient(circle at 0 18px, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px),
            radial-gradient(circle at 20px 18px, transparent 8px, #6FE0C6 8px 8.6px, transparent 9.2px);
          background-size:20px 18px; background-repeat:repeat-x;
          background-position:left center; background-color:#1A2540;
          display:block; overflow:hidden; opacity:.92;
        }

        /* Hero */
        .sw-page .hero {
          position:relative; min-height:auto; display:flex; align-items:center;
          color:#1B2B28; overflow:hidden;
          background:#FFFFFF;padding:96px 0 70px;
        }
        .sw-page .hero::before {
          content:""; position:absolute; inset:0;
          background-image:
            radial-gradient(circle at 20% 50%, rgba(47,199,161,0.09) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(196,18,48,0.06) 0%, transparent 40%);
          z-index:0; pointer-events:none;
        }
        .sw-page .hero-split {
          position:relative; z-index:2; width:100%;
          display:grid; grid-template-columns:1fr 1fr; gap:64px;
          align-items:center; padding-top:110px; padding-bottom:70px;
        }
        .sw-page .hero-copy { display:flex; flex-direction:column; }
        .sw-page .hero h1 { font-size:clamp(38px,5vw,66px); color:#1B2B28; margin-bottom:26px; font-weight:600; line-height:1.08; }
        .sw-page .hero h1 em { font-style:italic; color:#4FA3D1; font-weight:500; }
        .sw-page .hero .lead { font-size:17.5px; color:#4C5C58; max-width:560px; margin-bottom:38px; font-weight:300; line-height:1.72; }
        .sw-page .hero-cta { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:48px; }
        .sw-page .hero-badges { display:flex; gap:36px; flex-wrap:wrap; border-top:1px solid #D8E0EC; padding-top:28px; }
        .sw-page .hero-badge .num { font-family:'Cormorant Garamond',serif; font-size:28px; color:#296166; font-weight:600; line-height:1; }
        .sw-page .hero-badge .lbl { font-size:11.5px; letter-spacing:.6px; color:#7E8C88; margin-top:6px; }

        .sw-page .hero-visual { display:flex; align-items:center; justify-content:center; position:relative; }
        .sw-page .hero-img-frame {
          position:relative; width:100%; max-width:520px;
          border-radius:12px; overflow:hidden;
          box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22);
        }
        .sw-page .hero-img-frame img { display:block; width:100%; height:480px; object-fit:cover; border-radius:12px; transition:transform .9s cubic-bezier(.22,.61,.36,1); }
        .sw-page .hero-img-frame:hover img { transform:scale(1.04); }
        .sw-page .hero-img-frame::after { content:""; position:absolute; inset:12px; border:1px solid rgba(47,199,161,.38); border-radius:8px; pointer-events:none; z-index:2; }
        .sw-page .hero-img-frame::before { content:""; position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.42) 0%,transparent 55%); z-index:1; border-radius:12px; pointer-events:none; }
        .sw-page .hero-visual::before { content:""; position:absolute; top:24px; right:-14px; width:100%; max-width:520px; height:100%; border:1px solid rgba(47,199,161,.18); border-radius:12px; pointer-events:none; }
        .sw-page .hero-img-badge {
          position:absolute; bottom:22px; left:22px; z-index:3;
          background:rgba(26,37,64,.82); backdrop-filter:blur(8px);
          border:1px solid rgba(47,199,161,.30); border-radius:6px;
          padding:10px 16px; display:flex; align-items:center; gap:10px;
        }
        .sw-page .scroll-hint {
          position:absolute; bottom:32px; left:50%; transform:translateX(-50%);
          display:flex; flex-direction:column; align-items:center; gap:10px;
          color:#7E8C88; font-size:10.5px; letter-spacing:2.5px; text-transform:uppercase; z-index:3;
        }
        .sw-page .scroll-hint .line { width:1px; height:38px; background:linear-gradient(#6FE0C6,transparent); animation:sw-drop 2s cubic-bezier(.22,.61,.36,1) infinite; }
        @keyframes sw-drop { 0% { transform:scaleY(0); transform-origin:top; } 50% { transform:scaleY(1); transform-origin:top; } 51% { transform-origin:bottom; } 100% { transform:scaleY(0); transform-origin:bottom; } }

        /* Stats Bar */
        .sw-page .stats-bar { background:#1A2540; color:#F5F8F6; }
        .sw-page .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .sw-page .stat-cell { padding:52px 30px; text-align:center; border-right:1px solid rgba(247,250,252,.10); }
        .sw-page .stat-cell:last-child { border-right:none; }
        .sw-page .stat-cell .v { font-family:'Cormorant Garamond',serif; font-size:42px; font-weight:600; color:#6FE0C6; line-height:1; margin-bottom:12px; }
        .sw-page .stat-cell .k { font-size:13px; letter-spacing:.5px; color:rgba(247,250,252,.78); }

        /* About */
        .sw-page .about { background:#F5F8F6; }
        .sw-page .about-grid { display:grid; grid-template-columns:1.05fr 1fr; gap:64px; align-items:center; }
        .sw-page .about-copy h2 { font-size:clamp(32px,4.4vw,52px); margin-bottom:22px; }
        .sw-page .about-copy p { color:#296166; margin-bottom:18px; font-size:16.5px; }
        .sw-page .about-media { position:relative; height:560px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .sw-page .about-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .sw-page .facts-row { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-top:54px; }
        .sw-page .fact { background:#fff; border:1px solid rgba(47,199,161,.25); border-radius:4px; padding:26px 22px; text-align:center; }
        .sw-page .fact .ff { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; }
        .sw-page .fact .fl { font-size:12.5px; color:#296166; letter-spacing:.4px; margin-top:6px; }

        /* Living */
        .sw-page .living { background:#E9F1EE; }
        .sw-page .living-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:center; }
        .sw-page .living-media { position:relative; height:520px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .sw-page .living-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .sw-page .living-tags { display:flex; flex-wrap:wrap; gap:10px; margin-top:24px; }
        .sw-page .living-tag { border:1px solid #E5E5E5; border-radius:40px; padding:8px 18px; font-size:13px; color:#296166; background:#fff; }

        /* Why */
        .sw-page .why { background:#F5F8F6; }
        .sw-page .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#296166; border:1px solid #296166; border-radius:4px; overflow:hidden; }
        .sw-page .why-card { background:#F5F8F6; padding:42px 34px; transition:background .3s; }
        .sw-page .why-card:hover { background:#fff; }
        .sw-page .why-card .ic { width:46px; height:46px; border:1px solid #6FE0C6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#296166; font-family:'Cormorant Garamond',serif; font-size:21px; margin-bottom:20px; }
        .sw-page .why-card h3 { font-size:24px; margin-bottom:10px; }
        .sw-page .why-card p { color:#296166; font-size:15px; }

        /* Programme */
        .sw-page .prog { background:#1A2540; color:#F5F8F6; }
        .sw-page .prog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .sw-page .prog-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:4px; padding:38px 32px; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .sw-page .prog-card:hover { border-color:#6FE0C6; transform:translateY(-6px); }
        .sw-page .prog-card .no { font-family:'Cormorant Garamond',serif; font-size:18px; color:#6FE0C6; border-bottom:1px solid rgba(247,250,252,.16); padding-bottom:14px; margin-bottom:18px; letter-spacing:1.5px; text-transform:uppercase; }
        .sw-page .prog-card h3 { color:#F5F8F6; font-size:25px; margin-bottom:12px; }
        .sw-page .prog-card p { color:rgba(247,250,252,.74); font-size:15px; }

        /* Benefits */
        .sw-page .benefits { background:#F5F8F6; }
        .sw-page .ben-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .sw-page .ben-card { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:36px 30px; position:relative; overflow:hidden; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .sw-page .ben-card::before { content:""; position:absolute; top:0; left:0; width:3px; height:0; background:#6FE0C6; transition:height .4s cubic-bezier(.22,.61,.36,1); }
        .sw-page .ben-card:hover { box-shadow:0 18px 50px rgba(26,37,64,.08); transform:translateY(-4px); }
        .sw-page .ben-card:hover::before { height:100%; }
        .sw-page .ben-card .mk { font-family:'Cormorant Garamond',serif; font-size:22px; color:#296166; letter-spacing:1px; margin-bottom:16px; }
        .sw-page .ben-card h3 { font-size:23px; margin-bottom:10px; }
        .sw-page .ben-card p { color:#296166; font-size:15px; }

        /* Finance / Eligibility */
        .sw-page .finance { background:#E9F1EE; }
        .sw-page .fin-table { background:#fff; border:1px solid rgba(47,199,161,.25); border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .sw-page .fin-row { display:grid; grid-template-columns:2fr 1fr 1fr; align-items:center; border-bottom:1px solid #E5E5E5; }
        .sw-page .fin-row:last-child { border-bottom:none; }
        .sw-page .fin-row.head { background:#1A2540; }
        .sw-page .fin-row.head .fc { padding:22px 28px; font-family:'Inter',sans-serif; font-size:13px; letter-spacing:.6px; text-transform:uppercase; color:rgba(247,250,252,.8); }
        .sw-page .fc { padding:22px 28px; font-size:15.5px; }
        .sw-page .fc.label { font-weight:600; color:#296166; }
        .sw-page .fc.fig { font-family:'Cormorant Garamond',serif; font-size:26px; color:#296166; font-weight:600; }
        .sw-page .fin-note { margin-top:24px; font-size:13.5px; color:#296166; text-align:center; font-style:italic; }

        /* Family */
        .sw-page .family-sec { background:#F5F8F6; }
        .sw-page .fam-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .sw-page .fam-media { height:520px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); position:relative; }
        .sw-page .fam-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .sw-page .fam-list { list-style:none; }
        .sw-page .fam-list li { display:flex; gap:18px; padding:22px 0; border-bottom:1px solid #E5E5E5; }
        .sw-page .fam-list li:last-child { border-bottom:none; }
        .sw-page .fam-list .fi { flex:0 0 42px; height:42px; border-radius:50%; background:#1A2540; color:#6FE0C6; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:19px; }
        .sw-page .fam-list h4 { font-size:21px; margin-bottom:2px; }
        .sw-page .fam-list p { color:#296166; font-size:14.5px; }

        /* Process */
        .sw-page .process { background:#1A2540; color:#F5F8F6; }
        .sw-page .timeline { position:relative; max-width:880px; margin:0 auto; }
        .sw-page .timeline::before { content:""; position:absolute; left:31px; top:8px; bottom:8px; width:1px; background:rgba(247,250,252,.18); }
        .sw-page .tl-item { position:relative; padding-left:92px; padding-bottom:44px; }
        .sw-page .tl-item:last-child { padding-bottom:0; }
        .sw-page .tl-item .dot { position:absolute; left:0; top:0; width:64px; height:64px; border-radius:50%; border:1px solid #6FE0C6; background:#1A2540; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:24px; color:#6FE0C6; }
        .sw-page .tl-item h3 { color:#F5F8F6; font-size:25px; margin-bottom:6px; }
        .sw-page .tl-item p { color:rgba(247,250,252,.72); font-size:15px; max-width:620px; }
        .sw-page .tl-time { display:inline-block; margin-top:10px; font-family:'Inter',sans-serif; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#6FE0C6; font-weight:600; }

        /* Life */
        .sw-page .life { background:#F5F8F6; }
        .sw-page .life-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-bottom:48px; }
        .sw-page .life-card { position:relative; height:420px; border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .sw-page .life-card img { transition:transform .8s cubic-bezier(.22,.61,.36,1); }
        .sw-page .life-card:hover img { transform:scale(1.06); }
        .sw-page .life-card .ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.88) 0%,rgba(26,37,64,.18) 55%,transparent 100%); z-index:1; }
        .sw-page .life-card .cap { position:absolute; left:0; right:0; bottom:0; z-index:2; padding:30px 28px; }
        .sw-page .life-card .cap h3 { color:#F5F8F6; font-size:27px; margin-bottom:6px; }
        .sw-page .life-strip { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; margin-top:48px; }
        .sw-page .life-tag { border:1px solid #E5E5E5; border-radius:40px; padding:10px 22px; font-size:13.5px; color:#296166; background:#fff; }

        /* Langma */
        .sw-page .langma { background:#1A2540; color:#F5F8F6; }
        .sw-page .langma-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:center; }
        .sw-page .langma h2 { color:#F5F8F6; font-size:clamp(32px,4.4vw,52px); margin-bottom:20px; }
        .sw-page .lg-list { display:grid; grid-template-columns:1fr 1fr; gap:30px 36px; }
        .sw-page .lg-item h4 { color:#6FE0C6; font-size:22px; margin-bottom:6px; }
        .sw-page .lg-item p { color:rgba(247,250,252,.72); font-size:14.5px; }

        /* FAQ */
        .sw-page .faq { background:#F5F8F6; }
        .sw-page .faq-wrap { max-width:880px; margin:0 auto; }
        .sw-page .faq-item { border-bottom:1px solid #E5E5E5; }
        .sw-page .faq-q { width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:28px 0; display:flex; justify-content:space-between; align-items:center; gap:24px; font-family:'Cormorant Garamond',serif; font-size:22px; color:#296166; font-weight:600; }
        .sw-page .faq-q .pm { flex:0 0 30px; height:30px; border:1px solid #6FE0C6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#296166; font-family:'Inter',sans-serif; font-size:18px; transition:all .3s; }
        .sw-page .faq-item.open .pm { background:#6FE0C6; color:#296166; transform:rotate(45deg); }
        .sw-page .faq-a { max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(.22,.61,.36,1); }
        .sw-page .faq-a p { padding:0 0 28px; color:#296166; font-size:16px; max-width:760px; }

        /* Lead form */
        .sw-page .lead-sec { background:#1A2540; color:#F5F8F6; }
        .sw-page .lead-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:start; }
        .sw-page .lead-copy h2 { color:#F5F8F6; font-size:clamp(32px,4.2vw,50px); margin-bottom:20px; }
        .sw-page .lead-copy p { color:rgba(247,250,252,.80); margin-bottom:26px; font-size:16.5px; }
        .sw-page .lead-assure { list-style:none; }
        .sw-page .lead-assure li { display:flex; gap:12px; align-items:center; padding:11px 0; color:rgba(247,250,252,.86); font-size:15px; }
        .sw-page .lead-assure li::before { content:"✓"; color:#6FE0C6; font-weight:700; }
        .sw-page .form-card { background:#F5F8F6; border-radius:4px; padding:42px; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .sw-page .form-card h3 { font-size:27px; margin-bottom:6px; }
        .sw-page .form-card .fsub { color:#296166; font-size:14.5px; margin-bottom:26px; }
        .sw-page .frow { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .sw-page .field { margin-bottom:16px; }
        .sw-page .field label { display:block; font-size:12px; letter-spacing:.5px; text-transform:uppercase; color:#296166; font-weight:600; margin-bottom:7px; }
        .sw-page .field input,.sw-page .field select { width:100%; padding:13px 15px; border:1px solid #E5E5E5; border-radius:4px; font-family:'Inter',sans-serif; font-size:15px; background:#fff; color:#296166; transition:border-color .25s; }
        .sw-page .field input:focus,.sw-page .field select:focus { outline:none; border-color:#6FE0C6; box-shadow:0 0 0 3px rgba(47,199,161,.15); }
        .sw-page .form-card .btn { width:100%; justify-content:center; margin-top:6px; }
        .sw-page .form-card .disc { font-size:12px; color:#296166; margin-top:14px; text-align:center; }
        .sw-page .success { display:none; background:rgba(47,199,161,.12); border:1px solid #6FE0C6; border-radius:4px; padding:16px; color:#296166; font-size:14.5px; text-align:center; margin-top:16px; }
        .sw-page .success.show { display:block; }

        /* Office */
        .sw-page .office { background:#E9F1EE; }
        .sw-page .office-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:60px; align-items:center; }
        .sw-page .office-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:18px; }
        .sw-page .office-copy p { color:#296166; font-size:16.5px; margin-bottom:26px; }
        .sw-page .office-points { list-style:none; margin-bottom:8px; }
        .sw-page .office-points li { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid #E5E5E5; }
        .sw-page .office-points li:last-child { border-bottom:none; }
        .sw-page .office-points .oi { flex:0 0 38px; height:38px; border-radius:50%; border:1px solid #6FE0C6; color:#296166; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; }
        .sw-page .office-points h4 { font-size:19px; margin-bottom:1px; }
        .sw-page .office-points p { font-size:14px; margin:0; color:#296166; }
        .sw-page .office-form { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:40px; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .sw-page .office-form h3 { font-size:25px; margin-bottom:22px; }

        /* Footer */
        .sw-page .foot { background:#1A2540; color:rgba(247,250,252,.7); padding:74px 0 32px; }
        .sw-page .foot-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1.3fr; gap:44px; margin-bottom:50px; }
        .sw-page .foot-logo { font-family:'Cormorant Garamond',serif; font-size:28px; color:#F5F8F6; font-weight:600; letter-spacing:1px; margin-bottom:18px; }
        .sw-page .foot-logo span { color:#6FE0C6; }
        .sw-page .foot-grid > div > p { font-size:14px; max-width:320px; line-height:1.7; }
        .sw-page .foot-col h5 { color:#F5F8F6; font-size:13px; text-transform:uppercase; letter-spacing:2px; margin-bottom:20px; font-weight:600; font-family:'Inter',sans-serif; }
        .sw-page .foot-col ul { list-style:none; display:flex; flex-direction:column; gap:10px; }
        .sw-page .foot-col a { display:block; font-size:14px; color:rgba(247,250,252,.7); text-decoration:none; transition:color .25s; }
        .sw-page .foot-col a:hover { color:#6FE0C6; }
        .sw-page .foot-bottom { border-top:1px solid rgba(247,250,252,.12); padding-top:26px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:14px; font-size:12.5px; }

        /* Reveal */
        .sw-page .sw-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1); }
        .sw-page .sw-reveal.in { opacity:1; transform:none; }

        /* Responsive */
        @media(max-width:980px) {
          .sw-page .about-grid,.sw-page .living-grid,.sw-page .fam-grid,.sw-page .langma-grid,.sw-page .lead-grid,.sw-page .office-grid { grid-template-columns:1fr; gap:40px; }
          .sw-page .stats-grid,.sw-page .why-grid,.sw-page .prog-grid,.sw-page .ben-grid,.sw-page .life-grid { grid-template-columns:1fr 1fr; }
          .sw-page .facts-row { grid-template-columns:1fr 1fr; }
          .sw-page .about-media,.sw-page .fam-media,.sw-page .living-media { height:420px; }
          .sw-page .hero-split { grid-template-columns:1fr; gap:48px; padding-top:120px; padding-bottom:60px; }
          .sw-page .hero-img-frame img { height:380px; }
          .sw-page .hero-visual::before { display:none; }
          .sw-page .hero-img-frame { max-width:100%; }
          .sw-page .foot-grid { grid-template-columns:1fr 1fr; }
        }
        @media(max-width:640px) {
          .sw-page .block { padding:74px 0; }
          .sw-page .container { padding:0 22px; }
          .sw-page .stats-grid,.sw-page .why-grid,.sw-page .prog-grid,.sw-page .ben-grid,.sw-page .life-grid,.sw-page .facts-row { grid-template-columns:1fr; }
          .sw-page .stat-cell { border-right:none; border-bottom:1px solid rgba(247,250,252,.10); }
          .sw-page .frow { grid-template-columns:1fr; }
          .sw-page .hero-badges { gap:22px; }
          .sw-page .form-card,.sw-page .office-form { padding:30px; }
          .sw-page .foot-grid { grid-template-columns:1fr; }
        }
        @media(prefers-reduced-motion:reduce) {
          .sw-page * { animation:none!important; transition:none!important; }
          .sw-page .sw-reveal { opacity:1; transform:none; }
        }
      `}</style>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="hero-split">
              <div className="hero-copy">
                <span className="eyebrow light">Switzerland Residence Permit · Lump-Sum Taxation</span>
                <h1>Swiss residency through <em>financial independence</em></h1>
                <p className="lead">Switzerland's residence pathway for financially independent individuals offers one of the world's most distinguished addresses, alongside a unique tax arrangement structured around your global expenditure. Langma International provides structured guidance from eligibility assessment through to an issued Swiss residence permit.</p>
                <div className="hero-cta">
                  <a href="#lead" className="btn btn-primary">Book Your Private Consultation</a>
                  <a href="#programme" className="btn btn-ghost">Explore the Programme</a>
                </div>
                <div className="hero-badges">
                  {[
                    { num: 'CHF 450K+', lbl: 'Annual lump-sum tax from' },
                    { num: '183+', lbl: 'Days/year in Switzerland' },
                    { num: 'Schengen', lbl: 'Area member state' },
                    { num: '10 yrs', lbl: 'Citizenship pathway' },
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
                  <img src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200" alt="Switzerland Residence Permit — Zurich lakefront" />
                  <div className="hero-img-badge">
                    <span>Zurich, Switzerland</span>
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
              <div className="stat-cell sw-reveal"><div className="v">CHF 450K+</div><div className="k">Annual lump-sum tax starting point</div></div>
              <div className="stat-cell sw-reveal"><div className="v">183 days</div><div className="k">Minimum annual residence</div></div>
              <div className="stat-cell sw-reveal"><div className="v">Schengen</div><div className="k">Visa-free travel across Schengen Area</div></div>
              <div className="stat-cell sw-reveal"><div className="v">10 years</div><div className="k">Pathway to Swiss citizenship</div></div>
            </div>
          </div>
        </section>

        {/* ABOUT SWITZERLAND */}
        <section className="block about" id="about">
          <div className="container">
            <div className="section-head sw-reveal">
              <span className="eyebrow center">Discover Switzerland</span>
              <h2>Switzerland: a sovereign centre of global stability, prosperity and prestige</h2>
            </div>
            <div className="about-grid">
              <div className="about-copy sw-reveal">
                <p className="about-lead">Switzerland is a landlocked federal republic in the heart of Central Europe. Home to around 9 million people, it is one of the world's most prosperous and politically stable nations.</p>
                <p>Bern is the federal capital, while Zurich, Geneva and Basel serve as the country's principal financial, diplomatic and cultural centres. Switzerland operates under a federal system of 26 cantons, each with considerable fiscal and administrative autonomy.</p>
                <p>The Swiss franc (CHF) remains one of the world's most trusted reserve currencies, and the economy is consistently ranked among the most competitive and innovative globally.</p>
              </div>
              <div className="about-media sw-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200" alt="Bern old town" />
              </div>
            </div>
            <div className="facts-row">
              {[
                { ff: '~9M', fl: 'Population' },
                { ff: 'Bern', fl: 'Federal capital' },
                { ff: 'CHF', fl: 'Official currency' },
                { ff: '26', fl: 'Autonomous cantons' },
              ].map((f, i) => (
                <div className="fact sw-reveal" key={i}><div className="ff">{f.ff}</div><div className="fl">{f.fl}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* LIVING IN SWITZERLAND */}
        <section className="block living" id="living">
          <div className="container">
            <div className="living-grid">
              <div className="living-media sw-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1504512485720-7d83a16ee930?q=80&w=1200" alt="Geneva lakefront" />
              </div>
              <div className="sw-reveal">
                <span className="eyebrow">Life in Switzerland</span>
                <h2>An exceptional standard of living, built on discretion and precision</h2>
                <p>Switzerland consistently holds the highest rankings in global quality of life indices. The country combines world-class infrastructure with a refined pace of daily life.</p>
                <p>Healthcare and education are among the finest in Europe. Switzerland hosts headquarters of numerous global institutions and offers a business environment defined by reliability and rule of law.</p>
                <div className="living-tags">
                  {['Top-Tier Healthcare', 'Elite Education', 'Financial Privacy', 'Alpine Lifestyle', 'Global Connectivity', 'Political Neutrality', 'Low Crime', 'Innovation Hub'].map((t, i) => (
                    <span className="living-tag" key={i}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY SWITZERLAND */}
        <section className="block why">
          <div className="container">
            <div className="section-head sw-reveal">
              <span className="eyebrow center">Why Investors Choose Switzerland</span>
              <h2>The qualities that define Switzerland as a permanent destination</h2>
            </div>
            <div className="why-grid">
              {[
                { ic: '⚖', t: 'Political neutrality and stability', p: 'A centuries-long tradition of political neutrality, direct democracy, and institutional stability.' },
                { ic: '⬡', t: 'World-class financial infrastructure', p: 'Home to some of the world’s foremost private banks and wealth management institutions.' },
                { ic: '★', t: 'Schengen Area access', p: 'Visa-free short stays across fellow Schengen countries.' },
                { ic: '❋', t: 'Exceptional quality of life', p: 'Zurich and Geneva are among the world’s top-ranked cities for quality of life.' },
                { ic: '✚', t: 'Elite healthcare and education', p: 'Access to premier medical facilities and internationally accredited schools.' },
                { ic: '⌖', t: 'Pathway to Swiss citizenship', p: 'After 10 years of continuous legal residence, the pathway to Swiss citizenship opens.' },
              ].map((c, i) => (
                <div className="why-card sw-reveal" key={i}><div className="ic">{c.ic}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        <div className="tile-divider" aria-hidden="true"></div>

        {/* PROGRAMME OVERVIEW */}
        <section className="block prog" id="programme">
          <div className="container">
            <div className="section-head sw-reveal light">
              <span className="eyebrow center">Programme Overview</span>
              <h2>The Switzerland Residence Permit through lump-sum taxation</h2>
              <p>A residency structure built for the financially independent — offering Swiss address rights in exchange for a negotiated lump-sum annual tax contribution.</p>
            </div>
            <div className="prog-grid">
              {[
                { no: '01 · DEFINITION', t: 'What is the permit?', p: 'A Swiss residence permit issued to financially independent foreign nationals who agree to pay an annual lump-sum tax negotiated with their chosen canton.' },
                { no: '02 · ELIGIBILITY', t: 'For whom?', p: 'Adults over 18 who have not lived in Switzerland during the previous 10 years, have no criminal convictions, are financially self-sufficient and will not work in Switzerland.' },
                { no: '03 · TAX', t: 'Lump-sum tax', p: 'Starts from CHF 450,000 per year for non-EU/EFTA nationals and is individually negotiated based on global living expenses.' },
                { no: '04 · CANTONS', t: 'Available in 21 cantons', p: 'The lump-sum taxation residence permit is available in 21 of Switzerland’s 26 cantons.' },
                { no: '05 · DURATION', t: 'Process time', p: 'The overall process typically takes a minimum of three months.' },
              ].map((c, i) => (
                <div className="prog-card sw-reveal" key={i}><div className="no">{c.no}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="block benefits" id="benefits">
          <div className="container">
            <div className="section-head sw-reveal">
              <span className="eyebrow center">Key Benefits</span>
              <h2>What the Switzerland Residence Permit Offers</h2>
            </div>
            <div className="ben-grid">
              {[
                { mk: 'I', t: 'A prestigious European address', p: 'Reside in one of the world’s most stable, prosperous and secure countries.' },
                { mk: 'II', t: 'Schengen Area mobility', p: 'Visa-free short stays across the Schengen Area.' },
                { mk: 'III', t: 'Lump-sum tax certainty', p: 'Predictable annual tax contribution negotiated in advance.' },
                { mk: 'IV', t: 'Pathway to citizenship', p: 'After 10 years of continuous residence, eligibility for Swiss citizenship.' },
                { mk: 'V', t: 'Family inclusion', p: 'Spouse and children can generally be included in the application.' },
                { mk: 'VI', t: 'World-class lifestyle', p: 'Exceptional healthcare, education, safety and quality of life.' },
              ].map((c, i) => (
                <div className="ben-card sw-reveal" key={i}><div className="mk">{c.mk}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* FINANCE */}
        <section className="block finance" id="finance">
          <div className="container">
            <div className="section-head sw-reveal">
              <span className="eyebrow center">Financial Requirements</span>
              <h2>Lump-Sum Taxation &amp; Financial Criteria</h2>
            </div>
            <div className="fin-table sw-reveal">
              <div className="fin-row head">
                <div className="fc">Aspect</div>
                <div className="fc">Detail</div>
                <div className="fc">Notes</div>
              </div>
              {[
                { label: 'Annual Lump-Sum Tax', amount: 'CHF 450,000+', note: 'Starting point for non-EU/EFTA nationals. Individually negotiated.' },
                { label: 'Global Expenditure Test', amount: '7× Swiss rental cost', note: 'Annual global living expenses must exceed Swiss accommodation rental by at least 7 times.' },
              ].map((r, i) => (
                <div className="fin-row" key={i}>
                  <div className="fc label">{r.label}</div>
                  <div className="fc fig">{r.amount}</div>
                  <div className="fc note">{r.note}</div>
                </div>
              ))}
            </div>
            <p className="fin-note">Figures reflect publicly available information as of early 2026 and are subject to change. Langma International prepares a personalised financial assessment.</p>
          </div>
        </section>

        {/* FAMILY */}
        <section className="block family-sec" id="family">
          <div className="container">
            <div className="fam-grid">
              <div className="fam-media sw-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200" alt="Family lifestyle in Switzerland" />
              </div>
              <div className="sw-reveal">
                <span className="eyebrow">Family Inclusion</span>
                <h2>One application for the household</h2>
                <ul className="fam-list">
                  {[
                    { fi: '①', t: 'Main Applicant', p: 'Financially independent adult meeting all eligibility criteria.' },
                    { fi: '②', t: 'Spouse', p: 'Can be included in the same application.' },
                    { fi: '③', t: 'Minor Children', p: 'Unmarried children under 18 are eligible.' },
                    { fi: '④', t: 'Adult Children', p: 'Dependent students may qualify under specific conditions.' },
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

        {/* PROCESS */}
        <section className="block process" id="process">
          <div className="container">
            <div className="section-head sw-reveal light">
              <span className="eyebrow center">Application Process</span>
              <h2>How the Switzerland Residence Permit is obtained</h2>
            </div>
            <div className="timeline">
              {[
                { d: '01', t: 'Eligibility &amp; Canton Selection', p: 'Confidential assessment and selection of the most suitable canton.', time: 'Weeks 1–4' },
                { d: '02', t: 'Tax Agreement Negotiation', p: 'Preparation and negotiation of the lump-sum tax agreement with cantonal authorities.', time: '1–2 Months' },
                { d: '03', t: 'D Visa Application', p: 'Submission of the D visa application to the Swiss representation abroad.', time: '1–2 Weeks' },
                { d: '04', t: 'Residence Permit Issuance', p: 'Final review and issuance of the residence permit card in Switzerland.', time: '2–4 Months' },
              ].map((s, i) => (
                <div className="tl-item sw-reveal" key={i}>
                  <div className="dot">{s.d}</div>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                  <span className="tl-time">{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="block faq" id="faq">
          <div className="container">
            <div className="section-head sw-reveal">
              <span className="eyebrow center">Frequently Asked Questions</span>
              <h2>Switzerland Residence Permit — Common Questions</h2>
            </div>
            <div className="faq-wrap">
              {[
                { q: 'What is the Switzerland Residence Permit through lump-sum taxation?', a: 'The Switzerland Residence Permit through lump-sum taxation is a residency pathway for financially independent non-working foreigners who agree to pay a fixed annual tax negotiated with a Swiss canton...' },
                { q: 'Who is eligible for a Switzerland Residence Permit through lump-sum taxation?', a: 'Eligible applicants are individuals over 18 years of age who have not lived in Switzerland during the previous 10 years...' },
                { q: 'How much is the lump-sum tax in Switzerland?', a: 'The lump-sum tax for non-EU/EFTA citizens starts from CHF 450,000 per year...' },
                { q: 'In which Swiss cantons can the lump-sum tax permit be obtained?', a: 'The lump-sum taxation permit is available in 21 of Switzerland\'s 26 cantons...' },
                { q: 'How long does it take to obtain a Switzerland Residence Permit?', a: 'The overall process typically takes a minimum of 3 months...' },
              ].map((faq, i) => (
                <div className={`faq-item sw-reveal ${openFaq === i ? 'open' : ''}`} key={i}>
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
              <div className="lead-copy sw-reveal">
                <span className="eyebrow light">Begin Your Switzerland Journey</span>
                <h2>Talk to an Advisor About the Lump-Sum Taxation Permit</h2>
                <p>Book a confidential consultation with Langma International to assess your eligibility and receive a personalised overview of the Switzerland Residence Permit process.</p>
                <ul className="lead-assure">
                  {[
                    'Complimentary eligibility review',
                    'Canton selection and tax modelling guidance',
                    'Family inclusion planning',
                    'Introductions to licensed Swiss professionals',
                    'End-to-end advisory support',
                  ].map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
              <div className="form-card sw-reveal">
                <h3>Request Your Eligibility Review</h3>
                <p className="fsub">A member of our advisory team will respond within one business day.</p>
                <form onSubmit={handleLeadSubmit} noValidate>
                  <div className="frow">
                    <div className="field"><label htmlFor="l-fname">First name</label><input type="text" id="l-fname" required /></div>
                    <div className="field"><label htmlFor="l-lname">Last name</label><input type="text" id="l-lname" required /></div>
                  </div>
                  <div className="field"><label htmlFor="l-email">Email address</label><input type="email" id="l-email" required /></div>
                  <button type="submit" className="btn btn-primary" disabled={leadLoading}>{leadLoading ? 'Sending...' : 'Request Eligibility Review'}</button>
                  {leadMsg && <div className={`success show ${leadSuccess ? '' : 'form-msg error'}`}>{leadMsg}</div>}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SwitzerlandPRPage;