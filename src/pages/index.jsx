import { useContext } from 'react'
import { StylesContext } from '@/contexts/StylesContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import CardMobile from '@/components/CardMobile';
import { cities } from '@/utils/cities';

export default function Home() {

  // Import Home styles from context
  const { HomeStyles } = useContext(StylesContext);

  return (
    <>
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
          return <CardMobile key={i} city={city} />
        })}
      </div>
    </>
  )
}
