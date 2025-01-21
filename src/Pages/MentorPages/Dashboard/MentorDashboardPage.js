import React from "react";
import MentorDashboard from "../../../Components/Mentor/MentorDashboard/MentorDashboard";


import GoToTop from "../../../Utils/GoToTop";
const MentorDashboardPage = ({ user, token }) => {
  document.title = "Practywiz | Mentor Dashboard";

  return (
    <>
      <MentorDashboard user={user} token={token} />
      
      <GoToTop />
    </>
  );
};

export default MentorDashboardPage;
