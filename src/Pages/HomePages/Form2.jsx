import API_BASE from "../../config.js";
import React, { useState } from "react";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    progInterest: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // VALIDATIONS
  const validateName = (val) => /^[A-Za-z\s]{2,}$/.test(val.trim());
  const validateEmail = (val) => /^\S+@\S+\.\S+$/.test(val.trim());
  const validatePhone = (val) => /^[0-9]{10,15}$/.test(val);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === "phone") updatedValue = value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const inputError = (field) =>
    errors[field] ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-[#D8E0EC]";

  const fieldClass = (field) =>
    `w-full border rounded-xl px-4 py-2.5 text-gray-900 text-[14px] placeholder-gray-400 focus:border-[#2FC7A1] focus:ring-2 focus:ring-[#2FC7A1]/20 outline-none bg-white transition-colors ${inputError(field)}`;

  // SUBMIT
  const handleSubmit = async () => {
    const validationErrors = {};

    if (!formData.fname.trim())
      validationErrors.fname = "First name is required";
    else if (!validateName(formData.fname))
      validationErrors.fname = "Only alphabets allowed";

    if (!formData.lname.trim())
      validationErrors.lname = "Last name is required";
    else if (!validateName(formData.lname))
      validationErrors.lname = "Only alphabets allowed";

    if (!formData.email.trim())
      validationErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      validationErrors.email = "Invalid email";

    if (!formData.phone.trim())
      validationErrors.phone = "Phone is required";
    else if (!validatePhone(formData.phone))
      validationErrors.phone = "Enter valid number (10–15 digits)";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      setResponseMsg("");
      setIsSuccess(false);

      const payload = {
        type: "Consultation Request",
        service: formData.progInterest || "General Inquiry",
        name: `${formData.fname.trim()} ${formData.lname.trim()}`,
        email: formData.email.trim(),
        mobile: formData.phone.trim(),
        message:
          formData.message.trim() ||
          `Pathway of Interest: ${formData.progInterest || "Not yet decided"}`,
      };

      const response = await fetch(`${API_BASE}/api/contact-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch (_) {}

      if (response.status === 200 || response.status === 201) {
        setIsSuccess(true);
        setResponseMsg("Form submitted successfully ✅");
        setFormData({
          fname: "",
          lname: "",
          email: "",
          phone: "",
          progInterest: "",
          message: "",
        });
        setErrors({});
        setTimeout(() => setResponseMsg(""), 5000);
      } else {
        setIsSuccess(false);
        setResponseMsg(data.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setIsSuccess(false);
      setResponseMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="meeting-form" className="bg-white border border-[#D8E0EC] shadow-[0_20px_50px_-20px_rgba(41,97,102,0.2)] rounded-2xl p-8">
      <h3 className="text-[22px] font-bold text-[#296166] mb-1">Schedule a Consultation</h3>
      <p className="text-[14px] text-gray-500 mb-7">
        We respond within one business day. All enquiries are strictly confidential.
      </p>

      {/* RESPONSE BANNER */}
      {responseMsg && (
        <div
          className={`flex items-center justify-between p-3 rounded-xl mb-4 text-sm ${
            isSuccess
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {isSuccess ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
            <span className="text-[13px]">{responseMsg}</span>
          </div>
          <button type="button" onClick={() => setResponseMsg("")}>
            <FiX size={14} />
          </button>
        </div>
      )}

      {/* FIRST + LAST NAME */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#296166] mb-1.5">
            First Name
          </label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="Your first name"
            className={fieldClass("fname")}
          />
          {errors.fname && (
            <p className="text-red-500 text-[11px] mt-1">{errors.fname}</p>
          )}
        </div>
        <div>
          <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#296166] mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Your last name"
            className={fieldClass("lname")}
          />
          {errors.lname && (
            <p className="text-red-500 text-[11px] mt-1">{errors.lname}</p>
          )}
        </div>
      </div>

      {/* EMAIL */}
      <div className="mb-4">
        <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#296166] mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={fieldClass("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>
        )}
      </div>

      {/* PHONE */}
      <div className="mb-4">
        <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#296166] mb-1.5">
          Phone / WhatsApp
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 XXXXX XXXXX"
          className={fieldClass("phone")}
        />
        {errors.phone && (
          <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>
        )}
      </div>

      {/* PATHWAY */}
      <div className="mb-4">
        <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#296166] mb-1.5">
          Pathway of Interest
        </label>
        <select
          name="progInterest"
          value={formData.progInterest}
          onChange={handleChange}
          className="w-full border border-[#D8E0EC] rounded-xl px-4 py-2.5 text-gray-900 text-[14px] focus:border-[#2FC7A1] focus:ring-2 focus:ring-[#2FC7A1]/20 outline-none bg-white"
        >
          <option value="">Not yet decided</option>
          <optgroup label="For Investors">
            <option>Malta Permanent Residence Programme</option>
            <option>Cyprus Permanent Residency</option>
            <option>Andorra Residence Permit</option>
          </optgroup>
          <optgroup label="For Financially Independent Individuals">
            <option>Portugal D7 Visa</option>
            <option>Spain Non-Lucrative Visa</option>
            <option>Austria Residence Permit</option>
            <option>Switzerland Residence Permit</option>
          </optgroup>
          <optgroup label="For Digital Nomads">
            <option>Portugal Digital Nomad Visa (D8)</option>
            <option>Hungary White Card</option>
            <option>Malta Nomad Residence Permit</option>
            <option>Spain Digital Nomad Visa</option>
            <option>Italy Digital Nomad Visa</option>
          </optgroup>
          <optgroup label="For Business Owners">
            <option>Hungary Business Residency</option>
            <option>Portugal Startup Visa</option>
            <option>USA EB-5 Investor Pathway</option>
          </optgroup>
        </select>
      </div>

      {/* MESSAGE */}
      <div className="mb-5">
        <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#296166] mb-1.5">
          How Can We Help?
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Briefly outline your situation and objectives (optional)"
          className="w-full border border-[#D8E0EC] rounded-xl px-4 py-2.5 text-gray-900 text-[14px] placeholder-gray-400 focus:border-[#2FC7A1] focus:ring-2 focus:ring-[#2FC7A1]/20 outline-none resize-y min-h-[80px] bg-white"
        />
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#1A2540] hover:bg-[#243160] disabled:opacity-50 text-white py-3 rounded-full font-semibold text-[14px] transition-colors"
      >
        {loading ? "Sending..." : "Request a Confidential Consultation"}
      </button>

      <p className="text-center text-[11px] text-gray-400 mt-3 leading-relaxed">
        By submitting, you agree to be contacted by a Langma International adviser.
        We do not share your details with any third party.
      </p>
    </div>
  );
};

export default ConsultationForm;