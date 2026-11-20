import { createElement, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Building2,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Globe2,
  Languages,
  MessageSquareText,
  Network,
  Presentation,
  Target,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const businessImpacts = [
  { icon: MessageSquareText, title: "Technology & IT", description: "Practice project updates, client workshops, technical presentations and cross-border collaboration." },
  { icon: Building2, title: "Automotive & manufacturing", description: "Build confidence in supplier discussions, plant coordination, quality conversations and global partnerships." },
  { icon: Users, title: "Customer experience", description: "Support service, contact-centre and customer-facing teams with clearer everyday communication." },
  { icon: Target, title: "Sales & procurement", description: "Prepare teams for client meetings, product discussions, negotiations and international supplier relationships." },
  { icon: Presentation, title: "Leadership & people teams", description: "Strengthen communication for presentations, feedback, meetings and employee development." },
  { icon: Network, title: "Global project teams", description: "Help colleagues collaborate across roles, locations, cultures and time zones." },
];

const solutions = [
  { title: "Business English", text: "Meetings, presentations, business writing, negotiations and everyday workplace communication." },
  { title: "Professional communication", text: "Workplace conversations, email, telephone etiquette and communication with stakeholders." },
  { title: "Executive & leadership", text: "Executive presence, strategic presentations, boardroom communication and influence." },
  { title: "Sales & client communication", text: "Client introductions, discovery conversations, product explanations and follow-ups." },
  { title: "Customer service language", text: "Customer conversations, complaint handling, clarification and service vocabulary." },
  { title: "Cross-cultural communication", text: "Communication styles, business etiquette, feedback and collaboration across cultures." },
  { title: "International languages", text: "German, French, Spanish, Italian, Japanese, Korean, Chinese, Arabic and other languages, subject to availability." },
  { title: "English for specific purposes", text: "Role- and industry-focused English for areas such as technology, hospitality, healthcare and finance." },
];

const industries = [
  ["Technology & IT", "Global collaboration, client communication and technical presentations."],
  ["Automotive & mobility", "Supplier conversations, plant coordination, product discussions and international partner communication."],
  ["Manufacturing & logistics", "Technical communication and cross-border partner, supplier and customer conversations."],
  ["Shared services & customer support", "Clear, consistent communication across service teams, support centres and customer channels."],
  ["Hospitality & tourism", "Guest communication, service language and international customer interaction."],
  ["Healthcare", "Professional communication and patient-facing interactions."],
  ["Banking & finance", "Client communication, professional English and business conversations."],
  ["Education", "Academic communication, teaching, presentations and institutional interaction."],
  ["Retail & customer service", "Customer conversations, service language and relationship building."],
  ["Consulting", "Presentations, meetings, client communication and professional writing."],
];

const steps = [
  ["01", "Diagnose", "Understand business objectives, roles, markets, communication situations and current skill gaps."],
  ["02", "Design", "Build a curriculum around employee needs, proficiency levels and workplace outcomes."],
  ["03", "Deliver", "Teach through instructor-led sessions, workshops, coaching and interactive practice."],
  ["04", "Apply", "Rehearse the conversations employees need in real workplace situations."],
  ["05", "Measure", "Track progress with assessments, skill evaluations, participation and learner feedback."],
  ["06", "Improve", "Refine the program using learner progress and your organization's changing needs."],
];

const faqs = [
  ["What is corporate language training?", "It is customized language and communication development designed around workplace and organizational requirements."],
  ["Do you provide corporate English training?", "Yes. Business and professional English can be customized for different employee groups and workplace requirements."],
  ["Do you offer foreign-language training for companies?", "Programs can be designed around international language requirements, subject to language, faculty, location and program availability."],
  ["Can training be customized for our industry?", "Yes. Curriculum can be adapted to industry terminology, workplace situations and employee roles."],
  ["Can training be customized by employee level?", "Yes. Programs can be structured for beginner, intermediate, advanced, managerial, executive and specialist groups."],
  ["Do you assess employees before training?", "A diagnostic or language-level assessment can be incorporated, depending on organizational requirements."],
  ["Do you offer online corporate training?", "Yes. Live online training can support distributed and remote teams."],
  ["Do you offer classroom or hybrid programs?", "In-person delivery and a combination of online and classroom learning can be arranged, depending on location and program requirements."],
  ["Can you train senior executives?", "Yes. One-to-one executive communication and leadership-focused programs can be designed around specific requirements."],
  ["Can you train sales and customer service teams?", "Yes. Programs can focus on client conversations, presentations, negotiations, customer interactions and service language."],
  ["Can you provide cross-cultural communication training?", "Yes. Cross-cultural communication can be integrated into international business and global-team programs."],
  ["Can you prepare employees relocating abroad?", "Language and cultural preparation can support employees preparing for international assignments, subject to destination and language requirements."],
  ["Can you provide a customized corporate curriculum?", "Yes. Curriculum can be designed around organizational objectives, employee roles, proficiency levels and workplace communication requirements."],
  ["How is corporate training delivered?", "Programs may include classroom, online, hybrid, workshops, group training, intensive programs and one-to-one coaching."],
  ["Can training be conducted at our office?", "This can be arranged depending on location, trainer availability and program requirements."],
  ["Can we train multiple employee groups?", "Yes. Programs can be structured by department, role, proficiency level, seniority, location or business objective."],
  ["How do you measure training progress?", "Depending on the program, progress can be tracked through assessments, skill evaluations, practice performance, learner feedback and periodic reporting."],
  ["How can our organization get started?", "Start with a corporate consultation or needs assessment. Langma can understand your requirements and develop an appropriate training proposal."],
];

const consultationLink = "/contact/";

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className={`mx-auto mb-12 max-w-3xl text-center ${light ? "text-white" : "text-[#1B2B28]"}`}>
      <p className={`mb-3 text-xs font-extrabold uppercase tracking-[0.2em] ${light ? "text-[#6FE0C6]" : "text-[#296166]"}`}>{eyebrow}</p>
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className={`mt-4 text-base leading-7 sm:text-lg ${light ? "text-white/70" : "text-slate-600"}`}>{description}</p>}
    </div>
  );
}

