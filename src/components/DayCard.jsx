import React from "react";

function DayCard({day,temp,icon}) {
  // day=new Date(day.map((element)=>(new Date(element.valid_date).getDay())));
  return (
    <div
      id="main-daycard"
      className="flex-col bg-[#1B1B1D] md:h-[300px] md:w-[100px]  w-[70px] h-[210px] rounded-2xl  grid "
    >
      <div id="day-name" className="flex justify-center items-center text-[#E5E5E5]  text-base sm:text-lg md:text-xl font-bold border-b-[#39393A] border-b-2" >
        <p>{day}</p>
      </div>
      <div id="icon" className="flex justify-center items-center " >
        <img src={`https://www.weatherbit.io/static/img/icons/${icon}.png`} className="md:w-16 w-10 aspect-auto"/>
      </div>
      <div id="temp" className="flex justify-center items-center  text-[#E5E5E5] text-base sm:text-lg md:text-xl font-bold">
        <p className="font-medium  antialiased">{temp}°C</p>
      </div>
    </div>
  );
}

export default DayCard;
