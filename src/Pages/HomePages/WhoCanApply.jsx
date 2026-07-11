import React, { useState } from "react";
import ConsultationForm from "./Form2";

const WhoCanApply = () => {
  const [formData, setFormData] = useState({
    fname: "", lname: "", email: "", phone: "", progInterest: "", message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* ── MEETING / CONSULTATION SECTION ── */}
      <section className="w-full py-20 bg-[#F5F8F6] border-t border-[#D8E0EC]/60" id="meeting">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-[12px] font-bold tracking-[2.5px] uppercase text-[#2FC7A1] mb-3">Book a Consultation</p>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#296166] leading-tight mb-4">
              One Conversation. Clear Direction. Tailored to You.
            </h2>
            <div className="w-12 h-0.5 bg-[#2FC7A1] mb-6" />
            <p className="text-gray-600 text-[16px] leading-relaxed mb-8">
              A confidential, no-obligation discussion with a senior adviser. We listen first, set out the
              realistic options aligned with your profile and provide a structured preliminary view of the
              pathways that genuinely fit your circumstances.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Discuss your residency objectives and family situation",
                "Compare residency pathways suited to your profile",
                "Understand realistic costs, timelines and eligibility",
                "Receive a tailored preliminary eligibility view",
                "Get structured guidance on documentation",
                "Understand tax, FEMA and relocation considerations",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[16px] text-[#1B2B28] leading-relaxed">
                  <span className="text-[#2FC7A1] font-bold flex-shrink-0 mt-0.5">✔</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="#meeting-form" className="flex flex-col bg-white border border-[#D8E0EC] hover:border-[#2FC7A1] hover:shadow-md rounded-xl p-6 transition-all">
                <span className="text-[28px] mb-3">💻</span>
                <span className="font-semibold text-[16px] text-[#296166] mb-1">Online Consultation</span>
                <span className="text-[14px] text-gray-500 leading-relaxed">Video call with a senior adviser — flexible scheduling, any time zone.</span>
              </a>
              <a href="#office" className="flex flex-col bg-white border border-[#D8E0EC] hover:border-[#2FC7A1] hover:shadow-md rounded-xl p-6 transition-all">
                <span className="text-[28px] mb-3">🏢</span>
                <span className="font-semibold text-[16px] text-[#296166] mb-1">Office Visit</span>
                <span className="text-[14px] text-gray-500 leading-relaxed">Meet us in person at our New Delhi office, South Extension I.</span>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <ConsultationForm />
        </div>
      </section>

      {/* ── OFFICE VISIT ── */}
      <section className="w-full py-20 bg-white" id="office">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[12px] font-bold tracking-[2.5px] uppercase text-[#2FC7A1] mb-3">Our Office</p>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#296166] leading-tight mb-4">
              Meet Our Advisers in Person
            </h2>
            <div className="w-12 h-0.5 bg-[#2FC7A1] mb-5" />
            <p className="text-[#1B2B28] text-[16px] leading-relaxed mb-8">
              Visit our New Delhi office for a dedicated, in-person conversation. Decisions of this nature
              are best made face to face, with time, discretion and complete information.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: "📍", label: "Address", value: "E-73 Part 1, South Extension I\nBlock E, New Delhi, Delhi 110049\nIndia" },
                { icon: "📞", label: "Phone", value: "+91 98101 17094", href: "tel:+919810117094" },
                { icon: "🕙", label: "Office Hours", value: "Monday – Saturday: 10:00 AM – 6:00 PM IST" },
                { icon: "💬", label: "WhatsApp", value: "+91 98101 17094", href: "https://wa.me/919810117094" },
              ].map((detail, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-11 h-11 flex-shrink-0 bg-[#2FC7A1]/10 border border-[#2FC7A1]/30 rounded-xl flex items-center justify-center text-[18px]">
                    {detail.icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-1">{detail.label}</div>
                    {detail.href ? (
                      <a href={detail.href} className="text-[#296166] font-semibold text-[16px] hover:text-[#2F6E73] transition-colors whitespace-pre-line">
                        {detail.value}
                      </a>
                    ) : (
                      <div className="text-[#1B2B28] text-[16px] whitespace-pre-line leading-relaxed">{detail.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#meeting-form" className="inline-flex items-center gap-2 bg-[#2F6E73] hover:bg-[#296166] text-white px-6 py-3 rounded-lg font-semibold text-[14px] transition-all hover:-translate-y-0.5 hover:shadow-lg">
                Book an Office Meeting
              </a>
              <a href="https://wa.me/919810117094?text=Hello%2C%20I%20would%20like%20to%20book%20an%20office%20visit."
                className="inline-flex items-center gap-2 border-2 border-[#296166] text-[#296166] hover:bg-[#296166] hover:text-white px-6 py-3 rounded-lg font-semibold text-[14px] transition-all">
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-gray-100 h-[360px] shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.3!2d77.2178!3d28.5758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzMyLjkiTiA3N8KwMTMnMDQuMSJF!5e0!3m2!1sen!2sin!4v1700000000000"
              title="Langma International New Delhi Office Location"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default WhoCanApply;
