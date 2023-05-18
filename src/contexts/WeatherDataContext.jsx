import { createContext, useState, useEffect } from 'react';
import moment from 'moment';

const WeatherDataContext = createContext();

const WeatherDataProvider = ({ children }) => {

  return (
    <WeatherDataContext.Provider
      value={{
        
      }}
    >
      {children}
    </WeatherDataContext.Provider>
  );
};

export { WeatherDataContext, WeatherDataProvider };
