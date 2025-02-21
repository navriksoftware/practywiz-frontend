import React, { useState } from "react";
import { toast } from "react-toastify";

const InternshipResume = ({ singleMentee, user, token }) => {
  const [resume, setResume] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const menteeId = singleMentee?.mentee_user_dtls_id;

  // TODO: Implement this function to upload the file to the server
  // const uploadFileToServer = async (file) => {
  //   try {
  //     setIsUploading(true);
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("menteeId", menteeId);

  //     const response = await fetch("/api/resume/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Upload failed");
  //     }

  //     const data = await response.json();
  //     toast.success("Resume uploaded successfully!");
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
    const file = event.target.files[0];
    if (file) {
      try {
        // await uploadFileToServer(file);
        const currentTime = new Date().toLocaleString();
        setResume({ name: file.name, uploadTime: currentTime });
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
        {resume ? (
          <div className="ir-resume-list">
            <div className="ir-resume-item">
              <div className="ir-resume-info">
                <span className="ir-resume-name">{resume.name}</span>
                <span className="ir-upload-time">
                  Uploaded on: {resume.uploadTime}
                </span>
              </div>
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
        )}
      </div>

      <style>
        {`
          .ir-container {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
          }

          .ir-main-title {
            text-align: left;
            margin-bottom: 10px;
            font-size: 1.5rem;
            font-weight: bold;
          }

          .ir-main-description {
            text-align: left;
            margin-bottom: 20px;
            color: #555;
            font-size: 1rem;
          }

          .ir-upload-section {
            display: flex;
            gap: 20px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            flex-wrap: wrap;
          }

          .ir-instructions {
            flex: 1;
            min-width: 250px;
          }

          .ir-instructions-title {
            text-align: left;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .ir-instructions-text {
            text-align: left;
            color: #555;
            margin-bottom: 20px;
          }

          .ir-upload-box {
            flex: 1;
            text-align: center;
            padding: 20px;
            border: 2px dashed #ccc;
            border-radius: 8px;
            min-width: 250px;
            transition: background-color 0.3s ease;
          }

          .ir-upload-box:hover {
            background-color: #f8f9fa;
          }

          .ir-file-label {
            display: inline-block;
            margin-bottom: 10px;
            color: #007BFF;
            text-decoration: underline;
            cursor: pointer;
            padding: 8px 16px;
            transition: color 0.3s ease;
            opacity: ${isUploading ? "0.7" : "1"};
          }

          .ir-file-label:hover {
            color: #0056b3;
          }

          .ir-file-input {
            display: none;
          }

          .ir-upload-text {
            margin-bottom: 10px;
            color: #888;
          }

          .ir-resume-list-container {
            margin-top: 20px;
          }

          .ir-resume-list-title {
            text-align: left;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .ir-resume-list {
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
          }

          .ir-resume-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 4px;
          }

          .ir-resume-info {
            display: flex;
            flex-direction: column;
            gap: 5px;
            flex: 1;
            min-width: 200px;
          }

          .ir-resume-name {
            font-weight: 500;
            word-break: break-all;
          }

          .ir-upload-time {
            font-size: 12px;
            color: #777;
          }

          .ir-remove-button {
            margin-left: 10px;
            padding: 8px 16px;
            background-color: #FF4D4D;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            white-space: nowrap;
          }

          .ir-remove-button:hover {
            background-color: #ff3333;
          }

          .ir-remove-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .ir-no-resumes {
            color: #555;
            text-align: center;
            padding: 20px;
          }

          @media screen and (max-width: 768px) {
            .ir-container {
              padding: 15px;
            }

            .ir-upload-section {
              flex-direction: column;
              gap: 15px;
            }

            .ir-instructions, .ir-upload-box {
              flex: none;
              width: 100%;
            }

            .ir-main-title {
              font-size: 1.25rem;
            }

            .ir-instructions-title {
              font-size: 18px;
            }
          }

          @media screen and (max-width: 480px) {
            .ir-container {
              padding: 10px;
            }

            .ir-resume-item {
              flex-direction: column;
              align-items: flex-start;
            }

            .ir-remove-button {
              margin-left: 0;
              width: 100%;
              text-align: center;
            }

            .ir-upload-time {
              font-size: 11px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default InternshipResume;
