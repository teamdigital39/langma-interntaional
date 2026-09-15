import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import CanonicalUrl from "./CanonicalUrl";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
          <CanonicalUrl />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
