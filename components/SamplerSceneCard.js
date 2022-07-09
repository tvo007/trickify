import {Box, Button, Typography} from '@mui/material';
import React from 'react';
import { secondsToTime } from '../lib/helpers';

//takes in indiv scene data and displays data
//converts timestamp in s into minutes : seconds
const SamplerSceneCard = ({scene, samplerUrl, playerHandler}) => {
  const handleClick = () => {
    playerHandler (samplerUrl, scene.timestamp);
  };



  return (
    <Box>
      <Button onClick={handleClick} sx={{textAlign: 'left'}}>
        <Typography component={Box} color={'#6F6F6F'}>
          {secondsToTime (scene.timestamp)} - {scene.tricks}
        </Typography>
      </Button>
    </Box>
  );
};

export default SamplerSceneCard;
