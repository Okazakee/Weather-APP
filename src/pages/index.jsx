import { useContext, useEffect } from "react";
import axios from "axios";

import Home from "@/containers/Home";
import Details from "@/containers/Details";

import { WeatherDataContext } from "@/contexts/WeatherDataContext";
import { StylesContext } from "@/contexts/StylesContext";

import { fetchCurrentWeatherData, fetchHourlyForecastData, fetchWeeklyForecastData } from '@/libs/WeatherApiFetch'

export async function getServerSideProps() {
  // Hardcoded 3 main cities to check
  const cities = ["London", "Turin", "Rome"];

  const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;
  const weatherApiApiKey = process.env.WEATHERAPI_API_KEY;
  const pexelsApiKey = process.env.PEXELS_API_KEY;

  if (!openWeatherApiKey || !weatherApiApiKey || !pexelsApiKey) {
    throw new Error("Missing API key");
  }

  try {
    // Fetch current weather data for each city in cities array
    const fetchCurrentWeather = await fetchCurrentWeatherData(cities, openWeatherApiKey, pexelsApiKey);

    let currentWeatherData;
    try {
      currentWeatherData = fetchCurrentWeather.reduce((acc, data) => {
        const cityName = Object.keys(data)[0];
        return {
          ...acc,
          ...data,
          [cityName]: { ...data[cityName], imageUrl: data[cityName].imageUrl },
        };
      }, {});
    } catch (error) {
      console.error("Error reconstructing current weather data");
    }

    // Fetch hourly forecast data for each city in cities array
    const fetchHourlyForecast = await fetchHourlyForecastData(cities);

    // Reconstruct fetched data adding name property to each object
    let hourlyForecastData;
    try {
      hourlyForecastData = fetchHourlyForecast.reduce((acc, data, index) => {
        const cityName = cities[index];
        return { ...acc, [cityName]: data };
      }, {});
    } catch (error) {
      console.error("Error reconstructing hourly forecast data");
    }

    // Fetch weekly forecast data for each city in cities array
    const fetchWeeklyForecast = await fetchWeeklyForecastData(cities, weatherApiApiKey);

    const weeklyForecastData = fetchWeeklyForecast.reduce(
      (acc, data, index) => {
        const cityName = cities[index];
        return { ...acc, [cityName]: data };
      },
      {}
    );

    return {
      props: {
        cities,
        currentWeatherData,
        weeklyForecastData,
        hourlyForecastData,
      },
    };
  } catch (error) {
    console.error("Error fetching data");
  }
}

export default function Index({
  cities,
  currentWeatherData,
  weeklyForecastData,
  hourlyForecastData,
}) {
  // Import weather data from context
  const {
    SetCurrentWeather,
    SetWeeklyForecast,
    SetHourlyForecast,
    SetAvaliableCities,
    SetSelectedCity,
    selectedCity,
  } = useContext(WeatherDataContext);

  const { SetIsMobile, isMobile } = useContext(StylesContext);

  // Weatherdata and viewport handler
  useEffect(() => {
    if (currentWeatherData && weeklyForecastData && hourlyForecastData) {
      SetAvaliableCities(cities);
      SetCurrentWeather(currentWeatherData);
      SetWeeklyForecast(weeklyForecastData);
      SetHourlyForecast(hourlyForecastData);
    }

    const mobileBreakpoint = 640;
    SetIsMobile(window.innerWidth <= mobileBreakpoint);

    if (!isMobile && selectedCity === null) {
      SetSelectedCity("London");
    }
  }, [
    currentWeatherData,
    weeklyForecastData,
    hourlyForecastData,
    cities,
    SetCurrentWeather,
    SetWeeklyForecast,
    SetAvaliableCities,
    selectedCity,
    isMobile,
    SetIsMobile,
    SetHourlyForecast,
    SetSelectedCity,
  ]);

  return (
    <div>{isMobile ? selectedCity ? <Details /> : <Home /> : <Home />}</div>
  );
}
