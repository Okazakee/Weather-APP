import { useContext } from 'react';
import Image from 'next/image';

import { StylesContext } from '@/contexts/StylesContext';
import { SystemTimeContext } from '@/contexts/SystemTimeContext';

export default function CardMobile({ cityName, weatherData }) {

    // Import Card styles and SystemDate from context
    const { CardMobileStyles, weatherStyle } = useContext(StylesContext);
    const { formatDate, formatMonth, formatTime } = useContext(SystemTimeContext);

    const {weather, main} = weatherData;

    weatherData = {
        weatherType: weather[0].main,
        temp: Math.floor(main.temp)
      };

    return (
        <div className={`${CardMobileStyles.cardContainer} ${weatherStyle[weatherData.weatherType]}`}>
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
                    className="w-20 h-20"
                    src={`/weatherIcons/${weatherData.weatherType}.png`}
                    width={100}
                    height={100}
                    alt={`${weatherData.weatherType}_weather_icon`}
                    quality={100}
                />
                </div>
                <div className={CardMobileStyles.cardElement3}>
                    <h1 className={CardMobileStyles.tempText}>{weatherData.temp + "°"}</h1>
                </div>
            </div>
        </div>
    );
}
