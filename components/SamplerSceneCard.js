import {Box, Button, Typography} from '@mui/material';
import React from 'react';
import {secondsToTime} from '../lib/helpers';

//takes in indiv scene data and displays data
//converts timestamp in s into minutes : seconds
const SamplerSceneCard = ({
  scene,
  samplerUrl,
  handlePlayer,
  isEditor,
  currentSceneHandler,
}) => {
  const handleClick = () => {
    handlePlayer (samplerUrl, scene.timestamp);
    if (isEditor && scene) {
      currentSceneHandler ({
        id: scene.id || '',
        timestamp: scene.timestamp || 0,
        endstamp: scene.endstamp || 0,
        tricks: scene.tricks || '',
        performedBy: scene.performed_by || '',
      });
    }
    console.log (scene.id);
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
