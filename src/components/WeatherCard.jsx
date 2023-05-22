import { useContext } from "react";
import Image from "next/image";

import { StylesContext } from "@/contexts/StylesContext";
import { SystemContext } from "@/contexts/SystemContext";

export default function WeatherCard({ cityName, currentWeather }) {
  // Import Card styles and SystemDate from context
  const { WeatherCardStyles, weatherStyle } = useContext(StylesContext);
  const { formatDate, formatMonth, formatTime } = useContext(SystemContext);

  const { weather, main } = currentWeather;

  currentWeather = {
    weatherType: weather[0].main,
    temp: Math.floor(main.temp),
  };

  return (
    <div
      className={`${WeatherCardStyles.cardContainer} ${
        weatherStyle[currentWeather.weatherType]
      }`}
    >
      <div className={WeatherCardStyles.cardWrapper}>
        <div className={WeatherCardStyles.cardElement}>
          <div className={WeatherCardStyles.leftInfoWrapper}>
            <div className={WeatherCardStyles.cityName}>{cityName}</div>
            <div className={WeatherCardStyles.currentDate}>{formatDate}</div>
            <div className={WeatherCardStyles.currentDate}>{formatMonth}</div>
            <div className={WeatherCardStyles.currentHour}>{formatTime}</div>
          </div>
        </div>
        <div className={WeatherCardStyles.cardElement2}>
          <Image
            className="w-20 h-20 drop-shadow-sm"
            src={`/weatherIcons/${currentWeather.weatherType}.png`}
            width={100}
            height={100}
            alt={`${currentWeather.weatherType}_weather_icon`}
            quality={100}
          />
        </div>
        <div className={WeatherCardStyles.cardElement3}>
          <h1 className={WeatherCardStyles.tempText}>
            {currentWeather.temp + "°"}
          </h1>
        </div>
      </div>
    </div>
  );
}
