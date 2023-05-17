import { useContext } from 'react';
import { StylesContext } from '@/contexts/StylesContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faLocationDot } from '@fortawesome/free-solid-svg-icons';

export const MobileNav = () => {
  const { navStyles, updateSelectedIcon } = useContext(StylesContext);

  const navBtnsArray = [faHouse, faMagnifyingGlass, faLocationDot];

  return (
    <div className={navStyles.navbar}>
      {navBtnsArray.map((button, i) => (
        <div
            className={navStyles.div1(i)}
            key={i}
            onClick={() => updateSelectedIcon(i)}>
                <FontAwesomeIcon
                    className={navStyles.buttons(i)}
                    icon={button}
                />
        </div>
      ))}
    </div>
  );
};
