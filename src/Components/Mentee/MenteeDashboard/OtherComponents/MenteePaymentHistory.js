import React from "react";

const MenteePaymentHistory = ({ singleMentee }) => {
  return (
    <div className="cols-lg-10 ps-0">
      <div className="mentor_dash_msge">
        <div>
          <div className="containerOfGueste">
            {/* <div className="containerOfFilter">
              <label htmlFor="location">
                <h6 className="inline">Payment Status</h6>
                <select name="location" id="location">
                  <option value="">Select Location</option>
                  <option value="India">Yes</option>
                  <option value="mumbai">No</option>
                </select>
              </label>
              <label htmlFor="skill">
                <h6 className="inline">Session Date</h6>
                <select name="skill" id="skill">
                  <option value="">Select skill</option>
                  <option value="AI">AI</option>
                  <option value="Agile">Agile</option>
                  <option value="Cloud">Cloud</option>
                  <option value="webDevloper">Web Devloper</option>
                  <option value="frontendDevloper">Frontend Devloper</option>
                  <option value="backendDevloper">Backend Devloper</option>
                </select>
              </label>
              <label htmlFor="institute">
                <h6 className="inline">Institute</h6>
                <select name="institute" id="institute">
                  <option value="">Select Institute</option>
                  <option value="du">DU</option>
                  <option value="jnu">JNU</option>
                </select>
              </label>
              <label htmlFor="qualification">
                <h6 className="inline">Qualification</h6>
                <select name="qualification" id="qualification">
                  <option value="">Select Qualification</option>
                  <option value="graduate">Graduate</option>
                  <option value="post-graduate">Post-Graduate</option>
                </select>
              </label>

              <div></div>
              <button>Apply Filter</button>
            </div> */}
            <div className="containerOfCard">
              <div className="table-container">
                <table className="mentor-table">
                  <thead>
                    <tr>

                      <th>Session Date</th>
                      <th>Booked Date</th>
                      <th>Booking Time</th>
                      <th>Payment Order & Id</th>
                      <th>Paid Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {JSON?.parse(singleMentee[0]?.booking_list)?.map(
                      (appointment) => {
                        return (
                          <tr key={appointment.mentor_booking_appt_id}>

                            <td style={{ textTransform: "capitalize" }}>
                              {new Date(
                                appointment.mentor_session_booking_date
                              ).toDateString()}
                            </td>
                            <td>{appointment.mentor_booked_date}</td>
                            <td>{appointment.mentor_booking_time}</td>
                            <td>
                              {appointment.mentor_razorpay_payment_id +
                                " / " +
                                appointment.mentor_razorpay_order_id}
                            </td>
                            <td>
                              {appointment.mentor_amount_paid_status ===
                                "Yes" ? (
                                <>
                                  <i
                                    className="fa-solid fa-circle-check fa-lg"
                                    style={{ color: "#4cee49" }}
                                  ></i>
                                </>
                              ) : (
                                <>
                                  <i
                                    className="fa-solid fa-circle-check fa-lg"
                                    style={{ color: "#4cee49" }}
                                  ></i>
                                </>
                              )}
                              {" " + appointment.mentor_amount_paid_status}
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteePaymentHistory;
