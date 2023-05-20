import { useContext } from "react";
import Image from "next/image";

import { StylesContext } from "@/contexts/StylesContext";
import { SystemContext } from "@/contexts/SystemContext";

export default function CardMobile({ cityName, currentWeather }) {
  // Import Card styles and SystemDate from context
  const { CardMobileStyles, weatherStyle } = useContext(StylesContext);
  const { formatDate, formatMonth, formatTime } = useContext(SystemContext);

  const { weather, main } = currentWeather;

  currentWeather = {
    weatherType: weather[0].main,
    temp: Math.floor(main.temp),
  };

  return (
    <div
      className={`${CardMobileStyles.cardContainer} ${
        weatherStyle[currentWeather.weatherType]
      }`}
    >
      <div className={CardMobileStyles.cardWrapper}>
        <div className={CardMobileStyles.cardElement}>
          <div className={CardMobileStyles.leftInfoWrapper}>
            <div className={CardMobileStyles.cityName}>{cityName}</div>
            <div className={CardMobileStyles.currentDate}>{formatDate}</div>
            <div className={CardMobileStyles.currentDate}>{formatMonth}</div>
            <div className={CardMobileStyles.currentHour}>{formatTime}</div>
          </div>
        </div>
        <div className={CardMobileStyles.cardElement2}>
          <Image
            className="w-20 h-20 drop-shadow-sm"
            src={`/weatherIcons/${currentWeather.weatherType}.png`}
            width={100}
            height={100}
            alt={`${currentWeather.weatherType}_weather_icon`}
            quality={100}
          />
        </div>
        <div className={CardMobileStyles.cardElement3}>
          <h1 className={CardMobileStyles.tempText}>
            {currentWeather.temp + "°"}
          </h1>
        </div>
      </div>
    </div>
  );
}
