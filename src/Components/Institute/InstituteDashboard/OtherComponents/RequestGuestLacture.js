import React, { useEffect, useState } from "react";
import "../DashboardCSS/invitationStatus.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ApiURL } from "../../../../Utils/ApiURL";
import ListStatusSkeleton from "./ListStatusSkeleton";

const RequestGuestLacture = () => {
  const [mentors, setMentors] = useState([]);
  // const [skeletonval, setSkeletonval] = useState(true);

  const url = ApiURL();

  useEffect(() => {
    const fetchMentors = async () => {
      const response = await axios.get(
        `${url}api/v1/institute//guest-lectures`
      );

      if (response.data.success) {
        setMentors(response.data.success);
        // setSkeletonval(false);
      }
      if (response.data.error) {
        setMentors([]);
        // setSkeletonval(false);
      }
    };
    fetchMentors();
    console.log(mentors);
  }, [url]);
  return (
    <div className="col-lg-10 ps-0">
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
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {mentors.length === 0 ? (
              <>
                <ListStatusSkeleton />
                <ListStatusSkeleton />
                <ListStatusSkeleton />
                <ListStatusSkeleton />
                <ListStatusSkeleton />
                <ListStatusSkeleton />
              </>
            ) : (
              mentors.map((mentor) => (
                <tr key={mentor.id}>
                  <td>{mentor.user_firstname + " " + mentor.user_lastname}</td>
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
                  <td>{mentor.mentor_phone_number}</td>
                  <td>
                    <button className="profile-button">
                      <Link
                        to={`/mentor-club/mentor-profile/${
                          mentor.user_firstname +
                          " " +
                          mentor.user_lastname.replace(" ", "-").toLowerCase()
                        }/${mentor.user_dtls_id}`}
                      >
                        Profile
                      </Link>
                    </button>
                  </td>
                  {/* <td
                className={`status ${mentor.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {mentor.status}
              </td> */}
                  <td>
                    <span style={{ color: "red" }}>Null</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {/* )} */}
        </table>
      </div>
    </div>
  );
};

export default RequestGuestLacture;
