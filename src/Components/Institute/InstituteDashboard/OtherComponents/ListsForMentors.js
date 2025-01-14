import React, { useState } from "react";
import "../DashboardCSS/listForGuest.css";
import { Link } from "react-router-dom";

function ListsForGuestMentors({ data }) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Customize as needed

  // Pagination logic
  const indexOfLastMentor = currentPage * itemsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - itemsPerPage;
  const currentMentors = data.slice(indexOfFirstMentor, indexOfLastMentor);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(totalPages);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const handleFirstPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

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
          {currentMentors.map((mentor) => (
            <tr key={mentor.id}>
              <td style={{ textTransform: "capitalize" }}>
                {mentor.user_firstname + " " + mentor.user_lastname}
              </td>
              <td>{mentor.mentor_country}</td>
              <td>
                {(() => {
                  try {
                    return (
                      mentor.expertise_list
                        ? JSON.parse(mentor.expertise_list)
                        : []
                    ).map((passion, index, array) => (
                      <span key={`${mentor.id}-${index}`}>
                        {passion.mentor_expertise}
                        {index < array.length - 1 && ", "}
                      </span>
                    ));
                  } catch (e) {
                    console.error("Error parsing expertise_list", e);
                    return null;
                  }
                })()}
              </td>
              <td>{mentor.mentor_email}</td>
              <td>{"+" + mentor.mentor_phone_number}</td>
              <td>
                <button className="profile-button">
                  <Link
                    to={`/mentor-club/mentor-profile/${
                      mentor.user_firstname +
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
          ))}
        </tbody>
      </table>

      {totalPages ? (
        <div className="pagination-controls">
          <button onClick={handleFirstPage} disabled={currentPage === 1}>
            First
          </button>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          >
            End
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
function ListsForOtherMentors({ data }) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Customize as needed

  // Pagination logic
  const indexOfLastMentor = currentPage * itemsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - itemsPerPage;
  const currentMentors = data.slice(indexOfFirstMentor, indexOfLastMentor);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(totalPages);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const handleFirstPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

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
            {/* <th>Send Invite</th> */}
          </tr>
        </thead>
        <tbody>
          {currentMentors.map((mentor) => (
            <tr key={mentor.id}>
              <td style={{ textTransform: "capitalize" }}>
                {mentor.user_firstname + " " + mentor.user_lastname}
              </td>
              <td>{mentor.mentor_country}</td>
              <td>
                {(() => {
                  try {
                    return (
                      mentor.expertise_list
                        ? JSON.parse(mentor.expertise_list)
                        : []
                    ).map((passion, index, array) => (
                      <span key={`${mentor.id}-${index}`}>
                        {passion.mentor_expertise}
                        {index < array.length - 1 && ", "}
                      </span>
                    ));
                  } catch (e) {
                    console.error("Error parsing expertise_list", e);
                    return null;
                  }
                })()}
              </td>
              <td>{mentor.mentor_email}</td>
              <td>{"+" + mentor.mentor_phone_number}</td>
              <td>
                <button className="profile-button">
                  <Link
                    to={`/mentor-club/mentor-profile/${
                      mentor.user_firstname +
                      mentor.user_lastname.replace(" ", "-").toLowerCase()
                    }/${mentor.user_dtls_id}`}
                  >
                    Profile
                  </Link>
                </button>
              </td>
              {/* <td>
                <button className="action-button invite-button">
                  Send Invite
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages ? (
        <div className="pagination-controls">
          <button onClick={handleFirstPage} disabled={currentPage === 1}>
            First
          </button>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          >
            End
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ListsForGuestMentors;
export { ListsForOtherMentors };
