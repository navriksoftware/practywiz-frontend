// src/middleware/authMiddleware.js
import { jwtDecode } from "jwt-decode";
import { logOut } from "./userRedux";

const authMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // Check if the action type is not logOut to avoid self-triggering
    if (action.type !== logOut.type) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            dispatch(logOut());
            console.log("Token is not valid");
          } else {
            console.log("Token is valid");
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          dispatch(logOut());
        }
      } else {
        console.log("token is not available");
      }
    }

    return next(action);
  };

export default authMiddleware;
