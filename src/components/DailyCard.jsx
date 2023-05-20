import { useContext } from "react";
import Image from "next/image";

import { StylesContext } from "@/contexts/StylesContext";

export default function DailyCard({ data }) {
  const { DailyCardStyles } = useContext(StylesContext);

  const { weatherType, temp, day } = data;

  return (
    <div className={DailyCardStyles.container}>
      <p className={DailyCardStyles.dayText}>{day}</p>
      <p className={DailyCardStyles.tempText}>{temp + "°"}</p>
      <Image
        className="pb-3 mx-auto drop-shadow-sm"
        src={`/weatherIcons/${weatherType}.png`}
        width={80}
        height={80}
        alt={weatherType}
        quality={60}
      />
    </div>
  );
}
