import { Box, IconButton, Stack, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { VFC } from "react";

interface CurrentSceneUrlProps {
  url: string;
}

const CurrentSceneUrl: VFC<CurrentSceneUrlProps> = ({ url }) => {
  const clipboardHandler = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <Stack sx={{ maxWidth: { lg: "50%" } }} direction="row">
      <TextField
        size="small"
        variant="outlined"
        id="shareableUrl"
        value={url}
        fullWidth
        disabled
        sx={{
          pb: "5px",
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#6F6F6F",
          },
        }}
      />
      <Box sx={{ display: "flex" }}>
        <IconButton
          sx={{
            ml: "auto",
            py: 1,
          }}
          size="small"
          onClick={() => clipboardHandler(url)}
          color="primary"
          disableRipple
        >
          <ContentCopyIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default CurrentSceneUrl;
