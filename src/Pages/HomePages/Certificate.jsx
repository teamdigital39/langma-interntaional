import API_BASE from "../../config.js";
import React, { useState } from "react";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";
import { Award, BookOpen, Globe, Star, Clock, Users } from "lucide-react";

// ─── Static Data ────────────────────────────────────────────────────────────

const certificateTypes = [
  "Basic Proficiency Certificate",
  "Intermediate Level Certificate",
  "Advanced Level Certificate",
  "Business Language Certificate",
  "Conversational Language Certificate",
  "DELF/DALF (French)",
  "Goethe-Zertifikat (German)",
  "JLPT (Japanese)",
  "HSK (Chinese)",
  "TOPIK (Korean)",
  "Other",
];

const languages = [
  "English",
  "French",
  "German",
  "Spanish",
  "Japanese",
  "Chinese (Mandarin)",
  "Arabic",
  "Korean",
  "Russian",
  "Italian",
  "Portuguese",
  "Hindi",
  "Persian",
  "Sanskrit",
  "Polish",
  "Balkan Languages",
  "Other",
];

const features = [
  {
    icon: <Award size={28} className="text-[#296166]" />,
    title: "Globally Recognized",
    desc: "Our certificates are recognized by universities, employers, and institutions worldwide.",
  },
  {
    icon: <BookOpen size={28} className="text-[#296166]" />,
    title: "Expert Trainers",
    desc: "Learn from certified native speakers and language experts with years of experience.",
  },
  {
    icon: <Globe size={28} className="text-[#296166]" />,
    title: "50+ Languages",
    desc: "Choose from over 50 international and regional languages to earn your certificate.",
  },
  {
    icon: <Star size={28} className="text-[#296166]" />,
    title: "Structured Levels",
    desc: "Certificates available from A1 beginner to C2 mastery across all language programs.",
  },
  {
    icon: <Clock size={28} className="text-[#296166]" />,
    title: "Flexible Schedule",
    desc: "Online and offline programs designed to fit your lifestyle and learning pace.",
  },
  {
    icon: <Users size={28} className="text-[#296166]" />,
    title: "200k+ Learners",
    desc: "Join a thriving community of certified language learners across the globe.",
  },
];

