import { createContext, useState } from 'react';

const StylesContext = createContext();

const StylesProvider = ({ children }) => {

  // State management for navbar button selection
  const [selectedIcons, SetSelectedIcons] = useState([true, false, false]);

  // Navbar button selection handler
  const updateSelectedIcon = (index) => {
    SetSelectedIcons((prevSelectedIcons) => {
      const newSelectedIcons = prevSelectedIcons.map((icon, i) => (i === index));
      return newSelectedIcons;
    });
  };

  // TAILWIND STYLES
  const layout = {
    root: "bg-[#f1f1f1] h-screen font-sans",
    navbar: "sm:hidden"
  }

  const weather = {
    Cloudy: "bg-gradient-to-r from-[#575f75] to-[#8f9eae]",
    rainy: "bg-gradient-to-r from-[#577ce8] to-[#72b0f3]",
    Sunny: "bg-gradient-to-r from-[#577ce8] to-[#72b0f3]",
    Sunshower: "bg-gradient-to-r from-[#122f70] to-[#4a85c9]"
  };

  const navStyles = {
    navbar: "bg-white mx-5 text-center rounded-3xl drop-shadow-xl flex justify-around fixed bottom-5 left-0 right-0 z-50",
    div1: (i) => `cursor-pointer p-5 transition-all duration-200 transform-gpu border-b-2 ${selectedIcons[i] ? "border-[#01175f]" : "border-white"}`,
    buttons: (i) => `transition-all duration-200 transform-gpu w-7 h-7 hover:text-[#01175f] ${selectedIcons[i] ? 'text-[#01175f]' : 'text-[#787a94]'}`,
  };

  const HomeStyles = {
    div1: "text-center pt-10 text-[#01175f]",
    addCityButtonDiv: "cursor-pointer pt-10 pb-7 flex justify-center items-center text-[#01175f]",
    h1: " text-[1.6rem] font-bold ",
    buttons: "w-6 h-6 mr-3",
    p: "text-lg font-bold"
  };

  const CardMobileStyles = {
    weather: {
        Cloudy: "bg-gradient-to-r from-[#575f75] to-[#8f9eae]",
        Rainy: "bg-gradient-to-r from-[#577ce8] to-[#72b0f3]",
        Sunny: "bg-gradient-to-r from-[#577ce8] to-[#72b0f3]",
        Sunshower: "bg-gradient-to-r from-[#122f70] to-[#4a85c9]"
    },
    cardContainer: "cursor-pointer py-[1.2rem] my-[1rem] mx-auto w-[90%] bg-gray-400 rounded-3xl text-center drop-shadow-xl",
    cardWrapper: "flex justify-around",
    cardElement: "flex justify-center items-center basis-1/3 text-white",
    leftInfoWrapper: "flex flex-col text-left ml-4",
    cityName: "text-2xl font-bold",
    currentDate: "text-xs font-semibold",
    currentHour: "text-[0.7rem] font-light mt-2",
    tempText: "font-bold text-5xl"
  }

  const CityPageStyles = {
    container: "min-h-screen text-white",
    topWrapper: "pt-10 flex justify-between items-center mx-4",
    cityName: "flex text-3xl font-semibold",
    buttons: "w-6 h-6 cursor-pointer hovr:text-[#01175f]",
    dateWeatherWrapper: "flex flex-col mx-auto text-lg",
    dateText: "mx-auto my-2 font-semibold",
    weatherText: "mx-auto font-light",
    climateInfo: "flex justify-center my-4",
    tempText: "ml-5 font-bold text-[5.8rem]",
    tempLine: "my-[4.2rem]",
    dailyCardsWrapper: "ml-2 grid grid-flow-col overflow-x-auto hideScrollbar pb-[5vh]",
  }

  const DailyCardStyles = {
    container: "glassCard p-2 shadow-xl mx-1.5 text-center font-bold maw-w-fit",
    dayText: "text-xl pt-3",
    tempText: "text-3xl px-8 py-2"
  }

  return (
    <StylesContext.Provider
      value={{
        selectedIcons,
        SetSelectedIcons,
        updateSelectedIcon,
        layout,
        weather,
        navStyles,
        HomeStyles,
        CardMobileStyles,
        CityPageStyles,
        DailyCardStyles
      }}
    >
      {children}
    </StylesContext.Provider>
  );
};

export { StylesContext, StylesProvider };