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
import {breakpoints} from '../lib/helpers';
import AuthContext from '../lib/contexts/AuthContext';
import {useRouter} from 'next/router';
import useMobile from '../lib/hooks/useMobile';
import usePlayer from '../lib/hooks/usePlayer';

const EditorContainer = ({sampler, refetch}) => {
  const router = useRouter ();
  const {isAuth} = useContext (AuthContext);
  const theme = useTheme ();
  const playerRef = useRef ();
  const mdMatches = useMediaQuery (theme.breakpoints.up (breakpoints.medium));
  const mdDown = useMediaQuery (theme.breakpoints.down (breakpoints.medium));
  const {isMobile, setIsMobile} = useMobile ();
  // const [editorController, setEditorController] = useState (0);
  /**
   * editorController
   * 0: view
   * 1: add scene
   * 2: edit scene
   */
  const [currentScene, setCurrentScene] = useState ({
    id: '',
    timestamp: 0,
    endstamp: 0,
    tricks: '',
    performedBy: '',
  }); //used for edit scene mode

  const currentSceneHandler = sceneData => {
    setCurrentScene ({
      id: sceneData.id,
      timestamp: sceneData.timestamp,
      endstamp: sceneData.endstamp,
      tricks: sceneData.tricks,
      performedBy: sceneData.performedBy,
    });
  }; //use for edit scene mode


  const {isPlaying, handleDuration, urlState, handlePlayer} = usePlayer (
    sampler,
    playerRef
  );

  useEffect (
    () => {
      if (!isAuth) {
        router.push ('/');
      }
    },
    [isAuth]
  );

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
              handleDuration={handleDuration}
              currentScene={currentScene}
            />
          </Box>
        : null}

      {/**right view in desktop */}
      <Box
        sx={{
          maxWidth: mdMatches ? '40%' : '100%',
          display: 'flex',
          flexDirection: 'column',
          pl: {lg: '6rem'},
        }}
      >
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
              !isMobile &&
              <Box
                sx={{py: '1rem', display: 'flex', justifyContent: 'flex-end'}}
              >
                <Button onClick={() => setIsMobile (true)}>
                  Add Scene
                </Button>
              </Box>}
          </Box>
        </Grid>

        {!isMobile &&
          <SamplerScenes
            isEditor={true}
            scenes={sampler.scenes}
            samplerUrl={sampler.url}
            handlePlayer={handlePlayer}
            currentSceneHandler={currentSceneHandler}
          />}

        {/**mobile scene form */}
        {isMobile &&
          !mdMatches &&
          <Box
            sx={{
              maxWidth: mdMatches ? '50%' : null,
              width: '100%',
            }}
          >
            <SceneForm
              isMobile={isMobile}
              setMobile={setIsMobile}
              samplerId={sampler.id}
              handleDuration={handleDuration}
              currentScene={currentScene}
            />
          </Box>}
      </Box>
    </Stack>
  );
};

export default EditorContainer;
