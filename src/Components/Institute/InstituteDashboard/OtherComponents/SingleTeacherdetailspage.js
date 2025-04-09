import { useState } from "react"
import "../DashboardCSS/TeacherDetailslistings.css"
const SingleTeacherdetailspage = () => {
const [caseStudyTitle, setCaseStudyTitle] = useState("")
  const [subjectArea, setSubjectArea] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priorityLevel, setPriorityLevel] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({ caseStudyTitle, subjectArea, description, dueDate, priorityLevel })
  }

  return (
    <div className="teacherPage">
      <div className="teacherPage__header">
        <div className="teacherPage__breadcrumb">
          <span>Dashboard</span>
          <span className="teacherPage__breadcrumbSeparator">&gt;</span>
          <span>Faculty</span>
          <span className="teacherPage__breadcrumbSeparator">&gt;</span>
          <span className="teacherPage__breadcrumbActive">Gagan verma</span>
        </div>
      </div>

      <div className="teacherPage__content">
        <div className="teacherPage__profileSection">
          <div className="teacherPage__avatarSection">
            <div className="teacherPage__avatar">
              <span>AS</span>
            </div>
            <h2 className="teacherPage__name">Ananya Sharma</h2>
            <p className="teacherPage__title">Faculty Member</p>
            <div className="teacherPage__tags">
              <span className="teacherPage__tag teacherPage__tagBusiness">Business Studies</span>
              <span className="teacherPage__tag teacherPage__tagEnvironmental">Environmental Science</span>
              <span className="teacherPage__tag teacherPage__tagComputer">Computer Science</span>
            </div>
          </div>

          <div className="teacherPage__infoSection">
            <div className="teacherPage__contactInfo">
              <h3 className="teacherPage__sectionTitle">Contact Information</h3>
              <div className="teacherPage__infoItem">
                {/* <FiMail className="teacherPage__infoIcon" /> */}
                <i className="fa-solid fa-envelope teacherPage__infoIcon"></i>
                <span>Ananya.Sharma@educase.com</span>
              </div>
              <div className="teacherPage__infoItem">
                {/* <FiPhone className="teacherPage__infoIcon" /> */}
                <i className="fa-solid fa-phone teacherPage__infoIcon"></i>
                <span>+91 111111111</span>
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
                <span className="teacherPage__detailValue">Multi-disciplinary Studies</span>
              </div>
              <div className="teacherPage__detailItem">
                <span className="teacherPage__detailLabel">Join Date:</span>
                <span className="teacherPage__detailValue">October 2023</span>
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
                  <th>Subject Area</th>
                  <th>Assigned Date</th>
                  {/* <th>Status</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Global Supply Chain Management</td>
                  <td>Business Studies</td>
                  <td>Oct 15, 2023</td>
                  {/* <td>
                    <span className="teacherPage__statusBadge teacherPage__statusInProgress">In Progress</span>
                  </td> */}
                  <td>
                    <button className="teacherPage__viewButton">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td>Renewable Energy Solutions</td>
                  <td>Environmental Science</td>
                  <td>Oct 12, 2023</td>
                  {/* <td>
                    <span className="teacherPage__statusBadge teacherPage__statusInProgress">In Progress</span>
                  </td> */}
                  <td>
                    <button className="teacherPage__viewButton">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td>Digital Marketing Strategy</td>
                  <td>Marketing</td>
                  <td>Oct 10, 2023</td>
                  {/* <td>
                    <span className="teacherPage__statusBadge teacherPage__statusCompleted">Completed</span>
                  </td> */}
                  <td>
                    <button className="teacherPage__viewButton">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td>Digital Marketing Strategy</td>
                  <td>Marketing</td>
                  <td>Oct 10, 2023</td>
                  {/* <td>
                    <span className="teacherPage__statusBadge teacherPage__statusCompleted">Completed</span>
                  </td> */}
                  <td>
                    <button className="teacherPage__viewButton">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td>Digital Marketing Strategy</td>
                  <td>Marketing</td>
                  <td>Oct 10, 2023</td>
                  {/* <td>
                    <span className="teacherPage__statusBadge teacherPage__statusCompleted">Completed</span>
                  </td> */}
                  <td>
                    <button className="teacherPage__viewButton">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td>Digital Marketing Strategy</td>
                  <td>Marketing</td>
                  <td>Oct 10, 2023</td>
                  {/* <td>
                    <span className="teacherPage__statusBadge teacherPage__statusCompleted">Completed</span>
                  </td> */}
                  <td>
                    <button className="teacherPage__viewButton">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td>Digital Marketing Strategy</td>
                  <td>Marketing</td>
                  <td>Oct 10, 2023</td>
                  {/* <td>
                    <span className="teacherPage__statusBadge teacherPage__statusCompleted">Completed</span>
                  </td> */}
                  <td>
                    <button className="teacherPage__viewButton">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td>Digital Marketing Strategy</td>
                  <td>Marketing</td>
                  <td>Oct 10, 2023</td>
                  {/* <td>
                    <span className="teacherPage__statusBadge teacherPage__statusCompleted">Completed</span>
                  </td> */}
                  <td>
                    <button className="teacherPage__viewButton">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td>Digital Marketing Strategy</td>
                  <td>Marketing</td>
                  <td>Oct 10, 2023</td>
                  {/* <td>
                    <span className="teacherPage__statusBadge teacherPage__statusCompleted">Completed</span>
                  </td> */}
                  <td>
                    <button className="teacherPage__viewButton">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td>Healthcare Innovation</td>
                  <td>Healthcare Management</td>
                  <td>Oct 8, 2023</td>
                  {/* <td>
                    <span className="teacherPage__statusBadge teacherPage__statusCompleted">Completed</span>
                  </td> */}
                  <td>
                    <button className="teacherPage__viewButton">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td>Artificial Intelligence Ethics</td>
                  <td>Computer Science</td>
                  <td>Oct 5, 2023</td>
                  {/* <td>
                    <span className="teacherPage__statusBadge teacherPage__statusInProgress">In Progress</span>
                  </td> */}
                  <td>
                    <button className="teacherPage__viewButton">View Details</button>
                  </td>
                </tr>
              </tbody>
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
