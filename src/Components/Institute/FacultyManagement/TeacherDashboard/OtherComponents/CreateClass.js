import React, { useState, useEffect } from "react";
import "../DashboardCSS/CreateClass.css";
import axios from "axios";
import { ApiURL } from "../../../../../Utils/ApiURL";
import { toast } from "react-toastify";

const CreateClass = ({
  userdata,
  setActivePage,
  setShowCreateclassform,
  classid,
  allClassData,
}) => {
  const url = ApiURL();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const [classDetails, setClassDetails] = useState([]);

  const [formData, setFormData] = useState({
    Name: "",
    SubjectCode: "",
    SubjectName: "",
    SemesterEnd: "",
    facultyId: userdata[0]?.faculty_dtls_id || "",
  });

  useEffect(() => {
    if (classid) {
      const fetchClassDetails = async () => {
        try {
          const response = await Promise.race([
            axios.post(`${url}api/v1/faculty/class/singledetail`, {
              singleClassId: classid,
            }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000)
            ),
          ]);

          if (response.data.success) {
            setClassDetails(response.data.success);

            const classData = response.data.success[0];
            setFormData({
              Name: classData?.class_name || "",
              SubjectCode: classData?.class_subject_code || "",
              SubjectName: classData?.class_subject || "",
              SemesterEnd: classData?.class_sem_end_date
                ? new Date(classData.class_sem_end_date)
                    .toISOString()
                    .split("T")[0]
                : "",
              facultyId: userdata[0]?.faculty_dtls_id || "",
            });
          } else {
            setClassDetails([]);
          }
        } catch (error) {
          console.error(
            error.message === "Request timed out"
              ? "Request timed out. Please try again."
              : "An error occurred. Please try again."
          );
          setClassDetails([]);
        }
      };

      fetchClassDetails();
    }
  }, [url, classid, userdata]);

  const handleInputChange = (e, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const isFormValid = (data) => {
    return (
      data.Name?.trim() &&
      data.SemesterEnd?.trim() &&
      data.SubjectCode?.trim() &&
      data.SubjectName?.trim() &&
      data.facultyId !== undefined &&
      data.facultyId !== null
    );
  };

  const handleNameValidation = () => {
    const trimmedName = formData.Name.trim().toLowerCase();
    return allClassData?.some(
      (item) => item?.class_name?.trim().toLowerCase() === trimmedName
    );
  };

  const handleValidationUpdate = () => {
    const trimmedName = formData.Name.trim().toLowerCase();
    return allClassData?.some((item) => {
      return (
        item?.class_name?.trim().toLowerCase() === trimmedName &&
        item?.class_id !== classid
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleNameValidation()) {
      try {
        setIsSubmitting(true);

        const response = await axios.post(
          `${url}api/v1/faculty/createClass`,
          formData
        );

        if (response.status === 200) {
          toast.success("Class created successfully!");
          setShowCreateclassform(false);
        } else {
          toast.error("Failed to create class. Please try again.");
        }
      } catch (error) {
        console.error("Error creating class:", error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error("This class name already exists!");
    }
  };

  const handleUpdateClassDetails = async () => {
    if (!handleValidationUpdate()) {
      if (isFormValid(formData)) {
        setIsSubmitting(true);
        try {
          const response = await Promise.race([
            axios.post(`${url}api/v1/faculty/class/singledetail-Update`, {
              singleClassId: classid,
              formData,
            }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000)
            ),
          ]);

          if (response.data && response.data.success) {
            setShowCreateclassform(false);
            toast.success("Class details updated successfully!");
          } else {
            toast.error("Failed to update class details. Please try again.");
          }
        } catch (error) {
          console.error(
            error.message === "Request timed out"
              ? "Request timed out. Please try again."
              : "An error occurred. Please try again."
          );
        } finally {
          setIsSubmitting(false);
        }
      } else {
        toast.error("Please fill all the fields correctly.");
      }
    } else {
      toast.error("This class name already exists!");
    }
  };

  return (
    <div className="CreateClass-modal-overlay">
      <div className="CreateClass-modal-container">
        <div className="CreateClass-modal-content">
          <div className="CreateClass-header">
            {classid !== "" ? <h2>Update Class</h2> : <h2>Create Class</h2>}
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
                  onChange={(e) => handleInputChange(e, "Name")}
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
                    onChange={(e) => handleInputChange(e, "SubjectCode")}
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
                    onChange={(e) => handleInputChange(e, "SubjectName")}
                    className="CreateClass-form-input"
                    required
                  />
                </div>
              </div>

              <div className="CreateClass-form-field">
                <label htmlFor="SemesterEnd">Semester End Date *</label>
                <input
                  type="date"
                  id="SemesterEnd"
                  min={today}
                  value={formData.SemesterEnd}
                  onChange={(e) => handleInputChange(e, "SemesterEnd")}
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
              {classid !== "" ? (
                <button
                  type="button"
                  onClick={handleUpdateClassDetails}
                  disabled={isSubmitting}
                  className={`CreateClass-button-create ${
                    isSubmitting ? "btn-disabled" : ""
                  }`}
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`CreateClass-button-create ${
                    isSubmitting ? "btn-disabled" : ""
                  }`}
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClass;
