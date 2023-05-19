import { createContext, useState, useEffect } from 'react';

const WeatherDataContext = createContext();

const WeatherDataProvider = ({ children }) => {

  const [avaliableCities, SetAvaliableCities] = useState(null);

  const [selectedCity, SetSelectedCity] = useState(null);

  // State management for current weather data
  const [weatherData, SetWeatherData] = useState(null);
  const [forecastData, SetForecastData] = useState(null);
  const [detailsPageData, SetDetailsPageData] = useState(null);

  useEffect(() => {
    if (weatherData !== null) {
      console.log("WeatherData updated!", weatherData);
    }

    if (selectedCity !== null) {
      const detailsPageData = {
        selectedCity: selectedCity,
        weatherType: weatherData[selectedCity].weather[0].main,
        temperature: Math.floor(weatherData[selectedCity].main.temp)
      }

      SetDetailsPageData(detailsPageData);
    }
  }, [weatherData, selectedCity]);

  return (
    <WeatherDataContext.Provider
      value={{
        avaliableCities,
        SetAvaliableCities,
        weatherData,
        SetWeatherData,
        selectedCity,
        SetSelectedCity,
        detailsPageData
      }}
    >
      {children}
    </WeatherDataContext.Provider>
  );
};

export { WeatherDataContext, WeatherDataProvider };