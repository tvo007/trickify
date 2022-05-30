import React from 'react';
import {breakpoints} from '../lib/helpers';
import {
  Stack,
  Button,
  Box,
  Grid,
  useMediaQuery,
  Typography,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {Scrollbars} from 'react-custom-scrollbars-2';
import {useRouter} from 'next/router';
import {getScenesBySamplerId} from '../lib/api';
import {useQuery} from 'react-query';

const SamplerScenes = ({samplerUrl, playerHandler, isEditor}) => {
  const router = useRouter ();
  const {id} = router.query;
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
    <Grid
      item
      sx={
        isEditor
          ? {
              mb: '10rem',
              width: {
                xs: '100%',
                sm: '100%',
                md: '31.3rem',
                lg: '31.3rem',
                xl: '31.3rem',
              },
            }
          : {mb: '10rem'}
      }
    >
      {error && <h2>Something went wrong.</h2>}
      {isFetching && <CircularProgress />}
      {isSuccess &&
        scenes.length === 0 &&
        <h2>There are currently no scenes assigned to this sampler.</h2>}
      {isSuccess &&
        scenes.length > 0 &&
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

export default SamplerScenes;
