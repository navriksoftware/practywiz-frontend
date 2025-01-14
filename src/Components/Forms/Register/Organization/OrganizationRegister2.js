import React from "react";
import { Controller, useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";

const OrganizationRegistration = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <div className="regis_background " id="menteeRegBackground">
      {/* <div className="step" id="TODO">
        <h4 className="text-center">
          <img src="images/icons8-account-96.webp" alt="" className="me-1" />
          Organization Details
        </h4>
      </div> */}
      <div
        className="iuhieiuihaw_right bg-white p-3 col-lg-6"
        id="test"
        style={{ margin: "auto" }}
      >
        <div className="container">
          <div className="step" id="TODO">
            <h4 className="text-center">
              <img
                src="images/icons8-account-96.webp"
                alt=""
                className="me-1"
              />
              Organization Details
            </h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form_wrapper mt-3">
              <div className="row">
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="organizationName" className="form-label">
                      Organization Name
                    </label>
                    <input
                      type="text"
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

                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="industry" className="form-label">
                      Industry
                    </label>
                    <select
                      className="form-control"
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

                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="organizationCity" className="form-label">
                      Organization Location
                    </label>
                    <input
                      type="text"
                      onKeyUp={() => trigger("organization_location")}
                      className="form-control"
                      id="organizationCity"
                      placeholder="Enter your organization's city"
                      {...register("organization_location", {
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
                    <label htmlFor="numEmployees" className="form-label">
                      Number of Employees
                    </label>
                    <select
                      className="form-control"
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

                {/* <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="organizationLogo" className="form-label">
                      Organization Logo
                    </label>
                    <input
                      type="file"
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
            </div>

            <div className="d-flex justify-content-between pt-3">
              <button type="submit" className="btn btn_next btn-main">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationRegistration;
