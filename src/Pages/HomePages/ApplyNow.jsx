import { useState } from "react";
import API_BASE from "../../config.js";

const initialForm = {
  name: "",
  email: "",
  mobile: "",
  language: "",
  message: "",
};

export default function ApplyNow() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setStatus({ type: "", message: "" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      const response = await fetch(`${API_BASE}/api/contact-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          mobile: form.mobile.replace(/\D/g, ""),
          service: "Language Course Application",
          type: "Apply Now",
          message: [
            `Language of interest: ${form.language.trim()}.`,
            form.message.trim(),
          ]
            .filter(Boolean)
            .join(" "),
          currenturl: window.location.href,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || "We could not submit your application. Please try again.");
      }

      setForm(initialForm);
      setStatus({
        type: "success",
        message: "Thank you. Your application enquiry has been submitted.",
      });
    } catch (error) {
      console.error("Application enquiry submission failed:", error);
      setStatus({
        type: "error",
        message: error.message || "We could not submit your application. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#296166] focus:ring-2 focus:ring-[#296166]/20";

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#173f43] px-5 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 font-semibold uppercase tracking-[0.2em] text-teal-200">
            Langma International
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Apply for a Language Course
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            Tell us what you would like to learn. Our team will contact you to
            discuss course levels, class formats, schedules, and your goals.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-slate-900">Start your application</h2>
            <p className="leading-relaxed text-slate-600">
              Complete the form and a course adviser will help you identify a
              suitable language programme. Submitting this form is an enquiry
              and does not commit you to enrolment.
            </p>
            <div className="rounded-xl border border-teal-100 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-[#296166]">What happens next?</h2>
              <p className="mt-2 leading-relaxed text-slate-600">
                We will review your learning goals and contact you using the
                details you provide to discuss available options.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            {status.message && (
              <p
                role="status"
                className={`rounded-lg p-4 ${
                  status.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {status.message}
              </p>
            )}
            <div>
              <label className="font-medium text-slate-800" htmlFor="apply-name">
                Full name
              </label>
              <input
                className={fieldClass}
                id="apply-name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={120}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-medium text-slate-800" htmlFor="apply-email">
                  Email
                </label>
                <input
                  className={fieldClass}
                  id="apply-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                />
              </div>
              <div>
                <label className="font-medium text-slate-800" htmlFor="apply-mobile">
                  Phone number
                </label>
                <input
                  className={fieldClass}
                  id="apply-mobile"
                  name="mobile"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  pattern="[0-9+() -]{10,20}"
                  value={form.mobile}
                  onChange={handleChange}
                  required
                  maxLength={20}
                />
              </div>
            </div>
            <div>
              <label className="font-medium text-slate-800" htmlFor="apply-language">
                Language you want to learn
              </label>
              <input
                className={fieldClass}
                id="apply-language"
                name="language"
                value={form.language}
                onChange={handleChange}
                placeholder="For example, German or Japanese"
                required
                maxLength={100}
              />
            </div>
            <div>
              <label className="font-medium text-slate-800" htmlFor="apply-message">
                Your goals or questions
              </label>
              <textarea
                className={fieldClass}
                id="apply-message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your learning goals, preferred format, or schedule."
                maxLength={2000}
              />
            </div>
            <button
              className="w-full rounded-lg bg-[#296166] px-6 py-3 font-semibold text-white transition hover:bg-[#1f4d51] disabled:cursor-wait disabled:opacity-60"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit application"}
            </button>
            <p className="text-sm leading-relaxed text-slate-500">
              Your information will be used to respond to this course enquiry.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
