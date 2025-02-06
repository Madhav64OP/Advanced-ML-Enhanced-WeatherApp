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
    <div className="flex flex-col items-center text-[#fff] px-6 pt-8 mt-10">
      <h1 className="text-3xl sm:text-3xl text-left md:text-5xl mb-5 font-[500]">Get Predictions with our Latest Model</h1>

      <div className="flex items-center my-4">
        <button
          className="rounded-2xl bg-[#D8E9F9] text-[#111015] p-4 font-medium hover:opacity-65 transition-all duration-[279ms]"
          onClick={OnClickHandler}
        >
          <p className="text-xl">{loading ? "Generating..." : isFetched ? "Regenerate" : "Generate Now"}</p>
        </button>
      </div>

      <div className="text-lg sm:text-xl md:text-2xl text-[#D8E9F9] text-left font-normal flex justify-between gap-4 mx-7 my-6 border-[2px] px-5 py-4 hover:scale-[1.05] transition-all duration-300 hover:cursor-pointer rounded-xl">
        {!loading ? (
          // <div className="w-full h-[200px] bg-[#BBD7EC] rounded-3xl mr-24 flex-shrink-[0.5] min-w-[330px] justify-center items-center">
          <div className="flex flex-row  justify-center items-center">
            <p>Tomorrow's Predicted Temp</p>
            <p className="flex justify-center items-center font-semibold">{Temp}°C</p>

          </div>

          // {/* </div> */}
        ) : (
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center text-lg gap-2">
              <div className="w-8 sm:w-[60px] md:w-[100px] aspect-square animate-spin rounded-full border-[5px] border-t-transparent border-[#D8E9F9]"></div>
              <div className="text-base sm:text-xl md:text-3xl text-[#D8E9F9] ">Getting Results...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Prediction;
