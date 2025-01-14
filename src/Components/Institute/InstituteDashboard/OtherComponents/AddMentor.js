import React from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import File from "./Template.xlsx";

const AddMentor = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [file, setfile] = useState();

  const requiredHeaders = ["S.No", "Name", "Email", "Phone Number"];
  const handleuploadfile = () => {
    console.log(file);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setfile(file);

    // Check if a file is selected
    if (!file) {
      setError("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

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
    };

    reader.onerror = () => {
      setError("Error reading file");
    };

    reader.readAsArrayBuffer(file);
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  return (
    <div className="col-lg-10 ps-0">
      <div className="container-fluid px-5">
        <div className="col-lg-8">
          <div className="gtyfdgfgf">
            <div className="csfvgdtrfs mb-4 position-relative">
              <div style={{ display: "flex", gap: "5rem" }}>
                <label
                  // htmlFor="exampleInputEmail1"
                  className="form-label"
                >
                  <b>Please select the file ...</b>
                </label>
                <label>
                  <b>
                    Click here for{" "}
                    <a href={File} download="Template.xlsx">
                      <u style={{ color: "#0255ca" }}>download template</u>{" "}
                    </a>
                  </b>
                </label>
              </div>
              <div className="gtgtgt">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".xls,.xlsx"
                  className="form-control"
                  style={{ width: "30rem" }}
                />{" "}
                <button
                  onClick={handleuploadfile}
                  className="btn juybeubrer_btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {columns.length > 0 && !error && (
              <div className="displayArea">
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      {columns.map((col, i) => (
                        <th key={i} style={thTdStyle}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} style={thTdStyle}>
                            {cell}
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
    </div>
  );
};

export default AddMentor;
