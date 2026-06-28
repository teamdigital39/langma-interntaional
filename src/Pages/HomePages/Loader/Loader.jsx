import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <img
        src="/images/Logo.png"
        alt="Langma International"
        className="w-[200px] sm:w-[260px] md:w-[300px] h-auto object-contain animate-pulse"
      />
    </div>
  );
};

export default Loader;