const steps = [
  {
    step: "01",
    title: "Fill the Application Form",
    desc: "Submit your details and preferred language & certificate level.",
  },
  {
    step: "02",
    title: "Counselling Session",
    desc: "Our experts will contact you to guide you through the right program.",
  },
  {
    step: "03",
    title: "Enroll & Begin Training",
    desc: "Start your structured language training with certified trainers.",
  },
  {
    step: "04",
    title: "Assessment & Examination",
    desc: "Appear for the internal/external assessment as per your program.",
  },
  {
    step: "05",
    title: "Receive Your Certificate",
    desc: "Get your globally recognized language certificate upon successful completion.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Certificate() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    language: "",
    certificate_type: "",
    message: "",
  });

  const [errors, setErrors]         = useState({});
  const [loading, setLoading]       = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isSuccess, setIsSuccess]   = useState(false);

  // ── Validators ──────────────────────────────────────────────────────────
  const validateName    = (v) => /^[A-Za-z\s]{2,}$/.test(v.trim());
  const validateEmail   = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const validatePhone   = (v) => /^[0-9]{10,15}$/.test(v);
  const validateMessage = (v) => v.trim().length >= 5;

  // ── Handle input change ──────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ── Handle form submit → POST to /api/contact-lead (same as other forms) ──
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Client-side validation
    const errs = {};
    if (!formData.name)
      errs.name = "Name is required";
    else if (!validateName(formData.name))
      errs.name = "Only alphabets allowed (min 2 chars)";

    if (!formData.phone)
      errs.phone = "Phone is required";
    else if (!validatePhone(formData.phone))
      errs.phone = "Enter a valid 10–15 digit number";

    if (!formData.email)
      errs.email = "Email is required";
    else if (!validateEmail(formData.email))
      errs.email = "Enter a valid email address";

    if (!formData.language)
      errs.language = "Please select a language";

    if (!formData.certificate_type)
      errs.certificate_type = "Please select a certificate type";

    if (!formData.message)
      errs.message = "Message is required";
    else if (!validateMessage(formData.message))
      errs.message = "Minimum 5 characters required";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // ── API call ────────────────────────────────────────────────────────
    try {
      setLoading(true);
      setResponseMsg("");

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.phone,
        message: `Language: ${formData.language}. Certificate Type: ${formData.certificate_type}. ${formData.message.trim()}`,
        type: "Certificate Application",
        service: `Certificate Application - ${formData.language}`,
      };

      const response = await fetch(`${API_BASE}/api/contact-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // ── Success ──
        setIsSuccess(true);
        setResponseMsg("Form Submitted Successfully");
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          language: "",
          certificate_type: "",
          message: "",
        });
        setErrors({});
      } else {
        // ── Server-side error ──
        setIsSuccess(false);
        setResponseMsg(
          data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      // ── Network / unexpected error ──
      setIsSuccess(false);
      setResponseMsg(
        "Network error. Please check your connection and try again."
      );
      console.error("Certificate API error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Input class helper ────────────────────────────────────────────────────
  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 outline-none text-sm transition text-[#1B2B28]
     focus:border-[#2FC7A1] focus:ring-2 focus:ring-[#2FC7A1]/20
     ${errors[field] ? "border-red-400 bg-red-50" : "border-[#D8E0EC] bg-white"}`;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative w-full bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(47,199,161,0.35) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(79,163,209,0.2) 0%, transparent 45%)",
          }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-[#2FC7A1]/40 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FC7A1]" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#296166]">
                Globally Recognized Certifications
              </span>
            </div>
            <h1 className="text-[28px] sm:text-[40px] md:text-[48px] font-bold leading-tight text-[#1A2540]">
              Apply for a Language{" "}
              <span className="text-[#4FA3D1] italic">Certificate</span>
            </h1>
            <p className="mt-5 text-sm sm:text-base md:text-lg text-[#4C5C58] max-w-2xl leading-relaxed">
              Earn internationally recognized language certificates from Langma
              International — trusted by universities, employers, and institutions
              across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHY CERTIFY ══════════════════════ */}
      <section className="w-full py-12 sm:py-16 bg-[#F5F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-[22px] sm:text-[28px] md:text-[34px] font-bold text-[#1A2540]">
              Why Get Certified with{" "}
              <span className="text-[#4FA3D1]">Langma?</span>
            </h2>
            <p className="mt-3 text-[#4C5C58] text-sm sm:text-base max-w-xl mx-auto">
              A Langma certificate is more than a document — it's proof of your
              commitment, skill, and readiness to communicate globally.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D8E0EC]
                           shadow-[0_4px_20px_-8px_rgba(26,37,64,.08)] hover:border-[#2FC7A1]/40 hover:shadow-[0_16px_40px_-20px_rgba(41,97,102,.15)] transition"
              >
                <div className="mb-3">{f.icon}</div>
                <h3 className="font-semibold text-[#1A2540] text-sm sm:text-base mb-1">
                  {f.title}
                </h3>
                <p className="text-[#4C5C58] text-xs sm:text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
      <section className="w-full py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-[22px] sm:text-[28px] md:text-[34px] font-bold text-[#1A2540]">
              How It <span className="text-[#4FA3D1]">Works</span>
            </h2>
            <p className="mt-3 text-[#4C5C58] text-sm sm:text-base">
              Your journey to a language certificate in 5 simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A2540] text-[#F5F2EC]
                             flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-4"
                >
                  {s.step}
                </div>
                <h4 className="font-semibold text-[#1A2540] text-sm mb-1">
                  {s.title}
                </h4>
                <p className="text-[#4C5C58] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ APPLICATION FORM ══════════════════════ */}
      <section className="w-full py-12 sm:py-16 bg-[#F5F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* ── LEFT — Info ── */}
            <div>
              <span className="inline-block text-[#296166] text-sm font-semibold tracking-wider uppercase mb-2">
                Certificate Application
              </span>
              <h2 className="text-[22px] sm:text-[28px] md:text-[34px] font-bold
                             text-[#1A2540] leading-tight mb-4">
                Start Your Journey
                <br />
                <span className="text-[#4FA3D1]">Towards Certification</span>
              </h2>
              <p className="text-[#4C5C58] text-sm sm:text-base leading-relaxed mb-6">
                Fill out the form and our language counsellors will guide you
                through the best certification program based on your goals,
                language level, and timeline.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Personalised guidance for your language level",
                  "Clear exam preparation roadmap",
                  "Flexible batch timings — online & offline",
                  "Mock tests and practice sessions included",
                  "Support for DELF, Goethe, JLPT, HSK & more",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FiCheckCircle
                      className="text-[#2FC7A1] mt-0.5 shrink-0"
                      size={17}
                    />
                    <p className="text-[#4C5C58] text-sm">{point}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#D8E0EC] shadow-[0_4px_16px_-8px_rgba(26,37,64,.06)]">
                <p className="text-[#296166] font-semibold text-sm mb-1">
                  Need help choosing?
                </p>
                <p className="text-[#4C5C58] text-sm">
                  Call us at{" "}
                  <a
                    href="tel:+919810117094"
                    className="text-[#296166] font-medium underline"
                  >
                    +91-9810117094
                  </a>{" "}
                  or email{" "}
                  <a
                    href="mailto:info@langmainternational.com"
                    className="text-[#296166] font-medium underline"
                  >
                    info@langmainternational.com
                  </a>
                </p>
              </div>
            </div>

            {/* ── RIGHT — Form ── */}
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_-8px_rgba(26,37,64,.08)] p-5 sm:p-8 border border-[#D8E0EC]">
              <h3 className="text-[17px] sm:text-[20px] font-bold text-[#1A2540] mb-6">
                Certificate Application Form
              </h3>

              {/* ── API Response Banner ── */}
              {responseMsg && (
                <div
                  className={`flex items-start gap-3 p-4 rounded-xl mb-5 text-sm border
                    ${isSuccess
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50  text-red-600  border-red-200"
                    }`}
                >
                  {isSuccess ? (
                    <FiCheckCircle size={18} className="mt-0.5 shrink-0" />
                  ) : (
                    <FiAlertCircle size={18} className="mt-0.5 shrink-0" />
                  )}
                  <p className="flex-1">{responseMsg}</p>
                  <button
                    onClick={() => setResponseMsg("")}
                    className="shrink-0 hover:opacity-60 transition"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              )}

              {/* ── Form ── */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-[#1A2540] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1A2540] mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      maxLength={15}
                      className={inputClass("phone")}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A2540] mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-[#1A2540] mb-1">
                    Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className={`${inputClass("language")} appearance-none`}
                  >
                    <option value="">— Select a language —</option>
                    {languages.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                  {errors.language && (
                    <p className="text-red-500 text-xs mt-1">{errors.language}</p>
                  )}
                </div>

                {/* Certificate Type */}
                <div>
                  <label className="block text-sm font-medium text-[#1A2540] mb-1">
                    Certificate Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="certificate_type"
                    value={formData.certificate_type}
                    onChange={handleChange}
                    className={`${inputClass("certificate_type")} appearance-none`}
                  >
                    <option value="">— Select certificate type —</option>
                    {certificateTypes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.certificate_type && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.certificate_type}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#1A2540] mb-1">
                    Message / Query <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your current language level and certification goals…"
                    className={`${inputClass("message")} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1A2540] text-[#F5F2EC] py-3 rounded-full
                             font-semibold text-sm sm:text-base
                             hover:bg-[#243160] transition
                             disabled:opacity-60 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      {/* Spinner */}
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    "Submit Application →"
                  )}
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ CTA BANNER ══════════════════════ */}
      <section className="w-full py-12 sm:py-16 bg-[#F5F8F6] border-t border-[#D8E0EC] text-center px-4">
        <h2 className="text-[20px] sm:text-[26px] md:text-[32px] font-bold text-[#1A2540] mb-4">
          Ready to Earn Your Certificate?
        </h2>
        <p className="text-[#4C5C58] text-sm sm:text-base max-w-xl mx-auto mb-8">
          Join 200,000+ learners who have transformed their careers through
          certified language training at Langma International.
        </p>
        <a
          href="tel:+919810117094"
          className="inline-block bg-[#1A2540] text-[#F5F2EC] px-8 py-3 rounded-full
                     font-semibold text-sm sm:text-base hover:bg-[#243160] transition"
        >
          Call Us: +91-9810117094
        </a>
      </section>
    </>
  );
}