import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "./intituteRegForm.css"
import "react-phone-input-2/lib/style.css";
import "../Mentee/Phone-input-style.css";
import "../MentorUpdatedReg/PhoneNumberOTP.css";
import collegeData from "../../../data/collegesname.json";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ApiURL } from "../../../../Utils/ApiURL";
import web96 from "../../../../Images/icons8-account-96.webp";
import MenteeStepForm from "../Mentee/MenteeStepForm";

const InstituteForm = ({ InstitutePreviousHandler }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    control,
    formState: { errors },
  } = useForm();
  const password = watch("institute_password");
  const nameOfInstitute = watch("institute_name");

  const [showIcon, setShowIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);

  //Institute name code start
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setValue("institute_name", value);
    setDropdownVisible(value !== "");
  };

  const filteredColleges = collegeData.filter((item) =>
    item["College Name"].toLowerCase().includes(searchTerm.toLowerCase())
  );
  const dispatch = useDispatch();
  const url = ApiURL();
  const handleOptionClick = (college) => {
    setSelectedCollege(college);
    setSearchTerm(college["College Name"]);
    setDropdownVisible(false);
    setValue("institute_name", college["College Name"]);
  };

  //Institute name code end

  const cleanPhoneNumber = (phone) => {
    return phone.replace(/\D/g, "");
  };
  const phone = getValues("institute_phone");
  useEffect(() => {
    setSendotp(false);
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
  const [showOption, setShowOption] = useState(false);

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

  const userType = watch("mentee_type");

  const handleOptionFalse = () => setShowOption(false);
  const handleOptionTrue = () => setShowOption(true);

  const onSubmit = async (data) => {
    console.log(data);
    const cleanedData = {
      ...data,
      institute_phone: cleanPhoneNumber(data.institute_phone), // Clean the phone number
    };
    if (VerifyState === "Verified") {

      try {
        dispatch(showLoadingHandler());
        const res = await axios.post(`${url}api/v1/institute/register`, {
          data: cleanedData,
          userType: "institute",
        });
        dispatch(hideLoadingHandler());
        if (res.data.success) {
          dispatch(hideLoadingHandler());
          toast.success(
            "You have been successfully register. Please login again."
          );
        }
        if (res.data.error) {
          dispatch(hideLoadingHandler());
          toast.error(res.data.error);
        }
      } catch (error) {
        dispatch(hideLoadingHandler());
        toast.error("There is some error while register.");
      }
    } else {
      toast.error("please verify your phone number first");
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
              value={"Institute"}
              defaultChecked
              onClick={handleOptionFalse}
              {...register("mentee_type", {
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
              value={"Teacher"}
              onClick={handleOptionFalse}
              {...register("mentee_type", {
                required: "Please select one of the options",
              })}
            />
            <label htmlFor="rdo5" className="radio-label pe-3">
              <span className="radio-border"></span> Teacher
            </label>

            <input
              type="radio"
              id="rdo10"
              className="radio-input"
              value={"InstituteStudent"}
              onClick={handleOptionTrue}
              {...register("mentee_type", {
                required: "Please select one of the options",
              })}
            />
            <label htmlFor="rdo10" className="radio-label pe-3">
              <span className="radio-border"></span> Student
            </label>

            {errors.mentee_type && (
              <p className="Error-meg-login-register">
                {errors.mentee_type.message}
              </p>
            )}
          </div>

          {userType === "InstituteStudent" ? <div className="col-lg-12">
            <MenteeStepForm userType={userType} />
          </div>

            :
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">

                <div className="col-lg-12 intituteRegForm-dFlex">

                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="contacPersonFirstName" className="form-label">
                        First Name <span className="RedColorStarMark">*</span>
                      </label>
                      <input
                        type="text"
                        onKeyUp={() => trigger("institute_contact_person_first_name")}
                        className="form-control"
                        id="contacPersonFirstName"
                        placeholder="First Name"
                        {...register("institute_contact_person_first_name", {
                          required: "Enter your first name.",
                          pattern: {
                            value: /^[a-zA-Z]+$/, // Pattern for letters only
                            message: "Last name should contain only letters",
                          },
                          minLength: {
                            value: 2,
                            message: "Must be greater than 2 characters.",
                          },
                        })}
                      />
                      {errors.institute_contact_person_first_name && (
                        <p className="Error-meg-login-register">
                          {errors.institute_contact_person_first_name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="contacPersonLastName" className="form-label">
                        Last Name <span className="RedColorStarMark">*</span>
                      </label>
                      <input
                        type="text"
                        onKeyUp={() => trigger("institute_contact_person_last_name")}
                        className="form-control"
                        id="contacPersonLastName"
                        placeholder="Last Name"
                        {...register("institute_contact_person_last_name", {
                          required: "Enter your last name.",
                          pattern: {
                            value: /^[a-zA-Z]+$/, // Pattern for letters only
                            message: "Last name should contain only letters",
                          },
                          minLength: {
                            value: 2,
                            message: "Must be greater than 2 characters.",
                          },
                        })}
                      />
                      {errors.institute_contact_person_last_name && (
                        <p className="Error-meg-login-register">
                          {errors.institute_contact_person_last_name.message}
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
                      onKeyUp={() => trigger("institute_email")}
                      className="form-control"
                      id="emailId"
                      placeholder="Enter Email Id"
                      {...register("institute_email", {
                        required: "Enter your Email Id.",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Must be a valid email address.",
                        },
                      })}
                    />
                    {errors.institute_email && (
                      <p className="Error-meg-login-register">
                        {errors.institute_email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="mb-3">
                    <div className="h-25">
                      <Controller
                        onKeyUp={() => {
                          trigger("institute_phone");
                        }}
                        name="institute_phone"
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
                            <div className="OtpSendOnWhatsappTaxt-Dflex">
                              <label htmlFor="phone" className="form-label">
                                Phone Number{" "}
                                <span className="RedColorStarMark">*</span>
                              </label>
                              <p className="ghhduenee OtpSendOnWhatsappTaxt">(OTP will be sent on WhatsApp)</p>
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
                                className={`otp-button ${isLoading ? "loading" : ""
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
                                    style={{ fontSize: "11px" }}
                                    className={`otp-buttonVerify ${isLoadingVerify ? "loadingVerify" : ""
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
                            {errors.institute_phone && (
                              <p className="Error-meg-login-register">
                                {errors.institute_phone.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 intituteRegForm-dFlex">




                  <div className="col-lg-12" style={{ width: "65%" }}>
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
                            {...register("institute_name", {
                              required: "Institute Name is required",
                            })}
                            onChange={handleInputChange}
                            onFocus={() => setDropdownVisible(searchTerm !== "")}
                            onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}
                          />
                          {dropdownVisible && filteredColleges.length > 0 && (
                            <div className="dropdown-content-InstituteForm">
                              {filteredColleges.slice(0, 50).map((college, index) => (
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

                      {errors.institute_name && (
                        <p className="Error-meg-login-register">
                          {!nameOfInstitute && errors.institute_name.message}
                        </p>
                      )}
                    </div>
                  </div>


                  <div className="col-lg-6" style={{ width: "35%" }}>
                    <div className="mb-3">
                      <label htmlFor="contacPersonLastName" className="form-label">
                        Institute Code <span className="RedColorStarMark">*</span>
                      </label>
                      <input
                        type="text"
                        onKeyUp={() => trigger("instituteCode")}
                        className="form-control"
                        id="contacPersonLastName"
                        placeholder="Institute Code"
                        {...register("instituteCode", {
                          required: "Enter your Institute Code.",
                        })}
                      />
                      {errors.instituteCode && (
                        <p className="Error-meg-login-register">
                          {errors.instituteCode.message}
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
                      onKeyUp={() => trigger("institute_password")}
                      className="form-control"
                      // id="exampleInputEmail1"
                      placeholder="Password must be at least 8 characters"
                      aria-describedby="emailHelp"
                      type={showIcon ? "text" : "password"}
                      {...register("institute_password", {
                        required: "password is required",
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

                    {errors.institute_password && (
                      <p className="Error-meg-login-register">
                        {errors.institute_password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="mb-3 csfvgdtrfs position-relative">
                    <label htmlFor="cPassword" className="form-label">
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
              <div className="d-flex justify-content-between pt-3">
                <button type="submit" className="btn dgheuih_btn_next btn-main">
                  Create Account
                </button>
              </div>
            </form>
          }
        </div>



      </div>
    </main>
  );
};

export default InstituteForm;
