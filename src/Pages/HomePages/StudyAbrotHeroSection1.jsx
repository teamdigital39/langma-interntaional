import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import Studyform from "./Studyform";

/*
  Langma International — Study Abroad landing page (React / JSX)
  Theme: teal #296166 (headings + dark sections), deep navy #1A2540 (CTAs +
  gradient depth), mint #2FC7A1 (accent), sky #4FA3D1 (secondary
  glow), cooled ivory tints + neutral gray body text.
  Typography: Fraunces (display) + Inter (body).
*/

const CSS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700;800&display=swap');

/* ===================== TOKENS ===================== */
:root{
  --teal:#296166;
  --teal-deep:#1A2540;
  --teal-soft:#174C4A;
  --teal-line:rgba(47,199,161,.22);
  --mint:#2FC7A1;
  --mint-light:#6FE0C6;
  --sky:#4FA3D1;
  --mint-dim:rgba(47,199,161,.12);
  --ivory:#F5F8F6;
  --ivory-2:#E9F1EE;
  --white:#FFFFFF;
  --ink:#1B2B28;
  --ink-soft:#4C5C58;
  --ink-faint:#7E8C88;
  --shadow-lg:0 30px 70px -30px rgba(6,40,37,.55);
  --shadow-sm:0 10px 30px -15px rgba(6,40,37,.35);
  --radius-lg:22px;
  --radius-md:14px;
  --radius-sm:8px;
  --font-display:'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --container:1240px;
}

*,*::before,*::after{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  margin:0;
  font-family:var(--font-body);
  color:var(--ink);
  background:var(--white);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  line-height:1.55;
}
img{max-width:100%;display:block;}
a{color:inherit;text-decoration:none;}
ul{margin:0;padding:0;list-style:none;}
button{font-family:inherit;cursor:pointer;}
h1,h2,h3,h4{margin:0;font-family:var(--font-display);font-weight:600;color:var(--teal);letter-spacing:-0.01em;}
p{margin:0;}
.container{max-width:var(--container);margin:0 auto;padding:0 28px;}

@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto;}
  *{animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important;}
}

:focus-visible{outline:2px solid var(--mint);outline-offset:3px;}

/* ===================== UTILITIES ===================== */
.eyebrow{
  display:inline-flex;align-items:center;gap:10px;
  font-family:var(--font-body);font-weight:600;font-size:12px;letter-spacing:.16em;text-transform:uppercase;
  color:var(--mint);
}
.eyebrow::before{content:"";width:24px;height:1px;background:var(--mint);display:inline-block;}
.eyebrow--dark{color:var(--mint-light);}

.section{padding:60px 0;}
#booking{padding-top:0;}
.section--tight{padding:44px 0;}
.section--teal{background:var(--teal);color:var(--ivory);}
.section--teal h2,.section--teal h3,.section--teal h4{color:var(--white);}
.section--ivory2{background:var(--ivory-2);}
.section--white{background:var(--white);}
.section-head{max-width:720px;margin-bottom:32px;}
.section-head.center{margin-left:auto;margin-right:auto;text-align:center;}
.section-title{font-size:clamp(30px,3.6vw,46px);line-height:1.08;margin-top:14px;}
.section-sub{margin-top:18px;font-size:17px;color:var(--ink-soft);line-height:1.65;}
.section--teal .section-sub{color:rgba(248,246,242,.72);}

