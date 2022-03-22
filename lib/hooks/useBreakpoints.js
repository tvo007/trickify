import {useMediaQuery, useTheme} from '@mui/material';

const useBreakpoints = () => {
  const theme = useTheme ();

  //   const isMdUp = useMediaQuery (theme.breakpoints.up ('md'));

  const handleBreakpointUp = breakpoint => {
    const mediaQuery = useMediaQuery (theme.breakpoints.up (breakpoint));
    return mediaQuery;
  };

  const handleBreakpointDown = breakpoint => {
    const mediaQuery = useMediaQuery (theme.breakpoints.down (breakpoint));
    return mediaQuery;
  };

  const handleBreakpointBetween = (lower, upper) => {
    const mediaQuery = useMediaQuery (theme.breakpoints.between (lower, upper));
  };

  return {
    handleBreakpointUp,
    handleBreakpointDown,
    handleBreakpointBetween
  };
};

export default useBreakpoints;
