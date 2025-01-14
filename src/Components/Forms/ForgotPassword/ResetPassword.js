import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../Login/login.css";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../Redux/loadingRedux.js";
import { toast } from "react-toastify";
import { ApiURL } from "../../../Utils/ApiURL.js";
import { useParams } from "react-router-dom";
const ResetPassword = () => {
  const [showIcon, setShowIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const url = ApiURL();
  const password = watch("password");
  const params = useParams();
  const passwordSubmitHandler = async (data) => {
    try {
      dispatch(showLoadingHandler());
      const res = await Promise.race([
        axios.post(
          `${url}api/v1/auth/reset-password`,
          {
            password: data.password,
          },
          {
            headers: { authorization: "Bearer " + params.token },
          }
        ),
        new Promise(
          (_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
        ),
      ]);
      if (res.data.success) {
        toast.success(res.data.success);
      } else if (res.data.error) {
        toast.error(res.data.error);
      }
    } catch (error) {
      if (error.message === "Request timed out") {
        toast.error("Request timed out. Please try again.");
      } else {
        toast.error("There is some error, please try again!");
      }
    } finally {
      dispatch(hideLoadingHandler());
    }
  };

  return (
    <main>
      <div className="regis_background " id="loginBg">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="iuhieiuihaw_left sticky-top">
                <h3>
                  Grow Your Professional Career with
                  <span className="span222">Top-Rated</span> Mentors
                </h3>
                <p>
                  Join us to upgrade your professional career with our mentor’s
                  guidance. We provide a personalised training approach to
                  improve your project management skills. Master the skill to
                  work under pressure on various projects within tight
                  deadlines. At Practiwiz we have courses for working
                  professionals, MBA students, and aspiring IT business
                  analysts. Hurry up and reserve your mentorship className
                  today.
                </p>

                <h5 className="mt-4">Benefits of Our Mentorship Course:</h5>

                <ul className="ps-0 mt-3">
                  <li className="mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fa-solid fa-circle-check"></i>

                      <p className="mb-0">Self-paced training</p>
                    </div>
                  </li>

                  <li className="mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fa-solid fa-circle-check"></i>

                      <p className="mb-0">Flexible timing and scheduling</p>
                    </div>
                  </li>

                  <li className="mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fa-solid fa-circle-check"></i>

                      <p className="mb-0">
                        Career guidance from experienced mentors
                      </p>
                    </div>
                  </li>

                  <li className="mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fa-solid fa-circle-check"></i>

                      <p className="mb-0">Expert advice and guidance</p>
                    </div>
                  </li>

                  <li className="mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fa-solid fa-circle-check"></i>

                      <p className="mb-0">
                        <a href="/register">Sign Up Now!</a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="iuhieiuihaw_right bg-white p-5">
                <div className="uherrr_text text-center">
                  <h4>Forgot Password</h4>
                  <p className="mb-0">
                    Do Not Have An Account? <a href="/register">Sign Up</a>
                  </p>
                </div>

                <div
                  className="ihduwfr_form_wrapper mt-3"
                  style={{ height: "auto" }}
                >
                  <form onSubmit={handleSubmit(passwordSubmitHandler)}>
                    <div className="csfvgdtrfs mb-3 position-relative">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        className="form-control"
                        // id="exampleInputEmail1"
                        placeholder="Password must be at least 8 characters"
                        aria-describedby="emailHelp"
                        type={showIcon ? "text" : "password"}
                        {...register("password", {
                          required: "Password is Required",
                          pattern: {
                            value:
                              /^(?!.* )(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&.]{8,16}$/,
                            message:
                              "A min 8 - 16 characters contains a combination of upper, lowercase letter, number and special characters like @ $ ! % * ? & _ . without space",
                          },
                          maxLength: {
                            value: 16,
                            message: "Must be less than 16 characters.",
                          },
                        })}
                      />

                      <i
                        i="true"
                        onClick={() => setShowIcon(!showIcon)}
                        className={
                          showIcon
                            ? "fa-solid fa-eye position-absolute"
                            : "fa-solid fa-eye-slash position-absolute"
                        }
                      ></i>
                      {errors.password && (
                        <p className="Error-meg-login-register">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="csfvgdtrfs mb-3 position-relative">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Confirm Password
                      </label>
                      <input
                        // type="text"
                        className="form-control"
                        // id="exampleInputEmail1"
                        placeholder="Type your password again"
                        aria-describedby="emailHelp"
                        type={showIcons ? "text" : "password"}
                        //onChange={(e) => setConfirmPassword(e.target.value)}
                        {...register("confirm_password", {
                          required: "Password is Required",
                          validate: (value) =>
                            value === password || "Password must be matched",
                        })}
                      />

                      <i
                        i="true"
                        onClick={() => setShowIcons(!showIcons)}
                        className={
                          showIcons
                            ? "fa-solid fa-eye position-absolute"
                            : "fa-solid fa-eye-slash position-absolute"
                        }
                      />

                      {errors.confirm_password && (
                        <p className="Error-meg-login-register">
                          {errors.confirm_password.message}
                        </p>
                      )}
                    </div>
                    <a href="/login" className="uidherrrr_anchor">
                      All ready have an account ?
                    </a>
                    <button type="submit" className="btn btn-main py-3 mt-4">
                      Update Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
