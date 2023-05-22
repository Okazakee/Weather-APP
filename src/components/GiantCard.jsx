import { useContext } from "react";
import Image from "next/image";

import { StylesContext } from "@/contexts/StylesContext";
import { WeatherDataContext } from "@/contexts/WeatherDataContext";
import { SystemContext } from "@/contexts/SystemContext";

export default function GiantCard() {
  const { GiantCardStyles, weatherStyle } = useContext(StylesContext);
  const { selectedCity, currentWeather } = useContext(WeatherDataContext);
  const { formatDate, formatMonth } = useContext(SystemContext);

  return (
    <div className={GiantCardStyles.container}>
      <div
        className={`${GiantCardStyles.miniCard} ${
          selectedCity &&
          weatherStyle[currentWeather[selectedCity].weather[0].main]
        }`}
      >
        <p className={GiantCardStyles.temp}>
          {selectedCity &&
            Math.floor(currentWeather[selectedCity].main.temp) + "°"}
        </p>
        <Image
          className="drop-shadow-sm w-16 h-16"
          src={`/weatherIcons/${
            selectedCity && currentWeather[selectedCity].weather[0].main
          }.png`}
          width={50}
          height={50}
          alt={`${
            selectedCity && currentWeather[selectedCity].weather[0].main
          }_weather_icon`}
          quality={100}
        />
      </div>
      <div className={GiantCardStyles.cityInfo}>
        <div className={GiantCardStyles.innerDiv}>
          <p className={GiantCardStyles.cityText}>{selectedCity}</p>
          <p
            className={GiantCardStyles.dateText}
          >{`${formatDate} ${formatMonth}`}</p>
          <p className={GiantCardStyles.weatherText}>
            {selectedCity && currentWeather[selectedCity].weather[0].main}
          </p>
        </div>
      </div>
      {selectedCity && (
        <Image
          className="object-cover object-center rounded-[1.3rem]"
          src={selectedCity && currentWeather[selectedCity].imageUrl}
          fill
          alt={`${selectedCity} image from Pexels`}
          quality={100}
        />
      )}
    </div>
  );
}
