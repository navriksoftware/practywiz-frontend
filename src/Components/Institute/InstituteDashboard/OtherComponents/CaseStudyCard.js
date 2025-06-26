import React from "react";
import { useState } from "react";
import InstsAssignCaseToFaculty from "./InstsAssignCaseToFaculty";
import { Link } from "react-router-dom";
import "../../../CaseStudy/CaseStudyCard.css";
function CaseStudyCard({ data }) {
  console.log("data", data);

  const [toggleshowpage, settoggleshowpage] = useState(false)
  const HandleShowInstsAssignCaseToFacultyPage = () => {
    settoggleshowpage(!toggleshowpage)
    console.log("toggleshowpage", toggleshowpage)
  }
  return (

    <>  {toggleshowpage ? <InstsAssignCaseToFaculty SingleCaseStudydata={data} HandleShowInstsAssignCaseToFacultyPage={HandleShowInstsAssignCaseToFacultyPage} /> :
      <article className="case-study-card-container">
        {/* <img
        src={data.imageLink}
        alt={data.caseTopic || "Case Study"}
        loading="lazy"
        className="case-study-card-image"
      /> */}
        <div className="case-study-card-content">
          <h2 className="card-title">{data.case_study_title}</h2>
          {/* <div className="meta-info">
          <span>Case Author Designation: {data.caseAuthorDesignation}</span>
        </div> */}
          <div>
            {/* <span className="case-sub-head">Extract: </span> */}
            <p className="card-excerpt">{data?.case_study_content?.slice(0,500)+ "..."}</p>
          </div>
          <div className="sub-container-date">
            {/* <span className="case-study-category-badge">
            {data.subjectCategory}
          </span> */}
            {/* <span>Published: {data.publicationDate}</span> */}
          </div>
          {/* <button className="read-more-btn"> */}
          {/* <Link
          className="read-more-btn"
          // target="_blank"
          to={`/case-studies/view-case-study/${data.case_study_id} `}
        >
          Assign case
        </Link> */}
          <div
            className="read-more-btn"
            onClick={HandleShowInstsAssignCaseToFacultyPage}
          // target="_blank"
          // to={`/case-studies/view-case-study/${data.case_study_id} `}
          >
            Assign case
          </div>
          {/* </button> */}
        </div>
      </article>}

    </>
  );
}

export default CaseStudyCard;
