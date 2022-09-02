import { Stack, Box, Button, IconButton } from "@mui/material";
import React from "react";
import LoopIcon from "@mui/icons-material/Loop";

interface CurrentSceneOptionsProps {
  handleModalOpen: () => void;
  handleLooperToggle: () => void;
  handleRestart: () => void;
  isLooping: boolean;
}

const CurrentSceneOptions = ({
  handleModalOpen,
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
        <IconButton
          size="small"
          onClick={() => handleLooperToggle()}
          sx={isLooping ? { color: "primary.main" } : { color: "#6B7280" }}
        >
          <LoopIcon />
        </IconButton>
      </Box>
      <Box>
        <Button
          sx={{
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
          onClick={handleModalOpen}
        >
          Share
        </Button>
      </Box>
    </Stack>
  );
};

export default CurrentSceneOptions;
