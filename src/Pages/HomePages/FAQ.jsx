import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [ { question: "HOW CAN I ENROL ON A PROGRAMME?", answer: "To enroll in a programme, please ensure that you have filled out our online application form here. Once the form is submitted, we will contact you to confirm the programme and arrange payment", }, { question: "HOW TO MAKE THE PAYMENT?", answer: "The payment can be made by Cards (Credit/Debit) or Bank transfer to our account. To make a Credit Card/Debit card payment online Click here. If you face any difficulties whilst making a payment, please call us or send an email and we will be happy to help with the process.", }, { question: "WHAT PROGRAMME SHALL I CHOOSE?", answer: "Langma International offers a wide range of programmes. If you face any difficulties whilst choosing a programme, please call us or send an email and we will be happy to offer you brief counseling.", }, { question: "STUDY MATERIALS ARE INCLUDED IN THE PROGRAMME?", answer: "Yes, study materials are included in the programme fees. Once the payment is made, students would receive a course book. If students need some supplementary books, an additional fee would be charged.", }, { question: "DO I RECEIVE A CERTIFICATE AT THE END OF PROGRAMME?", answer: "Students are rewarded with a certificate for their programme after the successful completion of the course.", }, { question: "HOW MANY STUDENTS ARE THERE IN A BATCH?", answer: "The average class size at Langma International is 5 students, and the maximum number of students per class is 9.", }, { question: "WHAT IS THE TIME AND MODE OF STUDY?", answer: "The timetable of programme is designed by our Student Liaison Officer (Morning, Afternoon, or Evening (7.00 am – 9.00 pm). Our programmes are offered online and classroom, tailored to suit the specific needs.", }, ];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  /* ✅ Handle BOTH links */
  const renderAnswer = (text) => {
    // Case 1: Click here → /payment
    if (text.includes("Click here")) {
      const parts = text.split("Click here");

      return (
        <>
          {parts[0]}
          <Link
            to="/payment"
            className="text-blue-600 font-semibold underline hover:text-blue-800"
          >
            Click here
          </Link>
          {parts[1]}
        </>
      );
    }

    // Case 2: here → /contact
    if (text.includes("form here")) {
      const parts = text.split("here");

      return (
        <>
          {parts[0]}
          <Link
            to="/contact"
            className="text-blue-600 font-semibold underline hover:text-blue-800"
          >
            here
          </Link>
          {parts[1]}
        </>
      );
    }

    return text;
  };

  return (
    <section className="max-w-4xl mx-auto py-4 pt-10 px-4">
      <h2 className="text-[28px] lg:text-[32px] font-bold text-center mb-5 text-[#296166]">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`bg-[#F6F6F6] rounded-xl p-5 transition-all duration-300 ${
              openIndex === index ? "shadow-md" : ""
            }`}
          >
            <div
              className="flex justify-between items-center gap-3 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-[#4D5756] font-semibold text-sm md:text-[17px] flex-1">
                {faq.question}
              </h3>

              {/* ✅ ICON FIXED */}
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full border border-gray-400 hover:bg-gray-200 transition">
                {openIndex === index ? (
                  <ChevronUp className="w-4 h-4 text-gray-800" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-800" />
                )}
              </div>
            </div>

            {openIndex === index && (
              <p className="mt-3 text-gray-700 text-sm md:text-[13px] leading-relaxed">
                {renderAnswer(faq.answer)}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;