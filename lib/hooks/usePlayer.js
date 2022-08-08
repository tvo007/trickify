import { useEffect, useState } from "react";
import { youtube_parser } from "../helpers";

export default function usePlayer(sampler, ref, startParam, playParam) {
  const [isPlaying, setIsPlaying] = useState(playParam);
  const [isPlayerEnabled, setIsPlayerEnabled] = useState(playParam);

  // const [currentSceneId, setCurrentSceneId] = useState(null);
  // const [urlState, setUrlState] = useState (
  //   ``
  // );
  const [urlState, setUrlState] = useState(
    `https://www.youtube.com/embed/${youtube_parser(sampler.url)}`
  );

  // `https://www.youtube.com/embed/${youtube_parser(url)}?start=${timestamp}&mute=1`

  const [currentScene, setCurrentScene] = useState({
    id: "",
    timestamp: 0,
    endstamp: 0,
    tricks: "",
    performed_by: "",
  });

  const handleDuration = () => {
    let current = ref.current.getCurrentTime();
    return current;
  };

  const handlePlayer = (timestamp) => {
    ref.current.seekTo(timestamp, "seconds");
    if (!isPlayerEnabled) {
      setIsPlaying(true);
    }
    // setUrlState(`https://www.youtube.com/embed/${youtube_parser(url)}`);
    // setIsPlaying(false);
  };

  const handleCurrentScene = (sceneData) => {
    if (!sceneData) {
      setCurrentScene(currentScene);
    } else {
      setCurrentScene({
        id: sceneData.id,
        timestamp: sceneData.timestamp,
        endstamp: sceneData.endstamp,
        tricks: sceneData.tricks,
        performed_by: sceneData.performed_by,
      });
    }

    // ref.current.seekTo(sceneData.timestamp, "seconds");
    // setIsPlaying(true);
  }; //use for edit scene mode

  const handleOnReady = () => {
    if (startParam) {
      setIsPlayerEnabled(true);
      setIsPlaying(true);
      setUrlState(
        `https://www.youtube.com/embed/${youtube_parser(
          sampler.url
        )}?start=${startParam}&autoplay=1&mute=1`
      );
    }

    if (playParam) {
      setIsPlayerEnabled(true);
      setIsPlaying(true);
    }
  };

  const handleOnStart = () => {
    setIsPlayerEnabled(true);
  };

  const handleOnPlay = () => {
    setIsPlaying(true);
  };

  const handleOnPause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    setCurrentScene(currentScene);
  }, [currentScene]);

  return {
    isPlaying,
    isPlayerEnabled,
    setIsPlaying,
    handleDuration,
    urlState,
    setUrlState,
    handlePlayer,
    currentScene,
    handleCurrentScene,
    handleOnPlay,
    handleOnPause,
    handleOnStart,
    handleOnReady,
  };
}

//react player stuff
//old logic for interacting with player
//how to extract playerHandler, isPlaying, handleDuration, and getRef into its own
//custom hook??

// const [urlState, setUrlState] = useState (
//   `https://www.youtube.com/embed/${youtube_parser (sampler.url)}`
// );

// const [isPlaying, setIsPlaying] = useState (true);

// const handleDuration = () => {
//   let current = playerRef.current.getCurrentTime ();
//   return current;
// };

// const handlePlayer = (url, timestamp) => {
//   setUrlState (
//     `https://www.youtube.com/embed/${youtube_parser (url)}?start=${timestamp}`
//   );
//   setIsPlaying (true);
// };

//ex of usePlayer in the wild vv
// const {isPlaying, handleDuration, urlState, handlePlayer} = usePlayer (
//   sampler,
//   playerRef
// );
