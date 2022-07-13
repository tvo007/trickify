import {useState, useEffect} from 'react';

//used to trigger if a form is seen thru mobile vs desktop
export default function useMobile () {
  const [isMobile, setIsMobile] = useState (false);

  useEffect (() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setIsMobile (false);
      }
    };
    window.addEventListener ('resize', handleResize);
    return () => {
      window.removeEventListener ('resize', handleResize);
    };
  }, []);

  return {isMobile, setIsMobile};
}
