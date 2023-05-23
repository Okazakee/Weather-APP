import { useContext } from "react";
import Image from "next/image";

import { StylesContext } from "@/contexts/StylesContext";
import { WeatherDataContext } from "@/contexts/WeatherDataContext";

export default function WindCard({ accentColor }) {
  const { DesktopMonthlyCardStyles, WindCardStyles } =
    useContext(StylesContext);
  const { windCardData } = useContext(WeatherDataContext);

  return (
    <div className={WindCardStyles.wrapper}>
      <div className={`${DesktopMonthlyCardStyles.container} ${accentColor}`}>
        {windCardData &&
          windCardData.map((dayInfo, i) => {
            return (
              <div key={i} className={WindCardStyles.cardContainer}>
                <div className={WindCardStyles.leftChunk}>
                  <p className={WindCardStyles.date}>{dayInfo.date}</p>
                  <Image
                    className={WindCardStyles.windIcon}
                    src={"/weatherIcons/wind-svgrepo-com.svg"}
                    width={110}
                    height={110}
                    alt={"Wind_icon"}
                    quality={80}
                  />
                </div>
                <div className={WindCardStyles.rightChunk}>
                  <p className={WindCardStyles.temp}>{dayInfo.avgtemp_c}°</p>
                  <p>{`${dayInfo.wind_type}, ${dayInfo.maxwind_mph} (mph)`}</p>
                  <p>
                    The high will be {dayInfo.maxtemp_c}°C, the low will be{" "}
                    {dayInfo.mintemp_c}°C.
                  </p>
                  <div>
                    <p>Humidity: {dayInfo.avghumidity}%</p>
                    <p>UV: {dayInfo.uv}</p>
                    <p>
                      Dew point:{" "}
                      {dayInfo.dew_point ? `${dayInfo.dew_point}°C` : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
