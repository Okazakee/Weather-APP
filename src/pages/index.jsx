import { useContext, useEffect } from 'react';
import axios from 'axios';

import Home from '@/containers/Home';
import Details from '@/containers/Details';

import { WeatherDataContext } from '@/contexts/WeatherDataContext';

export async function getServerSideProps() {

  // Hardcoded 3 main cities to check
  const cities = ['London', 'Turin', 'Rome', 'Dubai'];

  const OW_apiKey = process.env.OPENWEATHER_API_KEY;
  const WB_apiKey = process.env.WEATHERBIT_API_KEY;

  if (!OW_apiKey) {
    throw new Error('Missing API key');
  }

  try {

    // Fetch weather data for each city in cities array
    const fetchWeatherData = await Promise.all(
      cities.map(async (cityName) => {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OW_apiKey}&units=metric`
        );
        return response.data;
      })
    );

    // Reconstruct fetched data adding name property to each object
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

  // Weatherdata and viewport handler
  useEffect(() => {
    if (weatherDataFetch) {
      SetAvaliableCities(cities);
      SetWeatherData(weatherDataFetch);
    }

    const mobileBreakpoint = 640;
    const isMobile = window.innerWidth <= mobileBreakpoint;

    if (true) {
    /* if (!isMobile && selectedCity === null) { */
      SetSelectedCity('London');
    }
  }, [weatherDataFetch, SetWeatherData, SetAvaliableCities, selectedCity]);

  return (
    <div>
      {selectedCity ? (
        <Details />
      ) : (
        <Home />
      )}
    </div>
  )
}