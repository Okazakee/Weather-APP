import {useContext} from 'react'

import { StylesContext } from '@/contexts/StylesContext';
import { WeatherDataContext } from '@/contexts/WeatherDataContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function NavCard({isSearch}) {

  const { NavCardStyles, weatherStyle } = useContext(StylesContext);
  const { selectedCity, currentWeather } = useContext(WeatherDataContext);

  return (
    <div>
      {isSearch ? (
        <div className={`${NavCardStyles.container} + ${isSearch && "bg-white"}`}>
          <div className={NavCardStyles.innerDiv}>
            <input
              type="search"
              placeholder="ex: Miami"
              className={NavCardStyles.searchInput}
            />
            <div className={`${NavCardStyles.searchIcon} + ${selectedCity && weatherStyle[currentWeather[selectedCity].weather[0].main]}`}>
              <FontAwesomeIcon className={"text-2xl px-2"} icon={faMagnifyingGlass} />
            </div>
          </div>
        </div>
      )
      : (
        <div className={`${NavCardStyles.container} + ${selectedCity && weatherStyle[currentWeather[selectedCity].weather[0].main]}`}>
          <div className={NavCardStyles.innerDiv}>
            <FontAwesomeIcon className={"text-3xl"} icon={faLocationDot} />
            <p>Add Localization</p>
          </div>
        </div>
      )
      }
    </div>
  )
}
