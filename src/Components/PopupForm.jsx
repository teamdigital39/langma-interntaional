import API_BASE from "../config.js";
import React, { useState } from "react";
import { X } from "lucide-react";
import {
  FiChevronDown,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

const PopupForm = ({ open, onClose }) => {
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

  if (!open) return null;

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

    let updatedValue = value;

    if (name === "phone") {
      updatedValue = value.replace(/\D/g, "");
    }

    setFormData({
      ...formData,
      [name]: updatedValue,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    let validationErrors = {};

    if (!formData.name)
      validationErrors.name =
        "Name is required";
    else if (
      !validateName(formData.name)
    )
      validationErrors.name =
        "Only alphabets (min 2 chars)";

    if (!formData.phone)
      validationErrors.phone =
        "Phone is required";
    else if (
      !validatePhone(formData.phone)
    )
      validationErrors.phone =
        "Enter valid 10-15 digit number";

    if (!formData.email)
      validationErrors.email =
        "Email is required";
    else if (
      !validateEmail(formData.email)
    )
      validationErrors.email =
        "Invalid email";

    if (!formData.service)
      validationErrors.service =
        "Please select a service";

    if (!formData.message)
      validationErrors.message =
        "Message is required";
    else if (
      !validateMessage(formData.message)
    )
      validationErrors.message =
        "Minimum 5 characters";

    setErrors(validationErrors);

    if (
      Object.keys(validationErrors).length >
      0
    )
      return;

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
          formData.service ||
          "Translation",
        // company: "Langma International",
        // language: "German",
      };

      const response = await fetch(
        `${API_BASE}/api/contact-lead`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);

        setResponseMsg(
          "Form submitted successfully ✅"
        );

        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          message: "",
        });

        setErrors({});

        setTimeout(() => {
          onClose();
          setResponseMsg("");
        }, 2500);
      } else {
        setIsSuccess(false);

        setResponseMsg(
          data.message ||
            "Submission failed ❌"
        );
      }
    } catch (error) {
      console.error(error);

      setIsSuccess(false);

      setResponseMsg(
        "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputError = (field) =>
    errors[field]
      ? "border-red-500"
      : "border-gray-200";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md rounded-2xl sm:rounded-3xl shadow-2xl relative p-5 sm:p-8 border border-gray-100 max-h-[95vh] overflow-y-auto">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500 transition"
        >
          <X size={18} />
        </button>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-2 text-[#006064]">
          Get in Touch
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          Tell us your requirement,
          we’ll help you 🚀
        </p>

        {/* RESPONSE MESSAGE */}
        {responseMsg && (
          <div
            className={`flex items-center justify-between p-3 mb-4 rounded-xl ${
              isSuccess
                ? "bg-green-100 border border-green-200 text-green-700"
                : "bg-red-100 border border-red-200 text-red-700"
            }`}
          >
            <div className="flex items-center gap-2">
              {isSuccess ? (
                <FiCheckCircle size={18} />
              ) : (
                <FiAlertCircle size={18} />
              )}

              <span className="text-sm">
                {responseMsg}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                setResponseMsg("")
              }
            >
              <FiX size={18} />
            </button>
          </div>
        )}

        {/* FORM */}
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          {/* NAME */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`w-full border rounded-xl px-4 py-3 outline-none ${inputError(
                "name"
              )}`}
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className={`w-full border rounded-xl px-4 py-3 outline-none ${inputError(
                "phone"
              )}`}
            />

            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`w-full border rounded-xl px-4 py-3 outline-none ${inputError(
                "email"
              )}`}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* SERVICE */}
          <div>
            <div className="relative">
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`w-full border rounded-xl px-4 py-3 pr-12 appearance-none bg-white transition-colors outline-none ${inputError(
                  "service"
                )} ${
                  formData.service === ""
                    ? "text-[#837f7f]"
                    : "text-black"
                }`}
              >
                <option value="">
                  Services
                </option>

                <option value="International Language">
                  International Language
                </option>

                <option value="Study Abroad">
                  Study Abroad
                </option>

                <option value="Work Abroad">
                  Work Abroad
                </option>

                <option value="Global Assist">
                  Global Assist
                </option>
              </select>
            </div>

            {errors.service && (
              <p className="text-red-500 text-xs mt-1">
                {errors.service}
              </p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Describe Your Requirement"
              className={`w-full border rounded-xl px-4 py-3 outline-none resize-none ${inputError(
                "message"
              )}`}
            />

            {errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#006064] to-[#00a6a6] hover:opacity-90 transition shadow-md disabled:opacity-50"
          >
            {loading
              ? "Sending..."
              : "Submit Request"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default PopupForm;