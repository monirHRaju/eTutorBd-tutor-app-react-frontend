import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "How does eTutor BD work?",
    answer:
      "Students post tuition requirements, tutors apply, and students choose the best tutor to start learning.",
  },
  {
    question: "Are tutors verified?",
    answer:
      "Yes. All tutors go through a verification process including identity and academic background checks.",
  },
  {
    question: "Is online tuition available?",
    answer:
      "Yes. Students can choose online or in-person tuition based on their preference.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Posting a tuition request is completely free. Tutor fees depend on subject, level, and experience.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-base-200">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase text-secondary">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-base-content">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base-content/70 max-w-xl mx-auto">
            Everything you need to know before getting started
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left focus:outline-none"
                >
                  <span className="font-medium text-base-content">
                    {faq.question}
                  </span>

                  <span className="text-primary">
                    {isOpen ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`px-6 pb-6 text-base-content/70 transition-all duration-300 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Faq;
