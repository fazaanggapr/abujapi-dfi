// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // <-- Panggil semua routing dari App.jsx
import "./input.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
