import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Dashboard = () => {
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold">Main Content</h2>
        <p>This is your main content area.</p>
      </div>
    </div>
  );
};

export default Dashboard;
