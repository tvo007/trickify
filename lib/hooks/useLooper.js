import {useState} from 'react';

export default function useLooper (ref) {
  const [isLooping, setIsLooping] = useState (false);

  const handleLooperToggle = e => {
    setIsLooping (e.target.checked);
  };

  const handleProgress = (e, start, end) => {
    if (!start && !end) {
      setIsLooping (false);
    }

    if (e.playedSeconds > end && end) {
      ref.current.seekTo (start, 'seconds');
    }
  }

  return {isLooping, setIsLooping, handleLooperToggle, handleProgress};
}
