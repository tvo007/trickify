import {
  Typography,
  Box,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useRef, Fragment } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import ResultCard from "../../components/search-page/ResultCard";
import { searchScenes } from "../../lib/api";
import LooperToggle from "../../components/LooperToggle";
import useLooper from "../../lib/hooks/useLooper";
import ScenePlayerData from "../../components/search-page/ScenePlayerData";
import SearchForm from "../../components/search-page/SearchForm";
import usePlayer from "../../lib/hooks/usePlayer";
import { initialCurrentScene } from "../../lib/hooks/usePlayer";

const initialSearchState = {
  tricks: "",
};

const Search = () => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const playerRef = useRef();

  const [searchInput, setSearchInput] = useState(initialSearchState); //searchbar state

  // const [sceneData, setSceneData] = useState(initialSceneData);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const playerHandler = (item) => {
  //   let parsedUrl = youtube_parser(item.sampler.url);
  //   setSceneData({
  //     name: item.sampler.name,
  //     samplerId: item.sampler.id,
  //     tricks: item.tricks,
  //     timestamp: item.timestamp,
  //     url: `https://www.youtube.com/watch?v=${parsedUrl}&t=${item.timestamp}s`,
  //     performedBy: item.performed_by,
  //     endstamp: item.endstamp,
  //   });

  //   setIsPlaying(true);
  // };
  // //loops video according to end stamp

  const {
    setIsPlaying,
    isPlaying,
    urlState,
    handleUrl,
    currentScene,
    handleCurrentScene,
  } = usePlayer(playerRef);

  const handleSelect = async (scene) => {
    handleUrl(scene.sampler.url, scene.timestamp);
    handleCurrentScene(scene);
    if (!isPlaying) setIsPlaying(true);
  };

  // console.log(playerRef);

  const handleProgress = (e, start, end, ref) => {
    if (e.playedSeconds > end && end) {
      ref.current.seekTo(start, "seconds");
    }
  };

  const { isLooping, setIsLooping } = useLooper(playerRef, true);
  const handleLooperToggle = (e) => {
    setIsLooping(e.target.checked);
  };

  const { data: scenes, refetch } = useQuery(
    "my_search",
    async () => searchScenes(searchInput.tricks),
    { enabled: false }
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInput({
      ...searchInput,
      [e.target.name]: value,
    });
  };

  const handleQueryScene = async () => {
    await refetch();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (urlState && currentScene) {
      handleUrl("", "");
      handleCurrentScene(initialCurrentScene);
    }
    handleQueryScene();
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Box>
        <SearchForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          searchInput={searchInput}
        />
      </Box>
      <Grid
        container
        justifyContent={"space-between"}
        direction={"row-reverse"}
      >
        <Grid item sx={{ width: { xs: "100%", md: "40%" }, pb: "2rem" }}>
          <Stack direction="row" sx={{ ml: "-1rem" }}>
            <LooperToggle
              isLooping={isLooping}
              handleLooperToggle={handleLooperToggle}
            />
          </Stack>
          {currentScene.url && (
            <Fragment>
              <Box
                sx={{
                  width: { xs: "100%", md: "28rem" },
                  height: { xs: "280px", sm: "400px", md: "280px" },
                  mb: "5px",
                }}
              >
                <ReactPlayer
                  ref={playerRef}
                  url={urlState}
                  volume={0}
                  controls={true}
                  playing={isPlaying}
                  width={"100%"}
                  height={"100%"}
                  onProgress={(e) =>
                    isLooping &&
                    handleProgress(
                      e,
                      currentScene.timestamp,
                      currentScene.endstamp,
                      playerRef
                    )
                  }
                />
              </Box>
              <Box>
                <ScenePlayerData sceneData={currentScene} />
              </Box>
            </Fragment>
          )}
        </Grid>

        <Grid item sx={{ width: { md: "50%" } }}>
          <Grid container direction="column">
            <Typography component={Box} sx={mdMatches ? { pl: ".7rem" } : {}}>
              Search Result(s):
            </Typography>

            <Scrollbars
              universal
              style={
                mdMatches
                  ? { height: "30rem" }
                  : { height: "30rem", width: "90vw" }
              }
            >
              <Stack direction="column">
                {scenes?.map((scene) => (
                  <ResultCard
                    key={scene.id}
                    scene={scene}
                    handleSelect={handleSelect}
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
