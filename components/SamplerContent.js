import {Typography} from '@mui/material';
import {Box} from '@mui/material';
import {Button} from '@mui/material';
import {Grid} from '@mui/material';
import {useTheme} from '@mui/material';
import {Stack} from '@mui/material';
import {useEffect, useRef} from 'react';
import {useState} from 'react';
import {Fragment} from 'react';
import ReactPlayer from 'react-player';
import {handleBreakpointUp} from '../lib/helpers/breakpoints';

function SamplerContent({sampler}) {
  const playerRef = useRef ();
  const theme = useTheme ();
  const mdMatches = handleBreakpointUp (theme, 'md');

  function youtube_parser (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match (regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  const [urlState, setUrlState] = useState (
    `https://www.youtube.com/embed/${youtube_parser (sampler.url)}`
  );

  const [duration, setDuration] = useState ('');

  const handleDuration = () => {
    const currentTime = playerRef.current.getCurrentTime ();
    setDuration (currentTime);
  };

  const [isPlaying, setIsPlaying] = useState (false);

  const playerHandler = (url, timestamp) => {
    setUrlState (
      `https://www.youtube.com/embed/${youtube_parser (url)}?start=${timestamp}`
    );

    setIsPlaying (true);
  };

  return (
    <Fragment>
      <Grid item sx={{mb: 2}}>
        <Box sx={mdMatches ? null : {position: 'relative', pt: '70%'}}>
          {/* <iframe
            width="853"
            height="480"
            src={urlState}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          /> */}
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
          <Box>
            <Typography component={Box}>
              {duration || 'Click button to get duration'}
            </Typography>
            <Button onClick={() => handleDuration ()}>
              Get Duration
            </Button>
          </Box>

        </Box>
      </Grid>
      <Grid item sx={{mb: '10rem'}}>
        <Stack direction="column" spacing={2}>
          {sampler.scenes.map (scene => (
            <Box key={scene.id}>
              <Button
                onClick={() => playerHandler (sampler.url, scene.timestamp)}
                sx={{textAlign: 'left'}}
              >
                <Typography component={Box} color={'#6F6F6F'}>
                  @ {scene.timestamp}s - {scene.tricks}
                </Typography>
              </Button>
            </Box>
          ))}
        </Stack>
      </Grid>
    </Fragment>
  );
}

export default SamplerContent;
