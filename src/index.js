import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./components/App";
import Home from "./components/Home";
import NewSightingForm from "./components/NewSightingForm";
import Sighting from "./components/Sighting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Route that provides base app UI */}
      <Route path="/" element={<App />}>
        {/* Route that renders home content */}
        <Route index element={<Home />} />
        {/* Route that renders new sighting form */}
        <Route path="new" element={<NewSightingForm />} />
        {/* Route that renders individual sightings */}
        <Route path="sightings/:sightingId" element={<Sighting />} />
        {/* Route that matches all other paths */}
        <Route path="*" element={"Nothing here!"} />
      </Route>
    </Routes>
  </BrowserRouter>
);
