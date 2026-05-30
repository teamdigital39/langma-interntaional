import React from "react";

function Termscondition() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO SECTION */}
      <div className="relative w-full h-[300px] sm:h-[400px]">
        <img
          src="/images/terms.webp"
          alt="Terms and Conditions"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl sm:text-5xl font-bold text-center">
            Terms & Conditions
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 py-14">

        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10">

          <h2 className="text-3xl font-bold text-[#2f5f67] mb-6">
            TERMS & CONDITIONS
          </h2>

          <p className="text-gray-700 leading-8 mb-8">
            These are the terms & conditions governed and adopted at
            Langma International that bind the student and school when a
            student enrolls in a programme.
          </p>

          {/* Admission Criteria */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-[#2f5f67] mb-4">
              Admission Criteria
            </h3>

            <p className="text-gray-700 leading-8 mb-4">
              The main aim of the Admission policy of Langma International is
              to admit students irrespective of social, racial, religious,
              and other considerations.
            </p>

            <p className="text-gray-700 leading-8 mb-4">
              Application for admission can be made directly at Langma
              International. Application forms are available from reception
              or by contacting the counseling desk.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-3">
              Students enrolling in any programme must:
            </h4>

            <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-2">
              <li>Have an interest to pursue the programme</li>
              <li>Have completed the application form</li>
              <li>Have a valid ID card or passport</li>
              <li>Have taken the placement test</li>
              <li>
                Students applying for a programme are required to make
                payment before the programme commences in order to reserve
                a place
              </li>
            </ul>
          </div>

          {/* Programme Placement */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-[#2f5f67] mb-4">
              Programme Placement and Induction
            </h3>

            <p className="text-gray-700 leading-8 mb-4">
              Students must attend an induction session after enrolment
              which is intended to introduce key personnel, programme, and
              certification information. Students will also be informed
              about punctuality policies and other rules of Langma
              International.
            </p>

            <p className="text-gray-700 leading-8 mb-4">
              The Placement of a student at a particular level is made by
              Langma International based on a written test and short
              interview. Langma International employs reasonable endeavors
              to accommodate students according to their study level.
            </p>

            <p className="text-gray-700 leading-8">
              Langma International assures that there are no more than
              10 students in any programme including intensive and
              extensive training sessions.
            </p>
          </div>

          {/* Assessments */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-[#2f5f67] mb-4">
              Assessments and Examinations
            </h3>

            <p className="text-gray-700 leading-8 mb-4">
              Langma International offers ongoing formative and summative
              assessments throughout all programmes. Teachers incorporate
              authentic and official exam preparation content into their
              classes and offer guidelines for self-study.
            </p>

            <p className="text-gray-700 leading-8 mb-4">
              Students must understand that exams are mandatory to obtain
              certification and they are required to sit for the exam.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-3">
              Exams Prepared & Registered By Langma International:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 leading-8">
              <div>
                <p><strong>English:</strong> IELTS, TOEFL, PTE, OET, GRE, SAT, GMAT, CELPIP</p>
                <p><strong>German:</strong> GOETHE, TELC</p>
                <p><strong>French:</strong> DELF, TEF, DALF, TCF</p>
                <p><strong>Spanish:</strong> SIELE, DELE</p>
              </div>

              <div>
                <p><strong>Italian:</strong> CILS, CELI</p>
                <p><strong>Russian:</strong> TORFL</p>
                <p><strong>Portuguese:</strong> CAPLE</p>
                <p><strong>Chinese:</strong> HSK</p>
                <p><strong>Korean:</strong> TOPIK</p>
                <p><strong>Japanese:</strong> JLPT</p>
              </div>
            </div>
          </div>

          {/* Holiday */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-[#2f5f67] mb-4">
              Holiday and Unscheduled Leave
            </h3>

            <p className="text-gray-700 leading-8 mb-4">
              No classes are held on public holidays; however, Langma
              International makes reasonable endeavors to offer extra
              sessions if classes fall on public holidays.
            </p>

            <p className="text-gray-700 leading-8 mb-4">
              No unauthorized leave is permitted except in documented
              cases of health complications, close family bereavement,
              or legal issues.
            </p>

            <p className="text-gray-700 leading-8">
              Students who are sick must inform the counseling desk by
              phone or email if they cannot attend class.
            </p>
          </div>

          {/* Attendance */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-[#2f5f67] mb-4">
              Attendance, Punctuality, Safety & Behaviour Policy
            </h3>

            <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-3">
              <li>
                Students are advised to attend classes on time.
              </li>

              <li>
                A 15-minute grace period is allowed after which students
                may not be permitted to enter class.
              </li>

              <li>
                Frequent absences may result in verbal warnings,
                written warnings, and possible expulsion.
              </li>

              <li>
                Bullying, discrimination, and victimization are not tolerated.
              </li>

              <li>
                Alcohol, smoking, and intoxicating substances are strictly
                prohibited on school premises.
              </li>

              <li>
                Students are liable for damages caused to school property.
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-[#2f5f67] mb-4">
              Payment Methods
            </h3>

            <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-3">
              <li>
                Payments can be made through Bank Transfer,
                Credit/Debit Card, or Cheque.
              </li>

              <li>
                Full fees must be submitted before commencement of the programme.
              </li>

              <li>
                Bank Transfer or Credit/Debit Card payments may attract
                an additional 2% charge and GST is exclusive.
              </li>
            </ul>
          </div>

          {/* Bank Details */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-[#2f5f67] mb-4">
              Bank Details
            </h3>

            <div className="bg-gray-100 rounded-xl p-6 text-gray-700 leading-8">
              <p><strong>Account Name:</strong> Langma School of Languages Pvt. Ltd.</p>
              <p><strong>Account Number:</strong> 50200003479232</p>
              <p><strong>IFSC:</strong> HDFC0000319</p>
              <p><strong>IBAN:</strong> GB58CHAS60924211135191</p>
              <p><strong>Swift Code:</strong> HDFCINBB</p>
              <p><strong>Bank:</strong> HDFC Bank Ltd.</p>
              <p><strong>Branch:</strong> South Extension Part-2</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Termscondition;