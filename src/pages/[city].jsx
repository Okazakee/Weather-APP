import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { StylesContext } from '@/contexts/StylesContext';
import { SystemTimeContext } from '@/contexts/SystemTimeContext';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import HourlyTempLine from '@/components/HourlyTempLine';
import DailyCard from '@/components/DailyCard';

export async function getStaticPaths() {

  const cities = ['London', 'Turin', 'Rome'];

  const paths = cities.map((city) => ({
    params: { city: city }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { city } = params;

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('Missing API key');
  }

  try {
    const fetchedWeatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=1&appid=${apiKey}`
    );

    return {
      props: {
        city,
        fetchedWeatherData: fetchedWeatherData.data,
      },
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      props: {
        city,
        fetchedWeatherData: null,
      },
    };
  }
}

export default function City({ city, fetchedWeatherData }) {

  // Various context imports
  const { weatherStyle, CityPageStyles } = useContext(StylesContext);
  const { formatDate, formatMonth } = useContext(SystemTimeContext);

  const { weather, main } = fetchedWeatherData;

  const filteredWeatherData = {
      weatherType: weather[0].main,
      temp: Math.floor(main.temp - 273.15)
    };

  return (
    <div className={`${CityPageStyles.container} ${weatherStyle[filteredWeatherData.weatherType]}`}>
      <div className={CityPageStyles.topWrapper}>
        <Link href={`/`}>
          <FontAwesomeIcon className={CityPageStyles.buttons} icon={faArrowLeft} />
        </Link>
        <p className={CityPageStyles.cityName}>
          {city}
        </p>
        <FontAwesomeIcon className={CityPageStyles.buttons} icon={faSquarePlus} />
      </div>
      <div className={CityPageStyles.dateWeatherWrapper}>
        <p className={CityPageStyles.dateText}>
          {`${formatDate} ${formatMonth}`}
        </p>
        <p className={CityPageStyles.weatherText}>
          {filteredWeatherData.weatherType}
        </p>
      </div>
      <div className={CityPageStyles.climateInfo}>
        <Image
          className="w-24 h-24 mt-7"
          src={`/weatherIcons/${filteredWeatherData.weatherType}.png`}
          width={100}
          height={100}
          alt={`${filteredWeatherData.weatherType}_weather_icon`}
          quality={100}
        />
        <p className={CityPageStyles.tempText}>
          {filteredWeatherData.temp + "°"}
        </p>
      </div>
      <div className={CityPageStyles.tempLine}>
        <HourlyTempLine />
      </div>
      <div className={CityPageStyles.dailyCardsWrapper}>
          <DailyCard data={{ weatherType: filteredWeatherData.weatherType, temp: filteredWeatherData.temp, day: formatDate.slice(0, -3) }} />
          <DailyCard data={{ weatherType: "Rainy", temp: filteredWeatherData.temp, day: formatDate.slice(0, -3) }} />
          <DailyCard data={{ weatherType: "Cloudy", temp: filteredWeatherData.temp, day: formatDate.slice(0, -3) }} />
          <DailyCard data={{ weatherType: filteredWeatherData.weatherType, temp: filteredWeatherData.temp, day: formatDate.slice(0, -3) }} />
          <DailyCard data={{ weatherType: "Rainy", temp: filteredWeatherData.temp, day: formatDate.slice(0, -3) }} />
          <DailyCard data={{ weatherType: "Cloudy", temp: filteredWeatherData.temp, day: formatDate.slice(0, -3) }} />
          <DailyCard data={{ weatherType: "Cloudy", temp: filteredWeatherData.temp, day: formatDate.slice(0, -3) }} />
      </div>
    </div>
  );
}