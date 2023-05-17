import {useContext} from 'react'
import { StylesContext } from '@/contexts/StylesContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse, faMagnifyingGlass, faLocationDot} from '@fortawesome/free-solid-svg-icons';

export const MobileNav = () => {

    const { navStyles } = useContext(StylesContext);

    return (
    <div className="bg-[#ffffff] mx-2 py-4 text-center rounded-2xl drop-shadow-xl flex justify-around">
       <FontAwesomeIcon icon={faHouse} />
       <FontAwesomeIcon icon={faMagnifyingGlass} />
       <FontAwesomeIcon icon={faLocationDot} />
    </div>
  )
};