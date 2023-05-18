import { useContext } from 'react';
import Link from 'next/link';

import { StylesContext } from '@/contexts/StylesContext';
import { SystemTimeContext } from '@/contexts/SystemTimeContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { cities } from '@/utils/cities';

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

  const selectedCity = cities.find((City) => City.name === city);

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
        <FontAwesomeIcon className={CityPageStyles.buttons} icon={faArrowLeft} />
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
      <div>
        {/* temp + img */}
      </div>
    </div>
  );
}