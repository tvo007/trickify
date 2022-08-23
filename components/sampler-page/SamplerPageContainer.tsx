import { Grid, Stack, Box, Button, Typography } from "@mui/material";
import { useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import { useAuth } from "../../lib/contexts/AuthContext";
import SamplerScenes from "../SamplerScenes";
import { samplerList, exceptionStyles } from "../../lib/samplerRatioExceptions";
import usePlayer from "../../lib/hooks/usePlayer";
import SamplerPageInfo from "./SamplerPageInfo";
import LooperToggle from "../LooperToggle";
import useLooper, { OnProgressProps } from "../../lib/hooks/useLooper";
import Link from "next/link";
import { ICurrentScene, ISampler, IScene } from "../../lib/interfaces";
import CurrentScene from "./CurrentScene";
import useScenes, { earliestTimestamp } from "../../lib/hooks/useScenes";
import { findScene } from "../../lib/helpers";
import { useRouter } from "next/router";

interface SamplerPageContainerProps {
  sampler: ISampler;
}

const SamplerPageContainer = ({ sampler }: SamplerPageContainerProps) => {
  const playerRef = useRef<ReactPlayer>();
  const { isAuth } = useAuth();
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

  const memoizedFirstTimestamp = useMemo(
    () => earliestTimestamp(scenes),
    [scenes]
  );

  const progressController = (
    e: OnProgressProps,
    isLooping: boolean,
    currentScene: ICurrentScene,
    earliest: number
  ) => {
    // console.log(playerRef);
    if (isLooping && currentScene) {
      handleProgress(e, currentScene.timestamp, currentScene.endstamp);
    } else if (!isLooping) {
      // console.log(e.playedSeconds);
      // console.log(findScene(e.playedSeconds, scenes));
      if (e.playedSeconds < earliest) {
        handleCurrentScene({
          id: "",
          timestamp: 0,
          endstamp: 0,
          tricks: "",
          performed_by: "",
        });
      } else {
        let sceneData = findScene(e.playedSeconds, scenes);
        if (sceneData) {
          handleCurrentScene(sceneData);
        } else {
          handleCurrentScene(currentScene);
        }
      }

      ///
    }
  };
  // console.log(
  //   scenes ? Math.min(...scenes.map((scene) => scene.timestamp)) : "bruh"
  // );

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
                isPlaying &&
                progressController(
                  e,
                  isLooping,
                  currentScene,
                  memoizedFirstTimestamp
                )
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
            <Stack sx={{ pb: "2rem" }}>
              <CurrentScene
                currentScene={currentScene}
                url={sampler.url}
                handlePlayer={handlePlayer}
                isPlaying={isPlaying}
                handleOnPause={handleOnPause}
                isLooping={isLooping}
                handleLooperToggle={handleLooperToggle}
              />
            </Stack>
            <Stack direction="row" justifyContent={"space-between"}>
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
