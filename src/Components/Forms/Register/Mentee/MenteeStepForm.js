import React, { useState } from "react";
import menteeRegPage from "../../../../Images/Mentee/Group video-amico.svg";
import "./menteeregistration.css";
import "./MenteeReg.css";
import MenteeRegStep1 from "./MenteeRegStep1";
import MenteeRegStep2 from "./MenteeRegStep2";

import { useForm, FormProvider } from "react-hook-form";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ApiURL } from "../../../../Utils/ApiURL";
import { useNavigate } from "react-router-dom";
const MenteeStepForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = ApiURL();
  const [instituteStatus, setInstituteStatus] = useState(false);
  const [selectedOption, setSelectedOption] = useState("mentee");
  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.value === "institute") {
      return (
        setSelectedOption(event.target.value),
        setInstituteStatus(!instituteStatus)
      );
    } else {
      return setSelectedOption(event.target.value), setInstituteStatus(false);
    }
  };


  const methods = useForm({});
  const { reset } = useForm();
  const [step, setStep] = React.useState(1);

  const cleanPhoneNumber = (phone) => {
    return phone.replace(/\D/g, "");
  };
  const onSubmit = async (data) => {
    const cleanedData = {
      ...data,
      mentee_phone: cleanPhoneNumber(data.mentee_phone), // Clean the phone number
    };
    try {
      dispatch(showLoadingHandler());
      const res = await axios.post(`${url}api/v1/mentee/register`, {
        data: cleanedData,
        userType: selectedOption,
      });
      dispatch(hideLoadingHandler());
      if (res.data.success) {
        dispatch(hideLoadingHandler());
        toast.success(
          "You have been successfully register. Please login again."
        );
        reset();
        navigate("/login");
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <MenteeRegStep1
            selectedOption={selectedOption}
            handleChange={handleChange}
          />
        );
      case 2:
        return <MenteeRegStep2 />;
      // case 3:
      //   return <MenteeRegStep3 />;
      default:
        return <MenteeRegStep1 />;
    }
  };

  const nextStep = async () => {
    const isFormValid = await methods.trigger(); // Validate the entire form
    const isValidOTP = methods.getValues("mentee_OTPValid"); // Get OTP value
    if (isFormValid && isValidOTP) {
      // Check if the form is valid and OTP is true
      setStep(step + 1);
    } else if (!isFormValid) {
      toast.error("Please fill the form correctly.");
    } else if (!isValidOTP) {
      toast.error("Please verify your phone number.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action (form submission)
    }
  };

  return (
    <>
      <main>
        <div className="regis_background " id="menteeRegBackground">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-4 dooneed">
                <div className="iuhieiuihaw_left sticky-top">
                  <img
                    style={{ width: "22rem" }}
                    src={menteeRegPage}
                    alt="img"
                  />
                  <h4 className="mt-4 testsize">Register as a Mentee to start your Practywizard journey</h4>

                  <ul className="ps-0 mt-3">
                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">Access to thousands of Industry Mentors</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">Internships with Corporates</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">
                        Learn from real-world case studies
                        </p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">Access to Avega, AI based Case assessment tool</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">
                          <p>Hands-on Experiential Training Programs</p>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="iuhieiuihaw_right bg-white p-3">
                  {/* <div className="uherrr_text text-center">
                    <h4>Sign up</h4>
                  </div> */}
                  <>
                    {" "}
                    <FormProvider {...methods}>
                      <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        onKeyDown={handleKeyDown}
                      >
                        {renderStep()}
                        <div className="d-flex justify-content-between">
                          {step === 1 ? (
                            ""
                          ) : (
                            <button
                              type="button"
                              onClick={() => setStep(step - 1)}
                              disabled={step === 1}
                              className="btn dgheuih_btn_prev btn-main"
                            >
                              Previous
                            </button>
                          )}
                          {step === 2 ? (
                            ""
                          ) : (
                            <button
                              type="button"
                              onClick={nextStep}
                              disabled={step === 3}
                              className="btn dgheuih_btn_next btn-main"
                            >
                              Next
                            </button>
                          )}
                          {step === 2 && (
                            // <form
                            //   id="multi-step-form"
                            //   onSubmit={methods.handleSubmit(onSubmit)}
                            // >
                            <button
                              className="btn dgheuih_btn_next btn-main"
                              type="submit"
                            >
                              Submit
                            </button>
                            // </form>
                          )}
                        </div>
                      </form>
                    </FormProvider>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MenteeStepForm;
