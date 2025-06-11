import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportMenteeDataToExcel = (menteeData) => {
  if (!menteeData || menteeData.length === 0) return;


  console.log("Exporting Mentee Data to Excel:", menteeData);
  const formattedData = menteeData.map((item) => ({
    "Student Roll Node.": item.mentee_roll_no,
    "Student Name": item.user_firstname + " " + item.user_lastname,
    "Student Email Id": item.user_email,
    "Student Phone No.": item.user_phone_number,
    "Score": item.mentee_result_total_score || 0,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Mentee Data");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileData = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(fileData, "Assessment_Result.xlsx");
};
