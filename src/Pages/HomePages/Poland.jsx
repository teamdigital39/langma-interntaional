import React from 'react'
import ConnectedSection from './ConnectedSection'
import { Check } from "lucide-react";
import PopupForm from "./PopupForm";
import { useState } from 'react';

 const boxes = [
    {
      title: "Quality Education",
      desc: "While Polish is the official language English is widely spoken, especially within universities. All partner  institutions of Langma International offer English-medium programmes, ensuring a smooth academic experience.",
      bg: "bg-[#E0F7FA]",
      ttl:"text-[#296166]",
      ppl:"text-[#212529]",
    },
    {
      title: "Affordable Living",
      desc: "Poland uses the Polish Złoty (PLN), making it significantly more affordable than many Western Eurors, and refreshing springs—each adding to the charm of student life.",
      bg: "bg-[#296166]",
      ttl:"text-[#FFFFFF]",
      ppl:"text-[#FFFFFF]",
    },
    {
      title: "Food & Connectivity",
      desc: "Polish cuisine is hearty and affopean countries while maintaining a high standard of living and education.",
      bg: "bg-[#E0F7FA]",
      ttl:"text-[#296166]",
      ppl:"text-[#212529]",
    },
    {
      title: "Climate & Lifestyle",
      desc: "Poland offers four distinct seasons, from warm summers to snowy winters. Major cities feature Indian restaurants and Asian supermarkets, while efficient public transport makes travel easy.",
      bg: "bg-[#296166]",
      ttl:"text-[#FFFFFF]",
      ppl:"text-[#FFFFFF]",
    },
  ];
   const boxes1 = [
    {
      title: "Accommodation",
      desc: "Students can choose between on-campus dormitories (Akademik) or private/shared apartments, all arranged with Langma’s assistance before departure.",
      bg: "bg-[#E0F7FA]",
      ttl:"text-[#296166]",
      ppl:"text-[#212529]",
    },
    {
      title: "Healthcare",
      desc: "International students are covered by Poland’s National Health Fund (NFZ), with additional insurance options recommended for comprehensive coverage.",
      bg: "bg-[#296166]",
      ttl:"text-[#FFFFFF]",
      ppl:"text-[#FFFFFF]",
    },
    {
      title: "Part-Time Work Opportunities",
      desc: "Students are permitted to work up to 20 hours per week during academic sessions, gaining valuableprofessional experience and financial support.",
      bg: "bg-[#E0F7FA]",
      ttl:"text-[#296166]",
      ppl:"text-[#212529]",
    },
    {
      title: "Indian Community",
      desc: "A vibrant Indian student community exists across major cities, supported by the Embassy of India in Warsaw, ensuring students feel at home from the very beginning.",
      bg: "bg-[#296166]",
      ttl:"text-[#FFFFFF]",
      ppl:"text-[#FFFFFF]",
    },
  ];

   const sections = [
    {
      title: "Medicine (MBBS/MD)",
      content: "Recognised by the National Medical Commission (NMC) and listed in WDOMS, enabling graduates to appear for FMGE/NExT in India."
    },
    {
      title: "Engineering & Technology",
      content: "Specialisations such as Mechanical, Civil, Electrical, and Industrial Engineering, supported by modern infrastructure and strong industry partnerships."
    },
    {
      title: "Computer Science & IT",
      content: "High-demand programmes offering excellent career prospects within Poland's rapidly expanding tech ecosystem and across Europe."
    },
    {
      title: "Business, Management, Architecture & Design",
      content: "Globally oriented programmes combining practical industry exposure with innovative and creative learning environments."
    }
  ];
  const features = [
    {
      title: "Personalised Counselling",
      description: "We understand your academic background, career aspirations, and budget to design a study pathway that aligns perfectly with your goals and long-term ambitions.",
      icon: "👤" // You can replace these with <img> tags for your specific icons
    },
    {
      title: "University Selection & Application",
      description: "We shortlist suitable universities and manage the complete application process, including SOP guidance, documentation, and continuous coordination with admissions teams.",
      icon: "📱"
    },
    {
      title: "Visa & Immigration Assistance",
      description: "We provide step-by-step support for the National Visa (Type D) and guide you in obtaining the Temporary Residence Permit after arrival in Poland.",
      icon: "🌍"
    },
    {
      title: "Pre-Departure & On-Ground Support",
      description: "We prepare you for life in Poland through orientation sessions and assist with airport pickup, accommodation, and university registration upon arrival.",
      icon: "✈️"
    }
  ];

