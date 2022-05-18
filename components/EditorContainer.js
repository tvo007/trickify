import React, {useRef, useState, useEffect, useContext} from 'react';
import {
  Grid,
  Stack,
  useTheme,
  useMediaQuery,
  Button,
  Typography,
  Box,
} from '@mui/material';
import ReactPlayer from 'react-player';
import SamplerScenes from './SamplerScenes';
import SceneForm from './SceneForm';
import breakpoints from '../lib/helpers/breakpoints';
import AuthContext from '../lib/contexts/AuthContext';
import {getSamplerById} from '../lib/api';
import {useQuery} from 'react-query';
import EditorScenes from './EditorScenes';
import VideoPlayer from './VideoPlayer';

const intitialState = {
  id: '',
  name: '',
  created_by: '',
  url: '',
  runtime: '',
  upload_date: '',
  created_at: '',
  updated_at: '',
  deleted_at: '',
  scenes: [],
};

const EditorContainer = ({id}) => {
  const {
    status,
    data: sampler,
    error,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery ('sampler', async () => getSamplerById (id), {
    initialData: intitialState,
  });

  // const {headers} = useContext (ClientContext);
  const {isAuth} = useContext (AuthContext);
  const theme = useTheme ();
  const playerRef = useRef ();
  const mdMatches = useMediaQuery (theme.breakpoints.up (breakpoints.medium));
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

  const [isPlaying, setIsPlaying] = useState (true);

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

  console.log (sampler);

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
        {sampler && isSuccess
          ? <VideoPlayer
              urlState={urlState}
              playerRef={playerRef}
              isPlaying={isPlaying}
              mdMatches={mdMatches}
              sampler={sampler}
              isMobileFormOpen={isMobileFormOpen}
            />
          : null}

        {!isMobileFormOpen &&
          sampler.scenes &&
          <EditorScenes
            scenes={sampler.scenes}
            samplerUrl={sampler.url}
            playerHandler={playerHandler}
          />}

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
              isFetching={isFetching}
              isSuccess={isSuccess}
              refetch={refetch}
              duration={duration}
              handleDuration={handleDuration}
            />
          </Box>}

      </Box>

    </Stack>
  );
};

export default EditorContainer;
