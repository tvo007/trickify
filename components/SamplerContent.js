import {Typography} from '@mui/material';
import {Box} from '@mui/material';
import {Button} from '@mui/material';
import {Grid} from '@mui/material';
import {Stack} from '@mui/material';
import {useEffect} from 'react';
import {useState} from 'react';
import {Fragment} from 'react';

function SamplerContent({sampler}) {
  function youtube_parser (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match (regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  const [urlState, setUrlState] = useState (
    `https://www.youtube.com/embed/${youtube_parser (sampler.url)}`
  );

  useEffect (() => {}, [urlState]);

  return (
    <Fragment>
      <Grid item>
        <Typography component={Box} fontWeight={'medium'} color="text.primary">
          {sampler.name}
        </Typography>
      </Grid>
      <Grid item sx={{mb: 2}}>
        <Box>
          <iframe
            width="853"
            height="480"
            src={urlState}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </Box>

        <Box>
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
      <Grid item>
        <Stack direction="column" spacing={2}>
          {sampler.scenes.map (scene => (
            <Box key={scene.id}>
              <Button
                onClick={() =>
                  setUrlState (
                    `https://www.youtube.com/embed/${youtube_parser (sampler.url)}?start=${scene.timestamp}`
                  )}
              >
                <Typography component={Box} color={'#6F6F6F'}>
                  @ {scene.timestamp} - {scene.tricks}
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
