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
import { useRouter } from "next/router";
import { siteUrl } from "../../lib/api";

interface CurrentSceneProps {
  currentScene?: ICurrentScene;
  url: string;
}

const CurrentScene: VFC<CurrentSceneProps> = ({ currentScene, url }) => {
  const router = useRouter();
  const {
    // start: startParam,
    // play: playParam,
    // loop: loopParam,
    id: samplerId,
  } = router.query;

  //example param: ...?start=11&play=true&loop=true

  const youtubeUrl = generateUrl(url, currentScene.timestamp);

  const trickifyUrl = `${siteUrl}/${samplerId}?start=${currentScene.timestamp}`;

  const clipboardHandler = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  // console.log(router);

  if (currentScene && currentScene.timestamp !== 0) {
    return (
      <Stack sx={{ pb: "1rem" }}>
        <Card
          sx={{
            p: "1rem",

            justifyContent: "flex-start",
            minHeight: "7rem",
          }}
        >
          <Typography
            component={Box}
            color={"black"}
            variant="h6"
            fontWeight={600}
            align="left"
            sx={{ pb: "1rem" }}
          >
            {secondsToTime(currentScene.timestamp)} - {currentScene.tricks}
          </Typography>
          <Stack sx={{ maxWidth: { lg: "50%" }, pb: "1rem" }} direction="row">
            <TextField
              size="small"
              variant="outlined"
              id="shareableUrl"
              value={trickifyUrl}
              multiline
              rows={2}
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
                onClick={() => clipboardHandler(trickifyUrl)}
                color="primary"
                disableRipple
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </Stack>

          <Stack sx={{ maxWidth: { lg: "50%" }, pb: "1rem" }} direction="row">
            <TextField
              size="small"
              variant="outlined"
              id="shareableUrl"
              value={youtubeUrl}
              multiline
              rows={2}
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
                onClick={() => clipboardHandler(youtubeUrl)}
                color="primary"
                disableRipple
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </Stack>
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
