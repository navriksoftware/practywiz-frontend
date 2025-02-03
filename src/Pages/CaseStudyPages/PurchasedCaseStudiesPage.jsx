// File: src/components/PurchasedCaseStudies.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PurchasedCaseStudies.css";
import { ApiURL } from "../../Utils/ApiURL";
import Navbar from "../../Components/Navbar/Navbar";

const URL = ApiURL();

function PurchasedCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch purchased case studies using axios
    axios
      .get(`${URL}api/v1/case-studies/purchased-case-studies`)
      .then((response) => {
        setCaseStudies(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching purchased case studies:", error);
      });
  }, []);

  const handleViewCaseStudy = (id) => {
    navigate(`/purchased-case-studies/${id}`);
  };

  if (caseStudies.length === 0) {
    return <div>Loading purchased case studies...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="purchased-case-studies">
        <h1>Purchased Case Studies</h1>
        <div className="case-study-list">
          {caseStudies.map((caseStudy) => (
            <div key={caseStudy.case_study_id} className="case-study-card">
              <h2>{caseStudy.case_study_title}</h2>
              <p>{caseStudy.case_study_content.substring(0, 90)}...</p>
              <button
                onClick={() => handleViewCaseStudy(caseStudy.case_study_id)}
                className="view-case-study-button"
              >
                View Case Study
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PurchasedCaseStudiesPage;
