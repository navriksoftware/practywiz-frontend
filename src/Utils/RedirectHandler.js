import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectHandler = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      // Redirect based on the user type
      if (user?.user_type === "mentor") {
        navigate("/mentor/dashboard");
      } else if (user?.user_type === "mentee") {
        navigate("/mentee/dashboard");
      } else if (user?.user_type === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div>
      {/* You can add a loading spinner or a message here if needed */}
      <p>Redirecting...</p>
    </div>
  );
};

export default RedirectHandler;
