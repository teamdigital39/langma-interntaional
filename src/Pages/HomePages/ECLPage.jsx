import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Check,
  ClipboardCheck,
  Headphones,
  MapPin,
  Mic2,
  PenLine,
} from "lucide-react";
import { Link } from "react-router-dom";

const examLanguages = [
  "Bulgarian",
  "Croatian",
  "Czech",
  "English",
  "French",
  "German",
  "Hebrew",
  "Hungarian",
  "Italian",
  "Polish",
  "Romanian",
  "Russian",
  "Serbian",
  "Slovak",
  "Spanish",
];

const examLevels = [
  {
    level: "A2",
    name: "Waystage",
    description: "Demonstrate basic communication in familiar situations.",
  },
  {
    level: "B1",
    name: "Threshold",
    description: "Communicate independently in everyday situations.",
  },
  {
    level: "B2",
    name: "Vantage",
    description: "Use the language with confidence in varied contexts.",
  },
  {
    level: "C1",
    name: "Effective Operational Proficiency",
    description: "Communicate effectively in complex situations.",
  },
];

const skills = [
  {
    icon: <Mic2 size={23} aria-hidden="true" />,
    title: "Oral communication",
    description:
      "Interact on a given topic, take part in a conversation, and express your views in a short monologue.",
  },
  {
    icon: <Headphones size={23} aria-hidden="true" />,
    title: "Listening comprehension",
    description:
      "Understand semi-authentic and authentic recordings through two listening tasks.",
  },
  {
    icon: <PenLine size={23} aria-hidden="true" />,
    title: "Written communication",
    description:
      "Write two texts of a specified length while responding to the task prompts.",
  },
  {
    icon: <BookOpenCheck size={23} aria-hidden="true" />,
    title: "Reading comprehension",
    description:
      "Understand general texts and complete two reading tasks without a dictionary.",
  },
];

function ECLPage() {
  return (
    <>
      <Helmet>
        <title>ECL Exam Centre in India | Levels, Format & Languages | Langma</title>
        <meta
          name="description"
          content="Learn about the ECL language examination at Langma in India: available languages, CEFR levels, four exam skills, test format, scoring, and exam periods."
        />
      </Helmet>

      <main className="bg-white text-slate-900">
        <section className="relative isolate overflow-hidden bg-[#102e36]">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full border border-white/10"
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-28">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-teal-200/30 bg-teal-100/10 px-4 py-2 text-sm font-semibold text-teal-100">
                <ClipboardCheck size={16} aria-hidden="true" />
                European Consortium for the Certificate of Attainment in Modern Languages
              </p>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                ECL Examination
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                Find out how the ECL language exam assesses practical
                communication, which languages and CEFR levels are offered, and
                how to enquire about taking the exam through Langma in India.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-300 px-6 py-3.5 font-bold text-[#102e36] transition hover:bg-teal-200"
                >
                  Ask about the ECL exam
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <a
                  href="#exam-format"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Explore the exam format
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur sm:p-9">
              <img
                src="https://api.langmainternational.com/normal_images/1589224505.png"
                alt="ECL examination"
                className="mx-auto max-h-40 w-auto max-w-full rounded-xl bg-white p-3 object-contain"
                loading="lazy"
              />
              <div className="mt-7 grid grid-cols-2 gap-3">
                {[
                  ["4", "language skills"],
                  ["A2–C1", "CEFR levels"],
                  ["25", "points per skill"],
                  ["India", "exam centre"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-2xl font-bold text-teal-200">{value}</p>
                    <p className="mt-1 text-sm text-slate-200">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
                About the exam
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                A CEFR-aligned language qualification
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-slate-600">
              <p>
                ECL is a standardized examination system for languages of
                European Union member states and candidate countries. It is
                operated by the European Consortium for the Certificate of
                Attainment in Modern Languages and follows the recommendations
                of the Common European Framework of Reference for Languages
                (CEFR).
              </p>
              <p>
                The exam focuses on oral and written communication in everyday,
                personal, professional, and work-related situations. It is
                designed to assess practical language use rather than isolated
                grammar exercises or translation tasks.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f9f8] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
                Exam levels
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Choose your CEFR level
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                ECL assesses communicative competence at four levels. Confirm
                current language and level availability before registering.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {examLevels.map((item) => (
                <article
                  key={item.level}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-3xl font-extrabold text-teal-800">
                    {item.level}
                  </p>
                  <h3 className="mt-3 font-bold text-slate-950">{item.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="exam-format"
          className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
                Four skills
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                What the ECL exam tests
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                The exam has an oral part and a written part. Each part assesses
                two related communication skills, using tasks suited to the
                selected level.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {skills.map(({ icon, title, description }, index) => (
                <article
                  key={title}
                  className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                    {icon}
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
                      {index < 2 ? "Oral part" : "Written part"}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-slate-950">
                      {title}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-600">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-teal-100 bg-teal-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-950">
                Oral and written tasks
              </h3>
              <p className="mt-3 leading-7 text-slate-700">
                The oral exam includes an introductory warm-up, a conversation,
                and an individual monologue. Candidates are generally assessed
                in pairs or small groups by examiners. Written and reading
                sections each contain two tasks; task formats can include
                matching, multiple choice, short answers, and text completion.
                Exact timings and task details depend on the exam level and
                current ECL guidance.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#102e36] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-200">
                Languages
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                ECL exam languages
              </h2>
              <p className="mt-4 leading-7 text-slate-200">
                Langma’s backend ECL page lists the following examination
                languages. Availability may vary by session, so contact us to
                confirm the language and level you need.
              </p>
              <Link
                to="/contact/"
                className="mt-7 inline-flex items-center gap-2 font-semibold text-teal-200 hover:text-white"
              >
                Check current availability
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {examLanguages.map((language) => (
                <li
                  key={language}
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium"
                >
                  <Check
                    size={16}
                    className="shrink-0 text-teal-200"
                    aria-hidden="true"
                  />
                  {language}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                <ClipboardCheck size={21} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-bold">How scoring works</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Each skill is scored out of 25. To pass a part, candidates need
                at least 40% in each of its two skills and an average of at
                least 60% across that part. Passing one part may qualify a
                candidate for a certificate for that part.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                <MapPin size={21} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-bold">Exam location</h2>
              <p className="mt-3 leading-7 text-slate-600">
                The backend information identifies Langma School of Languages
                in India as an ECL examination centre. Contact Langma to verify
                the current venue, registration process, and session details.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                <CalendarDays size={21} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-bold">Exam periods</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Backend information says exams are held during several periods
                each year, with English and German offered more frequently.
                Confirm the latest schedule and registration deadlines with the
                exam centre.
              </p>
            </article>
          </div>
        </section>

        <section className="bg-[#eef8f6] px-5 py-14 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-white p-7 shadow-sm sm:p-10 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">
                Prepare for your next step
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
                Ask Langma about ECL exam registration
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Contact us to confirm available languages, exam levels,
                locations, dates, fees, and registration requirements.
              </p>
            </div>
            <Link
              to="/contact/"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#102e36] px-6 py-3.5 font-bold text-white transition hover:bg-[#19434d]"
            >
              Contact Langma <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default ECLPage;
