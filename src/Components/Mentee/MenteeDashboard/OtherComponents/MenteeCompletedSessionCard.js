import React, { useState } from "react";
import MenteeFeedbackForm from "../../MenteeFeedback/MenteeFeedbackForm";
import { Link } from "react-router-dom";
const MenteeCompletedSessionCard = ({ allCompletedBookingSessions, user }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [sessionDetails, setSessionDetails] = useState("");
  const ShowFeedbackFormHandler = (data) => {
    setShowFeedbackForm(!showFeedbackForm);
    setSessionDetails(data);
  };
  return (
    <>
      {showFeedbackForm && (
        <MenteeFeedbackForm
          user={user}
          ShowFeedbackFormHandler={ShowFeedbackFormHandler}
          sessionDetails={sessionDetails}
        />
      )}
      {allCompletedBookingSessions?.map((session) => {
        return (
          <div className="col-lg-3 mb-3">
            <div className="ghfghgfhg iuhuh__enruiere mb-0">
              <div className="jghdfrg">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="doiejrer_left">
                      <div className="kmg">
                        <img src={session.mentor_profile_photo} alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="doiejrer_right mt-3">
                      <div className="dfhjbghfjgfgh22">
                        <h4>
                          {session.mentor_firstname +
                            " " +
                            session.mentor_lastname}
                        </h4>
                        <h5>{session.mentor_job_title}</h5>
                        <hr />
                        <div className="row mt-3 justify-content-center">
                          <div className="col-lg-6 mb-2">
                            <div className="ierjuhrt_left">
                              <h5 className="mb-0">
                                <i className="fa-regular me-1 fa-clock"></i>{" "}
                                Time :
                              </h5>
                              <p className="my-0">
                                {session.mentor_booking_time}
                              </p>
                            </div>
                          </div>

                          <div className="col-lg-6 mb-2">
                            <div className="ierjuhrt_left">
                              <h5 className="mb-0">
                                <i className="fa-solid me-1 fa-calendar-days"></i>{" "}
                                Date :
                              </h5>

                              <p className="my-0">
                                {new Date(
                                  session.mentor_session_booking_date
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {session.mentor_feedback_dtls_id !== null && (
                            <div className="col-lg-6 mb-2">
                              <div className="ierjuhrt_left">
                                <h5 className="mb-0">
                                  <i className="fa-regular me-1 fa-face-smile"></i>
                                  Rating :
                                </h5>
                                <p className="my-0">
                                  {
                                    session.mentor_feedback_session_overall_rating
                                  }
                                  /5
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <hr />
                        <div className="kbfhgfgfg d-flex justify-content-center mt-3">
                          {session.mentor_booking_confirmed === "Yes" &&
                            session.mentor_session_status === "completed" &&
                            session.trainee_session_status === "completed" &&
                            session.mentor_feedback_dtls_id === null && (
                              <>
                                <div className="error-box-green ">
                                  You have completed the mentor session. Please
                                  fill the feedback form
                                </div>{" "}
                                <button
                                  className="btn-main me-1"
                                  onClick={() =>
                                    ShowFeedbackFormHandler(session)
                                  }
                                >
                                  Fill Feedback
                                </button>
                              </>
                            )}
                          {session.mentor_feedback_session_overall_rating !==
                            null &&
                            session.mentor_booking_confirmed === "Yes" &&
                            session.mentor_session_status === "completed" &&
                            session.trainee_session_status === "completed" && (
                              <>
                                <div className="error-box-green ">
                                  You have completed the mentor session and
                                  filled the feedback.
                                </div>{" "}
                                <button className="btn-main me-1">
                                  <Link
                                    target="_blank"
                                    to={`/mentor-club/mentor-profile/${
                                      session.mentor_firstname +
                                      "-" +
                                      session.mentor_lastname
                                        .replace(" ", "-")
                                        .toLowerCase()
                                    }/${session.mentor_user_dtls_id}`}
                                  >
                                    BOOK AGAIN
                                  </Link>
                                </button>
                              </>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MenteeCompletedSessionCard;
