import {
  Typography,
  Box,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, {useState, useRef, Fragment} from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import ReactPlayer from 'react-player';
import {useMutation} from 'react-query';
import ResultCard from '../../components/search-page/ResultCard';
import {searchScenes} from '../../lib/api';
import {breakpoints, youtube_parser} from '../../lib/helpers';
import LooperToggle from '../../components/LooperToggle';
import useLooper from '../../lib/hooks/useLooper';
import ScenePlayerData from '../../components/search-page/ScenePlayerData';
import SearchForm from '../../components/search-page/SearchForm';

const initialSearchState = {
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
  const [searchInput, setSearchInput] = useState (initialSearchState); //searchbar state

  const [sceneData, setSceneData] = useState (initialSceneData);

  const [isPlaying, setIsPlaying] = useState (false);

  const {isLooping, setIsLooping} = useLooper ();

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

    setIsPlaying (true);
  };

  //loops video according to end stamp
  const handleProgress = (e, start, end) => {
    if (e.playedSeconds > end && end) {
      playerRef.current.seekTo (start, 'seconds');
    }
  };

  const handleLooperToggle = e => {
    setIsLooping (e.target.checked);
  };

  const {mutateAsync, data} = useMutation (searchScenes, {});

  const handleChange = e => {
    const value = e.target.value;
    setSearchInput ({
      ...searchInput,
      [e.target.name]: value,
    });
  };

  const handleQueryScene = async () => {
    await mutateAsync ({
      tricks: searchInput.tricks,
    });
  };

  const handleSubmit = e => {
    e.preventDefault ();
    handleQueryScene ();
    // await mutateAsync(state.tricks)
    // console.log(state.tricks)
  };

  // console.log (data);
  return (
    <Stack sx={{width: '100%'}} spacing={4}>
      <Box>
        <SearchForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          searchInput={searchInput}
        />
      </Box>
      <Grid
        container
        justifyContent={'space-between'}
        direction={'row-reverse'}
      >
        <Grid item sx={{width: {xs: '100%', md: '40%'}, pb: '2rem'}}>
          <Stack direction="row" sx={{ml: '-1rem'}}>
            <LooperToggle
              isToggled={isLooping}
              handleLooperToggle={handleLooperToggle}
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
                    handleProgress (e, sceneData.timestamp, sceneData.endstamp)}
                />
              </Box>
              <Box>
                <ScenePlayerData sceneData={sceneData} />
              </Box>
            </Fragment>}
        </Grid>

        <Grid item sx={{width: {md: '50%'}}}>
          <Grid container direction="column">

            <Typography component={Box} sx={mdMatches ? {pl: '.7rem'} : {}}>
              Search Result(s):
            </Typography>

            <Scrollbars
              universal
              style={
                mdMatches ? {height: '30rem'} : {height: '30rem', width: '90vw'}
              }
            >
              <Stack direction="column">
                {data &&
                  data.map (item => (
                    <ResultCard
                      key={item.id}
                      item={item}
                      playerHandler={playerHandler}
                      searchInput={searchInput}
                    />
                  ))}

              </Stack>
            </Scrollbars>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

//commit

export default Search;
