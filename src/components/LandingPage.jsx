import React, { useState,} from "react";
import { NavLink } from "react-router-dom";


function LandingPage() {

    const [isVisibile, setIsVisibile] = useState("")

    const visibleHandler=()=>{
        if(isVisibile===""){
            setIsVisibile("hidden")
        }
        else if(isVisibile==="hidden"){
            setIsVisibile("")
        }
    }

  return (
    <div
      id="landing_page"
      className="flex-col justify-center items-center gap-[40px] py-16  w-full  text-[#fff] text-2xl sm:text-3xl md:text-4xl flex-shrink jus"
    >
      <div  className={`flex items-center justify-center ${isVisibile}`} >
        Welcome to The App
      </div>
      <NavLink to="home" className={`flex items-center justify-center text-lg sm:text-xl md:text-3xl mt-5 {isVisibile}`}>
        <button className="rounded-2xl bg-[#D8E9F9] text-[#111015] p-4 font-medium hover:opacity-65 transition-all duration-[279ms]" >
            {/* onClick={visibleHandler} */}
            <p >Lets Get Started</p>
        </button>
      </NavLink>
    </div>
  );
}

export default LandingPage;
