import React from "react";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";
import { toast } from "react-toastify";
import { hideLoadingHandler, showLoadingHandler } from "../../../../Redux/loadingRedux";
import { useDispatch } from "react-redux";
const InternshipProfileSettings = ({ data, employerDtlsId, token }) => {

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm();
  const url = ApiURL();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      setValue('employer_first_name', data[0]?.employer_firstname);
      setValue('employer_last_name', data[0]?.employer_lastname);
      setValue('employer_email', data[0]?.employer_email);
      setValue('employer_phone', data[0]?.employer_phone_number);
      setValue('organization_name', data[0]?.employer_organization_name);
      setValue('organization_description', data[0]?.employer_organization_desc);
      setValue('company_size', data[0]?.employer_organization_no_of_emp);
      setValue('organization_city', data[0]?.employer_organization_location);
      setValue('industry', data[0]?.employer_organization_industry);
      setValue('organization_website', data[0]?.employer_organization_website);
      setValue('organization_linkedin', data[0]?.employer_organization_linkedin);
    }
  }, [data, setValue]);

  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (fromdata) => {
    console.log(fromdata, employerDtlsId);
    try {
      dispatch(showLoadingHandler());
      const res = await Promise.race([
        axios.post(
          `${url}api/v1/employer/internship/employer-profileSettings`,
          {
            fromdata,
            employerDtlsId,

          }
          , {
            headers: { authorization: "Bearer " + token },
          }
        ),
        new Promise(
          (_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
        )
      ])

      if (res.data.success) {
        toast.success("Profile Details updated successfully");
        setIsEditing(false);
      } else if (res.data.error) {
        toast.error(res.data.error);
        setIsEditing(false);
      }

    }
    catch (error) {
      if (error.message === "Request timed out") {
        toast.error("Update failed due to a timeout. Please try again.");
      } else {
        toast.error(
          "Error in updating the profile details, please try again!"
        );
      }

    }
    finally {
      dispatch(hideLoadingHandler());
      setIsEditing(false);

    }


  };
  return (
    <div>
      {" "}
      <div className="mt-4 Inernship_form">
        <div className="container">
          <div style={{ textAlign: "center" }} className="mb-4">
            <h2>Profile Update</h2>
          </div>
          <div className="doiherner_wrapper">
            <div
              className="ihduwfr_form_wrapper p-0"
              style={{ height: "auto" }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                {!isEditing && (
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                      type="button"
                      className="btn juybeubrer_btn btn-primary"
                      style={{ textAlign: "right" }}
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>
                  </div>
                )}
                <div className="form_wrapper mt-3">
                  <div className="row">
                    {" "}
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          disabled
                          onKeyUp={() => trigger("employer_first_name")}
                          className="form-control"
                          id="firstName"
                          placeholder="Your First Name"
                          {...register("employer_first_name", {
                            required: "First name is required",
                            pattern: {
                              value: /^[a-zA-Z]+$/,
                              message: "First name should contain only letters",
                            },
                            minLength: {
                              value: 2,
                              message: "Must be at least 2 characters",
                            },
                          })}
                        />
                        {errors.employer_first_name && (
                          <p className="Error-meg-login-register">
                            {errors.employer_first_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          disabled
                          onKeyUp={() => trigger("employer_last_name")}
                          className="form-control"
                          id="lastName"
                          placeholder="Your Last Name"
                          {...register("employer_last_name", {
                            required: "Last name is required",
                            pattern: {
                              value: /^[a-zA-Z]+$/,
                              message: "Last name should contain only letters",
                            },
                            minLength: {
                              value: 2,
                              message: "Must be at least 2 characters",
                            },
                          })}
                        />
                        {errors.employer_last_name && (
                          <p className="Error-meg-login-register">
                            {errors.employer_last_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="emailId" className="form-label">
                          Official Email Id
                        </label>

                        <input
                          type="email"
                          disabled
                          onKeyUp={() => trigger("employer_email")}
                          className="form-control"
                          id="emailId"
                          placeholder="name@company.com"
                          {...register("employer_email", {
                            required: "Official email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$|yahoo\.com$|outlook\.com$|hotmail\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message:
                                "Please enter a valid work email address",
                            },
                          })}
                        />

                        {errors.employer_email && (
                          <p className="Error-meg-login-register">
                            {errors.employer_email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          Mobile Number
                        </label>
                        <div className="h-25">
                          <Controller
                            name="employer_phone"
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
                            render={({
                              field: { name, value, onChange, onBlur, ref },
                            }) => (
                              <div>
                                <PhoneInput
                                  value={value}
                                  country="in"
                                  disabled
                                  countryCodeEditable={false}
                                  onChange={(
                                    value,
                                    country,
                                    event,
                                    formattedValue
                                  ) => {
                                    onChange(formattedValue);
                                    trigger("employer_phone");
                                  }}
                                  onBlur={onBlur}
                                  inputProps={{
                                    name,
                                    ref,
                                  }}
                                />
                                {errors.employer_phone && (
                                  <div className="Error-meg-login-register">
                                    {errors.employer_phone.message}
                                  </div>
                                )}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label
                          htmlFor="organizationName"
                          className="form-label"
                        >
                          Organization Name
                        </label>
                        <input
                          type="text"
                          disabled={!isEditing}
                          onKeyUp={() => trigger("organization_name")}
                          className="form-control"
                          id="organizationName"
                          placeholder="Enter your organization name"
                          {...register("organization_name", {
                            required: "Organization name is required",
                            minLength: {
                              value: 2,
                              message: "Must be at least 2 characters",
                            },
                          })}
                        />
                        {errors.organization_name && (
                          <p className="Error-meg-login-register">
                            {errors.organization_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="numEmployees" className="form-label">
                          Number of Employees
                        </label>
                        <select
                          className="form-control"
                          disabled={!isEditing}
                          id="numberOfEmployees"
                          {...register("company_size", {
                            required: "Number of employees is required",
                          })}
                        >
                          <option value="">Select number of employees</option>
                          <option value="1-10">1-10</option>
                          <option value="11-50">11-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201-500">201-500</option>
                          <option value="500">500+</option>
                        </select>
                        {errors.num_employees && (
                          <p className="Error-meg-login-register">
                            {errors.num_employees.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label
                        htmlFor="organizationDescription"
                        className="form-label"
                      >
                        Organization Description
                      </label>
                      <textarea
                        onKeyUp={() => trigger("organization_description")}
                        className="form-control"
                        disabled={!isEditing}
                        id="organizationDescription"
                        rows="3"
                        placeholder="Describe your organization"
                        {...register("organization_description", {
                          required: "Organization description is required",
                          minLength: {
                            value: 10,
                            message: "Must be at least 10 characters",
                          },
                        })}
                      ></textarea>
                      {errors.organization_description && (
                        <p className="Error-meg-login-register">
                          {errors.organization_description.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row mb-1">
                    {" "}
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label
                          htmlFor="organizationCity"
                          className="form-label"
                        >
                          Organization City
                        </label>
                        <input
                          type="text"
                          disabled={!isEditing}
                          onKeyUp={() => trigger("organization_city")}
                          className="form-control"
                          id="organizationCity"
                          placeholder="Enter your organization's city"
                          {...register("organization_city", {
                            required: "Organization city is required",
                            minLength: {
                              value: 2,
                              message: "Must be at least 2 characters",
                            },
                          })}
                        />
                        {errors.organization_city && (
                          <p className="Error-meg-login-register">
                            {errors.organization_city.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="industry" className="form-label">
                          Industry
                        </label>
                        <select
                          className="form-control"
                          disabled={!isEditing}
                          id="industry"
                          {...register("industry", {
                            required: "Industry is required",
                          })}
                        >
                          <option value="">Select industry</option>
                          <option value="technology">Technology</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="finance">Finance</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="retail">Retail</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.industry && (
                          <p className="Error-meg-login-register">
                            {errors.industry.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-1">
                    {" "}
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label
                          htmlFor="organizationWebsite"
                          className="form-label"
                        >
                          Organization Website
                        </label>
                        <input
                          type="text"
                          disabled={!isEditing}
                          onKeyUp={() => trigger("organization_website")}
                          className="form-control"
                          id="organizationWebsite"
                          placeholder="Enter your organization's website"
                          {...register("organization_website", {
                            pattern: {
                              value: /^(ftp|http|https):\/\/[^ "]+$/,
                              message: "Invalid URL",
                            },
                          })}
                        />
                        {errors.organization_website && (
                          <p className="Error-meg-login-register">
                            {errors.organization_website.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label
                          htmlFor="organizationLinkedin"
                          className="form-label"
                        >
                          Organization Linkedin
                        </label>
                        <input
                          type="text"
                          disabled={!isEditing}
                          onKeyUp={() => trigger("organization_linkedin")}
                          className="form-control"
                          id="organizationLinkedin"
                          placeholder="Enter your organization's linkedin"
                          {...register("organization_linkedin", {
                            pattern: {
                              value: /^(ftp|http|https):\/\/[^ "]+$/,
                              message: "Invalid URL",
                            },
                          })}
                        />
                        {errors.organization_linkedin && (
                          <p className="Error-meg-login-register">
                            {errors.organization_linkedin.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="organizationLogo" className="form-label">
                        Organization Logo
                      </label>
                      <input
                        type="file"
                        disabled={!isEditing}
                        onKeyUp={() => trigger("organization_logo")}
                        className="form-control"
                        id="organizationLogo"
                        {...register("organization_logo", {
                          required: "Organization logo is required",
                          validate: {
                            fileSize: (file) =>
                              file[0].size <= 1048576 ||
                              "File size must be less than 1MB",
                            fileResolution: (file) => {
                              const img = new Image();
                              img.src = URL.createObjectURL(file[0]);
                              return (
                                (img.width <= 500 && img.height <= 500) ||
                                "Image resolution must be less than 500x500 pixels"
                              );
                            },
                            fileType: (file) =>
                              [
                                "image/jpeg",
                                "image/jpg",
                                "image/png",
                                "image/gif",
                                "image/bmp",
                              ].includes(file[0].type) ||
                              "File type must be JPEG, JPG, PNG, GIF, or BMP",
                          },
                        })}
                      />
                      {errors.organization_logo && (
                        <p className="Error-meg-login-register">
                          {errors.organization_logo.message}
                        </p>
                      )}
                    </div>
                  </div> */}
                </div>

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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipProfileSettings;
