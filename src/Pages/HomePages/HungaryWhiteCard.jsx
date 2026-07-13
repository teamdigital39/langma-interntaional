import React, { useState, useEffect } from 'react';
import useResidencyLeadForms from '../../hooks/useResidencyLeadForms';

const SERVICE = 'Hungary White Card';

const HungaryWhiteCardPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    handleLeadSubmit, handleOfficeSubmit,
    leadLoading, officeLoading,
    leadMsg, officeMsg, leadSuccess, officeSuccess,
  } = useResidencyLeadForms(SERVICE, { leadType: 'Hungary White Card Consultation' });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });
    document.querySelectorAll('.hu-page .reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);
  const closeMenu = () => setMenuOpen(false);

  const heroBadges = [
    { num: '€3,000+', lbl: 'Min. Monthly Income' },
    { num: '3+ mo.', lbl: 'Typical Time to Permit' },
    { num: '1+1 yrs', lbl: 'Validity, Renewable Once' },
    { num: '26', lbl: 'Schengen Countries' },
  ];

  const stats = [
    { v: '€3,000+', k: 'Net monthly income, main applicant' },
    { v: '€10,000', k: 'Minimum savings on deposit' },
    { v: '1 year', k: 'Initial permit validity' },
    { v: '183 days', k: 'Stay threshold for tax exemption' },
  ];

  const facts = [
    { ff: 'Budapest', fl: 'Capital City' },
    { ff: 'Forint (HUF)', fl: 'National Currency' },
    { ff: 'EU Member', fl: 'Since 2004' },
    { ff: 'Schengen', fl: 'Member State' },
  ];

  const whyCards = [
    { ic: '①', t: 'Central European Location', p: 'Positioned at the crossroads of Europe, with fast rail and flight links to Vienna, Prague, Berlin and beyond.' },
    { ic: '②', t: 'Affordable Cost of Living', p: 'Rent, utilities and everyday services remain considerably more accessible than in Western European capitals.' },
    { ic: '③', t: 'Rich Cultural Heritage', p: 'Centuries of architecture, thermal bath culture and a vibrant arts scene give Budapest a distinct character.' },
    { ic: '④', t: 'Fast European Connectivity', p: 'Reliable digital infrastructure and short travel times to the rest of the continent support a genuinely mobile lifestyle.' },
    { ic: '⑤', t: 'Modern Infrastructure', p: 'An expanding network of co-working spaces, healthcare facilities and transport links supports daily life and work.' },
    { ic: '⑥', t: 'Safe & Stable Environment', p: 'Hungary is consistently regarded as one of the safer and more affordable destinations within the European Union.' },
  ];

  const progCards = [
    { no: 'WHAT IT IS', t: 'A Digital Nomad Residence Permit', p: 'The White Card grants residence in Hungary to employees, managers, founders and sole proprietors who earn their income from a company based outside the European Union.' },
    { no: "WHO IT'S FOR", t: 'Remote Professionals & Founders', p: 'It suits remote employees of non-EU companies, business owners, and independent consultants who can continue their work from Hungary rather than within a Hungarian employer.' },
    { no: 'VALIDITY & PURPOSE', t: 'One Year, Renewable Once', p: 'The permit is issued for one year and may be renewed once for a further year, giving a maximum continuous stay of two years before a new application is required.' },
  ];

  const benCards = [
    { mk: '01', t: 'Living in Hungary', p: 'Lawful residence in a safe, affordable EU country with established infrastructure for daily life and work.' },
    { mk: '02', t: 'Schengen Travel Access', p: 'Free movement across other Schengen countries for up to 90 days within any 180-day period.' },
    { mk: '03', t: 'Digital Nomad Flexibility', p: 'Continue working remotely for your existing non-Hungarian employer or business without interruption.' },
    { mk: '04', t: 'Banking Access', p: 'Hungarian residency supports opening accounts, deposits and credit facilities with European and international banks.' },
    { mk: '05', t: 'Tax Position', p: 'Holders who spend fewer than 183 days a year in Hungary are generally exempt from Hungarian income tax.' },
    { mk: '06', t: 'Quality Healthcare', p: 'Access to a healthcare system regarded as comparable to Germany or Israel, at considerably lower cost.' },
  ];

  const eligBlocks = [
    { icon: '✓', t: 'Personal Criteria', items: ['Aged 18 or over', 'Non-EU and non-EEA national', 'No criminal record', 'Valid passport, at least 1 year remaining'] },
    { icon: '⚑', t: 'Income & Work Status', items: ['Monthly income of at least €3,000', 'Employed by, or owner of, a company based outside the EU', 'CEO, founder or registered sole proprietor if self-employed', 'Cannot work for a Hungarian employer while holding the permit'] },
    { icon: '⌂', t: 'Housing', items: ['Property purchased or rented in Hungary', 'Rental agreement for a minimum of 12 months, or a purchase agreement', 'At least 6 m² of living area per resident'] },
    { icon: '♥', t: 'Health Cover', items: ['Private health insurance, or proof of ability to pay for care', 'Minimum coverage of €30,000', 'Policy must remain valid for the permit period'] },
  ];

  const finIncome = [
    { l: 'Minimum monthly income (non-EU source)', amt: '€3,000+' },
    { l: 'Minimum savings, non-sanctioned bank', amt: '€10,000' },
    { l: 'Health insurance coverage, minimum', amt: '€30,000' },
  ];
  const finFees = [
    { l: 'Health insurance policy', amt: '≈ €200' },
    { l: 'D visa to enter Hungary', amt: '≈ €110' },
    { l: 'Document processing fee', amt: '≈ €30' },
    { l: 'Housing (rental or purchase)', amt: 'No fixed minimum' },
  ];

  const docs = [
    'Completed residence permit application, submitted by hand or online',
    "Valid passport with at least one year's remaining validity",
    'Two passport-style photographs, 3.5 × 4.5 cm',
    'Employment contract, or proof of ownership of a foreign business',
    'Company registration certificate or tax authority documentation',
    'Rental agreement (minimum 12 months) or property purchase agreement',
    'Bank statement showing a balance of at least €10,000',
    'Private health insurance with minimum coverage of €30,000',
    "Apostilled founding documents for the applicant's company, where applicable",
    'Confirmation of ability to work remotely, for managers and sole proprietors',
    'Income declaration, for managers and sole proprietors',
  ];

  const timeline = [
    { d: '1', tag: 'Day 1', t: 'Preliminary Eligibility Review', p: 'Langma International reviews your income profile, employment or business structure, and personal circumstances to confirm a realistic pathway before any documents are prepared.' },
    { d: '2', tag: 'Up to 1 month', t: 'Document Preparation', p: 'Our team provides a tailored document checklist, assists with completing the required forms, and prepares your application file for submission.' },
    { d: '3', tag: 'Up to 1 month', t: 'Consular Submission', p: 'An appointment is scheduled at the Hungarian consulate in your country of citizenship or legal residence, where you submit documents and provide biometric data.' },
    { d: '4', tag: 'Up to 1 month', t: 'D Visa Issuance', p: 'The D visa permits a stay of up to 30 days and remains valid for three months — the window within which you must enter Hungary and submit your residence permit application.' },
    { d: '5', tag: 'Up to 6 months', t: 'Collecting the White Card', p: 'Once in Hungary, you attend the National Directorate-General for Aliens Policing in person to collect your residence card.' },
    { d: '6', tag: 'After 1 year', t: 'Renewal', p: 'Holders who have spent at least 90 days in Hungary within the preceding 180 days may renew the permit for a further year. Langma International manages the renewal file on your behalf.' },
  ];

  const lifeCards = [
    { img: 'https://images.unsplash.com/photo-1467371020306-d8a93d3b7f2c?q=80&w=800&auto=format&fit=crop', alt: 'Budapest historic streets and architecture', t: 'Budapest', p: 'A walkable, historic capital blending grand 19th-century architecture with a growing café and co-working culture.' },
    { img: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?q=80&w=800&auto=format&fit=crop', alt: 'Thermal baths in Budapest', t: 'Thermal Baths & Culture', p: 'Centuries-old thermal bath traditions sit alongside museums, galleries and a lively arts and music scene.' },
    { img: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?q=80&w=800&auto=format&fit=crop', alt: 'Modern Budapest financial district', t: 'Cost of Living', p: 'Rental, utilities and medical services remain considerably more affordable than in Western European capitals.' },
    { img: 'https://images.unsplash.com/photo-1576016770956-debb63d92058?q=80&w=800&auto=format&fit=crop', alt: 'Healthcare facility in Hungary', t: 'Healthcare', p: 'A healthcare system known for affordable, high-quality dental, surgical and diagnostic care.' },
    { img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop', alt: 'Public transport in Budapest', t: 'Transport & Safety', p: 'An efficient public transport network and a reputation as one of the safer EU capitals for daily life.' },
    { img: 'https://images.unsplash.com/photo-1577128494906-2e1ee8b3c1a8?q=80&w=800&auto=format&fit=crop', alt: 'Co-working space in Budapest', t: 'Working Remotely', p: 'A maturing network of co-working spaces and reliable connectivity support remote and hybrid working life.' },
  ];

  const lgItems = [
    { icn: '✓', t: 'Personalised Guidance', p: 'An honest review of your eligibility before any commitment is made.' },
    { icn: '⊞', t: 'Documentation Support', p: 'Preparation and review of every required document and form.' },
    { icn: '✦', t: 'Compliance Review', p: 'Careful checking of your file against current Hungarian requirements.' },
    { icn: '↪', t: 'End-to-End Assistance', p: 'Support from first consultation through to card collection and renewal.' },
  ];

  const faqs = [
    { q: 'What is the Hungary White Card?', a: "The White Card is Hungary's digital nomad residence permit. It is issued to remote employees, founders or sole proprietors whose income and business activity come from outside the European Union, and who buy or rent property in Hungary." },
    { q: 'What is the minimum income required?', a: 'Applicants must demonstrate a monthly income of at least €3,000 from a source outside the EU, typically shown through several months of bank statements alongside an employment contract or business documentation.' },
    { q: 'How long is the White Card valid?', a: 'The permit is issued for one year. It can be renewed once for a further year, provided the holder has spent at least 90 days in Hungary within the previous 180 days. After two years, a fresh application is required.' },
    { q: 'Can my spouse or children be included in my application?', a: 'No. The White Card is an individual permit. Family members do not receive residence under the same application and must apply separately on other applicable grounds.' },
    { q: 'Does the White Card lead to permanent residency or citizenship?', a: 'No. The White Card does not provide a pathway to permanent residency or citizenship. Those statuses require residence obtained on other grounds, such as investment, employment or family reunification, typically for several continuous years.' },
    { q: 'Can I work for a Hungarian company while holding the White Card?', a: 'No. The permit is intended solely for remote work for non-Hungarian businesses. Taking employment with a Hungarian employer can lead to the permit being cancelled.' },
    { q: 'Do I pay income tax in Hungary as a White Card holder?', a: 'Generally, holders who reside in Hungary for fewer than 183 days within a calendar year are exempt from Hungarian income tax. Individual circumstances should be reviewed with a tax advisor.' },
    { q: 'What savings do I need to show?', a: 'Applicants should hold at least €10,000 in savings with a non-sanctioned bank, in addition to meeting the monthly income requirement.' },
    { q: 'What health insurance is required?', a: 'A private health insurance policy with minimum coverage of €30,000 is required, or evidence of the ability to pay for healthcare services directly.' },
    { q: 'Do I need to buy property in Hungary?', a: 'You can either rent or purchase. A rental agreement must run for at least 12 months, with a minimum of 6 square metres of living space per resident, or you may submit a property purchase agreement instead.' },
    { q: 'How long does the application process take?', a: 'The overall process typically takes around three months or longer. A D visa is generally issued within roughly a month of application, and the resident card itself is then issued within up to six months of arrival.' },
    { q: 'Where do I submit my application?', a: 'The initial application and consular appointment take place at the Hungarian consulate in your country of citizenship or legal residence. After arrival, the resident card is collected in person from the National Directorate-General for Aliens Policing in Hungary.' },
    { q: 'What happens if my income falls below the threshold after I am approved?', a: 'Maintaining at least €3,000 in monthly income is an ongoing condition of the permit. If income falls below this level, the Hungarian authorities may withdraw the White Card.' },
    { q: 'Can I travel within the Schengen Area while holding the White Card?', a: 'Yes. Hungarian residents may travel visa-free across other Schengen countries for up to 90 days within any 180-day period.' },
  ];

  const officePoints = [
    { i: '✦', t: 'Meet our advisory team', p: 'A direct conversation with the people who will guide your White Card case from start to finish.' },
    { i: '✓', t: 'Discuss your eligibility', p: 'An honest, confidential review of your income profile, business structure and timeline — with no obligation.' },
    { i: '⊞', t: 'Document assessment', p: "Bring your existing documents for a preliminary review — understanding what you have and what's still needed is the first practical step." },
    { i: '↪', t: 'Personalised roadmap discussion', p: 'Leave with a clear understanding of your application pathway, realistic timelines, and next steps.' },
  ];

  const navLinks = [
    { href: '#about-hungary', label: 'Hungary' },
    { href: '#white-card', label: 'The White Card' },
    { href: '#finance', label: 'Requirements' },
    { href: '#process', label: 'Process' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <div className="hu-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        .hu-page {
          --navy:#296166;
          --navy-deep:#296166;
          --navy-mid:#296166;
          --gold:#6FE0C6;
          --gold-soft:#6FE0C6;
          --gold-deep:#296166;
          --ivory:#F5F8F6;
          --beige:#E9F1EE;
          --charcoal:#296166;
          --muted:#296166;
          --line:rgba(47,199,161,0.28);
          --radius:4px;
          --shadow-soft:0 18px 50px rgba(26,37,64,0.10);
          --shadow-strong:0 30px 70px rgba(26,37,64,0.22);
          --ease:cubic-bezier(.22,.61,.36,1);
        }
        .hu-page * { margin:0; padding:0; box-sizing:border-box; }
        .hu-page {
          font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
          color:var(--charcoal); background:var(--ivory); line-height:1.7;
          font-weight:400; -webkit-font-smoothing:antialiased; overflow-x:hidden;
        }
        .hu-page h1,.hu-page h2,.hu-page h3,.hu-page h4 {
          font-family:'Cormorant Garamond',Georgia,serif; font-weight:600;
          color:var(--navy); line-height:1.12; letter-spacing:0.2px;
        }
        .hu-page p { font-weight:400; }
        .hu-page a { color:inherit; text-decoration:none; }
        .hu-page img { display:block; width:100%; height:100%; object-fit:cover; }
        .hu-page .container { max-width:1200px; margin:0 auto; padding:0 30px; }
        .hu-page .block { padding:108px 0; }

        .hu-page .eyebrow { font-family:'Inter',sans-serif; text-transform:uppercase; letter-spacing:3.5px; font-size:11.5px; color:var(--gold-deep); font-weight:600; margin-bottom:18px; display:flex; align-items:center; gap:12px; }
        .hu-page .eyebrow::before { content:""; width:34px; height:1px; background:var(--gold); display:inline-block; flex-shrink:0; }
        .hu-page .eyebrow.center { justify-content:center; }
        .hu-page .section-head { max-width:760px; margin:0 auto 60px; text-align:center; }
        .hu-page .section-head h2 { font-size:clamp(34px,4.6vw,54px); margin-bottom:18px; }
        .hu-page .section-head p { color:var(--muted); font-size:17px; }

        .hu-page .btn { display:inline-flex; align-items:center; gap:10px; font-family:'Inter',sans-serif; font-size:14px; font-weight:600; letter-spacing:0.4px; padding:16px 32px; border-radius:var(--radius); cursor:pointer; border:1px solid transparent; transition:all .35s var(--ease); text-decoration:none; white-space:nowrap; }
        .hu-page .btn-gold { background:var(--gold); color:var(--navy-deep); }
        .hu-page .btn-gold:hover { background:var(--gold-soft); transform:translateY(-2px); box-shadow:0 14px 30px rgba(47,199,161,.28); }
        .hu-page .btn-ghost { background:transparent;color:#1A2540;border:2px solid #2FC7A1; }
        .hu-page .btn-ghost:hover { border-color:var(--gold); color:var(--gold-soft); }
        .hu-page .btn-navy { background:var(--navy); color:var(--ivory); }
        .hu-page .btn-navy:hover { background:var(--navy-mid); transform:translateY(-2px); }

        .hu-page .tile-divider { height:18px; width:100%; background:radial-gradient(circle at 10px 9px,var(--gold) 0 2px,transparent 2.5px),radial-gradient(circle at 0 0,transparent 8px,var(--gold) 8px 8.6px,transparent 9.2px),radial-gradient(circle at 20px 0,transparent 8px,var(--gold) 8px 8.6px,transparent 9.2px),radial-gradient(circle at 0 18px,transparent 8px,var(--gold) 8px 8.6px,transparent 9.2px),radial-gradient(circle at 20px 18px,transparent 8px,var(--gold) 8px 8.6px,transparent 9.2px); background-size:20px 18px; background-repeat:repeat-x; background-position:left center; background-color:var(--navy); display:block; overflow:hidden; opacity:.92; }

        .hu-page .site-header { position:fixed; top:0; left:0; right:0; z-index:1000; padding:22px 0; transition:all .4s var(--ease); }
        .hu-page .site-header.scrolled { background:rgba(7,19,31,0.96); backdrop-filter:blur(12px); padding:14px 0; box-shadow:0 6px 30px rgba(0,0,0,.28); }
        .hu-page .nav-wrap { display:flex; align-items:center; justify-content:space-between; }
        .hu-page .brand { display:flex; flex-direction:column; line-height:1; }
        .hu-page .brand .name { font-family:'Cormorant Garamond',serif; font-size:25px; font-weight:600; color:var(--ivory); letter-spacing:1px; }
        .hu-page .brand .tag { font-family:'Inter',sans-serif; font-size:9.5px; letter-spacing:3.5px; text-transform:uppercase; color:var(--gold-soft); margin-top:4px; }
        .hu-page .nav-links { display:flex; align-items:center; gap:30px; }
        .hu-page .nav-links a { font-size:13.5px; font-weight:500; color:rgba(247,250,252,.85); letter-spacing:.3px; transition:color .25s; }
        .hu-page .nav-links a:hover { color:var(--gold-soft); }
        .hu-page .nav-cta { padding:11px 24px; font-size:13px; background:var(--gold); color:var(--navy-deep); border-radius:var(--radius); font-weight:600; transition:all .3s; }
        .hu-page .nav-cta:hover { background:var(--gold-soft); }
        .hu-page .burger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; }
        .hu-page .burger span { width:24px; height:2px; background:var(--ivory); display:block; }

        .hu-page .hero { position:relative; min-height:auto; display:flex; align-items:center; color:#1B2B28; overflow:hidden; background:#FFFFFF;padding:72px 0 48px; }
        .hu-page .hero::before { content:""; position:absolute; inset:0; background-image:radial-gradient(circle at 15% 50%,rgba(47,199,161,0.08) 0%,transparent 50%),radial-gradient(circle at 85% 20%,rgba(47,199,161,0.05) 0%,transparent 40%); z-index:0; pointer-events:none; }
        .hu-page .hero-split { position:relative; z-index:2; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; padding-top:0;padding-bottom:0; }
        .hu-page .hero-copy { display:flex; flex-direction:column; }
        .hu-page .hero h1 { font-size:clamp(38px,5vw,64px); color:#1B2B28; margin-bottom:26px; font-weight:600; line-height:1.08; }
        .hu-page .hero h1 em { font-style:italic; color:#4FA3D1; font-weight:500; }
        .hu-page .hero .lead { font-size:17.5px; color:#4C5C58; max-width:560px; margin-bottom:38px; font-weight:300; line-height:1.72; }
        .hu-page .hero-cta { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:48px; }
        .hu-page .hero-badges { display:flex; gap:32px; flex-wrap:wrap; border-top:1px solid #D8E0EC; padding-top:28px; }
        .hu-page .hero-badge-item .num { font-family:'Cormorant Garamond',serif; font-size:28px; color:var(--gold-soft); font-weight:600; line-height:1; }
        .hu-page .hero-badge-item .lbl { font-size:11px; letter-spacing:.5px; color:rgba(247,250,252,.68); margin-top:6px; }

        .hu-page .hero-visual { display:flex; align-items:center; justify-content:center; position:relative; }
        .hu-page .hero-img-frame { position:relative; width:100%; max-width:520px; border-radius:12px; overflow:hidden; box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22); }
        .hu-page .hero-img-frame img { display:block; width:100%; height:480px; object-fit:cover; border-radius:12px; transition:transform .9s var(--ease); }
        .hu-page .hero-img-frame:hover img { transform:scale(1.04); }
        .hu-page .hero-img-frame::after { content:""; position:absolute; inset:12px; border:1px solid rgba(47,199,161,.38); border-radius:8px; pointer-events:none; z-index:2; }
        .hu-page .hero-img-frame::before { content:""; position:absolute; inset:0; background:linear-gradient(to top,rgba(7,19,31,.42) 0%,transparent 55%); z-index:1; border-radius:12px; pointer-events:none; }
        .hu-page .hero-visual::before { content:""; position:absolute; top:24px; right:-14px; width:100%; max-width:520px; height:100%; border:1px solid rgba(47,199,161,.18); border-radius:12px; pointer-events:none; }
        .hu-page .hero-img-badge { position:absolute; bottom:22px; left:22px; z-index:3; background:rgba(7,19,31,.82); backdrop-filter:blur(8px); border:1px solid rgba(47,199,161,.30); border-radius:6px; padding:10px 16px; display:flex; align-items:center; gap:10px; }
        .hu-page .hero-img-badge .flag { font-size:20px; }
        .hu-page .hero-img-badge .cap-txt { font-size:12px; color:rgba(247,250,252,.88); line-height:1.4; }
        .hu-page .hero-img-badge .cap-txt strong { color:var(--gold-soft); display:block; font-size:13.5px; }

        .hu-page .scroll-hint { position:absolute; bottom:32px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:10px; color:#7E8C88; font-size:10.5px; letter-spacing:2.5px; text-transform:uppercase; z-index:3; }
        .hu-page .scroll-hint .line { width:1px; height:38px; background:linear-gradient(var(--gold),transparent); animation:hu-drop 2s var(--ease) infinite; }
        @keyframes hu-drop { 0% { transform:scaleY(0); transform-origin:top; } 50% { transform:scaleY(1); transform-origin:top; } 51% { transform-origin:bottom; } 100% { transform:scaleY(0); transform-origin:bottom; } }

        .hu-page .stats-bar { background:var(--navy-deep); color:var(--ivory); }
        .hu-page .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .hu-page .stat-cell { padding:52px 30px; text-align:center; border-right:1px solid rgba(247,250,252,.10); }
        .hu-page .stat-cell:last-child { border-right:none; }
        .hu-page .stat-cell .v { font-family:'Cormorant Garamond',serif; font-size:42px; font-weight:600; color:var(--gold-soft); line-height:1; margin-bottom:12px; }
        .hu-page .stat-cell .k { font-size:13px; letter-spacing:.5px; color:rgba(247,250,252,.78); }

        .hu-page .about { background:var(--ivory); }
        .hu-page .about-grid { display:grid; grid-template-columns:1.05fr 1fr; gap:64px; align-items:center; }
        .hu-page .about-copy h2 { font-size:clamp(32px,4.4vw,52px); margin-bottom:22px; }
        .hu-page .about-copy p { color:var(--muted); margin-bottom:18px; font-size:16.5px; }
        .hu-page .about-media { position:relative; height:560px; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-strong); }
        .hu-page .about-media .frame { position:absolute; inset:14px; border:1px solid rgba(247,250,252,.5); z-index:2; pointer-events:none; }
        .hu-page .facts-row { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-top:54px; }
        .hu-page .fact { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:26px 22px; text-align:center; }
        .hu-page .fact .ff { font-family:'Cormorant Garamond',serif; font-size:28px; color:var(--navy); font-weight:600; }
        .hu-page .fact .fl { font-size:12px; color:var(--muted); letter-spacing:.4px; margin-top:6px; }

        .hu-page .why { background:var(--beige); }
        .hu-page .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; }
        .hu-page .why-card { background:var(--ivory); padding:42px 34px; transition:background .3s; }
        .hu-page .why-card:hover { background:#fff; }
        .hu-page .why-card .ic { width:46px; height:46px; border:1px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--gold-deep); font-family:'Cormorant Garamond',serif; font-size:21px; margin-bottom:20px; }
        .hu-page .why-card h3 { font-size:23px; margin-bottom:10px; }
        .hu-page .why-card p { color:var(--muted); font-size:15px; }

        .hu-page .prog { background:var(--navy); color:var(--ivory); }
        .hu-page .prog .section-head h2 { color:var(--ivory); }
        .hu-page .prog .section-head p { color:rgba(247,250,252,.72); }
        .hu-page .prog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
        .hu-page .prog-card { background:rgba(247,250,252,.04); border:1px solid rgba(247,250,252,.12); border-radius:var(--radius); padding:38px 32px; transition:all .35s var(--ease); }
        .hu-page .prog-card:hover { border-color:var(--gold); transform:translateY(-6px); }
        .hu-page .prog-card .no { font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--gold-soft); border-bottom:1px solid rgba(247,250,252,.16); padding-bottom:14px; margin-bottom:18px; letter-spacing:2px; }
        .hu-page .prog-card h3 { color:var(--ivory); font-size:24px; margin-bottom:12px; }
        .hu-page .prog-card p { color:rgba(247,250,252,.74); font-size:15px; }

        .hu-page .benefits { background:var(--ivory); }
        .hu-page .ben-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .hu-page .ben-card { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:36px 30px; position:relative; overflow:hidden; transition:all .35s var(--ease); }
        .hu-page .ben-card::before { content:""; position:absolute; top:0; left:0; width:3px; height:0; background:var(--gold); transition:height .4s var(--ease); }
        .hu-page .ben-card:hover { box-shadow:var(--shadow-soft); transform:translateY(-4px); }
        .hu-page .ben-card:hover::before { height:100%; }
        .hu-page .ben-card .mk { font-family:'Cormorant Garamond',serif; font-size:15px; color:var(--gold-deep); letter-spacing:2px; margin-bottom:16px; }
        .hu-page .ben-card h3 { font-size:22px; margin-bottom:10px; }
        .hu-page .ben-card p { color:var(--muted); font-size:15px; }

        .hu-page .eligibility-sec { background:var(--beige); }
        .hu-page .elig-grid { display:grid; grid-template-columns:1fr 1fr; gap:26px; margin-top:52px; }
        .hu-page .elig-block { border-radius:var(--radius); overflow:hidden; border:1px solid var(--line); box-shadow:var(--shadow-soft); }
        .hu-page .elig-hd { padding:24px 32px; background:var(--navy); display:flex; align-items:center; gap:14px; }
        .hu-page .elig-hd-icon { width:40px; height:40px; background:rgba(47,199,161,.15); border:1px solid rgba(47,199,161,.3); border-radius:6px; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--gold); font-size:18px; }
        .hu-page .elig-hd h3 { color:var(--ivory); font-size:19px; margin:0; }
        .hu-page .elig-bd { padding:28px 32px; background:var(--ivory); }
        .hu-page .elig-list { list-style:none; display:flex; flex-direction:column; gap:12px; }
        .hu-page .elig-list li { display:flex; align-items:flex-start; gap:12px; font-size:14.5px; color:var(--charcoal); line-height:1.5; }
        .hu-page .elig-dot { width:6px; height:6px; background:var(--gold); border-radius:50%; flex-shrink:0; margin-top:7px; }

        .hu-page .finance { background:var(--navy); color:var(--ivory); }
        .hu-page .finance .section-head h2 { color:var(--ivory); }
        .hu-page .finance .section-head p { color:rgba(247,250,252,.72); }
        .hu-page .fin-cards { display:grid; grid-template-columns:1fr 1fr; gap:26px; }
        .hu-page .fin-option { background:rgba(247,250,252,.04); border:1px solid rgba(47,199,161,.18); border-radius:var(--radius); overflow:hidden; }
        .hu-page .fin-opt-head { padding:22px 30px; border-bottom:1px solid rgba(47,199,161,.12); display:flex; align-items:center; gap:12px; }
        .hu-page .fin-opt-head h3 { color:var(--ivory); font-size:20px; margin:0; }
        .hu-page .fin-opt-body { padding:26px 30px; }
        .hu-page .fin-row { display:flex; justify-content:space-between; align-items:baseline; padding:12px 0; border-bottom:1px dashed rgba(247,250,252,.14); font-size:14.5px; color:rgba(247,250,252,.86); }
        .hu-page .fin-row:last-child { border-bottom:none; }
        .hu-page .fin-row .amt { font-family:'Cormorant Garamond',serif; font-size:19px; color:var(--gold-soft); }
        .hu-page .fin-note { margin-top:18px; font-size:13px; color:rgba(247,250,252,.6); }

        .hu-page .docs { background:var(--ivory); }
        .hu-page .docs-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:18px; }
        .hu-page .doc-item { display:flex; gap:16px; align-items:flex-start; background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:20px 22px; }
        .hu-page .doc-num { flex:0 0 32px; height:32px; border-radius:50%; background:var(--navy); color:var(--gold-soft); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:14px; }
        .hu-page .doc-item p { font-size:14.5px; color:var(--charcoal); margin:0; }

        .hu-page .process { background:var(--beige); }
        .hu-page .timeline { position:relative; margin-top:60px; }
        .hu-page .tl-line { position:absolute; left:29px; top:0; bottom:0; width:1px; background:var(--line); }
        .hu-page .tl-step { display:grid; grid-template-columns:60px 1fr; gap:28px; margin-bottom:42px; position:relative; }
        .hu-page .tl-step:last-child { margin-bottom:0; }
        .hu-page .tl-dot { width:60px; height:60px; border-radius:50%; background:var(--navy); color:var(--gold-soft); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:600; border:2px solid var(--gold); z-index:2; }
        .hu-page .tl-card { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:26px 30px; box-shadow:var(--shadow-soft); }
        .hu-page .tl-card .tag { font-size:11.5px; letter-spacing:1.5px; text-transform:uppercase; color:var(--gold-deep); font-weight:600; margin-bottom:8px; }
        .hu-page .tl-card h3 { font-size:21px; margin-bottom:8px; }
        .hu-page .tl-card p { color:var(--muted); font-size:15px; margin:0; }

        .hu-page .family { background:var(--navy); color:var(--ivory); }
        .hu-page .fam-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:64px; align-items:center; }
        .hu-page .fam-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:18px; color:var(--ivory); }
        .hu-page .fam-copy p { color:rgba(247,250,252,.78); font-size:16px; margin-bottom:16px; }
        .hu-page .fam-media { position:relative; height:460px; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-strong); }

        .hu-page .life { background:var(--ivory); }
        .hu-page .life-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .hu-page .life-card { background:#fff; border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; }
        .hu-page .life-card .img { height:190px; }
        .hu-page .life-card .b { padding:24px 26px; }
        .hu-page .life-card h3 { font-size:20px; margin-bottom:8px; }
        .hu-page .life-card p { color:var(--muted); font-size:14.5px; margin:0; }

        .hu-page .langma { background:var(--beige); }
        .hu-page .langma-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .hu-page .lg-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:18px; }
        .hu-page .lg-copy p { color:var(--muted); font-size:16px; margin-bottom:22px; }
        .hu-page .lg-list { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        .hu-page .lg-item { display:flex; gap:14px; align-items:flex-start; }
        .hu-page .lg-icn { flex:0 0 38px; height:38px; border-radius:50%; border:1px solid var(--gold); color:var(--gold-deep); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:17px; }
        .hu-page .lg-item h4 { font-size:16.5px; margin-bottom:3px; }
        .hu-page .lg-item p { font-size:13.5px; margin:0; color:var(--muted); }
        .hu-page .lg-media { height:520px; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-strong); }

        .hu-page .faq { background:var(--ivory); }
        .hu-page .faq-list { max-width:880px; margin:0 auto; }
        .hu-page .faq-item { border-bottom:1px solid var(--line); }
        .hu-page .faq-q { width:100%; text-align:left; background:none; border:none; padding:24px 4px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; font-family:'Cormorant Garamond',serif; font-size:19px; color:var(--navy); font-weight:600; }
        .hu-page .faq-q .x { font-size:24px; color:var(--gold-deep); transition:transform .3s; flex-shrink:0; margin-left:20px; }
        .hu-page .faq-item.open .faq-q .x { transform:rotate(45deg); }
        .hu-page .faq-a { max-height:0; overflow:hidden; transition:max-height .4s var(--ease); }
        .hu-page .faq-a p { padding:0 4px 24px; color:var(--muted); font-size:15px; }

        .hu-page .lead-sec { background:var(--navy); color:var(--ivory); }
        .hu-page .lead-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .hu-page .lead-copy h2 { font-size:clamp(32px,4.4vw,50px); margin-bottom:18px; color:var(--ivory); }
        .hu-page .lead-copy p { color:rgba(247,250,252,.78); font-size:16.5px; margin-bottom:26px; }
        .hu-page .lead-points { list-style:none; }
        .hu-page .lead-points li { display:flex; gap:12px; padding:10px 0; font-size:14.5px; color:rgba(247,250,252,.86); }
        .hu-page .lead-points li::before { content:"✦"; color:var(--gold-soft); }
        .hu-page .form-card { background:#fff; border-radius:var(--radius); padding:42px; box-shadow:var(--shadow-strong); }
        .hu-page .form-card h3 { font-size:24px; margin-bottom:6px; }
        .hu-page .form-card .sub { color:var(--muted); font-size:14px; margin-bottom:26px; }
        .hu-page .field { margin-bottom:18px; }
        .hu-page .field label { display:block; font-size:12.5px; letter-spacing:.4px; color:var(--muted); margin-bottom:7px; text-transform:uppercase; }
        .hu-page .field input,.hu-page .field select,.hu-page .field textarea { width:100%; padding:13px 14px; border:1px solid var(--line); border-radius:var(--radius); font-family:'Inter',sans-serif; font-size:14.5px; background:var(--ivory); color:var(--charcoal); transition:border-color .25s,box-shadow .25s; }
        .hu-page .field input:focus,.hu-page .field select:focus,.hu-page .field textarea:focus { outline:none; border-color:var(--gold); box-shadow:0 0 0 3px rgba(47,199,161,.15); }
        .hu-page .frow { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .hu-page .field textarea { resize:vertical; min-height:90px; }
        .hu-page .form-card .btn { width:100%; justify-content:center; margin-top:6px; }
        .hu-page .form-card .disc { font-size:12px; color:var(--muted); margin-top:14px; text-align:center; }
        .hu-page .success-msg { display:none; background:rgba(47,199,161,.14); border:1px solid var(--gold); border-radius:var(--radius); padding:16px; color:#296166; font-size:14.5px; text-align:center; margin-top:16px; }
        .hu-page .success-msg.show { display:block; }

        .hu-page .office { background:var(--beige); }
        .hu-page .office-grid { display:grid; grid-template-columns:1fr 1.05fr; gap:60px; align-items:center; }
        .hu-page .office-copy h2 { font-size:clamp(30px,4vw,46px); margin-bottom:18px; }
        .hu-page .office-copy p { color:var(--muted); font-size:16.5px; margin-bottom:26px; }
        .hu-page .office-points { list-style:none; margin-bottom:8px; }
        .hu-page .office-points li { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid var(--line); }
        .hu-page .office-points .oi { flex:0 0 38px; height:38px; border-radius:50%; border:1px solid var(--gold); color:var(--gold-deep); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; }
        .hu-page .office-points h4 { font-size:18px; margin-bottom:1px; }
        .hu-page .office-points p { font-size:14px; margin:0; color:var(--muted); }
        .hu-page .office-form { background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:40px; box-shadow:var(--shadow-soft); }
        .hu-page .office-form h3 { font-size:24px; margin-bottom:22px; }

        .hu-page .foot { background:var(--navy-deep); color:rgba(247,250,252,.7); padding:74px 0 32px; }
        .hu-page .foot-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1.3fr; gap:44px; margin-bottom:50px; }
        .hu-page .foot-brand .name { font-family:'Cormorant Garamond',serif; font-size:27px; color:var(--ivory); font-weight:600; letter-spacing:1px; }
        .hu-page .foot-brand .tag { font-size:10px; letter-spacing:3px; text-transform:uppercase; color:var(--gold-soft); margin:6px 0 18px; }
        .hu-page .foot-brand p { font-size:14px; max-width:320px; }
        .hu-page .foot-col h4 { color:var(--ivory); font-size:17px; margin-bottom:18px; font-weight:600; }
        .hu-page .foot-col a { display:block; font-size:14px; padding:6px 0; transition:color .25s; }
        .hu-page .foot-col a:hover { color:var(--gold-soft); }
        .hu-page .foot-bottom { border-top:1px solid rgba(247,250,252,.12); padding-top:26px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:14px; font-size:12.5px; }
        .hu-page .legal { max-width:920px; font-size:11.5px; color:rgba(247,250,252,.5); line-height:1.7; margin-top:18px; }

        .hu-page .reveal { opacity:0; transform:translateY(28px); transition:opacity .7s var(--ease),transform .7s var(--ease); }
        .hu-page .reveal.in { opacity:1; transform:none; }

        @media(max-width:980px) {
          .hu-page .nav-links { display:none; }
          .hu-page .nav-links.open { display:flex; flex-direction:column; position:fixed; top:0; left:0; right:0; bottom:0; background:#296166; z-index:999; align-items:center; justify-content:center; gap:28px; }
          .hu-page .burger { display:flex; position:relative; z-index:1001; }
          .hu-page .hero-split { grid-template-columns:1fr; gap:48px; padding-top:0;padding-bottom:32px; }
          .hu-page .hero-img-frame img { height:380px; }
          .hu-page .hero-visual::before { display:none; }
          .hu-page .hero-img-frame { max-width:100%; }
          .hu-page .about-grid,.hu-page .fam-grid,.hu-page .langma-grid,.hu-page .lead-grid,.hu-page .office-grid { grid-template-columns:1fr; gap:40px; }
          .hu-page .stats-grid,.hu-page .why-grid,.hu-page .prog-grid,.hu-page .ben-grid,.hu-page .life-grid,.hu-page .elig-grid { grid-template-columns:1fr 1fr; }
          .hu-page .facts-row { grid-template-columns:1fr 1fr; }
          .hu-page .lg-list { grid-template-columns:1fr; }
          .hu-page .about-media,.hu-page .fam-media,.hu-page .lg-media { height:420px; }
          .hu-page .fin-cards,.hu-page .docs-grid { grid-template-columns:1fr; }
          .hu-page .foot-grid { grid-template-columns:1fr 1fr; }
        }
        @media(max-width:640px) {
          .hu-page .block { padding:74px 0; }
          .hu-page .container { padding:0 22px; }
          .hu-page .stats-grid,.hu-page .why-grid,.hu-page .prog-grid,.hu-page .ben-grid,.hu-page .life-grid,.hu-page .facts-row,.hu-page .elig-grid,.hu-page .fin-cards,.hu-page .docs-grid { grid-template-columns:1fr; }
          .hu-page .stat-cell { border-right:none; border-bottom:1px solid rgba(247,250,252,.10); }
          .hu-page .frow { grid-template-columns:1fr; }
          .hu-page .hero-badges { gap:22px; }
          .hu-page .form-card,.hu-page .office-form { padding:30px; }
          .hu-page .foot-grid { grid-template-columns:1fr; }
          .hu-page .hero-img-frame img { height:280px; }
          .hu-page .tl-step { grid-template-columns:46px 1fr; gap:18px; }
          .hu-page .tl-dot { width:46px; height:46px; font-size:17px; }
          .hu-page .tl-line { left:22px; }
        }
        @media(prefers-reduced-motion:reduce) {
          .hu-page * { animation:none!important; transition:none!important; }
          .hu-page .reveal { opacity:1; transform:none; }
        }
      /* PR hero responsive fix */
  /* PR hero — account for site TopBar + Navbar only (no double top padding) */
  @media(max-width:980px){
    .hu-page .hero{padding:64px 0 40px;}
    .hu-page .hero-split{grid-template-columns:1fr !important;gap:36px !important;padding-top:0 !important;}
    .hu-page .hero-visual{order:-1;max-width:560px;margin:0 auto;width:100%;}
    .hu-page .hero-visual::before{display:none;}
    .hu-page .hero-img-frame,.hu-page .hero-img-card{max-width:100%;}
    .hu-page .hero-badges{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;}
  }
  @media(max-width:640px){
    .hu-page .hero{padding:56px 0 32px;}
    .hu-page .hero-split{gap:28px !important;padding-bottom:16px !important;}
    .hu-page .hero h1{font-size:clamp(30px,8vw,42px);}
    .hu-page .hero-badges{grid-template-columns:1fr;}
    .hu-page .hero-cta,.hu-page .hero-ctas{flex-direction:column;}
    .hu-page .hero-cta .btn,.hu-page .hero-ctas .btn{width:100%;justify-content:center;}
    .hu-page .container{padding:0 20px;}
  }
`}</style>
      <main>
        {/* ===== HERO ===== */}
        <section className="hero">
          <div className="container">
            <div className="hero-split">
              <div className="hero-copy">
                <span className="eyebrow">Hungary White Card · Residence for Remote Professionals</span>
                <h1>Your Gateway to <em>European</em> Living for Remote Professionals</h1>
                <p className="lead">A streamlined residence pathway for digital nomads, founders and consultants whose income comes from outside the EU — guided from eligibility to resident card by Langma International's advisory team.</p>
                <div className="hero-cta">
                  <a href="#lead" className="btn btn-gold">Book a Private Consultation</a>
                  <a href="#about-hungary" className="btn btn-ghost">Explore the Programme</a>
                </div>
                <div className="hero-badges">
                  {heroBadges.map((b, i) => (
                    <div className="hero-badge-item" key={i}>
                      <div className="num">{b.num}</div>
                      <div className="lbl">{b.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero-visual">
                <div className="hero-img-frame">
                  <img src="https://images.unsplash.com/photo-1541849546-216549ae564b?q=80&w=1000&auto=format&fit=crop" alt="Hungarian Parliament Building on the Danube at sunset, Budapest" />
                  <div className="hero-img-badge">
                    <span className="flag">🇭🇺</span>
                    <div className="cap-txt"><strong>Hungary</strong>EU Member · Schengen Area</div>
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
              {stats.map((s, i) => (
                <div className="stat-cell reveal" key={i}><div className="v">{s.v}</div><div className="k">{s.k}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ABOUT HUNGARY ===== */}
        <section className="about block" id="about-hungary">
          <div className="container">
            <div className="about-grid">
              <div className="about-copy reveal">
                <span className="eyebrow">Hungary at a Glance</span>
                <h2>A Central European Base for the Internationally Mobile</h2>
                <p>Hungary sits at the geographic heart of Europe, with Budapest connected to the continent's major capitals by short flights and high-speed rail. As a member of both the European Union and the Schengen Area, the country offers a stable legal framework, a competitive cost of living, and an increasingly sophisticated ecosystem for entrepreneurs, consultants and remote teams.</p>
                <p>For internationally mobile professionals, Hungary combines well-developed infrastructure, reliable connectivity and a rich cultural heritage with one of the more accessible digital nomad pathways on the continent — making it a practical, comfortable base from which to work, travel and build a European footprint.</p>
                <p>Hungarian, the official language, sits alongside widely spoken English and German in business and hospitality settings, while the forint remains the national currency. Budapest's blend of historic architecture, thermal culture and a growing innovation scene gives newcomers a city that feels both established and forward-looking.</p>
              </div>
              <div className="about-media reveal">
                <img src="https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80&w=1000&auto=format&fit=crop" alt="Danube River and Budapest skyline" />
                <div className="frame"></div>
              </div>
            </div>
            <div className="facts-row">
              {facts.map((f, i) => (
                <div className="fact reveal" key={i}><div className="ff">{f.ff}</div><div className="fl">{f.fl}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY HUNGARY ===== */}
        <section className="why block">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow center">Why Choose Hungary</span>
              <h2>Six Reasons Remote Professionals Choose Hungary</h2>
              <p>A practical, well-connected European base built around affordability, culture and stability.</p>
            </div>
            <div className="why-grid">
              {whyCards.map((c, i) => (
                <div className="why-card reveal" key={i}><div className="ic">{c.ic}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHITE CARD OVERVIEW ===== */}
        <section className="prog block" id="white-card">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow center">The Hungary White Card</span>
              <h2>A Residence Permit Built for Remote Work</h2>
              <p>The White Card is Hungary's residence permit for digital nomads — designed for people whose income and business activity sit outside the country.</p>
            </div>
            <div className="prog-grid">
              {progCards.map((c, i) => (
                <div className="prog-card reveal" key={i}><div className="no">{c.no}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== KEY BENEFITS ===== */}
        <section className="benefits block">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow center">Key Benefits</span>
              <h2>What the White Card Opens Up</h2>
            </div>
            <div className="ben-grid">
              {benCards.map((c, i) => (
                <div className="ben-card reveal" key={i}><div className="mk">{c.mk}</div><h3>{c.t}</h3><p>{c.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ELIGIBILITY ===== */}
        <section className="eligibility-sec block">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow center">Eligibility Requirements</span>
              <h2>Who Can Apply for the White Card</h2>
              <p>Eligibility centres on income, independence from the Hungarian labour market, and a clean record.</p>
            </div>
            <div className="elig-grid">
              {eligBlocks.map((b, i) => (
                <div className="elig-block reveal" key={i}>
                  <div className="elig-hd"><div className="elig-hd-icon">{b.icon}</div><h3>{b.t}</h3></div>
                  <div className="elig-bd">
                    <ul className="elig-list">
                      {b.items.map((it, j) => (
                        <li key={j}><span className="elig-dot"></span>{it}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINANCIAL REQUIREMENTS ===== */}
        <section className="finance block" id="finance">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow center">Financial Requirements</span>
              <h2>Income, Savings &amp; Indicative Costs</h2>
              <p>Two figures sit at the centre of the financial test, alongside modest application-related fees.</p>
            </div>
            <div className="fin-cards">
              <div className="fin-option reveal">
                <div className="fin-opt-head"><h3>Income &amp; Savings Test</h3></div>
                <div className="fin-opt-body">
                  {finIncome.map((r, i) => (
                    <div className="fin-row" key={i}><span>{r.l}</span><span className="amt">{r.amt}</span></div>
                  ))}
                  <div className="fin-note">Income must continue to be maintained for the life of the permit, not only at application.</div>
                </div>
              </div>
              <div className="fin-option reveal">
                <div className="fin-opt-head"><h3>Application-Related Fees</h3></div>
                <div className="fin-opt-body">
                  {finFees.map((r, i) => (
                    <div className="fin-row" key={i}><span>{r.l}</span><span className="amt">{r.amt}</span></div>
                  ))}
                  <div className="fin-note">Figures are indicative government and insurance costs and exclude advisory fees and housing cost itself.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== REQUIRED DOCUMENTS ===== */}
        <section className="docs block">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow center">Required Documents</span>
              <h2>What You'll Need to Apply</h2>
            </div>
            <div className="docs-grid">
              {docs.map((d, i) => (
                <div className="doc-item reveal" key={i}><div className="doc-num">{i + 1}</div><p>{d}</p></div>
              ))}
            </div>
          </div>
        </section>

        <div className="tile-divider" aria-hidden="true"></div>

        {/* ===== APPLICATION PROCESS ===== */}
        <section className="process block" id="process">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow center">Step-by-Step Process</span>
              <h2>From First Review to Resident Card</h2>
              <p>The full process typically takes around three months or more, depending on your personal grounds and the workload of the relevant authorities.</p>
            </div>
            <div className="timeline">
              <div className="tl-line"></div>
              {timeline.map((s, i) => (
                <div className="tl-step reveal" key={i}>
                  <div className="tl-dot">{s.d}</div>
                  <div className="tl-card"><div className="tag">{s.tag}</div><h3>{s.t}</h3><p>{s.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAMILY CONSIDERATIONS ===== */}
        <section className="family block">
          <div className="container">
            <div className="fam-grid">
              <div className="fam-copy reveal">
                <span className="eyebrow">Family Considerations</span>
                <h2>Bringing Family to Hungary</h2>
                <p>The White Card is issued to the main applicant only. Spouses, children and dependent parents are not granted residence under the same application and cannot rely on it directly.</p>
                <p>Family members who wish to join a White Card holder in Hungary must submit their own, separate residence application on different and applicable grounds — for example, family reunification linked to a different type of permit, employment, or study.</p>
                <p>Langma International advises families on the most realistic combination of permits for their situation, and coordinates parallel applications where more than one family member intends to relocate.</p>
              </div>
              <div className="fam-media reveal">
                <img src="https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1000&auto=format&fit=crop" alt="International family enjoying a European city break" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== LIFE IN HUNGARY ===== */}
        <section className="life block">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow center">Life in Hungary</span>
              <h2>Settling Into Your New Base</h2>
            </div>
            <div className="life-grid">
              {lifeCards.map((c, i) => (
                <div className="life-card reveal" key={i}>
                  <div className="img"><img src={c.img} alt={c.alt} /></div>
                  <div className="b"><h3>{c.t}</h3><p>{c.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY LANGMA ===== */}
        <section className="langma block">
          <div className="container">
            <div className="langma-grid">
              <div className="lg-copy reveal">
                <span className="eyebrow">Why Langma International</span>
                <h2>Guidance From Eligibility to Resident Card</h2>
                <p>Hungarian immigration procedure rewards precision and preparation. Our advisory team works alongside applicants at every stage, reducing the risk of delay or refusal.</p>
                <div className="lg-list">
                  {lgItems.map((c, i) => (
                    <div className="lg-item" key={i}><div className="lg-icn">{c.icn}</div><div><h4>{c.t}</h4><p>{c.p}</p></div></div>
                  ))}
                </div>
              </div>
              <div className="lg-media reveal">
                <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=900&auto=format&fit=crop" alt="Advisory consultation meeting" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="faq block" id="faq">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow center">Frequently Asked Questions</span>
              <h2>Hungary White Card — Your Questions Answered</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={i}>
                  <button className="faq-q" onClick={() => toggleFaq(i)}>
                    {faq.q}<span className="x">+</span>
                  </button>
                  <div className="faq-a" style={{ maxHeight: openFaq === i ? '600px' : '0' }}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== LEAD GENERATION ===== */}
        <section className="lead-sec block" id="lead">
          <div className="container">
            <div className="lead-grid">
              <div className="lead-copy reveal">
                <span className="eyebrow">Private Consultation</span>
                <h2>Book Your Private Hungary Residency Consultation</h2>
                <p>Speak confidentially with our advisory team about your eligibility, timeline and the practical steps to securing a Hungary White Card.</p>
                <ul className="lead-points">
                  <li>A confidential review of your income and work structure</li>
                  <li>A realistic timeline based on your personal circumstances</li>
                  <li>Clarity on documentation before you commit to anything</li>
                  <li>Ongoing support through renewal and family planning</li>
                </ul>
              </div>
              <div className="form-card reveal">
                <h3>Request a Consultation</h3>
                <p className="sub">No obligation. Your information is treated confidentially.</p>
                <form onSubmit={handleLeadSubmit} noValidate>
                  <div className="frow">
                    <div className="field"><label htmlFor="fname">First name</label><input type="text" id="fname" required /></div>
                    <div className="field"><label htmlFor="lname">Last name</label><input type="text" id="lname" required /></div>
                  </div>
                  <div className="frow">
                    <div className="field"><label htmlFor="l-email">Email</label><input type="email" id="l-email" required /></div>
                    <div className="field"><label htmlFor="l-phone">Phone</label><input type="tel" id="l-phone" placeholder="+ Country code" required /></div>
                  </div>
                  <div className="field">
                    <label htmlFor="interest">Primary interest</label>
                    <select id="interest" defaultValue="">
                      <option value="">— Select —</option>
                      <option>Hungary White Card eligibility</option>
                      <option>Document preparation</option>
                      <option>Family residency planning</option>
                      <option>Renewal of an existing permit</option>
                      <option>General Hungary residency enquiry</option>
                    </select>
                  </div>
                  <div className="field"><label htmlFor="message">Message (optional)</label><textarea id="message"></textarea></div>
                  <button type="submit" className="btn btn-gold" disabled={leadLoading}>{leadLoading ? 'Sending...' : 'Request Consultation'}</button>
                  {leadMsg && <div className={`success-msg show ${leadSuccess ? '' : 'form-msg error'}`}>{leadMsg}</div>}
                  <p className="disc">By submitting, you agree to be contacted by Langma International regarding your enquiry.</p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ===== OFFICE VISIT ===== */}
        <section className="office block" id="office-visit">
          <div className="container">
            <div className="office-grid">
              <div className="office-copy reveal">
                <span className="eyebrow">In-Person Consultation</span>
                <h2>Prefer to Meet in Person?</h2>
                <p>Sit down with our advisory team for a private, in-depth conversation about your Hungary residency pathway — at a time that suits you.</p>
                <ul className="office-points">
                  {officePoints.map((c, i) => (
                    <li key={i}><span className="oi">{c.i}</span><div><h4>{c.t}</h4><p>{c.p}</p></div></li>
                  ))}
                </ul>
              </div>
              <div className="office-form reveal">
                <h3>Schedule Your Consultation</h3>
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
                        <option>Morning (9:00 AM – 12:00 PM)</option>
                        <option>Afternoon (12:00 PM – 4:00 PM)</option>
                        <option>Evening (4:00 PM – 6:00 PM)</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="ov-program">Primary topic</label>
                    <select id="ov-program" defaultValue="">
                      <option value="">— Select —</option>
                      <option>Hungary White Card eligibility</option>
                      <option>Family application planning</option>
                      <option>Document review</option>
                      <option>Renewal or ongoing permit</option>
                      <option>General Hungary residency enquiry</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-navy" style={{ width: '100%', justifyContent: 'center' }} disabled={officeLoading}>{officeLoading ? 'Sending...' : 'Book Office Visit'}</button>
                  {officeMsg && <div className={`success-msg show ${officeSuccess ? '' : 'form-msg error'}`}>{officeMsg}</div>}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HungaryWhiteCardPage;