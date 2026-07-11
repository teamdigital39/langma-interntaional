import React, { useState, useEffect, useMemo } from 'react';
import API_BASE from '../../config.js';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SERVICE = 'Malta Global Residence Programme';

const FAQ_ITEMS = [
  {
    q: 'What is the Malta Global Residence Programme?',
    a: 'Launched in 2013, the Malta Global Residence Programme lets non-EU/EEA applicants rent or buy a qualifying property and pay an administration fee in order to obtain a Maltese residence permit. Participants also become Maltese tax residents under a special tax regime, and the permit allows visa-free travel across the Schengen Area for short stays.',
  },
  {
    q: 'How much does the programme cost?',
    a: 'An administration fee of €6,000 applies generally, reduced to €5,500 when purchasing in the south of Malta or Gozo. Renting starts from around €8,750 per year there, or €9,600 elsewhere; buying starts from €220,000 there, or €275,000 elsewhere, plus purchase taxes of roughly €25,300 and above. A minimum annual tax of €15,000 also applies once status is granted.',
  },
  {
    q: 'Who can be included in my application?',
    a: 'You can include a spouse or registered partner, children under 18, dependent children aged 18 to 25, dependent siblings, and dependent parents or grandparents of you or your spouse. Citizens of EU and EEA member states, and of Switzerland, are not eligible to participate in the programme.',
  },
  {
    q: 'How is my income taxed under the programme?',
    a: 'Foreign-source income remitted to Malta is taxed at a flat 15%, with a minimum annual tax of €15,000 for the family. Global income that is not remitted to Malta is taxed at 0%, while income that arises in Malta itself is taxed at the standard rate of 35%. There is no additional tax for family members, and Malta charges no inheritance tax.',
  },
  {
    q: 'Do I need to live in Malta to keep the permit?',
    a: 'No. You are not required to relocate to Malta permanently, but you must continue to rent or own qualifying property and must not spend more than 183 days in any other single country during the year. The first residence permit card is valid for one year, with later cards issued for two years each, subject to ongoing compliance.',
  },
  {
    q: 'Can I work or set up a business in Malta?',
    a: "Yes. Residents may live, work and establish a business in Malta, although a separate work permit or company registration is typically required. Many participants use the programme as a base for structuring their company's tax position alongside their personal residency.",
  },
];

const validateName = (v) => /^[A-Za-z\s]{2,}$/.test(v.trim());
const validateEmail = (v) => /^\S+@\S+\.\S+$/.test(v.trim());
const validatePhone = (v) => /^[0-9]{10,15}$/.test(v);
const validateCountry = (v) => !v.trim() || v.trim().length >= 2;
const todayStr = () => new Date().toISOString().split('T')[0];
const isPastDate = (value) => value && value < todayStr();

