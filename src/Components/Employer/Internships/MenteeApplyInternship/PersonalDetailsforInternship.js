import React from "react";
import { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Language } from "../../../data/Languages.js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ApiURL } from "../../../../Utils/ApiURL.js";
import Select from "react-select";
import { LanguageMulti } from "../../../data/Languages.js";
import "./MenteeInternshipApply.css";
import Navabar2 from "../../../Navbar/Navabar2.js";

const PersonalDetailsforInternship = () => {
  const url = ApiURL();
  const dispatch = useDispatch();
  const [ifEdit, setifEdit] = useState(false);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const storedData = localStorage.getItem("menteeData1");
  const menteeData1 = JSON.parse(storedData);
  console.log(menteeData1);

  const [formData, setFormData] = useState({
    mentee_firstname: menteeData1?.mentee_firstname,
    mentee_lastname: menteeData1?.mentee_lastname,
    mentee_phone_number: menteeData1?.mentee_phone_number,
    mentee_email: menteeData1?.mentee_email,
    mentee_linkedin_link: menteeData1?.mentee_linkedin_link,
    mentee_language: menteeData1?.mentee_language,
    mentee_gender: menteeData1?.mentee_gender,
    mentee_aboutyouself: menteeData1?.mentee_aboutyouself,
  });
  // State to store the selected values
  const [selectedSkills, setSelectedSkills] = useState(
    menteeData1?.mentee_language
  );

  // Handle the change event to update the state
  const handleChange = (selectedOption) => {
    setSelectedSkills(selectedOption);
    setFormData({
      ...formData,
      mentee_language: selectedOption,
    });
  };

  const validateForm = () => {
    const { mentee_language, mentee_aboutyouself } = formData;
    if (!mentee_language || !mentee_aboutyouself) {
      toast.error("All fields are required!");
      return false;
    }
    return true;
  };
  // const handleSavechanges = async (event) => {
  //   event.preventDefault();
  //   if (validateForm()) {
  //     try {
  //       dispatch(showLoadingHandler());
  //       const response = await Promise.race([
  //         axios.post(
  //           `${url}api/v1/mentee/dashboard/profile/profile-details`,
  //           {
  //             formData,
  //             menteeUserDtlsId: user?.user_id,
  //           },
  //           {
  //             headers: { authorization: "Bearer " + token },
  //           }
  //         ),
  //         new Promise((_, reject) =>
  //           setTimeout(() => reject(new Error("Request timed out")), 45000)
  //         ),
  //       ]);
  //       if (response.data.success) {
  //         dispatch(hideLoadingHandler());
  //         toast.success("Profile Details changed successfully");
  //       }
  //       if (response.data.error) {
  //         dispatch(hideLoadingHandler());
  //         toast.error(
  //           "There is some error while updating the profile details. Please try again"
  //         );
  //       }
  //     } catch (error) {
  //       toast.error(
  //         "There is some error while updating the profile details. Please try again"
  //       ); // Stop loading
  //       dispatch(hideLoadingHandler());
  //     } finally {
  //       dispatch(hideLoadingHandler());
  //       setifEdit(false);
  //     }
  //   }
  // };

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

  const navigate = useNavigate();
  const handlenextpage = () => {
    // Save the updated data to local storage
    localStorage.setItem("menteeData1", JSON.stringify(formData));
    navigate("/showmenteeedudetails");
  };
  const handlebackpage = () => {
    navigate(-1);
  };

  return (
    <div className="">
      <Navabar2 />
      <div className="Edudetails_ApplyInterns">
        <div className="container">
          <div className="col-lg-10 col-md-12">
            <div className="mentee-prf-settings py-5">
              <div>
                <div className="row">
                  <div className="col-lg-6 pb-3">
                    <label htmlFor="" className="form-label">
                      First Name
                    </label>

                    <input
                      type="text"
                      name="mentee_firstname"
                      className="form-control"
                      placeholder="First Name"
                      value={formData?.mentee_firstname}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="col-lg-6 pb-3" id="skill-tag">
                    <label htmlFor="" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="mentee_lastname"
                      className="form-control"
                      placeholder="Last Name"
                      value={formData?.mentee_lastname}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>

                  <div className="col-lg-6 pb-3" id="skill-tag">
                    <label htmlFor="" className="form-label">
                      Phone Number
                    </label>
                    <PhoneInput
                      country={"in"}
                      value={formData?.mentee_phone_number}
                      onChange={handlePhoneChange}
                      disabled
                    />
                  </div>

                  <div className="col-lg-6 pb-3" id="skill-tag">
                    <label htmlFor="" className="form-label">
                      E-Mail Id
                    </label>
                    <input
                      disabled
                      type="email"
                      name="mentee_email"
                      className="form-control"
                      placeholder="Email"
                      value={formData?.mentee_email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-lg-6 pb-3" id="skill-tag">
                    <label htmlFor="" className="form-label">
                      Gender
                    </label>

                    <select
                      name="Gender"
                      className="form-select"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mentee_gender: e.target.value,
                        })
                      }
                    >
                      <option value={formData?.mentee_gender} disabled selected>
                        {formData?.mentee_gender || "Select Gender"}
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="ufguirniirtr position-relative col-lg-6 pb-3">
                    <label htmlFor="" className="form-label">
                      Languages
                    </label>
                    <Select
                      options={LanguageMulti}
                      isMulti={true}
                      closeMenuOnSelect={false}
                      onChange={handleChange} // Handle the onChange event
                      value={selectedSkills} // Bind the state to the value
                    />

                    <div id="ypautosuggestions"></div>
                  </div>
                </div>

                <div className="row">
                  <div className="ufguirniirtr position-relative col-lg-6 pb-3">
                    <label htmlFor="" className="form-label">
                      Objective
                    </label>

                    <textarea
                      name="mentee_aboutyouself"
                      className="form-control"
                      style={{ height: "100px" }}
                      placeholder="Write something about yourself"
                      value={formData?.mentee_aboutyouself}
                      onChange={handleInputChange}
                    ></textarea>

                    <div id="amautosuggestions"></div>
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="" className="form-label">
                      Your Linkedin Account Link
                    </label>
                    <input
                      id="phone"
                      type="text"
                      name="mentee_linkedin_link"
                      className="form-control"
                      placeholder="Linkedin  Profile link"
                      value={formData?.mentee_linkedin_link}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between pb-3">
                  <button
                    type="button"
                    onClick={handlebackpage}
                    className="btn juybeubrer_btn btn-primary"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlenextpage}
                    type="button"
                    className="btn juybeubrer_btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsforInternship;
