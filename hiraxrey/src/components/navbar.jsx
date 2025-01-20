import hamburger from "../assets/images/hamburger.png";

function Navbar() {
  return (
    <div className="border-b border-blue-950 flex items-center justify-between px-6 py-4 text-slate-900 border-opacity-35 shadow-md">
      <div className="text-2xl font-semibold">HiraXRey</div>
      <img src={hamburger} alt="Menu" className="w-6 h-6 cursor-pointer" />
    </div>
  );
}

export default Navbar;