const LangmaMaltaGlobalResidenceProgrammePage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [leadForm, setLeadForm] = useState({ fname: '', lname: '', email: '', phone: '', country: '', route: '' });
  const [leadErrors, setLeadErrors] = useState({});
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadMsg, setLeadMsg] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const [officeForm, setOfficeForm] = useState({ name: '', phone: '', email: '', date: '', time: '' });
  const [officeErrors, setOfficeErrors] = useState({});
  const [officeLoading, setOfficeLoading] = useState(false);
  const [officeMsg, setOfficeMsg] = useState('');
  const [officeSuccess, setOfficeSuccess] = useState(false);
  const [officeSubmitted, setOfficeSubmitted] = useState(false);

  // Calendar state
  const [calView, setCalView] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [calDay, setCalDay] = useState(null);
  const [calSlot, setCalSlot] = useState(null);
  const [calForm, setCalForm] = useState({ name: '', email: '', phone: '' });
  const [calErrors, setCalErrors] = useState({});
  const [calLoading, setCalLoading] = useState(false);
  const [calConfirm, setCalConfirm] = useState('');
  const [calSuccess, setCalSuccess] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.lg-page .reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index) => setOpenFaq((prev) => (prev === index ? null : index));

  const errBorder = (field, errors) => errors[field] ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239,68,68,.12)' } : {};

  const scrollToField = (fieldId) => {
    const el = document.getElementById(fieldId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const submitToApi = async (payload, { setLoading, setMsg, setSuccess, setSubmitted, onSuccess }) => {
    try {
      setLoading(true);
      setMsg('');
      const response = await fetch(`${API_BASE}/api/contact-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setSubmitted(true);
        onSuccess?.();
        return true;
      }
      setSuccess(false);
      setMsg(data.message || 'Submission failed. Please try again.');
      return false;
    } catch {
      setSuccess(false);
      setMsg('Something went wrong. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (leadLoading) return;

    const ve = {};
    const fullName = `${leadForm.fname} ${leadForm.lname}`.trim();

    if (!leadForm.fname.trim()) ve.fname = 'First name is required';
    else if (!validateName(leadForm.fname)) ve.fname = 'Only alphabets (min 2 chars)';

    if (!leadForm.lname.trim()) ve.lname = 'Last name is required';
    else if (!validateName(leadForm.lname)) ve.lname = 'Only alphabets (min 2 chars)';

    if (!leadForm.email.trim()) ve.email = 'Email is required';
    else if (!validateEmail(leadForm.email)) ve.email = 'Invalid email';

    if (!leadForm.phone.trim()) ve.phone = 'Phone is required';
    else if (!validatePhone(leadForm.phone)) ve.phone = 'Enter valid 10-15 digit number';

    if (!validateCountry(leadForm.country)) ve.country = 'Enter a valid country name';

    if (!leadForm.route) ve.route = 'Please select a preferred route';

    setLeadErrors(ve);
    if (Object.keys(ve).length > 0) {
      const firstKey = Object.keys(ve)[0];
      const fieldMap = { fname: 'fname', lname: 'lname', email: 'email', phone: 'phone', country: 'country', route: 'route' };
      scrollToField(fieldMap[firstKey]);
      return;
    }

    await submitToApi({
      name: fullName,
      email: leadForm.email.trim(),
      mobile: leadForm.phone.trim(),
      message: [
        'Malta Global Residence consultation request.',
        leadForm.country ? `Country of residence: ${leadForm.country}.` : '',
        leadForm.route ? `Preferred route: ${leadForm.route}.` : '',
      ].filter(Boolean).join(' '),
      type: 'Malta Global Residence Consultation',
      service: SERVICE,
    }, {
      setLoading: setLeadLoading,
      setMsg: setLeadMsg,
      setSuccess: setLeadSuccess,
      setSubmitted: setLeadSubmitted,
      onSuccess: () => {
        setLeadMsg('Thank you — an advisor will be in touch shortly to arrange your consultation.');
        setLeadForm({ fname: '', lname: '', email: '', phone: '', country: '', route: '' });
        setLeadErrors({});
      },
    });
  };

  const handleOfficeSubmit = async (e) => {
    e.preventDefault();
    if (officeLoading) return;

    const ve = {};

    if (!officeForm.name.trim()) ve.name = 'Full name is required';
    else if (!validateName(officeForm.name)) ve.name = 'Only alphabets (min 2 chars)';

    if (!officeForm.phone.trim()) ve.phone = 'Phone is required';
    else if (!validatePhone(officeForm.phone)) ve.phone = 'Enter valid 10-15 digit number';

    if (!officeForm.email.trim()) ve.email = 'Email is required';
    else if (!validateEmail(officeForm.email)) ve.email = 'Invalid email';

    if (!officeForm.date) ve.date = 'Please select a preferred date';
    else if (isPastDate(officeForm.date)) ve.date = 'Please choose a future date';

    if (!officeForm.time) ve.time = 'Please select a preferred time';

    setOfficeErrors(ve);
    if (Object.keys(ve).length > 0) {
      const firstKey = Object.keys(ve)[0];
      const fieldMap = { name: 'ov-name', phone: 'ov-phone', email: 'ov-email', date: 'ov-date', time: 'ov-time' };
      scrollToField(fieldMap[firstKey]);
      return;
    }

    await submitToApi({
      name: officeForm.name.trim(),
      email: officeForm.email.trim(),
      mobile: officeForm.phone.trim(),
      message: `Office visit request on ${officeForm.date} (${officeForm.time}). Programme: ${SERVICE}.`,
      type: 'Office Visit Request',
      service: SERVICE,
    }, {
      setLoading: setOfficeLoading,
      setMsg: setOfficeMsg,
      setSuccess: setOfficeSuccess,
      setSubmitted: setOfficeSubmitted,
      onSuccess: () => {
        setOfficeMsg("Thank you — we'll be in touch shortly to confirm your visit.");
        setOfficeForm({ name: '', phone: '', email: '', date: '', time: '' });
        setOfficeErrors({});
      },
    });
  };

  const calPrev = () => {
    const today = new Date(); today.setHours(0,0,0,0);
    const prev = new Date(calView.getFullYear(), calView.getMonth() - 1, 1);
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) { setCalView(prev); setCalDay(null); }
  };
  const calNext = () => {
    setCalView(new Date(calView.getFullYear(), calView.getMonth() + 1, 1));
    setCalDay(null);
  };

  const calDays = useMemo(() => {
    const today = new Date(); today.setHours(0,0,0,0);
    const cells = [];
    let startDow = calView.getDay();
    startDow = startDow === 0 ? 6 : startDow - 1;
    for (let i = 0; i < startDow; i++) cells.push(<div key={'e'+i} className="cal-day empty" />);
    const daysInMonth = new Date(calView.getFullYear(), calView.getMonth() + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(calView.getFullYear(), calView.getMonth(), d);
      const dow = date.getDay();
      const isPast = date < today;
      const isWeekend = dow === 0 || dow === 6;
      const isSel = calDay && date.toDateString() === calDay.toDateString();
      if (isPast || isWeekend) {
        cells.push(<div key={d} className="cal-day off">{d}</div>);
      } else {
        cells.push(
          <div key={d} className={`cal-day avail ${isSel ? 'sel' : ''}`}
            onClick={() => { setCalDay(date); setCalConfirm(''); setCalErrors((prev) => ({ ...prev, date: '' })); }}>{d}</div>
        );
      }
    }
    return cells;
  }, [calView, calDay]);

  const handleCalBook = async () => {
    const ve = {};

    if (!calDay) ve.date = 'Please choose a date';
    if (!calSlot) ve.slot = 'Please choose a time slot';

    if (!calForm.name.trim()) ve.name = 'Name is required';
    else if (!validateName(calForm.name)) ve.name = 'Only alphabets (min 2 chars)';

    if (!calForm.email.trim()) ve.email = 'Email is required';
    else if (!validateEmail(calForm.email)) ve.email = 'Invalid email';

    if (!calForm.phone.trim()) ve.phone = 'Phone is required';
    else if (!validatePhone(calForm.phone)) ve.phone = 'Enter valid 10-15 digit number';

    setCalErrors(ve);
    if (Object.keys(ve).length > 0) {
      setCalSuccess(false);
      setCalConfirm(ve.date || ve.slot ? 'Please choose both a date and a time slot.' : 'Please complete your contact details below.');
      if (ve.name) scrollToField('cal-name');
      else if (ve.email) scrollToField('cal-email');
      else if (ve.phone) scrollToField('cal-phone');
      return;
    }

    const opts = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateLabel = calDay.toLocaleDateString('en-GB', opts);

    await submitToApi({
      name: calForm.name.trim(),
      email: calForm.email.trim(),
      mobile: calForm.phone.trim(),
      message: `Consultation slot request: ${dateLabel} at ${calSlot}. Programme: ${SERVICE}.`,
      type: 'Consultation Booking',
      service: SERVICE,
    }, {
      setLoading: setCalLoading,
      setMsg: setCalConfirm,
      setSuccess: setCalSuccess,
      setSubmitted: () => {},
      onSuccess: () => {
        setCalConfirm(`Requested: ${dateLabel} at ${calSlot}. We'll email to confirm.`);
        setCalForm({ name: '', email: '', phone: '' });
        setCalErrors({});
        setCalDay(null);
        setCalSlot(null);
      },
    });
  };

  return (
    <div className="lg-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
  .lg-page {
    --navy:#296166;
    --navy-deep:#1A2540;
    --navy-mid:#296166;
    --emerald:#0E4B3E;
    --emerald-soft:#3D7A68;
    --gold:#6FE0C6;
    --gold-soft:#6FE0C6;
    --gold-deep:#296166;
    --ivory:#F5F8F6;
    --beige:#E9F1EE;
    --charcoal:#296166;
    --muted:#296166;
    --line:rgba(47,199,161,0.30);
    --radius:4px;
    --shadow-soft:0 18px 50px rgba(26,37,64,0.10);
    --shadow-strong:0 30px 70px rgba(26,37,64,0.22);
    --ease:cubic-bezier(.22,.61,.36,1);
  }

  .lg-page * {margin:0;padding:0;box-sizing:border-box;}
  .lg-page html {scroll-behavior:smooth;}
  .lg-page body {
    font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
    color:var(--charcoal);
    background:var(--ivory);
    line-height:1.7;
    font-weight:400;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  .lg-page h1, .lg-page h2, .lg-page h3, .lg-page h4 {
    font-family:'Cormorant Garamond',Georgia,serif;
    font-weight:600;
    color:var(--navy);
    line-height:1.12;
    letter-spacing:0.2px;
  }
  .lg-page p {font-weight:400;}
  .lg-page a {color:inherit;text-decoration:none;}
  .lg-page img {display:block;width:100%;height:100%;object-fit:cover;}
  .lg-page .container {max-width:1200px;margin:0 auto;padding:0 30px;}
  .lg-page .block {padding:108px 0;}
  .lg-page .eyebrow {
    font-family:'Inter',sans-serif;
    text-transform:uppercase;
    letter-spacing:3.5px;
    font-size:11.5px;
    color:var(--gold-deep);
    font-weight:600;
    margin-bottom:18px;
    display:flex;
    align-items:center;
    gap:12px;
  }
  .lg-page .eyebrow::before {
    content:"";width:34px;height:1px;background:var(--gold);display:inline-block;
  }
  .lg-page .eyebrow.center {justify-content:center;}
  .lg-page .section-head {max-width:760px;margin:0 auto 60px;text-align:center;}
  .lg-page .section-head h2 {font-size:clamp(34px,4.6vw,54px);margin-bottom:18px;}
  .lg-page .section-head p {color:var(--muted);font-size:17px;}

  .lg-page .btn {
    display:inline-flex;align-items:center;gap:10px;
    font-family:'Inter',sans-serif;font-size:14px;font-weight:600;
    letter-spacing:0.4px;padding:16px 32px;border-radius:var(--radius);
    cursor:pointer;border:1px solid transparent;transition:all .35s var(--ease);
  }
  .lg-page .btn-gold {background:var(--gold);color:var(--navy-deep);}
  .lg-page .btn-gold:hover {background:var(--gold-soft);transform:translateY(-2px);box-shadow:0 14px 30px rgba(47,199,161,.32);}
  .lg-page .btn-ghost {background:transparent;color:var(--ivory);border:1px solid rgba(247,250,252,.45);}
  .lg-page .btn-ghost:hover {border-color:var(--gold);color:var(--gold-soft);}
  .lg-page .btn-navy {background:var(--navy);color:var(--ivory);}
  .lg-page .btn-navy:hover {background:var(--navy-mid);transform:translateY(-2px);}

  /* ===== TILEWORK SIGNATURE DIVIDER ===== */
  .lg-page .tilework {
    height:18px;width:100%;
    background:
      radial-gradient(circle at 10px 9px, var(--gold) 0 2px, transparent 2.5px),
      radial-gradient(circle at 0 0, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px),
      radial-gradient(circle at 20px 0, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px),
      radial-gradient(circle at 0 18px, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px),
      radial-gradient(circle at 20px 18px, transparent 8px, var(--gold) 8px 8.6px, transparent 9.2px);
    background-size:20px 18px;
    background-repeat:repeat-x;
    background-position:left center;
    background-color:var(--navy);
    display:block;
    overflow:hidden;
    opacity:.92;
  }

  /* ===== HEADER ===== */
  .lg-page header {
    position:fixed;top:0;left:0;right:0;z-index:1000;
    padding:22px 0;transition:all .4s var(--ease);
  }
  .lg-page header.scrolled {
    background:rgba(26,37,64,0.94);backdrop-filter:blur(10px);
    padding:14px 0;box-shadow:0 6px 30px rgba(0,0,0,.25);
  }
  .lg-page .nav-wrap {display:flex;align-items:center;justify-content:space-between;}
  .lg-page .brand {display:flex;flex-direction:column;line-height:1;}
  .lg-page .brand .name {font-family:'Cormorant Garamond',serif;font-size:25px;font-weight:600;color:var(--ivory);letter-spacing:1px;}
  .lg-page .brand .tag {font-family:'Inter',sans-serif;font-size:9.5px;letter-spacing:3.5px;text-transform:uppercase;color:var(--gold-soft);margin-top:4px;}
  .lg-page .nav-links {display:flex;align-items:center;gap:34px;}
  .lg-page .nav-links a {font-size:13.5px;font-weight:500;color:rgba(247,250,252,.85);letter-spacing:.3px;transition:color .25s;}
  .lg-page .nav-links a:hover {color:var(--gold-soft);}
  .lg-page .nav-cta {padding:11px 24px;font-size:13px;background:var(--gold);color:var(--navy-deep);border-radius:var(--radius);font-weight:600;transition:all .3s;}
  .lg-page .nav-cta:hover {background:var(--gold-soft);}
  .lg-page .burger {display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;}
  .lg-page .burger span {width:24px;height:2px;background:var(--ivory);display:block;}

  /* ===== HERO ===== */
  .lg-page .hero {
    position:relative;
    min-height:auto;
    display:flex;
    align-items:center;
    color:#1B2B28;
    overflow:hidden;
    background:#FFFFFF;padding:96px 0 70px;
  }
  .lg-page .hero::before {
    content:"";
    position:absolute;inset:0;
    background-image:
      radial-gradient(circle at 20% 50%, rgba(47,199,161,0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(14,75,62,0.30) 0%, transparent 45%);
    z-index:0;
    pointer-events:none;
  }
  .lg-page .hero-split {
    position:relative;z-index:2;
    width:100%;
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:64px;
    align-items:center;
    padding-top:110px;
    padding-bottom:70px;
  }
  .lg-page .hero-copy {display:flex;flex-direction:column;}
  .lg-page .hero h1 {font-size:clamp(38px,5vw,66px);color:#1B2B28;margin-bottom:26px;font-weight:600;line-height:1.08;}
  .lg-page .hero h1 em {font-style:italic;color:#4FA3D1;font-weight:500;}
  .lg-page .hero .lead {font-size:17.5px;color:#4C5C58;max-width:560px;margin-bottom:38px;font-weight:300;line-height:1.72;}
  .lg-page .hero-cta {display:flex;gap:16px;flex-wrap:wrap;margin-bottom:48px;}
  .lg-page .hero-badges {display:flex;gap:36px;flex-wrap:wrap;border-top:1px solid #D8E0EC;padding-top:28px;}
  .lg-page .hero-badge .num {font-family:'Cormorant Garamond',serif;font-size:30px;color:#296166;font-weight:600;line-height:1;}
  .lg-page .hero-badge .lbl {font-size:11.5px;letter-spacing:.6px;color:#7E8C88;margin-top:6px;}

  .lg-page .hero-visual {display:flex;align-items:center;justify-content:center;position:relative;}
  .lg-page .hero-img-frame {
    position:relative;width:100%;max-width:520px;border-radius:12px;overflow:hidden;
    box-shadow:0 40px 90px rgba(0,0,0,.45),0 0 0 1px rgba(47,199,161,.22);
  }
  .lg-page .hero-img-frame img {
    display:block;width:100%;height:480px;object-fit:cover;border-radius:12px;
    transition:transform .9s var(--ease);
  }
  .lg-page .hero-img-frame:hover img {transform:scale(1.04);}
  .lg-page .hero-img-frame::after {
    content:"";position:absolute;inset:12px;border:1px solid rgba(47,199,161,.38);
    border-radius:8px;pointer-events:none;z-index:2;
  }
  .lg-page .hero-img-frame::before {
    content:"";position:absolute;inset:0;
    background:linear-gradient(to top,rgba(26,37,64,.42) 0%,transparent 55%);
    z-index:1;border-radius:12px;pointer-events:none;
  }
  .lg-page .hero-visual::before {
    content:"";position:absolute;top:24px;right:-14px;width:100%;max-width:520px;height:100%;
    border:1px solid rgba(47,199,161,.18);border-radius:12px;pointer-events:none;
  }
  .lg-page .hero-img-badge {
    position:absolute;bottom:22px;left:22px;z-index:3;
    background:rgba(26,37,64,.82);backdrop-filter:blur(8px);
    border:1px solid rgba(47,199,161,.30);border-radius:6px;padding:10px 16px;
    display:flex;align-items:center;gap:10px;
  }
  .lg-page .hero-img-badge .dot-pulse {
    width:8px;height:8px;border-radius:50%;background:var(--gold);flex-shrink:0;
    animation:pulse-dot 2s ease infinite;
  }
  @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.6;transform:scale(.85);}}
  .lg-page .hero-img-badge span {font-size:12px;letter-spacing:.5px;color:rgba(247,250,252,.88);font-weight:500;}

  .lg-page .scroll-hint {position:absolute;bottom:30px;left:50%;transform:translateX(-50%);z-index:2;font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:rgba(247,250,252,.5);display:flex;flex-direction:column;align-items:center;gap:8px;}
  .lg-page .scroll-hint .line {width:1px;height:38px;background:linear-gradient(var(--gold),transparent);animation:drop 2s var(--ease) infinite;}
  @keyframes drop{0%{transform:scaleY(0);transform-origin:top;}50%{transform:scaleY(1);transform-origin:top;}51%{transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}

  @media(max-width:980px){
    .hero-split {grid-template-columns:1fr;gap:48px;padding-top:120px;padding-bottom:60px;}
    .hero-img-frame img {height:380px;}
    .hero-visual::before {display:none;}
    .hero-img-frame {max-width:100%;}
  }
  @media(max-width:640px){
    .lg-page .hero-split {padding-top:100px;padding-bottom:50px;gap:36px;}
    .lg-page .hero-img-frame img {height:280px;}
    .lg-page .hero-badges {gap:22px;}
  }

  /* ===== TRUST STATS BAR ===== */
  .lg-page .stats-bar {background:var(--navy-deep);color:var(--ivory);}
  .lg-page .stats-grid {display:grid;grid-template-columns:repeat(4,1fr);gap:0;}
  .lg-page .stat-cell {padding:52px 30px;text-align:center;border-right:1px solid rgba(247,250,252,.10);}
  .lg-page .stat-cell:last-child {border-right:none;}
  .lg-page .stat-cell .v {font-family:'Cormorant Garamond',serif;font-size:46px;font-weight:600;color:var(--gold-soft);line-height:1;margin-bottom:12px;}
  .lg-page .stat-cell .k {font-size:13px;letter-spacing:.5px;color:rgba(247,250,252,.78);}

  /* ===== ABOUT ===== */
  .lg-page .about {background:var(--ivory);}
  .lg-page .about-grid {display:grid;grid-template-columns:1.05fr 1fr;gap:64px;align-items:center;}
  .lg-page .about-copy .eyebrow {margin-bottom:18px;}
  .lg-page .about-copy h2 {font-size:clamp(32px,4.4vw,52px);margin-bottom:22px;}
  .lg-page .about-copy p {color:var(--muted);margin-bottom:18px;font-size:16.5px;}
  .lg-page .about-media {position:relative;height:560px;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-strong);}
  .lg-page .about-media .frame {position:absolute;inset:14px;border:1px solid rgba(247,250,252,.5);z-index:2;pointer-events:none;}
  .lg-page .facts-row {display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:54px;}
  .lg-page .fact {background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:26px 22px;text-align:center;}
  .lg-page .fact .ff {font-family:'Cormorant Garamond',serif;font-size:30px;color:var(--navy);font-weight:600;}
  .lg-page .fact .fl {font-size:12.5px;color:var(--muted);letter-spacing:.4px;margin-top:6px;}

  /* ===== WHY MALTA (INVESTORS) ===== */
  .lg-page .why {background:var(--beige);}
  .lg-page .why-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;}
  .lg-page .why-card {background:var(--ivory);padding:42px 34px;transition:background .3s;}
  .lg-page .why-card:hover {background:#fff;}
  .lg-page .why-card .ic {width:46px;height:46px;border:1px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--gold-deep);font-family:'Cormorant Garamond',serif;font-size:21px;margin-bottom:20px;}
  .lg-page .why-card h3 {font-size:24px;margin-bottom:10px;}
  .lg-page .why-card p {color:var(--muted);font-size:15px;}

  /* ===== PROGRAMME OVERVIEW ===== */
  .lg-page .prog {background:var(--navy);color:var(--ivory);}
  .lg-page .prog .section-head h2 {color:var(--ivory);}
  .lg-page .prog .section-head p {color:rgba(247,250,252,.72);}
  .lg-page .prog-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:26px;}
  .lg-page .prog-card {background:rgba(247,250,252,.04);border:1px solid rgba(247,250,252,.12);border-radius:var(--radius);padding:38px 32px;transition:all .35s var(--ease);}
  .lg-page .prog-card:hover {border-color:var(--gold);transform:translateY(-6px);}
  .lg-page .prog-card .no {font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--gold-soft);border-bottom:1px solid rgba(247,250,252,.16);padding-bottom:14px;margin-bottom:18px;letter-spacing:2px;}
  .lg-page .prog-card h3 {color:var(--ivory);font-size:25px;margin-bottom:12px;}
  .lg-page .prog-card p {color:rgba(247,250,252,.74);font-size:15px;}

  /* ===== BENEFITS / PATHWAY (shared card style) ===== */
  .lg-page .benefits {background:var(--ivory);}
  .lg-page .ben-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .lg-page .ben-card {background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:36px 30px;position:relative;overflow:hidden;transition:all .35s var(--ease);}
  .lg-page .ben-card::before {content:"";position:absolute;top:0;left:0;width:3px;height:0;background:var(--gold);transition:height .4s var(--ease);}
  .lg-page .ben-card:hover {box-shadow:var(--shadow-soft);transform:translateY(-4px);}
  .lg-page .ben-card:hover::before {height:100%;}
  .lg-page .ben-card .mk {font-family:'Cormorant Garamond',serif;font-size:15px;color:var(--gold-deep);letter-spacing:2px;margin-bottom:16px;}
  .lg-page .ben-card h3 {font-size:23px;margin-bottom:10px;}
  .lg-page .ben-card p {color:var(--muted);font-size:15px;}
  .lg-page .pathway {background:var(--beige);}

  /* ===== FINANCIAL REQUIREMENTS ===== */
  .lg-page .finance {background:var(--beige);}
  .lg-page .fin-table {background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-soft);}
  .lg-page .fin-row {display:grid;grid-template-columns:1.4fr 1fr 1fr;align-items:center;border-bottom:1px solid var(--line);}
  .lg-page .fin-row:last-child {border-bottom:none;}
  .lg-page .fin-row.head {background:var(--navy);color:var(--ivory);}
  .lg-page .fin-row.head .fc {color:var(--ivory);font-weight:600;font-family:'Inter',sans-serif;font-size:13px;letter-spacing:.6px;text-transform:uppercase;}
  .lg-page .fc {padding:22px 28px;font-size:15.5px;}
  .lg-page .fc.label {font-weight:600;color:var(--navy);}
  .lg-page .fc.fig {font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--gold-deep);font-weight:600;}
  .lg-page .fin-row.total {background:rgba(47,199,161,.10);}
  .lg-page .fin-note {margin-top:24px;font-size:13.5px;color:var(--muted);text-align:center;font-style:italic;}
  .lg-page .fin-extra {display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:40px;}
  .lg-page .fin-x {background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:28px;}
  .lg-page .fin-x h4 {font-size:21px;margin-bottom:8px;}
  .lg-page .fin-x p {color:var(--muted);font-size:14.5px;}

  /* ===== FAMILY ===== */
  .lg-page .family {background:var(--ivory);}
  .lg-page .fam-grid {display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
  .lg-page .fam-list {list-style:none;}
  .lg-page .fam-list li {display:flex;gap:18px;padding:22px 0;border-bottom:1px solid var(--line);}
  .lg-page .fam-list li:last-child {border-bottom:none;}
  .lg-page .fam-list .fi {flex:0 0 42px;height:42px;border-radius:50%;background:var(--navy);color:var(--gold-soft);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:19px;}
  .lg-page .fam-list h4 {font-size:21px;margin-bottom:2px;}
  .lg-page .fam-list p {color:var(--muted);font-size:14.5px;}
  .lg-page .fam-media {height:520px;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-strong);position:relative;}
  .lg-page .fam-media .frame {position:absolute;inset:14px;border:1px solid rgba(247,250,252,.5);z-index:2;}

  /* ===== PROCESS TIMELINE ===== */
  .lg-page .process {background:var(--navy-deep);color:var(--ivory);}
  .lg-page .process .section-head h2 {color:var(--ivory);}
  .lg-page .process .section-head p {color:rgba(247,250,252,.72);}
  .lg-page .timeline {position:relative;max-width:880px;margin:0 auto;}
  .lg-page .timeline::before {content:"";position:absolute;left:31px;top:8px;bottom:8px;width:1px;background:rgba(247,250,252,.18);}
  .lg-page .tl-item {position:relative;padding-left:92px;padding-bottom:44px;}
  .lg-page .tl-item:last-child {padding-bottom:0;}
  .lg-page .tl-item .dot {position:absolute;left:0;top:0;width:64px;height:64px;border-radius:50%;border:1px solid var(--gold);background:var(--navy-deep);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--gold-soft);}
  .lg-page .tl-item h3 {color:var(--ivory);font-size:25px;margin-bottom:6px;}
  .lg-page .tl-item .dur {display:inline-block;font-size:11.5px;letter-spacing:.5px;text-transform:uppercase;color:var(--gold-soft);margin-bottom:8px;}
  .lg-page .tl-item p {color:rgba(247,250,252,.72);font-size:15px;max-width:620px;}

  /* ===== TAX ===== */
  .lg-page .tax {background:var(--ivory);}
  .lg-page .tax-grid {display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
  .lg-page .tax-copy h2 {font-size:clamp(30px,4vw,48px);margin-bottom:20px;}
  .lg-page .tax-copy p {color:var(--muted);font-size:16.5px;margin-bottom:18px;}
  .lg-page .tax-panel {background:var(--emerald);color:var(--ivory);border-radius:var(--radius);padding:46px 42px;box-shadow:var(--shadow-strong);}
  .lg-page .tax-panel h3 {color:var(--gold-soft);font-size:26px;margin-bottom:24px;}
  .lg-page .tax-line {display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:16px 0;border-bottom:1px solid rgba(247,250,252,.14);}
  .lg-page .tax-line:last-of-type {border-bottom:none;}
  .lg-page .tax-line .t {color:rgba(247,250,252,.82);font-size:14.5px;max-width:60%;}
  .lg-page .tax-line .v {font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--ivory);font-weight:600;}
  .lg-page .tax-foot {font-size:12.5px;color:rgba(247,250,252,.6);margin-top:18px;font-style:italic;line-height:1.6;}

  /* ===== BUSINESS IN MALTA ===== */
  .lg-page .business {background:var(--navy);color:var(--ivory);}
  .lg-page .business .section-head h2 {color:var(--ivory);}
  .lg-page .business .section-head p {color:rgba(247,250,252,.72);}
  .lg-page .biz-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .lg-page .biz-card {background:rgba(247,250,252,.04);border:1px solid rgba(247,250,252,.12);border-radius:var(--radius);padding:36px 30px;transition:all .35s var(--ease);}
  .lg-page .biz-card:hover {border-color:var(--gold);transform:translateY(-5px);}
  .lg-page .biz-card h3 {color:var(--ivory);font-size:22px;margin-bottom:10px;}
  .lg-page .biz-card p {color:rgba(247,250,252,.72);font-size:15px;}

  /* ===== FAMILIES / LIFESTYLE ===== */
  .lg-page .families {background:var(--beige);}
  .lg-page .fam2-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .lg-page .fam2-card {background:var(--ivory);border:1px solid var(--line);border-radius:var(--radius);padding:34px 30px;}
  .lg-page .fam2-card .ic {width:44px;height:44px;border-radius:50%;background:var(--navy);color:var(--gold-soft);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:19px;margin-bottom:18px;}
  .lg-page .fam2-card h3 {font-size:21px;margin-bottom:8px;}
  .lg-page .fam2-card p {color:var(--muted);font-size:14.5px;}

  /* ===== LIFE IN MALTA ===== */
  .lg-page .life {background:var(--beige);}
  .lg-page .life-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .lg-page .life-card {position:relative;height:420px;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-soft);}
  .lg-page .life-card img {transition:transform .8s var(--ease);}
  .lg-page .life-card:hover img {transform:scale(1.06);}
  .lg-page .life-card .ov {position:absolute;inset:0;background:linear-gradient(to top,rgba(26,37,64,.88) 0%,rgba(26,37,64,.18) 55%,transparent 100%);z-index:1;}
  .lg-page .life-card .cap {position:absolute;left:0;right:0;bottom:0;z-index:2;padding:30px 28px;}
  .lg-page .life-card .cap h3 {color:var(--ivory);font-size:27px;margin-bottom:6px;}
  .lg-page .life-card .cap p {color:rgba(247,250,252,.82);font-size:14px;}
  .lg-page .life-strip {display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:48px;}
  .lg-page .life-tag {border:1px solid var(--line);border-radius:40px;padding:10px 22px;font-size:13.5px;color:var(--navy);background:#fff;}

  /* ===== WHY LANGMA ===== */
  .lg-page .langma {background:var(--navy);color:var(--ivory);position:relative;overflow:hidden;}
  .lg-page .langma-grid {display:grid;grid-template-columns:1fr 1.1fr;gap:64px;align-items:center;}
  .lg-page .langma h2 {color:var(--ivory);font-size:clamp(32px,4.4vw,52px);margin-bottom:20px;}
  .lg-page .langma .lead {color:rgba(247,250,252,.82);font-size:17px;margin-bottom:14px;}
  .lg-page .lg-list {display:grid;grid-template-columns:1fr 1fr;gap:30px 36px;}
  .lg-page .lg-item h4 {color:var(--gold-soft);font-size:22px;margin-bottom:6px;}
  .lg-page .lg-item p {color:rgba(247,250,252,.72);font-size:14.5px;}

  /* ===== FAQ ===== */
  .lg-page .faq {background:var(--ivory);}
  .lg-page .faq-wrap {max-width:880px;margin:0 auto;}
  .lg-page .faq-item {border-bottom:1px solid var(--line);}
  .lg-page .faq-q {width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:28px 0;display:flex;justify-content:space-between;align-items:center;gap:24px;font-family:'Cormorant Garamond',serif;font-size:23px;color:var(--navy);font-weight:600;}
  .lg-page .faq-q .pm {flex:0 0 30px;height:30px;border:1px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--gold-deep);font-family:'Inter',sans-serif;font-size:18px;transition:all .3s;}
  .lg-page .faq-item.open .pm {background:var(--gold);color:var(--navy);transform:rotate(45deg);}
  .lg-page .faq-a {max-height:0;overflow:hidden;transition:max-height .45s var(--ease);opacity:1;visibility:visible;}
  .lg-page .faq-item.open .faq-a {max-height:600px;}
  .lg-page .faq-a-inner {padding:0 0 28px;color:var(--muted);font-size:16px;line-height:1.75;max-width:760px;}

  /* ===== LEAD FORM ===== */
  .lg-page .lead-sec {background:var(--navy-deep);color:var(--ivory);}
  .lg-page .lead-grid {display:grid;grid-template-columns:1fr 1.1fr;gap:64px;align-items:start;}
  .lg-page .lead-copy .eyebrow {color:var(--gold-soft);}
  .lg-page .lead-copy h2 {color:var(--ivory);font-size:clamp(32px,4.2vw,50px);margin-bottom:20px;}
  .lg-page .lead-copy p {color:rgba(247,250,252,.80);margin-bottom:26px;font-size:16.5px;}
  .lg-page .lead-assure {list-style:none;}
  .lg-page .lead-assure li {display:flex;gap:12px;align-items:center;padding:11px 0;color:rgba(247,250,252,.86);font-size:15px;}
  .lg-page .lead-assure li::before {content:"\\2713";color:var(--gold-soft);font-weight:700;}
  .lg-page .form-card {background:var(--ivory);border-radius:var(--radius);padding:42px;box-shadow:var(--shadow-strong);}
  .lg-page .form-card h3 {font-size:27px;margin-bottom:6px;}
  .lg-page .form-card .fsub {color:var(--muted);font-size:14.5px;margin-bottom:26px;}
  .lg-page .frow {display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .lg-page .field {margin-bottom:16px;}
  .lg-page .field label {display:block;font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:var(--navy);font-weight:600;margin-bottom:7px;}
  .lg-page .field input, .lg-page .field select {width:100%;padding:13px 15px;border:1px solid var(--line);border-radius:var(--radius);font-family:'Inter',sans-serif;font-size:15px;background:#fff;color:var(--charcoal);transition:border-color .25s;}
  .lg-page .field input:focus, .lg-page .field select:focus {outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(47,199,161,.15);}
  .lg-page .form-card .btn {width:100%;justify-content:center;margin-top:6px;}
  .lg-page .form-card .disc {font-size:12px;color:var(--muted);margin-top:14px;text-align:center;}
  .lg-page .success {display:none;background:rgba(47,199,161,.14);border:1px solid var(--gold);border-radius:var(--radius);padding:16px;color:var(--gold-deep);font-size:14.5px;text-align:center;margin-top:16px;}
  .lg-page .success.show {display:block;}
  .lg-page .field-err {color:#ef4444;font-size:12px;margin-top:4px;}
  .lg-page .field-req {color:#ef4444;margin-left:2px;}
  .lg-page .form-msg.error {display:block;background:rgba(220,38,38,.08);border:1px solid #ef4444;color:#b91c1c;}
  .lg-page .cal-slot-err {color:#ef4444;font-size:12px;margin-top:8px;}

  /* ===== OFFICE VISIT ===== */
  .lg-page .office {background:var(--beige);}
  .lg-page .office-grid {display:grid;grid-template-columns:1fr 1.05fr;gap:60px;align-items:center;}
  .lg-page .office-copy h2 {font-size:clamp(30px,4vw,46px);margin-bottom:18px;}
  .lg-page .office-copy p {color:var(--muted);font-size:16.5px;margin-bottom:26px;}
  .lg-page .office-points {list-style:none;margin-bottom:8px;}
  .lg-page .office-points li {display:flex;gap:16px;padding:16px 0;border-bottom:1px solid var(--line);}
  .lg-page .office-points .oi {flex:0 0 38px;height:38px;border-radius:50%;border:1px solid var(--gold);color:var(--gold-deep);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:18px;}
  .lg-page .office-points h4 {font-size:19px;margin-bottom:1px;}
  .lg-page .office-points p {font-size:14px;margin:0;}
  .lg-page .office-form {background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:40px;box-shadow:var(--shadow-soft);}
  .lg-page .office-form h3 {font-size:25px;margin-bottom:22px;}

  /* ===== CALENDAR ===== */
  .lg-page .calendar {background:var(--navy);color:var(--ivory);}
  .lg-page .cal-grid {display:grid;grid-template-columns:1fr 1.05fr;gap:60px;align-items:center;}
  .lg-page .cal-copy h2 {color:var(--ivory);font-size:clamp(30px,4vw,48px);margin-bottom:18px;}
  .lg-page .cal-copy p {color:rgba(247,250,252,.80);font-size:16.5px;margin-bottom:24px;}
  .lg-page .cal-benefits {list-style:none;margin-bottom:8px;}
  .lg-page .cal-benefits li {display:flex;gap:12px;align-items:flex-start;padding:10px 0;color:rgba(247,250,252,.86);font-size:15px;}
  .lg-page .cal-benefits li::before {content:"\\25C8";color:var(--gold-soft);}
  .lg-page .cal-urgency {display:inline-flex;align-items:center;gap:10px;margin-top:10px;background:rgba(47,199,161,.12);border:1px solid var(--line);border-radius:40px;padding:9px 20px;font-size:13px;color:var(--gold-soft);}
  .lg-page .cal-urgency .dot-pulse {width:8px;height:8px;border-radius:50%;background:var(--gold);animation:pulse-dot 2s ease infinite;}
  .lg-page .cal-card {background:var(--ivory);border-radius:var(--radius);padding:38px;box-shadow:var(--shadow-strong);color:var(--charcoal);}
  .lg-page .cal-card h3 {font-size:24px;margin-bottom:4px;}
  .lg-page .cal-card .csub {color:var(--muted);font-size:14px;margin-bottom:22px;}
  .lg-page .cal-head {display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
  .lg-page .cal-head span {font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--navy);font-weight:600;}
  .lg-page .cal-head button {background:none;border:1px solid var(--line);border-radius:50%;width:30px;height:30px;cursor:pointer;color:var(--gold-deep);font-size:15px;}
  .lg-page .cal-dow {display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:8px;}
  .lg-page .cal-dow span {text-align:center;font-size:11px;letter-spacing:.4px;text-transform:uppercase;color:var(--muted);}
  .lg-page .cal-days {display:grid;grid-template-columns:repeat(7,1fr);gap:6px;}
  .lg-page .cal-day {aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:14px;border-radius:var(--radius);cursor:pointer;border:1px solid transparent;transition:all .2s;color:var(--charcoal);}
  .lg-page .cal-day.empty {cursor:default;}
  .lg-page .cal-day.avail:hover {background:rgba(47,199,161,.16);border-color:var(--gold);}
  .lg-page .cal-day.sel {background:var(--navy);color:var(--ivory);}
  .lg-page .cal-day.off {color:#c7c2b6;cursor:default;text-decoration:line-through;}
  .lg-page .cal-slots {display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px;}
  .lg-page .cal-slot {padding:11px 6px;text-align:center;border:1px solid var(--line);border-radius:var(--radius);font-size:13.5px;cursor:pointer;transition:all .2s;}
  .lg-page .cal-slot:hover {border-color:var(--gold);}
  .lg-page .cal-slot.sel {background:var(--gold);color:var(--navy-deep);border-color:var(--gold);font-weight:600;}
  .lg-page .cal-card .btn {width:100%;justify-content:center;margin-top:20px;}
  .lg-page .cal-confirm {font-size:13px;color:var(--gold-deep);text-align:center;margin-top:14px;min-height:18px;}

  /* ===== FOOTER ===== */
  .lg-page footer {background:var(--navy-deep);color:rgba(247,250,252,.7);padding:74px 0 32px;}
  .lg-page .foot-grid {display:grid;grid-template-columns:2fr 1fr 1fr 1.3fr;gap:44px;margin-bottom:50px;}
  .lg-page .foot-brand .name {font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--ivory);font-weight:600;letter-spacing:1px;}
  .lg-page .foot-brand .tag {font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--gold-soft);margin:6px 0 18px;}
  .lg-page .foot-brand p {font-size:14px;max-width:320px;}
  .lg-page .foot-col h4 {color:var(--ivory);font-size:18px;margin-bottom:18px;font-weight:600;}
  .lg-page .foot-col a {display:block;font-size:14px;padding:6px 0;transition:color .25s;}
  .lg-page .foot-col a:hover {color:var(--gold-soft);}
  .lg-page .foot-bottom {border-top:1px solid rgba(247,250,252,.12);padding-top:26px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:14px;font-size:12.5px;}
  .lg-page .legal {max-width:920px;font-size:11.5px;color:rgba(247,250,252,.5);line-height:1.7;margin-top:18px;}

  /* ===== REVEAL ANIMATION ===== */
  .lg-page .reveal {opacity:0;transform:translateY(28px);transition:opacity .7s var(--ease),transform .7s var(--ease);}
  .lg-page .reveal.in {opacity:1;transform:none;}

  /* ===== RESPONSIVE ===== */
  @media(max-width:980px){
    .lg-page .nav-links {display:none;}
    .lg-page .burger {display:flex;}
    .lg-page .about-grid, .lg-page .fam-grid, .lg-page .langma-grid, .lg-page .lead-grid, .lg-page .office-grid, .lg-page .tax-grid, .lg-page .cal-grid {grid-template-columns:1fr;gap:40px;}
    .lg-page .stats-grid, .lg-page .why-grid, .lg-page .prog-grid, .lg-page .ben-grid, .lg-page .life-grid, .lg-page .fin-extra, .lg-page .biz-grid, .lg-page .fam2-grid {grid-template-columns:1fr 1fr;}
    .lg-page .facts-row {grid-template-columns:1fr 1fr;}
    .lg-page .lg-list {grid-template-columns:1fr;}
    .lg-page .about-media, .lg-page .fam-media {height:420px;}
  }
  @media(max-width:640px){
    .lg-page .block {padding:74px 0;}
    .lg-page .container {padding:0 22px;}
    .lg-page .stats-grid, .lg-page .why-grid, .lg-page .prog-grid, .lg-page .ben-grid, .lg-page .life-grid, .lg-page .fin-extra, .lg-page .facts-row, .lg-page .biz-grid, .lg-page .fam2-grid {grid-template-columns:1fr;}
    .lg-page .stat-cell {border-right:none;border-bottom:1px solid rgba(247,250,252,.10);}
    .lg-page .frow {grid-template-columns:1fr;}
    .lg-page .fin-row {grid-template-columns:1fr;}
    .lg-page .fc {padding:14px 20px;}
    .lg-page .fin-row.head {display:none;}
    .lg-page .hero-badges {gap:26px;}
    .lg-page .form-card, .lg-page .office-form, .lg-page .cal-card, .lg-page .tax-panel {padding:30px;}
    .lg-page .foot-grid {grid-template-columns:1fr 1fr;}
  }
  @media(prefers-reduced-motion:reduce){
    .lg-page * {animation:none!important;transition:none!important;}
    .lg-page .reveal {opacity:1;transform:none;}
  }
      `}</style>
      <main>

{/* ===== HERO ===== */}
<section className="hero">
  <div className="container">
    <div className="hero-split">
      <div className="hero-copy">
        <span className="eyebrow">Malta Global Residence Programme &middot; Property-Based Residency</span>
        <h1>The Malta Residence Permit: a refined route to <em>Mediterranean EU living</em></h1>
        <p className="lead">Rent or own a qualifying home on a sun-soaked Mediterranean island, and convert that single decision into a recognised Maltese residence permit, a favourable personal tax position and visa-free movement across the Schengen Area. The Global Residence Programme rewards those who plan deliberately rather than rush. Langma International carries your file from the first eligibility conversation through to a permit card in hand — precisely, discreetly and without shortcuts.</p>
        <div className="hero-cta">
          <a href="#lead" className="btn btn-gold">Book Your Private Consultation</a>
          <a href="#programme" className="btn btn-ghost">Explore the Programme</a>
        </div>
        <div className="hero-badges">
          <div className="hero-badge"><div className="num">&euro;30,000<span style={{fontSize: '16px'}}>+</span></div><div className="lbl">Indicative entry investment</div></div>
          <div className="hero-badge"><div className="num">3+ mo</div><div className="lbl">Typical processing window</div></div>
          <div className="hero-badge"><div className="num">15%</div><div className="lbl">Flat tax on remitted income</div></div>
          <div className="hero-badge"><div className="num">Family</div><div className="lbl">Up to three generations included</div></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-img-frame">
          <img src="https://images.unsplash.com/photo-1696159380859-2d6b563cfc4f?q=80&w=1200&auto=format&fit=crop" alt="The fortified skyline of Valletta, Malta's capital, overlooking the Grand Harbour" />
          <div className="hero-img-badge">
            <span className="dot-pulse"></span>
            <span>Valletta, Malta</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="scroll-hint"><span>Discover</span><span className="line"></span></div>
</section>

<div className="tilework" aria-hidden="true"></div>

{/* ===== TRUST STATS BAR ===== */}
<section className="stats-bar">
  <div className="container">
    <div className="stats-grid">
      <div className="stat-cell reveal"><div className="v">&euro;15,000+</div><div className="k">Minimum annual tax once status is granted</div></div>
      <div className="stat-cell reveal"><div className="v">90/180</div><div className="k">Visa-free days across the Schengen Area</div></div>
      <div className="stat-cell reveal"><div className="v">2013</div><div className="k">Year the Global Residence Programme launched</div></div>
      <div className="stat-cell reveal"><div className="v">3 Gens</div><div className="k">Spouse, children, parents &amp; grandparents eligible</div></div>
    </div>
  </div>
</section>

{/* ===== ABOUT MALTA ===== */}
<section className="block about" id="about">
  <div className="container">
    <div className="about-grid">
      <div className="about-copy reveal">
        <span className="eyebrow">Discover Malta</span>
        <h2>Malta: a compact archipelago with an outsized place in Europe</h2>
        <p>Set in the centre of the Mediterranean between Sicily and North Africa, the Maltese archipelago packs an extraordinary amount of history, infrastructure and ambition into one of the European Union's smallest territories. Valletta is the capital, Maltese and English are both official languages — a rare advantage for internationally mobile families — and the euro has been the currency since the island joined the eurozone. Malta has belonged to the European Union since 2004 and to the Schengen Area since 2007, placing it firmly inside Europe's open-travel and regulatory framework.</p>
        <p>The economy has shifted decisively from shipbuilding and tourism toward financial services, online gaming, aviation, blockchain and a maturing professional-services sector, supported by an English-speaking workforce and a government that has actively courted international business. Healthcare ranks consistently among the strongest in the world relative to population size, the climate is Mediterranean with mild winters and long, dry summers, and the road and ferry network keeps every part of the islands within easy reach.</p>
        <p>For globally mobile individuals, the appeal is rarely just the weather. It is the combination of EU membership, English-language daily life, a respected legal and banking system, and a residence framework that rewards careful planning rather than rapid relocation.</p>
      </div>
      <div className="about-media reveal">
        <span className="frame"></span>
        <img src="https://images.unsplash.com/photo-1667570224324-9dd6b75f1d72?q=80&w=1200&auto=format&fit=crop" alt="Valletta's historic waterfront promenade lined with colourful balconies along the Grand Harbour" />
      </div>
    </div>

    <div className="facts-row">
      <div className="fact reveal"><div className="ff">Valletta</div><div className="fl">Capital city</div></div>
      <div className="fact reveal"><div className="ff">Maltese &amp; English</div><div className="fl">Official languages</div></div>
      <div className="fact reveal"><div className="ff">Euro&nbsp;(&euro;)</div><div className="fl">Official currency</div></div>
      <div className="fact reveal"><div className="ff">EU &amp; Schengen</div><div className="fl">Member since 2004 / 2007</div></div>
    </div>
  </div>
</section>

{/* ===== WHY GLOBAL INVESTORS CHOOSE MALTA ===== */}
<section className="block why">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Why Global Investors Choose Malta</span>
      <h2>A residence decision with substance behind the sunshine</h2>
      <p>Investors are drawn to Malta for reasons that go well beyond lifestyle — a settled legal system, a workable tax position and genuine EU access among them.</p>
    </div>
    <div className="why-grid">
      <div className="why-card reveal"><div className="ic">&#9733;</div><h3>Property-based residency</h3><p>No donation and no government bond — simply rent or buy a qualifying property and pay the administration fee to anchor your application.</p></div>
      <div className="why-card reveal"><div className="ic">&#9919;</div><h3>Remittance-based taxation</h3><p>Foreign income remitted to Malta is taxed at a flat 15%, while income kept outside Malta is not taxed at all under the programme.</p></div>
      <div className="why-card reveal"><div className="ic">&#10031;</div><h3>No obligation to relocate</h3><p>Investors are not required to live in Malta full-time, provided they avoid spending more than 183 days in any single other country each year.</p></div>
      <div className="why-card reveal"><div className="ic">&#9998;</div><h3>No inheritance tax</h3><p>Malta levies no inheritance tax, and the programme adds no further tax burden for accompanying family members.</p></div>
      <div className="why-card reveal"><div className="ic">&#10010;</div><h3>Resale flexibility</h3><p>Investors who purchase, rather than rent, their qualifying property can sell it and recover the funds if they later relinquish the residence permit.</p></div>
      <div className="why-card reveal"><div className="ic">&#9215;</div><h3>Disciplined due diligence</h3><p>A rigorous but predictable vetting process, with a preliminary review available to materially reduce the risk of an unwelcome surprise later.</p></div>
    </div>
  </div>
</section>

<div className="tilework" aria-hidden="true"></div>

{/* ===== PROGRAMME OVERVIEW / ELIGIBILITY ===== */}
<section className="block prog" id="programme">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center" style={{color: 'var(--gold-soft)'}}>The Programme</span>
      <h2>The Malta Global Residence Programme, explained clearly</h2>
      <p>A residence route anchored in property and a transparent tax commitment — established, regulated and operating since 2013.</p>
    </div>
    <div className="prog-grid">
      <div className="prog-card reveal"><div className="no">01 &middot; DEFINITION</div><h3>What is the GRP?</h3><p>A Maltese residence programme under which non-EU/EEA nationals rent or buy a qualifying property and pay an administration fee, in return for a residence permit and special tax status.</p></div>
      <div className="prog-card reveal"><div className="no">02 &middot; ELIGIBILITY</div><h3>Who can apply?</h3><p>Adults over 18 with a clean criminal record, stable and legal income, valid medical insurance and at least conversational English or Maltese. Citizens of EU/EEA states and Switzerland cannot participate.</p></div>
      <div className="prog-card reveal"><div className="no">03 &middot; PROPERTY</div><h3>The property test</h3><p>A qualifying rental or purchase in Malta, which cannot be sublet or rented out, and must be maintained for as long as the residence permit and tax status remain in force.</p></div>
      <div className="prog-card reveal"><div className="no">04 &middot; TAX</div><h3>Special tax status</h3><p>Foreign income remitted to Malta is taxed at a flat 15%, with a minimum annual tax of &euro;15,000 due for the family, and 0% on income kept outside Malta.</p></div>
      <div className="prog-card reveal"><div className="no">05 &middot; STRUCTURE</div><h3>Permit issuance</h3><p>The first residence permit card is valid for one year; subsequent cards are issued for two years each, subject to continued payment of the minimum tax and compliance.</p></div>
      <div className="prog-card reveal"><div className="no">06 &middot; PRESENCE</div><h3>Residence flexibility</h3><p>There is no requirement to relocate to Malta permanently, but holders must not spend more than 183 days in any other single country during the year.</p></div>
    </div>
  </div>
</section>

{/* ===== BENEFITS ===== */}
<section className="block benefits">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Key Benefits</span>
      <h2>What the Malta residence permit makes possible</h2>
      <p>The advantages of the Global Residence Programme reach across travel, taxation, family inclusion and long-term security.</p>
    </div>
    <div className="ben-grid">
      <div className="ben-card reveal"><div className="mk">I</div><h3>Schengen mobility</h3><p>The Malta residence permit functions like a Schengen visa, allowing visa-free travel of up to 90 days in any 180-day period across member states.</p></div>
      <div className="ben-card reveal"><div className="mk">II</div><h3>Living, working &amp; doing business</h3><p>Residents may live in Malta for the duration of the permit, and can obtain a separate permit to work or establish a company on the islands.</p></div>
      <div className="ben-card reveal"><div className="mk">III</div><h3>A workable tax position</h3><p>A flat 15% rate on foreign income remitted to Malta, 0% on income kept abroad, and no inheritance tax for the family.</p></div>
      <div className="ben-card reveal"><div className="mk">IV</div><h3>A safe-haven property</h3><p>Maintaining a Maltese home gives the family a ready, EU-based base to relocate to quickly should circumstances elsewhere change.</p></div>
      <div className="ben-card reveal"><div className="mk">V</div><h3>Education &amp; healthcare access</h3><p>Residents and their family members can access education and medical treatment in Malta without the need for separate visas.</p></div>
      <div className="ben-card reveal"><div className="mk">VI</div><h3>No added cost for family</h3><p>Spouses, children, siblings, parents and grandparents can be included without separate taxation, on top of the family's existing programme commitments.</p></div>
    </div>
  </div>
</section>

{/* ===== FINANCIAL / INVESTMENT REQUIREMENTS ===== */}
<section className="block finance" id="finance">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Investment &amp; Cost Requirements</span>
      <h2>What you need to commit to qualify</h2>
      <p>The programme rests on a qualifying property commitment, an administration fee and an annual minimum tax — not a donation or government bond.</p>
    </div>

    <div className="fin-table reveal">
      <div className="fin-row head">
        <div className="fc">Cost component</div>
        <div className="fc">Renting route</div>
        <div className="fc">Purchasing route</div>
      </div>
      <div className="fin-row">
        <div className="fc label">South of Malta / Gozo &mdash; administration fee</div>
        <div className="fc fig">&euro;6,000</div>
        <div className="fc fig">&euro;5,500+</div>
      </div>
      <div className="fin-row">
        <div className="fc label">South of Malta / Gozo &mdash; property cost</div>
        <div className="fc fig">&euro;8,750+/yr</div>
        <div className="fc fig">&euro;220,000+</div>
      </div>
      <div className="fin-row">
        <div className="fc label">North / centre of Malta &mdash; administration fee</div>
        <div className="fc fig">&euro;6,000</div>
        <div className="fc fig">&euro;6,000</div>
      </div>
      <div className="fin-row">
        <div className="fc label">North / centre of Malta &mdash; property cost</div>
        <div className="fc fig">&euro;9,600+/yr</div>
        <div className="fc fig">&euro;275,000+</div>
      </div>
      <div className="fin-row">
        <div className="fc label">Minimum annual tax</div>
        <div className="fc fig">&euro;15,000</div>
        <div className="fc fig">&euro;15,000</div>
      </div>
      <div className="fin-row total">
        <div className="fc label">Indicative entry total, single applicant (south of Malta / Gozo)</div>
        <div className="fc fig">&euro;34,150+</div>
        <div className="fc fig">&euro;270,200+</div>
      </div>
    </div>
    <p className="fin-note">The reduced &euro;5,500 administration fee applies only when purchasing in the south of Malta or Gozo; purchases in the north or centre of Malta carry the standard &euro;6,000 fee. Indicative totals above reflect the lowest-cost south of Malta / Gozo scenario. Figures reflect minimum thresholds reported by Immigrant Invest and may be updated by the Maltese authorities. They exclude personal circumstances and should be confirmed at the time of application. This is general information, not legal, tax or financial advice.</p>

    <div className="fin-extra">
      <div className="fin-x reveal"><h4>Purchase taxes</h4><p>Buyers should budget roughly &euro;25,300 and above in notary fees, VAT, stamp duty and property tax on top of the purchase price itself.</p></div>
      <div className="fin-x reveal"><h4>Medical insurance</h4><p>Around &euro;400 per person annually, varying with age and state of health, is required to demonstrate valid cover for every included family member.</p></div>
      <div className="fin-x reveal"><h4>Documentation costs</h4><p>Translation, apostille and notary fees of &euro;4,000 and above, scaling with family size and the number of documents to be certified.</p></div>
    </div>

    <div className="fin-extra" style={{marginTop: '22px'}}>
      <div className="fin-x reveal"><h4>Family of three, renting</h4><p>An illustrative total of around &euro;34,950 to qualify, with ongoing annual costs of roughly &euro;25,550 in rent, utilities and tax.</p></div>
      <div className="fin-x reveal"><h4>Family of three, buying</h4><p>An illustrative qualifying total of around &euro;271,000, with ongoing annual costs of approximately &euro;16,800 in utilities and tax once the property is owned.</p></div>
      <div className="fin-x reveal"><h4>No subletting</h4><p>The qualifying property &mdash; rented or owned &mdash; cannot be sublet or rented out for as long as it underpins the residence permit.</p></div>
    </div>
  </div>
</section>

{/* ===== FAMILY INCLUSION ===== */}
<section className="block family">
  <div className="container">
    <div className="fam-grid">
      <div className="fam-media reveal">
        <span className="frame"></span>
        <img src="https://images.unsplash.com/photo-1728051104379-de466fd0f3f4?q=80&w=1200&auto=format&fit=crop" alt="A luxury Maltese resort infinity pool overlooking the island, reflecting the lifestyle families enjoy" />
      </div>
      <div className="reveal">
        <span className="eyebrow">Eligible Applicants &amp; Family</span>
        <h2 style={{fontSize: 'clamp(30px,4vw,48px)', marginBottom: '26px'}}>One investment, residency that reaches three generations</h2>
        <ul className="fam-list">
          <li><span className="fi">&#9312;</span><div><h4>Main applicant</h4><p>An adult over 18, of non-EU/EEA, non-Swiss, non-EEA-adjacent nationality, with a clean criminal record, valid medical insurance and stable, legal income.</p></div></li>
          <li><span className="fi">&#9313;</span><div><h4>Spouse or registered partner</h4><p>A spouse in an officially registered marriage, or a partner in a recognised unregistered partnership with the main applicant.</p></div></li>
          <li><span className="fi">&#9314;</span><div><h4>Children under 18, and dependent children 18&ndash;25</h4><p>Minor children are included automatically; children aged 18 to 25 qualify where they remain principally dependent on the applicant or spouse.</p></div></li>
          <li><span className="fi">&#9315;</span><div><h4>Siblings, parents &amp; grandparents</h4><p>Dependent siblings, and dependent parents or grandparents of the applicant or spouse, may also be included in the same application.</p></div></li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* ===== PROCESS TIMELINE ===== */}
<section className="block process" id="process">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center" style={{color: 'var(--gold-soft)'}}>The Application Journey</span>
      <h2>A guided, seven-stage process</h2>
      <p>Langma International coordinates every stage of the Global Residence Programme, working alongside licensed professionals in Malta where local representation is required.</p>
    </div>
    <div className="timeline">
      <div className="tl-item reveal"><div className="dot">01</div><h3>Preliminary due diligence</h3><span className="dur">1 day</span><p>A confidential review of your documents and background, designed to surface any issues early and materially reduce the risk of refusal before formal submission.</p></div>
      <div className="tl-item reveal"><div className="dot">02</div><h3>Documentation &amp; tax-service application</h3><span className="dur">4&ndash;5 weeks</span><p>Compiling, certifying and translating the required documents, paying the administration fee, and submitting your file to Malta's Inland Revenue Department.</p></div>
      <div className="tl-item reveal"><div className="dot">03</div><h3>Due diligence review</h3><span className="dur">2&ndash;4 months</span><p>The Inland Revenue Department examines the application in depth and may raise further requests for information, which are prepared and approved with you before submission.</p></div>
      <div className="tl-item reveal"><div className="dot">04</div><h3>Interview &amp; special tax status</h3><span className="dur">2+ weeks</span><p>A remote interview with the Director of the Inland Revenue Department, followed by a Letter of Intent, payment of the minimum tax and confirmation of your accommodation.</p></div>
      <div className="tl-item reveal"><div className="dot">05</div><h3>Residence application &amp; biometrics</h3><span className="dur">2+ weeks</span><p>Submission of the residence application through the government's online system, followed by an invitation to provide biometrics in Malta.</p></div>
      <div className="tl-item reveal"><div className="dot">06</div><h3>Collecting the residence permit card</h3><span className="dur">4&ndash;6 weeks</span><p>Once verification is complete, you and your family travel to Malta in person to collect your residence permit cards from the Identity Malta Agency.</p></div>
      <div className="tl-item reveal"><div className="dot">07</div><h3>Annual renewal</h3><span className="dur">~2 months</span><p>A first card valid for one year, renewed for two-year periods thereafter, conditional on filing your tax declaration and paying the minimum tax by 30 April each year.</p></div>
    </div>
  </div>
</section>

{/* ===== TAX CONSIDERATIONS ===== */}
<section className="block tax" id="tax">
  <div className="container">
    <div className="tax-grid">
      <div className="tax-copy reveal">
        <span className="eyebrow">Tax Considerations</span>
        <h2>A remittance-based tax position, not a worldwide one</h2>
        <p>The defining feature of the Malta Global Residence Programme is its special tax status. Rather than taxing your global income outright, Malta taxes only the foreign income you choose to remit into the country — a structure that rewards deliberate financial planning.</p>
        <p>Foreign-source income that is brought into Malta is taxed at a flat 15%, with a minimum annual tax commitment of &euro;15,000 for the family as a whole. Income that stays outside Malta is taxed at 0% under the programme, while any income that actually arises in Malta itself is taxed at the standard local rate of 35%. There is no separate tax charged on family members, and Malta levies no inheritance tax at all.</p>
      </div>
      <div className="tax-panel reveal">
        <h3>At a glance</h3>
        <div className="tax-line"><span className="t">Flat rate on foreign income remitted to Malta</span><span className="v">15%</span></div>
        <div className="tax-line"><span className="t">Rate on global income not remitted to Malta</span><span className="v">0%</span></div>
        <div className="tax-line"><span className="t">Rate on income arising in Malta</span><span className="v">35%</span></div>
        <div className="tax-line"><span className="t">Minimum annual tax due for the family</span><span className="v">&euro;15,000</span></div>
        <p className="tax-foot">Indicative summary only. Eligibility, exact treatment and ongoing obligations depend on individual circumstances and current Maltese law. Langma International is not a tax adviser; confirm your position with a qualified Maltese professional.</p>
      </div>
    </div>
  </div>
</section>

<div className="tilework" aria-hidden="true"></div>

{/* ===== DOING BUSINESS IN MALTA ===== */}
<section className="block business">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center" style={{color: 'var(--gold-soft)'}}>Doing Business in Malta</span>
      <h2>An EU base built around financial and professional services</h2>
      <p>Beyond personal residency, Malta has positioned itself as a serious operating base for internationally minded companies and entrepreneurs.</p>
    </div>
    <div className="biz-grid">
      <div className="biz-card reveal"><h3>Financial services hub</h3><p>A long-established financial-services sector, supported by EU passporting rights and a regulator experienced in cross-border business.</p></div>
      <div className="biz-card reveal"><h3>An English-speaking workforce</h3><p>English as an official language removes a major barrier to hiring, contracting and day-to-day operations for international firms.</p></div>
      <div className="biz-card reveal"><h3>Work &amp; company formation</h3><p>Residence-permit holders can apply for a separate permit to work in Malta or establish a company, with the GRP often used as a base for tax-efficient structuring.</p></div>
      <div className="biz-card reveal"><h3>Strategic Mediterranean location</h3><p>Positioned between Europe and North Africa, with strong air links making it a practical base for businesses trading across both regions.</p></div>
      <div className="biz-card reveal"><h3>EU market access</h3><p>As an EU member state, Malta offers a genuine gateway into the wider European single market for goods, services and capital.</p></div>
      <div className="biz-card reveal"><h3>A predictable regulatory environment</h3><p>Established due-diligence and licensing frameworks that, while rigorous, are well understood by international advisers and applicants alike.</p></div>
    </div>
  </div>
</section>

{/* ===== WHY FAMILIES LOVE LIVING IN MALTA ===== */}
<section className="block families">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Why Families Love Living in Malta</span>
      <h2>A small island with a large quality-of-life advantage</h2>
      <p>For families weighing where to put down European roots, Malta combines safety, climate and accessibility in a footprint small enough to feel genuinely liveable.</p>
    </div>
    <div className="fam2-grid">
      <div className="fam2-card reveal"><div className="ic">&#10031;</div><h3>Mediterranean climate</h3><p>Mild winters and long, dry summers make outdoor life a year-round feature rather than a seasonal luxury.</p></div>
      <div className="fam2-card reveal"><div className="ic">&#10010;</div><h3>Accessible healthcare</h3><p>Residents and family members can access medical treatment in Malta without needing separate visas, alongside an internationally regarded public health system.</p></div>
      <div className="fam2-card reveal"><div className="ic">&#9998;</div><h3>Education in English</h3><p>An English-language education system, complemented by international schools, gives children continuity wherever they have studied before.</p></div>
      <div className="fam2-card reveal"><div className="ic">&#9733;</div><h3>A genuinely safe island</h3><p>Malta is consistently regarded as one of Europe's safer destinations, an important consideration for families relocating with children.</p></div>
      <div className="fam2-card reveal"><div className="ic">&#9215;</div><h3>Compact, connected living</h3><p>Nowhere on the islands is far from anywhere else, and ferry and air connections keep mainland Europe within easy reach.</p></div>
      <div className="fam2-card reveal"><div className="ic">&#9919;</div><h3>An established expatriate community</h3><p>Decades of inbound relocation have built a settled, welcoming international community across Malta's main towns.</p></div>
    </div>
  </div>
</section>

{/* ===== LIFE IN MALTA ===== */}
<section className="block life">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Life in Malta</span>
      <h2>Where will your family settle on the islands?</h2>
      <p>From the fortified capital to seaside towns and the quieter island of Gozo, Malta offers distinct settings within a short drive of one another.</p>
    </div>
    <div className="life-grid">
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1632422836490-b8d03c494856?q=80&w=1200&auto=format&fit=crop" alt="Valletta's historic skyline and bastions above the Grand Harbour" />
        <div className="ov"></div>
        <div className="cap"><h3>Valletta &amp; the Grand Harbour</h3><p>The fortified capital — Baroque architecture, government and culture, with the harbour's marinas close at hand.</p></div>
      </div>
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1623718649591-311775a30c43?q=80&w=1200&auto=format&fit=crop" alt="A modern luxury infinity pool and sun deck overlooking Malta, typical of Sliema and St Julian's" />
        <div className="ov"></div>
        <div className="cap"><h3>Sliema &amp; St Julian's</h3><p>Malta's contemporary waterfront — marinas, dining and a concentration of international residents and businesses.</p></div>
      </div>
      <div className="life-card reveal">
        <img src="https://images.unsplash.com/photo-1684158903180-36fe8201531a?q=80&w=1200&auto=format&fit=crop" alt="The sunlit limestone streets of Mdina, Malta's ancient walled city" />
        <div className="ov"></div>
        <div className="cap"><h3>Mdina &amp; Rabat</h3><p>The island's ancient walled city and surrounds — quiet limestone streets and a slower, historic pace of life.</p></div>
      </div>
    </div>
    <div className="life-strip">
      <span className="life-tag reveal">Mediterranean climate</span>
      <span className="life-tag reveal">English-speaking daily life</span>
      <span className="life-tag reveal">Safe, compact island living</span>
      <span className="life-tag reveal">Established expat communities</span>
      <span className="life-tag reveal">Marinas &amp; coastal towns</span>
      <span className="life-tag reveal">Short flights across Europe</span>
    </div>
  </div>
</section>

{/* ===== WHY LANGMA ===== */}
<section className="block langma" id="langma">
  <div className="container">
    <div className="langma-grid">
      <div className="reveal">
        <span className="eyebrow" style={{color: 'var(--gold-soft)'}}>Why Langma International</span>
        <h2>A trusted partner for a process that rewards precision</h2>
        <p className="lead">We help individuals and families access European residency through transparent guidance, strategic planning and genuinely personalised support — never overpromising, never guaranteeing outcomes that rest with the Maltese authorities.</p>
        <p className="lead">From your first conversation about eligibility to the day you collect your residence permit card, you work with people who understand both the regulation and the practical realities of relocating a life, a family or a company.</p>
      </div>
      <div className="lg-list reveal">
        <div className="lg-item"><h4>Global mobility expertise</h4><p>Cross-border residency experience spanning Europe and beyond, applied directly to your circumstances.</p></div>
        <div className="lg-item"><h4>Personalised consultation</h4><p>A considered assessment of your finances, family composition and property preferences — not a templated checklist.</p></div>
        <div className="lg-item"><h4>Documentation support</h4><p>Hands-on help assembling, certifying and sequencing the paperwork that determines whether a file moves quickly or stalls.</p></div>
        <div className="lg-item"><h4>Licensed process coordination</h4><p>Coordination through each official stage, working alongside licensed Maltese professionals where local representation is required.</p></div>
        <div className="lg-item"><h4>International network</h4><p>Trusted partners on the ground — legal, tax, property and banking — to keep your relocation moving without friction.</p></div>
        <div className="lg-item"><h4>Transparent process</h4><p>Clear timelines, honest expectations and plain answers about what is — and is not — realistically within reach.</p></div>
      </div>
    </div>
  </div>
</section>

{/* ===== FAQ ===== */}
<section className="block faq" id="faq">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow center">Frequently Asked Questions</span>
      <h2>Clear answers, accurately stated</h2>
    </div>
    <div className="faq-wrap">
      {FAQ_ITEMS.map((item, index) => (
        <div key={item.q} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
          <button
            type="button"
            className="faq-q"
            aria-expanded={openFaq === index}
            onClick={() => toggleFaq(index)}
          >
            {item.q}
            <span className="pm">{openFaq === index ? '−' : '+'}</span>
          </button>
          <div className="faq-a" aria-hidden={openFaq !== index}>
            <div className="faq-a-inner">{item.a}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ===== LEAD FORM / CONSULTATION CTA ===== */}
<section className="block lead-sec" id="lead">
  <div className="container">
    <div className="lead-grid">
      <div className="lead-copy reveal">
        <span className="eyebrow">Begin Your Journey</span>
        <h2>Begin your Malta residency journey with expert guidance</h2>
        <p>Share a few details and a Langma International advisor will arrange a confidential consultation to assess your eligibility and outline a realistic path forward — with no obligation.</p>
        <ul className="lead-assure">
          <li>Strictly confidential, no-obligation review</li>
          <li>Honest assessment of your eligibility</li>
          <li>Clear timelines and transparent guidance</li>
          <li>Introductions to licensed Maltese professionals</li>
        </ul>
      </div>
      <div className="form-card reveal">
        <h3>Request a private consultation</h3>
        <p className="fsub">We typically respond within one business day.</p>
        <form id="lead-form" onSubmit={handleLeadSubmit} noValidate>
          <div className="frow">
            <div className="field">
              <label htmlFor="fname">First name<span className="field-req">*</span></label>
              <input type="text" id="fname" autoComplete="given-name" aria-invalid={!!leadErrors.fname} style={errBorder('fname', leadErrors)} value={leadForm.fname} onChange={(e) => { setLeadForm({ ...leadForm, fname: e.target.value }); setLeadErrors({ ...leadErrors, fname: '' }); }} />
              {leadErrors.fname && <p className="field-err">{leadErrors.fname}</p>}
            </div>
            <div className="field">
              <label htmlFor="lname">Last name<span className="field-req">*</span></label>
              <input type="text" id="lname" autoComplete="family-name" aria-invalid={!!leadErrors.lname} style={errBorder('lname', leadErrors)} value={leadForm.lname} onChange={(e) => { setLeadForm({ ...leadForm, lname: e.target.value }); setLeadErrors({ ...leadErrors, lname: '' }); }} />
              {leadErrors.lname && <p className="field-err">{leadErrors.lname}</p>}
            </div>
          </div>
          <div className="field">
            <label htmlFor="email">Email address<span className="field-req">*</span></label>
            <input type="email" id="email" autoComplete="email" aria-invalid={!!leadErrors.email} style={errBorder('email', leadErrors)} value={leadForm.email} onChange={(e) => { setLeadForm({ ...leadForm, email: e.target.value }); setLeadErrors({ ...leadErrors, email: '' }); }} />
            {leadErrors.email && <p className="field-err">{leadErrors.email}</p>}
          </div>
          <div className="frow">
            <div className="field">
              <label htmlFor="phone">Phone<span className="field-req">*</span></label>
              <input type="tel" id="phone" placeholder="10-15 digit number" autoComplete="tel" aria-invalid={!!leadErrors.phone} style={errBorder('phone', leadErrors)} value={leadForm.phone} onChange={(e) => { setLeadForm({ ...leadForm, phone: e.target.value.replace(/\D/g, '') }); setLeadErrors({ ...leadErrors, phone: '' }); }} />
              {leadErrors.phone && <p className="field-err">{leadErrors.phone}</p>}
            </div>
            <div className="field">
              <label htmlFor="country">Country of residence</label>
              <input type="text" id="country" autoComplete="country-name" aria-invalid={!!leadErrors.country} style={errBorder('country', leadErrors)} value={leadForm.country} onChange={(e) => { setLeadForm({ ...leadForm, country: e.target.value }); setLeadErrors({ ...leadErrors, country: '' }); }} />
              {leadErrors.country && <p className="field-err">{leadErrors.country}</p>}
            </div>
          </div>
          <div className="field">
            <label htmlFor="route">Preferred route<span className="field-req">*</span></label>
            <select id="route" aria-invalid={!!leadErrors.route} style={errBorder('route', leadErrors)} value={leadForm.route} onChange={(e) => { setLeadForm({ ...leadForm, route: e.target.value }); setLeadErrors({ ...leadErrors, route: '' }); }}>
              <option value="">Please select</option>
              <option>Renting a qualifying property</option>
              <option>Purchasing a qualifying property</option>
              <option>Not yet decided</option>
              <option>Other / combination</option>
            </select>
            {leadErrors.route && <p className="field-err">{leadErrors.route}</p>}
          </div>
          <button type="submit" className="btn btn-gold" disabled={leadLoading}>{leadLoading ? 'Sending...' : 'Request Consultation'}</button>
          <p className="disc">By submitting, you agree to be contacted about your enquiry. Your details are kept confidential.</p>
          {leadMsg && <div className={`success show ${leadSuccess ? '' : 'form-msg error'}`}>{leadMsg}</div>}
          {leadSubmitted && leadSuccess && !leadMsg && <div className="success show">Thank you — an advisor will be in touch shortly to arrange your consultation.</div>}
        </form>
      </div>
    </div>
  </div>
</section>

{/* ===== OFFICE VISIT ===== */}
<section className="block office" id="office-visit">
  <div className="container">
    <div className="office-grid">
      <div className="office-copy reveal">
        <span className="eyebrow">In Person</span>
        <h2>Visit our office &amp; discuss your Malta residency goals</h2>
        <p>Prefer to meet face to face? Sit down with our advisory team for a private, one-on-one consultation and map your route to Maltese residency in confidence.</p>
        <ul className="office-points">
          <li><span className="oi">&#10022;</span><div><h4>One-on-one consultation</h4><p>A direct conversation with the people who will guide your case.</p></div></li>
          <li><span className="oi">&#10003;</span><div><h4>Personal eligibility review</h4><p>An honest look at your finances, property preferences and family composition.</p></div></li>
          <li><span className="oi">&#8618;</span><div><h4>Your residency roadmap</h4><p>A clear, step-by-step plan with a candid document assessment.</p></div></li>
        </ul>
      </div>
      <div className="office-form reveal">
        <h3>Book your visit</h3>
        <form id="office-form" onSubmit={handleOfficeSubmit} noValidate>
          <div className="field">
            <label htmlFor="ov-name">Full name<span className="field-req">*</span></label>
            <input type="text" id="ov-name" autoComplete="name" aria-invalid={!!officeErrors.name} style={errBorder('name', officeErrors)} value={officeForm.name} onChange={(e) => { setOfficeForm({ ...officeForm, name: e.target.value }); setOfficeErrors({ ...officeErrors, name: '' }); }} />
            {officeErrors.name && <p className="field-err">{officeErrors.name}</p>}
          </div>
          <div className="frow">
            <div className="field">
              <label htmlFor="ov-phone">Phone<span className="field-req">*</span></label>
              <input type="tel" id="ov-phone" placeholder="10-15 digit number" autoComplete="tel" aria-invalid={!!officeErrors.phone} style={errBorder('phone', officeErrors)} value={officeForm.phone} onChange={(e) => { setOfficeForm({ ...officeForm, phone: e.target.value.replace(/\D/g, '') }); setOfficeErrors({ ...officeErrors, phone: '' }); }} />
              {officeErrors.phone && <p className="field-err">{officeErrors.phone}</p>}
            </div>
            <div className="field">
              <label htmlFor="ov-email">Email<span className="field-req">*</span></label>
              <input type="email" id="ov-email" autoComplete="email" aria-invalid={!!officeErrors.email} style={errBorder('email', officeErrors)} value={officeForm.email} onChange={(e) => { setOfficeForm({ ...officeForm, email: e.target.value }); setOfficeErrors({ ...officeErrors, email: '' }); }} />
              {officeErrors.email && <p className="field-err">{officeErrors.email}</p>}
            </div>
          </div>
          <div className="frow">
            <div className="field">
              <label htmlFor="ov-date">Preferred date<span className="field-req">*</span></label>
              <input type="date" id="ov-date" min={todayStr()} aria-invalid={!!officeErrors.date} style={errBorder('date', officeErrors)} value={officeForm.date} onChange={(e) => { setOfficeForm({ ...officeForm, date: e.target.value }); setOfficeErrors({ ...officeErrors, date: '' }); }} />
              {officeErrors.date && <p className="field-err">{officeErrors.date}</p>}
            </div>
            <div className="field">
              <label htmlFor="ov-time">Preferred time<span className="field-req">*</span></label>
              <select id="ov-time" aria-invalid={!!officeErrors.time} style={errBorder('time', officeErrors)} value={officeForm.time} onChange={(e) => { setOfficeForm({ ...officeForm, time: e.target.value }); setOfficeErrors({ ...officeErrors, time: '' }); }}>
                <option value="">Select</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
              {officeErrors.time && <p className="field-err">{officeErrors.time}</p>}
            </div>
          </div>
          <button type="submit" className="btn btn-navy" disabled={officeLoading}>{officeLoading ? 'Sending...' : 'Request Office Visit'}</button>
          {officeMsg && <div className={`success show ${officeSuccess ? '' : 'form-msg error'}`}>{officeMsg}</div>}
          {officeSubmitted && officeSuccess && !officeMsg && <div className="success show">Thank you — we'll be in touch shortly to confirm your visit.</div>}
        </form>
      </div>
    </div>
  </div>
</section>

{/* ===== CALENDAR BOOKING ===== */}
<section className="block calendar" id="calendar">
  <div className="container">
    <div className="cal-grid">
      <div className="cal-copy reveal">
        <span className="eyebrow" style={{color: 'var(--gold-soft)'}}>Schedule a Meeting</span>
        <h2>Reserve a private consultation slot</h2>
        <p>Choose a date and time that suits you for a confidential video or phone consultation with a senior Langma International advisor. We'll review your eligibility and answer your questions directly.</p>
        <ul className="cal-benefits">
          <li>A focused 30-minute session built around your situation</li>
          <li>A candid view of your eligibility and likely timeline</li>
          <li>Clear next steps and a transparent fee outline</li>
        </ul>
        <div className="cal-urgency"><span className="dot-pulse"></span><span>Limited advisory slots open each week — early dates fill quickly</span></div>
      </div>
      <div className="cal-card reveal">
        <h3>Pick a date &amp; time</h3>
        <p className="csub">All times shown are local to our advisory office.</p>
        <div className="cal-head">
          <span>{MONTHS[calView.getMonth()]} {calView.getFullYear()}</span>
          <div>
            <button type="button" aria-label="Previous month" onClick={calPrev}>‹</button>
            <button type="button" aria-label="Next month" onClick={calNext}>›</button>
          </div>
        </div>
        <div className="cal-dow"><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span></div>
        <div className="cal-days">
          {calDays}
        </div>
        {(calErrors.date || calErrors.slot) && (
          <p className="cal-slot-err">{calErrors.date || calErrors.slot}</p>
        )}
        <div className="cal-slots">
          {['09:30','11:00','13:00','15:30','17:00','18:30'].map(slot => (
            <div key={slot} className={`cal-slot ${calSlot===slot ? 'sel' : ''}`} onClick={() => { setCalSlot(slot); setCalConfirm(''); setCalErrors((prev) => ({ ...prev, slot: '' })); }}>{slot}</div>
          ))}
        </div>
        <div className="field" style={{ marginTop: 20 }}>
          <label htmlFor="cal-name">Full name<span className="field-req">*</span></label>
          <input type="text" id="cal-name" autoComplete="name" aria-invalid={!!calErrors.name} style={errBorder('name', calErrors)} value={calForm.name} onChange={(e) => { setCalForm({ ...calForm, name: e.target.value }); setCalErrors({ ...calErrors, name: '' }); }} />
          {calErrors.name && <p className="field-err">{calErrors.name}</p>}
        </div>
        <div className="frow">
          <div className="field">
            <label htmlFor="cal-email">Email<span className="field-req">*</span></label>
            <input type="email" id="cal-email" autoComplete="email" aria-invalid={!!calErrors.email} style={errBorder('email', calErrors)} value={calForm.email} onChange={(e) => { setCalForm({ ...calForm, email: e.target.value }); setCalErrors({ ...calErrors, email: '' }); }} />
            {calErrors.email && <p className="field-err">{calErrors.email}</p>}
          </div>
          <div className="field">
            <label htmlFor="cal-phone">Phone<span className="field-req">*</span></label>
            <input type="tel" id="cal-phone" placeholder="10-15 digit number" autoComplete="tel" aria-invalid={!!calErrors.phone} style={errBorder('phone', calErrors)} value={calForm.phone} onChange={(e) => { setCalForm({ ...calForm, phone: e.target.value.replace(/\D/g, '') }); setCalErrors({ ...calErrors, phone: '' }); }} />
            {calErrors.phone && <p className="field-err">{calErrors.phone}</p>}
          </div>
        </div>
        <button type="button" className="btn btn-gold" onClick={handleCalBook} disabled={calLoading}>{calLoading ? 'Booking...' : 'Confirm My Slot'}</button>
        {calConfirm && <div className={`cal-confirm ${calSuccess ? '' : 'form-msg error'}`} style={calSuccess ? undefined : { marginTop: 16 }}>{calConfirm}</div>}
      </div>
    </div>
  </div>
</section>

      </main>
    </div>
  );
};

export default LangmaMaltaGlobalResidenceProgrammePage;