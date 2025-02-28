import { React, useState } from "react";
import "./HomeCSS/CasestudySection.css";
import img from "./images/mentor.png";
import EmailPopup from "./EmailPopup";

const AiCasestudySection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <section className="ai-casestudy-hero-section">
      <div className="ai-casestudy-container">
        <div className="ai-casestudy-grid ">
          <div className="ai-casestudy-image-column">
            <h3
              className="ai-casestudy-title "
              style={{ fontSize: "2rem", zIndex: 100, textAlign: "center" }}
            >
              Join The Knowledge{" "}
              <span className="ai-casestudy-highlight">"Revolution"</span>
            </h3>
            <div className="ai-casestudy-casecontributor-image-bg">
              <img
                src={img}
                alt="Case Contribution"
                className="ai-casestudy-casecontributor-image"
                loading="lazy"
              />
            </div>
          </div>
          <div className="ai-casestudy-content-column">
            <span className="ai-casestudy-badge">
              For Business Schools & Professionals
            </span>
            <div className="ai-casestudy-content-wrapper">
              <h2 className="ai-casestudy-title">
                <span className="ai-casestudy-highlight">"Āvega"</span>
                <br />
                AI-Powered Case Studies
              </h2>
              <p className="ai-casestudy-description">
                Experience the future of business education with interactive AI.
                Learn from real scenarios with our AI-Powered simulations{" "}
                <span className="ai-casestudy-highlight">"Āvega"</span>.
              </p>
              <div className="ai-casestudy-button-group">
                <button
                  onClick={() => (window.location.href = "/case-studies")}
                  className="ai-casestudy-primary-button"
                >
                  View Case Studies
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
                <button
                  onClick={openPopup}
                  className="ai-casestudy-secondary-button"
                >
                  Connect To Case Cunsultant
                </button>
                <EmailPopup isOpen={isPopupOpen} onClose={closePopup} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiCasestudySection;
