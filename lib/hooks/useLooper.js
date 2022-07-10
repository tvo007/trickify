import {useState} from 'react';

export default function useLooper () {
  const [isLooping, setIsLooping] = useState (false);

  const handleLooperToggle = e => {
    if (e instanceof Event) {
      setIsLooping (e.target.checked);
    } else {
      console.log ('Not an event. Please pass an event instance.');
    }
  };

  return {isLooping, setIsLooping, handleLooperToggle};
}
