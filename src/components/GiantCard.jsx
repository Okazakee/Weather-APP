import { useContext } from 'react'
import { createApi } from 'unsplash-js';

import { StylesContext } from '@/contexts/StylesContext';
import { WeatherDataContext } from '@/contexts/WeatherDataContext';

export default function GiantCard() {

    const { GiantCardStyles } = useContext(StylesContext);
    const { selectedCity } = useContext(WeatherDataContext);


  return (
    <div className={GiantCardStyles.container}>
        GiantCard
    </div>
  )
}
