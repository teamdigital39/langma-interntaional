import React from "react";

function PopupForm({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* Form Box */}
      <div className="bg-gradient-to-br from-white to-slate-50 w-[90%] max-w-md rounded-2xl p-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-red-500 transition"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">
          Contact Us
        </h2>
        <p className="text-sm text-center text-gray-500 mb-5">
          We’ll get back to you shortly
        </p>

        {/* Form */}
        <form className="space-y-4">
          
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <textarea
            placeholder="Your Message"
            rows="3"
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white py-3 rounded-lg font-semibold
                       hover:from-blue-700 hover:to-indigo-700
                       transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupForm;
