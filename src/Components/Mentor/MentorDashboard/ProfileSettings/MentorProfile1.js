import React, { useState, useEffect, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CountryData from "../../../data/CountryData.json";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
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
  const {
    setValue,
    register,
    control,
    trigger,
    formState: { errors },
  } = useForm();

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "MentorEduDetails",
  });
  // Initialize form data
  useEffect(() => {
    if (profiledata?.mentor_institute) {
      try {
        const parsedData = JSON.parse(profiledata.mentor_institute);
        setValue("MentorEduDetails", parsedData);
      } catch (error) {
        console.error("Error parsing mentor institute data:", error);
        setValue("MentorEduDetails", []);
      }
    }
  }, [profiledata, setValue]);
  const formValues = useWatch({
    control,
    name: "MentorEduDetails",
  });

  // Maintain separate state for each field
  const [searchStates, setSearchStates] = useState(
    fields.map(() => ({
      searchTerm: "",
      dropdownVisible: false,
    }))
  );

  const handleInputCollegeName = (e, index) => {
    const value = e.target.value;
    setSearchStates((prev) => {
      const newStates = [...prev];
      if (!newStates[index]) {
        newStates[index] = { searchTerm: "", dropdownVisible: false };
      }
      newStates[index] = {
        ...newStates[index],
        searchTerm: value,
        dropdownVisible: value !== "",
      };
      return newStates;
    });
    setValue(`MentorEduDetails.${index}.Institute`, value);
  };

  const handleOptionClick = (college, index) => {
    setSearchStates((prev) => {
      const newStates = [...prev];
      newStates[index] = {
        searchTerm: college["College Name"],
        dropdownVisible: false,
      };
      return newStates;
    });
    setValue(`MentorEduDetails.${index}.Institute`, college["College Name"]);
  };
  const edulevel = formData.mentor_academic_qualification;

 
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
      // !mentor_institute?.trim() ||
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
    if(Object.keys(errors).length){

       toast.error("Please remove all error before saving the data ");
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
              formValues,
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
      <div className="doiherner_wrapper Mentor_Profile1">
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
          </div>
          <>
            {fields.map((field, index) => {
              const currentSearchState = searchStates[index] || {
                searchTerm: "",
                dropdownVisible: false,
              };
              const filteredColleges = collegeData.filter((item) =>
                item["College Name"]
                  .toLowerCase()
                  .includes(currentSearchState.searchTerm.toLowerCase())
              );

              return (
                <div className="row" key={field.id}>
                  {fields.length > 1 && (
                    <div className="MentorProfile-EduD-Removebtn">
                      <i
                        className="fa-solid fa-xmark"
                        onClick={() => remove(index)}
                      ></i>
                    </div>
                  )}

                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">
                        <b>
                          Institute Name:
                          <span className="RedColorStarMark">*</span>
                        </b>
                      </label>

                      <div className="MR-positionInstitute">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Choose/Search for a college"
                          // value={currentSearchState.searchTerm}
                          {...register(`MentorEduDetails.${index}.Institute`, {
                            required: "Institute name is required",
                          })}
                          onChange={(e) => handleInputCollegeName(e, index)}
                          onKeyUp={() =>
                            trigger(`MentorEduDetails.${index}.Institute`)
                          }
                          disabled={!isEditing}
                          onBlur={() => {
                            setTimeout(() => {
                              setSearchStates((prev) => {
                                const newStates = [...prev];
                                if (newStates[index]) {
                                  newStates[index] = {
                                    ...newStates[index],
                                    dropdownVisible: false,
                                  };
                                }
                                return newStates;
                              });
                            }, 200);
                          }}
                        />
                        {currentSearchState.dropdownVisible &&
                          filteredColleges.length > 0 && (
                            <div className="MentorRegInstitutePage">
                              {filteredColleges
                                .slice(0, 50)
                                .map((college, collegeIndex) => (
                                  <div
                                    key={`${index}-${collegeIndex}`}
                                    className="dropdown-item"
                                    onClick={() =>
                                      handleOptionClick(college, index)
                                    }
                                  >
                                    {college["College Name"]}
                                  </div>
                                ))}
                            </div>
                          )}
                      </div>

                      {errors.MentorEduDetails?.[index]?.Institute && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {errors.MentorEduDetails[index].Institute.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 MentorProfile1MentorEdu-Flex ">
                    <div className="MentorProfile1-eduDetails-boxsize">
                      <div className="mb-4">
                        <label className="form-label">
                          <b>
                            Degree Name
                            <span className="RedColorStarMark">*</span>
                          </b>
                        </label>
                        <input
                          className="form-control"
                          {...register(`MentorEduDetails.${index}.Degree`, {
                            required: "Degree Name is required",
                          })}
                          placeholder="Enter Degree"
                          onKeyUp={() =>
                            trigger(`MentorEduDetails.${index}.Degree`)
                          }
                          disabled={!isEditing}
                        />
                        {errors.MentorEduDetails?.[index]?.Degree && (
                          <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.MentorEduDetails[index].Degree.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="MentorProfile1-eduDetails-boxsize">
                      <div className="mb-4">
                        <label className="form-label">
                          <b>
                            Year of completion:
                            <span className="RedColorStarMark">*</span>
                          </b>
                        </label>
                        <input
                          className="form-control"
                          {...register(
                            `MentorEduDetails.${index}.YearCompletion`,
                            {
                              required: "Year of completion is required",
                              pattern: {
                                value: /^\d{4}$/, // Ensures exactly 4 digits
                                message: "Year must be exactly 4 digits",
                              },
                              validate: (value) =>
                                value.length === 4 || "Year must be exactly 4 characters long",
                            }
                          )}
                          
                          placeholder="Enter Year of completion"
                          onKeyUp={() =>
                            trigger(`MentorEduDetails.${index}.YearCompletion`)
                          }
                          disabled={!isEditing}
                        />
                        {errors.MentorEduDetails?.[index]?.YearCompletion && (
                          <span style={{ color: "red", fontSize: "12px" }}>
                            {
                              errors.MentorEduDetails[index].YearCompletion
                                .message
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {fields.length < 3 && (
              <div className="Mentorpage2-edu-Addbtn">
                <span
                  onClick={() => {
                    append({
                      Degree: "",
                      Institute: "",
                      YearCompletion: "",
                    });
                    setSearchStates((prev) => [
                      ...prev,
                      { searchTerm: "", dropdownVisible: false },
                    ]);
                  }}
                >
                  <i className="fa-regular fa-plus"></i>
                  Add More
                </span>
              </div>
            )}
          </>
          <div className="row">
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
            <div className="col-lg-6">
              <div className="mb-4">
                <label className="form-label">
                  <b>Which Country Do You Live in?</b>
                  <span className="RedColorStarMark">*</span>
                </label>
                <select
                  className=" form-select"
                  name="mentor_country"
                  value={formData.mentor_country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <option value="">Please select your Country name</option>
                  {/* <option value="">{profiledata.mentor_country}</option> */}
                  {options.map((option) => (
                    <option key={option.country_id} value={option.country_name}>
                      {option.country_name}
                    </option>
                  ))}
                </select>
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
