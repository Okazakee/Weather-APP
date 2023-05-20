import { useContext, useEffect } from "react";
import axios from "axios";

import Home from "@/containers/Home";
import Details from "@/containers/Details";

import { WeatherDataContext } from "@/contexts/WeatherDataContext";
import { StylesContext } from "@/contexts/StylesContext";

export async function getServerSideProps() {
  // Hardcoded 3 main cities to check
  const cities = ["London", "Turin", "Rome"];

  const originalEdgeEndpoint = process.env.EDGE_CONFIG;
  const OW_apiKey = process.env.OPENWEATHER_API_KEY;
  const WB_apiKey = process.env.WEATHERBIT_API_KEY;
  const U_apiKey = process.env.UNSPLASH_ACCESS_KEY

  // Find the index of the "?" in the URI
  const index = originalEdgeEndpoint.indexOf("?");

  // Divide the URI into two parts
  const firstPart = originalEdgeEndpoint.slice(0, index);
  const secondPart = originalEdgeEndpoint.slice(index);

  const currentWeatherFallback = `${firstPart}/item/currentWeatherData${secondPart}`;
  const weeklyForecastFallback = `${firstPart}/item/weeklyForecast${secondPart}`;
  const hourlyForecastFallback = `${firstPart}/item/hourlyForecast${secondPart}`;

  if (!OW_apiKey) {
    throw new Error("Missing API key");
  }

  try {
    // Fetch current weather data for each city in cities array
    const fetchCurrentWeatherData = await Promise.all(
      cities.map(async (cityName) => {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OW_apiKey}&units=metric`
        );

        const unsplashResponse = await axios.get(
          `https://api.unsplash.com/photos/random/?query=${cityName}&client_id=${U_apiKey}&orientation=landscape`
        );

        const imageUrl = unsplashResponse.data.urls.regular;

        const weatherData = {
          ...weatherResponse.data,
          imageUrl
        };

        return { [cityName]: weatherData };
      })
    );

    let currentWeatherData;
    try {
      currentWeatherData = fetchCurrentWeatherData.reduce((acc, data) => {
        const cityName = Object.keys(data)[0];
        return { ...acc, ...data, [cityName]: { ...data[cityName], imageUrl: data[cityName].imageUrl } };
      }, {});
    } catch (error) {
      console.error("Error reconstructing current weather data:", error);
      // Use the fallback URI here
      const fallbackResponse = await axios.get(currentWeatherFallback);
      currentWeatherData = fallbackResponse.data;
    }

    // Fetch hourly forecast data for each city in cities array
    const fetchHourlyForecast = await Promise.all(
      cities.map(async (cityName) => {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${OW_apiKey}&units=metric&cnt=12`
        );
        return response.data;
      })
    );

    // Reconstruct fetched data adding name property to each object
    let hourlyForecastData;
    try {
      hourlyForecastData = fetchHourlyForecast.reduce((acc, data, index) => {
        const cityName = cities[index];
        return { ...acc, [cityName]: data };
      }, {});
    } catch (error) {
      console.error("Error reconstructing current weather data:", error);
      // Use the fallback URI here
      const fallbackResponse = await axios.get(hourlyForecastFallback);
      hourlyForecastData = fallbackResponse.data;
    }

    // Fetch weekly forecast data for each city in cities array
    const fetchWeeklyForecast = await Promise.all(
      cities.map(async (cityName) => {
        try {
          const response = await axios.get(
            `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${WB_apiKey}&units=M`
          );
          return response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
          // Use the fallback URI here
          const fallbackResponse = await axios.get(weeklyForecastFallback);
          return fallbackResponse.data;
        }
      })
    );

    const weeklyForecastData = fetchWeeklyForecast.reduce(
      (acc, data, index) => {
        const cityName = cities[index];
        return { ...acc, [cityName]: data.data };
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
    console.error("Error fetching weather data:", error);
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
    SetCurrentWeather,
    SetWeeklyForecast,
    SetAvaliableCities,
    selectedCity,
    isMobile,
    SetIsMobile
  ]);

  return (
    <div>
      {isMobile ?
        selectedCity ? <Details /> : <Home />
      :
        <Home />
      }
    </div>
  );
}
