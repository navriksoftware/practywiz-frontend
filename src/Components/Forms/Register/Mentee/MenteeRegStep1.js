import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import GoToTop from "../../../../Utils/GoToTop";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Phone-input-style.css";
import "./MenteeReg.css";
import { ApiURL } from "../../../../Utils/ApiURL";
import axios from "axios";
import { toast } from "react-toastify";
import web96 from "../../../../Images/icons8-account-96.webp";
const MenteeRegStep1 = ({ selectedOption, handleChange }) => {
  const [showIcon, setShowIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const {
    register,
    watch,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();
  const password = watch("mentee_password");
  const phone = watch("mentee_phone");
  const url = ApiURL();
  
  useEffect(() => {
    setSendotp(false);
    // setValue("mentee_OTPValid", false);
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


  //       // Enable resend after 1 minute
  //       setTimeout(() => {
  //         setResendAvailable(false);
  //       }, 60000); // 1 minute timeout
  //     } else {
  //       setButtonState("send");
  //       alert(response.data.message || "Failed to send OTP");
  //     }
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     setButtonState("send");
  //     alert(
  //       error.response?.data?.message || "An error occurred while sending OTP"
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleVerifyOtp = async () => {
  //   setVerifyState("Verify");
  //   setIsLoadingVerify(true);
  //   if (otp.length === 6) {
  //     try {
  //       // Make Axios POST request to verify OTP
  //       const response = await axios.post(
  //         `${url}api/v1/otpvarification/validate-otp`,
  //         {
  //           phone,
  //           otp,
  //         }
  //       );

  //       if (response.data.success) {
  //         setVerifyState("Verified");
  //         setValue("mentee_OTPValid", true); // Store as boolean ✅
  //         alert("OTP Verified Successfully!");
  //       } else {
  //         setVerifyState("Verify");
  //         alert(response.data.message || "OTP Verification Failed");
  //       }
        
  //     } catch (error) {
  //       console.error("Error verifying OTP:", error);
  //       setVerifyState("Verify");
  //       alert(
  //         error.response?.data?.message ||
  //           "An error occurred while verifying OTP"
  //       );
  //     } finally {
  //       setIsLoadingVerify(false);
  //     }
  //   }
  //   else{
  //     setIsLoadingVerify(false);
  //     toast.error("Please Enter Valid OTP");
  //   }
  // };

  // const handleResendOtp = async () => {
  //   if (resendAvailable) {
  //     alert("You can resend OTP after 1 minute.");
  //     return;
  //   }

  //   setButtonState("send");
  //   setIsLoading(true);

  //   try {
  //     // Make Axios POST request to resend OTP
  //     const response = await axios.post(
  //       `${url}api/v1/otpvarification/resend-otp`,
  //       { phone }
  //     );

  //     if (response.data.success) {
  //       setButtonState("sended");
  //       setSendotp(true);
  //       setResendAvailable(true);

  //       // Enable resend after 1 minute
  //       setTimeout(() => {
  //         setResendAvailable(false);
  //       }, 60000); // 1 minute timeout
        
  //     } else {
  //       setButtonState("send");
  //       alert(response.data.message || "Failed to resend OTP");
  //     }
  //   } catch (error) {
  //     console.error("Error resending OTP:", error);
  //     setButtonState("send");
  //     alert(
  //       error.response?.data?.message || "An error occurred while resending OTP"
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <><div className="ihduwfr_form_wrapper mt-4">
    {/* <div className="csfvgdtrfs cihseriniewr mb-3 position-relative">
      <label htmlFor="exampleInputEmail1" className="form-label">
        I Want To Register As
      </label>
      <br />
      <input
        type="radio"
        id="rdo2"
        className="radio-input"
        name="radio-group"
        value="mentee"
        checked={selectedOption === "mentee"}
        onChange={handleChange}
      />
      <label htmlFor="rdo2" className="radio-label  pe-3">
        <span className="radio-border"></span>
        <i
          className="fa-solid fa-graduation-cap me-1"
          style={{ color: "#1B759A" }}
        ></i>
        Mentee
      </label>
      <input
        type="radio"
        id="rdo3"
        className="radio-input"
        name="radio-group"
        value="jobseeker"
        checked={selectedOption === "jobseeker"}
        onChange={handleChange}
      />
      <label htmlFor="rdo3" className="radio-label  pe-3">
        <span className="radio-border"></span>
        <i
          className="fa-solid fa-briefcase me-1"
          style={{ color: "#1B759A" }}
        ></i>
        Job Seeker
      </label>
      <input
        type="radio"
        id="rdo4"
        className="radio-input"
        name="radio-group"
        value="institute"
        checked={selectedOption === "institute"}
        onChange={handleChange}
      />
      <label htmlFor="rdo4" className="radio-label pe-3">
        <span className="radio-border"></span>
        <i
          className="fa-solid fa-building-columns me-1"
          style={{ color: "#1B759A" }}
        ></i>
        Institute
      </label>
    </div> */}

    <div className="row">
      <div className="col-lg-6">
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label  pe-3"
          >
            First Name <span className="RedColorStarMark">*</span>
          </label>
          <input
            onKeyUp={() => trigger("mentee_firstname")}
            type="text"
            className="form-control"
            // id="exampleInputEmail1"
            placeholder="First Name"
            // aria-describedby="emailHelp"
            {...register("mentee_firstname", {
              required: "First Name is required",
              pattern: {
                value: /^[a-zA-Z.\s]+$/, // Pattern for letters only
                message: "First name should contain only letters",
              }
            })}
          />
          {errors.mentee_firstname && (
            <p className="Error-meg-login-register">
              {errors.mentee_firstname.message}
            </p>
          )}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Last Name <span className="RedColorStarMark">*</span>
          </label>
          <input
            onKeyUp={() => trigger("mentee_lastname")}
            type="text"
            className="form-control"
            // id="exampleInputPassword1"
            placeholder="Last Name"
            {...register("mentee_lastname", {
              required: "Last Name is required",
              pattern: {
                value: /^[a-zA-Z.\s]+$/, // Pattern for letters only
                message: "Last name should contain only letters",
              }
            })}
          />
          {errors.mentee_lastname && (
            <p className="Error-meg-login-register">
              {errors.mentee_lastname.message}
            </p>
          )}
        </div>
      </div>
    </div>
    <div className="col-lg-12">
      <div className="mb-3">
        <div className="h-25">
          <Controller
            onKeyUp={() => {
              trigger("mentee_phone");
            }}
            name="mentee_phone"
            control={control}
            defaultValue=""
            rules={{
              required: "Phone number is required",
              // validate: {
              //   minLength: (value) =>
              //     value.replace(/\D/g, "").length >= 10 ||
              //     "Please Enter a valid phone number",
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
                    </div>

                <div className="d-flex">
                  <PhoneInput
                    value={value}
                    country="in"
                    countryCodeEditable={false}
                    onChange={(value, country, event, formattedValue) => {
                      onChange(formattedValue);
                    }}
                    onBlur={onBlur}
                    inputProps={{
                      autoFocus: false,
                      name,
                      ref,
                    }}
                  />{" "}
                  {/* <button
                    type="button"
                    // onClick={handleSendOtp}
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
                      "OTP Sent"
                    )}
                  </button> */}
                </div>
                {/* <div className="aftersendOTP">
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
                            // onClick={handleVerifyOtp}
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

                {errors.mentee_phone && (
                  <p className="Error-meg-login-register">
                    {errors.mentee_phone.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>

    <div className="csfvgdtrfs mb-3 position-relative">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Email <span className="RedColorStarMark">*</span>
      </label>
      <input
        onKeyUp={() => trigger("mentee_Email")}
        type="email"
        className="form-control"
        // id="exampleInputEmail1"
        placeholder="Email"
        aria-describedby="emailHelp"
        {...register("mentee_Email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Must be a valid email address.",
          },
        })}
      />
      {errors.mentee_Email && (
        <p className="Error-meg-login-register">
          {errors.mentee_Email.message}
        </p>
      )}

      <i className="fa-solid fa-envelopes-bulk position-absolute"></i>
    </div>

    <div className="csfvgdtrfs mb-3 position-relative">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Password <span className="RedColorStarMark">*</span>
      </label>
      <input
        onKeyUp={() => trigger("mentee_password")}
        className="form-control"
        // id="exampleInputEmail1"
        placeholder="Password must be at least 8 characters"
        aria-describedby="emailHelp"
        type={showIcon ? "text" : "password"}
        {...register("mentee_password", {
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
        onClick={() => setShowIcon(!showIcon)}
        className={
          showIcon
            ? "fa-solid fa-eye position-absolute"
            : "fa-solid fa-eye-slash position-absolute"
        }
      ></i>

      {errors.mentee_password && (
        <p className="Error-meg-login-register">
          {errors.mentee_password.message}
        </p>
      )}

      {/* <i className="fa-solid fa-eye position-absolute"></i> */}
    </div>

    <div className="csfvgdtrfs mb-3 position-relative">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Confirm Password <span className="RedColorStarMark">*</span>
      </label>
      <input
        onKeyUp={() => trigger("mentee_confirm_password")}
        // type="text"
        className="form-control"
        // id="exampleInputEmail1"
        placeholder="Type your password again"
        aria-describedby="emailHelp"
        type={showIcons ? "text" : "password"}
        //onChange={(e) => setConfirmPassword(e.target.value)}
        {...register("mentee_confirm_password", {
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

      {errors.mentee_confirm_password && (
        <p className="Error-meg-login-register">
          {errors.mentee_confirm_password.message}
        </p>
      )}

      {/* <i className="fa-solid fa-eye position-absolute"></i> */}
    </div>
  </div>
      
      <GoToTop />
    </>
  );
};

export default MenteeRegStep1;
