import React, { useEffect, useState } from "react";
import TT7 from "./TT7";
import MainCard from "./MainCard";
import "./Home.css";
import DayCard from "./DayCard";
import HumidTab from "./HumidTab";
import VisibilityTab from "./VisibilityTab";
import WindTab from "./WindTab";
import OtherCitiesContainer from "./OtherCitiesContainer";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

function Home() {

  // const WData=useSelector((state)=>state.wData.mainData)

  const week = [ "SUN", "MON", "TUE", "WED", "THU","FRI","SAT"];

  const WeekData=useSelector((state)=>state.wData.weekData);

  let WeekDaysData=[WeekData.data[1],WeekData.data[2],WeekData.data[3],WeekData.data[4],WeekData.data[5],WeekData.data[6]];

  // const weekCurrentDay=WeekDaysData.map((element)=>(new Date(element.valid_date).getDay()));
  const next7DaysData=useSelector((state)=>state.Next7Days)
  const [next7days, setnext7days] = useState(next7DaysData)

  useEffect(() => {
    setnext7days(next7DaysData);
  }, [next7DaysData]) 
  
  return (
    <div id="home">
      <TT7/>
      <div
        id="temp-cards-home"
        className="flex justify-between items-center mt-[30px] mx-[40px]"
      >
        <MainCard />
        {!next7DaysData && WeekDaysData.map((day) => (
          <DayCard day={week[new Date(day.valid_date).getDay()]} key={nanoid()} temp={day.temp} icon={day.weather.icon}/>            
        ))}
        {/*dayTemp={daytemp} */}
      </div>
      <div className="flex justify-between items-center gap-5 mx-[40px]  pt-7" id="app_dashboard">
        <HumidTab />
        <VisibilityTab />
        <WindTab />
        <OtherCitiesContainer />
      </div>
    </div>
  );
}

export default Home;