.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  padding:16px 30px;border-radius:999px;font-weight:600;font-size:15px;
  border:1px solid transparent;transition:transform .25s ease, box-shadow .25s ease, background .25s ease, color .25s ease, border-color .25s ease;
  white-space:nowrap;
}
.btn-primary{background:#1A2540;color:#F5F2EC;box-shadow:var(--shadow-sm);}
.btn-primary:hover{background:#243160;transform:translateY(-2px);box-shadow:0 18px 36px -14px rgba(26,37,64,.28);}
.btn-ghost-light{background:#fff;color:#1A2540;border:2px solid #2FC7A1;}
.btn-ghost-light:hover{background:#E6F8F3;border-color:#2FC7A1;color:#1A2540;transform:translateY(-2px);}
.btn-sky{background:#4FA3D1;color:#fff;}
.btn-sky:hover{background:#3a8ab8;transform:translateY(-2px);box-shadow:0 18px 36px -14px rgba(79,163,209,.45);}
.btn-outline-navy{border-color:rgba(10,55,50,.25);color:var(--teal);}
.btn-outline-navy:hover{border-color:var(--teal);transform:translateY(-2px);}
.btn-whatsapp{background:#1FAE5C;color:#fff;}
.btn-whatsapp:hover{transform:translateY(-2px);box-shadow:0 18px 36px -14px rgba(31,174,92,.5);}
.btn-block{width:100%;}

/* Responsive assessment CTA button */
#global-mobility-assessment-cta .btn {
  width:100%;
  max-width:680px;
  white-space:normal;
}
#global-mobility-assessment-cta .btn:hover{transform:none;}

@media (max-width:760px){
  #global-mobility-assessment-cta .btn{font-size:15px; padding:14px 20px;}
}
@media (max-width:520px){
  #global-mobility-assessment-cta .section-head{padding:0 8px;}
  #global-mobility-assessment-cta .section-title{font-size:28px;}
}

.btn[disabled]{opacity:.45;cursor:not-allowed;transform:none !important;}

.chip{
  display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;
  font-size:13px;font-weight:600;background:var(--mint-dim);color:var(--teal);
  border:1px solid var(--teal-line);
}
.chip--light{background:rgba(248,246,242,.08);color:var(--ivory);border-color:rgba(248,246,242,.18);}

/* Passport stamp signature element */
.stamp{
  position:relative;
  width:104px;height:104px;border-radius:50%;
  border:1.5px dashed rgba(47,199,161,.55);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;flex-shrink:0;
  background:radial-gradient(circle at 50% 50%, rgba(47,199,161,.08), transparent 70%);
}
.stamp::before{
  content:"";position:absolute;inset:6px;border-radius:50%;border:1px solid rgba(47,199,161,.3);
}
.stamp__code{font-family:var(--font-display);font-weight:700;font-size:22px;color:var(--mint);letter-spacing:.04em;}
.stamp__label{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--mint-light);margin-top:2px;}

.reveal{opacity:0;transform:translateY(18px);transition:opacity .7s ease, transform .7s ease;}
.reveal.is-visible{opacity:1;transform:translateY(0);}

.skip-link{position:absolute;left:-999px;top:0;background:var(--mint);color:var(--teal);padding:12px 18px;border-radius:0 0 10px 0;font-weight:700;z-index:999;}
.skip-link:focus{left:0;}

/* ===================== NAV ===================== */
.nav{
  position:sticky;top:0;z-index:80;
  background:rgba(10,55,50,.92);backdrop-filter:blur(14px);
  border-bottom:1px solid rgba(47,199,161,.18);
}
.nav__inner{display:flex;align-items:center;justify-content:space-between;padding:16px 28px;max-width:var(--container);margin:0 auto;}
.nav__logo{display:flex;flex-direction:column;line-height:1;color:var(--white);}
.nav__logo b{font-family:var(--font-display);font-size:21px;letter-spacing:.03em;font-weight:600;}
.nav__logo span{font-size:9px;letter-spacing:.28em;color:var(--mint-light);margin-top:4px;}
.nav__links{display:flex;align-items:center;gap:34px;}
.nav__links a{font-size:14px;font-weight:500;color:rgba(248,246,242,.82);transition:color .2s ease;}
.nav__links a:hover{color:var(--mint-light);}
.nav__cta{display:flex;align-items:center;gap:14px;}
.nav__cta .btn{padding:12px 22px;font-size:13.5px;}
.nav__toggle{display:none;background:none;border:none;color:var(--white);font-size:24px;line-height:1;padding:4px;}

@media (max-width:980px){
  .nav__links{position:fixed;top:68px;left:0;right:0;background:var(--teal);flex-direction:column;align-items:flex-start;gap:0;
    padding:6px 28px 18px;border-bottom:1px solid rgba(47,199,161,.18);
    transform:translateY(-12px);opacity:0;pointer-events:none;transition:all .25s ease;}
  .nav__links.open{transform:translateY(0);opacity:1;pointer-events:auto;}
  .nav__links a{width:100%;padding:13px 0;border-bottom:1px solid rgba(248,246,242,.07);}
  .nav__toggle{display:block;}
  .nav__cta .btn-ghost-light{display:none;}
}

/* ===================== HERO ===================== */
.hero{
  position:relative;overflow:hidden;
  background:#FFFFFF;
  color:var(--ink);
  padding:72px 0 56px;
}
.hero::before{
  content:"";position:absolute;left:28px;top:72px;bottom:56px;width:3px;border-radius:999px;
  background:linear-gradient(to bottom,transparent,var(--mint),transparent);
  opacity:.9;pointer-events:none;
}
.hero__flightpath{display:none;}
.hero__inner{position:relative;z-index:2;max-width:var(--container);margin:0 auto;padding:0 28px;display:grid;grid-template-columns:1.15fr .85fr;gap:48px;align-items:center;}
.hero__copy{max-width:640px;padding-left:18px;}
.hero__eyebrow-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:20px;}
.hero__badge-pill{
  display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(47,199,161,.4);
  border-radius:999px;padding:6px 14px;
}
.hero__badge-dot{width:6px;height:6px;border-radius:50%;background:var(--mint);flex-shrink:0;}
.hero__badge-pill span:last-child{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--mint);}
.hero__brand-row{display:flex;align-items:center;gap:8px;margin-bottom:22px;}
.hero__brand-line{width:28px;height:1.5px;background:var(--teal);display:block;}
.hero__brand-row span:last-child{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--teal);font-weight:500;}
.hero h1{font-size:clamp(34px,5vw,56px);line-height:1.08;font-weight:700;color:#111827;}
.hero h1 em{font-style:italic;color:var(--sky);font-weight:700;}
.hero__sub{margin-top:22px;font-size:17px;line-height:1.7;color:var(--ink-soft);max-width:560px;}
.hero__trust{margin-top:16px;font-size:14.5px;color:var(--ink-faint);max-width:560px;}
.hero__ctas{display:flex;gap:14px;margin-top:32px;flex-wrap:wrap;}
.hero__micro{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px;padding-top:24px;border-top:1px solid #D8E0EC;}
.hero__micro span{font-size:12.5px;color:var(--ink-faint);display:inline-flex;align-items:center;gap:6px;}
.hero__micro span::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--mint);}

.hero__panel{
  position:relative;background:var(--ivory);border:1px solid rgba(47,199,161,.2);
  border-radius:var(--radius-lg);padding:30px;
}
.hero__panel-title{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mint);font-weight:600;margin-bottom:18px;}
.hero__flags{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:26px;}
.hero__flags .chip--light{padding:7px 13px;font-size:12px;background:var(--mint-dim);color:var(--teal);border-color:var(--teal-line);}
.hero__stats{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;}
.hero__stat b{display:block;font-family:var(--font-display);font-size:28px;color:var(--teal);font-weight:600;}
.hero__stat span{display:block;font-size:12px;color:var(--ink-faint);margin-top:4px;}

@media (max-width:980px){
  .hero__inner{grid-template-columns:1fr;}
  .hero{padding:64px 0 48px;}
  .hero::before{left:18px;top:64px;bottom:48px;}
}

/* ===================== WHY CARDS ===================== */
.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;}
.why-card{
  background:var(--white);border:1px solid rgba(10,55,50,.06);border-radius:var(--radius-lg);
  padding:34px 30px;transition:transform .3s ease, box-shadow .3s ease, border-color .3s ease;
}
.why-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg);border-color:rgba(47,199,161,.35);}
.why-card__icon{
  width:52px;height:52px;border-radius:14px;background:var(--mint-dim);
  display:flex;align-items:center;justify-content:center;margin-bottom:22px;
}
.why-card__icon svg{width:24px;height:24px;stroke:var(--teal);}
.why-card h3{font-size:20px;font-weight:600;}
.why-card p{margin-top:12px;color:var(--ink-soft);font-size:15px;line-height:1.65;}

@media (max-width:900px){.why-grid{grid-template-columns:1fr 1fr;}}
@media (max-width:620px){.why-grid{grid-template-columns:1fr;}}

/* ===================== DESTINATIONS ===================== */
.dest-toolbar{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;margin-bottom:42px;}
.dest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;}
.dest-card{
  position:relative;background:var(--teal);border-radius:var(--radius-lg);padding:32px 28px;
  color:var(--ivory);overflow:hidden;border:1px solid rgba(47,199,161,.18);
  transition:transform .35s ease, box-shadow .35s ease;
}
.dest-card:hover{transform:translateY(-7px);box-shadow:0 30px 60px -22px rgba(6,40,37,.6);}
.dest-card::after{
  content:"";position:absolute;right:-40px;top:-40px;width:160px;height:160px;border-radius:50%;
  background:radial-gradient(circle, rgba(47,199,161,.14), transparent 70%);
}
.dest-card__top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:22px;position:relative;z-index:1;}
.dest-card__code{
  font-family:var(--font-display);font-size:13px;font-weight:700;letter-spacing:.12em;color:var(--mint-light);
  border:1px solid rgba(47,199,161,.4);padding:6px 11px;border-radius:999px;
}
.dest-card h3{color:var(--white);font-size:24px;margin-top:2px;}
.dest-card__position{font-size:13px;color:var(--mint-light);font-weight:600;letter-spacing:.02em;margin-top:4px;}
.dest-card p.dest-blurb{font-size:14.5px;color:rgba(248,246,242,.72);margin-top:14px;line-height:1.65;position:relative;z-index:1;}
.dest-card__stats{display:flex;flex-direction:column;gap:9px;margin-top:20px;position:relative;z-index:1;}
.dest-card__stats li{display:flex;align-items:center;gap:9px;font-size:13px;color:rgba(248,246,242,.85);}
.dest-card__stats li::before{content:"";width:6px;height:6px;border-radius:1px;background:var(--mint);transform:rotate(45deg);flex-shrink:0;}
.dest-card__cta{
  display:inline-flex;align-items:center;gap:8px;margin-top:24px;font-size:13.5px;font-weight:600;color:var(--mint-light);
  position:relative;z-index:1;
}
.dest-card__cta svg{width:14px;height:14px;transition:transform .25s ease;}
.dest-card:hover .dest-card__cta svg{transform:translateX(4px);}

