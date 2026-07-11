import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";
import API_BASE from "../../config";

const inputBase =
  "w-full border border-[#D8E0EC] rounded-xl px-4 py-2.5 text-[14px] text-gray-900 bg-white focus:border-[#2FC7A1] focus:ring-2 focus:ring-[#2FC7A1]/20 outline-none transition-colors";

const ResidencyFinder = () => {
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
    errors[field] ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "";

  const handleSubmit = async () => {
    const validationErrors = {};
    if (!formData.nationality) validationErrors.nationality = "Please select your nationality";
    if (!formData.profile) validationErrors.profile = "Please select your profile";
    if (!formData.investmentRange) validationErrors.investmentRange = "Please select a range";

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
    <div className="bg-white border border-[#D8E0EC] shadow-[0_20px_50px_-20px_rgba(41,97,102,0.25)] rounded-2xl p-6 sm:p-8">
      <p className="text-[11px] font-semibold tracking-widest uppercase text-[#2FC7A1] mb-2">Quick Shortlist</p>
      <h2 className="text-[22px] font-bold text-[#296166] mb-1">Find the Right Residency Pathway</h2>
      <p className="text-[13px] text-gray-500 mb-6">Answer a few quick questions and get a personalised shortlist.</p>

      <div className="space-y-4">
        {responseMsg && (
          <div
            className={`flex items-center justify-between p-3 rounded-xl text-sm ${
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

        {["nationality", "profile", "investmentRange"].map((field) => {
          const labels = {
            nationality: "Your Nationality",
            profile: "Your Profile",
            investmentRange: "Investment or Income Range",
          };
          const options = {
            nationality: ["", "India", "United Arab Emirates", "Saudi Arabia", "United States", "United Kingdom", "Other"],
            profile: [
              "",
              "Investor seeking permanent residency",
              "Financially independent individual or retiree",
              "Digital nomad or remote professional",
              "Business owner or entrepreneur",
              "Globally mobile family planning a second base",
            ],
            investmentRange: [
              "",
              "Passive income route (D7 or NLV profile)",
              "Under €300,000",
              "€300,000 – €600,000",
              "€600,000 – €1,000,000",
              "Over €1,000,000",
            ],
          };
          const placeholders = {
            nationality: "Select your country",
            profile: "Select profile",
            investmentRange: "Select range",
          };
          return (
            <div key={field}>
              <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#296166] mb-1.5">
                {labels[field]}
              </label>
              <select
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`${inputBase} ${inputError(field)} ${formData[field] === "" ? "text-gray-400" : ""}`}
              >
                {options[field].map((opt, i) => (
                  <option key={i} value={opt === "India" ? opt : opt}>
                    {i === 0 ? placeholders[field] : opt}
                  </option>
                ))}
              </select>
              {errors[field] && <p className="text-red-500 text-[11px] mt-1">{errors[field]}</p>}
            </div>
          );
        })}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#1A2540] hover:bg-[#243160] disabled:opacity-50 text-white py-3 rounded-full font-semibold text-[14px] transition-colors"
        >
          {loading ? "Submitting..." : "Request a Preliminary Shortlist"}
        </button>

        <div className="relative flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-[#D8E0EC]" />
          <span className="text-[11px] text-gray-400 uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-[#D8E0EC]" />
        </div>

        <Link
          to="/assessment"
          className="flex items-center justify-center gap-2 w-full border-2 border-[#2FC7A1] hover:bg-[#E6F8F3] text-[#296166] py-3 rounded-full font-semibold text-[14px] transition-all"
        >
          Take the Full Assessment →
        </Link>

        <p className="text-center text-[11px] text-gray-400">No obligation · Strictly confidential</p>
      </div>
    </div>
  );
};

export default ResidencyFinder;
