import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Clock3,
  Globe2,
  UsersRound,
  Video,
} from "lucide-react";
import PopupForm from "./PopupForm";

const learningBenefits = [
  {
    icon: <Globe2 size={23} aria-hidden="true" />,
    title: "Connect across borders",
    description:
      "Build communication skills for travel, international study, work, and everyday conversations with people from other cultures.",
  },
  {
    icon: <BookOpen size={23} aria-hidden="true" />,
    title: "Learn with a clear path",
    description:
      "Start with your current level and goals, then develop practical speaking, listening, reading, and writing skills step by step.",
  },
  {
    icon: <UsersRound size={23} aria-hidden="true" />,
    title: "Choose a suitable class format",
    description:
      "Ask about one-to-one or group learning options and find a schedule that works alongside your study or professional commitments.",
  },
];

const learningSteps = [
  {
    number: "01",
    title: "Choose a language",
    description:
      "Explore the programmes below and tell us what you want to learn and why.",
  },
  {
    number: "02",
    title: "Discuss your goals",
    description:
      "Our team can help you understand suitable levels, class formats, and current schedules.",
  },
  {
    number: "03",
    title: "Start learning online",
    description:
      "Join live classes from Nepal and practise with guidance from language trainers.",
  },
];

const careerProfiles = [
  "International business",
  "Human resources",
  "Education",
  "Healthcare",
  "Engineering",
  "Marketing",
];

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

