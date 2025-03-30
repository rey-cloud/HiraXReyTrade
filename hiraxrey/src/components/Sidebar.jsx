import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { setUser, token } = useContext(AppContext);

  async function handleLogout(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
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
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [token]);

  return (
    <div className="w-full md:w-64 bg-gray-800 text-white flex-shrink-0 p-4 md:min-h-screen">
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/pets" className="hover:bg-gray-700 p-2 rounded">Pets</Link>
        <Link to="/users" className="hover:bg-gray-700 p-2 rounded">Users</Link>
        <Link to="/profile" className="hover:bg-gray-700 p-2 rounded">Profile</Link>
        <button onClick={handleLogout} className="hover:bg-red-700 bg-red-500 p-2 rounded">Logout</button>
      </nav>
    </div>
  );
};

export default Sidebar;
