import { useState } from "react";
import hamburger from "../assets/images/hamburger.png";
import Sidebar from "./Sidebar"; // Optional if you're using it for mobile menu
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="border-b h-[10vh] border-blue-950 flex items-center justify-between px-6 py-4 text-slate-900 border-opacity-35 shadow-md">
      <div className="text-2xl font-semibold">Adoptly</div>

      {/* Nav Links for md and up */}
      <div className="hidden md:flex gap-6 text-lg font-medium items-center">
      <Link to="/" className="hover:text-blue-600">Calculator</Link>
        <a href="#" className="hover:text-blue-600">Values</a>
        <a href="#" className="hover:text-blue-600">Servers</a>
        <a href="#" className="hover:text-blue-600">Favorites</a>
        <Link to="/shop" className="hover:text-blue-600">Shop</Link>
        <a
          href="#"
          className="inline-block px-4 py-2 bg-rose-400 text-white font-bold border-b-4 border-rose-600 rounded-md shadow-md hover:translate-y-[1px] hover:shadow-sm active:translate-y-[2px] active:shadow-inner transition-all duration-100"
        >
          Login
        </a>

      </div>

      {/* Hamburger for mobile */}
      <img src={hamburger} alt="Menu" className="w-6 cursor-pointer md:hidden" />
    </div>
  );
}

export default Navbar;
