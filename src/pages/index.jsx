import { useContext, useEffect } from "react";
import Head from "next/head";

import Home from "@/containers/Home";
import Details from "@/containers/Details";

import { WeatherDataContext } from "@/contexts/WeatherDataContext";
import { StylesContext } from "@/contexts/StylesContext";

import {
  fetchCurrentWeatherData,
  fetchHourlyForecastData,
  fetchWeeklyForecastData,
  fetchWindForecastData,
} from "@/libs/WeatherApiFetch";

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
    const fetchCurrentWeather = await fetchCurrentWeatherData(
      cities,
      openWeatherApiKey,
      pexelsApiKey
    );

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
    const fetchWeeklyForecast = await fetchWeeklyForecastData(
      cities,
      weatherApiApiKey
    );

    const weeklyForecastData = fetchWeeklyForecast.reduce(
      (acc, data, index) => {
        const cityName = cities[index];
        return { ...acc, [cityName]: data };
      },
      {}
    );

    // Fetch weekly forecast data for each city in cities array
    const fetchWindForecast = await fetchWindForecastData(
      cities,
      weatherApiApiKey
    );

    const windForecastData = fetchWindForecast.reduce((acc, data, index) => {
      const cityName = cities[index];
      return { ...acc, [cityName]: data };
    }, {});

    return {
      props: {
        cities,
        currentWeatherData,
        weeklyForecastData,
        hourlyForecastData,
        windForecastData,
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
  windForecastData,
}) {
  // Import weather data from context
  const {
    SetCurrentWeather,
    SetWeeklyForecast,
    SetHourlyForecast,
    SetWindForecast,
    SetAvaliableCities,
    SetSelectedCity,
    selectedCity,
  } = useContext(WeatherDataContext);

  const { SetIsMobile, isMobile } = useContext(StylesContext);

  // Weatherdata and viewport handler
  useEffect(() => {
    if (
      currentWeatherData &&
      weeklyForecastData &&
      hourlyForecastData &&
      windForecastData
    ) {
      SetAvaliableCities(cities);
      SetCurrentWeather(currentWeatherData);
      SetWeeklyForecast(weeklyForecastData);
      SetHourlyForecast(hourlyForecastData);
      SetWindForecast(windForecastData);
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
    windForecastData,
    cities,
    SetCurrentWeather,
    SetWeeklyForecast,
    SetWindForecast,
    SetAvaliableCities,
    selectedCity,
    isMobile,
    SetIsMobile,
    SetHourlyForecast,
    SetSelectedCity,
  ]);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <title>
          {(selectedCity && selectedCity + " | WeatherAPP") ||
            "Welcome to WeatherAPP!"}
        </title>
        <meta
          name="description"
          content="Weather-APP is a dynamic web application displaying real-time weather data for multiple cities. Built with Next.js, Tailwind CSS, and APIs like Open Weather Map, WeatherApi, and Open-Meteo. Responsive design and captivating city images from Pexels API enhance the user experience."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      {isMobile ? selectedCity ? <Details /> : <Home /> : <Home />}
    </div>
  );
}
