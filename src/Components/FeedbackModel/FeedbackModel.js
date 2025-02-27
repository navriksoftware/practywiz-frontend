import React, { useState } from "react";
import "./FeedbackModel.css";
import styled from "styled-components";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../Redux/loadingRedux";
import axios from "axios";
import { toast } from "react-toastify";
import { ApiURL } from "../../Utils/ApiURL";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1200;
  background-color: rgba(0, 0, 0, 0.75);
`;
const Modal = styled.div`
  position: fixed;
  top: 100px;
  left: 5%;
  width: 90%;
  height: auto;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  animation: slide-down 300ms ease-out forwards;
  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseButtonDiv = styled.div`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 14px;
  right: 16px;
  cursor: pointer;
`;
const FeedbackModel = ({ user, showFeedbackModelHandler }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(4);
  const url = ApiURL();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoadingHandler());
      const res = await Promise.race([
        axios.post(`${url}api/v1/mentor/update/onboarding-feedback`, {
          feedback: feedback,
          rating: rating,
          userDtlsId: user?.user_id,
          username: user?.user_firstname + " " + user?.user_lastname,
        }),
        new Promise(
          (_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
        ),
      ]);
      dispatch(hideLoadingHandler());
      if (res.data.success) {
        return (
          toast.success(
            "Thanks for your feedback on our mentor onboarding! We appreciate your insights and strive to improve the process."
          ),
          showFeedbackModelHandler(),
          navigate("/redirect")
        );
      } else if (res.data.error) {
        return toast.error(
          "There is some error while submitting the feedback. Please try again"
        );
      }
    } catch (error) {
      if (error.message === "Request timed out") {
        return toast.error("Request timed out. Please try again.");
      } else {
        return toast.error(
          "There is some error while submitting the feedback. Please try again"
        );
      }
    } finally {
      return (
        setFeedback(""),
        setRating(4),
        showFeedbackModelHandler(),
        dispatch(hideLoadingHandler())
      );
    }
  };

  const handleRatingChange = (rate) => {
    setRating(rate);
  };

  return (
    <div className="feedback-form-container">
      <Backdrop>
        <Modal>
          {/* <CloseButtonDiv onClick={showFeedbackModelHandler}>
            <i className="fa-solid fa-close"></i>
          </CloseButtonDiv> */}
          <div className="feedback-modal-content">
            <div className="feedback-rating-container">
              <h4>Leave Your Feedback</h4>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="feedback-rating-container">
                <label>
                  How was your experience with our onboarding mentor
                  registration process ?{" "}
                  <span className="RedColorStarMark">*</span>
                </label>
                <div className="feedback-star-rating">
                  {[1, 2, 3, 4, 5].map((rate, index) => (
                    <span key={index} onClick={() => handleRatingChange(rate)}>
                      <i
                        className={`fa-solid fa-star ${
                          rate <= rating ? "rated" : "unrated"
                        }`}
                      ></i>
                    </span>
                  ))}
                </div>
              </div>
              <div className="feedback-rating-container">
                <label htmlFor="">
                  Please share any additional comments or suggestions to help us
                  improve the mentor registration experience ?
                </label>{" "}
                <textarea
                  className="feedback-textarea"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Please share your thoughts or suggestions about the onboarding mentor registration process..."
                />
              </div>
              <div className="feedback-modal-submit">
                <button className="feedback-submit-btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </Backdrop>
    </div>
  );
};

export default FeedbackModel;
