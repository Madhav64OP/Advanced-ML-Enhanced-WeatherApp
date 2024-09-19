import React from "react";

function DayCard({day,temp,icon}) {
  // day=new Date(day.map((element)=>(new Date(element.valid_date).getDay())));
  return (
    <div
      id="main-daycard"
      className="flex-col bg-[#1B1B1D] h-[300px] w-[116.666px]  rounded-3xl ml-5 grid min-w-[90px]"
    >
      <div id="day-name" className="flex justify-center items-center text-[#E5E5E5]   text-2xl font-bold border-b-[#39393A] border-b-2" >
        <p>{day}</p>
      </div>
      <div id="icon" className="flex justify-center items-center " >
        <img src={`https://www.weatherbit.io/static/img/icons/${icon}.png`} className="w-16"/>
      </div>
      <div id="temp" className="flex justify-center items-center text-[#E5E5E5] text-2xl font-bold">
        <p className="font-medium text-xl antialiased">{temp}°C</p>
      </div>
    </div>
  );
}

export default DayCard;
