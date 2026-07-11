import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import GoldenVisaForm from "./GoldenVisaform";
import Goldenvisaform2 from "./Goldenvisaform2";

const CSS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700;800&display=swap');

:root{
  --teal:#296166;
  --teal-deep:#1A2540;
  --teal-soft:#174C4A;
  --teal-line:rgba(47,199,161,.22);
  --mint:#2FC7A1;
  --mint-light:#6FE0C6;
  --mint-dim:rgba(47,199,161,.12);
  --sky:#4FA3D1;
  --gold:#2FC7A1;
  --gold-light:#6FE0C6;
  --gold-pale:#E6F8F3;
  --ivory:#F5F8F6;
  --ivory-2:#E9F1EE;
  --white:#FFFFFF;
  --ink:#1B2B28;
  --ink-soft:#4C5C58;
  --ink-faint:#7E8C88;
  --navy:#1A2540;
  --navy-mid:#296166;
  --navy-light:#296166;
  --shadow-lg:0 30px 70px -30px rgba(6,40,37,.18);
  --shadow-sm:0 10px 30px -15px rgba(6,40,37,.12);
  --shadow-gold:0 12px 40px -15px rgba(47,199,161,.25);
  --radius-lg:22px;
  --radius-md:14px;
  --radius-sm:8px;
  --font-display:'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}


html{scroll-behavior:smooth;}
body{font-family:var(--font-body);color:var(--ink);background:var(--white);line-height:1.7;-webkit-font-smoothing:antialiased;}
img{display:block;max-width:100%;}
a{text-decoration:none;color:inherit;}
ul{list-style:none;}
button{font-family:var(--font-body);cursor:pointer;border:none;}
h1,h2,h3,h4{margin:0;font-family:var(--font-display);font-weight:600;color:var(--teal);letter-spacing:-0.02em;}
:focus-visible{outline:2px solid var(--mint);outline-offset:3px;}

/* ── EYEBROW ── */
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-body);font-weight:600;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--mint);margin-bottom:14px;}
.eyebrow::before{content:"";width:24px;height:1px;background:var(--mint);display:inline-block;}
.eyebrow--dark{color:var(--mint-light);}
.eyebrow--gold{color:var(--gold);}
.eyebrow--gold::before{background:var(--gold);}

/* ── SECTIONS ── */
.section{padding:96px 40px;}
.section--navy{background:var(--ivory);color:var(--ink);}
.section--navy h2,.section--navy h3,.section--navy h4{color:var(--teal);}
.section--ivory2{background:var(--ivory-2);}
.section--white{background:var(--white);}
.container{max-width:1100px;margin:0 auto;width:100%;}
.section-head{margin-bottom:56px;}
.section-head.center{text-align:center;}
.section-head.center .section-sub{margin-left:auto;margin-right:auto;}
.section-title{font-size:clamp(28px,3.6vw,46px);line-height:1.15;font-weight:600;color:var(--teal);margin-bottom:12px;}
.section-title em{font-style:italic;color:var(--sky);font-weight:500;}
.section--navy .section-title{color:var(--teal);}
.section-sub{font-size:16px;color:var(--ink-soft);line-height:1.65;max-width:620px;margin-top:16px;}
.section--navy .section-sub{color:var(--ink-soft);}

