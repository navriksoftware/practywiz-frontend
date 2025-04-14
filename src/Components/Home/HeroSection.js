import React from "react";
import oldProImg from "./images/old-professional.png";
import youngProImg from "./images/young-pro.png";
import "./HomeCSS/HeroSection.css";
import { useNavigate } from "react-router-dom";
const features = [
  {
    icon: <i className="fa-regular fa-lightbulb hero-feature-card-icon"></i>,
    title: "A Student or Professional",
    description:
      "Who has unleashed his/her inner wizard by acquiring role clarity, practical experience and training",
  },
  {
    icon: <i className="fa-solid fa-share-nodes hero-feature-card-icon"></i>,
    title: "A Seasoned Corporate Professional",
    description:
      "Who grew in the organization as a recognized practical problem-solver, & believes in helping others grow to their potential",
  },
];
const HeroSection = () => {
  const navigate = useNavigate();
  const handleRegisterMentee = () => {
    navigate("/mentee-registration");
  };
  const handleRegisterMentor = () => {
    navigate("/mentor-registration");
  };

  return (
    <div className="hero-main-container px-8">
      <div className="hero-content-wrapper">
        <div className="hero-grid-layout">
          {/* Left Column */}
          <div className="hero-left-column hero-animate-fadeIn">
            <div className="hero-header-container">
              <h1 className="hero-title hero-animate-slideUp">
                Who is a{" "}
                <span className="hero-text-highlight">PractyWizard</span>?
              </h1>
              {/* <p className="hero-subtitle hero-animate-slideUp hero-delay-100">
                A community of passionate learners and industry professionals
              </p> */}
            </div>
            <div className="hero-features-container">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="hero-feature-card hero-animate-slideRight"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="hero-feature-content">
                    <div className="hero-feature-icon">{feature.icon}</div>
                    <div className="hero-feature-text">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                    <i className="fa-solid fa-arrow-right hero-arrow-icon"></i>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="hero-achievement-container">
              <div className="hero-achievement-card hero-animate-slideUp hero-delay-200">
                <div className="hero-achievement-content">
                  <h3>300+</h3>
                  <p>Internships</p>
                </div>
              </div>
              <div className="hero-achievement-card hero-animate-slideUp hero-delay-400">
                <div className="hero-achievement-content">
                  <h3>60+</h3>
                  <p>Colleges</p>
                </div>
              </div>
              <div className="hero-achievement-card hero-animate-slideUp hero-delay-600">
                <div className="hero-achievement-content">
                  <h3>2000+</h3>
                  <p>Students</p>
                </div>
              </div>
            </div> */}
            <div className="hero-register-section-container hero-animate-slideUp hero-delay-200">
              <h2 className="hero-subtitle">Ready to Join?</h2>
              <div className="hero-register-cta-btns hero-animate-slideUp hero-delay-200">
                <button
                  onClick={handleRegisterMentee}
                  className="hero-mentee-register-button"
                >
                  Register as a Mentee
                </button>
                <button
                  onClick={handleRegisterMentor}
                  className="hero-mentor-register-button"
                >
                  Register as a Mentor
                </button>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="hero-right-column hero-animate-fadeIn hero-delay-200">
            <div className="hero-image-grid">
              <div className="hero-image-left">
                <img src={oldProImg} className="hero-oldPro-left" />
              </div>
              <div className="hero-image-right">
                <img src={youngProImg} className="hero-youngPro-right" />
              </div>
            </div>
            <div className="hero-badge hero-top-badge">
              <i className="fa-solid fa-trophy w-6 h-6"></i>
              300+ Internships
            </div>
            <div className="hero-badge hero-middle-badge">
              <i className="fa-solid fa-book-open-reader w-6 h-6"></i>
              60+ Colleges
            </div>
            <div className="hero-badge hero-bottom-badge">
              <i className="fa-regular fa-user w-6 h-6"></i>
              2000+ Students
            </div>
            <div className="hero-circle-bagde hero-bottom-circle-bagde">
              100+
              <br />
              Companies
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
