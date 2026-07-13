import React, { useState } from "react";
import { UserRound, Calendar, BookOpen, Briefcase } from "lucide-react";
import PopupForm from "./PopupForm";

const cards = [
  {
    icon: UserRound,
    image: "/images/personalization-.webp",
    title: "Personalized Learning",
    content:
      "The language courses in Langma International can be personalized based on the requirement of the candidate. We provide customized programs based on the purpose of study and convenient time period or duration (academic, examination, business or employment) if it is employment we further customize the program according to the industry, including vocabulary from the respective field.",
    color: {
      accent: "text-[#0d9488]",
      iconBg: "bg-[#0d9488]",
      btn: "bg-[#0d9488] hover:bg-[#0f766e]",
    },
  },
  {
    icon: Calendar,
    image: "/images/flexible-time.webp",
    title: "Flexible Schedules",
    content:
      "Candidate is able to select the timings and mode for the language classes. Online and offline modes are available for all languages, and for students connecting via internet, the suitable time slot can be offered which aligns with the country's timings. Also the option of taking individual or group classes is made available for candidates.",
    color: {
      accent: "text-[#4FA3D1]",
      iconBg: "bg-[#4FA3D1]",
      btn: "bg-[#4FA3D1] hover:bg-[#3d8fbf]",
    },
  },
  {
    icon: BookOpen,
    image: "/images/one-to-one.webp",
    title: "One-on-One Guidence",
    content:
      "Langma International of Languages provides the study material used during the course. All students are given the text books and workbooks for the particular language, audio CDs and dictionaries for the particular language. Workshops, audio visuals are conducted to enhance the speaking ability of the students as well.",
    color: {
      accent: "text-[#7c3aed]",
      iconBg: "bg-[#7c3aed]",
      btn: "bg-[#7c3aed] hover:bg-[#6d28d9]",
    },
  },
  {
    icon: Briefcase,
    image: "/images/placement-opportunities.webp",
    title: "Placement Opportunities",
    content:
      "Upon completion of the foreign language courses, students will be offered placements or internships with within our network of partners who hire candidates for linguistic skills. Our clients are from different industries and students can select according to their preferences.",
    color: {
      accent: "text-[#296166]",
      iconBg: "bg-[#296166]",
      btn: "bg-[#296166] hover:bg-[#1f4a4e]",
    },
  },
];

const StudyDestinations = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full py-14 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <h2 className="text-center text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-[#1A2540] mb-10 sm:mb-12 px-4">
          Why Choose{" "}
          <span className="text-[#4FA3D1]">Langma International</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-5 xl:gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-[#e8edf2] shadow-[0_8px_30px_rgba(26,37,64,0.12),0_2px_8px_rgba(26,37,64,0.06)] hover:shadow-[0_12px_40px_rgba(26,37,64,0.16),0_4px_12px_rgba(26,37,64,0.08)] transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative h-[160px] md:h-[170px] lg:h-[150px] xl:h-[180px] shadow-[inset_0_-1px_0_rgba(26,37,64,0.06)]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute -bottom-5 left-5 w-11 h-11 rounded-full ${card.color.iconBg} flex items-center justify-center border-[3px] border-white shadow-[0_4px_12px_rgba(26,37,64,0.2)]`}
                  >
                    <Icon size={20} className="text-white" strokeWidth={2} />
                  </div>
                </div>

                <div className="pt-8 px-4 lg:px-4 xl:px-5 pb-5 lg:pb-6 flex flex-col flex-1">
                  <h3
                    className={`font-bold text-base lg:text-[15px] xl:text-lg ${card.color.accent}`}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-2 lg:mt-3 text-[#64748b] text-xs lg:text-[12px] xl:text-sm leading-relaxed flex-1">
                    {card.content}
                  </p>

                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className={`mt-4 lg:mt-5 mx-auto cursor-pointer px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 rounded-lg text-white text-xs lg:text-[13px] xl:text-sm font-medium transition-colors shadow-[0_4px_14px_rgba(26,37,64,0.18)] ${card.color.btn}`}
                  >
                    {card.title}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <PopupForm open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default StudyDestinations;
