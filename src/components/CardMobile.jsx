import { useContext } from 'react'
import { StylesContext } from '@/contexts/StylesContext';
import { SystemTimeContext } from '@/contexts/SystemTimeContext';

import Image from 'next/image';

export default function CardMobile({city}) {

    // Import Card styles and SystemDate form context
    const { CardMobileStyles, weather } = useContext(StylesContext);
    const { formatDate, formatMonth, formatTime } = useContext(SystemTimeContext);

    const { name, weatherType, temperature } = city;

    return (
    <div
        className={`${CardMobileStyles.cardContainer} ${weather[weatherType]}`}>
        <div className={CardMobileStyles.cardWrapper}>
            <div className={CardMobileStyles.cardElement}>
                <div className={CardMobileStyles.leftInfoWrapper}>
                    <div className={CardMobileStyles.cityName}>
                        {name}
                    </div>
                    <div className={CardMobileStyles.currentDate}>
                        {formatDate}
                    </div>
                    <div className={CardMobileStyles.currentDate}>
                        {formatMonth}
                    </div>
                    <div className={CardMobileStyles.currentHour}>
                        {formatTime}
                    </div>
                </div>
            </div>
            <div className={CardMobileStyles.cardElement}>
                <Image
                    className="w-20 h-20"
                    src={`/weatherIcons/${weatherType}.png`}
                    width={500}
                    height={500}
                    alt="weatherType"
                    quality={100}
                />
            </div>
            <div className={CardMobileStyles.cardElement}>
                <h1 className={CardMobileStyles.tempText}>
                    {temperature + "°"}
                </h1>
            </div>
        </div>
    </div>
  )
}
