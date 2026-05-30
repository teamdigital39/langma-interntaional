import React from 'react'
import ConnectedSection from './ConnectedSection'
import { Briefcase, TrendingUp, Clock, BookOpen } from "lucide-react";
import BlogSection from './BlogSection';
import LangmaSection from './LangmaSection';
import { useState } from 'react';
import PopupForm from './PopupForm';
import { ChevronDown, ChevronUp } from "lucide-react";



const opportunitiesData = [
  {
    title: "Language Trainer / Teacher",
    content: [
      "Teach English or foreign languages (e.g., Spanish, German, Japanese)",
      "Create engaging lesson plans and interactive sessions",
      "Assess student progress and provide supportive feedback",
      "Inspire learners to reach language proficiency goals",
    ],
  },
  {
    title: "Ideal Candidate",
    content: [
      "Strong communication skills",
      "Passion for teaching and mentoring",
      "Ability to work in a team",
    ],
  },
  {
    title: "Administrative & Operations Roles",
    content: [
      "Handle daily operations",
      "Manage student records",
      "Coordinate with internal teams",
    ],
  },
  {
    title: "Creative & Digital Roles",
    content: [
      "Social media management",
      "Content creation",
      "Graphic designing & branding",
    ],
  },
];

 const internshipOpportunities = [
    {
      title: "Marketing Intern",
      content: [
        "Assist in social media campaigns",
        "Support branding activities",
        "Generate marketing ideas",
      ],
    },
    {
      title: "HR Intern",
      content: [
        "Assist recruitment processes",
        "Maintain employee records",
        "Support HR operations",
      ],
    },
  ];



const data = [
    {
      icon: <Briefcase size={32} />,
      title: "Meaningful Mission",
      desc: "Be part of a company that enriches people’s lives globally by helping them master languages and opportunities beyond borders.",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Growth & Development",
      desc: "Work with experienced language trainers and industry professionals. Receive continuous support and real-world exposure.",
    },
    {
      icon: <Clock size={32} />,
      title: "Flexible Work Environment",
      desc: "Friendly and supportive team culture. Flexible schedules and work-life balance. Opportunities for both online and offline roles.",
    },
    {
      icon: <BookOpen size={32} />,
      title: "Training & Learning",
      desc: "We encourage learning from within—workshops, teaching toolkits, and regular professional development sessions.",
    },
  ];



