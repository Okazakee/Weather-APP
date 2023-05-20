import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";

import HourlyTempLine from "@/components/HourlyTempLine";
import DailyCard from "@/components/DailyCard";

import { WeatherDataContext } from "@/contexts/WeatherDataContext";
import { StylesContext } from "@/contexts/StylesContext";
import { SystemContext } from "@/contexts/SystemContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Details() {
  // Various context imports
  const { weatherStyle, DetailsPageStyles } = useContext(StylesContext);
  const { formatDate, formatMonth } = useContext(SystemContext);
  const { SetSelectedCity, selectedCity, detailsPageData, dailyCardData } =
    useContext(WeatherDataContext);

  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    if (detailsPageData) {
      SetIsLoading(false);
    }
  }, [detailsPageData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`${DetailsPageStyles.container} ${
        weatherStyle[detailsPageData.weatherType]
      }`}
    >
      <div className={DetailsPageStyles.topWrapper}>
        <div onClick={() => SetSelectedCity(null)}>
          <FontAwesomeIcon
            className={DetailsPageStyles.buttons}
            icon={faArrowLeft}
          />
        </div>
        <p className={DetailsPageStyles.cityName}>{selectedCity}</p>
        <FontAwesomeIcon
          className={DetailsPageStyles.buttons}
          icon={faSquarePlus}
        />
      </div>
      <div className={DetailsPageStyles.dateWeatherWrapper}>
        <p className={DetailsPageStyles.dateText}>
          {`${formatDate} ${formatMonth}`}
        </p>
        <p className={DetailsPageStyles.weatherText}>
          {detailsPageData.weatherType}
        </p>
      </div>
      <div className={DetailsPageStyles.climateInfo}>
        <Image
          className="w-22 h-22 mt-7 drop-shadow-sm"
          src={`/weatherIcons/${detailsPageData.weatherType}.png`}
          width={100}
          height={100}
          alt={`${detailsPageData.weatherType}_weather_icon`}
          quality={100}
        />
        <p className={DetailsPageStyles.tempText}>
          {detailsPageData.temperature + "°"}
        </p>
      </div>
      <div className={DetailsPageStyles.tempLine}>
        <HourlyTempLine />
      </div>
      <div className={DetailsPageStyles.dailyCardsWrapper}>
        {dailyCardData &&
          dailyCardData.map((dayForecastData, i) => {
            console.log(dayForecastData);
            return (
              <DailyCard
                key={i}
                data={{
                  weatherType: dayForecastData.weather.description,
                  temp: Math.floor(dayForecastData.temp),
                  day: moment(dayForecastData.datetime).format("dddd"),
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
