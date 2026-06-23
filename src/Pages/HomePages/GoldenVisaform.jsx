import API_BASE from "../../config.js";
import React from 'react';
import { useState, useEffect, useRef } from "react";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

const TIME_SLOTS = ["10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];
const PROGRAM_OPTIONS = ["Select a program","Portugal Golden Visa","Greece Golden Visa","Italy Investor Visa","Hungary Guest Investor Programme","UAE Golden Visa","Panama Qualified Investor Programme","Latvia Golden Visa","Not sure — I need guidance"];

function GoldenVisaform() {
  const rootRef = useRef(null);

  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    program: "", consult: "",
    date: "", time: TIME_SLOTS[0],
  });

  const [errors, setErrors]       = useState({});
  const [loading, setLoading]     = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  // ── Validations ──────────────────────────────────────────────────────
  const validateName  = (v) => /^[A-Za-z\s]{2,}$/.test(v.trim());
  const validateEmail = (v) => /^\S+@\S+\.\S+$/.test(v.trim());
  const validatePhone = (v) => /^[0-9]{10,15}$/.test(v);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const key = id.replace("gv-", "");
    const cleaned = key === "phone" ? value.replace(/\D/g, "") : value;
    setForm(f => ({ ...f, [key]: cleaned }));
    setErrors(er => ({ ...er, [key]: "" }));
  };

  // ── Submit ────────────────────────────────────────────────────────────
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const ve = {};

    if (!form.name)                    ve.name    = "Name is required";
    else if (!validateName(form.name)) ve.name    = "Only alphabets (min 2 chars)";

    if (!form.phone)                    ve.phone  = "Phone is required";
    else if (!validatePhone(form.phone)) ve.phone = "Enter valid 10-15 digit number";

    if (!form.email)                    ve.email  = "Email is required";
    else if (!validateEmail(form.email)) ve.email = "Invalid email";

    if (!form.program || form.program === "Select a program")
                                        ve.program = "Please select a program";

    if (!form.consult)                  ve.consult = "Please choose a consultation type";

    if (!form.date)                     ve.date   = "Please select a date";

    setErrors(ve);
    if (Object.keys(ve).length > 0) return;

    try {
      setLoading(true);
      setResponseMsg("");

      const payload = {
        name:    form.name,
        email:   form.email,
        mobile:  form.phone,
        message: `Consultation booking — ${form.consult} on ${form.date} at ${form.time}. Program: ${form.program}.`,
        type:    "Golden Visa Consultation",
        service: form.program,
      };

      const response = await fetch(`${API_BASE}/api/contact-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setResponseMsg("Consultation booked successfully ✅");
        setSubmitted(true);
        setErrors({});
      } else {
        setIsSuccess(false);
        setResponseMsg(data.message || "Submission failed ❌");
      }
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
      setResponseMsg("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", phone: "", email: "", program: "", consult: "", date: "", time: TIME_SLOTS[0] });
    setErrors({}); setResponseMsg(""); setIsSuccess(false); setSubmitted(false);
  };

  // ── Error border helper ───────────────────────────────────────────────
  const errStyle = (key) => errors[key] ? { outline: "1.5px solid #ef4444" } : {};

  return (
    <div ref={rootRef}>
      <div className="schedule-card reveal">
        {!submitted ? (
          <>
            <h3>Schedule Your Consultation</h3>
            <p className="sub">Meet a Langma International advisor at our office. Bring your questions — leave with a strategy.</p>

            {/* Response banner */}
            {responseMsg && (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", marginBottom: 16, borderRadius: 10,
                background: isSuccess ? "#f0fdf4" : "#fef2f2",
                border: `1px solid ${isSuccess ? "#bbf7d0" : "#fecaca"}`,
                color: isSuccess ? "#15803d" : "#b91c1c",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {isSuccess ? <FiCheckCircle size={16} /> : <FiAlertCircle size={16} />}
                  <span style={{ fontSize: 14 }}>{responseMsg}</span>
                </div>
                <button type="button" onClick={() => setResponseMsg("")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
                  <FiX size={16} />
                </button>
              </div>
            )}

            <form onSubmit={handleFormSubmit} noValidate>

              {/* NAME */}
              <div className="form-row">
                <label className="form-label" htmlFor="gv-name">Full Name</label>
                <input id="gv-name" type="text" className="form-input" placeholder="Your full name"
                  style={errStyle("name")} value={form.name} onChange={handleChange} />
                {errors.name && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
              </div>

              {/* PHONE + EMAIL */}
              <div className="form-row-2">
                <div>
                  <label className="form-label" htmlFor="gv-phone">Mobile Number</label>
                  <input id="gv-phone" type="tel" className="form-input" placeholder="+91"
                    style={errStyle("phone")} value={form.phone} onChange={handleChange} />
                  {errors.phone && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.phone}</p>}
                </div>
                <div>
                  <label className="form-label" htmlFor="gv-email">Email Address</label>
                  <input id="gv-email" type="email" className="form-input" placeholder="you@email.com"
                    style={errStyle("email")} value={form.email} onChange={handleChange} />
                  {errors.email && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
                </div>
              </div>

              {/* PROGRAM */}
              <div className="form-row">
                <label className="form-label" htmlFor="gv-program">Program of Interest</label>
                <select id="gv-program" className="form-select"
                  style={errStyle("program")} value={form.program} onChange={handleChange}>
                  {PROGRAM_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
                {errors.program && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.program}</p>}
              </div>

              {/* CONSULTATION TYPE */}
              <div className="form-row">
                <label className="form-label" htmlFor="gv-consult">Preferred Consultation</label>
                <select id="gv-consult" className="form-select"
                  style={errStyle("consult")} value={form.consult} onChange={handleChange}>
                  <option value="">Choose your preference</option>
                  <option>New Delhi — Head Office (In Person)</option>
                  <option>Virtual — Secure Video Consultation</option>
                </select>
                {errors.consult && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.consult}</p>}
              </div>

              {/* DATE + TIME */}
              <div className="form-row-2">
                <div>
                  <label className="form-label" htmlFor="gv-date">Preferred Date</label>
                  <input id="gv-date" type="date" className="form-input"
                    min={new Date().toISOString().split("T")[0]}
                    style={errStyle("date")} value={form.date} onChange={handleChange} />
                  {errors.date && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.date}</p>}
                </div>
                <div>
                  <label className="form-label" htmlFor="gv-time">Preferred Time</label>
                  <select id="gv-time" className="form-select" value={form.time} onChange={handleChange}>
                    {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? "SUBMITTING..." : "CONFIRM MY CONSULTATION →"}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ marginBottom: 10 }}>Consultation Requested</h3>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 20 }}>
              Thank you, <b>{form.name}</b>. A Langma International advisor will confirm your slot by phone or WhatsApp shortly.
            </p>
            <button type="button" className="btn btn-outline" onClick={resetForm}>Book Another Slot</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GoldenVisaform;