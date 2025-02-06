import React from "react";
import { useSelector } from "react-redux";

function HumidTab() {
  const WData=useSelector((state)=> state.wData.mainData)

  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-[#1B1B1D] w-[241px] h-[150px] sm:w-[241px] sm:h-[198px] rounded-3xl text-[#fff] font-medium text-xl  py-3 md:p-8  md:h-[262px] md:w-[300px] flex-shrink">
      <div className="flex justify-between gap-5 font-[480] text-sm sm:text-lg md:text-2xl">
        <h3>Humidity</h3>
        <div className="font-medium text-sm sm:text-lg  md:text-2xl">{WData.current.humidity?WData.current.humidity:"_"}%</div>
      </div>
      <div id="icon" className="flex justify-center items-center">
        <img src="./icons/carbon_humidity-alt.png" alt="Humidity Icon" className="w-10 md:w-fit"/>
      </div>
      <div id="humid-data" className="flex gap-2 justify-evenly items-center px-6 font-semibold">
        {/* <div id="dew-point" className="flex mt-8 gap-2 justify-evenly items-center px-6 font-semibold"> */}
          <img src="./icons/Humidity Icon 1.png" />
          <p className=" text-[#818085] text-xs sm:text-sm  md:text-base">The dew point is {WData.current.dewpoint_c?WData.current.dewpoint_c:"_"}°C</p>
        {/* </div> */}
      </div>
    </div>
  );
}

export default HumidTab;
