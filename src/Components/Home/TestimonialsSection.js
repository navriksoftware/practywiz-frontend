import React, { useState, useEffect } from "react";
import "./HomeCSS/TestimonialsSection.css";

const TestimonialsSection = () => {
  const testimonials = [
    {
      description:
        "The mentor connect feature paired me with experienced professionals who guided my journey. Their feedback on projects and career advice was invaluable. The User Interface is intuitive and easy to navigate. I highly recommend PractyWiz to anyone looking to upskill and advance their career.",
      author: "Anshika S.",
      role: "Digital Strategy Consultant",
      rating: 5,
    },
    {
      description:
        "Through PractyWiz, I secured an internship at Navrik Software where I worked on a real-world project. The platform's internship portal made the application process seamless. I'm grateful for the opportunity and the skills I gained.",
      author: "Omran A.",
      role: "Full Stack Developer Intern",
      rating: 5,
    },
    {
      description:
        "PractyWiz's business analysis and digital consultancy modules through IT Training were exceptional. The self-paced learning format helped me master complex concepts effectively. Every challenge I faced was met with guidance and encouragement. It's more than just a learning platform.",
      author: "Prachi Jain",
      role: "Business Analyst",
      rating: 4,
    },
    {
      description:
        "The concept of Learning buesiness cases through interactive simulations is a game-changer. The platform's hands-on approach to learning helped me understand complex concepts with ease. The mentorship program is a great way to connect with industry professionals and gain insights into the field.",
      author: "Suryash Pratik",
      role: "Data Analyst",
      rating: 5,
    },
    {
      description:
        "What make PractyWiz stand out is the all Mentors are industry professionals. The mentorship program is a great way to connect with industry professionals and gain insights into the field. The platform's hands-on approach to learning helped me understand complex concepts with ease.",
      author: "Suryash Pratik",
      role: "IT Student",
      rating: 5,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="practy-testimonials-section">
      <div className="practy-testimonials-container">
        <div className="practy-testimonials-header">
          <div className="practy-testimonials-title">
            <h2>Testimonials</h2>
            <p className="practy-testimonials-subtitle">
              Discover what our users have to say about their experiences with
              PractyWiz.
            </p>
          </div>
          <div className="practy-testimonials-nav">
            <button
              className="practy-testimonials-nav-button"
              onClick={prevSlide}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              className="practy-testimonials-nav-button"
              onClick={nextSlide}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="practy-testimonials-carousel">
          <div
            className="practy-testimonials-track"
            style={{
              transform: `translateX(-${
                currentSlide * (100 / slidesPerView)
              }%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="practy-testimonials-slide">
                <div className="practy-testimonials-card">
                  <div className="practy-testimonials-quote">"</div>
                  <h3 className="practy-testimonials-card-title">
                    {testimonial.author}
                  </h3>
                  <p className="practy-testimonials-card-description">
                    {testimonial.description}
                  </p>
                  <hr />
                  <div className="practy-testimonials-profile">
                    {/* <div className="practy-testimonials-avatar">
                      <img
                        src="/api/placeholder/40/40"
                        alt={testimonial.author}
                      />
                    </div> */}
                    <div className="practy-testimonials-info">
                      <div className="practy-testimonials-author">
                        {testimonial.author}
                      </div>
                      <div className="practy-testimonials-role">
                        {testimonial.role}
                      </div>
                    </div>
                    <div className="practy-testimonials-rating">
                      {"★".repeat(testimonial.rating)}
                      {"☆".repeat(5 - testimonial.rating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="practy-testimonials-pagination">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`practy-testimonials-dot ${
                currentSlide === index ? "active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