function ForeignLanguageCoursesInNepal() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContactForm = () => setIsContactOpen(true);

  return (
    <>
      <Helmet>
        <title>Foreign Language Courses in Nepal | Online Classes | Langma</title>
        <meta
          name="description"
          content="Explore online foreign language learning for students and professionals in Nepal. Ask Langma International about class formats, schedules, and course availability."
        />
      </Helmet>

      <main className="bg-white text-slate-900">
        <section className="relative isolate overflow-hidden bg-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,#e8f3f1_1px,transparent_1px)] [background-size:8.33%_100%]"
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF6F6] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#1D1B4B]">
                <Globe2 size={16} className="text-[#134E4A]" aria-hidden="true" />
                Online language learning · Nepal
              </span>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#134E4A]">
                  Langma International
                </p>
                <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[#1D1B4B] sm:text-5xl lg:text-[60px]">
                  Foreign Language Courses in Nepal
                </h1>
              </div>
              <p className="max-w-xl text-lg leading-8 text-[#4A4A4A]">
                Learn a new language online with Langma International. Explore
                available programmes and discuss class formats and schedules
                that fit your goals and availability.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#language-courses"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#134E4A] px-7 py-3.5 font-semibold text-white transition hover:bg-[#0F3F3C]"
                >
                  Explore languages <ArrowRight size={18} aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={openContactForm}
                  className="inline-flex items-center justify-center rounded-full border border-[#134E4A]/30 px-7 py-3.5 font-semibold text-[#134E4A] transition hover:bg-[#EEF6F6]"
                >
                  Talk to a course advisor
                </button>
              </div>
              <ul className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {[
                  "Certified trainers",
                  "Live interactive classes",
                  "Flexible learning options",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-medium text-[#4A4A4A]"
                  >
                    <Check
                      size={16}
                      className="shrink-0 text-[#134E4A]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div
                aria-hidden="true"
                className="absolute -inset-5 rounded-[2rem] bg-[#EEF6F6]"
              />
              <div className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#e7f4f2] via-white to-[#dcefed] p-7 shadow-sm sm:min-h-[430px] sm:p-10">
                <div
                  aria-hidden="true"
                  className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#134E4A]/10"
                />
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-[#134E4A]/10"
                />
                <div className="relative flex flex-1 items-center justify-center">
                  <div className="rounded-3xl border border-white bg-white/90 p-8 shadow-xl sm:p-12">
                    <img
                      src="https://flagcdn.com/w320/np.png"
                      alt="Flag of Nepal"
                      className="mx-auto h-40 w-auto object-contain sm:h-52"
                      width="320"
                      height="240"
                    />
                  </div>
                </div>
                <div className="relative mt-8 rounded-2xl border border-white/80 bg-white/90 p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#134E4A]">
                    Learners in Nepal
                  </p>
                  <p className="mt-2 text-xl font-bold text-[#1D1B4B]">
                    Online classes, planned around you
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#4A4A4A]">
                    Ask our team about current course availability and
                    schedules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 bg-[#f7fbfa]">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:px-12">
            {[
              { icon: <Video size={21} aria-hidden="true" />, label: "Online classes" },
              { icon: <Clock3 size={21} aria-hidden="true" />, label: "Schedule options to discuss" },
              { icon: <UsersRound size={21} aria-hidden="true" />, label: "Personal course guidance" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800">{icon}</span>
                <span className="font-semibold text-slate-700">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          id="language-courses"
          className="scroll-mt-24 bg-[#f7fbfa] px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="For learners in Nepal"
                title="Online language learning that fits your schedule"
                description="Langma offers online foreign language learning for students and working professionals in Nepal. Discuss your goals with our team and confirm the course, class format, and current schedule that suit you."
              />
              <p className="mt-5 max-w-2xl leading-7 text-slate-600">
                Choose from one-to-one or group learning options where
                available. Ask about weekday and weekend schedules, learning
                levels, and the next steps before enrolling.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">
                Get started
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[#1D1B4B]">
                Get course guidance for Nepal
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Tell us what you want to achieve. A course advisor can confirm
                current availability, class format, schedule, and fees.
              </p>
              <button
                type="button"
                onClick={openContactForm}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#134E4A] px-6 py-3 font-semibold text-white transition hover:bg-[#0F3F3C]"
              >
                Enquire about classes
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f9f8] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Why learn with Langma"
              title="Build confidence through practical learning"
              description="Language learning can support personal, academic, and professional goals. Our team can help you explore a programme and learning format suited to your needs."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {learningBenefits.map(({ icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                    {icon}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="How it works"
                title="Start learning in three steps"
                description="Whether you are new to a language or building on what you already know, begin with a conversation about your goals."
              />
              <ol className="mt-8 space-y-6">
                {learningSteps.map((step) => (
                  <li key={step.number} className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#102e36] text-sm font-bold text-teal-200">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900">{step.title}</h3>
                      <p className="mt-1 leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl bg-[#102e36] p-7 text-white sm:p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-300/15 text-teal-200">
                <BriefcaseBusiness size={24} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
                Language skills for Nepal’s global opportunities
              </h2>
              <p className="mt-4 leading-7 text-slate-200">
                Multilingual communication can complement experience in fields
                such as business, human resources, education, healthcare,
                engineering, and marketing. Course completion does not guarantee
                employment or a particular career outcome.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {careerProfiles.map((profile) => (
                  <span
                    key={profile}
                    className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-slate-100"
                  >
                    {profile}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#eef8f6] px-5 py-14 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-white p-7 shadow-sm sm:p-10 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">
                Your next step
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
                Find a language programme that fits your goals
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Ask our team about course levels, learning formats, schedules,
                and current availability for learners in Nepal.
              </p>
            </div>
            <button
              type="button"
              onClick={openContactForm}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#102e36] px-6 py-3.5 font-bold text-white transition hover:bg-[#19434d]"
            >
              Talk to an advisor <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeading
            eyebrow="Common questions"
            title="Foreign language courses in Nepal"
            centered
          />
          <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 px-5 sm:px-7">
            {[
              {
                question: "Can I take classes online from Nepal?",
                answer:
                  "Langma offers online language learning. Contact the team to confirm the current schedule and format for your chosen language.",
              },
              {
                question: "Can I choose one-to-one or group classes?",
                answer:
                  "Both one-to-one and group options may be available. The suitable format depends on the language programme and current schedule, so please confirm when enquiring.",
              },
              {
                question: "Which language should I learn?",
                answer:
                  "The right course depends on your personal, academic, or professional goals. Contact our team to discuss current course options and identify a suitable starting point.",
              },
            ].map(({ question, answer }) => (
              <details key={question} className="group py-5">
                <summary className="cursor-pointer list-none pr-6 font-bold text-slate-900 marker:content-none">
                  <span className="flex items-center justify-between gap-4">
                    {question}
                    <span className="text-xl text-teal-700 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                  {answer}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-slate-500">
            Programme availability, fees, and schedules can change. Please
            confirm current details with Langma International.
          </p>
        </section>
      </main>

      <PopupForm
        open={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}

export default ForeignLanguageCoursesInNepal;
