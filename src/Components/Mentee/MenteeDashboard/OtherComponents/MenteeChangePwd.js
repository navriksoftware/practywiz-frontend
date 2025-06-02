import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons for showing/hiding password
import "../DashboardCSS/ChangePwd.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import { ApiURL } from "../../../../Utils/ApiURL";
const MenteeChangePwd = ({ user, token }) => {
  const url = ApiURL();
  const dispatch = useDispatch();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(showLoadingHandler());
      const response = await Promise.race([
        axios.post(
          `${url}api/v1/auth/change/password`,
          {
            password: data.newPassword,
            userId: user?.user_id,
          },
          {
            headers: { authorization: "Bearer " + token },
          }
        ),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 45000)
        ),
      ]);

      if (response.data.success) {
        dispatch(hideLoadingHandler());
        toast.success("Password change successfully");
        reset();
      }
      if (response.data.error) {
        dispatch(hideLoadingHandler());
        toast.error("There is some error while changing the passwords");
      }
    } catch (error) {
      toast.error("There is some error while changing the passwords"); // Stop loading
      dispatch(hideLoadingHandler());
    } finally {
      dispatch(hideLoadingHandler());
    }
  };

  return (
    <div className="col-lg-10 ps-0">
      <div className="hiniertvrer_change_password">
        <div className="container">
          <div className="mentor-prf-settings py-5">
            <h3>Change Your Password</h3>
            <h5 className="mb-3">Update your Password</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3 position-relative">
                <label className="label-control">New Password</label>
                <input
                  className="form-control"
                  placeholder="New Password"
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 16,
                      message: "Password must be no more than 16 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/,
                      message:
                        "Password must include letters, numbers, and special characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-danger">{errors.newPassword.message}</p>
              )}
              <div className="mb-3 position-relative">
                <label className="label-control">Confirm New Password</label>
                <input
                  className="form-control"
                  placeholder="Confirm New Password"
                  type={showConfirmNewPassword ? "text" : "password"}
                  {...register("confirmNewPassword", {
                    required: "Please confirm your new password",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                >
                  {showConfirmNewPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.confirmNewPassword && (
                <p className="text-danger">
                  {errors.confirmNewPassword.message}
                </p>
              )}
              <button className="btn btn-main" type="submit">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeChangePwd;
