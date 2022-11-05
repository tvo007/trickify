import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { Fragment } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { secondsToTime } from "../../lib/helpers";
import { ICurrentScene, IScene } from "../../lib/interfaces";

interface ScenePlayerDataProps {
  sceneData: ICurrentScene;
}

const ScenePlayerData = ({ sceneData }: ScenePlayerDataProps) => {
  const clipboardHandler = () => {
    navigator.clipboard.writeText(sceneData.url);
  };
  //https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText

  return sceneData ? (
    <Fragment>
      <Typography component={Box} fontWeight="bold">
        Sampler: {sceneData.samplerName}
      </Typography>
      <Typography component={Box} color={"#6F6F6F"}>
        Performed By: {sceneData.performed_by}
      </Typography>
      <Typography component={Box} color={"#6F6F6F"}>
        Trick(s): {sceneData.tricks}
      </Typography>
      <Typography component={Box} color={"#6F6F6F"}>
        Timestamp: {secondsToTime(sceneData.timestamp)}
      </Typography>
      <TextField
        variant="standard"
        id="shareableUrl"
        value={sceneData.url}
        fullWidth
        disabled
        sx={{
          pb: "5px",
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "black",
          },
        }}
      />
      <Box sx={{ display: "flex" }}>
        <Link href={`/${sceneData.samplerId}`} passHref>
          <Button size="small">Go to Sampler Page</Button>
        </Link>
        <IconButton
          sx={{
            ml: "auto",
            py: 1,
          }}
          size="small"
          onClick={clipboardHandler}
          color="primary"
        >
          <ContentCopyIcon />
        </IconButton>
      </Box>
    </Fragment>
  ) : null;
};

export default ScenePlayerData;
