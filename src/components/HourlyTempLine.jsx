import { useContext } from "react";

import { StylesContext } from "@/contexts/StylesContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function HourlyTempLine() {
  const { HourlyLineStyles } = useContext(StylesContext);

  const testData = [
    { hour: "Now", temp: "22" },
    { hour: "09 PM", temp: "10" },
    { hour: "09 PM", temp: "10" },
    { hour: "09 PM", temp: "10" },
    { hour: "09 PM", temp: "10" },
    { hour: "09 PM", temp: "10" },
    { hour: "09 PM", temp: "10" },
    { hour: "09 PM", temp: "10" },
    { hour: "09 PM", temp: "10" },
    { hour: "09 PM", temp: "10" },
    { hour: "09 PM", temp: "10" },
    { hour: "09 PM", temp: "10" },
  ];

  return (
    <div className={HourlyLineStyles.wrapper}>
      {testData &&
        testData.map((hourInfo, i) => {
          return (
            <div key={i} className={HourlyLineStyles.container}>
              <div className={HourlyLineStyles.innerBox(i)}>
                <p className={HourlyLineStyles.p}>{hourInfo.hour}</p>
                <FontAwesomeIcon className={"mx-auto"} icon={faCircle} />
                <p>{`${hourInfo.temp}°`}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
