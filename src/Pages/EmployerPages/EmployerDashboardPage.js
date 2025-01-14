import React from "react";
import Footer from "../../Components/Footer/Footer";
import EmployerDashboard from "../../Components/Employer/EmployerDashboard";
import GoToTop from "../../Utils/GoToTop";
const EmployerDashboardPage = ({ user, token }) => {
  return (
    <>
      <EmployerDashboard user={user} token={token} />
      <Footer />
      <GoToTop />
    </>
  );
};

export default EmployerDashboardPage;
