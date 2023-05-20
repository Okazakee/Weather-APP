import { useContext } from 'react'
import Image from 'next/image';

import { StylesContext } from '@/contexts/StylesContext';
import { WeatherDataContext } from '@/contexts/WeatherDataContext';

export default function GiantCard() {

    const { GiantCardStyles } = useContext(StylesContext);
    const { selectedCity, currentWeather } = useContext(WeatherDataContext);


  return (
    <div className={GiantCardStyles.container}>
      {selectedCity &&
        <Image
          className=""
          src={selectedCity && currentWeather[selectedCity].imageUrl}
          width={100}
          height={100}
          alt={`${selectedCity} image from Unsplash`}
          quality={100}
        />
      }
    </div>
  )
}
