import React, { useState } from "react";
import * as XLSX from "xlsx";
import "../DashboardCSS/AddBulkStudents.css";
import axios from "axios";
import { ApiURL } from "../../../../../Utils/ApiURL";

const AddBulkStudents = ({
  setshowAddBulkStudent,
  instituteName,
  clickedClassId,
}) => {
  const url = ApiURL();

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const requiredHeaders = ["Roll Number", "Name", "Email Id", "Phone Number"];

  // Convert Excel data to JSON format suitable for the API
  const convertToApiFormat = () => {
    if (!columns.length || !data.length) return [];

    return data.map((row) => {
      const student = {};
      columns.forEach((col, index) => {
        student[col] = row[index] || "";
      });
      return student;
    });
  };

  // Handle data upload to server
  const handleUploadFile = async () => {
    if (!file || !data.length) {
      setError("Please select a valid file before uploading");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Convert Excel data to JSON format
      const studentsData = convertToApiFormat();

      // Prepare the payload
      const payload = {
        instituteName: instituteName || "",
        students: studentsData,
        classId: clickedClassId,
      };
      console.log("Payload:", studentsData);
      // Make API call to backend endpoint with JSON data
      const response = await axios.post(
        // "/api/bulk-register-mentees-json",
        `${url}api/v1/faculty/bulk-register-mentees`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUploadResult(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(
        err.response?.data?.error ||
          "Failed to upload students. Please try again."
      );
      console.error("Upload error:", err);
    }
  };

  // Handle file selection
  const handleFileUpload = (e) => {
    // Reset previous states
    setError(null);
    setUploadResult(null);

    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Check if a file is selected
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    // Check file extension
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    if (!["xlsx", "xls"].includes(fileExtension)) {
      setError("Please upload an Excel file (.xlsx or .xls)");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const arrayBuffer = event.target.result;
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Check if file has data
        if (jsonData.length <= 1) {
          setError("The file doesn't contain any data");
          setColumns([]);
          setData([]);
          return;
        }

        // Separate columns and data
        const [header, ...rows] = jsonData;

        // Check if required headers are present
        const isValid = requiredHeaders.every((h) => header.includes(h));
        if (!isValid) {
          setError(
            `The file must contain the following headers: ${requiredHeaders.join(
              ", "
            )}`
          );
          setColumns([]);
          setData([]);
          return;
        }

        setError(null);
        setColumns(header);
        setData(rows);
      } catch (error) {
        setError("Error processing file. Please check the file format.");
        console.error("File processing error:", error);
      }
    };

    reader.onerror = () => {
      setError("Error reading file");
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  // Generate and download template
  const downloadTemplate = () => {
    // Create worksheet with headers
    const ws = XLSX.utils.aoa_to_sheet([requiredHeaders]);

    // Add a sample row
    XLSX.utils.sheet_add_aoa(
      ws,
      [["1", "John Doe", "john@example.com", "9000000001"]],
      { origin: -1 }
    );

    // Create workbook and add worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students Template");

    // Generate and download the file
    XLSX.writeFile(wb, "students_template.xlsx");
  };

  return (
    <div className="AddSingleStudentBackdrop">
      <div className="addbulkupload-container AddBulkStudentModal">
        <div
          className="AddSingleStudent-CloseBtn"
          onClick={() => setshowAddBulkStudent(false)}
        >
          <i className="fa-solid fa-xmark fa-lg"></i>
        </div>
        <div className="addbulkupload-card">
          <h2 className="addbulkupload-title">Import Students</h2>

          <div className="addbulkupload-upload-section">
            <div className="addbulkupload-header-row">
              <label className="addbulkupload-label">
                Please select the file to import students
              </label>
              <a
                href="#"
                onClick={downloadTemplate}
                className="addbulkupload-template-link"
              >
                Download template
              </a>
            </div>

            <div className="addbulkupload-input-row">
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".xls,.xlsx"
                className="addbulkupload-file-input"
                disabled={isLoading}
              />
              <button
                onClick={handleUploadFile}
                className="addbulkupload-submit-button"
                disabled={!file || isLoading}
              >
                {isLoading ? "Uploading..." : "Submit"}
              </button>
            </div>

            {error && <p className="addbulkupload-error">{error}</p>}
          </div>

          {/* Preview table */}
          {columns.length > 0 && !error && !uploadResult && (
            <div className="addbulkupload-table-container">
              <h3>File Preview</h3>
              <table className="addbulkupload-table">
                <thead>
                  <tr>
                    {columns.map((col, i) => (
                      <th key={i} className="addbulkupload-table-header">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i} className="addbulkupload-table-row">
                      {columns.map((_, j) => (
                        <td key={j} className="addbulkupload-table-cell">
                          {row[j] || ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Upload results */}
          {uploadResult && (
            <div className="addbulkupload-results">
              <h3>Upload Results</h3>
              <div className="addbulkupload-result-summary">
                <p className="addbulkupload-success">{uploadResult.success}</p>

                {uploadResult.registered &&
                  uploadResult.registered.length > 0 && (
                    <div className="addbulkupload-table-container">
                      <h4>Successfully Registered Students</h4>
                      <table className="addbulkupload-table">
                        <thead>
                          <tr>
                            <th>Roll Number</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Default Password</th>
                          </tr>
                        </thead>
                        <tbody>
                          {uploadResult.registered.map((student, i) => (
                            <tr key={i}>
                              <td>{student.rollNumber}</td>
                              <td>{student.name}</td>
                              <td>{student.email}</td>
                              <td>{student.password}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                {uploadResult.existingMapped &&
                  uploadResult.existingMapped.length > 0 && (
                    <div className="addbulkupload-table-container">
                      <h4>Existing Students added to Class</h4>
                      <table className="addbulkupload-table">
                        <thead>
                          <tr>
                            <th>Roll Number</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {uploadResult.existingMapped.map((student, i) => (
                            <tr key={i}>
                              <td>{student.rollNumber}</td>
                              <td>{student.name}</td>
                              <td>{student.email}</td>
                              <td>{student.action}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                {uploadResult.failed && uploadResult.failed.length > 0 && (
                  <div className="addbulkupload-table-container">
                    <h4>Failed Registrations</h4>
                    <table className="addbulkupload-table">
                      <thead>
                        <tr>
                          <th>Roll Number</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uploadResult.failed.map((student, i) => (
                          <tr key={i}>
                            <td>{student.rollNumber}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <button
                  className="addbulkupload-submit-button"
                  onClick={() => {
                    setUploadResult(null);
                    setFile(null);
                    setColumns([]);
                    setData([]);
                  }}
                >
                  Upload Another File
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBulkStudents;
