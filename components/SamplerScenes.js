import {Stack, useMediaQuery} from '@mui/material';
import {Button} from '@mui/material';
import {Grid} from '@mui/material';
import {Typography} from '@mui/material';
import {Scrollbars} from 'react-custom-scrollbars-2';
import {Box} from '@mui/system';
import React from 'react';
import breakpoints from '../lib/helpers/breakpoints';
import {useTheme} from '@mui/material';
import { useRouter } from 'next/router'
import { getScenesBySamplerId } from '../lib/api';

const SamplerScenes = ({samplerUrl, playerHandler}) => {
  const router = useRouter()
  const {id} = router.query
  const theme = useTheme ();
  // const isMdUp = handleBreakpointUp (theme, 'md');
  const isMdUp = useMediaQuery (theme.breakpoints.up (breakpoints.medium));

  const {
    status,
    data: scenes,
    error,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery ('scenes', async () => getScenesBySamplerId (id), {
    cacheTime: 0,
    //
  });

  return (
    <Grid item sx={{mb: '10rem'}}>
      <Scrollbars autoHeight style={{minWidth: isMdUp ? '135%' : '100%'}}>
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
      </Scrollbars>

    </Grid>
  );
};

export default SamplerScenes;
