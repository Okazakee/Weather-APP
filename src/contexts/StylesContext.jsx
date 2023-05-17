import { createContext } from 'react';

const StylesContext = createContext();

const StylesProvider = ({ children }) => {

    // TAILWIND STYLES
    const navStyles = {
        btnIcons: "p-2"
    };

    return (
      <StylesContext.Provider
        value={{
          navStyles,
        }}
      >
        {children}
      </StylesContext.Provider>
    );
  };

  export { StylesContext, StylesProvider };