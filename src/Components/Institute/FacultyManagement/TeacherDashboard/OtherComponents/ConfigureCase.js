import { useState } from "react";
import "../DashboardCSS/ConfigureCase.css";

export default function ConfigureCasePopup({ setOpen, caseauthor }) {
  const [questionType, setQuestionType] = useState("same");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (questionType === "same") {
      window.location.href = "/generate-questions";
    } else {
      alert("Case study assigned successfully!");
      setOpen(false);
    }
  };

  return (
    <div className="case-assign-modal">
      <div className="case-assign-modal-content">
        <span className="case-assign-close-icon" onClick={() => setOpen(false)}>
          &#x2716;
        </span>
        <h2 className="case-assign-title">Assign Case Study</h2>
        <form className="case-assign-form" onSubmit={handleSubmit}>
          <label className="case-assign-label">
            Case Study Start Date & Time
          </label>
          <input className="case-assign-input" type="datetime-local" required />

          <label className="case-assign-label">Case Study Deadline</label>
          <input className="case-assign-input" type="datetime-local" required />

          {caseauthor === 0 && (
            <>
              <label className="case-assign-label">
                Fact-Based Questions (Quantity)
              </label>
              <input
                className="case-assign-input"
                type="number"
                min="1"
                required
              />

              <label className="case-assign-label">
                Analysis-Based Questions (Quantity)
              </label>
              <input
                className="case-assign-input"
                type="number"
                min="1"
                required
              />
            </>
          )}

          {caseauthor === 0 && (
            <>
              <label className="case-assign-label">Question Distribution</label>
              <div className="case-assign-radio-group">
                <label>
                  <input
                    type="radio"
                    name="questionType"
                    value="same"
                    checked={questionType === "same"}
                    onChange={() => setQuestionType("same")}
                  />
                  Same Questions for All Students
                </label>
                <label>
                  <input
                    type="radio"
                    name="questionType"
                    value="varied"
                    checked={questionType === "varied"}
                    onChange={() => setQuestionType("varied")}
                  />
                  Varied Questions for Each Student
                </label>
              </div>
            </>
          )}

          <label className="case-assign-label">
            When should Fact-Based Questions be given?
          </label>
          <select className="case-assign-select">
            <option value="before-class">Before Class</option>
            <option value="after-class">After Class</option>
            <option value="in-class">In Class</option>
          </select>

          <label className="case-assign-label">
            When should Analysis-Based Questions be given?
          </label>
          <select className="case-assign-select">
            <option value="before-class">Before Class</option>
            <option value="after-class">After Class</option>
            <option value="in-class">In Class</option>
          </select>

          <label className="case-assign-label">Class Session Start Time</label>
          <input className="case-assign-input" type="datetime-local" required />

          <label className="case-assign-label">Class Session End Time</label>
          <input className="case-assign-input" type="datetime-local" required />

          {caseauthor === 0 ? (
            <button className="case-assign-btn" type="submit">
              {questionType === "same"
                ? "Generate Questions"
                : "Assign Case Study"}
            </button>
          ) : (
            <button className="case-assign-btn" type="submit">
              Assign Case Study
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
