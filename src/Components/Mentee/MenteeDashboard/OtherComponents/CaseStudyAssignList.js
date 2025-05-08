import { useState, useEffect, useCallback } from "react";
// Sample data
import axios from "axios";
import { debounce, set } from "lodash";
import { ApiURL } from "../../../../Utils/ApiURL"
import { useSelector } from "react-redux";
import "../DashboardCSS/CaseStudyAssignList.css"
const initialCaseStudies = [
    {
        id: 1,
        title: "Competing Against A Product Leader",
        department: "FIN 301, BUS 202",
        batch: "2024",
        students: 45,
        dueDate: "Feb 28, 2024",
        progress: 75,
        status: "Active",
        class: "MBA",
        type: "PractyWiz",
    },
    {
        id: 2,
        title: "Sustainable Development Goals",
        department: "ECO 101, ENV 202",
        batch: "2023",
        students: 32,
        dueDate: "Mar 05, 2024",
        progress: 60,
        status: "Active",
        class: "Environmental Studies",
        type: "PractyWiz",
    },
    {
        id: 3,
        title: "Global Supply Chain Management",
        department: "MKT 101",
        batch: "2024",
        students: 38,
        dueDate: "Mar 10, 2024",
        progress: 45,
        status: "Active",
        class: "Operations Management",
        type: "Non-PractyWiz",
    },
    {
        id: 4,
        title: "Digital Transformation Strategy",
        department: "ENT 401",
        batch: "2024",
        students: 41,
        dueDate: "Mar 15, 2024",
        progress: 30,
        status: "Active",
        class: "Information Systems",
        type: "PractyWiz",
    },
    {
        id: 5,
        title: "Marketing Analytics Project",
        department: "BUS 202",
        batch: "2023",
        students: 35,
        dueDate: "Mar 20, 2024",
        progress: 25,
        status: "Completed",
        class: "Digital Marketing",
        type: "Non-PractyWiz",
    },
    {
        id: 6,
        title: "Financial Risk Assessment",
        department: "ENT 401",
        batch: "2024",
        students: 40,
        dueDate: "Mar 25, 2024",
        progress: 15,
        status: "Active",
        class: "Finance Management",
        type: "Non-PractyWiz",
    },
];

