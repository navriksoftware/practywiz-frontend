import React from "react";
import { Link } from "react-router-dom";
import "../../../../CaseStudy/CaseStudyCard.css";
function CaseStudyCard({ key,data,caseStudyId, setActivePage }) {
  console.log("CaseStudyId", caseStudyId);
  const handleClick = () => {
    setActivePage("assigncase")
    localStorage.setItem("caseStudyId", caseStudyId);
  }
  return (
    <article className="case-study-card-container">
      <div className="case-study-card-content">
        <div class="case-study-tags ">
          <span class="tag practywiz-tag">PractyWiz</span>
        </div>
        <h2 className="card-title">{data?.case_study_title}</h2>
        <div className="meta-info">
          <span>case study challenge: {data?.case_study_challenge}</span>
        </div>
        <div>
          <span className="case-sub-head">Extract: </span>
          <p className="card-excerpt">{data?.case_study_content}</p>
        </div>
        <div className="sub-container-date">
          {/* <span className="case-study-category-badge">
            {data.subjectCategory}
          </span> */}
          {/* <span>Published: {data.publicationDate}</span> */}
        </div>

        <button
          onClick={handleClick}
          className="read-more-btn"
        >
          {/* <Link
          className="read-more-btn"
          // target="_blank"
          to={`/case-studies/view-case-study/${data.id} `}
        > */}
          Assign Case Study
          {/* </Link> */}
        </button>
      </div>
    </article>
  );
}

export default CaseStudyCard;
