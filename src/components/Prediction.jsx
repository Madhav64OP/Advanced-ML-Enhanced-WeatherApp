import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Prediction() {
  const [Temp, setTemp] = useState(null);
  const [Rain, setRain] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [loadText, setLoadText] = useState("")
  const [isFetched, setIsFetched] = useState(false)

  const WData = useSelector((state) => state.wData.mainData);

  // useEffect(() => {
  const loadingTextPopup=()=>{
    if(loading){
      setLoadText("Generating Results");
    }
  }

  // if(loading==false){

  // }
  // useEffect(() => {
  //   if(loading===true){
  //     setBtngenerate("Generating");
  //   }
  //   else if(loading==false){
  //     setBtngenerate("Regenetate");
  //   }
  // }, [])
  

useEffect(() => {
  const savedTemp=localStorage.getItem("temp");
  const savedRain=localStorage.getItem("rain");
  const savedLoading=localStorage.getItem("loading");

  if(savedTemp){
    setTemp(savedTemp);
  }
  if(savedRain){
    setRain(savedRain);
  }
  if(savedLoading){
    setLoading(JSON.parse(savedLoading));
  }
  
}, [])


  const OnClickHandler = () => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch("https://render-ml-weather-predictor.onrender.com/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: WData.location.lat,
            longitude: WData.location.lon,
          }),
        });

        if (!response.ok) {
          throw new Error("Response Was not OK");
        }

        const data = await response.json();
        console.log(data);
        localStorage.setItem("temp",data.temperature.toFixed(2));
        localStorage.setItem("rain",data.rain.toFixed(2));
        localStorage.setItem("loading",false);
        setTemp(data.temperature.toFixed(2));
        setRain(data.rain.toFixed(2));
        setIsFetched(true);
      } catch (err) {
        setError(err);
        setIsFetched(false);
      } finally {
        setLoading(false);
        localStorage.setItem("loading",false);
      }
    };

    if (WData.location.lat && WData.location.lon) {
      fetchPrediction();
    }
  };
  // }, [WData]);

  // if (loading == true) {
  //   return (
  //     <div className="text-[#fff] flex justify-center items-center mt-32 ">
  //       {" "}
  //       Generating Results
  //     </div>
  //   );
  // }
  return (
    <>
      <div className="text-[#fff] flex-col justify-center items-center px-52 pt-8 mt-10">
        <h1 className="text-[#fff] text-5xl mb-5">
          Get Predictions using our ML Model
        </h1>
        {/* <div className="text-[#fff] flex-col justify-center items-center mt-32 "> */}
        <div className="flex  items-center my-4">
          <button
            className="rounded-2xl bg-[#D8E9F9] text-[#111015] p-4 font-medium hover:opacity-65 transition-all duration-[279ms]"
            onClick={OnClickHandler}
          >
            <p className="text-xl font-normal	" onClick={loadingTextPopup}
            > {loading? "Generating...":
            isFetched?(<p>Regenerate <i className="fa-solid fa-arrows-spin"></i></p>):"Generate Now"}</p>
          </button>
          </div>
          { !loading? 
          <div
            className="w-full h-[200px] flex-col bg-[#BBD7EC] rounded-3xl mr-24 flex-shrink-[0.5] overflow-hidden min-w-[330px]"
            id="maincard-main fixed"
          >
            <h1 className="text-3xl text-[#111015] font-normal flex justify-start mx-7 my-6">Tomorrow's Temp : {Temp}°C</h1>
            <h1 className="text-3xl text-[#111015] font-normal flex justify-start mx-7 my-6">Tomorrow's Rain : {Rain}mm</h1>
          </div>: <h1>{loadText}</h1>}
  
        {/* {} */}
        {/* <p>
          Temp tomorrow is {Temp} and rain tomorrow is {Rain}
        </p> */}
        {/* </div> */}
      </div>
    </>
  );
}

export default Prediction;
