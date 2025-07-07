import React, { useState } from "react";
import "./SimulationPage.css";
import Simulation from "../../Components/CaseStudy/Simulator/Simulation";
import ChatSidebar from "../../Components/CaseStudy/Simulator/ChatSidebar";

function SimulationPage() {
  // --- Chat Sidebar State ---
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
  const [inclassChatOpen, setInclassChatOpen] = useState(false);
  const [caseStudyId, setCaseStudyId] = useState(null);
  // --- Chat Sidebar Handlers ---
  const handleChatSidebarToggle = () => {
    setChatSidebarOpen(!chatSidebarOpen);
  };

  const handleChatMessage = (message) => {
    // Handle chat messages if needed
    // You can integrate this with a backend chat system later
    console.log("Chat message sent:", message);
  };

  return (
    <>
      {/* <div ">Avega</div> */}
      <Simulation setInclassChatOpen={setInclassChatOpen} setCaseStudyId={setCaseStudyId} />

      {inclassChatOpen && 

      <ChatSidebar
        isOpen={chatSidebarOpen}
        onToggle={handleChatSidebarToggle}
        onSendMessage={handleChatMessage}
        roomIdProvided={caseStudyId}
      />
      }
    </>
  );
}

export default SimulationPage;
