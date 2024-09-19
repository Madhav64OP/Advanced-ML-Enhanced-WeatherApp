import React from "react";
import { useSelector } from "react-redux";

function WindTab() {

  const WData=useSelector(state => state.wData.mainData)
  let finalWindDir=""

  const windDir=String(WData.current.wind_dir?WData.current.wind_dir:"_")
  windDir.length <3 ? finalWindDir=windDir : finalWindDir=windDir[0]+"/"+ windDir[1]+windDir[2]

  return (
    <div className="flex-col justify-center items-center bg-[#1B1B1D] w-[360px] h-[262px] rounded-3xl text-[#fff] font-medium text-xl p-8 mt-7 max-h-[262px]  min-w-[300px]">
      <div className="flex justify-between font-[480] gap-5 ml-[-7px]">
        <h3 className="flex-shrink-0">Wind Speed</h3>
        <div className="font-medium text-2xl flex-shrink-0">{WData.current.wind_kph?WData.current.wind_kph:"_"} km/h</div>
      </div>
      <div id="icon" className="flex justify-center items-center">
        <p className="text-3xl pt-[45.4px]"><i className="fa-solid fa-wind fa-2xl"></i></p>
      </div>
      <div
        id="wind-data"
        className="flex mt-8 justify-between items-center text-[#818085] p-2 pt-[20px]"
      >
        <h3>Direction of Wind </h3>
        <div className="">{finalWindDir?finalWindDir:""}</div>
          
      </div>
    </div>
  );
}

export default WindTab;
