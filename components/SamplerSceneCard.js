import {Box, Button, Typography, Card} from '@mui/material';
import React from 'react';
import {secondsToTime} from '../lib/helpers';

//takes in indiv scene data and displays data
//converts timestamp in s into minutes : seconds
const SamplerSceneCard = ({
  scene,
  samplerUrl,
  handlePlayer,
  isEditor,
  handleCurrentScene,
}) => {
  const handleClick = () => {
    handlePlayer (samplerUrl, scene.timestamp);
    handleCurrentScene ({
      id: scene.id || '',
      timestamp: scene.timestamp || 0,
      endstamp: scene.endstamp || 0,
      tricks: scene.tricks || '',
      performedBy: scene.performed_by || '',
    });

    // console.log (scene.id);
  };
  return (
    <Box>
      <Card
        onClick={handleClick}
        sx={{
          p: '1rem',
          width: '95%',
          justifyContent: 'flex-start',
        }}
        disableRipple={false}
        component={Button}
      >
        <Typography
          component={Box}
          color={'#6F6F6F'}
          variant="body2"
          fontWeight={500}
          align="left"
        >
          {secondsToTime (scene.timestamp)} - {scene.tricks}
        </Typography>

      </Card>
    </Box>
  );
};

export default SamplerSceneCard;
