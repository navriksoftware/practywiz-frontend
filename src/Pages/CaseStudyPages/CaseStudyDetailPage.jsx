import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CaseStudyDetailPage.css";
import { ApiURL } from "../../Utils/ApiURL";
import Navbar from "../../Components/Navbar/Navbar";
// Import internal modules as required
const URL = ApiURL();

function CaseStudyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL}api/v1/case-studies/purchased-case-studies/${id}`)
      .then((response) => {
        setCaseStudy(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching purchased case studies:", error);
        setError("Unable to load case studies at this time.");
      });
  }, [id]);

  // In the render method
  if (error) {
    return <div>{error}</div>;
  }

  if (!caseStudy) {
    return <div>Loading case study...</div>;
  }

  const handleStartSimulation = () => {
    navigate("/simulation", { state: { caseStudy } });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="case-study-page-container">
        {/* <h1 className="case-study-page-title">{caseStudy.case_study_title}</h1>
        <p className="case-study-page-content">
          {caseStudy.case_study_content}
        </p>/ */}

        <h1 className="case-study-page-title">{caseStudy.case_study_title}</h1>
        <div className="case-study-page-content">
          {/* Split content by new lines and wrap each part in a <p> */}
          {caseStudy.case_study_content
            .split("\n")
            .map((line, index) =>
              line.trim() ? <p key={index}>{line}</p> : <br key={index} />
            )}
        </div>

        <div className="case-study-page-button-group">
          <button
            onClick={handleStartSimulation}
            className="case-study-page-proceed-button"
          >
            A.I Simulator
          </button>
          <button
            onClick={() => navigate("/purchased-case-studies")}
            className="case-study-page-back-button"
          >
            Back to Case Studies
          </button>
        </div>
      </div>
    </>
  );
}

export default CaseStudyDetailPage;
