import API_BASE from "../../../config.js";
import React, { useState } from "react";
import { X } from "lucide-react";
import {
  FiChevronDown,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

function PopupForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateName = (name) => /^[A-Za-z\s]{2,}$/.test(name.trim());
  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email.trim());
  const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);
  const validateMessage = (message) => message.trim().length >= 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "phone" ? value.replace(/\D/g, "") : value;

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = {};

    if (!formData.name) validationErrors.name = "Name is required";
    else if (!validateName(formData.name)) validationErrors.name = "Only alphabets (min 2 chars)";

    if (!formData.phone) validationErrors.phone = "Phone is required";
    else if (!validatePhone(formData.phone)) validationErrors.phone = "Enter valid 10-15 digit number";

    if (!formData.email) validationErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) validationErrors.email = "Invalid email";

    if (!formData.service) validationErrors.service = "Please select a service";

    if (!formData.message) validationErrors.message = "Message is required";
    else if (!validateMessage(formData.message)) validationErrors.message = "Minimum 5 characters";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      setResponseMsg("");

      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        message: formData.message,
        type: "General Inquiry",
        service: formData.service || "Translation",
      };

      const response = await fetch(`${API_BASE}/api/contact-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setResponseMsg("Form submitted successfully ✅");
        setFormData({ name: "", phone: "", email: "", service: "", message: "" });
        setErrors({});
        setTimeout(() => {
          onClose();
          setResponseMsg("");
        }, 2500);
      } else {
        setIsSuccess(false);
        setResponseMsg(data.message || "Submission failed ❌");
      }
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
      setResponseMsg("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const inputError = (field) => (errors[field] ? "border-red-500" : "border-gray-300");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-gradient-to-br from-white to-slate-50 w-[90%] max-w-md rounded-2xl p-6 shadow-2xl relative max-h-[95vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">Contact Us</h2>
        <p className="text-sm text-center text-gray-500 mb-5">We'll get back to you shortly</p>

        {responseMsg && (
          <div
            className={`flex items-center justify-between p-3 mb-4 rounded-xl text-sm ${
              isSuccess
                ? "bg-green-100 border border-green-200 text-green-700"
                : "bg-red-100 border border-red-200 text-red-700"
            }`}
          >
            <div className="flex items-center gap-2">
              {isSuccess ? <FiCheckCircle size={16} /> : <FiAlertCircle size={16} />}
              <span>{responseMsg}</span>
            </div>
            <button type="button" onClick={() => setResponseMsg("")}>
              <FiX size={16} />
            </button>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`w-full border px-4 py-2.5 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputError("name")}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={`w-full border px-4 py-2.5 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputError("email")}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className={`w-full border px-4 py-2.5 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputError("phone")}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="relative">
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full border px-4 py-2.5 pr-10 rounded-lg bg-white appearance-none text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputError("service")} ${
                formData.service === "" ? "text-gray-500" : ""
              }`}
            >
              <option value="">Services</option>
              <option value="International Language">International Language</option>
              <option value="Study Abroad">Study Abroad</option>
              <option value="Work Abroad">Work Abroad</option>
              <option value="Global Assist">Global Assist</option>
            </select>
            {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="3"
              className={`w-full border px-4 py-2.5 rounded-lg text-black resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputError("message")}`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupForm;
