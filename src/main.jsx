import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AxiosInterceptor from "./components/AxiosInterceptor.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AxiosInterceptor>
      <App />
    </AxiosInterceptor>
  </React.StrictMode>
);
