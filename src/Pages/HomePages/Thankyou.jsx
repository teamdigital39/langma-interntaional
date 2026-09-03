import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Common/Header/Navbar';
import TopBar from '../../Components/Common/Header/TopBar';
import Footer from './Footer';

const LangmaThankYouPageMinimal = ({ 
  programmeType = 'residency',
  defaultLanguage = 'en'
}) => {
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });
    document.querySelectorAll('.slide-up').forEach((el) => observer.observe(el));
  }, []);

  const translations = {
    en: {
      thank_you: 'Thank You',
      message_residency: 'Your enquiry has been received. We\'re excited to guide you through your journey.',
      message_work: 'Your application has been received. We\'re ready to help you succeed.',
      message_study: 'Your enquiry has been received. We\'re excited to support your educational journey.',
      message_language: 'Your registration has been received. We look forward to helping you learn.',
      back_home: 'Return to Home',
      select_language: 'Language',
    },
    es: {
      thank_you: 'Gracias',
      message_residency: 'Hemos recibido tu solicitud. Estamos emocionados de guiarte en tu camino.',
      message_work: 'Hemos recibido tu solicitud. Estamos listos para ayudarte a tener éxito.',
      message_study: 'Hemos recibido tu solicitud. Estamos emocionados de apoyar tu viaje educativo.',
      message_language: 'Hemos recibido tu registro. Esperamos ayudarte a aprender.',
      back_home: 'Volver a Inicio',
      select_language: 'Idioma',
    },
    fr: {
      thank_you: 'Merci',
      message_residency: 'Nous avons reçu votre demande. Nous sommes ravis de vous guider dans votre parcours.',
      message_work: 'Nous avons reçu votre candidature. Nous sommes prêts à vous aider à réussir.',
      message_study: 'Nous avons reçu votre demande. Nous sommes ravis de soutenir votre parcours éducatif.',
      message_language: 'Nous avons reçu votre inscription. Nous sommes heureux de vous aider à apprendre.',
      back_home: 'Retour à l\'accueil',
      select_language: 'Langue',
    },
    de: {
      thank_you: 'Vielen Dank',
      message_residency: 'Wir haben Ihre Anfrage erhalten. Wir freuen uns, Sie auf Ihrer Reise zu begleiten.',
      message_work: 'Wir haben Ihre Bewerbung erhalten. Wir sind bereit, Ihnen zu helfen.',
      message_study: 'Wir haben Ihre Anfrage erhalten. Wir freuen uns, Ihre Reise zu unterstützen.',
      message_language: 'Wir haben Ihre Anmeldung erhalten. Wir freuen uns, Ihnen beim Lernen zu helfen.',
      back_home: 'Zur Startseite',
      select_language: 'Sprache',
    },
    pt: {
      thank_you: 'Obrigado',
      message_residency: 'Recebemos sua solicitação. Estamos animados para orientá-lo em sua jornada.',
      message_work: 'Recebemos sua candidatura. Estamos prontos para ajudá-lo a ter sucesso.',
      message_study: 'Recebemos sua solicitação. Estamos animados em apoiar sua jornada educacional.',
      message_language: 'Recebemos seu registro. Esperamos ajudá-lo a aprender.',
      back_home: 'Voltar para Home',
      select_language: 'Idioma',
    },
    it: {
      thank_you: 'Grazie',
      message_residency: 'Abbiamo ricevuto la tua richiesta. Siamo entusiasti di guidarti nel tuo percorso.',
      message_work: 'Abbiamo ricevuto la tua candidatura. Siamo pronti ad aiutarti a avere successo.',
      message_study: 'Abbiamo ricevuto la tua richiesta. Siamo entusiasti di supportare il tuo percorso educativo.',
      message_language: 'Abbiamo ricevuto la tua iscrizione. Non vediamo l\'ora di aiutarti a imparare.',
      back_home: 'Torna alla Home',
      select_language: 'Lingua',
    },
    nl: {
      thank_you: 'Dank u wel',
      message_residency: 'We hebben uw verzoek ontvangen. We kijken ernaar uit u op uw reis te begeleiden.',
      message_work: 'We hebben uw aanvraag ontvangen. We zijn klaar om u te helpen slagen.',
      message_study: 'We hebben uw verzoek ontvangen. We kijken ernaar uit uw educatieve reis te ondersteunen.',
      message_language: 'We hebben uw registratie ontvangen. We kijken ernaar uit u te helpen leren.',
      back_home: 'Terug naar Home',
      select_language: 'Taal',
    },
    ja: {
      thank_you: 'ありがとうございます',
      message_residency: 'お問い合わせを受け付けました。ご都合をお手伝いさせていただきます。',
      message_work: 'ご応募ありがとうございます。成功をお手伝いいたします。',
      message_study: 'お問い合わせを受け付けました。教育の旅をサポートさせていただきます。',
      message_language: 'ご登録ありがとうございます。学習をサポートさせていただきます。',
      back_home: 'ホームに戻る',
      select_language: '言語',
    },
    zh: {
      thank_you: '谢谢',
      message_residency: '我们已收到您的询问。我们很高兴为您的旅程提供指导。',
      message_work: '我们已收到您的申请。我们已准备好帮助您成功。',
      message_study: '我们已收到您的询问。我们很高兴支持您的教育之旅。',
      message_language: '我们已收到您的注册。我们很高兴帮助您学习。',
      back_home: '返回主页',
      select_language: '语言',
    },
    ko: {
      thank_you: '감사합니다',
      message_residency: '문의를 받았습니다. 여정을 안내하게 되어 기쁩니다.',
      message_work: '지원서를 받았습니다. 성공하도록 도와드리겠습니다.',
      message_study: '문의를 받았습니다. 교육 여정을 지원하게 되어 기쁩니다.',
      message_language: '등록을 받았습니다. 학습을 도와드리겠습니다.',
      back_home: '홈으로 돌아가기',
      select_language: '언어',
    },
    ar: {
      thank_you: 'شكراً',
      message_residency: 'تم استلام استفسارك. نحن متحمسون لإرشادك في رحلتك.',
      message_work: 'تم استلام طلبك. نحن مستعدون لمساعدتك على النجاح.',
      message_study: 'تم استلام استفسارك. نحن متحمسون لدعم رحلتك التعليمية.',
      message_language: 'تم استلام تسجيلك. نحن متحمسون لمساعدتك على التعلم.',
      back_home: 'العودة إلى الصفحة الرئيسية',
      select_language: 'اللغة',
    },
    ru: {
      thank_you: 'Спасибо',
      message_residency: 'Мы получили ваш запрос. Мы рады помочь вам в пути.',
      message_work: 'Мы получили вашу заявку. Мы готовы помочь вам добиться успеха.',
      message_study: 'Мы получили ваш запрос. Мы рады поддержать вашу образовательную путь.',
      message_language: 'Мы получили вашу регистрацию. Мы рады помочь вам учиться.',
      back_home: 'На главную',
      select_language: 'Язык',
    },
    tr: {
      thank_you: 'Teşekkür Ederiz',
      message_residency: 'Sorgunuz alındı. Yolculuğunuzda size rehberlik etmekten heyecanızız.',
      message_work: 'Başvurunuz alındı. Başarılı olmanıza yardımcı olmaya hazırız.',
      message_study: 'Sorgunuz alındı. Eğitim yolculuğunuzu desteklemekten heyecanızız.',
      message_language: 'Kaydınız alındı. Öğrenmenize yardımcı olmaktan mutluyuz.',
      back_home: 'Ana Sayfaya Dön',
      select_language: 'Dil',
    },
    pl: {
      thank_you: 'Dziękujemy',
      message_residency: 'Otrzymaliśmy Twoją zapytanie. Jesteśmy podekscytowani, aby poprowadzić Cię w Twojej podróży.',
      message_work: 'Otrzymaliśmy Twoją aplikację. Jesteśmy gotowi, aby pomóc Ci odnieść sukces.',
      message_study: 'Otrzymaliśmy Twoją zapytanie. Jesteśmy podekscytowani wsparciem Twojej drogi edukacyjnej.',
      message_language: 'Otrzymaliśmy Twoją rejestrację. Jesteśmy szczęśliwi, aby pomóc Ci się uczyć.',
      back_home: 'Wróć do Strony Głównej',
      select_language: 'Język',
    },
    sv: {
      thank_you: 'Tack',
      message_residency: 'Vi har mottagit din förfrågan. Vi är glada att vägleda dig på din resa.',
      message_work: 'Vi har mottagit din ansökan. Vi är redo att hjälpa dig lyckas.',
      message_study: 'Vi har mottagit din förfrågan. Vi är glada att stödja din utbildningsresa.',
      message_language: 'Vi har mottagit din registrering. Vi är glada att hjälpa dig lära dig.',
      back_home: 'Tillbaka till Startsida',
      select_language: 'Språk',
    },
    da: {
      thank_you: 'Tak',
      message_residency: 'Vi har modtaget din forespørgsel. Vi glæder os til at guide dig på din rejse.',
      message_work: 'Vi har modtaget din ansøgning. Vi er klar til at hjælpe dig med at få succes.',
      message_study: 'Vi har modtaget din forespørgsel. Vi glæder os til at støtte din uddannelsesrejse.',
      message_language: 'Vi har modtaget din registrering. Vi glæder os til at hjælpe dig med at lære.',
      back_home: 'Tilbage til Startside',
      select_language: 'Sprog',
    },
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'pt', name: 'Português' },
    { code: 'it', name: 'Italiano' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' },
    { code: 'ko', name: '한국어' },
    { code: 'ar', name: 'العربية' },
    { code: 'ru', name: 'Русский' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'pl', name: 'Polski' },
    { code: 'sv', name: 'Svenska' },
    { code: 'da', name: 'Dansk' },
  ];

  const getMessage = () => {
    const key = `message_${programmeType}`;
    return translations[language]?.[key] || translations['en'][key];
  };

  const t = (key) => translations[language]?.[key] || translations['en'][key];

  return (
    <>
      {/* HEADER */}
      <TopBar />
      <Navbar />

      {/* THANK YOU PAGE CONTENT - UNCHANGED */}
      <div className="langma-thank-you">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #F5F8F6; }
          
          .langma-thank-you {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #296166;
            background: #F5F8F6;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 30px;
            position: relative;
            overflow: hidden;
          }

          .langma-thank-you::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: 
              radial-gradient(circle at 20% 50%, rgba(47,199,161,0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(47,199,161,0.06) 0%, transparent 40%);
            z-index: 0;
            pointer-events: none;
            animation: gradientShift 8s ease-in-out infinite;
          }

          @keyframes gradientShift {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0.9; }
          }

          .thank-you-container {
            max-width: 800px;
            text-align: center;
            z-index: 2;
            position: relative;
          }

          .checkmark {
            font-size: 120px;
            display: block;
            margin-bottom: 40px;
            animation: bounceInScale 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
            opacity: 0;
          }

          @keyframes bounceInScale {
            0% {
              transform: scale(0) rotateZ(-45deg);
              opacity: 0;
            }
            50% {
              transform: scale(1.15);
            }
            100% {
              transform: scale(1) rotateZ(0deg);
              opacity: 1;
            }
          }

          .slide-up {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.22, 0.61, 0.36, 1), 
                        transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
          }

          .slide-up.in {
            opacity: 1;
            transform: translateY(0);
          }

          .slide-up:nth-child(2) {
            transition-delay: 0.2s;
          }

          .slide-up:nth-child(3) {
            transition-delay: 0.4s;
          }

          .slide-up:nth-child(4) {
            transition-delay: 0.6s;
          }

          .slide-up:nth-child(5) {
            transition-delay: 0.8s;
          }

          h1 {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: clamp(48px, 8vw, 96px);
            font-weight: 600;
            color: #296166;
            margin-bottom: 30px;
            letter-spacing: 1px;
            line-height: 1.1;
          }

          .message {
            font-size: clamp(18px, 3vw, 24px);
            color: #4C5C58;
            margin-bottom: 50px;
            max-width: 700px;
            line-height: 1.8;
            font-weight: 300;
            letter-spacing: 0.3px;
          }

          .language-selector {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
            margin-bottom: 50px;
            align-items: center;
          }

          .language-label {
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #6FE0C6;
          }

          .language-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
          }

          .lang-btn {
            padding: 10px 16px;
            border: 1.5px solid rgba(47,199,161,0.4);
            background: transparent;
            color: #296166;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
            font-family: 'Inter', sans-serif;
          }

          .lang-btn:hover {
            border-color: #6FE0C6;
            color: #6FE0C6;
            transform: translateY(-2px);
          }

          .lang-btn.active {
            background: #6FE0C6;
            color: #296166;
            border-color: #6FE0C6;
            box-shadow: 0 8px 20px rgba(47,199,161,0.25);
          }

          .cta-button {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 18px 40px;
            background: #6FE0C6;
            color: #296166;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.4px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
            position: relative;
            font-family: 'Inter', sans-serif;
          }

          .cta-button::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(111,224,198,0.2);
            border-radius: 4px;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
            z-index: -1;
          }

          .cta-button:hover::before {
            transform: scaleX(1);
          }

          .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 14px 30px rgba(47,199,161,0.28);
          }

          @media (max-width: 640px) {
            .langma-thank-you {
              padding: 30px 20px;
              min-height: 100vh;
            }

            h1 {
              font-size: clamp(36px, 7vw, 56px);
              margin-bottom: 24px;
            }

            .checkmark {
              font-size: 80px;
              margin-bottom: 30px;
            }

            .message {
              font-size: clamp(16px, 2.5vw, 20px);
              margin-bottom: 40px;
            }

            .language-selector {
              flex-direction: column;
              gap: 16px;
            }

            .language-buttons {
              width: 100%;
            }

            .lang-btn {
              flex: 1;
              min-width: 80px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation: none !important;
              transition: none !important;
            }

            .slide-up {
              opacity: 1;
              transform: none;
            }
          }
        `}</style>

        <div className="thank-you-container">
          <span className="checkmark">✓</span>
          
          <h1 className="slide-up">{t('thank_you')}</h1>
          
          <p className="message slide-up">{getMessage()}</p>

          <div className="language-selector slide-up">
            <span className="language-label">{t('select_language')}</span>
            <div className="language-buttons">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-btn ${language === lang.code ? 'active' : ''}`}
                  onClick={() => setLanguage(lang.code)}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <a href="/" className="cta-button slide-up">
            {t('back_home')} ↑
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default LangmaThankYouPageMinimal;
