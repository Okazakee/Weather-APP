import { useContext, useEffect, useState } from 'react'
import Image from 'next/image';

import HourlyTempLine from '@/components/HourlyTempLine';
import DailyCard from '@/components/DailyCard';

import { WeatherDataContext } from '@/contexts/WeatherDataContext';
import { StylesContext } from '@/contexts/StylesContext';
import { SystemContext } from '@/contexts/SystemContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Details() {

    // Various context imports
    const { weatherStyle, DetailsPageStyles } = useContext(StylesContext);
    const { formatDate, formatMonth } = useContext(SystemContext);
    const { SetSelectedCity, selectedCity, detailsPageData, dailyCardData } = useContext(WeatherDataContext);

    const [isLoading, SetIsLoading] = useState(true)

    useEffect(() => {
      if (detailsPageData) {
        SetIsLoading(false);
      }
    }, [detailsPageData])

    if (isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div className={`${DetailsPageStyles.container} ${weatherStyle[detailsPageData.weatherType]}`}>
        <div className={DetailsPageStyles.topWrapper}>
          <div onClick={(() => SetSelectedCity(null))}>
            <FontAwesomeIcon className={DetailsPageStyles.buttons} icon={faArrowLeft} />
          </div>
          <p className={DetailsPageStyles.cityName}>
            {selectedCity}
          </p>
          <FontAwesomeIcon className={DetailsPageStyles.buttons} icon={faSquarePlus} />
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
            className="w-24 h-24 mt-7 drop-shadow-sm"
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
            {dailyCardData && dailyCardData.map((dayForecastData, i) => {
                <DailyCard key={i} data={{ weatherType: dayForecastData[i].weather.description, temp: Math.floor(dayForecastData[i].temp), day: moment(dayForecastData[i].datetime).format('dddd') }} />
            })}
            {/* <DailyCard data={{ weatherType: detailsPageData.weatherType, temp: detailsPageData.temperature, day: formatDate.slice(0, -3) }} />
            <DailyCard data={{ weatherType: detailsPageData.weatherType, temp: detailsPageData.temperature, day: formatDate.slice(0, -3) }} />
            <DailyCard data={{ weatherType: detailsPageData.weatherType, temp: detailsPageData.temperature, day: formatDate.slice(0, -3) }} />
            <DailyCard data={{ weatherType: detailsPageData.weatherType, temp: detailsPageData.temperature, day: formatDate.slice(0, -3) }} />
            <DailyCard data={{ weatherType: detailsPageData.weatherType, temp: detailsPageData.temperature, day: formatDate.slice(0, -3) }} />
            <DailyCard data={{ weatherType: detailsPageData.weatherType, temp: detailsPageData.temperature, day: formatDate.slice(0, -3) }} /> */}
        </div>
      </div>
    );
  }