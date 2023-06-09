import { useContext } from "react";
import { useRouter } from "next/router";

import { StylesContext } from "@/contexts/StylesContext";
import { WeatherDataContext } from "@/contexts/WeatherDataContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export const MobileNav = () => {
  // NextJS router
  const router = useRouter();

  // Import Navbar styles from context
  const { navStyles, updateSelectedIcon } = useContext(StylesContext);
  const { SetSelectedCity } = useContext(WeatherDataContext);

  const navBtnsArray = [faHouse, faMagnifyingGlass, faLocationDot];

  const handleButtonClick = (index) => {
    if (index === 0) {
      SetSelectedCity(null);
    }
    updateSelectedIcon(index);
  };

  return (
    <div className={navStyles.navbar}>
      {navBtnsArray.map((button, i) => (
        <div
          className={navStyles.div1(i)}
          key={i}
          onClick={() => handleButtonClick(i)}
        >
          <FontAwesomeIcon className={navStyles.buttons(i)} icon={button} />
        </div>
      ))}
    </div>
  );
};