function ConsultationLink({ children, secondary = false, className = "" }) {
  return (
    <Link
      to={consultationLink}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-200 ${
        secondary
          ? "border border-white/35 bg-white/5 text-white hover:bg-white/15"
          : "bg-[#2FC7A1] text-[#1A2540] shadow-lg shadow-[#2FC7A1]/20 hover:-translate-y-0.5 hover:bg-[#6FE0C6]"
      } ${className}`}
    >
      {children}
    </Link>
  );
}

function CorporateLanguageTraining() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="min-h-screen bg-[#F5F8F6] text-[#1B2B28]">
      <style>{`
        @keyframes corporate-enter {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes corporate-media-enter {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes corporate-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .corporate-hero-copy { animation: corporate-enter 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        .corporate-hero-media { animation: corporate-media-enter 850ms cubic-bezier(0.2, 0.8, 0.2, 1) 100ms both; }
        .corporate-float { animation: corporate-float 4.5s ease-in-out infinite; }
        .corporate-float-delayed { animation-delay: -2.25s; }
        .corporate-card { transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease; }
        .corporate-card:hover { transform: translateY(-5px); box-shadow: 0 16px 36px rgba(26, 37, 64, 0.1); }
        @media (prefers-reduced-motion: reduce) {
          .corporate-hero-copy, .corporate-hero-media, .corporate-float { animation: none; }
          .corporate-card { transition: none; }
        }
      `}</style>
      <Helmet>
        <title>Corporate Language Training | Langma International</title>
        <meta name="description" content="Enterprise language training for technology, automotive, manufacturing and customer-facing teams. Customize Business English and foreign-language programs around employee roles, levels and business needs." />
        <meta property="og:title" content="Corporate Language Training | Langma International" />
        <meta property="og:description" content="Role-based language programs for technology, automotive, manufacturing and customer-facing teams." />
      </Helmet>

      <section className="relative isolate overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute -right-24 -top-32 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#2FC7A1]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 -left-24 -z-10 h-80 w-80 rounded-full bg-[#4FA3D1]/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="corporate-hero-copy order-1">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-px w-7 bg-[#296166]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#296166]">Corporate language training · Enterprise teams</span>
            </div>
            <h1 className="max-w-[620px] text-4xl font-bold leading-[1.08] tracking-tight text-[#1A2027] sm:text-5xl lg:text-[56px]">
              Build <em className="text-[#4FA3D1]">language capability</em> across your global workforce.
            </h1>
            <p className="mt-5 max-w-[560px] text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Customized corporate language training for technology, automotive, manufacturing and customer-facing teams.
            </p>
            <p className="mt-3 max-w-[560px] leading-7 text-slate-600">
              Help employees communicate with confidence in meetings, client conversations, technical discussions and cross-border collaboration. Programs are shaped around job roles, language levels, locations and business priorities.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to={consultationLink} className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-full bg-[#1A2540] px-6 py-3 text-sm font-semibold tracking-wide text-[#F5F2EC] transition hover:scale-[1.02] hover:bg-[#243160] active:scale-[0.98]">
                Discuss Your Team’s Needs <ArrowRight size={17} />
              </Link>
              <a href="#programs" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#2FC7A1] bg-white px-6 py-3 text-sm font-semibold tracking-wide text-[#1A2540] transition hover:scale-[1.02] hover:bg-[#E6F8F3] active:scale-[0.98]">
                Explore Training Programs <ArrowDown size={16} className="text-[#2FC7A1]" />
              </a>
            </div>
          </div>

          <div className="corporate-hero-media relative order-2 mx-auto w-full max-w-[540px]">
            <div className="relative rounded-[26px] border-2 border-[#1A2027] bg-white p-2 shadow-xl">
              <div className="relative aspect-[4/3.2] overflow-hidden rounded-[18px] bg-[#F5F8F6]">
                <img
                  src="/images/Connecting Businesses to Global Opportunities.webp"
                  alt="International business professionals building cross-border partnerships"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2540]/75 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 right-5 text-xl font-bold text-white sm:text-2xl">Communication that moves business forward.</p>
              </div>
            </div>
            <div className="corporate-float absolute -left-3 top-5 flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-lg sm:-left-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E6F8F3] text-[#296166]"><MessageSquareText size={18} /></span>
              <span className="text-sm font-bold text-[#1A2540]">Workplace-ready communication</span>
            </div>
            <div className="corporate-float corporate-float-delayed absolute -bottom-4 right-2 flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-lg sm:-right-4">
              <span className="text-sm font-bold text-[#296166]">Global teams</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E6F8F3] text-[#296166]"><Globe2 size={18} /></span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeading eyebrow="Designed for enterprise teams" title="Training shaped around the work your people do." description="From technology projects to automotive operations, language learning is most useful when it reflects real roles, real conversations and the way your teams work." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businessImpacts.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className="corporate-card rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(15,42,68,0.04)] transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6F8F3] text-[#296166]">{createElement(Icon, { size: 22 })}</div>
              <p className="mb-2 text-xs font-extrabold tracking-widest text-[#296166]">0{index + 1}</p>
              <h3 className="text-lg font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-lg font-bold text-[#296166]">Better communication can enable better collaboration.</p>
      </section>

      <section id="programs" className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Enterprise training programs" title="A program for every team and communication goal." description="Build practical skills for everyday work—from business English and leadership communication to foreign languages and cross-cultural collaboration." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution, index) => (
              <article key={solution.title} className="corporate-card group rounded-2xl border border-slate-200 p-5 transition hover:border-[#2FC7A1] hover:bg-[#F5F8F6]">
                <span className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A2540] text-sm font-extrabold text-[#6FE0C6]">0{index + 1}</span>
                <h3 className="text-lg font-extrabold leading-snug">{solution.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{solution.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1A2540] px-5 py-20 text-white sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="A practical enterprise framework" title="One clear process. Tailored to each team." description="Align stakeholders on the need, shape learning around employee groups and review progress against agreed program goals." light />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map(([number, title, description], index) => (
              <article key={title} className="corporate-card relative rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <span className="text-sm font-extrabold text-[#6FE0C6]">{number}</span>
                <h3 className="mt-4 text-xl font-extrabold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{description}</p>
                {index < steps.length - 1 && <ArrowRight size={16} className="absolute -right-2 top-7 z-10 hidden text-[#6FE0C6] lg:block" />}
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60 sm:text-sm">
            <span>Business need</span><ArrowRight size={14} className="text-[#6FE0C6]" />
            <span>Skill development</span><ArrowRight size={14} className="text-[#6FE0C6]" />
            <span>Workplace application</span><ArrowRight size={14} className="text-[#6FE0C6]" />
            <span className="text-[#6FE0C6]">Business impact</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[#296166]">Plan for your workforce</p>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Start with your teams, locations and goals.</h2>
          <p className="mt-4 leading-7 text-slate-600">A focused needs assessment helps define the right learners, languages, workplace situations and delivery approach before a program is designed.</p>
          <Link to={consultationLink} className="mt-6 inline-flex items-center gap-2 font-bold text-[#296166] hover:text-[#1A2540]">Schedule a needs assessment <ArrowRight size={17} /></Link>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              ["Who?", "Which departments, roles or employee groups?"],
              ["Why?", "Which business goal or communication need?"],
              ["Where?", "Which offices, sites or work situations?"],
              ["With whom?", "Customers, colleagues, suppliers or partners?"],
              ["What?", "Which languages, levels and skills?"],
              ["When?", "What timeline, shifts or cohort schedule?"],
              ["How?", "Which online, on-site or hybrid format?"],
            ].map(([question, answer]) => (
              <div key={question} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-extrabold text-[#296166]">{question}</p>
                <p className="mt-1 text-sm leading-5 text-slate-600">{answer}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-[#E9F1EE] p-6 sm:p-9">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-white p-3 text-[#296166]"><Languages size={23} /></div>
            <div><p className="text-xs font-extrabold uppercase tracking-wider text-[#296166]">A curriculum that fits</p><h3 className="mt-1 text-xl font-extrabold">One organization. Different learning needs.</h3></div>
          </div>
          <div className="space-y-3">
            {[
              ["Role", "Technical, customer-facing, leadership, operations and support teams."],
              ["Level", "Learning pathways matched to employee proficiency."],
              ["Industry & market", "Relevant terminology and country- or region-specific needs."],
              ["Communication context", "Meetings, handovers, presentations, calls and customer conversations."],
              ["Business objective", "Team collaboration, service quality, international growth or employee development."],
            ].map(([label, text]) => (
              <div key={label} className="flex gap-3 rounded-xl bg-white p-4">
                <Check size={18} className="mt-0.5 shrink-0 text-[#296166]" />
                <p className="text-sm leading-6 text-slate-700"><strong className="text-[#1B2B28]">{label}:</strong> {text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F8F6] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Flexible for modern workforces" title="Learning that fits the way your teams work." description="Choose a delivery format around your people, locations and learning goals." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["In-person", "Instructor-led training at your organization or an appropriate Langma facility.", Building2],
              ["Live online", "Interactive virtual learning for distributed and remote teams.", Globe2],
              ["Hybrid", "A combination of classroom and online learning.", Network],
              ["Workshops", "Focused short-format communication interventions.", Presentation],
              ["One-to-one", "Personalized coaching for executives and specialist roles.", BriefcaseBusiness],
              ["Group programs", "Structured learning for cohorts, teams or departments.", Users],
              ["Intensive programs", "Accelerated preparation for specific business requirements.", BarChart3],
              ["Real-world practice", "Role plays, simulations, case discussions, meetings and client conversations.", MessageSquareText],
            ].map(([title, text, Icon]) => (
              <article key={title} className="corporate-card rounded-2xl bg-white p-5 shadow-sm">
                {createElement(Icon, { size: 22, className: "text-[#296166]" })}
                <h3 className="mt-4 font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeading eyebrow="Industry & team applications" title="Relevant communication for real work." description="From technology projects and customer support to automotive operations, programs can reflect the language needs of different industries, roles and locations." />
        <div className="grid gap-4 md:grid-cols-2">
          {industries.map(([title, description]) => (
            <div key={title} className="corporate-card flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F8F3] text-[#296166]"><BriefcaseBusiness size={19} /></div>
              <div><h3 className="font-extrabold">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{description}</p></div>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-3xl bg-[#E9F1EE] p-6 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#296166]">Who we can support</p><h3 className="mt-2 text-2xl font-extrabold">From frontline teams to senior leaders.</h3></div>
            <div className="flex flex-wrap gap-2">
              {["New hires", "Professionals", "Managers", "Senior leaders", "Technical teams", "Customer-facing teams", "Global teams"].map((group) => (
                <span key={group} className="rounded-full border border-[#296166]/15 bg-white px-3 py-2 text-xs font-bold text-[#174C4A]">{group}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[#296166]">Learning should be measurable</p>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">From training activity to capability development.</h2>
            <p className="mt-4 leading-7 text-slate-600">Measurement can be built around program objectives and may include initial assessment, participation, speaking and writing evaluations, practice performance, learner feedback and progress reports.</p>
            <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-[#1B2B28] sm:text-sm">
              {["Assess", "Train", "Practise", "Review", "Improve"].map((item, index) => <span key={item} className="flex items-center gap-2">{item}{index < 4 && <ArrowRight size={14} className="text-[#296166]" />}</span>)}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Business-aligned", "Begin with the organization's objectives."],
              ["Customized", "Build around people, roles and business situations."],
              ["Practical", "Focus on communication employees actually use."],
              ["Scalable", "Support individuals, teams and larger workforces."],
              ["Flexible", "Choose classroom, online, hybrid or coaching formats."],
              ["Multilingual", "Explore a broader portfolio of international languages."],
              ["Professional", "Go beyond grammar into workplace communication."],
              ["Global", "Prepare teams to work across markets and cultures."],
            ].map(([title, text]) => (
              <article key={title} className="corporate-card rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2 font-extrabold"><Check size={17} className="text-[#296166]" />{title}</div>
                <p className="mt-2 pl-6 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1A2540] px-5 py-16 text-center text-white sm:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[#6FE0C6]">A language partner, not just a training vendor</p>
          <h2 className="text-3xl font-extrabold leading-tight sm:text-5xl">Build a language program around your organization.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/70">Bring us your team structure, priority languages and workplace goals. We’ll work with you to explore a training approach that fits your people and business needs.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ConsultationLink>Talk to our corporate team <ArrowRight size={17} /></ConsultationLink>
            <ConsultationLink secondary>Request a training proposal</ConsultationLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeading eyebrow="Frequently asked questions" title="Corporate language training, explained." />
        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 sm:px-7">
          {faqs.map(([question, answer], index) => {
            const isOpen = openFaq === index;
            return (
              <div key={question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left"
                >
                  <span className="font-bold text-[#1B2B28]">{question}</span>
                  <ChevronDown size={19} className={`shrink-0 text-[#296166] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <p className="max-w-3xl pb-5 pr-8 text-sm leading-7 text-slate-600">{answer}</p>}
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">Langma International · Beyond Language. Beyond Borders.</p>
      </section>
    </main>
  );
}

export default CorporateLanguageTraining;
