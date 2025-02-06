import React from "react";
import { useSelector } from "react-redux";

function WindTab() {

  const WData=useSelector(state => state.wData.mainData)
  let finalWindDir=""

  const windDir=String(WData.current.wind_dir?WData.current.wind_dir:"_")
  windDir.length <3 ? finalWindDir=windDir : finalWindDir=windDir[0]+"/"+ windDir[1]+windDir[2]

  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-[#1B1B1D] w-[241px] h-[150px] sm:w-[241px] sm:h-[198px] rounded-3xl text-[#fff] font-medium text-xl  py-3 md:p-8  md:h-[262px] md:w-[300px] flex-shrink">
      <div className="flex justify-between gap-5 font-[480] text-sm sm:text-lg md:text-2xl">
        <h3 >Wind Speed</h3>
        <div className="font-medium text-sm sm:text-lg  md:text-2xl">{WData.current.wind_kph?WData.current.wind_kph:"_"} km/h</div>
      </div>
      <div id="icon" className="flex justify-center items-center">
        <i className="fa-solid fa-wind fa-2xl text-2xl sm:text-4xl md:text-6xl"></i>
      </div>
      <div id="wind-data" className="flexjustify-between items-center text-[#818085]">
        <h3 className=" text-[#818085] text-xs sm:text-sm  md:text-base">Direction of Wind </h3>
        <p className=" text-[#818085] text-xs sm:text-sm  md:text-base">{finalWindDir?finalWindDir:""}</p>
      </div>
    </div>
  );
}

export default WindTab;