function Career() {
   const [openIndex, setOpenIndex] = useState(0); // first open by default

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  //  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("work");

  // const toggle = (index) => {
  //   setOpenIndex(openIndex === index ? null : index);
  // };
const currentOpportunities =
  activeTab === "work"
    ? opportunitiesData
    : internshipOpportunities;

  const [open, setOpen] = useState(false);
  return (
    <div>
      <section className="relative w-full overflow-hidden bg-[#F7FAFC]">
        <div className="w-full grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/cr.png')",
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
      <ConnectedSection/>
      <section className="w-full bg-[#f4fbfb] py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 hidden lg:block">
            
          </div>

<div
  className=""
>
  <img
    src="/images/cr1.png"
    alt="French Class"
    className="w-full h-full object-cover"
  />
</div>
</div>

        <div className="w-full lg:w-1/2 text-left mt-20 lg:mt-0">

          <h2 className="text-[#2f6668] text-[26px] lg:text-[34px] font-semibold leading-snug mb-2">
            Careers at Langma International
          </h2>

          <p className="text-[#296166] text-[18px] lg:text-[20px] font-medium leading-relaxed mb-2">
           Build Your Future with Language & Learning
          </p>

          <p className="text-[#212529] text-[18px] lg:text-[16px] leading-relaxed mb-4">
          At Langma International, we aren’t just a language training institute
we’re a vibrant global community passionate about unlocking
doors through communication. With over a decade of experience
teaching more than 50+ languages to learners worldwide, we
believe that language empowers careers, opens cultures, and
transforms lives
          </p>
           <p className="text-[#212529] text-[18px] lg:text-[16px] leading-relaxed mb-4">
          Whether you’re a dynamic educator, creative content creator, or
driven professional eager to grow in an educational environment,
Langma is where your journey begins.
          </p>
          <button onClick={() => setOpen(!open)} className="cursor-pointer bg-[#33c39a] hover:bg-[#2db18c] transition text-white px-8 py-3 rounded-xl text-[16px] font-medium">
            Connect Us
          </button>
        </div>
      </div>
    </section>
     <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-[32px] md:text-[32px] font-semibold text-[#296166] mb-3">
          Why Join Us?
        </h2>
        <p className="text-[#212529] max-w-2xl text-[20px] mx-auto mb-12">
          We’re committed to creating a fulfilling and collaborative workplace
          where every team member thrives.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-lg transition duration-300"
            >
              <div className="text-blue-600 mb-4">{item.icon}</div>
              <h3 className="text-[25px] font-semibold mb-2 text-[#296166]">
                {item.title}
              </h3>
              <p className="text-[#212529] text-[18px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="w-full bg-[#eef2f3] py-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* TABS */}
        <div className="flex justify-center">
          <div className="flex items-center border border-[#2f5f67] w-fit overflow-hidden">

            {/* Work With Us */}
            <button
              onClick={() => {
                setActiveTab("work");
                setOpenIndex(null);
              }}
              className={`px-8 py-4 text-[18px] font-semibold transition cursor-pointer ${
                activeTab === "work"
                  ? "bg-[#2f5f67] text-white shadow-lg"
                  : "bg-white text-[#2f5f67]"
              }`}
            >
              Work With Us
            </button>

            {/* Internship With Us */}
            <button
              onClick={() => {
                setActiveTab("internship");
                setOpenIndex(null);
              }}
              className={`px-8 py-4 text-[18px] font-semibold transition cursor-pointer ${
                activeTab === "internship"
                  ? "bg-[#2f5f67] text-white shadow-lg"
                  : "bg-white text-[#2f5f67]"
              }`}
            >
              Internship With Us
            </button>

          </div>
        </div>

        {/* HEADING */}
        <h2 className="text-2xl mt-4 text-center md:text-[32px] font-semibold text-[#296166] mb-2">
          Open Opportunities
        </h2>

        <p className="text-center text-[20px] mb-8 font-medium">
          Langma International is looking for passionate individuals in roles such as
        </p>

        {/* ACCORDION */}
        <div className="space-y-4">
          {currentOpportunities.map((item, index) => (
            <div
              key={index}
              className="bg-[#2f5d62] text-white rounded-full md:rounded-[40px] px-6 py-4 transition-all duration-300"
            >
              
              {/* HEADER */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggle(index)}
              >
                <h3 className="text-sm md:text-base font-semibold">
                  {item.title}
                </h3>

                <div className="w-8 h-8 flex items-center justify-center rounded-full border border-white/50">
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>

              {/* CONTENT */}
              {openIndex === index && (
                <ul className="mt-4 space-y-2 text-sm text-white/90">
                  {item.content.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-300 mt-1">✔</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
    <section className="w-full bg-[#f4fbfb] py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 hidden lg:block">
            
          </div>

<div
  className=""
>
  <img
    src="/images/cr2.png"
    alt="French Class"
    className="w-full h-full object-cover"
  />
</div>


        </div>

        <div className="w-full lg:w-1/2 text-left mt-20 lg:mt-0">

          <h2 className="text-[#2f6668] text-[26px] lg:text-[34px] font-semibold leading-snug mb-4">
            How to Apply
          </h2>
          <ul className='text-[#212529] text-[18px] mb-5 space-y-2'>
            <div className='flex'>
              <img src="/images/cr51.svg" className='mr-4' alt="" />
            <li>Explore current openings listed on this page</li>
            </div>
            <div className='flex'>
              <img src="/images/cr51.svg" className='mr-4' alt="" />
            <li>Click Apply Now next to your desired role</li>
            </div>
            <div className='flex'>
              <img src="/images/cr51.svg" className='mr-4' alt="" />
            <li>Fill in your details and upload your résumé</li>
            </div>
            <div className='flex'>
              <img src="/images/cr51.svg" className='mr-4' alt="" />
            <li>Our team will follow up within 7 business days</li>
            </div>
          </ul>
          <button onClick={() => setOpen(!open)} className="cursor-pointer bg-[#33c39a] hover:bg-[#2db18c] transition text-white px-8 py-3 rounded-xl text-[16px] font-medium">
            Apply Now
          </button>
        </div>
      </div>
    </section>
    <section className="w-full flex justify-center py-10 bg-gray-100 px-4">
  <div className="max-w-6xl w-full bg-teal-800 text-white 
                  rounded-2xl md:rounded-full 
                  flex flex-col md:flex-row 
                  items-center overflow-hidden shadow-lg">

    {/* Left Image */}
    <div className="hidden lg:block w-full md:w-1/4 h-52 md:h-full">
      <img
        src="/images/cr4.png"
        alt="Work Culture"
        className="h-full w-full object-cover"
      />
    </div>

    {/* Content */}
    <div className="flex flex-col md:flex-row w-full md:w-3/4 
                    divide-y md:divide-y-0 md:divide-x 
                    divide-white/30">

       <div className="block lg:hidden flex flex-col px-6 py-4 text-center md:text-left">
            <h3 className="font-semibold text-[25px]">Work Culture</h3>
            <p className="text-[18px] text-white/80 mt-1">
              At Langma, we cultivate a culture that is
            </p>
          </div>

      {/* Item 1 */}
      <div className="flex flex-col px-6 py-4 text-center md:text-left">
        <h3 className="font-semibold text-[25px]">Inclusive</h3>
        <p className="text-[18px] text-white/80 mt-1">
          Diverse backgrounds welcome
        </p>
      </div>

      {/* Item 2 */}
      <div className="flex flex-col px-6 py-4 text-center md:text-left">
        <h3 className="font-semibold text-[25px]">Collaborative</h3>
        <p className="text-[18px] text-white/80 mt-1">
          Work in teams that value ideas and innovation
        </p>
      </div>

      {/* Item 3 */}
      <div className="flex flex-col px-6 py-4 text-center md:text-left">
        <h3 className="font-semibold text-[25px]">Student-Focused</h3>
        <p className="text-[18px] text-white/80 mt-1">
          Every role contributes directly to learner success
        </p>
      </div>

    </div>
  </div>
</section>
<section className="w-full bg-[#296166] py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left Content */}
        <div className="text-[#FFFFFF] max-w-xl text-center md:text-left">
          <h2 className="text-2xl md:text-[32px] font-semibold">
            Ready to Join Us?
          </h2>
          <p className="text-[#FFFFFF] mt-2 text-[20px] font-medium">
            If you're passionate about language, education and shaping global
            communication, we want to hear from you!
          </p>
        </div>

        {/* Right Box */}
        <div className='flex flex-col'>
        <span className="text-center text-[#FFFFFF] mb-5 text-[25px] font-semibold">
            Submit your resume
          </span>
        <div className="bg-white rounded-full px-5 py-3 flex items-center gap-3 shadow-md">
          <a
            href="mailto:careers@langmainternational.com"
            className="text-teal-800 font-semibold text-sm"
          >
            careers@langmainternational.com
          </a>
        </div>
        </div>

      </div>
    </section>
    {/* <BlogSection /> */}
    {/* <LangmaSection /> */}
    <PopupForm open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default Career
