import React from 'react';
import {Stack, Button, Box, Grid, Typography, useTheme} from '@mui/material';
import {Scrollbars} from 'react-custom-scrollbars-2';

const EditorScenes = ({samplerUrl, playerHandler, scenes}) => {
  // const isMdUp = handleBreakpointUp (theme, 'md');
  //

  return (
    <Grid item sx={{mb: '10rem'}}>

      {scenes.length === 0 &&
        <h2>There are currently no scenes assigned to this sampler.</h2>}

      {scenes.length > 0 &&
        <Scrollbars autoHeight>
          <Stack direction="column" spacing={2}>
            {scenes
              .sort ((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
              .map (scene => (
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
        </Scrollbars>}

    </Grid>
  );
};

export default EditorScenes;
