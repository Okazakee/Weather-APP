import { useContext, useEffect } from "react";
import moment from "moment";

import { StylesContext } from "@/contexts/StylesContext";
import { WeatherDataContext } from "@/contexts/WeatherDataContext";

import DailyCard from "./DailyCard";

export default function DesktopWeeklyCard({accentColor}) {

  const {DesktopWeeklyCardStyles} = useContext(StylesContext);
  const { SetSelectedCity, selectedCity, detailsPageData, dailyCardData } =
    useContext(WeatherDataContext);

    return (
    <div className={`${DesktopWeeklyCardStyles.container} ${accentColor}`}>
      {dailyCardData &&
        dailyCardData.map((dayForecastData, i) => {
          return (
            <DailyCard
              key={i}
              data={{
                weatherType: dayForecastData.day.condition.text,
                temp: Math.floor(dayForecastData.day.avgtemp_c),
                day: moment(dayForecastData.date).format("dddd"),
                fallbackImage: "https:" + dayForecastData.day.condition.icon,
              }}
            />
          );
        })}
    </div>
  );
}
