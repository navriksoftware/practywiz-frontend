import React, { useEffect, useState } from "react";
import "./InstituteguestlctSearch.css";
import { Link } from "react-router-dom";
import ListStatusSkeleton from "../SkeltonLoaders/ListStatusSkeleton";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";
import { toast } from "react-toastify";
const AdminNotApprovedAllMentors = () => {
  const [allMentors, setAllMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = ApiURL();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const response = await Promise.race([
          axios.get(
            `${url}api/v1/admin/dashboard/mentors/not-approved/all-list`,
            {
              headers: { authorization: "Bearer " + token },
            }
          ),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setAllMentors(response.data.success);
        } else if (response.data.error) {
          setAllMentors([]);
        }
      } catch (error) {
        setAllMentors([]);
        if (error.message === "Request timed out") {
          toast.error("Request timed out. Please try again.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, [url, token]);

  const SendMentorEmailAlertHandler = async (mentor) => {
    try {
      const response = await Promise.race([
        axios.post(
          `${url}api/v1/admin/dashboard/mentors/progress/email-alert`,
          {
            userId: mentor.mentor_user_dtls_id,
            mentorName: mentor.mentor_firstname + " " + mentor.mentor_lastname,
            mentorEmail: mentor.mentor_email,
          },
          {
            headers: { authorization: "Bearer " + token },
          }
        ),
        new Promise(
          (_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
        ),
      ]);

      if (response.data.success) {
        toast.success(response.data.success);
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      if (error.message === "Request timed out") {
        toast.error("Request timed out. Please try again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-10 ps-0">
      <div className="mentor_dash_msge">
        <div>
          <div className="containerOfGueste">
            <div className="containerOfCard">
              <div className="table-container">
                <table className="mentor-table">
                  <thead>
                    <tr>
                      <th>S No</th>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Progress</th>
                      <th>Profile</th>
                      <th>Approval Status</th>
                      <th>Email Alert</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <>
                        <ListStatusSkeleton columns={9} />
                      </>
                    )}
                    {allMentors?.length === 0 ? (
                      <h1>No mentor found</h1>
                    ) : (
                      allMentors?.map((mentor) => (
                        <tr key={mentor.id}>
                          <td>{mentor.mentor_dtls_id}</td>
                          <td style={{ textTransform: "capitalize" }}>
                            {mentor.mentor_firstname +
                              " " +
                              mentor.mentor_lastname}
                          </td>
                          <td>{mentor.mentor_country}</td>
                          <td>{mentor.mentor_email}</td>
                          <td>{mentor.mentor_phone_number}</td>
                          <td>{mentor.total_progress}</td>
                          <td>
                            <button className="profile-button" disabled={true}>
                              {mentor.total_progress >= 80 ? (
                                <Link
                                  target="_blank"
                                  to={`/mentor-connect/mentor-profile/private/${
                                    mentor.mentor_firstname.toLowerCase() +
                                    "-" +
                                    mentor.mentor_lastname
                                      .replace(" ", "-")
                                      .toLowerCase()
                                  }/${mentor.mentor_user_dtls_id}`}
                                >
                                  View Profile
                                </Link>
                              ) : (
                                "Profile can not be viewed"
                              )}
                            </button>
                          </td>
                          <td>
                            Not Approved
                            <i
                              className="fa-solid fa-circle-check fa-lg"
                              style={{ color: "#ff1414" }}
                            ></i>
                          </td>
                          <td>
                            {mentor.total_progress < 80 ? (
                              <button
                                className="profile-button"
                                onClick={() => {
                                  SendMentorEmailAlertHandler(mentor);
                                }}
                              >
                                Email Alert
                              </button>
                            ) : (
                              <button className="profile-button">
                                No need of alerting
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
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

export default AdminNotApprovedAllMentors;
