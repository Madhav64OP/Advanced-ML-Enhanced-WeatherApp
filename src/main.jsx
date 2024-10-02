import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import Maps from "./components/Maps.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Prediction from "./components/Prediction.jsx";
import AboutUs from "./components/AboutUs.jsx";

// basename: "/Advanced-ML-Enhanced-WeatherApp"},
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="home" element={<Home />} />
      {/* <Route path="next7days" element={}/> */}
      {/* </Route> */}
      <Route path="maps" element={<Maps />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="radar" element={<Prediction />} />
      <Route path="aboutus" element={<AboutUs />} />
    </Route>
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
