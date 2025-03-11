import axios from "axios";
import React,{useState} from "react";
import { toast } from "react-toastify";
import { ApiURL } from "../../../../Utils/ApiURL";
import { Link } from "react-router-dom";
import "./UpcomingUpdatedcard.css"
const MentorUpcomingSessionCard = ({ allBookingSessions, user, token }) => {
  const url = ApiURL();
 const [BtnLoading, setBtnLoading] = useState(false)

  const ApproveMentorSessionHandler = async (
    BookingId,
    mentorUserDtlsId,
    menteeUserDtlsId
  ) => {
    if (BookingId) {
      try {
        setBtnLoading(true)
        const response = await axios.post(
          `${url}api/v1/mentor/booking/appointment/update`,
          { bookingId: BookingId, mentorUserDtlsId, menteeUserDtlsId }

        );
        if (response.data.success) {
          toast.success("Successfully updated mentor booking session.");
          setBtnLoading(false)
        }
        if (response.data.error) {
          toast.error("There was an error while updating the mentor session.");
          setBtnLoading(false)
        }
      } catch (error) {
        toast.error("There was an error while updating the mentor session.");
        setBtnLoading(false)
      }
    } else {
      toast.error(
        "There was an error while updating the booking. Please try again after sometime!"
      );
      setBtnLoading(false)
    }
  };
  return (
    <>
      {allBookingSessions?.slice(0).reverse().map((session) => {
        return (
          <div className="mentor-approval-card">
            <div className="mentor-card-header">
              <img
                src={session.mentee_profile_pic_url}
                alt={session.mentee_firstname +
                  " " +
                  session.mentee_lastname}
                className="mentor-photo"
              />

              <div className="session-details">
                <h3>Session Details</h3>
                <p><strong>Date:</strong>{new Date(
                  session.mentor_session_booking_date
                ).toLocaleDateString()}</p>
                <p><strong>Time:</strong>{session.mentor_booking_time}</p>

              </div>

            </div>
            <div className="mentor-info session-details session-details-flex">
              <h2 className="UpcomingUpdated-card-name">{session.mentee_firstname +
                " " +
                session.mentee_lastname} </h2>
              <p className="mentor-role">({session.mentee_type})</p>
            </div>


            <div className="mentee-query mentee-query-scroll">
              <h3>Mentee Query</h3>
              <p>{session.mentor_options}</p>
              <p>{session.mentor_questions}</p>
            </div>

            {session.mentor_booking_confirmed === "No" &&
              new Date(session.mentor_session_booking_date) >
              new Date() && (
                <>
                  <div className="error-box">
                    Please approve this session to connect with the mentee.
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
                   Approve Now
                  </button>
                </>
              )}
            {session.mentor_booking_confirmed === "No" &&
              new Date(session.mentor_session_booking_date) <
              new Date() && (
                <div className="error-box">
                  You can't accept this appointment. The date has passed.
                </div>
              )}

            {session.mentor_booking_confirmed === "Yes" &&
              new Date(session.mentor_session_booking_date) >
              new Date() && (
                <>
                  <div className="error-box-green">
                    "You've already approved this session. Please host it at the scheduled time!"
                  </div>
                  <button className="btn-main">
                    <Link
                      to={`${session.mentor_host_url}`}
                      target="_blank"
                    >
                      Host Meeting
                    </Link>
                  </button>
                </>
              )}
          </div>
        );
      })}
    </>
  );
};

export default MentorUpcomingSessionCard;
