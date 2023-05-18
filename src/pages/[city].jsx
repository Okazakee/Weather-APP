import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { StylesContext } from '@/contexts/StylesContext';
import { SystemTimeContext } from '@/contexts/SystemTimeContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { cities } from '@/utils/cities';
import HourlyTempLine from '@/components/HourlyTempLine';
import DailyCard from '@/components/DailyCard';

export async function getStaticPaths() {
  const paths = cities.map((city) => ({
    params: { city: city.name }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { city } = params;

  const selectedCity = cities.find((cityObj) => cityObj.name === city);

  return {
    props: {
      selectedCity
    }
  };
}

export default function City({ selectedCity }) {

  const { weather, CityPageStyles } = useContext(StylesContext);
  const { formatDate, formatMonth } = useContext(SystemTimeContext);

  const { name, weatherType, temperature } = selectedCity;

  return (
    <div className={`${CityPageStyles.container} ${weather[weatherType]}`}>
      <div className={CityPageStyles.topWrapper}>
        <Link href={`/`}>
          <FontAwesomeIcon className={CityPageStyles.buttons} icon={faArrowLeft} />
        </Link>
        <p className={CityPageStyles.cityName}>
          {name}
        </p>
        <FontAwesomeIcon className={CityPageStyles.buttons} icon={faSquarePlus} />
      </div>
      <div className={CityPageStyles.dateWeatherWrapper}>
        <p className={CityPageStyles.dateText}>
          {`${formatDate} ${formatMonth}`}
        </p>
        <p className={CityPageStyles.weatherText}>
          {weatherType}
        </p>
      </div>
      <div className={CityPageStyles.climateInfo}>
        <Image
          className="w-24 h-24 mt-7"
          src={`/weatherIcons/${weatherType}.png`}
          width={500}
          height={500}
          alt="weatherType"
          quality={100}
        />
        <p className={CityPageStyles.tempText}>
          {temperature + "°"}
        </p>
      </div>
      <div className={CityPageStyles.tempLine}>
        <HourlyTempLine />
      </div>
      <div className={CityPageStyles.dailyCardsWrapper}>
        <div className={CityPageStyles.cardsContainer}>
          <DailyCard data={{ weatherType: weatherType, temp: temperature, day: formatDate.slice(0, -3) }} />
          <DailyCard data={{ weatherType: "Rainy", temp: temperature, day: formatDate.slice(0, -3) }} />
          <DailyCard data={{ weatherType: "Cloudy", temp: temperature, day: formatDate.slice(0, -3) }} />
        </div>
      </div>
    </div>
  );
}