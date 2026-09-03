import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import Thankyou from "./Pages/HomePages/Thankyou";
import TopBar from "./Components/Common/Header/TopBar";
import HeroSection from "./Pages/HomePages/HeroSection";
import AboutHeroSection from "./Pages/HomePages/Aboutpage/AboutHeroSection";
import Footer from "./Pages/HomePages/Footer";
import AbrotHeroSection from "./Components/Common/WorkAbrot/AbrotHeroSection";
import StudyAbrotHeroSection from "./Components/Common/StudyAbortSection/StudyAbrotHeroSection";
// import InternationalHeroSection1 from "./Components/InternationlHeroSection/InternationalHeroSection1";
import GlobleHeroSection from "./Components/GlobleHeroSection/GlobleHeroSection";
import ScrollToTop from "./Pages/HomePages/Loader/ScrollToTop";
import Loader from "./Pages/HomePages/Loader/Loader";
import Investment from "./Components/InvestmentPage/Investment";
import Cultural_Programs from "./Components/Cultural_Infusion_Programs/Cultural_Programs";
import CulturalHolidays from "./Components/Cultural Holidays/CulturalHolidays";
import BusinessPrograms from "./Components/Business Exchange Programs/BusinessPrograms";
import Business_Delegation_Programs from "./Components/Business Delegation Programs/Business_Delegation_Programs";
import Lagmabusinesshub from "./Components/LagmabusinessHub/Lagmabusinesshub";
import Greece from "./Components/Common/GracePages/Greece";
import Cyprus from "./Components/Common/Cyprus/Cyprus";
import Latvia from "./Components/Common/Latvia/Latvia";
import Canada from "./Components/Common/Canadapage/Canada";
import UnitedStates from "./Components/Common/UnitedStates Page/UnitedStates";
import CostaRica from "./Components/Common/CostaRica Page/CostaRica";
import HongKong from "./Components/Common/HongKong/HongKong";
import Malaysia from "./Components/Common/Malaysiapage/Malaysia";
import Singapore from "./Components/Common/SingaporePage/Singapore";
import Thailand from "./Components/Common/ThailandPage/Thailand";
// import Australia from "./Components/Common/AustraliaPage/Australia";
import UnitedArabEmirates from "./Components/Common/UnitedArabEmirates Page/UnitedArabEmirates";
import Mauritius from "./Components/Common/Mauritius Page/Mauritius";
import Arabic from "./Components/Common/ArabicPages/Arabic";
import BalkanLanguage from "./Components/Common/BalkanLanguage page/BalkanLanguage";
import Chinese from "./Components/Common/ChinesePage/Chinese";
import Frame from "./Components/Common/FramePage/Frame";
import French from "./Components/Common/FrenchPage/French";
import German from "./Components/Common/GermanPage/German";
import Hindi from "./Components/Common/HindiPage/Hindi";
import ItalianLanguage from "./Components/Common/ItalianLanguage Page/ItalianLanguage";
import Japanese from "./Components/Common/JapanesePage/Japanese";
import Korean from "./Components/Common/KoreanPage/Korean";
import Russian from "./Components/Common/RussianPage/Russian";
import Persian from "./Components/Common/PersianPage/Persian";
import Polish from "./Components/Common/PolishPage/Polish";
import Sanskrit from "./Components/Common/SanskritPage/Sanskrit";
import Asia from "./Components/Common/Asia/Asia";
import Europe from "./Components/Common/Europe/Europe";
import Australia from "./Components/Common/Aust/Australia";
import America from "./Components/Common/America/America";
import BlogPage from "./Pages/HomePages/BlogPage";
import BlogDetailPage from "./Pages/HomePages/BlogDetails";
import Poland from "./Pages/HomePages/Poland";
import PopupForm from "./Components/PopupForm";
import ContactUs from "./Pages/HomePages/ContactUs";
import Career from "./Pages/HomePages/Career";
import Privacy from "./Pages/HomePages/Privacy";
import Payment from "./Pages/HomePages/Payment";
import Event from "./Pages/HomePages/Event";
import StudyNetherlandsPage from "./Pages/HomePages/StudyInNetherlands";
import StudyInSouthKorea from "./Pages/HomePages/StudyInSouthKorea";
import StudyMaltaPage from "./Pages/HomePages/StudyInMalta";
import Transcription from "./Pages/HomePages/Transcription";
import Translational from "./Pages/HomePages/Translational";
import Localization from "./Pages/HomePages/Localization";
import Multilanguage from "./Pages/HomePages/Multilanguage";
import Profreding from "./Pages/HomePages/Profreding";
import Voiceover from "./Pages/HomePages/Voiceover";
import Contentwriting from "./Pages/HomePages/Contentwriting";
import Dubbing from "./Pages/HomePages/Dubbing";
import Subtitle from "./Pages/HomePages/Subtitle";
import Workabroad from "./Pages/HomePages/Workabroad";
import FloatingCallButton from "./Components/Floatingcalbutton";
import Test from "./Components/Common/Header/Test";
import Termscondition from "./Pages/HomePages/Termscondition";
import Test1 from "./Pages/HomePages/Test1";
import StudyCyprusPage from "./Pages/HomePages/StudyInCyprus";
import Certificate from "./Pages/HomePages/Certificate";
import StudyDubaiPage from "./Pages/HomePages/Studynew";
import StudyPolandPage from "./Pages/HomePages/StudyPolandPage";
import StudyGeorgiaPage from "./Pages/HomePages/StudyInGeorgia";
import Investment1 from "./Pages/HomePages/Investment1";
import PRAssessment from "./Pages/HomePages/PRAssessment";
import StudyAbrotHeroSection1 from "./Pages/HomePages/StudyAbrotHeroSection1";
import GoldenVisaPage from "./Pages/HomePages/GoldenVisa";
import PortugalGoldenVisaPage from "./Pages/HomePages/PortugalGoldenVis";
import GreeceGoldenVisaPage from "./Pages/HomePages/GreeceGoldenVisa";
import ItalyGoldenVisaPage from "./Pages/HomePages/ItalyGoldenVisa";
import HungaryGoldenVisaPage from "./Pages/HomePages/HungaryGoldenVisa";
import UaeGoldenVisaPage from "./Pages/HomePages/UAEGoldenVisa";
import PanamaGoldenVisaPage from "./Pages/HomePages/PanamaGoldenVisa";
import LatviaGoldenVisaPage from "./Pages/HomePages/LatviaGoldenVisa";
import LangmaStudyAbroadAssessment from "./Pages/HomePages/LangmaStudyAbroadAssessment";
import InternationalHeroSection from "./Pages/HomePages/InternationalHeroSection";
import StudyMauritiusPage from "./Pages/HomePages/StudyInMauritius";
import StudySingaporePage from "./Pages/HomePages/StudyInSingapore";
import LangmaMaltaGlobalResidenceProgrammePage from "./Pages/HomePages/MaltaGlobalResidenceProgrammePage";
import LangmaMaltaPermanentResidenceProgrammePage from "./Pages/HomePages/MaltaResidencyProgram";
import AndorraPRPage from "./Pages/HomePages/AndorraPR";
import AustriaResidencePage from "./Pages/HomePages/AustriaPR";
import CyprusPRPage from "./Pages/HomePages/CyprusPRPage";
import LangmaEB5USAPage from "./Pages/HomePages/EB5USA";
import HungaryBusinessResidencyPage from "./Pages/HomePages/HungaryBusiness";
import HungaryWhiteCardPage from "./Pages/HomePages/HungaryWhiteCard";
import LangmaIndonesiaSecondHomeVisaPage from "./Pages/HomePages/IndonesiaSecondHomeVisa";
import ItalyDNVPage from "./Pages/HomePages/ItalyDNV";
import LangmaMaltaNomadPage from "./Pages/HomePages/MaltaNomad";
import PortugalGlobalTalentPage from "./Pages/HomePages/PortugalGlobalTalent";
import LangmaPortugalStartupVisaPage from "./Pages/HomePages/PortugalStartup";
import PortugalD7VisaPage from "./Pages/HomePages/Portugal_D7";
import PortugalD8Page from "./Pages/HomePages/Portugal_D8";
import SpainDNVPage from "./Pages/HomePages/SpainDNV";
import SpainNLVPage from "./Pages/HomePages/SpainNLVPage";
import SwitzerlandPRPage from "./Pages/HomePages/SwitzerlandPR";
import LangmaThailandEliteVisaPage from "./Pages/HomePages/ThilandEliteVisa";
import GoldenVisaAssessment from "./Pages/HomePages/GoldenVisaAssessment";
import AboutLangma from "./Pages/HomePages/Aboutus";
import LearnGermanLanguage from "./Pages/HomePages/LearnGermanLanguage";
import LearnKoreanLanguage from "./Pages/HomePages/LearnKoreanLanguage";
import LearnJapaneseLanguage from "./Pages/HomePages/LearnJapaneseLanguage";
import TranslationServices from "./Pages/HomePages/TranslationServices";
import HomeLangma from "./Pages/HomePages/Homepage";

const STANDALONE_LANDING_ROUTES = [
  "/learn-german-language",
  "/learn-korean-language",
  "/learn-japanese-language",
  "/translation-services",
];

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const isStandaloneLanding = STANDALONE_LANDING_ROUTES.includes(location.pathname);

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

      <Routes>
          {/* <Route path="/" element={<HeroSection />} /> */}
          <Route path="/" element={<HomeLangma />} />
          {/* <Route path="/about" element={<AboutHeroSection />} />*/}
          <Route path="/about" element={<AboutLangma />} />
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
          <Route path="/translation-services" element={<TranslationServices />} />
          <Route path="/:slug" element={<Arabic/>} />
          <Route path="/golden-visa-assessment" element={<GoldenVisaAssessment/>} />
        <Route path="/thank-you" element={<Thankyou />} />
          {/* <Route path="/newhome" element={<HomeLangma/>} /> */}
        </Routes>
      {!isStandaloneLanding && <Footer />}
      </div>
    </HelmetProvider>
  );
}

export default App;
