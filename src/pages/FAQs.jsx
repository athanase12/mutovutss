import React, { useState } from 'react';

function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqCategories = {
    admissions: [
      {
        question: "What are the admission requirements for Mutovu TSS?",
        answer: "To apply for admission, you need: 1) Completed O-Level with good grades in science and mathematics subjects, 2) Birth certificate, 3) Previous school reports, 4) Medical certificate, 5) 2 passport photos. Entrance examination is also required for all applicants."
      },
      {
        question: "When does the admission process start?",
        answer: "Admissions for the academic year typically open in January and close in March. Entrance examinations are conducted in late March, with results released in April."
      },
      {
        question: "Is there an entrance examination fee?",
        answer: "Yes, there is a non-refundable examination fee of 5,000 RWF. This fee covers the cost of administering the entrance examination."
      }
    ],
    academics: [
      {
        question: "What technical programs are offered?",
        answer: "We offer 6 technical programs: Construction Technology, Electronics Technology, Hospitality Management, Information Technology, Automotive Technology, and Agriculture Technology."
      },
      {
        question: "What is the duration of the programs?",
        answer: "All technical programs are 3-year courses, leading to an Advanced Diploma in the respective field."
      },
      {
        question: "Do you offer internships or industrial attachment?",
        answer: "Yes, all students undergo a 3-month industrial attachment in their second year and a 6-month internship in their final year with our industry partners."
      }
    ],
    fees: [
      {
        question: "What are the school fees?",
        answer: "Annual tuition fee is 200,000 RWF for day scholars and 500,000 RWF for boarding students. This includes tuition, practical materials, and examination fees."
      },
      {
        question: "Are there payment plans available?",
        answer: "Yes, we offer flexible payment plans. Fees can be paid in three installments: 40% at registration, 30% in September, and 30% in January."
      },
      {
        question: "Are there scholarships available?",
        answer: "Yes, we offer merit-based scholarships for top-performing students and need-based scholarships for students from disadvantaged backgrounds."
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-700">
          Find answers to common questions about admissions, academics, fees, and school life at Mutovu TSS.
        </p>
      </div>
      
      {/* Admissions FAQs */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b" id="admissions">Admissions</h3>
        <div className="space-y-4">
          {faqCategories.admissions.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(`admissions-${index}`)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-600 transform transition-transform ${
                    openIndex === `admissions-${index}` ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === `admissions-${index}` && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Academics FAQs */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b" id="academics">Academics</h3>
        <div className="space-y-4">
          {faqCategories.academics.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(`academics-${index}`)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-600 transform transition-transform ${
                    openIndex === `academics-${index}` ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === `academics-${index}` && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Fees FAQs */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b" id="fees">Fees & Payments</h3>
        <div className="space-y-4">
          {faqCategories.fees.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(`fees-${index}`)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-600 transform transition-transform ${
                    openIndex === `fees-${index}` ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === `fees-${index}` && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Search More */}
      <div className="bg-primary-50 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-primary-800 mb-4">Didn't find your answer?</h3>
        <p className="text-primary-700 mb-6">
          Check our complete FAQ database or contact our support team for personalized assistance.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="#" 
            className="btn btn-primary"
          >
            View Full FAQ Database
          </a>
          <a 
            href="/contact" 
            className="btn bg-white text-primary-700 border border-primary-300 hover:bg-primary-50"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default FAQs;