/**
 * Gets the time window for a question type based on time allocation
 * @param {number} timeAllocation - 0: Before Class, 1: In Class, 2: After Class
 * @param {Object} caseStudy - Case study object with date fields
 * @returns {Object|null} - Object with start and end Date objects, or null if invalid
 */
export function getQuestionTimeWindow(timeAllocation, caseStudy) {
  if (timeAllocation === null || timeAllocation === undefined) {
    return null;
  }

  try {
    switch (timeAllocation) {
      case 0: // Before Class
        return {
          start: new Date(caseStudy.faculty_case_assign_start_date),
          end: new Date(caseStudy.faculty_case_assign_class_start_date),
        };
      case 1: // In Class
        return {
          start: new Date(caseStudy.faculty_case_assign_class_start_date),
          end: new Date(caseStudy.faculty_case_assign_class_end_date),
        };
      case 2: // After Class
        return {
          start: new Date(caseStudy.faculty_case_assign_class_end_date),
          end: new Date(caseStudy.faculty_case_assign_end_date),
        };
      default:
        return null;
    }
  } catch (error) {
    console.error("Error creating time window:", error);
    return null;
  }
}

/**
 * Determines the status of each question type for a case study using server time.
 * Status can be: "not_available", "unavailable", "available", "already_submitted", "expired"
 *
 * @param {Object} caseStudy - The case study object, must include all relevant dates and time allocations.
 * @param {Object} submissionStatus - Object with boolean flags for each question type.
 * @param {string|Date} currentTime - Current time from server in UTC format
 * @param {Object} parsedQuestions - Parsed questions object to check if questions exist
 * @returns {Object} Status for each question type.
 */
export function determineQuestionStatus(caseStudy, submissionStatus, currentTime, parsedQuestions = null) {
  // Server time is now already in UTC format
  const now = new Date(currentTime);

  // console.log("=== Question Status Debug ===");
  // console.log("Server Time (UTC):", currentTime);
  // console.log("Parsed UTC Time:", now);
  // console.log("Case Study Dates:", {
  //   start: caseStudy.faculty_case_assign_start_date,
  //   classStart: caseStudy.faculty_case_assign_class_start_date,
  //   classEnd: caseStudy.faculty_case_assign_class_end_date,
  //   end: caseStudy.faculty_case_assign_end_date
  // });

  /**
   * Get status for a specific question type
   * @param {string} typeKey - Key for submission status (e.g., "factBasedQuestions")
   * @param {string} timeAllocationKey - Key for time allocation in caseStudy
   * @param {string} questionKey - Key for questions in parsedQuestions
   * @returns {string} Status of the question type
   */
  function getStatusForType(typeKey, timeAllocationKey, questionKey) {
    // console.log(`\n--- Checking ${typeKey} ---`);
    
    // Check if questions exist and are not empty
    if (parsedQuestions) {
      const questions = parsedQuestions[questionKey];
      if (!questions || !Array.isArray(questions) || questions.length === 0) {
        // console.log(`${typeKey}: No questions available`);
        return "not_available";
      }
      // console.log(`${typeKey}: Found ${questions.length} questions`);
    }

    // Check if already submitted
    if (submissionStatus && submissionStatus[typeKey] === true) {
      // console.log(`${typeKey}: Already submitted`);
      return "already_submitted";
    }

    // Get time allocation
    const timeAllocation = caseStudy[timeAllocationKey];
    // console.log(`${typeKey}: Time allocation = ${timeAllocation}`);
    
    if (timeAllocation === null || timeAllocation === undefined) {
      // console.log(`${typeKey}: No time allocation specified`);
      return "unavailable";
    }

    // Get time window
    const window = getQuestionTimeWindow(timeAllocation, caseStudy);
    if (!window || isNaN(window.start.getTime()) || isNaN(window.end.getTime())) {
      // console.log(`${typeKey}: Invalid time window`);
      return "unavailable";
    }

    // console.log(`${typeKey}: Time window:`, {
    //   start: window.start.toISOString(),
    //   end: window.end.toISOString(),
    //   current: now.toISOString()
    // });

    // Compare current time with window
    if (now < window.start) {
      // console.log(`${typeKey}: Current time is before start time - unavailable`);
      return "unavailable"; // Future availability
    }
    if (now >= window.start && now <= window.end) {
      // console.log(`${typeKey}: Current time is within window - available`);
      return "available";
    }
    if (now > window.end) {
      // console.log(`${typeKey}: Current time is after end time - expired`);
      return "expired";
    }
    
    // console.log(`${typeKey}: Default case - unavailable`);
    return "unavailable";
  }

  // Get initial status for fact-based and analysis-based questions
  const factBasedStatus = getStatusForType(
    "factBasedQuestions",
    "faculty_case_assign_fact_question_time",
    "factBasedQuestions"
  );

  const analysisBasedStatus = getStatusForType(
    "analysisBasedQuestions",
    "faculty_case_assign_analysis_question_time",
    "analysisBasedQuestions"
  );

  // Get research-based questions status (without time-based logic initially)
  let researchBasedStatus = getStatusForType(
    "researchBasedQuestions",
    "faculty_case_assign_research_question_time",
    "researchBasedQuestions"
  );

  // Special logic for research-based questions
  // Research becomes available when:
  // 1. Both fact and analysis are available AND research questions exist
  // 2. OR one of fact/analysis is available and the other is not "unavailable" AND research questions exist
  if (parsedQuestions && parsedQuestions.researchBasedQuestions && 
      Array.isArray(parsedQuestions.researchBasedQuestions) && 
      parsedQuestions.researchBasedQuestions.length > 0) {
    
    // console.log("\n--- Special Research-based Logic ---");
    // console.log(`Fact Status: ${factBasedStatus}`);
    // console.log(`Analysis Status: ${analysisBasedStatus}`);
    // console.log(`Research Status (before logic): ${researchBasedStatus}`);

    // Check if research is not already submitted
    if (researchBasedStatus !== "already_submitted") {
      // Condition 1: Both fact and analysis are available
      if (factBasedStatus === "available" && analysisBasedStatus === "available") {
        // console.log("Research: Both fact and analysis are available - making research available");
        researchBasedStatus = "available";
      }
      // Condition 2: One is available and other is not "unavailable"
      else if (
        (factBasedStatus === "available" && analysisBasedStatus !== "unavailable") ||
        (analysisBasedStatus === "available" && factBasedStatus !== "unavailable")
      ) {
        // console.log("Research: One is available and other is not unavailable - making research available");
        researchBasedStatus = "available";
      }
    }

    // console.log(`Research Status (after logic): ${researchBasedStatus}`);
  }

  const result = {
    factBasedQuestions: factBasedStatus,
    analysisBasedQuestions: analysisBasedStatus,
    researchBasedQuestions: researchBasedStatus,
  };

  // console.log("=== Final Question Status ===", result);
  return result;
}

