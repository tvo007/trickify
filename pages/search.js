import {
  Typography,
  TextField,
  Box,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import React, {useState, useRef, Fragment} from 'react';
import ReactPlayer from 'react-player';
import {useMutation} from 'react-query';
import {searchScenes} from '../lib/api';
import {youtube_parser} from '../lib/helpers';

const intitialState = {
  tricks: '',
};

const initialSceneData = {
  name: '',
  samplerId: '',
  tricks: '',
  url: '',
  timestamp: '',
  performedBy: '',
};

const Search = () => {
  const playerRef = useRef ();
  // const mdUp = useMediaQuery (theme.breakpoints.up (breakpoints.medium));
  // const mdDown = useMediaQuery (theme.breakpoints.down (breakpoints.medium));
  const [state, setState] = useState (intitialState);

  const [sceneData, setSceneData] = useState (initialSceneData);

  const [isPlaying, setIsPlaying] = useState (true);

  const playerHandler = item => {
    let parsedUrl = youtube_parser (item.sampler.url);
    setSceneData ({
      name: item.sampler.name,
      samplerId: item.sampler.id,
      tricks: item.tricks,
      url: `https://www.youtube.com/embed/${parsedUrl}?start=${item.timestamp}`,
      timestamp: item.timestamp,
    });
    // setSceneData (
    //   `https://www.youtube.com/embed/${youtube_parser (url)}?start=${timestamp}`
    // );

    setIsPlaying (true);
  };

  const {mutateAsync, data} = useMutation (searchScenes, {});

  const handleChange = e => {
    const value = e.target.value;
    setState ({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleQueryScene = async () => {
    await mutateAsync ({
      tricks: state.tricks,
    });
  };

  const submitHandler = e => {
    e.preventDefault ();
    handleQueryScene ();
    // await mutateAsync(state.tricks)
    // console.log(state.tricks)
  };

  // console.log (data);
  return (
    // <Typography variant="h2">
    //   Under Construction
    // </Typography>
    (
      <Stack sx={{width: '100%'}} spacing={4}>
        <Box>
          <form onSubmit={submitHandler}>
            <Stack spacing={2}>
              <TextField
                label="Trick Search"
                variant="outlined"
                size="medium"
                fullWidth
                name="tricks"
                id="tricks"
                onChange={handleChange}
                value={state.tricks}
                required
              />
              <Grid
                container
                direction="column"
                justifyContent={'center'}
                alignItems={'flex-end'}
              >
                <Button
                  variant="contained"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  }}
                  type="submit"
                >
                  Search
                </Button>
              </Grid>
            </Stack>
          </form>
        </Box>
        <Grid
          container
          justifyContent={'space-between'}
          direction={'row-reverse'}
        >

          <Grid item sx={{width: {xs: '100%', md: '40%'}}}>
            {/* <Typography>Current Sampler Id: {sceneData.samplerId}</Typography>
            <Typography>Current Tricks: {sceneData.tricks}</Typography>
            <Typography>Current url: {sceneData.url}</Typography> */}
            {sceneData.url &&
              <Fragment>

                <Box
                  sx={{
                    width: {xs: '100%', md: '28rem'},
                    height: {xs: '280px', sm: '400px', md: '280px'},
                  }}
                >
                  <ReactPlayer
                    ref={playerRef}
                    url={sceneData.url}
                    volume={0.5}
                    controls={true}
                    playing={isPlaying}
                    width={'100%'}
                    height={'100%'}
                  />
                </Box>

                <Box>
                  <Typography component={Box} fontWeight="bold">
                    Sampler: {sceneData.name}
                  </Typography>
                  <Typography component={Box} color={'#6F6F6F'}>
                    Performed By: Some tricker
                  </Typography>
                  <Typography component={Box} color={'#6F6F6F'}>
                    Timestamp: @ {sceneData.timestamp}s
                  </Typography>
                  <Typography component={Box} color={'#6F6F6F'}>
                    Trick(s) Selected: {sceneData.tricks}
                  </Typography>

                  <Box
                    sx={{
                      py: '1rem',
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Button>
                      Go to Sampler Page
                    </Button>
                  </Box>
                </Box>
              </Fragment>}
          </Grid>

          <Grid item sx={{width: {md: '50%'}}}>
            <Grid container direction="column">

              <Typography component={Box} sx={{pl: '.7rem'}}>
                Search Result(s):
              </Typography>

              {data &&
                data.map (item => (
                  <Button
                    size="small"
                    key={item.id}
                    fullWidth={false}
                    sx={{
                      textAlign: 'left',
                      display: 'inline-block',
                      width: 'auto',
                    }}
                    onClick={() => playerHandler (item)}
                  >
                    {item.tricks}
                  </Button>
                ))}
            </Grid>
          </Grid>
        </Grid>

      </Stack>
    )
  );
};

//commit

export default Search;
