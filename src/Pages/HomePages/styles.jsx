import React, { useState, useEffect } from "react";

// ── Responsive breakpoints (shared) ──
export const BP = { mobile: 640, tablet: 900 };

/**
 * useMediaQuery — re-renders when the given media query match changes.
 * SSR-safe (returns false on the server) and cleans up its listener.
 * Usage: const isMobile = useMediaQuery(`(max-width:${BP.mobile}px)`);
 */
export const useMediaQuery = (query) => {
  const getMatch = () =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(query).matches
      : false;

  const [matches, setMatches] = useState(getMatch);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange(); // sync immediately in case the query changed
    // addEventListener is the modern API; addListener is the Safari/legacy fallback
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);

  return matches;
};

// ── Exact colors from the original JSX files ──
export const C = {
  // Primary teal palette (from original JSX)
  teal:       "#006064",
  tealHover:  "#17a398",
  tealLight:  "#2FC7A1",
  tealBorder: "#4EC7B8",
  tealDark:   "#296166",
  tealDeep:   "#2E7D7B",

  // Dark navy (from original JSX)
  navy:       "#0E2A46",
  navyDark:   "#0E1F3D",

  // Backgrounds (from original JSX)
  bgLight:    "#F7FAFC",
  bgMint:     "#E9F7F6",
  bgWhite:    "#ffffff",
  bgSoft:     "#F4FEFF",

  // Text
  body:       "#0E2A46",
};

export const F = {
  sans: "system-ui, -apple-system, sans-serif",
};

export const S = {
  radius: "22px",
  transition: ".25s cubic-bezier(.4,0,.2,1)",
};

// Reusable section header — teal eyebrow, navy heading, teal underline
export const SectionHeader = ({ eyebrow, title, body }) => (
  <div style={{ textAlign:"center", maxWidth:720, margin:"0 auto 60px" }}>
    <p style={{ fontFamily:F.sans, fontSize:".72rem", letterSpacing:".22em", textTransform:"uppercase", color:C.teal, marginBottom:8, fontWeight:600 }}>
      {eyebrow}
    </p>
    <h2 style={{ fontFamily:F.sans, fontSize:"clamp(1.9rem,4vw,2.8rem)", fontWeight:700, color:C.navyDark, lineHeight:1.2, margin:0 }}>
      {title}
    </h2>
    <div style={{ width:48, height:3, background:C.tealLight, margin:"14px auto 0", borderRadius:2 }} />
    {body && (
      <p style={{ fontFamily:F.sans, fontSize:"1.05rem", color:C.navy, marginTop:18, lineHeight:1.7 }}>
        {body}
      </p>
    )}
  </div>
);

// Card — white bg, teal border on hover, teal top sweep bar
export const Card = ({ children, style = {} }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.bgWhite,
        border: `1px solid ${hov ? C.tealLight : "rgba(47,199,161,.2)"}`,
        borderRadius: S.radius,
        padding: "32px",
        boxShadow: hov
          ? "0 8px 32px rgba(0,96,100,.12), 0 2px 8px rgba(0,96,100,.08)"
          : "0 2px 12px rgba(14,42,70,.06)",
        transform: hov ? "translateY(-6px)" : "none",
        transition: `transform ${S.transition}, box-shadow ${S.transition}, border-color ${S.transition}`,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* teal top sweep bar */}
      <div style={{
        position:"absolute", top:0, left:0, height:3,
        width: hov ? "100%" : "0%",
        background: `linear-gradient(90deg, ${C.teal}, ${C.tealLight})`,
        transition: `width .4s cubic-bezier(.4,0,.2,1)`,
        borderRadius: `${S.radius} ${S.radius} 0 0`,
      }} />
      {children}
    </div>
  );
};
