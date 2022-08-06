import { Grid, Stack, Box, Button } from "@mui/material";
import { useContext, useRef, useState } from "react";
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

interface SamplerPageContainerProps {
  sampler: ISampler;
}

const SamplerPageContainer = ({ sampler }: SamplerPageContainerProps) => {
  // const {headers} = useContext (ClientContext);
  const playerRef = useRef();
  const { isAuth } = useContext(AuthContext);
  const {
    isPlaying,
    urlState,
    handlePlayer,
    currentScene,
    handleCurrentScene,
  } = usePlayer(sampler, playerRef);
  const { isLooping, setIsLooping, handleLooperToggle, handleProgress } =
    useLooper(playerRef);

  /**
   * old on progress           
   * (e) =>
                isLooping &&
                currentScene &&
                handleProgress(e, currentScene.timestamp, currentScene.endstamp)
   */

  return (
    <Stack
      direction={"column"}
      justifyItems={"center"}
      alignItems={"center"}
      sx={{ minWidth: "100%" }}
    >
      <Box>
        {/**refactor out the react player away from scenes container */}
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
              volume={0.5}
              controls={true}
              playing={isPlaying}
              width={"100%"}
              height={"100%"}
              onProgress={(e) =>
                isLooping &&
                currentScene &&
                handleProgress(e, currentScene.timestamp, currentScene.endstamp)
              }
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
            <Stack>
              <CurrentScene currentScene={currentScene} />
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