/* ── BUTTONS ── */
.btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:999px;font-weight:600;font-size:14px;transition:all .25s ease;letter-spacing:.01em;border:2px solid transparent;}
.btn-primary{background:#1A2540;color:#F5F2EC;box-shadow:var(--shadow-sm);}
.btn-primary:hover{background:#243160;transform:translateY(-2px);}
.btn-gold{background:#1A2540;color:#F5F2EC;font-weight:600;}
.btn-gold:hover{background:#243160;transform:translateY(-2px);box-shadow:var(--shadow-sm);}
.btn-ghost{border:2px solid #2FC7A1;color:#1A2540;background:#fff;}
.btn-ghost:hover{background:#E6F8F3;border-color:#2FC7A1;color:#1A2540;transform:translateY(-2px);}
.btn-outline{border-color:var(--teal-line);color:var(--teal);background:#fff;}
.btn-outline:hover{border-color:var(--mint);background:#E6F8F3;transform:translateY(-2px);}
.btn-whatsapp{background:#25D366;color:#fff;}
.btn-whatsapp:hover{background:#1ebe5d;transform:translateY(-2px);}

/* ── REVEAL ── */
.reveal{opacity:0;transform:translateY(26px);transition:opacity .65s ease,transform .65s ease;}
.reveal.is-visible{opacity:1;transform:none;}

/* ── HERO ── */
.gv-hero{
  background:#FFFFFF;
  min-height:auto;display:flex;align-items:center;
  position:relative;overflow:hidden;padding:72px 40px 56px;
}
.gv-hero::before{
  content:"";position:absolute;left:40px;top:72px;bottom:56px;width:3px;border-radius:999px;
  background:linear-gradient(to bottom,transparent,var(--mint),transparent);pointer-events:none;
}
.gv-hero__grid{display:none;}
.page-banner{background:linear-gradient(120deg,rgba(47,199,161,.12),rgba(79,163,209,.1));color:var(--ink);text-align:center;padding:18px 16px;font-size:14px;line-height:1.6;border-bottom:1px solid var(--teal-line);}
.page-banner p{margin:0;max-width:1100px;margin-left:auto;margin-right:auto;font-weight:500;}
.page-banner strong{font-weight:700;color:var(--teal);}
.gv-hero__glow,.gv-hero__glow2{display:none;}
.gv-hero__inner{position:relative;max-width:1100px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr minmax(280px,360px);gap:40px;align-items:center;}
.gv-hero__content{max-width:720px;padding-left:18px;}
.gv-hero__badge-pill{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(47,199,161,.4);border-radius:999px;padding:6px 14px;margin-bottom:16px;}
.gv-hero__badge-dot{width:6px;height:6px;border-radius:50%;background:var(--mint);flex-shrink:0;}
.gv-hero__badge-pill span:last-child{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--mint);}
.gv-hero__brand-row{display:flex;align-items:center;gap:8px;margin-bottom:20px;}
.gv-hero__brand-line{width:28px;height:1.5px;background:var(--teal);display:block;}
.gv-hero__brand-row span:last-child{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--teal);font-weight:500;}
.gv-hero__side-banner{background:var(--ivory);border:1px solid rgba(47,199,161,.2);border-radius:var(--radius-lg);padding:32px;box-shadow:var(--shadow-sm);}
.gv-hero__side-banner .eyebrow{color:var(--mint);}
.gv-hero__side-banner h3{font-size:clamp(22px,2.4vw,28px);line-height:1.2;margin:16px 0 16px;color:var(--teal);}
.gv-hero__side-banner p{font-size:15px;color:var(--ink-soft);line-height:1.75;margin-bottom:22px;}
.gv-hero__side-banner .btn{width:100%;justify-content:center;}
.hero-info-graphic{display:flex;align-items:center;justify-content:center;margin-bottom:18px;padding:0 0 8px;}
.hero-info-graphic svg{width:100%;max-width:240px;height:auto;filter:drop-shadow(0 12px 28px rgba(41,97,102,.12));}
.hero-info-list{margin:0;padding:0;list-style:none;display:grid;gap:12px 0;}
.hero-info-list li{position:relative;padding-left:22px;font-size:14px;color:var(--ink-soft);line-height:1.7;}
.hero-info-list li::before{content:'•';position:absolute;left:0;top:1px;color:var(--mint);font-size:18px;line-height:1;}
.hero-info-list li strong{color:var(--teal);}
@media(max-width:930px){.gv-hero__inner{grid-template-columns:1fr;}.gv-hero__side-banner{margin-top:24px;}.gv-hero::before{left:24px;top:64px;bottom:48px;}}
.gv-hero h1{font-size:clamp(34px,5vw,56px);line-height:1.08;font-weight:700;color:#111827;margin-bottom:22px;max-width:800px;}
.gv-hero h1 em{font-style:italic;color:var(--sky);font-weight:700;}
.gv-hero__sub{font-size:17px;color:var(--ink-soft);max-width:560px;margin-bottom:36px;line-height:1.7;font-weight:400;}
.gv-hero__ctas{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:48px;}
.gv-hero__stats{display:flex;gap:40px;border-top:1px solid #D8E0EC;padding-top:32px;flex-wrap:wrap;}
.gv-hero__stat-num{font-family:var(--font-display);font-size:30px;font-weight:600;color:var(--teal);display:block;line-height:1;margin-bottom:6px;}
.gv-hero__stat-label{font-size:11px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.12em;font-weight:600;}

/* ── TRUST STRIP ── */
.trust-strip{background:var(--white);border-bottom:1px solid var(--ivory-2);}
.trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--ivory-2);border-radius:var(--radius-md);overflow:hidden;border:1px solid var(--ivory-2);}
.trust-block{background:var(--white);padding:40px 28px;text-align:center;}
.trust-block__icon{font-size:30px;margin-bottom:14px;display:block;}
.trust-block__num{font-family:var(--font-display);font-size:32px;font-weight:300;color:var(--teal);display:block;line-height:1;margin-bottom:8px;}
.trust-block__label{font-size:13px;color:var(--ink-faint);line-height:1.5;}

/* ── WHY GOLDEN VISAS ── */
.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.why-card{background:var(--white);border-radius:var(--radius-md);padding:34px 28px;border:1px solid var(--ivory-2);transition:box-shadow .25s,transform .25s;}
.why-card:hover{box-shadow:var(--shadow-lg);transform:translateY(-4px);}
.why-card__icon{width:46px;height:46px;border-radius:10px;background:var(--mint-dim);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
.why-card__icon svg{width:22px;height:22px;fill:var(--teal);}
.why-card h3{font-size:17px;font-weight:600;color:var(--teal);margin-bottom:10px;font-family:var(--font-display);}
.why-card p{font-size:14px;color:var(--ink-soft);line-height:1.7;}

/* ── COUNTRY CARDS ── */
.countries-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;}
.cc{background:var(--white);border-radius:var(--radius-lg);border:1.5px solid rgba(41,97,102,.12);overflow:hidden;transition:border-color .25s,transform .25s,box-shadow .25s;box-shadow:var(--shadow-sm);}
.cc:hover{border-color:rgba(47,199,161,.35);transform:translateY(-4px);box-shadow:var(--shadow-lg);}
.cc__header{padding:26px 28px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
.cc__badge{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:5px 13px;border-radius:40px;background:var(--mint-dim);color:var(--teal);border:1px solid rgba(47,199,161,.22);white-space:nowrap;}
.cc h3{font-size:26px;font-weight:600;color:var(--teal);padding:14px 28px 0;}
.cc__overview{font-size:13px;color:var(--ink-soft);padding:8px 28px 18px;line-height:1.65;}
.cc__specs{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--ivory-2);margin:0 28px 22px;border-radius:var(--radius-sm);overflow:hidden;border:1px solid rgba(41,97,102,.08);}
.cc__spec{background:var(--ivory);padding:13px 15px;}
.cc__spec-label{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--mint);margin-bottom:3px;display:block;}
.cc__spec-value{font-size:13px;color:var(--ink);font-weight:500;}
.cc__benefits{padding:0 28px;margin-bottom:18px;}
.cc__benefits li{font-size:13px;color:var(--ink-soft);padding:5px 0 5px 18px;position:relative;line-height:1.5;}
.cc__benefits li::before{content:'›';position:absolute;left:0;color:var(--mint);font-weight:700;font-size:16px;line-height:1.2;}
.cc__footer{padding:18px 28px 26px;border-top:1px solid var(--ivory-2);}
.cc__ideal{font-size:12px;color:var(--ink-faint);margin-bottom:12px;font-style:italic;}
.cc__note{font-size:11px;color:var(--ink-faint);font-style:italic;margin-bottom:14px;line-height:1.55;}
.cc__cta{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--teal);border-bottom:1px solid rgba(47,199,161,.28);padding-bottom:2px;transition:border-color .2s;}
.cc__cta:hover{border-color:var(--mint);}
.cc--placeholder{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;min-height:340px;background:var(--mint-dim);border:1.5px dashed rgba(47,199,161,.3);}
.cc--placeholder p.emoji{font-size:42px;margin-bottom:18px;}
.cc--placeholder h3{font-size:22px;color:var(--teal);margin-bottom:10px;}
.cc--placeholder p.desc{font-size:13px;color:var(--ink-soft);max-width:270px;margin-bottom:22px;line-height:1.6;}

/* ── EU / PERM TAGS ── */
.tag{display:inline-block;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;margin-left:6px;letter-spacing:.06em;}
.tag-eu{background:#E3F1E9;color:#206B3A;}
.tag-perm{background:#E6EEF8;color:#1A4F8A;}

/* ── COMPARISON TABLE ── */
.comparison-wrap{overflow-x:auto;border-radius:var(--radius-md);box-shadow:var(--shadow-sm);}
.comparison-table{width:100%;border-collapse:collapse;font-size:13px;min-width:900px;}
.comparison-table thead th{background:#1A2540;color:#F5F8F6;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:16px 16px;text-align:left;border-bottom:2px solid var(--mint);}
.comparison-table tbody tr{transition:none;}
.comparison-table td{white-space:normal;}
@media(max-width:900px){
  .comparison-table{min-width:100%;font-size:13px;}
  .comparison-table thead{display:none;}
  .comparison-table tbody, .comparison-table tr, .comparison-table td{display:block;width:100%;}
  .comparison-table tr{margin-bottom:20px;padding:18px 16px;border:1px solid var(--ivory-2);border-radius:var(--radius-md);background:var(--white);}
  .comparison-table td{padding:10px 0;border:none;border-bottom:1px solid rgba(52,70,64,.08);position:relative;text-align:left;}
  .comparison-table td:last-child{border-bottom:none;}
  .comparison-table td::before{content:attr(data-label);display:block;font-size:11px;font-weight:700;color:var(--teal);margin-bottom:6px;text-transform:uppercase;letter-spacing:.08em;}
  .comparison-table td:first-child{padding-top:0;}
}
.comparison-table thead th:first-child{border-radius:var(--radius-md) 0 0 0;}
.comparison-table thead th:last-child{border-radius:0 var(--radius-md) 0 0;}
.comparison-table tbody tr{border-bottom:1px solid var(--ivory-2);transition:background .15s;}
.comparison-table tbody tr:hover{background:rgba(47,199,161,.05);}
.comparison-table tbody tr:last-child{border-bottom:none;}
.comparison-table td{padding:14px 16px;color:var(--ink-soft);vertical-align:top;line-height:1.5;}
.comparison-table td:first-child{font-weight:600;color:var(--ink);}
.comparison-note{font-size:12px;color:var(--ink-faint);margin-top:16px;line-height:1.6;}

/* ── WHY LANGMA SECTION ── */
.langma-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start;}
.langma-pillars{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:36px;}
.pillar{background:var(--white);border-radius:var(--radius-md);border:1px solid var(--ivory-2);padding:26px 22px;}
.pillar__num{font-family:var(--font-display);font-size:34px;font-weight:600;color:var(--teal);line-height:1;margin-bottom:10px;}
.pillar h4{font-size:15px;font-weight:600;color:var(--teal);margin-bottom:7px;}
.pillar p{font-size:13px;color:var(--ink-soft);line-height:1.6;}
.langma-promise{background:var(--white);border:1px solid rgba(47,199,161,.2);border-radius:var(--radius-lg);padding:44px 40px;color:var(--ink);box-shadow:var(--shadow-sm);}
.langma-promise h3{font-size:26px;font-weight:600;color:var(--teal);margin-bottom:18px;line-height:1.3;}
.langma-promise p{font-size:14px;color:var(--ink-soft);margin-bottom:14px;line-height:1.7;}
.promise-list{margin-top:24px;}
.promise-list li{font-size:14px;color:var(--ink-soft);padding:10px 0 10px 20px;border-bottom:1px solid var(--ivory-2);position:relative;line-height:1.5;}
.promise-list li:last-child{border-bottom:none;}
.promise-list li::before{content:'—';position:absolute;left:0;color:var(--mint);}

/* ── SCHEDULE / BOOKING ── */
.schedule-section{background:var(--ivory);position:relative;overflow:hidden;}
.schedule-bg{display:none;}
.schedule-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;position:relative;}
.schedule-card{background:var(--white);border-radius:var(--radius-lg);padding:40px;border:1px solid rgba(41,97,102,.1);box-shadow:var(--shadow-sm);}
.schedule-card h3{font-family:var(--font-display);font-size:22px;font-weight:500;color:var(--teal);margin-bottom:6px;}
.schedule-card p.sub{font-size:13px;color:var(--ink-faint);margin-bottom:26px;}
.form-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);display:block;margin-bottom:7px;}
.form-input,.form-select{width:100%;padding:12px 15px;border:1.5px solid var(--ivory-2);border-radius:var(--radius-sm);font-family:var(--font-body);font-size:14px;color:var(--ink);background:var(--white);outline:none;transition:border-color .2s;appearance:none;}
.form-input:focus,.form-select:focus{border-color:var(--mint);background:var(--white);}
.form-row{margin-bottom:16px;}
.form-row-2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;}
.form-submit{width:100%;padding:15px;background:#1A2540;color:var(--white);border:none;border-radius:999px;font-size:14px;font-weight:700;letter-spacing:.06em;cursor:pointer;transition:background .2s;margin-top:6px;}
.form-submit:hover{background:#243160;}
.schedule-info{color:var(--ink);padding-top:10px;}
.schedule-info h3{font-size:32px;font-weight:600;color:var(--teal);margin-bottom:18px;line-height:1.3;}
.schedule-info h3 em{font-style:italic;color:var(--sky);}
.schedule-info p{font-size:14px;color:var(--ink-soft);margin-bottom:32px;line-height:1.7;}
.branch-list{display:flex;flex-direction:column;gap:14px;}
.branch-item{display:flex;align-items:center;gap:14px;background:var(--white);border:1px solid rgba(41,97,102,.1);border-radius:var(--radius-md);padding:16px 18px;}
.branch-icon{width:40px;height:40px;border-radius:8px;background:var(--mint-dim);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px;}
.branch-name{font-size:14px;font-weight:600;color:var(--ink);display:block;margin-bottom:3px;}
.branch-addr{font-size:12px;color:var(--ink-faint);}

/* ── JOURNEY ── */
.journey-steps{display:grid;grid-template-columns:repeat(6,1fr);gap:0;position:relative;margin-top:16px;}
.journey-steps::before{content:'';position:absolute;top:24px;left:4%;right:4%;height:1px;background:linear-gradient(90deg,var(--mint) 0%,var(--ivory-2) 100%);z-index:0;}
.journey-step{text-align:center;padding:0 10px;position:relative;z-index:1;}
.journey-step__circle{width:48px;height:48px;border-radius:50%;background:var(--mint-dim);border:2px solid var(--mint);display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-size:14px;font-weight:700;color:var(--teal);}
.journey-step h4{font-size:12px;font-weight:700;color:var(--teal);margin-bottom:6px;text-transform:uppercase;letter-spacing:.07em;font-family:var(--font-body);}
.journey-step p{font-size:12px;color:var(--ink-faint);line-height:1.5;}

/* ── FAQ ── */
.faq-list{max-width:800px;margin:0 auto;}
.faq-item{border-bottom:1px solid var(--ivory-2);padding:24px 0;}
.faq-item:last-child{border-bottom:none;}
.faq-q{font-family:var(--font-display);font-size:18px;font-weight:500;color:var(--teal);margin-bottom:0;cursor:pointer;display:flex;justify-content:space-between;align-items:flex-start;gap:14px;background:none;border:none;width:100%;text-align:left;padding:0;}
.faq-q__icon{font-size:22px;font-weight:300;color:var(--mint);flex-shrink:0;line-height:1.3;transition:transform .25s;}
.faq-q__icon.open{transform:rotate(45deg);}
.faq-a{font-size:14px;color:var(--ink-soft);line-height:1.75;margin-top:14px;overflow:hidden;max-height:0;transition:max-height .4s ease, opacity .3s ease;opacity:0;}
.faq-a.open{max-height:600px;opacity:1;}

/* ── LEAD CAPTURE ── */
.lead-section{background:var(--ivory-2);text-align:center;position:relative;overflow:hidden;border-top:1px solid rgba(41,97,102,.08);}
.lead-glow{display:none;}
.lead-inner{position:relative;max-width:680px;margin:0 auto;}
.lead-inner p.body{font-size:16px;color:var(--ink-soft);margin-bottom:36px;line-height:1.7;}
.lead-form{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:16px;}
.lead-input{flex:1;min-width:190px;max-width:270px;padding:14px 18px;border:1.5px solid rgba(41,97,102,.14);border-radius:999px;background:var(--white);color:var(--ink);font-size:14px;font-family:var(--font-body);outline:none;transition:border-color .2s;}
.lead-input::placeholder{color:var(--ink-faint);}
.lead-input:focus{border-color:var(--mint);}
.lead-disclaimer{font-size:11px;color:var(--ink-faint);margin-top:14px;}

/* ── RESPONSIVE ── */
@media(max-width:1024px){.why-grid{grid-template-columns:1fr 1fr;}.langma-grid{grid-template-columns:1fr;gap:36px;}.langma-promise{margin-top:0;}}
@media(max-width:900px){.section{padding:70px 24px;}.gv-hero{padding:72px 24px 60px;}.trust-grid{grid-template-columns:1fr 1fr;}.why-grid{grid-template-columns:1fr;}.countries-grid{grid-template-columns:1fr;}.schedule-grid{grid-template-columns:1fr;}.journey-steps{grid-template-columns:repeat(3,1fr);gap:22px;}.journey-steps::before{display:none;}.gv-hero__stats{gap:28px;}}
@media(max-width:600px){.trust-grid{grid-template-columns:1fr;}.langma-pillars{grid-template-columns:1fr;}.form-row-2{grid-template-columns:1fr;}.lead-form{flex-direction:column;align-items:stretch;}.lead-input{max-width:100%;}.journey-steps{grid-template-columns:repeat(2,1fr);}}


/* ===================== ANIMATIONS ===================== */
@keyframes gvFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-18px);}}
@keyframes gvFloat2{0%,100%{transform:translate(0,0);}50%{transform:translate(18px,-14px);}}
@keyframes gvGridPan{0%{background-position:0 0;}100%{background-position:60px 60px;}}

/* drifting hero glows + grid */
.lead-glow{display:none;}

/* springier scroll-reveal */
.reveal{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s cubic-bezier(.22,1,.36,1);}
.reveal.is-visible{opacity:1;transform:none;}

/* card hover motion */
.why-card,.pillar,.schedule-card,.journey-step{transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s ease,border-color .3s ease;}
.why-card:hover,.pillar:hover,.schedule-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg);}
.journey-step:hover{transform:translateX(6px);}

/* primary/cta buttons shine sweep on hover */
.btn-primary,.btn-gold,.form-submit{position:relative;overflow:hidden;}
.btn-primary::after,.btn-gold::after,.form-submit::after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.42) 50%,transparent 70%);transform:translateX(-130%);transition:transform .6s ease;pointer-events:none;}
.btn-primary:hover::after,.btn-gold:hover::after,.form-submit:hover::after{transform:translateX(130%);}

