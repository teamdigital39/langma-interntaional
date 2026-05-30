import React from 'react'
import ConnectedSection from './ConnectedSection'

function Voiceover() {
  return (
    <div>
       <div>
    <div
  className="w-full h-64 md:h-[550px] bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage: "url('/images/vo.jpg')",
  }}
>
</div>
      <ConnectedSection />
      <section className="">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-2xl md:text-[32px] capitalized font-bold text-[#296166] mb-4">
          VOICEOVER
        </h1>

        {/* Intro */}
        <p className="text-[#212529] text-[20px] mb-4 leading-relaxed">
         Are you looking to hire a voice-over service provider? Do you want your brand identity should shout aloud in a professional way? Good voice-over services help amplify the effectiveness of content, thus enhancing the overall impact of the marketing outrea
        </p>

        <p className="text-[#212529] text-[18px] mb-6 leading-relaxed">
          At Langma International, we are working with a team of professionally trained voice artists who can support us by providing professional quality recording, editing, mixing, and mastering services for our clients globally.
        </p>
        <p className="text-[#212529] text-[18px] mb-6 leading-relaxed">
          With years of experience in providing voice-over services, we make sure that your message is delivered to the target audience which enhances the brand exposure
        </p>
        <p className="text-[#212529] text-[18px] mb-6 leading-relaxed">
          Are you ready to discuss your next project with us? Do you require help in selecting the right voice tone for the script? Partner with Langma International for your voice-over service requirements and get ready to give a fresh boost to your business that it deserves! Need help selecting the right voice? Need help with creating an impactful video? Are you ready to tell us more about your project?
        </p>
       
      
        <h3 className="text-[32px] font-bold text-[#296166] mb-2">
          WHY CHOOSE US?
        </h3>
        <p className="text-[18px] text-[#212529] mb-6 leading-relaxed">
         Do you have a message that you want to spread to a global audience? Get the best voice-over services in different languages and get your brand message to speak louder than ever! We have the highest standards, the fastest process, and the best combination of the world’s most talented voice performers.
        </p>
        <p className="text-[18px] text-[#212529] mb-6 leading-relaxed">
         From business and commercial videos to the entertainment industry, voice-over services are now in demand. We clearly understand that only professional and talented voice-over artists are capable of producing a memorable and lively voice message that the audience can easily identify with!
        </p>
        <p className="text-[18px] text-[#212529] mb-6 leading-relaxed">
         Over the years, we have helped numerous clients and other production companies and studios, both domestic and overseas. As one of the foremost voice-over service providers, we are fully equipped and capable of handling any audio recording requirement, translation, documentary, video production, or multimedia project that you have entrusted to our care.
        </p>

    
        <div className="mb-6">
          <h2 className="text-[32px] font-bold text-[#296166] mb-2">
            FORMATS WE CAN PROOFREAD
          </h2>
          <p className="text-[#212529] text-[18px] leading-relaxed mb-2">We can proofread materials available in any kind of written document in most formats including Microsoft Word®, Excel, PowerPoint, Portable Document Files (PDF), and Rich Text Files (.rtf).</p>
        
        </div>

        {/* Services List */}
        <h3 className="text-[32px] text-[#296166] font-semibold mb-3">
          DIFFERENT TYPES OF VOICE-OVER SERVICES
        </h3>
     

        <div className="grid md:grid-cols-2 gap-6 text-[#212529] text-[18px]">
          <ul className="list-decimal pl-5 space-y-2">
            <li>Commercial Voice Overs</li>
            <li>Animation Voice Overs</li>
            <li>Corporate and Educational VoiceOvers</li>
            <li>AudioBook Voice Overs</li>
          
          </ul>

      
        </div>

      
         <p className="text-[#212529] text-[18px] leading-relaxed mb-2 mt-3">Are you looking for assistance in creating a voiceover for your project? Searching for a professional voice actor to help you in this regard? Contact us now and discuss with us more about your project. Our team is always available to assist you with all your voice recording needs. Get ready to turn your simple script into audio by hiring the finest voice-over artist!</p>
       
      </div>
    </section>
    </div>
    </div>
  )
}

export default Voiceover
