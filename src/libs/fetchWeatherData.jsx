import axios from 'axios';
import { createClient } from "pexels";

export const fetchWeatherData = async (cities, openWeatherApiKey, pexelsApiKey) => {

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