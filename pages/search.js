import {
  Typography,
  TextField,
  Box,
  Button,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
  IconButton,
  FormControlLabel,
  Switch,
} from '@mui/material';
import Link from 'next/link';
import React, {useState, useRef, Fragment} from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import ReactPlayer from 'react-player';
import {useMutation} from 'react-query';
import ResultCard from '../components/search/ResultCard';
import {searchScenes} from '../lib/api';
import {breakpoints, youtube_parser, secondsToTime} from '../lib/helpers';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';

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
  const theme = useTheme ();
  const mdMatches = useMediaQuery (theme.breakpoints.up (breakpoints.medium));
  const playerRef = useRef ();
  // const mdUp = useMediaQuery (theme.breakpoints.up (breakpoints.medium));
  // const mdDown = useMediaQuery (theme.breakpoints.down (breakpoints.medium));
  const [state, setState] = useState (intitialState);

  const [sceneData, setSceneData] = useState (initialSceneData);

  const [isPlaying, setIsPlaying] = useState (true);

  const [isLooping, setIsLooping] = useState (true);

  const playerHandler = item => {
    let parsedUrl = youtube_parser (item.sampler.url);
    setSceneData ({
      name: item.sampler.name,
      samplerId: item.sampler.id,
      tricks: item.tricks,
      timestamp: item.timestamp,
      url: `https://www.youtube.com/watch?v=${parsedUrl}&t=${item.timestamp}s`,
      performedBy: item.performed_by,
      endstamp: item.endstamp,
    });

    // setSceneData (
    //   `https://www.youtube.com/embed/${youtube_parser (url)}?start=${timestamp}`
    // );

    setIsPlaying (true);
  };

  //loops video according to end stamp
  const handleProgress = (e, start, end) => {
    if (e.playedSeconds > end && end) {
      playerRef.current.seekTo (start, 'seconds');
    }
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

  const clipboardHandler = () => {
    navigator.clipboard.writeText (sceneData.url);
  };
  //https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText

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
          <Grid item sx={{width: {xs: '100%', md: '40%'}, pb: '2rem'}}>
            {/* <Typography>Current Sampler Id: {sceneData.samplerId}</Typography>
            <Typography>Current Tricks: {sceneData.tricks}</Typography>
            <Typography>Current url: {sceneData.url}</Typography> */}

            <Stack direction="row" sx={{ml: '-1rem'}}>

              <FormControlLabel
                value="start"
                control={<Switch color="primary" />}
                label={
                  <Typography component={Box} sx={{mb: '5px'}}>
                    Auto Looper
                  </Typography>
                }
                labelPlacement="start"
              />
            </Stack>
            {sceneData.url &&
              <Fragment>

                <Box
                  sx={{
                    width: {xs: '100%', md: '28rem'},
                    height: {xs: '280px', sm: '400px', md: '280px'},
                    mb: '5px',
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
                    onProgress={e =>
                      isLooping &&
                      handleProgress (
                        e,
                        sceneData.timestamp,
                        sceneData.endstamp
                      )}
                  />
                </Box>

                <Box>
                  <Typography component={Box} fontWeight="bold">
                    Sampler: {sceneData.name}
                  </Typography>
                  <Typography component={Box} color={'#6F6F6F'}>
                    Performed By: {sceneData.performedBy}
                  </Typography>
                  <Typography component={Box} color={'#6F6F6F'}>
                    Trick(s): {sceneData.tricks}
                  </Typography>
                  <Typography component={Box} color={'#6F6F6F'}>
                    Timestamp: {secondsToTime (sceneData.timestamp)}
                  </Typography>
                  <TextField
                    variant="standard"
                    id="shareableUrl"
                    value={sceneData.url}
                    fullWidth
                    disabled
                    sx={{
                      pb: '5px',
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: 'black',
                      },
                    }}
                  />
                  <Box sx={{display: 'flex'}}>
                    <Link href={`/${sceneData.samplerId}`} passHref>
                      <Button size="small">
                        Go to Sampler Page
                      </Button>
                    </Link>
                    <IconButton
                      sx={{
                        ml: 'auto',
                        py: 1,
                      }}
                      size="small"
                      onClick={clipboardHandler}
                      color="primary"
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>

                </Box>
              </Fragment>}
          </Grid>

          <Grid item sx={{width: {md: '50%'}}}>
            <Grid container direction="column">

              <Typography component={Box} sx={mdMatches && {pl: '.7rem'}}>
                Search Result(s):
              </Typography>

              <Scrollbars
                universal
                style={
                  mdMatches
                    ? {height: '30rem'}
                    : {height: '30rem', width: '90vw'}
                }
              >
                <Stack direction="column">

                  {data &&
                    data.map (item => (
                      <ResultCard
                        key={item.id}
                        item={item}
                        playerHandler={playerHandler}
                      />
                    ))}

                </Stack>
              </Scrollbars>

            </Grid>
          </Grid>
        </Grid>

      </Stack>
    )
  );
};

//commit

export default Search;
