import { Stack, IconButton, Box } from "@mui/material";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import LoopIcon from "@mui/icons-material/Loop";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import React, { useState } from "react";

const CurrentSceneControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Stack direction={"row"} justifyContent="center" alignItems={"center"}>
      <Box>
        <IconButton>
          <SkipPreviousIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Box>
        <IconButton onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? (
            <PauseCircleIcon fontSize="large" />
          ) : (
            <PlayCircleIcon fontSize="large" />
          )}
        </IconButton>
      </Box>
      <Box>
        <IconButton>
          <SkipNextIcon fontSize="medium" />
        </IconButton>
      </Box>
      {/* <Box>
        <IconButton>
          <LoopIcon fontSize="large" />
        </IconButton>
      </Box> */}
      {/* <Box>
        <IconButton></IconButton>
      </Box> */}
    </Stack>
  );
};

export default CurrentSceneControls;