const CaseStudyAssignList = () => {

    const menteeId = useSelector((state) => state.mentee.singleMentee[0]?.mentee_dtls_id);

    const [searchTerm, setSearchTerm] = useState("");
    const [fetchAssignCaseStudiesDetails, setfetchAssignCaseStudiesDetails] = useState([])
    const [filters, setFilters] = useState({
        class: "All Classes",
        type: "All Cases",
        dueDate: "Due Date",
        status: "All Status",
    });
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
    const url = ApiURL();
    useEffect(() => {
        const fetchAssignCaseStudiesDetailsCall = async () => {
            try {
                const response = await Promise.race([
                    axios.post(`${url}api/v1/mentee/dashboard/case-studies-details`, {
                        menteeId
                    }),
                    new Promise(
                        (_, reject) =>
                            setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
                    ),
                ]);

                if (response.data.success) {
                    setfetchAssignCaseStudiesDetails(response.data.success);
                } else if (response.data.error) {
                    setfetchAssignCaseStudiesDetails([]);
                }
            } catch (error) {
                setfetchAssignCaseStudiesDetails([]);
                if (error.message === "Request timed out") {
                    console.log("Request timed out. Please try again.");
                } else {
                    console.log("An error occurred. Please try again.");
                }
            } finally {
                console.log("Request completed");
            }
        };
        fetchAssignCaseStudiesDetailsCall();
    }, [url]);

    console.log(fetchAssignCaseStudiesDetails)
    const [caseStudies, setCaseStudies] = useState(fetchAssignCaseStudiesDetails);
    const [filteredCaseStudies, setFilteredCaseStudies] =
        useState(fetchAssignCaseStudiesDetails);
    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((term) => {
            if (!term) {
                applyFilters(filters, caseStudies);
                return;
            }

            const filtered = caseStudies.filter(
                (caseStudy) =>
                    caseStudy.title.toLowerCase().includes(term.toLowerCase()) ||
                    caseStudy.department.toLowerCase().includes(term.toLowerCase())
            );

            setFilteredCaseStudies(filtered);
        }, 300),
        [caseStudies, filters]
    );

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    // Apply filters function
    const applyFilters = (currentFilters, cases) => {
        let result = [...cases];

        if (currentFilters.class !== "All Classes") {
            result = result.filter((cs) => cs.class === currentFilters.class);
        }

        if (currentFilters.type !== "All Cases") {
            result = result.filter((cs) => cs.type === currentFilters.type);
        }

        if (currentFilters.status !== "All Status") {
            result = result.filter((cs) => cs.status === currentFilters.status);
        }

        // For due date, we would implement actual date comparison logic
        // This is simplified for the example

        setFilteredCaseStudies(result);
    };

    // Handle filter change
    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...filters, [filterType]: value };
        setFilters(newFilters);
        applyFilters(newFilters, caseStudies);
    };

    // Apply search when component mounts or search term changes
    useEffect(() => {
        debouncedSearch(searchTerm);

        // Cleanup function
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm, debouncedSearch]);

    // Get progress bar color based on progress value
    const getProgressColor = (progress) => {
        if (progress >= 70) return "#4285F4";
        if (progress >= 40) return "#4285F4";
        return "#4285F4";
    };

    return (
        <div className="CaseShow-Mentee-container">
            <div className="CaseShow-Mentee-filters">
                <div className="CaseShow-Mentee-filter-label">
                    <i className="fa-solid fa-filter" /> Filters:
                </div>
                <div className="CaseShow-Mentee-filter-dropdowns">
                    <select
                        value={filters.class}
                        onChange={(e) => handleFilterChange("class", e.target.value)}
                    >
                        <option>All Classes</option>
                        <option>MBA</option>
                        <option>Environmental Studies</option>
                        <option>Operations Management</option>
                        <option>Information Systems</option>
                        <option>Digital Marketing</option>
                        <option>Finance Management</option>
                    </select>

                    <select
                        value={filters.type}
                        onChange={(e) => handleFilterChange("type", e.target.value)}
                    >
                        <option>All Cases</option>
                        <option>PractyWiz</option>
                        <option>Non-PractyWiz</option>
                    </select>

                    <select
                        value={filters.dueDate}
                        onChange={(e) => handleFilterChange("dueDate", e.target.value)}
                    >
                        <option>Due Date</option>
                        <option>This Week</option>
                        <option>Next Week</option>
                        <option>This Month</option>
                    </select>

                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange("status", e.target.value)}
                    >
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Completed</option>
                        <option>Overdue</option>
                    </select>
                </div>
            </div>

            <div className="CaseShow-Mentee-case-studies">
                {fetchAssignCaseStudiesDetails.map((caseStudy) => (
                    <div>

                        {caseStudy.faculty_case_assign_owned_by_practywiz == 0 ?

                            <div
                                key={caseStudy.id}
                                className="CaseShow-Mentee-case-card"
                            >
                                <div className="CaseShow-Mentee-case-case-type">
                                    <span
                                        className={`CaseShow-Mentee-case-case-type-tag ${"practywiz"}`}
                                    >
                                        PractyWiz
                                        {/* {caseStudy.faculty_case_assign_owned_by_practywiz === 1 ? "PractyWiz" : "Non-PractyWiz"} */}
                                    </span>
                                </div>
                                <div className="CaseShow-Mentee-case-header">
                                    <h3 className="CaseShow-Mentee-case-title">
                                        {caseStudy.case_study_title.toUpperCase()}
                                    </h3>
                                    {/* <button className="CaseShow-Mentee-case-menu">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button> */}
                                </div>

                                <div className="CaseShow-Mentee-case-info">
                                    <div className="CaseShow-Mentee-case-detail">
                                        <i className="fa-solid fa-graduation-cap" />
                                        <span>{caseStudy.class_name}</span>
                                        {/* {caseStudy.department.split(", ").map((dept, index) => (
                                    <span
                                        className="CaseShow-Mentee-case-detail-subj-tag"
                                        key={index}
                                    >
                                        {dept}
                                    </span>
                                ))} */}
                                    </div>

                                    {/* <div className="CaseShow-Mentee-case-detail">
                                <i className="fa-solid fa-user-friends" />
                                <span>{caseStudy.students} Students</span>
                            </div> */}

                                    <div className="CaseShow-Mentee-case-detail">
                                        <i className="fa-solid fa-clock" />
                                        <span>Due {formatDate(caseStudy.faculty_case_assign_end_date)}</span>
                                    </div>
                                </div>

                                {/* <div className="CaseShow-Mentee-case-progress">
                            <div className="CaseShow-Mentee-progress-header">
                                <span>Progress</span>
                                <span>{caseStudy.progress} %</span>
                            </div>
                            <div className="CaseShow-Mentee-progress-bar">
                                <div
                                    className="CaseShow-Mentee-progress-fill"
                                    style={{
                                        width: `${caseStudy.progress}%`,
                                        backgroundColor: getProgressColor(caseStudy.progress),
                                    }}
                                ></div>
                            </div>
                        </div> */}

                                <div className="CaseShow-Mentee-case-footer">
                                    <div
                                        className={`CaseShow-Mentee-case-status ${caseStudy.class_status}`}
                                    >
                                        {caseStudy.class_status ? "Active" : "Inactive"}
                                    </div>
                                    <button
                                        className="CaseShow-Mentee-view-details"
                                    >
                                        View Case Study
                                    </button>
                                </div>
                            </div>
                            :
                            <div
                                key={caseStudy.id}
                                className="CaseShow-Mentee-case-card"
                            >
                                <div className="CaseShow-Mentee-case-case-type">
                                    <span
                                        className={`CaseShow-Mentee-case-case-type-tag ${"non-practywiz"}`}
                                    >
                                        Non-PractyWiz

                                    </span>
                                </div>
                                <div className="CaseShow-Mentee-case-header">
                                    <h3 className="CaseShow-Mentee-case-title">
                                        {caseStudy.non_practywiz_case_title}
                                    </h3>
                                    {/* <button className="CaseShow-Mentee-case-menu">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                fill="currentColor"
                            />
                            <path
                                d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                                fill="currentColor"
                            />
                            <path
                                d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button> */}
                                </div>

                                <div className="CaseShow-Mentee-case-info">
                                    <div className="CaseShow-Mentee-case-detail">
                                        <i className="fa-solid fa-graduation-cap" />
                                        <span>{caseStudy.class_name}</span>
                                        {/* {caseStudy.department.split(", ").map((dept, index) => (
                            <span
                                className="CaseShow-Mentee-case-detail-subj-tag"
                                key={index}
                            >
                                {dept}
                            </span>
                        ))} */}
                                    </div>

                                    {/* <div className="CaseShow-Mentee-case-detail">
                        <i className="fa-solid fa-user-friends" />
                        <span>{caseStudy.students} Students</span>
                    </div> */}

                                    <div className="CaseShow-Mentee-case-detail">
                                        <i className="fa-solid fa-clock" />
                                        <span>Due {formatDate(caseStudy.faculty_case_assign_end_date)}</span>
                                    </div>
                                </div>

                                {/* <div className="CaseShow-Mentee-case-progress">
                    <div className="CaseShow-Mentee-progress-header">
                        <span>Progress</span>
                        <span>{caseStudy.progress} %</span>
                    </div>
                    <div className="CaseShow-Mentee-progress-bar">
                        <div
                            className="CaseShow-Mentee-progress-fill"
                            style={{
                                width: `${caseStudy.progress}%`,
                                backgroundColor: getProgressColor(caseStudy.progress),
                            }}
                        ></div>
                    </div>
                </div> */}

                                <div className="CaseShow-Mentee-case-footer">
                                    <div
                                        className={`CaseShow-Mentee-case-status ${caseStudy.class_status}`}
                                    >
                                        {caseStudy.class_status ? "Active" : "Inactive"}
                                    </div>
                                    <button
                                        className="CaseShow-Mentee-view-details"
                                    >
                                        View Case Study
                                    </button>
                                </div>
                            </div>}

                    </div>

                ))}
            </div>
        </div>
    )
}

export default CaseStudyAssignList
