import React from "react";
import AdminDashboard from "../../Components/Admin/Dashboard/AdminDashboard";
import GoToTop from "../../Utils/GoToTop";

const AdminDashboardPage = () => {
  document.title = "Practywiz | Admin Dashboard";

  return (
    <>
      <AdminDashboard />
      <GoToTop />
    </>
  );
};

export default AdminDashboardPage;
