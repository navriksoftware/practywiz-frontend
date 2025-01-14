import React from "react";
import MenteeDashboard from "../../../Components/Mentee/MenteeDashboard/MenteeDashboard";
import GoToTop from "../../../Utils/GoToTop";
const MenteeDashboardPage = ({ user, token }) => {
  document.title = "Practywiz | Mentee Dashboard";

  return (
    <>
      <MenteeDashboard user={user} token={token} />
      <GoToTop />
    </>
  );
};

export default MenteeDashboardPage;
