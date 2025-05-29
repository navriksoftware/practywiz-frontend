import React, { useState, useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import CaseStudy from "../../Components/CaseStudy/CaseStudy";
import CaseStudyHero from "../../Components/CaseStudy/CaseStudyHero/CaseStudyHero";
import GoToTop from "../../Utils/GoToTop";

const CaseStudyPage = ({ user, token }) => {
  document.title = "Practywiz | Case Studies";
  const caseStudyRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState(""); // Handle search from hero section
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query) {
      // Only scroll when we have a search query
      setTimeout(() => {
        // Smooth scroll to the case study section with offset to avoid hiding content
        if (caseStudyRef.current) {
          const yOffset = -100; // Reduced offset to prevent excessive scrolling

          // Use scrollIntoView with options instead of scrollTo for better cross-browser support
          caseStudyRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Apply offset after scrollIntoView
          setTimeout(() => {
            window.scrollBy({
              top: yOffset,
              behavior: "smooth",
            });
          }, 100);
        }
      }, 150); // Slightly longer delay for more reliable scrolling
    }
  };

  return (
    <>
      <Navbar />
      <CaseStudyHero onSearch={handleSearch} />
      <div ref={caseStudyRef}>
        <CaseStudy user={user} token={token} initialSearch={searchQuery} />
      </div>
      <Footer />
      <GoToTop />
    </>
  );
};

export default CaseStudyPage;
