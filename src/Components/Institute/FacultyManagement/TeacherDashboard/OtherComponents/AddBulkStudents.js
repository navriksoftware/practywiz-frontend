import React, { useState } from "react";
import * as XLSX from "xlsx";
import "../DashboardCSS/AddBulkStudents.css";

const AddBulkStudents = ({setshowAddBulkStudent}) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const requiredHeaders = ["Roll Number", "Name", "Email Id", "Phone Number"];

  const handleUploadFile = () => {
    if (!file) {
      setError("Please select a file before uploading");
      return;
    }
    // Here you would typically send the file/data to your backend
    console.log("Uploading file:", file);
    console.log("Data to be uploaded:", data);
    // Add your API call here
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Check if a file is selected
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    // Check file extension
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls'].includes(fileExtension)) {
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

  return (
    <div className="AddSingleStudentBackdrop">
    <div className="addbulkupload-container AddBulkStudentModal">
       <div className="AddSingleStudent-CloseBtn" onClick={() => setshowAddBulkStudent(false)}><i className="fa-solid fa-xmark fa-lg"></i></div>
      <div className="addbulkupload-card">
        <h2 className="addbulkupload-title">Import Students</h2>
        
        <div className="addbulkupload-upload-section">
          <div className="addbulkupload-header-row">
            <label className="addbulkupload-label">
              Please select the file to import students
            </label>
            <a href="#" className="addbulkupload-template-link">
              Download template
            </a>
          </div>
          
          <div className="addbulkupload-input-row">
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".xls,.xlsx"
              className="addbulkupload-file-input"
            />
            <button
              onClick={handleUploadFile}
              className="addbulkupload-submit-button"
            >
              Submit
            </button>
          </div>
          
          {error && <p className="addbulkupload-error">{error}</p>}
        </div>

        {columns.length > 0 && !error && (
          <div className="addbulkupload-table-container">
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
      </div>
    </div>
    </div>
  );
};

export default AddBulkStudents;