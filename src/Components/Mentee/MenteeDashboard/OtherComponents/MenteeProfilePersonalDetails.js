import React from "react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LanguageMulti } from "../../../data/Languages.js";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ApiURL } from "../../../../Utils/ApiURL";
const MenteeProfilePersonalDetails = ({ singleMentee, user, token }) => {
  const url = ApiURL();
  const dispatch = useDispatch();
  const [ifEdit, setifEdit] = useState(false);

  const [selectedSkills, setSelectedSkills] = useState(() => {
    try {
      // Parse the mentee_language once if it's a stringified JSON array
      const parsedData = JSON.parse(singleMentee[0]?.mentee_language);
      return parsedData || [];
    } catch (error) {
      console.error("Error parsing mentee_language:", error);
      return [];
    }
  });
  const customStyles = {
    control: (base, state) => ({
      ...base,
      display: "flex",
      width: "100%",
      // padding: "0.375rem 2.25rem 0.375rem 0.75rem",
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#212529",
      // backgroundColor: "#fff",
      border: "1px solid #acaeaf",
      borderRadius: "0.25rem",
      transition:
        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
      appearance: "none",
      // Adjust border color on focus
      boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0,123,255,.25)" : "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const [formData, setFormData] = useState({
    mentee_firstname: singleMentee[0]?.mentee_firstname,
    mentee_lastname: singleMentee[0]?.mentee_lastname,
    mentee_phone_number: singleMentee[0]?.mentee_phone_number,
    mentee_email: singleMentee[0]?.mentee_email,
    mentee_linkedin_link: singleMentee[0]?.mentee_linkedin_url,
    mentee_language: singleMentee[0]?.mentee_language,
    mentee_gender: singleMentee[0]?.mentee_gender,
    mentee_aboutyouself: singleMentee[0]?.mentee_about,
  });

  const handleEditClick = () => {
    setifEdit(false);
  };
  const validateForm = () => {
    const { mentee_aboutyouself, mentee_linkedin_link } = formData;
    const linkedInPattern = /^https?:\/\/(www\.)?linkedin\.com\/.*$/i;
    if (!mentee_aboutyouself || !mentee_linkedin_link) {
      toast.error("All fields are required!");
      return false;
    }
    if (mentee_aboutyouself.length < 100) {
      toast.error("About Me feild Must be greater than 100 characters.");
      return false;
    }
    // Validate LinkedIn URL pattern
    if (!linkedInPattern.test(mentee_linkedin_link)) {
      toast.error("Please provide a valid LinkedIn profile URL!");
      return false;
    }

    return true;
  };
  const handleSavechanges = async (data) => {
    if (validateForm()) {
      try {
        const newData = new FormData();

        newData.append("user_type", "mentee");

        newData.append("mentee_linkedin_link", data.mentee_linkedin_link);
        newData.append("mentee_gender", data.mentee_gender);
        newData.append("mentee_language", data.mentee_language);
        newData.append("mentee_aboutyouself", data.mentee_aboutyouself);
        dispatch(showLoadingHandler());
        const response = await Promise.race([
          axios.post(
            `${url}api/v1/mentee/dashboard/profile/profile-details`,
            {
              formData,
              menteeUserDtlsId: user?.user_id,
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
          toast.success("Profile Details changed successfully");
        }
        if (response.data.error) {
          dispatch(hideLoadingHandler());
          toast.error(
            "There is some error while updating the profile details. Please try again"
          );
        }
      } catch (error) {
        toast.error(
          "There is some error while updating the profile details. Please try again"
        ); // Stop loading
        dispatch(hideLoadingHandler());
      } finally {
        dispatch(hideLoadingHandler());
        setifEdit(false);
      }
    }
  };

  const handleEditBtn = () => {
    setifEdit(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (phone) => {
    setFormData({
      ...formData,
      mentee_phone_number: phone,
    });
  };

  // Language change handler
  const handleLanguageChange = (selectedOption) => {
    setSelectedSkills(selectedOption);
    setFormData((prev) => ({
      ...prev,
      mentee_language: selectedOption,
    }));
  };

  return (
    <div className="col-lg-10 ps-0">
      <div className="">
        <div className="container">
          <div className="col-lg-10 col-md-12">
            <div className="mentee-prf-settings py-5">
              {!ifEdit && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <h3>Profile Settings</h3>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary "
                      style={{ textAlign: "right" }}
                      onClick={handleEditBtn}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
              <div>
                <div className="row">
                  <div className="col-lg-6 pb-3">
                    <label htmlFor="" className="form-label">
                      <b> First Name</b>{" "}
                      <span className="RedColorStarMark">*</span>
                    </label>

                    <input
                      type="text"
                      name="mentee_firstname"
                      className="form-control MentorProfile-BorderColor"
                      placeholder="First Name"
                      value={formData?.mentee_firstname}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="col-lg-6 pb-3" id="skill-tag">
                    <label htmlFor="" className="form-label">
                      <b>Last Name</b>
                      <span className="RedColorStarMark">*</span>
                    </label>
                    <input
                      type="text"
                      name="mentee_lastname"
                      className="form-control MentorProfile-BorderColor"
                      placeholder="Last Name"
                      value={formData?.mentee_lastname}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>

                  <div className="col-lg-6 pb-3" id="skill-tag">
                    <label htmlFor="" className="form-label">
                      <b> Phone Number </b>{" "}
                      <span className="RedColorStarMark">*</span>
                    </label>
                    <PhoneInput
                      country={"in"}
                      inputStyle={{
                        border: "1px solid #acaeaf",
                        borderRadius: "0.25rem",
                        padding: "0.375rem 0.75rem",
                        width: "100%",
                      }}
                      value={formData?.mentee_phone_number}
                      onChange={handlePhoneChange}
                      disabled
                    />
                  </div>
                  <div className="col-lg-6 pb-3" id="skill-tag">
                    <label htmlFor="" className="form-label">
                      <b>E-Mail Id</b>{" "}
                      <span className="RedColorStarMark">*</span>
                    </label>
                    <input
                      disabled
                      type="email"
                      name="mentee_email"
                      className="form-control MentorProfile-BorderColor"
                      placeholder="Email"
                      value={formData?.mentee_email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-lg-6 pb-3" id="skill-tag">
                    <label htmlFor="" className="form-label">
                      <b>Gender</b>
                    </label>

                    <select
                      name="Gender"
                      className="form-select"
                      disabled={!ifEdit}
                    >
                      <option value={formData?.mentee_gender}>
                        {formData?.mentee_gender}
                      </option>
                      <option value="">Male</option>
                      <option value="">Female</option>
                      <option value="">Other</option>
                    </select>
                  </div>
                  <div className="ufguirniirtr position-relative col-lg-6 pb-3">
                    <label htmlFor="" className="form-label">
                      <b>Languages</b>(Multiple)
                    </label>
                    <Select
                      isDisabled={!ifEdit}
                      value={selectedSkills} // Bind the state to the value
                      options={LanguageMulti}
                      isMulti={true}
                      closeMenuOnSelect={false}
                      onChange={handleLanguageChange} // Handle the onChange event
                      styles={customStyles}
                      // styles={{
                      //   control: (base) => ({
                      //     ...base,
                      //     fontFamily: "Lato", // Apply Lato font to the control
                      //   }),
                      //   menu: (base) => ({
                      //     ...base,
                      //     fontFamily: "Lato", // Apply Lato font to the menu options
                      //   }),
                      //   option: (base, state) => ({
                      //     ...base,
                      //     fontFamily: "Lato", // Apply Lato font to the options
                      //     backgroundColor: state.isFocused
                      //       ? "#f0f0f0"
                      //       : "white", // Optional: Add hover effect
                      //     color: state.isSelected ? "#333" : "#000", // Optional: Add selected option color
                      //   }),
                      // }}
                    />
                    <div id="ypautosuggestions"></div>
                  </div>
                </div>

                <div className="row">
                  <div className="ufguirniirtr position-relative col-lg-6 pb-3">
                    <label htmlFor="" className="form-label">
                      <b>About Me</b>{" "}
                      <span className="RedColorStarMark">*</span>
                    </label>

                    <textarea
                      name="mentee_aboutyouself"
                      className="form-control MentorProfile-BorderColor"
                      style={{ height: "100px" }}
                      placeholder="Write something about yourself"
                      value={formData?.mentee_aboutyouself}
                      onChange={handleInputChange}
                      disabled={!ifEdit}
                    ></textarea>

                    <div id="amautosuggestions"></div>
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="" className="form-label">
                      <b>Your Social Account Link</b>{" "}
                      <span className="RedColorStarMark">*</span>
                    </label>
                    <input
                      id="phone"
                      type="text"
                      name="mentee_linkedin_link"
                      className="form-control mt-1 MentorProfile-BorderColor"
                      placeholder="Linkedin Social Media Profile link"
                      value={formData?.mentee_linkedin_link}
                      onChange={handleInputChange}
                      disabled={!ifEdit}
                    />
                  </div>
                </div>
                {ifEdit && (
                  <div className="d-flex justify-content-between pb-3">
                    <button
                      type="button"
                      onClick={handleEditClick}
                      className="btn juybeubrer_btn btn-primary"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleSavechanges}
                      type="button"
                      className="btn juybeubrer_btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeProfilePersonalDetails;
