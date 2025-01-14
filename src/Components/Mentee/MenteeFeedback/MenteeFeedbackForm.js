import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./MenteeFeedbackForm.css";
import {
  Backdrop,
  CloseButtonDiv,
  MentorBookedDate,
  MentorBoxDiv,
  MentorSessionName,
  Modal,
} from "./StyledComponents";
import { ApiURL } from "../../../Utils/ApiURL";

const MenteeFeedbackForm = (props) => {
  const url = ApiURL();
  const [platformRating, setPlatformRating] = useState(5);
  const [overallRating, setOverallRating] = useState(5);
  const [contentRelevance, setContentRelevance] = useState("");
  const [mentorCommunication, setMentorCommunication] = useState("");
  const [sessionPace, setSessionPace] = useState("");
  const [sessionFeedback, setSessionFeedback] = useState("");
  const [anotherSession, setAnotherSession] = useState("");
  const [error, setError] = useState("");
  const [detailedSessionFeedback, setDetailedSessionFeedback] = useState("");

  const handleOverallRatingChange = (value) => {
    setOverallRating(value);
    if (value > 0) {
      setError("");
    }
  };

  const handlePlatformRatingChange = (value) => {
    setPlatformRating(value);
    if (value > 0) {
      setError("");
    }
  };

  const validateForm = () => {
    if (platformRating === 0 || overallRating === 0) {
      setError("Please select a rating.");
      return false;
    }
    if (
      !contentRelevance ||
      !mentorCommunication ||
      !sessionPace ||
      !sessionFeedback ||
      !detailedSessionFeedback
    ) {
      setError("Please answer all the questions.");
      return false;
    }
    return true;
  };

  const handleSessionChange = (event) => {
    setAnotherSession(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return toast.error("Please fill all the required answers.");
    }

    try {
      const response = await axios.post(
        `${url}api/v1/mentee/dashboard/appointments/feedback/submit`,
        {
          overallRating: overallRating,
          platformExperience: platformRating,
          contentRelevance,
          mentorCommunication,
          sessionPace,
          sessionFeedback,
          anotherSession,
          detailedSessionFeedback,
          mentorUserId: props.sessionDetails.mentor_user_dtls_id,
          mentorDtlsId: props.sessionDetails.mentor_dtls_id[0],
          menteeUserId: props.user?.user_id,
          bookingId: props.sessionDetails.mentor_booking_appt_id,
        }
      );

      if (response.data.success) {
        alert(response.data.success);
        props.ShowFeedbackFormHandler();
        // Optionally reset the form or perform additional actions here
      }
      if (response.data.error) {
        alert(
          "There was an error submitting the feedback:",
          response.data.error
        );
      }
    } catch (error) {
      alert("There was an error submitting the feedback:", error.message);
    }
  };

  return (
    <Backdrop>
      <Modal>
        <CloseButtonDiv onClick={props.ShowFeedbackFormHandler}>
          <i className="fa-solid fa-close"></i>
        </CloseButtonDiv>
        <div className="container-feedback">
          <h1 className="h1-feedback">Mentee Feedback Form</h1>
          <MentorBoxDiv>
            <MentorSessionName>
              You have completed the Mentorship session with
              <span>
                {" " +
                  props.sessionDetails.mentor_firstname +
                  " " +
                  props.sessionDetails.mentor_lastname}
              </span>
            </MentorSessionName>
            <MentorBookedDate>
              <span>
                <i className="fa-solid fa-calendar"></i>
              </span>{" "}
              {new Date(
                props.sessionDetails.mentor_session_booking_date
              ).toDateString()}
              <span>
                <i className="fa-solid fa-clock"></i>
              </span>{" "}
              {" " + props.sessionDetails.mentor_booking_time}
            </MentorBookedDate>
            <hr style={{ margin: "0px 0px 10px 0px" }} />
          </MentorBoxDiv>
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message-feedback">{error}</p>}
            <div className="form-group-feedback">
              <label htmlFor="contentRelevance" className="label-feedback">
                Was the content of the session relevant to your needs?
              </label>
              <select
                id="contentRelevance"
                name="contentRelevance"
                value={contentRelevance}
                onChange={(e) => setContentRelevance(e.target.value)}
                className="select-feedback"
                required
              >
                <option value="">Select an option</option>
                <option value="5">Highly Relevant</option>
                <option value="4">Relevant</option>
                <option value="3">Somewhat Relevant</option>
                <option value="2">Not Very Relevant</option>
                <option value="1">Not Relevant at All</option>
              </select>
            </div>
            <div className="form-group-feedback">
              <label htmlFor="mentorCommunication" className="label-feedback">
                How would you rate the mentor's communication skills?
              </label>
              <select
                id="mentorCommunication"
                name="mentorCommunication"
                value={mentorCommunication}
                onChange={(e) => setMentorCommunication(e.target.value)}
                className="select-feedback"
                required
              >
                <option value="">Select an option</option>
                <option value="5">Excellent</option>
                <option value="4">Very Good</option>
                <option value="3">Good</option>
                <option value="2">Fair</option>
                <option value="1">Poor</option>
              </select>
            </div>
            <div className="form-group-feedback">
              <label htmlFor="sessionPace" className="label-feedback">
                Was the pace of the session appropriate?
              </label>
              <select
                id="sessionPace"
                name="sessionPace"
                value={sessionPace}
                onChange={(e) => setSessionPace(e.target.value)}
                className="select-feedback"
                required
              >
                <option value="">Select an option</option>
                <option value="5">Perfect Pace</option>
                <option value="4">Slightly Fast</option>
                <option value="3">Slightly Slow</option>
                <option value="2">Too Fast</option>
                <option value="1">Too Slow</option>
              </select>
            </div>
            <div className="form-group-feedback">
              <label htmlFor="sessionFeedback1" className="label-feedback">
                Please provide detailed feedback on your session:
              </label>
              <textarea
                id="sessionFeedback1"
                name="sessionFeedback1"
                rows="4"
                value={detailedSessionFeedback}
                onChange={(e) => setDetailedSessionFeedback(e.target.value)}
                placeholder="Please share the details feedback on your session"
                className="textarea-feedback"
                required
              />
            </div>
            <div className="form-group-feedback">
              <label htmlFor="sessionFeedback" className="label-feedback">
                Please provide any additional feedback or suggestions:
              </label>
              <textarea
                id="sessionFeedback"
                name="sessionFeedback"
                rows="4"
                value={sessionFeedback}
                onChange={(e) => setSessionFeedback(e.target.value)}
                placeholder="Share your thoughts here"
                className="textarea-feedback"
                required
              />
            </div>
            <div className="form-group-feedback">
              <label htmlFor="overallExperience" className="label-feedback">
                How was your overall experience with our mentor and session?
              </label>
              <div className="star-rating-feedback">
                {[5, 4, 3, 2, 1].map((overallValue) => (
                  <React.Fragment key={overallValue}>
                    <input
                      type="radio"
                      id={`star${overallValue}`}
                      name="overallExperience"
                      value={overallValue}
                      checked={overallRating === overallValue}
                      onChange={() => handleOverallRatingChange(overallValue)}
                    />
                    <label
                      htmlFor={`star${overallValue}`}
                      title={`${overallValue} stars`}
                    >
                      &#9733;
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="form-group-feedback">
              <label className="label-feedback">
                Would you like to have another session with this mentor?
              </label>
              <div className="radio-group-feedback">
                <label>
                  <input
                    type="radio"
                    name="anotherSession"
                    value="yes"
                    checked={anotherSession === "yes"}
                    onChange={handleSessionChange}
                    required
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="anotherSession"
                    value="no"
                    checked={anotherSession === "no"}
                    onChange={handleSessionChange}
                    required
                  />
                  No
                </label>
              </div>
            </div>
            <div className="form-group-feedback">
              <label htmlFor="platformExperience" className="label-feedback">
                How was your overall experience with the platform?
              </label>
              <div className="star-rating-feedback">
                {[5, 4, 3, 2, 1].map((platformValue) => (
                  <React.Fragment key={platformValue}>
                    <input
                      type="radio"
                      id={`platformStar${platformValue}`}
                      name="platformExperience"
                      value={platformValue}
                      checked={platformRating === platformValue}
                      onChange={() => handlePlatformRatingChange(platformValue)}
                    />
                    <label
                      htmlFor={`platformStar${platformValue}`}
                      title={`${platformValue} stars`}
                    >
                      &#9733;
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="form-group-feedback">
              <button type="submit" className="submit-btn-feedback">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </Backdrop>
  );
};

export default MenteeFeedbackForm;
