import Navbar from "./Navbar";
import "../../../../src/index.css";

export default function TopBar() {
  return (
    <>
      <div className="w-full bg-[#429198] text-white text-xs sm:text-sm py-3 sm:py-2">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex items-center justify-between">

            {/* Left - Welcome (desktop only) */}
            <p className="hidden sm:block whitespace-nowrap">
              Welcome To Langma International
            </p>

            {/* Right side (Phone + Email always in same row) */}
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">

              {/* Phone */}
              <div className="flex items-center gap-2">
               <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-4 h-4 shrink-0"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M22 16.92v3a2 2 0 0 1-2.18 2 
       19.79 19.79 0 0 1-8.63-3.07 
       19.5 19.5 0 0 1-6-6 
       19.79 19.79 0 0 1-3.07-8.67 
       A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 
       c.12.86.31 1.7.57 2.5a2 2 0 0 1-.45 2.11L8.09 9.91 
       a16 16 0 0 0 6 6l1.58-1.58a2 2 0 0 1 2.11-.45 
       c.8.26 1.64.45 2.5.57A2 2 0 0 1 22 16.92z"
  />
</svg>

                <a href="tel:+919810117094" className="whitespace-nowrap text-[10px] md:text-[14px]">
                  +91-9810117094
                </a>
              </div>

              {/* Divider */}
              <span className="text-white/60">|</span>

              {/* Email */}
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <a
                  href="mailto:info@langmainternational.com"
                  className="whitespace-nowrap text-[10px] md:text-[14px]"
                >
                  info@langmainternational.com
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      <Navbar />
    </>
  );
}