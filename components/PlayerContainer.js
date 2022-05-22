import {
  Grid,
  Stack,
  Button,
  Typography,
  Box,
} from '@mui/material';
import Link from 'next/link';
import {useState, useContext, useRef} from 'react';
import ReactPlayer from 'react-player';
import AuthContext from '../lib/contexts/AuthContext';
import SamplerScenes from './SamplerScenes';

const PlayerContainer = ({sampler}) => {
  // const {headers} = useContext (ClientContext);
  const playerRef = useRef ();
  const {isAuth} = useContext (AuthContext);

  function youtube_parser (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match (regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  const [urlState, setUrlState] = useState (
    `https://www.youtube.com/embed/${youtube_parser (sampler.url)}`
  );

  const [isPlaying, setIsPlaying] = useState (false);

  const playerHandler = (url, timestamp) => {
    setUrlState (
      `https://www.youtube.com/embed/${youtube_parser (url)}?start=${timestamp}`
    );

    setIsPlaying (true);
  };

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
          <Grid sx={{position: 'relative', pt: '56.25%', mb: '1rem'}}>
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
            <Grid container direction="row" justifyContent={'space-between'}>
              <Grid item>
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
              </Grid>
              {/**editor button, auth only */}
              {isAuth &&
                <Grid item>
                  <Link href={`/admin/${sampler.id}`} passHref>
                    <Button size="small">View in Editor</Button>
                  </Link>
                </Grid>}
            </Grid>
          </Grid>
          <Grid item sx={{maxWidth: '100%'}}>
            <SamplerScenes
              samplerUrl={sampler.url}
              playerHandler={playerHandler}
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default PlayerContainer;
