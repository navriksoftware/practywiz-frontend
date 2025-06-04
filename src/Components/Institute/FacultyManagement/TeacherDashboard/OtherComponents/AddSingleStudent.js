import React, { useState } from 'react';
import '../DashboardCSS/AddSingleStudent.css';
import axios from "axios";
import { ApiURL } from "../../../../../Utils/ApiURL";
import { toast } from 'react-toastify';

const AddSingleStudent = ({ setshowAddSingleform, instituteName, clickedClassId }) => {

const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState(null);
  const url = ApiURL();
  const [formData, setFormData] = useState({
    rollNumber: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     setIsSubmitting(true); // Start loading
    console.log('Form submitted:', formData);

    const dataToSend = {
      "Email Id": formData.emailAddress,
      "Name": `${formData.firstName} ${formData.lastName}`,
      "Phone Number": formData.phoneNumber,
      "Roll Number": formData.rollNumber,
    };

    const payload = {
      instituteName: instituteName || "",
      students: [dataToSend],
      classId: clickedClassId,
    };

    try {
     
      setError(null);

      const response = await axios.post(
        `${url}api/v1/faculty/bulk-register-mentees`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      if (Array.isArray(result.failed) && result.failed.length > 0) {
        toast.error(`Failed to register.Reason:${result.failed[0].reason}`);
      }

      if (Array.isArray(result.registered) && result.registered.length > 0) {
        toast.success(`Student registered successfully.`);
        setshowAddSingleform(false);
      }

    } catch (err) {
      toast.error("Failed to add student. Please try again.");
      setError(
        err.response?.data?.error ||
        "Failed to upload students. Please try again."
      );
      console.error("Upload error:", err);
    } finally {
     setIsSubmitting(false); // Stop loading
      setshowAddSingleform(false);
    }
  };


  return (
    <>
      <div className="AddSingleStudentBackdrop" onClick={() => setshowAddSingleform(false)}></div>
      <div className="AddSingleStudentModal">
        <div className="AddSingleStudent-CloseBtn" onClick={() => setshowAddSingleform(false)}><i className="fa-solid fa-xmark fa-lg"></i></div>
        <div className="AddSingleStudentHeader">

          <h2>Fill Student Information</h2>
          {/* <p>Please fill in your details below</p> */}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="AddSingleStudentFormField">
            <label htmlFor="rollNumber">Roll Number *</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              placeholder="Enter your roll number"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="AddSingleStudentFormRow">
            <div className="AddSingleStudentFormField">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="AddSingleStudentFormField">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="AddSingleStudentFormField">
            <label htmlFor="phoneNumber">Phone Number *</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="+1 (000) xxx-xxxx"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="AddSingleStudentFormField">
            <label htmlFor="emailAddress">Email Address *</label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              placeholder="Enter your email address"
              value={formData.emailAddress}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit"  disabled={isSubmitting}   className={`submit-btn-AddSingleStudentSubmitButton ${isSubmitting ? "btn-disabled" : ""}`}>
           {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddSingleStudent;