import React, { useState, useEffect, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CountryData from "../../../data/CountryData.json";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import collegeData from "../../../data/collegesname.json";
import "./MentorProfileSet.css";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ApiURL } from "../../../../Utils/ApiURL";

const Mentorprofile1 = ({ profiledata, user, token }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const url = ApiURL();

  const [formData, setFormData] = useState({
    mentor_firstname: profiledata?.mentor_firstname,
    mentor_lastname: profiledata?.mentor_lastname,
    mentor_phone_number: profiledata?.mentor_phone_number,
    mentor_email: profiledata?.mentor_email,
    social_media_profile: profiledata?.mentor_social_media_profile,
    mentor_country: profiledata?.mentor_country,
    mentor_city: profiledata?.mentor_city,
    mentor_institute: profiledata.mentor_institute,
    mentor_academic_qualification: profiledata?.mentor_academic_qualification,
  });
  const edulevel = formData.mentor_academic_qualification;
  const {
    setValue,
    formState: { errors },
  } = useForm();

  const [searchTerm, setSearchTerm] = useState(formData.mentor_institute);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null); // Store selected college

  // Function to handle input change
  const handleInputChange1 = (e) => {
    // const value = e.target.value;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSearchTerm(value);
    setValue("mentor_InstituteName", value);
    setDropdownVisible(value !== ""); // Only show dropdown when input is not empty
  };

  // Filter colleges based on the search term
  const filteredColleges = collegeData.filter((item) =>
    item["College Name"]?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  // Function to handle dropdown option click
  const handleOptionClick = (college) => {
    setSelectedCollege(college); // Set selected college
    setSearchTerm(college["College Name"]); // Update input with selected college name
    setDropdownVisible(false); // Hide dropdown after selection
    setValue("mentor_InstituteName", college["College Name"]);
    formData.mentor_institute = college["College Name"];
  };
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setOptions(CountryData);
  }, []);

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
      mentor_phone_number: phone,
    });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const validateForm = () => {
    const {
      social_media_profile,
      mentor_country,
      mentor_institute,
      mentor_city,
    } = formData;

    // Regular expression to validate LinkedIn profile URL
    const linkedInPattern = /^https?:\/\/(www\.)?linkedin\.com\/.*$/i;

    // Check if any required field is missing or contains only whitespace
    if (
      !social_media_profile?.trim() ||
      !mentor_country?.trim() ||
      !mentor_institute?.trim() ||
      !mentor_country?.trim() ||
      !mentor_city?.trim()
    ) {
      toast.error("All fields are required!");
      return false;
    }

    // Validate LinkedIn URL pattern
    if (!linkedInPattern.test(social_media_profile)) {
      toast.error("Please provide a valid LinkedIn profile URL!");
      return false;
    }

    return true;
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        dispatch(showLoadingHandler());
        const res = await Promise.race([
          axios.post(
            `${url}api/v1/mentor/dashboard/update/profile-1`,
            {
              formData,
              mentorUserDtlsId: user.user_id,
              mentor_email: profiledata?.mentor_email,
              mentorPhoneNumber: profiledata?.mentor_phone_number,
            },
            {
              headers: { authorization: "Bearer " + token },
            }
          ),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);
        if (res.data.success) {
          toast.success("Profile Details updated successfully");
          setIsEditing(false);
        } else if (res.data.error) {
          toast.error(res.data.error);
          setIsEditing(false);
        }
      } catch (error) {
        if (error.message === "Request timed out") {
          toast.error("Update failed due to a timeout. Please try again.");
        } else {
          toast.error(
            "Error in updating the profile details, please try again!"
          );
        }
      } finally {
        dispatch(hideLoadingHandler());
        setIsEditing(false);
      }
    }
  };

  return (
    <main>
      {!isEditing && (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            type="button"
            className="btn btn-primary "
            style={{ textAlign: "right" }}
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
      )}
      <div className="doiherner_wrapper">
        <div className="ihduwfr_form_wrapper p-0" style={{ height: "auto" }}>
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-4">
                <label className="form-label">
                  <b>First Name</b>
                  <span className="RedColorStarMark">*</span>
                </label>
                <input
                  type="text"
                  name="mentor_firstname"
                  className="form-control"
                  placeholder="First Name"
                  value={formData.mentor_firstname}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mb-4">
                <label className="form-label">
                  <b>Last Name</b>
                  <span className="RedColorStarMark">*</span>
                </label>
                <input
                  type="text"
                  name="mentor_lastname"
                  className="form-control"
                  placeholder="Last Name"
                  value={formData.mentor_lastname}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
            </div>

            <div className="col-lg-6 UpdateProfile-PhoneD">
              <div className="mb-4">
                <label className="form-label">
                  <b>Mobile Number</b>
                  <span className="RedColorStarMark">*</span>
                </label>
                <PhoneInput
                  country={"in"}
                  value={formData.mentor_phone_number}
                  onChange={handlePhoneChange}
                  disabled
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="csfvgdtrfs mb-4 position-relative">
                <label className="form-label">
                  <b>Email</b>
                  <span className="RedColorStarMark">*</span>
                </label>
                <input
                  disabled
                  type="email"
                  name="mentor_email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.mentor_email}
                  onChange={handleInputChange}
                />
                <i className="fa-solid fa-envelopes-bulk position-absolute"></i>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label mb-0">
                <b>Academic Qualification</b>
                <span className="RedColorStarMark">*</span>
              </label>

              <div className="dkjiherer moideuirer_list hello">
                <ul className="ps-0 mb-0">
                  <li>
                    <input
                      type="radio"
                      id="check_11"
                      name="mentor_academic_qualification"
                      className="d-none"
                      value="Post Graduate"
                      defaultChecked={edulevel === "Post Graduate"}
                      onChange={handleInputChange} // Add the onChange event
                      disabled={!isEditing}
                    />
                    <label htmlFor="check_11">Post Graduate</label>
                  </li>

                  <li>
                    <input
                      type="radio"
                      id="check_20"
                      name="mentor_academic_qualification"
                      className="d-none"
                      value="Graduate"
                      defaultChecked={edulevel === "Graduate"}
                      onChange={handleInputChange} // Add the onChange event
                      disabled={!isEditing}
                    />
                    <label htmlFor="check_20">Graduate</label>
                  </li>

                  <li>
                    <input
                      type="radio"
                      id="check_30"
                      name="mentor_academic_qualification"
                      className="d-none"
                      value="Doctorate"
                      defaultChecked={edulevel === "Doctorate"}
                      onChange={handleInputChange} // Add the onChange event
                      disabled={!isEditing}
                    />
                    <label htmlFor="check_30">Doctorate</label>
                  </li>
                </ul>
              </div>
            </div>

            <div className=" col-lg-6 ">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <b>Institute/College name</b>
                <span className="RedColorStarMark">*</span>
              </label>
              <div className="dkjiherer moideuirer_list hello">
                <div className="dropdown">
                  <input
                    type="text"
                    name="mentor_institute"
                    className="form-control"
                    placeholder="Search for a college..."
                    disabled={!isEditing}
                    value={searchTerm} // Ensure input value is controlled
                    onChange={handleInputChange1}
                    onFocus={() => setDropdownVisible(searchTerm !== "")} // Show dropdown when focused
                  />
                  {dropdownVisible && filteredColleges.length > 0 && (
                    <div className="dropdown-content">
                      {filteredColleges.slice(0, 10).map(
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
            </div>

            <div className="col-lg-6">
              <div className="csfvgdtrfs mb-4 position-relative">
                <label className="form-label">
                  <b>Linkedin Social Media Profile</b>
                  <span className="RedColorStarMark">*</span>
                </label>
                <input
                  type="text"
                  name="social_media_profile"
                  className="form-control"
                  placeholder="Linkedin Social Media Profile link"
                  value={formData.social_media_profile}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  pattern="/^https?:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mb-4">
                <label className="form-label">
                  <b>Which Country do You Live in?</b>
                  <span className="RedColorStarMark">*</span>
                </label>
                <select
                  className=" form-select"
                  name="mentor_country"
                  value={formData.mentor_country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <option value="">{profiledata.mentor_country}</option>
                  {options.map((option) => (
                    <option key={option.country_id} value={option.country_name}>
                      {option.country_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="csfvgdtrfs mb-4 position-relative">
                <label
                  // htmlFor="exampleInputEmail1"
                  className="form-label"
                >
                  <b>City</b>
                  <span className="RedColorStarMark">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mentor_city"
                  placeholder="City"
                  aria-describedby="emailHelp"
                  value={formData.mentor_city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />

                <i className="fa-solid fa-map-location-dot position-absolute"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="button-group">
        {isEditing && (
          <div className="d-flex justify-content-between m-4">
            <button
              type="button"
              onClick={handleEditClick}
              className="btn juybeubrer_btn btn-primary"
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn juybeubrer_btn btn-primary"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Mentorprofile1;
