import React, { useState } from "react";
import { toast } from "react-toastify";
import "../DashboardCSS/communicationTemplate.css";

const CommunicationTemplate = () => {
  const [data, setData] =
    useState(`**Subject:** Invitation to Guest Lecture at [College Name]

Dear [Recipient's Name],

I hope this message finds you well. On behalf of [Department/Organization Name] at [College Name], I am pleased to extend an invitation to you to deliver a guest lecture to our students.

Your expertise in [Subject/Field] would greatly benefit our students, providing them with valuable insights into [specific topic or area of expertise]. We believe your experience and knowledge will inspire our students and offer them a broader understanding of the subject.

The guest lecture is tentatively scheduled for [Proposed Date and Time], and we would be honored if you could join us on this day. We are flexible with the date and time and would be happy to adjust according to your availability.

Please let us know if you would be interested in this opportunity and your availability. We would be happy to discuss further details at your convenience.

Thank you for considering our invitation. We look forward to the possibility of welcoming you to [College Name].

Warm regards,  
[Your Full Name]  
[Your Position]  
[Department Name]  
[College Name]  
[Contact Information]  
`);

  const background = {
    redbeck: { backgroundColor: "rgb(252, 193, 193)" },
    grnback: { backgroundColor: "rgb(169, 255, 193)" },
  };
  const [edit, setEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
    console.log(data);
  };
  return (
    <div class="col-lg-10 ps-0" style={{ width: "80%", textAlign: "center" }}>
      <h1 className="head-comu-temp">Communication Template</h1>
      <div className="container-fluid px-5">
        <form onSubmit={handleSubmit} className="formContainer">
          <textarea
            name="comunication_template"
            defaultValue={data}
            onChange={(e) => setData(e.target.value)}
            disabled={!edit}
          ></textarea>
          <div className="button-container">
            <button
              type="button"
              className="btn_edit"
              onClick={() => setEdit(!edit)}
              style={edit ? background.grnback : background.redbeck}
            >
              Edit:{" "}
              {edit ? (
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{ color: "rgb(0, 175, 50)", fontSize: "1.2rem" }}
                ></i>
              ) : (
                <>
                  <i
                    className="fa-solid fa-pen-to-square"
                    style={{ color: "#ff0000" }}
                  ></i>
                </>
              )}
            </button>
            {edit ? (
              <button className="btn_submit" type="submit">
                Save
              </button>
            ) : (
              <button
                type="button"
                className="btn_submit"
                onClick={() => {
                  navigator.clipboard.writeText(data);
                  toast.success("Coppied in clipboard");
                }}
              >
                <i className="fa-solid fa-copy"></i> Copy
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunicationTemplate;
