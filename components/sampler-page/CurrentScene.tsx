import { VFC } from "react";
import { ICurrentScene } from "../../lib/interfaces";
import { Stack, Typography, Box } from "@mui/material";

interface CurrentSceneProps {
  currentScene?: ICurrentScene;
}

const CurrentScene: VFC<CurrentSceneProps> = ({ currentScene }) => {
  if (currentScene) {
    return (
      <Stack sx={{ px: "1rem", minHeight: "8rem" }}>
        <div>{currentScene.id}</div>
        <div>{currentScene.tricks}</div>
      </Stack>
    );
  } else {
    return (
      <Stack sx={{ px: "1rem", minHeight: "5rem" }}>
        <Typography component={Box} variant="body2">
          Scene not selected.
        </Typography>
      </Stack>
    );
  }
};

export default CurrentScene;
