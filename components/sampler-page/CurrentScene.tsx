import { useState, VFC } from "react";
import { ICurrentScene } from "../../lib/interfaces";
import {
  Stack,
  Typography,
  Box,
  Card,
  CardActionArea,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { secondsToTime, generateUrl } from "../../lib/helpers";
import { useRouter } from "next/router";
import { siteUrl } from "../../lib/api";
import CurrentSceneUrl from "./CurrentSceneUrl";
import CurrentSceneControls from "./CurrentSceneControls";
import CurrentSceneOptions from "./CurrentSceneOptions";

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

  const trickifyUrl = `${siteUrl}/${samplerId}?start=${currentScene.timestamp}`;
  const youtubeUrl = generateUrl(url, currentScene.timestamp);
  const [option, setOption] = useState(0);

  function showSharableUrl(step) {
    switch (step) {
      case 0:
        return <CurrentSceneUrl url={trickifyUrl} />;
      case 1:
        return <CurrentSceneUrl url={youtubeUrl} />;
      default:
        return <CurrentSceneUrl url={trickifyUrl} />;
    }
  }

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
            variant="body1"
            fontWeight={600}
            align="center"
          >
            {secondsToTime(currentScene.timestamp)} -{" "}
            {currentScene.performed_by} - {currentScene.tricks}
          </Typography>
          <CurrentSceneControls />
          <CurrentSceneOptions />
          {showSharableUrl(option)}
          <Stack sx={{ width: "50%" }} direction="row">
            <Button
              onClick={() => setOption(0)}
              sx={option !== 0 ? { color: "#6F6F6F" } : {}}
            >
              trickify
            </Button>
            <Button
              onClick={() => setOption(1)}
              sx={option !== 1 ? { color: "#6F6F6F" } : {}}
            >
              youtube
            </Button>
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
