import React, { useEffect, useState } from "react";

export default function CountDown({ timer }) {
  const [time, setTime] = useState();
  useEffect(() => {
    if (timer) setTime(timer - Date.now());
  }, [timer]);
  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        setTime(time - 1000);
      }, 1000);
    }
  }, [time]);
  // 1,297,808,304

  const getFormTime = (m) => {
    let total_seconds = parseInt(Math.floor(m / 1000));
    let total_minutes = parseInt(Math.floor(total_seconds / 60));
    let total_hours = parseInt(Math.floor(total_minutes / 60));
    let seconds = parseInt(Math.floor(total_seconds % 60));
    let minutes = parseInt(Math.floor(total_minutes % 60));
    let hours = parseInt(Math.floor(total_hours));
    return (
      <div className="flex gap-1 font-semibold">
        <span className="px-2 py-[2px] rounded-md bg-[white]">
          {hours < 10 ? "0" + hours : hours}
        </span>{" "}
        :
        <span className="px-2 py-[2px] rounded-md bg-[white]">
          {minutes < 10 ? "0" + minutes : minutes}
        </span>{" "}
        :
        <span className="px-2 py-[2px] rounded-md bg-[white]">
          {seconds < 10 ? "0" + seconds : seconds}
        </span>
      </div>
    );
  };
  return <>{getFormTime(time)}</>;
}
