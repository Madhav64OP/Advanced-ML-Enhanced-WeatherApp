import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Prediction() {
  const [Temp, setTemp] = useState(null);
  const [Rain, setRain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const WData = useSelector((state) => state.wData.mainData);

  // useEffect(() => {
  const OnClickHandler = () => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
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

        setTemp(data.temperature.toFixed(2));
        setRain(data.rain.toFixed(2));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
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
    
      <div className="text-[#fff] flex-col justify-center items-center px-52 pt-8 mt-24">
        <h1 className="text-[#fff] text-5xl mb-5">
          Get Predictions using our ML Model
        </h1>
        {/* <div className="text-[#fff] flex-col justify-center items-center mt-32 "> */}
        <div className="flex  items-center my-4">
          <button
            className="rounded-2xl bg-[#D8E9F9] text-[#111015] p-4 font-medium hover:opacity-65 transition-all duration-[279ms]"
            onClick={OnClickHandler}
          >
            <p className="">Generate Now</p>
          </button>
        </div>
        {loading}
        <p>
          Temp tomorrow is {Temp} and rain tomorrow is {Rain}
        </p>
        {/* </div> */}
      </div>
    </>
  );
}

export default Prediction;
