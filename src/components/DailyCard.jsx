import { useContext } from "react";
import Image from "next/image";

import { StylesContext } from "@/contexts/StylesContext";

export default function DailyCard({ data }) {
  const { DailyCardStyles } = useContext(StylesContext);

  const { weatherType, temp, day, fallbackImage } = data;

  return (
    <div className={DailyCardStyles.container}>
      <p className={DailyCardStyles.dayText}>{day}</p>
      <p className={DailyCardStyles.tempText}>{temp + "°"}</p>
      <Image
        className={DailyCardStyles.image}
        src={fallbackImage}
        width={100}
        height={100}
        alt={weatherType}
        quality={60}
      />
    </div>
  );
}
