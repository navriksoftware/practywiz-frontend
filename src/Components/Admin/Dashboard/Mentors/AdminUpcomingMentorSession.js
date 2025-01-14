import React, { useEffect, useState } from "react";
import "./InstituteguestlctSearch.css";
import { Link } from "react-router-dom";
import ListStatusSkeleton from "../SkeltonLoaders/ListStatusSkeleton";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";
import { toast } from "react-toastify";
import "./MentorList.css";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import { useDispatch } from "react-redux";
const AdminUpcomingMentorSession = () => {
  const token = localStorage.getItem("accessToken");
  const [filters, setFilters] = useState({
    location: "",
    skill: "",
    institute: "",
    qualification: "",
    areaOfMentorship: "",
    experience: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  const [allUpcomingMentorSessions, setAllUpcomingMentorSessions] = useState(
    []
  );
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = ApiURL();
  useEffect(() => {
    const fetchUpcomingMentors = async () => {
      try {
        setLoading(true);

        const response = await Promise.race([
          axios.get(
            `${url}api/v1/admin/dashboard/mentors/booking/upcoming-session-lists`,
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
          setAllUpcomingMentorSessions(response.data.success);
        } else if (response.data.error) {
          setAllUpcomingMentorSessions([]);
          toast.error(response.data.error);
        }
      } catch (error) {
        setAllUpcomingMentorSessions([]);
        if (error.message === "Request timed out") {
          toast.error("Request timed out. Please try again.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUpcomingMentors();
  }, [url, token]);

  useEffect(() => {
    const filterMentors = () => {
      let filtered = allUpcomingMentorSessions;
      if (filters.location) {
        filtered = filtered.filter(
          (mentor) => mentor.mentor_country === filters.location
        );
      }
      if (filters.skill) {
        filtered = filtered.filter((mentor) =>
          JSON.parse(mentor.expertise_list).some(
            (expertise) => expertise.mentor_expertise === filters.skill
          )
        );
      }
      if (filters.institute) {
        filtered = filtered.filter(
          (mentor) => mentor.institute === filters.institute
        );
      }
      if (filters.qualification) {
        filtered = filtered.filter(
          (mentor) => mentor.qualification === filters.qualification
        );
      }
      if (filters.areaOfMentorship) {
        filtered = filtered.filter(
          (mentor) => mentor.area_of_mentorship === filters.areaOfMentorship
        );
      }
      if (filters.experience) {
        filtered = filtered.filter(
          (mentor) => mentor.experience === filters.experience
        );
      }

      setFilteredMentors(filtered);
    };

    filterMentors();
  }, [filters, allUpcomingMentorSessions]);
  const [setAppliedFilters] = useState(filters);

  const handleApplyFilter = () => {
    setAppliedFilters(filters);
  };
  const dispatch = useDispatch();

  const EmailRemainderHandler = async (id, email, mentorName, userId) => {
    dispatch(showLoadingHandler());
    const response = await axios.get(
      `${url}api/v1/admin/dashboard/mentors/update/not-approve`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    setLoading(false);
    dispatch(hideLoadingHandler());
    if (response.data.success) {
      return (
        toast.success("Mentor disapproved successfully"),
        setLoading(false),
        dispatch(hideLoadingHandler())
      );
    }
    if (response.data.error) {
      return (
        toast.error("There is some error while approving the mentor"),
        setLoading(false),
        dispatch(hideLoadingHandler())
      );
    }
  };
  return (
    <div className="col-lg-10 ps-0">
      <div className="mentor_dash_msge">
        <div>
          <div className="containerOfGueste">
            <div className="containerOfFilter">
              <label htmlFor="location">
                <h6 className="inline">Location</h6>
                <select name="location" id="location" onChange={handleChange}>
                  <option value="">Select Location</option>
                  <option value="India">India</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="haryana">Haryana</option>
                  <option value="grugram">Grugram</option>
                </select>
              </label>
              <label htmlFor="skill">
                <h6 className="inline">Skill</h6>
                <select name="skill" id="skill" onChange={handleChange}>
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
                <select name="institute" id="institute" onChange={handleChange}>
                  <option value="">Select Institute</option>
                  <option value="du">DU</option>
                  <option value="jnu">JNU</option>
                </select>
              </label>
              <label htmlFor="qualification">
                <h6 className="inline">Qualification</h6>
                <select
                  name="qualification"
                  id="qualification"
                  onChange={handleChange}
                >
                  <option value="">Select Qualification</option>
                  <option value="graduate">Graduate</option>
                  <option value="post-graduate">Post-Graduate</option>
                </select>
              </label>

              <button onClick={handleApplyFilter}>Apply Filter</button>
            </div>
            <div className="containerOfCard1">
              <h3>Mentors Upcoming Sessions</h3>
              <div className="table-container">
                <table className="mentor-table">
                  <thead>
                    <tr>
                      <th>Mentor Name</th>
                      <th>Mentor Email</th>
                      <th>Mentee Name</th>
                      <th>Mentee Email</th>
                      <th>Mentor Session Approved Status</th>
                      <th>Session Date</th>
                      <th>Session Time</th>
                      <th>Session Status</th>
                      <th>Host Meeting</th>
                      <th>Session Approval Email Alert</th>
                      <th>Join Email Alert</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <>
                        <ListStatusSkeleton columns={10} />
                      </>
                    )}
                    {!loading && allUpcomingMentorSessions?.length === 0 ? (
                      <h3>No Upcoming session found</h3>
                    ) : (
                      filteredMentors?.map((mentor) => (
                        <tr key={mentor.id}>
                          <td style={{ textTransform: "capitalize" }}>
                            {mentor.mentor_firstname +
                              " " +
                              mentor.mentor_lastname}
                          </td>
                          <td>{mentor.mentor_email}</td>
                          <td style={{ textTransform: "capitalize" }}>
                            {mentor.mentee_firstname +
                              " " +
                              mentor.mentee_lastname}
                          </td>
                          <td>{mentor.mentee_email}</td>
                          <td>
                            {mentor.mentor_booking_confirmed === "Yes" ? (
                              <i
                                className="fa-solid fa-circle-check fa-lg"
                                style={{
                                  color: "#4cee49",
                                  marginRight: "10px",
                                }}
                              ></i>
                            ) : (
                              <i
                                className="fa-solid fa-circle-exclamation"
                                style={{
                                  color: "#f00f0f",
                                  marginRight: "10px",
                                }}
                              ></i>
                            )}

                            {mentor.mentor_booking_confirmed}
                          </td>
                          <td>
                            {new Date(
                              mentor.mentor_session_booking_date
                            ).toDateString()}
                          </td>
                          <td>{mentor.mentor_booking_time}</td>
                          <td>{mentor.mentor_session_status}</td>
                          <td>
                            {mentor.mentor_booking_confirmed === "No" ? (
                              "Mentor not accepted the session"
                            ) : (
                              <button className="profile-button">
                                <Link to={`${mentor.practy_team_host_url}`}>
                                  Host Meeting
                                </Link>
                              </button>
                            )}
                          </td>
                          <td>
                            <button
                              className="disapprove-button"
                              onClick={() => {
                                EmailRemainderHandler(
                                  mentor.mentor_dtls_id,
                                  mentor.mentor_email,
                                  mentor.user_firstname +
                                    " " +
                                    mentor.user_lastname,
                                  mentor.user_dtls_id
                                );
                              }}
                            >
                              Send Email Alert
                            </button>
                          </td>
                          <td>
                            <button
                              className="disapprove-button"
                              onClick={() => {
                                EmailRemainderHandler(
                                  mentor.mentor_dtls_id,
                                  mentor.mentor_email,
                                  mentor.user_firstname +
                                    " " +
                                    mentor.user_lastname,
                                  mentor.user_dtls_id
                                );
                              }}
                            >
                              Send Email Alert
                            </button>
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

export default AdminUpcomingMentorSession;
