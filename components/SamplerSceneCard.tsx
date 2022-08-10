import { Box, Button, Typography, Card } from "@mui/material";
import React from "react";
import { secondsToTime } from "../lib/helpers";
import { ICurrentScene, IScene } from "../lib/interfaces";

//takes in indiv scene data and displays data
//converts timestamp in s into minutes : seconds
interface SamplerSceneCardProps {
  scene: IScene;
  handlePlayer(timestamp: number): void;
  handleCurrentScene(scene: ICurrentScene): void;
}

const SamplerSceneCard = ({
  scene,
  handlePlayer,
  handleCurrentScene,
}: SamplerSceneCardProps) => {
  const handleClick = (scene: IScene) => {
    handlePlayer(scene.timestamp);
    handleCurrentScene({
      id: scene.id || "",
      timestamp: scene.timestamp || 0,
      endstamp: scene.endstamp || 0,
      tricks: scene.tricks || "",
      performed_by: scene.performed_by || "",
    });

    // console.log (scene.id);
  };
  return (
    <Box>
      <Card
        onClick={() => handleClick(scene)}
        sx={{
          p: "1rem",
          width: "95%",
          justifyContent: "flex-start",
        }}
        disableRipple={false}
        component={Button}
      >
        <Typography
          component={Box}
          color={"#6F6F6F"}
          variant="body2"
          fontWeight={500}
          align="left"
        >
          {secondsToTime(scene.timestamp)} - {scene.tricks}
        </Typography>
      </Card>
    </Box>
  );
};

export default SamplerSceneCard;
