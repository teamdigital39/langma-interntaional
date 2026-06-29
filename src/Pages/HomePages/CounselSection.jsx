import React, { useState } from "react";
import API_BASE from "../../config.js";
import { C, F, S, SectionHeader, useMediaQuery, BP } from "./styles.jsx";

const langs = ["— Select a language —","French","German","Spanish","Japanese","Korean","Mandarin Chinese","Arabic","Russian","Italian","Portuguese","Dutch","Polish","Hebrew","Persian / Farsi","Dari / Pashto","Hindi","Urdu","Sanskrit","Sinhala","Thai","Vietnamese","Indonesian","Mongolian","Burmese","Swahili","Nordic Languages","Balkan Languages","Baltic Languages","Armenian","Indian Regional Languages","Not sure — need guidance"];
const goals = ["— Select your primary goal —","Study Abroad","Career Growth","Migration / PR","Corporate Training","Diplomatic / Government","Personal Interest","Other"];

const options = [
  { e:"🏛️", t:"Campus Consultation",  d:"Meet us in South Extension, New Delhi." },
  { e:"💻", t:"Online Consultation",   d:"Connect from anywhere in the world." },
  { e:"📞", t:"Call Back Request",     d:"Schedule a conversation at your convenience." },
  { e:"💬", t:"WhatsApp Support",      d:"Get quick answers from our team." },
];

const isPlaceholder = (value) => !value || value.startsWith("—");

const validateName = (name) => /^[A-Za-z\s]{2,}$/.test(name.trim());
const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email.trim());
const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);

const ConsultOptionCard = ({ option, selected, onSelect }) => {
  const [hov, setHov] = useState(false);
  const active = selected || hov;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(option.t)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(option.t);
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:`1px solid ${active ? C.teal : "rgba(0,96,100,.2)"}`,
        borderRadius:S.radius, padding:20, textAlign:"center",
        cursor:"pointer", background: active ? C.bgMint : C.bgWhite,
        boxShadow: active ? "0 4px 16px rgba(0,96,100,.1)" : "none",
        transform: active ? "translateY(-3px)" : "none",
        transition:`all ${S.transition}`,
        outline: selected ? `2px solid ${C.teal}` : "none",
        outlineOffset: 2,
      }}
    >
      <span style={{ fontSize:"1.8rem", display:"block", marginBottom:8 }}>{option.e}</span>
      <h4 style={{ fontFamily:F.sans, fontSize:".93rem", fontWeight:700, color:C.tealDark, marginBottom:4 }}>{option.t}</h4>
      <p style={{ fontFamily:F.sans, fontSize:".8rem", color:C.navy }}>{option.d}</p>
    </div>
  );
};

