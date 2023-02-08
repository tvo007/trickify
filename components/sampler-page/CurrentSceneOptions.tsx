import { Stack, Box, Button, IconButton } from "@mui/material";
import React from "react";

interface CurrentSceneOptionsProps {
  handleShareModalOpen: () => void;
  handleScenesModalOpen: () => void;
  handleLooperToggle: () => void;
  handleRestart: () => void;
  isLooping: boolean;
}

const CurrentSceneOptions = ({
  handleShareModalOpen,
  handleScenesModalOpen,
  handleLooperToggle,
  isLooping,
  handleRestart,
}: CurrentSceneOptionsProps) => {
  return (
    <Stack
      direction={"row"}
      justifyContent="center"
      alignItems={"center"}
      sx={{ pr: { xs: "11px", lg: "9px" } }}
    >
      <Box>
        <Button
          sx={{
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
          onClick={handleRestart}
        >
          Restart
        </Button>
        {/* <IconButton
          size="small"
          onClick={() => handleLooperToggle()}
          sx={isLooping ? { color: "primary.main" } : { color: "#6B7280" }}
        >
          <LoopIcon />
        </IconButton> */}
      </Box>
      <Box>
        <Button
          sx={{
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
          onClick={handleShareModalOpen}
        >
          Share
        </Button>
      </Box>
      <Box>
        <Button
          sx={{
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
          onClick={handleScenesModalOpen}
        >
          Scenes
        </Button>
      </Box>
    </Stack>
  );
};

export default CurrentSceneOptions;
