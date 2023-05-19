import { createContext, useState, useEffect } from 'react';

const WeatherDataContext = createContext();

const WeatherDataProvider = ({ children }) => {

  // State management for current weather data
  const [avaliableCities, SetAvaliableCities] = useState(null);
  const [selectedCity, SetSelectedCity] = useState(null);
  const [currentWeather, SetCurrentWeather] = useState(null);
  const [weeklyForecast, SetWeeklyForecast] = useState(null);
  const [detailsPageData, SetDetailsPageData] = useState(null);
  const [dailyCardData, SetDailyCardData] = useState(null);

  // detailsPageData handler
  useEffect(() => {

    if (selectedCity !== null) {

      const detailsPageData = {
        selectedCity: selectedCity,
        weatherType: currentWeather[selectedCity].weather[0].main,
        temperature: Math.floor(currentWeather[selectedCity].main.temp)
      }

      const dailyCardData = weeklyForecast[selectedCity].data;

      SetDetailsPageData(detailsPageData);
      SetDailyCardData(dailyCardData);
    }
  }, [currentWeather, weeklyForecast, selectedCity]);

  return (
    <WeatherDataContext.Provider
      value={{
        avaliableCities,
        SetAvaliableCities,
        currentWeather,
        SetCurrentWeather,
        selectedCity,
        SetSelectedCity,
        weeklyForecast,
        SetWeeklyForecast,
        dailyCardData,
        SetDailyCardData,
        detailsPageData
      }}
    >
      {children}
    </WeatherDataContext.Provider>
  );
};

export { WeatherDataContext, WeatherDataProvider };