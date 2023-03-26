import { MutableRefObject, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { youtube_parser } from "../helpers";
import { ICurrentScene, ISampler } from "../interfaces";

export const initialCurrentScene = {
  id: "",
  timestamp: 0,
  endstamp: 0,
  tricks: "",
  performed_by: "",
  index: 0,
};

export default function usePlayer(
  ref: MutableRefObject<ReactPlayer>,
  initialSamplerUrl?: string,
  startParam?: number,
  playParam?: boolean
) {
  const [isPlaying, setIsPlaying] = useState(playParam || false);
  const [isPlayerEnabled, setIsPlayerEnabled] = useState(playParam || false);

  // const [currentSceneId, setCurrentSceneId] = useState(null);
  // const [urlState, setUrlState] = useState (
  //   ``
  // );z`
  const [urlState, setUrlState] = useState(
    // `https://www.youtube.com/embed/${youtube_parser(initialSamplerUrl)}`
    ""
  );

  // `https://www.youtube.com/embed/${youtube_parser(url)}?start=${timestamp}&mute=1`

  const [currentScene, setCurrentScene] =
    useState<ICurrentScene>(initialCurrentScene);

  //useful for switching samplers in the search page
  const handleUrl = (url: string, timestamp: string) => {
    let parsed = youtube_parser(url);

    setUrlState(`https://www.youtube.com/watch?v=${parsed}&t=${timestamp}s`);
  };

  const handleDuration = () => {
    let current = ref.current?.getCurrentTime();
    return current;
  };

  const handlePlayer = (timestamp?: number) => {
    if (timestamp) {
      //auto plays when applied a timestamp
      //otherwise toggles
      ref?.current?.seekTo(timestamp, "seconds");
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
    // setUrlState(`https://www.youtube.com/embed/${youtube_parser(url)}`);
    // setIsPlaying(false);
  };

  const handleCurrentScene = (sceneData: any) => {
    if (!sceneData) {
      setCurrentScene((prevState) => prevState);
    } else {
      setCurrentScene({
        id: sceneData.id,
        timestamp: sceneData.timestamp,
        endstamp: sceneData.endstamp,
        tricks: sceneData.tricks,
        performed_by: sceneData.performed_by,
        index: sceneData.index || 0,
        url: sceneData?.sampler?.url || "",
        samplerId: sceneData.sampler_id || "",
        samplerName: sceneData.sampler?.name || "",
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
          initialSamplerUrl
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

  //sets sampler page url to url state
  useEffect(() => {
    if (initialSamplerUrl)
      setUrlState(
        `https://www.youtube.com/embed/${youtube_parser(initialSamplerUrl)}`
      );
  }, [initialSamplerUrl]);

  return {
    isPlaying,
    isPlayerEnabled,
    setIsPlaying,
    handleDuration,
    urlState,
    setUrlState,
    handleUrl,
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
