// import "./AddNonPractywizCases.css";

import CaseStudyForm from "./CaseStudyForm";

const AddNonPractywizCase = ({ setActivePage,showQuestion,setEditQuestion }) => {
  return (
    <>
      {/* <div className="new-case-add-dashboard">
        <div className="new-case-add-content">
          <header className="new-case-add-header">
            <h1 className="new-case-add-title">Add New Case Study</h1>
            <p className="new-case-add-subtitle">
              Create a new non Practywiz case study for students
            </p>
          </header>
          <CaseStudyForm setActivePage={setActivePage} />
        </div>
      </div> */}
      <CaseStudyForm setActivePage={setActivePage} showQuestion={showQuestion} setEditQuestion={setEditQuestion}/>
    </>
  );
};

export default AddNonPractywizCase;
