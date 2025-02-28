import { React, useState } from "react";
import casecontributionImg from "./images/casecontributionImg.png";
import "./HomeCSS/CaseContributionSection.css";
import EmailPopup from "./EmailPopup";

const CaseContributionSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <section className="case-contribution-container">
      <div className="case-contribution-inner">
        <div className="case-contribution-left">
          <span className="case-contribution-badge">
            Connect with a Case Consultant
          </span>

          <div className="case-contribution-content">
            <h2 className="case-contribution-title">
              Join The Knowledge
              <span className="case-contribution-title-colored">
                {" "}
                Revolution
              </span>
            </h2>

            <p className="case-contribution-description">
              Become a Case Author and share your corporate experience with
              millions
            </p>

            <button
              className="case-contribution-reach-button"
              onClick={openPopup}
            >
              Reach to Case Consultant
              <i className="fa-solid fa-arrow-right"></i>
            </button>
            <EmailPopup isOpen={isPopupOpen} onClose={closePopup} />
          </div>
        </div>

        <div className="case-contribution-right">
          <div className="case-contribution-casecontributor-image-bg">
            <img
              src={casecontributionImg}
              alt="Case Contribution"
              className="case-contribution-casecontributor-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseContributionSection;
