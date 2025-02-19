import React from "react";
import "./HomeCSS/ItTrainingSection.css";

const ItTrainingSection = () => {
  return (
    <div className="it-training-hero-container">
      <div className="it-training-content-wrapper">
        <div className="it-training-badge-container">
          <span className="it-training-badge">Real-World Training</span>
        </div>

        <div className="it-training-main-content">
          <h2 className="it-training-title">
            Learn Through{" "}
            <span className="it-training-highlight">Real Problems</span>
            <br />
            Not Just Theory
          </h2>

          <p className="it-training-description">
            Our training is built from the ground up, shaped by real challenges
            we've overcome. Get 100% in-house knowledge that comes from actual
            business problem-solving and hands-on experience.
          </p>

          <div className="it-training-button-group">
            {/* <button
              onClick={() =>
                (window.location.href = "https://elevation5137.ongraphy.com")
              }
              className="it-training-primary-button"
            >
              Start Learning
              <i className="fa-solid fa-arrow-right"></i>
            </button> */}
            <button
              onClick={() => (window.location.href = "/courses")}
              className="it-training-secondary-button"
            >
              Explore Our Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItTrainingSection;
