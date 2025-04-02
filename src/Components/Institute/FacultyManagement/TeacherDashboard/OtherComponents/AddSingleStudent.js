import React, { useState } from 'react';
import '../DashboardCSS/AddSingleStudent.css';

const AddSingleStudent = ({ setshowAddSingleform }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
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

          <button type="submit" className="AddSingleStudentSubmitButton">
            Submit Information
          </button>
        </form>
      </div>
    </>
  );
};

export default AddSingleStudent;