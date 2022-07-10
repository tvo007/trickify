import {useState} from 'react';

export default function usePlayer () {
  const [isPlaying, setIsPlaying] = useState (false);
  return {isPlaying, setIsPlaying};
}
