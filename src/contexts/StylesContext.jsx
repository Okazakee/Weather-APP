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
      root: "bg-[#f1f1f1] min-h-screen font-sans",
      navbar: "sm:hidden"
  }

  const weather = {
    cloudy: "bg-gradient-to-r from-[#575f75] to-[#8f9eae]",
    rainy: "bg-gradient-to-r from-[#577ce8] to-[#72b0f3]",
    sunny: "bg-gradient-to-r from-[#577ce8] to-[#72b0f3]",
    sunnyAndRainy: "bg-gradient-to-r from-[#122f70] to-[#4a85c9]"
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
          cloudy: "bg-gradient-to-r from-[#575f75] to-[#8f9eae]",
          rainy: "bg-gradient-to-r from-[#577ce8] to-[#72b0f3]",
          sunny: "bg-gradient-to-r from-[#577ce8] to-[#72b0f3]",
          sunnyAndRainy: "bg-gradient-to-r from-[#122f70] to-[#4a85c9]"
      },
      cardContainer: "cursor-pointer py-[1.2rem] my-[1rem] mx-auto w-[90%] bg-gray-400 rounded-3xl text-center drop-shadow-xl",
      cardWrapper: "flex justify-around",
      cardElement: "flex justify-center items-center basis-1/3 text-white",
      leftInfoWrapper: "flex flex-col text-left ml-4",
      cityName: "text-2xl font-bold",
      currentDate: "text-xs font-semibold",
      currentHour: "text-[0.7rem] font-light mt-2",
      tempC: "font-bold text-5xl font."
  }

  const CityPageStyles = {
      container: "min-h-screen text-white"
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
          CityPageStyles
      }}
    >
      {children}
    </StylesContext.Provider>
  );
};

export { StylesContext, StylesProvider };