@media (prefers-reduced-motion: reduce){
  .reveal{transition:opacity .3s ease;transform:none;}
}
`;

/* ── DATA ── */
const HERO_STATS = [
  ["7", "Curated Programs"],
  ["Europe", "+ Gulf + Americas Access"],
  ["5", "EU Schengen Nations"],
  ["India's", "Premium Mobility Advisor"],
];

const TRUST = [
  { icon: "🏛️", num: "100%", label: "Government-regulated programs with official legislative frameworks" },
  { icon: "👨‍👩‍👧‍👦", num: "Family", label: "All programs include spouse and dependent children under one application" },
  { icon: "🌐", num: "End-to-End", label: "From strategy design to post-approval settlement support" },
  { icon: "⭐", num: "Delhi", label: "Dedicated office for face-to-face investor consultations across India" },
];

const WHY = [
  { title: "Global Mobility & Visa-Free Travel",
    body: "European residency unlocks visa-free or visa-on-arrival entry across the Schengen Area — 29 countries accessible without pre-approval. UAE residency extends access across the Gulf and beyond.",
    icon: <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> },
  { title: "Family Security & Future Planning",
    body: "Secure stable residency for your spouse, children, and in certain programs, dependent parents — giving your family a Plan B that is robust, dignified, and accessible when needed most.",
    icon: <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.67V11c0 3.5-2.33 6.79-6 7.93-3.67-1.14-6-4.43-6-7.93V7.67L12 5z"/></svg> },
  { title: "Business Expansion & Market Access",
    body: "European residency creates a legitimate operational base for international trade, EU market entry, banking relationships, and corporate structuring that Indian nationality alone cannot provide.",
    icon: <svg viewBox="0 0 24 24"><path d="M20 7H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-1 8H5V9h14v6zM1 3h22v2H1zm0 16h22v2H1z"/></svg> },
  { title: "World-Class Education Access",
    body: "Residency in Portugal, Greece, Italy, Hungary, or Latvia opens pathways to European universities — domestic fee structures, Erasmus programmes, and pan-European academic credentials for your children.",
    icon: <svg viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18V15c0 3.31 3.13 6 7 6s7-2.69 7-6v-3.82L20 9.09V15h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99c0 2.21-2.24 4-5 4s-5-1.79-5-4v-2.73l5 2.73 5-2.73v2.73z"/></svg> },
  { title: "Lifestyle & Quality of Life",
    body: "From Lisbon's coastal elegance to Athens's ancient grandeur and Dubai's cosmopolitan dynamism — each program connects you to a world of cultural richness, healthcare excellence, and refined living.",
    icon: <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/></svg> },
  { title: "Asset Diversification & Wealth Structuring",
    body: "Investment routes across regulated funds, real estate, and enterprise capital allow investors to diversify internationally — combining a residency benefit with access to established asset classes across multiple jurisdictions.",
    icon: <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg> },
];

const COUNTRIES = [
  { name: "Portugal", link: "/portugal-golden-visa", badge: "EU · Schengen",
    overview: "One of Europe's most enduring residency-by-investment frameworks, granting EU residency through qualifying fund investments with minimal physical presence requirements — just seven days per year.",
    specs: [["Investment from","€500,000 (qualifying fund)"],["Processing","12–36 months"],["Validity","2 years (renewable)"],["Family Inclusion","Spouse, children to 26 & parents"]],
    benefits: ["Citizenship eligibility after 7–10 years of legal residency (subject to 2026 nationality law)","Only 7 days physical presence per year required","Access to Portuguese public healthcare and schools","CMVM-regulated qualifying funds","Portuguese passport: visa-free access to 190+ destinations"],
    ideal: "Long-term EU planning, family education, passport diversification",
    note: "⚠ Real estate is no longer a qualifying route. Investment fund minimum is €500,000. Cultural donation route from €250,000 also available." },
  { name: "Greece", link: "/greece-golden-visa", badge: "EU · Schengen",
    overview: "One of Europe's most established real-estate-backed residency pathways. The 5-year permit carries full Schengen residency privileges and imposes no minimum stay obligation. Investment thresholds are tiered by geographic zone.",
    specs: [["Investment from","€400,000–€800,000 (RE, zone-dependent)"],["Processing","Approx. 4–8 months"],["Validity","5 years (renewable)"],["Family Inclusion","Spouse, children <21 & parents"]],
    benefits: ["No minimum stay requirement to keep the residence permit valid","Direct real estate ownership — a tangible, titled asset","Schengen travel rights: 90 days per 180-day period across 29 countries","Path to citizenship after 7 years of genuine sustained residence","€250,000 threshold available only for commercial-to-residential conversions or heritage restorations"],
    ideal: "Real estate investors, lifestyle seekers, second-home buyers",
    note: "⚠ €800,000 in Attica, Thessaloniki, Mykonos, Santorini & islands >3,100 pop.; €400,000 in all other regions. Property must be a single unit ≥120 sqm." },
  { name: "Italy", link: "/italy-golden-visa", badge: "EU · Schengen",
    overview: "Italy's Investor Visa grants EU residency through a qualifying investment in an innovative Italian startup or established company — without requiring real estate. A distinctive pre-approval process means government assesses your application before you commit capital.",
    specs: [["Investment from","€250,000 (innovative startup)"],["Processing","3–6 months"],["Validity","2 years (renewable; PR at 5 yrs)"],["Family Inclusion","Spouse; children & parents (conditions)"]],
    benefits: ["Two confirmed routes: innovative startup (€250K+) or established Italian company (€500K+)","Government approval issued before investment is made","€300,000 flat tax on foreign income for qualifying new tax residents","Permanent residency eligibility after 5 years","Citizenship eligibility after 10 years of qualifying residence"],
    ideal: "Business operators, HNW families seeking a European lifestyle base",
    note: "⚠ Combining investment routes is not permitted. Family inclusion for adult children and parents is subject to strict dependency conditions." },
  { name: "Hungary", link: "/hungary-golden-visa", badge: "EU · Schengen",
    overview: "Launched in July 2024, Hungary's Guest Investor Programme offers a 10-year EU residence permit through defined investment routes. With no minimum stay and a structured pre-approval visa, it suits investors seeking long-term EU residency with minimal administrative burden.",
    specs: [["Investment from","€250,000 (RE investment fund)"],["Processing","Approx. 5+ months"],["Validity","10 years (one further renewal)"],["Family Inclusion","Spouse, children <18 & dependent parents"]],
    benefits: ["Two routes: €250,000 in approved RE investment fund (5-yr hold) or €1,000,000 donation to public trust","Guest Investor Visa issued first — investment completed after entry","10-year permit: among the longest in EU residency-by-investment","Schengen travel rights across member states","PR eligibility after 3 years of continuous residence; citizenship after 11 years total"],
    ideal: "Investors prioritising long-term EU stability with minimal renewal obligations",
    note: "⚠ Direct residential property purchase is not a qualifying route. Only approved fund certificates and public trust donations qualify." },
  { name: "UAE", link: "/uae-golden-visa", badge: "Tax-Efficient · 10-Year Residency",
    overview: "The UAE Golden Visa is a long-term renewable residency programme granting up to 10 years of residency with zero personal income tax, world-class infrastructure, and a global gateway connecting East and West.",
    specs: [["Investment from","AED 750,000 (2-yr) or AED 2M (10-yr)"],["Processing","Approx. 2–3 months"],["Validity","2 or 10 years (renewable)"],["Family Inclusion","Spouse + unmarried children"]],
    benefits: ["Zero personal income tax — internationally recognised benefit","Mortgaged and off-plan properties qualify based on DLD-certified total value","Sponsor domestic household staff under your residency","World-class international schools, hospitals, and business infrastructure","Under 3-hour flight from all major Indian cities"],
    ideal: "Business owners, HNW individuals, and families seeking tax efficiency close to India",
    note: "⚠ UAE Golden Visa is renewable long-term residency — not permanent residency or citizenship. Periodic re-entry required to maintain status." },
  { name: "Panama", link: "/panama-golden-visa", badge: "Americas · Permanent Residency",
    overview: "Panama's Qualified Investor Programme grants immediate permanent residency through investment in real estate, Panamanian securities, or fixed-term bank deposits. Valued for its territorial tax system, swift processing, and Panama City's standing as a regional financial hub.",
    specs: [["Investment from","USD 300,000 (real estate)"],["Processing","30–90 days"],["Validity","Permanent Residency"],["Family Inclusion","Spouse, children & dependent parents"]],
    benefits: ["Territorial tax system — Panama does not tax foreign-sourced income","Immediate permanent residency upon approval — no temporary phase","Citizenship eligibility after 5 years, subject to legal requirements","Dollarised economy — financial stability and straightforward banking","Strategic gateway to North and South American markets"],
    ideal: "Business owners seeking an Americas base, tax-conscious investors",
    note: "⚠ Securities route: USD 500,000. Fixed-term bank deposit: USD 750,000. Investment thresholds set by executive decree and may be revised." },
  { name: "Latvia", link: "/latvia-golden-visa", badge: "EU · Schengen",
    overview: "Latvia's Residence by Investment programme offers a structured pathway to EU Schengen residency through business investment, real estate, or bank capital — with a clear pathway to permanent residency and eventual citizenship eligibility.",
    specs: [["Investment from","€50,000 (business) or €250,000 (RE)"],["Processing","2–3 months"],["Validity","5 years (card renewed annually)"],["Family Inclusion","Spouse + children under 18"]],
    benefits: ["Multiple qualifying routes: company investment, real estate, or bank subordinated bonds","No corporate income tax on reinvested profits","Schengen travel rights across 29 member states","PR eligibility after 5 years; citizenship after 10 years total","Business investment route requires meeting Latvian entity criteria"],
    ideal: "Entrepreneurs entering the EU market, investors seeking accessible Schengen residency",
    note: (<span style={{ color: "#000" }}>⚠ The 5-year permit is issued as a 1-year card renewed annually with a visit to Latvia. Latvia does not recognise dual citizenship for most nationalities.</span>) },
];

const TABLE_ROWS = [
  { country: "Portugal", eu: true, inv: "€500,000 (fund); €250,000 (cultural donation)", time: "12–36 months", validity: "2 yrs (renewable)", family: "Spouse, children to 26 & parents", citizenship: "7–10 years", tax: "NHR/IFICI regimes may apply" },
  { country: "Greece", eu: true, inv: "€800,000 (prime zones) / €400,000 (other regions)", time: "4–8 months", validity: "5 yrs (renewable)", family: "Spouse, children <21 & parents", citizenship: "7 years (continuous residence)", tax: "Standard Greek tax rules" },
  { country: "Italy", eu: true, inv: "€250,000 (startup) / €500,000 (company)", time: "3–6 months", validity: "2 yrs (→ PR at 5 yrs)", family: "Spouse; children & parents (conditions)", citizenship: "10 years", tax: "€300K flat tax on foreign income available" },
  { country: "Hungary", eu: true, inv: "€250,000 (RE fund) or €1,000,000 (public trust)", time: "5+ months", validity: "10 yrs (one renewal)", family: "Spouse, children <18 & dependent parents", citizenship: "11 years total", tax: "Standard Hungarian tax" },
  { country: "UAE", eu: false, inv: "AED 750,000+ (2-yr) / AED 2,000,000+ (10-yr)", time: "2–3 months", validity: "2 or 10 yrs (renewable)", family: "Spouse + unmarried children", citizenship: "Not via investment", tax: "Zero personal income tax" },
  { country: "Panama", eu: false, inv: "USD 300,000 (RE); USD 500,000 (securities)", time: "30–90 days", validity: "Permanent", family: "Spouse, children & dependent parents", citizenship: "5 years", tax: "Territorial — foreign income exempt", perm: true },
  { country: "Latvia", eu: true, inv: "€50K–€100K (business); €250K (RE); €280K (bonds)", time: "2–3 months", validity: "5 yrs (card renewed annually)", family: "Spouse + children under 18", citizenship: "10 years; dual citizenship limitations apply", tax: "No CIT on reinvested profits" },
];

const PILLARS = [
  { num: "01", title: "Strategic Planning", body: "Program selection matched to your financial profile, family structure, and long-term objectives — not generic recommendations." },
  { num: "02", title: "Documentation Mastery", body: "Rigorous document preparation and source of funds structuring — prepared to the standards of target country authorities." },
  { num: "03", title: "Investment Guidance", body: "Expert navigation of qualifying investment options — from regulated funds and real estate to business and bank instruments." },
  { num: "04", title: "Global Mobility Expertise", body: "End-to-end advisory covering Schengen strategy, tax considerations, and post-approval settlement support." },
];

const PROMISE = [
  "Personalised assessment before any program recommendation",
  "Accurate, current data — never estimates or outdated figures",
  "Compliance-led document preparation",
  "Transparent fee structure with no hidden costs",
  "Dedicated advisor assigned to every client engagement",
  "Post-approval support for travel, settlement, and renewals",
];

const JOURNEY = [
  { num: "01", title: "Assessment", body: "Profile review: financial position, family structure, mobility goals, and investment capacity — with full confidentiality." },
  { num: "02", title: "Strategy", body: "Program selection and investment structure recommendation — tailored, reasoned, and presented clearly." },
  { num: "03", title: "Documentation", body: "Preparation and verification of all supporting documents — source of funds, identity, family, and investment evidence." },
  { num: "04", title: "Investment", body: "Completion of qualifying investment — guided by our advisors and co-ordinated with approved investment partners." },
  { num: "05", title: "Application", body: "Formal submission to the relevant immigration authority, with active follow-up and status management throughout." },
  { num: "06", title: "Approval", body: "Residency permit issuance — followed by onboarding support for your new status, travel, banking, and renewal schedule." },
];

const FAQS = [
  { q: "Do I need to live in the country to maintain my Golden Visa?",
    a: "Requirements differ by programme. Portugal requires an average of just 7 days of physical presence per year. Greece imposes no minimum stay requirement to maintain the permit. Hungary's Guest Investor Programme similarly has no mandatory residency period. Italy has no stated minimum stay for basic permit renewal. Latvia requires an annual visit to renew the residence card. The UAE calls for periodic re-entry — typically once or twice a year. Panama requires a visit at least once every two years. Langma International will clarify each programme's exact presence requirements during your initial consultation." },
  { q: "Can my spouse and children be included on my application?",
    a: "Yes — all seven programs include family members under a single principal application. Eligible dependants typically include your legally married spouse and dependent children, with age thresholds varying by country. Portugal, Greece, Italy, Hungary, and Panama also allow dependent parents to join, generally subject to age or financial-dependency conditions. The UAE covers spouse and unmarried children, with parents requiring a separate sponsorship visa. Latvia's programme covers spouse and children under 18. Your advisor will confirm the exact family inclusion rules for your chosen program." },
  { q: "Is the investment refundable? What should I expect from performance?",
    a: "Investment structures and outcomes vary significantly by programme and route. Portugal's qualifying fund investments are typically structured as closed-end funds with defined maturity periods; capital recovery and performance depend entirely on the fund's strategy and market conditions — no returns are guaranteed. Latvia's real estate route generates rental income potential that varies with market conditions. Greece's property investment is a direct ownership asset with resale value subject to market cycles. UAE real estate has demonstrated strong capital appreciation in recent years, though past performance does not indicate future results. Langma International strongly recommends independent financial due diligence before committing capital to any qualifying investment vehicle." },
  { q: "How long does the entire process take from start to approval?",
    a: "Processing timelines vary considerably by programme. The UAE typically completes in around 2 to 3 months for well-documented property-based cases. Panama generally processes within 30 to 90 days. Hungary typically takes 5 or more months in total. Latvia typically completes within 2 to 3 months. Portugal currently requires 12 to 36 months due to application volumes and biometric scheduling. Greece typically runs 4 to 8 months. All timelines are indicative and subject to documentation completeness and government processing capacity." },
  { q: "Does a Golden Visa guarantee me a second passport?",
    a: "No programme in our portfolio offers automatic or guaranteed citizenship. Each programme instead grants a residency status that may qualify you to apply for citizenship after a defined period, provided you continue to meet legal requirements such as maintained residence, a clean record, and — in most cases — language or integration criteria. Indicative eligibility windows range from around 5 years (Portugal, Panama) to 7 years (Greece), 10 years (Latvia), and 11 years total (Hungary). The UAE Golden Visa does not currently offer a route to citizenship through investment. Latvia also does not recognise dual citizenship for most nationalities." },
];

const PROGRAM_OPTIONS = ["Select a program","Portugal Golden Visa","Greece Golden Visa","Italy Investor Visa","Hungary Guest Investor Programme","UAE Golden Visa","Panama Qualified Investor Programme","Latvia Golden Visa","Not sure — I need guidance"];
const TIME_SLOTS = ["10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];

/* ── FAQ ITEM ── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{q}</span>
        <span className={"faq-q__icon" + (open ? " open" : "")}>{open ? "−" : "+"}</span>
      </button>
      <p className={"faq-a" + (open ? " open" : "")}>{a}</p>
    </div>
  );
}

/* ── MAIN COMPONENT ── */
export default function GoldenVisaPage() {
  const rootRef = useRef(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", program: "", consult: "", date: "", time: TIME_SLOTS[0] });
  const [submitted, setSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "" });
  const [leadSent, setLeadSent] = useState(false);

  /* scroll reveal */
  useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return;
    const els = scope.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("is-visible")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleFormSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleLeadSubmit = e => {
    e.preventDefault();
    setLeadSent(true);
  };

  return (
    <div ref={rootRef}>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section className="gv-hero">
        <div className="gv-hero__inner">
          <div className="gv-hero__content">
            <div className="gv-hero__badge-pill">
              <span className="gv-hero__badge-dot" />
              <span>Langma International Golden Visa Advisory</span>
            </div>
            <div className="gv-hero__brand-row">
              <span className="gv-hero__brand-line" />
              <span>Langma International</span>
            </div>
            <h1>Where Capital <em>Opens</em><br/>Every Border</h1>
            <p className="gv-hero__sub">Seven curated residency-by-investment pathways across Europe, the Middle East and the Americas — structured around your family, your legacy, and your life.</p>
            <div className="gv-hero__ctas">
              <a href="#schedule" className="btn btn-gold">Schedule a Private Consultation</a>
              <a href="#programs" className="btn btn-ghost">Explore Programs ↓</a>
            </div>
            <div className="gv-hero__stats">
              {HERO_STATS.map(([num, label]) => (
                <div key={label}>
                  <span className="gv-hero__stat-num">{num}</span>
                  <span className="gv-hero__stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className="gv-hero__side-banner reveal">
            <div className="hero-info-graphic" aria-hidden="true">
              <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="40" width="80" height="130" rx="16" fill="rgba(47,199,161,.15)"/>
                <rect x="110" y="78" width="60" height="92" rx="12" fill="rgba(79,163,209,.18)"/>
                <rect x="188" y="110" width="42" height="60" rx="10" fill="rgba(41,97,102,.12)"/>
                <path d="M24 180C40 150 65 110 120 96C170 84 210 76 256 56" stroke="#2FC7A1" strokeWidth="8" strokeLinecap="round"/>
                <circle cx="256" cy="56" r="12" fill="#296166"/>
                <circle cx="228" cy="74" r="8" fill="#4FA3D1"/>
                <path d="M54 30L84 10L94 30" stroke="#296166" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M84 10V55" stroke="#296166" strokeWidth="4" strokeLinecap="round"/>
                <path d="M42 50H112" stroke="#296166" strokeWidth="3" strokeLinecap="round" opacity=".5"/>
                <path d="M42 66H112" stroke="#296166" strokeWidth="3" strokeLinecap="round" opacity=".5"/>
                <path d="M42 82H112" stroke="#296166" strokeWidth="3" strokeLinecap="round" opacity=".5"/>
                <path d="M42 98H112" stroke="#296166" strokeWidth="3" strokeLinecap="round" opacity=".5"/>
              </svg>
            </div>
            <span className="eyebrow">Residency Intelligence</span>
            <h3>Data-led insight for global investors</h3>
            <ul className="hero-info-list">
              <li><strong>7 curated programs</strong> across EU, Gulf and Americas</li>
              <li><strong>Family-inclusive</strong> residency planning with clarity</li>
              <li><strong>Quick comparative insight</strong> for high-value decisions</li>
            </ul>
            <a href="#compare" className="btn btn-outline">View Program Intelligence</a>
          </aside>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="section trust-strip" style={{ padding: "72px 40px" }}>
        <div className="container">
          <div className="trust-grid">
            {TRUST.map(t => (
              <div key={t.num} className="trust-block reveal">
                <span className="trust-block__icon">{t.icon}</span>
                <span className="trust-block__num">{t.num}</span>
                <span className="trust-block__label">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY GOLDEN VISAS ── */}
      <section className="section section--ivory2" id="programs">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">The Investor Advantage</span>
            <h2 className="section-title">Why Discerning Investors<br/>Pursue <em>Residency by Investment</em></h2>
            <p className="section-sub">A Golden Visa is not merely a document. For India's global families, it is the architecture of an expanded life — built around freedom, security, and strategic optionality.</p>
          </div>
          <div className="why-grid">
            {WHY.map(c => (
              <div key={c.title} className="why-card reveal">
                <div className="why-card__icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COUNTRY CARDS ── */}
      <section className="section section--navy">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">The Langma International Portfolio</span>
            <h2 className="section-title">Seven <em>Exceptional</em> Pathways</h2>
            <p className="section-sub">Each program is verified against official government sources. Every figure reflects current program parameters as of mid-2026.</p>
          </div>
          <div className="countries-grid">
            {COUNTRIES.map(c => (
              <article key={c.name} className="cc reveal">
                <div className="cc__header">
                  <span className="cc__badge">{c.badge}</span>
                </div>
                <h3>{c.name}</h3>
                <p className="cc__overview">{c.overview}</p>
                <div className="cc__specs">
                  {c.specs.map(([label, val]) => (
                    <div key={label} className="cc__spec">
                      <span className="cc__spec-label">{label}</span>
                      <span className="cc__spec-value">{val}</span>
                    </div>
                  ))}
                </div>
                <ul className="cc__benefits">
                  {c.benefits.map(b => <li key={b}>{b}</li>)}
                </ul>
                <div className="cc__footer">
                  <p className="cc__ideal"><em>Ideal for:</em> {c.ideal}</p>
                  <p className="cc__note">{c.note}</p>
                  <Link to={c.link} className="cc__cta">Learn More →</Link>
                </div>
              </article>
            ))}
            {/* Placeholder card */}
            <article className="cc cc--placeholder reveal">
              <p className="emoji">🌍</p>
              <h3>Not Sure Where to Begin?</h3>
              <p className="desc">Every investor's circumstances are different. Our advisors match your profile to the most suitable program — no pressure, no rush.</p>
              <Link to="/golden-visa-assessment" className="btn btn-gold">Book a Free Assessment</Link>
            </article>
          </div>
        </div>
      </section>
      {/* ── COMPARISON TABLE ── */}
      <section className="section section--white" id="compare">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Program Intelligence</span>
            <h2 className="section-title">Side-by-Side <em>Comparison</em></h2>
            <p className="section-sub">A structured overview of all seven programs to help you identify the best fit at a glance. Data verified from official government sources as of June 2026.</p>
          </div>
          <div className="comparison-wrap reveal">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Min. Investment</th>
                  <th>Processing</th>
                  <th>Validity</th>
                  <th>Family</th>
                  <th>Citizenship Path</th>
                  <th>Tax Note</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(r => (
                  <tr key={r.country}>
                    <td data-label="Country">{r.country}{r.eu && <span className="tag tag-eu">EU</span>}{r.perm && <span className="tag tag-perm">PR</span>}</td>
                    <td data-label="Min. Investment">{r.inv}</td>
                    <td data-label="Processing">{r.time}</td>
                    <td data-label="Validity">{r.validity}</td>
                    <td data-label="Family">{r.family}</td>
                    <td data-label="Citizenship Path">{r.citizenship}</td>
                    <td data-label="Tax Note">{r.tax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="comparison-note reveal">⚠ Program parameters are subject to legislative change. All thresholds represent minimum investment amounts and may be higher depending on zone, category, or current government policy. Langma International recommends scheduling a consultation before initiating any application.</p>
        </div>
      </section>

      {/* ── WHY LANGMA ── */}
      <section className="section section--ivory2" id="about">
        <div className="container">
          <div className="langma-grid">
            <div>
              <span className="eyebrow">About Langma International</span>
              <h2 className="section-title">Advisory That Belongs<br/>in a <em>Different League</em></h2>
              <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: 12 }}>Langma International Golden Visa advisory is built on one principle: your investment migration decision deserves the same rigour as any major financial commitment. We do not sell programs. We build strategies.</p>
              <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.75 }}>From the first consultation to the day your residency permit arrives, every stage is managed with precision, discretion, and personalised attention — by advisors who understand both Indian wealth profiles and international regulatory frameworks.</p>
              <div className="langma-pillars">
                {PILLARS.map(p => (
                  <div key={p.num} className="pillar reveal">
                    <div className="pillar__num">{p.num}</div>
                    <h4>{p.title}</h4>
                    <p>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="langma-promise reveal">
                <h3>The Langma Standard</h3>
                <p>We understand that Indian investors considering global residency face a landscape crowded with well-meaning generalists. Langma International offers something different: depth of program knowledge, honesty about timelines and risks, and complete transparency on costs.</p>
                <p>Our advisors have direct experience navigating the documentation requirements, investment structures, and government processes across all seven programs in our portfolio.</p>
                <ul className="promise-list">
                  {PROMISE.map(p => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section className="section schedule-section" id="schedule">
        <div className="schedule-bg" />
        <div className="container">
          <div className="schedule-grid">
           <GoldenVisaForm />
            <div className="schedule-info">
              <h3>Meet Our Advisors.<br/><em>In Person or Virtually.</em></h3>
              <p>A residency-by-investment decision deserves a real conversation — not a contact form and an inbox. Our advisors combine deep program knowledge with a clear understanding of Indian investors' financial structures, family goals, and global ambitions.</p>
              <ul className="branch-list">
                <li className="branch-item">
                  <div className="branch-icon">🏙️</div>
                  <div>
                    <span className="branch-name">New Delhi — Head Office</span>
                    <span className="branch-addr">E-73 Part 1, South Extension I, Block E, New Delhi, Delhi 110049 · +91 98101 17094</span>
                  </div>
                </li>
                <li className="branch-item">
                  <div className="branch-icon">💻</div>
                  <div>
                    <span className="branch-name">Virtual Consultation</span>
                    <span className="branch-addr">Secure Video Consultation — Global Access</span>
                  </div>
                </li>
              </ul>
              <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://wa.me/919810117094" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 0 0 3.6 17.4L2 22l4.7-1.6a11 11 0 0 0 16.3-9.5c0-2.9-1.1-5.7-3.2-7.8Zm-8.5 16.8a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.4 1.1 1.1-3.3-.2-.3a9.2 9.2 0 1 1 7.4 4Zm5-6.9c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.6 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z"/></svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section className="section section--white" id="journey">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Your Pathway with Langma International</span>
            <h2 className="section-title">From First Conversation<br/>to <em>Residency Approval</em></h2>
            <p className="section-sub">A transparent, structured process — six clearly defined stages, each managed by your dedicated Langma International advisor.</p>
          </div>
          <div className="journey-steps">
            {JOURNEY.map(j => (
              <div key={j.num} className="journey-step reveal">
                <div className="journey-step__circle">{j.num}</div>
                <h4>{j.title}</h4>
                <p>{j.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section section--ivory2" id="faq">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Investor Questions</span>
            <h2 className="section-title" style={{ textAlign: "center" }}>What Investors Ask</h2>
            <p className="section-sub" style={{ margin: "16px auto 0" }}>The five questions we hear most from qualified Indian investors — answered with the precision you deserve.</p>
          </div>
          <div className="faq-list reveal">
            {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── LEAD CAPTURE ── */}
      <section className="section lead-section">
        <div className="lead-glow" />
        <div className="container">
          <div className="lead-inner">
            <span className="eyebrow">Begin Here</span>
            <h2 className="section-title" style={{ textAlign: "center", marginTop: 8 }}>Your Second Country<br/><em>Starts with One Conversation</em></h2>
            {!leadSent ? (
              <>
                <p className="body" style={{ marginTop: 20 }}>Leave your details and a Langma International Golden Visa advisor will contact you — privately, professionally, and without obligation.</p>
                <Goldenvisaform2 />
                <p className="lead-disclaimer">Your information is treated with complete discretion. Langma International does not share client data with third parties.</p>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <p style={{ fontSize: 40, marginBottom: 12 }}>✅</p>
                <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.7 }}>Thank you, <b style={{ color: "var(--teal)" }}>{leadForm.name}</b>. Our advisor will be in touch with you shortly.</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}