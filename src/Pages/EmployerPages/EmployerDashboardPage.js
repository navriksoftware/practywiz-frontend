import React from "react";
import Footer from "../../Components/Footer/Footer";
import EmployerDashboard from "../../Components/Employer/EmployerDashboard";
import GoToTop from "../../Utils/GoToTop";
const EmployerDashboardPage = ({ user, token }) => {
  document.title = "Practywiz | Dashboard";
  return (
    <>
      <EmployerDashboard user={user} token={token} />
      <Footer />
      <GoToTop />
    </>
  );
};

export default EmployerDashboardPage;
