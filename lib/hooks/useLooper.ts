import React, { useState, ChangeEvent, MutableRefObject } from "react";
import ReactPlayer from "react-player";

export interface OnProgressProps {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

export default function useLooper(
  ref: MutableRefObject<ReactPlayer>,
  defaultSetting?: boolean
) {
  const [isLooping, setIsLooping] = useState(false || defaultSetting);

  // const handleLooperToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsLooping(e.target.checked);
  // };

  const handleLooperToggle = () => {
    setIsLooping(!isLooping);
  };

  const handleProgress = (e: OnProgressProps, start: number, end: number) => {
    if (!start && !end) {
      setIsLooping(false);
    }

    if (e.playedSeconds > end && end) {
      ref.current?.seekTo(start, "seconds");
    }
  };

  return { isLooping, setIsLooping, handleLooperToggle, handleProgress };
}
