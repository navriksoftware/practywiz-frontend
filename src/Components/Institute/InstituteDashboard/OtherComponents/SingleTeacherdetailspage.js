import { useState,useEffect } from "react"
import "../DashboardCSS/TeacherDetailslistings.css"
import { ApiURL } from "../../../../Utils/ApiURL.js";
import axios from "axios";

const SingleTeacherdetailspage = ({ childData }) => {
  const [caseStudyTitle, setCaseStudyTitle] = useState("")
  const [subjectArea, setSubjectArea] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priorityLevel, setPriorityLevel] = useState("")
  console.log("childData", childData)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({ caseStudyTitle, subjectArea, description, dueDate, priorityLevel })
  }

  const [singleFacultyDetails, setsingleFacultyDetails] = useState([])
  const url = ApiURL();
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await Promise.race([
          axios.post(`${url}api/v1/institute/dashboard/Single-facultyDetails`, {
            facultyid: childData,
          }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setsingleFacultyDetails(response.data.success);
        } else if (response.data.error) {
          setsingleFacultyDetails([]);
        }
      } catch (error) {
        setsingleFacultyDetails([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } finally {
        console.log("Request completed");
      }
    };
    fetchMentors();
  }, [url]);


const firstInitial = singleFacultyDetails[0]?.faculty_firstname?.charAt(0) || "";
const lastInitial = singleFacultyDetails[0]?.faculty_lastname?.charAt(0) || "";
const initials = (firstInitial + lastInitial).toUpperCase();
const formatDate = (isoDateStr) => {
  if (!isoDateStr) return "N/A";
  try {
    const date = new Date(isoDateStr);
    const iso = date.toISOString().split("T")[0]; // "2025-05-24"
    const [year, month, day] = iso.split("-");
    return `${day}-${month}-${year}`;
  } catch (error) {
    return "Invalid Date";
  }
};



  return (
    <div className="teacherPage">
      {/* <div className="teacherPage__header">
        <div className="teacherPage__breadcrumb">
          <span>Dashboard</span>
          <span className="teacherPage__breadcrumbSeparator">&gt;</span>
          <span>Faculty</span>
          <span className="teacherPage__breadcrumbSeparator">&gt;</span>
          <span className="teacherPage__breadcrumbActive">Gagan verma</span>
        </div>
      </div> */}

      <div className="teacherPage__content">
        <div className="teacherPage__profileSection">
          <div className="teacherPage__avatarSection">
            <div className="teacherPage__avatar">
              <span>{initials}</span>
            </div>
            <h2 className="teacherPage__name">{singleFacultyDetails[0]?.faculty_firstname + " " + singleFacultyDetails[0]?.faculty_lastname }</h2>
            <p className="teacherPage__title">Faculty Member</p>
            {/* <div className="teacherPage__tags">
              <span className="teacherPage__tag teacherPage__tagBusiness">Business Studies</span>
              <span className="teacherPage__tag teacherPage__tagEnvironmental">Environmental Science</span>
              <span className="teacherPage__tag teacherPage__tagComputer">Computer Science</span>
            </div> */}
          </div>

          <div className="teacherPage__infoSection">
            <div className="teacherPage__contactInfo">
              <h3 className="teacherPage__sectionTitle">Contact Information</h3>
              <div className="teacherPage__infoItem">
                {/* <FiMail className="teacherPage__infoIcon" /> */}
                <i className="fa-solid fa-envelope teacherPage__infoIcon"></i>
                <span>{singleFacultyDetails[0]?.faculty_email}</span>
              </div>
              <div className="teacherPage__infoItem">
                {/* <FiPhone className="teacherPage__infoIcon" /> */}
                <i className="fa-solid fa-phone teacherPage__infoIcon"></i>
                <span>{singleFacultyDetails[0]?.faculty_phone_number}</span>
              </div>
              <div className="teacherPage__infoItem">
                {/* <FiMapPin className="teacherPage__infoIcon" /> */}
                {/* <span>Room 405, Academic Building</span> */}
              </div>
            </div>

            <div className="teacherPage__facultyDetails">
              <h3 className="teacherPage__sectionTitle">Faculty Details</h3>
              <div className="teacherPage__detailItem">
                <span className="teacherPage__detailLabel">Department:</span>
                <span className="teacherPage__detailValue">Finance</span>
              </div>
              <div className="teacherPage__detailItem">
                <span className="teacherPage__detailLabel">Join Date:</span>
                <span className="teacherPage__detailValue">{formatDate(singleFacultyDetails[0]?.faculty_dtls_cr_date)}</span>
              </div>
              <div className="teacherPage__detailItem">
                {/* <span className="teacherPage__detailLabel">Faculty ID:</span>
                <span className="teacherPage__detailValue">FAC2023105</span> */}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="teacherPage__statsSection">
          <div className="teacherPage__statCard">
            <div className="teacherPage__statIconContainer teacherPage__statIconTotal">
            
              <i className="fa-solid fa-book"></i>
            </div>
            <div className="teacherPage__statInfo">
              <h3 className="teacherPage__statValue">5</h3>
              <p className="teacherPage__statLabel">Total Cases</p>
            </div>
          </div>

          <div className="teacherPage__statCard">
            <div className="teacherPage__statIconContainer teacherPage__statIconActive">
            
              <i className="fa-solid fa-star"></i>
            </div>
            <div className="teacherPage__statInfo">
              <h3 className="teacherPage__statValue">3</h3>
              <p className="teacherPage__statLabel">Active Cases</p>
            </div>
          </div>

          <div className="teacherPage__statCard">
            <div className="teacherPage__statIconContainer teacherPage__statIconCompleted">
             
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="teacherPage__statInfo">
              <h3 className="teacherPage__statValue">2</h3>
              <p className="teacherPage__statLabel">Completed Cases</p>
            </div>
          </div>

          <div className="teacherPage__statCard">
            <div className="teacherPage__statIconContainer teacherPage__statIconSuccess">
         
              <i className="fa-solid fa-chalkboard-user"></i>
            </div>
            <div className="teacherPage__statInfo">
              <h3 className="teacherPage__statValue">95%</h3>
              <p className="teacherPage__statLabel">Success Rate</p>
            </div>
          </div>
        </div> */}

        <div className="teacherPage__casesSection">
          <div className="teacherPage__sectionHeader">
            <h3 className="teacherPage__sectionTitle">Assigned Case Studies</h3>
            <button className="teacherPage__assignButton">
              {/* <FiPlus className="teacherPage__buttonIcon" /> */}
              Assign New Case
            </button>
          </div>

          <div className="teacherPage__tableContainer">
            <table className="teacherPage__table">
              <thead>
                <tr>
                  <th>Case Study Title</th>
                  <th>Main character</th>
                  {/* <th>Assigned Date</th> */}
                  {/* <th>Status</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              {singleFacultyDetails.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{item.case_study_title}</td>
                    <td>{item.case_study_main_character_role}</td>
                    {/* <td>{item.case_study_assigned_date}</td> */}
                    {/* <td>
                      <span className="teacherPage__statusBadge teacherPage__statusInProgress">In Progress</span>       
                    </td> */}
                    <td>
                      <button className="teacherPage__viewButton">View Details</button>
                    </td>
                  </tr>
                </tbody>
              
              ))}
            </table>
          </div>
        </div>

        {/* <div className="teacherPage__assignFormSection">
          <h3 className="teacherPage__sectionTitle">Assign New Case Study</h3>
          <form className="teacherPage__form" onSubmit={handleSubmit}>
            <div className="teacherPage__formRow">
              <div className="teacherPage__formGroup">
                <label className="teacherPage__formLabel">Case Study Title</label>
                <input
                  type="text"
                  className="teacherPage__formInput"
                  placeholder="Enter case study title"
                  value={caseStudyTitle}
                  onChange={(e) => setCaseStudyTitle(e.target.value)}
                />
              </div>
              <div className="teacherPage__formGroup">
                <label className="teacherPage__formLabel">Subject Area</label>
                <select
                  className="teacherPage__formSelect"
                  value={subjectArea}
                  onChange={(e) => setSubjectArea(e.target.value)}
                >
                  <option value="">Select subject area</option>
                  <option value="Business Studies">Business Studies</option>
                  <option value="Environmental Science">Environmental Science</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Healthcare Management">Healthcare Management</option>
                </select>
              </div>
            </div>

            <div className="teacherPage__formGroup">
              <label className="teacherPage__formLabel">Description</label>
              <textarea
                className="teacherPage__formTextarea"
                placeholder="Enter case study description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="teacherPage__formRow">
              <div className="teacherPage__formGroup">
                <label className="teacherPage__formLabel">Due Date</label>
                <input
                  type="date"
                  className="teacherPage__formInput"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="teacherPage__formGroup">
                <label className="teacherPage__formLabel">Priority Level</label>
                <div className="teacherPage__radioGroup">
                  <div className="teacherPage__radioOption">
                    <input
                      type="radio"
                      id="high"
                      name="priority"
                      value="high"
                      checked={priorityLevel === "high"}
                      onChange={() => setPriorityLevel("high")}
                    />
                    <label htmlFor="high">High</label>
                  </div>
                  <div className="teacherPage__radioOption">
                    <input
                      type="radio"
                      id="medium"
                      name="priority"
                      value="medium"
                      checked={priorityLevel === "medium"}
                      onChange={() => setPriorityLevel("medium")}
                    />
                    <label htmlFor="medium">Medium</label>
                  </div>
                  <div className="teacherPage__radioOption">
                    <input
                      type="radio"
                      id="low"
                      name="priority"
                      value="low"
                      checked={priorityLevel === "low"}
                      onChange={() => setPriorityLevel("low")}
                    />
                    <label htmlFor="low">Low</label>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="teacherPage__submitButton">
              Assign Case Study
            </button>
          </form>
        </div> */}
      </div>
    </div>
  )
}

export default SingleTeacherdetailspage
