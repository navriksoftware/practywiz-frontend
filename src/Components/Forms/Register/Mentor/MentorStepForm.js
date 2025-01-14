import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import MentorForm1 from "./MentorForm1";
import MentorForm2 from "./MentorForm2";
import MentorForm3 from "./MentorForm3";
import MentorForm4 from "./MentorForm4";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";

const MentorStepForm = () => {
  const navigate = useNavigate();

  const url = ApiURL();
  const methods = useForm({});
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
  });
  const [page, setPage] = useState(0);
  const { trigger, getValues } = methods;

  const FormTitles = [
    "ABOUT YOURSELF",
    "YOUR SUPER POWER",
    "AVAILABILITY",
    "PREFERENCES",
  ];
  const saveStepDataToServer = async (data) => {
    setUserData((prevData) => ({
      ...prevData, // Spread the previous data
      firstname: data.mentor_firstname,
      lastname: data.mentor_lastname,
    }));
    // try {
    //   await axios.post('/saveStepData', data);
    //   console.log('Step data saved:', data);
    // } catch (error) {
    //   console.error('Error saving step data:', error);
    // }
  };

  const [step, setStep] = useState(1);
  const PageDisplay = () => {
    if (page === 0) {
      return (
        <MentorForm1
          saveStepData={saveStepDataToServer}
          userData={userData}
          setUserData={setUserData}
        />
      );
    } else if (page === 1) {
      return <MentorForm2 />;
    } else if (page === 2) {
      return <MentorForm3 />;
    } else {
      return <MentorForm4 />;
    }
  };

  const setPageCount = () => {
    if (page === 0) {
      setPage((currPage) => currPage + 1);
    } else if (page === 1) {
      setPage((currPage) => currPage + 1);
    } else if (page === 2) {
      setPage((currPage) => currPage + 1);
    } else if (page === 3) {
      setPage((currPage) => currPage + 1);
    }
  };
  const tab1 = () => {
    setPage(0);
  };
  const tab2 = () => {
    setPage(1);
  };
  const tab3 = () => {
    setPage(2);
  };
  const tab4 = () => {
    setPage(3);
  };
  const validateAvailabilityStep = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // Adjust according to your days of the week setup
    const values = getValues();
    // Check if any day has time slots
    for (let day of days) {
      const slots = values[day];
      if (slots && slots.length > 0) {
        return true; // Valid if at least one time slot exists
      }
    }

    return false; // Invalid if no time slots exist
  };

  const nextStep = async () => {
    if (page === 1) {
      const result = await trigger(); // Validate form data
      if (result) {
        const specificValue = getValues("ForSkillValidation"); // Get value of the 'name' field
        // console.log(specificValue);
        if (specificValue !== "ok") {
          // toast.error(
          //   "Please fill out all required fields: Core Skill, Sub-option, and Area of Expertise. Don't forget to save your changes using the 'Save' button."
          // );

          toast.error(
            "Please fill out all required fields: Core Skill, Sub-option, and Area of Expertise. Don't forget to save your changes using the 'Save' button.",
            {
              position: "top-right", // Directly specifying the position
            }
          );

          return;
        }
        if (specificValue === "ok") {
          setPageCount();
          setStep((prev) => prev + 1);
        }
      }
    }

    if (page === 2) {
      const isValid = await validateAvailabilityStep();
      if (!isValid) {
        toast.error("Please add at least one time slot before proceeding.", {
          position: "top-right", // Directly specifying the position
        });
        return;
      }
      setPageCount();
      setStep((prev) => prev + 1);
    }

    if (page === 0) {
      const result = await trigger(); // Validate form data
      if (result) {
        setPageCount();
        setStep((prev) => prev + 1);
      }

      // console.log(Fname, Lname, gmail, phone);
    }
  };
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    if (step < 4) {
      const isValid = await trigger(); // Validate current step
      if (isValid) {
        toast.error("Please fill all required fields!");
      }
    } else {
      try {
        const newData = new FormData();
        newData.append("firstName", data.mentor_firstname);
        newData.append("lastName", data.mentor_lastname);
        newData.append("email", data.mentor_email);
        newData.append("image", data.linkedin_photo[0]);
        newData.append("UserType", "mentor");
        newData.append("phoneNumber", data.mentor_phone_number);
        newData.append("password", data.mentor_password);
        newData.append("Cpassword", data.mentor_confirm_password);
        newData.append("sociallink", data.social_media_profile);
        newData.append("jobtitle", data.mentor_job_title);
        newData.append("experience", data.years_of_experience);
        newData.append("companyName", data.mentor_company_name);
        newData.append(
          "passionateAbout",
          JSON.stringify(data.passionate_about)
        );
        newData.append(
          "AreaOfexpertise",
          JSON.stringify(data.Core_Skills.expertise)
        );
        newData.append("Mentor_Domain", data.Mentor_Domain);
        newData.append("academicQualification", data.academic_qualification);
        newData.append("areaofmentorship", data.recommended_area_of_mentorship);
        newData.append("headline", data.mentor_Headline);
        newData.append("lecturesInterest", data.guest_lectures_interest);
        newData.append("caseInterest", data.curating_case_studies_interest);
        newData.append("freeCharge", data.sessions_free_of_charge);
        newData.append("Timezone", data.mentor_timezone);
        newData.append("Language", data.mentor_language);
        newData.append("Country", data.mentor_country);
        newData.append("City", data.mentor_city);
        newData.append("Currency", data.Mentor_Currency);
        newData.append("Pricing", data.pricing);
        newData.append("Institute", data.mentor_InstituteName);
        newData.append("Mon", JSON.stringify(data.Mon));
        newData.append("Tue", JSON.stringify(data.Tue));
        newData.append("Wed", JSON.stringify(data.Wed));
        newData.append("Thu", JSON.stringify(data.Thu));
        newData.append("Fri", JSON.stringify(data.Fri));
        newData.append("Sat", JSON.stringify(data.Sat));
        newData.append("Sun", JSON.stringify(data.Sun));
        newData.append("linkedinSign", data.linkedinSign);
        newData.append("linkedinPhotoUrl", data.linkedinPhotoUrl);
        dispatch(showLoadingHandler());
        const res = await Promise.race([
          axios.post(`${url}api/v1/mentor/register`, newData),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        dispatch(hideLoadingHandler());
        if (res.data.success) {
          return (
            toast.success("Thank you for applying for the mentor application."),
            navigate("/login")
          );
        } else if (res.data.error) {
          toast.error(
            "There is some error while applying for the mentor application."
          );
        }
      } catch (error) {
        if (error.message === "Request timed out") {
          toast.error("Request timed out. Please try again.");
        } else {
          toast.error(
            "There is some error while applying for the mentor application. We will get back to you via email."
          );
        }
      } finally {
        dispatch(hideLoadingHandler());
      }
    }
  };
  const nextbtn = () => {
    nextStep();
  };
  return (
    <main>
      <div className="regis_background" id="mentorRegisterBg">
        <div className="col-lg-12 "></div>
        <div className="jdoieoir_wrapper">
          <div className="idneihrrr p-3 jhjhjujh">
            <h5 className="mb-0">
              Hi, Let's Get You On-boarded. It Will Take Approx. 4 Mins For
              Sign-up And Total 8 For Complete Profile
            </h5>
          </div>
          <div className="csfvgdtrfs cihseriniewr mb-4 position-relative">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label mb-2 mt-3"
            >
              <b>I Want To Register As</b>
            </label>
            <br />
            <input
              type="radio"
              id="rdo1"
              className="radio-input"
              name="apple"
              value="mentor"
              checked
              // {...register("user_type", {
              //   required: "select this button",
              // })}
            />
            <label htmlFor="rdo1" className="radio-label me-2">
              <span className="radio-border"></span>
              <i
                className="fa-solid fa-user-tie me-1"
                style={{ color: "#1B759A" }}
              ></i>
              Mentor
            </label>
            <input
              type="radio"
              id="rdo1"
              className="radio-input radio-label "
              name="apple"
              value="mentor"
              // {...register("user_type", {
              //   required: "select this button",
              // })}
            />
            <Link to="/mentee-registration" target="_blank">
              {" "}
              <label
                htmlFor="rdo2"
                className="radio-label me-2"
                id="menteeRegistrationlink"
                style={{ paddingLeft: "30px" }}
              >
                <span className="radio-border"></span>
                <i
                  className="fa-solid fa-graduation-cap me-1"
                  style={{ color: "#1B759A" }}
                ></i>
                Mentee
              </label>
            </Link>
            {/* <input
              type="radio"
              id="rdo1"
              className="radio-input radio-label "
              name="apple"
              value="mentor"
              // {...register("user_type", {
              //   required: "select this button",
              // })}
            />
            <Link to="/mentee-registration" target="_blank">
              {" "}
              <label
                htmlFor="rdo2"
                className="radio-label me-2"
                id="menteeRegistrationlink"
                style={{ paddingLeft: "30px" }}
              >
                <span className="radio-border"></span>
                <i
                  className="fa-solid fa-briefcase me-1"
                  style={{ color: "#1B759A" }}
                ></i>
                Job Seeker
              </label>
            </Link> */}
            <input
              type="radio"
              id="rdo1"
              className="radio-input radio-label "
              name="apple"
              value="mentor"
              // {...register("user_type", {
              //   required: "select this button",
              // })}
            />
            <Link to="/institute-registration" target="_blank">
              {" "}
              <label
                htmlFor="rdo2"
                className="radio-label me-2"
                id="menteeRegistrationlink"
                style={{ paddingLeft: "30px" }}
              >
                <span className="radio-border"></span>
                <i
                  className="fa-solid fa-building-columns me-1"
                  style={{ color: "#1B759A" }}
                ></i>
                Institute
              </label>
            </Link>
            {/* {errors.user_type && (
                <p className="Error-meg-login-register">
                  {errors.user_type.message}
                </p>
              )} */}
          </div>
          <div
            id="tabs"
            className="d-flex justify-content-between align-items-center mb-4"
          >
            {page === 0 ? (
              <button
                className="btn btn-primary tablinks active"
                data-tab="form1"
              >
                <i className="fa-solid me-1 fa-user"></i> ABOUT YOURSELF
              </button>
            ) : (
              <button
                className="btn btn-primary tablinks "
                data-tab="form1"
                onClick={tab1}
              >
                <i className="fa-solid me-1 fa-user"></i> ABOUT YOURSELF
              </button>
            )}
            {page === 1 ? (
              <button
                className="btn btn-primary tablinks active"
                data-tab="form2"
              >
                <i className="fa-solid me-1 fa-bolt"></i> YOUR SUPER POWER
              </button>
            ) : (
              <button
                className="btn btn-primary tablinks "
                data-tab="form2"
                onClick={tab2}
              >
                <i className="fa-solid me-1 fa-bolt"></i> YOUR SUPER POWER
              </button>
            )}
            {page === 2 ? (
              <button
                className="btn btn-primary tablinks active"
                data-tab="form3"
              >
                <i class="fa-solid fa-calendar-check"></i> AVAILABILITY
              </button>
            ) : (
              <button
                className="btn btn-primary tablinks "
                data-tab="form3"
                onClick={tab3}
              >
                <i className="fa-solid fa-calendar-check"></i> AVAILABILITY
              </button>
            )}
            {page === 3 ? (
              <button
                className="btn btn-primary tablinks active"
                data-tab="form3"
              >
                <i className="fa-solid me-1 fa-asterisk"></i> PREFERENCES
              </button>
            ) : (
              <button
                className="btn btn-primary tablinks "
                data-tab="form3"
                onClick={tab4}
              >
                <i className="fa-solid me-1 fa-asterisk"></i> PREFERENCES
              </button>
            )}
          </div>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <div id="form1" className="tab active">
                {PageDisplay()}
                <div className="bjuerirr_btn diuher d-flex justify-content-between mt-4">
                  {page === 0 ? (
                    ""
                  ) : (
                    <div className="bjuerirr_btn diuher d-flex mt-4">
                      <button
                        type="button"
                        className="btn iudhehrnbeer_btn btn-primary"
                        disabled={page === 0}
                        onClick={() => {
                          setPage((currPage) => currPage - 1);
                        }}
                      >
                        <i className="fa-solid me-2 fa-left-long"></i> Previous
                      </button>
                    </div>
                  )}
                  {page === FormTitles.length - 1 ? (
                    <div className="bjuerirr_btn diuher d-flex mt-4">
                      <button
                        type="submit"
                        className="btn juybeubrer_btn btn-primary"
                        onSubmit={methods.handleSubmit(onSubmit)}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div className="bjuerirr_btn diuher d-flex mt-4">
                      <button
                        type="button"
                        className="btn juybeubrer_btn btn-primary"
                        onClick={nextbtn}
                      >
                        Next Step
                        <i className="fa-solid ms-2 fa-right-long"></i>
                      </button>
                    </div>
                  )}
                </div>
                {/*Next button  */}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
};

export default MentorStepForm;
