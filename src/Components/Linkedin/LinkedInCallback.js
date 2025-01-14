import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiURL } from "../../Utils/ApiURL";
import { toast } from "react-toastify";

const LinkedInCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const url = ApiURL();
  useEffect(() => {
    const getAccessToken = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code"); // Extract authorization code from URL
      if (code) {
        try {
          // Send the authorization code to the backend to get an access token
          const response = await axios.post(`${url}getLinkedInToken`, { code });
          const accessToken = response.data.access_token;
          // If the access token is successfully received, fetch the LinkedIn profile
          fetchLinkedInProfile(accessToken);
          if (!accessToken) {
            return toast.error(
              "There is an error while fetching the LinkedIn profile details. Please sign up using the registration form!"
            );
          }
        } catch (error) {
          return toast.error(
            "There is an error while fetching the LinkedIn profile details. Please sign up using the registration form!"
          );
        }
      } else {
        return toast.error(
          "There is an error while fetching the LinkedIn profile details. Please sign up using the registration form!"
        );
      }
    };

    const fetchLinkedInProfile = async (accessToken) => {
      try {
        // Use the access token to fetch profile data from LinkedIn
        const profileResponse = await axios.get(`${url}getLinkedInProfile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass token in Authorization header
          },
        });
        if (profileResponse.data) {
          navigate("/register", {
            state: { profileData: profileResponse.data },
          });
        } else {
          return (
            navigate("/register"),
            toast.error(
              "There is an error while fetching the LinkedIn profile details. Please sign up using the registration form!"
            )
          );
        }
      } catch (error) {
        return (
          navigate("/register"),
          toast.error(
            "There is an error while fetching the LinkedIn profile details. Please sign up using the registration form!"
          )
        );
      }
    };

    // Invoke the function to handle the access token exchange and profile fetching
    getAccessToken();
  }, [location, navigate]);

  return <div>LinkedIn OAuth Callback</div>;
};

export default LinkedInCallback;
