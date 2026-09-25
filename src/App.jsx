import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
const Thankyou = lazy(() => import("./Pages/HomePages/Thankyou"));
import TopBar from "./Components/Common/Header/TopBar";
const HeroSection = lazy(() => import("./Pages/HomePages/HeroSection"));
const AboutHeroSection = lazy(() => import("./Pages/HomePages/Aboutpage/AboutHeroSection"));
import Footer from "./Pages/HomePages/Footer";
const AbrotHeroSection = lazy(() => import("./Components/Common/WorkAbrot/AbrotHeroSection"));
const StudyAbrotHeroSection = lazy(() => import("./Components/Common/StudyAbortSection/StudyAbrotHeroSection"));
// import InternationalHeroSection1 from "./Components/InternationlHeroSection/InternationalHeroSection1";
const GlobleHeroSection = lazy(() => import("./Components/GlobleHeroSection/GlobleHeroSection"));
import ScrollToTop from "./Pages/HomePages/Loader/ScrollToTop";
import Loader from "./Pages/HomePages/Loader/Loader";
const Investment = lazy(() => import("./Components/InvestmentPage/Investment"));
const Cultural_Programs = lazy(() => import("./Components/Cultural_Infusion_Programs/Cultural_Programs"));
const CulturalHolidays = lazy(() => import("./Components/Cultural Holidays/CulturalHolidays"));
const BusinessPrograms = lazy(() => import("./Components/Business Exchange Programs/BusinessPrograms"));
const Business_Delegation_Programs = lazy(() => import("./Components/Business Delegation Programs/Business_Delegation_Programs"));
const Lagmabusinesshub = lazy(() => import("./Components/LagmabusinessHub/Lagmabusinesshub"));
const Greece = lazy(() => import("./Components/Common/GracePages/Greece"));
const Cyprus = lazy(() => import("./Components/Common/Cyprus/Cyprus"));
const Latvia = lazy(() => import("./Components/Common/Latvia/Latvia"));
const Canada = lazy(() => import("./Components/Common/Canadapage/Canada"));
const UnitedStates = lazy(() => import("./Components/Common/UnitedStates Page/UnitedStates"));
const CostaRica = lazy(() => import("./Components/Common/CostaRica Page/CostaRica"));
const HongKong = lazy(() => import("./Components/Common/HongKong/HongKong"));
const Malaysia = lazy(() => import("./Components/Common/Malaysiapage/Malaysia"));
const Singapore = lazy(() => import("./Components/Common/SingaporePage/Singapore"));
const Thailand = lazy(() => import("./Components/Common/ThailandPage/Thailand"));
// import Australia from "./Components/Common/AustraliaPage/Australia";
const UnitedArabEmirates = lazy(() => import("./Components/Common/UnitedArabEmirates Page/UnitedArabEmirates"));
const Mauritius = lazy(() => import("./Components/Common/Mauritius Page/Mauritius"));
const Arabic = lazy(() => import("./Components/Common/ArabicPages/Arabic"));
const BalkanLanguage = lazy(() => import("./Components/Common/BalkanLanguage page/BalkanLanguage"));
const Chinese = lazy(() => import("./Components/Common/ChinesePage/Chinese"));
const Frame = lazy(() => import("./Components/Common/FramePage/Frame"));
const French = lazy(() => import("./Components/Common/FrenchPage/French"));
const German = lazy(() => import("./Components/Common/GermanPage/German"));
const Hindi = lazy(() => import("./Components/Common/HindiPage/Hindi"));
const ItalianLanguage = lazy(() => import("./Components/Common/ItalianLanguage Page/ItalianLanguage"));
const Japanese = lazy(() => import("./Components/Common/JapanesePage/Japanese"));
const Korean = lazy(() => import("./Components/Common/KoreanPage/Korean"));
const Russian = lazy(() => import("./Components/Common/RussianPage/Russian"));
const Persian = lazy(() => import("./Components/Common/PersianPage/Persian"));
const Polish = lazy(() => import("./Components/Common/PolishPage/Polish"));
const Sanskrit = lazy(() => import("./Components/Common/SanskritPage/Sanskrit"));
const Asia = lazy(() => import("./Components/Common/Asia/Asia"));
import Europe from "./Components/Common/Europe/Europe";
const Australia = lazy(() => import("./Components/Common/Aust/Australia"));
const America = lazy(() => import("./Components/Common/America/America"));
const BlogPage = lazy(() => import("./Pages/HomePages/BlogPage"));
const BlogDetailPage = lazy(() => import("./Pages/HomePages/BlogDetails"));
const Poland = lazy(() => import("./Pages/HomePages/Poland"));
import PopupForm from "./Components/PopupForm";
const ContactUs = lazy(() => import("./Pages/HomePages/ContactUs"));
const Career = lazy(() => import("./Pages/HomePages/Career"));
const Privacy = lazy(() => import("./Pages/HomePages/Privacy"));
const Payment = lazy(() => import("./Pages/HomePages/Payment"));
const Event = lazy(() => import("./Pages/HomePages/Event"));
const StudyNetherlandsPage = lazy(() => import("./Pages/HomePages/StudyInNetherlands"));
const StudyInSouthKorea = lazy(() => import("./Pages/HomePages/StudyInSouthKorea"));
const StudyMaltaPage = lazy(() => import("./Pages/HomePages/StudyInMalta"));
const Transcription = lazy(() => import("./Pages/HomePages/Transcription"));
const Translational = lazy(() => import("./Pages/HomePages/Translational"));
const Localization = lazy(() => import("./Pages/HomePages/Localization"));
const Multilanguage = lazy(() => import("./Pages/HomePages/Multilanguage"));
const Profreding = lazy(() => import("./Pages/HomePages/Profreding"));
const Voiceover = lazy(() => import("./Pages/HomePages/Voiceover"));
const Contentwriting = lazy(() => import("./Pages/HomePages/Contentwriting"));
const Dubbing = lazy(() => import("./Pages/HomePages/Dubbing"));
const Subtitle = lazy(() => import("./Pages/HomePages/Subtitle"));
const Workabroad = lazy(() => import("./Pages/HomePages/Workabroad"));
import FloatingCallButton from "./Components/Floatingcalbutton";
const Test = lazy(() => import("./Components/Common/Header/Test"));
const Termscondition = lazy(() => import("./Pages/HomePages/Termscondition"));
const Test1 = lazy(() => import("./Pages/HomePages/Test1"));
const StudyCyprusPage = lazy(() => import("./Pages/HomePages/StudyInCyprus"));
const Certificate = lazy(() => import("./Pages/HomePages/Certificate"));
const StudyDubaiPage = lazy(() => import("./Pages/HomePages/Studynew"));
const StudyPolandPage = lazy(() => import("./Pages/HomePages/StudyPolandPage"));
const StudyGeorgiaPage = lazy(() => import("./Pages/HomePages/StudyInGeorgia"));
const Investment1 = lazy(() => import("./Pages/HomePages/Investment1"));
const PRAssessment = lazy(() => import("./Pages/HomePages/PRAssessment"));
const StudyAbrotHeroSection1 = lazy(() => import("./Pages/HomePages/StudyAbrotHeroSection1"));
const GoldenVisaPage = lazy(() => import("./Pages/HomePages/GoldenVisa"));
const PortugalGoldenVisaPage = lazy(() => import("./Pages/HomePages/PortugalGoldenVis"));
const GreeceGoldenVisaPage = lazy(() => import("./Pages/HomePages/GreeceGoldenVisa"));
const ItalyGoldenVisaPage = lazy(() => import("./Pages/HomePages/ItalyGoldenVisa"));
const HungaryGoldenVisaPage = lazy(() => import("./Pages/HomePages/HungaryGoldenVisa"));
const UaeGoldenVisaPage = lazy(() => import("./Pages/HomePages/UAEGoldenVisa"));
const PanamaGoldenVisaPage = lazy(() => import("./Pages/HomePages/PanamaGoldenVisa"));
const LatviaGoldenVisaPage = lazy(() => import("./Pages/HomePages/LatviaGoldenVisa"));
const LangmaStudyAbroadAssessment = lazy(() => import("./Pages/HomePages/LangmaStudyAbroadAssessment"));
const InternationalHeroSection = lazy(() => import("./Pages/HomePages/InternationalHeroSection"));
const StudyMauritiusPage = lazy(() => import("./Pages/HomePages/StudyInMauritius"));
const StudySingaporePage = lazy(() => import("./Pages/HomePages/StudyInSingapore"));
const LangmaMaltaGlobalResidenceProgrammePage = lazy(() => import("./Pages/HomePages/MaltaGlobalResidenceProgrammePage"));
const LangmaMaltaPermanentResidenceProgrammePage = lazy(() => import("./Pages/HomePages/MaltaResidencyProgram"));
const AndorraPRPage = lazy(() => import("./Pages/HomePages/AndorraPR"));
const AustriaResidencePage = lazy(() => import("./Pages/HomePages/AustriaPR"));
const CyprusPRPage = lazy(() => import("./Pages/HomePages/CyprusPRPage"));
const LangmaEB5USAPage = lazy(() => import("./Pages/HomePages/EB5USA"));
const HungaryBusinessResidencyPage = lazy(() => import("./Pages/HomePages/HungaryBusiness"));
const HungaryWhiteCardPage = lazy(() => import("./Pages/HomePages/HungaryWhiteCard"));
const LangmaIndonesiaSecondHomeVisaPage = lazy(() => import("./Pages/HomePages/IndonesiaSecondHomeVisa"));
const ItalyDNVPage = lazy(() => import("./Pages/HomePages/ItalyDNV"));
const LangmaMaltaNomadPage = lazy(() => import("./Pages/HomePages/MaltaNomad"));
const PortugalGlobalTalentPage = lazy(() => import("./Pages/HomePages/PortugalGlobalTalent"));
const LangmaPortugalStartupVisaPage = lazy(() => import("./Pages/HomePages/PortugalStartup"));
const PortugalD7VisaPage = lazy(() => import("./Pages/HomePages/Portugal_D7"));
const PortugalD8Page = lazy(() => import("./Pages/HomePages/Portugal_D8"));
const SpainDNVPage = lazy(() => import("./Pages/HomePages/SpainDNV"));
const SpainNLVPage = lazy(() => import("./Pages/HomePages/SpainNLVPage"));
const SwitzerlandPRPage = lazy(() => import("./Pages/HomePages/SwitzerlandPR"));
const LangmaThailandEliteVisaPage = lazy(() => import("./Pages/HomePages/ThilandEliteVisa"));
const GoldenVisaAssessment = lazy(() => import("./Pages/HomePages/GoldenVisaAssessment"));
const AboutLangma = lazy(() => import("./Pages/HomePages/Aboutus"));
const EditorialPolicy = lazy(() => import("./Pages/HomePages/EditorialPolicy"));
const LearnGermanLanguage = lazy(() => import("./Pages/HomePages/LearnGermanLanguage"));
const LearnKoreanLanguage = lazy(() => import("./Pages/HomePages/LearnKoreanLanguage"));
const LearnJapaneseLanguage = lazy(() => import("./Pages/HomePages/LearnJapaneseLanguage"));
const LangmaFrenchCourse = lazy(() => import("./Pages/HomePages/LangmaFrenchCourse"));
const LangmaChineseCourse = lazy(() => import("./Pages/HomePages/LangmaChineseCourse"));

