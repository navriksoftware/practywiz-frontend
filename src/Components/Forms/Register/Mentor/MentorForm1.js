import React, { useEffect } from "react";
import LnIcon from "./deeteewe.png";
import { useFormContext, Controller } from "react-hook-form";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import CountryData from "../../../data/CountryData.json";
import GoToTop from "../../../../Utils/GoToTop";
import "react-phone-input-2/lib/style.css";
import collegeData from "../../../data/collegesname.json";
import "./register.css";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import UserRegisterModel from "./UserRegisterModel";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const STATE = process.env.REACT_APP_STATE;
const SCOPE = process.env.REACT_APP_SCOPE;

const MentorForm1 = (props) => {
  const location = useLocation();
  const profileData = location.state?.profileData || null;
  const [showIcon, setShowIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const {
    register,
    watch,
    control,
    getValues,
    setValue,
    trigger,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [signedUsingLinkedin, setSignedUsingLinkedin] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null); // Store selected college
  // Function to handle input changeconst apiUrl = process.env.REACT_APP_API_URL;
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setOptions(CountryData); // Directly setting options if importing the JSON file
  }, []);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setValue("mentor_InstituteName", value);
    setDropdownVisible(value !== ""); // Only show dropdown when input is not empty
  };
  // console.log(profileData.picture);
  useEffect(() => {
    if (profileData !== null) {
      setSignedUsingLinkedin(true);
      setValue("mentor_firstname", profileData?.given_name);
      setValue("mentor_lastname", profileData?.family_name);
      setValue("mentor_email", profileData?.email);
      setValue("linkedinPhotoUrl", profileData?.picture);
      setValue("linkedinSign", "linkedin");
    }
  }, [profileData]);

  // Filter colleges based on the search term
  const filteredColleges = collegeData.filter((item) =>
    item["College Name"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle dropdown option click
  const handleOptionClick = (college) => {
    setSelectedCollege(college); // Set selected college
    setSearchTerm(college["College Name"]); // Update input with selected college name
    setDropdownVisible(false); // Hide dropdown after selection
    setValue("mentor_InstituteName", college["College Name"]);
  };
  const password = watch("mentor_password");
  // const handleBlur = async (fieldName) => {
  //   const data = { [fieldName]: getValues(fieldName) };
  //   props.saveStepData(data);
  // };
  const handleLinkedInLogin = () => {
    const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=${SCOPE}`;
    window.location.href = authorizationUrl;
  };
  const [firstname, setfirstname] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [emailid, setemailid] = useState("");
  const [mentorPassword, setMentorPassword] = useState("");

  const [ShowUserModel, setShowUserModel] = useState(false);
  const showUserRegisterModel = () => {
    setShowUserModel(!ShowUserModel);
  };

  const handleBlur = async (fieldName) => {
    // const data = { [fieldName]: getValues(fieldName) };
    // props.saveStepData(data);
    setfirstname(getValues("mentor_firstname"));
    setlastName(getValues("mentor_lastname"));
    setMentorPassword(getValues("mentor_password"));
    setphoneNumber(getValues("mentor_phone_number"));
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = getValues("mentor_email");

    if (email) {
      if (emailRegex.test(email)) {
        setemailid(getValues("mentor_email"));
      } else {
        alert("please enter correct Email id ");
      }
    }
  };
  const [inputOn, setInputOn] = useState(false);

  useEffect(() => {
    if (firstname && lastName && phoneNumber && emailid && !mentorPassword) {
      showUserRegisterModel();
    }
  }, [firstname, lastName, phoneNumber, emailid, mentorPassword]);

  return (
    <>
      {ShowUserModel && (
        <UserRegisterModel
          showUserRegisterModel={showUserRegisterModel}
          firstname={firstname}
          lastName={lastName}
          phoneNumber={phoneNumber}
          emailid={emailid}
          inputOn={inputOn}
          setInputOn={setInputOn}
        />
      )}
      <div className="doiherner_wrapper ">
        <div className="row">
          <div className="csfvgdtrfs cihseriniewr mb-4 position-relative">
            <div className="col-lg-12 mt-2">
              <p className="mb-0 d-flex align-items-center">
                <b>Register Using :</b>
                <button
                  type="button"
                  // onClick={handleLinkedInLogin}
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
              </p>
            </div>
          </div>
        </div>
        <div
          className="ihduwfr_form_wrapper p-0 ghaddhdwhk"
          style={{ height: "auto" }}
        >
          <div className="SignupStyleBox">
            <div className="sign-up-btn">Sign-Up Details</div>

            <div className="row">
              <div className="col-lg-6">
                <div className="mb-4">
                  <label
                    // htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    <b>
                      First Name <span className="RedColorStarMark">*</span>
                    </b>
                  </label>
                  <input
                    onKeyUp={() => {
                      trigger("mentor_firstname");
                    }}
                    type="text"
                    className="form-control"
                    // id="exampleInputEmail1"
                    placeholder="Enter your first name....."
                    // aria-describedby="emailHelp"
                    {...register("mentor_firstname", {
                      required: "First Name is required",
                      pattern: {
                        value: /^[a-zA-Z]+$/, // Pattern for letters only
                        message: "First name should contain only letters",
                      },
                    })}
                    onBlur={() => handleBlur("mentor_firstname")}
                  />
                  {errors.mentor_firstname && (
                    <p className="Error-meg-login-register">
                      {errors.mentor_firstname.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mb-4">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    <b>
                      Last Name <span className="RedColorStarMark">*</span>
                    </b>
                  </label>
                  <input
                    onKeyUp={() => {
                      trigger("mentor_lastname");
                    }}
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your last name....."
                    {...register("mentor_lastname", {
                      required: "Last Name is required",
                      pattern: {
                        value: /^[a-zA-Z]+$/, // Pattern for letters only
                        message: "Last name should contain only letters",
                      },
                    })} //1
                    onBlur={() => handleBlur("mentor_lastname")}
                  />
                  {errors.mentor_lastname && (
                    <p className="Error-meg-login-register">
                      {errors.mentor_lastname.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mb-4">
                  <label
                    // htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    <b>
                      Mobile Number <span className="RedColorStarMark">*</span>
                    </b>
                  </label>

                  <Controller
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
                        <PhoneInput
                          placeholder="Enter a valid phone number"
                          value={value}
                          country="in"
                          countryCodeEditable={false}
                          onChange={(value, country, event, formattedValue) => {
                            onChange(formattedValue);
                          }}
                          onBlur={() => handleBlur("mentor_firstname")}
                          inputProps={{
                            autoFocus: false,
                            name,
                            ref,
                          }}
                        />
                      </div>
                    )}
                  />
                  {errors.mentor_phone_number && (
                    <p className="Error-meg-login-register">
                      {errors.mentor_phone_number.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="csfvgdtrfs mb-4 position-relative">
                  <label
                    // htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    <b>
                      Email <span className="RedColorStarMark">*</span>
                    </b>
                  </label>
                  <input
                    onKeyUp={() => {
                      trigger("mentor_email");
                    }}
                    type="email"
                    className="form-control"
                    // id="exampleInputEmail1"
                    placeholder="Enter your email address....."
                    aria-describedby="emailHelp"
                    {...register("mentor_email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Must be a valid email address.",
                      },
                    })} //1
                    onBlur={() => handleBlur("mentor_firstname")}
                  />
                  {errors.mentor_email && (
                    <p className="Error-meg-login-register">
                      {errors.mentor_email.message}
                    </p>
                  )}

                  <i className="fa-solid fa-envelopes-bulk position-absolute"></i>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="csfvgdtrfs mb-4 position-relative">
                  <label
                    // htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    <b>
                      Password <span className="RedColorStarMark">*</span>
                    </b>
                  </label>
                  <input
                    onKeyUp={() => {
                      trigger("mentor_password");
                    }}
                    className="form-control"
                    // id="exampleInputEmail1"
                    // disabled={!inputOn}
                    placeholder="Enter your password....."
                    aria-describedby="emailHelp"
                    type={showIcon ? "text" : "password"}
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
                    onClick={() => setShowIcon(!showIcon)}
                    className={
                      showIcon
                        ? "fa-solid fa-eye position-absolute"
                        : "fa-solid fa-eye-slash position-absolute"
                    }
                  ></i>

                  {errors.mentor_password && (
                    <p className="Error-meg-login-register">
                      {errors.mentor_password.message}
                    </p>
                  )}

                  {/* <i className="fa-solid fa-eye position-absolute"></i> */}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="csfvgdtrfs mb-4 position-relative">
                  <label
                    // htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    <b>
                      Confirm Password{" "}
                      <span className="RedColorStarMark">*</span>
                    </b>
                  </label>
                  <input
                    onKeyUp={() => {
                      trigger("mentor_confirm_password");
                    }}
                    className="form-control"
                    disabled={!inputOn}
                    placeholder="Type your password again....."
                    aria-describedby="emailHelp"
                    type={showIcons ? "text" : "password"}
                    {...register("mentor_confirm_password", {
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

                  {errors.mentor_confirm_password && (
                    <p className="Error-meg-login-register">
                      {errors.mentor_confirm_password.message}
                    </p>
                  )}

                  {/* <i className="fa-solid fa-eye position-absolute"></i> */}
                </div>
              </div>
            </div>
          </div>

          <div className="SignupStyleBox">
            <div className="sign-up-btn">Profile Details</div>
            <div className="row">
              <div className="col-lg-6">
                <div className="csfvgdtrfs mb-4 position-relative">
                  <label
                    // htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    <b>
                      Profile Picture{" "}
                      <span className="RedColorStarMark">*</span>
                    </b>
                  </label>
                  {signedUsingLinkedin === true ? (
                    <h6>We are using the Linkedin profile picture</h6>
                  ) : (
                    <>
                      <input
                        onKeyUp={() => {
                          trigger("linkedin_photo");
                        }}
                        disabled={!inputOn}
                        placeholder="Choose profile picture....."
                        type="file"
                        accept=".jpg ,.jpeg,.png"
                        className="form-control"
                        {...register("linkedin_photo", {
                          required: "Choose profile picture",
                        })}
                      />
                      {errors.linkedin_photo && (
                        <p className="Error-meg-login-register">
                          {errors.linkedin_photo.message}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="csfvgdtrfs mb-4 position-relative">
                  <label
                    // htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    <b>
                      Linkedin Profile URL{" "}
                      <span className="whiteColorStarMark">*</span>
                    </b>
                  </label>
                  <input
                    onKeyUp={() => {
                      trigger("social_media_profile");
                    }}
                    disabled={!inputOn}
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="LinkedIn profile URL"
                    {...register("social_media_profile", {
                      pattern: {
                        value:
                          /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/,
                        message:
                          "Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/yourprofile/)",
                      },
                    })}
                    className="form-control"
                  />

                  {errors.social_media_profile && (
                    <p className="Error-meg-login-register">
                      {errors.social_media_profile.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <label htmlFor="exampleInputEmail1" className="form-label mb-0">
                  <b>
                    Academic Qualification{" "}
                    <span className="RedColorStarMark">*</span>
                  </b>
                </label>

                <div className="dkjiherer moideuirer_list hello">
                  <ul className="ps-0 mb-0">
                    <li>
                      <input
                        onKeyUp={() => {
                          trigger("academic_qualification");
                        }}
                        type="radio"
                        disabled={!inputOn}
                        id="check_11"
                        name="academic_qualification"
                        value="Post Graduate"
                        className="d-none"
                        {...register("academic_qualification", {
                          required: "Please select your academic qualification",
                        })}
                      />
                      <label htmlFor="check_11">Post Graduate</label>
                    </li>
                    <li>
                      <input
                        onKeyUp={() => {
                          trigger("academic_qualification");
                        }}
                        type="radio"
                        disabled={!inputOn}
                        id="check_20"
                        name="academic_qualification"
                        value="Graduate"
                        className="d-none"
                        {...register("academic_qualification", {
                          required: "Please select your academic qualification",
                        })}
                      />
                      <label htmlFor="check_20">Graduate</label>
                    </li>
                    <li>
                      <input
                        onKeyUp={() => {
                          trigger("academic_qualification");
                        }}
                        type="radio"
                        disabled={!inputOn}
                        id="check_30"
                        name="academic_qualification"
                        value="Doctorate"
                        className="d-none"
                        {...register("academic_qualification", {
                          required: "Please select your academic qualification",
                        })}
                      />
                      <label htmlFor="check_30">Doctorate</label>
                    </li>
                  </ul>
                </div>
                <div
                  style={{
                    position: errors.academic_qualification ? "absolute" : "",
                  }}
                >
                  {errors.academic_qualification && (
                    <p
                      className="Error-meg-login-register"
                      style={{
                        position: errors.academic_qualification && "relative",
                        top: errors.academic_qualification && "52px",
                      }}
                    >
                      {errors.academic_qualification.message}
                    </p>
                  )}
                </div>
              </div>

              <div className=" col-lg-6 ">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  <b>
                    Institute/College name{" "}
                    <span className="RedColorStarMark">*</span>
                  </b>
                </label>
                <div className="dkjiherer moideuirer_list hello">
                  <div className="dropdown">
                    <input
                      onKeyUp={() => {
                        trigger("mentor_InstituteName");
                      }}
                      disabled={!inputOn}
                      type="text"
                      className="form-control"
                      placeholder="Choose/Search for a college..."
                      value={searchTerm} // Ensure input value is controlled
                      {...register("mentor_InstituteName", {
                        required: "College or Institute Name is required",
                      })}
                      onChange={handleInputChange}
                      onFocus={() => setDropdownVisible(searchTerm !== "")} // Show dropdown when focused
                    />
                    {dropdownVisible && filteredColleges.length > 0 && (
                      <div className="dropdown-content">
                        {filteredColleges.slice(0, 50).map(
                          (
                            college,
                            index // Limit to 10 results
                          ) => (
                            <div
                              key={index}
                              className="dropdown-item"
                              onClick={() => handleOptionClick(college)}
                            >
                              {college["College Name"]}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {errors.mentor_InstituteName && (
                  <p className="Error-meg-login-register">
                    {errors.mentor_InstituteName.message}
                  </p>
                )}
              </div>
              <div className="col-lg-6">
                <div className="mb-4">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <b>
                      Which Country You Live in?{" "}
                      <span className="RedColorStarMark">*</span>
                    </b>
                  </label>
                  <select
                    className="form-select"
                    {...register("mentor_country", {
                      required: "required",
                    })} //1
                  >
                    <option value="India">India</option>
                    {options.map((option) => (
                      <option
                        key={option.country_id}
                        value={option.country_name}
                      >
                        {option.country_name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.mentor_country && (
                  <p className="Error-meg-login-register">
                    {errors.mentor_country.message}
                  </p>
                )}
              </div>
              <div className="col-lg-6">
                <div className="csfvgdtrfs mb-4 position-relative">
                  <label
                    // htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    <b>
                      City <span className="whiteColorStarMark">*</span>
                    </b>
                  </label>
                  <input
                    onKeyUp={() => {
                      trigger("mentor_city");
                    }}
                    type="text"
                    disabled={!inputOn}
                    className="form-control"
                    // id="exampleInputEmail1"
                    placeholder="Enter your city name....."
                    aria-describedby="emailHelp"
                    {...register("mentor_city", {
                      pattern: {
                        value: /^[a-zA-Z\s]+$/, // Allows letters and spaces
                        message: "City name should contain only letters",
                      },
                    })} //1
                    onBlur={() => handleBlur("mentor_city")}
                  />
                  {errors.mentor_city && (
                    <p className="Error-meg-login-register">
                      {errors.mentor_city.message}
                    </p>
                  )}

                  <i className="fa-solid fa-map-location-dot position-absolute"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GoToTop />
    </>
  );
};

export default MentorForm1;
