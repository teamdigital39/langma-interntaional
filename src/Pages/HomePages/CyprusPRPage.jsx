import React, { useState, useEffect } from 'react';
import { useResidencyLeadForms } from '../../hooks/useResidencyLeadForms';

const SERVICE = 'Cyprus Permanent Residence Programme';

const CyprusPRPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadSubmitted, officeSubmitted,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Cyprus PR Consultation', requireInterest: true });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });
    document.querySelectorAll('.cy-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="cy-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        .cy-page * { margin:0; padding:0; box-sizing:border-box; }
        .cy-page {
          font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
          color:#1B2B28;
          background:#F5F8F6;
          line-height:1.7;
          font-weight:400;
          -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        .cy-page h1,.cy-page h2,.cy-page h3,.cy-page h4 {
          font-family:'Cormorant Garamond',Georgia,serif;
          font-weight:600;
          color:#296166;
          line-height:1.12;
          letter-spacing:0.2px;
        }
        .cy-page img { display:block; width:100%; height:100%; object-fit:cover; }
        .cy-page .container { max-width:1200px; margin:0 auto; padding:0 30px; }
        .cy-page .block { padding:108px 0; }

        /* Eyebrow */
        .cy-page .eyebrow {
          font-family:'Inter',sans-serif; text-transform:uppercase; letter-spacing:3.5px;
          font-size:11.5px; color:#2FC7A1; font-weight:600; margin-bottom:18px;
          display:flex; align-items:center; gap:12px;
        }
        .cy-page .eyebrow::before { content:""; width:34px; height:1px; background:#2FC7A1; display:inline-block; flex-shrink:0; }
        .cy-page .eyebrow.center { justify-content:center; }
        .cy-page .eyebrow.light { color:#6FE0C6; }
        .cy-page .eyebrow.light::before { background:#6FE0C6; }
        .cy-page .eyebrow.gold { color:#6FE0C6; }
        .cy-page .eyebrow.gold::before { background:#6FE0C6; }

        /* Section head */
        .cy-page .section-head { max-width:760px; margin:0 auto 60px; text-align:center; }
        .cy-page .section-head .eyebrow { justify-content:center; }
        .cy-page .section-head h2 { font-size:clamp(34px,4.6vw,54px); margin-bottom:18px; }
        .cy-page .section-head p { color:#296166; font-size:17px; }
        .cy-page .section-head.light h2 { color:#F5F8F6; }
        .cy-page .section-head.light p { color:rgba(247,250,252,0.72); }

        /* Buttons */
        .cy-page .btn {
          display:inline-flex; align-items:center; gap:10px;
          font-family:'Inter',sans-serif; font-size:14px; font-weight:600;
          letter-spacing:0.4px; padding:16px 32px; border-radius:4px;
          cursor:pointer; border:1px solid transparent; transition:all .35s cubic-bezier(.22,.61,.36,1);
          text-decoration:none;
        }
        .cy-page .btn-primary { background:#2FC7A1; color:#296166; }
        .cy-page .btn-primary:hover { background:#6FE0C6; transform:translateY(-2px); box-shadow:0 14px 30px rgba(47,199,161,.28); }
        .cy-page .btn-ghost { background:transparent; color:#1A2540; border:2px solid #2FC7A1; }
        .cy-page .btn-ghost:hover { border-color:#2FC7A1; color:#296166; }
        .cy-page .btn-dark { background:#1A2540; color:#F5F8F6; }
        .cy-page .btn-dark:hover { background:#296166; transform:translateY(-2px); }

        /* Tile divider */
        .cy-page .tile-divider {
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
        .cy-page .hero {
          position:relative; min-height:auto; display:flex; align-items:center;
          color:#1B2B28; overflow:hidden;
          background:#FFFFFF; padding:72px 0 48px;
        }
        .cy-page .hero::before {
          content:""; position:absolute; left:0; top:80px; bottom:80px; width:3px; border-radius:999px;
          background:linear-gradient(to bottom,transparent,#2FC7A1,transparent);
          z-index:0; pointer-events:none; inset:auto;
        }
        .cy-page .hero-split {
          position:relative; z-index:2; width:100%;
          display:grid; grid-template-columns:1fr 1fr; gap:64px;
          align-items:center; padding-top:0;padding-bottom:0;
        }
        .cy-page .hero-copy { display:flex; flex-direction:column; }
        .cy-page .hero h1 { font-size:clamp(38px,5vw,68px); color:#1B2B28; margin-bottom:26px; font-weight:600; line-height:1.08; }
        .cy-page .hero h1 em { font-style:italic; color:#4FA3D1; font-weight:500; }
        .cy-page .hero .lead { font-size:17.5px; color:#4C5C58; max-width:560px; margin-bottom:38px; font-weight:300; line-height:1.72; }
        .cy-page .hero-cta { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:48px; }
        .cy-page .hero-badges { display:flex; gap:36px; flex-wrap:wrap; border-top:1px solid #D8E0EC; padding-top:28px; }
        .cy-page .hero-badge .num { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; line-height:1; }
        .cy-page .hero-badge .lbl { font-size:11.5px; letter-spacing:.6px; color:#7E8C88; margin-top:6px; }

        .cy-page .hero-visual { display:flex; align-items:center; justify-content:center; position:relative; }
        .cy-page .hero-img-frame {
          position:relative; width:100%; max-width:520px;
          border-radius:12px; overflow:hidden;
          box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22);
        }
        .cy-page .hero-img-frame img { display:block; width:100%; height:480px; object-fit:cover; border-radius:12px; transition:transform .9s cubic-bezier(.22,.61,.36,1); }
        .cy-page .hero-img-frame:hover img { transform:scale(1.04); }
        .cy-page .hero-img-frame::after { content:""; position:absolute; inset:12px; border:1px solid rgba(47,199,161,.38); border-radius:8px; pointer-events:none; z-index:2; }
        .cy-page .hero-img-frame::before { content:""; position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.42) 0%,transparent 55%); z-index:1; border-radius:12px; pointer-events:none; }
        .cy-page .hero-visual::before { content:""; position:absolute; top:24px; right:-14px; width:100%; max-width:520px; height:100%; border:1px solid rgba(47,199,161,.18); border-radius:12px; pointer-events:none; }
        .cy-page .hero-img-badge {
          position:absolute; bottom:22px; left:22px; z-index:3;
          background:rgba(26,37,64,.82); backdrop-filter:blur(8px);
          border:1px solid rgba(47,199,161,.30); border-radius:6px;
          padding:10px 16px; display:flex; align-items:center; gap:10px;
        }
        .cy-page .hero-img-badge .flag { font-size:20px; }
        .cy-page .hero-img-badge .cap-txt { font-size:12px; color:rgba(247,250,252,.88); line-height:1.4; }
        .cy-page .hero-img-badge .cap-txt strong { color:#6FE0C6; display:block; font-size:13.5px; }
        .cy-page .scroll-hint {
          position:absolute; bottom:32px; left:50%; transform:translateX(-50%);
          display:flex; flex-direction:column; align-items:center; gap:10px;
          color:#7E8C88; font-size:10.5px; letter-spacing:2.5px; text-transform:uppercase; z-index:3;
        }
        .cy-page .scroll-hint .line { width:1px; height:38px; background:linear-gradient(#2FC7A1,transparent); animation:cy-drop 2s cubic-bezier(.22,.61,.36,1) infinite; }
        @keyframes cy-drop { 0% { transform:scaleY(0); transform-origin:top; } 50% { transform:scaleY(1); transform-origin:top; } 51% { transform-origin:bottom; } 100% { transform:scaleY(0); transform-origin:bottom; } }

        /* Stats Bar */
        .cy-page .stats-bar { background:#1A2540; color:#F5F8F6; }
        .cy-page .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .cy-page .stat-cell { padding:52px 30px; text-align:center; border-right:1px solid rgba(247,250,252,.10); }
        .cy-page .stat-cell:last-child { border-right:none; }
        .cy-page .stat-cell .v { font-family:'Cormorant Garamond',serif; font-size:46px; font-weight:600; color:#6FE0C6; line-height:1; margin-bottom:12px; }
        .cy-page .stat-cell .k { font-size:13px; letter-spacing:.5px; color:rgba(247,250,252,.78); }

        /* About */
        .cy-page .about { background:#F5F8F6; }
        .cy-page .about-grid { display:grid; grid-template-columns:1.05fr 1fr; gap:64px; align-items:center; }
        .cy-page .about-copy h2 { font-size:clamp(32px,4.4vw,52px); margin-bottom:22px; }
        .cy-page .about-copy .about-lead { font-family:'Cormorant Garamond',serif; font-size:23px; line-height:1.4; color:#296166; margin-bottom:18px; font-weight:500; }
        .cy-page .about-copy p { color:#296166; margin-bottom:18px; font-size:16.5px; }
        .cy-page .about-media { position:relative; height:560px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .cy-page .about-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .cy-page .facts-row { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-top:54px; }
        .cy-page .fact { background:#fff; border:1px solid rgba(47,199,161,.25); border-radius:4px; padding:26px 22px; text-align:center; }
        .cy-page .fact .ff { font-family:'Cormorant Garamond',serif; font-size:30px; color:#296166; font-weight:600; }
        .cy-page .fact .fl { font-size:12.5px; color:#296166; letter-spacing:.4px; margin-top:6px; }

        /* Why */
        .cy-page .why { background:#E9F1EE; }
        .cy-page .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#296166; border:1px solid #296166; border-radius:4px; overflow:hidden; }
        .cy-page .why-card { background:#F5F8F6; padding:42px 34px; transition:background .3s; }
        .cy-page .why-card:hover { background:#fff; }
        .cy-page .why-card .ic { width:46px; height:46px; border:1px solid #2FC7A1; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#2FC7A1; font-family:'Cormorant Garamond',serif; font-size:21px; margin-bottom:20px; }
        .cy-page .why-card h3 { font-size:24px; margin-bottom:10px; }
        .cy-page .why-card p { color:#296166; font-size:15px; }

        /* CTA banner */
        .cy-page .cta-banner {
          margin-top:56px; background:#1A2540; border-radius:4px; padding:52px 56px;
          display:grid; grid-template-columns:1fr auto; gap:40px; align-items:center;
          box-shadow:0 30px 70px rgba(26,37,64,.22); position:relative; overflow:hidden;
        }
        .cy-page .cta-banner::before { content:""; position:absolute; top:-160px; right:-120px; width:420px; height:420px; background:radial-gradient(circle,rgba(47,199,161,0.18),transparent 70%); border-radius:50%; }
        .cy-page .cta-banner > div { position:relative; z-index:1; }
        .cy-page .cta-banner h3 { color:#F5F8F6; font-size:clamp(24px,3vw,34px); line-height:1.2; margin-bottom:14px; }
        .cy-page .cta-banner p { color:rgba(247,250,252,.78); font-size:16px; max-width:640px; }
        .cy-page .cta-banner .btn { position:relative; z-index:1; }

        /* Pillars / numbered why (media + list) */
        .cy-page .reasons { background:#F5F8F6; }
        .cy-page .reasons-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .cy-page .reasons-media { position:relative; height:560px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .cy-page .reasons-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .cy-page .reasons-list { list-style:none; }
        .cy-page .reasons-list li { display:flex; gap:18px; padding:22px 0; border-bottom:1px solid #E5E5E5; }
        .cy-page .reasons-list li:last-child { border-bottom:none; }
        .cy-page .reasons-list .ri { flex:0 0 44px; height:44px; border-radius:50%; background:#1A2540; color:#6FE0C6; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:20px; }
        .cy-page .reasons-list h4 { font-size:22px; margin-bottom:4px; }
        .cy-page .reasons-list p { color:#296166; font-size:14.5px; }

        /* Programme */
        .cy-page .prog { background:#1A2540; color:#F5F8F6; }
        .cy-page .prog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .cy-page .prog-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:4px; padding:38px 32px; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .cy-page .prog-card:hover { border-color:#2FC7A1; transform:translateY(-6px); }
        .cy-page .prog-card .no { font-family:'Cormorant Garamond',serif; font-size:18px; color:#6FE0C6; border-bottom:1px solid rgba(247,250,252,.16); padding-bottom:14px; margin-bottom:18px; letter-spacing:1.5px; text-transform:uppercase; }
        .cy-page .prog-card h3 { color:#F5F8F6; font-size:25px; margin-bottom:12px; }
        .cy-page .prog-card p { color:rgba(247,250,252,.74); font-size:15px; }

        /* Benefits */
        .cy-page .benefits { background:#F5F8F6; }
        .cy-page .ben-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .cy-page .ben-card { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:36px 30px; position:relative; overflow:hidden; transition:all .35s cubic-bezier(.22,.61,.36,1); }
        .cy-page .ben-card::before { content:""; position:absolute; top:0; left:0; width:3px; height:0; background:#2FC7A1; transition:height .4s cubic-bezier(.22,.61,.36,1); }
        .cy-page .ben-card:hover { box-shadow:0 18px 50px rgba(26,37,64,.08); transform:translateY(-4px); }
        .cy-page .ben-card:hover::before { height:100%; }
        .cy-page .ben-card .mk { font-family:'Cormorant Garamond',serif; font-size:15px; color:#2FC7A1; letter-spacing:2px; margin-bottom:16px; }
        .cy-page .ben-card h3 { font-size:23px; margin-bottom:10px; }
        .cy-page .ben-card p { color:#296166; font-size:15px; }

        /* Investment table */
        .cy-page .investment { background:#E9F1EE; }
        .cy-page .inv-wrap { background:#fff; border:1px solid rgba(47,199,161,.25); border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(26,37,64,.08); margin-top:52px; }
        .cy-page .inv-row { display:grid; grid-template-columns:1.3fr 0.8fr 1.7fr; align-items:center; border-bottom:1px solid #E5E5E5; }
        .cy-page .inv-row:last-child { border-bottom:none; }
        .cy-page .inv-row.head { background:#1A2540; }
        .cy-page .inv-row.head > div { padding:20px 28px; font-family:'Inter',sans-serif; font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:rgba(247,250,252,.6); }
        .cy-page .inv-row .label { padding:24px 28px; font-family:'Inter',sans-serif; font-weight:600; color:#296166; font-size:15.5px; }
        .cy-page .inv-row .label small { display:block; font-weight:400; color:#296166; font-size:13px; margin-top:5px; }
        .cy-page .inv-row .value { padding:24px 28px; font-size:14.5px; color:#296166; line-height:1.6; }
        .cy-page .inv-row .value .tag { font-family:'Cormorant Garamond',serif; color:#2FC7A1; font-weight:600; font-size:23px; }
        .cy-page .inv-note { margin-top:24px; font-size:13px; color:#296166; text-align:center; font-style:italic; }

        /* Family */
        .cy-page .family-sec { background:#F5F8F6; }
        .cy-page .fam-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .cy-page .fam-media { height:540px; border-radius:4px; overflow:hidden; box-shadow:0 30px 70px rgba(26,37,64,.18); position:relative; }
        .cy-page .fam-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .cy-page .fam-list { list-style:none; }
        .cy-page .fam-list li { display:flex; gap:18px; padding:22px 0; border-bottom:1px solid #E5E5E5; }
        .cy-page .fam-list li:last-child { border-bottom:none; }
        .cy-page .fam-list .fi { flex:0 0 44px; height:44px; border-radius:50%; background:#1A2540; color:#6FE0C6; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:19px; }
        .cy-page .fam-list h4 { font-size:22px; margin-bottom:2px; }
        .cy-page .fam-list p { color:#296166; font-size:14.5px; }

        /* Process */
        .cy-page .process { background:#1A2540; color:#F5F8F6; }
        .cy-page .timeline { position:relative; max-width:880px; margin:0 auto; }
        .cy-page .timeline::before { content:""; position:absolute; left:31px; top:8px; bottom:8px; width:1px; background:rgba(247,250,252,.18); }
        .cy-page .tl-item { position:relative; padding-left:92px; padding-bottom:44px; }
        .cy-page .tl-item:last-child { padding-bottom:0; }
        .cy-page .tl-item .dot { position:absolute; left:0; top:0; width:64px; height:64px; border-radius:50%; border:1px solid #2FC7A1; background:#1A2540; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:24px; color:#6FE0C6; }
        .cy-page .tl-item h3 { color:#F5F8F6; font-size:25px; margin-bottom:6px; }
        .cy-page .tl-item p { color:rgba(247,250,252,.72); font-size:15px; max-width:620px; }
        .cy-page .tl-time { display:inline-block; margin-top:8px; font-size:11.5px; font-weight:600; color:#6FE0C6; background:rgba(47,199,161,.10); border:1px solid rgba(47,199,161,.22); border-radius:30px; padding:4px 14px; letter-spacing:.05em; }

        /* Lifestyle */
        .cy-page .life { background:#F5F8F6; }
        .cy-page .life-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .cy-page .life-card { position:relative; height:340px; border-radius:4px; overflow:hidden; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .cy-page .life-card img { transition:transform .8s cubic-bezier(.22,.61,.36,1); }
        .cy-page .life-card:hover img { transform:scale(1.06); }
        .cy-page .life-card .ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(26,37,64,.88) 0%,rgba(26,37,64,.18) 55%,transparent 100%); z-index:1; }
        .cy-page .life-card .cap { position:absolute; left:0; right:0; bottom:0; z-index:2; padding:26px 24px; }
        .cy-page .life-card .cap h3 { color:#F5F8F6; font-size:24px; }
        .cy-page .life-strip { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; margin-top:48px; }
        .cy-page .life-tag { border:1px solid #296166; border-radius:40px; padding:10px 22px; font-size:13.5px; color:#296166; background:#fff; }

        /* Why Langma */
        .cy-page .langma { background:#1A2540; color:#F5F8F6; position:relative; overflow:hidden; }
        .cy-page .langma-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:center; }
        .cy-page .langma h2 { color:#F5F8F6; font-size:clamp(32px,4.4vw,52px); margin-bottom:20px; }
        .cy-page .langma .lead { color:rgba(247,250,252,.82); font-size:17px; margin-bottom:14px; }
        .cy-page .lg-list { display:grid; grid-template-columns:1fr; gap:26px; }
        .cy-page .lg-item { border-top:1px solid rgba(247,250,252,.16); padding-top:24px; }
        .cy-page .lg-item .lgnum { font-family:'Cormorant Garamond',serif; font-size:18px; color:#6FE0C6; letter-spacing:2px; margin-bottom:8px; }
        .cy-page .lg-item h4 { color:#6FE0C6; font-size:22px; margin-bottom:6px; }
        .cy-page .lg-item p { color:rgba(247,250,252,.72); font-size:14.5px; }

        /* FAQ */
        .cy-page .faq { background:#F5F8F6; }
        .cy-page .faq-wrap { max-width:880px; margin:0 auto; }
        .cy-page .faq-item { border-bottom:1px solid #E5E5E5; }
        .cy-page .faq-q { width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:28px 0; display:flex; justify-content:space-between; align-items:center; gap:24px; font-family:'Cormorant Garamond',serif; font-size:23px; color:#296166; font-weight:600; }
        .cy-page .faq-q .pm { flex:0 0 30px; height:30px; border:1px solid #2FC7A1; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#2FC7A1; font-family:'Inter',sans-serif; font-size:18px; transition:all .3s; }
        .cy-page .faq-item.open .pm { background:#2FC7A1; color:#296166; transform:rotate(45deg); }
        .cy-page .faq-a { max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(.22,.61,.36,1); }
        .cy-page .faq-a p { padding:0 0 28px; color:#296166; font-size:16px; max-width:780px; }

        /* Lead form */
        .cy-page .lead-sec { background:#1A2540; color:#F5F8F6; }
        .cy-page .lead-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:64px; align-items:start; }
        .cy-page .lead-copy h2 { color:#F5F8F6; font-size:clamp(32px,4.2vw,50px); margin-bottom:20px; }
        .cy-page .lead-copy p { color:rgba(247,250,252,.80); margin-bottom:26px; font-size:16.5px; }
        .cy-page .lead-assure { list-style:none; }
        .cy-page .lead-assure li { display:flex; gap:12px; align-items:center; padding:11px 0; color:rgba(247,250,252,.86); font-size:15px; }
        .cy-page .lead-assure li::before { content:"✓"; color:#6FE0C6; font-weight:700; }
        .cy-page .form-card { background:#F5F8F6; border-radius:4px; padding:42px; box-shadow:0 30px 70px rgba(26,37,64,.18); }
        .cy-page .form-card h3 { font-size:27px; margin-bottom:6px; }
        .cy-page .form-card .fsub { color:#296166; font-size:14.5px; margin-bottom:26px; }
        .cy-page .frow { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .cy-page .field { margin-bottom:16px; }
        .cy-page .field label { display:block; font-size:12px; letter-spacing:.5px; text-transform:uppercase; color:#296166; font-weight:600; margin-bottom:7px; }
        .cy-page .field input,.cy-page .field select,.cy-page .field textarea { width:100%; padding:13px 15px; border:1px solid #E5E5E5; border-radius:4px; font-family:'Inter',sans-serif; font-size:15px; background:#fff; color:#1B2B28; transition:border-color .25s; }
        .cy-page .field input:focus,.cy-page .field select:focus,.cy-page .field textarea:focus { outline:none; border-color:#2FC7A1; box-shadow:0 0 0 3px rgba(47,199,161,.15); }
        .cy-page .field textarea { resize:vertical; min-height:90px; }
        .cy-page .form-card .btn { width:100%; justify-content:center; margin-top:6px; }
        .cy-page .form-card .disc { font-size:12px; color:#296166; margin-top:14px; text-align:center; }
        .cy-page .success { display:none; background:rgba(47,199,161,.12); border:1px solid #2FC7A1; border-radius:4px; padding:16px; color:#296166; font-size:14.5px; text-align:center; margin-top:16px; }
        .cy-page .success.show { display:block; }

        /* Office */
        .cy-page .office { background:#E9F1EE; }
        .cy-page .office-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:60px; align-items:center; }
        .cy-page .office-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:18px; }
        .cy-page .office-copy p { color:#296166; font-size:16.5px; margin-bottom:26px; }
        .cy-page .office-points { list-style:none; margin-bottom:8px; }
        .cy-page .office-points li { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid #E5E5E5; }
        .cy-page .office-points li:last-child { border-bottom:none; }
        .cy-page .office-points .oi { flex:0 0 38px; height:38px; border-radius:50%; border:1px solid #2FC7A1; color:#2FC7A1; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; }
        .cy-page .office-points h4 { font-size:19px; margin-bottom:1px; }
        .cy-page .office-points p { font-size:14px; margin:0; color:#296166; }
        .cy-page .office-form { background:#fff; border:1px solid #E5E5E5; border-radius:4px; padding:40px; box-shadow:0 18px 50px rgba(26,37,64,.08); }
        .cy-page .office-form h3 { font-size:25px; margin-bottom:22px; }

        /* Footer */
        .cy-page .foot { background:#1A2540; color:rgba(247,250,252,.7); padding:74px 0 32px; }
        .cy-page .foot-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1.3fr; gap:44px; margin-bottom:50px; }
        .cy-page .foot-logo { font-family:'Cormorant Garamond',serif; font-size:28px; color:#F5F8F6; font-weight:600; letter-spacing:1px; margin-bottom:18px; }
        .cy-page .foot-logo span { color:#6FE0C6; }
        .cy-page .foot-grid > div > p { font-size:14px; max-width:320px; line-height:1.7; }
        .cy-page .foot-col h5 { color:#F5F8F6; font-size:13px; text-transform:uppercase; letter-spacing:2px; margin-bottom:20px; font-weight:600; font-family:'Inter',sans-serif; }
        .cy-page .foot-col ul { list-style:none; display:flex; flex-direction:column; gap:10px; }
        .cy-page .foot-col a { display:block; font-size:14px; color:rgba(247,250,252,.7); text-decoration:none; transition:color .25s; }
        .cy-page .foot-col a:hover { color:#6FE0C6; }
        .cy-page .foot-bottom { border-top:1px solid rgba(247,250,252,.12); padding-top:26px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:14px; font-size:12.5px; }

        /* Reveal animation */
        .cy-page .cy-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1); }
        .cy-page .cy-reveal.in { opacity:1; transform:none; }

        /* Responsive */
        @media(max-width:980px) {
          .cy-page .about-grid,.cy-page .fam-grid,.cy-page .reasons-grid,.cy-page .langma-grid,.cy-page .lead-grid,.cy-page .office-grid { grid-template-columns:1fr; gap:40px; }
          .cy-page .stats-grid,.cy-page .why-grid,.cy-page .prog-grid,.cy-page .ben-grid,.cy-page .life-grid { grid-template-columns:1fr 1fr; }
          .cy-page .facts-row { grid-template-columns:1fr 1fr; }
          .cy-page .cta-banner { grid-template-columns:1fr; gap:28px; padding:42px 36px; }
          .cy-page .about-media,.cy-page .fam-media,.cy-page .reasons-media { height:420px; }
          .cy-page .inv-row { grid-template-columns:1.3fr 1fr; }
          .cy-page .inv-row .value:nth-child(3) { display:none; }
          .cy-page .inv-row.head > div:nth-child(3) { display:none; }
          .cy-page .hero-split { grid-template-columns:1fr; gap:48px; padding-top:0;padding-bottom:32px; }
          .cy-page .hero-img-frame img { height:380px; }
          .cy-page .hero-visual::before { display:none; }
          .cy-page .hero-img-frame { max-width:100%; }
          .cy-page .foot-grid { grid-template-columns:1fr 1fr; }
        }
        @media(max-width:640px) {
          .cy-page .block { padding:74px 0; }
          .cy-page .container { padding:0 22px; }
          .cy-page .stats-grid,.cy-page .why-grid,.cy-page .prog-grid,.cy-page .ben-grid,.cy-page .life-grid,.cy-page .facts-row { grid-template-columns:1fr; }
          .cy-page .stat-cell { border-right:none; border-bottom:1px solid rgba(247,250,252,.10); }
          .cy-page .frow { grid-template-columns:1fr; }
          .cy-page .hero-badges { gap:22px; }
          .cy-page .form-card,.cy-page .office-form { padding:30px; }
          .cy-page .hero-img-frame img { height:280px; }
          .cy-page .inv-row { grid-template-columns:1fr; gap:6px; }
          .cy-page .inv-row.head { display:none; }
          .cy-page .inv-row .label { padding-bottom:6px; }
          .cy-page .inv-row .value { padding-top:0; padding-bottom:6px; }
          .cy-page .inv-row .value:nth-child(3) { display:block; }
          .cy-page .foot-grid { grid-template-columns:1fr; }
        }
        @media(prefers-reduced-motion:reduce) {
          .cy-page * { animation:none!important; transition:none!important; }
          .cy-page .cy-reveal { opacity:1; transform:none; }
        }
      /* PR hero responsive fix */
  /* PR hero — account for site TopBar + Navbar only (no double top padding) */
  @media(max-width:980px){
    .cy-page .hero{padding:64px 0 40px;}
    .cy-page .hero-split{grid-template-columns:1fr !important;gap:36px !important;padding-top:0 !important;}
    .cy-page .hero-visual{order:-1;max-width:560px;margin:0 auto;width:100%;}
    .cy-page .hero-visual::before{display:none;}
    .cy-page .hero-img-frame,.cy-page .hero-img-card{max-width:100%;}
    .cy-page .hero-badges{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;}
  }
  @media(max-width:640px){
    .cy-page .hero{padding:56px 0 32px;}
    .cy-page .hero-split{gap:28px !important;padding-bottom:16px !important;}
    .cy-page .hero h1{font-size:clamp(30px,8vw,42px);}
    .cy-page .hero-badges{grid-template-columns:1fr;}
    .cy-page .hero-cta,.cy-page .hero-ctas{flex-direction:column;}
    .cy-page .hero-cta .btn,.cy-page .hero-ctas .btn{width:100%;justify-content:center;}
    .cy-page .container{padding:0 20px;}
  }
`}</style>

      <main>
        {/* ===== HERO ===== */}
        <section className="hero">
          <div className="container">
            <div className="hero-split">
              <div className="hero-copy">
                <span className="eyebrow light">Cyprus Permanent Residence by Investment · Regulation 6(2)</span>
                <h1>Secure Cyprus Residence<br />Through <em>Strategic Investment</em></h1>
                <p className="lead">Langma International assists investors and globally mobile families in navigating the Cyprus Permanent Residence by Investment programme — providing structured guidance on qualifying investment routes, income eligibility and compliance-focused residency planning.</p>
                <div className="hero-cta">
                  <a href="#lead" className="btn btn-primary">Request a Private Consultation</a>
                  <a href="#programme" className="btn btn-ghost">View Investment Routes</a>
                </div>
                <div className="hero-badges">
                  {[
                    { num: '€300K', lbl: 'Min. Qualifying Investment' },
                    { num: '9+ mo', lbl: 'Typical Process Duration' },
                    { num: 'No Expiry', lbl: 'On the Immigration Permit' },
                    { num: 'EU', lbl: 'Full Member State' },
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
                  <img src="https://images.unsplash.com/photo-1602089633947-8543e83b7b7c?q=80&w=1000&auto=format&fit=crop" alt="Cyprus Mediterranean coastline and seafront" />
                  <div className="hero-img-badge">
                    <span className="flag">🇨🇾</span>
                    <div className="cap-txt">
                      <strong>Republic of Cyprus</strong>
                      EU Member · Eastern Mediterranean · Eurozone
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
              <div className="stat-cell cy-reveal"><div className="v">EU</div><div className="k">Residence in a full EU member state</div></div>
              <div className="stat-cell cy-reveal"><div className="v">€300K</div><div className="k">Minimum qualifying investment</div></div>
              <div className="stat-cell cy-reveal"><div className="v">9+ Mo</div><div className="k">Typical overall process duration</div></div>
              <div className="stat-cell cy-reveal"><div className="v">No Expiry</div><div className="k">On the immigration permit</div></div>
            </div>
          </div>
        </section>

        {/* ===== ABOUT CYPRUS ===== */}
        <section className="block about" id="about-cyprus">
          <div className="container">
            <div className="section-head cy-reveal">
              <span className="eyebrow center">Destination Overview</span>
              <h2>Cyprus: A Mediterranean Gateway for Global Investors</h2>
              <p>Positioned where Europe, the Middle East and Asia converge, Cyprus offers a rare combination of EU membership, strategic geography and an internationally open culture — making it one of the most compelling jurisdictions for investors and global families considering long-term residency planning.</p>
            </div>
            <div className="about-grid">
              <div className="about-copy cy-reveal">
                <p className="about-lead">Cyprus is an island nation in the Eastern Mediterranean, recognised as a full member of the European Union since 2004. It occupies a uniquely strategic position — sitting at the crossroads of three continents, with direct air connections to major business and lifestyle destinations across Europe, the Middle East and beyond.</p>
                <p>With a population of approximately 1.3 million, Cyprus operates a modern, service-oriented economy with well-established professional infrastructure spanning financial services, legal and accounting, international business, technology, tourism and real estate. The Greek Cypriot community forms the majority, with English widely used across business, legal practice, education and daily life — making the island accessible to internationally mobile professionals and families.</p>
                <p>The Euro has been Cyprus's official currency since 2008, providing monetary stability and seamless financial integration with the wider European economy. Cyprus's legal system is founded on English common law principles, giving international investors confidence in contractual and property rights.</p>
              </div>
              <div className="about-media cy-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1569288035807-e36a32f21d9d?q=80&w=1200&auto=format&fit=crop" alt="Limassol marina and seafront, Cyprus" />
              </div>
            </div>
            <div className="facts-row">
              {[
                { ff: '~1.3M', fl: 'Population' },
                { ff: 'Euro (€)', fl: 'Official currency' },
                { ff: 'EU since 2004', fl: 'Full member state' },
                { ff: '340+', fl: 'Days of sunshine per year' },
              ].map((f, i) => (
                <div className="fact cy-reveal" key={i}><div className="ff">{f.ff}</div><div className="fl">{f.fl}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY CYPRUS — PILLARS ===== */}
        <section className="block why" id="why-cyprus">
          <div className="container">
            <div className="section-head cy-reveal">
              <span className="eyebrow center">Why Global Families Choose Cyprus</span>
              <h2>An Island Built for Business, Family and the Long Term</h2>
              <p>Cyprus combines the institutional weight of EU membership with a Mediterranean lifestyle, a competitive tax environment and a welcoming, English-speaking culture.</p>
            </div>
            <div className="why-grid">
              {[
                { ic: '◆', t: 'Business & Professional Services', p: 'A mature international business environment built around financial services, legal and accounting advisory, corporate headquarters, shipping and a growing technology sector. Its competitive, EU-aligned regulatory framework attracts multinationals and independent professionals seeking a credible European base.' },
                { ic: '☀', t: 'Mediterranean Lifestyle & Safety', p: "Cyprus consistently ranks among Europe's safest countries, with low crime rates and a family-oriented culture. A warm, dry-summer climate supports an outdoor lifestyle across coastlines, marinas and mountains, alongside international schools and established private healthcare." },
                { ic: '⊕', t: 'Infrastructure & Connectivity', p: 'Larnaca and Paphos international airports serve direct routes to major European, Middle Eastern and Asian hubs. High-speed broadband is widely available, and Limassol — the principal commercial city — hosts a modern port and marina and is a hub for shipping and wealth management.' },
                { ic: '⌖', t: 'Real Estate & Investment Activity', p: 'The property market has attracted sustained international interest across Limassol, Nicosia, Larnaca and Paphos. A transparent land registration system and common-law property rights framework provide a stable foundation for real estate investment across residential, office and hospitality segments.' },
                { ic: '✦', t: 'Tax Environment', p: "A corporate income tax rate of 12.5%, among the lowest in the EU. A non-domicile framework offers potential advantages on foreign-sourced income for qualifying individuals, while the absence of inheritance and estate duties is a consideration for families focused on long-term wealth planning." },
                { ic: '⌂', t: 'A Welcoming International Community', p: 'Cyprus has a long history of welcoming internationally mobile residents. English-language services, international schools and a professional sector accustomed to cross-border mandates create a practical, familiar environment for families relocating from the Middle East, Asia, Europe and beyond.' },
              ].map((c, i) => (
                <div className="why-card cy-reveal" key={i}><div className="ic">{c.ic}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
            <div className="cta-banner cy-reveal">
              <div>
                <h3>Ready to Make Cyprus Your Long-Term Residence Base?</h3>
                <p>For investors and globally mobile families drawn to Cyprus's combination of EU membership, Mediterranean lifestyle and business-friendly environment, the Permanent Residence by Investment programme offers a structured, government-administered route to securing indefinite residence rights on the island.</p>
              </div>
              <a href="#programme" className="btn btn-primary">Explore the Programme</a>
            </div>
          </div>
        </section>

        {/* ===== WHY CYPRUS — NUMBERED REASONS ===== */}
        <section className="block reasons">
          <div className="container">
            <div className="reasons-grid">
              <div className="cy-reveal">
                <span className="eyebrow">Why Cyprus</span>
                <h2 style={{ fontSize: 'clamp(30px,4.4vw,48px)', marginBottom: 28, lineHeight: 1.15 }}>An EU Jurisdiction That Rewards Long-Term Thinking</h2>
                <ul className="reasons-list">
                  {[
                    { n: '1', t: 'Full European Union Membership', p: 'Cyprus has been an EU member state since 2004, providing residents with the institutional framework, legal protections and regulatory consistency expected of an established EU jurisdiction.' },
                    { n: '2', t: 'A Tax Environment Designed for Global Wealth', p: 'Cyprus applies a corporate tax rate of 12.5%, among the lowest in the EU. Its non-domicile framework may allow qualifying individuals to structure foreign dividend and investment income more efficiently — worth exploring with a qualified tax adviser.' },
                    { n: '3', t: 'No Inheritance or Estate Tax', p: 'Cyprus imposes no inheritance or estate duty, a factor many internationally mobile families weigh when planning the long-term stewardship and transfer of wealth across generations.' },
                    { n: '4', t: 'A Well-Connected, English-Speaking Island', p: 'English is widely used across business, legal and daily life. A Mediterranean climate, internationally accredited schools and established private healthcare make Cyprus a practical base for globally mobile families.' },
                  ].map((c, i) => (
                    <li key={i}><span className="ri">{c.n}</span><div><h4>{c.t}</h4><p>{c.p}</p></div></li>
                  ))}
                </ul>
              </div>
              <div className="reasons-media cy-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1597466765654-24af2960cf5d?q=80&w=1200&auto=format&fit=crop" alt="Coastal Cyprus landscape with turquoise Mediterranean waters" />
              </div>
            </div>
          </div>
        </section>

        <div className="tile-divider" aria-hidden="true"></div>

        {/* ===== PROGRAMME ===== */}
        <section className="block prog" id="programme">
          <div className="container">
            <div className="section-head cy-reveal light">
              <span className="eyebrow center gold">Programme Overview</span>
              <h2>Cyprus Permanent Residence by Investment — Regulation 6(2)</h2>
              <p>A government-administered route to an indefinite immigration permit for non-EU nationals and their qualifying dependants, overseen by the Civil Registry and Migration Department (CRMD) of the Republic of Cyprus.</p>
            </div>
            <div className="prog-grid">
              {[
                { no: '01 · STATUS OBTAINED', t: 'Indefinite Immigration Permit', p: 'Successful applicants are issued an immigration permit with no fixed expiry date. The physical residence card is renewed on a periodic administrative cycle, but the underlying entitlement to reside in Cyprus is not subject to renewal.' },
                { no: '02 · CORE REQUIREMENT', t: '€300,000 Qualifying Investment', p: 'A minimum investment of €300,000 (plus VAT where applicable), directed into one of several approved categories: a first-sale residential property from a licensed developer, commercial real estate, share capital in an operating Cyprus company, or units in a regulated Cyprus investment fund.' },
                { no: '03 · INCOME REQUIREMENT', t: 'Verifiable Income From Abroad', p: 'The main applicant must demonstrate a secured annual income of at least €50,000 originating from outside Cyprus. Each dependant included increases the threshold — by €15,000 for a spouse and €10,000 for each dependent child.' },
                { no: '04 · PROCESSING ROUTE', t: 'Fast-Track Examination', p: 'Category 6.2 applications are reviewed under an accelerated procedure. The complete process — including investment completion, document preparation, application review and residence card issuance — may generally take around 9 months or more, depending on circumstances and government procedures.' },
                { no: '05 · RESIDENCY OBLIGATION', t: 'Visit Once Every Two Years', p: 'There is no requirement to reside in Cyprus continuously. Permit holders are expected to enter Cyprus at least once every two years and to avoid establishing permanent residence in a third country during the permit\u2019s currency.' },
                { no: '06 · ONGOING COMPLIANCE', t: 'Maintaining Good Standing', p: 'To retain the permit in good standing, holders are expected to keep the qualifying investment in place, continue meeting the income criteria, hold valid private health insurance, and provide periodic criminal record confirmations for adult family members.' },
              ].map((c, i) => (
                <div className="prog-card cy-reveal" key={i}><div className="no">{c.no}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BENEFITS ===== */}
        <section className="block benefits" id="benefits">
          <div className="container">
            <div className="section-head cy-reveal">
              <span className="eyebrow center">Key Benefits</span>
              <h2>What Cyprus Permanent Residence by Investment Offers</h2>
              <p>One structured application, anchored to a single qualifying investment, that can secure long-term legal residence in an EU member state for the entire family.</p>
            </div>
            <div className="ben-grid">
              {[
                { mk: 'I', t: 'A Permit Without an Expiry Date', p: 'Once issued, the immigration permit has no fixed end date. Holders maintain their right to reside in Cyprus indefinitely, provided ongoing conditions are met — a stable, long-term legal foundation in the European Union.' },
                { mk: 'II', t: 'Potential Non-Domicile Tax Advantages', p: 'Individuals who qualify as non-domiciled residents of Cyprus may access certain tax advantages on foreign-sourced income under Cypriot law. Availability and extent depend on individual circumstances and should be assessed by a qualified tax adviser.' },
                { mk: 'III', t: 'No Inheritance Tax in Cyprus', p: 'Cyprus does not levy inheritance or estate duties, making it a jurisdiction many internationally mobile families consider when thinking about inter-generational wealth planning and asset stewardship.' },
                { mk: 'IV', t: 'One Application, One Family', p: 'A spouse, minor children and eligible unmarried student-age children can be added to the same filing and receive the same indefinite residence status as the principal applicant — without separate investment requirements for dependants.' },
                { mk: 'V', t: 'A Possible Pathway Toward Naturalisation', p: 'Permanent residents may, over time, become eligible to apply for Cypriot citizenship by naturalisation, provided the residence, integration and other conditions set by Cypriot law are satisfied. These requirements are subject to change; seek current legal advice.' },
                { mk: 'VI', t: 'A Tangible European Asset', p: 'The most common qualifying route — new-build residential property — means applicants acquire both an immigration permit and a physical asset within the EU, combining mobility planning with real estate investment.' },
                { mk: 'VII', t: 'Access to Education and Healthcare', p: 'Children of permanent residents may access the Cyprus education system, alongside a range of international schools on the island. Well-established private healthcare providers are accessible across the main urban centres.' },
                { mk: 'VIII', t: 'Cyprus and the Path to Schengen', p: 'Cyprus is an EU member state currently outside the Schengen Area, and is progressing toward accession. Should accession be finalised, Cyprus permanent residents would be positioned to benefit from broader travel freedoms.' },
              ].map((c, i) => (
                <div className="ben-card cy-reveal" key={i}><div className="mk">{c.mk}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== INVESTMENT REQUIREMENTS ===== */}
        <section className="block investment" id="investment">
          <div className="container">
            <div className="section-head cy-reveal">
              <span className="eyebrow center">Investment Requirements</span>
              <h2>How the €300,000 Investment Can Be Structured</h2>
              <p>Category 6.2 recognises several qualifying investment routes, each built around the same €300,000 minimum threshold. The table below sets out the core parameters as currently understood.</p>
            </div>
            <div className="inv-wrap cy-reveal">
              <div className="inv-row head">
                <div>Requirement</div>
                <div>Detail</div>
                <div>Notes</div>
              </div>
              {[
                { label: 'Minimum Investment', sub: 'Applies across the recognised qualifying routes', tag: '€300,000', note: 'Plus VAT where applicable. For the new-build residential route, the qualifying funds must be remitted from abroad.' },
                { label: 'New-Build Residential Property', sub: 'A first-sale unit purchased directly from a licensed developer', tag: '€300,000 + VAT', note: 'Resale properties are not eligible under this route. A reduced 5% VAT rate may apply on the first €350,000 (and up to 130 sqm) of a primary residence, subject to caps of €475,000 and 190 sqm and a 10-year occupancy condition — confirm current rules with a Cyprus tax adviser.' },
                { label: 'Commercial Real Estate', sub: 'Offices, retail units, hotels and similar income-generating premises', tag: '€300,000', note: 'Resale commercial assets can qualify under this route, with funding permitted from sources both inside and outside Cyprus.' },
                { label: 'Share Capital in a Cyprus Company', sub: 'Investment in an operating company registered and based in Cyprus', tag: '€300,000', note: 'The company must maintain a genuine physical presence in Cyprus and employ at least five staff based in the Republic.' },
                { label: 'Units in a Regulated Investment Fund', sub: 'Cyprus-regulated AIF, AIFLNP or RAIF structures', tag: '€300,000', note: 'This route typically requires the applicant to already hold Cyprus residency status to subscribe to the relevant fund units.' },
                { label: 'Income Threshold — Main Applicant', sub: 'Secured annual income from outside Cyprus, after tax', tag: '€50,000 / yr', note: 'The €50,000 minimum applies to the main applicant. Including a spouse adds €15,000, and each dependent child adds €10,000. A spouse\u2019s income may generally be counted toward the combined figure.' },
                { label: 'Source of Funds', sub: 'Applies to the qualifying €300,000 investment', tag: 'Personal Capital', note: 'The qualifying investment must be funded from the applicant\u2019s own legitimate, traceable resources, transferred from abroad. Mortgage or loan financing does not satisfy the investment requirement.' },
                { label: 'Government Filing & Registration Fees', sub: 'Payable to the Civil Registry and Migration Department', tag: 'From €500', note: 'A €500 application fee applies to the main applicant, with separate registration and residence card fees of €70 or more per family member where first-time documentation is required. We provide a full breakdown during the eligibility assessment.' },
              ].map((r, i) => (
                <div className="inv-row" key={i}>
                  <div className="label">{r.label}<small>{r.sub}</small></div>
                  <div className="value"><span className="tag">{r.tag}</span></div>
                  <div className="value">{r.note}</div>
                </div>
              ))}
            </div>
            <p className="inv-note">Figures reflect publicly available guidance on the Cyprus Permanent Residence programme at the time of writing and may be revised by the Cyprus authorities without notice. Langma International prepares a personalised investment and income breakdown as part of your eligibility assessment.</p>
          </div>
        </section>

        {/* ===== FAMILY INCLUSION ===== */}
        <section className="block family-sec" id="family">
          <div className="container">
            <div className="fam-grid">
              <div className="fam-media cy-reveal">
                <span className="frame"></span>
                <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1200&auto=format&fit=crop" alt="Family lifestyle and leisure in Cyprus" />
              </div>
              <div className="cy-reveal">
                <span className="eyebrow">Family Inclusion</span>
                <h2 style={{ fontSize: 'clamp(30px,4vw,48px)', marginBottom: 14 }}>A Single Filing That Can Cover Your Household</h2>
                <p style={{ color: '#296166', fontSize: 16.5, marginBottom: 22 }}>Cyprus Permanent Residence by Investment is designed so that eligible family members can be added to one application and receive the same residence status as the main applicant.</p>
                <ul className="fam-list">
                  {[
                    { n: '◆', t: 'Main Applicant', p: 'The person making the qualifying €300,000 investment and meeting the baseline €50,000 annual income requirement from sources outside Cyprus.' },
                    { n: '◆', t: 'Spouse', p: 'A spouse can be added to the same application alongside the main applicant. Including a spouse increases the required annual income threshold by €15,000 per year.' },
                    { n: '◆', t: 'Children Under 18', p: 'Unmarried minor children can be included. Each child raises the required annual income threshold by €10,000 per year.' },
                    { n: '◆', t: 'Dependent Student Children (18–25)', p: 'Unmarried children aged 18 to 25 may be eligible where financially dependent and enrolled in full-time education, with supporting evidence. Parents and parents-in-law are not eligible under current rules.' },
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
            <div className="section-head cy-reveal light">
              <span className="eyebrow center gold">Application Process</span>
              <h2>How a Cyprus PR by Investment Application Unfolds</h2>
              <p>Langma International coordinates each stage on your behalf, working alongside licensed Cyprus legal professionals. The complete process — from investment completion to residence card issuance — may generally take around 9 months or more, depending on individual circumstances, documentation readiness and government procedures.</p>
            </div>
            <div className="timeline">
              {[
                { d: '01', t: 'Eligibility Assessment', p: 'We begin with a confidential discussion covering your investment capacity, income sources and family composition, so we can map out which qualifying route fits your circumstances best.', time: 'Indicative: Weeks 1–2' },
                { d: '02', t: 'Investment Selection & Document Preparation', p: 'We help identify a suitable qualifying property or investment vehicle, gather source-of-funds and KYC documentation, and bring in a licensed Cyprus legal representative to prepare the formal filing.', time: 'Indicative: Weeks 2–8' },
                { d: '03', t: 'Completing the Investment', p: 'The qualifying investment is finalised — most commonly a property purchase — with the sale agreement registered at the Cyprus Land Registry. Funds must be transferred from abroad as unencumbered personal capital ahead of submission.', time: 'Indicative: Months 2–4' },
                { d: '04', t: 'Application Submission to the CRMD', p: 'The application form and supporting documents are lodged with the Civil Registry and Migration Department, either directly or via a representative acting under power of attorney.', time: 'Indicative: Month 3–4' },
                { d: '05', t: 'Government Review', p: 'The CRMD reviews the investment evidence, income documentation and criminal record certificates for all adult applicants. The fast-track route is designed for an accelerated review, though duration depends on departmental procedures.', time: 'Indicative: Months 4–8' },
                { d: '06', t: 'Biometrics & Residence Card Issuance', p: 'Once approved, applicants travel to Cyprus for biometric enrolment, after which the residence card is issued. The underlying immigration permit remains valid indefinitely, with the card subject to periodic administrative reissue.', time: 'Indicative: Months 8–9+' },
              ].map((s, i) => (
                <div className="tl-item cy-reveal" key={i}>
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

        {/* ===== LIFESTYLE ===== */}
        <section className="block life" id="living">
          <div className="container">
            <div className="section-head cy-reveal">
              <span className="eyebrow center">Life in Cyprus</span>
              <h2>Settling Into Life on the Island</h2>
              <p>Beyond the residence permit itself, Cyprus offers a Mediterranean lifestyle shaped by warm coastlines, international schooling, accessible private healthcare and a year-round outdoor climate.</p>
            </div>
            <div className="life-grid">
              {[
                { img: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=1200&auto=format&fit=crop', alt: 'Mediterranean coastline of Cyprus', t: 'Coastlines & Natural Surroundings' },
                { img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop', alt: 'Residential property in Cyprus', t: 'Residential Property Options' },
                { img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop', alt: 'International schools in Cyprus', t: 'International Schooling' },
                { img: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?q=80&w=1200&auto=format&fit=crop', alt: 'Family life in Cyprus', t: 'Everyday Family Life' },
                { img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop', alt: 'Private healthcare in Cyprus', t: 'Private Healthcare Access' },
              ].map((c, i) => (
                <div className="life-card cy-reveal" key={i}>
                  <img src={c.img} alt={c.alt} /><div className="ov"></div><div className="cap"><h3>{c.t}</h3></div>
                </div>
              ))}
            </div>
            <div className="life-strip">
              {['Mediterranean climate', '12.5% corporate tax', 'English widely spoken', 'EU member state', 'Common-law property rights', 'Safe, family-oriented'].map((t, i) => (
                <span className="life-tag cy-reveal" key={i}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY LANGMA ===== */}
        <section className="block langma" id="langma">
          <div className="container">
            <div className="langma-grid">
              <div className="cy-reveal">
                <span className="eyebrow light">Why Langma International</span>
                <h2>A Senior-Led Advisory Partner for Your Cyprus Journey</h2>
                <p className="lead">We work with a select number of families each year, ensuring every Cyprus PR mandate receives the rigour, discretion and continuity it demands.</p>
                <p className="lead">From the first conversation to your residence card, you work with people who understand both the regulation and the human reality of relocating a life.</p>
              </div>
              <div className="lg-list cy-reveal">
                {[
                  { n: '01', t: 'Advice Centred on Your Profile', p: 'We start by understanding your investment capacity, income arrangements and family situation, then recommend the qualifying route that genuinely fits — rather than steering every client toward the same product.' },
                  { n: '02', t: 'Working With Licensed Cyprus Professionals', p: 'Our role is coordination: we work alongside Cyprus-licensed lawyers and property specialists so that documentation, registrations and filings are prepared to the standards expected by the CRMD.' },
                  { n: '03', t: 'One Point of Contact, Start to Finish', p: 'From the first consultation through to biometrics and permit collection, a single senior advisor stays with your case — keeping you informed, managing timelines, and handling enquiries with discretion.' },
                ].map((c, i) => <div className="lg-item" key={i}><div className="lgnum">{c.n}</div><h4>{c.t}</h4><p>{c.p}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="block faq" id="faq">
          <div className="container">
            <div className="section-head cy-reveal">
              <span className="eyebrow center">Frequently Asked Questions</span>
              <h2>Cyprus Permanent Residence by Investment — Common Questions</h2>
            </div>
            <div className="faq-wrap">
              {[
                { q: 'Who can apply for Cyprus Permanent Residence by Investment?', a: 'Adults holding non-EU, non-EEA nationality can apply. The route requires a qualifying investment of at least €300,000 (plus VAT where applicable) in an approved Cyprus asset, together with a secured annual income of at least €50,000 from sources outside Cyprus (after tax). All adult applicants must hold a clean criminal record.' },
                { q: 'What types of investment qualify?', a: 'Recognised options include a new-build residential property bought first-hand from a developer; commercial real estate such as offices, retail premises or hotels, where resale assets are permitted; share capital in a Cyprus-registered operating company that maintains a physical office and employs at least five people in Cyprus; or units in a regulated Cyprus collective investment scheme (AIF, AIFLNP or RAIF).' },
                { q: 'How long does the application typically take?', a: 'Government examination of a complete Category 6.2 submission is generally accelerated. However, the complete process — from finalising the qualifying investment, through document preparation, government review and biometric enrolment, to receiving the residence card — may generally take around 9 months or more, depending on individual circumstances, documentation readiness and government procedures at the time.' },
                { q: 'Do I need to live in Cyprus full-time?', a: 'No. There is no obligation to reside in Cyprus on a full-time or even part-time basis. The main requirement is to enter Cyprus at least once every two years. Holders who take up permanent residence in another country, or who remain outside Cyprus for two consecutive years, risk having their permit withdrawn.' },
                { q: 'Which family members can be added to my application?', a: 'A spouse and unmarried minor children can be included alongside the main applicant. Unmarried children aged 18 to 25 may also qualify if they remain financially dependent and are enrolled as full-time students. The required annual income increases by €15,000 for a spouse and €10,000 for each dependent child, in addition to the €50,000 base income. Under current Regulation 6(2) rules, parents and parents-in-law cannot be included as dependants.' },
                { q: 'Does this programme lead directly to citizenship?', a: 'Cyprus Permanent Residence by Investment does not by itself grant citizenship. A permanent resident may become eligible to apply for naturalisation only after satisfying the residence, integration and other statutory requirements set out in Cypriot law at the time of application. These requirements can change, and prospective applicants should seek current legal advice on the citizenship pathway.' },
                { q: 'What do I need to do to keep my permit valid?', a: 'Permit holders are expected to retain the qualifying investment, continue meeting the income criteria, maintain valid private health insurance, and periodically provide clean criminal record certificates for adult family members. Any significant change in circumstances — such as marital status, dependants, or income sources — should be reported to the CRMD.' },
                { q: 'What government fees should I expect?', a: 'A government application fee of €500 applies to the main applicant, with separate registration and residence card fees of €70 or more per family member where first-time documentation is required. These government charges are separate from any legal, advisory or property transaction costs — we provide a complete fee breakdown for your family as part of the eligibility assessment.' },
              ].map((faq, i) => (
                <div className={`faq-item cy-reveal ${openFaq === i ? 'open' : ''}`} key={i}>
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
              <div className="lead-copy cy-reveal">
                <span className="eyebrow light">Begin Your Application</span>
                <h2>Talk to an Advisor About Your Cyprus PR Options</h2>
                <p>Book a confidential consultation with Langma International to check your eligibility for the Cyprus Permanent Residence programme and receive a tailored breakdown of investment and income requirements for your family.</p>
                <ul className="lead-assure">
                  {[
                    'Complimentary, no-obligation eligibility review',
                    'Investment route guidance matched to your profile',
                    'Income structuring and dependant planning support',
                    'Introductions to licensed Cyprus legal professionals',
                    'Continued support through to permit issuance',
                  ].map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
              <div className="form-card cy-reveal">
                <h3>Request Your Eligibility Review</h3>
                <p className="fsub">A member of our advisory team will respond within one business day.</p>
                <form onSubmit={handleLeadSubmit} noValidate>
                  <div className="frow">
                    <div className="field"><label htmlFor="l-fname">First name</label><input type="text" id="l-fname" required /></div>
                    <div className="field"><label htmlFor="l-lname">Last name</label><input type="text" id="l-lname" required /></div>
                  </div>
                  <div className="field"><label htmlFor="l-email">Email address</label><input type="email" id="l-email" required /></div>
                  <div className="frow">
                    <div className="field"><label htmlFor="l-phone">Phone number</label><input type="tel" id="l-phone" placeholder="+ Country code" /></div>
                    <div className="field"><label htmlFor="l-country">Country of residence</label><input type="text" id="l-country" placeholder="Where are you based?" /></div>
                  </div>
                  <div className="field">
                    <label htmlFor="l-interest">Investment route of interest</label>
                    <select id="l-interest" required defaultValue="">
                      <option value="" disabled>— Please select —</option>
                      <option>New-Build Residential Property</option>
                      <option>Commercial Real Estate</option>
                      <option>Cyprus Company Share Capital</option>
                      <option>Regulated Investment Fund</option>
                      <option>General Enquiry — Cyprus PR</option>
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

        {/* ===== OFFICE VISIT ===== */}
        <section className="block office" id="office-visit">
          <div className="container">
            <div className="office-grid">
              <div className="office-copy cy-reveal">
                <span className="eyebrow">Visit Us</span>
                <h2>Book an Office Consultation</h2>
                <p>Meet with our advisory team in person to discuss your Cyprus Permanent Residence options, ask questions, and plan your next steps.</p>
                <ul className="office-points">
                  {[
                    { i: '✦', t: 'Direct meeting with a senior advisor', p: 'A face-to-face conversation with the person who will guide your Cyprus PR case from start to finish.' },
                    { i: '✓', t: 'Guidance on investment & income planning', p: 'A confidential review of investment routes, income structuring and family inclusion tailored to your profile.' },
                    { i: '⊞', t: 'Appointments around your schedule', p: 'Sessions arranged at a time that suits you, in person and without pressure.' },
                    { i: '↪', t: 'A private, no-pressure conversation', p: 'Leave with a clear, structured understanding of your application pathway and realistic next steps.' },
                  ].map((c, i) => (
                    <li key={i}><span className="oi">{c.i}</span><div><h4>{c.t}</h4><p>{c.p}</p></div></li>
                  ))}
                </ul>
              </div>
              <div className="office-form cy-reveal">
                <h3>Request a Visit</h3>
                <form onSubmit={handleOfficeSubmit} noValidate>
                  <div className="field"><label htmlFor="ov-name">Full name</label><input type="text" id="ov-name" required /></div>
                  <div className="frow">
                    <div className="field"><label htmlFor="ov-phone">Phone number</label><input type="tel" id="ov-phone" placeholder="+ Country code" required /></div>
                    <div className="field"><label htmlFor="ov-email">Email address</label><input type="email" id="ov-email" required /></div>
                  </div>
                  <div className="frow">
                    <div className="field"><label htmlFor="ov-date">Preferred date</label><input type="date" id="ov-date" min={new Date().toISOString().split('T')[0]} required /></div>
                    <div className="field">
                      <label htmlFor="ov-time">Preferred time</label>
                      <select id="ov-time" required defaultValue="">
                        <option value="" disabled>Select a time</option>
                        <option>09:00 AM – 11:00 AM</option>
                        <option>11:00 AM – 01:00 PM</option>
                        <option>02:00 PM – 04:00 PM</option>
                        <option>04:00 PM – 05:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="ov-program">Programme of interest</label>
                    <select id="ov-program" defaultValue="">
                      <option value="">— Select —</option>
                      <option>Cyprus Permanent Residence</option>
                      <option>Investment route guidance</option>
                      <option>Family application planning</option>
                      <option>Document review</option>
                      <option>Other PR programmes</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-dark" style={{ width: '100%', justifyContent: 'center' }} disabled={officeLoading}>{officeLoading ? 'Sending...' : 'Request Office Visit'}</button>
                  {(officeMsg || officeSubmitted) && (
                    <div className={`success show${officeSuccess ? '' : ''}`} style={{ marginTop: 16, ...(!officeSuccess && officeMsg ? {background:'rgba(220,38,38,.08)',border:'1px solid #ef4444',color:'#b91c1c'} : {})}}>
                      {officeMsg || 'Thank you — an advisor will be in touch shortly.'}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="foot">
          <div className="container">
            <div className="foot-grid">
              <div>
                <div className="foot-logo">LANGMA <span>INTERNATIONAL</span></div>
                <p>Advisory on residency and citizenship by investment programmes — helping individuals and families navigate global mobility options with clarity, discretion and a long-term outlook.</p>
              </div>
              <div className="foot-col">
                <h5>Programme</h5>
                <ul>
                  <li><a href="#why-cyprus">Why Cyprus</a></li>
                  <li><a href="#programme">Programme Overview</a></li>
                  <li><a href="#investment">Investment Requirements</a></li>
                  <li><a href="#process">Application Process</a></li>
                </ul>
              </div>
              <div className="foot-col">
                <h5>Resources</h5>
                <ul>
                  <li><a href="#faq">FAQ</a></li>
                  <li><a href="#lead">Book a Consultation</a></li>
                  <li><a href="#lead">Eligibility Assessment</a></li>
                  <li><a href="#office-visit">Office Visit</a></li>
                </ul>
              </div>
              <div className="foot-col">
                <h5>Contact</h5>
                <ul>
                  <li><a href="#lead">Speak With an Advisor</a></li>
                  <li><a href="mailto:info@langmainternational.com">info@langmainternational.com</a></li>
                </ul>
              </div>
            </div>
            <div className="foot-bottom">
              <span>© 2026 Langma International. All rights reserved.</span>
              <span style={{ maxWidth: 620 }}>Information provided is for general guidance only and does not constitute legal, tax, financial or immigration advice. Eligibility, fees, timelines and benefits are subject to change by the Cyprus authorities and should be verified with a licensed Cyprus immigration lawyer and a qualified tax adviser before making any decision.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default CyprusPRPage;