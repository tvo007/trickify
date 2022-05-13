import {
  Grid,
  Stack,
  useTheme,
  useMediaQuery,
  Button,
  Typography,
  Box,
} from '@mui/material';
import {useState, useEffect, useContext, useRef} from 'react';
import ReactPlayer from 'react-player';
import AuthContext from '../lib/contexts/AuthContext';
import breakpoints from '../lib/helpers/breakpoints';
import SamplerScenes from './SamplerScenes';
import SceneForm from './SceneForm';

const PlayerContainer = ({sampler, refetch}) => {
  // const {headers} = useContext (ClientContext);
  const playerRef = useRef ();
  const theme = useTheme ();
  const {isAuth} = useContext (AuthContext);
  // const mdMatches = handleBreakpointUp (theme, 'md');
  const mdMatches = useMediaQuery (theme.breakpoints.up (breakpoints.medium));
  // const mdDown = handleBreakpointDown (theme, 'md');3
  const mdDown = useMediaQuery (theme.breakpoints.down (breakpoints.medium));

  function youtube_parser (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match (regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  const [urlState, setUrlState] = useState (
    `https://www.youtube.com/embed/${youtube_parser (sampler.url)}`
  );

  const [duration, setDuration] = useState ('');

  const [isPlaying, setIsPlaying] = useState (false);

  const playerHandler = (url, timestamp) => {
    setUrlState (
      `https://www.youtube.com/embed/${youtube_parser (url)}?start=${timestamp}`
    );

    setIsPlaying (true);
  };

  const handleDuration = () => {
    let current = playerRef.current.getCurrentTime ();
    setDuration (current);
  };

  const [isMobileFormOpen, setIsMobileFormOpen] = useState (false);

  // console.log(playerRef.current.getCurrentTime)

  useEffect (() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setIsMobileFormOpen (false);
      }
    };

    window.addEventListener ('resize', handleResize);

    return () => {
      window.removeEventListener ('resize', handleResize);
    };
  }, []);

  return (
    <Stack
      direction={mdMatches ? 'row' : 'column-reverse'}
      justifyContent={mdMatches ? 'space-between' : null}
      sx={{
        maxWidth: mdMatches ? '80%' : '100%',
        minWidth: mdDown ? '93vw' : null,
      }}
    >
      {/**desktop form  */}
      {mdMatches
        ? <Box
            sx={{
              maxWidth: mdMatches ? '50%' : null,
              width: '100%',
              p: '1rem',
            }}
          >
            <SceneForm
              samplerId={sampler.id}
              refetch={refetch}
              duration={duration}
              handleDuration={handleDuration}
            />
          </Box>
        : null}

      <Box sx={{maxWidth: mdMatches ? '40%' : '100%'}}>
        {/**refactor out the react player away from scenes container */}
        <Grid item sx={{mb: 2}}>
          <Box sx={mdMatches ? null : {position: 'relative', pt: '70%'}}>
            <ReactPlayer
              ref={playerRef}
              url={urlState}
              volume={0.5}
              controls={true}
              playing={isPlaying}
              width={mdMatches ? '498px' : '100%'}
              height={mdMatches ? '280px' : '100%'}
              style={
                mdMatches
                  ? null
                  : {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }
              }
            />
          </Box>

          <Box>
            <Typography component={Box} fontWeight="bold">
              {sampler.name}
            </Typography>
            <Typography component={Box} color={'#6F6F6F'}>
              {sampler.created_by}
            </Typography>
            <Typography component={Box} color={'#6F6F6F'}>
              Total runtime: {sampler.runtime} seconds
            </Typography>
            <Typography component={Box} color={'#6F6F6F'}>
              {sampler.uploaded_at}
            </Typography>
            {!mdMatches &&
              !isMobileFormOpen &&
              <Box
                sx={{py: '1rem', display: 'flex', justifyContent: 'flex-end'}}
              >
                <Button
                  onClick={() => setIsMobileFormOpen (!isMobileFormOpen)}
                  disabled={!isAuth && true}
                >
                  Add Scene
                </Button>
              </Box>}
          </Box>
        </Grid>

        {!isMobileFormOpen &&
          //sampler id is used for a
          // <SamplerScenes
          //   samplerUrl={sampler.url}
          //   playerHandler={playerHandler}
          // />
          <h2>scenes placeholder</h2>}

        {/**mobile scene form */}
        {isMobileFormOpen &&
          !mdMatches &&
          <Box
            sx={{
              maxWidth: mdMatches ? '50%' : null,
              width: '100%',
            }}
          >
            <SceneForm
              isMobile={isMobileFormOpen}
              setMobile={setIsMobileFormOpen}
              samplerId={sampler.id}
              // refetch={refetch}
              duration={duration}
              handleDuration={handleDuration}
            />
          </Box>}

      </Box>

    </Stack>
  );
};

export default PlayerContainer;
