import { useContext } from "react";
import moment from "moment";

import { StylesContext } from "@/contexts/StylesContext";
import { WeatherDataContext } from "@/contexts/WeatherDataContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function HourlyTempLine({ currentTemp }) {
  const { isMobile, HourlyLineStyles } = useContext(StylesContext);
  const { hourlyLineData } = useContext(WeatherDataContext);

  return (
    <div className={HourlyLineStyles.wrapper}>
      {hourlyLineData &&
        hourlyLineData.map((hourInfo, i) => {

          return (
            <div key={i} className={HourlyLineStyles.container}>
              <div className={HourlyLineStyles.innerBox(i)}>
                {isMobile && isMobile ? (
                  <>
                    {i === 0 ? (
                      <p className={HourlyLineStyles.p}>Now</p>
                    ) : (
                      <p className={HourlyLineStyles.p}>
                        {moment(hourInfo.time).format("hh A")}
                      </p>
                    )}
                    <FontAwesomeIcon className={HourlyLineStyles.dot(i)} icon={faCircle} />
                    {i === 0 ? (
                      <p>{`${currentTemp}°`}</p>
                    ) : (
                      <p>{`${Math.floor(hourInfo.temp)}°`}</p>
                    )}
                  </>
                ) : (
                  <>
                    {i === 0 ? (
                      <p>{`${currentTemp}°`}</p>
                    ) : (
                      <p className={HourlyLineStyles.tempText}>{`${Math.floor(hourInfo.temp)}°`}</p>
                    )}
                    <FontAwesomeIcon className={HourlyLineStyles.dot(i)} icon={faCircle} />
                    {i === 0 ? (
                      <p className={"text-transparent px-[1.7rem]"}></p>
                    ) : (
                      <p className={HourlyLineStyles.p}>
                        {moment(hourInfo.time).format("hh A")}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}