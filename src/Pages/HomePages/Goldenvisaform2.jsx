import API_BASE from "../../config.js";
import React, { useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

function Goldenvisaform2() {
  const [leadForm, setLeadForm]       = useState({ name: "", phone: "", email: "" });
  const [leadErrors, setLeadErrors]   = useState({});
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadMsg, setLeadMsg]         = useState("");
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadSent, setLeadSent]       = useState(false);

  const validateName  = (v) => /^[A-Za-z\s]{2,}$/.test(v.trim());
  const validatePhone = (v) => /^[0-9]{10,15}$/.test(v);
  const validateEmail = (v) => /^\S+@\S+\.\S+$/.test(v.trim());

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (leadLoading) return;

    const ve = {};

    if (!leadForm.name)                    ve.name  = "Name is required";
    else if (!validateName(leadForm.name)) ve.name  = "Only alphabets (min 2 chars)";

    if (!leadForm.phone)                    ve.phone = "Phone is required";
    else if (!validatePhone(leadForm.phone)) ve.phone = "Enter valid 10-15 digit number";

    if (!leadForm.email)                    ve.email = "Email is required";
    else if (!validateEmail(leadForm.email)) ve.email = "Invalid email";

    setLeadErrors(ve);
    if (Object.keys(ve).length > 0) return;

    try {
      setLeadLoading(true);
      setLeadMsg("");

      const payload = {
        name:    leadForm.name,
        email:   leadForm.email,
        mobile:  leadForm.phone,
        message: "Callback request from Golden Visa page.",
        type:    "Callback Request",
        service: "Golden Visa",
      };

      const response = await fetch(`${API_BASE}/api/contact-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setLeadSuccess(true);
        setLeadMsg("We'll call you back shortly ✅");
        setLeadSent(true);
        setLeadForm({ name: "", phone: "", email: "" });
        setLeadErrors({});
      } else {
        setLeadSuccess(false);
        setLeadMsg(data.message || "Submission failed ❌");
      }
    } catch (err) {
      console.error("Full error:", err);
      console.error("Error message:", err.message);
      setLeadSuccess(false);
      setLeadMsg("Something went wrong ❌");
    } finally {
      setLeadLoading(false);
    }
  };

  return (
    <div>
      {!leadSent ? (
        <form className="lead-form" onSubmit={handleLeadSubmit} noValidate>

          {/* Response banner */}
          {leadMsg && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 14px", marginBottom: 12, borderRadius: 10,
              background: leadSuccess ? "#f0fdf4" : "#fef2f2",
              border: `1px solid ${leadSuccess ? "#bbf7d0" : "#fecaca"}`,
              color: leadSuccess ? "#15803d" : "#b91c1c",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {leadSuccess ? <FiCheckCircle size={15} /> : <FiAlertCircle size={15} />}
                <span style={{ fontSize: 13 }}>{leadMsg}</span>
              </div>
              <button type="button" onClick={() => setLeadMsg("")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
                <FiX size={15} />
              </button>
            </div>
          )}

          {/* NAME */}
          <input type="text" className="lead-input" placeholder="Your Name"
            style={leadErrors.name ? { outline: "1.5px solid #ef4444" } : {}}
            value={leadForm.name}
            onChange={e => {
              setLeadForm({ ...leadForm, name: e.target.value });
              setLeadErrors({ ...leadErrors, name: "" });
            }} />
          {leadErrors.name && (
            <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4, marginBottom: 4 }}>
              {leadErrors.name}
            </p>
          )}

          {/* PHONE */}
          <input type="tel" className="lead-input" placeholder="Mobile Number"
            style={leadErrors.phone ? { outline: "1.5px solid #ef4444" } : {}}
            value={leadForm.phone}
            onChange={e => {
              setLeadForm({ ...leadForm, phone: e.target.value.replace(/\D/g, "") });
              setLeadErrors({ ...leadErrors, phone: "" });
            }} />
          {leadErrors.phone && (
            <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4, marginBottom: 4 }}>
              {leadErrors.phone}
            </p>
          )}

          {/* EMAIL */}
          <input type="email" className="lead-input" placeholder="Email Address"
            style={leadErrors.email ? { outline: "1.5px solid #ef4444" } : {}}
            value={leadForm.email}
            onChange={e => {
              setLeadForm({ ...leadForm, email: e.target.value });
              setLeadErrors({ ...leadErrors, email: "" });
            }} />
          {leadErrors.email && (
            <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4, marginBottom: 4 }}>
              {leadErrors.email}
            </p>
          )}

          <button type="submit" className="btn btn-gold" disabled={leadLoading}>
            {leadLoading ? "Sending..." : "Request a Callback →"}
          </button>

        </form>
      ) : (
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📞</div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "white" }}>Thank you!</p>
          <p style={{ fontSize: 13, marginTop: 4, color: "white" }}>We'll call you back shortly.</p>
          <button type="button" className="btn btn-gold"
            style={{ marginTop: 14, fontSize: 13 }}
            onClick={() => { setLeadSent(false); setLeadMsg(""); setLeadSuccess(false); }}>
            Submit Another →
          </button>
        </div>
      )}
    </div>
  );
}

export default Goldenvisaform2;