import React from "react";

export default function WindCard({ accentColor }) {
  return (
    <div
      className={`py-20 ml-10 rounded-b-[1.3rem] rounded-r-[1.3rem] ${accentColor}`}
    >
      Desktop monthly
    </div>
  );
}
