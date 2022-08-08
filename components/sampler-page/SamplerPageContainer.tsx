import { Grid, Stack, Box, Button } from "@mui/material";
import { useContext, useRef } from "react";
import ReactPlayer from "react-player";
import AuthContext from "../../lib/contexts/AuthContext";
import SamplerScenes from "../SamplerScenes";
import { samplerList, exceptionStyles } from "../../lib/samplerRatioExceptions";
import usePlayer from "../../lib/hooks/usePlayer";
import SamplerPageInfo from "./SamplerPageInfo";
import LooperToggle from "../LooperToggle";
import useLooper from "../../lib/hooks/useLooper";
import Link from "next/link";
import { ISampler } from "../../lib/interfaces";
import CurrentScene from "./CurrentScene";
import useScenes from "../../lib/hooks/useScenes";
import { findScene } from "../../lib/helpers";
import { useRouter } from "next/router";

interface SamplerPageContainerProps {
  sampler: ISampler;
}

const SamplerPageContainer = ({ sampler }: SamplerPageContainerProps) => {
  const playerRef = useRef();
  const { isAuth } = useContext(AuthContext);
  const { data: scenes } = useScenes(sampler.id);
  const router = useRouter();

  const { start, play, loop } = router.query;

  const { startParam, playParam, loopParam } = {
    startParam: Number(start) || 0,
    playParam: play === "true" ? true : false,
    loopParam: loop === "true" ? true : false,
  };

  const {
    isPlaying,
    urlState,
    handlePlayer,
    currentScene,
    handleCurrentScene,
    handleOnPlay,
    handleOnPause,
    isPlayerEnabled,
    handleOnStart,
    handleOnReady,
  } = usePlayer(sampler, playerRef, startParam, playParam);
  const { isLooping, handleLooperToggle, handleProgress } =
    useLooper(playerRef);

  const progressController = (e, isLooping, currentScene) => {
    if (isLooping && currentScene) {
      handleProgress(e, currentScene.timestamp, currentScene.endstamp);
    } else if (!isLooping) {
      // console.log(e.playedSeconds);
      // console.log(findScene(e.playedSeconds, scenes));
      let sceneData = findScene(e.playedSeconds, scenes);
      handleCurrentScene(sceneData);
    }
  };

  return (
    <Stack
      direction={"column"}
      justifyItems={"center"}
      alignItems={"center"}
      sx={{ minWidth: "100%" }}
    >
      <Box>
        {/* <h2>{startParam || "Nothing"}</h2>
        <h2>{playParam ? "should be playing" : "Uh oh"}</h2>
        <h2>{isPlayerEnabled ? "isEnabled" : "notEnabled"}</h2>
        <h2>{isPlaying ? "isPlaying" : "notPlaying"}</h2> */}

        <Grid container direction="column" sx={{ mb: 2, maxWidth: "100%" }}>
          <Grid item sx={{ my: "1rem" }}>
            <SamplerPageInfo sampler={sampler} />
          </Grid>
          <Grid
            sx={
              samplerList.includes(sampler.name)
                ? exceptionStyles
                : {
                    position: "relative",
                    pt: "56.25%",
                    mb: "1rem",
                    width: "100%",
                  }
            }
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
                isPlaying && progressController(e, isLooping, currentScene)
              }
              onPlay={() => !isPlaying && handleOnPlay()}
              onPause={() => isPlaying && handleOnPause()}
              onStart={() => !isPlayerEnabled && handleOnStart()}
              onReady={handleOnReady}
              style={{
                top: 0,
                left: 0,
                position: "absolute",
              }}
            />
          </Grid>
          {/**sampler info menu */}

          <Grid item sx={{ maxWidth: "100%" }}>
            {/**current scene */}
            {/* <Box>
              {isPlaying ? "isPlaying is true" : "isPlaying is not true"}
            </Box>
            <Box>
              {isPlayerEnabled ? "Player is enabled" : "Player is not enabled"}
            </Box> */}
            <Stack>
              <CurrentScene currentScene={currentScene} url={sampler.url} />
            </Stack>
            <Stack direction="row" justifyContent={"space-between"}>
              <LooperToggle
                isLooping={isLooping}
                handleLooperToggle={handleLooperToggle}
              />
              {isAuth && (
                <Grid item>
                  <Link href={`/admin/${sampler.id}`} passHref>
                    <Button size="small">View in Editor</Button>
                  </Link>
                </Grid>
              )}
            </Stack>
            <SamplerScenes
              isEditor={false}
              samplerUrl={sampler.url}
              handlePlayer={handlePlayer}
              handleCurrentScene={handleCurrentScene}
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default SamplerPageContainer;
