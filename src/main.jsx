import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AxiosInterceptor from "./components/AxiosInterceptor.jsx";
import LoadingProvider from "./components/LoadingContext.jsx";
import LoadingCom from "./components/LoadingCom.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <LoadingProvider>
    <AxiosInterceptor>
      <LoadingCom />
      <App />
    </AxiosInterceptor>
  </LoadingProvider>
  // </React.StrictMode>
);
