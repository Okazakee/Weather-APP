import { createContext, useState, useEffect } from "react";

const WeatherDataContext = createContext();

const WeatherDataProvider = ({ children }) => {
  // State management for current weather data
  const [avaliableCities, SetAvaliableCities] = useState(null);
  const [selectedCity, SetSelectedCity] = useState(null);
  const [currentWeather, SetCurrentWeather] = useState(null);
  const [weeklyForecast, SetWeeklyForecast] = useState(null);
  const [hourlyForecast, SetHourlyForecast] = useState(null);
  const [detailsPageData, SetDetailsPageData] = useState(null);
  const [dailyCardData, SetDailyCardData] = useState(null);
  const [hourlyLineData, SetHourlyLineData] = useState(null);

  // pages and component data handler
  useEffect(() => {
    if (selectedCity !== null) {
      const dailyCardData = weeklyForecast[selectedCity];
      const hourlyLineData = hourlyForecast[selectedCity].list;
      const detailsPageData = {
        selectedCity: selectedCity,
        weatherType: currentWeather[selectedCity].weather[0].main,
        temperature: Math.floor(currentWeather[selectedCity].main.temp),
      };

      SetDetailsPageData(detailsPageData);
      SetDailyCardData(dailyCardData);
      SetHourlyLineData(hourlyLineData);
    }
  }, [currentWeather, weeklyForecast, selectedCity, hourlyForecast]);

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
        hourlyForecast,
        SetHourlyForecast,
        dailyCardData,
        SetDailyCardData,
        detailsPageData,
        hourlyLineData,
        SetHourlyLineData,
      }}
    >
      {children}
    </WeatherDataContext.Provider>
  );
};

export { WeatherDataContext, WeatherDataProvider };