.dest-card--more{
  background:linear-gradient(150deg, var(--mint-dim), transparent 60%), var(--white);
  color:var(--teal);border:1px dashed rgba(47,199,161,.55);
  display:flex;flex-direction:column;justify-content:center;align-items:flex-start;
}
.dest-card--more h3{color:var(--teal);}
.dest-card--more .dest-card__position{color:#296166;}
.dest-card--more p.dest-blurb{color:var(--ink-soft);}
.dest-card--more .dest-card__cta{color:#296166;}

@media (max-width:1020px){.dest-grid{grid-template-columns:1fr 1fr;}}
@media (max-width:640px){.dest-grid{grid-template-columns:1fr;}}

/* ===================== PROGRAMS ===================== */
.programs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.program-card{
  background:var(--white);border:1px solid rgba(10,55,50,.07);border-radius:var(--radius-md);
  padding:24px 22px;transition:border-color .25s ease, transform .25s ease;
}
.program-card:hover{transform:translateY(-4px);border-color:var(--mint);}
.program-card .ptag{font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--mint);font-weight:700;}
.program-card h4{font-size:17px;margin-top:10px;font-weight:600;}
.program-card p{font-size:13.5px;color:var(--ink-soft);margin-top:8px;line-height:1.55;}

@media (max-width:980px){.programs-grid{grid-template-columns:repeat(2,1fr);}}
@media (max-width:560px){.programs-grid{grid-template-columns:1fr;}}

/* ===================== ADVANTAGE ===================== */
.advantage-wrap{display:grid;grid-template-columns:1fr 1fr;gap:0;border-radius:var(--radius-lg);overflow:hidden;border:1px solid rgba(47,199,161,.2);}
.advantage-col{padding:44px 38px;}
.advantage-col--typical{background:var(--ivory-2);}
.advantage-col--langma{background:var(--mint-dim);color:var(--ink);}
.advantage-col h3{font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:26px;}
.advantage-col--typical h3{color:var(--ink-faint);}
.advantage-col--langma h3{color:var(--teal);}
.advantage-row{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid rgba(10,55,50,.08);font-size:14.5px;}
.advantage-col--langma .advantage-row{border-bottom:1px solid rgba(41,97,102,.08);}
.advantage-row:last-child{border-bottom:none;}
.advantage-row svg{width:18px;height:18px;flex-shrink:0;margin-top:2px;}
.advantage-col--typical svg{stroke:#B7405A;}
.advantage-col--langma svg{stroke:var(--teal);}
.advantage-col--typical .advantage-row{color:var(--ink-soft);}
.advantage-col--langma .advantage-row{color:var(--ink-soft);}

@media (max-width:860px){.advantage-wrap{grid-template-columns:1fr;}}

/* ===================== JOURNEY ===================== */
.journey{position:relative;max-width:880px;margin:0 auto;}
.journey__line{position:absolute;left:27px;top:10px;bottom:10px;width:1px;background:linear-gradient(180deg, rgba(47,199,161,.5), rgba(47,199,161,.05));}
.journey-step{display:grid;grid-template-columns:56px 1fr;gap:26px;padding-bottom:48px;position:relative;}
.journey-step:last-child{padding-bottom:0;}
.journey-step__num{
  width:56px;height:56px;border-radius:50%;background:var(--mint-dim);color:var(--teal);
  display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:600;font-size:18px;
  border:1px solid rgba(47,199,161,.35);position:relative;z-index:1;flex-shrink:0;
}
.journey-step__body h3{font-size:21px;}
.journey-step__body p{margin-top:10px;color:var(--ink-soft);font-size:15px;line-height:1.65;max-width:620px;}
.journey-step__tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;}
.journey-step__tags span{font-size:12px;background:var(--mint-dim);color:var(--teal);padding:5px 11px;border-radius:999px;font-weight:600;}

@media (max-width:600px){
  .journey__line{left:21px;}
  .journey-step{grid-template-columns:44px 1fr;gap:18px;}
  .journey-step__num{width:44px;height:44px;font-size:15px;}
}

/* ===================== TRUST ===================== */
.trust-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.trust-card{background:var(--white);padding:34px 30px;border:1px solid rgba(41,97,102,.1);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);}
.trust-card h3{color:var(--teal);font-size:18px;display:flex;align-items:center;gap:10px;}
.trust-card h3 svg{width:18px;height:18px;stroke:var(--mint);flex-shrink:0;}
.trust-card p{margin-top:12px;color:var(--ink-soft);font-size:14px;line-height:1.6;}
.trust-note{margin-top:34px;font-size:13px;color:var(--ink-soft);line-height:1.8;max-width:760px;padding:22px 26px;border-radius:20px;background:var(--mint-dim);border-left:4px solid var(--mint);font-weight:500;}

@media (max-width:900px){.trust-grid{grid-template-columns:1fr 1fr;}}
@media (max-width:600px){.trust-grid{grid-template-columns:1fr;}}

