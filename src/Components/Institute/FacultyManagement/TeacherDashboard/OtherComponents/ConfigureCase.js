import { useState } from "react";
import "../DashboardCSS/ConfigureCase.css";
import { toast } from "react-toastify";
import axios from "axios";
import { ApiURL } from "../../../../../Utils/ApiURL";

export default function ConfigureCasePopup({ setOpen, caseauthor, caseStudyId, facultyID, selectedClasses }) {
  const [questionType, setQuestionType] = useState("0");
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    startDateTime: "",
    deadline: "",
    factQuestions: "",
    analysisQuestions: "",
    questionType: "",
    factTiming: "0",
    analysisTiming: "0",
    classStart: "",
    classEnd: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is changed
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };


  const validateForm = () => {
    const errors = {};

    // Check required fields
    if (!formData.startDateTime) errors.startDateTime = "Start date and time is required";
    if (!formData.deadline) errors.deadline = "Deadline is required";
    if (caseauthor === 0) {
      if (!formData.factQuestions) errors.factQuestions = "Fact questions quantity is required";
      if (!formData.analysisQuestions) errors.analysisQuestions = "Analysis questions quantity is required";
    }
    if (!formData.classStart) errors.classStart = "Class start time is required";
    if (!formData.classEnd) errors.classEnd = "Class end time is required";

    // Date validation
    const now = new Date();
    const startDate = new Date(formData.startDateTime);
    const deadlineDate = new Date(formData.deadline);
    const classStartDate = new Date(formData.classStart);
    const classEndDate = new Date(formData.classEnd);

    if (startDate < now) errors.startDateTime = "Start date must be in the future";
    if (deadlineDate <= startDate) errors.deadline = "Deadline must be after start date";
    if (classEndDate <= classStartDate) errors.classEnd = "Class end time must be after start time";

    // Number validation
    if (caseauthor === 0) {
      if (parseInt(formData.factQuestions) < 1) errors.factQuestions = "Must be at least 1";
      if (parseInt(formData.analysisQuestions) < 1) errors.analysisQuestions = "Must be at least 1";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const url = ApiURL();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Prepare data to send to backend
    const dataToSend = {
      caseStudyId,
      facultyID,
      selectedClasses,
      startDateTime: formData.startDateTime,
      deadline: formData.deadline,
      factTiming: formData.factTiming,
      analysisTiming: formData.analysisTiming,
      classStart: formData.classStart,
      classEnd: formData.classEnd,
      factQuestions:formData.factQuestions,
      analysisQuestions: formData.analysisQuestions,
      questionType: questionType,
      owned_by:caseauthor
    };

    console.log("Form data to be sent to backend:", dataToSend);

    try {
      const response = await axios.post(
        `${url}api/v1/faculty/case-study/assign-case-study`,
        dataToSend
      );

      if (response?.data?.success) {
        toast.success("Case study assigned successfully!");
        setOpen(false); // Close the modal after successful submission
      } else {
        toast.error(response?.data?.message || "Assignment failed. Please try again.");
      }

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "There was an error assigning the case study. Please try again.";
      toast.error(message);
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
          <input
            className="case-assign-input"
            type="datetime-local"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleChange}
            required
          />
          {formErrors.startDateTime && (
            <p className="error-message">{formErrors.startDateTime}</p>
          )}

          <label className="case-assign-label">Case Study Deadline</label>
          <input
            className="case-assign-input"
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
          {formErrors.deadline && (
            <p className="error-message">{formErrors.deadline}</p>
          )}

          {caseauthor === 0 && (
            <>
              <label className="case-assign-label">
                Fact-Based Questions (Quantity)
              </label>
              <input
                className="case-assign-input"
                type="number"
                min="1"
                name="factQuestions"
                value={formData.factQuestions}
                onChange={handleChange}
                required
              />
              {formErrors.factQuestions && (
                <p className="error-message">{formErrors.factQuestions}</p>
              )}

              <label className="case-assign-label">
                Analysis-Based Questions (Quantity)
              </label>
              <input
                className="case-assign-input"
                type="number"
                min="1"
                name="analysisQuestions"
                value={formData.analysisQuestions}
                onChange={handleChange}
                required
              />
              {formErrors.analysisQuestions && (
                <p className="error-message">{formErrors.analysisQuestions}</p>
              )}
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
                    value="0"
                    checked={questionType === "0"}
                    onChange={() => setQuestionType("0")}
                  />
                  Same Questions for All Students
                </label>
                <label>
                  <input
                    type="radio"
                    name="questionType"
                    value="1"
                    checked={questionType === "1"}
                    onChange={() => setQuestionType("1")}
                  />
                  Varied Questions for Each Student
                </label>
              </div>
            </>
          )}

          <label className="case-assign-label">
            When should Fact-Based Questions be given?
          </label>
          <select
            className="case-assign-select"
            name="factTiming"
            value={formData.factTiming}
            onChange={handleChange}
          >
             <option value="0">Before Class</option>
            <option value="1">In Class</option>
            <option value="2">After Class</option>
          </select>

          <label className="case-assign-label">
            When should Analysis-Based Questions be given?
          </label>
          <select
            className="case-assign-select"
            name="analysisTiming"
            value={formData.analysisTiming}
            onChange={handleChange}
          >
            <option value="0">Before Class</option>
            <option value="1">In Class</option>
            <option value="2">After Class</option>
          </select>

          <label className="case-assign-label">Class Session Start Time</label>
          <input
            className="case-assign-input"
            type="datetime-local"
            name="classStart"
            value={formData.classStart}
            onChange={handleChange}
            required
          />
          {formErrors.classStart && (
            <p className="error-message">{formErrors.classStart}</p>
          )}

          <label className="case-assign-label">Class Session End Time</label>
          <input
            className="case-assign-input"
            type="datetime-local"
            name="classEnd"
            value={formData.classEnd}
            onChange={handleChange}
            required
          />
          {formErrors.classEnd && (
            <p className="error-message">{formErrors.classEnd}</p>
          )}

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