function Poland() {
    const [open, setOpen] = useState(false);
  return (
    <>
    <div>
      <section className="relative w-full overflow-hidden bg-[#F7FAFC]">
        {/* FULL WIDTH HERO */}
        <div className="w-full grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/plnd.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute -bottom-0 md:bottom-8 ml-20">
              <button onClick={() => setOpen(!open)} className="cursor-pointer inline-flex items-center gap-2 bg-[#006064] text-white px-3 py-1 md:px-7 md:py-3 rounded-full text-sm font-medium hover:bg-[#17a398] transition shadow-lg">
                Let’s Connect →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <ConnectedSection/>
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/lgpl.png"
            alt="Section"
            className="w-full rounded-xl"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-[#296166] text-[32px] font-bold mb-4">
            Welcome: A Letter to Every Student
Who Has a Dream
          </h2>
          <p className="text-[#212529] leading-relaxed text-base">
            Choosing to study abroad is one of the most significant decisions
in a student’s life. At Langma International, we understand the
excitement and uncertainty that come with this journey. Having 
guided hundreds of Indian students, we can confidently say that 
Poland offers an exceptional blend of academic excellence,
affordability, and global opportunity.

<br/>

Located at the heart of Europe, Poland is a nation defined by
resilience and ambition. Its universities are internationally
respected, and degrees awarded here are EU-recognised, opening
doors to career opportunities worldwide. This guide is crafted to
provide everything you need to begin your journey with confidence.
          </p>
          <br />
          <p className='text-[22px] text-[#212529] font-medium'>“Your education begins the moment you decide to reach
for something greater.”</p>
        </div>

      </div>
    </section>
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <h2 className="text-[#296166] text-[32px] font-bold mb-4">
            Getting to Know Poland
          </h2>
          <p className='text-[20px] text-[#296166]'>A Place That Surprises Everyone</p>
          <p className="text-[#212529] leading-relaxed text-base">
            Poland seamlessly blends historic charm with modern innovation.
From the dynamic skyline of Warsaw to the medieval beauty of
Kraków, the fairy-tale ambiance of Wrocław, and the coastal charm
of Gdańsk, each city offers a unique and enriching student
experience.
<br/>
          </p>
          <p className='text-[#212529] font-medium'>Top Student Cities</p>
         <div className="bg-white py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Item 1 */}
        <div className="flex items-start gap-3">
          <img src="/images/plck.svg" alt="" />
          <p className=" text-[#212529]  leading-relaxed">
            <span className="font-semibold text-[#006064] text-[18px]">Warsaw</span> – 
            A cosmopolitan capital with leading universities and thriving tech and business sectors.
          </p>
        </div>

        {/* Item 2 */}
        <div className="flex items-start gap-3">
          <img src="/images/plck.svg" alt="" />
          <p className="text-[#212529] leading-relaxed">
            <span className="font-semibold text-[#006064] text-[18px]">Kraków</span> – 
            Poland’s cultural and academic heart, home to centuries-old institutions.
          </p>
        </div>

        {/* Item 3 */}
        <div className="flex items-start gap-3">
          <img src="/images/plck.svg" alt="" />
          <p className="text-[#212529] leading-relaxed">
            <span className="font-semibold text-[#006064] text-[18px]">Wrocław</span> – 
            A youthful, international city known for innovation and welcoming communities.
          </p>
        </div>

        {/* Item 4 */}
        <div className="flex items-start gap-3">
          <img src="/images/plck.svg" alt="" />
          <p className="text-[#212529] leading-relaxed">
            <span className="font-semibold text-[#006064] text-[18px]">Poznań, Gdańsk & Lublin</span> – 
            Ideal for students seeking quality education in a relaxed environment.
          </p>
        </div>

      </div>
    </div>
          
        </div>
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/lgpl1.png"
            alt="Section"
            className="w-full rounded-xl"
          />
        </div>
      </div>
    </section>
    <div className="py-12 px-4 md:px-10 bg-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {boxes.map((box, index) => (
          <div
            key={index}
            className={`p-4 rounded-4xl shadow-2xl ${box.bg}`}
          >
            <h3 className={`text-[25px] font-semibold ${box.ttl} mb-2`}>
              {box.title}
            </h3>
            <p className={`text-[14px] font-regular ${box.ppl} mb-2`}>
              {box.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
     <div className="bg-white py-16 px-4 md:px-10 text-center">

      <h2 className="text-[32px] font-semibold text-[#296166] mb-4">
        Academics: Globally Recognised Education
      </h2>

      <p className=" mx-auto text-[#212529] mb-6 text-[20px]">
       A degree from a Polish university is a respected EU qualification. Institutions like Jagiellonian University (established in 1364) reflect Poland’s
rich academic heritage combined with modern teaching methods.
      </p>

      <button className="bg-[#296166] text-[20px] text-white px-6 py-4 rounded-xl cursor-pointer mb-2">
        Popular Programmes for Indian Students
      </button>
      <div className="w-full max-w-6xl mx-auto p-8 font-sans">
      {/* Main Container */}
 <div className="bg-[#2D5A5E] text-left text-white rounded-[50px] p-10 md:p-14 flex flex-col md:flex-row gap-8 md:gap-0 justify-between shadow-xl">

  {sections.map((item, index) => (
    <React.Fragment key={index}>

      <div className="flex-1 flex flex-col justify-start px-2">

        <h3 className="text-[22px] font-semibold mb-4 leading-snug min-h-[70px]">
          {item.title} —
        </h3>

        <p className="text-[16px] leading-relaxed text-gray-100">
          {item.content}
        </p>

      </div>

      {/* Divider */}
      {index !== sections.length - 1 && (
        <div className="hidden md:block w-[1px] bg-white/30 mx-4" />
      )}

    </React.Fragment>
  ))}

</div>

      {/* Quote Section */}
      <div className="mt-8 text-center">
        <p className="text-[#000000]  text-[20px] font-medium">
          “The best investment you will ever make is in an education that opens doors you never knew existed.”
        </p>
      </div>
    </div>

    </div>
    <section className="pb-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2D5A5E] mb-12">
          The Langma International Difference
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white  rounded-[30px] p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-start"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-3xl">
                {feature.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-[25px] font-semibold text-[#296166] mb-4 leading-tight">
                {feature.title}
              </h3>
              <p className="text-[#212529] text-[15px] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
          <img
            src="/images/lgpl2.png"
            alt="Section"
            className="w-full rounded-xl"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-[#296166] text-[32px] font-bold mb-4">
            Funding Your Future
          </h2>
          <p className='text-[20px] text-[#296166]'>A Place That Surprises Everyone</p>
          <p className="text-[#212529] leading-relaxed text-base">
            Poland is already one of Europe’s most affordable destinations, and
scholarships make it even more accessible. Langma International
helps students explore and apply for
<br/>
          </p>
          <p className='text-[#212529] font-medium'>Top Student Cities</p>
         <div className="bg-white py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Item 1 */}
        <div className="flex items-start gap-3">
          <img src="/images/plck.svg" alt="" />
          <p className=" text-[#212529]  leading-relaxed">
            <span className="font-semibold text-[#006064] text-[18px]">NAWA Scholarships</span> – 
            – Prestigious funding by the Polish government.
          </p>
        </div>

        {/* Item 2 */}
        <div className="flex items-start gap-3">
          <img src="/images/plck.svg" alt="" />
          <p className="text-[#212529] leading-relaxed">
            <span className="font-semibold text-[#006064] text-[18px]">Ignacy Łukasiewicz Scholarship Programme</span> – 
            For students from developing countries, including India.
          </p>
        </div>

        {/* Item 3 */}
        <div className="flex items-start gap-3">
          <img src="/images/plck.svg" alt="" />
          <p className="text-[#212529] leading-relaxed">
            <span className="font-semibold text-[#006064] text-[18px]">University Merit Scholarships</span> – 
             Tuition fee reductions for high-achieving students.
          </p>
        </div>

        {/* Item 4 */}
        <div className="flex items-start gap-3">
          <img src="/images/plck.svg" alt="" />
          <p className="text-[#212529] leading-relaxed">
            <span className="font-semibold text-[#006064] text-[18px]">Erasmus+ Exchange Scholarships</span> – 
            Opportunities for international academic mobility.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <img src="/images/plck.svg" alt="" />
          <p className="text-[#212529] leading-relaxed">
            <span className="font-semibold text-[#006064] text-[18px]">ICCR Scholarships</span> – 
             Offered by the Government of India.
          </p>
        </div>

        <p>Our financial counselling team provides transparent cost planning
and guidance on education loans where necessary.</p>

      </div>
    </div>
          
        </div>
        {/* Left Image */}
      
      </div>
    </section>
     <div className="py-12 px-4 md:px-10 bg-gray-100">
       <h2 className="text-[#296166] text-[32px] font-bold mb-4 text-center">
             Life in Poland
          </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {boxes1.map((box, index) => (
          <div
            key={index}
            className={`p-4 rounded-4xl shadow-2xl ${box.bg}`}
          >
            <h3 className={`text-[25px] font-semibold ${box.ttl} mb-2`}>
              {box.title}
            </h3>
            <p className={`text-[14px] font-regular ${box.ppl} mb-2`}>
              {box.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
    <section className="w-full px-4 py-12 bg-[#2D5A5E]">
      <div className="max-w-7xl mx-auto  rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 ">
        
        {/* Text Content */}
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Begin Your Journey
          </h2>
          <p className="text-gray-100 text-lg leading-relaxed opacity-90">
            Whether you are just starting your research or are ready to apply, 
            Langma International is here to guide you every step of the way. 
            Every successful journey begins with a simple conversation.
          </p>
        </div>

        {/* Button */}
        <div className="flex-shrink-0">
          <button onClick={() => setOpen(!open)} className="bg-white cursor-pointer text-[#2D5A5E] font-bold py-4 px-10 rounded-xl text-lg hover:bg-white transition-colors duration-300 shadow-md">
            Get in Touch
          </button>
        </div>

      </div>
    </section>
    <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Poland
