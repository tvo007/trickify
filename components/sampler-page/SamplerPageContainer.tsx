import { Grid, Stack, Box, Button, Typography } from "@mui/material";
import { useCallback, useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import { useAuth } from "../../lib/contexts/AuthContext";
import SamplerScenes from "../SamplerScenes";
import { samplerList, exceptionStyles } from "../../lib/samplerRatioExceptions";
import usePlayer from "../../lib/hooks/usePlayer";
import SamplerPageInfo from "./SamplerPageInfo";
import useLooper, { OnProgressProps } from "../../lib/hooks/useLooper";
import Link from "next/link";
import { ICurrentScene, ISampler, IScene } from "../../lib/interfaces";
import CurrentScene from "./CurrentScene";
import useScenes, {
  earliestTimestamp,
  getSceneByIndex,
  calcSceneByTimePlayed,
} from "../../lib/hooks/useScenes";
import { useRouter } from "next/router";

interface SamplerPageContainerProps {
  sampler: ISampler;
  scenes: IScene[];
}

const SamplerPageContainer = ({
  sampler,
  scenes,
}: SamplerPageContainerProps) => {
  const playerRef = useRef<ReactPlayer>();
  const { isAuth } = useAuth();
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
  } = usePlayer(playerRef, sampler.url, startParam, playParam);
  const { isLooping, handleLooperToggle, handleProgress } =
    useLooper(playerRef);

  const memoizedFirstTimestamp = useMemo(
    () => earliestTimestamp(scenes),
    [scenes]
  );

  // const handleNext = () => {
  //   let next = getSceneByIndex(currentScene.index + 1, scenes);
  //   console.log(next.tricks);
  // };

  const handleNext = useCallback(() => {
    let next = getSceneByIndex(currentScene.index + 1, scenes);
    if (next) {
      // console.log(next);
      handlePlayer(next.timestamp);
      handleCurrentScene({
        id: next.id,
        timestamp: next.timestamp,
        endstamp: next.endstamp,
        tricks: next.tricks,
        performed_by: next.performed_by,
        index: next.index,
      });
    } else console.log("End of sampler!");
  }, [scenes, currentScene.index, handleCurrentScene, handlePlayer]);

  const handlePrev = useCallback(() => {
    let prev = getSceneByIndex(currentScene.index - 1, scenes);
    if (prev) {
      // console.log(prev);
      handlePlayer(prev.timestamp);
      handleCurrentScene({
        id: prev.id,
        timestamp: prev.timestamp,
        endstamp: prev.endstamp,
        tricks: prev.tricks,
        performed_by: prev.performed_by,
        index: prev.index,
      });
    } else {
      console.log("No prev timestamp detected");
    }
  }, [scenes, currentScene.index, handleCurrentScene, handlePlayer]);

  const handleRestart = useCallback(() => {
    handlePlayer(0.1);
    //passing 0 returns null
    handleCurrentScene({
      id: "",
      timestamp: 0,
      endstamp: 0,
      tricks: "",
      performed_by: "",
      index: 0,
    });
  }, [handlePlayer, handleCurrentScene]);

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
          index: 0,
        });
      } else {
        let sceneData = calcSceneByTimePlayed(e.playedSeconds, scenes);
        if (sceneData) {
          handleCurrentScene(sceneData);
        } else {
          handleCurrentScene(currentScene);
        }
      }
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
        <Grid container direction="column" sx={{ mb: 2, maxWidth: "100%" }}>
          <Grid item sx={{ my: "1rem" }}>
            <SamplerPageInfo sampler={sampler} />
          </Grid>
          <Grid
            sx={{
              position: "relative",
              pt: "56.25%",
              mb: "1rem",
              width: { xs: "90vw", md: "93vw" },
              maxWidth: { xs: "100%", md: "93vw", lg: "72rem" },
            }}
          >
            <ReactPlayer
              ref={playerRef}
              url={urlState}
              volume={0}
              controls={true}
              playing={isPlaying}
              width={"104%"}
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
                width: "100%",
                position: "absolute",
              }}
            />
          </Grid>
          {/**sampler info menu */}

          <Grid item sx={{ maxWidth: "100%" }}>
            <Stack sx={{ pb: "2rem" }}>
              <CurrentScene
                scenes={scenes}
                handleCurrentScene={handleCurrentScene}
                currentScene={currentScene}
                url={sampler.url}
                handlePlayer={handlePlayer}
                isPlaying={isPlaying}
                handleOnPause={handleOnPause}
                isLooping={isLooping}
                handleLooperToggle={handleLooperToggle}
                handleNext={handleNext}
                handlePrev={handlePrev}
                handleRestart={handleRestart}
              />
            </Stack>
            {/* <SamplerScenes
              isEditor={false}
              handlePlayer={handlePlayer}
              handleCurrentScene={handleCurrentScene}
            /> */}
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default SamplerPageContainer;
