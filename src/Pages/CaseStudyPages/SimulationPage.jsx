import React, { useState } from "react";
import "./SimulationPage.css";
import Simulation from "../../Components/CaseStudy/Simulator/Simulation";
import ChatSidebar from "../../Components/CaseStudy/Simulator/ChatSidebar";

function SimulationPage() {
  // --- Chat Sidebar State ---
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
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
      <Simulation />

      <ChatSidebar
        isOpen={chatSidebarOpen}
        onToggle={handleChatSidebarToggle}
        onSendMessage={handleChatMessage}
      />
    </>
  );
}

export default SimulationPage;
