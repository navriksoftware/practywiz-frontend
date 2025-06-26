import {useState}from "react";
import { Eye, UserPlus, Edit, Trash2 } from 'lucide-react';
import "../../../../CaseStudy/CaseStudyCard.css";
import QuestionShow from "./QuestionShow.js";
import { X } from 'lucide-react';


function CaseStudyCard({ data, caseStudyId, setActivePage,setEditQuestion,setshowQuestion }) {
  console.log("CaseStudyId", caseStudyId);
 const [openQuestionpage, setopenQuestionpage] = useState(false)

  const handleAssignClick = () => {
    localStorage.setItem("caseStudyId", caseStudyId);
    setActivePage("assigncase");
  };

  const handleViewClick = () => {
    // Add your view logic here
    console.log("View clicked for case study:", caseStudyId);
  };

  const handleEditClick = () => {
    // Add your edit logic here
    console.log("Edit clicked for case study:", caseStudyId);
  };

  const handleDeleteClick = () => {
    // Add your delete logic here
    console.log("Delete clicked for case study:", caseStudyId);
  };

  console.log("data", data);
  const caseType = localStorage.getItem("caseType") === "practywiz" ? 1 : 0;

  return (
    <>
    {openQuestionpage && (
        <div className="casestudyShowModel-QuestionShow-container" >
          <div className="casestudyShowModel-QuestionShow-overlay">
            <div
              onClick={() => setopenQuestionpage(false)}
              className="casestudyShowModel-QuestionShow-close-button"
            >
              <X size={24} />
            </div>
            <QuestionShow data={data} />
          </div>
        </div>
      )}


      {caseType === 1 ? (
        <article className="case-study-card-container">
          <div className="case-study-card-content">
            <div className="case-study-tags">
              <span className="tag practywiz-tag">PractyWiz</span>
            </div>
            <h2 className="card-title">{data?.case_study_title}</h2>
            <div className="meta-info">
              <span>Case study challenge: {data?.case_study_challenge}</span>
            </div>
            <div>
              <span className="case-sub-head">Extract: </span>
              <p className="card-excerpt">{data?.case_study_content?.slice(0, 200)} {data?.case_study_content?.length > 200 ? "..." : ""}</p>
            </div>
            <div className="sub-container-date">
              {/* <span className="case-study-category-badge">
                {data.subjectCategory}
              </span> */}
              {/* <span>Published: {data.publicationDate}</span> */}
            </div>

            <button
              onClick={handleAssignClick}
              className="read-more-btn"
            >
              Assign Case Study
            </button>
          </div>
        </article>
      ) : (
        <div className="instituteCaseStudie-container">
          <div className="instituteCaseStudie-card">
            <div className="instituteCaseStudie-badge">
              Non-PractyWiz
            </div>

            <div className="instituteCaseStudie-content">
              <h2 className="instituteCaseStudie-title">
                {data?.non_practywiz_case_title?.slice(0, 50)}
                {data?.non_practywiz_case_title?.length > 50 ? "..." : ""}
              </h2>

              <div className="instituteCaseStudie-meta">
                <span className="instituteCaseStudie-author">
                  {data?.non_practywiz_case_author?.slice(0, 20)}
                  {data?.non_practywiz_case_author?.length > 20 ? "..." : ""}
                </span>
                <span className="instituteCaseStudie-separator">•</span>
                <span className="instituteCaseStudie-date">
                  {data?.non_practywiz_case_category}
                </span>
              </div>


            </div>
          </div>
          <div className="instituteCaseStudie-actions">
            <button
              className="instituteCaseStudie-btn instituteCaseStudie-btn-primary"
                onClick={() => setopenQuestionpage(true)}
            >
              <Eye size={16} />
              View
            </button>
            <button
              className="instituteCaseStudie-btn instituteCaseStudie-btn-secondary"
              onClick={handleAssignClick}
            >
              <UserPlus size={16} />
              Assign
            </button>
            <button
              className="instituteCaseStudie-btn instituteCaseStudie-btn-ghost"
              onClick={()=>{setEditQuestion(true)
              setshowQuestion(data)}
              }
            >
              <Edit size={16} />
            </button>
            {/* //use for the delete functionality of the non practywiz case study  */}
            {/* <button
              className="instituteCaseStudie-btn instituteCaseStudie-btn-ghost instituteCaseStudie-btn-danger"
              onClick={handleDeleteClick}
            >
              <Trash2 size={16} />
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}

export default CaseStudyCard;