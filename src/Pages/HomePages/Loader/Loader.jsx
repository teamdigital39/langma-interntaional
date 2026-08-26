import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <img
        src="/images/langma-logo.png?v=2"
        alt="Langma International"
        className="w-[240px] sm:w-[320px] md:w-[380px] h-auto object-contain bg-transparent animate-pulse"
      />
    </div>
  );
};

export default Loader;
