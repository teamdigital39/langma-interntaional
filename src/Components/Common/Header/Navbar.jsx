import API_BASE from "../../../config.js";
import React, { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import PopupForm from "./PopupForm";

/* ══════════════════════════════════════════════════════════════════
   NAVBAR — Updated submenu & new nav items
   ══════════════════════════════════════════════════════════════════ */

const globalAssistLinks = [
  { label: "Cultural Infusion",        path: "/programs" },
  { label: "Langma Wellness Program",  path: "/global-assist" },
  { label: "Cultural Holidays",        path: "/holidays" },
  { label: "Business Exchange",        path: "/business_Programs" },
  { label: "Business Delegation",      path: "/business_delegation_programs" },
  { label: "PR by Investment",         path: "/investment" },
  { label: "Golden Visa",              path: "/global-assist" },
];

const Navbar = () => {
  const [showPopup, setShowPopup]   = useState(false);
  const [open, setOpen]             = useState(false);
  const [mobileDrop, setMobileDrop] = useState(null);
  const [languages, setLanguages]   = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/international-languages`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setLanguages(data.languages);
      })
      .catch((err) => console.log(err));
  }, []);

  const formatText = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  const closeMenu = () => setOpen(false);

  return (
    <>
      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}

      <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* ── LOGO ─────────────────────────────────────────── */}
            <Link to="/" className="shrink-0" onClick={closeMenu}>
              <img
                src="/images/Logo.png"
                alt="Langma International"
                className="h-10 sm:h-14 w-auto"
              />
            </Link>

            {/* ── DESKTOP NAV ───────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[14px] xl:text-[15px] font-medium text-[#4D5756]">

              <Link to="/" className="hover:text-teal-700 transition-colors duration-200">
                Home
              </Link>

              {/* International Languages dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-teal-700 transition-colors duration-200">
                  <Link to="/languages">International Languages</Link>
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute left-0 top-full mt-3 w-[420px] bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-4">
                  <ul className="grid grid-cols-3 gap-2">
                    {languages.map((lang) => (
                      <Link
                        key={lang.id}
                        to={`/${lang.url}`}
                        className="py-1 hover:text-teal-700 text-sm transition-colors duration-150"
                      >
                        {formatText(lang.title)}
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>

              <Link to="/study-abroad" className="hover:text-teal-700 transition-colors duration-200">
                Study Abroad
              </Link>

              <NavLink to="/work-abroad" className="hover:text-teal-700 transition-colors duration-200">
                Work Abroad
              </NavLink>

              {/* Global Assist dropdown — updated submenu */}
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-teal-700 transition-colors duration-200">
                  <Link to="/global-assist">Global Assist</Link>
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute left-0 top-full mt-3 w-56 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                  {globalAssistLinks.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="block px-4 py-2 hover:bg-gray-50 hover:text-teal-700 text-sm transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* ── New nav items ─────────────────────────────── */}
              <Link to="/events" className="hover:text-teal-700 transition-colors duration-200">
                Events
              </Link>

              <Link to="/certificate" className="hover:text-teal-700 transition-colors duration-200">
                Certificate
              </Link>

              <Link to="/contact" className="hover:text-teal-700 transition-colors duration-200">
                Contact
              </Link>

            </nav>

            {/* ── MOBILE MENU BUTTON ───────────────────────────── */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* ── MOBILE SIDEBAR OVERLAY ───────────────────────────────── */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
            open ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={closeMenu}
          />

          {/* Sidebar */}
          <div
            className={`absolute top-0 left-0 w-72 h-full bg-white shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar Header */}
            <div className="flex justify-between items-center p-5 border-b">
              <Link to="/" onClick={closeMenu}>
                <img src="/images/Logo.png" alt="logo" className="h-9" />
              </Link>
              <button
                onClick={closeMenu}
                className="hover:rotate-90 transition duration-300 p-1"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col p-5 text-[15px] text-[#4D5756]">

              <Link to="/" onClick={closeMenu} className="py-3 border-b hover:text-teal-700 transition">
                Home
              </Link>

              {/* Languages */}
              <button
                onClick={() => setMobileDrop(mobileDrop === "languages" ? null : "languages")}
                className="py-3 border-b flex justify-between items-center hover:text-teal-700 transition text-left w-full"
              >
                <Link to="/languages" onClick={closeMenu} className="hover:text-teal-700 transition">
                  International Languages
                </Link>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 shrink-0 ${mobileDrop === "languages" ? "rotate-180" : ""}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${mobileDrop === "languages" ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                <div className="grid grid-cols-2 gap-2 pl-2 pb-3 text-sm">
                  {languages.map((lang) => (
                    <Link key={lang.id} to={`/${lang.url}`} onClick={closeMenu} className="py-1 hover:text-teal-700">
                      {formatText(lang.title)}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/study-abroad" onClick={closeMenu} className="py-3 border-b hover:text-teal-700 transition">
                Study Abroad
              </Link>

              <Link to="/work-abroad" onClick={closeMenu} className="py-3 border-b hover:text-teal-700 transition">
                Work Abroad
              </Link>

              {/* Global Assist — updated submenu */}
              <button
                onClick={() => setMobileDrop(mobileDrop === "assist" ? null : "assist")}
                className="py-3 border-b flex justify-between items-center hover:text-teal-700 transition text-left w-full"
              >
                <Link to="/global-assist" onClick={closeMenu} className="hover:text-teal-700 transition">
                  Global Assist
                </Link>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 shrink-0 ${mobileDrop === "assist" ? "rotate-180" : ""}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${mobileDrop === "assist" ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                <div className="flex flex-col gap-3 pl-2 pb-3 text-sm">
                  {globalAssistLinks.map((item) => (
                    <Link key={item.label} to={item.path} onClick={closeMenu} className="py-1 hover:text-teal-700">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* New items */}
              <Link to="/events" onClick={closeMenu} className="py-3 border-b hover:text-teal-700 transition">
                Events
              </Link>

              <Link to="/certificate" onClick={closeMenu} className="py-3 border-b hover:text-teal-700 transition">
                Apply for Certificate
              </Link>

              <Link to="/contact" onClick={closeMenu} className="py-3 border-b hover:text-teal-700 transition">
                Contact Us
              </Link>

              <Link to="/blog" onClick={closeMenu} className="py-3 border-b hover:text-teal-700 transition">
                Blog
              </Link>

            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