/* ===================== FINAL CTA ===================== */
.final-cta{
  background:var(--white);border:1px solid rgba(47,199,161,.22);
  border-radius:var(--radius-lg);padding:64px 56px;text-align:center;color:var(--ink);
  position:relative;overflow:hidden;box-shadow:var(--shadow-sm);
}
.final-cta::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 0%, rgba(47,199,161,.08), transparent 60%);pointer-events:none;}
.final-cta__inner{position:relative;z-index:1;max-width:700px;margin:0 auto;}
.final-cta h2{color:#111827;font-size:clamp(28px,4vw,42px);}
.final-cta p{margin-top:16px;color:var(--ink-soft);font-size:16.5px;}
.final-cta__ctas{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:34px;}
.final-cta__micro{margin-top:22px;font-size:13px;color:var(--ink-faint);}

@media (max-width:640px){.final-cta{padding:48px 26px;}}

/* ===================== BOOKING / OFFICE VISIT ===================== */
.booking{display:grid;grid-template-columns:.95fr 1.3fr;gap:36px;align-items:start;}
.booking-info{background:var(--white);border-radius:var(--radius-lg);padding:36px 32px;border:1px solid rgba(10,55,50,.07);}
.booking-info h3{font-size:21px;}
.booking-info p{margin-top:12px;color:var(--ink-soft);font-size:14.5px;line-height:1.65;}
.booking-info__list{margin-top:24px;display:flex;flex-direction:column;gap:18px;}
.booking-info__item{display:flex;gap:14px;align-items:flex-start;}
.booking-info__item svg{width:19px;height:19px;stroke:var(--mint);flex-shrink:0;margin-top:2px;}
.booking-info__item b{display:block;font-size:14px;color:var(--teal);}
.booking-info__item span{display:block;font-size:13.5px;color:var(--ink-soft);margin-top:2px;}

.booking-card{background:var(--white);border-radius:var(--radius-lg);padding:34px;border:1px solid rgba(10,55,50,.07);box-shadow:var(--shadow-sm);}
.mode-toggle{display:flex;gap:10px;background:var(--ivory-2);padding:6px;border-radius:999px;margin-bottom:28px;}
.mode-btn{flex:1;padding:11px 16px;border:none;background:transparent;border-radius:999px;font-weight:600;font-size:13.5px;color:var(--ink-soft);transition:all .25s ease;display:flex;align-items:center;justify-content:center;gap:8px;}
.mode-btn.active{background:#1A2540;color:var(--white);}

.cal{display:grid;grid-template-columns:1fr 1.4fr;gap:32px;}
.cal__nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.cal__nav button{background:var(--ivory-2);border:none;width:32px;height:32px;border-radius:8px;font-size:15px;color:var(--teal);}
.cal__nav button:hover{background:var(--mint-dim);}
.cal__month{font-family:var(--font-display);font-weight:600;font-size:16px;}
.cal__weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-faint);margin-bottom:6px;}
.cal__grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;}
.cal__day{
  aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;border-radius:9px;
  font-size:13px;background:none;border:1px solid transparent;color:var(--ink);
}
.cal__day.empty{visibility:hidden;}
.cal__day.disabled{color:#C9D0DA;cursor:not-allowed;}
.cal__day.available{cursor:pointer;border-color:rgba(10,55,50,.08);}
.cal__day.available:hover{border-color:var(--mint);}
.cal__day.today{font-weight:700;color:var(--teal);}
.cal__day.selected{background:#1A2540;color:var(--white) !important;border-color:#1A2540;}

.slots-title{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-faint);font-weight:700;margin-bottom:12px;}
.slots-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:9px;}
.slot-btn{padding:11px 10px;border-radius:9px;border:1px solid rgba(10,55,50,.1);background:var(--white);font-size:13px;font-weight:600;color:var(--ink);transition:all .2s ease;}
.slot-btn:hover{border-color:var(--mint);}
.slot-btn.selected{background:var(--mint);border-color:var(--mint);color:var(--teal-deep);}
.slots-empty{font-size:13px;color:var(--ink-faint);}

.booking-form{margin-top:28px;border-top:1px solid rgba(10,55,50,.08);padding-top:26px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;}
.field{display:flex;flex-direction:column;gap:6px;}
.field label{font-size:12.5px;font-weight:600;color:var(--ink-soft);}
.field input,.field select,.field textarea{
  padding:12px 14px;border-radius:9px;border:1px solid rgba(10,55,50,.14);font-family:inherit;font-size:14px;color:var(--ink);background:var(--white);
}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--mint);outline:none;}
.field.full{grid-column:1/-1;}
.selection-summary{display:flex;gap:10px;align-items:center;background:var(--ivory-2);border-radius:10px;padding:12px 16px;margin-bottom:18px;font-size:13.5px;color:var(--ink-soft);}
.selection-summary b{color:var(--teal);}
.selection-summary svg{width:16px;height:16px;stroke:var(--mint);flex-shrink:0;}

.confirm-panel{display:none;text-align:center;padding:30px 10px 6px;}
.confirm-panel.show{display:block;}
.confirm-icon{width:58px;height:58px;border-radius:50%;background:var(--mint-dim);display:flex;align-items:center;justify-content:center;margin:0 auto 18px;}
.confirm-icon svg{width:26px;height:26px;stroke:var(--mint);}
.confirm-panel h3{font-size:21px;}
.confirm-panel p{margin-top:10px;color:var(--ink-soft);font-size:14.5px;}
.confirm-detail{margin-top:18px;background:var(--ivory-2);border-radius:12px;padding:18px;text-align:left;font-size:13.5px;color:var(--ink-soft);}
.confirm-detail div{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(10,55,50,.06);}
.confirm-detail div:last-child{border-bottom:none;}
.confirm-detail b{color:var(--teal);}

@media (max-width:980px){
  .booking{grid-template-columns:1fr;}
  .cal{grid-template-columns:1fr;}
}
@media (max-width:520px){
  .form-row{grid-template-columns:1fr;}
}

/* ===================== FOOTER ===================== */
.footer{background:#04332F;color:rgba(248,246,242,.65);padding:64px 0 26px;}
.footer__top{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.2fr;gap:40px;padding-bottom:44px;border-bottom:1px solid rgba(248,246,242,.08);}
.footer__brand b{font-family:var(--font-display);font-size:22px;color:var(--white);}
.footer__brand p{margin-top:14px;font-size:14px;line-height:1.65;max-width:280px;}
.footer__social{display:flex;gap:10px;margin-top:20px;}
.footer__social a{width:36px;height:36px;border-radius:50%;border:1px solid rgba(248,246,242,.18);display:flex;align-items:center;justify-content:center;transition:border-color .2s ease;}
.footer__social a:hover{border-color:var(--mint);}
.footer__social svg{width:15px;height:15px;stroke:rgba(248,246,242,.8);}
.footer h4{color:var(--white);font-size:13px;letter-spacing:.08em;text-transform:uppercase;font-family:var(--font-body);font-weight:700;margin-bottom:18px;}
.footer ul li{margin-bottom:11px;font-size:14px;}
.footer ul li a:hover{color:var(--mint-light);}
.footer__bottom{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;padding-top:24px;font-size:12.5px;color:rgba(248,246,242,.4);}
.footer__disclaimer{font-size:12px;color:rgba(248,246,242,.4);line-height:1.7;padding-top:24px;max-width:980px;}

@media (max-width:900px){
  .footer__top{grid-template-columns:1fr 1fr;row-gap:36px;}
}
@media (max-width:560px){
  .footer__top{grid-template-columns:1fr;}
}

/* ===================== COUNTRY SLIDER ===================== */
.cslider-section .section-head{margin-bottom:14px;}
.cslider{position:relative;margin-top:18px;}
.cslider__viewport{overflow:hidden;}
.cslider__track{display:flex;transition:transform .6s cubic-bezier(.4,0,.2,1);will-change:transform;}
.cslider__slide{padding:12px;box-sizing:border-box;}
.country-card{height:100%;display:flex;flex-direction:column;background:var(--white);border:1px solid rgba(10,55,50,.08);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-sm);transition:transform .4s ease,box-shadow .4s ease;}
.country-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg);}
.country-card__head{position:relative;height:108px;background:linear-gradient(135deg,var(--ivory),var(--mint-dim));display:flex;align-items:flex-end;justify-content:center;}
.country-card__label{position:absolute;top:13px;left:18px;color:var(--teal);font-size:12px;font-weight:600;letter-spacing:.05em;}
.country-card__flag{position:absolute;bottom:-30px;width:70px;height:70px;border-radius:50%;overflow:hidden;border:4px solid var(--white);box-shadow:var(--shadow-sm);background:var(--white);}
.country-card__flag img{width:100%;height:100%;object-fit:cover;display:block;}
.country-card__body{padding:48px 22px 24px;text-align:center;display:flex;flex-direction:column;flex:1;}
.country-card__body h3{font-family:var(--font-display);font-size:23px;font-weight:600;color:var(--teal);margin:0 0 9px;}
.country-card__body p{font-size:14.5px;color:var(--ink-soft);line-height:1.55;flex:1;margin:0 0 18px;}
.country-card__cta{width:100%;justify-content:center;}
.cslider__arrow{position:absolute;top:46%;transform:translateY(-50%);width:50px;height:50px;border-radius:50%;background:var(--white);border:2px solid var(--mint);color:var(--teal);font-size:22px;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:var(--shadow-sm);transition:background .3s ease,color .3s ease;z-index:4;}
.cslider__arrow:hover{background:var(--mint);color:var(--white);}
.cslider__arrow--prev{left:-10px;}
.cslider__arrow--next{right:-10px;}
.cslider__dots{display:flex;justify-content:center;gap:9px;margin-top:28px;}
.cslider__dot{width:9px;height:9px;border-radius:50%;border:none;background:rgba(10,55,50,.22);cursor:pointer;transition:all .3s ease;padding:0;}
.cslider__dot.active{background:var(--mint);width:28px;border-radius:5px;}
@media (max-width:900px){.cslider__arrow--prev{left:-4px;}.cslider__arrow--next{right:-4px;}}
@media (max-width:560px){.cslider__arrow{display:none;}}

