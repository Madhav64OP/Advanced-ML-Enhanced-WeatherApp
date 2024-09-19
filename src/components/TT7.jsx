import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { daysDataHandler } from "../redux/slices/WeatherDataSlice";
import { NavLink } from "react-router-dom";

function TT7() {
  // const next7days=useSelector((state)=>state.Next7Days)
  // const [nextDaysData, setNextDaysData] = useState(next7days)

  const dispatch=useDispatch();

  // if(nextDaysData){
  //   dispatch(next7days=false)
  // }

  return (
    <>
      <div>
        <div className="flex bg-[#111015] gap-4 pl-[22.5px] w-full sticky overflow-hidden h-auto ">
          <NavLink className={({isActive})=>`hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] text-[#fff] ${isActive ? "opacity-40":"" }`} to={"/"}>
            Today
          </NavLink>
          <NavLink className={({isActive})=>`hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] text-[#fff] ${isActive ? "opacity-40":"" }`} to={"/"}>
            Tomorrow
          </NavLink>
          <NavLink
            className={({isActive})=>`hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] text-[#fff] ${isActive ? "opacity-40":"" }`}
            onClick={()=> (dispatch(daysDataHandler()))} to={"/home"}
          >
            Next 7 days
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default TT7;
