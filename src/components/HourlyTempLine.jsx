import { useContext } from "react";
import moment from "moment";

import { StylesContext } from "@/contexts/StylesContext";
import { WeatherDataContext } from "@/contexts/WeatherDataContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function HourlyTempLine({ currentTemp }) {
  const { HourlyLineStyles } = useContext(StylesContext);
  const { hourlyLineData } = useContext(WeatherDataContext);

  return (
    <div className={HourlyLineStyles.wrapper}>
      {hourlyLineData &&
        hourlyLineData.map((hourInfo, i) => {
          return (
            <div key={i} className={HourlyLineStyles.container}>
              <div className={HourlyLineStyles.innerBox(i)}>
                {i === 0 ? (
                  <p className={HourlyLineStyles.p}>Now</p>
                ) : (
                  <p className={HourlyLineStyles.p}>
                    {moment(hourInfo.time).format("hh:mm A")}
                  </p>
                )}
                <FontAwesomeIcon className={"mx-auto"} icon={faCircle} />
                {i === 0 ? (
                  <p>{`${currentTemp}°`}</p>
                ) : (
                  <p>{`${Math.floor(hourInfo.temp)}°`}</p>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
