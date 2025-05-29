import React, { useState, useEffect, useRef, useCallback } from "react";
import "./CaseStudyHero.css";
import { ApiURL } from "../../../Utils/ApiURL";
import axios from "axios";

const CaseStudyHero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allCaseStudies, setAllCaseStudies] = useState([]);
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const url = ApiURL();

  // Fetch all case studies on component mount
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await axios.get(`${url}api/v1/case-studies/all-list`);
        if (response.data.success) {
          setAllCaseStudies(response.data.success);
        }
      } catch (error) {
        console.error("Error fetching case studies:", error);
      }
    };

    fetchCaseStudies();
  }, [url]);

  // Implement debounce function for search
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  // Filter case studies based on search term
  const filterCaseStudies = useCallback(
    (term) => {
      if (!term.trim()) {
        setSuggestions([]);
        return;
      }

      setLoading(true);

      // Score and rank the results
      const scoredResults = allCaseStudies
        .map((caseStudy) => {
          let score = 0;
          const lowerTerm = term.toLowerCase();
          const topicLower = caseStudy.caseTopic.toLowerCase();
          const categoryLower = caseStudy.subjectCategory
            ? caseStudy.subjectCategory.toLowerCase()
            : "";
          const extractLower = caseStudy.extract
            ? caseStudy.extract.toLowerCase()
            : "";

          // Exact matches get higher scores
          if (topicLower === lowerTerm) score += 100;
          if (categoryLower === lowerTerm) score += 80;

          // Starting with search term gets higher score
          if (topicLower.startsWith(lowerTerm)) score += 50;
          if (categoryLower.startsWith(lowerTerm)) score += 30;

          // Contains search term gets base score
          if (topicLower.includes(lowerTerm)) score += 25;
          if (categoryLower.includes(lowerTerm)) score += 15;
          if (extractLower.includes(lowerTerm)) score += 10;

          return { caseStudy, score };
        })
        .filter((item) => item.score > 0) // Only keep items with a score
        .sort((a, b) => b.score - a.score) // Sort by score descending
        .slice(0, 5) // Limit to 5 suggestions
        .map((item) => item.caseStudy); // Extract just the case study objects

      setSuggestions(scoredResults);
      setLoading(false);
    },
    [allCaseStudies]
  );

  // Debounced version of filterCaseStudies
  const debouncedFilter = useCallback(
    debounce((term) => filterCaseStudies(term), 300),
    [filterCaseStudies]
  );

  // Update suggestions when search term changes
  useEffect(() => {
    debouncedFilter(searchTerm);

    if (searchTerm) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm, debouncedFilter]);

  // Restore focus to input when suggestions close
  useEffect(() => {
    if (!showSuggestions && searchTerm) {
      // Only restore focus when the user has been interacting with suggestions
      if (focusedSuggestion >= 0) {
        inputRef.current?.focus();
        setFocusedSuggestion(-1);
      }
    }
  }, [showSuggestions, searchTerm, focusedSuggestion]);

  // Calculate and set dropdown position whenever suggestions show or input changes
  useEffect(() => {
    if (showSuggestions && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const formRect = searchContainerRef.current.getBoundingClientRect();

      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: formRect.left,
        width: formRect.width,
      });
    }
  }, [showSuggestions, searchTerm]);

  // Handle window resize to reposition dropdown
  useEffect(() => {
    const handleResize = () => {
      if (showSuggestions && inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        const formRect = searchContainerRef.current.getBoundingClientRect();

        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: formRect.left,
          width: formRect.width,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showSuggestions]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setFocusedSuggestion(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  /**
   * Handle keyboard navigation for search suggestions dropdown
   * @param {React.KeyboardEvent} e - The keyboard event
   */
  const handleKeyDown = (e) => {
    // If suggestions are not shown, don't do anything special
    if (!showSuggestions || suggestions.length === 0) {
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        // Move focus to next suggestion
        e.preventDefault();
        setFocusedSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;

      case "ArrowUp":
        // Move focus to previous suggestion
        e.preventDefault();
        setFocusedSuggestion((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;

      case "Enter":
        // Select the focused suggestion
        if (focusedSuggestion >= 0) {
          e.preventDefault();
          const selectedItem = suggestions[focusedSuggestion];
          setSearchTerm(selectedItem.caseTopic);
          onSearch(selectedItem.caseTopic);
          setShowSuggestions(false);
          setFocusedSuggestion(-1);
        }
        break;

      case "Escape":
        // Close suggestions
        e.preventDefault();
        setShowSuggestions(false);
        setFocusedSuggestion(-1);
        inputRef.current?.focus();
        break;

      case "Tab":
        // Close suggestions when tabbing out
        setShowSuggestions(false);
        setFocusedSuggestion(-1);
        break;

      default:
        // Do nothing for other keys
        break;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (typeof onSearch === "function") {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="casestudy-hero-container">
      {/* Decorative elements */}
      <div className="casestudy-hero-decorator-1"></div>
      <div className="casestudy-hero-decorator-2"></div>

      <div className="casestudy-hero-content">
        <div className="casestudy-hero-badge">
          <span>PractyWiz</span>
        </div>
        <h1 className="casestudy-hero-title">
          Mentor Curated <span>Case Studies</span>
        </h1>{" "}
        <p className="casestudy-hero-subtitle">
          Explore real-world business case studies designed by industry experts.
          Develop practical skills and gain insights into complex business
          challenges.
        </p>
        <div
          className="casestudy-hero-search-container"
          ref={searchContainerRef}
        >
          <form className="casestudy-hero-search" onSubmit={handleSearch}>
            {" "}
            <div className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for case studies by topic or industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Search case studies"
                aria-expanded={showSuggestions}
                aria-owns={showSuggestions ? "search-suggestions" : undefined}
                aria-autocomplete="list"
                autoComplete="off"
              />
              {searchTerm && (
                <span
                  //   type="button"
                  className="casestudy-hero-clear-search-btn"
                  onClick={() => {
                    setSearchTerm("");
                    onSearch(""); // Reset search
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                >
                  <i className="fa fa-times"></i>
                </span>
              )}
            </div>
            <button type="submit" aria-label="Submit search">
              <i className="fa fa-search"></i> Search
            </button>
          </form>{" "}
          {showSuggestions && (
            <div
              className="casestudy-hero-suggestions"
              id="search-suggestions"
              role="listbox"
              ref={suggestionsRef}
            >
              {loading ? (
                <div className="casestudy-hero-suggestion-loading">
                  <div className="pulse-loader"></div>
                  <span>Finding matches...</span>
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((item, index) => (
                  <div
                    key={item.id}
                    className={`casestudy-hero-suggestion-item ${
                      focusedSuggestion === index ? "focused" : ""
                    }`}
                    onClick={() => {
                      setSearchTerm(item.caseTopic);
                      onSearch(item.caseTopic);
                      setShowSuggestions(false);
                    }}
                    role="option"
                    aria-selected={focusedSuggestion === index}
                    tabIndex={focusedSuggestion === index ? 0 : -1}
                  >
                    <div className="suggestion-title">
                      {highlightMatch(item.caseTopic, searchTerm)}
                    </div>
                    {item.subjectCategory && (
                      <div className="suggestion-category">
                        <span>Category:</span>{" "}
                        {highlightMatch(item.subjectCategory, searchTerm)}
                      </div>
                    )}
                    {item.extract &&
                      searchTerm &&
                      item.extract
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) && (
                        <div className="suggestion-extract">
                          {highlightMatch(
                            item.extract.length > 100
                              ? item.extract.substring(0, 100) + "..."
                              : item.extract,
                            searchTerm
                          )}
                        </div>
                      )}
                  </div>
                ))
              ) : searchTerm.trim() ? (
                <div className="casestudy-hero-no-results">
                  <i className="fa fa-info-circle"></i>
                  <span>No matches found for "{searchTerm}"</span>
                </div>
              ) : null}
            </div>
          )}
        </div>
        {/* 
        <div className="casestudy-hero-stats">
          <div className="casestudy-hero-stat">
            <div className="casestudy-hero-stat-value">30+</div>
            <div className="casestudy-hero-stat-label">Case Studies</div>
          </div>
          <div className="casestudy-hero-stat">
            <div className="casestudy-hero-stat-value">15+</div>
            <div className="casestudy-hero-stat-label">Industry Experts</div>
          </div>
          <div className="casestudy-hero-stat">
            <div className="casestudy-hero-stat-value">24/7</div>
            <div className="casestudy-hero-stat-label">AI Assistance</div>
          </div>
        </div> */}{" "}
      </div>
    </div>
  );
};

/**
 * Highlights matched text with context-aware matching
 * @param {string} text - The text to search through
 * @param {string} query - The search query to highlight
 * @returns {React.ReactNode} - The text with highlighted matches
 */
const highlightMatch = (text, query) => {
  if (!query || !text) return text;

  try {
    // Escape special regex characters to prevent errors
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");

    // For extract content, try to show context around the match if possible
    let processedText = text;

    // If this is extract content and longer than 100 chars, show relevant portion with match
    if (text.length > 100 && !text.endsWith("...")) {
      const matchIndex = text.toLowerCase().indexOf(query.toLowerCase());
      if (matchIndex >= 0) {
        // Calculate start/end positions to show relevant context
        const contextStart = Math.max(0, matchIndex - 40);
        const contextEnd = Math.min(
          text.length,
          matchIndex + query.length + 40
        );
        processedText =
          (contextStart > 0 ? "..." : "") +
          text.substring(contextStart, contextEnd) +
          (contextEnd < text.length ? "..." : "");
      } else {
        // If match not found directly, just truncate
        processedText = text.substring(0, 100) + "...";
      }
    }

    const parts = processedText.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <strong key={index} className="highlighted-match">
              {part}
            </strong>
          ) : (
            part
          )
        )}
      </>
    );
  } catch (e) {
    // If there's any issue with the regex, return the original text
    console.error("Error highlighting match:", e);
    return text;
  }
};

export default CaseStudyHero;
