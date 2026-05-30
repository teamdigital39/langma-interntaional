import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <div className="w-12 h-12 border-4 border-[#80CBC4] border-t-[#296166] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;3