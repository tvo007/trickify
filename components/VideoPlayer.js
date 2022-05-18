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

const VideoPlayer = ({
  playerRef,
  isPlaying,
  mdMatches,
  sampler,
  isMobileFormOpen,
  urlState,
}) => {
  return (
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
          <Box sx={{py: '1rem', display: 'flex', justifyContent: 'flex-end'}}>
            <Button onClick={() => setIsMobileFormOpen (!isMobileFormOpen)}>
              Add Scene
            </Button>
          </Box>}
      </Box>
    </Grid>
  );
};

export default VideoPlayer;
