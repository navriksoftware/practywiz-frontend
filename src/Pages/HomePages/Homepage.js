import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import HeroSection from "../../Components/Home/HeroSection";
import JaurneySection from "../../Components/Home/JaurneySection";
import FeaturedMentorSection from "../../Components/Home/FeaturedMentorSection";
import MentorCTASection from "../../Components/Home/MentorCTASection";
import AiCasestudySection from "../../Components/Home/AiCasestudySection";
import FeaturedCasesSection from "../../Components/Home/FeaturedCasesSection";
import InternshipInfoSection from "../../Components/Home/InternshipInfoSection";
import RecentInternshipsSection from "../../Components/Home/RecentInternshipsSection";
import OurPartnersSection from "../../Components/Home/OurPartnersSection";
import TestimonialsSection from "../../Components/Home/TestimonialsSection";
import ItTrainingSection from "../../Components/Home/ItTrainingSection";
import RoleSelectorCustom from "../../Components/Home/CalltoactionSection";
import CaseContributionSection from "../../Components/Home/CaseContributionSection";

const Homepage = () => {
  document.title = "Practywiz | Home";
  return (
    <>
      <Navbar />
      <HeroSection />
      <JaurneySection />
      <FeaturedMentorSection />
      <MentorCTASection />
      <AiCasestudySection />
      <CaseContributionSection />
      <FeaturedCasesSection />
      <InternshipInfoSection />
      <RecentInternshipsSection />
      <OurPartnersSection />
      <TestimonialsSection />
      <ItTrainingSection />
      <RoleSelectorCustom />
      <Footer />
      {/* <HomePageBanner />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 /> */}
    </>
  );
};

export default Homepage;
