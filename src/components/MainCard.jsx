import React, { useEffect } from "react";
import "./MainCard.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../redux/slices/WeatherDataSlice";

function MainCard() {
  const dispatch = useDispatch();
  const WData = useSelector((state) => state.wData.mainData);
  const API2Data = useSelector((state) => state.wData.weekData);


  useEffect(() => {
    dispatch(fetchWeatherData());
  }, [dispatch]);

  if (!WData) {
    return <div>Loading ....</div>;
  }

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "SAT"];

  const weekDaysFull = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDay=new Date((WData.location.localtime).slice(0,10)).getDay()
  const dayName=weekDaysFull[currentDay];

  const currentTime = new Date((WData.location.localtime)).toLocaleTimeString('en-US',{
    hour:'numeric',
    minute:'numeric',
    // second:'numeric',
    hour12:true
  })
  // console.log(currentTime)

  // const dailyChanceOfain=WData.forecast.forecastday[0].day.daily_chance_of_rain
  // console.log(dailyChanceOfain)


  return (
    <div
      className="md:w-[480px] md:h-[300px] lg: lg:  aspect-auto flex-col bg-[#BBD7EC] rounded-3xl mt-4 sti"
      id="maincard-main fixed"
    >
      <div
        id="day-time"
        className="flex justify-between p-6 px-5 pt-6 bg-[#AECADF] rounded-3xl text-2xl rounded-br-none rounded-bl-none"
      >
        <p className="font-semibold md:text-xl text-lg">{dayName?dayName:""}</p>
        <p className="font-semibold md:text-xl text-lg">{currentTime?currentTime:""}</p>
      </div>
      <div id="temp-and-icon" className="flex justify-between px-3 pt-4 ">
        <p className="font-semibold md:text-7xl text-5xl">{API2Data.data[0].temp}°C</p>{/* {WData.current.temp_c}*/}
        <img
          src={WData.current.condition.icon?WData.current.condition.icon:""}
          alt="Status Icon"
          className="md:w-28 w-16  aspect-auto"
        />
        {/*./icons/Sunnny Windy Icon 1.png */}
      </div>
      <div id="lower_data" className="flex-col flex-wrap mt-[-17.5px]">
        <div id="data" className="flex justify-between px-3 pt-2">
          <p className="font-semibold tracking-wide md:text-lg text-sm ">{WData.current.condition.text?WData.current.condition.text:""}</p>
        </div>
        <div id="weather_status" className="flex gap-[10px] px-3 pt-[2.6px]">
          <p className="font-medium tracking-wide md:text-lg text-sm">Feels Like : </p>
          <p className="font-bold  md:text-lg text-sm">{((API2Data.data[0].app_max_temp+API2Data.data[0].app_min_temp)/2).toFixed(1)}°C</p>
        </div>
        <div id="weather_status" className="flex gap-[10px] p-3 pt-[2.6px]">
          <p className="font-medium tracking-wide md:text-lg text-sm">Current Precipitation : </p>
          <p className="font-bold  md:text-lg text-sm">
            {/* {dailyChanceOfain ===null ? "N/A": dailyChanceOfain} % */}
            {WData.current.precip_mm} mm
          </p>
          {/* {(WData.current.pressure_mb / 1013).toFixed(4)} atm */}
        </div>
        {/* <div id="weather_status" className="flex gap-[10px] px-3 pt-[2.6px]">
          <p className="font-medium tracking-wide text-lg ">Cloud Cover </p>
          <p className="font-bold  text-xl ">
            {(WData.current.pressure_mb / 1013).toFixed(4)} atm
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default MainCard;
