import { useContext } from 'react'
import { StylesContext } from '@/contexts/StylesContext';

import Image from 'next/image';

export default function CardMobile({city}) {

    const { CardMobileStyles } = useContext(StylesContext);

    const { name, date, hour, weatherType, temperature } = city;

    return (
    <div className={`${CardMobileStyles.cardContainer} ${CardMobileStyles.weather[weatherType]}`}>
        <div className={CardMobileStyles.cardWrapper}>
            <div className={CardMobileStyles.cardElement}>
                <div className={CardMobileStyles.leftInfoWrapper}>
                    <div className={CardMobileStyles.cityName}>
                        {name}
                    </div>
                    <div>
                        {date}
                    </div>
                    <div className={CardMobileStyles.currentHour}>
                        {hour}
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
                <h1 className={CardMobileStyles.tempC}>
                    {temperature + "°"}
                </h1>
            </div>
        </div>
    </div>
  )
}
