import React from 'react'
import ConnectedSection from './ConnectedSection'

function Transcription() {
  return (
    <div>
    <div
  className="w-full h-64 md:h-[550px] bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage: "url('/images/tn.png')",
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
        <p className="text-[#296166] text-[20px] mb-4 leading-relaxed">
          Make use of our transcription services and get ready to capture more
          value from your recorded audio and video.
        </p>

        <p className="text-[#212529] text-[18px] mb-6 leading-relaxed">
          Our transcription work is designed to provide accurate transcription
          and translation solutions for students, writers, and businesses.
          Whether you need verbatim transcription or summarized content, we
          ensure high-quality results.
        </p>

        {/* Important Services */}
        <h3 className="text-[32px] font-bold text-[#296166] mb-2">
          IMPORTANCE OF TRANSCRIPTION SERVICES
        </h3>
        <p className="text-[18px] text-[#212529] mb-6 leading-relaxed">
          Transcription services help convert audio and video into written
          content, making it easier to understand, analyze, and store important
          information for future use.
        </p>

        {/* Highlight Box */}
        <div className="mb-6">
          <button className="text-[#FFFFFF] font-semibold bg-[#296166] mb-2 p-2 px-5 cursor-pointer rounded-full">
            Who We Are ?
          </button>
          <p className="text-[#212529] text-[18px] leading-relaxed">
            Our trained experts are highly professional in both audio and copy-typing transcription services. We have transcribed: audio CDs,
handwritten journals, PDF files, cassette tape recordings, video interviews, podcasts, government meetings, conference calls, focus groups,
and much more. Anyone can use our transcription services that require a single file or documents which need to be transcribed. We serve
both large Fortune 100 clients and small businesses with their ongoing transcription service needs. We’ve worked for numerous
universities, large corporations, small real estate firms, and Fortune 100 companies. Our online transcribing services are really easy to use
and can be customized to meet the needs and requirements of our clients.
 <br />
Anyone can use our transcription services who require a single file or documents which needs to be transcribed. We serve both large
Fortune 100 clients and small businesses with their ongoing transcription service needs. We’ve worked for numerous universities, large
corporations, small real estate firms, and Fortune 100 companies. Our online transcribing services are really easy to use and can be
customized to meet the needs and requirements of our clients.
          </p>
        </div>

        {/* Services List */}
        <h3 className="text-[32px] text-[#296166] font-semibold mb-3">
          WHAT KIND OF TRANSCRIPTION SERVICES WE PROVIDE?
        </h3>
        <p className='text-[18px] text-[#212529] mb-4'>To provide the best transcription service, we accept all types of materials including audio and video of varying sizes. We provide
transcription services for</p>

        <div className="grid md:grid-cols-2 gap-6 text-[#212529] text-[18px]">
          <ul className="list-decimal pl-5 space-y-2">
            <li>Academic Transcription Services</li>
            <li>Meeting in Minutes Transcription Services</li>
            <li>Book Transcription Services</li>
            <li>Media Transcription Services</li>
            <li>Seminar Transcription Service</li>
          </ul>

          <ul className="list-decimal pl-5 space-y-2">
            <li>Conference Call Transcription Services</li>
            <li>Video to Text Transcription Services</li>
            <li>Thesis Transcription Services</li>
            <li>Financial Transcription Services</li>
            <li>Webcast Transcription Services</li>
          </ul>
        </div>

        {/* Footer Text */}
        <p className='text-[18px] text-[#212529] mt-4'>
          Our professional transcribers offer 99% accuracy in all transcripts. Before submitting the final transcript, all our works are reviewed and
proofread by our senior and professional transcriptionists to ensure a high level of accuracy.
        </p>

      </div>
    </section>
    </div>
  )
}

export default Transcription
