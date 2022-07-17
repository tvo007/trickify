import {Grid, Stack, Button, Typography, Box} from '@mui/material';
import {useContext, useRef} from 'react';
import ReactPlayer from 'react-player';
import AuthContext from '../../lib/contexts/AuthContext';
import SamplerScenes from '../../components/SamplerScenes';
import {samplerList, exceptionStyles} from '../../lib/samplerRatioExceptions';
import usePlayer from '../../lib/hooks/usePlayer';
import SamplerPageInfo from './SamplerPageInfo';

const SamplerPageContainer = ({sampler}) => {
  // const {headers} = useContext (ClientContext);
  const playerRef = useRef ();
  const {isAuth} = useContext (AuthContext);

  const {isPlaying, urlState, handlePlayer} = usePlayer (sampler, playerRef);

  // console.log (sampler.name);

  return (
    <Stack
      direction={'column'}
      justifyItems={'center'}
      alignItems={'center'}
      sx={{minWidth: '100%'}}
    >
      <Box>
        {/**refactor out the react player away from scenes container */}
        <Grid container direction="column" sx={{mb: 2, maxWidth: '100%'}}>
          <Grid
            sx={
              samplerList.includes (sampler.name)
                ? exceptionStyles
                : {
                    position: 'relative',
                    pt: '56.25%',
                    mb: '1rem',
                    width: '100%',
                  }
            }
          >
            <ReactPlayer
              ref={playerRef}
              url={urlState}
              volume={0.5}
              controls={true}
              playing={isPlaying}
              width={'100%'}
              height={'100%'}
              style={{
                top: 0,
                left: 0,
                position: 'absolute',
              }}
            />
          </Grid>
          {/**sampler info menu */}
          <Grid item sx={{my: '1rem'}}>
            <SamplerPageInfo isAuth={isAuth} sampler={sampler} />
          </Grid>
          <Grid item sx={{maxWidth: '100%'}}>
            <SamplerScenes
              samplerUrl={sampler.url}
              handlePlayer={handlePlayer}
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default SamplerPageContainer;
