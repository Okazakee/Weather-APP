import { createContext, useState, useEffect } from "react";
import moment from "moment";

const SystemContext = createContext();

const SystemProvider = ({ children }) => {
  // State management for current system time and data
  const [formatDate, setFormatDate] = useState("");
  const [formatMonth, setFormatMonth] = useState("");
  const [formatTime, setFormatTime] = useState("");

  useEffect(() => {
    const updateSystemTime = () => {
      const currentDate = moment();
      const formattedDate = currentDate.format("dddd D,");
      const formattedMonth = currentDate.format("MMM");
      const formattedTime = currentDate.format("hh:mm A");

      setFormatDate(formattedDate);
      setFormatMonth(formattedMonth);
      setFormatTime(formattedTime);
    };

    // Update the system time initially
    updateSystemTime();

    // Set up a timer to update the system time every minute
    const timer = setInterval(updateSystemTime, 60000);

    // Clear the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <SystemContext.Provider
      value={{
        formatDate,
        formatMonth,
        formatTime,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export { SystemContext, SystemProvider };
