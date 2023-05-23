import { createContext, useState } from "react";

const StylesContext = createContext();

const StylesProvider = ({ children }) => {
  // State management for navbar button selection
  const [selectedIcons, SetSelectedIcons] = useState([true, false, false]);
  const [selectedPeriod, SetSelectedPeriod] = useState([true, false]);
  const [accentColor, SetAccentColor] = useState();
  const [isMobile, SetIsMobile] = useState(true);
  const [thisMonth, SetThisMonth] = useState(true);

  // Navbar button selection handler
  const updateSelectedIcon = (index) => {
    SetSelectedIcons((prevSelectedIcons) => {
      const newSelectedIcons = prevSelectedIcons.map((icon, i) => i === index);
      return newSelectedIcons;
    });
  };

  // Widget selection handler
  const updateSelectedWidget = (index) => {
    SetSelectedPeriod((prevSelectedWidget) => {
      const newSelectedWidgets = prevSelectedWidget.map(
        (btn, i) => i === index
      );
      return newSelectedWidgets;
    });
  };

  // TAILWIND STYLES
  const layout = {
    root: `bg-[#f1f1f1] min-h-screen mx-auto font-sans hideTouchInputChrome ${
      isMobile ? "" : "pb-10 px-5"
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
      "overflow-hidden bg-white mx-5 text-center rounded-[1.3rem] drop-shadow-xl flex justify-around fixed bottom-5 left-0 right-0 z-50",
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
    firstZone: `ml-10 mr-5 basis-2/3`,
    topLeft: "h-[22rem] mb-4 drop-shadow-xl",
    widgetWrapper: "flex justify-between mt-8",
    widget1: "basis-1/3",
    widget2: "ml-10 basis-2/3",
    widgetNav:
      "bg-white flex w-fit rounded-t-[1.3rem] flex items-center font-semibold text-2xl",
    hourlyLineDesktop:
      "rounded-[1.3rem] text-white py-5 h-[18rem] overflow-auto hideScrollbar text-center",
    widgetZoneRight: "mt-8 basis-1/3",
    labelLeft: "ml-4 my-4 text-[#01175f] font-semibold text-2xl",
    labelRight: "ml-16 text-[#01175f] font-semibold text-2xl",
    labelButtons: (i) =>
      `py-4 px-5 rounded-t-[1.3rem] cursor-pointer ${
        selectedPeriod[i] ? "text-white" : "bg-white text-[#01175f]"
      }`,
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
    cardContainer: `cursor-pointer bg-gray-400 rounded-[1.3rem] text-center drop-shadow-xl mx-auto ${
      isMobile
        ? "w-[90%] py-[1.2rem] my-[1rem]"
        : "ml-auto w-[19rem] py-[0.7rem] my-[1.5rem]"
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
    container: `glassCard text-center font-bold ${
      isMobile
        ? "w-[8.5rem] p-2 drop-shadow-xl mx-1.5 px-2 mb-24"
        : "drop-shadow-lg min-w-[7.5rem] mx-[0.8rem] pb-5 flex flex-col items-center justify-around maw-w-fit"
    }`,
    dayText: `pt-3 mx-auto ${isMobile ? "text-xl" : "text-lg"}`,
    tempText: `text-3xl ${isMobile ? "py-2" : "py-5"}`,
    image: `mx-auto drop-shadow-sm ${isMobile ? "pb-3" : ""}`,
  };

  const DesktopWeeklyCardStyles = {
    container:
      "h-[18rem] w-[28.6rem] px-3 overflow-x-scroll flex text-white py-5 rounded-b-[1.3rem] rounded-r-[1.3rem]",
  };

  const DesktopMonthlyCardStyles = {
    container:
      "snap-x snap-mandatory h-[18rem] w-[28.6rem] px-2 overflow-x-scroll flex text-white py-5 rounded-[1.3rem]",
  };

  const HourlyLineStyles = {
    wrapper: `hideScrollbar ${
      isMobile
        ? "pl-5 flex items-center overflow-x-auto"
        : "overflow-auto flex flex-col items-center"
    }`,
    container: `${isMobile ? "-mr-1" : "mb-7"}`,
    dot: (i) => `mx-5 ${i === 0 ? "text-2xl" : ""}`,
    innerBox: (i) =>
      `${
        isMobile
          ? i === 0
            ? "text-center font-bold text-lg"
            : "text-center text-sm"
          : i === 0
          ? "flex items-center font-bold text-3xl"
          : "flex items-center"
      }`,
    p: `${isMobile ? "w-16 text-[0.8rem]" : ""}`,
    tempText: "text-2xl",
  };

  const GiantCardStyles = {
    container: "rounded-[1.3rem] overflow-hidden h-[100%] text-white",
    miniCard:
      "z-10 drop-shadow-xl -left-10 rounded-r-3xl absolute px-6 my-16 inset-y-0 flex flex-col items-center justify-center",
    temp: "font-bold text-[2.5rem] mb-8",
    cityInfo: "z-10 relative text-white",
    innerDiv: "absolute left-28 top-16 text-xl text-shadow",
    cityText: "font-bold text-2xl",
    dateText: "font-semibold",
    weatherText: "",
  };

  const NavCardStyles = {
    container: `cursor-pointer bg-gray-400 rounded-[1.3rem] text-center drop-shadow-xl mx-auto ml-auto w-[19rem] py-[1.5rem] my-[1.5rem]`,
    innerDiv: "text-white text-2xl overflow-hidden",
    searchIcon:
      "absolute right-0 inset-y-0 flex items-center rounded-[1.3rem] px-0.5",
    searchInput:
      "py-3.5 mx-5 rounded-md focus:outline-none text-black font-bold",
  };

  const WindCardStyles = {
    wrapper: "bg-white rounded-b-[1.3rem] rounded-r-[1.3rem]",
    cardContainer: "snap-center glassCard flex p-5 min-w-[26.2rem] mx-2.5",
    leftChunk: "w-2/5 h-full flex flex-col justify-start",
    rightChunk: "w-3/5 h-full flex flex-col justify-around",
    date: "mb-auto font-bold",
    windIcon: "mb-auto ml-2",
    temp: "font-bold text-3xl",
  };

  return (
    <StylesContext.Provider
      value={{
        WindCardStyles,
        selectedIcons,
        SetSelectedIcons,
        isMobile,
        SetIsMobile,
        selectedPeriod,
        accentColor,
        SetAccentColor,
        SetSelectedPeriod,
        DesktopWeeklyCardStyles,
        DesktopMonthlyCardStyles,
        thisMonth,
        SetThisMonth,
        updateSelectedIcon,
        updateSelectedWidget,
        layout,
        weatherStyle,
        navStyles,
        HomeStyles,
        WeatherCardStyles,
        DetailsPageStyles,
        DailyCardStyles,
        HourlyLineStyles,
        GiantCardStyles,
        NavCardStyles,
      }}
    >
      {children}
    </StylesContext.Provider>
  );
};

export { StylesContext, StylesProvider };
