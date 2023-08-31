import React from "react";
import { Outlet } from "react-router-dom";

import "./App.css";
import logo from "../logo.png";

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>CircleCI</h2>
      <Outlet />
    </header>
  </div>
);

export default App;
