import { Phone } from "lucide-react";

function FloatingCallButton() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 group">

      <a
        href="tel:+919810117094"
        className="
          flex items-center
          bg-green-500
          hover:bg-green-600
          text-white
          shadow-2xl
          rounded-l-full
          overflow-hidden
          transition-all duration-300
        "
      >

        <span
          className="
            max-w-0
            group-hover:max-w-[200px]
            opacity-0
            group-hover:opacity-100
            whitespace-nowrap
            overflow-hidden
            transition-all duration-500
            px-0
            group-hover:px-4
            font-medium
          "
        >
          Call Us Now
        </span>

        <div className="p-4">
          <Phone size={24} />
        </div>

      </a>
    </div>
  );
}

export default FloatingCallButton;