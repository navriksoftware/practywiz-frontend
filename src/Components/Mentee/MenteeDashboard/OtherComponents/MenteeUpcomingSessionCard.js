import React from "react";
import { Link } from "react-router-dom";
const MenteeUpcomingSessionCard = ({ allBookingSessions }) => {
  return (
    <>
      {allBookingSessions?.map((session) => {
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
                          {session.user_firstname + " " + session.user_lastname}
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

                          {/* <div className="col-lg-6 mb-2">
                          <div className="ierjuhrt_left">
                            <h5 className="mb-0">
                              <i className="fa-regular me-1 fa-face-smile"></i>{" "}
                              Rating :
                            </h5>

                            <p className="my-0">4.9/5</p>
                          </div>
                        </div> */}
                        </div>
                        <hr />
                        <div className="kbfhgfgfg d-flex justify-content-center mt-3">
                          {session.mentor_booking_confirmed === "No" && (
                            <div className="error-box">
                              Mentor has not confirmed session! Please wait for
                              to approve your booking
                            </div>
                          )}
                          {session.mentor_booking_confirmed === "Yes" && (
                            <>
                              <div className="error-box-green ">
                                Mentor has confirmed session! Please join using
                                the following link on same day and time.!
                              </div>
                              <button className="btn-main me-1">
                                <Link
                                  target="_blank"
                                  to={`${session.trainee_join_url}`}
                                >
                                  Join Now
                                </Link>
                              </button>
                              <button className="btn-main">Cancel</button>
                              {/* <button className="btn-main mt-2">
                                Request Reschedule
                              </button> */}
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

export default MenteeUpcomingSessionCard;
