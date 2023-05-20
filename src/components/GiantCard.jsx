import { useContext } from "react";
import Image from "next/image";

import { StylesContext } from "@/contexts/StylesContext";
import { WeatherDataContext } from "@/contexts/WeatherDataContext";

export default function GiantCard() {
  const { GiantCardStyles } = useContext(StylesContext);
  const { selectedCity, currentWeather } = useContext(WeatherDataContext);

  return (
    <div className={GiantCardStyles.container}>
      {selectedCity && (
        <Image
          className=""
          src={selectedCity && currentWeather[selectedCity].imageUrl}
          width={1000}
          height={1000}
          alt={`${selectedCity} image from Pexels`}
          quality={100}
        />
      )}
    </div>
  );
}
