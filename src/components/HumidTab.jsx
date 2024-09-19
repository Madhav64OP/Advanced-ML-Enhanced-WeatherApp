import React from "react";
import { useSelector } from "react-redux";

function HumidTab() {
  const WData=useSelector((state)=> state.wData.mainData)

  return (
    <div className="flex-col justify-center items-center bg-[#1B1B1D] w-[360px] h-[262px] rounded-3xl text-[#fff] font-medium text-xl p-8 mt-7 max-h-[262px] min-w-[300px]">
      <div className="flex justify-between font-[480]">
        <h3>Humidity</h3>
        <div className="font-medium text-2xl">{WData.current.humidity?WData.current.humidity:"_"}%</div>
      </div>
      <div id="icon" className="flex justify-center items-center">
        <img src="./icons/carbon_humidity-alt.png" alt="Humidity Icon" />
      </div>
      <div id="humid-data" className="flex">
        <div id="dew-point" className="flex mt-8 justify-evenly items-center px-6 font-semibold">
          <img src="./icons/Humidity Icon 1.png" />
          <p className="ml-2 text-[#818085]">The dew point is {WData.current.dewpoint_c?WData.current.dewpoint_c:"_"}°C</p>
        </div>
      </div>
    </div>
  );
}

export default HumidTab;
