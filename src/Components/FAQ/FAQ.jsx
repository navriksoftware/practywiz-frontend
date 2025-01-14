import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Practywiz?",
      answer:
        "Practywiz is a platform that connects mentees with mentors for personalized sessions, creates AI-powered case studies, and offers internship opportunities.",
    },
    {
      question: "Who can use Practywiz?",
      answer:
        "Practywiz can be used by students, professionals, mentors, and educational institutions.",
    },
    {
      question: "How do I find a mentor?",
      answer:
        "Search for mentors based on your requirements and view their profiles to find a suitable match.",
    },
    {
      question: "How do I schedule a session with a mentor?",
      answer:
        "After finding a mentor, you can book a slot based on their availability. The mentor will receive a confirmation message and can accept or decline the session.",
    },
    {
      question: "What happens after a session is approved?",
      answer:
        "Once the session is approved, both mentor and mentee can connect. Feedback is collected from both parties after the session.",
    },
    {
      question: "How are mentors paid for their sessions?",
      answer:
        "Mentors are paid based on the sessions they conduct, after feedback is received from both parties.",
    },
    {
      question: "What is a case study on Practywiz?",
      answer:
        "A case study is a detailed analysis created by mentors with the help of AI and the Practywiz team, based on provided details.",
    },
    {
      question: "How can I purchase a case study?",
      answer:
        "Both mentors and mentees can purchase case studies from the list on the case study page, which includes a video intro and description.",
    },
    {
      question: "How do educational institutions use case studies?",
      answer:
        "Institutions can subscribe to different plans and access case studies as per their chosen plan.",
    },
    {
      question: "How can organizations list internships?",
      answer:
        "Organizations can register on the platform and list available internships.",
    },
    {
      question: "How do students apply for internships?",
      answer:
        "Students can browse and apply for internships listed by registered organizations or Practywiz itself.",
    },
    {
      question: "Do you provide training and internships within Practywiz?",
      answer:
        "Yes, Practywiz offers training and internship opportunities directly through the platform.",
    },
    {
      question: "What plans are available for institutions?",
      answer:
        "Practywiz offers different plans for institutions that include access to case studies and guest lectures.",
    },
    {
      question: "How do I choose the right plan for my institution?",
      answer:
        "Institutions can compare plans based on their needs and select the one that best fits their requirements.",
    },
    {
      question: "How do I contact Practywiz support?",
      answer:
        "You can contact support through the Contact Us page on our website.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-header">Frequently Asked Questions</h1>
      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <h2 className="faq-question">
              {faq.question}
              <span
                className={`faq-arrow ${activeIndex === index ? "down" : ""}`}
              ></span>
            </h2>
            {activeIndex === index && (
              <p className="faq-answer">{faq.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
