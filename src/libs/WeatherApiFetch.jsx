import axios from "axios";
import { createClient } from "pexels";

export const fetchCurrentWeatherData = async (
  cities,
  openWeatherApiKey,
  pexelsApiKey
) => {
  const pexelsClient = createClient(pexelsApiKey);

  const fetchCurrentWeatherData = await Promise.all(
    cities.map(async (cityName) => {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherApiKey}&units=metric`
      );

      let imageUrl =
        "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwww.elegantthemes.com%2Fblog%2Fwp-content%2Fuploads%2F2020%2F08%2F000-http-error-codes.png"; // fallback if fails

      try {
        const pexelsResponse = await pexelsClient.photos.search({
          query: cityName,
          per_page: 1,
          orientation: "landscape",
          size: "medium",
        });

        imageUrl = pexelsResponse.photos[0].src.landscape;
      } catch (error) {
        console.error("Failed to fetch image:", error);
      }

      const weatherData = {
        ...weatherResponse.data,
        imageUrl,
      };

      return { [cityName]: weatherData };
    })
  );

  return fetchCurrentWeatherData;
};

export const fetchHourlyForecastData = async (cities) => {
  const fetchHourlyForecastData = await Promise.all(
    cities.map(async (cityName) => {
      const geoCoding = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
      );

      const latitude = geoCoding.data.results[0].latitude;

      const longitude = geoCoding.data.results[0].longitude;

      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=2`
      );
      return response.data;
    })
  );

  return fetchHourlyForecastData;
};

export const fetchWeeklyForecastData = async (cities, weatherApiApiKey) => {
  const fetchWeeklyForecast = await Promise.all(
    cities.map(async (cityName) => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiApiKey}&q=${cityName}&days=7`
        );
        return response.data.forecast.forecastday;
      } catch (error) {
        console.error("Error fetching weekly forecast data:");
      }
    })
  );

  return fetchWeeklyForecast;
};
