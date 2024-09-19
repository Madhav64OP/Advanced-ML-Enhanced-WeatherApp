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
      className="flex-col justify-center items-center gap-[40px] h-[350px] w-full p-60 text-[#fff] text-4xl flex-shrink-0"
    >
      <div  className={`flex items-center justify-center ${isVisibile}`} >
        Welcome to The App
      </div>
      <NavLink to="home" className={`flex items-center justify-center text-2xl mt-5 {isVisibile}`}>
        <button className="rounded-2xl bg-[#D8E9F9] text-[#111015] p-4 font-medium hover:opacity-65 transition-all duration-[279ms]" >
            {/* onClick={visibleHandler} */}
            <p >Lets Get Started</p>
        </button>
      </NavLink>
    </div>
  );
}

export default LandingPage;
