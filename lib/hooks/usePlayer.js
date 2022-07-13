import {useState} from 'react';
import {youtube_parser} from '../helpers';

export default function usePlayer (sampler, ref) {
  const [isPlaying, setIsPlaying] = useState (false);
  // const [urlState, setUrlState] = useState (
  //   ``
  // );
  const [urlState, setUrlState] = useState (
    `https://www.youtube.com/embed/${youtube_parser (sampler.url)}`
  );

  const handleDuration = () => {
    let current = ref.current.getCurrentTime ();
    return current;
  };

  const handlePlayer = (url, timestamp) => {
    setUrlState (
      `https://www.youtube.com/embed/${youtube_parser (url)}?start=${timestamp}`
    );

    setIsPlaying (true);
  };

  return {
    isPlaying,
    setIsPlaying,
    handleDuration,
    urlState,
    setUrlState,
    handlePlayer,
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
      