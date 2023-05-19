import { useContext, useEffect, useState } from 'react'
import Image from 'next/image';

import HourlyTempLine from '@/components/HourlyTempLine';
import DailyCard from '@/components/DailyCard';

import { WeatherDataContext } from '@/contexts/WeatherDataContext';
import { StylesContext } from '@/contexts/StylesContext';
import { SystemTimeContext } from '@/contexts/SystemTimeContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Details() {

    // Various context imports
    const { weatherStyle, CityPageStyles } = useContext(StylesContext);
    const { formatDate, formatMonth } = useContext(SystemTimeContext);
    const { SetSelectedCity, selectedCity, detailsPageData } = useContext(WeatherDataContext);

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
      <div className={`${CityPageStyles.container} ${weatherStyle[detailsPageData.weatherType]}`}>
        <div className={CityPageStyles.topWrapper}>
          <div onClick={(() => SetSelectedCity(null))}>
            <FontAwesomeIcon className={CityPageStyles.buttons} icon={faArrowLeft} />
          </div>
          <p className={CityPageStyles.cityName}>
            {selectedCity}
          </p>
          <FontAwesomeIcon className={CityPageStyles.buttons} icon={faSquarePlus} />
        </div>
        <div className={CityPageStyles.dateWeatherWrapper}>
          <p className={CityPageStyles.dateText}>
            {`${formatDate} ${formatMonth}`}
          </p>
          <p className={CityPageStyles.weatherText}>
            {detailsPageData.weatherType}
          </p>
        </div>
        <div className={CityPageStyles.climateInfo}>
          <Image
            className="w-24 h-24 mt-7"
            src={`/weatherIcons/${detailsPageData.weatherType}.png`}
            width={100}
            height={100}
            alt={`${detailsPageData.weatherType}_weather_icon`}
            quality={100}
          />
          <p className={CityPageStyles.tempText}>
            {detailsPageData.temperature + "°"}
          </p>
        </div>
        <div className={CityPageStyles.tempLine}>
          <HourlyTempLine />
        </div>
        <div className={CityPageStyles.dailyCardsWrapper}>
            <DailyCard data={{ weatherType: detailsPageData.weatherType, temp: detailsPageData.temperature, day: formatDate.slice(0, -3) }} />
            <DailyCard data={{ weatherType: detailsPageData.weatherType, temp: detailsPageData.temperature, day: formatDate.slice(0, -3) }} />
            <DailyCard data={{ weatherType: detailsPageData.weatherType, temp: detailsPageData.temperature, day: formatDate.slice(0, -3) }} />
            <DailyCard data={{ weatherType: detailsPageData.weatherType, temp: detailsPageData.temperature, day: formatDate.slice(0, -3) }} />
            <DailyCard data={{ weatherType: detailsPageData.weatherType, temp: detailsPageData.temperature, day: formatDate.slice(0, -3) }} />
            <DailyCard data={{ weatherType: detailsPageData.weatherType, temp: detailsPageData.temperature, day: formatDate.slice(0, -3) }} />
            <DailyCard data={{ weatherType: detailsPageData.weatherType, temp: detailsPageData.temperature, day: formatDate.slice(0, -3) }} />
        </div>
      </div>
    );
  }