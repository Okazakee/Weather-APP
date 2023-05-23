import axios from "axios";
import moment from "moment";
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

      let imageUrl;

      try {
        const pexelsResponse = await pexelsClient.photos.search({
          query: cityName,
          per_page: 1,
          orientation: "landscape",
          size: "small",
        });

        imageUrl = pexelsResponse.photos[0].src.landscape;
      } catch (error) {
        console.error("Failed to fetch image:", error);
        imageUrl = "/backgrounds/pexels-api-limit.jpg"; // fallback if fails
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

      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=2`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching hourly forecast data:");
      }
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

export const fetchWindForecastData = async (cities, weatherApiApiKey) => {
  const fetchWindForecast = await Promise.all(
    cities.map(async (cityName) => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiApiKey}&q=${cityName}&alerts=no&aqi=no&tides=no&days=14`
        );

        const filteredData = response.data.forecast.forecastday.map((obj) => {
          const {
            date,
            day: {
              avgtemp_c,
              maxtemp_c,
              mintemp_c,
              maxwind_mph,
              avghumidity,
              uv,
            },
          } = obj;

          const formattedDate = moment(date).format("ddd, DD MMM");
          const formattedAvgTemp = Math.floor(avgtemp_c);
          const formattedMaxTemp = Math.floor(maxtemp_c);
          const formattedMinTemp = Math.floor(mintemp_c);

          let wind_type = "";
          if (maxwind_mph >= 1 && maxwind_mph <= 2.99) {
            wind_type = "Calm";
          } else if (maxwind_mph >= 3 && maxwind_mph <= 10.99) {
            wind_type = "Light breeze";
          } else if (maxwind_mph >= 11 && maxwind_mph <= 20.99) {
            wind_type = "Moderate breeze";
          } else if (maxwind_mph >= 21 && maxwind_mph <= 30.99) {
            wind_type = "Fresh breeze";
          } else if (maxwind_mph >= 31) {
            wind_type = "Strong breeze";
          }

          return {
            date: formattedDate,
            avgtemp_c: formattedAvgTemp,
            maxtemp_c: formattedMaxTemp,
            mintemp_c: formattedMinTemp,
            maxwind_mph,
            avghumidity,
            uv,
            wind_type,
          };
        });

        return filteredData;
      } catch (error) {
        console.error("Error fetching wind forecast data: ", error);
      }
    })
  );

  return fetchWindForecast;
};
