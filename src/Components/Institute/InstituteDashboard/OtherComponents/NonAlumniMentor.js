import React, { useState, useEffect } from "react";
import { ListsForOtherMentors } from "./ListsForMentors";
import "../DashboardCSS/InstituteguestlctSearch.css";
import Data from "./demoDataMentors.json";
// import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";
import ListStatusSkeleton from "./ListStatusSkeleton";

const NonAlumniMentor = () => {
  const [filters, setFilters] = useState({
    location: "",
    skill: "",
    institute: "",
    qualification: "",
    areaOfMentorship: "",
    experience: "",
  });

  const url = ApiURL;

  const [allMentors, setAllMentors] = useState([]);

  // useEffect(() => {
  //   const fetchMentors = async () => {
  //     const response = await axios.get(`${url}api/v1/institute/guest-lectures`);
  //     if (response.data.success) {
  //       setAllMentors(response.data.success);
  //     } else {
  //       setAllMentors([]);
  //     }
  //   };
  //   fetchMentors();
  // }, [url]);

  useEffect(() => {
    // Check if DataJson is an array
    if (Array.isArray(Data)) {
      setAllMentors(Data);
    } else if (Data.success && Array.isArray(Data.success)) {
      // Handle case where mentors are nested inside "success"
      setAllMentors(Data.success);
    } else {
      console.error("Data format is unexpected", Data);
    }
  }, [url]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filterMentors = () => {
    let filtered = allMentors;

    if (filters.location) {
      filtered = filtered.filter(
        (mentor) => mentor.mentor_country === filters.location
      );
    }
    if (filters.skill) {
      filtered = filtered.filter((mentor) =>
        JSON.parse(mentor.expertise_list || "[]").some(
          (expertise) => expertise.mentor_expertise === filters.skill
        )
      );
    }
    if (filters.institute) {
      filtered = filtered.filter(
        (mentor) => mentor.institute === filters.institute
      );
    }
    if (filters.qualification) {
      filtered = filtered.filter(
        (mentor) => mentor.qualification === filters.qualification
      );
    }
    if (filters.areaOfMentorship) {
      filtered = filtered.filter(
        (mentor) => mentor.area_of_mentorship === filters.areaOfMentorship
      );
    }
    if (filters.experience) {
      filtered = filtered.filter(
        (mentor) => mentor.experience === filters.experience
      );
    }

    setAllMentors(filtered);
  };

  const handleApplyFilter = () => {
    filterMentors();
  };

  return (
    <div className="col-lg-10 ps-0">
      <div className="mentor_dash_msge">
        <div>
          <div className="containerOfGueste">
            <div className="containerOfFilter">
              <label htmlFor="location">
                <h6 className="inline">Location</h6>
                <select name="location" id="location" onChange={handleChange}>
                  <option value="">Select Location</option>
                  <option value="India">India</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="haryana">Haryana</option>
                  <option value="grugram">Grugram</option>
                </select>
              </label>
              <label htmlFor="skill">
                <h6 className="inline">Skill</h6>
                <select name="skill" id="skill" onChange={handleChange}>
                  <option value="">Select skill</option>
                  <option value="AI">AI</option>
                  <option value="Agile">Agile</option>
                  <option value="Cloud">Cloud</option>
                  <option value="webDevloper">Web Devloper</option>
                  <option value="frontendDevloper">Frontend Devloper</option>
                  <option value="backendDevloper">Backend Devloper</option>
                </select>
              </label>
              <label htmlFor="institute">
                <h6 className="inline">Institute</h6>
                <select name="institute" id="institute" onChange={handleChange}>
                  <option value="">Select Institute</option>
                  <option value="du">DU</option>
                  <option value="jnu">JNU</option>
                </select>
              </label>
              <label htmlFor="qualification">
                <h6 className="inline">Qualification</h6>
                <select
                  name="qualification"
                  id="qualification"
                  onChange={handleChange}
                >
                  <option value="">Select Qualification</option>
                  <option value="graduate">Graduate</option>
                  <option value="post-graduate">Post-Graduate</option>
                </select>
              </label>
              <label htmlFor="areaOfMentorship">
                <h6 className="inline">Area Of Mentorship</h6>
                <select
                  name="areaOfMentorship"
                  id="areaOfMentorship"
                  onChange={handleChange}
                >
                  <option value="">Select Area Of Mentorship</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="haryana">Haryana</option>
                  <option value="grugram">Grugram</option>
                </select>
              </label>
              <label htmlFor="experience">
                <h6 className="inline">Experience</h6>
                <select
                  name="experience"
                  id="experience"
                  onChange={handleChange}
                >
                  <option value="">Select Experience</option>
                  <option value="fresher">Fresher</option>
                  <option value="10">10 Years</option>
                  <option value="20">20 Years</option>
                </select>
              </label>
              <div></div>
              <button onClick={handleApplyFilter}>Apply Filter</button>
            </div>
            <div className="containerOfCard">
              {allMentors.length === 0 ? (
                <>
                  <ListStatusSkeleton />
                  <ListStatusSkeleton />
                  <ListStatusSkeleton />
                  <ListStatusSkeleton />
                  <ListStatusSkeleton />
                  <ListStatusSkeleton />
                </>
              ) : (
                <ListsForOtherMentors data={allMentors} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonAlumniMentor;
