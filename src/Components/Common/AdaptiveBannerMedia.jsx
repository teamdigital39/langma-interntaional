import React from "react";

const VIDEO_PATTERN = /\.(mp4|webm|mov|ogg)(\?|$)/i;

export function isVideoBannerUrl(url) {
  if (!url || typeof url !== "string") return false;
  return VIDEO_PATTERN.test(url) || /\/video\/upload\//i.test(url);
}

export default function AdaptiveBannerMedia({
  src,
  alt = "",
  className = "",
  fit = "cover",
  ...rest
}) {
  if (!src) return null;

  const isVideo = isVideoBannerUrl(src);
  const objectFit = fit === "contain" ? "object-contain" : "object-cover";
  const mediaClass = `block w-full h-auto max-w-full ${objectFit} ${className}`.trim();

  if (isVideo) {
    return (
      <video
        className={mediaClass}
        autoPlay
        muted
        loop
        playsInline
        {...rest}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={mediaClass}
      loading="lazy"
      {...rest}
    />
  );
}
