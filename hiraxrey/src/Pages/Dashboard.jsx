import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";


const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved ? JSON.parse(saved) : true;
  });
  
  
  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`flex-1 p-6 transition-all duration-300 ${
        isOpen ? "md:ml-64" : "ml-20"
      }`}>
        <h2 className="text-xl font-semibold">Main Content</h2>
        <p>This is your main content area.</p>
      </div>
    </div>
  );
};

export default Dashboard;
