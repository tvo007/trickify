import { Typography } from "@mui/material";
import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "90vw", sm: "80vw", md: "93vw", lg: "75vw", xl: "75vw" },
        height: "75vh",
        position: "fixed",
      }}
    >
      <CircularProgress size="large" />
    </Box>
  );
};

export default Loader;
