import { createContext, useState } from 'react';

const StylesContext = createContext();

const StylesProvider = ({ children }) => {

    // State for navbar button selection
    const [selectedIcons, SetSelectedIcons] = useState([true, false, false]);

    // navbar button selection handler
    const updateSelectedIcon = (index) => {
        SetSelectedIcons((prevSelectedIcons) => {
          const newSelectedIcons = prevSelectedIcons.map((icon, i) => (i === index));
          return newSelectedIcons;
        });
    };

    // TAILWIND STYLES
    const layout = {
        root: "bg-[#f1f1f1] min-h-screen",
        navbar: "sm:hidden"
    }

    const navStyles = {
        navbar: "bg-white mx-5 text-center rounded-3xl drop-shadow-xl flex justify-around fixed bottom-6 left-0 right-0 z-50",
        div1: (i) => `cursor-pointer p-5 transition-all duration-200 transform-gpu border-b-2 ${selectedIcons[i] ? "border-[#01175f]" : "border-white"}`,
        buttons: (i) => `transition-all duration-200 transform-gpu w-7 h-7 hover:text-[#01175f] ${selectedIcons[i] ? 'text-[#01175f]' : 'text-[#787a94]'}`,
    };

    const HomeStyles = {
        div1: "text-center pt-12 text-[#01175f]",
        div2: "py-12 flex justify-center items-center text-[#01175f]",
        h1: " text-3xl font-semibold ",
        buttons: "w-6 h-6 mr-3",
        p: "text-lg font-semibold"
    };

    return (
      <StylesContext.Provider
        value={{
            selectedIcons,
            SetSelectedIcons,
            updateSelectedIcon,
            layout,
            navStyles,
            HomeStyles
        }}
      >
        {children}
      </StylesContext.Provider>
    );
  };

  export { StylesContext, StylesProvider };