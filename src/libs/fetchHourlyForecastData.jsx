import axios from "axios";

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
