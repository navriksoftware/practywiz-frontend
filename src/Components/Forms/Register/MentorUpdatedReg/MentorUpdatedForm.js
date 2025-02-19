import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../Mentee/Phone-input-style.css";
import { useNavigate } from "react-router-dom";
import LnIcon from "../Mentor/deeteewe.png";
import { toast } from "react-toastify";
import "./PhoneNumberOTP.css";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import axios from "axios";
import "./MentroTest.css";
import { ApiURL } from "../../../../Utils/ApiURL";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../../Redux/userRedux";
import web96 from "../../../../Images/icons8-account-96.webp";
// import GoogleIcon from "../../../../Images/googlelog.webp";
// import {
//   GoogleOAuthProvider,
//   GoogleLogin,
//   useGoogleLogin,
// } from "@react-oauth/google";

// const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
// const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
// const STATE = process.env.REACT_APP_STATE;
// const SCOPE = process.env.REACT_APP_SCOPE;
// const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const MentorUpdatedForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const url = ApiURL();
  const dispatch = useDispatch();
  const [showIcons, setShowIcons] = useState(false);
  const [conShowIcons, setConShowIcons] = useState(false);
  const [isLinkedInChecked, setIsLinkedInChecked] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // New state for tracking submission
  const password = watch("mentor_password");
  // Load saved form data from localStorage when the component mounts
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("mentorFormData"));
    if (savedFormData) {
      Object.keys(savedFormData).forEach((key) => {
        setValue(key, savedFormData[key]);
      });
    }
  }, [setValue]);
  const phone = getValues("mentor_phone_number");
  useEffect(() => {
    setSendotp(false);
    setButtonState("send");
    setIsLoading(false);
    setVerifyState("Verify");
    setIsLoadingVerify(false);
    setResendAvailable(false);
  }, [phone]);

  // Watch all form data and save it to local storage only if the form hasn't been submitted
  const formData = watch();
  useEffect(() => {
    if (!formSubmitted) {
      // Only save data to localStorage if the form hasn't been submitted
      localStorage.setItem("mentorFormData", JSON.stringify(formData));
    }
  }, [formData, formSubmitted]);

  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    setIsLinkedInChecked(e.target.checked);
    const linkedinData = watch("mentor_linkedin_url");
    if (linkedinData) {
      setValue("mentor_linkedin_url", "");
    }
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
  const UserRegisterSubmitHandler = async (data) => {
    if (VerifyState === "Verified") {
      try {
        const newData = new FormData();
        newData.append("mentor_firstname", data.mentor_firstname);
        newData.append("mentor_lastname", data.mentor_lastname);
        newData.append("mentor_email", data.mentor_email);
        newData.append("image", data.profile_picture[0]);
        newData.append("user_type", "mentor");
        newData.append("mentor_phone_number", data.mentor_phone_number);
        newData.append("mentor_password", data.mentor_password);
        newData.append("mentor_linkedin_url", data.mentor_linkedin_url || "");
        newData.append(
          "mentor_linkedin_url_check",
          data.mentor_linkedin_url_check
        );
        newData.append(
          "linkedinSign",
          data.linkedinSign || "not_sign_linkedin"
        );
        newData.append("linkedinPhotoUrl", data.linkedinPhotoUrl || "");
        dispatch(showLoadingHandler());
        const res = await Promise.race([
          axios.post(`${url}api/v1/mentor/updated/registration`, newData),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000)
          ),
        ]);

        dispatch(hideLoadingHandler());
        if (res.data.success) {
          reset();
          localStorage.removeItem("mentorFormData");
          setFormSubmitted(true); // Set form submission to true on success
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
          toast.error(res.data.error);
        }
      } catch (error) {
        if (error.message === "Request timed out") {
          toast.error("Request timed out. Please try again.");
        } else {
          toast.error(
            "There is some error while applying for the mentor application. We will get back to you via email."
          );
        }
      } finally {
        dispatch(hideLoadingHandler());
      }
    } else {
      toast.error("please verify your phone number first");
    }
  };

  // const onSuccess = async (credentialResponse) => {};
  // const onFailure = (error) => {
  //   return (
  //     dispatch(hideLoadingHandler()),
  //     toast.error(
  //       "Login failed, please try again!, sign in using the username and password"
  //     )
  //   );
  // };

  // const webcamRef = useRef(null);
  // const [isCameraOpen, setIsCameraOpen] = useState(false);
  // const [capturedPhoto, setCapturedPhoto] = useState("");

  // const capturePhoto = () => {
  //   if (webcamRef.current) {
  //     const photo = webcamRef.current.getScreenshot();
  //     console.log(photo);
  //     setCapturedPhoto(photo);
  //   }
  // };

  // const handleOk = () => {
  //   setValue("profile_picture", capturedPhoto);
  //   setIsCameraOpen(false);
  // };

  // const handleRetake = () => {
  //   setCapturedPhoto(null);
  // };

  // const handleClose = () => {
  //   setIsCameraOpen(false);
  //   setCapturedPhoto(null);
  // };

  const [otp, setOtp] = useState("");
  const [Sendotp, setSendotp] = useState(false);
  const [buttonState, setButtonState] = useState("send");
  const [isLoading, setIsLoading] = useState(false);
  const [VerifyState, setVerifyState] = useState("Verify");
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);

  const [resendAvailable, setResendAvailable] = useState(false);

  const handleSendOtp = async () => {
    setButtonState("send");
    setIsLoading(true);

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
  };

  const handleVerifyOtp = async () => {
    setVerifyState("Verify");
    setIsLoadingVerify(true);
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
      } else {
        setVerifyState("Verify");
        alert(response.data.message || "OTP Verification Failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setVerifyState("Verify");
      alert(
        error.response?.data?.message || "An error occurred while verifying OTP"
      );
    } finally {
      setIsLoadingVerify(false);
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

  return (
    <>
      <form onSubmit={handleSubmit(UserRegisterSubmitHandler)}>
        <div className="step" id="instituteInputFields">
          <h4 className="text-center">
            <img src={web96} alt="" className="me-1" />
            Mentor Registration
          </h4>
          <div className="ihduwfr_form_wrapper aasdfasfa2 mt-3">
            <div className="row">
              <div className="row">
                <div className="csfvgdtrfs cihseriniewr mb-4 position-relative">
                  {/* <div className="col-lg-12 mt-2">
                    <p className="mb-0 d-flex align-items-center">
                      <b>Register Using :</b>
                      <button
                        type="button"
                        onClick={() => {
                          toast.error(
                            "We were working on this register using Linkedin. In the meantime, You can sign up as a Mentor using the following form."
                          );
                        }}
                        className="btn vcetgvfeeeee ms-2 d-flex align-items-center btn-primary"
                      >
                        <img src={LnIcon} className="me-2" alt="deeteewe" />
                        LinkedIn
                      </button>

                      <div className="btn vcetgvfeeeee ms-2 d-flex align-items-center btn-primary googleIconBorder">
                        <img
                          className="me-1 googleIcon"
                          src={GoogleIcon}
                          alt=""
                        />
                        Google
                      </div>
                    </p>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="contacPersonFirstName" className="form-label">
                    First Name <span className="RedColorStarMark">*</span>
                  </label>
                  <input
                    onKeyUp={() => {
                      trigger("mentor_firstname");
                    }}
                    type="text"
                    className="form-control"
                    id="contacPersonFirstName"
                    placeholder="Enter your first name"
                    {...register("mentor_firstname", {
                      required: "First Name is required",
                      pattern: {
                        value: /^[a-zA-Z]+$/, // Pattern for letters only
                        message: "First name should contain only letters",
                      },
                    })}
                  />
                  {errors.mentor_firstname && (
                    <p className="Error-meg-login-register">
                      {errors.mentor_firstname.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="contacPersonLastName" className="form-label">
                    Last Name <span className="RedColorStarMark">*</span>
                  </label>
                  <input
                    onKeyUp={() => {
                      trigger("mentor_lastname");
                    }}
                    type="text"
                    className="form-control"
                    id="contacPersonLastName"
                    placeholder="Enter your last name"
                    {...register("mentor_lastname", {
                      required: "Last Name is required",
                      pattern: {
                        value: /^[a-zA-Z]+$/, // Pattern for letters only
                        message: "Last name should contain only letters",
                      },
                    })} //1
                  />
                  {errors.mentor_lastname && (
                    <p className="Error-meg-login-register">
                      {errors.mentor_lastname.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="emailId" className="form-label">
                    Email Id <span className="RedColorStarMark">*</span>
                  </label>
                  <input
                    onKeyUp={() => {
                      trigger("mentor_email");
                    }}
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    aria-describedby="emailHelp"
                    {...register("mentor_email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Must be a valid email address.",
                      },
                    })}
                  />
                  {errors.mentor_email && (
                    <p className="Error-meg-login-register">
                      {errors.mentor_email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mb-3">
                  <div className="h-25">
                    <Controller
                      onKeyUp={() => {
                        trigger("mentor_phone_number");
                      }}
                      name="mentor_phone_number"
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

                          {errors.mentor_phone_number && (
                            <p className="Error-meg-login-register">
                              {errors.mentor_phone_number.message}
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
                    Password <span className="RedColorStarMark">*</span>
                  </label>
                  <input
                    onKeyUp={() => {
                      trigger("mentor_password");
                    }}
                    className="form-control"
                    // id="exampleInputEmail1"
                    // disabled={!inputOn}
                    placeholder="Enter your password"
                    aria-describedby="emailHelp"
                    type={showIcons ? "text" : "password"}
                    {...register("mentor_password", {
                      required: "Password is Required",
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                        message:
                          "Password must be at least 8 characters long and include at least one letter, one number, and one special character (e.g., @, #, $, etc.)",
                      },
                      minLength: {
                        value: 8,
                        message: "Must be greater than 8 characters.",
                      },
                      maxLength: {
                        value: 16,
                        message: "Must be less than 16 characters.",
                      },
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
                  <p style={{ color: "red", marginTop: "8px" }}>
                    {errors.mentor_password?.message}
                  </p>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mb-3 csfvgdtrfs position-relative">
                  <label htmlFor="cPassword" className="form-label">
                    Confirm Password <span className="RedColorStarMark">*</span>
                  </label>
                  <input
                    onKeyUp={() => {
                      trigger("mentor_confirm_password");
                    }}
                    className="form-control"
                    id="cPassword"
                    type={conShowIcons ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...register("mentor_confirm_password", {
                      required: "Password is Required",
                      validate: (value) =>
                        value === password || "Password must be matched",
                    })}
                  />
                  <i
                    i="true"
                    onClick={() => setConShowIcons(!conShowIcons)}
                    className={
                      conShowIcons
                        ? "fa-solid fa-eye position-absolute"
                        : "fa-solid fa-eye-slash position-absolute"
                    }
                  />
                  <p className="Error-meg-login-register">
                    {errors.mentor_confirm_password?.message}
                  </p>
                </div>
              </div>
              <div className="col-lg-12 checkBoxFlex">
                <input
                  type="checkbox"
                  className="form-check-input checkBoxFs"
                  id="exampleCheck1"
                  {...register("mentor_linkedin_url_check")}
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="exampleCheck1"
                  style={{ marginTop: "8px", marginBottom: "8px" }}
                >
                  Can we use your LinkedIn for profile information?
                </label>
              </div>
              {isLinkedInChecked && (
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="linkedinProfile" className="form-label">
                      LinkedIn Profile
                      <span className="RedColorStarMark">*</span>
                    </label>
                    <input
                      onKeyUp={() => {
                        trigger("mentor_linkedin_url");
                      }}
                      type="url"
                      className="form-control"
                      id="linkedinProfile"
                      placeholder="Enter LinkedIn Profile URL"
                      {...register("mentor_linkedin_url", {
                        required: "LinkedIn Url is required",
                        pattern: {
                          value:
                            /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/,
                          message:
                            "Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/yourprofile/)",
                        },
                      })}
                    />
                    {errors.mentor_linkedin_url && (
                      <p className="Error-meg-login-register">
                        {errors.mentor_linkedin_url.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {!isLinkedInChecked && (
                <>
                  <div className="row" style={{ alignItems: "flex-end" }}>
                    <div className="csfvgdtrfs position-relative">
                      <label className="form-label">
                        <b>
                          Profile Picture{" "}
                          <span className="RedColorStarMark">*</span>
                        </b>
                      </label>
                      <>
                        <input
                          onKeyUp={() => {
                            trigger("profile_picture");
                          }}
                          placeholder="Choose profile picture"
                          type="file"
                          accept=".jpg ,.jpeg,.png"
                          className="form-control"
                          {...register("profile_picture", {
                            required: "Choose profile picture",
                          })}
                        />
                      </>
                    </div>
                    {/* <div style={{ textAlign: "center", width: "35%" }}>
                      {!isCameraOpen && (
                        <button
                          className="form-control"
                          onClick={() => setIsCameraOpen(true)}
                          style={styles.openCameraButton}
                        >
                          Live Capture
                        </button>
                      )}

                      {isCameraOpen && (
                        <div style={styles.cameraBox}>
                          <div className="CameraModel">
                            {" "}
                            <div style={styles.cameraFeed}>
                              <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/png"
                                width={500}
                                height={400}
                              />
                            </div>
                            {capturedPhoto && (
                              <div style={styles.preview}>
                                <h4>Preview</h4>
                                <img
                                  src={capturedPhoto}
                                  alt="Captured"
                                  style={{ width: "500px", height: "400px" }}
                                />
                              </div>
                            )}
                          </div>

                          <div style={styles.buttonContainer}>
                            {!capturedPhoto ? (
                              <button
                                type="button"
                                onClick={capturePhoto}
                                style={styles.button}
                              >
                                Capture
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={handleRetake}
                                  style={styles.button}
                                >
                                  Retake
                                </button>
                                <button
                                  onClick={handleOk}
                                  style={styles.okButton}
                                >
                                  OK
                                </button>
                              </>
                            )}
                            <button
                              onClick={handleClose}
                              style={styles.closeButton}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}

                      <Controller
                        name="profile_picture"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            type="hidden"
                            {...field}
                            value={capturedPhoto || ""}
                          />
                        )}
                      />
                    </div> */}
                  </div>
                  <div>
                    {errors.profile_picture && (
                      <p className="Error-meg-login-register">
                        {errors.profile_picture.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-between pt-3">
            <button type="submit" className="btn dgheuih_btn_next btn-main">
              Create Account
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

const styles = {
  openCameraButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "rgb(2 85 202)",
    color: "white",
    fontFamily: "lato",
    border: "none",
    borderRadius: "4px",
    marginBottom: "8px",
  },
  cameraBox: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    zIndex: 10000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  cameraFeed: {
    marginBottom: "10px",
  },
  preview: {
    marginTop: "10px",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  okButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
  closeButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#FF6347",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
  submitButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default MentorUpdatedForm;
