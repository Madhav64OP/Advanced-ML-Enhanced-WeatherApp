import React from "react";
import { useSelector } from "react-redux";

function VisibilityTab() {

  const WData=useSelector((state)=> state.wData.mainData)

  return (
    <div className="flex-col justify-center items-center bg-[#1B1B1D] w-[360px] h-[262px] rounded-3xl text-[#fff] font-medium text-xl p-8 mt-7 max-h-[262px] min-w-[300px]">
      <div className="flex justify-between font-[480] ">
        <h3>Visibility</h3>
        <div className="font-medium text-2xl">{WData.current.vis_km?WData.current.vis_km:"_"} km</div>
      </div>
      <div id="icon" className="flex justify-center items-center">
        <img src="./icons/Visibility Icon 1.png" alt="Visibility Icon" />
      </div>
      <div id="visibility-data" className="flex">
        <div
          id="haze-detail"
          className="flex mt-8 justify-evenly items-center px-6 font-semibold"
        >
          <img src="./icons/eye-outline.png" />
          {WData.current.vis_km < 1  && WData.current.vis_km?(<p className="ml-2 text-[#818085]">Haze is affecting visibility</p>):
          (<p className="ml-2 text-[#818085]">Visibility is Perfect</p>)}
        </div>
      </div>
    </div>
  );
}

export default VisibilityTab;
