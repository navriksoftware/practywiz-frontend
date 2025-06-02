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
const AdminApprovedAllMentors = () => {
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
  const [allMentors, setAllMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = ApiURL();
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const response = await Promise.race([
          axios.get(`${url}api/v1/admin/dashboard/mentors/approved/all-list`, {
            headers: { authorization: "Bearer " + token },
          }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);
        setLoading(false);
        if (response.data.success) {
          setAllMentors(response.data.success);
        } else if (response.data.error) {
          setAllMentors([]);
          toast.error(response.data.error);
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

  useEffect(() => {
    const filterMentors = () => {
      let filtered = allMentors;
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
  }, [filters, allMentors]);
  const [setAppliedFilters] = useState(filters);

  const handleApplyFilter = () => {
    setAppliedFilters(filters);
  };
  const dispatch = useDispatch();

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
              <label htmlFor="areaOfMentorship">
                <h6 className="inline">Area Of Mentorship</h6>
                <select
                  name="areaOfMentorship"
                  id="areaOfMentorship"
                  onChange={handleChange}
                >
                  <option value="">Select Area Of Mentorship</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="haryana">Haryana</option>
                  <option value="grugram">Grugram</option>
                </select>
              </label>
              <label htmlFor="experience">
                <h6 className="inline">Experience</h6>
                <select
                  name="experience"
                  id="experience"
                  onChange={handleChange}
                >
                  <option value="">Select Experience</option>
                  <option value="fresher">Fresher</option>
                  <option value="10">10 Years</option>
                  <option value="20">20 Years</option>
                </select>
              </label>
              <div></div>
              <button onClick={handleApplyFilter}>Apply Filter</button>
            </div>
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
                      <th>Profile</th>
                      <th>Approval Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <>
                        <ListStatusSkeleton columns={7} />
                      </>
                    )}
                    {allMentors?.length === 0 ? (
                      <h1>No mentor found</h1>
                    ) : (
                      filteredMentors?.map((mentor) => (
                        <tr key={mentor.mentor_dtls_id}>
                          <td>{mentor.mentor_dtls_id}</td>
                          <td style={{ textTransform: "capitalize" }}>
                            {mentor.user_firstname + " " + mentor.user_lastname}
                          </td>
                          <td>{mentor.mentor_country}</td>
                          <td>{mentor.mentor_email}</td>
                          <td>{mentor.mentor_phone_number}</td>
                          <td>
                            <button className="profile-button">
                              <Link
                                target="_blank"
                                to={`/mentor-connect/mentor-profile/private/${
                                  mentor.user_firstname +
                                  "-" +
                                  mentor.user_lastname
                                    .replace(" ", "-")
                                    .toLowerCase()
                                }/${mentor.user_dtls_id}`}
                              >
                                View Profile
                              </Link>
                            </button>
                          </td>

                          <td>
                            Approved{" "}
                            <i
                              className="fa-solid fa-circle-check fa-lg"
                              style={{ color: "#4cee49" }}
                            ></i>
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

export default AdminApprovedAllMentors;
