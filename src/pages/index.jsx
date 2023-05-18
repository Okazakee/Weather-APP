import { useContext, useEffect } from 'react'
import Link from 'next/link';
import axios from 'axios';

import { StylesContext } from '@/contexts/StylesContext';

import CardMobile from '@/components/CardMobile';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

import { cities } from '@/utils/cities';
import { WeatherDataContext } from '@/contexts/WeatherDataContext';

export async function getServerSideProps() {

  // Hardcoded 3 main cities to check
  const cities = ['London', 'Turin', 'Rome'];

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('Missing API key');
  }

  try {
    const fetchedWeatherData = await Promise.all(
      cities.map(async (cityName) => {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&limit=1&appid=${apiKey}`
        );
        return response.data;
      })
    );

    return {
      props: {
        fetchedWeatherData,
      },
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

export default function Home({fetchedWeatherData}) {

  // Import Home styles from context
  const { HomeStyles } = useContext(StylesContext);

  // Import weather data from context
  const { SetWeatherData } = useContext(WeatherDataContext);

  useEffect(() => {
    SetWeatherData(fetchedWeatherData);
  }, [fetchedWeatherData])

  return (
    <div>
      <div className={HomeStyles.div1}>
        <h1 className={HomeStyles.h1}>
          Good morning!
        </h1>
        <h1 className={HomeStyles.h1}>
          User
        </h1>
      </div>
      <div className={HomeStyles.addCityButtonDiv}>
        <FontAwesomeIcon className={HomeStyles.buttons} icon={faSquarePlus} />
        <p className={HomeStyles.p}>Add city</p>
      </div>
      <div>
        {cities.map((city, i) => {
          return (
            <Link href={`/${city.name}`} key={i}>
              <CardMobile key={i} cityName={city.name} weatherData={fetchedWeatherData[i]} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}