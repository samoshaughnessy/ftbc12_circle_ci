import React from "react";
import { Link } from "react-router-dom";

import SightingPreviewList from "./SightingPreviewList";

const Home = () => {
  return (
    <div>
      <Link to="/new">Record New Sighting</Link>
      <br />
      <br />
      <SightingPreviewList />
    </div>
  );
};

export default Home;
