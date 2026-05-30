import API_BASE from "../../config.js";
import React, { useState } from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

function Payment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
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
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );

  const validatePhone = (phone) =>
    /^[0-9]{10,15}$/.test(phone);

  const validateMessage = (message) =>
    message.trim().length >= 5;

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "phone") {
      updatedValue = value.replace(
        /\D/g,
        ""
      );
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

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.name.trim())
      validationErrors.name =
        "Name is required";
    else if (
      !validateName(formData.name)
    )
      validationErrors.name =
        "Only alphabets allowed";

    if (!formData.phone.trim())
      validationErrors.phone =
        "Phone is required";
    else if (
      !validatePhone(formData.phone)
    )
      validationErrors.phone =
        "Enter valid 10-15 digit number";

    if (!formData.email.trim())
      validationErrors.email =
        "Email is required";
    else if (
      !validateEmail(formData.email)
    )
      validationErrors.email =
        "Invalid email address";

    if (!formData.service.trim())
      validationErrors.service =
        "Please enter payment";

    if (!formData.message.trim())
      validationErrors.message =
        "Message is required";
    else if (
      !validateMessage(formData.message)
    )
      validationErrors.message =
        "Minimum 5 characters required";

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
        type: "Payment Inquiry",
        service:
          formData.service || "Payment",
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
          "Form submitted successfully!"
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });

        setErrors({});

        setTimeout(() => {
          setResponseMsg("");
        }, 3000);
      } else {
        setIsSuccess(false);

        setResponseMsg(
          data.message ||
            "Submission failed. Please try again."
        );
      }
    } catch (error) {
      console.error(error);

      setIsSuccess(false);

      setResponseMsg(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputError = (field) =>
    errors[field]
      ? "border-red-500"
      : "border-gray-300";

  return (
    <div>
      <section className="w-full bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* QR SECTION */}
            <div className="flex justify-center">
              <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                <div className="text-center mb-3">
                  <p className="text-sm font-semibold text-purple-600">
                    All in One QR
                  </p>

                  <p className="text-xs text-gray-500">
                    UPI, GPay, Paytm
                  </p>
                </div>

                <img
                  src="/images/qr.png"
                  alt="QR Code"
                  className="w-64 h-64 object-contain mx-auto"
                />
              </div>
            </div>

            {/* FORM */}
            <form
              className="space-y-4"
              onSubmit={handleSubmit}
            >

              {/* ALERT */}
              {responseMsg && (
                <div
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    isSuccess
                      ? "bg-green-100 border border-green-200 text-green-800"
                      : "bg-red-100 border border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isSuccess ? (
                      <FiCheckCircle size={20} />
                    ) : (
                      <FiAlertCircle size={20} />
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

              {/* NAME */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  className={`w-full border rounded-md px-4 py-2 ${inputError(
                    "name"
                  )}`}
                />

                {errors.name && (
                  <p className="text-red-500 text-xs">
                    {errors.name}
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
                  placeholder="Enter Email"
                  className={`w-full border rounded-md px-4 py-2 ${inputError(
                    "email"
                  )}`}
                />

                {errors.email && (
                  <p className="text-red-500 text-xs">
                    {errors.email}
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
                  placeholder="Enter Contact Number"
                  className={`w-full border rounded-md px-4 py-2 ${inputError(
                    "phone"
                  )}`}
                />

                {errors.phone && (
                  <p className="text-red-500 text-xs">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* PAYMENT / SERVICE */}
              <div>
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="Enter Payment"
                  className={`w-full border rounded-md px-4 py-2 ${inputError(
                    "service"
                  )}`}
                />

                {errors.service && (
                  <p className="text-red-500 text-xs">
                    {errors.service}
                  </p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <textarea
                  rows="3"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message"
                  className={`w-full border rounded-md px-4 py-2 ${inputError(
                    "message"
                  )}`}
                />

                {errors.message && (
                  <p className="text-red-500 text-xs">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#429198] text-white px-6 py-2 rounded-md w-full disabled:opacity-50"
              >
                {loading
                  ? "Submitting..."
                  : "Submit"}
              </button>

            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Payment;