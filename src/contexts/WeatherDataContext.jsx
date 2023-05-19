import { createContext, useState, useEffect } from 'react';

const WeatherDataContext = createContext();

const WeatherDataProvider = ({ children }) => {

  // State management for current weather data
  const [avaliableCities, SetAvaliableCities] = useState(null);
  const [selectedCity, SetSelectedCity] = useState(null);
  const [weatherData, SetWeatherData] = useState(null);
  const [forecastData, SetForecastData] = useState(null);
  const [detailsPageData, SetDetailsPageData] = useState(null);

  // detailsPageData handler
  useEffect(() => {

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