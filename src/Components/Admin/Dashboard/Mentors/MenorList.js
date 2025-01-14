import React, { useEffect, useState } from "react";
import "./MentorList.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ListStatusSkeleton from "../SkeltonLoaders/ListStatusSkeleton";
import { ApiURL } from "../../../../Utils/ApiURL";
import { toast } from "react-toastify";

function MentorList({ filters }) {
  const [allMentors, setAllMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);

  const url = ApiURL();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await Promise.race([
          axios.get(`${url}api/v1/admin/dashboard/mentor/approved/all-list`),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setAllMentors(response.data.success);
        } else {
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
        setAllMentors([]);
      }
    };
    fetchMentors();
  }, [url]);

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

  return (
    <div className="table-container">
      <table className="mentor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Skill</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Profile</th>
            <th>Send Invite</th>
          </tr>
        </thead>
        <tbody>
          {allMentors.length === 0 ? (
            <>
              <ListStatusSkeleton />
              <ListStatusSkeleton />
              <ListStatusSkeleton />
              <ListStatusSkeleton />
              <ListStatusSkeleton />
              <ListStatusSkeleton />
            </>
          ) : (
            filteredMentors.map((mentor) => (
              <tr key={mentor.id}>
                <td style={{ textTransform: "capitalize" }}>
                  {mentor.user_firstname + " " + mentor.user_lastname}
                </td>
                <td>{mentor.mentor_country}</td>
                <td>
                  {JSON.parse(mentor.expertise_list).map(
                    (passion, index, array) => {
                      return (
                        <span key={index}>
                          {passion.mentor_expertise}
                          {index < array.length - 1 && ", "}
                        </span>
                      );
                    }
                  )}
                </td>
                <td>{mentor.mentor_email}</td>
                <td>{"+" + mentor.mentor_phone_number}</td>
                <td>
                  <button className="profile-button">
                    <Link
                      to={`/mentor-club/mentor-profile/${
                        mentor.user_firstname +
                        "-" +
                        mentor.user_lastname.replace(" ", "-").toLowerCase()
                      }/${mentor.user_dtls_id}`}
                    >
                      Profile
                    </Link>
                  </button>
                </td>
                <td>
                  <button className="action-button invite-button">
                    Send Invite
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MentorList;
