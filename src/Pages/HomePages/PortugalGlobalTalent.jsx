import React, { useEffect } from 'react';
import { useResidencyLeadForms } from '../../hooks/useResidencyLeadForms';
import { todayStr } from '../../utils/residencyFormHelpers';

const SERVICE = 'Portugal Global Talent Programme';

const PortugalGlobalTalentPage = () => {
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadSubmitted, officeSubmitted,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Portugal Global Talent Consultation' });

  useEffect(() => {
    const nav = document.getElementById('nav');
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 40) nav.classList.add('solid');
      else nav.classList.remove('solid');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    const handleToggle = () => {
      if (!links || !toggle) return;
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    if (toggle) toggle.addEventListener('click', handleToggle);

    const linkClickHandlers = [];
    if (links && toggle) {
      links.querySelectorAll('a').forEach((a) => {
        const handler = () => {
          links.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        };
        a.addEventListener('click', handler);
        linkClickHandlers.push([a, handler]);
      });
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = Array.from(document.querySelectorAll('.reveal'));
    let io = null;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      items.forEach((el) => io.observe(el));
    }

    const faqCleanup = [];
    document.querySelectorAll('.faq-q').forEach((btn) => {
      const handler = () => {
        const item = btn.parentElement;
        const ans = item?.querySelector('.faq-a');
        const isOpen = item?.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach((openItem) => {
          openItem.classList.remove('open');
          const answer = openItem.querySelector('.faq-a');
          if (answer) answer.style.maxHeight = null;
        });
        if (!isOpen && item && ans) {
          item.classList.add('open');
          ans.style.maxHeight = ans.scrollHeight + 'px';
        }
      };
      btn.addEventListener('click', handler);
      faqCleanup.push([btn, handler]);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (toggle) toggle.removeEventListener('click', handleToggle);
      linkClickHandlers.forEach(([a, handler]) => a.removeEventListener('click', handler));
      faqCleanup.forEach(([btn, handler]) => btn.removeEventListener('click', handler));
      if (io) io.disconnect();
    };
  }, []);

  return (
    <div className="pt-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`/* =================================================================
   LANGMA INTERNATIONAL — Portugal Global Talent Programme
   Design system: deep navy + champagne gold + warm ivory
   Display: Fraunces  ·  Body/UI: Inter
   ================================================================= */

.pt-page{
  --navy:#0E1F3D;
  --navy-deep:#0E1F3D;
  --navy-soft:#0E2A46;
  --royal:#2FC7A1;
  --gold:#2FC7A1;
  --gold-bright:#4EC7B8;
  --gold-soft:#4EC7B8;
  --ivory:#F7FAFC;
  --warm-white:#FFFFFF;
  --beige:#E5F6F3;
  --ink:#0E2A46;
  --muted:#296166;
  --muted-light:#5D7A7F;
  --line:#DDE7EB;
  --line-dark:rgba(47,199,161,.24);
  --shadow-lg:0 30px 70px -30px rgba(14,31,61,.24);
  --shadow-md:0 18px 44px -22px rgba(14,31,61,.22);
  --maxw:1200px;
  --r:18px;
}

.pt-page *{margin:0;padding:0;box-sizing:border-box}
.pt-page{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
.pt-page{
  font-family:'Inter',system-ui,-apple-system,sans-serif;
  color:var(--ink);
  background:linear-gradient(180deg,var(--warm-white) 0%,var(--ivory) 100%);
  line-height:1.65;
  font-weight:400;
  overflow-x:hidden;
}
.pt-page h1,.pt-page h2,.pt-page h3,.pt-page h4{font-family:'Fraunces',Georgia,serif;font-weight:400;line-height:1.1;letter-spacing:-.01em}
.pt-page img{display:block;max-width:100%}
.pt-page a{color:inherit;text-decoration:none}
.pt-page::selection{background:var(--gold);color:var(--navy-deep)}

.pt-page .wrap{max-width:var(--maxw);margin:0 auto;padding:0 28px}
.pt-page .eyebrow{
  font-family:'Inter',sans-serif;text-transform:uppercase;letter-spacing:.28em;
  font-size:.72rem;font-weight:600;color:var(--gold);display:inline-flex;align-items:center;gap:.7em;
}
.pt-page .eyebrow::before{content:"";width:26px;height:1px;background:var(--gold);display:inline-block;opacity:.8}
.pt-page .eyebrow.center{justify-content:center}
.pt-page .eyebrow.light{color:var(--gold-bright)}

.pt-page .section{padding:108px 0;position:relative}
.pt-page .section-head{max-width:760px;margin-bottom:56px}
.pt-page .section-head.center{margin-left:auto;margin-right:auto;text-align:center}
.pt-page .section-head h2{font-size:clamp(2rem,4.4vw,3.3rem);margin:18px 0 20px;color:var(--navy)}
.pt-page .section-head p{color:var(--muted);font-size:1.075rem;max-width:62ch}
.pt-page .section-head.center p{margin-inline:auto}
.pt-page .section-head p,
.pt-page .card p,
.pt-page .card li,
.pt-page .faq-a,
.pt-page .stage p,
.pt-page .refund,
.pt-page .info-box p,
.pt-page .feature p,
.pt-page .plan-item p,
.pt-page p,
.pt-page li{color:var(--muted)}
.pt-page .card h3,
.pt-page .stage h4,
.pt-page .info-box h4,
.pt-page .feature h3,
.pt-page h3,
.pt-page h4{color:var(--navy)}

/* Buttons */
.pt-page .btn{
  display:inline-flex;align-items:center;gap:.6em;font-family:'Inter',sans-serif;font-weight:600;
  font-size:.92rem;letter-spacing:.02em;padding:15px 30px;border-radius:100px;cursor:pointer;
  border:1px solid transparent;transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s,background .35s,color .35s;
  white-space:nowrap;
}
.pt-page .btn .arr{transition:transform .35s}
.pt-page .btn:hover .arr{transform:translateX(4px)}
.pt-page .btn-gold{background:var(--gold);color:var(--navy-deep);box-shadow:0 14px 30px -14px rgba(47,199,161,.35)}
.pt-page .btn-gold:hover{transform:translateY(-2px);background:var(--gold-bright);box-shadow:0 20px 40px -14px rgba(47,199,161,.45)}
.pt-page .btn-ghost{background:transparent;color:var(--warm-white);border-color:rgba(78,199,184,.42)}
.pt-page .btn-ghost:hover{border-color:var(--gold);background:rgba(47,199,161,.12)}
.pt-page .btn-navy{background:var(--navy);color:var(--warm-white)}
.pt-page .btn-navy:hover{transform:translateY(-2px);background:var(--navy-deep);box-shadow:var(--shadow-md)}
.pt-page .btn-line{background:transparent;color:var(--navy);border-color:var(--line)}
.pt-page .btn-line:hover{border-color:var(--gold);color:var(--navy-deep)}

/* ============ NAV ============ */
.pt-page header.nav{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  transition:background .45s,box-shadow .45s,padding .45s,border-color .45s;
  padding:22px 0;border-bottom:1px solid transparent;
}
.pt-page header.nav.solid{background:rgba(8,20,38,.9);backdrop-filter:blur(16px);padding:14px 0;border-bottom:1px solid var(--line-dark);box-shadow:0 10px 40px -24px rgba(0,0,0,.7)}
.pt-page .nav-inner{display:flex;align-items:center;justify-content:space-between;gap:24px}
.pt-page .brand{display:flex;flex-direction:column;line-height:1}
.pt-page .brand .mark{font-family:'Fraunces',serif;font-size:1.5rem;color:var(--warm-white);letter-spacing:.02em}
.pt-page .brand .mark b{color:var(--gold);font-weight:500}
.pt-page .brand .sub{font-size:.6rem;letter-spacing:.42em;text-transform:uppercase;color:var(--gold-soft);margin-top:5px;font-weight:600}
.pt-page .nav-links{display:flex;align-items:center;gap:34px}
.pt-page .nav-links a{color:rgba(246,242,233,.82);font-size:.88rem;font-weight:500;letter-spacing:.01em;transition:color .3s;position:relative}
.pt-page .nav-links a::after{content:"";position:absolute;left:0;bottom:-6px;width:0;height:1px;background:var(--gold);transition:width .3s}
.pt-page .nav-links a:hover{color:#fff}
.pt-page .nav-links a:hover::after{width:100%}
.pt-page .nav-cta{padding:11px 22px;font-size:.85rem}
.pt-page .nav-toggle{display:none;background:none;border:0;cursor:pointer;flex-direction:column;gap:5px;padding:6px}
.pt-page .nav-toggle span{width:26px;height:2px;background:var(--gold-soft);transition:.3s;display:block}

/* ============ HERO ============ */
.pt-page .hero{position:relative;min-height:100vh;display:flex;align-items:center;color:var(--warm-white);overflow:hidden;background:radial-gradient(ellipse at 20% 0%,var(--navy-soft) 0%,var(--navy) 45%,var(--navy-deep) 100%)}
.pt-page .hero .wrap{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
.pt-page .hero-media{position:relative}
.pt-page .hero-media-card{position:relative;border-radius:26px;overflow:hidden;border:1px solid rgba(231,214,174,.3);box-shadow:var(--shadow-lg);aspect-ratio:4/5}
.pt-page .hero-media-card img{width:100%;height:100%;object-fit:cover;display:block}
.pt-page .hero-media-card::after{content:"";position:absolute;inset:0;background:linear-gradient(195deg,rgba(7,21,39,0) 55%,rgba(7,21,39,.5) 100%)}
.pt-page .hero-tag{position:absolute;left:22px;bottom:22px;display:inline-flex;align-items:center;gap:8px;background:rgba(7,21,39,.72);backdrop-filter:blur(6px);border:1px solid rgba(231,214,174,.25);color:var(--warm-white);font-size:.82rem;font-weight:500;padding:9px 16px;border-radius:999px;z-index:1}
.pt-page .hero-tag .dot{width:6px;height:6px;border-radius:50%;background:var(--gold-bright);display:inline-block}
.pt-page .hero-bg{position:absolute;inset:0;z-index:-2;opacity:0}
.pt-page .hero-bg img{width:100%;height:100%;object-fit:cover;object-position:center 60%}
.pt-page .hero-bg::after{content:"";position:absolute;inset:0;
  background:linear-gradient(105deg,rgba(7,21,39,.93) 0%,rgba(7,21,39,.78) 38%,rgba(11,31,58,.46) 70%,rgba(11,31,58,.34) 100%);}
.pt-page .hero-grain{position:absolute;inset:0;z-index:-1;opacity:.5;
  background:radial-gradient(120% 120% at 80% 10%,transparent 40%,rgba(7,21,39,.6) 100%)}
.pt-page .hero .wrap{padding-top:140px;padding-bottom:70px;width:100%}
.pt-page .hero-content{max-width:620px}
.pt-page .hero h1{font-size:clamp(2.6rem,6.2vw,5rem);font-weight:300;letter-spacing:-.02em;margin:26px 0 24px}
.pt-page .hero h1 em{font-style:italic;color:var(--gold-bright)}
.pt-page .hero-lead{font-size:clamp(1.05rem,1.6vw,1.28rem);color:rgba(246,242,233,.86);max-width:54ch;font-weight:300}
.pt-page .hero-actions{display:flex;gap:16px;margin-top:40px;flex-wrap:wrap}
.pt-page .hero-stats{display:flex;gap:0;margin-top:74px;border-top:1px solid var(--line-dark);flex-wrap:wrap}
.pt-page .hstat{padding:26px 38px 4px 0;margin-right:38px;border-right:1px solid var(--line-dark)}
.pt-page .hstat:last-child{border-right:0;margin-right:0}
.pt-page .hstat .n{font-family:'Fraunces',serif;font-size:2.1rem;font-weight:400;color:var(--gold-bright);line-height:1}
.pt-page .hstat .l{font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(246,242,233,.66);margin-top:10px;font-weight:500}
.pt-page .scroll-hint{position:absolute;bottom:26px;left:50%;transform:translateX(-50%);font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(231,214,174,.6);display:flex;flex-direction:column;align-items:center;gap:10px}
.pt-page .scroll-hint .bar{width:1px;height:42px;background:linear-gradient(var(--gold),transparent);animation:drop 2.4s infinite}
@keyframes drop{0%{transform:scaleY(0);transform-origin:top}40%{transform:scaleY(1);transform-origin:top}60%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}

/* ============ TRUST STRIP ============ */
.pt-page .trust{background:var(--navy-deep);color:var(--warm-white);padding:46px 0;border-bottom:1px solid rgba(200,168,98,.16)}
.pt-page .trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:30px;align-items:center}
.pt-page .trust-item{display:flex;gap:16px;align-items:flex-start}
.pt-page .trust-item .ic{flex:0 0 auto;width:42px;height:42px;border:1px solid var(--line-dark);border-radius:11px;display:grid;place-items:center;color:var(--gold)}
.pt-page .trust-item h4{font-family:'Inter',sans-serif;font-weight:600;font-size:.95rem;letter-spacing:.01em;color:#fff;margin-bottom:3px}
.pt-page .trust-item p{font-size:.82rem;color:rgba(246,242,233,.62);line-height:1.45}

/* ============ COUNTRY OVERVIEW ============ */
.pt-page .overview{background:var(--ivory)}
.pt-page .ov-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:64px;align-items:center}
.pt-page .ov-figure{position:relative;border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow-lg)}
.pt-page .ov-figure img{width:100%;height:560px;object-fit:cover;transition:transform 1.4s ease}
.pt-page .ov-figure:hover img{transform:scale(1.05)}
.pt-page .ov-figure .cap{position:absolute;left:22px;bottom:22px;right:22px;color:#fff;display:flex;justify-content:space-between;align-items:flex-end}
.pt-page .ov-figure .cap b{font-family:'Fraunces',serif;font-size:1.4rem;font-weight:400}
.pt-page .ov-figure .cap span{font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-soft)}
.pt-page .ov-figure::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(7,21,39,.7),transparent 45%)}
.pt-page .ov-figure .cap{z-index:2}
.pt-page .ov-copy h2{font-size:clamp(2rem,4vw,3rem);color:var(--navy);margin:18px 0 22px}
.pt-page .ov-copy p{color:var(--muted);margin-bottom:18px}
.pt-page .facts{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:30px;background:var(--line);border:1px solid var(--line);border-radius:14px;overflow:hidden}
.pt-page .fact{background:var(--warm-white);padding:20px 22px}
.pt-page .fact .k{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:5px}
.pt-page .fact .v{font-family:'Fraunces',serif;font-size:1.18rem;color:var(--navy)}
.pt-page .fact .v small{font-family:'Inter';font-size:.82rem;color:var(--muted);display:block;font-weight:400;letter-spacing:0;text-transform:none;margin-top:2px}

/* reveal */
.pt-page .reveal{opacity:0;transform:translateY(26px);transition:opacity .9s ease,transform .9s cubic-bezier(.2,.8,.2,1)}
.pt-page .reveal.in{opacity:1;transform:none}
.pt-page .life .reveal,
.pt-page .consult .reveal{opacity:1 !important;transform:none !important}
@media (prefers-reduced-motion:reduce){
  .pt-page .reveal{opacity:1;transform:none;transition:none}
  .pt-page .scroll-hint .bar{animation:none}
  .pt-page{scroll-behavior:auto}
}

/* ============ ABOUT PROGRAMME ============ */
.pt-page .about{background:var(--warm-white)}
.pt-page .about-top{display:grid;grid-template-columns:.9fr 1.1fr;gap:60px;align-items:end;margin-bottom:64px}
.pt-page .about-top h2{font-size:clamp(2.1rem,4.4vw,3.3rem);color:var(--navy);margin-top:18px}
.pt-page .about-top .lead{color:var(--ink);font-size:1.18rem;font-weight:300;font-family:'Fraunces',serif;line-height:1.5}
.pt-page .about-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.pt-page .acard{background:var(--ivory);border:1px solid var(--line);border-radius:var(--r);padding:34px 30px;transition:transform .4s,box-shadow .4s,border-color .4s}
.pt-page .acard:hover{transform:translateY(-6px);box-shadow:var(--shadow-md);border-color:var(--line-dark)}
.pt-page .acard .num{font-family:'Fraunces',serif;font-size:1.05rem;color:var(--gold);border-bottom:1px solid var(--line-dark);padding-bottom:14px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center}
.pt-page .acard .num span:last-child{font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted-light);font-family:'Inter'}
.pt-page .acard h3{font-size:1.3rem;color:var(--navy);margin-bottom:10px}
.pt-page .acard p{font-size:.94rem;color:var(--muted)}

/* ============ ADVANTAGES ============ */
.pt-page .adv{background:var(--navy);color:var(--warm-white);position:relative}
.pt-page .adv .section-head h2{color:#fff}
.pt-page .adv .section-head p{color:rgba(246,242,233,.72)}
.pt-page .adv-list{display:grid;grid-template-columns:repeat(2,1fr);gap:0;border-top:1px solid var(--line-dark)}
.pt-page .adv-item{padding:38px 40px 38px 0;border-bottom:1px solid var(--line-dark);display:flex;gap:26px}
.pt-page .adv-item:nth-child(odd){padding-right:48px;border-right:1px solid var(--line-dark);padding-left:0}
.pt-page .adv-item:nth-child(even){padding-left:48px}
.pt-page .adv-item .idx{font-family:'Fraunces',serif;font-size:2.2rem;color:var(--gold);line-height:1;flex:0 0 auto;font-weight:300}
.pt-page .adv-item h3{font-size:1.35rem;color:#fff;margin-bottom:9px;font-weight:500}
.pt-page .adv-item p{font-size:.95rem;color:rgba(246,242,233,.7)}

/* ============ COMPARISON ============ */
.pt-page .compare{background:var(--ivory)}
.pt-page .ctable{background:var(--warm-white);border:1px solid var(--line);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow-md)}
.pt-page .ctable .crow{display:grid;grid-template-columns:1.3fr 1fr 1fr;border-bottom:1px solid var(--line)}
.pt-page .ctable .crow:last-child{border-bottom:0}
.pt-page .ctable .crow > div{padding:20px 26px;display:flex;align-items:center}
.pt-page .ctable .crow.head > div{background:var(--navy);color:#fff;font-family:'Fraunces',serif;font-size:1.05rem}
.pt-page .ctable .crow.head .hl{background:var(--navy-deep);position:relative}
.pt-page .ctable .crow.head .hl::before{content:"Recommended";position:absolute;top:9px;left:26px;font-family:'Inter';font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
.pt-page .ctable .ck{font-weight:600;color:var(--navy);font-size:.92rem}
.pt-page .ctable .cv{color:var(--muted);font-size:.95rem}
.pt-page .ctable .cv.featured{color:var(--navy);font-weight:600;background:rgba(200,168,98,.07)}
.pt-page .ctable .crow:nth-child(even):not(.head){background:rgba(237,230,214,.4)}
.pt-page .compare-note{margin-top:18px;font-size:.82rem;color:var(--muted);text-align:center}

/* ============ ELIGIBILITY ============ */
.pt-page .elig{background:var(--warm-white)}
.pt-page .elig-grid{display:grid;grid-template-columns:1fr 1fr;gap:30px}
.pt-page .elig-card{border:1px solid var(--line);border-radius:var(--r);padding:40px;background:var(--ivory)}
.pt-page .elig-card.who{background:var(--navy);color:#fff;border-color:var(--navy)}
.pt-page .elig-card h3{font-size:1.5rem;color:var(--navy);margin-bottom:8px}
.pt-page .elig-card.who h3{color:#fff}
.pt-page .elig-card > p.sub{color:var(--muted);font-size:.92rem;margin-bottom:24px}
.pt-page .elig-card.who > p.sub{color:rgba(246,242,233,.7)}
.pt-page .req-list{list-style:none;display:flex;flex-direction:column;gap:2px}
.pt-page .req-list li{display:flex;gap:14px;padding:13px 0;border-bottom:1px solid var(--line);align-items:flex-start}
.pt-page .elig-card.who .req-list li{border-bottom-color:var(--line-dark)}
.pt-page .req-list li:last-child{border-bottom:0}
.pt-page .req-list .chk{flex:0 0 auto;width:21px;height:21px;border-radius:50%;background:var(--gold);color:var(--navy-deep);display:grid;place-items:center;font-size:.7rem;margin-top:2px}
.pt-page .req-list .txt b{display:block;font-weight:600;color:var(--navy);font-size:.95rem}
.pt-page .elig-card.who .req-list .txt b{color:#fff}
.pt-page .req-list .txt span{font-size:.85rem;color:var(--muted)}
.pt-page .elig-card.who .req-list .txt span{color:rgba(246,242,233,.62)}

/* ============ UNIVERSITY ============ */
.pt-page .uni{background:var(--beige)}
.pt-page .uni-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:24px}
.pt-page .uni-card{grid-column:span 4;background:var(--warm-white);border:1px solid var(--line);border-radius:16px;padding:30px;transition:transform .4s,box-shadow .4s}
.pt-page .uni-card:hover{transform:translateY(-5px);box-shadow:var(--shadow-md)}
.pt-page .uni-card .ic{width:46px;height:46px;border-radius:12px;background:var(--navy);color:var(--gold);display:grid;place-items:center;margin-bottom:18px}
.pt-page .uni-card h3{font-size:1.2rem;color:var(--navy);margin-bottom:8px}
.pt-page .uni-card p{font-size:.9rem;color:var(--muted)}
.pt-page .uni-wide{grid-column:span 12;background:var(--navy);color:#fff;border-radius:16px;padding:40px 44px;display:flex;justify-content:space-between;align-items:center;gap:30px;flex-wrap:wrap}
.pt-page .uni-wide h3{font-size:1.6rem;color:#fff;max-width:30ch}
.pt-page .uni-wide p{color:rgba(246,242,233,.72);max-width:46ch;font-size:.95rem;margin-top:6px}

/* ============ COSTS ============ */
.pt-page .costs{background:var(--navy-deep);color:var(--warm-white)}
.pt-page .costs .section-head h2{color:#fff}
.pt-page .costs .section-head p{color:rgba(246,242,233,.72)}
.pt-page .cost-layout{display:grid;grid-template-columns:1fr 1.15fr;gap:54px;align-items:start}
.pt-page .stages{display:flex;flex-direction:column;gap:20px}
.pt-page .stage{display:flex;gap:20px;padding:22px 24px;border:1px solid var(--line-dark);border-radius:14px;background:rgba(255,255,255,.025)}
.pt-page .stage .sn{font-family:'Fraunces',serif;color:var(--gold);font-size:1.5rem;line-height:1;flex:0 0 auto}
.pt-page .stage h4{font-family:'Inter';font-weight:600;color:#fff;font-size:1rem;margin-bottom:5px}
.pt-page .stage p{font-size:.86rem;color:rgba(246,242,233,.65)}
.pt-page .refund{margin-top:6px;padding:18px 22px;border-left:2px solid var(--gold);background:rgba(200,168,98,.08);font-size:.86rem;color:rgba(246,242,233,.8);border-radius:0 10px 10px 0}
.pt-page .cost-table{border:1px solid var(--line-dark);border-radius:14px;overflow:hidden}
.pt-page .cost-table .ctr{display:grid;grid-template-columns:1.2fr 1fr;border-bottom:1px solid var(--line-dark)}
.pt-page .cost-table .ctr:last-child{border-bottom:0}
.pt-page .cost-table .ctr.tophead{grid-template-columns:1fr}
.pt-page .cost-table .ctr.tophead > div{background:rgba(200,168,98,.12);color:var(--gold-bright);font-family:'Fraunces';font-size:1.3rem;padding:22px 24px}
.pt-page .cost-table .ctr > div{padding:16px 24px}
.pt-page .cost-table .cl{color:rgba(246,242,233,.78);font-size:.9rem}
.pt-page .cost-table .cr{color:#fff;font-weight:600;text-align:right;font-size:.92rem;border-left:1px solid var(--line-dark)}
.pt-page .cost-table .cr small{display:block;font-weight:400;color:rgba(246,242,233,.55);font-size:.78rem}

/* ============ DOCUMENTS ============ */
.pt-page .docs{background:var(--ivory)}
.pt-page .docs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:10px}
.pt-page .doc{display:flex;gap:14px;align-items:center;padding:18px 22px;background:var(--warm-white);border:1px solid var(--line);border-radius:12px;font-size:.92rem;color:var(--navy);font-weight:500}
.pt-page .doc .ic{color:var(--gold);flex:0 0 auto}

/* ============ TIMELINE ============ */
.pt-page .timeline{background:var(--warm-white)}
.pt-page .tl{position:relative;margin-top:20px}
.pt-page .tl::before{content:"";position:absolute;left:23px;top:10px;bottom:10px;width:1px;background:linear-gradient(var(--gold),var(--line))}
.pt-page .tl-item{display:grid;grid-template-columns:48px 1fr;gap:28px;padding:18px 0 36px;position:relative}
.pt-page .tl-dot{width:48px;height:48px;border-radius:50%;background:var(--ivory);border:1px solid var(--gold);color:var(--navy);display:grid;place-items:center;font-family:'Fraunces';font-size:1.15rem;z-index:1}
.pt-page .tl-body .when{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:5px}
.pt-page .tl-body h3{font-size:1.32rem;color:var(--navy);margin-bottom:8px}
.pt-page .tl-body p{font-size:.95rem;color:var(--muted);max-width:68ch}

/* ============ VALIDITY / FAMILY split ============ */
.pt-page .split{background:var(--ivory)}
.pt-page .split-grid{display:grid;grid-template-columns:1fr 1fr;gap:30px}
.pt-page .panel{border-radius:var(--r);padding:44px;border:1px solid var(--line)}
.pt-page .panel.dark{background:var(--navy);color:#fff;border-color:var(--navy)}
.pt-page .panel.light{background:var(--warm-white)}
.pt-page .panel h3{font-size:1.7rem;margin-bottom:14px;color:var(--navy)}
.pt-page .panel.dark h3{color:#fff}
.pt-page .panel p{color:var(--muted);font-size:.96rem;margin-bottom:14px}
.pt-page .panel.dark p{color:rgba(246,242,233,.74)}
.pt-page .timeline-mini{display:flex;align-items:center;gap:14px;margin:22px 0;flex-wrap:wrap}
.pt-page .tmini{flex:1;min-width:120px;background:rgba(200,168,98,.1);border:1px solid var(--line-dark);border-radius:12px;padding:16px 18px}
.pt-page .tmini .y{font-family:'Fraunces';font-size:1.5rem;color:var(--gold-bright)}
.pt-page .tmini .d{font-size:.78rem;color:rgba(246,242,233,.7);margin-top:3px}
.pt-page .panel.light .tmini{background:var(--ivory);border-color:var(--line)}
.pt-page .panel.light .tmini .y{color:var(--navy)}
.pt-page .panel.light .tmini .d{color:var(--muted)}
.pt-page .fam-list{list-style:none;margin-top:8px}
.pt-page .fam-list li{padding:14px 0;border-bottom:1px solid var(--line);display:flex;gap:12px;align-items:flex-start;font-size:.95rem}
.pt-page .fam-list li:last-child{border-bottom:0}
.pt-page .fam-list .ic{color:var(--gold);flex:0 0 auto;margin-top:3px}
.pt-page .fam-list b{color:var(--navy)}

/* ============ TAX ============ */
.pt-page .tax{background:var(--warm-white)}
.pt-page .tax-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;margin-top:8px}
.pt-page .tax-card{padding:32px;border:1px solid var(--line);border-radius:16px;background:var(--ivory)}
.pt-page .tax-card .ic{color:var(--gold);margin-bottom:14px}
.pt-page .tax-card h3{font-size:1.2rem;color:var(--navy);margin-bottom:8px}
.pt-page .tax-card p{font-size:.9rem;color:var(--muted)}
.pt-page .tax-note{margin-top:26px;font-size:.85rem;color:var(--muted);font-style:italic;border-top:1px solid var(--line);padding-top:20px}

/* ============ LIFE / WHY PORTUGAL ============ */
.pt-page .life{position:relative;color:#fff;overflow:hidden}
.pt-page .life .wrap{position:relative;z-index:2}
.pt-page .life-bg{position:absolute;inset:0;z-index:0}
.pt-page .life-bg img{width:100%;height:100%;object-fit:cover}
.pt-page .life-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,rgba(7,21,39,.92),rgba(7,21,39,.6) 60%,rgba(11,31,58,.4))}
.pt-page .life .section-head{position:relative;z-index:2}
.pt-page .life .section-head h2{color:#fff !important}
.pt-page .life-lead{position:relative;z-index:2;font-family:'Fraunces';font-size:1.3rem;font-weight:300;line-height:1.55;max-width:58ch;color:rgba(246,242,233,.96)}
.pt-page .life-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:54px}
.pt-page .lstat{border-top:1px solid var(--line-dark);padding-top:18px}
.pt-page .lstat .n{font-family:'Fraunces';font-size:2.2rem;color:var(--gold-bright)}
.pt-page .lstat .l{font-size:.84rem;color:rgba(246,242,233,.84);margin-top:4px}

/* ============ WHY LANGMA ============ */
.pt-page .langma{background:var(--navy);color:#fff}
.pt-page .langma .section-head h2{color:#fff}
.pt-page .langma .section-head p{color:rgba(246,242,233,.72)}
.pt-page .lg-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.pt-page .lg-card{border:1px solid var(--line-dark);border-radius:16px;padding:32px 28px;transition:background .4s,transform .4s}
.pt-page .lg-card:hover{background:rgba(200,168,98,.06);transform:translateY(-5px)}
.pt-page .lg-card .ic{width:46px;height:46px;border-radius:12px;border:1px solid var(--gold);color:var(--gold);display:grid;place-items:center;margin-bottom:20px}
.pt-page .lg-card h3{font-size:1.2rem;color:#fff;margin-bottom:8px;font-weight:500}
.pt-page .lg-card p{font-size:.88rem;color:rgba(246,242,233,.68)}
.pt-page .lg-quote{margin-top:54px;border-top:1px solid var(--line-dark);padding-top:46px;display:grid;grid-template-columns:auto 1fr;gap:34px;align-items:center}
.pt-page .lg-quote .mark{font-family:'Fraunces';font-size:5rem;color:var(--gold);line-height:.6}
.pt-page .lg-quote blockquote{font-family:'Fraunces';font-size:1.5rem;font-weight:300;line-height:1.45;color:#fff;font-style:italic}
.pt-page .lg-quote cite{display:block;margin-top:16px;font-style:normal;font-size:.84rem;letter-spacing:.06em;color:var(--gold-soft)}

/* ============ FAQ ============ */
.pt-page .faq{background:var(--ivory)}
.pt-page .faq-list{max-width:880px;margin:0 auto}
.pt-page .faq-item{border-bottom:1px solid var(--line)}
.pt-page .faq-q{width:100%;background:none;border:0;text-align:left;cursor:pointer;padding:26px 50px 26px 0;font-family:'Fraunces';font-size:1.22rem;color:var(--navy);position:relative;display:flex;justify-content:space-between;gap:20px}
.pt-page .faq-q .pm{position:absolute;right:4px;top:50%;transform:translateY(-50%);width:24px;height:24px;flex:0 0 auto}
.pt-page .faq-q .pm::before,.pt-page .faq-q .pm::after{content:"";position:absolute;background:var(--gold);transition:transform .3s}
.pt-page .faq-q .pm::before{top:11px;left:2px;width:20px;height:2px}
.pt-page .faq-q .pm::after{left:11px;top:2px;width:2px;height:20px}
.pt-page .faq-item.open .pm::after{transform:scaleY(0)}
.pt-page .faq-a{max-height:0;overflow:hidden;transition:max-height .45s ease}
.pt-page .faq-a p{padding:0 50px 26px 0;color:var(--muted);font-size:.97rem}

/* ============ CONSULT / FORM ============ */
.pt-page .consult{position:relative;color:#fff;overflow:hidden}
.pt-page .consult .wrap{position:relative;z-index:2}
.pt-page .consult-bg{position:absolute;inset:0;z-index:0}
.pt-page .consult-bg img{width:100%;height:100%;object-fit:cover;object-position:center 40%}
.pt-page .consult-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(120deg,rgba(7,21,39,.96),rgba(7,21,39,.86))}
.pt-page .consult-grid{display:grid;grid-template-columns:1fr 1.05fr;gap:64px;align-items:center}
.pt-page .consult-copy{position:relative;z-index:2}
.pt-page .consult-copy h2{font-size:clamp(2rem,4.4vw,3.2rem);color:#fff !important;margin:18px 0 20px}
.pt-page .consult-copy p{color:rgba(246,242,233,.92);font-size:1.05rem;margin-bottom:26px;max-width:48ch}
.pt-page .consult-bullets{list-style:none;display:flex;flex-direction:column;gap:14px;margin-top:10px}
.pt-page .consult-bullets li{display:flex;gap:13px;align-items:center;font-size:.96rem;color:rgba(246,242,233,.94)}
.pt-page .consult-bullets .ic{color:var(--gold)}
.pt-page .form-card{position:relative;z-index:2;background:var(--warm-white);border-radius:22px;padding:42px;box-shadow:var(--shadow-lg);color:var(--ink)}
.pt-page .form-card h3{font-size:1.6rem;color:var(--navy);margin-bottom:6px}
.pt-page .form-card .fsub{color:var(--muted);font-size:.9rem;margin-bottom:26px}
.pt-page .field{margin-bottom:18px}
.pt-page .field label{display:block;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:var(--navy);font-weight:600;margin-bottom:7px}
.pt-page .field input,.pt-page .field select,.pt-page .field textarea{
  width:100%;padding:13px 16px;border:1px solid var(--line);border-radius:11px;font-family:'Inter';font-size:.95rem;
  background:var(--warm-white);color:var(--ink);transition:border-color .3s,box-shadow .3s;
}
.pt-page .field input:focus,.pt-page .field select:focus,.pt-page .field textarea:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(200,168,98,.18)}
.pt-page .field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.pt-page .form-card button{width:100%;justify-content:center;margin-top:8px}
.pt-page .form-consent{font-size:.74rem;color:var(--muted-light);margin-top:14px;text-align:center}

/* ============ OFFICE VISIT ============ */
.pt-page .office{position:relative;background:var(--navy-deep);color:var(--warm-white);overflow:hidden}
.pt-page .office::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 80% 20%,rgba(200,168,98,.12),transparent 60%)}
.pt-page .office .wrap{position:relative}
.pt-page .office-grid{display:grid;grid-template-columns:1fr 1.05fr;gap:64px;align-items:start}
.pt-page .office-copy h2{color:#fff;margin:18px 0 18px}
.pt-page .office-copy p.lead{color:rgba(246,242,233,.78);font-size:1.05rem;max-width:46ch;margin-bottom:34px}
.pt-page .office-details{display:flex;flex-direction:column;gap:22px;margin-bottom:8px}
.pt-page .office-item{display:flex;gap:16px;align-items:flex-start}
.pt-page .office-item .oic{flex:none;width:42px;height:42px;border-radius:50%;border:1px solid rgba(231,214,174,.35);display:flex;align-items:center;justify-content:center;color:var(--gold-bright);font-size:1.05rem}
.pt-page .office-item h4{font-family:'Inter',sans-serif;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold-bright);font-weight:600;margin-bottom:6px}
.pt-page .office-item p,.pt-page .office-item a{color:rgba(246,242,233,.86);font-size:.98rem;line-height:1.55}
.pt-page .office-item a{text-decoration:none}
.pt-page .office-item a:hover{color:var(--gold-bright)}
.pt-page .booking-card{background:var(--warm-white);border-radius:22px;padding:42px;box-shadow:var(--shadow-lg);color:var(--ink)}
.pt-page .booking-card h3{font-size:1.5rem;color:var(--navy);margin-bottom:6px}
.pt-page .booking-card .fsub{color:var(--muted);font-size:.9rem;margin-bottom:26px}
.pt-page .visit-types{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px}
.pt-page .vtype{position:relative}
.pt-page .vtype input{position:absolute;opacity:0;inset:0;cursor:pointer}
.pt-page .vtype span{display:block;border:1px solid var(--line);border-radius:10px;padding:11px 12px;font-size:.86rem;color:var(--navy);font-weight:500;text-align:center;transition:.2s}
.pt-page .vtype input:checked + span{border-color:var(--gold);background:rgba(200,168,98,.1);color:var(--navy)}
.pt-page .vtype input:focus-visible + span{outline:2px solid var(--gold);outline-offset:2px}
.pt-page .form-success{display:none;text-align:center;padding:30px 10px}
.pt-page .form-success.show{display:block}
.pt-page .form-success .tick{width:64px;height:64px;border-radius:50%;background:var(--gold);color:var(--navy-deep);display:grid;place-items:center;margin:0 auto 18px}
.pt-page .form-success h3{margin-bottom:8px}

/* ============ FOOTER ============ */
.pt-page footer{background:var(--navy-deep);color:rgba(246,242,233,.7);padding:74px 0 30px}
.pt-page .foot-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1.3fr;gap:40px;padding-bottom:50px;border-bottom:1px solid var(--line-dark)}
.pt-page .foot-brand .mark{font-family:'Fraunces';font-size:1.6rem;color:#fff}
.pt-page .foot-brand .mark b{color:var(--gold);font-weight:500}
.pt-page .foot-brand p{font-size:.88rem;margin-top:16px;max-width:34ch;color:rgba(246,242,233,.6)}
.pt-page .foot-col h4{font-family:'Inter';font-size:.74rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:18px;font-weight:600}
.pt-page .foot-col a{display:block;font-size:.9rem;margin-bottom:11px;color:rgba(246,242,233,.7);transition:color .3s}
.pt-page .foot-col a:hover{color:var(--gold-bright)}
.pt-page .foot-contact p{font-size:.9rem;margin-bottom:10px;color:rgba(246,242,233,.7)}
.pt-page .foot-contact a{color:var(--gold-soft)}
.pt-page .foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:26px;gap:20px;flex-wrap:wrap;font-size:.78rem;color:rgba(246,242,233,.45)}
.pt-page .foot-bottom .legal{display:flex;gap:22px;flex-wrap:wrap}
.pt-page .disclaimer{font-size:.72rem;color:rgba(246,242,233,.38);margin-top:22px;max-width:90ch;line-height:1.6}

/* ============ RESPONSIVE ============ */
@media (max-width:980px){
  .pt-page .nav-links{position:fixed;inset:0 0 0 auto;width:min(82vw,340px);background:var(--navy-deep);flex-direction:column;justify-content:center;gap:30px;transform:translateX(100%);transition:transform .45s cubic-bezier(.2,.8,.2,1);padding:40px;border-left:1px solid var(--line-dark)}
  .pt-page .nav-links.open{transform:none}
  .pt-page .nav-toggle{display:flex}
  .pt-page header.nav.solid .nav-toggle span{background:var(--gold)}
  .pt-page .ov-grid,.pt-page .about-top,.pt-page .cost-layout,.pt-page .consult-grid,.pt-page .split-grid,.pt-page .elig-grid,.pt-page .lg-quote,.pt-page .office-grid{grid-template-columns:1fr}
  .pt-page .ov-figure{order:-1}
  .pt-page .hero .wrap{grid-template-columns:1fr;padding-top:128px}
  .pt-page .hero-media{order:-1}
  .pt-page .hero-media-card{aspect-ratio:16/10;max-width:520px}
  .pt-page .hero-content{max-width:none}
  .pt-page .lg-quote{gap:14px}
  .pt-page .lg-quote .mark{font-size:3rem}
}
@media (max-width:820px){
  .pt-page .section{padding:74px 0}
  .pt-page .trust-grid{grid-template-columns:1fr 1fr;gap:26px}
  .pt-page .about-cards,.pt-page .tax-grid,.pt-page .docs-grid{grid-template-columns:1fr 1fr}
  .pt-page .lg-grid{grid-template-columns:1fr 1fr}
  .pt-page .uni-card{grid-column:span 6}
  .pt-page .adv-list{grid-template-columns:1fr}
  .pt-page .adv-item,.pt-page .adv-item:nth-child(odd),.pt-page .adv-item:nth-child(even){padding:30px 0;border-right:0}
  .pt-page .life-stats{grid-template-columns:1fr 1fr}
  .pt-page .ctable .crow{grid-template-columns:1fr}
  .pt-page .ctable .crow > div{border-bottom:1px solid var(--line)}
  .pt-page .ctable .crow.head{display:none}
  .pt-page .ctable .cv::before{content:attr(data-l);font-weight:600;color:var(--navy);margin-right:8px}
  .pt-page .hstat{padding-right:24px;margin-right:24px}
}
@media (max-width:560px){
  .pt-page .wrap{padding:0 20px}
  .pt-page .hero h1{font-size:2.4rem}
  .pt-page .trust-grid,.pt-page .about-cards,.pt-page .tax-grid,.pt-page .docs-grid,.pt-page .lg-grid,.pt-page .facts,.pt-page .field-row{grid-template-columns:1fr}
  .pt-page .uni-card{grid-column:span 12}
  .pt-page .life-stats{grid-template-columns:1fr 1fr}
  .pt-page .hstat{border-right:0;margin-right:0;padding:16px 0 0}
  .pt-page .hero-stats{gap:0}
  .pt-page .form-card,.pt-page .panel,.pt-page .elig-card,.pt-page .booking-card{padding:28px}
  .pt-page .visit-types{grid-template-columns:1fr}
  .pt-page .foot-grid{grid-template-columns:1fr 1fr}
}`}</style>
      <main>
  {/* ============ HERO ============ */}
  <section className="hero" id="top">
    <div className="hero-grain" />
    <div className="wrap">
      <div className="hero-content">
        <span className="eyebrow light reveal">Portugal · Global Talent Programme</span>
        <h1 className="reveal">Where exceptional talent<br />becomes <em>European</em> belonging.</h1>
        <p className="hero-lead reveal">A merit-based route to Portuguese residency, built for accomplished professionals, founders and innovators. No qualifying investment — your expertise is the asset. Langma International guides every step, from first conversation to residence card.</p>
        <div className="hero-actions reveal">
          <a href="#consult" className="btn btn-gold">Begin your assessment <span className="arr">→</span></a>
          <a href="#about" className="btn btn-ghost">Explore the programme</a>
        </div>
        <div className="hero-stats reveal">
          <div className="hstat"><div className="n">From €170,000</div><div className="l">All-inclusive engagement</div></div>
          <div className="hstat"><div className="n">4+ months</div><div className="l">To residency</div></div>
          <div className="hstat"><div className="n">100%</div><div className="l">Approval rate</div></div>
          <div className="hstat"><div className="n">2 years</div><div className="l">First residence permit</div></div>
        </div>
      </div>
      <div className="hero-media reveal">
        <div className="hero-media-card">
          <img src="https://images.unsplash.com/photo-1748279944004-f1d733dc711b?auto=format&fit=crop&w=1400&q=80" alt="Lisbon skyline glowing under a sunset over the Tagus river, Portugal" fetchPriority="high" />
          <span className="hero-tag"><span className="dot" />Lisbon, Portugal</span>
        </div>
      </div>
    </div>
    <div className="scroll-hint"><span>Scroll</span><span className="bar" /></div>
  </section>
  {/* ============ TRUST ============ */}
  <section className="trust" aria-label="Why clients choose this route">
    <div className="wrap trust-grid">
      <div className="trust-item reveal">
        <div className="ic" aria-hidden="true">✦</div>
        <div><h4>A residency earned on merit</h4><p>Qualification rests on your career, not a property purchase or capital transfer.</p></div>
      </div>
      <div className="trust-item reveal">
        <div className="ic" aria-hidden="true">⚑</div>
        <div><h4>Filed inside Portugal</h4><p>Submitted directly to AIMA with full legal representation — no consular queue.</p></div>
      </div>
      <div className="trust-item reveal">
        <div className="ic" aria-hidden="true">⊕</div>
        <div><h4>Your family, one application</h4><p>Spouse or partner and dependent children are included under a single engagement.</p></div>
      </div>
      <div className="trust-item reveal">
        <div className="ic" aria-hidden="true">↻</div>
        <div><h4>Milestone-based fees</h4><p>A transparent, staged structure with later payments protected by refund terms.</p></div>
      </div>
    </div>
  </section>
  {/* ============ COUNTRY OVERVIEW ============ */}
  <section className="section overview" id="overview">
    <div className="wrap ov-grid">
      <div className="ov-figure reveal">
        <img src="https://images.unsplash.com/photo-1762294946283-6921938e9937?auto=format&fit=crop&w=1400&q=80" alt="Aerial view of the Dom Luís I Bridge spanning the Douro River in Porto, Portugal" loading="lazy" />
        <div className="cap"><b>Porto, Douro Valley</b><span>Atlantic Europe</span></div>
      </div>
      <div className="ov-copy">
        <span className="eyebrow reveal">The Setting</span>
        <h2 className="reveal">A nation that has quietly become Europe's most magnetic address.</h2>
        <p className="reveal">On the western edge of the continent, Portugal pairs the assurance of full European Union membership with a pace of life that feels almost indulgent. It is a long-standing member of the Schengen Area, an English-comfortable society, and a country where ancient harbours now share the skyline with research campuses and venture-backed studios.</p>
        <p className="reveal">For the internationally mobile professional, the appeal is practical as much as romantic: a stable, innovation-friendly economy, more than three hundred days of sun across much of the country, a healthcare system of genuine depth, and connectivity that places London, Paris and New York within easy reach.</p>
        <div className="facts reveal">
          <div className="fact"><div className="k">Currency</div><div className="v">Euro €<small>Single EU currency</small></div></div>
          <div className="fact"><div className="k">Union</div><div className="v">EU &amp; Schengen<small>Visa-free across 29 states</small></div></div>
          <div className="fact"><div className="k">Language</div><div className="v">Portuguese<small>English widely spoken</small></div></div>
          <div className="fact"><div className="k">Lifestyle</div><div className="v">Atlantic coast<small>Mild climate, low crime</small></div></div>
        </div>
      </div>
    </div>
  </section>
  {/* ============ ABOUT THE PROGRAMME (NEW SECTION) ============ */}
  <section className="section about" id="about">
    <div className="wrap">
      <div className="about-top">
        <div>
          <span className="eyebrow reveal">About the Programme</span>
          <h2 className="reveal">The Global Talent Programme, explained without the jargon.</h2>
        </div>
        <p className="lead reveal">Portugal designed this route for the people most economies compete for — experienced professionals, entrepreneurs and specialists whose knowledge strengthens the country's universities and innovation ecosystem. In return for that contribution, it offers a clear, dignified path to European residency.</p>
      </div>
      <div className="about-cards">
        <div className="acard reveal">
          <div className="num"><span>01</span><span>What it is</span></div>
          <h3>Residency by recognition</h3>
          <p>A government-recognised permit granted on the strength of your career and a formal collaboration with a Portuguese university — not on a property purchase or fund subscription. Your expertise is what qualifies you.</p>
        </div>
        <div className="acard reveal">
          <div className="num"><span>02</span><span>Why Portugal built it</span></div>
          <h3>An investment in knowledge</h3>
          <p>Rather than importing only capital, Portugal chose to attract human capital — mentors, researchers and founders who can elevate its academic institutions and feed a fast-maturing technology economy.</p>
        </div>
        <div className="acard reveal">
          <div className="num"><span>03</span><span>Who it suits</span></div>
          <h3>The accomplished professional</h3>
          <p>Those holding a university degree with three to five years of standing in business, technology, medicine, research or the creative industries — people whose work travels well across borders.</p>
        </div>
        <div className="acard reveal">
          <div className="num"><span>04</span><span>Why they choose it</span></div>
          <h3>Speed without compromise</h3>
          <p>Residency is typically secured in four to six months, filed inside Portugal with full legal representation, and reached without the long waits that now characterise traditional investment routes.</p>
        </div>
        <div className="acard reveal">
          <div className="num"><span>05</span><span>Its wider significance</span></div>
          <h3>A bridge, not a transaction</h3>
          <p>Each participant becomes formally affiliated with a Portuguese institution — an academic relationship that carries prestige, opens networks across the EU, and leaves a tangible professional legacy.</p>
        </div>
        <div className="acard reveal">
          <div className="num"><span>06</span><span>What it unlocks</span></div>
          <h3>A platform for the future</h3>
          <p>Beyond the residence card lies the full European proposition — freedom of movement across Schengen, schooling and healthcare for the family, and, in time, the option of Portuguese citizenship.</p>
        </div>
      </div>
    </div>
  </section>
  {/* ============ KEY ADVANTAGES ============ */}
  <section className="section adv">
    <div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow light">The Case for the Programme</span>
        <h2>Five advantages that set this route apart.</h2>
        <p>Every benefit below reflects the programme as it operates today — measured, predictable and built around the realities of an international career.</p>
      </div>
      <div className="adv-list">
        <div className="adv-item reveal"><div className="idx">I</div><div><h3>A 100% approval record</h3><p>Applications are pre-screened for eligibility and compliance, then advanced in close coordination with AIMA and accredited universities — which is why the programme maintains a full approval rate.</p></div></div>
        <div className="adv-item reveal"><div className="idx">II</div><div><h3>Fast and foreseeable</h3><p>Residency is granted in roughly four to six months — markedly quicker than Golden Visa or business routes — because the case is handled in Portugal through AIMA appointments, side-stepping the consular stage of a traditional visa.</p></div></div>
        <div className="adv-item reveal"><div className="idx">III</div><div><h3>Freedom across Schengen</h3><p>As a Portuguese resident you may travel visa-free throughout the 29 countries of the Schengen Area, spending up to 90 days within any 180-day period.</p></div></div>
        <div className="adv-item reveal"><div className="idx">IV</div><div><h3>A stay requirement that flexes</h3><p>Time in Portugal is tied to your involvement in the university project rather than a fixed day-count. Status is maintained through ongoing cooperation — practical for those who live and work internationally.</p></div></div>
        <div className="adv-item reveal"><div className="idx">V</div><div><h3>A route towards EU citizenship</h3><p>After ten years from your first permit you may apply for Portuguese citizenship; certain nationalities qualify after seven. A child born in Portugal to foreign parents may also be eligible once a parent has held residence for five years.</p></div></div>
        <div className="adv-item reveal"><div className="idx">VI</div><div><h3>One engagement, the whole family</h3><p>The core fee already covers your spouse or partner and two dependent children, with their residency pursued under a single, coordinated process.</p></div></div>
      </div>
    </div>
  </section>
  {/* ============ COMPARISON ============ */}
  <section className="section compare">
    <div className="wrap">
      <div className="section-head center reveal">
        <span className="eyebrow center">A Clear-Eyed Comparison</span>
        <h2>Global Talent Programme, measured against the Golden Visa.</h2>
        <p>Both lead to European residency. For professionals who value speed, flexibility and cost, the difference is rarely close.</p>
      </div>
      <div className="ctable reveal">
        <div className="crow head">
          <div>Terms &amp; features</div>
          <div className="hl">Global Talent Programme</div>
          <div>Golden Visa</div>
        </div>
        <div className="crow"><div className="ck">Financial commitment</div><div className="cv featured" data-l="Global Talent">From €170,000</div><div className="cv" data-l="Golden Visa">From €250,000</div></div>
        <div className="crow"><div className="ck">Time to residency</div><div className="cv featured" data-l="Global Talent">4+ months</div><div className="cv" data-l="Golden Visa">12+ months</div></div>
        <div className="crow"><div className="ck">Stay requirement</div><div className="cv featured" data-l="Global Talent">Flexible</div><div className="cv" data-l="Golden Visa">7 days a year</div></div>
        <div className="crow"><div className="ck">First permit validity</div><div className="cv featured" data-l="Global Talent">2 years</div><div className="cv" data-l="Golden Visa">2 years</div></div>
        <div className="crow"><div className="ck">Family eligibility</div><div className="cv featured" data-l="Global Talent">Spouse/partner &amp; children under 26</div><div className="cv" data-l="Golden Visa">Spouse/partner, children under 26, parents</div></div>
        <div className="crow"><div className="ck">Approval likelihood</div><div className="cv featured" data-l="Global Talent">High</div><div className="cv" data-l="Golden Visa">Moderate</div></div>
      </div>
      <p className="compare-note reveal">Figures reflect the headline requirements of each route. Final costs depend on family composition and individual circumstances.</p>
    </div>
  </section>
  {/* ============ ELIGIBILITY ============ */}
  <section className="section elig" id="eligibility">
    <div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Eligibility</span>
        <h2>Designed for the credentialed and the curious.</h2>
        <p>The criteria are precise but attainable — the kind a serious professional will already meet. Here is exactly what is required.</p>
      </div>
      <div className="elig-grid">
        <div className="elig-card reveal">
          <h3>The main applicant</h3>
          <p className="sub">Six straightforward conditions define eligibility.</p>
          <ul className="req-list">
            <li><span className="chk">✓</span><span className="txt"><b>A bachelor's degree or higher</b><span>Formal academic qualification recognised for the programme.</span></span></li>
            <li><span className="chk">✓</span><span className="txt"><b>Three to five years of experience</b><span>A demonstrable track record in your professional field.</span></span></li>
            <li><span className="chk">✓</span><span className="txt"><b>A clean criminal record</b><span>No criminal history, confirmed through standard checks.</span></span></li>
            <li><span className="chk">✓</span><span className="txt"><b>Savings of €15,000 or more</b><span>Evidence of personal financial stability.</span></span></li>
            <li><span className="chk">✓</span><span className="txt"><b>A residential address in Portugal</b><span>Rented or owned — no purchase is required to qualify.</span></span></li>
            <li><span className="chk">✓</span><span className="txt"><b>Health insurance from €35,000 cover</b><span>A policy meeting the minimum coverage threshold.</span></span></li>
          </ul>
        </div>
        <div className="elig-card who reveal">
          <h3>Who can apply</h3>
          <p className="sub">The programme is built for people whose expertise crosses borders.</p>
          <ul className="req-list">
            <li><span className="chk">✓</span><span className="txt"><b>Business leaders &amp; entrepreneurs</b><span>Founders and executives building or scaling ventures.</span></span></li>
            <li><span className="chk">✓</span><span className="txt"><b>Technology specialists</b><span>Engineers, scientists and product builders in fast-moving fields.</span></span></li>
            <li><span className="chk">✓</span><span className="txt"><b>Medical &amp; research professionals</b><span>Clinicians, academics and investigators of standing.</span></span></li>
            <li><span className="chk">✓</span><span className="txt"><b>Creative-industry experts</b><span>Established figures across design, media and the arts.</span></span></li>
            <li><span className="chk">✓</span><span className="txt"><b>Their immediate family</b><span>Spouse or partner, and children under 26 in full-time study.</span></span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  {/* ============ UNIVERSITY COLLABORATION ============ */}
  <section className="section uni">
    <div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">The University Partnership</span>
        <h2>At the heart of the programme: a genuine academic relationship.</h2>
        <p>Your profile is introduced to more than ten partner universities. The institution that selects you issues an official Letter of Commitment — and a collaboration begins that is far more than a formality.</p>
      </div>
      <div className="uni-grid">
        <div className="uni-card reveal"><div className="ic" aria-hidden="true">◈</div><h3>Recognised affiliation</h3><p>A formal connection to a Portuguese university adds prestige, validates your expertise and raises your visibility across Europe's academic and innovation circles.</p></div>
        <div className="uni-card reveal"><div className="ic" aria-hidden="true">⬡</div><h3>Networks that matter</h3><p>Collaboration opens the door to research groups, founders and faculty — contacts that extend naturally into the wider European Union.</p></div>
        <div className="uni-card reveal"><div className="ic" aria-hidden="true">✺</div><h3>A lasting contribution</h3><p>By mentoring students, advising start-ups or joining research teams, you help shape Portugal's innovation ecosystem and leave a professional legacy behind you.</p></div>
        <div className="uni-card reveal"><div className="ic" aria-hidden="true">⌖</div><h3>A stronger EU footing</h3><p>Academic cooperation provides a credible, respected basis for residency — and a platform to live, work and grow on the continent.</p></div>
        <div className="uni-card reveal"><div className="ic" aria-hidden="true">↺</div><h3>Participation that fits your life</h3><p>Contribute through online mentorship, guest lectures or on-site workshops. The format adapts to your schedule, not the other way around.</p></div>
        <div className="uni-card reveal"><div className="ic" aria-hidden="true">✦</div><h3>Meaningful, never onerous</h3><p>Engagement is real and rewarding, yet calibrated to remain compatible with an internationally mobile career.</p></div>
        <div className="uni-wide reveal">
          <div>
            <h3>More than ten partner universities review every profile.</h3>
            <p>We prepare and present your professional summary, then guide the matching process through to a signed Letter of Commitment.</p>
          </div>
          <a href="#consult" className="btn btn-gold">See if you qualify <span className="arr">→</span></a>
        </div>
      </div>
    </div>
  </section>
  {/* ============ COSTS ============ */}
  <section className="section costs" id="costs">
    <div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow light">The Investment</span>
        <h2>Transparent figures, structured around milestones.</h2>
        <p>The engagement is paid in three stages, so the bulk of your commitment follows real progress. Only the first payment is non-refundable, and the later payments are protected.</p>
      </div>
      <div className="cost-layout">
        <div>
          <div className="stages">
            <div className="stage reveal"><div className="sn">1</div><div><h4>€20,000 to begin</h4><p>Covers compliance, document preparation and university matching. This is the only non-refundable stage.</p></div></div>
            <div className="stage reveal"><div className="sn">2</div><div><h4>On the first milestone</h4><p>Released only once the agreed official milestone has been achieved — never before.</p></div></div>
            <div className="stage reveal"><div className="sn">3</div><div><h4>On the final milestone</h4><p>The closing payment, again tied to a confirmed official outcome in your case.</p></div></div>
          </div>
          <div className="refund reveal">Should AIMA decline the application or fail to renew residency, the later payments are refunded in full within 30 business days.</div>
        </div>
        <div className="cost-table reveal">
          <div className="ctr tophead"><div>From €170,000 — all-inclusive</div></div>
          <div className="ctr"><div className="cl">Programme participation fee</div><div className="cr">€170,000<small>single applicant &amp; families up to 4 · €5,000 per additional dependant from the 5th</small></div></div>
          <div className="ctr"><div className="cl">AIMA residence appointment</div><div className="cr">€397<small>per person</small></div></div>
          <div className="ctr"><div className="cl">Biometric fee</div><div className="cr">€406.90<small>per adult · €58.10 per minor</small></div></div>
          <div className="ctr"><div className="cl">Health insurance</div><div className="cr">€600<small>per year</small></div></div>
          <div className="ctr"><div className="cl">Property lease in Portugal</div><div className="cr">≈ €7,200<small>per year</small></div></div>
          <div className="ctr"><div className="cl">Notarisation &amp; translation</div><div className="cr">€2,000+<small>documents</small></div></div>
        </div>
      </div>
    </div>
  </section>
  {/* ============ DOCUMENTS ============ */}
  <section className="section docs">
    <div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Application Requirements</span>
        <h2>What you will need to prepare.</h2>
        <p>Your dedicated lawyer guides the gathering, translation and certification of every item — so nothing is missed and nothing is filed twice.</p>
      </div>
      <div className="docs-grid">
        <div className="doc reveal"><span className="ic">◷</span>Valid passport &amp; identity documents</div>
        <div className="doc reveal"><span className="ic">◷</span>Degree certificate &amp; professional CV</div>
        <div className="doc reveal"><span className="ic">◷</span>Proof of three to five years' experience</div>
        <div className="doc reveal"><span className="ic">◷</span>Criminal-record certificate</div>
        <div className="doc reveal"><span className="ic">◷</span>Evidence of €15,000+ in savings</div>
        <div className="doc reveal"><span className="ic">◷</span>Health insurance (€35,000+ cover)</div>
        <div className="doc reveal"><span className="ic">◷</span>Portuguese tax number (NIF)</div>
        <div className="doc reveal"><span className="ic">◷</span>Portuguese bank account</div>
        <div className="doc reveal"><span className="ic">◷</span>Proof of address — lease or ownership</div>
        <div className="doc reveal"><span className="ic">◷</span>University Letter of Commitment</div>
        <div className="doc reveal"><span className="ic">◷</span>Marriage or partnership certificate*</div>
        <div className="doc reveal"><span className="ic">◷</span>Children's documents &amp; study proof*</div>
      </div>
      <p className="compare-note reveal" style={{textAlign: 'left', marginTop: 18}}>*Required where family members are included. We also assist in obtaining your NIF and opening a Portuguese bank account as part of the process.</p>
    </div>
  </section>
  {/* ============ TIMELINE ============ */}
  <section className="section timeline" id="timeline">
    <div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">The Process</span>
        <h2>Six steps, roughly four months, fully accompanied.</h2>
        <p>From the first confidential check to the residence card in hand — here is precisely how the journey unfolds.</p>
      </div>
      <div className="tl">
        <div className="tl-item reveal"><div className="tl-dot">1</div><div className="tl-body"><div className="when">Day one</div><h3>Confidential assessment &amp; agreement</h3><p>A preliminary due-diligence review confirms there is nothing standing in the way of your application. Once cleared, we put a service agreement in place. The entire step is private.</p></div></div>
        <div className="tl-item reveal"><div className="tl-dot">2</div><div className="tl-body"><div className="when">≈ one month</div><h3>Assembling your file</h3><p>Your lawyer guides the collection, translation and certification of every document, and helps you obtain a Portuguese tax number (NIF) and open a local bank account.</p></div></div>
        <div className="tl-item reveal"><div className="tl-dot">3</div><div className="tl-body"><div className="when">Two to three weeks</div><h3>University matching</h3><p>Your professional summary is presented to more than ten partner universities. The institution that selects you issues an official Letter of Commitment confirming the collaboration.</p></div></div>
        <div className="tl-item reveal"><div className="tl-dot">4</div><div className="tl-body"><div className="when">≈ three months</div><h3>Filing for residency</h3><p>We submit the complete application directly to AIMA under power of attorney. On your first visit to Portugal you hand over originals, meet the university to sign the hosting agreement and complete in-person verification — all to a schedule we prepare for you.</p></div></div>
        <div className="tl-item reveal"><div className="tl-dot">5</div><div className="tl-body"><div className="when">One to 1.5 months to the card</div><h3>Biometrics &amp; your residence card</h3><p>You attend AIMA in person — accompanied by a lawyer and interpreter — to submit biometrics. The card is issued within four to six weeks and delivered to our Lisbon office for collection or courier.</p></div></div>
        <div className="tl-item reveal"><div className="tl-dot">6</div><div className="tl-body"><div className="when">Two to three months after approval</div><h3>Your family follows</h3><p>Once your card is issued, family members apply through reunification. We prepare and submit every document so your loved ones secure the same status and rights as you.</p></div></div>
      </div>
    </div>
  </section>
  {/* ============ VALIDITY + FAMILY ============ */}
  <section className="section split">
    <div className="wrap">
      <div className="split-grid">
        <div className="panel dark reveal">
          <span className="eyebrow light">Validity, Renewal &amp; Citizenship</span>
          <h3 style={{color: '#fff', marginTop: 14}}>Two years, then three — and a horizon beyond.</h3>
          <p>Your first residence permit is valid for two years and is renewed for a further three, giving five consecutive years of legal residence. The renewal after the first two years is already covered within your engagement.</p>
          <div className="timeline-mini">
            <div className="tmini"><div className="y">2 yrs</div><div className="d">First permit</div></div>
            <div className="tmini"><div className="y">+3 yrs</div><div className="d">Renewal</div></div>
            <div className="tmini"><div className="y">10 yrs</div><div className="d">Citizenship eligibility*</div></div>
          </div>
          <p>After ten years from your first permit you may apply for Portuguese citizenship. Under rules in force since 2026, nationals of EU and Portuguese-speaking countries may qualify in seven. A child born in Portugal to foreign parents can be eligible once a parent has held residence for five years.</p>
          <p style={{fontSize: '.8rem', color: 'rgba(246,242,233,.55)'}}>*Citizenship is subject to the requirements in force at the time of application, including language and residence conditions.</p>
        </div>
        <div className="panel light reveal">
          <span className="eyebrow">Family Inclusion</span>
          <h3 style={{marginTop: 14}}>Bring those who matter most.</h3>
          <p>The programme is built for families. Your core engagement already includes your spouse or partner and two dependent children — and the door remains open to others.</p>
          <ul className="fam-list">
            <li><span className="ic">◆</span><span><b>Spouse or partner</b> — included, in a recognised marriage or partnership.</span></li>
            <li><span className="ic">◆</span><span><b>Children under 18</b> — included as dependants.</span></li>
            <li><span className="ic">◆</span><span><b>Children aged 18–26</b> — included where they are in full-time study.</span></li>
            <li><span className="ic">◆</span><span><b>A third child, parents or adult children</b> — may be added for an additional fee, with parents and adult children over 26 applying separately.</span></li>
          </ul>
          <p style={{marginTop: 8}}>Beyond the fourth family member, each additional dependant is €5,000 from the fifth applicant onward.</p>
        </div>
      </div>
    </div>
  </section>
  {/* ============ TAX ============ */}
  <section className="section tax">
    <div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Tax Considerations</span>
        <h2>A residency that rewards good planning.</h2>
        <p>Becoming a Portuguese resident brings you within the country's tax framework. Handled well, it is an opportunity rather than a complication — and we connect you with certified specialists to handle it well.</p>
      </div>
      <div className="tax-grid">
        <div className="tax-card reveal"><div className="ic" aria-hidden="true">▤</div><h3>Understand your position</h3><p>Residency changes where and how you are taxed. Our partners explain your obligations clearly before you commit, so there are no surprises.</p></div>
        <div className="tax-card reveal"><div className="ic" aria-hidden="true">◫</div><h3>Plan with specialists</h3><p>Certified tax advisers review your circumstances under Portuguese and EU law and help you structure your affairs efficiently and compliantly.</p></div>
        <div className="tax-card reveal"><div className="ic" aria-hidden="true">◰</div><h3>Stay in good standing</h3><p>From obtaining your NIF to ongoing filings, we keep the administrative side in order so your status remains secure year after year.</p></div>
      </div>
      <p className="tax-note reveal">Tax outcomes depend on personal circumstances and current legislation. This overview is general information, not tax advice; Langma International arranges qualified specialist counsel for every client.</p>
    </div>
  </section>
  {/* ============ LIFE IN PORTUGAL ============ */}
  <section className="section life">
    <div className="life-bg">
      <img src="https://images.unsplash.com/photo-1754318090243-ff996799b84e?auto=format&fit=crop&w=2200&q=80" alt="The Atlantic ocean at sunset seen from a grassy cliffside on the Algarve coast, Portugal" loading="lazy" />
    </div>
    <div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow light">Life in Portugal</span>
        <h2>Why people who can live anywhere choose here.</h2>
      </div>
      <p className="life-lead reveal">Mornings that begin on the Atlantic and evenings that linger over dinner. Cities small enough to feel like home, yet wired into Europe's innovation economy. World-class healthcare, safe streets, internationally minded schools, and a cost of living that still leaves room to enjoy it. Portugal does not ask you to trade ambition for quality of life — it offers both.</p>
      <div className="life-stats">
        <div className="lstat reveal"><div className="n">Top 10</div><div className="l">Among the safest countries worldwide on the Global Peace Index</div></div>
        <div className="lstat reveal"><div className="n">300+</div><div className="l">Days of sunshine across much of the country</div></div>
        <div className="lstat reveal"><div className="n">29</div><div className="l">Schengen states open to you, visa-free</div></div>
        <div className="lstat reveal"><div className="n">EU</div><div className="l">Healthcare, education and mobility as standard</div></div>
      </div>
    </div>
  </section>
  {/* ============ WHY LANGMA ============ */}
  <section className="section langma">
    <div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow light">Why Langma International</span>
        <h2>The difference is in how it is handled.</h2>
        <p>A residency decision is among the most consequential a family makes. We treat it with the discretion, rigour and personal attention it deserves — and we stay with you long after the card is issued.</p>
      </div>
      <div className="lg-grid">
        <div className="lg-card reveal"><div className="ic" aria-hidden="true">◇</div><h3>Experienced</h3><p>Our advisers live and breathe global mobility, resolving the difficult cases quickly and seeing each engagement through from first call to final approval.</p></div>
        <div className="lg-card reveal"><div className="ic" aria-hidden="true">⚖</div><h3>Diligent</h3><p>A dedicated compliance review runs before anything is filed, identifying issues early and protecting you from avoidable risk of refusal.</p></div>
        <div className="lg-card reveal"><div className="ic" aria-hidden="true">☗</div><h3>Dedicated</h3><p>One team, one point of contact, every step of the way — answering even the trickiest questions with patience and precision.</p></div>
        <div className="lg-card reveal"><div className="ic" aria-hidden="true">⊘</div><h3>Confidential</h3><p>Your information and your plans are protected under strict confidentiality. Privacy is not a feature; it is the foundation of how we work.</p></div>
      </div>
      <div className="lg-quote reveal">
        <div className="mark">“</div>
        <div>
          <blockquote>With direct partnerships, local presence in Portugal and a team that knows the law intimately, we make the path to European residency feel considered, secure and entirely yours.</blockquote>
          <cite>— Langma International, Client Advisory</cite>
        </div>
      </div>
    </div>
  </section>
  {/* ============ FAQ ============ */}
  <section className="section faq" id="faq">
    <div className="wrap">
      <div className="section-head center reveal">
        <span className="eyebrow center">Questions, Answered</span>
        <h2>Everything you are likely to be wondering.</h2>
      </div>
      <div className="faq-list">
        <div className="faq-item reveal"><button className="faq-q">What exactly is the Global Talent Programme?<span className="pm" aria-hidden="true" /></button><div className="faq-a"><p>It is a government-recognised residency route based on professional merit and a formal collaboration with a Portuguese university. Instead of investing in property or funds, you contribute your expertise to academic and innovation projects to qualify for an EU residence permit.</p></div></div>
        <div className="faq-item reveal"><button className="faq-q">Is this a permanent residence permit?<span className="pm" aria-hidden="true" /></button><div className="faq-a"><p>Not at first. It grants temporary residency for two years, renewed for a further three. After ten years of continuous legal residence you may apply for citizenship — sooner for certain nationalities.</p></div></div>
        <div className="faq-item reveal"><button className="faq-q">How much does it cost in total?<span className="pm" aria-hidden="true" /></button><div className="faq-a"><p>The all-inclusive engagement starts at €170,000, covering the main applicant together with up to three dependants and including the renewal of residency after the first two years. State fees, insurance, a property lease and document costs apply in addition, and additional dependants beyond four are €5,000 each from the fifth applicant.</p></div></div>
        <div className="faq-item reveal"><button className="faq-q">How long does the whole process take?<span className="pm" aria-hidden="true" /></button><div className="faq-a"><p>On average about four months from signing the agreement to receiving the residence card, and generally complete within four to six months.</p></div></div>
        <div className="faq-item reveal"><button className="faq-q">Do I have to buy property?<span className="pm" aria-hidden="true" /></button><div className="faq-a"><p>No. This is not an investment visa — no real estate purchase or capital investment is required. You do need a residential address in Portugal, which can simply be rented.</p></div></div>
        <div className="faq-item reveal"><button className="faq-q">Is it difficult to be approved?<span className="pm" aria-hidden="true" /></button><div className="faq-a"><p>For eligible candidates with a clean background and relevant experience, the process is straightforward and predictable. Thanks to pre-screening and close coordination with AIMA and accredited universities, the programme maintains a 100% approval rate.</p></div></div>
        <div className="faq-item reveal"><button className="faq-q">Do I need to live in Portugal full time?<span className="pm" aria-hidden="true" /></button><div className="faq-a"><p>No. There is no rigid minimum-stay rule. The time you spend in Portugal depends on your level of participation in the university project, which keeps the programme practical for those who travel frequently.</p></div></div>
        <div className="faq-item reveal"><button className="faq-q">Can my family be included?<span className="pm" aria-hidden="true" /></button><div className="faq-a"><p>Yes. The main applicant may include a spouse or partner and up to two dependent children under 18, or full-time students under 26. A third child, parents or adult children can also be added for an additional fee.</p></div></div>
      </div>
    </div>
  </section>
  {/* ============ PRIVATE OFFICE VISIT ============ */}
  <section className="section office" id="office">
    <div className="wrap office-grid">
      <div className="office-copy reveal">
        <span className="eyebrow light">Meet Us in Person</span>
        <h2>Visit Our Private Advisory Office</h2>
        <p className="lead">For those who prefer to begin in person, our Delhi advisory office welcomes private appointments — a quiet, confidential setting to discuss your eligibility, costs and timeline face to face.</p>
        <div className="office-details">
          <div className="office-item">
            <span className="oic" aria-hidden="true">⌂</span>
            <div><h4>Office Address</h4><p>E 73, South Extension Part-1<br />New Delhi – 110049<br />India</p></div>
          </div>
          <div className="office-item">
            <span className="oic" aria-hidden="true">☎</span>
            <div><h4>Phone</h4><p><a href="tel:+919810117094">+91 98101 17094</a></p></div>
          </div>
          <div className="office-item">
            <span className="oic" aria-hidden="true">✉</span>
            <div><h4>Email</h4><p><a href="mailto:info@langmainternational.com">info@langmainternational.com</a></p></div>
          </div>
        </div>
      </div>
      <div className="booking-card reveal">
        <form id="visitForm" noValidate onSubmit={handleOfficeSubmit}>
          <h3>Book Office Visit</h3>
          <p className="fsub">Reserve a private appointment at our Delhi office.</p>
          <div className="field-row">
            <div className="field"><label htmlFor="ov-date">Preferred date</label><input id="ov-date" name="visitDate" type="date" min={todayStr()} required /></div>
            <div className="field"><label htmlFor="ov-time">Preferred time</label><input id="ov-time" name="visitTime" type="time" required /></div>
          </div>
          <div className="field">
            <label htmlFor="ov-name">Full name</label>
            <input id="ov-name" name="visitName" type="text" required placeholder="Your full name" />
          </div>
          <div className="field-row">
            <div className="field"><label htmlFor="ov-email">Email</label><input id="ov-email" name="visitEmail" type="email" required placeholder="you@example.com" /></div>
            <div className="field"><label htmlFor="ov-phone">Phone</label><input id="ov-phone" name="visitPhone" type="tel" placeholder="+__ ___ ___ ___" /></div>
          </div>
          <div className="field">
            <label>Visit type</label>
            <div className="visit-types">
              <label className="vtype"><input type="radio" name="visitType" defaultValue="Private Consultation" defaultChecked /><span>Private Consultation</span></label>
              <label className="vtype"><input type="radio" name="visitType" defaultValue="Business Meeting" /><span>Business Meeting</span></label>
              <label className="vtype"><input type="radio" name="visitType" defaultValue="Family Consultation" /><span>Family Consultation</span></label>
              <label className="vtype"><input type="radio" name="visitType" defaultValue="Investment Consultation" /><span>Investment Consultation</span></label>
            </div>
          </div>
          <div className="field"><label htmlFor="vmsg">Message</label><textarea id="vmsg" name="visitMessage" rows={3} placeholder="Anything you'd like us to know beforehand (optional)" defaultValue={""} /></div>
          <button type="submit" className="btn btn-gold" disabled={officeLoading}>{officeLoading ? 'Sending...' : <>Book Office Visit <span className="arr">→</span></>}</button>
          <p className="form-consent">By booking, you agree to be contacted by Langma International to confirm your appointment.</p>
          {(officeMsg || officeSubmitted) && (
            <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 4, textAlign: 'center', fontSize: 14, ...(officeSuccess ? { background: 'rgba(47,199,161,.12)', border: '1px solid var(--gold)', color: 'var(--navy-deep)' } : { background: 'rgba(220,38,38,.08)', border: '1px solid #ef4444', color: '#b91c1c' }) }}>
              {officeMsg || 'Thank you. Our Delhi advisory team will confirm your appointment shortly.'}
            </div>
          )}
        </form>
      </div>
    </div>
  </section>
  {/* ============ CONSULT / FORM ============ */}
  <section className="section consult" id="consult">
    <div className="consult-bg">
      <img src="https://images.unsplash.com/photo-1748279944004-f1d733dc711b?auto=format&fit=crop&w=2000&q=80" alt="Lisbon at dusk over the river" loading="lazy" />
    </div>
    <div className="wrap consult-grid">
      <div className="consult-copy reveal">
        <span className="eyebrow light">Begin the Conversation</span>
        <h2>A private consultation, at no cost.</h2>
        <p>Tell us a little about your background and ambitions. A Langma adviser will assess your eligibility, outline likely timelines and costs, and answer your questions — with complete discretion and no obligation.</p>
        <ul className="consult-bullets">
          <li><span className="ic">✓</span> A confidential review of your eligibility</li>
          <li><span className="ic">✓</span> A clear, personalised cost and timeline estimate</li>
          <li><span className="ic">✓</span> Direct answers from a specialist adviser</li>
        </ul>
      </div>
      <div className="form-card reveal">
        <form id="leadForm" noValidate onSubmit={handleLeadSubmit}>
          <h3>Request your assessment</h3>
          <p className="fsub">We typically respond within one business day.</p>
          <div className="field-row">
            <div className="field"><label htmlFor="fn">First name</label><input id="fn" name="firstName" type="text" required placeholder="Your first name" /></div>
            <div className="field"><label htmlFor="ln">Last name</label><input id="ln" name="lastName" type="text" required placeholder="Your last name" /></div>
          </div>
          <div className="field"><label htmlFor="em">Email</label><input id="em" name="email" type="email" required placeholder="you@example.com" /></div>
          <div className="field-row">
            <div className="field"><label htmlFor="ph">Phone</label><input id="ph" name="phone" type="tel" placeholder="+__ ___ ___ ___" /></div>
            <div className="field"><label htmlFor="na">Nationality</label><input id="na" name="nationality" type="text" placeholder="Country of citizenship" /></div>
          </div>
          <div className="field"><label htmlFor="pr">Your profession</label>
            <select id="pr" name="profession">
              <option value>Select a field</option>
              <option>Business &amp; entrepreneurship</option>
              <option>Technology &amp; engineering</option>
              <option>Medicine &amp; healthcare</option>
              <option>Research &amp; academia</option>
              <option>Creative industries</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field"><label htmlFor="ms">Anything we should know?</label><textarea id="ms" name="message" rows={3} placeholder="Tell us briefly about your goals (optional)" defaultValue={""} /></div>
          <button type="submit" className="btn btn-gold" disabled={leadLoading}>{leadLoading ? 'Sending...' : <>Request my assessment <span className="arr">→</span></>}</button>
          <p className="form-consent">By submitting, you agree to be contacted by Langma International about your enquiry. Your details are kept strictly confidential.</p>
          {(leadMsg || leadSubmitted) && (
            <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 4, textAlign: 'center', fontSize: 14, ...(leadSuccess ? { background: 'rgba(47,199,161,.12)', border: '1px solid var(--gold)', color: 'var(--navy-deep)' } : { background: 'rgba(220,38,38,.08)', border: '1px solid #ef4444', color: '#b91c1c' }) }}>
              {leadMsg || 'Your request has reached our advisory team. We will be in touch within one business day to arrange your private consultation.'}
            </div>
          )}
        </form>
      </div>
    </div>
  </section>
</main>
    </div>
  );
};

export default PortugalGlobalTalentPage;
