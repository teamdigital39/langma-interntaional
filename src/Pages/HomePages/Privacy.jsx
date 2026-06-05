import React, { useState } from 'react'

const policyData = [
  {
    title: "Use of Cookies",
    content: [
      "A cookie is a small piece of information stored by a web server on a web browser so it can be later read back from that browser.",
      "Cookies are useful for enabling the browser to remember information specific to a given user.",
      "We place both permanent and temporary cookies in your computer's hard drive. The cookies do not contain any personally identifiable information.",
      "Users can disable cookies through their browser settings if they prefer not to store them."
    ]
  },
  {
    title: "Website Visitor Tracking",
    content: [
      "This website uses tracking software to monitor visitors and better understand usage patterns.",
      "The software saves cookies to track engagement but does not collect personal information."
    ]
  },
  {
    title: "Downloads & Media Files",
    content: [
      "All downloadable files are provided at the user's own risk.",
      "We ensure files are safe, but users should verify using antivirus software.",
      "We are not responsible for third-party downloads or external links."
    ]
  },
  {
    title: "Contact & Communication With Us",
    content: [
      "Users contacting us do so at their own discretion.",
      "Personal information is stored securely and used only when necessary.",
      "With user consent, information may be used for communication or services."
    ]
  },
  {
    title: "Email Mailing List & Marketing Messages",
    content: [
      "We operate an email mailing list to share updates and services.",
      "Users subscribe with explicit permission.",
      "Subscribers can unsubscribe anytime through provided options.",
      "Emails may include tracking links to monitor engagement."
    ]
  },
  {
    title: "External Website Links & Third Parties",
    content: [
      "We include only safe and relevant external links.",
      "Users should verify shortened URLs before clicking.",
      "We are not responsible for external website content."
    ]
  },
  {
    title: "Social Media Policy & Usage",
    content: [
      "We maintain official social media profiles for communication.",
      "We never ask for passwords or sensitive information.",
      "Users should verify authenticity before interacting.",
      "Sharing content via social buttons is done at user discretion."
    ]
  }
];
function Privacy() {
  const [open, setOpen] = useState(false);
  return (
    <div>
       <section className="relative w-full overflow-hidden bg-[#F7FAFC]">
        <div className="w-full grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/prp.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 md:bottom-8 ml-5 md:ml-20">
              <button onClick={() => setOpen(!open)} className="cursor-pointer inline-flex items-center gap-2 bg-[#006064] text-white px-3 py-1 md:px-8 md:py-3 rounded-full text-sm font-medium hover:bg-[#17a398] transition shadow-lg">
                Let’s Connect →
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-10 px-4 bg-gray-100">
  <div className="max-w-5xl mx-auto space-y-8">

    {policyData.map((item, index) => (
      <div key={index} className="bg-white p-6 rounded-xl shadow-md">
        
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
          {item.title}
        </h2>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed ">
          {item.content}
        </p>

      </div>
    ))}

  </div>
</section>
    </div>
  )
}

export default Privacy
