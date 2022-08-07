import { VFC } from "react";
import { ICurrentScene } from "../../lib/interfaces";
import {
  Stack,
  Typography,
  Box,
  Card,
  CardActionArea,
  TextField,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { secondsToTime, generateUrl } from "../../lib/helpers";

interface CurrentSceneProps {
  currentScene?: ICurrentScene;
  url: string;
}

const CurrentScene: VFC<CurrentSceneProps> = ({ currentScene, url }) => {
  const youtubeUrl = generateUrl(url, currentScene.timestamp);
  const clipboardHandler = () => {
    navigator.clipboard.writeText(youtubeUrl);
  };

  if (currentScene && currentScene.timestamp !== 0) {
    return (
      <Stack sx={{ pb: "1rem" }}>
        <Card
          sx={{
            p: "1rem",
            width: "95%",
            justifyContent: "flex-start",
            minHeight: "7rem",
          }}
        >
          <Typography
            component={Box}
            color={"#6F6F6F"}
            variant="body2"
            fontWeight={500}
            align="left"
          >
            {secondsToTime(currentScene.timestamp)} - {currentScene.tricks}
          </Typography>
          <TextField
            variant="standard"
            id="shareableUrl"
            value={youtubeUrl}
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
        </Card>
      </Stack>
    );
  } else if (!currentScene || currentScene.timestamp === 0) {
    return (
      <Stack sx={{ pb: "1rem" }}>
        <Card
          sx={{
            p: "1rem",
            width: "95%",
            justifyContent: "flex-start",
            minHeight: "7rem",
          }}
        >
          <Typography
            component={Box}
            color={"#6F6F6F"}
            variant="body2"
            fontWeight={500}
            align="left"
          >
            Scene not selected.
          </Typography>
        </Card>
      </Stack>
    );
  }
};

export default CurrentScene;
