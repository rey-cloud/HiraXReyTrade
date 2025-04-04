import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { HiMenu } from "react-icons/hi";
import { MdDashboard, MdOutlinePets } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import logo from "../assets/images/logo.png";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { setUser, token } = useContext(AppContext);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("sidebarOpen", JSON.stringify(newState));
  };

  async function handleLogout(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Logout failed");

      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout Error:", err.message);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 bg-gray-800 text-white p-4 min-h-screen fixed z-50`}
    >
      <nav className="flex flex-col gap-4">
        {/* Header */}
        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isOpen && (
              <>
                <img src={logo} alt="logo" className="size-10" />
                <p className="text-lg font-semibold">Adoptly</p>
              </>
            )}
          </div>
          <button onClick={toggleSidebar}>
            <HiMenu size={24} />
          </button>
        </div>

        {/* Links */}
        <Link
          to="/dashboard"
          className={`hover:bg-gray-700 p-2 rounded flex items-center ${
            isOpen ? "gap-2" : "justify-center"
          }`}
        >
          <MdDashboard />
          {isOpen && <span>Dashboard</span>}
        </Link>

        <Link
          to="/pets"
          className={`hover:bg-gray-700 p-2 rounded flex items-center ${
            isOpen ? "gap-2" : "justify-center"
          }`}
        >
          <MdOutlinePets />
          {isOpen && <span>Pets</span>}
        </Link>

        <Link
          to="/users"
          className={`hover:bg-gray-700 p-2 rounded flex items-center ${
            isOpen ? "gap-2" : "justify-center"
          }`}
        >
          <FaUsers />
          {isOpen && <span>Users</span>}
        </Link>

        <Link
          to="/profile"
          className={`hover:bg-gray-700 p-2 rounded flex items-center ${
            isOpen ? "gap-2" : "justify-center"
          }`}
        >
          <CgProfile />
          {isOpen && <span>Profile</span>}
        </Link>

        <button
          onClick={handleLogout}
          className={`hover:bg-red-700 bg-red-500 p-2 rounded flex items-center justify-center ${
            isOpen ? "gap-2" : ""
          }`}
        >
          <CiLogout />
          {isOpen && <span>Logout</span>}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