/**
 * Determines if any question type is available for the Run Avega button
 * @param {Object} questionStatus - Status object from determineQuestionStatus
 * @returns {boolean} True if any question type is available
 */
export function isAnyQuestionAvailable(questionStatus) {
  return Object.values(questionStatus).some(status => status === "available");
}

/**
 * Gets a human-readable label for question status
 * @param {string} status - Status string
 * @returns {string} Human-readable status label
 */
export function getStatusLabel(status) {
  switch (status) {
    case "available":
      return "Available";
    case "already_submitted":
      return "Already Submitted";
    case "expired":
      return "Expired";
    case "unavailable":
      return "Unavailable";
    case "not_available":
      return "Not Available";
    default:
      return "Unknown";
  }
}

/**
 * Gets CSS class for status badge styling
 * @param {string} status - Status string
 * @returns {string} CSS class name
 */
export function getStatusBadgeClass(status) {
  switch (status) {
    case "available":
      return "status-available";
    case "already_submitted":
      return "status-submitted";
    case "expired":
      return "status-expired";
    case "unavailable":
      return "status-unavailable";
    case "not_available":
      return "status-not-available";
    default:
      return "status-unknown";
  }
}

/**
 * Gets icon for status display
 * @param {string} status - Status string
 * @returns {JSX.Element} Icon element
 */
export function getStatusIcon(status) {
  switch (status) {
    case "available":
      return <i className="fa-solid fa-check-circle"></i>;
    case "already_submitted":
      return <i className="fa-solid fa-clipboard-check"></i>;
    case "expired":
      return <i className="fa-solid fa-clock"></i>;
    case "unavailable":
      return <i className="fa-solid fa-ban"></i>;
    case "not_available":
      return <i className="fa-solid fa-times-circle"></i>;
    default:
      return <i className="fa-solid fa-question-circle"></i>;
  }
}