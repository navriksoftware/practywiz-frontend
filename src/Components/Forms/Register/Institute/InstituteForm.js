import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "./intituteRegForm.css";
import "react-phone-input-2/lib/style.css";
import "../Mentee/Phone-input-style.css";
import "../MentorUpdatedReg/PhoneNumberOTP.css";
import collegeData from "../../../data/collegesname.json";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ApiURL } from "../../../../Utils/ApiURL";
import web96 from "../../../../Images/icons8-account-96.webp";
import { loginSuccess } from "../../../../Redux/userRedux";

const InstituteForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const nameOfInstitute = watch("organization_name");
  const phone = watch("phone");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = ApiURL();

  const [showIcon, setShowIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);

  // Institute name search code
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);

  // OTP verification states
  const [otp, setOtp] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const [buttonState, setButtonState] = useState("send");
  const [isLoading, setIsLoading] = useState(false);
  const [verifyState, setVerifyState] = useState("Verify");
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);
  const [resendAvailable, setResendAvailable] = useState(false);

  // Reset OTP states when phone number changes
  useEffect(() => {
    if (phone) {
      setSendOtp(false);
      setButtonState("send");
      setIsLoading(false);
      setVerifyState("Verify");
      setIsLoadingVerify(false);
      setResendAvailable(false);
    }
  }, [phone]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setValue("organization_name", value);
    setDropdownVisible(value.trim() !== "");
  };

  const filteredColleges = collegeData.filter((item) =>
    item["College Name"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (college) => {
    setSelectedCollege(college);
    setSearchTerm(college["College Name"]);
    setDropdownVisible(false);
    setValue("organization_name", college["College Name"]);
  };

  const cleanPhoneNumber = (phone) => {
    return phone ? phone.replace(/\D/g, "") : "";
  };

  // const handleSendOtp = async () => {
  //   // Validate phone number first
  //   const isPhoneValid = await trigger("phone");
  //   if (!isPhoneValid) return;

  //   setButtonState("send");
  //   setIsLoading(true);

  //   try {
  //     const cleanedPhone = cleanPhoneNumber(getValues("phone"));
  //     // Make Axios POST request to send OTP
  //     const response = await axios.post(
  //       `${url}api/v1/otpvarification/request-otp`,
  //       { phone: cleanedPhone }
  //     );

  //     if (response.data.success) {
  //       setButtonState("sended");
  //       setSendOtp(true);
  //       setResendAvailable(true);

  //       // Enable resend after 1 minute
  //       setTimeout(() => {
  //         setResendAvailable(false);
  //       }, 60000); // 1 minute timeout
  //     } else {
  //       setButtonState("send");
  //       toast.error(response.data.message || "Failed to send OTP");
  //     }
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     setButtonState("send");
  //     toast.error(
  //       error.response?.data?.message || "An error occurred while sending OTP"
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleVerifyOtp = async () => {
  //   if (!otp || otp.length < 4) {
  //     toast.error("Please enter a valid OTP");
  //     return;
  //   }

  //   setVerifyState("Verify");
  //   setIsLoadingVerify(true);

  //   try {
  //     const cleanedPhone = cleanPhoneNumber(getValues("phone"));
  //     // Make Axios POST request to verify OTP
  //     const response = await axios.post(
  //       `${url}api/v1/otpvarification/validate-otp`,
  //       {
  //         phone: cleanedPhone,
  //         otp,
  //       }
  //     );

  //     if (response.data.success) {
  //       setVerifyState("Verified");
  //       toast.success("OTP Verified Successfully!");
  //     } else {
  //       setVerifyState("Verify");
  //       toast.error(response.data.message || "OTP Verification Failed");
  //     }
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error);
  //     setVerifyState("Verify");
  //     toast.error(
  //       error.response?.data?.message || "An error occurred while verifying OTP"
  //     );
  //   } finally {
  //     setIsLoadingVerify(false);
  //   }
  // };

  // const handleResendOtp = async () => {
  //   if (resendAvailable) {
  //     toast.warning("You can resend OTP after 1 minute.");
  //     return;
  //   }

  //   setButtonState("send");
  //   setIsLoading(true);

  //   try {
  //     const cleanedPhone = cleanPhoneNumber(getValues("phone"));
  //     // Make Axios POST request to resend OTP
  //     const response = await axios.post(
  //       `${url}api/v1/otpvarification/resend-otp`,
  //       { phone: cleanedPhone }
  //     );

  //     if (response.data.success) {
  //       setButtonState("sended");
  //       setSendOtp(true);
  //       setResendAvailable(true);

  //       // Enable resend after 1 minute
  //       setTimeout(() => {
  //         setResendAvailable(false);
  //       }, 60000); // 1 minute timeout
  //     } else {
  //       setButtonState("send");
  //       toast.error(response.data.message || "Failed to resend OTP");
  //     }
  //   } catch (error) {
  //     console.error("Error resending OTP:", error);
  //     setButtonState("send");
  //     toast.error(
  //       error.response?.data?.message || "An error occurred while resending OTP"
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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

  const onSubmit = async (data) => {
    // Clean the phone number before submitting
    const cleanedData = {
      ...data,
      phone: cleanPhoneNumber(data.phone),
    };

    //uncomment this if you want to enforce phone verification before registration
    // if (verifyState !== "Verified") {
    //   toast.error("Please verify your phone number first");
    //   return;
    // }

    try {
      dispatch(showLoadingHandler());
      const res = await axios.post(`${url}api/v1/institute/register`, {
        data: cleanedData,
      });

      if (res.data.success) {
        dispatch(hideLoadingHandler());
        reset();

        const token = res.data.token;
        const accessToken = res.data.accessToken;
        const userData = parseJwt(token);

        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("accessToken", JSON.stringify(accessToken));

        toast.success(
          "You have been successfully registered. Redirecting to dashboard."
        );

        dispatch(loginSuccess(userData));

        if (data.user_type === "institute") {
          navigate("/institute/dashboard");
        } else {
          navigate("/faculty/dashboard");
        }
      } else if (res.data.error) {
        dispatch(hideLoadingHandler());
        toast.error(res.data.error);
      }
    } catch (error) {
      dispatch(hideLoadingHandler());
      toast.error("There was an error while registering. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <main>
      <div className="step" id="instituteInputFields">
        <h4 className="text-center">
          <img src={web96} alt="" className="me-1" />
          Institution Registration
        </h4>

        <div className="ihduwfr_form_wrapper mt-3">
          <div className="csfvgdtrfs cihseriniewr mb-3 position-relative">
            <label htmlFor="exampleInputEmail1" className="form-label">
              I Am A
            </label>
            <br />
            <input
              type="radio"
              id="rdo4"
              className="radio-input"
              value="institute"
              defaultChecked
              {...register("user_type", {
                required: "Please select one of the options",
              })}
            />
            <label htmlFor="rdo4" className="radio-label pe-3">
              <span className="radio-border"></span> Institute
            </label>

            <input
              type="radio"
              id="rdo5"
              className="radio-input"
              value="faculty"
              {...register("user_type", {
                required: "Please select one of the options",
              })}
            />
            <label htmlFor="rdo5" className="radio-label pe-3">
              <span className="radio-border"></span> Faculty
            </label>
            {errors.user_type && (
              <p className="Error-meg-login-register">
                {errors.user_type.message}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-12 intituteRegForm-dFlex">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label
                      htmlFor="contacPersonFirstName"
                      className="form-label"
                    >
                      First Name <span className="RedColorStarMark">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contacPersonFirstName"
                      placeholder="First Name"
                      {...register("contact_person_first_name", {
                        required: "Enter your first name.",
                        pattern: {
                          value: /^[a-zA-Z.][a-zA-Z.\s]*$/,
                          message: "First name should contain only letters",
                        },
                        maxLength: {
                          value: 50,
                          message: "First name must not exceed 50 characters",
                        },
                      })}
                      onBlur={() => trigger("contact_person_first_name")}
                    />
                    {errors.contact_person_first_name && (
                      <p className="Error-meg-login-register">
                        {errors.contact_person_first_name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <label
                      htmlFor="contacPersonLastName"
                      className="form-label"
                    >
                      Last Name <span className="RedColorStarMark">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contacPersonLastName"
                      placeholder="Last Name"
                      {...register("contact_person_last_name", {
                        required: "Enter your last name.",
                        pattern: {
                          value: /^[a-zA-Z.][a-zA-Z.\s]*$/,
                          message: "Last name should contain only letters",
                        },
                        maxLength: {
                          value: 50,
                          message: "Last name must not exceed 50 characters",
                        },
                      })}
                      onBlur={() => trigger("contact_person_last_name")}
                    />
                    {errors.contact_person_last_name && (
                      <p className="Error-meg-login-register">
                        {errors.contact_person_last_name.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="emailId" className="form-label">
                    Email Id <span className="RedColorStarMark">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    placeholder="Enter Email Id"
                    {...register("email", {
                      required: "Enter your Email Id.",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Must be a valid email address.",
                      },
                    })}
                    onBlur={() => trigger("email")}
                  />
                  {errors.email && (
                    <p className="Error-meg-login-register">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-lg-12">
                <div className="mb-3">
                  <div className="h-25">
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Phone number is required",
                        // validate: {
                        //   minLength: (value) =>
                        //     cleanPhoneNumber(value).length >= 10 ||
                        //     "Enter a valid phone number with at least 10 digits",
                        // },
                      }}
                      render={({
                        field: { name, value, onChange, onBlur, ref },
                      }) => (
                        <div>
                          <div className="OtpSendOnWhatsappTaxt-Dflex">
                            <label htmlFor="phone" className="form-label">
                              Phone Number{" "}
                              <span className="RedColorStarMark">*</span>
                            </label>
                            <p className="ghhduenee OtpSendOnWhatsappTaxt">
                              (OTP will be sent on WhatsApp)
                            </p>
                          </div>

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
                              onBlur={() => {
                                onBlur();
                                trigger("phone");
                              }}
                              inputProps={{
                                autoFocus: false,
                                name,
                                ref,
                              }}
                            />{" "}
                            {/* <button
                              type="button"
                              // onClick={handleSendOtp}
                              disabled={isLoading || !getValues("phone")}
                              className={`otp-button ${isLoading ? "loading" : ""} ${buttonState}`}
                            >
                              {isLoading ? (
                                <div className="button-content">
                                  <div className="spinner"></div>Loading
                                </div>
                              ) : buttonState === "send" ? (
                                "Send OTP"
                              ) : (
                                "OTP Sent"
                              )}
                            </button> */}
                          </div>
                          {/* <div className="aftersendOTP">
                            {sendOtp && (
                              <>
                                <input
                                  type="number"
                                  placeholder="Enter OTP"
                                  className="PhoneNoOtpInput"
                                  onChange={(e) => setOtp(e.target.value)}
                                />
                                <button
                                  type="button"
                                  // onClick={handleVerifyOtp}
                                  disabled={isLoadingVerify || !otp}
                                  style={{ fontSize: "11px" }}
                                  className={`otp-buttonVerify ${isLoadingVerify ? "loadingVerify" : ""} ${verifyState}`}
                                >
                                  {isLoadingVerify ? (
                                    <div className="button-contentVerify">
                                      <div className="spinnerVerifyOTP"></div>
                                      Loading
                                    </div>
                                  ) : verifyState === "Verify" ? (
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
                                // onClick={handleResendOtp}
                                disabled={resendAvailable}
                                className="resendOtpBtn"
                              >
                                {resendAvailable
                                  ? "Resend OTP Available in one min"
                                  : "Resend OTP"}
                              </button>
                            )}
                          </div> */}
                          {errors.phone && (
                            <p className="Error-meg-login-register">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-12 intituteRegForm-dFlex">
                <div className="col-lg-12" style={{ width: "60%" }}>
                  <div className="mb-3">
                    <label htmlFor="forName" className="form-label">
                      Institute Name <span className="RedColorStarMark">*</span>
                    </label>
                    <div className="dkjiherer moideuirer_list hello">
                      <div className="dropdown">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Institute Name"
                          value={searchTerm}
                          {...register("organization_name", {
                            required: "Institute Name is required",
                            pattern: {
                              value: /^[^\s].*$/,
                              message:
                                "Institute name must not start with a space",
                            },
                            maxLength: {
                              value: 100,
                              message:
                                "Institute name must not exceed 100 characters",
                            },
                          })}
                          onChange={handleInputChange}
                          onFocus={() =>
                            setDropdownVisible(searchTerm.trim() !== "")
                          }
                          onBlur={() =>
                            setTimeout(() => setDropdownVisible(false), 200)
                          }
                        />
                        {dropdownVisible && filteredColleges.length > 0 && (
                          <div className="dropdown-content-InstituteForm">
                            {filteredColleges
                              .slice(0, 50)
                              .map((college, index) => (
                                <div
                                  key={index}
                                  className="dropdown-item"
                                  onClick={() => handleOptionClick(college)}
                                >
                                  {college["College Name"]}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {errors.organization_name && (
                      <p className="Error-meg-login-register">
                        {errors.organization_name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-lg-6" style={{ width: "40%" }}>
                  <div className="mb-3">
                    <label htmlFor="organizationCode" className="form-label">
                      Institute Code <span className="RedColorStarMark">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="organizationCode"
                      placeholder="Institute Code is required"
                      {...register("organization_code", {
                        required: "Institute Code is required",
                        pattern: {
                          value: /^\d+$/,
                          message: "Institute code must be a number",
                        },
                        maxLength: {
                          value: 10,
                          message: "Institute code must not exceed 10 digits",
                        },
                      })}
                      onBlur={() => trigger("organization_code")}
                    />
                    {errors.organization_code && (
                      <p className="Error-meg-login-register">
                        {errors.organization_code.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="mb-3 csfvgdtrfs position-relative">
                  <label htmlFor="password" className="form-label">
                    Password <span className="RedColorStarMark">*</span>
                  </label>
                  <input
                    className="form-control"
                    id="password"
                    placeholder="Password must be at least 8 characters"
                    aria-describedby="passwordHelp"
                    type={showIcon ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                        message:
                          "Password must be at least 8 characters long and include at least one letter, one number, and one special character (e.g., @, #, $, etc.)",
                      },
                      maxLength: {
                        value: 16,
                        message: "Must be less than 16 characters.",
                      },
                    })}
                    onBlur={() => trigger("password")}
                  />

                  <i
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
              </div>

              <div className="col-lg-12">
                <div className="mb-3 csfvgdtrfs position-relative">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password <span className="RedColorStarMark">*</span>
                  </label>
                  <input
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Type your password again"
                    aria-describedby="confirmPasswordHelp"
                    type={showIcons ? "text" : "password"}
                    {...register("Institute_confirm_password", {
                      required: "Password is Required",
                      validate: (value) =>
                        value === password || "Password must match",
                    })}
                    onBlur={() => trigger("Institute_confirm_password")}
                  />

                  <i
                    onClick={() => setShowIcons(!showIcons)}
                    className={
                      showIcons
                        ? "fa-solid fa-eye position-absolute"
                        : "fa-solid fa-eye-slash position-absolute"
                    }
                  />

                  {errors.Institute_confirm_password && (
                    <p className="Error-meg-login-register">
                      {errors.Institute_confirm_password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between pt-3">
              <div className="uherrr_text text-center">
                <p className="mb-0">
                  Already Have An Account? <a href="/login">Log In</a>
                </p>
              </div>
            </div>
            <div
              className="d-flex justify-content-between pt-3"
              style={{ width: "fit-content" }}
            >
              <button type="submit" className="btn dgheuih_btn_next btn-main">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default InstituteForm;
