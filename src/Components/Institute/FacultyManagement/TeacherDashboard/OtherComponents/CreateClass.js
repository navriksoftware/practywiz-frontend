import React, { useState } from 'react';
import '../DashboardCSS/CreateClass.css';

const CreateClass = ({ setShowCreateclassform }) => {
  const [formData, setFormData] = useState({
    Name: '',
    SubjectCode: '',
    SubjectName: '',
    SemisterEnd: '',
    emailAddress: ''
  });

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="CreateClass-modal-overlay">
      <div className="CreateClass-modal-container">
        <div className="CreateClass-modal-content">
          <div className="CreateClass-header">
            <h2>Create class</h2>
            <p>Please fill in your details below</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="CreateClass-form-fields">
              <div className="CreateClass-form-field">
                <label htmlFor="Name">Class Name *</label>
                <input
                  type="text"
                  id="Name"
                  placeholder="Enter Class Name"
                  value={formData.Name}
                  onChange={(e) => handleInputChange(e, 'Name')}
                  className="CreateClass-form-input"
                  required
                />
              </div>

              <div className="CreateClass-form-row">
                <div className="CreateClass-form-field">
                  <label htmlFor="SubjectCode">Subject Code *</label>
                  <input
                    type="text"
                    id="SubjectCode"
                    placeholder="Enter Subject Code"
                    value={formData.SubjectCode}
                    onChange={(e) => handleInputChange(e, 'SubjectCode')}
                    className="CreateClass-form-input"
                    required
                  />
                </div>

                <div className="CreateClass-form-field">
                  <label htmlFor="SubjectName">Subject Name *</label>
                  <input
                    type="text" 
                    id="SubjectName"
                    placeholder="Enter Subject Name"
                    value={formData.SubjectName}
                    onChange={(e) => handleInputChange(e, 'SubjectName')}
                    className="CreateClass-form-input"
                    required
                  />
                </div>
              </div>

              <div className="CreateClass-form-field">
                <label htmlFor="SemisterEnd">Semister end on *</label>
                <input
                  type="Date"
                  id="SemisterEnd"
                  value={formData.SemisterEnd}
                  onChange={(e) => handleInputChange(e, 'SemisterEnd')}
                  className="CreateClass-form-input"
                  required
                />
              </div>

            </div>
            
            <div className="CreateClass-form-actions">
              <button
                type="button"
                onClick={() => setShowCreateclassform(false)}
                className="CreateClass-button-cancel"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="CreateClass-button-create"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClass;