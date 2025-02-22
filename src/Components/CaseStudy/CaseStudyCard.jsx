import React from "react";
import { Link } from "react-router-dom";
import "./CaseStudyCard.css";
function CaseStudyCard({ data }) {
  return (
    <article className="case-study-card-container">
      <img
        src={data.imageLink}
        alt={data.caseTopic || "Case Study"}
        loading="lazy"
        className="case-study-card-image"
      />
      <div className="case-study-card-content">
        <div className="sub-container-date">
          <span className="case-study-category-badge">
            {data.subjectCategory}
          </span>
          <span>Published: {data.publicationDate}</span>
        </div>
        <h2 className="card-title">{data.caseTopic}</h2>
        <div className="meta-info">
          <span>Case Author Designation: {data.caseAuthorDesignation}</span>
        </div>
        <div>
          <span className="case-sub-head">Extract: </span>
          <p className="card-excerpt">{data.extract}</p>
        </div>
        {/* <button className="read-more-btn"> */}
        <Link
          className="read-more-btn"
          target="_blank"
          to={`/case-studies/view-case-study/${data.id} `}
        >
          Read More
        </Link>
        {/* </button> */}
      </div>
    </article>
  );
}

export default CaseStudyCard;
