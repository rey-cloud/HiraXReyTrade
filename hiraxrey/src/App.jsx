import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import About from "./about";
import Home from "./Home";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Dashboard";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import { Navigate } from "react-router-dom";
import IndexPets from "./Pages/Pets/Index";
import IndexProfile from "./Pages/Profile/Index";
import IndexUsers from "./Pages/Users/Index";
import CreatePets from "./Pages/Pets/Create";
import CreateUsers from "./Pages/Users/Create";
import EditPets from "./Pages/Pets/Edit";

function App() {
  const {user} = useContext(AppContext)
  
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/pets" element={<IndexPets />}></Route>
        <Route 
          path="/dashboard" 
          element={<Dashboard /> } 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <Login />} 
        />

        <Route path="/pet/create" element={<CreatePets />}></Route>
        <Route path="/pet/edit/:id" element={<EditPets />} />
        <Route path="/profile" element={<IndexProfile />}></Route>
        <Route path="/users" element={<IndexUsers />}></Route>
        <Route path="/user/create" element={<CreateUsers />}></Route>
      </Routes>
    </>
  );
}

export default App;
