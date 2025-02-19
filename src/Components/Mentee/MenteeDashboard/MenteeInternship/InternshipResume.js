import React, { useState } from "react";

const InternshipResume = () => {
  const [resumes, setResumes] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const currentTime = new Date().toLocaleString();
      setResumes((prevResumes) => [
        ...prevResumes,
        { name: file.name, uploadTime: currentTime },
      ]);
    }
  };

  const handleRemove = (index) => {
    setResumes((prevResumes) => prevResumes.filter((_, i) => i !== index));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2
        style={{
          textAlign: "left",
          marginBottom: "10px",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Upload your recent resume or CV
      </h2>
      <p style={{ textAlign: "left", marginBottom: "20px", color: "#555" }}>
        Upload your most up-to-date resume to ensure you are presenting the
        latest version of your skills and experience.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h2
            style={{
              textAlign: "left",
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Instructions
          </h2>
          <p style={{ textAlign: "left", color: "#555", marginBottom: "20px" }}>
            Please ensure your resume is in PDF, DOC, or DOCX format. You can
            upload multiple resumes and manage them below.
          </p>
        </div>

        <div
          style={{
            flex: 1,
            textAlign: "center",
            padding: "20px",
            border: "2px dashed #ccc",
            borderRadius: "8px",
          }}
        >
          <label
            htmlFor="fileInput"
            style={{
              display: "block",
              marginBottom: "10px",
              color: "#007BFF",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Choose File
          </label>
          <input
            id="fileInput"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <p style={{ marginBottom: "10px", color: "#888" }}>
            Drag and drop your resume here, or click above to select a file.
          </p>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3
          style={{
            textAlign: "left",
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Uploaded Resumes
        </h3>
        {resumes.length > 0 ? (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            {resumes.map((resume, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{resume.name}</span>
                <span style={{ fontSize: "12px", color: "#777" }}>
                  Uploaded on: {resume.uploadTime}
                </span>
                <button
                  onClick={() => handleRemove(index)}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#FF4D4D",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#555" }}>No resumes uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default InternshipResume;
