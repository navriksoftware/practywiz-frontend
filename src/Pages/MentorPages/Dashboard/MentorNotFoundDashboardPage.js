import React from "react";
import MentorNotFoundDashboard from "../../../Components/Mentor/MentorDashboard/MentorNotFoundDashboard";
import GoToTop from "../../../Utils/GoToTop";
const MentorNotFoundDashboardPage = ({ user, token }) => {
  document.title = "Practywiz | Mentor Dashboard";
  return (
    <>
      <MentorNotFoundDashboard user={user} token={token} />
      <GoToTop />
    </>
  );
};

export default MentorNotFoundDashboardPage;
