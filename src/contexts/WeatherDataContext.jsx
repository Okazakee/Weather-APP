import { createContext, useState, useEffect } from 'react';

const WeatherDataContext = createContext();

const WeatherDataProvider = ({ children }) => {

  // State management for current weather data
  const [weatherData, SetWeatherData] = useState();

  /* useEffect(() => {
    if (weatherData !== undefined) {
      // Perform the desired action or code here when weatherData is not null
      console.log('Weather data is available:');
    }
  }, [weatherData]); */

  return (
    <WeatherDataContext.Provider
      value={{
        weatherData,
        SetWeatherData
      }}
    >
      {children}
    </WeatherDataContext.Provider>
  );
};

export { WeatherDataContext, WeatherDataProvider };
