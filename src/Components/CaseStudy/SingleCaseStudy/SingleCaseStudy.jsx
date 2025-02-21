// DetailedCaseStudy.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { CaseStudies } from "../../data/CaseStudiesData";
import "./SingleCaseStudy.css";

const DetailItem = ({ label, children }) => (
  <div className="dcs-detail-item">
    <div className="dcs-detail-label">
      <span className="dcs-label-text">{label}</span>
      <span className="dcs-label-line"></span>
    </div>
    <div className="dcs-detail-content">{children}</div>
  </div>
);

function DetailedCaseStudy() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);

  const caseStudy = CaseStudies.find((study) => study.id === parseInt(id));

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="dcs-wrapper">
        <div className="dcs-loading">
          <div className="dcs-spinner">
            <div className="dcs-spinner-ring"></div>
          </div>
          <p className="dcs-loading-text">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="dcs-wrapper">
        <div className="dcs-error">
          <div className="dcs-error-icon">!</div>
          <h2>Case Study Not Found</h2>
          <p>We couldn't find the case study you're looking for.</p>
          <button
            onClick={() => window.history.back()}
            className="dcs-back-btn"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`dcs-wrapper ${isVisible ? "dcs-visible" : ""}`}>
      <div className="dcs-container">
        <div className="dcs-header">
          <div className="dcs-header-content">
            <h1 className="dcs-title">{caseStudy.caseTopic}</h1>
            <div className="dcs-header-decoration">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className="dcs-content">
          <div className="dcs-details">
            <div className="dcs-details-card">
              {/* <DetailItem label="Lesson">
                <p className="dcs-text">{caseStudy.lesson}</p>
              </DetailItem>

              <DetailItem label="Future Skills">
                <p className="dcs-text">{caseStudy.futureSkills}</p>
              </DetailItem> */}

              {/* <DetailItem label="Number of Characters">
                <div className="dcs-character-count">
                  <span className="dcs-count-number">
                    {caseStudy.characters}
                  </span>
                  <span className="dcs-count-label">Characters</span>
                </div>
              </DetailItem> */}

              {/* <DetailItem label="Roles">
                <ul className="dcs-roles-list">
                  {Object.entries(caseStudy.roles[0]).map(([key, value]) => (
                    <li key={key} className="dcs-role-item">
                      <span className="dcs-role-bullet"></span>
                      <span className="dcs-role-text">{value}</span>
                    </li>
                  ))}
                </ul>
              </DetailItem> */}

              {/* <DetailItem label="Main Character Role">
                <p className="dcs-text">{caseStudy.roleOfMainCharacter}</p>
              </DetailItem>

              <DetailItem label="Challenge">
                <p className="dcs-text">{caseStudy.challenge}</p>
              </DetailItem> */}

              <DetailItem label="Author Designation">
                <p className="dcs-text">{caseStudy.caseAuthorDesignation}</p>
              </DetailItem>

              <DetailItem label="Case Location">
                <p className="dcs-text">{caseStudy.caseLocation}</p>
              </DetailItem>

              <DetailItem label="Language">
                <p className="dcs-text">{caseStudy.language}</p>
              </DetailItem>

              <DetailItem label="Tags">
                <ul className="dcs-roles-list">
                  {Object.entries(caseStudy.tags).map(([key, value]) => (
                    <li key={key} className="dcs-role-item">
                      <span className="dcs-role-bullet"></span>
                      <span className="dcs-role-text">{value}</span>
                    </li>
                  ))}
                </ul>
              </DetailItem>
            </div>
          </div>

          <div className="dcs-media">
            <div className="dcs-image-card">
              <div className="dcs-image-container">
                <img
                  src={caseStudy.imageLink}
                  alt={caseStudy.caseTopic}
                  className="dcs-image"
                  onError={(e) => {
                    e.target.src = "/fallback-image.jpg";
                    e.target.alt = "Image not available";
                  }}
                />
                <div className="dcs-image-overlay">
                  <h3 className="dcs-overlay-title">{caseStudy.caseTopic}</h3>
                </div>
              </div>
              <div className="dcs-image-description">
                <DetailItem label="Extract">
                  <p className="dcs-text">{caseStudy.extract}</p>
                </DetailItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedCaseStudy;
