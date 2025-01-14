import React from "react";
const MentorCompletedSessionCard = ({
  allMentorCompletedBookingSessions,
  user,
  token,
}) => {
  return (
    <>
      {allMentorCompletedBookingSessions?.map((session) => {
        return (
          <div className="col-lg-3 mb-3">
            <div className="ghfghgfhg iuhuh__enruiere mb-0">
              <div className="jghdfrg">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="doiejrer_left">
                      <div className="kmg">
                        <img src={session.mentee_profile} alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="doiejrer_right mt-3">
                      <div className="dfhjbghfjgfgh22">
                        <h4>
                          {session.mentee_firstname +
                            " " +
                            session.mentee_lastname}
                        </h4>
                        <h5>{session.mentee_type}</h5>
                        <hr />
                        <div className="row mt-3 justify-content-center">
                          <div className="col-lg-6 mb-2">
                            <div className="ierjuhrt_left">
                              <h5 className="mb-0">
                                <i className="fa-regular me-1 fa-clock"></i>
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
                                <i className="fa-solid me-1 fa-calendar-days"></i>
                                Date :
                              </h5>

                              <p className="my-0">
                                {new Date(
                                  session.mentor_session_booking_date
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="kbfhgfgfg d-flex justify-content-center mt-3">
                          {session.mentor_booking_confirmed === "Yes" &&
                          session.mentor_session_status === "completed" &&
                          session.feedback_details !== null ? (
                            <>
                              <div className="error-box-green">
                                You have already completed this mentor session.
                                You can find the feedback below.
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="error-box-green">
                                You have already completed this mentor session.
                                Mentee did not submitted the feedback
                              </div>
                            </>
                          )}
                        </div>
                        {session.feedback_dtls !== null &&
                          JSON.parse(session.feedback_details).map(
                            (feedback) => {
                              return (
                                <div className="col-lg mb-2">
                                  <div className="ierjuhrt">
                                    <h5 className="mb-0">
                                      <i className="fa-regular me-1 fa-face-smile"></i>
                                      Rating :
                                      {
                                        feedback.mentor_feedback_session_overall_rating
                                      }
                                      /5
                                    </h5>
                                    <p>
                                      <b>Your Feedback :</b>
                                      {feedback.mentor_feedback_detailed_fb}
                                    </p>
                                    <p>
                                      <b>Suggestion by mentee :</b>
                                      {feedback.mentor_feedback_add_fb_sugg}
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                          )}
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

export default MentorCompletedSessionCard;
