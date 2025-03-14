import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { updateQuery, fetchWeatherData, fetchWeekData } from "../redux/slices/WeatherDataSlice";
import { NavLink } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
// import {} from "./OtherCitiesContainer"

function Navbar() {
  const [darkModeBtn, setDarkModeBtn] = useState("dark");
  const [login, setLogin] = useState(true);
  const [notification, setNotification] = useState(false);
  const [ourQuery, setOurQuery] = useState("");
  const [profileVisible, setProfileVisible] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionInput, setSuggestionInput] = useState("");
  const urlSugKey = import.meta.env.VITE_OPEN_WEATHER_KEY;
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

  const handleSuggestions = async (query) => {
    try {
      const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=15&appid=${urlSugKey}`);
      const data = await res.json();
      // console.log(data);
      setSuggestions(data);
    } catch (error) {
      // console.log("...");
      setSuggestions([]);

    }

  }

  const countries={
    "AF": "Afghanistan",
    "AX": "Aland Islands",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua And Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BA": "Bosnia And Herzegovina",
    "BW": "Botswana",
    "BV": "Bouvet Island",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory",
    "BN": "Brunei Darussalam",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "CV": "Cape Verde",
    "KY": "Cayman Islands",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos (Keeling) Islands",
    "CO": "Colombia",
    "KM": "Comoros",
    "CG": "Congo",
    "CD": "Congo, Democratic Republic",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "CI": "Cote D\"Ivoire",
    "HR": "Croatia",
    "CU": "Cuba",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "ET": "Ethiopia",
    "FK": "Falkland Islands (Malvinas)",
    "FO": "Faroe Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "TF": "French Southern Territories",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GG": "Guernsey",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HM": "Heard Island & Mcdonald Islands",
    "VA": "Holy See (Vatican City State)",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran, Islamic Republic Of",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IM": "Isle Of Man",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JE": "Jersey",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KR": "Korea",
    "KP": "North Korea",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Lao People\"s Democratic Republic",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libyan Arab Jamahiriya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macao",
    "MK": "Macedonia",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia, Federated States Of",
    "MD": "Moldova",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "AN": "Netherlands Antilles",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "MP": "Northern Mariana Islands",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestinian Territory, Occupied",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PN": "Pitcairn",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "RE": "Reunion",
    "RO": "Romania",
    "RU": "Russian Federation",
    "RW": "Rwanda",
    "BL": "Saint Barthelemy",
    "SH": "Saint Helena",
    "KN": "Saint Kitts And Nevis",
    "LC": "Saint Lucia",
    "MF": "Saint Martin",
    "PM": "Saint Pierre And Miquelon",
    "VC": "Saint Vincent And Grenadines",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome And Principe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "GS": "South Georgia And Sandwich Isl.",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SJ": "Svalbard And Jan Mayen",
    "SZ": "Swaziland",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syrian Arab Republic",
    "TW": "Taiwan",
    "TJ": "Tajikistan",
    "TZ": "Tanzania",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad And Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks And Caicos Islands",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States",
    "UM": "United States Outlying Islands",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "VG": "Virgin Islands, British",
    "VI": "Virgin Islands, U.S.",
    "WF": "Wallis And Futuna",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
  }

  useEffect(() => {
    if (ourQuery.trim === "") {
      setSuggestions([]);
      return;
    }
  }, [ourQuery]);


  const handleChangedValue = (e) => {
    const newQuery = e.target.value;
    setOurQuery(newQuery);
    setSuggestions([]);
    if (newQuery) {
      handleSuggestions(newQuery);
    }
    else {
      setSuggestions([]);
    }
    // handleSuggestions(ourQuery);
    // console.log(newQuery);
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
      setSuggestions([]);
    }
  };

  const handleSuggestionInput = (sug) => {
    setSuggestionInput(sug);
    // event.preventDefault();
    dispatch(updateQuery(sug.name));
    // dispatch(updateData())
    if (ourQuery !== "") dispatch(fetchWeatherData())
    if (ourQuery !== "") dispatch(fetchWeekData())
    setOurQuery("")
    setSuggestions([]);
    // console.log(suggestionInput);
  }

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
        className="w-full aspect-auto bg-[#111015] text-[#fefefe] flex items-center justify-between sticky  top-0 pt-2  z-20 mb-2 mt-1"
        id="main-nav"
      >
        <div id="hamburger-menu" className=" flex justify-center items-center sm:hidden p-3  gap-5">
          <button onClick={toggleMobileMenu} className="hover:cursor-pointer hover:opacity-50 transition-all duration-[279ms]">
            <i className="fa-solid fa-bars text-xl md:text-2xl"></i>
          </button>
          {/* <i className="fa-regular fa-compass  text-xl md:text-2xl flex sm:hidden"></i> */}
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
          className="p-1  justify-between items-center gap-4 hidden sm:flex  flex-none"
        >{/*flex-shrink-0 */}
          {!(WData.mainData === null) ? (
            <p className=" rounded-3xl px-2 tracking-tighter  max-w-[305px] flex items-center gap-2">
              <i className="fa-regular fa-compass  text-xl md:text-2xl "></i>{" "}<p className="hidden sm:flex">
                {WData.location.name ? WData.location.name : "Please"} , {WData.location.region ? WData.location.region : "enter valid"} , {WData.location.country ? WData.location.country : "query..."} </p>

            </p>
          ) : (
            <p className="p-[5px] rounded-3xl px-2 mr-2 ml-[-3px] max-w-[305px]">
              <i className="fa-regular fa-compass mr-[3px] sm:flex hidden"></i>
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
        <div className="search-and-cards">
          <div id="nav-search" className="flex relative flex-row-reverse items-center gap-2 mr-2 min-w-[52px] max-w-[300px] w-full border-solid rounded-2xl px-3 py-2 bg-[#1e1e1e] justify-between">
            <i className="fa-solid fa-magnifying-glass hover:cursor-pointer hover:opacity-70 transition-opacity duration-150" onClick={dataSearchHandler} />
            <input
              id="nav-searchbar"
              type="search"
              placeholder={window.innerWidth < 768 ? "" : "Search Here"}
              className="outline-none bg-transparent text-sm placeholder:text-gray-400 w-full"
              value={ourQuery}
              onChange={handleChangedValue}
              onKeyDown={dataSearchHandler}

            />
          </div>
          {suggestions.length > 0 && (
            <div id="cards" className="absolute w-full max-w-[226px] min-w-[52px] rounded-md overflow-hidden shadow-lg z-10">
              {
                suggestions.map((sug) => (
                  <div key={nanoid()} className="bg-[#1e1e1e] text-xs sm:text-sm py-2 px-3  font-normal text-[#D8E9F9] flex justify-start gap-1 items-baseline hover:cursor-pointer hover:text-opacity-50 transition-all duration-[279ms]" onClick={() => (
                    handleSuggestionInput(sug)
                  )}>
                    <p className="text-[12px]">{sug.name},</p>
                    {/* <div id="secondary-text" className="flex justify-start text-[8px]"> */}

                      <p className="text-[11px]">{sug.state},{" "}</p>
                      <p className="text-[11px]"> {countries[sug.country]}</p>
                    {/* </div> */}

                  </div>
                ))
              }
            </div>
          )}
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
      <div className="mx-3 mt-2 mb-3">
        <p className=" rounded-3xl text-[#e5e5e5] px-2 tracking-tighter md:text-2xl sm:hidden   max-w-[305px] flex items-center gap-2">
          <i className="fa-regular fa-compass   text-lg  md:text-2xl sm:hidden flex"></i>{" "}<p className="flex sm:hidden text-[#e5e5e5] text-sm font-[500]">
            {WData.location.name ? WData.location.name : "Please"} , {WData.location.region ? WData.location.region : "enter valid"} , {WData.location.country ? WData.location.country : "query..."} </p>
        </p>
      </div>

    </>
  );
}

export default Navbar;
