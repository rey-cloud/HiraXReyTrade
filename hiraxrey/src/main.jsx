import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navbar from "./components/navbar.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./Context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Navbar /> */}
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
