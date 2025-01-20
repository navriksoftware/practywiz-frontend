import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { ApiURL } from "../../../../Utils/ApiURL";
import { Link } from "react-router-dom";
const MentorUpcomingSessionCard = ({ allBookingSessions, user, token }) => {
  const url = ApiURL();
  const ApproveMentorSessionHandler = async (
    BookingId,
    mentorUserDtlsId,
    menteeUserDtlsId
  ) => {
    if (BookingId) {
      try {
        const response = await axios.post(
          `${url}api/v1/mentor/booking/appointment/update`,
          { bookingId: BookingId, mentorUserDtlsId, menteeUserDtlsId }
        );
        if (response.data.success) {
          toast.success("Successfully updated mentor booking session.");
        }
        if (response.data.error) {
          toast.error("There was an error while updating the mentor session.");
        }
      } catch (error) {
        toast.error("There was an error while updating the mentor session.");
      }
    } else {
      toast.error(
        "There was an error while updating the booking. Please try again after sometime!"
      );
    }
  };
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
                        <img src={session.mentee_profile_pic_url} alt="" />
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
                          {session.mentor_booking_confirmed === "No" &&
                            new Date(session.mentor_session_booking_date) >
                              new Date() && (
                              <>
                                <div className="error-box">
                                  Please approve this Mentor session to connect
                                  with Mentee for the session.
                                </div>
                                <button
                                  className="btn-main me-1"
                                  onClick={() =>
                                    ApproveMentorSessionHandler(
                                      session.mentor_booking_appt_id,
                                      session.mentor_user_dtls_id,
                                      session.mentee_user_dtls_id
                                    )
                                  }
                                >
                                  Approve Now!
                                </button>
                              </>
                            )}
                          {session.mentor_booking_confirmed === "No" &&
                            new Date(session.mentor_session_booking_date) <
                              new Date() && (
                              <div className="error-box">
                                You cannot accept this appointment. The date has
                                already passed.
                              </div>
                            )}

                          {session.mentor_booking_confirmed === "Yes" &&
                            new Date(session.mentor_session_booking_date) >
                              new Date() && (
                              <>
                                <div className="error-box-green">
                                  You have already approved this mentor session.
                                  Please host the session on the booking time
                                  and date!
                                </div>
                                <button className="btn-main">
                                  <Link
                                    to={`${session.mentor_host_url}`}
                                    target="_blank"
                                  >
                                    Host Meeting!
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

export default MentorUpcomingSessionCard;