const CounselSection = () => {
  const [form, setForm] = useState({ name:"", email:"", phone:"", lang:"", goal:"", date:"", time:"" });
  const [consultType, setConsultType] = useState("Online Consultation");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const isMobile = useMediaQuery(`(max-width:${BP.mobile}px)`);
  const isTablet = useMediaQuery(`(max-width:${BP.tablet}px)`);

  const inputStyle = (field) => ({
    width:"100%", padding:"12px 16px", borderRadius:10,
    border:`1px solid ${errors[field] ? "#ef4444" : "rgba(0,96,100,.25)"}`,
    background:C.bgMint,
    fontFamily:F.sans, fontSize:".95rem", color:C.navyDark,
    outline:"none", boxSizing:"border-box",
    transition:`border-color ${S.transition}, box-shadow ${S.transition}`,
  });

  const handleFocus = (e) => {
    e.target.style.borderColor = C.teal;
    e.target.style.boxShadow = `0 0 0 3px rgba(0,96,100,.12)`;
  };

  const handleBlur = (e, field) => {
    e.target.style.borderColor = errors[field] ? "#ef4444" : "rgba(0,96,100,.25)";
    e.target.style.boxShadow = "none";
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = {};

    if (!form.name.trim()) validationErrors.name = "Name is required";
    else if (!validateName(form.name)) validationErrors.name = "Only alphabets (min 2 chars)";

    if (!form.email.trim()) validationErrors.email = "Email is required";
    else if (!validateEmail(form.email)) validationErrors.email = "Invalid email";

    if (!form.phone.trim()) validationErrors.phone = "Phone is required";
    else if (!validatePhone(form.phone)) validationErrors.phone = "Enter valid 10-15 digit number";

    if (!form.date) validationErrors.date = "Please select a preferred date";
    if (!form.time) validationErrors.time = "Please select a preferred time";
    if (isPlaceholder(form.lang)) validationErrors.lang = "Please select a language";
    if (isPlaceholder(form.goal)) validationErrors.goal = "Please select your goal";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      setResponseMsg("");

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.phone.trim(),
        message: [
          `Consultation type: ${consultType}.`,
          `Preferred date: ${form.date}.`,
          `Preferred time: ${form.time}.`,
          `Language of interest: ${form.lang}.`,
          `Learning goal: ${form.goal}.`,
        ].join(" "),
        type: "General Inquiry",
        service: `Language Training - ${form.lang}`,
      };

      const response = await fetch(`${API_BASE}/api/contact-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setResponseMsg("Form submitted successfully!");
        setForm({ name:"", email:"", phone:"", lang:"", goal:"", date:"", time:"" });
        setErrors({});
      } else {
        setIsSuccess(false);
        setResponseMsg(data.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
      setResponseMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="counsel" style={{ padding:"80px 0", background:C.bgLight }}>
      <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 26px" }}>
        <SectionHeader
          eyebrow="Book Your Session"
          title="Let's Discuss Your Goals"
          body="Whether you're learning a language for higher education, international careers, professional growth, or personal development, our advisors can help you choose the right pathway."
        />

        <div style={{ display:"grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 56, alignItems:"start" }}>

          {/* LEFT */}
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:28 }}>
              {options.map((o, i) => (
                <ConsultOptionCard
                  key={i}
                  option={o}
                  selected={consultType === o.t}
                  onSelect={setConsultType}
                />
              ))}
            </div>
            <div style={{ padding:28, background:C.bgMint, border:"1px solid rgba(0,96,100,.2)", borderRadius:S.radius }}>
              <p style={{ fontFamily:F.sans, fontSize:".7rem", letterSpacing:".18em", textTransform:"uppercase", color:C.teal, fontWeight:700, marginBottom:14 }}>Contact Details</p>
              <p style={{ fontFamily:F.sans, marginBottom:10, fontSize:".9rem", color:C.navyDark }}>
                <strong>Phone / WhatsApp:</strong><br/>
                <a href="tel:+919810117094" style={{ color:C.teal, textDecoration:"none", fontWeight:600 }}>+91 98101 17094</a>
              </p>
              <p style={{ fontFamily:F.sans, marginBottom:10, fontSize:".9rem", color:C.navyDark }}>
                <strong>Email:</strong><br/>
                <a href="mailto:info@langmainternational.com" style={{ color:C.teal, textDecoration:"none", fontWeight:600 }}>info@langmainternational.com</a>
              </p>
              <p style={{ fontFamily:F.sans, fontSize:".9rem", color:C.navyDark }}>
                <strong>Address:</strong><br/>South Extension, New Delhi, India
              </p>
              <a href="https://wa.me/919810117094" target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", marginTop:20, fontFamily:F.sans, fontSize:".88rem", fontWeight:600, padding:"10px 24px", borderRadius:100, border:`1.5px solid ${C.teal}`, color:C.teal, background:"transparent", textDecoration:"none", transition:`all ${S.transition}` }}
                onMouseEnter={e => { e.currentTarget.style.background = C.teal; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.teal; }}
              >Open WhatsApp</a>
            </div>
          </div>

          {/* RIGHT — form */}
          <div style={{ background:C.bgMint, border:"1px solid rgba(0,96,100,.2)", borderRadius:S.radius, padding: isMobile ? 22 : 36 }}>
            <p style={{ fontFamily:F.sans, fontSize:".7rem", letterSpacing:".18em", textTransform:"uppercase", color:C.teal, fontWeight:700, marginBottom:8 }}>Appointment Details</p>
            <h3 style={{ fontFamily:F.sans, fontSize:"1.3rem", fontWeight:700, color:C.navyDark, marginBottom:24 }}>Schedule Your Consultation</h3>

            {responseMsg && (
              <div style={{
                marginBottom:16, padding:"12px 14px", borderRadius:10,
                background: isSuccess ? "rgba(34,197,94,.12)" : "rgba(239,68,68,.12)",
                border:`1px solid ${isSuccess ? "rgba(34,197,94,.35)" : "rgba(239,68,68,.35)"}`,
                color: isSuccess ? "#166534" : "#991b1b",
                fontFamily:F.sans, fontSize:".85rem", lineHeight:1.5,
                display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10,
              }}>
                <span>{responseMsg}</span>
                <button
                  type="button"
                  onClick={() => setResponseMsg("")}
                  style={{ background:"none", border:"none", cursor:"pointer", color:"inherit", fontSize:"1rem", lineHeight:1, padding:0 }}
                  aria-label="Dismiss message"
                >×</button>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Date + Time */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
                {[{id:"date",label:"Preferred Date",type:"date"},{id:"time",label:"Preferred Time",type:"time"}].map(f => (
                  <div key={f.id}>
                    <label style={{ display:"block", fontFamily:F.sans, fontSize:".82rem", fontWeight:600, color:C.navyDark, marginBottom:6 }}>{f.label}</label>
                    <input
                      type={f.type}
                      style={inputStyle(f.id)}
                      onFocus={handleFocus}
                      onBlur={(e) => handleBlur(e, f.id)}
                      value={form[f.id]}
                      onChange={e => updateField(f.id, e.target.value)}
                    />
                    {errors[f.id] && (
                      <p style={{ fontFamily:F.sans, fontSize:".75rem", color:"#ef4444", marginTop:4 }}>{errors[f.id]}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Selects */}
              {[{id:"lang",label:"Language of Interest",opts:langs},{id:"goal",label:"Learning Goal",opts:goals}].map(s => (
                <div key={s.id} style={{ marginBottom:16 }}>
                  <label style={{ display:"block", fontFamily:F.sans, fontSize:".82rem", fontWeight:600, color:C.navyDark, marginBottom:6 }}>{s.label}</label>
                  <select
                    style={inputStyle(s.id)}
                    onFocus={handleFocus}
                    onBlur={(e) => handleBlur(e, s.id)}
                    value={form[s.id]}
                    onChange={e => updateField(s.id, e.target.value)}
                  >
                    {s.opts.map(o => <option key={o} value={o.startsWith("—") ? "" : o}>{o}</option>)}
                  </select>
                  {errors[s.id] && (
                    <p style={{ fontFamily:F.sans, fontSize:".75rem", color:"#ef4444", marginTop:4 }}>{errors[s.id]}</p>
                  )}
                </div>
              ))}

              {/* Text inputs */}
              {[{id:"name",label:"Your Name",type:"text",ph:"Full name"},{id:"email",label:"Email Address",type:"email",ph:"you@example.com"},{id:"phone",label:"Phone Number",type:"tel",ph:"+91 00000 00000"}].map(f => (
                <div key={f.id} style={{ marginBottom:16 }}>
                  <label style={{ display:"block", fontFamily:F.sans, fontSize:".82rem", fontWeight:600, color:C.navyDark, marginBottom:6 }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.ph}
                    style={inputStyle(f.id)}
                    onFocus={handleFocus}
                    onBlur={(e) => handleBlur(e, f.id)}
                    value={form[f.id]}
                    onChange={e => updateField(f.id, f.id === "phone" ? e.target.value.replace(/\D/g, "") : e.target.value)}
                  />
                  {errors[f.id] && (
                    <p style={{ fontFamily:F.sans, fontSize:".75rem", color:"#ef4444", marginTop:4 }}>{errors[f.id]}</p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width:"100%", padding:"15px", borderRadius:100,
                  background: loading ? "rgba(0,96,100,.6)" : C.teal,
                  color:"#fff", border:"none",
                  fontFamily:F.sans, fontSize:"1rem", fontWeight:700,
                  cursor: loading ? "not-allowed" : "pointer",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow:"0 4px 20px rgba(0,96,100,.3)",
                  transition:`all ${S.transition}`,
                  opacity: loading ? 0.85 : 1,
                }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = C.tealHover; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = C.teal; e.currentTarget.style.transform = "none"; } }}
              >
                {loading ? "Submitting..." : "Schedule My Consultation →"}
              </button>
              <p style={{ fontFamily:F.sans, fontSize:".75rem", color:C.tealDark, marginTop:10, textAlign:"center" }}>
                🔒 Your details are kept private. An advisor will confirm within one business day.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounselSection;
