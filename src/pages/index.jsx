import { useContext } from 'react'
import { StylesContext } from '@/contexts/StylesContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Home() {

  const { HomeStyles } = useContext(StylesContext);

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
        <p className={HomeStyles.p}>Aggiungi città</p>
      </div>
    </>
  )
}
