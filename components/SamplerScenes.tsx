import React from "react";
import { Stack, Grid } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useRouter } from "next/router";
import SamplerSceneCard from "./SamplerSceneCard";
import useScenes from "../lib/hooks/useScenes";
import { ICurrentScene } from "../lib/interfaces";

interface SamplerScenesProps {
  handlePlayer(timestamp: number): void;
  handleCurrentScene(scene: ICurrentScene): void;
  handleModalClose(): void;
}

const SamplerScenes = ({
  handlePlayer,
  handleCurrentScene,
  handleModalClose,
}: SamplerScenesProps) => {
  const router = useRouter();
  const { id } = router.query;

  const samplerId = id.toString();

  const { data: scenes, error, isSuccess } = useScenes(samplerId);

  return (
    <Grid item>
      {error && <h2>Something went wrong.</h2>}
      {isSuccess && scenes.length === 0 && (
        <h2>There are currently no scenes assigned to this sampler.</h2>
      )}
      {isSuccess && scenes.length > 0 && (
        <Scrollbars autoHeight autoHeightMin={300}>
          <Stack direction="column" spacing={2}>
            {scenes
              .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
              .map((scene) => (
                <SamplerSceneCard
                  key={scene.id}
                  scene={scene}
                  handlePlayer={handlePlayer}
                  handleCurrentScene={handleCurrentScene}
                  handleModalClose={handleModalClose}
                />
              ))}
          </Stack>
        </Scrollbars>
      )}
    </Grid>
  );
};

export default SamplerScenes;
