import React from "react";
import "./HomeCSS/CasestudySection.css";
import img from "./images/avega-ai-img.svg";

const AiCasestudySection = () => {
  return (
    <section className="ai-casestudy-hero-section">
      <div className="ai-casestudy-container">
        <div className="ai-casestudy-grid">
          <div className="ai-casestudy-image-column">
            <img
              src={img}
              alt="AI Case Studies Interface Preview"
              className="ai-casestudy-preview-image"
              loading="lazy"
            />
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
                  View AI Case Study
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="ai-casestudy-secondary-button"
                >
                  Contribute Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiCasestudySection;
