import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import "../DashboardCSS/CaseRequestForm.css";
import axios from "axios";
import { ApiURL } from "../../../../../Utils/ApiURL";
import {
  showLoadingHandler,
  hideLoadingHandler,
} from "../../../../../Redux/loadingRedux";

const CaseRequestForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    caseArea: "",
    subject: "",
    expectedLearning: "",
    course: "",
    year: "",
  });

  const [validation, setValidation] = useState({
    caseArea: true,
    subject: true,
    expectedLearning: true,
    course: true,
    year: true,
  });

  const userEmail = useSelector((state) => state.user.currentUser.user_email);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const url = ApiURL();

  // Close on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);

    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const validateField = (name, value) => {
    switch (name) {
      case "caseArea":
      case "subject":
      case "expectedLearning":
      case "course":
      case "year":
        return value.trim().length > 0;
      default:
        return true;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidation({
      ...validation,
      [name]: true, // Reset validation on change
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const caseAreaValid = validateField("caseArea", formData.caseArea);
    const subjectValid = validateField("subject", formData.subject);
    const expectedLearningValid = validateField(
      "expectedLearning",
      formData.expectedLearning
    );
    const courseValid = validateField("course", formData.course);
    const yearValid = validateField("year", formData.year);

    setValidation({
      caseArea: caseAreaValid,
      subject: subjectValid,
      expectedLearning: expectedLearningValid,
      course: courseValid,
      year: yearValid,
    });

    // If any validation fails, stop submission
    if (
      !caseAreaValid ||
      !subjectValid ||
      !expectedLearningValid ||
      !courseValid ||
      !yearValid
    ) {
      return;
    }

    try {
      setIsSubmitting(true);
      dispatch(showLoadingHandler());

      // Updated API call with new fields
      const response = await axios.post(
        `${url}api/v1/case-studies/request-case-study`,
        {
          userEmail: userEmail,
          caseArea: formData.caseArea,
          subject: formData.subject,
          expectedLearning: formData.expectedLearning,
          course: formData.course,
          year: formData.year,
        }
      );

      toast.success(
        "Thank you! Your case study request has been submitted. Our consultant will connect with you shortly."
      );

      setFormData({
        userEmail: "",
        caseArea: "",
        subject: "",
        expectedLearning: "",
        course: "",
        year: "",
      });

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
        {
          position: "top-right",
        }
      );
    } finally {
      setIsSubmitting(false);
      dispatch(hideLoadingHandler());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="case-req-form-backdrop">
      <div className="case-req-form-container">
        <div className="case-req-form-header">
          <span>Request a Case Study</span>
          <button className="case-req-form-close" onClick={onClose}>
            <i className="fa-solid fa-close"></i>
          </button>
        </div>
        <div className="case-req-form-content">
          <form onSubmit={handleSubmit}>
            {/* Case Area Field */}
            <div className="case-req-form-input-container">
              <input
                type="text"
                name="caseArea"
                value={formData.caseArea}
                onChange={handleInputChange}
                placeholder="Case area (e.g. E-commerce) *"
                className={
                  !validation.caseArea ? "case-req-form-input-error" : ""
                }
                disabled={isSubmitting}
                required
              />
              {!validation.caseArea && (
                <p className="case-req-form-error-message">
                  Please enter a case area
                </p>
              )}
            </div>

            {/* Subject Field */}
            <div className="case-req-form-input-container">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject (e.g. Marketing, Finance) *"
                className={
                  !validation.subject ? "case-req-form-input-error" : ""
                }
                disabled={isSubmitting}
                required
              />
              {!validation.subject && (
                <p className="case-req-form-error-message">
                  Please enter a subject
                </p>
              )}
            </div>

            {/* Expected Learning Field */}
            <div className="case-req-form-input-container">
              <input
                type="text"
                name="expectedLearning"
                value={formData.expectedLearning}
                onChange={handleInputChange}
                placeholder="Expected area of learning (e.g. Product costing in e-commerce) *"
                className={
                  !validation.expectedLearning
                    ? "case-req-form-input-error"
                    : ""
                }
                disabled={isSubmitting}
                required
              />
              {!validation.expectedLearning && (
                <p className="case-req-form-error-message">
                  Please enter expected area of learning
                </p>
              )}
            </div>

            {/* Course Field */}
            <div className="case-req-form-input-container">
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                placeholder="Course (e.g. MBA, BBA) *"
                className={
                  !validation.course ? "case-req-form-input-error" : ""
                }
                disabled={isSubmitting}
                required
              />
              {!validation.course && (
                <p className="case-req-form-error-message">
                  Please enter your course
                </p>
              )}
            </div>

            {/* Year Field */}
            <div className="case-req-form-input-container">
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="Year (e.g. 1st year MBA) *"
                className={!validation.year ? "case-req-form-input-error" : ""}
                disabled={isSubmitting}
                required
              />
              {!validation.year && (
                <p className="case-req-form-error-message">
                  Please enter your year
                </p>
              )}
            </div>

            <div className="case-req-form-actions">
              <button
                type="button"
                onClick={onClose}
                className="case-req-form-cancel-button"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="case-req-form-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request Case Study"}
              </button>
            </div>
          </form>
          <div className="case-req-form-branding">
            Need help? Contact us at{" "}
            <a href="mailto:wecare@practywiz.com">wecare@practywiz.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseRequestForm;
