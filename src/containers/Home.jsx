import { useContext, useEffect } from "react";

import HourlyTempLine from "@/components/HourlyTempLine";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

import { WeatherDataContext } from "@/contexts/WeatherDataContext";
import { StylesContext } from "@/contexts/StylesContext";

import WeatherCard from "@/components/WeatherCard";
import GiantCard from "@/components/GiantCard";
import NavCard from "@/components/NavCard";
import WindCard from "@/components/WindCard";
import DesktopWeeklyCard from "@/components/DesktopWeeklyCard";

export default function Home() {
  // Import Home styles from context
  const {
    HomeStyles,
    isMobile,
    weatherStyle,
    updateSelectedWidget,
    selectedPeriod,
    SetAccentColor,
    accentColor,
  } = useContext(StylesContext);

  const {
    SetSelectedCity,
    selectedCity,
    currentWeather,
    avaliableCities,
    windCardData,
  } = useContext(WeatherDataContext);

  const widgetButtons = ["This Week", "This Month"];

  useEffect(() => {
    selectedCity &&
      SetAccentColor(
        weatherStyle[currentWeather[selectedCity].weather[0].main]
      );
  }, [SetAccentColor, selectedCity, weatherStyle, currentWeather]);

  return (
    <div className={HomeStyles.homeWrapper}>
      {!isMobile && (
        <div className={HomeStyles.firstZone}>
          <div className={HomeStyles.topLeft}>
            <GiantCard />
          </div>
          <div className={HomeStyles.widgetWrapper}>
            <div className={HomeStyles.widget1}>
              <p className={HomeStyles.labelLeft}>Today</p>
              <div
                className={`${HomeStyles.hourlyLineDesktop} ${
                  selectedCity &&
                  weatherStyle[currentWeather[selectedCity].weather[0].main]
                }`}
              >
                <p className={HomeStyles.nowLabel}>Now</p>
                {selectedCity && (
                  <HourlyTempLine
                    currentTemp={Math.floor(
                      currentWeather[selectedCity].main.temp
                    )}
                  />
                )}
              </div>
            </div>
            <div className={HomeStyles.widget2}>
              <div
                className={`${HomeStyles.widgetNav} ${
                  selectedCity &&
                  weatherStyle[currentWeather[selectedCity].weather[0].main]
                }`}
              >
                {widgetButtons.map((button, i) => {
                  return (
                    <div
                      key={i}
                      className={`${HomeStyles.labelButtons(i)}`}
                      onClick={() => updateSelectedWidget(i)}
                    >
                      {button}
                    </div>
                  );
                })}
              </div>
              {selectedPeriod[0] ? (
                <DesktopWeeklyCard accentColor={accentColor} />
              ) : (
                <WindCard accentColor={accentColor} />
              )}
            </div>
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
          <div className={HomeStyles.navContainer}>
            <div className={HomeStyles.widgetZoneRight}>
              <p className={HomeStyles.labelRight}>Search</p>
              <NavCard isSearch={true} />
            </div>
            <div className={HomeStyles.widgetZoneRight}>
              <p className={HomeStyles.labelRight}>Localization</p>
              <NavCard isSearch={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
