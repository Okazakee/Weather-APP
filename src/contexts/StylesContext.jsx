import { createContext, useState } from "react";

const StylesContext = createContext();

const StylesProvider = ({ children }) => {
  // State management for navbar button selection
  const [selectedIcons, SetSelectedIcons] = useState([true, false, false]);
  const [isMobile, SetIsMobile] = useState(true);

  // Navbar button selection handler
  const updateSelectedIcon = (index) => {
    SetSelectedIcons((prevSelectedIcons) => {
      const newSelectedIcons = prevSelectedIcons.map((icon, i) => i === index);
      return newSelectedIcons;
    });
  };

  // TAILWIND STYLES
  const layout = {
    root: `bg-[#f1f1f1] min-h-screen mx-auto font-sans hideTouchInputChrome ${
      isMobile ? "" : "pb-10 px-36"
    }`,
    navbar: "sm:hidden",
  };

  const weatherStyle = {
    Rain: "bg-gradient-to-r from-[#575f64] to-[#8f9eae]",
    Clouds: "bg-gradient-to-r from-[#6b7f9f] to-[#99aebf]",
    Clear: "bg-gradient-to-r from-[#577ce8] to-[#32b0f3]",
    Drizzle: "bg-gradient-to-r from-[#122f70] to-[#4a85c9]",
    Snow: "bg-gradient-to-r from-[#e8f7fd] to-[#d1ecf8]",
    Thunderstorm: "bg-gradient-to-r from-[#424874] to-[#9eabb2]",
    Atmosphere: "bg-gradient-to-r from-[#9fa4b1] to-[#e3e6ea]",
  };

  const navStyles = {
    navbar:
      "overflow-hidden bg-white mx-5 text-center rounded-3xl drop-shadow-xl flex justify-around fixed bottom-5 left-0 right-0 z-50",
    div1: (i) =>
      `cursor-pointer px-5 py-[1.1rem] transition-all duration-200 transform-gpu border-b-2 ${
        selectedIcons[i] ? "border-[#01175f]" : "border-white"
      }`,
    buttons: (i) =>
      `transition-all duration-200 transform-gpu w-7 h-7 hover:text-[#01175f] ${
        selectedIcons[i] ? "text-[#01175f]" : "text-[#787a94]"
      }`,
  };

  const HomeStyles = {
    homeWrapper: `${isMobile ? "" : "flex max-w-6xl mx-auto pt-10"}`,
    firstZone: `ml-10 basis-2/3`,
    topLeft: "h-[22rem] mb-4 drop-shadow-xl",
    downLeft: "flex h-[50%]",
    widgetWrapper: "flex flex-wrap",
    widgetZoneLeft: "mt-8 basis-1/3",
    hourlyLineDesktop: "rounded-3xl text-white py-5 h-[19rem] overflow-auto hideScrollbar text-center",
    widgetZoneRight: "mt-8 basis-2/3",
    labelLeft: "ml-4 mb-5 text-[#01175f] font-semibold text-2xl",
    labelRight: "ml-16 text-[#01175f] font-semibold text-2xl",
    nowLabel: "font-bold",
    secondZone: `ml-auto basis-1/3`,
    div1: `${isMobile ? "text-center pt-10 text-[#01175f]" : "hidden"}`,
    cardWrapper: ` ${isMobile ? "pb-28" : "mx-5"}`,
    addCityButtonDiv: `cursor-pointer flex items-center w-fit mx-auto text-[#01175f] ${
      isMobile ? "pt-10 pb-7" : "my-10"
    }`,
    h1: " text-[1.6rem] font-bold ",
    buttons: "w-6 h-6 mr-3",
    p: "text-lg font-bold",
  };

  const WeatherCardStyles = {
    cardContainer: `cursor-pointer bg-gray-400 rounded-3xl text-center drop-shadow-xl mx-auto ${
      isMobile ? "w-[90%] py-[1.2rem] my-[1rem]" : "ml-auto w-[19rem] py-[0.7rem] my-[1.5rem]"
    }`,
    cardWrapper: "flex justify-around",
    cardElement: "flex justify-start items-center basis-1/3 text-white",
    cardElement2: "flex justify-center items-center basis-1/3 text-white",
    cardElement3: "flex justify-center items-center basis-1/3 text-white",
    leftInfoWrapper: "flex flex-col text-left ml-4",
    cityName: "text-2xl font-bold",
    currentDate: "text-xs font-semibold",
    currentHour: "text-[0.7rem] font-light mt-2",
    tempText: "font-bold text-5xl text-right",
  };

  const DetailsPageStyles = {
    container: "min-h-screen text-white",
    topWrapper: "pt-10 flex justify-between items-center mx-4",
    cityName: "flex text-3xl font-semibold",
    buttons: "w-6 h-6 cursor-pointer hovr:text-[#01175f]",
    dateWeatherWrapper: "flex flex-col mx-auto text-lg",
    dateText: "mx-auto my-2 font-semibold",
    weatherText: "mx-auto font-light",
    climateInfo: "flex items-center justify-center mt-4 ",
    tempText: "ml-5 font-bold text-[5.8rem]",
    tempLine: "my-[3rem]",
    dailyCardsWrapper: "pl-2 grid grid-flow-col overflow-x-auto hideScrollbar",
  };

  const DailyCardStyles = {
    container:
      "glassCard p-2 drop-shadow-xl mx-1.5 text-center font-bold maw-w-fit px-2 mb-24",
    dayText: "text-xl pt-3",
    tempText: "text-3xl px-8 py-2",
  };

  const HourlyLineStyles = {
    wrapper: `hideScrollbar ${isMobile ? "pl-8 flex items-center overflow-x-auto" : "overflow-auto flex flex-col items-center"}`,
    container: `${isMobile ? "mr-2" : "mb-8"}`,
    dot: (i) => `mx-5 ${i === 0 ? "text-2xl" : ""}`,
    innerBox: (i) => `${
      isMobile ? (i === 0 ? "text-center font-bold text-lg" : "text-center text-sm")
      : (i === 0 ? "flex items-center font-bold text-3xl" : "flex items-center")
    }`,
    p: `${isMobile ? "w-16 text-[0.8rem]" : ""}`,
    tempText: "text-2xl",
  };

  const GiantCardStyles = {
    container: "rounded-3xl overflow-hidden h-[100%] text-white",
    imageContainer: "",
    miniCard: "z-10 drop-shadow-3xl -left-10 rounded-r-3xl absolute px-6 my-16 inset-y-0 flex flex-col items-center justify-center",
    temp: "font-bold text-[2.5rem] mb-8",
    cityInfo: "z-10 relative text-[#01175f]",
    innerDiv: "absolute left-28 top-14 text-lg",
    cityText: "font-bold text-4xl",
    dateText: "font-semibold text-xl",
    weatherText: ""
  };

  const NavCardStyles = {
    container: `cursor-pointer bg-gray-400 rounded-3xl text-center drop-shadow-xl mx-auto ml-auto w-[19rem] py-[1.5rem] my-[1.5rem]`,
    innerDiv: "text-white text-2xl overflow-hidden",
    searchIcon: "absolute right-0 inset-y-0 flex items-center rounded-3xl px-0.5",
    searchInput: "py-3.5 mx-5 rounded-md focus:outline-none text-black font-bold",
  };

  return (
    <StylesContext.Provider
      value={{
        selectedIcons,
        SetSelectedIcons,
        isMobile,
        SetIsMobile,
        updateSelectedIcon,
        layout,
        weatherStyle,
        navStyles,
        HomeStyles,
        WeatherCardStyles,
        DetailsPageStyles,
        DailyCardStyles,
        HourlyLineStyles,
        GiantCardStyles,
        NavCardStyles
      }}
    >
      {children}
    </StylesContext.Provider>
  );
};

export { StylesContext, StylesProvider };
