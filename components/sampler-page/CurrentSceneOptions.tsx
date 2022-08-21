import { Stack, Box, Button } from "@mui/material";
import React from "react";

const CurrentSceneOptions = () => {
  return (
    <Stack direction={"row"} justifyContent="center" alignItems={"center"}>
      <Box>
        <Button
          sx={{
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          Loop
        </Button>
      </Box>
      <Box>
        <Button
          sx={{
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          Share
        </Button>
      </Box>
    </Stack>
  );
};

export default CurrentSceneOptions;
