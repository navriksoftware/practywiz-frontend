import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../Mentee/Phone-input-style.css";
// import "./passwordHideIcon.css";
import collegeData from "../../../data/collegesname.json";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ApiURL } from "../../../../Utils/ApiURL";

const InstituteForm = ({ InstitutePreviousHandler }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const password = watch("institute_password");
  const nameOfInstitute = watch("institute_name");

  const [showIcons, setShowIcons] = useState(false);
  const [conShowIcons, setConShowIcons] = useState(false);

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

  const onSubmit = async (data) => {
    const cleanedData = {
      ...data,
      institute_phone: cleanPhoneNumber(data.institute_phone), // Clean the phone number
    };
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="step" id="instituteInputFields">
        <h4 className="text-center">
          <img src="images/icons8-account-96.webp" alt="" className="me-1" />
          Registration For Institutions
        </h4>

        <div className="ihduwfr_form_wrapper mt-3">
          <div className="row">
            <div className="col-lg-12">
              <div className="mb-3">
                <label htmlFor="forName" className="form-label">
                  Institute Name
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
                    />
                    {dropdownVisible && filteredColleges.length > 0 && (
                      <div className="dropdown-content">
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

            <div className="col-lg-12">
              <div className="mb-3">
                <label htmlFor="contacPersonFirstName" className="form-label">
                  Contact Person First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contacPersonFirstName"
                  placeholder="Contact Person First Name"
                  {...register("institute_contact_person_first_name", {
                    required: "Name of contact person is required",
                  })}
                />
                {errors.institute_contact_person_first_name && (
                  <p className="Error-meg-login-register">
                    {errors.institute_contact_person_first_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb-3">
                <label htmlFor="contacPersonLastName" className="form-label">
                  Contact Person Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contacPersonLastName"
                  placeholder="Contact Person Last Name"
                  {...register("institute_contact_person_last_name", {
                    required: "Name of contact person is required",
                  })}
                />
                {errors.institute_contact_person_last_name && (
                  <p className="Error-meg-login-register">
                    {errors.institute_contact_person_last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb-3">
                <label htmlFor="emailId" className="form-label">
                  Email Id
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  placeholder="Enter Email Id"
                  {...register("institute_email", {
                    required: "Institute Email is required",
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
                        />
                        {errors.institute_phone && (
                          <p style={{ color: "red", marginTop: "8px" }}>
                            {errors.institute_phone.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* <div className="col-lg-12">
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  className="form-control"
                  id="address"
                  type="text"
                  placeholder="Address"
                  {...register("institute_address", {
                    required: "Address is required",
                  })}
                />
                <p className="Error-meg-login-register">
                  {errors.institute_address?.message}
                </p>
              </div>
            </div> */}

            <div className="col-lg-12">
              <div className="mb-3 csfvgdtrfs position-relative">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  type={showIcons ? "text" : "password"}
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
                  onClick={() => setShowIcons(!showIcons)}
                  className={
                    showIcons
                      ? "fa-solid fa-eye position-absolute"
                      : "fa-solid fa-eye-slash position-absolute"
                  }
                />
                <p className="Error-meg-login-register">
                  {errors.institute_password?.message}
                </p>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb-3 csfvgdtrfs position-relative">
                <label htmlFor="cPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  className="form-control"
                  id="cPassword"
                  type={conShowIcons ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirm_password", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
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
                  {errors.confirm_password?.message}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between pt-3">
          <input
            type="button"
            className="btn dgheuih_btn_prev btn-main"
            onClick={(event) => InstitutePreviousHandler(event, "institute")}
            value="Previous"
            name="Previous"
          />

          <button type="submit" className="btn dgheuih_btn_next btn-main">
            Create Account
          </button>
        </div>
      </div>
    </form>
  );
};

export default InstituteForm;