/* removed legacy hero padding override */

/* ===================== GLOBAL MOBILITY ASSESSMENT ===================== */
.gma-section{background:linear-gradient(160deg,var(--teal) 0%,var(--teal-deep) 100%);color:var(--ivory);}
.gma-section .section-head .section-title{color:var(--white);}
.gma-section .section-head .section-sub{color:rgba(245,248,246,.75);}
.gma-section .eyebrow{color:var(--mint-light);}
.gma-section .eyebrow::before{background:var(--mint-light);}

.gma-card{background:rgba(255,255,255,.06);border:1px solid rgba(47,199,161,.25);border-radius:var(--radius-lg);padding:44px 48px;max-width:780px;margin:0 auto;position:relative;overflow:hidden;}
.gma-card::before{content:"";position:absolute;top:-80px;right:-80px;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(47,199,161,.12),transparent 70%);pointer-events:none;}

.gma-progress{display:flex;gap:7px;margin-bottom:32px;}
.gma-progress__bar{flex:1;height:4px;border-radius:99px;background:rgba(47,199,161,.2);transition:background .4s ease;}
.gma-progress__bar.done{background:var(--mint);}
.gma-progress__bar.active{background:var(--mint-light);}

.gma-step-label{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--mint-light);font-weight:600;margin-bottom:10px;}
.gma-question{font-family:var(--font-display);font-size:clamp(20px,2.6vw,28px);font-weight:600;color:var(--white);line-height:1.2;margin-bottom:28px;}

.gma-options{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.gma-options--3{grid-template-columns:repeat(3,1fr);}
.gma-option{padding:15px 18px;border-radius:var(--radius-md);border:1.5px solid rgba(47,199,161,.28);background:rgba(255,255,255,.04);color:rgba(245,248,246,.88);font-size:14.5px;font-weight:500;text-align:left;cursor:pointer;transition:all .2s ease;line-height:1.4;}
.gma-option:hover{border-color:var(--mint);background:rgba(47,199,161,.1);color:var(--white);}
.gma-option.selected{border-color:var(--mint);background:rgba(47,199,161,.18);color:var(--white);font-weight:600;}
.gma-option__icon{display:block;font-size:22px;margin-bottom:6px;}

.gma-nav{display:flex;align-items:center;justify-content:space-between;margin-top:30px;gap:14px;}
.gma-back{background:none;border:1.5px solid rgba(47,199,161,.3);color:rgba(245,248,246,.7);padding:11px 22px;border-radius:999px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s ease;}
.gma-back:hover{border-color:var(--mint-light);color:var(--white);}
.gma-next{background:var(--mint);color:var(--teal-deep);padding:13px 30px;border-radius:999px;font-size:15px;font-weight:700;border:none;cursor:pointer;transition:all .2s ease;}
.gma-next:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 28px -10px rgba(47,199,161,.55);}
.gma-next:disabled{opacity:.38;cursor:not-allowed;}

/* Result card */
.gma-result{text-align:center;padding:10px 0 4px;}
.gma-result__badge{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;width:88px;height:88px;border-radius:50%;border:2px solid var(--mint);background:rgba(47,199,161,.12);margin-bottom:20px;}
.gma-result__badge svg{width:36px;height:36px;stroke:var(--mint);}
.gma-result h3{font-family:var(--font-display);font-size:26px;color:var(--white);margin-bottom:10px;}
.gma-result__summary{font-size:15px;color:rgba(245,248,246,.78);line-height:1.7;max-width:560px;margin:0 auto 26px;}
.gma-result__matches{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;margin-bottom:28px;}
.gma-result__match{background:rgba(47,199,161,.18);border:1.5px solid rgba(47,199,161,.4);color:var(--mint-light);padding:8px 16px;border-radius:999px;font-size:13px;font-weight:600;}
.gma-result__ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.gma-restart{background:none;border:1.5px solid rgba(47,199,161,.35);color:rgba(245,248,246,.7);padding:11px 22px;border-radius:999px;font-size:13.5px;font-weight:600;cursor:pointer;transition:all .2s ease;margin-top:16px;}
.gma-restart:hover{border-color:var(--mint-light);color:var(--white);}

