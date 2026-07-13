import API_BASE from "../../config.js";
import React, { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

const RAZORPAY_KEY = "rzp_live_k1Q4kKwidvbaAl";
// const RAZORPAY_KEY = "rzp_test_yDPq1hOhTk89u8"; // test key from backend
const PRODUCT_ID = "1";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") : "";
};

function Payment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const validateName = (name) =>
    /^[A-Za-z\s]{2,}$/.test(name.trim());

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^[0-9]{10,15}$/.test(phone);

  const validateAmount = (amount) =>
    /^\d+(\.\d{1,2})?$/.test(amount) &&
    parseFloat(amount) > 0;

  const validateDescription = (description) =>
    description.trim().length >= 5;

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "phone") {
      updatedValue = value.replace(/\D/g, "");
    }

    if (name === "amount") {
      updatedValue = value.replace(/[^\d.]/g, "");
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

  const savePaymentToBackend = async (paymentId) => {
    const csrfToken = getCsrfToken();

    const response = await fetch(`${API_BASE}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(csrfToken && { "X-CSRF-TOKEN": csrfToken }),
      },
      credentials: "include",
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        amount: formData.amount,
        description: formData.description.trim(),
        product_id: PRODUCT_ID,
        payment_id: paymentId,
      }),
    });

    if (!response.ok && !response.redirected) {
      throw new Error("Payment save failed");
    }

    return response;
  };

  const openRazorpayCheckout = () => {
    const options = {
      key: RAZORPAY_KEY,
      amount: Math.round(parseFloat(formData.amount) * 100),
      currency: "INR",
      name: "Langma School of Languages",
      description: formData.description.trim(),
      image:
        "https://langmainternational.com/normal_images/1589034655.png",
      handler: async function (response) {
        try {
          await savePaymentToBackend(
            response.razorpay_payment_id
          );

          setIsSuccess(true);
          setResponseMsg(
            "Payment successful!"
          );

          setFormData({
            name: "",
            email: "",
            phone: "",
            amount: "",
            description: "",
          });

          setErrors({});

          setTimeout(() => {
            window.location.href = "/thank-you";
          }, 1500);
        } catch (error) {
          console.error(error);
          setIsSuccess(false);
          setResponseMsg(
            "Payment completed but saving failed. Please contact support."
          );
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        contact: formData.phone.trim(),
      },
      theme: {
        color: "#429198",
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.name.trim())
      validationErrors.name = "Name is required";
    else if (!validateName(formData.name))
      validationErrors.name = "Only alphabets allowed";

    if (!formData.phone.trim())
      validationErrors.phone = "Phone is required";
    else if (!validatePhone(formData.phone))
      validationErrors.phone =
        "Enter valid 10-15 digit number";

    if (!formData.email.trim())
      validationErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      validationErrors.email = "Invalid email address";

    if (!formData.amount.trim())
      validationErrors.amount = "Amount is required";
    else if (!validateAmount(formData.amount))
      validationErrors.amount =
        "Enter a valid amount greater than 0";

    if (!formData.description.trim())
      validationErrors.description =
        "Description is required";
    else if (
      !validateDescription(formData.description)
    )
      validationErrors.description =
        "Minimum 5 characters required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0)
      return;

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded || !window.Razorpay) {
      setIsSuccess(false);
      setResponseMsg(
        "Unable to load Razorpay. Please try again."
      );
      return;
    }

    try {
      setLoading(true);
      setResponseMsg("");
      openRazorpayCheckout();
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
      setResponseMsg(
        "Something went wrong. Please try again."
      );
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

            <form
              className="space-y-4"
              onSubmit={handleSubmit}
            >
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
                    onClick={() => setResponseMsg("")}
                  >
                    <FiX size={18} />
                  </button>
                </div>
              )}

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

              <div>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter Amount (INR)"
                  className={`w-full border rounded-md px-4 py-2 ${inputError(
                    "amount"
                  )}`}
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs">
                    {errors.amount}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  rows="3"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter payment description"
                  className={`w-full border rounded-md px-4 py-2 ${inputError(
                    "description"
                  )}`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#429198] text-white px-6 py-2 rounded-md w-full disabled:opacity-50"
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Payment;