import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Prediction() {
  const [Temp, setTemp] = useState(null);
  const [Rain, setRain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadText, setLoadText] = useState("");
  const [isFetched, setIsFetched] = useState(false);

  const WData = useSelector((state) => state.wData.mainData);

  const loadingTextPopup = () => {
    if (loading) {
      setLoadText("Generating Results...");
    }
  };

  useEffect(() => {
    const savedTemp = localStorage.getItem("temp");
    const savedRain = localStorage.getItem("rain");
    const savedLoading = localStorage.getItem("loading");

    if (savedTemp) {
      setTemp(savedTemp);
    }
    if (savedRain) {
      setRain(savedRain);
    }
    if (savedLoading) {
      setLoading(JSON.parse(savedLoading));
    }
  }, []);

  const OnClickHandler = () => {
    const fetchPrediction = async () => {
      try {
        setLoading(true);
        setLoadText("Fetching data...");
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
          throw new Error("Response was not OK");
        }

        const data = await response.json();
        localStorage.setItem("temp", data.temperature.toFixed(2));
        localStorage.setItem("rain", data.rain.toFixed(2));
        localStorage.setItem("loading", false);
        setTemp(data.temperature.toFixed(2));
        setRain(data.rain.toFixed(2));
        setIsFetched(true);
      } catch (err) {
        setError(err);
        setIsFetched(false);
      } finally {
        setLoading(false);
        localStorage.setItem("loading", false);
      }
    };

    if (WData.location.lat && WData.location.lon) {
      fetchPrediction();
    }
  };

  return (
    <div className="flex flex-col items-center text-[#fff] px-52 pt-8 mt-10">
      <h1 className="text-5xl mb-5">Get Predictions using our latest Model</h1>

      <div className="flex items-center my-4">
        <button
          className="rounded-2xl bg-[#D8E9F9] text-[#111015] p-4 font-medium hover:opacity-65 transition-all duration-[279ms]"
          onClick={OnClickHandler}
        >
          <p className="text-xl">{loading ? "Generating..." : isFetched ? "Regenerate" : "Generate Now"}</p>
        </button>
      </div>

      {!loading ? (
        <div className="w-full h-[200px] bg-[#BBD7EC] rounded-3xl mr-24 flex-shrink-[0.5] min-w-[330px] justify-center items-center">
          <h1 className="text-3xl text-[#111015] font-normal flex justify-start mx-7 my-6">
            Tomorrow's Temp: {Temp}°C
          </h1>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center text-lg gap-2">
            <div className="w-[100px] h-[100px] animate-spin rounded-full border-[15px] border-t-transparent border-[#D8E9F9]"></div>
            <div className="text-3xl text-[#D8E9F9]">Getting Results...</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Prediction;
