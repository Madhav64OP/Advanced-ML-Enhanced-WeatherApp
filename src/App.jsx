import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Outlet } from "react-router-dom";
// import OtherCities from "./components/OtherCities";
// import OtherCitiesContainer from "./components/OtherCitiesContainer";


function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Outlet/>
      {/* <Home/> */}
    </div>
  );
}

export default App;
