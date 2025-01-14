import React from "react";
import { useParams } from "react-router-dom";
import "./SingleCaseStudy.css";
import { useState } from "react";
import CaseStudies from "../../data/CaseStudies.json";
function SingleCaseStudy() {
  const { id } = useParams();

  const caseStudy = CaseStudies.find((study) => study.id === parseInt(id));

  if (!caseStudy) {
    return <h2>Case Study not found</h2>;
  }

  return (
    <div className="single-case-study-container">
      <div className="case-study-content">
        {/* Case study details on the left */}
        <div className="case-study-details">
          <h1>{caseStudy.caseTopic}</h1>
          <p>
            <strong>Lesson:</strong> {caseStudy.lession}
          </p>
          <p>
            <strong>Future Skills:</strong> {caseStudy.fututreSkils}
          </p>
          <p>
            <strong>Number of Characters:</strong> {caseStudy.characters}
          </p>
          <p>
            <strong>Roles:</strong>
            <ul>
              {Object.entries(caseStudy.roles[0]).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>
          </p>
          <p>
            <strong>Main Character Role:</strong>{" "}
            {caseStudy.roleOfMainCharacter}
          </p>
          <p>
            <strong>Challenge:</strong> {caseStudy.challenge}
          </p>
        </div>

        {/* Case study video on the right */}
        <div className="case-study-video">
          <video controls>
            <source src={caseStudy.videoLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default SingleCaseStudy;
