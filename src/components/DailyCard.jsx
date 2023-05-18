import { useContext } from 'react';
import Image from 'next/image';

import { StylesContext } from '@/contexts/StylesContext';

export default function DailyCard({data}) {

    const { DailyCardStyles } = useContext(StylesContext);

    const { weatherType, temp, day } = data;

    return (
    <div className={DailyCardStyles.container}>
        <p className={DailyCardStyles.dayText}>{day}</p>
        <p className={DailyCardStyles.tempText}>{temp + "°"}</p>
        <Image
          className="w-20 pb-3 mx-auto"
          src={`/weatherIcons/${weatherType}.png`}
          width={500}
          height={500}
          alt="weatherType"
          quality={100}
        />
    </div>
  )
}
