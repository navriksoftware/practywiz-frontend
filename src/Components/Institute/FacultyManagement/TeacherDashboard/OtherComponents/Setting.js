import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import collegeData from "../../../../data/collegesname.json";
function Setting({ userdata }) {
  const {
    register,
    watch,
    setValue,
    getValues,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      faculty_firstname: userdata[0]?.faculty_firstname,
      faculty_lastname: userdata[0]?.faculty_lastname,
      faculty_phone_number: userdata[0]?.faculty_phone_number,
      faculty_email: userdata[0]?.faculty_email,
      faculty_institute_name: userdata[0]?.faculty_institute_name,
      faculty_institute_code: userdata[0]?.faculty_institute_code,


    }
  });
  console.log("userdata", userdata);

  const [isEditing, setIsEditing] = useState(false);
  const nameOfInstitute = watch("faculty_institute_name");
  //Institute name code start
  const [searchTerm, setSearchTerm] = useState(userdata[0]?.faculty_institute_name);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setValue("faculty_institute_name", value);
    setDropdownVisible(value !== "");
  };

  const filteredColleges = collegeData.filter((item) =>
    item["College Name"]?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleOptionClick = (college) => {
    setSelectedCollege(college);
    setSearchTerm(college["College Name"]);
    setDropdownVisible(false);
    setValue("faculty_institute_name", college["College Name"]);
  };


  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

  };

  return (
    <main className="jdoieoir_wrapper"
      style={{ width: "90%", paddingTop: "2rem" }}>
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
        <div className="p-0" style={{ height: "auto" }}>
          <div className="row">



            <div className="col-lg-6">
              <div className="mb-3">
                <label htmlFor="contacPersonFirstName" className="form-label">
                  First Name <span className="RedColorStarMark">*</span>
                </label>
                <input
                  type="text"
                  onKeyUp={() => trigger("faculty_firstname")}
                  className="form-control"
                  disabled={!isEditing}
                  id="contacPersonFirstName"
                  placeholder="First Name"
                  {...register("faculty_firstname", {
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
                {errors.faculty_firstname && (
                  <p className="Error-meg-login-register">
                    {errors.faculty_firstname.message}
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
                  onKeyUp={() => trigger("faculty_lastname")}
                  className="form-control"
                  disabled={!isEditing}
                  id="contacPersonLastName"
                  placeholder="Last Name"
                  {...register("faculty_lastname", {
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
                {errors.faculty_lastname && (
                  <p className="Error-meg-login-register">
                    {errors.faculty_lastname.message}
                  </p>
                )}
              </div>
            </div>




            <div className="col-lg-6">
              <div className="mb-3">
                <label htmlFor="emailId" className="form-label">
                  Email Id <span className="RedColorStarMark">*</span>
                </label>
                <input
                  type="email"
                  onKeyUp={() => trigger("faculty_email")}
                  className="form-control"
                  disabled
                  id="emailId"
                  placeholder="Enter Email Id"
                  {...register("faculty_email", {
                    required: "Enter your Email Id.",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Must be a valid email address.",
                    },
                  })}
                />
                {errors.faculty_email && (
                  <p className="Error-meg-login-register">
                    {errors.faculty_email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-lg-6 UpdateProfile-PhoneD">
              <div className="mb-4">
                <label className="form-label">
                  Mobile Number
                  <span className="RedColorStarMark">*</span>
                </label>
                <PhoneInput
                  country={"in"}
                  //  value={faculty_phone_number}
                  //  onChange={handlePhoneChange}
                  disabled
                />
              </div>
            </div>






            <div className="col-lg-6" >
              <div className="mb-3">
                <label htmlFor="forName" className="form-label">
                  Institute Name <span className="RedColorStarMark">*</span>
                </label>
                <div className="dkjiherer moideuirer_list hello">
                  <div >
                    <input
                      type="text"
                      disabled={!isEditing}
                      className="form-control"
                      placeholder="Enter Institute Name"
                      value={searchTerm}
                      {...register("faculty_institute_name", {
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

                {errors.faculty_institute_name && (
                  <p className="Error-meg-login-register">
                    {!nameOfInstitute && errors.faculty_institute_name.message}
                  </p>
                )}
              </div>
            </div>


            <div className="col-lg-6">
              <div className="mb-3">
                <label htmlFor="contacPersonLastName" className="form-label">
                  Institute Code <span className="RedColorStarMark">*</span>
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  onKeyUp={() => trigger("faculty_institute_code")}
                  className="form-control"
                  id="contacPersonLastName"
                  placeholder="Institute Code"
                  {...register("faculty_institute_code", {
                    required: "Enter your Institute Code.",
                  })}
                />
                {errors.faculty_institute_code && (
                  <p className="Error-meg-login-register">
                    {errors.faculty_institute_code.message}
                  </p>
                )}
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
}

export default Setting;
