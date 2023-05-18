import { useContext, useEffect } from 'react';
import Image from 'next/image';

import { StylesContext } from '@/contexts/StylesContext';
import { SystemTimeContext } from '@/contexts/SystemTimeContext';

export default function CardMobile({ cityName, weatherData }) {

    // Import Card styles and SystemDate from context
    const { CardMobileStyles, weatherStyle } = useContext(StylesContext);
    const { formatDate, formatMonth, formatTime } = useContext(SystemTimeContext);

    const { weather, main } = weatherData;

    const filteredWeatherData = {
        weatherType: weather[0].main,
        temp: Math.floor(main.temp - 273.15)
      };

    return (
        <div className={`${CardMobileStyles.cardContainer} ${weatherStyle[filteredWeatherData.weatherType]}`}>
            <div className={CardMobileStyles.cardWrapper}>
                <div className={CardMobileStyles.cardElement}>
                    <div className={CardMobileStyles.leftInfoWrapper}>
                        <div className={CardMobileStyles.cityName}>{cityName}</div>
                        <div className={CardMobileStyles.currentDate}>{formatDate}</div>
                        <div className={CardMobileStyles.currentDate}>{formatMonth}</div>
                        <div className={CardMobileStyles.currentHour}>{formatTime}</div>
                    </div>
                </div>
                <div className={CardMobileStyles.cardElement}>
                <Image
                    className="w-20 h-20"
                    src={`/weatherIcons/${filteredWeatherData.weatherType}.png`}
                    width={100}
                    height={100}
                    alt={`${filteredWeatherData.weatherType}_weather_icon`}
                    quality={100}
                />
                </div>
                <div className={CardMobileStyles.cardElement}>
                <h1 className={CardMobileStyles.tempText}>{filteredWeatherData.temp + "°"}</h1>
                </div>
            </div>
        </div>
    );
}
