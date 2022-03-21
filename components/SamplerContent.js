import {Typography} from '@mui/material';
import {Box} from '@mui/material';
import {Button} from '@mui/material';
import {Grid} from '@mui/material';
import {Stack} from '@mui/material';
import {useEffect} from 'react';
import {useState} from 'react';
import {Fragment} from 'react';
import ReactPlayer from 'react-player';

function SamplerContent({sampler}) {
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
    <Fragment>
      <Grid item sx={{mb: 2}}>
        <Box>
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
            url={urlState}
            volume={0.5}
            controls={true}
            playing={isPlaying}
           
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
            {sampler.runtime} seconds
          </Typography>
          <Typography component={Box} color={'#6F6F6F'}>
            {sampler.uploaded_at}
          </Typography>
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
