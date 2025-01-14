import React from "react";
import MentorDashboard from "../../../Components/Mentor/MentorDashboard/MentorDashboard";
import Footer from "../../../Components/Footer/Footer";

import GoToTop from "../../../Utils/GoToTop";
const MentorDashboardPage = ({ user, token }) => {
  document.title = "Practywiz | Mentor Dashboard";

  return (
    <>
      <MentorDashboard user={user} token={token} />
      <Footer />
      <GoToTop />
    </>
  );
};

export default MentorDashboardPage;
