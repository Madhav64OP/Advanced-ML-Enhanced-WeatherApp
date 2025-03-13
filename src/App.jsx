import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
// import OtherCities from "./components/OtherCities";
// import OtherCitiesContainer from "./components/OtherCitiesContainer";


function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Outlet/>
      <Analytics/>
      {/* <Home/> */}
    </div>
  );
}

export default App;
