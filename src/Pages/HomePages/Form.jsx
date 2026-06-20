import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";
import API_BASE from "../../config";

const ResidencyFinder = ({ setOpen }) => {
  const [formData, setFormData] = useState({
    nationality: "",
    profile: "",
    investmentRange: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const inputError = (field) =>
    errors[field] ? "border-red-400" : "border-white/15";

  const handleSubmit = async () => {
    const validationErrors = {};

    if (!formData.nationality)
      validationErrors.nationality = "Please select your nationality";
    if (!formData.profile)
      validationErrors.profile = "Please select your profile";
    if (!formData.investmentRange)
      validationErrors.investmentRange = "Please select a range";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      setResponseMsg("");
      setIsSuccess(false);

      const payload = {
        type: "Residency Shortlist",
        service: "PR by Investment",
        nationality: formData.nationality,
        profile: formData.profile,
        investmentRange: formData.investmentRange,
        name: "Residency Enquiry",
        email: "enquiry@residency.com",
        mobile: "0000000000",
        message: `Nationality: ${formData.nationality} | Profile: ${formData.profile} | Range: ${formData.investmentRange}`,
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
        setFormData({ nationality: "", profile: "", investmentRange: "" });
        setErrors({});
        setTimeout(() => setResponseMsg(""), 4000);
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
    <div className="hidden lg:block bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8">
      <h2 className="text-[22px] font-bold text-white mb-1">
        Find the Right Residency Pathway
      </h2>
      <p className="text-[12px] text-white/45 mb-6">
        Answer a few quick questions and get a personalised shortlist.
      </p>

      <div className="space-y-4">

        {/* RESPONSE BANNER */}
        {responseMsg && (
          <div
            className={`flex items-center justify-between p-3 rounded-lg text-sm ${
              isSuccess
                ? "bg-green-900/40 border border-green-500/30 text-green-300"
                : "bg-red-900/40 border border-red-500/30 text-red-300"
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

        {/* NATIONALITY */}
        <div>
          <label className="block text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-1.5">
            Your Nationality
          </label>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2.5 text-[14px] focus:border-[#4FBDBA] outline-none bg-[#0E2A46] ${inputError("nationality")} ${
              formData.nationality === "" ? "text-white/40" : "text-white"
            }`}
          >
            <option value="">Select your country</option>
            <option>India</option>
            <option>United Arab Emirates</option>
            <option>Saudi Arabia</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Other</option>
          </select>
          {errors.nationality && (
            <p className="text-red-400 text-[11px] mt-1">{errors.nationality}</p>
          )}
        </div>

        {/* PROFILE */}
        <div>
          <label className="block text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-1.5">
            Your Profile
          </label>
          <select
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2.5 text-[14px] focus:border-[#4FBDBA] outline-none bg-[#0E2A46] ${inputError("profile")} ${
              formData.profile === "" ? "text-white/40" : "text-white"
            }`}
          >
            <option value="">Select profile</option>
            <option>Investor seeking permanent residency</option>
            <option>Financially independent individual or retiree</option>
            <option>Digital nomad or remote professional</option>
            <option>Business owner or entrepreneur</option>
            <option>Globally mobile family planning a second base</option>
          </select>
          {errors.profile && (
            <p className="text-red-400 text-[11px] mt-1">{errors.profile}</p>
          )}
        </div>

        {/* INVESTMENT RANGE */}
        <div>
          <label className="block text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-1.5">
            Investment or Income Range
          </label>
          <select
            name="investmentRange"
            value={formData.investmentRange}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2.5 text-[14px] focus:border-[#4FBDBA] outline-none bg-[#0E2A46] ${inputError("investmentRange")} ${
              formData.investmentRange === "" ? "text-white/40" : "text-white"
            }`}
          >
            <option value="">Select range</option>
            <option>Passive income route (D7 or NLV profile)</option>
            <option>Under €300,000</option>
            <option>€300,000 – €600,000</option>
            <option>€600,000 – €1,000,000</option>
            <option>Over €1,000,000</option>
          </select>
          {errors.investmentRange && (
            <p className="text-red-400 text-[11px] mt-1">{errors.investmentRange}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#2F6E73] hover:bg-[#296166] disabled:opacity-50 text-white py-3 rounded-lg font-semibold text-[14px] transition-colors"
        >
          {loading ? "Submitting..." : "Request a Preliminary Shortlist"}
        </button>

        {/* DIVIDER */}
        <div className="relative flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] text-white/35 uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* ASSESSMENT LINK */}
        <Link
          to="/assessment"
          className="flex items-center justify-center gap-2 w-full border-2 border-[#4FBDBA]/60 hover:border-[#4FBDBA] hover:bg-[#4FBDBA]/10 text-[#4FBDBA] py-3 rounded-lg font-semibold text-[14px] transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
          Take the Full Assessment →
        </Link>

        <p className="text-center text-[11px] text-white/35">
          No obligation · Strictly confidential
        </p>
      </div>
    </div>
  );
};

export default ResidencyFinder;