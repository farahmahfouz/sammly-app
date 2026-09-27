// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer
      className="fixed top-16 right-4 z-50"
      toastClassName="bg-white bg-opacity-70 text-black rounded-lg shadow-lg p-4"
      closeOnClick
    />
  </>
);
