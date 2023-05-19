import { useContext, useEffect } from 'react'
import axios from 'axios';

import Home from '@/containers/Home';
import Details from '@/containers/Details';

import { WeatherDataContext } from '@/contexts/WeatherDataContext';
import { useWindowSize } from '@/utils/useWindowSize';

export async function getServerSideProps() {

  // Hardcoded 3 main cities to check
  const cities = ['London', 'Turin', 'Rome'];

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('Missing API key');
  }

  try {

    /* const fetchForecastData = await Promise.all(
      cities.map(async (cityName) => {
        const geoResponse = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
        );
        const [cityGeoData] = geoResponse.data;

        console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`)
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`
        );

        return forecastResponse.data;
      })
    ); */

    const fetchWeatherData = await Promise.all(
      cities.map(async (cityName) => {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
        return response.data;
      })
    );

    const weatherDataFetch = fetchWeatherData.reduce((acc, data, index) => {
      const cityName = cities[index];
      return { ...acc, [cityName]: data };
    }, {});

    return {
      props: {
        weatherDataFetch,
        cities
      },
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

export default function Index({ weatherDataFetch, cities }) {

  // Import weather data from context
  const { SetWeatherData, SetAvaliableCities, SetSelectedCity, selectedCity } = useContext(WeatherDataContext);

  // Get the window size
  const windowSize = useWindowSize();

  useEffect(() => {
    if (weatherDataFetch) {
      SetAvaliableCities(cities);
      SetWeatherData(weatherDataFetch);
    }

    // Set the breakpoint for mobile
    const mobileBreakpoint = 640;

    // Check screen size and react accordingly
    windowSize.width > mobileBreakpoint ? SetSelectedCity('London') : SetSelectedCity(null);

  }, [weatherDataFetch, windowSize, SetWeatherData, SetSelectedCity]);

  return (
    <div>
      {selectedCity

        ?

        (
          <Details />
        )

        :

        (
          <Home />
        )
      }
    </div>
  )
}