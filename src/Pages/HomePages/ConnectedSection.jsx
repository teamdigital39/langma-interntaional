import React, { useState } from "react";
import {
  FiChevronDown,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

const ConnectedSection = () => {
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

    let updatedValue = value;

    if (name === "phone") {
      updatedValue = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // INPUT ERROR CLASS
  const inputError = (field) =>
    errors[field] ? "border-red-500" : "border-gray-200";

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.name)
      validationErrors.name = "Name is required";
    else if (!validateName(formData.name))
      validationErrors.name = "Only alphabets allowed";

    if (!formData.phone)
      validationErrors.phone = "Phone is required";
    else if (!validatePhone(formData.phone))
      validationErrors.phone = "Enter valid number";

    if (!formData.email)
      validationErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      validationErrors.email = "Invalid email";

    if (!formData.service)
      validationErrors.service = "Please select service";

    if (formData.service === "Language Training" && !formData.language) {
      validationErrors.language = "Please select language";
    }

    if (!formData.message)
      validationErrors.message = "Message is required";
    else if (!validateMessage(formData.message))
      validationErrors.message = "Minimum 5 characters";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      setResponseMsg("");
      setIsSuccess(false);

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.phone.trim(),
        message: formData.message.trim(),
        type: "General Inquiry",
        service:
          formData.service === "Language Training"
            ? `Language Training - ${formData.language}`
            : formData.service,
      };

      console.log("Payload:", payload);

      const response = await fetch(
        "/api/contact-lead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const text = await response.text();
      console.log("Raw Response:", text);

      let data = {};
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.log("JSON Parse Error", error);
      }

      if (response.status === 200 || response.status === 201) {
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

        setTimeout(() => {
          setResponseMsg("");
        }, 3000);
      } else {
        setIsSuccess(false);
        setResponseMsg(data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setIsSuccess(false);
      setResponseMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-8 sm:py-16 flex justify-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* FORM */}
        <div className="relative mx-auto w-full max-w-xl rounded-[30px] sm:rounded-[40px] shadow-sm overflow-hidden p-5 sm:p-10">

          {/* BACKGROUND */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/Group 4568.png"
              className="w-full h-full"
              alt="bg"
            />
          </div>

          <div className="relative z-10">
            <h2 className="text-[18px] lg:text-[32px] font-semibold text-center text-[#296166]">
              Let's Get Connected
            </h2>

            <p className="text-center text-[15px] lg:text-sm text-[#212529] mb-8">
              We're Here to Help You Better
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* RESPONSE */}
              {responseMsg && (
                <div
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    isSuccess
                      ? "bg-green-100 border border-green-200 text-green-800"
                      : "bg-red-100 border border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isSuccess ? <FiCheckCircle /> : <FiAlertCircle />}
                    <span className="text-sm">{responseMsg}</span>
                  </div>

                  <button type="button" onClick={() => setResponseMsg("")}>
                    <FiX />
                  </button>
                </div>
              )}

              {/* NAME */}
              <div>
                <div className="relative">
                  <img
                    src="/images/user.png"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    alt="user"
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className={`w-full border rounded-xl px-4 py-3 pl-12 outline-none ${inputError("name")}`}
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    alt="call"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={`w-full border rounded-xl px-4 py-3 pl-12 outline-none ${inputError("phone")}`}
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    alt="mail"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={`w-full border rounded-xl px-4 py-3 pl-12 outline-none ${inputError("email")}`}
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    alt="service"
                  />
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-3 pl-12 pr-12 appearance-none bg-white outline-none ${inputError("service")} ${
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                      alt="language"
                    />
                    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 pl-12 pr-12 appearance-none bg-white outline-none ${inputError("language")} ${
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
                    className="absolute left-4 top-4 w-5 h-5"
                    alt="message"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe Your Requirement"
                    className={`w-full border rounded-xl px-4 py-3 pl-12 outline-none ${inputError("message")}`}
                  />
                </div>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-gradient-to-r from-[#8ED1C7] to-[#0B6B6B] text-white py-3 rounded-xl font-medium hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit"}
              </button>

            </form>
          </div>
        </div>

        {/* MAP */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28031.329268921574!2d77.21551577207947!3d28.572280247767537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce25dba89c087%3A0x6b74c7356d18b11a!2sLangma%20International!5e0!3m2!1sen!2sin!4v1777973591787!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Langma Location"
          />
        </div>
      </div>
    </section>
  );
};

export default ConnectedSection;