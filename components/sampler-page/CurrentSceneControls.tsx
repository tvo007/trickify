import { Stack, IconButton, Box } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import React from "react";

interface CurrentSceneControlsProps {
  handlePlayer: () => void;
  isPlaying: boolean;
  handleNext: () => void;
  handlePrev: () => void;
}

const CurrentSceneControls = ({
  handlePlayer,
  isPlaying,
  handleNext,
  handlePrev,
}: CurrentSceneControlsProps) => {
  return (
    <Stack direction={"row"} justifyContent="center" alignItems={"center"}>
      <Box>
        <IconButton onClick={() => handlePrev()}>
          <SkipPreviousIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Box>
        <IconButton onClick={() => handlePlayer()}>
          {isPlaying ? (
            <PauseCircleIcon fontSize="large" />
          ) : (
            <PlayCircleIcon fontSize="large" />
          )}
        </IconButton>
      </Box>
      <Box>
        <IconButton onClick={() => handleNext()}>
          <SkipNextIcon fontSize="medium" />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default CurrentSceneControls;
