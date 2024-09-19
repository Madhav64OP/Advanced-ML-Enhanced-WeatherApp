import React, { useEffect, useState } from "react";
import OtherCities from "./OtherCities";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSecondaryWeatherData,
  updateQuery2,
} from "../redux/slices/WeatherDataSlice";

function OtherCitiesContainer() {
  const [cityData, setCityData] = useState({
    delhi:null,
    mumbai:null,
    chennai:null
  })

  const fetchStaticData = async (query) => {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=9593595eee804c038e862030240803&q=${query}&days=7&aqi=yes&alerts=yes`
    );
    if(!response.ok) throw new Error("Some problem is there");
    return await response.json();
  };
  
  useEffect(()=>{
    const fetchAllData = async()=>{
      try{
        const delhiData=await fetchStaticData("New Delhi");
        const mumbaiData=await fetchStaticData("Mumbai");
        const chennaiData=await fetchStaticData("Chennai");

        setCityData({
          delhi:delhiData,
          mumbai:mumbaiData,
          chennai:chennaiData
        })
      }
      catch(err){
        console.log(err);
      }
    }
    fetchAllData();
  },[])

  // console.log(cityData)
  // let DelhiData = null;
  // let MumbaiData = null;
  // let ChennaiData = null;

  // const DMCdata = async () => {
  //   DelhiData = await fetchStaticData("New Delhi");
  //   MumbaiData = await fetchStaticData("Mumbai");
  //   ChennaiData = await fetchStaticData("Chennai");
  // };
  // useEffect(() => {
  //   DMCdata();
  // }, []);

  // console.log(DMCdata.DelhiData);
  // console.log(DMCdata.MumbaiData);
  // console.log(DMCdata.ChennaiData);

  return (
    <div className="grid gap-3 mb-[-50px] text-[#fff] px-4 mt-[-70.5px] min-w-[250px]">
      <div id="heading_city_dashboard" className="flex justify-between">
        <h4>Other Cities</h4>
        <p className="hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms]">See All</p>
      </div>
      {/* {WData.map((eachCityData,index)=>(
        <OtherCities key={index} data={eachCityData}/>
      ))} */}
      <OtherCities  data={cityData.delhi}/>{/* data={DMCdata.DelhiData}*/}
      <OtherCities  data={cityData.mumbai}/>{/* data={DMCdata.DelhiData}*/}
      <OtherCities  data={cityData.chennai}/>{/* data={DMCdata.DelhiData}*/}
      {/* <OtherCities data={DMCdata.MumbaiData} />
      <OtherCities data={DMCdata.ChennaiData} /> */}
    </div>
  );
}

export default OtherCitiesContainer;
