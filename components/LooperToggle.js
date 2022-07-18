import {Box, FormControlLabel, Switch, Typography} from '@mui/material';
import React from 'react';

const LooperToggle = ({isLooping, handleLooperToggle}) => {
  return (
    <FormControlLabel
      value="start"
      control={
        <Switch
          color="primary"
          checked={isLooping}
          onChange={e => handleLooperToggle (e)}
        />
      }
      label={
        <Typography component={Box} sx={{mb: '5px'}}>
          Auto Looper
        </Typography>
      }
      labelPlacement="start"
      sx={{pb: '1rem'}}
    />
  );
};

export default LooperToggle;
