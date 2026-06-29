import React, { useState, useEffect } from "react";
// import PopupForm from "../PopupForm";
import PopularCourses from "../../Pages/HomePages/PopularCourses";
import WhyLearnSection from "./WhyLearnSection";
import WhyChooseLangmaSection from "./WhyChooseLangmaSection";
import DifferentiatorSection from "./DifferentiatorSection";
import PathwaysSection from "./PathwaysSection";
import FormatsSection from "./FormatsSection";
import WhoWeServeSection from "./WhoWeServeSection";
import AssessmentBand from "./AssessmentBand";
import CounselSection from "./CounselSection";
import FAQSection from "./FAQSection";
import FinalCTASection from "./FinalCTASection";
import { useMediaQuery, BP } from "./styles.jsx";
import PopupForm from "./PopupForm.jsx";
import API_BASE from "../../config.js";

/* ── inline styles ── */
const S = {
  ink:      "#dae6e9",
  ink2:     "#000102",
  ink3:     "#1d3158",
  gold:     "#20c7bf",
  goldDeep: "#17a398",
  goldSoft: "#2FC7A1",
  paper:    "#000000",
  tr:       "0.28s cubic-bezier(0.4,0,0.2,1)",
};

const InternationalHeroSection = () => {
  const [open, setOpen] = useState(false);
  const [languages, setLanguages] = useState(null);
  const [loadError, setLoadError] = useState(false);

  // Responsive flags
  const isMobile = useMediaQuery(`(max-width:${BP.mobile}px)`);
  const isTablet = useMediaQuery(`(max-width:${BP.tablet}px)`);

  useEffect(() => {
    const controller = new AbortController();

    const fetchLanguages = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/home`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (data?.status && Array.isArray(data.languages) && data.languages.length) {
          setLanguages(data.languages);
          setLoadError(false);
          return;
        }
        throw new Error("No languages in response");
      } catch (error) {
        if (error.name === "AbortError") return;
        console.warn("Languages API error:", error);
        setLanguages([]);
        setLoadError(true);
      }
    };

    fetchLanguages();
    return () => controller.abort(); // cancel in-flight request on unmount
  }, []);

  return (
    <>
      {/* ────────────────────────────────────────────
          HERO — image stacks below text on small screens
      ──────────────────────────────────────────── */}
      <header style={{
        background: S.ink,
        minHeight: isMobile ? "auto" : "92vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: isMobile ? "84px 18px 56px" : "100px 26px 80px",
      }}>

        {/* Greeting ribbon */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0,
          background: "rgba(47,199,161,.08)",
          borderBottom: "1px solid rgba(47,199,161,.18)",
          overflow: "hidden", whiteSpace: "nowrap",
          height: 36, display: "flex", alignItems: "center",
        }}>
          <style>{`@keyframes lm-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
          <div style={{
            display: "inline-flex", gap: 48,
            animation: "lm-marquee 30s linear infinite",
            fontFamily: "'Spline Sans Mono',monospace",
            fontSize: ".72rem", letterSpacing: ".12em",
            color: "#05494a", opacity: 0.9,
          }}>
            Bonjour &nbsp;·&nbsp; こんにちは &nbsp;·&nbsp; 你好 &nbsp;·&nbsp; مرحبا &nbsp;·&nbsp; Hola &nbsp;·&nbsp; Namaste &nbsp;·&nbsp; Ciao &nbsp;·&nbsp; Guten Tag &nbsp;·&nbsp; Annyeonghaseyo &nbsp;·&nbsp; Olá &nbsp;·&nbsp; Привет &nbsp;·&nbsp; สวัสดี &nbsp;·&nbsp; Xin chào &nbsp;·&nbsp; Sawubona &nbsp;·&nbsp; Merhaba &nbsp;·&nbsp; Bonjour &nbsp;·&nbsp; こんにちは &nbsp;·&nbsp; 你好 &nbsp;·&nbsp; مرحبا &nbsp;·&nbsp; Hola &nbsp;·&nbsp; Namaste &nbsp;·&nbsp; Ciao &nbsp;·&nbsp; Guten Tag &nbsp;·&nbsp; Annyeonghaseyo &nbsp;·&nbsp; Olá &nbsp;·&nbsp; Привет &nbsp;·&nbsp; สวัสดี &nbsp;·&nbsp; Xin chào &nbsp;·&nbsp; Sawubona &nbsp;·&nbsp; Merhaba &nbsp;·&nbsp;
          </div>
        </div>

        {/* Meridian rings */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          pointerEvents: "none", overflow: "hidden", opacity: 0.07,
        }}>
          <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice"
            style={{ width: "100%", height: "100%" }}>
            <circle cx="900" cy="350" r="320" fill="none" stroke="#2FC7A1" strokeWidth=".8"/>
            <circle cx="900" cy="350" r="240" fill="none" stroke="#2FC7A1" strokeWidth=".6"/>
            <circle cx="900" cy="350" r="160" fill="none" stroke="#2FC7A1" strokeWidth=".5"/>
            <ellipse cx="900" cy="350" rx="320" ry="120" fill="none" stroke="#2FC7A1" strokeWidth=".5"/>
            <line x1="580" y1="350" x2="1220" y2="350" stroke="#2FC7A1" strokeWidth=".5"/>
            <line x1="900" y1="30"  x2="900"  y2="670"  stroke="#2FC7A1" strokeWidth=".5"/>
          </svg>
        </div>

        {/* Hero content */}
        <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
            gap: isMobile ? 36 : 60,
            alignItems: "center",
          }}>

            {/* ── LEFT: text ── */}
            <div>
              <p style={{
                fontFamily: "'Spline Sans Mono',monospace",
                fontSize: ".72rem", letterSpacing: ".22em",
                textTransform: "uppercase", color: S.gold,
                marginBottom: 20,
              }}>
                Established 2012 · New Delhi &amp; Online Worldwide
              </p>

              <h1 style={{
                fontFamily: "'Fraunces',Georgia,serif",
                fontSize: "clamp(2.2rem,6vw,4.7rem)",
                fontWeight: 700, color: S.paper,
                lineHeight: 1.15, marginBottom: 18,
              }}>
                Language Skills for a{" "}
                <em style={{ color: S.gold, fontStyle: "italic" }}>Borderless Future</em>
              </h1>

              <p style={{
                fontSize: isMobile ? "1.02rem" : "1.15rem", color: "rgba(0, 0, 0, 0.78)",
                marginBottom: 32, maxWidth: 520, lineHeight: 1.7,
                fontFamily: "'Hanken Grotesk',system-ui,sans-serif",
              }}>
                Train in 50+ languages with expert instructors at Langma International.
                Built for students, working professionals, corporations, diplomatic missions,
                and global mobility aspirants with a programme designed around your goal.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 44 }}>
                <a href="#counsel"
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "14px 32px", borderRadius: 100,
                    fontFamily: "'Hanken Grotesk',system-ui,sans-serif",
                    fontWeight: 600, fontSize: ".95rem", textDecoration: "none",
                    background: S.gold, color: S.ink,
                    boxShadow: "0 2px 16px rgba(47,199,161,.28)",
                    transition: `background ${S.tr}, transform ${S.tr}`,
                    flex: isMobile ? "1 1 100%" : "0 0 auto",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = S.goldDeep; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = S.gold;     e.currentTarget.style.transform = "none"; }}
                >
                  Book a Free Consultation
                </a>
                <button
                  onClick={() => setOpen(true)}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "14px 32px", borderRadius: 100,
                    fontFamily: "'Hanken Grotesk',system-ui,sans-serif",
                    fontWeight: 600, fontSize: ".95rem",
                    background: "transparent", color: S.goldSoft,
                    border: "1.5px solid rgba(244,241,233,.3)",
                    cursor: "pointer",
                    transition: `border-color ${S.tr}, color ${S.tr}, transform ${S.tr}`,
                    flex: isMobile ? "1 1 100%" : "0 0 auto",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = S.gold; e.currentTarget.style.color = S.gold; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(244,241,233,.3)"; e.currentTarget.style.color = S.goldSoft; e.currentTarget.style.transform = "none"; }}
                >
                  Let's Connect →
                </button>
              </div>

              {/* Trust bar */}
              <div style={{
                display: "flex", gap: isMobile ? 20 : 32, flexWrap: "wrap",
                borderTop: "1px solid rgba(47,199,161,.22)", paddingTop: 28,
              }}>
                {[
                  ["50+", "Global Languages Taught"],
                  ["12+", "Years of International Training"],
                  ["10+", "Distinct Learner Programmes"],
                ].map(([num, label]) => (
                  <div key={num} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      fontFamily: "'Fraunces',Georgia,serif",
                      fontSize: "1.6rem", fontWeight: 700, color: S.gold, lineHeight: 1,
                    }}>{num}</div>
                    <div style={{
                      fontSize: ".82rem", color: "rgb(0, 0, 0)",
                      lineHeight: 1.3, maxWidth: 80,
                      fontFamily: "'Hanken Grotesk',system-ui,sans-serif",
                    }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: banner image ── */}
            <div style={{
              position: "relative",
              borderRadius: 22,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,.35)",
              aspectRatio: isMobile ? "16/10" : "4/3",
              order: isTablet ? -1 : 0,          // image above text when stacked
              maxWidth: isTablet ? 520 : "none", // keep it from getting huge when stacked
              width: "100%",
              margin: isTablet ? "0 auto" : 0,
            }}>
              <img
                src="/images/lngway.jpeg"
                alt="Langma International — language learning"
                loading="lazy"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                }}
              />
              {/* Gold overlay tint at bottom */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
                background: "linear-gradient(to top, rgba(13,27,51,.5), transparent)",
                pointerEvents: "none",
              }} />
            </div>

          </div>
        </div>
      </header>

      {/* ────────────────────────────────────────────
          POPULAR COURSES — API driven
      ──────────────────────────────────────────── */}
      <PopularCourses data={languages} loading={languages === null} error={loadError} />

      {/* ────────────────────────────────────────────
          ALL HTML SECTIONS
      ──────────────────────────────────────────── */}
      <WhyLearnSection />
      <WhyChooseLangmaSection />
      <DifferentiatorSection />
      <PathwaysSection />
      <FormatsSection />
      <WhoWeServeSection />
      <AssessmentBand />
      <CounselSection />
      <FAQSection />
      <FinalCTASection />

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/919810117094"
        target="_blank" rel="noopener"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: isMobile ? 16 : 28,
          right: isMobile ? 16 : 28,
          zIndex: 200,
          width: isMobile ? 50 : 56,
          height: isMobile ? 50 : 56,
          borderRadius: "50%",
          background: "#25D366", display: "flex",
          alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,.4)",
          textDecoration: "none",
          transition: `transform ${S.tr}`,
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <svg width={isMobile ? 25 : 28} height={isMobile ? 25 : 28} viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.854L.054 23.25a.75.75 0 00.931.931l5.395-1.478A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.72 9.72 0 01-4.962-1.358l-.355-.214-3.685 1.008 1.009-3.688-.222-.362A9.718 9.718 0 012.25 12C2.25 6.616 6.616 2.25 12 2.25S21.75 6.616 21.75 12 17.384 21.75 12 21.75z" />
        </svg>
      </a>

      {/* <PopupForm open={open} onClose={() => setOpen(false)} /> */}
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default InternationalHeroSection;
