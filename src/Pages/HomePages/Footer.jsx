import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaYoutube, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer
      className="text-gray-300 mt-10 relative bg-cover bg-center bg-no-repeat bg-gray-900"
      style={{ backgroundImage: "url('/images/pngwing.com 2.png')" }}
    >

      {/* ── TOP CONTACT BAR ── */}
      <div className="border-b border-gray-700 px-4 sm:px-8 md:px-16 lg:px-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 py-4">

          {/* Address */}
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center border border-gray-600 rounded-full h-10 w-10 shrink-0">
              <FaMapMarkerAlt className="text-[#80CBC4] text-sm" />
            </span>
            <span className="text-xs sm:text-sm leading-snug">
              <strong className="text-[#80CBC4]">Address — </strong>
              E 73, South Extension Part-1,{" "}
              <span className="hidden sm:inline"><br /></span>
              New Delhi - 110049, India
            </span>
          </div>

          <div className="hidden sm:block border-l border-gray-700 h-14 mx-4" />

            {/* PHONE */}
            <a href="tel:+919810117094">
          <div className="flex items-center mb-3 md:mb-0">
            
            <span className="flex items-center justify-center border rounded-full h-[50px] w-[50px] mr-3">
              <FaPhone className="text-[#80CBC4] -rotate-263 transform" />
            </span>
            
            <span className="text-sm">+91-9810117094</span>
            
          </div>
          </a>

          <div className="hidden sm:block border-l border-gray-700 h-14 mx-4" />

          {/* Email */}
          <a href="mailto:info@langmainternational.com" className="flex items-center gap-3 hover:text-[#80CBC4] transition">
            <span className="flex items-center justify-center border border-gray-600 rounded-full h-10 w-10 shrink-0">
              <FaEnvelope className="text-[#80CBC4] text-sm" />
            </span>
            <span className="text-xs sm:text-sm">info@langmainternational.com</span>
          </a>

        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10
                      grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5
                      gap-x-4 gap-y-8 sm:gap-8">

        {/* 1 — Logo + About */}
        <div className="col-span-2 md:col-span-1">
          <img
            src="/images/Whitelogo.png"
            alt="Langma International"
            className="w-28 sm:w-32 mb-3"
          />
          <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
            At Langma we offer you a complete insight into the language and the
            culture. We provide tailored programmes which cater to the needs of
            all the learners.
          </p>
        </div>

        {/* 2 — Our Expertise */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-xs sm:text-sm uppercase tracking-wide">
            Our Expertise
          </h3>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm text-gray-400">
            <Link to="/" className="hover:text-[#80CBC4] transition">Home</Link>
            <Link to="/languages" className="hover:text-[#80CBC4] transition">International Languages</Link>
            <Link to="/study-abroad" className="hover:text-[#80CBC4] transition">Study Abroad</Link>
            <Link to="/work-abroad" className="hover:text-[#80CBC4] transition">Work Abroad</Link>
            <Link to="/global-assist" className="hover:text-[#80CBC4] transition">Global Assist</Link>
            <Link to="/events" className="hover:text-[#80CBC4] transition">Event</Link>
            <Link to="/certificate" className="hover:text-[#80CBC4] transition">Apply for Certificate</Link>
          </ul>
        </div>

        {/* 3 — Site Links */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-xs sm:text-sm uppercase tracking-wide">
            Site Links
          </h3>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm text-gray-400">
            <Link to="/investment" className="hover:text-[#80CBC4] transition">PR by Investment</Link>
            <Link to="/programs" className="hover:text-[#80CBC4] transition">Cultural Infusion Programs</Link>
            <Link to="/holidays" className="hover:text-[#80CBC4] transition">Cultural Holidays</Link>
            <Link to="/business_Programs" className="hover:text-[#80CBC4] transition">Business Exchange</Link>
            <Link to="/business_delegation_programs" className="hover:text-[#80CBC4] transition">Business Delegation</Link>
            <Link to="/lagmabusinesshub" className="hover:text-[#80CBC4] transition">Langma Business Hub</Link>
            <Link to="/payment" className="hover:text-[#80CBC4] transition">Pay Now</Link>
          </ul>
        </div>

        {/* 4 — Our Services */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-xs sm:text-sm uppercase tracking-wide">
            Our Services
          </h3>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm text-gray-400">
            <Link to="/transcription" className="hover:text-[#80CBC4] transition">Transcription</Link>
            <Link to="/translational" className="hover:text-[#80CBC4] transition">Translational</Link>
            <Link to="/localization" className="hover:text-[#80CBC4] transition">Localization Service</Link>
            <Link to="/multilanguage" className="hover:text-[#80CBC4] transition">Multilanguage DTP</Link>
            <Link to="/profreding" className="hover:text-[#80CBC4] transition">Proofreading</Link>
            <Link to="/voiceover" className="hover:text-[#80CBC4] transition">Voice Over Services</Link>
            <Link to="/content-writing" className="hover:text-[#80CBC4] transition">Content Writing</Link>
            <Link to="/dubbing" className="hover:text-[#80CBC4] transition">Dubbing</Link>
            <Link to="/subtitle" className="hover:text-[#80CBC4] transition">Subtitle</Link>
          </ul>
        </div>

        {/* 5 — Reach Us + Social */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-xs sm:text-sm uppercase tracking-wide">
            Reach Us
          </h3>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm text-gray-400 mb-5">
            <Link to="/career" className="hover:text-[#80CBC4] transition">Careers</Link>
            <Link to="/contact" className="hover:text-[#80CBC4] transition">Contact Us</Link>
            <Link to="/blog" className="hover:text-[#80CBC4] transition">Blog</Link>
            <Link to="/terms-and-conditions" className="hover:text-[#80CBC4] transition">Terms and condition</Link>
            <Link to="/privacy-policy" className="hover:text-[#80CBC4] transition">Privacy Policy</Link>
          </ul>

          {/* Social Icons */}
          <div className="flex flex-wrap gap-2">
            <a
              href="https://www.facebook.com/officiallangma"
              target="_blank" rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-[#80CBC4] transition"
              aria-label="Facebook"
            >
              <FaFacebookF size={13} />
            </a>
            <a
              href="https://www.instagram.com/officiallangma"
              target="_blank" rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-[#80CBC4] transition"
              aria-label="Instagram"
            >
              <FaInstagram size={13} />
            </a>
            <a
              href="https://www.youtube.com/@langmaInternational"
              target="_blank" rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-[#80CBC4] transition"
              aria-label="YouTube"
            >
              <FaYoutube size={13} />
            </a>
            <a
              href="https://x.com/official_langma"
              target="_blank" rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-[#80CBC4] transition"
              aria-label="X / Twitter"
            >
              <FaXTwitter size={13} />
            </a>
            <a
              href="https://www.linkedin.com/school/langma-international"
              target="_blank" rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-[#80CBC4] transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={13} />
            </a>
          </div>
        </div>

      </div>

      {/* ── COPYRIGHT ── */}
      <div className="border-t border-gray-800 bg-gray-900 bg-opacity-80 text-center py-3 text-xs sm:text-sm text-gray-500">
        Copyrights © 2026, Langma International
      </div>

    </footer>
  );
};

export default Footer;