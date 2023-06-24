import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-toastify/dist/ReactToastify.min.css";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./hooks/SearchContext";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchProvider>
      <App />
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);
