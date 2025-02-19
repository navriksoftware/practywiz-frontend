import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import { ApiURL } from "../../../../Utils/ApiURL";
import { loginSuccess } from "../../../../Redux/userRedux";
import { useNavigate } from "react-router-dom";

const OrganizationForm = ({ OrganizationPreviousHandler }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    trigger,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("employer_password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = ApiURL();

  const cleanPhoneNumber = (phone) => {
    return phone.replace(/\D/g, "");
  };
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error parsing token:", error);
      return null;
    }
  };
  const phone = watch("employer_phone");

  useEffect(() => {
    setSendotp(false);
    setValue("mentee_OTPValid", "false");
    setButtonState("send");
    setIsLoading(false);
    setVerifyState("Verify");
    setIsLoadingVerify(false);
    setResendAvailable(false);
  }, [phone]);
  const [otp, setOtp] = useState("");
  const [Sendotp, setSendotp] = useState(false);
  const [buttonState, setButtonState] = useState("send");
  const [isLoading, setIsLoading] = useState(false);
  const [VerifyState, setVerifyState] = useState("Verify");
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);
  const [resendAvailable, setResendAvailable] = useState(false);

  function validatePhoneNumber(phone) {
    const regex = /^[+]?[0-9\s-]{10,17}$/;
    return regex.test(phone);
  }

  const handleSendOtp = async () => {
    setButtonState("send");
    setIsLoading(true);
    console.log("Phone:", phone);
    if (validatePhoneNumber(phone)) {
      try {
        // Make Axios POST request to send OTP
        const response = await axios.post(
          `${url}api/v1/otpvarification/request-otp`,
          { phone }
        );

        if (response.data.success) {
          setButtonState("sended");
          setSendotp(true);
          setResendAvailable(true);

          // Enable resend after 1 minute
          setTimeout(() => {
            setResendAvailable(false);
          }, 60000); // 1 minute timeout
        } else {
          setButtonState("send");
          alert(response.data.message || "Failed to send OTP");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        setButtonState("send");
        alert(
          error.response?.data?.message || "An error occurred while sending OTP"
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast.error("Please Enter Valid Phone Number");
    }
  };

  const handleVerifyOtp = async () => {
    setVerifyState("Verify");
    setIsLoadingVerify(true);
    if (otp.length === 6) {
      try {
        // Make Axios POST request to verify OTP
        const response = await axios.post(
          `${url}api/v1/otpvarification/validate-otp`,
          {
            phone,
            otp,
          }
        );

        if (response.data.success) {
          setVerifyState("Verified");
          alert("OTP Verified Successfully!");
          setValue("mentee_OTPValid", "true");
        } else {
          setVerifyState("Verify");

          alert(response.data.message || "OTP Verification Failed");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        setVerifyState("Verify");
        alert(
          error.response?.data?.message ||
            "An error occurred while verifying OTP"
        );
      } finally {
        setIsLoadingVerify(false);
      }
    } else {
      setIsLoadingVerify(false);
      toast.error("Please Enter Valid OTP");
    }
  };

  const handleResendOtp = async () => {
    if (resendAvailable) {
      alert("You can resend OTP after 1 minute.");
      return;
    }

    setButtonState("send");
    setIsLoading(true);

    try {
      // Make Axios POST request to resend OTP
      const response = await axios.post(
        `${url}api/v1/otpvarification/resend-otp`,
        { phone }
      );

      if (response.data.success) {
        setButtonState("sended");
        setSendotp(true);
        setResendAvailable(true);

        // Enable resend after 1 minute
        setTimeout(() => {
          setResendAvailable(false);
        }, 60000); // 1 minute timeout
      } else {
        setButtonState("send");
        alert(response.data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setButtonState("send");
      alert(
        error.response?.data?.message || "An error occurred while resending OTP"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const cleanedData = {
      ...data,
      employer_phone: cleanPhoneNumber(data.employer_phone),
    };
    if (VerifyState === "Verified") {
      try {
        dispatch(showLoadingHandler());
        const res = await Promise.race([
          axios.post(`${url}api/v1/employer/register`, cleanedData),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000)
          ),
        ]);
        dispatch(hideLoadingHandler());
        if (res.data.success) {
          reset();
          const token = res.data.token;
          const accessToken = res.data.accessToken;
          const userData = parseJwt(token);
          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          return (
            toast.success(
              "Account created successfully, Redirecting to the Dashboard"
            ),
            dispatch(loginSuccess(userData)),
            navigate(`/redirect`)
          );
        } else if (res.data.error) {
          toast.error("There is some error while registering as a employer.");
        }
      } catch (error) {
        if (error.message === "Request timed out") {
          toast.error("Request timed out. Please try again.");
        } else {
          toast.error("There is some error while signing as a employer.");
        }
      } finally {
        dispatch(hideLoadingHandler());
      }
    } else {
      toast.error("please verify your phone number first");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="step" id="employerInputFields">
        <h4 className="text-center">
          <img src="images/icons8-account-96.webp" alt="" className="me-1" />
          Employer Registration
        </h4>

        <div className="d-flex justify-content-center pt-3">
          <div className="uherrr_text text-center">
            <p className="mb-0">
              Already Have An Account? <a href="/login">Log In</a>
            </p>
          </div>
        </div>

        <div className="form_wrapper mt-3">
          <div className="row">
            <div className="col-lg-12">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  onKeyUp={() => trigger("employer_first_name")}
                  className="form-control"
                  id="firstName"
                  placeholder="Your First Name"
                  {...register("employer_first_name", {
                    required: "First name is required",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "First name should contain only letters",
                    },
                    minLength: {
                      value: 2,
                      message: "Must be at least 2 characters",
                    },
                  })}
                />
                {errors.employer_first_name && (
                  <p className="Error-meg-login-register">
                    {errors.employer_first_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  onKeyUp={() => trigger("employer_last_name")}
                  className="form-control"
                  id="lastName"
                  placeholder="Your Last Name"
                  {...register("employer_last_name", {
                    required: "Last name is required",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Last name should contain only letters",
                    },
                    minLength: {
                      value: 2,
                      message: "Must be at least 2 characters",
                    },
                  })}
                />
                {errors.employer_last_name && (
                  <p className="Error-meg-login-register">
                    {errors.employer_last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb-3">
                <label htmlFor="emailId" className="form-label">
                  Official Email Id
                </label>
                <input
                  type="email"
                  onKeyUp={() => trigger("employer_email")}
                  className="form-control"
                  id="emailId"
                  placeholder="name@company.com"
                  {...register("employer_email", {
                    required: "Official email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$|yahoo\.com$|outlook\.com$|hotmail\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid work email address",
                    },
                  })}
                />

                {errors.employer_email && (
                  <p className="Error-meg-login-register">
                    {errors.employer_email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb-3">
                <div className="h-25">
                  <Controller
                    onKeyUp={() => {
                      trigger("employer_phone");
                    }}
                    name="employer_phone"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Phone number is required",
                      validate: {
                        minLength: (value) =>
                          value.replace(/\D/g, "").length >= 10 ||
                          "Enter a valid phone number",
                      },
                    }}
                    render={({
                      field: { name, value, onChange, onBlur, ref },
                    }) => (
                      <div>
                        <label htmlFor="phone" className="form-label">
                          Phone Number{" "}
                          <span className="RedColorStarMark">*</span>
                        </label>

                        <div className="d-flex">
                          <PhoneInput
                            value={value}
                            country="in"
                            countryCodeEditable={false}
                            onChange={(
                              value,
                              country,
                              event,
                              formattedValue
                            ) => {
                              onChange(formattedValue);
                            }}
                            onBlur={onBlur}
                            inputProps={{
                              autoFocus: false,
                              name,
                              ref,
                            }}
                          />{" "}
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={isLoading}
                            className={`otp-button ${
                              isLoading ? "loading" : ""
                            } ${buttonState}`}
                          >
                            {isLoading ? (
                              <div className="button-content">
                                <div className="spinner"></div>Loading
                              </div>
                            ) : buttonState === "send" ? (
                              "Send OTP"
                            ) : (
                              "OTP Sended"
                            )}
                          </button>
                        </div>
                        <div className="aftersendOTP">
                            {" "}
                            {Sendotp && (
                              <>
                                <input
                                  type="number"
                                  placeholder="Enter OTP"
                                  className="PhoneNoOtpInput"
                                  onChange={(e) => setOtp(e.target.value)}
                                />
                                <button
                                  type="button"
                                  onClick={handleVerifyOtp}
                                  disabled={isLoadingVerify}
                                  style={{fontSize:"11px"}}
                                  className={`otp-buttonVerify ${
                                    isLoadingVerify ? "loadingVerify" : ""
                                  } ${VerifyState}`}
                                >
                                  {isLoadingVerify ? (
                                    <div className="button-contentVerify">
                                      <div className="spinnerVerifyOTP"></div>
                                      Loading
                                    </div>
                                  ) : VerifyState === "Verify" ? (
                                    "Verify OTP"
                                  ) : (
                                    "OTP Verified"
                                  )}
                                </button>
                              </>
                            )}
                            {buttonState === "sended" && (
                              
                                <button
                                  type="button"
                                  onClick={handleResendOtp}
                                  disabled={resendAvailable}
                                  className="resendOtpBtn"
                                >
                                  {resendAvailable
                                    ? "Resend OTP Available in one min"
                                    : "Resend OTP"}
                                </button>
                              
                            )}
                          </div>
                        {errors.employer_phone && (
                          <p className="Error-meg-login-register">
                            {errors.employer_phone.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb-3 csfvgdtrfs position-relative">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  onKeyUp={() => trigger("employer_password")}
                  className="form-control"
                  placeholder="Minimum 6 characters"
                  type={showPassword ? "text" : "password"}
                  {...register("employer_password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
                      message:
                        "Password must include at least one letter, one number, and one special character",
                    },
                    maxLength: {
                      value: 16,
                      message: "Password must be at most 16 characters",
                    },
                  })}
                />
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className={
                    showPassword
                      ? "fa-solid fa-eye position-absolute"
                      : "fa-solid fa-eye-slash position-absolute"
                  }
                />
                {errors.employer_password && (
                  <p className="Error-meg-login-register">
                    {errors.employer_password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb-3 csfvgdtrfs position-relative">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  onKeyUp={() => trigger("employer_confirm_password")}
                  className="form-control"
                  placeholder="Type your password again"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("employer_confirm_password", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <i
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={
                    showConfirmPassword
                      ? "fa-solid fa-eye position-absolute"
                      : "fa-solid fa-eye-slash position-absolute"
                  }
                />
                {errors.employer_confirm_password && (
                  <p className="Error-meg-login-register">
                    {errors.employer_confirm_password.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between pt-3">
          {/* <input
            type="button"
            className="btn btn_prev btn-main"
            onClick={(event) =>
              OrganizationPreviousHandler(event, "organization")
            }
            value="Previous"
            name="Previous"
          /> */}

          <button type="submit" className="btn btn_next btn-main">
            Create Account
          </button>
        </div>
      </div>
    </form>
  );
};

export default OrganizationForm;
