import { useContext } from 'react'
import { StylesContext } from '@/contexts/StylesContext';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import CardMobile from '@/components/CardMobile';

export default function Home() {

  const { HomeStyles } = useContext(StylesContext);

  // Date info from system
  const currentDate = moment();
  const formatDate = currentDate.format('dddd D,') + "\n" + currentDate.format('MMM');
  const formatTime = currentDate.format('hh:mm A');

  // Testing cities obj
  const cities = [{
    name: "London",
    date: formatDate,
    hour: formatTime,
    weatherType: "sunnyAndRainy",
    temperature: 18
  },
  {
    name: "Turin",
    date: formatDate,
    hour: formatTime,
    weatherType: "sunny",
    temperature: 22
  },
  {
    name: "Rome",
    date: formatDate,
    hour: formatTime,
    weatherType: "cloudy",
    temperature: 20
  }];

  return (
    <>
      <div className={HomeStyles.div1}>
        <h1 className={HomeStyles.h1}>
          Good morning!
        </h1>
        <h1 className={HomeStyles.h1}>
          Mario
        </h1>
      </div>
      <div className={HomeStyles.div2}>
        <FontAwesomeIcon className={HomeStyles.buttons} icon={faSquarePlus} />
        <p className={HomeStyles.p}>Add city</p>
      </div>
      <div>
        {cities.map((city, i) => {
          return <CardMobile key={i} city={city} />
        })}
      </div>
    </>
  )
}
