import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { updateQuery, fetchWeatherData, fetchWeekData } from "../redux/slices/WeatherDataSlice";
import { NavLink } from "react-router-dom";
// import {} from "./OtherCitiesContainer"

function Navbar() {
  const [darkModeBtn, setDarkModeBtn] = useState("dark");
  const [login, setLogin] = useState(true);
  const [notification, setNotification] = useState(false);
  const [ourQuery, setOurQuery] = useState("");
  const [profileVisible, setProfileVisible] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [notificationEnable, setNotificationEnable] = useState("hidden")

  const popupRef = useRef(null);
  const notificationRef = useRef(null);
  const popupLoginRef = useRef(null);

  const dispatch = useDispatch();
  const WData = useSelector((state) => state.wData.mainData);
  // console.log(WData);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const onClickHandler = () => {
    if (darkModeBtn === "dark") {
      setDarkModeBtn("light");
      // document.body.style.backgroundColor="#fefefe"
      // document.body.style.color="#111015"
    } else {
      setDarkModeBtn("dark");
      // document.body.style.backgroundColor="#111015"
      // document.body.style.color="#fefefe"
    }
  };

  const dataSearchHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(updateQuery(ourQuery));
      // dispatch(updateData())
      if (ourQuery !== "") dispatch(fetchWeatherData())
      if (ourQuery !== "") dispatch(fetchWeekData())
      setOurQuery("")
    }
  };

  // useEffect(() => {
  //   const navSearch=document.querySelector("#nav-search");
  //   navSearch.addEventListener(dataSearchHandler)
  // }, [])


  const checkAnywhereClick = (e) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(e.target) &&
      popupLoginRef.current &&
      !popupLoginRef.current.contains(e.target)
    ) {
      // setProfileStyle({visibility:"hidden",transition:"visibility 200ms"})
      setProfileVisible("hidden");
    }
  };

  const profileClickHandler = () => {
    profileVisible ? setProfileVisible("") : setProfileVisible("hidden");
  };

  const notificationClickHandler = () => {
    // notificationEnable ? setNotificationEnable("") : setNotificationEnable("hidden");
    notification ? setNotification(false) : setNotification(true);
    // console.log(notification)
  };


  useEffect(() => {
    document.addEventListener("click", checkAnywhereClick, true);
    return () => {
      document.removeEventListener("click", checkAnywhereClick, true);
    };
  }, []);


  useEffect(() => {
    if (WData && WData.mainData) {
      // console.log(WData.mainData);
    }
  }, [WData]);

  // if(!WData.location.name){
  //   WData.location.name="Enter Vaild Name"
  // }

  return (
    <>
      <div
        className="w-full aspect-auto bg-[#111015] text-[#fefefe] flex items-center justify-between sticky  top-0 pt-2  z-20 mb-2 "
        id="main-nav"
      >
        <div id="hamburger-menu" className=" flex justify-center items-center sm:hidden p-3  gap-5">
          <button onClick={toggleMobileMenu} className="hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms]">
            <i className="fa-solid fa-bars text-xl md:text-2xl"></i>
          </button>
          <i className="fa-regular fa-compass  text-xl md:text-2xl flex sm:hidden"></i>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed top-0 left-0 h-full w-2/3 p-5 z-50 bg-[#111015] text-[#fefefe] shadow-lg">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold">Menu</h2>
              <i
                className="fa-solid fa-times text-2xl cursor-pointer"
                onClick={toggleMobileMenu}
              ></i>
            </div>
            <div className="flex flex-col gap-4 text-lg">
              <NavLink to="home" className={({ isActive }) => `hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] ${isActive ? "opacity-40" : ""}`}>Home</NavLink>

              <NavLink to="maps" className={({ isActive }) => `hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] ${isActive ? "opacity-40" : ""}`}>Maps</NavLink>
              <NavLink to="aboutus" className={({ isActive }) => `hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] ${isActive ? "opacity-40 " : ""}`}>About Us</NavLink>
              <NavLink to="radar" className={({ isActive }) => `hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] ${isActive ? "opacity-40" : ""}`}>Prediction <i className="fa-solid fa-wand-magic-sparkles"></i></NavLink>
            </div>
          </div>
        )}

        <div
          id="nav-curr-loc"
          className="p-1 flex justify-between items-center gap-4  flex-none"
        >{/*flex-shrink-0 */}
          {!(WData.mainData === null) ? (
            <p className=" rounded-3xl px-2 tracking-tighter  max-w-[305px] flex items-center gap-2">
              <i className="fa-regular fa-compass  text-xl md:text-2xl hidden sm:flex"></i>{" "}<p className="hidden sm:flex">
                {WData.location.name ? WData.location.name : "Please"} , {WData.location.region ? WData.location.region : "enter valid"} , {WData.location.country ? WData.location.country : "query..."} </p>

            </p>
          ) : (
            <p className="p-[5px] rounded-3xl px-2 mr-2 ml-[-3px] max-w-[305px]">
              <i className="fa-regular fa-compass mr-[3px]"></i>
            </p>
          )}

          <p className=" hidden sm:flex" id="dark-light-btn">
            <label
              htmlFor="check"
              className="bg-[#19191b] relative w-[56px] h-[28px] rounded-full cursor-pointer border-2 border-[#626161] top-[1.6px]"
            >
              <input
                type="checkbox"
                id="check"
                className="sr-only peer"
                onClick={onClickHandler}

              />
              <span className="w-2/5 h-4/5 bg-[#D8E9F9] absolute rounded-full flex top-[2.9px] left-[2px] p-1 peer-checked:left-[26.5px] peer-checked:bg-[#D8E9F9] transition-all duration-300 justify-center items-center">
                {darkModeBtn === "dark" ? (
                  <i className="fa-regular fa-sun text-[#1E1E1E]"></i>
                ) : (
                  <i className="fa-regular fa-moon text-[#1E1E1E]"></i>
                )}
              </span>
            </label>
          </p>
        </div>
        <div id="navigations" className="ml-48 mr-12 hidden sm:flex">{/*flex-shrink-0 */}
          <ul className="flex justify-center items-center gap-6">
            <li className="hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms]">
              <NavLink to="home" className={({ isActive }) => `hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] ${isActive ? "opacity-40" : ""}`}>Home</NavLink>
            </li>
            <li className="hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms]">
              <NavLink to="maps" className={({ isActive }) => `hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] ${isActive ? "opacity-40" : ""}`}>Maps</NavLink>
            </li>
            <li className="hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] flex-shrink-0">
              <NavLink to="aboutus" className={({ isActive }) => `hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] ${isActive ? "opacity-40 " : ""}`}>About Us</NavLink>
            </li>
            <li className="hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] flex-shrink-0">
              <NavLink to="radar" className={({ isActive }) => `hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] ${isActive ? "opacity-40" : ""}`}>Prediction <i className="fa-solid fa-wand-magic-sparkles"></i></NavLink>
            </li>
          </ul>
        </div>
        <div id="nav-search" className="flex flex-row-reverse items-center gap-2 mr-2 sm:w-[90px] md:w-[300px] lg:w-[400px] border-solid rounded-2xl px-3 py-2 bg-[#1e1e1e] justify-between">
          <i className="fa-solid fa-magnifying-glass hover:cursor-pointer hover:opacity-70 transition-opacity duration-150" onClick={dataSearchHandler} />
          <input
            id="nav-searchbar"
            type="search"
            placeholder={window.innerWidth < 768 ? "" : "Search Here"}
            className="outline-none bg-transparent text-sm placeholder:text-gray-400 w-full"
            value={ourQuery}
            onChange={(e) => setOurQuery(e.target.value)}
            onKeyDown={dataSearchHandler}
          />
        </div>

        <div id="nav-profile" className="flex justify-center items-center">{/*flex-shrink-0 */}
          <ul
            id="nav-notification-profile"
            className="flex gap-2 justify-center items-center"
          >
            <li className="rounded-full bg-[#1e1e1e] px-[0.8rem] py-[0.5rem] hover:cursor-pointer" onClick={notificationClickHandler} onTouchMoveCapture={notificationClickHandler}>
              <button >
                <i className="fa-regular fa-bell"></i>
              </button>
            </li>
            {notification ? <div
              id="popup"
              ref={notificationRef}
              className={`bg-[#1e1e1e]  w-[220px] absolute right-[87.5px] top-[60px] rounded-2xl p-3 text-[#fff]  border-[1.8px] border-solid ${notification ? "" : "hidden"
                }`}
            ><p className="text-[#fff]">No new notifications</p>
            </div> : ""}
            <li
              className="rounded-full bg-[#1e1e1e] px-[0.8rem] py-[0.5rem] hover:cursor-pointer "
              onClick={profileClickHandler}
              onTouchMoveCapture={profileClickHandler}
            >
              <button>
                <i className="fa-regular fa-user"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
      {login ? (
        <div
          id="popup"
          ref={popupRef}
          className={`bg-[#1e1e1e]  w-[220px] absolute right-[37.5px] rounded-2xl p-3 text-[#fff] z-30 border-[1.8px] border-solid ${profileVisible ? "" : "hidden"
            }`}
        >
          <div id="profile_menu" className="flex-col " ref={popupRef}>
            <div
              id="profile_header"
              className="flex items-center p-2 justify-center mt-[-10px] gap-2"
            >
              {/*flex justify-center items-center my-[8px] */}
              <img
                src="./Profile images/profile.png"
                alt=""
                className="rounded-full bg-[#e5e5e5] p-2 w-14"
              />
              <h2>Profile Name</h2>
            </div>
            <hr className="h-[1px] w-full mt-2 mb-3" />
            <a
              id="option1"
              href="/"
              className="flex
             items-center hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] mb-2"
            >
              <img
                src="./Profile images/profile.png"
                alt=""
                className="rounded-full bg-[#e5e5e5] p-1 w-8 mr-2 "
              />
              <h3 className="w-full ">Edit Profile</h3>
              <span>{">"}</span>
            </a>
            <a
              id="option1"
              href="/"
              className="flex
             items-center hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] mb-2"
            >
              <img
                src="./Profile images/setting.png"
                alt=""
                className="rounded-full bg-[#e5e5e5] p-1 w-8 mr-2 "
              />
              <h3 className="w-full ">Settings</h3>
              <span>{">"}</span>
            </a>
            <a
              id="option1"
              href="/"
              className="flex
             items-center hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] mb-2"
            >
              <img
                src="./Profile images/help.png"
                alt=""
                className="rounded-full bg-[#e5e5e5] p-1 w-8 mr-2 "
              />
              <h3 className="w-full ">Help</h3>
              <span>{">"}</span>
            </a>
            <a
              id="option1"
              className="flex
             items-center hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms] mb-2"
              onClick={() => setLogin(false)}
              onTouchMoveCapture={() => setLogin(false)}
            >
              <img
                src="./Profile images/logout.png"
                alt=""
                className="rounded-full bg-[#e5e5e5] p-1 w-8 mr-2 "
              />
              <h3 className="w-full ">Logout</h3>
              <span>{">"}</span>
            </a>
          </div>
        </div>
      ) : (
        <div
          id="popup_login"
          ref={popupLoginRef}
          className={`bg-[#1e1e1e]  w-[220px] absolute right-[37.5px] rounded-2xl p-3 text-[#fff] z-30 border-[1.8px] border-solid border-[#D8E9F9] ${login ? "hidden" : ""
            } ${profileVisible ? "" : "hidden"}`}
        >
          <div id="profile_menu" className="flex-col ">
            {/* <hr className="h-[1px] w-full mt-2 mb-3" /> */}
            <div
              id="login_option"
              className="flex
             items-center justify-center hover:cursor-pointer hover:opacity-65 transition-all duration-[279ms]"
            >
              {/* <img src="./Profile images/profile.png" alt="" className="rounded-full bg-[#e5e5e5] p-1 w-8 mr-2 "/> */}
              <div
                id="login_button"
                className="bg-[#D8E9F9] rounded-2xl p-4 text-[#1E1E1E] font-medium"
                onClick={() => setLogin(true)}
                onTouchMoveCapture={() => setLogin(true)}
              >
                <h3 className="w-full justify-center flex items-center">
                  <button id="login_buttton_op">Login Now</button>
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
