import React from "react";
import "./HomeCSS/InternshipInfoSection.css";

const InternshipInfoSection = () => {
  return (
    <div className="internship-secton-hero-section">
      <div className="internship-secton-container">
        <div className="internship-secton-grid">
          <div className="internship-secton-content-column">
            <span className="internship-secton-badge">
              For Corporate & startup
            </span>
            <div className="internship-secton-content-wrapper">
              <h2 className="internship-secton-title">
                Guided{" "}
                <span className="internship-secton-highlight">Internships</span>
              </h2>
              <p className="internship-secton-description">
                Connect with top colleges and enhance your internship-secton
                program with guided internships, weekly reports and certificate
                generation
              </p>
              <div className="internship-secton-image-column-mobile">
                <div className="internship-secton-badges-container">
                  <div className="internship-secton-feature-badge">
                    <div className="internship-secton-badge-icon">
                      <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div className="badge-content">
                      <h3>Premium College Access</h3>
                      <p>Direct reach to top engineering & business schools</p>
                    </div>
                  </div>
                  <div className="internship-secton-feature-badge">
                    <div className="internship-secton-badge-icon">
                      <i className="fa-solid fa-bullseye"></i>
                    </div>
                    <div className="badge-content">
                      <h3>Guided Program</h3>
                      <p>Structured Internships with mentor support</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="internship-secton-button-group">
                <button
                  onClick={() =>
                    (window.location.href = "/employer-registration")
                  }
                  className="internship-secton-primary-button"
                >
                  Post Annual Internship
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Image & Badges */}
          <div className="internship-secton-image-column">
            <div className="internship-secton-badges-container">
              <div className="internship-secton-feature-badge">
                <div className="internship-secton-badge-icon">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="badge-content">
                  <h3>Premium College Access</h3>
                  <p>Direct reach to top engineering & business schools</p>
                </div>
              </div>
              <div className="internship-secton-feature-badge">
                <div className="internship-secton-badge-icon">
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <div className="badge-content">
                  <h3>Guided Program</h3>
                  <p>Structured internships with mentor support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipInfoSection;
