import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function FloatingCallButton() {
  return (
    <>
      <div className="fixed bottom-6 left-5 z-50 group sm:left-6">
        <a
          href="https://wa.me/919810117094"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Langma on WhatsApp"
          title="Chat on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        >
          <FaWhatsapp size={28} aria-hidden="true" />
        </a>
        <span className="pointer-events-none absolute bottom-1/2 left-full ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-[#0E2A46] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:block group-hover:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
      </div>

      <div className="fixed bottom-6 right-5 z-50 group sm:right-6">
        <a
          href="tel:+919810117094"
          aria-label="Call Langma at +91 98101 17094"
          title="Call Langma"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#296166] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#1f4d52] focus:outline-none focus:ring-4 focus:ring-[#296166]/40"
        >
          <Phone size={25} aria-hidden="true" />
        </a>
        <span className="pointer-events-none absolute bottom-1/2 right-full mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-[#0E2A46] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:block group-hover:opacity-100 sm:block">
          Call Langma
        </span>
      </div>
    </>
  );
}

export default FloatingCallButton;
