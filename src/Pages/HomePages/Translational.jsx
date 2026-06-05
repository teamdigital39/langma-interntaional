import React from 'react'
import ConnectedSection from './ConnectedSection'

function Translational() {
  return (
    <div>
    <div
  className="w-full h-64 md:h-[550px] bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage: "url('/images/trl.jpg')",
  }}
>
</div>
      <ConnectedSection/>
      <section className="">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-2xl md:text-[32px] font-bold text-[#296166] mb-4">
          TRANSCRIPTION
        </h2>

        {/* Intro */}
        <p className="text-[#212529] text-[20px] mb-4 leading-relaxed">
         Langma International in India is a full-service translation company that specializes in offering a wide range of linguistic solutions for our clients globally. We stand ahead of our competitors by providing accurate and complete professional translation services with the most reasonable rates in the industry.
        </p>
{/* 
        <p className="text-[#212529] text-[18px] mb-6 leading-relaxed">
          Our transcription work is designed to provide accurate transcription
          and translation solutions for students, writers, and businesses.
          Whether you need verbatim transcription or summarized content, we
          ensure high-quality results.
        </p> */}

        {/* Important Services */}
        <h3 className="text-[32px] font-bold text-[#296166] mb-2">
          WHAT DO WE DO?
        </h3>
        <p className="text-[18px] text-[#212529] mb-6 leading-relaxed">
         With a team of professionally trained linguistic experts, our company is well equipped and qualified to deliver the best translation services on time which meet the highest quality standards. Our areas of translation services include:
        </p>

        {/* Highlight Box */}
        <div className="mb-6">
          <h2 className="text-[32px] font-bold text-[#296166] mb-2">
            HOW DO WE DO?
          </h2>
          <p className="text-[#212529] text-[18px] leading-relaxed mb-2">Being a certified translation company we specialize in offering translation services for all companies of various sizes. By covering more than 150+ languages of translation services, we serve clients worldwide. We extend our high-quality translation services to small, medium, and large-sized enterprises to get their documents translated into a local language or any other understandable language.</p>
          <p className="text-[#212529] text-[18px] leading-relaxed mb-2">Our team has hands-on experience and a professional approach to assisting clients from many countries including – Saudi Arabia, Germany, and Dubai, and also clients from other European & Asian Countries. We have done a lot of translation for our clients and our success portfolio includes translation work from – English to Arabic, German, French, Hindi, Urdu, etc.</p>
          <p className="text-[#212529] text-[18px] leading-relaxed mb-2">To provide the best translation services for you, we work with a team of multi-tiered quality assurance to ensure that each of our translated content is up to the mark and to assure that it will meet the client's expectations and industry standards. From the start of the initial project assessment to proofreading and editing, our team is committed to delivering the best-personalized course.</p>
          <p className="text-[#212529] text-[18px] leading-relaxed mb-2">If you want your content to be translated by a fluent, native speaker then get in touch with Langma International today. We work with a team of highly capable and professional linguistic experts, who specialize in translating content in any format.</p>
          <p className="text-[#212529] text-[18px] leading-relaxed mb-2">With us, you can be sure of honest and transparent service, no matter the type, or scope of your requirements. For more information about our services, please feel free to contact us today. We have a team of dedicated customer support people who are ready to answer your questions.</p>
        </div>

        {/* Services List */}
        <h3 className="text-[32px] text-[#296166] font-semibold mb-3">
          TRANSLATION SERVICES
        </h3>
        {/* <p className='text-[18px] text-[#212529] mb-4'>To provide the best transcription service, we accept all types of materials including audio and video of varying sizes. We provide
transcription services for</p> */}

        <div className="grid md:grid-cols-2 gap-6 text-[#212529] text-[18px]">
          <ul className="list-decimal pl-5 space-y-2">
            <li>Marketing Translation</li>
            <li>Medical Translation</li>
            <li>Legal Translation Services</li>
            <li>Technical Translation Services</li>
            <li>Commercial Translation</li>
            <li>Translation of Financial Statements</li>
            <li>English to Arabic Translation</li>
          </ul>

          {/* <ul className="list-decimal pl-5 space-y-2">
            <li>Conference Call Transcription Services</li>
            <li>Video to Text Transcription Services</li>
            <li>Thesis Transcription Services</li>
            <li>Financial Transcription Services</li>
            <li>Webcast Transcription Services</li>
          </ul> */}
        </div>

        {/* Footer Text */}
        {/* <p className='text-[18px] text-[#212529] mt-4'>
          Our professional transcribers offer 99% accuracy in all transcripts. Before submitting the final transcript, all our works are reviewed and
proofread by our senior and professional transcriptionists to ensure a high level of accuracy.
        </p> */}

      </div>
    </section>
    </div>
  )
}

export default Translational
