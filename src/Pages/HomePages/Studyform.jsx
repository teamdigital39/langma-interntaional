import API_BASE from "../../config.js";
import React from 'react'
import { useState, useEffect, useRef, useMemo } from "react";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

const MONTHS = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
const DEST_OPTIONS = ["Not sure yet","Poland","Dubai (UAE)","Singapore","South Korea",
  "Cyprus","Malta","Netherlands","Mauritius","Georgia / Other"];

const SLOTS = [
  "10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","02:00 PM","02:30 PM",
  "03:00 PM","03:30 PM","04:00 PM","04:30 PM",
  "05:00 PM","05:30 PM",
];

function Studyform() {
  const rootRef = useRef(null);

  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const [view, setView] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [mode, setMode] = useState("Virtual Meeting");
  const [selDate, setSelDate] = useState(null);
  const [selSlot, setSelSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [conf, setConf] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", dest: "Not sure yet", note: "" });

  // ── NEW: validation, loading, response state ──────────────────────────
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  // ─────────────────────────────────────────────────────────────────────

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

  // ── NEW: validations (same as PopupForm) ──────────────────────────────
  const validateName    = (v) => /^[A-Za-z\s]{2,}$/.test(v.trim());
  const validateEmail   = (v) => /^\S+@\S+\.\S+$/.test(v.trim());
  const validatePhone   = (v) => /^[0-9]{10,15}$/.test(v);
  const validateMessage = (v) => v.trim().length >= 5;

  const handlePhoneChange = (e) => {
    setForm({ ...form, phone: e.target.value.replace(/\D/g, "") });
    setErrors({ ...errors, phone: "" });
  };
  // ─────────────────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canConfirm || loading) return;

    // ── NEW: client-side validation ───────────────────────────────────
    const ve = {};

    if (!form.name)                  ve.name = "Name is required";
    else if (!validateName(form.name)) ve.name = "Only alphabets (min 2 chars)";

    if (!form.phone)                   ve.phone = "Phone is required";
    else if (!validatePhone(form.phone)) ve.phone = "Enter valid 10-15 digit number";

    if (!form.email)                    ve.email = "Email is required";
    else if (!validateEmail(form.email)) ve.email = "Invalid email";

    if (form.note && !validateMessage(form.note)) ve.note = "Minimum 5 characters";

    setErrors(ve);
    if (Object.keys(ve).length > 0) return;
    // ─────────────────────────────────────────────────────────────────

    try {
      setLoading(true);
      setResponseMsg("");

      // ── NEW: API call (same endpoint as PopupForm) ──────────────────
      const payload = {
        name:    form.name,
        email:   form.email,
        mobile:  form.phone,
        message: form.note || `Booking request for ${mode} on ${fmtDate(selDate)} at ${selSlot}. Destination: ${form.dest}.`,
        type:    "Consultation Booking",
        service: form.dest || "Study Abroad",
      };

      const response = await fetch(`${API_BASE}/api/contact-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setResponseMsg("Booking submitted successfully ✅");

        setConf({
          name:     form.name,
          mode,
          dateTime: fmtDate(selDate) + " at " + selSlot,
          dest:     form.dest,
          contact:  form.phone + " / " + form.email,
        });
        setConfirmed(true);

        setErrors({});
      } else {
        setIsSuccess(false);
        setResponseMsg(data.message || "Submission failed ❌");
      }
      // ───────────────────────────────────────────────────────────────
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
      setResponseMsg("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const resetBooking = () => {
    setSelDate(null); setSelSlot(null);
    setForm({ name: "", phone: "", email: "", dest: "Not sure yet", note: "" });
    setConfirmed(false); setConf(null);
    setErrors({}); setResponseMsg(""); setIsSuccess(false);
  };

  // helper: border class for errored fields
  const fieldErr = (f) => errors[f] ? { outline: "1.5px solid #ef4444" } : {};

  return (
    <div ref={rootRef}>
      <section className="section" id="booking">
        <div className="container">

          <div className="final-cta reveal" style={{ marginBottom: 64 }}>
            <div className="final-cta__inner">
              <span className="eyebrow eyebrow--dark">Start Today</span>
              <h2 style={{ marginTop: 16 }}>Your Global Chapter Starts With One Conversation.</h2>
              <p>Thousands of students sat exactly where you're sitting now — unsure, excited, and wondering if it was really possible. It was. It is. For you too.</p>
              <div className="final-cta__ctas">
                <a href="#book-widget" className="btn btn-primary">Book Free Consultation →</a>
                <a href="https://wa.me/919810117094" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 0 0 3.6 17.4L2 22l4.7-1.6a11 11 0 0 0 16.3-9.5c0-2.9-1.1-5.7-3.2-7.8Zm-8.5 16.8a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.4 1.1 1.1-3.3-.2-.3a9.2 9.2 0 1 1 7.4 4Zm5-6.9c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.6 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z"/></svg>
                  WhatsApp Us
                </a>
                <a href="#enquiry-form" className="btn btn-ghost-light">Send an Enquiry</a>
              </div>
              <p className="final-cta__micro">No fees. No commitment. Just clarity. · Available online &amp; in person (New Delhi).</p>
            </div>
          </div>

          <div className="section-head center" id="book-widget">
            <span className="eyebrow">Book Your Consultation</span>
            <h2 className="section-title">Talk to Us — On a Call, or in Person.</h2>
            <p className="section-sub">Choose how you'd like to meet, then pick a date and time that works for you. We'll confirm your slot by phone, email, or WhatsApp.</p>
          </div>

          <div className="booking">
            {/* Office info */}
            <div className="booking-info reveal">
              <h3>Prefer to Visit in Person?</h3>
              <p>Our New Delhi office welcomes walk-in counselling by appointment — bring your academic documents and we'll do a full profile evaluation on the spot.</p>
              <div className="booking-info__list">
                <div className="booking-info__item">
                  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <div><b>Office Address</b><span>E-73, South Extension Part-1, New Delhi - 110049, India</span></div>
                </div>
                <div className="booking-info__item">
                  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  <div><b>Office Hours</b><span>Monday – Saturday, 10:00 AM – 6:00 PM · Closed Sundays</span></div>
                </div>
                <div className="booking-info__item">
                  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.8 2.1Z"/></svg>
                  <div><b>Phone / WhatsApp</b><span>+91-9810117094</span></div>
                </div>
                <div className="booking-info__item">
                  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="m4 6 8 7 8-7"/></svg>
                  <div><b>Email</b><span>info@langmainternational.com</span></div>
                </div>
              </div>
            </div>

            {/* Calendar booking card */}
            <div className="booking-card reveal" id="enquiry-form">
              <div className="mode-toggle">
                <button type="button" className={"mode-btn" + (mode === "Virtual Meeting" ? " active" : "")}
                  onClick={() => setMode("Virtual Meeting")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4V8Z"/></svg>
                  Virtual Meeting
                </button>
                <button type="button" className={"mode-btn" + (mode !== "Virtual Meeting" ? " active" : "")}
                  onClick={() => setMode("In-Person Office Visit (New Delhi)")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  Visit Our Office
                </button>
              </div>

              {!confirmed ? (
                <div id="bookingFlow">
                  <div className="cal">
                    <div>
                      <div className="cal__nav">
                        <button type="button" aria-label="Previous month" disabled={isCurrentMonth}
                          style={{ opacity: isCurrentMonth ? 0.35 : 1 }} onClick={goPrev}>←</button>
                        <span className="cal__month">{MONTHS[view.m]} {view.y}</span>
                        <button type="button" aria-label="Next month" onClick={goNext}>→</button>
                      </div>
                      <div className="cal__weekdays">
                        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                      </div>
                      <div className="cal__grid">
                        {cells.map((c) => c.empty ? (
                          <span key={c.key} className="cal__day empty" />
                        ) : (
                          <button key={c.key} type="button" disabled={c.disabled}
                            className={"cal__day " + (c.disabled ? "disabled" : "available") + (c.isToday ? " today" : "") + (c.selected ? " selected" : "")}
                            onClick={c.disabled ? undefined : () => selectDate(c.d)}>{c.d}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="slots-title">
                        {selDate ? "Available times — " + fmtDate(selDate) : "Select a date to see available times"}
                      </div>
                      <div className="slots-grid">
                        {selDate && SLOTS.map((t) => (
                          <button key={t} type="button"
                            className={"slot-btn" + (selSlot === t ? " selected" : "")}
                            onClick={() => setSelSlot(t)}>{t}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── NEW: API response banner ── */}
                  {responseMsg && (
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 14px", marginBottom: 16, borderRadius: 12,
                      background: isSuccess ? "#f0fdf4" : "#fef2f2",
                      border: `1px solid ${isSuccess ? "#bbf7d0" : "#fecaca"}`,
                      color: isSuccess ? "#15803d" : "#b91c1c",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {isSuccess ? <FiCheckCircle size={16} /> : <FiAlertCircle size={16} />}
                        <span style={{ fontSize: 14 }}>{responseMsg}</span>
                      </div>
                      <button type="button" onClick={() => setResponseMsg("")} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
                        <FiX size={16} />
                      </button>
                    </div>
                  )}

                  <form className="booking-form" onSubmit={handleSubmit}>
                    {canConfirm && (
                      <div className="selection-summary" style={{ display: "flex" }}>
                        <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        <span><b>{mode}</b> · <span>{fmtDate(selDate)} at {selSlot}</span></span>
                      </div>
                    )}

                    <div className="form-row">
                      {/* NAME */}
                      <div className="field">
                        <label htmlFor="fName">Full Name</label>
                        <input type="text" id="fName" placeholder="Your full name"
                          style={fieldErr("name")}
                          value={form.name}
                          onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }} />
                        {errors.name && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
                      </div>

                      {/* PHONE */}
                      <div className="field">
                        <label htmlFor="fPhone">Phone / WhatsApp</label>
                        <input type="tel" id="fPhone" placeholder="+91-9810117094"
                          style={fieldErr("phone")}
                          value={form.phone}
                          onChange={handlePhoneChange} />
                        {errors.phone && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="form-row">
                      {/* EMAIL */}
                      <div className="field">
                        <label htmlFor="fEmail">Email</label>
                        <input type="email" id="fEmail" placeholder="you@email.com"
                          style={fieldErr("email")}
                          value={form.email}
                          onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }} />
                        {errors.email && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
                      </div>

                      {/* DESTINATION */}
                      <div className="field">
                        <label htmlFor="fDest">Interested Destination</label>
                        <select id="fDest" value={form.dest} onChange={(e) => setForm({ ...form, dest: e.target.value })}>
                          {DEST_OPTIONS.map((o) => (<option key={o}>{o}</option>))}
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      {/* NOTE */}
                      <div className="field full">
                        <label htmlFor="fNote">Anything we should know? (optional)</label>
                        <textarea id="fNote" rows="3" placeholder="Current qualification, target intake, or specific questions"
                          style={fieldErr("note")}
                          value={form.note}
                          onChange={(e) => { setForm({ ...form, note: e.target.value }); setErrors({ ...errors, note: "" }); }} />
                        {errors.note && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.note}</p>}
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block"
                      disabled={!canConfirm || loading}>
                      {loading ? "Sending..." : canConfirm ? "Confirm Booking →" : "Select a Date & Time to Continue"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="confirm-panel show">
                  <div className="confirm-icon"><svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
                  <h3>Your Slot Is Reserved</h3>
                  <p>Thank you, <span>{conf?.name}</span>. A Langma International counsellor will confirm this booking by phone or WhatsApp shortly.</p>
                  <div className="confirm-detail">
                    <div><span>Meeting Type</span><b>{conf?.mode}</b></div>
                    <div><span>Date &amp; Time</span><b>{conf?.dateTime}</b></div>
                    <div><span>Destination Interest</span><b>{conf?.dest}</b></div>
                    <div><span>Contact</span><b>{conf?.contact}</b></div>
                  </div>
                  <button type="button" className="btn btn-outline-navy" style={{ marginTop: 22 }} onClick={resetBooking}>Book Another Slot</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Studyform;