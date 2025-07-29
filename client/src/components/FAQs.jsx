import React, { useState } from "react";
import "./FAQs.css";

const faqData = [
  {
    question: "What services does Techivanta provide?",
    answer:
      "Techivanta offers IT consulting, custom software development, web and mobile app solutions, cloud services, and ongoing technical support.",
  },
  {
    question: "How do I request a project quote?",
    answer:
      "You can use our Contact or Support form to send project details. Our team will respond within 24 hours with a quote or consultation schedule.",
  },
  {
    question: "What is your typical project turnaround time?",
    answer:
      "Turnaround time depends on the project scope. Small projects may take 1-2 weeks, while complex ones can take several months. We provide clear timelines in our proposals.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes, we offer maintenance and support packages after your product is launched to ensure long-term success.",
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-wrapper">
      <div className="faq-container">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        {faqData.map((item, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              <span className="faq-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
