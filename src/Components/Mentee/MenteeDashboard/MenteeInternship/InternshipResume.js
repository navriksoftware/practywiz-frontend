// LAKSHAY WORK TO DO

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./InternshipResume.css";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";

const InternshipResume = ({ singleMentee, user, token }) => {
  const [resume, setResume] = useState(null);
  const [dbResume, setDbResume] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResumeStatus, setUploadResumeStatus] = useState(false);
  const menteeId = singleMentee?.mentee_dtls_id;
  const { user_id } = user;
  const url = ApiURL();

  // useEffect(() => {
  //   function getValueAfterHyphen(str) {
  //     const index = str.indexOf("-");
  //     if (index === -1) return null; // no hyphen found
  //     return str.slice(index + 1).trim();
  //   }
  //   const fetchResume = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${url}api/v1/mentee/dashboard/resume/download`,
  //         { params: { user_id } }
  //       );
  //       const resumeUrl = res.data.url;

  //       if (res) {
  //         const resumeName = getValueAfterHyphen(resumeUrl);
  //         setDbResume(true);
  //         setResume({ url: res.data.url, name: resumeName });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchResume();
  // }),
  //   [setResume, setUploadResumeStatus];

  useEffect(() => {
    function getValueAfterHyphen(str) {
      const index = str.indexOf("-");
      if (index === -1) return null;
      return str.slice(index + 1).trim();
    }

    const fetchResume = async () => {
      try {
        const res = await axios.get(
          `${url}api/v1/mentee/dashboard/resume/download`,
          { params: { user_id } }
        );
        const resumeUrl = res.data.url;

        if (res) {
          const resumeName = getValueAfterHyphen(resumeUrl);
          setDbResume(true);
          setResume({ url: res.data.url, name: resumeName });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchResume();
  }, [uploadResumeStatus, user_id]);

  // TODO: Implement this function to upload the file to the server
  const uploadFileToServer = async (file) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("menteeId", menteeId);

      const response = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });
      console.log("line 49");
      if (!response.status == 200) {
        throw new Error("Upload failed");
      }
      console.log("line 53");
      const data = await response.json();
      console.log(data);
      toast.success("Resume uploaded successfully!");
      return data;
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload resume. Please try again.");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };
  // const getMenteeResume = async () => {
  //   try {
  //     setIsUploading(true);

  //     const response = await get("/api/resume/upload", {
  //       method: "get",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Upload failed");
  //     }

  //     const data = await response.json();
  //     toast.success("Resume Downloaded successfully!");
  //     return data;
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //     toast.error("Failed to upload resume. Please try again.");
  //     throw error;
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  const handleFileChange = async (event) => {
    setDbResume(null);
    const file = event.target.files[0];

    if (file) {
      try {
        const uploadTime = new Date().toLocaleString();
        const name = file.name;
        setResume({ file, name, uploadTime });
      } catch (error) {
        // Error already handled by uploadFileToServer
        setResume(null);
      }
    }
  };

  const handleRemove = async () => {
    try {
      //TODO: add an API call here to remove the file from the server
      setResume(null);
      toast.success("Resume removed successfully!");
    } catch (error) {
      toast.error("Failed to remove resume. Please try again.");
    }
  };

  const handleUpload = async () => {
    if (!resume) {
      toast.error("Please select a file first.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", resume.file);
      formData.append("name", resume.name);
      formData.append("uploadTime", resume.uploadTime);
      formData.append("id", user_id);

      const res = await axios.post(
        `${url}api/v1/mentee/dashboard/resume/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res) {
        toast.success("Resume Uploaded successfully");
        setUploadResumeStatus(!uploadResumeStatus);
      }
    } catch (error) {
      toast.error("Failed to Upload resume. Please try again.");
      setUploadResumeStatus(false);
    }
  };

  const handleDownload = () => {
    try {
      window.open(resume.url, "_blank", "noopener,noreferrer");
      toast.success("Resume downnloaded successfully");
    } catch (error) {
      toast.error("Failed to download resume. Please try again.");
    }
  };
  return (
    <div className="ir-container">
      <h2 className="ir-main-title">Upload your recent resume or CV</h2>
      <p className="ir-main-description">
        Upload your most up-to-date resume. Any new upload will replace the
        previously uploaded resume.
      </p>

      <div className="ir-upload-section">
        <div className="ir-instructions">
          <h2 className="ir-instructions-title">Instructions</h2>
          <p className="ir-instructions-text">
            Please ensure your resume is in PDF, DOC, or DOCX format. Only one
            resume can be active at a time - uploading a new resume will replace
            the existing one.
          </p>
        </div>

        <div className="ir-upload-box">
          <label htmlFor="fileInput" className="ir-file-label">
            {isUploading ? "Uploading..." : "Choose File"}
          </label>
          <input
            id="fileInput"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="ir-file-input"
            disabled={isUploading}
          />
          <p className="ir-upload-text">
            Drag and drop your resume here, or click above to select a file.
          </p>
        </div>
      </div>

      <div className="ir-resume-list-container">
        <h3 className="ir-resume-list-title">Current Resume</h3>
        {
          dbResume ? (
            <div className="ir-resume-list">
              <div className="ir-resume-item">
                <div className="ir-resume-info">
                  <span className="ir-resume-name">{resume.name}</span>
                  <span className="ir-upload-time">
                    {/* Uploaded on: {resume.uploadTime} */}
                  </span>
                </div>
                <a
                  href={isUploading ? undefined : resume.url}
                  onClick={(e) => {
                    if (isUploading) {
                      e.preventDefault(); // block click
                      return;
                    }
                    e.preventDefault();
                    handleDownload();
                  }}
                  className={`ir-upload-button ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  View
                </a>
              </div>
            </div>
          ) : resume ? (
            <div className="ir-resume-list">
              <div className="ir-resume-item">
                <div className="ir-resume-info">
                  <span className="ir-resume-name">{resume.name}</span>
                  <span className="ir-upload-time">
                    Uploaded on: {resume.uploadTime}
                  </span>
                </div>
                <button
                  onClick={handleUpload}
                  className="ir-upload-button"
                  disabled={isUploading}
                >
                  Upload
                </button>
                <button
                  onClick={handleRemove}
                  className="ir-remove-button"
                  disabled={isUploading}
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <p className="ir-no-resumes">No resume uploaded yet.</p>
          )

          // resume ? (
          //   <div className="ir-resume-list">
          //     <div className="ir-resume-item">
          //       <div className="ir-resume-info">
          //         <span className="ir-resume-name">{resume.name}</span>
          //         <span className="ir-upload-time">
          //           Uploaded on: {resume.uploadTime}
          //         </span>
          //       </div>
          //       <button
          //         onClick={handleUpload}
          //         className="ir-upload-button"
          //         disabled={isUploading}
          //       >
          //         Upload
          //       </button>
          //       <button
          //         onClick={handleRemove}
          //         className="ir-remove-button"
          //         disabled={isUploading}
          //       >
          //         Remove
          //       </button>
          //     </div>
          //   </div>
          // ) : (
          //   <p className="ir-no-resumes">No resume uploaded yet.</p>
          // )
        }
      </div>

      {/* <p className="ir-resumes-uploaded">Resume Uploaded successfully</p> */}
    </div>
  );
};

export default InternshipResume;
