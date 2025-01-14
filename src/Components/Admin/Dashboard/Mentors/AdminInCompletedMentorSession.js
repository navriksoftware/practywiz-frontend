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
const AdminInCompletedMentorSession = () => {
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
  const [allInCompletedSession, setAllInCompletedSession] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = ApiURL();
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);

        const response = await Promise.race([
          axios.get(
            `${url}api/v1/admin/dashboard/mentors/booking/in-completed-session-lists`,
            {
              headers: { authorization: "Bearer " + token },
            }
          ),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);
        setLoading(false);
        if (response.data.success) {
          setAllInCompletedSession(response.data.success);
        } else if (response.data.error) {
          setAllInCompletedSession([]);
          toast.error("No in-completed session found");
        }
      } catch (error) {
        setAllInCompletedSession([]);
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

  useEffect(() => {
    const filterMentors = () => {
      let filtered = allInCompletedSession;
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
  }, [filters, allInCompletedSession]);
  const [setAppliedFilters] = useState(filters);

  const handleApplyFilter = () => {
    setAppliedFilters(filters);
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
            <div className="containerOfCard">
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
                      <th>Mentor reason for not attending</th>
                      <th>Mentee reason for not attending</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <>
                        <ListStatusSkeleton columns={8} />
                      </>
                    )}
                    {allInCompletedSession?.length === 0 ? (
                      <h3>No in-completed session found</h3>
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
                            {mentor.mentor_booking_confirmed === "No" &&
                              "Mentor not accepted the session"}
                          </td>
                          <td>
                            {mentor.mentor_booking_confirmed === "No" && (
                              <button className="disapprove-button">
                                Issue refund to Mentee
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

export default AdminInCompletedMentorSession;
