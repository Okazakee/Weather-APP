import { useContext } from 'react'
import { StylesContext } from '@/contexts/StylesContext';

import { cities } from '@/utils/cities';

export async function getStaticPaths() {

  const paths = cities.map((city) => ({
    params: { city: city.name }
  }));

  return {
    paths,
    fallback: true // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  // Find the city data based on the provided name parameter
  const { city } = params; // Destructure the 'city' parameter from params

  // Find the city data based on the provided name parameter
  const selectedCity = cities.find((City) => City.name === city);

  return {
    props: {
      city: selectedCity
    }
  };
}

export default function City({city}) {

  const { CardMobileStyles, CityPageStyles } = useContext(StylesContext);

  return (
    <div className={`${CityPageStyles.container} ${CardMobileStyles.weather[city.weatherType]}`}>
      {city.name}
      {city.date}
      {city.month}
      {city.weatherType}
      {city.temperature}
    </div>
  )
}
