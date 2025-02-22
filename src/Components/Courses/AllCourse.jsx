import React, { useState, useEffect, useMemo, useCallback } from "react";
import CourseCard from "./CourseCard.jsx";
import { coursesData } from "./CourseData.jsx";
import "./allcourse.css";

const AllCourse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Custom debounce function
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      setSearchTerm(searchValue);
    }, 300),
    []
  );

  // Filter courses based on search term and category
  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesSearch =
        searchTerm === "" ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "" || course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Get unique categories and their counts
  const categories = useMemo(() => {
    const categoryCounts = coursesData.reduce((acc, course) => {
      acc[course.category] = (acc[course.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count,
    }));
  }, []);

  // Cleanup function for debounce
  useEffect(() => {
    return () => {
      debouncedSearch.cancel?.();
    };
  }, [debouncedSearch]);

  return (
    <div className="practywiz-training-container">
      <div className="practywiz-training-header">
        <h1>PractyWiz Training</h1>
        <p>We found {filteredCourses.length} courses for you</p>
      </div>

      <div className="practywiz-training-layout">
        <aside className="practywiz-training-sidebar">
          <div className="practywiz-training-search">
            <input
              type="text"
              placeholder="Search Courses..."
              onChange={(e) => debouncedSearch(e.target.value)}
            />
            <button onClick={() => setSearchTerm("")}>Search</button>
          </div>

          <div className="practywiz-training-categories">
            <h2>Course Categories</h2>
            <ul>
              <li
                onClick={() => setSelectedCategory("")}
                style={{ cursor: "pointer" }}
              >
                All Courses ({coursesData.length})
              </li>
              {categories.map(({ name, count }) => (
                <li
                  key={name}
                  onClick={() => setSelectedCategory(name)}
                  style={{ cursor: "pointer" }}
                >
                  {name} ({count})
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="practywiz-training-main">
          <div className="practywiz-training-grid">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllCourse;
