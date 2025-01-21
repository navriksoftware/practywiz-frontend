import React, { useState } from "react";
import "./HomeCSS/TestimonialsSection.css";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "The mentor connect feature paired me with experienced professionals who guided my journey. Their feedback on projects and career advice was invaluable. The User Interface is intuitive and easy to navigate. I highly recommend PractyWiz to anyone looking to upskill and advance their career.",
      author: "Anshika S.",
      role: "Digital Strategy Consultant",
      rating: 5,
    },
    {
      text: "Through PractyWiz, I secured an internship at Navrik Software where I worked on a real-world project. The platform's internship portal made the application process seamless. I'm grateful for the opportunity and the skills I gained.",
      author: "Omran A.",
      role: "Full Stack Developer Intern",
      rating: 5,
    },
    {
      text: "PractyWiz's business analysis and digital consultancy modules through IT Training were exceptional. The self-paced learning format helped me master complex concepts effectively. Every challenge I faced was met with guidance and encouragement. It's more than just a learning platform.",
      author: "Prachi Jain",
      role: "Business Analyst",
      rating: 4,
    },
    {
      text: "The concept of Learning buesiness cases through interactive simulations is a game-changer. The platform's hands-on approach to learning helped me understand complex concepts with ease. The mentorship program is a great way to connect with industry professionals and gain insights into the field.",
      author: "Suryash Pratik",
      role: "Data Analyst",
      rating: 5,
    },
    {
      text: "What make PractyWiz stand out is the all Mentors are industry professionals. The mentorship program is a great way to connect with industry professionals and gain insights into the field. The platform's hands-on approach to learning helped me understand complex concepts with ease.",
      author: "Suryash Pratik",
      role: "IT Student",
      rating: 5,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 2 >= testimonials.length ? 0 : prev + 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 2 < 0 ? testimonials.length - 2 : prev - 2
    );
  };

  return (
    <div className="practy-testimonials">
      <div className="practy-testimonials__container">
        {/* Left Column - Reviews */}
        <div className="practy-testimonials__reviews">
          <div className="practy-testimonials__grid">
            {[0, 1].map((offset) => {
              const testimonial =
                testimonials[(currentIndex + offset) % testimonials.length];
              return (
                <div key={offset} className="practy-testimonials__card">
                  <div className="practy-testimonials__rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                  <p className="practy-testimonials__text">
                    "{testimonial.text}"
                  </p>
                  <div className="practy-testimonials__author">
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="practy-testimonials__controls">
            <button onClick={prevSlide} className="practy-testimonials__button">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button onClick={nextSlide} className="practy-testimonials__button">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Right Column - Header Content */}
        <div className="practy-testimonials__content">
          <div>
            <h2>
              Learn by Doing,
              <br />
              Succeed by Practice
            </h2>
            <p className="practy-testimonials__description">
              Join over 50,000 learners who have transformed their careers
              through practical, hands-on learning experiences with PractyWiz.
            </p>
            <div className="practy-testimonials__stats">
              <div className="practy-testimonials__rating-container">
                <span className="practy-testimonials__rating-number">4.9</span>
                <div className="practy-testimonials__stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
              </div>
              <span className="practy-testimonials__reviews-count">
                (15K+ Reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
