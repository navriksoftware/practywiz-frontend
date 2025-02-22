import React from "react";
import "./HomeCSS/InternshipInfoSection.css";

const InternshipInfoSection = () => {
  return (
    <div className="internship-section-hero-section">
      <div className="internship-section-container">
        <div className="internship-section-grid">
          <div className="internship-section-content-column">
            <span className="internship-section-badge">
              For Corporate & startup
            </span>
            <div className="internship-section-content-wrapper">
              <h2 className="internship-section-title">
                Guided{" "}
                <span className="internship-section-highlight">
                  Internships
                </span>
              </h2>
              <p className="internship-section-description">
                Connect with top colleges and enhance your internship experience
                with guided internships, weekly reports and certificate
                generation
              </p>
              <div className="internship-section-image-column-mobile">
                <div className="internship-section-badges-container">
                  <div className="internship-section-feature-badge">
                    <div className="internship-section-badge-icon">
                      <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div className="badge-content">
                      <h3>Premium College Access</h3>
                      <p>Direct reach to top engineering & business schools</p>
                    </div>
                  </div>
                  <div className="internship-section-feature-badge">
                    <div className="internship-section-badge-icon">
                      <i className="fa-solid fa-bullseye"></i>
                    </div>
                    <div className="badge-content">
                      <h3>Guided Program</h3>
                      <p>Structured Internships with mentor support</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="internship-section-button-group">
                <button
                  onClick={() =>
                    (window.location.href = "/employer-registration")
                  }
                  className="internship-section-primary-button"
                >
                  Post Annual Internship
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Image & Badges */}
          <div className="internship-section-image-column">
            <div className="internship-section-badges-container">
              <div className="internship-section-feature-badge">
                <div className="internship-section-badge-icon">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="badge-content">
                  <h3>Premium College Access</h3>
                  <p>Direct reach to top engineering & business schools</p>
                </div>
              </div>
              <div className="internship-section-feature-badge">
                <div className="internship-section-badge-icon">
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
