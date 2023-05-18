import { useContext } from 'react';
import { StylesContext } from '@/contexts/StylesContext';
import { SystemTimeContext } from '@/contexts/SystemTimeContext';

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
      {name}
      {formatDate}
      {formatMonth}
      {weatherType}
      {temperature}
    </div>
  );
}