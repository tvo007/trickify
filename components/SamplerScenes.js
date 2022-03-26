import { Stack } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

import { Box } from '@mui/system';
import React from 'react';

const SamplerScenes = ({scenes, samplerUrl, playerHandler}) => {
  return (
    <Grid item sx={{mb: '10rem'}}>
      <Stack direction="column" spacing={2}>
        {scenes.map (scene => (
          <Box key={scene.id}>
            <Button
              onClick={() => playerHandler (samplerUrl, scene.timestamp)}
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
  );
};

export default SamplerScenes;
