import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "What is Skill-Exchange?",
      answer: "Skill-Exchange is a platform where individuals connect to share and learn new skills. Whether you're a professional or a hobbyist, you can exchange expertise and grow together."
    },
    {
      question: "How does Skill-Exchange work?",
      answer: "Users can create profiles highlighting the skills they want to share and those they want to learn. Once matched, they can connect, collaborate, and exchange knowledge through the platform."
    },
    {
      question: "Is Skill-Exchange free to use?",
      answer: "Yes, the platform is free to join and use. However, some features or premium services may require a subscription or payment."
    },
    {
      question: "Can I exchange skills remotely?",
      answer: "Yes, Skill-Exchange supports both in-person and remote exchanges. Use video calls, chats, or other tools integrated into the platform for remote collaboration."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-r from-rose-100 to-teal-100 py-12" id="Faq">
      <div className="container mx-auto px-8 lg:px-32">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 shadow-lg rounded-lg p-6 transition hover:shadow-xl cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.question}
                </h3>
                <span className="text-gray-500 text-xl transition-transform transform">
                  {activeIndex === index ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </span>
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-gray-600 transition-opacity">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-lg text-gray-700 mb-4">
            Didn't find your question? Get in touch with us!
          </p>
          <a
            href="/contact"
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