@media(max-width:700px){
  .gma-card{padding:30px 22px;}
  .gma-options{grid-template-columns:1fr;}
  .gma-options--3{grid-template-columns:1fr 1fr;}
}
@media(max-width:440px){
  .gma-options--3{grid-template-columns:1fr;}
}
`;

const MONTHS = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
const SLOTS = ["10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];

const WHY = [
  { title: "Expert Admissions Guidance",
    body: "A dedicated counsellor maps your academic background, budget, and goals to the universities genuinely worth applying to — not just the ones that pay commission.",
    icon: (<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>) },
  { title: "University Selection Support",
    body: "A curated shortlist matched to your profile, career direction, and budget — across a growing network of partner institutions, with no one-size-fits-all checklists.",
    icon: (<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>) },
  { title: "Visa Assistance",
    body: "Meticulous documentation, mock interviews, and country-specific guidance — built around each destination's actual requirements, not a generic template.",
    icon: (<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>) },
  { title: "Scholarship Guidance",
    body: "From merit-based fee reductions in Dubai to TOPIK-linked tuition waivers in Korea, we help you identify and apply for every scholarship your profile qualifies for.",
    icon: (<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 21h20L12 2Z"/><path d="M12 9v5M12 17h.01"/></svg>) },
  { title: "Application Management",
    body: "SOPs that tell your story properly, accurately translated and attested documents, and a complete application package — reviewed before it's ever submitted.",
    icon: (<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12 11 14 15 10"/><circle cx="12" cy="12" r="9"/></svg>) },
  { title: "Pre-Departure Support",
    body: "Travel briefings, accommodation guidance, and arrival support — plus access to alumni already living in your destination city when you land.",
    icon: (<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>) },
];

const DEST = [
  { name: "Poland", position: "Affordable European Excellence",
    blurb: "22 QS-ranked universities, EU-recognised degrees, and tuition far below Western Europe — a full EU education without the EU price tag.",
    stats: ["Tuition from €2,550 / year", "EU-wide career access, 27 member states", "Post-study work pathway, ~2–3 years"],
    cta: "Explore Poland" },
  { name: "Dubai, UAE", position: "Global Business Gateway",
    blurb: "UK-accredited diplomas, zero income tax, and a streamlined visa process — three hours from India, decades ahead in opportunity.",
    stats: ["Several diploma pathways do not require IELTS", "0% personal income tax", "Ranked #3 safest city globally"],
    cta: "Explore Dubai" },
  { name: "Singapore", position: "Asia's Innovation Capital",
    blurb: "EduTrust-certified programmes, many with built-in internship components, and PR-eligible pathways for qualifying graduates.",
    stats: ["Paid internships, SGD 1,000–2,000 / month", "6 intakes available every year", "Extensive industry partner network"],
    cta: "Explore Singapore" },
  { name: "South Korea", position: "Technology Meets Global Education",
    blurb: "Study where Samsung, LG, and SK Hynix build the future. World-ranked universities, English-taught tracks, and a rising global culture.",
    stats: ["170K+ international students nationwide", "Intakes open in March & September", "TOPIK-linked merit scholarships available"],
    cta: "Explore South Korea" },
  { name: "Cyprus", position: "International Education Hub",
    blurb: "An EU island where degrees carry weight across 27 member states — at some of Europe's most accessible tuition fees.",
    stats: ["EU-recognised degrees from €5,500 / year", "Ranked 31st safest country worldwide", "300+ sunny days a year"],
    cta: "Explore Cyprus" },
  { name: "Malta", position: "Mediterranean Academic Advantage",
    blurb: "One of only two EU countries where English is an official language — your education starts on day one, with no language barrier.",
    stats: ["MQF / EQF recognised qualifications", "Tuition €6,000–€14,000 / year", "EU member, full Schengen access"],
    cta: "Explore Malta" },
  { name: "Netherlands", position: "Future-Focused Learning",
    blurb: "Home to ASML, Philips, and Booking.com — many programmes offer internship and industry exposure, with a post-study Orientation Year visa to look for work after graduation.",
    stats: ["Ranked #1 globally in English proficiency", "160+ nationalities on campus", "Post-study Orientation Year visa"],
    cta: "Explore Netherlands" },
  { name: "Mauritius", position: "Island Education, Global Recognition",
    blurb: "A globally connected island between Asia, Africa, and Europe — English-medium programmes and a visa process built for international students.",
    stats: ["English & French medium instruction", "Students from 50+ nationalities on campus", "Streamlined visa documentation process"],
    cta: "Explore Mauritius" },
];

const PROGRAMS = [
  { tag: "Undergraduate", title: "Bachelor's Degrees", body: "3–4 year pathways across Europe and Asia, English-taught and globally recognised." },
  { tag: "Postgraduate", title: "Master's Degrees", body: "Specialised, career-aligned programmes built for fast entry into competitive job markets." },
  { tag: "Postgraduate", title: "MBA Programs", body: "Triple-accredited and globally networked business schools at a fraction of Western tuition." },
  { tag: "Postgraduate", title: "PG Diplomas", body: "Focused, shorter pathways for fast-track career changers and skill upgrades." },
  { tag: "In Demand", title: "Engineering", body: "Civil, mechanical, electrical & mechatronics — feeding Europe's infrastructure boom." },
  { tag: "In Demand", title: "Business & Management", body: "From Kozminski to Netherlands business schools rated best-in-class for over a decade." },
  { tag: "In Demand", title: "Computer Science", body: "Major IT and outsourcing hubs in Poland, Korea, and the Netherlands recruit straight from campus." },
  { tag: "Fast Growing", title: "Artificial Intelligence", body: "Dedicated AI & data labs across Polish, Maltese, and Korean institutions." },
  { tag: "In Demand", title: "Healthcare", body: "MD, nursing, and pharmacy pathways with EU and international recognition." },
  { tag: "In Demand", title: "Hospitality", body: "Live-classroom training in tourism capitals — Malta, Singapore, and Mauritius." },
  { tag: "In Demand", title: "Finance & Accounting", body: "ACCA-linked and fintech-aligned programmes in Cyprus, Malta, and Poland." },
  { tag: "Creative", title: "Design & Media", body: "UX, graphic design, and communication degrees feeding Europe's creative industries." },
];

const JOURNEY = [
  { num: "01", title: "Career Counselling", body: "A real conversation about your academic background, career goals, and budget — followed by an honest map of what's genuinely possible for your profile.", tags: ["Profile evaluation", "Country matching"] },
  { num: "02", title: "University Selection", body: "A curated shortlist of universities and programmes that align with your qualifications, ambitions, and intake timeline — not a generic list of \"popular\" options.", tags: ["Shortlisting", "Eligibility check"] },
  { num: "03", title: "Application Submission", body: "SOPs that tell your story properly, documents accurately translated and attested, and a complete application package — reviewed before it's ever sent.", tags: ["SOP & LOR", "Document prep"] },
  { num: "04", title: "Offer Letter", body: "Once admitted, we help you understand your offer terms, payment milestones, and scholarship eligibility before you commit to anything.", tags: ["Offer review", "Fee planning"] },
  { num: "05", title: "Visa Processing", body: "Meticulous documentation, financial proof preparation, and mock visa interviews — a process built around each destination's actual requirements.", tags: ["Document filing", "Mock interviews"] },
  { num: "06", title: "Departure & Arrival Support", body: "Pre-departure briefings, accommodation guidance, and an alumni network already on the ground — because the relationship doesn't end at the airport.", tags: ["Pre-departure briefing", "Alumni network"] },
];

const TRUST = [
  { title: "Experienced Advisors",
    body: "Counsellors who specialise by destination — not generalists reciting the same script for every country.",
    icon: (<svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>) },
  { title: "Global Education Expertise",
    body: "Specialised, destination-specific guidance across Poland, Dubai, Singapore, South Korea, Cyprus, Malta, the Netherlands, and Mauritius.",
    icon: (<svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2c2.5 2.7 4 6.3 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.3-4-10s1.5-7.3 4-10Z"/></svg>) },
  { title: "Student-Focused Approach",
    body: "If a destination isn't right for your profile, we'll tell you — even if it's our most popular one.",
    icon: (<svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>) },
  { title: "Dedicated Support Team",
    body: "One counsellor, one student file, from first conversation through to arrival support — no handoffs, no chatbots.",
    icon: (<svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><rect x="7" y="2" width="10" height="10" rx="2"/></svg>) },
  { title: "Ethical Guidance",
    body: "No commission-driven recommendations. We tell you which programmes are competitive before you fall in love with them.",
    icon: (<svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5Z"/></svg>) },
  { title: "Transparent Assistance",
    body: "Honest timelines, realistic expectations, and a fee structure explained in full before you commit to anything.",
    icon: (<svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11 12 14l8-8"/><path d="M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h11"/></svg>) },
];

const TYPICAL = [
  "Limited visibility into why a particular university was suggested",
  "Generic checklists, with no one who knows your specific story",
  "Unclear timelines and costs that surface only partway through",
  "Support that fades once the paperwork is filed",
];
const LANGMA_ADV = [
  "Transparent counselling — every recommendation is explained, never assumed",
  "A dedicated counsellor who knows your story, goals, and concerns",
  "Personalised university matching and a transparent, milestone-based fee structure",
  "Long-term guidance — pre-departure briefing and arrival support once you land",
];

const FLAGS = ["Study in Poland","Study in Dubai","Study in Singapore","Study in South Korea",
  "Study in Cyprus","Study in Malta","Study in the Netherlands","Study in Mauritius","+ More"];

const HERO_STATS = [
  ["Global", "Academic Opportunities"],
  ["1:1", "Personalised Student Guidance"],
  ["End-to-End", "Application Assistance"],
  ["Multiple", "Study Destinations"],
];

const DEST_OPTIONS = ["Not sure yet","Poland","Dubai (UAE)","Singapore","South Korea",
  "Cyprus","Malta","Netherlands","Mauritius","Georgia / Other"];

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
);

const COUNTRIES = [
  { name: "Poland", code: "pl", link: "/poland", blurb: "EU-recognised degrees, low tuition, and a post-study work pathway." },
  { name: "Cyprus", code: "cy", link: "/study-in-cyprus", blurb: "Affordable, English-taught EU degrees on one of Europe's safest islands." },
  { name: "Singapore", code: "sg", link: "/study-in-singapore", blurb: "Asia's innovation capital — paid internships and PR-eligible pathways." },
  { name: "United Arab Emirates", code: "ae", link: "/dubai", blurb: "UK-accredited diplomas, 0% income tax, three hours from India." },
  { name: "Mauritius", code: "mu", link: "/study-in-mauritius", blurb: "English & French medium programmes with global recognition." },
  // { name: "Germany", code: "de", link: null, blurb: "Tuition-free public universities and a strong post-study job market." },
  // { name: "Japan", code: "jp", link: null, blurb: "World-ranked universities, generous scholarships, leading tech hubs." },
  { name: "South Korea", code: "kr", link: "/south-korea", blurb: "Global campuses, TOPIK-linked scholarships, and a rising study culture." },
  { name: "Malta", code: "mt", link: "/malta", blurb: "English-speaking EU island with full Schengen access." },
  { name: "Netherlands", code: "nl", link: "/netherlands", blurb: "Ranked #1 in English proficiency, with a post-study orientation visa." },
  { name: "Georgia", code: "ge", link: "/georgia", blurb: "Unique cultural experience with growing educational opportunities." },
];

function CountrySlider() {
  const [perView, setPerView] = useState(4);
  const [rawIndex, setRawIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPerView(w < 560 ? 1 : w < 900 ? 2 : w < 1200 ? 3 : 4);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const maxIndex = Math.max(0, COUNTRIES.length - perView);
  const index = Math.min(rawIndex, maxIndex);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setRawIndex((i) => (i >= maxIndex ? 0 : i + 1)), 2800);
    return () => clearInterval(id);
  }, [paused, maxIndex]);

  const go = (d) => setRawIndex((i) => {
    const n = i + d;
    if (n < 0) return maxIndex;
    if (n > maxIndex) return 0;
    return n;
  });

  return (
    <section className="section section--ivory2 cslider-section" id="destinations">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Featured Study Destinations</span>
          <h2 className="section-title">Explore Your Study Destinations</h2>
          <p className="section-sub">From the EU to Asia and the Gulf — pick a country and we'll map the universities, scholarships, and visa pathway built for your profile.</p>
        </div>

        <div className="cslider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="cslider__viewport">
            <div className="cslider__track" style={{ transform: `translateX(-${index * (100 / perView)}%)` }}>
              {COUNTRIES.map((c) => (
                <div className="cslider__slide" style={{ flex: `0 0 ${100 / perView}%`, maxWidth: `${100 / perView}%` }} key={c.code}>
                  <article className="country-card">
                    <div className="country-card__head">
                      <span className="country-card__label">Study in</span>
                      <div className="country-card__flag">
                        <img src={`https://flagcdn.com/w320/${c.code}.png`} alt={`${c.name} flag`} loading="lazy" />
                      </div>
                    </div>
                    <div className="country-card__body">
                      <h3>{c.name}</h3>
                      <p>{c.blurb}</p>
                      {c.link ? (
                        <Link to={c.link} className="btn btn-primary country-card__cta">Explore {c.name} →</Link>
                      ) : (
                        <a href="#booking" className="btn btn-primary country-card__cta">Enquire about {c.name} →</a>
                      )}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
          <button type="button" className="cslider__arrow cslider__arrow--prev" onClick={() => go(-1)} aria-label="Previous">←</button>
          <button type="button" className="cslider__arrow cslider__arrow--next" onClick={() => go(1)} aria-label="Next">→</button>
        </div>

        <div className="cslider__dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button key={i} type="button" className={"cslider__dot" + (i === index ? " active" : "")} onClick={() => setRawIndex(i)} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function StudyAbrotHeroSection1() {
  const rootRef = useRef(null);

  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const [view, setView] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [mode, setMode] = useState("Virtual Meeting");
  const [selDate, setSelDate] = useState(null);
  const [selSlot, setSelSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [conf, setConf] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", dest: "Not sure yet", note: "" });

  const fmtDate = (dt) => dt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

  /* Scroll reveal */
  useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return;
    const els = scope.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-visible")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Calendar build */
  const isCurrentMonth = view.y === today.getFullYear() && view.m === today.getMonth();
  const firstDay = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ key: "e" + i, empty: true });
  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(view.y, view.m, d); dt.setHours(0, 0, 0, 0);
    const past = dt < today;
    const sunday = new Date(view.y, view.m, d).getDay() === 0;
    const isToday = view.y === today.getFullYear() && view.m === today.getMonth() && d === today.getDate();
    const selected = !!selDate && selDate.getFullYear() === view.y && selDate.getMonth() === view.m && selDate.getDate() === d;
    cells.push({ key: "d" + d, d, disabled: past || sunday, isToday, selected });
  }

  const goPrev = () => { if (isCurrentMonth) return; setView((v) => v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }); };
  const goNext = () => setView((v) => v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 });
  const selectDate = (d) => { setSelDate(new Date(view.y, view.m, d)); setSelSlot(null); };

  const canConfirm = !!selDate && !!selSlot;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canConfirm) return;
    setConf({
      name: form.name,
      mode,
      dateTime: fmtDate(selDate) + " at " + selSlot,
      dest: form.dest,
      contact: form.phone + " / " + form.email,
    });
    setConfirmed(true);
    /* Integration note: in production, POST this booking payload to your CRM /
       calendar backend (Google Calendar API, Calendly, etc.) instead of only
       rendering a confirmation. */
  };

  const resetBooking = () => {
    setSelDate(null); setSelSlot(null);
    setForm({ name: "", phone: "", email: "", dest: "Not sure yet", note: "" });
    setConfirmed(false); setConf(null);
  };

  return (
    <div ref={rootRef}>
      <style>{CSS}</style>

      <main id="main">

        {/* ===================== HERO ===================== */}
        <section className="hero">
          <div className="hero__inner">
            <div className="hero__copy">
              <div className="hero__eyebrow-row">
                <div className="hero__badge-pill">
                  <span className="hero__badge-dot" />
                  <span>Global Education</span>
                </div>
              </div>
              <div className="hero__brand-row">
                <span className="hero__brand-line" />
                <span>Langma International</span>
              </div>
              <h1>Your Ambition<br/>Has a <em>Global</em> Address.</h1>
              <p className="hero__sub">Langma International helps students access internationally recognised degree programmes across leading study destinations worldwide. Through personalised counselling, destination matching, and comprehensive application support, we help you move from ambition to acceptance — with clarity at every step.</p>
              <p className="hero__trust">A dedicated education advisor from your first conversation. Honest, profile-based guidance. Continuous support from application to your first semester abroad.</p>
              <div className="hero__ctas">
                <a href="#booking" className="btn btn-primary">Book Your Virtual Consultation{"\u00A0"}→</a>
                <a href="#destinations" className="btn btn-ghost-light">Explore Destinations</a>
              </div>
              <div className="hero__micro">
                <span>Personalised guidance</span>
                <span>Transparent process</span>
                <span>Dedicated education advisor</span>
                <span>Application &amp; visa support</span>
              </div>
            </div>

            <div className="hero__panel reveal">
              <div className="hero__panel-title">Where We Guide Students</div>
              <div className="hero__flags">
                {FLAGS.map((f) => (<span key={f} className="chip chip--light">{f}</span>))}
              </div>
              <div className="hero__stats">
                {HERO_STATS.map(([b, s]) => (
                  <div key={s} className="hero__stat"><b>{b}</b><span>{s}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== WHY LANGMA ===================== */}
        <section className="section section--ivory2" id="why-langma">
          <div className="container">
            <div className="section-head center">
              <span className="eyebrow">Why Study Abroad With Langma International</span>
              <h2 className="section-title">We Don't Just Process Applications. We Build Futures.</h2>
              <p className="section-sub">Going abroad is one of the biggest decisions of your academic life. We assess, prepare, and stay with you — through admissions, documentation, visa, and the first nervous weeks abroad.</p>
            </div>
            <div className="why-grid">
              {WHY.map((c) => (
                <div key={c.title} className="why-card reveal">
                  <div className="why-card__icon">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== STUDY DESTINATIONS (slider) ===================== */}
        <CountrySlider />

        

        {/* ===================== GLOBAL MOBILITY ASSESSMENT CTA ===================== */}
        <section className="section section--ivory2" id="global-mobility-assessment-cta">
          <div className="container">
            <div className="section-head center">
              <span className="eyebrow">Not Sure Which Country Fits You?</span>
              <h2 className="section-title">Take the Study Abroad Global Mobility Assessment</h2>
              <p className="section-sub">Answer a short assessment and get a personalized country recommendation for your study abroad plans.</p>
            </div>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <a href="/study-assessment" className="btn btn-primary">
                Not Sure Which Country Fits You? Take the Study Abroad Global Mobility Assessment →
              </a>
            </div>
          </div>
        </section>

        {/* ===================== LANGMA ADVANTAGE ===================== */}
        <section className="section section--ivory2">
          <div className="container">
            <div className="section-head center">
              <span className="eyebrow">Why Langma International</span>
              <h2 className="section-title">The Langma International Difference</h2>
              <p className="section-sub">Going abroad alone is overwhelming. Here's what changes when you have dedicated, transparent guidance behind you.</p>
            </div>
            <div className="advantage-wrap reveal">
              <div className="advantage-col advantage-col--typical">
                <h3>Going It Alone</h3>
                {TYPICAL.map((t) => (
                  <div key={t} className="advantage-row">
                    <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <div className="advantage-col advantage-col--langma">
                <h3>Langma International</h3>
                {LANGMA_ADV.map((t) => (
                  <div key={t} className="advantage-row">
                    <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== STUDENT JOURNEY ===================== */}
        <section className="section section--white" id="journey">
          <div className="container">
            <div className="section-head center">
              <span className="eyebrow">Your Path, Step by Step</span>
              <h2 className="section-title">We Walk Beside You. Every Step.</h2>
              <p className="section-sub">Going abroad is a process. We turn it into a plan — clear, calm, and completely supported from your first call to your first semester.</p>
            </div>
            <div className="journey">
              <div className="journey__line"></div>
              {JOURNEY.map((j) => (
                <div key={j.num} className="journey-step reveal">
                  <div className="journey-step__num">{j.num}</div>
                  <div className="journey-step__body">
                    <h3>{j.title}</h3>
                    <p>{j.body}</p>
                    <div className="journey-step__tags">
                      {j.tags.map((tg) => (<span key={tg}>{tg}</span>))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== TRUST & CREDIBILITY ===================== */}
        <section className="section section--ivory2" id="trust">
          <div className="container">
            <div className="section-head center">
              <span className="eyebrow">Trust &amp; Credibility</span>
              <h2 className="section-title">Guidance You Can Verify, Not Just Believe</h2>
              <p className="section-sub">We don't ask for blind trust. Here's what we hold ourselves to on every student file.</p>
            </div>
            <div className="trust-grid">
              {TRUST.map((t) => (
                <div key={t.title} className="trust-card reveal">
                  <h3>{t.icon}{t.title}</h3>
                  <p>{t.body}</p>
                </div>
              ))}
            </div>
            <p className="trust-note">Tuition, visa, and admission requirements are subject to change and vary by institution and nationality. Langma International does not guarantee admission or visa outcomes all visa decisions rest with the relevant immigration authorities. Always confirm current requirements with your Langma International counsellor.</p>
          </div>
        </section>

        {/* ===================== FINAL CTA + BOOKING ===================== */}
        <Studyform />

      </main>
    </div>
  );
}