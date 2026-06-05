import API_BASE from "../../config.js";
import React, { useState } from "react";
import {
  FiChevronDown,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    language: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // VALIDATIONS
  const validateName = (name) =>
    /^[A-Za-z\s]{2,}$/.test(name.trim());

  const validateEmail = (email) =>
    /^\S+@\S+\.\S+$/.test(email.trim());

  const validatePhone = (phone) =>
    /^[0-9]{10,15}$/.test(phone);

  const validateMessage = (message) =>
    message.trim().length >= 5;

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.name)
      validationErrors.name = "Name is required";
    else if (!validateName(formData.name))
      validationErrors.name = "Only alphabets (min 2 chars)";

    if (!formData.phone)
      validationErrors.phone = "Phone is required";
    else if (!validatePhone(formData.phone))
      validationErrors.phone = "Enter valid 10-15 digit number";

    if (!formData.email)
      validationErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      validationErrors.email = "Invalid email";

    if (formData.service === "Language Training" && !formData.language)
      validationErrors.language = "Please select language";

    if (!formData.message)
      validationErrors.message = "Message is required";
    else if (!validateMessage(formData.message))
      validationErrors.message = "Minimum 5 characters";

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
        service:
          formData.service === "Language Training"
            ? `Language Training - ${formData.language}`
            : formData.service || "Translation",
      };

      const response = await fetch(
        `${API_BASE}/api/contact-lead`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);

        setResponseMsg("Form submitted successfully!");

        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          language: "",
          message: "",
        });

        setErrors({});
      } else {
        setIsSuccess(false);

        setResponseMsg(
          data.message || "Submission failed. Please try again."
        );
      }
    } catch (error) {
      console.error(error);

      setIsSuccess(false);

      setResponseMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputError = (field) =>
    errors[field] ? "border-red-500" : "border-gray-200";

  return (
    <section className="w-full py-14 bg-[#F4FFFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* MAIN WRAPPER */}
        <div
          className="
            relative
            grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]
            rounded-[20px] sm:rounded-[36px]
            overflow-hidden
            shadow-[0_20px_80px_rgba(0,0,0,0.12)]
            bg-white
          "
        >

          {/* LEFT IMAGE SECTION */}
          <div className="relative h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[540px]">

            {/* IMAGE */}
            <img
              src="/images/young-happy-businesswoman-working-desktop-pc-communicating-mobile-phone-office 1.png"
              alt="Contact Visual"
              className="w-full h-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B6B6B]/70 via-[#0B6B6B]/20 to-transparent"></div>

            {/* CONTENT OVER IMAGE */}
            <div className="absolute bottom-0 left-0 p-6 lg:p-10 z-10 text-white">

              <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm inline-block mb-4">
                LANGMA INTERNATIONAL
              </span>

              <h2 className="text-2xl lg:text-4xl font-bold leading-tight max-w-xl">
                Your Future Starts With The Right Guidance
              </h2>

              <p className="mt-4 text-white/90 max-w-lg leading-relaxed text-sm lg:text-base">
                Connect with our expert counselors for language training,
                international careers, visa assistance and global opportunities.
              </p>

            </div>
          </div>

          {/* RIGHT FORM SECTION */}
          <div className="relative flex items-center">

            {/* BACKGROUND */}
            <div className="absolute inset-0">
              <img
                src="/images/Group 4568.png"
                alt="background"
                className="w-full h-full object-cover opacity-60"
              />
            </div>

            {/* GLOW EFFECT */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#27C4A8]/20 blur-3xl rounded-full"></div>

            {/* FORM WRAPPER */}
            <div className="relative z-10 w-full p-5 lg:p-7">

              {/* FORM CARD */}
              <div className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-[28px] shadow-2xl p-5 lg:p-6">

                {/* HEADING */}
                <div className="text-center mb-5">

                  <h2 className="text-[24px] lg:text-[30px] font-bold text-[#174B52]">
                    Let's Get Connected
                  </h2>

                  <p className="text-[#4B5563] mt-2 text-sm">
                    We're here to help you build your international future.
                  </p>

                </div>

                {/* RESPONSE MESSAGE */}
                {responseMsg && (
                  <div
                    className={`flex items-center justify-between p-3 mb-4 rounded-xl ${
                      isSuccess
                        ? "bg-green-100 border border-green-200 text-green-800"
                        : "bg-red-100 border border-red-200 text-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isSuccess ? (
                        <FiCheckCircle size={18} />
                      ) : (
                        <FiAlertCircle size={18} />
                      )}

                      <span className="text-sm">{responseMsg}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setResponseMsg("")}
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                )}

                {/* FORM */}
                <form className="space-y-3" onSubmit={handleSubmit}>

                  {/* NAME */}
                  <div>
                    <div className="relative">
                      <img
                        src="/images/user.png"
                        alt="user"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Your Name"
                        className={`w-full border rounded-2xl px-4 py-3 pl-12 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#27C4A8] transition ${inputError("name")}`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* PHONE */}
                  <div>
                    <div className="relative">
                      <img
                        src="/images/call.png"
                        alt="phone"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setFormData({ ...formData, phone: value });
                          setErrors({ ...errors, phone: "" });
                        }}
                        placeholder="Enter Your Contact Number"
                        className={`w-full border rounded-2xl px-4 py-3 pl-12 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#27C4A8] transition ${inputError("phone")}`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <div className="relative">
                      <img
                        src="/images/mail.png"
                        alt="email"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                        className={`w-full border rounded-2xl px-4 py-3 pl-12 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#27C4A8] transition ${inputError("email")}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* SERVICE */}
                  <div>
                    <div className="relative">
                      <img
                        src="/images/service.png"
                        alt="services"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                      />
                      <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0B6B6B] text-base pointer-events-none" />
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full border rounded-2xl px-4 py-3 pl-12 pr-12 appearance-none bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#27C4A8] transition ${inputError("service")} ${
                          formData.service === "" ? "text-[#837f7f]" : "text-black"
                        }`}
                      >
                        <option value="">Services</option>
                        <option value="Language Training">Language Training</option>
                        <option value="Study Abroad">Study Abroad</option>
                        <option value="Work Abroad">Work Abroad</option>
                        <option value="PR by Investment">PR by Investment</option>
                      </select>
                    </div>
                    {errors.service && (
                      <p className="text-red-500 text-xs mt-1">{errors.service}</p>
                    )}
                  </div>

                  {/* LANGUAGE - shown only when Language Training is selected */}
                  {formData.service === "Language Training" && (
                    <div>
                      <div className="relative">
                        <img
                          src="https://api.iconify.design/mdi/translate.svg?color=%230B6B6B"
                          alt="language"
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                        />
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0B6B6B] text-base pointer-events-none" />
                        <select
                          name="language"
                          value={formData.language}
                          onChange={handleChange}
                          className={`w-full border rounded-2xl px-4 py-3 pl-12 pr-12 appearance-none bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#27C4A8] transition ${inputError("language")} ${
                            formData.language === "" ? "text-[#837f7f]" : "text-black"
                          }`}
                        >
                          <option value="">Select Language</option>
                          <option value="Arabic">Arabic</option>
                          <option value="Armenian">Armenian</option>
                          <option value="Balkan">Balkan</option>
                          <option value="Baltic">Baltic</option>
                          <option value="Burmese">Burmese</option>
                          <option value="Dari/Pashto">Dari/Pashto</option>
                          <option value="Dutch">Dutch</option>
                          <option value="English">English</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                          <option value="Hebrew">Hebrew</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Indian Regional">Indian Regional</option>
                          <option value="Indonesian">Indonesian</option>
                          <option value="Italian">Italian</option>
                          <option value="Japanese">Japanese</option>
                          <option value="Korean">Korean</option>
                          <option value="Mandarin">Mandarin</option>
                          <option value="Mongolian">Mongolian</option>
                          <option value="Nordic">Nordic</option>
                          <option value="Persian">Persian</option>
                          <option value="Polish">Polish</option>
                          <option value="Portuguese">Portuguese</option>
                          <option value="Russian">Russian</option>
                          <option value="Sanskrit">Sanskrit</option>
                          <option value="Sinhala">Sinhala</option>
                          <option value="Spanish">Spanish</option>
                          <option value="Swahili">Swahili</option>
                          <option value="Thai">Thai</option>
                          <option value="Urdu">Urdu</option>
                          <option value="Vietnamese">Vietnamese</option>
                        </select>
                      </div>
                      {errors.language && (
                        <p className="text-red-500 text-xs mt-1">{errors.language}</p>
                      )}
                    </div>
                  )}

                  {/* MESSAGE */}
                  <div>
                    <div className="relative">
                      <img
                        src="/images/describ.png"
                        alt="pen"
                        className="absolute left-4 top-4 w-4 h-4"
                      />
                      <textarea
                        rows="3"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe Your Requirement"
                        className={`w-full border rounded-2xl px-4 py-3 pl-12 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#27C4A8] transition resize-none ${inputError("message")}`}
                      ></textarea>
                    </div>
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full
                      mt-2
                      bg-gradient-to-r from-[#27C4A8] to-[#0B6B6B]
                      text-white
                      py-3
                      rounded-2xl
                      font-semibold
                      shadow-lg
                      hover:scale-[1.02]
                      transition-all duration-300
                      disabled:opacity-50
                    "
                  >
                    {loading ? "Sending..." : "Submit"}
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;