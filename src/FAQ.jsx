import React, { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse the crops, select the quantity, and click 'Order'. You can manage your orders from your profile.",
    },
    {
      question: "Can I sell my crops on KrishiLink?",
      answer:
        "Yes! Register as a farmer, add your crops, and manage buyer interests through your dashboard.",
    },
    {
      question: "What payment methods are supported?",
      answer:
        "We currently support Stripe payments for secure online transactions. Cash on delivery may also be available for local orders.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order is confirmed, you can track it from 'My Orders' in your profile.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes, if there is any issue with the crop delivery, contact support within 48 hours for a resolution.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative py-20 bg-gradient-to-b from-green-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Background Blur Shapes */}
      <div className="absolute top-10 -left-20 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-green-300/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Frequently Asked <span className="text-green-600">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Answers to the most common questions about using KrishiLink.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 hover:rotate-[0.4deg]"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-semibold text-gray-800">{faq.question}</h3>
                <span className="text-green-600 font-bold text-2xl">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </div>
              {openIndex === idx && (
                <p className="mt-4 text-gray-200 text-sm">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
