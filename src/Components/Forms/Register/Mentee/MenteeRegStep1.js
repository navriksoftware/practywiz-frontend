import React from "react";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import GoToTop from "../../../../Utils/GoToTop";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Phone-input-style.css";
import "./MenteeReg.css";
const MenteeRegStep1 = ({ selectedOption, handleChange }) => {
  const [showIcon, setShowIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const {
    register,
    watch,
    control,
    trigger,
    formState: { errors },
  } = useFormContext();
  const password = watch("mentee_password");

  return (
    <>
      <div className="step active" id="step1">
        <h4 className="text-center">
          <img src="images/icons8-account-96.webp" alt="" className="me-1" />
          Step 1: Account Information
        </h4>

        <div className="ihduwfr_form_wrapper mt-4">
          <div className="csfvgdtrfs cihseriniewr mb-3 position-relative">
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
            {/* <input
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
            </label> */}
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
          </div>

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
                      value: /^[a-zA-Z]+$/, // Pattern for letters only
                      message: "First name should contain only letters",
                    },
                    minLength: {
                      value: 2,
                      message: "Must be greater than 2 characters.",
                    },
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
                      value: /^[a-zA-Z]+$/, // Pattern for letters only
                      message: "Last name should contain only letters",
                    },
                    minLength: {
                      value: 2,
                      message: "Must be greater than 2 characters.",
                    },
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
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Phone Number <span className="RedColorStarMark">*</span>
            </label>
            <div className="h-25">
              <Controller
                name="mentee_phone"
                control={control}
                defaultValue=""
                rules={{
                  required: "Phone number is required",
                  validate: {
                    minLength: (value) =>
                      value.replace(/\D/g, "").length >= 12 ||
                      "Enter a valid phone number",
                  },
                }}
                render={({ field: { name, value, onChange, onBlur, ref } }) => (
                  <div>
                    <PhoneInput
                      value={value}
                      country="in"
                      countryCodeEditable={false}
                      onChange={(value, country, event, formattedValue) => {
                        onChange(formattedValue); // Update the phone value
                        trigger("mentee_phone"); // Trigger validation dynamically
                      }}
                      onBlur={onBlur}
                      inputProps={{
                        name,
                        ref,
                      }}
                    />
                  
                  </div>
                )}
              />
                {errors.mentee_phone && (
                      <div
                        className="Error-meg-login-register"
                        style={{ display: "block" }}
                      >
                        {errors.mentee_phone.message}
                      </div>
                    )}
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

        <div className="d-flex justify-content-between pt-3">
          <div className="uherrr_text text-center">
            <p className="mb-0">
              Already Have An Account? <a href="/login">Log In</a>
            </p>
          </div>
        </div>
      </div>
      <GoToTop />
    </>
  );
};

export default MenteeRegStep1;