const TranslationServices = lazy(() => import("./Pages/HomePages/TranslationServices"));
const HomeLangma = lazy(() => import("./Pages/HomePages/Homepage"));
const SuccessStories = lazy(() => import("./Pages/HomePages/SuccessStories"));
import {
  GOOGLE_ADS_ID,
  GOOGLE_ANALYTICS_ID,
  GTM_ID,
  STANDALONE_LANDING_ROUTES,
} from "./standaloneLandingRoutes";

function StandaloneLandingGtm() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });

    const existingGtmScript = document.querySelector(`script[data-gtm-id="${GTM_ID}"]`);
    if (!existingGtmScript) {
      const gtmScript = document.createElement("script");
      gtmScript.async = true;
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      gtmScript.setAttribute("data-gtm-id", GTM_ID);
      document.head.appendChild(gtmScript);
    }

    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };

    const existingAdsScript = document.querySelector(
      `script[data-google-ads-id="${GOOGLE_ADS_ID}"]`
    );
    if (!existingAdsScript) {
      const adsScript = document.createElement("script");
      adsScript.async = true;
      adsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
      adsScript.setAttribute("data-google-ads-id", GOOGLE_ADS_ID);
      document.head.appendChild(adsScript);
    }

    if (!window.__langmaTrackingConfigured) {
      window.gtag("js", new Date());
      window.gtag("config", GOOGLE_ADS_ID);
      window.gtag("config", GOOGLE_ANALYTICS_ID);
      window.__langmaTrackingConfigured = true;
    }
  }, []);

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const normalizedPathname = location.pathname.replace(/\/+$/, "") || "/";
  const isStandaloneLanding = STANDALONE_LANDING_ROUTES.includes(normalizedPathname);

  // Show branded loader only on first paint — not on every Link navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
    <div className="w-full overflow-x-hidden">
      {!isStandaloneLanding && <TopBar />}
      <ScrollToTop />
      {!isStandaloneLanding && <FloatingCallButton />}
      {!isStandaloneLanding && loading && <Loader />}
      {isStandaloneLanding && <StandaloneLandingGtm />}

      <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center" role="status">Loading page…</div>}>

        <Routes>
          {/* <Route path="/" element={<HeroSection />} /> */}
          <Route path="/" element={<HomeLangma />} />
          {/* <Route path="/about" element={<AboutHeroSection />} />*/}
          <Route path="/about" element={<AboutLangma />} />
          <Route path="/editorial-policy" element={<EditorialPolicy />} />
          <Route path="/work-abroad" element={<AbrotHeroSection />} />
          {/* <Route path="/study-abroad" element={<StudyAbrotHeroSection />} /> */}
          <Route path="/study-abroad" element={<StudyAbrotHeroSection1 />} />
          {/* <Route path="/languages" element={<InternationalHeroSection />} /> */}
          <Route path="/global-assist" element={<GlobleHeroSection />} />
          <Route path="/golden-visa" element={<GoldenVisaPage />} />
          <Route path="/portugal-golden-visa" element={<PortugalGoldenVisaPage />} />
          <Route path="/greece-golden-visa" element={<GreeceGoldenVisaPage />} />
          <Route path="/italy-golden-visa" element={<ItalyGoldenVisaPage />} />
          <Route path="/hungary-golden-visa" element={<HungaryGoldenVisaPage />} />
          <Route path="/uae-golden-visa" element={<UaeGoldenVisaPage />} />
          <Route path="/panama-golden-visa" element={<PanamaGoldenVisaPage />} />
          <Route path="/latvia-golden-visa" element={<LatviaGoldenVisaPage />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/programs" element={<Cultural_Programs />} />
          <Route path="/holidays" element={<CulturalHolidays />} />
          <Route path="/business_Programs" element={<BusinessPrograms />} />
          <Route path="/business_delegation_programs" element={<Business_Delegation_Programs />} />
          <Route path="/lagmabusinesshub" element={<Lagmabusinesshub />} />
          <Route path="/greece" element={<Greece />} />
          <Route path="/cyprus" element={<Cyprus />} />
          <Route path="/latvia" element={<Latvia />} />
          <Route path="/canada" element={<Canada />} />
          <Route path="/unitedstate" element={<UnitedStates />} />
          <Route path="/costaRica" element={<CostaRica />} />
          <Route path="/hongkong" element={<HongKong />} />
          <Route path="/malasiya" element={<Malaysia/>} />
          <Route path="/singapore" element={<Singapore/>} />
          <Route path="/thailand" element={<Thailand/>} />
          <Route path="/australia" element={<Australia/>} />
          <Route path="/unitedarab" element={<UnitedArabEmirates/>} />
          <Route path="/mauritius" element={<Mauritius/>} />
          <Route path="/balkan-language" element={<BalkanLanguage/>} />
          <Route path="/chinese" element={<Chinese/>} />
          <Route path="/frame" element={<Frame/>} />
          <Route path="/french" element={<French/>} />
          <Route path="/german" element={<German/>} />
          <Route path="/hind" element={<Hindi/>} />
          <Route path="/online-italian-la" element={<ItalianLanguage/>} />
          <Route path="/online-japanese-la" element={<Japanese/>} />
          <Route path="/online-ko" element={<Korean/>} />
          <Route path="/russian" element={<Russian/>} />
          <Route path="/persian" element={<Persian/>} />
          <Route path="/polish" element={<Polish/>} />
          <Route path="/sanskrit" element={<Sanskrit/>} />
          <Route path="/asia" element={<Asia/>} />
          <Route path="/europe" element ={<Europe/>} />
          <Route path="/aust" element={<Australia/>} />
          <Route path="/america" element={<America/>} />
          <Route path="/blog" element={<BlogPage/>} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/blog-detail/:slug" element={<BlogDetailPage />} />
          {/* <Route path="/poland" element={<Poland/>} /> */}
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/career" element={<Career/>} />
          <Route path="/privacy-policy" element={<Privacy/>} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/events" element={<Event />} />
          <Route path="/transcription" element={<Transcription />} />
          <Route path="/translational" element={<Translational />} />
          <Route path="/localization" element={<Localization />} />
          <Route path="/multilanguage" element={<Multilanguage />} />
          <Route path="/profreding" element={<Profreding />} />
          <Route path="/voiceover" element={<Voiceover />} />
          <Route path="/content-writing" element={<Contentwriting />} />
          <Route path="/dubbing" element={<Dubbing />} />
          <Route path="/subtitle" element={<Subtitle />} />
          <Route path="/work-abroad1" element={<Workabroad />} />
          <Route
  path="/course-details/:languageSlug/:courseSlug"
  element={<Test />}
/>
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/terms-and-conditions" element={<Termscondition />} />
          <Route path="/tt" element={<Test1 />} />
          <Route path="/dubai" element={<StudyDubaiPage />} />
          <Route path="/poland" element={<StudyPolandPage />} />
          <Route path="/pr-by-investment" element={<Investment1/>} />
          <Route path="/assessment" element={<PRAssessment />} />
          <Route path="/study-assessment" element={<LangmaStudyAbroadAssessment />} />
          {/* <Route path="/jkl" element={<StudyAbrotHeroSection1 />} /> */}
          <Route path="/languages" element={<InternationalHeroSection />} />
          <Route path="/netherland" element={<StudyNetherlandsPage />} />
          <Route path="/south-korea" element={<StudyInSouthKorea />} />
          <Route path="/malta" element={<StudyMaltaPage />} />
          <Route path="/study-in-mauritius" element={<StudyMauritiusPage />} />
          <Route path="/study-in-singapore" element={<StudySingaporePage/>} />
          {/* <Route path="/dubai" element={<StudyDubaiPage />} /> */}
          <Route path="/georgia" element={<StudyGeorgiaPage />} />
          <Route path="/study-in-cyprus" element={<StudyCyprusPage />} />
          <Route path="/malta-global" element={<LangmaMaltaGlobalResidenceProgrammePage />} />
          <Route path="/malta-residency" element={<LangmaMaltaPermanentResidenceProgrammePage />} />
          <Route path="/malta-nomad" element={<LangmaMaltaNomadPage />} />
          <Route path="/cyprus-pr" element={<CyprusPRPage />} />
          <Route path="/andorra-residency" element={<AndorraPRPage />} />
          <Route path="/portugal-d7" element={<PortugalD7VisaPage />} />
          <Route path="/portugal-d8" element={<PortugalD8Page />} />
          <Route path="/portugal-startup-visa" element={<LangmaPortugalStartupVisaPage />} />
          <Route path="/portugal-global-talent" element={<PortugalGlobalTalentPage />} />
          <Route path="/spain-nlv" element={<SpainNLVPage />} />
          <Route path="/spain-digital-nomad" element={<SpainDNVPage />} />
          <Route path="/italy-digital-nomad" element={<ItalyDNVPage />} />
          <Route path="/austria-residency" element={<AustriaResidencePage />} />
          <Route path="/switzerland-residency" element={<SwitzerlandPRPage />} />
          <Route path="/hungary-white-card" element={<HungaryWhiteCardPage />} />
          <Route path="/hungary-business-residency" element={<HungaryBusinessResidencyPage />} />
          <Route path="/eb5-usa" element={<LangmaEB5USAPage />} />
          <Route path="/indonesia-second-home-visa" element={<LangmaIndonesiaSecondHomeVisaPage />} />
          <Route path="/thailand-elite-visa" element={<LangmaThailandEliteVisaPage />} />
          <Route path="/learn-german-language" element={<LearnGermanLanguage />} />
          <Route path="/learn-korean-language" element={<LearnKoreanLanguage />} />
          <Route path="/learn-japanese-language" element={<LearnJapaneseLanguage />} />
          <Route path="/learn-french-language" element={<LangmaFrenchCourse />} />
        <Route path="/learn-chinese-language" element={<LangmaChineseCourse />} />

          <Route path="/translation-services" element={<TranslationServices />} />
          <Route path="/:slug" element={<Arabic/>} />
          <Route path="/golden-visa-assessment" element={<GoldenVisaAssessment/>} />
        <Route path="/thank-you" element={<Thankyou />} />
          {/* <Route path="/newhome" element={<HomeLangma/>} /> */}
          </Routes>
        </Suspense>
      {!isStandaloneLanding && <Footer />}
      </div>
    </HelmetProvider>
  );
}

export default App;
