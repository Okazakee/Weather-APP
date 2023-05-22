import { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

import { WeatherDataContext } from "@/contexts/WeatherDataContext";
import { StylesContext } from "@/contexts/StylesContext";

import WeatherCard from "@/components/WeatherCard";
import GiantCard from "@/components/GiantCard";
import NavCard from "@/components/NavCard";

export default function Home() {
  // Import Home styles from context
  const { HomeStyles, isMobile } = useContext(StylesContext);

  const { SetSelectedCity, selectedCity, currentWeather, avaliableCities } =
    useContext(WeatherDataContext);

  return (
    <div className={HomeStyles.homeWrapper}>
      {!isMobile && (
        <div className={HomeStyles.firstZone}>
          <div className={HomeStyles.topLeft}>
            <GiantCard />
          </div>
          <div className={HomeStyles.downLeft}>
            <div className={HomeStyles.todayWidget}>today widget zone</div>
            <div className={HomeStyles.weekWidget}>week widget zone</div>
          </div>
        </div>
      )}
      <div className={HomeStyles.secondZone}>
        <div className={HomeStyles.div1}>
          <h1 className={HomeStyles.h1}>Good morning!</h1>
          <h1 className={HomeStyles.h1}>User</h1>
        </div>
        <div className={HomeStyles.addCityButtonDiv}>
          <FontAwesomeIcon className={HomeStyles.buttons} icon={faSquarePlus} />
          <p className={HomeStyles.p}>Add city</p>
        </div>
        <div className={HomeStyles.cardWrapper}>
          {currentWeather &&
            avaliableCities &&
            avaliableCities.map((city, i) => {

              if (!isMobile && city === selectedCity) {
                return null; // Skip rendering the element
              }

              return (
                <div key={i} onClick={() => SetSelectedCity(city)}>
                  <WeatherCard
                    key={i}
                    cityName={city}
                    currentWeather={currentWeather[city]}
                  />
                </div>
              );
            })}
        </div>
        {!isMobile && (
          <div className={HomeStyles.downRightContainer}>
            <div className={HomeStyles.NavCard}>
              <p className={HomeStyles.label}>Search</p>
              <NavCard isSearch={true} />
            </div>
            <div className={HomeStyles.NavCard}>
              <p className={HomeStyles.label}>Localization</p>
              <NavCard isSearch={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
